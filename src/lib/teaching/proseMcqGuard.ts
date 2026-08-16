/**
 * PROSE-ONLY MCQ EVIDENCE GUARD — the deterministic answer to a live defect
 * observed on a real account on 2026-08-16.
 *
 * ── THE DEFECT THIS EXISTS FOR ─────────────────────────────────────────────
 * The tutor asked a multiple-choice question INLINE, as prose, with no
 * `<!--MCQ-->` tag:
 *
 *   "What does `s` most commonly represent in physics equations?
 *    A) Speed   B) Second (time)   C) Surface area   D) Size"
 *
 * The learner typed "C". The tutor replied "That is right!" and advanced.
 * Correct answer was B. There is no code path that DETERMINISTICALLY grades a
 * prose-only MCQ — `parseMcqTag()` returns null, so `pendingMcqHoisted` is
 * never populated, and `gradeMcqAnswer()` never runs. The ladder's only
 * source of correctness for this turn is the LLM's own `<!--SIGNAL-->` tag,
 * which is the LLM's self-report about whether the learner got it right.
 * A model that hallucinates `correctness="true"` for a wrong answer to a
 * question it also asked writes false evidence into the learner's permanent
 * record.
 *
 * mcq.ts's `buildMcqInstruction()` already tells the model to always emit the
 * tag for assessments. That is a prompt lever and the model is under no
 * obligation. This guard is the deterministic backstop.
 *
 * ── HOW IT WORKS ───────────────────────────────────────────────────────────
 * Given the PRIOR assistant message (after the SIGNAL/MCQ/ATTEMPT tags have
 * been stripped, i.e. exactly what the learner saw), decide whether it asked
 * a multiple-choice question in prose only. If it did, and no `pendingMcq`
 * was persisted (i.e. no tag was there), then the current turn's answer is
 * UNGRADEABLE — the caller must not accept an LLM-supplied `correctness`
 * from `<!--SIGNAL-->` for this turn, because there is no ground truth to
 * compare against.
 *
 * Detection rule, deliberately narrow: 2 to 4 DISTINCT lettered options (A–D)
 * each on their own line, opened by `A)`/`A.`/`(A)` (case-insensitive). A
 * lettered list inline in a sentence is not detected, and neither is a
 * numbered ("1.") list — those are not the shape the model has been observed
 * to produce for prose MCQs. If callers want to broaden the shape they can,
 * but the narrower rule matches the live defect exactly and cannot fire on a
 * paragraph of prose.
 *
 * Conservative BY CONSTRUCTION. A false positive costs one turn of
 * suppressed correctness; a false negative writes false evidence into a
 * permanent record.
 */

// Anchored to the start of a line. Accepts `A)`, `A.`, `A]`, `(A)` and the
// same with lowercase letters. A-Z (not A-D) is deliberate: matching only A-D
// would silently accept a five-option list "A/B/C/D/E" as a four-option MCQ,
// which is not an MCQ shape at all. The 2-4 bound is enforced on the count.
const OPTION_LINE = /^\s*[([]?([A-Za-z])[).\]]\s+\S.*$/

/**
 * True when `text` contains 2-4 DISTINCT lettered options each on their own
 * line — the shape of a prose multiple-choice question.
 *
 * Distinctness matters: `A) foo\nA) bar` should not count as two options
 * (a real prose MCQ never repeats a letter), and a paragraph that
 * accidentally begins two consecutive lines with `A)` should not qualify.
 */
export function hasProseMultipleChoice(text: string): boolean {
  if (typeof text !== 'string' || text.length === 0) return false
  const letters = new Set<string>()
  for (const line of text.split('\n')) {
    const m = OPTION_LINE.exec(line)
    if (!m) continue
    letters.add(m[1].toUpperCase())
  }
  return letters.size >= 2 && letters.size <= 4
}

/**
 * A one-line prompt directive that the model can read when the PREVIOUS turn
 * asked a prose-only MCQ. The suppression above prevents false evidence from
 * being written; this reduces the harm the LEARNER SEES by asking the model
 * not to declare correctness on this turn.
 *
 * Additive to the main prompt; empty string when not needed, so it costs
 * nothing on the ordinary path.
 */
export function buildProseMcqReplyDirective(active: boolean): string {
  if (!active) return ''
  return (
    '\n\nYOU CANNOT VERIFY THIS ANSWER. Your previous turn asked the learner a ' +
    'multiple-choice question in prose, without the machine-readable MCQ tag, ' +
    'so the server has no way to grade the reply — and neither do you, from ' +
    'memory alone. Do NOT tell the learner they are right or wrong on this ' +
    "turn. Instead, restate the same question and its options and put them in " +
    'the MCQ tag exactly as the ASSESSMENT FORMAT rule above requires, so the ' +
    "server can grade the next reply. Do not skip forward as if the answer had " +
    'been verified.'
  )
}
