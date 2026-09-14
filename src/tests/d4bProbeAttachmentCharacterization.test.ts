/**
 * D4b — WHAT THE PRODUCTION EVIDENCE ACTUALLY SHOWS AT A MASTERY GATE.
 *
 * The D4b question is: "why can a Physics concept that HAS authored gradeable
 * probes reach CHECK/PRACTICE using a prose/open-ended question instead of an
 * authored, server-gradeable probe?"
 *
 * This file pins, with the REAL production functions, what the runtime does on
 * exactly that turn. It is a CHARACTERIZATION, not a fix and not a claim that
 * D4b is closed: it exists so the next session starts from measured behaviour
 * instead of re-deriving it, and so any future change to these boundaries has
 * to move a test.
 *
 * Every case below was selected from production evidence captured on
 * 2026-09-14 (deployment dpl_BnW8Za7erUYRiPKuKS2fv5FBtJ18, real account,
 * phys.qm.uncertainty-principle and phys.mech.conservation-of-momentum):
 *
 *   [gate-assessment] {"declined":"below-guide-no-surplus","phase":"DEMONSTRATE","poolSize":3}
 *   [gate-assessment] {"declined":"below-guide-no-surplus","phase":"OBSERVE","poolSize":3}
 *   [gate-assessment] {"phase":"OBSERVE","move":"ask","probeFound":true,"converted":false,...}
 *   [gate-contract]   {"event":"ungraded-mastery-question-withheld","reason":"no-gradeable-probe",...}
 *   [gate-eligibility]{"phase":"DEMONSTRATE","move":"teach","eligible":false,
 *                      "blockedBy":["hasMemoryState","arbitrationAllowsProbe"],...}
 */
import { describe, it, expect } from 'vitest'
import {
  withholdUngradedGateQuestion, isMasteryGatePhase, isProbeAttachablePhase,
} from '@/lib/teaching/gateAssessment'
import { mayAttachProbeBelowGuide, CREDITS_REQUIRED_FOR_MASTERY } from '@/lib/teaching/masteryReachability'

const PROSE_QUESTION =
  'So, thinking about a two-body collision: what happens to the total momentum '
  + 'of the system, and why does that follow from the absence of an external force?'

describe('D4b — a prose question at a MASTERY GATE', () => {
  it('CHECK: an unbacked prose question is WITHHELD, so the learner is never asked an ungradeable gate question', () => {
    const out = withholdUngradedGateQuestion({
      text: PROSE_QUESTION, phase: 'CHECK', phaseAfter: 'CHECK',
      hasStructuredMcq: false, gateSoughtThisTurn: false, lessonCompleted: false,
    } as Parameters<typeof withholdUngradedGateQuestion>[0])
    expect(out.withheld).toBe(true)
    expect(out.text).not.toContain('what happens to the total momentum')
  })

  it('PRACTICE: the same, and it does NOT depend on the gate having been sought', () => {
    for (const gateSoughtThisTurn of [true, false]) {
      const out = withholdUngradedGateQuestion({
        text: PROSE_QUESTION, phase: 'PRACTICE', phaseAfter: 'PRACTICE',
        hasStructuredMcq: false, gateSoughtThisTurn, lessonCompleted: false,
      } as Parameters<typeof withholdUngradedGateQuestion>[0])
      expect(out.withheld, `gateSought=${gateSoughtThisTurn}`).toBe(true)
    }
  })

  it('the reason it cannot depend on it: CHECK and PRACTICE are mastery-gate phases by definition', () => {
    expect(isMasteryGatePhase('CHECK')).toBe(true)
    expect(isMasteryGatePhase('PRACTICE')).toBe(true)
    expect(isMasteryGatePhase('DEMONSTRATE')).toBe(false)
    expect(isMasteryGatePhase('OBSERVE')).toBe(false)
  })

  it('BELOW the gates the withhold is conditional — it fires only when the gate was actually sought', () => {
    const sought = withholdUngradedGateQuestion({
      text: PROSE_QUESTION, phase: 'DEMONSTRATE', phaseAfter: 'DEMONSTRATE',
      hasStructuredMcq: false, gateSoughtThisTurn: true, lessonCompleted: false,
    } as Parameters<typeof withholdUngradedGateQuestion>[0])
    expect(sought.withheld).toBe(true) // the production [gate-contract] events

    const notSought = withholdUngradedGateQuestion({
      text: PROSE_QUESTION, phase: 'DEMONSTRATE', phaseAfter: 'DEMONSTRATE',
      hasStructuredMcq: false, gateSoughtThisTurn: false, lessonCompleted: false,
    } as Parameters<typeof withholdUngradedGateQuestion>[0])
    expect(notSought.withheld).toBe(false) // teaching below the gates may ask freely
  })
})

describe('D4b — why an available authored probe was declined below GUIDE', () => {
  // Production reported poolSize 3 for both concepts. The database holds 5
  // convertible probes for conservation-of-momentum and 4 for
  // uncertainty-principle (ACTIVE / en / HIGH), so the pool was DEPLETED by
  // the already-asked ledger, not empty — measured, not assumed.
  it('poolSize 3 is correctly declined: spending one would leave fewer than mastery needs', () => {
    expect(CREDITS_REQUIRED_FOR_MASTERY).toBe(3)
    expect(mayAttachProbeBelowGuide('DEMONSTRATE', 3)).toBe(false)
    expect(mayAttachProbeBelowGuide('OBSERVE', 3)).toBe(false)
    // Four is the first pool that can afford an early spend.
    expect(mayAttachProbeBelowGuide('DEMONSTRATE', 4)).toBe(true)
  })

  it('the rule applies BELOW the gates only — at CHECK/PRACTICE nothing withholds the probe on pool size', () => {
    for (const phase of ['CHECK', 'PRACTICE'] as const) {
      // The route only consults mayAttachProbeBelowGuide for OBSERVE and
      // DEMONSTRATE; these phases are attachable and unconstrained by surplus.
      expect(isProbeAttachablePhase(phase)).toBe(true)
    }
  })
})
