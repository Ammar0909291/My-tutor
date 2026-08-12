/**
 * CORRECTNESS MUST NOT DEPEND ON THE MODEL REMEMBERING TO REPORT IT.
 *
 * ── THE MEASURED FAILURE ────────────────────────────────────────────────────
 * Corpus audit, real production, real learner account. The learner gave a
 * correct answer that the tutor itself called "spot-on", and the runtime logged:
 *
 *   [ladder] { signalTag: false, correctness: null, ack: false,
 *              excursion: false, askedQuestion: true,
 *              phaseBefore: 'OBSERVE', phaseAfter: 'OBSERVE',
 *              check: 0, practice: 0 }
 *
 * `<!--SIGNAL-->` was never emitted. Its instruction is appended to every
 * system prompt unconditionally, so this is the model declining a mandatory
 * tag, not a wiring gap — and `foundations/03 §7` already records the SIGNAL as
 * "a substitute for real instrumentation, not equivalent to it". With the whole
 * mastery system hanging off it, a model that skips one optional-looking tag
 * silently freezes every learner's progress and raises no error anywhere.
 *
 * An MCQ is the one assessment form where correctness is not a judgement call:
 * the tutor declared the right answer when it wrote the question. So a reply to
 * one can be graded server-side against the stored `correctIndex` — real
 * instrumentation, no model call, no cost. `mcqConfidence()` was written for
 * exactly this and had no caller until now.
 *
 * ── THE PROPERTY THAT MATTERS MOST ──────────────────────────────────────────
 * Refusing to guess. A wrong guess writes false evidence into a learner's
 * permanent record and can advance them through a mastery gate they did not
 * earn — worse than the freeze it repairs. Every ambiguous case below must
 * return null, and null means "not gradeable", never "wrong".
 */
import { describe, it, expect } from 'vitest'
import { resolveMcqChoice, gradeMcqAnswer, mcqConfidence } from '@/lib/teaching/mcq'
import type { TutorMCQ } from '@/lib/teaching/mcq'

/** The real question production asked during the audit. */
const REAL: TutorMCQ = {
  question:
    'If you are checking an equation using dimensional analysis, what must be true about the dimensions on the left side and the right side?',
  options: [
    'They must be completely different types of quantities',
    'They must be identical types of physical quantities',
    'The left side must have more mass than the right side',
    'The units must be in feet on the left and metres on the right',
  ],
  correctIndex: 1,
}

const TWO: TutorMCQ = {
  question: 'Is speed a length?',
  options: ['Yes, speed is a length', 'No, speed is a length divided by a time'],
  correctIndex: 1,
}

describe('the answer the learner actually typed', () => {
  it('grades the real production reply correctly', () => {
    // "the second one, they must be identical types" — this exact message was
    // sent in production and produced no evidence at all.
    const g = gradeMcqAnswer('the second one, they must be identical types', REAL)
    expect(g.chosenIndex).toBe(1)
    expect(g.correct).toBe(true)
  })
})

describe('the forms a learner actually uses', () => {
  const cases: Array<[string, number]> = [
    ['b', 1],
    ['B', 1],
    ['(b)', 1],
    ['option b', 1],
    ['b) they must be identical', 1],
    ['second', 1],
    ['the second one', 1],
    ['number 2', 1],
    ['2', 1],
    ['2nd', 1],
    ['They must be identical types of physical quantities', 1],
    ['i think they must be identical types of physical quantities', 1],
    ['a', 0],
    ['the first one', 0],
    ['d', 3],
  ]
  for (const [msg, idx] of cases) {
    it(`resolves ${JSON.stringify(msg)} → option ${idx}`, () => {
      expect(resolveMcqChoice(msg, REAL)).toBe(idx)
    })
  }
})

describe('it refuses to guess — the property that protects the record', () => {
  for (const msg of [
    'i dont know',
    'can you explain that again?',
    'what does dimension mean',
    'hmm',
    '',
    '   ',
    'yes',
    'i think so',
  ]) {
    it(`returns null for ${JSON.stringify(msg)}`, () => {
      expect(resolveMcqChoice(msg, REAL)).toBeNull()
      expect(gradeMcqAnswer(msg, REAL).correct).toBeNull()
    })
  }

  it('a letter inside a word never selects an option', () => {
    // "because" contains b, c and a. Substring matching here would grade a
    // learner's explanation as a multiple-choice selection.
    expect(resolveMcqChoice('because i am not sure', REAL)).toBeNull()
    expect(resolveMcqChoice('a dimension is about quantity', REAL)).not.toBe(0)
  })

  it('an ordinal beyond the option count resolves to nothing', () => {
    // "the third one" against a 2-option question must not select a question
    // that was never asked.
    expect(resolveMcqChoice('the third one', TWO)).toBeNull()
    expect(resolveMcqChoice('d', TWO)).toBeNull()
  })

  it('shared vocabulary does not decide the answer', () => {
    // Every distractor shares the topic's words with the right answer. Scoring
    // on them would grade the SUBJECT rather than the CHOICE.
    expect(resolveMcqChoice('something about dimensions and quantities', REAL)).toBeNull()
  })

  it('two options matching equally well is a refusal, not a coin flip', () => {
    const ambiguous: TutorMCQ = {
      question: 'q',
      options: ['the value goes up', 'the value goes down'],
      correctIndex: 0,
    }
    expect(resolveMcqChoice('the value goes', ambiguous)).toBeNull()
  })
})

describe('grading is ground truth, and null is never "wrong"', () => {
  it('marks the wrong option wrong', () => {
    const g = gradeMcqAnswer('a', REAL)
    expect(g.chosenIndex).toBe(0)
    expect(g.correct).toBe(false)
  })

  it('distinguishes "not gradeable" from "incorrect"', () => {
    // The distinction the route depends on: null leaves the existing SIGNAL
    // path alone; false is real negative evidence.
    expect(gradeMcqAnswer('i have no idea', REAL).correct).toBeNull()
    expect(gradeMcqAnswer('c', REAL).correct).toBe(false)
  })

  it('never throws on a malformed question', () => {
    const empty: TutorMCQ = { question: '', options: [], correctIndex: 0 }
    expect(() => resolveMcqChoice('b', empty)).not.toThrow()
    expect(resolveMcqChoice('b', empty)).toBeNull()
  })
})

describe('symbolic options — the form this corpus actually uses', () => {
  // The tap path sends the option's text verbatim, and in physics and
  // mathematics that text is usually symbols. The first draft graded NONE of
  // these: every option normalised to "m l t" once superscripts were stripped,
  // so the grader saw four identical options and refused. Symbolic questions
  // are the majority of the audited corpus, so that would have left the
  // evidence pipeline frozen for exactly the subjects under audit.
  const DIMS: TutorMCQ = {
    question: 'Which is the dimensional formula for force?',
    options: ['[M][L][T]', '[M][L][T]⁻²', '[M][L]⁻¹[T]²', '[M]²[L][T]⁻¹'],
    correctIndex: 1,
  }

  it('resolves every symbolic option to itself', () => {
    DIMS.options.forEach((o, i) => expect(resolveMcqChoice(o, DIMS), o).toBe(i))
  })

  it('grades the tapped correct option', () => {
    expect(gradeMcqAnswer('[M][L][T]⁻²', DIMS).correct).toBe(true)
  })

  it('grades a tapped wrong option', () => {
    expect(gradeMcqAnswer('[M][L][T]', DIMS).correct).toBe(false)
  })

  it('a negative exponent is not the same answer as a positive one', () => {
    // Dropping the minus would silently mark a wrong answer right.
    const pair: TutorMCQ = { question: 'q', options: ['[T]²', '[T]⁻²'], correctIndex: 1 }
    expect(resolveMcqChoice('[T]²', pair)).toBe(0)
    expect(resolveMcqChoice('[T]⁻²', pair)).toBe(1)
  })

  it('letters still work alongside symbols', () => {
    expect(resolveMcqChoice('b', DIMS)).toBe(1)
    expect(resolveMcqChoice('the second one', DIMS)).toBe(1)
  })
})

describe('confidence comes from server-measured latency', () => {
  it('fast + wrong is the dangerous quadrant', () => {
    expect(mcqConfidence(false, 2000)).toBe('high')
  })
  it('slow + wrong reads as a guess', () => {
    expect(mcqConfidence(false, 60000)).toBe('low')
  })
  it('fast + correct is confident mastery', () => {
    expect(mcqConfidence(true, 2000)).toBe('high')
  })
  it('an unmeasurable latency never reads as fast', () => {
    expect(mcqConfidence(true, null)).toBe('medium')
  })
})
