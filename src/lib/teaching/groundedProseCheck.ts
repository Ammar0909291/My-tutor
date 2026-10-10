/**
 * GROUNDED PROSE CHECK — Issue C, 2026-10-10 (non-numeric factual errors).
 *
 * The owner's check pass (factCheckPass.ts, 2026-10-07) recomputes replies that
 * carry numbers, equations or worked examples. Plain prose is not checked, and
 * the production re-drive of 2026-10-10 saw BIO-024 again: "the male spots the
 * bright red belly of a receptive female" (the red belly is the male's own
 * nuptial colour — docs/qa/BIOLOGY_REAL_LEARNER_DEFECTS.md, BIO-024, Tinbergen).
 *
 * SCOPE (precise, and measured — see the campaign record):
 *  - model-written teaching replies only (never memory, gate, a close, a
 *    degraded notice, a card verdict);
 *  - English lessons only (the authored sources are English);
 *  - a resolved concept WITH authoritative runtime sources: the KG node's
 *    syllabus line and the concept's ACTIVE authored explanations and probes
 *    (themselves transcribed from the Educational Brain entry);
 *  - replies of at least 40 words that make a concrete-case claim: an example,
 *    a named case, an analogy, or a reply to "give me an example" / "explain
 *    simpler" / "explain differently" (`needsGroundedCheck`).
 * It is NOT universal fact verification. A claim the sources do not cover can
 * only be removed (when the checker doubts it and states it without hedging)
 * or left alone; it is never "corrected" from the checker's own knowledge.
 *
 * HOW A MODEL IS KEPT HONEST HERE. The checker never rewrites the reply. It
 * returns a structured verdict per numbered sentence, and this module applies
 * only what it can validate itself:
 *  - CONTRADICTED → replaced only when the cited `source_quote` occurs
 *    verbatim in the supplied sources AND every new content word of the
 *    correction occurs in that quote (the fix is the source's, not the model's);
 *    an unverifiable correction is downgraded to UNSUPPORTED;
 *  - UNSUPPORTED + `doubtful` → the sentence is removed, unless it is hedged
 *    ("often", "may", "usually" …) — a qualified claim stays qualified;
 *  - SUPPORTED / NOT_FACTUAL (an analogy, a hypothetical, an instruction) →
 *    untouched.
 * Sentences carrying numbers belong to the numeric check pass and are never
 * touched here, so the two passes cannot rewrite the same sentence. Edits are
 * keyed by sentence TEXT, so they apply to the numeric pass's output too. At
 * most two sentences / 40 % of the words may go; more, or a result that would
 * be a stub, keeps the reply as it was (logged). Pure apart from `ask`.
 */

export const GROUNDED_CHECK_MIN_WORDS = 40
const MAX_REMOVED_SENTENCES = 2
const MAX_REMOVED_WORD_SHARE = 0.4

const EXAMPLE_MARKER_RE = /\b(?:for example|for instance|e\.g\.|such as|an example|example of|consider|imagine|think of|picture a|take (?:a|the)|in (?:humans|animals|plants|birds|fish|insects|mammals)|famous|classic|is like|are like|just like|works like)\b/i
const LEARNER_ASKED_RE = /\b(?:example|instance|simpler|simple words|easier|explain (?:it )?(?:again|differently|another way)|real[- ]life|real world|analogy)\b/i
const HEDGE_RE = /\b(?:often|usually|typically|generally|may|might|could|some|many|most|roughly|approximately|tends? to|is thought|are thought|it is believed|likely|in many cases|for some)\b/i

/** Does this reply fall inside the checker's scope? */
export function needsGroundedCheck(reply: string, learnerMessage: string): boolean {
  const words = (reply ?? '').match(/\S+/g) ?? []
  if (words.length < GROUNDED_CHECK_MIN_WORDS) return false
  return EXAMPLE_MARKER_RE.test(reply) || LEARNER_ASKED_RE.test(learnerMessage ?? '')
}

export interface Segment { text: string; sep: string; index: number | null }

/**
 * Split into sentences, keeping every character so `join` rebuilds the text
 * exactly. A boundary is [.!?] followed by whitespace, or a line break; "3.5"
 * and "e.g." inside a sentence do not split. Segments with no letters (blank
 * lines, bullets alone) carry no index.
 */
export function splitSentences(text: string): Segment[] {
  const src = text ?? ''
  const out: Segment[] = []
  let n = 0
  let start = 0
  let i = 0
  const push = (bodyEnd: number) => {
    let end = bodyEnd
    while (end < src.length && /\s/.test(src[end])) end++
    const body = src.slice(start, bodyEnd)
    out.push({ text: body, sep: src.slice(bodyEnd, end), index: /[A-Za-z]{2,}/.test(body) ? ++n : null })
    start = end
    i = end
  }
  while (i < src.length) {
    const ch = src[i]
    if (ch === '\n') { push(i); continue }
    if (ch === '.' || ch === '!' || ch === '?') {
      let j = i
      while (j + 1 < src.length && /[.!?)"'’”*]/.test(src[j + 1])) j++
      const next = src[j + 1]
      const before = src.slice(start, i + 1)
      // "e.g." / "i.e." / "vs." / "etc." / an initial ("J. Smith") end no sentence.
      const abbreviation = ch === '.' && /(?:\be\.g|\bi\.e|\bvs|\betc|(?:^|\s)[A-Z])\.$/.test(before)
      if ((next === undefined || /\s/.test(next)) && !abbreviation) { push(j + 1); continue }
      i = j + 1
      continue
    }
    i++
  }
  if (start < src.length) push(src.length)
  return out
}

export const GROUNDED_CHECK_SYSTEM_PROMPT = [
  'You check a tutor\'s reply against the lesson\'s authoritative SOURCES. You never rewrite the reply.',
  'For each numbered sentence that states a fact about the real world, decide:',
  '- "supported": the sources state it or plainly imply it (different wording is fine);',
  '- "contradicted": a source sentence says something incompatible with it;',
  '- "unsupported": the sources do not cover it;',
  '- "not_factual": an analogy, a hypothetical, an instruction, a question or encouragement.',
  'A real-world example (a named organism, substance, place, event or person) states facts: judge it, never "not_factual".',
  'For "supported", copy the supporting source text EXACTLY into "source_quote".',
  'For "contradicted", copy the contradicting source text EXACTLY into "source_quote" and give "correction": the',
  'sentence rewritten to agree with that quote, changing as little as possible and adding nothing the quote does not say.',
  'For "unsupported", set "doubtful": true only if you believe the sentence is factually wrong.',
  'Answer with JSON only, no prose: {"claims":[{"sentence":1,"verdict":"supported","source_quote":"..."},',
  '{"sentence":2,"verdict":"contradicted","source_quote":"...","correction":"..."},',
  '{"sentence":3,"verdict":"unsupported","doubtful":true}]}. Omit sentences you have nothing to say about.',
].join('\n')

export function buildGroundedCheckRequest(segments: Segment[], sources: readonly string[], conceptTitle: string | null): string {
  const numbered = segments.filter((s) => s.index !== null).map((s) => `${s.index}. ${s.text.trim()}`).join('\n')
  const src = sources.map((s, i) => `[S${i + 1}] ${s.trim()}`).join('\n')
  return `${conceptTitle ? `Lesson: ${conceptTitle}\n\n` : ''}SOURCES:\n${src}\n\nREPLY SENTENCES:\n${numbered}`
}

export type ClaimVerdict = 'supported' | 'contradicted' | 'unsupported' | 'not_factual'
export interface CheckerClaim { sentence: number; verdict: ClaimVerdict; source_quote?: string; correction?: string; doubtful?: boolean }

/** Parse the checker's JSON. Anything malformed → null (keep the reply). */
export function parseCheckerAnswer(answer: string | null | undefined): CheckerClaim[] | null {
  const a = (answer ?? '').trim()
  const start = a.indexOf('{')
  const end = a.lastIndexOf('}')
  if (start < 0 || end <= start) return null
  let parsed: unknown
  try { parsed = JSON.parse(a.slice(start, end + 1)) } catch { return null }
  const claims = (parsed as { claims?: unknown })?.claims
  if (!Array.isArray(claims)) return null
  const out: CheckerClaim[] = []
  for (const c of claims) {
    const o = c as Record<string, unknown>
    if (typeof o?.sentence !== 'number' || !Number.isInteger(o.sentence)) continue
    if (!['supported', 'contradicted', 'unsupported', 'not_factual'].includes(o.verdict as string)) continue
    out.push({
      sentence: o.sentence,
      verdict: o.verdict as ClaimVerdict,
      source_quote: typeof o.source_quote === 'string' ? o.source_quote : undefined,
      correction: typeof o.correction === 'string' ? o.correction : undefined,
      doubtful: o.doubtful === true,
    })
  }
  return out
}

const STOP = new Set(['that', 'this', 'with', 'from', 'they', 'their', 'there', 'which', 'when', 'what', 'have', 'has', 'were', 'will', 'into', 'than', 'then', 'them', 'also', 'only', 'each', 'other', 'some', 'such', 'very', 'just', 'more', 'most', 'does', 'your', 'about', 'because', 'these', 'those', 'being', 'been', 'while', 'where'])
const norm = (t: string): string => (t ?? '').toLowerCase().replace(/[‐-―−]/g, '-').replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim()
const contentWords = (t: string): string[] => (norm(t).match(/[a-z][a-z'-]{3,}/g) ?? []).filter((w) => !STOP.has(w))

/** A correction is the SOURCE's: the quote is verbatim in a source, and every new content word is in the quote. */
export function correctionIsGrounded(original: string, claim: CheckerClaim, sources: readonly string[]): boolean {
  const quote = norm(claim.source_quote ?? '')
  const corr = (claim.correction ?? '').trim()
  if (quote.length < 12 || !corr) return false
  if (!sources.some((s) => norm(s).includes(quote))) return false
  if (corr.length > Math.max(40, original.length * 2)) return false
  const stem = (w: string): string => w.replace(/(?:ing|ed|es|s)$/, '')
  const had = new Set(contentWords(original).map(stem))
  const quoteWords = new Set(contentWords(quote).map(stem))
  const added = contentWords(corr).map(stem).filter((w) => !had.has(w))
  if (added.length === 0) return norm(corr) !== norm(original)
  return added.every((w) => quoteWords.has(w))
}

const carriesNumber = (s: string): boolean => /\d/.test(s.replace(/^\s*(?:[-*•]|\d+[.)])\s+/, ''))

export interface GroundedEdit { sentence: string; action: 'corrected' | 'removed'; replacement?: string; sourceQuote?: string }

/**
 * Decide the edits. Keyed by sentence text so they can be applied to a reply
 * the numeric pass has since corrected (a sentence it changed no longer matches).
 */
/**
 * C-1 (BIO-024 class, production 2026-10-10 on 76c2edd): "give me example" on
 * bio.behav.innate-behavior-instinct produced a great crested grebe courtship
 * whose sign stimulus (an orange throat patch shown by the female) no lesson
 * source covers — and the checker passed it. No source can correct it, so the
 * reply is QUALIFIED honestly instead: when two or more confident factual
 * sentences are not covered by the sources (unsupported, or "supported"
 * without a verbatim quote), the reply says its details are not from the
 * lesson materials.
 */
export const UNCOVERED_EXAMPLE_NOTE =
  'The details of this example are not in your lesson materials, so treat them as an illustration of the idea, not as facts to learn.'
export const UNCOVERED_QUALIFY_AT = 2

/** Append the qualifier once. */
export function qualifyUncovered(text: string): { text: string; changed: boolean } {
  if ((text ?? '').includes(UNCOVERED_EXAMPLE_NOTE)) return { text, changed: false }
  return { text: `${(text ?? '').trim()}\n\n${UNCOVERED_EXAMPLE_NOTE}`, changed: true }
}

export function decideGroundedEdits(text: string, claims: CheckerClaim[], sources: readonly string[]): { edits: GroundedEdit[]; rejected: string[]; uncovered: string[] } {
  const segs = splitSentences(text)
  const byIndex = new Map(segs.filter((s) => s.index !== null).map((s) => [s.index as number, s]))
  const edits: GroundedEdit[] = []
  const rejected: string[] = []
  const uncovered: string[] = []
  const quoted = (q: string | undefined) => {
    const n = norm(q ?? '')
    return n.length >= 12 && sources.some((src) => norm(src).includes(n))
  }
  for (const c of claims) {
    const seg = byIndex.get(c.sentence)
    if (!seg) { rejected.push(`no-sentence-${c.sentence}`); continue }
    const sentence = seg.text
    if (carriesNumber(sentence)) { if (c.verdict === 'contradicted' || c.doubtful) rejected.push(`numeric-owned-${c.sentence}`); continue }
    // A confident claim the sources do not cover (or a "supported" verdict
    // that cannot show its source) is counted for the honest qualifier.
    if (!HEDGE_RE.test(sentence) && !c.doubtful
      && (c.verdict === 'unsupported' || (c.verdict === 'supported' && !quoted(c.source_quote)))) {
      uncovered.push(sentence)
    }
    if (c.verdict === 'contradicted') {
      if (correctionIsGrounded(sentence, c, sources)) {
        const lead = /^\s*(?:[-*•]|\d+[.)])\s+/.exec(sentence)?.[0] ?? ''
        const body = (c.correction ?? '').trim().replace(/^\s*(?:[-*•]|\d+[.)])\s+/, '')
        edits.push({ sentence, action: 'corrected', replacement: lead + body, sourceQuote: c.source_quote })
        continue
      }
      rejected.push(`ungrounded-correction-${c.sentence}`)
      // Unverifiable correction: treated as a doubted, uncovered claim.
      if (!HEDGE_RE.test(sentence)) edits.push({ sentence, action: 'removed' })
      continue
    }
    if (c.verdict === 'unsupported' && c.doubtful) {
      if (HEDGE_RE.test(sentence)) { rejected.push(`hedged-kept-${c.sentence}`); continue }
      edits.push({ sentence, action: 'removed' })
    }
  }
  return { edits, rejected, uncovered }
}

/** Apply edits; null when the limits are exceeded or the result would not teach. */
export function applyGroundedEdits(text: string, edits: GroundedEdit[], isStub: (t: string) => boolean): { text: string; reason: string } | null {
  if (edits.length === 0) return { text, reason: 'no-edits' }
  const segs = splitSentences(text)
  const totalWords = (text.match(/\S+/g) ?? []).length
  const removals = edits.filter((e) => e.action === 'removed')
  const removedWords = removals.reduce((n, e) => n + (e.sentence.match(/\S+/g) ?? []).length, 0)
  if (removals.length > MAX_REMOVED_SENTENCES || removedWords / Math.max(1, totalWords) > MAX_REMOVED_WORD_SHARE) return null
  let applied = 0
  const parts: string[] = []
  segs.forEach((seg, k) => {
    const e = seg.index !== null ? edits.find((x) => x.sentence === seg.text) : undefined
    if (!e) { parts.push(seg.text + seg.sep); return }
    applied++
    if (e.action === 'corrected') { parts.push((e.replacement ?? seg.text) + seg.sep); return }
    // A removed list item takes its bare marker ("1.", "-") with it.
    const prev = segs[k - 1]
    if (prev && prev.index === null && /^\s*(?:\d+[.)]|[-*•])\s*$/.test(prev.text) && !prev.sep.includes('\n')) parts.pop()
    // A removed line keeps its line break; a removed mid-paragraph sentence drops its space.
    parts.push(seg.sep.includes('\n') ? seg.sep.replace(/^[ \t]+/, '') : '')
  })
  const out = parts.join('').replace(/\n{3,}/g, '\n\n').trim()
  if (applied === 0) return { text, reason: 'edits-did-not-match' }
  if (!out || (out.match(/\S+/g) ?? []).length < 20 || isStub(out)) return null
  return { text: out, reason: 'applied' }
}

export async function runGroundedProseCheck(input: {
  text: string
  learnerMessage: string
  conceptTitle: string | null
  sources: readonly string[]
  isStub: (t: string) => boolean
  ask: (system: string, user: string) => Promise<string | null>
  timeoutMs?: number
}): Promise<{ edits: GroundedEdit[]; checked: boolean; reason: string; rejected: string[]; uncovered?: string[] }> {
  if (!needsGroundedCheck(input.text, input.learnerMessage)) return { edits: [], checked: false, reason: 'out-of-scope', rejected: [] }
  if (input.isStub(input.text)) return { edits: [], checked: false, reason: 'stub-not-checked', rejected: [] }
  const sources = input.sources.map((s) => (s ?? '').trim()).filter((s) => s.length > 0)
  if (sources.length === 0) return { edits: [], checked: false, reason: 'no-sources', rejected: [] }
  try {
    const segs = splitSentences(input.text)
    const answer = await Promise.race([
      input.ask(GROUNDED_CHECK_SYSTEM_PROMPT, buildGroundedCheckRequest(segs, sources, input.conceptTitle)),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), input.timeoutMs ?? 7000)),
    ])
    if (answer === null) return { edits: [], checked: false, reason: 'timeout-or-no-answer', rejected: [] }
    const claims = parseCheckerAnswer(answer)
    if (!claims) return { edits: [], checked: false, reason: 'unparseable', rejected: [] }
    const { edits, rejected, uncovered } = decideGroundedEdits(input.text, claims, sources)
    // A removed sentence is not also qualified.
    const removedSet = new Set(edits.filter((e) => e.action === 'removed').map((e) => e.sentence))
    const stillUncovered = uncovered.filter((u) => !removedSet.has(u))
    return { edits, checked: true, reason: edits.length ? 'edits' : 'no-edits', rejected, uncovered: stillUncovered }
  } catch {
    return { edits: [], checked: false, reason: 'error', rejected: [] }
  }
}
