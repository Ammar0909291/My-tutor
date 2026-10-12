/**
 * Core school-mathematics figures — batch 20 of the mathematics visual campaign
 * (2026-10-12): multivariable calculus. Functions of two variables and their level curves,
 * partial derivatives as slopes of slices, the gradient and directional derivatives, critical
 * points and the second-derivative test, vector fields, divergence and curl, line integrals,
 * Fubini and double / triple integrals, the Jacobian, surface integrals and the divergence theorem.
 *
 * Same rules as batches 1-19: one visual language from visualDesign.ts, labels are names not
 * sentences (marks of 1-2 characters are free), steps are cumulative, coordinates stay inside
 * +-5, at most 50 objects per step, nothing the figure audit rejects (SM-01 evaluates the
 * arithmetic in a label left to right and compares labels that share a last token before "="),
 * and every number drawn comes from the constants and pure helpers exported here, which the test
 * file re-derives from the DRAWN coordinates. Three-dimensional pictures use a fixed OBLIQUE
 * projection (x right, z up, y receding up-and-right) that the tests invert.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, mathAxes, polyLines, sampleMapped, arcPts, type V3, type XY } from './mathSceneKit'

type Pt = readonly [number, number]
type Pt3 = readonly [number, number, number]
const rectLines = (x0: number, y0: number, x1: number, y1: number, color: string, t = 0.03): SceneObject[] => polyLines([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], color, t)
const unit2 = (v: Pt): Pt => { const l = Math.hypot(v[0], v[1]) || 1; return [v[0] / l, v[1] / l] }

/** The oblique projection shared by the 3-D figures: x → right, z → up, y recedes up and to the right. */
export type Obl = { ox: number; oy: number; ux: number; uz: number; dxy: number; dyy: number }
export const oblique = (o: Obl) => (p: Pt3): V3 => P(o.ox + o.ux * p[0] + o.dxy * p[1], o.oy + o.uz * p[2] + o.dyy * p[1])
export const obliqueInv = (o: Obl, base: Pt, z: number): Pt3 => { const y = (base[1] - o.oy - o.uz * z) / o.dyy; return [(base[0] - o.ox - o.dxy * y) / o.ux, y, z] }

// ── 1. Introduction to multivariable calculus ───────────────────────────────

/** f(x, y) = x² + y² maps the plane to numbers: A = (1, 0) and B = (0, 1) lie on the same circle and share the value 1; C = (1, 1) gives 2. */
export const MVI = { dom: { c: [-2.8, 0] as Pt, u: 0.9 }, rng: { x: 2.8, y0: -2.2, u: 1.5 }, pts: { A: [1, 0] as Pt, B: [0, 1] as Pt, C: [1, 1] as Pt } }
export const fMV = (x: number, y: number) => x * x + y * y

/** KG: functions of several variables: the domain is a subset of ℝⁿ and the range ℝᵐ. */
export function buildMultivariableIntroScene(): SceneSpec {
  return framed(raw_buildMultivariableIntroScene())
}
function raw_buildMultivariableIntroScene(): SceneSpec {
  const { dom, rng, pts } = MVI
  const D = (x: number, y: number): V3 => P(dom.c[0] + x * dom.u, dom.c[1] + y * dom.u)
  const R = (v: number): V3 => P(rng.x, rng.y0 + v * rng.u)
  const names = Object.keys(pts) as Array<keyof typeof pts>
  const colour = { A: ROLE.output, B: ROLE.input, C: ROLE.result }
  return {
    id: 'math-multivariable-intro',
    title: 'Functions of two variables: ℝ² → ℝ',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show a function of two variables f(x, y) = x² + y² as a map from the PLANE (the domain, a subset of ℝ²) to a number line (the range, ℝ): each point gets one value, and many points can share a value — A = (1, 0) and B = (0, 1) lie on the same circle (a level curve) and both map to 1, while C = (1, 1) is farther out and maps to 2.',
    ariaLabel:
      'Left: the xy plane with a violet circle of radius 1 around the origin and three points: A at (1, 0) and B at (0, 1) on the circle, and C at (1, 1) outside it. Right: a vertical number line marked 0, 1, 2, 3. Blue and red arrows lead from A and B to the same tick, 1, and a green arrow leads from C to the tick 2. Captions say f maps the plane to the reals, and f of A equals f of B equals 1.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The domain of f(x, y) = x² + y² is the xy-plane. Three points: A = (1, 0), B = (0, 1) and C = (1, 1). The violet circle x² + y² = 1 is a level curve — every point on it has the same value of f.', objects: [...mathAxes(D, -2.2, 2.2, -2.2, 2.2), curve(arcPts(dom.c[0], dom.c[1], dom.u, 0, 360, 72), ROLE.aid), ...names.map((k) => dot(D(pts[k][0], pts[k][1]), colour[k], 0.13)), ...names.map((k) => label(k, P(dom.c[0] + (pts[k][0] + (k === 'B' ? -0.3 : 0.28)) * dom.u, dom.c[1] + (pts[k][1] + (k === 'A' ? -0.28 : 0.2)) * dom.u), colour[k], 'primary'))] },
      { narration: 'The range is the real line: a number line for the VALUES of f.', objects: [line(R(0), R(3), ROLE.reference, 0.03), ...[0, 1, 2, 3].map((v) => line(P(rng.x - 0.12, R(v)[1]), P(rng.x + 0.12, R(v)[1]), ROLE.reference, 0.025)), ...[0, 1, 2, 3].map((v) => label(String(v), P(rng.x + 0.45, R(v)[1]), ROLE.ink, 'primary'))] },
      { narration: 'f sends each point to one number: A ↦ 1² + 0² = 1, B ↦ 0² + 1² = 1, C ↦ 1² + 1² = 2. A and B land on the same value (they are on the same level curve): a function of two variables is a map ℝ² → ℝ, and its level curves are the points sharing a value.', objects: names.map((k) => arrow(D(pts[k][0], pts[k][1]), P(rng.x - 0.2, R(fMV(pts[k][0], pts[k][1]))[1]), colour[k])).concat([label('f: ℝ² → ℝ', P(0.0, 3.3), ROLE.ink, 'primary'), label('f(A) = f(B) = 1', P(rng.x - 1.0, -2.9), ROLE.aid, 'primary'), label('f(C) = 2', P(rng.x - 1.0, -3.6), ROLE.result, 'primary')]) },
    ],
  }
}

// ── 2. Partial derivatives ───────────────────────────────────────────────────

/** f(x, y) = x²y at (1, 1): holding y = 1 the slice is z = x² with slope f_x = 2; holding x = 1 it is z = y with slope f_y = 1. */
export const PD = { dom: { c: [-3.4, -1.0] as Pt, u: 1.1 }, top: { x0: 1.2, y0: 0.3, u: 0.9 }, bot: { x0: 1.2, y0: -3.6, u: 0.9 }, p: [1, 1] as Pt, cs: [0.5, 1, 2, 3] as readonly number[] }
export const fPD = (x: number, y: number) => x * x * y
export const fxPD = (x: number, y: number) => 2 * x * y
export const fyPD = (x: number) => x * x

/** KG: ∂f/∂x is the derivative of f with respect to x holding the other variables constant. */
export function buildPartialDerivativesScene(): SceneSpec {
  return framed(raw_buildPartialDerivativesScene())
}
function raw_buildPartialDerivativesScene(): SceneSpec {
  const { dom, top, bot, p, cs } = PD
  const D = (x: number, y: number): V3 => P(dom.c[0] + x * dom.u, dom.c[1] + y * dom.u)
  const T = (x: number, z: number): V3 => P(top.x0 + x * top.u, top.y0 + z * top.u)
  const B = (y: number, z: number): V3 => P(bot.x0 + y * bot.u, bot.y0 + z * bot.u)
  return {
    id: 'math-partial-derivatives',
    title: 'Partial derivatives: slopes of slices',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show partial derivatives of f(x, y) = x²y at the point (1, 1): ∂f/∂x is the slope of the slice you get by HOLDING y = 1 and moving in x (the curve z = x², slope 2x = 2 at x = 1), and ∂f/∂y is the slope of the slice holding x = 1 and moving in y (the line z = y, slope 1) — each is an ordinary one-variable derivative, and they are generally different.',
    ariaLabel:
      'Left: a map of the xy plane with grey level curves of x squared y and a green dot at (1, 1); a horizontal blue line through it (y held at 1) and a vertical red line (x held at 1). Top right: the blue slice z equals x squared with a green tangent of slope 2 at x equals 1, labelled partial f over partial x equals 2. Bottom right: the red slice z equals y, a straight line with a green tangent of slope 1, labelled partial f over partial y equals 1.',
    stage: NO_STAGE,
    steps: [
      { narration: 'f(x, y) = x²y. On the xy-plane its level curves x²y = c (grey) show where f is constant. Stand at P = (1, 1), where f = 1.', objects: [...mathAxes(D, -0.3, 2.3, -0.3, 2.5), ...cs.map((c) => curve(sampleMapped((x) => c / (x * x), Math.max(0.55, Math.sqrt(c / 2.5)), 2.25, D, 30), ROLE.reference)), dot(D(p[0], p[1]), ROLE.result, 0.13)] },
      { narration: 'Hold y = 1 fixed and move only in x (blue line). Along it f(x, 1) = x², a one-variable curve. Its slope at x = 1 is d/dx(x²) = 2 — that is the partial derivative ∂f/∂x = 2xy = 2 at P.', objects: [line(D(0, p[1]), D(2.2, p[1]), ROLE.output, 0.05), ...mathAxes(T, -0.15, 2.1, -0.15, 4.2), curve(sampleMapped((x) => x * x, 0, 2, T, 40), ROLE.output), line(T(0.4, 1 + 2 * (0.4 - 1)), T(1.6, 1 + 2 * (1.6 - 1)), ROLE.result, 0.04), label('∂f/∂x = 2', P(top.x0 + 0.55, top.y0 + 3.5 * top.u), ROLE.result, 'primary')] },
      { narration: 'Now hold x = 1 and move only in y (red line). Along it f(1, y) = y, a straight line of slope 1 — the partial derivative ∂f/∂y = x² = 1 at P. The two slopes differ because f changes at different rates in the two coordinate directions.', objects: [line(D(p[0], 0), D(p[0], 2.2), ROLE.input, 0.05), ...mathAxes(B, -0.15, 2.1, -0.15, 2.3), line(B(0, 0), B(2, 2), ROLE.input, 0.05), line(B(0.4, 0.4), B(1.6, 1.6), ROLE.result, 0.025), label('∂f/∂y = 1', P(bot.x0 + 0.6, bot.y0 + 2.5 * bot.u), ROLE.result, 'primary')] },
    ],
  }
}

// ── 3. Gradient ──────────────────────────────────────────────────────────────

/** f(x, y) = x² + 2y²: ellipse level curves, ∇f = (2x, 4y), perpendicular to the level curve and pointing uphill. */
export const GRD = { c: [0.2, 0] as Pt, u: 1.15, levels: [1, 2, 3, 4] as readonly number[], pts: [[1, 0.5], [-1.2, 0.4], [0.3, -1.0]] as readonly Pt[], k: 0.35 }
export const fGrad = (x: number, y: number) => x * x + 2 * y * y
export const gradF = (x: number, y: number): Pt => [2 * x, 4 * y]

/** KG: ∇f = (∂f/∂x, ∂f/∂y) points in the direction of steepest ascent; its length is the maximum rate of change. */
export function buildGradientScene(): SceneSpec {
  return framed(raw_buildGradientScene())
}
function raw_buildGradientScene(): SceneSpec {
  const { c, u, levels, pts, k } = GRD
  const D = (x: number, y: number): V3 => P(c[0] + x * u, c[1] + y * u)
  const ell = (lv: number) => curve(sampleMapped((t) => t, 0, 2 * Math.PI, (t) => D(Math.sqrt(lv) * Math.cos(t), Math.sqrt(lv / 2) * Math.sin(t)), 72), ROLE.reference)
  const tangentAt = (p: Pt): Pt => unit2([-4 * p[1], 2 * p[0]])
  return {
    id: 'math-gradient',
    title: 'Gradient: the direction of steepest ascent',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show the gradient of f(x, y) = x² + 2y² on its level-curve map (nested ellipses): ∇f = (2x, 4y) is drawn as a green arrow at each point, it points straight UPHILL (to higher values), it is PERPENDICULAR to the level curve through that point, and its length |∇f| is the greatest rate at which f can change.',
    ariaLabel:
      'Nested grey ellipses around the origin. At three points green arrows point outward and across the ellipses, longer where the ellipses are closer together. At the first point a violet line runs along the ellipse tangent and the arrow meets it at a right angle, captioned gradient is perpendicular to the level curve.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The level curves of f(x, y) = x² + 2y² are ellipses x² + 2y² = c, c = 1, 2, 3, 4 — f rises outward. Where the ellipses crowd together, f changes fast.', objects: [...mathAxes(D, -2.4, 2.4, -1.8, 1.8), ...levels.map(ell)] },
      { narration: 'At each point the gradient ∇f = (∂f/∂x, ∂f/∂y) = (2x, 4y) (green arrow, drawn at 0.35 scale) points in the direction of steepest ascent. At (1, 0.5) it is (2, 2); at (−1.2, 0.4) it is (−2.4, 1.6); at (0.3, −1) it is (0.6, −4).', objects: [...pts.map((p) => arrow(D(p[0], p[1]), D(p[0] + k * gradF(p[0], p[1])[0], p[1] + k * gradF(p[0], p[1])[1]), ROLE.result)), ...pts.map((p) => dot(D(p[0], p[1]), ROLE.ink, 0.1))] },
      { narration: 'The gradient is always PERPENDICULAR to the level curve through its point: along the level curve (violet tangent at (1, 0.5)) f does not change, so the direction of fastest change must be at right angles to it. Its length |∇f| = √(4x² + 16y²) is that fastest rate.', objects: [line(D(pts[0][0] - 0.9 * tangentAt(pts[0])[0], pts[0][1] - 0.9 * tangentAt(pts[0])[1]), D(pts[0][0] + 0.9 * tangentAt(pts[0])[0], pts[0][1] + 0.9 * tangentAt(pts[0])[1]), ROLE.aid, 0.035), label('gradient ⟂ level curve', P(c[0], -2.7), ROLE.result, 'primary')] },
    ],
  }
}

// ── 4. Directional derivative ────────────────────────────────────────────────

/** At P = (1, 0.5) of f = x² + 2y²: ∇f = (2, 2), so D_u f = 2 cos θ + 2 sin θ = 2√2 cos(θ − 45°), largest along ∇f and 0 along the level curve. */
export const DDV = { left: { c: [-2.6, 0] as Pt, u: 1.2 }, right: { x0: 0.5, y0: -0.3, ux: 1.0 / 90, uy: 0.55 }, p: [1, 0.5] as Pt, angles: [45, 135, 0] as readonly number[] }
export const Dudf = (deg: number, p: Pt = DDV.p) => { const g = gradF(p[0], p[1]), t = (deg * Math.PI) / 180; return g[0] * Math.cos(t) + g[1] * Math.sin(t) }

/** KG: D_u f = ∇f · u; it is maximised when u is parallel to ∇f. */
export function buildDirectionalDerivativeScene(): SceneSpec {
  return framed(raw_buildDirectionalDerivativeScene())
}
function raw_buildDirectionalDerivativeScene(): SceneSpec {
  const { left, right, p, angles } = DDV
  const L = (x: number, y: number): V3 => P(left.c[0] + x * left.u, left.c[1] + y * left.u)
  const R = (deg: number, v: number): V3 => P(right.x0 + deg * right.ux, right.y0 + v * right.uy)
  const colors = [ROLE.result, ROLE.input, ROLE.output]
  const ell = (lv: number) => curve(sampleMapped((t) => t, 0, 2 * Math.PI, (t) => L(Math.sqrt(lv) * Math.cos(t), Math.sqrt(lv / 2) * Math.sin(t)), 60), ROLE.reference)
  return {
    id: 'math-directional-derivative',
    title: 'Directional derivative: D_u f = ∇f · u',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show directional derivatives of f = x² + 2y² at P = (1, 0.5), where ∇f = (2, 2): in a unit direction u = (cos θ, sin θ) the rate of change is D_u f = ∇f · u = 2 cos θ + 2 sin θ = 2√2 cos(θ − 45°) — largest (2√2 ≈ 2.83) when u points along ∇f (θ = 45°), zero along the level curve (θ = 135°), and 2 along the x-axis (θ = 0).',
    ariaLabel:
      'Left: grey level ellipses with a point P and three unit arrows from it: a long green one along the gradient at 45 degrees, a red one at 135 degrees along the level curve, and a blue one along the x axis. Right: a graph of the directional derivative against the angle theta from 0 to 360 degrees, a cosine wave with maximum 2.83 at 45 degrees and zero at 135 degrees; three dots mark the three arrows at heights 2.83, 0 and 2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'At P = (1, 0.5) the gradient of f = x² + 2y² is ∇f = (2, 2): length 2√2 ≈ 2.83, direction 45° (green).', objects: [...[1, 2, 3].map(ell), dot(L(p[0], p[1]), ROLE.ink, 0.12), arrow(L(p[0], p[1]), L(p[0] + 0.5, p[1] + 0.5), ROLE.result), label('P', P(L(p[0], p[1])[0] - 0.3, L(p[0], p[1])[1] - 0.3), ROLE.ink, 'primary'), label('∇f', P(L(p[0] + 0.5, p[1] + 0.5)[0] + 0.1, L(p[0] + 0.5, p[1] + 0.5)[1] + 0.35), ROLE.result, 'primary')] },
      { narration: 'Walk from P in other unit directions u: along ∇f (θ = 45°) the rate is ∇f · u = 2√2 ≈ 2.83; along the level curve (θ = 135°) it is 0; along +x (θ = 0°) it is 2.', objects: angles.slice(1).map((a, i) => arrow(L(p[0], p[1]), L(p[0] + 0.5 * Math.cos((a * Math.PI) / 180), p[1] + 0.5 * Math.sin((a * Math.PI) / 180)), colors[i + 1])) },
      { narration: 'Plot D_u f against the direction θ: 2 cos θ + 2 sin θ = 2√2 cos(θ − 45°), a cosine wave. Its peak 2√2 is exactly |∇f| and occurs along ∇f; it is 0 at 135°, where u is along the level curve.', objects: [...mathAxes((deg, v) => R(deg, v), -10, 380, -3.2, 3.4), curve(sampleMapped((deg) => Dudf(deg), 0, 360, R, 90), ROLE.aid), ...angles.map((a, i) => dot(R(a, Dudf(a)), colors[i], 0.12)), label('max 2.83', P(right.x0 + 45 * right.ux + 0.2, right.y0 + 3.5 * right.uy), ROLE.result, 'primary'), label('θ', P(right.x0 + 372 * right.ux, right.y0 - 0.3), ROLE.reference, 'detail')] },
    ],
  }
}

// ── 5. Multivariable extrema ─────────────────────────────────────────────────

/** Three critical points at the origin: f = x² + y² (min), −x² − y² (max), x² − y² (saddle); Hessian determinant D = fxx·fyy − fxy². */
export const EXT = { cx: [-3.3, 0.1, 3.5] as readonly number[], cy: 0.3, u: 0.85, kinds: [{ id: 'min', fxx: 2, fyy: 2, fxy: 0 }, { id: 'max', fxx: -2, fyy: -2, fxy: 0 }, { id: 'saddle', fxx: 2, fyy: -2, fxy: 0 }] as ReadonlyArray<{ id: string; fxx: number; fyy: number; fxy: number }>, levels: [0.5, 1, 2] as readonly number[] }
export const hessianD = (h: { fxx: number; fyy: number; fxy: number }) => h.fxx * h.fyy - h.fxy * h.fxy
export const classify = (h: { fxx: number; fyy: number; fxy: number }) => { const D = hessianD(h); return D < 0 ? 'saddle' : D > 0 ? (h.fxx > 0 ? 'min' : 'max') : 'inconclusive' }

/** KG: critical points ∇f = 0 are classified by the Hessian: D > 0, fxx > 0 min; D > 0, fxx < 0 max; D < 0 saddle. */
export function buildMultivariableExtremaScene(): SceneSpec {
  return framed(raw_buildMultivariableExtremaScene())
}
function raw_buildMultivariableExtremaScene(): SceneSpec {
  const { cx, cy, u, kinds, levels } = EXT
  const G = (i: number) => (x: number, y: number): V3 => P(cx[i] + x * u, cy + y * u)
  const circles = (i: number) => levels.map((c) => curve(sampleMapped((t) => t, 0, 2 * Math.PI, (t) => G(i)(Math.sqrt(c) * Math.cos(t), Math.sqrt(c) * Math.sin(t)), 60), ROLE.reference))
  const hyper = (c: number, sign: 1 | -1): SceneObject => c > 0
    ? curve(sampleMapped((t) => t, -1.3, 1.3, (t) => G(2)(sign * Math.sqrt(t * t + c), t), 24), ROLE.reference)
    : curve(sampleMapped((t) => t, -1.3, 1.3, (t) => G(2)(t, sign * Math.sqrt(t * t - c)), 24), ROLE.reference)
  const colours = [ROLE.output, ROLE.input, ROLE.aid]
  const note = (i: number) => (i === 2 ? `D ${hessianD(kinds[i])}` : `D ${hessianD(kinds[i])} · fₓₓ ${kinds[i].fxx}`)
  return {
    id: 'math-multivariable-extrema',
    title: 'Critical points: minimum, maximum, saddle',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the second-derivative test at a critical point (∇f = 0) of three functions with the Hessian determinant D = fₓₓ f_yy − f_xy²: f = x² + y² has D = 4 > 0 and fₓₓ = 2 > 0, a local MINIMUM (closed level curves, values rising outward); f = −x² − y² has D = 4 > 0 and fₓₓ = −2 < 0, a local MAXIMUM; f = x² − y² has D = −4 < 0, a SADDLE POINT (hyperbolic level curves that cross).',
    ariaLabel:
      'Three small level-curve maps side by side. Left: concentric grey circles with a blue dot at the centre labelled min, D 4, fxx 2. Middle: concentric grey circles with a red dot at the centre labelled max, D 4, fxx minus 2. Right: grey hyperbolas opening left and right and up and down, crossing at a violet dot labelled saddle, D minus 4.',
    stage: NO_STAGE,
    steps: [
      { narration: 'f = x² + y²: ∇f = (2x, 2y) = 0 only at the origin. There fₓₓ = 2, f_yy = 2, f_xy = 0, so D = 4 > 0 and fₓₓ > 0: a local MINIMUM — the level curves are closed circles and f rises in every direction.', objects: [...circles(0), dot(G(0)(0, 0), colours[0], 0.14), label('min', P(cx[0], cy + 1.9), colours[0], 'primary'), label(note(0), P(cx[0], cy - 1.9), ROLE.ink, 'primary')] },
      { narration: 'f = −x² − y²: the critical point is again the origin, but now fₓₓ = −2 < 0 with D = 4 > 0: a local MAXIMUM — f falls in every direction (same circles, values decreasing outward).', objects: [...circles(1), dot(G(1)(0, 0), colours[1], 0.14), label('max', P(cx[1], cy + 1.9), colours[1], 'primary'), label(note(1), P(cx[1], cy - 1.9), ROLE.ink, 'primary')] },
      { narration: 'f = x² − y²: fₓₓ = 2 and f_yy = −2, so D = 2 × (−2) = −4 < 0: a SADDLE POINT. f rises along x and falls along y, and the level curves are hyperbolas that cross at the critical point (the level 0 is the two diagonals).', objects: [line(G(2)(-1.3, -1.3), G(2)(1.3, 1.3), ROLE.reference, 0.025), line(G(2)(-1.3, 1.3), G(2)(1.3, -1.3), ROLE.reference, 0.025), ...[0.5, 1, -0.5, -1].flatMap((c) => [hyper(c, 1), hyper(c, -1)]), dot(G(2)(0, 0), colours[2], 0.14), label('saddle', P(cx[2], cy + 1.9), colours[2], 'primary'), label(note(2), P(cx[2], cy - 1.9), ROLE.ink, 'primary')] },
    ],
  }
}

// ── 6. Vector fields ─────────────────────────────────────────────────────────

/** Left: the rotation field F = (−y, x) (not conservative); right: the radial field G = (x, y) = ∇f with f = ½(x² + y²) (conservative, circular equipotentials ⟂ the arrows). */
export const VFD = { left: [-2.6, 0] as Pt, right: [2.6, 0] as Pt, u: 0.62, k: 0.28, lattice: [-2, -1, 0, 1, 2] as readonly number[], rings: [1, 2] as readonly number[] }
export const rotF = (x: number, y: number): Pt => [-y, x]
export const radG = (x: number, y: number): Pt => [x, y]

/** KG: a vector field assigns a vector to each point; it is conservative if F = ∇f, and then ∫F·dr is path-independent. */
export function buildVectorFieldsScene(): SceneSpec {
  return framed(raw_buildVectorFieldsScene())
}
function raw_buildVectorFieldsScene(): SceneSpec {
  const { left, right, u, k, lattice, rings } = VFD
  const arrowsOf = (c: Pt, F: (x: number, y: number) => Pt, color: string): SceneObject[] => lattice.flatMap((x) => lattice.flatMap((y) => {
    const v = F(x, y); if (v[0] === 0 && v[1] === 0) return []
    return [arrow(P(c[0] + x * u, c[1] + y * u), P(c[0] + (x + k * v[0]) * u, c[1] + (y + k * v[1]) * u), color)]
  }))
  return {
    id: 'math-vector-fields',
    title: 'Vector fields: rotation and a gradient field',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show two vector fields, an arrow at every lattice point: F = (−y, x) swirls round the origin (a rotation field — going once round a circle you always push with the arrow, so it is NOT the gradient of any function), and G = (x, y) = ∇f points straight out, perpendicular to the circles f = ½(x² + y²) = const: a CONSERVATIVE field, whose line integral depends only on the endpoints.',
    ariaLabel:
      'Left: a five by five lattice of blue arrows that circulate anticlockwise around the centre, longer farther out, captioned F equals (minus y, x). Right: a lattice of green arrows pointing straight away from the centre with two violet circles around it that the arrows cross at right angles, captioned G equals (x, y), and the potential f equals a half of x squared plus y squared; a final caption says conservative: path-independent.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A vector field puts an arrow F(x, y) at every point. F = (−y, x): at (1, 0) it points up, at (0, 1) left, at (−1, 0) down — the arrows circulate anticlockwise round the origin, longer farther out.', objects: [...arrowsOf(left, rotF, ROLE.output), label('F = (−y, x)', P(left[0], -3.0), ROLE.output, 'primary')] },
      { narration: 'G = (x, y) points straight away from the origin. It is the GRADIENT of f = ½(x² + y²): ∇f = (x, y). The circles f = const (violet) are crossed at right angles by the arrows.', objects: [...arrowsOf(right, radG, ROLE.result), ...rings.map((r) => curve(arcPts(right[0], right[1], r * u, 0, 360, 48), ROLE.aid)), label('G = (x, y)', P(right[0], -3.0), ROLE.result, 'primary'), label('potential f = ½(x² + y²)', P(right[0], -3.7), ROLE.aid, 'primary')] },
      { narration: 'A field F = ∇f is called conservative, and then ∫_C F·dr = f(end) − f(start) depends only on the endpoints, not on the path. The rotation field has no such potential — going round a circle it always pushes forward — so its integral does depend on the path.', objects: [label('conservative: path-independent', P(0, 3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 7. Curl and divergence ───────────────────────────────────────────────────

/** A unit square loop at (1, 1) in G = (x, y) (net outflow 2 = ∇·G × area) and in F = (−y, x) (circulation 2 = ∇×F × area). */
export const CND = { left: [-2.6, -0.5] as Pt, right: [2.6, -0.5] as Pt, u: 1.5, k: 0.3, sq: { x0: 0.5, y0: 0.5, s: 1 } }
export const divG = 2, curlF = 2

/** KG: ∇·F measures outward flux density, ∇×F the rotational tendency. */
export function buildCurlDivergenceScene(): SceneSpec {
  return framed(raw_buildCurlDivergenceScene())
}
function raw_buildCurlDivergenceScene(): SceneSpec {
  const { left, right, u, k, sq } = CND
  const L = (x: number, y: number): V3 => P(left[0] + x * u, left[1] + y * u)
  const R = (x: number, y: number): V3 => P(right[0] + x * u, right[1] + y * u)
  const x1 = sq.x0 + sq.s, y1 = sq.y0 + sq.s, mx = sq.x0 + sq.s / 2, my = sq.y0 + sq.s / 2
  const mids: Array<[number, number]> = [[x1, my], [mx, y1], [sq.x0, my], [mx, sq.y0]]
  const box = (M: (x: number, y: number) => V3) => polyLines([[M(sq.x0, sq.y0)[0], M(sq.x0, sq.y0)[1]], [M(x1, sq.y0)[0], M(x1, sq.y0)[1]], [M(x1, y1)[0], M(x1, y1)[1]], [M(sq.x0, y1)[0], M(sq.x0, y1)[1]]], ROLE.aid, 0.04)
  const field = (M: (x: number, y: number) => V3, F: (x: number, y: number) => Pt, color: string) => mids.map(([x, y]) => arrow(M(x, y), M(x + k * F(x, y)[0], y + k * F(x, y)[1]), color))
  return {
    id: 'math-curl-divergence',
    title: 'Divergence and curl: flux and circulation per area',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show what ∇·F and ∇×F measure with a unit-square loop at (1, 1) (violet): in the radial field G = (x, y) the outward flux through the four sides is 1.5 − 0.5 + 1.5 − 0.5 = 2 = ∇·G × area (∇·G = ∂x/∂x + ∂y/∂y = 2: a source); in the rotation field F = (−y, x) the circulation round the loop is 1.5 + 1.5 − 0.5 − 0.5 = 2 = ∇×F × area (∇×F = ∂x/∂x − ∂(−y)/∂y = 2: it spins).',
    ariaLabel:
      'Left: a violet unit square and, at the midpoint of each of its four sides, a green arrow of the radial field (x, y) pointing out; the right and top arrows are long and the left and bottom ones short, so more leaves than enters, captioned divergence 2, net outflow. Right: the same square in the rotation field (minus y, x) with a blue arrow at each side midpoint circulating anticlockwise, strong on the right and top and weak on the left and bottom, captioned curl 2, net circulation.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Take a small square loop (violet) and look at the field on its four sides. In the radial field G = (x, y) the arrows (green, shown at 0.3 scale) point OUT of the square on every side — and are longer on the far sides (x = 1.5, y = 1.5) than the near ones (0.5).', objects: [...box(L), ...field(L, radG, ROLE.result)] },
      { narration: 'Flux out minus flux in: right 1.5 and top 1.5 leave, left 0.5 and bottom 0.5 enter (G · outward normal on each unit side), net 1.5 + 1.5 − 0.5 − 0.5 = 2. Per unit area that is ∇·G = ∂G₁/∂x + ∂G₂/∂y = 1 + 1 = 2 > 0: the field has a source here.', objects: [label('∇·G = 2: net outflow', P(left[0], -3.0), ROLE.result, 'primary')] },
      { narration: 'In the rotation field F = (−y, x) the arrows (blue) run ALONG the sides anticlockwise: right side 1.5 up, top 1.5 left, left side 0.5 down, bottom 0.5 right. Circulation = 1.5 + 1.5 − 0.5 − 0.5 = 2, i.e. ∇×F = ∂F₂/∂x − ∂F₁/∂y = 1 − (−1) = 2: the field spins here.', objects: [...box(R), ...field(R, rotF, ROLE.output), label('∇×F = 2: net circulation', P(right[0], -3.0), ROLE.output, 'primary')] },
    ],
  }
}

// ── 8. Line integrals ────────────────────────────────────────────────────────

/** F = (−y, x) from (1, 0) to (0, 1): along the quarter-circle arc ∫F·dr = π/2 ≈ 1.571, along the straight chord it is 1 — the field is not conservative. */
export const LIN = { o: [-1.5, -1.8] as Pt, u: 2.0, k: 0.22, lattice: [-0.5, 0, 0.5, 1, 1.5] as readonly number[], arcN: 48, marks: 5 }
export const lineIntegral = (path: ReadonlyArray<Pt>, F: (x: number, y: number) => Pt = rotF) => { let s = 0; for (let i = 1; i < path.length; i++) { const a = path[i - 1], b = path[i], m: Pt = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], f = F(m[0], m[1]); s += f[0] * (b[0] - a[0]) + f[1] * (b[1] - a[1]) } return s }
export const arcPoint = (t: number): Pt => [Math.cos(t), Math.sin(t)]

/** KG: ∫_C F·dr is the work done by the force field F along the curve C. */
export function buildLineIntegralsScene(): SceneSpec {
  return framed(raw_buildLineIntegralsScene())
}
function raw_buildLineIntegralsScene(): SceneSpec {
  const { o, u, k, lattice, arcN, marks } = LIN
  const G = (x: number, y: number): V3 => P(o[0] + x * u, o[1] + y * u)
  const field = lattice.flatMap((x) => lattice.flatMap((y) => (x === 0 && y === 0 ? [] : [arrow(G(x, y), G(x + k * rotF(x, y)[0] * 0.5, y + k * rotF(x, y)[1] * 0.5), ROLE.reference)])))
  const arcPts_ = Array.from({ length: arcN + 1 }, (_, i) => arcPoint((Math.PI / 2) * (i / arcN)))
  const onArc = Array.from({ length: marks }, (_, i) => { const t = (Math.PI / 2) * ((i + 0.5) / marks), p = arcPoint(t), f = rotF(p[0], p[1]); return arrow(G(p[0], p[1]), G(p[0] + 0.45 * f[0], p[1] + 0.45 * f[1]), ROLE.output) })
  const onChord = Array.from({ length: marks }, (_, i) => { const t = (i + 0.5) / marks, p: Pt = [1 - t, t], f = rotF(p[0], p[1]); return arrow(G(p[0], p[1]), G(p[0] + 0.45 * f[0], p[1] + 0.45 * f[1]), ROLE.input) })
  return {
    id: 'math-line-integrals',
    title: 'Line integrals: work along a path',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show the vector line integral ∫_C F·dr (the work done by F along C) for F = (−y, x) from (1, 0) to (0, 1): along the quarter-circle arc the field is everywhere tangent to the path with F·T = 1, so the work is the arc length π/2 ≈ 1.571; along the straight chord F·dr is smaller and the work is exactly 1. Two different paths between the same ends give different values, so this field is not conservative.',
    ariaLabel:
      'A lattice of small grey arrows circulating anticlockwise. A green quarter circle runs from the point (1, 0) to the point (0, 1) with blue arrows of the field along it, each pointing along the path, captioned arc, pi over 2, about 1.571. A violet straight chord joins the same two points with red field arrows that cut across it at an angle, captioned chord, 1, and the note path-dependent.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The force field F = (−y, x) (grey arrows) pushes anticlockwise round the origin. How much WORK does it do on a particle moved from A = (1, 0) to B = (0, 1)? That is the line integral ∫_C F·dr, which depends on the path C.', objects: [...field, dot(G(1, 0), ROLE.ink, 0.12), dot(G(0, 1), ROLE.ink, 0.12), label('A', P(G(1, 0)[0] + 0.3, G(1, 0)[1] - 0.3), ROLE.ink, 'primary'), label('B', P(G(0, 1)[0] - 0.1, G(0, 1)[1] + 0.4), ROLE.ink, 'primary')] },
      { narration: 'Path 1: the quarter-circle arc (green). Here F is exactly tangent to the path with length 1 everywhere (blue), so F·dr = ds and the work is the arc length π/2 ≈ 1.571.', objects: [curve(arcPts_.map((p) => G(p[0], p[1])), ROLE.result), ...onArc, label('arc: π/2 ≈ 1.571', P(G(0.9, 0.9)[0] + 1.4, G(0.9, 0.9)[1] + 0.2), ROLE.result, 'primary')] },
      { narration: 'Path 2: the straight chord from A to B (violet). The field (red) meets it at 45°, so only F·T = 1/√2 of it helps; over the length √2 the work is 1/√2 × √2 = 1. Same endpoints, different work (1.571 vs 1): the field is not conservative.', objects: [line(G(1, 0), G(0, 1), ROLE.aid, 0.05), ...onChord, label('chord: 1', P(G(0.5, 0.5)[0] + 1.3, G(0.5, 0.5)[1] - 0.4), ROLE.aid, 'primary'), label('path-dependent', P(G(0.2, -0.4)[0] + 1.6, G(0.2, -0.4)[1] - 0.3), ROLE.input, 'primary')] },
    ],
  }
}

// ── 9. Change of variables ───────────────────────────────────────────────────

/** Polar coordinates (x, y) = (r cos θ, r sin θ): the cell dr × dθ at r = 1.5 becomes a curved patch of area ≈ r dr dθ — the Jacobian is r. */
export const CHV = { uv: { x0: -4.2, y0: -1.7, ur: 1.3, ut: 2.0 }, xy: { c: [0.2, -1.7] as Pt, u: 1.3 }, r: [1, 2] as Pt, th: [0, Math.PI / 2] as Pt, cell: { r: [1.4, 1.6] as Pt, th: [0.5, 0.7] as Pt } }
export const polarT = (r: number, t: number): Pt => [r * Math.cos(t), r * Math.sin(t)]

/** KG: ∬ f dA = ∬ f(T(u, v)) |∂(x, y)/∂(u, v)| du dv; the Jacobian determinant is the local scaling factor. */
export function buildChangeOfVariablesScene(): SceneSpec {
  return framed(raw_buildChangeOfVariablesScene())
}
function raw_buildChangeOfVariablesScene(): SceneSpec {
  const { uv, xy, r, th, cell } = CHV
  const UV = (rr: number, t: number): V3 => P(uv.x0 + (rr - r[0]) * uv.ur, uv.y0 + t * uv.ut)
  const XYm = (rr: number, t: number): V3 => { const p = polarT(rr, t); return P(xy.c[0] + p[0] * xy.u, xy.c[1] + p[1] * xy.u) }
  const rs = [1, 1.25, 1.5, 1.75, 2], ts = [0, Math.PI / 8, Math.PI / 4, (3 * Math.PI) / 8, Math.PI / 2]
  const gridUV = [...rs.map((rr) => line(UV(rr, th[0]), UV(rr, th[1]), ROLE.reference, 0.02)), ...ts.map((t) => line(UV(r[0], t), UV(r[1], t), ROLE.reference, 0.02))]
  const gridXY = [...rs.map((rr) => curve(sampleMapped((t) => t, th[0], th[1], (t) => XYm(rr, t), 24), ROLE.reference)), ...ts.map((t) => line(XYm(r[0], t), XYm(r[1], t), ROLE.reference, 0.02))]
  const cellUV = polyLines([[UV(cell.r[0], cell.th[0])[0], UV(cell.r[0], cell.th[0])[1]], [UV(cell.r[1], cell.th[0])[0], UV(cell.r[1], cell.th[0])[1]], [UV(cell.r[1], cell.th[1])[0], UV(cell.r[1], cell.th[1])[1]], [UV(cell.r[0], cell.th[1])[0], UV(cell.r[0], cell.th[1])[1]]], ROLE.result, 0.045)
  const cellXY = [line(XYm(cell.r[0], cell.th[0]), XYm(cell.r[1], cell.th[0]), ROLE.result, 0.045), line(XYm(cell.r[0], cell.th[1]), XYm(cell.r[1], cell.th[1]), ROLE.result, 0.045), curve(sampleMapped((t) => t, cell.th[0], cell.th[1], (t) => XYm(cell.r[0], t), 10), ROLE.result), curve(sampleMapped((t) => t, cell.th[0], cell.th[1], (t) => XYm(cell.r[1], t), 10), ROLE.result)]
  return {
    id: 'math-change-of-variables',
    title: 'Change of variables: the Jacobian as a scaling factor',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show why a change of variables brings a Jacobian: the polar map (x, y) = T(r, θ) = (r cos θ, r sin θ) takes the rectangular grid in the (r, θ)-plane (left) to a curved grid on an annular sector (right); the small cell r ∈ [1.4, 1.6], θ ∈ [0.5, 0.7] of area dr·dθ = 0.04 becomes a patch of area ½(1.6² − 1.4²)(0.2) = 0.06 — 1.5 = r times as big — so dA = |J| dr dθ = r dr dθ and ∬ f dA = ∬ f(r cos θ, r sin θ) r dr dθ.',
    ariaLabel:
      'Left: a rectangle in the r theta plane, r from 1 to 2 across and theta from 0 to pi over 2 up, with a rectangular grid and one small green cell. Right: the image in the xy plane, a quarter of a ring from radius 1 to 2 with a curved grid and the corresponding small green curved patch. The cell has area 0.04 on the left and 0.06 on the right, captioned dr dtheta and r dr dtheta, with J equals r.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The (r, θ) rectangle 1 ≤ r ≤ 2, 0 ≤ θ ≤ π/2 (left) with a rectangular grid. The polar map T(r, θ) = (r cos θ, r sin θ) will carry it into the xy-plane.', objects: [...gridUV, label('r', P(uv.x0 + 1.5 * uv.ur, uv.y0 - 0.45), ROLE.reference, 'detail'), label('θ', P(uv.x0 - 0.4, uv.y0 + 1.6 * uv.ut), ROLE.reference, 'detail')] },
      { narration: 'Its image (right) is a quarter of an annulus: the straight grid lines have become circular arcs (r = const) and rays (θ = const). Cells that are all the same size in (r, θ) are NOT all the same size in (x, y).', objects: [...gridXY] },
      { narration: 'Take one small cell (green): in (r, θ) it is 0.2 × 0.2 = 0.04, but its image has area ½(1.6² − 1.4²)(0.2) = 0.06 — 1.5 times as large, which is r at the cell (r ≈ 1.5). The Jacobian |∂(x, y)/∂(r, θ)| = r is exactly this local scaling factor, so dA = r dr dθ.', objects: [...cellUV, ...cellXY, label('dr dθ', P(-2.1, -0.5), ROLE.result, 'primary'), label('r dr dθ', P(xy.c[0] + 1.3, xy.c[1] + 3.1), ROLE.result, 'primary'), label('J = r', P(-1.0, 1.6), ROLE.ink, 'primary')] },
    ],
  }
}

// ── 10. Double integrals ─────────────────────────────────────────────────────

/** ∬_D (x + y) dA over D = [0, 2] × [0, 1]: eight columns of height f at the cell centres sum to 3 = ∫₀²∫₀¹ (x + y) dy dx. */
export const DBL: Obl & { nx: number; ny: number; x1: number; y1: number } = { ox: -3.4, oy: -2.4, ux: 1.8, uz: 0.8, dxy: 1.2, dyy: 0.8, nx: 4, ny: 2, x1: 2, y1: 1 }
export const fDbl = (x: number, y: number) => x + y
export const doubleSum = () => { const dx = DBL.x1 / DBL.nx, dy = DBL.y1 / DBL.ny; let s = 0; for (let i = 0; i < DBL.nx; i++) for (let j = 0; j < DBL.ny; j++) s += fDbl((i + 0.5) * dx, (j + 0.5) * dy) * dx * dy; return s }

/** KG: ∬_D f dA is the volume under the surface z = f(x, y) over D, computed as an iterated integral (Fubini). */
export function buildDoubleIntegralsScene(): SceneSpec {
  return framed(raw_buildDoubleIntegralsScene())
}
function raw_buildDoubleIntegralsScene(): SceneSpec {
  const O = oblique(DBL), { nx, ny, x1, y1 } = DBL
  const dx = x1 / nx, dy = y1 / ny
  const needles: SceneObject[] = []
  for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) { const x = (i + 0.5) * dx, y = (j + 0.5) * dy; needles.push(line(O([x, y, 0]), O([x, y, fDbl(x, y)]), ROLE.output, 0.05), dot(O([x, y, fDbl(x, y)]), ROLE.output, 0.07)) }
  const base: SceneObject[] = [
    ...polyLines([[O([0, 0, 0])[0], O([0, 0, 0])[1]], [O([x1, 0, 0])[0], O([x1, 0, 0])[1]], [O([x1, y1, 0])[0], O([x1, y1, 0])[1]], [O([0, y1, 0])[0], O([0, y1, 0])[1]]], ROLE.reference, 0.03),
    ...Array.from({ length: nx - 1 }, (_, i) => line(O([(i + 1) * dx, 0, 0]), O([(i + 1) * dx, y1, 0]), ROLE.reference, 0.015)),
    ...Array.from({ length: ny - 1 }, (_, j) => line(O([0, (j + 1) * dy, 0]), O([x1, (j + 1) * dy, 0]), ROLE.reference, 0.015)),
  ]
  const plane = [[0, 0], [x1, 0], [x1, y1], [0, y1]].map((c, i, a) => line(O([c[0], c[1], fDbl(c[0], c[1])]), O([a[(i + 1) % 4][0], a[(i + 1) % 4][1], fDbl(a[(i + 1) % 4][0], a[(i + 1) % 4][1])]), ROLE.result, 0.04))
  return {
    id: 'math-double-integrals',
    title: 'Double integral: volume under a surface',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show ∬_D f dA as a volume: over the rectangle D = [0, 2] × [0, 1] split into 4 × 2 cells, a column of height f(x, y) = x + y above each cell centre has volume f × ΔA = f × 0.25; the eight columns total 3, matching the iterated integral ∫₀²(∫₀¹ (x + y) dy) dx = ∫₀² (x + ½) dx = 2 + 1 = 3 (Fubini): integrate over y first, then x.',
    ariaLabel:
      'A rectangle on the floor, 2 wide and 1 deep, divided into 4 by 2 cells, drawn in oblique perspective. Over the centre of each cell stands a blue needle whose height is x plus y, the heights rising from 0.5 at the near left corner to 2.5 at the far right. In the second step a green outline shows the plane z equals x plus y that the needle tops lie on. Captions say the sum of f times area is 3, and the iterated integral from 0 to 2 of x plus one half equals 3.',
    stage: NO_STAGE,
    steps: [
      { narration: 'D = [0, 2] × [0, 1] is split into 4 × 2 = 8 cells of area ΔA = 0.25. Over each cell centre (xᵢ, yⱼ) stand a column of height f = x + y (blue needles): from 0.5 over the near-left cell up to 2.5 over the far-right one.', objects: [...base, ...needles] },
      { narration: 'The needle tops all lie on the plane z = x + y (green): the surface whose volume over D we want.', objects: [...plane, label('z = x + y', P(O([x1, y1, 3])[0] + 0.4, O([x1, y1, 3])[1] + 0.2), ROLE.result, 'primary')] },
      { narration: 'Riemann sum: Σ f(xᵢ, yⱼ) ΔA = 0.25 × (0.5 + 1 + … ) = 3 (exact here because f is linear). As the cells shrink the sum becomes ∬_D f dA, and Fubini lets us compute it as ∫₀²(∫₀¹ (x + y) dy)dx = ∫₀² (x + ½) dx = 3.', objects: [label('Σ f ΔA = 3', P(-3.4, 3.0), ROLE.output, 'primary'), label('∫₀² (x + ½) dx = 3', P(-3.4, 2.3), ROLE.result, 'primary')] },
    ],
  }
}

// ── 11. Multiple integrals (Fubini, both orders) ─────────────────────────────

/** D = the triangle 0 ≤ y ≤ x ≤ 1: vertical strips (dy dx) and horizontal strips (dx dy) both give area ½ (and ∬ (x + y) dA = ½ in either order). */
export const FUB = { left: [-4.2, -2.0] as Pt, right: [0.4, -2.0] as Pt, u: 3.8, n: 6 }
export const fubiniArea = (n: number, vertical: boolean) => { let s = 0; for (let i = 0; i < n; i++) { const t = (i + 0.5) / n; s += (vertical ? t : 1 - t) / n } return s }

/** KG: multiple integrals are evaluated as iterated integrals, in either order (Fubini). */
export function buildMultipleIntegralsScene(): SceneSpec {
  return framed(raw_buildMultipleIntegralsScene())
}
function raw_buildMultipleIntegralsScene(): SceneSpec {
  const { left, right, u, n } = FUB
  const L = (x: number, y: number): V3 => P(left[0] + x * u, left[1] + y * u)
  const R = (x: number, y: number): V3 => P(right[0] + x * u, right[1] + y * u)
  const tri = (M: (x: number, y: number) => V3) => [line(M(0, 0), M(1, 0), ROLE.reference, 0.03), line(M(1, 0), M(1, 1), ROLE.reference, 0.03), line(M(0, 0), M(1, 1), ROLE.reference, 0.03)]
  const vert = Array.from({ length: n }, (_, i) => { const x = (i + 0.5) / n; return line(L(x, 0), L(x, x), ROLE.output, 0.1) })
  const horiz = Array.from({ length: n }, (_, j) => { const y = (j + 0.5) / n; return line(R(y, y), R(1, y), ROLE.input, 0.1) })
  return {
    id: 'math-multiple-integrals',
    title: "Multiple integrals: Fubini's two orders",
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: "Show Fubini's theorem on the triangle D = {0 ≤ y ≤ x ≤ 1}: slicing into VERTICAL strips (fix x, then y runs 0 → x: ∫₀¹∫₀ˣ dy dx) or into HORIZONTAL strips (fix y, then x runs y → 1: ∫₀¹∫ᵧ¹ dx dy) covers the same region, so the two iterated integrals agree — both give the area ½ (and ∬ (x + y) dA = ½ either way).",
    ariaLabel:
      'Two copies of the same right triangle with corners at (0, 0), (1, 0) and (1, 1). Left: it is filled with six blue vertical strips, each rising from the bottom edge to the diagonal. Right: it is filled with six red horizontal strips, each running from the diagonal to the right edge. Captions say d y d x and d x d y, and that both orders give the area one half.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The region D is the triangle 0 ≤ y ≤ x ≤ 1. A double integral over D can be computed as an ITERATED integral, and Fubini\'s theorem says the order does not matter. Two copies of D:', objects: [...tri(L), ...tri(R)] },
      { narration: 'Order dy dx: fix x, let y run from 0 to x (a vertical strip of height x, blue), then add up the strips for x from 0 to 1: ∫₀¹ ∫₀ˣ dy dx = ∫₀¹ x dx = ½.', objects: [...vert, label('dy dx', P(left[0] + 0.65 * u, left[1] - 0.55), ROLE.output, 'primary')] },
      { narration: 'Order dx dy: fix y, let x run from y to 1 (a horizontal strip of length 1 − y, red), then add the strips for y from 0 to 1: ∫₀¹ ∫ᵧ¹ dx dy = ∫₀¹ (1 − y) dy = ½. Same region, same answer: Fubini.', objects: [...horiz, label('dx dy', P(right[0] + 0.65 * u, right[1] - 0.55), ROLE.input, 'primary'), label('both orders: area ½', P(-1.6, 2.7), ROLE.result, 'primary')] },
    ],
  }
}

// ── 12. Triple integrals ─────────────────────────────────────────────────────

/** The solid cylinder x² + y² ≤ 1, 0 ≤ z ≤ 2 in cylindrical coordinates: dV = r dr dθ dz and ∭ dV = ∫₀²∫₀^2π∫₀¹ r dr dθ dz = 2π. */
export const TRI: Obl & { R: number; H: number; el: { r: Pt; th: Pt; z: Pt } } = { ox: -0.8, oy: -2.6, ux: 1.8, uz: 1.3, dxy: 0.9, dyy: 0.6, R: 1, H: 2, el: { r: [0.6, 0.8], th: [0.9, 1.1], z: [0.8, 1.2] } }
export const cylPoint = (r: number, th: number, z: number): Pt3 => [r * Math.cos(th), r * Math.sin(th), z]
export const tripleVolume = () => simpsonN((rr) => 2 * Math.PI * 2 * rr, 0, TRI.R)
function simpsonN(f: (x: number) => number, a: number, b: number, n = 2000) { const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 === 1 ? 4 : 2); return (s * h) / 3 }

/** KG: ∭_E f dV, in cylindrical (r, θ, z) or spherical coordinates via the Jacobian (r for cylindrical). */
export function buildTripleIntegralsScene(): SceneSpec {
  return framed(raw_buildTripleIntegralsScene())
}
function raw_buildTripleIntegralsScene(): SceneSpec {
  const O = oblique(TRI), { R, H, el } = TRI
  const ring = (z: number) => curve(Array.from({ length: 73 }, (_, i) => O([R * Math.cos((2 * Math.PI * i) / 72), R * Math.sin((2 * Math.PI * i) / 72), z])), ROLE.reference)
  const sides = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((t) => line(O(cylPoint(R, t, 0)), O(cylPoint(R, t, H)), ROLE.reference, 0.02))
  const corner = (ri: number, ti: number, zi: number) => O(cylPoint(el.r[ri], el.th[ti], el.z[zi]))
  const edges: SceneObject[] = []
  for (const a of [0, 1]) for (const b of [0, 1]) { edges.push(line(corner(0, a, b), corner(1, a, b), ROLE.result, 0.03), line(corner(a, 0, b), corner(a, 1, b), ROLE.result, 0.03), line(corner(a, b, 0), corner(a, b, 1), ROLE.result, 0.03)) }
  return {
    id: 'math-triple-integrals',
    title: 'Triple integral in cylindrical coordinates',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a triple integral ∭_E dV over the solid cylinder x² + y² ≤ 1, 0 ≤ z ≤ 2 in cylindrical coordinates (r, θ, z): a small box of sides dr, r dθ and dz has volume r dr dθ dz (the Jacobian r again), and adding them up, ∭ dV = ∫₀² ∫₀^2π ∫₀¹ r dr dθ dz = 1/2 × 2π × 2 = 2π — the volume πR²h of the cylinder.',
    ariaLabel:
      'A solid cylinder drawn in oblique perspective: a grey ellipse for the base of radius 1, a grey ellipse for the top at height 2, and four grey vertical lines. In the second step a small green box sits inside, spanning a little radius, angle and height, captioned volume element r dr d theta dz. A final caption says the triple integral of dV equals 2 pi.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The solid E: a cylinder of radius 1 and height 2 (x² + y² ≤ 1, 0 ≤ z ≤ 2). In cylindrical coordinates it is simply 0 ≤ r ≤ 1, 0 ≤ θ ≤ 2π, 0 ≤ z ≤ 2 — a rectangular box in (r, θ, z).', objects: [ring(0), ring(H), ...sides, label('0 ≤ z ≤ 2', P(O([R, 0, H / 2])[0] + 1.4, O([R, 0, H / 2])[1]), ROLE.ink, 'primary')] },
      { narration: 'Chop E into tiny pieces dr × dθ × dz. A piece at radius r has a width r dθ along the circle, so its volume is dV = dr · (r dθ) · dz = r dr dθ dz — the factor r is the Jacobian of cylindrical coordinates.', objects: [...edges, label('volume element r dr dθ dz', P(O([0, 0, 0])[0] + 0.1, O([0, 0, 0])[1] - 1.4), ROLE.result, 'primary')] },
      { narration: 'Add all the pieces: ∭_E dV = ∫₀² ∫₀^2π ∫₀¹ r dr dθ dz = (½)(2π)(2) = 2π — agreeing with πR²h = π·1²·2.', objects: [label('∭ dV = 2π', P(O([0, 0, 0])[0] + 0.1, O([0, 0, 0])[1] - 2.2), ROLE.result, 'primary')] },
    ],
  }
}

// ── 13. Surface integrals ────────────────────────────────────────────────────

/** The tilted unit-square patch z = x/2 over [0, 1]²: dS = √1.25 dA, n = (−½, 0, 1)/√1.25, and the flux of F = (0, 0, 1) is ∬ F·n dS = 1. */
export const SRF: Obl & { pts: ReadonlyArray<Pt> } = { ox: -1.8, oy: -2.4, ux: 2.4, uz: 2.4, dxy: 1.2, dyy: 0.9, pts: [[0.25, 0.25], [0.75, 0.25], [0.25, 0.75], [0.75, 0.75]] }
export const patchZ = (x: number) => x / 2
export const patchNormal = (): Pt3 => { const n: Pt3 = [-0.5, 0, 1], l = Math.hypot(...n); return [n[0] / l, n[1] / l, n[2] / l] }

/** KG: the flux ∬_S F·dS = ∬_S F·n dS of a vector field through a surface. */
export function buildSurfaceIntegralsScene(): SceneSpec {
  return framed(raw_buildSurfaceIntegralsScene())
}
function raw_buildSurfaceIntegralsScene(): SceneSpec {
  const O = oblique(SRF), n = patchNormal()
  const corner = (x: number, y: number): Pt3 => [x, y, patchZ(x)]
  const grid: SceneObject[] = [0, 0.5, 1].flatMap((t) => [line(O(corner(t, 0)), O(corner(t, 1)), ROLE.reference, 0.02), line(O(corner(0, t)), O(corner(1, t)), ROLE.reference, 0.02)])
  const rim = [[0, 0], [1, 0], [1, 1], [0, 1]].map((c, i, a) => line(O(corner(c[0], c[1])), O(corner(a[(i + 1) % 4][0], a[(i + 1) % 4][1])), ROLE.result, 0.05))
  const normals = SRF.pts.map(([x, y]) => { const p = corner(x, y); return arrow(O(p), O([p[0] + 0.55 * n[0], p[1] + 0.55 * n[1], p[2] + 0.55 * n[2]]), ROLE.input) })
  const fields = SRF.pts.map(([x, y]) => { const p = corner(x, y); return arrow(O(p), O([p[0], p[1], p[2] + 0.55]), ROLE.output) })
  return {
    id: 'math-surface-integrals',
    title: 'Surface integral: flux through a patch',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the flux ∬_S F·dS = ∬_S F·n dS of the constant field F = (0, 0, 1) (straight up) through the tilted unit-square patch z = x/2: the unit normal is n = (−½, 0, 1)/√1.25, so F·n = 1/√1.25 ≈ 0.894, the patch has area dS = √1.25 dA ≈ 1.118 times its shadow, and the flux is 0.894 × 1.118 = 1 — the same as the flux through the flat shadow, as it must be.',
    ariaLabel:
      'A tilted square patch drawn in oblique perspective, higher on its right side, with a grid of lines. Four blue arrows rise straight up from points on it, the field F; four red arrows leave the same points at right angles to the patch, tilting slightly to the left, the unit normal n. Captions give F equals (0, 0, 1), F dot n about 0.89, area element 1.12 times d A, and the flux of F through the patch equals 1.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The surface S: the tilted square z = x/2 over 0 ≤ x, y ≤ 1 (green rim). Its area is not 1: tilted, it is larger than its shadow on the floor by the factor √(1 + (∂z/∂x)²) = √1.25 ≈ 1.118, so dS = 1.118 dA.', objects: [...grid, ...rim, label('dS = 1.12 dA', P(O([1, 1, 0.5])[0] + 0.1, O([1, 1, 0.5])[1] + 0.8), ROLE.result, 'primary')] },
      { narration: 'The field F = (0, 0, 1) points straight up (blue). The flux counts only the part of F that goes THROUGH the surface, F · n, where n is the unit normal (red) perpendicular to the patch: n = (−½, 0, 1)/√1.25, so F · n = 1/√1.25 ≈ 0.894.', objects: [...fields, ...normals, label('F = (0, 0, 1)', P(O([0, 0, 1.3])[0] - 0.1, O([0, 0, 1.3])[1] + 0.3), ROLE.output, 'primary'), label('F·n = 0.89', P(O([0.5, 0.5, 1.4])[0] - 1.4, O([0.5, 0.5, 1.4])[1] + 0.4), ROLE.input, 'primary')] },
      { narration: 'Flux = ∬ F · n dS = (F · n) × (area) = 0.894 × 1.118 = 1 — exactly the flux through the flat shadow (area 1 times F · k = 1). The surface integral weights every little piece of surface by how squarely the field crosses it.', objects: [label('∬ F·dS = 1', P(O([0.5, 0.5, 0])[0] + 0.2, O([0.5, 0.5, 0])[1] - 1.1), ROLE.result, 'primary')] },
    ],
  }
}

// ── 14. Divergence theorem ───────────────────────────────────────────────────

/** F = (x, y, z) on the unit ball: outward flux through the sphere ∬ F·n dS = 1 × 4π equals ∭ ∇·F dV = 3 × (4π/3) = 4π. */
export const DVT: Obl & { R: number; axes: ReadonlyArray<Pt3> } = { ox: 0.0, oy: -0.2, ux: 1.7, uz: 1.7, dxy: 0.9, dyy: 0.6, R: 1, axes: [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]] }
export const fluxSphere = () => 1 * 4 * Math.PI                                                                                                                 // F·n = 1 on the unit sphere, area 4π
export const divVolume = () => 3 * ((4 / 3) * Math.PI)                                                                                                           // ∇·F = 3, ball volume 4π/3

/** KG: ∭_E ∇·F dV = ∬_S F·dS: total divergence inside equals the outward flux through the boundary. */
export function buildDivergenceTheoremScene(): SceneSpec {
  return framed(raw_buildDivergenceTheoremScene())
}
function raw_buildDivergenceTheoremScene(): SceneSpec {
  const O = oblique(DVT), { R, axes } = DVT
  const great = (f: (t: number) => Pt3) => curve(Array.from({ length: 73 }, (_, i) => O(f((2 * Math.PI * i) / 72))), ROLE.reference)
  const circles = [great((t) => [R * Math.cos(t), R * Math.sin(t), 0]), great((t) => [R * Math.cos(t), 0, R * Math.sin(t)]), great((t) => [0, R * Math.cos(t), R * Math.sin(t)])]
  const out = axes.map((a) => arrow(O(a), O([1.45 * a[0], 1.45 * a[1], 1.45 * a[2]]), ROLE.result))
  return {
    id: 'math-divergence-theorem',
    title: 'Divergence theorem: flux out = total divergence inside',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the divergence theorem ∭_E ∇·F dV = ∬_S F·dS on the unit ball E for F = (x, y, z): on the sphere S the field points straight out, F · n = 1, so the outward flux is 1 × (area 4π) = 4π; inside, ∇·F = 1 + 1 + 1 = 3 everywhere, so the integral of the divergence is 3 × (volume 4π/3) = 4π — the same number: what flows out through the boundary is exactly what the sources inside produce.',
    ariaLabel:
      'A sphere drawn as three grey great circles in oblique perspective, with six green arrows leaving it outward along the six axis directions, the field F equals (x, y, z). Captions say the flux through the sphere, the integral of F dot dS, equals 4 pi because F dot n is 1 on the unit sphere with area 4 pi; and the integral of the divergence over the ball equals 3 times 4 pi over 3 equals 4 pi; the two agree.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The solid E is the unit ball and its boundary S the unit sphere (three grey great circles). The field F = (x, y, z) points straight away from the origin; green arrows show it on the surface, perpendicular to S.', objects: [...circles, ...out, label('F = (x, y, z)', P(O([0, 0, 1.45])[0] + 1.6, O([0, 0, 1.45])[1]), ROLE.result, 'primary')] },
      { narration: 'Flux through the surface: on the unit sphere the outward unit normal is n = (x, y, z), so F · n = x² + y² + z² = 1 everywhere, and ∬_S F·dS = 1 × area(S) = 1 × 4π = 4π.', objects: [label('∬ F·dS = 4π', P(O([0, 0, -1.45])[0] - 0.4, O([0, 0, -1.45])[1] - 0.6), ROLE.output, 'primary')] },
      { narration: 'Divergence inside: ∇·F = ∂x/∂x + ∂y/∂y + ∂z/∂z = 3 at every point, so ∭_E ∇·F dV = 3 × volume(E) = 3 × 4π/3 = 4π. The two sides agree — the divergence theorem: the total source strength inside equals the net flux out through the boundary.', objects: [label('3 × (4π/3) = 4π', P(O([0, 0, -1.45])[0] - 0.4, O([0, 0, -1.45])[1] - 1.5), ROLE.result, 'primary')] },
    ],
  }
}
