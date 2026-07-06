/**
 * topicProgress.test.ts
 *
 * Contract test against the REAL production functions
 * (src/lib/mastery/topicMasteryFormula.ts, used by
 * src/app/api/practice/submit/route.ts) rather than a second,
 * independent hand-copied replica — the same formulas were already
 * extracted and contract-tested in src/tests/masteryFormula.test.ts during
 * an earlier QA pass; this file duplicated them again under a different
 * name (computeMastery/computeStatus/applyStatusTransition instead of
 * computeMasteryPct/deriveTopicStatus).
 *
 * The core formulas:
 *   masteryPct = existing ? Math.round((existing.masteryPct + score) / 2) : score
 *   status = masteryPct >= 80 ? 'MASTERED' : masteryPct >= 50 ? 'COMPLETED' : 'IN_PROGRESS'
 * Status is only updated when current status is NOT_STARTED or IN_PROGRESS.
 */

import { describe, it, expect } from 'vitest'
import { computeMasteryPct, deriveTopicStatus } from '@/lib/mastery/topicMasteryFormula'

describe('mastery computation — first attempt', () => {
  it('first attempt: masteryPct equals score', () => {
    expect(computeMasteryPct(null, 70)).toBe(70)
  })

  it('first attempt score 100 → masteryPct 100', () => {
    expect(computeMasteryPct(null, 100)).toBe(100)
  })

  it('first attempt score 0 → masteryPct 0', () => {
    expect(computeMasteryPct(null, 0)).toBe(0)
  })

  it('first attempt score 80 → masteryPct 80', () => {
    expect(computeMasteryPct(null, 80)).toBe(80)
  })
})

describe('mastery computation — second attempt', () => {
  it('second attempt: masteryPct = Math.round((prev + score) / 2)', () => {
    expect(computeMasteryPct(60, 80)).toBe(70)
  })

  it('rounds correctly for odd sum', () => {
    expect(computeMasteryPct(60, 81)).toBe(71) // (141/2 = 70.5) → 71
  })

  it('100 → 0: masteryPct drops to 50', () => {
    expect(computeMasteryPct(100, 0)).toBe(50)
  })

  it('0 → 100: masteryPct rises to 50', () => {
    expect(computeMasteryPct(0, 100)).toBe(50)
  })
})

describe('status thresholds', () => {
  it('score 100 → MASTERED', () => {
    expect(deriveTopicStatus('IN_PROGRESS', computeMasteryPct(null, 100))).toBe('MASTERED')
  })

  it('score 80 → MASTERED', () => {
    expect(deriveTopicStatus('IN_PROGRESS', computeMasteryPct(null, 80))).toBe('MASTERED')
  })

  it('score 50 → COMPLETED', () => {
    expect(deriveTopicStatus('IN_PROGRESS', computeMasteryPct(null, 50))).toBe('COMPLETED')
  })

  it('score 79 → COMPLETED', () => {
    expect(deriveTopicStatus('IN_PROGRESS', computeMasteryPct(null, 79))).toBe('COMPLETED')
  })

  it('score 30 → IN_PROGRESS', () => {
    expect(deriveTopicStatus('IN_PROGRESS', computeMasteryPct(null, 30))).toBe('IN_PROGRESS')
  })

  it('score 49 → IN_PROGRESS', () => {
    expect(deriveTopicStatus('IN_PROGRESS', computeMasteryPct(null, 49))).toBe('IN_PROGRESS')
  })
})

describe('masteryPct bounds', () => {
  it('masteryPct cannot exceed 100', () => {
    const pct = computeMasteryPct(100, 100)
    expect(pct).toBeLessThanOrEqual(100)
    expect(pct).toBe(100)
  })

  it('masteryPct cannot go below 0', () => {
    const pct = computeMasteryPct(0, 0)
    expect(pct).toBeGreaterThanOrEqual(0)
    expect(pct).toBe(0)
  })
})

describe('repeated high scores stay MASTERED', () => {
  it('two perfect scores → still MASTERED', () => {
    const after1 = computeMasteryPct(null, 100)
    const after2 = computeMasteryPct(after1, 100)
    expect(deriveTopicStatus('IN_PROGRESS', after2)).toBe('MASTERED')
  })

  it('already MASTERED after one 100-score practice', () => {
    const pct = computeMasteryPct(null, 100)
    expect(deriveTopicStatus('IN_PROGRESS', pct)).toBe('MASTERED')
  })
})

describe('status non-regression (route guard)', () => {
  it('MASTERED topic: status does not change on new practice attempt', () => {
    // deriveTopicStatus only recomputes from masteryPct when currentStatus
    // is NOT_STARTED/IN_PROGRESS; masteryPct = 65 would normally→COMPLETED
    const applied = deriveTopicStatus('MASTERED', computeMasteryPct(90, 40))
    expect(applied).toBe('MASTERED')
  })

  it('COMPLETED topic: status does not regress to IN_PROGRESS', () => {
    // masteryPct = 40 would normally → IN_PROGRESS
    const applied = deriveTopicStatus('COMPLETED', computeMasteryPct(60, 20))
    expect(applied).toBe('COMPLETED')
  })

  it('IN_PROGRESS topic: can advance to MASTERED', () => {
    const applied = deriveTopicStatus('IN_PROGRESS', computeMasteryPct(60, 100)) // masteryPct = 80
    expect(applied).toBe('MASTERED')
  })

  it('NOT_STARTED topic: transitions to computed status', () => {
    const applied = deriveTopicStatus('NOT_STARTED', computeMasteryPct(null, 90)) // 90 → MASTERED
    expect(applied).toBe('MASTERED')
  })

  it('SKIPPED topic: status unchanged by practice submit', () => {
    const applied = deriveTopicStatus('SKIPPED', computeMasteryPct(null, 100))
    expect(applied).toBe('SKIPPED')
  })
})
