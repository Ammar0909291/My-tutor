/**
 * A FIGURE IS INTRODUCED ONCE.
 *
 * ── THE MEASURED FAILURE ────────────────────────────────────────────────────
 * Corpus audit Topic 3, `phys.meas.errors`, real production, real learner
 * account. One `number_line` figure was held across the exchange, and FIVE of
 * six consecutive tutor turns re-described it with its full numeric range:
 *
 *   "Look at the number line on your screen showing the measurement range from
 *    9.5 to 10.5 with marks at 9.8 and 10.2."
 *   "…just like the spread you see between 9.8 and 10.2 on the number line on
 *    your screen."
 *   "Think about the number line on your screen showing the measurement range
 *    with points at 9.8 and 10.2 around a true value of 10.0."
 *   "Let's look at the number line on your screen showing the measurement
 *    range from 9.5 to 10.5 with points at 9.8 and 10.2."
 *   "…let's test that idea using the number line on your screen where the
 *    measurement range spans from 9.5 to 10.5."
 *
 * ── WHY NO EXISTING RULE CAUGHT IT ──────────────────────────────────────────
 * Nothing in those sentences is FALSE. The figure exists, the numbers are its
 * real numbers, and the contract's fabrication rules — which are the reason
 * this pipeline is trustworthy — are all satisfied. `WHAT THE LEARNER SEES`
 * plus "refer to the figure by its REAL elements" is exactly what produces
 * this, and it fires again, identically, on every held turn.
 *
 * It is a TEACHING defect rather than a truth defect: a learner reading at
 * intermediate level spends their limited attention re-reading a description
 * they already have, and a tutor that re-introduces the same picture every turn
 * reads as one that has forgotten it already did.
 *
 * The contract simply had no notion of a SECOND turn with the same figure.
 * `session.turns` — the held count the engine already keeps — supplies it.
 */
import { describe, it, expect } from 'vitest'
import { buildVisualContractBlock } from '@/lib/teaching/visual/visualContract'
import type { VisualDecision } from '@/lib/teaching/visual/types'

/** The real figure from the audited session. */
function decisionWithHeldTurns(turns: number): VisualDecision {
  return {
    conceptId: 'phys.meas.errors',
    conceptTitle: 'Measurement Errors and Uncertainty',
    purpose: 'explain',
    graphical: true,
    representation: 'number_line',
    renderer: 'spec',
    provenance: 'curated',
    continuityReason: turns > 0 ? 'continuity' : 'fresh',
    session: { conceptId: 'phys.meas.errors', turns } as never,
    asset: {
      conceptId: 'phys.meas.errors',
      conceptTitle: 'Measurement Errors and Uncertainty',
      representation: 'number_line',
      scope: 'concept',
      provenance: 'curated',
      payload: { type: 'number_line', start: 9.5, end: 10.5, highlight: [9.8, 10.2] },
      semantics: { elements: ['9.8', '10.2'] },
    } as never,
  } as unknown as VisualDecision
}

const RULE = 'ALREADY INTRODUCED'

describe('the first turn a figure appears', () => {
  it('does NOT carry the already-introduced rule', () => {
    // Introducing it properly is the whole job on turn one.
    expect(buildVisualContractBlock(decisionWithHeldTurns(0))).not.toContain(RULE)
  })

  it('still tells the tutor a figure is on screen', () => {
    const block = buildVisualContractBlock(decisionWithHeldTurns(0))
    expect(block).toContain('VISUAL CONTRACT')
    expect(block).toContain('number_line')
  })
})

describe('every later turn with the same figure', () => {
  for (const turns of [1, 2, 5, 12]) {
    it(`carries the rule at heldTurns=${turns}`, () => {
      const block = buildVisualContractBlock(decisionWithHeldTurns(turns))
      expect(block).toContain(RULE)
      expect(block).toContain('Do NOT re-introduce')
    })
  }

  it('names restating ranges and values specifically', () => {
    // The measured failure was not a vague re-mention — it was the numeric
    // range, restated verbatim, five times.
    const block = buildVisualContractBlock(decisionWithHeldTurns(3))
    expect(block.toLowerCase()).toContain('ranges')
    expect(block.toLowerCase()).toContain('already given')
  })

  it('still permits pointing at the part being used', () => {
    // The fix must not push the tutor to the opposite failure — a figure on
    // screen that the explanation never refers to at all.
    const block = buildVisualContractBlock(decisionWithHeldTurns(2))
    expect(block).toContain('Point at the ONE part')
  })

  it('does NOT weaken the fabrication rules', () => {
    // Those rules are the reason this pipeline is trustworthy; a brevity
    // instruction must not become a licence to invent.
    const block = buildVisualContractBlock(decisionWithHeldTurns(4))
    expect(block).toContain('The rules above still bind every element you do name')
    expect(block).toContain('WHAT THE LEARNER SEES')
  })
})

describe('it is inert where it cannot apply', () => {
  it('a turn with no figure is unaffected', () => {
    const noFigure = { ...decisionWithHeldTurns(3), graphical: false, asset: null } as VisualDecision
    const block = buildVisualContractBlock(noFigure)
    expect(block).not.toContain(RULE)
    expect(block).toContain('NO FIGURE IS ATTACHED')
  })

  it('a null decision produces no block at all', () => {
    expect(buildVisualContractBlock(null)).toBe('')
  })

  it('a decision with no session does not throw and does not fire', () => {
    const noSession = { ...decisionWithHeldTurns(3), session: null } as VisualDecision
    expect(() => buildVisualContractBlock(noSession)).not.toThrow()
    expect(buildVisualContractBlock(noSession)).not.toContain(RULE)
  })
})
