/**
 * REAL-STUDENT REPORT, Chemistry Lesson 2 (States of Matter).
 *
 * The learner correctly answered the evaporation checkpoint probe:
 *
 *   "Evaporation happens at ANY temperature, from the surface…"
 *
 * The tutor's reply then read:
 *
 *   "That's right. A) The particles split into H₂ and O₂"
 *
 * Read naively this looks like a wrong option being confirmed as correct.
 * Investigated end to end (learner response -> pending probe -> server
 * grading -> selected option -> feedback assembly), reproduced 3 ways live
 * against the deployed app with a disposable QA account (verbatim tap,
 * wrong-then-right, typed paraphrase): in every reproduction, grading was
 * CORRECT — `gradeMcqAnswer` graded against the evaporation probe's own two
 * options only, and "That's right." was earned. The "H₂ and O₂" text does
 * not even belong to the evaporation probe: it is the wrong distractor of a
 * DIFFERENT authored probe for the same concept (ice-melt). The exact
 * completion could not be forced (real, non-deterministic LLM variance), but
 * the mechanism is confirmed by inspection: the model free-associated a new,
 * unauthorized multiple-choice item while composing its reaction sentence,
 * and the completion ended after exactly one option — a shape
 * `hasProseMultipleChoice` cannot see, because it deliberately requires 2-4
 * distinct lettered options (a genuine, if unauthorized, askable question)
 * before it acts. A single un-continued option is never askable at all, and
 * `stripDanglingLeadingOption` (proseMcqGuard.ts) is the fix: it removes
 * exactly that narrower, unambiguous shape, leaving a real prose MCQ (2-4
 * options) completely untouched, matching existing policy.
 *
 * This file also serves as the negative-control suite required for the
 * quiz-integrity investigation: proof that grading is structurally incapable
 * of crediting an option from a DIFFERENT question/probe.
 */
import { describe, it, expect } from 'vitest'
import { stripDanglingLeadingOption, hasProseMultipleChoice } from '@/lib/teaching/proseMcqGuard'
import { gradeMcqAnswer, resolveMcqChoice, type TutorMCQ } from '@/lib/teaching/mcq'
import { confirmCorrectAnswer } from '@/lib/teaching/answerConfirmation'

// The exact reported shape, reconstructed: a genuine confirmation followed by
// a truncated, un-tagged, single-option fragment quoting another probe's
// distractor.
const REPORTED_SHAPE = "That's right. A) The particles split into H₂ and O₂"

describe('stripDanglingLeadingOption — the exact reported failure shape', () => {
  it('strips the trailing single-option fragment, keeping the genuine confirmation intact', () => {
    const result = stripDanglingLeadingOption(REPORTED_SHAPE)
    expect(result).toBe("That's right.")
    expect(result).not.toContain('H₂')
    expect(result).not.toContain('O₂')
    expect(result).not.toMatch(/\bA\)/)
  })

  it('is idempotent — running it twice produces the same result', () => {
    const once = stripDanglingLeadingOption(REPORTED_SHAPE)
    const twice = stripDanglingLeadingOption(once)
    expect(twice).toBe(once)
  })

  it('handles a multi-sentence confirmation with the dangling fragment still trailing', () => {
    const text = "Correct — well done. Evaporation happens at the surface at any temperature, unlike boiling. A) The particles split into H₂ and O₂"
    const result = stripDanglingLeadingOption(text)
    expect(result).toBe('Correct — well done. Evaporation happens at the surface at any temperature, unlike boiling.')
  })

  it('handles lowercase, bracket, and parenthesis option-letter styles the same way', () => {
    expect(stripDanglingLeadingOption("That's right. a) split into H2 and O2")).toBe("That's right.")
    expect(stripDanglingLeadingOption("That's right. [A] split into H2 and O2")).toBe("That's right.")
    expect(stripDanglingLeadingOption("That's right. (A) split into H2 and O2")).toBe("That's right.")
  })

  it('falls back to the original text if stripping would leave nothing (no confirmation to preserve)', () => {
    const onlyFragment = 'A) The particles split into H₂ and O₂'
    expect(stripDanglingLeadingOption(onlyFragment)).toBe(onlyFragment)
  })
})

describe('stripDanglingLeadingOption — negative controls (must NOT touch legitimate content)', () => {
  it('leaves a genuine, complete 2-option prose MCQ untouched (existing policy: visible, just ungraded)', () => {
    const text = 'Which is bigger?\nA) An elephant\nB) A mouse'
    expect(stripDanglingLeadingOption(text)).toBe(text)
    expect(hasProseMultipleChoice(text)).toBe(true)
  })

  it('leaves a genuine, complete 4-option prose MCQ untouched even though "A)" is technically the first line', () => {
    const text = 'What does `s` represent?\nA) Speed\nB) Second\nC) Surface area\nD) Size'
    expect(stripDanglingLeadingOption(text)).toBe(text)
  })

  it('leaves ordinary prose with no lettered-option shape at all untouched', () => {
    const text = "That's right. Evaporation happens at the surface, at any temperature — that's the key idea."
    expect(stripDanglingLeadingOption(text)).toBe(text)
  })

  it('leaves a mid-sentence, non-trailing "A)" reference untouched (not a truncated option — has real content after it)', () => {
    const text = 'Option A) was correct. Great work, let\'s move on to the next idea about states of matter.'
    expect(stripDanglingLeadingOption(text)).toBe(text)
  })

  it('leaves a lettered reference that is not the FIRST option letter untouched (a lone "B)"/"C)" is not a truncated-from-start list)', () => {
    const text = "That's right. B) The particles split into H2 and O2"
    expect(stripDanglingLeadingOption(text)).toBe(text)
  })

  it('is a no-op on empty or non-string input', () => {
    expect(stripDanglingLeadingOption('')).toBe('')
    expect(stripDanglingLeadingOption('   ')).toBe('   ')
  })
})

describe('negative control — grading cannot leak an option from another question/probe', () => {
  const evaporationProbe: TutorMCQ = {
    question: 'A puddle on the pavement dries up completely on a 20 °C day. Water boils at 100 °C. How did it evaporate?',
    options: [
      'Evaporation happens at ANY temperature, from the surface. Particles in the liquid have a spread of energies, and the fastest ones at the surface escape even at 20 °C. Boiling is different: it is the temperature at which bubbles of vapour can form THROUGHOUT the liquid, not just at its surface',
      'It cannot have evaporated — water only turns to vapour at its boiling point of 100 °C, so the puddle must have drained away',
    ],
    correctIndex: 0,
  }
  const iceMeltProbe: TutorMCQ = {
    question: 'When ice melts into water, what happens at the particle level?',
    options: [
      'H₂O molecules stay intact but gain enough energy to slide past each other',
      'H₂O molecules break into H₂ and O₂ which dissolve in the liquid',
      'The atoms get bigger as they absorb heat energy',
    ],
    correctIndex: 0,
  }

  it('grading the evaporation answer against the evaporation probe never references the ice-melt probe\'s option text', () => {
    const answer = evaporationProbe.options[0]
    const result = gradeMcqAnswer(answer, evaporationProbe)
    expect(result.correct).toBe(true)
    expect(result.chosenIndex).toBe(0)
    // The graded option, by construction, is evaporationProbe's own text —
    // structurally cannot be the ice-melt probe's distractor.
    const gradedOptionText = evaporationProbe.options[result.chosenIndex!]
    expect(gradedOptionText).not.toContain('H₂ and O₂')
    expect(gradedOptionText).not.toBe(iceMeltProbe.options[1])
  })

  it('resolveMcqChoice can only ever return an index into the SAME mcq object it was given — an index into a 3-option probe cannot be reinterpreted against a 2-option one', () => {
    const iceMeltAnswer = iceMeltProbe.options[1] // the H2/O2 distractor, tapped verbatim
    const resolved = resolveMcqChoice(iceMeltAnswer, iceMeltProbe)
    expect(resolved).toBe(1)
    // That same index applied to the evaporation probe's (shorter) option
    // list would be a DIFFERENT statement entirely — proving why grading
    // must always carry its own mcq reference through, never a bare index.
    expect(evaporationProbe.options[resolved!]).not.toBe(iceMeltProbe.options[1])
    expect(evaporationProbe.options[resolved!]).toBe(evaporationProbe.options[1])
  })

  it('confirmCorrectAnswer never introduces option text of its own — it only ever prepends one of its three fixed phrasings', () => {
    const confirmed = confirmCorrectAnswer({
      text: 'Evaporation happens at any temperature, from the surface — nice reasoning.',
      correct: true,
      priorConfirmations: 0,
    })
    expect(confirmed.added).toBe(true)
    expect(confirmed.text).not.toMatch(/H₂|O₂|split/i)
    expect(['That\'s right.', 'Correct — well done.', 'Yes, exactly right.'].some((p) => confirmed.text.startsWith(p))).toBe(true)
  })

  it('end-to-end: the reported shape survives confirmCorrectAnswer untouched, then stripDanglingLeadingOption removes exactly the leaked fragment', () => {
    // Simulates the pipeline order: the model's raw completion already
    // contains "That's right." (so confirmCorrectAnswer is a no-op, matching
    // the live report), then the dangling-option repair runs.
    const modelText = REPORTED_SHAPE
    const afterConfirm = confirmCorrectAnswer({ text: modelText, correct: true, priorConfirmations: 0 })
    expect(afterConfirm.added).toBe(false) // already confirms — CONFIRMS_CORRECT matches "That's right"
    const finalText = stripDanglingLeadingOption(afterConfirm.text)
    expect(finalText).toBe("That's right.")
    expect(finalText).not.toContain('H₂')
  })
})
