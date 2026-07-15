/**
 * Stage 10 — PLAN. Owner: Conversation Planner (RS §7).
 *
 * K3 v1: consumes the systemPrompt string route.ts already builds (Wave 0
 * blocks + turn directive + explanation law) and stores it in the RenderPlan
 * alongside the decision-scoped budgets/bans/history. This is the seam K4
 * migrates as prompt blocks retire (RS §13 inventory) — each retirement
 * removes text from the systemPrompt string and adds content-payload slots.
 */
import type { KernelState, Stage, RenderPlan } from '../types'
import { newId } from '../context'

export interface PlanAdapters {
  systemPrompt: string
  history: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>
}

export function planStage(a: PlanAdapters): Stage<KernelState, KernelState> {
  return {
    name: 'PLAN',
    async run(state) {
      const p = state.policy
      const plan: RenderPlan = {
        planId: newId('p'),
        turnId: state.context.turnId,
        systemPrompt: a.systemPrompt,
        history: a.history,
        budgets: p?.budgets ?? { maxQuestions: 0, maxParagraphs: null, maxNewTerms: 2 },
        vocabularyBans: p?.vocabularyBans ?? [],
        provenance: p?.provenance ?? [],
      }
      return { ...state, plan }
    },
  }
}
