/**
 * TURN DECISION — provenance, Phase 0. OBSERVATION ONLY.
 *
 * ── WHAT THIS IS, AND WHAT IT DELIBERATELY IS NOT ───────────────────────────
 * The architecture audit found that no artefact records what a learner turn
 * MEANS. Decisions are made in source order across ~6,900 lines, 28 separate
 * writers can rewrite the learner-visible text, and when two of them disagree
 * there is nothing to compare them against. Every recorded guard collision in
 * this codebase is that absence.
 *
 * This module is the smallest possible answer to one question:
 *
 *     "What did Tutor Max decide this turn, and where did each part come from?"
 *
 * It is NOT a decision engine. It decides nothing, owns nothing, and changes
 * nothing. `buildTurnDecision` is a pure projection of values the route has
 * ALREADY computed; if the route computed nothing, the field is null and stays
 * null. A guessed field would be worse than a missing one, because the whole
 * purpose of this record is to be trustworthy enough to migrate on.
 *
 * ── WHY EIGHT FIELDS AND NOT EIGHTY ─────────────────────────────────────────
 * The failure mode for a record like this is becoming the god object it was
 * meant to replace. The cap is deliberate: these eight are the decisions that
 * the audit found MULTIPLE components independently making or overriding. A
 * field that no downstream layer can contradict does not need provenance and
 * does not belong here.
 *
 * ── VOCABULARY ──────────────────────────────────────────────────────────────
 * Every field reuses a type the runtime already owns — Representation from the
 * visual layer, TeachingLevel from teachingGranularity, SessionPhase from
 * sessionLifecycle. No parallel educational vocabulary is introduced.
 */
import type { Representation } from './visual/types'
import type { TeachingLevel } from './teachingGranularity'
import type { SessionPhase } from './sessionLifecycle'

/**
 * The educational decision a single turn represents.
 *
 * Null means NOT DECIDED THIS TURN — never "unknown, so probably X". Several
 * of these legitimately have no value on many turns (no probe was selected, no
 * figure was admitted), and that is information, not a gap.
 */
export interface TurnDecision {
  /** The TEACHING TARGET — the excursion's target when one is open, else the
   *  lesson's concept. Not "the lesson": those differ, and the difference is
   *  exactly what the audit found unrecorded. */
  conceptId: string | null
  /** The engine's own move for this turn ('ask' | 'teach'), as decided by the
   *  evidence ladder — not inferred from the text that shipped. */
  teachingAct: string | null
  /** The visual layer's chosen representation, or null when nothing graphical
   *  was chosen. */
  representation: Representation | null
  /** The authored probe the server attached, by asset id. Null when the gate
   *  selected none — including when it was deliberately withheld. */
  probeId: string | null
  /** The ADMITTED figure's artefact id. Null when no figure was admitted. */
  figureId: string | null
  /** Session lifecycle phase for this turn. */
  lifecycle: SessionPhase | null
  /** Teaching granularity decided for this turn. */
  granularity: TeachingLevel | null
  /** Short human-readable trace of why the figure/teaching target came out this
   *  way, taken verbatim from the layer that produced it. Never composed prose. */
  reason: string | null
}

/**
 * What the turn ACTUALLY shipped, read at the point of response.
 *
 * Kept separate from TurnDecision on purpose: the decision is what was chosen,
 * this is what the learner received, and the entire value of Phase 0 is being
 * able to see them diverge.
 */
export interface TurnObservation {
  /** A tappable, server-graded question rode along with the response. */
  mcqAttached: boolean
  /** A figure rode along with the response. */
  figureAttached: boolean
  /** WHOSE figure it is — the asset's own concept, which is not always the
   *  concept that was asked for. */
  figureConceptId: string | null
  /** The shipped text ends in a question. Text-shape, and labelled as such:
   *  it is evidence about the rendered turn, never an input to any decision. */
  textAsksAQuestion: boolean
}

export interface DecisionDivergence {
  code:
    | 'FIGURE_CONCEPT_MISMATCH'
    | 'PROBE_DECIDED_NOT_SHIPPED'
    | 'QUESTION_SHIPPED_WITHOUT_PROBE'
    | 'QUESTION_ON_CLOSING_TURN'
  detail: string
}

/**
 * Compare what was decided with what shipped.
 *
 * PURE. Returns findings; changes nothing, blocks nothing, and is not consulted
 * by any decision. Phase 0's job is to make disagreement VISIBLE — acting on it
 * is a later phase and deliberately not done here.
 *
 * Each code corresponds to a disagreement the audit observed in production:
 *   FIGURE_CONCEPT_MISMATCH        a held figure narrated as the current concept
 *   PROBE_DECIDED_NOT_SHIPPED      the gate chose a probe, something dropped it
 *   QUESTION_SHIPPED_WITHOUT_PROBE a question reached the learner that the
 *                                  server cannot grade
 *   QUESTION_ON_CLOSING_TURN       the learner asked to stop and was asked
 *                                  something anyway
 */
export function detectDecisionDivergence(
  decision: TurnDecision,
  observed: TurnObservation,
): DecisionDivergence[] {
  const out: DecisionDivergence[] = []

  if (
    observed.figureAttached &&
    observed.figureConceptId &&
    decision.conceptId &&
    observed.figureConceptId !== decision.conceptId
  ) {
    out.push({
      code: 'FIGURE_CONCEPT_MISMATCH',
      detail: `teaching ${decision.conceptId}, figure belongs to ${observed.figureConceptId}`,
    })
  }

  if (decision.probeId && !observed.mcqAttached) {
    out.push({
      code: 'PROBE_DECIDED_NOT_SHIPPED',
      detail: `probe ${decision.probeId} was selected but no gradeable question shipped`,
    })
  }

  if (!decision.probeId && observed.mcqAttached) {
    out.push({
      code: 'QUESTION_SHIPPED_WITHOUT_PROBE',
      detail: 'a gradeable question shipped that the gate did not select',
    })
  }

  if (decision.lifecycle === 'CLOSING' && (observed.mcqAttached || observed.textAsksAQuestion)) {
    out.push({
      code: 'QUESTION_ON_CLOSING_TURN',
      detail: 'the session is closing and the turn still asks something',
    })
  }

  return out
}

/**
 * One structured log line, matching the '[learn/chat] CUE understanding=' shape
 * this route already uses for observability. No new telemetry mechanism, no new
 * table, no schema change.
 */
export function formatTurnDecisionLog(
  decision: TurnDecision,
  observed: TurnObservation,
  divergences: DecisionDivergence[],
): string {
  return '[turn-decision] ' + JSON.stringify({
    decision,
    observed,
    divergences: divergences.map((d) => d.code),
    divergenceDetail: divergences.length ? divergences.map((d) => d.detail) : undefined,
  })
}
