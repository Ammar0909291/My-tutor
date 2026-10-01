import { describe, expect, it } from 'vitest'
import { buildAnswerVerdictBlock } from '@/lib/teaching/answerVerdictBlock'

const MCQ = {
  question: 'In F = ma, which force does the F stand for?',
  options: ['The force of gravity', 'The largest single force', 'The RESULTANT of every force', 'The force you apply'],
  correctIndex: 2,
}

describe('answer verdict block (real-learner run 2026-09-29: wrong answers got no "why")', () => {
  it('a wrong authored-key answer asks for the why, names both options, and forbids the confirm-back', () => {
    const b = buildAnswerVerdictBlock({ grade: { chosenIndex: 3, correct: false }, mcq: MCQ, keyIsAuthored: true })
    expect(b).toContain('WRONG')
    expect(b).toContain('The learner chose: "The force you apply"')
    expect(b).toContain('The correct answer is: "The RESULTANT of every force"')
    expect(b).toMatch(/Explain WHY "The force you apply" is wrong/)
    expect(b).toMatch(/Do NOT ask the learner to confirm/)
  })

  it('a correct answer asks for a one-sentence why', () => {
    const b = buildAnswerVerdictBlock({ grade: { chosenIndex: 2, correct: true }, mcq: MCQ, keyIsAuthored: true })
    expect(b).toContain('CORRECT')
    expect(b).toMatch(/WHY it is right/)
  })

  it('says nothing for a model-invented key, an ungraded turn, or a missing option', () => {
    expect(buildAnswerVerdictBlock({ grade: { chosenIndex: 3, correct: false }, mcq: MCQ, keyIsAuthored: false })).toBe('')
    expect(buildAnswerVerdictBlock({ grade: null, mcq: MCQ, keyIsAuthored: true })).toBe('')
    expect(buildAnswerVerdictBlock({ grade: { chosenIndex: null, correct: null }, mcq: MCQ, keyIsAuthored: true })).toBe('')
    expect(buildAnswerVerdictBlock({ grade: { chosenIndex: 9, correct: false }, mcq: MCQ, keyIsAuthored: true })).toBe('')
  })
})
