/**
 * THE LEARNER-MOVE READING — one closed, multi-label reading of what the
 * learner just did, folded from the detectors that already decide it.
 *
 * Design: `docs/architecture/LEARNER_MOVE_INTERPRETER_DESIGN.md` §6. Batch 0
 * of that document's 7-batch migration table: module + purity guard,
 * UNCONSUMED. No `route.ts` change accompanies this file.
 *
 * ── WHAT THIS IS NOT ────────────────────────────────────────────────────────
 * It is NOT a classifier. It contains no regex, no phrase list, and no text
 * threshold, and `learnerMovePurity.test.ts` fails the build if one appears.
 * Every member below is set from an EXISTING detector's return value. The one
 * reimplementation this repository has on record — `conversationDecision`'s
 * `CONFUSION_RE`, "a second, narrower copy of exactly the pattern H1 fixed in
 * masteryGate" — drifted and reached learners. That is the whole reason this
 * module composes instead of deciding (design doc §3.3, §5.2).
 *
 * It is also NOT an authority. `turnArbitration` decides who owns the turn;
 * this decides only what was read. Wiring a precedence rule in here would
 * create a second copy of `TURN_AUTHORITY_ORDER`, which is the defect Phase 3
 * removed (design doc §6.3).
 *
 * ── WHAT WAS WIRED IN BATCH 0, AND WHAT BATCH 3 ADDED ───────────────────────
 * Batch 0 wired: `DISTRESS`/`NOT_KNOWING` (`TurnIntent.failureState`),
 * `QUESTION_ABOUT_TASK` (`TurnIntent.isQuestion`), `HELP_REQUEST`
 * (`TurnIntent.learnerRequest`), `PRACTICE_REQUEST`
 * (`TurnIntent.wantsPractice`), `STOP` (`TurnIntent.wantsToStop`),
 * `ACKNOWLEDGEMENT` (`isBareAcknowledgement`/`isLowSignalAcknowledgement`,
 * supplied via `extra` rather than re-called here — see below),
 * `ANSWER_ATTEMPT`/`QUESTION_ABOUT_TOPIC` (stage B, state-refined). The
 * design doc's migration table (§8) deliberately deferred seven detectors —
 * `isSatisfactionSignal`, `isClaimChallenge`, `detectStatedInability`,
 * `detectNavigationRequest`, `detectAutonomyRequest`, `isExplicitCorrection`,
 * `isReturnRequest` — to Batch 3 ("wire the 7 orphan detectors … today in
 * no taxonomy layer"). Their `LearnerMoveKind` members (`SATISFACTION`,
 * `CLAIM_CHALLENGE`, `STATED_INABILITY`, `NAVIGATION`, `AUTONOMY`,
 * `CORRECTION`, `RETURN_TO_LESSON`) were already declared by Batch 0 — the
 * taxonomy has been closed and complete since Batch 0 — but produced no
 * signal until now.
 *
 * BATCH 3 (this batch) wires all seven into stage A (`readLearnerMove`),
 * reading `intent.message` directly — every one is pure and message-only,
 * so none needed a new `MessageOnlyDetectorOutputs` field and
 * `refineLearnerMove` (stage B) is untouched:
 *   `isSatisfactionSignal`       (`./excursion`)             -> `SATISFACTION`
 *   `isClaimChallenge`           (`./claimChallengeGuard`)   -> `CLAIM_CHALLENGE`
 *   `detectStatedInability`      (`./capabilityModel`)       -> `STATED_INABILITY`
 *   `detectNavigationRequest`    (`./conversationState`)     -> `NAVIGATION`
 *   `detectAutonomyRequest`      (`./conversationState`)     -> `AUTONOMY`
 *   `isExplicitCorrection`       (`./visual/session`)        -> `CORRECTION`
 *   `isReturnRequest`            (`./visual/session`)        -> `RETURN_TO_LESSON`
 * Six are plain booleans, pushed at `CONFIDENCE.NAMED_DETECTOR` with
 * `detail: null` — there is nothing richer to keep. `detectStatedInability`
 * is the one non-boolean (`CapabilityId[]`): pushed only when the array is
 * non-empty, `detail` carrying the disclaimed capability ids joined with
 * `,` (`LearnerMoveSignal.detail` is `string | null`, never an array).
 * Still shadow — grep-verified zero new references in `route.ts`; nothing
 * reads any of these seven kinds yet.
 *
 * ── A GENUINE GAP IN THE DESIGN DOC, FLAGGED RATHER THAN SILENTLY RESOLVED ──
 * §6.1's prose says `refineLearnerMove` calls `namedTopicUnknownTo`,
 * `engagesPendingOptions` AND `looksLikeAnswer`. Its own literal type
 * signature for `state`, three lines later in the same section, is
 * `{ pendingProbe, taughtText, lessonConceptId }` — no
 * `lastAssistantAskedQuestion`, which `looksLikeAnswer` requires as its
 * second parameter. The two cannot both be followed exactly: calling
 * `looksLikeAnswer` needs a field the literal signature does not carry.
 * Resolved by following the literal type signature verbatim (the more
 * authoritative of the two — executable code, not prose) and NOT calling
 * `looksLikeAnswer` in Batch 0. `ANSWER_ATTEMPT` this batch is decided by
 * `engagesPendingOptions` alone. Reported here and in this batch's commit
 * message, not silently resolved either way.
 *
 * ── `extra: MessageOnlyDetectorOutputs` — WHY VALUES, NOT CALLS ─────────────
 * `TurnIntent` is itself a struct of ALREADY-COMPUTED detector outputs, not a
 * set of functions this module calls — `readTurnIntent` called them once,
 * upstream. `isBareAcknowledgement`/`isLowSignalAcknowledgement` follow the
 * same shape: route.ts already computes them once (Turn Contract's authority
 * cluster carries `isBareAckHoisted`); this module receives that value rather
 * than opening a second call site for the same detector, which is exactly
 * the duplication `turnIntent.ts`'s own header names as the defect it fixes.
 */

import type { TurnIntent, TurnIntentConflict } from './turnIntent'
import { isDontKnowSignal } from './recoveryGuard'
import { engagesPendingOptions, type TutorMCQ } from './mcq'
import { namedTopicUnknownTo } from './visual/requestedTopic'
import { isSatisfactionSignal } from './excursion'
import { isClaimChallenge } from './claimChallengeGuard'
import { detectStatedInability } from './capabilityModel'
import { detectNavigationRequest, detectAutonomyRequest } from './conversationState'
import { isExplicitCorrection, isReturnRequest } from './visual/session'

/**
 * Closed. Adding a member requires a measured production case, not an
 * argument (design doc §6, verbatim).
 */
export type LearnerMoveKind =
  | 'ANSWER_ATTEMPT'        // engagesPendingOptions — state-dependent (stage B)
  | 'QUESTION_ABOUT_TOPIC'  // isGenuineQuestion + namedTopicUnknownTo — state-dependent (stage B)
  | 'QUESTION_ABOUT_TASK'   // isGenuineQuestion, no named topic outside the lesson
  | 'HELP_REQUEST'          // detectLearnerRequest  (diagram | real_life_example | explain_differently)
  | 'PRACTICE_REQUEST'      // asksForPractice — deliberately NOT a HELP_REQUEST; see turnIntent.wantsPractice
  | 'DISTRESS'              // detectFailureState
  | 'NOT_KNOWING'           // isDontKnowSignal(detectFailureState(...))
  | 'ACKNOWLEDGEMENT'       // isBareAcknowledgement / isLowSignalAcknowledgement
  | 'SATISFACTION'          // isSatisfactionSignal (./excursion)
  | 'CLAIM_CHALLENGE'       // isClaimChallenge (./claimChallengeGuard)
  | 'STATED_INABILITY'      // detectStatedInability (./capabilityModel) — non-boolean; detail carries the joined capability ids
  | 'NAVIGATION'            // detectNavigationRequest (./conversationState)
  | 'AUTONOMY'              // detectAutonomyRequest (./conversationState)
  | 'CORRECTION'            // isExplicitCorrection (./visual/session)
  | 'RETURN_TO_LESSON'      // isReturnRequest (./visual/session)
  | 'STOP'                  // detectExplicitFinishRequest
  | 'UNINTERPRETABLE'       // see below — a CORRECT outcome, never a fallback

/** One reading, with the detector that produced it and how far it can be trusted. */
export interface LearnerMoveSignal {
  readonly kind: LearnerMoveKind
  /**
   * The exact detector's owning module. Reuses `understanding/types.ts`'s
   * `ProvenanceSource` vocabulary where a member exists for it
   * (`recoveryGuard`, `masteryGate`, `conversationHeuristic`); several of the
   * detectors this module composes live in modules that vocabulary does not
   * cover (e.g. `mcq.ts`, `visual/requestedTopic.ts`), so this field is typed
   * as a plain string rather than `ProvenanceSource` — matching the design
   * doc's own literal type for this field (§6) — and uses the detector's
   * owning module's basename in those cases.
   */
  readonly source: string
  /** 0..1, carried from `Sourced<T>`'s existing calibration where one exists. */
  readonly confidence: number
  /** The detector's own richer return value, unflattened (FailureStateKey, LearnerRequest, the named topic's title, …). */
  readonly detail?: string | null
}

export interface LearnerMoveReading {
  readonly message: string
  /** EVERY reading that fired. Ordered by confidence, never truncated to one. */
  readonly signals: readonly LearnerMoveSignal[]
  /** Convenience predicate; never a substitute for reading `signals`. */
  readonly has: (k: LearnerMoveKind) => boolean
  /**
   * TRUE when NOTHING fired — not when the fold "wasn't sure".
   *
   * A first-class, declared outcome (design doc §6, citing the visual
   * generator's own `{"type":"none"}` precedent). `UNINTERPRETABLE` is
   * pushed into `signals` exactly when the fold produces none, so it is
   * queryable through `has()` the same way every other kind is — never a
   * silent side boolean with no corresponding signal.
   */
  readonly uninterpretable: boolean
  /** turnIntent.conflicts, carried through unchanged. Recorded, never resolved. */
  readonly conflicts: readonly TurnIntentConflict[]
  /** turnIntent.ambiguous, carried through unchanged. */
  readonly ambiguous: boolean
  /** Which stage produced this. Stage A is pure; stage B saw lesson/probe state. */
  readonly stage: 'message-only' | 'state-refined'
}

/**
 * Detector outputs that are message-only (no lesson/probe state) but are NOT
 * already carried on `TurnIntent`, because `TurnIntent` composes a different
 * six detectors (design doc §6's `intent` parameter is that struct, not a
 * function this module calls again).
 *
 * Deliberately minimal for Batch 0 — only the fields this batch's wired kinds
 * need. Widen additively in a later batch rather than pre-declaring fields
 * nothing yet reads.
 */
export interface MessageOnlyDetectorOutputs {
  /** masteryGate.isBareAcknowledgement(message), already computed by the caller. */
  readonly isBareAcknowledgement: boolean
  /** conversationState.isLowSignalAcknowledgement(message), already computed by the caller. */
  readonly isLowSignalAcknowledgement: boolean
}

/**
 * Confidence values. Reuses the exact ladder `readConversation` already
 * shipped (design doc §3.2/§6.2) for the rows it names; the remaining kinds
 * use the "named detector" tier §6.2 states is the floor for anything that
 * may claim a `turnArbitration` rung (">= 0.8, i.e. a named detector, never a
 * heuristic") — every detector this module composes is exactly that: a
 * named, deterministic function, never an ad hoc inline heuristic.
 */
const CONFIDENCE = {
  /** recoveryKey -> 'expressing_distress', src=recoveryGuard (design doc §3.2). */
  RECOVERY_GUARD: 0.9,
  /** isBareAcknowledgement -> 'acknowledging', src=masteryGate (design doc §3.2). */
  ACKNOWLEDGEMENT: 0.85,
  /** helpRequestKind !== null -> 'requesting_help', src=masteryGate (design doc §3.2). */
  HELP_REQUEST: 0.8,
  /** isQuestion -> 'asking_question', src=conversationHeuristic (design doc §3.2). */
  QUESTION: 0.7,
  /** Every other named, deterministic detector this module composes (§6.2 floor). */
  NAMED_DETECTOR: 0.8,
  /** "Nothing fired" is itself a fact the fold is certain of, not a guess. */
  UNINTERPRETABLE: 1,
} as const

function finalize(
  message: string,
  signals: LearnerMoveSignal[],
  conflicts: readonly TurnIntentConflict[],
  ambiguous: boolean,
  stage: LearnerMoveReading['stage'],
): LearnerMoveReading {
  const withUninterpretable =
    signals.length === 0
      ? [
          ...signals,
          {
            kind: 'UNINTERPRETABLE' as const,
            source: 'learnerMove',
            confidence: CONFIDENCE.UNINTERPRETABLE,
            detail: null,
          },
        ]
      : signals
  const ordered = [...withUninterpretable].sort((a, b) => b.confidence - a.confidence)
  return {
    message,
    signals: ordered,
    has: (k: LearnerMoveKind) => ordered.some((s) => s.kind === k),
    uninterpretable: ordered.length === 1 && ordered[0].kind === 'UNINTERPRETABLE',
    conflicts,
    ambiguous,
    stage,
  }
}

/**
 * STAGE A — pure, message-only. Cacheable. Zero state, zero I/O, zero model
 * calls, zero NEW detector calls: everything read here was already computed
 * by `readTurnIntent` or by the caller (`extra`).
 */
export function readLearnerMove(
  intent: TurnIntent,
  extra: MessageOnlyDetectorOutputs,
): LearnerMoveReading {
  const signals: LearnerMoveSignal[] = []

  if (intent.failureState !== null) {
    signals.push({
      kind: 'DISTRESS',
      source: 'recoveryGuard',
      confidence: CONFIDENCE.RECOVERY_GUARD,
      detail: intent.failureState,
    })
    if (isDontKnowSignal(intent.failureState)) {
      signals.push({
        kind: 'NOT_KNOWING',
        source: 'recoveryGuard',
        confidence: CONFIDENCE.RECOVERY_GUARD,
        detail: intent.failureState,
      })
    }
  }

  if (intent.isQuestion) {
    signals.push({
      kind: 'QUESTION_ABOUT_TASK',
      source: 'conversationReader',
      confidence: CONFIDENCE.QUESTION,
      detail: null,
    })
  }

  if (intent.learnerRequest !== null) {
    signals.push({
      kind: 'HELP_REQUEST',
      source: 'masteryGate',
      confidence: CONFIDENCE.HELP_REQUEST,
      detail: intent.learnerRequest,
    })
  }

  if (intent.wantsPractice) {
    signals.push({
      kind: 'PRACTICE_REQUEST',
      source: 'masteryGate',
      confidence: CONFIDENCE.NAMED_DETECTOR,
      detail: null,
    })
  }

  if (intent.wantsToStop) {
    signals.push({
      kind: 'STOP',
      source: 'sessionLifecycle',
      confidence: CONFIDENCE.NAMED_DETECTOR,
      detail: null,
    })
  }

  if (extra.isBareAcknowledgement || extra.isLowSignalAcknowledgement) {
    signals.push({
      kind: 'ACKNOWLEDGEMENT',
      source: 'masteryGate',
      confidence: CONFIDENCE.ACKNOWLEDGEMENT,
      detail: null,
    })
  }

  // Batch 3 — the 7 previously-orphan detectors (module header). All seven
  // are pure and message-only; none needed a new `extra` field.
  if (isSatisfactionSignal(intent.message)) {
    signals.push({
      kind: 'SATISFACTION',
      source: 'excursion',
      confidence: CONFIDENCE.NAMED_DETECTOR,
      detail: null,
    })
  }

  if (isClaimChallenge(intent.message)) {
    signals.push({
      kind: 'CLAIM_CHALLENGE',
      source: 'claimChallengeGuard',
      confidence: CONFIDENCE.NAMED_DETECTOR,
      detail: null,
    })
  }

  // The one non-boolean detector: fires only when the learner disclaimed at
  // least one capability. `detail` is `string | null`, never an array, so
  // multiple disclaimed capabilities are joined rather than dropped.
  const statedInability = detectStatedInability(intent.message)
  if (statedInability.length > 0) {
    signals.push({
      kind: 'STATED_INABILITY',
      source: 'capabilityModel',
      confidence: CONFIDENCE.NAMED_DETECTOR,
      detail: statedInability.join(','),
    })
  }

  if (detectNavigationRequest(intent.message)) {
    signals.push({
      kind: 'NAVIGATION',
      source: 'conversationState',
      confidence: CONFIDENCE.NAMED_DETECTOR,
      detail: null,
    })
  }

  if (detectAutonomyRequest(intent.message)) {
    signals.push({
      kind: 'AUTONOMY',
      source: 'conversationState',
      confidence: CONFIDENCE.NAMED_DETECTOR,
      detail: null,
    })
  }

  if (isExplicitCorrection(intent.message)) {
    signals.push({
      kind: 'CORRECTION',
      source: 'visual/session',
      confidence: CONFIDENCE.NAMED_DETECTOR,
      detail: null,
    })
  }

  if (isReturnRequest(intent.message)) {
    signals.push({
      kind: 'RETURN_TO_LESSON',
      source: 'visual/session',
      confidence: CONFIDENCE.NAMED_DETECTOR,
      detail: null,
    })
  }

  return finalize(intent.message, signals, intent.conflicts, intent.ambiguous, 'message-only')
}

/**
 * STAGE B — refine with state the message alone cannot supply (design doc
 * §4.3). Adds `ANSWER_ATTEMPT` when a probe is pending and the reply engages
 * its options, and adds `QUESTION_ABOUT_TOPIC` when a question names a topic
 * outside the lesson's own taught text.
 *
 * Monotone: may ADD a signal, never remove one already in `reading.signals`.
 * `resolveMcqChoice` is never called here — its strictness is untouched and
 * its output remains grading's sole input (design doc §6.1, §7, §9 item 3).
 *
 * `state.lessonConceptId` is accepted per the design doc's literal type but
 * not consumed by any decision in this batch — no wired kind currently
 * branches on it. Kept rather than narrowed, since the literal signature is
 * the specified contract; a future batch may give it a use.
 */
export function refineLearnerMove(
  reading: LearnerMoveReading,
  state: { pendingProbe: TutorMCQ | null; taughtText: string | null; lessonConceptId: string | null },
): LearnerMoveReading {
  const added: LearnerMoveSignal[] = []

  if (state.pendingProbe !== null && engagesPendingOptions(reading.message, state.pendingProbe)) {
    added.push({
      kind: 'ANSWER_ATTEMPT',
      source: 'mcq',
      confidence: CONFIDENCE.NAMED_DETECTOR,
      detail: null,
    })
  }

  if (reading.has('QUESTION_ABOUT_TASK') && state.taughtText !== null) {
    const requested = namedTopicUnknownTo(reading.message, state.taughtText)
    if (requested !== null) {
      added.push({
        kind: 'QUESTION_ABOUT_TOPIC',
        source: 'requestedTopic',
        confidence: CONFIDENCE.QUESTION,
        detail: requested.title,
      })
    }
  }

  if (added.length === 0) {
    // Nothing to add. Every already-fired signal is carried through
    // untouched (monotone), and the synthetic UNINTERPRETABLE placeholder, if
    // present, is still correct — nothing changed. Just relabel the stage.
    return { ...reading, stage: 'state-refined' }
  }

  // A real signal is about to be added, so the synthetic UNINTERPRETABLE
  // placeholder (finalize's own bookkeeping for "the fold produced nothing",
  // never a genuine detector reading) is now factually false and is dropped
  // here rather than carried forward — the ONE exception to "never remove a
  // signal": it removes only a marker this module itself synthesized to mean
  // "nothing fired," which is no longer true. Every REAL signal a detector
  // produced is still carried through unconditionally.
  const base = reading.uninterpretable ? [] : [...reading.signals]
  return finalize(reading.message, [...base, ...added], reading.conflicts, reading.ambiguous, 'state-refined')
}
