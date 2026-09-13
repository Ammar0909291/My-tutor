/**
 * Narrated Read-Along — auto-scroll vs. manual-scroll arbitration.
 *
 * Pure, DOM-free: takes plain numbers (timestamps, rects) and returns a
 * decision. The React layer (NarratedText) supplies the real
 * getBoundingClientRect()/scroll-event timestamps; this module only decides
 * what to do with them, so "don't fight manual scrolling" is testable
 * without a browser.
 */

/** How long after the learner's last manual scroll auto-follow stays
 *  suppressed. Long enough that a deliberate scroll-to-reread isn't
 *  immediately yanked back; short enough that narration doesn't wander off
 *  screen for the whole rest of a long lesson. */
export const MANUAL_SCROLL_COOLDOWN_MS = 4000

/**
 * Should the active segment be auto-scrolled into view right now?
 * `lastManualScrollAt` is null when the learner has never scrolled manually
 * this session (or the cooldown already elapsed and was cleared).
 */
export function shouldAutoScroll(nowMs: number, lastManualScrollAt: number | null, cooldownMs = MANUAL_SCROLL_COOLDOWN_MS): boolean {
  if (lastManualScrollAt === null) return true
  return nowMs - lastManualScrollAt >= cooldownMs
}

export interface Rect {
  top: number
  bottom: number
}

/**
 * Is `target` already comfortably inside `container` (with a margin so we
 * scroll a LITTLE before content is fully off-screen, not only once it's
 * gone)? When true, no scroll is needed at all — avoids a jittery
 * scroll-into-view on every single segment change when the reader is
 * already keeping pace.
 */
export function isComfortablyVisible(target: Rect, container: Rect, margin = 0): boolean {
  return target.top >= container.top + margin && target.bottom <= container.bottom - margin
}
