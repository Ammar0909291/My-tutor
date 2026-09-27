/**
 * DOES THIS LEARNER MESSAGE NEED THE TUTOR TO ACTUALLY REPLY TO IT?
 *
 * One predicate, consulted by every deterministic path that can take a turn
 * away from the model (Explanation Memory, the gate's canned lead-in, the
 * no-probe withhold's fallback). Turn Contract V2's unbuilt invariant I8:
 * a learner's message is answered or explicitly declined — never silently
 * replaced by content that ignores it.
 *
 * WHY ONE PREDICATE (2026-09-27, live study on a fresh account). Each takeover
 * path carried its own short exemption list ("unless it is a '?' question",
 * "unless it is a diagram request"), and every fix added one more exemption to
 * one path. Whatever the lists missed was overridden:
 *   - "For a delta bump … which levels shift?" → a stored generic paragraph;
 *   - "…they must travel faster than light" (a false claim) → a canned quiz
 *     lead-in, the misconception never addressed;
 *   - "you skipped my point: …" → the one-line concept description.
 * The rule here is the inverse: deterministic content may replace the model's
 * reply ONLY on a low-content turn — "ok", "continue", "got it", a request for
 * practice ("quiz me"), or a tap on the quiz the server just graded. Anything with real content goes to the
 * model; deterministic content may still ACCOMPANY it (a probe, a figure).
 */
import { detectLearnerQuestion, isLowSignalAcknowledgement } from './conversationState'
import { isBareAcknowledgement, asksForPractice } from './masteryGate'
import { readsAsRequestToTutor } from './mcq'

/** Words that carry no content on their own ("ok so yes then"). */
const FILLER = new Set([
  'ok', 'okay', 'k', 'yes', 'yeah', 'yep', 'no', 'nope', 'sure', 'right', 'fine', 'cool', 'great',
  'thanks', 'thank', 'you', 'got', 'it', 'i', 'see', 'understand', 'understood', 'makes', 'sense',
  'continue', 'next', 'go', 'on', 'please', 'so', 'then', 'and', 'the', 'a', 'an', 'that', 'this',
  'lets', "let's", 'move', 'keep', 'going', 'alright', 'done', 'ready', 'hmm', 'oh', 'ah',
])

/** Minimum number of non-filler words for a statement to be real content. */
export const MIN_CONTENT_WORDS = 4

function contentWordCount(message: string): number {
  return message
    .toLowerCase()
    .replace(/[^\p{L}\p{N}'\s]+/gu, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 0 && !FILLER.has(w))
    .length
}

export function learnerMessageNeedsModelReply(
  message: string,
  opts: { answeredPendingQuestion: boolean },
): boolean {
  const m = (typeof message === 'string' ? message : '').trim()
  if (m.length === 0) return false
  // A tap the server graded is answered by the grade itself (verdict + next item).
  if (opts.answeredPendingQuestion) return false
  if (isBareAcknowledgement(m) || isLowSignalAcknowledgement(m)) return false
  // "give me a practice question" / "quiz me": a stock lead-in plus an authored
  // quiz IS the reply it asks for (the same reading turnIntent.wantsPractice uses).
  if (asksForPractice(m)) return false
  if (detectLearnerQuestion(m) || readsAsRequestToTutor(m)) return true
  // A claim, an explanation, a typed answer, a complaint — anything with content.
  return contentWordCount(m) >= MIN_CONTENT_WORDS
}
