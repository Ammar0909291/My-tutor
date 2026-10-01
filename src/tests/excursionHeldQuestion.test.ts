/**
 * THE LESSON'S QUESTION ON SCREEN, ANSWERED DURING A SIDE QUESTION.
 *
 * Synthetic-student after-run 2, 2026-09-24 (production TURN_EVENT,
 * phys.mech.velocity, off-track student):
 *
 *   ANSWER_ATTEMPT   PRACTICE -> PRACTICE  server-key true  excursionActive true   <- no credit
 *   PRACTICE_REQUEST PRACTICE -> TRANSFER  gradeSource none, signalSuppressed null <- model self-report
 *
 * The learner asked "what's your favourite physics fact?" with the lesson's
 * question on screen, answered that question correctly next turn, and got
 * nothing: every excursion turn froze the ladder. Then "ok, next question
 * please" was credited from the model's own SIGNAL and the lesson reached
 * TRANSFER below the verified bar, where it can never certify.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { decideExcursion, turnCountsForLesson, parseExcursionState, NO_EXCURSION, type ExcursionState } from '@/lib/teaching/excursion'

const LESSON = 'phys.mech.velocity'
const SIDE = 'phys.mech.buoyancy'
const Q = 'Speed and velocity are defined with the same denominator. What is different about the numerator?'
const base = { lessonConceptId: LESSON, requestedTopicTitle: null, lastAssistantAskedQuestion: false }

describe('opening records the lesson question on screen', () => {
  it('a side question asked with a lesson question on screen records it', () => {
    const d = decideExcursion({ ...base, state: NO_EXCURSION, message: 'what is buoyancy?', requestedConceptId: SIDE, pendingQuestion: Q })
    expect(d.state.active).toBe(true)
    expect(d.state.heldQuestion).toBe(Q)
  })
  it('nothing on screen records nothing', () => {
    const d = decideExcursion({ ...base, state: NO_EXCURSION, message: 'what is buoyancy?', requestedConceptId: SIDE })
    expect(d.state.heldQuestion ?? null).toBeNull()
  })
  it('the recorded question survives a refresh (parse round trip)', () => {
    const d = decideExcursion({ ...base, state: NO_EXCURSION, message: 'what is buoyancy?', requestedConceptId: SIDE, pendingQuestion: Q })
    expect(parseExcursionState(JSON.parse(JSON.stringify(d.state))).heldQuestion).toBe(Q)
  })
})

describe('answering that question closes the detour, and the turn is the lesson\'s', () => {
  const open: ExcursionState = { active: true, targetConceptId: SIDE, targetTopicTitle: null, returnToConceptId: LESSON, turns: 1, heldQuestion: Q }
  it('graded answer to the held question -> closed-answered-lesson, counts for the lesson', () => {
    const d = decideExcursion({ ...base, state: open, message: 'The numerator: speed uses distance', requestedConceptId: null, pendingQuestion: Q, answeredPendingQuestion: true })
    expect(d.transition).toBe('closed-answered-lesson')
    expect(d.state.active).toBe(false)
    expect(d.justClosed).toBe(true)
    expect(turnCountsForLesson(d)).toBe(true)
  })
  it('an answer to a different question (one the side topic put up) keeps the detour open', () => {
    const d = decideExcursion({ ...base, state: open, message: 'it floats', requestedConceptId: null, pendingQuestion: 'Why does a ship float?', answeredPendingQuestion: true, lastAssistantAskedQuestion: true })
    expect(d.transition).not.toBe('closed-answered-lesson')
    expect(turnCountsForLesson(d)).toBe(false)
  })
  it('an ungraded message about the held question does not close it', () => {
    const d = decideExcursion({ ...base, state: open, message: 'hmm not sure', requestedConceptId: null, pendingQuestion: Q, answeredPendingQuestion: false, lastAssistantAskedQuestion: true })
    expect(d.transition).not.toBe('closed-answered-lesson')
  })
  it('an older state with no recorded question behaves exactly as before', () => {
    const { heldQuestion: _drop, ...older } = open
    const d = decideExcursion({ ...base, state: older as ExcursionState, message: 'The numerator: speed uses distance', requestedConceptId: null, pendingQuestion: Q, answeredPendingQuestion: true, lastAssistantAskedQuestion: true })
    expect(d.transition).not.toBe('closed-answered-lesson')
  })
  it('every other close still keeps its closing turn off the lesson (unchanged)', () => {
    expect(turnCountsForLesson({ state: NO_EXCURSION, justClosed: true, transition: 'closed-satisfied' })).toBe(false)
    expect(turnCountsForLesson({ state: NO_EXCURSION, justClosed: true })).toBe(false)
  })
})

describe('route wiring', () => {
  const route = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
  it('the excursion is told the question on screen and whether this turn answered it', () => {
    expect(route).toMatch(/pendingQuestion: pendingMcqHoisted\?\.question \?\? null,\s*answeredPendingQuestion: mcqGradeHoisted !== null,/)
  })
  it('a practice request never carries the model\'s self-reported correctness', () => {
    expect(route).toMatch(/if \(teachingSignal && teachingSignal\.correctness !== undefined && turnIntent\.wantsPractice && !mcqGradeHoisted\) \{\s*signalSuppressedReasonHoisted = 'practice-request-not-an-answer'/)
    const at = route.indexOf("signalSuppressedReasonHoisted = 'practice-request-not-an-answer'")
    const ladder = route.indexOf('const excursionFrozeLadderThisTurn = resolvedExcursionActive')
    const evidence = route.indexOf('category:  EvidenceCategory.PROBE_OUTCOME')
    expect(at).toBeGreaterThan(0)
    expect(ladder).toBeGreaterThan(at) // suppressed before the ladder reads it
    expect(evidence).toBeGreaterThan(at) // and before PROBE_OUTCOME is written
  })
})
