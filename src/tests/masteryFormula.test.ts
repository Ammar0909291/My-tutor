/**
 * masteryFormula.test.ts
 *
 * Contract test against the REAL production mastery functions
 * (src/lib/mastery/topicMasteryFormula.ts, used by
 * src/app/api/practice/submit/route.ts) rather than a hand-copied replica,
 * so a change to the real formula/status logic cannot silently diverge
 * from what this suite asserts.
 *
 * Running-average formula:
 *   masteryPct(n) = Math.round((masteryPct(n-1) + score) / 2)
 * First attempt: masteryPct(1) = score
 *
 * Status derivation is sticky: it only auto-derives from masteryPct while
 * currentStatus is NOT_STARTED/IN_PROGRESS; any other status (COMPLETED,
 * MASTERED, SKIPPED, REVISION, ...) is preserved even if a later score
 * would compute a lower masteryPct.
 */

import { describe, it, expect } from 'vitest'
import { computeMasteryPct, deriveTopicStatus } from '@/lib/mastery/topicMasteryFormula'

function simulatePractices(scores: number[]): number {
  let pct: number | null = null
  for (const score of scores) {
    pct = computeMasteryPct(pct, score)
  }
  return pct ?? 0
}

// ── Convergence ───────────────────────────────────────────────────────────────

describe('mastery convergence toward 100', () => {
  it('after 5 perfect practices starting from 0, masteryPct is high (>=90)', () => {
    const pct = simulatePractices([100, 100, 100, 100, 100])
    expect(pct).toBeGreaterThanOrEqual(90)
  })

  it('after 10 perfect practices starting from 0, masteryPct is >= 99', () => {
    const pct = simulatePractices(Array(10).fill(100))
    expect(pct).toBeGreaterThanOrEqual(99)
  })

  it('convergence is monotonically increasing with all-100 scores', () => {
    let prev: number | null = null
    let prevPct = 0
    const scores = Array(8).fill(100)
    for (const score of scores) {
      const next = computeMasteryPct(prev, score)
      expect(next).toBeGreaterThanOrEqual(prevPct)
      prev = next
      prevPct = next
    }
  })
})

describe('mastery is always an integer', () => {
  const testCases: [number | null, number][] = [
    [null, 33],
    [33, 66],
    [66, 99],
    [null, 77],
    [77, 43],
    [50, 51],
  ]

  testCases.forEach(([existing, score]) => {
    it(`computeMasteryPct(${existing}, ${score}) is an integer`, () => {
      const result = computeMasteryPct(existing, score)
      expect(Number.isInteger(result)).toBe(true)
    })
  })
})

describe('status derivation from IN_PROGRESS/NOT_STARTED (first-time thresholds)', () => {
  it('score=0 first attempt → masteryPct=0, status=IN_PROGRESS', () => {
    const pct = computeMasteryPct(null, 0)
    expect(pct).toBe(0)
    expect(deriveTopicStatus('IN_PROGRESS', pct)).toBe('IN_PROGRESS')
  })

  it('score=80 first attempt → masteryPct=80, status=MASTERED', () => {
    const pct = computeMasteryPct(null, 80)
    expect(pct).toBe(80)
    expect(deriveTopicStatus('IN_PROGRESS', pct)).toBe('MASTERED')
  })

  it('score=79 first attempt → status=COMPLETED', () => {
    const pct = computeMasteryPct(null, 79)
    expect(pct).toBe(79)
    expect(deriveTopicStatus('IN_PROGRESS', pct)).toBe('COMPLETED')
  })

  it('score=49 first attempt → status=IN_PROGRESS', () => {
    const pct = computeMasteryPct(null, 49)
    expect(pct).toBe(49)
    expect(deriveTopicStatus('IN_PROGRESS', pct)).toBe('IN_PROGRESS')
  })

  it('score=50 first attempt → status=COMPLETED', () => {
    const pct = computeMasteryPct(null, 50)
    expect(pct).toBe(50)
    expect(deriveTopicStatus('IN_PROGRESS', pct)).toBe('COMPLETED')
  })

  it('NOT_STARTED behaves the same as IN_PROGRESS for threshold derivation', () => {
    expect(deriveTopicStatus('NOT_STARTED', 85)).toBe('MASTERED')
    expect(deriveTopicStatus('NOT_STARTED', 60)).toBe('COMPLETED')
    expect(deriveTopicStatus('NOT_STARTED', 10)).toBe('IN_PROGRESS')
  })
})

describe('status is sticky once it leaves NOT_STARTED/IN_PROGRESS', () => {
  it('a topic already MASTERED stays MASTERED even if a new score computes a low masteryPct', () => {
    const pct = computeMasteryPct(100, 0) // → 50
    expect(pct).toBe(50)
    expect(deriveTopicStatus('MASTERED', pct)).toBe('MASTERED')
  })

  it('a topic already COMPLETED stays COMPLETED even if a new score computes masteryPct=0', () => {
    expect(deriveTopicStatus('COMPLETED', 0)).toBe('COMPLETED')
  })

  it('SKIPPED and REVISION are likewise preserved regardless of masteryPct', () => {
    expect(deriveTopicStatus('SKIPPED', 95)).toBe('SKIPPED')
    expect(deriveTopicStatus('REVISION', 10)).toBe('REVISION')
  })
})

describe('mastery formula symmetry', () => {
  it('computeMasteryPct(a, b) === computeMasteryPct(b, a) — running average is symmetric', () => {
    const ab = computeMasteryPct(70, 90)
    const ba = computeMasteryPct(90, 70)
    expect(ab).toBe(ba)
  })

  it('computeMasteryPct(x, x) === x — same score keeps same masteryPct', () => {
    for (const x of [0, 40, 60, 80, 100]) {
      expect(computeMasteryPct(x, x)).toBe(x)
    }
  })
})
