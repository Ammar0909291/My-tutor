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
  /**
   * PHASE F: the authored asset this question came from, when it came from one.
   *
   * OPTIONAL, and absent is the model path's normal state — a question parsed
   * from the model's own `<!--MCQ-->` tag has no authored identity and must
   * never acquire one. Only `probeToMcq` sets it.
   *
   * WHY IT EXISTS. Grading happens on the NEXT turn, a separate request that
   * reads the stored question back from `pendingMcq`. Without a field here the
   * identity died at conversion, so `PROBE_OUTCOME` could not name the asset it
   * was scoring: measured in production, 2,199 outcome rows and zero carrying
   * an assetId, against 2,419 ACTIVE probe assets all sitting at sampleSize 0.
   * No authored probe could ever accumulate evidence, so ADR 13/14's
   * quality/deprecation machinery had nothing to run on and a wrong authored
   * answer key would stay invisible indefinitely.
   *
   * READ BY EVIDENCE ONLY. Nothing in grading, selection, the ladder or
   * arbitration consults it — `gradeMcqAnswer` reads `correctIndex` and nothing
   * else, which is why an authored and an anonymous copy of the same question
   * grade identically.
   */
  assetId?: string
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
 * THE QUESTION AND ITS CHOICES, MADE PART OF DURABLE HISTORY.
 *
 * `parseMcqTag` strips the raw `<!--MCQ-->` tag out of the tutor's text —
 * correctly, since a learner must never see the machine tag — but the
 * question and options it carried were then persisted NOWHERE: only the
 * tag-stripped prose reached `Message.content`, and the parsed `TutorMCQ`
 * object lived solely in that one turn's JSON response. A history reload
 * (refresh, logout/login, reopening the conversation) restored the bare
 * prose with the actual question missing — the exact "second channel that
 * never reaches durable storage" defect class the diagram-persistence fix
 * closed, on a different field.
 *
 * This appends a plain-text rendering of the question and its options onto
 * what gets WRITTEN to `content`, reusing the one existing conversation
 * history mechanism instead of adding a second MCQ-specific persistence
 * path. Callers pass the CLEAN (already tag-stripped) text; the live JSON
 * response to the client is built from that clean text directly and is
 * never passed through this function, so the tappable wizard the learner
 * sees this turn is unaffected — only a LATER reload of `content` ever
 * shows this appended text. The correct answer is deliberately not marked,
 * matching what the live wizard shows before a tap.
 */
export function appendMcqToHistoryText(cleanText: string, mcq: TutorMCQ | null): string {
  if (!mcq) return cleanText
  // DUPLICATION GUARD (observed live, 2026-08-16).
  //
  // This function rests on an assumption that is usually — but not always —
  // true: that stripMcqTags() removed the question from `cleanText`, so
  // appending it here is the only copy in durable history.
  //
  // A real production turn broke it. The model wrote the question and its
  // options inline AS PROSE *and* emitted the <!--MCQ--> tag. Stripping the tag
  // left the prose copy untouched, so this append produced a second one and the
  // stored message read:
  //
  //   "Which of the following is the official SI base unit for mass?
  //    A) Gram  B) Kilogram  C) Pound  D) Newton
  //    Which of the following is the official SI base unit for mass?
  //    A) Gram  B) Kilogram  C) Pound  D) Newton"
  //
  // Invisible live — the API response carries the single prose copy and the
  // client draws its wizard from the `mcq` field — and visible only after a
  // reload, which is exactly when history is all the learner has.
  //
  // Comparing on the question alone is deliberate. If the tutor already asked
  // it in prose, appending the options again adds nothing a reader needs, and
  // matching loosely on the question is far more robust than trying to detect
  // an options block that the model may have lettered, bulleted or inlined.
  if (containsQuestion(cleanText, mcq.question)) return cleanText
  const lines = mcq.options.map((o, i) => `${String.fromCharCode(65 + i)}) ${o}`).join('\n')
  return `${cleanText}\n\n${mcq.question}\n${lines}`
}

/**
 * Whitespace- and case-insensitive containment. The prose copy and the tag copy
 * of one question routinely differ by line wrapping and capitalisation, so an
 * exact match would miss the very case this guard exists for. Punctuation is
 * kept: two questions differing only by a "?" are still the same question, but
 * dropping punctuation entirely risks colliding genuinely different prompts.
 */
function containsQuestion(haystack: string, question: string): boolean {
  const norm = (s: string) => s.replace(/\s+/g, ' ').trim().toLowerCase()
  const q = norm(question)
  if (q.length < 12) return false // too short to match safely
  return norm(haystack).includes(q)
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
export function buildMcqInstruction(opts: { atMasteryGate?: boolean } = {}): string {
  // AT A MASTERY GATE THE TAG IS NOT OPTIONAL.
  //
  // Measured in production, corpus audit Topic 3: at phase GUIDE the tutor
  // asked a good, concrete question in PROSE with no MCQ tag, the learner
  // answered it fully correctly ("the offset stays. averaging only helps with
  // random scatter, not a consistent shift"), the tutor replied "that is spot
  // on" — and the ladder did not move. GUIDE -> GUIDE, check 0, practice 0.
  //
  // Correctness for a free-text answer has no deterministic source: the model
  // does not emit `<!--SIGNAL-->` (measured), and grading prose would be a
  // judgement call. An MCQ is the one form where the tutor has already
  // declared the answer, so the server can grade it. At CHECK and PRACTICE —
  // the phases that REQUIRE evidence to advance — a question without a tag
  // cannot produce any, so the gate can never be crossed.
  //
  // This is a format requirement, not a safety property, which is why a prompt
  // rule is the right lever here where it was the wrong one for the
  // affirmation guard. It does not fabricate evidence and it does not lower
  // the bar; it asks for the question in the form the server can read.
  const gateClause = opts.atMasteryGate
    ? '\n\nMASTERY CHECK DUE THIS TURN: the question you ask now is the one the ' +
      'learner\'s progress depends on, so it MUST carry the MCQ tag. A question ' +
      'asked only in prose cannot be recorded, so the learner cannot advance ' +
      'however well they answer it. Ask exactly one question, and put it in the tag.'
    : ''
  return gateClause + (
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

/**
 * Words that explicitly announce a choice, so "a" can be told from the article
 * and "one" from the pronoun.
 *
 * `number` was missing even though rule 2's own comment names "number 2" as a
 * supported form — it worked only because a DIGIT needs no marker. Once "one"
 * required one (see digitiseNumbers), "number one" started refusing, which is
 * how the gap surfaced.
 */
const LETTER_MARKERS = new Set([
  'option', 'answer', 'choice', 'pick', 'select', 'letter', 'number',
])

/**
 * Superscripts carry the ENTIRE meaning of a dimensional formula, and stripping
 * them made every option identical. Measured: `[M][L][T]`, `[M][L][T]⁻²`,
 * `[M][L]⁻¹[T]²` and `[M]²[L][T]⁻¹` all normalised to "m l t", so the grader
 * saw four identical options and correctly refused to choose — meaning
 * SYMBOLIC questions, the most common form in physics and mathematics, could
 * not be graded at all. Folded to ASCII before stripping, and the minus sign is
 * kept, because `[T]²` and `[T]⁻²` are different answers.
 */
const SUPERSCRIPTS: Record<string, string> = {
  '\u2070': '0', '\u00b9': '1', '\u00b2': '2', '\u00b3': '3', '\u2074': '4',
  '\u2075': '5', '\u2076': '6', '\u2077': '7', '\u2078': '8', '\u2079': '9',
  '\u207b': '-', '\u207a': '+',
}

const foldSuperscripts = (s: string) =>
  s.replace(/[\u2070\u00b9\u00b2\u00b3\u2074-\u2079\u207a\u207b]/g, (c) => SUPERSCRIPTS[c] ?? ' ')


/**
 * NUMBER WORDS AND DIGITS ARE THE SAME ANSWER.
 *
 * ── THE DEFECT, MEASURED IN A REAL PHYSICS LESSON ──────────────────────────
 * phys.mech.torque, turn 4. The tutor asked "…ten newtons at zero point five
 * metres, what is the resulting torque?" and offered:
 *
 *     zero point five newton-metres | five newton-metres |
 *     ten newton-metres            | twenty newton-metres
 *
 * The learner typed "5 newton metres" — the correct answer, in the form a
 * person actually types. It graded as NOTHING: chosenIndex null, correct null,
 * `correctAtCheck` stayed 0, and nine turns later the lesson closed with zero
 * graded evidence and the concept flagged for review.
 *
 * Measured across the same real option set, only two forms ever graded:
 *     "B" / "b"                   -> graded          (a letter)
 *     "five newton-metres"        -> graded          (verbatim option text)
 *     "5 newton metres"           -> NOT GRADED
 *     "5 newton-metres"           -> NOT GRADED
 *     "five"                      -> NOT GRADED
 *     "5"                         -> NOT GRADED
 *
 * Two independent causes, both fixed here:
 *
 *  (a) The options are spelled out in WORDS because the tutor is instructed to
 *      write numbers as words so they can be spoken. Learners type digits. The
 *      two never met, so the most natural correct answer in physics and
 *      mathematics — the number itself — was unreachable.
 *  (b) `norm` preserved hyphens, so "newton-metres" and "newton metres" were
 *      different strings and neither exact nor containment matching could fire.
 *
 * This does NOT lower the bar: it recognises the answer the learner gave, it
 * does not decide it is right. `gradeMcqAnswer` still compares the resolved
 * index against the authored key, and ambiguity still resolves to null.
 */
const NUMBER_WORDS: Record<string, string> = {
  zero: '0', one: '1', two: '2', three: '3', four: '4', five: '5', six: '6',
  seven: '7', eight: '8', nine: '9', ten: '10', eleven: '11', twelve: '12',
  thirteen: '13', fourteen: '14', fifteen: '15', sixteen: '16',
  seventeen: '17', eighteen: '18', nineteen: '19', twenty: '20',
  thirty: '30', forty: '40', fifty: '50', sixty: '60', seventy: '70',
  eighty: '80', ninety: '90', hundred: '100',
}

/**
 * Rewrite number words as digits, joining decimals written as "X point Y".
 * Applied AFTER the character fold so it sees plain lowercase tokens.
 */
function digitiseNumbers(text: string): string {
  const out: string[] = []
  const toks = text.split(' ')
  for (let i = 0; i < toks.length; i++) {
    const d = NUMBER_WORDS[toks[i]]
    if (d === undefined) { out.push(toks[i]); continue }
    // "zero point five" -> "0.5". Only when a number sits on BOTH sides of
    // "point", so the ordinary English word is never eaten.
    const next = toks[i + 1]
    const after = toks[i + 2] !== undefined ? NUMBER_WORDS[toks[i + 2]] : undefined
    if (next === 'point' && after !== undefined) { out.push(`${d}.${after}`); i += 2; continue }
    // ── "one" IS ALSO THE ENGLISH PRONOUN ───────────────────────────────────
    //
    // MEASURED against the real grader, 2026-08-25. Digitising it
    // unconditionally turns "one" into "1", and ORDINALS maps "1" to option A.
    // So EVERY sentence containing the commonest pronoun in English named
    // option A:
    //
    //     "the one"                          -> A
    //     "one more"                         -> A
    //     "I need one more minute"           -> A
    //     "which one is correct?"            -> A
    //     "can you explain the left one?"    -> A      <- a HELP REQUEST
    //     "I think it is the one"            -> A
    //
    // The last two are the dangerous ones: a request for help and a question
    // were both banked as answers. That is false evidence from ordinary
    // English, and it is the same defect class Phase 7P was opened for.
    //
    // "one" counts as a NUMBER only when something explicitly says so —
    // "option one", "number one", "answer one". Bare, it is the pronoun.
    // Fixing it HERE rather than in the ordinal rule fixes the numeric rule
    // (5) in the same stroke, because both read this output; and it stays
    // symmetric, because option text is normalised through the same function.
    //
    // Deliberately narrow: only "one". "two"/"three"/"five" are not English
    // pronouns and a learner typing them means the number.
    if (toks[i] === 'one' && !(i > 0 && LETTER_MARKERS.has(toks[i - 1]))) {
      out.push(toks[i]); continue
    }
    out.push(d)
  }
  return out.join(' ')
}

/** Every distinct number a string mentions, in canonical digit form. */
function numbersIn(text: string): string[] {
  return [...new Set((text.match(/\d+(?:\.\d+)?/g) ?? []).map((v) => String(Number(v))))]
}

const norm = (s: string) =>
  digitiseNumbers(
    foldSuperscripts(s).toLowerCase()
      .replace(/[^a-z0-9.\- ]+/g, ' ')
      // A hyphen JOINING WORDS becomes a space, because "newton-metres" and
      // "newton metres" are the same words and keeping them distinct made both
      // exact and containment matching fail on the measured turn.
      //
      // A hyphen in front of a DIGIT is kept, because it is a minus sign:
      // `foldSuperscripts` turns [T]⁻² into "[T]-2", and spacing that hyphen
      // out would make a negative exponent identical to a positive one. This
      // module's own test caught exactly that — dimensional formulae are the
      // commonest option form in physics, and grading T⁻² as T² would mark a
      // wrong answer right.
      .replace(/-(?!\d)/g, ' ')
      // A dot only survives between digits (a decimal point); sentence
      // punctuation must not glue tokens together.
      .replace(/(?<!\d)\.|\.(?!\d)/g, ' ')
      .replace(/\s+/g, ' ').trim(),
  )
const words = (s: string) => norm(s).split(' ').filter((w) => w.length > 2)

/**
 * Is this reply a question to the TUTOR rather than an answer?
 *
 * Used only to hold back rule 4a, the weakest matching rule. A learner who
 * asks "why is the lowest point fastest?" has named an option without
 * choosing it, and rule 4a is the one rule loose enough to mistake the two.
 * Everything stronger — an explicit label, exact text, an ordinal, full
 * containment — is a positive statement of choice and is NOT gated on this:
 * "C. but why does the string not get longer?" is both an answer and a
 * question, and the answer half is real.
 */
/**
 * Does the learner explicitly present this as their answer?
 *
 * Rule 4a needs this because one distinctive word is genuinely ambiguous
 * between naming an option and merely using its vocabulary. This module's own
 * pinned case proves it: "a dimension is about quantity" uses the word
 * "quantity" while answering nothing, and an earlier session tightened rule 1
 * specifically to stop it being graded. Requiring a first-person answer phrase
 * keeps that refusal intact while admitting "i think it is the lowest point".
 *
 * Whole phrases, never the bare verb: "dimension IS about quantity" must not
 * qualify on "is" alone.
 */
const ANSWER_INTENT = /\b(i think|i guess|i say|i believe|i choose|i pick|i select|answer is|it is|it's|its|maybe it|probably)\b/i
const statesAnAnswer = (s: string): boolean => ANSWER_INTENT.test(s)

/**
 * Has the learner explicitly told us they have NOT chosen?
 *
 * "I don't know", "not sure", "no idea" are statements about the learner's
 * state, not selections. They are handled by the recovery/diagnostic path
 * (`consecutiveDontKnows`, `observeFailures`), which advances the ladder on
 * its own — so refusing to grade here does NOT re-create the OBSERVE deadlock,
 * it routes the turn to the machinery that exists for exactly this.
 *
 * Blocks EVERY rule, including the explicit label. "I don't know, maybe C."
 * loses a turn, and that is the trade: a hedge banked as an answer is
 * permanent evidence the learner never committed to.
 */
const NON_COMMITTAL =
  /\b(i\s+(really\s+|still\s+|just\s+)?(don'?t|do\s+not)\s+know|not\s+sure|no\s+idea|unsure|can'?t\s+decide|cannot\s+decide)\b/i

/**
 * Words that cannot begin a noun phrase — so an "a" in front of one is the
 * OPTION LETTER, not the English article.
 *
 * This is what lets rule 1 read "I think A because it starts there" as a
 * choice while still refusing "a dimension is about quantity" and "I think a
 * lens bends light", which is the refusal an earlier session pinned with a
 * test. An article must be followed by a noun phrase; "because", "but", "is"
 * and the pronouns cannot start one.
 *
 * `undefined` (the letter ends the sentence) counts: English does not end a
 * sentence on a bare article either.
 */
const CANNOT_FOLLOW_AN_ARTICLE = new Set([
  'because', 'but', 'and', 'so', 'since', 'then', 'sir', 'maam', 'madam',
  'is', 'was', 'are', 'were', 'or', 'if', 'when', 'while', 'though', 'although',
  'i', 'we', 'you', 'he', 'she', 'it', 'they', 'that', 'this', 'these', 'those',
  'please', 'thanks', 'thank', 'ok', 'okay', 'yes', 'no', 'not', 'my', 'your',
])
const cannotFollowAnArticle = (next: string | undefined): boolean =>
  next === undefined || CANNOT_FOLLOW_AN_ARTICLE.has(next)

const looksLikeAQuestion = (s: string): boolean =>
  /\?\s*$/.test(s.trim()) || /^\s*(why|how|what|when|where|which|who|is|are|does|do|can|could|should)\b/i.test(s)

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

  // An explicit "I have not chosen" outranks every rule below, including the
  // punctuated label. See NON_COMMITTAL for why refusing does not stall the
  // ladder.
  if (NON_COMMITTAL.test(message)) return null

  // 0a. A LABELLED LETTER, ANYWHERE IN THE SENTENCE.
  //
  // MEASURED IN PRODUCTION (2026-08-25, phys.opt.lenses, real learner account).
  // The learner replied "ok i think A. but sir i still not understand lens.
  // can you show picture please" — a valid choice AND a question in one
  // breath, which is how a learner with weak English actually writes. It was
  // NOT GRADED at all: rule 1 below reaches "a" at token 3, and because "a" is
  // also the English indefinite article it demands an explicit marker word,
  // which "think" is not. The answer was discarded, `signalCorrect` stayed
  // undefined, and OBSERVE -> DEMONSTRATE (which needs a graded correct
  // answer) could not fire. Across four lessons and sixteen turns the ladder
  // never left OBSERVE.
  //
  // The discriminator is PUNCTUATION, not vocabulary, and it is destroyed by
  // `norm` before rule 1 ever runs — so this reads the RAW message. A learner
  // labelling a choice writes "A." / "A)" / "A," / "A:" / "A -". The English
  // article never carries punctuation: "a lens bends light" has no delimiter
  // after "a", so the sentence that motivated rule 1's caution
  // ("a dimension is about quantity") still resolves to nothing.
  //
  // Deliberately placed BEFORE the exact-text rule but AFTER nothing: an
  // explicit label is the strongest statement of intent a learner can make,
  // and ambiguity is still fatal — two different labelled letters select
  // neither, because we cannot tell which one they meant.
  {
    const labelled = new Set<number>()
    const named = new Set<number>()
    for (const m of message.matchAll(/(?:^|[\s(])([a-dA-D])(\s*[.)\],:;-])?(?=\s|$)/g)) {
      const idx = OPTION_KEYS.indexOf(m[1].toLowerCase() as typeof OPTION_KEYS[number])
      if (idx < 0 || idx >= limit) continue
      named.add(idx)
      if (m[2]) labelled.add(idx)
    }
    // "A or B, i am not sure" labels only B (the comma) but NAMES both. A
    // learner weighing two options has chosen neither, so the label is not
    // decisive unless it is the only option letter in the sentence.
    if (labelled.size === 1 && named.size === 1) return [...labelled][0]
    if (labelled.size > 1) return null
  }

  // 0. EXACT MATCH — the strongest signal, and the one the UI actually
  //    produces: tapping an option sends that option's text verbatim
  //    (LessonScreen sends `option`, not a letter).
  //
  //    This rule exists because the first draft did NOT have it and a test
  //    caught what that cost: `[M][L][T]⁻²` normalises to "m l t", which is
  //    below the containment rule's length floor and whose every token is too
  //    short for the distinctive-word rule. So SYMBOLIC options — the most
  //    common form in physics and mathematics — could not be graded at all,
  //    and the entire evidence pipeline would have stayed frozen for exactly
  //    the subjects being audited.
  //
  //    Ambiguity is still fatal: two options that normalise identically select
  //    neither.
  const exact = mcq.options.map((o, i) => ({ i, hit: norm(o) === n })).filter((x) => x.hit)
  if (exact.length === 1) return exact[0].i
  if (exact.length > 1) return null

  // ── PRECONDITIONS FOR EVERY WEAKER RULE ────────────────────────────────
  //
  // Rules 0a and 0 above are POSITIVE STATEMENTS OF CHOICE: an explicitly
  // punctuated label, or text identical to an option (which is what tapping
  // the option sends). Everything below infers a choice from a sentence, and
  // inference needs to know when the sentence is not a choice at all.
  //
  // MEASURED, all three against the real grader:
  //   "A or B"                  -> B    two options named; the learner is
  //                                     weighing, not choosing
  //   "B? Can you explain?"     -> B    a question, banked as an answer
  //   "I dont know but maybe B" -> B    explicit non-commitment, banked
  //
  // One check, applied once, ahead of every inferring rule — rather than
  // repeating three guards inside each of rules 1-5, which is how rule 4a
  // ended up with its own copy of the question guard.
  const namedStandalone = new Set<number>()
  for (let i = 0; i < limit; i++) if (tokens.includes(OPTION_KEYS[i])) namedStandalone.add(i)
  if (namedStandalone.size > 1) return null
  if (looksLikeAQuestion(message)) return null

  // 1. A bare letter, alone or as "option b" / "b)" — normalisation has already
  //    removed the bracket. Standalone-token matching alone is NOT enough, and
  //    this module's own test caught why: "a dimension is about quantity" — the
  //    shape of a real answer this learner typed — has "a" as a standalone
  //    token and was graded as selecting option A. The English indefinite
  //    article is the one option key that is also an ordinary word, so it needs
  //    an explicit marker; b/c/d are not English words and are safe in the
  //    positions a learner actually puts them ("b) they must be identical").
  //
  //    THE LETTER INSIDE A SENTENCE (added 2026-08-25, measured). Requiring an
  //    edge position or an immediately-preceding marker refused every learner
  //    who wrote a sentence around their choice:
  //
  //      "I think A"                              -> not graded
  //      "answer is A"          ("is" sits between the marker and the letter)
  //      "ok I think A"                           -> not graded
  //      "I think C because it has more energy"   -> not graded
  //      "sir I think C because..."               -> not graded
  //
  //    Five of them, and every one is a learner answering. `statesAnAnswer`
  //    is the same first-person phrase test rule 4a already uses — no new
  //    detector. For "a" alone that is not enough, because "I think a lens
  //    bends light" also states an answer: the letter must additionally be
  //    followed by a word that cannot follow an article.
  for (let i = 0; i < limit; i++) {
    const key = OPTION_KEYS[i]
    const pos = tokens.indexOf(key)
    if (pos === -1) continue
    const marked = pos > 0 && LETTER_MARKERS.has(tokens[pos - 1])
    const alone = tokens.length === 1
    const atEdge = pos === 0 || pos === tokens.length - 1
    const insideAStatedAnswer = statesAnAnswer(message)
      && (key !== 'a' || cannotFollowAnArticle(tokens[pos + 1]))
    if (key === 'a'
      ? (marked || alone || insideAStatedAnswer)
      : (marked || alone || atEdge || insideAStatedAnswer)) {
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

  // 4a. ONE distinctive word, when nothing at all competes with it.
  //
  // MEASURED IN PRODUCTION (2026-08-25, phys.wave.shm). Options were
  // "At the highest point on the left" / "...on the right" / "At the LOWEST
  // point in the MIDDLE" / "It moves at a constant speed". The learner wrote
  // "i think it is the lowest point sir" — unambiguously the third option, to
  // any human. It scored 1 ("lowest"; they did not say "middle"), the
  // threshold above is 2, and the answer was thrown away.
  //
  // Two learners are hurt by a threshold of 2 and neither is careless: the one
  // who paraphrases instead of quoting, and the one whose English is short.
  // Both are exactly this product's audience.
  //
  // Narrowed three ways, because a false grade writes PERMANENT evidence the
  // learner never produced (the defect class Phase 7P was opened for):
  //   - the word must be SUBSTANTIAL (>= 4 chars), so "the"/"one"/"in" cannot
  //     carry a grade on their own;
  //   - every other option must score ZERO, not merely less — one distinctive
  //     word is only decisive when nothing competes;
  //   - the message must not be a QUESTION. "why is the lowest point
  //     fastest?" names an option while answering nothing, and grading it
  //     would bank a wrong answer against a learner who was asking for help.
  // The question guard that used to sit here is now a precondition above, so
  // it protects rules 1-5 rather than only this one.
  if (best === 1 && scores.filter((s) => s > 0).length === 1 && statesAnAnswer(message)) {
    const winner = scores.indexOf(best)
    const distinctive = [...new Set(words(mcq.options[winner]))]
      .filter((w) => counts.get(w) === 1 && w.length >= 4)
    if (distinctive.some((w) => tokens.includes(w))) return winner
  }

  // 5. THE NUMBER ITSELF. In physics and mathematics the natural answer to
  //    "what is the resulting torque?" is "5" — no unit, no sentence, no
  //    letter. Every rule above needs either the option's words or its letter,
  //    so the bare value graded as nothing.
  //
  //    Deliberately the LAST rule and deliberately narrow: it fires only when
  //    the learner named exactly ONE number and exactly ONE option carries it.
  //    A worked-out reply ("5, because 10 times 0.5") names three numbers and
  //    is refused rather than guessed at — refusing costs a turn, guessing
  //    grades the wrong option.
  const said = numbersIn(n)
  if (said.length === 1) {
    const carrying = mcq.options
      .map((o, i) => ({ i, hit: numbersIn(norm(o)).includes(said[0]) }))
      .filter((x) => x.hit)
    if (carrying.length === 1) return carrying[0].i
  }

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
