/**
 * A tap on a MODEL-WRITTEN card (no authored key) gets a reason, never a
 * verdict (launch-readiness item 1, 2026-10-03).
 *
 * MEASURED since serve: 2 graded taps in mathematics got only "Here is your
 * next question." / "Quick check. Think it through before you choose." Their
 * cards matched 0 authored probes, so the assembler (authored keys only) never
 * ran, and the unauthored-key repair stripped the model's verdict (on purpose:
 * an invented key can be wrong — inventedProbeGuard.ts, phys.mech.friction).
 * The fix keeps that rule: the reason explains the idea the question tests and
 * names no option as right or wrong.
 */
import { describe, it, expect } from 'vitest'
import { buildNeutralSlotSystemPrompt, validateNeutralSlots, assembleNeutralTurn, neutralServeDecision, type NeutralTurnFacts } from '@/lib/teaching/neutralAssembly'
import { turnChecks } from '@/lib/teaching/turnAssembly'

const F: NeutralTurnFacts = {
  question: 'Which of the following spaces is not a Banach space?',
  options: ['ℝⁿ with the Euclidean norm', 'C([0,1]) with the sup norm', 'C([0,1]) with the L¹ norm', 'ℓ²'],
  chosenIndex: 0,
}
const GOOD = 'A Banach space is a normed space that is complete: every Cauchy sequence converges to a limit inside the space. Whether a space qualifies depends on the norm, not only on the set.'

describe('buildNeutralSlotSystemPrompt', () => {
  it('never tells the model which option is correct, and forbids a verdict', () => {
    const p = buildNeutralSlotSystemPrompt(F)
    expect(p).not.toMatch(/correct answer is/i)
    expect(p).not.toMatch(/Verdict/i)
    expect(p).toMatch(/do not say whether/i)
    expect(p).toContain('Return ONLY a JSON object')
  })
})

describe('validateNeutralSlots', () => {
  it('accepts a reason that names the idea', () => {
    expect(validateNeutralSlots({ feedback: GOOD, teaching: null }, F)).toEqual([])
  })
  it('rejects any verdict word', () => {
    expect(validateNeutralSlots({ feedback: `That's correct. ${GOOD}`, teaching: null }, F)).toContain('N1-feedback-verdict')
    expect(validateNeutralSlots({ feedback: `Not quite. ${GOOD}`, teaching: null }, F)).toContain('N1-feedback-verdict')
  })
  it('does not read "right angle" or "right-hand rule" as a verdict', () => {
    expect(validateNeutralSlots({ feedback: 'A right angle measures ninety degrees, and the right-hand rule gives the direction of the force on a moving charge.', teaching: null }, F)).toEqual([])
  })
  it('rejects naming an option (it would assert the unverified key)', () => {
    expect(validateNeutralSlots({ feedback: `${GOOD} C([0,1]) with the L¹ norm is the one that fails.`, teaching: null }, F)).toContain('N2-feedback-names-option')
  })
  it('keeps the shared rules: no question, length bounds', () => {
    expect(validateNeutralSlots({ feedback: `${GOOD} Can you see why?`, teaching: null }, F)).toContain('V2-feedback-question')
    expect(validateNeutralSlots({ feedback: 'Completeness matters.', teaching: null }, F)).toContain('V4-feedback-length')
  })
})

describe('assembleNeutralTurn', () => {
  it('is the reason, then the lead-in when a card follows — never a stub', () => {
    const t = assembleNeutralTurn({ feedback: GOOD, leadIn: "Here's a question — take your time with it." })
    expect(t).toBe(`${GOOD}\n\nHere's a question — take your time with it.`)
    expect(turnChecks(t, true).k1Stub).toBe(false)
    expect(turnChecks(t, true).k2QuestionBesideCard).toBe(false)
  })
  it('without a card it is the reason alone', () => {
    expect(assembleNeutralTurn({ feedback: GOOD, leadIn: null })).toBe(GOOD)
  })
})

describe('neutralServeDecision', () => {
  const lead = 'Quick check. Think it through before you choose.'
  // The production stub: the gate contract's fallback lead-in, alone above the next card.
  it('replaces the production stub with the reason plus the lead-in', () => {
    const d = neutralServeDecision({ mode: 'serve', liveText: 'Here is your next question.', cardOnScreen: true, codes: [], feedback: GOOD, leadIn: lead })
    expect(d).toEqual({ assembled: `${GOOD}\n\n${lead}`, liveStub: true, serve: true })
  })
  it('keeps a live reply that is not a stub', () => {
    const live = 'The normal force is the perpendicular contact force exerted by a surface on an object resting on it.'
    expect(neutralServeDecision({ mode: 'serve', liveText: live, cardOnScreen: false, codes: [], feedback: GOOD, leadIn: null }).serve).toBe(false)
  })
  it('never serves a rejected slot, and never outside serve mode', () => {
    expect(neutralServeDecision({ mode: 'serve', liveText: 'Here is your next question.', cardOnScreen: true, codes: ['N1-feedback-verdict'], feedback: GOOD, leadIn: lead }).serve).toBe(false)
    expect(neutralServeDecision({ mode: 'shadow', liveText: 'Here is your next question.', cardOnScreen: true, codes: [], feedback: GOOD, leadIn: lead }).serve).toBe(false)
  })
})
