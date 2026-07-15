/**
 * Stage 7 — TSM STEP. Owner: Teaching State Machine (RS §5).
 *
 * K3 v1: reads the phase from ConversationState (Phase C-G ladder) supplied
 * by the caller; ISS-01 (mapping to the RS 10-state ladder) lands with K4
 * per masterplan. The transition itself still runs inside route.ts /
 * conversationState.ts; this stage records what it observed so downstream
 * stages have a typed view.
 */
import type { KernelState, Stage, TeachingStateView } from '../types'

export interface TsmAdapters {
  phase: string
  stageCeiling: number
  demonstrated: boolean
  consecutiveFailures: number
  scaffoldDial?: number
  previousPhase?: string | null
}

export function tsmStepStage(a: TsmAdapters): Stage<KernelState, KernelState> {
  return {
    name: 'TSM-STEP',
    async run(state) {
      const teachingState: TeachingStateView = {
        phase: a.phase,
        scaffoldDial: a.scaffoldDial ?? 2,
        stageCeiling: a.stageCeiling,
        demonstrated: a.demonstrated,
        consecutiveFailures: a.consecutiveFailures,
        transitionThisTurn: {
          from: a.previousPhase ?? null,
          to: a.phase,
          direction: a.previousPhase == null || a.previousPhase === a.phase ? 'none'
            : a.previousPhase === 'OBSERVE' && a.phase === 'DEMONSTRATE' ? 'up'
            : 'down',
        },
      }
      return { ...state, teachingState }
    },
  }
}
