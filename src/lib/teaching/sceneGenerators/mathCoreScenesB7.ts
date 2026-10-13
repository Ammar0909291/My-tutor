/**
 * Core school-mathematics figures — batch 7 of the mathematics visual campaign
 * (2026-10-11): single-variable calculus, part 2.
 *
 * The mean value theorem, related rates, linearization, the definite integral as
 * signed area, the two halves of the fundamental theorem of calculus, an improper
 * integral that converges, area between curves, arc length, Taylor polynomials,
 * parametric curves and a Fourier partial sum. Same rules as batches 1-6: one
 * visual language from visualDesign.ts, labels are names not sentences (marks of 1-2
 * characters are free), steps are cumulative, coordinates stay inside +-5, at most 50
 * objects per step, nothing the figure audit rejects (no label with the word
 * "undefined", no zero-length segment), and every number drawn comes from the
 * constants and pure helpers exported here, which the test file re-derives
 * independently from the DRAWN coordinates.
 *
 * Colour roles keep their meaning: red is the input / the given, blue is what is
 * produced or compared, green is the result, violet is a construction aid (tangents,
 * secants, guides), slate is axes and inert reference geometry.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, sampleMapped, guide, mathAxes, rightAngleMark, type V3 } from './mathSceneKit'

const r3 = (n: number) => Math.round(n * 1000) / 1000
const num = (n: number) => String(r3(n))

/** Vertical hatch lines between g(x) (lower) and f(x) (upper) at x = x0 + step/2, x0 + 3 step/2, ... < x1. */
export function vHatch(S: (x: number, y: number) => V3, f: (x: number) => number, g: (x: number) => number, x0: number, x1: number, step: number, color: string, t = 0.022): SceneObject[] {
  const out: SceneObject[] = []
  for (let x = x0 + step / 2; x < x1; x += step) {
    const a = g(x), b = f(x)
    if (Math.abs(b - a) > 1e-9) out.push(line(S(x, a), S(x, b), color, t))
  }
  return out
}
/** Midpoint-rule area of the strips vHatch draws, for the tests. */
export function hatchArea(f: (x: number) => number, g: (x: number) => number, x0: number, x1: number, step: number): number {
  let s = 0
  for (let x = x0 + step / 2; x < x1; x += step) s += (f(x) - g(x)) * step
  return s
}

// ── 1. Mean value theorem ────────────────────────────────────────────────────

/** f(x) = x²/4 on [1, 5]: the secant slope is 1.5 and f'(3) = 1.5, so c = 3. */
export const MVT = { u: 0.6, ox: -1.65, oy: -2.3, a: 1, b: 5, c: 3 } as const
export const mvtF = (x: number) => (x * x) / 4
export const mvtFp = (x: number) => x / 2

/** KG: on [a, b] some point c has f′(c) equal to the average slope (f(b) − f(a))/(b − a). */
export function buildMeanValueTheoremScene(): SceneSpec {
  return framed(raw_buildMeanValueTheoremScene())
}
function raw_buildMeanValueTheoremScene(): SceneSpec {
  const { u, ox, oy, a, b, c } = MVT
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  const m = (mvtF(b) - mvtF(a)) / (b - a)
  const ext = 1.1
  return {
    id: 'math-mean-value-theorem',
    title: 'Mean value theorem: some tangent is parallel to the secant',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that for a smooth curve between a and b there is a point c where the tangent is parallel to the secant joining the endpoints, so the instantaneous slope equals the average slope.',
    ariaLabel:
      'The curve y equals x squared over 4 from x equal to 1 to x equal to 5. The secant line through the endpoints (1, 0.25) and (5, 6.25) has slope 1.5, the average rate of change. At c equal to 3 the tangent has slope 1.5 as well: it is parallel to the secant.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The curve y = x²/4 between a = 1 and b = 5. The average slope is the slope of the secant joining the endpoints: (6.25 − 0.25) ÷ 4 = 1.5.', objects: [...mathAxes(S, -0.6, 6.0, -0.8, 8.2), curve(sampleMapped(mvtF, 0.4, 5.5, S, 56), ROLE.ink), line(S(a - ext, mvtF(a) - m * ext), S(b + ext, mvtF(b) + m * ext), ROLE.output, 0.04), dot(S(a, mvtF(a)), ROLE.input, 0.13), dot(S(b, mvtF(b)), ROLE.input, 0.13), label('a', S(a, -0.9), ROLE.input, 'primary'), label('b', S(b, -0.9), ROLE.input, 'primary'), label('average slope 1.5', S(2.6, 6.6), ROLE.output, 'primary')] },
      { narration: 'Slide a tangent line along the curve from a to b. Its slope starts below 1.5 and ends above it, so somewhere it must equal 1.5 exactly.', objects: [line(S(c - ext, mvtF(c) - mvtFp(c) * ext), S(c + ext, mvtF(c) + mvtFp(c) * ext), ROLE.aid, 0.05), dot(S(c, mvtF(c)), ROLE.result, 0.15), label('c', S(c, -0.9), ROLE.result, 'primary')] },
      { narration: 'At c = 3 the tangent has slope f′(3) = 3/2 = 1.5, parallel to the secant. The mean value theorem: there is a c between a and b with f′(c) = (f(b) − f(a)) ÷ (b − a).', objects: [guide(S(c, 0), S(c, mvtF(c)), ROLE.result, 0.025), label('f′(c) = 1.5 at c = 3', S(4.6, 1.9), ROLE.result, 'primary'), label('parallel', S(1.4, 3.0), ROLE.aid, 'detail')] },
    ],
  }
}

// ── 2. Related rates ─────────────────────────────────────────────────────────

/** A 5-long ladder, base x = 3 sliding out at dx/dt = 1, so the top is at y = 4 and falls at dy/dt = -3/4. */
export const RELR = { u: 0.62, ox: -1.2, oy: -1.5, L: 5, x: 3, dxdt: 1 } as const
export const ladderY = (x: number, L: number = RELR.L) => Math.sqrt(L * L - x * x)
export const ladderDydt = (x: number, dxdt: number, L: number = RELR.L) => -(x / ladderY(x, L)) * dxdt

/** KG: related rates: differentiate the relation between changing quantities and solve for the unknown rate. */
export function buildRelatedRatesScene(): SceneSpec {
  return framed(raw_buildRelatedRatesScene())
}
function raw_buildRelatedRatesScene(): SceneSpec {
  const { u, ox, oy, L, x, dxdt } = RELR
  const y = ladderY(x), dydt = ladderDydt(x, dxdt)
  const S = (px: number, py: number): V3 => P(px * u + ox, py * u + oy)
  return {
    id: 'math-related-rates',
    title: 'Related rates: a sliding ladder',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that when quantities are tied by an equation, their rates are tied too: for a ladder of length 5 with x² + y² = 25, differentiating gives x dx/dt + y dy/dt = 0, so when the base slides out at 1 the top falls at 3/4.',
    ariaLabel:
      'A ladder of length 5 leaning on a wall, its foot 3 from the wall and its top 4 up the wall, so x squared plus y squared equals 25. The foot slides away at 1 unit per second. Differentiating, x times dx by dt plus y times dy by dt equals 0, so dy by dt equals minus 3 over 4: the top slides down at three quarters of a unit per second.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A ladder of length 5 leans on a wall. Its foot is x = 3 from the wall, so the top is y = 4 up it, because x² + y² = 25.', objects: [line(S(0, 0), S(6.4, 0), ROLE.reference, 0.04), line(S(0, 0), S(0, 6.0), ROLE.reference, 0.04), line(S(x, 0), S(0, y), ROLE.ink, 0.07), line(S(x, 0), S(0, 0), ROLE.output, 0.05), line(S(0, 0), S(0, y), ROLE.input, 0.05), ...rightAngleMark(ox, oy, [1, 0], [0, 1], 0.28, ROLE.reference), label('x = 3', S(x / 2, -0.6), ROLE.output, 'primary'), label('y = 4', S(-1.2, y / 2), ROLE.input, 'primary'), label('x² + y² = 25', S(4.2, 4.6), ROLE.ink, 'primary')] },
      { narration: 'The foot slides away from the wall at dx/dt = 1 per second. Both x and y change with time but stay linked by x² + y² = 25. Differentiate both sides with respect to time: 2x dx/dt + 2y dy/dt = 0.', objects: [arrow(S(x, 0.45), S(x + dxdt * 1.4, 0.45), ROLE.aid), label('dx/dt = 1', S(x + 1.5, 1.1), ROLE.aid, 'primary'), label('x dx/dt + y dy/dt = 0', S(4.2, 3.6), ROLE.aid, 'detail')] },
      { narration: 'Put in x = 3, y = 4, dx/dt = 1: 3 · 1 + 4 · dy/dt = 0, so dy/dt = −3/4. The top is sliding down the wall at 3/4 per second: slower than the foot moves out, because the ladder is steep.', objects: [arrow(S(0.4, y), S(0.4, y + dydt * 1.4), ROLE.result), label('dy/dt = \u22123/4', S(1.7, y + 0.5), ROLE.result, 'primary'), label(`3 · 1 + 4 · dy/dt = 0`, S(4.2, 2.7), ROLE.result, 'detail')] },
    ],
  }
}

// ── 3. Linearization ─────────────────────────────────────────────────────────

/** f(x) = sqrt(x) at a = 4: L(x) = 2 + (x - 4)/4. */
export const LINR = { u: 0.85, ox: -3.23, oy: -1.2, a: 4, near: 4.4, far: 1 } as const
export const linF = (x: number) => Math.sqrt(x)
export const linL = (x: number) => 2 + (x - LINR.a) / 4

/** KG: L(x) = f(a) + f′(a)(x − a) approximates f near a. */
export function buildLinearizationScene(): SceneSpec {
  return framed(raw_buildLinearizationScene())
}
function raw_buildLinearizationScene(): SceneSpec {
  const { u, ox, oy, a, near, far } = LINR
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  return {
    id: 'math-linearization',
    title: 'Linearization: the tangent line as an approximation',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that near x = a a smooth curve is almost its tangent line, so f(x) ≈ L(x) = f(a) + f′(a)(x − a), accurate close to a and worse far from it.',
    ariaLabel:
      'The curve y equals the square root of x and its tangent line at x equal to 4, L of x equals 2 plus (x minus 4) over 4. At x equal to 4.4 the tangent gives 2.1 and the true value is 2.0976: an error of about 0.002. At x equal to 1 the tangent gives 1.25 but the true value is 1: an error of 0.25. The approximation is good near 4 and gets worse farther away.',
    stage: NO_STAGE,
    steps: [
      { narration: 'f(x) = √x near a = 4. At x = 4 the value is 2 and the slope is f′(4) = 1/(2√4) = 1/4. The tangent line there is L(x) = 2 + (x − 4)/4.', objects: [...mathAxes(S, -0.6, 7.8, -0.6, 3.4), curve(sampleMapped(linF, 0.3, 7.4, S, 56), ROLE.ink), line(S(0, linL(0)), S(7.4, linL(7.4)), ROLE.aid, 0.04), dot(S(a, linF(a)), ROLE.result, 0.14), label('L(x) = 2 + (x − 4)/4', S(5.4, 0.9), ROLE.aid, 'primary')] },
      { narration: 'Near 4 the curve and the tangent are almost the same line. At x = 4.4: the tangent gives 2.1, the true √4.4 is 2.0976. The error is only about 0.002.', objects: [dot(S(near, linF(near)), ROLE.output, 0.1), dot(S(near, linL(near)), ROLE.input, 0.1), label('x = 4.4: error 0.002', S(6.0, 2.95), ROLE.output, 'detail')] },
      { narration: 'Far from 4 the tangent drifts away. At x = 1 the tangent gives 1.25 but √1 = 1: an error of 0.25. A linearization is only good close to the point you built it at.', objects: [dot(S(far, linF(far)), ROLE.output, 0.1), dot(S(far, linL(far)), ROLE.input, 0.1), label('x = 1: error 0.25', S(1.8, 2.3), ROLE.input, 'detail')] },
    ],
  }
}

// ── 4. Definite integral (signed area) ───────────────────────────────────────

/** f(x) = (x − 1)(x − 3) on [0, 4]: +4/3, −4/3, +4/3. */
export const DEFI = { u: 0.8, ox: -1.6, oy: 0, step: 0.1 } as const
export const defiF = (x: number) => (x - 1) * (x - 3)
export const defiAntiderivative = (x: number) => (x ** 3) / 3 - 2 * x * x + 3 * x

/** KG: ∫ₐᵇ f(x) dx is the signed area between the curve and the x-axis: above counts positive, below negative. */
export function buildDefiniteIntegralScene(): SceneSpec {
  return framed(raw_buildDefiniteIntegralScene())
}
function raw_buildDefiniteIntegralScene(): SceneSpec {
  const { u, ox, oy, step } = DEFI
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  const zero = () => 0
  return {
    id: 'math-definite-integral',
    title: 'The definite integral: signed area',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the definite integral as signed area: regions above the x-axis count positively, regions below count negatively, and the integral is their total.',
    ariaLabel:
      'The graph of f of x equals (x minus 1)(x minus 3) from 0 to 4. The region between 0 and 1 is above the axis with area 4 over 3, counted positive. The region between 1 and 3 is below the axis with area 4 over 3, counted negative. The region between 3 and 4 is above again with area 4 over 3. The integral from 0 to 4 is 4/3 minus 4/3 plus 4/3, which is 4 over 3.',
    stage: NO_STAGE,
    steps: [
      { narration: 'f(x) = (x − 1)(x − 3), crossing the x-axis at x = 1 and x = 3. What does ∫₀⁴ f(x) dx mean?', objects: [...mathAxes(S, -0.6, 4.6, -1.4, 3.6), curve(sampleMapped(defiF, 0, 4, S, 56), ROLE.ink), label('f(x) = (x − 1)(x − 3)', S(2.2, 3.3), ROLE.ink, 'primary')] },
      { narration: 'Where the curve is above the axis the area counts as positive: from 0 to 1 and from 3 to 4. Each of these regions has area 4/3.', objects: [...vHatch(S, defiF, zero, 0, 1, step, ROLE.result), ...vHatch(S, defiF, zero, 3, 4, step, ROLE.result), label('+4/3', S(0.5, 1.4), ROLE.result, 'primary'), label('+4/3', S(3.5, 1.4), ROLE.result, 'primary')] },
      { narration: 'Where it is below the axis the area counts as negative: from 1 to 3 the region has area 4/3 and contributes −4/3. The integral is the total: 4/3 − 4/3 + 4/3 = 4/3.', objects: [...vHatch(S, zero, defiF, 1, 3, step, ROLE.input), label('−4/3', S(2, -1.6), ROLE.input, 'primary'), label('∫₀⁴ f = 4/3 − 4/3 + 4/3 = 4/3', S(2, -2.4), ROLE.aid, 'primary')] },
    ],
  }
}

// ── 5. Fundamental theorem of calculus, part 1 ───────────────────────────────

/** f(t) = t/2; A(x) = integral from 0 to x = x²/4; A'(x) = f(x). */
export const FTC1 = { u: 0.6, ox: -1.5, topOy: 1.7, botOy: -3.7, x: 3, step: 0.15 } as const
export const ftcF = (t: number) => t / 2
export const ftcA = (x: number) => (x * x) / 4

/** KG: FTC part 1: d/dx ∫ₐˣ f(t) dt = f(x). */
export function buildFtcPart1Scene(): SceneSpec {
  return framed(raw_buildFtcPart1Scene())
}
function raw_buildFtcPart1Scene(): SceneSpec {
  const { u, ox, topOy, botOy, x, step } = FTC1
  const St = (px: number, py: number): V3 => P(px * u + ox, py * u + topOy)
  const Sb = (px: number, py: number): V3 => P(px * u + ox, py * u + botOy)
  const zero = () => 0
  const slope = ftcF(x)
  return {
    id: 'math-ftc-part1',
    title: 'Fundamental theorem of calculus, part 1: A′(x) = f(x)',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that the area accumulated under f from 0 to x, A(x), grows at a rate equal to the height f(x): the slope of the area function is the height of the original function.',
    ariaLabel:
      'Top: the line f of t equals t over 2 with the triangle under it from 0 to 3 shaded: area A of 3 equals 2.25. Bottom: the area function A of x equals x squared over 4 drawn as a curve through (3, 2.25). Its tangent at x equal to 3 has slope 1.5, which equals f of 3, the height of the top graph at 3: the rate at which area is being added equals the height.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Top graph: f(t) = t/2. The area under it from 0 to x = 3 is a triangle, ½ · 3 · 1.5 = 2.25. Call the area up to x the function A(x): A(3) = 2.25.', objects: [...mathAxes(St, -0.4, 5.6, -0.4, 3.4), label('t', St(5.8, 0.3), ROLE.ink, 'primary'), line(St(0, 0), St(5.2, ftcF(5.2)), ROLE.ink, 0.06), ...vHatch(St, ftcF, zero, 0, x, step, ROLE.output), line(St(x, 0), St(x, ftcF(x)), ROLE.output, 0.04), label('f(t) = t/2', St(4.4, 3.0), ROLE.ink, 'primary'), label('A(3) = 2.25', St(1.6, -0.9), ROLE.output, 'primary')] },
      { narration: 'Bottom graph: plot A(x) for every x. Area adds up faster as f gets taller: A(x) = x²/4. The point (3, 2.25) is the area just measured.', objects: [...mathAxes(Sb, -0.4, 5.6, -0.8, 6.8), label('x', Sb(5.8, 0.4), ROLE.ink, 'primary'), curve(sampleMapped(ftcA, 0, 5.2, Sb, 52), ROLE.result), dot(Sb(x, ftcA(x)), ROLE.result, 0.14), label('A(x) = x²/4', Sb(4.4, 6.0), ROLE.result, 'primary'), guide(St(x, 0), Sb(x, ftcA(x)), ROLE.aid, 0.02)] },
      { narration: 'The slope of A at x = 3 is 1.5. That is the height of f at 3 (f(3) = 1.5): the rate at which area is being added equals the height. In general A′(x) = f(x).', objects: [line(Sb(x - 1.4, ftcA(x) - slope * 1.4), Sb(x + 1.4, ftcA(x) + slope * 1.4), ROLE.aid, 0.05), line(St(x, 0), St(x, ftcF(x)), ROLE.aid, 0.07), label('A′(3) = f(3) = 1.5', Sb(1.2, 4.6), ROLE.aid, 'primary')] },
    ],
  }
}

// ── 6. Fundamental theorem of calculus, part 2 ───────────────────────────────

/** f(x) = x on [1, 3]; F(x) = x²/2; the area is 4 = F(3) - F(1). */
export const FTC2 = { u: 0.5, centres: [-2.5, 2.5], oy: -1.2, a: 1, b: 3, step: 0.1 } as const
export const ftc2f = (x: number) => x
export const ftc2F = (x: number) => (x * x) / 2

/** KG: FTC part 2: ∫ₐᵇ f(x) dx = F(b) − F(a) for any antiderivative F. */
export function buildFtcPart2Scene(): SceneSpec {
  return framed(raw_buildFtcPart2Scene())
}
function raw_buildFtcPart2Scene(): SceneSpec {
  const { u, centres, oy, a, b, step } = FTC2
  const SL = (x: number, y: number): V3 => P(centres[0] + (x - 2) * u * 1.0, y * u + oy)
  const SR = (x: number, y: number): V3 => P(centres[1] + (x - 2) * u * 1.0, y * u + oy)
  const zero = () => 0
  const area = ftc2F(b) - ftc2F(a)
  return {
    id: 'math-ftc-part2',
    title: 'Fundamental theorem of calculus, part 2: ∫ f = F(b) − F(a)',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that the area under f from a to b equals the change in any antiderivative F between a and b, so integrals can be computed by subtraction.',
    ariaLabel:
      'Left: the line f of x equals x with the region from x equal to 1 to 3 shaded, a trapezoid of area 4. Right: an antiderivative F of x equals x squared over 2. Its heights are F of 1 equals 0.5 and F of 3 equals 4.5, and the difference 4.5 minus 0.5 is 4, exactly the area on the left.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Left: f(x) = x. The area under it from x = 1 to x = 3 is a trapezoid: heights 1 and 3, width 2, so ½ (1 + 3) · 2 = 4.', objects: [...mathAxes(SL, -0.4, 4.6, -0.5, 4.4), line(SL(0, 0), SL(4.2, 4.2), ROLE.ink, 0.06), ...vHatch(SL, ftc2f, zero, a, b, step, ROLE.output), label('f(x) = x', SL(3.4, 3.8), ROLE.ink, 'primary'), label('area = 4', SL(2, -1.2), ROLE.output, 'primary')] },
      { narration: 'Right: an antiderivative of f is F(x) = x²/2 (its derivative is x). Read off its heights at the two ends: F(1) = 0.5 and F(3) = 4.5.', objects: [...mathAxes(SR, -0.4, 4.6, -0.5, 9.4), curve(sampleMapped(ftc2F, 0, 4.2, SR, 48), ROLE.result), dot(SR(a, ftc2F(a)), ROLE.result, 0.13), dot(SR(b, ftc2F(b)), ROLE.result, 0.13), label('F(x) = x²/2', SR(1.2, 8.2), ROLE.result, 'primary')] },
      { narration: 'The gap between the two heights is F(3) − F(1) = 4.5 − 0.5 = 4, exactly the area. So ∫₁³ x dx = F(3) − F(1): to find an area, subtract an antiderivative at the two ends.', objects: [line(SR(b, ftc2F(a)), SR(b, ftc2F(b)), ROLE.aid, 0.07), guide(SR(a, ftc2F(a)), SR(b, ftc2F(a)), ROLE.aid, 0.025), label(`F(3) − F(1) = ${num(ftc2F(b))} − ${num(ftc2F(a))} = ${area}`, SR(2.2, -1.6), ROLE.aid, 'primary')] },
    ],
  }
}

// ── 7. Improper integral ─────────────────────────────────────────────────────

/** y = 1/x² from 1 to R: area 1 - 1/R, approaching 1 as R grows. */
export const IMPI = { u: 0.8, yStretch: 3.2, ox: -2.4, oy: -1.2, step: 0.12, rs: [2, 3, 6] } as const
export const impF = (x: number) => 1 / (x * x)
export const impArea = (r: number) => 1 - 1 / r

/** KG: an integral over an unbounded interval, defined as a limit; ∫₁^∞ 1/x² dx = 1. */
export function buildImproperIntegralsScene(): SceneSpec {
  return framed(raw_buildImproperIntegralsScene())
}
function raw_buildImproperIntegralsScene(): SceneSpec {
  const { u, yStretch, ox, oy, step, rs } = IMPI
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u * yStretch + oy)
  const zero = () => 0
  const colors = [ROLE.result, ROLE.output, ROLE.aid]
  return {
    id: 'math-improper-integrals',
    title: 'Improper integral: an infinite region with finite area',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show an improper integral as a limit: the area under y = 1/x² from 1 to R is 1 − 1/R, which approaches 1 as R grows without bound, so the infinitely long region has finite area 1.',
    ariaLabel:
      'The curve y equals 1 over x squared for x at least 1, drawn with the vertical scale stretched. The area under it from 1 to 2 is 0.5, from 1 to 3 is 0.667, from 1 to 6 is 0.833. In general the area from 1 to R is 1 minus 1 over R, which approaches 1: the region going on forever has area exactly 1.',
    stage: NO_STAGE,
    steps: [
      { narration: 'y = 1/x² for x ≥ 1 stretches out forever. Its region never ends. Can it have a finite area? Start with the area up to R = 2: it is 1 − 1/2 = 0.5.', objects: [...mathAxes(S, -0.4, 6.8, -0.2, 1.45), label('y', S(0.3, 1.5), ROLE.ink, 'primary'), curve(sampleMapped(impF, 0.8, 6.6, S, 56), ROLE.ink), ...vHatch(S, impF, zero, 1, rs[0], step, colors[0]), label('1 to 2: area 0.5', S(3.4, 1.0), colors[0], 'primary')] },
      { narration: 'Out to R = 3 the area is 1 − 1/3 ≈ 0.667. Each time the region is stretched further, the extra area added is smaller and smaller.', objects: [...vHatch(S, impF, zero, rs[0], rs[1], step, colors[1]), label('1 to 3: area 0.667', S(4.0, 0.78), colors[1], 'primary')] },
      { narration: 'Out to R = 6 the area is 1 − 1/6 ≈ 0.833. The area up to R is 1 − 1/R, which closes in on 1 as R → ∞. So ∫₁^∞ 1/x² dx = 1: an infinitely long region with a finite area.', objects: [...vHatch(S, impF, zero, rs[1], rs[2], step, colors[2]), label('1 to 6: area 0.833', S(4.4, 0.56), colors[2], 'primary'), label('area up to R = 1 − 1/R → 1', S(3.6, 1.28), ROLE.result, 'primary')] },
    ],
  }
}

// ── 8. Area between curves ───────────────────────────────────────────────────

/** y = x (top) and y = x² (bottom) between their crossings at 0 and 1: area 1/6. */
export const BETW = { u: 3.4, ox: -1.7, oy: -1.7, step: 0.1 } as const
export const betTop = (x: number) => x
export const betBottom = (x: number) => x * x

/** KG: area between curves = ∫ (top − bottom) dx. */
export function buildIntegralAreaScene(): SceneSpec {
  return framed(raw_buildIntegralAreaScene())
}
function raw_buildIntegralAreaScene(): SceneSpec {
  const { u, ox, oy, step } = BETW
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  return {
    id: 'math-integral-area',
    title: 'Area between curves: ∫ (top − bottom) dx',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the area between two curves as a sum of thin strips whose heights are top minus bottom, giving the integral of (top − bottom) between the crossing points.',
    ariaLabel:
      'The line y equals x and the parabola y equals x squared cross at (0, 0) and (1, 1); between them the line is on top. Thin vertical strips of height x minus x squared fill the region. Adding them as an integral from 0 to 1 gives one half minus one third, which is one sixth.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The line y = x and the parabola y = x² meet at (0, 0) and (1, 1). Between those points the line is on top. What is the area of the region between them?', objects: [...mathAxes(S, -0.1, 1.2, -0.1, 1.2), curve(sampleMapped(betTop, 0, 1.12, S, 20), ROLE.output), curve(sampleMapped(betBottom, 0, 1.08, S, 40), ROLE.input), dot(S(0, 0), ROLE.result, 0.1), dot(S(1, 1), ROLE.result, 0.1), label('y = x', S(1.12, 1.02), ROLE.output, 'primary'), label('y = x²', S(1.05, 0.7), ROLE.input, 'primary')] },
      { narration: 'Slice the region into thin vertical strips. A strip at x runs from the bottom curve up to the top curve, so its height is top − bottom = x − x².', objects: [...vHatch(S, betTop, betBottom, 0, 1, step, ROLE.result, 0.035), label('strip height = x − x²', S(0.62, 0.15), ROLE.result, 'detail')] },
      { narration: 'Add up all the strips: area = ∫₀¹ (x − x²) dx = [x²/2 − x³/3]₀¹ = 1/2 − 1/3 = 1/6.', objects: [label('area = ∫₀¹ (x − x²) dx = 1/2 − 1/3 = 1/6', S(0.5, -0.17), ROLE.result, 'primary')] },
    ],
  }
}

// ── 9. Arc length ────────────────────────────────────────────────────────────

/** y = x²/4 on [0, 4], approximated by chords: n = 2, 4, 8. Exact length 2·sqrt(5) + asinh(2). */
export const ARC = { u: 0.8, ox: -1.6, oy: -1.6, a: 0, b: 4, ns: [2, 4, 8] } as const
export const arcF = (x: number) => (x * x) / 4
export const chordLength = (n: number) => {
  const dx = (ARC.b - ARC.a) / n
  let s = 0
  for (let i = 0; i < n; i++) s += Math.hypot(dx, arcF(ARC.a + (i + 1) * dx) - arcF(ARC.a + i * dx))
  return s
}
export const exactArcLength = () => 2 * Math.sqrt(5) + Math.asinh(2)

/** KG: arc length as the limit of polyline lengths, L = ∫ sqrt(1 + f′(x)²) dx. */
export function buildArcLengthScene(): SceneSpec {
  return framed(raw_buildArcLengthScene())
}
function raw_buildArcLengthScene(): SceneSpec {
  const { u, ox, oy, a, b, ns } = ARC
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  const chords = (n: number, color: string, t: number): SceneObject[] => {
    const dx = (b - a) / n, out: SceneObject[] = []
    for (let i = 0; i < n; i++) out.push(line(S(a + i * dx, arcF(a + i * dx)), S(a + (i + 1) * dx, arcF(a + (i + 1) * dx)), color, t))
    return out
  }
  return {
    id: 'math-arc-length',
    title: 'Arc length: measuring a curve with short straight pieces',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the length of a curve as the limit of the total length of straight chords joining points along it: more, shorter chords give a better and better estimate.',
    ariaLabel:
      'The curve y equals x squared over 4 from 0 to 4, approximated by straight chords. Two chords give a total length of 5.84, four chords 5.90, and eight chords 5.91. The exact length is about 5.92. The more chords, the closer the total gets, from below.',
    stage: NO_STAGE,
    steps: [
      { narration: 'How long is the curve y = x²/4 from x = 0 to x = 4? A ruler measures straight lines, so approximate the curve with chords. Two chords: √5 + √13 ≈ 5.84.', objects: [...mathAxes(S, -0.4, 4.6, -0.4, 4.6), curve(sampleMapped(arcF, a, b, S, 48), ROLE.ink), ...chords(ns[0], ROLE.input, 0.05), label(`2 chords: ${chordLength(ns[0]).toFixed(2)}`, S(0.2, 3.9), ROLE.input, 'primary')] },
      { narration: 'Four chords hug the curve more closely: total ≈ 5.90. A chord is always shorter than the arc it cuts across, so every estimate is a little too small.', objects: [...chords(ns[1], ROLE.output, 0.04), label(`4 chords: ${chordLength(ns[1]).toFixed(2)}`, S(0.2, 3.2), ROLE.output, 'primary')] },
      { narration: 'Eight chords: ≈ 5.91. As the chords get shorter and more numerous, the total creeps up towards the true length, 2√5 + sinh⁻¹(2) ≈ 5.92. That limit is the arc length.', objects: [...chords(ns[2], ROLE.result, 0.03), label(`8 chords: ${chordLength(ns[2]).toFixed(2)}`, S(0.2, 2.5), ROLE.result, 'primary'), label(`exact length ≈ ${exactArcLength().toFixed(2)}`, S(0.4, 1.8), ROLE.aid, 'primary')] },
    ],
  }
}

// ── 10. Taylor series ────────────────────────────────────────────────────────

export const TAY = { u: 0.7, ox: 0, oy: 0 } as const
export const taylorSin = (x: number, degree: 1 | 3 | 5) => (degree === 1 ? x : degree === 3 ? x - (x ** 3) / 6 : x - (x ** 3) / 6 + (x ** 5) / 120)

/** KG: a function is approximated near a point by its Taylor polynomial; sin x = x − x³/3! + x⁵/5! − … */
export function buildTaylorSeriesScene(): SceneSpec {
  return framed(raw_buildTaylorSeriesScene())
}
function raw_buildTaylorSeriesScene(): SceneSpec {
  const { u, ox, oy } = TAY
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  const clipped = (degree: 1 | 3 | 5, lim: number) => curve(sampleMapped((x) => taylorSin(x, degree), -lim, lim, S, 56), degree === 1 ? ROLE.input : degree === 3 ? ROLE.output : ROLE.result)
  return {
    id: 'math-taylor-series',
    title: 'Taylor series: sin x built from powers of x',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that adding more terms of the Taylor series of sin x about 0 gives polynomials that follow sin x over a longer and longer stretch.',
    ariaLabel:
      'The curve y equals sin x. The first Taylor polynomial, the line y equals x, follows it only very near 0. Adding a term gives x minus x cubed over 6, which follows it further. Adding another gives x minus x cubed over 6 plus x to the fifth over 120, which stays on top of sin x almost out to x equal to 3 or more.',
    stage: NO_STAGE,
    steps: [
      { narration: 'y = sin x. A polynomial can imitate it near x = 0. The simplest is a straight line: sin x ≈ x.', objects: [...mathAxes(S, -4.4, 4.4, -2.2, 2.2), curve(sampleMapped(Math.sin, -4, 4, S, 72), ROLE.ink), clipped(1, 2.1), label('sin x', S(3.4, 0.8), ROLE.ink, 'primary'), label('x', S(2.35, 2.05), ROLE.input, 'primary')] },
      { narration: 'Add a term: sin x ≈ x − x³/6. It hugs the sine curve over a wider stretch before bending away.', objects: [clipped(3, 3.0), label('x − x³/6', S(-3.1, -1.9), ROLE.output, 'primary')] },
      { narration: 'Add another: sin x ≈ x − x³/6 + x⁵/120. Now it sits on top of sin x almost out to x = 3 and beyond. Each extra term extends the stretch where the polynomial is a good copy: that is a Taylor series.', objects: [clipped(5, 4.0), label('x − x³/6 + x⁵/120', S(-0.6, 2.0), ROLE.result, 'primary')] },
    ],
  }
}

// ── 11. Parametric curves ────────────────────────────────────────────────────

/** x = 3 cos t, y = 2 sin t: an ellipse traced counter-clockwise as t runs from 0 to 2π. */
export const PARAM = { u: 0.9, a: 3, b: 2 } as const
export const paramPoint = (t: number): [number, number] => [PARAM.a * Math.cos(t), PARAM.b * Math.sin(t)]

/** KG: a curve given by x = x(t), y = y(t); t is the parameter. */
export function buildParametricCurvesScene(): SceneSpec {
  return framed(raw_buildParametricCurvesScene())
}
function raw_buildParametricCurvesScene(): SceneSpec {
  const { u } = PARAM
  const S = (x: number, y: number): V3 => P(x * u, y * u)
  const marks: Array<[number, string]> = [[0, 't = 0'], [Math.PI / 2, 't = π/2'], [Math.PI, 't = π'], [(3 * Math.PI) / 2, 't = 3π/2']]
  const off: Array<[number, number]> = [[0.95, 0.15], [0.0, 0.5], [-0.95, 0.15], [0.0, -0.5]]
  const pts = marks.map(([t]) => paramPoint(t))
  const arc = (t0: number, t1: number) => curve(Array.from({ length: 24 }, (_, i) => { const [x, y] = paramPoint(t0 + ((t1 - t0) * i) / 23); return S(x, y) }), ROLE.aid)
  return {
    id: 'math-parametric-curves',
    title: 'Parametric curves: x(t) and y(t) trace a path',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a parametric curve as the path traced by the point (x(t), y(t)) as the parameter t increases, here the ellipse x = 3 cos t, y = 2 sin t, and that eliminating t gives its ordinary equation.',
    ariaLabel:
      'The ellipse given by x equals 3 cos t and y equals 2 sin t. As t runs from 0 the point starts at (3, 0), reaches (0, 2) at t equal to pi over 2, (minus 3, 0) at t equal to pi and (0, minus 2) at t equal to 3 pi over 2, travelling counter-clockwise. Eliminating t gives x squared over 9 plus y squared over 4 equals 1.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A parametric curve is drawn by a moving point whose coordinates both depend on a parameter t: x = 3 cos t, y = 2 sin t. Here is the path it traces.', objects: [...mathAxes(S, -4.0, 4.0, -2.8, 2.8), curve(Array.from({ length: 80 }, (_, i) => { const [x, y] = paramPoint((2 * Math.PI * i) / 79); return S(x, y) }), ROLE.ink)] },
      { narration: 'Follow the point as t grows. At t = 0 it is at (3, 0); at t = π/2 at (0, 2); at t = π at (−3, 0); at t = 3π/2 at (0, −2). The parameter is the “clock”.', objects: [...pts.map(([x, y]) => dot(S(x, y), ROLE.result, 0.13)), ...marks.map(([, text], i) => label(text, P(pts[i][0] * u + off[i][0] * 1.0, pts[i][1] * u + off[i][1]), ROLE.result, 'detail'))] },
      { narration: 'The point travels counter-clockwise. To find the ordinary equation, eliminate t: cos t = x/3 and sin t = y/2, and cos²t + sin²t = 1 gives x²/9 + y²/4 = 1.', objects: [arc(0.2, 1.1), arrow(S(...paramPoint(1.1)), S(...paramPoint(1.35)), ROLE.aid), label('x = 3 cos t, y = 2 sin t', S(0, 3.1), ROLE.aid, 'primary'), label('x²/9 + y²/4 = 1', S(0, -3.1), ROLE.result, 'primary')] },
    ],
  }
}

// ── 12. Fourier series (introduction) ────────────────────────────────────────

/** Square wave of height 1 on (0, π) and −1 on (−π, 0); partial sums S_N = (4/π) Σ_{k odd ≤ N} sin(kx)/k. */
export const FOUR = { u: 0.7, ox: 0, oy: 0 } as const
export const squareWave = (x: number) => (x > 0 ? 1 : x < 0 ? -1 : 0)
export const fourierPartial = (x: number, n: number) => {
  let s = 0
  for (let k = 1; k <= n; k += 2) s += Math.sin(k * x) / k
  return (4 / Math.PI) * s
}

/** KG: a periodic function as a sum of sines and cosines (Fourier series). */
export function buildFourierSeriesIntroScene(): SceneSpec {
  return framed(raw_buildFourierSeriesIntroScene())
}
function raw_buildFourierSeriesIntroScene(): SceneSpec {
  const { u, ox, oy } = FOUR
  const S = (x: number, y: number): V3 => P(x * u + ox, y * 1.6 * u + oy)
  const wave = (): SceneObject[] => [line(S(-Math.PI, -1), S(-0.04, -1), ROLE.ink, 0.06), line(S(0.04, 1), S(Math.PI, 1), ROLE.ink, 0.06), line(S(0, -1), S(0, 1), ROLE.reference, 0.025)]
  const partial = (n: number, color: string) => curve(sampleMapped((x) => fourierPartial(x, n), -Math.PI, Math.PI, S, 120), color)
  return {
    id: 'math-fourier-series-intro',
    title: 'Fourier series: building a square wave from sines',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that a periodic function with jumps, a square wave, can be built by adding sine waves of increasing frequency, with each added term making the sum closer to the square wave.',
    ariaLabel:
      'A square wave that is minus 1 for x from minus pi to 0 and 1 from 0 to pi. The first sine, 4 over pi times sin x, is a single smooth hump above the axis that roughly follows the wave. Adding one third of sin 3x and one fifth of sin 5x, all times 4 over pi, gives a sum that is much closer to flat at the top and bottom and steeper at the jump.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A square wave: −1 on the left half of the period, +1 on the right half. It has sharp jumps, nothing like a smooth sine. Can sines build it?', objects: [...mathAxes(S, -3.6, 3.6, -1.8, 1.8), ...wave(), label('square wave', S(2.0, 1.45), ROLE.ink, 'primary')] },
      { narration: 'Start with one sine: (4/π) sin x. It already rises where the wave is +1 and dips where it is −1, but it is round where the wave is flat.', objects: [partial(1, ROLE.input), label('(4/π) sin x', S(-2.4, -1.5), ROLE.input, 'primary')] },
      { narration: 'Add (4/π)(sin 3x)/3 and (4/π)(sin 5x)/5. The sum flattens out and the jump gets steeper. Keep adding odd harmonics and the sum approaches the square wave: that is a Fourier series.', objects: [partial(5, ROLE.result), label('first three odd terms', S(1.6, -1.45), ROLE.result, 'primary')] },
    ],
  }
}
