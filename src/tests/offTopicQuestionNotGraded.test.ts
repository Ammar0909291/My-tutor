/**
 * AN OFF-TOPIC QUESTION IS NOT AN ANSWER TO THE QUIZ ON SCREEN (2026-09-28).
 *
 * A/B test (production, Groq arm, phys.em.electric-charge, slot 10): with a quiz
 * pending, the learner asked an unrelated friction question. The reply opened
 * "Not quite — the answer is: Two" — the key of the PENDING "how many excess
 * electrons?" probe. The re-check run reproduced the mirror image: the same
 * question, graded against "rod and cloth, total charge?", produced
 * PROBE_OUTCOME pass, "That's right." and a spent probe. Both are one defect:
 * the grader's vocabulary rules read a long question as an attempt. The
 * correction/confirmation text was faithful to that wrong grade.
 */
import { describe, expect, it } from 'vitest'
import { engagesPendingOptions, gradeMcqAnswer, isLongQuestion } from '@/lib/teaching/mcq'
import { probeToMcq } from '@/lib/teaching/gateAssessment'
import { PHYSICS_DEPTH_PROBES } from '@/lib/teaching/assets/physicsDepthSeedAssets'

const OFF_TOPIC = 'A 4 kg box on a level floor starts to slide only when a horizontal push exceeds 20 N. What is the coefficient of static friction? (g = 10 m/s^2)'

const RUBBING = {
  question: 'PRACTICE: Before rubbing, a rod and a cloth are both neutral. After rubbing, the rod carries -40e. What is the TOTAL charge of rod and cloth together?',
  options: ['About -40e — the rubbing generated new charge on the rod', 'Still exactly zero — the cloth is now +40e, because rubbing only TRANSFERS electrons from one surface to the other. Charge is conserved, never manufactured'],
  correctIndex: 1,
}
const excess = PHYSICS_DEPTH_PROBES.find((p) => p.stem.startsWith('An object carries a net charge of −3.2 × 10⁻¹⁹ C'))!
const EXCESS = probeToMcq({ stem: excess.stem, choices: excess.choices! })!

describe('the off-topic question is not graded', () => {
  it('against the rubbing probe (was: graded CORRECT — false credit)', () => {
    expect(gradeMcqAnswer(OFF_TOPIC, RUBBING)).toEqual({ chosenIndex: null, correct: null })
  })
  it('against the excess-electrons probe (was: "Not quite — the answer is: Two")', () => {
    expect(gradeMcqAnswer(OFF_TOPIC, EXCESS)).toEqual({ chosenIndex: null, correct: null })
  })
  it('and the re-offer lead-in agrees it did not reach for an option', () => {
    expect(engagesPendingOptions(OFF_TOPIC, RUBBING)).toBe(false)
  })
})

describe('answers are still graded', () => {
  it('a tapped option, verbatim', () => {
    expect(gradeMcqAnswer('Two', EXCESS).correct).toBe(true)
    expect(gradeMcqAnswer(RUBBING.options[1], RUBBING).correct).toBe(true)
  })
  it('a letter is graded; an ordinal, a short phrase, a statement are not (GB+ choice-only)', () => {
    // BEFORE: all four were graded B. AFTER (approved GB+ spec): only an explicit
    // letter or exact option text is an answer; the other three are left ungraded.
    expect(gradeMcqAnswer('B', RUBBING)).toEqual({ chosenIndex: 1, correct: true })
    for (const m of ['the second one', 'still zero, charge is conserved', 'I think it is still exactly zero because charge is conserved'])
      expect(gradeMcqAnswer(m, RUBBING), m).toEqual({ chosenIndex: null, correct: null })
  })
  it('the accepted cost: a hedge phrased as a long question is left ungraded, not guessed', () => {
    // Same trade engagesPendingOptions already makes: no credit, no penalty, the
    // probe stays pending. A wrong guess is what this whole fix removes.
    expect(gradeMcqAnswer('Is it still exactly zero because the charge is only transferred between them?', RUBBING).correct).toBeNull()
  })
})

describe('isLongQuestion', () => {
  it('more than six words ending in "?", optionally with one trailing parenthetical', () => {
    expect(isLongQuestion(OFF_TOPIC)).toBe(true)
    expect(isLongQuestion('What is the coefficient of static friction here?')).toBe(true)
    expect(isLongQuestion('is it two?')).toBe(false)
    expect(isLongQuestion('The answer is two, I think (not sure)')).toBe(false)
    expect(isLongQuestion('What is it? I think it is two electrons')).toBe(false)
  })
})
