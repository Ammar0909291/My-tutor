/**
 * Core school-mathematics figures — batch 9 of the mathematics visual campaign
 * (2026-10-12): the last essential probability concepts and the first statistics ones.
 *
 * A Markov chain and its long-run distribution, covariance as signed rectangles,
 * correlation across three scatter plots, the same data as dot plot / histogram /
 * boxplot, mean and median under an outlier, range / IQR / standard deviation,
 * percentiles of twenty sorted values, the sampling distribution narrowing as 1/√n, a
 * confidence-interval simulation, interval width against n, a proportion interval and
 * the rejection region of a hypothesis test. Same rules as batches 1-8: one visual
 * language from visualDesign.ts, labels are names not sentences (marks of 1-2
 * characters are free), steps are cumulative, coordinates stay inside +-5, at most 50
 * objects per step, nothing the figure audit rejects, and every number drawn comes from
 * the constants and pure helpers exported here, which the test file re-derives
 * independently from the DRAWN coordinates.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, sampleMapped, guide, axes2, mathAxes, polyLines, arcPts, type XY, type V3 } from './mathSceneKit'
import { vHatch } from './mathCoreScenesB7'
import { normPdf, mulberry32, meanOf } from './mathCoreScenesB8'

const ring = (x: number, y: number, color: string, r = 0.11): SceneObject => curve(arcPts(x, y, r, 0, 360, 24), color)
const zero = () => 0
const f1 = (n: number) => (Math.round(n * 10) / 10).toFixed(1)
const f2 = (n: number) => { const v = (Math.round(n * 100) / 100).toFixed(2); return v === '-0.00' ? '0.00' : v }
/** A number with a true minus sign, for labels. */
const signed = (n: number, d = 2) => { const v = f2(n); return d === 2 ? v.replace('-', '−') : v }
const sum = (xs: readonly number[]) => xs.reduce((s, v) => s + v, 0)
/** A short horizontal bar with end caps (a range, an interval): returns the bar and its two caps. */
const bracket = (x0: number, x1: number, y: number, color: string, t = 0.05, cap = 0.16): SceneObject[] => [
  line(P(x0, y), P(x1, y), color, t), line(P(x0, y - cap), P(x0, y + cap), color, t), line(P(x1, y - cap), P(x1, y + cap), color, t),
]

/** Pearson correlation and the mean of the products of deviations (the population covariance). */
export const covOf = (xs: readonly number[], ys: readonly number[]) => { const mx = meanOf(xs), my = meanOf(ys); return sum(xs.map((x, i) => (x - mx) * (ys[i] - my))) / xs.length }
export const pearson = (xs: readonly number[], ys: readonly number[]) => {
  const mx = meanOf(xs), my = meanOf(ys)
  return sum(xs.map((x, i) => (x - mx) * (ys[i] - my))) / Math.sqrt(sum(xs.map((x) => (x - mx) ** 2)) * sum(ys.map((y) => (y - my) ** 2)))
}
/** Five-number summary by the median-of-halves rule (the middle value is left out of both halves when n is odd). */
export function fiveNumber(data: readonly number[]): { min: number; q1: number; median: number; q3: number; max: number } {
  const s = [...data].sort((a, b) => a - b)
  const med = (a: number[]) => (a.length % 2 ? a[(a.length - 1) / 2] : (a[a.length / 2 - 1] + a[a.length / 2]) / 2)
  const half = Math.floor(s.length / 2)
  return { min: s[0], q1: med(s.slice(0, half)), median: med(s), q3: med(s.slice(s.length - half)), max: s[s.length - 1] }
}
export const sampleVariance = (xs: readonly number[]) => { const m = meanOf(xs); return sum(xs.map((x) => (x - m) ** 2)) / (xs.length - 1) }

// ── 1. Markov chain ──────────────────────────────────────────────────────────

/** Two weather states, Sunny and Rainy: T[i][j] = P(next = j | now = i). Start sunny. */
export const MARKOV = { T: [[0.8, 0.2], [0.4, 0.6]], start: [1, 0], nodes: [[-3.9, 0.3], [-1.3, 0.3]] as XY[], r: 0.45, base: -1.4, H: 3.0, colX: [0.5, 1.4, 2.3, 3.2, 4.1], w: 0.2 } as const
export const markovNext = (p: readonly number[]): number[] => [p[0] * MARKOV.T[0][0] + p[1] * MARKOV.T[1][0], p[0] * MARKOV.T[0][1] + p[1] * MARKOV.T[1][1]]
export const markovAfter = (n: number): number[] => { let p: number[] = [...MARKOV.start]; for (let i = 0; i < n; i++) p = markovNext(p); return p }
/** The stationary distribution: pi T = pi, from the balance pi_S P(S→R) = pi_R P(R→S). */
export const markovStationary = (): number[] => { const a = MARKOV.T[0][1], b = MARKOV.T[1][0]; return [b / (a + b), a / (a + b)] }

/** KG: P(X_{n+1} = j | X_0, …, X_n) = P(X_{n+1} = j | X_n); characterised by a state space and a transition matrix. */
export function buildMarkovChainScene(): SceneSpec {
  return framed(raw_buildMarkovChainScene())
}
function raw_buildMarkovChainScene(): SceneSpec {
  const { T, nodes, r, base, H, colX, w } = MARKOV
  const [S, R] = nodes
  const column = (x: number, pS: number): SceneObject[] => {
    const out: SceneObject[] = [line(P(x, base), P(x, base + pS * H), ROLE.output, w)]
    if (1 - pS > 1e-9) out.push(line(P(x, base + pS * H), P(x, base + H), ROLE.input, w))
    return out
  }
  return {
    id: 'math-markov-chain',
    title: 'Markov chain: the next state depends only on the present one',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a two-state Markov chain (Sunny, Rainy) by its transition probabilities, how the distribution of the state evolves from a sunny start, and that it settles at the stationary distribution (2/3, 1/3).',
    ariaLabel:
      'Two states, Sunny and Rainy. From Sunny the next day is Sunny with probability 0.8 and Rainy with 0.2; from Rainy it is Sunny with 0.4 and Rainy with 0.6. Starting sunny, the chance of Sunny after 0, 1, 2 and 3 steps is 1, 0.8, 0.72 and 0.688, shown as stacked bars, and it settles at the long-run value 2 thirds, where the distribution no longer changes.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A Markov chain: tomorrow depends only on today, not on earlier days. States: Sunny and Rainy. From Sunny: stay sunny .8, turn rainy .2. From Rainy: turn sunny .4, stay rainy .6. Each state’s outgoing probabilities add to 1.', objects: [dot(P(S[0], S[1]), ROLE.output, r), dot(P(R[0], R[1]), ROLE.input, r), label('Sunny', P(S[0], S[1] - 0.85), ROLE.output, 'primary'), label('Rainy', P(R[0], R[1] - 0.85), ROLE.input, 'primary'), arrow(P(S[0] + r + 0.05, S[1] + 0.2), P(R[0] - r - 0.05, R[1] + 0.2), ROLE.output), arrow(P(R[0] - r - 0.05, R[1] - 0.2), P(S[0] + r + 0.05, S[1] - 0.2), ROLE.input), ring(S[0], S[1] + r + 0.3, ROLE.output, 0.3), ring(R[0], R[1] + r + 0.3, ROLE.input, 0.3), label(String(T[0][0]).replace('0.', '.'), P(S[0], S[1] + r + 0.95), ROLE.output, 'primary'), label(String(T[1][1]).replace('0.', '.'), P(R[0], R[1] + r + 0.95), ROLE.input, 'primary'), label(String(T[0][1]).replace('0.', '.'), P((S[0] + R[0]) / 2, S[1] + 0.65), ROLE.output, 'primary'), label(String(T[1][0]).replace('0.', '.'), P((S[0] + R[0]) / 2, S[1] - 0.65), ROLE.input, 'primary')] },
      { narration: 'Start sunny: P(Sunny) = 1. After 1 step: .8. After 2: .8 × .8 + .2 × .4 = .72. After 3: .688. Each bar is split into Sunny (blue) and Rainy (red); the split changes less and less.', objects: [line(P(colX[0] - 0.5, base), P(colX[3] + 0.5, base), ROLE.reference, 0.04), ...[0, 1, 2, 3].flatMap((n) => [...column(colX[n], markovAfter(n)[0]), label(String(n), P(colX[n], base - 0.4), ROLE.reference, 'detail')]), label('after n steps', P((colX[0] + colX[3]) / 2, base - 1.0), ROLE.ink, 'primary')] },
      { narration: 'Far into the future the distribution stops changing: P(Sunny) = 2/3. This stationary distribution π = (2/3, 1/3) satisfies πT = π: 2/3 × .8 + 1/3 × .4 = 2/3. It does not depend on the start.', objects: [...column(colX[4], markovStationary()[0]), label('∞', P(colX[4], base - 0.4), ROLE.reference, 'detail'), guide(P(colX[0] - 0.3, base + markovStationary()[0] * H), P(colX[4] + 0.4, base + markovStationary()[0] * H), ROLE.aid, 0.03), label('long run: 2/3 sunny', P(colX[4] - 0.9, base - 1.7), ROLE.result, 'primary')] },
    ],
  }
}

// ── 2. Covariance ────────────────────────────────────────────────────────────

/** Six points; the right panel flips y (y → 7 − y), which flips the sign of every product. Both panels have means (3.5, 3.5). */
export const COV = { x: [1, 2, 3, 4, 5, 6], y: [2, 1, 4, 3, 6, 5], u: 0.6, cx: [-2.8, 2.8] } as const
export const flipY = (ys: readonly number[]) => ys.map((y) => 7 - y)

/** KG: Cov(X, Y) = E[(X − μ_X)(Y − μ_Y)]; positive when X and Y tend to be above / below their means together. */
export function buildCovarianceScene(): SceneSpec {
  return framed(raw_buildCovarianceScene())
}
function raw_buildCovarianceScene(): SceneSpec {
  const { x, y, u, cx } = COV
  const ys = [y, flipY(y)]
  const mx = meanOf(x)
  const panel = (k: number): { frame: SceneObject[]; rects: SceneObject[] } => {
    const my = meanOf(ys[k])
    const M = (px: number, py: number): XY => [cx[k] + (px - mx) * u, (py - my) * u]
    const frame: SceneObject[] = [
      line(P(...M(0.5, my)), P(...M(6.5, my)), ROLE.reference, 0.03), line(P(...M(mx, 0.5)), P(...M(mx, 6.5)), ROLE.reference, 0.03),
      label('x̄', P(...M(mx, 7.0)), ROLE.reference, 'detail'), label('ȳ', P(...M(6.9, my)), ROLE.reference, 'detail'),
      ...x.map((px, i) => dot(P(...M(px, ys[k][i])), ROLE.ink, 0.1)),
    ]
    const rects = x.flatMap((px, i) => polyLines([M(px, ys[k][i]), M(mx, ys[k][i]), M(mx, my), M(px, my)], (px - mx) * (ys[k][i] - my) > 0 ? ROLE.output : ROLE.input, 0.035))
    return { frame, rects }
  }
  const L = panel(0), Rt = panel(1)
  return {
    id: 'math-covariance',
    title: 'Covariance: signed rectangles about the means',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show covariance as the average signed area of the rectangles each point makes with the point of means: points above-right or below-left give positive area, the other quadrants negative, and flipping y flips the sign.',
    ariaLabel:
      'Left: six points with their means marked. Each point and the point of means form a rectangle; the four large rectangles in the top-right and bottom-left quadrants are positive (blue, area 3.75 each) and the two small ones are negative (red, 0.25 each). Their signed areas total 14.5 and the mean is the covariance, 2.42. Right: the same points with y flipped, where the signs reverse and the covariance is minus 2.42.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Six points (x, y). Mark the means x̄ = 3.5 and ȳ = 3.5. The two lines cut the plane into four quadrants around the point of means.', objects: L.frame },
      { narration: 'Each point makes a rectangle with the point of means, with area (x − x̄)(y − ȳ). Top-right and bottom-left points give positive area (blue): 3.75 four times. Top-left and bottom-right give negative area (red): −0.25 twice. Average signed area: (4 × 3.75 − 2 × 0.25) ÷ 6 = 14.5 ÷ 6 = 2.42 = Cov(X, Y).', objects: [...L.rects, label(`Cov = +${f2(covOf(x, y))}`, P(cx[0], -2.35), ROLE.output, 'primary')] },
      { narration: 'Flip y (y → 7 − y): the same points now fall mostly top-left and bottom-right, so most rectangles are negative and Cov = −2.42. Positive covariance: above and below the means together; negative: opposite.', objects: [...Rt.frame, ...Rt.rects, label(`Cov = ${signed(covOf(x, flipY(y)))}`, P(cx[1], -2.35), ROLE.input, 'primary')] },
    ],
  }
}

// ── 3. Correlation ───────────────────────────────────────────────────────────

const CORR_X = [1, 2, 3, 4, 5, 6]
/** A: exactly on y = 0.8x + 0.6 (r = 1). B: a strong negative trend with scatter. C: y = (x − 3)²/1.5 on x = 0..6 (r = 0, yet y is a function of x). */
export const CORR = {
  u: 0.42, centres: [-3.4, 0, 3.4], oy: -1.3,
  A: { x: CORR_X, y: CORR_X.map((v) => 0.8 * v + 0.6) },
  B: { x: CORR_X, y: [5, 4.2, 4.6, 2.8, 3.4, 1.8] },
  C: { x: [0, 1, 2, 3, 4, 5, 6], y: [0, 1, 2, 3, 4, 5, 6].map((v) => (v - 3) ** 2 / 1.5) },
} as const

/** KG: ρ = Cov(X, Y) / (σ_X σ_Y) ∈ [−1, 1], a dimensionless measure of LINEAR dependence; ρ = 0 does not mean independent. */
export function buildCorrelationScene(): SceneSpec {
  return framed(raw_buildCorrelationScene())
}
function raw_buildCorrelationScene(): SceneSpec {
  const { u, centres, oy, A, B, C } = CORR
  const Sc = (k: number) => (px: number, py: number): V3 => P(centres[k] + (px - 3) * u, py * u + oy)
  const axesOf = (k: number) => { const S = Sc(k); return axes2(S(-0.4, 0)[0], S(0, -0.4)[1], S(-0.4, 0)[0], S(6.7, 0)[0], S(0, -0.4)[1], S(0, 6.7)[1]) }
  const pts = (k: number, d: { x: readonly number[]; y: readonly number[] }, color: string) => d.x.map((px, i) => dot(Sc(k)(px, d.y[i]), color, 0.1))
  const r = [pearson(A.x, A.y), pearson(B.x, B.y), pearson(C.x, C.y)]
  return {
    id: 'math-correlation',
    title: 'Correlation: strength of a LINEAR relationship',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show correlation ρ = Cov/(σ_X σ_Y) on three scatter plots: exactly linear gives ρ = 1, a noisy downward trend gives a strong negative value, and a perfect curve can still give ρ = 0 because correlation only sees linear dependence.',
    ariaLabel:
      'Three scatter plots. Left: points exactly on an upward line, correlation 1.00. Middle: points trending downward with some scatter, correlation minus 0.90. Right: seven points on a U-shaped parabola, correlation 0.00, even though each y is completely determined by x.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Correlation ρ = Cov(X, Y) ÷ (σ_X σ_Y) always lies between −1 and 1. Points exactly on an upward line: ρ = 1. |ρ| = 1 happens exactly when y = ax + b.', objects: [...axesOf(0), ...pts(0, A, ROLE.output), line(Sc(0)(0.4, 0.8 * 0.4 + 0.6), Sc(0)(6.0, 0.8 * 6 + 0.6), ROLE.aid, 0.03), label(`r = ${f2(r[0])}`, P(centres[0], -2.1), ROLE.output, 'primary')] },
      { narration: 'Scatter around a downward trend: ρ = −0.90. Strong but not perfect: the closer to a straight line, the closer |ρ| is to 1; the sign gives the direction.', objects: [...axesOf(1), ...pts(1, B, ROLE.input), label(`r = ${signed(r[1])}`, P(centres[1], -2.1), ROLE.input, 'primary')] },
      { narration: 'Here y = (x − 3)² ÷ 1.5 exactly, a perfect relationship, yet ρ = 0: the left half falls and the right half rises, and the two cancel. Uncorrelated does not mean independent; ρ only measures LINEAR dependence.', objects: [...axesOf(2), ...pts(2, C, ROLE.result), curve(sampleMapped((px) => (px - 3) ** 2 / 1.5, 0, 6, Sc(2), 40), ROLE.aid), label(`r = ${f2(r[2])}`, P(centres[2], -2.1), ROLE.result, 'primary'), label('but y depends on x', P(centres[2], -2.7), ROLE.aid, 'primary')] },
    ],
  }
}

// ── 4. Descriptive statistics ────────────────────────────────────────────────

/** Eleven values; the same data is drawn as a dot plot, a histogram (bins of width 2) and a boxplot. */
export const DESC = { data: [2, 3, 3, 4, 4, 4, 5, 5, 6, 7, 9], u: 1.0, mid: 5.5, dotBase: 2.5, histBase: -0.2, histUnit: 0.35, boxY: -1.6, bins: [[2, 4], [4, 6], [6, 8], [8, 10]] } as const
/** Count of values in [lo, hi). */
export const binCount = (data: readonly number[], lo: number, hi: number) => data.filter((v) => v >= lo && v < hi).length

/** KG: methods for summarising and displaying data: mean, median, standard deviation; histograms, boxplots. */
export function buildDescriptiveStatisticsScene(): SceneSpec {
  return framed(raw_buildDescriptiveStatisticsScene())
}
function raw_buildDescriptiveStatisticsScene(): SceneSpec {
  const { data, u, mid, dotBase, histBase, histUnit, boxY, bins } = DESC
  const X = (v: number) => (v - mid) * u
  const fn = fiveNumber(data)
  const stack = new Map<number, number>()
  const dots = data.map((v) => { const k = stack.get(v) ?? 0; stack.set(v, k + 1); return dot(P(X(v), dotBase + 0.3 + k * 0.3), ROLE.output, 0.12) })
  const ticks = [2, 3, 4, 5, 6, 7, 8, 9].map((v) => label(String(v), P(X(v), boxY - 0.85), ROLE.reference, 'detail'))
  const hist = bins.flatMap(([lo, hi]) => { const h = binCount(data, lo, hi) * histUnit; return [...polyLines([[X(lo), histBase], [X(hi), histBase], [X(hi), histBase + h], [X(lo), histBase + h]], ROLE.output, 0.04), label(String(binCount(data, lo, hi)), P((X(lo) + X(hi)) / 2, histBase + h + 0.3), ROLE.ink, 'detail')] })
  const box = [
    ...polyLines([[X(fn.q1), boxY - 0.3], [X(fn.q3), boxY - 0.3], [X(fn.q3), boxY + 0.3], [X(fn.q1), boxY + 0.3]], ROLE.result, 0.05),
    line(P(X(fn.median), boxY - 0.3), P(X(fn.median), boxY + 0.3), ROLE.result, 0.09),
    ...bracket(X(fn.min), X(fn.q1), boxY, ROLE.result, 0.04, 0.2).slice(0, 2), line(P(X(fn.q3), boxY), P(X(fn.max), boxY), ROLE.result, 0.04), line(P(X(fn.max), boxY - 0.2), P(X(fn.max), boxY + 0.2), ROLE.result, 0.04),
  ]
  const m = meanOf(data), s = Math.sqrt(sampleVariance(data))
  return {
    id: 'math-descriptive-statistics',
    title: 'Descriptive statistics: one data set, three displays',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that descriptive statistics summarise data without inference: the same eleven values as a dot plot, a histogram and a boxplot with its five-number summary, plus the mean, median and standard deviation.',
    ariaLabel:
      'Eleven values 2, 3, 3, 4, 4, 4, 5, 5, 6, 7, 9 shown three ways on one number line: a dot plot with one dot per value stacked where they repeat, a histogram with bins 2 to 4, 4 to 6, 6 to 8 and 8 to 10 holding 3, 5, 2 and 1 values, and a boxplot with minimum 2, first quartile 3, median 4, third quartile 6 and maximum 9. The mean is 4.7 and the standard deviation is 2.0.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Eleven values: 2, 3, 3, 4, 4, 4, 5, 5, 6, 7, 9. A dot plot shows every value, stacking repeats.', objects: [line(P(X(1), dotBase), P(X(10), dotBase), ROLE.reference, 0.04), ...dots, ...ticks, label('dot plot', P(X(9.4), dotBase + 0.95), ROLE.output, 'primary')] },
      { narration: 'A histogram groups the values into bins of width 2 and shows how many fall in each: [2, 4) holds 3, [4, 6) holds 5, [6, 8) holds 2, [8, 10) holds 1. Total 11.', objects: [...hist, label('histogram', P(X(9.4), histBase + 1.2), ROLE.output, 'primary')] },
      { narration: 'A boxplot shows the five-number summary: minimum 2, Q₁ = 3, median 4, Q₃ = 6, maximum 9. Numerical summaries: mean 4.7, median 4, standard deviation 2.0. The long right tail pulls the mean above the median.', objects: [...box, label('boxplot', P(X(9.4), boxY + 0.7), ROLE.result, 'primary'), label(`mean ${f1(m)} · median ${fn.median} · s ${f1(s)}`, P(0, boxY - 1.5), ROLE.result, 'primary')] },
    ],
  }
}

// ── 5. Measures of center ────────────────────────────────────────────────────

/** The same eleven values, then one outlier (24). */
export const CENTER = { data: DESC.data, outlier: 24, u: 0.4, mid: 13, base: -0.2 } as const
export const medianOf = (xs: readonly number[]) => { const s = [...xs].sort((a, b) => a - b); return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2 }
export const modeOf = (xs: readonly number[]) => { const c = new Map<number, number>(); xs.forEach((v) => c.set(v, (c.get(v) ?? 0) + 1)); return [...c.entries()].sort((a, b) => b[1] - a[1] || a[0] - b[0])[0][0] }

/** KG: mean, median, mode; the mean is sensitive to outliers, the median robust. */
export function buildMeasuresOfCenterScene(): SceneSpec {
  return framed(raw_buildMeasuresOfCenterScene())
}
function raw_buildMeasuresOfCenterScene(): SceneSpec {
  const { data, outlier, u, mid, base } = CENTER
  const X = (v: number) => (v - mid) * u
  const m = meanOf(data), med = medianOf(data), mo = modeOf(data)
  const withOut = [...data, outlier]
  const stack = new Map<number, number>()
  const dots = data.map((v) => { const k = stack.get(v) ?? 0; stack.set(v, k + 1); return dot(P(X(v), base + 0.3 + k * 0.28), ROLE.output, 0.1) })
  const fulcrum = (v: number, color: string): SceneObject[] => polyLines([[X(v) - 0.3, base - 0.55], [X(v) + 0.3, base - 0.55], [X(v), base - 0.05]], color, 0.05)
  return {
    id: 'math-measures-of-center',
    title: 'Measures of center: mean, median, mode',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the mean as the balance point of the data, the median as the middle value and the mode as the most frequent value, and that one outlier drags the mean (4.7 to 6.3) while the median barely moves (4 to 4.5).',
    ariaLabel:
      'Eleven values on a number line as stacked dots. The mean 4.7 is the balance point under a triangle, the median 4 is marked by an arrow and the mode 4 by a ring around the tallest stack. Adding an outlier at 24 moves the mean to 6.3 but the median only to 4.5.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Eleven values as dots on a number line. The mean x̄ = Σx ÷ n = 52 ÷ 11 ≈ 4.7 is the balance point: put a fulcrum there and the line balances, because the distances to the left and right cancel exactly.', objects: [line(P(X(1), base), P(X(25), base), ROLE.reference, 0.05), ...dots, ...fulcrum(m, ROLE.result), label(`mean ${f1(m)}`, P(X(m), base - 1.0), ROLE.result, 'primary')] },
      { narration: 'The median is the middle value of the sorted data: the 6th of 11 is 4. The mode is the most frequent value: 4 appears three times.', objects: [arrow(P(X(med), base + 1.9), P(X(med), base + 1.2), ROLE.aid), label(`median ${med}`, P(X(med), base + 2.3), ROLE.aid, 'primary'), ...polyLines([[X(mo) - 0.2, base + 0.12], [X(mo) + 0.2, base + 0.12], [X(mo) + 0.2, base + 1.05], [X(mo) - 0.2, base + 1.05]], ROLE.input, 0.04), label(`mode ${mo}`, P(X(mo) - 1.3, base + 0.6), ROLE.input, 'primary')] },
      { narration: 'Add one outlier, 24. The mean jumps to 76 ÷ 12 ≈ 6.3, now to the right of almost every value. The median, the middle of 12 sorted values, is (4 + 5) ÷ 2 = 4.5. The mean is sensitive to outliers; the median is robust.', objects: [dot(P(X(outlier), base + 0.3), ROLE.input, 0.1), ...fulcrum(meanOf(withOut), ROLE.input), label(`outlier ${outlier}`, P(X(outlier), base + 0.8), ROLE.input, 'primary'), label(`mean ${f1(meanOf(withOut))}`, P(X(meanOf(withOut)), base - 1.0), ROLE.input, 'primary'), label(`median ${medianOf(withOut)}`, P(X(medianOf(withOut)) + 0.9, base + 2.9), ROLE.aid, 'primary')] },
    ],
  }
}

// ── 6. Measures of spread ────────────────────────────────────────────────────

export const SPREAD = { data: DESC.data, u: 1.0, mid: 5.5, dotBase: 1.7, rangeY: 0.4, iqrY: -1.0, sdY: -2.5 } as const

/** KG: range, IQR, sample variance s² = Σ(xᵢ − x̄)²/(n − 1), sample SD, five-number summary. */
export function buildMeasuresOfSpreadScene(): SceneSpec {
  return framed(raw_buildMeasuresOfSpreadScene())
}
function raw_buildMeasuresOfSpreadScene(): SceneSpec {
  const { data, u, mid, dotBase, rangeY, iqrY, sdY } = SPREAD
  const X = (v: number) => (v - mid) * u
  const fn = fiveNumber(data)
  const m = meanOf(data), s2 = sampleVariance(data), s = Math.sqrt(s2)
  const stack = new Map<number, number>()
  const dots = data.map((v) => { const k = stack.get(v) ?? 0; stack.set(v, k + 1); return dot(P(X(v), dotBase + 0.3 + k * 0.28), ROLE.reference, 0.11) })
  return {
    id: 'math-measures-of-spread',
    title: 'Measures of spread: range, IQR, standard deviation',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show three measures of spread on the same data: the range (maximum minus minimum), the interquartile range (Q3 minus Q1, robust) and the sample standard deviation s = √(Σ(x − x̄)²/(n − 1)).',
    ariaLabel:
      'Eleven data values as dots. The range bracket spans from 2 to 9, length 7. The interquartile box spans the first quartile 3 to the third quartile 6, length 3. The mean 4.7 plus and minus the standard deviation 2.0 spans about 2.7 to 6.7, with sample variance 4.02.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The same eleven values. The range is the simplest spread: maximum − minimum = 9 − 2 = 7. It uses only the two extreme values, so one outlier changes it completely.', objects: [line(P(X(1), dotBase), P(X(10), dotBase), ROLE.reference, 0.04), ...dots, ...bracket(X(fn.min), X(fn.max), rangeY, ROLE.aid, 0.06), label(`range = ${fn.max} − ${fn.min} = ${fn.max - fn.min}`, P(0, rangeY - 0.55), ROLE.aid, 'primary')] },
      { narration: 'The interquartile range IQR = Q₃ − Q₁ = 6 − 3 = 3 is the width of the box holding the middle half of the data. Quartiles ignore the extremes, so the IQR is robust.', objects: [...polyLines([[X(fn.q1), iqrY - 0.3], [X(fn.q3), iqrY - 0.3], [X(fn.q3), iqrY + 0.3], [X(fn.q1), iqrY + 0.3]], ROLE.output, 0.05), line(P(X(fn.median), iqrY - 0.3), P(X(fn.median), iqrY + 0.3), ROLE.output, 0.09), label(`IQR = ${fn.q3} − ${fn.q1} = ${fn.q3 - fn.q1}`, P(0, iqrY - 0.8), ROLE.output, 'primary')] },
      { narration: 'The sample standard deviation measures typical distance from the mean: s² = Σ(x − x̄)² ÷ (n − 1) = 40.2 ÷ 10 = 4.02, so s = √4.02 ≈ 2.0 (dividing by n − 1, Bessel’s correction, makes s² an unbiased estimate). The band x̄ ± s runs from 2.7 to 6.7.', objects: [...bracket(X(m - s), X(m + s), sdY, ROLE.result, 0.06), dot(P(X(m), sdY), ROLE.result, 0.13), label(`s = ${f1(s)}: mean ± s`, P(0, sdY - 0.55), ROLE.result, 'primary'), label(`s² = ${f1(sum(data.map((v) => (v - m) ** 2)))} ÷ ${data.length - 1} = ${f2(s2)}`, P(0, sdY - 1.1), ROLE.result, 'primary')] },
    ],
  }
}

// ── 7. Percentile ────────────────────────────────────────────────────────────

/** Twenty sorted values, drawn as four groups of five; a percentile cut falls between the two values it separates. */
export const PCT = { data: [12, 15, 18, 21, 24, 26, 28, 30, 32, 35, 38, 40, 42, 44, 47, 50, 52, 55, 58, 60], u: 0.17, mid: 36, y: 0.0 } as const
/** The p-th percentile of n sorted values: the cut midway between the values ranked n p / 100 and n p / 100 + 1 (when n p / 100 is whole). */
export const percentileCut = (sorted: readonly number[], p: number): number => { const k = (sorted.length * p) / 100; return Number.isInteger(k) ? (sorted[k - 1] + sorted[k]) / 2 : sorted[Math.ceil(k) - 1] }

/** KG: the p-th percentile is the value below which p% of the data fall; Q1 = 25th, median = 50th, Q3 = 75th; IQR = Q3 − Q1. */
export function buildPercentileScene(): SceneSpec {
  return framed(raw_buildPercentileScene())
}
function raw_buildPercentileScene(): SceneSpec {
  const { data, u, mid, y } = PCT
  const X = (v: number) => (v - mid) * u
  const q = [25, 50, 75].map((p) => percentileCut(data, p))
  const group = (i: number) => (Math.floor(i / 5) % 2 === 0 ? ROLE.output : ROLE.aid)
  return {
    id: 'math-percentile',
    title: 'Percentile: the value with p% of the data below it',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show percentiles on twenty sorted values: the 25th, 50th and 75th percentiles split the data into four groups of five, and the interquartile range is the distance between the 25th and 75th.',
    ariaLabel:
      'Twenty sorted values from 12 to 60 as dots on a number line, coloured in four groups of five. A cut at 25 has 5 values (25 percent) below it, a cut at 36.5 has 10 (50 percent), and a cut at 48.5 has 15 (75 percent). The interquartile range is 48.5 minus 25, which is 23.5.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Twenty values in increasing order. A percentile asks: below which value does p% of the data lie? Here each group of five values is 25% of the data (n = 20).', objects: [line(P(X(10), y - 0.35), P(X(62), y - 0.35), ROLE.reference, 0.04), ...data.map((v, i) => dot(P(X(v), y), group(i), 0.12)), label('20 sorted values', P(0, y - 0.95), ROLE.ink, 'primary')] },
      { narration: 'The 25th percentile Q₁ has 5 of 20 values (25%) below it: it sits between the 5th value 24 and the 6th value 26, at 25. The 50th percentile (the median) has 10 below: between 35 and 38, at 36.5. The 75th percentile Q₃ has 15 below: between 47 and 50, at 48.5.', objects: [...q.flatMap((v, i) => [line(P(X(v), y - 0.8), P(X(v), y + 0.8), ROLE.result, 0.05), label(`Q${['₁', '₂', '₃'][i]} = ${v}`, P(X(v), y + 1.3), ROLE.result, 'primary')])] },
      { narration: 'The interquartile range is the distance from Q₁ to Q₃: 48.5 − 25 = 23.5. It contains the middle 50% of the data (10 of the 20 values).', objects: [...bracket(X(q[0]), X(q[2]), y - 2.0, ROLE.input, 0.06), label(`IQR = ${q[2]} − ${q[0]} = ${q[2] - q[0]}`, P(X((q[0] + q[2]) / 2), y - 2.55), ROLE.input, 'primary')] },
    ],
  }
}

// ── 8. Sampling distribution ─────────────────────────────────────────────────

/** A population N(100, 15²). Sample means of size n have sd σ/√n (the standard error). t = x − 100, drawn at u screen units per unit. */
export const SAMP = { mu: 100, sigma: 15, ns: [1, 4, 16], u: 0.1, yScale: 28, oy: -1.5 } as const
export const standardError = (sigma: number, n: number) => sigma / Math.sqrt(n)

/** KG: for X̄, E[X̄] = μ and SD(X̄) = σ/√n (the standard error); by the CLT X̄ is approximately normal for large n. */
export function buildSamplingDistributionScene(): SceneSpec {
  return framed(raw_buildSamplingDistributionScene())
}
function raw_buildSamplingDistributionScene(): SceneSpec {
  const { sigma, ns, u, yScale, oy } = SAMP
  const S = (t: number, y: number): V3 => P(t * u, y * yScale + oy)
  const colours = [ROLE.ink, ROLE.output, ROLE.result]
  const bell = (n: number, color: string) => curve(sampleMapped((t) => normPdf(t, 0, standardError(sigma, n)), -30, 30, S, 80), color)
  return {
    id: 'math-sampling-distribution',
    title: 'Sampling distribution of the mean: narrower as n grows',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that the sample mean X̄ is centred at the population mean μ but has standard deviation σ/√n: the bell for n = 4 is half as wide as the population, and for n = 16 a quarter as wide.',
    ariaLabel:
      'Three bell curves centred at the population mean 100. The wide one is the population with standard deviation 15. The sample mean of 4 values has standard error 7.5, half as wide and twice as tall. The sample mean of 16 values has standard error 3.75, a quarter as wide and four times as tall. All have the same area, 1.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A population with mean μ = 100 and standard deviation σ = 15. Single values (samples of size 1) spread out like this.', objects: [...mathAxes(S, -35, 35, -0.004, 0.12), bell(ns[0], colours[0]), label('μ = 100', P(0, oy - 0.6), ROLE.ink, 'primary'), label('population σ = 15', P(2.9, 1.9), ROLE.ink, 'primary')] },
      { narration: 'Take many samples of 4 and plot each sample mean. They are still centred at 100, but averaging cancels some of the variation: the standard error is σ/√n = 15 ÷ 2 = 7.5, half as wide.', objects: [bell(ns[1], colours[1]), label(`n = 4: SE = ${standardError(sigma, 4)}`, P(2.9, 1.4), ROLE.output, 'primary')] },
      { narration: 'Samples of 16: the standard error is 15 ÷ 4 = 3.75, a quarter of the population spread. Quadrupling n halves the standard error. By the central limit theorem these sample means are close to normal for large n.', objects: [bell(ns[2], colours[2]), label(`n = 16: SE = ${standardError(sigma, 16)}`, P(2.9, 0.9), ROLE.result, 'primary')] },
    ],
  }
}

// ── 9. Confidence interval ───────────────────────────────────────────────────

/** 20 samples of n = 25 from N(50, 10²): each gives x̄ ± 1.96 σ/√n (SE = 2, half-width 3.92). Seed 1 is the first run with exactly one miss, not too extreme. */
export const CI = { mu: 50, sigma: 10, n: 25, rows: 20, seed: 1, u: 0.5, top: 2.5, gap: 0.26, z: 1.96 } as const
const gauss = (r: () => number) => { const a = Math.max(r(), 1e-12), b = r(); return Math.sqrt(-2 * Math.log(a)) * Math.cos(2 * Math.PI * b) }
export const ciMeans = (): number[] => { const r = mulberry32(CI.seed); return Array.from({ length: CI.rows }, () => CI.mu + (CI.sigma / Math.sqrt(CI.n)) * gauss(r)) }
export const ciHalfWidth = () => (CI.z * CI.sigma) / Math.sqrt(CI.n)
export const ciContains = (xbar: number) => Math.abs(xbar - CI.mu) <= ciHalfWidth()

/** KG: [L, U] with P(L ≤ θ ≤ U) = 1 − α; the 95% CI for μ with known σ is x̄ ± 1.96σ/√n; in repeated sampling 95% of such intervals contain θ. */
export function buildConfidenceIntervalScene(): SceneSpec {
  return framed(raw_buildConfidenceIntervalScene())
}
function raw_buildConfidenceIntervalScene(): SceneSpec {
  const { mu, u, top, gap } = CI
  const means = ciMeans(), hw = ciHalfWidth()
  const X = (v: number) => (v - mu) * u
  const rowY = (i: number) => top - i * gap
  const interval = (i: number): SceneObject[] => {
    const c = ciContains(means[i]) ? ROLE.output : ROLE.input
    return [line(P(X(means[i] - hw), rowY(i)), P(X(means[i] + hw), rowY(i)), c, 0.04), dot(P(X(means[i]), rowY(i)), c, 0.07)]
  }
  const miss = means.findIndex((v) => !ciContains(v))
  const hits = means.filter(ciContains).length
  return {
    id: 'math-confidence-interval',
    title: 'Confidence interval: most intervals catch the true mean',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show what 95% confidence means: the true mean μ is fixed, each sample gives its own interval x̄ ± 1.96σ/√n, and across repeated samples about 95% of the intervals contain μ (here 19 of 20).',
    ariaLabel:
      'A vertical line marks the true mean 50. Twenty horizontal intervals, one per sample, each centred on its sample mean with half-width 3.92. Nineteen cross the true mean line (blue); one, from the twelfth sample, lies entirely to the left of it (red).',
    stage: NO_STAGE,
    steps: [
      { narration: 'The true mean μ = 50 is fixed (violet line). One sample of n = 25 (σ = 10) gives x̄ = 51.9 and the interval x̄ ± 1.96·σ/√n = 51.9 ± 1.96 × 2 = 51.9 ± 3.92, which contains μ.', objects: [line(P(0, -2.9), P(0, 3.1), ROLE.aid, 0.04), label('μ = 50', P(0, 3.45), ROLE.aid, 'primary'), ...interval(0), label('x̄ ± 1.96 SE', P(X(means[0]) + 0.1, rowY(0) + 0.5), ROLE.output, 'primary')] },
      { narration: 'Repeat with 19 more samples. Each has its own x̄ and its own interval. Blue intervals contain μ; a red one would miss it.', objects: [...Array.from({ length: CI.rows - 1 }, (_, k) => interval(k + 1)).flat()] },
      { narration: 'Only the 12th interval misses μ: 19 of 20 = 95% contain it. That is what “95% confidence” means: a method that captures the true mean in 95% of repeated samples, not a 95% probability for any one interval.', objects: [ring(X(means[miss]), rowY(miss), ROLE.input, 0.22), label(`${hits} of ${CI.rows} contain μ`, P(2.4, -3.2), ROLE.result, 'primary')] },
    ],
  }
}

// ── 10. Confidence interval for a mean ───────────────────────────────────────

/** t critical value for 95% with 9 degrees of freedom (n = 10); z = 1.96. */
export const CIM = { xbar: 50, sigma: 10, z: 1.96, t9: 2.262, u: 0.3, rowN4: 1.9, rowN16: 0.8, rowN64: -0.3, rowZ: -1.6, rowT: -2.5, n10: 10 } as const
export const zHalfWidth = (sigma: number, n: number) => (CIM.z * sigma) / Math.sqrt(n)
export const tHalfWidth = (s: number, n: number) => (CIM.t9 * s) / Math.sqrt(n)

/** KG: known σ: x̄ ± z σ/√n; unknown σ: x̄ ± t_{n−1} s/√n (wider); the width decreases with larger n. */
export function buildCiMeanScene(): SceneSpec {
  return framed(raw_buildCiMeanScene())
}
function raw_buildCiMeanScene(): SceneSpec {
  const { xbar, sigma, u, rowN4, rowN16, rowN64, rowZ, rowT, n10 } = CIM
  const X = (v: number) => (v - xbar) * u
  const row = (hw: number, y: number, color: string): SceneObject[] => [...bracket(X(xbar - hw), X(xbar + hw), y, color, 0.06), dot(P(0, y), color, 0.1)]
  const tag = (text: string, y: number, color: string) => label(text, P(0, y + 0.45), color, 'primary')
  return {
    id: 'math-ci-mean',
    title: 'Confidence interval for a mean: z and t',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the interval x̄ ± z σ/√n for a mean: it halves in width when n is multiplied by 4, and when σ is unknown and estimated by s the t-interval (critical value 2.262 for 9 degrees of freedom) is wider than the z-interval.',
    ariaLabel:
      'Intervals around a sample mean of 50 with known standard deviation 10. For n equal to 4, 16 and 64 the half-widths are 9.8, 4.9 and 2.45, each half the one before. Below, for n = 10 with s = 10, the z-interval has half-width 6.20 and the t-interval is wider, 7.15.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Known σ = 10, n = 16, x̄ = 50: the 95% interval is x̄ ± z·σ/√n = 50 ± 1.96 × 10 ÷ 4 = 50 ± 4.9, that is 45.1 to 54.9.', objects: [line(P(0, -3.0), P(0, 2.9), ROLE.reference, 0.025), ...row(zHalfWidth(sigma, 16), rowN16, ROLE.output), tag(`n = 16: ±${f1(zHalfWidth(sigma, 16))}`, rowN16, ROLE.output), label('σ = 10 known', P(0, 3.3), ROLE.ink, 'primary')] },
      { narration: 'Width depends on n. n = 4 gives ± 9.8, n = 64 gives ± 2.45. Each time n is multiplied by 4 the half-width halves, because it is proportional to 1/√n: a narrower, more precise interval needs more data.', objects: [...row(zHalfWidth(sigma, 4), rowN4, ROLE.input), tag(`n = 4: ±${f1(zHalfWidth(sigma, 4))}`, rowN4, ROLE.input), ...row(zHalfWidth(sigma, 64), rowN64, ROLE.result), tag(`n = 64: ±${f2(zHalfWidth(sigma, 64))}`, rowN64, ROLE.result)] },
      { narration: 'If σ is unknown and estimated by s = 10 from n = 10 values, use the t-distribution with n − 1 = 9 degrees of freedom: t = 2.262 instead of 1.96. The t-interval ±7.15 is wider than the z-interval ±6.20: it pays for the extra uncertainty in s.', objects: [...row(zHalfWidth(sigma, n10), rowZ, ROLE.output), tag(`z ±${f2(zHalfWidth(sigma, n10))}`, rowZ, ROLE.output), ...row(tHalfWidth(sigma, n10), rowT, ROLE.input), tag(`t ±${f2(tHalfWidth(sigma, n10))}`, rowT, ROLE.input)] },
    ],
  }
}

// ── 11. Confidence interval for a proportion ─────────────────────────────────

export const CIP = { phat: 0.6, ns: [100, 400], z: 1.96, u: 12, k: 0.16, oy: -1.4, steps: 16 } as const
export const proportionSE = (p: number, n: number) => Math.sqrt((p * (1 - p)) / n)
export const proportionInterval = (p: number, n: number): [number, number] => { const h = CIP.z * proportionSE(p, n); return [p - h, p + h] }

/** KG: p̂ ± z √(p̂(1 − p̂)/n), valid when n p̂ ≥ 10 and n(1 − p̂) ≥ 10 (normal approximation to the binomial). */
export function buildCiProportionScene(): SceneSpec {
  return framed(raw_buildCiProportionScene())
}
function raw_buildCiProportionScene(): SceneSpec {
  const { phat, ns, u, k, oy, steps } = CIP
  const S = (p: number, y: number): V3 => P((p - phat) * u, y * k + oy)
  const bell = (n: number, color: string) => curve(sampleMapped((p) => normPdf(p, phat, proportionSE(phat, n)), phat - 3.2 * proportionSE(phat, n), phat + 3.2 * proportionSE(phat, n), S, 64), color)
  const hatch = (n: number, color: string) => { const [lo, hi] = proportionInterval(phat, n); return vHatch(S, (p) => normPdf(p, phat, proportionSE(phat, n)), zero, lo, hi, (hi - lo) / steps, color) }
  const bar = (n: number, y: number, color: string) => { const [lo, hi] = proportionInterval(phat, n); return [...bracket(S(lo, 0)[0], S(hi, 0)[0], y, color, 0.06), label(`n = ${n}: [${lo.toFixed(3)}, ${hi.toFixed(3)}]`, P(0, y - 0.5), color, 'primary')] }
  return {
    id: 'math-ci-proportion',
    title: 'Confidence interval for a proportion',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the interval p̂ ± z√(p̂(1 − p̂)/n) for a proportion: with p̂ = 0.6 from n = 100 the normal approximation gives 0.504 to 0.696, and quadrupling n to 400 halves the interval to 0.552 to 0.648.',
    ariaLabel:
      'A number line from 0.4 to 0.8 with the sample proportion 0.6 marked. A bell curve centred at 0.6 with standard error 0.049 has its middle 95 percent shaded, from 0.504 to 0.696. With n = 400 the bell is half as wide, standard error 0.024, and the interval is 0.552 to 0.648.',
    stage: NO_STAGE,
    steps: [
      { narration: '60 of n = 100 people say yes: p̂ = 0.6. The interval uses the normal approximation, which is valid when n p̂ = 60 ≥ 10 and n(1 − p̂) = 40 ≥ 10. Both hold.', objects: [arrow(P(S(0.4, 0)[0], oy), P(S(0.8, 0)[0], oy), ROLE.reference), ...[0.4, 0.5, 0.6, 0.7, 0.8].map((p) => label(String(p).replace('0.', '.'), P(S(p, 0)[0], oy - 0.4), ROLE.reference, 'detail')), dot(P(0, oy), ROLE.result, 0.12), label('p̂ = 0.6', P(0, oy + 0.55), ROLE.result, 'primary'), label('n p̂ = 60 ≥ 10, n(1 − p̂) = 40 ≥ 10', P(0, 2.0), ROLE.ink, 'primary')] },
      { narration: 'p̂ varies from sample to sample with standard error √(p̂(1 − p̂)/n) = √(0.24 ÷ 100) ≈ 0.049. The middle 95% of that bell is p̂ ± 1.96 × 0.049 = 0.6 ± 0.096, so 0.504 to 0.696.', objects: [bell(ns[0], ROLE.ink), ...hatch(ns[0], ROLE.output), ...bar(ns[0], oy - 1.1, ROLE.output)] },
      { narration: 'Quadruple the sample to n = 400: the standard error halves to 0.024 and the interval narrows to 0.6 ± 0.048, that is 0.552 to 0.648. More data, a narrower interval.', objects: [bell(ns[1], ROLE.result), ...hatch(ns[1], ROLE.result), ...bar(ns[1], oy - 2.4, ROLE.result)] },
    ],
  }
}

// ── 12. Hypothesis testing ───────────────────────────────────────────────────

/** Two-sided z test at α = 0.05: H0 says z ~ N(0, 1); critical value 1.96; observed z = 2.4. */
export const HT = { crit: 1.96, observed: 2.4, tailEnd: 3.3, tailSteps: 12, yScale: 8, oy: -1.5 } as const
export const rejects = (z: number) => Math.abs(z) > HT.crit

/** KG: decide between H0 and H1 using a test statistic: reject H0 when it falls in the rejection region (probability α under H0). */
export function buildHypothesisTestingScene(): SceneSpec {
  return framed(raw_buildHypothesisTestingScene())
}
function raw_buildHypothesisTestingScene(): SceneSpec {
  const { crit, observed, tailEnd, tailSteps, yScale, oy } = HT
  const S = (z: number, y: number): V3 => P(z, y * yScale + oy)
  const pdf = (z: number) => normPdf(z)
  const tail = (a: number, b: number) => vHatch(S, pdf, zero, a, b, (b - a) / tailSteps, ROLE.input)
  return {
    id: 'math-hypothesis-testing',
    title: 'Hypothesis testing: is the result in the rejection region?',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a two-sided z test at α = 0.05: assume H0 so the statistic is N(0, 1); the rejection region is |z| > 1.96 (probability 0.025 in each tail); an observed z = 2.4 lies inside it, so H0 is rejected.',
    ariaLabel:
      'A bell curve for the test statistic z when the null hypothesis is true, centred at 0. The two tails beyond minus 1.96 and 1.96, each of probability 0.025, are shaded red as the rejection region, total 0.05. The observed statistic z equals 2.4 falls inside the right-hand tail, so the null hypothesis is rejected.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Assume the null hypothesis H₀ is true. Then the test statistic z follows the standard normal distribution: values near 0 are typical, values far out are rare.', objects: [...mathAxes(S, -3.6, 3.6, -0.01, 0.46), curve(sampleMapped(pdf, -3.5, 3.5, S, 70), ROLE.ink), label('H₀ true: z ~ N(0, 1)', P(-2.4, 1.9), ROLE.ink, 'primary')] },
      { narration: 'Choose the significance level α = 0.05. The rejection region is the most extreme 5% of the distribution: |z| > 1.96, which is 0.025 in each tail. A result there would be unlikely if H₀ were true.', objects: [...tail(crit, tailEnd), ...tail(-tailEnd, -crit), label('−1.96', P(-crit, oy - 0.4), ROLE.input, 'detail'), label('1.96', P(crit, oy - 0.4), ROLE.input, 'detail'), label('α = 0.05: 0.025 + 0.025', P(0, oy - 1.1), ROLE.input, 'primary')] },
      { narration: 'The data give an observed statistic z = 2.4, which is greater than 1.96: it falls in the rejection region, so we reject H₀ at the 5% level. (Had it landed in the middle, we would fail to reject.)', objects: [dot(P(observed, oy), ROLE.result, 0.14), arrow(P(observed, -0.3), P(observed, oy + 0.3), ROLE.result), label('observed z = 2.4', P(3.0, 0.7), ROLE.result, 'primary'), label('reject H\u2080', P(3.0, 0.2), ROLE.result, 'primary')] },
    ],
  }
}
