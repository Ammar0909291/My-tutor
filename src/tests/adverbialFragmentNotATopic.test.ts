/**
 * M1 — an ordinary adverb that is one conjunct of a longer title must not move
 * the teaching target or replace the lesson's own figure.
 *
 * Reproduced in production (six-lesson QA run, 2026-10-15), lesson
 * `math.real.convergence-sequences`:
 *
 *   "what does converge even mean, the terms just get small?"
 *
 * "Even" is a TITLE_COMPONENT (0.8) of `math.func.even-odd-functions`
 * ("Even and Odd Functions"). The lesson's convergence figure was replaced by
 * the even/odd one. The sentence with "really" in place of "even" resolved to
 * nothing, which is how the defect stayed hidden: `isIncidentalWord` lets a
 * one-word match through when a request cue ("what") is within three tokens.
 */
import { describe, it, expect } from 'vitest'
import { resolveRequestedConceptId } from '@/lib/teaching/concept/requestedConcept'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { detectLearnerRequest } from '@/lib/teaching/masteryGate'

const LESSON = 'math.real.convergence-sequences'
const EVEN_ODD = 'math.func.even-odd-functions'

const BAD = 'what does converge even mean, the terms just get small?'

describe('M1 · "even" inside an unrelated question is not a topic', () => {
  it('does not resolve the lesson message to Even and Odd Functions', () => {
    expect(resolveRequestedConceptId(BAD, LESSON, 'mathematics')).toBeNull()
  })

  it('behaves exactly like the same sentence without the adverb', () => {
    const control = 'what does converge really mean, the terms just get small?'
    expect(resolveRequestedConceptId(control, LESSON, 'mathematics')).toBeNull()
    expect(resolveRequestedConceptId(BAD, LESSON, 'mathematics'))
      .toBe(resolveRequestedConceptId(control, LESSON, 'mathematics'))
  })

  it('keeps the lesson figure for the reproduction message', () => {
    const d = resolveVisual({
      subject: 'mathematics', message: BAD, lessonConceptId: LESSON,
      learnerRequest: detectLearnerRequest(BAD),
    })
    expect(d.conceptId).toBe(LESSON)
    expect(d.excursion).toBe(false)
  })

  it.each([
    'even if the terms get small, does it converge?',
    'is it even possible for a sequence to oscillate?',
  ])('does not move the target for "%s"', (message) => {
    expect(resolveRequestedConceptId(message, LESSON, 'mathematics')).toBeNull()
  })
})

describe('M1 · a genuine request for even/odd functions still resolves', () => {
  it.each([
    'show me even and odd functions',
    'teach me even and odd functions',
    'what is an even function',
  ])('"%s"', (message) => {
    expect(resolveRequestedConceptId(message, LESSON, 'mathematics')).toBe(EVEN_ODD)
  })

  it('still opens the even/odd figure as an excursion when asked for by name', () => {
    const message = 'show me even and odd functions'
    const d = resolveVisual({
      subject: 'mathematics', message, lessonConceptId: LESSON,
      learnerRequest: detectLearnerRequest(message),
    })
    expect(d.conceptId).toBe(EVEN_ODD)
  })
})
