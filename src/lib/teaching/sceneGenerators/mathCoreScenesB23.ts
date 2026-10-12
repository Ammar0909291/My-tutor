/**
 * Core mathematics figures — batch 23 of the mathematics visual campaign (2026-10-12): optimisation
 * (unconstrained, convex functions and sets, linear programming, Lagrange multipliers, gradient
 * descent), numerical analysis (Newton's method, interpolation, numerical differentiation and
 * integration), real-valued functions, real roots of polynomials and topological manifolds.
 *
 * Same rules as batches 1-22: one visual language from visualDesign.ts, labels are names not
 * sentences (marks of 1-2 characters are free), steps are cumulative, coordinates stay inside +-5,
 * at most 50 objects per step, nothing the figure audit rejects (SM-01 evaluates the arithmetic in a
 * label left to right and compares labels that share a last token before "="), and every number drawn
 * comes from the constants and pure helpers exported here, which the test file re-derives from the
 * DRAWN coordinates (iterates, secant slopes, areas and polygons are read back from the drawing and
 * recomputed). A label is about 0.26 screen units wide per character.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, shadeConvex, arcPts, type V3 } from './mathSceneKit'

export type Pt = readonly [number, number]
const ln = (a: Pt, b: Pt, color: string = ROLE.reference, t = 0.04): SceneObject => line(P(a[0], a[1]), P(b[0], b[1]), color, t)
const dt = (p: Pt, color: string = ROLE.ink, r = 0.16): SceneObject => dot(P(p[0], p[1]), color, r)
const lb = (text: string, p: Pt, color: string = ROLE.ink): SceneObject => label(text, P(p[0], p[1]), color, 'primary')
const ringAt = (c: Pt, r: number, color: string, n = 40): SceneObject => curve(arcPts(c[0], c[1], r, 0, 360, n), color)
const f2 = (n: number) => (Math.round(n * 100) / 100).toFixed(2)
/** A curve y = fn(x) on [x0, x1] drawn through a mapping (x, y) -> screen. */
const plot = (fn: (x: number) => number, x0: number, x1: number, map: (x: number, y: number) => Pt, color: string, n = 72): SceneObject => curve(Array.from({ length: n + 1 }, (_, i) => { const x = x0 + ((x1 - x0) * i) / n, m = map(x, fn(x)); return P(m[0], m[1]) as V3 }), color)
const axes = (map: (x: number, y: number) => Pt, x0: number, x1: number, y0: number, y1: number, ox = 0): SceneObject[] => [arrow(P(map(x0, 0)[0], map(x0, 0)[1]), P(map(x1, 0)[0], map(x1, 0)[1]), ROLE.reference), arrow(P(map(ox, y0)[0], map(ox, y0)[1]), P(map(ox, y1)[0], map(ox, y1)[1]), ROLE.reference)]
/** root of g in [a, b] by bisection (g(a) and g(b) of opposite signs) */
export const bisect = (g: (x: number) => number, a: number, b: number): number => { let lo = a, hi = b; for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (g(lo) * g(m) <= 0) hi = m; else lo = m } return (lo + hi) / 2 }

// ── 1. Unconstrained optimisation ────────────────────────────────────────────

/** f(x) = (x² − 1)² + 0.4x: f′ = 0 at three points — a global minimum (x ≈ −1.05), a local maximum (x ≈ 0.1) and a local minimum (x ≈ 0.95). */
export const UNO = { ox: 0, oy: -1.2, ux: 2.4, uy: 1.0, x0: -1.6, x1: 1.6, half: 0.45 }
export const unoF = (x: number) => (x * x - 1) ** 2 + 0.4 * x
export const unoD = (x: number) => 4 * x * x * x - 4 * x + 0.4
export const unoDD = (x: number) => 12 * x * x - 4
export const unoCrit = (): number[] => [bisect(unoD, -1.5, -0.5), bisect(unoD, -0.5, 0.5), bisect(unoD, 0.5, 1.5)]
export const unoAt = (x: number, y: number): Pt => [UNO.ox + UNO.ux * x, UNO.oy + UNO.uy * y]

/** KG: min f(x): ∇f(x*) = 0 is necessary, ∇²f(x*) positive definite is sufficient; local versus global optima. */
export function buildUnconstrainedOptimizationScene(): SceneSpec {
  return framed(raw_buildUnconstrainedOptimizationScene())
}
function raw_buildUnconstrainedOptimizationScene(): SceneSpec {
  const { x0, x1, half } = UNO, [a, b, c] = unoCrit(), G = unoAt
  const flat = (x: number): SceneObject => ln(G(x - half, unoF(x)), G(x + half, unoF(x)), ROLE.result, 0.04)
  return {
    id: 'math-unconstrained-optimization',
    title: 'Unconstrained optimisation: where f′ = 0',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the conditions for an unconstrained optimum on f(x) = (x² − 1)² + 0.4x. A minimum must have a horizontal tangent, f′(x*) = 0 (first-order condition): this f has three such points, near x = −1.05, 0.10 and 0.95. The second-order condition tells them apart: f″ > 0 (curving up) gives a minimum, f″ < 0 (curving down) a maximum. Of the two minima the left one is the global minimum (f ≈ −0.41); the right one (f ≈ 0.39) is only a local minimum.',
    ariaLabel:
      'A blue curve shaped like a W with a high middle bump: a deep valley on the left, a bump near the middle and a shallower valley on the right. Three short green horizontal segments touch the curve at the bottom of each valley and the top of the bump, labelled f prime equals 0. In the second step the two valley bottoms get blue dots labelled f double prime greater than 0 and the bump top gets a red dot labelled f double prime less than 0. In the third step the left valley bottom becomes a green dot labelled global min and the right one is labelled local min.',
    stage: NO_STAGE,
    steps: [
      { narration: 'At a minimum the tangent must be horizontal: f′(x*) = 0. For f(x) = (x² − 1)² + 0.4x there are three such points (green tangents): two valley bottoms and the top of the bump between them.', objects: [...axes(G, x0 - 0.1, x1 + 0.1, -0.7, 3.2), plot(unoF, x0, x1, G, ROLE.output), ...[a, b, c].map(flat), lb('f′ = 0', G(b, unoF(b) + 0.6), ROLE.result)] },
      { narration: 'Second-order condition: where the curve bends UP (f″ > 0) a point with f′ = 0 is a minimum (blue); where it bends DOWN (f″ < 0) it is a maximum (red). So −1.05 and 0.95 are minima and 0.10 is a maximum — f′ = 0 alone does not say which.', objects: [dt(G(a, unoF(a)), ROLE.output, 0.13), dt(G(c, unoF(c)), ROLE.output, 0.13), dt(G(b, unoF(b)), ROLE.input, 0.13), lb('f″ > 0', G(a - 0.05, unoF(a) - 0.5), ROLE.output), lb('f″ > 0', G(c + 0.05, unoF(c) - 0.5), ROLE.output), lb('f″ < 0', G(b + 0.85, unoF(b) + 0.15), ROLE.input)] },
      { narration: 'Local versus global: both minima have f′ = 0 and f″ > 0, but f(−1.05) ≈ −0.41 is lower than f(0.95) ≈ 0.39. The left one is the global minimum (green); the right one is only a local minimum. A search that stops at f′ = 0 can land in the wrong valley.', objects: [dt(G(a, unoF(a)), ROLE.result, 0.2), lb('global min', G(a, unoF(a) - 1.0), ROLE.result), lb('local min', G(c, unoF(c) - 1.0), ROLE.output)] },
    ],
  }
}

// ── 2. Convex functions ──────────────────────────────────────────────────────

/** Left: f(x) = x² between x = −1.5 and 1.7: the chord lies above the graph. Right: sin x between 0.6 and 5.4: the chord dips below the graph at x = 3. */
export const CVF = {
  L: { ox: -2.4, oy: -2.0, ux: 0.95, uy: 0.55, x0: -2, x1: 2, a: -1.5, b: 1.7, lam: 0.5 },
  R: { ox: 2.6 - 3.14159 * 0.6, oy: -1.0, ux: 0.6, uy: 1.2, x0: 0, x1: 6.28, a: 0.6, b: 5.4, lam: 0.5 },
}
export const cvfL = (x: number, y: number): Pt => [CVF.L.ox + CVF.L.ux * x, CVF.L.oy + CVF.L.uy * y]
export const cvfR = (x: number, y: number): Pt => [CVF.R.ox + CVF.R.ux * x, CVF.R.oy + CVF.R.uy * y]
export const chordAt = (f: (x: number) => number, a: number, b: number, x: number) => f(a) + ((f(b) - f(a)) * (x - a)) / (b - a)

/** KG: f convex iff f(λx + (1 − λ)y) ≤ λf(x) + (1 − λ)f(y) (chord above the graph); equivalently f″ ≥ 0. */
export function buildConvexFunctionScene(): SceneSpec {
  return framed(raw_buildConvexFunctionScene())
}
function raw_buildConvexFunctionScene(): SceneSpec {
  const { L, R } = CVF, sq = (x: number) => x * x
  const mL = L.a * L.lam + L.b * (1 - L.lam), mR = R.a * R.lam + R.b * (1 - R.lam)
  const chordPoints = (map: (x: number, y: number) => Pt, f: (x: number) => number, a: number, b: number, color: string): SceneObject[] => [ln(map(a, f(a)), map(b, f(b)), color, 0.04), dt(map(a, f(a)), ROLE.ink, 0.1), dt(map(b, f(b)), ROLE.ink, 0.1)]
  return {
    id: 'math-convex-function',
    title: 'Convex function: the chord lies above the graph',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show convexity: f is convex if for any two points x, y the chord (the straight segment between (x, f(x)) and (y, f(y))) lies on or above the graph, f(λx + (1 − λ)y) ≤ λf(x) + (1 − λ)f(y). For f(x) = x² between x = −1.5 and 1.7 the chord is above the curve everywhere (f″ = 2 ≥ 0). For sin x between 0.6 and 5.4 the chord drops BELOW the curve near x = 3, so sin is not convex (its f″ changes sign). For a convex function every local minimum is a global minimum.',
    ariaLabel:
      'Left: the parabola y equals x squared with a red chord joining two points on it; the chord lies above the curve all the way; at the halfway point a green dot on the curve sits below a red dot on the chord, captioned chord above. Right: one hump-and-valley of the sine curve with a red chord joining the points at 0.6 and 5.4; near the middle the chord passes below the curve, with a red dot on the chord below a green dot on the curve, captioned chord below. The third step adds the captions f double prime at least 0 on the left and f double prime changes sign on the right.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Take f(x) = x² and two points of its graph, at x = −1.5 and x = 1.7, and join them by the chord (red). At every x between them the chord is above the graph — at the halfway point x = 0.1 the curve is at 0.01, the chord at 2.57.', objects: [...axes(cvfL, L.x0 - 0.2, L.x1 + 0.2, -0.3, 4.4), plot(sq, L.x0, L.x1, cvfL, ROLE.output), ...chordPoints(cvfL, sq, L.a, L.b, ROLE.input), dt(cvfL(mL, sq(mL)), ROLE.result, 0.13), dt(cvfL(mL, chordAt(sq, L.a, L.b, mL)), ROLE.input, 0.13), lb('chord above', [CVF.L.ox, 1.45], ROLE.input)] },
      { narration: 'Take sin x between x = 0.6 and x = 5.4. Near x = 3 the chord (red) passes BELOW the curve: the curve is at 0.14 and the chord at −0.10. A chord that dips under the graph means the function is not convex.', objects: [...axes(cvfR, R.x0 - 0.2, R.x1 + 0.2, -1.4, 1.5, 0), plot(Math.sin, R.x0, R.x1, cvfR, ROLE.output), ...chordPoints(cvfR, Math.sin, R.a, R.b, ROLE.input), dt(cvfR(mR, Math.sin(mR)), ROLE.result, 0.13), dt(cvfR(mR, chordAt(Math.sin, R.a, R.b, mR)), ROLE.input, 0.13), lb('chord below', [CVF.R.ox + 3.1 * CVF.R.ux, 1.7], ROLE.input)] },
      { narration: 'Equivalent test: f″ ≥ 0 everywhere. For x² the second derivative is 2, for sin x it is −sin x, which changes sign. Convexity is what makes optimisation easy: every local minimum of a convex function is a global one.', objects: [lb('f″ ≥ 0', [CVF.L.ox, -3.5], ROLE.result), lb('f″ changes sign', [CVF.R.ox + 3.1 * CVF.R.ux, -3.5], ROLE.input)] },
    ],
  }
}

// ── 3. Convex sets ───────────────────────────────────────────────────────────

/** A pentagon (convex: the segment between two points stays inside), a dart (not convex: the segment leaves it), and the convex hull of seven points. */
export const CVS = {
  cx: [-3.3, 0, 3.3] as readonly number[], cy: 0.5,
  pent: [[0, 1.3], [1.25, 0.4], [0.8, -1.05], [-0.8, -1.05], [-1.25, 0.4]] as ReadonlyArray<Pt>,
  p: [-0.7, -0.4] as Pt, q: [0.7, 0.3] as Pt,
  dart: [[-1.25, -1.0], [0, 1.25], [1.25, -1.0], [0, -0.2]] as ReadonlyArray<Pt>, dp: [-0.9, -0.62] as Pt, dq: [0.9, -0.62] as Pt,
  pts: [[-1.1, -0.6], [-0.4, 0.95], [0.6, 0.75], [1.2, -0.2], [0.5, -0.95], [-0.3, -0.3], [0.3, 0.1]] as ReadonlyArray<Pt>,
}
export const cvsShift = (panel: number, p: Pt): Pt => [CVS.cx[panel] + p[0], CVS.cy + p[1]]
export const insidePoly = (poly: ReadonlyArray<Pt>, p: Pt): boolean => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) if ((poly[i][1] > p[1]) !== (poly[j][1] > p[1]) && p[0] < ((poly[j][0] - poly[i][0]) * (p[1] - poly[i][1])) / (poly[j][1] - poly[i][1]) + poly[i][0]) c = !c; return c }
/** Convex hull (Andrew's monotone chain), counter-clockwise from the lowest-left point. */
export const hullOf = (pts: ReadonlyArray<Pt>): Pt[] => {
  const s = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]), cr = (o: Pt, a: Pt, b: Pt) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
  const lo: Pt[] = [], up: Pt[] = []
  for (const p of s) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p) }
  for (const p of [...s].reverse()) { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], p) <= 0) up.pop(); up.push(p) }
  return [...lo.slice(0, -1), ...up.slice(0, -1)]
}

/** KG: C convex iff λx + (1 − λ)y ∈ C for x, y ∈ C; the convex hull is the smallest convex set containing S. */
export function buildConvexSetScene(): SceneSpec {
  return framed(raw_buildConvexSetScene())
}
function raw_buildConvexSetScene(): SceneSpec {
  const { pent, p, q, dart, dp, dq, pts } = CVS, S = cvsShift
  const outline = (panel: number, poly: ReadonlyArray<Pt>, color: string): SceneObject[] => poly.map((v, i) => ln(S(panel, v), S(panel, poly[(i + 1) % poly.length]), color, 0.05))
  const hull = hullOf(pts)
  // the part of the dart segment that leaves the dart, from sampling
  const outsideRuns: Array<[Pt, Pt]> = (() => { const runs: Array<[Pt, Pt]> = []; let start: Pt | null = null, last: Pt | null = null; for (let i = 0; i <= 200; i++) { const t = i / 200, x: Pt = [dp[0] + t * (dq[0] - dp[0]), dp[1] + t * (dq[1] - dp[1])], out = !insidePoly(dart, x); if (out && !start) start = x; if (out) last = x; if (!out && start) { runs.push([start, last!]); start = null } } if (start) runs.push([start, last!]); return runs })()
  return {
    id: 'math-convex-set',
    title: 'Convex sets and the convex hull',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show convexity of sets: a set C is convex if the whole segment between any two of its points stays in C. The pentagon is convex (the segment between x and y, green, stays inside). The dart is not: its notch lets the segment between two interior points leave the set (the red part is outside). The convex hull of a set of points is the smallest convex set containing them — the polygon (blue) stretched round the outermost points like a rubber band; the points inside are not corners of it.',
    ariaLabel:
      'Left: a blue pentagon with two dots inside it joined by a green segment that stays inside, captioned convex. Middle: a dart-shaped quadrilateral with a notch in its bottom edge and two dots near its bottom corners joined by a segment that is green at the ends and red in the middle where it crosses the notch, captioned not convex. Right: seven dots with a violet polygon through the five outermost ones enclosing the two inner ones, captioned convex hull.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A set is convex when the segment between any two of its points stays inside it. In the pentagon, take x and y (dots): the whole segment between them (green) lies in the pentagon, and the same is true for every pair of points.', objects: [...shadeConvex(pent.map((v) => [S(0, v)[0], S(0, v)[1]] as [number, number]), 0.3, ROLE.aid, 0.015), ...outline(0, pent, ROLE.output), ln(S(0, p), S(0, q), ROLE.result, 0.06), dt(S(0, p), ROLE.ink, 0.1), dt(S(0, q), ROLE.ink, 0.1), lb('convex', [CVS.cx[0], CVS.cy - 1.7], ROLE.output)] },
      { narration: 'The dart is not convex. Both dots are in the set, but the segment joining them (red in the middle) passes through the notch, outside the dart. One pair of points is enough to show a set is not convex.', objects: [...outline(1, dart, ROLE.output), ln(S(1, dp), S(1, dq), ROLE.result, 0.06), ...outsideRuns.map(([a, b]) => ln(S(1, a), S(1, b), ROLE.input, 0.09)), dt(S(1, dp), ROLE.ink, 0.1), dt(S(1, dq), ROLE.ink, 0.1), lb('not convex', [CVS.cx[1], CVS.cy - 1.7], ROLE.input)] },
      { narration: 'The convex hull of a set of points is the smallest convex set containing them: stretch a rubber band round the outermost points (blue corners). The two points inside (white) are not corners. Intersections of convex sets are convex, and every halfspace, ball and polygon like the hull is one.', objects: [...pts.map((v) => dt(S(2, v), ROLE.ink, 0.09)), ...hull.map((v, i) => ln(S(2, v), S(2, hull[(i + 1) % hull.length]), ROLE.aid, 0.05)), ...hull.map((v) => dt(S(2, v), ROLE.output, 0.13)), lb('convex hull', [CVS.cx[2], CVS.cy - 1.7], ROLE.aid)] },
    ],
  }
}

// ── 4. Linear programming ────────────────────────────────────────────────────

/** maximise x + 2y subject to x + y ≤ 4, x ≤ 3, y ≤ 3, x, y ≥ 0: the optimum 7 is at the vertex (1, 3). */
export const LPG = { ox: -3.0, oy: -2.3, u: 1.1, cvec: [1, 2] as Pt, levels: [3, 5, 7] as readonly number[] }
export const lpPoly: ReadonlyArray<Pt> = [[0, 0], [3, 0], [3, 1], [1, 3], [0, 3]]
export const lpFeasible = (x: number, y: number) => x >= -1e-9 && y >= -1e-9 && x <= 3 + 1e-9 && y <= 3 + 1e-9 && x + y <= 4 + 1e-9
export const lpObj = (p: Pt) => LPG.cvec[0] * p[0] + LPG.cvec[1] * p[1]
export const lpAt = (p: Pt): Pt => [LPG.ox + LPG.u * p[0], LPG.oy + LPG.u * p[1]]

/** KG: minimise / maximise a linear objective over a polyhedron: the optimum is at a vertex. */
export function buildLinearProgrammingScene(): SceneSpec {
  return framed(raw_buildLinearProgrammingScene())
}
function raw_buildLinearProgrammingScene(): SceneSpec {
  const A = lpAt
  const levelLine = (c: number): [Pt, Pt] => { const y0 = Math.max(0, (c - 3.4) / 2), y1 = Math.min(3.2, c / 2); return [[c - 2 * y0, y0], [c - 2 * y1, y1]] }
  return {
    id: 'math-linear-programming',
    title: 'Linear programming: the optimum is at a vertex',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a linear program: maximise x + 2y subject to x + y ≤ 4, x ≤ 3, y ≤ 3, x ≥ 0, y ≥ 0. The constraints cut out a convex polygon (the feasible region) with vertices (0, 0), (3, 0), (3, 1), (1, 3), (0, 3). The objective is constant along parallel lines x + 2y = c (violet) that sweep in the direction of the vector (1, 2) (red); sliding the line as far as possible while still touching the region stops at a vertex, here (1, 3) with value 7. The simplex method walks from vertex to vertex.',
    ariaLabel:
      'A coordinate system with a hatched polygon, the feasible region, with corners at the origin, (3, 0), (3, 1), (1, 3) and (0, 3), cut off at the upper right by the slanted line x plus y equals 4. In the second step two parallel violet lines for objective values 3 and 5 cross the region and a red arrow shows the direction of increase. In the third step the line for value 7 touches the region only at the corner (1, 3), marked with a green dot and labelled optimum at a vertex.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Constraints x ≥ 0, y ≥ 0, x ≤ 3, y ≤ 3 and x + y ≤ 4 cut out a convex polygon (hatched), the feasible region, with corners (0, 0), (3, 0), (3, 1), (1, 3), (0, 3). The slanted edge is the line x + y = 4.', objects: [...shadeConvex(lpPoly.map((v) => [A(v)[0], A(v)[1]] as [number, number]), 0.28, ROLE.aid, 0.015), ...lpPoly.map((v, i) => ln(A(v), A(lpPoly[(i + 1) % lpPoly.length]), ROLE.output, 0.05)), ...lpPoly.map((v) => dt(A(v), ROLE.ink, 0.1)), arrow(P(A([0, 0])[0], A([0, 0])[1] - 0.001), P(A([4.2, 0])[0], A([4.2, 0])[1]), ROLE.reference), arrow(P(A([0, 0])[0], A([0, 0])[1]), P(A([0, 3.8])[0], A([0, 3.8])[1]), ROLE.reference), lb('x + y = 4', [A([3.3, 1.7])[0] + 0.45, A([3.3, 1.7])[1] + 0.35], ROLE.output)] },
      { narration: 'The objective x + 2y has the same value along each violet line (c = 3 and c = 5 shown), and grows in the direction of the red vector (1, 2), perpendicular to the lines. Pushing the line in that direction raises the objective.', objects: [...[3, 5].map((c) => { const [a, b] = levelLine(c); return ln(A(a), A(b), ROLE.aid, 0.03) }), lb('3', [A(levelLine(3)[1])[0] - 0.35, A(levelLine(3)[1])[1] + 0.1], ROLE.aid), lb('5', [A(levelLine(5)[1])[0] - 0.35, A(levelLine(5)[1])[1] + 0.1], ROLE.aid), arrow(P(A([3.6, 1.4])[0], A([3.6, 1.4])[1]), P(A([3.6, 1.4])[0] + 0.45 * LPG.cvec[0] * 1.1, A([3.6, 1.4])[1] + 0.45 * LPG.cvec[1] * 1.1), ROLE.input), lb('c', [A([3.6, 1.4])[0] + 0.85, A([3.6, 1.4])[1] + 1.2], ROLE.input)] },
      { narration: 'Slide the line as far as it still touches the region: the last point of contact is the vertex (1, 3), where x + 2y = 7. Every vertex gives 0, 3, 5, 7 or 6, so the maximum 7 is at (1, 3). The optimum of a linear program is always at a vertex (or a whole edge), which is why the simplex method only visits vertices.', objects: [ln(A(levelLine(7)[0]), A(levelLine(7)[1]), ROLE.result, 0.04), dt(A([1, 3]), ROLE.result, 0.2), lb('7', [A(levelLine(7)[0])[0] + 0.4, A(levelLine(7)[0])[1] + 0.1], ROLE.result), lb('optimum at a vertex', [A([1, 3])[0] + 0.3, A([1, 3])[1] + 0.85], ROLE.result)] },
    ],
  }
}

// ── 5. Lagrange multipliers ──────────────────────────────────────────────────

/** minimise x² + y² subject to x + y = 2: the level circle of radius √2 is tangent to the line at (1, 1) where ∇f = (2, 2) = 2·∇g, ∇g = (1, 1). */
export const LGM = { o: [-1.6, -0.6] as Pt, u: 1.4, levels: [1, 2, 4] as readonly number[] }
export const lgmAt = (x: number, y: number): Pt => [LGM.o[0] + LGM.u * x, LGM.o[1] + LGM.u * y]

/** KG: at a constrained optimum ∇f = λ∇g (parallel gradients), together with g(x) = 0. */
export function buildLagrangeMultipliersScene(): SceneSpec {
  return framed(raw_buildLagrangeMultipliersScene())
}
function raw_buildLagrangeMultipliersScene(): SceneSpec {
  const G = lgmAt, { levels } = LGM
  return {
    id: 'math-lagrange-multipliers',
    title: 'Lagrange multipliers: tangent level curve',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how to minimise f(x, y) = x² + y² (distance squared from the origin) on the line g(x, y) = x + y − 2 = 0. The level curves of f are circles. The circle f = 1 never reaches the line, the circle f = 4 crosses it (so smaller circles still meet it), and the circle f = 2 just TOUCHES it at (1, 1): that is the minimum on the line. At a touching point the gradients are parallel, ∇f = λ∇g: here ∇f = (2, 2) and ∇g = (1, 1), so λ = 2.',
    ariaLabel:
      'A diagonal line x plus y equals 2 sloping down to the right and three circles centred on the origin: a small one that does not reach the line, a medium one labelled 2 that touches the line at the point (1, 1), and a large one labelled 4 that crosses the line twice. In the second step two parallel arrows start at the touching point and point away from the origin: a long red one, the gradient of f, and a shorter blue one, the gradient of g, with the caption gradient f equals lambda gradient g and lambda equals 2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The constraint is the line x + y = 2 (blue). The level curves f = c of x² + y² are circles about the origin (c = 1, 2, 4). Moving the constraint line to the circles: c = 1 is too small to reach it, c = 4 crosses it in two points.', objects: [ln(G(-0.6, 2.6), G(2.6, -0.6), ROLE.output, 0.05), ringAt(G(0, 0), Math.sqrt(1) * LGM.u, ROLE.reference, 48), ringAt(G(0, 0), Math.sqrt(4) * LGM.u, ROLE.input, 60), lb('1', [G(0, 1)[0], G(0, 1)[1] + 0.35]), lb('4', [G(0, 2)[0], G(0, 2)[1] + 0.35], ROLE.input), lb('x + y = 2', [G(2.4, -0.1)[0] + 0.5, G(2.4, -0.1)[1] - 0.45], ROLE.output)] },
      { narration: 'The circle c = 2 (green, radius √2) just touches the line, at (1, 1) — the smallest value of x² + y² that the line reaches, so the minimum of f on the line. There the line and the level curve share a tangent, so their normals ∇g and ∇f are parallel: ∇f = λ∇g.', objects: [ringAt(G(0, 0), Math.sqrt(2) * LGM.u, ROLE.result, 56), lb('2', [G(0, Math.SQRT2)[0] - 0.1, G(0, Math.SQRT2)[1] + 0.35], ROLE.result), dt(G(1, 1), ROLE.ink, 0.12), lb('min', [G(1, 1)[0] + 0.05, G(1, 1)[1] - 0.55], ROLE.result)] },
      { narration: 'At (1, 1): ∇f = (2x, 2y) = (2, 2) (red) and ∇g = (1, 1) (blue), so ∇f = λ∇g with λ = 2. Solving the system ∇f = λ∇g, g = 0 (three equations, three unknowns x, y, λ) gives exactly this point. The multiplier λ measures how fast the optimum changes if the constraint is moved.', objects: [arrow(P(G(1, 1)[0], G(1, 1)[1]), P(G(1, 1)[0] + 2 * 0.3, G(1, 1)[1] + 2 * 0.3), ROLE.input), arrow(P(G(1, 1)[0] + 0.14, G(1, 1)[1] - 0.14), P(G(1, 1)[0] + 0.14 + 0.3, G(1, 1)[1] - 0.14 + 0.3), ROLE.output), lb('∇f = λ∇g', [G(1, 1)[0] + 1.6, G(1, 1)[1] + 1.35], ROLE.ink), lb('λ = 2', [G(1, 1)[0] + 1.6, G(1, 1)[1] + 0.75], ROLE.result)] },
    ],
  }
}

// ── 6. Gradient descent ──────────────────────────────────────────────────────

/** f(x, y) = x² + 4y²: x_{k+1} = x_k − α∇f(x_k) with α = 0.2 from (2, 1) zigzags in to the minimum, f shrinking by 0.36 each step. */
export const GRD2 = { o: [0, 0] as Pt, u: 1.7, alpha: 0.2, x0: [2, 1] as Pt, levels: [1, 3, 8] as readonly number[], steps: 6 }
export const gdF = (p: Pt) => p[0] * p[0] + 4 * p[1] * p[1]
export const gdGrad = (p: Pt): Pt => [2 * p[0], 8 * p[1]]
export const gdIterates = (x0: Pt, alpha: number, n: number): Pt[] => { const out: Pt[] = [x0]; for (let k = 0; k < n; k++) { const g = gdGrad(out[k]); out.push([out[k][0] - alpha * g[0], out[k][1] - alpha * g[1]]) } return out }
export const gdAt = (p: Pt): Pt => [GRD2.o[0] + GRD2.u * p[0], GRD2.o[1] + GRD2.u * p[1]]

/** KG: xₖ₊₁ = xₖ − αₖ∇f(xₖ); linear convergence for strongly convex f. */
export function buildGradientMethodsScene(): SceneSpec {
  return framed(raw_buildGradientMethodsScene())
}
function raw_buildGradientMethodsScene(): SceneSpec {
  const { alpha, x0, levels, steps } = GRD2, A = gdAt, its = gdIterates(x0, alpha, steps)
  const ellipse = (c: number, color: string): SceneObject => curve(Array.from({ length: 73 }, (_, i) => { const t = (2 * Math.PI * i) / 72, p = A([Math.sqrt(c) * Math.cos(t), (Math.sqrt(c) / 2) * Math.sin(t)]); return P(p[0], p[1]) }), color)
  return {
    id: 'math-gradient-methods',
    title: 'Gradient descent on x² + 4y²',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show gradient descent xₖ₊₁ = xₖ − α∇f(xₖ) on f(x, y) = x² + 4y² with step size α = 0.2 from x₀ = (2, 1). The level curves are ellipses; −∇f points straight down the steepest slope (perpendicular to the ellipse), so each step goes downhill. Here x shrinks by a factor 0.6 each step and y by −0.6, so the path zigzags across the narrow valley while f falls by the factor 0.36 per step: geometric (linear) convergence to the minimum at the origin.',
    ariaLabel:
      'Three nested elliptical contour lines centred on the origin, wider than they are tall. In the first step a white dot on the outer ellipse is the starting point x0 with a red arrow pointing down and left, the negative gradient. In the second step a blue broken line with dots zigzags from the start to the centre: steps alternate above and below the horizontal axis and get shorter. The third step adds the captions alpha equals 0.2 and f falls by 0.36 per step.',
    stage: NO_STAGE,
    steps: [
      { narration: 'f(x, y) = x² + 4y² has elliptical level curves (slate), narrow in y. Start at x₀ = (2, 1) on the outer one. The gradient ∇f = (2x, 8y) = (4, 8) points uphill, so we go the opposite way, along −∇f (red).', objects: [...levels.map((c) => ellipse(c, ROLE.reference)), dt(A(x0), ROLE.ink, 0.14), lb('x₀', [A(x0)[0] + 0.45, A(x0)[1] + 0.3]), arrow(P(A(x0)[0], A(x0)[1]), P(A(x0)[0] - 0.8 * 0.447, A(x0)[1] - 0.8 * 0.894), ROLE.input), lb('−∇f', [A(x0)[0] - 0.5, A(x0)[1] - 1.2], ROLE.input)] },
      { narration: 'Step: x₁ = x₀ − 0.2·(4, 8) = (1.2, −0.6), x₂ = (0.72, 0.36), x₃ = (0.432, −0.216), … Each iterate overshoots the valley floor and lands on the other side, so the path zigzags, but the steps shrink and the iterates head for the minimum at the origin.', objects: [...its.slice(0, -1).map((p, i) => ln(A(p), A(its[i + 1]), ROLE.output, 0.05)), ...its.slice(1).map((p) => dt(A(p), ROLE.output, 0.1)), ...[1, 2, 3].map((k) => lb(String(k), [A(its[k])[0] + 0.3, A(its[k])[1] + (its[k][1] > 0 ? 0.4 : -0.4)], ROLE.output))] },
      { narration: 'The value f falls by the same factor each step: f(x₀) = 8, f(x₁) = 2.88, f(x₂) = 1.04, … each is 0.36 of the last (geometric, or linear, convergence). The step size matters: too large (α > 0.25 here) and the iterates blow up, too small and progress crawls.', objects: [lb('α = 0.2', [0, -3.9], ROLE.ink), lb('f falls by 0.36 per step', [0, 3.9], ROLE.result)] },
    ],
  }
}

// ── 7. Newton's method ───────────────────────────────────────────────────────

/** f(x) = x² − 2 from x₀ = 2: x₁ = 1.5, x₂ = 1.41667, x₃ = 1.41422 — the error squares each step. */
export const NWT = { ux: 2.8, uy: 0.9, ox: -1.5 * 2.8, oy: -1.0, x0: 0.5, x1: 2.5, start: 2 }
export const nwtF = (x: number) => x * x - 2
export const nwtD = (x: number) => 2 * x
export const nwtIterates = (x0: number, n: number): number[] => { const out = [x0]; for (let i = 0; i < n; i++) out.push(out[i] - nwtF(out[i]) / nwtD(out[i])); return out }
export const nwtAt = (x: number, y: number): Pt => [NWT.ox + NWT.ux * x, NWT.oy + NWT.uy * y]

/** KG: xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ), quadratic convergence near a simple root. */
export function buildNewtonsMethodScene(): SceneSpec {
  return framed(raw_buildNewtonsMethodScene())
}
function raw_buildNewtonsMethodScene(): SceneSpec {
  const { x0, x1, start } = NWT, G = nwtAt, xs = nwtIterates(start, 3), root = Math.SQRT2
  const tangent = (k: number, color: string): SceneObject[] => [ln(G(xs[k], nwtF(xs[k])), G(xs[k + 1], 0), color, 0.04), ln(G(xs[k], 0), G(xs[k], nwtF(xs[k])), ROLE.aid, 0.02), dt(G(xs[k], nwtF(xs[k])), ROLE.ink, 0.1)]
  return {
    id: 'math-newtons-method',
    title: "Newton's method: follow the tangent to the axis",
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: "Show Newton's method for f(x) = x² − 2 (root √2 = 1.41421). From x₀ = 2 draw the tangent to the graph; where it meets the x-axis is the next guess x₁ = x₀ − f(x₀)/f′(x₀) = 2 − 2/4 = 1.5. Repeating gives x₂ = 1.41667 and x₃ = 1.41422. The errors 0.586, 0.086, 0.0025, 0.000002 roughly square at each step (quadratic convergence), so the number of correct digits doubles.",
    ariaLabel:
      'The parabola y equals x squared minus 2 crossing the horizontal axis at about 1.41. A dot on the curve above x equals 2, with a vertical guide line to the axis, and a red tangent line running down to the axis at 1.5. In the second step a dot above 1.5 with its tangent running to 1.4167, almost at the root. The third step shows a dot above 1.4167 whose tangent hits the axis at 1.41422, and the captions give the errors 0.586, 0.086 and 0.0025, each about the square of the one before.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Solve x² − 2 = 0 starting from the guess x₀ = 2. The point on the graph above it is (2, 2); the tangent there has slope f′(2) = 4. Where this tangent meets the axis is the improved guess x₁ = 2 − 2/4 = 1.5.', objects: [...axes(G, x0 - 0.1, x1 + 0.1, -2.0, 4.4, x0), plot(nwtF, x0, x1, G, ROLE.output), ...tangent(0, ROLE.input), lb('x₀', [G(xs[0], 0)[0], G(xs[0], 0)[1] - 0.45]), lb('x₁', [G(xs[1], 0)[0] - 0.1, G(xs[1], 0)[1] - 0.45])] },
      { narration: 'Repeat from x₁ = 1.5: f(1.5) = 0.25, f′(1.5) = 3, so x₂ = 1.5 − 0.25/3 = 1.41667. One more tangent and we are already within 0.0025 of the root √2.', objects: [...tangent(1, ROLE.result), lb('x₂', [G(xs[2], 0)[0] - 0.4, G(xs[2], 0)[1] - 0.45])] },
      { narration: 'Again: x₃ = 1.41667 − f/f′ = 1.41422. The errors 0.586, 0.086, 0.0025, 0.0000021 are each about 0.35 times the square of the previous one: quadratic convergence, the correct digits double. (It can fail where f′ = 0 or near a multiple root.)', objects: [...tangent(2, ROLE.aid), dt(G(root, 0), ROLE.result, 0.12), lb('root √2', [G(root, 0)[0] + 0.3, G(root, 0)[1] + 0.55], ROLE.result), lb('errors 0.59, 0.086, 0.0025', [0.2, -3.7], ROLE.ink)] },
    ],
  }
}

// ── 8. Polynomial interpolation ──────────────────────────────────────────────

/** Left: the quadratic through (−1, 1), (0, 0), (1, 2) is 1.5x² + 0.5x. Right: Runge's function 1/(1 + 25x²) interpolated at 5 and 9 equally spaced nodes: the polynomial wiggles more and more near the ends. */
export const INT = { oxL: -3.2, oyL: -1.6, uxL: 0.9, uyL: 0.8, oxR: 2.5, oyR: -1.8, uxR: 2.0, uyR: 2.0, pts: [[-1, 1], [0, 0], [1, 2]] as ReadonlyArray<Pt>, ns: [4, 8] as readonly number[] }
export const runge = (x: number) => 1 / (1 + 25 * x * x)
export const lagrange = (xs: readonly number[], ys: readonly number[]) => (x: number) => { let s = 0; for (let i = 0; i < xs.length; i++) { let t = ys[i]; for (let j = 0; j < xs.length; j++) if (j !== i) t *= (x - xs[j]) / (xs[i] - xs[j]); s += t } return s }
export const equalNodes = (n: number): number[] => Array.from({ length: n + 1 }, (_, i) => -1 + (2 * i) / n)
export const intL = (x: number, y: number): Pt => [INT.oxL + INT.uxL * x, INT.oyL + INT.uyL * y]
export const intR = (x: number, y: number): Pt => [INT.oxR + INT.uxR * x, INT.oyR + INT.uyR * y]
const quad3 = lagrange([-1, 0, 1], [1, 0, 2])

/** KG: n + 1 points determine a unique interpolating polynomial of degree ≤ n (Lagrange / Newton form); Runge's phenomenon. */
export function buildInterpolationScene(): SceneSpec {
  return framed(raw_buildInterpolationScene())
}
function raw_buildInterpolationScene(): SceneSpec {
  const { pts, ns } = INT
  const polyOf = (n: number) => lagrange(equalNodes(n), equalNodes(n).map(runge))
  return {
    id: 'math-interpolation',
    title: 'Polynomial interpolation and Runge’s phenomenon',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show interpolation: through n + 1 points with distinct x there is exactly one polynomial of degree at most n. Left: the three points (−1, 1), (0, 0), (1, 2) lie on the single parabola 1.5x² + 0.5x. Right: interpolating the bell-shaped function 1/(1 + 25x²) at equally spaced nodes does NOT get better with more points — the degree-4 polynomial already overshoots, and the degree-8 polynomial swings far from the function near the ends of the interval (Runge’s phenomenon), although it still passes through every node.',
    ariaLabel:
      'Left: three white dots and one blue parabola passing through all of them, captioned the unique quadratic. Right: a white bell-shaped curve, high in the middle and almost flat at the ends. In the second step five dots on it and a blue degree-4 polynomial through them that dips below zero and overshoots near the ends. In the third step nine dots and a red degree-8 polynomial through them that matches the bell in the middle but swings wildly high near the two ends.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Three points with different x determine exactly one polynomial of degree ≤ 2: here the parabola p(x) = 1.5x² + 0.5x passes through (−1, 1), (0, 0) and (1, 2). In general n + 1 points give a unique polynomial of degree ≤ n (Lagrange form).', objects: [...axes(intL, -1.7, 1.7, -0.6, 2.8), plot(quad3, -1.5, 1.5, intL, ROLE.output), ...pts.map((p) => dt(intL(p[0], p[1]), ROLE.ink, 0.13)), lb('unique quadratic', [INT.oxL, INT.oyL + 3.2], ROLE.output)] },
      { narration: 'Now interpolate the bell function 1/(1 + 25x²) (white) on [−1, 1] at 5 equally spaced nodes: the degree-4 polynomial (blue) passes through all five points but dips below zero and overshoots between them.', objects: [...axes(intR, -1.2, 1.2, -0.6, 1.5, 0), plot(runge, -1, 1, intR, ROLE.ink, 80), ...equalNodes(ns[0]).map((x) => dt(intR(x, runge(x)), ROLE.ink, 0.1)), plot(polyOf(ns[0]), -1, 1, intR, ROLE.output, 80), lb('5 nodes', [INT.oxR - 1.4, INT.oyR + 3.4], ROLE.output)] },
      { narration: 'With 9 nodes the degree-8 polynomial (red) fits the middle better but swings far from the function near the ends. More equally spaced nodes make the edge oscillation WORSE: this is Runge’s phenomenon, and why high-degree interpolation on equal spacing is avoided (use Chebyshev nodes or splines).', objects: [...equalNodes(ns[1]).map((x) => dt(intR(x, runge(x)), ROLE.ink, 0.1)), plot(polyOf(ns[1]), -1, 1, intR, ROLE.input, 100), lb('9 nodes', [INT.oxR + 1.4, INT.oyR + 3.4], ROLE.input)] },
    ],
  }
}

// ── 9. Numerical differentiation ─────────────────────────────────────────────

/** f = sin x at x = 1, h = 0.8: forward slope 0.165 and central slope 0.484 against the true 0.540; errors versus h = 0.8, 0.4, 0.2. */
export const NDF = { ox: -4.7, oy: -2.2, ux: 1.6, uy: 2.2, x: 1, h: 0.8, hs: [0.8, 0.4, 0.2] as readonly number[], bars: { ox: 0.8, oy: -2.4, w: 0.4, scale: 5.0, gap: 1.3 } }
export const fwdDiff = (f: (x: number) => number, x: number, h: number) => (f(x + h) - f(x)) / h
export const cenDiff = (f: (x: number) => number, x: number, h: number) => (f(x + h) - f(x - h)) / (2 * h)
export const ndfAt = (x: number, y: number): Pt => [NDF.ox + NDF.ux * x, NDF.oy + NDF.uy * y]

/** KG: forward difference error O(h), centred difference error O(h²). */
export function buildNumericalDifferentiationScene(): SceneSpec {
  return framed(raw_buildNumericalDifferentiationScene())
}
function raw_buildNumericalDifferentiationScene(): SceneSpec {
  const { x, h, hs, bars } = NDF, G = ndfAt, truth = Math.cos(x)
  const line2 = (x0: number, x1: number, slope: number, through: number, color: string, t = 0.04) => ln(G(x0, Math.sin(x) + slope * (x0 - through)), G(x1, Math.sin(x) + slope * (x1 - through)), color, t)
  return {
    id: 'math-numerical-differentiation',
    title: 'Numerical differentiation: forward and centred differences',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show two ways to estimate f′(1) for f = sin x without differentiating: the forward difference (f(x + h) − f(x))/h is the slope of the secant from x to x + h (red) and the centred difference (f(x + h) − f(x − h))/(2h) the slope of the secant from x − h to x + h (blue); the true tangent (green) has slope cos 1 = 0.540. With h = 0.8 the forward estimate 0.165 is off by 0.375 and the centred one 0.484 by only 0.056. Halving h halves the forward error (O(h)) but quarters the centred error (O(h²)).',
    ariaLabel:
      'Left: the sine curve rising from the origin with a green tangent line at x equals 1. Two secant lines join points on the curve: a red one from x equals 1 to 1.8, flatter than the tangent, and a blue one from 0.2 to 1.8, nearly parallel to the tangent. Right: a bar chart of the errors for h equal to 0.8, 0.4 and 0.2: red bars for the forward difference that halve each time, and much shorter blue bars for the centred difference that shrink by four each time, captioned forward O(h) and central O(h squared).',
    stage: NO_STAGE,
    steps: [
      { narration: 'We want f′(1) for f = sin x; exactly it is cos 1 = 0.540, the slope of the green tangent. Pretend we only know values of f.', objects: [...axes(G, -0.1, 2.5, -0.2, 1.2, 0), plot(Math.sin, 0, 2.4, G, ROLE.output, 60), line2(0.1, 2.3, truth, x, ROLE.result), dt(G(x, Math.sin(x)), ROLE.ink, 0.12)] },
      { narration: 'Forward difference with h = 0.8: slope of the secant through x = 1 and x = 1.8 (red) = (sin 1.8 − sin 1)/0.8 = 0.165 — much flatter than the tangent. Centred difference: slope of the secant through x = 0.2 and 1.8 (blue) = (sin 1.8 − sin 0.2)/1.6 = 0.484 — almost parallel to the tangent.', objects: [ln(G(x, Math.sin(x)), G(x + h, Math.sin(x + h)), ROLE.input, 0.05), ln(G(x - h, Math.sin(x - h)), G(x + h, Math.sin(x + h)), ROLE.output, 0.05), dt(G(x + h, Math.sin(x + h)), ROLE.ink, 0.1), dt(G(x - h, Math.sin(x - h)), ROLE.ink, 0.1)] },
      { narration: 'Errors against the true 0.540 for h = 0.8, 0.4, 0.2: forward 0.375, 0.180, 0.087 — halved each time (O(h)); centred 0.056, 0.014, 0.004 — divided by about 4 each time (O(h²)). Smaller h helps, until round-off error in the subtraction takes over.', objects: [ln([bars.ox - 0.25, bars.oy], [bars.ox + 3 * bars.gap + 0.2, bars.oy], ROLE.reference, 0.03), ...hs.flatMap((hh, i) => [ln([bars.ox + i * bars.gap, bars.oy], [bars.ox + i * bars.gap, bars.oy + Math.abs(fwdDiff(Math.sin, x, hh) - truth) * bars.scale], ROLE.input, 0.14), ln([bars.ox + i * bars.gap + 0.4, bars.oy], [bars.ox + i * bars.gap + 0.4, bars.oy + Math.abs(cenDiff(Math.sin, x, hh) - truth) * bars.scale], ROLE.output, 0.14), lb(String(hh), [bars.ox + i * bars.gap + 0.2, bars.oy - 0.45])]), lb('forward O(h)', [bars.ox + 1.0, bars.oy + 2.6], ROLE.input), lb('central O(h²)', [bars.ox + 1.2, bars.oy + 3.2], ROLE.output), lb('error vs h', [bars.ox + 1.3, bars.oy - 0.95])] },
    ],
  }
}

// ── 10. Numerical integration ────────────────────────────────────────────────

/** ∫₀^π sin x dx = 2: trapezoid rule with 4 panels gives 1.896 (error 0.104), Simpson's rule with 4 panels gives 2.0046 (error 0.0046). */
export const NIN = { oxL: -4.4, oxR: 0.5, oy: -1.6, ux: 1.0, uy: 2.0, n: 4 }
export const trapezoid = (f: (x: number) => number, a: number, b: number, n: number) => { const h = (b - a) / n; let s = (f(a) + f(b)) / 2; for (let i = 1; i < n; i++) s += f(a + i * h); return s * h }
export const simpson = (f: (x: number) => number, a: number, b: number, n: number) => { const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 === 1 ? 4 : 2); return (s * h) / 3 }
export const ninAt = (ox: number, x: number, y: number): Pt => [ox + NIN.ux * x, NIN.oy + NIN.uy * y]

/** KG: trapezoidal rule O(h²), Simpson's rule O(h⁴), composite rules on [a, b]. */
export function buildNumericalIntegrationScene(): SceneSpec {
  return framed(raw_buildNumericalIntegrationScene())
}
function raw_buildNumericalIntegrationScene(): SceneSpec {
  const { oxL, oxR, n } = NIN, a = 0, b = Math.PI, h = (b - a) / n, f = Math.sin
  const T = trapezoid(f, a, b, n), S = simpson(f, a, b, n)
  const xsN = Array.from({ length: n + 1 }, (_, i) => a + i * h)
  const base = (ox: number): SceneObject[] => [ln(ninAt(ox, -0.1, 0), ninAt(ox, b + 0.2, 0), ROLE.reference, 0.04), plot(f, a, b, (x, y) => ninAt(ox, x, y), ROLE.ink, 60)]
  const parabola = (k: number): SceneObject => { const x0 = xsN[2 * k], x1 = xsN[2 * k + 1], x2 = xsN[2 * k + 2], q = lagrange([x0, x1, x2], [f(x0), f(x1), f(x2)]); return plot(q, x0, x2, (x, y) => ninAt(oxR, x, y), ROLE.output, 24) }
  return {
    id: 'math-numerical-integration',
    title: 'Numerical integration: trapezoid and Simpson',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show two rules for ∫₀^π sin x dx (exact value 2) with 4 panels of width π/4. The trapezoid rule replaces the curve on each panel by a chord and adds the trapezoid areas: T = 1.896, error 0.104 (error O(h²)). Simpson’s rule replaces the curve on each PAIR of panels by the parabola through three points: S = 2.0046, error only 0.0046 (error O(h⁴)) — about 20 times more accurate with the same four panels.',
    ariaLabel:
      'Left: one arch of the sine curve above the horizontal axis with four red trapezoids under it, the chord on top of each panel, captioned T4 equals 1.90. Right: the same arch with two blue parabola arcs, each through three of the five points, that follow the curve almost exactly, captioned S4 equals 2.00. Below, the captions give the errors 0.10 for the trapezoid rule and 0.005 for Simpson’s rule, and the exact value 2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Split [0, π] into 4 panels of width π/4 (vertical lines). Trapezoid rule: replace the curve on each panel by the chord (red) and add the four trapezoid areas: T = (π/4)(sin(π/4) + sin(π/2) + sin(3π/4)) = 1.896.', objects: [...base(oxL), ...xsN.filter((x) => f(x) > 1e-9).map((x) => ln(ninAt(oxL, x, 0), ninAt(oxL, x, f(x)), ROLE.input, 0.025)), ...xsN.slice(0, -1).map((x, i) => ln(ninAt(oxL, x, f(x)), ninAt(oxL, xsN[i + 1], f(xsN[i + 1])), ROLE.input, 0.05)), lb(`T₄ = ${f2(T)}`, [oxL + 1.6, NIN.oy - 0.7], ROLE.input)] },
      { narration: 'Simpson\'s rule works on PAIRS of panels: fit the parabola through three consecutive points (blue arcs) and integrate it exactly. With the same five points it gives S = (π/12)(0 + 4·0.7071 + 2·1 + 4·0.7071 + 0) = 2.0046 — the parabolas are almost indistinguishable from the curve.', objects: [...base(oxR), ...xsN.filter((x) => f(x) > 1e-9).map((x) => ln(ninAt(oxR, x, 0), ninAt(oxR, x, f(x)), ROLE.output, 0.025)), ...[0, 1].map(parabola), lb(`S₄ = ${f2(S)}`, [oxR + 1.6, NIN.oy - 0.7], ROLE.output)] },
      { narration: 'The exact value is 2. Trapezoid error 0.104 (it shrinks like h²), Simpson error 0.0046 (it shrinks like h⁴): halving h cuts the trapezoid error by 4 but the Simpson error by 16. Gaussian quadrature goes further: n well-placed nodes integrate every polynomial of degree ≤ 2n − 1 exactly.', objects: [lb('error 0.10', [oxL + 1.6, NIN.oy - 1.4], ROLE.input), lb('error 0.005', [oxR + 1.6, NIN.oy - 1.4], ROLE.output), lb('exact 2', [(oxL + oxR) / 2 + 1.6, NIN.oy + 2.6], ROLE.result)] },
    ],
  }
}

// ── 11. Real-valued functions ────────────────────────────────────────────────

/** f(x) = x² − 1 on [−2, 2]: domain [−2, 2], range [−1, 3]; the circle x² + y² = 1.5² fails the vertical line test. */
export const RVF = { ox: -2.6, oy: -1.0, ux: 0.9, uy: 0.7, d: [-2, 2] as readonly number[], circ: { c: [2.9, -0.2] as Pt, r: 1.5 }, vt: 0.8, vtC: 0.9 }
export const rvfF = (x: number) => x * x - 1
export const rvfAt = (x: number, y: number): Pt => [RVF.ox + RVF.ux * x, RVF.oy + RVF.uy * y]

/** KG: a function ℝ ⊇ D → ℝ: one output for each input; domain, range, vertical line test. */
export function buildRealValuedFunctionScene(): SceneSpec {
  return framed(raw_buildRealValuedFunctionScene())
}
function raw_buildRealValuedFunctionScene(): SceneSpec {
  const { d, circ, vt, vtC } = RVF, G = rvfAt, lo = -1, hi = 3
  const y1 = Math.sqrt(circ.r * circ.r - vtC * vtC)
  return {
    id: 'math-real-valued-function',
    title: 'A real-valued function: domain, range, one output',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a real-valued function f(x) = x² − 1 as a graph: each input x in the DOMAIN (here the interval [−2, 2], violet on the x-axis) gives exactly ONE output f(x), and the set of outputs is the RANGE (green on the y-axis): [−1, 3]. The vertical line test says a curve is the graph of a function exactly when every vertical line meets it at most once: the parabola passes (one dot) but the circle x² + y² = 2.25 fails (two dots on the same vertical line), so it is not the graph of a function.',
    ariaLabel:
      'Left: the parabola y equals x squared minus 1 drawn for x from minus 2 to 2, with a violet bar on the horizontal axis covering minus 2 to 2 labelled domain and a green bar on the vertical axis covering minus 1 to 3 labelled range. A dashed violet vertical line crosses the parabola at one dot. Right: a red circle with a vertical line crossing it at two red dots, captioned not a function.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A real-valued function sends each real number x in its domain to one real number f(x). Its graph is the set of points (x, f(x)); here f(x) = x² − 1. A vertical line (violet) meets the graph in exactly one point: one input, one output.', objects: [...axes(G, d[0] - 0.4, d[1] + 0.4, -1.4, 3.6, 0), plot(rvfF, d[0], d[1], G, ROLE.output), ln(G(vt, -1.3), G(vt, 3.4), ROLE.aid, 0.025), dt(G(vt, rvfF(vt)), ROLE.ink, 0.13), lb('f(x)', [G(1.7, rvfF(1.7))[0] + 0.7, G(1.7, rvfF(1.7))[1] + 0.2], ROLE.output)] },
      { narration: 'The DOMAIN is the set of allowed inputs, here x from −2 to 2 (violet bar on the x-axis). The RANGE is the set of outputs actually produced: from the minimum f(0) = −1 up to f(±2) = 3, so [−1, 3] (green bar on the y-axis).', objects: [ln(G(d[0], 0), G(d[1], 0), ROLE.aid, 0.12), ln(G(0, lo), G(0, hi), ROLE.result, 0.12), lb('domain', [G(0.9, 0)[0], G(0.9, 0)[1] - 0.5], ROLE.aid), lb('range', [G(0, 1.5)[0] - 1.0, G(0, 1.5)[1]], ROLE.result)] },
      { narration: 'Vertical line test: a curve is the graph of a function only if no vertical line meets it twice. The circle x² + y² = 2.25 fails: the vertical line x = 0.9 meets it at y = ±1.2 (two outputs for one input), so it is not the graph of a function — though each half of the circle is.', objects: [ringAt(circ.c, circ.r, ROLE.input, 56), ln([circ.c[0] + vtC, circ.c[1] - 1.9], [circ.c[0] + vtC, circ.c[1] + 1.9], ROLE.aid, 0.025), dt([circ.c[0] + vtC, circ.c[1] + y1], ROLE.input, 0.13), dt([circ.c[0] + vtC, circ.c[1] - y1], ROLE.input, 0.13), lb('not a function', [circ.c[0], circ.c[1] - circ.r - 0.8], ROLE.input)] },
    ],
  }
}

// ── 12. Real roots of a polynomial ───────────────────────────────────────────

/** p(x) = 0.25 (x + 2)(x − 1)²(x − 3): simple roots −2 and 3 (the curve crosses the axis) and a double root 1 (it touches and turns back). */
export const RRT = { ox: -0.48, oy: -0.8, ux: 1.2, uy: 0.3, x0: -2.6, x1: 3.4, roots: [{ r: -2, m: 1 }, { r: 1, m: 2 }, { r: 3, m: 1 }] as ReadonlyArray<{ r: number; m: number }> }
export const rrtP = (x: number) => 0.25 * (x + 2) * (x - 1) * (x - 1) * (x - 3)
export const rrtAt = (x: number, y: number): Pt => [RRT.ox + RRT.ux * x, RRT.oy + RRT.uy * y]

/** KG: real roots are the x-intercepts; a root of multiplicity m: the graph crosses the axis if m is odd, touches and turns if m is even. */
export function buildRationalRootScene(): SceneSpec {
  return framed(raw_buildRationalRootScene())
}
function raw_buildRationalRootScene(): SceneSpec {
  const { x0, x1, roots } = RRT, G = rrtAt
  const signs: Array<[number, string, string]> = [[-2.3, '+', ROLE.result], [-0.5, '−', ROLE.input], [2.0, '−', ROLE.input], [3.25, '+', ROLE.result]]
  return {
    id: 'math-polynomial-roots',
    title: 'Real roots of a polynomial and their multiplicity',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show real roots as x-intercepts of the graph of p(x) = 0.25(x + 2)(x − 1)²(x − 3), which has roots −2, 1 and 3. The roots −2 and 3 have multiplicity 1: the graph CROSSES the axis there and p changes sign. The root 1 has multiplicity 2 (the factor (x − 1)² appears twice): the graph only TOUCHES the axis and turns back, p does not change sign. In general the graph crosses at a root of odd multiplicity and touches at one of even multiplicity.',
    ariaLabel:
      'A blue curve of a quartic polynomial, high on both ends, dipping below the horizontal axis between minus 2 and 3 except for one touch of the axis at x equals 1. Green dots mark the roots minus 2, 1 and 3 with the numbers 1, 2 and 1 for their multiplicities. In the second step the crossings at minus 2 and 3 are marked with small arrows through the axis, and the touching at 1 with a red mark. The third step labels the sign of the polynomial on the four intervals: plus, minus, minus, plus.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The real roots of p are the x-intercepts of its graph. Factorised, p(x) = 0.25(x + 2)(x − 1)²(x − 3), so the roots are x = −2, x = 1 and x = 3 (green dots).', objects: [...axes(G, x0 - 0.2, x1 + 0.2, -4.6, 11.5, 0), plot(rrtP, x0, x1, G, ROLE.output, 90), ...roots.map(({ r }) => dt(G(r, 0), ROLE.result, 0.13)), ...roots.map(({ r }) => lb(String(r), [G(r, 0)[0], G(r, 0)[1] - 0.5]))] },
      { narration: 'Multiplicity decides what the graph does: the factors (x + 2) and (x − 3) appear once (multiplicity 1), so the graph crosses the axis there; (x − 1) appears twice (multiplicity 2), so the graph touches the axis at x = 1 and turns back without crossing.', objects: [...roots.map(({ r, m }) => lb(`m ${m}`, [G(r, 0)[0] + (r === 1 ? 0.0 : 0.0), G(r, 0)[1] + (r === 1 ? 0.65 : -1.1)], m === 1 ? ROLE.output : ROLE.input)), ...[-2, 3].map((r) => ln(G(r, -1.6), G(r, 1.6), ROLE.output, 0.03)), dt(G(1, 0), ROLE.input, 0.2)] },
      { narration: 'Sign of p: positive left of −2, negative between −2 and 3 — it stays negative on both sides of the touching point x = 1 — and positive right of 3. The sign changes only at roots of odd multiplicity.', objects: signs.map(([x, s, c]) => lb(s, [G(x, 0)[0], G(x, 0)[1] + (s === '+' ? 1.3 : -1.8)], c)) },
    ],
  }
}

// ── 13. Topological manifold ─────────────────────────────────────────────────

/** The circle is a 1-manifold: two open arcs U₁ (10°–190°) and U₂ (170°–370°) cover it and each is homeomorphic to an interval (a chart); the figure eight is not: near its crossing it is not an interval. */
export const MNF = { c: [-2.4, 1.6] as Pt, R: 1.2, arcs: [[10, 190], [170, 370]] as ReadonlyArray<readonly [number, number]>, charts: [{ y: -1.0, x0: -4.6, x1: -3.0 }, { y: -1.0, x0: -1.8, x1: -0.2 }] as ReadonlyArray<{ y: number; x0: number; x1: number }>, eight: { c: [2.9, 0.9] as Pt, r: 0.8 } }
/** the chart φ: an arc point at angle a (degrees) in [a0, a1] goes to the interval point x0 + (x1 − x0)(a − a0)/(a1 − a0) */
export const chartX = (k: number, a: number) => { const [a0, a1] = MNF.arcs[k], ch = MNF.charts[k]; return ch.x0 + ((ch.x1 - ch.x0) * (a - a0)) / (a1 - a0) }

/** KG: a manifold is locally homeomorphic to ℝⁿ at every point; circles and surfaces are manifolds. */
export function buildTopologicalManifoldScene(): SceneSpec {
  return framed(raw_buildTopologicalManifoldScene())
}
function raw_buildTopologicalManifoldScene(): SceneSpec {
  const { c, R, arcs, charts, eight } = MNF
  const colors = [ROLE.output, ROLE.input]
  const arcAt = (k: number, extra = 0): SceneObject => curve(arcPts(c[0], c[1], R + extra, arcs[k][0], arcs[k][1], 40), colors[k])
  const chart = (k: number): SceneObject[] => [ln([charts[k].x0, charts[k].y], [charts[k].x1, charts[k].y], colors[k], 0.07), dt([charts[k].x0, charts[k].y], colors[k], 0.08), dt([charts[k].x1, charts[k].y], colors[k], 0.08), arrow(P(c[0] - 0.7 + k * 1.4, c[1] - R - 0.3), P((charts[k].x0 + charts[k].x1) / 2, charts[k].y + 0.4), ROLE.reference), lb(k === 0 ? 'φ₁' : 'φ₂', [(charts[k].x0 + charts[k].x1) / 2 + (k === 0 ? -0.6 : 0.6), charts[k].y + 1.0], colors[k])]
  return {
    id: 'math-topological-manifold',
    title: 'Manifold: locally like ℝⁿ',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show what a manifold is: a space that near every point looks like ordinary ℝⁿ. The circle is a 1-manifold: it is covered by two overlapping open arcs U₁ (blue) and U₂ (red), and each arc can be flattened, by a homeomorphism φ (a chart), onto an open interval of the line — no single chart covers the whole circle, but two overlapping ones do. A figure eight is NOT a manifold: at its crossing point every small neighbourhood looks like a cross with four branches, which is not homeomorphic to any interval of ℝ.',
    ariaLabel:
      'Top left: a circle drawn in two overlapping pieces, an upper blue arc from about 10 to 190 degrees and a lower red arc from 170 to 370 degrees, overlapping slightly at both ends. Below it two horizontal bars, a blue one and a red one, are the charts: a downward arrow labelled phi one from the blue arc to the blue bar and phi two from the red arc to the red bar. Right: a figure eight made of two touching loops with a small red ring around the crossing point showing four branches meeting there, captioned not a manifold.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A manifold looks like ℝⁿ near each point. Take the circle and the open arc U₁ (blue, the top 180°, ends not included). It can be straightened onto an open interval: the chart φ₁ (blue bar) — an arc is homeomorphic to a line segment.', objects: [arcAt(0), ...chart(0), lb('U₁', [c[0] - 0.2, c[1] + R + 0.5], ROLE.output)] },
      { narration: 'One chart cannot cover the whole circle (a full circle is not homeomorphic to an interval), but a second arc U₂ (red, from 170° round to 370°) overlaps U₁ at both ends and has its own chart φ₂. Together U₁ ∪ U₂ cover every point: the circle is a 1-manifold.', objects: [arcAt(1, 0.08), ...chart(1), lb('U₂', [c[0] + 0.2, c[1] - R - 0.5], ROLE.input)] },
      { narration: 'Not every shape works. The figure eight is fine at every point except the crossing: there a small neighbourhood is a cross with four branches, and removing the centre leaves four pieces while an interval minus a point leaves two. So no chart exists there and the figure eight is not a manifold.', objects: [ringAt([eight.c[0] - eight.r, eight.c[1]], eight.r, ROLE.reference, 48), ringAt([eight.c[0] + eight.r, eight.c[1]], eight.r, ROLE.reference, 48), ringAt(eight.c, 0.3, ROLE.input, 24), dt(eight.c, ROLE.input, 0.08), lb('not a manifold', [eight.c[0], eight.c[1] - 1.45], ROLE.input)] },
    ],
  }
}
