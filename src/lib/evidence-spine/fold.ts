/**
 * EOS M1 — Evidence Spine: pure folds and the StudentView projection.
 *
 * Implements RS §4.0's estimator contract in skeleton form: every projection
 * is a pure fold `state' = fold(state, event)` over the per-learner event
 * log ordered by seq. Snapshots are caches (RS L4): `foldAll(events)` and
 * `foldAll(prefix) then foldEvents(rest)` MUST agree — property-tested.
 *
 * These are SKELETONS (M1 scope): they hold the RS-shaped state and the
 * evidence plumbing; the full transition rules land with their consuming
 * milestones. Nothing in the runtime reads these projections yet.
 */
import {
  type SpineEventRecord, type SpineEventType, CURRENT_SCHEMA_VERSION,
  type AnswerObservedV1, type UtteranceStateDetectedV1, type RecoveryEnteredV1,
  type RecoveryExitedV1, type DecisionRecordedV1, type PhaseTransitionedV1,
  type AssistantRenderedV1, type CapabilityObservedV1,
} from './types'

// ── Projection states (RS §3 contracts, skeleton fields) ─────────────────────

export type CapabilityStatus = 'UNKNOWN' | 'STATED_NO' | 'OBSERVED_NO' | 'SHAKY' | 'RELIABLE'

export interface CapabilityProjection {
  /** capabilityId → skeleton lattice state (RS §4.11 subset: promotion to
   * RELIABLE needs 2 successes incl. ≥1 diagnostic; AUTOMATIC+ needs the
   * fluency instrumentation that arrives with later milestones). */
  capabilities: Record<string, { status: CapabilityStatus; succ: number; fail: number; diagnosticSucc: number }>
}

export interface TeachingStateProjection {
  /** Last known conversation-machine phase (Phase C ladder; ISS-01 mapping
   * to the RS 10-state ladder applies at M3). */
  phase: string | null
  transitionsUp: number
  transitionsDown: number
  lastConceptId: string | null
}

export interface ConversationProjection {
  questionsAskedSinceGive: number
  givesSinceQuestion: number
  consecutiveFailures: number
  lastMove: string | null
  turns: number
}

export interface RecoveryProjection {
  active: boolean
  lastFailureStateKey: string | null
  entries: number
  exits: number
  sessionFailureCount: number
  /** failureStateKey → entry count (what-restores groundwork). */
  byState: Record<string, number>
}

export interface StudentViewProjection {
  learnerId: string
  /** seq of the last folded event — the snapshot watermark. */
  foldedThroughSeq: number
  eventsFolded: number
  eventsSkipped: number   // unknown type or unknown schemaVersion (never guessed)
  capability: CapabilityProjection
  teaching: TeachingStateProjection
  conversation: ConversationProjection
  recovery: RecoveryProjection
  answers: { total: number; correct: number; incorrect: number; unsignaled: number }
  decisions: number
}

export function initialStudentView(learnerId: string): StudentViewProjection {
  return {
    learnerId,
    foldedThroughSeq: 0,
    eventsFolded: 0,
    eventsSkipped: 0,
    capability: { capabilities: {} },
    teaching: { phase: null, transitionsUp: 0, transitionsDown: 0, lastConceptId: null },
    conversation: { questionsAskedSinceGive: 0, givesSinceQuestion: 0, consecutiveFailures: 0, lastMove: null, turns: 0 },
    recovery: { active: false, lastFailureStateKey: null, entries: 0, exits: 0, sessionFailureCount: 0, byState: {} },
    answers: { total: 0, correct: 0, incorrect: 0, unsignaled: 0 },
    decisions: 0,
  }
}

// ── Capability skeleton transitions (RS §4.11 subset) ────────────────────────

function foldCapability(
  cap: CapabilityProjection['capabilities'][string] | undefined,
  direction: 'success' | 'failure' | 'stated_no',
  diagnostic: boolean,
): CapabilityProjection['capabilities'][string] {
  const c = cap ?? { status: 'UNKNOWN' as CapabilityStatus, succ: 0, fail: 0, diagnosticSucc: 0 }
  const next = { ...c }
  if (direction === 'stated_no') {
    // Stated inability is trusted instantly (ground truth) but is the
    // cheapest state to overturn — one demonstrated success (below).
    if (next.status === 'UNKNOWN' || next.status === 'SHAKY') next.status = 'STATED_NO'
    return next
  }
  if (direction === 'success') {
    next.succ += 1
    if (diagnostic) next.diagnosticSucc += 1
    if (next.status === 'UNKNOWN') next.status = 'SHAKY'
    else if (next.status === 'STATED_NO') next.status = 'SHAKY'          // cheap overturn
    else if (next.status === 'OBSERVED_NO' && next.succ >= 2) next.status = 'SHAKY'
    else if (next.status === 'SHAKY' && next.succ >= 2 && next.diagnosticSucc >= 1) next.status = 'RELIABLE'
    return next
  }
  // failure — only diagnostic failures move state strongly (RS attribution
  // rule: compound-item failures update no capability; the WRITER enforces
  // that by not emitting CapabilityObserved for them, so any failure event
  // that reaches the fold is attribution-clean).
  next.fail += 1
  if (next.status === 'UNKNOWN') next.status = 'OBSERVED_NO'
  else if (next.status === 'RELIABLE' && next.fail >= 2) next.status = 'SHAKY' // contradiction, one level down
  else if (next.status === 'SHAKY' && next.fail >= 2) next.status = 'OBSERVED_NO'
  return next
}

// ── The fold ──────────────────────────────────────────────────────────────────

function decodable(type: string, schemaVersion: number): type is SpineEventType {
  return (SPINE_TYPES_SET as Set<string>).has(type) &&
    schemaVersion >= 1 &&
    schemaVersion <= CURRENT_SCHEMA_VERSION[type as SpineEventType]
}
const SPINE_TYPES_SET = new Set(Object.keys(CURRENT_SCHEMA_VERSION))

/** Fold ONE committed event. Pure. Unknown types/versions are counted and
 * skipped — never guessed (RS E-5 / EBC honesty discipline). */
export function foldEvent(view: StudentViewProjection, e: SpineEventRecord): StudentViewProjection {
  const v: StudentViewProjection = {
    ...view,
    foldedThroughSeq: Math.max(view.foldedThroughSeq, e.seq),
    capability: { capabilities: { ...view.capability.capabilities } },
    teaching: { ...view.teaching },
    conversation: { ...view.conversation },
    recovery: { ...view.recovery, byState: { ...view.recovery.byState } },
    answers: { ...view.answers },
  }

  if (!decodable(e.type, e.schemaVersion)) {
    v.eventsSkipped += 1
    return v
  }
  v.eventsFolded += 1

  switch (e.type as SpineEventType) {
    case 'StudentMessageReceived': {
      v.conversation.turns += 1
      return v
    }
    case 'AssistantRendered': {
      const p = e.payload as AssistantRenderedV1
      if (p.askedQuestion) {
        v.conversation.questionsAskedSinceGive += 1
        v.conversation.givesSinceQuestion = 0
      } else {
        v.conversation.givesSinceQuestion += 1
        v.conversation.questionsAskedSinceGive = 0
      }
      return v
    }
    case 'AnswerObserved': {
      const p = e.payload as AnswerObservedV1
      v.answers.total += 1
      if (p.correct === true) { v.answers.correct += 1; v.conversation.consecutiveFailures = 0 }
      else if (p.correct === false) { v.answers.incorrect += 1; v.conversation.consecutiveFailures += 1 }
      else v.answers.unsignaled += 1
      return v
    }
    case 'UtteranceStateDetected': {
      const p = e.payload as UtteranceStateDetectedV1
      v.recovery.lastFailureStateKey = p.failureStateKey
      v.conversation.consecutiveFailures += 1
      return v
    }
    case 'AutonomyRequested':
      return v
    case 'RecoveryEntered': {
      const p = e.payload as RecoveryEnteredV1
      v.recovery.active = true
      v.recovery.entries += 1
      v.recovery.lastFailureStateKey = p.failureStateKey
      v.recovery.sessionFailureCount = p.sessionFailureCount
      v.recovery.byState[p.failureStateKey] = (v.recovery.byState[p.failureStateKey] ?? 0) + 1
      return v
    }
    case 'RecoveryExited': {
      void (e.payload as RecoveryExitedV1)
      v.recovery.active = false
      v.recovery.exits += 1
      return v
    }
    case 'DecisionRecorded': {
      const p = e.payload as DecisionRecordedV1
      v.decisions += 1
      v.conversation.lastMove = p.move
      if (p.phase !== null) v.teaching.phase = p.phase
      return v
    }
    case 'PhaseTransitioned': {
      const p = e.payload as PhaseTransitionedV1
      v.teaching.phase = p.to
      if (p.direction === 'up') v.teaching.transitionsUp += 1
      else if (p.direction === 'down') v.teaching.transitionsDown += 1
      return v
    }
    case 'SessionBoundaryDetected': {
      // Session-scoped skeleton counters reset at the boundary.
      v.recovery.sessionFailureCount = 0
      v.recovery.active = false
      v.conversation.questionsAskedSinceGive = 0
      v.conversation.givesSinceQuestion = 0
      v.conversation.consecutiveFailures = 0
      return v
    }
    case 'LessonCompleted': {
      const p = e.payload as { conceptId: string | null }
      v.teaching.lastConceptId = p.conceptId
      return v
    }
    case 'CapabilityObserved': {
      const p = e.payload as CapabilityObservedV1
      v.capability.capabilities[p.capabilityId] =
        foldCapability(v.capability.capabilities[p.capabilityId], p.direction, p.diagnostic)
      return v
    }
  }
}

/** Fold a batch (MUST be seq-ascending for one learner). Pure. */
export function foldEvents(view: StudentViewProjection, events: SpineEventRecord[]): StudentViewProjection {
  let v = view
  for (const e of events) v = foldEvent(v, e)
  return v
}

/** Full rebuild from scratch — the replay entry point. */
export function foldAll(learnerId: string, events: SpineEventRecord[]): StudentViewProjection {
  const sorted = [...events].sort((a, b) => a.seq - b.seq)
  return foldEvents(initialStudentView(learnerId), sorted)
}
