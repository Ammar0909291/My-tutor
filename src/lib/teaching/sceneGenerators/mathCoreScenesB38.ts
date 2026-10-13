/**
 * Core mathematics figures — batch 38 of the mathematics visual campaign (2026-10-12): the sequences-and-series helpers
 * (sequences, arithmetic sequences, series, partial sums, arithmetic series, convergence of series, the harmonic series) and
 * four real-analysis helpers (metric spaces, compactness, connectedness, Riemann integrability).
 *
 * Same rules as batches 1-37: one visual language from visualDesign.ts, labels are names not sentences (marks of 1-2
 * characters are free), steps are cumulative, coordinates stay inside +-5, at most 50 objects per step, nothing the figure
 * audit rejects (SM-01 evaluates the arithmetic in a label left to right: never write "1 × 5 + 2 × 7 = 19" as one label),
 * and every term, sum, length and area a figure states is re-derived by the test file from the DRAWN dots, bars, lines and
 * numerals (partial sums are recomputed from the formulas, lengths from the drawn coordinates).
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, rightAngleMark } from './mathSceneKit'

export type Pt = readonly [number, number]
const pp = (p: Pt) => P(p[0], p[1])
const ln = (a: Pt, b: Pt, color: string = ROLE.reference, t = 0.04): SceneObject => line(pp(a), pp(b), color, t)
const dt = (p: Pt, color: string = ROLE.ink, r = 0.16): SceneObject => dot(pp(p), color, r)
const lb = (text: string, p: Pt, color: string = ROLE.ink): SceneObject => label(text, pp(p), color, 'primary')
const ar = (a: Pt, b: Pt, color: string = ROLE.reference): SceneObject => arrow(pp(a), pp(b), color)
/** Maps graph coordinates (x, y) to the figure: screen = origin + (x · ux, y · uy). */
export type Frame = { ox: number; oy: number; ux: number; uy: number }
export const at = (f: Frame, x: number, y: number): Pt => [f.ox + x * f.ux, f.oy + y * f.uy]
const dotAt = (f: Frame, x: number, y: number, color: string, r = 0.14): SceneObject => dt(at(f, x, y), color, r)
const lineAt = (f: Frame, a: Pt, b: Pt, color: string, t = 0.04): SceneObject => ln(at(f, a[0], a[1]), at(f, b[0], b[1]), color, t)
const sub = (n: number) => '₀₁₂₃₄₅₆₇₈₉'[n]

// ── 1. Sequence ──────────────────────────────────────────────────────────────

/** aₙ = n² for n = 1…5: a function from the positive integers, drawn as the points (n, aₙ). */
export const SEQ: Frame = { ox: -4.0, oy: -2.4, ux: 1.2, uy: 0.17 }
export const seqTerm = (n: number) => n * n

/** KG: a function from ℕ (or a subset) to a set, listing its values as an ordered collection a₁, a₂, a₃, … */
export function buildSequenceScene(): SceneSpec {
  return framed(raw_buildSequenceScene())
}
function raw_buildSequenceScene(): SceneSpec {
  const ns = [1, 2, 3, 4, 5]
  return {
    id: 'math-sequence',
    title: 'Sequence: a function of n',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a sequence as a function from the positive integers: each n has exactly one value aₙ. For aₙ = n² the points (1, 1), (2, 4), (3, 9), (4, 16), (5, 25) are isolated dots (no line between them: n is a whole number) and the list of values 1, 4, 9, 16, 25, … is the sequence. For example a₃ = 9.',
    ariaLabel:
      'A horizontal axis with the numbers 1 to 5 and a vertical axis. Five blue dots rise above the numbers 1, 2, 3, 4, 5 at the heights 1, 4, 9, 16 and 25, each marked with its value. In the second step the captions a sub n equals n squared and the list 1, 4, 9, 16, 25 and so on appear. In the third step the third dot is marked violet with a vertical guide, captioned a sub 3 equals 9.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A sequence assigns to every whole number n one value aₙ: here aₙ = n². The points (n, aₙ) are separate dots — there is nothing between n = 2 and n = 3.', objects: [ar(at(SEQ, -0.2, 0), at(SEQ, 5.9, 0)), ar(at(SEQ, 0, -0.1 / SEQ.uy), at(SEQ, 0, 27)), ...ns.flatMap((n) => [dotAt(SEQ, n, seqTerm(n), ROLE.output), lb(String(n), [at(SEQ, n, 0)[0], -2.85]), lb(String(seqTerm(n)), [at(SEQ, n, 0)[0], at(SEQ, 0, seqTerm(n))[1] + 0.42], ROLE.output)])] },
      { narration: 'Its values form an ordered list: a₁ = 1, a₂ = 4, a₃ = 9, a₄ = 16, a₅ = 25, … — the terms of the sequence.', objects: [lb('aₙ = n²', [3.5, 0.7], ROLE.output), lb('1, 4, 9, 16, 25, …', [3.0, -0.3], ROLE.output)] },
      { narration: 'Each n has exactly one value: for n = 3 the value is a₃ = 9 (violet).', objects: [lineAt(SEQ, [3, 0], [3, 9], ROLE.aid, 0.03), dotAt(SEQ, 3, 9, ROLE.aid, 0.18), lb('a₃ = 9', [3.3, -1.2], ROLE.aid)] },
    ],
  }
}

// ── 2. Arithmetic sequence ───────────────────────────────────────────────────

/** aₙ = 3 + 2(n − 1): 3, 5, 7, 9, 11 — equal steps d = 2, so the dots lie on one straight line. */
export const APS: Frame = { ox: -3.9, oy: -2.4, ux: 1.2, uy: 0.34 }
export const apsTerm = (n: number) => 3 + 2 * (n - 1)

/** KG: each term differs from the previous by a fixed common difference d: aₙ = a₁ + (n − 1)d. */
export function buildArithmeticSequenceScene(): SceneSpec {
  return framed(raw_buildArithmeticSequenceScene())
}
function raw_buildArithmeticSequenceScene(): SceneSpec {
  const ns = [1, 2, 3, 4, 5]
  const steps = [1, 2, 3, 4]
  return {
    id: 'math-arithmetic-sequence',
    title: 'Arithmetic sequence: a constant step',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show an arithmetic sequence aₙ = 3 + 2(n − 1) = 3, 5, 7, 9, 11, …: from each dot to the next the value goes up by the same common difference d = 2 (horizontal run 1, vertical rise 2), so the dots lie on a straight line. The nth term is a₁ + (n − 1)d, for instance a₅ = 3 + 8 = 11.',
    ariaLabel:
      'Five blue dots above the numbers 1 to 5 at the heights 3, 5, 7, 9 and 11, lying on one straight grey line, each marked with its value. In the second step small steps join consecutive dots, a violet run of 1 to the right and a red rise up, each marked plus 2. In the third step the captions d equals 2, a sub n equals 3 plus 2 times n minus 1, and a sub 5 equals 3 plus 8 equals 11 appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The sequence 3, 5, 7, 9, 11, … as points (n, aₙ): they lie on one straight line.', objects: [ar(at(APS, -0.2, 0), at(APS, 5.9, 0)), ar(at(APS, 0, -0.1 / APS.uy), at(APS, 0, 12)), lineAt(APS, [0.7, apsTerm(0.7)], [5.3, apsTerm(5.3)], ROLE.reference, 0.03), ...ns.flatMap((n) => [dotAt(APS, n, apsTerm(n), ROLE.output), lb(String(n), [at(APS, n, 0)[0], -2.85]), lb(String(apsTerm(n)), [at(APS, n, 0)[0] - 0.05, at(APS, 0, apsTerm(n))[1] + 0.45], ROLE.output)])] },
      { narration: 'From each term to the next: one step right, always the same step up — the common difference d = 2.', objects: steps.flatMap((n) => [lineAt(APS, [n, apsTerm(n)], [n + 1, apsTerm(n)], ROLE.aid, 0.035), lineAt(APS, [n + 1, apsTerm(n)], [n + 1, apsTerm(n + 1)], ROLE.input, 0.035), lb('+2', [at(APS, n + 1, 0)[0] + 0.5, (at(APS, 0, apsTerm(n))[1] + at(APS, 0, apsTerm(n + 1))[1]) / 2], ROLE.input)]) },
      { narration: 'So aₙ = a₁ + (n − 1)d = 3 + 2(n − 1). For n = 5: a₅ = 3 + 4 × 2 = 11.', objects: [lb('d = 2', [3.4, 0.6], ROLE.input), lb('aₙ = 3 + 2(n − 1)', [3.1, -0.3], ROLE.output), lb('a₅ = 3 + 8 = 11', [3.1, -1.2], ROLE.result)] },
    ],
  }
}

// ── 3. Series ────────────────────────────────────────────────────────────────

/** The terms 1, 2, 3, 4, 5 laid end to end on a line (scale u per unit): the running totals 1, 3, 6, 10, 15 mark where each ends. */
export const SER = { x0: -3.9, y: 0.2, u: 0.5, terms: [1, 2, 3, 4, 5] as readonly number[] }
export const serEnd = (k: number) => SER.x0 + SER.u * SER.terms.slice(0, k).reduce((s, v) => s + v, 0)
export const serTotals = () => SER.terms.map((_, k) => SER.terms.slice(0, k + 1).reduce((s, v) => s + v, 0))

/** KG: the sum of the terms of a sequence; formally the limit of the partial sums. */
export function buildSeriesScene(): SceneSpec {
  return framed(raw_buildSeriesScene())
}
function raw_buildSeriesScene(): SceneSpec {
  const { y, terms } = SER
  const segs = terms.map((v, k) => ln([serEnd(k), y], [serEnd(k + 1), y], k % 2 === 0 ? ROLE.output : ROLE.input, 0.14))
  return {
    id: 'math-series',
    title: 'Series: the sum of the terms',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a series as a sum of terms. The terms 1, 2, 3, 4, 5 are laid end to end as segments of those lengths (alternating blue and red). Where each segment ends the running total is read off: 1, 3, 6, 10, 15, the partial sums. The series 1 + 2 + 3 + 4 + 5 = 15; for an infinite series the sum is the limit of these partial sums, if it exists.',
    ariaLabel:
      'A horizontal line made of five coloured segments of lengths 1, 2, 3, 4 and 5, alternately blue and red, each marked with its length above it, captioned terms 1, 2, 3, 4, 5. In the second step the running totals 1, 3, 6, 10 and 15 appear under the places where the segments end, captioned running totals. In the third step the captions series 1 plus 2 plus 3 plus 4 plus 5 equals 15 appears.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Take the terms 1, 2, 3, 4, 5 of a sequence and lay them end to end: segments of those lengths.', objects: [...segs, ...terms.map((v, k) => lb(String(v), [(serEnd(k) + serEnd(k + 1)) / 2, y + 0.55], k % 2 === 0 ? ROLE.output : ROLE.input)), lb('terms 1, 2, 3, 4, 5', [0.0, 2.0], ROLE.ink)] },
      { narration: 'Where each segment ends the running total is 1, then 1 + 2 = 3, then 6, 10, 15: these are the partial sums.', objects: [...serTotals().map((t, k) => lb(String(t), [serEnd(k + 1), y - 0.6], ROLE.result)), lb('running totals', [-0.5, -1.7], ROLE.result)] },
      { narration: 'The series is the whole sum: 1 + 2 + 3 + 4 + 5 = 15, the last partial sum. For an infinite series the sum is the limit of the partial sums, when that limit exists.', objects: [lb('series: 1 + 2 + 3 + 4 + 5 = 15', [0.0, -2.6], ROLE.result)] },
    ],
  }
}

// ── 4. Partial sums ──────────────────────────────────────────────────────────

/** aₙ = 1/2ⁿ: the partial sums Sₙ = 1 − 1/2ⁿ = 0.5, 0.75, 0.875, … creep up to 1. */
export const PSM: Frame = { ox: -3.8, oy: -2.1, ux: 1.1, uy: 3.6 }
export const psmTerm = (n: number) => Math.pow(0.5, n)
export const psmSum = (n: number) => Array.from({ length: n }, (_, k) => psmTerm(k + 1)).reduce((s, v) => s + v, 0)

/** KG: Sₙ = a₁ + … + aₙ; the series Σaₙ converges iff the sequence {Sₙ} converges. */
export function buildPartialSumsScene(): SceneSpec {
  return framed(raw_buildPartialSumsScene())
}
function raw_buildPartialSumsScene(): SceneSpec {
  const ns = [1, 2, 3, 4, 5, 6]
  return {
    id: 'math-partial-sums',
    title: 'Partial sums: S₁, S₂, S₃, …',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the partial sums of the series 1/2 + 1/4 + 1/8 + …: S₁ = 0.5, S₂ = 0.5 + 0.25 = 0.75, S₃ = 0.75 + 0.125 = 0.875, … (blue dots over n = 1…6). They form a new sequence that creeps up towards 1 (violet line), the gap 1 − Sₙ = 1/2ⁿ halving each time (red segments). The series converges exactly when its sequence of partial sums does.',
    ariaLabel:
      'Six blue dots above the numbers 1 to 6 rising from the height 0.5 and levelling off just below a horizontal violet line at the height 1, each with a short red segment up to the line that gets shorter and shorter. In the second step the violet line and the red gaps appear, captioned limit 1. In the third step captions give S 2 equals 0.5 plus 0.25 equals 0.75, S 3 equals 0.75 plus 0.125 equals 0.875, and S n tends to 1.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The terms 1/2, 1/4, 1/8, … add up step by step: S₁ = 0.5, S₂ = 0.75, S₃ = 0.875, S₄ = 0.9375 … The partial sums Sₙ are themselves a sequence (blue dots).', objects: [ar(at(PSM, -0.2, 0), at(PSM, 6.9, 0)), ar(at(PSM, 0, -0.05), at(PSM, 0, 1.15)), ...ns.flatMap((n) => [dotAt(PSM, n, psmSum(n), ROLE.output), lb(String(n), [at(PSM, n, 0)[0], -2.55])])] },
      { narration: 'They never pass 1: the gap 1 − Sₙ = 1/2ⁿ is halved at every step (red), so the partial sums approach the limit 1 (violet).', objects: [lineAt(PSM, [0, 1], [6.9, 1], ROLE.aid, 0.03), ...ns.map((n) => lineAt(PSM, [n, psmSum(n)], [n, 1], ROLE.input, 0.035)), lb('limit 1', [at(PSM, 6.4, 1)[0] + 0.1, at(PSM, 0, 1)[1] + 0.45], ROLE.aid)] },
      { narration: 'S₂ = 0.5 + 0.25 = 0.75 and S₃ = 0.75 + 0.125 = 0.875. Since Sₙ → 1 the series converges and its sum is 1.', objects: [lb('S₂ = 0.5 + 0.25 = 0.75', [2.4, -0.5], ROLE.output), lb('S₃ = 0.75 + 0.125 = 0.875', [2.4, -1.4], ROLE.output), lb('Sₙ → 1', [3.2, 0.4], ROLE.result)] },
    ],
  }
}

// ── 5. Arithmetic series ─────────────────────────────────────────────────────

/** 3 + 5 + 7 + 9 + 11: the terms as blue bars, the same bars upside-down on top (red): every column is 14 tall, 5 columns = 70, half of it 35. */
export const ARS = { terms: [3, 5, 7, 9, 11] as readonly number[], x0: -3.9, dx: 0.85, base: -2.2, u: 0.27, bar: 0.5 }
export const arsX = (k: number) => ARS.x0 + ARS.dx * k

/** KG: Sₙ = n(a₁ + aₙ)/2 = n(2a₁ + (n − 1)d)/2 for an arithmetic progression. */
export function buildArithmeticSeriesScene(): SceneSpec {
  return framed(raw_buildArithmeticSeriesScene())
}
function raw_buildArithmeticSeriesScene(): SceneSpec {
  const { terms, base, u, bar } = ARS
  const rev = [...terms].reverse()
  return {
    id: 'math-arithmetic-series',
    title: 'Arithmetic series: the pairing trick',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show Sₙ = n(a₁ + aₙ)/2 for the arithmetic progression 3, 5, 7, 9, 11 (n = 5). The terms are blue bars. A second copy written backwards (red) is stacked on top: every column then has the same height a₁ + aₙ = 3 + 11 = 14, and the two copies together contain 5 × 14 = 70, so one copy, the sum, is half of it: 70 ÷ 2 = 35 = 3 + 5 + 7 + 9 + 11.',
    ariaLabel:
      'Five blue vertical bars of heights 3, 5, 7, 9 and 11, each marked with its value under its base. In the second step five red bars, the same list reversed 11, 9, 7, 5, 3, are stacked on top so that all five columns reach the same height, captioned each column 14. In the third step the captions S 5 equals 5 times 14 divided by 2 equals 35 and 3 plus 5 plus 7 plus 9 plus 11 equals 35 appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The terms 3, 5, 7, 9, 11 of an arithmetic progression as bars: their sum is the total height of the blue bars.', objects: terms.flatMap((v, k) => [ln([arsX(k), base], [arsX(k), base + u * v], ROLE.output, bar), lb(String(v), [arsX(k), base - 0.45], ROLE.output)]) },
      { narration: 'Add a second copy written backwards (red): 11, 9, 7, 5, 3 on top. Now every column has the same height: 3 + 11 = 5 + 9 = 7 + 7 = 14.', objects: [...rev.flatMap((v, k) => [ln([arsX(k), base + u * terms[k]], [arsX(k), base + u * (terms[k] + v)], ROLE.input, bar), lb(String(v), [arsX(k), base + u * (terms[k] + v) + 0.45], ROLE.input)]), lb('each column 14', [2.6, 0.9], ROLE.ink)] },
      { narration: 'Two copies make 5 × 14 = 70, so one copy — the series — is half: Sₙ = n(a₁ + aₙ)/2 = 5 × 14 ÷ 2 = 35.', objects: [lb('S₅ = 5 × 14 ÷ 2 = 35', [2.6, -0.1], ROLE.result), lb('3 + 5 + 7 + 9 + 11 = 35', [2.6, -1.0], ROLE.result)] },
    ],
  }
}

// ── 6. Convergence of series ─────────────────────────────────────────────────

/** Left: Σ 1/n² (partial sums 1, 1.25, 1.36, … level off below π²/6 ≈ 1.645). Right: Σ (−1)ⁿ⁺¹ (partial sums 1, 0, 1, 0, … never settle). */
export const SCV = {
  L: { ox: -4.3, oy: -2.3, ux: 0.46, uy: 2.0 } as Frame,
  R: { ox: 0.5, oy: -2.3, ux: 0.46, uy: 2.0 } as Frame,
  N: 8, limit: (Math.PI * Math.PI) / 6,
}
export const scvSumL = (n: number) => Array.from({ length: n }, (_, k) => 1 / ((k + 1) * (k + 1))).reduce((s, v) => s + v, 0)
export const scvSumR = (n: number) => (n % 2 === 1 ? 1 : 0)

/** KG: a series converges if its sequence of partial sums converges. */
export function buildSeriesConvergenceScene(): SceneSpec {
  return framed(raw_buildSeriesConvergenceScene())
}
function raw_buildSeriesConvergenceScene(): SceneSpec {
  const { L, R, N, limit } = SCV
  const ns = Array.from({ length: N }, (_, k) => k + 1)
  return {
    id: 'math-series-convergence',
    title: 'Convergence of a series',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show convergence as the behaviour of the partial sums. Left: for Σ 1/n² the partial sums 1, 1.25, 1.36, 1.42, … (blue dots) rise ever more slowly and level off below the limit π²/6 ≈ 1.645 (violet line): the series converges. Right: for 1 − 1 + 1 − 1 + … the partial sums jump 1, 0, 1, 0, … (red dots) and settle on no number: the series does not converge.',
    ariaLabel:
      'Two panels. On the left eight blue dots, the partial sums of one over n squared, rise from 1 and level off below a horizontal violet line at 1.645, captioned limit 1.645. On the right eight red dots alternate between the heights 1 and 0 and never settle, captioned no limit. In the third step the captions Σ 1 over n squared converges and 1 minus 1 plus 1 and so on does not converge appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Left: the partial sums of Σ 1/n² = 1 + 1/4 + 1/9 + … are 1, 1.25, 1.36, 1.42, 1.46, 1.49, 1.51, 1.53 — increasing, but by less and less each time.', objects: [ar(at(L, -0.3, 0), at(L, 9.0, 0)), ar(at(L, 0, -0.05), at(L, 0, 1.2)), ...ns.map((n) => dotAt(L, n, scvSumL(n), ROLE.output, 0.12)), ...[1, 4, 8].map((n) => lb(String(n), [at(L, n, 0)[0], -2.75]))] },
      { narration: 'They level off below the limit π²/6 ≈ 1.645 (violet): the sums stay close to one number, so this series converges.', objects: [lineAt(L, [0, limit], [9.3, limit], ROLE.aid, 0.03), lb('limit 1.645', [at(L, 4.5, 0)[0], at(L, 0, limit)[1] + 0.5], ROLE.aid)] },
      { narration: 'Right: the series 1 − 1 + 1 − 1 + … has partial sums 1, 0, 1, 0, … (red): they keep jumping and never settle, so the series does not converge.', objects: [ar(at(R, -0.3, 0), at(R, 9.0, 0)), ar(at(R, 0, -0.05), at(R, 0, 1.2)), ...ns.map((n) => dotAt(R, n, scvSumR(n), ROLE.input, 0.12)), ...[1, 4, 8].map((n) => lb(String(n), [at(R, n, 0)[0], -2.75])), lb('converges', [at(L, 4.5, 0)[0], 2.45], ROLE.output), lb('no limit', [at(R, 4.5, 0)[0], 2.45], ROLE.input)] },
    ],
  }
}

// ── 7. Harmonic series ───────────────────────────────────────────────────────

/** Bars of height 1/n for n = 1…8 (scale u); the groups {1}, {2}, {3, 4}, {5…8} each add up to at least 1/2, so Hₙ has no upper bound. */
export const HAR = { x0: -4.3, dx: 0.62, base: -1.5, u: 3.0, bar: 0.42, N: 8 }
export const harX = (n: number) => HAR.x0 + HAR.dx * (n - 1)
export const harSum = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, k) => 1 / (a + k)).reduce((s, v) => s + v, 0)

/** KG: the series Σ1/n diverges (by Cauchy condensation or the integral test); the p-series Σ1/nᵖ converges iff p > 1. */
export function buildHarmonicSeriesScene(): SceneSpec {
  return framed(raw_buildHarmonicSeriesScene())
}
function raw_buildHarmonicSeriesScene(): SceneSpec {
  const { base, u, bar, N } = HAR
  const ns = Array.from({ length: N }, (_, k) => k + 1)
  const groups: Array<[number, number, string]> = [[3, 4, ROLE.input], [5, 8, ROLE.result]]
  const gy = base - 0.85
  return {
    id: 'math-harmonic-series',
    title: 'Harmonic series: Σ 1/n diverges',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show why 1 + 1/2 + 1/3 + 1/4 + … has no finite sum. The terms 1/n are bars. Group them: 1/3 + 1/4 > 1/2 (red) and 1/5 + 1/6 + 1/7 + 1/8 > 1/2 (green): the next group of 8 terms again exceeds 1/2, and so on forever. Every further group adds more than 1/2, so the partial sums pass any bound: for n = 8 already H₈ = 2.72 > 1 + 1.5 = 2.5.',
    ariaLabel:
      'Eight bars of heights one over n for n from 1 to 8, falling from 1 to one eighth, each marked with n under it. In the second step brackets under the bars group n equals 3 and 4 in red and n equals 5 to 8 in green, each captioned at least 0.5. In the third step the captions H 8 equals 2.72 and 1 plus 1.5 equals 2.5 appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The terms 1, 1/2, 1/3, 1/4, … of the harmonic series as bars of height 1/n: they shrink to 0 — yet the sum keeps growing.', objects: [ln([harX(1) - 0.5, base], [harX(N) + 0.5, base], ROLE.reference, 0.04), ...ns.flatMap((n) => [ln([harX(n), base], [harX(n), base + u / n], ROLE.output, bar), lb(String(n), [harX(n), base - 0.4])])] },
      { narration: 'Group the terms: 1/3 + 1/4 is more than 1/2 (each is at least 1/4), and 1/5 + 1/6 + 1/7 + 1/8 is more than 1/2 (each is at least 1/8). The next 8 terms again add more than 1/2, and so on.', objects: [...groups.flatMap(([a, b, color]) => [ln([harX(a) - 0.22, gy], [harX(b) + 0.22, gy], color, 0.06)]), lb('≥ 0.5', [(harX(3) + harX(4)) / 2, gy - 0.5], ROLE.input), lb('≥ 0.5', [(harX(5) + harX(8)) / 2, gy - 0.5], ROLE.result)] },
      { narration: 'Every group adds at least 1/2, so the partial sums grow without bound: H₈ = 2.72 is already more than 1 + 1.5 = 2.5, and groups never run out — the harmonic series diverges.', objects: [lb('H₈ = 2.72', [2.9, 1.3], ROLE.result), lb('1 + 1.5 = 2.5', [2.9, 0.4], ROLE.result)] },
    ],
  }
}

// ── 8. Metric space ──────────────────────────────────────────────────────────

/** Three points x, y, z of the plane with the distances d(x, y) = 3, d(x, z) = 4, d(y, z) = 5 (unit u): 5 ≤ 3 + 4, the detour through x is longer. */
export const MET = { u: 0.75, x: [-3.6, -1.7] as Pt, capX: 2.6 }
export const metY = (): Pt => [MET.x[0] + 3 * MET.u, MET.x[1]]
export const metZ = (): Pt => [MET.x[0], MET.x[1] + 4 * MET.u]

/** KG: a set X with a metric d: X × X → ℝ≥0 satisfying d(x, y) = 0 ⟺ x = y, symmetry and the triangle inequality. */
export function buildMetricSpaceScene(): SceneSpec {
  return framed(raw_buildMetricSpaceScene())
}
function raw_buildMetricSpaceScene(): SceneSpec {
  const X = MET.x, Y = metY(), Z = metZ()
  const mid = (a: Pt, b: Pt, dx: number, dy: number): Pt => [(a[0] + b[0]) / 2 + dx, (a[1] + b[1]) / 2 + dy]
  return {
    id: 'math-metric-space',
    title: 'Metric space: a distance between any two points',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show what a metric d must do on three points x, y, z of the plane (ordinary distance, one grid square = 1): d(x, y) = 3, d(x, z) = 4, d(y, z) = 5. The triangle inequality says the direct distance is never longer than a detour: d(y, z) = 5 ≤ d(y, x) + d(x, z) = 3 + 4 = 7. The taxicab metric d₁(y, z) = |Δx| + |Δy| = 3 + 4 = 7 is another metric on the same points (distances are never negative, d = 0 only for equal points, d(a, b) = d(b, a)).',
    ariaLabel:
      'A right triangle with corners x at the lower left, y to the right of x and z above x, with a right-angle mark at x. The sides are marked d equals 3 for x to y, d equals 4 for x to z and d equals 5 for y to z. In the second step the two legs from y through x to z are drawn violet and captioned 5 is at most 3 plus 4. In the third step the caption taxicab 3 plus 4 equals 7 appears.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Three points of the plane and the usual distances: d(x, y) = 3, d(x, z) = 4 and d(y, z) = 5 (the right angle at x makes 3-4-5).', objects: [ln(X, Y, ROLE.output, 0.06), ln(X, Z, ROLE.input, 0.06), ln(Y, Z, ROLE.result, 0.06), ...rightAngleMark(X[0], X[1], [1, 0], [0, 1], 0.28, ROLE.reference), dt(X, ROLE.ink, 0.13), dt(Y, ROLE.ink, 0.13), dt(Z, ROLE.ink, 0.13), lb('x', [X[0] - 0.45, X[1] - 0.2]), lb('y', [Y[0] + 0.4, Y[1] - 0.2]), lb('z', [Z[0] - 0.4, Z[1] + 0.2]), lb('d = 3', mid(X, Y, 0, -0.5), ROLE.output), lb('d = 4', mid(X, Z, -0.8, 0), ROLE.input), lb('d = 5', mid(Y, Z, 0.8, 0.3), ROLE.result)] },
      { narration: 'The triangle inequality: going straight from y to z (5) is never longer than the detour through x: d(y, z) ≤ d(y, x) + d(x, z), here 5 ≤ 3 + 4.', objects: [ln(Y, X, ROLE.aid, 0.03), ln(X, Z, ROLE.aid, 0.03), lb('5 ≤ 3 + 4', [MET.capX, 1.7], ROLE.aid)] },
      { narration: 'Other rules for a metric: d(a, b) ≥ 0 and = 0 only when a = b, and d(a, b) = d(b, a). A different valid metric on the same points is the taxicab distance: from y to z you must walk along the grid, 3 + 4 = 7.', objects: [lb('taxicab: 3 + 4 = 7', [MET.capX, 0.6], ROLE.aid), lb('straight: 5', [MET.capX, -0.5], ROLE.result)] },
    ],
  }
}

// ── 9. Compactness ───────────────────────────────────────────────────────────

/** Left: [0, 1] is covered by the three open intervals (−0.1, 0.45), (0.3, 0.75), (0.6, 1.1). Right: (0, 1] has the open cover (1/k, 1.2), k = 2, 3, 4, … — any finitely many leave (0, 1/N] uncovered. */
export const CMP = {
  L0: -4.4, R0: 0.9, s: 3.0, segY: -1.0, rows: [-0.4, 0.05, 0.5] as readonly number[], capY: 1.8,
  covers: [[-0.1, 0.45], [0.3, 0.75], [0.6, 1.1]] as ReadonlyArray<readonly [number, number]>,
  nested: [[1 / 2, 1.2], [1 / 3, 1.2], [1 / 4, 1.2]] as ReadonlyArray<readonly [number, number]>,
}
export const cmpL = (t: number) => CMP.L0 + CMP.s * t
export const cmpR = (t: number) => CMP.R0 + CMP.s * t

/** KG: K is compact if every open cover has a finite subcover; in ℝⁿ (Heine–Borel) compact ⟺ closed and bounded. */
export function buildCompactnessScene(): SceneSpec {
  return framed(raw_buildCompactnessScene())
}
function raw_buildCompactnessScene(): SceneSpec {
  const { segY, rows, covers, nested, capY } = CMP
  return {
    id: 'math-compactness',
    title: 'Compactness: finite subcovers',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show compactness through open covers. The closed bounded set [0, 1] (blue, left) is covered by just three open intervals (−0.1, 0.45), (0.3, 0.75), (0.6, 1.1): a finite subcover. The bounded but not closed set (0, 1] (blue, right) has the open cover (1/2, 1.2), (1/3, 1.2), (1/4, 1.2), … : any finitely many of them leave the points near 0 uncovered (red, here (0, 1/4]) — no finite subcover, so (0, 1] is not compact. Heine–Borel: in ℝ compact means closed and bounded.',
    ariaLabel:
      'Left, a blue segment from 0 to 1 with filled ends, with three overlapping grey bars above it that together run from before 0 to past 1, captioned [0, 1] finite subcover. Right, a blue segment from 0 to 1 with only the right end filled, with three grey bars above it all starting at 1 over 2, 1 over 3 and 1 over 4 and ending past 1, leaving a short red piece near 0 uncovered, captioned (0, 1] no finite subcover. In the third step the caption compact means closed and bounded appears.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The closed, bounded set [0, 1] (blue) and an open cover by three intervals: (−0.1, 0.45), (0.3, 0.75), (0.6, 1.1). Every point of [0, 1] lies in one of them — a finite subcover.', objects: [ln([cmpL(0), segY], [cmpL(1), segY], ROLE.output, 0.1), dt([cmpL(0), segY], ROLE.output, 0.12), dt([cmpL(1), segY], ROLE.output, 0.12), ...covers.map(([a, b], k) => ln([cmpL(a), rows[k]], [cmpL(b), rows[k]], ROLE.reference, 0.07)), lb('0', [cmpL(0), segY - 0.5]), lb('1', [cmpL(1), segY - 0.5]), lb('[0, 1]', [cmpL(0.5), capY + 0.55], ROLE.output), lb('finite subcover', [cmpL(0.5), capY], ROLE.output)] },
      { narration: 'Now (0, 1], bounded but not closed (the end 0 is missing). The open intervals (1/k, 1.2) cover it, but any finitely many — say k = 2, 3, 4 — start at 1/4 or later and leave (0, 1/4] uncovered. No finite subcover.', objects: [ln([cmpR(0), segY], [cmpR(1), segY], ROLE.output, 0.1), dt([cmpR(1), segY], ROLE.output, 0.12), ...nested.map(([a, b], k) => ln([cmpR(a), rows[k]], [cmpR(b), rows[k]], ROLE.reference, 0.07)), ln([cmpR(0), segY], [cmpR(1 / 4), segY], ROLE.input, 0.14), lb('0', [cmpR(0), segY - 0.5]), lb('1', [cmpR(1), segY - 0.5]), lb('(0, 1]', [cmpR(0.5) + 0.5, capY + 0.55], ROLE.input), lb('no finite subcover', [cmpR(0.5) + 0.5, capY], ROLE.input)] },
      { narration: 'Heine–Borel: in the real line a set is compact exactly when it is closed and bounded. [0, 1] is; (0, 1] is not closed, so it is not compact.', objects: [lb('compact ⟺ closed and bounded', [0.0, -2.5], ROLE.result)] },
    ],
  }
}

// ── 10. Connectedness ────────────────────────────────────────────────────────

/** Three bands (scale u): the interval [0, 3] cannot be cut into two parts that do not touch; [0, 1] ∪ [2, 3] can (the gap); a continuous map f(x) = 2x − 1 sends [0, 3] onto the one piece [−1, 5]. */
export const CNN = { u: 0.9, x0: -3.9, y1: 2.0, y2: 0.4, y3: -1.2, y4: -2.5, capX: 2.7 }
export const cnnX = (t: number) => CNN.x0 + CNN.u * t
export const cnnImage = (t: number) => 2 * t - 1
export const cnnImgX = (v: number) => CNN.x0 + CNN.u * (v + 1)

/** KG: E is connected if it cannot be written as the union of two non-empty separated sets; intervals are the connected subsets of ℝ; continuous maps preserve it. */
export function buildConnectednessScene(): SceneSpec {
  return framed(raw_buildConnectednessScene())
}
function raw_buildConnectednessScene(): SceneSpec {
  const { y1, y2, y3, y4, capX } = CNN
  return {
    id: 'math-connectedness',
    title: 'Connectedness: no gap to split at',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show connectedness on the real line. The interval [0, 3] is one piece: cut it anywhere, say at 1.5 into [0, 1.5) (blue) and [1.5, 3] (red), and the parts touch at the cut (violet), so they are not separated. The set [0, 1] ∪ [2, 3] has a gap: the two parts are separated by the cut at 1.5, so it is disconnected. A continuous map keeps pieces together: f(x) = 2x − 1 sends [0, 3] onto [−1, 5], again one piece (the reason the Intermediate Value Theorem holds).',
    ariaLabel:
      'Top, a line from 0 to 3 drawn half blue and half red, meeting at a violet dot at the middle, captioned cut anywhere the parts touch. Middle, two separate segments from 0 to 1 and from 2 to 3 with a gap between them and a violet cut line in the gap, captioned a gap, two pieces. Bottom, the line from 0 to 3 above a longer line from minus 1 to 5, with three arrows from points of the first to points of the second, captioned f of x equals 2 x minus 1 and the image is one piece.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The interval [0, 3] is connected. Try to split it at 1.5 into A = [0, 1.5) (blue) and B = [1.5, 3] (red): the point 1.5 belongs to B but is also the limit of points of A — the parts touch, so they are not separated.', objects: [ln([cnnX(0), y1], [cnnX(1.5), y1], ROLE.output, 0.12), ln([cnnX(1.5), y1], [cnnX(3), y1], ROLE.input, 0.12), dt([cnnX(1.5), y1], ROLE.aid, 0.16), lb('A', [cnnX(0.75), y1 + 0.5], ROLE.output), lb('B', [cnnX(2.25), y1 + 0.5], ROLE.input), lb('cut: the parts touch', [capX, y1], ROLE.aid)] },
      { narration: 'The set [0, 1] ∪ [2, 3] is not connected: the two pieces are separated by a gap, and a cut at 1.5 splits them cleanly.', objects: [ln([cnnX(0), y2], [cnnX(1), y2], ROLE.output, 0.12), ln([cnnX(2), y2], [cnnX(3), y2], ROLE.input, 0.12), ln([cnnX(1.5), y2 - 0.45], [cnnX(1.5), y2 + 0.45], ROLE.aid, 0.03), lb('a gap: two pieces', [capX, y2], ROLE.aid)] },
      { narration: 'A continuous map cannot tear a connected set: f(x) = 2x − 1 sends [0, 3] onto [−1, 5], which is again a single piece (0 → −1, 1.5 → 2, 3 → 5).', objects: [ln([cnnX(0), y3], [cnnX(3), y3], ROLE.reference, 0.08), ln([cnnImgX(-1), y4], [cnnImgX(5), y4], ROLE.result, 0.12), ...[0, 1.5, 3].map((t) => ar([cnnX(t), y3 - 0.2], [cnnImgX(cnnImage(t)), y4 + 0.25], ROLE.reference)), lb('f(x) = 2x − 1', [capX, y3 + 0.05], ROLE.ink), lb('image: one piece', [3.55, y4], ROLE.result)] },
    ],
  }
}

// ── 11. Riemann integrability ────────────────────────────────────────────────

/** f = 1 for x < 0.4 and 2 for x ≥ 0.4 on [0, 1] (one jump): the cell holding the jump is the only place where the upper and lower sums differ, U − L = 1 × (cell width) = 1/n. */
export const RIM: Frame = { ox: -3.6, oy: -1.9, ux: 4.2, uy: 0.8 }
export const rimJump = 0.4
export const rimF = (x: number) => (x < rimJump ? 1 : 2)
export const rimCell = (n: number): [number, number] => { const k = Math.floor(rimJump * n); return [k / n, (k + 1) / n] }
export const rimRows = [[4, 0.7], [8, 1.6], [16, 2.5]] as const

/** KG: f is Riemann integrable on [a, b] iff it is bounded and its discontinuities have measure zero; monotone functions are integrable. */
export function buildRiemannIntegrabilityScene(): SceneSpec {
  return framed(raw_buildRiemannIntegrabilityScene())
}
function raw_buildRiemannIntegrabilityScene(): SceneSpec {
  const row = (n: number, y: number) => { const [a, b] = rimCell(n); return [ln(at(RIM, a, 0).map((v, i) => (i === 1 ? y : v)) as unknown as Pt, at(RIM, b, 0).map((v, i) => (i === 1 ? y : v)) as unknown as Pt, ROLE.input, 0.12), lb(`n = ${n}: ${(1 / n).toString()}`, [1.6, y], ROLE.input)] }
  return {
    id: 'math-riemann-integrability',
    title: 'Riemann integrability: the gap shrinks',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show why a bounded function with a single jump is Riemann integrable. f = 1 up to x = 0.4 and f = 2 after it. Split [0, 1] into n equal cells: the upper sum U and the lower sum L differ only in the one cell that contains the jump, where the values 1 and 2 differ by 1, so U − L = 1 × (1/n): 0.25 for n = 4, 0.125 for n = 8, 0.0625 for n = 16. The gap tends to 0, so the integral exists (here 1.6).',
    ariaLabel:
      'A graph on the interval 0 to 1 of a function that equals 1 up to 0.4 and 2 after it, with a violet vertical guide at 0.4 through the jump. Above the graph, three red bars centred on the guide show the cell that contains the jump for n equal to 4, 8 and 16: they are 0.25, 0.125 and 0.0625 wide, each labelled with its width. The captions f jumps at 0.4 and the gap U minus L tends to 0 appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'f(x) = 1 for x < 0.4 and f(x) = 2 for x ≥ 0.4 on [0, 1]: bounded, with one jump at 0.4 (violet guide).', objects: [ar(at(RIM, -0.08, 0), at(RIM, 1.1, 0)), ar(at(RIM, 0, -0.05), at(RIM, 0, 2.6)), ln(at(RIM, 0, 1), at(RIM, rimJump, 1), ROLE.output, 0.06), ln(at(RIM, rimJump, 2), at(RIM, 1, 2), ROLE.output, 0.06), dt(at(RIM, rimJump, 2), ROLE.output, 0.12), dt(at(RIM, rimJump, 1), ROLE.reference, 0.1), ln(at(RIM, rimJump, 0), [at(RIM, rimJump, 0)[0], 2.9], ROLE.aid, 0.025), lb('0', [at(RIM, 0, 0)[0], -2.35]), lb('1', [at(RIM, 1, 0)[0], -2.35]), lb('f jumps at 0.4', [2.7, -0.7], ROLE.output)] },
      { narration: 'Cut [0, 1] into n equal cells. Upper and lower sums agree on every cell except the one holding the jump, where they differ by (2 − 1) × (1/n). For n = 4 that cell is [0.25, 0.5]: gap 0.25. For n = 8: [0.375, 0.5], gap 0.125.', objects: [...row(4, 0.7), ...row(8, 1.6)] },
      { narration: 'For n = 16 the cell is [0.375, 0.4375] and the gap 0.0625. The gap U − L = 1/n tends to 0 as the cells shrink, so f is Riemann integrable (its integral is 0.4 × 1 + 0.6 × 2 = 1.6).', objects: [...row(16, 2.5), lb('gap U − L → 0', [2.7, -1.7], ROLE.result)] },
    ],
  }
}
