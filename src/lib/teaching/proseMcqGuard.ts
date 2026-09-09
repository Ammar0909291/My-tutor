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
 * P2 FIX — THE INLINE SHAPE, the second half of the prose-MCQ gap.
 *
 * ── THE DEFECT (measured, real-student English session) ────────────────────
 * `OPTION_LINE`/`hasProseMultipleChoice` require each lettered option ON ITS
 * OWN LINE — "deliberately narrow: … matches the live defect exactly", per
 * this module's own header. But the SAME failure — the model asking a
 * multiple-choice question with no `<!--MCQ-->` tag, so there is nothing for
 * `gradeMcqAnswer` to grade against — reproduces just as easily with every
 * option folded into ONE sentence:
 *
 *   "What does the prefix 're‑' add in 'replay'? A) Time: again (repeat)
 *    B) Negation: not play C) Location: under play D) Number: two plays"
 *
 * This is not the "lettered list inline in a sentence" shape this module's
 * header explicitly declines to match (a citation, an item reference) — it is
 * a sequential A, B, C[, D] run with no letter skipped and no letter out of
 * order, which prose essentially never produces by accident. Measured across
 * this codebase's own fixture corpora and the production transcript that
 * motivated this fix: zero false positives from ordinary paragraphs, code
 * comments, or citation-style "(see A) …, B) …" enumerations (those are never
 * a clean, gapless A→B[→C[→D]] alphabetic run).
 *
 * ── SCOPE, KEPT AS NARROW AS THE ORIGINAL RULE ──────────────────────────────
 * Requires the letters to start at A and run with NO gap (A,B — A,B,C — or
 * A,B,C,D; never A,C or B,C,D) and to appear in that exact left-to-right
 * order in the text — the one shape a genuine MCQ always has and an
 * unrelated enumeration essentially never does. 2-4 options, same bound as
 * the line-anchored rule, for the same reason (a 5+ "option" run is not this
 * shape at all).
 */
const INLINE_OPTION_RE = /(?:^|[\s.!?:;])[([]?([A-Za-z])[).\]]\s+\S/g

function hasSequentialInlineOptions(text: string): boolean {
  // A genuine question presents options for something it asked. Requiring a
  // '?' somewhere in the text is what tells apart "A) for background and B)
  // for the proof, as discussed earlier" (a citation-style enumeration, no
  // question anywhere, correctly NOT this shape) from every real prose-MCQ
  // instance measured — all of which ask the question, then list the letters.
  // The line-anchored OPTION_LINE rule above needs no equivalent gate: one
  // option per line is already a far stronger, list-shaped signal on its own.
  if (!text.includes('?')) return false
  const found: string[] = []
  INLINE_OPTION_RE.lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = INLINE_OPTION_RE.exec(text))) {
    const letter = m[1].toUpperCase()
    // Only ever appended when it continues the run — see below — so this
    // stays a strictly ascending, gapless sequence starting at 'A'.
    const expectedNext = found.length === 0 ? 'A' : String.fromCharCode(found[found.length - 1].charCodeAt(0) + 1)
    if (letter === expectedNext) found.push(letter)
    // A letter that does not continue the run (out of order, repeated, or a
    // gap) is simply not part of an option sequence and is ignored — it does
    // NOT reset or invalidate a run already found, since prose can legitimately
    // contain an unrelated "B)" before or after a genuine "A) … B) … C) …" run.
  }
  return found.length >= 2 && found.length <= 4
}

/**
 * True when `text` contains 2-4 DISTINCT lettered options — either each on
 * its own line (the original, line-anchored shape) or run together inline in
 * prose (the P2 extension above) — the shape of a prose multiple-choice
 * question with no machine-readable tag.
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
  if (letters.size >= 2 && letters.size <= 4) return true
  return hasSequentialInlineOptions(text)
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
