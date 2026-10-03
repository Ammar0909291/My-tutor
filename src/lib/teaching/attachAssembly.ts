/**
 * TURN ASSEMBLY, Phase 3 step 2 — a turn that attaches a quiz card.
 *
 * MEASURED (Phase 0, docs/history/turn-quality-baseline-2026-10-02.md): K2, a
 * question in the prose beside a card, ran at 6.6–11.3% of card turns in every
 * subject and did not move in 14 days. Hand-read 12/12 true: about half re-type
 * the card's own question, the rest ask a second question or a confirm-back.
 * The learner then sees two questions and one set of buttons.
 *
 * The card is the turn's question. So the prose beside it carries no question
 * TO THE LEARNER: those sentences and home-made option lines are dropped, and
 * the prose ends on a neutral lead-in that points at the card (never one naming
 * a topic, the K4 defect). Nothing is generated; no model call is made.
 *
 * A question to the learner is one left hanging (nothing but more questions
 * after it in its paragraph) or a confirm-back. A question the prose answers
 * itself ("Pressure in pascals? That's kg/(m·s²).") is teaching and stays:
 * MEASURED in the first serve window (2026-10-03), dropping those left "That's
 * kg/(m·s²)." and "No fixed ratio —" referring to nothing (2 of 5 changed turns).
 */
import { neutraliseBlindLeadIn, neutralLeadInFor } from './gateAssessmentRenderer'
import { dropLearnerQuestions } from './learnerQuestions'

export { dropLearnerQuestions }

export interface AttachAssembly {
  text: string
  /** False when the prose already had no question beside the card. */
  changed: boolean
  /** What was dropped: questions to the learner and option lines (for the log). */
  removed: string[]
}

export function assembleAttachTurn(prose: string, cardQuestion: string): AttachAssembly {
  const original = prose ?? ''
  if (!original.includes('?')) return { text: original, changed: false, removed: [] }
  const frame = neutralLeadInFor(cardQuestion)
  const { text: body, dropped, removed } = dropLearnerQuestions(original)
  // Only rhetorical questions: the prose already asks the learner nothing.
  if (!dropped) return { text: original, changed: false, removed: [] }
  if (!body) return { text: frame, changed: true, removed }
  // A closing sentence that already announces the card is replaced by the
  // neutral frame; otherwise the frame is added. Never both.
  const neutralised = neutraliseBlindLeadIn(body, cardQuestion)
  if (neutralised !== body || body.trimEnd().endsWith(frame)) return { text: neutralised, changed: true, removed }
  return { text: `${body}\n\n${frame}`, changed: true, removed }
}
