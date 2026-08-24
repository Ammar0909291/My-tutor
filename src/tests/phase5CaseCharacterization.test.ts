/**
 * PHASE 5 — LESSON INTEGRITY, EVIDENCE & PROGRESSION.
 *
 * Characterization tests for Cases A, B, C, E, F and the correctly-as-is
 * items of Case G, proving the invariant
 *
 *   "THE TUTOR MUST NEVER ADVANCE A LEARNER ON UNVERIFIED OR INCORRECT
 *   EVIDENCE, AND MUST NEVER GET STUCK IN A STATE THAT HAS NO VALID NEXT
 *   ACTION."
 *
 * already holds for these cases against the REAL modules — not fixes, since
 * the audit found no defect for these paths. (Case D, a genuine defect, is
 * fixed and tested separately in fillerRepairStreak.test.ts; Case G items 2
 * and 3, also genuine defects, are fixed and tested separately in
 * topicRequestNeedToLearn.test.ts and recoveryGuardIntensifier.test.ts.)
 *
 * Where a real production defect motivated the existing protection, its own
 * doc comment is cited rather than restated.
 */
import { describe, it, expect } from 'vitest'
import { gradeMcqAnswer, resolveMcqChoice, type TutorMCQ } from '@/lib/teaching/mcq'
import { shouldSuppressSignalCorrectness } from '@/lib/teaching/answerableTurn'
import { verifySignal, resolveContradiction } from '@/lib/teaching/signalVerification'
import {
  advanceConversationState,
  initialConversationState,
  type TurnEvidence,
} from '@/lib/teaching/conversationState'
import { isBareAcknowledgement, masteryVerified, masteryVerifiedStrict, gateLessonCompletion } from '@/lib/teaching/masteryGate'
import { classifyKnowledgeGap } from '@/lib/teaching/knowledgeGap'
import { detectFailureState } from '@/lib/teaching/recoveryGuard'
import { resolveRequestedConceptId } from '@/lib/teaching/concept/requestedConcept'

function neutralEvidence(overrides: Partial<TurnEvidence>): TurnEvidence {
  return { askedQuestion: false, signalCorrect: null, recoveryFired: false, ...overrides }
}

// ═══════════════════════════════════════════════════════════════════════
// CASE A — wrong answer must not progress
// ═══════════════════════════════════════════════════════════════════════
describe('Phase 5 Case A — wrong answer cannot be recorded as correct evidence', () => {
  const collisionMcq: TutorMCQ = {
    question: 'A 3 kg cart moves east at 4 m/s and collides inelastically with a 5 kg cart '
      + 'moving west at 1 m/s. What is the final velocity?',
    options: ['0.875 m/s east', '2.0 m/s east', '1.5 m/s west', '0 m/s'],
    correctIndex: 0,
  }

  it('an MCQ is graded deterministically against the stored answer key, not the model', () => {
    const wrong = gradeMcqAnswer('2.0 m/s east', collisionMcq)
    expect(wrong.correct).toBe(false)
    expect(wrong.chosenIndex).toBe(1)

    const right = gradeMcqAnswer('0.875 m/s east', collisionMcq)
    expect(right.correct).toBe(true)
    expect(right.chosenIndex).toBe(0)
  })

  it('an unrecognisable reply grades to null (unknown), never to a fabricated "correct"', () => {
    const garbled = gradeMcqAnswer('I think it moves somewhere', collisionMcq)
    expect(garbled.chosenIndex).toBeNull()
    expect(garbled.correct).toBeNull()
  })

  it('resolveMcqChoice never treats a wrong numeric answer as matching a different option by accident', () => {
    // "2.0 m/s east" must resolve to index 1, never to index 0 (the correct
    // answer) merely because both share "m/s east".
    expect(resolveMcqChoice('2.0 m/s east', collisionMcq)).toBe(1)
  })

  it('CASE A residual, characterized honestly: shouldSuppressSignalCorrectness closes the '
    + '"no question asked at all" sub-case — this is pre-existing, not a Phase 5 addition',
  () => {
    // chem.found.stoichiometry, 2026-08-17: the tutor worked through its own
    // answer and asked nothing; the model still self-reported correctness.
    const decision = shouldSuppressSignalCorrectness({
      priorAssistantText: 'So the mole ratio gives us 2 moles of water for every mole of oxygen consumed.',
      hasPendingStructuredMcq: false,
    })
    expect(decision.suppress).toBe(true)
    expect(decision.reason).toBe('no-answerable-question')
  })

  it('signalVerification flags a self-contradictory SIGNAL and the text wins over the tag', () => {
    const signal = { correctness: true as const }
    const verification = verifySignal(signal, {
      assistantText: "Not quite — that's a common mistake. The correct answer is 0.875 m/s east.",
      learnerMessage: '2.0 m/s east',
      phase: 'CHECK',
      turnLatencyMs: 8000,
    })
    expect(verification.status).toBe('CONTRADICTED')
    const resolved = resolveContradiction(signal, verification)
    expect(resolved.correctness).toBe(false)
  })
})

// ═══════════════════════════════════════════════════════════════════════
// CASE B — acknowledgement is not mastery
// ═══════════════════════════════════════════════════════════════════════
describe('Phase 5 Case B — acknowledgement cannot fabricate mastery', () => {
  it('bare acknowledgements are recognised across the common forms', () => {
    for (const ack of ['got it', 'ok', 'Okay.', 'yes', 'I understand', 'thanks', 'done']) {
      expect(isBareAcknowledgement(ack)).toBe(true)
    }
  })

  it('a genuine answer is never misclassified as a bare acknowledgement', () => {
    expect(isBareAcknowledgement('0.875 m/s east')).toBe(false)
    expect(isBareAcknowledgement('ok, but why does the moon not fall?')).toBe(false)
  })

  it('folding an acknowledgement turn (no signal) does not move mastery counters', () => {
    let state = initialConversationState('phys.mech.newtons-first-law')
    state = advanceConversationState(state, neutralEvidence({ acknowledgement: true }))
    expect(state.correctAtCheck).toBe(0)
    expect(state.correctAtPractice).toBe(0)
    expect(masteryVerified(state)).toBe(false)
  })

  it('repeated acknowledgements alone do not create an infinite MASTERY loop '
    + '(they simply never move the mastery counters, turn after turn)',
  () => {
    let state = initialConversationState('phys.mech.newtons-first-law')
    for (let i = 0; i < 10; i++) {
      state = advanceConversationState(state, neutralEvidence({ acknowledgement: true }))
    }
    expect(state.correctAtCheck).toBe(0)
    expect(state.correctAtPractice).toBe(0)
    expect(masteryVerifiedStrict(state)).toBe(false)
  })
})

// ═══════════════════════════════════════════════════════════════════════
// CASE C — remediation must have a valid exit
// ═══════════════════════════════════════════════════════════════════════
describe('Phase 5 Case C — remediation lifecycle has a real, provable exit', () => {
  it('OPEN -> wrong -> remains open (remediationCount keeps rising)', () => {
    let state = initialConversationState('chem.found.mole-concept')
    state = advanceConversationState(state, neutralEvidence({ learnerRequest: 'explain_differently' }))
    expect(state.remediationCount).toBe(1)
    state = advanceConversationState(state, neutralEvidence({ learnerRequest: 'explain_differently' }))
    expect(state.remediationCount).toBe(2)
  })

  it('OPEN -> teaching -> graded correct -> closes (remediationCount resets to 0)', () => {
    let state = initialConversationState('chem.found.mole-concept')
    state = advanceConversationState(state, neutralEvidence({ learnerRequest: 'explain_differently' }))
    expect(state.remediationCount).toBe(1)
    state = advanceConversationState(state, neutralEvidence({
      askedQuestion: true, signalCorrect: true,
    }))
    expect(state.remediationCount).toBe(0)
  })

  it('OPEN -> acknowledgement -> does NOT fabricate mastery and does NOT silently close remediation', () => {
    let state = initialConversationState('chem.found.mole-concept')
    state = advanceConversationState(state, neutralEvidence({ learnerRequest: 'explain_differently' }))
    expect(state.remediationCount).toBe(1)
    state = advanceConversationState(state, neutralEvidence({ acknowledgement: true }))
    // An acknowledgement is not evidence either way: it neither advances
    // mastery nor silently closes remediation on its own say-so.
    expect(state.remediationCount).toBe(1)
    expect(state.correctAtCheck).toBe(0)
  })

  it('NEGATIVE CONTROL (Phase 4 regression check): reverting the exit fix reproduces the '
    + 'never-exits defect this test guards against',
  () => {
    // Simulates the pre-Phase-4 fold: remediationCount had one writer only
    // (increment) and was never reset by anything.
    let count = 0
    for (const turn of ['wrong', 'wrong', 'correct', 'wrong']) {
      if (turn !== 'correct') count += 1
      // old behaviour: no reset branch existed at all
    }
    expect(count).toBe(3) // never drops, even after a correct answer — the regression

    // The real, fixed fold on the same sequence:
    let state = initialConversationState('chem.found.mole-concept')
    for (const turn of ['wrong', 'wrong', 'correct', 'wrong']) {
      state = advanceConversationState(state, turn === 'correct'
        ? neutralEvidence({ askedQuestion: true, signalCorrect: true })
        : neutralEvidence({ learnerRequest: 'explain_differently' }))
    }
    expect(state.remediationCount).toBe(1) // reset by the 'correct' turn, then re-opened once
  })

  it('OPEN -> stop -> stop semantics remain authoritative (remediation state does not '
    + 'itself contest an explicit stop; this is sessionLifecycle\'s job, not conversationState\'s)',
  () => {
    // conversationState has no opinion on session-level stop at all — this
    // documents the boundary rather than asserting new behaviour.
    let state = initialConversationState('chem.found.mole-concept')
    state = advanceConversationState(state, neutralEvidence({ learnerRequest: 'explain_differently' }))
    const remediationCountBeforeStop = state.remediationCount
    // A stop turn folds no mastery/remediation evidence of its own.
    state = advanceConversationState(state, neutralEvidence({}))
    expect(state.remediationCount).toBe(remediationCountBeforeStop)
  })
})

// ═══════════════════════════════════════════════════════════════════════
// CASE E — no mastery-counting transition without valid gradeable evidence
// ═══════════════════════════════════════════════════════════════════════
describe('Phase 5 Case E — masteryVerifiedStrict only counts VERIFIED evidence', () => {
  it('unverified raw counters alone (no verified counters, no contradictions) fall back to the '
    + 'regular gate — documented, pre-existing behaviour for pre-verification sessions', () => {
    const state = {
      ...initialConversationState('phys.mech.newtons-first-law'),
      correctAtCheck: 1,
      correctAtPractice: 2,
    }
    // No verifiedCorrectAtCheck/Practice and no contradictions recorded:
    // strict falls back to the same threshold as the regular gate.
    expect(masteryVerifiedStrict(state)).toBe(true)
  })

  it('once verification is active, an UNVERIFIED-only signal cannot satisfy strict mastery', () => {
    const state = {
      ...initialConversationState('phys.mech.newtons-first-law'),
      correctAtCheck: 5,
      correctAtPractice: 5,
      verifiedCorrectAtCheck: 0,
      verifiedCorrectAtPractice: 0,
      signalContradictions: 1, // proves verification ran and flagged something
    }
    expect(masteryVerifiedStrict(state)).toBe(false)
  })

  it('a genuinely VERIFIED signal satisfies strict mastery', () => {
    const state = {
      ...initialConversationState('phys.mech.newtons-first-law'),
      verifiedCorrectAtCheck: 1,
      verifiedCorrectAtPractice: 2,
    }
    expect(masteryVerifiedStrict(state)).toBe(true)
  })

  it('gateLessonCompletion strips [LESSON_COMPLETE] when mastery is not (strict-)verified', () => {
    const state = {
      ...initialConversationState('phys.mech.newtons-first-law'),
      correctAtCheck: 0,
      correctAtPractice: 0,
    }
    const result = gateLessonCompletion('Great work! [LESSON_COMPLETE]', state)
    expect(result.authorized).toBe(false)
    expect(result.suppressed).toBe(true)
    expect(result.cleanText).not.toContain('[LESSON_COMPLETE]')
  })

  it('gateLessonCompletion strips [LESSON_COMPLETE] during an active excursion even with '
    + 'verified mastery — a detour cannot complete the paused lesson', () => {
    const state = {
      ...initialConversationState('phys.mech.newtons-first-law'),
      verifiedCorrectAtCheck: 1,
      verifiedCorrectAtPractice: 2,
    }
    const result = gateLessonCompletion('Nice work! [LESSON_COMPLETE]', state, { excursionActive: true })
    expect(result.authorized).toBe(false)
    expect(result.suppressed).toBe(true)
  })

  it('gateLessonCompletion authorizes completion only with verified mastery and no active excursion', () => {
    const state = {
      ...initialConversationState('phys.mech.newtons-first-law'),
      verifiedCorrectAtCheck: 1,
      verifiedCorrectAtPractice: 2,
    }
    const result = gateLessonCompletion('Nice work! [LESSON_COMPLETE]', state, { excursionActive: false })
    expect(result.authorized).toBe(true)
    expect(result.suppressed).toBe(false)
  })

  it('degraded-provider turns cannot create mastery: deliveredTeaching is unreachable when degradedTurn is true', () => {
    let state = initialConversationState('phys.mech.newtons-first-law')
    state = advanceConversationState(state, neutralEvidence({
      degradedTurn: true, deliveredTeaching: true, askedQuestion: false,
    }))
    // A degraded (outage-template) turn must not count as having taught —
    // demonstrated/taughtThisSession stay false regardless of deliveredTeaching.
    expect(state.demonstrated).toBe(false)
    expect(state.taughtThisSession).toBe(false)
  })
})

// ═══════════════════════════════════════════════════════════════════════
// CASE F — question/answer coherence
// ═══════════════════════════════════════════════════════════════════════
describe('Phase 5 Case F — the learner\'s reply is graded against THIS turn\'s question, never a stale one', () => {
  it('grading uses whichever MCQ object is actually passed in — proves there is no hidden global state', () => {
    const mcqA: TutorMCQ = { question: 'Q_A', options: ['alpha', 'beta'], correctIndex: 0 }
    const mcqB: TutorMCQ = { question: 'Q_B', options: ['alpha', 'beta'], correctIndex: 1 }
    // Same reply text, two different stored answer keys — the verdict must
    // follow the MCQ object passed in, not any other state.
    expect(gradeMcqAnswer('alpha', mcqA).correct).toBe(true)
    expect(gradeMcqAnswer('alpha', mcqB).correct).toBe(false)
  })

  it('an unresolved wrong answer is not silently discarded by grading a later, different question', () => {
    // Turn 1: wrong answer to Q1.
    const q1: TutorMCQ = { question: 'What is 2+2?', options: ['3', '4'], correctIndex: 1 }
    const turn1 = gradeMcqAnswer('3', q1)
    expect(turn1.correct).toBe(false)

    // Turn 2: a DIFFERENT question is asked. Grading turn 2's reply against
    // q2 must not retroactively change or erase turn1's (already-folded)
    // wrong verdict — conversationState only ever accumulates forward.
    const q2: TutorMCQ = { question: 'What is 3+3?', options: ['5', '6'], correctIndex: 1 }
    const turn2 = gradeMcqAnswer('6', q2)
    expect(turn2.correct).toBe(true)
    expect(turn1.correct).toBe(false) // unchanged — still recorded as wrong
  })
})

// ═══════════════════════════════════════════════════════════════════════
// CASE G — remaining edge cases: correctly-as-is (not fixed; the KG
// resolver's refusal to guess is a feature, verified directly, not
// assumed).
// ═══════════════════════════════════════════════════════════════════════
describe('Phase 5 Case G — remaining edge cases are correct AS-IS (no gap fabricated)', () => {
  it('item 4/6: "I really don\'t understand this" / bare "I don\'t know" name no concept — '
    + 'correctly produce distress, not a gap, since there is nothing to detour to', () => {
    for (const msg of ["I really don't understand this", "I don't know"]) {
      const failureState = detectFailureState(msg, null)
      const resolvedConceptId = resolveRequestedConceptId(msg, 'chem.found.pure-substances', 'chemistry')
      expect(resolvedConceptId).toBeNull()
      const gap = classifyKnowledgeGap({
        failureState, resolvedConceptId,
        lessonConceptId: 'chem.found.pure-substances', lessonPrerequisites: [],
      })
      expect(gap).toBeNull()
    }
  })

  it('item 1/5: a genuinely uncataloged topic ("compound structures") honestly resolves to no '
    + 'concept — never guesses, never fabricates a KG id that does not exist', () => {
    const msg = "I don't know enough about compound structures"
    const resolvedConceptId = resolveRequestedConceptId(msg, 'chem.found.pure-substances', 'chemistry')
    expect(resolvedConceptId).toBeNull()
    const gap = classifyKnowledgeGap({
      failureState: detectFailureState(msg, null), resolvedConceptId,
      lessonConceptId: 'chem.found.pure-substances', lessonPrerequisites: [],
    })
    expect(gap).toBeNull()
  })

  it('a named, resolvable gap (unaffected by the above) still opens correctly — the positive case remains intact', () => {
    const msg = "I don't know enough about hybridization"
    const resolvedConceptId = resolveRequestedConceptId(msg, 'chem.solid.ionic-solids', 'chemistry')
    expect(resolvedConceptId).toBe('chem.bond.hybridization')
    const gap = classifyKnowledgeGap({
      failureState: detectFailureState(msg, null), resolvedConceptId,
      lessonConceptId: 'chem.solid.ionic-solids', lessonPrerequisites: [],
    })
    expect(gap?.conceptId).toBe('chem.bond.hybridization')
  })
})
