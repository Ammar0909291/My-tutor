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
  return CHECKPOINTS.filter(
    cp => masteryPct >= cp.threshold && !alreadyEarned.includes(cp.id)
  )
}

describe('Learning checkpoint journey', () => {
  it('first lesson triggers first_lesson checkpoint', () => {
    const earned = getEarnedCheckpoints(0)
    expect(earned.some(c => c.id === 'first_lesson')).toBe(true)
  })

  it('mastery 50 earns beginner and intermediate checkpoints', () => {
    const earned = getEarnedCheckpoints(50)
    const ids = earned.map(c => c.id)
    expect(ids).toContain('beginner')
    expect(ids).toContain('intermediate')
  })

  it('already-earned checkpoints are not re-awarded', () => {
    const alreadyEarned = ['first_lesson', 'beginner']
    const newlyEarned = getEarnedCheckpoints(60, alreadyEarned)
    expect(newlyEarned.some(c => c.id === 'first_lesson')).toBe(false)
    expect(newlyEarned.some(c => c.id === 'beginner')).toBe(false)
    expect(newlyEarned.some(c => c.id === 'intermediate')).toBe(true)
  })

  it('mastery 100 earns master checkpoint', () => {
    const earned = getEarnedCheckpoints(100)
    expect(earned.some(c => c.id === 'master')).toBe(true)
  })

  it('mastery 74 does not earn advanced checkpoint', () => {
    const earned = getEarnedCheckpoints(74)
    expect(earned.some(c => c.id === 'advanced')).toBe(false)
  })

  it('mastery 75 earns advanced checkpoint', () => {
    const earned = getEarnedCheckpoints(75)
    expect(earned.some(c => c.id === 'advanced')).toBe(true)
  })

  it('duplicate prevention: all already earned → nothing new', () => {
    const allIds = CHECKPOINTS.map(c => c.id)
    const newlyEarned = getEarnedCheckpoints(100, allIds)
    expect(newlyEarned.length).toBe(0)
  })

  it('checkpoints progress in order', () => {
    const thresholds = CHECKPOINTS.map(c => c.threshold)
    for (let i = 1; i < thresholds.length; i++) {
      expect(thresholds[i]).toBeGreaterThanOrEqual(thresholds[i - 1])
    }
  })
})
