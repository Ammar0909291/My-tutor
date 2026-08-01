/**
 * WP-5 — Phase 3 Stage S2: "Publish, hold."
 *
 * Phase 3 §25.2 S2: "The loop runs at AF4: publishes archetype defaults and
 * adapts nothing. Behaviour is byte-for-byte today's." Its stated purpose:
 * "Proves the loop is inert-safe before it is allowed to move anything."
 *
 * AF4 (§21.2) is defined as the current state of the world: "NO STATE — No
 * persisted ASV (today's real condition). The loop publishes ARCHETYPE
 * DEFAULTS — the values Phase 1's archetype and TQ-2's phase clamp already
 * imply — and adapts nothing. Behaviour is exactly today's behaviour, plus a
 * record that adaptation is unavailable."
 *
 * Two ladder rules are binding here and are implemented literally:
 *   · NEVER FABRICATE A STATE READ — an absent signal produces no pressure,
 *     never an estimated one. So a decision with no captured adaptationState
 *     yields AF4, never a guessed vector.
 *   · DEGRADATION IS ALWAYS RECORDED — "an unrecorded fallback is
 *     indistinguishable from a healthy loop." Every publication carries its
 *     availability level, so an inert loop is visible as inert.
 *
 * "Publishes" means returns a value to its caller. Nothing here writes: no
 * store, no snapshot, no event. WP-4's `concept_mastery_records.adaptationState`
 * column is deliberately NOT read from the database and NOT written — this
 * module reads only the ASV as recorded on DecisionRecorded v2, which is
 * WP-5's stated job.
 *
 * Read-only and pure. Not wired into any runtime path, so behaviour is
 * byte-for-byte today's, exactly as S2 requires.
 */
import type { SpineEventRecord, AdaptationStateVectorV2 } from '@/lib/evidence-spine/types'
import { decodeDecisions, type DecodedDecision } from './decisionRecord'

/** §21.2's availability ladder. Only AF4 and AF3 are reachable today. */
export type AdaptationAvailability = 'AF0' | 'AF1' | 'AF2' | 'AF3' | 'AF4'

export interface PublishedSupport {
  turnId: string | null
  seq: number
  availability: AdaptationAvailability
  /** The published values. At AF4 these are archetype defaults, and the loop
   *  adapted nothing to produce them. */
  vector: AdaptationStateVectorV2
  /** Always populated — degradation is always recorded. */
  reason: string
  /** True whenever the loop moved a dial. Structurally false at S2. */
  adapted: boolean
}

export interface AdaptationPublishReport {
  decisions: number
  published: PublishedSupport[]
  /** Count by availability level. The S2 proof obligation: everything at AF4
   *  and `adaptedCount === 0` means the loop is inert-safe. */
  byAvailability: Record<AdaptationAvailability, number>
  adaptedCount: number
  /** S2's pass condition, computed rather than asserted. */
  inertSafe: boolean
}

/**
 * ARCHETYPE DEFAULTS.
 *
 * §21.2 defines these as "the values Phase 1's archetype and TQ-2's phase
 * clamp already imply". Neither is implemented, and no archetype is recorded
 * on any event — so there is nothing to look a default up by. Publishing an
 * invented per-archetype table would fabricate the state read the ladder
 * forbids.
 *
 * The honest default is therefore the EMPTY vector: every dial absent, which
 * downstream reads as "no support condition specified", which is exactly
 * today's behaviour. When Phase 1's archetypes land, this function gains an
 * archetype argument and a real table; its callers do not change.
 */
export function archetypeDefaults(): AdaptationStateVectorV2 {
  return {}
}

/** Publish support conditions for one trajectory. Adapts nothing, ever. */
export function publishAdaptationSupport(
  events: readonly SpineEventRecord[],
): AdaptationPublishReport {
  const decisions = decodeDecisions(events)
  const published = decisions.map(publishOne)

  const byAvailability: Record<AdaptationAvailability, number> = {
    AF0: 0, AF1: 0, AF2: 0, AF3: 0, AF4: 0,
  }
  for (const p of published) byAvailability[p.availability] += 1

  const adaptedCount = published.filter(p => p.adapted).length
  return {
    decisions: decisions.length,
    published,
    byAvailability,
    adaptedCount,
    inertSafe: adaptedCount === 0,
  }
}

function publishOne(d: DecodedDecision): PublishedSupport {
  if (d.adaptationState.availability === 'NOT_CAPTURED') {
    return {
      turnId: d.turnId,
      seq: d.seq,
      availability: 'AF4',
      vector: archetypeDefaults(),
      reason: 'AF4 NO STATE — no persisted ASV on this decision. Archetype defaults published; nothing adapted.',
      adapted: false,
    }
  }
  // A vector was captured. S2 still holds it unchanged and moves no dial —
  // moving one is S3 (D4/D5) at the earliest, which is WP-8 work.
  return {
    turnId: d.turnId,
    seq: d.seq,
    availability: 'AF3',
    vector: d.adaptationState.value ?? {},
    reason: 'AF3 BLIND — standing values published unchanged. S2 holds; no dial moves until S3.',
    adapted: false,
  }
}
