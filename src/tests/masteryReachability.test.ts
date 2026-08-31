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

// ═══════════════════════════════════════════════════════════════════════════
// E1 — attaching a keyed probe BELOW the mastery gates
// ═══════════════════════════════════════════════════════════════════════════
import { readFileSync } from 'fs'
import { mayAttachProbeBelowGuide } from '@/lib/teaching/masteryReachability'

describe('E1 — a probe may be spent early only against real surplus', () => {
  it('needs FOUR: one is spent here, three must survive to certify', () => {
    expect(mayAttachProbeBelowGuide('DEMONSTRATE', 3)).toBe(false)
    expect(mayAttachProbeBelowGuide('DEMONSTRATE', 4)).toBe(true)
    expect(mayAttachProbeBelowGuide('DEMONSTRATE', 5)).toBe(true)
  })

  it('a bare-contract concept behaves exactly as before — this is the safety property', () => {
    // Three gradeable probes is the contract floor. Spending one there is what
    // held physics at 79%, and shipping E1 before probe depth would have made
    // the dominant failure class worse.
    for (const pool of [0, 1, 2, 3]) {
      expect(mayAttachProbeBelowGuide('DEMONSTRATE', pool)).toBe(false)
    }
  })

  it('OBSERVE is never opened — it is a diagnostic phase, not a thin gate', () => {
    for (const pool of [4, 5, 10, 50]) {
      expect(mayAttachProbeBelowGuide('OBSERVE', pool)).toBe(false)
    }
  })

  it('says nothing about phases that were already allowed', () => {
    // GUIDE, CHECK, PRACTICE are governed by the existing predicates; this
    // function answers only the question it is named for.
    for (const phase of ['GUIDE', 'CHECK', 'PRACTICE', 'TRANSFER', null, undefined]) {
      expect(mayAttachProbeBelowGuide(phase, 50)).toBe(false)
    }
  })

  it('refuses on an unreadable pool rather than guessing', () => {
    for (const bad of [NaN, Infinity, undefined, null, '4']) {
      expect(mayAttachProbeBelowGuide('DEMONSTRATE', bad as unknown as number)).toBe(false)
    }
  })
})

describe('the route wires E1 exactly as described', () => {
  const route = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

  it('opens DEMONSTRATE only on an ASK turn, never on a teach turn', () => {
    expect(route).toMatch(
      /\(phaseBeforeTurn === 'GUIDE' \|\| phaseBeforeTurn === 'DEMONSTRATE'\)\s*\n?\s*&& evidenceMoveHoisted === 'ask'/,
    )
  })

  it('enforces the surplus at the serving site, where the pool is known', () => {
    expect(route).toMatch(/mayAttachProbeBelowGuide\(phaseBeforeTurn, probe\.poolSize\)/)
    expect(route).toMatch(/const converted = probe && !belowGuideBlocked \? probeToMcq\(probe\) : null/)
  })

  it('leaves the SHARED predicate alone, so the withhold guard is unchanged', () => {
    // Widening isProbeAttachablePhase would also change where ungradeable
    // model questions are suppressed — a different change with its own risk.
    const fn = readFileSync('src/lib/teaching/gateAssessment.ts', 'utf8')
    expect(fn).toMatch(/export function isProbeAttachablePhase\(phase: unknown\): boolean \{\s*\n\s*return phase === 'GUIDE' \|\| isMasteryGatePhase\(phase\)/)
  })
})
