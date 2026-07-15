/**
 * Stage 6 — SCHEDULE. Owner: Scheduler (RS §10).
 *
 * K3 v1: derives the active concept from the current runtime's plumbing
 * (StudentView.currentConceptId, resolved once by route.ts adapters). The
 * scheduler's process-suspend/resume, review injection, and curiosity
 * prefetch land as separate migrations against this contract.
 */
import type { KernelState, Stage, TurnAgenda } from '../types'

export interface ScheduleAdapters {
  freshBoundary: boolean
  boundaryGapMs: number | null
  retroWinOwed: boolean
  dueReviewCount: number
}

export function scheduleStage(a: ScheduleAdapters): Stage<KernelState, KernelState> {
  return {
    name: 'SCHEDULE',
    async run(state) {
      const agenda: TurnAgenda = {
        activeConceptId: state.view?.currentConceptId ?? null,
        episodeType: a.freshBoundary ? 'RESUMPTION' : 'CONTINUING',
        freshBoundary: a.freshBoundary,
        boundaryGapMs: a.boundaryGapMs,
        obligations: { retroWinOwed: a.retroWinOwed, dueReviewCount: a.dueReviewCount },
      }
      return { ...state, agenda }
    },
  }
}
