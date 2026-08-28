/**
 * THE LESSON PLAN IS NOT THE LESSON.
 *
 * ── WHAT THIS REMOVES ───────────────────────────────────────────────────────
 * `client.ts`'s first principle, the EXPLANATION SEQUENCING LAW, tells the model
 * the ORDER to introduce an idea in:
 *
 *   concrete everyday object → the real-life situation it appears in → a
 *   one-sentence mental picture → plain-language description → the concept's
 *   name → any further vocabulary → formula → practice
 *
 * That is an instruction about sequence. The model reads it as an instruction
 * about FORMAT and prints the stage names as section headings, so the learner is
 * handed the scaffolding instead of a lesson.
 *
 * MEASURED in production against the real account, 2026-08-27, in two of four
 * live sessions run back to back — so this is the ordinary case, not a corner:
 *
 *   phys.astro.black-holes, after the learner said twice they did not understand
 *     ### 1. Concrete Everyday Anchor
 *     ### 2. Real‑Life Situation
 *     ### 3. One‑Sentence Mental Picture
 *
 *   phys.qm.spin, same point in the conversation
 *     **Concrete everyday object** – a coin.
 *     **Real‑life situation** – you flip a coin in the air…
 *
 *   phys.opt.refraction, the opening turn from /api/learn/lesson-init
 *     ### 2. Real‑life situation
 *     ### 7. Formula (only if needed)
 *
 * The last one is the clearest tell: "(only if needed)" is the prompt's own
 * parenthetical, copied out to a child.
 *
 * ── WHY IT IS STRIPPED HERE AND NOT ARGUED IN THE PROMPT ────────────────────
 * H6.3's recorded lesson, from the hold that the model talked its way past:
 * enforcement belongs on the output side. A prompt clause telling the model not
 * to print the stage names is worth having and is NOT a substitute — the model
 * complies with it most of the time, and this catches the rest.
 *
 * ── WHY IT CANNOT EAT TEACHING ──────────────────────────────────────────────
 * Two narrow shapes, both requiring the stage name to be MARKED UP as a label:
 *
 *   1. A heading line (`#`…`######`, optionally numbered) whose entire text is a
 *      stage name. The line goes; anything under it stays.
 *   2. A line opening `**Stage name**` followed by a separator. Only the label
 *      and separator go — the sentence after them is teaching and is kept.
 *
 * A stage name inside ordinary prose is untouched, because ordinary prose does
 * not mark it up as a heading. "Let us look at a real-life situation" is not a
 * heading and survives; so does a heading a tutor legitimately writes, unless it
 * happens to be exactly one of these eight phrases and nothing else.
 *
 * Pure: no I/O, no model call, no state.
 */

/**
 * The law's own stage names, plus the variants production actually produced
 * ("anchor" for "object", "mental picture" without "one-sentence"). Matched
 * whole, case-insensitively, after normalisation.
 */
const STAGE_NAMES = [
  'concrete everyday object',
  'concrete everyday anchor',
  'everyday object',
  'everyday anchor',
  'real-life situation',
  'real-life example',
  'one-sentence mental picture',
  'mental picture',
  'plain-language description',
  'plain-language explanation',
  'concept name',
  "the concept's name",
  'key vocabulary',
  'further vocabulary',
  'vocabulary',
  'formula',
  'practice',
]

/**
 * Unicode punctuation the model uses in place of ASCII: non-breaking and
 * figure hyphens, en and em dashes, curly apostrophes. Without this,
 * "Real‑life" (U+2011) does not match "real-life" and the line survives.
 */
function normalise(s: string): string {
  return s
    .replace(/[‐‑‒–—−]/g, '-')
    .replace(/[‘’ʼ]/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

/**
 * Is this the whole of a stage label?
 *
 * A trailing parenthetical is allowed and is itself evidence rather than noise —
 * "Formula (only if needed)" is the prompt's parenthetical copied verbatim, and
 * a bare "Formula" heading is stripped for the same reason. Nothing else may
 * follow: "Formula for refraction" is a real heading about a real thing and is
 * left alone.
 */
function isStageLabel(text: string): boolean {
  const t = normalise(text)
    .replace(/^\d+[.)]\s*/, '')          // "2. Real-life situation"
    .replace(/\s*\([^)]*\)\s*$/, '')     // "Formula (only if needed)"
    .replace(/[:\-\s]+$/, '')
    .trim()
  return STAGE_NAMES.includes(t)
}

export interface ScaffoldStripResult {
  text: string
  /** The labels removed, for logging. Empty when nothing changed. */
  removed: string[]
}

/**
 * Remove printed stage labels, keeping every word of teaching around them.
 */
export function stripScaffoldHeadings(input: string): ScaffoldStripResult {
  try {
    if (typeof input !== 'string' || input.length === 0) return { text: input, removed: [] }
    const removed: string[] = []
    const out: string[] = []

    for (const line of input.split('\n')) {
      // Shape 1 — a heading whose entire text is a stage label.
      const heading = line.match(/^\s{0,3}#{1,6}\s+(.+?)\s*#*\s*$/)
      if (heading && isStageLabel(heading[1])) {
        removed.push(heading[1].trim())
        continue
      }

      // Shape 1b — the same thing written as a bold line on its own.
      const boldOnly = line.match(/^\s*\*\*(.+?)\*\*\s*:?\s*$/)
      if (boldOnly && isStageLabel(boldOnly[1])) {
        removed.push(boldOnly[1].trim())
        continue
      }

      // Shape 2 — a bold label followed by the teaching, on one line. Only the
      // label and its separator go.
      //
      // THE SEPARATOR IS OPTIONAL, AND MISSING IT WAS THE BUG. The colon can
      // sit INSIDE the bold markers — "**Real-life situation:** A balloon in a
      // room…" — rather than after them, which the old mandatory
      // `[-–—:]` between `**` and the text could never match: there is nothing
      // there but a space. MEASURED (production, phys.therm.kinetic-theory,
      // the opening turn, 2026-08-27, on the SAME deploy the scaffold fix had
      // already shipped to): **Real-life situation:**, **Mental picture:**,
      // **Plain-language description:** and **Concept name:** all survived
      // verbatim. `isStageLabel` already strips a trailing colon from inside
      // the label, so making the separator optional here is the only change
      // needed — precision still comes entirely from the stage-name match, not
      // from the punctuation shape.
      const inline = line.match(/^(\s*)\*\*(.+?)\*\*\s*[-–—:]?\s*(\S.*)$/)
      if (inline && isStageLabel(inline[2])) {
        removed.push(inline[2].trim())
        out.push(inline[1] + inline[3])
        continue
      }

      out.push(line)
    }

    if (removed.length === 0) return { text: input, removed: [] }

    // Stripping headings leaves the blank lines that surrounded them, and a
    // horizontal rule that only separated one scaffold section from the next.
    const text = out
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/^\s*(?:---|\*\*\*|___)\s*$\n?/gm, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim()

    // Never hand back less than nothing: if the strip somehow emptied the turn,
    // the original stands. A cleanup must not be able to silence a lesson.
    if (text.trim().length === 0) return { text: input, removed: [] }
    return { text, removed }
  } catch {
    return { text: input, removed: [] }
  }
}
