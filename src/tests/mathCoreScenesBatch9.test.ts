/**
 * Mathematics visual campaign, batch 9 (2026-10-12): the last essential probability concepts and
 * the first statistics ones. Each test checks the MATHEMATICS the figure draws — the drawn
 * coordinates are mapped back to data / probabilities and compared with an independent
 * calculation — not just that a figure exists.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB9'
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
const sorted = (xs: readonly number[]) => [...xs].sort((a, b) => a - b)
/** Chunk the bonds of closed polygons drawn with polyLines (4 bonds per rectangle). */
const chunks = (bs: Obj[], size: number) => { const out: Obj[][] = []; for (let i = 0; i < bs.length; i += size) out.push(bs.slice(i, i + size)); return out }
/** Area a set of vertical hatch lines stands for: sum of (length / unit) x step. */
const hatched = (ls: Obj[], unitY: number, step: number) => ls.reduce((s, o) => s + (len(o) / unitY) * step, 0)
/** Pearson r by the textbook computational formula (a different route from the module's). */
const rOf = (x: readonly number[], y: readonly number[]) => {
  const n = x.length, sx = sum(x), sy = sum(y), sxy = sum(x.map((v, i) => v * y[i])), sxx = sum(x.map((v) => v * v)), syy = sum(y.map((v) => v * v))
  return (n * sxy - sx * sy) / Math.sqrt((n * sxx - sx * sx) * (n * syy - sy * sy))
}

const BATCH: Array<[string, () => SceneSpec, string]> = [
  ['math.prob.markov-chain', M.buildMarkovChainScene, 'math-markov-chain'],
  ['math.prob.covariance', M.buildCovarianceScene, 'math-covariance'],
  ['math.prob.correlation', M.buildCorrelationScene, 'math-correlation'],
  ['math.stats.descriptive-statistics', M.buildDescriptiveStatisticsScene, 'math-descriptive-statistics'],
  ['math.stats.measures-of-center', M.buildMeasuresOfCenterScene, 'math-measures-of-center'],
  ['math.stats.measures-of-spread', M.buildMeasuresOfSpreadScene, 'math-measures-of-spread'],
  ['math.stats.percentile', M.buildPercentileScene, 'math-percentile'],
  ['math.stats.sampling-distribution', M.buildSamplingDistributionScene, 'math-sampling-distribution'],
  ['math.stats.confidence-interval', M.buildConfidenceIntervalScene, 'math-confidence-interval'],
  ['math.stats.ci-mean', M.buildCiMeanScene, 'math-ci-mean'],
  ['math.stats.ci-proportion', M.buildCiProportionScene, 'math-ci-proportion'],
  ['math.stats.hypothesis-testing', M.buildHypothesisTestingScene, 'math-hypothesis-testing'],
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

describe('the statistics helpers are right', () => {
  it('Pearson r and covariance match the textbook formulas, and Cov = E[XY] − E[X]E[Y]', () => {
    const x = [1, 2, 3, 4, 5, 6], y = [2, 1, 4, 3, 6, 5]
    expect(M.pearson(x, y)).toBeCloseTo(rOf(x, y), 12)
    expect(M.covOf(x, y)).toBeCloseTo(mean(x.map((v, i) => v * y[i])) - mean(x) * mean(y), 12)
    expect(M.covOf(x, y)).toBeCloseTo(29 / 12, 12)
    expect(M.pearson(x, x.map((v) => 3 * v + 2))).toBeCloseTo(1, 12); expect(M.pearson(x, x.map((v) => -v))).toBeCloseTo(-1, 12)
  })
  it('the five-number summary uses the median-of-halves rule', () => {
    expect(M.fiveNumber([2, 3, 3, 4, 4, 4, 5, 5, 6, 7, 9])).toEqual({ min: 2, q1: 3, median: 4, q3: 6, max: 9 })
    expect(M.fiveNumber([1, 2, 3, 4])).toEqual({ min: 1, q1: 1.5, median: 2.5, q3: 3.5, max: 4 })
  })
  it('sample variance divides by n − 1, and percentile cuts fall between the ranked values', () => {
    expect(M.sampleVariance([2, 4, 4, 4, 5, 5, 7, 9])).toBeCloseTo(32 / 7, 12)
    const d = M.PCT.data
    expect([10, 25, 50, 75, 90].map((p) => M.percentileCut(d, p))).toEqual([16.5, 25, 36.5, 48.5, 56.5])
    for (const p of [10, 25, 50, 75, 90]) expect(d.filter((v) => v < M.percentileCut(d, p)).length).toBe((d.length * p) / 100)
  })
  it('the Student t critical value 2.262 holds 95% of the t density with 9 degrees of freedom', () => {
    const c = Math.exp(Math.log(24) - Math.log(Math.sqrt(9 * Math.PI)) - Math.log(3.5 * 2.5 * 1.5 * 0.5 * Math.sqrt(Math.PI)))     // Γ(5) / (√(9π) Γ(4.5))
    const pdf = (x: number) => c * (1 + (x * x) / 9) ** -5
    let s = 0; const n = 20000, a = -2.262, dx = (2 * 2.262) / n
    for (let i = 0; i < n; i++) s += pdf(a + (i + 0.5) * dx) * dx
    expect(s).toBeCloseTo(0.95, 3)
    expect(phi(1.96) - phi(-1.96)).toBeCloseTo(0.95, 3)                                                                                  // and z = 1.96 holds 95% of the normal
  })
})

describe('the mathematics each figure draws', () => {
  it('Markov chain: rows of T add to 1; P(Sunny) after 0, 1, 2, 3 steps is 1, .8, .72, .688 and tends to the stationary 2/3, drawn as stacked bars', () => {
    const { T, colX, H, w, base } = M.MARKOV
    for (const row of T) expect(sum(row)).toBeCloseTo(1, 12)
    expect([0, 1, 2, 3].map((n) => M.markovAfter(n)[0])).toEqual([1, 0.8, 0.72, 0.688].map((v) => expect.closeTo(v, 12)))
    const st = M.markovStationary()
    expect(st[0]).toBeCloseTo(2 / 3, 12); expect(st[1]).toBeCloseTo(1 / 3, 12)
    expect(st[0] * T[0][0] + st[1] * T[1][0]).toBeCloseTo(st[0], 12); expect(st[0] * T[0][1] + st[1] * T[1][1]).toBeCloseTo(st[1], 12)   // πT = π
    let p = [0.3, 0.7]; for (let i = 0; i < 200; i++) p = M.markovNext(p)
    expect(p[0]).toBeCloseTo(2 / 3, 9)                                                                                                   // the limit does not depend on the start
    const s = M.buildMarkovChainScene()
    const sunny = bonds(s, BLUE, w).sort(byX), rainy = bonds(s, RED, w).sort(byX)
    expect(sunny).toHaveLength(5); expect(rainy).toHaveLength(4)                                                                         // no Rainy part when P(Sunny) = 1
    const expected = [1, 0.8, 0.72, 0.688, 2 / 3]
    sunny.forEach((b, i) => { expect(b.from![0]).toBeCloseTo(colX[i], 2); expect(len(b) / H).toBeCloseTo(expected[i], 2); expect(b.from![1]).toBeCloseTo(base, 2) })
    rainy.forEach((b, i) => { expect(len(b) / H).toBeCloseTo(1 - expected[i + 1], 2); expect(b.from![1]).toBeCloseTo(base + expected[i + 1] * H, 1) })
    expect(rainy.map((b) => b.from![0])).toEqual(colX.slice(1).map((v) => expect.closeTo(v, 2)))
    // the graph: Sunny (blue) and Rainy (red) nodes, each with its outgoing probabilities in its own colour
    const [a, b] = [dots(s, BLUE)[0], dots(s, RED)[0]]
    expect(a.position![0]).toBeLessThan(b.position![0])
    const out = (color: string) => labelsOf(s).filter((l) => l.color === color && /^\.\d$/.test(l.text!)).map((l) => l.text).sort()
    expect(out(BLUE)).toEqual(['.2', '.8']); expect(out(RED)).toEqual(['.4', '.6'])                                                       // T[Sunny] = (.8, .2), T[Rainy] = (.4, .6)
    const toRainy = arrows(s, BLUE)[0], toSunny = arrows(s, RED)[0]
    expect(toRainy.to![0]).toBeGreaterThan(toRainy.from![0]); expect(toSunny.to![0]).toBeLessThan(toSunny.from![0])                      // S→R points right, R→S points left
    expect(texts(s)).toEqual(expect.arrayContaining(['Sunny', 'Rainy', 'after n steps', 'long run: 2/3 sunny']))
  })

  it('Covariance: the signed rectangle areas are +3.75 ×4 and −0.25 ×2, total 14.5, mean 2.42; flipping y flips every sign', () => {
    const { x, y, u, cx } = M.COV
    expect(M.covOf(x, y)).toBeCloseTo(14.5 / 6, 12); expect(M.covOf(x, M.flipY(y))).toBeCloseTo(-14.5 / 6, 12)
    expect(mean(x)).toBe(3.5); expect(mean(y)).toBe(3.5); expect(mean(M.flipY(y))).toBe(3.5)
    const s = M.buildCovarianceScene()
    const areas = (color: string, side: 'L' | 'R') => chunks(bonds(s, color, 0.035).filter((b) => (side === 'L' ? b.from![0] < 0 && b.to![0] < 0 : b.from![0] > 0 && b.to![0] > 0)), 4).map((c) => (len(c[0]) / u) * (len(c[1]) / u))
    const posL = areas(BLUE, 'L'), negL = areas(RED, 'L'), posR = areas(BLUE, 'R'), negR = areas(RED, 'R')
    expect(posL.map((v) => Math.round(v * 100) / 100)).toEqual([3.75, 3.75, 3.75, 3.75]); expect(negL.map((v) => Math.round(v * 100) / 100)).toEqual([0.25, 0.25])
    expect((sum(posL) - sum(negL)) / x.length).toBeCloseTo(2.4167, 2)
    expect(sum(posR) - sum(negR)).toBeCloseTo(-14.5, 1); expect(posR.length).toBe(2); expect(negR.length).toBe(4)                        // every sign reversed
    // the dots are the data, and each panel's mean lines cross at that panel's centre
    for (const [k, ys] of [[0, y], [1, M.flipY(y)]] as Array<[number, readonly number[]]>) {
      const pts = dots(s, INK).filter((d) => (k === 0 ? d.position![0] < 0 : d.position![0] > 0))
      expect(pts).toHaveLength(6)
      const back = pts.map((d) => [(d.position![0] - cx[k]) / u + 3.5, d.position![1] / u + 3.5]).sort((p, q) => p[0] - q[0])
      back.forEach((pt, i) => { expect(pt[0]).toBeCloseTo(x[i], 1); expect(pt[1]).toBeCloseTo(ys[i], 1) })
      for (const [px, py] of back) { expect(Math.abs(px - 3.5)).toBeGreaterThan(0.4); expect(Math.abs(py - 3.5)).toBeGreaterThan(0.4) }      // no point sits on a mean line
    }
    const mv = bonds(s, SLATE, 0.03).filter(vertical).map((b) => b.from![0]).sort((a, b) => a - b)
    expect(mv[0]).toBeCloseTo(cx[0], 2); expect(mv[1]).toBeCloseTo(cx[1], 2)
    expect(texts(s)).toEqual(expect.arrayContaining(['Cov = +2.42', 'Cov = −2.42']))
  })

  it('Correlation: r = 1 for a line, −0.90 for the noisy downward trend, 0 for the parabola, each recomputed from the DRAWN points', () => {
    const { u, centres, oy, A, B, C } = M.CORR
    expect(rOf(A.x, A.y)).toBeCloseTo(1, 12); expect(rOf(B.x, B.y)).toBeCloseTo(-0.898, 3); expect(Math.abs(rOf(C.x, C.y))).toBeLessThan(1e-12)
    const s = M.buildCorrelationScene()
    const drawn = (k: number, color: string) => dots(s, color).map((d) => [(d.position![0] - centres[k]) / u + 3, (d.position![1] - oy) / u])
    const a = drawn(0, BLUE), b = drawn(1, RED), c = drawn(2, GREEN)
    expect([a.length, b.length, c.length]).toEqual([6, 6, 7])
    expect(rOf(a.map((p) => p[0]), a.map((p) => p[1]))).toBeGreaterThan(0.999)
    expect(rOf(b.map((p) => p[0]), b.map((p) => p[1]))).toBeCloseTo(-0.9, 1)
    expect(Math.abs(rOf(c.map((p) => p[0]), c.map((p) => p[1])))).toBeLessThan(0.02)
    c.forEach(([px, py]) => expect(Math.abs(py - (px - 3) ** 2 / 1.5)).toBeLessThan(0.05))                                               // the parabola points are an exact function of x
    for (const [px, py] of a) expect(Math.abs(py - (0.8 * px + 0.6))).toBeLessThan(0.05)
    const fit = bonds(s, VIOLET, 0.03)[0]; expect((fit.to![1] - fit.from![1]) / (fit.to![0] - fit.from![0])).toBeCloseTo(0.8, 1)       // slope 0.8
    for (const p of paths(s, VIOLET)[0].points!) { const px = (p[0] - centres[2]) / u + 3, py = (p[1] - oy) / u; expect(Math.abs(py - (px - 3) ** 2 / 1.5)).toBeLessThan(0.05) }
    expect(texts(s)).toEqual(expect.arrayContaining(['r = 1.00', 'r = −0.90', 'r = 0.00', 'but y depends on x']))
  })

  it('Descriptive statistics: the dot plot holds the 11 values, the histogram counts 3, 5, 2, 1 (total 11) and the boxplot is 2, 3, 4, 6, 9', () => {
    const { data, u, mid, histUnit, bins } = M.DESC
    const s = M.buildDescriptiveStatisticsScene()
    expect(sorted(dots(s, BLUE).map((d) => Math.round(d.position![0] / u + mid)))).toEqual(sorted(data))
    const rects = chunks(bonds(s, BLUE, 0.04), 4)
    expect(rects).toHaveLength(4)
    const counts = rects.map((r) => Math.round(len(r[1]) / histUnit))
    expect(counts).toEqual([3, 5, 2, 1]); expect(sum(counts)).toBe(data.length)
    bins.forEach(([lo, hi], i) => { expect(counts[i]).toBe(data.filter((v) => v >= lo && v < hi).length); expect(len(rects[i][0]) / u).toBeCloseTo(hi - lo, 2); expect(Math.min(rects[i][0].from![0], rects[i][0].to![0])).toBeCloseTo((lo - mid) * u, 2) })
    const five = sorted(data); const [mn, q1, md, q3, mx] = [five[0], 3, five[5], 6, five[10]]                                      // by hand: halves [2,3,3,4,4] and [5,5,6,7,9]
    expect([mn, q1, md, q3, mx]).toEqual([2, 3, 4, 6, 9]); expect(M.fiveNumber(data)).toEqual({ min: mn, q1, median: md, q3, max: mx })
    const box = bonds(s, GREEN, 0.05).filter(horizontal)
    expect(Math.min(...box.map((b) => Math.min(b.from![0], b.to![0])))).toBeCloseTo((q1 - mid) * u, 2); expect(Math.max(...box.map((b) => Math.max(b.from![0], b.to![0])))).toBeCloseTo((q3 - mid) * u, 2)
    expect(bonds(s, GREEN, 0.09)[0].from![0]).toBeCloseTo((md - mid) * u, 2)
    const wh = bonds(s, GREEN, 0.04).filter(horizontal).sort(byX)
    expect(wh[0].from![0]).toBeCloseTo((mn - mid) * u, 2); expect(wh[0].to![0]).toBeCloseTo((q1 - mid) * u, 2); expect(wh[1].from![0]).toBeCloseTo((q3 - mid) * u, 2); expect(wh[1].to![0]).toBeCloseTo((mx - mid) * u, 2)
    expect(mean(data)).toBeCloseTo(52 / 11, 12); expect(Math.sqrt(sum(data.map((v) => (v - 52 / 11) ** 2)) / 10)).toBeCloseTo(2.0045, 3)
    expect(texts(s)).toEqual(expect.arrayContaining(['dot plot', 'histogram', 'boxplot', 'mean 4.7 · median 4 · s 2.0']))
  })

  it('Measures of center: the mean is the balance point of the drawn dots; one outlier moves the mean 4.7 → 6.3 but the median only 4 → 4.5; the mode is 4', () => {
    const { data, outlier, u, mid } = M.CENTER
    const s = M.buildMeasuresOfCenterScene()
    const vals = dots(s, BLUE).map((d) => d.position![0] / u + mid)
    expect(vals).toHaveLength(11)
    const m = mean(vals)
    expect(m).toBeCloseTo(52 / 11, 1)
    expect(sum(vals.map((v) => v - m))).toBeCloseTo(0, 9)                                                                                // the deviations cancel: a balance point
    const tri = (color: string) => { const bs = bonds(s, color, 0.05); return bs[1].to![0] / u + mid }                                  // apex of the fulcrum triangle
    expect(tri(GREEN)).toBeCloseTo(52 / 11, 1)
    const withOut = [...data, outlier]
    const red = dots(s, RED)[0]; expect(red.position![0] / u + mid).toBeCloseTo(outlier, 1)
    expect(tri(RED)).toBeCloseTo(76 / 12, 1); expect(mean(withOut)).toBeCloseTo(76 / 12, 12)
    expect(sum([...vals, red.position![0] / u + mid].map((v) => v - 76 / 12))).toBeCloseTo(0, 1)                                         // balances again at the new mean
    expect(M.medianOf(data)).toBe(4); expect(M.medianOf(withOut)).toBe(4.5); expect(M.modeOf(data)).toBe(4)
    expect(sorted(data)[5]).toBe(4); expect((sorted(withOut)[5] + sorted(withOut)[6]) / 2).toBe(4.5)
    expect(mean(withOut) - mean(data)).toBeGreaterThan(3 * (M.medianOf(withOut) - M.medianOf(data)))                                    // the mean moved far more
    const med = arrows(s, VIOLET)[0]; expect(med.from![0] / u + mid).toBeCloseTo(4, 1)
    const modeBox = bonds(s, RED, 0.04); expect(Math.min(...modeBox.map((b) => b.from![0])) / u + mid + 0.5).toBeCloseTo(4, 1)
    const stackAt4 = dots(s, BLUE).filter((d) => near(d.position![0] / u + mid, 4, 0.1)).length
    expect(stackAt4).toBe(3); expect(Math.max(...[2, 3, 4, 5, 6, 7, 9].map((v) => data.filter((x) => x === v).length))).toBe(3)         // the box surrounds the tallest stack
    expect(texts(s)).toEqual(expect.arrayContaining(['mean 4.7', 'median 4', 'mode 4', 'outlier 24', 'mean 6.3', 'median 4.5']))
  })

  it('Measures of spread: range 7, IQR 3, s = 2.0 (variance 40.2 ÷ 10 = 4.02), each bracket is as long as its number says', () => {
    const { data, u, mid } = M.SPREAD
    const s = M.buildMeasuresOfSpreadScene()
    const range = bonds(s, VIOLET, 0.06).filter(horizontal)[0]
    expect(len(range) / u).toBeCloseTo(Math.max(...data) - Math.min(...data), 2); expect(len(range) / u).toBeCloseTo(7, 2)
    expect(range.from![0] / u + mid).toBeCloseTo(2, 1); expect(range.to![0] / u + mid).toBeCloseTo(9, 1)
    const box = bonds(s, BLUE, 0.05).filter(horizontal)
    expect((Math.max(...box.map((b) => b.to![0])) - Math.min(...box.map((b) => b.from![0]))) / u).toBeCloseTo(3, 2)                    // IQR = Q3 − Q1 = 6 − 3
    const m = mean(data), ss = sum(data.map((v) => (v - m) ** 2))
    expect(ss).toBeCloseTo(40.1818, 3); expect(ss / (data.length - 1)).toBeCloseTo(4.0182, 3); expect(Math.sqrt(ss / (data.length - 1))).toBeCloseTo(2.0045, 3)
    expect(ss / data.length).toBeLessThan(3.7)                                                                                           // dividing by n would give 3.65, not 4.02
    const band = bonds(s, GREEN, 0.06).filter(horizontal)[0]
    expect(len(band) / u).toBeCloseTo(2 * Math.sqrt(ss / 10), 1)
    expect((band.from![0] + band.to![0]) / 2 / u + mid).toBeCloseTo(m, 1)                                                               // centred on the mean
    expect(dots(s, GREEN)[0].position![0] / u + mid).toBeCloseTo(m, 1)
    expect(sorted(dots(s, SLATE).map((d) => Math.round(d.position![0] / u + mid)))).toEqual(sorted(data))
    expect(texts(s)).toEqual(expect.arrayContaining(['range = 9 − 2 = 7', 'IQR = 6 − 3 = 3', 's = 2.0: mean ± s', 's² = 40.2 ÷ 10 = 4.02']))
  })

  it('Percentile: the cuts at 25, 36.5 and 48.5 have exactly 5, 10 and 15 of the 20 drawn values below them (25%, 50%, 75%); IQR = 23.5', () => {
    const { data, u, mid } = M.PCT
    const s = M.buildPercentileScene()
    const dd = [...dots(s, BLUE), ...dots(s, VIOLET)].sort(byX)
    expect(dd).toHaveLength(20)
    const vals = dd.map((d) => Math.round(d.position![0] / u + mid))
    expect(vals).toEqual(data)                                                                                                           // the drawn values are the data, in order
    dd.forEach((d, i) => expect(d.color).toBe(Math.floor(i / 5) % 2 === 0 ? BLUE : VIOLET))                                              // four groups of five
    const cuts = bonds(s, GREEN, 0.05).filter(vertical).sort(byX).map((b) => b.from![0] / u + mid)
    expect(cuts.map((c) => Math.round(c * 10) / 10)).toEqual([25, 36.5, 48.5])
    cuts.forEach((c, i) => expect(dd.filter((d) => d.position![0] / u + mid < c).length / dd.length).toBeCloseTo([0.25, 0.5, 0.75][i], 12))
    const iqr = bonds(s, RED, 0.06).filter(horizontal)[0]
    expect(len(iqr) / u).toBeCloseTo(23.5, 1); expect(len(iqr) / u).toBeCloseTo(cuts[2] - cuts[0], 1)
    expect(texts(s)).toEqual(expect.arrayContaining(['20 sorted values', 'Q₁ = 25', 'Q₂ = 36.5', 'Q₃ = 48.5', 'IQR = 48.5 − 25 = 23.5']))
  })

  it('Sampling distribution: the bells are N(100, SE²) with SE = 15, 7.5, 3.75; peaks double and quadruple; each has area 1', () => {
    const { sigma, ns, u, yScale, oy } = M.SAMP
    expect(ns.map((n) => M.standardError(sigma, n))).toEqual([15, 7.5, 3.75])
    const s = M.buildSamplingDistributionScene()
    const curves = [paths(s, INK)[0], paths(s, BLUE)[0], paths(s, GREEN)[0]]
    const peaks: number[] = []
    curves.forEach((c, i) => {
      const se = sigma / Math.sqrt(ns[i]); const pts = c.points!.map((p) => [p[0] / u, (p[1] - oy) / yScale])
      const tol = 0.0003 + 0.05 * normPdf(0, 0, se) * 0.6065 / se                                                                       // y rounding, plus x rounding (0.005 / u) times the steepest slope
      for (const [t, y] of pts) expect(Math.abs(y - normPdf(t, 0, se))).toBeLessThan(tol)                                                  // each point is on the normal curve
      let area = 0; for (let k = 1; k < pts.length; k++) area += ((pts[k][1] + pts[k - 1][1]) / 2) * (pts[k][0] - pts[k - 1][0])
      expect(area).toBeCloseTo(2 * phi(30 / se) - 1, 2)                                                                                  // area over ±30 (the full area 1 less the clipped tails)
      peaks.push(Math.max(...pts.map((p) => p[1])))
    })
    expect(peaks[1] / peaks[0]).toBeCloseTo(2, 1); expect(peaks[2] / peaks[0]).toBeCloseTo(4, 1)
    expect(texts(s)).toEqual(expect.arrayContaining(['μ = 100', 'population σ = 15', 'n = 4: SE = 7.5', 'n = 16: SE = 3.75']))
  })

  it('Confidence interval: each drawn interval is x̄ ± 1.96·σ/√n = x̄ ± 3.92; 19 of 20 contain μ = 50 and the one that misses is red and circled', () => {
    const { mu, sigma, n, rows, u, top, gap, z } = M.CI
    expect(sigma / Math.sqrt(n)).toBe(2); expect(M.ciHalfWidth()).toBeCloseTo(3.92, 12); expect(z).toBe(1.96)
    const means = M.ciMeans()
    expect(means).toHaveLength(rows)
    expect(M.ciMeans()).toEqual(means)                                                                                                   // deterministic
    expect(Math.abs(mean(means) - mu)).toBeLessThan(1.5)                                                                                 // a plausible run: the sample means centre on μ ...
    const sd = Math.sqrt(sum(means.map((v) => (v - mean(means)) ** 2)) / (rows - 1)); expect(sd).toBeGreaterThan(1.2); expect(sd).toBeLessThan(3.2)   // ... with spread near the SE of 2
    const s = M.buildConfidenceIntervalScene()
    const ivs = [...bonds(s, BLUE, 0.04), ...bonds(s, RED, 0.04)].sort((a, b) => b.from![1] - a.from![1])
    expect(ivs).toHaveLength(rows)
    ivs.forEach((b, i) => {
      expect(b.from![1]).toBeCloseTo(top - i * gap, 2)                                                                                   // one row per sample
      const centre = (b.from![0] + b.to![0]) / 2 / u + mu, half = len(b) / 2 / u
      expect(centre).toBeCloseTo(means[i], 1); expect(half).toBeCloseTo(3.92, 1)
      expect(b.color).toBe(Math.abs(centre - mu) <= half ? BLUE : RED)                                                                   // blue exactly when the interval covers μ
    })
    expect(ivs.filter((b) => b.color === BLUE)).toHaveLength(19); expect(ivs.filter((b) => b.color === RED)).toHaveLength(1)
    expect(means.filter((v) => Math.abs(v - mu) <= 3.92)).toHaveLength(19)
    expect(rows * 0.95).toBe(19)                                                                                                         // 95% of 20
    const miss = means.findIndex((v) => Math.abs(v - mu) > 3.92)
    const rg = paths(s, RED)[0].points!, cxr = (Math.max(...rg.map((p) => p[0])) + Math.min(...rg.map((p) => p[0]))) / 2
    expect(cxr).toBeCloseTo((means[miss] - mu) * u, 1)
    expect(bonds(s, VIOLET, 0.04)[0].from![0]).toBeCloseTo(0, 2)                                                                         // μ at x = 0
    expect(texts(s)).toEqual(expect.arrayContaining(['μ = 50', '19 of 20 contain μ']))
  })

  it('CI for a mean: ±9.8, ±4.9, ±2.45 for n = 4, 16, 64 (halving each time n × 4); with s = 10, n = 10 the t-interval ±7.15 is wider than z ±6.20', () => {
    const { xbar, sigma, u, z, t9, rowN4, rowN16, rowN64, rowZ, rowT, n10 } = M.CIM
    expect([4, 16, 64].map((k) => M.zHalfWidth(sigma, k))).toEqual([9.8, 4.9, 2.45].map((v) => expect.closeTo(v, 12)))
    expect(M.zHalfWidth(sigma, 16) / M.zHalfWidth(sigma, 4)).toBeCloseTo(0.5, 12); expect(M.zHalfWidth(sigma, 64) / M.zHalfWidth(sigma, 16)).toBeCloseTo(0.5, 12)
    expect(z).toBe(1.96); expect(t9).toBe(2.262); expect(t9).toBeGreaterThan(z)
    expect(M.zHalfWidth(sigma, n10)).toBeCloseTo(6.198, 3); expect(M.tHalfWidth(sigma, n10)).toBeCloseTo(7.153, 3)
    const s = M.buildCiMeanScene()
    const bars = bonds(s, BLUE, 0.06).concat(bonds(s, RED, 0.06), bonds(s, GREEN, 0.06)).filter(horizontal)
    const at = (y: number) => bars.find((b) => near(b.from![1], y, 1e-9))!
    const half = (b: Obj) => len(b) / 2 / u
    expect(half(at(rowN4))).toBeCloseTo(9.8, 1); expect(half(at(rowN16))).toBeCloseTo(4.9, 1); expect(half(at(rowN64))).toBeCloseTo(2.45, 1)
    expect(half(at(rowZ))).toBeCloseTo(6.2, 1); expect(half(at(rowT))).toBeCloseTo(7.15, 1)
    for (const y of [rowN4, rowN16, rowN64, rowZ, rowT]) expect((at(y).from![0] + at(y).to![0]) / 2).toBeCloseTo(0, 2)                    // all centred on x̄ = 50
    expect(half(at(rowT))).toBeGreaterThan(half(at(rowZ)))
    expect(xbar).toBe(50)
    expect(texts(s)).toEqual(expect.arrayContaining(['n = 4: ±9.8', 'n = 16: ±4.9', 'n = 64: ±2.45', 'z ±6.20', 't ±7.15', 'σ = 10 known']))
  })

  it('CI for a proportion: p̂ ± 1.96·√(p̂(1−p̂)/n) = 0.504 to 0.696 at n = 100 and 0.552 to 0.648 at n = 400; the shaded middle of each bell is 95%', () => {
    const { phat, ns, u, k, oy } = M.CIP
    expect(M.proportionSE(phat, 100)).toBeCloseTo(0.04899, 5); expect(M.proportionSE(phat, 400)).toBeCloseTo(0.024495, 6)
    const [lo1, hi1] = M.proportionInterval(phat, 100), [lo4, hi4] = M.proportionInterval(phat, 400)
    expect([lo1, hi1].map((v) => Math.round(v * 1000) / 1000)).toEqual([0.504, 0.696]); expect([lo4, hi4].map((v) => Math.round(v * 1000) / 1000)).toEqual([0.552, 0.648])
    expect((hi1 - lo1) / (hi4 - lo4)).toBeCloseTo(2, 12)                                                                                 // ×4 data, half the width
    for (const n of ns) { expect(n * phat).toBeGreaterThanOrEqual(10); expect(n * (1 - phat)).toBeGreaterThanOrEqual(10) }               // the large-sample condition
    const s = M.buildCiProportionScene()
    const bells = [paths(s, INK)[0], paths(s, GREEN)[0]]
    bells.forEach((c, i) => { const se = M.proportionSE(phat, ns[i]); const tol = 0.035 + (0.005 / u) * normPdf(phat, phat, se) * 0.6065 / se; for (const p of c.points!) expect(Math.abs((p[1] - oy) / k - normPdf(p[0] / u + phat, phat, se))).toBeLessThan(tol) })
    const area = (color: string, n: number) => hatched(bonds(s, color, 0.022).filter(vertical), k, M.proportionInterval(phat, n)[1] - M.proportionInterval(phat, n)[0]) / 16
    expect(area(BLUE, 100)).toBeCloseTo(phi(1.96) - phi(-1.96), 2); expect(area(GREEN, 400)).toBeCloseTo(0.95, 2)
    expect(bonds(s, BLUE, 0.022)).toHaveLength(16); expect(bonds(s, GREEN, 0.022)).toHaveLength(16)
    const br = (color: string) => bonds(s, color, 0.06).filter(horizontal)[0]
    expect(len(br(BLUE)) / u).toBeCloseTo(hi1 - lo1, 2); expect(len(br(GREEN)) / u).toBeCloseTo(hi4 - lo4, 2)
    expect((br(BLUE).from![0] / u) + phat).toBeCloseTo(lo1, 2)
    expect(texts(s)).toEqual(expect.arrayContaining(['n = 100: [0.504, 0.696]', 'n = 400: [0.552, 0.648]', 'p̂ = 0.6']))
  })

  it('Hypothesis testing: each shaded tail beyond ±1.96 holds 0.025 (α = 0.05 in all); the observed z = 2.4 is inside the rejection region', () => {
    const { crit, observed, yScale, oy, tailSteps, tailEnd } = M.HT
    expect(1 - phi(crit)).toBeCloseTo(0.025, 3); expect(2 * (1 - phi(crit))).toBeCloseTo(0.05, 3)
    expect([M.rejects(2.4), M.rejects(-2.4), M.rejects(1.5), M.rejects(-1.96), M.rejects(0)]).toEqual([true, true, false, false, false])
    const s = M.buildHypothesisTestingScene()
    const bell = paths(s, INK)[0].points!
    for (const p of bell) expect(Math.abs((p[1] - oy) / yScale - normPdf(p[0]))).toBeLessThan(0.001)                                      // the standard normal curve
    const tails = bonds(s, RED, 0.022).filter(vertical)
    const right = tails.filter((o) => o.from![0] > 0), left = tails.filter((o) => o.from![0] < 0)
    expect([right.length, left.length]).toEqual([tailSteps, tailSteps])
    const step = (tailEnd - crit) / tailSteps
    const aR = hatched(right, yScale, step), aL = hatched(left, yScale, step)
    expect(aR).toBeCloseTo(phi(tailEnd) - phi(crit), 3); expect(aL).toBeCloseTo(aR, 3)
    expect(aR + aL).toBeCloseTo(0.05, 2)                                                                                                 // α, up to the clipped far tail
    for (const o of right) expect(o.from![0]).toBeGreaterThan(crit)
    for (const o of left) expect(o.from![0]).toBeLessThan(-crit)
    const obs = dots(s, GREEN)[0]; expect(obs.position![0]).toBeCloseTo(observed, 2); expect(obs.position![0]).toBeGreaterThan(crit)
    expect(texts(s)).toEqual(expect.arrayContaining(['−1.96', '1.96', 'α = 0.05: 0.025 + 0.025', 'observed z = 2.4', 'reject H₀']))
  })
})
