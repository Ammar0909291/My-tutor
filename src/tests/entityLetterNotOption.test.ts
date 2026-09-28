/**
 * A letter that names a thing in the question is not an option label
 * (2026-09-28, physics certification unit 2, phys.mech.impulse r1 s5).
 * "Force A = 800 N …; Force B = 8 N …" with options "Equal — …" | "A, because it
 * is a much bigger force": the misconception "I think force A — it is a much
 * bigger force …" was read as option A (the CORRECT answer), and the tutor said
 * "That's right."
 */
import { describe, it, expect } from 'vitest'
import { gradeMcqAnswer, type TutorMCQ } from '@/lib/teaching/mcq'

const IMPULSE: TutorMCQ = {
  question: 'Force A = 800 N for 0.002 s; Force B = 8 N for 0.2 s. Which delivers more impulse?',
  options: ['Equal — J_A = 1.6 N·s = J_B = 1.6 N·s', 'A, because it is a much bigger force'],
  correctIndex: 0,
}
const PLAIN: TutorMCQ = { question: 'Which force is larger?', options: ['The weight', 'The normal force', 'They are equal', 'Neither'], correctIndex: 2 }

describe('entity letters', () => {
  it('the production misconception grades as the misconception option', () => {
    expect(gradeMcqAnswer('I think force A — it is a much bigger force, so it must deliver more impulse', IMPULSE))
      .toEqual({ chosenIndex: 1, correct: false })
  })
  it('a labelled letter still chooses', () => {
    expect(gradeMcqAnswer('A) Equal', IMPULSE).chosenIndex).toBe(0)
    expect(gradeMcqAnswer('option B', IMPULSE).chosenIndex).toBe(1)
  })
  it('when the question names no lettered things, letter rules are unchanged', () => {
    expect(gradeMcqAnswer('I think C because they balance', PLAIN)).toEqual({ chosenIndex: 2, correct: true })
  })
})

describe('a capital letter after an ordinary word is a name (phys.mech.power r2 s5)', () => {
  const POWER: TutorMCQ = {
    question: 'A motor delivers a steady 1500 W. How much work does it do in 20 s?',
    options: ['1500 J — the power is the work', '30 000 J', '300 J', '75 J — dividing the power by the time'],
    correctIndex: 1,
  }
  it('"I think crane B did more work …" is not option B', () => {
    expect(gradeMcqAnswer('I think crane B did more work because it has more power', POWER).chosenIndex).toBeNull()
  })
  it.each(['I think B', 'B because 1500 × 20', 'I think B is right', 'option B please', 'maybe B', 'it is B'])('"%s" still chooses B', (m) => {
    expect(gradeMcqAnswer(m, POWER).chosenIndex).toBe(1)
  })
})
