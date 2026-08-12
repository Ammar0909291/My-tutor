import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'

/**
 * THE INVISIBLE TWO-COLUMN TEACHING CANVAS.
 *
 * A tutor turn carrying a figure must read as ONE panel with two halves —
 * explanation left, figure right, 50/50 — not as two cards beside each other.
 * The split is geometry only: no divider, no border between halves, no
 * background change, no labels.
 *
 * These are SOURCE assertions, labelled honestly. LessonScreen is a ~5,200-line
 * streaming/voice component with no render harness in this repo, and the
 * properties that matter here are structural (which element wraps which, and
 * which chrome is suppressed) rather than behavioural. A jsdom render would
 * assert less, not more, because the geometry lives in a CSS module that jsdom
 * does not compute.
 */
const ROOT = process.cwd()
const TSX = readFileSync(path.join(ROOT, 'src/components/learn/LessonScreen.tsx'), 'utf8')
const CSS = readFileSync(path.join(ROOT, 'src/components/learn/LessonScreen.module.css'), 'utf8')

describe('canvas geometry — exactly 50/50, no visible divider', () => {
  it('is a two-column grid with equal tracks', () => {
    expect(CSS).toMatch(/\.teachingCanvas\s*\{[\s\S]*?display:\s*grid/)
    expect(CSS).toMatch(/grid-template-columns:\s*minmax\(0,\s*1fr\)\s+minmax\(0,\s*1fr\)/)
  })

  it('uses minmax(0,1fr), not 1fr — a grid track will not shrink below content otherwise', () => {
    // With a bare 1fr, a wide figure or one long token pushes its column past
    // half and silently breaks the equality this layout is specified on.
    expect(CSS).not.toMatch(/grid-template-columns:\s*1fr\s+1fr/)
  })

  it('both halves start at the same top edge', () => {
    expect(CSS).toMatch(/\.teachingCanvas\s*\{[\s\S]*?align-items:\s*start/)
  })

  it('separation is a gap ONLY — no border, rule or background on the canvas', () => {
    const block = CSS.match(/\.teachingCanvas\s*\{[\s\S]*?\}/)![0]
    expect(block).toMatch(/gap:/)
    expect(block).not.toMatch(/border/)
    expect(block).not.toMatch(/background/)
    expect(block).not.toMatch(/box-shadow/)
    expect(block).not.toMatch(/divide/)
  })

  it('each half can shrink, so text wraps and figures scale instead of overflowing', () => {
    expect(CSS).toMatch(/\.canvasText,\s*\n\.canvasVisual\s*\{[\s\S]*?min-width:\s*0/)
  })

  it('collapses to one column only when 50% is genuinely unusable', () => {
    expect(CSS).toMatch(/@media \(max-width: 900px\)[\s\S]*?\.teachingCanvas\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0,\s*1fr\)/)
  })
})

describe('one panel, not two cards', () => {
  it('the tutor bubble drops its border, surface and shadow inside the canvas', () => {
    // A border or a surface colour here is exactly what makes a learner see
    // TWO cards instead of one canvas.
    expect(TSX).toMatch(/background:\s*hasCanvasVisual\s*\?\s*'transparent'/)
    expect(TSX).toMatch(/boxShadow:\s*hasCanvasVisual\s*\?\s*'none'/)
    expect(TSX).toMatch(/hasCanvasVisual\s*\n?\s*\?\s*'1px solid transparent'/)
  })

  it('the bubble uses the full width of its half rather than 90%', () => {
    expect(TSX).toMatch(/maxWidth:\s*hasCanvasVisual\s*\?\s*'100%'\s*:\s*'90%'/)
  })

  it('a turn with NO figure keeps the existing single-bubble look', () => {
    // The canvas exists to pair an explanation with its diagram. Forcing a
    // half-width column on plain prose would make reading worse for no gain.
    expect(TSX).toMatch(/const hasCanvasVisual = !isUser && !msg\.streaming && Boolean\(/)
    // Wrappers collapse to display:contents when off, so the tree is
    // structurally identical to before for a figure-less turn.
    expect(TSX).toMatch(/display: 'contents'/)
  })
})

describe('the figure half', () => {
  it('fills its column instead of keeping the 720px reading width', () => {
    expect(TSX).toMatch(/const CANVAS_VISUAL_FRAME: React\.CSSProperties = \{[\s\S]*?maxWidth: '100%'/)
  })

  it('ALL FOUR existing renderers are routed through the canvas frame', () => {
    // visual / visualSpec / sceneSpec / dynamicVisualizationCode. Missing one
    // would leave that figure type at 720px inside a half-column — the exact
    // "cut off / half-empty" symptom this change exists to remove.
    const routed = TSX.match(/hasCanvasVisual \? CANVAS_VISUAL_FRAME : VISUAL_FRAME/g) ?? []
    expect(routed).toHaveLength(4)
  })

  it('no renderer was replaced, simplified or re-implemented', () => {
    for (const r of ['VisualCard', 'VisualRenderer', 'SceneSpecFigure', 'DynamicVisualRenderer']) {
      expect(TSX).toContain(`<${r}`)
    }
  })
})

describe('preserving existing work', () => {
  it('the compact progress bar is untouched and LessonNavigationPanel is not reintroduced', () => {
    expect(TSX).toContain('LessonProgressBar')
    expect(TSX).not.toMatch(/import .*LessonNavigationPanel/)
  })

  it('the MCQ wizard stays OUTSIDE the canvas, at full width', () => {
    // Squeezing the answer choices into half a column would undo the separate
    // wizard requested earlier.
    const canvasClose = TSX.indexOf('/teaching canvas')
    const practice = TSX.indexOf('<InlinePracticePrompt')
    expect(canvasClose).toBeGreaterThan(-1)
    expect(practice).toBeGreaterThan(canvasClose)
  })

  it('there is still exactly one visualization system', () => {
    expect(TSX).not.toMatch(/VisualRendererV2|SecondVisual|LegacyVisualRenderer/)
  })
})
