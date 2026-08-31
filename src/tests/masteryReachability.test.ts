/**
 * The defect class this exists for has recurred four times — chemistry,
 * mathematics, physics, and now English, which is LIVE and cannot close a
 * single lesson. Each time it was found by a person noticing, not by the
 * system reporting it.
 */
import { describe, it, expect } from 'vitest'
import {
  assessMasteryReachability,
  CREDITS_REQUIRED_FOR_MASTERY,
} from '@/lib/teaching/masteryReachability'

describe('mastery reachability is arithmetic, not judgement', () => {
  it('three gradeable probes is the floor, matching the mastery bar', () => {
    expect(CREDITS_REQUIRED_FOR_MASTERY).toBe(3)
    expect(assessMasteryReachability({ gradeableProbes: 3 }).reachable).toBe(true)
  })

  it('flags the live English state: two probes cannot produce three credits', () => {
    const r = assessMasteryReachability({ gradeableProbes: 2 })
    expect(r.reachable).toBe(false)
    expect(r.shortfall).toBe(1)
    expect(r.reason).toBe('insufficient-probes')
  })

  it('reports the shortfall, so the fix is a number and not an investigation', () => {
    expect(assessMasteryReachability({ gradeableProbes: 0 }).shortfall).toBe(3)
    expect(assessMasteryReachability({ gradeableProbes: 1 }).shortfall).toBe(2)
    expect(assessMasteryReachability({ gradeableProbes: 2 }).shortfall).toBe(1)
  })

  it('surplus is reachable and reports no shortfall', () => {
    for (const n of [3, 4, 5, 7, 40]) {
      const r = assessMasteryReachability({ gradeableProbes: n })
      expect(r.reachable).toBe(true)
      expect(r.shortfall).toBe(0)
    }
  })
})

describe('it never claims a lesson is fine on unreadable input', () => {
  it('an unknown count is reported as unknown, not as ok', () => {
    for (const bad of [NaN, -1, Infinity, undefined, null, 'three']) {
      const r = assessMasteryReachability({ gradeableProbes: bad as unknown as number })
      expect(r.reason).toBe('unknown')
    }
  })

  it('is total — no input throws', () => {
    for (const bad of [undefined, null, {}, { gradeableProbes: {} }]) {
      expect(() => assessMasteryReachability(bad as never)).not.toThrow()
    }
  })

  it('floors a fractional count rather than rounding up into a false pass', () => {
    expect(assessMasteryReachability({ gradeableProbes: 2.9 }).reachable).toBe(false)
  })
})

describe('it REPORTS and must never withhold teaching', () => {
  it('exposes no way to block a lesson — the result is data, not a decision', () => {
    const r = assessMasteryReachability({ gradeableProbes: 0 })
    expect(Object.keys(r).sort()).toEqual(['reachable', 'reason', 'shortfall'])
    // Deliberately pinned: teaching a concept that cannot be CERTIFIED is a
    // degraded outcome; refusing to teach it is a failure. Nothing here may
    // grow into a gate.
  })
})
