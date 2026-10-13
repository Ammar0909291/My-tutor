/**
 * Mathematics visual campaign, batch 33 (2026-10-12): the differential-equation helpers (ODE order/degree, general / particular / singular solutions, IVP, existence and uniqueness, separable first-order ODE, Wronskian, Laplace and Fourier transforms, systems of ODEs, harmonic functions, Green's function, a nonlinear ODE). Every number a figure states is re-derived here from the
 * DRAWN dots, numerals, lines, arrows and curves, never from the generator's own constants alone.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB33'
import { mAt } from '@/lib/teaching/sceneGenerators/mathCoreScenesB32'

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
  ['math.de.ode', M.buildOdeScene, 'math-ode'],
  ['math.de.solution-types', M.buildSolutionTypesScene, 'math-solution-types'],
  ['math.de.ivp', M.buildIvpScene, 'math-ivp'],
  ['math.de.existence-uniqueness', M.buildExistenceUniquenessScene, 'math-existence-uniqueness'],
  ['math.de.first-order-ode', M.buildFirstOrderOdeScene, 'math-first-order-ode'],
  ['math.de.wronskian', M.buildWronskianScene, 'math-wronskian'],
  ['math.de.laplace-transform', M.buildLaplaceTransformScene, 'math-laplace-transform'],
  ['math.de.systems-ode', M.buildSystemsOdeScene, 'math-systems-ode'],
  ['math.de.fourier-transform', M.buildFourierTransformScene, 'math-fourier-transform'],
  ['math.de.harmonic-functions', M.buildHarmonicFunctionsScene, 'math-harmonic-functions'],
  ['math.de.greens-function', M.buildGreensFunctionScene, 'math-greens-function'],
  ['math.de.nonlinear-ode', M.buildNonlinearOdeScene, 'math-nonlinear-ode'],
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
const dist = (a: readonly number[], b: readonly number[]) => Math.hypot(a[0] - b[0], a[1] - b[1])
const labelAt = (s: SceneSpec, p: readonly number[], tol = 0.06) => labelsOf(s).find((o) => dist(o.position!, p) < tol)
const numsIn = (t: string) => (t.replace(/−/g, '-').match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number)
const numOf = (t: string) => Number(t.replace(/−/g, '-'))
const evalLR = (expr: string) => {
  const toks = expr.split('=')[0].trim().split(/\s+/)
  let acc = Number(toks[0])
  for (let i = 1; i < toks.length; i += 2) { const v = Number(toks[i + 1]); acc = toks[i] === '+' ? acc + v : toks[i] === '−' ? acc - v : toks[i] === '×' ? acc * v : acc / v }
  return acc
}
const matMul = (A: number[][], B: number[][]) => A.map((row) => B[0].map((_, j) => row.reduce((t, v, k) => t + v * B[k][j], 0)))
const closeVec = (a: readonly number[], b: readonly number[], tol = 0.02) => { expect(a).toHaveLength(b.length); a.forEach((x, i) => expect(Math.abs(x - b[i]), `${a} vs ${b}`).toBeLessThanOrEqual(tol)) }
const closeMat = (A: number[][], B: number[][], tol = 0.02) => A.forEach((row, i) => closeVec(row, B[i], tol))
/** a drawn arrow as the vector it shows, in world units of the figure (origin o, scale s) */
const vecOf = (a: Obj, o: readonly number[], s: number): [number, number] => [(a.to![0] - o[0]) / s, (a.to![1] - o[1]) / s]
const startsAt = (a: Obj, p: readonly number[]) => dist(a.from!, p) < 0.02
const arrowsFrom = (sc: SceneSpec, color: string, o: readonly number[]) => arrows(sc, color).filter((a) => startsAt(a, o))
const rankOf = (m: number[][]) => { const A = m.map((r) => [...r]); let r = 0; for (let c = 0; c < A[0].length && r < A.length; c++) { let p = r; for (let i = r + 1; i < A.length; i++) if (Math.abs(A[i][c]) > Math.abs(A[p][c])) p = i; if (Math.abs(A[p][c]) < 1e-9) continue; [A[r], A[p]] = [A[p], A[r]]; for (let i = r + 1; i < A.length; i++) { const f = A[i][c] / A[r][c]; for (let k = c; k < A[0].length; k++) A[i][k] -= f * A[r][k] } r++ } return r }
const det2 = (A: number[][]) => A[0][0] * A[1][1] - A[0][1] * A[1][0]
const mulVec = (A: number[][], v: readonly number[]) => [A[0][0] * v[0] + A[0][1] * v[1], A[1][0] * v[0] + A[1][1] * v[1]]

// ── graph readers ──────────────────────────────────────────────────────────────────────────
/** a drawn point as graph coordinates (the inverse of the figure's own frame) */
const toGraph = (f: M.Frame, p: readonly number[]): [number, number] => [(p[0] - f.ox) / f.ux, (p[1] - f.oy) / f.uy]
const pathG = (o: Obj, f: M.Frame) => o.points!.map((p) => toGraph(f, p))
const segG = (o: Obj, f: M.Frame) => [toGraph(f, o.from!), toGraph(f, o.to!)] as const
/** least-squares line y = a + b x with its largest residual */
const regress = (xs: number[], ys: number[]) => {
  const n = xs.length, mx = sum(xs) / n, my = sum(ys) / n
  const b = sum(xs.map((x, i) => (x - mx) * (ys[i] - my))) / sum(xs.map((x) => (x - mx) ** 2)), a = my - b * mx
  return { a, b, resid: Math.max(...xs.map((x, i) => Math.abs(ys[i] - (a + b * x)))) }
}
const simpson = (fn: (x: number) => number, lo: number, hi: number, n = 2000) => { const h = (hi - lo) / n; let t = fn(lo) + fn(hi); for (let i = 1; i < n; i++) t += (i % 2 ? 4 : 2) * fn(lo + i * h); return (t * h) / 3 }
/** analytic-quality derivative of a closed form, to confirm it solves its ODE */
const deriv = (fn: (x: number) => number, x: number, h = 1e-5) => (fn(x + h) - fn(x - h)) / (2 * h)
const distToPolyline = (p: readonly number[], pts: ReadonlyArray<readonly number[]>) => {
  let best = Infinity
  for (let i = 0; i + 1 < pts.length; i++) {
    const [ax, ay] = pts[i], [bx, by] = pts[i + 1], dx = bx - ax, dy = by - ay
    const t = Math.max(0, Math.min(1, ((p[0] - ax) * dx + (p[1] - ay) * dy) / (dx * dx + dy * dy || 1)))
    best = Math.min(best, Math.hypot(p[0] - (ax + t * dx), p[1] - (ay + t * dy)))
  }
  return best
}
const numGrid = (s: SceneSpec, spec: Parameters<typeof mAt>[0], rows: number, cols: number) => Array.from({ length: rows }, (_, i) => Array.from({ length: cols }, (_, j) => { const l = labelAt(s, mAt(spec, i, j)); expect(l, `entry ${i},${j}`).toBeTruthy(); return numOf(l!.text!) }))

describe('the mathematics each figure draws', () => {
  it('math.de.ode: the order and degree captions follow from the drawn equations', () => {
    const s = M.buildOdeScene()
    const ORDER: Record<string, number> = { '′': 1, '″': 2, '‴': 3 }, POW: Record<string, number> = { '²': 2, '³': 3, '⁴': 4 }
    const orderOf = (eq: string) => Math.max(...[...eq.matchAll(/y([′″‴])/g)].map((m) => ORDER[m[1]]))
    const degreeOf = (eq: string) => { const sym = ['', '′', '″', '‴'][orderOf(eq)]; const m = new RegExp(`\\(y${sym}\\)([²³⁴])`).exec(eq); return m ? POW[m[1]] : 1 }
    const found: number[][] = []
    M.ODE.rows.forEach((r, i) => {
      const eq = labelAt(s, [M.ODE.eqX, M.ODE.y[i]])!
      expect(eq.text).toBe(r.eq)
      const ord = labelAt(s, [M.ODE.orderX, M.ODE.y[i]])!, deg = labelAt(s, [M.ODE.degreeX, M.ODE.y[i]])!
      expect(numsIn(ord.text!)).toEqual([orderOf(eq.text!)])
      expect(numsIn(deg.text!)).toEqual([degreeOf(eq.text!)])
      expect([ord.color, deg.color, eq.color]).toEqual([RED, BLUE, INK])
      found.push([orderOf(eq.text!), degreeOf(eq.text!)])
    })
    // y′ = 2x, y″ + y = 0, (y′)³ + y = x
    expect(found).toEqual([[1, 1], [2, 1], [1, 3]])
    // two thin separators between the three rows
    expect(bonds(s, SLATE, 0.02)).toHaveLength(2)
  })

  it('math.de.solution-types: the drawn lines are y = Cx + C², the violet one is C = 1, and the parabola y = −x²/4 touches them all', () => {
    const s = M.buildSolutionTypesScene()
    const F = M.SOL
    const lines4 = bonds(s, BLUE, 0.04).map((o) => segG(o, F))
    expect(lines4).toHaveLength(5)
    const params = lines4.map(([a, b]) => { const m = (b[1] - a[1]) / (b[0] - a[0]); return { m, b: a[1] - m * a[0] } })
    params.forEach((q) => { expect(Math.abs(q.m - Math.round(q.m))).toBeLessThan(0.03); expect(Math.abs(q.b - q.m * q.m), `y = ${q.m}x + ${q.b}`).toBeLessThan(0.08) })
    expect(params.map((q) => Math.round(q.m)).sort((x, y) => x - y)).toEqual([-2, -1, 0, 1, 2])
    // every line solves y = x y′ + (y′)²  (y′ = m): the intercept is m²
    params.forEach((q) => expect(q.b).toBeCloseTo(q.m * q.m, 0))
    // the particular solution: one violet line with C = 1
    const part = bonds(s, VIOLET, 0.06).map((o) => segG(o, F))
    expect(part).toHaveLength(1)
    const [pa, pb] = part[0]
    expect((pb[1] - pa[1]) / (pb[0] - pa[0])).toBeCloseTo(1, 1)
    expect(pa[1] - pa[0]).toBeCloseTo(1, 1)
    // the singular solution: the green curve is y = −x²/4 and it also solves the equation
    const par = pathG(paths(s, GREEN)[0], F)
    par.forEach(([x, y]) => { expect(Math.abs(y + (x * x) / 4)).toBeLessThan(0.03); expect(Math.abs(x * (-x / 2) + (x / 2) ** 2 - y)).toBeLessThan(0.03) })
    // every line meets the parabola in one double root: m² − b = 0, at the drawn green dot (−2m, −m²)
    const dotsG = dots(s, GREEN).map((o) => toGraph(F, o.position!))
    expect(dotsG).toHaveLength(5)
    params.forEach((q) => {
      expect(q.m * q.m - q.b).toBeCloseTo(0, 1)
      const d = dotsG.find((g) => Math.abs(g[0] + 2 * q.m) < 0.06)!
      expect(d, `tangent dot for C = ${q.m}`).toBeTruthy()
      expect(Math.abs(d[1] + q.m * q.m)).toBeLessThan(0.06)
      expect(Math.abs(q.m * d[0] + q.b - d[1])).toBeLessThan(0.08)
    })
    // no value of C gives the parabola: it is curved, so the five straight lines each touch it at one point only
    params.forEach((q) => { const gap = par.map(([x, y]) => Math.abs(q.m * x + q.b - y)); expect(gap.filter((g) => g < 0.05).length).toBeLessThanOrEqual(9); expect(Math.max(...gap)).toBeGreaterThan(0.8) })
    for (const t of ['general: y = Cx + C²', 'particular: C = 1', 'singular: y = −x²/4']) expect(texts(s)).toContain(t)
  })

  it('math.de.ivp: every drawn curve is Ce^x, only C = 1 passes through the initial point, and the tangent has slope 1', () => {
    const s = M.buildIvpScene()
    const F = M.IVP
    const fam = paths(s, SLATE).map((o) => pathG(o, F))
    expect(fam).toHaveLength(3)
    const Cs = fam.map((pts) => { const r = pts.filter(([, y]) => y > 0.5).map(([x, y]) => y / Math.exp(x)); expect(r.length).toBeGreaterThan(10); expect((Math.max(...r) - Math.min(...r)) / r[0]).toBeLessThan(0.05); return sum(r) / r.length }).sort((a, b) => a - b)
    Cs.forEach((c, i) => expect(c).toBeCloseTo([0.5, 1, 2][i], 1))
    // the closed form really solves y′ = y
    for (const c of Cs) for (const x of [-1.5, -0.5, 0, 0.7, 1.2]) expect(deriv((t) => c * Math.exp(t), x)).toBeCloseTo(c * Math.exp(x), 6)
    // the initial condition: the red dot is at (0, 1), and only one family curve goes through it
    const init = dots(s, RED).map((o) => toGraph(F, o.position!))
    expect(init).toHaveLength(1)
    closeVec(init[0], [0, 1], 0.02)
    const near0 = fam.map((pts) => distToPolyline(init[0], pts))
    expect(near0.filter((d) => d < 0.03)).toHaveLength(1)
    near0.filter((d) => d >= 0.03).forEach((d) => expect(d).toBeGreaterThan(0.15))
    // the highlighted solution is y = e^x, and the violet tangent through (0, 1) has slope y′(0) = y(0) = 1
    pathG(paths(s, GREEN)[0], F).forEach(([x, y]) => expect(Math.abs(y - Math.exp(x))).toBeLessThan(0.03))
    const [ta, tb] = segG(bonds(s, VIOLET, 0.04)[0], F)
    const slopeT = (tb[1] - ta[1]) / (tb[0] - ta[0])
    expect(slopeT).toBeCloseTo(1, 2)
    expect(ta[1] - slopeT * ta[0]).toBeCloseTo(1, 1)
    expect(numsIn(labelsOf(s).find((l) => l.text === 'slope 1')!.text!)).toEqual([Math.round(slopeT)])
    expect(texts(s)).toEqual(expect.arrayContaining(['y′ = y', 'y(0) = 1', 'y = eˣ']))
  })

  it('math.de.existence-uniqueness: e^x solves y′ = y; both y = 0 and y = x³ solve y′ = 3y^(2/3) through (0, 0), where ∂f/∂y blows up', () => {
    const s = M.buildExistenceUniquenessScene()
    const L = M.EUN.left, R = M.EUN.right
    // left: the one green curve is e^x through the red point (0, 1) and satisfies y′ = y
    const left = pathG(paths(s, GREEN)[0], L)
    left.forEach(([x, y]) => { expect(Math.abs(y - Math.exp(x))).toBeLessThan(0.03); expect(deriv(Math.exp, x)).toBeCloseTo(Math.exp(x), 6) })
    closeVec(toGraph(L, dots(s, RED)[0].position!), [0, 1], 0.02)
    // right: the red curve is y = x³ and satisfies y′ = 3 y^(2/3) (3x² on both sides); green y = 0 does too
    const cube = pathG(paths(s, RED)[0], R)
    cube.forEach(([x, y]) => expect(Math.abs(y - x * x * x)).toBeLessThan(0.03))
    cube.filter(([x]) => Math.abs(x) > 0.3).forEach(([x, y]) => { expect(Math.abs(3 * x * x - 3 * Math.cbrt(y) ** 2)).toBeLessThan(0.15); expect(deriv((t) => t * t * t, x)).toBeCloseTo(3 * Math.cbrt(x * x * x) ** 2, 6) })
    const [za, zb] = segG(bonds(s, GREEN, 0.06)[0], R)
    expect(za[1]).toBeCloseTo(0, 2); expect(zb[1]).toBeCloseTo(0, 2)
    // both pass through the origin, drawn as the one grey dot, so the solution through (0, 0) is not unique
    expect(cube.some(([x, y]) => Math.abs(x) < 0.02 && Math.abs(y) < 0.02)).toBe(true)
    closeVec(toGraph(R, dots(s, INK)[0].position!), [0, 0], 0.02)
    // ∂f/∂y = 2 y^(−1/3) = 2/|x| along y = x³: unbounded near 0, while for y′ = y it is 1
    const dfdy = (x: number) => 2 / Math.abs(Math.cbrt(x * x * x))
    expect(dfdy(0.05)).toBeGreaterThan(30); expect(dfdy(0.01)).toBeGreaterThan(dfdy(0.05))
    expect(texts(s)).toEqual(expect.arrayContaining(['y′ = y', 'y′ = 3y^(2/3)', 'unique solution', 'two solutions', '∂f/∂y = 2y^(−1/3) unbounded']))
  })

  it('math.de.first-order-ode: both bell curves are Ce^(−x²), they solve y′ = −2xy, and ln y + x² is constant along each', () => {
    const s = M.buildFirstOrderOdeScene()
    const F = M.FOD
    const curves = [[GREEN, 1], [BLUE, 2]] as const
    for (const [color, C] of curves) {
      const pts = pathG(paths(s, color)[0], F)
      const top = pts.find(([x]) => Math.abs(x) < 0.01)!
      expect(top[1]).toBeCloseTo(C, 1)
      pts.forEach(([x, y]) => expect(Math.abs(y - C * Math.exp(-x * x))).toBeLessThan(0.02))
      // separation of variables: ln y = −x² + c, so ln y + x² does not change (use the part of the curve that is tall enough to read)
      pts.filter(([, y]) => y > 0.1).forEach(([x, y]) => expect(Math.abs(Math.log(y) + x * x - Math.log(C))).toBeLessThan(0.06))
      // y′ = −2xy from the drawn points (a central difference over the neighbouring samples)
      for (let i = 2; i < pts.length - 2; i++) { const slope = (pts[i + 1][1] - pts[i - 1][1]) / (pts[i + 1][0] - pts[i - 1][0]); expect(Math.abs(slope + 2 * pts[i][0] * pts[i][1])).toBeLessThan(0.2) }
      // and the closed form solves it exactly
      for (const x of [-1.7, -0.6, 0.3, 1.1]) expect(deriv((t) => C * Math.exp(-t * t), x)).toBeCloseTo(-2 * x * C * Math.exp(-x * x), 6)
    }
    for (const t of ['y′ = −2xy', 'dy/y = −2x dx', 'ln y = −x² + c', 'y = Ce^(−x²)', 'C = 1', 'C = 2']) expect(texts(s)).toContain(t)
  })

  it('math.de.wronskian: the fitted exponentials give W(0) = 1 for (eˣ, e²ˣ) and W = 0 for (eˣ, 2eˣ)', () => {
    const s = M.buildWronskianScene()
    const frameOf = (pts: number[][]) => (sum(pts.map((p) => p[0])) / pts.length < 0 ? M.WRN.a : M.WRN.b)
    const fit = (o: Obj) => { const f = frameOf(o.points!), g = pathG(o, f), big = g.filter((p) => p[1] >= 0.4), r = regress(big.map((p) => p[0]), big.map((p) => Math.log(p[1]))); expect(big.length).toBeGreaterThan(15); expect(r.resid, 'a straight line in ln y').toBeLessThan(0.03); return { A: Math.exp(r.a), k: r.b, at0: g.find((p) => Math.abs(p[0]) < 1e-6) } }
    const reds = paths(s, RED).map(fit), blues = paths(s, BLUE).map(fit)
    expect(reds).toHaveLength(2); expect(blues).toHaveLength(2)
    // panel order: left panel first (the first path drawn in each colour)
    const W = (p: { A: number; k: number }, q: { A: number; k: number }) => p.A * q.A * (q.k - p.k)
    const [aY1, bY1] = reds, [aY2, bY2] = blues
    expect(aY1.A).toBeCloseTo(1, 1); expect(aY1.k).toBeCloseTo(1, 1); expect(aY2.A).toBeCloseTo(1, 1); expect(aY2.k).toBeCloseTo(2, 1)
    expect(bY1.A).toBeCloseTo(1, 1); expect(bY1.k).toBeCloseTo(1, 1); expect(bY2.A).toBeCloseTo(2, 1); expect(bY2.k).toBeCloseTo(1, 1)
    expect(W(aY1, aY2)).toBeCloseTo(1, 1)
    expect(Math.abs(W(bY1, bY2))).toBeLessThan(0.1)
    // x = 0 is a drawn sample of every curve, and (1, 1), (1, 1) | (1, 1), (1, 2) are the values there
    ;[aY1, aY2, bY1].forEach((c) => expect(c.at0![1]).toBeCloseTo(1, 1)); expect(bY2.at0![1]).toBeCloseTo(2, 1)
    // W from the definition y₁y₂′ − y₁′y₂ evaluated on the fitted functions at x = 0 and at x = 0.6
    const wAt = (p: { A: number; k: number }, q: { A: number; k: number }, x: number) => { const y1 = p.A * Math.exp(p.k * x), y2 = q.A * Math.exp(q.k * x); return y1 * (q.k * y2) - p.k * y1 * y2 }
    expect(wAt(aY1, aY2, 0)).toBeCloseTo(1, 1); expect(wAt(aY1, aY2, 0.6)).toBeCloseTo(Math.exp(1.8), 0)
    expect(Math.abs(wAt(bY1, bY2, 0.6))).toBeLessThan(0.15)
    // the captions say exactly that
    expect(numsIn(labelsOf(s).find((l) => l.text!.startsWith('W(0)'))!.text!)[1]).toBe(Math.round(W(aY1, aY2)))
    expect(numsIn(labelsOf(s).find((l) => l.text!.startsWith('W is'))!.text!)[0]).toBe(Math.round(Math.abs(W(bY1, bY2))))
    for (const t of ['independent', 'dependent']) expect(texts(s)).toContain(t)
  })

  it('math.de.laplace-transform: the drawn bars sum to the area 1/s = 0.5 under e^(−st) with s = 2', () => {
    const s = M.buildLaplaceTransformScene()
    const F = M.LAP
    const bars = bonds(s, GREEN, 0.03).map((o) => segG(o, F))
    expect(bars).toHaveLength(M.lapBars)
    const ts = bars.map(([a]) => a[0]), hs = bars.map(([a, b]) => b[1] - a[1])
    // every bar stands on the axis at its midpoint t and is as tall as e^(−2t) there
    bars.forEach(([a, b], i) => { expect(a[1]).toBeCloseTo(0, 2); expect(a[0]).toBeCloseTo(b[0], 2); expect(Math.abs(hs[i] - Math.exp(-2 * ts[i]))).toBeLessThan(0.01) })
    // equal widths of 0.1
    ts.forEach((t, k) => expect(Math.abs(t - (k + 0.5) * 0.1)).toBeLessThan(0.008))
    // s is read from the drawn decay: ln h = −s t
    const r = regress(ts, hs.map(Math.log))
    const sFit = -r.b
    expect(sFit).toBeCloseTo(2, 1)
    expect(numsIn(labelsOf(s).find((l) => l.text!.startsWith('weight'))!.text!)).toEqual([-Math.round(sFit)])
    // the area under the drawn bars (plus the unseen tail) is 1/s
    const area = sum(hs) * 0.1, tEnd = ts[ts.length - 1] + 0.05, tail = Math.exp(-sFit * tEnd) / sFit
    expect(tail).toBeLessThan(0.01)
    expect(Math.abs(area + tail - 1 / sFit)).toBeLessThan(0.01)
    const sInt = Math.round(sFit)
    expect(evalLR('1 ÷ 2 = 0.5')).toBeCloseTo(1 / sInt, 9)
    expect(numsIn(labelsOf(s).find((l) => l.text === '1 ÷ 2 = 0.5')!.text!).pop()).toBe(1 / sInt)
    // the blue curve is e^(−2t) and the grey line is f(t) = 1
    pathG(paths(s, BLUE)[0], F).forEach(([t, y]) => expect(Math.abs(y - Math.exp(-2 * t))).toBeLessThan(0.01))
    const [fa, fb] = segG(bonds(s, SLATE, 0.03)[0], F)
    expect(fa[1]).toBeCloseTo(1, 2); expect(fb[1]).toBeCloseTo(1, 2)
    expect(numsIn(labelsOf(s).find((l) => l.text === 'f(t) = 1')!.text!)).toEqual([1])
    // the exact transform of f = 1 is 1/s: integrate e^(−st) numerically
    expect(simpson((t) => Math.exp(-2 * t), 0, 12)).toBeCloseTo(0.5, 4)
    expect(texts(s)).toContain('ℒ{1} = 1/s')
  })

  it('math.de.systems-ode: the matrix is the drawn A, each arrow is A x at its point, tangent to a circle, clockwise', () => {
    const s = M.buildSystemsOdeScene()
    const F: M.Frame = { ox: M.SYS.o[0], oy: M.SYS.o[1], ux: M.SYS.u, uy: M.SYS.u }
    const A = numGrid(s, M.SYS.mA, 2, 2)
    expect(A).toEqual([[0, 1], [-1, 0]])
    // v′ = −y and y′ = v: the rows of A, so y″ = v′ = −y, i.e. y″ + y = 0
    expect(A[1]).toEqual([-1, 0]); expect(A[0]).toEqual([0, 1])
    // two circles about the origin of radius 1 and 2
    const radii = paths(s, BLUE).map((o) => pathG(o, F).map(([x, y]) => Math.hypot(x, y)))
    expect(radii).toHaveLength(2)
    radii.forEach((rs, i) => { rs.forEach((r) => expect(Math.abs(r - (i + 1))).toBeLessThan(0.02)) })
    // eight red arrows: base x = (y, v), vector k·A x, perpendicular to x, clockwise
    const arr = arrows(s, RED)
    expect(arr).toHaveLength(8)
    arr.forEach((a) => {
      const x = toGraph(F, a.from!), tip = toGraph(F, a.to!)
      const vec = [(tip[0] - x[0]) / M.SYS.k, (tip[1] - x[1]) / M.SYS.k]
      closeVec(vec, [A[0][0] * x[0] + A[0][1] * x[1], A[1][0] * x[0] + A[1][1] * x[1]], 0.03)
      expect(dotp(vec, x)).toBeCloseTo(0, 1)
      expect(crossz(x, vec)).toBeLessThan(0)
      expect([1, 2].some((r) => Math.abs(Math.hypot(x[0], x[1]) - r) < 0.02)).toBe(true)
    })
    // y² + v² is conserved by x′ = A x: d/dt (y² + v²) = 2 y y′ + 2 v v′ = 2 y v − 2 v y = 0
    for (const x of [[1, 0], [0.6, 0.8], [-1.3, 0.4]]) expect(2 * x[0] * (A[0][0] * x[0] + A[0][1] * x[1]) + 2 * x[1] * (A[1][0] * x[0] + A[1][1] * x[1])).toBeCloseTo(0, 12)
    for (const t of ['y″ + y = 0', 'v = y′', 'v′ = −y', 'x′ = A x']) expect(texts(s)).toContain(t)
  })

  it('math.de.fourier-transform: the drawn transform equals ∫ of the drawn pulse, peaks at its area 2, and vanishes at ω = ±kπ', () => {
    const s = M.buildFourierTransformScene()
    const T = M.FTR.top, W = M.FTR.bot
    // the drawn pulse: edges and height, in t and f
    const pulse = bonds(s, BLUE, 0.06).map((o) => segG(o, T))
    expect(pulse).toHaveLength(5)
    const edges = pulse.filter(([a, b]) => Math.abs(a[0] - b[0]) < 1e-6).map(([a]) => a[0]).sort((x, y) => x - y)
    const top = pulse.find(([a, b]) => Math.abs(a[1] - b[1]) < 1e-6 && a[1] > 0.5)!
    const height = top[0][1], half = (edges[1] - edges[0]) / 2
    expect(edges[0]).toBeCloseTo(-1, 2); expect(edges[1]).toBeCloseTo(1, 2); expect(height).toBeCloseTo(1, 2)
    const area = 2 * half * height
    // every drawn point of the green curve is the integral ∫ f(t) e^(−iωt) dt = ∫ from −1 to 1 of cos(ωt) dt
    const g = pathG(paths(s, GREEN)[0], W)
    expect(g.length).toBeGreaterThan(50)
    g.forEach(([w, F]) => expect(Math.abs(F - height * simpson((t) => Math.cos(w * t), -half, half))).toBeLessThan(0.02))
    // the peak is at ω = 0 and equals the area of the pulse
    const peak = g.reduce((m, p) => (p[1] > m[1] ? p : m), g[0])
    expect(peak[0]).toBeCloseTo(0, 1); expect(peak[1]).toBeCloseTo(area, 1)
    expect(numsIn(labelsOf(s).find((l) => l.text === '2')!.text!)).toEqual([Math.round(peak[1])])
    expect(numsIn(labelsOf(s).find((l) => l.text === 'f̂(0) = 2')!.text!)).toEqual([0, Math.round(peak[1])])
    expect(numsIn(labelsOf(s).find((l) => l.text === 'area of pulse = 2')!.text!)).toEqual([Math.round(area)])
    // six red dots at ω = ±π, ±2π, ±3π, on the axis, and the curve changes sign across each
    const zs = dots(s, RED).map((o) => toGraph(W, o.position!))
    expect(zs).toHaveLength(6)
    zs.forEach(([w, y]) => { expect(y).toBeCloseTo(0, 2); const k = Math.round(w / Math.PI); expect(k).not.toBe(0); expect(Math.abs(w - k * Math.PI)).toBeLessThan(0.03); expect(Math.abs(k)).toBeLessThanOrEqual(3)
      const left = g.filter((p) => p[0] < w).pop()!, right = g.find((p) => p[0] > w)!
      expect(left[1] * right[1], `sign change at ${w}`).toBeLessThan(0.001) })
    // the exact transform of a pulse of half-width 1 is 2 sin ω / ω
    for (const w of [0.7, 2.2, 4.1, 7.3]) expect(simpson((t) => Math.cos(w * t), -1, 1)).toBeCloseTo((2 * Math.sin(w)) / w, 6)
  })

  it('math.de.harmonic-functions: u = x² − y² takes the drawn values at the four samples, which average to u at the centre', () => {
    const s = M.buildHarmonicFunctionsScene()
    const F = M.HRM
    const u = (x: number, y: number) => x * x - y * y
    // the circle (73 points, the last repeats the first) is radius 1 about (1, 1)
    const circ = pathG(paths(s, BLUE)[0], F)
    circ.forEach(([x, y]) => expect(Math.abs(Math.hypot(x - 1, y - 1) - 1)).toBeLessThan(0.02))
    const centre = toGraph(F, dots(s, VIOLET)[0].position!)
    closeVec(centre, [1, 1], 0.02)
    // the mean of u over the drawn circle equals u at the centre (the mean value property)
    const ring = circ.slice(0, 72)
    expect(Math.abs(sum(ring.map(([x, y]) => u(x, y))) / ring.length - u(centre[0], centre[1]))).toBeLessThan(0.02)
    // ∇²u = 0: second differences at the centre
    const h = 0.1
    expect((u(1 + h, 1) + u(1 - h, 1) + u(1, 1 + h) + u(1, 1 - h) - 4 * u(1, 1)) / (h * h)).toBeCloseTo(0, 9)
    // four red sample dots at E, W, N, S, each with a numeral equal to u there
    const samples = dots(s, RED).map((o) => toGraph(F, o.position!))
    expect(samples).toHaveLength(4)
    const dirs = samples.map(([x, y]) => [Math.round(x - 1), Math.round(y - 1)]).map((d) => d.join(','))
    expect(dirs.sort()).toEqual(['-1,0', '0,-1', '0,1', '1,0'])
    const vals = samples.map(([x, y], i) => {
      const dotPos = dots(s, RED)[i].position!
      const lab = labelsOf(s).find((l) => /^[−-]?\d+$/.test(l.text!) && l.color === RED && dist(l.position!, dotPos) < 0.9 && numOf(l.text!) === Math.round(u(x, y)))
      expect(lab, `numeral for u(${x.toFixed(2)}, ${y.toFixed(2)})`).toBeTruthy()
      return numOf(lab!.text!)
    })
    expect(sum(vals)).toBe(0)
    expect(sum(vals) / 4).toBeCloseTo(u(1, 1), 9)
    expect(evalLR('3 − 1 − 3 + 1 = 0')).toBe(0)
    expect(numsIn(labelsOf(s).find((l) => l.text === '0')!.text!)).toEqual([u(1, 1)])
    for (const t of ['u = x² − y²', '∇²u = 0', 'mean = 0', 'u(centre) = 0']) expect(texts(s)).toContain(t)
  })

  it('math.de.greens-function: the drawn tent has height ξ(1 − ξ), slopes 1 − ξ and −ξ, and a slope jump of −1 at the source', () => {
    const s = M.buildGreensFunctionScene()
    const F = M.GRN
    const tent = bonds(s, GREEN, 0.06).map((o) => segG(o, F))
    expect(tent).toHaveLength(2)
    const [left, right] = tent
    // vertices (0, 0), (ξ, G(ξ)), (1, 0), and the source arrow at ξ
    closeVec(left[0], [0, 0], 0.005); closeVec(right[1], [1, 0], 0.005)
    expect(dist(left[1], right[0])).toBeLessThan(0.005)
    const xi = left[1][0]
    expect(xi).toBeCloseTo(0.4, 2)
    const src = arrows(s, RED)[0]
    expect(toGraph(F, src.from!)[0]).toBeCloseTo(xi, 2); expect(toGraph(F, src.to!)[0]).toBeCloseTo(xi, 2)
    const peak = left[1][1]
    expect(peak).toBeCloseTo(xi * (1 - xi), 2)
    const m1 = (left[1][1] - left[0][1]) / (left[1][0] - left[0][0]), m2 = (right[1][1] - right[0][1]) / (right[1][0] - right[0][0])
    expect(m1).toBeCloseTo(1 - xi, 2); expect(m2).toBeCloseTo(-xi, 2)
    expect(m2 - m1).toBeCloseTo(-1, 2)
    // the boundary dots at 0 and 1
    const ends = dots(s, GREEN).map((o) => toGraph(F, o.position!)[0]).sort((a, b) => a - b)
    expect(ends[0]).toBeCloseTo(0, 2); expect(ends[1]).toBeCloseTo(1, 2)
    // −G″ = δ: G is piecewise linear, so a second difference away from ξ vanishes and the slope drops by 1 across ξ
    const G = (x: number) => (x <= xi ? x * (1 - xi) : xi * (1 - x))
    const h = 0.05
    for (const x of [0.15, 0.3, 0.6, 0.85]) expect((G(x + h) - 2 * G(x) + G(x - h)) / (h * h)).toBeCloseTo(0, 9)
    expect((G(xi + h) - G(xi)) / h - (G(xi) - G(xi - h)) / h).toBeCloseTo(-1, 9)
    // the captions state the drawn numbers
    const cap = (t: string) => labelsOf(s).find((l) => l.text === t)!
    expect(numsIn(cap('slope 0.6').text!)).toEqual([Math.round(m1 * 10) / 10])
    expect(numsIn(cap('slope −0.4').text!)).toEqual([Math.round(m2 * 10) / 10])
    expect(evalLR(cap('0.6 − 1 = −0.4').text!)).toBeCloseTo(m2, 9)
    expect(numsIn(cap('0.24').text!)).toEqual([Math.round(peak * 100) / 100])
    expect(numsIn(cap('unit source at ξ = 0.4').text!)).toEqual([Math.round(xi * 10) / 10])
  })

  it('math.de.nonlinear-ode: every drawn curve is 1/(1 + Ce^(−t)), which solves y′ = y(1 − y), and the equilibria are y = 0 and y = 1', () => {
    const s = M.buildNonlinearOdeScene()
    const F = M.NLO
    const curves = [...paths(s, BLUE), ...paths(s, VIOLET)].map((o) => pathG(o, F))
    expect(curves).toHaveLength(5)
    const Cs: number[] = []
    curves.forEach((pts) => {
      const C = 1 / pts[0][1] - 1
      Cs.push(C)
      pts.forEach(([t, y]) => expect(Math.abs(y - 1 / (1 + C * Math.exp(-t))), `C = ${C.toFixed(2)} at t = ${t.toFixed(2)}`).toBeLessThan(0.02))
      const last = pts[pts.length - 1][1]
      expect(Math.abs(last - 1)).toBeLessThan(0.04)
    })
    Cs.sort((a, b) => b - a).forEach((c, i) => expect(Math.abs(c - [20, 4, 1, 0.25, -0.5][i]), `C ≈ ${c.toFixed(2)}`).toBeLessThan(Math.max(0.1, 0.08 * Math.abs([20, 4, 1, 0.25, -0.5][i]))))
    // the closed form solves y′ = y(1 − y) (checked on a fine grid)
    for (const C of [20, 4, 1, 0.25, -0.5]) for (const t of [0.3, 1.1, 2.7, 4.5, 6.8]) { const y = 1 / (1 + C * Math.exp(-t)); expect(deriv((x) => 1 / (1 + C * Math.exp(-x)), t)).toBeCloseTo(y * (1 - y), 6) }
    // starting values: four below 1 and one above (y(0) = 2)
    expect(curves.filter((p) => p[0][1] < 1)).toHaveLength(4)
    expect(curves.find((p) => p[0][1] > 1)![0][1]).toBeCloseTo(2, 1)
    // equilibria: the red line at y = 0 and the green at y = 1, where y(1 − y) = 0; the sign of f′ = 1 − 2y says which is stable
    const f = (y: number) => y * (1 - y), fp = (y: number) => 1 - 2 * y
    const red = segG(bonds(s, RED, 0.06)[0], F), green = segG(bonds(s, GREEN, 0.06)[0], F)
    expect(red[0][1]).toBeCloseTo(0, 2); expect(green[0][1]).toBeCloseTo(1, 2)
    expect(f(red[0][1])).toBeCloseTo(0, 2); expect(f(green[0][1])).toBeCloseTo(0, 2)
    expect(fp(red[0][1])).toBeGreaterThan(0)   // unstable
    expect(fp(green[0][1])).toBeLessThan(0)    // stable
    expect(texts(s)).toEqual(expect.arrayContaining(['y = 1 stable', 'y = 0 unstable', 'y′ = y(1 − y)', 'y(0) = 2']))
  })
})
