/**
 * Core mathematics figures — batch 40 of the mathematics visual campaign (2026-10-13): four topology helpers (topological space,
 * product topology, homotopy equivalence, homology), four optimisation helpers (convex optimisation, quadratic programming, integer
 * programming, dynamic programming) and three functional-analysis helpers (normed spaces, distributions, special functions).
 *
 * Same rules as batches 1-39: one visual language from visualDesign.ts, labels are names not sentences (marks of 1-2 characters are
 * free), steps are cumulative, coordinates stay inside +-5, at most 50 objects per step, nothing the figure audit rejects (SM-01
 * evaluates the arithmetic in a label left to right: never write "1 × 5 + 2 × 7 = 19" as one label, and two labels that end in the
 * same name before "=" must not carry different numbers), and every count, distance, value and area a figure states is re-derived by
 * the test file from the DRAWN boxes, curves, dots, lines and arrows.
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
/** A closed rectangle as four lines. */
const rect = (r: readonly [number, number, number, number], color: string, t = 0.05): SceneObject[] => [
  ln([r[0], r[1]], [r[2], r[1]], color, t), ln([r[2], r[1]], [r[2], r[3]], color, t), ln([r[2], r[3]], [r[0], r[3]], color, t), ln([r[0], r[3]], [r[0], r[1]], color, t),
]
/** Maps graph coordinates (x, y) to the figure: screen = origin + (x · ux, y · uy). */
export type Frame = { ox: number; oy: number; ux: number; uy: number }
export const at = (f: Frame, x: number, y: number): Pt => [f.ox + x * f.ux, f.oy + y * f.uy]
const mapOf = (f: Frame) => (x: number, y: number): V3 => P(f.ox + x * f.ux, f.oy + y * f.uy)
const curveOf = (f: Frame, fn: (x: number) => number, x0: number, x1: number, color: string, n = 60): SceneObject => curve(sampleMapped(fn, x0, x1, mapOf(f), n), color)
const lineAt = (f: Frame, a: Pt, b: Pt, color: string, t = 0.04): SceneObject => ln(at(f, a[0], a[1]), at(f, b[0], b[1]), color, t)
const dotAt = (f: Frame, x: number, y: number, color: string, r = 0.14): SceneObject => dt(at(f, x, y), color, r)
const arrowAt = (f: Frame, a: Pt, b: Pt, color: string): SceneObject => ar(at(f, a[0], a[1]), at(f, b[0], b[1]), color)
const axesOf = (f: Frame, x0: number, x1: number, y0: number, y1: number): SceneObject[] => [arrowAt(f, [x0, 0], [x1, 0], ROLE.reference), arrowAt(f, [0, y0], [0, y1], ROLE.reference)]

// ── 1. Topological space ─────────────────────────────────────────────────────

/** X = {a, b, c} with τ = {∅, {a}, {a, b}, X}: the open sets are nested boxes round the points (a, b, c). Rectangles are [x0, y0, x1, y1]. */
export const TPS = {
  X: [-4.2, -2.3, 4.2, 2.3] as const,
  AB: [-3.6, -1.7, 1.3, 1.7] as const,
  A: [-3.0, -1.1, -0.9, 1.1] as const,
  pts: { a: [-1.95, 0] as Pt, b: [0.2, 0] as Pt, c: [2.8, 0] as Pt },
}

/** KG: τ contains ∅ and X, is closed under arbitrary unions and finite intersections; open sets generalise neighbourhoods beyond metric spaces. */
export function buildTopologicalSpaceScene(): SceneSpec {
  return framed(raw_buildTopologicalSpaceScene())
}
function raw_buildTopologicalSpaceScene(): SceneSpec {
  const { X, AB, A, pts } = TPS
  const names = ['a', 'b', 'c'] as const
  return {
    id: 'math-topological-space',
    title: 'Topological space: a family of open sets',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a topology on the three-point set X = {a, b, c}: the open sets are τ = {∅, {a}, {a, b}, X}, drawn as nested boxes (green, blue, grey). The union {a} ∪ {a, b} = {a, b} and the intersection {a} ∩ {a, b} = {a} stay in τ, as the axioms demand. The point a lies in 3 open sets, b in 2 and c in 1; the set {a, c} is not open — no drawn box holds exactly a and c.',
    ariaLabel:
      'Three nested rectangles: a large grey one called X, inside it a blue one called a b, inside that a small green one called a. Three dots: a inside the green box, b inside the blue box only, c inside the grey box only. In the second step the captions tau equals the empty set, a, a b and X, and the union and intersection of a and a b appear. In the third step the numbers 3, 2 and 1 under the dots count the open sets containing each point, and the caption a c is not in tau appears.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The set X = {a, b, c}. Draw the open sets as boxes: {a} (green) sits inside {a, b} (blue) inside X (grey). The point a is in the smallest box, b one box out, c only in X.', objects: [...rect(X, ROLE.reference), ...rect(AB, ROLE.output), ...rect(A, ROLE.result), ...names.map((n) => dt(pts[n], ROLE.ink, 0.15)), ...names.map((n) => lb(n, [pts[n][0] + 0.42, pts[n][1]])), lb('X', [3.8, 1.9]), lb('{a, b}', [0.2, 0.95], ROLE.output), lb('{a}', [-1.95, 0.8], ROLE.result)] },
      { narration: 'The topology is τ = {∅, {a}, {a, b}, X} (∅ is open too). Check the axioms: the union {a} ∪ {a, b} = {a, b} is open, and the intersection {a} ∩ {a, b} = {a} is open. Every union and every finite intersection of these boxes is again one of them.', objects: [lb('τ = {∅, {a}, {a, b}, X}', [0, -2.9], ROLE.ink), lb('{a} ∪ {a, b} = {a, b}', [0, 3.05], ROLE.aid), lb('{a} ∩ {a, b} = {a}', [0, 3.65], ROLE.aid)] },
      { narration: 'Count the open sets that contain each point: a is in 3 ({a}, {a, b}, X), b in 2, c in 1. The set {a, c} is not open: no box holds exactly a and c, because the smallest open set around c is X, which also holds b.', objects: [...names.map((n, i) => lb(String(3 - i), [pts[n][0], pts[n][1] - 0.62], ROLE.result)), lb('open sets around each point', [0, -3.5], ROLE.result), lb('{a, c} ∉ τ', [0, -4.15], ROLE.input)] },
    ],
  }
}

// ── 2. Product topology ──────────────────────────────────────────────────────

/** X × Y drawn as the plane: U = (1, 3) on the X axis, V = (0.5, 2) on the Y axis. π₁⁻¹(U) is the vertical strip, π₂⁻¹(V) the horizontal one, their intersection is the basic open set U × V. */
export const PRD: Frame = { ox: -4.0, oy: -2.4, ux: 1.7, uy: 1.7 }
export const prdU = [1, 3] as const
export const prdV = [0.5, 2] as const
export const prdSpan = { x: 4, y: 3.2 }
const prdVLabel: Pt = [3.6, -0.95]

/** KG: basis U × V for open U ⊆ X, V ⊆ Y; the subbasis π₁⁻¹(U), π₂⁻¹(V); projections are continuous. */
export function buildProductSpaceScene(): SceneSpec {
  return framed(raw_buildProductSpaceScene())
}
function raw_buildProductSpaceScene(): SceneSpec {
  const [u0, u1] = prdU, [v0, v1] = prdV
  const { x: W, y: H } = prdSpan
  return {
    id: 'math-product-space',
    title: 'Product topology: the basic open set U × V',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how the product topology on X × Y is built. Take an open interval U = (1, 3) of X and V = (0.5, 2) of Y. The preimage π₁⁻¹(U) is the vertical strip of all points whose X coordinate is in U (blue); π₂⁻¹(V) is the horizontal strip of all points whose Y coordinate is in V (red). Their intersection is the rectangle U × V (green), a basic open set; projecting it back gives U and V.',
    ariaLabel:
      'A plane with a horizontal X axis and a vertical Y axis. On the X axis a thick blue segment from 1 to 3 captioned U equals open 1 3, on the Y axis a thick red segment from 0.5 to 2 captioned V equals open 0.5 2. In the second step two vertical blue lines at 1 and 3 form the strip pi 1 inverse of U, and two horizontal red lines at 0.5 and 2 form the strip pi 2 inverse of V. In the third step the rectangle where the strips cross is outlined in green and captioned U times V.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The plane X × Y with an open interval U = (1, 3) of X (blue, on the X axis) and V = (0.5, 2) of Y (red, on the Y axis).', objects: [...axesOf(PRD, -0.2, W + 0.15, -0.2, H + 0.15), lineAt(PRD, [u0, 0], [u1, 0], ROLE.output, 0.1), lineAt(PRD, [0, v0], [0, v1], ROLE.input, 0.1), lb('X', at(PRD, W + 0.3, 0)), lb('Y', at(PRD, 0, H + 0.4)), lb('U = (1, 3)', [3.7, 0.6], ROLE.output), lb('V = (0.5, 2)', [3.7, -0.3], ROLE.input)] },
      { narration: 'The preimage π₁⁻¹(U) = all points with X coordinate in U is a vertical strip (blue); π₂⁻¹(V) is the horizontal strip (red). Each is open in the product topology: they are the subbasis sets.', objects: [lineAt(PRD, [u0, 0], [u0, H], ROLE.output, 0.05), lineAt(PRD, [u1, 0], [u1, H], ROLE.output, 0.05), lineAt(PRD, [0, v0], [W, v0], ROLE.input, 0.05), lineAt(PRD, [0, v1], [W, v1], ROLE.input, 0.05), lb('π₁⁻¹(U)', [at(PRD, (u0 + u1) / 2, 0)[0], at(PRD, 0, H + 0.2)[1]], ROLE.output), lb('π₂⁻¹(V)', prdVLabel, ROLE.input)] },
      { narration: 'Where the two strips cross is the rectangle U × V (green): the intersection of two subbasis sets, a basic open set. Its projection to X is U and its projection to Y is V — so both projections are continuous.', objects: [...rect([at(PRD, u0, v0)[0], at(PRD, u0, v0)[1], at(PRD, u1, v1)[0], at(PRD, u1, v1)[1]], ROLE.result, 0.09), lb('U × V', at(PRD, (u0 + u1) / 2, (v0 + v1) / 2), ROLE.result), lb('projections: U and V', [3.2, 1.9], ROLE.aid)] },
    ],
  }
}

// ── 3. Homotopy equivalence ──────────────────────────────────────────────────

/** ℝ² ∖ {0} (the plane with the origin removed) retracts radially onto the unit circle S¹: p ↦ p/|p|. Three sample points p at the radii 2, 0.5, 1.6 (in units of the circle's radius) and angles 35°, 150°, 250°. */
export const HEQ = { c: [-1.4, 0] as Pt, R: 1.3, pts: [[2, 35], [0.5, 150], [1.6, 250]] as ReadonlyArray<readonly [number, number]> }
export const heqPt = (r: number, deg: number): Pt => [HEQ.c[0] + HEQ.R * r * Math.cos((deg * Math.PI) / 180), HEQ.c[1] + HEQ.R * r * Math.sin((deg * Math.PI) / 180)]

/** KG: X ≃ Y if f: X → Y, g: Y → X with g∘f ≃ id and f∘g ≃ id; S¹ and ℝ²∖{0} are homotopy equivalent. */
export function buildHomotopyEquivalenceScene(): SceneSpec {
  return framed(raw_buildHomotopyEquivalenceScene())
}
function raw_buildHomotopyEquivalenceScene(): SceneSpec {
  const { c, R, pts } = HEQ
  const circle = curve(Array.from({ length: 61 }, (_, k) => { const a = (2 * Math.PI * k) / 60; return P(c[0] + R * Math.cos(a), c[1] + R * Math.sin(a)) }), ROLE.result)
  return {
    id: 'math-homotopy-equivalence',
    title: 'Homotopy equivalence: the punctured plane and the circle',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show why S¹ and the punctured plane ℝ² ∖ {0} are homotopy equivalent. f is the inclusion of the unit circle (green) into the plane without the origin; g sends p to p/|p|, the point of the circle in the same direction. g∘f is the identity (points of the circle stay put), and f∘g is homotopic to the identity: each point p slides along its ray to the circle, and the midpoint of the slide (t = ½) lies at the radius (|p| + 1)/2.',
    ariaLabel:
      'The unit circle in green around a small hollow marker for the removed origin, and three blue dots, two outside the circle and one inside, none at the origin. In the second step a violet arrow from each blue dot straight along its ray to the point of the circle in the same direction, with a green dot where it lands. In the third step a violet dot marks the midpoint of each arrow, and the captions g after f equals the identity and f after g is homotopic to the identity appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The plane with the origin removed (the hollow mark is the missing point 0) and three of its points p (blue); the unit circle S¹ (green) lies in it.', objects: [circle, dt(c, ROLE.reference, 0.08), ...pts.map(([r, d]) => dt(heqPt(r, d), ROLE.output, 0.14)), lb('S¹', [heqPt(1, 98)[0] - 0.55, heqPt(1, 98)[1] + 0.2], ROLE.result), lb('0 removed', [c[0], c[1] - 0.55], ROLE.reference), lb('ℝ² ∖ {0}', [3.3, 2.6], ROLE.output)] },
      { narration: 'g sends each p to p/|p|: slide it straight along its ray to the circle (violet arrow, green landing point). A point already on the circle does not move, so g∘f = id.', objects: [...pts.map(([r, d]) => ar(heqPt(r, d), heqPt(1, d), ROLE.aid)), ...pts.map(([, d]) => dt(heqPt(1, d), ROLE.result, 0.12)), lb('g: p ↦ p/|p|', [3.3, 1.5], ROLE.aid)] },
      { narration: 'The slide is a homotopy from the identity (t = 0) to f∘g (t = 1): at t = ½ each point is halfway, at the radius (|p| + 1)/2 (violet dots). So f∘g ≃ id, and S¹ ≃ ℝ² ∖ {0} although they are not homeomorphic.', objects: [...pts.map(([r, d]) => dt(heqPt((r + 1) / 2, d), ROLE.aid, 0.1)), lb('t = ½', [3.3, 0.4], ROLE.aid), lb('g ∘ f = id', [3.3, -0.7], ROLE.result), lb('f ∘ g ≃ id', [3.3, -1.7], ROLE.result)] },
    ],
  }
}

// ── 4. Homology ──────────────────────────────────────────────────────────────

/** Betti numbers read from the drawing: a point (1 piece, 0 loops), a circle (1, 1), a figure-eight (1, 2) and two separate circles (2, 2). */
export const HML = {
  point: [-3.2, 1.3] as Pt,
  circle: { c: [0, 1.3] as Pt, r: 0.8 },
  eight: { cs: [[2.55, 1.3], [3.85, 1.3]] as ReadonlyArray<Pt>, r: 0.65 },
  two: { cs: [[-0.9, -1.9], [0.9, -1.9]] as ReadonlyArray<Pt>, r: 0.6 },
}
const hmlLoop = (c: Pt, r: number): SceneObject => curve(Array.from({ length: 49 }, (_, k) => { const a = (2 * Math.PI * k) / 48; return P(c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)) }), ROLE.output)

/** KG: Hₙ(X) are abelian groups; H₀ counts connected components, H₁ the loops that bound no disc, H₂ the 2-D holes; homotopy invariant. */
export function buildHomologyScene(): SceneSpec {
  return framed(raw_buildHomologyScene())
}
function raw_buildHomologyScene(): SceneSpec {
  const { point, circle, eight, two } = HML
  const nums = (c: Pt, y: number, pieces: number, loops: number): SceneObject[] => [lb(String(pieces), [c[0] - 0.4, y], ROLE.output), lb(String(loops), [c[0] + 0.4, y], ROLE.input)]
  return {
    id: 'math-homology',
    title: 'Homology: pieces and loops',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show what the first two homology groups count. H₀ counts the connected pieces of a space (blue numbers) and H₁ counts its independent loops (red numbers): a point has 1 piece and 0 loops, a circle 1 piece and 1 loop, a figure-eight (two circles touching at one point) 1 piece and 2 loops. Two separate circles have 2 pieces and 2 loops — the same number of loops as the figure-eight but a different number of pieces.',
    ariaLabel:
      'In the first step a single dot, a circle and a figure-eight made of two circles that touch at one point, in a row. In the second step a blue number and a red number appear under each: 1 and 0 under the dot, 1 and 1 under the circle, 1 and 2 under the figure-eight, with the captions H zero pieces in blue and H one loops in red. In the third step two separate circles appear below with the numbers 2 and 2 and the caption not connected.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Three spaces: a point, a circle and a figure-eight (two circles that touch in one point).', objects: [dt(point, ROLE.output, 0.16), hmlLoop(circle.c, circle.r), hmlLoop(eight.cs[0], eight.r), hmlLoop(eight.cs[1], eight.r)] },
      { narration: 'H₀ counts the connected pieces (blue); H₁ counts the independent loops that bound no disc (red). Point: 1 piece, 0 loops. Circle: 1 piece, 1 loop. Figure-eight: still 1 piece (the circles touch) but 2 loops.', objects: [...nums(point, 0.0, 1, 0), ...nums(circle.c, 0.0, 1, 1), ...nums([(eight.cs[0][0] + eight.cs[1][0]) / 2, 0], 0.0, 1, 2), lb('H₀: pieces', [-3.4, 3.0], ROLE.output), lb('H₁: loops', [-3.4, 2.4], ROLE.input)] },
      { narration: 'Two separate circles: 2 pieces and 2 loops. They have as many loops as the figure-eight, but H₀ tells them apart — the two circles are not connected.', objects: [hmlLoop(two.cs[0], two.r), hmlLoop(two.cs[1], two.r), ...nums([0, two.cs[0][1]], -3.1, 2, 2), lb('not connected', [3.4, -1.9], ROLE.aid)] },
    ],
  }
}

// ── 5. Convex optimisation ───────────────────────────────────────────────────

/** Left: the convex f(x) = (x − 1.5)² on [0, 3.4] (one minimum at 1.5, a chord from x = 0.5 to x = 3 lies above the graph). Right: the non-convex w(x) = (x² − 1)² + 0.3x on [−1.6, 1.6] with two minima. */
export const CVL: Frame = { ox: -4.6, oy: -2.0, ux: 1.25, uy: 1.25 }
export const CVR: Frame = { ox: 2.4, oy: -1.9, ux: 1.4, uy: 1.0 }
export const cvF = (x: number) => (x - 1.5) * (x - 1.5)
export const cvChord = [0.5, 3] as const
const cvChordLabel: Pt = [-3.1, 1.75]
export const cvW = (x: number) => (x * x - 1) * (x * x - 1) + 0.3 * x
/** The two local minima of w, found by bisection on w′(x) = 4x(x² − 1) + 0.3 = 0 near −1 and +1. */
function wMin(lo: number, hi: number): number {
  const d = (x: number) => 4 * x * (x * x - 1) + 0.3
  for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (d(lo) * d(m) <= 0) hi = m; else lo = m }
  return (lo + hi) / 2
}
export const cvWMinLeft = wMin(-1.3, -0.8)
export const cvWMinRight = wMin(0.8, 1.3)

/** KG: minimise a convex f over a convex set: every local minimum is global (a non-convex f can have a local minimum that is not). */
export function buildConvexOptimizationScene(): SceneSpec {
  return framed(raw_buildConvexOptimizationScene())
}
function raw_buildConvexOptimizationScene(): SceneSpec {
  const [c0, c1] = cvChord
  return {
    id: 'math-convex-optimization',
    title: 'Convex optimisation: a local minimum is global',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show why convexity makes minimising easy. The convex function f(x) = (x − 1.5)² (blue) has a single minimum at x = 1.5, and any chord (violet) lies above its graph, so the graph has no dips to get stuck in. The non-convex function w(x) = (x² − 1)² + 0.3x (red) has two dips: a local minimum near x = 0.96 whose value (about 0.29) is higher than the global minimum near x = −1.04 (about −0.31). Convex: every local minimum is global.',
    ariaLabel:
      'On the left a blue upward parabola with a green dot at its lowest point and, in the second step, a violet chord joining two points of the curve that lies above it. On the right, in the third step, a red curve with two valleys: a red dot at the bottom of the shallower right valley and a green dot at the bottom of the deeper left valley.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A convex function: f(x) = (x − 1.5)² (blue). It falls to one lowest point at x = 1.5 (green) and rises again — no other dip.', objects: [...axesOf(CVL, -0.2, 3.6, -0.15, 2.5), curveOf(CVL, cvF, 0, 3.4, ROLE.output, 48), dotAt(CVL, 1.5, 0, ROLE.result, 0.15), lb('convex: one minimum', [at(CVL, 1.7, 0)[0], -2.85], ROLE.output)] },
      { narration: 'Convex means every chord lies above the graph: the segment from x = 0.5 to x = 3 (violet) is above the curve between them. Because of this, a descent can never get stuck in a side dip.', objects: [lineAt(CVL, [c0, cvF(c0)], [c1, cvF(c1)], ROLE.aid, 0.05), dotAt(CVL, c0, cvF(c0), ROLE.aid, 0.1), dotAt(CVL, c1, cvF(c1), ROLE.aid, 0.1), lb('chord above graph', cvChordLabel, ROLE.aid)] },
      { narration: 'A non-convex function: w(x) = (x² − 1)² + 0.3x (red) has two dips. The right one (red dot, value about 0.29) is a local minimum but not the global one — the left dip (green dot, about −0.31) is lower. Convexity rules this out.', objects: [...axesOf(CVR, -1.8, 1.8, -0.55, 3.1), curveOf(CVR, cvW, -1.6, 1.6, ROLE.input, 64), dotAt(CVR, cvWMinRight, cvW(cvWMinRight), ROLE.input, 0.15), dotAt(CVR, cvWMinLeft, cvW(cvWMinLeft), ROLE.result, 0.15), lb('non-convex: two minima', [at(CVR, 0, 0)[0] + 0.3, -3.3], ROLE.input)] },
    ],
  }
}

// ── 6. Quadratic programming ─────────────────────────────────────────────────

/** minimise f(x, y) = (x − 3)² + (y − 2.5)² over x ≥ 0, y ≥ 0, x + y ≤ 4. The unconstrained minimum (3, 2.5) is infeasible; the circle of f through the solution touches the edge x + y = 4 at (2.25, 1.75). */
export const QPF: Frame = { ox: -4.2, oy: -2.4, ux: 1.45, uy: 1.45 }
export const qpC = [3, 2.5] as const
export const qpEdge = 4
export const qpSolution = [2.25, 1.75] as const
export const qpRTangent = Math.abs(qpC[0] + qpC[1] - qpEdge) / Math.SQRT2
export const qpROuter = 1.8
/** x of the "min of f" caption: right of the outer circle, joined to the centre dot by a thin leader line. */
const qpMinLabel: Pt = [3.85, 0.45]
const qpGradOff: Pt = [0.95, 0.25]

/** KG: minimise ½xᵀQx + cᵀx subject to Ax ≤ b; convex when Q ⪰ 0; the optimum sits where −∇f is normal to an active constraint. */
export function buildQuadraticProgrammingScene(): SceneSpec {
  return framed(raw_buildQuadraticProgrammingScene())
}
function raw_buildQuadraticProgrammingScene(): SceneSpec {
  const circ = (r: number, color: string): SceneObject => curve(Array.from({ length: 61 }, (_, k) => { const a = (2 * Math.PI * k) / 60; return mapOf(QPF)(qpC[0] + r * Math.cos(a), qpC[1] + r * Math.sin(a)) }), color)
  const [sx, sy] = qpSolution
  return {
    id: 'math-quadratic-programming',
    title: 'Quadratic programming: the optimum on the boundary',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a small quadratic program: minimise f(x, y) = (x − 3)² + (y − 2.5)² over the triangle x ≥ 0, y ≥ 0, x + y ≤ 4. The level curves of f are circles around (3, 2.5), which lies outside the triangle. Growing the circle from that centre, the first feasible point it touches is on the edge x + y = 4: the circle of radius 1.06 is tangent to the edge at (2.25, 1.75), the solution. There −∇f points straight out along the edge normal (1, 1), so no feasible move lowers f.',
    ariaLabel:
      'A triangle with corners at 0 0, 4 0 and 0 4, its slanted edge in red captioned x plus y at most 4. A violet dot outside the triangle marks the unconstrained minimum at 3 2.5. In the second step two circles around that dot: a larger violet one, and a blue one that just touches the slanted edge from outside at a green dot captioned QP solution 2.25 1.75. In the third step a violet arrow from the green dot points away from the triangle along the edge normal, captioned minus gradient of f.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The feasible region is the triangle x ≥ 0, y ≥ 0, x + y ≤ 4 (grey; its slanted edge red). The unconstrained minimum of f is at (3, 2.5) — outside the triangle, because 3 + 2.5 = 5.5 is more than 4.', objects: [lineAt(QPF, [0, 0], [4, 0], ROLE.reference, 0.05), lineAt(QPF, [0, 0], [0, 4], ROLE.reference, 0.05), lineAt(QPF, [4, 0], [0, 4], ROLE.input, 0.07), dotAt(QPF, qpC[0], qpC[1], ROLE.aid, 0.15), ln([at(QPF, qpC[0], qpC[1])[0] + 0.2, at(QPF, qpC[0], qpC[1])[1]], [qpMinLabel[0] - 1.2, at(QPF, qpC[0], qpC[1])[1] + qpMinLabel[1] - 0.2], ROLE.aid, 0.025), lb('min of f', [qpMinLabel[0], at(QPF, qpC[0], qpC[1])[1] + qpMinLabel[1]], ROLE.aid), lb('x + y ≤ 4', [-2.2, 4.1], ROLE.input)] },
      { narration: 'The level curves of f are circles around (3, 2.5). Grow the circle until it first meets the triangle: it touches the edge x + y = 4 from outside at (2.25, 1.75) — the solution of the program (green).', objects: [circ(qpROuter, ROLE.aid), circ(qpRTangent, ROLE.output), dotAt(QPF, sx, sy, ROLE.result, 0.16), lb('QP solution (2.25, 1.75)', [-0.8, -3.1], ROLE.result), lb('level curves of f', [3.2, 4.4], ROLE.output)] },
      { narration: 'At the solution −∇f (violet arrow) points straight out along the edge normal (1, 1) — toward the unconstrained minimum. Any feasible move along the edge or into the triangle leaves f no lower: the point is optimal.', objects: [arrowAt(QPF, [sx, sy], [sx + 0.6, sy + 0.6], ROLE.aid), lb('−∇f', at(QPF, sx + qpGradOff[0], sy + qpGradOff[1]), ROLE.aid)] },
    ],
  }
}

// ── 7. Integer programming ───────────────────────────────────────────────────

/** maximise 5x + 4y subject to x + y ≤ 5, 10x + 6y ≤ 45, x, y ≥ 0. LP optimum (3.75, 1.25) with 23.75; best integer point (3, 2) with 23; 19 integer points are feasible. */
export const IPF: Frame = { ox: -4.0, oy: -2.6, ux: 1.35, uy: 1.35 }
export const ipVertices: ReadonlyArray<Pt> = [[0, 0], [4.5, 0], [3.75, 1.25], [0, 5]]
export const ipObj = (x: number, y: number) => 5 * x + 4 * y   // used by the tests' first-principles values
export const ipFeasible = (x: number, y: number) => x >= 0 && y >= 0 && x + y <= 5 + 1e-9 && 10 * x + 6 * y <= 45 + 1e-9
export const ipLattice: Pt[] = (() => { const o: Pt[] = []; for (let x = 0; x <= 5; x++) for (let y = 0; y <= 5; y++) if (ipFeasible(x, y)) o.push([x, y]); return o })()
export const ipLp = [3.75, 1.25] as const
export const ipInt = [3, 2] as const

/** KG: LP with integer constraints; NP-hard; solved by branch and bound / cutting planes starting from the LP relaxation. */
export function buildIntegerProgrammingScene(): SceneSpec {
  return framed(raw_buildIntegerProgrammingScene())
}
function raw_buildIntegerProgrammingScene(): SceneSpec {
  /** A short piece of the objective's level line 5x + 4y = z through the point (x, y) of that level: slope −5/4, 1.5 graph units either side. */
  const level = (x: number, y: number, color: string): SceneObject => lineAt(IPF, [x - 0.8, y + 1.0], [x + 0.8, y - 1.0], color, 0.04)
  return {
    id: 'math-integer-programming',
    title: 'Integer programming: the LP optimum is not integer',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show why integer programs are harder than linear programs. Maximise 5x + 4y over the polygon x + y ≤ 5, 10x + 6y ≤ 45, x, y ≥ 0; only the whole-number points (blue dots, 19 of them) are allowed. The LP relaxation, which allows fractions, peaks at the vertex (3.75, 1.25) with value 23.75 — not a lattice point. The best lattice point is (3, 2) with value 23. Branch and bound cuts the polygon at x ≤ 3 and x ≥ 4 to search the integer points.',
    ariaLabel:
      'A polygon with corners at 0 0, 4.5 0, 3.75 1.25 and 0 5, filled with a grid of nineteen blue dots, one at each whole-number point inside. In the second step a red dot at the polygon corner 3.75 1.25 with a red line through it, captioned 23.75 at the LP vertex. In the third step a green dot at the lattice point 3 2 with a green line through it, and two violet vertical lines at x equals 3 and x equals 4, captioned best integer point 23.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The feasible region (grey polygon) of x + y ≤ 5, 10x + 6y ≤ 45, x, y ≥ 0, and its whole-number points (blue): 19 of them. Only these are allowed.', objects: [...axesOf(IPF, -0.2, 5.2, -0.2, 5.4), ...ipVertices.map((v, i) => lineAt(IPF, v, ipVertices[(i + 1) % ipVertices.length], ROLE.reference, 0.07)), ...ipLattice.map(([x, y]) => dotAt(IPF, x, y, ROLE.output, 0.13)), lb('x', at(IPF, 5.4, 0)), lb('y', at(IPF, 0.3, 5.4)), lb('integer points', at(IPF, 4.0, 4.3), ROLE.output)] },
      { narration: 'Maximise 5x + 4y. If fractions were allowed (the LP relaxation), the best point is the polygon corner (3.75, 1.25) with value 5 × 3.75 + 4 × 1.25 = 23.75 (red) — but it is not a whole-number point.', objects: [level(ipLp[0], ipLp[1], ROLE.input), dotAt(IPF, ipLp[0], ipLp[1], ROLE.input, 0.17), lb('23.75 at the LP vertex', [0, -3.35], ROLE.input)] },
      { narration: 'Among the lattice points the best is (3, 2) with value 5 × 3 + 4 × 2 = 23 (green). Branch and bound splits the polygon at x ≤ 3 and x ≥ 4 (violet lines) and solves an LP on each side until only integer points remain.', objects: [level(ipInt[0], ipInt[1], ROLE.result), dotAt(IPF, ipInt[0], ipInt[1], ROLE.result, 0.17), lineAt(IPF, [3, -0.15], [3, 3.0], ROLE.aid, 0.03), lineAt(IPF, [4, -0.15], [4, 3.0], ROLE.aid, 0.03), lb('best integer point: 23', [0, -4.3], ROLE.result)] },
    ],
  }
}

// ── 8. Dynamic programming ───────────────────────────────────────────────────

/** A layered graph S → {A, B} → {C, D} → T with edge costs; V(node) is the cheapest cost from the node to T, filled right to left. */
export const DPG = {
  nodes: { S: [-4.2, 0], A: [-1.6, 1.5], B: [-1.6, -1.5], C: [1.6, 1.5], D: [1.6, -1.5], T: [4.2, 0] } as Record<'S' | 'A' | 'B' | 'C' | 'D' | 'T', Pt>,
  edges: [['S', 'A', 2], ['S', 'B', 5], ['A', 'C', 6], ['A', 'D', 2], ['B', 'C', 1], ['B', 'D', 4], ['C', 'T', 3], ['D', 'T', 6]] as ReadonlyArray<readonly ['S' | 'A' | 'B' | 'C' | 'D' | 'T', 'S' | 'A' | 'B' | 'C' | 'D' | 'T', number]>,
}
/** The cheapest cost to T from each node, by the Bellman recursion V(u) = min over edges (u, v, w) of w + V(v). */
export const dpValues = (() => {
  const V: Record<string, number> = { T: 0 }
  for (const u of ['C', 'D', 'A', 'B', 'S'] as const) V[u] = Math.min(...DPG.edges.filter((e) => e[0] === u).map((e) => e[2] + V[e[1]]))
  return V as Record<'S' | 'A' | 'B' | 'C' | 'D' | 'T', number>
})()
export const dpPath = ['S', 'B', 'C', 'T'] as const
const dpMid = (a: Pt, b: Pt, t: number): Pt => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
/** The distance from a point to a road (a segment of the graph). */
const dpSegDist = (a: Pt, b: Pt, p: Pt): number => { const dx = b[0] - a[0], dy = b[1] - a[1]; const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy))); return Math.hypot(a[0] + t * dx - p[0], a[1] + t * dy - p[1]) }
/** The cost numeral of a road: 30% along it, 0.34 to the side of the road that keeps it farthest from every OTHER road (roads that fan out of one junction would otherwise leave a numeral almost as near to its neighbour as to its own road). */
export const dpCostAt = (a: Pt, b: Pt): Pt => {
  const m = dpMid(a, b, 0.3), L = Math.hypot(b[0] - a[0], b[1] - a[1])
  const n: Pt = [-(b[1] - a[1]) / L, (b[0] - a[0]) / L]
  const others = DPG.edges.map(([u, v]) => [DPG.nodes[u], DPG.nodes[v]] as const).filter(([u, v]) => !(u === a && v === b))
  const side = (k: number): Pt => [m[0] + 0.34 * k * n[0], m[1] + 0.34 * k * n[1]]
  const clearance = (p: Pt) => Math.min(...others.map(([u, v]) => dpSegDist(u, v, p)))
  return clearance(side(1)) >= clearance(side(-1)) ? side(1) : side(-1)
}

/** KG: optimal substructure — an optimal solution contains optimal solutions of its subproblems; Bellman equation; shortest paths, knapsack, alignment. */
export function buildDynamicProgrammingScene(): SceneSpec {
  return framed(raw_buildDynamicProgrammingScene())
}
function raw_buildDynamicProgrammingScene(): SceneSpec {
  const { nodes, edges } = DPG
  const names = Object.keys(nodes) as Array<keyof typeof nodes>
  const off = (name: 'A' | 'B' | 'C' | 'D'): Pt => (name === 'A' || name === 'C' ? [0, 0.62] : [0, -0.62])
  return {
    id: 'math-dynamic-programming',
    title: 'Dynamic programming: cheapest cost filled backwards',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show dynamic programming on a layered graph. Every road has a cost (black numbers). Working backwards from T, record at each junction the cheapest cost to reach T (green numbers): C 3, D 6, then A 8 (via D: 2 + 6) and B 4 (via C: 1 + 3), and finally S 9 (via B: 5 + 4). The cheapest route S → B → C → T costs 5 + 1 + 3 = 9; the greedy first step to A (cost 2) would cost 2 + 8 = 10 in total. The optimal route is built from optimal routes of the smaller problems.',
    ariaLabel:
      'Six junctions in four columns: S on the left, A above and B below in the second column, C above and D below in the third, T on the right, joined by eight roads, each with its cost written on it: S to A 2, S to B 5, A to C 6, A to D 2, B to C 1, B to D 4, C to T 3, D to T 6. In the second step green numbers appear beside the junctions C 3, D 6, A 8 and B 4, captioned cheapest cost to T. In the third step the route S, B, C, T is drawn in green with S marked 9, captioned 5 plus 1 plus 3 equals 9.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Junctions S, A, B, C, D, T and the cost written on each road. We want the cheapest way from S to T.', objects: [...edges.map(([u, v]) => ln(nodes[u], nodes[v], ROLE.reference, 0.04)), ...names.map((n) => dt(nodes[n], ROLE.ink, 0.17)), ...names.map((n) => lb(n, [nodes[n][0], nodes[n][1] + (n === 'B' || n === 'D' ? -0.62 : 0.62)])), ...edges.map(([u, v, w]) => lb(String(w), dpCostAt(nodes[u], nodes[v])))] },
      { narration: 'Work backwards from T. C → T costs 3 and D → T costs 6. From A the best is D: 2 + 6 = 8 (not C: 6 + 3 = 9). From B the best is C: 1 + 3 = 4 (not D: 4 + 6 = 10). The green number at each junction is its cheapest cost to T.', objects: [...(['C', 'D', 'A', 'B'] as const).map((n) => lb(String(dpValues[n]), [nodes[n][0] + off(n)[0] + (n === 'C' || n === 'D' ? 0.5 : -0.5), nodes[n][1] + off(n)[1]], ROLE.result)), lb('cheapest cost to T', [2.9, 3.4], ROLE.result)] },
      { narration: 'At S: via A costs 2 + 8 = 10, via B costs 5 + 4 = 9, so the cheapest cost is 9 along S → B → C → T (green). The greedy first step to the cheaper road (to A, cost 2) would end up costing 10.', objects: [...dpPath.slice(0, -1).map((u, i) => ln(nodes[u], nodes[dpPath[i + 1]], ROLE.result, 0.1)), lb(String(dpValues.S), [nodes.S[0] - 0.55, nodes.S[1] - 0.62], ROLE.result), lb('5 + 1 + 3 = 9', [0, -3.1], ROLE.result), lb('greedy first step: 10', [0, -3.8], ROLE.input)] },
    ],
  }
}

// ── 9. Normed space ──────────────────────────────────────────────────────────

/** C([0, 1]) with the sup norm: f(x) = 0.55 + 0.3 sin 2πx; g = f + 0.15 sin 6πx is within 0.15 of f, h = f + 0.4 e^(−((x − 0.7)/0.08)²) is 0.4 away; the band has radius ε = 0.25. */
export const NRM: Frame = { ox: -4.0, oy: -2.2, ux: 7.5, uy: 3.0 }
export const nrmF = (x: number) => 0.55 + 0.3 * Math.sin(2 * Math.PI * x)
export const nrmG = (x: number) => nrmF(x) + 0.15 * Math.sin(6 * Math.PI * x)
export const nrmH = (x: number) => nrmF(x) + 0.4 * Math.exp(-(((x - 0.7) / 0.08) ** 2))
export const nrmEps = 0.25
const nrmXs = Array.from({ length: 121 }, (_, k) => k / 120)
/** h is drawn only on [0.5, 0.9], where it departs from f — elsewhere it equals f and would paint over it. */
const nrmHXs = nrmXs.filter((x) => x >= 0.5 - 1e-9 && x <= 0.9 + 1e-9)

/** KG: ‖·‖ with ‖x‖ = 0 ⟺ x = 0, ‖αx‖ = |α|‖x‖, ‖x + y‖ ≤ ‖x‖ + ‖y‖; d(x, y) = ‖x − y‖; example C([a, b]) with the sup norm. */
export function buildNormedSpaceScene(): SceneSpec {
  return framed(raw_buildNormedSpaceScene())
}
function raw_buildNormedSpaceScene(): SceneSpec {
  const poly = (fn: (x: number) => number, color: string, xs: readonly number[] = nrmXs): SceneObject => curve(xs.map((x) => mapOf(NRM)(x, fn(x))), color)
  return {
    id: 'math-normed-space',
    title: 'Normed space: distance between functions',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the distance a norm induces on the space of continuous functions C([0, 1]) with the sup norm: d(f, g) = max |f(x) − g(x)|. Around f (blue) draw the band of radius ε = 0.25 (violet). The function g (green) never leaves the band: its largest gap to f is 0.15, so d(f, g) = 0.15 < ε. The function h (red) has a bump that leaves the band: its largest gap is 0.4, so d(f, h) = 0.4 > ε.',
    ariaLabel:
      'A blue wavy curve f on the unit interval. In the second step two violet curves above and below it at the same vertical distance, forming a band, and a green curve g that wiggles inside the band, captioned g distance 0.15. In the third step a red curve h that follows f except for a bump near x equals 0.7 that rises above the upper edge of the band, captioned h distance 0.4 outside.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The space C([0, 1]) of continuous functions on [0, 1]. A point of this space is a whole function, such as f(x) = 0.55 + 0.3 sin 2πx (blue).', objects: [...axesOf(NRM, -0.03, 1.08, -0.15, 1.3), poly(nrmF, ROLE.output), lb('f', at(NRM, 1.06, 0.55), ROLE.output)] },
      { narration: 'The sup norm gives the distance d(f, g) = max |f(x) − g(x)|: the largest vertical gap. The band of radius ε = 0.25 around f is violet; g (green) stays inside it, its largest gap being 0.15.', objects: [poly((x) => nrmF(x) + nrmEps, ROLE.aid), poly((x) => nrmF(x) - nrmEps, ROLE.aid), poly(nrmG, ROLE.result), lb('band of radius 0.25', at(NRM, 0.5, 1.28), ROLE.aid), lb('g: distance 0.15', at(NRM, 0.78, -0.22), ROLE.result)] },
      { narration: 'The function h (red, drawn where it leaves f) equals f except for a bump near x = 0.7 that climbs 0.4 above it — outside the band. So d(f, h) = 0.4 is larger than ε: h is not in the ball of radius 0.25 around f, even though the two curves agree almost everywhere.', objects: [poly(nrmH, ROLE.input, nrmHXs), lb('h: distance 0.4, outside', at(NRM, 0.7, 1.45), ROLE.input)] },
    ],
  }
}

// ── 10. Distributions ────────────────────────────────────────────────────────

/** The unit-area bumps of width w and height 1/w (w = 1, ½, ¼) averaging the test function φ(x) = cos x: the averages 2 sin(w/2)/w = 0.96, 0.99, 1.00 tend to φ(0) = 1 — the Dirac δ is their limit. */
export const DST: Frame = { ox: -1.2, oy: -2.3, ux: 1.3, uy: 1.0 }
export const dstWidths = [1, 0.5, 0.25] as const
export const dstPhi = (x: number) => Math.cos(x)
export const dstAverage = (w: number) => (2 * Math.sin(w / 2)) / w

/** KG: a distribution is a continuous linear functional on test functions; δ(φ) = φ(0); locally integrable functions define distributions. */
export function buildDistributionsScene(): SceneSpec {
  return framed(raw_buildDistributionsScene())
}
function raw_buildDistributionsScene(): SceneSpec {
  const bump = (w: number, color: string): SceneObject[] => {
    const h = 1 / w
    return [ln(at(DST, -w / 2, 0), at(DST, -w / 2, h), color, 0.05), ln(at(DST, -w / 2, h), at(DST, w / 2, h), color, 0.05), ln(at(DST, w / 2, h), at(DST, w / 2, 0), color, 0.05)]
  }
  return {
    id: 'math-distributions',
    title: 'Distributions: the Dirac delta as a limit',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the Dirac δ as the limit of narrower and taller bumps. Each bump has area 1: width 1 and height 1, width ½ and height 2, width ¼ and height 4. A distribution is tested against a smooth function φ (blue, φ(x) = cos x): the average of φ under the bump is 0.96, 0.99, 1.00 for the three bumps and tends to φ(0) = 1. In the limit the bump becomes δ, which is defined by δ(φ) = φ(0).',
    ariaLabel:
      'A blue cosine curve phi on a horizontal axis with a green dot at its peak, at height 1 above 0. In the first step a red bump of width 1 and height 1 centred at 0 is drawn over it, captioned width 1 and 0.96. In the second step a narrower, taller violet bump of width one half and height 2, captioned width 1/2 and 0.99. In the third step an even narrower, taller green bump of width one quarter and height 4, captioned width 1/4 and 1.00, and the caption delta of phi equals phi of 0 equals 1.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A test function φ(x) = cos x (blue) and a bump of width 1 and height 1 (red, area 1). Testing the bump against φ averages φ over the bump: 0.96.', objects: [...axesOf(DST, -2.4, 2.4, -0.15, 4.4), curveOf(DST, dstPhi, -2.2, 2.2, ROLE.output, 48), ...bump(1, ROLE.input), lb('φ', at(DST, 1.9, 0.9), ROLE.output), lb('each bump has area 1', [3.3, 2.8], ROLE.ink), lb('average of φ', [3.5, 1.9], ROLE.ink), lb('width 1: 0.96', [3.5, 1.0], ROLE.input)] },
      { narration: 'Halve the width and double the height (violet, area still 1): the average of φ under the bump is now 0.99 — closer to φ(0) = 1.', objects: [...bump(0.5, ROLE.aid), lb('width ½: 0.99', [3.5, 0.2], ROLE.aid)] },
      { narration: 'Halve again (green, width ¼, height 4): the average is 1.00. As the width goes to 0 the averages tend to φ(0) = 1; the limit is the Dirac delta, δ(φ) = φ(0) — a distribution that no ordinary function can represent.', objects: [...bump(0.25, ROLE.result), dotAt(DST, 0, dstPhi(0), ROLE.result, 0.12), lb('width ¼: 1.00', [3.5, -0.6], ROLE.result), lb('δ(φ) = φ(0) = 1', [3.3, -1.5], ROLE.result)] },
    ],
  }
}

// ── 11. Special functions ────────────────────────────────────────────────────

/** Γ(x) = ∫₀^∞ t^(x−1) e^(−t) dt on [0.5, 4.2]: Γ(1) = 1, Γ(2) = 1, Γ(3) = 2, Γ(4) = 6 (the factorials (n − 1)!), and B(2, 2) = Γ(2)Γ(2)/Γ(4) = 1/6. */
export const GAM: Frame = { ox: -4.4, oy: -2.6, ux: 1.9, uy: 0.55 }
const LANCZOS = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7]
/** The gamma function (Lanczos approximation, g = 7), accurate to about 1e-13 on the figure's range. */
export function gammaFn(z: number): number {
  if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gammaFn(1 - z))
  const x = z - 1
  let a = LANCZOS[0]
  const t = x + 7.5
  for (let i = 1; i < 9; i++) a += LANCZOS[i] / (x + i)
  return Math.sqrt(2 * Math.PI) * Math.pow(t, x + 0.5) * Math.exp(-t) * a
}

/** KG: Γ(z) = ∫₀^∞ t^(z−1) e^(−t) dt is the meromorphic extension of the factorial; B(x, y) = Γ(x)Γ(y)/Γ(x + y). */
export function buildSpecialFunctionsScene(): SceneSpec {
  return framed(raw_buildSpecialFunctionsScene())
}
function raw_buildSpecialFunctionsScene(): SceneSpec {
  const ints = [1, 2, 3, 4]
  return {
    id: 'math-special-functions',
    title: 'Special functions: the gamma function',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the gamma function Γ(x) = ∫₀^∞ t^(x−1) e^(−t) dt as a smooth curve through the factorials. At the whole numbers x = 1, 2, 3, 4 it takes the values 1, 1, 2, 6 — that is (n − 1)! — and between them it fills in the values the factorial never gave: Γ(0.5) = √π ≈ 1.77. The beta function B(x, y) = Γ(x)Γ(y)/Γ(x + y) is built from it: B(2, 2) = Γ(2)Γ(2)/Γ(4) = 1 × 1 ÷ 6 ≈ 0.17.',
    ariaLabel:
      'A blue curve Γ of x from x equals 0.5 to 4.2: it starts at about 1.77, dips to a minimum of about 0.89 near x equals 1.46 and then climbs steeply to 6 at x equals 4. In the second step green dots mark the curve at x equals 1, 2, 3 and 4 with the heights 1, 1, 2 and 6 written beside them, captioned Γ of n equals n minus 1 factorial. In the third step the caption B of 2, 2 equals 1 times 1 divided by 6 is about 0.17 appears.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The gamma function Γ(x) = ∫ t^(x−1) e^(−t) dt (blue), for x from 0.5 to 4.2: it falls from 1.77 to a low near 0.89 at x ≈ 1.46 and then rises steeply.', objects: [...axesOf(GAM, 0, 4.4, -0.2, 7.2), curveOf(GAM, gammaFn, 0.5, 4.2, ROLE.output, 80), lb('Γ(x)', at(GAM, 2.2, 5.3), ROLE.output), lb('x', at(GAM, 4.6, 0))] },
      { narration: 'At the whole numbers the curve passes through the factorials: Γ(1) = 1, Γ(2) = 1, Γ(3) = 2, Γ(4) = 6 (green) — Γ(n) = (n − 1)!. Between them it fills in what the factorial skips.', objects: [...ints.map((n) => dotAt(GAM, n, gammaFn(n), ROLE.result, 0.13)), ...ints.map((n) => lb(String(Math.round(gammaFn(n))), [at(GAM, n, 0)[0] - 0.4, at(GAM, 0, gammaFn(n))[1] + 0.35], ROLE.result)), ...ints.map((n) => lb(String(n), [at(GAM, n, 0)[0], at(GAM, 0, 0)[1] - 0.4])), lb('Γ(n) = (n − 1)!', [-2.2, 2.7], ROLE.result)] },
      { narration: 'The beta function is built from gamma: B(x, y) = Γ(x)Γ(y)/Γ(x + y). With the values read off the curve, B(2, 2) = Γ(2) × Γ(2) ÷ Γ(4) = 1 × 1 ÷ 6 ≈ 0.17.', objects: [lb('B(2, 2) = 1 × 1 ÷ 6 ≈ 0.17', [-1.6, 1.6], ROLE.aid)] },
    ],
  }
}
