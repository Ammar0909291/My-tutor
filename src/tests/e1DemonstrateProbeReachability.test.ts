/**
 * E1's DEMONSTRATE WIDENING — WHY IT COULD NOT FIRE, AND WHAT STOPS IT NOW.
 *
 * ── RESOLVED 2026-09-01 (9690536), AND THE FIX IS VERIFIED IN PRODUCTION ────
 * This file previously asserted that E1 was UNREACHABLE. It no longer is. The
 * gate now opens at DEMONSTRATE for a learner who has failed, and production
 * gives the before/after directly:
 *
 *   BEFORE  [gate-eligibility] {"phase":"DEMONSTRATE","move":"show",
 *            "eligible":false,"blockedBy":["phaseAllowsProbe"],
 *            "phaseAllowsProbe":false,"probeAttachablePhase":true}
 *   AFTER   [gate-eligibility] {"phase":"DEMONSTRATE","move":"show",
 *            "eligible":true,"blockedBy":[],"phaseAllowsProbe":true}
 *           [gate-assessment]  {"phase":"DEMONSTRATE","probeFound":true, ...}
 *
 * E1 reached the probe selector for the first time since it was written.
 *
 * ── AND IT STILL DECLINED, FOR A GOOD REASON ────────────────────────────────
 *   [gate-assessment] {"declined":"below-guide-no-surplus",
 *                      "phase":"DEMONSTRATE","poolSize":3}
 *   [gate-assessment] {"probeFound":true,"converted":false,
 *                      "assetId":"9a362370-287f-4537-8d05-860139150b46"}
 *
 * `mayAttachProbeBelowGuide` needs poolSize - 1 >= CREDITS_REQUIRED_FOR_MASTERY
 * (so, four). By the time this learner had failed, three probes remained —
 * the earlier ones were already spent — so spending another below the gates
 * would have made mastery unreachable, which is the defect that held physics
 * at 79%. The guard did exactly its job.
 *
 * THE REAL CONSTRAINT IS THEREFORE PROBE DEPTH, NOT GATE LOGIC. The
 * gradeable-question rate for a struggling learner did NOT move (mirrors:
 * 3 of 12 before, 2 of 12 after — inside the 1-to-3 range the same script
 * produced across earlier runs). Helping that learner needs MORE authored
 * probes per concept, which is content work; no arrangement of this gate can
 * conjure a fourth probe that does not exist.
 *
 * The sections below are kept because the reachability facts they prove are
 * what made the diagnosis possible, and because the phase-move enumeration is
 * still a live guard.
 *
 * ── WHAT E1 WAS FOR, in route.ts's own words ────────────────────────────────
 *   "E1 — CRITERION 4. Measured in the 2026-08-31 re-measurement: only 114 of
 *    456 questions put to the learner carried an answer key (25%), so three
 *    quarters of what the tutor asks cannot be graded and the learner answers
 *    into a void. DEMONSTRATE is where the largest block of those sit."
 *
 * It widened `isProbeAttachablePhase` to include DEMONSTRATE and added
 * `mayAttachProbeBelowGuide` to require a surplus of four probes before
 * spending one below the mastery gates.
 *
 * ── WHY IT NEVER RUNS ───────────────────────────────────────────────────────
 * `gateEligible` is an AND. A different conjunct in it —
 *
 *   phaseAllowsProbe = isMasteryGatePhase(phase)
 *                   || ((phase === 'GUIDE' || phase === 'DEMONSTRATE')
 *                       && evidenceMoveHoisted === 'ask')
 *
 * — requires the decided move to be 'ask'. The ladder's move at DEMONSTRATE is
 * `case 'DEMONSTRATE': return 'show'`, unconditional. So the AND can never
 * close there, whatever E1 widened.
 *
 * PROVEN, not read: 1,536 combinations of the real `decideNextMoveDetailed` at
 * DEMONSTRATE — every combination of recovery, worked-example-first, practice
 * requested, demonstrated, taught-this-session, teach-segments 0..3,
 * consecutive failures 0..2, and four learner-request kinds — return only
 * 'show' and 'teach'. ZERO return 'ask'.
 *
 * CONFIRMED IN PRODUCTION, this session, phys.mech.friction:
 *   [gate-eligibility] {"phase":"DEMONSTRATE","move":"show","eligible":false,
 *                       "blockedBy":["phaseAllowsProbe"],
 *                       "phaseAllowsProbe":false,"probeAttachablePhase":true}
 * `probeAttachablePhase: true` is E1 doing its job; `phaseAllowsProbe: false`
 * is the conjunct that makes it moot.
 *
 * ── THE AUTHOR'S INTENT AND THE PROXY THAT DEFEATS IT ───────────────────────
 * The stated rule is "offered only where the turn already carries a question"
 * — `move === 'ask'` is a PROXY for that. At GUIDE the move alternates, so the
 * proxy works (the control below proves it). At DEMONSTRATE the move is fixed
 * at 'show', so the proxy is not a restriction, it is a prohibition. The model
 * still asks questions on those turns — that is the ungradeable 75% E1 was
 * written to reduce — so the intent is sound and only its proxy is wrong.
 *
 * ── WHY THIS IS A TEST AND NOT A FIX ────────────────────────────────────────
 * Replacing the proxy means deciding what signal stands in for "the turn
 * carries a question", which depends on pre/post-model ordering, on a hot
 * path, in a file that records a previous attempt to alter ladder behaviour at
 * a neighbouring phase breaking seven behavioural tests and being reverted.
 * That deserves its own measurement, not a guess appended to another change.
 *
 * WHEN SOMEONE FIXES IT, THIS TEST WILL FAIL. That is the point: it should
 * fail loudly and be updated deliberately, rather than the dead branch sitting
 * unnoticed for another month.
 *
 * ── THE HARM IS NOW MEASURED, AND MY EARLIER READING OF IT WAS WRONG ────────
 * When this test was written I recorded that E1's deadness caused "no measured
 * learner harm", because all eight live runs reached verified mastery without
 * it. That was true and it was the wrong probe: those runs answered every
 * question correctly, and a learner who is right about everything is barely
 * affected by whether a question can be graded.
 *
 * Driving the CONFIDENTLY WRONG learner instead (2026-09-01,
 * scripts/qa/verify-misconception-path.ts, three concepts, deployed app):
 *
 *   phys.opt.mirrors            3 gradeable questions of 12 turns (25%)
 *                               5 of 12 turns spent at DEMONSTRATE
 *   phys.mech.friction          3 of 12
 *   phys.mech.kinetic-energy    3 of 12
 *
 * So roughly HALF a struggling learner's turns sit in the phase where E1 was
 * built to attach an authored probe and structurally cannot, and three
 * quarters of their turns carry no question the server can grade. That is
 * route.ts's own "only 114 of 456 questions carried an answer key" figure,
 * arrived at independently from the learner's side.
 *
 * The consequence is not cosmetic: a learner who is never asked a gradeable
 * question cannot demonstrate recovery however much they actually learn. The
 * fix is therefore justified by evidence now, not by tidiness — it needs its
 * own measurement pass for the post-model attachment described above, not to
 * be appended to an unrelated change.
 */
import { describe, it, expect } from 'vitest'
import {
  decideNextMoveDetailed, initialConversationState, type ConversationState,
} from '@/lib/teaching/conversationState'
import { isProbeAttachablePhase } from '@/lib/teaching/gateAssessment'

type Ctx = Parameters<typeof decideNextMoveDetailed>[1]
const at = (phase: ConversationState['phase'], o: Partial<ConversationState> = {}): ConversationState =>
  ({ ...initialConversationState('phys.mech.friction'), phase, ...o })

const BOOLS = [false, true]

describe('E1 — the widening is real, and it is INLINE', () => {
  // A first draft of this test asserted `isProbeAttachablePhase('DEMONSTRATE')`
  // and FAILED. E1 deliberately did not widen that shared function — route.ts
  // says why: its other caller is the ungraded-question withhold, and widening
  // it too "would suppress the model's own questions at DEMONSTRATE — a
  // different change, with a real risk of making lessons passive". The
  // widening is an inline disjunct in `gateTerms` instead. Recorded because
  // the distinction is the whole reason the defect is easy to miss.
  it('the shared predicate still EXCLUDES DEMONSTRATE, by design', () => {
    expect(isProbeAttachablePhase('DEMONSTRATE')).toBe(false)
  })

  it('and the gate widens it inline, which is what makes probeAttachablePhase true', () => {
    const { readFileSync } = require('node:fs')
    const { join } = require('node:path')
    const route = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
    expect(route).toContain("isProbeAttachablePhase(phaseBeforeTurn) || phaseBeforeTurn === 'DEMONSTRATE'")
  })
})

describe('E1 — the move is never "ask" at DEMONSTRATE, which is why the old condition was fatal', () => {
  it('no combination of the real decider returns "ask" at DEMONSTRATE', () => {
    const seen = new Set<string>()
    let asked = 0
    let total = 0
    for (const recoveryTurn of BOOLS)
    for (const workedExampleFirst of BOOLS)
    for (const practiceRequested of BOOLS)
    for (const demonstrated of BOOLS)
    for (const taughtThisSession of BOOLS)
    for (const teachSegmentsSinceQuestion of [0, 1, 2, 3])
    for (const consecutiveFailures of [0, 1, 2])
    for (const learnerRequest of [undefined, 'diagram', 'example', 'question'] as const) {
      const d = decideNextMoveDetailed(
        at('DEMONSTRATE', {
          demonstrated, taughtThisSession, teachSegmentsSinceQuestion, consecutiveFailures,
        } as Partial<ConversationState>),
        {
          recoveryTurn, workedExampleFirst, practiceRequested, learnerRequest,
          legality: { hasEvidencedPriorKnowledge: false },
        } as unknown as Ctx,
      )
      seen.add(d.move)
      if (d.move === 'ask') asked++
      total++
    }
    expect(total).toBe(1536)
    expect(asked).toBe(0)
    expect([...seen].sort()).toEqual(['show', 'teach'])
  })

  it('CONTROL — at GUIDE the same condition does open, so it is not dead everywhere', () => {
    let asked = 0
    for (const teachSegmentsSinceQuestion of [0, 1, 2, 3])
    for (const practiceRequested of BOOLS) {
      const d = decideNextMoveDetailed(
        at('GUIDE', { demonstrated: true, taughtThisSession: true, teachSegmentsSinceQuestion } as Partial<ConversationState>),
        {
          recoveryTurn: false, workedExampleFirst: false, practiceRequested,
          legality: { hasEvidencedPriorKnowledge: false },
        } as unknown as Ctx,
      )
      if (d.move === 'ask') asked++
    }
    expect(asked).toBeGreaterThan(0)
  })

  it('DEMONSTRATE is the ONLY phase that cannot ask — the defect class is bounded', () => {
    // Generalising the audit that found E1: if other phases were also unable
    // to produce 'ask', every feature gated on it would be dead too and this
    // would be a class of defects rather than one. Enumerated across the same
    // context space for all six phases: only DEMONSTRATE is 'ask'-less.
    //
    // Kept as a guard, not trivia. If a future change makes another phase
    // 'ask'-less, anything gated on `move === 'ask'` there dies silently, and
    // this is the test that says so.
    const askless: string[] = []
    for (const phase of ['OBSERVE', 'DEMONSTRATE', 'GUIDE', 'CHECK', 'PRACTICE', 'TRANSFER'] as const) {
      let canAsk = false
      for (const recoveryTurn of BOOLS)
      for (const workedExampleFirst of BOOLS)
      for (const practiceRequested of BOOLS)
      for (const demonstrated of BOOLS)
      for (const taughtThisSession of BOOLS)
      for (const teachSegmentsSinceQuestion of [0, 1, 2, 3])
      for (const consecutiveFailures of [0, 1, 2]) {
        const d = decideNextMoveDetailed(
          at(phase, {
            demonstrated, taughtThisSession, teachSegmentsSinceQuestion, consecutiveFailures,
          } as Partial<ConversationState>),
          {
            recoveryTurn, workedExampleFirst, practiceRequested,
            legality: { hasEvidencedPriorKnowledge: false },
          } as unknown as Ctx,
        )
        if (d.move === 'ask') { canAsk = true; break }
      }
      if (!canAsk) askless.push(phase)
    }
    expect(askless).toEqual(['DEMONSTRATE'])
  })

  it('GUIDE keeps the ask condition; DEMONSTRATE is now open, guarded by surplus', () => {
    // HISTORY, kept because each revision was forced by a measurement:
    //   v1 "the route still spells the condition that makes it moot" — the
    //      'ask'-only condition, which at DEMONSTRATE is a prohibition (the
    //      decider never returns 'ask' there; proven in the case above).
    //   v2 "DEMONSTRATE is now scoped to failure" — E1 replaced it with
    //      `strugglingOnThisConcept`, on the premise that a PROGRESSING
    //      learner's DEMONSTRATE turn is a quiet show turn needing no probe.
    //   v3 (this) that premise was falsified by physics Tier A batch 5:
    //      15 of 19 UNMEASURED sessions sat at DEMONSTRATE, move 'show',
    //      NOT struggling, already carrying a model-invented question that was
    //      graded next turn against a key the model wrote — on concepts each
    //      holding 4-6 reviewed authored probes. The turn was never quiet.
    //
    // GUIDE's condition is untouched. DEMONSTRATE now opens unconditionally at
    // this gate, and `mayAttachProbeBelowGuide` (pool - 1 >= 3) is the SOLE
    // guard on actually spending an early probe — see the behavioural cases in
    // demonstrateAuthoredProbeSubstitution.test.ts, which test the real
    // modules rather than this file's source text.
    const { readFileSync } = require('node:fs')
    const { join } = require('node:path')
    const route = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
    expect(route).toContain("(phaseBeforeTurn === 'GUIDE' && evidenceMoveHoisted === 'ask')")
    expect(route).toContain("(phaseBeforeTurn === 'DEMONSTRATE')")
    // The failure scope is genuinely gone, not merely reworded.
    expect(route).not.toContain("phaseBeforeTurn === 'DEMONSTRATE' && strugglingOnThisConcept")
    // OBSERVE is still not a disjunct at all.
    expect(route).not.toContain("phaseBeforeTurn === 'OBSERVE'")
  })
})
