/**
 * TELL THE MODEL WHAT THE SERVER ALREADY KNOWS ABOUT THE ANSWER.
 *
 * ── THE DEFECT (real-learner production run, 2026-09-29) ────────────────────
 * `gradeMcqAnswer` grades the learner's reply BEFORE the model is called, but
 * nothing put that verdict in the prompt. The model therefore did not know the
 * learner was wrong and, on a wrong answer, typically wrote a paraphrase-and-
 * confirm ("It sounds like you're thinking the 10 N push is the force to use…
 * Is that right?"). `stripConfirmBack` correctly removes that sentence, and
 * `stateCorrectionForWrongAnswer` correctly prepends the authored answer — so
 * the learner received ONLY "Not quite — the answer is: …" and the next
 * question. Measured: 5 of 5 wrong answers across P1/P2/P4/P5 ended that way
 * (production log, P1 18:56:20Z: draft 223 chars → 76 after the strip).
 *
 * ── WHAT THIS DOES ──────────────────────────────────────────────────────────
 * Adds one prompt block, only on a turn the server graded against an AUTHORED
 * key: it states the verdict, the option chosen and the right option, and asks
 * for the one thing that was missing — a short, simple WHY. It changes no
 * grade, no mastery counter and no question selection; the same authored-key
 * rule as `stateCorrectionForWrongAnswer` decides whether anything is said, so
 * a model-invented key (which can be wrong) is never stated as fact.
 */

export interface AnswerVerdictInput {
  /** `gradeMcqAnswer`'s result for THIS turn, or null when nothing was graded. */
  grade: { chosenIndex: number | null; correct: boolean | null } | null
  /** The question the answer was graded against. */
  mcq: { question?: unknown; options?: unknown; correctIndex?: unknown } | null | undefined
  /** Whether that question's key is authored (`probeKeyIsAuthored`). */
  keyIsAuthored: boolean
}

const optionAt = (options: unknown, i: unknown): string | null => {
  if (!Array.isArray(options) || typeof i !== 'number' || !Number.isInteger(i)) return null
  const o = options[i]
  return typeof o === 'string' && o.trim() ? o.trim() : null
}

/** The prompt block, or '' when the turn was not graded against an authored key. */
export function buildAnswerVerdictBlock(input: AnswerVerdictInput): string {
  const { grade, mcq, keyIsAuthored } = input
  if (!grade || grade.correct === null || grade.chosenIndex === null || !mcq || !keyIsAuthored) return ''
  const chosen = optionAt(mcq.options, grade.chosenIndex)
  const right = optionAt(mcq.options, mcq.correctIndex)
  const question = typeof mcq.question === 'string' ? mcq.question.trim() : ''
  if (!chosen || !right) return ''

  if (grade.correct) {
    return `\n\nANSWER JUST GRADED — CORRECT (server-checked against the authored key).
Question: "${question}"
The learner chose: "${chosen}" — this is right.
In your reply: confirm it in one short sentence, then give ONE simple sentence saying WHY it is right, using only what this lesson has taught. Do not restate their answer as a question.`
  }
  return `\n\nANSWER JUST GRADED — WRONG (server-checked against the authored key).
Question: "${question}"
The learner chose: "${chosen}"
The correct answer is: "${right}"
In your reply, in simple, short sentences a weak English reader can follow:
1. Say kindly that this answer is not right.
2. Explain WHY "${chosen}" is wrong — name the exact idea it gets wrong.
3. Explain WHY the correct answer is right, using only what this lesson has already taught.
Do NOT ask the learner to confirm what they meant, do NOT restate their answer as a question, and do NOT move on without the explanation.`
}
