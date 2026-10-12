/**
 * Mathematics visual campaign, batch 4 (2026-10-11): twelve elementary-geometry concepts.
 * Each test checks the MATHEMATICS the figure draws — the drawn coordinates are mapped
 * back to math coordinates and compared with an independent calculation — not just
 * that a figure exists.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB4'

type Obj = { type?: string; text?: string; color?: string; radius?: number; thickness?: number; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const objs = (s: SceneSpec): Obj[] => s.steps.flatMap((st) => st.objects as Obj[])
const texts = (s: SceneSpec) => objs(s).map((o) => o.text ?? '')
const RED = '#ef4444', BLUE = '#3b82f6', GREEN = '#22c55e', VIOLET = '#a78bfa', SLATE = '#94a3b8', INK = '#e2e8f0'
const lines = (s: SceneSpec, color?: string) => objs(s).filter((o) => (o.type === 'bond' || o.type === 'arrow') && o.from && o.to && (!color || o.color === color))
const dots = (s: SceneSpec, color?: string) => objs(s).filter((o) => o.type === 'node' && o.position && (!color || o.color === color))
const paths = (s: SceneSpec, color?: string) => objs(s).filter((o) => o.type === 'path' && o.points && (!color || o.color === color))
const labelsOf = (s: SceneSpec) => objs(s).filter((o) => o.type === 'label')
const len = (o: Obj) => Math.hypot(o.to![0] - o.from![0], o.to![1] - o.from![1])
const near = (a: number, b: number, tol = 0.02) => Math.abs(a - b) <= tol
const hasDot = (s: SceneSpec, x: number, y: number, tol = 0.025) => dots(s).some((d) => near(d.position![0], x, tol) && near(d.position![1], y, tol))
/** Map screen coordinates back to math coordinates for a figure drawn as (x*u+ox, y*u+oy). */
const back = (u: number, ox = 0, oy = 0) => (p: number[]): [number, number] => [(p[0] - ox) / u, (p[1] - oy) / u]

const BATCH: Array<[string, () => SceneSpec, string]> = [
  ['math.geom.point', M.buildPointScene, 'math-point'],
  ['math.geom.line', M.buildLineScene, 'math-line'],
  ['math.geom.line-segment', M.buildLineSegmentScene, 'math-line-segment'],
  ['math.geom.ray', M.buildRayScene, 'math-ray'],
  ['math.geom.plane', M.buildPlaneScene, 'math-plane'],
  ['math.geom.perpendicular-lines', M.buildPerpendicularLinesScene, 'math-perpendicular-lines'],
  ['math.geom.trapezoid', M.buildTrapezoidScene, 'math-trapezoid'],
  ['math.geom.area', M.buildAreaScene, 'math-area'],
  ['math.geom.translation', M.buildTranslationScene, 'math-translation'],
  ['math.geom.rotation', M.buildRotationScene, 'math-rotation'],
  ['math.geom.reflection', M.buildTransformReflectionScene, 'math-reflection'],
  ['math.geom.dilation', M.buildDilationScene, 'math-dilation'],
]

describe('each concept is served its own figure, as a figure OF the concept', () => {
  it.each(BATCH)('%s', (conceptId, _build, id) => {
    for (const req of [null, 'diagram'] as const) {
      const d = resolveVisual({ message: req ? 'show me a diagram' : '', lessonConceptId: conceptId, learnerRequest: req, subject: 'mathematics' } as Parameters<typeof resolveVisual>[0])
      expect(d.graphical, conceptId).toBe(true)
      expect(d.asset?.scope, conceptId).toBe('concept')
      expect((d.payload as { sceneSpec?: { id?: string } }).sceneSpec?.id).toBe(id)
    }
    expect(isRetiredVisualBinding(conceptId)).toBe(false)
    expect(INSUFFICIENT_FOR_CONCEPT.has(conceptId)).toBe(false)
  })
  it.each(['math.linalg.vector-addition', 'math.func.linear-function'])('%s is deliberately still figure-less (reserved fixture for the AI-generation tests)', (conceptId) => {
    const d = resolveVisual({ message: '', lessonConceptId: conceptId, learnerRequest: null, subject: 'mathematics' } as Parameters<typeof resolveVisual>[0])
    expect(d.asset?.scope).not.toBe('concept')
  })
})

describe('every figure is well-formed', () => {
  it.each(BATCH)('%s passes the scene validator the renderer uses', (_id, build) => {
    const v = validateSceneSpec(build()) as { valid?: boolean; ok?: boolean; errors?: unknown }
    expect(v.valid ?? v.ok, JSON.stringify(v.errors ?? v)).toBe(true)
  })
  it.each(BATCH)('%s keeps every coordinate inside +-5', (conceptId, build) => {
    for (const o of objs(build())) {
      for (const p of [o.from, o.to, o.position, ...(o.points ?? [])].filter(Boolean) as number[][]) {
        expect(Math.abs(p[0]), `${conceptId} x`).toBeLessThanOrEqual(5)
        expect(Math.abs(p[1]), `${conceptId} y`).toBeLessThanOrEqual(5)
      }
    }
  })
  it.each(BATCH)('%s fits the intermediate label budget (marks of 1-2 characters are free)', (_id, build) => {
    const named = labelsOf(build()).filter((o) => !isGlyphLabel(o as never))
    expect(named.length).toBeLessThanOrEqual(complexityFor('intermediate').maxLabels)
    expect(named.length).toBeGreaterThan(0)
  })
  it.each(BATCH)('%s stays under the 50-objects-per-step limit', (_id, build) => {
    for (const st of build().steps) expect(st.objects.length).toBeLessThanOrEqual(50)
  })
  it.each(BATCH)('%s has three cumulative steps with narration', (_id, build) => {
    const s = build()
    expect(s.steps).toHaveLength(3)
    for (const st of s.steps) expect((st.narration ?? '').length).toBeGreaterThan(20)
    expect((s.ariaLabel ?? '').length).toBeGreaterThan(60)
  })
  it.each(BATCH)('%s uses only semantic role colours and a framing camera distance', (_id, build) => {
    const roles = new Set([SLATE, INK, RED, BLUE, VIOLET, GREEN])
    const s = build()
    for (const o of objs(s)) if (o.color) expect(roles.has(o.color.toLowerCase()), `${o.type} ${o.color}`).toBe(true)
    expect(s.cameraDistance!).toBeGreaterThanOrEqual(7)
    expect(s.cameraDistance!).toBeLessThanOrEqual(13)
  })
})

type XY = [number, number]
const dirOf = (o: Obj): XY => [o.to![0] - o.from![0], o.to![1] - o.from![1]]
const crossV = (a: XY, b: XY) => a[0] * b[1] - a[1] * b[0]
const dotV = (a: XY, b: XY) => a[0] * b[0] + a[1] * b[1]
/** Distinct corner points (rounded to 0.01) of a set of segments. */
const corners = (ls: Obj[]): XY[] => {
  const seen = new Map<string, XY>()
  for (const l of ls) for (const p of [l.from!, l.to!]) seen.set(`${Math.round(p[0] * 100)},${Math.round(p[1] * 100)}`, [p[0], p[1]])
  return [...seen.values()]
}
/** Order a convex polygon's corners counter-clockwise around their centroid. */
const ccw = (pts: XY[]): XY[] => {
  const c: XY = [pts.reduce((s, p) => s + p[0], 0) / pts.length, pts.reduce((s, p) => s + p[1], 0) / pts.length]
  return [...pts].sort((a, b) => Math.atan2(a[1] - c[1], a[0] - c[0]) - Math.atan2(b[1] - c[1], b[0] - c[0]))
}
/** The three corners of the triangle drawn in one colour, as maths coordinates. */
const triOf = (s: SceneSpec, color: string, toMath: (p: number[]) => XY): XY[] => corners(lines(s, color).filter((o) => len(o) > 0.5 && (o as Obj).thickness === 0.06)).map((p) => toMath(p))
const sameSet = (a: XY[], b: XY[], tol = 0.03) => a.length === b.length && a.every((p) => b.some((q) => near(p[0], q[0], tol) && near(p[1], q[1], tol)))

describe('the mathematics each figure draws', () => {
  it('Point: the crosshair is centred on the dot, the segment has the stated length and the square the stated sides', () => {
    const { xs, y, seg, side } = M.POINT
    const s = M.buildPointScene()
    const d = dots(s, RED)[0]
    expect(near(d.position![0], xs[0], 0.01) && near(d.position![1], y, 0.01)).toBe(true)
    const cross = lines(s, SLATE)
    expect(cross).toHaveLength(2)
    for (const l of cross) expect(near((l.from![0] + l.to![0]) / 2, xs[0], 0.01) && near((l.from![1] + l.to![1]) / 2, y, 0.01)).toBe(true)   // both lines cross AT the point
    expect(Math.abs(dotV(dirOf(cross[0]), dirOf(cross[1])))).toBeLessThan(1e-6)
    const sg = lines(s, BLUE)[0]; expect(near(len(sg), seg)).toBe(true)
    const sq = lines(s, GREEN); expect(sq).toHaveLength(4)
    for (const l of sq) expect(near(len(l), side)).toBe(true)
    expect(texts(s)).toEqual(expect.arrayContaining(['A', 'point: only a location', 'segment: length', 'square: length and width']))
  })

  it('Line: A and B are on the drawn line, the line has an arrowhead at both ends, and the other lines through A miss B', () => {
    const { A, B, other } = M.LINE2
    const s = M.buildLineScene()
    const ink = lines(s, INK)
    expect(ink).toHaveLength(2)
    for (const a of ink) for (const p of [A, B]) expect(Math.abs(crossV(dirOf(a), [p[0] - a.from![0], p[1] - a.from![1]]))).toBeLessThan(0.05)   // A and B lie on both arrows' line
    expect(dotV(dirOf(ink[0]), dirOf(ink[1]))).toBeLessThan(0)                   // the two arrows point opposite ways
    expect(ink.every((a) => a.type === 'arrow')).toBe(true)
    const aid = lines(s, VIOLET)
    expect(aid).toHaveLength(4)                                                  // two lines through A, each drawn as two arrows from A
    for (const a of aid) {
      expect(near(a.from![0], A[0], 0.01) && near(a.from![1], A[1], 0.01)).toBe(true)
      expect(Math.abs(crossV(dirOf(a), [B[0] - A[0], B[1] - A[1]])) / (len(a) * M.dist(A, B))).toBeGreaterThan(0.1)   // none of them passes through B
    }
    expect(other).toHaveLength(2)
    expect(texts(s)).toEqual(expect.arrayContaining(['A', 'B', 'line AB', 'many lines through A', 'only one through A and B']))
  })

  it('Line segment: the thick segment runs exactly from A to B, the ruler has 6 ticks one unit apart, and AB = 5', () => {
    const { A, B, rulerY } = M.SEG
    const s = M.buildLineSegmentScene()
    const seg = lines(s, INK)[0]
    expect(near(seg.from![0], A[0], 0.01) && near(seg.to![0], B[0], 0.01)).toBe(true)
    expect(near(len(seg), 5)).toBe(true); expect(M.dist(A, B)).toBe(5)
    const ticks = lines(s, SLATE).filter((o) => near(o.from![0], o.to![0]) && near(len(o), 0.22, 0.01)).map((o) => o.from![0]).sort((p, q) => p - q)
    expect(ticks).toHaveLength(6)
    ticks.forEach((x, i) => expect(near(x, A[0] + i, 0.01)).toBe(true))
    const ruler = lines(s, SLATE).find((o) => near(o.from![1], rulerY, 0.01) && near(o.to![1], rulerY, 0.01))!
    expect(near(len(ruler), 5)).toBe(true)
    expect(dots(s, RED)).toHaveLength(2)
    expect(texts(s)).toEqual(expect.arrayContaining(['segment AB', 'length AB = 5']))
  })

  it('Ray: ray AB starts at A and passes through B; ray BA starts at B and passes through A, the other way', () => {
    const { A, B, A2, B2, reach } = M.RAY
    const s = M.buildRayScene()
    const arrows = lines(s).filter((o) => o.type === 'arrow')
    expect(arrows).toHaveLength(2)
    const ab = arrows.find((o) => o.color === INK)!, ba = arrows.find((o) => o.color === GREEN)!
    expect(near(ab.from![0], A[0], 0.01) && near(ab.from![1], A[1], 0.01)).toBe(true)           // starts at A
    const tB = (B[0] - ab.from![0]) / (ab.to![0] - ab.from![0]); expect(tB).toBeGreaterThan(0); expect(tB).toBeLessThan(1)   // B is on the ray
    expect(near(ab.to![0], reach, 0.01)).toBe(true)
    expect(near(ba.from![0], B2[0], 0.01) && near(ba.from![1], B2[1], 0.01)).toBe(true)         // starts at B
    const tA = (A2[0] - ba.from![0]) / (ba.to![0] - ba.from![0]); expect(tA).toBeGreaterThan(0); expect(tA).toBeLessThan(1)   // A is on it
    expect(dotV(dirOf(ab), dirOf(ba))).toBeLessThan(0)                                           // opposite directions
    expect(texts(s)).toEqual(expect.arrayContaining(['endpoint', 'ray AB', 'ray BA']))
  })

  it('Plane: A, B, C are not collinear and lie inside the sheet, which is a parallelogram; each extended line passes through two of the points', () => {
    const { sheet, pts } = M.PLANE
    expect(Math.abs(M.cross2(pts[0], pts[1], pts[2]))).toBeGreaterThan(1)
    for (const p of pts) expect(M.insidePoly(p, sheet)).toBe(true)
    // the sheet is a parallelogram: opposite sides parallel and equal
    expect(Math.abs(crossV([sheet[1][0] - sheet[0][0], sheet[1][1] - sheet[0][1]], [sheet[2][0] - sheet[3][0], sheet[2][1] - sheet[3][1]]))).toBeLessThan(1e-9)
    expect(Math.abs(crossV([sheet[3][0] - sheet[0][0], sheet[3][1] - sheet[0][1]], [sheet[2][0] - sheet[1][0], sheet[2][1] - sheet[1][1]]))).toBeLessThan(1e-9)
    const s = M.buildPlaneScene()
    const d = dots(s, RED).map((o) => o.position!.slice(0, 2) as XY)
    expect(sameSet(d, pts as unknown as XY[], 0.01)).toBe(true)
    const edge = lines(s, BLUE).filter((o) => (o as Obj).thickness === 0.05)
    expect(edge).toHaveLength(4)
    const ext = lines(s, VIOLET)
    expect(ext).toHaveLength(3)
    const pairs: Array<[XY, XY]> = [[pts[0], pts[1]], [pts[1], pts[2]], [pts[2], pts[0]]]
    for (const a of ext) expect(pairs.some(([p, q]) => [p, q].every((pt) => Math.abs(crossV(dirOf(a), [pt[0] - a.from![0], pt[1] - a.from![1]])) < 0.05))).toBe(true)
    expect(texts(s)).toEqual(expect.arrayContaining(['plane ABC']))
  })

  it('Perpendicular lines: the first pair meets at 90°, PF is perpendicular to L and the shortest of all segments from P to L (3 < 5)', () => {
    const { u, oy, P: Pp, F, Q, R } = M.PERP
    const s = M.buildPerpendicularLinesScene()
    const ink = lines(s, INK)
    expect(ink).toHaveLength(2)
    expect(Math.abs(dotV(dirOf(ink[0]), dirOf(ink[1])))).toBeLessThan(1e-6)
    const toMath = back(u, 0, oy)
    const pf = lines(s, GREEN).find((o) => (o as Obj).thickness === 0.07)!
    expect(Math.abs(dotV(dirOf(pf), dirOf(ink.find((o) => near(o.from![1], o.to![1]))!)))).toBeLessThan(1e-6)   // PF is perpendicular to L
    const [fx, fy] = toMath(pf.to!), [px, py] = toMath(pf.from!)
    expect(fx).toBeCloseTo(F[0], 1); expect(fy).toBeCloseTo(F[1], 1); expect(px).toBeCloseTo(Pp[0], 1); expect(py).toBeCloseTo(Pp[1], 1)
    const slant = lines(s, RED).filter((o) => (o as Obj).thickness === 0.045)
    expect(slant).toHaveLength(2)
    for (const l of slant) expect(len(l)).toBeGreaterThan(len(pf))                // every slanted segment is longer
    expect(near(len(pf), 3 * u)).toBe(true); for (const l of slant) expect(near(len(l), 5 * u)).toBe(true)
    expect(3 ** 2 + 4 ** 2).toBe(5 ** 2)
    // the distance from P to any point (t, 0) of L is at least 3, with equality only at the foot
    for (let t = -6; t <= 6; t += 0.25) expect(Math.hypot(t - Pp[0], Pp[1])).toBeGreaterThanOrEqual(3 - 1e-9)
    expect(Math.hypot(Q[0] - Pp[0], Q[1] - Pp[1])).toBe(5); expect(Math.hypot(R[0] - Pp[0], R[1] - Pp[1])).toBe(5)
    expect(texts(s)).toEqual(expect.arrayContaining(['90\u00B0', 'perpendicular', 'shortest: 3 < 5']))
  })

  it('Trapezoid: bases 4 and 8 are parallel, the legs are not, area = ½(4 + 8)·3 = 18, and the upside-down copy completes a parallelogram of area 36', () => {
    const { u, poly, b1, b2, h } = M.TRAP
    expect(M.shoelaceArea(poly)).toBe(18); expect(M.trapezoidArea(b1, b2, h)).toBe(18)
    const copy = poly.map((p) => M.rot180(p, [(poly[1][0] + poly[2][0]) / 2, (poly[1][1] + poly[2][1]) / 2]))
    expect(M.shoelaceArea(copy)).toBe(18)
    const par = ccw([poly[0], poly[1], copy[0], copy[3]].map((p) => p as XY)) // the union's outline: (0,0) (12,0) (14,3) (2,3)
    expect(M.shoelaceArea([[0, 0], [12, 0], [14, 3], [2, 3]])).toBe(36)
    expect(par).toHaveLength(4)
    // exactly one pair of parallel sides in the trapezoid
    const side = (i: number) => [poly[(i + 1) % 4][0] - poly[i][0], poly[(i + 1) % 4][1] - poly[i][1]] as XY
    expect(Math.abs(crossV(side(0), side(2)))).toBe(0)                           // bottom || top
    expect(Math.abs(crossV(side(1), side(3)))).toBeGreaterThan(0)                // the legs are not parallel
    const s = M.buildTrapezoidScene()
    // drawn: the ink outline has the two bases of length 4u and 8u
    const outline = lines(s, INK).filter((o) => (o as Obj).thickness === 0.06)
    const horizontals = outline.filter((o) => near(o.from![1], o.to![1])).map(len).sort((p, q) => p - q)
    expect(near(horizontals[0], 4 * u)).toBe(true); expect(near(horizontals[1], 8 * u)).toBe(true)
    // drawn: the green copy's corners are the original's corners turned half a turn about the midpoint of the right leg
    const green = corners(lines(s, GREEN).filter((o) => (o as Obj).thickness === 0.05))
    expect(green).toHaveLength(4)
    const ox = -7 * u, oy = -1.5 * u
    const toMath = (p: number[]): XY => [(p[0] - ox) / u, (p[1] - oy) / u]
    expect(sameSet(green.map(toMath), copy, 0.04)).toBe(true)
    expect(texts(s)).toEqual(expect.arrayContaining(['b\u2081 = 4', 'b\u2082 = 8', 'h = 3', 'parallelogram: 12 \u00D7 3 = 36', 'trapezoid: \u00BD(4 + 8) \u00D7 3 = 18']))
  })

  it('Area: the rectangle covers 4 × 3 = 12 unit squares, the triangle half of that, and the L-shape 12 + 2 = 14', () => {
    const { u, rect, tri, extra } = M.AREA
    const s = M.buildAreaScene()
    const blue = lines(s, BLUE)
    const verticals = blue.filter((o) => near(o.from![0], o.to![0])), horizontals = blue.filter((o) => near(o.from![1], o.to![1]))
    expect(verticals).toHaveLength(2 * (rect[0] + 1)); expect(horizontals).toHaveLength(2 * (rect[1] + 1))    // two copies of the grid (rectangle and L-shape)
    for (const v of verticals) expect(near(len(v), rect[1] * u)).toBe(true)
    for (const hz of horizontals) expect(near(len(hz), rect[0] * u)).toBe(true)
    // unit squares: spacing of the grid lines is exactly one unit
    const xs = [...new Set(verticals.map((o) => Math.round(o.from![0] * 1000) / 1000))].sort((p, q) => p - q)
    expect(xs).toHaveLength(rect[0] + 1)
    for (let i = 1; i < xs.length; i++) expect(near(xs[i] - xs[i - 1], u, 0.01)).toBe(true)
    expect(rect[0] * rect[1]).toBe(12)
    const tr = corners(lines(s, GREEN).filter((o) => (o as Obj).thickness === 0.06)).map((p) => [p[0] / u, p[1] / u] as XY)
    expect(tr).toHaveLength(3)
    expect(M.shoelaceArea(tr)).toBeCloseTo((tri[0] * tri[1]) / 2, 1)
    const red = lines(s, RED)
    expect(red.filter((o) => near(o.from![1], o.to![1]) && near(len(o), extra[0] * u)).length).toBeGreaterThanOrEqual(2)
    expect(red.filter((o) => near(o.from![0], o.to![0]) && near(len(o), extra[1] * u)).length).toBeGreaterThanOrEqual(2)
    expect(rect[0] * rect[1] + extra[0] * extra[1]).toBe(14)
    expect(texts(s)).toEqual(expect.arrayContaining(['4 \u00D7 3 = 12', '\u00BD \u00D7 4 \u00D7 3 = 6', '12 + 2 = 14']))
  })

  it('Translation: every vertex moves by the same vector (4, 2); the image is congruent and faces the same way', () => {
    const { u, ox, oy, tri, v } = M.TRANS
    const toMath = back(u, ox, oy)
    const s = M.buildTranslationScene()
    const arrows = lines(s, VIOLET)
    expect(arrows).toHaveLength(3)
    for (const a of arrows) { const [dx, dy] = dirOf(a); expect(dx / u).toBeCloseTo(v[0], 1); expect(dy / u).toBeCloseTo(v[1], 1) }   // all three displacements are (4, 2)
    const orig = triOf(s, RED, toMath), img = triOf(s, GREEN, toMath)
    expect(orig).toHaveLength(3); expect(img).toHaveLength(3)
    expect(sameSet(orig, tri as unknown as XY[], 0.03)).toBe(true)
    expect(sameSet(img, tri.map((p) => M.translate(p, v)), 0.03)).toBe(true)
    const sides = (t: XY[]) => [M.dist(t[0], t[1]), M.dist(t[1], t[2]), M.dist(t[2], t[0])].sort((p, q) => p - q)
    sides(orig).forEach((d, i) => expect(d).toBeCloseTo(sides(img)[i], 1))
    expect(Math.sign(M.signedArea(ccw(orig)))).toBe(Math.sign(M.signedArea(ccw(img))))          // orientation preserved
    expect(M.shoelaceArea(orig)).toBeCloseTo(M.shoelaceArea(img), 1)
    expect(texts(s)).toEqual(expect.arrayContaining(['vector (4, 2)', 'A\u2032', 'B\u2032', 'C\u2032']))
  })

  it('Rotation: the image is the original turned 90° counter-clockwise about O, each vertex keeps its distance from O, and each arc sweeps 90°', () => {
    const { u, ox, oy, tri, deg } = M.ROT
    const toMath = back(u, ox, oy)
    const s = M.buildRotationScene()
    const orig = triOf(s, RED, toMath), img = triOf(s, GREEN, toMath)
    expect(orig).toHaveLength(3); expect(img).toHaveLength(3)
    expect(sameSet(orig, tri as unknown as XY[], 0.03)).toBe(true)
    expect(sameSet(img, tri.map((p) => M.rotate(p, deg)), 0.03)).toBe(true)
    expect(M.rotate([2, 0], 90)[0]).toBeCloseTo(0, 12); expect(M.rotate([2, 0], 90)[1]).toBeCloseTo(2, 12)
    for (const p of tri) { const q = M.rotate(p, deg); expect(Math.hypot(q[0], q[1])).toBeCloseTo(Math.hypot(p[0], p[1]), 12); expect(q[0]).toBeCloseTo(-p[1], 12); expect(q[1]).toBeCloseTo(p[0], 12) }
    expect(Math.sign(M.signedArea(ccw(orig)))).toBe(Math.sign(M.signedArea(ccw(img))))
    const arcs = paths(s, VIOLET)
    expect(arcs).toHaveLength(3)
    for (const a of arcs) {
      const pts = a.points!.map((p) => toMath(p))
      const ang = (p: XY) => (Math.atan2(p[1], p[0]) * 180) / Math.PI
      expect(ang(pts[pts.length - 1]) - ang(pts[0])).toBeCloseTo(90, 0)
      const r0 = Math.hypot(...pts[0]); for (const p of pts) expect(Math.hypot(p[0], p[1])).toBeCloseTo(r0, 1)   // a circle about O
      expect(orig.some((o) => near(o[0], pts[0][0], 0.04) && near(o[1], pts[0][1], 0.04))).toBe(true)       // starts at an original vertex
      expect(img.some((o) => near(o[0], pts[pts.length - 1][0], 0.04) && near(o[1], pts[pts.length - 1][1], 0.04))).toBe(true)   // ends at its image
    }
    expect(texts(s)).toEqual(expect.arrayContaining(['centre O', '90\u00B0', '(x, y) \u2192 (\u2212y, x)']))
  })

  it('Reflection: the image is (−x, y); each guide is perpendicular to the mirror and cut in half by it; the corner order reverses', () => {
    const { u, oy, tri } = M.REFL
    const toMath = back(u, 0, oy)
    const s = M.buildTransformReflectionScene()
    const orig = triOf(s, RED, toMath), img = triOf(s, GREEN, toMath)
    expect(sameSet(orig, tri as unknown as XY[], 0.03)).toBe(true)
    expect(sameSet(img, tri.map(M.reflectY), 0.03)).toBe(true)
    const guides = lines(s, VIOLET).filter((o) => (o as Obj).thickness === 0.025)
    expect(guides).toHaveLength(3)
    for (const g of guides) {
      expect(near(g.from![1], g.to![1], 0.01)).toBe(true)                        // horizontal, so perpendicular to the vertical mirror
      expect(near((g.from![0] + g.to![0]) / 2, 0, 0.01)).toBe(true)              // the mirror cuts it in half: equal distances
    }
    const mirror = lines(s, VIOLET).find((o) => (o as Obj).thickness === 0.045)!
    expect(near(mirror.from![0], 0, 0.001) && near(mirror.to![0], 0, 0.001)).toBe(true)
    expect(M.signedArea(tri as unknown as XY[])).toBeGreaterThan(0)                  // A → B → C turns left
    expect(M.signedArea(tri.map(M.reflectY))).toBeLessThan(0)                        // A′ → B′ → C′ turns right
    expect(M.signedArea(tri as unknown as XY[])).toBeCloseTo(-M.signedArea(tri.map(M.reflectY)), 12)   // same size
    expect(texts(s)).toEqual(expect.arrayContaining(['mirror m', 'same size, order reversed']))
  })

  it('Dilation: the image is 2× the original from O; rays from O pass through both; sides double and stay parallel; angles are equal', () => {
    const { u, ox, oy, tri, k } = M.DIL
    const toMath = back(u, ox, oy)
    const s = M.buildDilationScene()
    const orig = triOf(s, RED, toMath), img = triOf(s, GREEN, toMath)
    expect(sameSet(orig, tri as unknown as XY[], 0.03)).toBe(true)
    expect(sameSet(img, tri.map((p) => M.dilate(p, k)), 0.03)).toBe(true)
    const rays = lines(s, VIOLET)
    expect(rays).toHaveLength(3)
    for (const r of rays) {
      const end = toMath(r.to!)
      expect(Math.abs(crossV(end, toMath(r.from!)))).toBeLessThan(0.03)         // from O
      expect(tri.some((p) => Math.abs(crossV(end, p)) < 0.05 && Math.hypot(end[0], end[1]) > Math.hypot(p[0], p[1]))).toBe(true)   // passes through an original vertex and goes on
    }
    for (let i = 0; i < 3; i++) {
      const a = tri[i], b = tri[(i + 1) % 3]
      const A2 = M.dilate(a, k), B2 = M.dilate(b, k)
      expect(M.dist(A2, B2)).toBeCloseTo(k * M.dist(a, b), 12)                   // sides ×k
      expect(Math.abs(crossV([b[0] - a[0], b[1] - a[1]], [B2[0] - A2[0], B2[1] - A2[1]]))).toBeLessThan(1e-12)   // parallel
    }
    expect(M.shoelaceArea(tri.map((p) => M.dilate(p, k)))).toBeCloseTo(k * k * M.shoelaceArea(tri as unknown as XY[]), 9)   // area ×k²
    expect(texts(s)).toEqual(expect.arrayContaining(['centre O', 'k = 2', 'similar: sides \u00D7 2']))
  })
})
