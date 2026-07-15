/**
 * Stage 14 — PERSIST. Owner: Memory subsystem (RS §11 single-writer matrix).
 *
 * K3 v1: route.ts owns the actual snapshot/progress writes today; this
 * stage records that those writes were performed for the current turn. As
 * writers migrate under kernel ownership, this stage becomes the caller.
 */
import type { KernelState, Stage, PersistReceipt } from '../types'

export interface PersistAdapters {
  snapshotUpdated: boolean
  progressUpdated: boolean
}

export function persistStage(a: PersistAdapters): Stage<KernelState, KernelState> {
  return {
    name: 'PERSIST',
    async run(state) {
      const receipt: PersistReceipt = {
        snapshotUpdated: a.snapshotUpdated,
        progressUpdated: a.progressUpdated,
      }
      return { ...state, persistReceipt: receipt }
    },
  }
}
