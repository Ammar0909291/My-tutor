/**
 * adaptiveLearning.test.ts
 *
 * Tests for adaptive difficulty/learning classification logic.
 *
 * Based on:
 * - Mastery thresholds in practice/submit/route.ts
 * - MasteryIntelligence engine: TRUE_MASTERY | DEVELOPING | FALSE_MASTERY | AT_RISK
 * - WeakTopics scoring: mastered topics excluded from remedial work
 * - Topic status machine: MASTERED → no remedial work needed
 */

import { describe, it, expect } from 'vitest'

// ── Adaptive classification helpers ──────────────────────────────────────────

type TopicStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'MASTERED' | 'SKIPPED' | 'REVISION'
type DifficultyRecommendation = 'remedial' | 'standard' | 'advanced'
type MasteryLevel = 'TRUE_MASTERY' | 'DEVELOPING' | 'FALSE_MASTERY' | 'AT_RISK'
type MasteryConfidence = 'high' | 'medium' | 'low'

/** Classify what difficulty level a student needs based on masteryPct. */
function classifyDifficulty(masteryPct: number): DifficultyRecommendation {
  if (masteryPct < 50) return 'remedial'
  if (masteryPct >= 80) return 'advanced'
  return 'standard'
}

/** Rough mastery intelligence classification (simplified from masteryIntelligence.ts).
 *  Based on assessment pass + checkpoint pass rate + mistake severity.
 */
function classifyMasteryLevel(params: {
  assessmentPassed: boolean
  checkpointPassRate: number | null  // null = no checkpoints
  mistakeSeverity: number
  masteryPct: number
}): MasteryLevel {
  const { assessmentPassed, checkpointPassRate, mistakeSeverity, masteryPct } = params

  if (!assessmentPassed && masteryPct < 50 && mistakeSeverity > 10) return 'AT_RISK'
  if (assessmentPassed && mistakeSeverity > 8 && (checkpointPassRate !== null && checkpointPassRate < 0.5)) {
    return 'FALSE_MASTERY'
  }
  if (assessmentPassed && masteryPct >= 80 && mistakeSeverity < 3) return 'TRUE_MASTERY'
  return 'DEVELOPING'
}

/** Returns confidence level based on data availability. */
function classifyConfidence(
  checkpointCount: number,
  assessmentAttempts: number,
): MasteryConfidence {
  if (checkpointCount > 3 && assessmentAttempts > 0) return 'high'
  if (checkpointCount > 0 || assessmentAttempts > 0) return 'medium'
  return 'low'
}

/** Determines if a topic needs remedial intervention. */
function needsRemediation(status: TopicStatus, masteryPct: number): boolean {
  if (status === 'MASTERED') return false
  return masteryPct < 50
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('difficulty classification', () => {
  it('masteryPct < 50 → remedial', () => {
    expect(classifyDifficulty(0)).toBe('remedial')
    expect(classifyDifficulty(49)).toBe('remedial')
  })

  it('masteryPct 50-79 → standard', () => {
    expect(classifyDifficulty(50)).toBe('standard')
    expect(classifyDifficulty(79)).toBe('standard')
  })

  it('masteryPct >= 80 → advanced', () => {
    expect(classifyDifficulty(80)).toBe('advanced')
    expect(classifyDifficulty(100)).toBe('advanced')
  })

  it('classification is deterministic for same input', () => {
    const inputs = [0, 30, 49, 50, 75, 80, 95, 100]
    for (const pct of inputs) {
      expect(classifyDifficulty(pct)).toBe(classifyDifficulty(pct))
    }
  })
})

describe('mastery level classification', () => {
  it('passed assessment + high masteryPct + low mistake severity → TRUE_MASTERY', () => {
    expect(classifyMasteryLevel({
      assessmentPassed: true,
      checkpointPassRate: 0.9,
      mistakeSeverity: 1,
      masteryPct: 90,
    })).toBe('TRUE_MASTERY')
  })

  it('failed assessment + low masteryPct + high severity → AT_RISK', () => {
    expect(classifyMasteryLevel({
      assessmentPassed: false,
      checkpointPassRate: 0.3,
      mistakeSeverity: 15,
      masteryPct: 30,
    })).toBe('AT_RISK')
  })

  it('passed assessment but poor checkpoints + high severity → FALSE_MASTERY', () => {
    expect(classifyMasteryLevel({
      assessmentPassed: true,
      checkpointPassRate: 0.3,
      mistakeSeverity: 12,
      masteryPct: 85,
    })).toBe('FALSE_MASTERY')
  })

  it('borderline case → DEVELOPING', () => {
    expect(classifyMasteryLevel({
      assessmentPassed: true,
      checkpointPassRate: 0.7,
      mistakeSeverity: 4,
      masteryPct: 70,
    })).toBe('DEVELOPING')
  })
})

describe('confidence classification', () => {
  it('no checkpoints + no assessments → low confidence', () => {
    expect(classifyConfidence(0, 0)).toBe('low')
  })

  it('some data → medium confidence', () => {
    expect(classifyConfidence(1, 0)).toBe('medium')
    expect(classifyConfidence(0, 1)).toBe('medium')
  })

  it('rich data → high confidence', () => {
    expect(classifyConfidence(5, 2)).toBe('high')
  })
})

describe('remediation need', () => {
  it('MASTERED topic never needs remediation', () => {
    expect(needsRemediation('MASTERED', 90)).toBe(false)
    expect(needsRemediation('MASTERED', 30)).toBe(false) // even low pct
  })

  it('IN_PROGRESS with low masteryPct → needs remediation', () => {
    expect(needsRemediation('IN_PROGRESS', 30)).toBe(true)
  })

  it('IN_PROGRESS with masteryPct >= 50 → no remediation', () => {
    expect(needsRemediation('IN_PROGRESS', 60)).toBe(false)
  })

  it('NOT_STARTED → needs remediation (pct=0)', () => {
    expect(needsRemediation('NOT_STARTED', 0)).toBe(true)
  })
})

describe('adaptive learning boundary values', () => {
  it('masteryPct=79: standard, not advanced', () => {
    expect(classifyDifficulty(79)).toBe('standard')
  })

  it('masteryPct=80: advanced, not standard', () => {
    expect(classifyDifficulty(80)).toBe('advanced')
  })

  it('masteryPct=50: standard, not remedial', () => {
    expect(classifyDifficulty(50)).toBe('standard')
  })

  it('masteryPct=49: remedial, not standard', () => {
    expect(classifyDifficulty(49)).toBe('remedial')
  })
})
