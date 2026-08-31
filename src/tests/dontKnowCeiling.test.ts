/**
 * Owner-reported, from a live second-law lesson: four "I don't know"s in a row,
 * and the tutor kept asking. "If I would have not replied it then it could be
 * eternal."
 *
 * The turns below are the real ones from that transcript.
 */
import { readFileSync } from 'fs'
import { describe, it, expect } from 'vitest'
import { applyDontKnowCeiling, DONT_KNOW_QUESTION_CEILING } from '@/lib/teaching/dontKnowCeiling'

const PURE_QUESTION = 'What do you notice about the shape of the histogram in the figure?'
const TEACH_THEN_ASK =
  'The second law says entropy tends to increase because there are vastly more ways '
  + 'for a system to be in a high-entropy state than a low-entropy one. '
  + 'Which part of the histogram in the figure shows which outcome is most likely?'
const TEACH_ONLY =
  'The tallest bar in the histogram is the outcome that shows up most often. '
  + 'The other bars are lower, meaning those states are less likely.'

const PROBE = {
  question: 'Why is the second law considered a statistical statement?',
  options: [
    'It is a direct consequence of the conservation of energy.',
    'It arises from the fact that all microscopic processes are irreversible.',
    'It follows from the vastly greater number of high-entropy microstates compared to low-entropy ones.',
  ],
  correctIndex: 2,
}
const at = (n: number, text: string, pendingMcq: typeof PROBE | null = PROBE) =>
  applyDontKnowCeiling({ text, recoveryKey: 'dont_know', consecutiveDontKnows: n, pendingMcq })

describe('the ceiling stops the questioning', () => {
  it('keeps the teaching and drops the question on the second don\'t-know', () => {
    const r = at(2, TEACH_THEN_ASK)
    expect(r.withheld).toBe(true)
    expect(r.text).toContain('vastly more ways')
    expect(r.text).not.toContain('Which part of the histogram')
  })

  it('reveals the answer when the turn was NOTHING but a question', () => {
    const r = at(3, PURE_QUESTION)
    expect(r.reason).toBe('answer-revealed')
    expect(r.text).toContain('high-entropy microstates')
    expect(r.text).not.toContain('?')
  })

  it('the reveal is the authored key, never invented', () => {
    const r = at(3, PURE_QUESTION)
    expect(r.text).toContain(PROBE.options[PROBE.correctIndex])
    for (const wrong of [PROBE.options[0], PROBE.options[1]]) {
      expect(r.text).not.toContain(wrong)
    }
  })

  it('the loop the owner described cannot continue past the ceiling', () => {
    for (const n of [2, 3, 4, 9]) {
      expect(at(n, PURE_QUESTION).text).not.toContain('?')
      expect(at(n, TEACH_THEN_ASK).text).not.toContain('?')
    }
  })
})

describe('NEGATIVE CONTROLS — one shrink-and-retry is good teaching', () => {
  it('does NOT fire on the first don\'t-know', () => {
    const r = at(1, TEACH_THEN_ASK)
    expect(r.withheld).toBe(false)
    expect(r.reason).toBe('below-ceiling')
    expect(r.text).toBe(TEACH_THEN_ASK)
  })

  it('leaves a turn that asks nothing completely alone', () => {
    const r = at(4, TEACH_ONLY)
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(TEACH_ONLY)
  })

  it('does not fire on any other failure state', () => {
    for (const key of ['scared', 'forgot', 'guessing', 'frustrated', null]) {
      const r = applyDontKnowCeiling({
        text: TEACH_THEN_ASK, recoveryKey: key, consecutiveDontKnows: 5, pendingMcq: PROBE,
      })
      expect(r.withheld).toBe(false)
      expect(r.text).toBe(TEACH_THEN_ASK)
    }
  })

  it('never ships a content-free hold — the sentence that opened the transcript', () => {
    // No teaching to keep and no key to reveal: leave the turn as it is rather
    // than inventing "Let's stay with this idea for a moment."
    const r = at(3, PURE_QUESTION, null)
    expect(r.text).toBe(PURE_QUESTION)
    expect(r.text).not.toMatch(/stay with this idea|take a moment/i)
  })

  it('reveals nothing when the key is missing or out of range', () => {
    for (const mcq of [
      { options: ['a', 'b'], correctIndex: 5 },
      { options: ['a', 'b'], correctIndex: -1 },
      { options: [], correctIndex: 0 },
      { correctIndex: 0 },
    ] as Array<{ options?: string[]; correctIndex?: number }>) {
      const r = applyDontKnowCeiling({
        text: PURE_QUESTION, recoveryKey: 'dont_know', consecutiveDontKnows: 3, pendingMcq: mcq,
      })
      expect(r.reason).not.toBe('answer-revealed')
    }
  })

  it('survives hostile input without throwing', () => {
    for (const n of [NaN, -1, Infinity]) {
      expect(() => applyDontKnowCeiling({
        text: PURE_QUESTION, recoveryKey: 'dont_know', consecutiveDontKnows: n, pendingMcq: PROBE,
      })).not.toThrow()
    }
  })
})

describe('the route applies it', () => {
  const route = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
  it('is wired on the shipping text path', () => {
    expect(route).toMatch(/applyDontKnowCeiling/)
    expect(route).toMatch(/cleanText = ceiling\.text/)
  })
})
