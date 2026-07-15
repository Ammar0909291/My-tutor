/**
 * Stage 3 — COMMIT-1. Owner: Evidence Store. Append-only (RS §2.1 E-1).
 *
 * K3 v1 discipline: this stage classifies candidates as "committed" for the
 * purposes of the pipeline (making them visible to FOLD/INTERRUPT-SCAN). The
 * ACTUAL Evidence Spine append happens post-render via the existing
 * emitTurn() call (Stage 15, POST); this preserves single-writer semantics
 * for the spine while letting kernel stages read committed candidates
 * synchronously in one pipeline run.
 *
 * When the spine writer is extended (K3-follow-on) to write pre-render
 * events, this stage becomes the caller; the contract does not change.
 */
import type { KernelState, Stage } from '../types'

export const commit1Stage: Stage<KernelState, KernelState> = {
  name: 'COMMIT-1',
  async run(state) {
    const committed = state.candidates ?? []
    return { ...state, committed }
  },
}
