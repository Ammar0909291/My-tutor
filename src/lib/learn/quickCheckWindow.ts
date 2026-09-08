/**
 * QUICK CHECK WINDOW — PRESENTATION STATE, AND NOTHING ELSE.
 *
 * The Quick Check panel is the single visual owner of the authored MCQ. It
 * gained ordinary window controls (minimize / maximize / close) so a learner
 * can read the tutor behind it. The hazard that creates is precise, and it is
 * the reason this rule lives in its own module rather than inline in the
 * component:
 *
 *   `setActiveMcq(null)` is the ANSWERED path in LessonScreen — it is what the
 *   option-tap handler calls before sending the choice. So a close implemented
 *   by clearing `activeMcq` would be indistinguishable from answering, and
 *   would discard a pending authored probe the server still holds.
 *
 * CLOSE THEREFORE NEVER TOUCHES THE MCQ. It records a mode against the
 * question's own `askedAt`, and the panel reads that mode. The MCQ, the pending
 * probe, the mastery counters and every byte of server state are untouched by
 * every function here — structurally, because this module has NO IMPORTS and
 * can reach none of them.
 *
 * The mode is keyed on `askedAt` for one specific reason: a mode left over from
 * a question the learner has already dealt with must never hide the NEXT one.
 * A newly served question always arrives expanded, so closing the window can
 * never prevent a future Quick Check from appearing.
 */

export type QuickCheckMode = 'expanded' | 'minimized' | 'closed'

export interface QuickCheckWindowState {
  /** The `askedAt` of the question this mode was chosen for. */
  askedAt: number
  mode: QuickCheckMode
}

/**
 * How the panel should present the question currently on screen.
 *
 * `expanded` whenever the stored mode belongs to a DIFFERENT question, or to no
 * question at all — the safe direction, since being shown a question you have
 * not dealt with is never the failure. There is no MCQ argument type that can
 * express "hidden forever": with no active question there is nothing to
 * present, and the caller renders nothing regardless of what is stored here.
 */
export function quickCheckMode(
  stored: QuickCheckWindowState | null | undefined,
  activeMcqAskedAt: number | null | undefined,
): QuickCheckMode {
  if (activeMcqAskedAt === null || activeMcqAskedAt === undefined) return 'expanded'
  if (!stored || stored.askedAt !== activeMcqAskedAt) return 'expanded'
  return stored.mode
}

/** Record a presentation choice for the question currently on screen. */
export function setQuickCheckMode(activeMcqAskedAt: number, mode: QuickCheckMode): QuickCheckWindowState {
  return { askedAt: activeMcqAskedAt, mode }
}

/** Is the panel itself rendered? Closed hides the panel; the chip reopens it. */
export function panelIsVisible(mode: QuickCheckMode): boolean {
  return mode !== 'closed'
}

/** Are the question and its options rendered? Minimized shows only the header. */
export function questionIsVisible(mode: QuickCheckMode): boolean {
  return mode === 'expanded'
}
