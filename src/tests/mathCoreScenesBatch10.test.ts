/**
 * Mathematics visual campaign, batch 10 (2026-10-12): the rest of the essential statistics concepts
 * plus five calculus / function concepts. Each test checks the MATHEMATICS the figure draws — the
 * drawn coordinates are mapped back to data / areas and compared with an independent calculation —
 * not just that a figure exists.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB10'
import { phi, normPdf } from '@/lib/teaching/sceneGenerators/mathCoreScenesB8'

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
const vertical = (o: Obj) => near(o.from![0], o.to![0], 1e-9)
const horizontal = (o: Obj) => near(o.from![1], o.to![1], 1e-9)
const byX = (a: Obj, b: Obj) => (a.from ?? a.position!)[0] - (b.from ?? b.position!)[0]
const sum = (xs: readonly number[]) => xs.reduce((s, v) => s + v, 0)
const mean = (xs: readonly number[]) => sum(xs) / xs.length
const hatched = (ls: Obj[], unitY: number, step: number) => ls.reduce((s, o) => s + (len(o) / unitY) * step, 0)
const midpointIntegral = (f: (x: number) => number, a: number, b: number, n = 20000) => { let s = 0; const dx = (b - a) / n; for (let i = 0; i < n; i++) s += f(a + (i + 0.5) * dx) * dx; return s }
/** Half-height and centre-x of a closed curve (an ellipse) drawn as a path. */
const extent = (p: Obj) => { const xs = p.points!.map((q) => q[0]), ys = p.points!.map((q) => q[1]); return { cx: (Math.max(...xs) + Math.min(...xs)) / 2, ry: (Math.max(...ys) - Math.min(...ys)) / 2 } }
const rOf = (x: readonly number[], y: readonly number[]) => {
  const n = x.length, sx = sum(x), sy = sum(y), sxy = sum(x.map((v, i) => v * y[i])), sxx = sum(x.map((v) => v * v)), syy = sum(y.map((v) => v * v))
  return (n * sxy - sx * sy) / Math.sqrt((n * sxx - sx * sx) * (n * syy - sy * sy))
}

const BATCH: Array<[string, () => SceneSpec, string]> = [
  ['math.stats.p-value', M.buildPValueScene, 'math-p-value'],
  ['math.stats.type-errors', M.buildTypeErrorsScene, 'math-type-errors'],
  ['math.stats.power', M.buildStatisticalPowerScene, 'math-power'],
  ['math.stats.anova', M.buildAnovaScene, 'math-anova'],
  ['math.stats.correlation', M.buildStatsCorrelationScene, 'math-stats-correlation'],
  ['math.stats.linear-regression', M.buildLinearRegressionScene, 'math-linear-regression'],
  ['math.stats.normal-approximation', M.buildNormalApproximationScene, 'math-normal-approximation'],
  ['math.calc.curve-sketching', M.buildCurveSketchingScene, 'math-curve-sketching'],
  ['math.calc.volume-revolution', M.buildVolumeRevolutionScene, 'math-volume-revolution'],
  ['math.calc.surface-area-integral', M.buildSurfaceAreaIntegralScene, 'math-surface-area-integral'],
  ['math.calc.parametric-calculus', M.buildParametricCalculusScene, 'math-parametric-calculus'],
  ['math.func.periodic-function', M.buildPeriodicFunctionScene, 'math-periodic-function'],
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

describe('the mathematics each figure draws', () => {
  it('p-value: each tail beyond |z| = 1.5 holds 0.067 so p = 0.134, which is greater than α = 0.05 (critical ±1.96, drawn further out)', () => {
    const { observed, crit, tailEnd, tailSteps, yScale, oy } = M.PVAL
    expect(1 - phi(observed)).toBeCloseTo(0.0668, 4); expect(M.twoSidedP(observed)).toBeCloseTo(0.1336, 4); expect(M.twoSidedP(observed)).toBeGreaterThan(0.05)
    expect(M.twoSidedP(crit)).toBeCloseTo(0.05, 3)                                                                                       // ±1.96 is exactly the 5% cut
    expect(M.twoSidedP(2.576)).toBeCloseTo(0.01, 3)
    const s = M.buildPValueScene()
    for (const p of paths(s, INK)[0].points!) expect(Math.abs((p[1] - oy) / yScale - normPdf(p[0]))).toBeLessThan(0.002)
    const tails = bonds(s, RED, 0.022).filter(vertical)
    const right = tails.filter((o) => o.from![0] > 0), left = tails.filter((o) => o.from![0] < 0)
    expect([right.length, left.length]).toEqual([tailSteps, tailSteps])
    const step = (tailEnd - observed) / tailSteps
    for (const o of right) expect(o.from![0]).toBeGreaterThan(observed); for (const o of left) expect(o.from![0]).toBeLessThan(-observed)
    const aR = hatched(right, yScale, step), aL = hatched(left, yScale, step)
    expect(aR).toBeCloseTo(phi(tailEnd) - phi(observed), 2); expect(aL).toBeCloseTo(aR, 3)
    expect(aR + aL).toBeCloseTo(M.twoSidedP(observed) - 2 * (1 - phi(tailEnd)), 2)                                                          // the drawn tails are p, less the clipped far tail
    expect(dots(s, GREEN)[0].position![0]).toBeCloseTo(observed, 2)
    const crits = bonds(s, VIOLET, 0.04).filter(vertical).map((b) => b.from![0]).sort((a, b) => a - b)
    expect(crits).toEqual([-crit, crit].map((v) => expect.closeTo(v, 2))); expect(crit).toBeGreaterThan(observed)
    expect(texts(s)).toEqual(expect.arrayContaining(['observed z = 1.5', 'p = 2 × 0.067 = 0.134', 'α = 0.05 (±1.96)', 'p > α: do not reject H₀']))
  })

  it('Type errors: α = 0.05 is the H₀ tail beyond 1.645, β = 0.088 the H₁ part below it; moving the line trades one for the other', () => {
    const { shift, tailEnd, steps, u, mid, sy, oy } = M.TYPE
    const c = M.typeCrit()
    expect(c).toBeCloseTo(1.6449, 4); expect(M.typeAlpha()).toBeCloseTo(0.05, 6); expect(M.typeBeta()).toBeCloseTo(0.0877, 4); expect(M.typeBeta()).toBeCloseTo(phi(-1.3551), 4)
    for (const dc of [-0.5, 0.5]) { const a2 = 1 - phi(c + dc), b2 = phi(c + dc - shift); dc < 0 ? (expect(a2).toBeGreaterThan(0.05), expect(b2).toBeLessThan(M.typeBeta())) : (expect(a2).toBeLessThan(0.05), expect(b2).toBeGreaterThan(M.typeBeta())) }   // tradeoff
    const s = M.buildTypeErrorsScene()
    const z = (px: number) => px / u + mid
    for (const [color, mu] of [[INK, 0], [BLUE, shift]] as Array<[string, number]>) for (const p of paths(s, color)[0].points!) expect(Math.abs((p[1] - oy) / sy - normPdf(z(p[0]), mu, 1))).toBeLessThan(0.004)
    expect(bonds(s, VIOLET, 0.04).filter(vertical)[0].from![0] / u + mid).toBeCloseTo(c, 1)                                              // the critical line
    const alpha = bonds(s, RED, 0.022).filter(vertical), beta = bonds(s, VIOLET, 0.022).filter(vertical)
    expect([alpha.length, beta.length]).toEqual([steps, steps])
    for (const o of alpha) expect(z(o.from![0])).toBeGreaterThan(c); for (const o of beta) expect(z(o.from![0])).toBeLessThan(c)           // α to the right of the line, β to the left
    expect(hatched(alpha, sy, (tailEnd - c) / steps)).toBeCloseTo(M.typeAlpha() - (1 - phi(tailEnd)), 2)
    expect(hatched(beta, sy, (c - (shift - tailEnd)) / steps)).toBeCloseTo(M.typeBeta() - phi(-tailEnd), 2)
    expect(texts(s)).toEqual(expect.arrayContaining(['H₀', 'H₁', 'critical value 1.645', 'α = 0.05: reject a TRUE H₀', 'β = 0.088: keep a FALSE H₀']))
  })

  it('Power: 1 − Φ(1.645 − δ) is 0.05 at δ = 0, 0.64 at 2, 0.91 at 3 (= 1 − β above) and reaches 0.80 at δ ≈ 2.49', () => {
    const { u, mid, sy, oy, points } = M.POWER
    expect(M.powerAt(0)).toBeCloseTo(0.05, 6); expect(M.powerAt(2)).toBeCloseTo(0.6387, 3); expect(M.powerAt(3)).toBeCloseTo(0.9123, 3)
    expect(M.powerAt(3)).toBeCloseTo(1 - M.typeBeta(), 12)                                                                                // power = 1 − β
    expect(M.deltaForPower(0.8)).toBeCloseTo(2.4865, 3); expect(M.powerAt(M.deltaForPower(0.8))).toBeCloseTo(0.8, 6)
    let prev = 0; for (let d = 0; d <= 6; d += 0.25) { expect(M.powerAt(d)).toBeGreaterThan(prev); prev = M.powerAt(d) }                  // increasing in the effect size
    expect(M.powerAt(5)).toBeGreaterThan(0.999)
    expect(midpointIntegral((v) => normPdf(v), 1.6449 - 3, 9)).toBeCloseTo(M.powerAt(3), 4)                                              // power = P(Z > c − δ), by integration
    const s = M.buildStatisticalPowerScene()
    for (const p of paths(s, INK)[0].points!) expect(Math.abs((p[1] - oy) / sy - M.powerAt(p[0] / u + mid))).toBeLessThan(0.006)
    const marked = [dots(s, RED)[0], dots(s, BLUE)[0], dots(s, GREEN)[0]]
    marked.forEach((d, i) => { const dl = d.position![0] / u + mid; expect(dl).toBeCloseTo(points[i], 1); expect((d.position![1] - oy) / sy).toBeCloseTo(M.powerAt(points[i]), 2) })
    const target = dots(s, VIOLET)[0]; expect(target.position![0] / u + mid).toBeCloseTo(2.4865, 1); expect((target.position![1] - oy) / sy).toBeCloseTo(0.8, 2)
    const g = bonds(s, VIOLET, 0.03); expect(g.find(horizontal)!.from![1]).toBeCloseTo(0.8 * sy + oy, 2); expect(g.find(vertical)!.to![1]).toBeCloseTo(oy, 2)
    expect(texts(s)).toEqual(expect.arrayContaining(['δ = 0: power = α = 0.05', 'δ = 2: 0.64', 'δ = 3: 0.91', 'power 0.80 at δ ≈ 2.49', 'power', 'effect size δ']))
  })

  it('ANOVA: SS_within = 26, SS_between = 40, total 66 = Σ(x − 6)²; F = (40 ÷ 2) ÷ (26 ÷ 12) = 9.23, recomputed from the drawn dots, segments and arrows', () => {
    const { groups, gx, u, mid } = M.ANOVA
    const st = M.anovaStats(groups)
    expect(st.grand).toBe(6); expect(st.ssw).toBe(26); expect(st.ssb).toBe(40); expect(st.sst).toBe(66); expect(st.dfb).toBe(2); expect(st.dfw).toBe(12)
    expect(st.F).toBeCloseTo(9.2308, 3); expect(st.msw).toBeCloseTo(26 / 12, 12); expect(st.F).toBeGreaterThan(3.89)                      // beyond the 5% critical value F(2, 12)
    expect(sum(groups.flat().map((v) => (v - 6) ** 2))).toBe(66)                                                                         // total, directly
    const s = M.buildAnovaScene()
    const pts = dots(s, INK); expect(pts).toHaveLength(15)
    const vals = pts.map((d) => ({ g: gx.reduce((best, x, i) => (Math.abs(d.position![0] - x) < Math.abs(d.position![0] - gx[best]) ? i : best), 0), v: Math.round((d.position![1] / u + mid) * 100) / 100 }))
    for (let g = 0; g < 3; g++) expect(vals.filter((p) => p.g === g).map((p) => p.v).sort((a, b) => a - b)).toEqual([...groups[g]].sort((a, b) => a - b))
    expect(sum(pts.map((d) => (d.position![1] / u) ** 2))).toBeCloseTo(66, 1)                                                            // total squared distance from the grand mean
    expect(bonds(s, BLUE, 0.06).map((b) => Math.round((b.from![1] / u + mid) * 100) / 100).sort((a, b) => a - b)).toEqual([4, 6, 8])    // group means
    expect(bonds(s, VIOLET, 0.03).find(horizontal)!.from![1]).toBeCloseTo(0, 2)                                                           // grand mean at 0
    const within = bonds(s, RED, 0.04).filter(vertical)
    expect(within).toHaveLength(11)                                                                                                       // values equal to their group mean need no segment
    expect(sum(within.map((o) => (len(o) / u) ** 2))).toBeCloseTo(26, 1)
    const between = arrows(s, BLUE); expect(between).toHaveLength(2)
    expect(between.map((a) => (a.to![1] - a.from![1]) / u).sort((a, b) => a - b)).toEqual([-2, 2].map((v) => expect.closeTo(v, 2)))
    expect(sum(between.map((a) => 5 * (len(a) / u) ** 2))).toBeCloseTo(40, 1)
    expect(texts(s)).toEqual(expect.arrayContaining(['within: SS = 26', 'between: SS = 40', 'F = (40 ÷ 2) ÷ (26 ÷ 12) = 9.23', 'grand mean 6']))
  })

  it('Sample correlation: r = 33.2 ÷ √(42 × 30.5) = 0.93, r² = 0.86, and one outlier drops r to 0.57 (all recomputed from the drawn points)', () => {
    const { x, y, outlier, u, mx, my } = M.REG
    const st = M.regStats(x, y)
    expect(st.sxy).toBeCloseTo(33.2, 10); expect(st.sxx).toBe(42); expect(st.syy).toBeCloseTo(30.5, 10)
    expect(st.r).toBeCloseTo(0.9276, 4); expect(st.r).toBeCloseTo(rOf(x, y), 12); expect(st.r ** 2).toBeCloseTo(0.8605, 4)
    const xo = [...x, outlier[0]], yo = [...y, outlier[1]]
    expect(rOf(xo, yo)).toBeCloseTo(0.5684, 3); expect(rOf(xo, yo)).toBeLessThan(st.r - 0.3)
    const s = M.buildStatsCorrelationScene()
    const back = (d: Obj) => [d.position![0] / u + mx, d.position![1] / u + my]
    const blue = dots(s, BLUE).map(back); expect(blue).toHaveLength(8)
    blue.forEach(([px, py], i) => { expect(px).toBeCloseTo(x[i], 1); expect(py).toBeCloseTo(y[i], 1) })
    expect(rOf(blue.map((p) => p[0]), blue.map((p) => p[1]))).toBeCloseTo(0.93, 1)
    const red = dots(s, RED).map(back); expect(red).toHaveLength(1)
    expect(red[0][0]).toBeCloseTo(7, 1); expect(red[0][1]).toBeCloseTo(1.5, 1)
    const all = [...blue, ...red]; expect(rOf(all.map((p) => p[0]), all.map((p) => p[1]))).toBeCloseTo(0.57, 1)
    expect(texts(s)).toEqual(expect.arrayContaining(['r = Sxy / √(Sxx·Syy) = 0.93', 'r² = 0.86', 'outlier', 'one outlier: r = 0.57']))
  })

  it('Linear regression: ŷ = 1.49 + 0.79x passes through the means, its residuals add to 0 and SSE = 4.26 beats the steeper line (8.04)', () => {
    const { x, y, u, mx, my } = M.REG
    const st = M.regStats(x, y)
    expect(st.b1).toBeCloseTo(33.2 / 42, 12); expect(st.b0).toBeCloseTo(5.05 - (33.2 / 42) * 4.5, 12); expect(st.b0 + st.b1 * 4.5).toBeCloseTo(5.05, 12)
    const res = x.map((v, i) => y[i] - (st.b0 + st.b1 * v))
    expect(sum(res)).toBeCloseTo(0, 10); expect(sum(x.map((v, i) => v * res[i]))).toBeCloseTo(0, 10)                                    // the normal equations
    expect(st.sse).toBeCloseTo(4.2562, 3)
    for (const dm of [-0.05, 0.05]) expect(M.sseThroughMeans(x, y, st.b1 + dm)).toBeGreaterThan(st.sse)                                  // a minimum
    expect(M.sseThroughMeans(x, y, st.b1 + 0.3)).toBeCloseTo(8.0362, 3); expect(M.sseThroughMeans(x, y, st.b1 - 0.3)).toBeCloseTo(8.0362, 3)
    const s = M.buildLinearRegressionScene()
    const fit = bonds(s, GREEN, 0.05)[0]
    expect((fit.to![1] - fit.from![1]) / (fit.to![0] - fit.from![0])).toBeCloseTo(st.b1, 2)
    const centre = dots(s, VIOLET)[0]; expect(centre.position![0] / u + mx).toBeCloseTo(4.5, 2); expect(centre.position![1] / u + my).toBeCloseTo(5.05, 2)
    const yOnLine = fit.from![1] + ((centre.position![0] - fit.from![0]) * (fit.to![1] - fit.from![1])) / (fit.to![0] - fit.from![0])
    expect(yOnLine).toBeCloseTo(centre.position![1], 1)                                                                                   // the line passes through the point of means
    const resid = bonds(s, RED, 0.04).filter(vertical); expect(resid).toHaveLength(8)
    expect(sum(resid.map((o) => (len(o) / u) ** 2))).toBeCloseTo(st.sse, 1)
    const alt = bonds(s, SLATE, 0.03)[0]; expect((alt.to![1] - alt.from![1]) / (alt.to![0] - alt.from![0])).toBeCloseTo(st.b1 + 0.3, 2)
    expect(texts(s)).toEqual(expect.arrayContaining(['ŷ = 1.49 + 0.79x', 'SSE = 4.26', 'steeper line: 8.04 is worse', '(x̄, ȳ) = (4.5, 5.05)']))
  })

  it('Normal approximation: Bin(20, 1/2) has mean 10, variance 5; P(X ≤ 12) = 0.868 and the normal area to 12.5 is 0.868 (to 12 only 0.814)', () => {
    const { n, p, kmin, kmax, u, sy, oy, cut } = M.NORMAPP
    const pmfAll = Array.from({ length: n + 1 }, (_, k) => M.binomialCdf(n, p, k) - (k ? M.binomialCdf(n, p, k - 1) : 0))
    expect(sum(pmfAll)).toBeCloseTo(1, 12); expect(sum(pmfAll.map((q, k) => k * q))).toBeCloseTo(10, 10); expect(sum(pmfAll.map((q, k) => (k - 10) ** 2 * q))).toBeCloseTo(5, 10)
    expect(M.binomialCdf(n, p, cut)).toBeCloseTo(0.8684, 4); expect(M.normalApprox(n, p, cut + 0.5)).toBeCloseTo(0.8682, 4); expect(M.normalApprox(n, p, cut)).toBeCloseTo(0.8145, 3)
    expect(Math.abs(M.normalApprox(n, p, cut + 0.5) - M.binomialCdf(n, p, cut))).toBeLessThan(0.001)
    expect(Math.abs(M.normalApprox(n, p, cut) - M.binomialCdf(n, p, cut))).toBeGreaterThan(0.05)                                          // the correction matters
    const s = M.buildNormalApproximationScene()
    const bars = bonds(s, BLUE, 0.08).sort(byX); expect(bars).toHaveLength(kmax - kmin + 1)
    bars.forEach((b, i) => { const k = b.from![0] / u + 10; expect(k).toBeCloseTo(kmin + i, 1); expect(len(b) / sy).toBeCloseTo(pmfAll[kmin + i], 2) })
    const green = bonds(s, GREEN, 0.1); expect(green).toHaveLength(cut - kmin + 1)
    expect(sum(green.map((b) => len(b) / sy))).toBeCloseTo(M.binomialCdf(n, p, cut) - M.binomialCdf(n, p, kmin - 1), 1)
    const tol = 0.002
    for (const q of paths(s, INK)[0].points!) expect(Math.abs((q[1] - oy) / sy - normPdf(q[0] / u + 10, 10, Math.sqrt(5)))).toBeLessThan(tol)
    expect(bonds(s, VIOLET, 0.03)[0].from![0] / u + 10).toBeCloseTo(12.5, 1)
    expect(texts(s)).toEqual(expect.arrayContaining(['Bin(20, 1/2)', 'N(10, 5)', 'P(X ≤ 12) = 0.868', 'normal to 12.5: 0.868', 'without correction: 0.814']))
  })

  it('Curve sketching: f = x/(1 + x²) is odd with f → 0, has extrema at (±1, ±0.5) where f′ = 0, and inflections at 0 and ±√3 where f″ = 0, all on the drawn curve', () => {
    const { ux, uy } = M.SKETCH
    for (const xv of [0.3, 1, 2.5, 7]) expect(M.sketchF(-xv)).toBeCloseTo(-M.sketchF(xv), 12)
    expect(Math.abs(M.sketchF(1e6))).toBeLessThan(1e-5)
    expect(M.sketchF(1)).toBe(0.5); expect(M.sketchF(-1)).toBe(-0.5)
    const h = 1e-5, d1 = (x: number) => (M.sketchF(x + h) - M.sketchF(x - h)) / (2 * h), d2 = (x: number) => (M.sketchF(x + h) - 2 * M.sketchF(x) + M.sketchF(x - h)) / (h * h)
    for (const xv of [-2, -0.6, 0.4, 3]) { expect(d1(xv)).toBeCloseTo(M.sketchFp(xv), 6); expect(d2(xv)).toBeCloseTo(M.sketchFpp(xv), 3) }
    expect(M.sketchFp(1)).toBe(0); expect(M.sketchFp(-1)).toBe(0); expect(M.sketchFp(0.5)).toBeGreaterThan(0); expect(M.sketchFp(2)).toBeLessThan(0)   // up on (−1, 1), down outside
    expect(M.sketchFpp(0)).toBeCloseTo(0, 12); expect(M.sketchFpp(Math.sqrt(3))).toBeCloseTo(0, 12); expect(M.sketchFpp(-Math.sqrt(3))).toBeCloseTo(0, 12)
    expect(M.sketchFpp(1)).toBeLessThan(0); expect(M.sketchFpp(2)).toBeGreaterThan(0); expect(M.sketchFpp(-1)).toBeGreaterThan(0)              // concave down at the max, up at the min
    const s = M.buildCurveSketchingScene()
    for (const p of paths(s, INK)[0].points!) expect(Math.abs(p[1] / uy - M.sketchF(p[0] / ux))).toBeLessThan(0.012)
    const at = (d: Obj) => [d.position![0] / ux, d.position![1] / uy]
    const mx = at(dots(s, BLUE)[0]), mn = at(dots(s, RED)[0])
    expect(mx[0]).toBeCloseTo(1, 1); expect(mx[1]).toBeCloseTo(0.5, 2); expect(mn[0]).toBeCloseTo(-1, 1); expect(mn[1]).toBeCloseTo(-0.5, 2)
    const infl = dots(s, GREEN).map(at).sort((a, b) => a[0] - b[0]); expect(infl).toHaveLength(3)
    infl.forEach(([px, py], i) => { expect(px).toBeCloseTo([-Math.sqrt(3), 0, Math.sqrt(3)][i], 1); expect(py).toBeCloseTo(M.sketchF(px), 1) })
    const tangents = bonds(s, VIOLET, 0.03); expect(tangents).toHaveLength(2)
    for (const t of tangents) expect(horizontal(t)).toBe(true)                                                                            // horizontal tangents at the extrema
    expect(tangents.map((t) => Math.round((t.from![1] / uy) * 100) / 100).sort((a, b) => a - b)).toEqual([-0.5, 0.5])
    expect(texts(s)).toEqual(expect.arrayContaining(['odd: f(−x) = −f(x)', 'asymptote y = 0', 'max (1, 0.5)', 'min (−1, −0.5)', 'inflections: x = 0, ±√3']))
  })

  it('Volume of revolution: π∫₀⁴ x dx = 8π (also by Pappus), and the 8 drawn disks of radius √x and width 0.5 add to 8π ≈ 25.13', () => {
    const { u, ox, a, b, disks, hatchStep } = M.VOLREV
    const dx = (b - a) / disks
    expect(M.volExact()).toBeCloseTo(25.1327, 3)
    expect(Math.PI * midpointIntegral((x) => x, 0, 4)).toBeCloseTo(8 * Math.PI, 6)
    expect(sum(M.diskCentres().map((x) => Math.PI * M.volF(x) ** 2 * dx))).toBeCloseTo(8 * Math.PI, 12)                                  // midpoint disks are exact for a linear integrand
    const area = midpointIntegral(M.volF, 0, 4), ybar = midpointIntegral((x) => M.volF(x) ** 2 / 2, 0, 4) / area
    expect(2 * Math.PI * ybar * area).toBeCloseTo(8 * Math.PI, 3)                                                                         // Pappus: V = 2π ȳ A
    const s = M.buildVolumeRevolutionScene()
    for (const p of paths(s, INK)[0].points!) { const x = (p[0] - ox) / u; if (x > 0.25) expect(Math.abs(p[1] / u - Math.sqrt(x))).toBeLessThan(0.02) }
    expect(hatched(bonds(s, BLUE, 0.022).filter(vertical), u, hatchStep)).toBeCloseTo(16 / 3, 1)                                          // the region has area 16/3
    const rings = paths(s, GREEN); expect(rings).toHaveLength(disks)
    const drawn = rings.map((r) => { const e = extent(r); return { x: (e.cx - ox) / u, r: e.ry / u } }).sort((p, q) => p.x - q.x)
    drawn.forEach((d, i) => { expect(d.x).toBeCloseTo(M.diskCentres()[i], 1); expect(d.r).toBeCloseTo(Math.sqrt(d.x), 1) })
    expect(sum(drawn.map((d) => Math.PI * d.r * d.r * dx))).toBeCloseTo(8 * Math.PI, 0)
    const violet = paths(s, VIOLET); const mirror = violet.find((p) => p.points!.length > 50)!, endDisk = violet.find((p) => p.points!.length < 50)!
    for (const p of mirror.points!) { const x = (p[0] - ox) / u; if (x > 0.25) expect(Math.abs(-p[1] / u - Math.sqrt(x))).toBeLessThan(0.02) }
    expect(extent(endDisk).ry / u).toBeCloseTo(2, 1); expect((extent(endDisk).cx - ox) / u).toBeCloseTo(4, 1)                             // radius √4 = 2 at x = 4
    expect(texts(s)).toEqual(expect.arrayContaining(['y = √x', 'rotate about the x-axis', 'disk: π f(x)² Δx', 'V = π∫₀⁴ x dx = 8π ≈ 25.13']))
  })

  it('Surface of revolution: 2π∫₀² x√2 dx = 4π√2 = π r l = 17.77, and the 4 drawn bands (radius 0.25 … 1.75, slant 0.5√2 each) add to it', () => {
    const { u, ox, bands } = M.SURF
    expect(M.surfExact()).toBeCloseTo(17.7715, 3); expect(M.surfExact()).toBeCloseTo(Math.PI * 2 * 2 * Math.SQRT2, 12)                      // the cone formula π r l
    expect(2 * Math.PI * midpointIntegral((x) => x * Math.sqrt(1 + 1), 0, 2)).toBeCloseTo(M.surfExact(), 6)
    const s = M.buildSurfaceAreaIntegralScene()
    const segs = [...bonds(s, BLUE, 0.1), ...bonds(s, RED, 0.1)].sort(byX); expect(segs).toHaveLength(bands)
    segs.forEach((g) => expect(len(g) / u).toBeCloseTo(0.5 * Math.SQRT2, 2))                                                              // slant pieces of length 0.5√2
    const rings = paths(s, GREEN).map((r) => { const e = extent(r); return { x: (e.cx - ox) / u, r: e.ry / u } }).sort((p, q) => p.x - q.x)
    expect(rings).toHaveLength(bands)
    rings.forEach((d, i) => { expect(d.x).toBeCloseTo(M.bandCentres()[i], 1); expect(d.r).toBeCloseTo(d.x, 1) })                         // f(x) = x
    expect(sum(rings.map((d, i) => 2 * Math.PI * d.r * (len(segs[i]) / u)))).toBeCloseTo(M.surfExact(), 0)
    segs.forEach((g, i) => expect(((g.from![0] + g.to![0]) / 2 - ox) / u).toBeCloseTo(rings[i].x, 1))                                      // each ring sits at the middle of its piece
    expect(texts(s)).toEqual(expect.arrayContaining(['S = 2π∫₀² x√2 dx = 4π√2 ≈ 17.77', 'check: π r l = π · 2 · 2√2', 'band: 2π f(x) Δs']))
  })

  it('Parametric calculus: the cycloid has slope 1 at t = π/2, arc length 8 (12 chords give 7.98) and area 3π (24 strips give 9.42)', () => {
    const { u, t0, chords, strips } = M.CYC
    expect(M.cycSlope(t0)).toBeCloseTo(1, 12)
    const h = 1e-6, dydx = (t: number) => (M.cycY(t + h) - M.cycY(t - h)) / (M.cycX(t + h) - M.cycX(t - h))
    for (const t of [0.5, 1.2, 2.5, 4]) expect(dydx(t)).toBeCloseTo(M.cycSlope(t), 5)                                                     // dy/dx = (dy/dt)/(dx/dt)
    const speed = (t: number) => Math.hypot(1 - Math.cos(t), Math.sin(t))
    expect(midpointIntegral(speed, 0, 2 * Math.PI)).toBeCloseTo(8, 6)                                                                     // arc length of one arch
    expect(M.chordLength(12)).toBeCloseTo(7.9776, 3); expect(M.chordLength(12)).toBeLessThan(M.chordLength(24)); expect(M.chordLength(24)).toBeLessThan(8)
    expect(midpointIntegral((t) => M.cycY(t) * (1 - Math.cos(t)), 0, 2 * Math.PI)).toBeCloseTo(3 * Math.PI, 6)                            // area under the arch
    expect(M.cycArea(24)).toBeCloseTo(3 * Math.PI, 1)
    const s = M.buildParametricCalculusScene()
    const back = (p: number[]) => [p[0] / u + Math.PI, p[1] / u + 1]
    paths(s, INK)[0].points!.forEach((p, i) => { const t = (2 * Math.PI * i) / 59, [x, y] = back(p); expect(x).toBeCloseTo(M.cycX(t), 1); expect(y).toBeCloseTo(M.cycY(t), 1) })
    const tan = bonds(s, VIOLET, 0.05)[0]; expect((tan.to![1] - tan.from![1]) / (tan.to![0] - tan.from![0])).toBeCloseTo(1, 2)
    const pt = back(dots(s, RED)[0].position!); expect(pt[0]).toBeCloseTo(M.cycX(t0), 1); expect(pt[1]).toBeCloseTo(M.cycY(t0), 1)
    const onTan = ((pt[0] * u - Math.PI * u - tan.from![0]) * (tan.to![1] - tan.from![1]) - (pt[1] * u - u - tan.from![1]) * (tan.to![0] - tan.from![0])) / len(tan)
    expect(Math.abs(onTan)).toBeLessThan(0.03)                                                                                            // the point is on its tangent
    const cs = bonds(s, BLUE, 0.04); expect(cs).toHaveLength(chords)
    expect(sum(cs.map((c) => len(c) / u))).toBeCloseTo(M.chordLength(chords), 1)
    const hs = bonds(s, GREEN, 0.03).filter(vertical); expect(hs).toHaveLength(strips)
    const dt = (2 * Math.PI) / strips
    expect(sum(hs.map((o, k) => { const t = (k + 0.5) * dt; expect(back(o.from!)[0]).toBeCloseTo(M.cycX(t), 1); return (len(o) / u) * (1 - Math.cos(t)) * dt }))).toBeCloseTo(3 * Math.PI, 1)
    expect(texts(s)).toEqual(expect.arrayContaining(['dy/dx = sin t/(1 − cos t) = 1 at t = π/2', '12 chords: 7.98 → L = 8', 'area = ∫ y dx/dt dt = 3π ≈ 9.42']))
  })

  it('Periodic function: sin x repeats every 2π (and not every π); sin 2x every π; the drawn curves, dots and brackets agree', () => {
    const { u, yScale, probe } = M.PERIOD
    const T = 2 * Math.PI, xs = Array.from({ length: 40 }, (_, i) => -3 + i * 0.37)
    for (const x of xs) { expect(Math.sin(x + T)).toBeCloseTo(Math.sin(x), 12); expect(Math.sin(2 * (x + Math.PI))).toBeCloseTo(Math.sin(2 * x), 12) }
    expect(Math.max(...xs.map((x) => Math.abs(Math.sin(x + Math.PI) - Math.sin(x))))).toBeGreaterThan(1.9)                                // π is NOT a period of sin x
    expect(Math.max(...xs.map((x) => Math.abs(Math.sin(2 * (x + Math.PI / 2)) - Math.sin(2 * x))))).toBeGreaterThan(1.9)                  // π/2 is not a period of sin 2x
    const s = M.buildPeriodicFunctionScene()
    const xOf = (px: number) => px / u + Math.PI
    for (const p of paths(s, INK)[0].points!) expect(Math.abs(p[1] / yScale - Math.sin(xOf(p[0])))).toBeLessThan(0.02)
    for (const p of paths(s, RED)[0].points!) expect(Math.abs(p[1] / yScale - Math.sin(2 * xOf(p[0])))).toBeLessThan(0.04)
    const g = dots(s, GREEN).sort(byX); expect(g).toHaveLength(2)
    expect(xOf(g[0].position![0])).toBeCloseTo(probe, 1); expect(xOf(g[1].position![0])).toBeCloseTo(probe + T, 1)
    expect(g[0].position![1]).toBeCloseTo(g[1].position![1], 2); expect(g[0].position![1] / yScale).toBeCloseTo(Math.sin(1), 2)           // f(x + T) = f(x): same height
    const bar = (color: string) => bonds(s, color, 0.05).find(horizontal)!
    expect(len(bar(BLUE)) / u).toBeCloseTo(T, 1); expect(len(bar(RED)) / u).toBeCloseTo(Math.PI, 1)                                       // T = 2π and T = π
    expect(texts(s)).toEqual(expect.arrayContaining(['f(x) = sin x', 'period T = 2π', 'f(x + T) = f(x)', 'sin 2x: T = π']))
  })
})
