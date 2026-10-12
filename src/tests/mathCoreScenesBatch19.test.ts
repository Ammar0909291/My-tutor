/**
 * Mathematics visual campaign, batch 19 (2026-10-12): differential equations — slope fields, Euler's method, damped
 * oscillators, resonance, stability, Fourier series (partial sums, Gibbs, sine / cosine), the PDE classification and the
 * heat, wave and Laplace equations. Curves are compared with the equation they claim to solve, using solutions the test
 * computes itself (RK4 integration, numerically integrated Fourier coefficients), never the generator's own formulas.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB19'

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
  ['math.de.slope-field', M.buildSlopeFieldScene, 'math-slope-field'],
  ['math.de.euler-method', M.buildEulerMethodScene, 'math-euler-method'],
  ['math.num.euler-method', M.buildEulerMethodScene, 'math-euler-method'],
  ['math.de.harmonic-oscillator', M.buildHarmonicOscillatorScene, 'math-harmonic-oscillator'],
  ['math.de.resonance', M.buildResonanceScene, 'math-resonance'],
  ['math.de.stability-analysis', M.buildStabilityAnalysisScene, 'math-stability-analysis'],
  ['math.de.fourier-series', M.buildFourierSeriesScene, 'math-fourier-series'],
  ['math.de.fourier-convergence', M.buildFourierConvergenceScene, 'math-fourier-convergence'],
  ['math.de.fourier-sine-cosine', M.buildFourierSineCosineScene, 'math-fourier-sine-cosine'],
  ['math.de.pde', M.buildPdeScene, 'math-pde'],
  ['math.de.heat-equation', M.buildHeatEquationScene, 'math-heat-equation'],
  ['math.de.wave-equation', M.buildWaveEquationScene, 'math-wave-equation'],
  ['math.de.laplace-equation', M.buildLaplaceEquationScene, 'math-laplace-equation'],
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

// ── independent numerics: RK4 and Simpson ─────────────────────────────────────────────────────────
const mean = (xs: number[]) => sum(xs) / xs.length
const dist = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1])
const segsOf = (s: SceneSpec, thickness: number, color?: string) => lines(s, color).filter((o) => o.type === 'bond' && near(o.thickness ?? 0, thickness, 1e-9))
const pathsOf = (s: SceneSpec, color: string, min = 8) => paths(s, color).filter((p) => p.points!.length >= min)
/** Integrate y′ = f(t, y) by RK4 on [0, T]; returns a sampler. */
function rk4(f: (t: number, y: number[]) => number[], y0: number[], T: number, steps = 40000) {
  const h = T / steps, out: number[][] = [y0]; let y = y0
  const add = (a: number[], b: number[], k: number) => a.map((v, i) => v + k * b[i])
  for (let i = 0; i < steps; i++) {
    const t = i * h, k1 = f(t, y), k2 = f(t + h / 2, add(y, k1, h / 2)), k3 = f(t + h / 2, add(y, k2, h / 2)), k4 = f(t + h, add(y, k3, h))
    y = y.map((v, j) => v + (h / 6) * (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j])); out.push(y)
  }
  return (t: number) => out[Math.min(steps, Math.max(0, Math.round(t / h)))]
}
/** Distance in value from a drawn point to a curve y = f(x), allowing for the 0.01 screen rounding of x (matters on steep parts). */
const offBy = (f: (x: number) => number, x: number, y: number, dx = 0.008) => Math.min(...Array.from({ length: 9 }, (_, i) => Math.abs(y - f(x - dx + (i * dx) / 4))))
const simpson = (f: (x: number) => number, a: number, b: number, n = 4000) => { const h = (b - a) / n; let acc = f(a) + f(b); for (let i = 1; i < n; i++) acc += f(a + i * h) * (i % 2 === 1 ? 4 : 2); return (acc * h) / 3 }

describe('the mathematics each figure draws', () => {
  it('Slope field: every drawn segment sits on a lattice point with slope x − y (x −3…3, y −2…3); the green curve through (0, 1) follows the field and equals x − 1 + 2e^(−x); the violet line is the flat isocline y = x', () => {
    const s = M.buildSlopeFieldScene(), { ox, oy, u, x, y } = M.SLF
    const inv = (p: number[]) => [(p[0] - ox) / u, (p[1] - oy) / u]
    const segs = segsOf(s, 0.025, SLATE); expect(segs).toHaveLength((x[1] - x[0] + 1) * (y[1] - y[0] + 1))
    const seen = new Set<string>()
    for (const o of segs) {
      const a = inv(o.from!), b = inv(o.to!), mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2
      expect(mx).toBeCloseTo(Math.round(mx), 1); expect(my).toBeCloseTo(Math.round(my), 1); seen.add(`${Math.round(mx)},${Math.round(my)}`)
      const ang = Math.atan2(b[1] - a[1], b[0] - a[0]), want = Math.atan(Math.round(mx) - Math.round(my))
      expect(Math.abs(Math.atan(Math.tan(ang)) - want)).toBeLessThan(0.05)                                                                               // slope of the segment = x − y
    }
    expect(seen.size).toBe(segs.length)
    const sol = pathsOf(s, GREEN)[0].points!.map(inv)
    for (let i = 0; i < sol.length; i++) { const [px, py] = sol[i]; expect(Math.abs(py - (px - 1 + 2 * Math.exp(-px)))).toBeLessThan(0.02) }
    for (let i = 0; i + 8 < sol.length; i += 4) { const a = sol[i], b = sol[i + 8], m = (b[1] - a[1]) / (b[0] - a[0]), mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; expect(Math.abs(m - (mid[0] - mid[1]))).toBeLessThan(0.2) }   // tangent to the field all the way (secant over ~0.5)
    const start = dots(s, GREEN).find((d) => d.radius === 0.13)!; expect(inv(start.position!)[0]).toBeCloseTo(0, 1); expect(inv(start.position!)[1]).toBeCloseTo(1, 1)
    const iso = segsOf(s, 0.03, VIOLET)[0]; expect(slope(iso)).toBeCloseTo(1, 2); expect(distToLine(iso, [ox, oy])).toBeLessThan(0.02)                          // the isocline y = x passes through the origin
    for (const o of segs) { const a = inv(o.from!), b = inv(o.to!), mx = Math.round((a[0] + b[0]) / 2), my = Math.round((a[1] + b[1]) / 2); if (mx === my) expect(Math.abs(b[1] - a[1])).toBeLessThan(0.02) }   // flat on y = x
    expect(texts(s)).toEqual(expect.arrayContaining(['y′ = x − y', 'through (0, 1)', 'flat on y = x']))
  })

  it("Euler's method: the drawn polylines satisfy yₙ₊₁ = yₙ + h·f(xₙ, yₙ) with f = y (1, 1.5, 2.25, 3.375, 5.0625 for h = 0.5; 1.25⁸ = 5.96 for h = 0.25), each lying below the exact eˣ, and the error shrinks with h", () => {
    const s = M.buildEulerMethodScene(), { ox, oy, ux, uy } = M.EUL
    const inv = (p: number[]) => [(p[0] - ox) / ux, (p[1] - oy) / uy]
    const poly = (color: string, thick: number) => segsOf(s, thick, color).map((o) => [inv(o.from!), inv(o.to!)]).sort((p, q) => p[0][0] - q[0][0])
    const check = (segs: number[][][], h: number) => {
      expect(segs).toHaveLength(Math.round(2 / h))
      segs.forEach(([a, b], i) => { expect(a[0]).toBeCloseTo(i * h, 2); expect(b[0] - a[0]).toBeCloseTo(h, 2); expect(a[1]).toBeCloseTo((1 + h) ** i, 1); expect(b[1] - a[1]).toBeCloseTo(h * a[1], 1) })                // y_{n+1} = y_n + h·y_n
      for (let i = 1; i < segs.length; i++) expect(dist(segs[i][0], segs[i - 1][1])).toBeLessThan(0.02)                                                    // a connected path
      return segs[segs.length - 1][1][1]
    }
    const end1 = check(poly(RED, 0.04), 0.5), end2 = check(poly(GREEN, 0.03), 0.25)
    expect(end1).toBeCloseTo(5.0625, 1); expect(end2).toBeCloseTo(1.25 ** 8, 1)
    const exact = pathsOf(s, BLUE)[0].points!.map(inv); for (const [px, py] of exact) expect(Math.abs(py - Math.exp(px))).toBeLessThan(0.05 + 0.02 * Math.exp(px))
    const err = (h: number) => Math.exp(2) - (1 + h) ** Math.round(2 / h)
    expect(err(0.5)).toBeCloseTo(2.33, 2); expect(err(0.25)).toBeCloseTo(1.43, 2); expect(err(0.25)).toBeLessThan(err(0.5))
    const ratio = err(0.25) / err(0.125); expect(ratio).toBeGreaterThan(1.5); expect(ratio).toBeLessThan(2.1)                                                // error ~ proportional to h: halving h roughly halves it
    for (const [a] of poly(RED, 0.04)) expect(a[1]).toBeLessThan(Math.exp(a[0]) + 1e-6 + (a[0] === 0 ? 1e-6 : 0))
    expect(texts(s)).toEqual(expect.arrayContaining(['exact 7.39', 'h 0.5: 5.06', 'h 0.25: 5.96', 'yₙ₊₁ = yₙ + h f(xₙ, yₙ)']))
  })

  it('Harmonic oscillator: each drawn curve matches an RK4 solution of x″ + b x′ + 4x = 0 (b = 1, 4, 6; x(0) = 1, x′(0) = 0); only the underdamped one crosses zero; b² − 4mk is −15, 0, +20', () => {
    const s = M.buildHarmonicOscillatorScene(), { ox, oy, ut, ux, bs, T } = M.HO
    const inv = (p: number[]) => [(p[0] - ox) / ut, (p[1] - oy) / ux]
    const sol = (b: number) => rk4((_t, y) => [y[1], -b * y[1] - 4 * y[0]], [1, 0], T, 12000)
    const check = (color: string, b: number) => { const f = sol(b), pts = pathsOf(s, color)[0].points!.map(inv); expect(pts[0][1]).toBeCloseTo(1, 1); for (const [t, x] of pts) expect(Math.abs(x - f(t)[0])).toBeLessThan(0.012); return pts }
    const under = check(BLUE, bs.under), crit = check(GREEN, bs.crit), over = check(RED, bs.over)
    const crossings = (pts: number[][]) => pts.slice(1).filter((p, i) => Math.sign(p[1]) !== Math.sign(pts[i][1]) && Math.abs(p[1]) > 0 || false).length
    expect(crossings(under)).toBeGreaterThanOrEqual(2); expect(crossings(crit)).toBe(0); expect(crossings(over)).toBe(0)
    expect(Math.min(...under.map((p) => p[1]))).toBeLessThan(-0.2); expect(Math.min(...crit.map((p) => p[1]))).toBeGreaterThanOrEqual(-0.02); expect(Math.min(...over.map((p) => p[1]))).toBeGreaterThanOrEqual(-0.02)
    const m = 1, k = 4; expect([bs.under, bs.crit, bs.over].map((b) => b * b - 4 * m * k)).toEqual([-15, 0, 20])
    const at3 = (pts: number[][]) => pts.reduce((best, p) => (Math.abs(p[0] - 3) < Math.abs(best[0] - 3) ? p : best))[1]
    expect(Math.abs(at3(crit))).toBeLessThan(Math.abs(at3(over)))                                                                                          // critical damping returns fastest (without overshoot)
    expect(texts(s)).toEqual(expect.arrayContaining(['underdamped: b² < 4mk', 'critical: b² = 4mk', 'overdamped: b² > 4mk', 'sign of b² − 4mk decides']))
  })

  it('Resonance: the drawn curves match RK4 solutions of x″ + x = cos ωt from rest; ω = 0.7 stays within 2/(1 − ω²) ≈ 3.92, ω = 1 follows (t/2) sin t, its peaks sit on the envelope ±t/2 and exceed 7', () => {
    const s = M.buildResonanceScene(), { ox, oy, ut, ux, T, w } = M.RES
    const inv = (p: number[]) => [(p[0] - ox) / ut, (p[1] - oy) / ux]
    const sol = (om: number) => rk4((t, y) => [y[1], Math.cos(om * t) - y[0]], [0, 0], T, 32000)
    const off = pathsOf(s, BLUE)[0].points!.map(inv), on = pathsOf(s, RED)[0].points!.map(inv)
    const fOff = sol(w), fOn = sol(1)
    for (const [t, x] of off) expect(Math.abs(x - fOff(t)[0])).toBeLessThan(0.12); for (const [t, x] of on) expect(Math.abs(x - fOn(t)[0])).toBeLessThan(0.12)
    expect(Math.max(...off.map((p) => Math.abs(p[1])))).toBeLessThan(2 / (1 - w * w) + 0.05)                                                               // bounded response
    expect(Math.max(...on.map((p) => Math.abs(p[1])))).toBeGreaterThan(7)                                                                                  // unbounded growth
    for (const [t, x] of on) expect(Math.abs(x)).toBeLessThanOrEqual(t / 2 + 0.07)                                                                          // inside the envelope ±t/2
    for (const k of [1, 2, 3, 4]) { const tp = Math.PI / 2 + k * Math.PI; const p = on.reduce((best, q) => (Math.abs(q[0] - tp) < Math.abs(best[0] - tp) ? q : best)); expect(Math.abs(Math.abs(p[1]) - tp / 2)).toBeLessThan(0.35) }   // the swings reach the envelope
    const env = bonds(s, VIOLET, 0.02); expect(env).toHaveLength(2)
    for (const o of env) { const a = inv(o.from!), b = inv(o.to!); expect(a[0]).toBeCloseTo(0, 1); expect(Math.abs(b[1])).toBeCloseTo(b[0] / 2, 1) }
    expect(texts(s)).toEqual(expect.arrayContaining(['ω 0.7: bounded', 'ω 1: grows like t/2', 'matched: unbounded', 'off: bounded']))
  })

  it('Stability: the parabola is f(y) = y(1 − y) with zeros 0 and 1; the arrows point right where f > 0 and left where f < 0; f′(0) = 1 > 0 (unstable, open ring), f′(1) = −1 < 0 (stable, solid dot)', () => {
    const s = M.buildStabilityAnalysisScene(), { ox, oy, uy, uf, lineY } = M.STB
    const invC = (p: number[]) => [(p[0] - ox) / uy, (p[1] - oy) / uf]
    for (const [y, f] of pathsOf(s, BLUE)[0].points!.map(invC)) expect(Math.abs(f - y * (1 - y))).toBeLessThan(0.01 + 0.01 * Math.abs(1 - 2 * y))        // the curve is y(1 − y)
    const z0 = dots(s, VIOLET).find((d) => d.radius === 0.13)!, z1 = dots(s, GREEN).find((d) => d.radius === 0.13)!
    expect(invC(z0.position!)[0]).toBeCloseTo(0, 1); expect(invC(z1.position!)[0]).toBeCloseTo(1, 1); expect(invC(z0.position!)[1]).toBeCloseTo(0, 1)
    const ys = (p: number[]) => (p[0] - ox) / uy
    const arrs = arrows(s, GREEN).concat(arrows(s, RED))
    expect(arrs).toHaveLength(4)
    for (const a of arrs) {
      const mid = (ys(a.from!) + ys(a.to!)) / 2, dir = Math.sign(a.to![0] - a.from![0]), f = mid * (1 - mid)
      expect(a.from![1]).toBeCloseTo(lineY + 0.35, 6)
      expect(dir).toBe(f > 0 ? 1 : -1); expect(a.color).toBe(f > 0 ? GREEN : RED)                                                                           // the flow follows the sign of f
    }
    expect(arrs.filter((a) => a.color === GREEN).map((a) => (ys(a.from!) + ys(a.to!)) / 2).every((v) => v > 0 && v < 1)).toBe(true)
    const df = (y: number) => 1 - 2 * y; expect(df(0)).toBe(1); expect(df(1)).toBe(-1)
    const ring = pathsOf(s, VIOLET, 20)[0].points!, rc = [mean(ring.slice(0, -1).map((q) => q[0])), mean(ring.slice(0, -1).map((q) => q[1]))]
    expect(ys(rc)).toBeCloseTo(0, 1)                                                                                                                      // the open ring (unstable) sits on 0
    const solid = dots(s, GREEN).find((d) => d.radius === 0.15)!; expect(ys(solid.position!)).toBeCloseTo(1, 1)                                             // the solid dot (stable) on 1
    expect(texts(s)).toEqual(expect.arrayContaining(['unstable', 'stable', 'f′(0) = 1', 'f′(1) = −1', 'f(y)']))
  })

  it('Fourier series: with coefficients bₙ = (1/π)∫ f sin nx integrated numerically (4/(nπ) for odd n, 0 for even), the partial sums S₁, S₃, S₅ match the drawn blue, red, green curves and hug the square wave ever more closely', () => {
    const s = M.buildFourierSeriesScene(), { ux, uy, oy } = M.FS
    const inv = (p: number[]) => [p[0] / ux, (p[1] - oy) / uy]
    const sq = (x: number) => (Math.sin(x) >= 0 ? 1 : -1)
    const b = (n: number) => simpson((x) => sq(x) * Math.sin(n * x), -Math.PI, Math.PI, 20000) / Math.PI
    expect(b(1)).toBeCloseTo(4 / Math.PI, 3); expect(b(2)).toBeCloseTo(0, 3); expect(b(3)).toBeCloseTo(4 / (3 * Math.PI), 3); expect(b(4)).toBeCloseTo(0, 3); expect(b(5)).toBeCloseTo(4 / (5 * Math.PI), 3)
    const S = (x: number, N: number) => { let t = 0; for (let n = 1; n <= N; n++) t += b(n) * Math.sin(n * x); return t }
    const curves = [BLUE, RED, GREEN].map((c, i) => ({ N: [1, 3, 5][i], pts: pathsOf(s, c)[0].points!.map(inv) }))
    for (const { N, pts } of curves) for (const [x, y] of pts) expect(Math.abs(y - S(x, N))).toBeLessThan(0.02)
    const l2 = (pts: number[][]) => Math.sqrt(mean(pts.map(([x, y]) => (y - sq(x)) ** 2)))
    expect(l2(curves[1].pts)).toBeLessThan(l2(curves[0].pts)); expect(l2(curves[2].pts)).toBeLessThan(l2(curves[1].pts))                                    // more terms, closer fit
    const lines0 = segsOf(s, 0.03, SLATE); expect(lines0).toHaveLength(2)
    expect(lines0.map((o) => Math.round((o.from![1] - oy) / uy)).sort()).toEqual([-1, 1])                                                                  // the target levels −1 and +1
    expect(texts(s)).toEqual(expect.arrayContaining(['square wave', 'S₁', 'S₃', 'S₅']))
  })

  it('Convergence at a jump: S₉ and S₂₉ both pass through the midpoint 0 at the jump and overshoot to ≈ 1.179 (≈ 9 % of the jump 2); the overshoot peak moves toward the jump when N grows but does not shrink', () => {
    const s = M.buildFourierConvergenceScene(), { ux, uy, N } = M.FC
    const inv = (p: number[]) => [p[0] / ux, p[1] / uy]
    const sq = (x: number) => (Math.sin(x) >= 0 ? 1 : -1)
    const b = (n: number) => (n % 2 === 1 ? 4 / (n * Math.PI) : 0)
    const S = (x: number, n: number) => { let t = 0; for (let k = 1; k <= n; k++) t += b(k) * Math.sin(k * x); return t }
    const c9 = pathsOf(s, BLUE)[0].points!.map(inv), c29 = pathsOf(s, RED)[0].points!.map(inv)
    for (const [x, y] of c9) expect(offBy((t) => S(t, N[0]), x, y)).toBeLessThan(0.02); for (const [x, y] of c29) expect(offBy((t) => S(t, N[1]), x, y)).toBeLessThan(0.02)
    const mid = dots(s, GREEN).find((d) => d.radius === 0.13)!; expect(inv(mid.position!)[0]).toBeCloseTo(0, 2); expect(inv(mid.position!)[1]).toBeCloseTo(0, 2)
    expect((sq(1e-9) + sq(-1e-9)) / 2).toBe(0); expect(S(0, 9)).toBeCloseTo(0, 9); expect(S(0, 29)).toBeCloseTo(0, 9)                                         // the series sits at the midpoint of the jump
    const peak = (pts: number[][]) => pts.filter((p) => p[0] > 0 && p[0] < 0.5).reduce((best, p) => (p[1] > best[1] ? p : best))
    const [p9, p29] = [peak(c9), peak(c29)]
    expect(p9[1]).toBeGreaterThan(1.15); expect(p29[1]).toBeGreaterThan(1.15)
    for (const p of [p9, p29]) { expect(Math.abs(p[1] - 1.179)).toBeLessThan(0.02); expect((p[1] - 1) / 2).toBeGreaterThan(0.075); expect((p[1] - 1) / 2).toBeLessThan(0.105) }   // ≈ 9 % of the jump size 2
    expect(p29[0]).toBeLessThan(p9[0]); expect(p29[0]).toBeCloseTo(Math.PI / 30, 1); expect(p9[0]).toBeCloseTo(Math.PI / 10, 0)                                  // the peak moves in toward the jump
    expect(Math.abs(p29[1] - p9[1])).toBeLessThan(0.02)                                                                                                    // ... without getting smaller
    const lvl = bonds(s, VIOLET, 0.02)[0]; expect(lvl.from![1] / uy).toBeCloseTo(1.179, 2)
    expect(texts(s)).toEqual(expect.arrayContaining(['S₉', 'S₂₉', 'midpoint 0', 'overshoot ≈ 9%']))
  })

  it('Sine and cosine series: the numerically integrated coefficients bₙ = 2(−1)ⁿ⁺¹/n and aₙ = −4/(πn²) (odd n), a₀/2 = π/2 rebuild the drawn blue and green partial sums; both equal x on [0, π]', () => {
    const s = M.buildFourierSineCosineScene(), { cx, u, Ns, Nc } = M.FSC
    const bN = (n: number) => (2 / Math.PI) * simpson((x) => x * Math.sin(n * x), 0, Math.PI), aN = (n: number) => (2 / Math.PI) * simpson((x) => x * Math.cos(n * x), 0, Math.PI)
    for (let n = 1; n <= 5; n++) { expect(bN(n)).toBeCloseTo((2 * (-1) ** (n + 1)) / n, 6); expect(aN(n)).toBeCloseTo(n % 2 === 1 ? -4 / (Math.PI * n * n) : 0, 6) }
    expect(aN(0) / 2).toBeCloseTo(Math.PI / 2, 6)
    const invL = (p: number[]) => [(p[0] - cx[0]) / u, p[1] / u], invR = (p: number[]) => [(p[0] - cx[1]) / u, p[1] / u]
    const sine = pathsOf(s, BLUE)[0].points!.map(invL), cosine = pathsOf(s, GREEN)[0].points!.map(invR)
    const Ssin = (x: number) => { let t = 0; for (let n = 1; n <= Ns; n++) t += bN(n) * Math.sin(n * x); return t }
    const Scos = (x: number) => { let t = aN(0) / 2; for (let n = 1; n <= Nc; n++) t += aN(n) * Math.cos(n * x); return t }
    for (const [x, y] of sine) expect(offBy(Ssin, x, y, 0.01)).toBeLessThan(0.02); for (const [x, y] of cosine) expect(offBy(Scos, x, y, 0.01)).toBeLessThan(0.02)
    const errOn = (pts: number[][], lo: number, hi: number) => Math.max(...pts.filter((p) => p[0] > lo && p[0] < hi).map((p) => Math.abs(p[1] - p[0])))
    expect(errOn(cosine, 0.2, Math.PI - 0.01)).toBeLessThan(errOn(sine, 0.2, Math.PI - 0.01))                                                              // the cosine series fits x on (0, π) better (no jump)
    expect(errOn(cosine, 0.2, 3.1)).toBeLessThan(0.35)
    const odd = segsOf(s, 0.03, SLATE).filter((o) => o.from![0] < 0 && o.to![0] < 0), even = segsOf(s, 0.03, SLATE).filter((o) => o.from![0] > 0 && o.to![0] > 0)
    expect(odd).toHaveLength(1); expect(slope(odd[0])).toBeCloseTo(1, 2)                                                                                    // the odd extension is the line y = x
    expect(even).toHaveLength(2); expect(even.map(slope).sort((a, b) => a - b)).toEqual(approx([-1, 1], 2))                                                   // the even extension is |x|
    expect(texts(s)).toEqual(expect.arrayContaining(['odd extension', 'even extension', 'sine series', 'cosine series']))
  })

  it('PDE classification: Δ = B² − 4AC is −4 (Laplace), 0 (heat) and +4 (wave, c = 1); the three dots sit at those Δ on the line, coloured by type; the conic icons are an ellipse, a parabola and a hyperbola', () => {
    const s = M.buildPdeScene(), { ux, y, iconY, examples } = M.PDEC
    const D = (e: { A: number; B: number; C: number }) => e.B * e.B - 4 * e.A * e.C
    expect(examples.map(D)).toEqual([-4, 0, 4])
    const dd = dots(s).filter((d) => d.radius === 0.2).sort((p, q) => p.position![0] - q.position![0])
    expect(dd).toHaveLength(3)
    dd.forEach((d, i) => { expect(d.position![0] / ux).toBeCloseTo(D(examples[i]), 1); expect(d.position![1]).toBeCloseTo(y, 6); expect(d.color).toBe([BLUE, GREEN, RED][i]) })
    const kind = (d: number) => (d < 0 ? 'elliptic' : d === 0 ? 'parabolic' : 'hyperbolic'); expect(examples.map((e) => kind(D(e)))).toEqual(['elliptic', 'parabolic', 'hyperbolic'])
    const half = (color: string) => bonds(s, color, 0.07)[0]; expect(Math.max(half(BLUE).from![0], half(BLUE).to![0])).toBeLessThanOrEqual(1e-9); expect(Math.min(half(RED).from![0], half(RED).to![0])).toBeGreaterThanOrEqual(-1e-9)   // blue half is Δ < 0, red half Δ > 0
    const ell = pathsOf(s, BLUE, 40)[0].points!, ec = [mean(ell.slice(0, -1).map((q) => q[0])), mean(ell.slice(0, -1).map((q) => q[1]))]
    for (const q of ell) expect(((q[0] - ec[0]) / 0.9) ** 2 + ((q[1] - ec[1]) / 0.495) ** 2).toBeCloseTo(1, 1)                                               // an ellipse
    const par = pathsOf(s, GREEN, 8)[0].points!, d2 = par.slice(2).map((q, i) => q[1] - 2 * par[i + 1][1] + par[i][1]); expect(Math.max(...d2) - Math.min(...d2)).toBeLessThan(0.045); expect(mean(d2)).toBeLessThan(0)   // a parabola (constant second difference)
    const hyp = pathsOf(s, RED, 8).filter((p) => p.points!.length < 40); expect(hyp).toHaveLength(2)
    for (const br of hyp) for (const q of br.points!) { const cx = Math.round(mean(br.points!.map((r) => r[0]))); void cx; const w = Math.abs(q[0] - 3.5 * ux) - 0.15, t = (q[1] - iconY) / 0.75; expect((w / 0.45) ** 2 - t * t).toBeCloseTo(1, 1) }   // two branches of a hyperbola
    expect(texts(s)).toEqual(expect.arrayContaining(['Δ < 0', 'Δ > 0', 'u_xx + u_yy = 0', 'u_t = k u_xx', 'u_tt = c² u_xx', 'elliptic', 'parabolic', 'hyperbolic']))
  })

  it('Heat equation: the sine coefficients of the drawn profiles decay like e^(−n²kt) — the t = 0.1 and 0.3 curves equal the evolved modes of the drawn t = 0 curve; the maximum falls; the ends stay 0', () => {
    const s = M.buildHeatEquationScene(), { ox, oy, ux, uy, k, times } = M.HEAT
    const inv = (p: number[]) => [(p[0] - ox) / ux, (p[1] - oy) / uy]
    const prof = [BLUE, RED, GREEN].map((c) => pathsOf(s, c)[0].points!.map(inv))
    const coeff = (pts: number[][], n: number) => { const m = pts.length - 1, h = Math.PI / m; let acc = 0; for (let i = 0; i <= m; i++) acc += pts[i][1] * Math.sin(n * pts[i][0]) * (i === 0 || i === m ? 1 : i % 2 === 1 ? 4 : 2); return ((2 / Math.PI) * (acc * h)) / 3 }
    expect(prof[0]).toHaveLength(prof[1].length)
    const b0 = [1, 2, 3, 4, 5].map((n) => coeff(prof[0], n))
    expect(b0[0]).toBeCloseTo(1, 1); expect(b0[2]).toBeCloseTo(0.5, 1); expect(Math.abs(b0[1])).toBeLessThan(0.02); expect(Math.abs(b0[3])).toBeLessThan(0.02)
    for (const i of [1, 2]) {
      const t = times[i]
      for (const [x, v] of prof[i]) { let want = 0; for (let n = 1; n <= 5; n++) want += b0[n - 1] * Math.exp(-n * n * k * t) * Math.sin(n * x); expect(Math.abs(v - want)).toBeLessThan(0.03) }   // each mode decays at rate n²k
      const bt = [1, 3].map((n) => coeff(prof[i], n)); expect(bt[0] / b0[0]).toBeCloseTo(Math.exp(-k * t), 1); expect(bt[1] / b0[2]).toBeCloseTo(Math.exp(-9 * k * t), 1)
    }
    const mx = prof.map((p) => Math.max(...p.map((q) => q[1]))); expect(mx[1]).toBeLessThan(mx[0]); expect(mx[2]).toBeLessThan(mx[1])                         // the maximum only falls
    for (const p of prof) { expect(Math.abs(p[0][1])).toBeLessThan(0.02); expect(Math.abs(p[p.length - 1][1])).toBeLessThan(0.02) }                         // ends held at 0
    expect(Math.exp(-9 * 0.1) / Math.exp(-0.1)).toBeLessThan(0.5)                                                                                          // the n = 3 mode decays much faster than n = 1
    expect(texts(s)).toEqual(expect.arrayContaining(['t 0', 't 0.1', 't 0.3', 'u_t = k u_xx', 'high modes die first']))
  })

  it("Wave equation: each drawn curve is d'Alembert's ½[f(x + ct) + f(x − ct)] for f = e^(−x²); at t = 2 and 4 two half-height pulses (0.5) sit at x = ±ct (speed c = 1); the area under every curve stays √π", () => {
    const s = M.buildWaveEquationScene(), { ox, oy, ux, uy, c, times } = M.WAV
    const inv = (p: number[]) => [(p[0] - ox) / ux, (p[1] - oy) / uy]
    const f = (x: number) => Math.exp(-x * x)
    const curves = [BLUE, RED, GREEN].map((col) => pathsOf(s, col)[0].points!.map(inv))
    curves.forEach((pts, i) => { for (const [x, u] of pts) expect(Math.abs(u - 0.5 * (f(x + c * times[i]) + f(x - c * times[i])))).toBeLessThan(0.02) })
    const peaks = (pts: number[][]) => pts.filter((q, j) => j > 0 && j < pts.length - 1 && q[1] > pts[j - 1][1] && q[1] >= pts[j + 1][1] && q[1] > 0.2)
    expect(peaks(curves[0])).toHaveLength(1); expect(peaks(curves[0])[0][1]).toBeCloseTo(1, 1); expect(peaks(curves[0])[0][0]).toBeCloseTo(0, 0)
    for (const i of [1, 2]) { const pk = peaks(curves[i]); expect(pk).toHaveLength(2); for (const q of pk) { expect(q[1]).toBeCloseTo(0.5, 1); expect(Math.abs(Math.abs(q[0]) - c * times[i])).toBeLessThan(0.2) } }   // half-height pulses at ±ct
    const area = (pts: number[][]) => { let a = 0; for (let j = 1; j < pts.length; j++) a += ((pts[j][1] + pts[j - 1][1]) / 2) * (pts[j][0] - pts[j - 1][0]); return a }
    for (const pts of curves) expect(area(pts)).toBeCloseTo(Math.sqrt(Math.PI), 1)                                                                          // the area is conserved
    expect(texts(s)).toEqual(expect.arrayContaining(['t 0', 't 2', 't 4', 'u_tt = c² u_xx', 'two pulses, speed c']))
  })

  it("Laplace's equation: every drawn contour has x² − y² = ±1, ±2, ±3 (blue where positive, red where negative, violet cross at 0); u_xx + u_yy = 0; the circle average of u equals its centre value 0.39; the extremes ±4.84 are on the boundary", () => {
    const s = M.buildLaplaceEquationScene(), { ox, oy, u, half, circle } = M.LAP
    const inv = (p: number[]) => [(p[0] - ox) / u, (p[1] - oy) / u]
    const levelsOf = (color: string) => pathsOf(s, color, 30).filter((p) => p.points!.length < 60).map((p) => { const lv = p.points!.map((q) => { const [x, y] = inv(q); return x * x - y * y }); expect(Math.max(...lv) - Math.min(...lv)).toBeLessThan(0.1); return Math.round(mean(lv)) })
    const pos = levelsOf(BLUE), neg = levelsOf(RED)
    expect([...new Set(pos)].sort((a, b) => a - b)).toEqual([1, 2, 3]); expect([...new Set(neg)].sort((a, b) => a - b)).toEqual([-3, -2, -1]); expect(pos).toHaveLength(6); expect(neg).toHaveLength(6)   // two branches per level
    const cross = bonds(s, VIOLET, 0.03); expect(cross).toHaveLength(2); expect(cross.map((o) => Math.round(slope(o))).sort()).toEqual([-1, 1])
    const h = 1e-3, uu = (x: number, y: number) => x * x - y * y
    for (const [x, y] of [[0.3, 0.7], [-1.1, 0.4], [1.9, -1.3]]) expect(Math.abs((uu(x + h, y) + uu(x - h, y) + uu(x, y + h) + uu(x, y - h) - 4 * uu(x, y)) / (h * h))).toBeLessThan(1e-6)   // u_xx + u_yy = 0
    const ring = pathsOf(s, VIOLET, 60)[0].points!.slice(0, -1).map(inv)
    const centre = [mean(ring.map((q) => q[0])), mean(ring.map((q) => q[1]))]
    expect(centre[0]).toBeCloseTo(circle.c[0], 1); expect(centre[1]).toBeCloseTo(circle.c[1], 1)
    for (const q of ring) expect(dist(q, centre)).toBeCloseTo(circle.r, 1)
    expect(mean(ring.map(([x, y]) => uu(x, y)))).toBeCloseTo(uu(centre[0], centre[1]), 1); expect(uu(0.8, 0.5)).toBeCloseTo(0.39, 12)                          // mean value property
    const cd = dots(s, GREEN).find((d) => d.radius === 0.12)!; expect(uu(...(inv(cd.position!) as [number, number]))).toBeCloseTo(0.39, 1)
    let hi = -Infinity, lo = Infinity, atBoundary = true
    for (let i = 0; i <= 44; i++) for (let j = 0; j <= 44; j++) { const x = -half + (i * 2 * half) / 44, y = -half + (j * 2 * half) / 44, v = uu(x, y); const edge = i === 0 || i === 44 || j === 0 || j === 44; if (v > hi) { hi = v; atBoundary = edge } ; if (v < lo) lo = v }
    expect(atBoundary).toBe(true); expect(hi).toBeCloseTo(4.84, 6); expect(lo).toBeCloseTo(-4.84, 6)                                                       // the max sits on the boundary
    const g = dots(s, GREEN).filter((d) => d.radius === 0.14).map((d) => inv(d.position!)), r = dots(s, RED).filter((d) => d.radius === 0.14).map((d) => inv(d.position!))
    expect(g).toHaveLength(2); expect(r).toHaveLength(2); for (const q of g) expect(uu(q[0], q[1])).toBeCloseTo(hi, 1); for (const q of r) expect(uu(q[0], q[1])).toBeCloseTo(lo, 1)
    expect(texts(s)).toEqual(expect.arrayContaining(['u = x² − y²', 'mean value property', 'max and min on the boundary']))
  })
})
