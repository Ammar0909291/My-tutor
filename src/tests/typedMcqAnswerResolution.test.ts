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
 *
 * ── FOLLOW-UP (post-8adaffe validation, 2026-09): "A BECAUSE <REASON>" ─────
 * A second, narrower gap in the SAME function, found in a follow-up
 * real-student session: "A because they use different tenses" and "A
 * because as here means while" both refused to resolve, while "B
 * because ..." (any non-'a' letter) always worked. Root cause: rule 1's
 * `atEdge` shortcut (bare letter is the first token) is deliberately
 * excluded for 'a' — see the module's own history above — so a leading "A"
 * needed `insideAStatedAnswer`, which ALSO requires an explicit first-person
 * phrase ("I think"/"my answer is"/…). A bare reason clause states nothing
 * about the learner, so it fell through every rule. Fixed by recognising
 * that `cannotFollowAnArticle` (already used two other places in this same
 * function) is BY ITSELF sufficient evidence a leading "A" is the letter,
 * independent of whether a first-person phrase is also present — "a car"/"a
 * good answer" still refuse, because "car"/"good" genuinely can follow an
 * article and the ambiguity is real. See the new describe block below.
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

describe('"A because <reason>" resolves with no first-person marker required', () => {
  const YES_NO_MCQ: TutorMCQ = {
    question: 'Does "won" mean it already happened?',
    options: [
      'No — the second conditional uses past-tense FORM to signal a hypothetical situation',
      'Yes — using "won" means the speaker is describing something that already happened',
    ],
  }

  it('the exact measured production repro: "A because they use different tenses"', () => {
    expect(resolveMcqChoice('A because they use different tenses', YES_NO_MCQ)).toBe(0)
  })

  it('a second measured production repro: "A because as here means while"', () => {
    expect(resolveMcqChoice('A because as here means while', YES_NO_MCQ)).toBe(0)
  })

  it('"A but ..." — another CANNOT_FOLLOW_AN_ARTICLE word after a leading A', () => {
    expect(resolveMcqChoice('A but i am not fully sure', YES_NO_MCQ)).toBe(0)
  })

  it('"B because ..." already worked and keeps working (no regression)', () => {
    expect(resolveMcqChoice('B because it doesn\'t mean past time', YES_NO_MCQ)).toBe(1)
  })

  it('"I think A because ..." still resolves via the pre-existing first-person path', () => {
    expect(resolveMcqChoice('I think A because reasons', YES_NO_MCQ)).toBe(0)
  })

  it('"my answer is A because ..." still resolves via the pre-existing first-person path', () => {
    expect(resolveMcqChoice('my answer is A because reasons', YES_NO_MCQ)).toBe(0)
  })

  it('bare "A" alone is unaffected', () => {
    expect(resolveMcqChoice('A', YES_NO_MCQ)).toBe(0)
  })

  it('"A sir" / "a sir" — a QA-harness artifact with no reasoning content — still refuses (mcqAnswerShapeIsTheClients.test.ts\'s own pin, guarded here too)', () => {
    expect(resolveMcqChoice('A sir', YES_NO_MCQ)).toBeNull()
    expect(resolveMcqChoice('a sir', YES_NO_MCQ)).toBeNull()
  })
})

describe('negative controls: ordinary uses of the article "a" still refuse', () => {
  const CAR_MCQ: TutorMCQ = {
    question: 'Which is faster?',
    options: ['A red car', 'A blue bike'],
  }

  it('"a car" alone is not graded as choosing option A', () => {
    expect(resolveMcqChoice('a car', CAR_MCQ)).toBeNull()
  })

  it('"a good answer" is not graded as choosing option A', () => {
    expect(resolveMcqChoice('a good answer', CAR_MCQ)).toBeNull()
  })

  it('the pinned "a dimension is about quantity" false-positive guard still holds', () => {
    const mcq: TutorMCQ = {
      question: 'What is a dimension?',
      options: ['A quantity used to describe a system', 'A unit of measurement', 'A symbol', 'A formula'],
    }
    expect(resolveMcqChoice('a dimension is about quantity', mcq)).toBeNull()
  })

  it('"I think a lens bends light" still refuses (article mid-sentence, not the leading-letter shape) — options chosen with no textual overlap so an unrelated containment rule cannot be the one resolving it', () => {
    const mcq: TutorMCQ = {
      question: 'What is the correct term?',
      options: ['Refraction is the correct term', 'Reflection is the correct term', 'Diffraction is the correct term', 'Absorption is the correct term'],
    }
    expect(resolveMcqChoice('I think a lens bends light', mcq)).toBeNull()
  })
})
