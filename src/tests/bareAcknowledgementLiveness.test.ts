/**
 * A BARE ACKNOWLEDGEMENT MUST NOT BE MET WITH A CONTENT-FREE HOLD THAT READS
 * AS IGNORING IT.
 *
 * ── MEASURED (real-student session, 2026-09, live production account) ───────
 * A learner replied "yes" / "ok" / "got it" to genuine teaching — not a
 * question, not a substantive answer. The model's own follow-up confirmation
 * question ("So you're saying the picture shows the descriptive steps a
 * linguist takes. Is that right?") was correctly stripped (no MCQ backs it,
 * so it must not ship at a mastery gate — that half is untouched and stays
 * exactly as strict). What shipped instead was
 * `WITHHELD_QUESTION_CONTINUATION`, "Let's stay with this idea for a
 * moment." — worded as though the learner's "yes" was never read, or as
 * still holding them on the idea they had just said they were ready to
 * leave.
 *
 * ── THE FIX ──────────────────────────────────────────────────────────────
 * `withholdUngradedGateQuestion` gains one optional input,
 * `learnerAcknowledged`, computed with `isBareAcknowledgement`
 * (masteryGate.ts's own established whole-message detector — reused, not
 * re-derived). When true, and ONLY on the branch where nothing is being
 * reported (no grade, no MCQ following), the fallback becomes "Good — let's
 * keep going." instead of the generic hold sentence. Nothing about the
 * withhold itself changes: an ungradeable question is still stripped exactly
 * as before, no grade is fabricated, and `correctAtCheck`/`correctAtPractice`
 * are untouched by this file, which decides one sentence and nothing else.
 */
import { describe, it, expect } from 'vitest'
import { withholdUngradedGateQuestion } from '@/lib/teaching/gateAssessment'

const PLACEHOLDER = "Let's stay with this idea for a moment."
const HANDS_OFF = 'Let me check your thinking with this.'
const ACK_TAIL = "Good — let's keep going."

// A WH-shaped question — matches `askedAnswerableQuestion`'s SOLICITS_CONTENT,
// same fixture shape as directQuestionLiveness.test.ts's own real-production
// repro, so this genuinely reaches the withhold branch rather than surviving
// as a confirmation-tail question (askedAnswerableQuestion deliberately does
// NOT treat "Is that correct?" as answerable — see answerableTurn.ts).
const bareTurn = (message: string) => ({
  text: 'What made you choose that option?',
  phase: 'CHECK' as const,
  hasStructuredMcq: false,
  learnerAcknowledged: message === 'yes' || message === 'ok' || message === 'got it' || message === 'okay',
})

describe('a bare acknowledgement never reads as unheard', () => {
  for (const message of ['yes', 'ok', 'got it', 'okay']) {
    it(`"${message}" gets the acknowledging tail, not the generic hold`, () => {
      const r = withholdUngradedGateQuestion(bareTurn(message))
      expect(r.withheld).toBe(true)
      expect(r.text).toBe(ACK_TAIL)
      expect(r.text).not.toBe(PLACEHOLDER)
    })
  }

  it('a normal substantive learner answer (not a bare ack) still gets the plain placeholder', () => {
    const r = withholdUngradedGateQuestion({
      text: 'What made you choose that option?',
      phase: 'CHECK',
      hasStructuredMcq: false,
      learnerAcknowledged: false,
    })
    expect(r.text).toBe(PLACEHOLDER)
  })

  it('a genuine direct question still takes priority over the ack tail (mutually exclusive in practice, but proven here)', () => {
    const r = withholdUngradedGateQuestion({
      text: 'What made you choose that option?',
      phase: 'CHECK',
      hasStructuredMcq: false,
      learnerAskedDirectQuestion: true,
      learnerAcknowledged: false,
    })
    expect(r.reason).toBe('left-for-direct-question')
    expect(r.text).toBe('What made you choose that option?')
  })

  it('legitimate pending-probe behaviour is unaffected: a real probe on screen still hands off to it, ack or not', () => {
    const r = withholdUngradedGateQuestion({
      text: 'What made you choose that option?',
      phase: 'CHECK',
      hasStructuredMcq: false,
      questionOnScreen: true,
      learnerAcknowledged: true,
    })
    expect(r.text).toBe(HANDS_OFF)
    expect(r.text).not.toBe(ACK_TAIL)
  })

  it('a REAL grade this turn is never re-worded by the ack detector — correct answer', () => {
    const r = withholdUngradedGateQuestion({
      text: 'What made you choose that option?',
      phase: 'CHECK',
      hasStructuredMcq: false,
      learnerAcknowledged: true,
      justGraded: { correct: true },
    })
    expect(r.text).toBe(`That's right. ${PLACEHOLDER}`)
    expect(r.text).not.toContain(ACK_TAIL)
  })

  it('a REAL grade this turn is never re-worded by the ack detector — wrong answer', () => {
    const r = withholdUngradedGateQuestion({
      text: 'What made you choose that option?',
      phase: 'CHECK',
      hasStructuredMcq: false,
      learnerAcknowledged: true,
      justGraded: { correct: false, correctOptionText: 'the descriptive answer' },
    })
    expect(r.text).toBe(`Not quite — the answer was: the descriptive answer. ${PLACEHOLDER}`)
    expect(r.text).not.toContain(ACK_TAIL)
  })

  it('omitting the field entirely reproduces the exact prior behaviour', () => {
    const r = withholdUngradedGateQuestion({
      text: 'What made you choose that option?',
      phase: 'CHECK',
      hasStructuredMcq: false,
    })
    expect(r.text).toBe(PLACEHOLDER)
  })

  it('real teaching that survives salvage is shown regardless of the ack field — legitimate holding behaviour untouched', () => {
    const r = withholdUngradedGateQuestion({
      text: 'A phrasal verb’s meaning is a fixed whole-unit sense. Is that clear now?',
      phase: 'CHECK',
      hasStructuredMcq: false,
      learnerAcknowledged: true,
    })
    expect(r.text).toContain('fixed whole-unit sense')
    expect(r.text).not.toBe(ACK_TAIL)
  })
})

describe('the route actually wires learnerAcknowledged from the real detector', () => {
  const ROUTE = require('fs').readFileSync('src/app/api/learn/chat/route.ts', 'utf8') as string

  it('computes it from isBareAcknowledgement(message), not a hardcoded value', () => {
    expect(ROUTE).toMatch(/isBareAcknowledgement: isBareAcknowledgementForWithhold \}/)
    expect(ROUTE).toMatch(/learnerAcknowledged: isBareAcknowledgementForWithhold\(message\)/)
  })
})
