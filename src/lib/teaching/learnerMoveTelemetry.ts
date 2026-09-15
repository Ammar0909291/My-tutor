/**
 * LEARNER-MOVE PREVALENCE — observability only.
 *
 * Design: `docs/architecture/LEARNER_MOVE_INTERPRETER_DESIGN.md` §8 Batch 1
 * ("Shadow — compute stage A + stage B in route.ts beside the existing
 * reads; emit one `LEARNER_MOVE={…}` line per turn, the `TURN_EVENT` /
 * `CONTRACT_ASSERT` / `EXCURSION_EVENT` convention. Read nothing. No DB
 * write — the 2026-08-31 egress incident is the standing reason").
 *
 * Modelled directly on `excursionTelemetry.ts`: a pure event builder plus one
 * structured log line, no new telemetry framework, nothing written to the
 * database. This module changes no teaching decision — nothing in route.ts
 * reads the event this batch builds; it exists to observe, before Batches
 * 4-6 make the reading a real consumer, whether the reading's own kinds agree
 * with what the pre-existing layers already decide (design doc §8 Batch 2).
 *
 * ── THE DENOMINATOR IS ON EVERY LINE, ON PURPOSE ────────────────────────────
 * One event per turn that reaches `readLearnerMove`, `UNINTERPRETABLE` turns
 * included — matching `excursionTelemetry.ts`'s own "the denominator is on
 * every line" discipline (CLAUDE.md's egress-incident notes are the standing
 * reason a NEW table is never the answer to "measure this").
 *
 * ── PII ─────────────────────────────────────────────────────────────────────
 * No learner message text, no userId, no email, no transcript, and — unlike
 * `excursionTelemetry.ts`, which has no analogue of this — no per-SIGNAL
 * `detail` field either: `LearnerMoveSignal.detail` can carry the learner's
 * own extracted words (`QUESTION_ABOUT_TOPIC`'s requested-topic title comes
 * straight from `namedTopicUnknownTo`, which reads the raw message). Rather
 * than allowlisting the details that happen to be closed-vocabulary enum
 * values today (`FailureStateKey`, `LearnerRequest`) and hoping nothing added
 * in a later batch changes that, `detail` is dropped from every signal,
 * unconditionally — only `kind` reaches this event. Pinned by test.
 */
import type { LearnerMoveReading, LearnerMoveKind } from './learnerMove'
import type { TurnIntentConflict } from './turnIntent'

export const LEARNER_MOVE_EVENT_PREFIX = '[learn/chat] LEARNER_MOVE='

export interface LearnerMoveEvent {
  /** Schema version. Bump when a field's MEANING changes, never for additions. */
  v: 1
  sessionId: string
  /** sessionId + request ingress ms. Count DISTINCT of this, never rows. */
  turnKey: string
  subject: string
  lessonConceptId: string | null
  /** Which stage produced this reading — message-only or state-refined. */
  stage: LearnerMoveReading['stage']
  /** Every kind that fired, INCLUDING 'UNINTERPRETABLE'. No `detail` — see PII note above. */
  kinds: LearnerMoveKind[]
  uninterpretable: boolean
  ambiguous: boolean
  conflictCodes: Array<TurnIntentConflict['code']>
  ts: string
}

/**
 * PURE. Reads the reading and identity fields already computed by route.ts;
 * mutates nothing and returns a plain object. Nothing downstream of the
 * reading's own computation reads this — pinned by test.
 */
export function buildLearnerMoveEvent(input: {
  reading: LearnerMoveReading
  sessionId: string
  subject: string
  lessonConceptId: string | null
  turnReceivedAt: number
}): LearnerMoveEvent {
  const { reading, sessionId, subject, lessonConceptId, turnReceivedAt } = input
  return {
    v: 1,
    sessionId,
    turnKey: `${sessionId}:${turnReceivedAt}`,
    subject,
    lessonConceptId,
    stage: reading.stage,
    kinds: reading.signals.map((s) => s.kind),
    uninterpretable: reading.uninterpretable,
    ambiguous: reading.ambiguous,
    conflictCodes: reading.conflicts.map((c) => c.code),
    ts: new Date(turnReceivedAt).toISOString(),
  }
}

/**
 * One line per turn. Never throws — observability may not break a turn, the
 * same fail-open rule `excursionTelemetry.ts`/`brainMetrics.ts` follow.
 */
export function recordLearnerMoveEvent(event: LearnerMoveEvent): void {
  try {
    console.log(LEARNER_MOVE_EVENT_PREFIX + JSON.stringify(event))
  } catch { /* observability never breaks a turn */ }
}
