/**
 * PHASE A — ANSWER INTAKE. The complete matrix, as a permanent guard.
 *
 * ── WHY A MATRIX AND NOT A HANDFUL OF CASES ─────────────────────────────────
 * `resolveMcqChoice` is the ONLY path from a learner's sentence to evidence,
 * and `OBSERVE -> DEMONSTRATE` fires on nothing else (conversationState's
 * success switch reads `signalCorrect`, which comes from `gradeMcqAnswer`).
 * A grader that refuses an answer pins the whole ladder; a grader that invents
 * one writes permanent evidence the learner never produced. Both failure
 * directions are severe, and they pull against each other — which is exactly
 * the situation that needs a matrix rather than a fix-and-hope.
 *
 * Run against the module as it stood at the start of Phase A, this matrix
 * scored 33/50. The 17 failures had THREE shared causes, not seventeen:
 *
 *   RC-A1  `norm` digitised the pronoun "one" into "1", and ORDINALS maps
 *          "1" to option A. Seven cases. The worst two were a HELP REQUEST
 *          ("can you explain the left one?") and a QUESTION ("which one is
 *          correct?") both banked as answers — false evidence out of
 *          ordinary English.
 *   RC-A2  rule 1 wanted the option letter at a sentence edge or immediately
 *          after a marker word, so every learner who wrote a sentence around
 *          their choice was refused: "I think A", "answer is A", "ok I think
 *          A", "I think C because...", "sir I think C because...".
 *   RC-A3  rule 1 applied no intent context at all, so "A or B" graded as B,
 *          "B? Can you explain?" graded as B, and "I dont know but maybe B"
 *          graded as B.
 *
 * ── THE CLASSIFICATION THIS FILE ASSERTS ────────────────────────────────────
 * Not every phrase should grade, and the intended answer per class is:
 *   CORRECT/WRONG   a named option, however the sentence is built  -> GRADE
 *   ORDINAL         a real ordinal, or a cardinal that is marked   -> GRADE
 *   UNCERTAIN       two options named, or explicit non-commitment  -> REFUSE
 *   META            a request for another question                 -> REFUSE
 *   HELP/QUESTION   asking about an option is not choosing it      -> REFUSE
 *
 * A refusal costs the learner one turn. A false grade costs them their record.
 */
import { describe, it, expect } from 'vitest'
import { gradeMcqAnswer, resolveMcqChoice } from '@/lib/teaching/mcq'
import { asksForPractice, isBareAcknowledgement } from '@/lib/teaching/masteryGate'
import { readTurnIntent } from '@/lib/teaching/turnIntent'
import type { TutorMCQ } from '@/lib/teaching/mcq'

/** Four options, no digits anywhere — so nothing can grade by accident. */
const Q: TutorMCQ = {
  question: 'At which point does the pendulum reach its maximum speed?',
  options: [
    'At the highest point on the left',
    'At the highest point on the right',
    'At the lowest point in the middle',
    'It moves at a constant speed',
  ],
  correctIndex: 2,
}

const grades = (msg: string, idx: number) => {
  const g = gradeMcqAnswer(msg, Q)
  expect(g.chosenIndex, msg).toBe(idx)
  expect(g.correct, msg).toBe(idx === Q.correctIndex)
}
const refuses = (msg: string) =>
  expect(gradeMcqAnswer(msg, Q), msg).toEqual({ chosenIndex: null, correct: null })

// ═══════════════════════════════════════════════════════════════════════════
// CONTROL 1 + 3 + 4 — the weak learner's CORRECT answer, however it is written
// ═══════════════════════════════════════════════════════════════════════════
describe('a correct answer grades correct, in every natural form', () => {
  const CORRECT = [
    'C', 'c', 'C.', 'C)', 'option c',
    'I think C',
    'I think C because it has more energy there',   // explanatory  (control 3)
    'ok I think C',
    'sir I think C because...',
    'answer is C',
    'the third one',                                 // ordinal      (control 5)
    'I think the third one',
    'I think it is the lowest point',                // paraphrase
    'the lowest point in the middle',                // verbatim tap
  ]
  for (const m of CORRECT) it(`"${m}"`, () => grades(m, 2))
})

// ═══════════════════════════════════════════════════════════════════════════
// CONTROL 2 + 10 — a wrong answer stays wrong. Refusing is NOT the fix.
// ═══════════════════════════════════════════════════════════════════════════
describe('a wrong answer grades wrong, in every natural form', () => {
  const WRONG = [
    'A', 'a', 'A.', 'option one', 'the first one',
    'I think A',
    'I think A because it starts there',
    'ok I think A',
    'answer is A',
    'I think the first one',
    'I think it is the highest point on the left',
  ]
  for (const m of WRONG) it(`"${m}"`, () => grades(m, 0))

  it('CONTROL 10: the fix did not turn wrong answers into refusals', () => {
    // The cheapest way to kill a false positive is to grade nothing. That
    // would silently destroy remediation, so it is asserted against directly.
    for (const m of WRONG) expect(gradeMcqAnswer(m, Q).correct, m).toBe(false)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// CONTROL 8 — uncertainty is not an answer
// ═══════════════════════════════════════════════════════════════════════════
describe('uncertainty never becomes a confident answer', () => {
  for (const m of [
    'maybe A',
    'A or B',                       // two options named -> neither
    'A or B, I am not sure',
    'I think maybe A?',
    'I dont know but maybe B',      // explicit non-commitment
    'I do not know',
    'not sure, maybe C',
  ]) it(`"${m}"`, () => refuses(m))
})

// ═══════════════════════════════════════════════════════════════════════════
// CONTROL 6 + 12 — a request for another question is not an answer
// ═══════════════════════════════════════════════════════════════════════════
describe('meta requests are never graded', () => {
  const META = [
    'one more please', 'ask me another question', 'quiz me',
    'give me a practice problem', 'give me a practice question',
    'I want to practice', 'one more',
  ]
  for (const m of META) it(`"${m}"`, () => refuses(m))

  it('CONTROL 12: 7P\'s call-site suppression is still the primary guard', () => {
    // Phase A closed the grader-level hole too, but the intent suppression is
    // NOT redundant: "quiz me" and "ask me another question" name no option at
    // all, so no grader rule would ever have reached them. Two independent
    // guards, and this asserts the older one still fires.
    for (const m of META) {
      expect(asksForPractice(m), m).toBe(true)
      expect(readTurnIntent(m, null).wantsPractice, m).toBe(true)
    }
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// CONTROL 7 + 9 — asking about an option is not choosing it
// ═══════════════════════════════════════════════════════════════════════════
describe('help requests and questions are never graded', () => {
  for (const m of [
    'why?',
    'can you explain A?',
    'can you explain the left one?',   // RC-A1: used to grade as option A
    'what does A mean?',
    'I dont understand',
    'is A correct?',
    'which one is correct?',           // RC-A1: used to grade as option A
    'why is B the answer?',
    'B? Can you explain?',             // RC-A3: used to grade as B
  ]) it(`"${m}"`, () => refuses(m))
})

// ═══════════════════════════════════════════════════════════════════════════
// RC-A1 — the pronoun "one", isolated
// ═══════════════════════════════════════════════════════════════════════════
describe('"one" is a pronoun unless something says it is a number', () => {
  it('the bare pronoun chooses nothing', () => {
    for (const m of ['one', 'the one', 'one more', 'I need one more minute',
      'I think it is the one', 'which one', 'the left one']) refuses(m)
  })

  it('an explicit marker makes it a number again', () => {
    expect(resolveMcqChoice('option one', Q)).toBe(0)
    expect(resolveMcqChoice('number one', Q)).toBe(0)
  })

  it('a genuine ordinal is untouched', () => {
    expect(resolveMcqChoice('the first one', Q)).toBe(0)
    expect(resolveMcqChoice('the second one', Q)).toBe(1)
    expect(resolveMcqChoice('the third one', Q)).toBe(2)
  })

  it('a bare digit is untouched — it is a choice, not a pronoun', () => {
    expect(resolveMcqChoice('2', Q)).toBe(1)
  })

  it('other number words are untouched — none of them is a pronoun', () => {
    const numeric: TutorMCQ = { question: 'n', options: ['3', '5', '7'], correctIndex: 1 }
    expect(resolveMcqChoice('five', numeric)).toBe(1)
    expect(resolveMcqChoice('seven', numeric)).toBe(2)
  })

  it('decimals written in words still join', () => {
    const dec: TutorMCQ = { question: 'n', options: ['0.5', '1.5', '2.5'], correctIndex: 1 }
    expect(resolveMcqChoice('one point five', dec)).toBe(1)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// RC-A2 — the letter inside a sentence, and the article that must not be one
// ═══════════════════════════════════════════════════════════════════════════
describe('a letter inside a stated answer', () => {
  it('grades when the learner says it is their answer', () => {
    expect(resolveMcqChoice('I think C because it has more energy', Q)).toBe(2)
    expect(resolveMcqChoice('answer is A', Q)).toBe(0)
  })

  it('NEGATIVE CONTROL: "a" as the English article still refuses', () => {
    // The refusal an earlier session pinned. `statesAnAnswer` alone is not
    // enough for "a" — the word after it decides.
    const DIM: TutorMCQ = { question: 'd', options: ['A quantity', 'B measure'], correctIndex: 0 }
    expect(resolveMcqChoice('a dimension is about quantity', DIM)).not.toBe(0)
    expect(resolveMcqChoice('I think a lens bends the light', DIM)).toBeNull()
    expect(resolveMcqChoice('I think a bigger mass falls the same', DIM)).toBeNull()
  })

  it('NEGATIVE CONTROL: no answer claim, no grade', () => {
    // Without "I think"/"it is"/"answer is", a mid-sentence letter is not
    // treated as a choice at all.
    expect(resolveMcqChoice('the letters a and c look similar to me', Q)).toBeNull()
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// CONTROL 11 — the shape of the contract itself
// ═══════════════════════════════════════════════════════════════════════════
describe('null means "not gradeable", never "wrong"', () => {
  it('every refusal returns null for BOTH fields', () => {
    // `correct: false` would be recorded as a failed attempt. A non-answer
    // must never produce one — this is the boundary Phase 7P was opened for.
    for (const m of ['quiz me', 'why?', 'A or B', 'the one', 'I do not know', 'ok']) {
      const g = gradeMcqAnswer(m, Q)
      expect(g.chosenIndex, m).toBeNull()
      expect(g.correct, m).toBeNull()
      expect(g.correct, m).not.toBe(false)
    }
  })

  it('CONTROL 13/14: the other turn-level guards are untouched', () => {
    // 7M's completion escape reads wantsPractice; 7N's budget reads the
    // engine's own move. Neither is a grading concern, and neither moved.
    expect(isBareAcknowledgement('ok')).toBe(true)
    expect(isBareAcknowledgement('ok, but why does the moon not fall?')).toBe(false)
    expect(readTurnIntent('I want to practice', null).wantsPractice).toBe(true)
    expect(readTurnIntent('I think C', null).wantsPractice).toBe(false)
  })
})
