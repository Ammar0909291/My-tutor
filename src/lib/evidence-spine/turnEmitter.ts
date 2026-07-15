/**
 * EOS M1 — Evidence Spine: turn emitter.
 *
 * Builds the spine events for ONE completed chat turn from facts the route
 * has ALREADY computed (no re-derivation, no new reads, no behavior change)
 * and appends them fire-and-forget. This is the single integration point
 * between the existing runtime and the spine: the route calls emitTurn()
 * once, un-awaited, after its own persistence is queued.
 *
 * PRIVACY: no verbatim learner or tutor text enters the spine (lengths and
 * classified keys only) — deliberate ISS-18 prudence.
 */
import type { NewSpineEvent, SpineSource } from './types'
import { appendSpineEvents, prismaSpineStore, type SpineStore } from './writer'

const SOURCE: SpineSource = { componentId: 'learn-chat-route', version: 1 }

export interface TurnFacts {
  learnerId: string
  sessionId: string
  /** assistant Message.id — the turn anchor + idempotency discriminator base */
  turnId: string
  messageLength: number
  latencyFromPrevTurnMs: number | null
  assistantLength: number
  assistantAskedQuestion: boolean
  provider: string | null
  /** parsed SIGNAL, when present */
  signal: { correctness?: boolean; confidence?: string; confusion?: boolean } | null
  resolvedConceptId: string | null
  recoveryKey: string | null
  recoveryEscalationRung: 0 | 1 | 2
  sessionFailureCount: number
  autonomyRequested: boolean
  /** Phase C–G decision facts (null on school-mode/pre-directive turns) */
  decisionMove: string | null
  decisionPhaseBefore: string | null
  decisionPhaseAfter: string | null
  workedExampleFirst: boolean
  stageCeiling: number | null
  provenance: string[]
  freshSessionBoundary: boolean
  boundaryGapMs: number | null
  lessonCompleted: boolean
}

export function buildTurnEvents(f: TurnFacts): NewSpineEvent[] {
  const base = { learnerId: f.learnerId, sessionId: f.sessionId, turnId: f.turnId, source: SOURCE }
  const events: NewSpineEvent[] = []

  if (f.freshSessionBoundary) {
    events.push({ ...base, type: 'SessionBoundaryDetected', payload: { gapMs: f.boundaryGapMs, boundaryType: f.boundaryGapMs === null ? 'unknown' : 'inactivity' } })
  }
  events.push({ ...base, type: 'StudentMessageReceived', payload: { length: f.messageLength, latencyFromPrevTurnMs: f.latencyFromPrevTurnMs } })
  if (f.recoveryKey) {
    events.push({ ...base, type: 'UtteranceStateDetected', payload: { failureStateKey: f.recoveryKey, strength: 'unknown' } })
    events.push({ ...base, type: 'RecoveryEntered', payload: { failureStateKey: f.recoveryKey, escalationRung: f.recoveryEscalationRung, sessionFailureCount: f.sessionFailureCount } })
  }
  if (f.autonomyRequested) {
    events.push({ ...base, type: 'AutonomyRequested', payload: { honored: true } })
  }
  if (f.signal && (f.signal.correctness !== undefined || f.signal.confusion !== undefined)) {
    events.push({
      ...base, type: 'AnswerObserved', payload: {
        correct: f.signal.correctness ?? null,
        statedConfidence: (f.signal.confidence === 'low' || f.signal.confidence === 'medium' || f.signal.confidence === 'high') ? f.signal.confidence : null,
        confusion: f.signal.confusion === true,
        conceptId: f.resolvedConceptId,
        capabilityRefs: [],           // capability wiring is a later milestone
        diagnostic: false,
      },
    })
  }
  events.push({
    ...base, type: 'DecisionRecorded', payload: {
      move: f.decisionMove,
      phase: f.decisionPhaseBefore,
      recoveryPreempted: f.recoveryKey !== null,
      workedExampleFirst: f.workedExampleFirst,
      stageCeiling: f.stageCeiling,
      provenance: f.provenance,
    },
  })
  events.push({ ...base, type: 'AssistantRendered', payload: { length: f.assistantLength, askedQuestion: f.assistantAskedQuestion, provider: f.provider } })
  if (f.decisionPhaseBefore !== null && f.decisionPhaseAfter !== null && f.decisionPhaseBefore !== f.decisionPhaseAfter) {
    events.push({
      ...base, type: 'PhaseTransitioned', payload: {
        machine: 'conversation', from: f.decisionPhaseBefore, to: f.decisionPhaseAfter,
        direction: phaseDirection(f.decisionPhaseBefore, f.decisionPhaseAfter),
      },
    })
  }
  if (f.lessonCompleted) {
    events.push({ ...base, type: 'LessonCompleted', payload: { conceptId: f.resolvedConceptId, certification: 'signal' } })
  }
  return events
}

const PHASE_ORDER = ['OBSERVE', 'DEMONSTRATE', 'GUIDE', 'CHECK', 'PRACTICE', 'TRANSFER']
function phaseDirection(from: string, to: string): 'up' | 'down' | 'reset' {
  const a = PHASE_ORDER.indexOf(from); const b = PHASE_ORDER.indexOf(to)
  if (a < 0 || b < 0) return 'reset'
  return b > a ? 'up' : b < a ? 'down' : 'reset'
}

/** Fire-and-forget entry point for the route. Never throws, never awaited. */
export function emitTurn(prismaLike: unknown, facts: TurnFacts): void {
  if (process.env.ENABLE_EVIDENCE_SPINE === '0') return
  const store: SpineStore = prismaSpineStore(prismaLike as Parameters<typeof prismaSpineStore>[0])
  void appendSpineEvents(store, buildTurnEvents(facts)).catch(() => {})
}
