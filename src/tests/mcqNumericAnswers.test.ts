import { describe, it, expect } from 'vitest'
import { gradeMcqAnswer, resolveMcqChoice } from '@/lib/teaching/mcq'
import type { TutorMCQ } from '@/lib/teaching/mcq'

const TORQUE: TutorMCQ = {
  question: 'If a force acts at a distance, what is the resulting torque?',
  options: [
    'zero point five newton-metres',
    'five newton-metres',
    'ten newton-metres',
    'twenty newton-metres',
  ],
  correctIndex: 1,
}

describe('GB+ removes numeric/ordinal inference', () => {
  it('bare numeric values are ungraded even when they equal an option value', () => {
    for (const reply of ['5', 'five', '5 newton metres', '5 newton-metres']) {
      expect(gradeMcqAnswer(reply, TORQUE)).toEqual({ chosenIndex: null, correct: null })
    }
  })

  it('an explicit letter still grades the same option', () => {
    expect(gradeMcqAnswer('B', TORQUE)).toEqual({ chosenIndex: 1, correct: true })
  })

  it('the exact option text remains gradeable', () => {
    expect(gradeMcqAnswer('five newton-metres', TORQUE)).toEqual({ chosenIndex: 1, correct: true })
  })

  it('a numeric worked explanation is not interpreted', () => {
    expect(gradeMcqAnswer('B because 10 times 0.5 is 5', TORQUE)).toEqual({ chosenIndex: 1, correct: true })
    expect(gradeMcqAnswer('5 because 10 times 0.5', TORQUE)).toEqual({ chosenIndex: null, correct: null })
  })

  it('ambiguous numeric matches are refused', () => {
    const ambiguous: TutorMCQ = {
      question: 'q',
      options: ['5 metres per second', '5 metres per second squared'],
      correctIndex: 1,
    }
    expect(resolveMcqChoice('5', ambiguous)).toBeNull()
  })
})
