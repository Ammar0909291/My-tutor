/**
 * ANSWERABLE-TURN EVIDENCE GUARD — the precondition the SIGNAL path was missing.
 *
 * ── THE DEFECT THIS EXISTS FOR ─────────────────────────────────────────────
 * Reproduced on a real account, `chem.found.stoichiometry`, 2026-08-17:
 *
 *   tutor  : (works through the answer to its OWN prior question and states
 *             the conclusion — no question of any kind asked)
 *   learner: "i see"
 *   model  : <!--SIGNAL correctness="true"-->
 *
 * `correctAtCheck` went 0 → 1, the ladder advanced CHECK → PRACTICE, and
 * `topic_progress` was written to 65 %. The learner demonstrated nothing.
 *
 * ── WHY THE EXISTING LAYERS DID NOT STOP IT ────────────────────────────────
 * Both fired, and neither was positioned to stop it:
 *
 *  - `proseMcqGuard` suppresses correctness only when the prior assistant turn
 *    IS a lettered options list. Here it was an explanation, so the guard
 *    correctly did not match. Its condition covers the case where a question
 *    was asked but is ungradeable; it says nothing about the case where NO
 *    question was asked at all — which is strictly more ungradeable, because
 *    there is not even a question to compare an answer against.
 *  - `signalVerification`'s `bare-content-at-advanced-phase` DID fire and
 *    returned SUSPICIOUS. Measured in production: `correctAtCheck 1` with
 *    `verifiedCorrectAtCheck 0`. But SUSPICIOUS is deliberately non-blocking —
 *    it withholds the VERIFIED counters (completion authority) while the
 *    UNVERIFIED counters still drive phase transitions,
 *    `hasDemonstratedMastery` and the `topic_progress` write. Detection
 *    without suppression was never going to hold the gate.
 *
 * ── THE RULE ───────────────────────────────────────────────────────────────
 * A SIGNAL correctness value is only meaningful if the learner was answering
 * something. With no structured `<!--MCQ-->` pending, correctness is accepted
 * ONLY when the immediately preceding tutor turn actually posed an answerable
 * question or task, and was not a prose-only MCQ.
 *
 * Suppression removes `correctness` alone. `confidence`, `confusion` and
 * `chosenPhrase` survive: those are the model's read of the learner's
 * BEHAVIOUR, not a claim about a right answer we cannot check. Nothing is
 * fabricated — a suppressed turn records no correctness at all, never a wrong
 * answer the learner did not give.
 *
 * ── DIRECTION OF ERROR ─────────────────────────────────────────────────────
 * POSITIVE EVIDENCE of an answerable question is REQUIRED, so an unrecognised
 * question shape suppresses (costs one turn of unrecorded correctness) while an
 * unrecognised non-question cannot accept (which would write false evidence
 * into a permanent record). Same stance as the prose-MCQ guard it extends.
 */

import { hasProseMultipleChoice } from './proseMcqGuard'

/**
 * Interrogatives that solicit CONTENT from the learner. A question sentence
 * carrying one of these asks for something only the learner can supply.
 */
const SOLICITS_CONTENT =
  /\b(what|which|why|how|when|where|who|whom|whose|name|state|identify|calculate|compute|solve|find|determine|explain|describe|predict|compare|estimate|convert|balance|choose|select|pick|list|give)\b/i

/**
 * Confirmation questions, matched at the TAIL.
 *
 * Anchoring to the end is the point, not a shortcut. A wh-word can appear
 * inside a confirmation as an embedded clause rather than the interrogative
 * head, and then a "contains a wh-word" test accepts it. The live turn that
 * forced this rule:
 *
 *   "so you're seeing HOW the mole ratio matches the amounts we started with
 *    — have I got that right?"
 *
 * The question being asked is "have I got that right?"; "how" belongs to what
 * the tutor is asserting. Whatever precedes it, a sentence whose final clause
 * is a confirmation is asking the learner to agree, not to answer.
 */
const CONFIRMATION_TAIL =
  new RegExp(
    '(?:'
    + '\\b(?:have|did)\\s+i\\s+(?:got|get)\\s+(?:that|this|it)\\s+right'
    + '|\\bam\\s+i\\s+right'
    + '|\\bis\\s+(?:that|this|it)\\s+(?:right|correct|clear)'
    + '|\\bmakes?\\s+sense'
    + '|\\bare\\s+you\\s+(?:ready|with\\s+me|following|clear\\s+on\\s+that)'
    + '|\\bdo\\s+you\\s+(?:follow|understand|see|get\\s+it)'
    + '|\\bgot\\s+it'
    + '|\\bsounds?\\s+good'
    + '|\\bhow\\s+(?:does|did)\\s+(?:that|this|it)\\s+(?:sound|look|feel)'
    + '|\\bany\\s+questions'
    + '|\\bready'
    + '|\\bok(?:ay)?'
    + ')\\s*\\?\\s*$',
    'i',
  )

/**
 * A line that IS a task, without needing a question mark ("Calculate the molar
 * mass.", "Your turn: balance this equation."). `try` is narrowed to
 * `try this/it/one/that`, so ordinary teaching prose ("Try to remember that…")
 * is not mistaken for a set task.
 */
const TASK_IMPERATIVE =
  /^\s*(?:your turn[\s:,-]+|now[\s,]+|next[\s,]+)?(?:(calculate|compute|solve|find|work out|determine|name|state|identify|explain|describe|predict|compare|estimate|convert|balance|write|choose|select|pick|list|give)\b|try\s+(?:this|it|one|that)\b)/i

/**
 * Did this tutor turn pose something the learner could actually answer?
 *
 * True when EITHER a question sentence solicits content, OR a line sets an
 * explicit task. A turn that only explains, narrates, encourages or asks for
 * confirmation is NOT answerable — a reply to it is a receipt, not evidence.
 */
export function askedAnswerableQuestion(text: string): boolean {
  if (typeof text !== 'string' || text.length === 0) return false

  // Task lines are evaluated per line, since an imperative only counts when it
  // opens one — "we can calculate it" mid-sentence is narration, not a task.
  for (const line of text.split('\n')) {
    if (TASK_IMPERATIVE.test(line)) return true
  }

  // Question sentences: split on terminators, keep the ones that end in '?'.
  for (const sentence of text.split(/(?<=[.!?])\s+/)) {
    const s = sentence.trim()
    if (!s.endsWith('?')) continue
    if (CONFIRMATION_TAIL.test(s)) continue
    if (SOLICITS_CONTENT.test(s)) return true
  }

  return false
}

export type SuppressionReason =
  /** The prior turn asked a multiple-choice question in prose, with no tag. */
  | 'prose-mcq-ungradeable'
  /** The prior turn posed nothing to answer. */
  | 'no-answerable-question'

export interface SuppressionDecision {
  suppress: boolean
  reason: SuppressionReason | null
}

/**
 * The single decision the route asks for. Kept here rather than inline so the
 * rule is unit-testable without a database, a model or an HTTP turn.
 *
 * A pending STRUCTURED MCQ short-circuits everything: `gradeMcqAnswer()` owns
 * that turn against a server-side answer key, so the model's claim is not the
 * evidence and there is nothing to suppress.
 */
export function shouldSuppressSignalCorrectness(input: {
  priorAssistantText: string
  hasPendingStructuredMcq: boolean
}): SuppressionDecision {
  if (input.hasPendingStructuredMcq) return { suppress: false, reason: null }

  // Order matters only for the reported reason, not the outcome: a prose MCQ
  // is the more specific diagnosis, so it is named first.
  if (hasProseMultipleChoice(input.priorAssistantText)) {
    return { suppress: true, reason: 'prose-mcq-ungradeable' }
  }
  if (!askedAnswerableQuestion(input.priorAssistantText)) {
    return { suppress: true, reason: 'no-answerable-question' }
  }
  return { suppress: false, reason: null }
}
