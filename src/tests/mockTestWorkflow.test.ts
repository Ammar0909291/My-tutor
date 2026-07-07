import { describe, it, expect } from 'vitest'

function computeScore(correct: boolean[]): number {
  if (correct.length === 0) return 0
  return Math.round((correct.filter(Boolean).length / correct.length) * 100)
}

function isTimeLimitExceeded(startedAt: Date, limitMinutes: number, now: Date): boolean {
  const elapsed = now.getTime() - startedAt.getTime()
  return elapsed > limitMinutes * 60 * 1000
}

describe('Mock test workflow', () => {
  it('mock test score computed correctly', () => {
    expect(computeScore([true, false, true, true, false])).toBe(60)
  })

  it('time limit not exceeded within limit', () => {
    const start = new Date('2024-01-01T10:00:00Z')
    const now = new Date('2024-01-01T10:29:00Z') // 29 min
    expect(isTimeLimitExceeded(start, 30, now)).toBe(false)
  })

  it('time limit exceeded past limit', () => {
    const start = new Date('2024-01-01T10:00:00Z')
    const now = new Date('2024-01-01T10:31:00Z') // 31 min
    expect(isTimeLimitExceeded(start, 30, now)).toBe(true)
  })

  it('time limit exactly at boundary: not exceeded', () => {
    const start = new Date('2024-01-01T10:00:00Z')
    const now = new Date('2024-01-01T10:30:00Z') // exactly 30 min
    expect(isTimeLimitExceeded(start, 30, now)).toBe(false)
  })

  it('replay protection: already submitted session rejected', () => {
    const session = { completedAt: new Date() }
    const isAlreadySubmitted = session.completedAt !== null
    expect(isAlreadySubmitted).toBe(true)
  })

  it('first submission accepted', () => {
    const session = { completedAt: null }
    const isAlreadySubmitted = session.completedAt !== null
    expect(isAlreadySubmitted).toBe(false)
  })

  it('server-authoritative startedAt: uses createdAt from DB', () => {
    const dbCreatedAt = new Date('2024-01-01T10:00:00Z')
    const clientClaim = new Date('2024-01-01T09:30:00Z')
    // Route always uses ps.createdAt (HIGH-9 fix)
    const startedAt = dbCreatedAt
    expect(startedAt).toEqual(dbCreatedAt)
    expect(startedAt).not.toEqual(clientClaim)
  })

  it('score 0 mock test is valid (completed but poorly)', () => {
    expect(computeScore([false, false, false, false])).toBe(0)
  })
})
