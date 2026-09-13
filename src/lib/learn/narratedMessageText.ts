/**
 * VISUAL COLLAPSE STATE ≠ NARRATION CONTENT SOURCE.
 *
 * A long Tutor message forks into two independent views of the exact same
 * underlying text:
 *
 *   - DISPLAY text respects the learner's own Read More / Collapse choice
 *     (`isExpanded`) — collapsed to a short preview by default for a long
 *     message, exactly as before this module existed.
 *   - NARRATION text is always the COMPLETE message, regardless of
 *     `isExpanded`. A learner who presses Play before ever clicking "Read
 *     more" must still hear the whole thing, and a learner who expands or
 *     collapses the message WHILE narration is playing must never cause it
 *     to restart or duplicate content — `narrationText` below never reads
 *     `isExpanded` at all, so the string handed to the narration hook stays
 *     byte-identical across that toggle (the hook's own reset effect keys
 *     off `text`, so a stable string is what keeps playback uninterrupted).
 *
 * Both forks additionally strip the SAME one line when present
 * (`familiarityLine` — the lesson-opening familiarity question, which the UI
 * replaces with its own single-choice control) so that line is never shown
 * OR spoken twice, in either fork.
 *
 * This module makes no UI decision of its own (no auto-expanding, no
 * auto-scrolling) — it only decides WHAT TEXT each fork receives. Revealing
 * previously-hidden content when narration reaches it is a property of
 * `NarratedText` already rendering every segment it is given (see that
 * component's own header) — feeding it the complete text via `narrationText`
 * is what makes that existing mechanism cover the whole message instead of
 * stopping at the Read More boundary.
 */

export interface CollapsibleMessageText {
  /** The complete authored message text — stripped of code fences etc, but
   *  NEVER truncated for a Read More collapse. */
  full: string
  /** The Read-More-truncated preview. Identical to `full` when the message
   *  never needed truncation (`hasMore` false). */
  preview: string
  /** Whether `preview` differs from `full` — i.e. whether a Read More
   *  control should render at all. */
  hasMore: boolean
}

function stripLine(text: string, line: string | null): string {
  if (!line) return text
  return text.replace(line, '').replace(/\n{3,}/g, '\n\n').trim()
}

/** What the message bubble should visually show — respects the learner's own
 *  Read More / Collapse choice. Unchanged from the pre-existing behaviour
 *  this module extracts (see LessonScreen.tsx's prior inline `rawDisplayText`
 *  / `displayText`). */
export function displayText(msg: CollapsibleMessageText, isExpanded: boolean, familiarityLine: string | null): string {
  const raw = msg.hasMore && !isExpanded ? msg.preview : msg.full
  return stripLine(raw, familiarityLine)
}

/** What narration should speak — ALWAYS the complete message, independent of
 *  the Read More collapse state. See this file's header. */
export function narrationText(msg: CollapsibleMessageText, familiarityLine: string | null): string {
  return stripLine(msg.full, familiarityLine)
}
