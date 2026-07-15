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
  DecisionRecorded: 1,
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
export interface PhaseTransitionedV1 { machine: 'conversation'; from: string; to: string; direction: 'up' | 'down' | 'reset' }
export interface SessionBoundaryDetectedV1 { gapMs: number | null; boundaryType: 'inactivity' | 'explicit' | 'unknown' }
export interface LessonCompletedV1 { conceptId: string | null; certification: 'provisional' | 'signal' }
export interface CapabilityObservedV1 { capabilityId: string; direction: 'success' | 'failure' | 'stated_no'; diagnostic: boolean }

export type SpinePayload =
  | StudentMessageReceivedV1 | AssistantRenderedV1 | AnswerObservedV1
  | UtteranceStateDetectedV1 | AutonomyRequestedV1 | RecoveryEnteredV1
  | RecoveryExitedV1 | DecisionRecordedV1 | PhaseTransitionedV1
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
