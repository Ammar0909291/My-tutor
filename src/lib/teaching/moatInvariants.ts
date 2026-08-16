/**
 * PRODUCTION INVARIANTS FOR THE TWO 2026-08-16 FIXES.
 *
 * Pure predicates over rows already fetched by the caller, so the same rules
 * can be unit-tested without a database and run read-only against production by
 * `scripts/moat/audit-production-seeding.ts`. Nothing here writes.
 *
 * ── What is checkable, and what is NOT ──────────────────────────────────────
 *
 * The idempotency fix (`topicProgressEvidence.ts`) stamps the learner's own
 * Message id on the TopicProgress row in the same statement as the increment,
 * so a retried or concurrent apply of the SAME event matches zero rows.
 *
 * `lastEvidenceMessageId` holds only the LATEST marker — it is a scalar, not a
 * set. The stored state therefore CANNOT answer "does `attempts` equal the
 * number of distinct events that incremented it": the earlier markers were
 * overwritten and no history of them is kept. A row with `attempts: 7` and one
 * marker is normal and correct, and `attemptsExceedsMarkers` is deliberately
 * absent from this file rather than approximated. `documentsUncheckableClaim`
 * in the test file pins that limitation so nobody re-derives it later.
 *
 * What IS falsifiable from stored state, and what these checks assert:
 *
 *  1. IDENTITY — a non-null marker must resolve to a real USER message
 *     belonging to the same learner. The whole point of the fix is that the
 *     idempotency key is the learner's own utterance rather than a synthesised
 *     value; a dangling id, an assistant message, or another learner's message
 *     each mean something other than that path wrote the row.
 *  2. COMPLETENESS — once the marker column exists, the guarded write always
 *     stamps one. A row updated after the migration with a NULL marker means
 *     the guarded path was bypassed by some other writer.
 *  3. VISUALS — at most one ACTIVE visual per concept (ADR 14's
 *     one-ACTIVE-per-canonicalSlug rule, at the surface a learner can observe).
 *
 * Rows written before the migration legitimately carry no marker and are NEVER
 * flagged: the cutoff comes from the migration's own recorded completion time,
 * not from a constant invented here.
 */

// ── 1. visual integrity ──────────────────────────────────────────────────────

export interface ActiveVisualRow {
  conceptId: string
  assetId: string
}

export interface DuplicateActiveVisual {
  conceptId: string
  assetIds: string[]
}

/**
 * Concepts serving more than one ACTIVE visual. The APPROVED tier resolves by
 * concept, so a second ACTIVE row makes which figure a learner sees depend on
 * row order — the defect this rule exists to prevent.
 */
export function duplicateActiveVisuals(rows: ActiveVisualRow[]): DuplicateActiveVisual[] {
  const byConcept = new Map<string, string[]>()
  for (const r of rows) {
    byConcept.set(r.conceptId, [...(byConcept.get(r.conceptId) ?? []), r.assetId])
  }
  return [...byConcept]
    .filter(([, ids]) => ids.length > 1)
    .map(([conceptId, assetIds]) => ({ conceptId, assetIds }))
    .sort((a, b) => a.conceptId.localeCompare(b.conceptId))
}

// ── 2. topic-progress evidence marker integrity ──────────────────────────────

export interface TopicProgressRow {
  id: string
  userId: string
  topicSlug: string
  attempts: number
  lastEvidenceMessageId: string | null
  updatedAt: Date
}

/** The subset of a Message row needed to validate a marker. */
export interface MarkerMessage {
  id: string
  userId: string
  role: string
}

export type MarkerViolationReason =
  /** The marker points at no message at all. */
  | 'marker-dangling'
  /** The marker points at an ASSISTANT (or other non-learner) message. */
  | 'marker-not-user-message'
  /** The marker belongs to a different learner than the row. */
  | 'marker-wrong-user'
  /** Written after the marker column existed, yet carries none. */
  | 'updated-after-migration-without-marker'

export interface MarkerViolation {
  rowId: string
  userId: string
  topicSlug: string
  reason: MarkerViolationReason
  detail: string
}

/**
 * @param markerColumnLiveSince when the idempotency migration finished, read
 *   from `_prisma_migrations`. Pass null when it cannot be determined — the
 *   completeness check is then SKIPPED rather than guessed, because without the
 *   cutoff every historical row would look like a violation.
 */
export function evidenceMarkerViolations(
  rows: TopicProgressRow[],
  messages: Map<string, MarkerMessage>,
  markerColumnLiveSince: Date | null,
): MarkerViolation[] {
  const out: MarkerViolation[] = []

  for (const row of rows) {
    const base = { rowId: row.id, userId: row.userId, topicSlug: row.topicSlug }

    if (row.lastEvidenceMessageId === null) {
      // Historical rows predate the column and are legitimately unmarked.
      if (markerColumnLiveSince && row.updatedAt > markerColumnLiveSince) {
        out.push({
          ...base,
          reason: 'updated-after-migration-without-marker',
          detail: `updatedAt ${row.updatedAt.toISOString()} is after the migration `
            + `(${markerColumnLiveSince.toISOString()}) but no marker was stamped`,
        })
      }
      continue
    }

    const msg = messages.get(row.lastEvidenceMessageId)
    if (!msg) {
      out.push({ ...base, reason: 'marker-dangling', detail: `no message ${row.lastEvidenceMessageId}` })
      continue
    }
    if (msg.role !== 'USER') {
      out.push({ ...base, reason: 'marker-not-user-message', detail: `role ${msg.role}` })
      continue
    }
    if (msg.userId !== row.userId) {
      out.push({ ...base, reason: 'marker-wrong-user', detail: `message belongs to ${msg.userId}` })
    }
  }

  return out
}
