import { describe, it, expect } from 'vitest'
import { resolveMcqChoice, gradeMcqAnswer, mcqConfidence } from '@/lib/teaching/mcq'
import type { TutorMCQ } from '@/lib/teaching/mcq'

const REAL: TutorMCQ = {
  question: 'If you are checking an equation using dimensional analysis, what must be true?',
  options: [
    'They must be completely different types of quantities',
    'They must be identical types of physical quantities',
    'The left side must have more mass than the right side',
    'The units must be in feet on the left and metres on the right',
  ],
  correctIndex: 1,
}

describe('GB+ explicit choice grammar', () => {
  it.each([
    ['B', 1], ['b', 1], ['(B)', 1], ['B)', 1], ['option B', 1],
    ['answer is B', 1], ['I think B', 1], ['B because it matches', 1],
    ['B) because it matches', 1], ['C, 0 m', 2],
  ] as const)('accepts %s', (message, index) => {
    expect(resolveMcqChoice(message, REAL)).toBe(index)
  })

  it.each([
    'the second one', 'second', 'number 2', '2',
    'They must be identical types of physical quantities',
    'i think they must be identical types of physical quantities',
    'I think it is the identical type',
  ])('rejects removed inference: %s', (message) => {
    // BEFORE: ordinals/values/paraphrases/answer-text inference could select an option.
    // AFTER: only exact option text or an explicit letter may grade.
    expect(gradeMcqAnswer(message, REAL)).toEqual({ chosenIndex: null, correct: null })
  })

  it.each([
    'i dont know', 'can you explain that again?', 'what does dimension mean',
    'yes', 'i think so', 'A or B', 'B? Can you explain?', 'why is B correct?',
    'Force A did more work', 'a = 450',
  ])('refuses non-choice input: %s', (message) => {
    expect(gradeMcqAnswer(message, REAL)).toEqual({ chosenIndex: null, correct: null })
  })

  it('does not semantically inspect an explanation', () => {
    expect(resolveMcqChoice('B because the explanation contains C and A', REAL)).toBe(1)
  })

  it('wrong explicit choices remain wrong', () => {
    expect(gradeMcqAnswer('A', REAL)).toEqual({ chosenIndex: 0, correct: false })
    expect(gradeMcqAnswer('C because I am unsure', REAL)).toEqual({ chosenIndex: 2, correct: false })
  })

  it('preserves symbolic exact-option behaviour', () => {
    const dims: TutorMCQ = {
      question: 'Which is the dimensional formula for force?',
      options: ['[M][L][T]', '[M][L][T]⁻²', '[M][L]⁻¹[T]²', '[M]²[L][T]⁻¹'],
      correctIndex: 1,
    }
    dims.options.forEach((option, i) => expect(resolveMcqChoice(option, dims)).toBe(i))
  })
})

describe('null is not wrong', () => {
  it('malformed and ungraded replies return null', () => {
    const empty: TutorMCQ = { question: '', options: [], correctIndex: 0 }
    expect(resolveMcqChoice('B', empty)).toBeNull()
    expect(gradeMcqAnswer('B', empty)).toEqual({ chosenIndex: null, correct: null })
  })
})

describe('confidence', () => {
  it('fast + wrong is high', () => expect(mcqConfidence(false, 2000)).toBe('high'))
  it('slow + wrong is low', () => expect(mcqConfidence(false, 60000)).toBe('low'))
  it('fast + correct is high', () => expect(mcqConfidence(true, 2000)).toBe('high'))
  it('unknown latency is medium', () => expect(mcqConfidence(true, null)).toBe('medium'))
})
