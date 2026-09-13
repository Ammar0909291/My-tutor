/**
 * Repetition Guard (P3) — never ask the same thing twice.
 *
 * Root cause of the observed loops: nothing in the runtime remembered which
 * questions had already been asked. `questionsAskedSinceTeach` counts
 * questions but cannot recognise INTENT (conversationState.ts:720 says so
 * explicitly), so the model was free to re-ask a question it had already
 * asked, re-open a question the learner had already answered, and recycle the
 * same stock openers ("What do you notice...") indefinitely — especially
 * after a bare acknowledgement like "got it" or "ready", where the model has
 * nothing new to react to and falls back on its most familiar phrasing.
 *
 * Fix: a persisted ledger of question fingerprints for the session, plus a
 * banned-phrase list for the specific stock formulations that were looping.
 * The ledger is rendered into the prompt as an explicit do-not-repeat
 * contract, and `findRepeatedQuestion` lets the caller detect a violation in
 * the produced text.
 *
 * Pure functions only — no I/O. The caller persists the ledger in
 * contextSnapshot alongside the other per-session teaching state.
 */

/** Cap the ledger so a long session cannot grow the prompt without bound.
 *  Newest entries are the ones a loop would repeat, so we keep the tail. */
export const MAX_LEDGER_ENTRIES = 40

/** How many recent questions are quoted back to the model verbatim. Beyond
 *  this the fingerprints still block repeats server-side; the prompt just
 *  does not list them all. */
export const MAX_QUOTED_QUESTIONS = 8

export interface QuestionLedger {
  /** Normalised fingerprints of every question asked this session. */
  fingerprints: string[]
  /** Verbatim recent questions, newest last — for the prompt's explicit list. */
  recent: string[]
  /**
   * P2 FIX — TEMPLATED-DUPLICATE MCQs, a class the question fingerprint
   * above cannot see.
   *
   * ── THE DEFECT (real-student English verification) ──────────────────────
   * Multiple MCQs served in the same session shared IDENTICAL options text
   * — the actual pedagogical claim being tested — while only the STEM's
   * illustrative example changed:
   *
   *   "You identify a piece of imagery as 'appealing to touch.' Is naming
   *    the sense the complete analytical task?"
   *   "You identify a piece of imagery as 'appealing to smell.' Is naming
   *    the sense the complete analytical task?"
   *   options (BOTH): ["No — you must also explain the specific mood…",
   *                     "Yes — identifying which sense imagery appeals to…"]
   *
   * `fingerprintQuestion` operates on the QUESTION STEM, where the varying
   * illustrative word/example lives — so two such questions get DIFFERENT
   * fingerprints and neither the ledger nor `findRepeatedQuestion` ever
   * flags them, even though they test the exact same point. The OPTIONS,
   * not the stem, carry the claim, so fingerprinting them instead is the
   * signal that generalises: two MCQs with the same (or near-identical)
   * option set are testing the same thing regardless of what dresses the
   * stem, while two MCQs about genuinely different concepts will almost
   * never share option text.
   *
   * Normalised fingerprints of every MCQ option SET served this session —
   * both authored and model-generated, since only the latter can currently
   * template like this (an authored probe is already deduped by stem via
   * `excludeProbeStem`/`hasAskedMcq`).
   */
  optionSetFingerprints: string[]
  /** Verbatim recent option sets, newest last — for the prompt's explicit
   *  list, mirroring `recent` for questions. */
  recentOptionSets: string[][]
}

export function emptyQuestionLedger(): QuestionLedger {
  return { fingerprints: [], recent: [], optionSetFingerprints: [], recentOptionSets: [] }
}

/** Read a persisted ledger defensively; never throws, unknown shape → empty. */
export function readQuestionLedger(raw: unknown): QuestionLedger {
  if (raw && typeof raw === 'object') {
    const l = raw as Partial<QuestionLedger>
    if (Array.isArray(l.fingerprints) && Array.isArray(l.recent)) {
      return {
        fingerprints: l.fingerprints.filter((f): f is string => typeof f === 'string'),
        recent: l.recent.filter((r): r is string => typeof r === 'string'),
        // Additive fields (P2 fix): absent on a snapshot persisted before
        // this fix shipped — default to empty rather than throwing, so an
        // older session resumes exactly as it would have before.
        optionSetFingerprints: Array.isArray(l.optionSetFingerprints)
          ? l.optionSetFingerprints.filter((f): f is string => typeof f === 'string')
          : [],
        recentOptionSets: Array.isArray(l.recentOptionSets)
          ? l.recentOptionSets.filter((o): o is string[] => Array.isArray(o))
          : [],
      }
    }
  }
  return emptyQuestionLedger()
}

/**
 * Fingerprint a question so trivial rewordings still collide.
 *
 * Deliberately aggressive: lowercase, strip punctuation, drop filler and
 * politeness tokens, collapse whitespace, then sort the remaining content
 * words. Word-order insensitivity is what catches "What do you notice about
 * the shape?" vs "About the shape, what do you notice?" — the exact pattern
 * that made the loops feel like new questions to the model and identical to
 * the learner.
 */
const FILLER = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'do', 'does', 'did', 'can', 'could', 'would', 'should', 'will', 'shall',
  'to', 'of', 'in', 'on', 'at', 'for', 'with', 'about', 'and', 'or', 'but',
  'so', 'if', 'then', 'that', 'this', 'these', 'those', 'it', 'its',
  'you', 'your', 'we', 'our', 'us', 'me', 'my', 'i',
  'please', 'lets', 'let', 'now', 'here', 'just', 'ok', 'okay',
  'think', 'tell', 'say', 'know',
])

export function fingerprintQuestion(question: string): string {
  const words = question
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 0 && !FILLER.has(w))
  return Array.from(new Set(words)).sort().join(' ')
}

/**
 * Stock formulations that were observed looping. These are banned as OPENERS
 * of a question, not as substrings anywhere — "notice" is a perfectly good
 * word mid-explanation; "What do you notice..." as a recurring prompt is the
 * defect.
 */
export const BANNED_STOCK_PATTERNS: { label: string; re: RegExp }[] = [
  { label: "Let's take one small step together", re: /\blet'?s\s+take\s+one\s+small\s+step\b/i },
  { label: 'What do you notice', re: /\bwhat\s+do\s+you\s+notice\b/i },
  { label: 'What surprised you', re: /\bwhat\s+(surprised|surprises)\s+you\b/i },
]

/** Every banned stock phrase present in the text. */
export function findBannedStockPhrases(text: string): string[] {
  return BANNED_STOCK_PATTERNS.filter((p) => p.re.test(text)).map((p) => p.label)
}

/**
 * Pull question sentences out of assistant text. Splits on sentence
 * terminators and keeps the ones ending in '?'. Good enough for fingerprinting
 * — this never needs to be a parser, only stable.
 */
export function extractQuestions(text: string): string[] {
  if (!text) return []
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.endsWith('?') && s.length > 1)
}

/** True when this question (or a trivial rewording) was already asked. */
export function isRepeatQuestion(ledger: QuestionLedger, question: string): boolean {
  const fp = fingerprintQuestion(question)
  if (!fp) return false
  return ledger.fingerprints.includes(fp)
}

/** The first question in `text` that repeats something already asked. */
export function findRepeatedQuestion(ledger: QuestionLedger, text: string): string | null {
  for (const q of extractQuestions(text)) {
    if (isRepeatQuestion(ledger, q)) return q
  }
  return null
}

/** Fold this turn's questions into the ledger. Pure; returns a new ledger. */
export function recordQuestions(ledger: QuestionLedger, text: string): QuestionLedger {
  const questions = extractQuestions(text)
  if (questions.length === 0) return ledger
  const fingerprints = [...ledger.fingerprints]
  const recent = [...ledger.recent]
  for (const q of questions) {
    const fp = fingerprintQuestion(q)
    if (!fp || fingerprints.includes(fp)) continue
    fingerprints.push(fp)
    recent.push(q)
  }
  return {
    ...ledger,
    fingerprints: fingerprints.slice(-MAX_LEDGER_ENTRIES),
    recent: recent.slice(-MAX_LEDGER_ENTRIES),
  }
}

/**
 * Fingerprint an MCQ's OPTION SET — the claim being tested, independent of
 * whatever stem/example wraps it. Reuses the exact same word-bag algorithm
 * as `fingerprintQuestion` (lowercase, strip punctuation, drop filler,
 * word-order-insensitive) for the same reason: two option sets that are
 * trivially reworded copies of each other must still collide.
 *
 * Sorted before joining so option ORDER (which authored/generated content
 * may legitimately shuffle) cannot itself defeat the match.
 */
export function fingerprintOptionSet(options: readonly string[]): string {
  if (!Array.isArray(options) || options.length === 0) return ''
  const perOption = options
    .map((o) => fingerprintQuestion(String(o)))
    .filter((f) => f.length > 0)
    .sort()
  return perOption.join(' | ')
}

/** True when this option set (or a trivial rewording/reordering of it) was
 *  already served this session. */
export function isRepeatOptionSet(ledger: QuestionLedger, options: readonly string[]): boolean {
  const fp = fingerprintOptionSet(options)
  if (!fp) return false
  return (ledger.optionSetFingerprints ?? []).includes(fp)
}

/** Fold this turn's SERVED MCQ (if any) into the ledger. Pure; returns a new
 *  ledger. Deliberately takes the OPTIONS array directly (not raw text) —
 *  callers already have the structured MCQ object at the point they know one
 *  was served, so there is no text to re-parse and no ambiguity about which
 *  MCQ this is. */
export function recordMcqOptions(ledger: QuestionLedger, options: readonly string[] | null | undefined): QuestionLedger {
  if (!options || options.length < 2) return ledger
  const fp = fingerprintOptionSet(options)
  if (!fp || (ledger.optionSetFingerprints ?? []).includes(fp)) return ledger
  const optionSetFingerprints = [...(ledger.optionSetFingerprints ?? []), fp]
  const recentOptionSets = [...(ledger.recentOptionSets ?? []), [...options]]
  return {
    ...ledger,
    optionSetFingerprints: optionSetFingerprints.slice(-MAX_LEDGER_ENTRIES),
    recentOptionSets: recentOptionSets.slice(-MAX_LEDGER_ENTRIES),
  }
}

/**
 * The prompt contract. Lists the recent questions verbatim so the model can
 * actually check itself, bans the looping stock phrases by name, and states
 * the forward-only rule plus the confusion recipe (explain → new example →
 * new MCQ) that replaces re-asking.
 *
 * Returns '' when there is nothing to forbid, so a fresh session pays no
 * prompt cost.
 */
export function buildAntiRepetitionBlock(
  ledger: QuestionLedger,
  opts: { learnerAcknowledged?: boolean } = {},
): string {
  const lines: string[] = []
  const quoted = ledger.recent.slice(-MAX_QUOTED_QUESTIONS)

  if (quoted.length > 0) {
    lines.push(
      '\n\nDO NOT REPEAT (mandatory): you have ALREADY asked the following ' +
      'question(s) this session. Do not ask any of them again, and do not ask ' +
      'a reworded version of them. Never return to an earlier question the ' +
      'learner has already moved past:',
    )
    for (const q of quoted) lines.push(`  - "${q}"`)
  }

  // P2 FIX: quote the OPTION SETS already served, not just question stems —
  // see QuestionLedger.optionSetFingerprints's own doc comment for the
  // measured failure (identical options, a different illustrative example in
  // the stem each time). Telling the model the underlying CLAIM already
  // tested, not just the exact sentence, is what a stem-only quote cannot do.
  const quotedOptionSets = (ledger.recentOptionSets ?? []).slice(-MAX_QUOTED_QUESTIONS)
  if (quotedOptionSets.length > 0) {
    lines.push(
      '\n\nDO NOT RE-TEST THE SAME CLAIM WITH A NEW EXAMPLE (mandatory): the ' +
      'following multiple-choice option set(s) have ALREADY been used this ' +
      'session — do not write a new question, on a different example or ' +
      'topic word, that tests the exact same underlying point with the same ' +
      'or near-identical options. Move to a genuinely different aspect of ' +
      'the concept instead:',
    )
    for (const opts of quotedOptionSets) lines.push(`  - [${opts.map((o) => `"${o}"`).join(', ')}]`)
  }

  lines.push(
    (lines.length === 0 ? '\n\nDO NOT REPEAT (mandatory): ' : '- ') +
    'Never reuse these stock formulations: "Let\'s take one small step ' +
    'together...", "What do you notice...", "What surprised you...". They ' +
    'have been overused and now read as a script.',
  )

  if (opts.learnerAcknowledged) {
    lines.push(
      '- The learner\'s last message was an acknowledgement ("got it", ' +
      '"ready", "explain", "move on"). That is a request to MOVE FORWARD: ' +
      'deliver the next piece of teaching. Do NOT respond by re-asking the ' +
      'previous question, restating the previous point, or asking them what ' +
      'they want to do next.',
    )
  }

  lines.push(
    '- If the learner is confused, do NOT re-ask. Explain the idea a ' +
    'different way, give a NEW example, then ask a NEW multiple-choice ' +
    'question about it.',
  )

  return lines.join('\n')
}
