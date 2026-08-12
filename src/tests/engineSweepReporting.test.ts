import { describe, it, expect } from 'vitest'
import { summariseSweep, type SweepOutcome } from '../../scripts/audit/sweepReport'

/**
 * The regression these tests exist for is REAL and was observed:
 * a sweep of 8 physics topics in which all 8 errored on a proxy denial
 * printed "none — every checked engine invariant held" and exited 0.
 *
 * The first test below is that exact run.
 */

const errored = (id: string): SweepOutcome => ({
  conceptId: id,
  findings: [],
  reachedVerified: false,
  error: `Unexpected token 'H', "Host not i"... is not valid JSON`,
})

const clean = (id: string, verified = true): SweepOutcome => ({
  conceptId: id,
  findings: [],
  reachedVerified: verified,
})

describe('summariseSweep — absence of findings is only evidence when something ran', () => {
  it('THE OBSERVED BUG: 8/8 errored must never report that invariants held', () => {
    const results = [
      'phys.meas.errors', 'phys.meas.scalars-vectors', 'phys.meas.dimensions',
      'phys.meas.vector-addition', 'phys.meas.units', 'phys.meas.significant-figures',
      'phys.meas.unit-conversion', 'phys.meas.vector-products',
    ].map(errored)

    const s = summariseSweep(results)

    expect(s.checked).toBe(0)
    expect(s.errored).toBe(8)
    expect(s.inconclusive).toBe(true)
    // The exact phrase that lied.
    expect(s.findingsLine).not.toContain('every checked engine invariant held')
    expect(s.findingsLine).toContain('NOTHING WAS CHECKED')
    // A caller must not be able to read this as success.
    expect(s.exitCode).not.toBe(0)
  })

  it('a genuinely clean full run still reports the pass, and exits 0', () => {
    const s = summariseSweep([clean('a'), clean('b'), clean('c')])

    expect(s.checked).toBe(3)
    expect(s.errored).toBe(0)
    expect(s.inconclusive).toBe(false)
    expect(s.findingsLine).toContain('every checked engine invariant held')
    expect(s.exitCode).toBe(0)
  })

  it('a PARTIAL run is inconclusive — silence across 2 of 5 is not a pass', () => {
    const s = summariseSweep([clean('a'), clean('b'), errored('c'), errored('d'), errored('e')])

    expect(s.checked).toBe(2)
    expect(s.errored).toBe(3)
    expect(s.inconclusive).toBe(true)
    expect(s.findingsLine).toContain('INCONCLUSIVE')
    expect(s.findingsLine).not.toContain('every checked engine invariant held')
    expect(s.exitCode).not.toBe(0)
  })

  it('real findings are surfaced and grouped by code, and fail the run', () => {
    const s = summariseSweep([
      { conceptId: 'a', findings: [{ code: 'E6', detail: 'gate turn carried no MCQ tag' }], reachedVerified: false },
      { conceptId: 'b', findings: [{ code: 'E6', detail: 'gate turn carried no MCQ tag' }], reachedVerified: false },
      { conceptId: 'c', findings: [{ code: 'E4', detail: 'served asset belongs to another concept' }], reachedVerified: false },
    ])

    expect(s.errored).toBe(0)
    expect(s.findingsByCode.get('E6')).toHaveLength(2)
    expect(s.findingsByCode.get('E4')).toHaveLength(1)
    expect(s.exitCode).not.toBe(0)
  })

  it('errored topics are excluded from the verified count and its denominator', () => {
    // Two verified out of three that RAN — not out of six requested.
    const s = summariseSweep([
      clean('a'), clean('b'), clean('c', false),
      errored('d'), errored('e'), errored('f'),
    ])

    expect(s.verified).toBe(2)
    expect(s.checked).toBe(3)
    expect(s.total).toBe(6)
  })

  it('an errored topic cannot contribute a verified result even if flagged', () => {
    // Guards against a future refactor trusting reachedVerified on a failed topic.
    const s = summariseSweep([{ ...errored('a'), reachedVerified: true }])

    expect(s.verified).toBe(0)
    expect(s.inconclusive).toBe(true)
  })

  it('an empty sweep is inconclusive, not a vacuous pass', () => {
    const s = summariseSweep([])

    expect(s.inconclusive).toBe(true)
    expect(s.findingsLine).not.toContain('every checked engine invariant held')
    expect(s.exitCode).not.toBe(0)
  })
})
