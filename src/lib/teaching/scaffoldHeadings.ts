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
  // Bare "concrete object", without "everyday" — production, phys.mod.pn-
  // junction's opening bullet list: "- **Concrete object:** Imagine a
  // door…" The other three-word variants were already covered; this
  // two-word one was missed and the label survived verbatim.
  'concrete object',
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
/**
 * Shape 2 removes a label that was standing in as the sentence's subject —
 * "**Real-life situation:** a car moving…" — so what survives on that line
 * is always meant to be a fresh sentence start, and a label written with the
 * colon inside the bold markers routinely left it lowercase.
 *
 * MEASURED (production, phys.rel.postulates, opening turn, 2026-08-27, same
 * deploy as the colon-inside-bold fix above): "...a car moving at a steady
 * speed on a straight road." — grammatically a fragment, not a sentence.
 *
 * Only the case comparison decides whether to act: a first character with no
 * uppercase form (a digit, a symbol, an opening quote) is left exactly as it
 * was, which is also what keeps this from mis-capitalizing a variable name or
 * unit that happens to open the line.
 */
function capitalizeSentenceStart(text: string): string {
  if (text.length === 0) return text
  const first = text[0]
  const upper = first.toUpperCase()
  return upper === first ? text : upper + text.slice(1)
}

function isStageLabel(text: string): boolean {
  const t = normalise(text)
    .replace(/^\d+[.)]\s*/, '')          // "2. Real-life situation"
    .replace(/\s*\([^)]*\)\s*$/, '')     // "Formula (only if needed)"
    .replace(/[:\-\s]+$/, '')
    .trim()
  return STAGE_NAMES.includes(t)
}

/**
 * SHAPE 3 — THE NUMBERING GIVES IT AWAY WHEN THE WORDS DO NOT.
 *
 * MEASURED (production, phys.mech.friction, the opening turn from
 * /api/learn/lesson-init, 2026-09-01, real account, studied as a learner):
 *
 *   ### 1. A familiar scene
 *   ### 2. Where friction shows up
 *   ### 7. When a formula helps
 *   ### 8. Quick practice
 *
 * Every shape above needs the stage name to MATCH — and not one of these does.
 * The model paraphrased all four, so `isStageLabel` returned false for each and
 * the whole scaffold reached the learner on a deploy where the stripper was
 * wired and working. Same failure mode the MCQ duplication had a day earlier:
 * a model rewrites its own words freely, so any rule keyed on the words alone
 * is one paraphrase from useless.
 *
 * ── THE SIGNAL, WHICH CARRIES NO WORDS AT ALL ───────────────────────────────
 * Those numbers are 1, 2, 7, 8. FOUR headings, numbered up to EIGHT.
 *
 * THE RULE IS THAT SELF-NUMBERED HEADINGS RUN 1..n. A writer numbering their
 * own sections starts at one and does not skip; numbering that does either was
 * copied out of a longer list the reader cannot see — here, the EXPLANATION
 * SEQUENCING LAW's eight steps. Stated as arithmetic over the DISTINCT numbers
 * present: `max(number) > count(distinct numbers)`, with at least two headings.
 *
 * That single test catches both ways a subset shows itself, and measuring it
 * is what made the second one explicit:
 *   · HOLES   1, 2, 7, 8   — four headings, max 8
 *   · OFFSET  2, 3, 4      — three headings, max 4, no hole but no 1 either
 * The offset case is a deliberate positive, not a false one. A turn whose
 * headings begin at 2 is continuing a sequence the learner was never shown,
 * which is the same defect wearing different clothes.
 *
 * ── WHY THIS CANNOT EAT A REAL LESSON ───────────────────────────────────────
 * A tutor writing "### 1. Setup / ### 2. Method / ### 3. Result" numbers 1..3
 * across three headings — max 3, count 3 — and is untouched, as is every
 * contiguous list from 1, however long. Two headings are required so a single
 * stray "### 2. …" cannot trip it, and DISTINCT numbers are counted so a
 * repeated "### 1." cannot inflate the count into a false negative. Only the
 * heading LINES go: every word of teaching beneath them is kept, exactly as in
 * shapes 1 and 2.
 *
 * It is deliberately blind to what the headings SAY. That is the point — it is
 * the half of the problem the name list can never cover.
 */
const NUMBERED_HEADING_RE = /^\s{0,3}#{1,6}\s+(\d{1,2})[.)]\s+(.+?)\s*#*\s*$/

interface NumberedHeading { index: number; number: number; text: string }

function collectNumberedHeadings(lines: string[]): NumberedHeading[] {
  const found: NumberedHeading[] = []
  lines.forEach((line, index) => {
    const m = NUMBERED_HEADING_RE.exec(line)
    if (!m) return
    found.push({ index, number: Number(m[1]), text: m[2].trim() })
  })
  return found
}

/**
 * The heading indices to drop, or an empty set. Exported for the test that
 * pins the arithmetic rather than the outcome.
 */
export function externallyNumberedHeadings(lines: string[]): Set<number> {
  const found = collectNumberedHeadings(lines)
  if (found.length < 2) return new Set()
  const distinct = new Set(found.map((h) => h.number))
  const highest = Math.max(...distinct)
  // Self-numbered headings run 1..n. Anything else was numbered from a list
  // the learner cannot see.
  if (highest <= distinct.size) return new Set()
  return new Set(found.map((h) => h.index))
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

    const lines = input.split('\n')
    // Computed over the WHOLE turn before the line loop, because the tell is a
    // property of the set of headings, not of any one line.
    const externallyNumbered = externallyNumberedHeadings(lines)

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
      const line = lines[lineIndex]
      // Shape 3 — a heading numbered out of a longer, unseen list.
      if (externallyNumbered.has(lineIndex)) {
        const m = NUMBERED_HEADING_RE.exec(line)
        removed.push(m ? m[2].trim() : line.trim())
        continue
      }

      // Shape 1 — a heading whose entire text is a stage label.
      const heading = line.match(/^\s{0,3}#{1,6}\s+(.+?)\s*#*\s*$/)
      if (heading && isStageLabel(heading[1])) {
        removed.push(heading[1].trim())
        continue
      }

      // Shape 1b — the same thing written as a bold line on its own, bulleted
      // or not. Whole line goes: there is nothing else on it to keep.
      const boldOnly = line.match(/^\s*(?:[-*•]\s+|\d+[.)]\s+)?\*\*(.+?)\*\*\s*:?\s*$/)
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
      //
      // A LEADING BULLET MARKER IS ALSO ADMITTED, AND MISSING IT WAS A SECOND
      // BUG. The model regularly writes the whole scaffold as a bullet list —
      // "- **Concrete object:** Imagine a door…" — and the prefix group here
      // used to accept only whitespace before `**`, so a leading `- ` broke
      // the match outright. MEASURED (production, phys.mod.pn-junction, the
      // opening turn, 2026-08-27, on the deploy carrying the colon-inside-bold
      // fix above): five full bullet lines survived verbatim — "- **Concrete
      // object:**", "- **Real-life situation:**", "- **Mental picture:**",
      // "- **Plain-language description:**", "- **Concept name:**". The
      // marker is captured and put back in front of the surviving text, so a
      // bullet list stays a bullet list with only the label gone — not
      // discarded, not left orphaned as a bare "-" line.
      const inline = line.match(/^(\s*(?:[-*•]\s+|\d+[.)]\s+)?)\*\*(.+?)\*\*\s*[-–—:]?\s*(\S.*)$/)
      if (inline && isStageLabel(inline[2])) {
        removed.push(inline[2].trim())
        out.push(inline[1] + capitalizeSentenceStart(inline[3]))
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
