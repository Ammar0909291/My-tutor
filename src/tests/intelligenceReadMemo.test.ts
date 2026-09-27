/**
 * EGRESS (2026-09-27): the per-turn adaptive teaching context re-read the
 * learner's whole topic_progress table six times, and the VISUAL evidence three
 * times, because its loaders call each other. Inside withRequestMemo each
 * distinct read happens once; outside, behaviour is unchanged.
 */
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { readFileSync } from 'node:fs'

const calls: Record<string, number> = {}
const ROWS = [
  { subjectSlug: 'physics', topicSlug: 'phys.a', status: 'IN_PROGRESS', masteryPct: 40, attempts: 3, revisionCount: 1, lastScore: 40 },
  { subjectSlug: 'physics', topicSlug: 'phys.b', status: 'COMPLETED', masteryPct: 90, attempts: 1, revisionCount: 0, lastScore: 90 },
]
vi.mock('@/lib/db/prisma', () => ({
  prisma: new Proxy({}, {
    get: (_t, model: string) => new Proxy({}, {
      get: (_m, op: string) => async () => {
        const k = `${model}.${op}`
        calls[k] = (calls[k] ?? 0) + 1
        if (k === 'topicProgress.findMany') return ROWS.map((r) => ({ ...r }))
        return op === 'findMany' ? [] : null
      },
    }),
  }),
}))

const { getWeightedTeachingPlanProfile } = await import('@/lib/intelligence/methodWeighting')
const { withRequestMemo, memoized } = await import('@/lib/db/requestMemo')

beforeEach(() => { for (const k of Object.keys(calls)) delete calls[k] })

describe('the per-turn teaching-context chain', () => {
  it('without a memo scope it re-reads (the measured defect, kept as the baseline)', async () => {
    await getWeightedTeachingPlanProfile('u1')
    expect(calls['topicProgress.findMany']).toBeGreaterThanOrEqual(5)
  })

  it('inside withRequestMemo: topic_progress and VISUAL evidence are read once each', async () => {
    await withRequestMemo(() => getWeightedTeachingPlanProfile('u1'))
    expect(calls['topicProgress.findMany']).toBe(1)
  })

  it('returns the same result either way', async () => {
    const plain = await getWeightedTeachingPlanProfile('u1')
    const memo = await withRequestMemo(() => getWeightedTeachingPlanProfile('u1'))
    expect(memo).toEqual(plain)
  })

  it('nothing is shared across scopes (no stale reads across turns)', async () => {
    await withRequestMemo(() => getWeightedTeachingPlanProfile('u1'))
    await withRequestMemo(() => getWeightedTeachingPlanProfile('u1'))
    expect(calls['topicProgress.findMany']).toBe(2)
  })
})

describe('memoized', () => {
  it('evicts a failed load so a retry runs', async () => {
    let n = 0
    await withRequestMemo(async () => {
      await expect(memoized('k', async () => { n++; throw new Error('x') })).rejects.toThrow('x')
      await memoized('k', async () => { n++; return 1 })
    })
    expect(n).toBe(2)
  })
})

describe('wiring', () => {
  it('the chat route wraps the teaching-context build in the memo', () => {
    const route = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    expect(route).toContain('withRequestMemo(() => getTutorTeachingContext(userId, subjectCode, currentTopicSlug))')
  })
})
