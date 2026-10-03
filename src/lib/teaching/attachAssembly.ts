/**
 * TURN ASSEMBLY, Phase 3 step 2 — a turn that attaches a quiz card.
 *
 * MEASURED (Phase 0, docs/history/turn-quality-baseline-2026-10-02.md): K2, a
 * question in the prose beside a card, ran at 6.6–11.3% of card turns in every
 * subject and did not move in 14 days. Hand-read 12/12 true: about half re-type
 * the card's own question, the rest ask a second question or a confirm-back.
 * The learner then sees two questions and one set of buttons.
 *
 * The card is the turn's question. So the prose beside it carries no question:
 * question sentences and option lines are dropped, and the prose ends on a
 * neutral lead-in that points at the card (never one naming a topic, the K4
 * defect). Nothing is generated; no model call is made.
 */
import { dropQuestionSentences } from './confirmBackRepair'
import { neutraliseBlindLeadIn, neutralLeadInFor } from './gateAssessmentRenderer'

export interface AttachAssembly {
  text: string
  /** False when the prose already had no question beside the card. */
  changed: boolean
}

/**
 * A question inside quotation marks is lesson content ("Where are you going?"
 * as an example of an interrogative), not a question to the learner. Dropping
 * its sentence would cut teaching, so such a turn is left as it is.
 */
const QUOTED_QUESTION = /["\u201c][^"\u201c\u201d\n]*\?[^"\u201c\u201d\n]*["\u201d]/

export function assembleAttachTurn(prose: string, cardQuestion: string): AttachAssembly {
  const original = prose ?? ''
  if (!original.includes('?') || QUOTED_QUESTION.test(original)) return { text: original, changed: false }
  const frame = neutralLeadInFor(cardQuestion)
  const body = dropQuestionSentences(original)
  if (!body) return { text: frame, changed: true }
  // A closing sentence that already announces the card is replaced by the
  // neutral frame; otherwise the frame is added. Never both.
  const neutralised = neutraliseBlindLeadIn(body, cardQuestion)
  if (neutralised !== body || body.trimEnd().endsWith(frame)) return { text: neutralised, changed: true }
  return { text: `${body}\n\n${frame}`, changed: true }
}
