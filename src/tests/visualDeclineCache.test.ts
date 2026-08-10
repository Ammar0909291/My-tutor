import { describe, it, expect } from 'vitest'
import { writeVerdict, readVerdict } from '@/lib/teaching/visual/verdictCache'
import {
  readDecline, writeDecline, declineKey, DECLINE_TTL_MS,
} from '@/lib/teaching/visual/verdictCache'

/**
 * A DECLINE IS A FACT ABOUT THE TOPIC, NOT ABOUT THE MOMENT.
 *
 * Measured by the six-category canary: a topic the generator honestly declined
 * cost one provider call on EVERY turn, forever, because only successes were
 * cached — and declines are the common case (26 of 40 on the last cohort), so
 * the uncached path was the dominant one. These pin both halves: that a
 * deliberate decline is remembered, and that the rejections which must NOT be
 * remembered are not.
 */

const ctx = {
  conceptId: 'math.found.abstraction',
  title: 'Abstraction',
  description: 'Stripping away detail to reveal shared structure.',
  prerequisites: [],
}

const store = () => {
  const rows = new Map<string, string>()
  return {
    rows,
    client: {
      visualizationCache: {
        findUnique: async ({ where }: { where: { conceptKey: string } }) =>
          rows.has(where.conceptKey) ? { code: rows.get(where.conceptKey)! } : null,
        update: async (args: unknown) => {
          const a = args as { where: { conceptKey: string }; data: { code?: string } }
          if (typeof a.data?.code === 'string') rows.set(a.where.conceptKey, a.data.code)
        },
        create: async ({ data }: { data: { conceptKey: string; code: string } }) => {
          rows.set(data.conceptKey, data.code)
        },
      },
    } as never,
  }
}

describe('remembering a deliberate decline', () => {
  it('a declined topic is remembered, so the next learner pays nothing', async () => {
    const s = store()
    await writeDecline(ctx, 'no-suitable-form', s.client)
    expect(await readDecline(ctx, s.client)).not.toBeNull()
    expect(s.rows.has(declineKey(ctx.conceptId))).toBe(true)
  })

  it('ONLY A DELIBERATE DECLINE IS CACHED — never a transient failure', async () => {
    for (const reason of [
      'generation-failed', 'budget-exceeded', 'structurally-invalid',
      'no-source-text', 'flag-off',
      // Variance-prone: measured giving different verdicts for the same topic
      // on consecutive runs. Caching it would freeze one unlucky roll.
      'not-anchored-to-concept',
    ]) {
      const s = store()
      await writeDecline(ctx, reason, s.client)
      expect(await readDecline(ctx, s.client), reason).toBeNull()
    }
  })

  it('CHANGED GROUNDING RE-OPENS THE QUESTION', async () => {
    const s = store()
    await writeDecline(ctx, 'no-suitable-form', s.client)
    const edited = { ...ctx, description: 'A completely different description of the concept.' }
    expect(await readDecline(edited, s.client)).toBeNull()
  })

  it('a decline expires — the generator may improve', async () => {
    const s = store()
    const t0 = Date.now()
    await writeDecline(ctx, 'no-suitable-form', s.client, t0)
    expect(await readDecline(ctx, s.client, t0 + DECLINE_TTL_MS - 1000)).not.toBeNull()
    expect(await readDecline(ctx, s.client, t0 + DECLINE_TTL_MS + 1000)).toBeNull()
  })

  it('an unreadable cache means TRY AGAIN, never a permanent refusal', async () => {
    const broken = {
      visualizationCache: {
        findUnique: async () => { throw new Error('db down') },
        update: async () => undefined,
        create: async () => undefined,
      },
    } as never
    expect(await readDecline(ctx, broken)).toBeNull()
  })

  it('a corrupt record is ignored rather than trusted', async () => {
    const s = store()
    s.rows.set(declineKey(ctx.conceptId), '{not json')
    expect(await readDecline(ctx, s.client)).toBeNull()
  })
})

describe('remembering a settled REJECT, but never a HOLD', () => {
  const figure = { type: 'graph', equation: '2x + 1' }

  const report = (decision: 'promote' | 'reject' | 'hold') => ({
    dimensions: {
      relevance: { verdict: 'pass' as const, reason: '' },
      correctness: { verdict: 'pass' as const, reason: '' },
      explanatoryValue: { verdict: 'pass' as const, reason: '' },
      grounding: { verdict: 'pass' as const, reason: '' },
      rendering: { verdict: 'pass' as const, reason: '' },
    },
    decision,
    confidence: 1,
    judged: true,
  })

  it('A REJECT IS REMEMBERED — the figure is frozen, so re-judging buys nothing', async () => {
    const s = store()
    await writeVerdict(ctx, figure, report('reject'), s.client)
    const back = await readVerdict(ctx, figure, s.client)
    expect(back?.decision).toBe('reject')
  })

  it('A HOLD IS NEVER REMEMBERED — it is usually about the moment', async () => {
    const s = store()
    await writeVerdict(ctx, figure, report('hold'), s.client)
    expect(await readVerdict(ctx, figure, s.client)).toBeNull()
  })

  it('a cached reject does not cover a DIFFERENT figure', async () => {
    const s = store()
    await writeVerdict(ctx, figure, report('reject'), s.client)
    expect(await readVerdict(ctx, { type: 'graph', equation: 'x^2' }, s.client)).toBeNull()
  })

  it('a cached reject is re-opened when the grounding text changes', async () => {
    const s = store()
    await writeVerdict(ctx, figure, report('reject'), s.client)
    expect(await readVerdict({ ...ctx, description: 'entirely different text' }, figure, s.client)).toBeNull()
  })
})
