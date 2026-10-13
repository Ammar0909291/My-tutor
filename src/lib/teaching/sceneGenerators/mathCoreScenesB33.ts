/**
 * Core mathematics figures — batch 33 of the mathematics visual campaign (2026-10-12): the differential-equation helpers
 * (ODEs and their order/degree, general / particular / singular solutions, initial value problems, existence and
 * uniqueness, a separable first-order equation, the Wronskian, the Laplace and Fourier transforms, systems of ODEs,
 * harmonic functions, Green's function, a nonlinear ODE).
 *
 * Same rules as batches 1-32: one visual language from visualDesign.ts, labels are names not sentences (marks of 1-2
 * characters are free), steps are cumulative, coordinates stay inside +-5, at most 50 objects per step, nothing the figure
 * audit rejects (SM-01 evaluates the arithmetic in a label left to right: never write "1 × 5 + 2 × 7 = 19" as one label),
 * and every curve, area, slope and value a figure states is re-derived by the test file from the DRAWN coordinates and an
 * independent closed form (curves are checked against the equation they claim to solve, not against the generator).
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, mathAxes, sampleMapped, type V3 } from './mathSceneKit'
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
const curveOf = (f: Frame, fn: (x: number) => number, x0: number, x1: number, color: string, n = 60): SceneObject => curve(sampleMapped(fn, x0, x1, mapOf(f), n), color)
const lineAt = (f: Frame, a: Pt, b: Pt, color: string, t = 0.04): SceneObject => ln(at(f, a[0], a[1]), at(f, b[0], b[1]), color, t)
const dotAt = (f: Frame, x: number, y: number, color: string, r = 0.14): SceneObject => dt(at(f, x, y), color, r)

// ── 1. Ordinary differential equation (order and degree) ─────────────────────

/** y′ = 2x: order 1, degree 1. y″ + y = 0: order 2, degree 1. (y′)³ + y = x: order 1 (highest derivative y′), degree 3 (its power). */
export const ODE = {
  rows: [{ eq: 'y′ = 2x', order: 1, degree: 1 }, { eq: 'y″ + y = 0', order: 2, degree: 1 }, { eq: '(y′)³ + y = x', order: 1, degree: 3 }] as ReadonlyArray<{ eq: string; order: number; degree: number }>,
  y: [1.5, 0.3, -0.9] as readonly number[], eqX: -2.3, orderX: 1.0, degreeX: 3.5,
}

/** KG: an ODE relates an unknown function of one variable to its derivatives; the order is the highest derivative, the degree its power. */
export function buildOdeScene(): SceneSpec {
  return framed(raw_buildOdeScene())
}
function raw_buildOdeScene(): SceneSpec {
  return {
    id: 'math-ode',
    title: 'ODEs: order and degree',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show what an ordinary differential equation is and how it is classified. An ODE relates an unknown function y(x) of ONE variable to its derivatives. The order is the highest derivative that appears and the degree is the power of that highest derivative: y′ = 2x has order 1 and degree 1; y″ + y = 0 has order 2 (the highest derivative is y″) and degree 1; (y′)³ + y = x has order 1 (the highest derivative is y′, not y) and degree 3 (it is cubed).',
    ariaLabel:
      'Three differential equations in a column: y prime equals 2x, y double prime plus y equals 0, and y prime cubed plus y equals x. In the second step red captions give their orders 1, 2 and 1. In the third step blue captions give their degrees 1, 1 and 3.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Three ordinary differential equations: each relates an unknown function y(x) to its derivatives.', objects: [...ODE.rows.map((r, i) => lb(r.eq, [ODE.eqX, ODE.y[i]])), ln([-3.6, 0.9], [4.6, 0.9], ROLE.reference, 0.02), ln([-3.6, -0.3], [4.6, -0.3], ROLE.reference, 0.02)] },
      { narration: 'The ORDER is the highest derivative present: y′ (order 1), y″ (order 2), and y′ again for the third (the plain y does not count).', objects: ODE.rows.map((r, i) => lb(`order ${r.order}`, [ODE.orderX, ODE.y[i]], ROLE.input)) },
      { narration: 'The DEGREE is the power of that highest derivative: 1, 1, and 3 for (y′)³.', objects: ODE.rows.map((r, i) => lb(`degree ${r.degree}`, [ODE.degreeX, ODE.y[i]], ROLE.output)) },
    ],
  }
}

// ── 2. Types of solutions (general, particular, singular) ────────────────────

/** Clairaut's equation y = x y′ + (y′)²: the lines y = Cx + C² (general, one constant for order 1), the member C = 1 (particular), and the parabola y = −x²/4 that touches every line (singular: no C gives it). */
export const SOL: Frame & { xr: readonly [number, number]; yr: readonly [number, number]; C: readonly number[]; particular: number } = { ox: -1.5, oy: -0.4, ux: 0.7, uy: 0.7, xr: [-4.3, 4.3], yr: [-4.5, 3.8], C: [-2, -1, 0, 1, 2], particular: 1 }
/** The part of the line y = m x + b that lies inside the graph window. */
export const solClip = (m: number, b: number): [Pt, Pt] => {
  const [x0, x1] = SOL.xr, [y0, y1] = SOL.yr
  let lo = x0, hi = x1
  if (m > 0) { lo = Math.max(lo, (y0 - b) / m); hi = Math.min(hi, (y1 - b) / m) } else if (m < 0) { lo = Math.max(lo, (y1 - b) / m); hi = Math.min(hi, (y0 - b) / m) }
  return [[lo, m * lo + b], [hi, m * hi + b]]
}
export const solParabola = (x: number) => -(x * x) / 4

/** KG: a general solution has as many arbitrary constants as the order; a particular solution fixes them; a singular solution is not in the general family. */
export function buildSolutionTypesScene(): SceneSpec {
  return framed(raw_buildSolutionTypesScene())
}
function raw_buildSolutionTypesScene(): SceneSpec {
  const fam = (c: number, color: string, t = 0.04): SceneObject => { const [a, b] = solClip(c, c * c); return lineAt(SOL, a, b, color, t) }
  return {
    id: 'math-solution-types',
    title: 'General, particular and singular solutions',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the three kinds of solution of y = x y′ + (y′)² (a first-order equation, so one arbitrary constant). The general solution y = Cx + C² is a whole family of lines, one for each value of C (blue: C = −2, −1, 0, 1, 2). A particular solution fixes C: for C = 1 it is the single line y = x + 1 (violet). A singular solution is not in the family at all: the parabola y = −x²/4 (green) is not obtained for any C, yet it solves the equation too — it is the envelope that every line of the family touches, here at the point (−2C, −C²) of each line.',
    ariaLabel:
      'A coordinate plane with five blue straight lines for C equal to minus 2, minus 1, 0, 1 and 2, labelled general. In the second step the line for C equal to 1 is redrawn in violet and labelled particular. In the third step a green parabola opening downward touches every line, with a green dot at each point of tangency, labelled singular.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The equation y = x y′ + (y′)² has the general solution y = Cx + C²: one arbitrary constant (the order is 1) and so a whole family of lines — here C = −2, −1, 0, 1, 2.', objects: [...mathAxes(mapOf(SOL), SOL.xr[0] - 0.3, SOL.xr[1] + 0.3, SOL.yr[0] - 0.3, SOL.yr[1] + 0.3), ...SOL.C.map((c) => fam(c, ROLE.output)), lb('general: y = Cx + C²', [3.2, 1.5], ROLE.output), lb('y = xy′ + (y′)²', [3.2, 0.7], ROLE.ink)] },
      { narration: 'Fix C = 1 (for example from a condition y(0) = 1): the particular solution y = x + 1 (violet) is one single line.', objects: [fam(SOL.particular, ROLE.aid, 0.06), lb('particular: C = 1', [3.2, -0.1], ROLE.aid)] },
      { narration: 'The parabola y = −x²/4 (green) also solves the equation but no value of C gives it: a singular solution. Every line of the family touches it, at the green dots (−2C, −C²).', objects: [curveOf(SOL, solParabola, -4.2, 4.2, ROLE.result, 60), ...SOL.C.map((c) => dotAt(SOL, -2 * c, -c * c, ROLE.result, 0.1)), lb('singular: y = −x²/4', [3.2, -0.9], ROLE.result)] },
    ],
  }
}

// ── 3. Initial value problem ─────────────────────────────────────────────────

/** y′ = y, y(0) = 1: of all the solutions y = Ce^x only C = 1 passes through (0, 1); its tangent there has slope y′(0) = y(0) = 1. */
export const IVP: Frame & { xr: readonly [number, number]; C: readonly number[]; yMax: number } = { ox: -1.6, oy: -1.8, ux: 1.1, uy: 0.65, xr: [-2, 1.6], C: [0.5, 1, 2], yMax: 5.2 }
export const ivpX1 = (c: number) => Math.min(IVP.xr[1], Math.log(IVP.yMax / c))

/** KG: an initial value problem is an ODE together with the value of the solution at one point; under smoothness it has exactly one solution. */
export function buildIvpScene(): SceneSpec {
  return framed(raw_buildIvpScene())
}
function raw_buildIvpScene(): SceneSpec {
  const fam = (c: number, color: string, thick = 0): SceneObject => curveOf(IVP, (x) => c * Math.exp(x), IVP.xr[0], ivpX1(c), color, 60 + thick)
  return {
    id: 'math-ivp',
    title: 'An initial value problem picks one solution',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how an initial condition singles out one solution. The equation y′ = y has the solutions y = Ceˣ, one for every constant C (grey: C = 0.5, 1, 2). The initial condition y(0) = 1 pins down the point (0, 1) (red): only the member with C = 1 passes through it, so the initial value problem y′ = y, y(0) = 1 has the unique solution y = eˣ (green). Its tangent at (0, 1) (violet) has slope y′(0) = y(0) = 1, which is exactly what the equation prescribes.',
    ariaLabel:
      'In the first step axes with three grey exponential curves rising to the right, with the captions y prime equals y and y equals C e to the x. In the second step a red dot at the point (0, 1) with the caption y of 0 equals 1; only one of the three curves passes through it. In the third step that curve is redrawn in green, a violet tangent line of slope 1 touches it at the dot, and the caption y equals e to the x appears.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The ODE y′ = y is solved by every y = Ceˣ: one curve for each constant C (grey: C = 0.5, 1, 2).', objects: [...mathAxes(mapOf(IVP), IVP.xr[0] - 0.4, IVP.xr[1] + 0.5, -0.4, IVP.yMax + 0.4), ...IVP.C.map((c) => fam(c, ROLE.reference)), lb('y′ = y', [3.2, 1.5], ROLE.ink), lb('y = Ceˣ', [3.2, 0.8], ROLE.reference)] },
      { narration: 'The initial condition y(0) = 1 marks the point (0, 1) (red). Only one of the curves goes through it.', objects: [dotAt(IVP, 0, 1, ROLE.input, 0.15), lb('y(0) = 1', [3.2, 0.0], ROLE.input)] },
      { narration: 'That curve, C = 1, is the unique solution y = eˣ (green). Its tangent at the point (violet) has slope 1 = y(0) = y′(0).', objects: [fam(1, ROLE.result, 2), lineAt(IVP, [-0.7, 0.3], [0.7, 1.7], ROLE.aid, 0.04), lb('y = eˣ', [3.2, -0.8], ROLE.result), lb('slope 1', [3.2, -1.5], ROLE.aid)] },
    ],
  }
}

// ── 4. Existence and uniqueness ──────────────────────────────────────────────

/** Left: y′ = y, y(0) = 1 has the single solution eˣ. Right: y′ = 3y^(2/3), y(0) = 0 has two solutions, y = 0 and y = x³, because ∂f/∂y = 2y^(−1/3) is not continuous at y = 0. */
export const EUN = { left: { ox: -2.8, oy: -0.3, ux: 1.1, uy: 0.85 } as Frame, right: { ox: 2.0, oy: -0.3, ux: 1.1, uy: 0.85 } as Frame, leftX: [-1.4, 1.0] as readonly [number, number], rightX: [-1.25, 1.25] as readonly [number, number] }
export const eunCubeRoot = (v: number) => Math.sign(v) * Math.cbrt(Math.abs(v))

/** KG: if f and ∂f/∂y are continuous around (x₀, y₀), the IVP y′ = f(x, y), y(x₀) = y₀ has a unique solution near x₀. */
export function buildExistenceUniquenessScene(): SceneSpec {
  return framed(raw_buildExistenceUniquenessScene())
}
function raw_buildExistenceUniquenessScene(): SceneSpec {
  const L = EUN.left, R = EUN.right
  return {
    id: 'math-existence-uniqueness',
    title: 'When a solution exists and is unique',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show why the uniqueness theorem needs ∂f/∂y to be continuous. For y′ = y with y(0) = 1, both f = y and ∂f/∂y = 1 are continuous everywhere, so there is exactly one solution through (0, 1): y = eˣ (green, left). For y′ = 3y^(2/3) with y(0) = 0, f is continuous but ∂f/∂y = 2y^(−1/3) blows up at y = 0, and the uniqueness fails: both y = 0 (green) and y = x³ (red) solve the equation and pass through (0, 0) (right).',
    ariaLabel:
      'Two small coordinate planes side by side. Left: one green exponential curve through the red point (0, 1), captioned y prime equals y and unique solution. Right: a green horizontal line along the axis and a red cubic curve, both through the red origin, captioned y prime equals 3 y to the two thirds and two solutions, with the caption partial f over partial y equals 2 y to the minus one third, unbounded at y equals 0.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Left: y′ = y with y(0) = 1. Here f = y and ∂f/∂y = 1 are continuous everywhere, so the theorem applies: ONE solution through (0, 1), y = eˣ.', objects: [...mathAxes(mapOf(L), EUN.leftX[0] - 0.3, EUN.leftX[1] + 0.4, -0.3, 3.0), curveOf(L, Math.exp, EUN.leftX[0], EUN.leftX[1], ROLE.result, 50), dotAt(L, 0, 1, ROLE.input, 0.14), lb('y′ = y', [L.ox, 2.8]), lb('unique solution', [L.ox, -2.5], ROLE.result)] },
      { narration: 'Right: y′ = 3y^(2/3) with y(0) = 0. The line y = 0 solves it (green) — and so does the cubic y = x³ (red): 3x² on both sides. Two solutions through the same point.', objects: [...mathAxes(mapOf(R), EUN.rightX[0] - 0.3, EUN.rightX[1] + 0.3, -2.1, 2.1), lineAt(R, [EUN.rightX[0], 0], [EUN.rightX[1], 0], ROLE.result, 0.06), curveOf(R, (x) => x * x * x, EUN.rightX[0], EUN.rightX[1], ROLE.input, 50), dotAt(R, 0, 0, ROLE.ink, 0.14), lb('y′ = 3y^(2/3)', [R.ox, 2.8]), lb('two solutions', [R.ox, -2.5], ROLE.input)] },
      { narration: 'Why: for the right equation ∂f/∂y = 2y^(−1/3) is unbounded as y → 0, so the theorem’s condition fails exactly where the solutions split.', objects: [lb('∂f/∂y = 2y^(−1/3) unbounded', [R.ox, -3.2], ROLE.aid)] },
    ],
  }
}

// ── 5. First-order ODE (separation of variables) ─────────────────────────────

/** y′ = −2xy separates to dy/y = −2x dx, so ln y = −x² + c and y = Ce^(−x²): bell curves, y(0) = C. */
export const FOD: Frame & { xr: readonly [number, number]; C: readonly number[] } = { ox: 1.7, oy: -1.6, ux: 1.0, uy: 1.1, xr: [-2, 2], C: [1, 2] }
export const fodSol = (c: number) => (x: number) => c * Math.exp(-x * x)

/** KG: a first-order ODE involves only y′; separation of variables is one of the solution methods. */
export function buildFirstOrderOdeScene(): SceneSpec {
  return framed(raw_buildFirstOrderOdeScene())
}
function raw_buildFirstOrderOdeScene(): SceneSpec {
  return {
    id: 'math-first-order-ode',
    title: 'A first-order ODE solved by separation',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a first-order ODE (only y′ appears) solved by separation of variables. y′ = −2xy has all the y on one side after dividing by y and multiplying by dx: dy/y = −2x dx. Integrating both sides gives ln y = −x² + c, so y = Ce^(−x²): bell-shaped curves whose height at x = 0 is the constant C (green: C = 1, blue: C = 2). Each of them has slope −2xy at every point — flat at the top, steepest on the flanks, and 0 again far out.',
    ariaLabel:
      'In the first step the equation y prime equals minus 2 x y. In the second step two violet lines: dy over y equals minus 2 x dx, then ln y equals minus x squared plus c. In the third step a coordinate plane with two bell-shaped curves, a green one peaking at 1 and a blue one peaking at 2, labelled C equals 1 and C equals 2, with the caption y equals C e to the minus x squared.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A first-order ODE: y′ = −2xy. Only the first derivative appears, and the right side factors into a function of x times a function of y.', objects: [lb('y′ = −2xy', [-2.6, 1.8])] },
      { narration: 'Separate the variables: divide by y and multiply by dx to get dy/y = −2x dx. Integrate both sides: ln y = −x² + c.', objects: [lb('dy/y = −2x dx', [-2.6, 0.9], ROLE.aid), lb('ln y = −x² + c', [-2.6, 0.1], ROLE.aid)] },
      { narration: 'Solving for y gives y = Ce^(−x²): bell curves, with C = y(0) the height at the middle (green C = 1, blue C = 2).', objects: [...mathAxes(mapOf(FOD), FOD.xr[0] - 0.3, FOD.xr[1] + 0.3, -0.2, 2.5), curveOf(FOD, fodSol(1), FOD.xr[0], FOD.xr[1], ROLE.result, 60), curveOf(FOD, fodSol(2), FOD.xr[0], FOD.xr[1], ROLE.output, 60), lb('y = Ce^(−x²)', [-2.6, -0.8], ROLE.result), lb('C = 1', [at(FOD, 1.25, 0.95)[0] + 0.5, at(FOD, 1.25, 0.95)[1]], ROLE.result), lb('C = 2', [at(FOD, 0.6, 2.0)[0] + 0.9, at(FOD, 0.6, 2.0)[1] + 0.2], ROLE.output)] },
    ],
  }
}

// ── 6. Wronskian ─────────────────────────────────────────────────────────────

/** W(y₁, y₂) = y₁y₂′ − y₁′y₂. For eˣ and e²ˣ: W = e³ˣ, W(0) = 1 ≠ 0 (independent). For eˣ and 2eˣ: W = 0 (dependent, y₂ = 2y₁). */
export const WRN = { a: { ox: -2.4, oy: -1.8, ux: 1.0, uy: 0.7 } as Frame, b: { ox: 2.4, oy: -1.8, ux: 1.0, uy: 0.7 } as Frame, x0: -1.2, x1: 1.0, h: 0.05, yMax: 5 }
/** Number of 0.05-wide sampling steps from x₀ until the curve reaches the top of the window (x = 0 is always a sample). */
export const wrnSteps = (fn: (x: number) => number) => { let n = Math.round((WRN.x1 - WRN.x0) / WRN.h); while (n > 8 && fn(WRN.x0 + WRN.h * n) > WRN.yMax) n--; return n }
export const wrnFns = { a: [Math.exp, (x: number) => Math.exp(2 * x)], b: [Math.exp, (x: number) => 2 * Math.exp(x)] } as const

/** KG: W(y₁, y₂) = y₁y₂′ − y₁′y₂ is nonzero at some point iff y₁ and y₂ are linearly independent. */
export function buildWronskianScene(): SceneSpec {
  return framed(raw_buildWronskianScene())
}
function raw_buildWronskianScene(): SceneSpec {
  const panel = (f: Frame, fns: ReadonlyArray<(x: number) => number>): SceneObject[] => [
    ...mathAxes(mapOf(f), WRN.x0 - 0.2, WRN.x1 + 0.4, -0.3, WRN.yMax + 0.4),
    ...fns.map((fn, k) => { const N = wrnSteps(fn); return curveOf(f, fn, WRN.x0, WRN.x0 + WRN.h * N, k === 0 ? ROLE.input : ROLE.output, N) }),
  ]
  return {
    id: 'math-wronskian',
    title: 'The Wronskian detects independence',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the Wronskian W(y₁, y₂) = y₁y₂′ − y₁′y₂ as a test for independence of two solutions. For y₁ = eˣ (red) and y₂ = e²ˣ (blue) the curves are not multiples of one another (their ratio e^x changes), and W = eˣ·2e²ˣ − eˣ·e²ˣ = e³ˣ, which at x = 0 equals 1, not 0: independent. For y₁ = eˣ and y₂ = 2eˣ the second is always exactly twice the first, and W = eˣ·2eˣ − eˣ·2eˣ = 0 everywhere: dependent. W ≠ 0 at a single point is enough to prove independence.',
    ariaLabel:
      'Two small coordinate planes. Left: a red curve e to the x and a steeper blue curve e to the 2x, both passing through the point (0, 1), captioned y1 equals e to the x, y2 equals e to the 2x. Right: a red curve e to the x and a blue curve exactly twice as high, captioned y1 equals e to the x, y2 equals 2 e to the x. In the third step the captions W of 0 is 1, not 0, independent on the left and W is 0 for all x, dependent on the right.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Left: y₁ = eˣ (red) and y₂ = e²ˣ (blue). They cross at (0, 1) with different slopes (1 and 2) and are not multiples of each other.', objects: [...panel(WRN.a, wrnFns.a), lb('y₁ = eˣ, y₂ = e²ˣ', [WRN.a.ox, 2.6])] },
      { narration: 'Right: y₁ = eˣ (red) and y₂ = 2eˣ (blue): the second is exactly twice the first at every x.', objects: [...panel(WRN.b, wrnFns.b), lb('y₁ = eˣ, y₂ = 2eˣ', [WRN.b.ox, 2.6])] },
      { narration: 'W = y₁y₂′ − y₁′y₂. Left at x = 0: 1·2 − 1·1 = 1 ≠ 0, so they are independent. Right: W = 0 for every x, so they are dependent.', objects: [lb('W(0) is 1, not 0', [WRN.a.ox, -2.7], ROLE.result), lb('independent', [WRN.a.ox, -3.3], ROLE.result), lb('W is 0 for all x', [WRN.b.ox, -2.7], ROLE.aid), lb('dependent', [WRN.b.ox, -3.3], ROLE.aid)] },
    ],
  }
}

// ── 7. Laplace transform ─────────────────────────────────────────────────────

/** ℒ{1}(s) = ∫₀^∞ e^(−st) dt = 1/s: for s = 2 the area under e^(−2t) is 1/2 (midpoint bars of width 0.1 up to t = 4). */
export const LAP = { ox: -3.6, oy: -0.7, ux: 1.5, uy: 3.0, tMax: 4, s: 2, dt: 0.1 }
export const lapT = (k: number) => (k + 0.5) * LAP.dt
/** Bars are drawn while they are tall enough to render (>= 0.03 world units); the unseen tail beyond is under 0.005 of area. */
export const lapBars = (() => { let k = 0; while (k < Math.round(LAP.tMax / LAP.dt) && Math.exp(-LAP.s * lapT(k)) * LAP.uy >= 0.03) k++; return k })()

/** KG: ℒ{f}(s) = ∫₀^∞ e^(−st) f(t) dt turns a function of t into a function of s. */
export function buildLaplaceTransformScene(): SceneSpec {
  return framed(raw_buildLaplaceTransformScene())
}
function raw_buildLaplaceTransformScene(): SceneSpec {
  const F = LAP as Frame
  const bars = Array.from({ length: lapBars }, (_, k) => lineAt(F, [lapT(k), 0], [lapT(k), Math.exp(-LAP.s * lapT(k))], ROLE.result, 0.03))
  return {
    id: 'math-laplace-transform',
    title: 'The Laplace transform is an area',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the Laplace transform of the constant function f(t) = 1 at s = 2 as an area. The transform ℒ{f}(s) = ∫₀^∞ e^(−st) f(t) dt multiplies f(t) by the decaying weight e^(−st) and measures the area under the product. Here f(t) = 1 (grey line), the weight is e^(−2t) (blue curve), and the green bars of width 0.1 fill the area under it (the tail beyond t = 2.3 is under 0.005): the area is ∫₀^∞ e^(−2t) dt = 1/2 = 0.5, i.e. ℒ{1}(s) = 1/s evaluated at s = 2. Transforming a function of t into a function of s turns calculus into algebra, which is how ODEs get solved with it.',
    ariaLabel:
      'A coordinate plane with t horizontal. In the first step a grey horizontal line at height 1 labelled f of t equals 1 and a blue curve e to the minus 2t decaying from height 1, labelled the weight. In the second step thin green vertical bars fill the area under the blue curve, captioned area under the curve. In the third step the captions 1 over s equals 0.5 and 1 divided by 2 equals 0.5 appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The function f(t) = 1 (grey) and the weight e^(−st) at s = 2 (blue), which decays from 1 toward 0 as t grows.', objects: [...mathAxes(mapOf(F), -0.3, LAP.tMax + 0.4, -0.15, 1.35), lineAt(F, [0, 1], [LAP.tMax, 1], ROLE.reference, 0.03), curveOf(F, (t) => Math.exp(-LAP.s * t), 0, LAP.tMax, ROLE.output, 60), lb('f(t) = 1', [at(F, 3.1, 1)[0], at(F, 3.1, 1)[1] + 0.45]), lb('weight e^(−2t)', [at(F, 2.4, 0.4)[0], at(F, 2.4, 0.4)[1] + 0.75], ROLE.output), lb('t', [at(F, LAP.tMax + 0.45, 0)[0], at(F, LAP.tMax + 0.45, 0)[1] - 0.3])] },
      { narration: 'The transform is the area under f(t)·e^(−st) = e^(−2t) from t = 0 to ∞: green bars of width 0.1 fill it (the thin tail beyond is too small to draw).', objects: [...bars, lb('area under the curve', [at(F, 2.9, 0)[0], at(F, 2.9, 0)[1] - 0.8], ROLE.result)] },
      { narration: 'That area is ∫₀^∞ e^(−2t) dt = 1/2 = 0.5: in general ℒ{1}(s) = 1/s, and 1 ÷ 2 = 0.5 at s = 2.', objects: [lb('ℒ{1} = 1/s', [at(F, 2.9, 0)[0], at(F, 2.9, 0)[1] - 1.6], ROLE.result), lb('1 ÷ 2 = 0.5', [at(F, 2.9, 0)[0], at(F, 2.9, 0)[1] - 2.4], ROLE.result)] },
    ],
  }
}

// ── 8. Systems of ODEs ───────────────────────────────────────────────────────

/** y″ + y = 0 with v = y′ becomes the first-order system x′ = A x, x = (y, v), A = [[0, 1], [−1, 0]]: the solutions are circles y² + v² = r² traversed clockwise. */
export const SYS = { o: [2.0, -0.2] as Pt, u: 0.85, radii: [1, 2] as readonly number[], k: 0.4, A: [[0, 1], [-1, 0]] as ReadonlyArray<readonly number[]>, mA: { cx: -3.0, cy: -0.6, dx: 0.9, dy: 0.8, rows: 2, cols: 2 } as MSpec }
export const sysAt = (y: number, v: number): Pt => [SYS.o[0] + SYS.u * y, SYS.o[1] + SYS.u * v]

/** KG: a system of ODEs involves several dependent variables; an nth-order scalar ODE reduces to a first-order system by taking the derivatives as new variables. */
export function buildSystemsOdeScene(): SceneSpec {
  return framed(raw_buildSystemsOdeScene())
}
function raw_buildSystemsOdeScene(): SceneSpec {
  const F: Frame = { ox: SYS.o[0], oy: SYS.o[1], ux: SYS.u, uy: SYS.u }
  const arrowsAt = SYS.radii.flatMap((r) => [[r, 0], [0, r], [-r, 0], [0, -r]].map(([y, v]) => ar(sysAt(y, v), sysAt(y + SYS.k * v, v - SYS.k * y), ROLE.input)))
  const circles = SYS.radii.map((r) => curve(Array.from({ length: 73 }, (_, k) => pp(sysAt(r * Math.cos((2 * Math.PI * k) / 72), r * Math.sin((2 * Math.PI * k) / 72)))), ROLE.output))
  return {
    id: 'math-systems-ode',
    title: 'A system of ODEs and its phase portrait',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how a higher-order ODE becomes a first-order system and what its solutions look like. y″ + y = 0 is second order; with the new variable v = y′ it says v′ = −y, so the pair x = (y, v) satisfies x′ = A x with A = [[0, 1], [−1, 0]] (y′ = 0·y + 1·v and v′ = −1·y + 0·v). Plotted in the (y, v) plane, the velocity A x at every point is perpendicular to the position (red arrows), so the solutions are circles y² + v² = r² (blue, r = 1 and r = 2) run clockwise: the oscillation y = r cos t.',
    ariaLabel:
      'In the first step the three lines y double prime plus y equals 0, v equals y prime and v prime equals minus y. In the second step the matrix 0 1 over minus 1 0 with the caption x prime equals A x. In the third step a phase plane with two blue circles of radius 1 and 2 about the origin and a short red arrow at four points of each circle pointing clockwise, tangent to the circle.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The second-order ODE y″ + y = 0. Introduce v = y′: then v′ = y″ = −y. Two first-order equations for the two unknowns y and v.', objects: [lb('y″ + y = 0', [-3.1, 2.2]), lb('v = y′', [-3.1, 1.5], ROLE.aid), lb('v′ = −y', [-3.1, 0.8], ROLE.aid)] },
      { narration: 'Written for the vector x = (y, v): x′ = A x with A = [[0, 1], [−1, 0]] — a linear system.', objects: [...matrix(SYS.mA, SYS.A), lb('x′ = A x', [SYS.mA.cx, -2.0], ROLE.result)] },
      { narration: 'In the (y, v) plane the arrow A x at each point (red) is tangent to the circle through it, so the solutions are circles y² + v² = r² (blue), run clockwise — the oscillation.', objects: [...mathAxes(mapOf(F), -2.6, 2.6, -2.6, 2.6), ...circles, ...arrowsAt, lb('y', [sysAt(2.8, 0)[0], sysAt(2.8, 0)[1] - 0.3]), lb('v', [sysAt(0, 2.8)[0] + 0.3, sysAt(0, 2.8)[1]])] },
    ],
  }
}

// ── 9. Fourier transform ─────────────────────────────────────────────────────

/** The pulse f(t) = 1 on [−1, 1] has f̂(ω) = ∫ e^(−iωt) dt = 2 sin ω / ω: f̂(0) = 2 = the pulse's area, zeros at ω = ±π, ±2π, ±3π. */
export const FTR = { top: { ox: 0, oy: 1.7, ux: 1.2, uy: 1.1 } as Frame, bot: { ox: 0, oy: -1.8, ux: 0.42, uy: 0.8 } as Frame, w: 10, tHalf: 1 }
export const sinc2 = (w: number) => (Math.abs(w) < 1e-9 ? 2 : (2 * Math.sin(w)) / w)

/** KG: the Fourier transform f̂(ω) = ∫ f(t) e^(−iωt) dt of a non-periodic function; here a rectangular pulse. */
export function buildFourierTransformScene(): SceneSpec {
  return framed(raw_buildFourierTransformScene())
}
function raw_buildFourierTransformScene(): SceneSpec {
  const T = FTR.top, W = FTR.bot
  return {
    id: 'math-fourier-transform',
    title: 'The Fourier transform of a pulse',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the Fourier transform of a rectangular pulse. The function f(t) = 1 for −1 ≤ t ≤ 1 and 0 elsewhere (blue, top) is not periodic. Its transform f̂(ω) = ∫ f(t) e^(−iωt) dt = ∫ from −1 to 1 of e^(−iωt) dt = 2 sin ω / ω (green, bottom) describes how much of each frequency ω the pulse contains: the value at ω = 0 is the total area of the pulse, f̂(0) = 2 × 1 = 2, and the transform crosses zero at ω = ±π, ±2π, ±3π (red dots), the frequencies that fit a whole number of half-waves into the pulse width 2.',
    ariaLabel:
      'Top: a blue rectangular pulse of height 1 between t equals minus 1 and t equals 1, captioned f of t equals 1 on the interval minus 1 to 1. Bottom: a green curve with a tall central peak of height 2 at omega equal to 0, small oscillations of decreasing size either side, captioned f hat of omega equals 2 sin omega over omega. In the third step red dots mark the zeros at plus and minus pi, 2 pi and 3 pi, the peak is labelled 2, and the captions f hat of 0 equals 2 and area of pulse equals 2 appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The pulse f(t) = 1 on [−1, 1], 0 elsewhere. Its area is 2 × 1 = 2.', objects: [ar(at(T, -3.4, 0), at(T, 3.4, 0)), ar(at(T, 0, -0.25), at(T, 0, 1.4)), lineAt(T, [-3, 0], [-1, 0], ROLE.output, 0.06), lineAt(T, [-1, 0], [-1, 1], ROLE.output, 0.06), lineAt(T, [-1, 1], [1, 1], ROLE.output, 0.06), lineAt(T, [1, 1], [1, 0], ROLE.output, 0.06), lineAt(T, [1, 0], [3, 0], ROLE.output, 0.06), lb('f(t): pulse on [−1, 1]', [3.2, at(T, 0, 1)[1] + 0.35], ROLE.output), lb('t', [at(T, 3.6, 0)[0], at(T, 3.6, 0)[1] - 0.3])] },
      { narration: 'Its Fourier transform f̂(ω) = 2 sin ω / ω (green): a tall peak at ω = 0 with ever smaller oscillations either side.', objects: [ar(at(W, -FTR.w - 0.6, 0), at(W, FTR.w + 0.6, 0)), ar(at(W, 0, -0.9), at(W, 0, 2.5)), curveOf(W, sinc2, -FTR.w, FTR.w, ROLE.result, 100), lb('f̂(ω) = 2 sin ω / ω', [3.1, 0.1], ROLE.result), lb('ω', [at(W, FTR.w + 1.1, 0)[0], at(W, FTR.w + 1.1, 0)[1] - 0.3])] },
      { narration: 'At ω = 0 the transform equals the pulse’s area, f̂(0) = 2. It crosses zero at ω = ±π, ±2π, ±3π (red dots).', objects: [...[1, 2, 3].flatMap((k) => [dotAt(W, k * Math.PI, 0, ROLE.input, 0.1), dotAt(W, -k * Math.PI, 0, ROLE.input, 0.1)]), lb('2', [at(W, 0, 2)[0], at(W, 0, 2)[1] + 0.65], ROLE.result), lb('f̂(0) = 2', [-3.1, 0.1], ROLE.result), lb('area of pulse = 2', [at(T, -2.2, 1)[0], at(T, -2.2, 1)[1] + 0.35], ROLE.output)] },
    ],
  }
}

// ── 10. Harmonic functions ───────────────────────────────────────────────────

/** u = x² − y² satisfies ∇²u = 2 − 2 = 0. On the circle of radius 1 about (1, 1) the samples E, W, N, S are 3, −1, −3, 1: their mean is 0 = u(1, 1). */
export const HRM: Frame & { c: Pt; r: number } = { ox: -1.3, oy: -1.0, ux: 1.1, uy: 1.1, c: [1, 1], r: 1 }
export const hrmU = (x: number, y: number) => x * x - y * y
export const hrmSamples: ReadonlyArray<readonly [number, number]> = [[2, 1], [0, 1], [1, 2], [1, 0]]

/** KG: a harmonic function satisfies ∇²u = 0 and has the mean value property: u at a point is the average of u over any circle around it. */
export function buildHarmonicFunctionsScene(): SceneSpec {
  return framed(raw_buildHarmonicFunctionsScene())
}
function raw_buildHarmonicFunctionsScene(): SceneSpec {
  const circle = curve(Array.from({ length: 73 }, (_, k) => pp(at(HRM, HRM.c[0] + HRM.r * Math.cos((2 * Math.PI * k) / 72), HRM.c[1] + HRM.r * Math.sin((2 * Math.PI * k) / 72)))), ROLE.output)
  const off = (x: number, y: number): Pt => [at(HRM, x, y)[0] + 0.55 * Math.sign(x - HRM.c[0]), at(HRM, x, y)[1] + 0.5 * Math.sign(y - HRM.c[1])]
  return {
    id: 'math-harmonic-functions',
    title: 'Harmonic functions: the mean value property',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the mean value property of a harmonic function. u(x, y) = x² − y² is harmonic: ∇²u = ∂²u/∂x² + ∂²u/∂y² = 2 − 2 = 0. Take the circle of radius 1 around the point (1, 1) (blue) where u(1, 1) = 1 − 1 = 0. At the four points east, west, north and south of the centre, u equals 3, −1, −3 and 1, and their sum 3 − 1 − 3 + 1 = 0 gives the mean 0 ÷ 4 = 0, exactly the value at the centre — and the same holds for the average over the whole circle, for every circle around every point where u is harmonic.',
    ariaLabel:
      'A coordinate plane with a blue circle of radius 1 around the point (1, 1), a violet dot at its centre labelled 0, and the captions u equals x squared minus y squared and the Laplacian of u equals 0. In the second step four red dots on the circle east, west, north and south carry the numbers 3, minus 1, minus 3 and 1, with the caption 3 minus 1 minus 3 plus 1 equals 0. In the third step the captions mean equals 0 and u at the centre equals 0.',
    stage: NO_STAGE,
    steps: [
      { narration: 'u = x² − y² has ∇²u = 2 − 2 = 0: it is harmonic. A circle (blue) of radius 1 around the point (1, 1), where u = 1 − 1 = 0 (violet).', objects: [...mathAxes(mapOf(HRM), -1.4, 3.6, -1.2, 3.2), circle, dt(at(HRM, HRM.c[0], HRM.c[1]), ROLE.aid, 0.14), lb('0', [at(HRM, HRM.c[0], HRM.c[1])[0] + 0.35, at(HRM, HRM.c[0], HRM.c[1])[1] - 0.35], ROLE.aid), lb('u = x² − y²', [3.2, 1.9]), lb('∇²u = 0', [3.2, 1.2], ROLE.aid)] },
      { narration: 'Sample u at the east, west, north and south points of the circle: 3, −1, −3 and 1.', objects: [...hrmSamples.flatMap(([x, y]) => [dotAt(HRM, x, y, ROLE.input, 0.12), lb(String(hrmU(x, y)).replace('-', '−'), off(x, y), ROLE.input)]), lb('3 − 1 − 3 + 1 = 0', [3.2, -0.4], ROLE.input)] },
      { narration: 'Their mean is 0 ÷ 4 = 0, which is exactly u at the centre. Over the whole circle the average is the same: that is the mean value property of harmonic functions.', objects: [lb('mean = 0', [3.2, -1.2], ROLE.result), lb('u(centre) = 0', [3.2, -1.9], ROLE.result)] },
    ],
  }
}

// ── 11. Green's function ─────────────────────────────────────────────────────

/** −u″ = δ(x − ξ) on [0, 1] with u(0) = u(1) = 0, ξ = 0.4: G(x, ξ) = x(1 − ξ) for x ≤ ξ and ξ(1 − x) for x ≥ ξ: a tent of height ξ(1 − ξ) = 0.24, slopes 0.6 and −0.4 (a jump of −1). */
export const GRN: Frame & { xi: number } = { ox: -3.5, oy: -1.8, ux: 7.0, uy: 8.0, xi: 0.4 }
export const grnG = (x: number) => (x <= GRN.xi ? x * (1 - GRN.xi) : GRN.xi * (1 - x))

/** KG: the Green's function G(x, ξ) is the response to a unit point source, LG = δ(x − ξ); with it, u(x) = ∫ G(x, ξ) f(ξ) dξ solves Lu = f. */
export function buildGreensFunctionScene(): SceneSpec {
  return framed(raw_buildGreensFunctionScene())
}
function raw_buildGreensFunctionScene(): SceneSpec {
  const peak = grnG(GRN.xi)
  return {
    id: 'math-greens-function',
    title: 'Green’s function: the response to a point source',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show Green’s function for −u″ = f on [0, 1] with u(0) = u(1) = 0. It is the response G(x, ξ) to a unit point source at x = ξ (here ξ = 0.4, red arrow): it solves −G″ = 0 on each side of ξ, so it is straight there, vanishes at both ends, and its slope drops by exactly 1 at the source. Result: the green tent G = 0.6x for x ≤ 0.4 (slope 0.6) and G = 0.4(1 − x) for x ≥ 0.4 (slope −0.4, and 0.6 − 1 = −0.4) with peak G(0.4, 0.4) = 0.4 × 0.6 = 0.24. Superposing such responses to point sources gives the solution u(x) = ∫ G(x, ξ) f(ξ) dξ of Lu = f.',
    ariaLabel:
      'A horizontal axis from 0 to 1 with green dots at both ends labelled u of 0 equals u of 1 equals 0, and a red upward arrow at x equal 0.4 labelled unit source. In the second step a green tent: a straight line rising from the left end to a peak labelled 0.24 under the arrow, then a straight line falling to the right end. In the third step captions slope 0.6 on the left side in blue, slope minus 0.4 on the right side in violet, and 0.6 minus 1 equals minus 0.4.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The interval [0, 1] with u(0) = u(1) = 0 (green dots) and a unit point source at ξ = 0.4 (red arrow).', objects: [ar(at(GRN, -0.05, 0), at(GRN, 1.08, 0)), dotAt(GRN, 0, 0, ROLE.result, 0.12), dotAt(GRN, 1, 0, ROLE.result, 0.12), ar(at(GRN, GRN.xi, peak), at(GRN, GRN.xi, 0.37), ROLE.input), lb('u(0) = u(1) = 0', [at(GRN, 0.5, 0)[0], at(GRN, 0.5, 0)[1] - 0.6], ROLE.result), lb('unit source at ξ = 0.4', [at(GRN, 0.4, 0.37)[0] + 1.1, at(GRN, 0.4, 0.37)[1] + 0.35], ROLE.input)] },
      { narration: 'The response G(x, ξ): straight on each side of the source, zero at both ends — a tent (green) of height ξ(1 − ξ) = 0.4 × 0.6 = 0.24.', objects: [lineAt(GRN, [0, 0], [GRN.xi, peak], ROLE.result, 0.06), lineAt(GRN, [GRN.xi, peak], [1, 0], ROLE.result, 0.06), lb('G(x, ξ)', [at(GRN, 0.12, 0.2)[0] - 0.3, at(GRN, 0.12, 0.2)[1] + 0.5], ROLE.result), lb('0.24', [at(GRN, GRN.xi, peak)[0] - 0.65, at(GRN, GRN.xi, peak)[1] + 0.25], ROLE.result)] },
      { narration: 'The slope is 0.6 before the source and −0.4 after: it drops by exactly 1 at ξ (0.6 − 1 = −0.4), which is what −G″ = δ demands.', objects: [lb('slope 0.6', [-3.1, -0.7], ROLE.output), lb('slope −0.4', [at(GRN, 0.75, 0.15)[0] + 0.5, at(GRN, 0.75, 0.15)[1] + 0.55], ROLE.aid), lb('0.6 − 1 = −0.4', [at(GRN, 0.78, 0)[0], at(GRN, 0.78, 0)[1] - 1.35], ROLE.aid)] },
    ],
  }
}

// ── 12. Nonlinear ODE (logistic growth) ──────────────────────────────────────

/** y′ = y(1 − y): equilibria y = 0 (unstable) and y = 1 (stable); the solutions y = 1/(1 + Ce^(−t)) with C > 0 climb to 1, and C = −0.5 starts above 1 and falls to 1. */
export const NLO: Frame & { t1: number; C: readonly number[] } = { ox: -3.2, oy: -2.0, ux: 0.75, uy: 1.8, t1: 7, C: [20, 4, 1, 0.25, -0.5] }
export const nloSol = (c: number) => (t: number) => 1 / (1 + c * Math.exp(-t))

/** KG: a nonlinear ODE rarely has an analytic solution; the qualitative picture (equilibria, stability) is a primary tool. */
export function buildNonlinearOdeScene(): SceneSpec {
  return framed(raw_buildNonlinearOdeScene())
}
function raw_buildNonlinearOdeScene(): SceneSpec {
  return {
    id: 'math-nonlinear-ode',
    title: 'A nonlinear ODE: logistic growth',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a nonlinear ODE through its qualitative picture. The logistic equation y′ = y(1 − y) is nonlinear (it contains y²). Its constant solutions, the equilibria, are y = 0 and y = 1 (where y′ = 0): y = 1 (green) is stable because nearby solutions move toward it, y = 0 (red) is unstable because they move away. The explicit solutions y = 1/(1 + Ce^(−t)) (blue) for C = 20, 4, 1, 0.25 start between 0 and 1 and climb in an S-shaped curve toward 1; the one with C = −0.5 starts at y = 2, above 1, and falls back to 1.',
    ariaLabel:
      'A coordinate plane with time t to the right. In the first step a red horizontal line at y equals 0 and a green horizontal line at y equals 1, captioned y prime equals y times 1 minus y, y equals 1 stable and y equals 0 unstable. In the second step four blue S-shaped curves starting at different small heights below the green line and rising toward it. In the third step a violet curve starting at height 2 above the green line and falling toward it.',
    stage: NO_STAGE,
    steps: [
      { narration: 'y′ = y(1 − y) is nonlinear. Its equilibria are the constant solutions where y′ = 0: y = 0 (red) and y = 1 (green).', objects: [...mathAxes(mapOf(NLO), -0.4, NLO.t1 + 0.5, -0.3, 2.3), lineAt(NLO, [0, 0], [NLO.t1, 0], ROLE.input, 0.06), lineAt(NLO, [0, 1], [NLO.t1, 1], ROLE.result, 0.06), lb('y′ = y(1 − y)', [3.6, 1.7]), lb('y = 1 stable', [3.6, -0.2], ROLE.result), lb('y = 0 unstable', [3.7, -2.4], ROLE.input), lb('t', [at(NLO, NLO.t1 + 0.85, 0)[0], at(NLO, NLO.t1 + 0.85, 0)[1] + 0.3])] },
      { narration: 'Starting between 0 and 1 (C = 20, 4, 1, 0.25) a solution climbs in an S-shaped curve and levels off at the stable equilibrium y = 1.', objects: NLO.C.filter((c) => c > 0).map((c) => curveOf(NLO, nloSol(c), 0, NLO.t1, ROLE.output, 60))},
      { narration: 'Starting above 1 (C = −0.5, so y(0) = 2) a solution falls back to y = 1. Every solution except y = 0 ends up at 1.', objects: [curveOf(NLO, nloSol(-0.5), 0, NLO.t1, ROLE.aid, 60), lb('y(0) = 2', [at(NLO, 0, 2)[0] + 0.75, at(NLO, 0, 2)[1] + 0.1], ROLE.aid)] },
    ],
  }
}
