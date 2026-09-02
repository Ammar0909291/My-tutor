/**
 * QUESTION-ONLY TURN — the last DoD #13 detection-only class, made enforced.
 *
 * A learner turn that is a QUESTION (not an answer) must not become gradeable
 * evidence, grant mastery, or authorize completion — while its question stays
 * available for continuation. The never-fabricate invariant is preserved: a
 * question is never rewritten into an answer.
 *
 * ── OWNERSHIP (proven, not asserted) ────────────────────────────────────────
 * - "did the learner provide gradeable answer evidence?" — the signal-
 *   finalization seam in route.ts, a pair of deterministic non-answer filters
 *   feeding the ONE evidence owner (the fold): the acknowledgement guard, and
 *   its sibling here, the learner-question guard (reuses `detectLearnerQuestion`;
 *   drops only `correctness`, never fabricates a wrong answer).
 * - "may the lesson close?" — `gateLessonCompletion` -> `conceptMasteryVerdict`
 *   -> `masteryVerifiedStrict`, which reads only the VERIFIED counters. A
 *   question banks no server-graded credit (slice 10), so it cannot move mastery
 *   and cannot newly authorize completion.
 *
 * These are driven through the REAL modules below, on reachable states.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  initialConversationState, advanceConversationState, detectLearnerQuestion,
  type ConversationState, type TurnEvidence,
} from '@/lib/teaching/conversationState'
import { gateLessonCompletion, masteryVerifiedStrict } from '@/lib/teaching/masteryGate'

const ev = (o: Partial<TurnEvidence>) => o as TurnEvidence

/**
 * The route's signal-finalization for correctness, mirrored exactly so the test
 * exercises the REAL `detectLearnerQuestion` and the REAL rule. A resolved
 * server grade (`mcqGradeResolved`) is authoritative and untouched; otherwise a
 * learner question drops the model's correctness claim.
 */
function correctnessAfterRouteGuard(opts: {
  modelCorrectness: boolean | undefined
  learnerMessage: string
  mcqGradeResolved: boolean
}): boolean | undefined {
  if (
    opts.modelCorrectness !== undefined
    && !opts.mcqGradeResolved
    && detectLearnerQuestion(opts.learnerMessage)
  ) return undefined
  return opts.modelCorrectness
}

function atCheck(over: Partial<ConversationState> = {}): ConversationState {
  return { ...initialConversationState('phys.mech.friction'), phase: 'CHECK', demonstrated: true, taughtThisSession: true, ...over }
}

const LEARNER_QUESTIONS = [
  'why does friction depend on the normal force?',
  'what is the coefficient of friction here?',
  'how do I know which force to use?',
  'what if the surface is frictionless?',
]

describe('detectLearnerQuestion recognises a question, not an answer', () => {
  it.each(LEARNER_QUESTIONS)('classifies %j as a learner question', (q) => {
    expect(detectLearnerQuestion(q)).toBe(true)
  })
  it.each(['5 N', 'static friction', 'the box does not move', 'I don\'t know'])(
    'does NOT classify the answer/non-question %j as a question', (a) => {
      expect(detectLearnerQuestion(a)).toBe(false)
    },
  )
})

describe('A. learner asks a question instead of answering -> lesson must NOT close', () => {
  it('a fabricated correctness on a question turn is dropped, banks no evidence, and holds the ladder', () => {
    // The tutor asked a gradeable question; the model self-reports the learner
    // correct even though the learner only asked a question (fabrication).
    const c = correctnessAfterRouteGuard({
      modelCorrectness: true,
      learnerMessage: 'why does friction depend on the normal force?',
      mcqGradeResolved: false,
    })
    expect(c).toBeUndefined()                       // correctness suppressed

    const before = atCheck()
    const after = advanceConversationState(before, ev({
      askedQuestion: false, signalCorrect: c ?? null, recoveryFired: false,
      serverGraded: false,
    }))
    expect(after.correctAtCheck).toBe(0)            // no plain credit
    expect(after.verifiedCorrectAtCheck).toBe(0)    // no verified credit
    expect(after.phase).toBe('CHECK')               // held, not advanced
  })

  it('gateLessonCompletion refuses [LESSON_COMPLETE] on that state (no verified mastery)', () => {
    const after = atCheck({ correctAtCheck: 0, verifiedCorrectAtCheck: 0, sawModernGrading: true })
    const gate = gateLessonCompletion('Nice work! [LESSON_COMPLETE]', after)
    expect(gate.authorized).toBe(false)
    expect(gate.suppressed).toBe(true)
    expect(gate.cleanText).not.toContain('LESSON_COMPLETE')
  })
})

describe('B. question first, answer later -> the later answer grades normally', () => {
  it('the question turn banks nothing; the next turn (a server-graded answer) verifies', () => {
    let s = atCheck()
    // Turn 1: a question -> suppressed -> no credit.
    const c1 = correctnessAfterRouteGuard({
      modelCorrectness: true, learnerMessage: 'what is the coefficient of friction here?', mcqGradeResolved: false,
    })
    s = advanceConversationState(s, ev({ askedQuestion: false, signalCorrect: c1 ?? null, recoveryFired: false, serverGraded: false }))
    expect(s.verifiedCorrectAtCheck).toBe(0)
    expect(s.phase).toBe('CHECK')

    // Turn 2: the learner actually answers (taps an authored probe -> a server
    // grade resolves). Not a question turn; correctness flows and verifies.
    const c2 = correctnessAfterRouteGuard({
      modelCorrectness: true, learnerMessage: '', mcqGradeResolved: true,
    })
    expect(c2).toBe(true)
    s = advanceConversationState(s, ev({ askedQuestion: false, signalCorrect: c2 ?? null, recoveryFired: false, serverGraded: true }))
    expect(s.verifiedCorrectAtCheck).toBe(1)
    expect(s.phase).toBe('PRACTICE')
  })
})

describe('C. "I don\'t know" -> no mastery credit, no completion', () => {
  it('a dont-know turn moves no counter and cannot authorize completion', () => {
    const s = advanceConversationState(atCheck(), ev({
      askedQuestion: false, signalCorrect: null, recoveryFired: true, dontKnowSignal: true, serverGraded: false,
    }))
    expect(s.correctAtCheck).toBe(0)
    expect(s.verifiedCorrectAtCheck).toBe(0)
    expect(masteryVerifiedStrict(s)).toBe(false)
    expect(gateLessonCompletion('[LESSON_COMPLETE]', { ...s, sawModernGrading: true }).authorized).toBe(false)
  })
})

describe('D. a genuine answer is unchanged -> grading/mastery still works', () => {
  it('a server-graded correct answer reaches verified mastery and authorizes completion', () => {
    let s = atCheck()
    s = advanceConversationState(s, ev({ askedQuestion: false, signalCorrect: true, recoveryFired: false, signalVerificationStatus: 'CLEAN', serverGraded: true })) // CHECK verified -> PRACTICE
    s = advanceConversationState(s, ev({ askedQuestion: false, signalCorrect: true, recoveryFired: false, signalVerificationStatus: 'CLEAN', serverGraded: true })) // PRACTICE verified 1
    s = advanceConversationState(s, ev({ askedQuestion: false, signalCorrect: true, recoveryFired: false, signalVerificationStatus: 'CLEAN', serverGraded: true })) // PRACTICE verified 2 -> TRANSFER
    expect(masteryVerifiedStrict(s)).toBe(true)
    expect(gateLessonCompletion('Well done! [LESSON_COMPLETE]', s).authorized).toBe(true)
  })
})

describe('E. a question-only turn is never converted into an invented answer', () => {
  it('suppression yields undefined correctness — never false, never a fabricated wrong answer', () => {
    const c = correctnessAfterRouteGuard({
      modelCorrectness: true, learnerMessage: 'how do I know which force to use?', mcqGradeResolved: false,
    })
    expect(c).toBeUndefined()
    expect(c).not.toBe(false)
    expect(c).not.toBe(true)
  })
})

describe('F. a clarification question is preserved as teaching, not assessment', () => {
  it('only correctness is dropped — the model\'s confusion read survives to route teaching', () => {
    // The route drops correctness but keeps confidence/confusion. Modelled here:
    // a suppressed signal still carries confusion, which drives the tutor to
    // answer the clarification rather than grade it.
    const signal = { correctness: true as boolean | undefined, confusion: true, confidence: 'low' as const }
    const suppressed = detectLearnerQuestion('what if the surface is frictionless?')
      ? { ...signal, correctness: undefined }
      : signal
    expect(suppressed.correctness).toBeUndefined()
    expect(suppressed.confusion).toBe(true)
    expect(suppressed.confidence).toBe('low')
  })
})

describe('G. replay/legacy compatibility — the change is pre-fold', () => {
  it('the fold still treats a suppressed (null-correctness) question turn as a non-answer', () => {
    // A replayed transcript supplies signalCorrect directly; the suppression
    // lives at the LIVE signal-finalization seam, not in the fold, so the fold
    // evidence contract is unchanged. A null-correctness turn (what a suppressed
    // turn becomes) folds as a non-answer: no counters, no advance.
    const s = advanceConversationState(atCheck(), ev({
      askedQuestion: false, signalCorrect: null, recoveryFired: false,
    }))
    expect(s.correctAtCheck).toBe(0)
    expect(s.verifiedCorrectAtCheck).toBe(0)
    expect(s.phase).toBe('CHECK')
  })
})

describe('the route wires the learner-question guard at the signal-finalization seam', () => {
  const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

  it('imports detectLearnerQuestion alongside the acknowledgement predicate and gates on an unresolved grade', () => {
    expect(ROUTE).toContain('isLowSignalAcknowledgement, detectLearnerQuestion')
    expect(ROUTE).toMatch(/mcqGradeHoisted === null\s*\n?\s*&& detectLearnerQuestion\(message\)/)
    // Drops ONLY correctness — never fabricates.
    expect(ROUTE).toContain("teachingSignal = { ...teachingSignal, correctness: undefined }")
    expect(ROUTE).toContain("[learner-asked-question]")
  })
})
