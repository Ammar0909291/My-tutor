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

import { createHash } from 'node:crypto'
import { isClaimChallenge } from './claimChallengeGuard'

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

/**
 * Typed Turn Contract, I2 (render receipt) — Batch 1, shadow-only.
 *
 * A DETERMINISTIC content hash, not a random token: two independent
 * computations of the same served question (`resolvedQuestionServed` and
 * `resolvedQuestionServedFinal` in route.ts are separate objects, not the
 * same reference) must derive the identical id without any handoff between
 * them, and the SAME question carried forward across a turn boundary — read
 * back from `pendingMcq` next turn — must derive the identical id again with
 * no new stored field. A random id per serve cannot satisfy either
 * constraint; a pure hash of the question's own content does, for free.
 *
 * Never a secret: it never encodes `correctIndex`, so handing it to the
 * client (see `mcqForClient`) leaks nothing a learner could use to guess the
 * answer. It is a receipt of WHICH question was shown, not of the key.
 */
export function deriveRenderId(mcq: TutorMCQ): string {
  const basis = `${mcq.assetId ?? ''}::${mcq.question}::${JSON.stringify(mcq.options)}`
  return createHash('sha256').update(basis).digest('hex').slice(0, 16)
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
 * FALLBACK: A RAW JSON-SHAPED "MCQ TAG" MUST NEVER REACH THE LEARNER.
 *
 * ── MEASURED (real-student session, 2026-09, live production account,
 *    provider=groq) ──────────────────────────────────────────────────────
 * The prompt contract requires the `<!--MCQ q="..." a="..." correct="A"-->`
 * shape `MCQ_RE` above matches. Twice in one session, the model instead
 * wrote a raw JSON object, structurally sound but in the WRONG shape, and
 * — because it does not match `MCQ_RE` at all — it was never stripped and
 * reached the learner as literal visible text:
 *
 *   {"tag":"MCQ","question":"Which of the following sentences is a
 *   **second conditional**?","options":{"a":"If it rains tomorrow, I will
 *   stay at home.","b":"If I were a bird, I would fly.", ...},"correct":"b"}
 *
 * `salvageToolUseFailure`/`unwrapToolCallEnvelope` (groq.ts) already
 * document this same provider drifting into JSON/tool-call shapes under a
 * DIFFERENT trigger (a rejected tool-call error). This is the sibling case:
 * a SUCCESSFUL response whose content itself is JSON-shaped.
 *
 * ── WHAT THIS DOES, AND WHAT IT NEVER DOES ──────────────────────────────
 * Finds a `{"tag":"MCQ"...}` (or `"tag":"mcq"`, case-insensitive) object
 * via balanced-brace scanning (quote-aware, so a brace inside option text
 * cannot terminate the match early), and ALWAYS removes the matched raw
 * text from what the learner sees — whether or not it parses into a valid
 * question. A structurally sound payload (a question, >= 2 non-empty
 * options, a correct key that resolves to one of them) is promoted to a
 * real, gradeable `TutorMCQ`, identical in shape and grading path to the
 * primary tag — no second grading mechanism. A malformed one (missing
 * fields, an unresolvable correct key, options that are empty or bare
 * letters) is discarded — `mcq: null` — and the turn degrades to whatever
 * teaching text surrounds it, never to a broken widget and never to raw
 * JSON on screen.
 */
function findJsonMcqSpan(text: string): { start: number; end: number } | null {
  const tagMatch = text.match(/\{\s*"tag"\s*:\s*"mcq"/i)
  if (!tagMatch || tagMatch.index === undefined) return null
  const start = tagMatch.index
  let depth = 0
  let inString = false
  let escaped = false
  for (let i = start; i < text.length; i++) {
    const ch = text[i]
    if (inString) {
      if (escaped) escaped = false
      else if (ch === '\\') escaped = true
      else if (ch === '"') inString = false
      continue
    }
    if (ch === '"') { inString = true; continue }
    if (ch === '{') depth++
    else if (ch === '}') {
      depth--
      if (depth === 0) return { start, end: i + 1 }
    }
  }
  return null // unterminated — do not guess where it ends
}

/** A raw option value that is only the letter itself is not real option text. */
const isUsableOptionText = (v: unknown): v is string =>
  typeof v === 'string' && v.trim().length > 0 && !/^[a-dA-D][).]?$/.test(v.trim())

function parseJsonMcqFallback(text: string): { mcq: TutorMCQ | null; cleanText: string } {
  const span = findJsonMcqSpan(text)
  if (!span) return { mcq: null, cleanText: text }

  // The raw span is removed from what the learner sees UNCONDITIONALLY,
  // before even attempting to parse it — a payload broken enough to fail
  // JSON.parse must still never render as literal text.
  const cleanText = (text.slice(0, span.start) + text.slice(span.end)).replace(/\s{2,}/g, ' ').trim()

  let parsed: unknown
  try {
    parsed = JSON.parse(text.slice(span.start, span.end))
  } catch {
    return { mcq: null, cleanText }
  }
  if (!parsed || typeof parsed !== 'object') return { mcq: null, cleanText }
  const obj = parsed as Record<string, unknown>

  const question = typeof obj.question === 'string' ? obj.question.trim() : ''
  if (!question) return { mcq: null, cleanText }

  // `options` has been observed as an object keyed a/b/c/d; an array is
  // accepted defensively in case the model ever emits that shape instead.
  const rawOptions = obj.options
  const options: string[] = []
  if (rawOptions && typeof rawOptions === 'object' && !Array.isArray(rawOptions)) {
    const o = rawOptions as Record<string, unknown>
    for (const key of OPTION_KEYS) {
      const v = o[key]
      if (v === undefined) break // contiguous, same rule as the primary parser
      if (!isUsableOptionText(v)) return { mcq: null, cleanText }
      options.push(v.trim())
    }
  } else if (Array.isArray(rawOptions)) {
    for (const v of rawOptions) {
      if (!isUsableOptionText(v)) return { mcq: null, cleanText }
      options.push(v.trim())
    }
  }
  if (options.length < 2) return { mcq: null, cleanText }

  const correctRaw = typeof obj.correct === 'string' ? obj.correct.trim().toLowerCase() : ''
  const correctIndex = OPTION_KEYS.indexOf(correctRaw as (typeof OPTION_KEYS)[number])
  if (correctIndex < 0 || correctIndex >= options.length) return { mcq: null, cleanText }

  const deduped = new Set(options.map((o) => o.toLowerCase()))
  if (deduped.size !== options.length) return { mcq: null, cleanText }

  return { mcq: { question, options, correctIndex }, cleanText }
}

/**
 * Parse and strip the MCQ tag. Never throws; absent or malformed tag → null
 * (the turn degrades to an ordinary typed reply rather than rendering a
 * broken question).
 */
export function parseMcqTag(text: string): { mcq: TutorMCQ | null; cleanText: string } {
  if (typeof text !== 'string') return { mcq: null, cleanText: '' }
  const m = text.match(MCQ_RE)
  const cleanText = stripMcqTags(text).trimEnd()
  if (!m) {
    try {
      const fallback = parseJsonMcqFallback(cleanText)
      if (fallback.mcq || fallback.cleanText !== cleanText) {
        return { mcq: fallback.mcq, cleanText: fallback.cleanText.trimEnd() }
      }
    } catch {
      // A repair must never break a turn — fall through to the ordinary
      // "no tag found" result below.
    }
    return { mcq: null, cleanText }
  }

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
    // MEASURED (real-student session, 2026-09): a syntactically well-formed
    // tag whose option attributes were degenerate placeholders — `a="A"
    // b="B" c="C" d="D"` — while the real option text was written separately
    // as prose in the message body. The learner-visible widget showed four
    // buttons reading "A", "B", "C", "D" with no actual choice text. This is
    // not a real option any more than a bare `<!--MCQ-->` with no `q` is a
    // real question — discard the whole tag (same as any other malformed
    // shape) rather than serve an unusable widget; the prose the model
    // wrote alongside it remains the learner-readable fallback.
    if (!isUsableOptionText(v)) return { mcq: null, cleanText }
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
 * IS THIS ITEM'S ANSWER KEY ONE THE SYSTEM AUTHORED?
 *
 * `assetId` is already the exact discriminator and this module says so:
 * `gateAssessment.probeToMcq` is "the ONLY writer of TutorMCQ.assetId — a
 * model-parsed tag has no asset and must stay anonymous", and
 * `writePendingQuestion` persists it "conditionally so a model-generated
 * question stores exactly the shape it always did — the row stays anonymous,
 * which is the contract". `findBestProbe` reads it straight off the
 * AssetIdentity row, so an authored probe always has one.
 *
 * Until now nothing in grading consulted it — this module's own note on the
 * field says "an authored and an anonymous copy of the same question grade
 * identically". That is the property this predicate exists to end, for
 * CERTIFICATION only. See the call site in route.ts for the measured failure.
 */
export function probeKeyIsAuthored(mcq: TutorMCQ | null | undefined): boolean {
  return typeof mcq?.assetId === 'string' && mcq.assetId.trim() !== ''
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
 * THE SAME QUESTION, ON SCREEN, TWICE.
 *
 * `appendMcqToHistoryText` above closed this defect for DURABLE HISTORY and
 * its comment says of the live turn: "Invisible live — the API response
 * carries the single prose copy and the client draws its wizard from the
 * `mcq` field."
 *
 * That is exactly wrong about what the learner sees. `LessonScreen` renders
 * the message body AND, underneath it, a tappable widget built from
 * `activeMcq.question` + `activeMcq.options`. When the model writes the
 * question inline as prose *and* emits the tag — the behaviour that forced
 * the history guard into existence in the first place, measured live
 * 2026-08-16 — `stripMcqTags` removes only the machine tag, so the prose copy
 * survives into the body and the learner reads the question, then reads it
 * again with buttons under it.
 *
 * The widget is the copy that must survive: it is the only gradeable one.
 * `pendingMcq`/`gradeMcqAnswer` key off the parsed tag, and a learner who
 * answers the prose copy by typing produces evidence nothing can grade
 * (`proseMcqGuard`'s whole subject). So the PROSE copy is what goes.
 *
 * WHAT IS REMOVED, and nothing else: the sentence carrying the question, and
 * a lettered options block immediately following it. The teaching above it is
 * untouched — the same clause-level restraint `stripCompletionClaims` and the
 * D3 fix both settled on, for the same reason: deleting a good explanation to
 * remove a duplicated line is a second harm on top of the first.
 *
 * FAILS SAFE. If the question is not present in the prose, if it is too short
 * to match without risking a collision, or if removing it would leave nothing
 * worth showing, the text is returned UNCHANGED. A duplicated question is a
 * blemish; a blank turn is a broken lesson.
 */
export function dropDuplicatedMcqProse(cleanText: string, mcq: TutorMCQ | null): string {
  if (!mcq || typeof cleanText !== 'string') return cleanText

  const norm = (v: string) => v.replace(/\s+/g, ' ').trim().toLowerCase()
  const target = norm(mcq.question)
  // Fold anything a model varies freely between two renderings of ONE option:
  // dash species (– vs — vs -), quote species, and spacing. Measured need —
  // the widget carried "20 N — static friction…" and the prose "20 N – static
  // friction…", identical but for the dash.
  const key = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
  const servedKeys = mcq.options.map(key).filter((k) => k.length >= 2)

  /** True when this line is a lettered option carrying one of the SERVED choices. */
  const isServedOptionLine = (line: string): boolean => {
    if (!OPTION_LINE_RE.test(line)) return false
    const k = key(line.replace(OPTION_LINE_RE, '').trim() || line)
    if (k.length < 2) return false
    return servedKeys.some((sk) => k.includes(sk) || sk.includes(k))
  }

  const lines = cleanText.split('\n')

  // ── THE OPTIONS ARE THE RELIABLE SIGNAL, NOT THE QUESTION ─────────────────
  //
  // The first version of this keyed entirely on the question text being
  // literally present, and a live run on 2026-09-01 walked straight past two
  // real duplications because the model PARAPHRASED its own stem between the
  // prose copy and the tag:
  //
  //   prose : "Which of the following best explains the friction force on the
  //            10 kg box when a 20 N horizontal push is applied and the box
  //            stays still?"  + A) B) C) D)
  //   widget: "What is the friction force on the 10 kg box when a 20 N
  //            horizontal push is applied and it does not move?"  + the SAME
  //            four options, word for word
  //
  // The learner read the question and all four choices twice. The stems differ
  // and the OPTIONS do not, which is the whole point: a model rewrites its
  // question freely and reproduces its answer choices exactly, because
  // changing an option would change the item. So the options carry the match.
  //
  // TWO is the threshold, not one: a single line beginning "A) …" is a
  // coincidence a paragraph can produce, two consecutive ones matching served
  // choices is a rendered options block.
  const servedLineIdx = lines.map((l, i) => (isServedOptionLine(l) ? i : -1)).filter((i) => i >= 0)
  const optionsBlockPresent = servedLineIdx.length >= 2

  // Nothing to do: neither the stem nor its choices were written out.
  if (!optionsBlockPresent && !containsQuestion(cleanText, mcq.question)) return cleanText

  const drop = new Set<number>()
  // The lead-in line is TRIMMED, never dropped whole: a line routinely carries
  // teaching and then the stem ("…which surprises people. Which of the
  // following is the SI base unit for mass?"), and dropping the line takes the
  // teaching with it. Caught by an existing case in this module's own test —
  // the clause-level restraint had to be re-applied here too.
  let leadInIdx = -1
  if (optionsBlockPresent) {
    const first = servedLineIdx[0]
    const last = servedLineIdx[servedLineIdx.length - 1]
    // The whole run, including the blank lines and any stray unmatched option
    // line inside it (a distractor the model reworded).
    for (let i = first; i <= last; i += 1) drop.add(i)
    // Walk back over blanks to the lead-in question that introduced the block
    // — "Which of the following…?" is not teaching once its choices are gone.
    for (let i = first - 1; i >= 0; i -= 1) {
      const t = lines[i].trim()
      if (t === '') { drop.add(i); continue }
      if (/\?\s*$/.test(t)) leadInIdx = i
      break
    }
  }

  /** Remove only the TRAILING question sentences of the block's lead-in line. */
  const trimTrailingQuestions = (line: string): string => {
    // Trim FIRST. The model ends these lines with a trailing space, and the
    // sentence split then yields an empty final element which stops the pop
    // loop dead — measured: the stem survived intact with the fix "applied".
    const sentences = line.trim().split(/(?<=[.!?])\s+/).filter((x) => x.trim() !== '')
    while (sentences.length > 0 && /\?\s*$/.test(sentences[sentences.length - 1].trim())) {
      sentences.pop()
    }
    return sentences.join(' ').trim()
  }

  const keep: string[] = []
  // Once the question line is found, the lettered options that follow it
  // belong to it. A blank line does NOT end the block — the model routinely
  // puts one between the stem and the choices.
  let inOptionsRun = false

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]
    if (drop.has(i)) { inOptionsRun = false; continue }
    if (i === leadInIdx) {
      inOptionsRun = false
      const trimmed = trimTrailingQuestions(line)
      if (trimmed) keep.push(trimmed)
      continue
    }
    if (inOptionsRun) {
      if (line.trim() === '') continue
      if (OPTION_LINE_RE.test(line)) continue
      inOptionsRun = false
    }
    // Within a line, drop only the sentence that IS the question; a stem
    // written as "... . Which of these is heavier?" keeps its first half.
    const sentences = line.split(/(?<=[.!?])\s+/)
    const survivors = target.length >= 12
      ? sentences.filter((sn) => !norm(sn).includes(target))
      : sentences
    if (survivors.length === sentences.length) { keep.push(line); continue }
    inOptionsRun = true
    const rebuilt = survivors.join(' ').trim()
    if (rebuilt) keep.push(rebuilt)
  }

  // A HEADING THAT INTRODUCED THE REMOVED QUESTION IS NOW DEBRIS.
  //
  // MEASURED live (phys.wave.damped-oscillations, 2026-09-01, real account,
  // studied as a learner) on the deploy that shipped the withhold: the model
  // wrote "**Quick check**" and then its question, the question was removed,
  // and the learner's turn ENDED on a bold "**Quick check**" with nothing
  // under it. Exactly the debris case `stripCompletionClaims` already handles
  // for a bullet reduced to its own label — same rule, applied here.
  //
  // Only a TRAILING label goes, and only one: a heading in the middle of a
  // turn still introduces whatever follows it.
  while (keep.length > 0) {
    const last = keep[keep.length - 1].trim()
    if (last === '') { keep.pop(); continue }
    const isBareLabel =
      /^#{1,6}\s+[^.!?]{0,40}$/.test(last) ||
      /^\*\*[^*]{0,40}\*\*:?$/.test(last) ||
      // The rule that separated the removed section from the one above it.
      /^(?:---|\*\*\*|___)$/.test(last)
    if (!isBareLabel) break
    keep.pop()
  }

  // NOT HANDLED, and said here rather than discovered later: a label stranded
  // in the MIDDLE of a turn ("**Quick check**" followed by the next heading)
  // is debris too. Only the TRAILING case has been measured, and walking
  // inward risks removing a heading that legitimately introduces what follows
  // it. Left alone until there is a real instance to work from.

  const out = keep.join('\n').replace(/\n{3,}/g, '\n\n').trim()
  // A LENGTH FLOOR WAS THE WRONG TEST, and measuring it said so: at 40 chars
  // this declined on "Let us check that." followed by the duplicated block —
  // a perfectly good turn, because the widget below it carries the question.
  // The body does not need length, it needs SUBSTANCE. What must not ship is
  // a scrap ("So,", a stray "A)") or an empty bubble, so the test is that a
  // real word survives. When nothing does — the duplicate was the entire turn
  // — the text stands unchanged and the learner sees it twice. That case is
  // left deliberately: the alternative is an empty message bubble, or
  // inventing a lead-in the tutor never wrote.
  return /[A-Za-z]{3}/.test(out) ? out : cleanText
}

/** Start-anchored lettered option label: `A)`, `A.`, `A]`, `(A)`, `- A)`. */
const OPTION_LINE_RE = /^\s*[-*\u2022]?\s*[([]?[A-Za-z][).\]]\s+(?=\S)/

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
/** What may follow an ordinal that names an option position — see rule 2. */
const ORDINAL_FOLLOWERS = new Set([
  'one', 'option', 'choice', 'answer', 'because', 'since', 'as', 'so', 'but', 'is', 'it', 'please',
  'sir', 'maam', 'madam', 'i', 'im', 'thats', 'that', 'right', 'correct', 'then', 'ok', 'okay',
])

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

/** Words a learner wraps an answer in that say nothing about WHICH option — rule 4a only. */
const ANSWER_FILLER = new Set([
  'think', 'guess', 'believe', 'maybe', 'probably', 'answer', 'option', 'choose', 'pick',
  'sure', 'would', 'should', 'must', 'that', 'this', 'thats', 'sir', 'maam', 'madam', 'miss', 'teacher',
  'please', 'correct', 'right', 'because', 'is', 'its',
])

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

/**
 * Words that, immediately after a LEADING "A", signal a REASONING CLAUSE is
 * about to follow — used ONLY by rule 1's `leadingLetterBeforeReasoning`
 * below. Deliberately a strict SUBSET of `CANNOT_FOLLOW_AN_ARTICLE`, not the
 * same set: that set exists to tell the article apart from the letter, and
 * includes plenty of words ("sir", "maam", pronouns, "ok", "yes", "please")
 * that disambiguate the article without being any evidence the learner is
 * about to give a REASON for their choice. `mcqAnswerShapeIsTheClients.test.ts`
 * pins "A sir" / "a sir" as refused (a QA-harness artifact with a title
 * tacked on and no reasoning content), so this set may never include "sir".
 */
const REASONING_CONNECTIVE = new Set(['because', 'but', 'so', 'since'])

/**
 * A QUANTITY SYMBOL IS NOT AN OPTION LETTER.
 *
 * Physics writes its answers as assignments — "a = 2 m/s^2", "c = 450",
 * "d = 5 m" — and a, c and d are also option letters. Measured (production
 * harness, 2026-09-24, phys.therm.specific-heat): "c = 450" against
 * "450 J kg⁻¹ K⁻¹" | "900 …" | "180 …" | "720 000 …" resolved by rule 1 to
 * option C, "180", so the correct value was graded wrong. A letter directly
 * followed by "=" names a quantity, never a choice, so the letter rules read
 * the message with such letters removed. The value itself is untouched and
 * still reaches rule 5.
 */
const VARIABLE_LETTER = /(^|[^A-Za-z0-9_])[a-dA-D](?=\s*=)/g
const withoutVariableLetters = (s: string): string => s.replace(VARIABLE_LETTER, '$1')

/**
 * The value an option LEADS with — "2 m/s²" -> "2", "About 19.5°" -> "19.5",
 * "zero point five newton-metres" -> "0.5" — or null when the option does not
 * open with a number. Canonical form matches `numbersIn`.
 */
function leadingValue(option: string): string | null {
  const m = norm(option).match(/^(?:about |approximately |approx |around |roughly |nearly )?(\d+(?:\.\d+)?)(?![\d.])/)
  return m ? String(Number(m[1])) : null
}

/**
 * The leading VALUE EXPRESSION of a string, canonicalised: "2 m/s²" -> "2",
 * "0.20 V" -> "0.2", "2/4" -> "2/4", "1:5 — …" -> "1:5", "−1 — …" -> "-1".
 * Kept as an expression rather than split into numbers so a fraction, ratio
 * or sign stays ONE value. `anywhere` finds the first expression in a
 * learner's sentence ("i think 2 m/s2", "a = 2 m/s^2"); without it the string
 * must open with one (an option). Word numbers are read through `norm`, so
 * "five newton-metres" leads with "5".
 */
function valueExpression(text: string, anywhere: boolean): string | null {
  const canon = (e: string) => {
    const signed = e.replace(/\u2212/g, '-')
    return /^[-+]?\d+(?:\.\d+)?$/.test(signed) ? String(Number(signed)) : signed.replace(/^\+/, '')
  }
  const raw = foldSuperscripts(text).toLowerCase()
  const re = anywhere
    ? /(?<![\w.])([-+\u2212]?\d+(?:[.:/]\d+)*)/
    : /^\s*(?:about |approximately |approx |around |roughly |nearly )?([-+\u2212]?\d+(?:[.:/]\d+)*)/
  const m = raw.match(re)
  if (m) return canon(m[1])
  const lead = anywhere ? (numbersIn(norm(text))[0] ?? null) : leadingValue(text)
  return lead
}

/** Answer halves that are also what a learner says to a yes/no CHECK-IN
 *  question, so rule 3b never reads them as a choice. */
const LEAD_TOO_CONVERSATIONAL: ReadonlySet<string> = new Set([
  'yes', 'no', 'ok', 'okay', 'sure', 'right', 'correct', 'wrong', 'not quite',
])

// Widened 2026-09-28 (owner-account study, phys.mech.impulse): "wait why is the
// area the impulse? i dont get the graph part" — a '?' mid-message, a WH-word
// after "wait", and explicit confusion — was graded as the correct option on
// "area"/"impulse", banked a verified CHECK credit and got "That's right."
// Rule 0 (verbatim tap) runs before this precondition, so taps are unaffected.
const looksLikeAQuestion = (s: string): boolean =>
  /\?/.test(s)
  || /^\s*(?:(?:wait|ok(?:ay)?|so|but|and|hmm+|um+|sir|ma'?am|then|also|sorry)[\s,.;:!\-]+)*(why|how|what|when|where|which|who|is|are|does|do|can|could|should)\b/i.test(s)
  || /\b(?:i\s+(?:still\s+)?(?:do\s*n[o'’]?t|dont|didn'?t|did\s+not)\s+(?:get|understand|follow|see)|confus(?:ed|ing)|i(?:'|’)?m\s+lost|i\s+am\s+lost|makes?\s+no\s+sense)\b/i.test(s)

/**
 * A REQUEST TO THE TUTOR, OR A CHALLENGE TO WHAT IT SAID, IS NOT AN ANSWER.
 *
 * ── THE DEFECT (learner-intent A/B experiment, 2026-09-25, production) ─────
 * With a MODEL-invented MCQ pending, two typed follow-ups were graded as
 * choices and written as PROBE_OUTCOME evidence:
 *
 *   phys.qm.perturbation-theory, options [Positive, Negative, Zero, Cannot
 *   determine], learner: "Please write out E_n^(2) explicitly and show why
 *   every term is negative when n is the ground state."
 *     -> [mcq-grade] chosen: 1, correct: TRUE   (a PASS, strength 1.0, on a
 *        request for an explanation — rule 4a read the word "negative")
 *   math.cat.topos, weather-app gluing MCQ, learner: "I mean specifically
 *   sheaves on a topological space X — show me how Sh(X) is a topos …"
 *     -> [mcq-grade] chosen: 3, correct: false
 *
 * Both were correctly withheld from mastery ("unauthored-key-not-certifying"),
 * but the evidence rows were written. `looksLikeAQuestion` is the existing
 * guard for this exact shape ("names an option while answering nothing"), and
 * it only knew the interrogative form: an IMPERATIVE request ("please write
 * out…", "show me how…") has no '?' and no leading WH-word.
 *
 * ── THE RULE ───────────────────────────────────────────────────────────────
 * The same precondition, one more shape: an explicit request frame addressed
 * to the tutor, or a claim challenge (`isClaimChallenge`, the existing
 * detector — no second vocabulary). Returns null = "not gradeable here",
 * never "wrong". It sits exactly where the question guard sits, AFTER the
 * verbatim-tap (rule 0) and labelled-letter rules, so a tapped option — the
 * only thing the UI sends on a tap — is graded exactly as before.
 */
const REQUEST_TO_TUTOR_RE = new RegExp([
  // An imperative OPENING, after optional discourse lead-ins and politeness:
  // "please write out…", "ok explain…", "now show me…", "give me…".
  String.raw`^\s*(?:(?:ok(?:ay)?|so|and|but|now|wait|hmm+|um+|sir|ma'?am|then|also|no|yes|right)[\s,.;:!\-]+)*(?:please\s+|pls\s+|plz\s+|kindly\s+)?(?:explain|show|tell|give|write|derive|prove|walk|go\s+(?:through|over)|elaborate|describe|clarify|expand|demonstrate|define|compare|repeat|teach)\b`,
  // A polite request frame anywhere ("can you" alone is already a question
  // opener; "would/will you" are not).
  String.raw`\b(?:can|could|would|will)\s+you\s+(?:please\s+)?(?:explain|show|tell|give|write|derive|prove|walk|go\s+(?:through|over)|elaborate|describe|clarify|expand|demonstrate|define|compare|repeat|teach)\b`,
  // "show me how/why…", "explain why…", "tell me how…", "walk me through…"
  String.raw`\bshow\s+(?:me|us)\s+(?:how|why|what|that|whether|the)\b`,
  String.raw`\b(?:explain|tell\s+(?:me|us))\s+(?:how|why|what)\b`,
  String.raw`\bwalk\s+(?:me|us)\s+through\b`,
  // "I (still) want you to…", "I'd like to see the derivation…"
  String.raw`\bi\s+(?:still\s+)?(?:want|need|would\s+like|'d\s+like)\s+(?:you\s+to|to\s+see|the\s+(?:derivation|proof|explanation|example|steps))\b`,
].join('|'), 'i')

export function readsAsRequestToTutor(message: string): boolean {
  const text = typeof message === 'string' ? message : ''
  if (!text.trim()) return false
  return REQUEST_TO_TUTOR_RE.test(text) || isClaimChallenge(text)
}

/**
 * Resolve a learner's free-text reply to one of the offered options.
 *
 * Returns `null` whenever the answer is ambiguous or unrecognisable — including
 * when two options match equally well, which is the case that would otherwise
 * quietly grade the wrong one.
 */
/**
 * Digit-group separators folded away: "84 000", "84,000", "84 000" -> "84000".
 * Only a 1-3 digit group followed by exact 3-digit groups joined by ONE space,
 * comma, no-break or narrow space — so "5, 100" (a list) and "0.5 x 4200" are
 * untouched.
 */
export function foldDigitGroups(s: string): string {
  return s.replace(/\b\d{1,3}(?:[ ,\u00a0\u202f]\d{3})+(?!\d)/g, (m) => m.replace(/[ ,\u00a0\u202f]/g, ''))
}

/**
 * A REAL QUESTION IS NOT AN ANSWER TO THE PENDING ONE.
 *
 * More than six words, ending in "?" — optionally followed by ONE parenthetical
 * such as "(g = 10 m/s^2)". MEASURED (production, 2026-09-28, A/B test re-check,
 * phys.em.electric-charge): with "rod and cloth, total charge?" on screen, the
 * learner asked "A 4 kg box … What is the coefficient of static friction?
 * (g = 10 m/s^2)" and it was GRADED — PROBE_OUTCOME pass, the reply "That's
 * right.", the probe spent — because the vocabulary rules found enough shared
 * words in the correct option. The original A/B run got the mirror image: the
 * same question graded WRONG against "how many excess electrons?", so the reply
 * opened "Not quite — the answer is: Two". engagesPendingOptions already said a
 * long question is not an attempt; the grader did not, and the trailing
 * parenthetical slipped past that rule too. A short "is it B?" still reaches
 * for an option.
 */
export function isLongQuestion(message: string): boolean {
  const t = typeof message === 'string' ? message.trim() : ''
  return /\?\s*(\([^()]*\))?\s*$/.test(t) && t.split(/\s+/).length > 6
}

export function resolveMcqChoice(message: string, mcq: TutorMCQ): number | null {
  /**
   * GB+ CHOICE-ONLY CONTRACT.
   *
   * ACCEPT: exact option text; explicit option letter; explicit option letter + explanation.
   * REJECT: ordinals, bare values/numbers, answer-half/keyword/paraphrase matching,
   * letters used as symbols/names, ambiguous alternatives, questions, requests,
   * confusion, and arbitrary semantic interpretation.
   *
   * Null means "not gradeable", never "wrong". There is no legacy/semantic fallback.
   */
  if (!mcq || !Array.isArray(mcq.options) || mcq.options.length < 2 || mcq.options.length > 4) return null
  const raw = typeof message === 'string' ? message.trim() : ''
  if (!raw) return null

  // Stage E exact-option behaviour: preserve the established tap path,
  // including its symbolic-option fallback.
  const foldedMessage = foldDigitGroups(raw)
  const foldedOptions = mcq.options.map(foldDigitGroups)
  const normalizeExact = (value: string): string => norm(value).replace(/\s+/g, ' ').trim()
  const exactHits = foldedOptions
    .map((option, i) => ({ i, hit: normalizeExact(option) === normalizeExact(foldedMessage) }))
    .filter((x) => x.hit)
  if (exactHits.length === 1) return exactHits[0].i
  if (exactHits.length > 1) {
    const preserve = (value: string) => value.replace(/\s+/g, ' ').trim()
    const preserved = preserve(raw)
    const cased = mcq.options.map((option, i) => ({ i, hit: preserve(option) === preserved })).filter((x) => x.hit)
    if (cased.length === 1) return cased[0].i
    return null
  }
  const rawFold = (value: string) => value.replace(/\s+/g, ' ').trim().toLowerCase()
  const rawHits = mcq.options.map((option, i) => ({ i, hit: rawFold(option) === rawFold(raw) })).filter((x) => x.hit)
  if (rawHits.length === 1) return rawHits[0].i
  if (rawHits.length > 1) {
    const preserved = raw.replace(/\s+/g, ' ').trim()
    const cased = mcq.options.map((option, i) => ({ i, hit: option.replace(/\s+/g, ' ').trim() === preserved })).filter((x) => x.hit)
    if (cased.length === 1) return cased[0].i
    return null
  }

  // Explicit label + exact option text.
  const labelledExact = raw.match(/^\s*[\(\[]?([A-Da-d])[\)\].,:;-]\s*(.+)\s*$/)
  if (labelledExact) {
    const labelIndex = OPTION_KEYS.indexOf(labelledExact[1].toLowerCase() as (typeof OPTION_KEYS)[number])
    if (labelIndex >= 0 && labelIndex < mcq.options.length &&
        normalizeExact(labelledExact[2]) === normalizeExact(mcq.options[labelIndex])) return labelIndex
  }

  // GB+ explicit-letter grammar. The explanation is opaque and is NEVER
  // semantically evaluated against option text.
  if (/[?]/.test(raw)) return null
  if (readsAsRequestToTutor(raw) || NON_COMMITTAL.test(raw)) return null
  if (/\b(?:confus(?:ed|ing)|lost|don'?t\s+get|do\s+not\s+get|don'?t\s+understand|do\s+not\s+understand)\b/i.test(raw)) return null

  const explicitPatterns = [
    /^\s*[\(\[]?([A-Da-d])[\)\].,:;-]?\s*(.*)$/,
    /^\s*(?:option|answer|choice|letter)\s+([A-Da-d])\b\s*(.*)$/i,
    /^\s*(?:i\s+(?:think|guess|believe|choose|pick|select|say)|(?:the\s+)?(?:my\s+)?(?:answer|choice)\s+is|it(?:'|’)?s|it\s+is)\s*[\(\[]?([A-Da-d])[\)\].,:;-]?\s*(.*)$/i,
  ]

  let chosen: number | null = null
  let explanation = ''
  for (const pattern of explicitPatterns) {
    const match = raw.match(pattern)
    if (!match) continue
    const index = OPTION_KEYS.indexOf(match[1].toLowerCase() as (typeof OPTION_KEYS)[number])
    if (index < 0 || index >= mcq.options.length) return null
    chosen = index
    explanation = match[2] ?? ''
    break
  }
  if (chosen === null) return null

  // Quantity variable: "A = 450" / "c = 450" is not an option letter.
  if (explanation.trimStart().startsWith('=')) return null

  // Alternatives are ambiguous. Never choose for the learner.
  const tail = explanation.trim()
  if (/^(?:or|and|vs\.?|versus)\s+[A-Da-d]\b/i.test(tail)) return null
  if (/^[A-Da-d]\s*(?:\/|\|)\s*[A-Da-d](?:\s|$)/i.test(tail)) return null

  return chosen
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

/**
 * Does this message read as the learner TAPPING (or typing verbatim) one of
 * the pending question's own options — regardless of what that option's
 * text happens to say?
 *
 * ── THE DEFECT THIS CLOSES ──────────────────────────────────────────────
 * `masteryGate.isBareAcknowledgement`'s `ACK_PHRASES` list ('ok', 'yes',
 * 'done', 'next', 'good', 'great', 'cool', 'fine', 'sure', 'continue', 'go',
 * 'thanks', and — the one that fired here — 'k') exists so route.ts can
 * refuse to hand a bare acknowledgement to `gradeMcqAnswer`'s WEAKER
 * inference rules (1-5), which infer a choice from vocabulary or position
 * and could otherwise mistake small talk for an answer.
 *
 * MEASURED IN PRODUCTION (chem.bio.vitamins Tier-A certification,
 * 2026-09-07): the authored probe "The four fat-soluble vitamins are
 * conventionally listed as A, D, E and ______." has the literal correct
 * option "K". Every single reply of "K" — the exact, verbatim, correct
 * answer, byte for byte what a tap sends — was swallowed by the
 * acknowledgement guard BEFORE `gradeMcqAnswer` was ever called: the guard
 * runs first and blocks the call outright, so `chosenIndex`/`correct` never
 * had a chance to resolve. Reproduced deterministically, 100% of attempts,
 * confirmed via the live deployed app with the served options logged raw
 * (`options: ["K","C","B12","B6"]`) immediately before submitting "K".
 * Any authored option whose text happens to equal an ACK_PHRASES entry is
 * affected the identical way, for any concept, not only this one.
 *
 * `resolveMcqChoice`'s own EXACT MATCH rule (rule 0) already documents why
 * it runs first and outranks every inference rule: "tapping an option sends
 * that option's text verbatim... an exact match is the learner saying WHICH
 * option in the only way the UI can say it." The acknowledgement guard was
 * built for the WEAKER rules and must never suppress that strongest, least
 * ambiguous signal. This is exactly that carve-out — true only when the
 * message, trimmed and case-folded, equals one of the options byte-for-byte,
 * mirroring how `LessonScreen` sends a tap (`sendMessage(sessionId, option)`,
 * no reformatting). A near-miss ("okay" against an option spelled "OK.") is
 * deliberately NOT caught here — it still reaches the same exact-match rule
 * inside `resolveMcqChoice` once suppression is lifted, so nothing is lost;
 * this function's only job is to decide whether suppression should apply at
 * all, never to grade.
 */
export function isVerbatimPendingOption(message: string, mcq: TutorMCQ | null): boolean {
  if (!mcq) return false
  const folded = message.trim().toLowerCase()
  if (!folded) return false
  return mcq.options.some((o) => o.trim().toLowerCase() === folded)
}

/**
 * DOES THIS MESSAGE ENGAGE THE PENDING OPTIONS AT ALL?
 *
 * ── WHY THIS EXISTS: THE EXCLUSION-LIST TRAP ────────────────────────────────
 * The I1 disambiguation lead-in ("I couldn't tell which option your answer
 * matched — tap the choice you mean") is gated in route.ts by a predicate
 * named `genuineUnmappedAttempt`. Traced in full (2026-09-12), that predicate
 * contained exactly ONE positive term — `message.trim() !== ''` — and six
 * negative ones: not bare-ack, not practice, not a question, no failure state,
 * no learner request, nothing graded. Its DEFAULT answer to "is this an answer
 * attempt?" was therefore YES, and every non-answer had to be individually
 * excluded.
 *
 * That is why each round of fixes produced a fresh class of false positive in
 * the next QA campaign. I1 added three exclusions; I4 added two more; the
 * English real-student campaign then measured 28 more false fires across
 * Groups 3-12 of `ENGLISH_MCQ_REOFFER_FALSE_POSITIVE_FINDING.md`, in three
 * classes none of the existing exclusions can see:
 *
 *   implicit question, no '?'   "wait, what about words like 'is' or 'seems',
 *                                those arent actions"
 *       `detectLearnerQuestion` REQUIRES `message.includes('?')`, so a
 *       question written without one is invisible to it.
 *   elaborated acknowledgement  "thanks that helped" / "thanks that makes
 *                                sense" / "thank you, that makes more sense"
 *       `isBareAcknowledgement` matches the WHOLE message against a phrase
 *       list, deliberately ("ok, but why does the moon not fall?" must not
 *       match), so "thanks" plus any words at all escapes it.
 *   deferral / meta-commentary  "hmm i think i picked the wrong one, let me
 *                                think again" / "hold on, let me reconsider
 *                                that" / "oh wait, i think i see my mistake"
 *       A statement ABOUT a past answer, or about not having chosen yet. No
 *       classifier in the runtime models this at all.
 *
 * The list of things a learner can say that are not an answer is unbounded;
 * an exclusion list is finite. No further exclusion closes this — only
 * inverting the default does.
 *
 * ── WHAT THIS ASSERTS, AND WHY IT IS THE HONEST PRECONDITION ────────────────
 * The lead-in's own words claim the learner's ANSWER could not be MATCHED TO
 * AN OPTION. That claim is only true if the message reached for an option in
 * the first place. So this returns true only on positive, option-referential
 * evidence, computed against the REAL pending probe:
 *
 *   (a) an option LETTER used as a standalone token in range, read from the
 *       RAW message with the same article guard rule 0a uses (an unlabelled
 *       "a" must not be the English article);
 *   (b) an ORDINAL naming a position in range ("the first one", "second",
 *       "the last one");
 *   (c) DISCRIMINATING option vocabulary — words that `words()` keeps and
 *       that occur in exactly ONE option. Shared vocabulary is excluded by
 *       construction, which is what makes this safe: every option of a probe
 *       is about the lesson topic, and so is every ordinary learner remark
 *       about the lesson, so overlap on shared words is no evidence at all.
 *       Two such words are required, or one together with an explicit answer
 *       phrase (`ANSWER_INTENT`), because a single topic word can appear in a
 *       question about the material as easily as in an attempt at it.
 *
 * ── IT NEVER GRADES, AND MUST NEVER BE USED TO ──────────────────────────────
 * This is deliberately WEAKER than `resolveMcqChoice`: it answers "was the
 * learner reaching for one of these?", not "which one". `resolveMcqChoice`'s
 * refusal to guess is correct and is untouched — nothing here feeds it, and a
 * true return grants no credit, moves no counter and selects no index. The
 * only consequence of a true return is that one advisory sentence may be
 * prepended to the reply.
 *
 * Erring toward FALSE is the safe direction: a missed genuine attempt gets the
 * silent re-offer the product had before I1, while a false fire tells a
 * learner who asked a question that they answered one badly.
 */
const ORDINAL_WORDS: ReadonlyArray<readonly [RegExp, number]> = [
  [/\b(?:the\s+)?first(?:\s+one)?\b/i, 0],
  [/\b(?:the\s+)?second(?:\s+one)?\b/i, 1],
  [/\b(?:the\s+)?third(?:\s+one)?\b/i, 2],
  [/\b(?:the\s+)?fourth(?:\s+one)?\b/i, 3],
]

export function engagesPendingOptions(message: string, mcq: TutorMCQ | null): boolean {
  if (!mcq || !Array.isArray(mcq.options) || mcq.options.length === 0) return false
  const raw = typeof message === 'string' ? message : ''
  if (!raw.trim()) return false
  // Same non-answer shape `resolveMcqChoice` refuses to grade: a request to
  // the tutor or a claim challenge does not reach for an option, so the
  // "tap the choice you mean" lead-in must not fire on it either.
  if (readsAsRequestToTutor(raw)) return false
  // A real question is not an attempt at the pending one (2026-09-28, Physics
  // Unit-1 certification pass 1): "A 5 kg mass hangs from a rope over a pulley
  // … What is the tension T?" drew "I couldn't tell which option your answer
  // matched" and the question went unanswered. A short "is it B?" still
  // reaches for an option; a longer question ending in "?" does not.
  if (isLongQuestion(raw)) return false
  const limit = Math.min(mcq.options.length, OPTION_KEYS.length)

  // (a) An option letter as a standalone token. Same shape rule 0a reads, and
  //     the same article guard: an unlabelled "a" only counts when the word
  //     after it cannot begin a noun phrase.
  for (const m of raw.matchAll(/(?:^|[\s(])([a-dA-D])(\s*[.)\],:;-])?(?=\s|$)/g)) {
    const idx = OPTION_KEYS.indexOf(m[1].toLowerCase() as typeof OPTION_KEYS[number])
    if (idx < 0 || idx >= limit) continue
    if (m[1].toLowerCase() === 'a' && !m[2]) {
      const after = raw.slice((m.index ?? 0) + m[0].length).trim().split(/\s+/)[0]
      // "A 5 kg mass …", "A 200°C nail …": an article before a number.
      if (/^\d/.test(after ?? '')) continue
      if (!cannotFollowAnArticle(after?.toLowerCase().replace(/[^a-z']/g, '') || undefined)) continue
    }
    return true
  }

  // (b) An ordinal naming a position that exists.
  for (const [re, idx] of ORDINAL_WORDS) {
    if (idx < limit && re.test(raw)) return true
  }
  if (limit >= 2 && /\b(?:the\s+)?last(?:\s+one)?\b/i.test(raw)) return true

  // (c) Discriminating option vocabulary.
  const perOption = mcq.options.slice(0, limit).map((o) => new Set(words(o)))
  const occurrences = new Map<string, number>()
  for (const set of perOption) {
    for (const w of set) occurrences.set(w, (occurrences.get(w) ?? 0) + 1)
  }
  const said = new Set(words(raw))
  let best = 0
  for (const set of perOption) {
    let hits = 0
    for (const w of set) {
      if (occurrences.get(w) === 1 && said.has(w)) hits += 1
    }
    if (hits > best) best = hits
  }
  if (best >= 2) return true
  return best >= 1 && statesAnAnswer(raw)
}

/**
 * THE ONE QUESTION THIS TURN PUTS IN FRONT OF THE LEARNER.
 *
 * Both the response payload and the persisted `pendingMcq` snapshot must be
 * this same value, and that is the whole point of extracting it. They are two
 * halves of one fact — what is on the learner's screen — and each half is
 * useless without the other:
 *
 *   response without persist -> the learner can see it and nothing can grade
 *                               their answer next turn (the E6 defect
 *                               gateAssessmentRouteWiring.test.ts guards).
 *   persist without response -> the server counts a probe as displayed and
 *                               suppresses the mastery gate on that belief,
 *                               while LessonScreen's `else setActiveMcq(null)`
 *                               has erased it from the screen. The learner
 *                               cannot answer what they cannot see, so the
 *                               grade that would release the gate never comes.
 *
 * That second deadlock was live. Measured on the 60-concept physics run
 * (2026-08-30): across the five sessions that stalled at GUIDE, keyed-probe
 * attachment after the first wrong answer was 0 of 21 turns — a latch, not a
 * gradient — against 233 of 425 (55%) in every other session, and their own
 * phase mix predicted 23.6 probes where they got 7. In phys.opt.mirrors the
 * tutor asked "What led you to pick option B?" on a turn whose payload carried
 * no mcq at all.
 *
 * A probe GRADED this turn is deliberately not carried forward: it has produced
 * its evidence, and re-serving it would let one question be answered twice.
 */
export function mcqToServe(
  attachedThisTurn: TutorMCQ | null,
  pending: TutorMCQ | null,
  gradedThisTurn: unknown | null,
): TutorMCQ | null {
  if (attachedThisTurn) return attachedThisTurn
  if (pending && !gradedThisTurn) return pending
  return null
}

/**
 * Is `candidate` just the PENDING question again, under a different origin?
 *
 * ── THE GAP THIS CLOSES ──────────────────────────────────────────────────
 * `mcqHoisted` (what route.ts calls `attachedThisTurn` above) is set from
 * EITHER the gate's own selection OR the model's own `<!--MCQ-->` tag —
 * `mcqHoisted = gateMcqHoisted ?? mcqParse.mcq`. So when the gate correctly
 * declines (a probe is already pending and ungraded — `noUnansweredProbeOnScreen`
 * is false) but the MODEL independently re-emits a tag restating that SAME
 * question — measured live, 2026-09-08, `phys.mod.photons`: the learner
 * hedged ("I'm not 100% sure but I'll guess") on a pending "energy of a
 * photon" probe, and the model answered by re-tagging the identical question
 * as its own A/B/C/D listing — `mcqHoisted` becomes non-null, so the I1
 * disambiguation lead-in's `isReoffer` check (`mcqHoisted === null`) reads
 * this as "something NEW was attached" and stays silent. One turn later, an
 * identical hedge on the SAME still-pending probe correctly triggered the
 * lead-in — the only thing that differed was whether the model happened to
 * emit its own tag that turn, not anything about the learner's message.
 *
 * This answers the narrower, correct question `isReoffer` actually needs:
 * not "was anything attached this turn" but "is what's on screen still the
 * one pending, ungraded question" — true whether the SERVER or the MODEL is
 * the one currently rendering it.
 */
export function isRestatementOfPending(
  attachedThisTurn: TutorMCQ | null,
  pending: TutorMCQ | null,
): boolean {
  if (!attachedThisTurn || !pending) return false
  return norm(attachedThisTurn.question) === norm(pending.question)
}

/**
 * OPTION A (I1) lead-in: prepended by the route when a pending keyed MCQ is
 * re-offered because the learner's typed answer could not be mapped to any
 * option (a genuine attempt that `resolveMcqChoice` refused, NOT a bare
 * acknowledgement, practice request, or question). It makes the re-offer
 * non-silent without loosening grading — the answer stays ungraded by design.
 * Lives here, beside `mcqToServe`, so the route and its regression test share
 * one definition and cannot drift.
 */
export const MCQ_REOFFER_DISAMBIGUATION =
  "I couldn't tell which option your answer matched — tap the choice you mean from the list below."

/**
 * THE LEARNER-FACING PROJECTION OF A SERVED MCQ — question and options ONLY.
 *
 * The answer key (`correctIndex`) and the internal `assetId` are SERVER-ONLY.
 * `gradeMcqAnswer` reads `correctIndex` from the PERSISTED pending probe
 * (contextSnapshot), never from the response, and the client submits the chosen
 * OPTION TEXT (LessonScreen: `sendMessage(sessionId, option)`), so the learner
 * never needs the key to render or answer. Sending it leaks the answer — a
 * learner reading the network response sees the correct option outright.
 * `FinalAssessmentModal` already states this principle ("correctIndex is
 * intentionally absent: the server never sends it"); this applies it to the
 * in-lesson probe, the one place it still leaked.
 *
 * PRESENCE IS PRESERVED (null in → null out) so the on-screen-probe invariant
 * that outstandingProbeStaysOnScreen guards still holds: the response carries a
 * probe exactly when the server counts one as displayed. Only the key is
 * removed; the question and options are byte-identical.
 */
export function mcqForClient(
  mcq: TutorMCQ | null | undefined,
): { question: string; options: string[]; renderId: string } | null {
  if (!mcq) return null
  // I2 render receipt (shadow-only, Batch 1): a non-secret content hash the
  // client echoes back next turn as `renderedMcqId` so the server can tell a
  // genuinely-rendered answer from a grade against a question the client
  // never displayed. See `deriveRenderId`'s own header for why it is a hash,
  // not a random token.
  return { question: mcq.question, options: mcq.options, renderId: deriveRenderId(mcq) }
}
