/**
 * PHASE E — A WEAK LEARNER MUST BE ABLE TO REACH THE MASTERY GATE AND STAY IN IT.
 *
 * Both defects below were proven in Phase D by driving the real product on four
 * hard concepts as a genuinely weak student, then reproduced offline against
 * this module. 3 of 4 lessons closed on budget exhaustion with check=0 while
 * the learner was answering authored questions CORRECTLY — the runtime logs
 * carry three `[mcq-grade] correct: true` lines in those very lessons.
 *
 * G-1  DEMONSTRATE IS ABSORBING FOR A LEARNER WHO ONLY ANSWERS.
 *      DEMONSTRATE→GUIDE is gated on `demonstrated`, which is set only by a
 *      GIVE (`!askedQuestion || deliveredTeaching`). A turn that asks a
 *      question and does not also teach is not a give, so a run of pure
 *      question-and-answer is a fixed point. Measured offline: 30 consecutive
 *      CORRECT answers leave the learner at DEMONSTRATE with check=0.
 *
 * G-2  THE WEAK LEARNER'S SIGNATURE MOVE DEMOTES THEM OUT OF THE GATE.
 *      `explain_differently` calls phaseDown() unconditionally, so a learner
 *      who reaches CHECK and then says "sorry sir can you say more simple" is
 *      pushed to GUIDE before a CHECK-phase question can be asked and answered.
 *      The gate is entered and left without ever being spent — and the authored
 *      probe, which unlocks at that same phase, never attaches.
 *
 * WHAT THESE TESTS MUST NOT ALLOW. Neither fix may buy mastery. The whole
 * anti-hollow-advancement law lives in `correctAtCheck` / `correctAtPractice`,
 * and every negative control below exists to prove those counters still move
 * only on real graded evidence, that failure still walks the ladder backwards,
 * and that remediation still escalates on repetition.
 */
import { describe, it, expect } from 'vitest'
import {
  initialConversationState,
  advanceConversationState,
  isDeliveryPhase,
  type ConversationState,
  type TurnEvidence,
} from '@/lib/teaching/conversationState'

// ── the four turn shapes a real lesson is made of ───────────────────────────
const CORRECT: TurnEvidence = {
  askedQuestion: true, signalCorrect: true, recoveryFired: false, deliveredTeaching: false,
}
const WRONG: TurnEvidence = {
  askedQuestion: true, signalCorrect: false, recoveryFired: false, deliveredTeaching: false,
}
const TEACH: TurnEvidence = {
  askedQuestion: false, signalCorrect: null, recoveryFired: false, deliveredTeaching: true,
}
const CLARIFY: TurnEvidence = {
  askedQuestion: false, signalCorrect: null, recoveryFired: false, deliveredTeaching: true,
  learnerRequest: 'explain_differently',
}

const run = (start: ConversationState, script: TurnEvidence[]): ConversationState =>
  script.reduce((s, ev) => advanceConversationState(s, ev), start)

/** A learner who has legitimately reached CHECK: one correct answer, one
 *  teaching turn, one more correct answer. Uses only real transitions. */
function atCheck(): ConversationState {
  const s = run(initialConversationState('phys.x'), [CORRECT, TEACH, CORRECT])
  expect(s.phase, 'fixture must actually reach CHECK').toBe('CHECK')
  return s
}

// ═══════════════════════════════════════════════════════════════════════════
// G-1
// ═══════════════════════════════════════════════════════════════════════════
describe('G-1 — DEMONSTRATE must not be absorbing for a learner who answers', () => {
  it('a learner answering correctly, over and over, still climbs the ladder', () => {
    // THE REPRODUCTION. Before the fix this ends at DEMONSTRATE, check=0.
    const s = run(initialConversationState('phys.x'), Array(8).fill(CORRECT))
    expect(s.phase).not.toBe('DEMONSTRATE')
    expect(isDeliveryPhase(s.phase), 'should have reached a mastery gate').toBe(false)
  })

  it('one correct answer at DEMONSTRATE moves to GUIDE', () => {
    const s = advanceConversationState(initialConversationState('phys.x'), CORRECT)
    expect(s.phase).toBe('DEMONSTRATE')
    expect(advanceConversationState(s, CORRECT).phase).toBe('GUIDE')
  })

  it('and GUIDE is then genuinely leavable — the fix must not just move the trap', () => {
    // Moving the phase without recording the give would strand the learner at
    // GUIDE instead, because GUIDE→CHECK is gated on `demonstrated` too.
    const s = run(initialConversationState('phys.x'), [CORRECT, CORRECT])
    expect(s.phase).toBe('GUIDE')
    expect(s.demonstrated, 'answering IS evidence something answerable was delivered').toBe(true)
    expect(advanceConversationState(s, CORRECT).phase).toBe('CHECK')
  })

  it('the learner reaches mastery inside the 12-turn concept budget', () => {
    // The whole point of Phase E. No budget change, no threshold change.
    const s = run(initialConversationState('phys.x'), Array(12).fill(CORRECT))
    expect(s.phase).toBe('TRANSFER')
    expect(s.correctAtCheck).toBeGreaterThanOrEqual(1)
    expect(s.correctAtPractice).toBeGreaterThanOrEqual(2)
    expect(s.turnsOnConcept).toBeLessThanOrEqual(12)
  })
})

describe('G-1 NEGATIVE CONTROLS — nothing here may buy mastery', () => {
  it('a correct answer at DEMONSTRATE increments NO mastery counter', () => {
    const s = advanceConversationState(initialConversationState('phys.x'), CORRECT)
    const after = advanceConversationState(s, CORRECT)
    expect(after.phase).toBe('GUIDE')
    expect(after.correctAtCheck).toBe(0)
    expect(after.correctAtPractice).toBe(0)
    expect(after.verifiedCorrectAtCheck).toBe(0)
    expect(after.verifiedCorrectAtPractice).toBe(0)
  })

  it('a WRONG answer at DEMONSTRATE still walks the ladder BACKWARDS', () => {
    const s = advanceConversationState(initialConversationState('phys.x'), CORRECT)
    expect(s.phase).toBe('DEMONSTRATE')
    const after = advanceConversationState(s, WRONG)
    expect(after.phase).toBe('OBSERVE')
    expect(after.consecutiveFailures).toBe(1)
  })

  it('a wrong answer never sets `demonstrated` — the failure path is untouched', () => {
    const s = advanceConversationState(initialConversationState('phys.x'), WRONG)
    expect(s.demonstrated).toBe(false)
  })

  it('an ACKNOWLEDGEMENT still cannot climb past the delivery phases', () => {
    const ack: TurnEvidence = {
      askedQuestion: false, signalCorrect: null, recoveryFired: false, acknowledgement: true,
    }
    const s = run(initialConversationState('phys.x'), Array(10).fill(ack))
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
  })

  it('a DEGRADED turn carrying a correct signal still banks nothing and pins the phase', () => {
    const s = advanceConversationState(initialConversationState('phys.x'), CORRECT)
    const after = advanceConversationState(s, { ...CORRECT, degradedTurn: true })
    expect(after.phase).toBe(s.phase)
    expect(after.correctAtCheck).toBe(0)
  })

  it('OBSERVE behaviour is unchanged — a correct answer moves to DEMONSTRATE and no further', () => {
    const s = advanceConversationState(initialConversationState('phys.x'), CORRECT)
    expect(s.phase).toBe('DEMONSTRATE')
    expect(s.demonstrated, 'OBSERVE gives are still excluded from `demonstrated`').toBe(false)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// G-2
// ═══════════════════════════════════════════════════════════════════════════
describe('G-2 — one clarification must not evict a learner from the mastery gate', () => {
  it('"explain it more simply" at CHECK re-teaches without demoting', () => {
    // THE REPRODUCTION. Before the fix this returns GUIDE.
    const after = advanceConversationState(atCheck(), CLARIFY)
    expect(after.phase).toBe('CHECK')
  })

  it('it still COUNTS as remediation — the request is not swallowed', () => {
    const after = advanceConversationState(atCheck(), CLARIFY)
    expect(after.remediationCount).toBe(1)
    expect(after.explanationCount).toBeGreaterThanOrEqual(1)
    expect(after.consecutiveFailures).toBe(1)
    expect(after.frustrationLevel).toBeGreaterThan(0)
  })

  it('the learner can then answer the authored assessment and bank REAL evidence', () => {
    // The intended flow from the phase brief, end to end.
    const s = run(atCheck(), [CLARIFY, CORRECT])
    expect(s.correctAtCheck).toBe(1)
    expect(s.phase).toBe('PRACTICE')
    const done = run(s, [CORRECT, CORRECT])
    expect(done.correctAtPractice).toBe(2)
    expect(done.phase).toBe('TRANSFER')
  })

  it('the full weak-learner journey closes inside the budget', () => {
    const s = run(initialConversationState('phys.x'), [
      CLARIFY, TEACH, CORRECT, CLARIFY, TEACH, CORRECT, CLARIFY, CORRECT, CORRECT, CORRECT,
    ])
    expect(s.phase).toBe('TRANSFER')
    expect(s.correctAtCheck).toBeGreaterThanOrEqual(1)
    expect(s.correctAtPractice).toBeGreaterThanOrEqual(2)
    expect(s.turnsOnConcept).toBeLessThanOrEqual(12)
  })
})

describe('G-2 NEGATIVE CONTROLS — remediation policy is not weakened', () => {
  it('the SECOND clarification in a gate DOES demote — the hold is once, not always', () => {
    const once = advanceConversationState(atCheck(), CLARIFY)
    expect(once.phase).toBe('CHECK')
    const twice = advanceConversationState(once, CLARIFY)
    expect(twice.phase).toBe('GUIDE')
    expect(twice.remediationCount).toBe(2)
  })

  it('the SECOND clarification in a DELIVERY phase demotes — narrowed, with cause', () => {
    // REWRITTEN, not deleted. This case previously read "clarification in a
    // DELIVERY phase still demotes exactly as before", asserting that the
    // FIRST one demotes and pinning the scope of the G-2 hold to the mastery
    // gates. G-2b deliberately narrows that: the first clarification now holds
    // at GUIDE too, and the second demotes.
    //
    // WHY THE OLD ASSERTION WAS WRONG. `remediationCount` is cleared by a
    // graded-correct answer, so a learner alternating "explain it again" with
    // a CORRECT answer met the escalation branch with the counter at 0 every
    // single time. Every request was the first one, and GUIDE -> DEMONSTRATE
    // -> GUIDE cycled without end. The old assertion held on a single turn and
    // was blind to the cycle it licensed.
    //
    // The escalation it was protecting is intact and is what this now pins.
    const guide = run(initialConversationState('phys.x'), [CORRECT, TEACH])
    expect(guide.phase).toBe('GUIDE')
    const once = advanceConversationState(guide, CLARIFY)
    expect(once.phase).toBe('GUIDE')          // re-explain in place
    expect(advanceConversationState(once, CLARIFY).phase).toBe('DEMONSTRATE')
  })

  it('a clarification never touches the mastery counters', () => {
    const s = run(atCheck(), [CLARIFY, CLARIFY, CLARIFY])
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
    expect(s.verifiedCorrectAtCheck).toBe(0)
  })

  it('a WRONG answer at CHECK still demotes — CHECK is not made sticky', () => {
    const after = advanceConversationState(atCheck(), WRONG)
    expect(after.phase).not.toBe('CHECK')
    expect(after.consecutiveFailures).toBe(1)
  })

  it('CHECK remains leavable downward after a genuine failure run', () => {
    const s = run(atCheck(), [WRONG, WRONG])
    expect(isDeliveryPhase(s.phase)).toBe(true)
    expect(s.consecutiveFailures).toBe(2)
  })

  it('a correct answer CLEARS remediation, so the hold is available again later', () => {
    // Existing behaviour (Phase 4's remediation exit) — asserted so the new
    // gate-hold rides it rather than inventing its own lifecycle.
    const s = run(atCheck(), [CLARIFY, CORRECT])
    expect(s.remediationCount).toBe(0)
  })
})

describe('the two fixes together do not fabricate anything', () => {
  it('a learner who only ever clarifies reaches no mastery at all', () => {
    const s = run(initialConversationState('phys.x'), Array(12).fill(CLARIFY))
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
    expect(isDeliveryPhase(s.phase)).toBe(true)
  })

  it('a learner who only ever answers WRONG reaches no mastery at all', () => {
    const s = run(initialConversationState('phys.x'), Array(12).fill(WRONG))
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
    // Still a DELIVERY phase, never a gate. Deliberately not asserting OBSERVE:
    // measured identical before and after this change, QL-2's
    // `phaseAfterConcludedDiagnostic` moves a concluded OBSERVE diagnostic to
    // DEMONSTRATE after two failed probes, which is pre-existing and correct —
    // the tutor stops asking and starts showing. Pinned as the real invariant.
    expect(isDeliveryPhase(s.phase)).toBe(true)
    expect(s.demonstrated).toBe(false)
  })

  it('mastery still requires check>=1 AND practice>=2 of real graded evidence', () => {
    const s = run(initialConversationState('phys.x'), [CORRECT, CORRECT, CORRECT])
    expect(s.phase).toBe('CHECK')
    expect(s.correctAtCheck).toBe(0)   // entering CHECK is not passing it
  })
})


// ═══════════════════════════════════════════════════════════════════════════
// G-2b — THE SAME TREADMILL, ONE RUNG LOWER
// ═══════════════════════════════════════════════════════════════════════════
/**
 * G-2 fixed the mastery gates and left GUIDE demoting on the first
 * clarification. Because `remediationCount` is cleared by a graded-correct
 * answer, a learner who alternates a clarification request with a correct
 * answer arrives at every request with the counter at 0 — so the escalation
 * branch never engages and the ladder oscillates GUIDE <-> DEMONSTRATE for the
 * whole lesson.
 *
 * Measured live 2026-08-30 across the 60-session physics certification sweep
 * and the 12-session chemistry baseline: 3 physics sessions sat at
 * OBSERVE>DEMONSTRATE>GUIDE having been served ONE keyed probe in fifteen
 * turns, and chemistry's `chem.bio.enzyme-kinetics` was served ZERO in
 * fifteen. All four ended at correctAtCheck 0, correctAtPractice 0.
 */
describe('G-2b — a clarification must not put the learner on a treadmill', () => {
  /** The harness learner's real shape: ask for help, then answer correctly. */
  const alternating = (turns: number) => {
    let s: ConversationState = {
      ...initialConversationState('phys.mech.pressure-fluids'),
      taughtThisSession: true, demonstrated: true, phase: 'GUIDE',
    }
    for (let n = 1; n <= turns; n++) {
      s = advanceConversationState(s, n % 2 === 1 ? CLARIFY : CORRECT)
    }
    return s
  }

  it('reaches the gates instead of cycling (was GUIDE forever, check 0)', () => {
    const s = alternating(12)
    expect(s.correctAtCheck).toBeGreaterThanOrEqual(1)
    expect(s.correctAtPractice).toBeGreaterThanOrEqual(2)
    expect(s.phase).toBe('TRANSFER')
  })

  it('the first clarification at GUIDE re-explains in place', () => {
    const guide: ConversationState = {
      ...initialConversationState('phys.x'),
      taughtThisSession: true, demonstrated: true, phase: 'GUIDE',
    }
    expect(advanceConversationState(guide, CLARIFY).phase).toBe('GUIDE')
  })

  it('escalation still bites: consecutive requests walk the ladder down', () => {
    const at = (phase: ConversationState['phase']): ConversationState => ({
      ...initialConversationState('phys.x'),
      taughtThisSession: true, demonstrated: true, phase,
    })
    const step = (s: ConversationState, n: number) => {
      for (let i = 0; i < n; i++) s = advanceConversationState(s, CLARIFY)
      return s.phase
    }
    expect(step(at('PRACTICE'), 1)).toBe('PRACTICE')
    expect(step(at('PRACTICE'), 2)).toBe('CHECK')
    expect(step(at('PRACTICE'), 3)).toBe('GUIDE')
    expect(step(at('GUIDE'), 2)).toBe('DEMONSTRATE')
  })

  it('buys no mastery — the counters are untouched by clarification', () => {
    let s: ConversationState = {
      ...initialConversationState('phys.x'),
      taughtThisSession: true, demonstrated: true, phase: 'CHECK',
    }
    for (let i = 0; i < 6; i++) s = advanceConversationState(s, CLARIFY)
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
    expect(s.verifiedCorrectAtCheck ?? 0).toBe(0)
  })

  it('a WRONG answer is a different branch and still demotes on the first', () => {
    const check: ConversationState = {
      ...initialConversationState('phys.x'),
      taughtThisSession: true, demonstrated: true, phase: 'CHECK',
    }
    expect(advanceConversationState(check, WRONG).phase).not.toBe('CHECK')
  })
})
