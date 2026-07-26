/**
 * Narrative Tracker — ensures the lesson's teaching arc completes before
 * lesson completion.
 *
 * Problem: mastery evidence (CHECK + PRACTICE correct answers) could
 * authorize [LESSON_COMPLETE] even when the tutor had drifted away from
 * the lesson's intended teaching flow — e.g. the student answered
 * practice questions about a tangent rather than the anchored concept's
 * goal, or the lesson's opening hook was never resolved.
 *
 * Fix: track three narrative milestones that a complete lesson requires:
 *   1. HOOK_DELIVERED — the lesson opened with a concrete scenario/anchor
 *   2. CORE_TAUGHT — the concept's core idea was explicitly taught
 *   3. HOOK_RESOLVED — the opening scenario was revisited/answered
 *
 * The tracker injects a compact directive when [LESSON_COMPLETE] is about
 * to fire but the narrative is incomplete — a soft gate that reminds the
 * LLM to close the arc before concluding.
 *
 * Pure module: no DB, no I/O.
 */

export interface NarrativeState {
  hookDelivered: boolean
  coreTaught: boolean
  hookResolved: boolean
}

export function initialNarrativeState(): NarrativeState {
  return {
    hookDelivered: false,
    coreTaught: false,
    hookResolved: false,
  }
}

export function readNarrativeState(raw: unknown): NarrativeState {
  if (raw && typeof raw === 'object') {
    const s = raw as NarrativeState
    if (typeof s.hookDelivered === 'boolean') {
      return { ...initialNarrativeState(), ...s }
    }
  }
  return initialNarrativeState()
}

export interface NarrativeEvidence {
  /** The assistant's turn included a concrete scenario/anchor/hook. */
  deliveredHook: boolean
  /** The assistant explained/demonstrated the core concept idea. */
  taughtCore: boolean
  /** The assistant circled back to the opening scenario with the concept applied. */
  resolvedHook: boolean
}

/**
 * Fold one turn's evidence into the narrative state. Pure.
 * Milestones are monotonic — once reached, never reverted.
 */
export function advanceNarrativeState(
  prev: NarrativeState,
  evidence: NarrativeEvidence,
): NarrativeState {
  return {
    hookDelivered: prev.hookDelivered || evidence.deliveredHook,
    coreTaught: prev.coreTaught || evidence.taughtCore,
    hookResolved: prev.hookResolved || evidence.resolvedHook,
  }
}

export function narrativeComplete(state: NarrativeState): boolean {
  return state.coreTaught
}

/**
 * Derive narrative evidence from the conversation phase and turn context.
 * Uses the existing ConversationState phase ladder rather than re-parsing
 * assistant text — the phase transitions ARE the evidence.
 */
export function deriveNarrativeEvidence(
  phase: string,
  demonstrated: boolean,
  nextMove: string,
): NarrativeEvidence {
  return {
    deliveredHook: phase === 'OBSERVE' || phase === 'DEMONSTRATE',
    taughtCore: demonstrated,
    resolvedHook: phase === 'CHECK' || phase === 'PRACTICE' || phase === 'TRANSFER',
  }
}

/**
 * Compact directive injected when the lesson is about to complete
 * but the narrative arc is incomplete. Only fires when mastery is
 * verified but the concept's core hasn't been properly taught.
 */
export function buildNarrativeCloseBlock(conceptTitle: string): string {
  return (
    `\n\nNARRATIVE CLOSE — before concluding this lesson, circle back to "${conceptTitle}": ` +
    `briefly restate the key idea you taught and connect it to where you started. ` +
    `The lesson should feel like a complete story, not a set of disconnected exchanges.`
  )
}
