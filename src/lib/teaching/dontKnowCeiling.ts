/**
 * "I DON'T KNOW" FOUR TIMES MUST NOT PRODUCE A FIFTH QUESTION.
 *
 * ── THE DEFECT, REPORTED BY THE OWNER FROM A LIVE LESSON ────────────────────
 * A learner on the second law of thermodynamics answered a probe with "I don't
 * know", and then said it three more times. The transcript:
 *
 *   MCQ served
 *   "I don't know"        -> "Let's stay with this idea for a moment."
 *   "I don't know"        -> one sentence of teaching, then "Which part of the
 *                            histogram in the figure shows which outcome is
 *                            most likely?"
 *   "I said I don't know" -> "What do you notice about the shape of the
 *                            histogram in the figure?"          (pure question)
 *   "I don't know"        -> teaching, no question               (finally)
 *
 * Their words: "Despite replying few times that I don't know it kept me asking
 * mcq. If I would have not replied it then it could be eternal."
 *
 * ── THE MACHINERY WAS ALREADY RIGHT, AND WAS IGNORED ────────────────────────
 * Every part of the intended behaviour already existed and fired:
 *   · `detectFailureState` matches all four utterances, including "I said I
 *     don't know" (verified against the real module, not assumed);
 *   · `sessionFailureCount` increments on every recovery utterance;
 *   · at >= 2 the RECOVERY block already says, in capitals, "Stop ALL questions
 *     this turn. Do not offer a two-choice question."
 *
 * The model asked anyway, three times. That is the whole reason this file is in
 * the runtime and not in a prompt: this repo has now measured a long line of
 * advisory rules being ignored — the figure reference, the ungradeable gate
 * question, the repeated explanation — and each one had to become an invariant
 * before it held.
 *
 * ── WHAT IT DOES INSTEAD OF ASKING ──────────────────────────────────────────
 * Stripping the question is only half an answer: strip a turn that is NOTHING
 * but a question and the learner gets an empty screen, and the existing
 * content-free fallback ("Let's stay with this idea for a moment") is the very
 * sentence that opened this transcript and is itself a measured defect.
 *
 * So when the stripped turn has no teaching left AND the learner is sitting in
 * front of a probe the server holds the key to, this REVEALS THE ANSWER. That
 * is what a human tutor does on the third "I don't know", and it fabricates
 * nothing: the option and its index come from the authored, human-reviewed
 * probe the server itself attached. Same justification as
 * `answerConfirmation.ts` — the server states a fact it already holds.
 *
 * ── WHAT IT NEVER DOES ──────────────────────────────────────────────────────
 * It does not fire on the FIRST "I don't know". One shrink-and-retry is good
 * teaching and is exactly what the recovery script is for; the defect is the
 * absence of a ceiling, not the presence of the technique. It does not touch a
 * turn that asks nothing. It does not touch a turn on any other failure state,
 * and it never invents teaching — when there is no key to reveal it returns the
 * stripped teaching and, failing that, leaves the turn alone rather than
 * shipping a hold sentence.
 */
import { dropAnswerableContent } from './gateAssessment'
import { askedAnswerableQuestion } from './answerableTurn'

export interface DontKnowCeilingInput {
  /** The reply as it stands after the other post-model repairs. */
  text: string
  /** This turn's detected failure state, from `detectFailureState`. */
  recoveryKey: string | null
  /** Consecutive don't-know-family utterances INCLUDING this turn's. */
  consecutiveDontKnows: number
  /** The probe on screen, when the server attached one and holds its key. */
  pendingMcq?: { question?: string; options?: string[]; correctIndex?: number } | null
}

export interface DontKnowCeilingResult {
  text: string
  withheld: boolean
  reason: 'ok' | 'below-ceiling' | 'no-question' | 'question-withheld' | 'answer-revealed'
}

/** The don't-know family, matching `recoveryGuard`'s own DONT_KNOW_SIGNAL_KEYS. */
const DONT_KNOW_KEYS = new Set(['dont_know', 'dont_understand', 'confused'])

/**
 * The ceiling. Two consecutive don't-knows is the rung the RECOVERY block
 * already calls "REPEATED STRUGGLE", so this enforces the escalation that is
 * already written rather than inventing a new policy.
 */
export const DONT_KNOW_QUESTION_CEILING = 2

export function applyDontKnowCeiling(input: DontKnowCeilingInput): DontKnowCeilingResult {
  try {
    const text = typeof input.text === 'string' ? input.text : ''
    if (!input.recoveryKey || !DONT_KNOW_KEYS.has(input.recoveryKey)) {
      return { text: input.text, withheld: false, reason: 'ok' }
    }
    const n = input.consecutiveDontKnows
    if (!Number.isFinite(n) || n < DONT_KNOW_QUESTION_CEILING) {
      return { text: input.text, withheld: false, reason: 'below-ceiling' }
    }
    if (!askedAnswerableQuestion(text)) {
      return { text: input.text, withheld: false, reason: 'no-question' }
    }

    // Paragraph-scoped first, which is the shared contract and the safe one.
    let kept = dropAnswerableContent(text).trim()

    // SENTENCE-LEVEL FALLBACK. `dropAnswerableContent` drops a whole paragraph
    // that poses a question, and the tutor routinely writes the teaching and the
    // question as ONE paragraph — the real turn here was "The second law says
    // entropy tends to increase because there are vastly more ways ... Which
    // part of the histogram shows which outcome is most likely?". Paragraph
    // scope throws the explanation away with the question, which is the opposite
    // of what a learner who has said "I don't know" three times needs.
    //
    // So when paragraph scope empties the turn, keep the sentences that are NOT
    // questions. Deliberately local to this file rather than a change to the
    // shared helper: that helper's paragraph scope is relied on elsewhere, and a
    // fallback that only ever runs when the strict version returned nothing
    // cannot make any other caller worse.
    if (kept.length === 0) {
      const sentences = text.split(/(?<=[.!?])\s+/)
      const statements = sentences.filter((x) => x.trim().length > 0 && !x.trim().endsWith('?'))
      const rebuilt = statements.join(' ').trim()
      // Only worth keeping if real teaching survived, not a stray lead-in.
      if (rebuilt.length >= 60) kept = rebuilt
    }
    const mcq = input.pendingMcq
    const options = Array.isArray(mcq?.options) ? mcq!.options : null
    const i = mcq?.correctIndex
    const answer = options && typeof i === 'number' && i >= 0 && i < options.length
      ? options[i]
      : null

    if (kept.length > 0) {
      return { text: kept, withheld: true, reason: 'question-withheld' }
    }
    if (answer) {
      // Nothing but a question was produced, and the learner has now said they
      // do not know three times. Tell them.
      return {
        text: `That's completely fine — let me just tell you. The answer is: ${answer}`,
        withheld: true,
        reason: 'answer-revealed',
      }
    }
    // No teaching to keep and no key to reveal. Inventing a hold sentence here
    // is the defect that opened this transcript, so the turn is left alone.
    return { text: input.text, withheld: false, reason: 'ok' }
  } catch {
    return { text: input.text, withheld: false, reason: 'ok' }
  }
}
