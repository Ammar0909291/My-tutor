import { describe, it, expect, vi, beforeEach } from 'vitest'

/**
 * MASTERY MUST NOT REGRESS (real-learner QA, 2026-09-21).
 *
 * `/api/assessment/evaluate` upserts `topicProgress.masteryPct` from this
 * ONE attempt's score, unconditionally — no floor against the learner's
 * prior best. Measured live: chem.org.pericyclic dropped to masteryPct=25
 * over 11 attempts on an account that had scored higher earlier in the same
 * session. `status` already had an equivalent guard (a MASTERED/COMPLETED
 * topic cannot be demoted by a later attempt) one line above the write this
 * suite targets; the number had none until this fix.
 */

let storedRow: { status: string; masteryPct: number; lastScore: number | null; attempts: number } | null = null

vi.mock('@/lib/auth', () => ({ auth: async () => ({ user: { id: 'u1' } }) }))
vi.mock('@/lib/db/prisma', () => ({
  prisma: {
    topicProgress: {
      findUnique: async () => storedRow,
      upsert: async ({ update, create }: any) => {
        const next = storedRow ? { ...storedRow, ...update, attempts: storedRow.attempts + 1 } : { ...create }
        storedRow = next
        return next
      },
    },
  },
}))
vi.mock('@/lib/ai/learnerProfile', () => ({ invalidateLearnerProfileCache: () => {} }))

async function evaluate(correctness: number, reasoning: number, confidence: number) {
  const { POST } = await import('@/app/api/assessment/evaluate/route')
  const req = new Request('http://x/api/assessment/evaluate', {
    method: 'POST',
    body: JSON.stringify({ subjectSlug: 'chemistry', topicSlug: 'chem.org.pericyclic', correctness, reasoning, confidence }),
  })
  const res = await POST(req)
  return res.json()
}

describe('assessment/evaluate — masteryPct floor', () => {
  beforeEach(() => { storedRow = null; vi.resetModules() })

  it('a later, worse attempt does not lower masteryPct below the prior best', async () => {
    const first = await evaluate(90, 90, 90) // strong first attempt
    expect(first.topicProgress.masteryPct).toBeGreaterThanOrEqual(80)

    const second = await evaluate(10, 10, 10) // a stumble later in the session
    expect(second.topicProgress.masteryPct).toBe(first.topicProgress.masteryPct) // floored, not overwritten
  })

  it('a later, BETTER attempt still raises masteryPct (the floor is one-directional)', async () => {
    await evaluate(40, 40, 40)
    const better = await evaluate(95, 95, 95)
    expect(better.topicProgress.masteryPct).toBeGreaterThan(40)
  })

  it('lastScore always reflects the true latest attempt, unfloored', async () => {
    await evaluate(90, 90, 90)
    await evaluate(10, 10, 10)
    expect(storedRow?.lastScore).toBeLessThan(50) // the honest "how did THIS attempt go" signal survives
    expect(storedRow?.masteryPct).toBeGreaterThanOrEqual(80) // but the cumulative mastery number does not regress
  })

  it('attempts still increments on every call, floor or no floor', async () => {
    await evaluate(90, 90, 90)
    await evaluate(10, 10, 10)
    expect(storedRow?.attempts).toBe(2)
  })
})
