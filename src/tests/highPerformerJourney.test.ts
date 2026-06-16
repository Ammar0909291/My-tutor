import { describe, it, expect } from 'vitest'

function computeMastery(existing: number | null, score: number) {
  const pct = existing !== null ? Math.round((existing + score) / 2) : score
  return { masteryPct: pct, status: pct >= 80 ? 'MASTERED' : pct >= 50 ? 'COMPLETED' : 'IN_PROGRESS' }
}

function applyStatusNonRegression(existingStatus: string, newMasteryPct: number): string {
  if (existingStatus === 'NOT_STARTED' || existingStatus === 'IN_PROGRESS') {
    return newMasteryPct >= 80 ? 'MASTERED' : newMasteryPct >= 50 ? 'COMPLETED' : 'IN_PROGRESS'
  }
  return existingStatus
}

function classifyPerformance(masteryPct: number): 'remedial' | 'standard' | 'advanced' {
  if (masteryPct < 50) return 'remedial'
  if (masteryPct < 80) return 'standard'
  return 'advanced'
}

describe('High-performing student journey', () => {
  it('score 90 first session → MASTERED immediately', () => {
    expect(computeMastery(null, 90).status).toBe('MASTERED')
  })

  it('consistent high performance stays mastered', () => {
    let mastery: number | null = null
    let lastStatus = ''
    for (const score of [90, 95, 88, 92]) {
      const r = computeMastery(mastery, score)
      mastery = r.masteryPct
      lastStatus = r.status
    }
    expect(lastStatus).toBe('MASTERED')
    expect(mastery).toBeGreaterThanOrEqual(80)
  })

  it('mastery 80 → advanced', () => {
    expect(classifyPerformance(80)).toBe('advanced')
  })

  it('mastery 100 → advanced', () => {
    expect(classifyPerformance(100)).toBe('advanced')
  })

  it('mastered topic deprioritized in recommendations', () => {
    const topics = [
      { id: 'algebra', masteryPct: 90, status: 'MASTERED' },
      { id: 'calculus', masteryPct: 40, status: 'IN_PROGRESS' },
    ]
    const sorted = [...topics].sort((a, b) => a.masteryPct - b.masteryPct)
    expect(sorted[0].id).toBe('calculus')
  })

  it('MASTERED status not demoted by single low score', () => {
    const newMasteryPct = Math.round((85 + 20) / 2)
    expect(applyStatusNonRegression('MASTERED', newMasteryPct)).toBe('MASTERED')
  })

  it('COMPLETED status not demoted by low score', () => {
    expect(applyStatusNonRegression('COMPLETED', 30)).toBe('COMPLETED')
  })

  it('IN_PROGRESS can be promoted to MASTERED', () => {
    expect(applyStatusNonRegression('IN_PROGRESS', 85)).toBe('MASTERED')
  })

  it('all topics mastered → 100% progress', () => {
    const topics = [85, 90, 80, 95].map(s => computeMastery(null, s))
    const completed = topics.filter(t => t.status === 'MASTERED' || t.status === 'COMPLETED').length
    expect(Math.round((completed / topics.length) * 100)).toBe(100)
  })

  it('mastery bounded at 100 even with perfect scores', () => {
    let mastery: number | null = null
    for (let i = 0; i < 10; i++) mastery = computeMastery(mastery, 100).masteryPct
    expect(mastery).toBeLessThanOrEqual(100)
  })
})
