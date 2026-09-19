/**
 * THE MODEL CANNOT RECITE WHAT IT CANNOT SEE.
 *
 * ── THE DEFECT, AND WHY THE EXISTING FIX WAS NOT ENOUGH ─────────────────────
 * When Explanation Memory serves an authored explanation, that text becomes an
 * assistant message in the transcript — and the transcript is what the model is
 * given as context on every later turn. So the model can copy it back, and it
 * does. `buildTeachingMemoryBlock` was given an explicit instruction not to
 * (2026-08-30), which moved sessions containing a verbatim repeat from 65% to
 * 31% but did not close it: measured across the physics certification sweep,
 * 52 of 58 repeat pairs were the model reciting the authored explanation it
 * was served earlier in the same session. 0 were the authored asset being
 * legitimately re-served, and 6 were the model repeating itself.
 *
 * That ratio was the whole argument for the FIRST version of this file, which
 * compacted only `provider === 'memory'` turns. It shipped, and the C7
 * re-measurement (`docs/architecture/PHYSICS_REMEASUREMENT_2026-08-31.md`)
 * found it made NO measurable difference at full sample (Fisher exact
 * two-tailed p = 0.80, 50% -> 46%) — and, crucially, that **58% of the
 * remaining repeats (11 of 19) occurred with this turn's own retrieval empty
 * AND compaction active**: the model was reciting something this mechanism
 * never touched. The small original sample's own "6 is model repeating
 * itself, not addressed here" line names exactly that channel — it was just
 * undercounted at n=58; at n~364 it turned out to dominate what was left.
 *
 * ── SCOPE WIDENED (2026-09-19) ───────────────────────────────────────────────
 * `compactServedExplanations` no longer keys on `provider === 'memory'`. ANY
 * sufficiently long past assistant turn is compacted, regardless of who wrote
 * it — an authored explanation the server served, or a long explanation the
 * model composed itself. The marker wording distinguishes the two (only the
 * authored case may claim to be "the authored explanation"), but the removal
 * is unconditional on authorship. This is a direct, minimal extension of the
 * same proven mechanism to the channel its own header always said was real
 * and left open — not a new mechanism.
 *
 * ── WHAT THE LEARNER SEES IS UNCHANGED ──────────────────────────────────────
 * This rewrites ONLY the message list handed to the provider. The stored
 * Message row is untouched, so the learner's transcript still shows the full
 * explanation exactly where it was given, and re-reading their own history is
 * unaffected. Nothing is deleted anywhere.
 *
 * ── WHY A MARKER AND NOT A DELETION ─────────────────────────────────────────
 * Dropping the turn entirely would make the conversation read as though the
 * concept was never explained, and the model would open it from scratch —
 * trading a repetition defect for an amnesia defect, which is worse. The marker
 * keeps the turn in place and says what happened, so the model knows the ground
 * was covered and must build on it. This also directly serves a learner who
 * asks to have something "explained differently": the model can no longer
 * literally see its own prior wording to fall back on, so a genuine restatement
 * is the only thing it CAN produce.
 *
 * ── ONE THING THIS DOES NOT AND CANNOT FIX ──────────────────────────────────
 * A model that recomposes near-identical wording FRESH on two different turns
 * — grounded in the same always-present authored prompt material (Core
 * Understanding, misconception registry, etc.) rather than copied from either
 * turn's own history — produces the same C7 symptom (a 200+ char verbatim
 * match between two assistant turns) through a channel that touches no
 * conversation history at all. This file can only remove what the model has
 * already SAID from its later view; it cannot stop the model from saying the
 * same authored material twice independently. If C7 remains open after this
 * change, that channel is the next thing to measure, not a retry of this one.
 */

/** The provider tag the Explanation Memory path writes on a served turn. */
export const MEMORY_PROVIDER = 'memory'

export interface HistoryMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface SourcedMessage extends HistoryMessage {
  /** The persisted `Message.provider`. Absent on rows written before the
   *  column existed — now compacted the same as any other model-authored
   *  turn (2026-09-19; previously excluded, see the file header). */
  provider?: string | null
}

/**
 * The stand-in for a served AUTHORED explanation (`provider === 'memory'`).
 * Short on purpose — every character here is context the model pays for on
 * every subsequent turn, and its only job is to record that the ground was
 * covered.
 */
export const SERVED_EXPLANATION_MARKER =
  '[The authored explanation for this concept was shown to the learner here, in full. '
  + 'Do not restate it; build on it and say anything further a DIFFERENT way.]'

/**
 * The stand-in for a long turn the MODEL composed itself (any provider other
 * than `'memory'`, including rows that predate the `provider` column).
 * Deliberately different wording from `SERVED_EXPLANATION_MARKER`: this text
 * was never curated/authored, so the marker must not claim it was — only that
 * it was already said.
 */
export const SERVED_MODEL_TURN_MARKER =
  '[A detailed explanation was already given here, in full. '
  + 'Do not restate it; build on it and say anything further a DIFFERENT way.]'

/**
 * Replace the body of already-said long explanations in the model's view of
 * the conversation — authored (served from Explanation Memory) or the model's
 * own prior composition, either one.
 *
 * Only long ones. A short turn is not the passage this defect is about (the
 * measured repeats run to hundreds of characters), and compacting a one-line
 * answer would cost the model real context to prevent nothing.
 */
export function compactServedExplanations(
  messages: readonly SourcedMessage[],
  minLength = 200,
): HistoryMessage[] {
  return messages.map((m) => {
    const isLongAssistantTurn =
      m.role === 'assistant'
      && typeof m.content === 'string'
      && m.content.length >= minLength
    if (!isLongAssistantTurn) return { role: m.role, content: m.content }
    const marker = m.provider === MEMORY_PROVIDER ? SERVED_EXPLANATION_MARKER : SERVED_MODEL_TURN_MARKER
    return { role: m.role, content: marker }
  })
}
