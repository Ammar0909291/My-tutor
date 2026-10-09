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
  /** A question card is rendered right after the reply (the turn's MCQ). */
  questionFollows?: boolean
  /** What the clean-up removed: a confirm-back (default) or a question cut
   *  beside the card by the gate contract. */
  cause?: 'confirm-back' | 'question-cut'
}

/** The one instruction the regeneration carries. */
export function buildConfirmBackRepairAppendix(ctx: RepairContext): string {
  const head = ctx.cause === 'question-cut'
    ? '\n\nOUTPUT REJECTED (server-side check). Your reply was only a question, ' +
      'and a question card is already shown to the learner, so your question was ' +
      'removed and they got nothing. Teach instead, and do NOT ask any question. '
    : '\n\nOUTPUT REJECTED (server-side check). Your reply only restated the ' +
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
      'what they asked (if they asked for a practice question, give one), in 2–5 short sentences. ' +
      'If they answered a question or problem you set earlier, say plainly whether their answer ' +
      'is right or wrong, and why.'
  }
  // A question card follows the reply: a second question would compete with it
  // (and is the very thing the one-question contract just removed).
  const noQuestion = ctx.questionFollows
    ? ' A question card is shown right after your reply, so do NOT ask a question yourself.'
    : ''
  return head + task + noQuestion + ' Use easy words and short sentences — the learner is still learning English.'
}

/** The kept correction line (if any) followed by the retry's own text. */
export function mergeRepair(strippedText: string, retryText: string): string {
  const line = correctionLineOf(strippedText)
  const retry = (retryText ?? '').replace(CORRECTION_LINE, '').trim()
  if (!retry) return strippedText
  return line ? `${line}\n\n${retry}` : retry
}

/** A line the model wrote as an answer option of its own: "A) …", "B. …". */
const OPTION_LINE = /^\s*(?:[A-D][).:]|\([A-D]\))\s/

/**
 * The reply without its question sentences and home-made option lines.
 *
 * MEASURED (2026-10-02, chem.found.pure-substances): the one regeneration was
 * 496 chars of teaching that ended in a question. Beside a question card that
 * question cannot ship, and discarding the whole retry left the learner a
 * stub. Only the sentences carrying "?" go; the teaching stays.
 */
export function dropQuestionSentences(text: string): string {
  if (!/\?/.test(text ?? '')) return text
  // PHYS-023 (2026-10-05, phys orders 71/72/234): the sentence split below
  // ends a "sentence" at the "!" of "<!--", so a retry that wrote its own card
  // tag lost only `--MCQ q="…?"` and kept `<!" a="…" … correct="B"-->` —
  // options AND answer key — in a shape no tag parser or sweep recognised.
  // A tag is never split: one that asks a question is dropped whole (a card
  // already follows, so a second one cannot ship); any other tag is kept whole.
  const tags: string[] = []
  const masked = (text ?? '')
    .replace(/<!--[\s\S]*?-->/g, (tag) => (tag.includes('?') ? '' : `\u0000${tags.push(tag) - 1}\u0000`))
  // ENGL-012 (2026-10-07, english #185, #138, #92): a "?" inside quotation
  // marks is quoted example text ("The historian asks, “What was happening?”"),
  // not a question to the learner. Splitting on it dropped everything from the
  // sentence start to the "?" and left the closing ” — "” – they look for
  // clues…", "1.” 2. Sam…". A quoted span on one line is masked whole first.
  const quotes: string[] = []
  const quoteMasked = masked.replace(/“[^”\n]*”|"[^"\n]*"/g, (q) => `\u0001${quotes.push(q) - 1}\u0001`)
  const restore = (s: string) => s
    .replace(/\u0001(\d+)\u0001/g, (_, i) => quotes[Number(i)])
    .replace(/\u0000(\d+)\u0000/g, (_, i) => tags[Number(i)])
  if (!/\?/.test(quoteMasked)) return restore(quoteMasked).replace(/\n{3,}/g, '\n\n').trim()
  return restore(quoteMasked
    .split(/\n{2,}/)
    .map((para) => para
      .split('\n')
      .filter((line) => !OPTION_LINE.test(line))
      .map((line) => (line.match(/[^.!?]+(?:[.!?]+|$)/g) ?? [])
        .filter((sentence) => !sentence.includes('?'))
        .join('')
        .trim())
      .filter(Boolean)
      .join('\n'))
    .filter(Boolean)
    .join('\n\n')
    .trim())
}

/**
 * CHEM-044 / CHEM-024 (2026-10-05, chemistry real-learner run: #40, #58, #78
 * and 12 more lessons, turn 1): on the turn the question-legality kernel had
 * blocked ANY question (QL1 — "nothing has been taught yet this session"), the
 * first reply after "ok" was an untaught multi-part problem ("Using the
 * ideal-gas law, what pressure would you predict? Now apply the van der Waals
 * equation with a = 3.59 … b = 0.0427 …") or presupposed an attempt never made
 * ("Can you walk me through how you thought you could calculate…"). The turn
 * directive already says "no question"; this is the deterministic partner.
 *
 * Removes the sentences that ask the learner something or demand work from
 * them (calculate/predict/apply/work out…, "walk me through how you…"), and
 * keeps every sentence that teaches. Pure.
 */
const WORK_DEMAND_RE = /\b(?:calculate|compute|predict|work\s+out|determine|derive|solve|apply\s+the|explain\s+(?:why|how)|use\s+the\s+[\w\s-]{0,30}(?:law|equation|formula)|walk\s+me\s+through|how\s+did\s+you|how\s+you\s+(?:thought|decided|got|worked)|show\s+(?:me\s+)?your\s+(?:working|work|steps))\b/i
const ADDRESSED_RE = /\b(?:you|your)\b|^\s*(?:now\s+|then\s+|finally,?\s+)?(?:calculate|compute|predict|work\s+out|determine|derive|solve|apply|use|find|explain)\b/i

export function dropUntaughtWorkDemands(text: string): { text: string; removed: string[] } {
  const removed: string[] = []
  const out = (text ?? '')
    .split(/\n{2,}/)
    // A full stop ends a sentence only before a space or the end, so "a = 3.59"
    // and "1.00 L" stay inside their sentence.
    .map((para) => para.split('\n').map((line) => (line.match(/(?:[^.!?]|[.!?](?=\S))+(?:[.!?]+|$)/g) ?? [])
      .filter((sentence) => {
        const asks = sentence.includes('?')
        const demands = WORK_DEMAND_RE.test(sentence) && ADDRESSED_RE.test(sentence)
        if (asks || demands) { if (sentence.trim()) removed.push(sentence.trim()); return false }
        return true
      })
      .join('')
      .trim()).filter(Boolean).join('\n'))
    .filter(Boolean)
    .join('\n\n')
    .trim()
  return { text: removed.length ? out : text, removed }
}

/**
 * CHEM-079 (2026-10-05, chemistry real-learner run: #20, #78, #81, #3 and
 * more): the reply to "ok" or to a request ("show me step by step") was a
 * lone question about a belief or an attempt the learner never stated this
 * turn — "How did you decide that elements in the same row … should have very
 * similar chemical behavior?", "Can you walk me through how you thought you
 * could calculate …?". Only the question sentences that PRESUPPOSE a learner
 * attempt are removed; any other question, and every teaching sentence, stays.
 */
const PRESUPPOSED_ATTEMPT_RE = /\b(?:how\s+did\s+you\s+(?:decide|get|work|figure|arrive|come\s+up|choose|pick|know|reach)|walk\s+me\s+through\s+(?:how|what|why)\s+you|how\s+you\s+(?:thought|decided|got|worked|figured|arrived|chose)|what\s+(?:made|led)\s+you\s+(?:think|decide|choose|pick|say)|why\s+did\s+you\s+(?:think|decide|choose|pick|say))\b/i

export function dropPresupposedAttemptQuestions(text: string): { text: string; removed: string[] } {
  const removed: string[] = []
  const out = (text ?? '')
    .split(/\n{2,}/)
    .map((para) => para.split('\n').map((line) => (line.match(/(?:[^.!?]|[.!?](?=\S))+(?:[.!?]+|$)/g) ?? [])
      .filter((sentence) => {
        if (sentence.includes('?') && PRESUPPOSED_ATTEMPT_RE.test(sentence)) { removed.push(sentence.trim()); return false }
        return true
      })
      .join('')
      .trim()).filter(Boolean).join('\n'))
    .filter(Boolean)
    .join('\n\n')
    .trim()
  return { text: removed.length ? out : text, removed }
}
