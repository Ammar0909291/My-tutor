/**
 * WHEN THE CONFIRM-BACK STRIP LEAVES NOTHING, ASK ONCE MORE — DON'T SEND A STUB.
 *
 * ── THE DEFECT (real-learner production run 2, 2026-09-30) ────────────────
 * The model often answers with nothing but a paraphrase-and-confirm ("I hear
 * you saying that the stone's acceleration is zero because its speed doesn't
 * change. Is that right?"). `stripConfirmBack` rightly removes it, and what was
 * left went to the learner:
 *   - a wrong answer:  "Not quite — the answer is: 9 m/s² towards the centre"
 *     and nothing else (log: confirm-back 165 → 59 chars, P7);
 *   - a practice request or a complaint: the concept-fallback line
 *     "Gas Laws covers: Boyle's, Charles's …" (C6) or "Snell's law n₁sinθ₁ =
 *     n₂sinθ₂ describes how light bends …" (P6);
 *   - a wrong answer with a new question: "Let me check your thinking with
 *     this." (P6, "30°").
 * Each is a real reply that says nothing about what the learner wrote.
 *
 * ── WHAT THIS DOES ──────────────────────────────────────────────────────────
 * Decides when the strip left too little (`needsRepair`), builds the one
 * instruction a regeneration needs (`buildConfirmBackRepairAppendix`), and
 * joins the kept text with the retry (`mergeRepair`). The route makes the one
 * extra model call, the same "one regeneration carrying the violation" shape
 * the affirm-guard and remediation-floor repairs already use. Grading,
 * mastery and question selection are untouched.
 */

/** The server's wrong-answer line, prepended by stateCorrectionForWrongAnswer. */
const CORRECTION_LINE = /^\s*Not quite — the answer is:[^\n]*\n*/

/** Fewer words than this, outside the correction line, is a stub. */
export const MIN_REPAIRED_WORDS = 12

const wordCount = (s: string) => s.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length

/** The correction line the stripped text opens with, or ''. */
export function correctionLineOf(text: string): string {
  const m = CORRECTION_LINE.exec(text ?? '')
  return m ? m[0].trim() : ''
}

/** True when what the strip left carries no real reply to the learner. */
export function needsRepair(strippedText: string): boolean {
  const rest = (strippedText ?? '').replace(CORRECTION_LINE, '')
  return wordCount(rest) < MIN_REPAIRED_WORDS
}

export interface RepairContext {
  /** The server's verdict on this turn's answer, when it may be stated. */
  graded: { correct: boolean } | null
  chosenOption: string | null
  correctOption: string | null
}

/** The one instruction the regeneration carries. */
export function buildConfirmBackRepairAppendix(ctx: RepairContext): string {
  const head =
    '\n\nOUTPUT REJECTED (server-side check). Your reply only restated the ' +
    "learner's words and asked them to confirm. The learner gets nothing from " +
    'that. Do NOT restate what they said and do NOT ask "is that right?". '
  let task: string
  if (ctx.graded && ctx.graded.correct === false && ctx.chosenOption && ctx.correctOption) {
    task =
      `The learner chose "${ctx.chosenOption}", which is WRONG; the correct answer is ` +
      `"${ctx.correctOption}". The correction line is already shown to them, so do not ` +
      'repeat it. In 2–4 short sentences: say WHY their choice is wrong (the exact idea ' +
      'it gets wrong) and WHY the correct answer is right, using only what this lesson taught.'
  } else if (ctx.graded && ctx.graded.correct === true && ctx.correctOption) {
    task =
      `The learner chose "${ctx.correctOption}", which is RIGHT. Confirm it in one short ` +
      'sentence and give ONE simple sentence saying why it is right.'
  } else {
    task =
      'Reply directly to what the learner just wrote: answer their question, or do ' +
      'what they asked (if they asked for a practice question, give one), in 2–5 short sentences.'
  }
  return head + task + ' Use easy words and short sentences — the learner is still learning English.'
}

/** The kept correction line (if any) followed by the retry's own text. */
export function mergeRepair(strippedText: string, retryText: string): string {
  const line = correctionLineOf(strippedText)
  const retry = (retryText ?? '').replace(CORRECTION_LINE, '').trim()
  if (!retry) return strippedText
  return line ? `${line}\n\n${retry}` : retry
}
