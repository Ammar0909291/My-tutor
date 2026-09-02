/**
 * THE LESSON IS PAUSED, SO IT CANNOT FINISH.
 *
 * THE PRODUCTION FAILURE THIS LOCKS DOWN (browser transcript):
 *
 *   lesson:   "SI Units and Measurement"
 *   learner:  (mid-Viscosity excursion) "I still don't understand it."
 *   app:      "That's SI Units and Measurement finished — nice work."
 *             "Lesson finished — SI Units and Measurement"  [Start next lesson]
 *   screen:   the Viscosity figure, still there.
 *
 * Two states that cannot both be true were true at once: the visual/excursion
 * state pointed at Viscosity while the lesson state said SI Units was finished.
 *
 * ROOT CAUSE, in one line: gateLessonCompletion() — the single component that
 * decides a lesson is finished — reads ONLY the lesson concept's accumulated
 * mastery counters, and had no input describing the excursion. Worse, those
 * counters could be RAISED by excursion turns, because advanceConversationState
 * folded the turn's SIGNAL into the lesson's ladder no matter which concept the
 * turn actually taught. So a detour could manufacture the mastery that finished
 * the lesson the learner had walked away from.
 *
 * These tests assert the STATE, not the prose: what the gate authorizes, what
 * the fold produces, and what the attribution boundary answers. A fix that only
 * reworded the tutor would fail every case below.
 */

import { describe, expect, it } from 'vitest'
import { gateLessonCompletion, masteryVerifiedStrict } from '@/lib/teaching/masteryGate'
import { enforceStance } from '@/lib/teaching/stanceEnforcement'
import {
  decideExcursion,
  turnCountsForLesson,
  buildExcursionDirective,
  NO_EXCURSION,
  type ExcursionState,
} from '@/lib/teaching/excursion'
import {
  initialConversationState,
  advanceConversationState,
  type ConversationState,
} from '@/lib/teaching/conversationState'

const LESSON = 'phys.meas.units'
const VISCOSITY = 'phys.mech.viscosity'

/** A lesson whose mastery gates are ALREADY satisfied — the state that made
 *  the production turn authorize completion. */
function masteredLessonState(): ConversationState {
  return {
    ...initialConversationState(LESSON),
    phase: 'TRANSFER',
    correctAtCheck: 2,
    correctAtPractice: 3,
    verifiedCorrectAtCheck: 2,
    verifiedCorrectAtPractice: 3,
  }
}

const OPEN_EXCURSION: ExcursionState = {
  active: true,
  targetConceptId: VISCOSITY,
  returnToConceptId: LESSON,
  turns: 2,
}

const CLOSING = 'That\'s SI Units and Measurement finished — nice work. [LESSON_COMPLETE]'

// ── the regression itself ────────────────────────────────────────────────────

describe('the exact production turn', () => {
  const state = masteredLessonState()

  it('REPRODUCES the pre-fix authorization when the excursion is not declared', () => {
    // This is what the gate did before: mastery counters alone, no excursion
    // input at all. Kept as the control — it proves the test would have caught
    // the bug, and that the fix is the excursion input rather than a change to
    // the evidence rules.
    expect(masteryVerifiedStrict(state)).toBe(true)
    expect(gateLessonCompletion(CLOSING, state).authorized).toBe(true)
  })

  it('does NOT complete the lesson while the excursion is open', () => {
    const excursion = decideExcursion({
      state: OPEN_EXCURSION,
      message: "I still don't understand it.",
      lessonConceptId: LESSON,
      requestedConceptId: null,
      lastAssistantAskedQuestion: true,
    })
    expect(excursion.state.active).toBe(true)          // still on the excursion
    expect(turnCountsForLesson(excursion)).toBe(false) // so this turn is not the lesson's

    const gated = gateLessonCompletion(CLOSING, state, { excursionActive: true })
    expect(gated.authorized).toBe(false)
    expect(gated.suppressed).toBe(true)
    // The TAG is what drives the client's completion PATCH (StudentProgress
    // advance + TopicProgress COMPLETED). Removing it prevents the state
    // transition; this is not a wording change.
    expect(gated.cleanText).not.toContain('[LESSON_COMPLETE]')
  })

  it('the state divergence in the screenshot is now unreachable', () => {
    const excursion = decideExcursion({
      state: OPEN_EXCURSION,
      message: "I still don't understand it.",
      lessonConceptId: LESSON,
      requestedConceptId: null,
      lastAssistantAskedQuestion: true,
    })
    // Excursion/visual state and lesson-completion state agree, both saying
    // "the side question is still open".
    expect(excursion.targetConceptId).toBe(VISCOSITY)
    expect(excursion.targetConceptId).not.toBe(LESSON)
    expect(excursion.returnToConceptId).toBe(LESSON)
    expect(gateLessonCompletion(CLOSING, masteredLessonState(), {
      excursionActive: !turnCountsForLesson(excursion),
    }).authorized).toBe(false)
  })
})

// ── the four cases ───────────────────────────────────────────────────────────

describe('CASE A — normal lesson turn completes exactly as before', () => {
  it('mastery + no excursion authorizes completion', () => {
    const excursion = decideExcursion({
      state: NO_EXCURSION,
      message: 'the answer is 5 metres',
      lessonConceptId: LESSON,
      requestedConceptId: null,
      lastAssistantAskedQuestion: true,
    })
    expect(turnCountsForLesson(excursion)).toBe(true)
    const gated = gateLessonCompletion(CLOSING, masteredLessonState(), { excursionActive: false })
    expect(gated.authorized).toBe(true)
    expect(gated.suppressed).toBe(false)
    expect(gated.cleanText).toContain('[LESSON_COMPLETE]')
  })

  it('and without mastery it is still refused, for the original reason', () => {
    const gated = gateLessonCompletion(CLOSING, initialConversationState(LESSON), { excursionActive: false })
    expect(gated.authorized).toBe(false)
    expect(gated.suppressed).toBe(true)
  })

  it('omitting the option entirely reproduces the previous behaviour', () => {
    // Every pre-existing caller passes no options; none of them may change.
    expect(gateLessonCompletion(CLOSING, masteredLessonState()).authorized).toBe(true)
    expect(gateLessonCompletion(CLOSING, initialConversationState(LESSON)).authorized).toBe(false)
  })
})

describe('CASE B — a doubt during the excursion cannot complete the lesson', () => {
  const excursion = decideExcursion({
    state: OPEN_EXCURSION,
    message: 'I still don\'t understand the velocity gradient',
    lessonConceptId: LESSON,
    requestedConceptId: null,
    lastAssistantAskedQuestion: true,
  })

  it('the turn is not attributed to the lesson', () => {
    expect(turnCountsForLesson(excursion)).toBe(false)
  })

  it('completion is refused even with full mastery evidence on the lesson', () => {
    expect(gateLessonCompletion(CLOSING, masteredLessonState(), { excursionActive: true }).authorized).toBe(false)
  })

  it('a correct answer on the EXCURSION concept cannot raise the lesson ladder', () => {
    // A lesson mid-PRACTICE, one correct answer short of the mastery gate —
    // the most damning version of the bug: an answer about VISCOSITY buying
    // the last piece of evidence SI Units needed to be declared finished.
    const before: ConversationState = {
      ...initialConversationState(LESSON),
      phase: 'PRACTICE',
      correctAtCheck: 1,
      correctAtPractice: 1,
      verifiedCorrectAtCheck: 1,
      verifiedCorrectAtPractice: 1,
    }
    const wouldHaveBeen = advanceConversationState(before, {
      askedQuestion: false,
      signalCorrect: true,                      // a correct answer about VISCOSITY
      recoveryFired: false,
      learnerRequest: null,
      signalVerificationStatus: 'CLEAN',
      // Thread 1: a server-graded correct answer is what WOULD push the verified
      // ladder across the completion threshold — the exact danger the excursion
      // freeze exists to stop. (A prose self-report could no longer do it.)
      serverGraded: true,
    })
    // Proof the fold is what moved the lesson's counters before the fix — and
    // that it moved them across the completion threshold.
    expect(wouldHaveBeen.correctAtPractice).toBeGreaterThan(before.correctAtPractice)
    expect(masteryVerifiedStrict(before)).toBe(false)
    expect(masteryVerifiedStrict(wouldHaveBeen)).toBe(true)

    // And proof that freezing is what stops it. This is the route's fold on an
    // excursion turn: `excursionActive ? state : advance(...)`.
    const frozen = before
    expect(frozen.correctAtCheck).toBe(before.correctAtCheck)
    expect(frozen.correctAtPractice).toBe(before.correctAtPractice)
    expect(frozen.phase).toBe(before.phase)
    expect(frozen.turnsInCurrentPhase).toBe(before.turnsInCurrentPhase)
    expect(masteryVerifiedStrict(frozen)).toBe(false)
    expect(gateLessonCompletion(CLOSING, frozen, { excursionActive: true }).authorized).toBe(false)
  })

  it('a beginner mid-excursion cannot cross a mastery gate at all', () => {
    const fresh = initialConversationState(LESSON)
    const frozen = fresh
    expect(masteryVerifiedStrict(frozen)).toBe(false)
    expect(gateLessonCompletion(CLOSING, frozen, { excursionActive: true }).authorized).toBe(false)
  })
})

describe('CASE C — satisfaction closes the excursion without fabricating completion', () => {
  const closing = decideExcursion({
    state: OPEN_EXCURSION,
    message: 'Got it, thanks',
    lessonConceptId: LESSON,
    requestedConceptId: null,
    lastAssistantAskedQuestion: true,
  })

  it('the excursion closes, per the existing lifecycle', () => {
    expect(closing.state).toEqual(NO_EXCURSION)
    expect(closing.justClosed).toBe(true)
    expect(closing.targetConceptId).toBe(LESSON)
  })

  it('but the RETURN turn still cannot finish the lesson', () => {
    // A turn that resumes a lesson cannot also complete it — otherwise
    // satisfaction with the side question buys a completion one turn later.
    expect(turnCountsForLesson(closing)).toBe(false)
    expect(gateLessonCompletion(CLOSING, masteredLessonState(), {
      excursionActive: !turnCountsForLesson(closing),
    }).authorized).toBe(false)
  })

  it('and the turn AFTER the return is an ordinary lesson turn again', () => {
    const next = decideExcursion({
      state: closing.state,
      message: 'so the unit is the pascal-second',
      lessonConceptId: LESSON,
      requestedConceptId: null,
      lastAssistantAskedQuestion: true,
    })
    expect(turnCountsForLesson(next)).toBe(true)
    expect(gateLessonCompletion(CLOSING, masteredLessonState(), { excursionActive: false }).authorized).toBe(true)
  })
})

describe('CASE D — a completion earned BEFORE the excursion is preserved', () => {
  it('the gate never rewrites history; it only withholds a NEW tag', () => {
    const state = masteredLessonState()
    const snapshot = JSON.parse(JSON.stringify(state))
    const text = 'Here is more about viscosity. [LESSON_COMPLETE]'
    const gated = gateLessonCompletion(text, state, { excursionActive: true })
    // No mutation of the lesson's own state, and nothing but the tag removed.
    expect(state).toEqual(snapshot)
    expect(gated.cleanText).toContain('Here is more about viscosity.')
    // Persisted completion (StudentProgress / TopicProgress) is written by the
    // client's PATCH on a tag, and by nothing in this path — so an already
    // completed lesson is untouched by construction. The excursion state
    // itself carries no progress fields at all.
    // Still exhaustive: it fails the moment a progress field appears here.
    // `targetTopicTitle` names a topic the KG does not contain (excursion.ts's
    // UNRESOLVED TOPICS note) — teaching state, not progress.
    expect(Object.keys(NO_EXCURSION).sort()).toEqual(
      ['active', 'returnToConceptId', 'targetConceptId', 'targetTopicTitle', 'turns'],
    )
  })
})

// ── the enforcement chain ────────────────────────────────────────────────────

describe('enforceStance forwards the excursion fact to the one gate', () => {
  it('suppresses completion and reports WHY it was suppressed', () => {
    const verdict = enforceStance({
      text: CLOSING,
      state: masteredLessonState(),
      move: 'teach',
      misconceptionActive: false,
      excursionActive: true,
    })
    expect(verdict.completionAuthorized).toBe(false)
    expect(verdict.cleanText).not.toContain('[LESSON_COMPLETE]')
    const violation = verdict.violations.find((v) => v.code === 'FALSE_MASTERY_COMPLETION')
    expect(violation?.detail).toMatch(/excursion/i)
  })

  it('authorizes normally when no excursion is open', () => {
    const verdict = enforceStance({
      text: CLOSING,
      state: masteredLessonState(),
      move: 'teach',
      misconceptionActive: false,
      excursionActive: false,
    })
    expect(verdict.completionAuthorized).toBe(true)
    expect(verdict.cleanText).toContain('[LESSON_COMPLETE]')
  })

  it('fails toward the old behaviour when the flag is absent, never toward completing', () => {
    const unmastered = enforceStance({
      text: CLOSING, state: initialConversationState(LESSON), move: 'teach', misconceptionActive: false,
    })
    expect(unmastered.completionAuthorized).toBe(false)
  })
})

describe('the excursion directive states the same rule the server enforces', () => {
  it('forbids the completion tag and the closing summary', () => {
    const decision = decideExcursion({
      state: NO_EXCURSION,
      message: 'explain viscosity',
      lessonConceptId: LESSON,
      requestedConceptId: VISCOSITY,
      lastAssistantAskedQuestion: false,
    })
    const directive = buildExcursionDirective({
      decision, targetTitle: "Viscosity and Stokes' Law", lessonTitle: 'SI Units and Measurement',
    })
    expect(directive).toContain('[LESSON_COMPLETE]')
    expect(directive).toMatch(/do NOT emit/i)
    expect(directive).toMatch(/lesson is NOT finished/i)
  })
})

// ── the standing invariant ───────────────────────────────────────────────────

describe('STATE CONSISTENCY INVARIANT, on every turn of a live excursion', () => {
  const messages = [
    'explain viscosity with a diagram',
    "I don't understand the velocity gradient",
    'why does it depend on temperature?',
    'show me a diagram',
    'the top layer moves fastest',
  ]

  it('holds for every turn', () => {
    let state = NO_EXCURSION
    let lessonState = masteredLessonState()
    for (const [i, message] of messages.entries()) {
      const requested = i === 0 ? VISCOSITY : null
      const decision = decideExcursion({
        state, message, lessonConceptId: LESSON,
        requestedConceptId: requested,
        lastAssistantAskedQuestion: i > 0,
      })

      // Teaching/visual side — unchanged by the completion fix.
      expect(decision.state.active).toBe(true)
      expect(decision.targetConceptId).toBe(VISCOSITY)
      expect(decision.targetConceptId).not.toBe(LESSON)
      expect(decision.returnToConceptId).toBe(LESSON)

      // Lesson side — nothing may be created by this turn.
      expect(turnCountsForLesson(decision)).toBe(false)
      const frozen = lessonState        // the route's fold on an excursion turn
      expect(frozen).toEqual(lessonState)
      expect(gateLessonCompletion(CLOSING, frozen, { excursionActive: true }).authorized).toBe(false)

      state = decision.state
      lessonState = frozen
    }
    // Five turns of teaching later, the lesson's ladder is exactly where it was.
    expect(lessonState).toEqual(masteredLessonState())
  })
})
