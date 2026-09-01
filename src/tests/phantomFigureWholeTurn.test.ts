/**
 * A PHANTOM FIGURE CLAIM THAT IS THE *WHOLE TURN* SURVIVES.
 *
 * ── MEASURED LIVE ───────────────────────────────────────────────────────────
 * phys.opt.mirrors, 2026-09-01, disposable account, deployed app, diagram-
 * under-struggle probe. The learner said "i still dont get it, can you draw
 * it" and received, with NO figure attached:
 *
 *   "The diagram shows the three key rays from the object: one parallel to
 *    the axis that reflects through the focal point, one passing through the
 *    focal point that reflects parallel to the axis, and one through the
 *    centre of curvature that reflects back on itself."
 *
 * Asked for a drawing, given no drawing, and told to look at one.
 *
 * ── WHY THE GUARD DID NOT CATCH IT ──────────────────────────────────────────
 * Not the pattern: `FIGURE_SUBJECT_CLAIM_RE` matches this sentence (verified
 * directly). `stripUnbackedFigureReferences` declines because the claim is the
 * ENTIRE turn, and removing it would leave nothing — a repair must not empty a
 * turn. Isolated by adding one unrelated sentence, which makes it strip
 * cleanly:
 *
 *   claim ALONE                 stripped=false
 *   claim + trailing teaching   stripped=true   -> the teaching survives
 *   teaching + claim            stripped=true   -> the teaching survives
 *
 * So the guard is correct wherever it can act, and silent in exactly the case
 * where the learner is worst served.
 *
 * ── WHY THIS IS A TEST AND NOT A FIX ────────────────────────────────────────
 * The same shape as the mirror turn, which WAS fixed today — by replacing the
 * whole turn with a sentence derived from something the server already knew
 * (the graded verdict). The equivalent here would be declaring the absence
 * honestly, and the product already does that elsewhere ("I don't have a graph
 * of this, but here is the circuit it describes"). That is a copy-composing
 * change on a hot path, and it deserves its own measurement rather than being
 * appended to the end of an iteration. Pinned so it is not re-derived.
 *
 * WHEN SOMEONE FIXES IT, SECTION A FAILS. That is the intent.
 */
import { describe, it, expect } from 'vitest'
import { stripUnbackedFigureReferences } from '@/lib/teaching/figureReference'

const CLAIM = 'The diagram shows the three key rays from the object: one parallel to the axis '
  + 'that reflects through the focal point, one passing through the focal point that reflects '
  + 'parallel to the axis.'
const TEACHING = 'Ray diagrams let you locate the image without any formula.'

describe('A. the live turn — a whole-turn claim is NOT stripped', () => {
  it('the verbatim turn survives untouched, with no figure attached', () => {
    const r = stripUnbackedFigureReferences(CLAIM, false)
    expect(r.stripped).toBe(false)
    expect(r.text).toBe(CLAIM)
  })

  it('a short whole-turn claim is equally untouched — not a length effect', () => {
    const r = stripUnbackedFigureReferences('The diagram shows the three key rays.', false)
    expect(r.stripped).toBe(false)
  })
})

describe('B. the guard IS correct wherever it can act', () => {
  it('strips the claim and keeps the teaching after it', () => {
    const r = stripUnbackedFigureReferences(`${CLAIM} ${TEACHING}`, false)
    expect(r.stripped).toBe(true)
    expect(r.text).toBe(TEACHING)
  })

  it('strips the claim and keeps the teaching before it', () => {
    const r = stripUnbackedFigureReferences(`${TEACHING} ${CLAIM}`, false)
    expect(r.stripped).toBe(true)
    expect(r.text).toBe(TEACHING)
  })

  it('never touches the text when a figure IS attached', () => {
    for (const t of [CLAIM, `${CLAIM} ${TEACHING}`]) {
      const r = stripUnbackedFigureReferences(t, true)
      expect(r.stripped).toBe(false)
      expect(r.text).toBe(t)
    }
  })
})
