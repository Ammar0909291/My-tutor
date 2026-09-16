/**
 * LEARNER-MOVE AGREEMENT ASSERTION — Batch 2, proved against the real
 * detectors and the real `classifyConversation`, not a re-implementation of
 * either.
 *
 * Design: `docs/architecture/LEARNER_MOVE_INTERPRETER_DESIGN.md` §8 Batch 2,
 * §4.4 (the exact 9-phrasing table this file reproduces).
 *
 * WHAT IS NOT MOCKED: `readTurnIntent` (which calls the real
 * `detectFailureState`) and the real `classifyConversation` — a measurement
 * built on a re-implementation of either would measure the re-implementation,
 * the same discipline `excursionLifecycleTelemetry.test.ts` states for
 * `decideExcursion`.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { readTurnIntent } from '@/lib/teaching/turnIntent'
import { readLearnerMove } from '@/lib/teaching/learnerMove'
import { classifyConversation, type ConversationDecisionType } from '@/lib/teaching/conversationDecision'
import {
  detectLearnerMoveAgreementViolation, buildLearnerMoveAgreementEvent, recordLearnerMoveAgreementEvent,
  LEARNER_MOVE_AGREEMENT_EVENT_PREFIX,
} from '@/lib/teaching/learnerMoveAgreement'
import type { LearnerMoveReading } from '@/lib/teaching/learnerMove'

const SESSION = 'cmtky68dm0009l204a7c210s7'
const T0 = Date.parse('2026-09-15T03:10:00.000Z')
const NO_EXTRA = { isBareAcknowledgement: false, isLowSignalAcknowledgement: false }

/**
 * One turn, exactly as route.ts's own value chain runs it: `readTurnIntent`
 * (which calls the real `detectFailureState`) -> `readLearnerMove` (Batch 0)
 * -> the real `classifyConversation`, fed `recoveryKey: turnIntent.failureState`
 * the same way route.ts's `recoveryKeyHoisted = turnIntent.failureState` does.
 */
function turn(message: string): { reading: LearnerMoveReading; decisionType: ConversationDecisionType } {
  const intent = readTurnIntent(message, null)
  const reading = readLearnerMove(intent, NO_EXTRA)
  const decision = classifyConversation(message, {
    recoveryKey: intent.failureState,
    studentIntent: 'unknown',
    lastAssistantAskedQuestion: false,
    lastSignalCorrectness: null,
    hedged: false,
    helpRequestKind: intent.learnerRequest,
  })
  return { reading, decisionType: decision.type }
}

describe('§4.4: 8 of the original 9 non-standard-English phrasings — GAP CLOSED, reading now agrees', () => {
  // SUPERSEDED — design doc §4.4 fix (recoveryGuardDontUnderstandGap.test.ts):
  // recoveryGuard.ts's `dont_understand` patterns were widened to match
  // conversationDecision.ts's own CONFUSION_RE (the fix this describe block's
  // ORIGINAL title said was deferred — "does not fix the live cross-module
  // finding"). 8 of the original 9 phrasings are fixed by the 3 widened
  // patterns; the 9th ("i am very weak in this") belongs to a DIFFERENT
  // CONFUSION_RE fragment (self-reported weakness) deliberately out of scope
  // for that fix, and remains its own genuine, reported gap — see the second
  // describe block below. Original assertion shape, preserved for history:
  //
  //   for (const message of NON_STANDARD) {  // all 9, including "i am very weak in this"
  //     it(`"${message}" — detectFailureState misses it, classifyConversation catches it: flagged`, () => {
  //       const { reading, decisionType } = turn(message)
  //       expect(reading.has('DISTRESS')).toBe(false)
  //       expect(decisionType).toBe('CONFUSION')
  //       expect(detectLearnerMoveAgreementViolation({ reading, conversationDecisionType: decisionType }))
  //         .toBe('confusion_without_distress')
  //     })
  //   }
  const NOW_AGREE = [
    'sir i not understand this',
    'i not understand',
    'i cannot understand',
    'i can not understand',
    "i couldn't understand",
    'i am not getting it',
    "i'm not getting it",
    'not able to understand',
  ]

  for (const message of NOW_AGREE) {
    it(`"${message}" — both layers now agree (RECOVERY), no violation`, () => {
      const { reading, decisionType } = turn(message)
      expect(reading.has('DISTRESS')).toBe(true)
      expect(decisionType).toBe('RECOVERY')
      expect(detectLearnerMoveAgreementViolation({ reading, conversationDecisionType: decisionType })).toBeNull()
    })
  }

  it('control: "i don\'t understand" — both layers agree (RECOVERY), no violation', () => {
    const { reading, decisionType } = turn("i don't understand")
    expect(reading.has('DISTRESS')).toBe(true)
    expect(decisionType).toBe('RECOVERY')
    expect(detectLearnerMoveAgreementViolation({ reading, conversationDecisionType: decisionType })).toBeNull()
  })

  it('control: "I am lost" — both layers agree (RECOVERY), no violation', () => {
    const { reading, decisionType } = turn('I am lost')
    expect(reading.has('DISTRESS')).toBe(true)
    expect(decisionType).toBe('RECOVERY')
    expect(detectLearnerMoveAgreementViolation({ reading, conversationDecisionType: decisionType })).toBeNull()
  })
})

describe('§4.4: the 9th phrasing — a DIFFERENT, DELIBERATELY UNFIXED residual gap', () => {
  it('"i am very weak in this" — detectFailureState still misses it, classifyConversation still catches it: still flagged', () => {
    // CONFUSION_RE's "weak in this" fragment (conversationDecision.ts ~L57)
    // is a separate family (self-reported weakness) from the three forms
    // the §4.4 fix closed (bare negated understand / can't-cannot-couldn't
    // understand / not getting it) — explicitly out of scope for that fix.
    // The gap is real and reported, not silently patched.
    const { reading, decisionType } = turn('i am very weak in this')
    expect(reading.has('DISTRESS')).toBe(false)
    expect(decisionType).toBe('CONFUSION')
    expect(detectLearnerMoveAgreementViolation({ reading, conversationDecisionType: decisionType }))
      .toBe('confusion_without_distress')
  })
})

describe('ordinary agreement: no violation on an unremarkable turn', () => {
  it('a plain teaching-answer message: no DISTRESS, no CONFUSION, no violation', () => {
    const { reading, decisionType } = turn('the anode')
    expect(reading.has('DISTRESS')).toBe(false)
    expect(decisionType).not.toBe('CONFUSION')
    expect(detectLearnerMoveAgreementViolation({ reading, conversationDecisionType: decisionType })).toBeNull()
  })
})

describe('the reverse (sanity) check — structurally locked, exercised directly on the pure function', () => {
  // recoveryKeyHoisted = turnIntent.failureState (route.ts), and DISTRESS is
  // sourced from the identical field, so these two can never genuinely
  // disagree through the real code path — this is why `turn()` above cannot
  // produce this case. Exercised directly against the pure function instead,
  // with a synthetic reading, to confirm the LOGIC is correct even though
  // production traffic is not expected to ever trip it (module header).
  it('DISTRESS true but the decision is not RECOVERY: flagged as distress_without_recovery', () => {
    const syntheticReading: LearnerMoveReading = {
      message: 'x',
      signals: [{ kind: 'DISTRESS', source: 'recoveryGuard', confidence: 0.9, detail: 'confused' }],
      has: (k) => k === 'DISTRESS',
      uninterpretable: false,
      conflicts: [],
      ambiguous: false,
      stage: 'message-only',
    }
    expect(
      detectLearnerMoveAgreementViolation({ reading: syntheticReading, conversationDecisionType: 'NEUTRAL' }),
    ).toBe('distress_without_recovery')
  })

  it('DISTRESS true and the decision IS RECOVERY: no violation', () => {
    const syntheticReading: LearnerMoveReading = {
      message: 'x',
      signals: [{ kind: 'DISTRESS', source: 'recoveryGuard', confidence: 0.9, detail: 'confused' }],
      has: (k) => k === 'DISTRESS',
      uninterpretable: false,
      conflicts: [],
      ambiguous: false,
      stage: 'message-only',
    }
    expect(
      detectLearnerMoveAgreementViolation({ reading: syntheticReading, conversationDecisionType: 'RECOVERY' }),
    ).toBeNull()
  })
})

describe('no learner text and no signal detail reach the event', () => {
  const SECRET = 'my name is Ammar and my email is learner@example.com'

  it('a violation event never carries the message, even when the message caused it', () => {
    // SUPERSEDED — design doc §4.4 fix: "sir i not understand this" no
    // longer produces a violation (the gap it exercised is closed — see
    // recoveryGuardDontUnderstandGap.test.ts). Switched to "i am very weak
    // in this", the one phrasing from the original 9 that remains a
    // genuine, deliberately-unfixed gap (a different CONFUSION_RE family —
    // self-reported weakness — out of scope for that fix), so this test
    // still exercises a REAL violation rather than a null one. Original
    // assertion, preserved for history:
    //
    //   const { reading, decisionType } = turn(`sir i not understand this, ${SECRET}`)
    const { reading, decisionType } = turn(`i am very weak in this, ${SECRET}`)
    const violation = detectLearnerMoveAgreementViolation({ reading, conversationDecisionType: decisionType })
    expect(violation).toBe('confusion_without_distress')
    const event = buildLearnerMoveAgreementEvent({
      reading, conversationDecisionType: decisionType, kind: violation!,
      sessionId: SESSION, subject: 'physics', lessonConceptId: null, turnReceivedAt: T0,
    })
    const serialised = JSON.stringify(event)
    expect(serialised).not.toContain('Ammar')
    expect(serialised).not.toContain('@example.com')
  })

  it('the event carries no userId, email, message or detail field at all', () => {
    // SUPERSEDED — design doc §4.4 fix: "sir i not understand this" no
    // longer produces a violation (fixed — see
    // recoveryGuardDontUnderstandGap.test.ts); switched to "i am very weak
    // in this", still a genuine violation, so `violation` below is a real
    // non-null kind rather than a `null` forced through the `!` assertion.
    // Original message, preserved for history: 'sir i not understand this'
    const { reading, decisionType } = turn('i am very weak in this')
    const violation = detectLearnerMoveAgreementViolation({ reading, conversationDecisionType: decisionType })!
    const event = buildLearnerMoveAgreementEvent({
      reading, conversationDecisionType: decisionType, kind: violation,
      sessionId: SESSION, subject: 'physics', lessonConceptId: null, turnReceivedAt: T0,
    })
    const keys = Object.keys(event)
    expect(keys).not.toContain('userId')
    expect(keys).not.toContain('email')
    expect(keys).not.toContain('message')
    expect(keys).not.toContain('text')
    expect(keys).not.toContain('detail')
    expect(JSON.stringify(event)).not.toContain('"detail"')
    expect(keys).toContain('sessionId')
  })

  it('the module never reads `.detail` off a signal — structural, not a spot check', () => {
    const src = readFileSync('src/lib/teaching/learnerMoveAgreement.ts', 'utf-8')
    const code = src
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .split('\n')
      .map((l) => l.replace(/\/\/.*$/, ''))
      .join('\n')
    expect(code).not.toMatch(/\.detail\b/)
    expect(code).not.toMatch(/\bmessage\b\s*[:.]/)
  })
})

describe('recordLearnerMoveAgreementEvent never breaks the caller', () => {
  it('is callable and returns void', () => {
    // SUPERSEDED — design doc §4.4 fix, same reason as above: switched to a
    // message that still produces a genuine violation. Original message,
    // preserved for history: 'sir i not understand this'
    const { reading, decisionType } = turn('i am very weak in this')
    const violation = detectLearnerMoveAgreementViolation({ reading, conversationDecisionType: decisionType })!
    const event = buildLearnerMoveAgreementEvent({
      reading, conversationDecisionType: decisionType, kind: violation,
      sessionId: SESSION, subject: 'physics', lessonConceptId: 'phys.mech.newtons-second-law', turnReceivedAt: T0,
    })
    expect(recordLearnerMoveAgreementEvent(event)).toBeUndefined()
  })
})

describe('the route wires Batch 2 exactly once, safely, beside Batch 1', () => {
  const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf-8')

  it('exactly one emit site', () => {
    expect(ROUTE.split('recordLearnerMoveAgreementEvent(').length - 1).toBe(1)
  })

  it('exactly one detection call — one owner, one measurement', () => {
    expect(ROUTE.split('detectLearnerMoveAgreementViolation(').length - 1).toBe(1)
  })

  it('the log prefix is the shared constant, so an aggregation query cannot drift', () => {
    expect(LEARNER_MOVE_AGREEMENT_EVENT_PREFIX).toBe('[learn/chat] LEARNER_MOVE_AGREEMENT=')
  })

  it('is nested inside Batch 1\'s own try block, not a second unguarded block', () => {
    const batch1Start = ROUTE.indexOf('Learner-Move Interpreter, Batch 1')
    const batch2Start = ROUTE.indexOf('Learner-Move Interpreter, Batch 2', batch1Start)
    const emitAt = ROUTE.indexOf('recordLearnerMoveAgreementEvent(', batch2Start)
    const tryAt = ROUTE.lastIndexOf('try {', batch2Start)
    const catchAfterEmit = ROUTE.indexOf('} catch', emitAt)
    expect(batch1Start).toBeGreaterThan(-1)
    expect(batch2Start).toBeGreaterThan(batch1Start)
    expect(tryAt).toBeGreaterThan(-1)
    expect(tryAt).toBeLessThan(batch2Start)
    expect(catchAfterEmit).toBeGreaterThan(emitAt)
  })

  it('is guarded on resolvedConversationDecision being non-null before comparing', () => {
    const batch2Start = ROUTE.indexOf('Learner-Move Interpreter, Batch 2')
    const emitAt = ROUTE.indexOf('recordLearnerMoveAgreementEvent(', batch2Start)
    expect(ROUTE.slice(batch2Start, emitAt)).toMatch(/if \(resolvedConversationDecision\) \{/)
  })

  it('reuses the SAME reading Batch 1 already built — no second readLearnerMove call within Batch 2\'s own block', () => {
    // Batch 5 (design doc §8 row 5) legitimately changed the file-wide
    // premise: it hoists stage A earlier at the AUTONOMY/NAVIGATION
    // steering site, and Batch 1's own site now carries a defensive
    // `?? readLearnerMove(...)` fallback — 2 real call-expressions in the
    // whole file is now correct (learnerMoveSteeringEquivalence.test.ts is
    // the authoritative pin for that count). Original assertion, preserved:
    //
    //   expect(ROUTE.split('readLearnerMove(').length - 1).toBe(1)
    //
    // What THIS test actually protects — that Batch 2's own block adds no
    // call of its own — still holds and is checked directly below.
    const batch2Start = ROUTE.indexOf('Learner-Move Interpreter, Batch 2')
    const emitAt = ROUTE.indexOf('recordLearnerMoveAgreementEvent(', batch2Start)
    expect(ROUTE.slice(batch2Start, emitAt)).not.toMatch(/readLearnerMove\(/)
    expect(ROUTE.slice(batch2Start, emitAt)).toMatch(/reading: learnerMoveStageB/)
  })
})
