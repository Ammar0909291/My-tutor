/**
 * Remaining open CHEM defects fixed 2026-10-06. Every input is quoted from
 * docs/qa/CHEMISTRY_REAL_LEARNER_DEFECTS.md.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { toSecondPerson, separateGluedName } from '@/lib/text/secondPerson'
import { enforceQuestionDeliveryContract, dropDeferredPracticeOffer } from '@/lib/teaching/gateAssessment'
import { normalizeMathDelimiters } from '@/lib/text/mathDelimiters'
import { collapseEchoedGloss, plainNotation } from '@/lib/text/plainNotation'
import { stripMetaTalk } from '@/lib/teaching/reuseCaps'
import { readsAsRequestToTutor } from '@/lib/teaching/mcq'
import { stripLeadingFalseConfirmation } from '@/lib/teaching/answerConfirmation'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
const FB = 'In this lesson on Phenols we will look at acidity.'

describe('CHEM-018 / CHEM-144 feedback in the second person', () => {
  it('#77 sentence start', () => {
    expect(toSecondPerson('Not quite — the answer is: No. The learner assumed that a zero standard potential forces the cell voltage to be zero.'))
      .toBe('Not quite — the answer is: No. You assumed that a zero standard potential forces the cell voltage to be zero.')
  })
  it('mid-sentence "the student\'s explanation"', () => {
    expect(toSecondPerson('You picked the lone pair, and the student\'s explanation is incorrect about the rest.'))
      .toBe('You picked the lone pair, and your explanation is incorrect about the rest.')
    expect(toSecondPerson('This helps the student remember.')).toBe('This helps the student remember.')
  })
})

describe('CHEM-019 "explain simpler" is a request; the stale "That\'s right" opener goes', () => {
  it('is read as a request and the opening praise is stripped (CHEM-075 path)', () => {
    expect(readsAsRequestToTutor('explain simpler')).toBe(true)
    expect(stripLeadingFalseConfirmation("That's right — the –OH group in phenol pushes some of its lone‑pair electrons into the aromatic ring. Think of the benzene ring as a round table.")).not.toMatch(/^That's right/)
  })
})

describe('CHEM-020 / CHEM-061 / CHEM-078 promises with nothing to answer', () => {
  it('#151 "Here\'s a quick check—pick the statement…" with no card', () => {
    expect(enforceQuestionDeliveryContract("Here's a quick check—pick the statement that best explains why phenol is a stronger acid than ethanol.", FB)).toBe(FB)
  })
  it('#21 "Let\'s see if you can apply that reasoning." is removed', () => {
    const out = enforceQuestionDeliveryContract("You've built a solid foundation on how atomic and ionic radii behave. Let's see if you can apply that reasoning. Atoms shrink across a period.", FB)
    expect(out).toBe("You've built a solid foundation on how atomic and ionic radii behave. Atoms shrink across a period.")
  })
  it('#154 a reply that is only "…let me try a completely different angle." gets the fallback', () => {
    expect(enforceQuestionDeliveryContract('test0, this is genuinely tricky — let me try a completely different angle.', FB)).toBe(FB)
  })
  it('a lead-in followed by the explanation keeps the explanation', () => {
    expect(enforceQuestionDeliveryContract('Let me try a different angle. An epoxide ring is strained, so it opens easily.', FB)).toBe('An epoxide ring is strained, so it opens easily.')
  })
})

describe('CHEM-021 no "what would you like to do next" beside a card', () => {
  it('#77 sentences are dropped when a card is attached', () => {
    const t = "Great. Whenever you're ready, we can try a short practice problem or we can move on to the next idea. Let me know what you'd like to do next."
    expect(dropDeferredPracticeOffer(t, true)).toBe('Great.')
    expect(dropDeferredPracticeOffer(t, false)).toBe(t)
  })
})

describe('CHEM-066 "$0.450$" is a number, not money and not markup', () => {
  it('unwrapped', () => {
    expect(normalizeMathDelimiters('the display shows something like $0.450$ kilograms. That number $0.450$ has two parts'))
      .toBe('the display shows something like 0.450 kilograms. That number 0.450 has two parts')
  })
  it('money and maths unchanged', () => {
    expect(normalizeMathDelimiters('it costs $5 and $10')).toBe('it costs $5 and $10')
    expect(normalizeMathDelimiters('so $v_0$ here')).toBe('so \\(v_0\\) here')
  })
})

describe('CHEM-071 a gloss that repeats the name', () => {
  it('#118', () => {
    expect(collapseEchoedGloss('clear, colourless silicon tetrachloride (silicon tetrachloride) and hydrogen chloride (hydrogen chloride) gas'))
      .toBe('clear, colourless silicon tetrachloride and hydrogen chloride gas')
    expect(plainNotation('silicon tetrachloride (SiCl₄)')).toBe('silicon tetrachloride (SiCl₄)')
  })
})

describe('CHEM-093 the learner name glued to a word', () => {
  it('#82', () => {
    expect(separateGluedName('That gets straight to the heart of how electroplating workstest5! Think of a magnet.', 'test5'))
      .toBe('That gets straight to the heart of how electroplating works, test5! Think of a magnet.')
  })
  it('an ordinary word ending is never split', () => {
    expect(separateGluedName('It is in Japan!', 'an')).toBe('It is in Japan!')
    expect(separateGluedName('Great work, test5!', 'test5')).toBe('Great work, test5!')
  })
  it('route: applied to the final reply with the learner name', () => {
    expect(ROUTE).toMatch(/separateGluedName\(cleanText, profile\?\.displayName \?\? session\.user\.name \?\? null\)/)
  })
})

describe('CHEM-102 no invented session end mid-lesson', () => {
  it('#64 farewells are removed; the teaching stays', () => {
    const r = stripMetaTalk("You've put in a huge effort on buffers today. Since our session time is wrapping up, let's pause here so you can take a well-earned break. A buffer holds pH steady because the weak acid and its conjugate base absorb added acid or base. See you next time!")
    expect(r.text).toBe("You've put in a huge effort on buffers today. A buffer holds pH steady because the weak acid and its conjugate base absorb added acid or base.")
  })
})

describe('CHEM-002 a finished lesson gets the close only, no new card', () => {
  it('route: the card is withheld on the already-finished turn', () => {
    expect(ROUTE).toMatch(/mcqHoisted = gateMcqHoisted \?\? mcqParse\.mcq\n[\s\S]{0,600}if \(serveLessonComplete\) mcqHoisted = null/)
  })
})
