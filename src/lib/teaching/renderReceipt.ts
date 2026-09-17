/**
 * Typed Turn Contract, I2 (render receipt) — Batch 1, SHADOW ONLY.
 *
 * V2's own text (`PHYSICS_TEACHER_MIGRATION_ARCHITECTURE.md` §4.1, I2): "A
 * grading may only reference a question with a recorded render receipt" —
 * closing the class this repo already met once, "the seventh defect": the
 * server believed a probe was on screen and graded against it while the
 * client actually rendered nothing (fixed operationally by `mcqToServe`
 * unifying what the response serves and what the snapshot persists — see
 * that module's own header). I2 makes the assumption CHECKABLE instead of
 * merely likely: the client echoes back which question it actually
 * displayed, and this module compares that claim against what the server
 * believes is pending.
 *
 * SHADOW ONLY in this batch: `checkRenderReceipt`'s result is logged at the
 * call site in route.ts and NOTHING ELSE reads it — grading, the ladder,
 * mastery and evidence are byte-for-byte unchanged. This is deliberate,
 * matching the repo's own established discipline for every prior
 * deterministic authority (`conversationState`, `masteryGate`,
 * `gateAssessment`, `turnArbitration`, `turnProgress`, the dimensional
 * Physics Verifier): land inert, observe real traffic, only then widen to
 * enforcement. Do NOT wire this into `gradeMcqAnswer` or any grading path
 * without first reading production `RENDER_RECEIPT_EVENT` logs — an
 * enforcement bug here would silently discard genuine correct answers,
 * which is worse than the defect this closes.
 *
 * Pure module: no DB, no I/O, no imports from route.ts or any other
 * teaching module beyond the `TutorMCQ` type and its own hash function.
 */

import { deriveRenderId, type TutorMCQ } from './mcq'

export type RenderReceiptReason =
  | 'no-pending-probe'
  | 'client-not-upgraded'
  | 'receipt-missing'
  | 'receipt-matches'
  | 'receipt-mismatch'

export interface RenderReceiptCheck {
  consistent: boolean
  reason: RenderReceiptReason
}

/**
 * `pendingMcq` — the question the server believes is on screen (read back
 * from the persisted snapshot, i.e. `pendingMcqHoisted` in route.ts).
 *
 * `renderedMcqId` — what the CLIENT sent this turn as `renderedMcqId`:
 *   - `undefined`  — the field is absent. Treated as "client not upgraded
 *     yet" and reported consistent, never as evidence of anything — an
 *     older client, a non-browser caller (QA/certification scripts), or an
 *     ephemeral/instruction turn that never went through the real UI must
 *     not be misread as a rendering failure.
 *   - `null`       — the client explicitly reports nothing is displayed.
 *   - a string      — the render id the client actually showed.
 *
 * The comparison is by CONTENT (`deriveRenderId`), not object identity, so
 * it is correct whether `pendingMcq` is the object first served this
 * session or the same question read back from a persisted snapshot after a
 * page refresh — both derive the identical id from the identical content.
 */
export function checkRenderReceipt(
  pendingMcq: TutorMCQ | null,
  renderedMcqId: string | null | undefined,
): RenderReceiptCheck {
  if (pendingMcq === null) return { consistent: true, reason: 'no-pending-probe' }
  if (renderedMcqId === undefined) return { consistent: true, reason: 'client-not-upgraded' }
  if (renderedMcqId === null) return { consistent: false, reason: 'receipt-missing' }
  const expected = deriveRenderId(pendingMcq)
  return renderedMcqId === expected
    ? { consistent: true, reason: 'receipt-matches' }
    : { consistent: false, reason: 'receipt-mismatch' }
}
