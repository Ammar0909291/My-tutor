/**
 * Regression suite for the acknowledgement → phase-transition bug
 * (2026-07-30).
 *
 * Reported production transcript:
 *
 *   Tutor:  "Let's take one small step together. I'll walk through it with
 *            you and pause whenever it helps."
 *   User:   "Got it"
 *   Tutor:  (repeats the exact same message)
 *   User:   "go"
 *   Tutor:  (repeats the exact same message)
 *
 * Root cause, confirmed by tracing the real state machine: a delivery turn
 * (teach/show) asks nothing, so no SIGNAL is ever emitted, so signalCorrect
 * stayed null forever. advanceConversationState() advanced the phase ONLY on
 * signalCorrect === true, so the ladder had no reachable exit and the state
 * was a fixed point. Prompt assembly is a pure function of that state, so
 * every turn produced a byte-identical prompt and the model reproduced its
 * own previous message.
 *
 * Two independent defects fed it, and this file pins both:
 *   1. Detection — "go", "continue", "next", "ready", "let's go" matched NO
 *      detector in the codebase (not acknowledgement, autonomy, navigation,
 *      or recovery). They were structurally invisible.
 *   2. Transition — even the detected acknowledgements ("got it", "yes",
 *      "okay") reached no counter and no transition; the flag decorated the
 *      prompt and was then discarded.
 *
 * The fix must never buy mastery: an acknowledgement moves the delivery
 * phases only. The mastery-gate assertions below are the guard on that, and
 * are as important as the advancement assertions.
 */
import { describe, it, expect } from 'vitest'
import {
  initialConversationState,
  advanceConversationState,
  decideNextMoveDetailed,
  isLowSignalAcknowledgement,
  isDeliveryPhase,
  buildTurnDirective,
  detectAutonomyRequest,
  detectNavigationRequest,
  PHASE_ORDER,
  type ConversationState,
  type TeachingPhase,
} from '@/lib/teaching/conversationState'

/** The acknowledgements named in the bug report. */
const ACKNOWLEDGEMENTS = [
  'got it', 'go', 'continue', 'next', 'yes', 'okay', 'ready', "let's go",
]

/** A delivery turn: the tutor gave something and asked nothing. */
function deliveryTurn(state: ConversationState): ConversationState {
  return advanceConversationState(state, {
    askedQuestion: false, signalCorrect: null, recoveryFired: false,
  })
}

/** The learner acknowledges. Detection runs for real — the test never
 *  hand-sets the flag, so a detection regression fails these tests too. */
function acknowledgeWith(state: ConversationState, message: string): ConversationState {
  return advanceConversationState(state, {
    askedQuestion: false,
    signalCorrect: null,
    recoveryFired: false,
    acknowledgement: isLowSignalAcknowledgement(message),
  })
}

describe('acknowledgement detection', () => {
  it.each(ACKNOWLEDGEMENTS)('detects %j as an acknowledgement', (msg) => {
    expect(isLowSignalAcknowledgement(msg)).toBe(true)
  })

  // These were the invisible ones — no detector in the codebase matched them.
  it.each(['go', 'continue', 'next', 'ready', "let's go"])(
    '%j is matched by the acknowledgement detector, not autonomy or navigation',
    (msg) => {
      expect(isLowSignalAcknowledgement(msg)).toBe(true)
      // Must NOT be read as "finish this concept and move to the next one" —
      // that path appends [LESSON_COMPLETE] and would end the lesson outright.
      expect(detectAutonomyRequest(msg)).toBe(false)
      expect(detectNavigationRequest(msg)).toBe(false)
    },
  )

  // Guards against the token set swallowing real learner content.
  it.each([
    'no',                              // a real answer, not an acknowledgement
    'going', 'goes', 'nextjs',         // substrings must not match
    'the next step is 5',
    'ready the sample and record it',
    'continue the pattern to 20',
    'go back to fractions',            // navigation's job, not this detector's
    'x = 5', '9.8',
    "I don't know",
    'Got it, but what does the orbital mean exactly?',
  ])('does NOT treat %j as an acknowledgement', (msg) => {
    expect(isLowSignalAcknowledgement(msg)).toBe(false)
  })

  it('leaves "go back to fractions" to the navigation detector', () => {
    expect(detectNavigationRequest('go back to fractions')).toBe(true)
  })
})

describe('acknowledgement advances the lesson (transcripts A–E)', () => {
  it.each(ACKNOWLEDGEMENTS)(
    'after a delivery turn, %j advances the phase',
    (msg) => {
      const afterDelivery = deliveryTurn(initialConversationState('c1'))
      const afterAck = acknowledgeWith(afterDelivery, msg)

      expect(afterDelivery.phase).toBe('OBSERVE')
      expect(afterAck.phase).toBe('DEMONSTRATE')
    },
  )

  it('the reported loop cannot recur: repeated acknowledgements keep moving', () => {
    // The exact failure: two acknowledgements in a row producing no change.
    let s = deliveryTurn(initialConversationState('c1'))
    const seen: TeachingPhase[] = [s.phase]

    s = acknowledgeWith(s, 'Got it'); seen.push(s.phase)
    s = acknowledgeWith(s, 'go');     seen.push(s.phase)

    expect(seen).toEqual(['OBSERVE', 'DEMONSTRATE', 'GUIDE'])
    // Before the fix this was ['OBSERVE', 'OBSERVE', 'OBSERVE'].
    expect(new Set(seen).size).toBe(seen.length)
  })

  it('walks the delivery half and then stops at the mastery gate', () => {
    let s = initialConversationState('c1')
    const phases: TeachingPhase[] = []
    for (let i = 0; i < 6; i++) {
      s = acknowledgeWith(s, 'ok')
      phases.push(s.phase)
    }
    expect(phases).toEqual([
      'DEMONSTRATE', 'GUIDE', 'CHECK', 'CHECK', 'CHECK', 'CHECK',
    ])
  })
})

describe('acknowledgement can never buy mastery', () => {
  it.each(['CHECK', 'PRACTICE', 'TRANSFER'] as const)(
    '%s does not advance on an acknowledgement',
    (phase) => {
      const base: ConversationState = {
        ...initialConversationState('c1'), phase, demonstrated: true,
      }
      expect(acknowledgeWith(base, 'got it').phase).toBe(phase)
    },
  )

  it('leaves the mastery counters untouched', () => {
    const base: ConversationState = {
      ...initialConversationState('c1'), phase: 'CHECK', demonstrated: true,
    }
    const after = acknowledgeWith(base, 'yes')
    expect(after.correctAtCheck).toBe(0)
    expect(after.correctAtPractice).toBe(0)
    expect(after.verifiedCorrectAtCheck ?? 0).toBe(0)
  })

  it('isDeliveryPhase draws the line in exactly one place', () => {
    expect(PHASE_ORDER.filter(isDeliveryPhase))
      .toEqual(['OBSERVE', 'DEMONSTRATE', 'GUIDE'])
  })
})

describe('acknowledgement never overrides stronger evidence', () => {
  it('a failure still drops the phase even when the turn looks like an ack', () => {
    let s = deliveryTurn(initialConversationState('c1'))
    s = advanceConversationState(s, { askedQuestion: false, signalCorrect: null, recoveryFired: false, acknowledgement: true })
    expect(s.phase).toBe('DEMONSTRATE')

    const failed = advanceConversationState(s, {
      askedQuestion: true, signalCorrect: false, recoveryFired: false, acknowledgement: true,
    })
    expect(failed.phase).toBe('OBSERVE')
    expect(failed.consecutiveFailures).toBe(1)
  })

  it('a real correct signal drives the transition, not the acknowledgement', () => {
    const base: ConversationState = {
      ...initialConversationState('c1'), phase: 'CHECK', demonstrated: true,
    }
    const after = advanceConversationState(base, {
      askedQuestion: true, signalCorrect: true, recoveryFired: false, acknowledgement: true,
    })
    // Advanced because the answer was correct — and the counter moved, which
    // an acknowledgement alone can never do.
    expect(after.phase).toBe('PRACTICE')
    expect(after.correctAtCheck).toBe(1)
  })

  it('explain_differently still wins: an ack cannot cancel remediation', () => {
    let s = deliveryTurn(initialConversationState('c1'))
    s = acknowledgeWith(s, 'ok')   // OBSERVE -> DEMONSTRATE
    s = acknowledgeWith(s, 'ok')   // DEMONSTRATE -> GUIDE (demonstrated now true)
    expect(s.phase).toBe('GUIDE')
    const after = advanceConversationState(s, {
      askedQuestion: false, signalCorrect: null, recoveryFired: false,
      acknowledgement: true, learnerRequest: 'explain_differently',
    })
    // Remediation counted and the phase stepped DOWN — the acknowledgement
    // travelling alongside it bought nothing.
    expect(after.remediationCount).toBe(1)
    expect(after.consecutiveFailures).toBe(1)
    expect(after.phase).toBe('DEMONSTRATE')
  })

  it('recovery preempts the acknowledgement transition', () => {
    let s = deliveryTurn(initialConversationState('c1'))
    s = acknowledgeWith(s, 'ok')   // OBSERVE -> DEMONSTRATE
    s = acknowledgeWith(s, 'ok')   // DEMONSTRATE -> GUIDE (demonstrated now true)
    expect(s.phase).toBe('GUIDE')
    const after = advanceConversationState(s, {
      askedQuestion: false, signalCorrect: null, recoveryFired: true, acknowledgement: true,
    })
    // Never advances on a recovery turn; the existing phaseDown floor
    // (DEMONSTRATE once something has been shown) still governs where it lands.
    expect(after.consecutiveFailures).toBe(1)
    expect(after.phase).toBe('DEMONSTRATE')
  })
})

describe('the turn directive stops contradicting the phase frame', () => {
  function directiveFor(phase: TeachingPhase): string {
    return buildTurnDirective({
      state: { ...initialConversationState('c1'), phase },
      nextMove: 'teach',
      maxParagraphs: null,
      workedExampleFirst: false,
      visualType: null,
      firstLessonActive: false,
      lowSignalAcknowledgement: true,
    })
  }

  it.each(['OBSERVE', 'DEMONSTRATE', 'GUIDE'] as const)(
    '%s tells the model to deliver the next step, not to hold',
    (phase) => {
      const d = directiveFor(phase)
      expect(d).toContain('LEARNER ASKED TO PROCEED')
      // The contradiction that produced the loop: a phase frame saying "show
      // the idea working" alongside "do not explain further".
      expect(d).not.toContain('do not explain further')
      expect(d).toContain('Do NOT restate')
    },
  )

  it.each(['CHECK', 'PRACTICE', 'TRANSFER'] as const)(
    '%s keeps the mastery-gate wording intact',
    (phase) => {
      const d = directiveFor(phase)
      expect(d).toContain('LOW-SIGNAL RESPONSE DETECTED')
      expect(d).toContain('do not explain further')
      expect(d).not.toContain('LEARNER ASKED TO PROCEED')
    },
  )

  it('says nothing about acknowledgement when the turn was not one', () => {
    const d = buildTurnDirective({
      state: initialConversationState('c1'),
      nextMove: 'teach',
      maxParagraphs: null,
      workedExampleFirst: false,
      visualType: null,
      firstLessonActive: false,
      lowSignalAcknowledgement: false,
    })
    expect(d).not.toContain('LEARNER ASKED TO PROCEED')
    expect(d).not.toContain('LOW-SIGNAL RESPONSE DETECTED')
  })
})

describe('the move changes with the phase, so the prompt cannot repeat', () => {
  it('an acknowledgement changes the server-decided move', () => {
    const afterDelivery = deliveryTurn(initialConversationState('c1'))
    const ctx = { recoveryTurn: false, workedExampleFirst: false }
    const before = decideNextMoveDetailed(afterDelivery, ctx).move
    const after = decideNextMoveDetailed(acknowledgeWith(afterDelivery, 'go'), ctx).move

    expect(before).toBe('ask')     // OBSERVE — one observation question
    expect(after).toBe('show')     // DEMONSTRATE — show the thing
    expect(after).not.toBe(before)
  })

  it('backward compatible: evidence without the field behaves as before', () => {
    const afterDelivery = deliveryTurn(initialConversationState('c1'))
    const noField = advanceConversationState(afterDelivery, {
      askedQuestion: false, signalCorrect: null, recoveryFired: false,
    })
    // An omitted acknowledgement flag must not advance anything — every
    // pre-existing caller relies on this.
    expect(noField.phase).toBe('OBSERVE')
  })
})
