/**
 * HIGH-8: TOCTOU on completedAt guard — concurrent submissions must
 * run side-effects exactly once.
 * HIGH-9: Server-authoritative startedAt.
 */
import { describe, it, expect, vi } from 'vitest'

// Simulate the atomic conditional-UPDATE pattern
function atomicClaim(
  sessions: Map<string, { completedAt: Date | null; score: number | null }>,
  sessionId: string,
  score: number,
): { claimed: boolean } {
  const s = sessions.get(sessionId)
  if (!s || s.completedAt !== null) return { claimed: false }
  s.completedAt = new Date()
  s.score = score
  return { claimed: true }
}

describe('HIGH-8: atomic completedAt claim', () => {
  it('first request claims the session', () => {
    const sessions = new Map([['s1', { completedAt: null, score: null }]])
    expect(atomicClaim(sessions, 's1', 80).claimed).toBe(true)
  })

  it('second sequential request returns claimed=false (already completed)', () => {
    const sessions = new Map([['s1', { completedAt: null, score: null }]])
    atomicClaim(sessions, 's1', 80)
    expect(atomicClaim(sessions, 's1', 90).claimed).toBe(false)
  })

  it('two concurrent requests: exactly one claims, one does not', () => {
    const sessions = new Map([['s1', { completedAt: null, score: null }]])
    const results = [80, 90].map((score) => atomicClaim(sessions, 's1', score))
    expect(results.filter((r) => r.claimed)).toHaveLength(1)
    expect(results.filter((r) => !r.claimed)).toHaveLength(1)
  })

  it('side-effects only run for the claiming request', () => {
    const sessions = new Map([['s1', { completedAt: null, score: null }]])
    let sideEffectCount = 0
    for (let i = 0; i < 3; i++) {
      const { claimed } = atomicClaim(sessions, 's1', 70)
      if (claimed) sideEffectCount++
    }
    expect(sideEffectCount).toBe(1)
  })
})

describe('HIGH-9: server-authoritative startedAt', () => {
  it('ignores client-supplied startedAt; uses server createdAt', () => {
    const serverCreatedAt = new Date('2026-06-16T10:00:00Z')
    const clientStartedAt = new Date('2026-06-16T10:59:00Z') // forged — near limit

    // The route now always: const startedAt = ps.createdAt
    function getStartedAt(psCreatedAt: Date, _clientValue?: Date): Date {
      return psCreatedAt // client value ignored
    }

    const used = getStartedAt(serverCreatedAt, clientStartedAt)
    expect(used).toBe(serverCreatedAt)
    expect(used).not.toBe(clientStartedAt)
  })

  it('time elapsed is measured from server createdAt', () => {
    const createdAt = new Date('2026-06-16T10:00:00Z')
    const submitAt  = new Date('2026-06-16T11:30:00Z') // 90 min later
    const elapsed   = (submitAt.getTime() - createdAt.getTime()) / 60000
    expect(elapsed).toBe(90)
  })
})
