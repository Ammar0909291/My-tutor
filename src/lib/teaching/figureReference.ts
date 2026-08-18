/**
 * A TUTOR MAY NOT POINT AT A FIGURE THAT IS NOT THERE.
 *
 * ── THE DEFECT THIS EXISTS FOR ──────────────────────────────────────────────
 * Captured by the certification harness on a real lesson, math.nt.prime-number,
 * 2026-08-18. The turn carried no visual, no visualSpec and no sceneSpec, and
 * read:
 *
 *     "Look at the number line displayed on your screen, which highlights the
 *      numbers 2, 3, 5, 7, 11, and 13.
 *
 *      Notice how these specific numbers cannot be formed by multiplying
 *      smaller whole numbers together…
 *
 *      claudeTest, look at the highlighted points on the number line — why
 *      can't the number 2 be divided evenly into any smaller equal groups
 *      other than 1 and 2?"
 *
 * The learner was told twice to read something that did not exist, and then
 * asked a question about it. There is no recovery available to them: they
 * cannot answer, and they cannot tell whether the fault is theirs or the app's.
 *
 * ── WHY THE RUNTIME AND NOT THE PROMPT ──────────────────────────────────────
 * The same reason `gateProbeContract` and `withholdUngradedGateQuestion` are
 * enforced here: a prompt instruction is advisory, and this repo has now
 * measured three separate advisory rules being ignored. The visual pipeline
 * cannot help either — whether a figure is attached is decided AFTER the text is
 * generated, so the model is writing about a figure whose existence is not yet
 * settled.
 *
 * ── WHAT IT DOES ────────────────────────────────────────────────────────────
 * Removes the REFERENCE and keeps the TEACHING, in two shapes only:
 *
 *   1. a sentence that exists solely to point at the figure
 *      ("Look at the diagram on your screen.") — dropped whole;
 *   2. a leading clause that points at the figure before the real content
 *      ("look at the highlighted points — why can't 2 be divided…?") — the
 *      clause is dropped and the content kept, re-capitalised.
 *
 * A QUESTION IS NEVER REMOVED. In the captured turn the question survives intact
 * and stands perfectly well on its own, which is the general case: the figure
 * was decoration the model added, not the substance of what was asked.
 *
 * It fires ONLY when no figure is attached. With a figure present the reference
 * is true and is left exactly as written.
 */

/** Things a tutor can point at. Deliberately concrete — no metaphors. */
const FIGURE_NOUN =
  /\b(diagram|figure|graph|picture|image|chart|number ?line|animation|illustration|visual|simulation|plot|sketch)\b/i

/** Verbs that direct the learner's eyes somewhere. */
const POINTING_VERB = /\b(look at|looking at|see|notice|observe|study|examine|consider)\b/i

/** Words that place the thing on screen rather than in the prose. */
const ON_SCREEN =
  /\b(on (?:your|the) screen|displayed|shown (?:above|below|here)?|above|below|to the (?:right|left)|highlighted|on screen|pictured)\b/i

export interface FigureReferenceResult {
  text: string
  stripped: boolean
  /** The exact fragments removed, for the log — never guessed at after the fact. */
  removed: string[]
}

/**
 * Strip references to a figure the turn does not carry.
 *
 * Pure and total. On any surprise it returns the text unchanged, because a
 * mangled turn is worse than an over-claiming one.
 */
export function stripUnbackedFigureReferences(
  text: string,
  hasFigure: boolean,
): FigureReferenceResult {
  try {
    if (hasFigure) return { text, stripped: false, removed: [] }
    if (typeof text !== 'string' || text.length === 0) return { text, stripped: false, removed: [] }
    // Cheap reject: nothing here points at anything.
    if (!FIGURE_NOUN.test(text)) return { text, stripped: false, removed: [] }

    const removed: string[] = []
    const paragraphs = text.split(/\n{2,}/)

    const cleanedParagraphs = paragraphs.map((paragraph) => {
      const sentences = paragraph.split(/(?<=[.!?])\s+/)
      const kept = sentences.map((sentence) => {
        const s = sentence.trim()
        if (s.length === 0) return ''

        // Shape 2 first: a pointing clause in FRONT of real content. Handled
        // before shape 1 so a sentence carrying both is trimmed, not deleted.
        const clause = s.match(/^(.{0,140}?[—–-]\s*)(?=\S)/)
        if (clause) {
          const head = clause[1]
          if (POINTING_VERB.test(head) && FIGURE_NOUN.test(head)) {
            const rest = s.slice(head.length).trim()
            if (rest.length > 0) {
              removed.push(head.trim())
              return rest.charAt(0).toUpperCase() + rest.slice(1)
            }
          }
        }

        // Shape 1: the whole sentence is the pointer. Never a question — a
        // question is content the learner is expected to answer, and removing
        // it would silently change what the turn asked.
        const isPointer =
          POINTING_VERB.test(s) && FIGURE_NOUN.test(s) && ON_SCREEN.test(s) && !s.includes('?')
        if (isPointer) {
          removed.push(s)
          return ''
        }

        return s
      })

      return kept.filter((x) => x.length > 0).join(' ')
    })

    const out = cleanedParagraphs.filter((p) => p.trim().length > 0).join('\n\n').trim()
    // Never hand back an empty turn. If the figure reference WAS the whole
    // message there is nothing safe to say, so the original stands and the
    // caller's log records that it could not be repaired.
    if (out.length === 0) return { text, stripped: false, removed: [] }
    if (removed.length === 0) return { text, stripped: false, removed: [] }
    return { text: out, stripped: true, removed }
  } catch {
    return { text, stripped: false, removed: [] }
  }
}
