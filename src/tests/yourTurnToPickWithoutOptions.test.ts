/**
 * "Your turn to pick the answer!" with nothing to pick from.
 *
 * Live, 2026-09-27, bio.gen.mendelian-genetics, PRACTICE, no card on screen: the
 * reply closed with "Your turn to pick the answer!" and offered no options.
 * `dropSentencesPointingAtMissingOptions` now drops that sentence — and ONLY
 * that form. The broader "pick an option" / "choose the option" (parked in
 * 38609b7f) can be ordinary teaching prose, so this file also pins that such
 * prose is left alone.
 */
import { describe, it, expect } from 'vitest'
import { dropSentencesPointingAtMissingOptions, enforceQuestionDeliveryContract } from '@/lib/teaching/gateAssessment'

const TEACHING = 'A plant with genotype Tt shows the dominant trait, so it is tall. Crossing two Tt plants gives a 3 : 1 ratio.'

describe('"your turn to pick the answer" is a promise of options', () => {
  it.each([
    'Your turn to pick the answer!',
    'Your turn to choose an option.',
    "It's your turn to select the correct answer.",
    'Your turn to pick the best choice!',
  ])('drops "%s" and keeps the teaching before it', (promise) => {
    expect(dropSentencesPointingAtMissingOptions(`${TEACHING} ${promise}`)).toBe(TEACHING)
  })

  it('a reply that was only the promise falls back instead of shipping empty', () => {
    expect(enforceQuestionDeliveryContract('Your turn to pick the answer!', 'FALLBACK')).toBe('FALLBACK')
  })

  it('a question that carries its own options is left alone', () => {
    const t = 'Your turn to pick the answer!\nA) Tall\nB) Short\nC) Both'
    expect(dropSentencesPointingAtMissingOptions(t)).toBe(t)
  })
})

describe('ordinary teaching prose is NOT dropped', () => {
  it.each([
    'In a multiple-choice question, choose the option that fits your reasoning first.',
    'When you pick an option, check it against the rule you just learned.',
    'Your turn to pick a number between 1 and 10.',
    'Select the answer you trust after you have checked each case.',
  ])('keeps "%s"', (sentence) => {
    const t = `${TEACHING} ${sentence}`
    expect(dropSentencesPointingAtMissingOptions(t)).toBe(t)
  })
})
