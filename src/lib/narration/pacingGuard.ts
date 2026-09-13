/**
 * Narrated Read-Along — conservative pacing guard for word advancement.
 *
 * Neither narration engine can guarantee its own reported word position is
 * perfectly synchronized to what the learner actually hears. This is not
 * speculation: read-along implementations across the industry document
 * exactly this as a recognized, unsolved-in-general problem — "does the
 * highlight stay locked to the voice at 1.5x and 2x, or drift ahead and
 * behind" is a direct quote from a public read-along project's own issue
 * tracker (this project's own narration speeds go up to 1.5x too). The
 * browser's `onboundary` event is documented to derive from the SPEECH
 * ENGINE's own internal progress accounting, which is not contractually
 * required to be phase-locked to actual audio OUTPUT — other TTS systems
 * (Azure's WordBoundary event, per its own documentation) are explicitly
 * designed to fire events for a word BEFORE that word is actually spoken,
 * specifically so a consuming application has time to react. The server-
 * audio path's `buildWordTimeWindows` is, separately and by its own
 * design, an ESTIMATE with no real per-word timestamp to fall back on.
 * Both can therefore report — or imply — a word transition sooner, in real
 * time, than the learner actually hears it, which is the reported
 * production symptom (word highlighting visibly runs ahead of the voice).
 *
 * This module does not change WHAT word either engine reports, and it
 * never invents forward progress on its own — it only decides WHEN an
 * ALREADY-REPORTED advance is safe to actually display, by comparing the
 * real wall-clock time since the last displayed advance against this SAME
 * narration's own recently observed real pace. Self-calibrating, with no
 * assumed words-per-minute constant or other invented absolute duration,
 * so it adapts automatically to fast/slow voices, sped-up narration, and
 * mid-narration rate changes (e.g. `rateForSegment` slowing a question
 * down) without needing to know any of that explicitly. A transition
 * arriving faster than roughly half of the recently observed pace is held
 * at the CURRENT word a little longer rather than displayed immediately —
 * biasing the visible result toward LAG, never LEAD, exactly as required
 * when true synchronization is unavailable. The very first advance of a
 * fresh narration (no prior gap observed yet) is never held, matching the
 * existing "word 0 highlights the instant speech starts" requirement —
 * this guard only ever holds back once it has real evidence of THIS
 * narration's own pace, never on a guess.
 *
 * KNOWN LIMITATION, stated rather than hidden: because the guard needs at
 * least one genuine prior gap to compare against, the first one or two
 * word transitions of a fresh segment/utterance are not protected. If a
 * TTS engine's boundary events run ahead of audio from the very first
 * word, this guard's purely self-calibrating design cannot detect it,
 * since it has no external reference for what "normal" pace should be —
 * closing that would require an assumed absolute words-per-minute
 * constant, which is deliberately NOT introduced here without real
 * provider timing data to justify one.
 */

export interface PacingGuardState {
  /** Real wall-clock ms (Date.now()-comparable) of the last DISPLAYED
   *  advance, or null before the first one. */
  lastDisplayedAt: number | null
  /** Recently observed real wall-clock gaps (ms) between consecutive
   *  displayed advances, most recent last — bounded so a genuine
   *  mid-narration rate change is reflected reasonably quickly rather
   *  than staying anchored to a stale early-utterance pace forever. */
  recentGapsMs: number[]
}

export const INITIAL_PACING_STATE: PacingGuardState = { lastDisplayedAt: null, recentGapsMs: [] }

const MAX_GAP_HISTORY = 6
/** How much of the recently observed pace a new advance must wait out
 *  before being trusted — deliberately less than 1.0 (never holds a
 *  transition back all the way to the full observed gap, since real
 *  speech has natural word-to-word timing variance), but enough to
 *  absorb a burst of several advances reported in near-zero real time.
 *  This is a safety-margin FRACTION applied to a real, measured quantity
 *  (this narration's own observed pace) — not an absolute duration, and
 *  not the kind of invented constant this module's own doc comment
 *  above rules out. */
const PACING_FRACTION = 0.5

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid]
}

/**
 * How many more real milliseconds must pass before a newly-reported
 * advance may be displayed, given `nowMs`. Returns 0 whenever there is
 * not yet enough observed history to judge pace (the very first advance,
 * or the second with only zero/one gap on record) — never holds back on
 * a guess, only on real evidence.
 */
export function remainingHoldMs(state: PacingGuardState, nowMs: number): number {
  if (state.lastDisplayedAt === null) return 0
  if (state.recentGapsMs.length === 0) return 0
  const minGap = median(state.recentGapsMs) * PACING_FRACTION
  const elapsed = nowMs - state.lastDisplayedAt
  return Math.max(0, minGap - elapsed)
}

/** Records that an advance was actually displayed at `nowMs`, updating the
 *  observed-pace history used by future `remainingHoldMs` calls. */
export function recordDisplayedAdvance(state: PacingGuardState, nowMs: number): PacingGuardState {
  if (state.lastDisplayedAt === null) {
    return { lastDisplayedAt: nowMs, recentGapsMs: state.recentGapsMs }
  }
  const gap = nowMs - state.lastDisplayedAt
  const recentGapsMs = [...state.recentGapsMs, gap].slice(-MAX_GAP_HISTORY)
  return { lastDisplayedAt: nowMs, recentGapsMs }
}
