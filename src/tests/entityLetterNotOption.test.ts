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
