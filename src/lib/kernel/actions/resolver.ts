/**
 * K4 — Action resolver (RS §6): PolicyDecision → TeachingAction.
 *
 * Chooses a legal action for the phase given the policy's actionClass hint.
 * If the hint is not legal for the current phase, the resolver falls back
 * to the phase's first legal action (RS §6 discipline: closed set, no
 * invention).
 */
import type { EnginePolicyDecision } from '../policy/types'
import { ACTION_DEFAULTS, PHASE_FIT, isKnownAction, type TeachingActionId } from './catalog'

export interface ResolvedAction {
  actionId: TeachingActionId
  presentationMode: 'text' | 'visual_and_text' | 'interactive'
  interactionLevel: 'low' | 'guided' | 'active' | 'high'
  visualClass: string | null
  cost: 0 | 1 | 2 | 3
  provenance: string           // rule id or fallback marker
}

const OBJECTIVE_BY_MOVE: Record<string, string> = {
  RECOVER: 'restore composure; bank one small win',
  ASK: 'observation-first check; one question at or below the stage ceiling',
  SHOW: 'demonstrate the target idea concretely',
  TEACH: 'guided explanation grounded in a concrete example',
  CELEBRATE: 'acknowledge a specific win, then continue',
  CLOSE: 'warm close on a win; queue the follow-up',
  WAIT: 'wait — the pause is the teaching',
}

export function resolveAction(decision: EnginePolicyDecision, phase: string): ResolvedAction {
  const hint = decision.actionClass
  const legal = PHASE_FIT[phase] ?? PHASE_FIT.ANCHOR
  let actionId: TeachingActionId
  let provenance = ''
  if (hint && isKnownAction(hint) && legal.includes(hint)) {
    actionId = hint
    provenance = 'policy:actionClass'
  } else if (hint && isKnownAction(hint)) {
    // Hint not legal for phase → fall back to phase's first legal option
    // (RS §6 A-1: never invent). Recorded so the caller can see.
    actionId = legal[0]
    provenance = `fallback:phase-fit(hint=${hint})`
  } else {
    actionId = legal[0]
    provenance = 'fallback:phase-fit(no-hint)'
  }
  const def = ACTION_DEFAULTS[actionId]
  return {
    actionId,
    presentationMode: decision.visualClass ? 'visual_and_text' : def.presentationMode,
    interactionLevel: def.interactionLevel,
    visualClass: decision.visualClass,
    cost: def.cost,
    provenance,
  }
}

export function moveObjective(move: string): string {
  return OBJECTIVE_BY_MOVE[move] ?? 'teach the next small step'
}
