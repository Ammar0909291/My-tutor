import { describe, it, expect } from 'vitest'

function computeMastery(existing: number | null, score: number) {
  const pct = existing !== null ? Math.round((existing + score) / 2) : score
  return { masteryPct: pct, status: pct >= 80 ? 'MASTERED' : pct >= 50 ? 'COMPLETED' : 'IN_PROGRESS' }
}

function overallProgress(topics: Array<{ masteryPct: number; status: string }>) {
  if (topics.length === 0) return 0
  const completed = topics.filter(t => t.status === 'MASTERED' || t.status === 'COMPLETED').length
  return Math.round((completed / topics.length) * 100)
}

describe('Longitudinal journey', () => {
  it('progress accumulates across topics', () => {
    const topics = [
      computeMastery(null, 85),
      computeMastery(null, 55),
      computeMastery(null, 30),
    ]
    const progress = overallProgress(topics)
    expect(progress).toBe(67) // Math.round(2/3 * 100)
  })

  it('all topics mastered → 100% progress', () => {
    const topics = [85, 90, 80, 95].map(s => computeMastery(null, s))
    expect(overallProgress(topics)).toBe(100)
  })

  it('no topics → 0% progress', () => {
    expect(overallProgress([])).toBe(0)
  })

  it('all in_progress → 0% progress', () => {
    const topics = [20, 30, 40].map(s => computeMastery(null, s))
    expect(overallProgress(topics)).toBe(0)
  })

  it('mastery evolves correctly over 10 sessions', () => {
    const scores = [60, 70, 65, 80, 85, 75, 90, 88, 92, 95]
    let mastery: number | null = null
    for (const score of scores) {
      mastery = computeMastery(mastery, score).masteryPct
    }
    expect(mastery).toBeGreaterThanOrEqual(70)
    expect(mastery).toBeLessThanOrEqual(100)
  })

  it('mastery always bounded [0, 100]', () => {
    const extremeScores = [0, 100, 0, 100, 0, 100]
    let mastery: number | null = null
    for (const score of extremeScores) {
      mastery = computeMastery(mastery, score).masteryPct
      expect(mastery).toBeGreaterThanOrEqual(0)
      expect(mastery).toBeLessThanOrEqual(100)
    }
  })

  it('recommendation evolution: as topics complete, remaining weak topics get priority', () => {
    const topicsBefore = [
      { id: 'a', masteryPct: 20 },
      { id: 'b', masteryPct: 90 },
      { id: 'c', masteryPct: 45 },
    ]
    const topicsAfter = [
      { id: 'a', masteryPct: 70 },
      { id: 'b', masteryPct: 90 },
      { id: 'c', masteryPct: 45 },
    ]
    const weakBefore = [...topicsBefore].sort((a, b) => a.masteryPct - b.masteryPct)[0]
    const weakAfter = [...topicsAfter].sort((a, b) => a.masteryPct - b.masteryPct)[0]
    expect(weakBefore.id).toBe('a')
    expect(weakAfter.id).toBe('c')
  })
})
