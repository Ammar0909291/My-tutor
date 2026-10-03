/**
 * See staleQuestionAttribution.ts for the measured defect (production,
 * 2026-10-03, math.trig.unit-circle): a correct "(0, 1)" to the 90° question
 * was answered "Can you walk me through how you decided that the point at 180°
 * should be (0, 1)?", and the next turn taught that false fact.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { dropStaleQuestionAttribution, previousCardQuestion } from '@/lib/teaching/staleQuestionAttribution'
import { appendMcqToHistoryText } from '@/lib/teaching/mcq'

const Q180 = 'On the unit circle, what are the coordinates of the point at 180°?'
const Q90 = 'On the unit circle, what are the coordinates of the point at θ = 90°?'
const graded = { question: Q90, options: ['(0, 1)', '(0, −1)'] }

// The two stored tutor messages, oldest first, exactly as the route writes them.
const history = [
  appendMcqToHistoryText('One to try. There\'s no rush.', { question: Q180, options: ['(0, −1)', '(1, 0)', '(0, 1)', '(−1, 0)'], correctIndex: 3 } as never),
  appendMcqToHistoryText('Not quite — the answer is: (−1, 0)\n\nAt 180°, the rotation has taken you to the left side of the circle.', { question: Q90, options: ['(0, 1)', '(0, −1)'], correctIndex: 0 } as never),
]

describe('previousCardQuestion', () => {
  it('finds the card asked before the graded one in stored history', () => {
    expect(previousCardQuestion(history, Q90)).toBe(Q180)
  })

  it('is null when the graded card is the only one', () => {
    expect(previousCardQuestion(history.slice(1), Q90)).toBeNull()
  })
})

describe('dropStaleQuestionAttribution', () => {
  it('drops the measured sentence and keeps the confirmation', () => {
    const r = dropStaleQuestionAttribution({
      text: 'That\'s right. Can you walk me through how you decided that the point at 180° should be (0, 1)?',
      graded, chosen: '(0, 1)', previous: Q180,
    })
    expect(r.text).toBe('That\'s right.')
    expect(r.dropped).toHaveLength(1)
  })

  it('matches the answer through LaTeX delimiters', () => {
    const r = dropStaleQuestionAttribution({
      text: 'Correct. So at 180° you land on \\((0, 1)\\).',
      graded, chosen: '(0, 1)', previous: Q180,
    })
    expect(r.text).toBe('Correct.')
  })

  it('leaves feedback about the graded question alone', () => {
    const text = 'That\'s right — at 90° you have turned a quarter of the way round, to (0, 1).'
    expect(dropStaleQuestionAttribution({ text, graded, chosen: '(0, 1)', previous: Q180 }).text).toBe(text)
  })

  it('leaves a sentence that mentions the old question without the learner\'s answer', () => {
    const text = 'Right. Earlier, 180° took you to the left side of the circle instead.'
    expect(dropStaleQuestionAttribution({ text, graded, chosen: '(0, 1)', previous: Q180 }).text).toBe(text)
  })

  it('does nothing when every number of the previous question is in the graded one', () => {
    const text = 'Right, (0, 1) at 90°.'
    expect(dropStaleQuestionAttribution({ text, graded, chosen: '(0, 1)', previous: 'Where is the point at 90°?' }).text).toBe(text)
  })

  it('a bare-number answer matches only as a whole number', () => {
    const r = dropStaleQuestionAttribution({
      text: 'Correct, 5. Back at 15 cm the side was different.',
      graded: { question: 'A 3-4-? right triangle: what is the hypotenuse?', options: ['5', '7'] },
      chosen: '5', previous: 'What is the diagonal of a 15 cm square?',
    })
    expect(r.dropped).toEqual([])
  })
})

describe('the chat route applies it on server-graded correct turns only', () => {
  const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf-8')
  const block = ROUTE.slice(ROUTE.indexOf('A RIGHT ANSWER IS NOT CREDITED TO THE PREVIOUS QUESTION'), ROUTE.indexOf('// THE SAME QUESTION, ON SCREEN, TWICE.'))

  it('is gated on a correct server grade and reads history oldest first', () => {
    expect(block).toMatch(/mcqGradeHoisted\?\.correct === true/)
    expect(block).toMatch(/\[\.\.\.historyScope\.messages\]\.reverse\(\)/)
    expect(block).toMatch(/repairStubReply\(next, 'stale-question'\)/)
  })

  it('runs after the repeat guard, before the reply is finalised', () => {
    expect(ROUTE.indexOf('A RIGHT ANSWER IS NOT CREDITED TO THE PREVIOUS QUESTION'))
      .toBeGreaterThan(ROUTE.indexOf('A PARAGRAPH THE LEARNER HAS ALREADY READ IS NOT SENT AGAIN'))
  })
})
