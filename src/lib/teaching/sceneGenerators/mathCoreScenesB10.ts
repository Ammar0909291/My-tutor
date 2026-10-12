/**
 * Core school-mathematics figures — batch 10 of the mathematics visual campaign
 * (2026-10-12): the rest of the essential statistics concepts plus five calculus /
 * function concepts.
 *
 * A p-value as tail area, Type I / II errors and power as areas under two bells, a power
 * curve, ANOVA's between / within split, sample correlation and its sensitivity to an
 * outlier, least-squares regression with its residuals, the normal approximation to the
 * binomial with continuity correction, curve sketching of x/(1 + x²), a solid of
 * revolution as stacked disks, a surface of revolution as bands, a cycloid's slope, arc
 * length and area, and a periodic function. Same rules as batches 1-9: one visual
 * language from visualDesign.ts, labels are names not sentences (marks of 1-2
 * characters are free), steps are cumulative, coordinates stay inside +-5, at most 50
 * objects per step, nothing the figure audit rejects, and every number drawn comes from
 * the constants and pure helpers exported here, which the test file re-derives
 * independently from the DRAWN coordinates.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, sampleMapped, guide, axes2, mathAxes, arcPts, type XY, type V3 } from './mathSceneKit'
import { vHatch } from './mathCoreScenesB7'
import { phi, normPdf, normalQuantile, meanOf, choose } from './mathCoreScenesB8'

const zero = () => 0
const f1 = (n: number) => (Math.round(n * 10) / 10).toFixed(1)
const f2 = (n: number) => { const v = (Math.round(n * 100) / 100).toFixed(2); return v === '-0.00' ? '0.00' : v }
const f3 = (n: number) => (Math.round(n * 1000) / 1000).toFixed(3)
const sum = (xs: readonly number[]) => xs.reduce((s, v) => s + v, 0)
const ring = (x: number, y: number, color: string, r = 0.11): SceneObject => curve(arcPts(x, y, r, 0, 360, 24), color)
/** An axis-aligned ellipse outline (a circle seen edge-on is drawn as a thin one): 48 points. */
const ellipse = (cx: number, cy: number, rx: number, ry: number, color: string): SceneObject =>
  curve(Array.from({ length: 48 }, (_, i) => { const a = (2 * Math.PI * i) / 47; return P(cx + rx * Math.cos(a), cy + ry * Math.sin(a)) }), color)
const bracket = (x0: number, x1: number, y: number, color: string, t = 0.05, cap = 0.16): SceneObject[] => [
  line(P(x0, y), P(x1, y), color, t), line(P(x0, y - cap), P(x0, y + cap), color, t), line(P(x1, y - cap), P(x1, y + cap), color, t),
]
/** A baseline arrow along y = oy from math-x0 to math-x1 through the mapped x. */
const baseline = (S: (x: number, y: number) => V3, x0: number, x1: number, oy: number): SceneObject => arrow(P(S(x0, 0)[0], oy), P(S(x1, 0)[0], oy), ROLE.reference)

// ── 1. p-value ───────────────────────────────────────────────────────────────

/** Two-sided z test: the observed z = 1.5 gives p = 2 (1 − Φ(1.5)) = 0.134, larger than α = 0.05 (critical ±1.96). */
export const PVAL = { observed: 1.5, crit: 1.96, tailEnd: 3.3, tailSteps: 12, yScale: 8, oy: -1.5 } as const
export const twoSidedP = (z: number) => 2 * (1 - phi(Math.abs(z)))

/** KG: P(test statistic at least as extreme as observed | H₀); reject when p < α; it is NOT P(H₀ is true). */
export function buildPValueScene(): SceneSpec {
  return framed(raw_buildPValueScene())
}
function raw_buildPValueScene(): SceneSpec {
  const { observed, crit, tailEnd, tailSteps, yScale, oy } = PVAL
  const S = (z: number, y: number): V3 => P(z, y * yScale + oy)
  const pdf = (z: number) => normPdf(z)
  const tail = (a: number, b: number) => vHatch(S, pdf, zero, a, b, (b - a) / tailSteps, ROLE.input)
  return {
    id: 'math-p-value',
    title: 'p-value: the probability of a result at least this extreme',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the p-value as the tail area beyond the observed statistic when H₀ is true: observed z = 1.5 gives p = 2 × 0.067 = 0.134, which is larger than α = 0.05, so the evidence against H₀ is not strong enough to reject it.',
    ariaLabel:
      'A bell curve for the test statistic z when the null hypothesis is true. The observed value z equals 1.5 is marked. The two tails beyond minus 1.5 and 1.5 are shaded; each has area 0.067, so the two-sided p-value is 0.134. Violet lines mark the 5 percent critical values at minus and plus 1.96, further out than the shaded region, so p is greater than 0.05 and the null hypothesis is not rejected.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Suppose H₀ is true, so the test statistic z follows N(0, 1). Our data give an observed value z = 1.5. How surprising is that if H₀ holds?', objects: [...mathAxes(S, -3.6, 3.6, -0.01, 0.46), curve(sampleMapped(pdf, -3.5, 3.5, S, 70), ROLE.ink), dot(P(observed, oy), ROLE.result, 0.13), line(P(observed, oy), S(observed, pdf(observed)), ROLE.result, 0.04), label('observed z = 1.5', P(2.7, 0.9), ROLE.result, 'primary')] },
      { narration: 'The p-value is the probability, under H₀, of a result at least as extreme as the one observed: the area beyond |z| = 1.5 in both tails. Each tail is 1 − Φ(1.5) = 0.067, so p = 2 × 0.067 = 0.134.', objects: [...tail(observed, tailEnd), ...tail(-tailEnd, -observed), label('p = 2 × 0.067 = 0.134', P(0, oy - 1.0), ROLE.input, 'primary')] },
      { narration: 'Compare with the significance level α = 0.05, whose critical values ±1.96 are further out (violet). Since p = 0.134 > 0.05, a result this extreme is quite likely under H₀: we do not reject it. The p-value is NOT the probability that H₀ is true.', objects: [line(P(-crit, oy), P(-crit, oy + 1.0), ROLE.aid, 0.04), line(P(crit, oy), P(crit, oy + 1.0), ROLE.aid, 0.04), label('α = 0.05 (±1.96)', P(-2.4, 1.3), ROLE.aid, 'primary'), label('p > α: do not reject H₀', P(0, oy - 1.7), ROLE.result, 'primary')] },
    ],
  }
}

// ── 2. Type I and Type II errors ─────────────────────────────────────────────

/** H0: N(0, 1); H1: N(3, 1); reject when z > c, the 95th percentile of H0 (one-sided α = 0.05). Screen x = (z − mid) u. */
export const TYPE = { shift: 3, tailEnd: 3.3, steps: 12, u: 0.7, mid: 1.5, sy: 7, oy: -1.5 } as const
export const typeCrit = () => normalQuantile(0.95)
export const typeAlpha = () => 1 - phi(typeCrit())
export const typeBeta = () => phi(typeCrit() - TYPE.shift)

/** KG: Type I = reject H₀ when true (rate α); Type II = fail to reject H₀ when false (rate β); lowering α raises β. */
export function buildTypeErrorsScene(): SceneSpec {
  return framed(raw_buildTypeErrorsScene())
}
function raw_buildTypeErrorsScene(): SceneSpec {
  const { shift, tailEnd, steps, u, mid, sy, oy } = TYPE
  const c = typeCrit()
  const S = (z: number, y: number): V3 => P((z - mid) * u, y * sy + oy)
  const pdf0 = (z: number) => normPdf(z, 0, 1), pdf1 = (z: number) => normPdf(z, shift, 1)
  return {
    id: 'math-type-errors',
    title: 'Type I and Type II errors',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the two ways a test can be wrong with two overlapping bells: reject when z exceeds the critical value 1.645; the tail of H₀ beyond it is α = 0.05 (Type I), and the part of H₁ below it is β = 0.088 (Type II). Moving the line trades one for the other.',
    ariaLabel:
      'Two bell curves, H zero centred at 0 and H one centred at 3, with a vertical line at the critical value 1.645. The tail of the H zero bell to the right of the line, area 0.05, is shaded red: rejecting a true null hypothesis, a Type I error. The part of the H one bell to the left of the line, area 0.088, is shaded violet: failing to reject a false null hypothesis, a Type II error.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Two possible worlds. If H₀ is true the test statistic is N(0, 1); if H₁ is true it is N(3, 1). The rule: reject H₀ when z is beyond the critical value 1.645 (violet line).', objects: [baseline(S, -3.4, 6.5, oy), curve(sampleMapped(pdf0, -3.3, 3.3, S, 60), ROLE.ink), curve(sampleMapped(pdf1, -0.3, 6.3, S, 60), ROLE.output), line(P(S(c, 0)[0], oy), P(S(c, 0)[0], oy + 2.3), ROLE.aid, 0.04), label('H₀', P(S(0, 0)[0], 1.6), ROLE.ink, 'primary'), label('H₁', P(S(shift, 0)[0], 1.6), ROLE.output, 'primary'), label('critical value 1.645', P(S(c, 0)[0], oy - 0.5), ROLE.aid, 'primary')] },
      { narration: 'Type I error: H₀ is true but z lands beyond 1.645 and we reject it (a false positive). Its probability is the red tail of the H₀ bell: α = 0.05.', objects: [...vHatch(S, pdf0, zero, c, tailEnd, (tailEnd - c) / steps, ROLE.input), label('α = 0.05: reject a TRUE H₀', P(-2.6, 2.1), ROLE.input, 'primary')] },
      { narration: 'Type II error: H₁ is true but z lands below 1.645 and we fail to reject H₀ (a false negative). Its probability is the violet part of the H₁ bell left of the line: β = 0.088. Shifting the line right lowers α but raises β.', objects: [...vHatch(S, pdf1, zero, shift - tailEnd, c, (c - (shift - tailEnd)) / steps, ROLE.aid), label('β = 0.088: keep a FALSE H₀', P(2.4, 2.1), ROLE.aid, 'primary')] },
    ],
  }
}

// ── 3. Power ─────────────────────────────────────────────────────────────────

/** Power of the one-sided z test (α = 0.05) against a true mean δ standard errors above H₀'s. Screen x = (δ − mid) u. */
export const POWER = { u: 0.8, mid: 2.5, sy: 3.2, oy: -1.6, points: [0, 2, 3] } as const
export const powerAt = (delta: number) => 1 - phi(normalQuantile(0.95) - delta)
export const deltaForPower = (p: number) => normalQuantile(0.95) + normalQuantile(p)

/** KG: power = P(reject H₀ | H₁ true) = 1 − β; increases with sample size, effect size and α. */
export function buildStatisticalPowerScene(): SceneSpec {
  return framed(raw_buildStatisticalPowerScene())
}
function raw_buildStatisticalPowerScene(): SceneSpec {
  const { u, mid, sy, oy, points } = POWER
  const S = (d: number, p: number): V3 => P((d - mid) * u, p * sy + oy)
  const colours = [ROLE.input, ROLE.output, ROLE.result]
  const d80 = deltaForPower(0.8)
  return {
    id: 'math-power',
    title: 'Power: the chance of detecting a real effect',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show power 1 − β as a curve rising with the size of the true effect δ: it equals α = 0.05 when there is no effect, 0.64 at δ = 2, 0.91 at δ = 3, and reaches the conventional 0.80 at δ ≈ 2.49.',
    ariaLabel:
      'A curve of power against effect size delta, rising from 0.05 at delta 0 to near 1. Marked points: power 0.05 at delta 0, 0.64 at delta 2 and 0.91 at delta 3. A dashed line at power 0.80 meets the curve at delta about 2.49.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Power = P(reject H₀ | H₁ is true) = 1 − β. It depends on how far the true mean is from H₀’s, the effect size δ (in standard errors). The curve is power = 1 − Φ(1.645 − δ).', objects: [...mathAxes(S, -0.3, 5.4, -0.05, 1.18), curve(sampleMapped(powerAt, 0, 5, S, 50), ROLE.ink), ...[1, 2, 3, 4, 5].map((d) => label(String(d), P(S(d, 0)[0], oy - 0.4), ROLE.reference, 'detail')), label('power', P(S(0, 0)[0] + 0.2, S(0, 1.25)[1]), ROLE.ink, 'primary'), label('effect size δ', P(S(5, 0)[0] - 0.3, oy - 0.95), ROLE.ink, 'primary')] },
      { narration: 'With no effect (δ = 0) the test rejects only by mistake: power = α = 0.05. At δ = 2 power is 0.64; at δ = 3 it is 0.91 (matching 1 − β = 1 − 0.088 from the error picture).', objects: points.flatMap((d, i) => [dot(S(d, powerAt(d)), colours[i], 0.12), label(['δ = 0: power = α = 0.05', 'δ = 2: 0.64', 'δ = 3: 0.91'][i], P([-3.3, 1.0, 1.8][i], [oy + 0.35, -0.2, 0.95][i]), colours[i], 'primary')]) },
      { narration: 'A common target is power 0.80: reading across from 0.80 to the curve and down gives δ = 1.645 + 0.842 ≈ 2.49. A smaller true effect needs more data (a larger sample raises δ) to be detected.', objects: [guide(S(0, 0.8), S(d80, 0.8), ROLE.aid, 0.03), guide(S(d80, 0.8), S(d80, 0), ROLE.aid, 0.03), dot(S(d80, 0.8), ROLE.aid, 0.1), label('power 0.80 at δ ≈ 2.49', P(S(d80, 0)[0] + 1.0, oy + 0.5), ROLE.aid, 'primary')] },
    ],
  }
}

// ── 4. ANOVA ─────────────────────────────────────────────────────────────────

/** Three groups of five: means 4, 6, 8, grand mean 6. */
export const ANOVA = { groups: [[2, 4, 4, 5, 5], [4, 5, 6, 7, 8], [6, 7, 8, 9, 10]], gx: [-2.6, 0, 2.6], u: 0.45, mid: 6, spread: 0.28 } as const
export function anovaStats(groups: ReadonlyArray<readonly number[]>) {
  const all = groups.flat(), grand = meanOf(all), n = all.length, k = groups.length
  const ssw = sum(groups.map((g) => { const m = meanOf(g); return sum(g.map((v) => (v - m) ** 2)) }))
  const ssb = sum(groups.map((g) => g.length * (meanOf(g) - grand) ** 2))
  const msb = ssb / (k - 1), msw = ssw / (n - k)
  return { grand, ssw, ssb, sst: sum(all.map((v) => (v - grand) ** 2)), dfb: k - 1, dfw: n - k, msb, msw, F: msb / msw }
}

/** KG: SS_Total = SS_Between + SS_Within; F = MS_Between / MS_Within ~ F(k − 1, N − k) under H₀. */
export function buildAnovaScene(): SceneSpec {
  return framed(raw_buildAnovaScene())
}
function raw_buildAnovaScene(): SceneSpec {
  const { groups, gx, u, mid, spread } = ANOVA
  const st = anovaStats(groups)
  const Y = (v: number) => (v - mid) * u
  const xOf = (g: number, i: number) => { const v = groups[g][i], same = groups[g].filter((w) => w === v).length, k = groups[g].slice(0, i).filter((w) => w === v).length; return gx[g] + (k - (same - 1) / 2) * spread }
  const dots = groups.flatMap((grp, g) => grp.map((v, i) => dot(P(xOf(g, i), Y(v)), ROLE.ink, 0.12)))
  const bars = groups.map((grp, g) => line(P(gx[g] - 0.55, Y(meanOf(grp))), P(gx[g] + 0.55, Y(meanOf(grp))), ROLE.output, 0.06))
  const within = groups.flatMap((grp, g) => grp.flatMap((v, i) => (Math.abs(v - meanOf(grp)) < 1e-9 ? [] : [line(P(xOf(g, i), Y(v)), P(xOf(g, i), Y(meanOf(grp))), ROLE.input, 0.04)])))
  const between = groups.flatMap((grp, g) => (Math.abs(meanOf(grp) - st.grand) < 1e-9 ? [] : [arrow(P(gx[g] + (g === 0 ? -0.8 : 0.8), Y(st.grand)), P(gx[g] + (g === 0 ? -0.8 : 0.8), Y(meanOf(grp))), ROLE.output)]))
  return {
    id: 'math-anova',
    title: 'ANOVA: between-group against within-group variation',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show ANOVA as a split of total variation: three groups of five with means 4, 6, 8 and grand mean 6 have within-group sum of squares 26 and between-group sum of squares 40 (total 66), giving F = (40/2) ÷ (26/12) = 9.23.',
    ariaLabel:
      'Three columns of five dots for groups A, B and C, with group means 4, 6 and 8 marked by short bars and the grand mean 6 as a long violet line. Red vertical segments from each dot to its own group mean show within-group variation, total squared length 26. Blue arrows from the grand mean to the group means of A and C show between-group variation, 5 times 4 plus 5 times 4 equals 40. F equals 20 over 2.17, about 9.23.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Three groups of five measurements. Each group has its own mean (blue bars: 4, 6, 8); the grand mean of all 15 values is 6 (violet line). Are the group means really different, or is this chance?', objects: [...dots, ...bars, line(P(-3.6, Y(st.grand)), P(3.6, Y(st.grand)), ROLE.aid, 0.03), ...['A', 'B', 'C'].map((t, g) => label(t, P(gx[g], Y(2) - 0.55), ROLE.reference, 'primary')), label('grand mean 6', P(-3.0, Y(st.grand) + 0.3), ROLE.aid, 'primary')] },
      { narration: 'Within-group variation: how far each value sits from its OWN group mean (red). Squared and added: SS_within = 6 + 10 + 10 = 26, with N − k = 12 degrees of freedom, so MS_within = 26 ÷ 12 ≈ 2.17.', objects: [...within, label('within: SS = 26', P(-2.6, 1.75), ROLE.input, 'primary')] },
      { narration: 'Between-group variation: how far each group mean sits from the grand mean (blue). SS_between = 5(4 + 0 + 4) = 40 with k − 1 = 2 degrees of freedom, so MS_between = 20. Total 40 + 26 = 66 = Σ(x − 6)². F = 20 ÷ 2.17 ≈ 9.23, well above the 5% critical value 3.89.', objects: [...between, label('between: SS = 40', P(2.6, -2.4), ROLE.output, 'primary'), label('F = (40 ÷ 2) ÷ (26 ÷ 12) = 9.23', P(0, -3.1), ROLE.result, 'primary')] },
    ],
  }
}

// ── 5. Sample correlation, 6. Linear regression (shared data) ────────────────

/** Eight points; one outlier (7, 1.5) can be added. Screen x = (x − 4.5) u, y = (y − 4.75) u. */
export const REG = { x: [1, 2, 3, 4, 5, 6, 7, 8], y: [2.5, 2.2, 4.6, 4.1, 6.4, 5.5, 7.9, 7.2], outlier: [7, 1.5], u: 0.6, mx: 4.5, my: 4.75 } as const
export function regStats(x: readonly number[], y: readonly number[]) {
  const mx = meanOf(x), my = meanOf(y)
  const sxx = sum(x.map((v) => (v - mx) ** 2)), syy = sum(y.map((v) => (v - my) ** 2)), sxy = sum(x.map((v, i) => (v - mx) * (y[i] - my)))
  const b1 = sxy / sxx, b0 = my - b1 * mx
  return { mx, my, sxx, syy, sxy, r: sxy / Math.sqrt(sxx * syy), b1, b0, sse: sum(x.map((v, i) => (y[i] - (b0 + b1 * v)) ** 2)) }
}
/** SSE of a line through the point of means with the given slope. */
export const sseThroughMeans = (x: readonly number[], y: readonly number[], slope: number) => { const mx = meanOf(x), my = meanOf(y); return sum(x.map((v, i) => (y[i] - (my + slope * (v - mx))) ** 2)) }
const regMap = () => (px: number, py: number): V3 => P((px - REG.mx) * REG.u, (py - REG.my) * REG.u)
const regAxes = (S: (x: number, y: number) => V3) => axes2(S(0.4, 0)[0], S(0, 0.6)[1], S(0.4, 0)[0], S(8.8, 0)[0], S(0, 0.6)[1], S(0, 8.8)[1])

/** KG: r = Σ(xᵢ − x̄)(yᵢ − ȳ)/√(Σ(xᵢ − x̄)² Σ(yᵢ − ȳ)²) ∈ [−1, 1]; r² is the coefficient of determination. */
export function buildStatsCorrelationScene(): SceneSpec {
  return framed(raw_buildStatsCorrelationScene())
}
function raw_buildStatsCorrelationScene(): SceneSpec {
  const { x, y, outlier } = REG
  const S = regMap()
  const st = regStats(x, y), withOut = regStats([...x, outlier[0]], [...y, outlier[1]])
  return {
    id: 'math-stats-correlation',
    title: 'Sample correlation r and r²',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the sample correlation of eight points, r = Sxy/√(Sxx Syy) = 33.2/√(42 × 30.5) = 0.93, its square r² = 0.86 as the share of variation in y that goes with x, and how one outlier drops r to 0.57.',
    ariaLabel:
      'A scatter plot of eight points rising from lower left to upper right, with sample correlation 0.93 computed from the sums of squares 33.2, 42 and 30.5, so r squared is 0.86. Adding one point far below the trend, at x 7 and y 1.5, drops the correlation to 0.57.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Eight (x, y) points trend upward. Sample correlation r = Sxy ÷ √(Sxx · Syy) with Sxy = Σ(x − x̄)(y − ȳ) = 33.2, Sxx = 42, Syy = 30.5: r = 33.2 ÷ √1281 = 0.93, a strong positive linear association.', objects: [...regAxes(S), ...x.map((px, i) => dot(S(px, y[i]), ROLE.output, 0.1)), label(`r = Sxy / √(Sxx·Syy) = ${f2(st.r)}`, P(0, -2.75), ROLE.output, 'primary')] },
      { narration: 'Squaring gives the coefficient of determination r² = 0.86: about 86% of the variation in y goes along with x (in a straight-line fit).', objects: [label(`r² = ${f2(st.r * st.r)}`, P(-2.6, 1.9), ROLE.result, 'primary')] },
      { narration: 'Correlation is not robust. Add ONE point far below the trend, (7, 1.5): r falls from 0.93 to 0.57, although the other eight points have not moved.', objects: [dot(S(outlier[0], outlier[1]), ROLE.input, 0.14), label('outlier', P(S(outlier[0], outlier[1])[0] + 0.9, S(outlier[0], outlier[1])[1]), ROLE.input, 'primary'), label(`one outlier: r = ${f2(withOut.r)}`, P(0, -3.4), ROLE.input, 'primary')] },
    ],
  }
}

/** KG: Y = β₀ + β₁X + ε; OLS estimates β̂₁ = Sxy/Sxx, β̂₀ = ȳ − β̂₁x̄; minimises the sum of squared residuals. */
export function buildLinearRegressionScene(): SceneSpec {
  return framed(raw_buildLinearRegressionScene())
}
function raw_buildLinearRegressionScene(): SceneSpec {
  const { x, y } = REG
  const S = regMap()
  const st = regStats(x, y)
  const alt = st.b1 + 0.3
  const lineAt = (b0: number, b1: number, color: string, t: number) => line(S(0.6, b0 + b1 * 0.6), S(8.4, b0 + b1 * 8.4), color, t)
  return {
    id: 'math-linear-regression',
    title: 'Linear regression: the least-squares line',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show least squares: the line ŷ = 1.49 + 0.79x with slope Sxy/Sxx = 33.2/42 passes through the point of means (x̄, ȳ) = (4.5, 5.05) and has the smallest possible sum of squared vertical residuals, SSE = 4.26, against 8.04 for a steeper line through the same point.',
    ariaLabel:
      'Eight scatter points with the point of means 4.5, 5.05 marked in violet. The least-squares line through it has slope 0.79 and intercept 1.49. A grey comparison line with slope 1.09 through the same point is steeper. Red vertical segments from each point to the least-squares line are the residuals; their squares add to 4.26, whereas the comparison line would give 8.04.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The same eight points. First locate the point of means (x̄, ȳ) = (4.5, 5.05) (violet): every least-squares line passes through it.', objects: [...regAxes(S), ...x.map((px, i) => dot(S(px, y[i]), ROLE.output, 0.1)), dot(S(st.mx, st.my), ROLE.aid, 0.14), label('(x̄, ȳ) = (4.5, 5.05)', P(1.6, -2.7), ROLE.aid, 'primary')] },
      { narration: 'The slope is β̂₁ = Sxy ÷ Sxx = 33.2 ÷ 42 = 0.79 and the intercept β̂₀ = ȳ − β̂₁x̄ = 5.05 − 0.79 × 4.5 = 1.49. The fitted line ŷ = 1.49 + 0.79x predicts y from x.', objects: [lineAt(st.b0, st.b1, ROLE.result, 0.05), label(`ŷ = ${f2(st.b0)} + ${f2(st.b1)}x`, P(-2.5, 1.5), ROLE.result, 'primary')] },
      { narration: 'A residual is the vertical gap from a point to the line (red). Least squares picks the line making the SUM OF SQUARES of those gaps smallest: SSE = 4.26. A steeper line through the same point (grey, slope 1.09) is worse: SSE = 8.04.', objects: [lineAt(st.my - alt * st.mx, alt, ROLE.reference, 0.03), ...x.map((px, i) => line(S(px, y[i]), S(px, st.b0 + st.b1 * px), ROLE.input, 0.04)), label(`SSE = ${f2(st.sse)}`, P(0, -2.75), ROLE.input, 'primary'), label(`steeper line: ${f2(sseThroughMeans(x, y, alt))} is worse`, P(0, -3.4), ROLE.reference, 'primary')] },
    ],
  }
}

// ── 7. Normal approximation ──────────────────────────────────────────────────

/** Bin(20, 1/2) ≈ N(10, 5); bars k = 4..16 drawn; P(X ≤ 12) with the continuity correction cut at 12.5. */
export const NORMAPP = { n: 20, p: 0.5, kmin: 4, kmax: 16, u: 0.4, sy: 12, oy: -1.8, cut: 12 } as const
export const binomialCdf = (n: number, p: number, k: number) => { let s = 0; for (let i = 0; i <= k; i++) s += choose(n, i) * p ** i * (1 - p) ** (n - i); return s }
export const normalApprox = (n: number, p: number, x: number) => phi((x - n * p) / Math.sqrt(n * p * (1 - p)))

/** KG: Bin(n, p) ≈ N(np, np(1 − p)) for large n; the continuity correction P(X ≤ k) ≈ P(Y ≤ k + 0.5) improves the fit. */
export function buildNormalApproximationScene(): SceneSpec {
  return framed(raw_buildNormalApproximationScene())
}
function raw_buildNormalApproximationScene(): SceneSpec {
  const { n, p, kmin, kmax, u, sy, oy, cut } = NORMAPP
  const S = (k: number, y: number): V3 => P((k - n * p) * u, y * sy + oy)
  const ks = Array.from({ length: kmax - kmin + 1 }, (_, i) => kmin + i)
  const pmf = (k: number) => choose(n, k) * p ** k * (1 - p) ** (n - k)
  const sd = Math.sqrt(n * p * (1 - p))
  return {
    id: 'math-normal-approximation',
    title: 'Normal approximation to the binomial',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that Bin(20, 1/2), the heads in 20 flips, is closely matched by the normal curve N(10, 5), and that P(X ≤ 12) = 0.868 is approximated by the normal area to 12.5 (0.868) much better than to 12 (0.814): the continuity correction.',
    ariaLabel:
      'Bars for the number of heads in 20 fair flips, symmetric around 10 with a tallest bar of 0.176. A normal curve with mean 10 and variance 5 passes through the bar tops. The bars for 12 heads or fewer are shaded green; a violet line at 12.5 marks the continuity-corrected cut. The exact probability of 12 or fewer is 0.868, and the normal area to 12.5 is also 0.868, while the area to 12 would give 0.814.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Heads in 20 fair flips: X ~ Bin(20, 1/2). The bars are the probabilities C(20, k) ÷ 2²⁰: largest at k = 10 (0.176), symmetric, and tiny beyond 4 and 16.', objects: [baseline(S, 3, 17, oy), ...ks.map((k) => line(S(k, 0), S(k, pmf(k)), ROLE.output, 0.08)), ...[4, 6, 8, 10, 12, 14, 16].map((k) => label(String(k), P(S(k, 0)[0], oy - 0.4), ROLE.reference, 'detail')), label('Bin(20, 1/2)', P(-2.4, 1.9), ROLE.output, 'primary')] },
      { narration: 'A normal curve with the same mean np = 10 and variance np(1 − p) = 5 (σ ≈ 2.24) fits the bar tops closely: Bin(n, p) ≈ N(np, np(1 − p)) for large n.', objects: [curve(sampleMapped((k) => normPdf(k, n * p, sd), 3.5, 16.5, S, 52), ROLE.ink), label('N(10, 5)', P(2.4, 1.9), ROLE.ink, 'primary')] },
      { narration: 'Find P(X ≤ 12): the bars for 4 to 12 (green) add to 0.868. The normal curve gives the area to 12.5, halfway to the next bar: Φ((12.5 − 10) ÷ 2.24) = 0.868. Stopping at 12 would give only 0.814. That half-step is the continuity correction.', objects: [...ks.filter((k) => k <= cut).map((k) => line(S(k, 0), S(k, pmf(k)), ROLE.result, 0.1)), line(P(S(cut + 0.5, 0)[0], oy), P(S(cut + 0.5, 0)[0], oy + 2.2), ROLE.aid, 0.03), label(`P(X ≤ 12) = ${f3(binomialCdf(n, p, cut))}`, P(-2.0, -3.0), ROLE.result, 'primary'), label(`normal to 12.5: ${f3(normalApprox(n, p, cut + 0.5))}`, P(-2.0, -3.6), ROLE.aid, 'primary'), label(`without correction: ${f3(normalApprox(n, p, cut))}`, P(-2.0, -4.2), ROLE.reference, 'primary')] },
    ],
  }
}

// ── 8. Curve sketching ───────────────────────────────────────────────────────

/** f(x) = x/(1 + x²), drawn with the vertical scale 4× the horizontal (uy = 4 ux). */
export const SKETCH = { ux: 0.9, uy: 3.6 } as const
export const sketchF = (x: number) => x / (1 + x * x)
export const sketchFp = (x: number) => (1 - x * x) / (1 + x * x) ** 2
export const sketchFpp = (x: number) => (2 * x * (x * x - 3)) / (1 + x * x) ** 3

/** KG: sketch y = f(x) from the domain, intercepts, symmetry, asymptotes, increasing/decreasing intervals and concavity. */
export function buildCurveSketchingScene(): SceneSpec {
  return framed(raw_buildCurveSketchingScene())
}
function raw_buildCurveSketchingScene(): SceneSpec {
  const { ux, uy } = SKETCH
  const S = (x: number, y: number): V3 => P(x * ux, y * uy)
  const r3 = Math.sqrt(3)
  return {
    id: 'math-curve-sketching',
    title: 'Curve sketching: f(x) = x/(1 + x²)',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the curve-sketching checklist on f(x) = x/(1 + x²): odd symmetry and the asymptote y = 0, then the critical points (1, 0.5) and (−1, −0.5) from f′ = (1 − x²)/(1 + x²)², then the inflection points x = 0 and ±√3 from f″.',
    ariaLabel:
      'The graph of f of x equals x over 1 plus x squared, drawn with the vertical scale four times the horizontal. It is symmetric through the origin and flattens to the x-axis, a horizontal asymptote. A maximum at 1, 0.5 and a minimum at minus 1, minus 0.5 each have a horizontal tangent. Inflection points are at x equals 0 and plus or minus the square root of 3.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Step 1: domain all reals (1 + x² never 0). f(−x) = −f(x): odd, so the graph is symmetric through the origin, which is the only intercept. As x → ±∞, f → 0, so y = 0 is a horizontal asymptote.', objects: [...mathAxes(S, -4.2, 4.2, -0.6, 0.6), curve(sampleMapped(sketchF, -4, 4, S, 90), ROLE.ink), dot(S(0, 0), ROLE.result, 0.1), label('odd: f(−x) = −f(x)', P(-2.4, 1.9), ROLE.ink, 'primary'), label('asymptote y = 0', P(2.2, -0.8), ROLE.reference, 'primary')] },
      { narration: 'Step 2: f′(x) = (1 − x²) ÷ (1 + x²)² = 0 at x = ±1. f′ > 0 on (−1, 1) so f rises, then falls: a local minimum (−1, −0.5) and a local maximum (1, 0.5), both with horizontal tangents.', objects: [dot(S(1, sketchF(1)), ROLE.output, 0.12), dot(S(-1, sketchF(-1)), ROLE.input, 0.12), line(S(0.3, sketchF(1)), S(1.7, sketchF(1)), ROLE.aid, 0.03), line(S(-1.7, sketchF(-1)), S(-0.3, sketchF(-1)), ROLE.aid, 0.03), label('max (1, 0.5)', P(S(1, 0)[0] + 1.0, S(1, sketchF(1))[1] + 0.4), ROLE.output, 'primary'), label('min (−1, −0.5)', P(S(-1, 0)[0] - 1.0, S(-1, sketchF(-1))[1] - 0.4), ROLE.input, 'primary')] },
      { narration: 'Step 3: f″(x) = 2x(x² − 3) ÷ (1 + x²)³ changes sign at x = 0 and x = ±√3 ≈ ±1.73: three inflection points where the curve switches between concave up and concave down. Together these facts give the sketch.', objects: [dot(S(r3, sketchF(r3)), ROLE.result, 0.11), dot(S(-r3, sketchF(-r3)), ROLE.result, 0.11), label('inflections: x = 0, ±√3', P(0, -1.9), ROLE.result, 'primary')] },
    ],
  }
}

// ── 9. Volumes of revolution ─────────────────────────────────────────────────

/** y = √x on [0, 4] rotated about the x-axis, drawn at 0.9 per unit; 8 midpoint disks of width 0.5 give V = 8π exactly. */
export const VOLREV = { u: 0.9, ox: -1.8, a: 0, b: 4, disks: 8, rx: 0.1, hatchStep: 0.125 } as const
export const volF = (x: number) => Math.sqrt(x)
/** V = π ∫ f² dx = π ∫₀⁴ x dx = 8π. */
export const volExact = () => 8 * Math.PI
export const diskCentres = () => Array.from({ length: VOLREV.disks }, (_, i) => VOLREV.a + ((i + 0.5) * (VOLREV.b - VOLREV.a)) / VOLREV.disks)

/** KG: disk method V = π∫f² dx; washer π∫(f² − g²) dx; shell 2π∫x f(x) dx. */
export function buildVolumeRevolutionScene(): SceneSpec {
  return framed(raw_buildVolumeRevolutionScene())
}
function raw_buildVolumeRevolutionScene(): SceneSpec {
  const { u, ox, a, b, rx, hatchStep } = VOLREV
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u)
  return {
    id: 'math-volume-revolution',
    title: 'Volume of revolution: stacking disks',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the disk method on y = √x for x from 0 to 4 rotated about the x-axis: the solid is a stack of thin disks of radius √x and thickness Δx, so V = π∫₀⁴ x dx = 8π ≈ 25.13; eight midpoint disks of width 0.5 add to exactly 8π.',
    ariaLabel:
      'The region under the curve y equals the square root of x from 0 to 4, shaded. Reflecting the curve below the axis shows the solid formed by rotating it about the x-axis, with a circular end of radius 2 at x equals 4. The solid is cut into eight thin disks, drawn as ellipses, whose radii are the square roots of 0.25, 0.75 up to 3.75; their volumes pi times x times 0.5 add to 8 pi, about 25.13.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The region under y = √x from x = 0 to x = 4. We will rotate it about the x-axis.', objects: [...mathAxes(S, -0.3, 4.5, -2.4, 2.4), curve(sampleMapped(volF, 0, 4, S, 50), ROLE.ink), ...vHatch(S, volF, zero, a, b, hatchStep, ROLE.output), label('y = √x', P(S(4, 0)[0] - 0.6, S(4, 2)[1] + 0.5), ROLE.ink, 'primary')] },
      { narration: 'Rotating about the x-axis sweeps out a solid: its silhouette is the curve and its mirror image, and each cross-section is a circle. At x = 4 the circle has radius √4 = 2.', objects: [curve(sampleMapped((x) => -volF(x), 0, 4, S, 50), ROLE.aid), ellipse(S(4, 0)[0], 0, rx, volF(4) * u, ROLE.aid), label('rotate about the x-axis', P(0.4, -2.55), ROLE.aid, 'primary')] },
      { narration: 'Slice the solid into thin disks. A disk at x has radius f(x) = √x and thickness Δx, so volume π f(x)² Δx = π x Δx. Eight disks of width 0.5 (at their midpoints) add to π × 0.5 × (0.25 + 0.75 + … + 3.75) = 8π; as the disks get thinner, V = π∫₀⁴ x dx = 8π ≈ 25.13.', objects: [...diskCentres().map((x) => ellipse(S(x, 0)[0], 0, rx, volF(x) * u, ROLE.result)), label('disk: π f(x)² Δx', P(-2.0, 2.4), ROLE.result, 'primary'), label('V = π∫₀⁴ x dx = 8π ≈ 25.13', P(0.4, -3.2), ROLE.result, 'primary')] },
    ],
  }
}

// ── 10. Surface area of revolution ───────────────────────────────────────────

/** y = x on [0, 2] rotated about the x-axis: a cone of radius 2 and slant 2√2; four bands. Drawn at 1.4 per unit. */
export const SURF = { u: 1.4, ox: -1.4, a: 0, b: 2, bands: 4, rx: 0.1 } as const
/** S = 2π ∫ f √(1 + f′²) dx = 2π ∫₀² x √2 dx = 4π√2 ≈ 17.77 = π r l. */
export const surfExact = () => 4 * Math.PI * Math.SQRT2
export const bandCentres = () => Array.from({ length: SURF.bands }, (_, i) => SURF.a + ((i + 0.5) * (SURF.b - SURF.a)) / SURF.bands)

/** KG: the area generated by rotating y = f(x) about the x-axis is S = 2π ∫ f(x) √(1 + [f′(x)]²) dx. */
export function buildSurfaceAreaIntegralScene(): SceneSpec {
  return framed(raw_buildSurfaceAreaIntegralScene())
}
function raw_buildSurfaceAreaIntegralScene(): SceneSpec {
  const { u, ox, a, b, bands, rx } = SURF
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u)
  const edges = Array.from({ length: bands + 1 }, (_, i) => a + (i * (b - a)) / bands)
  return {
    id: 'math-surface-area-integral',
    title: 'Surface area of revolution: slanted bands',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show surface area of revolution on y = x for x from 0 to 2 (a cone): cut the slant into short pieces of length Δs; each sweeps a band of area 2π f(x) Δs, and the bands add to S = 2π∫ x√2 dx = 4π√2 ≈ 17.77, which equals π r l = π · 2 · 2√2.',
    ariaLabel:
      'The line y equals x from 0 to 2 and its mirror image form the silhouette of a cone with a circular end of radius 2. The slanted side is cut into four equal pieces, each of length 0.5 times the square root of 2, and a ring is drawn at the middle of each piece with radius 0.25, 0.75, 1.25 and 1.75. Each band has area 2 pi times its radius times its slant length, and they add to 4 pi root 2, about 17.77, the same as pi times radius 2 times slant length 2 root 2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Rotate the segment y = x, 0 ≤ x ≤ 2, about the x-axis. The solid is a cone: radius 2 at the open end, slant length 2√2.', objects: [...mathAxes(S, -0.3, 2.5, -2.3, 2.3), line(S(a, a), S(b, b), ROLE.ink, 0.06), line(S(a, -a), S(b, -b), ROLE.aid, 0.04), ellipse(S(b, 0)[0], 0, rx, b * u, ROLE.aid), label('rotate y = x about the x-axis', P(-0.4, 3.1), ROLE.aid, 'primary')] },
      { narration: 'Cut the slant into 4 short pieces, each of length Δs = 0.5√2. Each piece sweeps a thin band (a ring seen edge-on, drawn at its middle) of radius f(x) and slant width Δs, so its area is about 2π f(x) Δs.', objects: [...edges.slice(0, bands).map((x0, i) => line(S(x0, x0), S(edges[i + 1], edges[i + 1]), i % 2 === 0 ? ROLE.output : ROLE.input, 0.1)), ...bandCentres().map((x) => ellipse(S(x, 0)[0], 0, rx, x * u, ROLE.result)), label('band: 2π f(x) Δs', P(-0.6, 2.4), ROLE.result, 'primary')] },
      { narration: 'Add the bands: Σ 2π f(x) Δs = 2π × 0.5√2 × (0.25 + 0.75 + 1.25 + 1.75) = 4π√2. In the limit S = 2π∫₀² x√2 dx = 4π√2 ≈ 17.77, matching the cone formula π r l = π × 2 × 2√2.', objects: [label('S = 2π∫₀² x√2 dx = 4π√2 ≈ 17.77', P(0, -3.2), ROLE.result, 'primary'), label('check: π r l = π · 2 · 2√2', P(0, -3.8), ROLE.aid, 'primary')] },
    ],
  }
}

// ── 11. Calculus of parametric curves ────────────────────────────────────────

/** One arch of the cycloid x = t − sin t, y = 1 − cos t, 0 ≤ t ≤ 2π (r = 1). Drawn at 0.9 per unit, centred on (π, 1). */
export const CYC = { u: 0.9, t0: Math.PI / 2, chords: 12, strips: 24 } as const
export const cycX = (t: number) => t - Math.sin(t)
export const cycY = (t: number) => 1 - Math.cos(t)
export const cycSlope = (t: number) => Math.sin(t) / (1 - Math.cos(t))
/** Length of the polygon through the chord points t = 2π i / n. */
export const chordLength = (n: number) => { let s = 0; for (let i = 0; i < n; i++) { const a = (2 * Math.PI * i) / n, b = (2 * Math.PI * (i + 1)) / n; s += Math.hypot(cycX(b) - cycX(a), cycY(b) - cycY(a)) } return s }
/** Midpoint-rule area under the arch: Σ y(t) x′(t) Δt over the strips (exact value 3π). */
export const cycArea = (n: number) => { let s = 0; const dt = (2 * Math.PI) / n; for (let i = 0; i < n; i++) { const t = (i + 0.5) * dt; s += cycY(t) * (1 - Math.cos(t)) * dt } return s }

/** KG: dy/dx = (dy/dt)/(dx/dt); arc length L = ∫√((dx/dt)² + (dy/dt)²) dt; area under the curve ∫ y (dx/dt) dt. */
export function buildParametricCalculusScene(): SceneSpec {
  return framed(raw_buildParametricCalculusScene())
}
function raw_buildParametricCalculusScene(): SceneSpec {
  const { u, t0, chords, strips } = CYC
  const S = (x: number, y: number): V3 => P((x - Math.PI) * u, (y - 1) * u)
  const pt = (t: number): V3 => S(cycX(t), cycY(t))
  const dt = (2 * Math.PI) / strips
  const hatch = Array.from({ length: strips }, (_, k) => (k + 0.5) * dt).map((t) => line(S(cycX(t), 0), S(cycX(t), cycY(t)), ROLE.result, 0.03))
  return {
    id: 'math-parametric-calculus',
    title: 'Calculus of parametric curves: the cycloid',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the three parametric calculus formulas on one cycloid arch x = t − sin t, y = 1 − cos t: the slope dy/dx = (dy/dt)/(dx/dt) (equal to 1 at t = π/2), the arc length ∫√((dx/dt)² + (dy/dt)²) dt = 8, and the area under the arch ∫ y dx/dt dt = 3π.',
    ariaLabel:
      'One arch of a cycloid from x 0 to 2 pi, height 2. A violet tangent at the point for t equals pi over 2 has slope 1. An inscribed polygon of 12 chords has length about 7.98, approaching the exact arc length 8. Vertical strips under the arch give the area 3 pi, about 9.42.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A cycloid: the path of a point on a rolling wheel, x = t − sin t, y = 1 − cos t. The slope is dy/dx = (dy/dt) ÷ (dx/dt) = sin t ÷ (1 − cos t). At t = π/2 it equals 1, so the tangent (violet) rises at 45°.', objects: [line(P(S(-0.4, 0)[0], S(0, 0)[1]), P(S(2 * Math.PI + 0.4, 0)[0], S(0, 0)[1]), ROLE.reference, 0.04), curve(Array.from({ length: 60 }, (_, i) => pt((2 * Math.PI * i) / 59)), ROLE.ink), line(S(cycX(t0) - 1.1, cycY(t0) - 1.1 * cycSlope(t0)), S(cycX(t0) + 1.1, cycY(t0) + 1.1 * cycSlope(t0)), ROLE.aid, 0.05), dot(pt(t0), ROLE.input, 0.12), label('dy/dx = sin t/(1 − cos t) = 1 at t = π/2', P(0, 1.45), ROLE.aid, 'primary')] },
      { narration: 'Arc length L = ∫√((dx/dt)² + (dy/dt)²) dt. Joining 12 points of the curve by chords already gives 7.98 (blue); finer chords approach the exact value 8.', objects: [...Array.from({ length: chords }, (_, i) => line(pt((2 * Math.PI * i) / chords), pt((2 * Math.PI * (i + 1)) / chords), ROLE.output, 0.04)), label('12 chords: 7.98 → L = 8', P(0, -1.5), ROLE.output, 'primary')] },
      { narration: 'Area under the arch = ∫ y (dx/dt) dt, summed over strips at equal steps of t (green): 24 strips give 9.42, the exact value 3π.', objects: [...hatch, label('area = ∫ y dx/dt dt = 3π ≈ 9.42', P(0, -2.1), ROLE.result, 'primary')] },
    ],
  }
}

// ── 12. Periodic function ────────────────────────────────────────────────────

/** sin x on [−π, 3π] (period 2π) and sin 2x (period π). Screen x = (x − π) u. */
export const PERIOD = { u: 0.4, yScale: 1.2, x0: -Math.PI, x1: 3 * Math.PI, probe: 1 } as const

/** KG: f(x + T) = f(x) for all x and some T > 0 (the period); trigonometric functions are the archetypal examples. */
export function buildPeriodicFunctionScene(): SceneSpec {
  return framed(raw_buildPeriodicFunctionScene())
}
function raw_buildPeriodicFunctionScene(): SceneSpec {
  const { u, yScale, x0, x1, probe } = PERIOD
  const S = (x: number, y: number): V3 => P((x - Math.PI) * u, y * yScale)
  const T = 2 * Math.PI
  return {
    id: 'math-periodic-function',
    title: 'Periodic function: the pattern repeats every period T',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show periodicity f(x + T) = f(x): sin x repeats every T = 2π (the same height one period apart), while sin 2x repeats twice as fast, with period π.',
    ariaLabel:
      'The graph of sine from minus pi to 3 pi: two full waves. A bracket under one wave from 0 to 2 pi labels the period T equals 2 pi. Two green dots one period apart, at x equals 1 and 1 plus 2 pi, are joined by a dashed line to show they have the same height. A red curve, sine of 2 x, repeats twice as fast with period pi.',
    stage: NO_STAGE,
    steps: [
      { narration: 'f(x) = sin x over two and a bit waves. The same pattern keeps repeating to the left and right forever.', objects: [...mathAxes(S, -3.6, 10.2, -1.4, 1.4), curve(sampleMapped(Math.sin, x0, x1, S, 100), ROLE.ink), label('f(x) = sin x', P(-2.3, 1.9), ROLE.ink, 'primary')] },
      { narration: 'A function is periodic with period T if f(x + T) = f(x) for every x. For sin x, T = 2π: the points at x = 1 and x = 1 + 2π (green) have exactly the same height, sin 1 ≈ 0.84.', objects: [...bracket(S(0, 0)[0], S(T, 0)[0], -1.9, ROLE.output), label('period T = 2π', P(S(Math.PI, 0)[0], -2.4), ROLE.output, 'primary'), dot(S(probe, Math.sin(probe)), ROLE.result, 0.12), dot(S(probe + T, Math.sin(probe + T)), ROLE.result, 0.12), guide(S(probe, Math.sin(probe)), S(probe + T, Math.sin(probe + T)), ROLE.result, 0.03), label('f(x + T) = f(x)', P(S(probe + Math.PI, 0)[0], S(probe, Math.sin(probe))[1] + 0.5), ROLE.result, 'primary')] },
      { narration: 'sin 2x completes a wave in half the distance: its period is π (red), because sin(2(x + π)) = sin(2x + 2π) = sin 2x. The period is the SMALLEST such T; sin x does not repeat after π, since sin(x + π) = −sin x.', objects: [curve(sampleMapped((x) => Math.sin(2 * x), x0, x1, S, 160), ROLE.input), ...bracket(S(0, 0)[0], S(Math.PI, 0)[0], -3.1, ROLE.input), label('sin 2x: T = π', P(S(Math.PI / 2, 0)[0], -3.6), ROLE.input, 'primary')] },
    ],
  }
}
