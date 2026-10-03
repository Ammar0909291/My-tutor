/**
 * TURN ASSEMBLY, Phase 3 step 3 — the lesson opening (spec §13).
 *
 * MEASURED (2026-10-03, 1,187 openings over 7 days): about 1.5% end on two or
 * three questions to the learner ("what do you expect to happen to the
 * current? … What would the current be? … What do you notice?"), and the
 * learner answers one. An opening should ask exactly one question: the last
 * question to the learner stays, earlier ones (and confirm-backs) go.
 * Rhetorical, quoted and heading questions are teaching and stay
 * (learnerQuestions.ts). Option lines stay: an opening has no card, so a
 * home-made list is the only way the question can be answered.
 *
 * Nothing is generated; no model call is made.
 */
import { countLearnerQuestions, dropLearnerQuestions } from './learnerQuestions'

export interface OpeningAssembly {
  text: string
  changed: boolean
  removed: string[]
  learnerQuestionsBefore: number
  learnerQuestionsAfter: number
}

export function assembleOpeningTurn(text: string): OpeningAssembly {
  const original = text ?? ''
  const before = countLearnerQuestions(original)
  if (before <= 1) {
    return { text: original, changed: false, removed: [], learnerQuestionsBefore: before, learnerQuestionsAfter: before }
  }
  const r = dropLearnerQuestions(original, { keepLast: true, keepOptionLines: true })
  return {
    text: r.text,
    changed: r.dropped,
    removed: r.removed,
    learnerQuestionsBefore: before,
    learnerQuestionsAfter: countLearnerQuestions(r.text),
  }
}
