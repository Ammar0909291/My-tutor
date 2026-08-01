/**
 * WP-5 — the FIRST READER of DecisionRecorded v2.
 *
 * WP-3 added an optional v2 field group to DecisionRecorded (attemptVector,
 * adaptationState, adjustmentRecord, consumesReteachBudget) and populated
 * none of it: no producer exists. This module is the only place that reads
 * those fields, and its entire job is to read them HONESTLY.
 *
 * Three rules, and they are the point of the module:
 *   1. NEVER write. Nothing here mutates an event, a row, or a snapshot.
 *   2. NEVER infer. An absent field is `NOT_CAPTURED`, never a default, never
 *      a value reconstructed from the rendered turn. Phase 1 §11.2 settled
 *      this: the AttemptVector is CAPTURED, not derived, because inferring
 *      pedagogical intent from output "would be reconstructing intent from
 *      output, which is guessing."
 *   3. NEVER fail on a v1 row. A v1 DecisionRecorded is a v2 with the group
 *      absent, which reads as NOT_CAPTURED — not as an error and not as a
 *      skipped event.
 *
 * Read-only, pure, no I/O. Nothing in the runtime imports this yet: WP-5 is
 * shadow-mode evaluation, so behaviour stays byte-identical.
 */
import type {
  SpineEventRecord, DecisionRecordedV1, DecisionRecordedV2,
  AttemptVectorV2, AdaptationStateVectorV2, AdjustmentRecordV2,
} from '@/lib/evidence-spine/types'

/** Why a value is missing. `NOT_CAPTURED` is a finding, not a failure. */
export type Availability = 'CAPTURED' | 'NOT_CAPTURED'

export interface Read<T> {
  availability: Availability
  /** Present only when availability === 'CAPTURED'. */
  value?: T
}

const ABSENT: Read<never> = { availability: 'NOT_CAPTURED' }

function read<T>(v: T | undefined | null): Read<T> {
  return v === undefined || v === null ? (ABSENT as Read<T>) : { availability: 'CAPTURED', value: v }
}

/** The v1 half — always present on a well-formed DecisionRecorded. */
export interface DecisionCore {
  move: string | null
  phase: string | null
  recoveryPreempted: boolean
  workedExampleFirst: boolean
  stageCeiling: number | null
  provenance: readonly string[]
}

/** One decision, decoded, with every v2 field carrying its availability. */
export interface DecodedDecision {
  turnId: string | null
  seq: number
  schemaVersion: number
  core: DecisionCore
  attemptVector: Read<AttemptVectorV2>
  adaptationState: Read<AdaptationStateVectorV2>
  adjustmentRecord: Read<AdjustmentRecordV2>
  consumesReteachBudget: Read<boolean>
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null
}

/**
 * Decode ONE DecisionRecorded event. Returns null for any other event type or
 * a malformed payload — the caller counts those rather than guessing at them.
 *
 * Version handling: v1 and v2 both decode here. The v1 fields are read the
 * same way at either version, and the v2 group simply reads NOT_CAPTURED on a
 * v1 row. No version comparison is performed, so a future v3 that is additive
 * over v2 also decodes without a change here.
 */
export function decodeDecision(e: SpineEventRecord): DecodedDecision | null {
  if (e.type !== 'DecisionRecorded') return null
  if (!isRecord(e.payload)) return null
  const p = e.payload as unknown as DecisionRecordedV1 & Partial<DecisionRecordedV2>

  return {
    turnId: e.turnId,
    seq: e.seq,
    schemaVersion: e.schemaVersion,
    core: {
      move: p.move ?? null,
      phase: p.phase ?? null,
      recoveryPreempted: p.recoveryPreempted === true,
      workedExampleFirst: p.workedExampleFirst === true,
      stageCeiling: p.stageCeiling ?? null,
      provenance: Array.isArray(p.provenance) ? p.provenance : [],
    },
    attemptVector: read(p.attemptVector),
    adaptationState: read(p.adaptationState),
    adjustmentRecord: read(p.adjustmentRecord),
    consumesReteachBudget: read(p.consumesReteachBudget),
  }
}

/** Decode every DecisionRecorded in a trajectory, in seq order. */
export function decodeDecisions(events: readonly SpineEventRecord[]): DecodedDecision[] {
  const out: DecodedDecision[] = []
  for (const e of [...events].sort((a, b) => a.seq - b.seq)) {
    const d = decodeDecision(e)
    if (d !== null) out.push(d)
  }
  return out
}

/** How much of the v2 group a trajectory actually carries. This is the number
 *  WP-5 exists to produce: today it is 0/0/0/0 on every real trajectory, and
 *  that is the honest baseline every later stage is judged against. */
export interface V2Coverage {
  decisions: number
  v1Decisions: number
  v2Decisions: number
  attemptVectorCaptured: number
  adaptationStateCaptured: number
  adjustmentRecordCaptured: number
  consumesReteachBudgetCaptured: number
}

export function v2Coverage(decisions: readonly DecodedDecision[]): V2Coverage {
  const c: V2Coverage = {
    decisions: decisions.length,
    v1Decisions: 0, v2Decisions: 0,
    attemptVectorCaptured: 0, adaptationStateCaptured: 0,
    adjustmentRecordCaptured: 0, consumesReteachBudgetCaptured: 0,
  }
  for (const d of decisions) {
    if (d.schemaVersion >= 2) c.v2Decisions += 1
    else c.v1Decisions += 1
    if (d.attemptVector.availability === 'CAPTURED') c.attemptVectorCaptured += 1
    if (d.adaptationState.availability === 'CAPTURED') c.adaptationStateCaptured += 1
    if (d.adjustmentRecord.availability === 'CAPTURED') c.adjustmentRecordCaptured += 1
    if (d.consumesReteachBudget.availability === 'CAPTURED') c.consumesReteachBudgetCaptured += 1
  }
  return c
}
