/**
 * Multiple-choice assessment (P2).
 *
 * Every assessment question Tutor Max asks must be multiple choice by
 * default: the learner taps an option instead of typing. This module owns
 * the control tag the LLM emits, its parsing/stripping, and the prompt
 * contract — deliberately mirroring signals.ts (the established pattern for
 * machine-readable turn metadata) rather than inventing a second mechanism.
 *
 * Tag shape (own final line, after any SIGNAL tag):
 *   <!--MCQ q="What is 1/2 + 1/4?" a="1/4" b="3/4" c="2/6" d="1/6" correct="B"-->
 *
 * One attribute per option rather than a delimited list, because option text
 * routinely contains the characters any delimiter would use (pipes in tables,
 * commas, slashes in fractions). Per-option attributes make escaping a
 * non-problem: the only reserved character is the double quote, which the
 * prompt forbids inside option text.
 *
 * 2 to 4 options are accepted — `a` and `b` are required, `c`/`d` optional —
 * so a genuine two-way discrimination (true/false, "which of these two…")
 * does not have to be padded with filler distractors, which the assessment
 * library treats as a distractor-quality failure.
 */

export interface TutorMCQ {
  question: string
  /** 2-4 options, in presentation order. */
  options: string[]
  /** 0-based index into `options`. */
  correctIndex: number
}

const MCQ_RE = /<!--\s*MCQ\s+([\s\S]*?)(?:-->|\/>)/i
// Removal is GLOBAL for the same reason as SIGNAL (R-1/R-3): a non-global
// replace leaves a second complete tag visible to the learner.
const MCQ_RE_G = new RegExp(MCQ_RE.source, 'gi')

/** Remove EVERY complete MCQ tag. Never touches an unterminated fragment. */
export function stripMcqTags(text: string): string {
  return text.replace(MCQ_RE_G, '')
}

const OPTION_KEYS = ['a', 'b', 'c', 'd'] as const

/**
 * Parse and strip the MCQ tag. Never throws; absent or malformed tag → null
 * (the turn degrades to an ordinary typed reply rather than rendering a
 * broken question).
 */
export function parseMcqTag(text: string): { mcq: TutorMCQ | null; cleanText: string } {
  const m = text.match(MCQ_RE)
  const cleanText = stripMcqTags(text).trimEnd()
  if (!m) return { mcq: null, cleanText }

  const attrs = m[1]
  const read = (key: string): string | undefined => {
    const am = attrs.match(new RegExp(`\\b${key}\\s*=\\s*"([^"]*)"`, 'i'))
    const v = am?.[1]?.trim()
    return v ? v : undefined
  }

  const question = read('q')
  const options: string[] = []
  for (const key of OPTION_KEYS) {
    const v = read(key)
    // Options must be contiguous: a stray d="" with no c is malformed, and
    // silently compacting it would shift the correct-answer index.
    if (v === undefined) break
    options.push(v)
  }

  const correctRaw = read('correct')
  if (!question || options.length < 2 || !correctRaw) return { mcq: null, cleanText }

  const correctIndex = OPTION_KEYS.indexOf(
    correctRaw.trim().toLowerCase() as (typeof OPTION_KEYS)[number],
  )
  // Reject an answer key pointing at an option that was not supplied —
  // serving that would mark every response wrong.
  if (correctIndex < 0 || correctIndex >= options.length) return { mcq: null, cleanText }

  // Duplicate options make the item unanswerable (two identical choices, one
  // arbitrarily "correct"). assessment/03: distractors must be discriminable.
  const deduped = new Set(options.map((o) => o.toLowerCase()))
  if (deduped.size !== options.length) return { mcq: null, cleanText }

  return { mcq: { question, options, correctIndex }, cleanText }
}

/**
 * Confidence for an MCQ answer (P2: "confidence estimation should be based
 * primarily on MCQ performance").
 *
 * A tapped option carries no prose, so the LLM's usual behavioural read
 * (hedging, decisiveness — signals.ts) has nothing to work from and would be
 * fabricated. Latency against the learner's own baseline is the one genuine
 * instrument the channel provides (foundations/03 §7), and the D1 grid reads
 * speed × correctness exactly this way:
 *   fast + correct   → high   (fluent retrieval)
 *   slow + correct   → medium (effortful but sound)
 *   fast + wrong     → high   (confident error — the dangerous quadrant, the
 *                              one that must route to misconception repair)
 *   slow + wrong     → low    (guessing / genuinely unsure)
 */
export function mcqConfidence(
  correct: boolean,
  latencyMs: number | null,
  fastThresholdMs = 8000,
): 'high' | 'medium' | 'low' {
  const fast = latencyMs !== null && latencyMs <= fastThresholdMs
  if (correct) return fast ? 'high' : 'medium'
  return fast ? 'high' : 'low'
}

/**
 * System-prompt contract. Assessment questions become MCQ by default; the
 * carve-outs are the cases where forcing options would destroy the
 * pedagogy the engine depends on elsewhere.
 */
export function buildMcqInstruction(): string {
  return (
    '\n\nASSESSMENT FORMAT (mandatory): when you ask the student an ' +
    'ASSESSMENT question — anything you intend to grade, check understanding ' +
    'with, or advance the lesson on — it MUST be multiple choice, and you ' +
    'MUST append EXACTLY ONE tag on its own final line, formatted like: ' +
    '<!--MCQ q="the question" a="first option" b="second option" ' +
    'c="third option" d="fourth option" correct="B"--> ' +
    'Rules: 2-4 options (c and d optional); `correct` is the letter of the ' +
    'right option; never use a double quote inside any attribute value; ' +
    'every distractor must be genuinely plausible and reflect a real way a ' +
    'student goes wrong — never filler, never "none of the above", never a ' +
    'joke option. Write the question ONCE: put it in the tag, and do NOT ' +
    'also re-type the question and its options in your visible message — the ' +
    'app renders them as tappable buttons from the tag. ' +
    'Do NOT emit this tag for: a discovery/observation prompt that opens a ' +
    'concept, a prior-knowledge probe, a recovery turn where the student is ' +
    'stuck or distressed, or a rhetorical question inside an explanation. ' +
    'Those stay open-ended. Never mention this tag to the student.'
  )
}

// ── Deterministic grading ────────────────────────────────────────────────────
//
// WHY THIS EXISTS.
//
// The mastery ladder's only source of correctness was `<!--SIGNAL-->`, which is
// the LLM's self-report about the learner's last message. Measured in
// production, corpus audit, real learner account, on a correct answer the tutor
// itself called "spot-on":
//
//   [ladder] { signalTag: false, correctness: null, phaseBefore: 'OBSERVE',
//              phaseAfter: 'OBSERVE', check: 0, practice: 0 }
//
// The tag was never emitted. The instruction for it is appended to every system
// prompt unconditionally, so this is non-compliance, not a wiring gap — and
// `foundations/03 §7` already records that the SIGNAL is "a substitute for real
// instrumentation, not equivalent to it". Hanging the entire mastery system off
// it means a model that skips one optional-looking tag silently freezes every
// learner's progress, with no error anywhere.
//
// An MCQ is the one assessment form where correctness is NOT a judgement call:
// the tutor already declared the right answer when it wrote the question. So
// when the previous turn asked one, this turn's reply can be graded server-side
// against the stored `correctIndex` — real instrumentation, no model, no cost.
// `mcqConfidence()` above was written for exactly this and had no caller.
//
// CONSERVATIVE BY CONSTRUCTION. An unresolvable reply returns null and the
// existing SIGNAL path is left to handle it. Fabricating an answer the learner
// did not give would put false evidence into their permanent record, which is
// worse than the freeze this repairs.

/**
 * Ordinal words a learner might use instead of a letter.
 *
 * The English NUMBER words (one/two/three/four) are deliberately ABSENT. Their
 * first draft included them and this module's own test caught the consequence
 * immediately: "the third one" contains "one", so it resolved to option 1 — the
 * filler noun in "the Nth one" read as the numeral. That is precisely the class
 * of silent mis-grade this grader exists to avoid, so the ambiguous forms are
 * dropped rather than disambiguated. "Number two" now refuses instead of
 * guessing, which is the correct trade.
 */
const ORDINALS: Record<string, number> = {
  first: 0, '1': 0, '1st': 0,
  second: 1, '2': 1, '2nd': 1,
  third: 2, '3': 2, '3rd': 2,
  fourth: 3, '4': 3, '4th': 3,
}

/** Words that explicitly announce a letter choice, so "a" can be told from the article. */
const LETTER_MARKERS = new Set(['option', 'answer', 'choice', 'pick', 'select', 'letter'])

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim()
const words = (s: string) => norm(s).split(' ').filter((w) => w.length > 2)

/**
 * Resolve a learner's free-text reply to one of the offered options.
 *
 * Returns `null` whenever the answer is ambiguous or unrecognisable — including
 * when two options match equally well, which is the case that would otherwise
 * quietly grade the wrong one.
 */
export function resolveMcqChoice(message: string, mcq: TutorMCQ): number | null {
  const n = norm(message)
  if (!n) return null
  const tokens = n.split(' ')
  const limit = Math.min(mcq.options.length, OPTION_KEYS.length)

  // 1. A bare letter, alone or as "option b" / "b)" — normalisation has already
  //    removed the bracket. Standalone-token matching alone is NOT enough, and
  //    this module's own test caught why: "a dimension is about quantity" — the
  //    shape of a real answer this learner typed — has "a" as a standalone
  //    token and was graded as selecting option A. The English indefinite
  //    article is the one option key that is also an ordinary word, so it needs
  //    an explicit marker; b/c/d are not English words and are safe in the
  //    positions a learner actually puts them ("b) they must be identical").
  for (let i = 0; i < limit; i++) {
    const key = OPTION_KEYS[i]
    const pos = tokens.indexOf(key)
    if (pos === -1) continue
    const marked = pos > 0 && LETTER_MARKERS.has(tokens[pos - 1])
    const alone = tokens.length === 1
    if (key === 'a' ? (marked || alone) : (marked || alone || pos === 0 || pos === tokens.length - 1)) {
      return i
    }
  }

  // 2. An ordinal ("the second one", "number 2"). Bounded by the option count
  //    so "the third one" against a 2-option question resolves to nothing
  //    rather than to a question that was never asked.
  for (const t of tokens) {
    const idx = ORDINALS[t]
    if (idx === undefined) continue
    // Out of range REFUSES rather than falling through to a weaker rule: the
    // learner named a position, and it is not one this question offered.
    // Continuing would let a text-similarity match answer a question they were
    // plainly not answering.
    return idx < mcq.options.length ? idx : null
  }

  // 3. The option's own text, quoted or paraphrased closely enough to contain
  //    it. Ambiguity is fatal: if two options are both contained, neither wins.
  const contained = mcq.options
    .map((o, i) => ({ i, hit: norm(o).length >= 6 && n.includes(norm(o)) }))
    .filter((x) => x.hit)
  if (contained.length === 1) return contained[0].i

  // 4. DISTINCTIVE words only — the words that belong to exactly one option.
  //    Shared vocabulary is what every distractor has in common with the right
  //    answer, so scoring on it would grade the topic rather than the choice.
  const counts = new Map<string, number>()
  for (const o of mcq.options) for (const w of new Set(words(o))) counts.set(w, (counts.get(w) ?? 0) + 1)
  const scores = mcq.options.map((o) => {
    const distinctive = [...new Set(words(o))].filter((w) => counts.get(w) === 1)
    return distinctive.filter((w) => tokens.includes(w)).length
  })
  const best = Math.max(...scores)
  if (best >= 2 && scores.filter((s) => s === best).length === 1) return scores.indexOf(best)

  return null
}

/**
 * Grade a reply against the MCQ the previous turn asked.
 *
 * `correct: null` means "not gradeable here" — never "wrong".
 */
export function gradeMcqAnswer(
  message: string,
  mcq: TutorMCQ,
): { chosenIndex: number | null; correct: boolean | null } {
  const chosenIndex = resolveMcqChoice(message, mcq)
  if (chosenIndex === null) return { chosenIndex: null, correct: null }
  return { chosenIndex, correct: chosenIndex === mcq.correctIndex }
}
