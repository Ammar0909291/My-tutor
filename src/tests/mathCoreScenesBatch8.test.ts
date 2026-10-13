/**
 * Mathematics visual campaign, batch 8 (2026-10-11): twelve probability concepts.
 * Each test checks the MATHEMATICS the figure draws — the drawn coordinates are mapped
 * back to probabilities and compared with an independent calculation — not just
 * that a figure exists.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB8'

type Obj = { type?: string; text?: string; color?: string; radius?: number; thickness?: number; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const objs = (s: SceneSpec): Obj[] => s.steps.flatMap((st) => st.objects as Obj[])
const texts = (s: SceneSpec) => objs(s).map((o) => o.text ?? '')
const RED = '#ef4444', BLUE = '#3b82f6', GREEN = '#22c55e', VIOLET = '#a78bfa', SLATE = '#94a3b8', INK = '#e2e8f0'
const lines = (s: SceneSpec, color?: string) => objs(s).filter((o) => (o.type === 'bond' || o.type === 'arrow') && o.from && o.to && (!color || o.color === color))
const bonds = (s: SceneSpec, color: string, thickness: number) => lines(s, color).filter((o) => o.type === 'bond' && near(o.thickness ?? 0, thickness, 1e-9))
const dots = (s: SceneSpec, color?: string) => objs(s).filter((o) => o.type === 'node' && o.position && (!color || o.color === color))
const paths = (s: SceneSpec, color?: string) => objs(s).filter((o) => o.type === 'path' && o.points && (!color || o.color === color))
const labelsOf = (s: SceneSpec) => objs(s).filter((o) => o.type === 'label')
const len = (o: Obj) => Math.hypot(o.to![0] - o.from![0], o.to![1] - o.from![1])
const near = (a: number, b: number, tol = 0.02) => Math.abs(a - b) <= tol
const vertical = (o: Obj) => near(o.from![0], o.to![0], 1e-9)
const horizontal = (o: Obj) => near(o.from![1], o.to![1], 1e-9)
const byX = (a: Obj, b: Obj) => (a.from ?? a.position!)[0] - (b.from ?? b.position!)[0]
const sum = (xs: number[]) => xs.reduce((s, v) => s + v, 0)
const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1))
const binom = (n: number, k: number) => factorial(n) / (factorial(k) * factorial(n - k))
/** Area a set of vertical hatch lines stands for: sum of (length / unit) x step. */
const hatched = (ls: Obj[], unitY: number, step: number) => ls.reduce((s, o) => s + (len(o) / unitY) * step, 0)

const BATCH: Array<[string, () => SceneSpec, string]> = [
  ['math.prob.event', M.buildEventScene, 'math-event'],
  ['math.prob.total-probability', M.buildTotalProbabilityScene, 'math-total-probability'],
  ['math.prob.distribution', M.buildDistributionScene, 'math-distribution'],
  ['math.prob.discrete-distributions', M.buildDiscreteDistributionsScene, 'math-discrete-distributions'],
  ['math.prob.continuous-distributions', M.buildContinuousDistributionsScene, 'math-continuous-distributions'],
  ['math.prob.quantile', M.buildQuantileScene, 'math-quantile'],
  ['math.prob.variance', M.buildVarianceScene, 'math-variance'],
  ['math.prob.standard-deviation', M.buildStandardDeviationScene, 'math-standard-deviation'],
  ['math.prob.joint-distribution', M.buildJointDistributionScene, 'math-joint-distribution'],
  ['math.prob.marginal-distribution', M.buildMarginalDistributionScene, 'math-marginal-distribution'],
  ['math.prob.conditional-distribution', M.buildConditionalDistributionScene, 'math-conditional-distribution'],
  ['math.prob.lln', M.buildLawOfLargeNumbersScene, 'math-lln'],
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

describe('the probability helpers are right', () => {
  it('the normal CDF matches the tabulated values', () => {
    expect(M.phi(0)).toBeCloseTo(0.5, 7); expect(M.phi(1)).toBeCloseTo(0.8413447, 5); expect(M.phi(1.96)).toBeCloseTo(0.9750021, 5); expect(M.phi(-2)).toBeCloseTo(0.0227501, 5)
    expect(M.phi(1) - M.phi(-1)).toBeCloseTo(0.6826895, 5); expect(M.phi(2) - M.phi(-2)).toBeCloseTo(0.9544997, 5)
    expect(M.normPdf(0)).toBeCloseTo(1 / Math.sqrt(2 * Math.PI), 12); expect(M.normPdf(170, 170, 10)).toBeCloseTo(0.0398942, 6)
  })
  it('the quantile inverts the CDF, and the quartiles are symmetric about the median 0', () => {
    expect(M.normalQuantile(0.5)).toBeCloseTo(0, 6); expect(M.normalQuantile(0.75)).toBeCloseTo(0.6744898, 4); expect(M.normalQuantile(0.25)).toBeCloseTo(-0.6744898, 4)
    for (const p of [0.01, 0.2, 0.9]) expect(M.phi(M.normalQuantile(p))).toBeCloseTo(p, 6)
  })
  it('binomial probabilities match n!/(k!(n-k)!) p^k q^(n-k) and sum to 1', () => {
    for (const p of [0.5, 0.2]) {
      const ps = [0, 1, 2, 3, 4, 5].map((k) => M.binomialPmf(5, p, k))
      ps.forEach((v, k) => expect(v).toBeCloseTo(binom(5, k) * p ** k * (1 - p) ** (5 - k), 12))
      expect(sum(ps)).toBeCloseTo(1, 12)
    }
    expect([0, 1, 2, 3, 4, 5].map((k) => M.choose(5, k))).toEqual([1, 5, 10, 10, 5, 1])
  })
})

describe('the mathematics each figure draws', () => {
  it('Event: the ellipse for "even" contains exactly the faces 2, 4, 6 (3 of 6 = 1/2); "more than 4" contains exactly 5, 6 (2 of 6 = 1/3); their overlap is {6}', () => {
    const s = M.buildEventScene()
    const faces = dots(s, SLATE)
    expect(faces).toHaveLength(6)
    const digit = (d: Obj) => Number(labelsOf(s).filter((l) => /^[1-6]$/.test(l.text!)).sort((a, b) => Math.hypot(a.position![0] - d.position![0], a.position![1] - d.position![1]) - Math.hypot(b.position![0] - d.position![0], b.position![1] - d.position![1]))[0].text)
    const face = new Map(faces.map((d) => [digit(d), d.position!]))
    expect([...face.keys()].sort()).toEqual([1, 2, 3, 4, 5, 6])
    const fit = (ps: number[][]) => { const xs = ps.map((p) => p[0]), ys = ps.map((p) => p[1]); return { cx: (Math.max(...xs) + Math.min(...xs)) / 2, cy: (Math.max(...ys) + Math.min(...ys)) / 2, rx: (Math.max(...xs) - Math.min(...xs)) / 2, ry: (Math.max(...ys) - Math.min(...ys)) / 2 } }
    const inside = (e: ReturnType<typeof fit>, p: number[]) => ((p[0] - e.cx) / e.rx) ** 2 + ((p[1] - e.cy) / e.ry) ** 2 < 1
    const eA = fit(paths(s, BLUE)[0].points!), eB = fit(paths(s, RED)[0].points!)
    const inA = [...face].filter(([, p]) => inside(eA, p)).map(([n]) => n).sort(), inB = [...face].filter(([, p]) => inside(eB, p)).map(([n]) => n).sort()
    expect(inA).toEqual([2, 4, 6]); expect(inB).toEqual([5, 6])
    expect(inA.filter((n) => inB.includes(n))).toEqual([6])
    for (const n of inA) expect(n % 2).toBe(0)                                                                                     // every outcome in A is even
    expect(inA.length / 6).toBe(0.5); expect(inB.length / 6).toBeCloseTo(1 / 3, 12)
    expect(M.EVENT.A.length / 6).toBe(0.5); expect(M.EVENT.B.length / 6).toBeCloseTo(1 / 3, 12)
    expect(texts(s)).toEqual(expect.arrayContaining(['P(A) = 3/6 = 1/2', 'P(B) = 2/6 = 1/3', 'A ∩ B = {6}']))
  })

  it('Total probability: columns of width 0.5, 0.3, 0.2 (a partition) shaded to heights 0.1, 0.4, 0.5; the shaded area is 0.05 + 0.12 + 0.10 = 0.27', () => {
    const { W, H, pb, pab } = M.TOTAL
    expect(sum([...pb])).toBeCloseTo(1, 12)
    expect(M.totalProbability(pb, pab)).toBeCloseTo(0.27, 12)
    const s = M.buildTotalProbabilityScene()
    const rects = (color: string) => { const bs = bonds(s, color, 0.04), out: Array<{ w: number; h: number }> = []; for (let i = 0; i < bs.length; i += 4) out.push({ w: len(bs[i]), h: len(bs[i + 1]) }); return out }
    const cols = rects(SLATE), shaded = rects(BLUE)
    expect(cols).toHaveLength(3); expect(shaded).toHaveLength(3)
    cols.forEach((c, i) => { expect(c.h).toBeCloseTo(H, 1); expect(c.w / W).toBeCloseTo(pb[i], 2) })                                // widths are P(Bi)
    expect(sum(cols.map((c) => c.w))).toBeCloseTo(W, 1)                                                                            // they tile the whole box
    shaded.forEach((r, i) => { expect(r.w).toBeCloseTo(cols[i].w, 2); expect(r.h / H).toBeCloseTo(pab[i], 2) })                    // heights are P(A | Bi)
    const area = sum(shaded.map((r) => r.w * r.h)) / (W * H)
    expect(area).toBeCloseTo(0.27, 2)
    expect(shaded.map((r) => Math.round((r.w * r.h * 100) / (W * H)) / 100)).toEqual([0.05, 0.12, 0.1])
    expect(texts(s)).toEqual(expect.arrayContaining(['P(A) = 0.5·0.1 + 0.3·0.4 + 0.2·0.5 = 0.27']))
  })

  it('Distribution: bars 1/4, 1/2, 1/4 (sum 1) and the CDF steps 0, 1/4, 3/4, 1 are its running total; the jump at 1 equals the bar at 1', () => {
    const { xs, pmf, sx, syPmf, syCdf, oxL, oxR, oy } = M.DIST
    expect(sum([...pmf])).toBe(1)
    expect([M.cdfAt(-1), M.cdfAt(0), M.cdfAt(1), M.cdfAt(2)]).toEqual([0, 0.25, 0.75, 1])
    const s = M.buildDistributionScene()
    const bars = bonds(s, BLUE, 0.4).sort(byX)
    expect(bars).toHaveLength(3)
    bars.forEach((b, i) => { expect(b.from![0]).toBeCloseTo(oxL + xs[i] * sx, 2); expect(vertical(b)).toBe(true); expect(len(b) / syPmf).toBeCloseTo(pmf[i], 2) })
    expect(sum(bars.map((b) => len(b) / syPmf))).toBeCloseTo(1, 2)
    const steps = bonds(s, GREEN, 0.05).sort(byX)
    expect(steps).toHaveLength(4)
    for (const st of steps) {
      expect(horizontal(st)).toBe(true)
      const a = (st.from![0] - oxR) / sx, b = (st.to![0] - oxR) / sx, level = (st.from![1] - oy) / syCdf
      expect(level).toBeCloseTo(M.cdfAt((a + b) / 2), 2)                                                                            // each level is F on that interval
    }
    expect(steps.map((st) => Math.round(((st.from![1] - oy) / syCdf) * 100) / 100)).toEqual([0, 0.25, 0.75, 1])
    for (const d of dots(s, GREEN)) expect((d.position![1] - oy) / syCdf).toBeCloseTo(M.cdfAt(Math.round((d.position![0] - oxR) / sx)), 2)   // closed dots sit on the value that counts
    expect(dots(s, GREEN)).toHaveLength(3)
    const jump = bonds(s, VIOLET, 0.08)[0]
    expect(len(jump) / syCdf).toBeCloseTo(pmf[1], 2); expect(len(jump) / syCdf).toBeCloseTo(M.cdfAt(1) - M.cdfAt(0), 2)         // F(1) - F(0) = P(1)
    expect(len(bars[1]) / syPmf).toBeCloseTo(len(jump) / syCdf, 2)
    expect(texts(s)).toEqual(expect.arrayContaining(['1/4', '1/2', 'P(X = x)', 'F(x) = P(X ≤ x)']))
  })

  it('Discrete distributions: Bernoulli(1/2) bars of 0.5; Bin(5, 1/2) bars 1, 5, 10, 10, 5, 1 over 32; Bin(5, 0.2) bars match the formula (mean 1)', () => {
    const { n, sx, sy, bernoulliX, bernoulliGap, binX0, offset, wBern, wBin } = M.DISC
    const s = M.buildDiscreteDistributionsScene()
    const bern = bonds(s, BLUE, wBern).sort(byX)
    expect(bern.map((b) => len(b) / sy)).toEqual([0.5, 0.5].map((v) => expect.closeTo(v, 2)))
    expect(bern.map((b) => b.from![0])).toEqual([bernoulliX, bernoulliX + bernoulliGap].map((v) => expect.closeTo(v, 2)))
    const half = bonds(s, BLUE, wBin).sort(byX)
    expect(half).toHaveLength(6)
    half.forEach((b, k) => { expect(b.from![0]).toBeCloseTo(binX0 + k * sx - offset, 2); expect(Math.round((len(b) / sy) * 32 * 100) / 100).toBeCloseTo(binom(5, k), 1) })   // C(5,k)/32
    expect(sum(half.map((b) => len(b) / sy))).toBeCloseTo(1, 2)
    expect(sum(half.map((b, k) => k * (len(b) / sy)))).toBeCloseTo(n * 0.5, 2)                                                       // mean np = 2.5
    const red = bonds(s, RED, wBin).sort(byX), tiny = dots(s, RED).sort(byX)
    expect(red).toHaveLength(4); expect(tiny).toHaveLength(2)                                                                          // bars for k = 0..3, a dot for the near-zero k = 4, 5
    red.forEach((b, k) => { expect(b.from![0]).toBeCloseTo(binX0 + k * sx + offset, 2); expect(len(b) / sy).toBeCloseTo(binom(5, k) * 0.2 ** k * 0.8 ** (5 - k), 2) })
    tiny.forEach((d, i) => { expect(d.position![0]).toBeCloseTo(binX0 + (i + 4) * sx + offset, 2); expect(binom(5, i + 4) * 0.2 ** (i + 4) * 0.8 ** (1 - i)).toBeLessThan(0.01) })
    const drawnMean = sum(red.map((b, k) => k * (len(b) / sy)))
    expect(drawnMean).toBeCloseTo(0.9728, 1)                                                                                         // 0.4096 + 2(0.2048) + 3(0.0512)
    expect(drawnMean + 4 * M.binomialPmf(5, 0.2, 4) + 5 * M.binomialPmf(5, 0.2, 5)).toBeCloseTo(5 * 0.2, 1)                           // with the two near-zero bars the mean is np = 1
    expect(texts(s)).toEqual(expect.arrayContaining(['Bernoulli (1/2)', 'Bin(5, 1/2): heads in 5 flips', 'Bin(5, 0.2)']))
  })

  it('Continuous distributions: the hatched areas are 0.40 (uniform 0.2 to 0.6), 0.38 (exponential 0.5 to 1.5) and 0.68 (normal within 1 sd)', () => {
    const { centres, oy, sy, steps } = M.CONTD
    const s = M.buildContinuousDistributionsScene()
    const hatch = bonds(s, BLUE, 0.022).filter(vertical)
    const U = hatch.filter((o) => o.from![0] < -1.7), E = hatch.filter((o) => Math.abs(o.from![0]) <= 1.7), N = hatch.filter((o) => o.from![0] > 1.7)
    expect(hatched(U, sy[0], steps[0])).toBeCloseTo(0.6 - 0.2, 6)                                                                   // flat density 1 over a width of 0.4
    expect(Math.abs(hatched(E, sy[1], steps[1]) - (Math.exp(-0.5) - Math.exp(-1.5)))).toBeLessThan(0.01)
    expect(Math.abs(hatched(N, sy[2], steps[2]) - (M.phi(1) - M.phi(-1)))).toBeLessThan(0.01)
    expect([U.length, E.length, N.length]).toEqual([8, 20, 20])                                                                      // the strips tile each interval exactly
    // each hatch line stands at its density: height / scale = f(x)
    for (const o of E) { const x = (o.from![0] - centres[1]) / 0.85 + 1.2; expect(len(o) / sy[1]).toBeCloseTo(Math.exp(-x), 1) }
    for (const o of N) { const x = (o.from![0] - centres[2]) / 0.45; expect(len(o) / sy[2]).toBeCloseTo(M.normPdf(x), 1) }
    for (const o of U) expect(len(o) / sy[0]).toBeCloseTo(1, 2)
    // the three printed values are those areas
    expect([Math.round(0.4 * 100) / 100, Math.round((Math.exp(-0.5) - Math.exp(-1.5)) * 100) / 100, Math.round((M.phi(1) - M.phi(-1)) * 100) / 100]).toEqual([0.4, 0.38, 0.68])
    expect(texts(s)).toEqual(expect.arrayContaining(['0.40', '0.38', '0.68', 'uniform', 'exponential', 'normal']))
    // the density curves are the real ones: exponential e^-x and the normal bell
    const expCurve = paths(s, INK).find((p) => p.points![0][0] > -1.7 && p.points![0][0] < 1.7)!
    for (const p of expCurve.points!) { const x = (p[0] - centres[1]) / 0.85 + 1.2, y = (p[1] - oy) / sy[1]; expect(Math.abs(y - Math.exp(-x))).toBeLessThan(0.02) }
    const bell = paths(s, INK).find((p) => p.points![0][0] > 1.7)!
    for (const p of bell.points!) { const x = (p[0] - centres[2]) / 0.45, y = (p[1] - oy) / sy[2]; expect(Math.abs(y - M.normPdf(x))).toBeLessThan(0.02) }
  })

  it('Quantile: the CDF curve is Φ; reading across from p = 0.5, 0.25, 0.75 and down lands at −0.67 ... 0 ... 0.67 and Φ of each landing equals p', () => {
    const { sx, sy, oy } = M.QUANT
    const s = M.buildQuantileScene()
    for (const p of paths(s, INK)[0].points!) { const x = p[0] / sx, y = (p[1] - oy) / sy; expect(Math.abs(y - M.phi(x))).toBeLessThan(0.01) }
    const probe = (color: string, p: number) => {
      const gs = bonds(s, color, 0.025)
      const across = gs.find(horizontal)!, down = gs.find(vertical)!
      expect((across.from![1] - oy) / sy).toBeCloseTo(p, 2)                                                                          // read across at height p
      const x = down.from![0] / sx
      expect(across.to![0] / sx).toBeCloseTo(x, 1)                                                                                   // ... to the curve, then straight down
      expect(M.phi(x)).toBeCloseTo(p, 1)                                                                                             // F(x_p) = p
      expect(down.to![1]).toBeCloseTo(oy, 2)                                                                                         // lands on the axis
      return x
    }
    const xm = probe(GREEN, 0.5), xq1 = probe(RED, 0.25), xq3 = probe(BLUE, 0.75)
    expect(xm).toBeCloseTo(0, 1); expect(xq1).toBeCloseTo(-0.67, 1); expect(xq3).toBeCloseTo(0.67, 1)
    expect(xq1).toBeCloseTo(-xq3, 1)                                                                                                 // quartiles are symmetric about the median
    expect(M.QUANT.ps).toEqual([0.5, 0.25, 0.75])
    expect(texts(s)).toEqual(expect.arrayContaining(['p = 0.5: median = 0', 'Q₁ ≈ −0.67', 'Q₃ ≈ 0.67', 'F(x)']))
  })

  it('Variance: data 2, 4, 4, 4, 5, 5, 7, 9 have mean 5; the squares on the distances have areas 9, 1, 1, 1, 4, 16 (total 32); variance 32 ÷ 8 = 4, standard deviation 2', () => {
    const { data, u, ox, sq } = M.VAR
    expect(M.meanOf(data)).toBe(5); expect(M.varianceOf(data)).toBe(4); expect(Math.sqrt(M.varianceOf(data))).toBe(2)
    expect(sum(data.map((x) => (x - 5) ** 2))).toBe(32)
    const s = M.buildVarianceScene()
    const drawn = dots(s, BLUE).map((d) => Math.round((d.position![0] - ox) / u)).sort((a, b) => a - b)
    expect(drawn).toEqual([...data].sort((a, b) => a - b))                                                                          // the dots are the data
    const meanLine = bonds(s, GREEN, 0.05)[0]; expect((meanLine.from![0] - ox) / u).toBeCloseTo(5, 1)
    const sides = bonds(s, RED, 0.04); const areas: number[] = []
    for (let i = 0; i < sides.length; i += 4) { const side = len(sides[i]) / sq; expect(len(sides[i + 1]) / sq).toBeCloseTo(side, 1); areas.push(Math.round(side * side)) }   // squares
    expect(areas.sort((a, b) => a - b)).toEqual([1, 1, 1, 4, 9, 16])
    expect(sum(areas)).toBe(32); expect(sum(areas) / data.length).toBe(4)
    expect(texts(s)).toEqual(expect.arrayContaining(['mean 5', 'squares of the distances', 'variance = (9 + 1 + 1 + 1 + 0 + 0 + 4 + 16) ÷ 8 = 4']))
  })

  it('Standard deviation: the bell is N(170, 10²) in cm; the hatch holds 0.683 within 1σ (160–180) and 0.954 within 2σ (150–190)', () => {
    const { sd, u, yScale, oy } = M.SD
    expect(sd).toBe(10)
    const s = M.buildStandardDeviationScene()
    for (const p of paths(s, INK)[0].points!) { const t = p[0] / u, y = (p[1] - oy) / yScale; expect(Math.abs(y - M.normPdf(t, 0, 10))).toBeLessThan(0.0005) }
    const inner = bonds(s, BLUE, 0.022).filter(vertical), outer = bonds(s, VIOLET, 0.022).filter(vertical)
    for (const o of inner) expect(Math.abs(o.from![0] / u)).toBeLessThan(10)
    for (const o of outer) { const t = Math.abs(o.from![0] / u); expect(t).toBeGreaterThan(10); expect(t).toBeLessThan(20) }
    const one = hatched(inner, yScale, 1), two = one + hatched(outer, yScale, 1)
    expect(one).toBeCloseTo(0.6827, 2); expect(two).toBeCloseTo(0.9545, 2)
    for (const o of [...inner, ...outer]) expect(len(o) / yScale).toBeCloseTo(M.normPdf(o.from![0] / u, 0, 10), 2)                  // each line stands at the density
    expect(texts(s)).toEqual(expect.arrayContaining(['mean 170 cm', '160', '180', '150', '190', '68% within 1σ', '95% within 2σ']))
  })

  it('Joint distribution: dot AREAS are .4, .1, .2, .3 in the right cells and add to 1', () => {
    const c = M.JOINT.cell
    const s = M.buildJointDistributionScene()
    const cells = dots(s, BLUE)
    expect(cells).toHaveLength(4)
    const got: Record<string, number> = {}
    for (const d of cells) {
      expect(Math.abs(d.position![0])).toBeCloseTo(c / 2, 2); expect(Math.abs(d.position![1])).toBeCloseTo(c / 2, 2)                  // at a cell centre
      got[`${d.position![0] > 0 ? 1 : 0},${d.position![1] > 0 ? 1 : 0}`] = (d.radius! / 0.5) ** 2 * 0.4                              // area -> probability
    }
    for (const [k, p] of Object.entries(M.JOINT.p)) expect(got[k]).toBeCloseTo(p, 2)
    expect(sum(Object.values(got))).toBeCloseTo(1, 2)
    expect(sum(Object.values(M.JOINT.p))).toBeCloseTo(1, 12)
    // every probability is written inside its own cell, under its dot
    for (const [k, p] of Object.entries(M.JOINT.p)) {
      const [x, y] = k.split(',').map(Number), cx = (x - 0.5) * c, cy = (y - 0.5) * c
      const lab = labelsOf(s).find((l) => l.text === `.${Math.round(p * 10)}` && near(l.position![0], cx, 0.01) && l.position![1] < cy && l.position![1] > cy - c / 2)
      expect(lab, `label for p(${k})`).toBeTruthy()
    }
    const halo = paths(s, GREEN)[0].points!, hx = halo.map((p) => p[0]), hy = halo.map((p) => p[1])                                      // p(1, 1) is picked out by a ring
    const cx = (Math.max(...hx) + Math.min(...hx)) / 2, cy = (Math.max(...hy) + Math.min(...hy)) / 2, hr = (Math.max(...hx) - Math.min(...hx)) / 2
    expect(cx).toBeCloseTo(c / 2, 1); expect(cy).toBeCloseTo(c / 2, 1)
    expect(hr).toBeGreaterThan(M.dotRadius(0.3)); expect(hr).toBeLessThan(c / 2)                                                      // it surrounds the dot and stays inside the cell
    expect(texts(s)).toEqual(expect.arrayContaining(['.4 + .1 + .2 + .3 = 1', 'X', 'Y']))
  })

  it('Marginal distribution: column totals .5 and .5 (X), row totals .6 and .4 (Y), read from the drawn dots; and p(0,0) = .4 ≠ .5 × .6, so X and Y are dependent', () => {
    const { ox, oy, k } = M.MARGINAL
    const s = M.buildMarginalDistributionScene()
    const p: Record<string, number> = {}
    for (const d of dots(s, SLATE)) p[`${d.position![0] > ox ? 1 : 0},${d.position![1] > oy ? 1 : 0}`] = (d.radius! / 0.5) ** 2 * 0.4
    const colX = [0, 1].map((x) => p[`${x},0`] + p[`${x},1`]), rowY = [0, 1].map((y) => p[`0,${y}`] + p[`1,${y}`])
    const colBars = bonds(s, BLUE, 0.3).filter(vertical).sort(byX), rowBars = bonds(s, RED, 0.3).filter(horizontal).sort((a, b) => a.from![1] - b.from![1])
    expect(colBars).toHaveLength(2); expect(rowBars).toHaveLength(2)
    colBars.forEach((b, x) => { expect(len(b) / k).toBeCloseTo(colX[x], 2); expect(len(b) / k).toBeCloseTo(M.marginalX(x), 2) })       // the drawn bars are the column sums
    rowBars.forEach((b, y) => { expect(len(b) / k).toBeCloseTo(rowY[y], 2); expect(len(b) / k).toBeCloseTo(M.marginalY(y), 2) })       // ... and the row sums
    expect(colX.map((v) => Math.round(v * 10) / 10)).toEqual([0.5, 0.5]); expect(rowY.map((v) => Math.round(v * 10) / 10)).toEqual([0.6, 0.4])
    expect(sum(colX)).toBeCloseTo(1, 2); expect(sum(rowY)).toBeCloseTo(1, 2)
    expect(p['0,0']).toBeCloseTo(0.4, 2); expect(colX[0] * rowY[0]).toBeCloseTo(0.3, 2)
    expect(Math.abs(p['0,0'] - colX[0] * rowY[0])).toBeGreaterThan(0.05)                                                             // not independent
    expect(M.jointP(0, 0)).not.toBeCloseTo(M.marginalX(0) * M.marginalY(0), 3)
    expect(texts(s)).toEqual(expect.arrayContaining(['.4 ≠ .5 × .6 = .30: dependent']))
  })

  it('Conditional distribution: the X = 1 slice (.2, .3; total .5) rescaled is P(Y | X = 1) = .4, .6, which adds to 1', () => {
    const { ox, resultX } = M.CONDITIONAL
    const c = M.JOINT.cell
    const s = M.buildConditionalDistributionScene()
    const grey: Record<string, number> = {}
    for (const d of dots(s, SLATE)) grey[`${d.position![0] > ox ? 1 : 0},${d.position![1] > 0 ? 1 : 0}`] = (d.radius! / 0.5) ** 2 * 0.4
    const slice = [grey['1,0'], grey['1,1']]
    expect(slice.map((v) => Math.round(v * 10) / 10)).toEqual([0.2, 0.3])
    expect(sum(slice)).toBeCloseTo(0.5, 2)
    // the highlighted box is the X = 1 column: it holds the two X = 1 dots and neither X = 0 dot
    const box = bonds(s, BLUE, 0.07)
    expect(box).toHaveLength(4)
    const xs = box.flatMap((b) => [b.from![0], b.to![0]]), ys = box.flatMap((b) => [b.from![1], b.to![1]])
    expect(Math.min(...xs)).toBeCloseTo(ox, 2); expect(Math.max(...xs)).toBeCloseTo(ox + c, 2); expect(Math.min(...ys)).toBeCloseTo(-c, 2); expect(Math.max(...ys)).toBeCloseTo(c, 2)
    for (const d of dots(s, SLATE)) expect(d.position![0] > Math.min(...xs) && d.position![0] < Math.max(...xs)).toBe(d.position![0] > ox)
    // the rescaled result
    const result = dots(s, GREEN).sort((a, b) => a.position![1] - b.position![1])
    expect(result).toHaveLength(2)
    const cond = result.map((d) => (d.radius! / 0.5) ** 2 * 0.4)
    expect(cond[0]).toBeCloseTo(slice[0] / sum(slice), 2); expect(cond[1]).toBeCloseTo(slice[1] / sum(slice), 2)                     // divide by the slice total
    expect(cond.map((v) => Math.round(v * 10) / 10)).toEqual([0.4, 0.6]); expect(sum(cond)).toBeCloseTo(1, 2)
    expect(M.conditionalYgivenX(0, 1)).toBeCloseTo(0.4, 12); expect(M.conditionalYgivenX(1, 1)).toBeCloseTo(0.6, 12)
    for (const d of result) expect(d.position![0]).toBeCloseTo(resultX, 2)
    expect(texts(s)).toEqual(expect.arrayContaining(['X = 1 slice: total .5', 'each ÷ P(X = 1) = .5', 'P(Y | X = 1)', 'Y = 1: .6', 'Y = 0: .4']))
  })

  it('Law of large numbers: the three curves are the running proportion of one fixed run of 60 flips; the run opens with a wide swing, ends at 32/60 and stays inside the 1/2 ± 1/√n band', () => {
    const { u, sy, oy, ox, flips } = M.LLN
    const run = M.flipSequence()
    expect(run).toHaveLength(flips)
    for (const f of run) expect([0, 1]).toContain(f)
    expect(M.flipSequence()).toEqual(run)                                                                                            // deterministic: the same figure every time
    const heads = sum(run)
    expect(heads).toBe(32); expect(heads).toBeGreaterThanOrEqual(24); expect(heads).toBeLessThanOrEqual(36)                          // a fair-looking run, not a rigged one
    const prop = (n: number) => sum(run.slice(0, n)) / n
    expect(prop(1)).toBe(0); expect(prop(60)).toBeCloseTo(32 / 60, 12); expect(M.runningProportion(60)).toBeCloseTo(32 / 60, 12)
    const s = M.buildLawOfLargeNumbersScene()
    const pieces = [paths(s, RED)[0], paths(s, BLUE)[0], paths(s, GREEN)[0]]
    const ends = pieces.map((c) => [Math.round((c.points![0][0] - ox) / u), Math.round((c.points![c.points!.length - 1][0] - ox) / u)])
    expect(ends).toEqual([[1, 10], [10, 30], [30, 60]])                                                                              // one continuous run in three stages
    for (const c of pieces) for (const p of c.points!) { const n = Math.round((p[0] - ox) / u); expect((p[1] - oy) / sy).toBeCloseTo(prop(n), 1) }
    // the early swing is wide and the band narrows
    expect(Math.max(...[1, 2, 3, 4, 5, 6, 7, 8].map((n) => Math.abs(prop(n) - 0.5)))).toBeGreaterThanOrEqual(0.3)
    const band = paths(s, VIOLET)
    expect(band).toHaveLength(2)
    for (const b of band) for (const p of b.points!) { const n = Math.round((p[0] - ox) / u); expect(Math.abs((p[1] - oy) / sy - 0.5)).toBeCloseTo(1 / Math.sqrt(n), 1) }
    for (let n = 4; n <= 60; n++) expect(Math.abs(prop(n) - 0.5), `n = ${n}`).toBeLessThanOrEqual(1 / Math.sqrt(n))                   // inside the band
    expect(M.bandHalfWidth(4)).toBe(0.5); expect(M.bandHalfWidth(16)).toBe(0.25)                                                      // the band narrows as 1/√n
    expect(texts(s)).toEqual(expect.arrayContaining(['proportion of heads', '10 flips', '30 flips', '60 flips', '0.5']))
  })
})
