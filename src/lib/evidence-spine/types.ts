/**
 * EOS M1 — Evidence Spine: event envelope + typed catalog.
 *
 * Implements the v1 subset of EOS_V2_RUNTIME_SPECIFICATION.md §2 (event
 * system): the envelope (§2.1), a 12-type catalog (subset of §2.3 — only
 * events the CURRENT runtime can honestly emit), per-type payload schemas,
 * schema versioning, idempotency keys, and replay classes.
 *
 * Everything here is pure data + pure functions. The spine runs in parallel
 * to the existing runtime; nothing existing reads it yet (M1 scope).
 */
import { createHash } from 'node:crypto'

// ── Replay classes (RS §2.1 E-4) ─────────────────────────────────────────────
// INPUT   — perception/learner facts; fed back in during replay.
// DERIVED — kernel outputs; recomputed and diffed during replay, never fed in.
export type ReplayClass = 'INPUT' | 'DERIVED'

// ── Event catalog (closed set — adding a type is a spec/version event) ───────
export const SPINE_EVENT_TYPES = [
  'StudentMessageReceived',
  'AssistantRendered',
  'AnswerObserved',
  'UtteranceStateDetected',
  'AutonomyRequested',
  'RecoveryEntered',
  'RecoveryExited',
  'DecisionRecorded',
  'PhaseTransitioned',
  'SessionBoundaryDetected',
  'LessonCompleted',
  'CapabilityObserved',
] as const
export type SpineEventType = (typeof SPINE_EVENT_TYPES)[number]

export const REPLAY_CLASS: Record<SpineEventType, ReplayClass> = {
  StudentMessageReceived: 'INPUT',
  AssistantRendered: 'DERIVED',
  AnswerObserved: 'INPUT',
  UtteranceStateDetected: 'INPUT',
  AutonomyRequested: 'INPUT',
  RecoveryEntered: 'DERIVED',
  RecoveryExited: 'DERIVED',
  DecisionRecorded: 'DERIVED',
  PhaseTransitioned: 'DERIVED',
  SessionBoundaryDetected: 'INPUT',
  LessonCompleted: 'DERIVED',
  CapabilityObserved: 'DERIVED',
}

/** Current payload schema version per type. Folds accept versions ≤ current
 * for which a decoder exists; unknown versions are skipped, never guessed. */
export const CURRENT_SCHEMA_VERSION: Record<SpineEventType, number> = {
  StudentMessageReceived: 1,
  AssistantRendered: 1,
  AnswerObserved: 1,
  UtteranceStateDetected: 1,
  AutonomyRequested: 1,
  RecoveryEntered: 1,
  RecoveryExited: 1,
  DecisionRecorded: 2,
  PhaseTransitioned: 1,
  SessionBoundaryDetected: 1,
  LessonCompleted: 1,
  CapabilityObserved: 1,
}

// ── Per-type payloads (v1 schemas — exhaustive field lists) ──────────────────
// PRIVACY NOTE (ISS-18 prudence): the spine stores NO verbatim learner text.
// UtteranceStateDetected carries only the classified failure-state key;
// StudentMessageReceived carries only length metadata.

export interface StudentMessageReceivedV1 { length: number; latencyFromPrevTurnMs: number | null }
export interface AssistantRenderedV1 { length: number; askedQuestion: boolean; provider: string | null }
export interface AnswerObservedV1 {
  correct: boolean | null
  statedConfidence: 'low' | 'medium' | 'high' | null
  confusion: boolean
  conceptId: string | null
  capabilityRefs: string[]
  diagnostic: boolean
}
export interface UtteranceStateDetectedV1 { failureStateKey: string; strength: 'strong' | 'mild' | 'unknown' }
export interface AutonomyRequestedV1 { honored: boolean }
export interface RecoveryEnteredV1 { failureStateKey: string; escalationRung: 0 | 1 | 2; sessionFailureCount: number }
export interface RecoveryExitedV1 { failureStateKey: string; turnsInRecovery: number }
export interface DecisionRecordedV1 {
  move: string | null            // teach | show | ask (Phase E) — null pre-directive turns
  phase: string | null           // conversationState phase at decision time
  recoveryPreempted: boolean
  workedExampleFirst: boolean
  stageCeiling: number | null
  provenance: string[]           // rule-path lite: named runtime rules that fired
}

// ── DecisionRecorded v2 — the unified turn-capture field group ────────────────
// One event, one payload, one turn: the ASV snapshot, the adjustment record and
// the AttemptVector are ONE field group on ONE event, never two capture paths.
//
// STRUCTURAL ONLY. Every field below is optional and NOTHING POPULATES THEM
// TODAY. The producers do not exist in this repository:
//   · AttemptVector          — producer is Phase 1 §14.2 Stage 1 (P1-1)
//   · AdaptationStateVector  — producer is C-32 typed output (AH-1), the one
//                              genuine external dependency; `C-32` has no
//                              occurrence in src/
//   · AdjustmentRecord       — producer is AH-3
//   · consumesReteachBudget  — producer is AH-12 (no reteach budget in src/)
// A field left undefined is an honest "not captured", never a default. Do NOT
// derive any of these from rendered output: Phase 1 §11.2 resolved that
// AttemptVector is CAPTURED, not derived, because inferring the pedagogical
// intent axes from what was produced is guessing.

/** Phase 1 §7.4.1's eight axes. Axes 4, 6 and 7 are ordered; all are optional
 *  because a producer may know some axes and honestly not know others. */
export interface AttemptVectorV2 {
  channel?: 'verbal' | 'visual' | 'enactive' | 'symbolic' | 'auditory'
  method?: string                                        // M1…M17 (TQ-3)
  representation?: 'concrete-object' | 'diagram' | 'graph' | 'table' | 'algebraic' | 'narrative' | 'physical-apparatus'
  concreteness?: 'enactive' | 'iconic' | 'symbolic'      // ordered
  entryPoint?: 'definition-first' | 'example-first' | 'problem-first' | 'phenomenon-first' | 'contrast-first'
  granularity?: 'whole' | 'decomposed' | 'atomic-step'   // ordered
  agency?: 'tutor-does' | 'joint' | 'learner-does'       // ordered
  instance?: string                                      // AssetIdentity id / analogy source / example ref
}

/** TODO(AH-1): shape is owned by EOS `C-32`, which has no live producer. Left
 *  deliberately open rather than invented — a wrong committed shape would have
 *  to be versioned away again. Populated only once AH-1 lands. */
export interface AdaptationStateVectorV2 {
  difficultyTarget?: number
  hintPolicy?: string
  /** RS §3.4 `scaffoldDial`: 0–4 (0 = full worked, 4 = solo), GUIDED only. */
  scaffoldDial?: 0 | 1 | 2 | 3 | 4
  withheld?: boolean
}

/** TODO(AH-3): what the adjustment changed, and why. */
export interface AdjustmentRecordV2 {
  dimension?: string
  from?: string | number | null
  to?: string | number | null
  reason?: string
}

export interface DecisionRecordedV2 extends DecisionRecordedV1 {
  attemptVector?: AttemptVectorV2
  adaptationState?: AdaptationStateVectorV2
  adjustmentRecord?: AdjustmentRecordV2
  /** TODO(AH-12): set by the Band-2 governor once Phase 1 §7.7's budget
   *  counter is readable. Undefined = not captured, NOT false. */
  consumesReteachBudget?: boolean
}
export interface PhaseTransitionedV1 { machine: 'conversation'; from: string; to: string; direction: 'up' | 'down' | 'reset' }
export interface SessionBoundaryDetectedV1 { gapMs: number | null; boundaryType: 'inactivity' | 'explicit' | 'unknown' }
export interface LessonCompletedV1 { conceptId: string | null; certification: 'provisional' | 'signal' }
export interface CapabilityObservedV1 { capabilityId: string; direction: 'success' | 'failure' | 'stated_no'; diagnostic: boolean }

export type SpinePayload =
  | StudentMessageReceivedV1 | AssistantRenderedV1 | AnswerObservedV1
  | UtteranceStateDetectedV1 | AutonomyRequestedV1 | RecoveryEnteredV1
  | RecoveryExitedV1 | DecisionRecordedV1 | DecisionRecordedV2 | PhaseTransitionedV1
  | SessionBoundaryDetectedV1 | LessonCompletedV1 | CapabilityObservedV1

// ── Envelope (RS §2.1) ────────────────────────────────────────────────────────

export interface SpineSource { componentId: string; version: number }

/** A committed event as read back from the log (seq assigned). */
export interface SpineEventRecord {
  eventId: string
  seq: number
  learnerId: string
  sessionId: string | null
  turnId: string | null
  type: string          // string (not the union) so folds tolerate future types
  schemaVersion: number
  payload: unknown
  source: SpineSource
  confidence: number
}

/** A new event before commit (no seq, no eventId — the writer assigns). */
export interface NewSpineEvent {
  learnerId: string
  sessionId?: string | null
  turnId?: string | null
  type: SpineEventType
  payload: SpinePayload
  source: SpineSource
  confidence?: number
  /** Distinguishes multiple same-type events within one turn. */
  discriminator?: string
}

// ── Idempotency (RS §2.1: hash(type, turnId, discriminator)) ─────────────────

export function idempotencyKey(e: NewSpineEvent): string {
  const basis = [e.type, e.learnerId, e.sessionId ?? '', e.turnId ?? '', e.discriminator ?? ''].join('|')
  return createHash('sha256').update(basis).digest('hex')
}
