/**
 * Core school-mathematics figures — batch 8 of the mathematics visual campaign
 * (2026-10-11): probability.
 *
 * Events on a die, the law of total probability as an area model, a PMF beside its
 * CDF, binomial bars, three continuous densities with probability as area, quantiles
 * read off a CDF, variance as squared deviations, the standard deviation as a ruler,
 * the joint / marginal / conditional distribution of two coin-like variables, and the
 * law of large numbers. Same rules as batches 1-7: one visual language from
 * visualDesign.ts, labels are names not sentences (marks of 1-2 characters are free,
 * which the probability tables use: ".4", ".1"), steps are cumulative, coordinates
 * stay inside +-5, at most 50 objects per step, nothing the figure audit rejects, and
 * every number drawn comes from the constants and pure helpers exported here, which
 * the test file re-derives independently from the DRAWN coordinates.
 *
 * Colour roles keep their meaning: red is the input / the given, blue is what is
 * produced or compared, green is the result, violet is a construction aid, slate is
 * axes and inert reference geometry.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, sampleMapped, guide, axes2, mathAxes, polyLines, shadeConvex, arcPts, type XY, type V3 } from './mathSceneKit'
import { vHatch } from './mathCoreScenesB7'

const ring = (x: number, y: number, color: string, r = 0.11): SceneObject => curve(arcPts(x, y, r, 0, 360, 24), color)
/** An ellipse outline about (cx, cy) with radii rx, ry. */
const ellipse = (cx: number, cy: number, rx: number, ry: number, color: string): SceneObject =>
  curve(Array.from({ length: 64 }, (_, i) => { const a = (2 * Math.PI * i) / 63; return P(cx + rx * Math.cos(a), cy + ry * Math.sin(a)) }), color)
/** A vertical bar from the axis (y = 0 of S) up to height h, drawn as one thick cylinder. */
const bar = (S: (x: number, y: number) => V3, x: number, h: number, color: string, width = 0.34): SceneObject =>
  // a bar too short to draw (its two ends round to the same point) is shown as a dot on the axis, never a zero-length bond
  Math.abs(S(x, h)[1] - S(x, 0)[1]) < 0.05 ? dot(S(x, 0), color, Math.max(width, 0.1)) : line(S(x, 0), S(x, h), color, width)
const f2 = (n: number) => (Math.round(n * 100) / 100).toFixed(2)

/** Standard normal CDF and density; the CDF by the Abramowitz and Stegun 7.1.26 erf (error below 1.5e-7). */
export function erf(x: number): number {
  const s = x < 0 ? -1 : 1, a = Math.abs(x), t = 1 / (1 + 0.3275911 * a)
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a)
  return s * y
}
export const phi = (x: number) => 0.5 * (1 + erf(x / Math.SQRT2))
export const normPdf = (x: number, mu = 0, sd = 1) => Math.exp(-((x - mu) ** 2) / (2 * sd * sd)) / (sd * Math.sqrt(2 * Math.PI))

// ── 1. Event ─────────────────────────────────────────────────────────────────

/** One roll of a die: Ω = {1..6}; A = even = {2, 4, 6}; B = more than 4 = {5, 6}. */
export const EVENT = {
  pos: { 1: [-2, 0.9], 3: [0, 0.9], 5: [2, 0.9], 2: [-2, -0.9], 4: [0, -0.9], 6: [2, -0.9] } as Record<number, XY>,
  A: [2, 4, 6], B: [5, 6],
} as const

/** KG: a subset A of the sample space Ω to which a probability can be assigned. */
export function buildEventScene(): SceneSpec {
  return framed(raw_buildEventScene())
}
function raw_buildEventScene(): SceneSpec {
  const { pos, A, B } = EVENT
  const outcomes = [1, 2, 3, 4, 5, 6]
  const draw = (): SceneObject[] => outcomes.flatMap((n) => [dot(P(pos[n][0], pos[n][1]), ROLE.reference, 0.12), label(String(n), P(pos[n][0], pos[n][1] + 0.4), ROLE.ink, 'primary')])
  return {
    id: 'math-event',
    title: 'Event: a set of outcomes',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show an event as a subset of the sample space: for one roll of a die, "even" is the set {2, 4, 6} and "more than 4" is {5, 6}, and the probability of an event is the share of outcomes in it.',
    ariaLabel:
      'The six outcomes of rolling a die inside a box, the sample space. The event A, rolling an even number, is the set 2, 4, 6 with probability 3 over 6. The event B, rolling more than 4, is the set 5, 6 with probability 2 over 6. They overlap at the outcome 6.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Roll a die. The sample space Ω is the set of all possible outcomes: 1, 2, 3, 4, 5, 6.', objects: [...polyLines([[-3.4, -2.0], [3.4, -2.0], [3.4, 2.0], [-3.4, 2.0]], ROLE.reference, 0.04), ...draw(), label('sample space Ω', P(-2.0, 2.45), ROLE.ink, 'primary')] },
      { narration: 'An event is a set of outcomes. A = “roll an even number” = {2, 4, 6}. Its probability is the share of outcomes in it: P(A) = 3/6 = 1/2.', objects: [ellipse(0, -0.9, 3.1, 0.78, ROLE.output), label('A: even', P(-2.7, -1.9), ROLE.output, 'primary'), label('P(A) = 3/6 = 1/2', P(0, -2.45), ROLE.output, 'primary')] },
      { narration: 'Another event B = “roll more than 4” = {5, 6}, with P(B) = 2/6 = 1/3. Events can overlap: both A and B happen when the die shows 6, A ∩ B = {6}.', objects: [ellipse(2, 0, 0.8, 1.9, ROLE.input), label('B: more than 4', P(2.2, 2.45), ROLE.input, 'primary'), label('P(B) = 2/6 = 1/3', P(2.2, 2.95), ROLE.input, 'primary'), label('A ∩ B = {6}', P(2.9, -2.45), ROLE.result, 'primary')] },
    ],
  }
}

// ── 2. Law of total probability ──────────────────────────────────────────────

/** B1, B2, B3 partition Ω with P = 0.5, 0.3, 0.2; P(A | B) = 0.1, 0.4, 0.5; P(A) = 0.27. */
export const TOTAL = { W: 6, H: 2.4, pb: [0.5, 0.3, 0.2], pab: [0.1, 0.4, 0.5] } as const
export const totalProbability = (pb: readonly number[], pab: readonly number[]) => pb.reduce((s, p, i) => s + p * pab[i], 0)

/** KG: if {B₁,…,Bₙ} partitions Ω then P(A) = Σ P(A|Bᵢ) P(Bᵢ). */
export function buildTotalProbabilityScene(): SceneSpec {
  return framed(raw_buildTotalProbabilityScene())
}
function raw_buildTotalProbabilityScene(): SceneSpec {
  const { W, H, pb, pab } = TOTAL
  const x0 = -W / 2, y0 = -H / 2
  const edges = pb.reduce<number[]>((acc, p) => [...acc, acc[acc.length - 1] + p * W], [x0])
  const centres = pb.map((_, i) => (edges[i] + edges[i + 1]) / 2)
  const names = ['B₁', 'B₂', 'B₃']
  const total = totalProbability(pb, pab)
  const col = (i: number): XY[] => [[edges[i], y0], [edges[i + 1], y0], [edges[i + 1], y0 + H], [edges[i], y0 + H]]
  const aRect = (i: number): XY[] => [[edges[i], y0], [edges[i + 1], y0], [edges[i + 1], y0 + pab[i] * H], [edges[i], y0 + pab[i] * H]]
  return {
    id: 'math-total-probability',
    title: 'Law of total probability: P(A) = Σ P(A | Bᵢ) P(Bᵢ)',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show P(A) as a sum over a partition: split the sample space into pieces B1, B2, B3 whose widths are P(Bi); inside each piece the part where A happens has height P(A | Bi); the total shaded area is P(A).',
    ariaLabel:
      'A box split into three columns B1, B2, B3 whose widths are the probabilities 0.5, 0.3 and 0.2. In each column the shaded part, where event A happens, has height 0.1, 0.4 and 0.5 of the column. The shaded areas are 0.5 times 0.1, 0.3 times 0.4 and 0.2 times 0.5, which are 0.05, 0.12 and 0.10, and they add to P of A equals 0.27.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Split all outcomes into pieces that do not overlap and cover everything: B₁, B₂, B₃ (a partition). The width of each column is its probability: 0.5, 0.3, 0.2.', objects: [...[0, 1, 2].flatMap((i) => polyLines(col(i), ROLE.reference, 0.04)), ...names.map((n, i) => label(n, P(centres[i], y0 + H + 0.5), ROLE.ink, 'primary')), ...pb.map((p, i) => label(String(p), P(centres[i], y0 + H + 1.0), ROLE.reference, 'detail'))] },
      { narration: 'Inside each column, the part where event A happens is a fraction of the column: P(A | B₁) = 0.1, P(A | B₂) = 0.4, P(A | B₃) = 0.5. Shade those parts.', objects: [...[0, 1, 2].flatMap((i) => [...shadeConvex(aRect(i), 0.12, ROLE.output), ...polyLines(aRect(i), ROLE.output, 0.04)]), ...pab.map((p, i) => label(String(p), P(centres[i], y0 - 0.45), ROLE.output, 'detail'))] },
      { narration: 'The shaded area is the probability of A. Column by column: 0.5 × 0.1 + 0.3 × 0.4 + 0.2 × 0.5 = 0.05 + 0.12 + 0.10 = 0.27. That is the law of total probability: P(A) = Σ P(A | Bᵢ) P(Bᵢ).', objects: [label(`P(A) = 0.5·0.1 + 0.3·0.4 + 0.2·0.5 = ${f2(total)}`, P(0, y0 - 1.3), ROLE.result, 'primary')] },
    ],
  }
}

// ── 3. Probability distribution (PMF and CDF) ────────────────────────────────

/** X = number of heads in two fair coin flips: P(0, 1, 2) = 1/4, 1/2, 1/4. Both charts share the x spacing; each has its own height scale. */
export const DIST = { xs: [0, 1, 2], pmf: [0.25, 0.5, 0.25], sx: 1.1, syPmf: 4.4, syCdf: 2.7, oxL: -3.9, oxR: 1.8, oy: -1.6 } as const
export const cdfAt = (x: number) => (DIST.xs as readonly number[]).reduce<number>((s, v, i) => (v <= x ? s + DIST.pmf[i] : s), 0)

/** KG: the complete description of a random variable, by its PMF or CDF. */
export function buildDistributionScene(): SceneSpec {
  return framed(raw_buildDistributionScene())
}
function raw_buildDistributionScene(): SceneSpec {
  const { xs, pmf, sx, syPmf, syCdf, oxL, oxR, oy } = DIST
  const SL = (x: number, y: number): V3 => P(oxL + x * sx, y * syPmf + oy)
  const SR = (x: number, y: number): V3 => P(oxR + x * sx, y * syCdf + oy)
  const chartAxes = (S: (x: number, y: number) => V3, y1: number) => axes2(S(-0.7, 0)[0], oy, S(-0.7, 0)[0], S(2.7, 0)[0], oy, S(0, y1)[1])
  const digits = (S: (x: number, y: number) => V3) => xs.map((x) => label(String(x), P(S(x, 0)[0], oy - 0.4), ROLE.reference, 'detail'))
  const names = ['1/4', '1/2', '1/4']
  return {
    id: 'math-distribution',
    title: 'Probability distribution: the PMF and the CDF',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that a distribution can be described by its probability mass function (the height at each value) or by its cumulative distribution function (the running total), here for the number of heads in two coin flips.',
    ariaLabel:
      'Left: bars showing the probabilities of 0, 1 and 2 heads in two fair coin flips: 1 quarter, 1 half, 1 quarter. Right: the same distribution as a cumulative step graph, which jumps to 0.25 at 0, to 0.75 at 1 and to 1 at 2. The jump at 1 is 0.5, exactly the height of the bar at 1. Each is a complete description of the same distribution.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Flip a fair coin twice and let X be the number of heads. The probability mass function gives the probability of each value: P(0) = 1/4, P(1) = 1/2, P(2) = 1/4. They add to 1.', objects: [...chartAxes(SL, 0.65), ...xs.map((x, i) => bar(SL, x, pmf[i], ROLE.output, 0.4)), ...xs.map((x, i) => label(names[i], P(SL(x, 0)[0], SL(x, pmf[i])[1] + 0.45), ROLE.output, 'detail')), ...digits(SL), label('P(X = x)', P(oxL + 1, 1.9), ROLE.output, 'primary')] },
      { narration: 'The cumulative distribution function adds up as you go: F(x) = P(X ≤ x). It is 0 before x = 0, jumps to 1/4 at x = 0, to 3/4 at x = 1 (1/4 + 1/2), and to 1 at x = 2. A filled dot marks the value that counts at each jump.', objects: [...chartAxes(SR, 1.25), line(SR(-0.6, 0), SR(0, 0), ROLE.result, 0.05), line(SR(0, 0.25), SR(1, 0.25), ROLE.result, 0.05), line(SR(1, 0.75), SR(2, 0.75), ROLE.result, 0.05), line(SR(2, 1), SR(2.6, 1), ROLE.result, 0.05), ...[[0, 0.25], [1, 0.75], [2, 1]].map(([x, y]) => dot(SR(x, y), ROLE.result, 0.1)), ...[[0, 0], [1, 0.25], [2, 0.75]].map(([x, y]) => ring(SR(x, y)[0], SR(x, y)[1], ROLE.result)), ...digits(SR), label('F(x) = P(X ≤ x)', P(oxR + 1, 2.4), ROLE.result, 'primary')] },
      { narration: 'Both tell the whole story of X. The jump at x = 1 is exactly the bar at 1: F(1) − F(0) = 3/4 − 1/4 = 1/2 = P(1). A PMF or a CDF is a probability distribution.', objects: [line(SR(1, 0.25), SR(1, 0.75), ROLE.aid, 0.08), ring(SL(1, pmf[1])[0], SL(1, pmf[1])[1], ROLE.aid, 0.3), label('jump = bar: 3/4 − 1/4 = 1/2', P((oxL + oxR) / 2 + 1, oy - 0.95), ROLE.aid, 'primary')] },
    ],
  }
}

// ── 4. Discrete distributions ────────────────────────────────────────────────

/** Bernoulli(1/2); Bin(5, 1/2) = heads in 5 flips; Bin(5, 0.2). Every bar uses the same height scale sy. */
export const DISC = { n: 5, sx: 0.8, sy: 5.0, oy: -1.4, bernoulliX: -4.0, bernoulliGap: 0.9, binX0: -1.6, offset: 0.14, wBern: 0.26, wBin: 0.11 } as const
export const choose = (n: number, k: number): number => (k < 0 || k > n ? 0 : k === 0 || k === n ? 1 : choose(n - 1, k - 1) + choose(n - 1, k))
export const binomialPmf = (n: number, p: number, k: number) => choose(n, k) * p ** k * (1 - p) ** (n - k)

/** KG: Bernoulli, Binomial, Poisson, Geometric ... the named discrete distributions. */
export function buildDiscreteDistributionsScene(): SceneSpec {
  return framed(raw_buildDiscreteDistributionsScene())
}
function raw_buildDiscreteDistributionsScene(): SceneSpec {
  const { n, sx, sy, oy, bernoulliX, bernoulliGap, binX0, offset, wBern, wBin } = DISC
  const S = (x: number, y: number): V3 => P(x, y * sy + oy)
  const ks = Array.from({ length: n + 1 }, (_, k) => k)
  const baseline = (x0: number, x1: number) => line(S(x0, 0), S(x1, 0), ROLE.reference, 0.04)
  return {
    id: 'math-discrete-distributions',
    title: 'Discrete distributions: Bernoulli and Binomial',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the Bernoulli distribution (one trial, success probability p) and the binomial distribution (the number of successes in n independent trials), and that changing p reshapes the binomial bars.',
    ariaLabel:
      'Left: a Bernoulli trial with success probability one half, two bars of height 0.5. Right: the binomial distribution for the number of heads in 5 fair flips, bars 1, 5, 10, 10, 5, 1 over 32, symmetric. Next to each bar, in red, the binomial with success probability 0.2, which piles up at 0 and 1.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Bernoulli(p): one trial with two outcomes, success (1) with probability p, failure (0) with probability 1 − p. One fair coin flip: p = 1/2, so two bars of height 0.5.', objects: [baseline(bernoulliX - 0.6, bernoulliX + bernoulliGap + 0.6), bar(S, bernoulliX, 0.5, ROLE.output, wBern), bar(S, bernoulliX + bernoulliGap, 0.5, ROLE.output, wBern), label('0', P(bernoulliX, oy - 0.4), ROLE.reference, 'detail'), label('1', P(bernoulliX + bernoulliGap, oy - 0.4), ROLE.reference, 'detail'), label('Bernoulli (1/2)', P(bernoulliX + bernoulliGap / 2, 2.3), ROLE.output, 'primary')] },
      { narration: 'Binomial(n, p): the number of successes in n independent trials. Heads in 5 fair flips, Bin(5, 1/2): the chances are 1, 5, 10, 10, 5, 1 out of 32. Most likely is 2 or 3 heads.', objects: [baseline(binX0 - 0.5, binX0 + n * sx + 0.5), ...ks.map((k) => bar(S, binX0 + k * sx - offset, binomialPmf(n, 0.5, k), ROLE.output, wBin)), ...ks.map((k) => label(String(k), P(binX0 + k * sx, oy - 0.4), ROLE.reference, 'detail')), label('Bin(5, 1/2): heads in 5 flips', P(binX0 + (n * sx) / 2, 2.3), ROLE.output, 'primary')] },
      { narration: 'Change the success probability to p = 0.2 (red, beside each blue bar): now most of the probability sits at 0 and 1, and 5 successes is almost impossible. The same family, a different shape.', objects: [...ks.map((k) => bar(S, binX0 + k * sx + offset, binomialPmf(n, 0.2, k), ROLE.input, wBin)), label('Bin(5, 0.2)', P(binX0 + 4.3 * sx, 1.6), ROLE.input, 'primary')] },
    ],
  }
}

// ── 5. Continuous distributions ──────────────────────────────────────────────

/** Hatch steps divide each shaded interval exactly (0.4/0.05, 1/0.05, 2/0.1 strips), so the hatched area equals the interval's probability. */
export const CONTD = { centres: [-3.4, 0, 3.4], oy: -1.2, sy: [2.2, 2.4, 5.8], steps: [0.05, 0.05, 0.1] } as const

/** KG: Uniform, Exponential, Normal ... probability is area under the density. */
export function buildContinuousDistributionsScene(): SceneSpec {
  return framed(raw_buildContinuousDistributionsScene())
}
function raw_buildContinuousDistributionsScene(): SceneSpec {
  const { centres, oy, sy, steps } = CONTD
  const U = (x: number, y: number): V3 => P(centres[0] + (x - 0.5) * 1.9, y * sy[0] + oy)
  const E = (x: number, y: number): V3 => P(centres[1] + (x - 1.2) * 0.85, y * sy[1] + oy)
  const N = (x: number, y: number): V3 => P(centres[2] + x * 0.45, y * sy[2] + oy)
  const expPdf = (x: number) => Math.exp(-x)
  const zero = () => 0
  return {
    id: 'math-continuous-distributions',
    title: 'Continuous distributions: probability is area under the density',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show three named continuous distributions, uniform, exponential and normal, each as a density curve, with the probability of an interval equal to the area under the curve over it.',
    ariaLabel:
      'Three density curves. The uniform distribution on 0 to 1 is a flat line of height 1; the shaded area from 0.2 to 0.6 is 0.40. The exponential distribution with rate 1 falls from height 1; the area from 0.5 to 1.5 is 0.38. The normal distribution is a bell centred at 0; the area from minus 1 to 1 is 0.68.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Uniform U(0, 1): every value between 0 and 1 is equally likely, so the density is flat at height 1. The probability of an interval is the area under the curve over it: from 0.2 to 0.6 the rectangle has area 0.4 × 1 = 0.40.', objects: [...mathAxes(U, -0.2, 1.3, -0.1, 1.3), label('x', P(-1.7, -1.55), ROLE.ink, 'primary'), line(U(0, 1), U(1, 1), ROLE.ink, 0.06), ...vHatch(U, () => 1, zero, 0.2, 0.6, steps[0], ROLE.output), label('uniform', P(centres[0], 2.3), ROLE.ink, 'primary'), label('0.40', P(centres[0], oy - 0.6), ROLE.output, 'primary')] },
      { narration: 'Exponential Exp(1): waiting times. Short waits are likely, long waits rare, so the density falls. The area from 0.5 to 1.5 is e^(−0.5) − e^(−1.5) ≈ 0.38.', objects: [...mathAxes(E, -0.3, 3.4, -0.1, 1.2), label('x', P(1.55, -1.55), ROLE.ink, 'primary'), curve(sampleMapped(expPdf, 0, 3.2, E, 48), ROLE.ink), ...vHatch(E, expPdf, zero, 0.5, 1.5, steps[1], ROLE.output), label('exponential', P(centres[1], 2.3), ROLE.ink, 'primary'), label('0.38', P(centres[1], oy - 0.6), ROLE.output, 'primary')] },
      { narration: 'Normal N(0, 1): the bell curve. Values near the centre are most likely. The area from −1 to 1 is about 0.68: roughly two thirds of the probability lies within one standard deviation.', objects: [...mathAxes(N, -3.4, 3.4, -0.02, 0.46), label('x', P(4.7, -1.5), ROLE.ink, 'primary'), curve(sampleMapped((x) => normPdf(x), -3.2, 3.2, N, 60), ROLE.ink), ...vHatch(N, (x) => normPdf(x), zero, -1, 1, steps[2], ROLE.output), label('normal', P(centres[2], 2.3), ROLE.ink, 'primary'), label('0.68', P(centres[2], oy - 0.6), ROLE.output, 'primary')] },
    ],
  }
}

// ── 6. Quantile ──────────────────────────────────────────────────────────────

/** The standard normal CDF; p-quantiles at p = 0.25, 0.5, 0.75. */
export const QUANT = { sx: 0.62, sy: 3.0, oy: -1.5, ps: [0.5, 0.25, 0.75] } as const
/** Invert the standard normal CDF by bisection. */
export function normalQuantile(p: number): number {
  let lo = -8, hi = 8
  for (let i = 0; i < 80; i++) { const mid = (lo + hi) / 2; if (phi(mid) < p) lo = mid; else hi = mid }
  return (lo + hi) / 2
}

/** KG: the p-quantile x_p satisfies F(x_p) = p; the 0.5-quantile is the median; Q1, Q2, Q3 at 0.25, 0.5, 0.75. */
export function buildQuantileScene(): SceneSpec {
  return framed(raw_buildQuantileScene())
}
function raw_buildQuantileScene(): SceneSpec {
  const { sx, sy, oy, ps } = QUANT
  const S = (x: number, y: number): V3 => P(x * sx, y * sy + oy)
  const mark = (p: number, color: string): SceneObject[] => {
    const x = normalQuantile(p)
    return [guide(S(-3.4, p), S(x, p), color, 0.025), guide(S(x, p), S(x, 0), color, 0.025), dot(S(x, p), color, 0.12), dot(S(x, 0), color, 0.1)]
  }
  return {
    id: 'math-quantile',
    title: 'Quantile: the x where the CDF reaches p',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the p-quantile as the value x_p where the cumulative distribution reaches p: read across from p on the vertical axis to the curve, then down to x. The median is p = 0.5 and the quartiles are p = 0.25 and 0.75.',
    ariaLabel:
      'The cumulative distribution curve of a normal distribution rising from 0 to 1. Reading across from height 0.5 to the curve and down gives the median, 0. From height 0.25 the value is about minus 0.67 (the first quartile) and from height 0.75 it is about 0.67 (the third quartile).',
    stage: NO_STAGE,
    steps: [
      { narration: 'The cumulative distribution F(x) = P(X ≤ x) of a bell-shaped distribution rises from 0 to 1. A quantile reverses it: given a probability p, find the x where F(x) = p.', objects: [...mathAxes(S, -3.6, 3.6, -0.1, 1.15), curve(sampleMapped(phi, -3.4, 3.4, S, 72), ROLE.ink), label('1', P(-3.6 * sx - 0.3, 1 * sy + oy), ROLE.reference, 'detail'), label('F(x)', P(2.9, 1 * sy + oy + 0.35), ROLE.ink, 'primary')] },
      { narration: 'p = 0.5: read across from 0.5 to the curve, then straight down. You land at x = 0. That is the median: half the probability lies below it.', objects: [...mark(ps[0], ROLE.result), label('p = 0.5: median = 0', P(2.0, oy - 0.65), ROLE.result, 'primary')] },
      { narration: 'p = 0.25 and p = 0.75 give the quartiles: Q₁ ≈ −0.67 and Q₃ ≈ 0.67. A quarter of the probability lies below Q₁, three quarters below Q₃.', objects: [...mark(ps[1], ROLE.input), ...mark(ps[2], ROLE.output), label('Q₁ ≈ −0.67', P(-2.1, oy - 0.65), ROLE.input, 'primary'), label('Q₃ ≈ 0.67', P(0.0, oy - 1.3), ROLE.output, 'primary')] },
    ],
  }
}

// ── 7. Variance ──────────────────────────────────────────────────────────────

/** Data 2, 4, 4, 4, 5, 5, 7, 9: mean 5, variance 4, standard deviation 2. */
export const VAR = { data: [2, 4, 4, 4, 5, 5, 7, 9], u: 0.55, ox: -2.75, lineY: 1.0, sq: 0.32 } as const
export const meanOf = (xs: readonly number[]) => xs.reduce((s, v) => s + v, 0) / xs.length
export const varianceOf = (xs: readonly number[]) => { const m = meanOf(xs); return xs.reduce((s, v) => s + (v - m) ** 2, 0) / xs.length }

/** KG: Var(X) = E[(X − μ)²], the average squared distance from the mean. */
export function buildVarianceScene(): SceneSpec {
  return framed(raw_buildVarianceScene())
}
function raw_buildVarianceScene(): SceneSpec {
  const { data, u, ox, lineY, sq } = VAR
  const m = meanOf(data), v = varianceOf(data)
  const X = (x: number) => x * u + ox
  const stack = new Map<number, number>()
  const dots = data.map((x) => { const h = stack.get(x) ?? 0; stack.set(x, h + 1); return dot(P(X(x), lineY + 0.32 + h * 0.34), ROLE.output, 0.13) })
  // squares of side |deviation| * sq, laid in a row below the line, for the points that are not at the mean
  const squares: SceneObject[] = []
  let cursor = -2.6
  for (const x of data) {
    const d = Math.abs(x - m)
    if (d === 0) continue
    const side = d * sq
    squares.push(...polyLines([[cursor, -1.6], [cursor + side, -1.6], [cursor + side, -1.6 + side], [cursor, -1.6 + side]], ROLE.input, 0.04))
    cursor += side + 0.25
  }
  return {
    id: 'math-variance',
    title: 'Variance: the average squared distance from the mean',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show variance as the mean of the squared deviations from the mean: the data 2, 4, 4, 4, 5, 5, 7, 9 have mean 5, squares of side 3, 1, 1, 1, 2, 4 (areas 9, 1, 1, 1, 4, 16, total 32) and variance 32 over 8 equals 4.',
    ariaLabel:
      'Eight data points 2, 4, 4, 4, 5, 5, 7, 9 on a number line with their mean 5 marked. Each point is some distance from 5: 3, 1, 1, 1, 0, 0, 2, 4. A square is drawn on each distance, with areas 9, 1, 1, 1, 4 and 16, which add to 32. The variance is the average area, 32 divided by 8, which is 4.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Eight values: 2, 4, 4, 4, 5, 5, 7, 9. Their mean is 40 ÷ 8 = 5. How spread out are they around it?', objects: [line(P(X(0.5), lineY), P(X(10), lineY), ROLE.reference, 0.04), ...Array.from({ length: 10 }, (_, i) => line(P(X(i + 1), lineY - 0.1), P(X(i + 1), lineY + 0.1), ROLE.reference, 0.03)), ...dots, ...[2, 4, 5, 7, 9].map((x) => label(String(x), P(X(x), lineY - 0.42), ROLE.reference, 'detail')), line(P(X(m), lineY - 0.25), P(X(m), lineY + 1.4), ROLE.result, 0.05), label('mean 5', P(X(m) + 0.8, lineY + 1.45), ROLE.result, 'primary')] },
      { narration: 'Each value is some distance from the mean: 3, 1, 1, 1, 0, 0, 2, 4. These deviations point both ways, so they would cancel if you just added them. Square them to make them all positive.', objects: [...[2, 4, 7, 9].map((x) => arrow(P(X(m), lineY - 0.85), P(X(x), lineY - 0.85), x < m ? ROLE.input : ROLE.output)), ...squares, label('squares of the distances', P(0.4, -2.35), ROLE.input, 'primary')] },
      { narration: 'The squares have areas 9, 1, 1, 1, 4 and 16 (the two values at the mean give 0): total 32. The variance is their average: 32 ÷ 8 = 4. Its square root, 2, is the standard deviation.', objects: [label(`variance = (9 + 1 + 1 + 1 + 0 + 0 + 4 + 16) ÷ 8 = ${v}`, P(0, -3.2), ROLE.result, 'primary')] },
    ],
  }
}

// ── 8. Standard deviation ────────────────────────────────────────────────────

/** Heights with mean 170 cm and standard deviation 10 cm. t = height − 170, drawn at u screen units per cm. */
export const SD = { mu: 170, sd: 10, u: 0.14, yScale: 80, oy: -0.8 } as const

/** KG: σ = √Var(X), in the same units as X; about 68% of a normal distribution lies within one σ of the mean. */
export function buildStandardDeviationScene(): SceneSpec {
  return framed(raw_buildStandardDeviationScene())
}
function raw_buildStandardDeviationScene(): SceneSpec {
  const { sd, u, yScale, oy } = SD
  const S = (t: number, y: number): V3 => P(t * u, y * yScale + oy)
  const pdf = (t: number) => normPdf(t, 0, sd)
  const zero = () => 0
  const tick = (t: number, color: string) => label(String(SD.mu + t), S(t, -0.0045), color, 'detail')
  return {
    id: 'math-standard-deviation',
    title: 'Standard deviation: a ruler for spread',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the standard deviation as a unit of distance from the mean, in the same units as the data: for heights with mean 170 cm and σ = 10 cm, about 68% lie within 1σ (160 to 180) and about 95% within 2σ (150 to 190).',
    ariaLabel:
      'A bell curve of adult heights with mean 170 centimetres and standard deviation 10 centimetres. The region from 160 to 180, one standard deviation either side of the mean, holds about 68 percent of people. The region from 150 to 190, two standard deviations either side, holds about 95 percent.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Adult heights with mean 170 cm and standard deviation σ = 10 cm. σ is measured in the same unit as the data (cm) and says how far values typically sit from the mean.', objects: [...mathAxes(S, -32, 32, -0.003, 0.046), curve(sampleMapped(pdf, -32, 32, S, 64), ROLE.ink), label('mean 170 cm', S(0, 0.0435), ROLE.ink, 'primary')] },
      { narration: 'One σ either side of the mean is 160 to 180 cm. About 68% of people fall in that stretch.', objects: [...vHatch(S, pdf, zero, -10, 10, 1, ROLE.output), tick(-10, ROLE.output), tick(10, ROLE.output), label('68% within 1σ', P(0, -1.95), ROLE.output, 'primary')] },
      { narration: 'Two σ either side is 150 to 190 cm: about 95% of people. Almost everyone (99.7%) is within three σ. So σ works as a ruler: “10 cm above the mean” means 1σ above.', objects: [...vHatch(S, pdf, zero, -20, -10, 1, ROLE.aid), ...vHatch(S, pdf, zero, 10, 20, 1, ROLE.aid), tick(-20, ROLE.aid), tick(20, ROLE.aid), label('95% within 2σ', P(0, -2.6), ROLE.aid, 'primary')] },
    ],
  }
}

// ── 9-11. Joint, marginal and conditional distribution ───────────────────────

/** p(x, y) for X, Y in {0, 1}: p(0,0) = .4, p(0,1) = .1, p(1,0) = .2, p(1,1) = .3. Dot AREA is proportional to probability. */
export const JOINT = { cell: 2.1, labelDrop: 0.8, p: { '0,0': 0.4, '0,1': 0.1, '1,0': 0.2, '1,1': 0.3 } as Record<string, number> } as const
export const jointP = (x: number, y: number) => JOINT.p[`${x},${y}`]
export const marginalX = (x: number) => jointP(x, 0) + jointP(x, 1)
export const marginalY = (y: number) => jointP(0, y) + jointP(1, y)
export const conditionalYgivenX = (y: number, x: number) => jointP(x, y) / marginalX(x)
/** Radius of the dot for probability p: 0.5 at p = 0.4, so radius² (the dot's area) is proportional to p. */
export const dotRadius = (p: number) => 0.5 * Math.sqrt(p / 0.4)
const tenth = (n: number) => `.${Math.round(n * 10)}`
/** Centre of cell (x, y) in a table whose centre is at (ox, oy). */
const cellCentre = (x: number, y: number, ox = 0, oy = 0): XY => [ox + (x - 0.5) * JOINT.cell, oy + (y - 0.5) * JOINT.cell]
const bubble = (x: number, y: number, p: number, color: string, ox = 0, oy = 0): SceneObject => dot(P(...cellCentre(x, y, ox, oy)), color, dotRadius(p))
/** The probability, written inside its cell under the dot. */
const cellLabel = (x: number, y: number, p: number, color: string, ox = 0, oy = 0): SceneObject => {
  const [cx, cy] = cellCentre(x, y, ox, oy)
  return label(tenth(p), P(cx, cy - JOINT.labelDrop), color, 'primary')
}
const gridObjects = (ox = 0, oy = 0): SceneObject[] => {
  const c = JOINT.cell
  return [
    ...polyLines([[ox - c, oy - c], [ox + c, oy - c], [ox + c, oy + c], [ox - c, oy + c]], ROLE.reference, 0.04),
    line(P(ox, oy - c), P(ox, oy + c), ROLE.reference, 0.025), line(P(ox - c, oy), P(ox + c, oy), ROLE.reference, 0.025),
    label('0', P(cellCentre(0, 0, ox, oy)[0], oy - c - 0.35), ROLE.reference, 'primary'), label('1', P(cellCentre(1, 0, ox, oy)[0], oy - c - 0.35), ROLE.reference, 'primary'),
    label('0', P(ox - c - 0.4, cellCentre(0, 0, ox, oy)[1]), ROLE.reference, 'primary'), label('1', P(ox - c - 0.4, cellCentre(0, 1, ox, oy)[1]), ROLE.reference, 'primary'),
    label('X', P(ox, oy - c - 0.95), ROLE.ink, 'primary'), label('Y', P(ox - c - 0.85, oy), ROLE.ink, 'primary'),
  ]
}
const CELLS: Array<[number, number]> = [[0, 0], [0, 1], [1, 0], [1, 1]]

/** KG: F(x, y) = P(X ≤ x, Y ≤ y); for discrete variables the joint PMF p(x, y) = P(X = x, Y = y). */
export function buildJointDistributionScene(): SceneSpec {
  return framed(raw_buildJointDistributionScene())
}
function raw_buildJointDistributionScene(): SceneSpec {
  return {
    id: 'math-joint-distribution',
    title: 'Joint distribution: two variables at once',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a joint distribution as a table of probabilities p(x, y) = P(X = x and Y = y) for every pair of values, which together add to 1.',
    ariaLabel:
      'A two by two table for variables X and Y, each 0 or 1. The probabilities of the four combinations are 0.4 for X 0 and Y 0, 0.1 for X 0 and Y 1, 0.2 for X 1 and Y 0, and 0.3 for X 1 and Y 1. The area of each dot is proportional to its probability, and the four add to 1.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Two variables X and Y, each 0 or 1 (say X: it rained, Y: the bus was late). A joint distribution gives a probability to every combination of values. Four cells, four combinations.', objects: gridObjects() },
      { narration: 'Each cell holds p(x, y) = P(X = x and Y = y); the area of the dot shows how large it is: p(0,0) = .4, p(0,1) = .1, p(1,0) = .2, p(1,1) = .3.', objects: CELLS.flatMap(([x, y]) => [bubble(x, y, jointP(x, y), ROLE.output), cellLabel(x, y, jointP(x, y), ROLE.ink)]) },
      { narration: 'Every outcome falls in exactly one cell, so all four add to 1: .4 + .1 + .2 + .3 = 1. The cell p(1, 1) = .3 says: X = 1 and Y = 1 together happen 30% of the time.', objects: [label('.4 + .1 + .2 + .3 = 1', P(0, JOINT.cell + 0.9), ROLE.result, 'primary'), ring(cellCentre(1, 1)[0], cellCentre(1, 1)[1], ROLE.result, dotRadius(jointP(1, 1)) + 0.1)] },
    ],
  }
}

/** KG: f_X(x) = ∫ f(x, y) dy; X and Y are independent iff f(x, y) = f_X(x) f_Y(y). */
export const MARGINAL = { ox: -0.7, oy: -0.4, k: 2.6 } as const
export function buildMarginalDistributionScene(): SceneSpec {
  return framed(raw_buildMarginalDistributionScene())
}
function raw_buildMarginalDistributionScene(): SceneSpec {
  const c = JOINT.cell
  const { ox, oy, k } = MARGINAL
  const colBar = (x: number) => line(P(cellCentre(x, 0, ox, oy)[0], oy + c + 0.35), P(cellCentre(x, 0, ox, oy)[0], oy + c + 0.35 + marginalX(x) * k), ROLE.output, 0.3)
  const rowBar = (y: number) => line(P(ox + c + 0.35, cellCentre(0, y, ox, oy)[1]), P(ox + c + 0.35 + marginalY(y) * k, cellCentre(0, y, ox, oy)[1]), ROLE.input, 0.3)
  return {
    id: 'math-marginal-distribution',
    title: 'Marginal distribution: add across the other variable',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a marginal distribution as the joint probabilities summed over the other variable (the margins of the table), and use it to test independence: X and Y are independent only if every cell equals the product of its margins.',
    ariaLabel:
      'The same two by two table. Adding down each column gives the distribution of X: P(X = 0) = 0.5 and P(X = 1) = 0.5. Adding across each row gives the distribution of Y: P(Y = 0) = 0.6 and P(Y = 1) = 0.4. If X and Y were independent the cell for X 0 and Y 0 would be 0.5 times 0.6 equals 0.30, but it is 0.4, so they are not independent.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The same joint table. To get the distribution of X alone, ignore Y: add down each column.', objects: [...gridObjects(ox, oy), ...CELLS.flatMap(([x, y]) => [bubble(x, y, jointP(x, y), ROLE.reference, ox, oy), cellLabel(x, y, jointP(x, y), ROLE.ink, ox, oy)])] },
      { narration: 'Column totals: P(X = 0) = .4 + .1 = .5 and P(X = 1) = .2 + .3 = .5. That is the marginal distribution of X, written in the margin of the table.', objects: [colBar(0), colBar(1), label(tenth(marginalX(0)), P(cellCentre(0, 0, ox, oy)[0], oy + c + 0.85 + marginalX(0) * k), ROLE.output, 'primary'), label(tenth(marginalX(1)), P(cellCentre(1, 0, ox, oy)[0], oy + c + 0.85 + marginalX(1) * k), ROLE.output, 'primary')] },
      { narration: 'Row totals give Y: P(Y = 0) = .4 + .2 = .6 and P(Y = 1) = .1 + .3 = .4. Independence test: p(0,0) would have to equal P(X = 0) · P(Y = 0) = .5 × .6 = .30, but it is .4. So X and Y are not independent.', objects: [rowBar(0), rowBar(1), label(tenth(marginalY(0)), P(ox + c + 0.95 + marginalY(0) * k, cellCentre(0, 0, ox, oy)[1]), ROLE.input, 'primary'), label(tenth(marginalY(1)), P(ox + c + 0.95 + marginalY(1) * k, cellCentre(0, 1, ox, oy)[1]), ROLE.input, 'primary'), label('.4 ≠ .5 × .6 = .30: dependent', P(ox, oy - c - 1.7), ROLE.result, 'primary')] },
    ],
  }
}

/** KG: f_{X|Y}(x|y) = f(x, y)/f_Y(y), the distribution of X given Y = y. Here Y given X = 1. */
export const CONDITIONAL = { ox: -1.6, given: 1, resultX: 2.4 } as const
export function buildConditionalDistributionScene(): SceneSpec {
  return framed(raw_buildConditionalDistributionScene())
}
function raw_buildConditionalDistributionScene(): SceneSpec {
  const c = JOINT.cell
  const { ox, given, resultX } = CONDITIONAL
  const ys = [0, 1]
  return {
    id: 'math-conditional-distribution',
    title: 'Conditional distribution: a slice, rescaled to total 1',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the distribution of Y given X = 1 as the X = 1 slice of the joint table divided by its total P(X = 1), so the slice is rescaled to add to 1.',
    ariaLabel:
      'The two by two table with the column X equal to 1 highlighted: its cells are 0.2 for Y 0 and 0.3 for Y 1, total 0.5. Dividing each by 0.5 gives the conditional distribution of Y given X equal to 1: 0.4 for Y 0 and 0.6 for Y 1, which add to 1.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The joint table again. Suppose we learn that X = 1. What are the chances for Y now?', objects: [...gridObjects(ox, 0), ...CELLS.flatMap(([x, y]) => [bubble(x, y, jointP(x, y), ROLE.reference, ox, 0), cellLabel(x, y, jointP(x, y), ROLE.ink, ox, 0)])] },
      { narration: 'Only the X = 1 column is still possible, so keep just that slice: .2 and .3. But they add to .5, not 1, so they are not yet probabilities for Y.', objects: [...polyLines([[ox, -c], [ox + c, -c], [ox + c, c], [ox, c]], ROLE.output, 0.07), label('X = 1 slice: total .5', P(ox + c / 2, c + 0.5), ROLE.output, 'primary')] },
      { narration: 'Divide each slice entry by the slice total P(X = 1) = .5: P(Y = 0 | X = 1) = .2 ÷ .5 = .4 and P(Y = 1 | X = 1) = .3 ÷ .5 = .6. They add to 1: a proper distribution of Y given X = 1.', objects: [arrow(P(ox + c + 0.3, 0), P(resultX - 1.1, 0), ROLE.aid), label('each \u00F7 P(X = 1) = .5', P(ox + c / 2, c + 1.05), ROLE.aid, 'primary'), ...ys.flatMap((y) => { const p = conditionalYgivenX(y, given), yy = (y - 0.5) * c; return [dot(P(resultX, yy), ROLE.result, dotRadius(p)), label(`Y = ${y}: ${tenth(p)}`, P(resultX + 1.6, yy), ROLE.result, 'primary')] }), label('P(Y | X = 1)', P(resultX, c + 0.7), ROLE.result, 'primary')] },
    ],
  }
}

// ── 12. Law of large numbers ─────────────────────────────────────────────────

/**
 * One fixed pseudo-random run of 60 fair coin flips, so the picture is the same every time. Seed 1 is the first
 * seed whose run opens with a wide swing and stays inside the ±1/√n band from n = 4 on (a typical run, not a rigged one).
 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
export const LLN = { seed: 1, flips: 60, u: 0.075, sy: 3.4, oy: -1.7, ox: -2.25, cuts: [10, 30, 60] } as const
export const flipSequence = (): number[] => { const r = mulberry32(LLN.seed); return Array.from({ length: LLN.flips }, () => (r() < 0.5 ? 1 : 0)) }
/** Running proportion of heads after n flips (n = 1 .. flips). */
/** Half-width of the violet band: the typical distance of the running proportion from 1/2 after n flips is about 1/√n. */
export const bandHalfWidth = (n: number) => 1 / Math.sqrt(n)
export const runningProportion = (n: number): number => { const f = flipSequence(); return f.slice(0, n).reduce((s, v) => s + v, 0) / n }

/** KG: the sample mean X̄ₙ converges to μ as n grows. */
export function buildLawOfLargeNumbersScene(): SceneSpec {
  return framed(raw_buildLawOfLargeNumbersScene())
}
function raw_buildLawOfLargeNumbersScene(): SceneSpec {
  const { u, sy, oy, ox, cuts } = LLN
  const S = (n: number, p: number): V3 => P(n * u + ox, p * sy + oy)
  const piece = (a: number, b: number, color: string) => curve(Array.from({ length: b - a + 1 }, (_, i) => S(a + i, runningProportion(a + i))), color)
  return {
    id: 'math-lln',
    title: 'Law of large numbers: the running average settles down',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that the proportion of heads in repeated fair coin flips wanders wildly at first but settles towards the true probability 1/2 as the number of flips grows.',
    ariaLabel:
      'A graph of the proportion of heads after n fair coin flips, for n from 1 to 60. After a few flips it swings widely, from 0 to 1. By 30 flips it has moved much closer to one half, and by 60 it sits near 0.5, inside a band around 0.5 that narrows as the flips pile up. The band has half-width 1 over the square root of n.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Flip a fair coin and track the proportion of heads so far. After 1 flip it is 0 or 1; after a few flips it jumps around a lot. This is the first 10 flips.', objects: [...mathAxes(S, -2, 64, -0.1, 1.15), piece(1, cuts[0], ROLE.input), label('proportion of heads', S(30, 1.12), ROLE.ink, 'primary'), label('10 flips', S(cuts[0], -0.18), ROLE.input, 'detail')] },
      { narration: 'Keep flipping. By 30 flips the swings are smaller: the proportion is already in the neighbourhood of 0.5.', objects: [piece(cuts[0], cuts[1], ROLE.output), label('30 flips', S(cuts[1], -0.18), ROLE.output, 'detail')] },
      { narration: 'By 60 flips the running proportion is 0.53, close to 1/2. It never locks exactly onto 0.5, but its typical distance from 1/2 shrinks like 1/√n: the violet band 1/2 ± 1/√n narrows, and the run stays inside it. That is the law of large numbers.', objects: [piece(cuts[1], cuts[2], ROLE.result), guide(S(0, 0.5), S(62, 0.5), ROLE.reference, 0.025), curve(Array.from({ length: 57 }, (_, i) => S(i + 4, 0.5 + bandHalfWidth(i + 4))), ROLE.aid), curve(Array.from({ length: 57 }, (_, i) => S(i + 4, 0.5 - bandHalfWidth(i + 4))), ROLE.aid), label('60 flips', S(cuts[2], -0.18), ROLE.result, 'detail'), label('0.5', S(-5, 0.5), ROLE.reference, 'detail')] },
    ],
  }
}
