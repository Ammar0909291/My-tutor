/**
 * DOES A FIGURE HELP ON THIS TURN?
 *
 * THE QUESTION THE ENGINE WAS NOT ASKING. Everything downstream answers "is
 * there a faithful figure for this concept?" — identity, admission, scope,
 * generation, grounding. Nothing asked whether the learner, on this turn,
 * benefits from seeing one. So a concept with a curated figure showed it
 * whenever continuity allowed, including on turns where the learner was
 * mid-answer and the tutor was mid-question.
 *
 * route.ts already named this gap in its own words, when the old post-hoc
 * suppression blocks were removed: "Suppression belongs on the resolver's
 * INPUT, not on its output; that is a later milestone." This is that milestone,
 * and it is on the input side for the reason that comment gives — filtering a
 * single authority's OUTPUT is a second authority wearing a disguise.
 *
 * ── SUPPRESS MEANS "DO NOT INTRODUCE", NEVER "REMOVE" ───────────────────────
 * The one thing this must not do is blank the screen. A learner answering a
 * question about the figure in front of them needs that figure to stay exactly
 * where it is. So suppression withholds a NEW figure; a held one is left to
 * continuity, which already knows how to hold. Getting this backwards would
 * turn a pacing improvement into a flicker.
 *
 * Pure and synchronous. No I/O, no model, no KG lookups, no keyword table for
 * choosing WHAT to draw — that is the archetype-engine failure and it is not
 * repeated here. This module only decides WHETHER.
 */

import { looksLikeAnswer } from './session'
import type { VisualSession } from './session'
import type { LearnerRequest } from '@/lib/teaching/masteryGate'

/**
 * required  the learner asked, or the teaching situation demands it. A figure
 *           is introduced if one exists.
 * helpful   the ordinary case. A figure is introduced if one exists; its
 *           absence is not a failure.
 * suppress  do not introduce a new figure this turn. A figure already on
 *           screen is untouched.
 */
export type VisualNeed = 'required' | 'helpful' | 'suppress'

export interface VisualNeedVerdict {
  need: VisualNeed
  /** Why, in a form fit for a log line and an audit. Never empty. */
  reason: string
}

export interface VisualNeedInput {
  message: string
  learnerRequest?: LearnerRequest | null
  remediationTier?: number
  lastAssistantAskedQuestion?: boolean
  activeSession?: VisualSession | null
}

/**
 * The remediation depth at which a figure stops being optional.
 *
 * Mirrors the ladder route.ts already implements for `explain_differently`:
 * after this many failed attempts on one concept, "explain it differently"
 * means show it, not say it again. Kept as a named constant so the two places
 * cannot drift into disagreeing about what tier three means.
 */
const REMEDIATION_TIER_REQUIRING_VISUAL = 3

/**
 * Longest utterance still treated as a bare answer.
 *
 * "12", "yes", "the second one" are answers. "I still don't understand it" is
 * 27 characters and is a doubt, not an answer — and it is exactly the turn a
 * figure should be allowed to appear on. The bound is deliberately tight: this
 * decision may only ever withhold a figure it is confident about.
 */
const MAX_ANSWER_LENGTH = 24

export function decideVisualNeed(input: VisualNeedInput): VisualNeedVerdict {
  // 1. THE LEARNER ASKED. Nothing outranks this — not pacing, not the fact that
  //    the tutor happens to be mid-question.
  if (input.learnerRequest === 'diagram') {
    return { need: 'required', reason: 'learner-asked-for-a-figure' }
  }

  // 2. THE LADDER. Saying it a fourth way has already failed three times.
  if (
    input.learnerRequest === 'explain_differently' &&
    (input.remediationTier ?? 0) >= REMEDIATION_TIER_REQUIRING_VISUAL
  ) {
    return { need: 'required', reason: 'remediation-ladder-reached-visual-tier' }
  }

  // 3. NO LEARNER TURN AT ALL.
  //    An empty message is how the restore path and the audits call the
  //    resolver: there is no utterance to interpret, so nothing may move the
  //    figure. `looksLikeAnswer` deliberately treats that as answer-shaped,
  //    because HOLD is exactly what a restore wants — but suppression is about
  //    not interrupting a learner mid-answer, and there is no learner here to
  //    interrupt. Without this the gate silently withholds every figure on
  //    every restore and every offline audit.
  if (!input.message.trim()) {
    return { need: 'helpful', reason: 'no-learner-utterance' }
  }

  // 4. THE LEARNER IS ANSWERING, NOT ASKING.
  //    A short reply to the tutor's question is an answer. Introducing a figure
  //    here interrupts the learner mid-thought and changes the subject at the
  //    exact moment they committed to one. Continuity already refuses to MOVE a
  //    figure on such a turn; this refuses to INTRODUCE one, which is the same
  //    principle applied one step earlier.
  //
  //    THE LENGTH GUARD IS NOT DECORATION. `looksLikeAnswer` is calibrated for
  //    a different question — "may the figure MOVE" — and it answers yes for
  //    utterances that are plainly not answers: measured, "I still don't
  //    understand it" is answer-shaped to it. That sentence is a DOUBT, and a
  //    doubt is the moment a figure helps most, so suppressing there would be
  //    the opposite of the intent. Rather than re-classify meaning with a
  //    keyword table — the archetype-engine mistake — suppression is confined
  //    to utterances short enough to be a bare answer. A wrong suppression is
  //    worse than no suppression, because this engine shipped for months with
  //    none at all.
  const terse = input.message.trim().length <= MAX_ANSWER_LENGTH
  if (terse && looksLikeAnswer(input.message, input.lastAssistantAskedQuestion ?? false)) {
    return { need: 'suppress', reason: 'turn-is-an-answer-not-a-request' }
  }

  return { need: 'helpful', reason: 'ordinary-teaching-turn' }
}

/**
 * May a NEW figure be introduced on this turn?
 *
 * The active session is the reason this is a separate question from the
 * verdict: with a figure already on screen there is nothing to introduce, and
 * suppression has no work to do — continuity owns that turn.
 */
export function mayIntroduceFigure(verdict: VisualNeedVerdict, activeSession?: VisualSession | null): boolean {
  if (activeSession) return true
  return verdict.need !== 'suppress'
}
