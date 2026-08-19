/**
 * THE NUMBER IS THE ANSWER, IN WHATEVER FORM A PERSON TYPES IT.
 *
 * ── THE REAL TURN ───────────────────────────────────────────────────────────
 * Production, phys.mech.torque, hand-driven as a learner. Turn 4 asked
 * "…ten newtons at zero point five metres, what is the resulting torque?" and
 * offered, spelled out in words because the tutor writes numbers to be spoken:
 *
 *     zero point five newton-metres | five newton-metres
 *     ten newton-metres            | twenty newton-metres
 *
 * The learner typed "5 newton metres" — correct, and the form a person
 * actually types. It graded as NOTHING. `correctAtCheck` stayed 0, and nine
 * turns later the lesson closed with zero graded evidence and the concept
 * flagged for review. Measured on that exact option set, ONLY a letter or the
 * verbatim option string ever graded.
 *
 * Two causes: options in WORDS against learners typing DIGITS, and `norm`
 * preserving hyphens so "newton-metres" and "newton metres" were different
 * strings.
 *
 * This recognises the answer given; it does not decide it is right. The
 * authored key still decides, and ambiguity still resolves to null.
 */
import { describe, it, expect } from 'vitest'
import { gradeMcqAnswer, resolveMcqChoice } from '@/lib/teaching/mcq'
import type { TutorMCQ } from '@/lib/teaching/mcq'

/** The production question, verbatim. */
const TORQUE: TutorMCQ = {
  question: 'If you apply a force of ten newtons at a distance of zero point five metres from a pivot, what is the resulting torque in newton-metres?',
  options: [
    'zero point five newton-metres',
    'five newton-metres',
    'ten newton-metres',
    'twenty newton-metres',
  ],
  correctIndex: 1,
}

describe('THE MEASURED FAILURE — every natural form of the right answer', () => {
  it('grades the exact reply that was lost in production', () => {
    expect(gradeMcqAnswer('5 newton metres', TORQUE).correct).toBe(true)
  })

  it('grades digits and words alike, with or without the unit', () => {
    for (const reply of ['5 newton metres', '5 newton-metres', '5', 'five', 'five newton-metres', '5 Newton Metres']) {
      expect(gradeMcqAnswer(reply, TORQUE).correct).toBe(true)
    }
  })

  it('the letter and the tapped option still work — nothing was traded away', () => {
    for (const reply of ['B', 'b', 'b)', 'option b', 'the second one', 'five newton-metres']) {
      expect(gradeMcqAnswer(reply, TORQUE).correct).toBe(true)
    }
  })

  it('a decimal written in words is the same as the digit', () => {
    // "zero point five" -> 0.5, which is a DISTRACTOR here: it must select
    // option 0 and grade FALSE, not go ungraded.
    for (const reply of ['0.5', 'zero point five', '0.5 newton metres']) {
      const r = gradeMcqAnswer(reply, TORQUE)
      expect(r.chosenIndex).toBe(0)
      expect(r.correct).toBe(false)
    }
  })

  it('a wrong number selects ITS option and grades false — not ungraded', () => {
    // Ungraded and wrong are different outcomes: one stalls the ladder, the
    // other is evidence the learner holds a specific misconception.
    expect(gradeMcqAnswer('twenty', TORQUE).chosenIndex).toBe(3)
    expect(gradeMcqAnswer('20 newton metres', TORQUE).correct).toBe(false)
    expect(gradeMcqAnswer('10', TORQUE).chosenIndex).toBe(2)
  })
})

describe('WHAT IT STILL REFUSES — refusing costs a turn, guessing grades the wrong option', () => {
  it('a worked-out reply naming several numbers is refused, not guessed', () => {
    const r = gradeMcqAnswer('5, because 10 times 0.5', TORQUE)
    expect(r.chosenIndex).toBeNull()
    expect(r.correct).toBeNull()
  })

  it('non-answers stay ungraded', () => {
    for (const reply of ['i dont know', 'what does torque mean?', '', '   ', 'can you explain again']) {
      expect(gradeMcqAnswer(reply, TORQUE).correct).toBeNull()
    }
  })

  it('a number no option carries is refused', () => {
    expect(gradeMcqAnswer('7 newton metres', TORQUE).chosenIndex).toBeNull()
  })

  it('a number two options share is refused', () => {
    const ambiguous: TutorMCQ = {
      question: 'q', options: ['5 metres per second', '5 metres per second squared'], correctIndex: 1,
    }
    expect(resolveMcqChoice('5', ambiguous)).toBeNull()
  })
})

describe('THE SIGN SURVIVED — dimensional formulae are the commonest physics option', () => {
  it('a negative exponent is still not a positive one', () => {
    // The hyphen fix nearly broke this: a folded superscript minus IS a
    // hyphen, so spacing hyphens out would have graded T⁻² as T².
    const pair: TutorMCQ = { question: 'q', options: ['[T]²', '[T]⁻²'], correctIndex: 1 }
    expect(resolveMcqChoice('[T]²', pair)).toBe(0)
    expect(resolveMcqChoice('[T]⁻²', pair)).toBe(1)
  })

  it('a full dimensional formula still grades', () => {
    const dims: TutorMCQ = {
      question: 'q', options: ['[M][L][T]⁻¹', '[M][L][T]⁻²', '[M][L]²[T]⁻²'], correctIndex: 1,
    }
    expect(gradeMcqAnswer('[M][L][T]⁻²', dims).correct).toBe(true)
    expect(gradeMcqAnswer('[M][L][T]⁻¹', dims).correct).toBe(false)
  })
})
