import { describe, it, expect } from 'vitest'
import { detectLearnerRequest } from '@/lib/teaching/masteryGate'
import { decideVisualNeed } from '@/lib/teaching/visual/visualNeed'
import { resolveVisualForTurn } from '@/lib/teaching/visual/resolveVisual'
import { figureFingerprint, verdictKey } from '@/lib/teaching/visual/verdictCache'
import { groundingHash, kgTopicIdentity } from '@/lib/teaching/visual/topicIdentity'
import { figureCacheKey } from '@/lib/teaching/visual/visualEngine'
import type { CriticReport } from '@/lib/teaching/visual/figureCritic'
import type { GeneratedFigure } from '@/lib/teaching/visual/visualEngine'

/**
 * DEFECT 1, measured in production 2026-09-08 on `phys.em.energy-capacitor`:
 * four explicit diagram requests in one lesson, ZERO figures on the wire, and
 * every turn — including the opening, before the learner said anything —
 * logged `provenance: 'no-figure:critic-reject-cached'`.
 *
 * The request was detected correctly the whole time. What failed is that the
 * figure cache holds ONE candidate per concept, so a candidate the critic
 * rejected was the only candidate that would ever be offered, and the cached
 * rejection of that one attempt read as a permanent verdict on the concept.
 */

const ASKS = ['Show me diagram', 'Show me a diagram', 'Can you show me a picture?', 'Can you show me a diagram?']

describe('an explicit diagram request reaches the visual path', () => {
  it.each(ASKS)('%s is read as a diagram request and makes a figure REQUIRED', (message) => {
    const learnerRequest = detectLearnerRequest(message)
    expect(learnerRequest).toBe('diagram')
    const verdict = decideVisualNeed({ message, learnerRequest })
    expect(verdict.need).toBe('required')
    expect(verdict.reason).toBe('learner-asked-for-a-figure')
  })

  it.each(ASKS)('%s does not name a topic, so the ACTIVE concept is preserved', (message) => {
    // If the request were read as naming a different topic, the engine would
    // draw something else — the failure mode `requestTargetsSomethingElse`
    // exists to prevent. A bare medium request must leave the target alone.
    const learnerRequest = detectLearnerRequest(message)
    const decision = resolveVisualForTurn(
      { message, lessonConceptId: 'phys.em.energy-capacitor', learnerRequest },
      {},
    )
    return decision.then((d) => {
      expect(d.conceptId).toBe('phys.em.energy-capacitor')
    })
  })
})

// ── The cache substrate the resolver reads through ─────────────────────────
function makeCache(seed: Record<string, string> = {}) {
  const rows: Record<string, string> = { ...seed }
  return {
    rows,
    client: {
      visualizationCache: {
        findUnique: async ({ where }: { where: { conceptKey: string } }) =>
          rows[where.conceptKey] ? { code: rows[where.conceptKey] } : null,
        // create-only, and a duplicate key is swallowed — exactly what the real
        // saveVisualization does, so a test cannot accidentally rely on an
        // overwrite production never performs.
        create: async ({ data }: { data: { conceptKey: string; code: string } }) => {
          if (rows[data.conceptKey] !== undefined) throw new Error('duplicate key')
          rows[data.conceptKey] = data.code
          return { code: data.code }
        },
        update: async () => ({}),
        upsert: async ({ where, create, update }: {
          where: { conceptKey: string }; create: { conceptKey: string; code: string }; update: { code: string }
        }) => {
          rows[where.conceptKey] = rows[where.conceptKey] !== undefined ? update.code : create.code
          return { code: rows[where.conceptKey] }
        },
      },
    } as never,
  }
}

const CONCEPT = 'phys.em.energy-capacitor'
const TITLE = 'Energy Stored in a Capacitor'
const DESC = 'A charged capacitor stores energy in its electric field; the work done charging it is U = 1/2 C V squared.'

/** Structurally valid figures the validator accepts (process_flow specs). */
function figureFor(title: string, steps: string[]) {
  return { type: 'process_flow', title, steps: steps.map((t) => ({ title: t })) }
}

const REJECTED = figureFor('Charging a capacitor', ['Connect the source', 'Charge builds on the plates', 'Voltage rises to its final value'])
const FRESH = figureFor('Energy stored while charging', ['Move the first charge across', 'Push the next against what is there', 'Total work is the stored energy'])

function deps(cache: ReturnType<typeof makeCache>, opts: {
  generate: () => unknown
  critic: (f: GeneratedFigure) => CriticReport
  calls: { generate: number; critic: number }
}) {
  return {
    cacheClient: cache.client,
    enabled: () => true,
    policy: 'auto' as const,
    budgetReader: { countToday: async () => 0 },
    sessionGenerationCount: 0,
    generate: async () => { opts.calls.generate++; return opts.generate() },
    critic: async (f: GeneratedFigure) => { opts.calls.critic++; return opts.critic(f) },
  }
}

const promote = (): CriticReport => ({ decision: 'promote', confidence: 0.9, dimensions: {}, notes: [] } as never)
const reject = (): CriticReport => ({ decision: 'reject', confidence: 0.9, dimensions: {}, notes: [] } as never)

/**
 * The production state this reproduces: a candidate in the figure cache and a
 * REJECT verdict already stored against it, from an earlier session. Seeded
 * rather than driven, because that is how a later learner meets it.
 */
/**
 * Reaches the production state by DRIVING it, not by hand-writing the cache
 * rows: an ordinary teaching turn generates a candidate, the critic rejects it,
 * and the real writeVerdict stores that against the real grounding hash. A
 * hand-seeded row would have to guess how the resolver builds its context, and
 * a wrong guess makes the cache silently miss — which is a test that passes for
 * the wrong reason.
 */
const ORDINARY_TEACHING_TURN = 'I am still not sure how that energy formula comes about at all'

async function seedRejectedCandidate(calls: { generate: number; critic: number }) {
  const cache = makeCache()
  const priming = deps(cache, { generate: () => REJECTED, critic: reject, calls })
  const primed = await resolve(cache, priming, ORDINARY_TEACHING_TURN)
  expect(primed.provenance).toBe('no-figure:critic-reject')
  return cache
}

async function resolve(cache: ReturnType<typeof makeCache>, d: ReturnType<typeof deps>, message: string) {
  return resolveVisualForTurn(
    {
      message,
      lessonConceptId: CONCEPT,
      learnerRequest: detectLearnerRequest(message),
      runtimeTopic: { title: TITLE, description: DESC },
    } as never,
    { ...d, runtimeTopic: { title: TITLE, description: DESC } } as never,
  )
}

describe('a rejected candidate is not a permanent verdict on the concept', () => {
  it('BEFORE: a cached reject + the cached figure returns no figure on an ordinary turn, and costs nothing', async () => {
    const calls = { generate: 0, critic: 0 }
    const cache = await seedRejectedCandidate({ generate: 0, critic: 0 })
    const d = deps(cache, { generate: () => FRESH, critic: reject, calls })
    const before = calls.critic
    const again = await resolve(cache, d, 'ok')
    // An ordinary turn keeps the cheap cached refusal — no new model calls.
    expect(again.payload).toBeNull()
    expect(calls.critic).toBe(before)
  })

  it('AFTER: an explicit request generates ONE fresh candidate and serves it when the critic promotes', async () => {
    const calls = { generate: 0, critic: 0 }
    const cache = await seedRejectedCandidate({ generate: 0, critic: 0 })
    const d = deps(cache, { generate: () => FRESH, critic: promote, calls })
    const asked = await resolve(cache, d, 'Show me a diagram')
    expect(asked.payload).not.toBeNull()
    expect(asked.provenance).toContain('generated-retry')
    expect(asked.conceptId).toBe(CONCEPT)
  })

  it('a fresh candidate the critic ALSO rejects is never served', async () => {
    const calls = { generate: 0, critic: 0 }
    const cache = await seedRejectedCandidate({ generate: 0, critic: 0 })
    const d = deps(cache, { generate: () => FRESH, critic: reject, calls })
    const asked = await resolve(cache, d, 'Show me a diagram')
    expect(asked.payload).toBeNull()
    expect(asked.provenance).toBe('no-figure:retry-critic-reject')
  })

  it('a retry that regenerates the IDENTICAL figure is not re-judged', async () => {
    const calls = { generate: 0, critic: 0 }
    const cache = await seedRejectedCandidate({ generate: 0, critic: 0 })
    const d = deps(cache, { generate: () => REJECTED, critic: reject, calls })
    const criticBefore = calls.critic
    const asked = await resolve(cache, d, 'Show me a diagram')
    expect(asked.payload).toBeNull()
    expect(asked.provenance).toBe('no-figure:retry-identical-figure')
    expect(calls.critic).toBe(criticBefore) // no wasted judge call
  })

  it('the retry fires only on an explicit request — an ordinary turn never pays for it', async () => {
    const calls = { generate: 0, critic: 0 }
    const cache = await seedRejectedCandidate({ generate: 0, critic: 0 })
    const d = deps(cache, { generate: () => FRESH, critic: reject, calls })
    const genBefore = calls.generate
    await resolve(cache, d, 'ok')
    await resolve(cache, d, 'that makes sense')
    expect(calls.generate).toBe(genBefore)
  })
})

describe('a concept with no source text is still declined honestly', () => {
  it('generates nothing and claims nothing when there is nothing to draw from', async () => {
    const calls = { generate: 0, critic: 0 }
    const cache = makeCache()
    const d = deps(cache, { generate: () => FRESH, critic: promote, calls })
    const out = await resolveVisualForTurn(
      { message: 'Show me a diagram', lessonConceptId: null, learnerRequest: 'diagram' } as never,
      { ...d } as never,
    )
    expect(out.payload).toBeNull()
    expect(calls.generate).toBe(0)
  })
})

describe('a promoted retry converges — the concept is not stuck paying forever', () => {
  it('the vetted figure replaces the dead candidate, so the NEXT turn is free', async () => {
    const calls = { generate: 0, critic: 0 }
    const cache = await seedRejectedCandidate({ generate: 0, critic: 0 })
    const d = deps(cache, { generate: () => FRESH, critic: promote, calls })

    const first = await resolve(cache, d, 'Show me a diagram')
    expect(first.payload).not.toBeNull()
    expect(first.provenance).toContain('generated-retry')

    // The stale rejected candidate and its reject verdict are both gone.
    expect(JSON.parse(cache.rows[figureCacheKey(CONCEPT)])).toEqual(FRESH)
    expect(JSON.parse(cache.rows[verdictKey(CONCEPT)]).decision).toBe('promote')

    // So the next turn serves the SAME figure with no generation and no judge.
    const genBefore = calls.generate
    const criticBefore = calls.critic
    const second = await resolve(cache, d, 'Show me a diagram')
    expect(second.payload).not.toBeNull()
    expect(calls.generate).toBe(genBefore)
    expect(calls.critic).toBe(criticBefore)
  })
})
