/**
 * P1 — "got it" after genuine completion (2026-08-22).
 *
 * ROOT CAUSE: `withholdUngradedGateQuestion` decides whether a mastery gate
 * is "active" from `phase` / `gateSoughtThisTurn` alone, with no idea
 * whether the lesson itself has already been finalised. Mastery is reached
 * — and a lesson finalised — WHILE `phase` reads CHECK or PRACTICE, and
 * nothing ever moves the persisted `conversationState.phase` afterwards
 * (no further concept is being taught). So on every turn after completion
 * the gate kept reading "active", and a bare acknowledgement like "got it"
 * — which the completion-lock prompt correctly told the model to answer
 * with only a brief confirmation — could still have its trailing text
 * treated as an ungradeable mastery question and replaced with
 * "Let's stay with this idea for a moment.", directly contradicting the
 * completion lock.
 *
 * Fix: `lessonCompleted: true` short-circuits `gateActive` to false, so a
 * completed lesson's turn is treated exactly like any other non-gate turn
 * — untouched, regardless of phase or a stray question in the model's text.
 */
import { describe, it, expect } from 'vitest'
import { withholdUngradedGateQuestion } from '@/lib/teaching/gateAssessment'

// The production shape: prose that ends in a genuine, gradeable-looking
// content question, no MCQ tag attached — the exact shape
// `askedAnswerableQuestion` treats as an ungradeable mastery question when
// the gate is active.
const STRAY_QUESTION_TEXT =
  "Great, glad that landed! Now, what is the value of x in the equation 2x = 10?"

describe('withholdUngradedGateQuestion — lessonCompleted bypass', () => {
  it('CHECK phase, lesson completed: a stray question is left untouched', () => {
    const r = withholdUngradedGateQuestion({
      text: STRAY_QUESTION_TEXT,
      phase: 'CHECK',
      hasStructuredMcq: false,
      lessonCompleted: true,
    })
    expect(r.withheld).toBe(false)
    expect(r.reason).toBe('ok')
    expect(r.text).toBe(STRAY_QUESTION_TEXT)
  })

  it('PRACTICE phase, lesson completed, gateSoughtThisTurn true: still bypassed', () => {
    const r = withholdUngradedGateQuestion({
      text: STRAY_QUESTION_TEXT,
      phase: 'PRACTICE',
      hasStructuredMcq: false,
      gateSoughtThisTurn: true,
      lessonCompleted: true,
    })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(STRAY_QUESTION_TEXT)
  })

  it('GUIDE folding to CHECK, lesson completed: still bypassed', () => {
    const r = withholdUngradedGateQuestion({
      text: STRAY_QUESTION_TEXT,
      phase: 'GUIDE',
      phaseAfter: 'CHECK',
      hasStructuredMcq: false,
      lessonCompleted: true,
    })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(STRAY_QUESTION_TEXT)
  })

  it('control: identical CHECK-phase turn WITHOUT lessonCompleted is still withheld', () => {
    const r = withholdUngradedGateQuestion({
      text: STRAY_QUESTION_TEXT,
      phase: 'CHECK',
      hasStructuredMcq: false,
    })
    expect(r.withheld).toBe(true)
  })

  it('control: lessonCompleted: false behaves identically to omitting the field', () => {
    const withFalse = withholdUngradedGateQuestion({
      text: STRAY_QUESTION_TEXT,
      phase: 'CHECK',
      hasStructuredMcq: false,
      lessonCompleted: false,
    })
    const omitted = withholdUngradedGateQuestion({
      text: STRAY_QUESTION_TEXT,
      phase: 'CHECK',
      hasStructuredMcq: false,
    })
    expect(withFalse).toEqual(omitted)
  })

  it('lesson completed does not mask a stray question alongside an attached MCQ either', () => {
    // Same bypass path — an attached MCQ + completed lesson is an even more
    // pathological state (a gate should never attach a probe on a completed
    // lesson at all), but the bypass must still hold: no gate, no withhold.
    const r = withholdUngradedGateQuestion({
      text: STRAY_QUESTION_TEXT,
      phase: 'CHECK',
      hasStructuredMcq: true,
      attachedMcqQuestion: 'Some other authored question?',
      lessonCompleted: true,
    })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(STRAY_QUESTION_TEXT)
  })
})
