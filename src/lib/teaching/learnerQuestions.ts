/**
 * Which questions in a tutor reply are questions TO THE LEARNER — shared by the
 * turn assemblers for card turns (attachAssembly.ts) and lesson openings
 * (openingAssembly.ts). Deterministic; no model call.
 *
 * A question to the learner is one left hanging (nothing but more questions
 * after it in its paragraph) or a confirm-back. These are NOT, and stay:
 * - a question the prose answers itself ("Pressure in pascals? That's
 *   kg/(m·s²)."). MEASURED, first serve window 2026-10-03: dropping those
 *   left "That's kg/(m·s²)." referring to nothing (2 of 5 changed card turns);
 * - a question inside quotation marks, which is content ('The sentence "Where
 *   are you going?" is interrogative');
 * - a short heading ("**Did you know?**", "## Why?") with more text after it
 *   (lesson-open sample, 2026-10-03).
 */

const OPTION_LINE = /^\s*(?:[A-D][).:]|\([A-D]\))\s/
/** A check on the learner's state, not a question about the content. */
const CONFIRM_BACK = /\b(makes? sense|are you ready|ready (?:to|for)|got it|any questions|shall we|sounds? good|(?:okay|ok|clear) so far|with me so far|follow (?:so far|that)|can you see why|does that help|is that clear)\b/i
const HAS_WORD = /[\p{L}\p{N}]/u
const QUOTED_QUESTION = /["“«][^"“”»\n]*\?[^"“”»\n]*["”»]/
const words = (s: string) => (s.match(/[\p{L}\p{N}]+/gu) ?? []).length

interface Unit { para: number; line: number; text: string }

function unitsOf(paras: string[][]): Unit[] {
  const units: Unit[] = []
  paras.forEach((lines, pi) => lines.forEach((line, li) => {
    for (const piece of line.match(/[^.!?]+(?:[.!?]+|$)/g) ?? []) {
      const prev = units[units.length - 1]
      // A word-less fragment (the closing "**" of a bold question) belongs to
      // the sentence before it, so a dropped question takes its markup along.
      if (!HAS_WORD.test(piece) && prev && prev.para === pi && prev.line === li) prev.text += piece
      else units.push({ para: pi, line: li, text: piece })
    }
  }))
  return units
}

function isLearnerQuestion(units: Unit[], i: number, paras: string[][]): boolean {
  const u = units[i]
  if (!u.text.includes('?') || QUOTED_QUESTION.test(u.text)) return false
  const isQ = (v: Unit) => v.text.includes('?') && !QUOTED_QUESTION.test(v.text)
  const later = units.slice(i + 1)
  const line = paras[u.para][u.line].trim()
  const heading = (/^#{1,6}\s/.test(line) || /^\*\*[^*]+\*\*:?$/.test(line)) && words(line) <= 5
  if (heading && later.some((v) => !isQ(v) && HAS_WORD.test(v.text))) return false
  if (CONFIRM_BACK.test(u.text)) return true
  return !later.some((v) => v.para === u.para && !isQ(v) && HAS_WORD.test(v.text))
}

export interface LearnerQuestionDrop {
  text: string
  /** True when anything was removed. */
  dropped: boolean
  /** The removed sentences and option lines, in no particular order (for logs). */
  removed: string[]
}

/**
 * The reply without its questions to the learner (and, unless `keepOptionLines`,
 * its home-made option lines). With `keepLast`, the last question to the
 * learner stays: an opening should end on exactly one.
 */
export function dropLearnerQuestions(
  text: string,
  opts: { keepLast?: boolean; keepOptionLines?: boolean } = {},
): LearnerQuestionDrop {
  const removed: string[] = []
  const paras = (text ?? '').split(/\n{2,}/).map((para) => {
    const all = para.split('\n')
    if (opts.keepOptionLines) return all
    const lines = all.filter((line) => !OPTION_LINE.test(line))
    removed.push(...all.filter((line) => OPTION_LINE.test(line)).map((line) => line.trim()))
    return lines
  })
  const units = unitsOf(paras)
  const learner = units.map((_, i) => isLearnerQuestion(units, i, paras))
  const lastLearner = learner.lastIndexOf(true)
  const kept = units.filter((u, i) => {
    const drop = learner[i] && !(opts.keepLast && i === lastLearner)
    if (drop) removed.push(u.text.trim())
    return !drop
  })
  const out = paras
    .map((lines, pi) => lines
      .map((_, li) => kept.filter((u) => u.para === pi && u.line === li).map((u) => u.text).join('').trim())
      .filter(Boolean)
      .join('\n'))
    .filter(Boolean)
    .join('\n\n')
    .trim()
  return { text: out, dropped: removed.length > 0, removed }
}

/** How many questions to the learner the reply asks. */
export function countLearnerQuestions(text: string): number {
  const paras = (text ?? '').split(/\n{2,}/).map((p) => p.split('\n'))
  const units = unitsOf(paras)
  return units.filter((_, i) => isLearnerQuestion(units, i, paras)).length
}
