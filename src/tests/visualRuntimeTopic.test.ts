import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  runtimeTopicId, runtimeTopicIdentity, kgTopicIdentity, resolveTopicIdentity,
  isRuntimeTopicId, groundingHash, MIN_GROUNDING_CHARS,
} from '@/lib/teaching/visual/topicIdentity'
import { checkBudgets, checkBudgetsLive, DEFAULT_BUDGETS } from '@/lib/teaching/visual/generationBudget'
import { readVerdict, writeVerdict, figureFingerprint, VERDICT_TTL_MS } from '@/lib/teaching/visual/verdictCache'
import { startDeadline, NO_DEADLINE } from '@/lib/teaching/visual/turnDeadline'
import type { CriticReport } from '@/lib/teaching/visual/figureCritic'

/**
 * THE FOUR THINGS THAT MAKE THIS WORK FOR A TOPIC NOBODY ENUMERATED.
 *
 * Identity (so an off-curriculum topic can be named and cached at all),
 * budgets (so "no list" is still bounded), the verdict cache (so a topic costs
 * two model calls once rather than per learner forever), and one deadline (so
 * two safe timeouts cannot compose into an unsafe wait).
 *
 * Each is tested at the property that would fail silently and expensively.
 */

// ── IDENTITY ─────────────────────────────────────────────────────────────────

describe('runtime topic identity', () => {
  const grounded = 'A repeating pattern of pressure waves travelling through a medium such as air.'

  it('IS STABLE ACROSS SPELLINGS — or every learner looks like a new topic', () => {
    // If ids drifted with punctuation or case, the cache would miss on every
    // turn and the engine would pay for the same topic indefinitely.
    const a = runtimeTopicId('Sound Waves')
    for (const variant of ['sound waves', '  Sound   Waves  ', 'Sound-Waves!', 'SOUND WAVES']) {
      expect(runtimeTopicId(variant), variant).toBe(a)
    }
  })

  it('different topics do not collide', () => {
    expect(runtimeTopicId('Sound Waves')).not.toBe(runtimeTopicId('Light Waves'))
  })

  it('is marked so nothing can mistake it for a curriculum id', () => {
    const id = runtimeTopicId('Sound Waves')
    expect(isRuntimeTopicId(id)).toBe(true)
    expect(isRuntimeTopicId('phys.mech.kinetic-energy')).toBe(false)
  })

  it('REFUSES A TOPIC IT CANNOT DESCRIBE — this is what bounds "any topic"', () => {
    // Without grounding text there is nothing to draw from and, more
    // importantly, nothing for the critic to judge the figure against. A bare
    // title would make validation impossible in principle.
    expect(runtimeTopicIdentity({ title: 'Sound Waves', description: '' })).toBeNull()
    expect(runtimeTopicIdentity({ title: 'Sound Waves', description: 'waves' })).toBeNull()
    expect(runtimeTopicIdentity({ title: '', description: grounded })).toBeNull()
    expect(runtimeTopicIdentity({ title: null, description: null })).toBeNull()
  })

  it('accepts a topic that carries real grounding', () => {
    const id = runtimeTopicIdentity({ title: 'Sound Waves', description: grounded })
    expect(id).not.toBeNull()
    expect(id!.provenance).toBe('runtime')
    expect(id!.description.length).toBeGreaterThanOrEqual(MIN_GROUNDING_CHARS)
  })

  it('CURRICULUM WINS when both are available', () => {
    const both = resolveTopicIdentity({
      conceptId: 'phys.mech.kinetic-energy',
      title: 'Something Else Entirely',
      description: grounded,
    })
    expect(both!.provenance).toBe('kg')
    expect(both!.conceptId).toBe('phys.mech.kinetic-energy')
  })

  it('falls back to a runtime identity when the curriculum has never heard of it', () => {
    const id = resolveTopicIdentity({
      conceptId: 'phys.not.a.real.concept', title: 'Sound Waves', description: grounded,
    })
    expect(id!.provenance).toBe('runtime')
  })

  it('yields NOTHING when neither source can supply one', () => {
    expect(resolveTopicIdentity({ conceptId: 'phys.not.real', title: 'X', description: '' })).toBeNull()
  })

  it('a real KG concept still resolves exactly as before', () => {
    const kg = kgTopicIdentity('phys.mech.kinetic-energy')
    expect(kg!.provenance).toBe('kg')
    expect(kg!.title).toBeTruthy()
  })

  it('grounding hash moves when the text moves — verdicts must not outlive it', () => {
    const a = { conceptId: 'x', title: 'T', description: 'one', prerequisites: [] }
    const b = { conceptId: 'x', title: 'T', description: 'two', prerequisites: [] }
    expect(groundingHash(a)).not.toBe(groundingHash(b))
    expect(groundingHash(a)).toBe(groundingHash({ ...a }))
  })
})

// ── BUDGETS ──────────────────────────────────────────────────────────────────

describe('generation budgets — the bound that replaced the list', () => {
  it('permits an ordinary turn', () => {
    expect(checkBudgets({ session: 0, day: 0 })).toEqual({ ok: true })
  })

  it('stops a session that has turned into a generation loop', () => {
    const r = checkBudgets({ session: DEFAULT_BUDGETS.perSession, day: 0 })
    expect(r.ok).toBe(false)
    expect(r.ok === false && r.reason).toBe('session-budget-exhausted')
  })

  it('stops the platform before a quota is emptied', () => {
    const r = checkBudgets({ session: 0, day: DEFAULT_BUDGETS.perDay })
    expect(r.ok === false && r.reason).toBe('daily-budget-exhausted')
  })

  it('a session count is optional — not every caller has one', () => {
    expect(checkBudgets({ day: 0 })).toEqual({ ok: true })
  })

  it('AN UNREADABLE BUDGET IS EXHAUSTED, never unlimited', async () => {
    // A safety bound must fail in the safe direction. The cost is that figures
    // stop while the store is unreachable, which is the correct trade.
    expect(await checkBudgetsLive(0, undefined)).toEqual({ ok: false, reason: 'budget-unreadable' })
    expect(await checkBudgetsLive(0, { countToday: async () => { throw new Error('down') } }))
      .toEqual({ ok: false, reason: 'budget-unreadable' })
  })

  it('reads the shared count when it can', async () => {
    expect(await checkBudgetsLive(0, { countToday: async () => 3 })).toEqual({ ok: true })
    expect((await checkBudgetsLive(0, { countToday: async () => 10_000 })).ok).toBe(false)
  })
})

// ── VERDICT CACHE ────────────────────────────────────────────────────────────

describe('the verdict cache — cheap to re-serve, never a promotion', () => {
  const ctx = { conceptId: 'topic:abc', title: 'Sound Waves', description: 'pressure waves in a medium', prerequisites: [] }
  const figure = { type: 'graph', equation: 'sin(x)' }
  const promote: CriticReport = {
    dimensions: {
      relevance: { verdict: 'pass', reason: '' }, correctness: { verdict: 'pass', reason: '' },
      explanatoryValue: { verdict: 'pass', reason: '' }, grounding: { verdict: 'pass', reason: '' },
      rendering: { verdict: 'pass', reason: '' },
    },
    decision: 'promote', confidence: 1, judged: true,
  }

  const store = () => {
    const rows = new Map<string, string>()
    return {
      rows,
      client: {
        visualizationCache: {
          findUnique: async ({ where }: { where: { conceptKey: string } }) =>
            rows.has(where.conceptKey) ? { code: rows.get(where.conceptKey)! } : null,
          update: async ({ where, data }: never) => {
            const w = where as unknown as { conceptKey: string }
            rows.set(w.conceptKey, (data as unknown as { code: string }).code)
          },
          create: async ({ data }: { data: { conceptKey: string; code: string } }) => {
            rows.set(data.conceptKey, data.code)
          },
        },
      } as never,
    }
  }

  it('a stored pass is found again — this is the whole saving', async () => {
    const s = store()
    await writeVerdict(ctx, figure, promote, s.client)
    expect(await readVerdict(ctx, figure, s.client)).not.toBeNull()
  })

  it('A HOLD IS NEVER STORED — a transient hold must not become permanent', async () => {
    // A hold is usually about the MOMENT — a judge that timed out or could not
    // be reached — so storing it would turn one bad minute into a permanent
    // refusal for a topic.
    const s = store()
    await writeVerdict(ctx, figure, { ...promote, decision: 'hold' }, s.client)
    expect(s.rows.size).toBe(0)
  })

  it('A REJECT IS STORED — the figure is frozen, so re-judging it buys nothing', async () => {
    // Changed deliberately after the seeded 30-topic cohort measured 2 of 30
    // topics paying a model call to re-judge an identical cached figure on
    // every turn, indefinitely. The fingerprint keeps it honest: a different
    // figure is judged afresh.
    const s = store()
    await writeVerdict(ctx, figure, { ...promote, decision: 'reject' }, s.client)
    expect(s.rows.size).toBe(1)
    expect((await readVerdict(ctx, figure, s.client))?.decision).toBe('reject')
  })

  it('A CHANGED FIGURE IS NOT COVERED by the old verdict', async () => {
    const s = store()
    await writeVerdict(ctx, figure, promote, s.client)
    expect(await readVerdict(ctx, { type: 'graph', equation: 'cos(x)' }, s.client)).toBeNull()
  })

  it('CHANGED GROUNDING INVALIDATES IT — it described a comparison that is gone', async () => {
    const s = store()
    await writeVerdict(ctx, figure, promote, s.client)
    const edited = { ...ctx, description: 'a completely rewritten description' }
    expect(await readVerdict(edited, figure, s.client)).toBeNull()
  })

  it('expires, so nothing is trusted indefinitely', async () => {
    const s = store()
    await writeVerdict(ctx, figure, promote, s.client, 1_000)
    expect(await readVerdict(ctx, figure, s.client, 1_000 + VERDICT_TTL_MS + 1)).toBeNull()
  })

  it('an unreadable cache means judge again, not serve anyway', async () => {
    const broken = {
      visualizationCache: {
        findUnique: async () => { throw new Error('down') },
        update: async () => undefined, create: async () => undefined,
      },
    } as never
    expect(await readVerdict(ctx, figure, broken)).toBeNull()
  })

  it('fingerprints differ for different payloads', () => {
    expect(figureFingerprint({ a: 1 })).not.toBe(figureFingerprint({ a: 2 }))
    expect(figureFingerprint({ a: 1 })).toBe(figureFingerprint({ a: 1 }))
  })
})

// ── DEADLINE ─────────────────────────────────────────────────────────────────

describe('one deadline for the whole attempt', () => {
  it('SHRINKS AS STAGES RUN — a slow generation eats the judge share', () => {
    let now = 1_000
    const d = startDeadline(9_000, () => now)
    expect(d.remaining()).toBe(9_000)
    now += 7_000
    expect(d.remaining()).toBe(2_000)
    expect(d.expired()).toBe(false)
    now += 2_000
    expect(d.expired()).toBe(true)
    expect(d.remaining()).toBe(0)
  })

  it('never reports a negative remainder', () => {
    let now = 0
    const d = startDeadline(100, () => now)
    now = 10_000
    expect(d.remaining()).toBe(0)
  })

  it('the offline pass has no clock at all', () => {
    expect(NO_DEADLINE.expired()).toBe(false)
    expect(NO_DEADLINE.remaining()).toBe(0)
  })
})
