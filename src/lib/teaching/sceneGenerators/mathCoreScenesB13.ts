/**
 * Core school-mathematics figures — batch 13 of the mathematics visual campaign
 * (2026-10-12): linear algebra in the plane.
 *
 * A vector as an ordered pair that can be moved, scalar multiples, the norm (Pythagoras, the
 * triangle inequality, the unit balls of the 1-, 2- and ∞-norms), unit vectors, orthogonality,
 * span, linear independence, bases, coordinates in a skew basis, change of basis, a linear map
 * as a transformed unit square and orthogonal projection as the closest point. Same rules as
 * batches 1-12: one visual language from visualDesign.ts, labels are names not sentences
 * (marks of 1-2 characters are free), steps are cumulative, coordinates stay inside +-5, at
 * most 50 objects per step, nothing the figure audit rejects, and every number drawn comes
 * from the constants and pure helpers exported here, which the test file re-derives
 * independently from the DRAWN coordinates.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, guide, mathAxes, polyLines, arcPts, rightAngleMark, gridLines, type XY, type V3 } from './mathSceneKit'

const DEG = Math.PI / 180
const f1 = (n: number) => (Math.round(n * 10) / 10).toFixed(1)
const f2 = (n: number) => { const v = (Math.round(n * 100) / 100).toFixed(2); return v === '-0.00' ? '0.00' : v }
const minus = (s: string) => s.replace('-', '−')
export type Vec = readonly [number, number]
export const add = (p: Vec, q: Vec): XY => [p[0] + q[0], p[1] + q[1]]
export const sub = (p: Vec, q: Vec): XY => [p[0] - q[0], p[1] - q[1]]
export const scale = (c: number, p: Vec): XY => [c * p[0], c * p[1]]
export const dotv = (p: Vec, q: Vec) => p[0] * q[0] + p[1] * q[1]
export const norm = (p: Vec) => Math.hypot(p[0], p[1])
export const det2 = (p: Vec, q: Vec) => p[0] * q[1] - p[1] * q[0]
const unitOf = (p: Vec): XY => [p[0] / norm(p), p[1] / norm(p)]
const dir = (a: Vec, b: Vec): XY => unitOf(sub(b, a))
/** The coordinates (c1, c2) with c1 b1 + c2 b2 = w (Cramer's rule). */
export const solveBasis = (b1: Vec, b2: Vec, w: Vec): XY => { const d = det2(b1, b2); return [det2(w, b2) / d, det2(b1, w) / d] }

// ── 1. Vector ────────────────────────────────────────────────────────────────

/** v = (3, 2) drawn from several tails (the same vector); w = (2, 3) is a different vector. */
export const VEC = { v: [3, 2], w: [2, 3], tails: [[1.2, 3.2], [-1.5, 0]] as readonly Vec[], u: 0.8, ox: -2.4, oy: -1.6 } as const

/** KG: an ordered tuple of numbers; in ℝⁿ a magnitude with direction. */
export function buildVectorScene(): SceneSpec {
  return framed(raw_buildVectorScene())
}
function raw_buildVectorScene(): SceneSpec {
  const { v, w, tails, u, ox, oy } = VEC
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  return {
    id: 'math-vector',
    title: 'Vector: an ordered pair, free to move',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a vector in ℝ² as an ordered pair of numbers, the arrow 3 right and 2 up; the same pair drawn from different tails is the same vector, and swapping the order gives a different vector.',
    ariaLabel:
      'An arrow from the origin to the point 3, 2, with dashed lines showing its two components, 3 along x and 2 along y. Two violet arrows with the same length and direction start from other points: they are the same vector. A red arrow from the origin to 2, 3 is a different vector: order matters.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A vector in the plane is an ORDERED pair of numbers (3, 2): the arrow that goes 3 along x and 2 along y. The pair is its components.', objects: [...mathAxes(S, -1.2, 5.5, -1.2, 5), arrow(S(0, 0), S(...v), ROLE.output), guide(S(0, 0), S(v[0], 0), ROLE.aid, 0.03), guide(S(v[0], 0), S(...v), ROLE.aid, 0.03), label('3', P(S(1.5, 0)[0], S(0, -0.45)[1]), ROLE.aid, 'primary'), label('2', P(S(v[0], 0)[0] + 0.4, S(0, 1)[1]), ROLE.aid, 'primary'), label('v = (3, 2)', P(S(1.2, 0)[0] - 0.3, S(0, 1.7)[1] + 0.3), ROLE.output, 'primary')] },
      { narration: 'What matters is the displacement, not where the arrow starts. Arrows with the same components (3 right, 2 up) from any tail are the SAME vector (violet): vectors can be moved without changing.', objects: [...tails.map((t) => arrow(S(...t), S(t[0] + v[0], t[1] + v[1]), ROLE.aid)), label('same vector, other tails', P(S(2.5, 4.9)[0], S(0, 5.35)[1]), ROLE.aid, 'primary')] },
      { narration: 'Order matters: w = (2, 3) goes 2 along x and 3 along y. It has the same length as v but points a different way, so (2, 3) ≠ (3, 2).', objects: [arrow(S(0, 0), S(...w), ROLE.input), label('w = (2, 3)', P(S(...w)[0] - 0.75, S(...w)[1] - 0.15), ROLE.input, 'primary')] },
    ],
  }
}

// ── 2. Scalar multiplication ─────────────────────────────────────────────────

export const SCAL = { v: [2, 1], u: 0.7, ox: -0.8, oy: 0.2 } as const

/** KG: c(a₁, a₂) = (ca₁, ca₂): stretches or compresses; a negative c reverses direction. */
export function buildScalarMultiplicationScene(): SceneSpec {
  return framed(raw_buildScalarMultiplicationScene())
}
function raw_buildScalarMultiplicationScene(): SceneSpec {
  const { v, u, ox, oy } = SCAL
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  const off = (c: number) => (c === 2 ? -0.5 : c === 0.5 ? 0.5 : 0)
  const drawn = (c: number, color: string) => arrow(S(0, 0 + off(c) / u), S(c * v[0], c * v[1] + off(c) / u), color)
  return {
    id: 'math-scalar-multiplication',
    title: 'Scalar multiplication: stretch, shrink, reverse',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show c(a₁, a₂) = (ca₁, ca₂): for v = (2, 1) the multiple 2v = (4, 2) is twice as long in the same direction, ½v = (1, 0.5) is half as long, and −v = (−2, −1) has the same length but points the opposite way.',
    ariaLabel:
      'An arrow v from the origin to 2, 1. A violet arrow 2v, drawn slightly below, runs to 4, 2: the same direction, twice as long. A green arrow one half v, drawn slightly above, runs to 1, 0.5: the same direction, half as long. A red arrow minus v runs the other way, to minus 2, minus 1: the same length, opposite direction.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Start with v = (2, 1). Multiplying by a number (a scalar) c multiplies EVERY component by c: c(2, 1) = (2c, c).', objects: [...mathAxes(S, -3.4, 5, -2, 3), arrow(S(0, 0), S(...v), ROLE.output), label('v = (2, 1)', P(S(...v)[0] + 0.1, S(...v)[1] + 0.5), ROLE.output, 'primary')] },
      { narration: 'c = 2 gives 2v = (4, 2): the same direction, TWICE as long (violet). c = ½ gives ½v = (1, 0.5): the same direction, half as long (green). (They are drawn slightly apart so each can be seen.)', objects: [drawn(2, ROLE.aid), drawn(0.5, ROLE.result), label('2v = (4, 2)', P(S(4, 2)[0] - 0.1, S(0, 1.1)[1] - 0.65), ROLE.aid, 'primary'), label('½v = (1, 0.5)', P(S(1, 0.5)[0] - 0.9, S(0, 1.1)[1] + 0.5), ROLE.result, 'primary')] },
      { narration: 'A NEGATIVE scalar reverses the direction: −v = (−2, −1) has the same length as v but points the opposite way. Always |cv| = |c||v|.', objects: [arrow(S(0, 0), S(-v[0], -v[1]), ROLE.input), label('−v = (−2, −1)', P(S(-v[0], -v[1])[0] - 0.2, S(-v[0], -v[1])[1] - 0.55), ROLE.input, 'primary')] },
    ],
  }
}

// ── 3. Norm ──────────────────────────────────────────────────────────────────

/** Panel 1: |(3, 4)| = 5. Panel 2: p = (4, 1), q = (1, 3), |p + q| ≤ |p| + |q|. Panel 3: unit balls of the 1-, 2- and ∞-norms. */
export const NORM = { v: [3, 4], p: [4, 1], q: [1, 3], cx: [-3.4, 0, 3.7], u: [0.45, 0.36, 1.15], oy: [-1.2, -1.0, 0] } as const
export const pNorm = (v: Vec, p: number) => (p === Infinity ? Math.max(Math.abs(v[0]), Math.abs(v[1])) : (Math.abs(v[0]) ** p + Math.abs(v[1]) ** p) ** (1 / p))

/** KG: |v| = √(v·v); the p-norms; positivity, homogeneity and the triangle inequality. */
export function buildNormScene(): SceneSpec {
  return framed(raw_buildNormScene())
}
function raw_buildNormScene(): SceneSpec {
  const { v, p, q, cx, u, oy } = NORM
  const S = (k: number) => (x: number, y: number): V3 => P(cx[k] + x * u[k], y * u[k] + oy[k])
  const s0 = S(0), s1 = S(1), s2 = S(2)
  const pq = add(p, q)
  const ball = (pp: number, color: string): SceneObject => curve(Array.from({ length: 81 }, (_, i) => { const t = (2 * Math.PI * i) / 80, c = Math.cos(t), s = Math.sin(t), k = pp === Infinity ? 1 / Math.max(Math.abs(c), Math.abs(s)) : 1 / (Math.abs(c) ** pp + Math.abs(s) ** pp) ** (1 / pp); return s2(c * k, s * k) }), color)
  return {
    id: 'math-norm',
    title: 'Vector norm: length, the triangle inequality, p-norms',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the norm |v| = √(v·v) as Pythagoras (|(3, 4)| = 5), the triangle inequality |p + q| ≤ |p| + |q| (6.40 ≤ 7.29), and that the unit "circle" depends on the norm: a diamond for p = 1, a circle for p = 2, a square for p = ∞.',
    ariaLabel:
      'Left: the vector 3, 4 with dashed legs of 3 and 4 forming a right angle, so its length is the square root of 9 plus 16, which is 5. Middle: the vectors 4, 1 and 1, 3 placed head to tail with their sum 5, 4; the sum is shorter than the two sides together, 6.40 against 7.29. Right: three shapes of norm 1, a diamond for the 1-norm, a circle for the 2-norm and a square for the infinity norm.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The norm |v| = √(v·v) = √(v₁² + v₂²) is the length of v. For v = (3, 4) the legs 3 and 4 form a right angle, so by Pythagoras |v| = √(9 + 16) = 5.', objects: [arrow(s0(0, 0), s0(...v), ROLE.output), guide(s0(0, 0), s0(v[0], 0), ROLE.aid, 0.03), guide(s0(v[0], 0), s0(...v), ROLE.aid, 0.03), ...rightAngleMark(s0(v[0], 0)[0], s0(v[0], 0)[1], [-1, 0], [0, 1], 0.2, ROLE.aid), label('|v| = √(3² + 4²) = 5', P(cx[0], -3.0), ROLE.output, 'primary')] },
      { narration: 'Triangle inequality: place p = (4, 1) and q = (1, 3) head to tail. The direct route p + q = (5, 4) has length 6.40, shorter than the two sides |p| + |q| = 4.12 + 3.16 ≈ 7.29. In general |p + q| ≤ |p| + |q|.', objects: [arrow(s1(0, 0), s1(...p), ROLE.output), arrow(s1(...p), s1(...pq), ROLE.input), arrow(s1(0, 0), s1(...pq), ROLE.result), label('|p + q| = 6.40 ≤ 7.29', P(cx[1], -2.35), ROLE.result, 'primary')] },
      { narration: 'Other norms: |v|₁ = |v₁| + |v₂| and |v|∞ = max(|v₁|, |v₂|). The vectors of norm 1 form a diamond (p = 1), a circle (p = 2) and a square (p = ∞): the shape of “length 1” depends on the norm.', objects: [ball(1, ROLE.input), ball(2, ROLE.output), ball(Infinity, ROLE.result), label('norm-1 shapes: p = 1, 2, ∞', P(cx[2], -2.0), ROLE.ink, 'primary')] },
    ],
  }
}

// ── 4. Unit vector ───────────────────────────────────────────────────────────

export const UNIT = { v: [3, 4], u: 0.8 } as const
export const normalize = (v: Vec): XY => unitOf(v)

/** KG: a vector of norm 1; v̂ = v/|v|; the standard basis vectors are the canonical unit vectors. */
export function buildUnitVectorScene(): SceneSpec {
  return framed(raw_buildUnitVectorScene())
}
function raw_buildUnitVectorScene(): SceneSpec {
  const { v, u } = UNIT
  const S = (x: number, y: number): V3 => P(x * u, y * u)
  const vh = normalize(v)
  return {
    id: 'math-unit-vector',
    title: 'Unit vector: normalising to length 1',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show unit vectors as the vectors on the circle of radius 1: e₁ = (1, 0) and e₂ = (0, 1), and how any vector v = (3, 4) of length 5 is normalised by dividing by its norm to v̂ = (0.6, 0.8) in the same direction.',
    ariaLabel:
      'A circle of radius 1 about the origin. Two arrows along the axes, e one equals 1, 0 and e two equals 0, 1, end on the circle: they are unit vectors. A longer arrow v from the origin to 3, 4 has length 5. A green arrow from the origin in the same direction ends on the circle at 0.6, 0.8: dividing v by its length gives the unit vector.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A unit vector has norm 1: it ends exactly on the unit circle. The standard basis vectors e₁ = (1, 0) and e₂ = (0, 1) are the simplest examples.', objects: [...mathAxes(S, -1.4, 5, -1.4, 5), curve(Array.from({ length: 73 }, (_, i) => S(Math.cos((2 * Math.PI * i) / 72), Math.sin((2 * Math.PI * i) / 72))), ROLE.ink), arrow(S(0, 0), S(1, 0), ROLE.output), arrow(S(0, 0), S(0, 1), ROLE.input), label('e₁', P(S(1, 0)[0] + 0.1, -0.4), ROLE.output, 'primary'), label('e₂', P(-0.4, S(0, 1)[1] + 0.2), ROLE.input, 'primary')] },
      { narration: 'Most vectors are not unit vectors: v = (3, 4) has length |v| = √(3² + 4²) = 5, far outside the unit circle.', objects: [arrow(S(0, 0), S(...v), ROLE.aid), label('|v| = 5', P(S(...v)[0] + 0.7, S(...v)[1] + 0.1), ROLE.aid, 'primary')] },
      { narration: 'Normalise: divide v by its length. v̂ = v ÷ |v| = (3, 4) ÷ 5 = (0.6, 0.8). It points the SAME way as v but has length 1: 0.6² + 0.8² = 1.', objects: [arrow(S(0, 0), S(...vh), ROLE.result), dot(S(...vh), ROLE.result, 0.1), label('v̂ = v/|v| = (0.6, 0.8)', P(S(...vh)[0] - 1.9, S(...vh)[1] + 0.2), ROLE.result, 'primary')] },
    ],
  }
}

// ── 5. Orthogonality ─────────────────────────────────────────────────────────

/** u = (2, 1), w = (−1, 2) are orthogonal (dot 0); w′ = (1, 2) is not (dot 4, angle 36.9°). */
export const ORTH = { u: [2, 1], w: [-1, 2], w2: [1, 2], s: 0.8, ox: -0.8, oy: -1.2 } as const

/** KG: orthogonal ⇔ dot product zero; orthogonal vectors are linearly independent. */
export function buildOrthogonalityScene(): SceneSpec {
  return framed(raw_buildOrthogonalityScene())
}
function raw_buildOrthogonalityScene(): SceneSpec {
  const { u, w, w2, s, ox, oy } = ORTH
  const S = (x: number, y: number): V3 => P(x * s + ox, y * s + oy)
  const sum = add(u, w)
  const th = Math.acos(dotv(u, w2) / (norm(u) * norm(w2))) / DEG
  return {
    id: 'math-orthogonality',
    title: 'Orthogonality: dot product zero',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show orthogonality as a zero dot product: u = (2, 1) and w = (−1, 2) have u·w = −2 + 2 = 0 and meet at a right angle, while w′ = (1, 2) has u·w′ = 4 ≠ 0 and meets u at 36.9°; for orthogonal vectors the Pythagorean identity |u + w|² = |u|² + |w|² holds.',
    ariaLabel:
      'Two arrows from the origin, u to 2, 1 and w to minus 1, 2, meeting at a right angle marked with a small square: their dot product is minus 2 plus 2, which is 0. A red arrow w prime to 1, 2 makes a smaller angle with u, 36.9 degrees, and u dot w prime is 4, not 0. A dashed rectangle on u and w has diagonal u plus w to minus 1, 3 whose squared length 10 equals 5 plus 5.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Two vectors are orthogonal when their dot product is 0. u = (2, 1) and w = (−1, 2): u·w = 2(−1) + 1(2) = 0. They meet at a right angle.', objects: [...mathAxes(S, -2, 4.5, -1.6, 4.6), arrow(S(0, 0), S(...u), ROLE.output), arrow(S(0, 0), S(...w), ROLE.input), ...rightAngleMark(S(0, 0)[0], S(0, 0)[1], unitOf(u), unitOf(w), 0.35, ROLE.result), label('u', P(S(...u)[0] + 0.3, S(...u)[1] - 0.2), ROLE.output, 'primary'), label('w', P(S(...w)[0] - 0.3, S(...w)[1] + 0.2), ROLE.input, 'primary'), label('u·w = 0', P(S(0, 0)[0] + 1.6, S(0, 0)[1] + 1.65), ROLE.result, 'primary')] },
      { narration: 'Tilt the second vector to w′ = (1, 2): now u·w′ = 2 · 1 + 1 · 2 = 4 ≠ 0, and the angle between them is only about 36.9° (cos θ = 4 ÷ 5). Not orthogonal.', objects: [arrow(S(0, 0), S(...w2), ROLE.aid), curve(arcPts(S(0, 0)[0], S(0, 0)[1], 1.0, Math.atan2(u[1], u[0]) / DEG, Math.atan2(w2[1], w2[0]) / DEG, 10), ROLE.aid), label(`u·w′ = 4: ${f1(th)}°`, P(S(...w2)[0] + 1.5, S(...w2)[1] + 0.2), ROLE.aid, 'primary')] },
      { narration: 'Orthogonality gives Pythagoras for vectors: u and w are the sides of a rectangle, and the diagonal u + w = (1, 3) has |u + w|² = 1 + 9 = 10 = |u|² + |w|² = 5 + 5. (Orthogonal vectors are also never parallel, so they are linearly independent.)', objects: [guide(S(...u), S(...sum), ROLE.reference, 0.03), guide(S(...w), S(...sum), ROLE.reference, 0.03), arrow(S(0, 0), S(...sum), ROLE.result), label('|u + w|² = 5 + 5 = 10', P(S(...sum)[0] + 0.1, S(...sum)[1] + 0.5), ROLE.result, 'primary')] },
    ],
  }
}

// ── 6. Span ──────────────────────────────────────────────────────────────────

export const SPAN = { v1: [2, 1], v2: [-1, 1], range: 2, u: 0.45, ox: 0, oy: 0 } as const
export const comb = (c1: number, c2: number): XY => add(scale(c1, SPAN.v1), scale(c2, SPAN.v2))

/** KG: span(S) = all linear combinations of the vectors in S; the smallest subspace containing S. */
export function buildSpanScene(): SceneSpec {
  return framed(raw_buildSpanScene())
}
function raw_buildSpanScene(): SceneSpec {
  const { v1, v2, range, u } = SPAN
  const S = (x: number, y: number): V3 => P(x * u, y * u)
  const cs = Array.from({ length: 2 * range + 1 }, (_, i) => i - range)
  return {
    id: 'math-span',
    title: 'Span: everything you can build from the vectors',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show span as the set of all linear combinations: one vector spans a line through the origin; two non-parallel vectors v₁ = (2, 1) and v₂ = (−1, 1) have combinations c₁v₁ + c₂v₂ filling the whole plane; a second vector parallel to the first adds nothing.',
    ariaLabel:
      'A line through the origin in the direction 2, 1 with marked multiples of v one at minus 1, one half, 1 and 2. Adding a second vector v two equals minus 1, 1 gives a grid of 25 dots, the combinations c one times v one plus c two times v two for whole numbers between minus 2 and 2, spread over the plane. A red arrow 2 v one lies along the first line and adds no new directions.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The span of one vector v₁ = (2, 1) is every multiple c·v₁: a LINE through the origin (here c = −1, ½, 1, 2 are marked).', objects: [...mathAxes(S, -6.2, 6.2, -3.6, 3.6), line(S(-5, -2.5), S(5, 2.5), ROLE.aid, 0.03), arrow(S(0, 0), S(...v1), ROLE.output), ...[-1, 0.5, 2].map((c) => dot(S(c * v1[0], c * v1[1]), ROLE.output, 0.09)), label('span{v₁} = a line', P(S(4.2, 2.1)[0] - 0.2, S(0, 2.1)[1] - 0.9), ROLE.output, 'primary')] },
      { narration: 'Add a second vector v₂ = (−1, 1) that points a different way. Every combination c₁v₁ + c₂v₂ is now reachable (dots: c₁, c₂ from −2 to 2): they fill out the whole plane. span{v₁, v₂} = ℝ².', objects: [arrow(S(0, 0), S(...v2), ROLE.input), ...cs.flatMap((c1) => cs.map((c2) => dot(S(...comb(c1, c2)), ROLE.result, 0.09))), label('span{v₁, v₂} = ℝ²', P(S(-4.4, 3.4)[0], S(0, 3.5)[1] + 0.3), ROLE.result, 'primary')] },
      { narration: 'A second vector that is a multiple of the first, such as 2v₁ = (4, 2), adds NOTHING new: all combinations stay on the same line. To span the plane the vectors must point in different directions.', objects: [arrow(S(0, -0.5), S(2 * v1[0], 2 * v1[1] - 0.5), ROLE.input), label('2v₁: same line', P(S(4, 2)[0] + 0.1, S(0, 2)[1] - 1.1), ROLE.input, 'primary')] },
    ],
  }
}

// ── 7. Linear independence ───────────────────────────────────────────────────

export const INDEP = { v1: [2, 1], v2: [-1, 1], v3: [4, 2], v4: [1, 2], u: 0.7, ox: -0.4, oy: -0.6 } as const

/** KG: c₁v₁ + … + cₖvₖ = 0 forces every cᵢ = 0; no vector is a combination of the others. */
export function buildLinearIndependenceScene(): SceneSpec {
  return framed(raw_buildLinearIndependenceScene())
}
function raw_buildLinearIndependenceScene(): SceneSpec {
  const { v1, v2, v3, v4, u, ox, oy } = INDEP
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  return {
    id: 'math-linear-independence',
    title: 'Linear independence: nobody is a combination of the others',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show linear independence: v₁ = (2, 1) and v₂ = (−1, 1) point different ways and only 0·v₁ + 0·v₂ gives the zero vector (determinant 3 ≠ 0); v₃ = (4, 2) = 2v₁ gives the non-trivial relation 2v₁ − v₃ = 0 (dependent); any third vector in the plane, such as v₄ = v₁ + v₂, makes the set dependent.',
    ariaLabel:
      'Two arrows from the origin, v one to 2, 1 and v two to minus 1, 1, pointing different ways: independent. A red arrow v three to 4, 2 lies exactly along v one and equals 2 v one, so the pair v one and v three is dependent. A green arrow v four to 1, 2, equal to v one plus v two, is drawn as the diagonal of a parallelogram on v one and v two: a third vector in the plane is always a combination of the other two.',
    stage: NO_STAGE,
    steps: [
      { narration: 'v₁ = (2, 1) and v₂ = (−1, 1) point in different directions. The only way c₁v₁ + c₂v₂ = 0 is c₁ = c₂ = 0 (check: 2c₁ − c₂ = 0 and c₁ + c₂ = 0 force c₁ = c₂ = 0, determinant 3 ≠ 0). They are linearly independent.', objects: [...mathAxes(S, -2.4, 4.6, -1.6, 3.6), arrow(S(0, 0), S(...v1), ROLE.output), arrow(S(0, 0), S(...v2), ROLE.input), label('v₁', P(S(...v1)[0] + 0.3, S(...v1)[1] - 0.15), ROLE.output, 'primary'), label('v₂', P(S(...v2)[0] - 0.3, S(...v2)[1] + 0.15), ROLE.input, 'primary'), label('only 0v₁ + 0v₂ = 0', P(S(2.2, 3.1)[0], S(0, 3.4)[1] + 0.3), ROLE.ink, 'primary')] },
      { narration: 'Now take v₃ = (4, 2). It lies on the same line as v₁: v₃ = 2v₁, so 2v₁ − v₃ = 0 with coefficients (2, −1) that are NOT all zero. {v₁, v₃} is linearly dependent: one vector is a multiple of the other.', objects: [arrow(S(0, -0.45), S(v3[0], v3[1] - 0.45), ROLE.aid), label('v₃ = 2v₁: dependent', P(S(4, 2)[0] + 0.1, S(0, 2)[1] - 1.1), ROLE.aid, 'primary')] },
      { narration: 'In the plane three vectors are ALWAYS dependent. v₄ = (1, 2) is the diagonal of the parallelogram on v₁ and v₂: v₄ = v₁ + v₂, so v₁ + v₂ − v₄ = 0. A set with more vectors than the dimension cannot be independent.', objects: [guide(S(...v1), S(...v4), ROLE.reference, 0.03), guide(S(...v2), S(...v4), ROLE.reference, 0.03), arrow(S(0, 0), S(...v4), ROLE.result), label('v₄ = v₁ + v₂', P(S(...v4)[0] - 0.4, S(...v4)[1] + 0.5), ROLE.result, 'primary')] },
    ],
  }
}

// ── 8. Basis ─────────────────────────────────────────────────────────────────

export const BASIS = { b1: [1, 1], b2: [-1, 1], w: [3, 1], u: 0.5 } as const

/** KG: a set that is linearly independent and spans V; every vector is a UNIQUE combination of basis vectors. */
export function buildBasisScene(): SceneSpec {
  return framed(raw_buildBasisScene())
}
function raw_buildBasisScene(): SceneSpec {
  const { b1, b2, w, u } = BASIS
  const S = (x: number, y: number): V3 => P(x * u, y * u)
  const k = 3, cs = Array.from({ length: 2 * k + 1 }, (_, i) => i - k)
  const bgrid = (color: string): SceneObject[] => [
    ...cs.map((c) => line(S(...add(scale(-k, b1), scale(c, b2))), S(...add(scale(k, b1), scale(c, b2))), color, 0.012)),
    ...cs.map((c) => line(S(...add(scale(c, b1), scale(-k, b2))), S(...add(scale(c, b1), scale(k, b2))), color, 0.012)),
  ]
  const cw = solveBasis(b1, b2, w)
  return {
    id: 'math-basis',
    title: 'Basis: independent and spanning, so coordinates are unique',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that a basis gives every vector a unique recipe: w = (3, 1) is 3e₁ + 1e₂ in the standard basis and 2b₁ − 1b₂ in the basis b₁ = (1, 1), b₂ = (−1, 1); both pairs are independent and span the plane.',
    ariaLabel:
      'A square grid with the standard basis arrows e one and e two, and the point w at 3, 1 reached by 3 steps along e one and 1 step along e two. Then a second, tilted grid built from b one equals 1, 1 and b two equals minus 1, 1. The same point w is reached by going 2 steps along b one and 1 step back along b two. Each basis reaches every point in exactly one way.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The standard basis e₁ = (1, 0), e₂ = (0, 1) is independent and spans the plane. Every vector is built from it in exactly one way: w = (3, 1) = 3e₁ + 1e₂ (3 steps along e₁, then 1 along e₂).', objects: [...gridLines(-3, 3, -3, 3, S), arrow(S(0, 0), S(1, 0), ROLE.output), arrow(S(0, 0), S(0, 1), ROLE.input), line(S(0, 0), S(w[0], 0), ROLE.output, 0.05), line(S(w[0], 0), S(...w), ROLE.input, 0.05), dot(S(...w), ROLE.result, 0.1), label('w = 3e₁ + e₂', P(S(w[0], w[1])[0] + 0.1, S(w[0], w[1])[1] + 0.5), ROLE.result, 'primary')] },
      { narration: 'There are many bases. b₁ = (1, 1) and b₂ = (−1, 1) are also independent (determinant 2 ≠ 0) and span the plane: they define a tilted grid (violet) of the SAME plane.', objects: [...bgrid(ROLE.aid), arrow(S(0, 0), S(...b1), ROLE.aid), arrow(S(0, 0), S(...b2), ROLE.aid), label('b₁', P(S(...b1)[0] + 0.25, S(...b1)[1] - 0.1), ROLE.aid, 'primary'), label('b₂', P(S(...b2)[0] - 0.3, S(...b2)[1] - 0.1), ROLE.aid, 'primary')] },
      { narration: 'In the new basis the same w has a different recipe: w = 2b₁ − 1b₂ (2 steps along b₁ to (2, 2), then 1 step back along b₂ to (3, 1)). Each vector has EXACTLY ONE recipe in a given basis.', objects: [line(S(0, 0), S(...scale(2, b1)), ROLE.aid, 0.07), line(S(...scale(2, b1)), S(...add(scale(2, b1), scale(cw[1], b2))), ROLE.input, 0.07), label(`w = ${cw[0]}b₁ − b₂`, P(S(...w)[0] + 0.1, S(...w)[1] - 0.55), ROLE.aid, 'primary')] },
    ],
  }
}

// ── 9. Coordinates ───────────────────────────────────────────────────────────

/** Skew basis B = (b₁, b₂) = ((2, 0), (1, 1)); w = (4, 2) = 1b₁ + 2b₂, so [w]_B = (1, 2). */
export const COORD = { b1: [2, 0], b2: [1, 1], w: [4, 2], u: 0.5, oy: -0.8 } as const

/** KG: [v]_β = (c₁, …, cₙ) with v = Σ cᵢbᵢ; coordinates depend on the chosen basis. */
export function buildCoordinatesScene(): SceneSpec {
  return framed(raw_buildCoordinatesScene())
}
function raw_buildCoordinatesScene(): SceneSpec {
  const { b1, b2, w, u, oy } = COORD
  const S = (x: number, y: number): V3 => P(x * u, y * u + oy)
  const c = solveBasis(b1, b2, w)
  const gridB = (color: string) => [
    ...[-1, 0, 1, 2, 3].map((k) => line(S(...add(scale(-2, b1), scale(k, b2))), S(...add(scale(2, b1), scale(k, b2))), color, 0.012)),
    ...[-2, -1, 0, 1, 2].map((m) => line(S(...add(scale(m, b1), scale(-1, b2))), S(...add(scale(m, b1), scale(3, b2))), color, 0.012)),
  ]
  return {
    id: 'math-coordinates',
    title: 'Coordinates: a vector’s recipe in a chosen basis',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that coordinates depend on the basis: for the skew basis b₁ = (2, 0), b₂ = (1, 1) the vector w = (4, 2) is 1 step along b₁ and 2 steps along b₂, so [w]_B = (1, 2), although in the usual basis its coordinates are (4, 2).',
    ariaLabel:
      'A slanted grid built from the basis vectors b one equals 2, 0 and b two equals 1, 1. The point w sits at 4, 2 in the usual axes. Counting along the slanted grid, w is reached by one step along b one and then two steps along b two, so its coordinates in this basis are 1, 2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Choose the basis B = (b₁, b₂) with b₁ = (2, 0) and b₂ = (1, 1). Its grid (violet) is slanted: each cell is a parallelogram spanned by b₁ and b₂.', objects: [...gridB(ROLE.aid), arrow(S(0, 0), S(...b1), ROLE.output), arrow(S(0, 0), S(...b2), ROLE.input), label('b₁ = (2, 0)', P(S(...b1)[0] + 0.1, S(...b1)[1] - 0.45), ROLE.output, 'primary'), label('b₂ = (1, 1)', P(S(...b2)[0] - 1.0, S(...b2)[1] + 0.2), ROLE.input, 'primary')] },
      { narration: 'The vector w sits at (4, 2) in the usual x–y axes: these numbers are its coordinates in the STANDARD basis.', objects: [dot(S(...w), ROLE.result, 0.12), label('w = (4, 2) in the usual axes', P(S(...w)[0] + 0.3, S(...w)[1] + 0.5), ROLE.result, 'primary')] },
      { narration: 'Count along the slanted grid instead: from the origin go 1 step along b₁ (to (2, 0)), then 2 steps along b₂ (up to (4, 2)). So w = 1·b₁ + 2·b₂: its coordinates in the basis B are [w]_B = (1, 2). Same vector, different coordinates.', objects: [line(S(0, 0), S(...b1), ROLE.output, 0.07), line(S(...b1), S(...add(b1, scale(c[1], b2))), ROLE.input, 0.07), label(`[w]_B = (${c[0]}, ${c[1]})`, P(S(...w)[0] + 0.6, S(...w)[1] - 0.5), ROLE.result, 'primary')] },
    ],
  }
}

// ── 10. Change of basis ──────────────────────────────────────────────────────

/** M = [b₁ b₂] = [[2, 1], [0, 1]]; [w]_E = M [w]_B and [w]_B = M⁻¹ [w]_E. */
export const CHANGE = { b1: [2, 0], b2: [1, 1], pts: [[4, 2], [3, 1]] as readonly Vec[], u: 0.5, oy: -0.8 } as const
export const matM = (): [[number, number], [number, number]] => [[CHANGE.b1[0], CHANGE.b2[0]], [CHANGE.b1[1], CHANGE.b2[1]]]
export const matMInv = (): [[number, number], [number, number]] => { const [[a, b], [c, d]] = matM(), dt = a * d - b * c; return [[d / dt, -b / dt], [-c / dt, a / dt]] }
export const applyMat = (m: readonly [readonly [number, number], readonly [number, number]], v: Vec): XY => [m[0][0] * v[0] + m[0][1] * v[1], m[1][0] * v[0] + m[1][1] * v[1]]

/** KG: [v]_γ = P [v]_β with the change-of-basis matrix; matrix representations are related by B = P⁻¹AP. */
export function buildChangeOfBasisScene(): SceneSpec {
  return framed(raw_buildChangeOfBasisScene())
}
function raw_buildChangeOfBasisScene(): SceneSpec {
  const { b1, b2, pts, u, oy } = CHANGE
  const S = (x: number, y: number): V3 => P(x * u, y * u + oy)
  const mi = matMInv()
  const gridB = [
    ...[-1, 0, 1, 2, 3].map((k) => line(S(...add(scale(-2, b1), scale(k, b2))), S(...add(scale(2, b1), scale(k, b2))), ROLE.aid, 0.012)),
    ...[-2, -1, 0, 1, 2].map((m) => line(S(...add(scale(m, b1), scale(-1, b2))), S(...add(scale(m, b1), scale(3, b2))), ROLE.aid, 0.012)),
  ]
  return {
    id: 'math-change-of-basis',
    title: 'Change of basis: converting coordinates with a matrix',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how coordinates convert between bases: with M = [b₁ b₂] = [[2, 1], [0, 1]] a vector with B-coordinates c has standard coordinates Mc, so [w]_B = M⁻¹[w]_E: (4, 2) becomes (1, 2) and (3, 1) becomes (1, 1).',
    ariaLabel:
      'Two points, w one at 4, 2 and w two at 3, 1, in the usual axes. Overlaying the slanted grid of the basis b one equals 2, 0 and b two equals 1, 1 shows where they sit in that grid: w one is at grid position 1, 2 and w two at 1, 1. The matrix M with columns b one and b two converts basis coordinates to standard ones, and its inverse converts back.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Two points in the usual (standard) coordinates: w₁ = (4, 2) and w₂ = (3, 1). Their standard coordinates are [w]_E.', objects: [...mathAxes(S, -3, 6, -1.5, 3.6), ...pts.map((p) => dot(S(...p), ROLE.result, 0.12)), label('w₁ = (4, 2)', P(S(...pts[0])[0] + 0.2, S(...pts[0])[1] + 0.5), ROLE.result, 'primary'), label('w₂ = (3, 1)', P(S(...pts[1])[0] + 0.7, S(...pts[1])[1] - 0.5), ROLE.result, 'primary')] },
      { narration: 'Lay the slanted grid of the basis b₁ = (2, 0), b₂ = (1, 1) over the same picture. The same two points have DIFFERENT grid coordinates: w₁ is 1 step along b₁ and 2 along b₂, so [w₁]_B = (1, 2); w₂ is at (1, 1) in the grid.', objects: [...gridB, arrow(S(0, 0), S(...b1), ROLE.output), arrow(S(0, 0), S(...b2), ROLE.input), label('B-coordinates: (1, 2) and (1, 1)', P(S(5, 3)[0] - 0.5, S(0, 3.4)[1] + 0.3), ROLE.aid, 'primary')] },
      { narration: 'The conversion is matrix multiplication. The matrix M has the basis vectors as columns: M = [b₁ b₂] = [[2, 1], [0, 1]] turns B-coordinates into standard ones, M(1, 2) = (4, 2). Its inverse does the reverse: [w]_B = M⁻¹[w]_E, with M⁻¹ = [[0.5, −0.5], [0, 1]].', objects: [label('M = [b₁ b₂] = [[2, 1], [0, 1]]', P(0, -2.2), ROLE.output, 'primary'), label(`M⁻¹ = [[${f1(mi[0][0])}, ${minus(f1(mi[0][1]))}], [0, 1]]`, P(0, -2.8), ROLE.input, 'primary'), label('[w]_B = M⁻¹ [w]_E', P(0, -3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 11. Linear map ───────────────────────────────────────────────────────────

/** T(x, y) = (2x + y, x + 2y): matrix [[2, 1], [1, 2]]; the unit square becomes a parallelogram of area det = 3. */
export const LMAP = { A: [[2, 1], [1, 2]] as const, u: 0.6, ox: -1.2, oy: -0.9, probe: [1, 1] as Vec } as const
export const applyT = (v: Vec): XY => applyMat(LMAP.A, v)

/** KG: T(u + v) = T(u) + T(v) and T(cv) = cT(v); determined by its action on a basis; represented by a matrix. */
export function buildLinearMapScene(): SceneSpec {
  return framed(raw_buildLinearMapScene())
}
function raw_buildLinearMapScene(): SceneSpec {
  const { u, ox, oy, probe } = LMAP
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  const e1: Vec = [1, 0], e2: Vec = [0, 1]
  const t1 = applyT(e1), t2 = applyT(e2), tp = applyT(probe)
  return {
    id: 'math-linear-map',
    title: 'Linear map: the unit square becomes a parallelogram',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the linear map T(x, y) = (2x + y, x + 2y): it sends e₁ → (2, 1) and e₂ → (1, 2) (the columns of its matrix), turns the unit square into a parallelogram of area det = 3, and preserves sums: T(e₁ + e₂) = T(e₁) + T(e₂) = (3, 3).',
    ariaLabel:
      'The unit square on the vectors e one and e two. A violet parallelogram on the images T of e one equals 2, 1 and T of e two equals 1, 2 has area 3. The vector 1, 1, the sum of e one and e two, is sent to 3, 3, which is the sum of the two image vectors, dashed head to tail: T of a sum is the sum of the images.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The unit square is spanned by e₁ = (1, 0) and e₂ = (0, 1). A linear map T is completely determined by what it does to these basis vectors.', objects: [...mathAxes(S, -1.2, 4.4, -1.2, 4.4), ...polyLines([S(0, 0).slice(0, 2) as XY, S(1, 0).slice(0, 2) as XY, S(1, 1).slice(0, 2) as XY, S(0, 1).slice(0, 2) as XY], ROLE.reference, 0.04), arrow(S(0, 0), S(...e1), ROLE.output), arrow(S(0, 0), S(...e2), ROLE.input)] },
      { narration: 'T(x, y) = (2x + y, x + 2y) sends e₁ to (2, 1) and e₂ to (1, 2): these are the COLUMNS of its matrix [[2, 1], [1, 2]]. The unit square becomes the parallelogram they span (violet), of area det = 2·2 − 1·1 = 3.', objects: [arrow(S(0, 0), S(...t1), ROLE.output), arrow(S(0, 0), S(...t2), ROLE.input), ...polyLines([S(0, 0).slice(0, 2) as XY, S(...t1).slice(0, 2) as XY, S(...add(t1, t2)).slice(0, 2) as XY, S(...t2).slice(0, 2) as XY], ROLE.aid, 0.04), label('T(e₁) = (2, 1)', P(S(...t1)[0] + 0.9, S(...t1)[1] - 0.4), ROLE.output, 'primary'), label('T(e₂) = (1, 2)', P(S(...t2)[0] - 0.9, S(...t2)[1] + 0.4), ROLE.input, 'primary'), label('area 1 → area 3', P(S(2.6, 0)[0], S(0, -0.8)[1]), ROLE.aid, 'primary')] },
      { narration: 'Linear means T(u + v) = T(u) + T(v). The vector (1, 1) = e₁ + e₂ goes to T(1, 1) = (3, 3), exactly T(e₁) + T(e₂) = (2, 1) + (1, 2): the images add head to tail (dashed).', objects: [arrow(S(0, 0), S(...probe), ROLE.result), arrow(S(0, 0), S(...tp), ROLE.result), guide(S(...t1), S(...tp), ROLE.reference, 0.03), guide(S(...t2), S(...tp), ROLE.reference, 0.03), label('T(1, 1) = T(e₁) + T(e₂) = (3, 3)', P(S(1.5, 0)[0] - 0.4, S(0, 3.3)[1] + 0.5), ROLE.result, 'primary')] },
    ],
  }
}

// ── 12. Orthogonal projection ────────────────────────────────────────────────

/** Project v = (2, 3) onto the line spanned by u = (3, 1): proj = (v·u / u·u) u = (2.7, 0.9). */
export const PROJ = { u: [3, 1], v: [2, 3], others: [0.4, 1.3], s: 0.8, ox: -2.0, oy: -1.2 } as const
export const projOn = (onto: Vec, v: Vec): XY => scale(dotv(v, onto) / dotv(onto, onto), onto)

/** KG: proj_u(v) = (v·u / u·u) u is the closest point of the line to v, with v − proj ⊥ u. */
export function buildProjectionScene(): SceneSpec {
  return framed(raw_buildProjectionScene())
}
function raw_buildProjectionScene(): SceneSpec {
  const { u, v, others, s, ox, oy } = PROJ
  const S = (x: number, y: number): V3 => P(x * s + ox, y * s + oy)
  const p = projOn(u, v), uh = unitOf(u)
  const dist = (c: number) => norm(sub(v, scale(c, u)))
  return {
    id: 'math-projection',
    title: 'Orthogonal projection: the closest point on the line',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show projection of v = (2, 3) onto the line spanned by u = (3, 1): the foot of the perpendicular proj = (v·u/u·u)u = (2.7, 0.9) is the closest point of the line to v (distance 2.21; other points of the line are farther, 2.72 and 2.55), and |v|² = |proj|² + |v − proj|².',
    ariaLabel:
      'A line through the origin in the direction 3, 1, and the vector v to 2, 3 above it. A dashed perpendicular from the tip of v meets the line at the green point 2.7, 0.9, marked with a right angle; that point is the projection. Two other points on the line are joined to v by longer dashed segments, of lengths 2.72 and 2.55, compared with 2.21 for the perpendicular: the projection is the closest point.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Take the line spanned by u = (3, 1) and a vector v = (2, 3) that is not on it. Which point of the line is closest to the tip of v?', objects: [...mathAxes(S, -2.4, 5, -1.6, 4.4), line(S(-3, -1), S(4.5, 1.5), ROLE.aid, 0.03), arrow(S(0, 0), S(...u), ROLE.output), arrow(S(0, 0), S(...v), ROLE.input), label('u', P(S(...u)[0] + 0.3, S(...u)[1] - 0.25), ROLE.output, 'primary'), label('v', P(S(...v)[0] - 0.3, S(...v)[1] + 0.25), ROLE.input, 'primary')] },
      { narration: 'Drop a perpendicular from the tip of v to the line. The foot is the projection proj_u(v) = (v·u ÷ u·u) u = (9 ÷ 10)(3, 1) = (2.7, 0.9), and the leftover v − proj = (−0.7, 2.1) is perpendicular to u.', objects: [guide(S(...v), S(...p), ROLE.aid, 0.04), ...rightAngleMark(S(...p)[0], S(...p)[1], [-uh[0], -uh[1]], dir(p, v), 0.25, ROLE.aid), line(S(0, 0), S(...p), ROLE.result, 0.07), dot(S(...p), ROLE.result, 0.1), label('proj = (2.7, 0.9)', P(S(...p)[0] + 1.2, S(...p)[1] - 0.45), ROLE.result, 'primary')] },
      { narration: 'It really is the CLOSEST point. Joining v to other points of the line (at 0.4u and 1.3u) gives longer segments, 2.72 and 2.55, than the perpendicular 2.21. And Pythagoras holds: |v|² = 13 = |proj|² + |v − proj|² = 8.1 + 4.9.', objects: [...others.flatMap((c) => [guide(S(...v), S(c * u[0], c * u[1]), ROLE.reference, 0.025), dot(S(c * u[0], c * u[1]), ROLE.reference, 0.07)]), label(`${f2(dist(others[0]))}`, P(S(...scale(others[0], u))[0] - 0.3, S(...scale(others[0], u))[1] + 1.0), ROLE.reference, 'primary'), label(`${f2(dist(others[1]))}`, P(S(...scale(others[1], u))[0] + 0.9, S(...scale(others[1], u))[1] + 1.0), ROLE.reference, 'primary'), label(`${f2(dist(dotv(v, u) / dotv(u, u)))} is shortest`, P(S(...p)[0] - 0.9, S(...p)[1] + 1.15), ROLE.aid, 'primary')] },
    ],
  }
}
