/**
 * NATURAL TYPED MCQ ANSWERS MUST RESOLVE RELIABLY.
 *
 * ── MEASURED (real-student session, 2026-09, live production account) ───────
 * A learner typed "B, if i had a car i would drive to work" — a clearly
 * labelled option, restated verbatim right after the letter — and the server
 * replied "I couldn't tell which option your answer matched," re-serving the
 * identical question. This is the exact "I1" class of defect the codebase
 * already fixed several times over (see mcq.ts's own extensive history), but
 * a new, previously-unmeasured trigger.
 *
 * ── ROOT CAUSE, TRACED ────────────────────────────────────────────────────
 * "a" is both an option key AND the English indefinite article, and TWO
 * separate places in `resolveMcqChoice` treat every standalone "a" as a
 * potential named option letter with no article guard:
 *
 *   1. Rule 0a's labelled-letter regex. "had a car" makes an UNLABELLED "a"
 *      count as a second named option, so "B, if i had a car..." reads as
 *      naming BOTH A and B — defeating the "exactly one labelled, exactly
 *      one named" shortcut that would otherwise return B outright.
 *   2. The `namedStandalone` precondition a few lines below rule 0a, built
 *      from the normalised token array with no article check at all — so
 *      "B because i had a car" (no punctuation after B, so rule 0a's own
 *      shortcut never applies) still gets refused as naming two options.
 *
 * `cannotFollowAnArticle` already existed for exactly this ambiguity (rule
 * 1's own guard against "a dimension is about quantity"/"I think a lens
 * bends light") — both sites now reuse it rather than re-deriving it.
 *
 * ── WHAT DID NOT CHANGE ───────────────────────────────────────────────────
 * A LABELLED "a" ("A.", "a,", "a)") is untouched — punctuation already
 * disambiguated it from the article, so "A or B, i am not sure" still names
 * both and is still refused as ambiguous (pinned below). Every existing
 * grading rule, threshold and refusal is otherwise unchanged.
 */
import { describe, it, expect } from 'vitest'
import { resolveMcqChoice } from '@/lib/teaching/mcq'
import type { TutorMCQ } from '@/lib/teaching/mcq'

const CONDITIONAL_MCQ: TutorMCQ = {
  question: 'Which of the following is a second conditional?',
  options: [
    'If I will finish early, I will go to the gym.',
    'If I had a car, I would drive to work.',
    'If you study hard, you will pass the test.',
    'If she is late, we will start without her.',
  ],
}

describe('the required natural typed forms all resolve', () => {
  it('bare letter: "B"', () => {
    expect(resolveMcqChoice('B', CONDITIONAL_MCQ)).toBe(1)
  })

  it('labelled + restated verbatim: "B, if i had a car i would drive to work" (the measured production repro)', () => {
    expect(resolveMcqChoice('B, if i had a car i would drive to work', CONDITIONAL_MCQ)).toBe(1)
  })

  it('"I think B"', () => {
    expect(resolveMcqChoice('I think B', CONDITIONAL_MCQ)).toBe(1)
  })

  it('"my answer is B"', () => {
    expect(resolveMcqChoice('my answer is B', CONDITIONAL_MCQ)).toBe(1)
  })

  it('"B because ..." with the option\'s own article inside the reasoning', () => {
    expect(resolveMcqChoice('B because i had a car', CONDITIONAL_MCQ)).toBe(1)
  })

  it('exact option text', () => {
    expect(resolveMcqChoice('If I had a car, I would drive to work.', CONDITIONAL_MCQ)).toBe(1)
  })

  it('lowercase, no trailing period', () => {
    expect(resolveMcqChoice('if i had a car i would drive to work', CONDITIONAL_MCQ)).toBe(1)
  })
})

describe('the "a" article fix does not touch a genuine option A', () => {
  it('a labelled "A." still resolves to option A even beside an unrelated article', () => {
    expect(resolveMcqChoice('A. because a car would help', CONDITIONAL_MCQ)).toBe(0)
  })

  it('"I think A" still resolves to option A', () => {
    expect(resolveMcqChoice('I think A', CONDITIONAL_MCQ)).toBe(0)
  })
})

describe('ambiguous answers are still correctly refused, not guessed', () => {
  it('"A or B, i am not sure" still names both and refuses (unchanged pinned behaviour)', () => {
    expect(resolveMcqChoice('A or B, i am not sure', CONDITIONAL_MCQ)).toBeNull()
  })

  it('two labelled letters still refuse', () => {
    expect(resolveMcqChoice('A. or B.', CONDITIONAL_MCQ)).toBeNull()
  })

  it('the classic false-positive guard: "a dimension is about quantity" style still refuses on an unrelated MCQ', () => {
    const mcq: TutorMCQ = {
      question: 'What is a dimension?',
      options: ['A quantity used to describe a system', 'A unit of measurement', 'A symbol', 'A formula'],
    }
    expect(resolveMcqChoice('a dimension is about quantity', mcq)).toBeNull()
  })

  it('a hedge ("not sure") still blocks grading even when a letter follows', () => {
    expect(resolveMcqChoice('not sure, but maybe B', CONDITIONAL_MCQ)).toBeNull()
  })

  it('a bare question is still refused, not banked as an answer', () => {
    expect(resolveMcqChoice('B? can you explain?', CONDITIONAL_MCQ)).toBeNull()
  })
})

describe('every other option key is unaffected (only "a" is also an article)', () => {
  const mcq: TutorMCQ = {
    question: 'Pick one',
    options: ['first option text', 'second option text', 'third option text', 'fourth option text'],
  }

  it('"C, because it fits" resolves to C', () => {
    expect(resolveMcqChoice('C, because it fits', mcq)).toBe(2)
  })

  it('"D because it matches" resolves to D', () => {
    expect(resolveMcqChoice('D because it matches', mcq)).toBe(3)
  })
})
