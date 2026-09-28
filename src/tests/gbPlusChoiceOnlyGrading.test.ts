import { describe, expect, it } from 'vitest'
import { gradeMcqAnswer, resolveMcqChoice } from '@/lib/teaching/mcq'
import type { TutorMCQ } from '@/lib/teaching/mcq'

const Q: TutorMCQ = {
  question: 'Which statement is correct?',
  options: ['Alpha statement', 'Beta statement', 'Gamma statement', 'Delta statement'],
  correctIndex: 1,
}

const grade = (message: string) => gradeMcqAnswer(message, Q)

describe('GB+ choice-only grading', () => {
  it('preserves Stage E exact-option/tap behavior', () => {
    expect(resolveMcqChoice(Q.options[0], Q)).toBe(0)
    expect(resolveMcqChoice(Q.options[1], Q)).toBe(1)
    expect(resolveMcqChoice(Q.options[2], Q)).toBe(2)
    expect(resolveMcqChoice(Q.options[3], Q)).toBe(3)
  })

  it.each([
    ['B', 1],
    ['b', 1],
    ['B)', 1],
    ['B.', 1],
    ['(B)', 1],
    ['option B', 1],
    ['answer B', 1],
    ['answer is B', 1],
    ['I think B', 1],
    ['I think B because it matches the rule', 1],
    ['B because it matches the rule', 1],
    ['B) because it matches the rule', 1],
    ['B, because it matches the rule', 1],
    ['C, 0 m', 2],
  ] as const)('accepts explicit letter form: %s', (message, index) => {
    expect(resolveMcqChoice(message, Q)).toBe(index)
  })

  it('never semantically evaluates the explanation', () => {
    expect(resolveMcqChoice('B because Alpha statement is also mentioned', Q)).toBe(1)
    expect(resolveMcqChoice('B because the explanation contains C and A', Q)).toBe(1)
  })

  it.each([
    'the second one',
    'second',
    'number 2',
    '2',
    '0 m',
    '5',
    'zero',
    'Alpha statement is correct',
    'I think Gamma statement is correct',
    'the gamma idea',
    'B or C',
    'A or B',
    'B vs C',
    'Force A did more work',
    'crane B did more work',
    'a = 450',
    'c = 450',
    'B? Can you explain?',
    'Why is B correct?',
    'Can you explain B?',
    'I do not understand B',
    'I am confused about C',
    'maybe B',
    'I dont know but maybe B',
    'Please show me why B is correct',
  ])('rejects non-choice inference: %s', (message) => {
    expect(resolveMcqChoice(message, Q)).toBeNull()
    expect(grade(message).correct).toBeNull()
    expect(grade(message).chosenIndex).toBeNull()
  })

  it('rejects an invalid explicit letter', () => {
    expect(resolveMcqChoice('D', { ...Q, options: ['A', 'B'] })).toBeNull()
  })

  it('rejects an empty reply', () => {
    expect(grade('')).toEqual({ chosenIndex: null, correct: null })
  })

  it('a null grade cannot produce correctness credit', () => {
    const result = grade('0 m')
    expect(result).toEqual({ chosenIndex: null, correct: null })
  })
})
