/**
 * Stage 1 — INGEST. Owner: Gateway. Pure identity + timing (RS §1).
 * Input: caller-supplied TurnContext. Output: same state (INGEST is
 * upstream of everything; the context is already immutable).
 */
import type { KernelState, Stage } from '../types'

export const ingestStage: Stage<KernelState, KernelState> = {
  name: 'INGEST',
  async run(state) {
    // The TurnContext is populated by the caller (route.ts adapter). INGEST
    // exists to make the pipeline symmetric — downstream stages depend on
    // context being present, and this is the checkpoint that guarantees it.
    if (!state.context.turnId || !state.context.learnerId || !state.context.sessionId) {
      throw new Error('INGEST: incomplete TurnContext')
    }
    return state
  },
}
