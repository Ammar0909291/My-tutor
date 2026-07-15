/**
 * Stage 9 — RESOLVE. Owner: Action Engine (RS §6).
 *
 * Binds PolicyDecision.actionClass to a concrete TeachingAction with
 * presentation mode + visual class + slot resolution status. K3 v1 uses
 * the existing detectVisual/assembleLesson paths as a data source (via
 * adapters); K4 introduces the compiled action tables.
 */
import type { KernelState, Stage, TeachingAction } from '../types'
import { newId } from '../context'

export interface ResolveAdapters {
  objective: string
  interactionLevel?: 'low' | 'guided' | 'active' | 'high'
  slotsResolved?: boolean
  cost?: 0 | 1 | 2 | 3
}

export function resolveStage(a: ResolveAdapters): Stage<KernelState, KernelState> {
  return {
    name: 'RESOLVE',
    async run(state) {
      const policy = state.policy
      const visualClass = policy?.visualDirective.visualClass ?? null
      const presentationMode: TeachingAction['presentationMode'] =
        policy?.move === 'ASK' ? 'interactive'
        : visualClass ? 'visual_and_text'
        : 'text'
      const action: TeachingAction = {
        actionId: newId('a'),
        turnId: state.context.turnId,
        presentationMode,
        visualClass,
        interactionLevel: a.interactionLevel ?? 'guided',
        objective: a.objective,
        slotsResolved: a.slotsResolved ?? true,
        cost: a.cost ?? 1,
      }
      return { ...state, action }
    },
  }
}
