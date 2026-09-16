/**
 * Durable Learner State, the third design (V2 §4.4) — Batch 0, PURE ONLY.
 *
 * `DURABLE_LEARNER_STATE_AUDIT.md` §6 already designed this exact batch
 * sequence (Batches 0-6) for a direct-write "Design C" table, and never
 * executed it. V2's own §4.4 text — "the pattern is already proven by the
 * capability model: typed events -> spine -> projection -> hydrated per
 * session. Apply the same pattern to concepts" — is a DIFFERENT persistence
 * mechanism for the identical Batch-0/1 first step: neither writes to a
 * table nor to the spine yet, so this module serves either fork.
 *
 * Confirmed by direct read, not assumed: the audit's own Design C/D
 * comparison never mentions `capabilityModel.ts`, the evidence spine, or a
 * projection anywhere in its text (grepped) — the third design genuinely
 * was not evaluated. Separately confirmed: `src/lib/evidence-spine/types.ts`
 * already has a closed, EXTENSIBLE `SpineEventType` union (currently
 * `CapabilityObserved` and five siblings) and `capabilityModel.ts` is a
 * real, working instance of the exact spine->projection->hydrate pattern
 * V2 describes — so the fork is genuinely open, not merely theoretical.
 *
 * PER §6 BATCH 0'S OWN SPEC: "Define masteryScore/decayedScore as a pure
 * function of the live authority -- ConversationState's verified counters
 * + studentIntelligence's existing effectiveHalfLifeDays. Do NOT import
 * ADR 10's Bayesian update rule; it contradicts the counter model and has
 * no evidence behind its constants."
 *
 * `masteryVerified` below is NOT reimplemented — it calls
 * `masteryVerifiedStrict` directly, the SAME authority
 * `gateLessonCompletion`/the mastery payload/every other consumer in this
 * repo already uses. Reimplementing that check here would risk exactly
 * the "plain-vs-verified counter split" divergence
 * `masteryCounterDisplayDivergence.test.ts` already caught once (audit
 * §7.1) — a second, independently-derived copy of a safety-critical
 * boolean is how that class of bug is made, not avoided.
 *
 * `masteryScore` is a CONTINUOUS, ADVISORY 0-1 read of progress toward
 * that same gate, for the case `masteryVerified` is false — it can never
 * disagree with the boolean gate about WHETHER mastery is certified,
 * because it derives from the identical verified counters and caps below
 * 1.0 whenever the gate is not yet satisfied.
 *
 * Explicitly out of scope for this module (Batch 0's own boundary):
 * `decayedScore` (needs `studentIntelligence`'s cross-session read, only
 * meaningful on READ, which is Batch 5 — HIGH risk, not attempted),
 * `ActiveMisconception` (ADR 10 §14 sequences it after the Evidence
 * Engine, whose own tables have 0 writers — audit §6's own final line).
 *
 * Pure module: no DB, no I/O, no import from route.ts.
 */

import { masteryVerifiedStrict, MASTERY_CHECK_REQUIRED, MASTERY_PRACTICE_REQUIRED } from './masteryGate'
import type { ConversationState } from './conversationState'

export interface ConceptMasteryRecordShadow {
  conceptId: string
  /** The SAME boolean every other mastery consumer in this repo uses —
   *  never independently derived. */
  verified: boolean
  /** 0-1, advisory. 1.0 iff `verified`; otherwise fractional progress
   *  toward the SAME two verified-evidence thresholds `verified` itself
   *  requires, so it can never overstate what the gate has certified. */
  masteryScore: number
  computedAt: string
}

/**
 * `conceptId` is passed in rather than read from `state`, because the
 * CALLER already resolved which concept this turn's evidence belongs to
 * (the same resolved concept id every other per-turn log in route.ts
 * uses) — this module does not re-derive concept identity.
 */
export function computeConceptMasteryRecord(
  state: ConversationState | null,
  conceptId: string,
  now: Date,
): ConceptMasteryRecordShadow {
  const verified = masteryVerifiedStrict(state)
  const checkFrac = Math.min(1, (state?.verifiedCorrectAtCheck ?? 0) / MASTERY_CHECK_REQUIRED)
  const practiceFrac = Math.min(1, (state?.verifiedCorrectAtPractice ?? 0) / MASTERY_PRACTICE_REQUIRED)
  const masteryScore = verified ? 1 : Math.min(0.5 * checkFrac + 0.5 * practiceFrac, 0.999)
  return { conceptId, verified, masteryScore, computedAt: now.toISOString() }
}
