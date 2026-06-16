import { describe, it, expect } from 'vitest'

function computeMastery(existing: number | null, score: number) {
  const pct = existing !== null ? Math.round((existing + score) / 2) : score
  return { masteryPct: pct, status: pct >= 80 ? 'MASTERED' : pct >= 50 ? 'COMPLETED' : 'IN_PROGRESS' }
}

function classifyPerformance(masteryPct: number): 'remedial' | 'standard' | 'advanced' {
  if (masteryPct < 50) return 'remedial'
  if (masteryPct < 80) return 'standard'
  return 'advanced'
}

describe('Weak student journey', () => {
  it('repeated low scores keep student in remedial path', () => {
    let mastery: number | null = null
    for (let i = 0; i < 5; i++) mastery = computeMastery(mastery, 20).masteryPct
    expect(classifyPerformance(mastery!)).toBe('remedial')
  })

  it('mastery 30 → remedial', () => {
    expect(classifyPerformance(30)).toBe('remedial')
  })

  it('mastery 49 → remedial (boundary)', () => {
    expect(classifyPerformance(49)).toBe('remedial')
  })

  it('wrong answers generate mistake indicators', () => {
    const correct = [false, true, false, false, true]
    const mistakes = correct.map((c, i) => (!c ? i : null)).filter(i => i !== null)
    expect(mistakes.length).toBe(3)
  })

  it('mistake indices match wrong answers', () => {
    const questions = ['q1', 'q2', 'q3', 'q4']
    const correct = [false, true, false, true]
    const weakQuestions = questions.filter((_, i) => !correct[i])
    expect(weakQuestions).toEqual(['q1', 'q3'])
  })

  it('all correct → no mistakes', () => {
    const correct = [true, true, true]
    const mistakes = correct.filter(c => !c)
    expect(mistakes.length).toBe(0)
  })

  it('improvement from remedial: rising scores lift mastery', () => {
    let mastery: number | null = 20
    for (const score of [40, 55, 65, 75]) mastery = computeMastery(mastery, score).masteryPct
    expect(mastery).toBeGreaterThan(40)
  })

  it('weak topic sorted first for recommendations', () => {
    const topics = [
      { id: 'algebra', masteryPct: 20 },
      { id: 'geometry', masteryPct: 85 },
      { id: 'calculus', masteryPct: 35 },
    ]
    const sorted = [...topics].sort((a, b) => a.masteryPct - b.masteryPct)
    expect(sorted[0].id).toBe('algebra')
    expect(sorted[sorted.length - 1].id).toBe('geometry')
  })

  it('weak student stays IN_PROGRESS after low score', () => {
    expect(computeMastery(null, 10).status).toBe('IN_PROGRESS')
  })
})
