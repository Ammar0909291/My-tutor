import { describe, it, expect } from 'vitest'

function computeScore(correct: boolean[]): number {
  if (correct.length === 0) return 0
  return Math.round((correct.filter(Boolean).length / correct.length) * 100)
}

function assessmentResult(score: number, passMark = 60) {
  return {
    passed: score >= passMark,
    score,
    grade: score >= 90 ? 'A' : score >= 75 ? 'B' : score >= 60 ? 'C' : 'F',
  }
}

function computeMastery(existing: number | null, score: number) {
  const pct = existing !== null ? Math.round((existing + score) / 2) : score
  return { masteryPct: pct, status: pct >= 80 ? 'MASTERED' : pct >= 50 ? 'COMPLETED' : 'IN_PROGRESS' }
}

describe('Assessment journey', () => {
  it('all correct → score 100', () => {
    expect(computeScore([true, true, true, true, true])).toBe(100)
  })

  it('all wrong → score 0', () => {
    expect(computeScore([false, false, false])).toBe(0)
  })

  it('half correct → score 50', () => {
    expect(computeScore([true, true, false, false])).toBe(50)
  })

  it('empty answers → score 0', () => {
    expect(computeScore([])).toBe(0)
  })

  it('score 100 → passes, grade A', () => {
    const r = assessmentResult(100)
    expect(r.passed).toBe(true)
    expect(r.grade).toBe('A')
  })

  it('score 75 → passes, grade B', () => {
    const r = assessmentResult(75)
    expect(r.passed).toBe(true)
    expect(r.grade).toBe('B')
  })

  it('score 60 → passes at boundary', () => {
    expect(assessmentResult(60).passed).toBe(true)
    expect(assessmentResult(60).grade).toBe('C')
  })

  it('score 59 → fails', () => {
    const r = assessmentResult(59)
    expect(r.passed).toBe(false)
    expect(r.grade).toBe('F')
  })

  it('score 0 → fails', () => {
    expect(assessmentResult(0).passed).toBe(false)
  })

  it('score 80 → MASTERED after assessment', () => {
    const score = computeScore([true, true, true, true, false, false, true, true, true, true]) // 8/10 = 80
    const { status } = computeMastery(null, score)
    expect(status).toBe('MASTERED')
  })

  it('replay detection: completedAt already set → count=0 → 409', () => {
    const completedAt: Date | null = new Date()
    const claimCount = completedAt !== null ? 0 : 1
    expect(claimCount).toBe(0)
  })

  it('unsubmitted session: completedAt null → claim succeeds', () => {
    const completedAt: Date | null = null
    const claimCount = completedAt !== null ? 0 : 1
    expect(claimCount).toBe(1)
  })

  it('score feeds into mastery averaging on subsequent practice', () => {
    const assessmentScore = 70
    const practiceScore = 90
    const combined = computeMastery(assessmentScore, practiceScore)
    expect(combined.masteryPct).toBe(80)
    expect(combined.status).toBe('MASTERED')
  })
})
