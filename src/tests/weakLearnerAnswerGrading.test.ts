/**
 * THE ANSWERS A WEAK LEARNER GIVES, AND WHY THEY WERE BEING THROWN AWAY.
 *
 * ── MEASURED IN PRODUCTION, 2026-08-25 ──────────────────────────────────────
 * A real-learner certification run drove four lessons (2 physics, 2 chemistry)
 * against the deployed app on a real beginner account, playing a student with
 * below-intermediate English. Across 16 turns the ladder NEVER left OBSERVE,
 * mastery stayed 0/0 on all four lessons, and no lesson could ever close.
 *
 * OBSERVE -> DEMONSTRATE fires only on `signalCorrect === true`
 * (conversationState.ts, the success switch). `signalCorrect` comes from
 * `gradeMcqAnswer`. So a grader that refuses a learner's answer does not
 * merely lose one data point — it pins the entire teaching ladder at its
 * first rung, permanently, for that learner.
 *
 * Two real replies were refused, both verbatim from the run:
 *
 *   "ok i think A. but sir i still not understand lens. can you show picture
 *    please"                                    -> NOT GRADED  (answer was A)
 *   "i think it is the lowest point sir"        -> NOT GRADED  (option C)
 *
 * Neither is careless. The first answers AND asks in one breath, which is how
 * someone who is struggling actually writes. The second paraphrases instead of
 * quoting, and stops one word short of the threshold. Both are this product's
 * audience, and both were silently discarded.
 *
 * ── WHY THE OLD BEHAVIOUR WAS DEFENSIBLE, AND WHAT CHANGED ──────────────────
 * Rule 1 demands a marker word before a bare "a" because "a" is also the
 * English article — pinned by mcqDeterministicGrading's "a dimension is about
 * quantity" case, which must STILL refuse. Rule 4 demands two distinctive
 * words because one is ambiguous between naming an option and using its
 * vocabulary.
 *
 * The fix does not lower either bar. It adds two narrower roads:
 *   0a  a letter carrying PUNCTUATION ("A." / "B)" / "C,") — the article never
 *       does, so the pinned case is untouched. Ambiguity is fatal, and
 *       ambiguity is judged over every option letter NAMED, not only the
 *       labelled ones, so "A or B, i am not sure" still refuses.
 *   4a  one distinctive word, but only when nothing competes, the word is
 *       substantial, the reply is not a question, and the learner explicitly
 *       frames it as their answer ("i think", "it is", "answer is").
 *
 * A false grade writes PERMANENT evidence the learner never produced — the
 * exact defect class Phase 7P was opened for. Every widening below is
 * therefore paired with a negative control.
 */
import { describe, it, expect } from 'vitest'
import { gradeMcqAnswer, resolveMcqChoice } from '@/lib/teaching/mcq'
import type { TutorMCQ } from '@/lib/teaching/mcq'

/** The exact question the lenses lesson asked, from the production log. */
const LENS: TutorMCQ = {
  question: 'If the focal length f is 20 cm, what is 1/f?',
  options: ['0.05 cm⁻¹', '20 cm', '1/20 cm', '0.5 cm⁻¹'],
  correctIndex: 0,
}
/** The exact question the SHM lesson asked, from the production log. */
const SHM: TutorMCQ = {
  question: 'At which point does the pendulum reach its maximum speed?',
  options: [
    'At the highest point on the left',
    'At the highest point on the right',
    'At the lowest point in the middle',
    'It moves at a constant speed throughout the swing',
  ],
  correctIndex: 2,
}
/** The case an earlier session pinned. It must keep refusing. */
const DIM: TutorMCQ = {
  question: 'What is a dimension?',
  options: ['A quantity', 'B measure', 'C unit'],
  correctIndex: 0,
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. THE TWO PRODUCTION REPLIES — verbatim
// ═══════════════════════════════════════════════════════════════════════════
describe('the replies the live run lost', () => {
  it('grades an answer that arrives with a question attached', () => {
    const g = gradeMcqAnswer(
      'ok i think A. but sir i still not understand lens. can you show picture please',
      LENS,
    )
    expect(g.chosenIndex).toBe(0)
    expect(g.correct).toBe(true)
  })

  it('grades a hedged paraphrase that names one option', () => {
    const g = gradeMcqAnswer('i think it is the lowest point sir', SHM)
    expect(g.chosenIndex).toBe(2)
    expect(g.correct).toBe(true)
  })

  it('still grades the reply that DID work, unchanged', () => {
    // This one was already graded correctly in production; the fix must not
    // move it. The letter is at position 0, so rule 1 owns it, not rule 0a.
    const g = gradeMcqAnswer(
      'C. so in the picture the ball go fast in middle. but sir why the string not become long when it go side',
      SHM,
    )
    expect(g.chosenIndex).toBe(2)
    expect(g.correct).toBe(true)
  })

  it('and still grades the wrong one as wrong', () => {
    const g = gradeMcqAnswer('C. because 1 over f is 1/20 same thing i think', LENS)
    expect(g.chosenIndex).toBe(2)
    expect(g.correct).toBe(false)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 2. NEGATIVE CONTROLS — a false grade is worse than a missed one
// ═══════════════════════════════════════════════════════════════════════════
describe('what must still refuse to be graded', () => {
  const refuses = (msg: string, mcq: TutorMCQ) =>
    expect(gradeMcqAnswer(msg, mcq), msg).toEqual({ chosenIndex: null, correct: null })

  it('the pinned article case — "a" used as English, not as a label', () => {
    // The reason rule 1 demands a marker. Rule 4a would have re-opened it via
    // the word "quantity", which is why 4a also requires an answer phrase.
    refuses('a dimension is about quantity', DIM)
    refuses('a lens bends light', DIM)
  })

  it('a question that NAMES an option without choosing it', () => {
    refuses('why is the lowest point fastest?', SHM)
    refuses('what about the lowest point', SHM)
    refuses('is it the lowest point or the highest point', SHM)
  })

  it('a learner weighing two options has chosen neither', () => {
    // Only "B," carries punctuation, but both letters are NAMED.
    refuses('A or B, i am not sure', DIM)
  })

  it('acknowledgement, distress and non-answers', () => {
    refuses('ok', SHM)
    refuses('sir i am lost', SHM)
    refuses('i do not know', SHM)
  })

  it('vocabulary without an answer claim', () => {
    // "lowest" alone, with no "i think" / "it is" — rule 4a holds off.
    refuses('the lowest point is confusing', SHM)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 3. THE RULES THEMSELVES, so a future edit knows which road it is on
// ═══════════════════════════════════════════════════════════════════════════
describe('rule 0a — a labelled letter anywhere in the sentence', () => {
  it('accepts every label form a learner actually types', () => {
    for (const m of ['well i think B.', 'my answer: C)', 'i say D,', 'maybe B;', 'i pick C -']) {
      expect(resolveMcqChoice(m, SHM), m).not.toBeNull()
    }
  })

  it('is case-insensitive, because a struggling learner does not capitalise', () => {
    expect(resolveMcqChoice('i think c. is right', SHM)).toBe(2)
  })

  it('refuses a letter beyond the offered options', () => {
    // DIM offers three. "D." names a fourth that was never asked.
    expect(resolveMcqChoice('i think D.', DIM)).toBeNull()
  })

  it('two labelled letters select neither', () => {
    expect(resolveMcqChoice('A. or B.', DIM)).toBeNull()
  })
})

describe('rule 4a — one distinctive word, only when nothing competes', () => {
  it('needs a word that belongs to exactly one option', () => {
    // "point" is in three of the four options, so nothing decisive is said.
    expect(resolveMcqChoice('i think it is the point', SHM)).toBeNull()
  })

  it('PRE-EXISTING, recorded not fixed: "the one" resolves to option A', () => {
    // `norm` digitises number words, so "one" becomes "1", and rule 2 reads
    // "1" as the ordinal FIRST. A learner saying "i think it is the one"
    // means "that one", not "the first one", and is graded as choosing A.
    //
    // This predates the 0a/4a rules — verified against the unmodified module
    // — and is left alone deliberately: it lives in the ordinal/number path,
    // which this change does not touch, and narrowing it is a separate piece
    // of work with its own negative controls. Pinned here so it is a known
    // quantity rather than a surprise, and so a future fix has a test to flip.
    expect(resolveMcqChoice('i think it is the one', SHM)).toBe(0)
  })

  it('refuses when two options are both named', () => {
    expect(resolveMcqChoice('i think it is the left or the right', SHM)).toBeNull()
  })

  it('still prefers the stronger rules when they apply', () => {
    // Exact option text is rule 0; it must win regardless of phrasing.
    expect(resolveMcqChoice('At the lowest point in the middle', SHM)).toBe(2)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 4. WHY THIS MATTERS — the ladder consequence, stated as a test
// ═══════════════════════════════════════════════════════════════════════════
describe('the reason this is a P0 and not a nicety', () => {
  it('a graded CORRECT answer is the only thing that leaves OBSERVE', async () => {
    const { initialConversationState, advanceConversationState } =
      await import('@/lib/teaching/conversationState')
    const base = initialConversationState('phys.wave.shm')
    expect(base.phase).toBe('OBSERVE')

    // What production did with the hedged reply: nothing was graded, so
    // signalCorrect is undefined and the phase cannot move.
    const lost = advanceConversationState(base, { signalCorrect: undefined } as never)
    expect(lost.phase).toBe('OBSERVE')

    // What it does now that the same reply grades.
    const graded = advanceConversationState(base, { signalCorrect: true } as never)
    expect(graded.phase).toBe('DEMONSTRATE')
  })
})
