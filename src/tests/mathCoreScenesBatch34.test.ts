/**
 * Mathematics visual campaign, batch 34 (2026-10-12): the statistics helpers (population and sample, sampling methods, standard error, test statistic and p-value, z-test, t-test, two-way ANOVA, covariance matrix, Bayesian updating, credible interval, experimental design). Every number a figure states is re-derived here from the
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
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB34'
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
  ['math.stats.population-sample', M.buildPopulationSampleScene, 'math-population-sample'],
  ['math.stats.sampling', M.buildSamplingScene, 'math-sampling'],
  ['math.stats.standard-error', M.buildStandardErrorScene, 'math-standard-error'],
  ['math.stats.test-statistic', M.buildTestStatisticScene, 'math-test-statistic'],
  ['math.stats.z-test', M.buildZTestScene, 'math-z-test'],
  ['math.stats.t-test', M.buildTTestScene, 'math-t-test'],
  ['math.stats.two-way-anova', M.buildTwoWayAnovaScene, 'math-two-way-anova'],
  ['math.stats.covariance-matrix', M.buildCovarianceMatrixScene, 'math-covariance-matrix'],
  ['math.stats.bayesian-inference', M.buildBayesianInferenceScene, 'math-bayesian-inference'],
  ['math.stats.credible-interval', M.buildCredibleIntervalScene, 'math-credible-interval'],
  ['math.stats.experimental-design', M.buildExperimentalDesignScene, 'math-experimental-design'],
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
const toGraph = (f: M.Frame, p: readonly number[]): [number, number] => [(p[0] - f.ox) / f.ux, (p[1] - f.oy) / f.uy]
const pathG = (o: Obj, f: M.Frame) => o.points!.map((p) => toGraph(f, p))
const segG = (o: Obj, f: M.Frame) => [toGraph(f, o.from!), toGraph(f, o.to!)] as const
const identity: M.Frame = { ox: 0, oy: 0, ux: 1, uy: 1 }
const numGrid = (s: SceneSpec, spec: Parameters<typeof mAt>[0], rows: number, cols: number) => Array.from({ length: rows }, (_, i) => Array.from({ length: cols }, (_, j) => { const l = labelAt(s, mAt(spec, i, j)); expect(l, `entry ${i},${j}`).toBeTruthy(); return numOf(l!.text!) }))
/** area under a drawn polyline between two x values (trapezoids, interpolating at the ends) */
const areaBetween = (pts: ReadonlyArray<readonly [number, number]>, lo: number, hi: number) => {
  let a = 0
  for (let i = 0; i + 1 < pts.length; i++) {
    const [x0, y0] = pts[i], [x1, y1] = pts[i + 1]
    const l = Math.max(x0, lo), h = Math.min(x1, hi)
    if (h <= l) continue
    const yl = y0 + ((y1 - y0) * (l - x0)) / (x1 - x0), yh = y0 + ((y1 - y0) * (h - x0)) / (x1 - x0)
    a += ((yl + yh) / 2) * (h - l)
  }
  return a
}
const simpson = (fn: (x: number) => number, lo: number, hi: number, n = 4000) => { const h = (hi - lo) / n; let t = fn(lo) + fn(hi); for (let i = 1; i < n; i++) t += (i % 2 ? 4 : 2) * fn(lo + i * h); return (t * h) / 3 }
/** independent normal CDF (Abramowitz–Stegun 7.1.26) and densities */
const erf = (x: number) => { const t = 1 / (1 + 0.3275911 * Math.abs(x)); const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x); return x >= 0 ? y : -y }
const Phi = (z: number) => 0.5 * (1 + erf(z / Math.SQRT2))
const phiRef = (z: number) => Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI)
/** Student t(9): Γ(5) / (√(9π) Γ(4.5)) with Γ(4.5) = 11.6317283966 */
const t9Ref = (t: number) => (24 / (Math.sqrt(9 * Math.PI) * 11.6317283966)) * Math.pow(1 + (t * t) / 9, -5)
const bisect = (f: (x: number) => number, lo: number, hi: number) => { for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (f(m) < 0) lo = m; else hi = m } return (lo + hi) / 2 }
/** Beta densities from their known normalising constants: Beta(5,5) = 630, Beta(8,4) = 1320, Beta(12,8) = 604656 */
const beta55 = (t: number) => 630 * t ** 4 * (1 - t) ** 4
const beta84 = (t: number) => 1320 * t ** 7 * (1 - t) ** 3
const beta128 = (t: number) => 604656 * t ** 11 * (1 - t) ** 7

describe('the mathematics each figure draws', () => {
  it('math.stats.population-sample: the drawn population has mean 60, the violet sample is a subset with mean 63', () => {
    const s = M.buildPopulationSampleScene()
    const val = (d: Obj) => 60 + d.position![0] / M.POP.ux
    const pop = dots(s, INK).map(val)
    const sample = dots(s, VIOLET).map(val)
    expect(pop).toHaveLength(24); expect(sample).toHaveLength(6)
    pop.forEach((v) => expect(Math.abs(v - Math.round(v))).toBeLessThan(0.06))
    const mu = sum(pop) / pop.length, xbar = sum(sample) / sample.length
    expect(mu).toBeCloseTo(60, 6)
    expect(xbar).toBeCloseTo(63, 6)
    // every sample value is a population value (a subset: use each population dot at most once)
    const rest = [...pop.map(Math.round)]
    for (const v of sample.map(Math.round)) { const i = rest.indexOf(v); expect(i, `sample value ${v} in the population`).toBeGreaterThanOrEqual(0); rest.splice(i, 1) }
    // each violet dot sits exactly on a grey one
    for (const d of dots(s, VIOLET)) expect(Math.min(...dots(s, INK).map((q) => dist(q.position!, d.position!)))).toBeLessThan(0.02)
    // the green line stands at the population mean and the violet line at the sample mean; the captions say so
    const lineAtX = (color: string) => bonds(s, color, 0.04).map((o) => 60 + o.from![0] / M.POP.ux)
    expect(lineAtX(GREEN)).toHaveLength(1); expect(lineAtX(VIOLET)).toHaveLength(1)
    expect(lineAtX(GREEN)[0]).toBeCloseTo(mu, 1); expect(lineAtX(VIOLET)[0]).toBeCloseTo(xbar, 1)
    expect(numsIn(labelsOf(s).find((l) => l.text!.startsWith('population mean'))!.text!)).toEqual([Math.round(mu)])
    expect(numsIn(labelsOf(s).find((l) => l.text!.startsWith('x̄'))!.text!)).toEqual([Math.round(xbar)])
    expect(numsIn(labelsOf(s).find((l) => l.text === 'sample of 6')!.text!)).toEqual([sample.length])
    // the axis numerals sit at their own values
    for (const l of labelsOf(s).filter((q) => /^\d\d$/.test(q.text!))) expect(60 + l.position![0] / M.POP.ux).toBeCloseTo(Number(l.text), 1)
    // the sample mean differs from the population mean: sampling error
    expect(Math.abs(xbar - mu)).toBeGreaterThan(1)
  })

  it('math.stats.sampling: the four drawn selections have the structure their captions claim', () => {
    const s = M.buildSamplingScene()
    const cell = (panel: keyof typeof M.SMP.centres, color: string) => dots(s, color).filter((d) => dist(d.position!, M.SMP.centres[panel]) < 2.0).map((d) => {
      const [cx, cy] = M.SMP.centres[panel]
      const col = (d.position![0] - cx) / M.SMP.cell + 2.5, row = 2.5 - (d.position![1] - cy) / M.SMP.cell
      expect(Math.abs(col - Math.round(col)) + Math.abs(row - Math.round(row))).toBeLessThan(0.1)
      return { row: Math.round(row), col: Math.round(col), k: 6 * Math.round(row) + Math.round(col) }
    })
    const srs = cell('srs', BLUE), strat = cell('strat', RED), clus = cell('cluster', GREEN), sys = cell('sys', VIOLET)
    for (const c of [srs, strat, clus, sys]) { expect(c).toHaveLength(6); expect(new Set(c.map((u) => u.k)).size).toBe(6); c.forEach((u) => { expect(u.row).toBeGreaterThanOrEqual(0); expect(u.row).toBeLessThan(6); expect(u.col).toBeGreaterThanOrEqual(0); expect(u.col).toBeLessThan(6) }) }
    // stratified: exactly 2 per band of two rows (bands rows 0-1, 2-3, 4-5), and the violet lines mark those bands
    for (const band of [0, 1, 2]) expect(strat.filter((u) => Math.floor(u.row / 2) === band)).toHaveLength(2)
    const [cx, cy] = M.SMP.centres.strat
    const bandLines = bonds(s, VIOLET, 0.05).map((o) => o.from![1])
    expect(bandLines.sort()).toEqual([cy + 3 * M.SMP.cell - 2 * M.SMP.cell, cy + 3 * M.SMP.cell - 4 * M.SMP.cell].sort().map((v) => expect.closeTo(v, 1)))
    // cluster: two whole groups, each three neighbouring cells of one row that start at column 0 or 3
    const rows = [...new Set(clus.map((u) => u.row))]
    expect(rows).toHaveLength(2)
    for (const r of rows) { const cols = clus.filter((u) => u.row === r).map((u) => u.col).sort(); expect(cols).toHaveLength(3); expect(cols[1] - cols[0]).toBe(1); expect(cols[2] - cols[1]).toBe(1); expect([0, 3]).toContain(cols[0]) }
    // systematic: every 6th unit from a start inside the first interval
    const ks = sys.map((u) => u.k).sort((a, b) => a - b)
    expect(ks[0]).toBeLessThan(6)
    ks.slice(1).forEach((k, i) => expect(k - ks[i]).toBe(6))
    // captions
    const cap = (t: string) => labelsOf(s).find((l) => l.text!.startsWith(t))!
    expect(numsIn(cap('SRS').text!)).toEqual([srs.length])
    expect(numsIn(cap('stratified').text!)).toEqual([2])
    expect(numsIn(cap('cluster').text!)).toEqual([rows.length])
    expect(numsIn(cap('systematic').text!)).toEqual([ks[1] - ks[0]])
    expect(numsIn(cap('6 units').text!)).toEqual([6])
    // four 6 × 6 grids: 7 + 7 slate lines each
    expect(bonds(s, SLATE, 0.02)).toHaveLength(4 * 14)
    void cx
  })

  it('math.stats.standard-error: the drawn curves have standard deviation σ/√n = 4 and 2', () => {
    const s = M.buildStandardErrorScene()
    const F = M.SER
    const measure = (o: Obj) => {
      const g = pathG(o, F).map(([x, y]) => [x, y] as [number, number])
      const area = areaBetween(g, -Infinity, Infinity)
      const m1 = areaBetween(g.map(([x, y]) => [x, x * y] as [number, number]), -Infinity, Infinity) / area
      const v = areaBetween(g.map(([x, y]) => [x, (x - m1) ** 2 * y] as [number, number]), -Infinity, Infinity) / area
      return { area, mean: m1, sd: Math.sqrt(v), pts: g }
    }
    const wide = measure(paths(s, BLUE)[0]), narrow = measure(paths(s, GREEN)[0])
    for (const m of [wide, narrow]) { expect(Math.abs(m.area - 1)).toBeLessThan(0.03); expect(Math.abs(m.mean)).toBeLessThan(0.05) }
    // the wide curve is drawn only to ±3σ, which trims its standard deviation by about 1.4%
    expect(Math.abs(wide.sd - 4)).toBeLessThan(0.08); expect(Math.abs(narrow.sd - 2)).toBeLessThan(0.05)
    expect(wide.sd / narrow.sd).toBeCloseTo(2, 1)
    // SE = σ / √n with σ = 8 and the n of each caption
    const ns = [numsIn(labelsOf(s).find((l) => l.text === 'n = 4')!.text!)[0], numsIn(labelsOf(s).find((l) => l.text === 'n = 16')!.text!)[0]]
    expect(ns).toEqual([4, 16])
    expect(Math.abs(8 / Math.sqrt(ns[0]) - wide.sd)).toBeLessThan(0.08); expect(Math.abs(8 / Math.sqrt(ns[1]) - narrow.sd)).toBeLessThan(0.05)
    expect(Math.abs(evalLR('8 ÷ 2 = 4') - wide.sd)).toBeLessThan(0.08); expect(Math.abs(evalLR('8 ÷ 4 = 2') - narrow.sd)).toBeLessThan(0.05)
    expect(texts(s)).toEqual(expect.arrayContaining(['8 ÷ 2 = 4', '8 ÷ 4 = 2', 'SE = σ/√n', 'n × 4 → SE ÷ 2']))
    // the violet segments span μ ± SE, at the height of the curve there
    const segs = bonds(s, VIOLET, 0.04).map((o) => segG(o, F)).sort((a, b) => b[1][0] - a[1][0])
    expect(segs).toHaveLength(2)
    segs.forEach(([a, b], i) => { const se = i === 0 ? 4 : 2; expect(b[0]).toBeCloseTo(se, 1); expect(a[0]).toBeCloseTo(-se, 1); expect(a[1]).toBeCloseTo(phiRef(1) / se, 2) })
  })

  it('math.stats.test-statistic: the drawn tail area is 1 − Φ(2.1) ≈ 0.018', () => {
    const s = M.buildTestStatisticScene()
    const F = M.TST
    pathG(paths(s, BLUE)[0], F).forEach(([z, y]) => expect(Math.abs(y - phiRef(z))).toBeLessThan(0.003))
    const dotz = dots(s, RED).map((o) => toGraph(F, o.position!))
    expect(dotz).toHaveLength(1)
    expect(dotz[0][0]).toBeCloseTo(2.1, 1); expect(dotz[0][1]).toBeCloseTo(0, 2)
    const bars = bonds(s, GREEN, 0.03).map((o) => segG(o, F))
    expect(bars).toHaveLength(M.tstBars)
    bars.forEach(([a, b], k) => { expect(Math.abs(a[0] - (2.1 + (k + 0.5) * 0.05))).toBeLessThan(0.01); expect(Math.abs(b[1] - phiRef(a[0]))).toBeLessThan(0.003) })
    const area = sum(bars.map(([a, b]) => b[1] - a[1])) * 0.05
    // the drawn bars cover [2.1, 3.3]; the exact tail is 1 − Φ(2.1), and the unseen part beyond 3.3 is tiny
    expect(Math.abs(area - simpson(phiRef, 2.1, 3.3))).toBeLessThan(0.001)
    const p = 1 - Phi(2.1)
    expect(Math.abs(area + (1 - Phi(3.3)) - p)).toBeLessThan(0.001)
    expect(numsIn(labelsOf(s).find((l) => l.text!.startsWith('p ≈'))!.text!)).toEqual([Math.round(p * 1000) / 1000])
    expect(numsIn(labelsOf(s).find((l) => l.text!.startsWith('observed'))!.text!)).toEqual([dotz[0][0] > 2.05 ? 2.1 : 0])
    expect(texts(s)).toContain('H₀: Z ~ N(0, 1)')
  })

  it('math.stats.z-test: SE = 15 ÷ 6 = 2.5, z = 6 ÷ 2.5 = 2.4 lies in the |z| ≥ 1.96 rejection region (5%), p ≈ 0.016', () => {
    const s = M.buildZTestScene()
    const F = M.ZTS
    pathG(paths(s, BLUE)[0], F).forEach(([z, y]) => expect(Math.abs(y - phiRef(z))).toBeLessThan(0.003))
    // standard error and z from the drawn captions
    const se = evalLR(labelsOf(s).find((l) => l.text === '15 ÷ 6 = 2.5')!.text!)
    expect(se).toBeCloseTo(15 / Math.sqrt(36), 9)
    const z = evalLR(labelsOf(s).find((l) => l.text === '6 ÷ 2.5 = 2.4')!.text!)
    expect(z).toBeCloseTo((106 - 100) / se, 9)
    expect(numsIn(labelsOf(s).find((l) => l.text === 'x̄ = 106')!.text!)).toEqual([106])
    // the red dot is at that z
    const dz = dots(s, RED).map((o) => toGraph(F, o.position!))
    expect(dz).toHaveLength(1)
    expect(dz[0][0]).toBeCloseTo(z, 1)
    // two red tails beyond ±1.96 with total area α = 0.05 (minus the unseen part beyond 3.3)
    const bars = bonds(s, RED, 0.03).map((o) => segG(o, F))
    expect(bars).toHaveLength(2 * M.ztsBars)
    const left = bars.filter(([a]) => a[0] < 0), right = bars.filter(([a]) => a[0] > 0)
    expect(left).toHaveLength(right.length)
    right.forEach(([a, b]) => { expect(a[0]).toBeGreaterThan(1.96); expect(Math.abs(b[1] - phiRef(a[0]))).toBeLessThan(0.003) })
    left.forEach(([a]) => expect(a[0]).toBeLessThan(-1.96))
    const area = sum(bars.map(([a, b]) => b[1] - a[1])) * 0.1
    expect(Math.abs(area + 2 * (1 - Phi(3.31)) - 0.05)).toBeLessThan(0.004)
    // the cut-off 1.96 is where the two tails hold 5%, found independently
    const crit = bisect((c) => 2 * Phi(c) - 1.95, 1, 3)
    expect(crit).toBeCloseTo(1.96, 2)
    expect(numsIn(labelsOf(s).find((l) => l.text!.startsWith('reject'))!.text!)).toEqual([Math.round(crit * 100) / 100])
    expect(Math.abs(z)).toBeGreaterThan(crit)
    const p = 2 * (1 - Phi(z))
    expect(numsIn(labelsOf(s).find((l) => l.text!.startsWith('p ≈'))!.text!)).toEqual([Math.round(p * 1000) / 1000])
  })

  it('math.stats.t-test: the drawn curves are N(0, 1) and t(9); 95% lies within ±1.96 and ±2.262; the tail is heavier', () => {
    const s = M.buildTTestScene()
    const F = M.TTS.full, Z = M.TTS.zoom
    // full panel
    const nFull = pathG(paths(s, BLUE)[0], F), tFull = pathG(paths(s, RED)[0], F)
    nFull.forEach(([x, y]) => expect(Math.abs(y - phiRef(x))).toBeLessThan(0.004))
    tFull.forEach(([x, y]) => expect(Math.abs(y - t9Ref(x))).toBeLessThan(0.004))
    // t(9) is lower in the middle than N(0, 1)
    expect(Math.max(...tFull.map((p) => p[1]))).toBeLessThan(Math.max(...nFull.map((p) => p[1])))
    // each curve holds 95% of its area between its marks, and the marks are found independently
    const critZ = bisect((c) => 2 * Phi(c) - 1.95, 1, 3)
    const critT = bisect((c) => 2 * simpson(t9Ref, 0, c, 2000) - 0.95, 1, 4)
    expect(critZ).toBeCloseTo(1.96, 2); expect(critT).toBeCloseTo(2.262, 2)
    const marks = (color: string) => dots(s, color).map((o) => toGraph(F, o.position!)[0]).sort((a, b) => a - b)
    const blueMarks = marks(BLUE), redMarks = marks(RED)
    expect(blueMarks).toHaveLength(2); expect(redMarks).toHaveLength(2)
    expect(blueMarks[1]).toBeCloseTo(critZ, 1); expect(redMarks[1]).toBeCloseTo(critT, 1)
    expect(redMarks[0]).toBeCloseTo(-redMarks[1], 1)
    expect(areaBetween(nFull, blueMarks[0], blueMarks[1])).toBeCloseTo(0.95, 1)
    expect(areaBetween(tFull, redMarks[0], redMarks[1])).toBeCloseTo(0.95, 1)
    expect(redMarks[1]).toBeGreaterThan(blueMarks[1])
    // zoomed upper tail: the red curve lies above the blue one at every sample, and both match their closed forms
    const nz = pathG(paths(s, BLUE)[1], Z), tz = pathG(paths(s, RED)[1], Z)
    expect(nz).toHaveLength(tz.length)
    nz.forEach(([t, y], i) => { expect(Math.abs(y - phiRef(t))).toBeLessThan(0.0012); expect(Math.abs(tz[i][1] - t9Ref(tz[i][0]))).toBeLessThan(0.0012); expect(tz[i][1]).toBeGreaterThan(y) })
    expect(t9Ref(3) / phiRef(3)).toBeGreaterThan(2)
    for (const t of ['±1.96', '±2.262', 't(9)', 'N(0, 1)', 'tail magnified']) expect(texts(s)).toContain(t)
    expect(numsIn(labelsOf(s).find((l) => l.text === 't(9)')!.text!)).toEqual([9])
  })

  it('math.stats.two-way-anova: cell means from the drawn dots give equal gaps (no interaction) on the left and different gaps on the right', () => {
    const s = M.buildTwoWayAnovaScene()
    const meanOf = (panel: number, d: Obj) => M.ANV.base + (d.position![1] - M.ANV.oy) / M.ANV.uy
    const levelOf = (panel: number, d: Obj) => (Math.abs(d.position![0] - M.anvAt(panel, 0, 10)[0]) < 0.05 ? 0 : 1)
    const cells = [0, 1].map((panel) => {
      const mine = (color: string) => dots(s, color).filter((d) => d.position![0] > M.ANV.panels[panel].ox && d.position![0] < M.ANV.panels[panel].ox + 3.4)
      const read = (color: string) => { const ds = mine(color); expect(ds).toHaveLength(2); const m: number[] = [0, 0]; ds.forEach((d) => { m[levelOf(panel, d)] = Math.round(meanOf(panel, d) * 100) / 100 }); return m }
      return { B1: read(RED), B2: read(BLUE) }
    })
    expect(cells[0]).toEqual({ B1: [10, 14], B2: [14, 18] })
    expect(cells[1]).toEqual({ B1: [10, 16], B2: [14, 12] })
    // gaps B₂ − B₁ at each level of A and the interaction (difference of gaps)
    const gaps = cells.map((c) => [c.B2[0] - c.B1[0], c.B2[1] - c.B1[1]])
    expect(gaps).toEqual([[4, 4], [4, -4]])
    expect(gaps.map((g) => g[1] - g[0])).toEqual([0, -8])
    // slopes of the drawn lines: parallel on the left, not on the right
    const slope = (panel: number, color: string) => { const [b] = bonds(s, color, 0.05).filter((o) => o.from![0] > M.ANV.panels[panel].ox && o.from![0] < M.ANV.panels[panel].ox + 3.4); return ((b.to![1] - b.from![1]) / M.ANV.uy) / ((b.to![0] - b.from![0]) / M.ANV.ux) }
    expect(slope(0, RED)).toBeCloseTo(slope(0, BLUE), 6)
    expect(Math.abs(slope(1, RED) - slope(1, BLUE))).toBeGreaterThan(1)
    // numerals next to the dots are the means, and the captions state the gaps
    for (const d of [...dots(s, RED), ...dots(s, BLUE)]) { const panel = d.position![0] < 0 ? 0 : 1; const lab = labelsOf(s).find((l) => /^\d+$/.test(l.text!) && l.color === d.color && dist(l.position!, d.position!) < 0.7 && Number(l.text) === Math.round(meanOf(panel, d))); expect(lab, `numeral at ${d.position}`).toBeTruthy() }
    expect(numsIn(labelsOf(s).find((l) => l.text!.startsWith('gaps 4, 4'))!.text!)).toEqual(gaps[0])
    expect(numsIn(labelsOf(s).find((l) => l.text!.startsWith('gaps 4, −4'))!.text!)).toEqual(gaps[1])
    expect(texts(s)).toEqual(expect.arrayContaining(['no interaction', 'interaction']))
  })

  it('math.stats.covariance-matrix: Σ is the sample covariance of the drawn points, symmetric with eigenvalues 4.5 and 0.5', () => {
    const s = M.buildCovarianceMatrixScene()
    const F = M.COV.frame
    const pts = dots(s, BLUE).map((d) => toGraph(F, d.position!))
    expect(pts).toHaveLength(5)
    pts.forEach(([x, y]) => { expect(Math.abs(x - Math.round(x))).toBeLessThan(0.02); expect(Math.abs(y - Math.round(y))).toBeLessThan(0.02) })
    const mean = [sum(pts.map((p) => p[0])) / 5, sum(pts.map((p) => p[1])) / 5]
    const green = toGraph(F, dots(s, GREEN)[0].position!)
    closeVec(green, mean, 0.02); closeVec(mean, [3, 3], 0.02)
    const cov = (i: number, j: number) => sum(pts.map((p) => (p[i] - mean[i]) * (p[j] - mean[j]))) / (pts.length - 1)
    const S = [[cov(0, 0), cov(0, 1)], [cov(1, 0), cov(1, 1)]]
    const drawn = numGrid(s, M.COV.m, 2, 2)
    drawn.forEach((row, i) => closeVec(row, S[i], 0.01))
    expect(drawn[0][1]).toBe(drawn[1][0])
    const tr = S[0][0] + S[1][1], det = S[0][0] * S[1][1] - S[0][1] * S[1][0], disc = Math.sqrt(tr * tr / 4 - det)
    const eig = [tr / 2 + disc, tr / 2 - disc]
    expect(eig[0]).toBeCloseTo(4.5, 6); expect(eig[1]).toBeCloseTo(0.5, 6)
    expect(eig[1]).toBeGreaterThanOrEqual(0)
    expect(numsIn(labelsOf(s).find((l) => l.text!.startsWith('λ'))!.text!)).toEqual(eig.map((v) => Math.round(v * 100) / 100))
    expect(numsIn(labelsOf(s).find((l) => l.text === 'Var X = 2.5')!.text!)).toEqual([Math.round(S[0][0] * 100) / 100])
    expect(numsIn(labelsOf(s).find((l) => l.text === 'Cov(X, Y) = 2')!.text!)).toEqual([Math.round(S[0][1] * 100) / 100])
    // diagonal blue (variances), off-diagonal green (covariances)
    const cols = [[0, 0], [0, 1], [1, 0], [1, 1]].map(([i, j]) => labelAt(s, mAt(M.COV.m, i, j))!.color)
    expect(cols).toEqual([BLUE, GREEN, GREEN, BLUE])
    // the axis numerals sit at their own values
    for (const l of labelsOf(s).filter((q) => /^[1-5]$/.test(q.text!) && q.position![0] < 0)) { const [x, y] = toGraph(F, l.position!); expect(Math.abs(x - Number(l.text)) < 0.02 || Math.abs(y - Number(l.text)) < 0.02).toBe(true) }
  })

  it('math.stats.bayesian-inference: posterior ∝ prior × likelihood point by point, each curve has area 1, MAP = 11/18', () => {
    const s = M.buildBayesianInferenceScene()
    const F = M.BAY
    const prior = pathG(paths(s, SLATE)[0], F), lik = pathG(paths(s, BLUE)[0], F), post = pathG(paths(s, GREEN)[0], F)
    for (const c of [prior, lik, post]) expect(c).toHaveLength(81)
    prior.forEach(([t, y], i) => { expect(Math.abs(t - i / 80)).toBeLessThan(0.002); expect(lik[i][0]).toBeCloseTo(t, 2); expect(post[i][0]).toBeCloseTo(t, 2); expect(Math.abs(y - beta55(t))).toBeLessThan(0.03); expect(Math.abs(lik[i][1] - beta84(t))).toBeLessThan(0.03); expect(Math.abs(post[i][1] - beta128(t))).toBeLessThan(0.03) })
    // posterior / (prior × likelihood) is the same constant everywhere the curves are tall enough to read
    const ratios = prior.map(([, y], i) => post[i][1] / (y * lik[i][1])).filter((_, i) => prior[i][1] > 0.3 && lik[i][1] > 0.3 && post[i][1] > 0.3)
    expect(ratios.length).toBeGreaterThan(20)
    ratios.forEach((r) => expect(Math.abs(r / (604656 / (630 * 1320)) - 1)).toBeLessThan(0.08))
    // every curve is a density: area 1
    for (const c of [prior, lik, post]) expect(Math.abs(areaBetween(c, 0, 1) - 1)).toBeLessThan(0.03)
    // modes: prior 0.5, likelihood 0.7, posterior (MAP) 11/18 in between; the green dot marks it
    const mode = (c: ReadonlyArray<readonly [number, number]>) => c.reduce((m, p) => (p[1] > m[1] ? p : m), c[0])[0]
    expect(mode(prior)).toBeCloseTo(0.5, 1); expect(mode(lik)).toBeCloseTo(0.7, 1); expect(Math.abs(mode(post) - 11 / 18)).toBeLessThan(0.02)
    const g = toGraph(F, dots(s, GREEN)[0].position!)
    expect(g[0]).toBeCloseTo(11 / 18, 2); expect(Math.abs(g[1] - beta128(11 / 18))).toBeLessThan(0.02)
    expect(mode(prior)).toBeLessThan(g[0]); expect(g[0]).toBeLessThan(mode(lik))
    // the caption numbers: Beta(5, 5) + 7 heads and 3 tails = Beta(12, 8); MAP (12 − 1) ÷ (12 + 8 − 2) = 0.61
    const num = (t: string) => numsIn(labelsOf(s).find((l) => l.text!.startsWith(t))!.text!)
    expect(num('prior')).toEqual([5, 5]); expect(num('likelihood')).toEqual([7, 10]); expect(num('posterior: Beta')).toEqual([12, 8])
    expect([5 + 7, 5 + (10 - 7)]).toEqual(num('posterior: Beta'))
    expect(num('MAP')).toEqual([Math.round((11 / 18) * 100) / 100])
    expect(texts(s)).toContain('posterior ∝ prior × likelihood')
  })

  it('math.stats.credible-interval: the drawn bars hold 95% of the posterior and end at its 2.5% and 97.5% quantiles', () => {
    const s = M.buildCredibleIntervalScene()
    const F = M.CRD
    const post = pathG(paths(s, GREEN)[0], F)
    post.forEach(([t, y]) => expect(Math.abs(y - beta128(t))).toBeLessThan(0.03))
    // the bars: equal width, heights on the curve, total area = the interval's probability
    const bars = bonds(s, GREEN, 0.03).map((o) => segG(o, F)).sort((a, b) => a[0][0] - b[0][0])
    expect(bars).toHaveLength(F.bars)
    const w = (bars[bars.length - 1][0][0] - bars[0][0][0]) / (bars.length - 1)
    bars.forEach(([a, b]) => expect(Math.abs(b[1] - beta128(a[0]))).toBeLessThan(0.03))
    const covered = sum(bars.map(([a, b]) => b[1] - a[1])) * w
    expect(covered).toBeCloseTo(0.95, 1)
    expect(Math.abs(covered - 0.95)).toBeLessThan(0.015)
    // the violet marks are the 2.5% and 97.5% quantiles, found independently from the density
    const cdf = (x: number) => simpson(beta128, 0, x, 4000)
    const qLo = bisect((x) => cdf(x) - 0.025, 0.05, 0.6), qHi = bisect((x) => cdf(x) - 0.975, 0.5, 0.99)
    const marks = bonds(s, VIOLET, 0.05).map((o) => toGraph(F, o.from!)[0]).sort((a, b) => a - b)
    expect(marks).toHaveLength(2)
    expect(Math.abs(marks[0] - qLo)).toBeLessThan(0.004); expect(Math.abs(marks[1] - qHi)).toBeLessThan(0.004)
    expect(cdf(marks[0])).toBeCloseTo(0.025, 2); expect(1 - cdf(marks[1])).toBeCloseTo(0.025, 2)
    // bars span exactly [lo, hi]
    expect(bars[0][0][0] - w / 2).toBeCloseTo(marks[0], 2); expect(bars[bars.length - 1][0][0] + w / 2).toBeCloseTo(marks[1], 2)
    // the posterior mean 0.6 and mode 11/18 are inside the interval
    for (const v of [12 / 20, 11 / 18]) { expect(v).toBeGreaterThan(marks[0]); expect(v).toBeLessThan(marks[1]) }
    // captions
    expect(numsIn(labelsOf(s).find((l) => l.text === '0.38')!.text!)).toEqual([Math.round(marks[0] * 100) / 100])
    expect(numsIn(labelsOf(s).find((l) => l.text === '0.80')!.text!)).toEqual([Math.round(marks[1] * 100) / 100])
    expect(numsIn(labelsOf(s).find((l) => l.text === '95%')!.text!)).toEqual([Math.round((1 - 2 * 0.025) * 100)])
    labelsOf(s).filter((l) => l.text === '2.5%').forEach((l) => expect(numsIn(l.text!)).toEqual([2.5]))
    expect(numsIn(labelsOf(s).find((l) => l.text!.startsWith('P('))!.text!)).toEqual([0.38, 0.8, 0.95])
    expect(numsIn(labelsOf(s).find((l) => l.text!.startsWith('posterior'))!.text!)).toEqual([12, 8])
  })

  it('math.stats.experimental-design: every block holds 2 A and 2 B, 6 of each overall, assigned in different orders', () => {
    const s = M.buildExperimentalDesignScene()
    const letter = (r: number, c: number) => labelAt(s, M.exdCell(r, c))!
    const grid = Array.from({ length: M.EXD.rows }, (_, r) => Array.from({ length: M.EXD.cols }, (_, c) => letter(r, c)))
    const rows = grid.map((row) => row.map((l) => l.text!).join(''))
    rows.forEach((row) => { expect(row.split('A').length - 1).toBe(2); expect(row.split('B').length - 1).toBe(2) })
    const all = rows.join('')
    expect(all.split('A').length - 1).toBe(6); expect(all.split('B').length - 1).toBe(6)
    expect(all).toHaveLength(12)
    // randomised: the three blocks do not all use the same order
    expect(new Set(rows).size).toBeGreaterThanOrEqual(2)
    // A red, B blue
    grid.forEach((row) => row.forEach((l) => expect(l.color).toBe(l.text === 'A' ? RED : BLUE)))
    // 5 vertical + 4 horizontal grid lines, and violet lines at the two block boundaries
    expect(bonds(s, SLATE, 0.025)).toHaveLength(M.EXD.cols + 1 + M.EXD.rows + 1)
    const vio = bonds(s, VIOLET, 0.06).map((o) => o.from![1]).sort((a, b) => b - a)
    expect(vio).toHaveLength(2)
    vio.forEach((y, i) => expect(y).toBeCloseTo(M.EXD.y0 - (i + 1) * M.EXD.h, 1))
    // block captions, one per row, level with it
    for (let r = 0; r < 3; r++) { const l = labelsOf(s).find((q) => q.text === `block ${r + 1}`)!; expect(l.position![1]).toBeCloseTo(M.exdCell(r, 0)[1], 1) }
    expect(numsIn(labelsOf(s).find((l) => l.text!.startsWith('replication'))!.text!)).toEqual([all.split('A').length - 1])
    expect(texts(s)).toEqual(expect.arrayContaining(['randomization: chance decides', 'blocking: similar plots together']))
  })
})
