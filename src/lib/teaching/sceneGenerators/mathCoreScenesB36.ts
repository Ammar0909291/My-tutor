/**
 * Core mathematics figures — batch 36 of the mathematics visual campaign (2026-10-12): the calculus helpers (limit laws,
 * the chain rule, implicit differentiation, optimization, antiderivatives, trigonometric substitution, power series,
 * the radius of convergence, the Taylor remainder, the multivariable chain rule, limits of sequences by squeezing).
 *
 * Same rules as batches 1-35: one visual language from visualDesign.ts, labels are names not sentences (marks of 1-2
 * characters are free), steps are cumulative, coordinates stay inside +-5, at most 50 objects per step, nothing the figure
 * audit rejects (SM-01 evaluates the arithmetic in a label left to right: never write "1 × 5 + 2 × 7 = 19" as one label),
 * and every value, slope and bound a figure states is re-derived by the test file from the DRAWN curves, dots and lines
 * (curves are compared with their closed forms, slopes are read from the drawn tangents and checked against the curve).
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, sampleMapped, rightAngleMark, arcPts, type V3 } from './mathSceneKit'

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

// ── 1. Limit laws ────────────────────────────────────────────────────────────

/** Near x = 2: f(x) = x + 1 → 3 and g(x) = x² → 4, so f + g → 3 + 4 = 7 and f·g → 3 × 4 = 12. */
export const LML: Frame & { a: number } = { ox: -4.2, oy: -2.4, ux: 1.9, uy: 0.23, a: 2 }
export const lmlF = (x: number) => x + 1
export const lmlG = (x: number) => x * x
export const lmlFG = (x: number) => (x + 1) * x * x

/** KG: the limit of a sum, product, … is the sum, product, … of the limits (when those exist). */
export function buildLimitLawsScene(): SceneSpec {
  return framed(raw_buildLimitLawsScene())
}
function raw_buildLimitLawsScene(): SceneSpec {
  const a = LML.a
  return {
    id: 'math-limit-laws',
    title: 'The limit laws',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the sum and product laws for limits on two concrete functions as x approaches 2. f(x) = x + 1 (blue line) has the limit 3 and g(x) = x² (red parabola) has the limit 4. The limit of the product f(x)·g(x) = (x + 1)x² (green curve) is the product of the limits: 3 × 4 = 12, and the limit of the sum f(x) + g(x) is the sum of the limits: 3 + 4 = 7 (violet dot). In general lim(f ± g) = lim f ± lim g, lim(f g) = (lim f)(lim g), and lim(f/g) = lim f ÷ lim g when lim g ≠ 0.',
    ariaLabel:
      'A coordinate plane with a vertical violet guide at x equal 2. In the first step a blue straight line f and a red parabola g, with a blue dot at height 3 and a red dot at height 4 on the guide, captioned limit of f equals 3 and limit of g equals 4. In the second step a steeper green curve, the product, with a green dot at height 12 on the guide, captioned limit of f times g equals 12. In the third step a violet dot at height 7 for the sum and the captions 3 times 4 equals 12 and 3 plus 4 equals 7.',
    stage: NO_STAGE,
    steps: [
      { narration: 'As x → 2: f(x) = x + 1 (blue) tends to 3 and g(x) = x² (red) tends to 4; the vertical guide marks x = 2.', objects: [...axesOf(LML, -0.3, 3.2, -1, 16.5), lineAt(LML, [a, 0], [a, 14], ROLE.aid, 0.025), curveOf(LML, lmlF, 0, 3, ROLE.output, 30), curveOf(LML, lmlG, 0, 3, ROLE.input, 40), dotAt(LML, a, 3, ROLE.output, 0.13), dotAt(LML, a, 4, ROLE.input, 0.13), lb('lim f = 3', [at(LML, 3, 4)[0] + 0.6, at(LML, 3, 4)[1] - 0.45], ROLE.output), lb('lim g = 4', [at(LML, 3, 9)[0] + 0.6, at(LML, 3, 9)[1] + 0.2], ROLE.input)] },
      { narration: 'The product f(x)·g(x) = (x + 1)x² (green) tends to 12 — the product of the two limits, 3 × 4.', objects: [curveOf(LML, lmlFG, 0, 2.25, ROLE.result, 45), dotAt(LML, a, 12, ROLE.result, 0.14), lb('lim fg = 12', [at(LML, a, 12)[0] - 1.6, at(LML, a, 12)[1] + 0.5], ROLE.result)] },
      { narration: 'The sum f(x) + g(x) tends to 3 + 4 = 7 (violet dot): the limit of a sum is the sum of the limits.', objects: [dotAt(LML, a, 7, ROLE.aid, 0.13), lb('3 × 4 = 12', [3.2, 0.5], ROLE.result), lb('3 + 4 = 7', [3.2, -0.4], ROLE.aid)] },
    ],
  }
}

// ── 2. Chain rule ────────────────────────────────────────────────────────────

/** y = (x² + 1)³ = f(g(x)) with g(x) = x² + 1 and f(u) = u³: at x = 1, g′ = 2 (g = 2), f′(2) = 12, and (f ∘ g)′(1) = 12 × 2 = 24. */
export const CHN = {
  g: { ox: -4.3, oy: -2.2, ux: 1.2, uy: 0.5 } as Frame,   // u = g(x), x in [0, 2]
  f: { ox: -1.8, oy: -2.2, ux: 1.1, uy: 0.1 } as Frame,   // y = f(u), u in [1, 3]
  h: { ox: 2.1, oy: -2.2, ux: 1.4, uy: 0.095 } as Frame,  // y = (x² + 1)³, x in [0, 1.5]
}
export const chnG = (x: number) => x * x + 1
export const chnF = (u: number) => u * u * u
export const chnH = (x: number) => Math.pow(x * x + 1, 3)

/** KG: (f ∘ g)′(x) = f′(g(x)) · g′(x). */
export function buildChainRuleScene(): SceneSpec {
  return framed(raw_buildChainRuleScene())
}
function raw_buildChainRuleScene(): SceneSpec {
  const tangent = (f: Frame, x: number, y: number, slope: number, half: number, color: string) => lineAt(f, [x - half, y - slope * half], [x + half, y + slope * half], color, 0.04)
  return {
    id: 'math-chain-rule',
    title: 'The chain rule: slopes multiply',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that for a composite function the slopes multiply. y = (x² + 1)³ is the composite of the inner function u = g(x) = x² + 1 and the outer function y = f(u) = u³. At x = 1 the inner function has u = 2 and slope g′(1) = 2 (left, red tangent). At u = 2 the outer function has slope f′(2) = 3 × 2² = 12 (middle, blue tangent). The composite (right, green) therefore has slope f′(g(1)) · g′(1) = 12 × 2 = 24 at x = 1: a small change in x changes u twice as fast, and u changes y twelve times as fast, so y changes 24 times as fast.',
    ariaLabel:
      'Three small graphs side by side. Left: the parabola u equals x squared plus 1 with a red tangent of slope 2 at x equal 1. Middle: the cubic y equals u cubed with a blue tangent of slope 12 at u equal 2. Right: the steep curve y equals x squared plus 1 cubed with a green tangent of slope 24 at x equal 1, and the caption 12 times 2 equals 24.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Inner function u = g(x) = x² + 1. At x = 1: u = 2 and the slope g′(1) = 2x = 2 (red tangent).', objects: [...axesOf(CHN.g, -0.2, 2.2, -0.5, 5.4), curveOf(CHN.g, chnG, 0, 2, ROLE.input, 40), tangent(CHN.g, 1, 2, 2, 0.9, ROLE.input), dotAt(CHN.g, 1, 2, ROLE.input, 0.12), lb('u = x² + 1', [at(CHN.g, 0.85, 0)[0], at(CHN.g, 1, 5.4)[1] + 0.35]), lb('slope 2', [at(CHN.g, 1.1, 0)[0], -2.75], ROLE.input)] },
      { narration: 'Outer function y = f(u) = u³. At u = 2 the slope is f′(2) = 3u² = 12 (blue tangent).', objects: [...axesOf(CHN.f, 0.5, 3.2, -2, 30), curveOf(CHN.f, chnF, 1, 3, ROLE.output, 40), tangent(CHN.f, 2, 8, 12, 0.5, ROLE.output), dotAt(CHN.f, 2, 8, ROLE.output, 0.12), lb('y = u³', [at(CHN.f, 1.9, 0)[0], at(CHN.f, 1.9, 30)[1] + 0.2]), lb('slope 12', [at(CHN.f, 1.9, 0)[0], -2.75], ROLE.output)] },
      { narration: 'The composite y = (x² + 1)³ at x = 1: slope f′(g(1)) · g′(1) = 12 × 2 = 24 (green tangent) — the slopes multiply.', objects: [...axesOf(CHN.h, -0.2, 1.8, -2, 36), curveOf(CHN.h, chnH, 0, 1.5, ROLE.result, 45), tangent(CHN.h, 1, 8, 24, 0.17, ROLE.result), dotAt(CHN.h, 1, 8, ROLE.result, 0.12), lb('y = (x² + 1)³', [at(CHN.h, 0.9, 0)[0], at(CHN.h, 0.9, 36)[1] + 0.3]), lb('slope 24', [at(CHN.h, 0.8, 0)[0], -2.75], ROLE.result), lb('12 × 2 = 24', [-0.3, 2.7], ROLE.ink)] },
    ],
  }
}

// ── 3. Implicit differentiation ──────────────────────────────────────────────

/** x² + y² = 25 at (3, 4): differentiating gives 2x + 2y y′ = 0, so y′ = −x/y = −3/4: the tangent is perpendicular to the radius. */
export const IMP: Frame & { r: number; px: number; py: number } = { ox: -1.8, oy: 0, ux: 0.55, uy: 0.55, r: 5, px: 3, py: 4 }

/** KG: differentiate both sides with respect to x, treating y as a function of x, and solve for dy/dx. */
export function buildImplicitDifferentiationScene(): SceneSpec {
  return framed(raw_buildImplicitDifferentiationScene())
}
function raw_buildImplicitDifferentiationScene(): SceneSpec {
  const slope = -IMP.px / IMP.py
  const circle = curve(Array.from({ length: 97 }, (_, k) => pp(at(IMP, IMP.r * Math.cos((2 * Math.PI * k) / 96), IMP.r * Math.sin((2 * Math.PI * k) / 96)))), ROLE.output)
  const half = 2.6
  return {
    id: 'math-implicit-differentiation',
    title: 'Implicit differentiation on a circle',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show implicit differentiation on the circle x² + y² = 25. y is not given as a function of x, but near the point (3, 4) it is one, so differentiate both sides with respect to x and use the chain rule on y²: 2x + 2y·y′ = 0, which gives y′ = −x/y. At (3, 4) the slope is −3/4: the green tangent. It is perpendicular to the radius from the centre to the point (violet), whose slope is 4/3 — and (−3/4) × (4/3) = −1, as it must be for a circle.',
    ariaLabel:
      'A blue circle centred at the origin with radius 5. In the first step a red dot on the circle at (3, 4), the point, and the equation x squared plus y squared equals 25. In the second step a violet radius from the centre to the dot. In the third step a green tangent line through the dot with slope minus 3 over 4, a right-angle mark between radius and tangent, and the captions y prime equals minus x over y and slope minus 3 over 4.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The circle x² + y² = 25 and the point (3, 4) on it (red dot). y is not isolated, but we can still find the slope there.', objects: [...axesOf(IMP, -5.6, 5.6, -5.6, 5.6), circle, dotAt(IMP, IMP.px, IMP.py, ROLE.input, 0.15), lb('(3, 4)', [at(IMP, IMP.px, IMP.py)[0] + 0.7, at(IMP, IMP.px, IMP.py)[1] + 0.25], ROLE.input), lb('x² + y² = 25', [3.4, 1.2])] },
      { narration: 'Differentiate both sides with respect to x, treating y as a function of x: 2x + 2y·y′ = 0, so y′ = −x/y. First, the radius to the point (violet), of slope 4/3.', objects: [lineAt(IMP, [0, 0], [IMP.px, IMP.py], ROLE.aid, 0.04), lb('y′ = −x/y', [3.4, 0.3], ROLE.ink)] },
      { narration: 'At (3, 4): y′ = −3/4 (green tangent). It is perpendicular to the radius: (−3/4) × (4/3) = −1.', objects: [lineAt(IMP, [IMP.px - half * 0.8, IMP.py + half * 0.6], [IMP.px + half * 0.8, IMP.py - half * 0.6], ROLE.result, 0.05), ...rightAngleMark(at(IMP, IMP.px, IMP.py)[0], at(IMP, IMP.px, IMP.py)[1], [-0.6, -0.8], [-0.8, 0.6], 0.3, ROLE.aid), lb('slope −3/4', [3.4, -0.6], ROLE.result)] },
    ],
  }
}

// ── 4. Optimization ──────────────────────────────────────────────────────────

/** A(x) = x(20 − x) on [0, 20] (a rectangle of perimeter 40): critical point x = 10 (A′ = 20 − 2x = 0), A = 100 there, A = 0 at both endpoints. */
export const OPT: Frame = { ox: -3.5, oy: -2.0, ux: 0.35, uy: 0.03 }
export const optA = (x: number) => x * (20 - x)

/** KG: find the global extrema on a closed interval from the critical points and the endpoints. */
export function buildOptimizationScene(): SceneSpec {
  return framed(raw_buildOptimizationScene())
}
function raw_buildOptimizationScene(): SceneSpec {
  return {
    id: 'math-optimization',
    title: 'Optimization on a closed interval',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the closed-interval method on a concrete problem: a rectangle with perimeter 40 has width x and length 20 − x, so its area is A(x) = x(20 − x) for 0 ≤ x ≤ 20. Candidates for the maximum are the endpoints and the critical points. At the endpoints A(0) = A(20) = 0 (red dots). The critical point solves A′(x) = 20 − 2x = 0, so x = 10 (the horizontal violet tangent) and A(10) = 10 × 10 = 100. Comparing 0, 0 and 100 shows the global maximum is 100, a 10 by 10 square.',
    ariaLabel:
      'A downward parabola over x from 0 to 20 starting and ending on the axis. In the first step red dots at both endpoints with the captions A of 0 equals 0 and A of 20 equals 0. In the second step a short horizontal violet tangent at the top of the parabola and a green dot at the top labelled x equals 10. In the third step the captions A of 10 equals 100 and maximum area 100 at x equals 10 by 10 appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A(x) = x(20 − x) on [0, 20]. Check the endpoints first: A(0) = 0 and A(20) = 0 (red dots).', objects: [...axesOf(OPT, -1, 22, -5, 112), curveOf(OPT, optA, 0, 20, ROLE.output, 60), dotAt(OPT, 0, 0, ROLE.input, 0.13), dotAt(OPT, 20, 0, ROLE.input, 0.13), lb('A(0) = 0', [at(OPT, 0, 0)[0] + 0.1, at(OPT, 0, 0)[1] - 0.55], ROLE.input), lb('A(20) = 0', [at(OPT, 20, 0)[0] - 0.2, at(OPT, 20, 0)[1] - 0.55], ROLE.input)] },
      { narration: 'Critical point: A′(x) = 20 − 2x = 0 gives x = 10 (the tangent there is horizontal).', objects: [lineAt(OPT, [7, 100], [13, 100], ROLE.aid, 0.04), dotAt(OPT, 10, 100, ROLE.result, 0.15), lb('x = 10', [at(OPT, 10, 0)[0], at(OPT, 10, 0)[1] - 0.55], ROLE.result)] },
      { narration: 'Compare the values: A(10) = 100 beats the endpoint values 0 and 0, so the maximum area is 100 — a 10 × 10 square.', objects: [lb('A(10) = 100', [at(OPT, 10, 100)[0], at(OPT, 10, 100)[1] + 0.5], ROLE.result), lb('maximum area 100', [at(OPT, 10, 60)[0], at(OPT, 10, 60)[1]], ROLE.ink)] },
    ],
  }
}

// ── 5. Antiderivatives ───────────────────────────────────────────────────────

/** f(x) = 2x has the antiderivatives F(x) = x² + C: parallel copies of the parabola, all with the slope 2 at x = 1. */
export const ANT: Frame & { cs: readonly number[] } = { ox: -2.4, oy: -2.0, ux: 1.0, uy: 0.55, cs: [-1, 0, 1, 2] }
export const antF = (c: number) => (x: number) => x * x + c

/** KG: F is an antiderivative of f if F′ = f; it is unique up to an additive constant C. */
export function buildAntiderivativesScene(): SceneSpec {
  return framed(raw_buildAntiderivativesScene())
}
function raw_buildAntiderivativesScene(): SceneSpec {
  const cols = [ROLE.input, ROLE.reference, ROLE.output, ROLE.result]
  return {
    id: 'math-antiderivatives',
    title: 'Antiderivatives differ by a constant',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that an antiderivative is determined only up to a constant. For f(x) = 2x every function F(x) = x² + C has F′(x) = 2x = f(x): the four parabolas for C = −1, 0, 1, 2 are copies of one another shifted vertically by the differences of the C values. Because shifting a graph up or down does not change its steepness, they all have the same slope at the same x — here slope 2 at x = 1 (violet tangents). That is why ∫ 2x dx = x² + C: one constant for the whole family.',
    ariaLabel:
      'Four upward parabolas, the same shape stacked above one another at constant vertical gaps and labelled C equals minus 1, 0, 1 and 2 at their left ends. In the second step a short violet tangent of slope 2 is drawn on each parabola at x equal 1; they are all parallel. In the third step the captions F equals x squared plus C and F prime equals 2x for every C appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'F(x) = x² + C for C = −1, 0, 1, 2: the same parabola shifted up or down.', objects: [...axesOf(ANT, -2.4, 2.4, -2.4, 7.6), ...ANT.cs.map((c, i) => curveOf(ANT, antF(c), -2, 2, cols[i], 40)), ...ANT.cs.map((c) => lb(String(c).replace('-', '−'), [at(ANT, -2, 4 + c)[0] - 0.4, at(ANT, -2, 4 + c)[1]], ROLE.ink))] },
      { narration: 'At x = 1 every one of them has the slope 2 (violet tangents): shifting a graph does not change its slope, so F′ = 2x for every C.', objects: ANT.cs.map((c) => lineAt(ANT, [0.7, 1 + c - 2 * 0.3], [1.3, 1 + c + 2 * 0.3], ROLE.aid, 0.04))},
      { narration: 'So the antiderivatives of f(x) = 2x are exactly F(x) = x² + C, one constant C for the whole family.', objects: [lb('F = x² + C', [2.0, 1.6], ROLE.output), lb('F′ = 2x = f', [2.0, 0.7], ROLE.result)] },
    ],
  }
}

// ── 6. Trigonometric substitution ────────────────────────────────────────────

/** x = 3 sin θ in ∫ dx/√(9 − x²): a right triangle with hypotenuse 3, opposite side x and adjacent side √(9 − x²); for θ = 30°, x = 1.5 and √(9 − x²) = 2.598. */
export const TRG = { a: 3, deg: 30, scale: 1.5, o: [-3.6, -1.9] as Pt }
export const trgPoints = () => { const th = (TRG.deg * Math.PI) / 180, A = TRG.o, adj = TRG.a * Math.cos(th) * TRG.scale, opp = TRG.a * Math.sin(th) * TRG.scale; return { O: A, B: [A[0] + adj, A[1]] as Pt, C: [A[0] + adj, A[1] + opp] as Pt } }

/** KG: x = a sin θ turns √(a² − x²) into a cos θ. */
export function buildTrigSubstitutionScene(): SceneSpec {
  return framed(raw_buildTrigSubstitutionScene())
}
function raw_buildTrigSubstitutionScene(): SceneSpec {
  const { O, B, C } = trgPoints()
  return {
    id: 'math-trig-substitution',
    title: 'Trigonometric substitution x = 3 sin θ',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show where the substitution x = a sin θ comes from, for a = 3 in √(9 − x²). Draw a right triangle with hypotenuse 3 (the constant a) and an angle θ: the side opposite θ is x = 3 sin θ and the side adjacent to it is, by Pythagoras, √(9 − x²) = 3 cos θ. So the square root becomes a trigonometric function: √(9 − x²) = 3 cos θ, and dx = 3 cos θ dθ. For θ = 30° the sides are x = 3 × 0.5 = 1.5 and √(9 − 1.5²) = 2.598.',
    ariaLabel:
      'A right triangle with its right angle at the lower right. In the first step the long hypotenuse in blue labelled 3, the vertical side in red labelled x opposite the angle and the horizontal side in green labelled square root of 9 minus x squared, with a right-angle mark. In the second step an arc and the label theta equals 30 degrees at the lower-left corner. In the third step the captions x equals 3 sin theta and 3 times 0.5 equals 1.5 appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A right triangle with hypotenuse 3 (blue). The leg x (red) is opposite the angle θ, the other leg (green) is √(9 − x²) by Pythagoras.', objects: [ln(O, C, ROLE.output, 0.05), ln(B, C, ROLE.input, 0.05), ln(O, B, ROLE.result, 0.05), ...rightAngleMark(B[0], B[1], [-1, 0], [0, 1], 0.28, ROLE.reference), lb('3', [(O[0] + C[0]) / 2 - 0.35, (O[1] + C[1]) / 2 + 0.3], ROLE.output), lb('x', [C[0] + 0.4, (B[1] + C[1]) / 2], ROLE.input), lb('√(9 − x²)', [(O[0] + B[0]) / 2, O[1] - 0.45], ROLE.result)] },
      { narration: 'Call the angle at the left corner θ = 30° (violet arc).', objects: [curve(arcPts(O[0], O[1], 0.9, 0, TRG.deg, 12), ROLE.aid), lb('θ = 30°', [O[0] + 1.75, O[1] + 0.35], ROLE.aid)] },
      { narration: 'Then x = 3 sin θ and √(9 − x²) = 3 cos θ. At θ = 30°: x = 3 × 0.5 = 1.5 and √(9 − 1.5²) = 2.598.', objects: [lb('x = 3 sin θ', [2.4, 1.6], ROLE.input), lb('3 × 0.5 = 1.5', [2.4, 0.7], ROLE.input), lb('√(9 − x²) = 3 cos θ', [2.2, -0.2], ROLE.result)] },
    ],
  }
}

// ── 7. Power series ──────────────────────────────────────────────────────────

/** The geometric series 1 + x + x² + … = 1/(1 − x) for |x| < 1: the partial sums Pₙ(x) = 1 + x + … + xⁿ approach 1/(1 − x); at x = 0.5 they are 1.5, 1.75, 1.9375 (n = 1, 2, 4) against 2. */
export const PWS: Frame & { x0: number; x1: number } = { ox: -0.5, oy: -2.6, ux: 3.2, uy: 0.9, x0: -0.9, x1: 0.8 }
export const pwsSum = (n: number) => (x: number) => Array.from({ length: n + 1 }, (_, k) => Math.pow(x, k)).reduce((a, b) => a + b, 0)

/** KG: a power series Σcₙ(x − a)ⁿ defines a function on an interval around a, where it converges. */
export function buildPowerSeriesScene(): SceneSpec {
  return framed(raw_buildPowerSeriesScene())
}
function raw_buildPowerSeriesScene(): SceneSpec {
  const f = (x: number) => 1 / (1 - x)
  return {
    id: 'math-power-series',
    title: 'A power series and its partial sums',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a power series as a limit of polynomials. The series Σ xⁿ = 1 + x + x² + x³ + … has the partial sums Pₙ(x) = 1 + x + … + xⁿ, which are polynomials. For |x| < 1 they approach the function 1/(1 − x) (blue): the straight line P₁ = 1 + x (grey) is a rough fit, the parabola P₂ (violet) is better and P₄ (green) is already close near x = 0. At x = 0.5 the values 1.5, 1.75 and 1.9375 close in on 1/(1 − 0.5) = 2. The series converges only on the interval (−1, 1) (violet bar); at x = 1 the function blows up.',
    ariaLabel:
      'A coordinate plane with a blue curve 1 over 1 minus x rising steeply toward the right. In the first step a grey straight line, the first partial sum 1 plus x. In the second step a violet parabola and a green curve of higher degree hugging the blue curve more closely near zero. In the third step dots at x equal 0.5 on each curve at heights 1.5, 1.75, 1.94 and 2 and a violet bar along the axis from minus 1 to 1 with the caption converges for absolute x less than 1.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The function 1/(1 − x) (blue) and the first partial sum P₁ = 1 + x (grey), a straight line.', objects: [...axesOf(PWS, -1.1, 1.0, -0.4, 5.4), curveOf(PWS, f, PWS.x0, PWS.x1, ROLE.output, 70), curveOf(PWS, pwsSum(1), PWS.x0, PWS.x1, ROLE.reference, 30), lb('1/(1 − x)', [0.4, 1.3], ROLE.output), lb('n = 1', [at(PWS, -0.9, 0.1)[0] + 0.1, at(PWS, -0.9, 0.1)[1] - 0.45], ROLE.reference)] },
      { narration: 'Adding terms gives P₂ = 1 + x + x² (violet) and P₄ = 1 + x + x² + x³ + x⁴ (green): each is closer to 1/(1 − x), especially near x = 0.', objects: [curveOf(PWS, pwsSum(2), PWS.x0, PWS.x1, ROLE.aid, 40), curveOf(PWS, pwsSum(4), PWS.x0, PWS.x1, ROLE.result, 50), lb('n = 2', [at(PWS, 0.78, 1.8)[0] + 0.4, at(PWS, 0.78, 1.8)[1] - 0.4], ROLE.aid), lb('n = 4', [at(PWS, 0.8, 3.0)[0] + 0.6, at(PWS, 0.8, 3.0)[1] - 0.6], ROLE.result)] },
      { narration: 'At x = 0.5 the partial sums are 1.5, 1.75, 1.9375 against 1/(1 − 0.5) = 2. The series converges for |x| < 1 (violet bar).', objects: [...[1.5, 1.75, 1.9375, 2].map((v, i) => dotAt(PWS, 0.5, v, [ROLE.reference, ROLE.aid, ROLE.result, ROLE.output][i], 0.08)), lineAt(PWS, [-1, 0], [1, 0], ROLE.aid, 0.07), lb('|x| < 1', [at(PWS, 0, 0)[0], at(PWS, 0, 0)[1] - 0.5], ROLE.aid), lb('at x = 0.5: 1.5, 1.75, 1.94, 2', [1.0, 2.6], ROLE.ink)] },
    ],
  }
}

// ── 8. Radius of convergence ─────────────────────────────────────────────────

/** Σ xⁿ/2ⁿ: the ratio of successive coefficients is cₙ₊₁/cₙ = 1/2, so R = 1 ÷ (1/2) = 2: it converges for |x| < 2 and diverges for |x| > 2. */
export const ROC = { y: 0.0, ux: 0.8, R: 2, reach: 5 }
export const rocX = (x: number): Pt => [x * ROC.ux, ROC.y]

/** KG: R is the radius with absolute convergence for |x − a| < R and divergence for |x − a| > R, found by the ratio or root test. */
export function buildRadiusOfConvergenceScene(): SceneSpec {
  return framed(raw_buildRadiusOfConvergenceScene())
}
function raw_buildRadiusOfConvergenceScene(): SceneSpec {
  return {
    id: 'math-radius-of-convergence',
    title: 'The radius of convergence',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how the radius of convergence is found and what it means. For the power series Σ xⁿ/2ⁿ the coefficients cₙ = 1/2ⁿ have the ratio cₙ₊₁/cₙ = 1/2 = 0.5, so by the ratio test the series converges when |x| · 0.5 < 1, i.e. |x| < 1 ÷ 0.5 = 2. The radius is R = 2: on the number line the series converges absolutely inside the interval (−2, 2) (green, centred at a = 0, radius R) and diverges outside it (red). At the two endpoints x = ±2 the ratio test says nothing, so they have to be checked separately.',
    ariaLabel:
      'A number line from minus 5 to 5 with a dot at the centre 0. In the first step the series sum of x to the n over 2 to the n and the label a equals 0. In the second step the ratio of successive coefficients equals 0.5 and 1 divided by 0.5 equals 2. In the third step a green bar from minus 2 to 2, red bars beyond them, a double-headed radius arrow from the centre to 2 labelled R equals 2, and the labels converges and diverges.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The power series Σ xⁿ/2ⁿ, centred at a = 0, on the number line.', objects: [ar(rocX(-ROC.reach), rocX(ROC.reach)), ar(rocX(ROC.reach), rocX(-ROC.reach)), dt(rocX(0), ROLE.ink, 0.14), lb('a = 0', [0, -0.7]), lb('Σ xⁿ/2ⁿ', [-3.0, 3.0], ROLE.output), ...[-4, -2, 2, 4].map((x) => lb(String(x).replace('-', '−'), [rocX(x)[0], -0.45]))] },
      { narration: 'The ratio of coefficients cₙ₊₁/cₙ = 1/2 = 0.5, so the series converges when |x| × 0.5 < 1: the radius is R = 1 ÷ 0.5 = 2.', objects: [lb('cₙ₊₁/cₙ = 0.5', [2.6, 3.0], ROLE.aid), lb('1 ÷ 0.5 = 2', [2.6, 2.1], ROLE.aid)] },
      { narration: 'Inside (−2, 2) it converges (green); outside it diverges (red). At x = ±2 the ratio test is silent. R = 2 is the distance from the centre to the edge.', objects: [ln(rocX(-ROC.R), rocX(ROC.R), ROLE.result, 0.08), ln(rocX(ROC.R), rocX(ROC.reach - 0.2), ROLE.input, 0.08), ln(rocX(-ROC.R), rocX(-ROC.reach + 0.2), ROLE.input, 0.08), dt(rocX(ROC.R), ROLE.aid, 0.13), dt(rocX(-ROC.R), ROLE.aid, 0.13), ar([0, 0.9], [rocX(ROC.R)[0], 0.9], ROLE.aid), lb('R = 2', [rocX(1)[0], 1.35], ROLE.aid), lb('converges', [0, -1.6], ROLE.result), lb('diverges', [rocX(3.7)[0], -1.6], ROLE.input), lb('diverges', [rocX(-3.7)[0], -1.6], ROLE.input)] },
    ],
  }
}

// ── 9. Taylor remainder ──────────────────────────────────────────────────────

/** sin x ≈ x − x³/6 (P₃): the error Rₓ = sin x − P₃(x) stays under the bound M|x|⁴/4! = x⁴/24 (M = 1 because |sin| ≤ 1); at x = 1 the error is 0.0081 and the bound 0.0417. */
export const TYR: Frame = { ox: -3.4, oy: -2.4, ux: 2.6, uy: 40 }
export const tyrErr = (x: number) => Math.sin(x) - (x - (x * x * x) / 6)
export const tyrBound = (x: number) => Math.pow(x, 4) / 24

/** KG: |Rₙ(x)| ≤ M|x − a|^(n+1)/(n+1)!, where M bounds |f^(n+1)| between a and x. */
export function buildTaylorRemainderScene(): SceneSpec {
  return framed(raw_buildTaylorRemainderScene())
}
function raw_buildTaylorRemainderScene(): SceneSpec {
  return {
    id: 'math-taylor-remainder',
    title: 'The Taylor remainder is bounded',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the Taylor error bound on sin x ≈ x − x³/6 (the 3rd-degree Taylor polynomial at 0). The true error E(x) = sin x − (x − x³/6) (green) is tiny: 0.0081 at x = 1. The error bound |R₃(x)| ≤ M|x|⁴/4! uses M ≥ |f⁽⁴⁾|; since f⁽⁴⁾ = sin x and |sin| ≤ 1 we may take M = 1, giving the bound x⁴/24 (red), which is 0.0417 at x = 1. The green curve stays under the red one everywhere — the bound is safe, and shows how the error shrinks as x⁴ near 0.',
    ariaLabel:
      'A coordinate plane for x from 0 to 1.2 with a red curve rising like x to the fourth over 24 and, below it, a green curve rising even more slowly. In the second step vertical dots at x equal 1 on both curves, a green one at 0.0081 and a red one at 0.0417. In the third step the caption absolute error at most x to the fourth over 24 and the numbers 0.008 is at most 0.042 appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The bound x⁴/24 (red) from M|x|⁴/4! with M = 1 (because |f⁽⁴⁾| = |sin x| ≤ 1).', objects: [...axesOf(TYR, -0.1, 1.35, -0.02, 0.11), curveOf(TYR, tyrBound, 0, 1.2, ROLE.input, 48), lb('bound x⁴/24', [at(TYR, 1.05, 0.0518)[0] - 1.1, at(TYR, 1.05, 0.0518)[1] + 0.8], ROLE.input)] },
      { narration: 'The true error sin x − (x − x³/6) (green) is smaller still. At x = 1 the error is 0.0081 and the bound is 0.0417.', objects: [curveOf(TYR, tyrErr, 0, 1.2, ROLE.result, 48), dotAt(TYR, 1, tyrErr(1), ROLE.result, 0.1), dotAt(TYR, 1, tyrBound(1), ROLE.input, 0.1), lb('true error', [-3.1, -2.85], ROLE.result)] },
      { narration: 'Error ≤ bound: 0.008 ≤ 0.042 at x = 1, and the same everywhere on the interval. This is how a Taylor polynomial’s accuracy is controlled in advance.', objects: [lb('0.008', [at(TYR, 1, tyrErr(1))[0], -2.85], ROLE.result), lb('0.042', [at(TYR, 1, tyrBound(1))[0] - 0.6, at(TYR, 1, tyrBound(1))[1] + 0.3], ROLE.input), lb('|error| ≤ x⁴/24', [-2.4, 1.6], ROLE.ink)] },
    ],
  }
}

// ── 10. Multivariable chain rule ─────────────────────────────────────────────

/** z = x²y with x = t, y = t²: at t = 1 (x = y = 1) ∂z/∂x = 2xy = 2, ∂z/∂y = x² = 1, dx/dt = 1, dy/dt = 2t = 2, so dz/dt = 2 × 1 + 1 × 2 = 2 + 2 = 4 = d(t⁴)/dt. */
export const MCR = { z: [0, 2.6] as Pt, x: [-2.2, 0.6] as Pt, y: [2.2, 0.6] as Pt, t: [0, -1.6] as Pt, branch: { zx: 2, zy: 1, xt: 1, yt: 2 } }

/** KG: dz/dt = ∂z/∂x · dx/dt + ∂z/∂y · dy/dt, read off a tree of partial derivatives. */
export function buildChainRuleMultivariableScene(): SceneSpec {
  return framed(raw_buildChainRuleMultivariableScene())
}
function raw_buildChainRuleMultivariableScene(): SceneSpec {
  const { z, x, y, t, branch } = MCR
  const mid = (a: Pt, b: Pt, dx: number, dy: number): Pt => [(a[0] + b[0]) / 2 + dx, (a[1] + b[1]) / 2 + dy]
  const shorten = (a: Pt, b: Pt, d: number): [Pt, Pt] => { const L = Math.hypot(b[0] - a[0], b[1] - a[1]), ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L; return [[a[0] + d * ux, a[1] + d * uy], [b[0] - d * ux, b[1] - d * uy]] }
  const edge = (a: Pt, b: Pt, color: string) => { const [p, q] = shorten(a, b, 0.4); return ln(p, q, color, 0.05) }
  return {
    id: 'math-chain-rule-multivariable',
    title: 'The multivariable chain rule: a tree of paths',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the chain rule for z = f(x, y) with x and y both depending on t, as a tree. Take z = x²y with x = t and y = t², and evaluate at t = 1 (so x = 1 and y = 1). There are two paths from z down to t: through x (blue) and through y (red). Along each path multiply the derivatives on its branches: ∂z/∂x = 2xy = 2 and dx/dt = 1 give 2 × 1 = 2; ∂z/∂y = x² = 1 and dy/dt = 2t = 2 give 1 × 2 = 2. Add the paths: dz/dt = 2 + 2 = 4. Check directly: z = t · t · ... = t⁴, so dz/dt = 4t³ = 4 at t = 1.',
    ariaLabel:
      'A tree diagram: z at the top with two branches down to x on the left and y on the right, and from each of them a branch down to t at the bottom. The branch numbers are 2 and 1 from z, and 1 and 2 to t. In the first step the tree with the captions z equals x squared y and x equals t, y equals t squared. In the second step the left path in blue and the right path in red with the products 2 times 1 equals 2 and 1 times 2 equals 2. In the third step the sum 2 plus 2 equals 4 and the check that the derivative of t to the fourth is 4.',
    stage: NO_STAGE,
    steps: [
      { narration: 'z = x²y, with x = t and y = t². The branches carry the derivatives at t = 1: ∂z/∂x = 2, ∂z/∂y = 1, dx/dt = 1, dy/dt = 2.', objects: [lb('z', z), lb('x', x), lb('y', y), lb('t', t), ln(...shorten(z, x, 0.4), ROLE.reference, 0.04), ln(...shorten(z, y, 0.4), ROLE.reference, 0.04), ln(...shorten(x, t, 0.4), ROLE.reference, 0.04), ln(...shorten(y, t, 0.4), ROLE.reference, 0.04), lb(String(branch.zx), mid(z, x, -0.45, 0.2)), lb(String(branch.zy), mid(z, y, 0.45, 0.2)), lb(String(branch.xt), mid(x, t, -0.45, -0.2)), lb(String(branch.yt), mid(y, t, 0.45, -0.2)), lb('z = x²y', [-3.6, 2.6], ROLE.ink), lb('x = t, y = t²', [-3.5, 1.7], ROLE.ink)] },
      { narration: 'Multiply along each path: through x (blue) 2 × 1 = 2; through y (red) 1 × 2 = 2.', objects: [edge(z, x, ROLE.output), edge(x, t, ROLE.output), edge(z, y, ROLE.input), edge(y, t, ROLE.input), lb('2 × 1 = 2', [-3.4, -0.5], ROLE.output), lb('1 × 2 = 2', [3.4, -0.5], ROLE.input)] },
      { narration: 'Add the paths: dz/dt = 2 + 2 = 4. Direct check: z = t⁴, so dz/dt = 4t³ = 4 at t = 1.', objects: [lb('2 + 2 = 4', [0, -2.6], ROLE.result), lb('d(t⁴)/dt = 4', [3.3, -2.6], ROLE.result)] },
    ],
  }
}

// ── 11. Limits of sequences (the squeeze theorem) ────────────────────────────

/** aₙ = sin(n)/n is squeezed between −1/n and 1/n, both → 0, so aₙ → 0. */
export const SQZ: Frame & { n1: number } = { ox: -3.6, oy: 0.0, ux: 0.55, uy: 2.2, n1: 12 }
export const sqzTerm = (n: number) => Math.sin(n) / n

/** KG: sequence limits are computed with the limit laws, l'Hôpital's rule and the squeeze theorem. */
export function buildSequenceLimitsScene(): SceneSpec {
  return framed(raw_buildSequenceLimitsScene())
}
function raw_buildSequenceLimitsScene(): SceneSpec {
  const terms = Array.from({ length: SQZ.n1 }, (_, i) => i + 1)
  return {
    id: 'math-sequence-limits',
    title: 'The squeeze theorem for sequences',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the squeeze theorem on the sequence aₙ = sin(n)/n, whose limit is not obvious because sin n keeps oscillating. Since −1 ≤ sin n ≤ 1, we have −1/n ≤ sin(n)/n ≤ 1/n for every n ≥ 1: the terms (blue dots) stay between the two curves ±1/n (green above, red below). Both bounds tend to 0, so the terms trapped between them tend to 0 as well: lim sin(n)/n = 0 (violet line).',
    ariaLabel:
      'A plot of the terms for n from 1 to 12: blue dots swinging above and below the horizontal axis with shrinking amplitude. In the second step a green curve 1 over n above and a red curve minus 1 over n below, forming a funnel that closes in on the axis, with every dot inside it. In the third step a violet horizontal line at 0 labelled limit 0 and the caption minus 1 over n at most sine n over n at most 1 over n.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The terms aₙ = sin(n)/n for n = 1…12 (blue dots): they oscillate but seem to shrink.', objects: [...axesOf(SQZ, -0.4, 13.2, -1.2, 1.2), lb('y', [-3.95, 2.6]), ...terms.map((n) => dotAt(SQZ, n, sqzTerm(n), ROLE.output, 0.11)), ...[1, 4, 8, 12].map((n) => lb(String(n), [at(SQZ, n, 0)[0], 1.1])), lb('aₙ = sin(n)/n', [-0.5, 2.9], ROLE.output)] },
      { narration: 'Squeeze: −1/n ≤ sin(n)/n ≤ 1/n because −1 ≤ sin n ≤ 1. The bounds 1/n (green) and −1/n (red) close in on 0, with every dot between them.', objects: [curveOf(SQZ, (n) => 1 / n, 1, SQZ.n1, ROLE.result, 44), curveOf(SQZ, (n) => -1 / n, 1, SQZ.n1, ROLE.input, 44)] },
      { narration: 'Both bounds tend to 0, so the sequence squeezed between them tends to 0 too: lim sin(n)/n = 0.', objects: [lineAt(SQZ, [0.4, 0], [SQZ.n1 + 0.6, 0], ROLE.aid, 0.04), lb('limit 0', [at(SQZ, SQZ.n1, 0)[0] + 0.4, -1.2], ROLE.aid), lb('−1/n ≤ sin(n)/n ≤ 1/n', [0.6, -2.9], ROLE.ink)] },
    ],
  }
}
