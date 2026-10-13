/**
 * Core mathematics figures — batch 39 of the mathematics visual campaign (2026-10-12): three rigorous-calculus helpers
 * (differentiability, Taylor's theorem with the Lagrange remainder, the fundamental theorem of calculus) and six measure-theory
 * helpers (measures, Lebesgue measure, measure zero, the convergence theorems, Lᵖ spaces, the Hilbert space L²).
 *
 * Same rules as batches 1-38: one visual language from visualDesign.ts, labels are names not sentences (marks of 1-2
 * characters are free), steps are cumulative, coordinates stay inside +-5, at most 50 objects per step, nothing the figure
 * audit rejects (SM-01 evaluates the arithmetic in a label left to right: never write "1 × 5 + 2 × 7 = 19" as one label),
 * and every slope, area, length and norm a figure states is re-derived by the test file from the DRAWN curves, bars, lines and
 * arrows (areas are integrated from the drawn polylines, lengths measured from the drawn coordinates).
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, sampleMapped, type V3 } from './mathSceneKit'

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
const curveOf = (f: Frame, fn: (x: number) => number, x0: number, x1: number, color: string, n = 60): SceneObject => curve(sampleMapped(fn, x0, x1, mapOf(f), n), color)
const lineAt = (f: Frame, a: Pt, b: Pt, color: string, t = 0.04): SceneObject => ln(at(f, a[0], a[1]), at(f, b[0], b[1]), color, t)
const dotAt = (f: Frame, x: number, y: number, color: string, r = 0.14): SceneObject => dt(at(f, x, y), color, r)
const axesOf = (f: Frame, x0: number, x1: number, y0: number, y1: number): SceneObject[] => [ar(at(f, x0, 0), at(f, x1, 0)), ar(at(f, 0, y0), at(f, 0, y1))]
/** A piecewise-linear curve through the points of a function sampled at the given abscissae (kinks included). */
const pieceOf = (f: Frame, fn: (x: number) => number, xs: readonly number[], color: string): SceneObject => curve(xs.map((x) => mapOf(f)(x, fn(x))), color)

// ── 1. Differentiability (rigorous) ──────────────────────────────────────────

/** Left: f = |x| at 0 — the difference quotients are −1 from the left and +1 from the right (equal scales, ux = uy). Right: f = x², the secants through the origin have the slopes h = 1, 0.5, 0.25 → 0. */
export const DFL: Frame = { ox: -3.2, oy: -1.3, ux: 1.2, uy: 1.2 }
export const DFR: Frame = { ox: 0.6, oy: -1.3, ux: 1.5, uy: 1.5 }
export const dfHs = [1, 0.5, 0.25] as const

/** KG: f′(a) = lim [f(a + h) − f(a)]/h; differentiable ⟹ continuous, the converse fails (|x| at 0). */
export function buildDifferentiabilityRigorousScene(): SceneSpec {
  return framed(raw_buildDifferentiabilityRigorousScene())
}
function raw_buildDifferentiabilityRigorousScene(): SceneSpec {
  return {
    id: 'math-differentiability-rigorous',
    title: 'Differentiability: the difference quotient has a limit',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show f′(a) = lim [f(a + h) − f(a)]/h as the limit of secant slopes. For f = |x| at a = 0 the quotient is +1 for every h > 0 (right) and −1 for every h < 0 (left): the two sides disagree, so there is no limit — |x| is continuous at 0 but not differentiable there. For f = x² at 0 the quotient is h, and the secant slopes 1, 0.5, 0.25 tend to 0, so f′(0) = 0.',
    ariaLabel:
      'On the left the graph of absolute value of x, a V with its corner at the origin, with a red secant of slope minus 1 on the left and a green secant of slope plus 1 on the right, captioned left minus 1, right plus 1 and no derivative at 0. On the right the parabola x squared with three violet secants from the origin to the points at x equal 1, 0.5 and 0.25, their slopes 1, 0.5 and 0.25 getting flatter, captioned slopes 1, 0.5, 0.25 and f prime of 0 equals 0.',
    stage: NO_STAGE,
    steps: [
      { narration: 'f(x) = |x|: a V with its corner at 0. The derivative at 0 asks for the limit of [f(h) − f(0)]/h as h → 0.', objects: [...axesOf(DFL, -1.5, 1.5, -0.1, 1.5), lineAt(DFL, [-1.3, 1.3], [0, 0], ROLE.output, 0.06), lineAt(DFL, [0, 0], [1.3, 1.3], ROLE.output, 0.06), dotAt(DFL, 0, 0, ROLE.ink, 0.12), lb('f = |x|', [DFL.ox, 1.7], ROLE.output)] },
      { narration: 'From the right (h > 0) the quotient is h/h = +1 (green secant); from the left (h < 0) it is −h/h = −1 (red). The two one-sided limits differ, so |x| has no derivative at 0 — although it is continuous there.', objects: [lineAt(DFL, [0, 0], [1, 1], ROLE.result, 0.07), lineAt(DFL, [0, 0], [-1, 1], ROLE.input, 0.07), lb('left −1', [at(DFL, -1, 0)[0] - 0.2, at(DFL, 0, 1)[1] + 0.75], ROLE.input), lb('right +1', [at(DFL, 1, 0)[0] + 0.3, at(DFL, 0, 1)[1] + 0.75], ROLE.result), lb('no f′(0)', [DFL.ox, -2.3], ROLE.aid)] },
      { narration: 'Compare f(x) = x² at 0: the quotient is h²/h = h, and the secants through the origin and (h, h²) have the slopes 1, 0.5, 0.25 → 0 (violet). The limit exists: f′(0) = 0.', objects: [...axesOf(DFR, -0.2, 1.4, -0.1, 1.55), curveOf(DFR, (x) => x * x, 0, 1.25, ROLE.output, 40), ...dfHs.map((h) => lineAt(DFR, [0, 0], [h, h * h], ROLE.aid, 0.045)), ...dfHs.map((h) => dotAt(DFR, h, h * h, ROLE.aid, 0.1)), lb('f = x²', [DFR.ox + 1.0, 1.7], ROLE.output), lb('slopes 1, 0.5, 0.25', [DFR.ox + 1.2, -2.3], ROLE.aid), lb('f′(0) = 0', [3.9, -1.0], ROLE.result)] },
    ],
  }
}

// ── 2. Taylor's theorem (rigorous) ───────────────────────────────────────────

/** sin x ≈ x − x³/6 on [0, 1]: R₃(1) = sin 1 − 5/6 = 0.00814 = sin(c)/24 for one c in (0, 1), c = arcsin(24 R₃(1)) = 0.1966. The figure draws f⁗ = sin t, the level 24 R₃(1) and the point where they meet. */
export const TYL: Frame = { ox: -4.0, oy: -2.2, ux: 5.0, uy: 4.4 }
export const tylR3 = Math.sin(1) - 5 / 6
export const tylLevel = 24 * tylR3
export const tylC = Math.asin(tylLevel)

/** KG: f(x) = Σ f⁽ᵏ⁾(a)/k! (x − a)ᵏ + Rₙ(x), Rₙ = f⁽ⁿ⁺¹⁾(c)/(n + 1)! (x − a)ⁿ⁺¹ for some c between a and x. */
export function buildTaylorRigorousScene(): SceneSpec {
  return framed(raw_buildTaylorRigorousScene())
}
function raw_buildTaylorRigorousScene(): SceneSpec {
  return {
    id: 'math-taylor-rigorous',
    title: 'Taylor’s theorem: the Lagrange remainder',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show where the point c of the Lagrange remainder comes from. For f = sin x, a = 0, n = 3 the polynomial is x − x³/6 and the error at x = 1 is R₃(1) = sin 1 − 5/6 = 0.00814. The theorem says R₃(1) = f⁗(c)/4! for some c between 0 and 1, so f⁗(c) = sin c = 24 × 0.00814 = 0.195. The fourth derivative is sin t (blue); it takes the value 0.195 at c ≈ 0.197, inside (0, 1).',
    ariaLabel:
      'A graph of the curve sin t for t from 0 to 1, rising from 0 to 0.84. In the second step a violet horizontal line at the height 0.195 crosses it, captioned error R 3 of 1 equals 0.00814 and 24 times 0.00814 is about 0.195. In the third step a green dot where the line meets the curve and a green vertical guide down to the t axis at about 0.197 are captioned c about 0.197.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The fourth derivative of f = sin x is f⁗(t) = sin t (blue), on the interval from 0 to 1.', objects: [...axesOf(TYL, -0.05, 1.12, -0.04, 0.95), curveOf(TYL, Math.sin, 0, 1, ROLE.output, 40), lb('0', [at(TYL, 0, 0)[0], -2.65]), lb('1', [at(TYL, 1, 0)[0], -2.65]), lb('f⁗(t) = sin t', [at(TYL, 0.74, 0.9)[0] + 0.2, at(TYL, 0, 0.93)[1] + 0.2], ROLE.output)] },
      { narration: 'The error of x − x³/6 at x = 1 is R₃(1) = sin 1 − 5/6 = 0.00814. Lagrange: R₃(1) = f⁗(c)/24, so f⁗(c) = 24 × 0.00814 ≈ 0.195 (violet level).', objects: [lineAt(TYL, [0, tylLevel], [1.05, tylLevel], ROLE.aid, 0.035), lb('error R₃(1) = 0.00814', [3.1, 1.0], ROLE.input), lb('24 × 0.00814 ≈ 0.195', [3.1, 0.0], ROLE.aid)] },
      { narration: 'The curve sin t takes the value 0.195 at one point c = arcsin 0.195 ≈ 0.197 — between 0 and 1, as the theorem promises (green).', objects: [lineAt(TYL, [tylC, 0], [tylC, tylLevel], ROLE.result, 0.035), dotAt(TYL, tylC, tylLevel, ROLE.result, 0.16), lb('c', [at(TYL, tylC, 0)[0], -2.65], ROLE.result), lb('c ≈ 0.197', [3.1, -1.0], ROLE.result)] },
    ],
  }
}

// ── 3. Fundamental theorem of calculus (rigorous) ────────────────────────────

/** f(t) = t² (left) and F(x) = ∫₀ˣ t² dt = x³/3 (right): F(2) is the area 8/3, F′(2) = f(2) = 4, and ∫₁³ f = F(3) − F(1) = 9 − 1/3. */
export const FTL: Frame = { ox: -4.5, oy: -2.2, ux: 0.9, uy: 0.33 }
export const FTR: Frame = { ox: 0.3, oy: -2.2, ux: 1.2, uy: 0.33 }
export const ftcF = (x: number) => (x * x * x) / 3
export const ftcX0 = 2

/** KG: Part 1 — F(x) = ∫ₐˣ f has F′(x₀) = f(x₀) at a point of continuity; Part 2 — ∫ₐᵇ f = F(b) − F(a) for any antiderivative F. */
export function buildFtcRigorousScene(): SceneSpec {
  return framed(raw_buildFtcRigorousScene())
}
function raw_buildFtcRigorousScene(): SceneSpec {
  const hatch: SceneObject[] = []
  for (let k = 0; k < 9; k++) { const t = 0.3 + 0.2 * k; hatch.push(lineAt(FTL, [t, 0], [t, t * t], ROLE.output, 0.03)) }
  return {
    id: 'math-ftc-rigorous',
    title: 'Fundamental theorem of calculus',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show both parts of the fundamental theorem with f(t) = t². Part 1: the accumulated area F(x) = ∫₀ˣ t² dt (hatched under the left curve up to x = 2, area 8/3 = 2.67) is the height of the right curve F(x) = x³/3, whose slope at x = 2 is exactly f(2) = 4. Part 2: ∫₁³ t² dt = F(3) − F(1) = 9 − 0.33 = 8.67, a difference of two heights of F.',
    ariaLabel:
      'On the left the parabola t squared for t from 0 to 3 with the area under it from 0 to 2 hatched in blue, captioned area from 0 to 2 equals 2.67. On the right the cubic curve x cubed over 3 with a green tangent at x equals 2 of slope 4, captioned F prime of 2 equals f of 2 equals 4. In the third step the heights of the cubic at x equal 1 and x equal 3 are marked with violet horizontal segments, captioned F of 3 minus F of 1 is 9 minus 0.33 equals 8.67.',
    stage: NO_STAGE,
    steps: [
      { narration: 'f(t) = t² (left). The accumulated area F(2) = ∫₀² t² dt is the hatched region under the curve from 0 to 2: 8/3 ≈ 2.67.', objects: [...axesOf(FTL, -0.2, 3.2, -0.5, 9.7), curveOf(FTL, (x) => x * x, 0, 3, ROLE.output, 40), ...hatch, lb('f(t) = t²', [-3.0, 1.5], ROLE.output), lb('area 0 to 2 = 2.67', [-3.3, -2.75], ROLE.output)] },
      { narration: 'The height of F(x) = x³/3 (right) at x = 2 is that area 2.67. Part 1: its slope at x = 2 is f(2) = 4 (green tangent): F′(x₀) = f(x₀).', objects: [...axesOf(FTR, -0.2, 3.3, -0.5, 9.7), curveOf(FTR, ftcF, 0, 3, ROLE.input, 40), dotAt(FTR, ftcX0, ftcF(ftcX0), ROLE.result, 0.14), lineAt(FTR, [ftcX0 - 0.6, ftcF(ftcX0) - 2.4], [ftcX0 + 0.6, ftcF(ftcX0) + 2.4], ROLE.result, 0.04), lb('F(x) = x³/3', [2.1, 1.5], ROLE.input), lb('F′(2) = f(2) = 4', [1.2, -0.1], ROLE.result)] },
      { narration: 'Part 2: the area from 1 to 3 is the difference of two heights of F: F(3) − F(1) = 9 − 0.33 = 8.67 (violet).', objects: [lineAt(FTR, [0, ftcF(1)], [1, ftcF(1)], ROLE.aid, 0.04), lineAt(FTR, [0, ftcF(3)], [3, ftcF(3)], ROLE.aid, 0.04), lb('9', [FTR.ox - 0.45, at(FTR, 0, ftcF(3))[1]], ROLE.aid), lb('0.33', [FTR.ox - 0.75, at(FTR, 0, ftcF(1))[1]], ROLE.aid), lb('9 − 0.33 = 8.67', [2.4, -2.75], ROLE.aid)] },
    ],
  }
}

// ── 4. Measure ───────────────────────────────────────────────────────────────

/** A probability measure on [0, 1]: the disjoint pieces A = [0, 0.3), B = [0.3, 0.5), C = [0.5, 1] have μ = 0.3, 0.2, 0.5, which add up to μ([0, 1]) = 1. */
export const MSR = { x0: -3.0, w: 6.0, y: 0.4, pieces: [[0, 0.3], [0.3, 0.5], [0.5, 1]] as ReadonlyArray<readonly [number, number]> }
export const msrX = (t: number) => MSR.x0 + MSR.w * t

/** KG: a function μ with μ(∅) = 0 and countable additivity; a probability measure has μ(X) = 1. */
export function buildMeasureScene(): SceneSpec {
  return framed(raw_buildMeasureScene())
}
function raw_buildMeasureScene(): SceneSpec {
  const { y, pieces } = MSR
  const colors = [ROLE.output, ROLE.input, ROLE.result]
  const names = ['A', 'B', 'C']
  return {
    id: 'math-measure',
    title: 'Measure: additivity over disjoint pieces',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a measure as an additive size. The set [0, 1] is split into three disjoint pieces A, B, C (blue, red, green) of measure 0.3, 0.2 and 0.5. Additivity: the measure of the union is the sum, 0.3 + 0.2 + 0.5 = 1 = μ([0, 1]), so this is a probability measure (μ(X) = 1). The empty set has measure 0.',
    ariaLabel:
      'A horizontal bar from 0 to 1 made of three touching coloured pieces: a blue piece A covering 0 to 0.3, a red piece B covering 0.3 to 0.5 and a green piece C covering 0.5 to 1, each marked with its letter above. In the second step their measures 0.3, 0.2 and 0.5 appear under them. In the third step the captions 0.3 plus 0.2 plus 0.5 equals 1, mu of X equals 1 and mu of the empty set equals 0 appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Split the set X = [0, 1] into three disjoint pieces: A = [0, 0.3), B = [0.3, 0.5), C = [0.5, 1].', objects: [...pieces.map(([a, b], k) => ln([msrX(a), y], [msrX(b), y], colors[k], 0.22)), ...pieces.map(([a, b], k) => lb(names[k], [(msrX(a) + msrX(b)) / 2, y + 0.65], colors[k]))] },
      { narration: 'A measure μ gives each piece a size: μ(A) = 0.3, μ(B) = 0.2, μ(C) = 0.5 (here: the length).', objects: pieces.map(([a, b], k) => lb(String(Math.round((b - a) * 10) / 10), [(msrX(a) + msrX(b)) / 2, y - 0.65], colors[k])) },
      { narration: 'Additivity: for disjoint pieces μ(A ∪ B ∪ C) = μ(A) + μ(B) + μ(C) = 0.3 + 0.2 + 0.5 = 1 = μ(X) — a probability measure. And μ(∅) = 0.', objects: [lb('0.3 + 0.2 + 0.5 = 1', [-0.6, -1.5], ROLE.result), lb('μ(X) = 1', [-2.4, -2.4], ROLE.ink), lb('μ(∅) = 0', [1.4, -2.4], ROLE.ink)] },
    ],
  }
}

// ── 5. Lebesgue measure ──────────────────────────────────────────────────────

/** E = [0.1, 0.35] ∪ [0.5, 0.8] has length 0.25 + 0.3 = 0.55. Covers by open intervals have the total lengths 0.75, 0.63, 0.57 — each at least 0.55 and tending to it: m*(E) = inf Σ|Iₙ| = 0.55. */
export const LEB = {
  x0: -3.0, w: 6.0, yE: -2.0, rows: [[0.9, [[0.05, 0.4], [0.45, 0.85]]], [-0.05, [[0.08, 0.37], [0.48, 0.82]]], [-1.0, [[0.095, 0.355], [0.495, 0.805]]]] as ReadonlyArray<readonly [number, ReadonlyArray<readonly [number, number]>]>,
  E: [[0.1, 0.35], [0.5, 0.8]] as ReadonlyArray<readonly [number, number]>,
}
export const lebX = (t: number) => LEB.x0 + LEB.w * t

/** KG: m*(E) = inf {Σ|Iₙ| : E ⊆ ⋃ Iₙ}; extends length to the measurable sets of ℝ, translation invariant, m([a, b]) = b − a. */
export function buildLebesgueMeasureScene(): SceneSpec {
  return framed(raw_buildLebesgueMeasureScene())
}
function raw_buildLebesgueMeasureScene(): SceneSpec {
  const { rows, E, yE } = LEB
  const tot = (iv: ReadonlyArray<readonly [number, number]>) => iv.reduce((s, [a, b]) => s + (b - a), 0)
  const rowObjs = (k: number): SceneObject[] => [...rows[k][1].map(([a, b]) => ln([lebX(a), rows[k][0]], [lebX(b), rows[k][0]], ROLE.reference, 0.07)), lb(`Σ = ${tot(rows[k][1]).toFixed(2)}`, [3.4, rows[k][0]], ROLE.aid)]
  return {
    id: 'math-lebesgue-measure',
    title: 'Lebesgue measure: the best cover',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the outer measure m*(E) = inf Σ|Iₙ|. The set E = [0.1, 0.35] ∪ [0.5, 0.8] (blue) has length 0.25 + 0.3 = 0.55. Covers of E by open intervals have total lengths 0.75, 0.63, 0.57: every cover is at least 0.55 long, and tighter covers come as close to 0.55 as we like, so m*(E) = 0.55 = the length of E.',
    ariaLabel:
      'A number line from 0 to 1 with two thick blue segments, from 0.1 to 0.35 and from 0.5 to 0.8, labelled E. Above it, three pairs of grey bars cover E ever more tightly, the top pair loosest; their total lengths are captioned sigma equals 0.75, 0.63 and 0.57. In the third step the caption m of E equals 0.25 plus 0.3 equals 0.55 appears.',
    stage: NO_STAGE,
    steps: [
      { narration: 'E = [0.1, 0.35] ∪ [0.5, 0.8] on the line from 0 to 1: its length is 0.25 + 0.3 = 0.55.', objects: [...E.map(([a, b]) => ln([lebX(a), yE], [lebX(b), yE], ROLE.output, 0.14)), lb('E', [lebX(0.0) - 0.3, yE], ROLE.output), lb('0', [lebX(0), yE - 0.5]), lb('1', [lebX(1), yE - 0.5])] },
      { narration: 'Cover E by open intervals and add up their lengths: a loose cover (0.05, 0.4) ∪ (0.45, 0.85) has total length 0.75; a tighter one (0.08, 0.37) ∪ (0.48, 0.82) has 0.63.', objects: [...rowObjs(0), ...rowObjs(1)] },
      { narration: 'An even tighter cover has total length 0.57. No cover can be shorter than E itself: m*(E) = inf Σ|Iₙ| = 0.55 = 0.25 + 0.3.', objects: [...rowObjs(2), lb('m(E) = 0.25 + 0.3 = 0.55', [0.0, -2.95], ROLE.result)] },
    ],
  }
}

// ── 6. Measure zero ──────────────────────────────────────────────────────────

/** Five points of a countable set; the n-th is covered by an interval of length ε/2ⁿ. For ε = 0.4 the total is 0.3875, for ε = 0.1 it is 0.096875: as small as we like. */
export const MZR = { x0: -3.0, w: 6.0, pts: [0.1, 0.3, 0.5, 0.7, 0.9] as readonly number[], yP: 1.5, rows: [[0.4, 0.3], [0.1, -1.0]] as ReadonlyArray<readonly [number, number]> }
export const mzrX = (t: number) => MZR.x0 + MZR.w * t
export const mzrWidth = (eps: number, n: number) => eps / Math.pow(2, n)

/** KG: E has measure zero iff μ(E) = 0; countable sets have measure zero (cover the n-th point by an interval of length ε/2ⁿ). */
export function buildMeasureZeroScene(): SceneSpec {
  return framed(raw_buildMeasureZeroScene())
}
function raw_buildMeasureZeroScene(): SceneSpec {
  const { pts, yP, rows } = MZR
  const rowObjs = (k: number): SceneObject[] => [...pts.map((t, i) => ln([mzrX(t - mzrWidth(rows[k][0], i + 1) / 2), rows[k][1]], [mzrX(t + mzrWidth(rows[k][0], i + 1) / 2), rows[k][1]], k === 0 ? ROLE.input : ROLE.result, 0.12))]
  const sumOf = (eps: number) => pts.reduce((s, _, i) => s + mzrWidth(eps, i + 1), 0)
  return {
    id: 'math-measure-zero',
    title: 'Measure zero: covers that shrink',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show why a countable set has measure zero. Cover the n-th point by an interval of length ε/2ⁿ: the lengths ε/2, ε/4, ε/8, … add up to at most ε. For ε = 0.4 the five drawn intervals (red) have total length 0.3875; for ε = 0.1 (green) 0.096875. Since ε can be as small as we like, the total length of a cover can be made arbitrarily small: the measure of the set is 0.',
    ariaLabel:
      'Five blue dots on a line at the positions 0.1, 0.3, 0.5, 0.7 and 0.9. In the second step a row of red bars each centred under a dot, the first wide and each next half as wide, captioned epsilon equals 0.4 and the total 0.39. In the third step a second row of green bars four times shorter, captioned epsilon equals 0.1 and the total 0.097, with the caption as epsilon tends to 0 the measure is 0.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Five points of a countable set (blue) on the line from 0 to 1.', objects: [...pts.map((t) => dt([mzrX(t), yP], ROLE.output, 0.12)), lb('a countable set', [0, yP + 0.65], ROLE.output)] },
      { narration: 'Cover the n-th point by an interval of length ε/2ⁿ. For ε = 0.4 the lengths are 0.2, 0.1, 0.05, 0.025, 0.0125 (red): total 0.3875 ≈ 0.39.', objects: [...rowObjs(0), lb(`ε = 0.4: Σ = ${sumOf(0.4).toFixed(2)}`, [0, rows[0][1] - 0.65], ROLE.input)] },
      { narration: 'For ε = 0.1 each interval is four times shorter (green): total 0.096875 ≈ 0.097. As ε → 0 the total length of the cover tends to 0: the set has measure zero.', objects: [...rowObjs(1), lb(`ε = 0.1: Σ = ${sumOf(0.1).toFixed(3)}`, [0, rows[1][1] - 0.65], ROLE.result), lb('ε → 0: measure 0', [0, -2.5], ROLE.ink)] },
    ],
  }
}

// ── 7. Convergence theorems ──────────────────────────────────────────────────

/** fₙ(x) = min(nx, 1) on [0, 1] increases to f = 1 (for x > 0): ∫fₙ = 1 − 1/(2n) = 0.5, 0.75, 0.875 → 1 = ∫f (monotone convergence). */
export const MCV: Frame = { ox: -4.4, oy: -2.2, ux: 4.0, uy: 3.4 }
export const mcvF = (n: number) => (x: number) => Math.min(n * x, 1)
export const mcvXs = (n: number): number[] => [...Array.from({ length: 41 }, (_, k) => k / 40), 1 / n].sort((a, b) => a - b).filter((x, i, a) => i === 0 || x !== a[i - 1])

/** KG: MCT — if 0 ≤ fₙ ↑ f a.e. then ∫fₙ → ∫f; Fatou's lemma and dominated convergence allow the interchange of limit and integral. */
export function buildConvergenceTheoremsScene(): SceneSpec {
  return framed(raw_buildConvergenceTheoremsScene())
}
function raw_buildConvergenceTheoremsScene(): SceneSpec {
  return {
    id: 'math-convergence-theorems',
    title: 'Monotone convergence theorem',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show monotone convergence on fₙ(x) = min(nx, 1), x in [0, 1]. The graphs for n = 1, 2, 4 (blue, violet, green) increase and approach the constant 1 (red). Their integrals, the areas under the graphs, are 1 − 1/(2n) = 0.5, 0.75, 0.875 and increase to 1 = ∫ of the limit: the limit and the integral can be interchanged.',
    ariaLabel:
      'A square graph on the unit interval. In the first step a blue straight line f 1 rising from 0 to 1 and a violet broken line f 2 that rises twice as steeply and then stays at 1. In the second step a green broken line f 4 even steeper, captioned the integrals 0.5, 0.75, 0.875. In the third step a red horizontal line at 1 is the limit, captioned f n increases to f equals 1 and the integral of f n tends to 1.',
    stage: NO_STAGE,
    steps: [
      { narration: 'f₁(x) = x (blue) and f₂(x) = min(2x, 1) (violet): the second graph is above the first at every x.', objects: [...axesOf(MCV, -0.05, 1.15, -0.04, 1.2), lb('y', [-2.95, 2.3]), pieceOf(MCV, mcvF(1), mcvXs(1), ROLE.output), pieceOf(MCV, mcvF(2), mcvXs(2), ROLE.aid), lb('0', [at(MCV, 0, 0)[0], -2.65]), lb('1', [at(MCV, 1, 0)[0], -2.65]), lb('fₙ(x) = min(nx, 1)', [2.4, 1.6], ROLE.ink)] },
      { narration: 'f₄(x) = min(4x, 1) (green) is higher still. The areas under f₁, f₂, f₄ are 1 − 1/(2n) = 0.5, 0.75, 0.875.', objects: [pieceOf(MCV, mcvF(4), mcvXs(4), ROLE.result), lb('∫fₙ = 0.5, 0.75, 0.875', [2.4, 0.4], ROLE.result)] },
      { narration: 'The graphs increase to the constant function f = 1 (red) and the integrals increase to 1 = ∫f: monotone convergence lets us swap lim and ∫.', objects: [lineAt(MCV, [0, 1], [1, 1], ROLE.input, 0.05), lb('fₙ ↑ f = 1', [2.4, -0.6], ROLE.input), lb('∫fₙ → 1', [2.4, -1.5], ROLE.ink)] },
    ],
  }
}

// ── 8. Lᵖ spaces ─────────────────────────────────────────────────────────────

/** The unit balls of the norms ‖(x, y)‖ₚ = 1: the diamond (p = 1), the circle (p = 2) and the square (p = ∞), nested; the point (0.707, 0.707) has the norms 1.41, 1, 0.71. */
export const LPS = { c: [-1.6, 0] as Pt, R: 2.2, capX: 3.0 }
export const lpsPt = (x: number, y: number): Pt => [LPS.c[0] + x * LPS.R, LPS.c[1] + y * LPS.R]
export const lpsCircle = (n = 56): V3[] => Array.from({ length: n + 1 }, (_, k) => { const a = (2 * Math.PI * k) / n; return P(LPS.c[0] + LPS.R * Math.cos(a), LPS.c[1] + LPS.R * Math.sin(a)) })
const LPS_Q = Math.SQRT1_2

/** KG: Lᵖ = {f : ∫|f|ᵖ dμ < ∞} with ‖f‖ₚ = (∫|f|ᵖ)^(1/p); p = ∞ is the essential supremum; Hölder and Minkowski inequalities. */
export function buildLpSpaceScene(): SceneSpec {
  return framed(raw_buildLpSpaceScene())
}
function raw_buildLpSpaceScene(): SceneSpec {
  const corners = [[1, 0], [0, 1], [-1, 0], [0, -1]] as const
  const sq = [[1, 1], [-1, 1], [-1, -1], [1, -1]] as const
  const poly = (pts: ReadonlyArray<readonly [number, number]>, color: string, t: number) => pts.map((p, i) => ln(lpsPt(p[0], p[1]), lpsPt(pts[(i + 1) % pts.length][0], pts[(i + 1) % pts.length][1]), color, t))
  return {
    id: 'math-lp-space',
    title: 'Lᵖ spaces: the unit balls of the p-norms',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how the choice of p changes the size of a vector. In the plane the vectors of ‖v‖ₚ = 1 form the diamond |x| + |y| = 1 (p = 1, red), the circle x² + y² = 1 (p = 2, blue) and the square max(|x|, |y|) = 1 (p = ∞, green): nested, the larger p the larger the ball. The vector v = (1/√2, 1/√2) ≈ (0.71, 0.71) on the circle has the norms ‖v‖₁ = √2 ≈ 1.41, ‖v‖₂ = 1 and ‖v‖∞ = 1/√2 ≈ 0.71. The same norms (integrals instead of sums) define the function spaces Lᵖ.',
    ariaLabel:
      'A red diamond with its corners on the axes, a blue circle through those corners and a green square around the circle, all centred on the same point, captioned p equals 1, p equals 2 and p equals infinity. In the third step a violet dot marks the point at 45 degrees on the circle, captioned the norms 1.41, 1 and 0.71.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The p = 1 norm ‖(x, y)‖₁ = |x| + |y|: its unit ball (all vectors of norm 1) is a diamond (red).', objects: [...poly(corners, ROLE.input, 0.05), lb('p = 1', [LPS.capX, 1.4], ROLE.input)] },
      { narration: 'The p = 2 norm √(x² + y²) gives the circle (blue), and p = ∞ with ‖(x, y)‖∞ = max(|x|, |y|) the square (green): the balls are nested, diamond ⊂ circle ⊂ square.', objects: [curve(lpsCircle(), ROLE.output), ...poly(sq, ROLE.result, 0.05), lb('p = 2', [LPS.capX, 0.5], ROLE.output), lb('p = ∞', [LPS.capX, -0.4], ROLE.result)] },
      { narration: 'One vector, three sizes: v = (1/√2, 1/√2) ≈ (0.71, 0.71) lies on the circle, so ‖v‖₂ = 1; but ‖v‖₁ = 2/√2 = √2 ≈ 1.41 and ‖v‖∞ = 1/√2 ≈ 0.71.', objects: [dt(lpsPt(LPS_Q, LPS_Q), ROLE.aid, 0.15), lb('norms 1.41, 1, 0.71', [LPS.capX, -1.5], ROLE.aid)] },
    ],
  }
}

// ── 9. L² space ──────────────────────────────────────────────────────────────

/** f = (3, 4) in an orthonormal basis: ‖f‖² = 3² + 4² = 9 + 16 = 25 (Parseval), and in the rotated orthonormal basis (0.6, 0.8), (−0.8, 0.6) the coordinates are 5 and 0: 25 + 0 = 25 again. */
export const L2S = { o: [-3.2, -1.9] as Pt, u: 0.55 }
export const l2sPt = (x: number, y: number): Pt => [L2S.o[0] + x * L2S.u, L2S.o[1] + y * L2S.u]

/** KG: L²(μ) with ⟨f, g⟩ = ∫ f ḡ dμ is a Hilbert space; for an orthonormal basis Parseval's identity gives Σ|⟨f, eₙ⟩|² = ‖f‖². */
export function buildL2SpaceScene(): SceneSpec {
  return framed(raw_buildL2SpaceScene())
}
function raw_buildL2SpaceScene(): SceneSpec {
  return {
    id: 'math-l2-space',
    title: 'L² as a Hilbert space: Parseval',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show Parseval\'s identity with the picture that Hilbert spaces generalise: the vector f = (3, 4) of the plane. Its coordinates along the orthonormal axes e₁, e₂ are ⟨f, e₁⟩ = 3 and ⟨f, e₂⟩ = 4, and the squares add up to the squared length: 9 + 16 = 25 = ‖f‖² (so ‖f‖ = 5). In the rotated orthonormal basis e₁′ = (0.6, 0.8), e₂′ = (−0.8, 0.6) the coordinates are 5 and 0, and again 25 + 0 = 25: the sum of squared coordinates does not depend on the basis.',
    ariaLabel:
      'A horizontal and a vertical grey axis from a common origin and a green arrow f to the point 3 along and 4 up, with violet guides down to the axes and the numbers 3 and 4 on them. In the second step the captions f equals 3, 4 and 9 plus 16 equals 25 and the length of f is 5 appear. In the third step two violet arrows show the rotated basis, one along f, captioned e 1 prime and e 2 prime, and the other basis 25 plus 0 equals 25.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The vector f = (3, 4): its coordinates in the orthonormal basis e₁, e₂ (the axes) are ⟨f, e₁⟩ = 3 and ⟨f, e₂⟩ = 4.', objects: [ar(l2sPt(0, 0), l2sPt(6.4, 0)), ar(l2sPt(0, 0), l2sPt(0, 6.2)), ar(l2sPt(0, 0), l2sPt(3, 4), ROLE.result), ln(l2sPt(3, 0), l2sPt(3, 4), ROLE.aid, 0.03), ln(l2sPt(0, 4), l2sPt(3, 4), ROLE.aid, 0.03), lb('3', [l2sPt(3, 0)[0], l2sPt(0, 0)[1] - 0.45]), lb('4', [l2sPt(0, 0)[0] - 0.45, l2sPt(0, 4)[1]]), lb('f = (3, 4)', [l2sPt(3, 4)[0] + 1.3, l2sPt(3, 4)[1]], ROLE.result)] },
      { narration: 'Parseval: the squared coordinates add up to the squared length: 3² + 4² = 9 + 16 = 25 = ‖f‖², so ‖f‖ = 5 (the 3-4-5 triangle).', objects: [lb('9 + 16 = 25', [2.6, 0.5], ROLE.result), lb('‖f‖ = 5', [2.6, -0.5], ROLE.result)] },
      { narration: 'Another orthonormal basis, rotated: e₁′ = (0.6, 0.8) points along f, e₂′ = (−0.8, 0.6) is perpendicular. The coordinates are ⟨f, e₁′⟩ = 5 and ⟨f, e₂′⟩ = 0, and the sum of squares is again 25 + 0 = 25.', objects: [ar(l2sPt(0, 0), l2sPt(0.6 * 6.2, 0.8 * 6.2), ROLE.aid), ar(l2sPt(0, 0), l2sPt(-0.8 * 2.4, 0.6 * 2.4), ROLE.aid), lb('other basis: 25 + 0 = 25', [2.2, -1.5], ROLE.aid), lb('e₁′', [l2sPt(0.6 * 6.2, 0.8 * 6.2)[0], l2sPt(0.6 * 6.2, 0.8 * 6.2)[1] + 0.55], ROLE.aid), lb('e₂′', [l2sPt(-0.8 * 2.4, 0.6 * 2.4)[0] - 0.1, l2sPt(-0.8 * 2.4, 0.6 * 2.4)[1] + 0.55], ROLE.aid)] },
    ],
  }
}
