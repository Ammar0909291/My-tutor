/**
 * Objective Model — S2 (Runtime Redesign Mission Part 5), the NEW-2 module
 * authorized by the design report's OWNERSHIP DECISION table.
 *
 * Root cause this closes (RC-6 in the design report): there was no
 * representation anywhere in the runtime of "the current learning
 * objective" or "which objectives have been completed." The finest
 * granularity that existed was currentConceptNodeId — a topic identity, not
 * a completion ledger. Consequently two of the mission's hard invariants
 * were unstatable: "a correct answer must advance the objective" and "a
 * completed objective cannot be re-assessed" have no noun to attach to
 * without this module.
 *
 * Deliberately NOT a second mastery model. masteryVerified() (masteryGate.ts)
 * remains the ONE authority for "has this concept's mastery evidence been
 * met" — this module only adds the session-scoped bookkeeping around that
 * single fact (when it became true, how many attempts led up to it, how
 * many turns have passed since anything advanced). Any attempt to
 * reimplement the mastery threshold here would violate this codebase's own
 * single-writer-per-concern discipline (see ADR 10 in project memory).
 *
 * Scope: ONE objective per concept, matching ConversationState's own
 * per-concept reset contract (readConversationState resets when
 * currentConceptId changes) — an "objective" here IS the current concept's
 * lesson goal, not a sub-decomposition of it. A multi-objective-per-concept
 * model is a real future extension but is not required by anything in the
 * mission and would be new architecture the mission doesn't ask for.
 *
 * Pure module: no DB, no I/O. Persisted in contextSnapshot.objectiveState
 * alongside every other per-turn counter in this codebase — no new store,
 * no schema migration.
 */

import type { ConversationState } from './conversationState'
import { masteryVerified } from './masteryGate'

export interface ObjectiveState {
  /** The concept this objective belongs to. Resets the whole state when
   *  this changes, exactly like ConversationState.conceptId. */
  objectiveId: string | null
  /** Every attempt at a check/practice/assessment item for this objective,
   *  correct or not — the raw attempt count Part 5 asks for. */
  attemptCount: number
  /** Attempts specifically at ASSESSMENT-category items (ASSESS phase or
   *  later) — distinct from attemptCount because a diagnostic guess and a
   *  graded assessment attempt are different things to report. */
  assessmentCount: number
  /** ISO timestamp of the turn masteryVerified() first became true for this
   *  objective, or null if not yet completed. Set once, never cleared —
   *  mastery, once verified, is stable within the concept (masteryGate.ts's
   *  own invariant), so completion cannot un-happen mid-session. */
  completedAt: string | null
  /** Turns elapsed since ANY advancement was observed for this objective:
   *  a phase transition, a newly-correct signal, or completion. Feeds
   *  I-10 (V-NOPROGRESS). Resets to 0 on any such advancement. */
  turnsSinceProgress: number
}

export function initialObjectiveState(objectiveId: string | null): ObjectiveState {
  return {
    objectiveId,
    attemptCount: 0,
    assessmentCount: 0,
    completedAt: null,
    turnsSinceProgress: 0,
  }
}

/** Total: never throws. Resets when the objective (concept) changed, or
 *  when the persisted shape is unrecognisable — matching
 *  conversationState.readConversationState's own contract exactly. */
export function readObjectiveState(raw: unknown, currentObjectiveId: string | null): ObjectiveState {
  if (raw && typeof raw === 'object') {
    const s = raw as Partial<ObjectiveState>
    if (typeof s.objectiveId === 'string' || s.objectiveId === null) {
      if (s.objectiveId === currentObjectiveId) {
        return { ...initialObjectiveState(currentObjectiveId), ...s }
      }
    }
  }
  return initialObjectiveState(currentObjectiveId)
}

export interface ObjectiveTurnEvidence {
  /** Was this turn a check/practice/assessment ATTEMPT (an answer to a
   *  graded item), regardless of correctness? Distinct from a diagnostic
   *  probe or a bare acknowledgement — callers pass the same
   *  teachingSignal.correctness !== undefined test the rest of the route
   *  already uses to mean "this turn carried a graded answer." */
  wasAttempt: boolean
  /** Was this specifically an ASSESSMENT-phase attempt (state.phase ===
   *  'CHECK' | 'PRACTICE' | 'TRANSFER' at attempt time)? */
  wasAssessmentAttempt: boolean
  /** The ConversationState AFTER this turn's evidence has already been
   *  folded (advanceConversationState's output) — masteryVerified() reads
   *  this, never a pre-fold snapshot, so objective completion can never
   *  race ahead of the concept ladder's own evidence gates. */
  stateAfterTurn: ConversationState | null
  /** Did the concept ladder's phase actually change this turn (any
   *  direction)? Reused from the caller's own transition result rather
   *  than recomputed — this module must not own phase-transition logic. */
  phaseAdvanced: boolean
  /** ISO timestamp for this turn — used only to stamp completedAt. */
  nowIso: string
}

/** Fold one turn's evidence into the objective state. Pure. */
export function advanceObjectiveState(state: ObjectiveState, ev: ObjectiveTurnEvidence): ObjectiveState {
  const attemptCount = state.attemptCount + (ev.wasAttempt ? 1 : 0)
  const assessmentCount = state.assessmentCount + (ev.wasAssessmentAttempt ? 1 : 0)

  const justCompleted = state.completedAt === null && masteryVerified(ev.stateAfterTurn)
  const completedAt = justCompleted ? ev.nowIso : state.completedAt

  const correctEvidenceThisTurn = ev.wasAttempt &&
    ((ev.stateAfterTurn?.correctAtCheck ?? 0) + (ev.stateAfterTurn?.correctAtPractice ?? 0) > 0)
  const progressed = ev.phaseAdvanced || justCompleted || correctEvidenceThisTurn
  const turnsSinceProgress = progressed ? 0 : state.turnsSinceProgress + 1

  return { ...state, attemptCount, assessmentCount, completedAt, turnsSinceProgress }
}

/** I-3 support: is it currently illegal to re-enter this objective as an
 *  assessment target? True once completedAt is set — masteryGate's own
 *  invariant ("mastery, once verified, is stable") means this can never
 *  become false again for the same objective within the session. */
export function isObjectiveLockedFromAssessment(state: ObjectiveState): boolean {
  return state.completedAt !== null
}

/** I-10 support (V-NOPROGRESS, LOG severity — never a gate, per the design
 *  report: "escalate to an authoring flag, not a rerender; a rerender
 *  cannot fix a curriculum problem"). Threshold of 8 matches the design
 *  report's own I-10 specification verbatim. */
export const NO_PROGRESS_TURN_THRESHOLD = 8

export function hasStalled(state: ObjectiveState): boolean {
  return state.turnsSinceProgress >= NO_PROGRESS_TURN_THRESHOLD
}

/**
 * PHASE B — A NEW ATTEMPT HAS COMPLETED NOTHING.
 *
 * `completedAt` is documented above as "set once, never cleared — mastery,
 * once verified, is stable WITHIN THE CONCEPT". A restart keeps the concept,
 * so the objective of a brand-new attempt is born already carrying the
 * previous attempt's `completedAt`, `attemptCount` and `assessmentCount`, and
 * `isObjectiveLockedFromAssessment` reports true on turn one.
 *
 * Consequence today is LOG-ONLY (the verifier's S2 rules are additive and do
 * not gate), and that is stated rather than overclaimed — but the value is
 * demonstrably false about the attempt it describes, and the S2 rules exist to
 * be promoted to REJECT.
 *
 * A DELTA for writeSnapshotDelta. `readObjectiveState` maps a non-object to
 * `initialObjectiveState(objectiveId)`, so no reader changes.
 */
export function clearObjectiveForNewAttempt(): Record<string, unknown> {
  return { objectiveState: null }
}
