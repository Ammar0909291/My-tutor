/**
 * Phase 3 step 2 — a turn that attaches a card carries no question beside it.
 * Texts are production shapes from the Phase-0 hand-read (2026-10-02, K2 12/12).
 */
import { describe, it, expect } from 'vitest'
import { assembleAttachTurn } from '@/lib/teaching/attachAssembly'
import { neutralLeadInFor } from '@/lib/teaching/gateAssessmentRenderer'
import { turnChecks } from '@/lib/teaching/turnAssembly'

const Q = 'Which quantity stays the same when two carts stick together?'

describe('assembleAttachTurn', () => {
  it('leaves prose with no question untouched', () => {
    const prose = 'Momentum is mass times velocity, and in a collision the total stays the same.'
    expect(assembleAttachTurn(prose, Q)).toEqual({ text: prose, changed: false })
  })

  it('drops a re-typed card question and ends on the neutral lead-in', () => {
    const prose = 'Momentum is mass times velocity. Which quantity stays the same when two carts stick together?'
    const r = assembleAttachTurn(prose, Q)
    expect(r.changed).toBe(true)
    expect(r.text).toBe(`Momentum is mass times velocity.\n\n${neutralLeadInFor(Q)}`)
    expect(turnChecks(r.text, true).k2QuestionBesideCard).toBe(false)
  })

  it('drops a second, different question and a confirm-back', () => {
    const prose = 'Great work so far. Does that make sense? What do you think happens to kinetic energy?'
    const r = assembleAttachTurn(prose, Q)
    expect(r.text).not.toContain('?')
    expect(r.text.startsWith('Great work so far.')).toBe(true)
  })

  it('drops home-made option lines', () => {
    const prose = 'Try this one.\nWhat is conserved?\nA) Momentum\nB) Kinetic energy'
    const r = assembleAttachTurn(prose, Q)
    expect(r.text).not.toMatch(/^[A-D]\)/m)
    expect(r.text).not.toContain('?')
  })

  it('a prose that was only a question becomes the lead-in alone', () => {
    expect(assembleAttachTurn('Ready for a question?', Q).text).toBe(neutralLeadInFor(Q))
  })

  it('never stacks two lead-ins', () => {
    const prose = `Momentum is conserved. Can you see why? ${neutralLeadInFor(Q)}`
    const r = assembleAttachTurn(prose, Q)
    expect(r.text.split(neutralLeadInFor(Q)).length - 1).toBe(1)
  })

  it('leaves a quoted example question untouched: it is content, not a question to the learner', () => {
    const prose = 'The sentence "Where are you going?" is interrogative, because it asks for information.'
    expect(assembleAttachTurn(prose, Q)).toEqual({ text: prose, changed: false })
    const curly = 'An interrogative such as \u201cDid she leave?\u201d ends in a question mark.'
    expect(assembleAttachTurn(curly, Q)).toEqual({ text: curly, changed: false })
  })
})
