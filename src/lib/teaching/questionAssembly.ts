/**
 * TURN ASSEMBLY, Phase 3 step 5 — the reply to a learner's question (spec §15).
 *
 * The answer itself stays model-written: it is the least structurable turn,
 * and free text is the point of it. Only two server facts are enforced:
 * - nothing was graded, so the reply carries no verdict ("That's right." on a
 *   question reads as grading something the learner never answered);
 * - it asks the learner at most one question back, as its last one.
 *
 * MEASURED baseline (2026-10-03, 2,128 learner-question turns, 7 days): a
 * stub on a real question at most 0.4%, a verdict 0.1%. So this may well show
 * no gain; the shadow numbers decide (DoD 3). Nothing is generated.
 */
import { countLearnerQuestions, dropLearnerQuestions } from './learnerQuestions'

const VERDICT_OPENING = /^\s*(?:that'?s (?:right|correct)|correct|yes,? exactly(?: right)?|exactly right|well done|great job|spot on)\b[^.!?\n]*[.!]\s*/i
const words = (s: string) => (s.match(/[\p{L}\p{N}]+/gu) ?? []).length

export interface QuestionTurnChecks {
  /** Under 12 words: no real answer. */
  stub: boolean
  /** Opens with a verdict although nothing was graded. */
  verdict: boolean
  /** Questions to the learner (learnerQuestions.ts). */
  learnerQuestions: number
}

export function questionTurnChecks(text: string): QuestionTurnChecks {
  const t = (text ?? '').replace(/[‘’]/g, "'")
  return { stub: words(t) < 12, verdict: VERDICT_OPENING.test(t), learnerQuestions: countLearnerQuestions(t) }
}

export interface QuestionAssembly {
  text: string
  changed: boolean
  removed: string[]
  before: QuestionTurnChecks
  after: QuestionTurnChecks
}

export function assembleQuestionTurn(text: string): QuestionAssembly {
  const original = text ?? ''
  const before = questionTurnChecks(original)
  const removed: string[] = []
  let out = original
  if (before.verdict) {
    const plain = out.replace(/[‘’]/g, "'")
    const m = plain.match(VERDICT_OPENING)
    if (m) { removed.push(out.slice(0, m[0].length).trim()); out = out.slice(m[0].length) }
  }
  if (countLearnerQuestions(out) >= 2) {
    const r = dropLearnerQuestions(out, { keepLast: true, keepOptionLines: true })
    removed.push(...r.removed)
    out = r.text
  }
  out = out.trim()
  const after = questionTurnChecks(out)
  // Never send a stub: when the result would be one, keep the reply as it was.
  if (removed.length === 0 || after.stub) {
    return { text: original, changed: false, removed: [], before, after: before }
  }
  return { text: out, changed: true, removed, before, after }
}
