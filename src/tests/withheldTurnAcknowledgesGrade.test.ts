/**
 * A CORRECT ANSWER WAS ANSWERED WITH THIRTY-NINE CHARACTERS THAT SAID NOTHING.
 *
 * ── MEASURED IN PRODUCTION, not inferred ────────────────────────────────────
 * Session cmtaiddvd… (phys.mech.rotational-dynamics, 2026-08-26). The learner
 * was shown a torque/moment-of-inertia MCQ whose option A was the correct one
 * and replied:
 *
 *     "A. but sir i not fully sure"
 *
 * The server graded it and banked the evidence — `evidence_events` carries
 * `PROBE_OUTCOME  pass|conf=high|confusion=true  strength 1` at 19:53:21 for
 * that exact turn. The learner-facing message stored at 19:53:20 was, in full:
 *
 *     "Let's stay with this idea for a moment."
 *
 * No "that's right", no confirmation, no reason. The learner had no way to
 * know they had just got it right.
 *
 * ── HOW OFTEN ───────────────────────────────────────────────────────────────
 * Not an anecdote. Across all production history, 119 assistant turns consist
 * of ONLY that sentence. Joining each to the PROBE_OUTCOME within ±4s of it:
 *
 *     119 placeholder-only turns
 *      52 of them landed on a turn the server had just graded
 *      51 of those 52 were CORRECT answers
 *       1 was wrong
 *
 * So the dominant real-world shape is not "a wrong answer got a thin
 * correction" — it is "a right answer got no acknowledgement at all".
 *
 * ── ROOT CAUSE ──────────────────────────────────────────────────────────────
 * `withholdUngradedGateQuestion` is correct and is NOT the bug. Its job is to
 * strip a mastery question that has no server answer key, and it did that. The
 * bug is its fallback: `WITHHELD_QUESTION_CONTINUATION` is a fixed string
 * chosen (rightly, at the time) to claim nothing, because the case it was
 * written for is "no probe existed". It was never given the one fact that
 * changes what an honest sentence says — that THIS turn the server graded an
 * answer, and knows the result.
 *
 * ── THE FIX ─────────────────────────────────────────────────────────────────
 * One optional input carrying a fact the route already holds
 * (`mcqGradeHoisted` + the pending MCQ's own correct option). It is consulted
 * ONLY on the path that would otherwise emit the bare placeholder. Nothing
 * about grading, mastery counters, the ladder, probe eligibility or when a
 * question is withheld changes — this decides one sentence, and only when the
 * alternative is a sentence that says nothing.
 */
import { describe, it, expect } from 'vitest'
import { withholdUngradedGateQuestion } from '@/lib/teaching/gateAssessment'

const PLACEHOLDER = "Let's stay with this idea for a moment."

/** A CHECK-phase turn whose entire content is an ungradeable question. */
const wholeTurnIsAQuestion = {
  text: 'What is the torque when a 20 N force acts at 0.3 m from the pivot?',
  phase: 'CHECK' as const,
  hasStructuredMcq: false,
}

describe('the production case: a graded-correct answer is acknowledged', () => {
  it('says the answer was right instead of saying nothing', () => {
    const r = withholdUngradedGateQuestion({
      ...wholeTurnIsAQuestion,
      justGraded: { correct: true },
    })
    expect(r.withheld).toBe(true)
    // the defect: this was the WHOLE message the learner received
    expect(r.text).not.toBe(PLACEHOLDER)
    expect(r.text.toLowerCase()).toMatch(/right|correct/)
  })

  it('still withholds the ungradeable question itself', () => {
    const r = withholdUngradedGateQuestion({
      ...wholeTurnIsAQuestion,
      justGraded: { correct: true },
    })
    expect(r.text).not.toContain('20 N force')
    expect(r.text).not.toContain('?')
    expect(r.reason).toBe('no-gradeable-probe')
  })
})

describe('a graded-wrong answer is told, and told what was right', () => {
  it('names the correct option when the server holds it', () => {
    const r = withholdUngradedGateQuestion({
      ...wholeTurnIsAQuestion,
      justGraded: { correct: false, correctOptionText: 'τ = 6 N·m' },
    })
    expect(r.text).not.toBe(PLACEHOLDER)
    expect(r.text).toContain('τ = 6 N·m')
  })

  it('never invents an answer it was not given', () => {
    const r = withholdUngradedGateQuestion({
      ...wholeTurnIsAQuestion,
      justGraded: { correct: false },
    })
    expect(r.text).not.toBe(PLACEHOLDER)
    // it may say "not quite"; it may not manufacture a correct option
    expect(r.text.toLowerCase()).toMatch(/not quite|wasn't|not right/)
    expect(r.text).not.toMatch(/answer was:/)
  })

  it('does not re-pose the question it just withheld', () => {
    const r = withholdUngradedGateQuestion({
      ...wholeTurnIsAQuestion,
      justGraded: { correct: false, correctOptionText: 'τ = 6 N·m' },
    })
    expect(r.text).not.toContain('?')
  })
})

describe('nothing else changes', () => {
  it('with no grade this turn, the placeholder is exactly as before', () => {
    const r = withholdUngradedGateQuestion(wholeTurnIsAQuestion)
    expect(r.text).toBe(PLACEHOLDER)
    expect(r.withheld).toBe(true)
  })

  it('an explicit null grade behaves like no grade', () => {
    const r = withholdUngradedGateQuestion({ ...wholeTurnIsAQuestion, justGraded: null })
    expect(r.text).toBe(PLACEHOLDER)
  })

  it('when teaching survives the cut, the grade sentence is NOT prepended', () => {
    // The learner already has real content this turn; the placeholder exists
    // only for the empty case, and so does this.
    const r = withholdUngradedGateQuestion({
      text: 'Torque grows with the distance from the pivot.\n\nWhat is the torque at 0.3 m?',
      phase: 'CHECK',
      hasStructuredMcq: false,
      justGraded: { correct: true },
    })
    expect(r.withheld).toBe(true)
    expect(r.text).toContain('Torque grows with the distance')
    expect(r.text.toLowerCase()).not.toMatch(/^that's right/)
  })

  it('a turn that withholds nothing is untouched, grade or no grade', () => {
    const text = 'Torque is force times the lever arm. Does that land?'
    const r = withholdUngradedGateQuestion({
      text, phase: 'CHECK', hasStructuredMcq: false,
      justGraded: { correct: false, correctOptionText: 'τ = 6 N·m' },
    })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(text)
  })

  it('a completed lesson is still short-circuited, grade or no grade', () => {
    const r = withholdUngradedGateQuestion({
      ...wholeTurnIsAQuestion,
      lessonCompleted: true,
      justGraded: { correct: true },
    })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(wholeTurnIsAQuestion.text)
  })

  it('a non-gate phase is still untouched', () => {
    const r = withholdUngradedGateQuestion({
      ...wholeTurnIsAQuestion,
      phase: 'OBSERVE',
      justGraded: { correct: true },
    })
    expect(r.withheld).toBe(false)
  })
})

describe('the stray-question-alongside-an-MCQ path also gets the courtesy', () => {
  it('acknowledges the grade when that repair would empty the turn', () => {
    const r = withholdUngradedGateQuestion({
      text: 'What is the moment of inertia of a solid disc?',
      phase: 'CHECK',
      hasStructuredMcq: true,
      attachedMcqQuestion: 'Which disc spins up faster under the same torque?',
      justGraded: { correct: true },
    })
    expect(r.reason).toBe('stray-question-alongside-mcq')
    expect(r.text).not.toBe(PLACEHOLDER)
    expect(r.text.toLowerCase()).toMatch(/right|correct/)
  })
})

describe('the route actually passes the fact it holds', () => {
  const ROUTE = require('fs').readFileSync('src/app/api/learn/chat/route.ts', 'utf8') as string

  it('wires justGraded from the turn\'s own grade, not a re-derivation', () => {
    expect(ROUTE).toMatch(/justGraded: mcqGradeHoisted && typeof mcqGradeHoisted\.correct === 'boolean'/)
  })

  it('takes the answer key from the same MCQ that was graded', () => {
    expect(ROUTE).toMatch(/pendingMcqHoisted\?\.options\?\.\[pendingMcqHoisted\.correctIndex\]/)
  })

  it('passes null rather than a guess when nothing was graded', () => {
    const i = ROUTE.indexOf('justGraded: mcqGradeHoisted')
    expect(i).toBeGreaterThan(0)
    expect(ROUTE.slice(i, i + 600)).toContain(': null')
  })
})

describe('a repair may never break a turn', () => {
  it('a malformed grade object falls back to the plain placeholder', () => {
    const r = withholdUngradedGateQuestion({
      ...wholeTurnIsAQuestion,
      justGraded: { correct: 'yes' as unknown as boolean },
    })
    expect(r.withheld).toBe(true)
    expect(r.text.length).toBeGreaterThan(0)
    expect(r.text).not.toContain('?')
  })
})

/**
 * THE STRAY-QUESTION-ALONGSIDE-MCQ PATH HANDS OFF TO THE QUIZ, NOT A STALL.
 *
 * phys.mech.collisions-inelastic + eng.vocab.word-recognition, real account,
 * 2026-08-28: the model wrote its own prose question while an authored MCQ was
 * already attached; the prose was stripped and the WHOLE visible message became
 * "Let's stay with this idea for a moment." with a quiz beside it — the brief's
 * named dead-loop. When a tappable MCQ follows, the fallback must orient to it.
 */
describe('a stripped prose question with an MCQ attached hands off to the MCQ', () => {
  const strayAlongsideMcq = {
    text: 'So, why do you think the two speeds should not simply be added together?',
    phase: 'CHECK' as const,
    hasStructuredMcq: true,
    attachedMcqQuestion: 'What is the final speed after a perfectly inelastic collision?',
  }

  it('does not emit the content-free hold in front of a quiz', () => {
    const r = withholdUngradedGateQuestion({ ...strayAlongsideMcq, justGraded: null })
    expect(r.withheld).toBe(true)
    expect(r.reason).toBe('stray-question-alongside-mcq')
    expect(r.text).not.toBe(PLACEHOLDER)
    // orients toward the question that is actually there
    expect(r.text.toLowerCase()).toMatch(/check|thinking|this/)
    // still strips the model's own stray question
    expect(r.text).not.toContain('?')
  })

  it('still reports a just-computed grade before handing off', () => {
    const r = withholdUngradedGateQuestion({
      ...strayAlongsideMcq,
      justGraded: { correct: true },
    })
    expect(r.text.toLowerCase()).toMatch(/right|correct/)
    expect(r.text).not.toBe(PLACEHOLDER)
  })
})
