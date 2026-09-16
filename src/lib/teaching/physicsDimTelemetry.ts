/**
 * PHYSICS DIMENSIONAL VERIFIER — observability only, Batch 3.
 *
 * Design: `docs/architecture/DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md` §6
 * row 3 ("emit one `PHYSICS_DIM={…}` line per turn, the `TURN_EVENT`/
 * `CONTRACT_ASSERT`/`LEARNER_MOVE` convention. Consume nothing. Repair
 * nothing. No DB write.").
 *
 * Modelled directly on `learnerMoveTelemetry.ts`/`excursionTelemetry.ts`: a
 * pure event builder plus one structured log line, no new telemetry
 * framework, nothing written to the database — the 2026-08-31 egress
 * incident is the standing reason a new table is never the answer to
 * "measure this" (CLAUDE.md's own notes on that incident). Nothing in
 * either route reads the event this batch builds; Batch 4 is the first
 * consumer, and only as a read of Vercel runtime logs, matching
 * `excursionTelemetry.ts`'s own precedent.
 *
 * ── ONE PREFIX, BOTH ROUTES — CLOSING §2.1's NAMED ASYMMETRY ────────────────
 * `LEARNER_MOVE_EVENT_PREFIX`/`EXCURSION_EVENT_PREFIX`/`TURN_EVENT_PREFIX`
 * are all chat-route-only today — none of them is wired into
 * `lesson-init/route.ts`, which is exactly the standing asymmetry
 * `DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md` §5.6/§6 row 3 names and says
 * this batch must not repeat. `PHYSICS_DIM_EVENT_PREFIX` is therefore ONE
 * constant, used identically at both call sites (the `route` field inside
 * the event disambiguates origin), rather than two per-route prefixes —
 * one convention searchable in Vercel logs regardless of which route
 * produced it.
 *
 * ── PII ─────────────────────────────────────────────────────────────────────
 * No raw draft text, no learner text, no model text, no equation string —
 * `DimensionalViolation.equationText` is NEVER read by this module. Only
 * structured, closed-enum/boolean/count fields reach the log line:
 * `conceptId` (a KG identifier, not learner data), `hasBinding` (boolean),
 * `gate` (a closed enum — which gate stopped classification, or how far it
 * got), `violationFound` (boolean). The same discipline
 * `learnerMoveTelemetry.ts` documents for its own `detail` field: closed
 * vocabulary only, nothing free-text, nothing extracted from a message.
 */
import type { PhysicsDimDiagnosis, PhysicsDimGate } from './physics/dimensionalVerifier'

export const PHYSICS_DIM_EVENT_PREFIX = '[learn/chat] PHYSICS_DIM='

export interface PhysicsDimEvent {
  /** Schema version. Bump when a field's MEANING changes, never for additions. */
  v: 1
  sessionId: string
  /** sessionId + request ingress ms. Count DISTINCT of this, never rows. */
  turnKey: string
  route: 'chat' | 'lesson-init'
  subject: string | null
  conceptId: string | null
  hasBinding: boolean
  gate: PhysicsDimGate
  violationFound: boolean
  ts: string
}

/**
 * PURE. Builds the event from a diagnosis already computed by the caller;
 * mutates nothing, reads nothing off `diagnosis.violation` beyond the
 * boolean fact that one exists. Nothing downstream of the diagnosis's own
 * computation reads this — pinned by test.
 */
export function buildPhysicsDimEvent(input: {
  diagnosis: PhysicsDimDiagnosis
  sessionId: string
  route: 'chat' | 'lesson-init'
  subject: string | null
  conceptId: string | null
  hasBinding: boolean
  turnReceivedAt: number
}): PhysicsDimEvent {
  const { diagnosis, sessionId, route, subject, conceptId, hasBinding, turnReceivedAt } = input
  return {
    v: 1,
    sessionId,
    turnKey: `${sessionId}:${turnReceivedAt}`,
    route,
    subject,
    conceptId,
    hasBinding,
    gate: diagnosis.gate,
    violationFound: diagnosis.violation !== null,
    ts: new Date(turnReceivedAt).toISOString(),
  }
}

/**
 * One line per turn. Never throws — observability may not break a turn,
 * the same fail-open rule `learnerMoveTelemetry.ts`/`excursionTelemetry.ts`/
 * `brainMetrics.ts` follow.
 */
export function recordPhysicsDimEvent(event: PhysicsDimEvent): void {
  try {
    console.log(PHYSICS_DIM_EVENT_PREFIX + JSON.stringify(event))
  } catch { /* observability never breaks a turn */ }
}
