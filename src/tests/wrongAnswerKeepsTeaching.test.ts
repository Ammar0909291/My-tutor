/**
 * MEASURED LIVE 2026-09-30 (phys.meas.units, deployment 76916f3b): a wrong tap
 * on "4.7 × 10⁶ F" shipped as the bare "Not quite — the answer is: 4.7 × 10⁻⁶ F".
 * Groq had returned a 148-character reply; its one sentence used "correct" /
 * "exactly" about the physics, was mistaken for false praise, and was deleted.
 * The same tap was also read as UNINTERPRETABLE by the learner-move reading,
 * though grading resolved it. Both are pinned here.
 */
import { describe, it, expect } from 'vitest'
import { stateCorrectionForWrongAnswer } from '@/lib/teaching/wrongAnswerCorrection'
import { stripLeadingFalseConfirmation, affirmsTheLearner } from '@/lib/teaching/answerConfirmation'
import { engagesPendingOptions, resolveMcqChoice, type TutorMCQ } from '@/lib/teaching/mcq'

const probe = { question: 'A component is labelled 4.7 µF. Written in farads, what is that?', options: ['4.7 × 10⁶ F', '4.7 × 10⁻⁹ F', '4.7 × 10⁻⁶ F', '4.7 × 10⁻³ F'], correctIndex: 2 } as TutorMCQ

describe('a wrong answer keeps the tutor\'s one-sentence explanation', () => {
  it.each([
    'The correct conversion uses micro = 10⁻⁶, so 4.7 µF is 4.7 × 10⁻⁶ farads.',
    'Micro means one millionth, which is exactly 10⁻⁶.',
    'The correct value comes from micro meaning 10⁻⁶.',
  ])('%s', (reply) => {
    const r = stateCorrectionForWrongAnswer({ text: reply, correct: false, probe })
    expect(r.text).toBe(`Not quite — the answer is: 4.7 × 10⁻⁶ F\n\n${reply}`)
  })

  it('genuine false praise is still removed', () => {
    for (const praise of ['Great, you got it!', 'Correct!', 'Exactly right.', "That's right.", 'Yes, well done.', 'Perfect.']) {
      expect(affirmsTheLearner(praise), praise).toBe(true)
      expect(stripLeadingFalseConfirmation(`${praise} Micro means 10⁻⁶.`)).toBe('Micro means 10⁻⁶.')
    }
  })
})

describe('a tapped option is an answer attempt, even when every word is shared', () => {
  it('every numeric option engages and grades to itself', () => {
    probe.options.forEach((o, i) => {
      expect(engagesPendingOptions(o, probe), o).toBe(true)
      expect(engagesPendingOptions(`${o}.`, probe), o).toBe(true)
      expect(resolveMcqChoice(o, probe)).toBe(i)
    })
  })

  it('an unrelated message still does not engage', () => {
    expect(engagesPendingOptions('can you explain micro again', probe)).toBe(false)
    expect(engagesPendingOptions('4.7', probe)).toBe(false)
  })
})
