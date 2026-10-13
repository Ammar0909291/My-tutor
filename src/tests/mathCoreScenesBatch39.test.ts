/**
 * Mathematics visual campaign, batch 39 (2026-10-12): three rigorous-calculus helpers (differentiability, Taylor with the Lagrange remainder, the fundamental theorem of calculus) and six measure-theory helpers (measure, Lebesgue measure, measure zero, the convergence theorems, Lᵖ spaces, L²). Every number a figure states is re-derived here from the
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
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB39'
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
  ['math.real.differentiability-rigorous', M.buildDifferentiabilityRigorousScene, 'math-differentiability-rigorous'],
  ['math.real.taylor-rigorous', M.buildTaylorRigorousScene, 'math-taylor-rigorous'],
  ['math.real.ftc-rigorous', M.buildFtcRigorousScene, 'math-ftc-rigorous'],
  ['math.meas.measure', M.buildMeasureScene, 'math-measure'],
  ['math.meas.lebesgue-measure', M.buildLebesgueMeasureScene, 'math-lebesgue-measure'],
  ['math.meas.measure-zero', M.buildMeasureZeroScene, 'math-measure-zero'],
  ['math.meas.convergence-theorems', M.buildConvergenceTheoremsScene, 'math-convergence-theorems'],
  ['math.meas.lp-space', M.buildLpSpaceScene, 'math-lp-space'],
  ['math.meas.l2-space', M.buildL2SpaceScene, 'math-l2-space'],
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

describe('the mathematics each figure draws', () => {
  const after = (t: string, sep: string) => t.slice(t.indexOf(sep) + sep.length)
  const textStarting = (s: SceneSpec, p: string) => texts(s).find((t) => t.startsWith(p))!
  const sortX = (xs: Obj[]) => [...xs].sort((a, b) => a.from![0] - b.from![0])
  /** drawn world coordinates → graph coordinates of a frame */
  const toG = (f: M.Frame, p: readonly number[]): [number, number] => [(p[0] - f.ox) / f.ux, (p[1] - f.oy) / f.uy]
  const pathG = (o: Obj, f: M.Frame) => o.points!.map((p) => toG(f, p))
  /** linear interpolation of a drawn polyline (graph coordinates) at x */
  const valueAt = (pts: ReadonlyArray<readonly [number, number]>, x: number) => { for (let i = 0; i + 1 < pts.length; i++) { const [x0, y0] = pts[i], [x1, y1] = pts[i + 1]; if (x >= x0 - 1e-9 && x <= x1 + 1e-9) return x1 === x0 ? y1 : y0 + ((y1 - y0) * (x - x0)) / (x1 - x0) } throw new Error(`x = ${x} is outside the drawn curve`) }
  const trapezoid = (pts: ReadonlyArray<readonly [number, number]>, a: number, b: number) => { let s = 0; for (let i = 0; i + 1 < pts.length; i++) { const [x0, y0] = pts[i], [x1, y1] = pts[i + 1]; if (x1 <= a || x0 >= b) continue; const lo = Math.max(x0, a), hi = Math.min(x1, b); const f = (x: number) => y0 + ((y1 - y0) * (x - x0)) / (x1 - x0); s += ((f(lo) + f(hi)) / 2) * (hi - lo) } return s }
  const slopeG = (o: Obj, f: M.Frame) => { const [a, b] = [toG(f, o.from!), toG(f, o.to!)]; return (b[1] - a[1]) / (b[0] - a[0]) }

  it('math.real.differentiability-rigorous: the drawn one-sided quotients of |x| at 0 are −1 and +1 (no limit), while the secant slopes of x² are h = 1, 0.5, 0.25 → 0', () => {
    const s = M.buildDifferentiabilityRigorousScene()
    // |x|: two arms of slope −1 and +1 meeting at the origin of the left frame
    const arms = bonds(s, BLUE, 0.06).sort((a, b) => a.from![0] - b.from![0])
    expect(arms).toHaveLength(2)
    const F = M.DFL
    expect(slopeG(arms[0], F)).toBeCloseTo(-1, 2); expect(slopeG(arms[1], F)).toBeCloseTo(1, 2)
    const secR = bonds(s, GREEN, 0.07)[0], secL = bonds(s, RED, 0.07)[0]
    const qR = slopeG(secR, F), qL = slopeG(secL, F)                                  // [f(h) − f(0)]/h from the right and from the left
    expect(qR).toBeCloseTo(1, 2); expect(qL).toBeCloseTo(-1, 2)
    expect(Math.abs(qR - qL)).toBeGreaterThan(1.9)                                     // the two one-sided limits disagree
    ;[secR, secL].forEach((o, i) => { const [a, b] = [toG(F, o.from!), toG(F, o.to!)]; expect(Math.abs(a[0]) + Math.abs(a[1])).toBeLessThan(0.02); expect(b[1]).toBeCloseTo(Math.abs(b[0]), 2); expect(Math.sign(b[0])).toBe(i === 0 ? 1 : -1) })
    // x²: the parabola and the three secants from the origin
    const R = M.DFR
    const par = paths(s, BLUE)[0]
    pathG(par, R).forEach(([x, y]) => expect(y, `x = ${x.toFixed(2)}`).toBeCloseTo(x * x, 1))
    const secs = bonds(s, VIOLET, 0.045).sort((a, b) => toG(R, b.to!)[0] - toG(R, a.to!)[0])
    expect(secs).toHaveLength(3)
    const slopes = secs.map((o) => slopeG(o, R))
    slopes.forEach((q, i) => { expect(q).toBeCloseTo([1, 0.5, 0.25][i], 1); const [x, y] = toG(R, secs[i].to!); expect(y).toBeCloseTo(x * x, 1); expect(q).toBeCloseTo(x, 1) })    // slope of the secant through (h, h²) is h
    slopes.slice(1).forEach((q, i) => expect(q / slopes[i]).toBeCloseTo(0.5, 1))       // decreasing to the limit 0
    expect(numsIn(textStarting(s, 'slopes'))).toEqual([1, 0.5, 0.25]); expect(numsIn(after(textStarting(s, 'f′(0)'), '='))).toEqual([0])       // the limit of the secant slopes, read after the "=" (the label also contains the 0 of f′(0))
    for (const t of ['f = |x|', 'left −1', 'right +1', 'no f′(0)', 'f = x²']) expect(texts(s)).toContain(t)
  })

  it('math.real.taylor-rigorous: the level 24 R₃(1) = 0.195 is met by the drawn sin t at c ≈ 0.197 in (0, 1), and sin(c)/24 is exactly the Taylor error sin 1 − 5/6 = 0.00814', () => {
    const s = M.buildTaylorRigorousScene()
    const F = M.TYL
    const curveP = pathG(paths(s, BLUE)[0], F)
    curveP.forEach(([t, y]) => expect(y, `t = ${t.toFixed(2)}`).toBeCloseTo(Math.sin(t), 2))
    expect(curveP[0][0]).toBeCloseTo(0, 2); expect(curveP[curveP.length - 1][0]).toBeCloseTo(1, 2)
    // the level: independent computation of the Taylor error and of 24 R₃(1)
    const R3 = Math.sin(1) - (1 - 1 / 6)
    const lvl = bonds(s, VIOLET, 0.035)[0]
    const level = toG(F, lvl.from!)[1]
    expect(near(lvl.from![1], lvl.to![1], 1e-9)).toBe(true)
    expect(level).toBeCloseTo(24 * R3, 2)
    // the point c: green dot on the drawn curve at the level, between 0 and 1, with a guide down to the t axis
    const [d] = dots(s, GREEN)
    const [c, yc] = toG(F, d.position!)
    expect(c).toBeGreaterThan(0); expect(c).toBeLessThan(1)
    expect(yc).toBeCloseTo(level, 2); expect(valueAt(curveP, c)).toBeCloseTo(level, 2); expect(Math.sin(c)).toBeCloseTo(level, 2)
    const guide = bonds(s, GREEN, 0.035)[0]
    expect(near(guide.from![0], d.position![0], 0.011)).toBe(true); expect(toG(F, guide.from!)[1]).toBeCloseTo(0, 2)
    // Lagrange: the fourth derivative of sin at c, divided by 4!, is the error
    expect(Math.sin(c) / 24).toBeCloseTo(R3, 3)
    expect(Math.asin(level)).toBeCloseTo(c, 2)
    // the captions
    expect(numsIn(textStarting(s, 'error')).slice(-1)).toEqual([Math.round(R3 * 1e5) / 1e5])
    const [k24, r, v] = numsIn(textStarting(s, '24'))
    expect(k24).toBe(24); expect(k24 * r).toBeCloseTo(v, 2); expect(v).toBeCloseTo(level, 2)
    expect(numsIn(textStarting(s, 'c ≈'))).toEqual([Math.round(Math.asin(24 * (Math.sin(1) - 5 / 6)) * 1000) / 1000])   // the label is the exact c = arcsin(24 R₃(1))
    expect(numsIn(textStarting(s, 'c ≈'))[0]).toBeCloseTo(c, 2)                                                    // and the drawn marker agrees within P()'s 0.01 rounding
  })

  it('math.real.ftc-rigorous: the hatched area under t² on [0, 2] is F(2) = 8/3, the tangent of F = x³/3 at 2 has the slope f(2) = 4, and ∫₁³ t² = F(3) − F(1) = 9 − 0.33 = 8.67', () => {
    const s = M.buildFtcRigorousScene()
    const L = M.FTL, Rf = M.FTR
    const f = pathG(paths(s, BLUE)[0], L), F = pathG(paths(s, RED)[0], Rf)
    f.forEach(([t, y]) => expect(y, `f(${t.toFixed(2)})`).toBeCloseTo(t * t, 1))
    F.forEach(([x, y]) => expect(y, `F(${x.toFixed(2)})`).toBeCloseTo((x * x * x) / 3, 1))
    // Part 1: the hatched area (midpoint sum of the 9 drawn lines plus the thin sliver 0 … 0.2) is the height of F at 2
    const hatch = bonds(s, BLUE, 0.03)
    expect(hatch).toHaveLength(9)
    const dx = 0.2
    const area = hatch.reduce((a, h) => a + (toG(L, h.to!)[1] - toG(L, h.from!)[1]) * dx, 0) + Math.pow(0.2, 3) / 3
    const F2 = valueAt(F, 2)
    expect(area).toBeCloseTo(8 / 3, 1); expect(F2).toBeCloseTo(8 / 3, 1); expect(Math.abs(area - F2)).toBeLessThan(0.1)
    // F′(2) = f(2): the green tangent through the dot on F, its slope against the drawn f
    const tan = bonds(s, GREEN, 0.04)[0]
    const [dx2, dy2] = toG(Rf, dots(s, GREEN)[0].position!)
    expect(dx2).toBeCloseTo(2, 2); expect(dy2).toBeCloseTo(8 / 3, 1)
    expect(distToLine(tan, dots(s, GREEN)[0].position!)).toBeLessThan(0.02)
    const slope = slopeG(tan, Rf)
    expect(slope).toBeCloseTo(4, 1)
    expect(slope).toBeCloseTo(valueAt(f, 2), 1)                                       // = f(2) read off the drawn left curve
    expect((valueAt(F, 2.1) - valueAt(F, 1.9)) / 0.2).toBeCloseTo(slope, 0)            // = the slope of the drawn F itself
    expect(numsIn(textStarting(s, 'F′(2)'))).toEqual([2, 2, 4])
    // Part 2: two violet heights of F; their difference is the integral of f over [1, 3]
    const hs = bonds(s, VIOLET, 0.04).sort((a, b) => toG(Rf, a.from!)[1] - toG(Rf, b.from!)[1])
    expect(hs).toHaveLength(2)
    const [h1, h3] = hs.map((o) => toG(Rf, o.from!)[1])
    expect(h1).toBeCloseTo(1 / 3, 1); expect(h3).toBeCloseTo(9, 1)
    expect(Number(labelAt(s, [Rf.ox - 0.45, hs[1].from![1]], 0.06)!.text)).toBe(Math.round(h3)); expect(Number(labelAt(s, [Rf.ox - 0.75, hs[0].from![1]], 0.06)!.text)).toBeCloseTo(h1, 1)
    expect(trapezoid(f, 1, 3)).toBeCloseTo(h3 - h1, 0)                                 // ∫₁³ of the drawn f
    expect(trapezoid(f, 1, 3)).toBeCloseTo(26 / 3, 1)
    expect(evalLR(after(textStarting(s, '9 −'), ''))).toBeCloseTo(8.67, 2)
    for (const t of ['f(t) = t²', 'area 0 to 2 = 2.67', 'F(x) = x³/3']) expect(texts(s)).toContain(t)
  })

  it('math.meas.measure: the three drawn disjoint pieces have the measures 0.3, 0.2, 0.5 which add up to μ([0, 1]) = 1', () => {
    const s = M.buildMeasureScene()
    const segs = [...bonds(s, BLUE, 0.22), ...bonds(s, RED, 0.22), ...bonds(s, GREEN, 0.22)].sort((a, b) => a.from![0] - b.from![0])
    expect(segs).toHaveLength(3)
    const total = segs[2].to![0] - segs[0].from![0]
    const mu = segs.map((o) => (o.to![0] - o.from![0]) / total)
    mu.forEach((v, i) => expect(v).toBeCloseTo([0.3, 0.2, 0.5][i], 2))
    // disjoint pieces that together fill the whole bar
    segs.slice(1).forEach((o, i) => expect(near(o.from![0], segs[i].to![0], 0.011)).toBe(true))
    expect(sum(mu)).toBeCloseTo(1, 2)
    // the measures written under the pieces are the drawn lengths; the letters A, B, C sit above
    segs.forEach((o, i) => { const c = (o.from![0] + o.to![0]) / 2; expect(Number(labelAt(s, [c, o.from![1] - 0.65], 0.06)!.text)).toBeCloseTo(mu[i], 1); expect(labelAt(s, [c, o.from![1] + 0.65], 0.06)!.text).toBe('ABC'[i]) })
    expect(evalLR(textStarting(s, '0.3 +'))).toBeCloseTo(1, 10)
    expect(numsIn(textStarting(s, 'μ(X)'))).toEqual([1]); expect(numsIn(textStarting(s, 'μ(∅)'))).toEqual([0])
  })

  it('math.meas.lebesgue-measure: E has length 0.25 + 0.3 = 0.55, every drawn cover contains E and is at least 0.55 long (0.75, 0.63, 0.57) and the covers tighten towards 0.55', () => {
    const s = M.buildLebesgueMeasureScene()
    const nums = labelsOf(s).filter((l) => /^[01]$/.test(l.text!) && l.position![1] < -2.3)
    const x0 = nums.find((l) => l.text === '0')!.position![0], x1 = nums.find((l) => l.text === '1')!.position![0], w = x1 - x0
    const E = sortX(bonds(s, BLUE, 0.14)).map((o) => [(o.from![0] - x0) / w, (o.to![0] - x0) / w] as const)
    expect(E).toHaveLength(2)
    const mE = sum(E.map(([a, b]) => b - a))
    expect(mE).toBeCloseTo(0.55, 2)
    E.forEach(([a, b], i) => expect(b - a).toBeCloseTo([0.25, 0.3][i], 2))
    // the covers: grey bars grouped by height, top row loosest
    const bars = bonds(s, SLATE, 0.07)
    expect(bars).toHaveLength(6)
    const ys = [...new Set(bars.map((b) => b.from![1]))].sort((a, b) => b - a)
    expect(ys).toHaveLength(3)
    const totals = ys.map((y) => {
      const iv = bars.filter((b) => near(b.from![1], y, 1e-9)).map((b) => [(b.from![0] - x0) / w, (b.to![0] - x0) / w] as const)
      // E ⊆ the union of the open intervals of this cover
      for (const [a, b] of E) for (let k = 0; k <= 50; k++) { const t = a + ((b - a) * k) / 50; expect(iv.some(([p, q]) => t > p && t < q), `t = ${t.toFixed(3)} uncovered`).toBe(true) }
      return sum(iv.map(([p, q]) => q - p))
    })
    expect(totals.map((v) => Math.round(v * 100) / 100)).toEqual([0.75, 0.63, 0.57])
    totals.forEach((v) => expect(v).toBeGreaterThan(mE))                               // a cover is never shorter than E
    totals.slice(1).forEach((v, i) => expect(v).toBeLessThan(totals[i]))
    expect(totals[2] - mE).toBeLessThan(0.03)                                           // and gets as close as we like
    totals.forEach((v, i) => expect(numsIn(labelAt(s, [3.4, ys[i]], 0.06)!.text!)).toEqual([Math.round(v * 100) / 100]))
    expect(evalLR(after(textStarting(s, 'm(E)'), '= '))).toBeCloseTo(mE, 2)
  })

  it('math.meas.measure-zero: the drawn intervals around 5 points have the lengths ε/2ⁿ (ε = 0.4 and 0.1), total 0.3875 and 0.096875 — as small as we like', () => {
    const s = M.buildMeasureZeroScene()
    const pts = dots(s, BLUE).sort((a, b) => a.position![0] - b.position![0])
    expect(pts).toHaveLength(5)
    const W = (pts[4].position![0] - pts[0].position![0]) / 0.8                       // the points sit at 0.1, 0.3, …, 0.9 of the width
    const rows = [bonds(s, RED, 0.12), bonds(s, GREEN, 0.12)].map((r) => sortX(r))
    expect(rows[0]).toHaveLength(5); expect(rows[1]).toHaveLength(5)
    const eps: number[] = []
    const totals = rows.map((row) => {
      const widths = row.map((o) => (o.to![0] - o.from![0]) / W)
      row.forEach((o, i) => expect(near((o.from![0] + o.to![0]) / 2, pts[i].position![0], 0.011), `interval ${i + 1} centred on its point`).toBe(true))
      const e = widths[0] * 2
      eps.push(e)
      widths.forEach((w, i) => expect(w, `ε/2^${i + 1}`).toBeCloseTo(e / Math.pow(2, i + 1), 2))
      widths.slice(1, 4).forEach((w, i) => expect(w / widths[i]).toBeCloseTo(0.5, 0))
      return sum(widths)
    })
    expect(eps[0]).toBeCloseTo(0.4, 2); expect(eps[1]).toBeCloseTo(0.1, 2)
    expect(totals[0]).toBeCloseTo(0.3875, 2); expect(totals[1]).toBeCloseTo(0.096875, 2)
    totals.forEach((t, i) => expect(t).toBeLessThanOrEqual(eps[i] + 1e-9))             // Σ ε/2ⁿ ≤ ε
    expect(totals[0] / totals[1]).toBeCloseTo(4, 0)
    const exact = (e: number) => e * (1 - Math.pow(2, -5))                                     // Σ ε/2ⁿ, n = 1..5, the five drawn intervals
    expect(numsIn(textStarting(s, 'ε = 0.4'))).toEqual([0.4, Math.round(exact(0.4) * 100) / 100]); expect(numsIn(textStarting(s, 'ε = 0.1'))).toEqual([0.1, Math.round(exact(0.1) * 1000) / 1000])
    totals.forEach((t, i) => expect(t).toBeCloseTo(exact(eps[i]), 1))                          // the drawn widths (rounded to 0.01 each) agree with the exact sum
    for (const t of ['a countable set', 'ε → 0: measure 0']) expect(texts(s)).toContain(t)
  })

  it('math.meas.convergence-theorems: the drawn fₙ = min(nx, 1) increase with n to 1, and their integrals are 0.5, 0.75, 0.875 = 1 − 1/(2n) → 1', () => {
    const s = M.buildConvergenceTheoremsScene()
    const F = M.MCV
    const cs = [BLUE, VIOLET, GREEN].map((c) => pathG(paths(s, c)[0], F))
    const ns = [1, 2, 4]
    cs.forEach((c, k) => c.forEach(([x, y]) => expect(y, `f${ns[k]}(${x.toFixed(2)})`).toBeCloseTo(Math.min(ns[k] * x, 1), 1)))
    const areas = cs.map((c) => trapezoid(c, 0, 1))
    areas.forEach((a, k) => { expect(a).toBeCloseTo(1 - 1 / (2 * ns[k]), 1); expect(a).toBeCloseTo([0.5, 0.75, 0.875][k], 1) })
    areas.slice(1).forEach((a, k) => expect(a).toBeGreaterThan(areas[k]))                // the integrals increase …
    for (let x = 0; x <= 1.0001; x += 0.05) { const v = cs.map((c) => valueAt(c, Math.min(x, 1))); expect(v[0]).toBeLessThanOrEqual(v[1] + 0.02); expect(v[1]).toBeLessThanOrEqual(v[2] + 0.02); expect(v[2]).toBeLessThanOrEqual(1.02) }   // … because the functions increase
    const lim = bonds(s, RED, 0.05)[0]
    expect(toG(F, lim.from!)[1]).toBeCloseTo(1, 2); expect(toG(F, lim.to!)[1]).toBeCloseTo(1, 2)
    // the integral of the limit f = 1 on [0, 1] is 1 and the gaps 1 − ∫fₙ = 1/(2n) halve
    expect(1 - areas[2]).toBeLessThan(1 - areas[1]); expect(1 - areas[1]).toBeLessThan(1 - areas[0])
    expect(numsIn(textStarting(s, '∫fₙ ='))).toEqual([0.5, 0.75, 0.875])
    expect(texts(s)).toContain('fₙ ↑ f = 1')
  })

  it('math.meas.lp-space: the drawn diamond, circle and square are the unit balls of p = 1, 2, ∞ (nested), and the marked point has the norms 1.41, 1, 0.71', () => {
    const s = M.buildLpSpaceScene()
    const circ = paths(s, BLUE)[0].points!
    const cx = sum(circ.slice(0, -1).map((p) => p[0])) / (circ.length - 1), cy = sum(circ.slice(0, -1).map((p) => p[1])) / (circ.length - 1)
    const R = sum(circ.map((p) => Math.hypot(p[0] - cx, p[1] - cy))) / circ.length
    circ.forEach((p) => expect(Math.hypot(p[0] - cx, p[1] - cy)).toBeCloseTo(R, 1))
    const rel = (p: readonly number[]) => [(p[0] - cx) / R, (p[1] - cy) / R] as const
    // p = 1: four red lines whose corners satisfy |x| + |y| = 1
    const dia = bonds(s, RED, 0.05)
    expect(dia).toHaveLength(4)
    dia.forEach((o) => [o.from!, o.to!].forEach((p) => { const [x, y] = rel(p); expect(Math.abs(x) + Math.abs(y)).toBeCloseTo(1, 1) }))
    // p = ∞: four green lines whose corners satisfy max(|x|, |y|) = 1
    const sqr = bonds(s, GREEN, 0.05)
    expect(sqr).toHaveLength(4)
    sqr.forEach((o) => [o.from!, o.to!].forEach((p) => { const [x, y] = rel(p); expect(Math.max(Math.abs(x), Math.abs(y))).toBeCloseTo(1, 1) }))
    // nested: every point of the circle is outside-or-on the diamond and inside-or-on the square
    circ.forEach((p) => { const [x, y] = rel(p); expect(Math.abs(x) + Math.abs(y)).toBeGreaterThanOrEqual(1 - 0.02); expect(Math.max(Math.abs(x), Math.abs(y))).toBeLessThanOrEqual(1 + 0.02) })
    dia.forEach((o) => { const [x, y] = rel(o.from!); expect(Math.hypot(x, y)).toBeCloseTo(1, 1) })     // the diamond's corners lie on the circle
    // the violet point and its three norms
    const [q] = dots(s, VIOLET)
    const [x, y] = rel(q.position!)
    const n1 = Math.abs(x) + Math.abs(y), n2 = Math.hypot(x, y), ninf = Math.max(Math.abs(x), Math.abs(y))
    const ideal = [Math.SQRT2, 1, Math.SQRT1_2]                                                   // the point (1/√2, 1/√2): |x|+|y|, √(x²+y²), max(|x|,|y|)
    expect(numsIn(textStarting(s, 'norms'))).toEqual(ideal.map((v) => Math.round(v * 100) / 100))
    ;[n1, n2, ninf].forEach((v, i) => expect(Math.abs(v - ideal[i])).toBeLessThanOrEqual(0.02))     // the drawn point agrees within P()'s 0.01 rounding
    expect(n1).toBeGreaterThan(n2); expect(n2).toBeGreaterThan(ninf)
    for (const t of ['p = 1', 'p = 2', 'p = ∞']) expect(texts(s)).toContain(t)
  })

  it('math.meas.l2-space: f = (3, 4) has the squared coordinates 9 + 16 = 25 = ‖f‖², and in the rotated orthonormal basis 5² + 0² = 25 as well (Parseval)', () => {
    const s = M.buildL2SpaceScene()
    const [ax1, ax2] = arrows(s, SLATE).sort((a, b) => Math.abs(b.to![0] - b.from![0]) - Math.abs(a.to![0] - a.from![0]))
    const O = ax1.from!
    expect(near(ax2.from![0], O[0], 0.001) && near(ax2.from![1], O[1], 0.001)).toBe(true)
    const e1 = [(ax1.to![0] - O[0]) / len(ax1), (ax1.to![1] - O[1]) / len(ax1)], e2 = [(ax2.to![0] - O[0]) / len(ax2), (ax2.to![1] - O[1]) / len(ax2)]
    expect(dotp(e1, e2)).toBeCloseTo(0, 2)                                            // an orthonormal pair of directions
    const u = labelsOf(s).find((l) => l.text === '3' && near(l.position![1], O[1] - 0.45, 0.02))!.position![0] - O[0]
    u && expect(u).toBeGreaterThan(0)
    const unit = u / 3
    const [fa] = arrows(s, GREEN)
    const f = [(fa.to![0] - O[0]) / unit, (fa.to![1] - O[1]) / unit]
    expect(f[0]).toBeCloseTo(3, 1); expect(f[1]).toBeCloseTo(4, 1)
    expect(labelAt(s, [O[0] - 0.45, O[1] + 4 * unit], 0.03)!.text).toBe('4')
    const c1 = dotp(f, e1), c2 = dotp(f, e2)
    expect(c1 * c1 + c2 * c2).toBeCloseTo(f[0] * f[0] + f[1] * f[1], 6)
    expect(c1 * c1 + c2 * c2).toBeCloseTo(25, 0)
    expect(evalLR(textStarting(s, '9 + 16'))).toBe(25)
    expect(numsIn(textStarting(s, '‖f‖'))).toEqual([Math.round(Math.hypot(f[0], f[1]))])
    // the rotated basis (violet arrows): orthonormal directions, f = 5 e₁′ + 0 e₂′
    const rot = arrows(s, VIOLET).sort((a, b) => len(b) - len(a))
    expect(rot).toHaveLength(2)
    const r1 = [(rot[0].to![0] - O[0]) / len(rot[0]), (rot[0].to![1] - O[1]) / len(rot[0])], r2 = [(rot[1].to![0] - O[0]) / len(rot[1]), (rot[1].to![1] - O[1]) / len(rot[1])]
    expect(dotp(r1, r2)).toBeCloseTo(0, 2); expect(Math.hypot(r1[0], r1[1])).toBeCloseTo(1, 2)
    const d1 = dotp(f, r1), d2 = dotp(f, r2)
    expect(d1).toBeCloseTo(5, 1); expect(d2).toBeCloseTo(0, 1)
    expect(d1 * d1 + d2 * d2).toBeCloseTo(c1 * c1 + c2 * c2, 1)                       // basis-independent
    expect(evalLR(after(textStarting(s, 'other basis'), ': '))).toBe(25)
    // each rotated arrow carries its own name at its tip: e₁′ on the long one (along f), e₂′ on the short perpendicular one
    const nearTip = (o: Obj, name: string) => { const l = labelsOf(s).find((q) => q.text === name)!; return dist(l.position!, o.to!) < 0.9 }
    expect(nearTip(rot[0], 'e₁′')).toBe(true); expect(nearTip(rot[1], 'e₂′')).toBe(true)
    expect(nearTip(rot[0], 'e₂′')).toBe(false); expect(nearTip(rot[1], 'e₁′')).toBe(false)
  })
})
