/**
 * THE LAST LOOK AT A MODEL-WRITTEN REPLY, AFTER EVERY REPAIR HAS RUN.
 *
 * Mathematics real-learner run (2026-10-06, 908 lessons, ten accounts;
 * docs/qa/MATHEMATICS_REAL_LEARNER_DEFECTS.md). Production rows showed the
 * earlier serve-time repairs doing their job and a LATER step undoing it, or a
 * repair leaving less than a reply behind:
 *
 *  - MATH-017: the empathy-opener cap (reuseCaps.ts) runs before the
 *    adaptation and picture regenerations; 130 recovery replies after the
 *    10:08 deploy opened with "I hear you…" within four replies of the last.
 *  - MATH-021: "why?" -> "I asked for the next question so we can check…",
 *    "I put that placeholder in because the system was telling me…".
 *  - MATH-026: "show me step by step" -> "Correct – the Σ matrix for a 5 × 3 A
 *    is indeed 5 × 3. 1. …" — a verdict on an earlier card glued to a reply
 *    that graded nothing.
 *  - MATH-009: the opening turn began "If not, please let me know what you'd
 *    like to focus on." — the question it answered had been cut.
 *  - MATH-015 / MATH-022: "\[ T(x,y)=… 2. **Apply…" with no "\]", and a whole
 *    reply of "=\mu Q(x)\)?".
 *  - MATH-004/016/027/023: the reply to "i dont know" / "i dont understand" /
 *    "give me example" was "Let's take a tiny step together.", "Sure!",
 *    "Imagine you have a row of", or the concept's syllabus line.
 *
 * Every function here is pure: text in, text out. The route decides when each
 * applies (model-written turns only; never a graded verdict, a card lead-in,
 * a lesson close or a degraded notice).
 */

const words = (t: string): number => ((t ?? '').match(/\S+/g) ?? []).length

/** Sentences of one paragraph, kept with their own punctuation. */
const sentencesOf = (para: string): string[] =>
  para.match(/(?:[^.!?\n]|[.!?](?=[^\s"'’”)\]]))+(?:[.!?]+["'’”)\]]*|$)/g) ?? [para]

/** First sentence of the reply and the rest, split without losing anything. */
function splitFirstSentence(text: string): { first: string; rest: string } {
  const t = (text ?? '').trim()
  const first = (sentencesOf(t.split(/\n/)[0] ?? '')[0] ?? '').trim()
  return { first, rest: t.slice(first.length).trim() }
}

// ── MATH-026 — a verdict on nothing ─────────────────────────────────────────
// Bare "Right," / "Exactly," are left alone: both open ordinary sentences.
const VERDICT_OPENER_RE = /^(?:correct|that(?:'|’)?s (?:right|correct)|not quite|yes,? (?:exactly|that(?:'|’)?s right)|exactly right|well done|good job|great job|spot on)\b/i

/**
 * The learner asked for help and nothing was graded this turn: a leading
 * verdict sentence ("Correct – …", "That's right.") grades an earlier card a
 * second time, or praises an answer the learner did not just give. It goes;
 * the help stays. A reply that would be left with almost nothing is untouched.
 */
export function dropVerdictOnUngradedRequest(text: string): { text: string; dropped: string | null } {
  const { first, rest } = splitFirstSentence(text)
  if (!first || !VERDICT_OPENER_RE.test(first.replace(/^[\s*_]+/, ''))) return { text, dropped: null }
  if (words(rest) < 8) return { text, dropped: null }
  return { text: rest, dropped: first }
}

/**
 * The server graded an authored card this turn; the reply must open with that
 * verdict. When a regeneration replaced the draft and the verdict went with it,
 * a plain verdict built from the authored key is put back in front. A reply
 * that already states a verdict near its start is left alone.
 */
export function restoreServerVerdict(text: string, correct: boolean, correctOption: string | null): string {
  const t = (text ?? '').trim()
  const head = t.slice(0, 220).replace(/[’ʼ]/g, "'")
  if (/\b(?:not quite|that's (?:right|correct|not (?:quite )?right)|correct\b|yes, exactly|exactly right|the (?:correct )?answer is|well done)/i.test(head)) return text
  const verdict = correct
    ? "That's right."
    : (correctOption && correctOption.trim() ? `Not quite — the answer is: ${correctOption.trim()}` : 'Not quite.')
  return t ? `${verdict}\n\n${t}` : verdict
}

// ── MATH-009 — a reply that opens on the answer to a question nobody sees ──
const ORPHAN_CONDITIONAL_RE = /^(?:if (?:not|so|yes|no)\b|otherwise\b)/i

/**
 * "If not, please let me know what you'd like to focus on." as the first
 * sentence: the question it follows was removed upstream, so the sentence
 * refers to nothing. Dropped; a reply left with nothing else is untouched (the
 * teaching floor owns that case).
 */
export function dropOrphanConditionalOpener(text: string): { text: string; dropped: string | null } {
  const { first, rest } = splitFirstSentence(text)
  if (!first || !ORPHAN_CONDITIONAL_RE.test(first)) return { text, dropped: null }
  if (!rest) return { text, dropped: null }
  return { text: rest, dropped: first }
}

// ── MATH-015 / MATH-022 — math delimiters that do not pair ─────────────────
/**
 * The client renders KaTeX only between balanced \[ \] and \( \). An opener
 * with no closer swallows the rest of the reply; a closer with no opener shows
 * as a raw backslash. An unclosed opener is closed at the end of its line (a
 * display formula is written on one line in practice — measured: "\[ T(x,y)=…
 * 2. **Apply…"), or before the next opener of the same kind; a stray closer is
 * removed.
 */
export function balanceMathDelimiters(text: string): { text: string; repaired: boolean } {
  const src = typeof text === 'string' ? text : ''
  if (!/\\[[\]()]/.test(src)) return { text: src, repaired: false }
  let out = ''
  let repaired = false
  let open: '[' | '(' | null = null
  let i = 0
  const close = { '[': '\\]', '(': '\\)' } as const
  while (i < src.length) {
    const two = src.slice(i, i + 2)
    if (two === '\\[' || two === '\\(') {
      const kind = two[1] as '[' | '('
      if (open) { out += close[open]; repaired = true }
      open = kind
      out += two; i += 2; continue
    }
    if (two === '\\]' || two === '\\)') {
      const kind = two === '\\]' ? '[' : '('
      if (open === kind) { open = null; out += two } else { repaired = true }
      i += 2; continue
    }
    const ch = src[i]
    // An inline \( … \) never spans a line break; a display \[ … \] that is
    // still open at a blank line, a list item or a heading is closed there.
    if (ch === '\n' && open) {
      const after = src.slice(i + 1)
      const endsHere = open === '(' || /^\s*(?:\n|\d+[.)]\s|[-*•]\s|#{1,6}\s|\*\*)/.test(after)
      if (endsHere) { out += close[open]; open = null; repaired = true }
    }
    out += ch; i++
  }
  if (open) { out += close[open]; repaired = true }
  return { text: out, repaired }
}

// ── A STUB IS NOT A REPLY ──────────────────────────────────────────────────
/** Starts in the middle of a formula: "=\mu Q(x)\)?", ") so", "\] and". */
const FRAGMENT_START_RE = /^\s*(?:[=)\]}+*/^_,;:]|\\[)\]])/

/**
 * A sentence that teaches nothing: comfort, a promise of help to come, an
 * invitation to ask, praise for being confused. Measured whole replies made of
 * nothing else: "I hear you—it can be a bit confusing at first. Let’s make it
 * simpler." (MATH-004), "Okay — let's come at it differently. I hear that …
 * felt confusing, and recognizing that is already a solid first step. 🌱"
 * (MATH-016), "Sure thing! Whenever you’re ready for the next question, just
 * let me know and I’ll send it your way." (MATH-020).
 */
const CONTENT_FREE_SENTENCE_RE = new RegExp([
  String.raw`^(?:okay|ok|sure|sure thing|great|alright|got it|no problem|of course)\b[^.!?]{0,20}[.!?—–-]*$`,
  String.raw`\bi\s+(?:hear|understand|see)\b(?:\s+(?:you|that|it))?`,
  String.raw`\b(?:it|this|that)\s+(?:can|could|may|might)\s+(?:feel|be|seem)\s+(?:a\s+bit\s+|quite\s+|really\s+|so\s+)?(?:confusing|tricky|hard|abstract|overwhelming|puzzling|frustrating|a lot)`,
  String.raw`\b(?:it'?s|that'?s|this\s+is)\s+(?:completely\s+|totally\s+|perfectly\s+)?(?:okay|ok|fine|normal)\b`,
  String.raw`^let(?:'|’)?s\s+(?:make\s+it\s+(?:simpler|easier|tiny|a\s+tiny\s+step)|take\s+(?:a|one)\s+(?:tiny|small|little)\s+step|simplify\s+it|cut\s+to\s+the\s+essentials|come\s+at\s+it\s+differently|try\s+(?:a\s+)?(?:fresh|different)\s+(?:angle|way|approach)|slow\s+(?:right\s+)?down|break\s+it\s+down|keep\s+building)`,
  String.raw`\b(?:just\s+let\s+me\s+know|whenever\s+you(?:'|’)?re\s+ready|i(?:'|’)?ll\s+send\s+it|stay\s+tuned|give\s+it\s+a\s+try|coming\s+up)\b`,
  String.raw`\brecogni[sz]ing\s+that\s+is\s+(?:already\s+)?a\b`,
].join('|'), 'i')

function teachesNothing(sentence: string): boolean {
  const s = sentence.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '').replace(/[’ʼ]/g, "'").trim()
  if (!s) return true
  if (CONTENT_FREE_SENTENCE_RE.test(s)) return true
  // "Okay — let's come at it differently." / "Sure, let's make it simpler."
  const afterInterjection = s.replace(/^(?:okay|ok|sure|alright|great|right|so)\s*[—–,:-]\s*/i, '')
  return afterInterjection !== s && CONTENT_FREE_SENTENCE_RE.test(afterInterjection)
}

/** A reply the learner cannot use: too short, a fragment, nothing but questions, or nothing but comfort and promises. */
export function isStubReply(body: string): boolean {
  const t = (body ?? '').trim()
  if (!t) return true
  if (FRAGMENT_START_RE.test(t)) return true
  if (words(t) < 12) return true
  const sentences = t.split(/\n+/).flatMap(sentencesOf).map((s) => s.trim()).filter((s) => words(s) > 0)
  if (sentences.length === 0) return true
  // Only questions (a request answered with a counter-question, MATH-005).
  if (sentences.every((s) => /\?\s*["'’”)]*$/.test(s))) return true
  return sentences.every(teachesNothing)
}

/**
 * The learner's message asks the tutor to teach — a help request, a struggle,
 * "i dont know", a bare "why?" / "what is this?", or a request for practice.
 * Only on such a turn may a stub be replaced by authored teaching.
 */
export function learnerWantsTeaching(message: string, signals: { request: boolean; practice: boolean }): boolean {
  if (signals.request || signals.practice) return true
  const m = (message ?? '').trim().toLowerCase()
  if (!m) return false
  if (/^(?:why|how|what(?:'s| is| does)?)\b[^.!]{0,60}\?\s*$/.test(m)) return true
  return /\b(?:don'?t|dont|do not|not)\s+(?:understand|get it|follow|know)\b|\bconfus|\bstuck\b|\bidk\b|\bno idea\b|\blost\b/.test(m)
}

/** "Why?" and its short siblings are a request for the reason, for the close deferral too. */
export function isBareWhyQuestion(message: string): boolean {
  return /^\s*(?:but\s+)?(?:why|how come|what(?:'s| is) (?:this|that|it))\s*\??\s*$/i.test(message ?? '')
}

// ── Picking the authored replacement ───────────────────────────────────────
const normPara = (s: string): string => (s ?? '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

export interface ExplanationCandidate {
  content: string
  familyKind: string
  qualityScore?: number | null
}

/**
 * The authored explanation to serve instead of a stub: never one the learner
 * has already read in this window (same 160-character leading-window test the
 * repeat guard uses), preferring the kinds the request asked for. Null when
 * every authored explanation has already been shown.
 */
export function pickUnseenExplanation(
  candidates: readonly ExplanationCandidate[],
  priorTutorTexts: readonly string[],
  preferKinds: readonly string[],
): ExplanationCandidate | null {
  const prior = priorTutorTexts.map(normPara).filter(Boolean)
  const seen = (c: ExplanationCandidate): boolean => {
    const n = normPara(c.content)
    if (!n) return true
    const probe = n.slice(0, Math.min(n.length, 160))
    return prior.some((p) => p.includes(probe))
  }
  const rank = (k: string): number => {
    const i = preferKinds.indexOf(k)
    return i === -1 ? preferKinds.length : i
  }
  const unseen = candidates.filter((c) => c.content && c.content.trim() && !seen(c))
  unseen.sort((a, b) => rank(a.familyKind) - rank(b.familyKind) || (b.qualityScore ?? 0) - (a.qualityScore ?? 0))
  return unseen[0] ?? null
}

/** The one instruction the teaching floor's regeneration carries. */
export const TEACHING_FLOOR_APPENDIX =
  '\n\nOUTPUT REJECTED (server-side check). Your reply taught nothing — only comfort, a promise, a question, '
  + 'or a fragment — and the learner asked for help. Explain the idea of this lesson again in plain, short '
  + 'sentences, with ONE small concrete example that uses actual numbers or objects, worked through. Do NOT '
  + 'repeat wording from your earlier replies. Do NOT tell a story or analogy. Do NOT ask a question. Do NOT '
  + 'say how you feel or what you are about to do — just teach it.'

/** Which explanation kinds fit the request. */
export function preferredExplanationKinds(adaptation: string | null, request: string | null): string[] {
  if (adaptation === 'steps' || adaptation === 'numbers' || request === 'real_life_example') {
    return ['worked_example', 'real_world_example', 'core_explanation', 'faq', 'common_misconception_note', 'misconception_repair']
  }
  return ['core_explanation', 'worked_example', 'faq', 'real_world_example', 'common_misconception_note', 'misconception_repair']
}

// ── MATH-028 — a login handle is not a name ────────────────────────────────
/**
 * "test4", "test 10", "kushw.eti", "user_123": a handle or an e-mail prefix.
 * The tutor must not address a learner by it (measured: "Hey test0!" to the
 * test9 account). A real given name passes.
 */
export function looksLikeHandle(name: string | null | undefined): boolean {
  const n = (name ?? '').trim()
  if (!n) return true
  if (/[@_.]|\d/.test(n)) return true
  if (/^(?:test|user|student|learner|guest|demo|admin)\b/i.test(n)) return true
  return false
}
