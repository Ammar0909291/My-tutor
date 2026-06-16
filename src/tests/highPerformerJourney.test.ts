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

describe('High-performing student journey', () => {
  it('high scores quickly reach mastery', () => {
    const r1 = computeMastery(null, 90)
    expect(r1.status).toBe('MASTERED')
  })

  it('consistent high performance stays mastered', () => {
    let mastery: number | null = null
    const sessions = [90, 95, 88, 92]
    let lastStatus = ''
    for (const score of sessions) {
      const r = computeMastery(mastery, score)
      mastery = r.masteryPct
      lastStatus = r.status
    }
    expect(lastStatus).toBe('MASTERED')
    expect(mastery).toBeGreaterThanOrEqual(80)
  })

  it('advanced classification for high mastery', () => {
    expect(classifyPerformance(80)).toBe('advanced')
    expect(classifyPerformance(95)).toBe('advanced')
    expect(classifyPerformance(100)).toBe('advanced')
  })

  it('mastered topics deprioritized in recommendations', () => {
    const topics = [
      { id: 'algebra', masteryPct: 90, status: 'MASTERED' },
      { id: 'calculus', masteryPct: 40, status: 'IN_PROGRESS' },
    ]
    const unmasteredFirst = [...topics].sort((a, b) => a.masteryPct - b.masteryPct)
    expect(unmasteredFirst[0].id).toBe('calculus') // weakest first
  })

  it('MASTERED status is not demoted by single low score', () => {
    const existingStatus: string = 'MASTERED'
    const masteryPct = Math.round((85 + 20) / 2) // score drops to 20
    const newStatus = (existingStatus === 'NOT_STARTED' || existingStatus === 'IN_PROGRESS')
      ? (masteryPct >= 80 ? 'MASTERED' : masteryPct >= 50 ? 'COMPLETED' : 'IN_PROGRESS')
      : existingStatus
    expect(newStatus).toBe('MASTERED') // not demoted
  })

  it('COMPLETED status is also not demoted', () => {
    const existingStatus: string = 'COMPLETED'
    const masteryPct = 30
    const newStatus = (existingStatus === 'NOT_STARTED' || existingStatus === 'IN_PROGRESS')
      ? (masteryPct >= 80 ? 'MASTERED' : masteryPct >= 50 ? 'COMPLETED' : 'IN_PROGRESS')
      : existingStatus
    expect(newStatus).toBe('COMPLETED')
  })

  it('all topics mastered → 100% completion', () => {
    const topics = [
      { status: 'MASTERED' }, { status: 'MASTERED' }, { status: 'MASTERED' }
    ]
    const completed = topics.filter(t => t.status === 'MASTERED' || t.status === 'COMPLETED').length
    expect(completed / topics.length).toBe(1)
  })
})
