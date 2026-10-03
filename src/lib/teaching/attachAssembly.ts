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

export interface AttachAssembly {
  text: string
  /** False when the prose already had no question beside the card. */
  changed: boolean
  /** What was dropped: questions to the learner and option lines (for the log). */
  removed: string[]
}

/**
 * A question inside quotation marks is lesson content ("Where are you going?"
 * as an example of an interrogative), not a question to the learner. Dropping
 * its sentence would cut teaching, so such a turn is left as it is.
 */
const QUOTED_QUESTION = /["\u201c][^"\u201c\u201d\n]*\?[^"\u201c\u201d\n]*["\u201d]/

const OPTION_LINE = /^\s*(?:[A-D][).:]|\([A-D]\))\s/
/** A check on the learner's state, not a question about the content. */
const CONFIRM_BACK = /\b(makes? sense|are you ready|ready (?:to|for)|got it|any questions|shall we|sounds? good|(?:okay|ok|clear) so far|with me so far|follow (?:so far|that)|can you see why|does that help|is that clear)\b/i
const HAS_WORD = /[\p{L}\p{N}]/u

/**
 * The prose without its questions to the learner and its option lines. A
 * fragment with no word in it (the closing "**" of a bold question) goes with
 * the sentence before it, so a dropped question takes its markup along.
 */
export function dropLearnerQuestions(text: string): { text: string; dropped: boolean; removed: string[] } {
  let dropped = false
  const removed: string[] = []
  const out = (text ?? '')
    .split(/\n{2,}/)
    .map((para) => {
      const all = para.split('\n')
      const lines = all.filter((line) => !OPTION_LINE.test(line))
      if (lines.length !== all.length) {
        dropped = true
        removed.push(...all.filter((line) => OPTION_LINE.test(line)).map((line) => line.trim()))
      }
      const units: { line: number; text: string }[] = []
      lines.forEach((line, li) => {
        for (const piece of line.match(/[^.!?]+(?:[.!?]+|$)/g) ?? []) {
          const prev = units[units.length - 1]
          if (!HAS_WORD.test(piece) && prev && prev.line === li) prev.text += piece
          else units.push({ line: li, text: piece })
        }
      })
      const isQuestion = (u: { text: string }) => u.text.includes('?')
      const kept = units.filter((u, i) => {
        if (!isQuestion(u)) return true
        const answeredAfter = units.slice(i + 1).some((v) => !isQuestion(v) && HAS_WORD.test(v.text))
        const keep = answeredAfter && !CONFIRM_BACK.test(u.text)
        if (!keep) { dropped = true; removed.push(u.text.trim()) }
        return keep
      })
      return lines
        .map((_, li) => kept.filter((u) => u.line === li).map((u) => u.text).join('').trim())
        .filter(Boolean)
        .join('\n')
    })
    .filter(Boolean)
    .join('\n\n')
    .trim()
  return { text: out, dropped, removed }
}

export function assembleAttachTurn(prose: string, cardQuestion: string): AttachAssembly {
  const original = prose ?? ''
  if (!original.includes('?') || QUOTED_QUESTION.test(original)) return { text: original, changed: false, removed: [] }
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
