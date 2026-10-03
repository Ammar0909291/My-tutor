/**
 * Turn assembly, Phase 3 step 5 — the reply to a learner's question (spec §15).
 * The answer stays model-written; only server facts are enforced: nothing was
 * graded, so no verdict; and at most one question back to the learner.
 */
import { describe, it, expect } from 'vitest'
import { assembleQuestionTurn, questionTurnChecks } from '@/lib/teaching/questionAssembly'

const ANSWER = 'The normal force is the push a surface gives back, perpendicular to it. On a flat table it balances the weight, so the book does not accelerate.'

describe('questionTurnChecks', () => {
  it('measures stub, a verdict on a question, and questions back to the learner', () => {
    expect(questionTurnChecks(ANSWER)).toEqual({ stub: false, verdict: false, learnerQuestions: 0 })
    expect(questionTurnChecks('Great question!')).toEqual({ stub: true, verdict: false, learnerQuestions: 0 })
    expect(questionTurnChecks(`That's right. ${ANSWER}`).verdict).toBe(true)
    expect(questionTurnChecks(`${ANSWER} Does that make sense? What would change on a ramp?`).learnerQuestions).toBe(2)
  })
})

describe('assembleQuestionTurn', () => {
  it('leaves a good answer untouched', () => {
    expect(assembleQuestionTurn(ANSWER)).toMatchObject({ text: ANSWER, changed: false })
    const oneBack = `${ANSWER}\n\nWhat do you think changes on a ramp?`
    expect(assembleQuestionTurn(oneBack)).toMatchObject({ text: oneBack, changed: false })
  })

  it('drops a verdict: a question is not graded', () => {
    const r = assembleQuestionTurn(`That's right. ${ANSWER}`)
    expect(r.changed).toBe(true)
    expect(r.text).toBe(ANSWER)
  })

  it('keeps only the last question back to the learner', () => {
    const r = assembleQuestionTurn(`${ANSWER} Does that make sense?\n\nWhat would change on a ramp?`)
    expect(r.text).toBe(`${ANSWER}\n\nWhat would change on a ramp?`)
    expect(r.after.learnerQuestions).toBe(1)
  })

  it('never strips a reply down to a stub', () => {
    const r = assembleQuestionTurn("Correct. It's the push back.")
    expect(r.changed).toBe(false)
  })

  it('keeps a rhetorical question the answer itself resolves', () => {
    const t = 'Why does the book not fall? Because the table pushes up on it with a force equal to its weight.'
    expect(assembleQuestionTurn(t).changed).toBe(false)
  })
})
