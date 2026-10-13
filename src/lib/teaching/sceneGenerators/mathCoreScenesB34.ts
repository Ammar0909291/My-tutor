/**
 * Core mathematics figures — batch 34 of the mathematics visual campaign (2026-10-12): the statistics helpers
 * (population and sample, sampling methods, the standard error, the test statistic and the p-value, the z-test, the
 * t-test, two-way ANOVA, the covariance matrix, Bayesian updating, the credible interval, experimental design).
 *
 * Same rules as batches 1-33: one visual language from visualDesign.ts, labels are names not sentences (marks of 1-2
 * characters are free), steps are cumulative, coordinates stay inside +-5, at most 50 objects per step, nothing the figure
 * audit rejects (SM-01 evaluates the arithmetic in a label left to right: never write "1 × 5 + 2 × 7 = 19" as one label),
 * and every mean, area, variance and count a figure states is re-derived by the test file from the DRAWN dots, bars and
 * curves (areas are integrated from the drawn curve, distributions are checked against an independent closed form).
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, sampleMapped, type V3 } from './mathSceneKit'
import { matrix, type MSpec } from './mathCoreScenesB32'

export type Pt = readonly [number, number]
const pp = (p: Pt) => P(p[0], p[1])
const ln = (a: Pt, b: Pt, color: string = ROLE.reference, t = 0.04): SceneObject => line(pp(a), pp(b), color, t)
const dt = (p: Pt, color: string = ROLE.ink, r = 0.16): SceneObject => dot(pp(p), color, r)
const lb = (text: string, p: Pt, color: string = ROLE.ink): SceneObject => label(text, pp(p), color, 'primary')
const ar = (a: Pt, b: Pt, color: string = ROLE.reference): SceneObject => arrow(pp(a), pp(b), color)
/** Maps graph coordinates (x, y) to the figure: screen = origin + (x · ux, y · uy). */
export type Frame = { ox: number; oy: number; ux: number; uy: number }
export const at = (f: Frame, x: number, y: number): Pt => [f.ox + x * f.ux, f.oy + y * f.uy]
const mapOf = (f: Frame) => (x: number, y: number): V3 => P(f.ox + x * f.ux, f.oy + y * f.uy)
const curveOf = (f: Frame, fn: (x: number) => number, x0: number, x1: number, color: string, n = 80): SceneObject => curve(sampleMapped(fn, x0, x1, mapOf(f), n), color)
const lineAt = (f: Frame, a: Pt, b: Pt, color: string, t = 0.04): SceneObject => ln(at(f, a[0], a[1]), at(f, b[0], b[1]), color, t)
const dotAt = (f: Frame, x: number, y: number, color: string, r = 0.14): SceneObject => dt(at(f, x, y), color, r)
const labelAt = (f: Frame, text: string, x: number, y: number, color: string = ROLE.ink, dx = 0, dy = 0): SceneObject => lb(text, [at(f, x, y)[0] + dx, at(f, x, y)[1] + dy], color)
/** The standard normal density. */
export const phi = (z: number) => Math.exp(-(z * z) / 2) / Math.sqrt(2 * Math.PI)
/** The density of N(mu, sd²). */
export const normalPdf = (mu: number, sd: number) => (x: number) => phi((x - mu) / sd) / sd
/** The Beta(a, b) density, with B(a, b) from integer arguments. */
const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1))
export const betaPdf = (a: number, b: number) => (t: number) => (t <= 0 || t >= 1 ? 0 : (factorial(a + b - 1) / (factorial(a - 1) * factorial(b - 1))) * Math.pow(t, a - 1) * Math.pow(1 - t, b - 1))
/** Student's t density with 9 degrees of freedom: Γ(5) / (√(9π) Γ(9/2)) · (1 + t²/9)^(−5), Γ(9/2) = 3.5 · 2.5 · 1.5 · 0.5 · √π. */
export const t9Pdf = (t: number) => (24 / (Math.sqrt(9 * Math.PI) * 3.5 * 2.5 * 1.5 * 0.5 * Math.sqrt(Math.PI))) * Math.pow(1 + (t * t) / 9, -5)

// ── 1. Population and sample ─────────────────────────────────────────────────

/** A population of 24 values with mean 60 (a dot plot) and a sample of 6 of them with mean 63: the sample mean estimates, but does not equal, the population mean. */
export const POP = {
  values: [45, 48, 50, 52, 54, 55, 56, 57, 58, 59, 59, 60, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 72] as readonly number[],
  sample: [55, 60, 64, 65, 66, 68] as readonly number[],
  ux: 0.2, axisY: -1.5, rowY: 0.33, firstY: -1.15,
}
/** Position of the dot for a value stacked `level` high (level 0 sits on the axis). */
export const popAt = (v: number, level: number): Pt => [(v - 60) * POP.ux, POP.firstY + POP.rowY * level]
/** Stack level of the k-th occurrence of each value. */
export const popLevels = (): number[] => { const seen = new Map<number, number>(); return POP.values.map((v) => { const k = seen.get(v) ?? 0; seen.set(v, k + 1); return k }) }

/** KG: a population is the whole set of interest, a sample is a subset used to draw conclusions about it. */
export function buildPopulationSampleScene(): SceneSpec {
  return framed(raw_buildPopulationSampleScene())
}
function raw_buildPopulationSampleScene(): SceneSpec {
  const lv = popLevels()
  const popDots = POP.values.map((v, i) => dt(popAt(v, lv[i]), ROLE.ink, 0.1))
  const pickLevel = (v: number, used: Map<number, number>) => { const k = used.get(v) ?? 0; used.set(v, k + 1); return k }
  const used = new Map<number, number>()
  const sampleDots = POP.sample.map((v) => dt(popAt(v, pickLevel(v, used)), ROLE.aid, 0.17))
  const xbar = POP.sample.reduce((s, v) => s + v, 0) / POP.sample.length
  return {
    id: 'math-population-sample',
    title: 'A population and a sample drawn from it',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the difference between a population and a sample. The population is the complete set of units of interest: here 24 measurements, drawn as a dot plot, with population mean μ = 60 (green line). A sample is a subset taken from it: here 6 of the values (violet), 55, 60, 64, 65, 66 and 68, whose mean is x̄ = 378 ÷ 6 = 63. The sample mean is used to estimate μ, but it is not equal to it — the gap of 3 is sampling error — which is why inference needs the sample to be representative and large enough.',
    ariaLabel:
      'A dot plot with a horizontal axis from 45 to 70 and 24 small light dots stacked above it, centred around 60, with a green vertical line at 60 labelled the population mean. In the second step six of the dots become larger violet dots, labelled the sample. In the third step a violet vertical line at 63 labelled x bar equals 63 appears just to the right of the green line.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The population: all 24 measurements, one dot each. Their mean is μ = 60 (green line).', objects: [ar([-3.4, POP.axisY], [3.3, POP.axisY]), ...[45, 50, 55, 60, 65, 70].map((v) => lb(String(v), [(v - 60) * POP.ux, POP.axisY - 0.4])), ...popDots, lineAt({ ox: 0, oy: 0, ux: 1, uy: 1 }, [0, POP.axisY], [0, 0.7], ROLE.result, 0.04), lb('population mean μ = 60', [0, 1.0], ROLE.result)] },
      { narration: 'A sample: 6 of the 24 units (violet dots) — the only data we actually have.', objects: [...sampleDots, lb('sample of 6', [-2.6, 0.7], ROLE.aid)] },
      { narration: 'The sample mean is x̄ = (55 + 60 + 64 + 65 + 66 + 68) ÷ 6 = 63 (violet line): close to μ = 60 but not equal to it — the difference is sampling error.', objects: [lineAt({ ox: 0, oy: 0, ux: 1, uy: 1 }, [(xbar - 60) * POP.ux, POP.axisY], [(xbar - 60) * POP.ux, 0.1], ROLE.aid, 0.04), lb('x̄ = 63', [(xbar - 60) * POP.ux + 0.9, 0.15], ROLE.aid)] },
    ],
  }
}

// ── 2. Sampling methods ──────────────────────────────────────────────────────

/** 36 units in a 6 × 6 grid; four ways to pick 6 of them: a simple random sample, 2 per band (stratified), 2 whole groups of 3 (cluster), every 6th unit (systematic). */
export const SMP = {
  cell: 0.38, n: 6,
  centres: { srs: [-2.9, 1.4], strat: [2.9, 1.4], cluster: [-2.9, -1.9], sys: [2.9, -1.9] } as Record<'srs' | 'strat' | 'cluster' | 'sys', Pt>,
  /** selected units as k = 6 · row + column (row 0 at the top) */
  picks: { srs: [1, 11, 14, 19, 26, 30], strat: [3, 8, 13, 22, 25, 34], cluster: [9, 10, 11, 24, 25, 26], sys: [2, 8, 14, 20, 26, 32] } as Record<'srs' | 'strat' | 'cluster' | 'sys', readonly number[]>,
}
/** Centre of unit k = 6 · row + column in a panel. */
export const smpCell = (panel: keyof typeof SMP.centres, k: number): Pt => { const [cx, cy] = SMP.centres[panel], row = Math.floor(k / 6), col = k % 6; return [cx + (col - 2.5) * SMP.cell, cy + (2.5 - row) * SMP.cell] }

/** KG: SRS gives every unit the same chance; stratified samples within groups; cluster samples whole groups; systematic takes every kth unit. */
export function buildSamplingScene(): SceneSpec {
  return framed(raw_buildSamplingScene())
}
function raw_buildSamplingScene(): SceneSpec {
  const half = 3 * SMP.cell
  const grid = (panel: keyof typeof SMP.centres): SceneObject[] => {
    const [cx, cy] = SMP.centres[panel]
    return [...Array.from({ length: 7 }, (_, i) => ln([cx - half + i * SMP.cell, cy - half], [cx - half + i * SMP.cell, cy + half], ROLE.reference, 0.02)), ...Array.from({ length: 7 }, (_, i) => ln([cx - half, cy - half + i * SMP.cell], [cx + half, cy - half + i * SMP.cell], ROLE.reference, 0.02))]
  }
  const picks = (panel: keyof typeof SMP.centres, color: string): SceneObject[] => SMP.picks[panel].map((k) => dt(smpCell(panel, k), color, 0.14))
  const bands = (panel: keyof typeof SMP.centres): SceneObject[] => { const [cx, cy] = SMP.centres[panel]; return [2, 4].map((r) => ln([cx - half, cy + half - r * SMP.cell], [cx + half, cy + half - r * SMP.cell], ROLE.aid, 0.05)) }
  const title = (panel: keyof typeof SMP.centres, text: string, color: string) => lb(text, [SMP.centres[panel][0], SMP.centres[panel][1] + half + 0.4], color)
  return {
    id: 'math-sampling',
    title: 'Four ways to sample 36 units',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show four sampling methods on the same population of 36 units (each grid cell is a unit) with a sample of 6 each (dots). In a simple random sample (SRS) every unit is equally likely to be chosen, so the dots fall anywhere. In a stratified sample the population is split into three bands of 12 (violet lines) and an SRS of 2 is drawn inside each band. In a cluster sample whole groups are selected: here two groups of 3 neighbouring units. In a systematic sample every 6th unit is taken from a random start (unit 3 here, then 9, 15, …, 33). Non-random selection would bring selection bias.',
    ariaLabel:
      'Four 6 by 6 grids, each with six marked cells. In the first step the top-left grid labelled SRS has six scattered blue dots, and the top-right grid labelled stratified has two red dots in each of three horizontal bands separated by violet lines. In the second step the bottom-left grid labelled cluster has two horizontal runs of three green dots, and the bottom-right grid labelled systematic has six violet dots in one column. In the third step the caption 6 units each appears in the centre.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Left: a simple random sample — any 6 of the 36 units, each equally likely. Right: stratified — three bands of 12 units (violet lines) and 2 units drawn at random inside each band.', objects: [...grid('srs'), ...picks('srs', ROLE.output), title('srs', 'SRS: any 6 units', ROLE.output), ...grid('strat'), ...bands('strat'), ...picks('strat', ROLE.input), title('strat', 'stratified: 2 per band', ROLE.input)] },
      { narration: 'Left: cluster — whole groups are chosen, here two groups of 3 neighbouring units. Right: systematic — every 6th unit from a random start (3rd, 9th, 15th, …).', objects: [...grid('cluster'), ...picks('cluster', ROLE.result), title('cluster', 'cluster: 2 whole groups', ROLE.result), ...grid('sys'), ...picks('sys', ROLE.aid), title('sys', 'systematic: every 6th', ROLE.aid)] },
      { narration: 'All four draw 6 of the 36 units, but only the random choices (the SRS, the random picks inside bands and the random clusters or start) protect against selection bias.', objects: [lb('6 units each', [0, 1.4])] },
    ],
  }
}

// ── 3. Standard error ────────────────────────────────────────────────────────

/** x̄ ~ N(100, SE²) with SE = σ/√n and σ = 8: n = 4 gives SE = 8 ÷ 2 = 4, n = 16 gives SE = 8 ÷ 4 = 2. */
export const SER: Frame & { mu: number; sigma: number; ns: readonly [number, number]; half: number } = { ox: 0, oy: -1.9, ux: 0.33, uy: 10, mu: 100, sigma: 8, ns: [4, 16], half: 12 }
export const serSE = (n: number) => SER.sigma / Math.sqrt(n)

/** KG: SE(X̄) = σ/√n is the standard deviation of the sampling distribution of the sample mean; it falls as n grows. */
export function buildStandardErrorScene(): SceneSpec {
  return framed(raw_buildStandardErrorScene())
}
function raw_buildStandardErrorScene(): SceneSpec {
  const curveFor = (n: number, color: string) => curveOf(SER, (x) => normalPdf(0, serSE(n))(x), -SER.half, SER.half, color, 72)
  const bracket = (n: number, color: string) => { const se = serSE(n); return lineAt(SER, [-se, normalPdf(0, se)(se)], [se, normalPdf(0, se)(se)], color, 0.04) }
  return {
    id: 'math-standard-error',
    title: 'The standard error shrinks as n grows',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that the standard error is the standard deviation of the sampling distribution of the sample mean and that it shrinks as the sample grows. With population standard deviation σ = 8, the sample mean x̄ of n = 4 observations varies around μ with standard deviation SE = σ/√n = 8 ÷ 2 = 4 (wide blue curve); with n = 16 observations it varies half as much, SE = 8 ÷ 4 = 2 (tall narrow green curve). The violet segments span μ ± SE. Four times the data halves the standard error.',
    ariaLabel:
      'A horizontal axis with a wide flat blue bell curve centred at the middle, labelled n equals 4, with a violet segment marking one standard error either side. In the second step a taller, narrower green bell curve centred at the same point, labelled n equals 16, with a shorter violet segment. In the third step the formula SE equals sigma over the square root of n and the captions 8 divided by 2 equals 4 and 8 divided by 4 equals 2 appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The sampling distribution of x̄ for n = 4 (σ = 8): centred at μ and wide, with standard deviation SE = 8 ÷ 2 = 4 (the violet segment spans μ ± SE).', objects: [ar(at(SER, -SER.half - 1, 0), at(SER, SER.half + 1, 0)), curveFor(4, ROLE.output), bracket(4, ROLE.aid), lb('n = 4', [-3.0, 1.2], ROLE.output), lb('8 ÷ 2 = 4', [-3.0, 0.5], ROLE.output)] },
      { narration: 'With n = 16 the same σ gives SE = 8 ÷ 4 = 2: the curve is half as wide and twice as tall — the sample mean is more precise.', objects: [curveFor(16, ROLE.result), bracket(16, ROLE.aid), lb('n = 16', [3.0, 1.2], ROLE.result), lb('8 ÷ 4 = 2', [3.0, 0.5], ROLE.result)] },
      { narration: 'SE = σ/√n: quadrupling the sample size (4 → 16) halves the standard error.', objects: [lb('SE = σ/√n', [0, 2.2]), lb('n × 4 → SE ÷ 2', [0, 1.5], ROLE.aid)] },
    ],
  }
}

// ── 4. Test statistic ────────────────────────────────────────────────────────

/** Under H₀ the test statistic is N(0, 1); an observed z = 2.1 has upper-tail probability 1 − Φ(2.1) = 0.0179 (bars of width 0.05 from 2.1 to 3.3). */
export const TST: Frame & { z: number; zMax: number; dz: number } = { ox: -0.4, oy: -2.0, ux: 1.0, uy: 10, z: 2.1, zMax: 3.3, dz: 0.05 }
export const tstBarMid = (k: number) => TST.z + (k + 0.5) * TST.dz
export const tstBars = Math.round((TST.zMax - TST.z) / TST.dz)

/** KG: a test statistic measures the evidence against H₀; its null distribution turns the observed value into a p-value. */
export function buildTestStatisticScene(): SceneSpec {
  return framed(raw_buildTestStatisticScene())
}
function raw_buildTestStatisticScene(): SceneSpec {
  const bars = Array.from({ length: tstBars }, (_, k) => lineAt(TST, [tstBarMid(k), 0], [tstBarMid(k), phi(tstBarMid(k))], ROLE.result, 0.03))
  return {
    id: 'math-test-statistic',
    title: 'The test statistic and its p-value',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how a test statistic is compared with its null distribution. If H₀ is true the statistic Z follows the standard normal curve N(0, 1) (blue). The data give one observed value, here z = 2.1 (red dot). The p-value is the probability, if H₀ is true, of a value at least as extreme: the area under the curve to the right of 2.1 (green bars), which is 1 − Φ(2.1) ≈ 0.018. A small p-value means the observed value would be rare under H₀ — evidence against it.',
    ariaLabel:
      'A blue standard normal bell curve over an axis marked minus 2, 0 and 2, captioned H0: Z follows N(0, 1). In the second step a red dot on the axis at 2.1 labelled observed z equals 2.1. In the third step thin green vertical bars fill the area under the curve to the right of 2.1, with the caption p is about 0.018.',
    stage: NO_STAGE,
    steps: [
      { narration: 'If H₀ is true, the test statistic Z has the N(0, 1) distribution (blue curve): most values lie between −2 and 2.', objects: [ar(at(TST, -3.8, 0), at(TST, 3.8, 0)), curveOf(TST, phi, -3.5, 3.5, ROLE.output, 80), ...[-2, 0, 2].map((z) => labelAt(TST, String(z).replace('-', '−'), z, 0, ROLE.ink, 0, -0.35)), lb('H₀: Z ~ N(0, 1)', [-3.1, 1.2], ROLE.output)] },
      { narration: 'The data give one observed value of the statistic: z = 2.1 (red dot).', objects: [dotAt(TST, TST.z, 0, ROLE.input, 0.14), lb('observed z = 2.1', [at(TST, TST.z, 0)[0] + 0.5, at(TST, TST.z, 0)[1] - 0.85], ROLE.input)] },
      { narration: 'The p-value is the area to the right of 2.1 under the null curve (green bars): about 0.018. Values this large are rare under H₀.', objects: [...bars, lb('p ≈ 0.018', [at(TST, 2.8, 0)[0], at(TST, 2.8, 0)[1] + 1.1], ROLE.result)] },
    ],
  }
}

// ── 5. z-test ────────────────────────────────────────────────────────────────

/** H₀: μ = 100, σ = 15, n = 36 so SE = 15 ÷ 6 = 2.5; observed x̄ = 106 gives z = 6 ÷ 2.5 = 2.4; the two rejection tails |z| ≥ 1.96 hold 5% of the area. */
export const ZTS: Frame & { crit: number; zObs: number; zMax: number; dz: number } = { ox: 0, oy: -1.5, ux: 1.0, uy: 10, crit: 1.96, zObs: 2.4, zMax: 3.3, dz: 0.1 }
export const ztsBarMid = (k: number) => ZTS.crit + (k + 0.5) * ZTS.dz
export const ztsBars = Math.floor((ZTS.zMax - ZTS.crit) / ZTS.dz)

/** KG: the z-test uses Z = (X̄ − μ₀)/(σ/√n), N(0, 1) under H₀, and rejects when |Z| exceeds the critical value. */
export function buildZTestScene(): SceneSpec {
  return framed(raw_buildZTestScene())
}
function raw_buildZTestScene(): SceneSpec {
  const tail = (sign: number) => Array.from({ length: ztsBars }, (_, k) => lineAt(ZTS, [sign * ztsBarMid(k), 0], [sign * ztsBarMid(k), phi(ztsBarMid(k))], ROLE.input, 0.03))
  return {
    id: 'math-z-test',
    title: 'A two-sided z-test',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a two-sided z-test of H₀: μ = 100 with known σ = 15 and n = 36. The standard error is σ/√n = 15 ÷ 6 = 2.5, so under H₀ the sample mean x̄ is N(100, 2.5²) and Z = (x̄ − 100)/2.5 is N(0, 1) (blue curve). At the 5% level we reject H₀ when |Z| ≥ 1.96: the two red tails together hold 5% of the area. The observed x̄ = 106 gives z = (106 − 100) ÷ 2.5 = 6 ÷ 2.5 = 2.4 (red dot), which lies in the rejection region, so H₀ is rejected; the two-sided p-value is 2 × 0.0082 ≈ 0.016.',
    ariaLabel:
      'A blue standard normal bell curve over an axis marked minus 2, 0 and 2, captioned x bar follows N(100, 2.5 squared) under H0, with the caption 15 divided by 6 equals 2.5. In the second step a red dot on the axis at 2.4 with the captions x bar equals 106 and 6 divided by 2.5 equals 2.4. In the third step red vertical bars fill the two tails beyond minus 1.96 and 1.96, with the captions reject if absolute z exceeds 1.96 and p is about 0.016.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Under H₀: μ = 100 the sample mean is N(100, 2.5²), since SE = σ/√n = 15 ÷ 6 = 2.5. In z-units it is the standard normal curve.', objects: [ar(at(ZTS, -3.8, 0), at(ZTS, 3.8, 0)), curveOf(ZTS, phi, -3.5, 3.5, ROLE.output, 80), ...[-2, 0, 2].map((z) => labelAt(ZTS, String(z).replace('-', '−'), z, 0, ROLE.ink, 0, -0.35)), lb('x̄ ~ N(100, 2.5²)', [-2.7, 1.8], ROLE.output), lb('15 ÷ 6 = 2.5', [-2.7, 0.9], ROLE.output)] },
      { narration: 'The observed mean x̄ = 106 is 6 above 100: z = 6 ÷ 2.5 = 2.4 (red dot).', objects: [dotAt(ZTS, ZTS.zObs, 0, ROLE.input, 0.14), lb('x̄ = 106', [at(ZTS, ZTS.zObs, 0)[0] + 0.3, at(ZTS, ZTS.zObs, 0)[1] - 0.8], ROLE.input), lb('6 ÷ 2.5 = 2.4', [at(ZTS, ZTS.zObs, 0)[0] + 0.3, at(ZTS, ZTS.zObs, 0)[1] - 1.5], ROLE.input)] },
      { narration: 'At the 5% level the rejection region is |z| ≥ 1.96 (red tails, 5% of the area together). 2.4 lies inside it, so reject H₀; the two-sided p-value is about 0.016.', objects: [...tail(1), ...tail(-1), lb('reject if |z| ≥ 1.96', [3.2, 0.2], ROLE.input), lb('p ≈ 0.016', [3.2, -0.5], ROLE.result)] },
    ],
  }
}

// ── 6. t-test ────────────────────────────────────────────────────────────────

/** With σ unknown the statistic follows t(9) (n = 10): heavier tails than N(0, 1), so the 95% cut-off is ±2.262 instead of ±1.96. Right: the upper tail (t from 2 to 4.2) magnified 48 times, where the red curve lies above the blue one. */
export const TTS: { full: Frame; zoom: Frame; crits: readonly [number, number]; zoomX: readonly [number, number] } = { full: { ox: -2.2, oy: -2.0, ux: 0.6, uy: 7 }, zoom: { ox: -1.4, oy: -2.0, ux: 1.2, uy: 48 }, crits: [1.96, 2.262], zoomX: [2.0, 4.2] }

/** KG: the t-test uses T = (X̄ − μ₀)/(S/√n) ~ t(n−1); heavier tails than the normal. */
export function buildTTestScene(): SceneSpec {
  return framed(raw_buildTTestScene())
}
function raw_buildTTestScene(): SceneSpec {
  const F = TTS.full, Z = TTS.zoom
  return {
    id: 'math-t-test',
    title: 'The t distribution has heavier tails',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show why a t-test needs a bigger critical value than a z-test. When σ is replaced by the sample standard deviation S, the statistic T = (X̄ − μ₀)/(S/√n) follows Student’s t distribution with n − 1 degrees of freedom; for n = 10 this is t(9) (red). It has the same bell shape as N(0, 1) (blue) but is a little lower in the middle and heavier in the tails, which allows for the extra uncertainty in S. Each curve holds 95% of its area between its marks: ±1.96 for N(0, 1) but ±2.262 for t(9), so a t-test rejects less easily. The magnified upper tail (right, t from 2 to 4.2) shows the red curve above the blue one throughout. As n grows t(n − 1) approaches N(0, 1).',
    ariaLabel:
      'Left: two almost identical bell curves over one axis, a blue standard normal curve and a red t distribution with 9 degrees of freedom that is slightly lower in the middle, labelled N(0, 1) and t(9). In the second step blue dots at plus and minus 1.96 and red dots at plus and minus 2.262 on the axis with the captions plus or minus 1.96 and plus or minus 2.262. In the third step, to the right, the upper tail magnified: a red curve running above a blue one throughout, with the caption tail magnified and the caption 95% of each curve lies between its marks.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The standard normal curve N(0, 1) (blue) and the t distribution with 9 degrees of freedom (red): the same shape, but t(9) is a little lower in the middle.', objects: [ar(at(F, -4.4, 0), at(F, 4.4, 0)), curveOf(F, phi, -4, 4, ROLE.output, 80), curveOf(F, t9Pdf, -4, 4, ROLE.input, 80), lb('N(0, 1)', [-4.2, 1.1], ROLE.output), lb('t(9)', [0.7, 1.4], ROLE.input)] },
      { narration: 'For the normal curve 95% of the area lies between −1.96 and 1.96 (blue dots); for t(9) the 95% marks are further out, at ±2.262 (red dots).', objects: [dotAt(F, -TTS.crits[0], 0, ROLE.output, 0.11), dotAt(F, TTS.crits[0], 0, ROLE.output, 0.11), dotAt(F, -TTS.crits[1], 0, ROLE.input, 0.11), dotAt(F, TTS.crits[1], 0, ROLE.input, 0.11), lb('±1.96', [at(F, 0, 0)[0], -2.55], ROLE.output), lb('±2.262', [at(F, 0, 0)[0], -3.15], ROLE.input)] },
      { narration: 'Magnify the upper tail (right, t from 2 to 4.2): the red t(9) curve lies above the blue normal curve throughout — heavier tails, which is why the t cut-off is larger.', objects: [ar(at(Z, 1.9, 0), at(Z, 4.4, 0)), curveOf(Z, phi, TTS.zoomX[0], TTS.zoomX[1], ROLE.output, 60), curveOf(Z, t9Pdf, TTS.zoomX[0], TTS.zoomX[1], ROLE.input, 60), ...[2, 3, 4].map((t) => labelAt(Z, String(t), t, 0, ROLE.ink, 0, -0.35)), lb('tail magnified', [3.0, 0.9], ROLE.ink), lb('95% of each curve lies between its marks', [at(F, 0, 0)[0] + 1.2, 2.9], ROLE.ink)] },
    ],
  }
}

// ── 7. Two-way ANOVA (interaction plot) ──────────────────────────────────────

/** Cell means of a 2 × 2 design: left, no interaction (B₂ − B₁ = 4 at both levels of A); right, interaction (B₂ − B₁ = 4 at A₁ but −4 at A₂). */
export const ANV = {
  panels: [{ ox: -4.5, name: 'no interaction', B1: [10, 14], B2: [14, 18] }, { ox: 0.7, name: 'interaction', B1: [10, 16], B2: [14, 12] }] as ReadonlyArray<{ ox: number; name: string; B1: readonly [number, number]; B2: readonly [number, number] }>,
  oy: -1.7, ux: 1.6, uy: 0.34, levelX: [0.7, 1.7] as readonly [number, number], base: 8,
}
export const anvAt = (panel: number, level: number, mean: number): Pt => [ANV.panels[panel].ox + ANV.ux * ANV.levelX[level], ANV.oy + ANV.uy * (mean - ANV.base)]

/** KG: two-way ANOVA tests the main effects of two factors and their interaction; with no interaction the lines of an interaction plot are parallel. */
export function buildTwoWayAnovaScene(): SceneSpec {
  return framed(raw_buildTwoWayAnovaScene())
}
function raw_buildTwoWayAnovaScene(): SceneSpec {
  const panel = (i: number): SceneObject[] => {
    const P_ = ANV.panels[i], a = anvAt, o = P_.ox
    const row = (means: readonly [number, number], color: string, name: string, up: number): SceneObject[] => [ln(a(i, 0, means[0]), a(i, 1, means[1]), color, 0.05), dt(a(i, 0, means[0]), color, 0.13), dt(a(i, 1, means[1]), color, 0.13), lb(String(means[0]), [a(i, 0, means[0])[0] - 0.55, a(i, 0, means[0])[1]], color), lb(String(means[1]), [a(i, 1, means[1])[0] + 0.55, a(i, 1, means[1])[1]], color), lb(name, [a(i, 1, means[1])[0] + 1.1, a(i, 1, means[1])[1] + 0.35], color)]
    return [ar([o, ANV.oy], [o + 3.4, ANV.oy]), ar([o, ANV.oy], [o, ANV.oy + 3.6]), lb('A₁', [a(i, 0, ANV.base)[0], ANV.oy - 0.4]), lb('A₂', [a(i, 1, ANV.base)[0], ANV.oy - 0.4]), ...row(P_.B1, ROLE.input, 'B₁', 1), ...row(P_.B2, ROLE.output, 'B₂', 1)]
  }
  return {
    id: 'math-two-way-anova',
    title: 'Two-way ANOVA: main effects and interaction',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show what the interaction in a two-way ANOVA means, with an interaction plot of the four cell means of two factors A (levels A₁, A₂) and B (levels B₁ red, B₂ blue). Left: B₂ is 14 − 10 = 4 above B₁ at A₁ and 18 − 14 = 4 above at A₂ — the same gap at both levels, the lines are parallel and there is no interaction: the effect of B does not depend on A. Right: B₂ is 4 above B₁ at A₁ but 12 − 16 = −4 below at A₂ — the gap changes sign, the lines cross, and there is an interaction. The two-way ANOVA tests the main effect of A, the main effect of B and this interaction.',
    ariaLabel:
      'Two small plots with the levels A1 and A2 on the horizontal axis and cell means on the vertical axis, each with a red line for B1 and a blue line for B2. Left plot, labelled no interaction: the lines go from 10 to 14 and from 14 to 18, parallel. In the second step the right plot, labelled interaction: the red line goes from 10 up to 16 and the blue line from 14 down to 12, crossing. In the third step the captions gap 4 and 4 same on the left and gap 4 and minus 4 different on the right appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Left: the four cell means. B₁: 10 at A₁ and 14 at A₂ (red). B₂: 14 and 18 (blue). The two lines are parallel — each rises by 4.', objects: [...panel(0), lb(ANV.panels[0].name, [ANV.panels[0].ox + 1.6, ANV.oy - 0.9], ROLE.ink)] },
      { narration: 'Right: B₁: 10 and 16 (red), B₂: 14 and 12 (blue). The lines are not parallel — they cross.', objects: [...panel(1), lb(ANV.panels[1].name, [ANV.panels[1].ox + 1.6, ANV.oy - 0.9], ROLE.ink)] },
      { narration: 'The gap B₂ − B₁ is 14 − 10 = 4 at A₁ and 18 − 14 = 4 at A₂: equal, so no interaction. On the right it is 4 at A₁ but 12 − 16 = −4 at A₂: different, so there is an interaction.', objects: [lb('gaps 4, 4: same', [ANV.panels[0].ox + 1.6, ANV.oy - 1.5], ROLE.result), lb('gaps 4, −4: differ', [ANV.panels[1].ox + 1.6, ANV.oy - 1.5], ROLE.aid)] },
    ],
  }
}

// ── 8. Covariance matrix ─────────────────────────────────────────────────────

/** Five points (1, 1), (2, 3), (3, 2), (4, 5), (5, 4): means (3, 3), Var(X) = Var(Y) = 2.5, Cov(X, Y) = 2, so Σ = [[2.5, 2], [2, 2.5]] (eigenvalues 4.5 and 0.5). */
export const COV = {
  points: [[1, 1], [2, 3], [3, 2], [4, 5], [5, 4]] as ReadonlyArray<readonly [number, number]>,
  frame: { ox: -4.3, oy: -2.2, ux: 0.72, uy: 0.72 } as Frame,
  m: { cx: 3.3, cy: 1.0, dx: 1.2, dy: 0.8, rows: 2, cols: 2 } as MSpec,
  Sigma: [[2.5, 2], [2, 2.5]] as ReadonlyArray<readonly number[]>,
}

/** KG: Σᵢⱼ = Cov(Xᵢ, Xⱼ) is symmetric and positive semidefinite, with the variances on the diagonal. */
export function buildCovarianceMatrixScene(): SceneSpec {
  return framed(raw_buildCovarianceMatrixScene())
}
function raw_buildCovarianceMatrixScene(): SceneSpec {
  const F = COV.frame
  return {
    id: 'math-covariance-matrix',
    title: 'The covariance matrix of two variables',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the covariance matrix Σ of a data cloud. The five points (1, 1), (2, 3), (3, 2), (4, 5), (5, 4) (blue) have means (3, 3) (green). Their variances are Var(X) = Var(Y) = 10 ÷ 4 = 2.5 (sum of squared deviations over n − 1) and their covariance is Cov(X, Y) = 8 ÷ 4 = 2: positive, because the cloud rises to the right. These go into the symmetric matrix Σ = [[Var X, Cov(X, Y)], [Cov(Y, X), Var Y]] = [[2.5, 2], [2, 2.5]]: the variances on the diagonal (blue) and the equal covariances off it (green). Its eigenvalues λ = 4.5 and 0.5 are not negative (positive semidefinite), as every covariance matrix must be.',
    ariaLabel:
      'A scatter plot of five blue points rising from lower left to upper right with a green point at the means (3, 3). In the second step the symmetric matrix 2.5 2 over 2 2.5 appears at the right, with the diagonal entries blue and the off-diagonal entries green. In the third step the captions Var X equals 2.5, Cov of X and Y equals 2 and lambda equals 4.5 and 0.5 appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Five data points (blue) with sample means x̄ = ȳ = 3 (green): the cloud rises to the right.', objects: [ar(at(F, 0, 0), at(F, 6.2, 0)), ar(at(F, 0, 0), at(F, 0, 6.2)), lb('X', [at(F, 6.5, 0)[0], at(F, 6.5, 0)[1] - 0.1]), lb('Y', [at(F, 0, 6.5)[0] + 0.3, at(F, 0, 6.5)[1]]), ...[1, 2, 3, 4, 5].flatMap((v) => [lb(String(v), [at(F, v, 0)[0], at(F, v, 0)[1] - 0.4]), lb(String(v), [at(F, 0, v)[0] - 0.4, at(F, 0, v)[1]])]), ...COV.points.map(([x, y]) => dotAt(F, x, y, ROLE.output, 0.12)), dotAt(F, 3, 3, ROLE.result, 0.14), lb('means (3, 3)', [at(F, 4.2, 1.4)[0], at(F, 4.2, 1.4)[1]], ROLE.result)] },
      { narration: 'The covariance matrix collects Var(X), Var(Y) on the diagonal (blue) and Cov(X, Y) = Cov(Y, X) off it (green): Σ = [[2.5, 2], [2, 2.5]].', objects: [...matrix(COV.m, COV.Sigma, (i, j) => (i === j ? ROLE.output : ROLE.result), 0.75), lb('Σ', [COV.m.cx, 2.2])] },
      { narration: 'Var(X) = 2.5 and Cov(X, Y) = 2. Σ is symmetric and its eigenvalues, 4.5 and 0.5, are not negative: positive semidefinite.', objects: [lb('Var X = 2.5', [COV.m.cx, -0.5], ROLE.output), lb('Cov(X, Y) = 2', [COV.m.cx, -1.2], ROLE.result), lb('λ = 4.5 and 0.5', [COV.m.cx, -1.9], ROLE.aid)] },
    ],
  }
}

// ── 9. Bayesian inference ────────────────────────────────────────────────────

/** Prior Beta(5, 5) × likelihood of 7 heads in 10 tosses (∝ Beta(8, 4)) → posterior Beta(12, 8); the MAP is (12 − 1) ÷ (12 + 8 − 2) = 11/18. */
export const BAY: Frame & { map: number } = { ox: -3.5, oy: -2.0, ux: 7.0, uy: 0.8, map: 11 / 18 }
export const bayPrior = betaPdf(5, 5), bayLik = betaPdf(8, 4), bayPost = betaPdf(12, 8)

/** KG: the posterior is proportional to likelihood × prior; point estimates include the MAP and the posterior mean. */
export function buildBayesianInferenceScene(): SceneSpec {
  return framed(raw_buildBayesianInferenceScene())
}
function raw_buildBayesianInferenceScene(): SceneSpec {
  return {
    id: 'math-bayesian-inference',
    title: 'Bayesian updating: prior × likelihood → posterior',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show Bayesian updating of a coin’s probability of heads θ. The prior Beta(5, 5) (grey) is a belief centred at 0.5 (as if 4 heads and 4 tails had already been seen). The data, 7 heads in 10 tosses, give the likelihood θ⁷(1 − θ)³ (blue, scaled to area 1), which peaks at 0.7. Multiplying prior by likelihood and renormalising gives the posterior Beta(12, 8) (green): it is narrower than either, and its highest point, the MAP estimate, is at θ = (12 − 1) ÷ (12 + 8 − 2) = 11 ÷ 18 ≈ 0.61, between the prior (0.5) and the data (0.7). Posterior ∝ prior × likelihood at every θ.',
    ariaLabel:
      'A horizontal axis for theta from 0 to 1. In the first step a grey bell curve centred at 0.5 labelled prior Beta(5, 5). In the second step a taller blue curve peaking near 0.7 labelled likelihood 7 of 10. In the third step a taller, narrower green curve peaking at about 0.61, between the other two, labelled posterior Beta(12, 8), a green dot at its peak labelled MAP 0.61, and the caption posterior proportional to prior times likelihood.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Before the data: the prior Beta(5, 5) (grey) for the probability of heads θ, centred at 0.5.', objects: [ar(at(BAY, -0.04, 0), at(BAY, 1.06, 0)), curveOf(BAY, bayPrior, 0, 1, ROLE.reference, 80), ...[0, 0.5, 1].map((t) => labelAt(BAY, String(t), t, 0, ROLE.ink, 0, -0.35)), lb('prior: Beta(5, 5)', [-2.7, 2.2], ROLE.reference)] },
      { narration: 'The data: 7 heads in 10 tosses. The likelihood θ⁷(1 − θ)³ (blue, scaled to area 1) peaks at θ = 0.7.', objects: [curveOf(BAY, bayLik, 0, 1, ROLE.output, 80), lb('likelihood: 7 of 10', [-2.7, 1.5], ROLE.output)] },
      { narration: 'Prior × likelihood, renormalised, is the posterior Beta(12, 8) (green): narrower than both, with its peak (the MAP) at θ = 11 ÷ 18 ≈ 0.61, between the prior and the data.', objects: [curveOf(BAY, bayPost, 0, 1, ROLE.result, 80), dotAt(BAY, BAY.map, bayPost(BAY.map), ROLE.result, 0.13), lb('MAP 0.61', [at(BAY, BAY.map, bayPost(BAY.map))[0] + 1.0, at(BAY, BAY.map, bayPost(BAY.map))[1] + 0.45], ROLE.result), lb('posterior: Beta(12, 8)', [-2.7, 0.8], ROLE.result), lb('posterior ∝ prior × likelihood', [0, -3.05], ROLE.ink)] },
    ],
  }
}

// ── 10. Credible interval ────────────────────────────────────────────────────

/** The central 95% credible interval of the Beta(12, 8) posterior is [0.384, 0.797]: 2.5% of the probability lies on each side. */
export const CRD: Frame & { lo: number; hi: number; bars: number } = { ox: -3.5, oy: -2.0, ux: 7.0, uy: 0.8, lo: 0.384, hi: 0.797, bars: 22 }
export const crdBarMid = (k: number) => CRD.lo + ((k + 0.5) * (CRD.hi - CRD.lo)) / CRD.bars

/** KG: a 95% credible interval [a, b] satisfies P(θ ∈ [a, b] | data) = 0.95, a direct probability statement about the parameter. */
export function buildCredibleIntervalScene(): SceneSpec {
  return framed(raw_buildCredibleIntervalScene())
}
function raw_buildCredibleIntervalScene(): SceneSpec {
  const bars = Array.from({ length: CRD.bars }, (_, k) => lineAt(CRD, [crdBarMid(k), 0], [crdBarMid(k), bayPost(crdBarMid(k))], ROLE.result, 0.03))
  return {
    id: 'math-credible-interval',
    title: 'A 95% credible interval from the posterior',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a 95% credible interval read straight off a posterior distribution. The posterior for θ is Beta(12, 8) (green curve). The central 95% credible interval [0.38, 0.80] is the stretch of the axis whose area under the curve (green bars) is 0.95; the remaining 5% is split evenly, 2.5% in each tail. So, given the data and the prior, P(0.38 < θ < 0.80) = 0.95 — a direct probability statement about the parameter, unlike a frequentist confidence interval.',
    ariaLabel:
      'A horizontal axis for theta from 0 to 1 and a green bell curve (the posterior Beta(12, 8)) peaking near 0.61. In the second step thin green vertical bars fill the area under the curve between two violet marks at 0.38 and 0.80. In the third step the captions 95% in the middle, 2.5% in each tail and P of 0.38 less than theta less than 0.80 equals 0.95 appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The posterior for θ after the data: Beta(12, 8) (green).', objects: [ar(at(CRD, -0.04, 0), at(CRD, 1.06, 0)), curveOf(CRD, bayPost, 0, 1, ROLE.result, 80), ...[0, 0.5, 1].map((t) => labelAt(CRD, String(t), t, 0, ROLE.ink, 0, -0.35)), lb('posterior: Beta(12, 8)', [-2.7, 1.6], ROLE.result)] },
      { narration: 'Mark the interval [0.38, 0.80] (violet) whose area under the curve is 95% (green bars).', objects: [...bars, lineAt(CRD, [CRD.lo, 0], [CRD.lo, bayPost(CRD.lo)], ROLE.aid, 0.05), lineAt(CRD, [CRD.hi, 0], [CRD.hi, bayPost(CRD.hi)], ROLE.aid, 0.05), labelAt(CRD, '0.38', CRD.lo, 0, ROLE.aid, 0, -0.95), labelAt(CRD, '0.80', CRD.hi, 0, ROLE.aid, 0, -0.95)] },
      { narration: 'The other 5% is split between the two tails, 2.5% each. So P(θ in [0.38, 0.80] | data) = 0.95.', objects: [labelAt(CRD, '95%', 0.6, 0, ROLE.result, 0, 3.3), labelAt(CRD, '2.5%', 0.24, 0, ROLE.ink, 0, 0.55), labelAt(CRD, '2.5%', 0.93, 0, ROLE.ink, 0.15, 0.55), lb('P(0.38 < θ < 0.80) = 0.95', [0.4, 2.5], ROLE.ink)] },
    ],
  }
}

// ── 11. Experimental design ──────────────────────────────────────────────────

/** 12 plots in 3 blocks of 4; treatments A and B are assigned at random within each block, so each block holds 2 A and 2 B (6 of each overall). */
export const EXD = { cols: 4, rows: 3, w: 1.0, h: 0.9, x0: -2.0, y0: 1.85, layout: ['ABBA', 'BABA', 'BBAA'] as readonly string[] }
export const exdCell = (r: number, c: number): Pt => [EXD.x0 + (c + 0.5) * EXD.w, EXD.y0 - (r + 0.5) * EXD.h]

/** KG: randomization, replication and blocking are the principles of experimental design; blocking groups similar units to reduce noise. */
export function buildExperimentalDesignScene(): SceneSpec {
  return framed(raw_buildExperimentalDesignScene())
}
function raw_buildExperimentalDesignScene(): SceneSpec {
  const verticals = Array.from({ length: EXD.cols + 1 }, (_, c) => ln([EXD.x0 + c * EXD.w, EXD.y0], [EXD.x0 + c * EXD.w, EXD.y0 - EXD.rows * EXD.h], ROLE.reference, 0.025))
  const horizontals = Array.from({ length: EXD.rows + 1 }, (_, r) => ln([EXD.x0, EXD.y0 - r * EXD.h], [EXD.x0 + EXD.cols * EXD.w, EXD.y0 - r * EXD.h], ROLE.reference, 0.025))
  const blockLines = [1, 2].map((r) => ln([EXD.x0, EXD.y0 - r * EXD.h], [EXD.x0 + EXD.cols * EXD.w, EXD.y0 - r * EXD.h], ROLE.aid, 0.06))
  const letters = EXD.layout.flatMap((row, r) => [...row].map((t, c) => lb(t, exdCell(r, c), t === 'A' ? ROLE.input : ROLE.output)))
  return {
    id: 'math-experimental-design',
    title: 'Experimental design: randomization, replication, blocking',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the three principles of experimental design on a field of 12 plots arranged in 3 blocks of 4 similar plots (violet lines separate the blocks). Blocking groups similar units so that differences between blocks do not blur the comparison. Randomization: within each block the two treatments A (red) and B (blue) are assigned to the plots by chance, not by choice, which guards against confounding. Replication: each treatment is applied to several plots (6 of A and 6 of B, 2 per block), so the variation can be estimated. This is a randomized complete block design (RCBD) and it supports causal conclusions.',
    ariaLabel:
      'A grid of 3 rows and 4 columns, one row per block, with violet lines between the rows and the captions block 1, block 2 and block 3 at the right. In the second step the letters A in red and B in blue fill the cells: ABBA, BABA and BBAA, so every row has two of each. In the third step the captions randomization chance decides, replication 6 plots each and blocking similar plots together appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A field of 12 plots in 3 blocks of 4 similar plots (one block per row, separated by the violet lines).', objects: [...verticals, ...horizontals, ...blockLines, ...[0, 1, 2].map((r) => lb(`block ${r + 1}`, [EXD.x0 + EXD.cols * EXD.w + 1.0, EXD.y0 - (r + 0.5) * EXD.h]))] },
      { narration: 'Randomization: inside every block the treatments A (red) and B (blue) go to the plots by chance — each block gets two of each.', objects: letters },
      { narration: 'Randomization (chance decides), replication (6 plots per treatment) and blocking (similar plots grouped) are the core principles; together they allow causal conclusions.', objects: [lb('randomization: chance decides', [0, -1.3], ROLE.aid), lb('replication: 6 plots each', [0, -2.0], ROLE.result), lb('blocking: similar plots together', [0, -2.7], ROLE.ink)] },
    ],
  }
}
