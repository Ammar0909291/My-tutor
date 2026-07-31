/**
 * Production Lesson Walkthrough — the student paths, as regression tests.
 *
 * Derived from an end-to-end behavioural audit in which ten student paths were
 * played turn by turn against the real runtime modules in route.ts's real
 * order. One genuine defect surfaced (below); these tests pin it and the
 * progression properties the other nine paths demonstrated.
 *
 * THE DEFECT, in the form the walkthrough found it (scenario 9, "leave and
 * resume"): a learner says "I don't know" ONCE. From that turn on, every
 * question is illegal for the whole diagnostic half of the ladder, because
 *
 *   QL-2 blocks ASK while consecutiveDontKnows >= 1
 *   consecutiveDontKnows is cleared ONLY by signalCorrect === true
 *   signalCorrect requires a question
 *   ...which QL-2 has just made illegal.
 *
 * Phase scoping was supposed to bound that — the learner leaves OBSERVE/
 * DEMONSTRATE/GUIDE eventually. But GUIDE's forward exits are a correct signal
 * (blocked) or a bare acknowledgement. A learner who answers substantively and
 * never acknowledges therefore had NO exit: they answer correctly twelve times
 * running while the phase stays GUIDE and correctAtCheck stays 0.
 *
 * Why the earlier exhaustive phase-trajectory audit did not catch it: that
 * model enumerated ALL evidence combinations, including acknowledgements, so
 * the GUIDE exit existed and no state was absorbing. The trap is conditional on
 * a learner BEHAVIOUR, not on a reachable state — only a walkthrough shows it.
 */
import { describe, it, expect } from 'vitest'
import {
  initialConversationState, advanceConversationState, decideNextMoveDetailed,
  repliesWithQuestion, isLowSignalAcknowledgement, type ConversationState,
} from '@/lib/teaching/conversationState'
import { questionLegality } from '@/lib/teaching/questionLegality'
import { detectFailureState, isDontKnowSignal } from '@/lib/teaching/recoveryGuard'
import { masteryVerified } from '@/lib/teaching/masteryGate'

/** One turn, wired the way route.ts wires one: both halves of the recovery
 *  fact from one detector call, and no SIGNAL on a turn that asked nothing. */
function turn(s: ConversationState, say: string, answerIsCorrect: boolean | null) {
  const recoveryKey = detectFailureState(say, null)
  const d = decideNextMoveDetailed(s, {
    recoveryTurn: recoveryKey !== null, workedExampleFirst: false,
  })
  const tutor = d.move === 'ask' ? 'What do you expect will happen?' : 'Here is the next piece.'
  const askedQuestion = repliesWithQuestion(tutor)
  const signalCorrect = askedQuestion ? answerIsCorrect : null
  const next = advanceConversationState(s, {
    askedQuestion, signalCorrect,
    recoveryFired: recoveryKey !== null,
    dontKnowSignal: isDontKnowSignal(recoveryKey),
    acknowledgement: isLowSignalAcknowledgement(say),
  })
  return { next, move: d.move, blocked: d.blockedReason }
}

/** Walk to GUIDE with one "I don't know" behind us — the trap's entry state. */
function guideAfterOneDontKnow(): ConversationState {
  let s = initialConversationState('c')
  s = turn(s, 'hi', null).next
  s = turn(s, 'it stops', true).next
  s = turn(s, 'friction', true).next
  s = turn(s, "I don't know", null).next
  expect(s.consecutiveDontKnows).toBeGreaterThanOrEqual(1)
  return s
}

describe('walkthrough — a single "I don\'t know" must not freeze the lesson', () => {
  it('the substantive answerer still reaches a question, and progresses', () => {
    let s = guideAfterOneDontKnow()
    const phases: string[] = [s.phase]
    for (let i = 0; i < 12; i++) {
      s = turn(s, 'friction acts against the motion', true).next
      phases.push(s.phase)
    }
    // Before the fix: GUIDE for all twelve turns, correctAtCheck 0.
    expect(s.correctAtCheck).toBeGreaterThan(0)
    expect(new Set(phases).size).toBeGreaterThan(1)
    expect(phases[phases.length - 1]).not.toBe('GUIDE')
  })

  it('QL-2 still blocks while nothing has been given since the last question', () => {
    // The rule is not weakened, only bounded. Constructed directly, because in
    // a real walk the non-answer turn IS the give (recovery preempts to
    // 'teach'), so teachSegmentsSinceQuestion is already nonzero by the next
    // turn — which is exactly why the block must not outlive it.
    const base = initialConversationState('c')
    const nothingGivenSince: ConversationState = {
      ...base, phase: 'GUIDE', demonstrated: true, taughtThisSession: true,
      consecutiveDontKnows: 1, teachSegmentsSinceQuestion: 0,
    }
    const blocked = questionLegality(nothingGivenSince)
    expect(blocked.askLegal).toBe(false)
    expect(blocked.reason).toBe('QL2_DIAGNOSTIC_CONCLUDED')

    // One give later, the premise has expired and asking is legal again.
    const giveLanded: ConversationState = { ...nothingGivenSince, teachSegmentsSinceQuestion: 1 }
    expect(questionLegality(giveLanded).askLegal).toBe(true)
  })

  it('the non-answer turn itself is answered with teaching, never a question', () => {
    const s = guideAfterOneDontKnow()
    // Recovery preemption owns this, ahead of legality — so it holds no matter
    // how QL-2 is scoped.
    expect(turn(s, "I don't know", null).move).not.toBe('ask')
    expect(turn(s, 'no idea', null).move).not.toBe('ask')
  })

  it('does not depend on the learner acknowledging — the exit that used to be the only one', () => {
    let s = guideAfterOneDontKnow()
    for (let i = 0; i < 8; i++) {
      const say = 'the block keeps moving because nothing stops it'
      expect(isLowSignalAcknowledgement(say)).toBe(false)   // never an ack
      s = turn(s, say, true).next
    }
    expect(s.phase).not.toBe('GUIDE')
    expect(s.correctAtCheck).toBeGreaterThan(0)
  })

  it('the Henry\'s Law protection is intact — a non-answer is never met with a question', () => {
    // Every one of these fires recovery, and recovery preempts legality
    // entirely (decideNextMoveDetailed's first line), so the scoping above
    // cannot reach them.
    let s = initialConversationState('chem.sol.solubility')
    for (const said of ['No idea', "I don't know", '?', ':(', 'no clue', 'idk']) {
      const r = turn(s, said, null)
      expect(r.move, `"${said}" must not be answered with a question`).not.toBe('ask')
      s = r.next
    }
  })
})

describe('walkthrough — the paths that must still hold', () => {
  it('fast learner: correct every time, climbs to mastery', () => {
    let s = initialConversationState('c')
    for (let i = 0; i < 12; i++) s = turn(s, 'the block keeps moving', true).next
    expect(s.phase).toBe('TRANSFER')
    expect(masteryVerified(s)).toBe(true)
  })

  it('acknowledgement-only learner: delivery advances, mastery does not', () => {
    let s = initialConversationState('c')
    for (const say of ['hi', 'Got it', 'go', 'continue', 'next', 'yes', 'ok', 'ready']) {
      s = turn(s, say, null).next
    }
    expect(s.phase).toBe('CHECK')          // delivery phases cleared
    expect(s.correctAtCheck).toBe(0)       // no mastery bought
    expect(s.correctAtPractice).toBe(0)
    expect(masteryVerified(s)).toBe(false)
  })

  it('repeated "I don\'t know": never questioned, and never frozen', () => {
    let s = initialConversationState('c')
    const moves: string[] = []
    for (const say of ['hi', "I don't know", "I don't know", 'idk', 'no idea', "I don't know"]) {
      const r = turn(s, say, null)
      moves.push(r.move)
      s = r.next
    }
    expect(moves.filter((m) => m === 'ask')).toHaveLength(0)
    // The diagnostic concluding moves the machine rather than merely the move.
    expect(s.phase).not.toBe('OBSERVE')
  })

  it('repeated wrong answers: the ladder does not advance on them', () => {
    let s = initialConversationState('c')
    s = turn(s, 'hi', null).next
    const before = s.correctAtCheck
    for (let i = 0; i < 5; i++) s = turn(s, 'because things naturally stop', false).next
    expect(s.correctAtCheck).toBe(before)
    expect(masteryVerified(s)).toBe(false)
  })
})
