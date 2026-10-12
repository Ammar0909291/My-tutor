/**
 * Mathematics visual campaign, batch 2 (2026-10-11): twelve concepts.
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
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB2'

type Obj = { type?: string; text?: string; color?: string; radius?: number; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
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
  ['math.geom.coordinate-plane', M.buildCoordinatePlaneScene, 'math-coordinate-plane'],
  ['math.geom.quadrants', M.buildQuadrantsScene, 'math-quadrants'],
  ['math.geom.midpoint-formula', M.buildMidpointScene, 'math-midpoint'],
  ['math.geom.parallel-lines', M.buildParallelLinesScene, 'math-parallel-lines'],
  ['math.geom.pythagorean-converse', M.buildPythagoreanConverseScene, 'math-pythagorean-converse'],
  ['math.geom.parallelogram', M.buildParallelogramScene, 'math-parallelogram'],
  ['math.geom.line-equation', M.buildLineEquationScene, 'math-line-equation'],
  ['math.func.even-odd-functions', M.buildEvenOddScene, 'math-even-odd-functions'],
  ['math.func.quadratic-function', M.buildQuadraticFunctionScene, 'math-quadratic-function'],
  ['math.func.vertex-form', M.buildVertexFormScene, 'math-vertex-form'],
  ['math.func.exponential-function', M.buildExponentialFunctionScene, 'math-exponential-function'],
  ['math.func.logarithmic-function', M.buildLogarithmicFunctionScene, 'math-logarithmic-function'],
  ['math.func.composition', M.buildCompositionScene, 'math-composition'],
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

describe('the mathematics each figure draws', () => {
  it('Coordinate plane: perpendicular axes cross at the origin, and A, B sit at the addresses their labels give', () => {
    const s = M.buildCoordinatePlaneScene()
    const { u, gx, gy, A, B } = M.CP
    const axes = lines(s, SLATE).filter((o) => o.type === 'arrow')
    expect(axes).toHaveLength(2)
    const horiz = axes.find((o) => near(o.from![1], o.to![1]))!, vert = axes.find((o) => near(o.from![0], o.to![0]))!
    expect(near(horiz.from![1], 0)).toBe(true)                                    // x-axis passes through y = 0
    expect(near(vert.from![0], 0)).toBe(true)                                     // y-axis passes through x = 0
    expect(hasDot(s, 0, 0)).toBe(true)                                            // the origin
    expect(hasDot(s, A[0] * u, A[1] * u)).toBe(true)
    expect(hasDot(s, B[0] * u, B[1] * u)).toBe(true)
    // run (red) goes along x, then rise (blue) along y
    const red = lines(s, RED), blue = lines(s, BLUE)
    expect(red).toHaveLength(2); expect(blue).toHaveLength(2)
    const runA = red.find((o) => o.to![0] > 0)!, riseA = blue.find((o) => o.to![0] > 0)!
    expect(near(len(runA), 3 * u)).toBe(true); expect(near(len(riseA), 2 * u)).toBe(true)
    const runB = red.find((o) => o.to![0] < 0)!, dropB = blue.find((o) => o.to![0] < 0)!
    expect(near(len(runB), 2 * u)).toBe(true); expect(near(len(dropB), 3 * u)).toBe(true)
    expect(runB.to![0]).toBeLessThan(0); expect(dropB.to![1]).toBeLessThan(0)       // negatives go left and down
    // every axis number is placed at value * u
    for (const l of labelsOf(s)) {
      const v = Number((l.text ?? '').replace('−', '-'))
      if (!Number.isFinite(v) || l.text === '') continue
      if (near(l.position![1], -0.3)) expect(near(l.position![0], v * u), `x tick ${l.text}`).toBe(true)
      else if (near(l.position![0], -0.3)) expect(near(l.position![1], v * u), `y tick ${l.text}`).toBe(true)
    }
    expect(gx * u).toBeLessThan(5); expect(gy * u).toBeLessThan(5)
    expect(texts(s)).toEqual(expect.arrayContaining(['A (3, 2)', 'B (−2, −3)']))
  })

  it('Quadrants: the four numerals, sign pairs and example points each agree with the sign of x and y where they are drawn', () => {
    const s = M.buildQuadrantsScene()
    const sg = (n: number) => (n > 0 ? '+' : '−')
    const L = labelsOf(s)
    // numerals sit in the quadrant they name, counter-clockwise from the top right
    const place = { I: [1, 1], II: [-1, 1], III: [-1, -1], IV: [1, -1] } as const
    for (const q of ['I', 'II', 'III', 'IV'] as const) {
      const l = L.find((o) => o.text === q)!
      expect(Math.sign(l.position![0]), q).toBe(place[q][0]); expect(Math.sign(l.position![1]), q).toBe(place[q][1])
    }
    // each sign label "(a, b)" matches the signs of the position it is drawn at
    for (const l of L.filter((o) => /^\([+−], [+−]\)$/.test(o.text ?? ''))) {
      expect(l.text).toBe(`(${sg(l.position![0])}, ${sg(l.position![1])})`)
    }
    expect(L.filter((o) => /^\([+−], [+−]\)$/.test(o.text ?? ''))).toHaveLength(4)
    // each example point is in the quadrant of its own coordinates
    const dd = dots(s)
    expect(dd).toHaveLength(4)
    for (const d of dd) {
      const [x, y] = back(M.QUAD.u)(d.position!)
      const q = M.quadrantOf(Math.round(x), Math.round(y))
      expect(q).not.toBeNull()
      const lab = L.find((o) => (o.text ?? '').startsWith('(') && /\d/.test(o.text ?? '') && near(o.position![0], d.position![0], 0.01) && near(Math.abs(o.position![1] - d.position![1]), 0.5, 0.01))!
      expect(lab.text).toBe(`(${Math.round(x) < 0 ? '−' : ''}${Math.abs(Math.round(x))}, ${Math.round(y) < 0 ? '−' : ''}${Math.abs(Math.round(y))})`)
    }
    expect(M.quadrantOf(0, 3)).toBeNull(); expect(M.quadrantOf(-2, 0)).toBeNull()
    expect(new Set(dd.map((d) => M.quadrantOf(...(back(M.QUAD.u)(d.position!).map(Math.round) as [number, number]))))).toEqual(new Set(['I', 'II', 'III', 'IV']))
  })

  it('Midpoint: M = ((x1+x2)/2, (y1+y2)/2), it is on the segment, and AM = MB', () => {
    const s = M.buildMidpointScene()
    const { u, ox, oy, A, B } = M.MID
    const mid = M.midpoint(A, B)
    expect(mid).toEqual([-1, 1])
    const toMath = back(u, ox, oy)
    const big = dots(s, GREEN).find((d) => d.radius === 0.17)!
    const [mx, my] = toMath(big.position!)
    expect(mx).toBeCloseTo(mid[0], 1); expect(my).toBeCloseTo(mid[1], 1)
    const a = toMath(dots(s, INK).find((d) => near(d.position![0], A[0] * u + ox))!.position!)
    const b = toMath(dots(s, INK).find((d) => near(d.position![0], B[0] * u + ox))!.position!)
    expect(a[0]).toBeCloseTo(A[0], 6); expect(a[1]).toBeCloseTo(A[1], 6); expect(b[0]).toBeCloseTo(B[0], 6); expect(b[1]).toBeCloseTo(B[1], 6)
    expect((a[0] + b[0]) / 2).toBeCloseTo(mx, 6); expect((a[1] + b[1]) / 2).toBeCloseTo(my, 6)
    expect(Math.hypot(mx - a[0], my - a[1])).toBeCloseTo(Math.hypot(b[0] - mx, b[1] - my), 6)   // AM = MB
    // collinear: cross product of AM and AB is 0
    expect((mx - a[0]) * (b[1] - a[1]) - (my - a[1]) * (b[0] - a[0])).toBeCloseTo(0, 6)
    // the drawn guides from A and B hit the axes at their own coordinates
    const onX = dots(s, RED).map((d) => toMath(d.position!)[0]).sort((p, q) => p - q)
    expect(onX[0]).toBeCloseTo(A[0], 6); expect(onX[1]).toBeCloseTo(B[0], 6); expect((onX[0] + onX[1]) / 2).toBeCloseTo(mid[0], 6)
    const onY = dots(s, BLUE).map((d) => toMath(d.position!)[1]).sort((p, q) => p - q)
    expect(onY[0]).toBeCloseTo(A[1], 6); expect(onY[1]).toBeCloseTo(B[1], 6); expect((onY[0] + onY[1]) / 2).toBeCloseTo(mid[1], 6)
    expect(texts(s)).toEqual(expect.arrayContaining(['x = (−4 + 2) ÷ 2 = −1', 'y = (−1 + 3) ÷ 2 = 1', 'M (−1, 1)']))
  })

  it('Parallel lines: the two lines are parallel, and every arc subtends the angle its label states', () => {
    const s = M.buildParallelLinesScene()
    const { gap, theta } = M.PAR
    const ink = lines(s, INK).filter((o) => len(o) > 5)
    expect(ink).toHaveLength(2)
    for (const l of ink) expect(near(l.from![1], l.to![1])).toBe(true)              // both horizontal, so parallel
    expect(near(Math.abs(ink[0].from![1] - ink[1].from![1]), gap)).toBe(true)
    const tr = lines(s, SLATE).find((o) => len(o) > 4)!
    const dir = (Math.atan2(tr.to![1] - tr.from![1], tr.to![0] - tr.from![0]) * 180) / Math.PI
    expect(dir).toBeCloseTo(theta, 0)
    expect(M.transversalAngles(theta)).toEqual({ acute: 60, obtuse: 120 })
    const top = Math.max(ink[0].from![1], ink[1].from![1]), bot = -top
    const T: [number, number] = [M.crossingX(top, theta), top], B: [number, number] = [M.crossingX(bot, theta), bot]
    // the crossing points really are on the transversal
    for (const c of [T, B]) expect(Math.abs((c[0] - tr.from![0]) * (tr.to![1] - tr.from![1]) - (c[1] - tr.from![1]) * (tr.to![0] - tr.from![0]))).toBeLessThan(0.05)
    const sweep = (pts: number[][], c: [number, number]) => {
      const ang = pts.map((p) => ((Math.atan2(p[1] - c[1], p[0] - c[0]) * 180) / Math.PI + 360) % 360)
      return { a0: ang[0], a1: ang[ang.length - 1], width: (ang[ang.length - 1] - ang[0] + 360) % 360 }
    }
    const centreOf = (pts: number[][]) => [T, B].reduce((best, c) => (Math.hypot(pts[0][0] - c[0], pts[0][1] - c[1]) < Math.hypot(pts[0][0] - best[0], pts[0][1] - best[1]) ? c : best))
    const arcs = (color: string) => paths(s, color).map((p) => ({ p, c: centreOf(p.points!), ...sweep(p.points!, centreOf(p.points!)) }))
    const red = arcs(RED), blue = arcs(BLUE), green = arcs(GREEN)
    expect(red).toHaveLength(2); expect(blue).toHaveLength(1); expect(green).toHaveLength(1)
    // corresponding angles: same place at each crossing (one at T, one at B), both from the line to the transversal
    expect(red.map((r) => r.c).sort((p, q) => p[1] - q[1])).toEqual([B, T].sort((p, q) => p[1] - q[1]))
    for (const r of red) { expect(r.a0).toBeCloseTo(0, 0); expect(r.width).toBeCloseTo(60, 0) }
    // alternate interior: at the top crossing, below the line on the left of the transversal (180 to 240 degrees)
    expect(blue[0].c).toEqual(T); expect(blue[0].a0).toBeCloseTo(180, 0); expect(blue[0].width).toBeCloseTo(60, 0)
    // co-interior: the rest of the half-turn below the line, 120 degrees, so with the 60 at the bottom crossing it is a straight angle
    expect(green[0].c).toEqual(T); expect(green[0].width).toBeCloseTo(120, 0)
    expect(green[0].width + red[0].width).toBeCloseTo(180, 0)
    expect(blue[0].width + green[0].width).toBeCloseTo(180, 0)                       // and the two angles below the top line fill a half-turn
    const t = texts(s)
    expect(t.filter((x) => x === '60°')).toHaveLength(3); expect(t).toContain('120°'); expect(t).toContain('120° + 60° = 180°')
  })

  it('Converse of Pythagoras: 5-12-13 has a right angle because 25 + 144 = 169 = 13²; 5-12-14 does not, since 169 ≠ 196', () => {
    const { s: sc, ok, bad } = M.CONV
    expect(ok.a ** 2 + ok.b ** 2).toBe(ok.c ** 2)
    expect(bad.a ** 2 + bad.b ** 2).not.toBe(bad.c ** 2)
    expect(M.angleOppositeC(ok.a, ok.b, ok.c)).toBeCloseTo(90, 9)
    expect(M.angleOppositeC(bad.a, bad.b, bad.c)).toBeGreaterThan(90)
    expect(M.angleOppositeC(bad.a, bad.b, bad.c)).toBeCloseTo(103.0, 0)
    const s = M.buildPythagoreanConverseScene()
    // three drawn sides for each triangle, to scale
    const ink = lines(s, INK).map((o) => len(o)).sort((p, q) => p - q)
    expect(ink).toHaveLength(3)
    expect(ink[0]).toBeCloseTo(5 * sc, 1); expect(ink[1]).toBeCloseTo(12 * sc, 1); expect(ink[2]).toBeCloseTo(13 * sc, 1)
    const grey = lines(s, SLATE).filter((o) => len(o) > 1).map((o) => len(o)).sort((p, q) => p - q)
    expect(grey).toHaveLength(3)
    expect(grey[0]).toBeCloseTo(5 * sc, 1); expect(grey[1]).toBeCloseTo(12 * sc, 1); expect(grey[2]).toBeCloseTo(14 * sc, 1)
    // the 5-12-13 triangle's two short sides really are perpendicular
    const legs = lines(s, INK).filter((o) => near(len(o), 13 * sc, 0.03) === false)
    const vec = (o: Obj) => [o.to![0] - o.from![0], o.to![1] - o.from![1]]
    const [v1, v2] = legs.map(vec)
    const dir = (o: Obj, v: number[]) => v
    expect(Math.abs(v1[0] * v2[0] + v1[1] * v2[1])).toBeLessThan(0.05 * sc * 12)     // dot product ~ 0 (rounding to 0.01)
    expect(dir).toBeDefined()
    // the arc on the failing triangle sweeps the ~103 degrees the label says
    const arc = paths(s, RED)[0].points!
    const c = arc[0].map((v, i) => v - (i === 0 ? 0.5 : 0)) as number[]
    const a1 = (Math.atan2(arc[arc.length - 1][1] - c[1], arc[arc.length - 1][0] - c[0]) * 180) / Math.PI
    expect(Math.round(a1)).toBe(103)
    expect(texts(s)).toEqual(expect.arrayContaining(['25 + 144 = 169 = 13²', '169 ≠ 196 = 14²', '≈ 103°']))
  })

  it('Parallelogram: opposite sides are parallel and equal, the area is base × height = 15, and the slid triangle completes a 5 × 3 rectangle', () => {
    const { u, A, B, C, D } = M.PGRAM
    expect(M.shoelace([A, B, C, D])).toBe(15)
    expect(B[0] - A[0]).toBe(5); expect(D[1] - A[1]).toBe(3)
    expect(M.shoelace([[0, 0], [5, 0], [5, 3], [0, 3]])).toBe(15)                   // the rectangle it becomes
    const s = M.buildParallelogramScene()
    const ink = lines(s, INK).filter((o) => len(o) > 1)
    expect(ink).toHaveLength(4)
    const vec = (o: Obj) => [o.to![0] - o.from![0], o.to![1] - o.from![1]]
    const cross = (a: number[], b: number[]) => a[0] * b[1] - a[1] * b[0]
    const top = ink.find((o) => near(o.from![1], o.to![1]) && o.from![1] > 0)!, bottom = ink.find((o) => near(o.from![1], o.to![1]) && o.from![1] < 0)!
    expect(near(Math.abs(vec(top)[0]), Math.abs(vec(bottom)[0]))).toBe(true)        // equal horizontal sides
    expect(near(Math.abs(vec(top)[0]), 5 * u)).toBe(true)
    const slanted = ink.filter((o) => !near(o.from![1], o.to![1]))
    expect(slanted).toHaveLength(2)
    expect(Math.abs(cross(vec(slanted[0]), vec(slanted[1]))) / (len(slanted[0]) * len(slanted[1]))).toBeLessThan(0.02)    // the other pair is parallel too
    expect(near(len(slanted[0]), len(slanted[1]))).toBe(true)
    expect(Math.abs(top.from![1] - bottom.from![1])).toBeCloseTo(3 * u, 1)         // perpendicular distance = height
    // the green outline of the rectangle: 5 wide, 3 tall
    const green = lines(s, GREEN).filter((o) => len(o) > 1.5 && near(o.from![1], o.to![1]))
    expect(green.some((o) => near(len(o), 5 * u))).toBe(true)
    expect(texts(s)).toEqual(expect.arrayContaining(['base 5', 'height 3', 'area = 5 × 3 = 15']))
  })

  it('Equations of lines: the drawn line is y = 2x + 1, the labelled point (1, 3) is on it, run 1 raises it by 2, and all three printed forms are the same line', () => {
    const s = M.buildLineEquationScene()
    const { u, oy, m, b, px } = M.LINE
    expect(M.lineY(0)).toBe(b); expect(M.lineY(1) - M.lineY(0)).toBe(m); expect(M.lineY(px)).toBe(3)
    const toMath = back(u, 0, oy)
    const ink = lines(s, INK)[0]
    for (const p of [ink.from!, ink.to!]) { const [x, y] = toMath(p); expect(y).toBeCloseTo(2 * x + 1, 1) }
    const green = dots(s, GREEN).map((d) => toMath(d.position!))
    expect(green.some(([x, y]) => near(x, 0, 0.03) && near(y, 1, 0.03))).toBe(true)          // the y-intercept
    const violet = dots(s, VIOLET).map((d) => toMath(d.position!))
    expect(violet.some(([x, y]) => near(x, 1, 0.03) && near(y, 3, 0.03))).toBe(true)         // the point-slope point
    const run = lines(s, RED).find((o) => near(o.from![1], o.to![1]))!, rise = lines(s, BLUE).find((o) => near(o.from![0], o.to![0]))!
    expect(near(len(run), 1 * u)).toBe(true); expect(near(len(rise), 2 * u)).toBe(true)
    expect(len(rise) / len(run)).toBeCloseTo(m, 1)                                            // slope = rise / run
    const [ex, ey] = toMath(rise.to!)                                                         // the rise ends on the line, at the point-slope point
    expect(ey).toBeCloseTo(2 * ex + 1, 1); expect(ex).toBeCloseTo(1, 1); expect(ey).toBeCloseTo(3, 1)
    // the three printed forms describe one line: slope-intercept y = 2x + 1; point-slope y - 3 = 2(x - 1); standard 2x - y = -1
    const std = M.lineStandard()
    expect(std).toEqual({ a: 2, b: -1, c: -1 })
    for (const x of [-3, -1.5, 0, 1, 2.5, 7]) {
      const y = 2 * x + 1
      expect(y - 3).toBeCloseTo(2 * (x - 1), 9)                                               // point-slope holds
      expect(std.a * x + std.b * y).toBeCloseTo(std.c, 9)                                     // standard form holds
    }
    expect(texts(s)).toEqual(expect.arrayContaining(['y = 2x + 1', '(0, 1) = b', 'run 1', 'rise 2', '(1, 3)', 'y \u2212 3 = 2(x \u2212 1)', '2x \u2212 y = \u22121']))
  })

  it('Even and odd functions: x² is even, x³/2 is odd, (x² + x)/2 is neither, and each panel marks the points that show it', () => {
    const { s: sc, centres, x, evenF, oddF, neitherF } = M.EVEN
    for (const t of [0.3, 1, 1.5, 2]) {
      expect(evenF(-t)).toBeCloseTo(evenF(t), 12)
      expect(oddF(-t)).toBeCloseTo(-oddF(t), 12)
      expect(neitherF(-t)).not.toBeCloseTo(neitherF(t), 6); expect(neitherF(-t)).not.toBeCloseTo(-neitherF(t), 6)
    }
    expect(evenF(1.5)).toBe(2.25); expect(oddF(1.5)).toBe(1.6875)
    expect(neitherF(1)).toBe(1); expect(neitherF(-1)).toBe(0)
    const sp = M.buildEvenOddScene()
    const panelOf = (cx: number) => (d: Obj) => Math.abs(d.position![0] - cx) < 1.7
    const toPanel = (cx: number) => (p: number[]): [number, number] => [(p[0] - cx) / sc, p[1] / sc]
    const ev = dots(sp, GREEN).filter(panelOf(centres[0])).map((d) => toPanel(centres[0])(d.position!))
    expect(ev).toHaveLength(2)
    expect(ev[0][1]).toBeCloseTo(ev[1][1], 1); expect(ev[0][0]).toBeCloseTo(-ev[1][0], 1)                // same height, opposite x
    const od = dots(sp, GREEN).filter(panelOf(centres[1])).map((d) => toPanel(centres[1])(d.position!))
    expect(od).toHaveLength(2)
    expect(od[0][1]).toBeCloseTo(-od[1][1], 1); expect(od[0][0]).toBeCloseTo(-od[1][0], 1)                // opposite height AND opposite x
    const ne = dots(sp, VIOLET).map((d) => toPanel(centres[2])(d.position!)).sort((p, q) => p[0] - q[0])
    expect(ne).toHaveLength(2)
    expect(ne[0][1]).toBeCloseTo(0, 1); expect(ne[1][1]).toBeCloseTo(1, 1)
    // every drawn point of each curve lies on its function
    for (const [color, cx, fn] of [[BLUE, centres[0], evenF], [RED, centres[1], oddF], [SLATE, centres[2], neitherF]] as const) {
      const pts = paths(sp, color).find((p) => p.points!.length > 20 && Math.abs(p.points![0][0] - cx) < 1.7)!.points!
      for (const p of pts) { const [px, py] = toPanel(cx)(p); expect(py).toBeCloseTo(fn(px), 1) }
    }
    expect(texts(sp)).toEqual(expect.arrayContaining(['even', 'odd', 'neither']))
  })

  it('Quadratic function: the drawn curve is x² − 2x − 3, its vertex is at x = −b/2a = 1 with f(1) = −4, roots −1 and 3, intercept −3', () => {
    const { a, b, c, u, ox, oy } = M.QUADF
    expect(M.quadVertexX()).toBe(1); expect(M.quadF(1)).toBe(-4); expect(M.quadRoots()).toEqual([-1, 3]); expect(M.quadF(0)).toBe(c)
    expect(a * 1 + b * 1 + c).toBe(-4)
    const s = M.buildQuadraticFunctionScene()
    const toMath = back(u, ox, oy)
    const curve = paths(s, INK)[0].points!
    for (const p of curve) { const [x, y] = toMath(p); expect(y).toBeCloseTo(x * x - 2 * x - 3, 1) }
    const ys = curve.map((p) => toMath(p)[1]); const minY = Math.min(...ys)
    expect(Math.abs(toMath(curve[ys.indexOf(minY)])[0] - 1)).toBeLessThanOrEqual(5.6 / 64)                       // the drawn minimum is at x = 1
    const vertexDot = dots(s, GREEN)[0]; const [vx, vy] = toMath(vertexDot.position!)
    expect(vx).toBeCloseTo(1, 2); expect(vy).toBeCloseTo(-4, 2)
    const axisLine = lines(s, VIOLET)[0]; expect(near(axisLine.from![0], axisLine.to![0])).toBe(true); expect(toMath(axisLine.from!)[0]).toBeCloseTo(1, 2)
    const blue = dots(s, BLUE).map((d) => toMath(d.position!)).sort((p, q) => p[0] - q[0])
    expect(blue).toHaveLength(3)
    expect(blue.map(([x, y]) => [Math.round(x * 100) / 100, Math.round(y * 100) / 100])).toEqual([[-1, 0], [0, -3], [3, 0]])
    expect(texts(s)).toEqual(expect.arrayContaining(['vertex (1, −4)', 'x = −b/2a = 1', '(0, −3) = c', '(−1, 0)', '(3, 0)']))
  })

  it('Vertex form: (x − 2)² + 1 has its minimum at (2, 1); with a = −1 the same vertex is a maximum; both are the parabola y = x² moved', () => {
    const { u, ox, oy, h, k } = M.VF
    expect(M.vertexF(h)).toBe(k); expect(M.vertexF(h, -1)).toBe(k)
    for (const x of [-1, 0, 1, 3, 4]) { expect(M.vertexF(x)).toBeGreaterThan(k); expect(M.vertexF(x, -1)).toBeLessThan(k) }
    const s = M.buildVertexFormScene()
    const toMath = back(u, ox, oy)
    const base = paths(s, SLATE)[0].points!
    for (const p of base) { const [x, y] = toMath(p); expect(y).toBeCloseTo(x * x, 1) }
    const up = paths(s, BLUE)[0].points!, down = paths(s, GREEN)[0].points!
    for (const p of up) { const [x, y] = toMath(p); expect(y).toBeCloseTo((x - 2) ** 2 + 1, 1) }
    for (const p of down) { const [x, y] = toMath(p); expect(y).toBeCloseTo(-((x - 2) ** 2) + 1, 1) }
    const upY = up.map((p) => toMath(p)[1]), downY = down.map((p) => toMath(p)[1])
    expect(toMath(up[upY.indexOf(Math.min(...upY))])[0]).toBeCloseTo(2, 1); expect(Math.min(...upY)).toBeGreaterThanOrEqual(1 - 1e-6)
    expect(toMath(down[downY.indexOf(Math.max(...downY))])[0]).toBeCloseTo(2, 1); expect(Math.max(...downY)).toBeLessThanOrEqual(1 + 1e-6)
    const v = dots(s, GREEN)[0]; const [vx, vy] = toMath(v.position!)
    expect(vx).toBeCloseTo(2, 2); expect(vy).toBeCloseTo(1, 2)
    // the red arrow is the horizontal shift h = 2 and the blue arrow the vertical shift k = 1
    expect(near(len(lines(s, RED).find((o) => o.type === 'arrow')!), 2 * u)).toBe(true)
    expect(near(len(lines(s, BLUE).find((o) => o.type === 'arrow')!), 1 * u)).toBe(true)
    expect(texts(s)).toEqual(expect.arrayContaining(['y = x²', 'vertex (2, 1)', 'right 2', 'up 1', 'a > 0: minimum', 'a < 0: maximum']))
  })

  it('Exponential function: 2^x passes (0, 1), doubles per step, stays above 0, and (1/2)^x is its mirror image in the y-axis', () => {
    const { u, ox, oy } = M.EXPF
    expect(M.expF(0)).toBe(1); expect(M.expF(1)).toBe(2); expect(M.expF(2)).toBe(4)
    expect(M.expF(3) / M.expF(2)).toBe(2)
    for (const x of [-3, -1.5, 0, 0.7, 2]) { expect(M.expF(x, 0.5)).toBeCloseTo(M.expF(-x), 12); expect(M.expF(x)).toBeGreaterThan(0) }
    const s = M.buildExponentialFunctionScene()
    const toMath = back(u, ox, oy)
    const f = paths(s, BLUE)[0].points!, g = paths(s, RED)[0].points!
    for (const p of f) { const [x, y] = toMath(p); expect(y).toBeCloseTo(2 ** x, 1); expect(y).toBeGreaterThan(0) }
    for (const p of g) { const [x, y] = toMath(p); expect(y).toBeCloseTo(0.5 ** x, 1); expect(y).toBeGreaterThan(0) }
    const marks = dots(s, GREEN).map((d) => toMath(d.position!)).sort((p, q) => p[0] - q[0])
    expect(marks).toHaveLength(3)
    marks.forEach(([x, y], i) => { expect(x).toBeCloseTo(i, 1); expect(y).toBeCloseTo(2 ** i, 1) })
    expect(marks[1][1] / marks[0][1]).toBeCloseTo(2, 1); expect(marks[2][1] / marks[1][1]).toBeCloseTo(2, 1)
    expect(texts(s).filter((t) => t === '× 2')).toHaveLength(2)
  })

  it('Logarithmic function: the drawn curve is y = log2 x (so 2^y = x), only for x > 0, and mirrors y = 2^x in y = x', () => {
    const { u, ox, oy, xs } = M.LOGF
    expect(M.logF(1)).toBe(0); expect(M.logF(2)).toBe(1); expect(M.logF(4)).toBe(2); expect(M.logF(8)).toBeCloseTo(3, 12)
    for (const x of [0.25, 0.5, 3, 7]) expect(2 ** M.logF(x)).toBeCloseTo(x, 12)
    const s = M.buildLogarithmicFunctionScene()
    const toMath = back(u, ox, oy)
    const exp = paths(s, BLUE)[0].points!, log = paths(s, GREEN)[0].points!
    for (const p of exp) { const [x, y] = toMath(p); expect(y).toBeCloseTo(2 ** x, 1) }
    for (const p of log) { const [x, y] = toMath(p); expect(x).toBeGreaterThan(0); expect(2 ** y).toBeCloseTo(x, 1) }
    // reflecting every blue marked point in y = x lands exactly on a green marked point
    const blue = dots(s, BLUE).map((d) => toMath(d.position!)), green = dots(s, GREEN).map((d) => toMath(d.position!))
    expect(blue).toHaveLength(xs.length); expect(green).toHaveLength(xs.length)
    for (const [x, y] of blue) expect(green.some(([gx, gy]) => near(gx, y, 0.03) && near(gy, x, 0.03)), `(${x},${y}) mirrored`).toBe(true)
    // the dashed mirror line passes through the origin of the maths at 45 degrees
    const diag = lines(s, VIOLET).find((o) => len(o) > 3)!
    const [dx0, dy0] = toMath(diag.from!), [dx1, dy1] = toMath(diag.to!)
    expect(dy0).toBeCloseTo(dx0, 2); expect(dy1).toBeCloseTo(dx1, 2)
    expect(texts(s)).toEqual(expect.arrayContaining(['y = 2ˣ', 'y = x', 'y = log₂ x', '(4, 2)', 'x > 0 only']))
  })

  it('Composition: f(g(3)) = 25 but g(f(3)) = 11, so the order matters', () => {
    expect(M.COMP.g(3)).toBe(5); expect(M.COMP.f(5)).toBe(25); expect(M.fOfG(3)).toBe(25)
    expect(M.COMP.f(3)).toBe(9); expect(M.COMP.g(9)).toBe(11); expect(M.gOfF(3)).toBe(11)
    expect(M.fOfG(3)).not.toBe(M.gOfF(3))
    const s = M.buildCompositionScene()
    const t = texts(s)
    expect(t).toEqual(expect.arrayContaining(['f(g(3)) = 25', 'g(f(3)) = 11', '≠']))
    // row 1: 3 -> 5 -> 25; row 2: 3 -> 9 -> 11, read left to right along the row
    const L = labelsOf(s)
    const row = (y: number) => L.filter((o) => near(o.position![1], y, 0.01) && /^\d+$/.test(o.text ?? '')).sort((p, q) => p.position![0] - q.position![0]).map((o) => o.text)
    expect(row(1.5)).toEqual(['3', '5', '25']); expect(row(-1.6)).toEqual(['3', '9', '11'])
    const machines = (y: number) => L.filter((o) => near(o.position![1], y, 0.01) && /^[gf]:/.test(o.text ?? '')).sort((p, q) => p.position![0] - q.position![0]).map((o) => o.text)
    expect(machines(1.5)).toEqual(['g: add 2', 'f: square']); expect(machines(-1.6)).toEqual(['f: square', 'g: add 2'])
  })
})
