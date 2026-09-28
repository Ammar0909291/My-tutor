/**
 * Options written as markdown bullets / bold are still option lines (2026-09-28,
 * physics certification, phys.mech.kinematics-1d r1 s9, production 1aa77824):
 * the ungraded-question withhold cut the question stem of a model-written
 * practice problem but kept "- **A)** 12 metres per second" and the rest, so the
 * learner saw four answers to no question.
 */
import { describe, it, expect } from 'vitest'
import { containsOptionList, enforceGateProbeContract } from '@/lib/teaching/gateProbeContract'
import { dropAnswerableContent, withholdUngradedGateQuestion } from '@/lib/teaching/gateAssessment'
import { hasProseMultipleChoice } from '@/lib/teaching/proseMcqGuard'

const TEACH = 'Great, you recognized that the car’s acceleration is negative when it’s slowing down while moving to the right.'
const PRODUCTION = `${TEACH}

Now let’s apply what you’ve just confirmed with a quick practice problem: a cyclist moving at 12 m/s brakes at 2 m/s² for 4 s. What is her final speed?

- **A)** 12 metres per second 
- **B)** 7 metres per second 
- **C)** 4 metres per second 
- **D)** 9 metres per second`

describe.each([
  ['bullet + bold', '- **A)** 12 m/s\n- **B)** 7 m/s'],
  ['bold only', '**A)** 12 m/s\n**B)** 7 m/s'],
  ['bullet only', '* A. 12 m/s\n* B. 7 m/s'],
  ['bold parenthesised', '**(A)** 12 m/s\n**(B)** 7 m/s'],
  ['plain (unchanged)', 'A) 12 m/s\nB) 7 m/s'],
])('%s', (_n, list) => {
  it('is an option list to every detector', () => {
    expect(containsOptionList(list)).toBe(true)
    expect(hasProseMultipleChoice(list)).toBe(true)
    expect(dropAnswerableContent(`Setup line.\n\n${list}`)).toBe('Setup line.')
  })
})

describe('not an option list', () => {
  it.each([
    '- Always write the unit.\n- Keep the sign convention.',
    '**A car** moves at 12 m/s.\n**B**ut it slows down.',
    '- A single lettered aside) here',
  ])('%s', (t) => expect(containsOptionList(t)).toBe(false))
})

describe('the production turn', () => {
  it('the withhold keeps the teaching and strands no options', () => {
    const r = withholdUngradedGateQuestion({ text: PRODUCTION, phase: 'CHECK', hasStructuredMcq: false, questionOnScreen: false, gateSoughtThisTurn: true, conceptFallback: 'x' })
    expect(r.withheld).toBe(true)
    expect(r.text).toBe(TEACH)
  })
  it('with a canonical probe attached, the model list is still recognised as competing', () => {
    const r = enforceGateProbeContract({ text: PRODUCTION, leadIn: null, canonicalQuestion: 'What does the negative sign of the acceleration mean?' })
    expect(r).toMatchObject({ replaced: true, reason: 'model_wrote_own_options' })
    expect(r.text).not.toMatch(/\*\*A\)\*\*/)
  })
})
