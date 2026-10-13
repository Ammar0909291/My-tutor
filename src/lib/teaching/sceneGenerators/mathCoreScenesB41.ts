/**
 * Core mathematics figures — batch 41 of the mathematics visual campaign (2026-10-13): four geometry helpers (geometric proof, length,
 * the curvature of surfaces, compass-and-straightedge constructions), four function helpers (function notation, zeros, step functions,
 * operations on functions) and four complex-analysis helpers (analytic continuation, singularities, residues, the argument principle).
 *
 * Same rules as batches 1-40: one visual language from visualDesign.ts, labels are names not sentences (marks of 1-2 characters are
 * free), steps are cumulative, coordinates stay inside +-5, at most 50 objects per step, nothing the figure audit rejects (SM-01
 * evaluates the arithmetic in a label left to right, and two labels that end in the same name before "=" must not carry different
 * numbers), no label placed inside a circle or closed curve (the real renderer pushes it out to the margin), no `dot()` with its own
 * text (it always counts as a 18 px card move), and every angle, length, value, radius and winding a figure states is re-derived by the
 * test file from the DRAWN lines, arcs, curves, dots and bars.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, sampleMapped, arcPts, rightAngleMark, chevron, type V3 } from './mathSceneKit'

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
const arrowAt = (f: Frame, a: Pt, b: Pt, color: string): SceneObject => ar(at(f, a[0], a[1]), at(f, b[0], b[1]), color)
const axesOf = (f: Frame, x0: number, x1: number, y0: number, y1: number): SceneObject[] => [arrowAt(f, [x0, 0], [x1, 0], ROLE.reference), arrowAt(f, [0, y0], [0, y1], ROLE.reference)]
/** A circle of the given radius about (cx, cy) as a closed polyline. */
const circleAt = (cx: number, cy: number, r: number, color: string, n = 72): SceneObject => curve(Array.from({ length: n + 1 }, (_, k) => { const a = (2 * Math.PI * k) / n; return P(cx + r * Math.cos(a), cy + r * Math.sin(a)) }), color)
const deg = (a: number) => (a * Math.PI) / 180

// ── 1. Geometric proof ───────────────────────────────────────────────────────

/** A triangle with the angles 50°, 60°, 70° (α at A, β at B, γ at C), AB = 5.2 along the horizontal; C from the law of sines. */
export const GPF = { alpha: 50, beta: 60, base: 5.2, A: [-3.0, -1.6] as Pt }
export const gpfB: Pt = [GPF.A[0] + GPF.base, GPF.A[1]]
const gpfAC = (GPF.base * Math.sin(deg(GPF.beta))) / Math.sin(deg(180 - GPF.alpha - GPF.beta))
export const gpfC: Pt = [GPF.A[0] + gpfAC * Math.cos(deg(GPF.alpha)), GPF.A[1] + gpfAC * Math.sin(deg(GPF.alpha))]

/** KG: a rigorous deductive argument from axioms, definitions and proved theorems — here, the angles of a triangle sum to 180° (a parallel through C, alternate angles). */
export function buildGeometricProofScene(): SceneSpec {
  return framed(raw_buildGeometricProofScene())
}
function raw_buildGeometricProofScene(): SceneSpec {
  const A = GPF.A, B = gpfB, C = gpfC
  const tri = [ln(A, B, ROLE.reference, 0.06), ln(B, C, ROLE.reference, 0.06), ln(C, A, ROLE.reference, 0.06)]
  const R = 0.8, aAng = GPF.alpha, bAng = GPF.beta, gAng = 180 - aAng - bAng
  const arcA = curve(arcPts(A[0], A[1], R, 0, aAng), ROLE.output)
  const arcB = curve(arcPts(B[0], B[1], R, 180 - bAng, 180), ROLE.input)
  const arcGamma = curve(arcPts(C[0], C[1], R, 180 + aAng, 360 - bAng), ROLE.result)
  const arcAlpha2 = curve(arcPts(C[0], C[1], R, 180, 180 + aAng), ROLE.output)
  const arcBeta2 = curve(arcPts(C[0], C[1], R, 360 - bAng, 360), ROLE.input)
  const straight = curve(arcPts(C[0], C[1], 1.35, 180, 360, 36), ROLE.aid)
  const lab = (t: string, c: Pt, r: number, a: number, color: string): SceneObject => lb(t, [c[0] + r * Math.cos(deg(a)), c[1] + r * Math.sin(deg(a))], color)
  return {
    id: 'math-geometric-proof',
    title: 'A geometric proof: the angles of a triangle',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a deductive proof that the angles of a triangle add up to 180°. Triangle ABC has the angles α = 50° at A, β = 60° at B and γ = 70° at C. Draw the line through C parallel to AB: its alternate angles with the sides CA and CB are equal to α and β (parallel lines, alternate angles). Together with γ they fill the straight angle at C, so α + γ + β = 50° + 70° + 60° = 180°.',
    ariaLabel:
      'A triangle A B C with its base A B horizontal. In the first step three arcs mark the angles: alpha at A in blue, beta at B in red and gamma at C in green. In the second step a violet line through C parallel to A B appears with matching arrow marks, and two more arcs at C, a blue one equal to alpha on the left and a red one equal to beta on the right, captioned alternate angles are equal. In the third step a violet half circle marks the straight angle at C and the caption 50 plus 70 plus 60 equals 180 appears.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A triangle ABC with the angles α at A (blue), β at B (red) and γ at C (green). The claim: α + β + γ = 180°.', objects: [...tri, arcA, arcB, arcGamma, dt(A, ROLE.ink, 0.12), dt(B, ROLE.ink, 0.12), dt(C, ROLE.ink, 0.12), lb('A', [A[0] - 0.4, A[1] - 0.4]), lb('B', [B[0] + 0.4, B[1] - 0.4]), lb('C', [C[0] + 0.45, C[1] + 0.35]), lab('α', A, 1.95, aAng / 2, ROLE.output), lab('β', B, 1.95, 180 - bAng / 2, ROLE.input), lab('γ', C, 1.95, 270 - (bAng - aAng) / 2, ROLE.result)] },
      { narration: 'Draw the line through C parallel to AB (violet). Parallel lines make equal alternate angles: the angle between this line and CA, on the left of C, equals α (blue); the angle between it and CB, on the right, equals β (red).', objects: [ln([A[0] - 1.6, C[1]], [B[0] + 1.6, C[1]], ROLE.aid, 0.04), ...chevron(-0.9, A[1], ROLE.aid), ...chevron(-0.9, C[1], ROLE.aid), arcAlpha2, arcBeta2, lab('α', C, 1.95, 180 + aAng / 2, ROLE.output), lab('β', C, 1.95, 360 - bAng / 2, ROLE.input), lb('alternate angles are equal', [0.1, 3.7], ROLE.aid)] },
      { narration: 'At C the three angles α, γ and β lie side by side on one side of the parallel line, so together they make a straight angle (the violet half circle): α + γ + β = 50° + 70° + 60° = 180°. The three angles of the triangle add up to 180°.', objects: [straight, lb('straight angle', [3.2, 2.9], ROLE.aid), lb('50° + 70° + 60° = 180°', [0, -3.5], ROLE.result)] },
    ],
  }
}

// ── 2. Length ────────────────────────────────────────────────────────────────

/** A quarter circle of radius R = 4 about (−3.2, −2.4), from angle 0° to 90°, and polygonal paths of 1, 2 and 4 equal chords inscribed in it. */
export const LEN = { c: [-3.2, -2.4] as Pt, R: 4, chords: [1, 2, 4] as const }
export const lenPt = (a: number): Pt => [LEN.c[0] + LEN.R * Math.cos(deg(a)), LEN.c[1] + LEN.R * Math.sin(deg(a))]
/** The length of an inscribed path of n equal chords in a quarter circle of radius 1: 2n sin(π/4n). */
export const lenChordSum = (n: number) => 2 * n * Math.sin(Math.PI / (4 * n))

/** KG: the one-dimensional measure of a segment, extended to curves via arc length. */
export function buildLengthScene(): SceneSpec {
  return framed(raw_buildLengthScene())
}
function raw_buildLengthScene(): SceneSpec {
  const path = (n: number, color: string, t: number): SceneObject[] => Array.from({ length: n }, (_, k) => ln(lenPt((90 * k) / n), lenPt((90 * (k + 1)) / n), color, t))
  const f2 = (x: number) => x.toFixed(2)
  return {
    id: 'math-length',
    title: 'Length: from segments to arcs',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how length of a curve is built from the length of segments. The quarter circle of radius 1 (blue, scaled by 4) has arc length π/2 ≈ 1.571. One chord from end to end has length √2 ≈ 1.41; two equal chords 1.53; four equal chords 1.56. Each time the path of chords hugs the arc more closely and its length climbs towards the arc length 1.57.',
    ariaLabel:
      'A quarter of a circle in blue from the bottom right to the top left of the figure. In the first step one red chord joins its two ends, captioned 1 chord 1.41. In the second step a violet path of two equal chords is added, captioned 2 chords 1.53. In the third step a green path of four equal chords hugs the arc, captioned 4 chords 1.56, and the arc is captioned arc 1.57.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A quarter of a circle of radius 1 (blue). The distance between its ends, the length of the straight chord (red), is √(1² + 1²) = √2 ≈ 1.41 — shorter than the arc.', objects: [curve(arcPts(LEN.c[0], LEN.c[1], LEN.R, 0, 90, 48), ROLE.output), ...path(1, ROLE.input, 0.06), dt(lenPt(0), ROLE.ink, 0.13), dt(lenPt(90), ROLE.ink, 0.13), lb(`1 chord: ${f2(lenChordSum(1))}`, [3.3, 1.5], ROLE.input)] },
      { narration: 'Split the arc at its midpoint and join the three points: two equal chords (violet) have the total length 2 × 0.765 ≈ 1.53, a better estimate.', objects: [...path(2, ROLE.aid, 0.06), lb(`2 chords: ${f2(lenChordSum(2))}`, [3.3, 0.6], ROLE.aid)] },
      { narration: 'Four equal chords (green) hug the arc even more closely: total length ≈ 1.56. The sums 1.41, 1.53, 1.56 climb towards the length of the arc itself, π/2 ≈ 1.57 — the length of a curve is the limit of the lengths of chord paths.', objects: [...path(4, ROLE.result, 0.06), lb(`4 chords: ${f2(lenChordSum(4))}`, [3.3, -0.3], ROLE.result), lb(`arc: ${f2(Math.PI / 2)}`, [3.3, -1.2], ROLE.output)] },
    ],
  }
}

// ── 3. Differential geometry of surfaces ─────────────────────────────────────

/** Principal sections of three surfaces at one point: each column draws the two principal normal sections as circle arcs of radius 2 (curving up +, flat 0, curving down −). K = k₁ k₂. */
export const SRF = {
  cols: [{ name: 'sphere', x: -3.2, s: [1, 1], K: 'K > 0' }, { name: 'cylinder', x: 0, s: [1, 0], K: 'K = 0' }, { name: 'saddle', x: 3.2, s: [1, -1], K: 'K < 0' }] as ReadonlyArray<{ name: string; x: number; s: readonly [number, number]; K: string }>,
  rowsY: [1.2, -1.0] as const,
  R: 2,
  halfWidth: 1.2,
}
export const srfSection = (x: number, y: number, s: number, R: number): SceneObject => {
  const pts = Array.from({ length: 25 }, (_, k) => { const u = -SRF.halfWidth + (2 * SRF.halfWidth * k) / 24; return P(x + u, y + s * (R - Math.sqrt(R * R - u * u))) })
  return curve(pts, s === 0 ? ROLE.reference : ROLE.output)
}

/** KG: first and second fundamental forms, Gaussian curvature K, mean curvature H, Gauss–Bonnet. */
export function buildSurfaceCurvatureScene(): SceneSpec {
  return framed(raw_buildSurfaceCurvatureScene())
}
function raw_buildSurfaceCurvatureScene(): SceneSpec {
  const { cols, rowsY, R, halfWidth } = SRF
  const sign = (s: number) => (s > 0 ? '+' : s < 0 ? '−' : '0')
  const column = (i: number): SceneObject[] => {
    const c = cols[i]
    return [
      ...rowsY.flatMap((y, r) => {
        const color = r === 0 ? ROLE.output : ROLE.input
        const s = c.s[r]
        const pts = Array.from({ length: 25 }, (_, k) => { const u = -halfWidth + (2 * halfWidth * k) / 24; return P(c.x + u, y + s * (R - Math.sqrt(R * R - u * u))) })
        return [ln([c.x - halfWidth - 0.2, y], [c.x + halfWidth + 0.2, y], ROLE.reference, 0.02), curve(pts, color), dt([c.x, y], ROLE.ink, 0.1), lb(sign(s), [c.x, y - 0.75], color)]
      }),
      lb(c.name, [c.x, 2.85], ROLE.ink),
      lb(c.K, [c.x, -2.55], ROLE.result),
      ...(i === 0 ? [lb('two sections through one point', [0, -3.5], ROLE.ink)] : []),
    ]
  }
  return {
    id: 'math-surface-curvature',
    title: 'Gaussian curvature of a surface',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how the two principal curvatures k₁, k₂ of a surface at a point give the Gaussian curvature K = k₁ k₂. Each column draws the two principal normal sections through the point (blue and red arcs against the grey tangent line). On a sphere of radius 2 both sections curve the same way (k₁ = k₂ = 0.5), so K = 0.25 > 0. On a cylinder one section is a straight line (k₂ = 0), so K = 0. On a saddle one section curves up (k₁ = 0.5) and the other down (k₂ = −0.5), so K = −0.25 < 0.',
    ariaLabel:
      'Three columns, one per surface, each with two small panels: a blue curve and a red curve through a dot on a grey horizontal line. In the first step, the sphere: both curves arc upward, signs plus and plus, caption K greater than 0. In the second step, the cylinder: the blue curve arcs upward and the red one is a flat line, signs plus and zero, caption K equals 0. In the third step, the saddle: the blue curve arcs upward and the red one downward, signs plus and minus, caption K less than 0.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A sphere of radius 2. At a point, both normal sections (blue, red) curve to the same side of the tangent line (grey) with radius 2: the principal curvatures are k₁ = k₂ = 1/2 (signs + and +). K = k₁ k₂ = 1/4 > 0.', objects: column(0) },
      { narration: 'A cylinder: one normal section (blue) is a circle of radius 2, the other (red) is a straight line, so k₁ = 1/2 and k₂ = 0 (signs + and 0). K = k₁ k₂ = 0: a cylinder can be unrolled flat.', objects: column(1) },
      { narration: 'A saddle: the blue section curves up (k₁ = 1/2) and the red section curves down (k₂ = −1/2) (signs + and −). K = k₁ k₂ = −1/4 < 0: the surface curves in opposite directions.', objects: column(2) },
    ],
  }
}

// ── 4. Geometric constructions ───────────────────────────────────────────────

/** Perpendicular bisector of AB with compass and straightedge: circles of radius r = 2.4 about A = (−1.5, 0) and B = (1.5, 0) meet at P and Q (0, ±√(r² − 1.5²)). */
export const CNS = { A: [-1.5, 0] as Pt, B: [1.5, 0] as Pt, r: 2.4 }
export const cnsH = Math.sqrt(CNS.r * CNS.r - 1.5 * 1.5)

/** KG: constructions achievable with compass and straightedge alone (bisecting segments and angles, regular polygons). */
export function buildGeometricConstructionsScene(): SceneSpec {
  return framed(raw_buildGeometricConstructionsScene())
}
function raw_buildGeometricConstructionsScene(): SceneSpec {
  const { A, B, r } = CNS
  const P1: Pt = [0, cnsH], Q1: Pt = [0, -cnsH], M: Pt = [0, 0]
  return {
    id: 'math-geometric-constructions',
    title: 'Construction: the perpendicular bisector',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how a compass and a straightedge bisect a segment. Open the compass wider than half of AB (radius 2.4 against AB = 3). Draw a circle about A and a circle of the same radius about B: they meet at P and Q. Every point of the line PQ is the same distance from A and B (PA = PB = 2.4), so PQ is the perpendicular bisector: it meets AB at its midpoint M at a right angle.',
    ariaLabel:
      'A horizontal segment A B. In the first step a blue circle about A with the caption compass radius 2.4. In the second step a red circle of the same radius about B crosses it at two green points P above and Q below the segment, with violet segments from A and B to P captioned same radius, P A equals P B. In the third step a green line through P and Q crosses A B at its midpoint M with a small right-angle mark, captioned P Q is perpendicular to A B and bisects it.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Segment AB of length 3. Set the compass to a radius r = 2.4, wider than half of AB (1.5), and draw a circle about A (blue).', objects: [ln(A, B, ROLE.reference, 0.06), dt(A, ROLE.ink, 0.13), dt(B, ROLE.ink, 0.13), lb('A', [A[0] - 0.4, A[1] - 0.45]), lb('B', [B[0] + 0.4, B[1] - 0.45]), circleAt(A[0], A[1], r, ROLE.output), lb('compass radius 2.4', [-3.0, 3.0], ROLE.output)] },
      { narration: 'With the same radius draw a circle about B (red). The circles meet at two points P and Q (green). Both are 2.4 from A and from B: PA = PB (violet).', objects: [circleAt(B[0], B[1], r, ROLE.input), ln(A, P1, ROLE.aid, 0.03), ln(B, P1, ROLE.aid, 0.03), dt(P1, ROLE.result, 0.14), dt(Q1, ROLE.result, 0.14), lb('P', [P1[0], P1[1] + 0.6]), lb('Q', [Q1[0], Q1[1] - 0.6]), lb('same radius: PA = PB', [3.0, 3.0], ROLE.aid)] },
      { narration: 'Join P and Q with the straightedge (green). Every point of PQ is the same distance from A and B, so PQ is the perpendicular bisector: it crosses AB at its midpoint M and at a right angle.', objects: [ln(P1, Q1, ROLE.result, 0.06), dt(M, ROLE.aid, 0.13), lb('M', [M[0] + 0.4, M[1] - 0.4]), ...rightAngleMark(M[0], M[1], [1, 0], [0, 1], 0.32, ROLE.aid), lb('PQ ⟂ AB and bisects it', [0, -3.4], ROLE.result)] },
    ],
  }
}

// ── 5. Function notation ─────────────────────────────────────────────────────

/** f(x) = x² + 1 on [−2.5, 2.5]; f(2) = 5 and f(−1) = 2 read off the graph. */
export const FNN: Frame = { ox: -0.8, oy: -2.6, ux: 1.5, uy: 0.55 }
export const fnnF = (x: number) => x * x + 1

/** KG: f(x) denotes the value of f at x; evaluating f(a) substitutes x = a into the rule. */
export function buildFunctionNotationScene(): SceneSpec {
  return framed(raw_buildFunctionNotationScene())
}
function raw_buildFunctionNotationScene(): SceneSpec {
  return {
    id: 'math-function-notation',
    title: 'Function notation: f(a) is a value of f',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show what f(a) means. The rule f(x) = x² + 1 (blue graph) turns each input x into an output. f(2) means "the value of f at x = 2": substitute 2 for x, 2² + 1 = 5; on the graph it is the height of the curve above x = 2. Likewise f(−1) = (−1)² + 1 = 2.',
    ariaLabel:
      'A blue upward parabola, the graph of f of x equals x squared plus 1, with x from minus 2.5 to 2.5. In the second step a violet dot at x equals 2 on the axis, a violet vertical guide up to the curve and a green dot at height 5, captioned f of 2 equals 5. In the third step the same for x equals minus 1: a violet dot, a guide and a green dot at height 2, captioned f of minus 1 equals 2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The function f(x) = x² + 1: the rule squares the input and adds 1. Its graph (blue) shows the output for every input x.', objects: [...axesOf(FNN, -2.8, 2.8, -0.3, 7.6), curveOf(FNN, fnnF, -2.5, 2.5, ROLE.output, 60), lb('x', at(FNN, 3.0, 0)), lb('y', at(FNN, 0.3, 7.7)), lb('f(x) = x² + 1', [3.7, 2.6], ROLE.output)] },
      { narration: 'f(2) means the value of f at x = 2. Substitute: f(2) = 2² + 1 = 5. On the graph: go up from x = 2 (violet) to the curve — the height there (green) is f(2) = 5.', objects: [dotAt(FNN, 2, 0, ROLE.aid, 0.12), lineAt(FNN, [2, 0], [2, fnnF(2)], ROLE.aid, 0.03), dotAt(FNN, 2, fnnF(2), ROLE.result, 0.15), lb('2', [at(FNN, 2, 0)[0], at(FNN, 0, 0)[1] - 0.4]), lb('f(2) = 5', [3.6, 0.2], ROLE.result)] },
      { narration: 'Another input: f(−1) = (−1)² + 1 = 2. The notation f(a) always asks for the output at the input a — substitute a for x in the rule.', objects: [dotAt(FNN, -1, 0, ROLE.aid, 0.12), lineAt(FNN, [-1, 0], [-1, fnnF(-1)], ROLE.aid, 0.03), dotAt(FNN, -1, fnnF(-1), ROLE.result, 0.15), lb('−1', [at(FNN, -1, 0)[0], at(FNN, 0, 0)[1] - 0.4]), lb('f(−1) = 2', [3.6, -0.9], ROLE.result)] },
    ],
  }
}

// ── 6. Zero of a function ────────────────────────────────────────────────────

/** f(x) = x² − 2x − 3 = (x + 1)(x − 3): zeros −1 and 3; f(2) = −3 and f(4) = 5 bracket the zero 3. */
export const ZRF: Frame = { ox: -1.2, oy: 0, ux: 1.3, uy: 0.5 }
export const zrF = (x: number) => x * x - 2 * x - 3

/** KG: a value x₀ with f(x₀) = 0 — an x-intercept of the graph; the Intermediate Value Theorem locates zeros between a negative and a positive value. */
export function buildZeroOfFunctionScene(): SceneSpec {
  return framed(raw_buildZeroOfFunctionScene())
}
function raw_buildZeroOfFunctionScene(): SceneSpec {
  return {
    id: 'math-zero-of-function',
    title: 'Zeros of a function',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that a zero of f is an x-intercept of its graph. For f(x) = x² − 2x − 3 = (x + 1)(x − 3) the graph (blue) crosses the x-axis at x = −1 and x = 3 (green): f(−1) = 0 and f(3) = 0. The Intermediate Value Theorem finds such zeros without solving: f(2) = −3 is below the axis and f(4) = 5 is above it, so the continuous graph must cross the axis between x = 2 and x = 4.',
    ariaLabel:
      'A blue upward parabola crossing the horizontal axis at two points. In the second step green dots mark the crossings at minus 1 and 3, captioned the zeros of f. In the third step two violet dots mark the curve at x equals 2 below the axis, captioned f of 2 equals minus 3, and at x equals 4 above the axis, captioned f of 4 equals 5, with the caption sign change means a zero between.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The graph of f(x) = x² − 2x − 3 (blue), a parabola. A zero of f is an input where the output is 0 — a point where the graph meets the x-axis.', objects: [...axesOf(ZRF, -2.5, 4.5, -4.4, 6.6), curveOf(ZRF, zrF, -2.2, 4.2, ROLE.output, 72), lb('f(x) = x² − 2x − 3', [0.1, 3.8], ROLE.output)] },
      { narration: 'The graph crosses the x-axis at x = −1 and x = 3 (green): f(−1) = 1 + 2 − 3 = 0 and f(3) = 9 − 6 − 3 = 0. These are the zeros of f.', objects: [dotAt(ZRF, -1, 0, ROLE.result, 0.15), dotAt(ZRF, 3, 0, ROLE.result, 0.15), lb('−1', [at(ZRF, -1, 0)[0], -0.5], ROLE.result), lb('3', [at(ZRF, 3, 0)[0], -0.5], ROLE.result), lb('the zeros of f', [0.1, 1.0], ROLE.result)] },
      { narration: 'Without solving: f(2) = −3 is below the axis and f(4) = 5 is above it. A continuous graph cannot jump over the axis, so by the Intermediate Value Theorem it crosses between x = 2 and x = 4 — there is a zero there (it is 3).', objects: [dotAt(ZRF, 2, zrF(2), ROLE.aid, 0.14), dotAt(ZRF, 4, zrF(4), ROLE.aid, 0.14), lb('f(2) = −3', [at(ZRF, 2, 0)[0], -2.75], ROLE.aid), lb('f(4) = 5', [2.2, 2.6], ROLE.aid), lb('sign change: a zero between', [0.6, -3.5], ROLE.aid)] },
    ],
  }
}

// ── 7. Step functions ────────────────────────────────────────────────────────

/** The floor ⌊x⌋ (steps closed on the left, open on the right) and the ceiling ⌈x⌉ (open on the left, closed on the right) on [−2, 3]. */
export const STP: Frame = { ox: -0.6, oy: 0, ux: 1.5, uy: 0.95 }
export const stpNs = [-2, -1, 0, 1, 2] as const
const ring = (f: Frame, x: number, y: number, color: string): SceneObject => circleAt(at(f, x, y)[0], at(f, x, y)[1], 0.11, color, 14)

/** KG: a piecewise-constant function; ⌊x⌋ = the greatest integer ≤ x, ⌈x⌉ = the smallest integer ≥ x. */
export function buildStepFunctionScene(): SceneSpec {
  return framed(raw_buildStepFunctionScene())
}
function raw_buildStepFunctionScene(): SceneSpec {
  const floorStep = (n: number): SceneObject[] => [lineAt(STP, [n, n], [n + 1, n], ROLE.output, 0.06), dotAt(STP, n, n, ROLE.output, 0.1), ring(STP, n + 1, n, ROLE.output)]
  const ceilStep = (n: number): SceneObject[] => [lineAt(STP, [n, n + 1], [n + 1, n + 1], ROLE.input, 0.06), ring(STP, n, n + 1, ROLE.input), dotAt(STP, n + 1, n + 1, ROLE.input, 0.1)]
  return {
    id: 'math-step-function',
    title: 'Step functions: floor and ceiling',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show two step functions. The floor ⌊x⌋ (blue) is the greatest integer that is at most x: on each interval [n, n + 1) it is constant n — a filled dot at the left end (included) and an open ring at the right end (excluded). So ⌊2.7⌋ = 2 and ⌊−1.2⌋ = −2. The ceiling ⌈x⌉ (red) is the smallest integer at least x: on (n, n + 1] it is constant n + 1 — a ring on the left, a filled dot on the right — so ⌈2.1⌉ = 3.',
    ariaLabel:
      'In the first step a blue staircase on the x axis from minus 2 to 3: five horizontal unit segments, each with a filled dot at its left end and an open ring at its right end, the segment on the interval from n to n plus 1 at height n. In the second step two green dots read the staircase: at x equals 2.7 the height is 2, captioned floor of 2.7 equals 2, and at x equals minus 1.2 the height is minus 2, captioned floor of minus 1.2 equals minus 2. In the third step a red staircase appears one unit higher on each interval, with a ring on the left and a filled dot on the right, and the reading at x equals 2.1 is 3.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The floor ⌊x⌋ (blue): on each interval [n, n + 1) its value is n. The filled dot at the left end says "included", the open ring at the right end says "excluded" — at x = 1 the value jumps from 0 to 1.', objects: [...axesOf(STP, -2.5, 3.5, -2.6, 3.7), ...stpNs.flatMap(floorStep), lb('floor ⌊x⌋', [-3.0, 2.2], ROLE.output)] },
      { narration: 'Reading the floor: x = 2.7 lies in [2, 3), so ⌊2.7⌋ = 2; x = −1.2 lies in [−2, −1), so ⌊−1.2⌋ = −2 (not −1: the floor rounds down).', objects: [dotAt(STP, 2.7, 0, ROLE.aid, 0.1), lineAt(STP, [2.7, 0], [2.7, 2], ROLE.aid, 0.03), dotAt(STP, 2.7, 2, ROLE.result, 0.13), dotAt(STP, -1.2, 0, ROLE.aid, 0.1), lineAt(STP, [-1.2, 0], [-1.2, -2], ROLE.aid, 0.03), dotAt(STP, -1.2, -2, ROLE.result, 0.13), lb('⌊2.7⌋ = 2', [3.2, -0.7], ROLE.result), lb('⌊−1.2⌋ = −2', [-2.4, -3.1], ROLE.result)] },
      { narration: 'The ceiling ⌈x⌉ (red) rounds up: on (n, n + 1] its value is n + 1 — a ring on the left, a filled dot on the right. Reading it: x = 2.1 lies in (2, 3], so ⌈2.1⌉ = 3.', objects: [...stpNs.flatMap(ceilStep), dotAt(STP, 2.1, 0, ROLE.aid, 0.1), lineAt(STP, [2.1, 0], [2.1, 3], ROLE.aid, 0.03), dotAt(STP, 2.1, 3, ROLE.result, 0.13), lb('ceiling ⌈x⌉', [-3.0, 3.3], ROLE.input), lb('⌈2.1⌉ = 3', [3.1, 4.1], ROLE.result)] },
    ],
  }
}

// ── 8. Operations on functions ───────────────────────────────────────────────

/** f(x) = x + 1 and g(x) = x²: (f + g)(2) = 3 + 4 = 7 as stacked heights; f∘g (2) = f(4) = 5 against g∘f (2) = g(3) = 9. */
export const FOP: Frame = { ox: -4.2, oy: -2.6, ux: 1.5, uy: 0.52 }
export const fopF = (x: number) => x + 1
export const fopG = (x: number) => x * x

/** KG: functions are added, subtracted, multiplied and divided pointwise; composition is a non-commutative product. */
export function buildFunctionOperationsScene(): SceneSpec {
  return framed(raw_buildFunctionOperationsScene())
}
function raw_buildFunctionOperationsScene(): SceneSpec {
  return {
    id: 'math-function-operations',
    title: 'Operations on functions',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the algebra of functions with f(x) = x + 1 (blue) and g(x) = x² (red). The sum is pointwise: (f + g)(2) = f(2) + g(2) = 3 + 4 = 7, the two heights stacked (green curve). Composition is not commutative: (f∘g)(2) = f(g(2)) = f(4) = 5 but (g∘f)(2) = g(f(2)) = g(3) = 9.',
    ariaLabel:
      'A blue straight line f of x equals x plus 1 and a red parabola g of x equals x squared. In the second step at x equals 2 a blue bar of height 3 and a red bar of height 4 stacked on it reach 7, where a green curve, the sum, passes; captioned sum at 2 is 7. In the third step two violet guide paths: from the point 2, 4 on g across to x equals 4 and up to f at height 5, captioned f after g at 2 is 5, and from the point 2, 3 on f across to x equals 3 and up to g at height 9, captioned g after f at 2 is 9.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Two functions: f(x) = x + 1 (blue line) and g(x) = x² (red parabola). Operations act on the values at each x.', objects: [...axesOf(FOP, -0.2, 4.4, -0.3, 9.6), curveOf(FOP, fopF, 0, 4.2, ROLE.output, 20), curveOf(FOP, fopG, 0, 3.05, ROLE.input, 40), lb('f', at(FOP, 4.45, 5.6), ROLE.output), lb('g', at(FOP, 3.2, 9.6), ROLE.input), lb('x', at(FOP, 4.7, 0))] },
      { narration: 'Add pointwise: at x = 2 the height of f is 3 and the height of g is 4; stacked they reach 3 + 4 = 7 = (f + g)(2) — the green curve f + g passes through that height at every x.', objects: [lineAt(FOP, [2, 0], [2, fopF(2)], ROLE.output, 0.09), lineAt(FOP, [2, fopF(2)], [2, fopF(2) + fopG(2)], ROLE.input, 0.09), curveOf(FOP, (x) => fopF(x) + fopG(x), 0, 2.6, ROLE.result, 30), dotAt(FOP, 2, fopF(2) + fopG(2), ROLE.result, 0.14), lb('sum at 2: 7', [3.4, 0.7], ROLE.result)] },
      { narration: 'Compose: f after g at 2 — g(2) = 4 (violet dot on g), then f(4) = 5 (go across to x = 4 and up to f). g after f at 2 — f(2) = 3, then g(3) = 9. So f∘g and g∘f differ: composition is not commutative.', objects: [dotAt(FOP, 2, fopG(2), ROLE.aid, 0.12), lineAt(FOP, [2, fopG(2)], [fopG(2), fopG(2)], ROLE.aid, 0.03), lineAt(FOP, [fopG(2), fopG(2)], [fopG(2), fopF(fopG(2))], ROLE.aid, 0.03), dotAt(FOP, fopG(2), fopF(fopG(2)), ROLE.result, 0.14), dotAt(FOP, 2, fopF(2), ROLE.aid, 0.12), lineAt(FOP, [2, fopF(2)], [fopF(2), fopF(2)], ROLE.aid, 0.03), lineAt(FOP, [fopF(2), fopF(2)], [fopF(2), fopG(fopF(2))], ROLE.aid, 0.03), dotAt(FOP, fopF(2), fopG(fopF(2)), ROLE.result, 0.14), lb('f after g at 2: 5', at(FOP, 5.0, 2.5), ROLE.result), lb('g after f at 2: 9', at(FOP, 5.3, 9.3), ROLE.result)] },
    ],
  }
}

// ── 9. Analytic continuation ─────────────────────────────────────────────────

/** The complex plane (1 unit = 2 world units, origin at (0.2, 0)): the series of 1/(1 − z) about 0 converges in |z| < 1, the series about −0.5 in |z + 0.5| < 1.5; both discs stop at the pole z = 1. */
export const ACN = { ox: 0.2, oy: 0, u: 2 }
export const acnPt = (x: number, y: number): Pt => [ACN.ox + ACN.u * x, ACN.oy + ACN.u * y]
export const acnPoint = -1.2

/** KG: extending a holomorphic function beyond its domain by matching power series on overlapping discs; the continuation is unique. */
export function buildAnalyticContinuationScene(): SceneSpec {
  return framed(raw_buildAnalyticContinuationScene())
}
function raw_buildAnalyticContinuationScene(): SceneSpec {
  const c0 = acnPt(0, 0), c1 = acnPt(-0.5, 0), pole = acnPt(1, 0), q = acnPt(acnPoint, 0)
  return {
    id: 'math-analytic-continuation',
    title: 'Analytic continuation: overlapping discs',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how a function is continued by a chain of power series. 1/(1 − z) = 1 + z + z² + … converges only inside the disc |z| < 1 (blue), whose radius is the distance 1 from the centre 0 to the pole z = 1 (red). Re-expand about the new centre −0.5: that series converges in the larger disc |z + 0.5| < 1.5 (violet), again stopped by the same pole. The point −1.2 is outside the first disc (|−1.2| = 1.2 > 1) but inside the second (distance 0.7 < 1.5): the second series continues the function there, to 1/(1 + 1.2) ≈ 0.45.',
    ariaLabel:
      'The complex plane with a horizontal real axis and a vertical imaginary axis. In the first step a blue circle of radius 1 about the origin and a red dot on its right edge at 1, the pole, captioned pole at 1 and radius 1. In the second step a larger violet circle of radius 1.5 about minus 0.5 also passes through the red dot and reaches further left, captioned radius 1.5. In the third step a green dot at minus 1.2 outside the blue circle but inside the violet one, with a green leader line to the caption point minus 1.2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The series 1 + z + z² + … for 1/(1 − z) converges inside the disc |z| < 1 (blue). Its radius 1 is the distance from the centre 0 to the pole z = 1 (red), where 1/(1 − z) is not defined.', objects: [...[arrow(P(-4.0, 0), P(3.0, 0), ROLE.reference), arrow(P(0.2, -3.6), P(0.2, 3.6), ROLE.reference)], lb('Re', [3.2, -0.4]), lb('Im', [0.7, 3.7]), circleAt(c0[0], c0[1], ACN.u * 1, ROLE.output), dt(c0, ROLE.ink, 0.08), dt(pole, ROLE.input, 0.15), lb('pole at 1', [4.2, 0.7], ROLE.input), lb('radius 1', [4.2, 1.7], ROLE.output)] },
      { narration: 'Expand again about the point −0.5: the new series converges in the disc |z + 0.5| < 1.5 (violet) — its radius is the distance 1.5 to the same pole. The two discs overlap, and on the overlap the two series give the same function.', objects: [circleAt(c1[0], c1[1], ACN.u * 1.5, ROLE.aid), dt(c1, ROLE.ink, 0.08), lb('radius 1.5', [4.2, 2.7], ROLE.aid)] },
      { narration: 'The point −1.2 is outside the first disc (distance 1.2 from 0 is more than 1), so the first series diverges there; but it is inside the second (distance 0.7 from −0.5 is less than 1.5), so the second series defines the function there: the continuation 1/(1 + 1.2) ≈ 0.45.', objects: [dt(q, ROLE.result, 0.15), ln([q[0], q[1] - 0.2], [q[0], -3.35], ROLE.result, 0.025), lb('point −1.2', [q[0], -3.85], ROLE.result)] },
    ],
  }
}

// ── 10. Singularities ────────────────────────────────────────────────────────

/** Three isolated singularities at 0, seen along the real axis as the distance r → 0 (x runs from r = 1 on the left to r = 0.15 on the right; one panel each). */
export const SNG = [{ ox: -4.7, name: 'removable' }, { ox: -1.6, name: 'pole' }, { ox: 1.5, name: 'essential' }] as const
export const sngU = { x: 3.2, y: 0.9, oy: -2.5 }
/** The x position (world) of the distance r in a panel: r = 1 at the panel's left edge, r = 0.15 at 0.85 · 3.2 to its right. */
export const sngX = (ox: number, r: number) => ox + (1 - r) * sngU.x
export const sngY = (v: number) => sngU.oy + v * sngU.y
const sngRs = (r0: number, r1: number, n: number) => Array.from({ length: n + 1 }, (_, k) => r0 + ((r1 - r0) * k) / n)

/** KG: removable (f bounded near z₀), pole (|f| → ∞), essential (neither); Riemann's theorem: removable iff bounded. */
export function buildSingularitiesScene(): SceneSpec {
  return framed(raw_buildSingularitiesScene())
}
function raw_buildSingularitiesScene(): SceneSpec {
  const panelAxes = (ox: number): SceneObject[] => [ln([ox, sngU.oy], [ox + 2.8, sngU.oy], ROLE.reference, 0.03), ln([ox, sngU.oy], [ox, sngU.oy + 4.8], ROLE.reference, 0.03), lb('r', [ox + 2.75, sngU.oy - 0.4])]
  const trace = (ox: number, fn: (r: number) => number, r0: number, r1: number, color: string): SceneObject => curve(sngRs(r0, r1, 40).map((r) => P(sngX(ox, r), sngY(fn(r)))), color)
  const [S1, S2, S3] = SNG
  return {
    id: 'math-singularities',
    title: 'Isolated singularities: three types',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the three kinds of isolated singularity at z = 0 by watching |f| as the distance r from 0 shrinks (the distance r, marked on each axis, runs from 1 on the left to 0.15 on the right of each panel). Removable: sin z / z stays bounded and tends to 1, so the hole can be filled. Pole: |1/z| = 1/r grows without bound. Essential: along the positive real axis e^(1/z) = e^(1/r) explodes while along the negative real axis it shrinks to 0 — no limit at all.',
    ariaLabel:
      'Three small graphs side by side, each plotting the size of f against the distance r to zero, which shrinks to the right. In the first step, removable: a blue curve rising gently to the level 1 and flattening, captioned sin z over z, bounded. In the second step, pole: a red curve climbing steeply to the top, captioned 1 over z, grows without bound. In the third step, essential: a red curve shooting up and a blue curve falling to zero, captioned e to the 1 over z, no limit.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Removable singularity: f(z) = sin z / z at z = 0. As r shrinks, |f| = sin r / r creeps up to 1 (blue): f is bounded near 0, so defining f(0) = 1 removes the singularity (Riemann: bounded ⟹ removable).', objects: [...panelAxes(S1.ox), trace(S1.ox, (r) => Math.sin(r) / r, 1, 0.15, ROLE.output), ln([S1.ox, sngY(1)], [S1.ox + 2.8, sngY(1)], ROLE.aid, 0.02), lb('removable', [S1.ox + 1.4, 2.7], ROLE.output), lb('sin z / z', [S1.ox + 1.4, -3.0], ROLE.output), lb('bounded', [S1.ox + 1.4, -4.0], ROLE.output)] },
      { narration: 'Pole: f(z) = 1/z. As r shrinks, |f| = 1/r (red) grows without bound — it passes 4 at r = 0.25 and reaches 5 at r = 0.2.', objects: [...panelAxes(S2.ox), trace(S2.ox, (r) => 1 / r, 1, 0.2, ROLE.input), lb('pole', [S2.ox + 1.4, 2.7], ROLE.input), lb('1 / z', [S2.ox + 1.4, -3.0], ROLE.input), lb('unbounded', [S2.ox + 1.4, -4.0], ROLE.input)] },
      { narration: 'Essential singularity: f(z) = e^(1/z). Along the positive real axis |f| = e^(1/r) shoots up (red: it passes 5 already at r ≈ 0.62); along the negative real axis |f| = e^(−1/r) shrinks to 0 (blue). Different paths give different limits: neither bounded nor tending to ∞.', objects: [...panelAxes(S3.ox), trace(S3.ox, (r) => Math.exp(1 / r), 1, 0.63, ROLE.input), trace(S3.ox, (r) => Math.exp(-1 / r), 1, 0.15, ROLE.output), lb('essential', [S3.ox + 1.4, 2.7], ROLE.ink), lb('e^(1/z)', [S3.ox + 1.4, -3.0], ROLE.ink), lb('no limit', [S3.ox + 1.4, -4.0], ROLE.ink)] },
    ],
  }
}

// ── 11. Residue ──────────────────────────────────────────────────────────────

/** f(z) = 3/(z − 2): at z = 2 + h the value f = 3/h (blue bars for h = 1, ½, ¼: 3, 6, 12) while (z − 2) f(z) = h · f stays 3 (green bars) — the residue. */
export const RSD = { xs: [-2.8, -0.4, 2.0] as const, hs: [1, 0.5, 0.25] as const, baseTop: -0.2, baseBottom: -3.1, u: 0.28, res: 3 }
export const rsdLabelH = ['1', '½', '¼']

/** KG: Res(f, z₀) = a₋₁ of the Laurent expansion; for a simple pole Res = lim (z − z₀) f(z). */
export function buildResidueScene(): SceneSpec {
  return framed(raw_buildResidueScene())
}
function raw_buildResidueScene(): SceneSpec {
  const { xs, hs, baseTop, baseBottom, u, res } = RSD
  const bar = (x: number, y0: number, h: number, color: string): SceneObject => ln([x, y0], [x, y0 + h * u], color, 0.5)
  const fVals = hs.map((h) => res / h)
  return {
    id: 'math-residue',
    title: 'Residue of a simple pole',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show what the residue of a simple pole is. For f(z) = 3/(z − 2) look at the points z = 2 + h at the distances h = 1, ½, ¼ from the pole. The values f(2 + h) = 3/h = 3, 6, 12 (blue bars) blow up, but the product (z − 2) f(z) = h · 3/h stays 3 (green bars). That constant, lim (z − 2) f(z) = 3, is the residue of f at 2: the coefficient a₋₁ of 1/(z − 2).',
    ariaLabel:
      'Two rows of vertical bars above the distances 1, one half and one quarter from the pole. In the first step blue bars of heights 3, 6 and 12 grow taller as the distance shrinks, captioned f of z equals 3 over z minus 2. In the second step three equal green bars below, each of height 3, captioned z minus 2 times f of z stays 3. In the third step the caption residue 3 appears.',
    stage: NO_STAGE,
    steps: [
      { narration: 'f(z) = 3/(z − 2) has a simple pole at z = 2. At z = 2 + h its value is 3/h: 3, 6, 12 for h = 1, ½, ¼ (blue bars) — the closer to the pole, the larger.', objects: [...xs.map((x, i) => bar(x, baseTop, fVals[i], ROLE.output)), ...xs.map((x, i) => lb(String(fVals[i]), [x, baseTop + fVals[i] * u + 0.45], ROLE.output)), lb('f(z) = 3 / (z − 2)', [-2.2, 4.3], ROLE.output)] },
      { narration: 'Multiply by the distance (z − 2) = h: h · 3/h = 3 at every one of the points (green bars, all the same height). The growth of f is exactly cancelled by the factor (z − 2).', objects: [...xs.map((x) => bar(x, baseBottom, res, ROLE.result)), ...xs.map((x, i) => lb(String(res), [x, baseBottom + res * u + 0.45], ROLE.result)), ...xs.map((x, i) => lb(rsdLabelH[i], [x, baseBottom - 0.5])), lb('distance h from the pole', [-0.4, -4.3], ROLE.ink), lb('(z − 2) f(z) stays 3', [-0.4, -1.05], ROLE.result)] },
      { narration: 'The constant value, lim (z − 2) f(z) = 3, is the residue of f at z = 2 — the coefficient a₋₁ of 1/(z − 2) in the Laurent expansion f = 3/(z − 2).', objects: [lb('residue 3', [4.0, -2.2], ROLE.result)] },
    ],
  }
}

// ── 12. Argument principle ───────────────────────────────────────────────────

/** f(z) = z² − 1 on the circle |z − 0.5| = 2 (left panel, 1 unit = 0.9): the zeros ±1 are inside, no poles; its image (right panel, 1 unit = 0.42) winds twice round 0: Z − P = 2 − 0 = 2. */
export const ARP = { zc: [-2.6, 0] as Pt, uz: 0.9, wc: [2.2, 0] as Pt, uw: 0.42, centre: 0.5, radius: 2, t0: 0.3 }
export const arpZ = (x: number, y: number): Pt => [ARP.zc[0] + ARP.uz * x, ARP.zc[1] + ARP.uz * y]
export const arpW = (re: number, im: number): Pt => [ARP.wc[0] + ARP.uw * re, ARP.wc[1] + ARP.uw * im]
/** The image w(t) = f(0.5 + 2 e^(it)) = −0.75 + 2 e^(it) + 4 e^(2it), t from t0 to t0 + 2π. */
export const arpImage = (t: number): [number, number] => [-0.75 + 2 * Math.cos(t) + 4 * Math.cos(2 * t), 2 * Math.sin(t) + 4 * Math.sin(2 * t)]

/** KG: (1/2πi)∮ f′/f dz = Z − P — the number of zeros minus poles inside C, the winding number of f(C) around 0. */
export function buildArgumentPrincipleScene(): SceneSpec {
  return framed(raw_buildArgumentPrincipleScene())
}
function raw_buildArgumentPrincipleScene(): SceneSpec {
  const { t0, centre, radius } = ARP
  const img = Array.from({ length: 121 }, (_, k) => { const [re, im] = arpImage(t0 + (2 * Math.PI * k) / 120); return pp(arpW(re, im)) })
  return {
    id: 'math-argument-principle',
    title: 'The argument principle',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that the winding number of f(C) around 0 counts zeros minus poles. Take f(z) = z² − 1 and the circle C: |z − 0.5| = 2 (left, blue). Inside C lie the two zeros z = ±1 (green) and no poles. Going once round C, the image point w = f(z) (right, red) winds twice counter-clockwise round the origin — it crosses the positive real axis twice, upward both times. Winding number 2 = Z − P = 2 − 0.',
    ariaLabel:
      'On the left, the z plane: a blue circle centred at 0.5 with radius 2 and two green dots at minus 1 and 1 inside it, captioned zeros inside 2. On the right, the w plane: a red closed curve with a small loop inside a larger one around the origin, which is marked by a dot; a violet ray from the origin to the right is crossed by the curve twice. Captions: w plane, winds 2 times, and Z minus P equals 2 minus 0 equals 2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The z-plane (left): the circle C: |z − 0.5| = 2 (blue). The function f(z) = z² − 1 has zeros at z = 1 and z = −1 (green); both lie inside C (their distances to the centre 0.5 are 0.5 and 1.5, less than 2), and f has no poles.', objects: [arrow(P(...arpZ(-2.4, 0)), P(...arpZ(3.0, 0)), ROLE.reference), arrow(P(...arpZ(0, -2.6)), P(...arpZ(0, 2.6)), ROLE.reference), circleAt(arpZ(centre, 0)[0], arpZ(centre, 0)[1], ARP.uz * radius, ROLE.output), dt(arpZ(-1, 0), ROLE.result, 0.15), dt(arpZ(1, 0), ROLE.result, 0.15), lb('z-plane', [-2.6, 3.2], ROLE.ink), lb('zeros inside: 2', [-2.6, -3.5], ROLE.result)] },
      { narration: 'The w-plane (right): as z goes once round C, w = f(z) traces the red curve, a loop inside a loop. The origin (the dot) lies inside the inner loop.', objects: [arrow(P(...arpW(-5.2, 0)), P(...arpW(6.2, 0)), ROLE.reference), arrow(P(...arpW(0, -5.4)), P(...arpW(0, 5.4)), ROLE.reference), curve(img, ROLE.input), dt(arpW(0, 0), ROLE.ink, 0.13), lb('w-plane', [2.2, 3.2], ROLE.ink)] },
      { narration: 'Count the turns round the origin: a ray from 0 along the positive real axis (violet) is crossed twice, both times upward — the curve winds twice counter-clockwise. Winding number 2 = Z − P = 2 − 0: two zeros and no poles inside C.', objects: [ln(arpW(0, 0), arpW(5.8, 0), ROLE.aid, 0.03), lb('winds 2 times', [2.2, -3.5], ROLE.input), lb('Z − P = 2 − 0 = 2', [2.2, -4.2], ROLE.result)] },
    ],
  }
}
