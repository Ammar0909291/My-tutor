/**
 * The answer-leak guard (dropAnswerLeaks) removes a line that states the
 * correct option. When the model wrote that answer as display math on its own
 * line, the block's delimiters stayed and the sentence introducing it ended
 * mid-thought. Measured in production (QA, 2026-10-03, math.de.separable), the
 * learner saw:
 *
 *   "…the x terms to the right, the equation becomes\n\n\[\n\]\n\nNow we
 *    integrate each side."
 *
 * above the card "Separating dy/dx = x/y gives which equation?" (correct:
 * "y dy = x dx").
 */
import { describe, it, expect } from 'vitest'
import { dropAnswerLeaks } from '@/lib/teaching/gateAssessment'
import type { TutorMCQ } from '@/lib/teaching/mcq'

const mcq = {
  question: 'Separating dy/dx = x/y gives which equation?',
  options: ['dy/y = x dx', 'dy = (x/y) dx', 'y dy = x dx', 'y dx = x dy'],
  correctIndex: 2,
} as TutorMCQ
const TITLE = 'Separable Differential Equation'

describe('an emptied display-math block is removed with its lead-in', () => {
  it('the measured production text', () => {
    const text = 'When we move the y terms to the left and the x terms to the right, the equation becomes\n\n\\[\ny\\,dy = x\\,dx\n\\]\n\nNow we integrate each side. The left side gives \\(\\int y\\,dy\\).'
    const r = dropAnswerLeaks(text, mcq, TITLE)
    expect(r.text).toBe('Now we integrate each side. The left side gives \\(\\int y\\,dy\\).')
    expect(r.text).not.toMatch(/\\\[\s*\\\]/)
    expect(r.dropped).toContain('When we move the y terms to the left and the x terms to the right, the equation becomes')
  })

  it('keeps earlier complete sentences of the lead-in paragraph', () => {
    const text = 'Start from dy/dx = x/y. Multiplying both sides by y dx gives:\n\\[\ny\\,dy = x\\,dx\n\\]\nThen integrate.'
    expect(dropAnswerLeaks(text, mcq, TITLE).text).toBe('Start from dy/dx = x/y.\n\nThen integrate.')
  })

  it('$$ … $$ blocks too', () => {
    const text = 'The separated form is\n\n$$\ny\\,dy = x\\,dx\n$$\n\nIntegrate both sides.'
    expect(dropAnswerLeaks(text, mcq, TITLE).text).toBe('Integrate both sides.')
  })

  it('a lead-in that is already a full sentence stays', () => {
    const text = 'We separate the variables.\n\n\\[\ny\\,dy = x\\,dx\n\\]\n\nIntegrate both sides.'
    expect(dropAnswerLeaks(text, mcq, TITLE).text).toBe('We separate the variables.\n\nIntegrate both sides.')
  })

  it('a display block that does not state the answer is untouched', () => {
    const text = 'Integrating gives\n\n\\[\n\\tfrac12 y^2 = \\tfrac12 x^2 + C\n\\]\n\nwhich is the implicit solution.'
    expect(dropAnswerLeaks(text, mcq, TITLE)).toEqual({ text, dropped: [] })
  })
})
