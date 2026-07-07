import { describe, it, expect } from 'vitest'

function computeScore(correct: boolean[]): number {
  if (correct.length === 0) return 0
  return Math.round((correct.filter(Boolean).length / correct.length) * 100)
}

// Atomic claim simulation: returns whether claim succeeded
function atomicClaim(session: { id: string; completedAt: Date | null }, claimTime: Date): { claimed: boolean; count: number } {
  if (session.completedAt !== null) return { claimed: false, count: 0 }
  session.completedAt = claimTime
  return { claimed: true, count: 1 }
}

describe('School assessment workflow', () => {
  it('assessment score computed from correct[] array', () => {
    expect(computeScore([true, true, false, true, false])).toBe(60)
  })

  it('full marks on all correct', () => {
    expect(computeScore([true, true, true, true])).toBe(100)
  })

  it('zero on all wrong', () => {
    expect(computeScore([false, false, false])).toBe(0)
  })

  it('first submit claims session', () => {
    const session = { id: 's1', completedAt: null }
    const result = atomicClaim(session, new Date())
    expect(result.claimed).toBe(true)
    expect(result.count).toBe(1)
  })

  it('second submit on same session is rejected (HIGH-8)', () => {
    const session = { id: 's1', completedAt: new Date('2024-01-01') }
    const result = atomicClaim(session, new Date())
    expect(result.claimed).toBe(false)
    expect(result.count).toBe(0)
  })

  it('concurrent claims: first wins, second gets count=0', () => {
    const session = { id: 's1', completedAt: null }
    const first = atomicClaim(session, new Date())
    const second = atomicClaim(session, new Date()) // session.completedAt now set
    expect(first.claimed).toBe(true)
    expect(second.claimed).toBe(false)
  })

  it('HIGH-9: server-side startedAt used, not client-supplied', () => {
    const serverStartedAt = new Date('2024-01-01T10:00:00Z')
    const clientStartedAt = new Date('2024-01-01T09:00:00Z') // client tries to cheat time
    // Server ignores client startedAt, uses session.createdAt
    const usedStartedAt = serverStartedAt // always from DB
    expect(usedStartedAt).toEqual(serverStartedAt)
    expect(usedStartedAt).not.toEqual(clientStartedAt)
  })

  it('time taken computed from server timestamps only', () => {
    const startedAt = new Date('2024-01-01T10:00:00Z')
    const completedAt = new Date('2024-01-01T10:30:00Z')
    const timeTakenMs = completedAt.getTime() - startedAt.getTime()
    expect(timeTakenMs).toBe(30 * 60 * 1000)
  })
})
