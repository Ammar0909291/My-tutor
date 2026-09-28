/**
 * A WRONG ANSWER IS NEVER PRAISED.
 *
 * MEASURED on production (Biology, bio.physio.exercise-physiology,
 * 2026-09-27): the learner answered a model-invented quiz wrongly
 * ("hypertrophy" for chronic AEROBIC training), the server graded it wrong and
 * stepped the ladder back — and the reply was "Great, you've spotted the
 * hypertrophy adaptation." The unbacked-praise stripper existed but did not
 * recognise identification praise.
 */
import { describe, expect, it } from 'vitest'
import { stripLeadingFalseConfirmation } from '@/lib/teaching/answerConfirmation'
import { stateCorrectionForWrongAnswer } from '@/lib/teaching/wrongAnswerCorrection'

describe('identification praise is recognised as a claim of correctness', () => {
  it('the measured reply is stripped (curly apostrophe as the tutor writes it)', () => {
    expect(stripLeadingFalseConfirmation('Great, you’ve spotted the hypertrophy adaptation.')).toBe('')
    expect(stripLeadingFalseConfirmation("Great, you've spotted the hypertrophy adaptation. Now look at the figure."))
      .toBe('Now look at the figure.')
  })

  it('other identification praise', () => {
    for (const t of ['Well spotted! Next step.', 'Good catch. Next step.', 'Nice, you identified the stage. Next step.', 'Excellent, you have correctly identified it. Next step.'])
      expect(stripLeadingFalseConfirmation(t), t).toBe('Next step.')
  })

  it('ordinary teaching prose is untouched', () => {
    for (const t of ['Hypertrophy follows resistance training. Aerobic training raises mitochondrial density.', 'Look at the figure: you can find the stages in order.'])
      expect(stripLeadingFalseConfirmation(t), t).toBe(t)
  })
})

describe('a correction never sits on top of praise', () => {
  it('drops the opening praise when prepending the authored correction', () => {
    const r = stateCorrectionForWrongAnswer({
      text: "Great, you've spotted the hypertrophy adaptation. Aerobic training works differently.",
      correct: false,
      probe: { question: 'Which adaptation is characteristic of chronic aerobic training?', options: ['Hypertrophy', 'Increased mitochondrial density'], correctIndex: 1 },
    } as never)
    expect(r.added).toBe(true)
    expect(r.text).toBe('Not quite — the answer is: Increased mitochondrial density\n\nAerobic training works differently.')
  })
})
