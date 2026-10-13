/**
 * Mathematics visual campaign, batch 36 (2026-10-12): the calculus helpers (limit laws, the chain rule, implicit differentiation, optimization, antiderivatives, trigonometric substitution, power series, the radius of convergence, the Taylor remainder, the multivariable chain rule, the squeeze theorem). Every number a figure states is re-derived here from the
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
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB36'

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
  ['math.calc.limit-laws', M.buildLimitLawsScene, 'math-limit-laws'],
  ['math.calc.chain-rule', M.buildChainRuleScene, 'math-chain-rule'],
  ['math.calc.implicit-differentiation', M.buildImplicitDifferentiationScene, 'math-implicit-differentiation'],
  ['math.calc.optimization', M.buildOptimizationScene, 'math-optimization'],
  ['math.calc.antiderivatives', M.buildAntiderivativesScene, 'math-antiderivatives'],
  ['math.calc.trig-substitution', M.buildTrigSubstitutionScene, 'math-trig-substitution'],
  ['math.calc.power-series', M.buildPowerSeriesScene, 'math-power-series'],
  ['math.calc.radius-of-convergence', M.buildRadiusOfConvergenceScene, 'math-radius-of-convergence'],
  ['math.calc.taylor-remainder', M.buildTaylorRemainderScene, 'math-taylor-remainder'],
  ['math.calc.chain-rule-multivariable', M.buildChainRuleMultivariableScene, 'math-chain-rule-multivariable'],
  ['math.calc.sequence-limits', M.buildSequenceLimitsScene, 'math-sequence-limits'],
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

// ── readers ────────────────────────────────────────────────────────────────────────────────
const toGraph = (f: M.Frame, p: readonly number[]): [number, number] => [(p[0] - f.ox) / f.ux, (p[1] - f.oy) / f.uy]
const pathG = (o: Obj, f: M.Frame) => o.points!.map((p) => toGraph(f, p))
const segG = (o: Obj, f: M.Frame) => [toGraph(f, o.from!), toGraph(f, o.to!)] as const
/** value of a drawn polyline at x (linear interpolation between samples) */
const valueAt = (pts: ReadonlyArray<readonly [number, number]>, x: number) => { for (let i = 0; i + 1 < pts.length; i++) { const [x0, y0] = pts[i], [x1, y1] = pts[i + 1]; if (x >= x0 - 1e-9 && x <= x1 + 1e-9) return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0) } throw new Error(`x = ${x} is outside the drawn curve`) }
const slopeOf = (o: Obj, f: M.Frame) => { const [a, b] = segG(o, f); return (b[1] - a[1]) / (b[0] - a[0]) }
const deriv = (fn: (x: number) => number, x: number, h = 1e-5) => (fn(x + h) - fn(x - h)) / (2 * h)
const absMax = (pts: ReadonlyArray<readonly [number, number]>, fn: (x: number) => number) => Math.max(...pts.map(([x, y]) => Math.abs(y - fn(x))))

describe('the mathematics each figure draws', () => {
  it('math.calc.limit-laws: the limits 3 and 4 give 3 × 4 = 12 for the product and 3 + 4 = 7 for the sum, read from the drawn curves at x = 2', () => {
    const s = M.buildLimitLawsScene()
    const F = M.LML
    const f = pathG(paths(s, BLUE)[0], F), g = pathG(paths(s, RED)[0], F), h = pathG(paths(s, GREEN)[0], F)
    expect(absMax(f, M.lmlF)).toBeLessThan(0.06); expect(absMax(g, M.lmlG)).toBeLessThan(0.06); expect(absMax(h, M.lmlFG)).toBeLessThan(0.08)
    // the values of the drawn curves at x = 2, and the limits as x → 2 from both sides
    const a = F.a
    const [vf, vg, vh] = [valueAt(f, a), valueAt(g, a), valueAt(h, a)]
    expect([vf, vg, vh].map((v) => Math.round(v))).toEqual([3, 4, 12])
    for (const dx of [0.1, -0.1]) { expect(Math.abs(valueAt(f, a + dx) - 3)).toBeLessThan(0.15); expect(Math.abs(valueAt(g, a + dx) - 4)).toBeLessThan(0.45); expect(Math.abs(valueAt(h, a + dx) - 12)).toBeLessThan(17 * Math.abs(dx) + 0.1) }  // |h'(2)| = 16: the gap scales with the step
    // the limit laws: the product of the limits and the sum of the limits are the limits of the product and the sum
    expect(Math.round(vf) * Math.round(vg)).toBe(Math.round(vh)); expect(Math.round(vf) + Math.round(vg)).toBe(7)
    // the four dots sit at x = 2 at heights 3, 4, 12 and 7
    const dotsAt = (c: string) => dots(s, c).map((o) => toGraph(F, o.position!))
    const [d3, d4, d12, d7] = [dotsAt(BLUE)[0], dotsAt(RED)[0], dotsAt(GREEN)[0], dotsAt(VIOLET)[0]]
    ;[d3, d4, d12, d7].forEach((d) => expect(d[0]).toBeCloseTo(a, 1))
    expect([d3[1], d4[1], d12[1], d7[1]].map(Math.round)).toEqual([3, 4, 12, 7])
    // captions
    const nums = (t: string) => numsIn(labelsOf(s).find((l) => l.text === t)!.text!)
    expect(nums('lim f = 3')).toEqual([3]); expect(nums('lim g = 4')).toEqual([4]); expect(nums('lim fg = 12')).toEqual([12])
    expect(evalLR('3 × 4 = 12')).toBe(12); expect(evalLR('3 + 4 = 7')).toBe(7)
    // the violet guide stands at x = 2
    const guide = bonds(s, VIOLET, 0.025)[0]; expect(toGraph(F, guide.from!)[0]).toBeCloseTo(a, 1)
  })

  it('math.calc.chain-rule: the drawn tangents have slopes 2, 12 and 24, and 12 × 2 = 24 is the slope of the composite', () => {
    const s = M.buildChainRuleScene()
    const panels = [{ f: M.CHN.g, curve: RED, fn: M.chnG, at: 1 }, { f: M.CHN.f, curve: BLUE, fn: M.chnF, at: 2 }, { f: M.CHN.h, curve: GREEN, fn: M.chnH, at: 1 }]
    const slopes: number[] = []
    for (const p of panels) {
      const curveG = pathG(paths(s, p.curve)[0], p.f)
      expect(absMax(curveG, p.fn)).toBeLessThan(0.2)
      const tan = bonds(s, p.curve, 0.04).filter((o) => o.from![0] > p.f.ox - 0.1)[0]
      const sl = slopeOf(tan, p.f)
      // the tangent touches the curve at the dot and its slope is the derivative of the closed form there
      const dotG = toGraph(p.f, dots(s, p.curve)[0].position!)
      expect(dotG[0]).toBeCloseTo(p.at, 1); expect(Math.abs(dotG[1] - p.fn(p.at))).toBeLessThan(0.1)
      const [a, b] = segG(tan, p.f)
      expect(Math.abs((a[1] + b[1]) / 2 - p.fn(p.at))).toBeLessThan(0.1); expect(Math.abs((a[0] + b[0]) / 2 - p.at)).toBeLessThan(0.02)
      expect(sl).toBeCloseTo(deriv(p.fn, p.at), 0)
      slopes.push(Math.round(sl))
    }
    expect(slopes).toEqual([2, 12, 24])
    // chain rule: (f∘g)′(1) = f′(g(1)) · g′(1), and the inner value g(1) = 2 is where the outer tangent is drawn
    expect(M.chnG(1)).toBe(2)
    expect(deriv(M.chnF, M.chnG(1)) * deriv(M.chnG, 1)).toBeCloseTo(deriv(M.chnH, 1), 3)
    expect(slopes[1] * slopes[0]).toBe(slopes[2])
    expect(evalLR('12 × 2 = 24')).toBe(slopes[2])
    for (const [t, v] of [['slope 2', 2], ['slope 12', 12], ['slope 24', 24]] as const) expect(numsIn(labelsOf(s).find((l) => l.text === t)!.text!)).toEqual([v])
  })

  it('math.calc.implicit-differentiation: the circle x² + y² = 25, the tangent at (3, 4) has slope −x/y = −3/4 and is perpendicular to the radius', () => {
    const s = M.buildImplicitDifferentiationScene()
    const F = M.IMP
    pathG(paths(s, BLUE)[0], F).forEach(([x, y]) => expect(Math.abs(x * x + y * y - 25)).toBeLessThan(0.12))
    const pt = toGraph(F, dots(s, RED)[0].position!)
    expect(pt[0]).toBeCloseTo(3, 1); expect(pt[1]).toBeCloseTo(4, 1)
    expect(Math.abs(pt[0] ** 2 + pt[1] ** 2 - 25)).toBeLessThan(0.1)
    // implicit differentiation: 2x + 2y y′ = 0, so y′ = −x/y; also from y = √(25 − x²)
    const slopeImplicit = -pt[0] / pt[1]
    expect(slopeImplicit).toBeCloseTo(-0.75, 1)
    expect(deriv((x) => Math.sqrt(25 - x * x), 3)).toBeCloseTo(-0.75, 6)
    // the drawn green tangent: through the point, slope −3/4
    const tan = bonds(s, GREEN, 0.05)[0]
    const sl = slopeOf(tan, F)
    expect(sl).toBeCloseTo(slopeImplicit, 1)
    const [a, b] = segG(tan, F)
    expect(Math.abs(crossz([b[0] - a[0], b[1] - a[1]], [pt[0] - a[0], pt[1] - a[1]]) / Math.hypot(b[0] - a[0], b[1] - a[1]))).toBeLessThan(0.05)
    // the violet radius runs from the centre to the point, and tangent ⟂ radius
    const rad = bonds(s, VIOLET, 0.04)[0]
    const [r0, r1] = segG(rad, F)
    expect(r0[0] + r0[1]).toBeCloseTo(0, 1); expect(r1[0]).toBeCloseTo(3, 1); expect(r1[1]).toBeCloseTo(4, 1)
    expect(dotp([b[0] - a[0], b[1] - a[1]], [r1[0] - r0[0], r1[1] - r0[1]])).toBeCloseTo(0, 0)
    expect(sl * ((r1[1] - r0[1]) / (r1[0] - r0[0]))).toBeCloseTo(-1, 1)
    expect(bonds(s, VIOLET, 0.03)).toHaveLength(2)    // the right-angle mark
    expect(numsIn(labelsOf(s).find((l) => l.text === 'slope −3/4')!.text!)).toEqual([-3, 4])
    for (const t of ['x² + y² = 25', 'y′ = −x/y', '(3, 4)']) expect(texts(s)).toContain(t)
  })

  it('math.calc.optimization: the drawn curve peaks at x = 10 with A = 100, the endpoints give 0, and the tangent there is flat', () => {
    const s = M.buildOptimizationScene()
    const F = M.OPT
    const c = pathG(paths(s, BLUE)[0], F)
    expect(absMax(c, M.optA)).toBeLessThan(0.5)
    // the maximum of the drawn curve
    const top = c.reduce((m, p) => (p[1] > m[1] ? p : m), c[0])
    expect(top[0]).toBeCloseTo(10, 0); expect(top[1]).toBeCloseTo(100, 0)
    // endpoints are the red dots with A = 0; the critical point is the green dot
    const ends = dots(s, RED).map((o) => toGraph(F, o.position!)).sort((p, q) => p[0] - q[0])
    expect(ends).toHaveLength(2)
    expect(ends[0][0]).toBeCloseTo(0, 1); expect(ends[1][0]).toBeCloseTo(20, 1); ends.forEach((e) => expect(e[1]).toBeCloseTo(0, 0))
    const crit = toGraph(F, dots(s, GREEN)[0].position!)
    expect(crit[0]).toBeCloseTo(10, 1); expect(crit[1]).toBeCloseTo(100, 0)
    // A′ = 20 − 2x = 0 at x = 10 and the drawn violet tangent there is horizontal
    expect(deriv(M.optA, 10)).toBeCloseTo(0, 6)
    const tan = bonds(s, VIOLET, 0.04)[0]; expect(slopeOf(tan, F)).toBeCloseTo(0, 6)
    const [ta, tb] = segG(tan, F); expect((ta[0] + tb[0]) / 2).toBeCloseTo(10, 1)
    // the global maximum is the largest of the candidate values
    const candidates = [ends[0][1], crit[1], ends[1][1]]
    expect(Math.max(...candidates)).toBe(crit[1]); expect(crit[1]).toBeGreaterThan(Math.max(ends[0][1], ends[1][1]) + 90)
    // captions
    const nums = (t: string) => numsIn(labelsOf(s).find((l) => l.text === t)!.text!)
    expect(nums('A(0) = 0')).toEqual([0, 0]); expect(nums('A(20) = 0')).toEqual([20, 0]); expect(nums('x = 10')).toEqual([10]); expect(nums('A(10) = 100')).toEqual([10, 100]); expect(nums('maximum area 100')).toEqual([100])
  })

  it('math.calc.antiderivatives: the four drawn parabolas are x² + C, equal gaps apart, with the same slope 2 at x = 1', () => {
    const s = M.buildAntiderivativesScene()
    const F = M.ANT
    const colors = [RED, SLATE, BLUE, GREEN]
    const curves = colors.map((c) => pathG(paths(s, c)[0], F))
    curves.forEach((pts, i) => expect(absMax(pts, M.antF(F.cs[i]))).toBeLessThan(0.05))
    // constant vertical gaps between neighbouring parabolas at every sample: the difference of the C values
    for (let i = 0; i + 1 < curves.length; i++) curves[i].forEach(([, y], k) => expect(Math.abs(curves[i + 1][k][1] - y - (F.cs[i + 1] - F.cs[i]))).toBeLessThan(0.05))
    // the violet tangents all have slope 2 = f(1) = 2·1, each touching its own parabola at x = 1
    const tans = bonds(s, VIOLET, 0.04)
    expect(tans).toHaveLength(4)
    tans.forEach((t) => { expect(slopeOf(t, F)).toBeCloseTo(2, 1) })
    const touch = tans.map((t) => { const [a, b] = segG(t, F); return (a[1] + b[1]) / 2 }).sort((p, q) => p - q)
    touch.forEach((y, i) => expect(y).toBeCloseTo(1 + F.cs[i], 1))
    // F′ = 2x for every C
    for (const c of F.cs) for (const x of [-1.5, 0.4, 1, 1.9]) expect(deriv(M.antF(c), x)).toBeCloseTo(2 * x, 6)
    // the numerals at the left ends are the values of C
    const cs = F.cs.map((c, i) => labelsOf(s).find((l) => dist(l.position!, [M.at(F, -2, 4 + c)[0] - 0.4, M.at(F, -2, 4 + c)[1]]) < 0.05)!)
    cs.forEach((l, i) => expect(numOf(l.text!)).toBe(F.cs[i]))
    for (const t of ['F = x² + C', 'F′ = 2x = f']) expect(texts(s)).toContain(t)
  })

  it('math.calc.trig-substitution: the drawn triangle has hypotenuse 3, angle 30°, opposite x = 3 sin θ = 1.5 and adjacent √(9 − x²) = 2.598', () => {
    const s = M.buildTrigSubstitutionScene()
    const k = M.TRG.scale
    const hyp = bonds(s, BLUE, 0.05)[0], opp = bonds(s, RED, 0.05)[0], adj = bonds(s, GREEN, 0.05)[0]
    const L = (o: Obj) => len(o) / k
    expect(L(hyp)).toBeCloseTo(3, 1); expect(L(opp)).toBeCloseTo(1.5, 1); expect(L(adj)).toBeCloseTo(Math.sqrt(9 - 1.5 * 1.5), 1)
    // right angle between the two legs (they are horizontal and vertical), Pythagoras, and the angle at the left corner
    expect(dotp([adj.to![0] - adj.from![0], adj.to![1] - adj.from![1]], [opp.to![0] - opp.from![0], opp.to![1] - opp.from![1]])).toBeCloseTo(0, 6)
    expect(L(opp) ** 2 + L(adj) ** 2).toBeCloseTo(L(hyp) ** 2, 1)
    const angle = (Math.atan2(opp.to![1] - adj.from![1], adj.to![0] - adj.from![0]) * 180) / Math.PI
    expect(Math.atan2(opp.to![1] - hyp.from![1], opp.to![0] - hyp.from![0]) * (180 / Math.PI)).toBeCloseTo(30, 0)
    void angle
    // the opposite side is 3 sin θ and the adjacent side 3 cos θ
    expect(L(opp)).toBeCloseTo(3 * Math.sin((30 * Math.PI) / 180), 1); expect(L(adj)).toBeCloseTo(3 * Math.cos((30 * Math.PI) / 180), 1)
    // the violet arc runs from 0° to 30° about the left corner
    const arc = paths(s, VIOLET)[0].points!
    const O = hyp.from!
    const ang = (p: number[]) => (Math.atan2(p[1] - O[1], p[0] - O[0]) * 180) / Math.PI
    expect(ang(arc[0])).toBeCloseTo(0, 0); expect(ang(arc[arc.length - 1])).toBeCloseTo(30, 0)
    // captions
    const nums = (t: string) => numsIn(labelsOf(s).find((l) => l.text!.startsWith(t))!.text!)
    expect(nums('θ = 30')).toEqual([30]); expect(evalLR('3 × 0.5 = 1.5')).toBeCloseTo(L(opp), 1)
    expect(numsIn(labelsOf(s).find((l) => l.text === '3')!.text!)).toEqual([3])
    for (const t of ['x = 3 sin θ', '√(9 − x²) = 3 cos θ', '√(9 − x²)', 'x']) expect(texts(s)).toContain(t)
    expect(bonds(s, SLATE, 0.03)).toHaveLength(2)     // the right-angle mark
  })

  it('math.calc.power-series: the partial sums are 1 + x + … + xⁿ, they close in on 1/(1 − x) for |x| < 1, and at x = 0.5 give 1.5, 1.75, 1.9375 → 2', () => {
    const s = M.buildPowerSeriesScene()
    const F = M.PWS
    const f = pathG(paths(s, BLUE)[0], F), p1 = pathG(paths(s, SLATE)[0], F), p2 = pathG(paths(s, VIOLET)[0], F), p4 = pathG(paths(s, GREEN)[0], F)
    expect(absMax(f, (x) => 1 / (1 - x))).toBeLessThan(0.05); expect(absMax(p1, M.pwsSum(1))).toBeLessThan(0.03); expect(absMax(p2, M.pwsSum(2))).toBeLessThan(0.03); expect(absMax(p4, M.pwsSum(4))).toBeLessThan(0.03)
    // for 0 < x < 0.8 each higher partial sum is closer to the function
    for (const x of [0.2, 0.4, 0.5, 0.6, 0.75]) { const e = [p1, p2, p4].map((c) => Math.abs(valueAt(f, x) - valueAt(c, x))); expect(e[1]).toBeLessThan(e[0]); expect(e[2]).toBeLessThan(e[1]) }
    // the four dots at x = 0.5
    const dd = [SLATE, VIOLET, GREEN, BLUE].map((c) => toGraph(F, dots(s, c)[0].position!))
    dd.forEach((d) => expect(d[0]).toBeCloseTo(0.5, 1))
    const hs = dd.map((d) => d[1])
    expect(hs[0]).toBeCloseTo(1.5, 1); expect(hs[1]).toBeCloseTo(1.75, 1); expect(hs[2]).toBeCloseTo(1.9375, 1); expect(hs[3]).toBeCloseTo(2, 1)
    expect(M.pwsSum(4)(0.5)).toBeCloseTo(1.9375, 12); expect(1 / (1 - 0.5)).toBe(2)
    // the errors halve with each added power: 1/(1 − x) − Pₙ(x) = xⁿ⁺¹/(1 − x)
    for (const n of [1, 2, 4]) expect(2 - M.pwsSum(n)(0.5)).toBeCloseTo(Math.pow(0.5, n + 1) / 0.5, 12)
    // the violet bar covers (−1, 1)
    const bar = bonds(s, VIOLET, 0.07)[0]; const [b0, b1] = segG(bar, F)
    expect(b0[0]).toBeCloseTo(-1, 1); expect(b1[0]).toBeCloseTo(1, 1)
    expect(numsIn(labelsOf(s).find((l) => l.text!.startsWith('at x'))!.text!)).toEqual([0.5, 1.5, 1.75, 1.94, 2])
    for (const t of ['1/(1 − x)', 'n = 1', 'n = 2', 'n = 4', '|x| < 1']) expect(texts(s)).toContain(t)
  })

  it('math.calc.radius-of-convergence: the green interval is (−2, 2), centre 0 and radius 2 = 1 ÷ 0.5 (the ratio of coefficients)', () => {
    const s = M.buildRadiusOfConvergenceScene()
    const ux = M.ROC.ux
    const segs = bonds(s, GREEN, 0.08).map((o) => [o.from![0] / ux, o.to![0] / ux].sort((a, b) => a - b))
    expect(segs).toHaveLength(1)
    const [lo, hi] = segs[0]
    expect((lo + hi) / 2).toBeCloseTo(0, 6); expect((hi - lo) / 2).toBeCloseTo(2, 6)
    // the ratio test: cₙ = 1/2ⁿ gives cₙ₊₁/cₙ = 0.5 for every n, so R = 1 ÷ 0.5
    const c = (n: number) => 1 / 2 ** n
    for (const n of [0, 3, 10, 25]) expect(c(n + 1) / c(n)).toBeCloseTo(0.5, 12)
    expect(1 / 0.5).toBe((hi - lo) / 2)
    expect(evalLR('1 ÷ 0.5 = 2')).toBe((hi - lo) / 2)
    expect(numsIn(labelsOf(s).find((l) => l.text!.startsWith('cₙ₊₁'))!.text!)).toEqual([0.5])
    // red bars start exactly at the two ends and run outward
    const red = bonds(s, RED, 0.08).map((o) => [o.from![0] / ux, o.to![0] / ux].sort((a, b) => a - b))
    expect(red).toHaveLength(2)
    red.sort((a, b) => a[0] - b[0]); expect(red[0][1]).toBeCloseTo(-2, 6); expect(red[1][0]).toBeCloseTo(2, 6)
    expect(red[0][0]).toBeLessThan(-4); expect(red[1][1]).toBeGreaterThan(4)
    // endpoint dots at ±2, the centre dot at 0, and the radius arrow from 0 to 2
    expect(dots(s, VIOLET).map((d) => d.position![0] / ux).sort((a, b) => a - b)).toEqual([-2, 2].map((v) => expect.closeTo(v, 6)))
    expect(dots(s, INK)[0].position![0]).toBe(0)
    const rad = arrows(s, VIOLET).filter((a) => Math.abs(a.from![1] - 0.9) < 0.01)[0]
    expect(len(rad) / ux).toBeCloseTo(2, 6)
    // numerically: inside the interval the terms xⁿ/2ⁿ shrink, outside they grow
    const term = (x: number, n: number) => Math.abs(x) ** n / 2 ** n
    expect(term(hi - 0.1, 400)).toBeLessThan(1e-3); expect(term(hi + 0.1, 400)).toBeGreaterThan(1e3)
    for (const t of ['a = 0', 'R = 2', 'converges', 'diverges', 'Σ xⁿ/2ⁿ']) expect(texts(s)).toContain(t)
    for (const x of [-4, -2, 2, 4]) expect(labelsOf(s).some((l) => numOf(l.text!) === x && Math.abs(l.position![0] / ux - x) < 0.01)).toBe(true)
  })

  it('math.calc.taylor-remainder: the true error of sin x ≈ x − x³/6 stays under the bound x⁴/24 (M = 1), 0.008 ≤ 0.042 at x = 1', () => {
    const s = M.buildTaylorRemainderScene()
    const F = M.TYR
    const err = pathG(paths(s, GREEN)[0], F), bound = pathG(paths(s, RED)[0], F)
    expect(absMax(err, M.tyrErr)).toBeLessThan(0.0008); expect(absMax(bound, M.tyrBound)).toBeLessThan(0.0008)
    // the error is non-negative and never exceeds the bound at any drawn point
    expect(err).toHaveLength(bound.length)
    err.forEach(([x, e], i) => { expect(e).toBeGreaterThan(-0.0008); expect(e).toBeLessThanOrEqual(bound[i][1] + 0.0008); void x })
    // M bounds |f⁽⁴⁾| = |sin| on [0, 1.2]: M = 1 is valid, so the bound is M x⁴/4!
    expect(Math.max(...[...Array(121)].map((_, i) => Math.abs(Math.sin((i * 1.2) / 120))))).toBeLessThanOrEqual(1)
    expect(Math.pow(1, 4) / fact4()).toBeCloseTo(0.0417, 4)
    // the two dots at x = 1
    const e1 = toGraph(F, dots(s, GREEN)[0].position!), b1 = toGraph(F, dots(s, RED)[0].position!)
    expect(e1[0]).toBeCloseTo(1, 1); expect(b1[0]).toBeCloseTo(1, 1)
    expect(e1[1]).toBeCloseTo(Math.sin(1) - (1 - 1 / 6), 3); expect(b1[1]).toBeCloseTo(1 / 24, 3)
    expect(numsIn(labelsOf(s).find((l) => l.text === '0.008')!.text!)).toEqual([Math.round((Math.sin(1) - 5 / 6) * 1000) / 1000])
    expect(numsIn(labelsOf(s).find((l) => l.text === '0.042')!.text!)).toEqual([Math.round((1 / 24) * 1000) / 1000])
    expect(e1[1]).toBeLessThan(b1[1])
    for (const t of ['bound x⁴/24', 'true error', '|error| ≤ x⁴/24']) expect(texts(s)).toContain(t)
  })

  it('math.calc.chain-rule-multivariable: the branch numbers are the partial derivatives of z = x²y at t = 1, the paths give 2 + 2 = 4 = d(t⁴)/dt', () => {
    const s = M.buildChainRuleMultivariableScene()
    const { z, x, y, t } = M.MCR
    const node = (nm: string) => labelsOf(s).find((l) => l.text === nm && l.color === INK)!.position!.slice(0, 2)
    closeVec(node('z'), z, 0.01); closeVec(node('x'), x, 0.01); closeVec(node('y'), y, 0.01); closeVec(node('t'), t, 0.01)
    // the derivatives at t = 1 (x = 1, y = 1), computed independently
    const zFn = (X: number, Y: number) => X * X * Y
    const X1 = 1, Y1 = 1
    const zx = deriv((v) => zFn(v, Y1), X1), zy = deriv((v) => zFn(X1, v), Y1), dxdt = deriv((tt) => tt, 1), dydt = deriv((tt) => tt * tt, 1)
    const mid = (a: readonly number[], b: readonly number[]) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
    const numAt = (a: readonly number[], b: readonly number[], dx: number, dy: number) => { const m = mid(a, b); return Number(labelAt(s, [m[0] + dx, m[1] + dy], 0.05)!.text) }
    const drawn = { zx: numAt(z, x, -0.45, 0.2), zy: numAt(z, y, 0.45, 0.2), xt: numAt(x, t, -0.45, -0.2), yt: numAt(y, t, 0.45, -0.2) }
    expect(drawn).toEqual({ zx: Math.round(zx), zy: Math.round(zy), xt: Math.round(dxdt), yt: Math.round(dydt) })
    // two paths: through x (blue) and through y (red), with products and their sum
    const pathProd = [drawn.zx * drawn.xt, drawn.zy * drawn.yt]
    expect(pathProd).toEqual([2, 2])
    expect(evalLR('2 × 1 = 2')).toBe(pathProd[0]); expect(evalLR('1 × 2 = 2')).toBe(pathProd[1])
    expect(evalLR('2 + 2 = 4')).toBe(pathProd[0] + pathProd[1])
    // dz/dt computed directly from z = t⁴ at t = 1
    expect(deriv((tt) => zFn(tt, tt * tt), 1)).toBeCloseTo(pathProd[0] + pathProd[1], 6)
    expect(deriv((tt) => tt ** 4, 1)).toBeCloseTo(4, 6)
    expect(numsIn(labelsOf(s).find((l) => l.text === 'd(t⁴)/dt = 4')!.text!)).toEqual([4])
    // the coloured edges: blue joins z–x and x–t, red joins z–y and y–t
    const near = (p: readonly number[], q: readonly number[]) => dist(p, q) < 0.6
    const joins = (color: string, a: readonly number[], b: readonly number[]) => bonds(s, color, 0.05).some((o) => (near(o.from!, a) && near(o.to!, b)) || (near(o.from!, b) && near(o.to!, a)))
    expect([joins(BLUE, z, x), joins(BLUE, x, t), joins(RED, z, y), joins(RED, y, t)]).toEqual([true, true, true, true])
    for (const tx of ['z = x²y', 'x = t, y = t²']) expect(texts(s)).toContain(tx)
  })

  it('math.calc.sequence-limits: every drawn term sin(n)/n lies between −1/n and 1/n, both bounds tend to 0, so the limit is 0', () => {
    const s = M.buildSequenceLimitsScene()
    const F = M.SQZ
    const terms = dots(s, BLUE).map((o) => toGraph(F, o.position!))
    expect(terms).toHaveLength(M.SQZ.n1)
    terms.forEach(([n, a], i) => { expect(n).toBeCloseTo(i + 1, 1); expect(Math.abs(a - Math.sin(i + 1) / (i + 1))).toBeLessThan(0.01) })
    // the drawn bounds are 1/n (green) and −1/n (red), and every term is inside them
    const up = pathG(paths(s, GREEN)[0], F), low = pathG(paths(s, RED)[0], F)
    expect(absMax(up, (n) => 1 / n)).toBeLessThan(0.01); expect(absMax(low, (n) => -1 / n)).toBeLessThan(0.01)
    terms.forEach(([n, a]) => { expect(a).toBeLessThanOrEqual(valueAt(up, n) + 0.01); expect(a).toBeGreaterThanOrEqual(valueAt(low, n) - 0.01) })
    // the bounds shrink to 0: the funnel at n = 12 is within ±0.09, and every term from n = 11 on is within 0.0909 of 0
    expect(valueAt(up, 12)).toBeLessThan(0.1); expect(valueAt(low, 12)).toBeGreaterThan(-0.1)
    terms.filter(([n]) => n >= 11).forEach(([, a]) => expect(Math.abs(a)).toBeLessThan(1 / 11 + 0.01))
    // the violet limit line sits at 0 and the label says 0
    const lim = bonds(s, VIOLET, 0.04)[0]; expect(toGraph(F, lim.from!)[1]).toBeCloseTo(0, 2); expect(toGraph(F, lim.to!)[1]).toBeCloseTo(0, 2)
    expect(numsIn(labelsOf(s).find((l) => l.text === 'limit 0')!.text!)).toEqual([0])
    // the squeeze inequality −1/n ≤ sin n / n ≤ 1/n holds for the first 200 terms (independent of the drawing)
    for (let n = 1; n <= 200; n++) { expect(Math.sin(n) / n).toBeLessThanOrEqual(1 / n); expect(Math.sin(n) / n).toBeGreaterThanOrEqual(-1 / n) }
    for (const t of ['aₙ = sin(n)/n', '−1/n ≤ sin(n)/n ≤ 1/n']) expect(texts(s)).toContain(t)
  })
})

function fact4() { return 24 }
