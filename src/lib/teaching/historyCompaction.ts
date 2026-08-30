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
 * 52 of 58 repeat pairs are still the model reciting the authored explanation
 * it was served earlier in the same session. 0 are the authored asset being
 * legitimately re-served, and 6 are the model repeating itself.
 *
 * That ratio is the whole argument for this file. The instruction is advisory,
 * this repo has now measured several advisory rules being ignored, and there is
 * a deterministic option available that the instruction approach does not have:
 * REMOVE THE THING BEING COPIED FROM THE MODEL'S VIEW.
 *
 * ── WHAT THE LEARNER SEES IS UNCHANGED ──────────────────────────────────────
 * This rewrites ONLY the message list handed to the provider. The stored
 * Message row is untouched, so the learner's transcript still shows the full
 * authored explanation exactly where it was served, and re-reading their own
 * history is unaffected. Nothing is deleted anywhere.
 *
 * ── WHY A MARKER AND NOT A DELETION ─────────────────────────────────────────
 * Dropping the turn entirely would make the conversation read as though the
 * concept was never explained, and the model would open it from scratch —
 * trading a repetition defect for an amnesia defect, which is worse. The marker
 * keeps the turn in place and says what happened, so the model knows the ground
 * was covered and must build on it. `buildTeachingMemoryBlock`'s existing line
 * carries the same fact; this makes it structural rather than advisory.
 *
 * ── SCOPE, DELIBERATELY NARROW ──────────────────────────────────────────────
 * ONLY assistant turns the server itself served from Explanation Memory
 * (`provider === 'memory'`), which is a fact the server recorded, never a guess
 * about what a turn looks like. A model-authored turn is left completely alone:
 * the model repeating ITSELF is a different defect (6 of 58 pairs), it is not
 * addressed here, and pretending otherwise would hide it.
 */

/** The provider tag the Explanation Memory path writes on a served turn. */
export const MEMORY_PROVIDER = 'memory'

export interface HistoryMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface SourcedMessage extends HistoryMessage {
  /** The persisted `Message.provider`. Absent on rows written before it
   *  existed, which are treated as model-authored and left alone. */
  provider?: string | null
}

/**
 * The stand-in. Short on purpose — every character here is context the model
 * pays for on every subsequent turn, and its only job is to record that the
 * ground was covered.
 */
export const SERVED_EXPLANATION_MARKER =
  '[The authored explanation for this concept was shown to the learner here, in full. '
  + 'Do not restate it; build on it and say anything further a DIFFERENT way.]'

/**
 * Replace the body of already-served authored explanations in the model's view
 * of the conversation.
 *
 * Only long ones. A short authored turn is not the passage this defect is about
 * (the measured repeats run to hundreds of characters), and compacting a
 * one-line answer would cost the model real context to prevent nothing.
 */
export function compactServedExplanations(
  messages: readonly SourcedMessage[],
  minLength = 200,
): HistoryMessage[] {
  return messages.map((m) => {
    const isServedExplanation =
      m.role === 'assistant'
      && m.provider === MEMORY_PROVIDER
      && typeof m.content === 'string'
      && m.content.length >= minLength
    return isServedExplanation
      ? { role: m.role, content: SERVED_EXPLANATION_MARKER }
      : { role: m.role, content: m.content }
  })
}
