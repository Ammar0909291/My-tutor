/**
 * Mathematics visual campaign, batch 23 (2026-10-12): optimisation (unconstrained, convex functions and sets, linear programming,
 * Lagrange multipliers, gradient descent), numerical analysis (Newton, interpolation, differentiation, integration), real-valued
 * functions, polynomial roots and manifolds. Curves are read back from the DRAWN coordinates and checked against their formula;
 * iterates, secant slopes, areas, polygons, hulls and feasible regions are recomputed from the drawing.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB23'

type Obj = { type?: string; text?: string; color?: string; radius?: number; thickness?: number; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const objs = (s: SceneSpec): Obj[] => s.steps.flatMap((st) => st.objects as Obj[])
const texts = (s: SceneSpec) => objs(s).map((o) => o.text ?? '')
const RED = '#ef4444', BLUE = '#3b82f6', GREEN = '#22c55e', VIOLET = '#a78bfa', SLATE = '#94a3b8', INK = '#e2e8f0'
const lines = (s: SceneSpec, color?: string) => objs(s).filter((o) => (o.type === 'bond' || o.type === 'arrow') && o.from && o.to && (!color || o.color === color))
const bonds = (s: SceneSpec, color: string, thickness: number) => lines(s, color).filter((o) => o.type === 'bond' && near(o.thickness ?? 0, thickness, 1e-9))
const arrows = (s: SceneSpec, color: string) => lines(s, color).filter((o) => o.type === 'arrow')
const dots = (s: SceneSpec, color?: string) => objs(s).filter((o) => o.type === 'node' && o.position && (!color || o.color === color))
const paths = (s: SceneSpec, color?: string) => objs(s).filter((o) => o.type === 'path' && o.points && (!color || o.color === color))
const labelsOf = (s: SceneSpec) => objs(s).filter((o) => o.type === 'label')
const len = (o: Obj) => Math.hypot(o.to![0] - o.from![0], o.to![1] - o.from![1])
const near = (a: number, b: number, tol = 0.02) => Math.abs(a - b) <= tol
const sum = (xs: readonly number[]) => xs.reduce((s, v) => s + v, 0)
const disp = (o: Obj, u: number): [number, number] => [(o.to![0] - o.from![0]) / u, (o.to![1] - o.from![1]) / u]
const crossz = (p: readonly number[], q: readonly number[]) => p[0] * q[1] - p[1] * q[0]
const dotp = (p: readonly number[], q: readonly number[]) => p[0] * q[0] + p[1] * q[1]
const approx = (v: readonly number[], tol = 1) => v.map((x) => expect.closeTo(x, tol))
const slope = (o: Obj) => (o.to![1] - o.from![1]) / (o.to![0] - o.from![0])
/** Distance from point p to the infinite line through a drawn segment. */
const distToLine = (o: Obj, p: number[]) => Math.abs(crossz([o.to![0] - o.from![0], o.to![1] - o.from![1]], [p[0] - o.from![0], p[1] - o.from![1]])) / len(o)
const extent = (p: Obj) => { const xs = p.points!.map((q) => q[0]), ys = p.points!.map((q) => q[1]); return { cx: (Math.max(...xs) + Math.min(...xs)) / 2, cy: (Math.max(...ys) + Math.min(...ys)) / 2, rx: (Math.max(...xs) - Math.min(...xs)) / 2, ry: (Math.max(...ys) - Math.min(...ys)) / 2 } }

const BATCH: Array<[string, () => SceneSpec, string]> = [
  ['math.opt.unconstrained-optimization', M.buildUnconstrainedOptimizationScene, 'math-unconstrained-optimization'],
  ['math.opt.convex-function', M.buildConvexFunctionScene, 'math-convex-function'],
  ['math.opt.convex-set', M.buildConvexSetScene, 'math-convex-set'],
  ['math.opt.linear-programming', M.buildLinearProgrammingScene, 'math-linear-programming'],
  ['math.opt.lagrange-multipliers', M.buildLagrangeMultipliersScene, 'math-lagrange-multipliers'],
  ['math.opt.gradient-methods', M.buildGradientMethodsScene, 'math-gradient-methods'],
  ['math.num.newtons-method', M.buildNewtonsMethodScene, 'math-newtons-method'],
  ['math.num.interpolation', M.buildInterpolationScene, 'math-interpolation'],
  ['math.num.numerical-differentiation', M.buildNumericalDifferentiationScene, 'math-numerical-differentiation'],
  ['math.num.numerical-integration', M.buildNumericalIntegrationScene, 'math-numerical-integration'],
  ['math.func.real-valued-function', M.buildRealValuedFunctionScene, 'math-real-valued-function'],
  ['math.func.rational-root', M.buildRationalRootScene, 'math-polynomial-roots'],
  ['math.top.manifold', M.buildTopologicalManifoldScene, 'math-topological-manifold'],
]

describe('each concept is served its own figure, as a figure OF the concept', () => {
  it.each(BATCH)('%s', (conceptId, _build, id) => {
    for (const req of [null, 'diagram'] as const) {
      const d = resolveVisual({ message: req ? 'show me a diagram' : '', lessonConceptId: conceptId, learnerRequest: req, subject: 'mathematics' } as Parameters<typeof resolveVisual>[0])
      expect(d.graphical, `${conceptId} ${d.provenance}`).toBe(true)
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
  it.each(BATCH)('%s passes the figure audit that admits a figure to a learner (no blockers)', (_id, build) => {
    expect(payloadBlockers({ renderer: 'scene', sceneSpec: build() } as never)).toEqual([])
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
  it.each(BATCH)('%s never draws a zero-length line', (_id, build) => {
    for (const o of lines(build())) expect(len(o)).toBeGreaterThan(0)
  })
})


// ── helpers ────────────────────────────────────────────────────────────────────────────────
const mean = (xs: number[]) => sum(xs) / xs.length
const dist = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1])
const pathsOf = (s: SceneSpec, color: string, min = 8) => paths(s, color).filter((p) => p.points!.length >= min)
const fitCircle = (p: Obj) => { const pts = p.points!.slice(0, -1), cx = mean(pts.map((q) => q[0])), cy = mean(pts.map((q) => q[1])); return { c: [cx, cy], r: mean(pts.map((q) => Math.hypot(q[0] - cx, q[1] - cy))) } }
const labelAt = (s: SceneSpec, p: number[], tol = 0.06) => labelsOf(s).find((o) => dist(o.position!, p) < tol)
const sgn = (v: number) => (v > 1e-9 ? 1 : v < -1e-9 ? -1 : 0)
/** a map from screen to math units */
const inv = (ox: number, oy: number, ux: number, uy: number) => (p: number[]): [number, number] => [(p[0] - ox) / ux, (p[1] - oy) / uy]

describe('the mathematics each figure draws', () => {
  it('Unconstrained optimisation: the curve is (x² − 1)² + 0.4x, the green tangents sit at its three stationary points, blue / red dots follow the sign of f″, and the green dot is the lower of the two minima', () => {
    const s = M.buildUnconstrainedOptimizationScene(), { ox, oy, ux, uy, half } = M.UNO, toM = inv(ox, oy, ux, uy)
    const curveP = pathsOf(s, BLUE, 40)[0].points!.map(toM); curveP.forEach(([x, y]) => expect(Math.abs(y - M.unoF(x))).toBeLessThan(0.03))
    const crit = M.unoCrit(); crit.forEach((x) => expect(Math.abs(M.unoD(x))).toBeLessThan(1e-6))                                                    // f′ = 0
    const flats = bonds(s, GREEN, 0.04).map((o) => ({ x: (toM(o.from!)[0] + toM(o.to!)[0]) / 2, y: toM(o.from!)[1], dy: toM(o.to!)[1] - toM(o.from!)[1], w: (o.to![0] - o.from![0]) / ux })).sort((a, b) => a.x - b.x)
    expect(flats).toHaveLength(3); flats.forEach((f, i) => { expect(f.x).toBeCloseTo(crit[i], 1); expect(f.dy).toBeCloseTo(0, 6); expect(f.y).toBeCloseTo(M.unoF(crit[i]), 1); expect(f.w).toBeCloseTo(2 * half, 2) })   // horizontal tangents at the critical points
    const minima = crit.filter((x) => M.unoDD(x) > 0), maxima = crit.filter((x) => M.unoDD(x) < 0); expect([minima.length, maxima.length]).toEqual([2, 1])
    const dBlue = dots(s, BLUE).map((d) => toM(d.position!)[0]).sort((a, b) => a - b), dRed = dots(s, RED).map((d) => toM(d.position!)[0]); expect(dBlue).toEqual(minima.map((m) => expect.closeTo(m, 1))); expect(dRed).toEqual(maxima.map((m) => expect.closeTo(m, 1)))
    const best = minima.reduce((a, b) => (M.unoF(a) < M.unoF(b) ? a : b)), g = dots(s, GREEN).filter((d) => d.radius === 0.2)[0]; expect(toM(g.position!)[0]).toBeCloseTo(best, 1); expect(M.unoF(best)).toBeLessThan(M.unoF(minima.find((m) => m !== best)!))
    expect(M.unoF(best)).toBeCloseTo(-0.41, 1); expect(texts(s)).toEqual(expect.arrayContaining(['f′ = 0', 'f″ > 0', 'f″ < 0', 'global min', 'local min']))
  })

  it('Convex function: x² has its chord above the curve at every sample between the drawn endpoints and f″ = 2 ≥ 0; sin x has the chord below the curve near x = 3 and f″ = −sin changes sign', () => {
    const s = M.buildConvexFunctionScene(), { L, R } = M.CVF
    const tl = inv(L.ox, L.oy, L.ux, L.uy), tr = inv(R.ox, R.oy, R.ux, R.uy)
    const par = pathsOf(s, BLUE, 40).find((p) => p.points![0][0] < 0)!.points!.map(tl); par.forEach(([x, y]) => expect(Math.abs(y - x * x)).toBeLessThan(0.04))
    const chords = bonds(s, RED, 0.04), cl = chords.find((o) => o.from![0] < 0)!, cr = chords.find((o) => o.from![0] > 0)!
    const [la, lb2] = [tl(cl.from!), tl(cl.to!)]; expect(la[0]).toBeCloseTo(L.a, 1); expect(lb2[0]).toBeCloseTo(L.b, 1)
    const chordL = (x: number) => la[1] + ((lb2[1] - la[1]) * (x - la[0])) / (lb2[0] - la[0])
    par.filter(([x]) => x >= la[0] && x <= lb2[0]).forEach(([x, y]) => expect(y).toBeLessThanOrEqual(chordL(x) + 0.02))                              // chord ≥ curve everywhere
    const green = dots(s, GREEN).find((d) => d.position![0] < 0)!, redD = dots(s, RED).find((d) => d.position![0] < 0)!; expect(tl(redD.position!)[1]).toBeGreaterThan(tl(green.position!)[1] + 1)
    const sinP = pathsOf(s, BLUE, 40).find((p) => p.points![0][0] > 0)!.points!.map(tr); sinP.forEach(([x, y]) => expect(Math.abs(y - Math.sin(x))).toBeLessThan(0.04))
    const [ra, rb] = [tr(cr.from!), tr(cr.to!)]; expect(ra[0]).toBeCloseTo(R.a, 1); expect(rb[0]).toBeCloseTo(R.b, 1)
    const chordR = (x: number) => ra[1] + ((rb[1] - ra[1]) * (x - ra[0])) / (rb[0] - ra[0])
    expect(Math.max(...sinP.filter(([x]) => x >= ra[0] && x <= rb[0]).map(([x, y]) => y - chordR(x)))).toBeGreaterThan(0.2)                       // the curve pokes above the chord: not convex
    const mid = (R.a + R.b) / 2; expect(chordR(mid)).toBeLessThan(Math.sin(mid)); expect(M.chordAt(Math.sin, R.a, R.b, mid)).toBeCloseTo(-0.10, 1); expect(Math.sin(mid)).toBeCloseTo(0.14, 1)
    const signs = new Set(Array.from({ length: 60 }, (_, i) => sgn(-Math.sin((i / 59) * 6.28)))); expect(signs.has(1) && signs.has(-1)).toBe(true)  // f″ changes sign
    expect(texts(s)).toEqual(expect.arrayContaining(['chord above', 'chord below', 'f″ ≥ 0', 'f″ changes sign']))
  })

  it('Convex set: the drawn pentagon is convex and its segment stays inside; the dart is not convex and its drawn red part really lies outside; the hull recomputed from the drawn points equals the violet polygon', () => {
    const s = M.buildConvexSetScene(), { cx, cy } = M.CVS
    const polyOf = (panel: number, color: string, t: number) => bonds(s, color, t).filter((o) => Math.abs((o.from![0] + o.to![0]) / 2 - cx[panel]) < 1.6).map((o) => [[o.from![0], o.from![1]], [o.to![0], o.to![1]]] as [M.Pt, M.Pt])
    const vertsOf = (es: Array<[M.Pt, M.Pt]>): M.Pt[] => { const out: M.Pt[] = []; for (const [a] of es) if (!out.some((v) => dist(v as number[], a as number[]) < 0.02)) out.push(a); const c = [mean(out.map((v) => v[0])), mean(out.map((v) => v[1]))]; return out.sort((p, q) => Math.atan2(p[1] - c[1], p[0] - c[0]) - Math.atan2(q[1] - c[1], q[0] - c[0])) }
    const turn = (v: M.Pt[]) => v.map((p, i) => crossz([v[(i + 1) % v.length][0] - p[0], v[(i + 1) % v.length][1] - p[1]], [v[(i + 2) % v.length][0] - v[(i + 1) % v.length][0], v[(i + 2) % v.length][1] - v[(i + 1) % v.length][1]]))
    const pent = vertsOf(polyOf(0, BLUE, 0.05)), dart = polyOf(1, BLUE, 0.05)
    expect(pent).toHaveLength(5); expect(new Set(turn(pent).map(sgn)).size).toBe(1)                                                                  // all turns the same way: convex
    const dartV = dart.map(([a]) => a); expect(dartV).toHaveLength(4);   // the drawn corners in drawing order (a concave polygon cannot be ordered by angle)
     expect(new Set(turn(dartV).map(sgn)).size).toBe(2)                                    // a reflex corner: not convex
    const pd = dots(s, INK).filter((d) => d.radius === 0.1 && Math.abs(d.position![0] - cx[0]) < 1.5).map((d) => d.position!), seg = bonds(s, GREEN, 0.06).find((o) => Math.abs(o.from![0] - cx[0]) < 1.5)!
    for (let i = 0; i <= 50; i++) { const t = i / 50; expect(M.insidePoly(pent, [seg.from![0] + t * (seg.to![0] - seg.from![0]), seg.from![1] + t * (seg.to![1] - seg.from![1])])).toBe(true) }
    expect(pd).toHaveLength(2)
    const dd = dots(s, INK).filter((d) => d.radius === 0.1 && Math.abs(d.position![0] - cx[1]) < 1.5).map((d) => d.position!); expect(dd).toHaveLength(2); dd.forEach((p) => expect(M.insidePoly(dartV, p as M.Pt)).toBe(true))
    const redSeg = bonds(s, RED, 0.09).find((o) => Math.abs(o.from![0] - cx[1]) < 1.6)!, mid: M.Pt = [(redSeg.from![0] + redSeg.to![0]) / 2, (redSeg.from![1] + redSeg.to![1]) / 2]
    expect(M.insidePoly(dartV, mid)).toBe(false)                                                                                                       // the red part leaves the set
    const green = bonds(s, GREEN, 0.06).find((o) => Math.abs(o.from![0] - cx[1]) < 1.6)!; expect(M.insidePoly(dartV, [green.from![0], green.from![1]])).toBe(true)
    const pts = dots(s, INK).filter((d) => d.radius === 0.09 && Math.abs(d.position![0] - cx[2]) < 1.8).map((d) => [d.position![0] - cx[2], d.position![1] - cy] as M.Pt); expect(pts).toHaveLength(7)
    const hull = M.hullOf(pts), drawn = polyOf(2, VIOLET, 0.05); expect(drawn).toHaveLength(hull.length); hull.forEach((h) => expect(drawn.some(([a]) => dist([a[0] - cx[2], a[1] - cy], h as number[]) < 0.02)).toBe(true))
    expect(hull).toHaveLength(5); expect(dots(s, BLUE).filter((d) => d.radius === 0.13 && Math.abs(d.position![0] - cx[2]) < 1.8)).toHaveLength(5)
    expect(texts(s)).toEqual(expect.arrayContaining(['convex', 'not convex', 'convex hull']))
  })

  it('Linear programming: the drawn polygon is exactly the feasible region of the five constraints, x + 2y is 0, 3, 5, 7, 6 at its vertices, the level lines are perpendicular to the red vector, and the green dot is the unique maximiser', () => {
    const s = M.buildLinearProgrammingScene(), { ox, oy, u } = M.LPG, toM = inv(ox, oy, u, u)
    const edges = bonds(s, BLUE, 0.05).map((o) => [toM(o.from!), toM(o.to!)] as [[number, number], [number, number]]); expect(edges).toHaveLength(5)
    const verts: Array<[number, number]> = []; for (const [a] of edges) if (!verts.some((v) => dist(v, a) < 0.03)) verts.push(a)
    const cons = [[1, 0, 0], [0, 1, 0], [1, 0, 3], [0, 1, 3], [1, 1, 4]] as const        // a x + b y = c
    const cand: Array<[number, number]> = []
    for (let i = 0; i < cons.length; i++) for (let j = i + 1; j < cons.length; j++) { const [a1, b1, c1] = cons[i], [a2, b2, c2] = cons[j], d = a1 * b2 - a2 * b1; if (Math.abs(d) < 1e-9) continue; const x = (c1 * b2 - c2 * b1) / d, y = (a1 * c2 - a2 * c1) / d; if (M.lpFeasible(x, y) && !cand.some((v) => dist(v, [x, y]) < 1e-6)) cand.push([x, y]) }
    expect(cand).toHaveLength(5); expect(verts).toHaveLength(5); cand.forEach((c) => expect(verts.some((v) => dist(v, c) < 0.05)).toBe(true))        // the drawn corners ARE the feasible vertices
    const val = (p: number[]) => p[0] + 2 * p[1]; expect(verts.map(val).sort((a, b) => a - b).map((v) => Math.round(v))).toEqual([0, 3, 5, 6, 7])
    const best = verts.reduce((a, b) => (val(a) > val(b) ? a : b)), g = dots(s, GREEN).find((d) => d.radius === 0.2)!; expect(toM(g.position!)).toEqual([expect.closeTo(1, 1), expect.closeTo(3, 1)]); expect(dist(best, toM(g.position!))).toBeLessThan(0.05)
    expect(verts.filter((v) => Math.abs(val(v) - 7) < 0.05)).toHaveLength(1)                                                                            // the optimum is a single vertex
    const levels = [...bonds(s, VIOLET, 0.03), ...bonds(s, GREEN, 0.04)].map((o) => [toM(o.from!), toM(o.to!)] as [[number, number], [number, number]])
    const cvals = levels.map(([a, b]) => { expect(val(a)).toBeCloseTo(val(b), 1); return Math.round(val(a)) }).sort(); expect(cvals).toEqual([3, 5, 7])                // each line is x + 2y = c
    const arr = arrows(s, RED)[0], dir = [(arr.to![0] - arr.from![0]) / u, (arr.to![1] - arr.from![1]) / u]; expect(dir[1] / dir[0]).toBeCloseTo(2, 1)         // the vector c = (1, 2)
    levels.forEach(([a, b]) => expect(dotp([b[0] - a[0], b[1] - a[1]], dir)).toBeCloseTo(0, 0))                                                         // level lines ⟂ c
    expect(texts(s)).toEqual(expect.arrayContaining(['x + y = 4', 'optimum at a vertex']))
  })

  it('Lagrange multipliers: the circle of radius √2 is tangent to x + y = 2 at (1, 1), the smaller circle misses the line and the larger one crosses it, and ∇f = (2, 2) = 2·∇g, both drawn parallel', () => {
    const s = M.buildLagrangeMultipliersScene(), { o, u } = M.LGM, toM = inv(o[0], o[1], u, u)
    const rings = paths(s).filter((p) => p.points!.length >= 40).map((p) => ({ r: fitCircle(p).r / u, c: toM(fitCircle(p).c), color: p.color })).sort((a, b) => a.r - b.r)
    expect(rings.map((r) => r.r)).toEqual([1, Math.SQRT2, 2].map((v) => expect.closeTo(v, 1))); rings.forEach((r) => { expect(r.c[0]).toBeCloseTo(0, 1); expect(r.c[1]).toBeCloseTo(0, 1) })
    const L = bonds(s, BLUE, 0.05)[0], [a, b] = [toM(L.from!), toM(L.to!)]; expect(a[0] + a[1]).toBeCloseTo(2, 1); expect(b[0] + b[1]).toBeCloseTo(2, 1)            // x + y = 2
    const d = Math.abs(0 + 0 - 2) / Math.SQRT2; expect(d).toBeCloseTo(Math.SQRT2, 6)
    expect(rings[0].r).toBeLessThan(d); expect(Math.abs(rings[1].r - d)).toBeLessThan(0.02); expect(rings[2].r).toBeGreaterThan(d)                       // misses / tangent / crosses
    const pt = toM(dots(s, INK)[0].position!); expect(pt[0]).toBeCloseTo(1, 1); expect(pt[1]).toBeCloseTo(1, 1); expect(Math.hypot(...pt)).toBeCloseTo(rings[1].r, 1)
    const gf = arrows(s, RED)[0], gg = arrows(s, BLUE)[0], vf = [(gf.to![0] - gf.from![0]) / u, (gf.to![1] - gf.from![1]) / u], vg = [(gg.to![0] - gg.from![0]) / u, (gg.to![1] - gg.from![1]) / u]
    expect(crossz(vf, vg)).toBeCloseTo(0, 3); expect(Math.hypot(...vf) / Math.hypot(...vg)).toBeCloseTo(2, 1); expect(vf[0] / vf[1]).toBeCloseTo(1, 1)       // ∇f ∥ ∇g, λ = 2
    expect(2 * pt[0]).toBeCloseTo(2 * 1, 0); expect(texts(s)).toEqual(expect.arrayContaining(['∇f = λ∇g', 'λ = 2', 'x + y = 2', 'min']))
  })

  it('Gradient descent: the drawn iterates are x − 0.2·∇f(x) from the drawn start (2, 1), each step is −α∇f, f falls by 0.36 each time, and the start lies on the outer ellipse x² + 4y² = 8', () => {
    const s = M.buildGradientMethodsScene(), { o, u, alpha, levels } = M.GRD2, toM = inv(o[0], o[1], u, u)
    const start = toM(dots(s, INK)[0].position!) as M.Pt; expect(start[0]).toBeCloseTo(2, 1); expect(start[1]).toBeCloseTo(1, 1)
    const drawn = dots(s, BLUE).map((d) => toM(d.position!)); expect(drawn).toHaveLength(6)
    const its = M.gdIterates(start, alpha, 6); drawn.forEach((p, i) => { expect(p[0]).toBeCloseTo(its[i + 1][0], 1); expect(p[1]).toBeCloseTo(its[i + 1][1], 1) })
    const chain = [start, ...drawn]; chain.slice(1).forEach((p, i) => { const g = M.gdGrad(chain[i] as M.Pt); expect(p[0] - chain[i][0]).toBeCloseTo(-alpha * g[0], 1); expect(p[1] - chain[i][1]).toBeCloseTo(-alpha * g[1], 1) })   // step = −α∇f
    const fv = chain.map((p) => M.gdF(p as M.Pt)); fv.slice(1, 4).forEach((v, i) => expect(v / fv[i]).toBeCloseTo(0.36, 1)); expect(fv[0]).toBeCloseTo(8, 0)
    expect(drawn.map((p) => Math.sign(p[1]))).toEqual([-1, 1, -1, 1, -1, 1])                                                                           // zigzag across the valley
    const ell = pathsOf(s, SLATE, 40).map((p) => { const v = p.points!.map(toM).map(([x, y]) => x * x + 4 * y * y); expect(Math.max(...v) - Math.min(...v)).toBeLessThan(0.15); return Math.round(mean(v) * 10) / 10 }).sort((a, b) => a - b); expect(ell).toEqual([...levels].sort((a, b) => a - b))
    expect(M.gdF(start)).toBeCloseTo(8, 0)
    const ar = arrows(s, RED)[0], dir = [ar.to![0] - ar.from![0], ar.to![1] - ar.from![1]], g0 = M.gdGrad(start); expect(crossz(dir, [-g0[0], -g0[1]])).toBeCloseTo(0, 1); expect(dotp(dir, g0)).toBeLessThan(0)   // −∇f
    expect(texts(s)).toEqual(expect.arrayContaining(['α = 0.2', 'f falls by 0.36 per step']))
  })

  it("Newton's method: each drawn tangent runs from (xₖ, f(xₖ)) to the axis at xₖ − f/f′, the iterates are 2, 1.5, 1.4167, 1.41422 and the error is about 0.354 times the square of the previous one", () => {
    const s = M.buildNewtonsMethodScene(), { ox, oy, ux, uy } = M.NWT, toM = inv(ox, oy, ux, uy)
    const curveP = pathsOf(s, BLUE, 40)[0].points!.map(toM); curveP.forEach(([x, y]) => expect(Math.abs(y - (x * x - 2))).toBeLessThan(0.02))
    const xs = M.nwtIterates(2, 3); expect(xs[1]).toBeCloseTo(1.5, 10); expect(xs[2]).toBeCloseTo(1.416667, 5); expect(xs[3]).toBeCloseTo(1.414216, 5)
    const tans = [...bonds(s, RED, 0.04), ...bonds(s, GREEN, 0.04), ...bonds(s, VIOLET, 0.04)].filter((o) => Math.abs(o.from![0] - o.to![0]) > 1e-6 || true).map((o) => [toM(o.from!), toM(o.to!)] as [[number, number], [number, number]])
    const slanted = tans.filter(([a, b]) => Math.abs(a[0] - b[0]) > 1e-3); expect(slanted).toHaveLength(3)
    slanted.sort((p, q) => q[0][0] - p[0][0]).forEach(([a, b], k) => {
      expect(a[0]).toBeCloseTo(xs[k], 1); expect(a[1]).toBeCloseTo(xs[k] * xs[k] - 2, 1); expect(b[1]).toBeCloseTo(0, 2)                                // from the curve down to the axis
      expect(b[0]).toBeCloseTo(xs[k + 1], 1); expect(Math.abs((a[1] - b[1]) / (a[0] - b[0]) - 2 * xs[k])).toBeLessThan(k === 2 ? 0.5 : 0.12)              // slope f′(xₖ) = 2xₖ
    })
    const err = xs.map((x) => Math.abs(x - Math.SQRT2)); expect(err.slice(0, 3).map((e) => Math.round(e * 10000) / 10000)).toEqual([0.5858, 0.0858, 0.0025])
    for (let k = 0; k < 2; k++) { const q = err[k + 1] / err[k] ** 2; expect(q).toBeGreaterThan(0.2); expect(q).toBeLessThan(0.36) }; expect(err[2] / err[1] ** 2).toBeCloseTo(1 / (2 * Math.SQRT2), 1)   // quadratic convergence: → f″/(2f′) = 0.354
    expect(texts(s)).toEqual(expect.arrayContaining(['x₀', 'x₁', 'x₂', 'root √2', 'errors 0.59, 0.086, 0.0025']))
  })

  it('Interpolation: the three drawn dots fit one parabola 1.5x² + 0.5x (solved from the drawn dots); the degree-4 and degree-8 curves pass through their equally spaced nodes and the degree-8 error near the ends is larger (Runge)', () => {
    const s = M.buildInterpolationScene(), I = M.INT, tl = inv(I.oxL, I.oyL, I.uxL, I.uyL), tr = inv(I.oxR, I.oyR, I.uxR, I.uyR)
    const three = dots(s, INK).filter((d) => d.radius === 0.13).map((d) => tl(d.position!)).sort((a, b) => a[0] - b[0]); expect(three).toHaveLength(3)
    const p = M.lagrange(three.map((q) => q[0]), three.map((q) => q[1])); expect(p(2) - p(0) - (p(1) - p(0)) * 2).toBeCloseTo(3, 0)
    const c2 = (p(1) + p(-1)) / 2 - p(0), c1 = (p(1) - p(-1)) / 2; expect(c2).toBeCloseTo(1.5, 1); expect(c1).toBeCloseTo(0.5, 1)                         // p = 1.5x² + 0.5x
    pathsOf(s, BLUE, 40).find((q) => q.points![0][0] < 0)!.points!.forEach((q) => { const [x, y] = tl(q); expect(Math.abs(y - (1.5 * x * x + 0.5 * x))).toBeLessThan(0.04) })
    const bell = pathsOf(s, INK, 40)[0].points!.map(tr); bell.forEach(([x, y]) => expect(Math.abs(y - M.runge(x))).toBeLessThan(0.012))
    const p4 = pathsOf(s, BLUE, 40).find((q) => q.points![0][0] > 0)!.points!.map(tr), p8 = pathsOf(s, RED, 40)[0].points!.map(tr)
    const poly4 = M.lagrange(M.equalNodes(4), M.equalNodes(4).map(M.runge)), poly8 = M.lagrange(M.equalNodes(8), M.equalNodes(8).map(M.runge))
    p4.forEach(([x, y]) => expect(Math.abs(y - poly4(x))).toBeLessThan(0.03)); p8.forEach(([x, y]) => expect(Math.abs(y - poly8(x))).toBeLessThan(0.05))
    for (const x of M.equalNodes(4)) expect(Math.abs(poly4(x) - M.runge(x))).toBeLessThan(1e-12)                                                         // passes through every node
    for (const x of M.equalNodes(8)) expect(Math.abs(poly8(x) - M.runge(x))).toBeLessThan(1e-12)
    const edge = Array.from({ length: 41 }, (_, i) => 0.8 + (0.2 * i) / 40), err = (q: (x: number) => number) => Math.max(...edge.map((x) => Math.abs(q(x) - M.runge(x))))
    expect(err(poly8)).toBeGreaterThan(err(poly4)); expect(err(poly8)).toBeGreaterThan(0.2)                                                              // Runge: more nodes, bigger edge error
    const nodes = dots(s, INK).filter((d) => d.radius === 0.1).map((d) => tr(d.position!)).filter((q) => q[0] > -1.05); const have = (n: number) => M.equalNodes(n).every((x) => nodes.some((q) => Math.abs(q[0] - x) < 0.03 && Math.abs(q[1] - M.runge(x)) < 0.03)); expect(have(4) && have(8)).toBe(true)
    expect(texts(s)).toEqual(expect.arrayContaining(['unique quadratic', '5 nodes', '9 nodes']))
  })

  it('Numerical differentiation: the drawn secants have slopes 0.165 (forward) and 0.484 (centred) against the green tangent 0.540, and the bars are the errors for h = 0.8, 0.4, 0.2 that halve (forward) and quarter (centred)', () => {
    const s = M.buildNumericalDifferentiationScene(), { ox, oy, ux, uy, x, h, hs, bars } = M.NDF, toM = inv(ox, oy, ux, uy), truth = Math.cos(x)
    const slopeOf = (o: Obj) => { const a = toM(o.from!), b = toM(o.to!); return (b[1] - a[1]) / (b[0] - a[0]) }
    expect(slopeOf(bonds(s, GREEN, 0.04)[0])).toBeCloseTo(truth, 1)
    const fw = bonds(s, RED, 0.05)[0], ce = bonds(s, BLUE, 0.05)[0]
    expect(slopeOf(fw)).toBeCloseTo(M.fwdDiff(Math.sin, x, h), 1); expect(slopeOf(ce)).toBeCloseTo(M.cenDiff(Math.sin, x, h), 1)
    expect(toM(fw.from!)[0]).toBeCloseTo(x, 1); expect(toM(fw.to!)[0]).toBeCloseTo(x + h, 1); expect(toM(ce.from!)[0]).toBeCloseTo(x - h, 1); expect(toM(ce.to!)[0]).toBeCloseTo(x + h, 1)
    expect(M.fwdDiff(Math.sin, x, h)).toBeCloseTo(0.165, 3); expect(M.cenDiff(Math.sin, x, h)).toBeCloseTo(0.484, 3)
    const bar = (color: string) => bonds(s, color, 0.14).sort((a, b) => a.from![0] - b.from![0]).map((o) => (o.to![1] - o.from![1]) / bars.scale)
    const fe = bar(RED), ce2 = bar(BLUE); expect(fe).toHaveLength(3); expect(ce2).toHaveLength(3)
    hs.forEach((hh, i) => { expect(fe[i]).toBeCloseTo(Math.abs(M.fwdDiff(Math.sin, x, hh) - truth), 2); expect(ce2[i]).toBeCloseTo(Math.abs(M.cenDiff(Math.sin, x, hh) - truth), 2) })
    const ef = hs.map((hh) => Math.abs(M.fwdDiff(Math.sin, x, hh) - truth)), ec = hs.map((hh) => Math.abs(M.cenDiff(Math.sin, x, hh) - truth))
    ;[0, 1].forEach((i) => { expect(ef[i] / ef[i + 1]).toBeGreaterThan(1.8); expect(ef[i] / ef[i + 1]).toBeLessThan(2.3); expect(ec[i] / ec[i + 1]).toBeGreaterThan(3.5); expect(ec[i] / ec[i + 1]).toBeLessThan(4.5) })   // O(h) vs O(h²)
    expect(texts(s)).toEqual(expect.arrayContaining(['0.8', '0.4', '0.2', 'forward O(h)', 'central O(h²)', 'error vs h']))
  })

  it('Numerical integration: the drawn trapezoids sum to 1.896 and the drawn parabolic arcs integrate to 2.0046, errors 0.104 and 0.0046 against 2; the arcs pass through the five nodes', () => {
    const s = M.buildNumericalIntegrationScene(), { oxL, oxR, oy, ux, uy } = M.NIN
    const tops = bonds(s, RED, 0.05).map((o) => [[(o.from![0] - oxL) / ux, (o.from![1] - oy) / uy], [(o.to![0] - oxL) / ux, (o.to![1] - oy) / uy]] as [[number, number], [number, number]]).sort((a, b) => a[0][0] - b[0][0]); expect(tops).toHaveLength(4)
    const T = sum(tops.map(([a, b]) => ((b[0] - a[0]) * (a[1] + b[1])) / 2)); expect(T).toBeCloseTo(M.trapezoid(Math.sin, 0, Math.PI, 4), 1); expect(T).toBeCloseTo(1.896, 1)
    tops.forEach(([a, b]) => { expect(a[1]).toBeCloseTo(Math.sin(a[0]), 1); expect(b[1]).toBeCloseTo(Math.sin(b[0]), 1) })
    const arcs = pathsOf(s, BLUE, 20).filter((p) => p.points![0][0] > 0).map((p) => p.points!.map((q) => [(q[0] - oxR) / ux, (q[1] - oy) / uy] as [number, number])).sort((a, b) => a[0][0] - b[0][0]); expect(arcs).toHaveLength(2)
    const S = sum(arcs.map((a) => sum(a.slice(1).map((q, i) => ((q[0] - a[i][0]) * (q[1] + a[i][1])) / 2)))); expect(S).toBeCloseTo(M.simpson(Math.sin, 0, Math.PI, 4), 2); expect(S).toBeCloseTo(2.0046, 2)
    arcs.forEach((a) => [a[0], a[a.length - 1]].forEach((q) => expect(q[1]).toBeCloseTo(Math.sin(q[0]), 1)))                                           // through the end nodes
    expect(Math.abs(T - 2)).toBeCloseTo(0.104, 1); expect(Math.abs(S - 2)).toBeLessThan(0.01); expect(Math.abs(S - 2)).toBeLessThan(Math.abs(T - 2) / 10)
    const ink = pathsOf(s, INK, 40); ink.forEach((p) => p.points!.forEach((q) => { const ox = q[0] < 0 ? oxL : oxR; expect(Math.abs((q[1] - oy) / uy - Math.sin((q[0] - ox) / ux))).toBeLessThan(0.02) }))
    expect(texts(s)).toEqual(expect.arrayContaining(['T₄ = 1.90', 'S₄ = 2.00', 'error 0.10', 'error 0.005', 'exact 2']))
  })

  it('Real-valued function: the parabola is a function graph (x strictly increasing), the domain bar is [−2, 2] and the range bar [−1, 3] equal the extremes of the drawn curve, and the circle meets the vertical line twice', () => {
    const s = M.buildRealValuedFunctionScene(), { ox, oy, ux, uy, circ, vt, vtC } = M.RVF, toM = inv(ox, oy, ux, uy)
    const par = pathsOf(s, BLUE, 40)[0].points!.map(toM); par.slice(1).forEach((q, i) => expect(q[0]).toBeGreaterThan(par[i][0])); par.forEach(([x, y]) => expect(Math.abs(y - (x * x - 1))).toBeLessThan(0.02))
    const dom = bonds(s, VIOLET, 0.12)[0], rng = bonds(s, GREEN, 0.12)[0]
    expect([toM(dom.from!)[0], toM(dom.to!)[0]]).toEqual([expect.closeTo(-2, 1), expect.closeTo(2, 1)]); expect([toM(rng.from!)[1], toM(rng.to!)[1]]).toEqual([expect.closeTo(-1, 1), expect.closeTo(3, 1)])
    expect(Math.min(...par.map((q) => q[1]))).toBeCloseTo(-1, 1); expect(Math.max(...par.map((q) => q[1]))).toBeCloseTo(3, 1)                          // range = [min f, max f]
    expect(Math.min(...par.map((q) => q[0]))).toBeCloseTo(-2, 1); expect(Math.max(...par.map((q) => q[0]))).toBeCloseTo(2, 1)
    const vline = bonds(s, VIOLET, 0.025).find((o) => Math.abs(o.from![0] - o.to![0]) < 1e-9 && o.from![0] < 0)!; expect(toM(vline.from!)[0]).toBeCloseTo(vt, 1)
    const hit = par.filter((q, i) => i > 0 && (par[i - 1][0] - vt) * (q[0] - vt) <= 0); expect(hit).toHaveLength(1)                                    // one output for this input
    const ring = fitCircle(pathsOf(s, RED, 40)[0]); expect(ring.c).toEqual([expect.closeTo(circ.c[0], 1), expect.closeTo(circ.c[1], 1)]); expect(ring.r).toBeCloseTo(circ.r, 1)
    const twoDots = dots(s, RED).filter((d) => d.radius === 0.13).map((d) => d.position!); expect(twoDots).toHaveLength(2); expect(twoDots[0][0]).toBeCloseTo(twoDots[1][0], 6); expect(Math.abs(twoDots[0][1] - twoDots[1][1])).toBeCloseTo(2 * Math.sqrt(circ.r ** 2 - vtC ** 2), 1)
    twoDots.forEach((q) => expect(dist(q, circ.c as number[])).toBeCloseTo(circ.r, 1)); expect(twoDots[0][0] - circ.c[0]).toBeCloseTo(vtC, 1)
    expect(texts(s)).toEqual(expect.arrayContaining(['f(x)', 'domain', 'range', 'not a function']))
  })

  it('Real roots: the curve is p(x) = 0.25(x + 2)(x − 1)²(x − 3); the green dots sit on its roots −2, 1, 3, p changes sign at −2 and 3 but not at the double root 1, and the labels give the multiplicities and signs', () => {
    const s = M.buildRationalRootScene(), { ox, oy, ux, uy, roots } = M.RRT, toM = inv(ox, oy, ux, uy)
    pathsOf(s, BLUE, 40)[0].points!.map(toM).forEach(([x, y]) => expect(Math.abs(y - M.rrtP(x))).toBeLessThan(0.05))
    const gd = dots(s, GREEN).map((d) => toM(d.position!)).sort((a, b) => a[0] - b[0]); expect(gd.map((q) => Math.round(q[0]))).toEqual([-2, 1, 3]); gd.forEach((q) => { expect(q[1]).toBeCloseTo(0, 2); expect(Math.abs(M.rrtP(Math.round(q[0])))).toBeLessThan(1e-9) })
    const dp = (x: number) => (M.rrtP(x + 1e-5) - M.rrtP(x - 1e-5)) / 2e-5
    expect(Math.abs(dp(1))).toBeLessThan(1e-4); expect(Math.abs(dp(-2))).toBeGreaterThan(1); expect(Math.abs(dp(3))).toBeGreaterThan(1)                                  // double root has p′ = 0
    const changes = (r: number) => Math.sign(M.rrtP(r - 0.1)) !== Math.sign(M.rrtP(r + 0.1)); expect([-2, 1, 3].map(changes)).toEqual([true, false, true])                // cross, touch, cross
    expect(roots.map((r) => r.m)).toEqual([1, 2, 1]); expect(roots.every((r) => (r.m % 2 === 1) === changes(r.r))).toBe(true)
    expect(labelsOf(s).filter((l) => /^m \d$/.test(l.text ?? '')).map((l) => [Math.round(toM(l.position!)[0]), Number((l.text ?? '').slice(2))]).sort((a, b) => a[0] - b[0])).toEqual([[-2, 1], [1, 2], [3, 1]])
    const sg = labelsOf(s).filter((l) => l.text === '+' || l.text === '−'); expect(sg).toHaveLength(4); sg.forEach((l) => expect(Math.sign(M.rrtP(toM(l.position!)[0]))).toBe(l.text === '+' ? 1 : -1))   // the sign written is the sign of p there
    expect(dots(s, RED).some((d) => Math.abs(toM(d.position!)[0] - 1) < 0.02 && d.radius === 0.2)).toBe(true)
  })

  it('Manifold: the two drawn arcs lie on the circle, overlap, and cover all 360°, each is shorter than the circle and is flattened by a linear chart; the small ring round the figure eight’s crossing meets it in four branches', () => {
    const s = M.buildTopologicalManifoldScene(), { c, R, arcs, charts, eight } = M.MNF
    const ang = (q: number[]) => ((Math.atan2(q[1] - c[1], q[0] - c[0]) * 180) / Math.PI + 360) % 360
    const u1 = pathsOf(s, BLUE, 20)[0].points!, u2 = pathsOf(s, RED, 20).find((p) => dist(p.points![0], c as number[]) < R + 0.3)!.points!
    u1.forEach((q) => expect(dist(q, c as number[])).toBeCloseTo(R, 1)); u2.forEach((q) => expect(dist(q, c as number[])).toBeCloseTo(R + 0.08, 1))
    const span = (a: readonly [number, number]) => a[1] - a[0]; expect([span(arcs[0]), span(arcs[1])]).toEqual([180, 200]); arcs.forEach((a) => expect(span(a)).toBeLessThan(360))
    expect(ang(u1[0])).toBeCloseTo(10, 0); expect(ang(u1[u1.length - 1])).toBeCloseTo(190, 0); expect(ang(u2[0])).toBeCloseTo(170, 0); expect(ang(u2[u2.length - 1])).toBeCloseTo(10, 0)
    const covered = (a: number) => arcs.some(([a0, a1]) => (a >= a0 && a <= a1) || (a + 360 >= a0 && a + 360 <= a1)); for (let a = 0; a < 360; a += 1) expect(covered(a), `angle ${a}`).toBe(true)   // U₁ ∪ U₂ = the circle
    expect(arcs[0][1] - arcs[1][0]).toBeGreaterThan(0); expect(arcs[1][1] - 360 - arcs[0][0]).toBeCloseTo(0, 6)                                                          // overlap at both ends: 170–190 and 360–370 is 0–10 ⊂ …
    charts.forEach((ch, k) => { const bar = bonds(s, k === 0 ? BLUE : RED, 0.07)[0]; expect(bar.from![0]).toBeCloseTo(ch.x0, 2); expect(bar.to![0]).toBeCloseTo(ch.x1, 2); expect(bar.from![1]).toBeCloseTo(ch.y, 2) })
    ;[0, 1].forEach((k) => { const [a0, a1] = arcs[k]; expect(M.chartX(k, a0)).toBeCloseTo(charts[k].x0, 6); expect(M.chartX(k, a1)).toBeCloseTo(charts[k].x1, 6); expect(M.chartX(k, (a0 + a1) / 2)).toBeCloseTo((charts[k].x0 + charts[k].x1) / 2, 6) })   // a linear chart
    const rings = paths(s, SLATE).filter((p) => p.points!.length === 49), small = pathsOf(s, RED, 20).find((p) => p.points![0][0] > 0)!; expect(rings).toHaveLength(2)
    const sc = fitCircle(small); expect(dist(sc.c, eight.c as number[])).toBeLessThan(0.05)
    const branches = sum(rings.map((r) => r.points!.slice(1).filter((q, i) => (dist(r.points![i], sc.c) - sc.r) * (dist(q, sc.c) - sc.r) < 0).length)); expect(branches).toBe(4)            // a cross, not an interval
    expect(dist(rings[0].points![0], rings[1].points![24])).toBeLessThan(2.4); expect(texts(s)).toEqual(expect.arrayContaining(['U₁', 'U₂', 'φ₁', 'φ₂', 'not a manifold']))
  })
})
