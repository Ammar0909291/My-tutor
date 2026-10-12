/**
 * Core mathematics figures — batch 29 of the mathematics visual campaign (2026-10-12): the last algebra helpers
 * (quadratic formula, fractional exponents, radicals, exponential and logarithmic equations, logarithm properties,
 * the natural logarithm, the binomial theorem) and the first number-theory helpers (divisibility, primes, composites,
 * prime factorization, greatest common divisor).
 *
 * Same rules as batches 1-28: one visual language from visualDesign.ts, labels are names not sentences (marks of 1-2
 * characters are free), steps are cumulative, coordinates stay inside +-5, at most 50 objects per step, nothing the figure
 * audit rejects (SM-01 evaluates the arithmetic in a label left to right), and every number a figure states is re-derived
 * by the test file from the DRAWN dots, digits, arrows, lines and curves. A label is about 0.26 screen units wide per
 * character.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, arcPts, sampleMapped } from './mathSceneKit'

export type Pt = readonly [number, number]
const pp = (p: Pt) => P(p[0], p[1])
const ln = (a: Pt, b: Pt, color: string = ROLE.reference, t = 0.04): SceneObject => line(pp(a), pp(b), color, t)
const dt = (p: Pt, color: string = ROLE.ink, r = 0.16): SceneObject => dot(pp(p), color, r)
const lb = (text: string, p: Pt, color: string = ROLE.ink): SceneObject => label(text, pp(p), color, 'primary')
const ar = (a: Pt, b: Pt, color: string = ROLE.reference): SceneObject => arrow(pp(a), pp(b), color)
const rect = (x0: number, y0: number, x1: number, y1: number, color: string, t = 0.04): SceneObject[] => [ln([x0, y0], [x1, y0], color, t), ln([x1, y0], [x1, y1], color, t), ln([x1, y1], [x0, y1], color, t), ln([x0, y1], [x0, y0], color, t)]
/** an arrow between two points, pulled back by d from both ends so it does not touch the numerals it joins */
const link = (a: Pt, b: Pt, d: number, color: string): SceneObject => { const L = Math.hypot(b[0] - a[0], b[1] - a[1]), ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L; return ar([a[0] + d * ux, a[1] + d * uy], [b[0] - d * ux, b[1] - d * uy], color) }

// ── 1. Quadratic formula ─────────────────────────────────────────────────────

/** x² − 2x − 3 = 0: the axis is x = −b/2a = 1 and the roots sit √D/2a = 2 either side of it, so x = 1 ± 2 = −1, 3. */
export const QFM = { a: 1, b: -2, c: -3, ox: -0.8, sx: 0.8, oy: 0.2, sy: 0.42 }
export const qfmAt = (x: number, y: number): Pt => [QFM.ox + QFM.sx * x, QFM.oy + QFM.sy * y]
export const qfmF = (x: number) => QFM.a * x * x + QFM.b * x + QFM.c

/** KG: the roots of ax² + bx + c = 0 are x = (−b ± √(b² − 4ac)) / 2a: the axis of symmetry plus and minus a fixed half-width. */
export function buildQuadraticFormulaScene(): SceneSpec {
  return framed(raw_buildQuadraticFormulaScene())
}
function raw_buildQuadraticFormulaScene(): SceneSpec {
  const o = qfmAt(0, 0)
  return {
    id: 'math-quadratic-formula',
    title: 'Quadratic formula: axis ± half-width',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show where the quadratic formula comes from, using x² − 2x − 3 = 0 (a = 1, b = −2, c = −3). The roots are where the parabola crosses the x-axis, at x = −1 and x = 3. The parabola is symmetric about the vertical line x = −b/2a = 1, so the roots must sit the same distance either side of it. That distance is √(b² − 4ac) / 2a = √16 / 2 = 2, so x = −b/2a ± √(b² − 4ac)/2a = 1 ± 2, giving 3 and −1. The expression under the root, b² − 4ac = 16, is the discriminant: positive means two roots, zero one, negative none.',
    ariaLabel:
      'A blue upward parabola with its equation x squared minus 2x minus 3 equals 0 above it, crossing the x-axis at green points at minus 1 and 3. In the second step a violet vertical line through x equals 1 marks the axis of symmetry, with a red point at the vertex 1, minus 4 and the caption minus b over 2a equals 1. In the third step two green segments of length 2 run from the axis to each root, with the captions b squared minus 4ac equals 16 and x equals 1 plus or minus 2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The parabola y = x² − 2x − 3 crosses the x-axis at x = −1 and x = 3 (green points): these are the solutions of x² − 2x − 3 = 0.', objects: [ar(qfmAt(-2.8, 0), qfmAt(4.6, 0)), ar(qfmAt(0, -4.6), qfmAt(0, 6.8)), curve(sampleMapped(qfmF, -2.2, 4.2, (x, y) => pp(qfmAt(x, y)), 48), ROLE.output), lb('x² − 2x − 3 = 0', [0, 3.5], ROLE.output), dt(qfmAt(-1, 0), ROLE.result, 0.15), dt(qfmAt(3, 0), ROLE.result, 0.15), lb('−1', [qfmAt(-1, 0)[0], o[1] - 0.45]), lb('3', [qfmAt(3, 0)[0], o[1] - 0.45])] },
      { narration: 'The graph is symmetric about the vertical line x = −b/2a = −(−2)/2 = 1 (violet) through the vertex (1, −4) (red). The two roots must be the same distance from it.', objects: [ln(qfmAt(1, -4.4), qfmAt(1, 6.4), ROLE.aid, 0.025), dt(qfmAt(1, -4), ROLE.input, 0.16), lb('1', [qfmAt(1, 0)[0], o[1] - 0.45]), lb('−b/2a = 1', [qfmAt(1, -4)[0], qfmAt(1, -4)[1] - 0.55], ROLE.aid)] },
      { narration: 'The distance from the axis to each root is √(b² − 4ac) / 2a = √16 / 2 = 2 (green). So x = 1 ± 2: x = 3 and x = −1. The number b² − 4ac = 16 under the root is the discriminant.', objects: [ln(qfmAt(1, -0.5), qfmAt(3, -0.5), ROLE.result, 0.06), ln(qfmAt(1, -0.5), qfmAt(-1, -0.5), ROLE.result, 0.06), lb('±2', [qfmAt(2, -0.5)[0], qfmAt(0, -1.6)[1]], ROLE.result), lb('b² − 4ac = 16', [-3.2, -1.3], ROLE.ink), lb('x = 1 ± 2', [3.0, -1.3], ROLE.result)] },
    ],
  }
}

// ── 2. Fractional exponent ───────────────────────────────────────────────────

/** 8^(2/3): take the cube root then square (8 → 2 → 4), or square then take the cube root (8 → 64 → 4) — the same 4. */
export const FRX = { nodes: { start: [-4.0, 0], top: [0, 1.5], bot: [0, -1.5], end: [4.0, 0] } as Record<string, Pt>, ops: { root: '³√', square: '²' } }
const cbrt = (v: number) => Math.round(Math.cbrt(v))
export const frxApply = (op: string, v: number) => (op === FRX.ops.root ? cbrt(v) : v * v)

/** KG: a^(m/n) = ⁿ√(aᵐ) = (ⁿ√a)ᵐ — a root and a power, in either order. */
export function buildFractionalExponentScene(): SceneSpec {
  return framed(raw_buildFractionalExponentScene())
}
function raw_buildFractionalExponentScene(): SceneSpec {
  const { start, top, bot, end } = FRX.nodes, mid = (a: Pt, b: Pt, dx: number, dy: number): Pt => [(a[0] + b[0]) / 2 + dx, (a[1] + b[1]) / 2 + dy]
  return {
    id: 'math-fractional-exponent',
    title: 'Fractional exponent: a root and a power',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that a fractional exponent is a root combined with a power, and that the order does not matter. For 8^(2/3) the denominator 3 is the root (cube root) and the numerator 2 is the power (square). Root first: ∛8 = 2, then 2² = 4. Power first: 8² = 64, then ∛64 = 4. Both routes arrive at the same 4, so 8^(2/3) = (∛8)² = ∛(8²) = 4. In general a^(m/n) = (ⁿ√a)ᵐ = ⁿ√(aᵐ): the denominator n is the root index, the numerator m the power.',
    ariaLabel:
      'Four numbers joined by arrows: 8 on the left, 4 on the right, and 2 above and 64 below in the middle. In the first step blue arrows run from 8 to 2 labelled cube root and from 2 to 4 labelled squared, captioned root first. In the second step violet arrows run from 8 to 64 labelled squared and from 64 to 4 labelled cube root, captioned power first. In the third step the caption same result appears at the 4, and the caption exponent 2 over 3 at the top.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Root first: the cube root of 8 is 2 (blue arrow), then square it: 2² = 4.', objects: [lb('8', start), lb('2', top), lb('4', end), link(start, top, 0.45, ROLE.output), lb(FRX.ops.root, mid(start, top, -0.35, 0.4), ROLE.output), link(top, end, 0.45, ROLE.output), lb(FRX.ops.square, mid(top, end, 0.35, 0.4), ROLE.output), lb('root first', [0, 2.35], ROLE.output)] },
      { narration: 'Power first: square 8 to get 64 (violet arrow), then take the cube root: ∛64 = 4.', objects: [lb('64', bot), link(start, bot, 0.45, ROLE.aid), lb(FRX.ops.square, mid(start, bot, -0.35, -0.4), ROLE.aid), link(bot, end, 0.45, ROLE.aid), lb(FRX.ops.root, mid(bot, end, 0.35, -0.4), ROLE.aid), lb('power first', [0, -2.35], ROLE.aid)] },
      { narration: 'Both routes end at 4, so 8^(2/3) = 4. The denominator 3 of the exponent 2/3 is the root (³√) and the numerator 2 is the power (²).', objects: [lb('same result', [3.4, 2.4], ROLE.result), lb('exponent 2/3', [-3.2, 2.4], ROLE.ink)] },
    ],
  }
}

// ── 3. Radicals ──────────────────────────────────────────────────────────────

/** √72 = √(36 × 2) = 6√2: the diagonal of a 6 by 6 square has length √(6² + 6²) = √72, which is 6 copies of √2. */
export const RAD = { x0: -4.2, y0: -1.8, side: 3.3, s: 6 }
export const radU = () => RAD.side / RAD.s

/** KG: a radical is simplified by pulling perfect powers out from under the root. */
export function buildRadicalsScene(): SceneSpec {
  return framed(raw_buildRadicalsScene())
}
function raw_buildRadicalsScene(): SceneSpec {
  const { x0, y0, side } = RAD
  return {
    id: 'math-radicals',
    title: 'Simplifying a radical: √72 = 6√2',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how to simplify √72 by pulling a perfect square out of the root. A square with sides 6 has diagonal d with d² = 6² + 6² = 72 by Pythagoras, so d = √72 ≈ 8.49. Split 72 into a perfect square and what is left: 72 = 36 × 2 with 36 = 6². A square root of a product is the product of the roots, √72 = √36 × √2 = 6√2, and indeed the diagonal of any square is its side times √2: 6 × 1.414 ≈ 8.49. So the simplified radical keeps only the part that is not a perfect square under the root.',
    ariaLabel:
      'A square with each side marked 6 and a violet diagonal labelled square root of 72. In the second step the captions 72 equals 36 times 2 and 36 equals 6 squared appear on the right. In the third step the caption square root of 72 equals 6 times square root of 2 appears in green.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A square with side 6. Its diagonal (violet) has length d with d² = 6² + 6² = 72, so d = √72.', objects: [...rect(x0, y0, x0 + side, y0 + side, ROLE.reference, 0.05), ln([x0, y0], [x0 + side, y0 + side], ROLE.aid, 0.06), lb('6', [x0 + side / 2, y0 - 0.45]), lb('6', [x0 - 0.4, y0 + side / 2]), lb('√72', [x0 + side / 2 - 0.55, y0 + side / 2 + 0.45], ROLE.aid)] },
      { narration: 'Look for a perfect square inside 72: 72 = 36 × 2, and 36 = 6².', objects: [lb('72 = 36 × 2', [2.3, 1.0], ROLE.ink), lb('36 = 6²', [2.3, 0.1], ROLE.output)] },
      { narration: 'The root of a product is the product of the roots: √72 = √36 × √2 = 6√2 ≈ 8.49. The diagonal of a square is its side times √2.', objects: [lb('√72 = 6√2', [2.3, -1.0], ROLE.result)] },
    ],
  }
}

// ── 4. Exponential equations ─────────────────────────────────────────────────

/** 2^x = 8: both sides as powers of 2 (8 = 2³) so x = 3 — the point where y = 2^x meets y = 8. */
export const EXE = { ox: -2.6, sx: 0.85, oy: -2.4, sy: 0.28, cx: 3.4 }
export const exeAt = (x: number, y: number): Pt => [EXE.ox + EXE.sx * x, EXE.oy + EXE.sy * y]

/** KG: an exponential equation is solved by writing both sides with the same base, or with logarithms. */
export function buildExponentialEquationsScene(): SceneSpec {
  return framed(raw_buildExponentialEquationsScene())
}
function raw_buildExponentialEquationsScene(): SceneSpec {
  const o = exeAt(0, 0)
  return {
    id: 'math-exponential-equations',
    title: 'Exponential equation: 2ˣ = 8',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how to solve the exponential equation 2ˣ = 8. Graphically, the curve y = 2ˣ meets the horizontal line y = 8 at one point, above x = 3. Algebraically, write 8 as a power of the same base: 8 = 2³, so 2ˣ = 2³; powers of the same base are equal only when the exponents are equal, so x = 3. When the right side is not a neat power of 2 (2ˣ = 10), take logarithms instead: x = log₂ 10 ≈ 3.32.',
    ariaLabel:
      'A graph of the blue rising curve y equals 2 to the x. In the second step a red horizontal line at height 8 meets it at a green point above x equals 3, with violet guides to the axes marking 3 and 8. In the third step the equations 2 to the x equals 8, 2 to the x equals 2 cubed and x equals 3 are written on the right.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The graph of y = 2ˣ: it doubles every time x goes up by 1 (1, 2, 4, 8, 16, …).', objects: [ar(exeAt(-1.8, 0), exeAt(4.6, 0)), ar(exeAt(0, -1), exeAt(0, 19.5)), curve(sampleMapped((x) => Math.pow(2, x), -1.5, 4.2, (x, y) => pp(exeAt(x, y)), 48), ROLE.output), lb('y = 2ˣ', [exeAt(3.9, 0)[0] + 0.3, exeAt(0, 12)[1]], ROLE.output)] },
      { narration: 'Solve 2ˣ = 8: draw the line y = 8 (red). It meets the curve at one point (green), above x = 3, so x = 3.', objects: [ln(exeAt(-1.8, 8), exeAt(4.6, 8), ROLE.input, 0.04), ln(exeAt(3, 0), exeAt(3, 8), ROLE.aid, 0.025), ln(exeAt(0, 8), exeAt(3, 8), ROLE.aid, 0.025), dt(exeAt(3, 8), ROLE.result, 0.16), lb('3', [exeAt(3, 0)[0], o[1] - 0.45]), lb('8', [o[0] - 0.4, exeAt(0, 8)[1]]), lb('y = 8', [exeAt(-0.9, 0)[0] - 0.3, exeAt(0, 8)[1] + 0.4], ROLE.input)] },
      { narration: 'Algebraically: write 8 as a power of 2, 8 = 2³. Then 2ˣ = 2³; the same base means the exponents must be equal, so x = 3. Check: 2³ = 8.', objects: [lb('2ˣ = 8', [EXE.cx, 2.2]), lb('2ˣ = 2³', [EXE.cx, 1.2]), lb('x = 3', [EXE.cx, 0.2], ROLE.result)] },
    ],
  }
}

// ── 5. Logarithm properties (a log ruler) ────────────────────────────────────

/** On a ruler where 2ᵏ sits at distance k, multiplying is adding lengths: 4 × 8 = 32 is 2 + 3 = 5, 32 ÷ 4 = 8 is 5 − 2 = 3, 4³ = 64 is 3 × 2 = 6. */
export const LGP = { u: 1.1, x0: -3.3, rows: [2.6, 0.0, -2.6] as readonly number[] }
export const lgpAt = (k: number, row: number): Pt => [LGP.x0 + LGP.u * k, LGP.rows[row]]

/** KG: log(xy) = log x + log y, log(x/y) = log x − log y, log(xʳ) = r log x. */
export function buildLogarithmPropertiesScene(): SceneSpec {
  return framed(raw_buildLogarithmPropertiesScene())
}
function raw_buildLogarithmPropertiesScene(): SceneSpec {
  const ruler = (row: number): SceneObject[] => [ln([LGP.x0 - 0.3, LGP.rows[row]], [lgpAt(6, row)[0] + 0.3, LGP.rows[row]], ROLE.reference, 0.04), ...Array.from({ length: 7 }, (_, k) => [ln([lgpAt(k, row)[0], LGP.rows[row] - 0.12], [lgpAt(k, row)[0], LGP.rows[row] + 0.12], ROLE.reference, 0.03), lb(String(2 ** k), [lgpAt(k, row)[0], LGP.rows[row] - 0.45])]).flat()]
  const hopAt = (row: number, k0: number, k1: number, color: string, text: string): SceneObject[] => [ar([lgpAt(k0, row)[0], LGP.rows[row] + 0.4], [lgpAt(k1, row)[0], LGP.rows[row] + 0.4], color), lb(text, [(lgpAt(k0, row)[0] + lgpAt(k1, row)[0]) / 2, LGP.rows[row] + 0.8], color)]
  return {
    id: 'math-logarithm-properties',
    title: 'Logarithm properties on a ruler',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the three logarithm properties on a ruler where the number 2ᵏ is placed at distance k from the left end (so the distance of a number is its base-2 logarithm: 1, 2, 4, 8, 16, 32, 64 sit at 0, 1, 2, 3, 4, 5, 6). PRODUCT: to multiply 4 × 8, lay the length of 4 (2 units) and then the length of 8 (3 units): you land at 5, the position of 32, so log 4 + log 8 = log 32. QUOTIENT: to divide 32 ÷ 4, go back by the length of 4: from 5 to 3, the position of 8, so log 32 − log 4 = log 8. POWER: 4³ is three lengths of 4: 3 × 2 = 6, the position of 64, so log(4³) = 3 log 4. Multiplying becomes adding, dividing becomes subtracting, powers become multiples.',
    ariaLabel:
      'Three number rulers, each marked 1, 2, 4, 8, 16, 32 and 64 at equal spacing. On the first, a green arrow of length 2 from 1 to 4 and a blue arrow of length 3 from 4 to 32, captioned 4 times 8 equals 32 and 2 plus 3 equals 5. On the second, a red arrow of length 2 from 32 back to 8, captioned 32 divided by 4 equals 8 and 5 minus 2 equals 3. On the third, three violet arrows of length 2 from 1 to 64, captioned 4 cubed equals 64 and 6 equals 3 times 2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Product: on the ruler the number 2ᵏ is at distance k. 4 is at 2 and 8 is at 3. Lay the two lengths end to end: 2 + 3 = 5, the position of 32. So 4 × 8 = 32 and log 4 + log 8 = log 32.', objects: [...ruler(0), ...hopAt(0, 0, 2, ROLE.result, '2'), ...hopAt(0, 2, 5, ROLE.output, '3'), dt(lgpAt(5, 0), ROLE.result, 0.16), lb('4 × 8 = 32', [-1.8, LGP.rows[0] - 1.05], ROLE.result), lb('2 + 3 = 5', [1.8, LGP.rows[0] - 1.05], ROLE.output)] },
      { narration: 'Quotient: to divide 32 by 4, go back by the length of 4 (2 units): from 5 to 3, the position of 8. So 32 ÷ 4 = 8 and log 32 − log 4 = log 8.', objects: [...ruler(1), dt(lgpAt(5, 1), ROLE.ink, 0.14), ...hopAt(1, 5, 3, ROLE.input, '2'), dt(lgpAt(3, 1), ROLE.result, 0.16), lb('32 ÷ 4 = 8', [-1.8, LGP.rows[1] - 1.05], ROLE.input), lb('5 − 2 = 3', [1.8, LGP.rows[1] - 1.05], ROLE.input)] },
      { narration: 'Power: 4³ is three lengths of 4 laid end to end: 2 + 2 + 2 = 3 × 2 = 6, the position of 64. So 4³ = 64 and log(4³) = 3 · log 4.', objects: [...ruler(2), ...hopAt(2, 0, 2, ROLE.aid, '2'), ...hopAt(2, 2, 4, ROLE.aid, '2'), ...hopAt(2, 4, 6, ROLE.aid, '2'), dt(lgpAt(6, 2), ROLE.result, 0.16), lb('4³ = 64', [-1.8, LGP.rows[2] - 1.05], ROLE.aid), lb('6 = 3 × 2', [1.8, LGP.rows[2] - 1.05], ROLE.aid)] },
    ],
  }
}

// ── 6. Natural logarithm ─────────────────────────────────────────────────────

/** y = ln x passes through (1, 0) and (e, 1); at x = e its tangent has slope 1/e (the derivative of ln x is 1/x). */
export const LNN = { ox: -4.3, sx: 0.62, oy: -0.6, sy: 1.0 }
export const lnnAt = (x: number, y: number): Pt => [LNN.ox + LNN.sx * x, LNN.oy + LNN.sy * y]

/** KG: ln x is the logarithm with base e ≈ 2.71828; its derivative is 1/x. */
export function buildNaturalLogarithmScene(): SceneSpec {
  return framed(raw_buildNaturalLogarithmScene())
}
function raw_buildNaturalLogarithmScene(): SceneSpec {
  const o = lnnAt(0, 0), e = Math.E, tang = (x: number) => 1 + (x - e) / e
  return {
    id: 'math-natural-logarithm',
    title: 'The natural logarithm ln x',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the natural logarithm, the logarithm with base e ≈ 2.718. The graph of y = ln x rises slowly through (1, 0), because ln 1 = 0, and through (e, 1), because ln e = 1 (e is the number whose natural logarithm is 1). It only exists for x > 0. Its steepness at x is 1/x — the tangent at x = e has slope 1/e ≈ 0.37 — which is why ln x is the antiderivative of 1/x in calculus: the slope is large near 0 and flattens out as x grows.',
    ariaLabel:
      'A graph of the blue curve y equals ln x rising from far below the x-axis near zero, crossing the axis at 1. In the second step green points at 1, 0 and e, 1 with violet guides to the axes, captioned ln 1 equals 0, ln e equals 1 and e approximately 2.718. In the third step a red tangent line at the point e, 1 with the caption slope 1 over e approximately 0.37.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The graph of y = ln x: defined only for x > 0, very negative near 0, crossing the x-axis at 1, then rising ever more slowly.', objects: [ar(lnnAt(-0.2, 0), lnnAt(8.2, 0)), ar(lnnAt(0, -2.6), lnnAt(0, 2.8)), curve(sampleMapped(Math.log, 0.2, 7.5, (x, y) => pp(lnnAt(x, y)), 60), ROLE.output), lb('y = ln x', [lnnAt(6.2, 0)[0], lnnAt(0, 2.4)[1]], ROLE.output)] },
      { narration: 'Two key points: ln 1 = 0 (the curve crosses the axis at 1) and ln e = 1: at x = e ≈ 2.718 the height is exactly 1 (green).', objects: [ln(lnnAt(e, 0), lnnAt(e, 1), ROLE.aid, 0.025), ln(lnnAt(0, 1), lnnAt(e, 1), ROLE.aid, 0.025), dt(lnnAt(1, 0), ROLE.ink, 0.13), dt(lnnAt(e, 1), ROLE.result, 0.16), lb('1', [lnnAt(1, 0)[0], o[1] - 0.45]), lb('e', [lnnAt(e, 0)[0], o[1] - 0.45]), lb('1', [o[0] - 0.4, lnnAt(0, 1)[1]]), lb('ln 1 = 0', [-3.3, -1.5]), lb('ln e = 1', [-1.2, 0.2], ROLE.result), lb('e ≈ 2.718', [-0.7, -1.5], ROLE.aid)] },
      { narration: 'The tangent at (e, 1) (red) has slope 1/e ≈ 0.37: the slope of ln x at x is 1/x. That is why ln x is the antiderivative of 1/x.', objects: [ln(lnnAt(1, tang(1)), lnnAt(6, tang(6)), ROLE.input, 0.035), lb('slope 1/e ≈ 0.37', [lnnAt(5, 0)[0], lnnAt(0, 0.3)[1]], ROLE.input)] },
    ],
  }
}

// ── 7. Logarithmic equations ─────────────────────────────────────────────────

/** log₂ x + log₂ (x − 2) = 3: combine to x(x − 2) = 2³, x² − 2x − 8 = 0, x = 4 or −2, and only x = 4 is in the domain x > 2. */
export const LGE = { ox: -2.4, sx: 0.55, oy: -0.4, sy: 0.5, cx: 3.0, rows: [2.3, 1.4, 0.5, -1.0, -1.9] as readonly number[] }
export const lgeAt = (x: number, y: number): Pt => [LGE.ox + LGE.sx * x, LGE.oy + LGE.sy * y]
export const lgeF = (x: number) => Math.log2(x) + Math.log2(x - 2)

/** KG: condense with the log properties, then exponentiate; reject any root outside the domain. */
export function buildLogarithmicEquationsScene(): SceneSpec {
  return framed(raw_buildLogarithmicEquationsScene())
}
function raw_buildLogarithmicEquationsScene(): SceneSpec {
  const o = lgeAt(0, 0), { cx, rows } = LGE
  return {
    id: 'math-logarithmic-equations',
    title: 'Logarithmic equation: log x + log(x − 2) = 3',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how to solve log₂ x + log₂ (x − 2) = 3. The logarithms only exist where x > 2 (violet line: both x and x − 2 must be positive). Graphing the left side for x > 2 and the line y = 3 (red) shows one crossing, at x = 4. Algebraically: combine with the product rule, log₂ (x(x − 2)) = 3, then exponentiate: x(x − 2) = 2³ = 8, so x² − 2x − 8 = 0 and x = 4 or x = −2. But x = −2 is outside the domain x > 2 (log of a negative number does not exist), so it is rejected; the only solution is x = 4. Check: log₂ 4 + log₂ 2 = 2 + 1 = 3.',
    ariaLabel:
      'A graph of a blue curve rising to the right of a violet vertical line at x equals 2, labelled x greater than 2, with the equation log x plus log of x minus 2 equals 3 above it. In the second step a red horizontal line at height 3 meets the curve at a green point above x equals 4. In the third step the chain x times x minus 2 equals 2 cubed, x squared minus 2x minus 8 equals 0, x equals 4 or minus 2, minus 2 fails because x must exceed 2, and x equals 4 in green is written on the right.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The left side y = log₂ x + log₂ (x − 2) exists only for x > 2 (violet line): it dives to −∞ at x = 2 and rises to the right.', objects: [ar(lgeAt(-2.7, 0), lgeAt(6.8, 0)), ar(lgeAt(0, -3.6), lgeAt(0, 5.6)), ln(lgeAt(2, -3.8), lgeAt(2, 5.4), ROLE.aid, 0.025), curve(sampleMapped(lgeF, 2.06, 6.2, (x, y) => pp(lgeAt(x, y)), 48), ROLE.output), lb('x > 2', [lgeAt(2, 0)[0], lgeAt(0, 5.9)[1]], ROLE.aid), lb('log x + log(x − 2) = 3', [0.3, 3.4], ROLE.ink)] },
      { narration: 'Solutions are where the curve meets y = 3 (red line): one point, above x = 4.', objects: [ln(lgeAt(-0.5, 3), lgeAt(6.8, 3), ROLE.input, 0.04), ln(lgeAt(4, 0), lgeAt(4, 3), ROLE.aid, 0.025), ln(lgeAt(0, 3), lgeAt(4, 3), ROLE.aid, 0.025), dt(lgeAt(4, 3), ROLE.result, 0.16), lb('4', [lgeAt(4, 0)[0], o[1] - 0.45]), lb('3', [o[0] - 0.4, lgeAt(0, 3)[1]])] },
      { narration: 'Algebra: the product rule gives x(x − 2) = 2³ = 8, so x² − 2x − 8 = 0, with roots x = 4 and x = −2. Check the domain: −2 is not greater than 2, so it is rejected. The solution is x = 4.', objects: [lb('x(x − 2) = 2³', [cx, rows[0]]), lb('x² − 2x − 8 = 0', [cx, rows[1]]), lb('x = 4 or −2', [cx, rows[2]]), lb('−2 fails: x > 2', [cx, rows[3]], ROLE.input), lb('x = 4', [cx, rows[4]], ROLE.result)] },
    ],
  }
}

// ── 8. Binomial theorem (Pascal's triangle) ──────────────────────────────────

/** Row n of Pascal's triangle is the list of coefficients of (a + b)ⁿ; each entry is the sum of the two above it; row n sums to 2ⁿ. */
export const BNM = { dx: 0.9, y0: 2.2, dy: 0.9, rows: 6 }
export const bnmAt = (n: number, k: number): Pt => [(k - n / 2) * BNM.dx, BNM.y0 - BNM.dy * n]
export const choose = (n: number, k: number): number => (k === 0 || k === n ? 1 : choose(n - 1, k - 1) + choose(n - 1, k))

/** KG: (a + b)ⁿ = Σ C(n, k) aⁿ⁻ᵏ bᵏ: the coefficients are the binomial coefficients, the numbers of Pascal's triangle. */
export function buildBinomialTheoremScene(): SceneSpec {
  return framed(raw_buildBinomialTheoremScene())
}
function raw_buildBinomialTheoremScene(): SceneSpec {
  const tri: SceneObject[] = Array.from({ length: BNM.rows }, (_, n) => Array.from({ length: n + 1 }, (_, k) => lb(String(choose(n, k)), bnmAt(n, k)))).flat()
  return {
    id: 'math-binomial-theorem',
    title: 'Binomial theorem and Pascal’s triangle',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show where the coefficients of (a + b)ⁿ come from. Pascal’s triangle starts with 1 and every entry is the sum of the two above it (3 + 3 = 6). Row n lists the binomial coefficients C(n, k) for k = 0…n, and these are exactly the coefficients in the expansion of (a + b)ⁿ: row 4 is 1, 4, 6, 4, 1, so (a + b)⁴ = a⁴ + 4a³b + 6a²b² + 4ab³ + b⁴. Setting a = b = 1 shows that each row adds up to 2ⁿ: 1 + 4 + 6 + 4 + 1 = 16 = 2⁴.',
    ariaLabel:
      'Pascal’s triangle with six rows: 1; 1 1; 1 2 1; 1 3 3 1; 1 4 6 4 1; 1 5 10 10 5 1. In the second step two violet arrows run from the two 3s of row 3 to the 6 in row 4, captioned 3 plus 3 equals 6. In the third step green dots mark row 4, 1 4 6 4 1, with the captions open bracket a plus b close bracket to the fourth and 1 plus 4 plus 6 plus 4 plus 1 equals 16.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Pascal’s triangle: start with 1 at the top; each number below is the sum of the two numbers above it, with 1s down both edges.', objects: tri },
      { narration: 'For example the 6 in row 4 is 3 + 3, the two entries above it (violet arrows).', objects: [ar([bnmAt(3, 1)[0] + 0.1, bnmAt(3, 1)[1] - 0.25], [bnmAt(4, 2)[0] - 0.15, bnmAt(4, 2)[1] + 0.3], ROLE.aid), ar([bnmAt(3, 2)[0] - 0.1, bnmAt(3, 2)[1] - 0.25], [bnmAt(4, 2)[0] + 0.15, bnmAt(4, 2)[1] + 0.3], ROLE.aid), lb('3 + 3 = 6', [3.4, -0.95], ROLE.aid)] },
      { narration: 'Row n gives the coefficients of (a + b)ⁿ. Row 4 is 1, 4, 6, 4, 1 (green): (a + b)⁴ = a⁴ + 4a³b + 6a²b² + 4ab³ + b⁴. With a = b = 1 the row sums to 2⁴: 1 + 4 + 6 + 4 + 1 = 16.', objects: [...Array.from({ length: 5 }, (_, k) => dt([bnmAt(4, k)[0], bnmAt(4, k)[1] + 0.4], ROLE.result, 0.12)), lb('(a + b)⁴', [3.6, -1.5], ROLE.result), lb('1 + 4 + 6 + 4 + 1 = 16', [0, -3.3], ROLE.result)] },
    ],
  }
}

// ── 9. Divisibility ──────────────────────────────────────────────────────────

/** 4 divides 12 (three full rows of 4, nothing left over) but not 13 (three rows and 1 left). */
export const DVS = { sp: 0.5, rowGap: 0.6, y0: 0.6, left: -2.4, right: 2.4, cols: 4, rows: 3 }
export const dvsDot = (panel: 0 | 1, r: number, c: number): Pt => [(panel === 0 ? DVS.left : DVS.right) + (c - (DVS.cols - 1) / 2) * DVS.sp, DVS.y0 - DVS.rowGap * r]
export const dvsSpare: Pt = [DVS.right + 1.75, DVS.y0 - DVS.rowGap]

/** KG: a divides b when b = a · q for a whole number q, i.e. the remainder is 0. */
export function buildDivisibilityScene(): SceneSpec {
  return framed(raw_buildDivisibilityScene())
}
function raw_buildDivisibilityScene(): SceneSpec {
  const grid = (panel: 0 | 1): SceneObject[] => Array.from({ length: DVS.rows }, (_, r) => Array.from({ length: DVS.cols }, (_, c) => dt(dvsDot(panel, r, c), ROLE.ink, 0.12))).flat()
  const boxes = (panel: 0 | 1): SceneObject[] => Array.from({ length: DVS.rows }, (_, r) => rect(dvsDot(panel, r, 0)[0] - 0.3, dvsDot(panel, r, 0)[1] - 0.22, dvsDot(panel, r, DVS.cols - 1)[0] + 0.3, dvsDot(panel, r, 0)[1] + 0.22, ROLE.output, 0.04)).flat()
  return {
    id: 'math-divisibility',
    title: 'Divisibility: nothing left over',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show what it means for one whole number to divide another. 4 divides 12 because 12 dots split into rows of 4 with nothing left over: 12 = 4 × 3 (remainder 0). 4 does not divide 13: 13 dots make three full rows of 4 and 1 dot is left over, so 13 = 4 × 3 + 1 (remainder 1). In general a divides b exactly when b = a × q for some whole number q — equivalently when the remainder on dividing b by a is 0.',
    ariaLabel:
      'Two groups of dots: 12 on the left and 13 on the right. In the second step blue boxes group each into rows of 4: the 12 make three boxes exactly, the 13 make three boxes with one red dot left over outside. In the third step the equations 12 equals 4 times 3 and 13 equals 4 times 3 plus 1 appear, with the captions 4 divides 12 in green and remainder 1 in red.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Two collections of dots: 12 on the left, 13 on the right (the 13th is the extra dot, right). Does 4 divide each?', objects: [...grid(0), ...grid(1), dt(dvsSpare, ROLE.ink, 0.12), lb('12', [DVS.left, 2.2]), lb('13', [DVS.right + 0.5, 2.2])] },
      { narration: 'Make rows of 4 (blue boxes). 12 makes 3 full rows and nothing is left. 13 makes 3 full rows and 1 dot (red) is left over.', objects: [...boxes(0), ...boxes(1), dt(dvsSpare, ROLE.input, 0.17)] },
      { narration: '12 = 4 × 3 with remainder 0, so 4 divides 12. 13 = 4 × 3 + 1 with remainder 1, so 4 does not divide 13.', objects: [lb('12 = 4 × 3', [DVS.left, -1.9], ROLE.result), lb('13 = 4 × 3 + 1', [DVS.right + 0.5, -1.9], ROLE.input), lb('4 divides 12', [DVS.left, 1.7], ROLE.result), lb('remainder 1', [DVS.right + 0.5, 1.7], ROLE.input)] },
    ],
  }
}

// ── 10. Prime numbers (a sieve) ──────────────────────────────────────────────

/** The sieve of Eratosthenes up to 30: cross out the multiples of 2, then of 3 and 5; the 10 survivors are the primes. */
export const PRM = { x0: -3.75, dx: 1.5, y0: 1.5, dy: 0.9, perRow: 6, lo: 2, hi: 30 }
export const prmAt = (n: number): Pt => [PRM.x0 + PRM.dx * ((n - PRM.lo) % PRM.perRow), PRM.y0 - PRM.dy * Math.floor((n - PRM.lo) / PRM.perRow)]
export const isPrime = (n: number) => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true }

/** KG: a prime has exactly two divisors, 1 and itself; the sieve removes every multiple of a smaller prime. */
export function buildPrimeNumberScene(): SceneSpec {
  return framed(raw_buildPrimeNumberScene())
}
function raw_buildPrimeNumberScene(): SceneSpec {
  const ns = Array.from({ length: PRM.hi - PRM.lo + 1 }, (_, i) => PRM.lo + i), mark = (n: number, color: string): SceneObject => dt([prmAt(n)[0], prmAt(n)[1] + 0.4], color, 0.1)
  const evens = ns.filter((n) => n > 2 && n % 2 === 0), odds = ns.filter((n) => n > 5 && n % 2 === 1 && (n % 3 === 0 || n % 5 === 0)), primes = ns.filter(isPrime)
  return {
    id: 'math-prime-number',
    title: 'Primes by the sieve of Eratosthenes',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how to find the primes up to 30 with the sieve of Eratosthenes. A prime has exactly two divisors, 1 and itself, so a number with any other divisor is not prime. Start with 2…30. Mark every multiple of 2 after 2 itself (4, 6, 8, …: red). The next unmarked number, 3, is prime: mark its remaining multiples (9, 15, 21, 27). The next, 5, is prime: mark 25. The next prime 7 has 7² = 49 > 30, so nothing new is left to mark. The 10 numbers never marked — 2, 3, 5, 7, 11, 13, 17, 19, 23, 29 (green) — are the primes up to 30.',
    ariaLabel:
      'The numbers 2 to 30 in a grid of six columns. In the second step red dots appear above all even numbers from 4 to 30, captioned multiples of 2. In the third step red dots are added above 9, 15, 21, 25 and 27, captioned multiples of 3 and 5, and green dots mark the ten numbers left: 2, 3, 5, 7, 11, 13, 17, 19, 23 and 29, captioned 10 primes up to 30.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The numbers from 2 to 30. A prime has no divisor except 1 and itself; we will strike out every number that has one.', objects: ns.map((n) => lb(String(n), prmAt(n))) },
      { narration: 'Mark the multiples of 2 after 2 itself: 4, 6, 8, …, 30 (red). 2 stays unmarked: it is prime.', objects: [...evens.map((n) => mark(n, ROLE.input)), lb('multiples of 2', [-2.0, 2.75], ROLE.input)] },
      { narration: 'The next unmarked number, 3, is prime: mark its remaining multiples 9, 15, 21, 27. Then 5: mark 25. 7 × 7 = 49 is already past 30, so we are done. The ten numbers never marked (green) are the primes up to 30.', objects: [...odds.map((n) => mark(n, ROLE.input)), ...primes.map((n) => mark(n, ROLE.result)), lb('multiples of 3, 5', [2.0, 2.75], ROLE.input), lb('10 primes up to 30', [0, -3.1], ROLE.result)] },
    ],
  }
}

// ── 11. Composite numbers ────────────────────────────────────────────────────

/** 12 dots form a 2 × 6 and a 3 × 4 rectangle (so 12 is composite); 7 dots only form the line 1 × 7 (so 7 is prime). */
export const CMP = { sp: 0.38, rowGap: 0.45, y0: 0.9, arrays: [{ rows: 2, cols: 6, cx: -3.1 }, { rows: 3, cols: 4, cx: 0.0 }, { rows: 1, cols: 7, cx: 3.1 }] as ReadonlyArray<{ rows: number; cols: number; cx: number }> }
export const cmpDot = (i: number, r: number, c: number): Pt => [CMP.arrays[i].cx + (c - (CMP.arrays[i].cols - 1) / 2) * CMP.sp, CMP.y0 - CMP.rowGap * r]

/** KG: a composite number has a divisor other than 1 and itself, so it can be arranged as a rectangle with both sides at least 2. */
export function buildCompositeNumberScene(): SceneSpec {
  return framed(raw_buildCompositeNumberScene())
}
function raw_buildCompositeNumberScene(): SceneSpec {
  const array = (i: number, color: string): SceneObject[] => Array.from({ length: CMP.arrays[i].rows }, (_, r) => Array.from({ length: CMP.arrays[i].cols }, (_, c) => dt(cmpDot(i, r, c), color, 0.12))).flat()
  return {
    id: 'math-composite-number',
    title: 'Composite numbers make rectangles',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show what makes a number composite. A composite number has a divisor besides 1 and itself, which means that many dots can be arranged in a rectangle with at least 2 rows and 2 columns. 12 dots form a 2 × 6 rectangle and a 3 × 4 rectangle (12 = 2 × 6 = 3 × 4), so 12 is composite. 7 dots cannot: 7 is not divisible by 2, 3, 4, 5 or 6, so the only arrangement is a single line 1 × 7. A number greater than 1 that is not composite is prime.',
    ariaLabel:
      'Three arrangements of dots. First, 12 green dots in two rows of 6, captioned 12 equals 2 times 6. Second, 12 green dots in three rows of 4, captioned 12 equals 3 times 4. Third, 7 red dots in a single line, captioned 7 equals 1 times 7, with the labels composite 12 in green and prime 7 in red.',
    stage: NO_STAGE,
    steps: [
      { narration: '12 dots arranged in 2 rows of 6: 12 = 2 × 6.', objects: [...array(0, ROLE.result), lb('12 = 2 × 6', [CMP.arrays[0].cx, -0.5], ROLE.result)] },
      { narration: 'The same 12 dots in 3 rows of 4: 12 = 3 × 4. A second rectangle: 12 has the divisors 2, 3, 4 and 6 besides 1 and 12.', objects: [...array(1, ROLE.result), lb('12 = 3 × 4', [CMP.arrays[1].cx, -0.5], ROLE.result)] },
      { narration: '7 dots refuse: 2, 3, 4, 5 and 6 do not divide 7, so they only make a single line 1 × 7. So 12 is composite and 7 is prime.', objects: [...array(2, ROLE.input), lb('7 = 1 × 7', [CMP.arrays[2].cx, -0.5], ROLE.input), lb('composite 12', [-1.55, 2.1], ROLE.result), lb('prime 7', [CMP.arrays[2].cx, 2.1], ROLE.input)] },
    ],
  }
}

// ── 12. Prime factorization (a division ladder) ──────────────────────────────

/** 72 ÷ 2 = 36, ÷ 2 = 18, ÷ 2 = 9, ÷ 3 = 3, ÷ 3 = 1, so 72 = 2 × 2 × 2 × 3 × 3 = 2³ × 3². */
export const PFT = { rows: [2.4, 1.45, 0.5, -0.45, -1.4, -2.35] as readonly number[], xq: 0.8, xd: -0.8, quotients: [72, 36, 18, 9, 3, 1] as readonly number[], divisors: [2, 2, 2, 3, 3] as readonly number[], product: { y: -3.4, x0: -2.4, step: 0.6 } }

/** KG: every integer above 1 is a product of primes, and the list of primes is unique. */
export function buildPrimeFactorizationScene(): SceneSpec {
  return framed(raw_buildPrimeFactorizationScene())
}
function raw_buildPrimeFactorizationScene(): SceneSpec {
  const { rows, xq, xd, quotients, divisors, product } = PFT
  const rowObjs = (rs: number[]): SceneObject[] => rs.flatMap((r) => [lb(String(quotients[r]), [xq, rows[r]]), ...(r < divisors.length ? [lb(String(divisors[r]), [xd, rows[r]], ROLE.result), ln([0.05, rows[r] - 0.36], [1.5, rows[r] - 0.36], ROLE.reference, 0.03)] : [])])
  const prod = divisors.flatMap((d, i) => [lb(String(d), [product.x0 + 2 * i * product.step, product.y], ROLE.result), ...(i < divisors.length - 1 ? [lb('×', [product.x0 + (2 * i + 1) * product.step, product.y])] : [])])
  return {
    id: 'math-prime-factorization',
    title: 'Prime factorization of 72',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how to write 72 as a product of primes with a division ladder. Divide by the smallest prime that goes in, write the quotient below, and repeat until you reach 1: 72 ÷ 2 = 36, 36 ÷ 2 = 18, 18 ÷ 2 = 9 (three 2s), then 9 ÷ 3 = 3 and 3 ÷ 3 = 1 (two 3s). The primes on the left, 2, 2, 2, 3, 3, multiply back to 72: 72 = 2 × 2 × 2 × 3 × 3 = 2³ × 3². By the fundamental theorem of arithmetic every integer above 1 has exactly one such list of primes (apart from the order).',
    ariaLabel:
      'A division ladder: a vertical line with the numbers 72, 36, 18 and 9 down its right side and the green divisors 2, 2, 2 on its left. In the second step the ladder continues with the divisors 3 and 3 and the numbers 3 and 1. In the third step the green primes 2 times 2 times 2 times 3 times 3 appear in a row below, with the caption 72 equals 2 cubed times 3 squared.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Divide 72 by the smallest prime that goes in: 72 ÷ 2 = 36, 36 ÷ 2 = 18, 18 ÷ 2 = 9 (divisors on the left, quotients on the right). 9 is odd, so 2 no longer divides.', objects: [ln([0, 2.8], [0, -0.9], ROLE.reference, 0.04), ...rowObjs([0, 1, 2, 3])] },
      { narration: 'Next prime: 9 ÷ 3 = 3, then 3 ÷ 3 = 1. The ladder ends at 1.', objects: [...rowObjs([4, 5]), ln([0, -0.9], [0, -2.7], ROLE.reference, 0.04)] },
      { narration: 'The divisors 2, 2, 2, 3, 3 are all prime and multiply back to 72: 72 = 2 × 2 × 2 × 3 × 3 = 2³ × 3². This list of primes is the only one for 72.', objects: [...prod, lb('72 = 2³ × 3²', [0, -4.1], ROLE.result)] },
    ],
  }
}

// ── 13. Greatest common divisor (a Venn diagram of divisors) ─────────────────

/** The divisors of 12 and of 18 overlap in 1, 2, 3, 6; the greatest common divisor is 6, and 12 = 6 × 2, 18 = 6 × 3 with 2 and 3 sharing nothing. */
export const GCD = { A: { c: [-1.2, 0] as Pt, r: 2.4 }, B: { c: [1.2, 0] as Pt, r: 2.4 }, a: 12, b: 18, pos: { 4: [-2.6, 0.5], 12: [-2.6, -0.5], 1: [-0.45, 0.55], 2: [0.45, 0.55], 3: [-0.45, -0.55], 6: [0.45, -0.55], 9: [2.6, 0.5], 18: [2.6, -0.5] } as Record<number, Pt> }

/** KG: the GCD of two numbers is the largest number that divides both. */
export function buildGcdScene(): SceneSpec {
  return framed(raw_buildGcdScene())
}
function raw_buildGcdScene(): SceneSpec {
  const { A, B, pos } = GCD, num = (ns: number[]): SceneObject[] => ns.map((n) => lb(String(n), pos[n]))
  return {
    id: 'math-gcd',
    title: 'Greatest common divisor of 12 and 18',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the greatest common divisor as the biggest number in the overlap of two divisor lists. The divisors of 12 are 1, 2, 3, 4, 6, 12 (left circle); those of 18 are 1, 2, 3, 6, 9, 18 (right circle). The numbers in both circles — the common divisors — are 1, 2, 3 and 6, and the largest of them is the greatest common divisor, gcd = 6. Dividing it out leaves 12 = 6 × 2 and 18 = 6 × 3, where 2 and 3 have no common divisor but 1: nothing bigger than 6 could be shared.',
    ariaLabel:
      'Two overlapping circles. The left circle, blue and labelled divisors of 12, contains 4 and 12 on its own. In the second step the right circle, red and labelled divisors of 18, contains 9 and 18 on its own, and the overlap holds 1, 2, 3 and 6. In the third step green dots mark the four common numbers with a larger green dot on 6, and the captions gcd equals 6, 12 equals 6 times 2 and 18 equals 6 times 3 appear below.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The divisors of 12: 1, 2, 3, 4, 6, 12 (inside the blue circle).', objects: [curve(arcPts(A.c[0], A.c[1], A.r, 0, 360, 48), ROLE.output), ...num([4, 12, 1, 2, 3, 6]), lb('divisors of 12', [-2.4, 2.9], ROLE.output)] },
      { narration: 'The divisors of 18: 1, 2, 3, 6, 9, 18 (red circle). The numbers 1, 2, 3 and 6 divide both, so they lie in the overlap.', objects: [curve(arcPts(B.c[0], B.c[1], B.r, 0, 360, 48), ROLE.input), ...num([9, 18]), lb('divisors of 18', [2.4, 2.9], ROLE.input)] },
      { narration: 'The common divisors are 1, 2, 3, 6 (green); the greatest is 6, so gcd(12, 18) = 6. Dividing out 6 leaves 12 = 6 × 2 and 18 = 6 × 3, and 2 and 3 share nothing but 1.', objects: [...[1, 2, 3].map((n) => dt([pos[n][0], pos[n][1] + 0.4], ROLE.result, 0.1)), dt([pos[6][0], pos[6][1] + 0.4], ROLE.result, 0.18), lb('gcd = 6', [0, -3.5], ROLE.result), lb('12 = 6 × 2', [-2.4, -2.9], ROLE.output), lb('18 = 6 × 3', [2.4, -2.9], ROLE.input)] },
    ],
  }
}
