/**
 * See staleQuestionAttribution.ts for the measured defect (production,
 * 2026-10-03, math.trig.unit-circle): a correct "(0, 1)" to the 90° question
 * was answered "Can you walk me through how you decided that the point at 180°
 * should be (0, 1)?", and the next turn taught that false fact.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { dropStaleQuestionAttribution, previousCardQuestion, confirmGradedAnswer } from '@/lib/teaching/staleQuestionAttribution'
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

describe('a claim that the learner chose something else', () => {
  // Production, 2026-10-03, math.disc.combinations: "120" (wrong) to the
  // committee card, then "Yes" (right) to the Pascal card.
  const pascal = { question: 'Can you explain WHY C(n,r)=C(n-1,r-1)+C(n-1,r) is true, beyond just stating the formula?', options: ['Yes', "It's just the formula for combinations of consecutive values of n and r", 'It is simply an algebraic identity that happens to hold when you expand the factorials'] }
  const committee = 'From 6 men and 4 women, how many 3-person committees contain exactly 1 woman?'

  it('drops the measured claim and the question pointing back at it', () => {
    const r = dropStaleQuestionAttribution({ text: "That's right. I see you chose 120. How did you work out that number?", graded: pascal, chosen: 'Yes', previous: committee })
    expect(r.text).toBe("That's right.")
    expect(r.dropped).toEqual(['I see you chose 120.', 'How did you work out that number?'])
  })

  it('also with no previous card on record', () => {
    expect(dropStaleQuestionAttribution({ text: 'Right. You picked 120.', graded: pascal, chosen: 'Yes', previous: null }).text).toBe('Right.')
  })

  it('leaves the real choice, praise and counts alone', () => {
    for (const text of ['You picked Yes, which is right.', 'Right, you chose correctly.', "Great — you've answered 2 questions correctly in a row."]) {
      expect(dropStaleQuestionAttribution({ text, graded: pascal, chosen: 'Yes', previous: committee }).dropped).toEqual([])
    }
    const r = dropStaleQuestionAttribution({ text: 'You chose (0, 1) — exactly right.', graded, chosen: '(0, 1)', previous: Q180 })
    expect(r.dropped).toEqual([])
  })
})

describe('when the one regeneration repeats the attribution', () => {
  // Production, 2026-10-03 09:36 UTC, after the first fix shipped: the dropped
  // sentence came back from the regeneration as this.
  const regenerated = 'Can you walk me through how you decided the point at 180° is (0, 1)?'

  it('the re-check catches the regenerated text', () => {
    expect(dropStaleQuestionAttribution({ text: regenerated, graded, chosen: '(0, 1)', previous: Q180 }).dropped).toHaveLength(1)
  })

  it('the replacement is built from the graded card and carries no stale number', () => {
    const t = confirmGradedAnswer(Q90, '(0, 1)')
    expect(t).toBe(`That's right — the answer to "${Q90}" is (0, 1).`)
    expect(t).not.toMatch(/180/)
    expect(dropStaleQuestionAttribution({ text: t, graded, chosen: '(0, 1)', previous: Q180 }).dropped).toEqual([])
  })

  it('degrades to the bare verdict without a question or answer', () => {
    expect(confirmGradedAnswer('', '(0, 1)')).toBe('That\'s right.')
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

  it('re-checks the regenerated text and falls back to the graded-card confirmation', () => {
    const afterRepair = block.slice(block.indexOf("repairStubReply(next, 'stale-question')"))
    expect(afterRepair).toMatch(/dropStaleQuestionAttribution\(\{ text: next, \.\.\.staleInput \}\)/)
    expect(afterRepair).toMatch(/confirmGradedAnswer\(staleInput\.graded\.question, staleInput\.chosen\)/)
  })

  it('runs after the repeat guard, before the reply is finalised', () => {
    expect(ROUTE.indexOf('A RIGHT ANSWER IS NOT CREDITED TO THE PREVIOUS QUESTION'))
      .toBeGreaterThan(ROUTE.indexOf('A PARAGRAPH THE LEARNER HAS ALREADY READ IS NOT SENT AGAIN'))
  })
})
