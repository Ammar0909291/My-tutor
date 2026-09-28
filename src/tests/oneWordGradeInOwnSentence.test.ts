/**
 * One shared word inside a sentence of the learner's own is not a choice
 * (2026-09-28, physics certification, phys.mech.work-energy-theorem r1 s5).
 * With "State the work–energy theorem" on screen, the learner typed the
 * misconception "I think it is at rest — zero work means zero kinetic energy".
 * Rule 4a matched "kinetic" (only the correct option says it), banked a correct
 * answer and the tutor replied "That's right."
 */
import { describe, it, expect } from 'vitest'
import { gradeMcqAnswer, type TutorMCQ } from '@/lib/teaching/mcq'

const THEOREM: TutorMCQ = {
  question: 'State the work–energy theorem.',
  options: [
    'The net work done on an object equals its total energy',
    'The net work done on an object equals the change in its potential energy',
    'The net work done on an object equals its change in momentum',
    'The NET work done on an object equals the change in its kinetic energy',
  ],
  correctIndex: 3,
}
const SHM: TutorMCQ = {
  question: 'Where is the pendulum fastest?',
  options: ['At the highest point on the left', 'At the highest point on the right', 'At the LOWEST point in the MIDDLE', 'It moves at a constant speed'],
  correctIndex: 2,
}

describe('rule 4a', () => {
  it('the production misconception is not graded as the correct option', () => {
    expect(gradeMcqAnswer('I think it is at rest — zero work means zero kinetic energy', THEOREM))
      .toEqual({ chosenIndex: null, correct: null })
  })
  it('the short answer rule 4a was written for still grades', () => {
    expect(gradeMcqAnswer('i think it is the lowest point sir', SHM)).toEqual({ chosenIndex: 2, correct: true })
  })
  it('stronger rules are untouched: quoting the option grades', () => {
    expect(gradeMcqAnswer('the net work done on an object equals the change in its kinetic energy', THEOREM).correct).toBe(true)
  })
})
