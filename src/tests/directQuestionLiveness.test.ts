/**
 * A DIRECT LEARNER QUESTION MUST NOT BE MET WITH A CONTENT-FREE HOLD.
 *
 * ── MEASURED (real-student session, 2026-09, live production account) ───────
 * A learner asked a genuine follow-up during a mastery-gate-active turn:
 * "so if I say 'if I study hard, I would pass exam' this is second
 * conditional right? because I use would?" The model's entire reply
 * apparently carried no non-question sentence at all, so both the existing
 * paragraph-level salvage AND the whole-turn-empty check landed on the bare
 * placeholder, `WITHHELD_QUESTION_CONTINUATION` — "Let's stay with this idea
 * for a moment." — answering nothing the learner actually asked.
 *
 * ── THE FIX, IN TWO PARTS ────────────────────────────────────────────────────
 * 1. `salvageNonQuestionSentences` (sentence-scoped, shared with
 *    `dontKnowCeiling.ts`) is tried before the placeholder, so a teaching
 *    sentence sharing a paragraph with the question now survives.
 * 2. When that ALSO comes back empty (a genuinely bare, question-only turn)
 *    and the learner's own message this turn was a genuine direct question
 *    (`learnerAskedDirectQuestion`), the turn is left untouched rather than
 *    replaced with a hold sentence — the same "no teaching to keep, no key
 *    to reveal, leave it alone" precedent `dontKnowCeiling.ts` already
 *    established for its own identical dead end.
 *
 * Evidence integrity is unaffected: this decides ONE sentence, never grades,
 * and `correctAtCheck`/`correctAtPractice`'s verified counters move only from
 * a real server-graded MCQ (`mcqGradeHoisted`), never from prose left on
 * screen — see `learnerAskedDirectQuestion`'s doc comment in
 * gateAssessment.ts for the full argument.
 */
import { describe, it, expect } from 'vitest'
import { withholdUngradedGateQuestion, salvageNonQuestionSentences } from '@/lib/teaching/gateAssessment'

const PLACEHOLDER = "Let's stay with this idea for a moment."

describe('a genuine direct question is never met with the content-free hold', () => {
  it('leaves the turn alone when nothing else can be said', () => {
    // The real-production shape: a bare Socratic follow-up, no explanation
    // attached, in reply to the learner's own genuine question.
    const r = withholdUngradedGateQuestion({
      text: 'What do you notice about the verb tenses in that sentence?',
      phase: 'CHECK',
      hasStructuredMcq: false,
      learnerAskedDirectQuestion: true,
    })
    expect(r.text).not.toBe(PLACEHOLDER)
    expect(r.text).toBe('What do you notice about the verb tenses in that sentence?')
    expect(r.reason).toBe('left-for-direct-question')
  })

  it('"was my answer right?" — same shape, same fix', () => {
    const r = withholdUngradedGateQuestion({
      text: 'What made you choose that option?',
      phase: 'PRACTICE',
      hasStructuredMcq: false,
      learnerAskedDirectQuestion: true,
    })
    expect(r.text).not.toBe(PLACEHOLDER)
  })

  it('"I don\'t understand" alone (no question mark) is NOT treated as a direct question here — untouched by this field', () => {
    // detectLearnerQuestion requires a '?'; a caller that correctly computes
    // it for "I don't understand" (no '?') passes false, and this function
    // must fall back to its pre-existing behaviour exactly as before.
    const r = withholdUngradedGateQuestion({
      text: 'What is the torque when a 20 N force acts at 0.3 m from the pivot?',
      phase: 'CHECK',
      hasStructuredMcq: false,
      learnerAskedDirectQuestion: false,
    })
    expect(r.text).toBe(PLACEHOLDER)
  })

  it('a polite lesson-ending message ("can we stop here for today") still gets a real reply when the turn carries teaching', () => {
    // The teaching survives via sentence-level salvage; the "leave alone"
    // path is only reached when NOTHING survives at all.
    const r = withholdUngradedGateQuestion({
      text: 'Great work today — you have covered a lot of ground. Ready to wrap up here?',
      phase: 'CHECK',
      hasStructuredMcq: false,
      learnerAskedDirectQuestion: true,
    })
    expect(r.text).toContain('Great work today')
    expect(r.text).not.toBe(PLACEHOLDER)
  })

  it('normal valid hold: no direct question, nothing survives — placeholder is exactly as before', () => {
    const r = withholdUngradedGateQuestion({
      text: 'What is the ratio of 6 to 10?',
      phase: 'PRACTICE',
      hasStructuredMcq: false,
    })
    expect(r.withheld).toBe(true)
    expect(r.text.trim().length).toBeGreaterThan(0)
    expect(r.text).not.toMatch(/\?/)
    expect(r.text).toBe(PLACEHOLDER)
  })

  it('a direct question this turn does NOT override a real grade fact', () => {
    // justGraded present -> the existing grade-aware sentence still wins;
    // "leave alone" is gated on justGraded being absent.
    const r = withholdUngradedGateQuestion({
      text: 'What is the torque when a 20 N force acts at 0.3 m from the pivot?',
      phase: 'CHECK',
      hasStructuredMcq: false,
      learnerAskedDirectQuestion: true,
      justGraded: { correct: true },
    })
    expect(r.text.toLowerCase()).toMatch(/right|correct/)
    expect(r.text).not.toBe('What is the torque when a 20 N force acts at 0.3 m from the pivot?')
  })

  it('a direct question during a non-gate phase is already untouched (gate never activates)', () => {
    const r = withholdUngradedGateQuestion({
      text: 'What do you notice about the verb tenses here?',
      phase: 'OBSERVE',
      hasStructuredMcq: false,
      learnerAskedDirectQuestion: true,
    })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe('What do you notice about the verb tenses here?')
  })

  it('a completed lesson short-circuits before this field is ever read', () => {
    const r = withholdUngradedGateQuestion({
      text: 'Does that make sense so far?',
      phase: 'CHECK',
      hasStructuredMcq: false,
      learnerAskedDirectQuestion: true,
      lessonCompleted: true,
    })
    expect(r.withheld).toBe(false)
  })

  it('omitting the field entirely reproduces the exact prior behaviour', () => {
    const r = withholdUngradedGateQuestion({
      text: 'What is the ratio of 6 to 10?',
      phase: 'PRACTICE',
      hasStructuredMcq: false,
    })
    expect(r.text).toBe(PLACEHOLDER)
  })
})

describe('the route actually wires learnerAskedDirectQuestion', () => {
  const ROUTE = require('fs').readFileSync('src/app/api/learn/chat/route.ts', 'utf8') as string

  it('passes detectLearnerQuestion(message), not a hardcoded value', () => {
    expect(ROUTE).toMatch(/learnerAskedDirectQuestion: detectLearnerQuestionForWithhold\(message\)/)
  })
})

describe('salvageNonQuestionSentences', () => {
  it('keeps a teaching sentence and drops the trailing question', () => {
    const out = salvageNonQuestionSentences(
      'Torque grows with the distance from the pivot and the size of the applied force. '
      + 'What is the torque at 0.3 m?',
    )
    expect(out).toContain('Torque grows with the distance')
    expect(out).not.toContain('?')
  })

  it('returns empty for a bare question with nothing else', () => {
    expect(salvageNonQuestionSentences('What is the torque?')).toBe('')
  })

  it('returns empty for a short fragment even without a question mark', () => {
    expect(salvageNonQuestionSentences('OK.')).toBe('')
  })
})
