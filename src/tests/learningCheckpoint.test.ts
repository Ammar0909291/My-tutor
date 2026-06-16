import { describe, it, expect } from 'vitest'

interface Checkpoint {
  id: string
  threshold: number
  label: string
}

const CHECKPOINTS: Checkpoint[] = [
  { id: 'first_lesson', threshold: 0, label: 'First Lesson' },
  { id: 'beginner', threshold: 25, label: 'Beginner' },
  { id: 'intermediate', threshold: 50, label: 'Intermediate' },
  { id: 'advanced', threshold: 75, label: 'Advanced' },
  { id: 'master', threshold: 100, label: 'Master' },
]

function getEarnedCheckpoints(masteryPct: number, alreadyEarned: string[] = []): Checkpoint[] {
  return CHECKPOINTS.filter(cp => masteryPct >= cp.threshold && !alreadyEarned.includes(cp.id))
}

describe('Learning checkpoint journey', () => {
  it('mastery 0 earns first_lesson checkpoint', () => {
    expect(getEarnedCheckpoints(0).some(c => c.id === 'first_lesson')).toBe(true)
  })

  it('mastery 50 earns beginner and intermediate', () => {
    const ids = getEarnedCheckpoints(50).map(c => c.id)
    expect(ids).toContain('beginner')
    expect(ids).toContain('intermediate')
  })

  it('already-earned checkpoints not re-awarded', () => {
    const alreadyEarned = ['first_lesson', 'beginner']
    const newlyEarned = getEarnedCheckpoints(60, alreadyEarned)
    expect(newlyEarned.some(c => c.id === 'first_lesson')).toBe(false)
    expect(newlyEarned.some(c => c.id === 'beginner')).toBe(false)
    expect(newlyEarned.some(c => c.id === 'intermediate')).toBe(true)
  })

  it('mastery 100 earns master checkpoint', () => {
    expect(getEarnedCheckpoints(100).some(c => c.id === 'master')).toBe(true)
  })

  it('mastery 74 does not earn advanced', () => {
    expect(getEarnedCheckpoints(74).some(c => c.id === 'advanced')).toBe(false)
  })

  it('mastery 75 earns advanced', () => {
    expect(getEarnedCheckpoints(75).some(c => c.id === 'advanced')).toBe(true)
  })

  it('all already earned → nothing new', () => {
    const allIds = CHECKPOINTS.map(c => c.id)
    expect(getEarnedCheckpoints(100, allIds).length).toBe(0)
  })

  it('checkpoints are ordered by threshold', () => {
    const thresholds = CHECKPOINTS.map(c => c.threshold)
    for (let i = 1; i < thresholds.length; i++) {
      expect(thresholds[i]).toBeGreaterThanOrEqual(thresholds[i - 1])
    }
  })

  it('mastery 99 does not earn master', () => {
    expect(getEarnedCheckpoints(99).some(c => c.id === 'master')).toBe(false)
  })

  it('mastery 24 only earns first_lesson', () => {
    const earned = getEarnedCheckpoints(24)
    expect(earned.length).toBe(1)
    expect(earned[0].id).toBe('first_lesson')
  })
})
