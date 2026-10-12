/**
 * Mathematics visual campaign, batch 20 (2026-10-12): multivariable calculus — functions of two variables, partial
 * derivatives, the gradient and directional derivatives, critical points, vector fields, divergence and curl, line
 * integrals, Fubini and double / triple integrals, the Jacobian, surface integrals and the divergence theorem. Curves,
 * arrows and lines are read back from the DRAWN coordinates (3-D pictures by inverting the oblique projection) and the
 * quantities each figure states are recomputed independently (finite differences of the functions, numerical quadrature).
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB20'

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
  ['math.calc.multivariable-intro', M.buildMultivariableIntroScene, 'math-multivariable-intro'],
  ['math.calc.partial-derivatives', M.buildPartialDerivativesScene, 'math-partial-derivatives'],
  ['math.calc.gradient', M.buildGradientScene, 'math-gradient'],
  ['math.calc.directional-derivative', M.buildDirectionalDerivativeScene, 'math-directional-derivative'],
  ['math.calc.multivariable-extrema', M.buildMultivariableExtremaScene, 'math-multivariable-extrema'],
  ['math.calc.vector-fields', M.buildVectorFieldsScene, 'math-vector-fields'],
  ['math.calc.curl-divergence', M.buildCurlDivergenceScene, 'math-curl-divergence'],
  ['math.calc.line-integrals', M.buildLineIntegralsScene, 'math-line-integrals'],
  ['math.calc.change-of-variables', M.buildChangeOfVariablesScene, 'math-change-of-variables'],
  ['math.calc.double-integrals', M.buildDoubleIntegralsScene, 'math-double-integrals'],
  ['math.calc.multiple-integrals', M.buildMultipleIntegralsScene, 'math-multiple-integrals'],
  ['math.calc.triple-integrals', M.buildTripleIntegralsScene, 'math-triple-integrals'],
  ['math.calc.surface-integrals', M.buildSurfaceIntegralsScene, 'math-surface-integrals'],
  ['math.calc.divergence-theorem', M.buildDivergenceTheoremScene, 'math-divergence-theorem'],
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

// ── helpers ─────────────────────────────────────────────────────────────────────────────────────────
const mean = (xs: number[]) => sum(xs) / xs.length
const dist = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1])
const segsOf = (s: SceneSpec, thickness: number, color?: string) => lines(s, color).filter((o) => o.type === 'bond' && near(o.thickness ?? 0, thickness, 1e-9))
const pathsOf = (s: SceneSpec, color: string, min = 8) => paths(s, color).filter((p) => p.points!.length >= min)
const fitCircle = (p: Obj) => { const pts = p.points!.slice(0, -1), cx = mean(pts.map((q) => q[0])), cy = mean(pts.map((q) => q[1])); return { c: [cx, cy], r: mean(pts.map((q) => Math.hypot(q[0] - cx, q[1] - cy))) } }
const simpson = (f: (x: number) => number, a: number, b: number, n = 2000) => { const h = (b - a) / n; let acc = f(a) + f(b); for (let i = 1; i < n; i++) acc += f(a + i * h) * (i % 2 === 1 ? 4 : 2); return (acc * h) / 3 }
/** central finite differences of a scalar function of two variables */
const gradNum = (f: (x: number, y: number) => number, x: number, y: number, h = 1e-5): [number, number] => [(f(x + h, y) - f(x - h, y)) / (2 * h), (f(x, y + h) - f(x, y - h)) / (2 * h)]
const hessNum = (f: (x: number, y: number) => number, x: number, y: number, h = 1e-3) => ({ fxx: (f(x + h, y) - 2 * f(x, y) + f(x - h, y)) / (h * h), fyy: (f(x, y + h) - 2 * f(x, y) + f(x, y - h)) / (h * h), fxy: (f(x + h, y + h) - f(x + h, y - h) - f(x - h, y + h) + f(x - h, y - h)) / (4 * h * h) })
const bbox = (ls: Obj[]) => { const xs = ls.flatMap((o) => [o.from![0], o.to![0]]), ys = ls.flatMap((o) => [o.from![1], o.to![1]]); return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) } }
const shoelace = (poly: number[][]) => Math.abs(sum(poly.map((p, i) => p[0] * poly[(i + 1) % poly.length][1] - poly[(i + 1) % poly.length][0] * p[1]))) / 2

describe('the mathematics each figure draws', () => {
  it('Introduction: f(x, y) = x² + y² sends A = (1, 0) and B = (0, 1) (same circle) to the same value 1 and C = (1, 1) to 2; the arrows end on those ticks of the number line', () => {
    const s = M.buildMultivariableIntroScene(), { dom, rng } = M.MVI
    const inv = (p: number[]) => [(p[0] - dom.c[0]) / dom.u, (p[1] - dom.c[1]) / dom.u]
    const dA = dots(s, BLUE).find((d) => d.radius === 0.13)!, dB = dots(s, RED).find((d) => d.radius === 0.13)!, dC = dots(s, GREEN).find((d) => d.radius === 0.13)!
    const [A, B, C] = [dA, dB, dC].map((d) => inv(d.position!))
    expect(A).toEqual(approx([1, 0], 2)); expect(B).toEqual(approx([0, 1], 2)); expect(C).toEqual(approx([1, 1], 2))
    const f = (p: number[]) => p[0] * p[0] + p[1] * p[1]
    expect(f(A)).toBeCloseTo(f(B), 2); expect(f(C)).toBeCloseTo(2, 1)                                                                                      // A and B share a value
    const circle = fitCircle(pathsOf(s, VIOLET, 40)[0]); expect(circle.r / dom.u).toBeCloseTo(1, 1); expect(dist(inv(dA.position!), [0, 0])).toBeCloseTo(1, 1); expect(dist(inv(dC.position!), [0, 0])).toBeCloseTo(Math.SQRT2, 1)
    for (const [col, p] of [[BLUE, A], [RED, B], [GREEN, C]] as const) { const a = arrows(s, col)[0]; expect((a.to![1] - rng.y0) / rng.u).toBeCloseTo(f(p), 1); expect(a.to![0]).toBeCloseTo(rng.x - 0.2, 1) }   // each arrow lands on the value f(point)
    const ticks = labelsOf(s).filter((o) => /^[0-3]$/.test(o.text ?? '') && near(o.position![0], rng.x + 0.45, 1e-6)); expect(ticks.map((o) => Number(o.text)).sort()).toEqual([0, 1, 2, 3])
    ticks.forEach((o) => expect((o.position![1] - rng.y0) / rng.u).toBeCloseTo(Number(o.text), 6))
    expect(texts(s)).toEqual(expect.arrayContaining(['f: ℝ² → ℝ', 'f(A) = f(B) = 1', 'f(C) = 2']))
  })

  it('Partial derivatives: the level curves are x²y = c; the blue slice is z = x² with tangent slope 2 and the red slice z = y with slope 1 at P = (1, 1), matching the difference quotients ∂f/∂x = 2xy, ∂f/∂y = x²', () => {
    const s = M.buildPartialDerivativesScene(), { dom, top, bot, cs } = M.PD
    const invD = (p: number[]) => [(p[0] - dom.c[0]) / dom.u, (p[1] - dom.c[1]) / dom.u]
    const f = (x: number, y: number) => x * x * y
    const levels = pathsOf(s, SLATE, 20).map((p) => { const lv = p.points!.map((q) => { const [x, y] = invD(q); return f(x, y) }); expect(Math.max(...lv) - Math.min(...lv)).toBeLessThan(0.12); return Math.round(mean(lv) * 10) / 10 })
    expect(levels.sort((a, b) => a - b)).toEqual([...cs].sort((a, b) => a - b))
    const P0 = invD(dots(s, GREEN).find((d) => d.radius === 0.13)!.position!); expect(P0).toEqual(approx([1, 1], 1))
    const hLine = segsOf(s, 0.05, BLUE)[0], vLine = segsOf(s, 0.05, RED)[0]
    expect(invD(hLine.from!)[1]).toBeCloseTo(1, 1); expect(invD(hLine.to!)[1]).toBeCloseTo(1, 1); expect(invD(vLine.from!)[0]).toBeCloseTo(1, 1); expect(invD(vLine.to!)[0]).toBeCloseTo(1, 1)   // y held at 1; x held at 1
    const invT = (p: number[]) => [(p[0] - top.x0) / top.u, (p[1] - top.y0) / top.u]
    for (const q of pathsOf(s, BLUE)[0].points!) { const [x, z] = invT(q); expect(Math.abs(z - x * x)).toBeLessThan(0.02 + 0.02 * x) }                                       // the slice f(x, 1) = x²
    const tx = segsOf(s, 0.04, GREEN)[0]; expect(slope(tx)).toBeCloseTo(2, 1); expect(distToLine(tx, [top.x0 + top.u, top.y0 + top.u])).toBeLessThan(0.03)            // tangent of slope 2 through (1, 1)
    const invB = (p: number[]) => [(p[0] - bot.x0) / bot.u, (p[1] - bot.y0) / bot.u]
    const ry = segsOf(s, 0.05, RED).find((o) => o.from![0] > 0 && o.to![0] > 0)!; expect(slope(ry)).toBeCloseTo(1, 2); expect(invB(ry.to!)[1]).toBeCloseTo(invB(ry.to!)[0], 1)   // the slice f(1, y) = y
    const ty = segsOf(s, 0.025, GREEN)[0]; expect(slope(ty)).toBeCloseTo(1, 1)
    const h = 1e-6; expect((f(1 + h, 1) - f(1, 1)) / h).toBeCloseTo(2, 4); expect((f(1, 1 + h) - f(1, 1)) / h).toBeCloseTo(1, 4)                                          // the difference quotients
    expect(M.fxPD(1, 1)).toBe(2); expect(M.fyPD(1)).toBe(1)
    expect(texts(s)).toEqual(expect.arrayContaining(['∂f/∂x = 2', '∂f/∂y = 1']))
  })

  it('Gradient: the green arrows equal ∇f = (2x, 4y) by finite differences of f = x² + 2y², are perpendicular to the level curve (violet tangent), and no direction beats the gradient direction', () => {
    const s = M.buildGradientScene(), { c, u, k, levels, pts } = M.GRD
    const inv = (p: number[]) => [(p[0] - c[0]) / u, (p[1] - c[1]) / u]
    const f = (x: number, y: number) => x * x + 2 * y * y
    const ells = pathsOf(s, SLATE, 40).map((p) => { const lv = p.points!.map((q) => { const [x, y] = inv(q); return f(x, y) }); expect(Math.max(...lv) - Math.min(...lv)).toBeLessThan(0.08); return Math.round(mean(lv)) })
    expect(ells.sort()).toEqual([...levels].sort())
    const arrs = arrows(s, GREEN); expect(arrs).toHaveLength(3)
    for (const a of arrs) {
      const [x, y] = inv(a.from!), g = gradNum(f, x, y), v = [(a.to![0] - a.from![0]) / (u * k), (a.to![1] - a.from![1]) / (u * k)]
      expect(v[0]).toBeCloseTo(g[0], 1); expect(v[1]).toBeCloseTo(g[1], 1)                                                                                   // the arrow IS the gradient (scaled)
    }
    expect(arrs.map((a) => inv(a.from!)).sort((p, q) => p[0] - q[0]).map((p) => p.map((v) => Math.round(v * 10) / 10))).toEqual([...pts].sort((p, q) => p[0] - q[0]).map((p) => [...p]))
    const tan = segsOf(s, 0.035, VIOLET)[0], d = [tan.to![0] - tan.from![0], tan.to![1] - tan.from![1]], g1 = gradNum(f, 1, 0.5)
    expect(Math.abs(d[0] * g1[0] + d[1] * g1[1]) / (Math.hypot(...d) * Math.hypot(...g1))).toBeLessThan(0.02)                                                     // tangent ⟂ gradient
    const mid = inv([(tan.from![0] + tan.to![0]) / 2, (tan.from![1] + tan.to![1]) / 2]); expect(mid).toEqual(approx([1, 0.5], 1))
    let best = -Infinity, bestDeg = 0; for (let deg = 0; deg < 360; deg += 1) { const t = (deg * Math.PI) / 180, r = (f(1 + 1e-5 * Math.cos(t), 0.5 + 1e-5 * Math.sin(t)) - f(1 - 1e-5 * Math.cos(t), 0.5 - 1e-5 * Math.sin(t))) / 2e-5; if (r > best) { best = r; bestDeg = deg } }
    expect(bestDeg).toBe(45); expect(best).toBeCloseTo(Math.hypot(...g1), 3)                                                                                  // steepest ascent along ∇f, rate |∇f|
    expect(texts(s)).toEqual(expect.arrayContaining(['gradient ⟂ level curve']))
  })

  it('Directional derivative: the drawn unit arrows at 45°, 135°, 0° have rates 2.83, 0, 2 (finite differences along them); the right curve is D_u f(θ) = 2 cos θ + 2 sin θ with maximum |∇f| at 45°', () => {
    const s = M.buildDirectionalDerivativeScene(), { left, right, p, angles } = M.DDV
    const invL = (q: number[]) => [(q[0] - left.c[0]) / left.u, (q[1] - left.c[1]) / left.u]
    const f = (x: number, y: number) => x * x + 2 * y * y
    const rate = (dir: number[]) => { const h = 1e-5, n = Math.hypot(...dir), u = [dir[0] / n, dir[1] / n]; return (f(p[0] + h * u[0], p[1] + h * u[1]) - f(p[0] - h * u[0], p[1] - h * u[1])) / (2 * h) }
    const arrs = [...arrows(s, GREEN), ...arrows(s, RED), ...arrows(s, BLUE)].filter((a) => a.from![0] < 0)
    expect(arrs).toHaveLength(3)
    const want = { [GREEN]: 2 * Math.SQRT2, [RED]: 0, [BLUE]: 2 }
    for (const a of arrs) { const dir = [(a.to![0] - a.from![0]) / left.u, (a.to![1] - a.from![1]) / left.u]; expect(rate(dir)).toBeCloseTo(want[a.color as keyof typeof want], 1) }  // D_u f for the drawn direction
    const angOf = (a: Obj) => (((Math.atan2(a.to![1] - a.from![1], a.to![0] - a.from![0]) * 180) / Math.PI) + 360) % 360
    expect(arrs.map(angOf).sort((a, b) => a - b).map((v) => Math.round(v))).toEqual([...angles].sort((a, b) => a - b))
    expect(invL(dots(s, INK).find((d) => d.radius === 0.12)!.position!)).toEqual(approx([p[0], p[1]], 1))
    const invR = (q: number[]) => [(q[0] - right.x0) / right.ux, (q[1] - right.y0) / right.uy]
    const wave = pathsOf(s, VIOLET, 40)[0].points!.map(invR)
    for (const [deg, v] of wave) { const t = (deg * Math.PI) / 180; expect(Math.abs(v - rate([Math.cos(t), Math.sin(t)]))).toBeLessThan(0.04 + 0.04 * Math.abs(2 * Math.sin(t) - 2 * Math.cos(t)) * 0.02) }   // every point is D_u f for its angle
    const top = wave.reduce((b, q) => (q[1] > b[1] ? q : b)); expect(top[1]).toBeCloseTo(2 * Math.SQRT2, 1); expect(top[0]).toBeCloseTo(45, -1)
    const marks = [dots(s, GREEN), dots(s, RED), dots(s, BLUE)].map((d) => d.find((q) => q.radius === 0.12 && q.position![0] > 0)!).map((d) => invR(d.position!))
    expect(marks.map((m) => Math.round(m[0]))).toEqual([45, 135, 0]); [2.83, 0, 2].forEach((v, i) => expect(Math.abs(marks[i][1] - v)).toBeLessThan(0.02))
    expect(texts(s)).toEqual(expect.arrayContaining(['∇f', 'P', 'max 2.83']))
  })

  it('Extrema: the numeric Hessian at the origin of each function gives D = 4, 4, −4 and the classification min, max, saddle (colours blue, red, violet); the drawn contours are x² + y² = c and x² − y² = c', () => {
    const s = M.buildMultivariableExtremaScene(), { cx, cy, u, levels } = M.EXT
    const fs = [(x: number, y: number) => x * x + y * y, (x: number, y: number) => -x * x - y * y, (x: number, y: number) => x * x - y * y]
    const panel = (q: number[]) => (q[0] < -1.5 ? 0 : q[0] < 1.8 ? 1 : 2)
    const inv = (i: number) => (q: number[]) => [(q[0] - cx[i]) / u, (q[1] - cy) / u]
    const kinds = ['min', 'max', 'saddle'], colours = [BLUE, RED, VIOLET]
    fs.forEach((f, i) => {
      const H = hessNum(f, 0, 0), D = H.fxx * H.fyy - H.fxy * H.fxy, g = gradNum(f, 0, 0)
      expect(g[0]).toBeCloseTo(0, 6); expect(g[1]).toBeCloseTo(0, 6)                                                                                          // a critical point
      const kind = D < 0 ? 'saddle' : H.fxx > 0 ? 'min' : 'max'; expect(kind).toBe(kinds[i]); expect(M.classify({ fxx: H.fxx, fyy: H.fyy, fxy: H.fxy })).toBe(kinds[i])
      const dot0 = dots(s, colours[i]).find((d) => d.radius === 0.14)!; expect(inv(i)(dot0.position!)).toEqual(approx([0, 0], 1))
      expect(texts(s)).toContain(i === 2 ? `D ${Math.round(D)}` : `D ${Math.round(D)} · fₓₓ ${Math.round(H.fxx)}`)
      expect(texts(s)).toContain(kinds[i])
    })
    const circ = pathsOf(s, SLATE, 40).filter((p) => p.points!.length > 40)
    const byPanel = (i: number) => circ.filter((p) => panel(p.points![0]) === i)
    for (const i of [0, 1]) { expect(byPanel(i)).toHaveLength(levels.length); for (const p of byPanel(i)) { const r2 = mean(p.points!.map((q) => { const [x, y] = inv(i)(q); return x * x + y * y })); expect(levels.some((c) => Math.abs(r2 - c) < 0.06)).toBe(true) } }
    const hyp = pathsOf(s, SLATE, 20).filter((p) => p.points!.length <= 30 && panel(p.points![0]) === 2); expect(hyp).toHaveLength(8)
    for (const p of hyp) { const lv = p.points!.map((q) => { const [x, y] = inv(2)(q); return x * x - y * y }); expect(Math.max(...lv) - Math.min(...lv)).toBeLessThan(0.08); expect([0.5, 1, -0.5, -1].some((c) => Math.abs(mean(lv) - c) < 0.06)).toBe(true) }
    const diag = segsOf(s, 0.025, SLATE); expect(diag.map((o) => Math.round(slope(o))).sort()).toEqual([-1, 1])                                                  // the zero level x² = y²
  })

  it('Vector fields: every drawn arrow equals F = (−y, x) or G = (x, y) at its lattice point; the finite-difference curl is 2 (rotation) and 0 (radial), divergence 0 and 2; the radial field is the gradient of ½(x² + y²) and ⟂ the circles', () => {
    const s = M.buildVectorFieldsScene(), { left, right, u, k, lattice, rings } = M.VFD
    const read = (c: number[], col: string) => arrows(s, col).filter((a) => (c[0] < 0 ? a.from![0] < 0 : a.from![0] > 0)).map((a) => ({ p: [(a.from![0] - c[0]) / u, (a.from![1] - c[1]) / u], v: [(a.to![0] - a.from![0]) / (u * k), (a.to![1] - a.from![1]) / (u * k)] }))
    const F = read(left, BLUE), G = read(right, GREEN)
    expect(F).toHaveLength(lattice.length ** 2 - 1); expect(G).toHaveLength(lattice.length ** 2 - 1)
    for (const { p, v } of F) { expect(v[0]).toBeCloseTo(-p[1], 1); expect(v[1]).toBeCloseTo(p[0], 1) }
    for (const { p, v } of G) { expect(v[0]).toBeCloseTo(p[0], 1); expect(v[1]).toBeCloseTo(p[1], 1) }
    const find = (field: typeof F, x: number, y: number) => field.find((q) => Math.abs(q.p[0] - x) < 0.05 && Math.abs(q.p[1] - y) < 0.05)!.v
    const curl = (field: typeof F, x: number, y: number) => (find(field, x + 1, y)[1] - find(field, x - 1, y)[1]) / 2 - (find(field, x, y + 1)[0] - find(field, x, y - 1)[0]) / 2
    const div = (field: typeof F, x: number, y: number) => (find(field, x + 1, y)[0] - find(field, x - 1, y)[0]) / 2 + (find(field, x, y + 1)[1] - find(field, x, y - 1)[1]) / 2
    expect(curl(F, 1, 1)).toBeCloseTo(2, 1); expect(div(F, 1, 1)).toBeCloseTo(0, 1); expect(curl(G, 1, 1)).toBeCloseTo(0, 1); expect(div(G, 1, 1)).toBeCloseTo(2, 1)
    const pot = (x: number, y: number) => 0.5 * (x * x + y * y)
    for (const { p, v } of G) { const g = gradNum(pot, p[0], p[1]); expect(v[0]).toBeCloseTo(g[0], 1); expect(v[1]).toBeCloseTo(g[1], 1) }                          // G = ∇f
    const rs = pathsOf(s, VIOLET, 30).map((p) => fitCircle(p).r / u).sort((a, b) => a - b); rings.forEach((r, i) => expect(rs[i]).toBeCloseTo(r, 2))
    for (const [x, y] of [[1, 0], [0, 1], [-1, 0], [0, -1]]) { const v = find(G, x, y); expect(Math.abs(v[0] * -y + v[1] * x)).toBeLessThan(0.05) }                  // radial arrows ⟂ the circle's tangent
    expect(texts(s)).toEqual(expect.arrayContaining(['F = (−y, x)', 'G = (x, y)', 'potential f = ½(x² + y²)', 'conservative: path-independent']))
  })

  it('Curl and divergence: from the arrows drawn on the unit square, outward flux of G = (x, y) is 2 and the circulation of F = (−y, x) is 2 (= ∇·G × 1, ∇×F × 1)', () => {
    const s = M.buildCurlDivergenceScene(), { left, right, u, k, sq } = M.CND
    const read = (c: number[], col: string) => arrows(s, col).filter((a) => (c[0] < 0 ? a.from![0] < 0 : a.from![0] > 0)).map((a) => ({ p: [(a.from![0] - c[0]) / u, (a.from![1] - c[1]) / u], v: [(a.to![0] - a.from![0]) / (u * k), (a.to![1] - a.from![1]) / (u * k)] }))
    const G = read(left, GREEN), F = read(right, BLUE); expect(G).toHaveLength(4); expect(F).toHaveLength(4)
    const x1 = sq.x0 + sq.s, y1 = sq.y0 + sq.s
    const sides: Array<{ at: number[]; n: number[]; t: number[] }> = [{ at: [x1, 1], n: [1, 0], t: [0, 1] }, { at: [1, y1], n: [0, 1], t: [-1, 0] }, { at: [sq.x0, 1], n: [-1, 0], t: [0, -1] }, { at: [1, sq.y0], n: [0, -1], t: [1, 0] }]
    const at = (field: typeof G, q: number[]) => field.find((e) => dist(e.p, q) < 0.05)!.v
    let flux = 0, circ = 0
    for (const sd of sides) { const g = at(G, sd.at), f = at(F, sd.at); flux += (g[0] * sd.n[0] + g[1] * sd.n[1]) * sq.s; circ += (f[0] * sd.t[0] + f[1] * sd.t[1]) * sq.s }
    expect(flux).toBeCloseTo(2, 1); expect(circ).toBeCloseTo(2, 1)
    const area = sq.s * sq.s; expect(flux / area).toBeCloseTo(M.divG, 1); expect(circ / area).toBeCloseTo(M.curlF, 1)
    const gG = (x: number, y: number) => [x, y], gF = (x: number, y: number) => [-y, x]
    const h = 1e-5, div = (gG(1 + h, 1)[0] - gG(1 - h, 1)[0]) / (2 * h) + (gG(1, 1 + h)[1] - gG(1, 1 - h)[1]) / (2 * h), curl = (gF(1 + h, 1)[1] - gF(1 - h, 1)[1]) / (2 * h) - (gF(1, 1 + h)[0] - gF(1, 1 - h)[0]) / (2 * h)
    expect(div).toBeCloseTo(2, 4); expect(curl).toBeCloseTo(2, 4)                                                                                           // the pointwise values
    for (const o of [left, right]) { const box = segsOf(s, 0.04, VIOLET).filter((e) => (o[0] < 0 ? e.from![0] < 0 : e.from![0] > 0)); expect(box).toHaveLength(4); for (const e of box) expect(len(e) / u).toBeCloseTo(sq.s, 1) }
    expect(texts(s)).toEqual(expect.arrayContaining(['∇·G = 2: net outflow', '∇×F = 2: net circulation']))
  })

  it('Line integrals: summing F·dr along the DRAWN arc gives π/2 ≈ 1.571 and along the chord 1; the two differ, matching ∬ curl dA = 2 × (π/4 − ½) over the segment between them', () => {
    const s = M.buildLineIntegralsScene(), { o, u, k } = M.LIN
    const inv = (p: number[]) => [(p[0] - o[0]) / u, (p[1] - o[1]) / u] as [number, number]
    const F = (x: number, y: number): [number, number] => [-y, x]
    const work = (path: Array<[number, number]>) => { let w = 0; for (let i = 1; i < path.length; i++) { const a = path[i - 1], b = path[i], m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], f = F(m[0], m[1]); w += f[0] * (b[0] - a[0]) + f[1] * (b[1] - a[1]) } return w }
    const arc = pathsOf(s, GREEN, 40)[0].points!.map(inv)
    expect(arc[0]).toEqual(approx([1, 0], 1)); expect(arc[arc.length - 1]).toEqual(approx([0, 1], 1))
    for (const q of arc) expect(Math.hypot(q[0], q[1])).toBeCloseTo(1, 1)
    const wArc = work(arc); expect(wArc).toBeCloseTo(Math.PI / 2, 1)
    const ch = segsOf(s, 0.05, VIOLET)[0], a = inv(ch.from!), b = inv(ch.to!)
    const chord = Array.from({ length: 201 }, (_, i) => [a[0] + ((b[0] - a[0]) * i) / 200, a[1] + ((b[1] - a[1]) * i) / 200] as [number, number])
    const wChord = work(chord); expect(wChord).toBeCloseTo(1, 1); expect(Math.abs(wArc - wChord)).toBeGreaterThan(0.4)                                          // path-dependent
    const segArea = Math.PI / 4 - 0.5; expect(wArc - wChord).toBeCloseTo(2 * segArea, 1)                                                                          // Green: difference = ∬ curl dA
    const h = 1e-5; expect((F(1 + h, 1)[1] - F(1 - h, 1)[1]) / (2 * h) - (F(1, 1 + h)[0] - F(1, 1 - h)[0]) / (2 * h)).toBeCloseTo(2, 4)                              // curl ≠ 0: not conservative
    const lens = (path: Array<[number, number]>) => sum(path.slice(1).map((q, i) => Math.hypot(q[0] - path[i][0], q[1] - path[i][1]))); expect(lens(arc)).toBeCloseTo(Math.PI / 2, 1); expect(lens(chord)).toBeCloseTo(Math.SQRT2, 2)   // scalar ∫ ds
    const arcArrows = arrows(s, BLUE), chordArrows = arrows(s, RED); expect(arcArrows).toHaveLength(5); expect(chordArrows).toHaveLength(5)
    for (const ar of arcArrows) { const p = inv(ar.from!), v = [(ar.to![0] - ar.from![0]) / (u * 0.45), (ar.to![1] - ar.from![1]) / (u * 0.45)]; expect(Math.hypot(p[0], p[1])).toBeCloseTo(1, 1); expect(v[0]).toBeCloseTo(-p[1], 1); expect(v[1]).toBeCloseTo(p[0], 1); expect(Math.abs(v[0] * p[0] + v[1] * p[1])).toBeLessThan(0.05) }   // tangent to the arc, F·T = 1
    for (const ar of chordArrows) { const p = inv(ar.from!); expect(p[0] + p[1]).toBeCloseTo(1, 1); const v = [(ar.to![0] - ar.from![0]) / (u * 0.45), (ar.to![1] - ar.from![1]) / (u * 0.45)], T = [-Math.SQRT1_2, Math.SQRT1_2]; expect(v[0] * T[0] + v[1] * T[1]).toBeCloseTo(Math.SQRT1_2, 1) }   // F·T = 1/√2 on the chord
    expect(k).toBeGreaterThan(0)
    expect(texts(s)).toEqual(expect.arrayContaining(['arc: π/2 ≈ 1.571', 'chord: 1', 'path-dependent', 'A', 'B']))
  })

  it('Change of variables: the polar grid maps to arcs r = const and rays θ = const; the green cell has area 0.04 in (r, θ) and ≈ 0.06 in (x, y), ratio 1.5 = r (the Jacobian); the sector area is ∬ r dr dθ = 3π/4', () => {
    const s = M.buildChangeOfVariablesScene(), { uv, xy, r, cell } = M.CHV
    const invUV = (p: number[]) => [(p[0] - uv.x0) / uv.ur + r[0], (p[1] - uv.y0) / uv.ut], invXY = (p: number[]) => [(p[0] - xy.c[0]) / xy.u, (p[1] - xy.c[1]) / xy.u]
    const arcs = pathsOf(s, SLATE, 20); expect(arcs).toHaveLength(5)
    expect(arcs.map((p) => Math.round(mean(p.points!.map((q) => Math.hypot(...invXY(q)))) * 100) / 100).sort((a, b) => a - b)).toEqual([1, 1.25, 1.5, 1.75, 2])               // circles r = const
    const rays = segsOf(s, 0.02, SLATE).filter((o) => o.from![0] > 0 || o.to![0] > 0); expect(rays).toHaveLength(5)
    rays.map((o) => { const a = invXY(o.from!); return (Math.atan2(a[1], a[0]) * 8) / Math.PI }).sort((a, b) => a - b).forEach((v, i) => expect(v).toBeCloseTo(i, 1))   // θ = 0, π/8, …, π/2
    const gridUV = segsOf(s, 0.02, SLATE).filter((o) => o.from![0] < 0 && o.to![0] < 0); expect(gridUV).toHaveLength(10)
    const rect = bbox(segsOf(s, 0.045, GREEN).filter((o) => o.from![0] < 0 && o.to![0] < 0)); const aUV = ((rect.x1 - rect.x0) / uv.ur) * ((rect.y1 - rect.y0) / uv.ut)
    expect(aUV).toBeCloseTo(0.04, 2)
    const curves = pathsOf(s, GREEN, 8), inner = curves.reduce((b, c) => (mean(c.points!.map((q) => Math.hypot(...invXY(q)))) < mean(b.points!.map((q) => Math.hypot(...invXY(q)))) ? c : b)), outer = curves.find((c) => c !== inner)!
    const quad = [...inner.points!, ...[...outer.points!].reverse()].map(invXY)
    const aXY = shoelace(quad); expect(aXY).toBeCloseTo(0.06, 2); expect(aXY / aUV).toBeCloseTo(1.5, 1)                                                          // image area / source area
    expect(aXY / aUV).toBeCloseTo((cell.r[0] + cell.r[1]) / 2, 1)                                                                                                 // = r at the cell: the Jacobian |∂(x,y)/∂(r,θ)| = r
    const J = (rr: number, t: number) => { const h = 1e-6; const dx = [(Math.cos(t) * (rr + h) - Math.cos(t) * (rr - h)) / (2 * h), (Math.sin(t) * (rr + h) - Math.sin(t) * (rr - h)) / (2 * h)], dt = [(rr * Math.cos(t + h) - rr * Math.cos(t - h)) / (2 * h), (rr * Math.sin(t + h) - rr * Math.sin(t - h)) / (2 * h)]; return dx[0] * dt[1] - dx[1] * dt[0] }
    expect(J(1.5, 0.6)).toBeCloseTo(1.5, 5)
    expect(simpson((rr) => rr * (Math.PI / 2), 1, 2)).toBeCloseTo((3 * Math.PI) / 4, 6); expect((Math.PI * (4 - 1)) / 4).toBeCloseTo((3 * Math.PI) / 4, 12)       // ∬ r dr dθ = sector area
    expect(texts(s)).toEqual(expect.arrayContaining(['dr dθ', 'r dr dθ', 'J = r']))
  })

  it('Double integral: the eight needles stand over the cell centres with height x + y (the plane z = x + y); their volumes sum to 3 = ∫₀²∫₀¹(x + y) dy dx, in either order', () => {
    const s = M.buildDoubleIntegralsScene(), o = M.DBL
    const needles = segsOf(s, 0.05, BLUE); expect(needles).toHaveLength(8)
    const dx = o.x1 / o.nx, dy = o.y1 / o.ny
    const vol = needles.map((n) => { const [x, y] = obliqueInvXY(o, n.from!), z = (n.to![1] - n.from![1]) / o.uz; expect(Math.abs(n.to![0] - n.from![0])).toBeLessThan(1e-9); expect(z).toBeCloseTo(x + y, 1); return z * dx * dy })
    const cells = needles.map((n) => obliqueInvXY(o, n.from!)).map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).sort()
    const expected: string[] = []; for (let i = 0; i < o.nx; i++) for (let j = 0; j < o.ny; j++) expected.push(`${((i + 0.5) * dx).toFixed(2)},${((j + 0.5) * dy).toFixed(2)}`); expect(cells).toEqual(expected.sort())
    expect(sum(vol)).toBeCloseTo(3, 1)                                                                                                                       // the Riemann sum
    const exact1 = simpson((x) => simpson((y) => x + y, 0, 1, 200), 0, 2, 200), exact2 = simpson((y) => simpson((x) => x + y, 0, 2, 200), 0, 1, 200)
    expect(exact1).toBeCloseTo(3, 8); expect(exact2).toBeCloseTo(3, 8); expect(simpson((x) => x + 0.5, 0, 2)).toBeCloseTo(3, 9); expect(M.doubleSum()).toBeCloseTo(3, 12)  // Fubini, either order
    const O = M.oblique(o), plane = segsOf(s, 0.04, GREEN); expect(plane).toHaveLength(4)
    const corners = [[0, 0], [o.x1, 0], [o.x1, o.y1], [0, o.y1]]
    corners.forEach((c, i) => { const a = O([c[0], c[1], c[0] + c[1]]), b = O([corners[(i + 1) % 4][0], corners[(i + 1) % 4][1], corners[(i + 1) % 4][0] + corners[(i + 1) % 4][1]]); expect(plane.some((e) => dist(e.from!, a) < 0.02 && dist(e.to!, b) < 0.02)).toBe(true) })   // the plane through the corner heights
    for (const n of needles) { const top = [n.to![0], n.to![1]]; const [x, y] = obliqueInvXY(o, n.from!); const zc = (top[1] - O([x, y, 0])[1]) / o.uz; expect(zc).toBeCloseTo(x + y, 1) }
    expect(texts(s)).toEqual(expect.arrayContaining(['z = x + y', 'Σ f ΔA = 3', '∫₀² (x + ½) dx = 3']))
    function obliqueInvXY(ob: typeof o, base: number[]): [number, number] { const y = (base[1] - ob.oy) / ob.dyy; return [(base[0] - ob.ox - ob.dxy * y) / ob.ux, y] }
  })

  it("Multiple integrals (Fubini): the blue vertical strips (y from 0 to x) and the red horizontal strips (x from y to 1) both fill the triangle with area ½, and ∬ (x + y) dA = ½ in either order", () => {
    const s = M.buildMultipleIntegralsScene(), { left, right, u, n } = M.FUB
    const V = segsOf(s, 0.1, BLUE), H = segsOf(s, 0.1, RED); expect(V).toHaveLength(n); expect(H).toHaveLength(n)
    for (const v of V) { const x = (v.from![0] - left[0]) / u, y0 = (v.from![1] - left[1]) / u, y1 = (v.to![1] - left[1]) / u; expect(y0).toBeCloseTo(0, 2); expect(y1).toBeCloseTo(x, 1) }                    // strip: y from 0 to x
    for (const h of H) { const y = (h.from![1] - right[1]) / u, x0 = (h.from![0] - right[0]) / u, x1 = (h.to![0] - right[0]) / u; expect(x0).toBeCloseTo(y, 1); expect(x1).toBeCloseTo(1, 2) }                   // strip: x from y to 1
    const areaV = sum(V.map((v) => len(v) / u / n)), areaH = sum(H.map((h) => len(h) / u / n))
    expect(areaV).toBeCloseTo(0.5, 1); expect(areaH).toBeCloseTo(0.5, 1); expect(Math.abs(areaV - areaH)).toBeLessThan(0.02)
    const tri = segsOf(s, 0.03, SLATE); expect(tri).toHaveLength(6)
    const f = (x: number, y: number) => x + y
    const I1 = simpson((x) => simpson((y) => f(x, y), 0, x, 400), 0, 1, 400), I2 = simpson((y) => simpson((x) => f(x, y), y, 1, 400), 0, 1, 400)
    expect(I1).toBeCloseTo(0.5, 6); expect(I2).toBeCloseTo(0.5, 6); expect(M.fubiniArea(n, true)).toBeCloseTo(0.5, 12); expect(M.fubiniArea(n, false)).toBeCloseTo(0.5, 12)
    expect(texts(s)).toEqual(expect.arrayContaining(['dy dx', 'dx dy', 'both orders: area ½']))
  })

  it('Triple integral: the drawn rings decode (oblique inverse) to the unit circle at heights 0 and 2, so the cylinder has volume π·1²·2 = 2π = ∫₀²∫₀^2π∫₀¹ r dr dθ dz; the green box edges lie on the cylindrical coordinates and its volume ≈ r dr dθ dz', () => {
    const s = M.buildTripleIntegralsScene(), o = M.TRI
    const rings = pathsOf(s, SLATE, 60); expect(rings).toHaveLength(2)
    const [low, high] = [...rings].sort((a, b) => a.points![0][1] - b.points![0][1])
    for (const q of low.points!) { const [x, y] = M.obliqueInv(o, [q[0], q[1]], 0); expect(Math.hypot(x, y)).toBeCloseTo(o.R, 1) }                                                  // base circle radius 1 at z = 0
    for (const q of high.points!) { const [x, y] = M.obliqueInv(o, [q[0], q[1]], o.H); expect(Math.hypot(x, y)).toBeCloseTo(o.R, 1) }                                                // top circle radius 1 at z = 2
    expect(mean(high.points!.map((q) => q[1])) - mean(low.points!.map((q) => q[1]))).toBeCloseTo(o.uz * o.H, 1)                                                              // height 2
    const sides = segsOf(s, 0.02, SLATE); expect(sides).toHaveLength(4); for (const e of sides) { expect(Math.abs(e.to![0] - e.from![0])).toBeLessThan(1e-9); expect(e.to![1] - e.from![1]).toBeCloseTo(o.uz * o.H, 1) }
    const V = simpson((z) => simpson((th) => simpson((r) => r, 0, o.R, 400), 0, 2 * Math.PI, 400), 0, o.H, 4)
    expect(V).toBeCloseTo(2 * Math.PI, 8); expect(Math.PI * o.R * o.R * o.H).toBeCloseTo(2 * Math.PI, 12); expect(M.tripleVolume()).toBeCloseTo(2 * Math.PI, 9)
    const O = M.oblique(o), el = o.el, edges = segsOf(s, 0.03, GREEN); expect(edges).toHaveLength(12)
    const corner = (ri: number, ti: number, zi: number) => O(M.cylPoint(el.r[ri], el.th[ti], el.z[zi]))
    const want: number[][][] = []; for (const a of [0, 1]) for (const b of [0, 1]) { want.push([corner(0, a, b), corner(1, a, b)], [corner(a, 0, b), corner(a, 1, b)], [corner(a, b, 0), corner(a, b, 1)]) }
    for (const [p, q] of want) expect(edges.some((e) => (dist(e.from!, p) < 0.02 && dist(e.to!, q) < 0.02) || (dist(e.from!, q) < 0.02 && dist(e.to!, p) < 0.02))).toBe(true)         // every box edge is an edge between cylindrical corners
    const P3 = (ri: number, ti: number, zi: number) => M.cylPoint(el.r[ri], el.th[ti], el.z[zi]), sub = (a: readonly number[], b: readonly number[]) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
    const er = sub(P3(1, 0, 0), P3(0, 0, 0)), et = sub(P3(0, 1, 0), P3(0, 0, 0)), ez = sub(P3(0, 0, 1), P3(0, 0, 0))
    const det = Math.abs(er[0] * (et[1] * ez[2] - et[2] * ez[1]) - er[1] * (et[0] * ez[2] - et[2] * ez[0]) + er[2] * (et[0] * ez[1] - et[1] * ez[0]))
    const dV = ((el.r[0] + el.r[1]) / 2) * (el.r[1] - el.r[0]) * (el.th[1] - el.th[0]) * (el.z[1] - el.z[0]), wedge = 0.5 * (el.r[1] ** 2 - el.r[0] ** 2) * (el.th[1] - el.th[0]) * (el.z[1] - el.z[0])
    expect(wedge).toBeCloseTo(dV, 12); expect(Math.abs(det - dV) / dV).toBeLessThan(0.16)                                   // the exact cylindrical element has volume r dr dθ dz; the drawn straight-edged box (inner corner) is within 16 %
    expect(texts(s)).toEqual(expect.arrayContaining(['0 ≤ z ≤ 2', 'volume element r dr dθ dz', '∭ dV = 2π']))
  })

  it('Surface integral: the rim and normals match the tilted patch z = x/2; n = (−½, 0, 1)/√1.25 is ⟂ the patch, dS = √1.25 dA, F·n = 0.894 and the flux of F = (0, 0, 1) is 0.894 × 1.118 = 1', () => {
    const s = M.buildSurfaceIntegralsScene(), o = M.SRF, O = M.oblique(o)
    const corner = (x: number, y: number): [number, number, number] => [x, y, x / 2]
    const rim = segsOf(s, 0.05, GREEN); expect(rim).toHaveLength(4)
    const cs = [[0, 0], [1, 0], [1, 1], [0, 1]]
    cs.forEach((c, i) => { const a = O(corner(c[0], c[1])), b = O(corner(cs[(i + 1) % 4][0], cs[(i + 1) % 4][1])); expect(rim.some((e) => dist(e.from!, a) < 0.02 && dist(e.to!, b) < 0.02)).toBe(true) })
    expect(segsOf(s, 0.02, SLATE)).toHaveLength(6)
    const rx = [1, 0, 0.5], ry = [0, 1, 0]
    const cross = [rx[1] * ry[2] - rx[2] * ry[1], rx[2] * ry[0] - rx[0] * ry[2], rx[0] * ry[1] - rx[1] * ry[0]]; expect(cross).toEqual([-0.5, -0, 1].map((v) => expect.closeTo(v, 12)))
    const dS = Math.hypot(...cross), n = cross.map((v) => v / dS)
    expect(dS).toBeCloseTo(Math.sqrt(1.25), 12); expect(n[0] * rx[0] + n[1] * rx[1] + n[2] * rx[2]).toBeCloseTo(0, 12); expect(n[0] * ry[0] + n[1] * ry[1] + n[2] * ry[2]).toBeCloseTo(0, 12)   // n ⟂ the patch
    const Fn = 1 * n[2]; expect(Fn).toBeCloseTo(0.894, 3); expect(Fn * dS * 1).toBeCloseTo(1, 12)                                                                                                    // flux = F·n × area = 1
    let flux = 0; const N = 40; for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) flux += (0 * cross[0] + 0 * cross[1] + 1 * cross[2]) / (N * N); expect(flux).toBeCloseTo(1, 12)    // ∬ F·(r_x × r_y) dA, equal to the shadow area
    const proj = (v: number[]) => [o.ux * v[0] + o.dxy * v[1], o.uz * v[2] + o.dyy * v[1]]
    const nArr = arrows(s, RED), fArr = arrows(s, BLUE); expect(nArr).toHaveLength(4); expect(fArr).toHaveLength(4)
    for (const a of nArr) { const d = [a.to![0] - a.from![0], a.to![1] - a.from![1]], want = proj(n.map((v) => 0.55 * v)); expect(d[0]).toBeCloseTo(want[0], 1); expect(d[1]).toBeCloseTo(want[1], 1) }   // the red arrows are the normal
    for (const a of fArr) { const d = [a.to![0] - a.from![0], a.to![1] - a.from![1]], want = proj([0, 0, 0.55]); expect(d[0]).toBeCloseTo(want[0], 1); expect(d[1]).toBeCloseTo(want[1], 1) }               // the blue arrows are F
    expect(texts(s)).toEqual(expect.arrayContaining(['dS = 1.12 dA', 'F = (0, 0, 1)', 'F·n = 0.89', '∬ F·dS = 1']))
  })

  it('Divergence theorem: the drawn great circles decode to the unit sphere; the arrows are F = (x, y, z) pointing outward (F·n = 1), so flux = 4π; ∇·F = 3 and ∭ 3 dV = 4π — equal', () => {
    const s = M.buildDivergenceTheoremScene(), o = M.DVT, O = M.oblique(o)
    const circles = pathsOf(s, SLATE, 60); expect(circles).toHaveLength(3)
    const decode = [
      (q: number[]) => { const [x, y] = M.obliqueInv(o, [q[0], q[1]], 0); return [x, y, 0] },
      (q: number[]) => [(q[0] - o.ox) / o.ux, 0, (q[1] - o.oy) / o.uz],
      (q: number[]) => { const y = (q[0] - o.ox) / o.dxy; return [0, y, (q[1] - o.oy - o.dyy * y) / o.uz] },
    ]
    for (const c of circles) { const ok = decode.some((d) => c.points!.every((q) => Math.abs(Math.hypot(...d(q)) - 1) < 0.02)); expect(ok).toBe(true) }                                         // each is a great circle of the unit sphere
    const arrs = arrows(s, GREEN); expect(arrs).toHaveLength(6)
    for (const a of o.axes) { const base = O(a), tip = O([1.45 * a[0], 1.45 * a[1], 1.45 * a[2]]); expect(arrs.some((r) => dist(r.from!, base) < 0.02 && dist(r.to!, tip) < 0.02)).toBe(true) }   // F = r points outward along each axis
    for (const a of o.axes) { const n = a, F = a; expect(F[0] * n[0] + F[1] * n[1] + F[2] * n[2]).toBe(1) }                                                                          // F·n = 1 on the unit sphere
    const flux = simpson((th) => simpson((ph) => Math.sin(ph) * 1, 0, Math.PI, 400), 0, 2 * Math.PI, 4)                                                                                // ∬ F·n dS = ∫∫ sin φ dφ dθ
    const total = simpson((r) => simpson((ph) => simpson(() => 3 * r * r * Math.sin(ph), 0, 2 * Math.PI, 4), 0, Math.PI, 400), 0, 1, 400)                                              // ∭ ∇·F dV in spherical coordinates
    expect(flux).toBeCloseTo(4 * Math.PI, 6); expect(total).toBeCloseTo(4 * Math.PI, 6); expect(M.fluxSphere()).toBeCloseTo(M.divVolume(), 12)
    const h = 1e-5, divF = ((1 + h) - (1 - h)) / (2 * h) * 3; expect(divF).toBeCloseTo(3, 6)                                                                                            // ∂x/∂x + ∂y/∂y + ∂z/∂z = 3
    expect(texts(s)).toEqual(expect.arrayContaining(['F = (x, y, z)', '∬ F·dS = 4π', '3 × (4π/3) = 4π']))
  })
})
