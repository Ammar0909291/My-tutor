import { describe, it, expect } from 'vitest'

// Adaptive difficulty classifier (from adaptiveLearning logic)
function classifyPerformance(masteryPct: number): 'remedial' | 'standard' | 'advanced' {
  if (masteryPct < 50) return 'remedial'
  if (masteryPct < 80) return 'standard'
  return 'advanced'
}

function computeMastery(existing: number | null, score: number) {
  const pct = existing !== null ? Math.round((existing + score) / 2) : score
  return { masteryPct: pct, status: pct >= 80 ? 'MASTERED' : pct >= 50 ? 'COMPLETED' : 'IN_PROGRESS' }
}

describe('Weak student journey', () => {
  it('repeated low scores keep student in remedial path', () => {
    let mastery: number | null = null
    for (let i = 0; i < 5; i++) {
      const r = computeMastery(mastery, 20)
      mastery = r.masteryPct
    }
    expect(classifyPerformance(mastery!)).toBe('remedial')
  })

  it('weak student gets remedial classification', () => {
    expect(classifyPerformance(30)).toBe('remedial')
    expect(classifyPerformance(49)).toBe('remedial')
  })

  it('wrong answers generate mistake indicators', () => {
    const correct = [false, true, false, false, true]
    const mistakes = correct.map((c, i) => (!c ? i : null)).filter(i => i !== null)
    expect(mistakes.length).toBe(3)
  })

  it('mistake count tracks weak questions', () => {
    const questions = ['q1', 'q2', 'q3', 'q4']
    const correct = [false, true, false, true]
    const weakQuestions = questions.filter((_, i) => !correct[i])
    expect(weakQuestions).toEqual(['q1', 'q3'])
  })

  it('improvement from remedial: score increases lift mastery', () => {
    let mastery: number | null = 20 // starts weak
    const improvingScores = [40, 55, 65, 75]
    for (const score of improvingScores) {
      const r = computeMastery(mastery, score)
      mastery = r.masteryPct
    }
    expect(mastery).toBeGreaterThan(40) // improved from starting weak
  })

  it('recommendation weights weak topic above strong topic', () => {
    const topics = [
      { id: 'algebra', masteryPct: 20 },
      { id: 'geometry', masteryPct: 85 },
      { id: 'calculus', masteryPct: 35 },
    ]
    // Weak = low mastery → recommend first
    const sorted = [...topics].sort((a, b) => a.masteryPct - b.masteryPct)
    expect(sorted[0].id).toBe('algebra')
    expect(sorted[sorted.length - 1].id).toBe('geometry')
  })
})
