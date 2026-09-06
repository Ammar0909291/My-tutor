/**
 * PROGRESSIVE RESPONSE REVEAL — client-side fallback for a complete-response
 * delivery path.
 *
 * Investigation finding (2026-09-06): neither the AI provider layer
 * (`src/lib/ai/providers/*` — Groq, Gemini, and Yandex explicitly set
 * `stream: false`, OpenRouter never sets it) nor the API routes
 * (`src/app/api/learn/chat/route.ts`, `.../lesson-init/route.ts`) stream at
 * all — both await the full completion and return one `NextResponse.json`.
 * Real token streaming is also not safely retrofittable without touching the
 * teaching pipeline: `route.ts` post-processes the COMPLETE response text
 * (stripping `<!--SIGNAL-->`/`[LESSON_COMPLETE]`/`[MATH_ANSWER]` tags,
 * enforcing stance, resolving the MCQ, resolving the visual) — none of that
 * can run on a partial stream without becoming a different, riskier feature.
 * So per the standing UX instruction's own fallback clause, this module
 * reveals an ALREADY-COMPLETE response progressively on the client — the
 * server and network are untouched, nothing about the model is slowed down,
 * and the exact final string is guaranteed by construction (this only ever
 * computes how much of a fixed string to show, never mutates it).
 *
 * SAFE BOUNDARIES: a reveal cut is never allowed to land inside a construct
 * `MessageContent` (LessonScreen.tsx) renders specially — a fenced code
 * block, `$$...$$`/\[...\] display math, \(...\) inline math, `` `code` ``,
 * `**bold**`, or `*italic*` — so KaTeX/markdown never sees a truncated span.
 * When the next safe boundary is the far side of one of those spans, the
 * whole span appears at once on that step rather than character-by-character
 * (partial LaTeX/code has no meaningful intermediate rendering anyway).
 */

interface ProtectedRange { start: number; end: number }

// Mirrors MessageContent's own protected-span patterns (LessonScreen.tsx).
// Display math / inline math / fenced code use distinct, non-overlapping
// delimiters, so each can be scanned independently. Bold/italic/inline-code
// CANNOT: independently scanning `\*\*[^*\n]+\*\*` and `\*[^*\n]+\*` finds
// spurious "italic" matches straddling a real bold span (the classic
// `**bold**` + `*later*` markdown ambiguity) — exactly what
// `renderMarkdownSpans` avoids by trying them as ONE alternation, left to
// right, so a `**bold**` match consumes both its asterisk-pairs before
// italic ever gets a chance at that text. This must use the identical
// combined pattern, not three independent ones, to protect exactly what the
// real renderer treats as a span — no more, no less.
const INDEPENDENT_PROTECTED_PATTERNS: RegExp[] = [
  /```[\s\S]*?```/g, // fenced code block
  /\$\$[\s\S]+?\$\$/g, // display math, $$...$$
  /\\\[[\s\S]+?\\\]/g, // display math, \[...\]
  /\\\([\s\S]+?\\\)/g, // inline math, \(...\)
]
// Verbatim copy of renderMarkdownSpans's own regex (LessonScreen.tsx) —
// duplicated rather than imported because that module is a client
// component; kept in lockstep by progressiveReveal.test.ts's fixtures.
const MARKDOWN_SPAN_RE = /(\*\*[^*\n]+\*\*|\*[^*\n]+\*|`[^`\n]+`)/g

function computeProtectedRanges(text: string): ProtectedRange[] {
  const ranges: ProtectedRange[] = []
  for (const pattern of INDEPENDENT_PROTECTED_PATTERNS) {
    const re = new RegExp(pattern.source, pattern.flags)
    let m: RegExpExecArray | null
    while ((m = re.exec(text)) !== null) {
      if (m[0].length === 0) { re.lastIndex++; continue }
      ranges.push({ start: m.index, end: m.index + m[0].length })
    }
  }
  const spanRe = new RegExp(MARKDOWN_SPAN_RE.source, MARKDOWN_SPAN_RE.flags)
  let sm: RegExpExecArray | null
  while ((sm = spanRe.exec(text)) !== null) {
    if (sm[0].length === 0) { spanRe.lastIndex++; continue }
    ranges.push({ start: sm.index, end: sm.index + sm[0].length })
  }
  ranges.sort((a, b) => a.start - b.start || a.end - b.end)
  const merged: ProtectedRange[] = []
  for (const r of ranges) {
    const last = merged[merged.length - 1]
    if (last && r.start <= last.end) last.end = Math.max(last.end, r.end)
    else merged.push({ ...r })
  }
  return merged
}

/** True when `pos` falls strictly inside a protected span (not at its edge). */
function isInsideProtected(pos: number, ranges: readonly ProtectedRange[]): boolean {
  return ranges.some((r) => pos > r.start && pos < r.end)
}

/**
 * Ascending, deduplicated character offsets where it is safe to end a
 * partial reveal of `text` — always starts at 0 and ends at `text.length`.
 * Candidates are word/sentence boundaries (so the default reveal reads in
 * word groups and phrases, per the UX spec) plus the exact edges of every
 * protected span; any candidate that falls INSIDE a protected span is
 * dropped, so a cut can never split one open.
 */
export function computeSafeBoundaries(text: string): number[] {
  const len = text.length
  if (len === 0) return [0]
  const ranges = computeProtectedRanges(text)
  const points = new Set<number>([0, len])
  const wsRe = /\s+/g
  let m: RegExpExecArray | null
  while ((m = wsRe.exec(text)) !== null) {
    points.add(m.index)
    points.add(m.index + m[0].length)
  }
  const sentenceRe = /[.!?][\s)]?/g
  while ((m = sentenceRe.exec(text)) !== null) points.add(m.index + m[0].length)
  for (const r of ranges) { points.add(r.start); points.add(r.end) }
  const safe = [...points]
    .filter((p) => p >= 0 && p <= len && !isInsideProtected(p, ranges))
    .sort((a, b) => a - b)
  if (safe[safe.length - 1] !== len) safe.push(len)
  return safe
}

/** The largest boundary that is `<= idealLen` (never overshoots the target). */
export function snapToSafeLength(boundaries: readonly number[], idealLen: number): number {
  if (boundaries.length === 0) return 0
  if (idealLen >= boundaries[boundaries.length - 1]) return boundaries[boundaries.length - 1]
  let lo = 0; let hi = boundaries.length - 1; let ans = boundaries[0]
  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    if (boundaries[mid] <= idealLen) { ans = boundaries[mid]; lo = mid + 1 } else hi = mid - 1
  }
  return ans
}

/** The length shown on the very first frame — never a blank bubble. */
export function firstRevealChunkLength(boundaries: readonly number[]): number {
  if (boundaries.length === 0) return 0
  return boundaries.length > 1 ? boundaries[1] : boundaries[boundaries.length - 1]
}

// Fast enough that the reveal reads as "the tutor is answering right now",
// never as a deliberate typing delay — see the module header. Capped so a
// long response never imposes a real wait; floored so a short one still
// shows at least one visible step rather than a single hard cut.
const MIN_TOTAL_MS = 50
const MAX_TOTAL_MS = 900
const MS_PER_CHAR = 1.3

/** Total wall-clock budget for revealing a string of this length. */
export function computeRevealDurationMs(length: number): number {
  if (length <= 0) return 0
  return Math.min(MAX_TOTAL_MS, Math.max(MIN_TOTAL_MS, length * MS_PER_CHAR))
}

export interface RevealControllerDeps {
  now(): number
  requestFrame(cb: () => void): number
  cancelFrame(handle: number): void
  /** Fired whenever the revealed length grows — never with a smaller value, never after cancel/done. */
  onUpdate(revealedLength: number, fullText: string): void
  /** Fired exactly once, when revealedLength reaches fullText.length. Never fires after cancel(). */
  onDone(fullText: string): void
}

export interface RevealController {
  /** Reveal `text` from the start. Silently cancels any reveal already running on this controller. */
  start(text: string): void
  /** Stop the in-progress reveal, if any. Safe to call when idle or already finished. */
  cancel(): void
}

/**
 * A framework-free, dependency-injected reveal loop — no DOM, no React,
 * so it is directly unit-testable with a fake clock/frame queue. The one
 * piece of mutable state is `generation`: incrementing it invalidates any
 * `tick` closure already in flight, which is what makes `start()` (called
 * again before the previous reveal finished) and `cancel()` both immediate
 * and leak-free — an in-flight `requestFrame` callback becomes a no-op
 * rather than being relied on to have been un-scheduled in time.
 */
export function createRevealController(deps: RevealControllerDeps): RevealController {
  let frame: number | null = null
  let generation = 0

  function cancel(): void {
    generation++
    if (frame !== null) { deps.cancelFrame(frame); frame = null }
  }

  function start(text: string): void {
    cancel()
    const myGeneration = generation
    const boundaries = computeSafeBoundaries(text)
    const totalLen = text.length
    const firstChunk = firstRevealChunkLength(boundaries)
    let lastEmitted = -1
    const emit = (len: number) => {
      if (len === lastEmitted) return
      lastEmitted = len
      deps.onUpdate(len, text)
    }
    if (firstChunk >= totalLen) {
      // Trivial/short text (or nothing but a single protected span) —
      // no animation earns its keep; show it and finish immediately.
      emit(totalLen)
      deps.onDone(text)
      return
    }
    const durationMs = computeRevealDurationMs(totalLen)
    const startTs = deps.now()
    emit(firstChunk)
    const tick = () => {
      if (myGeneration !== generation) return // cancelled or superseded by a later start()
      const elapsed = deps.now() - startTs
      const idealLen = durationMs <= 0
        ? totalLen
        : Math.min(totalLen, Math.round(totalLen * (elapsed / durationMs)))
      const revealed = Math.max(firstChunk, snapToSafeLength(boundaries, idealLen))
      emit(revealed)
      if (revealed >= totalLen) {
        frame = null
        deps.onDone(text)
      } else {
        frame = deps.requestFrame(tick)
      }
    }
    frame = deps.requestFrame(tick)
  }

  return { start, cancel }
}
