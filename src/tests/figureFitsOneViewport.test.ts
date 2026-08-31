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
  it('the SAME element — no portal, no remount, no regeneration', () => {
    // requestFullscreen does not move the node and does not remount the React
    // subtree, so the canvas keeps its WebGL context and the learner keeps
    // their stage, mode, focus and slider values.
    expect(FIG_TSX).toMatch(/el\.requestFullscreen\(\)/)
    expect(FIG_TSX).not.toMatch(/createPortal/)
  })

  it('NEVER position:fixed — that is what trapped it inside the lesson', () => {
    // A fixed element is positioned against the nearest ancestor with a
    // transform, filter, backdrop-filter, perspective, contain or will-change,
    // and the lesson's message column has one. Reported from the deployed app:
    // the "overlay" was trapped in the message row, clipped by the scrolling
    // messages area, with the scene below the cut and no way to scroll to it.
    // It passed on the dev harness, whose ancestors are plain.
    //
    // The browser's top layer is outside the ancestor chain by construction;
    // the fallback is in-flow and never tries to escape anything. Neither can
    // be trapped, and neither needs a z-index.
    const expandedRule = FIG_CSS.match(/\.frameExpanded\s*\{[\s\S]*?\n\}/)?.[0] ?? ''
    expect(expandedRule).not.toMatch(/position:\s*fixed/)
    expect(FIG_CSS).not.toMatch(/\.scrim\s*\{/)
  })

  it('the expanded box scrolls, so a tall figure is reachable on a short screen', () => {
    // `.frame:fullscreen` heads more than one rule, so take them all and
    // require that the top-layer box scrolls in at least one of them — pinning
    // the first match asserted against whichever rule happened to come first.
    const rules = [...FIG_CSS.matchAll(/\.frame:fullscreen\s*\{[^}]*\}/g)].map((m) => m[0])
    expect(rules.length).toBeGreaterThan(0)
    expect(rules.some((r) => /overflow:\s*auto/.test(r))).toBe(true)
  })

  it('the in-flow fallback budget reaches .stage, or expanding does nothing on a phone', () => {
    // The narrow container query declares the token ON `.stage`, and a
    // declaration on the element beats one inherited from an ancestor however
    // specific that ancestor's selector. Measured before this: the figure and
    // its canvas were unchanged at 1130px and 260px after expanding.
    expect(FIG_CSS).toMatch(/\.frameExpanded \.stage\s*\{[^}]*--fig-scene-h:\s*inherit/)
  })

  it('fullscreen drives the scene through the TOKENS, which inline styles read', () => {
    // ThreeDVisual sets width, max-height and aspect-ratio inline, and an
    // inline declaration cannot be overridden from a stylesheet — so a
    // `max-height: none` rule aimed at the box was simply ignored and the scene
    // stayed capped at 640px. The tokens are the only way in.
    const fs = [...FIG_CSS.matchAll(/\.frame:fullscreen\s*\{[^}]*\}/g)].map((m) => m[0]).join('\n')
    expect(fs).toMatch(/--fig-scene-h:\s*none/)
    expect(fs).toMatch(/--fig-scene-w:\s*auto/)
    expect(fs).toMatch(/--fig-scene-aspect:\s*4 \/ 3/)
    expect(THREE_D).toMatch(/width: 'var\(--fig-scene-w, 100%\)'/)
  })

  it('in fullscreen the SCENE takes the leftover height, so the figure fits the window', () => {
    // A fixed share of the viewport ignores the ~500px of header, stepper,
    // legend, explanation, controls and disclosure around it, so the total ran
    // past the screen and had to be scrolled. Measured after: 1920x1080,
    // 1536x900 and 1280x720 all report scrollHeight === clientHeight.
    expect(FIG_CSS).toMatch(/\.frame:fullscreen \.stage \[data-scene-box\]/)
    expect(FIG_CSS).toMatch(/\.frame:fullscreen \.stage\s*\{[^}]*flex: 1 1 auto/)
    expect(THREE_D).toContain('data-scene-box')
  })

  it('the controls stop taking a row of their own once the rail is wide', () => {
    // A full-width controls row is right while the rail is narrow and ~100px of
    // pure cost once it is not — measured at 1280x720 fullscreen, rail 265px
    // with the span and ~165px without, all of it taken out of the picture.
    expect(FIG_CSS).toMatch(/@container \(min-width: 900px\)\s*\{\s*\.railWide\s*\{\s*grid-column:\s*auto/)
  })

  it('the scene may change SHAPE too — height alone cannot grow a narrow scene', () => {
    expect(THREE_D).toMatch(/aspectRatio: 'var\(--fig-scene-aspect, 4 \/ 3\)'/)
    expect(FIG_CSS).toMatch(/--fig-scene-aspect/)
  })

  it('the flag follows the DOM, so leaving fullscreen by any route stays in sync', () => {
    expect(FIG_TSX).toMatch(/addEventListener\('fullscreenchange'/)
  })

  it('Escape still closes the in-flow fallback, where no browser handles it', () => {
    expect(FIG_TSX).toMatch(/e\.key === 'Escape'/)
    expect(FIG_TSX).toMatch(/if \(!expanded \|\| canFullscreen\) return/)
  })

  it('the toggle says which way it goes, for a screen reader as well', () => {
    expect(FIG_TSX).toMatch(/aria-label=\{expanded \? 'Return the figure to the lesson' : 'Expand the figure'\}/)
    expect(FIG_TSX).toMatch(/aria-pressed=\{expanded\}/)
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
