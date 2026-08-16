/**
 * CAN A LEARNER ACTUALLY SATISFY THE MASTERY LADDER?
 *
 * This test exists because a live audit (2026-08-16) measured a correctly
 * answered structured MCQ that left `checkCorrect: 0, practiceCorrect: 0`, and
 * the hypothesis on the table was that the ladder can never close. The
 * production `[ladder]` trace disproved that:
 *
 *   16:18:24  ask MCQ    signalTag=false correctness=null  OBSERVE     -> OBSERVE
 *   16:18:53  answer "C" signalTag=true  correctness=true  OBSERVE     -> DEMONSTRATE
 *   16:19:54  ask again  signalTag=false correctness=null  DEMONSTRATE -> GUIDE
 *
 * The learner's correct answer was not lost — it was SPENT climbing
 * OBSERVE -> DEMONSTRATE, which increments no counter. The session had simply
 * never left OBSERVE before, because the only exit from OBSERVE is a correct
 * answer and every earlier answer that episode was wrong.
 *
 * So the counters are not broken; they are late. This test pins the shortest
 * path a real learner can walk, so "how many correct answers does mastery
 * cost" is a fact in the suite rather than an argument. If someone later makes
 * the ladder cheaper, this test must be changed deliberately — and per the
 * moat's own stance, making it cheaper merely to move counters is forbidden.
 */
import { describe, it, expect } from 'vitest'
import {
  advanceConversationState, initialConversationState,
  type ConversationState, type TurnEvidence,
} from '@/lib/teaching/conversationState'
import { MASTERY_CHECK_REQUIRED } from '@/lib/teaching/masteryGate'

const CONCEPT = 'chem.found.states-of-matter'

/** A graded-correct learner answer: the tutor asked nothing this turn, the
 *  answer was graded true (server-side MCQ grading produces exactly this). */
const CORRECT: TurnEvidence = {
  askedQuestion: false, signalCorrect: true, recoveryFired: false,
}
/** A pure teaching turn that also asks: this is what sets `demonstrated`,
 *  via deliveredAGive = !degraded && (!askedQuestion || deliveredTeaching). */
const TEACH_AND_ASK: TurnEvidence = {
  askedQuestion: true, signalCorrect: null, recoveryFired: false,
  deliveredTeaching: true,
} as TurnEvidence
const WRONG: TurnEvidence = {
  askedQuestion: false, signalCorrect: false, recoveryFired: false,
}

function walk(steps: TurnEvidence[], from = initialConversationState(CONCEPT)) {
  return steps.reduce<ConversationState>((s, e) => advanceConversationState(s, e), from)
}

describe('the mastery ladder is reachable — the shortest honest path', () => {
  it('OBSERVE exits only on a correct answer, and that answer increments nothing', () => {
    const s = walk([CORRECT])
    expect(s.phase).toBe('DEMONSTRATE')
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
  })

  it('a wrong answer alone does not leave OBSERVE', () => {
    const s = walk([WRONG])
    expect(s.phase).toBe('OBSERVE')
    expect(s.observeFailures).toBe(1)
  })

  it('TWO failed probes conclude the diagnostic and leave OBSERVE — by design', () => {
    // phaseAfterConcludedDiagnostic: OBSERVE is deliberately NOT absorbing.
    // The module's own note explains why — a learner who answered wrong twice
    // was previously pinned there forever, and every later turn re-emitted a
    // byte-identical directive. Leaving OBSERVE is NOT mastery: the counters
    // stay 0 and the learner still owes every graded answer below.
    const s = walk([WRONG, WRONG])
    expect(s.phase).toBe('DEMONSTRATE')
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
  })

  it('never awards a counter to a learner who only ever answers wrong', () => {
    // This is the moat's stance working: no hollow advancement.
    const s = walk([WRONG, WRONG, TEACH_AND_ASK, WRONG, TEACH_AND_ASK, WRONG, WRONG])
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
    expect(s.phase).not.toBe('TRANSFER')
  })

  it('DEMONSTRATE -> GUIDE needs a teaching give, not another correct answer', () => {
    const s = walk([CORRECT, TEACH_AND_ASK])
    expect(s.phase).toBe('GUIDE')
    expect(s.demonstrated).toBe(true)
  })

  it('closes the full ladder, and costs exactly five graded-correct answers', () => {
    const path: TurnEvidence[] = [
      CORRECT,        // OBSERVE     -> DEMONSTRATE
      TEACH_AND_ASK,  // DEMONSTRATE -> GUIDE   (sets demonstrated)
      CORRECT,        // GUIDE       -> CHECK
      CORRECT,        // CHECK       -> PRACTICE, correctAtCheck 1
      CORRECT,        // PRACTICE    correctAtPractice 1
      CORRECT,        // PRACTICE    correctAtPractice 2 -> TRANSFER
    ]
    const s = walk(path)

    expect(s.phase).toBe('TRANSFER')
    expect(s.correctAtCheck).toBe(MASTERY_CHECK_REQUIRED)
    expect(s.correctAtPractice).toBe(2)
    expect(path.filter((e) => e.signalCorrect === true)).toHaveLength(5)
  })

  it('the counters the learner is graded on move only inside CHECK and PRACTICE', () => {
    // Two correct answers before CHECK move the phase but not the counters —
    // this is exactly what the live session measured, and it is intended.
    const beforeCheck = walk([CORRECT, TEACH_AND_ASK, CORRECT])
    expect(beforeCheck.phase).toBe('CHECK')
    expect(beforeCheck.correctAtCheck).toBe(0)

    const inCheck = advanceConversationState(beforeCheck, CORRECT)
    expect(inCheck.correctAtCheck).toBe(1)
  })
})
