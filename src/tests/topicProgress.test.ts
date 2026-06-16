/**
 * topicProgress.test.ts
 *
 * Tests for the mastery computation logic extracted from
 * src/app/api/practice/submit/route.ts
 *
 * The core formulas:
 *   masteryPct = existing ? Math.round((existing.masteryPct + score) / 2) : score
 *   status = masteryPct >= 80 ? 'MASTERED' : masteryPct >= 50 ? 'COMPLETED' : 'IN_PROGRESS'
 * Status is only updated when current status is NOT_STARTED or IN_PROGRESS.
 */

import { describe, it, expect } from 'vitest'

// ── Pure computation helpers mirrored from the route ──────────────────────────

function computeMastery(existingMasteryPct: number | null, score: number): number {
  if (existingMasteryPct === null) return score
  return Math.round((existingMasteryPct + score) / 2)
}

type TopicStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'MASTERED' | 'SKIPPED' | 'REVISION'

function computeStatus(masteryPct: number): TopicStatus {
  if (masteryPct >= 80) return 'MASTERED'
  if (masteryPct >= 50) return 'COMPLETED'
  return 'IN_PROGRESS'
}

/** Mirrors route logic: status only transitions when NOT_STARTED or IN_PROGRESS. */
function applyStatusTransition(currentStatus: TopicStatus, newStatus: TopicStatus): TopicStatus {
  if (currentStatus === 'NOT_STARTED' || currentStatus === 'IN_PROGRESS') {
    return newStatus
  }
  return currentStatus
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('mastery computation — first attempt', () => {
  it('first attempt: masteryPct equals score', () => {
    expect(computeMastery(null, 70)).toBe(70)
  })

  it('first attempt score 100 → masteryPct 100', () => {
    expect(computeMastery(null, 100)).toBe(100)
  })

  it('first attempt score 0 → masteryPct 0', () => {
    expect(computeMastery(null, 0)).toBe(0)
  })

  it('first attempt score 80 → masteryPct 80', () => {
    expect(computeMastery(null, 80)).toBe(80)
  })
})

describe('mastery computation — second attempt', () => {
  it('second attempt: masteryPct = Math.round((prev + score) / 2)', () => {
    expect(computeMastery(60, 80)).toBe(70)
  })

  it('rounds correctly for odd sum', () => {
    expect(computeMastery(60, 81)).toBe(71) // (141/2 = 70.5) → 71
  })

  it('100 → 0: masteryPct drops to 50', () => {
    expect(computeMastery(100, 0)).toBe(50)
  })

  it('0 → 100: masteryPct rises to 50', () => {
    expect(computeMastery(0, 100)).toBe(50)
  })
})

describe('status thresholds', () => {
  it('score 100 → MASTERED', () => {
    expect(computeStatus(computeMastery(null, 100))).toBe('MASTERED')
  })

  it('score 80 → MASTERED', () => {
    expect(computeStatus(computeMastery(null, 80))).toBe('MASTERED')
  })

  it('score 50 → COMPLETED', () => {
    expect(computeStatus(computeMastery(null, 50))).toBe('COMPLETED')
  })

  it('score 79 → COMPLETED', () => {
    expect(computeStatus(computeMastery(null, 79))).toBe('COMPLETED')
  })

  it('score 30 → IN_PROGRESS', () => {
    expect(computeStatus(computeMastery(null, 30))).toBe('IN_PROGRESS')
  })

  it('score 49 → IN_PROGRESS', () => {
    expect(computeStatus(computeMastery(null, 49))).toBe('IN_PROGRESS')
  })
})

describe('masteryPct bounds', () => {
  it('masteryPct cannot exceed 100', () => {
    const pct = computeMastery(100, 100)
    expect(pct).toBeLessThanOrEqual(100)
    expect(pct).toBe(100)
  })

  it('masteryPct cannot go below 0', () => {
    const pct = computeMastery(0, 0)
    expect(pct).toBeGreaterThanOrEqual(0)
    expect(pct).toBe(0)
  })
})

describe('repeated high scores stay MASTERED', () => {
  it('two perfect scores → still MASTERED', () => {
    const after1 = computeMastery(null, 100)
    const after2 = computeMastery(after1, 100)
    expect(computeStatus(after2)).toBe('MASTERED')
  })

  it('already MASTERED after one 100-score practice', () => {
    const pct = computeMastery(null, 100)
    expect(computeStatus(pct)).toBe('MASTERED')
  })
})

describe('status non-regression (route guard)', () => {
  it('MASTERED topic: status does not change on new practice attempt', () => {
    // Route only updates status when NOT_STARTED or IN_PROGRESS
    const newStatus = computeStatus(computeMastery(90, 40)) // masteryPct = 65 → COMPLETED
    const applied = applyStatusTransition('MASTERED', newStatus)
    expect(applied).toBe('MASTERED')
  })

  it('COMPLETED topic: status does not regress to IN_PROGRESS', () => {
    const newStatus = computeStatus(computeMastery(60, 20)) // masteryPct = 40 → IN_PROGRESS
    const applied = applyStatusTransition('COMPLETED', newStatus)
    expect(applied).toBe('COMPLETED')
  })

  it('IN_PROGRESS topic: can advance to MASTERED', () => {
    const newStatus = computeStatus(computeMastery(60, 100)) // masteryPct = 80 → MASTERED
    const applied = applyStatusTransition('IN_PROGRESS', newStatus)
    expect(applied).toBe('MASTERED')
  })

  it('NOT_STARTED topic: transitions to computed status', () => {
    const newStatus = computeStatus(computeMastery(null, 90)) // 90 → MASTERED
    const applied = applyStatusTransition('NOT_STARTED', newStatus)
    expect(applied).toBe('MASTERED')
  })

  it('SKIPPED topic: status unchanged by practice submit', () => {
    const newStatus = computeStatus(computeMastery(null, 100))
    const applied = applyStatusTransition('SKIPPED', newStatus)
    expect(applied).toBe('SKIPPED')
  })
})
