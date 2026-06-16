import { describe, it, expect } from 'vitest'

function computeMastery(existingMasteryPct: number | null, score: number): { masteryPct: number; status: string } {
  const masteryPct = existingMasteryPct !== null ? Math.round((existingMasteryPct + score) / 2) : score
  const status = masteryPct >= 80 ? 'MASTERED' : masteryPct >= 50 ? 'COMPLETED' : 'IN_PROGRESS'
  return { masteryPct, status }
}

function scoreFromAnswers(correct: boolean[]): number {
  if (correct.length === 0) return 0
  return Math.round((correct.filter(Boolean).length / correct.length) * 100)
}

describe('Learning session journey', () => {
  it('first lesson creates initial progress from score', () => {
    const result = computeMastery(null, 70)
    expect(result.masteryPct).toBe(70)
    expect(result.status).toBe('COMPLETED')
  })

  it('second lesson updates progress via averaging', () => {
    const first = computeMastery(null, 60)
    const second = computeMastery(first.masteryPct, 90)
    expect(second.masteryPct).toBe(75)
    expect(second.status).toBe('COMPLETED')
  })

  it('continued practice advances to mastery', () => {
    let mastery: number | null = null
    for (let i = 0; i < 5; i++) {
      mastery = computeMastery(mastery, 90).masteryPct
    }
    expect(mastery).toBeGreaterThanOrEqual(80)
  })

  it('answer array determines score: 3/5 correct → 60', () => {
    expect(scoreFromAnswers([true, true, true, false, false])).toBe(60)
  })

  it('all correct → score 100', () => {
    expect(scoreFromAnswers([true, true, true, true, true])).toBe(100)
  })

  it('all wrong → score 0', () => {
    expect(scoreFromAnswers([false, false, false])).toBe(0)
  })

  it('empty answers → score 0', () => {
    expect(scoreFromAnswers([])).toBe(0)
  })

  it('score 0 first lesson → IN_PROGRESS', () => {
    expect(computeMastery(null, 0).status).toBe('IN_PROGRESS')
  })

  it('score 80 first lesson → MASTERED', () => {
    expect(computeMastery(null, 80).status).toBe('MASTERED')
  })

  it('score 79 first lesson → COMPLETED', () => {
    expect(computeMastery(null, 79).status).toBe('COMPLETED')
  })

  it('score 49 first lesson → IN_PROGRESS', () => {
    expect(computeMastery(null, 49).status).toBe('IN_PROGRESS')
  })

  it('multiple sessions converge upward with high scores', () => {
    const sessions = [75, 85, 90]
    let mastery: number | null = null
    for (const score of sessions) mastery = computeMastery(mastery, score).masteryPct
    expect(mastery).toBeGreaterThan(75)
  })

  it('mastery is always integer (Math.round)', () => {
    const result = computeMastery(60, 71)
    expect(Number.isInteger(result.masteryPct)).toBe(true)
  })
})
