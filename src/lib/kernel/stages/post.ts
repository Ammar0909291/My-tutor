/**
 * Stage 15 — POST. Owner: async workers (RS §1: MUST NOT affect the
 * current turn). Records that async work was queued; the ACT of queuing
 * (spine emit, aggregations) happens in the caller today.
 */
import type { KernelState, Stage, PostReceipt } from '../types'

export interface PostAdapters {
  spineEmitted: boolean
  evidenceEventsQueued: number
}

export function postStage(a: PostAdapters): Stage<KernelState, KernelState> {
  return {
    name: 'POST',
    async run(state) {
      const receipt: PostReceipt = {
        spineEmitted: a.spineEmitted,
        evidenceEventsQueued: a.evidenceEventsQueued,
      }
      return { ...state, postReceipt: receipt }
    },
  }
}
