/**
 * Inline option runs and choice instructions with nothing to choose
 * (2026-09-28, physics certification unit 3, phys.therm.third-law r2 s11-s13).
 * A withheld model quiz left "Pick the statement that best captures it." and,
 * two turns running, a bare "A) … B) … C) … D) …" line with no question.
 */
import { describe, it, expect } from 'vitest'
import { withholdUngradedGateQuestion, dropAnswerableContent, dropUndeliveredCheckAnnouncements } from '@/lib/teaching/gateAssessment'

const RUN = 'A) Each cooling step always removes the same amount of entropy. B) As the temperature approaches zero, the entropy removed per step becomes smaller. C) The heat capacity grows without bound. D) Entropy is unaffected.'
const base = { hasStructuredMcq: false, questionOnScreen: false, gateSoughtThisTurn: true, conceptFallback: 'Third Law of Thermodynamics covers: absolute zero.' }

describe('inline option run', () => {
  it('is dropped with its question', () => {
    expect(dropAnswerableContent(`Cooling gets harder near absolute zero.\n\n${RUN}`)).toBe('Cooling gets harder near absolute zero.')
  })
  it('the withhold does not ship a bare option run at CHECK', () => {
    const r = withholdUngradedGateQuestion({ ...base, text: RUN, phase: 'CHECK' })
    expect(r.withheld).toBe(true)
    expect(r.text).not.toMatch(/\bB\)/)
  })
  it('a citation-style mention inside a sentence is untouched', () => {
    const t = 'We used part A) for background and part B) for the proof.'
    expect(dropAnswerableContent(t)).toBe(t)
  })
})

describe('an instruction to choose, with nothing to choose from', () => {
  it('"Pick the statement that best captures it." is dropped when no quiz follows', () => {
    expect(dropUndeliveredCheckAnnouncements('Nice work so far. Pick the statement that best captures it.')).toBe('Nice work so far.')
  })
  it('ordinary teaching that says "pick" is untouched', () => {
    const t = 'Engineers pick materials with a low heat capacity for this.'
    expect(dropUndeliveredCheckAnnouncements(t)).toBe(t)
  })
})
