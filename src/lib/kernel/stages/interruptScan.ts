/**
 * Stage 5 — INTERRUPT SCAN. Owner: Recovery Engine (RS Band 0).
 *
 * Reads this turn's committed events for utterance-state / autonomy
 * detectors. Recovery preempts policy; autonomy is a separate signal
 * consumed at PLAN time. This stage does not decide the recovery script
 * (that's RESOLVE) — it decides only WHETHER preemption is in force.
 */
import type { KernelState, Stage, InterruptState } from '../types'

export const interruptScanStage: Stage<KernelState, KernelState> = {
  name: 'INTERRUPT-SCAN',
  async run(state) {
    const committed = state.committed ?? []
    const utter = committed.find((e) => e.kind === 'UtteranceStateDetected')
    const autonomy = committed.find((e) => e.kind === 'AutonomyRequested')
    const interrupt: InterruptState = {
      active: utter !== undefined,
      failureStateKey: utter ? String((utter.data as { failureStateKey?: unknown }).failureStateKey ?? '') || null : null,
      autonomyRequested: autonomy !== undefined,
      preemptsPolicy: utter !== undefined,
    }
    return { ...state, interrupt }
  },
}
