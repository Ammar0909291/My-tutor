/**
 * THE FIGURE FITS THE LESSON IT LIVES IN.
 *
 * A learner reported needing roughly three viewport-height scrolls to see one
 * interactive figure: the scene, then the explanation, then the controls.
 *
 * MEASURED in Chromium against the real renderer (/dev/physics-pilot,
 * phys.meas.scalars-vectors, 2026-08-30) — figure height by container width:
 *
 *              before      after
 *   1018px     1014px      913px
 *    560px     1314px      870px      <- the width a real lesson column gives it
 *    373px     1314px       ~870px
 *
 * The 560px row is the one that mattered: below ExplainerFigure's 620px
 * container breakpoint EVERY section stacked, and the 3D canvas sat on its
 * 260px floor while ~1050px of stacked prose surrounded it. The teaching
 * picture had become the smallest thing in its own frame.
 *
 * These are source-level guards on the decisions that produced those numbers.
 * The heights themselves are not asserted — that needs a browser, and the
 * browser pass is what produced the table above.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

const R = (p: string) => readFileSync(join(process.cwd(), p), 'utf8')
const FIG_CSS = R('src/components/school/visuals/ExplainerFigure.module.css')
const FIG_TSX = R('src/components/school/visuals/ExplainerFigure.tsx')
const THREE_D = R('src/components/school/visuals/ThreeDVisual.tsx')

describe('the scene is sized by a budget the frame owns', () => {
  it('the frame declares a height budget for the scene', () => {
    expect(FIG_CSS).toMatch(/--fig-scene-h:\s*clamp\(/)
  })

  it('ThreeDVisual consumes it, and falls back to its previous constant', () => {
    // The fallback is what keeps every OTHER caller of ThreeDVisual — there are
    // dozens — rendering exactly as it did before.
    expect(THREE_D).toMatch(/maxHeight:\s*'var\(--fig-scene-h, min\(520px, 60vh\)\)'/)
    expect(THREE_D).toMatch(/minHeight:\s*'min\(260px, var\(--fig-scene-h, 260px\)\)'/)
  })

  it('the narrow override targets a DESCENDANT, never the container itself', () => {
    // A container query matches descendants of its container, never the
    // container element. Declared on `.frame` — which carries `container-type`
    // — the override is silently inert, and the scene stayed at its wide size
    // on a narrow figure. Measured: 395px under the `.frame` form.
    const narrow = FIG_CSS.match(/@container \(max-width: 620px\)\s*\{[\s\S]*?\n\}/)?.[0] ?? ''
    expect(narrow).toMatch(/\.stage\s*\{[^}]*--fig-scene-h/)
    expect(narrow).not.toMatch(/\.frame\s*\{[^}]*--fig-scene-h/)
  })
})

describe('secondary content gives way; the scene and the controls never do', () => {
  it('the key insight and any further panels sit behind a disclosure', () => {
    expect(FIG_TSX).toMatch(/<details className=\{styles\.more\}>/)
    expect(FIG_TSX).toMatch(/More insights/)
    // Split by role: the FIRST explanation panel stays in front of the learner.
    expect(FIG_TSX).toMatch(/const primaryPanels = panels\.slice\(0, 1\)/)
    expect(FIG_TSX).toMatch(/const tailPanels = panels\.slice\(1\)/)
  })

  it('the disclosure is closed by default but its content is always in the DOM', () => {
    // `<details>` without `open`: searchable and reachable by assistive
    // technology without being opened, which `display: none` would not be.
    expect(FIG_TSX).not.toMatch(/<details className=\{styles\.more\} open/)
  })

  it('the controls are never what gets collapsed', () => {
    const tail = FIG_TSX.slice(FIG_TSX.indexOf('<details className={styles.more}>'))
    expect(tail).not.toMatch(/Try changing values/)
    expect(FIG_TSX).toMatch(/Try changing values/)
  })

  it('the sliders pair up instead of stacking one per row', () => {
    expect(FIG_CSS).toMatch(/\.controls\s*\{[\s\S]*?repeat\(auto-fit, minmax\(165px, 1fr\)\)/)
  })
})

describe('the causal sentence is compressed visually, never removed', () => {
  it('it stays in the DOM and stays wired to its control', () => {
    // It is the only part of a slider that carries meaning for a screen-reader
    // or reduced-motion user, so it is never dropped.
    expect(FIG_TSX).toMatch(/aria-describedby=\{`\$\{id\}-effect`\}/)
    expect(FIG_TSX).toMatch(/id=\{`\$\{id\}-effect`\}/)
  })

  it('hidden with visibility, not display:none, so aria-describedby still reads it', () => {
    // The BASE rule specifically — `.effect` also appears in the hover and the
    // no-hover/reduced-motion overrides, and matching the first `.effect {`
    // found anywhere would silently assert against one of those instead.
    const base = FIG_CSS.match(/\n\.effect\s*\{[\s\S]*?\n\}/)?.[0] ?? ''
    expect(base).toMatch(/visibility:\s*hidden/)
    expect(base).not.toMatch(/display:\s*none/)
  })

  it('revealed on the control the learner is actually on', () => {
    expect(FIG_CSS).toMatch(/\.control:hover \.effect/)
    expect(FIG_CSS).toMatch(/\.control:focus-within \.effect/)
  })

  it('always visible where hover does not exist or motion is reduced', () => {
    expect(FIG_CSS).toMatch(/@media \(hover: none\), \(prefers-reduced-motion: reduce\)/)
  })
})

describe('expand is a study mode, not a second figure', () => {
  it('it is a class on the SAME element — no portal, no remount, no regeneration', () => {
    expect(FIG_TSX).toMatch(/\$\{styles\.frame\}\$\{expanded \? ` \$\{styles\.frameExpanded\}` : ''\}/)
    expect(FIG_TSX).not.toMatch(/createPortal/)
  })

  it('Escape closes it, and the scrim is a real button for pointer users', () => {
    expect(FIG_TSX).toMatch(/e\.key === 'Escape'/)
    expect(FIG_TSX).toMatch(/aria-label="Close the expanded figure"/)
  })

  it('the toggle says which way it goes, for a screen reader as well', () => {
    expect(FIG_TSX).toMatch(/aria-label=\{expanded \? 'Return the figure to the lesson' : 'Expand the figure'\}/)
    expect(FIG_TSX).toMatch(/aria-pressed=\{expanded\}/)
  })

  it('the page behind it does not scroll away under a phone', () => {
    expect(FIG_TSX).toMatch(/document\.body\.style\.overflow = 'hidden'/)
  })
})

describe('nothing is dropped at any width', () => {
  it('the legend, the explanation, the controls and the stepper all still render', () => {
    for (const marker of ['What the colours mean', 'Try changing values', 'styles.legendRow', 'Previous stage', 'Next stage']) {
      expect(FIG_TSX).toContain(marker)
    }
  })

  it('no concept-specific layout branch was introduced', () => {
    // Comments are stripped first, deliberately: the measurements that drove
    // this layout were taken on a named concept and say so, and a check that
    // forbade the WORD would only push that provenance out of the file. What
    // must not exist is a concept reaching the layout LOGIC.
    const code = (src: string) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')
    expect(code(FIG_TSX)).not.toMatch(/vector-addition|scalars-vectors|conceptId ===/)
    expect(code(FIG_CSS)).not.toMatch(/vector|scalars/i)
  })
})
