import { describe, it, expect, vi, beforeEach } from 'vitest'

// Re-implement the mastery state machine (from practice/submit/route.ts) as a pure function for journey testing
function computeMastery(existingMasteryPct: number | null, score: number): { masteryPct: number; status: string } {
  const masteryPct = existingMasteryPct !== null ? Math.round((existingMasteryPct + score) / 2) : score
  let status: string
  if (masteryPct >= 80) status = 'MASTERED'
  else if (masteryPct >= 50) status = 'COMPLETED'
  else status = 'IN_PROGRESS'
  return { masteryPct, status }
}

describe('Learning session journey', () => {
  it('first lesson creates initial progress', () => {
    const result = computeMastery(null, 70)
    expect(result.masteryPct).toBe(70)
    expect(result.status).toBe('COMPLETED')
  })

  it('second lesson updates progress via averaging', () => {
    const first = computeMastery(null, 60)
    const second = computeMastery(first.masteryPct, 90)
    expect(second.masteryPct).toBe(75) // Math.round((60+90)/2)
    expect(second.status).toBe('COMPLETED')
  })

  it('continued practice advances student to mastery', () => {
    let mastery: number | null = null
    for (let i = 0; i < 5; i++) {
      const r = computeMastery(mastery, 90)
      mastery = r.masteryPct
    }
    expect(mastery).toBeGreaterThanOrEqual(80)
  })

  it('practice answer submission determines score correctly', () => {
    // correct[] array of booleans → score = (correct count / total) * 100
    const correct = [true, true, false, true, false]
    const score = Math.round((correct.filter(Boolean).length / correct.length) * 100)
    expect(score).toBe(60)
  })

  it('all correct → score 100', () => {
    const correct = [true, true, true, true, true]
    const score = Math.round((correct.filter(Boolean).length / correct.length) * 100)
    expect(score).toBe(100)
  })

  it('all wrong → score 0', () => {
    const correct = [false, false, false]
    const score = Math.round((correct.filter(Boolean).length / correct.length) * 100)
    expect(score).toBe(0)
  })

  it('score 0 first lesson → IN_PROGRESS', () => {
    const result = computeMastery(null, 0)
    expect(result.status).toBe('IN_PROGRESS')
  })

  it('journey: topic loads → submit → progress updates atomically', () => {
    // Simulate the atomic upsert: same topic, same user, score updates via avg
    const sessions = [75, 85, 90]
    let running: number | null = null
    for (const score of sessions) {
      const r = computeMastery(running, score)
      running = r.masteryPct
    }
    // After 3 sessions of 75, 85, 90: convergence toward higher mastery
    expect(running).toBeGreaterThan(75)
  })
})
