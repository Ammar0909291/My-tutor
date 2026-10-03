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
    expect(assembleAttachTurn(prose, Q)).toEqual({ text: prose, changed: false, removed: [] })
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
    expect(assembleAttachTurn(prose, Q)).toEqual({ text: prose, changed: false, removed: [] })
    const curly = 'An interrogative such as \u201cDid she leave?\u201d ends in a question mark.'
    expect(assembleAttachTurn(curly, Q)).toEqual({ text: curly, changed: false, removed: [] })
  })

  // Production, serve window 2026-10-03 (chem.found.measurement,
  // chem.found.pure-substances): a question the prose answers itself is
  // teaching, not a question to the learner. Dropping it left "That's
  // kg/(m·s²)." and "No fixed ratio —" with nothing to refer to.
  it('keeps a rhetorical question that the next sentence answers', () => {
    const prose = 'SI gives us seven base units. Pressure in pascals? That\'s kg/(m·s²). Energy in joules? kg·m²/s². Prefixes scale them.'
    expect(assembleAttachTurn(prose, Q)).toEqual({ text: prose, changed: false, removed: [] })
    const mix = 'Compounds have a FIXED ratio. A mixture? No fixed ratio — you can make weak tea or strong tea.'
    expect(assembleAttachTurn(mix, Q)).toEqual({ text: mix, changed: false, removed: [] })
  })

  it('drops a confirm-back even when teaching follows it', () => {
    const r = assembleAttachTurn('Does that make sense so far? Momentum is mass times velocity.', Q)
    expect(r.text).toBe(`Momentum is mass times velocity.\n\n${neutralLeadInFor(Q)}`)
  })

  // Production (math.num.newtons-method): the dropped question was bold, and
  // its closing ** was left behind as "at 0.**".
  it('drops a hanging bold question without leaving its emphasis markers', () => {
    const prose = 'The values double each step, moving farther from the root at 0. **What do you notice about the sequence of approximations?**'
    const r = assembleAttachTurn(prose, Q)
    expect(r.text).toBe(`The values double each step, moving farther from the root at 0.\n\n${neutralLeadInFor(Q)}`)
  })

  it('keeps a rhetorical question but still drops the hanging one after it', () => {
    const prose = 'Pressure in pascals? That\'s kg/(m·s²).\n\nWhich unit would you use for energy?'
    const r = assembleAttachTurn(prose, Q)
    expect(r.changed).toBe(true)
    expect(r.text).toBe(`Pressure in pascals? That's kg/(m·s²).\n\n${neutralLeadInFor(Q)}`)
  })

  it('reports exactly what it dropped, for the log', () => {
    const r = assembleAttachTurn('Does that make sense so far? Momentum is mass times velocity.\nA) Momentum', Q)
    expect([...r.removed].sort()).toEqual(['A) Momentum', 'Does that make sense so far?'])
  })
})
