/**
 * masteryFormula.test.ts
 *
 * Mathematical properties of the running-average mastery formula:
 *   masteryPct(n) = Math.round((masteryPct(n-1) + score) / 2)
 *
 * First attempt: masteryPct(1) = score
 */

import { describe, it, expect } from 'vitest'

function computeMastery(existingPct: number | null, score: number): number {
  if (existingPct === null) return score
  return Math.round((existingPct + score) / 2)
}

type Status = 'MASTERED' | 'COMPLETED' | 'IN_PROGRESS'
function statusFromPct(pct: number): Status {
  if (pct >= 80) return 'MASTERED'
  if (pct >= 50) return 'COMPLETED'
  return 'IN_PROGRESS'
}

function simulatePractices(scores: number[]): number {
  let pct: number | null = null
  for (const score of scores) {
    pct = computeMastery(pct, score)
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
      const next = computeMastery(prev, score)
      expect(next).toBeGreaterThanOrEqual(prevPct)
      prev = next
      prevPct = next
    }
  })
})

describe('mastery from 100, one score=0', () => {
  it('starting from 100, one score=0 practice brings it to 50', () => {
    const pct = computeMastery(100, 0)
    expect(pct).toBe(50)
  })

  it('starting from 100, one score=0 practice → COMPLETED (not MASTERED)', () => {
    const pct = computeMastery(100, 0)
    expect(statusFromPct(pct)).toBe('COMPLETED')
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
    it(`computeMastery(${existing}, ${score}) is an integer`, () => {
      const result = computeMastery(existing, score)
      expect(Number.isInteger(result)).toBe(true)
    })
  })
})

describe('edge cases', () => {
  it('score=0 first attempt → masteryPct=0, status=IN_PROGRESS', () => {
    const pct = computeMastery(null, 0)
    expect(pct).toBe(0)
    expect(statusFromPct(pct)).toBe('IN_PROGRESS')
  })

  it('score=80 first attempt → masteryPct=80, status=MASTERED', () => {
    const pct = computeMastery(null, 80)
    expect(pct).toBe(80)
    expect(statusFromPct(pct)).toBe('MASTERED')
  })

  it('score=79 first attempt → status=COMPLETED', () => {
    const pct = computeMastery(null, 79)
    expect(pct).toBe(79)
    expect(statusFromPct(pct)).toBe('COMPLETED')
  })

  it('score=49 first attempt → status=IN_PROGRESS', () => {
    const pct = computeMastery(null, 49)
    expect(pct).toBe(49)
    expect(statusFromPct(pct)).toBe('IN_PROGRESS')
  })

  it('score=50 first attempt → status=COMPLETED', () => {
    const pct = computeMastery(null, 50)
    expect(pct).toBe(50)
    expect(statusFromPct(pct)).toBe('COMPLETED')
  })
})

describe('mastery formula symmetry', () => {
  it('computeMastery(a, b) === computeMastery(b, a) — running average is symmetric', () => {
    const ab = computeMastery(70, 90)
    const ba = computeMastery(90, 70)
    expect(ab).toBe(ba)
  })

  it('computeMastery(x, x) === x — same score keeps same masteryPct', () => {
    for (const x of [0, 40, 60, 80, 100]) {
      expect(computeMastery(x, x)).toBe(x)
    }
  })
})
