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
