/**
 * WP-9 / handoff H-2 — approach history as TQ-4's typed `failedAttempts` set.
 *
 * H-2: "`C-30`'s documented approach-history responsibility is retired in
 * favour of TQ-4's typed `failedAttempts` set (§4.1). Engine responsibility —
 * runtime owner's decision."
 *
 * NO DUPLICATE HISTORY, NO DUPLICATE PERSISTENCE. The set is DERIVED, per
 * learner per concept, from AttemptVectors already captured on
 * `DecisionRecorded` — the WP-3 payload written by the single existing
 * `emitTurn()` call. Nothing here stores a second copy, and there is no
 * writer in this file. That is the whole point of retiring `C-30`'s
 * responsibility rather than reimplementing it: one history, derived from the
 * capture path that already exists.
 *
 * READ-ONLY BY CONSTRUCTION. §12 R8's compaction is applied on read, so no
 * persistence prerequisite is required — which satisfies H-2's "read-only if
 * persistence prerequisites are unavailable" without a conditional path.
 */
import type { AttemptVectorV2 } from '@/lib/evidence-spine/types'
import { changedAxes } from './differenceOperator'

export interface AttemptOutcome {
  conceptId: string | null
  vector: AttemptVectorV2 | null
  /** Whether the attempt failed. Null when no outcome was observed — an
   *  unobserved attempt is not a successful one. */
  failed: boolean | null
  seq: number
}

export interface FailedAttemptSet {
  conceptId: string
  /** Distinct failed vectors, compacted (§12 R8): a vector equal on every
   *  declared axis to one already present is the same approach, not a new one. */
  vectors: AttemptVectorV2[]
  /** Attempts that failed but declared no vector — countable, not usable.
   *  Reported so the set's coverage is visible rather than implied. */
  failedWithoutVector: number
  /** Attempts whose outcome was never observed. Excluded from the set: an
   *  unobserved attempt must not be recorded as a failure. */
  outcomeUnknown: number
}

/**
 * Build the failed-attempt set for one concept from captured attempts.
 *
 * Compaction is by declared-axis equality, using the same comparison the
 * Difference Operator uses, so "already tried" here means exactly what
 * "unchanged" means in L4. Two definitions of sameness would let an attempt
 * be novel to one and a repeat to the other.
 */
export function buildFailedAttemptSet(
  conceptId: string,
  attempts: readonly AttemptOutcome[],
): FailedAttemptSet {
  const forConcept = [...attempts]
    .filter((a) => a.conceptId === conceptId)
    .sort((a, b) => a.seq - b.seq)

  const vectors: AttemptVectorV2[] = []
  let failedWithoutVector = 0
  let outcomeUnknown = 0

  for (const a of forConcept) {
    if (a.failed === null) { outcomeUnknown += 1; continue }
    if (a.failed !== true) continue
    if (a.vector === null) { failedWithoutVector += 1; continue }
    const already = vectors.some((v) => changedAxes(v, a.vector!).changed.length === 0)
    if (!already) vectors.push(a.vector)
  }

  return { conceptId, vectors, failedWithoutVector, outcomeUnknown }
}

/** Was this approach already tried and failed? The L4 question, asked directly.
 *  Null when the candidate declared nothing — unanswerable, not "no". */
export function approachAlreadyFailed(
  set: FailedAttemptSet,
  candidate: AttemptVectorV2 | null,
): boolean | null {
  if (candidate === null || Object.keys(candidate).length === 0) return null
  return set.vectors.some((v) => changedAxes(v, candidate).changed.length === 0)
}
