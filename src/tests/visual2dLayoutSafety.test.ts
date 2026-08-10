import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { solveLabelPlacement, type Box, type PlacementItem } from '@/lib/teaching/visual/layout'
import { FIGURE_TEXT_FLOOR_PX } from '@/components/school/visuals/useFigureLegibility'

/**
 * THE 2D RATCHET.
 *
 * The three.js half of the corpus had a shared label system — one primitive,
 * one readability floor, one placement solver. The 2D half had none of it, and
 * measured in Chromium across the 19 SVG cards and the 4 VisualSpec figures:
 *
 *                    below the 10px floor      colliding      clipped
 *   390px                    117                   13            6
 *   768px / 1280px            87                   12            5
 *
 * The tablet and desktop numbers being IDENTICAL was the tell: each figure
 * capped its own width, so it rendered the same size on a phone and a 27"
 * monitor and its type never grew. After the shared owner and the shared
 * solver:
 *
 *   390px                      0                    0            1
 *   768px / 1280px             0                    2            0
 *
 * identical in both themes. The residue is named honestly in the report, not
 * hidden by loosening a check.
 *
 * These tests hold the STRUCTURE that produced those numbers. The numbers
 * themselves come from a browser, which vitest is not — so what is guarded
 * here is every property whose loss would let them regress silently: one owner
 * for width, one floor, one solver, and a floor that can only ever grow type.
 */

const read = (p: string) => readFileSync(join(process.cwd(), p), 'utf8')
const LEGIBILITY = 'src/components/school/visuals/useFigureLegibility.ts'
const PLACEMENT = 'src/components/school/visuals/svgLabelPlacement.ts'

describe('2D layout safety — one owner', () => {
  it('both shared 2D frames run the legibility owner', () => {
    // These two components are the entire 2D surface: VisualCard paints the 19
    // SVG card types, VisualRenderer the 4 VisualSpec figures. A third frame
    // would have to opt in here too.
    for (const file of [
      'src/components/school/visuals/VisualCard.tsx',
      'src/components/visuals/VisualRenderer.tsx',
    ]) {
      const src = read(file)
      expect(src, `${file} must use the shared owner`).toContain('useFigureLegibility')
      expect(src, `${file} must attach it to the figure`).toMatch(/ref=\{figureRef\}/)
    }
  })

  it('the readability floor is one number, shared with the 3D half', () => {
    expect(FIGURE_TEXT_FLOOR_PX).toBeGreaterThanOrEqual(10)
    const sceneLabel = read('src/components/school/visuals/SceneLabel.tsx')
    const floor3d = Number(sceneLabel.match(/FLOOR_PX\s*=\s*(\d+)/)![1])
    expect(floor3d, '2D and 3D must not drift apart on legibility').toBe(FIGURE_TEXT_FLOOR_PX)
  })

  it('the owner clears private width caps rather than trusting each figure', () => {
    // 19 figures cap their own width between 220 and 360px inside a 560px
    // frame. The frame decides; the caps stop deciding.
    expect(read(LEGIBILITY)).toMatch(/style\.maxWidth\s*=\s*''/)
  })
})

describe('2D layout safety — the floor only ever grows type', () => {
  it('type is scaled up to the floor, never down and never hidden', () => {
    const src = read(LEGIBILITY)
    expect(src, 'must take the larger of authored and floor').toMatch(/Math\.max\(authored/)
    for (const banned of ['display: \'none\'', 'visibility: \'hidden\'', 'display:none', 'visibility:hidden']) {
      expect(src, `legibility must never hide text (${banned})`).not.toContain(banned)
    }
  })

  it('the authored size is remembered, so repeated passes cannot inflate it', () => {
    expect(read(LEGIBILITY)).toContain('data-authored-font')
  })

  it('the floor is applied in RENDERED px, through the viewBox scale', () => {
    // An SVG scales its whole user space: a 8px label in a 300-unit viewBox
    // rendered at 600px reads as 16px, and at 220px as 5.9px. A floor that
    // ignores the scale is a floor on a number nobody sees.
    const src = read(LEGIBILITY)
    expect(src).toContain('svgUserUnitScale')
    expect(src).toMatch(/FIGURE_TEXT_FLOOR_PX[^\n]*\/\s*scale|\/\s*scale/)
  })
})

describe('2D layout safety — one solver, two projections', () => {
  it('the SVG path calls the shared solver instead of implementing one', () => {
    const src = read(PLACEMENT)
    expect(src, 'must reuse the 3D solver').toContain('solveLabelPlacement')
    // The things a SECOND solver would need. None of them may appear here.
    for (const marker of ['candidateOffsets', 'MAX_DISPLACEMENT', 'GEOMETRY_WEIGHT', 'boxesOverlap']) {
      expect(src, `${marker} belongs to the solver, not to a projection`).not.toContain(marker)
    }
  })

  it('the projection never hides, shrinks, reorders or rewrites a label', () => {
    const src = read(PLACEMENT)
    for (const banned of ['fontSize', 'display', 'visibility', 'opacity', 'textContent =', 'remove()']) {
      expect(src, `the placement pass must not touch ${banned}`).not.toContain(banned)
    }
  })

  it('a figure with no viewBox is placed too, not silently skipped', () => {
    // Measured: one of the four VisualSpec figures has no viewBox. Skipping it
    // exempted it from both the floor and placement while every check read green.
    expect(read(PLACEMENT)).toMatch(/if \(!viewBox\) return 1/)
  })
})

describe('2D layout safety — solver contract under SVG-shaped input', () => {
  // Screen-space boxes, exactly as the SVG projection produces them: the solver
  // cannot tell which medium it is serving, which is the property being tested.
  const bounds = { width: 534, height: 300 }
  const item = (text: string, x: number, y: number, halfW = 40, halfH = 8): PlacementItem =>
    ({ text, x, y, halfW, halfH })

  it('a label that is already clear is not moved at all', () => {
    const { labels } = solveLabelPlacement([item('a', 100, 100), item('b', 400, 250)], [], bounds)
    expect(labels.every((l) => l.movedPx === 0 && l.ok)).toBe(true)
  })

  it('two labels on the same point are separated', () => {
    const { labels, unresolved } = solveLabelPlacement(
      [item('first', 260, 150), item('second', 260, 150)], [], bounds,
    )
    expect(unresolved).toBe(0)
    const apart = Math.hypot(labels[0].x - labels[1].x, labels[0].y - labels[1].y)
    expect(apart).toBeGreaterThan(0)
  })

  it('a label hanging off the frame is brought inside', () => {
    const { labels } = solveLabelPlacement([item('edge', 520, 150), item('other', 100, 40)], [], bounds)
    expect(labels[0].x - 40).toBeGreaterThanOrEqual(0)
    expect(labels[0].x + 40).toBeLessThanOrEqual(bounds.width)
  })

  it('geometry is avoided when nearby space is genuinely clearer', () => {
    const wall: Box[] = []
    for (let x = 200; x <= 320; x += 6) wall.push({ left: x - 3, right: x + 3, top: 147, bottom: 153 })
    const { labels } = solveLabelPlacement([item('on the line', 260, 150), item('far', 60, 40)], wall, bounds)
    expect(labels[0].movedPx).toBeGreaterThan(0)
  })

  it('placement is deterministic', () => {
    const input: PlacementItem[] = [item('a', 260, 150), item('b', 262, 152), item('c', 258, 148)]
    const once = JSON.stringify(solveLabelPlacement(input, [], bounds))
    for (let i = 0; i < 20; i++) expect(JSON.stringify(solveLabelPlacement(input, [], bounds))).toBe(once)
  })

  it('nothing is ever dropped, and the order out matches the order in', () => {
    const input = [item('one', 260, 150), item('two', 260, 150), item('three', 260, 150)]
    const { labels } = solveLabelPlacement(input, [], bounds)
    expect(labels.map((l) => l.text)).toEqual(['one', 'two', 'three'])
  })

  it('an impossible label is kept and reported, never hidden', () => {
    const tiny = { width: 40, height: 30 }
    const { labels, unresolved } = solveLabelPlacement(
      [item('far wider than this frame', 20, 15), item('also', 20, 15)], [], tiny,
    )
    expect(unresolved).toBeGreaterThan(0)
    const failed = labels.find((l) => !l.ok)!
    expect(failed.reason).toBe('no-safe-placement')
    expect(failed.x).toBe(failed.anchorX)   // left exactly where the author put it
    expect(failed.text).toBeTruthy()        // and still says what it said
  })

  it('a placed label stays near its anchor, so its referent stays clear', () => {
    const limit = Math.min(bounds.width, bounds.height) * 0.31
    const crowd = Array.from({ length: 8 }, (_, i) => item(`label ${i}`, 260, 150))
    for (const l of solveLabelPlacement(crowd, [], bounds).labels) {
      expect(l.movedPx).toBeLessThanOrEqual(limit)
    }
  })
})
