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
  /**
   * PHASE B — WHOSE ARC IS THIS?
   *
   * This module's own first line calls the thing it tracks "the LESSON's
   * teaching arc", and `advanceNarrativeState` documents the three milestones
   * as "monotonic — once reached, never reverted". Both are correct about a
   * lesson and were being applied to a SESSION: the state carried no key, so
   * nothing reset it when the learner moved to another lesson. Lesson B
   * inherited lesson A's `coreTaught`, and `narrativeComplete` — which is
   * exactly `coreTaught` — reported the new lesson's arc finished before it
   * had begun, skipping the circle-back close on an autonomy request.
   *
   * Keyed the same way its sibling ledger `teachingHistory` already is, by the
   * concept the arc belongs to, so the reset rule is one idiom in both places
   * rather than two. A stored state from before this key existed carries
   * `undefined` and therefore resets once, which is the safe direction: the
   * milestones are re-earned from the next turn's evidence, and a milestone
   * wrongly believed already-reached is the defect being closed.
   */
  conceptId: string | null
  hookDelivered: boolean
  coreTaught: boolean
  hookResolved: boolean
}

export function initialNarrativeState(conceptId: string | null = null): NarrativeState {
  return {
    conceptId,
    hookDelivered: false,
    coreTaught: false,
    hookResolved: false,
  }
}

export function readNarrativeState(
  raw: unknown,
  currentConceptId: string | null = null,
): NarrativeState {
  if (raw && typeof raw === 'object') {
    const s = raw as NarrativeState
    if (typeof s.hookDelivered === 'boolean' && s.conceptId === currentConceptId) {
      return { ...initialNarrativeState(currentConceptId), ...s }
    }
  }
  return initialNarrativeState(currentConceptId)
}

/**
 * PHASE B — a new attempt re-opens the arc.
 *
 * The key above resets the arc when the learner moves to another CONCEPT; a
 * restart keeps the concept, so the fresh attempt would inherit a completed
 * arc and skip its own hook. Same boundary as every other per-attempt store —
 * see attemptIsolation.ts. A DELTA for writeSnapshotDelta; `readNarrativeState`
 * maps a non-object to `initialNarrativeState`, so no reader changes.
 */
export function clearNarrativeForNewAttempt(): Record<string, unknown> {
  return { narrativeState: null }
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
    // Carried, never re-derived: the fold must not be able to re-label an arc
    // as belonging to a different concept. Only readNarrativeState decides
    // whose arc this is, and it does so by discarding one that is not.
    conceptId: prev.conceptId ?? null,
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
