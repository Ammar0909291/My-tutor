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

/**
 * Did the LEARNER drive this turn — a question or a request to the tutor, not
 * an answer to the pending quiz and not a request for practice? Such a turn
 * does not consume the concept's teaching budget (conversationState
 * TurnEvidence.learnerInitiated).
 */
export function isLearnerInitiatedTurn(message: string, opts: { answeredPendingQuestion: boolean }): boolean {
  const m = (typeof message === 'string' ? message : '').trim()
  if (!m || opts.answeredPendingQuestion) return false
  if (isBareAcknowledgement(m) || isLowSignalAcknowledgement(m) || asksForPractice(m)) return false
  return /\?\s*$/.test(m) || detectLearnerQuestion(m) || readsAsRequestToTutor(m)
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
  // ONLY when that is all the message says. MEASURED (real-learner production
  // run, 2026-09-29, phys.em.kirchhoffs-laws): "i see no arrow in picture. can
  // you give me new question to practice?" matched asksForPractice, a stored
  // paragraph was served, and the learner's report that the figure had no
  // arrow was never answered. Any OTHER sentence with content still needs the
  // model.
  if (asksForPractice(m)) return otherSentenceHasContent(m)
  if (detectLearnerQuestion(m) || readsAsRequestToTutor(m)) return true
  // A claim, an explanation, a typed answer, a complaint — anything with content.
  return contentWordCount(m) >= MIN_CONTENT_WORDS
}

/** Does any sentence OTHER than the practice request carry content of its own? */
function otherSentenceHasContent(message: string): boolean {
  const sentences = message.split(/(?<=[.!?])\s+|\n+/).map((x) => x.trim()).filter(Boolean)
  if (sentences.length < 2) return false
  return sentences.some((sentence) =>
    !asksForPractice(sentence)
    && (detectLearnerQuestion(sentence) || readsAsRequestToTutor(sentence) || contentWordCount(sentence) >= MIN_CONTENT_WORDS - 1),
  )
}
