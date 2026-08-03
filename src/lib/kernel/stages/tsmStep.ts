/**
 * Stage 7 — TSM STEP. Owner: Teaching State Machine (RS §5).
 *
 * EXTRACTED (K3 promotion 1 of 2). Previously the caller handed this stage
 * the already-computed phase, stage ceiling, demonstrated flag and failure
 * count — the stage recorded an answer route.ts had derived. It now takes the
 * ConversationState itself and DERIVES all four, so the ceiling has one owner
 * instead of two computing it in parallel.
 *
 * The ladder transition still runs in conversationState.advanceConversationState
 * (post-turn, evidence-driven) and is deliberately not moved here: this stage
 * observes the state at decision time, which is what stages 8-10 consume.
 * ISS-01 (mapping the Phase C-G ladder onto the RS 10-state ladder) remains
 * K4 work.
 */
import type { KernelState, Stage, TeachingStateView } from '../types'
import { PHASE_MAX_QUESTION_STAGE, type ConversationState, type TeachingPhase } from '@/lib/teaching/conversationState'

export interface TsmAdapters {
  /** The live ladder state. null on pre-directive / school-mode turns, where
   *  the stage falls back to the conservative OBSERVE floor. */
  conversationState: ConversationState | null
  /** Phase at the START of the previous turn, for the transition record. */
  previousPhase?: string | null
  scaffoldDial?: number
}

/** The ceiling is a pure function of the phase — the same table route.ts
 *  reads. Exported so the parity harness can assert both paths agree. */
export function stageCeilingFor(phase: string | null | undefined): number {
  const p = (phase ?? 'OBSERVE') as TeachingPhase
  return PHASE_MAX_QUESTION_STAGE[p] ?? PHASE_MAX_QUESTION_STAGE.OBSERVE
}

export function tsmStepStage(a: TsmAdapters): Stage<KernelState, KernelState> {
  return {
    name: 'TSM-STEP',
    async run(state) {
      const cs = a.conversationState
      const phase = cs?.phase ?? 'OBSERVE'
      const teachingState: TeachingStateView = {
        phase,
        scaffoldDial: a.scaffoldDial ?? 2,
        stageCeiling: stageCeilingFor(phase),
        demonstrated: cs?.demonstrated === true,
        taughtThisSession: cs?.taughtThisSession === true,
        consecutiveFailures: cs?.consecutiveFailures ?? 0,
        counters: {
          consecutiveDontKnows: cs?.consecutiveDontKnows ?? 0,
          totalKnowledgeProbes: cs?.totalKnowledgeProbes ?? 0,
          consecutivePriorKnowledgeProbes: cs?.consecutivePriorKnowledgeProbes ?? 0,
          observeFailures: cs?.observeFailures ?? 0,
          questionsAskedSinceTeach: cs?.questionsAskedSinceTeach ?? 0,
          teachSegmentsSinceQuestion: cs?.teachSegmentsSinceQuestion ?? 0,
          correctAtCheck: cs?.correctAtCheck ?? 0,
          correctAtPractice: cs?.correctAtPractice ?? 0,
        },
        transitionThisTurn: {
          from: a.previousPhase ?? null,
          to: phase,
          direction: a.previousPhase == null || a.previousPhase === phase ? 'none'
            : a.previousPhase === 'OBSERVE' && phase === 'DEMONSTRATE' ? 'up'
            : 'down',
        },
      }
      return { ...state, teachingState }
    },
  }
}
