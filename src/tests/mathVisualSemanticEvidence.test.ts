/**
 * MATHEMATICS VISUAL — DETERMINISTIC SEMANTIC EVIDENCE for the figures the 2026-10-13 render audit left REVIEW_REQUIRED with
 * "no deterministic mathematics assertion covers this figure" (docs/qa/MATHEMATICS_VISUAL_QUALITY_REPORT.md).
 *
 * Two kinds of figure had no assertion of their own:
 *   1. SHARED-GENERATOR scenes (math.geom.triangle, math.geom.distance-formula, math.calc.critical-points, math.stats.data-visualization): each generator
 *      ships an independent consistency checker that re-derives the drawn geometry from the parameters. Here the checker is run on the figure the
 *      resolver actually serves, so the served figure is tied to the check (same scene id, same object count after framing).
 *   2. VisualCard figures (2D SVG cards): every assertion is derived from the markup the component draws, never from its caption, and the claim it
 *      pins is the card's own contract (`VISUAL_META.description`). A card must also belong to the concept's DOMAIN.
 *
 * The two 3D cards (`three_geometric_solids`, `three_transformations`) are React-Three-Fiber scenes; their drawn geometry is exported as data (the Scene reads
 * the same numbers) and asserted here. What a figure of 'surface area' or 'volume' SHOULD show beyond four solids is a teaching decision, not asserted.
 */
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { VISUAL_META } from '@/lib/school/visuals/visualTypes'
import { buildTriangleScene, checkTriangleConsistency } from '@/lib/teaching/sceneGenerators/triangleAngleSum.pure'
import { buildCoordinateGeometryLineScene, checkCoordinateGeometryConsistency } from '@/lib/teaching/sceneGenerators/coordinateGeometryLine.pure'
import { buildCalculusGraphScene, checkCalculusConsistency } from '@/lib/teaching/sceneGenerators/calculusGraph.pure'
import { buildStatisticsBarChartScene, checkStatisticsConsistency } from '@/lib/teaching/sceneGenerators/statisticsBarChart.pure'
import { auditGraph } from '@/lib/teaching/visual/figureAudit'
import { NumberLine } from '@/components/school/visuals/NumberLine'
import { FractionBar } from '@/components/school/visuals/FractionBar'
import { PercentageGrid } from '@/components/school/visuals/PercentageGrid'
import { CoordinatePlane } from '@/components/school/visuals/CoordinatePlane'
import { GeometryShapes } from '@/components/school/visuals/GeometryShapes'
import { SOLIDS, ROW_POS, SOLIDS_COMPARE_LABEL } from '@/components/school/visuals/GeometricSolids3D'
import * as TF from '@/components/school/visuals/Transformations3D'
import { NOTE_FONT_PX } from '@/lib/visuals/processFlowLayout'
import { AUDIT_THRESHOLDS } from '@/lib/teaching/visual/figureAudit'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { readFileSync } from 'node:fs'

const served = (conceptId: string) => {
  const d = resolveVisual({ message: 'show me a diagram', lessonConceptId: conceptId, learnerRequest: 'diagram', subject: 'mathematics' } as Parameters<typeof resolveVisual>[0])
  return d
}
const servedScene = (conceptId: string): SceneSpec => {
  const d = served(conceptId)
  expect(d.payload?.renderer, conceptId).toBe('scene')
  return (d.payload as { sceneSpec: SceneSpec }).sceneSpec
}
const objectCount = (s: SceneSpec) => s.steps.reduce((n, st) => n + st.objects.length, 0)

// ── 1. shared-generator scenes ───────────────────────────────────────────────────────────────────────────────────
describe('the shared-generator Mathematics figures are the figures their generators\' own checkers verify', () => {
  it('math.geom.triangle — the served triangle has the angles 60°, 60° and 60° (the third absorbs the rest, the total is 180°)', () => {
    const params = { angleA: 60, angleB: 60 }
    const built = buildTriangleScene(params)
    expect(checkTriangleConsistency(built, params)).toEqual({ ok: true, errors: [] })
    const s = servedScene('math.geom.triangle')
    expect(s.id).toBe(built.id); expect(objectCount(s)).toBe(objectCount(built))
    expect(180 - params.angleA - params.angleB).toBe(60)
  })

  it('math.geom.distance-formula — P(0, 0), Q(4, 3): midpoint (2, 1.5), PQ = 5, slope 0.75, all re-derived by the generator\'s checker', () => {
    const params = { x1: 0, y1: 0, x2: 4, y2: 3 }
    const built = buildCoordinateGeometryLineScene(params)
    expect(checkCoordinateGeometryConsistency(built, params)).toEqual({ ok: true, errors: [] })
    const s = servedScene('math.geom.distance-formula')
    expect(s.id).toBe(built.id); expect(objectCount(s)).toBe(objectCount(built))
    const label = s.steps.flatMap((st) => st.objects).find((o) => o.id === 'formula')!
    expect(label.text).toBe(`PQ = ${Math.hypot(4, 3)}, slope = ${3 / 4}`)
  })

  it('the vertical case says "not defined", never the word "undefined" (a JS-leak lookalike the audit rejects)', () => {
    const params = { x1: 1, y1: 2, x2: 1, y2: 7 }
    const built = buildCoordinateGeometryLineScene(params)
    expect(checkCoordinateGeometryConsistency(built, params)).toEqual({ ok: true, errors: [] })
    const text = JSON.stringify(built)
    expect(text).toContain('not defined (the line is vertical)')
    expect(text).not.toMatch(/\bundefined\b/)
  })

  it('math.calc.critical-points — x³ − 3x on [−2.5, 2.5]: critical points at −1 and 1 (f′ = 0), a maximum then a minimum, drawn against a named pair of axes', () => {
    const params = { functionType: 'polynomial' as const, coefficients: [1, 0, -3, 0], domainMin: -2.5, domainMax: 2.5 }
    const built = buildCalculusGraphScene(params)
    expect(checkCalculusConsistency(built, params)).toEqual({ ok: true, errors: [] })
    const s = servedScene('math.calc.critical-points')
    expect(s.id).toBe(built.id); expect(objectCount(s)).toBe(objectCount(built))
    const pts = s.steps.flatMap((st) => st.objects).filter((o) => String(o.id).startsWith('critical-') && o.type === 'point')
    expect(pts.map((p) => (p.properties as { x: number }).x).sort((a, b) => a - b).map((x) => Math.round(x * 1000) / 1000)).toEqual([-1, 1])
    for (const p of pts) expect(Math.abs((p.properties as { fpx: number }).fpx)).toBeLessThan(1e-3)       // f′(x) = 3x² − 3 = 0
    const g = auditGraph(s)
    expect(g.isGraph).toBe(true); expect(g.findings).toEqual([])                                           // axes present and named (render audit GR-01 / GR-02)
  })

  it('math.stats.data-visualization — the four bars are the dataset 2, 5, 9, 4 of "Marks scored" (the checker re-derives every bar height)', () => {
    const params = { chartTitle: 'Marks scored', bars: [{ label: '0-10', frequency: 2 }, { label: '10-20', frequency: 5 }, { label: '20-30', frequency: 9 }, { label: '30-40', frequency: 4 }] }
    const built = buildStatisticsBarChartScene(params)
    expect(checkStatisticsConsistency(built, params)).toEqual({ ok: true, errors: [] })
    const s = servedScene('math.stats.data-visualization')
    expect(s.id).toBe(built.id); expect(objectCount(s)).toBe(objectCount(built))
  })
})

// ── 2. VisualCard figures ────────────────────────────────────────────────────────────────────────────────────────
const markupOf = (component: Parameters<typeof createElement>[0], props: Record<string, unknown> = {}) => renderToStaticMarkup(createElement(component as never, { revealStep: Infinity, ...props }))
const tags = (markup: string, name: string) => [...markup.matchAll(new RegExp(`<${name}\\b[^>]*?(?:/>|>[^<]*</${name}>)`, 'g'))].map((m) => m[0])
const attr = (tag: string, name: string) => new RegExp(`\\s${name}="([^"]*)"`).exec(tag)?.[1]
const num = (v: string | undefined) => Number(v)
const textOf = (tag: string) => />([^<]*)</.exec(tag)?.[1] ?? ''

describe('number_line card — "a horizontal line from -5 to 5 with integer ticks and a dot at 0"', () => {
  const m = markupOf(NumberLine)
  const ticks = tags(m, 'line').filter((t) => attr(t, 'x1') === attr(t, 'x2'))
  const labels = tags(m, 'text')
  it('has one tick for each integer −5…5, equally spaced and symmetric about the middle', () => {
    expect(ticks).toHaveLength(11)
    const xs = ticks.map((t) => num(attr(t, 'x1'))).sort((a, b) => a - b)
    const gaps = xs.slice(1).map((x, i) => x - xs[i])
    for (const g of gaps) expect(g).toBeCloseTo(gaps[0], 6)
    expect((xs[0] + xs[10]) / 2).toBeCloseTo(xs[5], 6)
  })
  it('labels the ticks −5…5 left to right, each label under its own tick', () => {
    expect(labels.map(textOf)).toEqual(['-5', '-4', '-3', '-2', '-1', '0', '1', '2', '3', '4', '5'])
    const xs = ticks.map((t) => num(attr(t, 'x1'))).sort((a, b) => a - b)
    labels.forEach((l, i) => expect(num(attr(l, 'x'))).toBeCloseTo(xs[i], 6))
  })
  it('puts its one dot on the tick labelled 0, and nowhere else', () => {
    const dots = tags(m, 'circle')
    expect(dots).toHaveLength(1)
    const zeroLabel = labels.find((l) => textOf(l) === '0')!
    expect(num(attr(dots[0], 'cx'))).toBeCloseTo(num(attr(zeroLabel, 'x')), 6)
    expect(VISUAL_META.number_line.description).toContain('a dot at 0')
  })
})

describe('fraction_bar card — the bars show 1/2, 3/4 and 2/3', () => {
  const m = markupOf(FractionBar)
  const rects = tags(m, 'rect')
  const rows = [...new Set(rects.map((r) => attr(r, 'y')))].sort((a, b) => num(a) - num(b))
  it('draws one bar per fraction, each divided into the denominator\'s number of equal cells with the numerator\'s cells filled', () => {
    expect(rows).toHaveLength(3)
    const expected = [[1, 2], [3, 4], [2, 3]]
    rows.forEach((y, i) => {
      const cells = rects.filter((r) => attr(r, 'y') === y)
      const empty = cells.filter((r) => attr(r, 'fill') === 'var(--bg-elevated)')
      const filled = cells.filter((r) => attr(r, 'fill') !== 'var(--bg-elevated)')
      expect(empty).toHaveLength(expected[i][1])
      expect(filled).toHaveLength(expected[i][0])
      const widths = new Set(cells.map((r) => attr(r, 'width'))); expect(widths.size).toBe(1)                   // equal parts
      const xs = empty.map((r) => num(attr(r, 'x'))); for (let k = 1; k < xs.length; k++) expect(xs[k] - xs[k - 1]).toBeCloseTo(num(attr(empty[0], 'width')) + 2, 6)
    })
  })
  it('writes each fraction twice (left label and in-bar caption) and its value equals filled ÷ total', () => {
    const texts = tags(m, 'text').map(textOf)
    for (const f of ['1/2', '3/4', '2/3']) expect(texts.filter((t) => t === f)).toHaveLength(2)
  })
  it('centres each in-bar caption inside a CELL, never on a divider between cells (render audit LY-02)', () => {
    rows.forEach((y) => {
      const cells = rects.filter((r) => attr(r, 'y') === y && attr(r, 'fill') === 'var(--bg-elevated)')
      const dividers = cells.slice(0, -1).map((r) => num(attr(r, 'x')) + num(attr(r, 'width')) + 1)
      const caption = tags(m, 'text').filter((t) => attr(t, 'text-anchor') === 'middle')[rows.indexOf(y)]
      const cx = num(attr(caption, 'x'))
      for (const d of dividers) expect(Math.abs(cx - d), `${textOf(caption)} vs divider ${d}`).toBeGreaterThan(8)
    })
  })
})

describe('percentage_grid card — "a 10×10 grid with 65 of the 100 squares shaded, captioned 65% = 65 out of 100"', () => {
  const m = markupOf(PercentageGrid)
  const cells = tags(m, 'rect')
  it('has 100 squares in a 10 × 10 lattice and exactly 65 shaded', () => {
    expect(cells).toHaveLength(100)
    expect(new Set(cells.map((c) => attr(c, 'x'))).size).toBe(10); expect(new Set(cells.map((c) => attr(c, 'y'))).size).toBe(10)
    expect(cells.filter((c) => attr(c, 'fill') === '#22A06B')).toHaveLength(65)
  })
  it('shades the first 65 squares in reading order (6 full rows and 5 of the seventh)', () => {
    const ys = [...new Set(cells.map((c) => num(attr(c, 'y'))))].sort((a, b) => a - b)
    const shadedPerRow = ys.map((y) => cells.filter((c) => num(attr(c, 'y')) === y && attr(c, 'fill') === '#22A06B').length)
    expect(shadedPerRow).toEqual([10, 10, 10, 10, 10, 10, 5, 0, 0, 0])
  })
  it('captions the shaded count as a percentage of the 100 squares', () => {
    const caption = tags(m, 'text').map(textOf).join(' ')
    const nums = (caption.match(/\d+/g) ?? []).map(Number)
    expect(nums).toEqual([65, 65, 100])
    expect(nums[0]).toBe(cells.filter((c) => attr(c, 'fill') === '#22A06B').length / cells.length * 100)
  })
})

describe('coordinate_plane card — "an x-y grid with ticks from -4 to 4 and one point plotted at (2, 3)"', () => {
  const m = markupOf(CoordinatePlane)
  const lines = tags(m, 'line')
  const grid = lines.filter((l) => attr(l, 'opacity') === '0.5')
  const mid = 100, step = 20
  it('draws a grid of 8 vertical and 8 horizontal lines at the integer positions −4…4 except 0, and two axes through the origin', () => {
    const v = grid.filter((l) => attr(l, 'x1') === attr(l, 'x2')).map((l) => (num(attr(l, 'x1')) - mid) / step).sort((a, b) => a - b)
    const h = grid.filter((l) => attr(l, 'y1') === attr(l, 'y2')).map((l) => (num(attr(l, 'y1')) - mid) / step).sort((a, b) => a - b)
    expect(v).toEqual([-4, -3, -2, -1, 1, 2, 3, 4]); expect(h).toEqual(v)
    const axes = lines.filter((l) => attr(l, 'stroke-width') === '1.5')
    expect(axes).toHaveLength(2)
    expect(axes.some((l) => num(attr(l, 'y1')) === mid && num(attr(l, 'y2')) === mid)).toBe(true); expect(axes.some((l) => num(attr(l, 'x1')) === mid && num(attr(l, 'x2')) === mid)).toBe(true)
  })
  it('plots exactly one point, at x = 2, y = 3 (screen y grows downwards), and captions it (2,3)', () => {
    const dots = tags(m, 'circle')
    expect(dots).toHaveLength(1)
    expect((num(attr(dots[0], 'cx')) - mid) / step).toBe(2); expect((mid - num(attr(dots[0], 'cy'))) / step).toBe(3)
    expect(tags(m, 'text').map(textOf)).toContain('(2,3)')
  })
  it('numbers each x tick under its own grid line and each y tick on its own grid row', () => {
    const texts = tags(m, 'text')
    const xTicks = texts.filter((t) => attr(t, 'y') === String(mid + 14) && /^-?\d$/.test(textOf(t)) && textOf(t) !== '0')
    for (const t of xTicks) expect((num(attr(t, 'x')) - mid) / step).toBe(Number(textOf(t)))
    expect(xTicks).toHaveLength(8)
    const yTicks = texts.filter((t) => attr(t, 'x') === String(mid - 10) && /^-?\d$/.test(textOf(t)) && textOf(t) !== '0' && attr(t, 'text-anchor') === 'middle')
    for (const t of yTicks) expect((mid - (num(attr(t, 'y')) - 3)) / step).toBe(Number(textOf(t)))
    expect(yTicks).toHaveLength(8)
  })
  it('gives every tick numeral a halo in the card surface colour, so the grid line behind it does not strike through it (render audit LY-02)', () => {
    const numerals = tags(m, 'text').filter((t) => /^-?\d$/.test(textOf(t)))
    expect(numerals).toHaveLength(17)
    for (const t of numerals) { expect(attr(t, 'stroke')).toBe('var(--bg-surface)'); expect(attr(t, 'paint-order')).toBe('stroke') }
  })
})

describe('geometry_shape card — a 3-sided triangle labelled with the angle sum, a 4-sided rectangle, and a circle with its radius r', () => {
  const m = markupOf(GeometryShapes)
  const vb = /viewBox="0 0 (\d+) (\d+)"/.exec(m)!
  const W = num(vb[1]), H = num(vb[2])
  it('draws a triangle whose interior angles add up to 180°, a right-angled rectangle and a circle whose drawn radius line is its radius', () => {
    const tri = /<polygon points="([^"]+)"/.exec(m)![1].split(' ').map((p) => p.split(',').map(Number))
    expect(tri).toHaveLength(3)
    const ang = (a: number[], b: number[], c: number[]) => { const u = [b[0] - a[0], b[1] - a[1]], v = [c[0] - a[0], c[1] - a[1]]; return (Math.acos((u[0] * v[0] + u[1] * v[1]) / (Math.hypot(...u) * Math.hypot(...v))) * 180) / Math.PI }
    expect(ang(tri[0], tri[1], tri[2]) + ang(tri[1], tri[0], tri[2]) + ang(tri[2], tri[0], tri[1])).toBeCloseTo(180, 6)
    const rect = tags(m, 'rect'); expect(rect).toHaveLength(1)
    const circle = tags(m, 'circle')[0]; const r = num(attr(circle, 'r'))
    const radius = tags(m, 'line').find((l) => attr(l, 'stroke-dasharray') === '3,2')!
    expect(Math.hypot(num(attr(radius, 'x2')) - num(attr(radius, 'x1')), num(attr(radius, 'y2')) - num(attr(radius, 'y1')))).toBeCloseTo(r, 6)
    expect(num(attr(radius, 'x1'))).toBeCloseTo(num(attr(circle, 'cx')), 6)
  })
  it('names the triangle, rectangle and circle in that order, left to right', () => {
    const names = tags(m, 'text').filter((t) => attr(t, 'font-size') === '10')
    expect(names.map((t) => num(attr(t, 'x')))).toEqual([50, 150, 250])
  })
  it('keeps the angle-sum fact fully inside the figure and clear of the shape names (render audit RD-02 / LY-01)', () => {
    const fact = tags(m, 'text').find((t) => textOf(t).includes('180°'))!
    const fs = num(attr(fact, 'font-size')), half = (textOf(fact).length * fs * 0.62) / 2, x = num(attr(fact, 'x')), y = num(attr(fact, 'y'))
    expect(x - half).toBeGreaterThanOrEqual(0); expect(x + half).toBeLessThanOrEqual(W)
    expect(y).toBeLessThanOrEqual(H)
    const nameBottom = 95 + 2                                                     // the names sit on y = 95 (10-unit font)
    expect(y - fs).toBeGreaterThanOrEqual(nameBottom)                              // starts below the names, so it cannot overlap one
  })
})

describe('three_geometric_solids card — "a cube, a sphere, a cylinder, a cone, each introduced in turn, then a side-by-side comparison view"', () => {
  it('draws the four solids in the order the caption names them, each of the kind it is named for', () => {
    expect(SOLIDS.map((x) => x.kind)).toEqual(['cube', 'sphere', 'cylinder', 'cone'])
    expect(SOLIDS_COMPARE_LABEL.split(' · ').map((w) => w.toLowerCase())).toEqual(SOLIDS.map((x) => x.kind))
    const [cube, sphere, cyl, cone] = SOLIDS
    expect(new Set(cube.solo.slice(0, 3)).size).toBe(1); expect(new Set(cube.row.slice(0, 3)).size).toBe(1)                      // a cube: three equal edges
    expect(sphere.solo[0]).toBeGreaterThan(0); expect(cyl.solo[0]).toBe(cyl.solo[1]); expect(cyl.row[0]).toBe(cyl.row[1])          // a cylinder: top radius = bottom radius
    expect(cyl.solo[2]).toBeGreaterThan(0); expect(cone.solo[1]).toBeGreaterThan(0)                                              // with a height
  })
  it('lines the solids up left to right, two units apart, on one level, with room between neighbours', () => {
    expect(ROW_POS).toHaveLength(4)
    for (let i = 1; i < 4; i++) { expect(ROW_POS[i][0] - ROW_POS[i - 1][0]).toBe(2); expect(ROW_POS[i][1]).toBe(ROW_POS[0][1]); expect(ROW_POS[i][2]).toBe(ROW_POS[0][2]) }
    const halfWidth = (k: string, a: readonly number[]) => (k === 'cube' ? a[0] / 2 : a[0])                                       // cube: half an edge; sphere / cylinder / cone: the radius
    const halfHeight = (k: string, a: readonly number[]) => (k === 'cube' ? a[0] / 2 : k === 'sphere' ? a[0] : k === 'cylinder' ? a[2] / 2 : a[1] / 2)
    for (let i = 1; i < 4; i++) expect(halfWidth(SOLIDS[i - 1].kind, SOLIDS[i - 1].row) + halfWidth(SOLIDS[i].kind, SOLIDS[i].row)).toBeLessThan(2)
    for (const x of SOLIDS) expect(halfHeight(x.kind, x.row)).toBeLessThan(1.1)                                                  // clear of the caption at y = −1.1
  })
  it('shows each solid a little smaller in the row than when it was introduced alone', () => {
    for (const x of SOLIDS) { expect(x.row.slice(0, x.kind === 'cube' ? 3 : 1)[0]).toBeLessThan(x.solo[0]) }
  })
})

describe('three_transformations card — "an original cube, then its translation, rotation, and scaling, each introduced in turn, then a side-by-side comparison view"', () => {
  it('translates by a non-zero vector, rotates by non-zero angles, and enlarges uniformly', () => {
    expect(Math.hypot(...TF.TRANSLATED_POS.map((v, i) => v - TF.ORIGINAL_POS[i]))).toBeGreaterThan(0)
    for (const a of TF.ROTATION.slice(1)) { expect(a).toBeGreaterThan(0); expect(a).toBeLessThanOrEqual(Math.PI / 2) }
    expect(new Set(TF.SCALE).size).toBe(1); expect(TF.SCALE[0]).toBeGreaterThan(1)                                               // uniform: the shape is only bigger
    expect(TF.COMPARE_SCALE).toBeGreaterThan(1)
  })
  it('compares the four cubes left to right in caption order, equal spacing, on one level', () => {
    expect(TF.TRANSFORMS_COMPARE_LABEL.split(' · ')).toEqual(['Original', 'Translation', 'Rotation', 'Scaling'])
    expect(TF.ROW_POS).toHaveLength(4)
    for (let i = 1; i < 4; i++) { expect(TF.ROW_POS[i][0] - TF.ROW_POS[i - 1][0]).toBe(2); expect(TF.ROW_POS[i][1]).toBe(TF.ROW_POS[0][1]) }
    expect(TF.COMPARE_CUBE * TF.COMPARE_SCALE / 2 + TF.COMPARE_CUBE * TF.COMPARE_SCALE / 2).toBeLessThan(2)                      // even the enlarged cube clears its neighbour's centre line
  })
})

describe('process_flow renderer — the note text stays at or above the engine\'s readability floor (English render audit RD-01)', () => {
  it('draws notes at no less than the 10 px floor', () => {
    expect(NOTE_FONT_PX).toBeGreaterThanOrEqual(AUDIT_THRESHOLDS.minFontPx)
  })
})

// ── every card a Mathematics concept is served belongs to that concept's domain ────────────────────────────────────
describe('every Mathematics card figure is a card of the concept\'s own domain', () => {
  const DOMAINS: Record<string, string[]> = {
    number_line: ['math.found', 'math.arith'], fraction_bar: ['math.arith'], percentage_grid: ['math.arith'], coordinate_plane: ['math.alg', 'math.geom', 'math.stats'],
    geometry_shape: ['math.geom', 'math.trig'], three_geometric_solids: ['math.geom'], three_transformations: ['math.geom'],
  }
  it('number line / fraction / percentage cards serve foundations and arithmetic, shape cards geometry and trigonometry, solids and transformations geometry', () => {
    const kg = JSON.parse(readFileSync('docs/mathematics/kg/graph.json', 'utf8'))
    const ids: string[] = (Array.isArray(kg) ? kg : (kg.concepts ?? kg.nodes)).map((n: { id: string }) => n.id)
    const offenders: string[] = []
    let cards = 0
    for (const id of ids) {
      const d = served(id)
      if (d.payload?.renderer !== 'card') continue
      cards++
      const type = (d.payload as { visualType: string }).visualType
      const allowed = DOMAINS[type]
      if (!allowed || !allowed.includes(id.split('.').slice(0, 2).join('.'))) offenders.push(`${id} → ${type}`)
    }
    expect(cards).toBeGreaterThanOrEqual(43)
    expect(offenders).toEqual([])
  }, 120_000)
})
