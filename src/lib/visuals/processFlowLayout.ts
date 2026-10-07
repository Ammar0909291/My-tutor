/**
 * PROCESS-FLOW STEP LAYOUT — text that fits its box.
 *
 * MATH-013 (2026-10-06, mathematics real-learner run, rendered with the app's
 * own VisualRenderer): every process_flow box was a fixed 56 px tall with the
 * title centred across the full width, so the numbered badge in the top-left
 * corner sat on the start of the title ("Determining the Order of a
 * Differential Equation", "Combine indicators with non-negative coefficients
 * a_i.") and a one-line note ran past both box edges ("equation, e.g., y″ +
 * 3y′ + 2y = 0, with all terms" cut). SVG text does not wrap, so the layout is
 * computed here: the text column starts right of the badge, title and note wrap
 * to whole words inside it, and the box grows to hold them. Pure, so it can be
 * tested without a browser.
 */

export const STEP_MIN_H = 56
const BADGE_COL = 34 // badge (r=10 at x+16) plus clearance
const RIGHT_PAD = 8
const TOP_PAD = 10
const BOTTOM_PAD = 8
export const TITLE_LINE_H = 15
export const NOTE_LINE_H = 12
// Average glyph advance at the renderer's sizes (12 px bold / 9.5 px regular).
const TITLE_CHAR_W = 7
const NOTE_CHAR_W = 5.4

/** Whole-word lines no longer than maxChars; a single over-long word is split. */
export function wrapWords(text: string, maxChars: number): string[] {
  const limit = Math.max(4, Math.floor(maxChars))
  const words = (text ?? '').trim().split(/\s+/).filter(Boolean)
  const lines: string[] = []
  let line = ''
  for (let w of words) {
    while (w.length > limit) {
      if (line) { lines.push(line); line = '' }
      lines.push(w.slice(0, limit - 1) + '-')
      w = w.slice(limit - 1)
    }
    if (!line) line = w
    else if (line.length + 1 + w.length <= limit) line += ' ' + w
    else { lines.push(line); line = w }
  }
  if (line) lines.push(line)
  return lines
}

export interface StepLayout {
  /** Left edge of the text column, relative to the box's x. */
  textX: number
  textW: number
  titleLines: string[]
  noteLines: string[]
  height: number
}

export function layoutStep(step: { title: string; note?: string }, boxWidth: number): StepLayout {
  const textW = Math.max(40, boxWidth - BADGE_COL - RIGHT_PAD)
  const titleLines = wrapWords(step.title, textW / TITLE_CHAR_W)
  const noteLines = step.note ? wrapWords(step.note, textW / NOTE_CHAR_W) : []
  const content = TOP_PAD + titleLines.length * TITLE_LINE_H + noteLines.length * NOTE_LINE_H + BOTTOM_PAD
  return { textX: BADGE_COL, textW, titleLines, noteLines, height: Math.max(STEP_MIN_H, content) }
}
