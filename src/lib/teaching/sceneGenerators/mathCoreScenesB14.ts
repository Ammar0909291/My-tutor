/**
 * Core school-mathematics figures — batch 14 of the mathematics visual campaign
 * (2026-10-12): linear algebra, part 2, plus the geometric sequence.
 *
 * The dot product as a sum of component products, the cross product in space, row operations
 * that leave the solution point fixed, subspaces (a line through 0 against a shifted line), the
 * null space as a solution line, the column space as a reachable line, kernel and image of a
 * map, eigenspaces, an orthonormal basis, least squares and the singular value decomposition as
 * circle → ellipse. Same rules as batches 1-13: one visual language from visualDesign.ts, labels
 * are names not sentences (marks of 1-2 characters are free), steps are cumulative,
 * coordinates stay inside +-5, at most 50 objects per step, nothing the figure audit rejects, and
 * every number drawn comes from the constants and pure helpers exported here, which the test file
 * re-derives independently from the DRAWN coordinates.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, guide, mathAxes, polyLines, arcPts, rightAngleMark, type XY, type V3 } from './mathSceneKit'
import { add, sub, scale, dotv, norm, det2, solveBasis, applyMat, type Vec } from './mathCoreScenesB13'

const f1 = (n: number) => (Math.round(n * 10) / 10).toFixed(1)
const f2 = (n: number) => { const v = (Math.round(n * 100) / 100).toFixed(2); return v === '-0.00' ? '0.00' : v }
const ring = (x: number, y: number, color: string, r = 0.11): SceneObject => curve(arcPts(x, y, r, 0, 360, 24), color)
const unitOf = (p: Vec): XY => [p[0] / norm(p), p[1] / norm(p)]
const dir = (a: Vec, b: Vec): XY => unitOf(sub(b, a))
type Mat2 = readonly [readonly [number, number], readonly [number, number]]

// ── 1. Dot product (algebra) ─────────────────────────────────────────────────

/** a = (2, −1, 3), b = (4, 2, 1): products 8, −2, 3; a·b = 9 = |a||b| cos θ with θ ≈ 58.3°. */
export const DOTL = { a: [2, -1, 3], b: [4, 2, 1], ua: 0.4, up: 0.3, xa: [-4.4, -3.6, -2.8], xb: [-1.4, -0.6, 0.2], xp: [1.7, 2.5, 3.3], xt: 4.4 } as const
export const dotN = (p: readonly number[], q: readonly number[]) => p.reduce((s, v, i) => s + v * q[i], 0)
export const normN = (p: readonly number[]) => Math.sqrt(dotN(p, p))
export const angleN = (p: readonly number[], q: readonly number[]) => (Math.acos(dotN(p, q) / (normN(p) * normN(q))) * 180) / Math.PI

/** KG: a·b = Σaᵢbᵢ = |a||b| cos θ; zero iff orthogonal. */
export function buildLinalgDotProductScene(): SceneSpec {
  return framed(raw_buildLinalgDotProductScene())
}
function raw_buildLinalgDotProductScene(): SceneSpec {
  const { a, b, ua, up, xa, xb, xp, xt } = DOTL
  const bar = (x: number, h: number, scaleH: number, color: string): SceneObject[] => (Math.abs(h) < 1e-9 ? [] : [line(P(x, 0), P(x, h * scaleH), color, 0.14)])
  const digit = (x: number, h: number, scaleH: number, text: string, color: string) => label(text, P(x, h * scaleH + (h >= 0 ? 0.3 : -0.3)), color, 'detail')
  const prods = a.map((v, i) => v * b[i]), total = prods.reduce((s, v) => s + v, 0)
  const th = angleN(a, b)
  return {
    id: 'math-linalg-dot-product',
    title: 'Dot product: multiply matching components, then add',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a·b = Σaᵢbᵢ for a = (2, −1, 3) and b = (4, 2, 1): the component products 8, −2, 3 (signed bars) add to 9, which equals |a||b| cos θ = 3.74 × 4.58 × 0.525 with θ ≈ 58.3°.',
    ariaLabel:
      'Three bar charts. Left: the components of a, 2, minus 1 and 3. Middle: the components of b, 4, 2 and 1. Right: the products of matching components, 8 (green, up), minus 2 (red, down) and 3 (green, up). A tall green bar at the far right is their sum, 9, the dot product. The angle between the vectors is about 58.3 degrees because the dot product 9 equals the lengths 3.74 and 4.58 times the cosine of the angle.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The dot product of two vectors in ℝ³: a = (2, −1, 3) (blue bars) and b = (4, 2, 1) (red bars). Line up the components: 2 with 4, −1 with 2, 3 with 1.', objects: [line(P(-4.9, 0), P(0.7, 0), ROLE.reference, 0.03), ...a.flatMap((v, i) => [...bar(xa[i], v, ua, ROLE.output), digit(xa[i], v, ua, String(v).replace('-', '−'), ROLE.output)]), ...b.flatMap((v, i) => [...bar(xb[i], v, ua, ROLE.input), digit(xb[i], v, ua, String(v), ROLE.input)]), label('a', P(-3.6, 1.9), ROLE.output, 'primary'), label('b', P(-0.6, 1.9), ROLE.input, 'primary')] },
      { narration: 'Multiply each matching pair: 2 × 4 = 8, (−1) × 2 = −2, 3 × 1 = 3. Positive products point up (green), the negative one points down (red).', objects: [line(P(1.0, 0), P(3.9, 0), ROLE.reference, 0.03), ...prods.flatMap((v, i) => [...bar(xp[i], v, up, v >= 0 ? ROLE.result : ROLE.input), digit(xp[i], v, up, String(v).replace('-', '−'), v >= 0 ? ROLE.result : ROLE.input)]), label('products', P(2.5, 3.0), ROLE.ink, 'primary')] },
      { narration: 'Add them: a·b = 8 − 2 + 3 = 9. Geometrically a·b = |a||b| cos θ = 3.74 × 4.58 × cos θ, so cos θ = 9 ÷ 17.1 = 0.525 and the angle is θ ≈ 58.3°. (A zero sum would mean orthogonal vectors.)', objects: [...bar(xt, total, up, ROLE.result), digit(xt, total, up, String(total), ROLE.result), label('a·b = 8 − 2 + 3 = 9', P(0.4, -1.3), ROLE.result, 'primary'), label(`θ ≈ ${f1(th)}°`, P(0.4, -2.0), ROLE.aid, 'primary')] },
    ],
  }
}

// ── 2. Cross product (algebra) ───────────────────────────────────────────────

/** a = (2, 0, 0), b = (1, 2, 0): a × b = (0, 0, 4). Oblique view: screen = ((y − k x) u + ox, (z − k x) u + oy). */
export const CROSSL = { a: [2, 0, 0], b: [1, 2, 0], k: 0.35, u: 0.75, ox: -1.0, oy: -1.2 } as const
export const cross3 = (p: readonly number[], q: readonly number[]): [number, number, number] => [p[1] * q[2] - p[2] * q[1], p[2] * q[0] - p[0] * q[2], p[0] * q[1] - p[1] * q[0]]
export const projectL = (x: number, y: number, z: number): XY => [(y - CROSSL.k * x) * CROSSL.u + CROSSL.ox, (z - CROSSL.k * x) * CROSSL.u + CROSSL.oy]

/** KG: a × b = (a₂b₃ − a₃b₂, a₃b₁ − a₁b₃, a₁b₂ − a₂b₁): perpendicular to a and b, magnitude |a||b| sin θ, anti-commutative. */
export function buildLinalgCrossProductScene(): SceneSpec {
  return framed(raw_buildLinalgCrossProductScene())
}
function raw_buildLinalgCrossProductScene(): SceneSpec {
  const { a, b } = CROSSL
  const Pp = (x: number, y: number, z: number): V3 => P(...projectL(x, y, z))
  const c = cross3(a, b), cr = cross3(b, a)
  return {
    id: 'math-linalg-cross-product',
    title: 'Cross product: perpendicular to both, anti-commutative',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the cross product of a = (2, 0, 0) and b = (1, 2, 0) in space: a × b = (0, 0, 4) is perpendicular to the floor plane that holds a and b, its length 4 equals the parallelogram area |a||b| sin θ, and b × a = (0, 0, −4) points the opposite way.',
    ariaLabel:
      'A three-dimensional frame in oblique view. Two arrows lie in the floor plane: a along the x axis, toward the viewer, and b leaning to the right. A dashed parallelogram on them has area 4. A green arrow a cross b stands straight up from the origin, length 4, perpendicular to the floor. A violet arrow b cross a points straight down, the same length: the product changes sign when the order is swapped.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Two vectors in space: a = (2, 0, 0) along x (toward you) and b = (1, 2, 0), both lying in the floor plane (z = 0). Together they span a parallelogram (dashed).', objects: [arrow(Pp(0, 0, 0), Pp(3.2, 0, 0), ROLE.reference), arrow(Pp(0, 0, 0), Pp(0, 3.4, 0), ROLE.reference), arrow(Pp(0, 0, 0), Pp(0, 0, 4.9), ROLE.reference), arrow(Pp(0, 0, 0), Pp(...a), ROLE.output), arrow(Pp(0, 0, 0), Pp(...b), ROLE.input), guide(Pp(...a), Pp(a[0] + b[0], a[1] + b[1], 0), ROLE.reference, 0.03), guide(Pp(...b), Pp(a[0] + b[0], a[1] + b[1], 0), ROLE.reference, 0.03), label('a', P(...projectL(2.4, 0, 0)), ROLE.output, 'primary'), label('b', P(projectL(1, 2, 0)[0] + 0.3, projectL(1, 2, 0)[1] - 0.2), ROLE.input, 'primary')] },
      { narration: 'a × b = (a₂b₃ − a₃b₂, a₃b₁ − a₁b₃, a₁b₂ − a₂b₁) = (0 − 0, 0 − 0, 2·2 − 0·1) = (0, 0, 4). It points straight UP: perpendicular to both a and b. Its length 4 is the parallelogram area |a||b| sin θ = 2 × 2.24 × 0.89.', objects: [arrow(Pp(0, 0, 0), Pp(...c), ROLE.result), label('a × b = (0, 0, 4)', P(projectL(0, 0, 4)[0] + 1.35, projectL(0, 0, 4)[1] + 0.1), ROLE.result, 'primary'), label('length 4 = area', P(projectL(0, 0, 2)[0] + 1.1, projectL(0, 0, 2)[1]), ROLE.result, 'primary')] },
      { narration: 'Swap the order and the sign flips: b × a = (0, 0, −4) points DOWN. The cross product is anti-commutative: b × a = −(a × b). (Right-hand rule: curl the fingers from the first vector to the second, the thumb gives the direction.)', objects: [arrow(Pp(0, 0, 0), Pp(...cr), ROLE.aid), label('b × a = (0, 0, −4)', P(projectL(0, 0, -4)[0] + 1.35, projectL(0, 0, -4)[1] - 0.1), ROLE.aid, 'primary')] },
    ],
  }
}

// ── 3. Row reduction ─────────────────────────────────────────────────────────

/** 2x + y = 5, x − y = 1 → (R₁ − 2R₂)/3: y = 1 → x = 2. Every stage's line passes through the solution (2, 1). */
export const ROWR = { lines: [{ a: 2, b: 1, c: 5 }, { a: 1, b: -1, c: 1 }, { a: 0, b: 1, c: 1 }, { a: 1, b: 0, c: 2 }] as ReadonlyArray<{ a: number; b: number; c: number }>, sol: [2, 1] as Vec, u: 0.8 } as const

/** KG: swap, scale, add-a-multiple row operations transform Ax = b without changing its solution set. */
export function buildRowReductionScene(): SceneSpec {
  return framed(raw_buildRowReductionScene())
}
function raw_buildRowReductionScene(): SceneSpec {
  const { lines: ls, sol, u } = ROWR
  const S = (x: number, y: number): V3 => P((x - sol[0]) * u, (y - sol[1]) * u)
  const draw = (k: number, color: string, thick: number): SceneObject => {
    const { a, b, c } = ls[k]
    return b === 0 ? line(S(c / a, -2.4), S(c / a, 4.4), color, thick) : a === 0 ? line(S(-1.4, c / b), S(5.4, c / b), color, thick) : line(S(-0.6, (c - a * -0.6) / b), S(3.6, (c - a * 3.6) / b), color, thick)
  }
  return {
    id: 'math-row-reduction',
    title: 'Row reduction: new equations, same solution',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that row operations keep the solution: the equations 2x + y = 5 and x − y = 1 are two lines meeting at (2, 1); replacing a row by R₁ − 2R₂ (÷ 3) gives y = 1, and then x = 2; every new line still passes through (2, 1), until the reduced rows read the answer off.',
    ariaLabel:
      'Two lines on the plane, the graphs of 2x plus y equals 5 in blue and x minus y equals 1 in red, crossing at the point 2, 1. A green horizontal line, y equals 1, is the result of subtracting twice the second row from the first and dividing by 3; it passes through the same point. A violet vertical line x equals 2, from the reduced form, passes through the same point too: every row operation produced a new line through the one solution.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The system 2x + y = 5, x − y = 1: each row of the augmented matrix [ 2 1 | 5 ; 1 −1 | 1 ] is a line, and the solution is where the lines cross: (2, 1).', objects: [draw(0, ROLE.output, 0.05), draw(1, ROLE.input, 0.05), dot(S(...sol), ROLE.result, 0.13), label('row 1: (2 1 | 5)', P(S(0.4, 4.2)[0] - 0.6, S(0.4, 4.2)[1]), ROLE.output, 'primary'), label('row 2: (1 −1 | 1)', P(S(3.6, 2.6)[0] + 0.2, S(3.6, 2.6)[1] + 0.2), ROLE.input, 'primary'), label('solution (2, 1)', P(S(...sol)[0] + 1.3, S(...sol)[1] - 0.45), ROLE.result, 'primary')] },
      { narration: 'Row operation: replace row 1 by R₁ − 2R₂ = (2 − 2, 1 + 2 | 5 − 2) = (0 3 | 3), then divide by 3: (0 1 | 1), the equation y = 1. A NEW line (green), yet it still passes through (2, 1): the solution has not changed.', objects: [draw(2, ROLE.result, 0.06), label('R₁ − 2R₂, ÷3: (0 1 | 1)', P(-2.2, S(0, 1)[1] + 0.45), ROLE.result, 'primary')] },
      { narration: 'Add the new row to row 2 (R₂ + R₁): (1 0 | 2), the equation x = 2, a vertical line (violet) through the same point. The matrix [ 1 0 | 2 ; 0 1 | 1 ] is the reduced form: read x = 2, y = 1 straight off. Swap, scale and add never move the intersection point.', objects: [draw(3, ROLE.aid, 0.06), label('R₂ + R₁: (1 0 | 2)', P(S(2, 4.3)[0] + 1.5, S(2, 4.3)[1]), ROLE.aid, 'primary')] },
    ],
  }
}

// ── 4. Subspace ──────────────────────────────────────────────────────────────

/** W = the line y = x/2 through 0 (a subspace); the shifted line y = x/2 + 1 is not. */
export const SUBSP = { m: 0.5, shift: 1, u: [[2, 1], [-4, -2]] as readonly Vec[], p: [[0, 1], [2, 2]] as readonly Vec[], s: 0.65, ox: 0, oy: -0.2 } as const
export const onLine = (pt: Vec, shift: number) => Math.abs(pt[1] - (SUBSP.m * pt[0] + shift)) < 1e-9

/** KG: W ⊆ V is a subspace iff it contains 0 and is closed under addition and scalar multiplication. */
export function buildSubspaceScene(): SceneSpec {
  return framed(raw_buildSubspaceScene())
}
function raw_buildSubspaceScene(): SceneSpec {
  const { m, shift, u, p, s, ox, oy } = SUBSP
  const S = (x: number, y: number): V3 => P(x * s + ox, y * s + oy)
  const us = add(u[0], u[1]), ps = add(p[0], p[1])
  return {
    id: 'math-subspace',
    title: 'Subspace: closed under + and scaling, and contains 0',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a subspace of the plane: the line y = x/2 through the origin contains 0 and stays inside itself when you add vectors (u + v) or scale them (2u), so it is a subspace; the shifted line y = x/2 + 1 misses 0 and adding two of its vectors, p + q = (2, 3), leaves the line, so it is not.',
    ariaLabel:
      'A blue line through the origin with slope one half. Two arrows on it, u to 2, 1 and v to minus 4, minus 2, add up to the arrow minus 2, minus 1, which is still on the line; doubling u stays on it too. A second, red, line is shifted up by 1 and does not pass through the origin. Two arrows to points on it, p to 0, 1 and q to 2, 2, add to 2, 3, which is above the red line: the sum leaves the line.',
    stage: NO_STAGE,
    steps: [
      { narration: 'W = the line y = x/2 through the origin. It contains the zero vector. Take two vectors in it, u = (2, 1) and v = (−4, −2). Their sum u + v = (−2, −1) is again on the line, and so is a multiple such as 2u = (4, 2).', objects: [...mathAxes(S, -5.4, 5.4, -3.6, 3.6), line(S(-6, -3), S(6, 3), ROLE.output, 0.04), arrow(S(0, 0), S(...u[0]), ROLE.output), arrow(S(0, 0), S(...u[1]), ROLE.aid), arrow(S(0, 0), S(...us), ROLE.result), dot(S(...scale(2, u[0])), ROLE.output, 0.09), label('u + v stays in W', P(S(...us)[0] - 1.2, S(...us)[1] - 0.6), ROLE.result, 'primary'), label('contains 0', P(S(0, 0)[0] + 0.1, S(0, 0)[1] + 1.0), ROLE.ink, 'primary')] },
      { narration: 'Now shift the line up by 1: y = x/2 + 1 (red). It does NOT pass through the origin, so 0 is missing. Take p = (0, 1) and q = (2, 2) on it: p + q = (2, 3), but the line at x = 2 has height 2, so the sum is OFF the line. Not closed under addition.', objects: [line(S(-6, -2), S(6, 4), ROLE.input, 0.04), arrow(S(0, 0), S(...p[0]), ROLE.input), arrow(S(0, 0), S(...p[1]), ROLE.input), arrow(S(0, 0), S(...ps), ROLE.aid), label('p + q leaves the line', P(S(...ps)[0] - 1.3, S(...ps)[1] + 0.4), ROLE.aid, 'primary')] },
      { narration: 'So a subspace must (1) contain the zero vector, (2) be closed under addition and (3) be closed under scalar multiplication. The line through 0 passes all three; the shifted line fails (1) and (2). In ℝ² the subspaces are {0}, lines through 0, and the whole plane.', objects: [label('line through 0: subspace', P(-3.0, -2.6), ROLE.output, 'primary'), label('shifted line: not a subspace', P(-3.0, -3.2), ROLE.input, 'primary')] },
    ],
  }
}

// ── 5. Null space ────────────────────────────────────────────────────────────

/** A = [[1, 2], [2, 4]]: N(A) = {x : x + 2y = 0} = span{(−2, 1)}; Ax = b = (3, 6) has solution line x + 2y = 3. */
export const NULLS = { A: [[1, 2], [2, 4]] as Mat2, nullDir: [-2, 1] as Vec, b: [3, 6] as Vec, probe: [1, 1] as Vec, u: 0.7, ox: -0.8 } as const
export const mulA = (x: Vec) => applyMat(NULLS.A as unknown as readonly [readonly [number, number], readonly [number, number]], x)

/** KG: N(A) = {x : Ax = 0}, a subspace; the solution set of Ax = b is x_p + N(A). */
export function buildNullSpaceScene(): SceneSpec {
  return framed(raw_buildNullSpaceScene())
}
function raw_buildNullSpaceScene(): SceneSpec {
  const { nullDir, probe, u, ox } = NULLS
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u)
  const t = [-3, -1, 1, 3]
  return {
    id: 'math-null-space',
    title: 'Null space: the solutions of Ax = 0',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the null space of A = [[1, 2], [2, 4]]: all x with Ax = 0 form the line x + 2y = 0 spanned by (−2, 1); vectors on it are sent to 0, other vectors are not, and the solutions of Ax = b = (3, 6) are one particular solution plus the null space: a parallel line x + 2y = 3.',
    ariaLabel:
      'The plane of inputs x. A blue line through the origin along minus 2, 1 is the null space: every point on it has Ax equal to 0. A vector 1, 1 not on the line has Ax equal to 3, 6, not zero. A parallel red line through 1, 1, the line x plus 2y equals 3, is the set of all solutions of Ax equals 3, 6: any particular solution plus any null-space vector.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A = [[1, 2], [2, 4]] sends x = (x, y) to (x + 2y, 2x + 4y). The null space N(A) = {x : Ax = 0} needs x + 2y = 0 (the second row is twice the first): the line through the origin along (−2, 1).', objects: [...mathAxes(S, -4.4, 4.4, -3.4, 3.4), line(S(-4, 2), S(4, -2), ROLE.output, 0.05), arrow(S(0, 0), S(...nullDir), ROLE.output), ...t.map((c) => dot(S(c * nullDir[0] * 0.5, c * nullDir[1] * 0.5), ROLE.output, 0.08)), label('N(A): Ax = 0', P(S(3.6, -1.8)[0] - 0.2, S(3.6, -1.8)[1] - 0.5), ROLE.output, 'primary')] },
      { narration: 'Check: A(−2, 1) = (−2 + 2, −4 + 4) = (0, 0), and so is every multiple. A vector off the line, x = (1, 1), gives A(1, 1) = (3, 6) ≠ 0, so it is not in the null space. The null space is a subspace (here a line).', objects: [arrow(S(0, 0), S(...probe), ROLE.input), label('A(1, 1) = (3, 6) ≠ 0', P(S(...probe)[0] + 1.3, S(...probe)[1] + 0.5), ROLE.input, 'primary')] },
      { narration: 'Solve Ax = b = (3, 6): one solution is x = (1, 1) (the red point). All solutions are that one plus anything in the null space: (1, 1) + c(−2, 1). They form the red line x + 2y = 3, parallel to the null space.', objects: [line(S(-3, 3), S(5, -1), ROLE.input, 0.04), dot(S(...probe), ROLE.input, 0.11), label('all solutions of Ax = b', P(S(-2.4, 2.7)[0] - 0.2, S(-2.4, 2.7)[1] + 0.5), ROLE.input, 'primary'), label('xₚ + N(A)', P(S(4, -0.7)[0], S(4, -0.7)[1] + 0.5), ROLE.input, 'primary')] },
    ],
  }
}

// ── 6. Column space ──────────────────────────────────────────────────────────

/** A = [[1, 2], [1, 2]]: columns (1, 1) and (2, 2); C(A) = the line y = x; b = (3, 3) is reachable, b′ = (1, 0) is not. */
export const COLS = { A: [[1, 2], [1, 2]] as Mat2, cols: [[1, 1], [2, 2]] as readonly Vec[], b: [3, 3] as Vec, bBad: [1, 0] as Vec, u: 0.8, ox: -0.6, oy: -0.4 } as const

/** KG: C(A) = {Ax} = the span of the columns; Ax = b is consistent iff b ∈ C(A); dim C(A) = rank(A). */
export function buildColumnSpaceScene(): SceneSpec {
  return framed(raw_buildColumnSpaceScene())
}
function raw_buildColumnSpaceScene(): SceneSpec {
  const { cols, b, bBad, u, ox, oy } = COLS
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  return {
    id: 'math-column-space',
    title: 'Column space: every b you can reach as Ax',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the column space of A = [[1, 2], [1, 2]]: its columns (1, 1) and (2, 2) lie on one line, so C(A) is the line y = x (rank 1); Ax = (3, 3) is solvable (b is on the line) but Ax = (1, 0) is not (b is off it).',
    ariaLabel:
      'The output plane. Two arrows, the columns of A, 1, 1 in blue and 2, 2 in red, lie along the same line y equals x, a violet line through the origin: their combinations reach only that line, the column space. A green dot at 3, 3 lies on the line, so the equation Ax equals 3, 3 has a solution. A red ring at 1, 0 lies off the line: no combination of the columns gives it, so Ax equals 1, 0 has no solution.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A = [[1, 2], [1, 2]]. Ax = x·(1, 1) + y·(2, 2): the outputs are combinations of the COLUMNS (1, 1) and (2, 2). They point the same way, so everything Ax can produce lies on one line.', objects: [...mathAxes(S, -2.4, 5.4, -1.6, 4.6), arrow(S(0, 0), S(...cols[0]), ROLE.output), arrow(S(0, -0.3), S(cols[1][0], cols[1][1] - 0.3), ROLE.input), label('column 1', P(S(...cols[0])[0] + 0.1, S(...cols[0])[1] - 0.5), ROLE.output, 'primary'), label('column 2', P(S(...cols[1])[0] - 1.0, S(...cols[1])[1] + 0.3), ROLE.input, 'primary')] },
      { narration: 'The column space C(A) = span of the columns = the line y = x (violet). It is a subspace of the output plane of dimension 1: rank(A) = 1.', objects: [line(S(-1.8, -1.8), S(4.6, 4.6), ROLE.aid, 0.04), label('C(A): the line y = x', P(S(-1.6, 1.0)[0], S(-1.6, 1.0)[1]), ROLE.aid, 'primary')] },
      { narration: 'Ax = b is solvable exactly when b is in C(A). b = (3, 3) is on the line: x = (1, 1) works (1·(1, 1) + 1·(2, 2) = (3, 3)). b′ = (1, 0) is off the line: no combination of the columns reaches it, so Ax = b′ has NO solution.', objects: [dot(S(...b), ROLE.result, 0.12), ring(S(...bBad)[0], S(...bBad)[1], ROLE.input, 0.16), label('b = (3, 3): solvable', P(S(...b)[0] + 1.1, S(...b)[1] - 0.45), ROLE.result, 'primary'), label('b′ = (1, 0): no solution', P(S(...bBad)[0] + 1.3, S(...bBad)[1] - 0.5), ROLE.input, 'primary')] },
    ],
  }
}

// ── 7. Kernel and image ──────────────────────────────────────────────────────

/** T(x, y) = (x + y, 2x + 2y): ker T = {x + y = 0}; im T = span{(1, 2)}. Left panel: input plane; right panel: output plane. */
export const KERIM = { T: [[1, 1], [2, 2]] as Mat2, cx: [-2.6, 2.7], u: 0.55, levels: [-1, 1, 2] as readonly number[] } as const
export const applyK = (v: Vec) => applyMat(KERIM.T as unknown as readonly [readonly [number, number], readonly [number, number]], v)

/** KG: ker(T) = {T(v) = 0} ⊆ V and im(T) = {T(v)} ⊆ W; T is injective iff ker = {0}, surjective iff im = W. */
export function buildKernelImageScene(): SceneSpec {
  return framed(raw_buildKernelImageScene())
}
function raw_buildKernelImageScene(): SceneSpec {
  const { cx, u, levels } = KERIM
  const L = (x: number, y: number): V3 => P(cx[0] + x * u, y * u)
  const R = (x: number, y: number): V3 => P(cx[1] + x * u, y * u)
  return {
    id: 'math-kernel-image',
    title: 'Kernel and image of a linear map',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show T(x, y) = (x + y, 2x + 2y): the kernel is the input line x + y = 0 (all sent to 0), the image is the output line along (1, 2); each input line x + y = c collapses to the single image point (c, 2c), so T is neither injective (the kernel is a line) nor surjective (the image is a line, not the plane).',
    ariaLabel:
      'Two planes side by side. Left, the input plane, with a red line x plus y equals 0, the kernel. Right, the output plane, with a blue line along 1, 2, the image. Parallel input lines x plus y equals minus 1, 1 and 2 are each mapped to one point on the image line: minus 1, minus 2; 1, 2; and 2, 4. The whole kernel line goes to the origin on the right.',
    stage: NO_STAGE,
    steps: [
      { narration: 'T(x, y) = (x + y, 2x + 2y), from the input plane (left) to the output plane (right). The KERNEL ker T = {v : T(v) = 0} needs x + y = 0: the red line y = −x. All of it is sent to the single point 0.', objects: [...mathAxes(L, -3.4, 3.4, -3.4, 3.4), ...mathAxes(R, -3.4, 3.4, -3.4, 3.4), line(L(-3, 3), L(3, -3), ROLE.input, 0.05), dot(R(0, 0), ROLE.input, 0.12), label('ker T: x + y = 0', P(cx[0], 2.2), ROLE.input, 'primary'), label('input', P(cx[0], -2.4), ROLE.reference, 'primary'), label('output', P(cx[1], -2.4), ROLE.reference, 'primary')] },
      { narration: 'The IMAGE im T = {T(v)} is every output T can produce. T(x, y) = (x + y)·(1, 2), so it is the line through the origin along (1, 2) (blue). Each parallel input line x + y = c (grey) is squashed to ONE image point (c, 2c): c = −1, 1, 2 give (−1, −2), (1, 2), (2, 4).', objects: [line(R(-1.7, -3.4), R(1.7, 3.4), ROLE.output, 0.05), ...levels.flatMap((c) => [line(L(-3, c + 3), L(3, c - 3), ROLE.reference, 0.025), dot(R(c, 2 * c), ROLE.output, 0.1)]), label('im T: along (1, 2)', P(cx[1] + 1.3, 2.2), ROLE.output, 'primary')] },
      { narration: 'So T is NOT injective: ker T is a whole line, not just {0}, so different inputs (like (1, 0) and (0, 1)) give the same output. T is NOT surjective: im T is a line, not the whole output plane. Injective ⇔ ker T = {0}; surjective ⇔ im T = the whole target.', objects: [label('kernel = line: not injective', P(cx[0], -3.0), ROLE.input, 'primary'), label('image = line: not onto', P(cx[1], -3.0), ROLE.output, 'primary')] },
    ],
  }
}

// ── 8. Eigenspace ────────────────────────────────────────────────────────────

/** A = [[2, 1], [1, 2]]: λ = 3 on y = x (vector (1, 1)), λ = 1 on y = −x (vector (1, −1)). */
export const EIG = { A: [[2, 1], [1, 2]] as Mat2, e3: [1, 1] as Vec, e1: [1, -1] as Vec, w: [2, 0] as Vec, u: 0.7 } as const
export const applyE = (v: Vec) => applyMat(EIG.A as unknown as readonly [readonly [number, number], readonly [number, number]], v)

/** KG: E_λ = ker(A − λI) = {v : Av = λv}; its dimension is the geometric multiplicity. */
export function buildEigenspaceScene(): SceneSpec {
  return framed(raw_buildEigenspaceScene())
}
function raw_buildEigenspaceScene(): SceneSpec {
  const { e3, e1, w, u } = EIG
  const S = (x: number, y: number): V3 => P(x * u, y * u - 0.2)
  const aw = applyE(w)
  return {
    id: 'math-eigenspace',
    title: 'Eigenspace: directions A only stretches',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the eigenspaces of A = [[2, 1], [1, 2]]: on the line y = x vectors are stretched by λ = 3 (A(1, 1) = (3, 3)), on y = −x they are kept the same (λ = 1: A(1, −1) = (1, −1)), while a vector off both lines, w = (2, 0), is turned (Aw = (4, 2)).',
    ariaLabel:
      'Two lines through the origin, y equals x and y equals minus x. The vector 1, 1 on the first line is sent by A to 3, 3, three times as long on the same line (green); the vector 1, minus 1 on the second line is sent to itself. A vector 2, 0 not on either line is sent to 4, 2 (violet), which points in a different direction, so it is rotated as well as stretched.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A = [[2, 1], [1, 2]] acts on the plane. An eigenvector v satisfies Av = λv: A only stretches it. The set of all such vectors for one λ is the eigenspace E_λ, a line through 0 here. Candidates: the diagonals y = x and y = −x.', objects: [...mathAxes(S, -4.4, 4.4, -3.4, 3.4), line(S(-4, -4), S(4, 4), ROLE.aid, 0.03), line(S(-4, 4), S(4, -4), ROLE.reference, 0.03), arrow(S(0, 0), S(...e3), ROLE.output), arrow(S(0, 0), S(...e1), ROLE.input)] },
      { narration: 'A(1, 1) = (3, 3) = 3·(1, 1): the vector stays on y = x and is tripled, so λ = 3 and E₃ is the line y = x. A(1, −1) = (1, −1) = 1·(1, −1): unchanged, λ = 1, and E₁ is the line y = −x.', objects: [arrow(S(0, -0.1), S(applyE(e3)[0], applyE(e3)[1] - 0.1), ROLE.result), label('E₃: y = x, λ = 3', P(S(3.4, 3.4)[0] - 0.6, S(3.4, 3.4)[1] + 0.5), ROLE.result, 'primary'), label('E₁: y = −x, λ = 1', P(S(2.8, -2.8)[0] - 0.2, S(2.8, -2.8)[1] - 0.5), ROLE.input, 'primary')] },
      { narration: 'Any other vector is not an eigenvector. w = (2, 0) goes to Aw = (4, 2), which no longer points along w (the angle changes): A rotates it as well as stretching it. Eigenvectors are the special directions A does not turn.', objects: [arrow(S(0, 0), S(...w), ROLE.reference), arrow(S(0, 0.1), S(aw[0], aw[1] + 0.1), ROLE.aid), label('w = (2, 0)', P(S(...w)[0] + 0.3, S(...w)[1] - 0.5), ROLE.reference, 'primary'), label('Aw = (4, 2): turned', P(S(...aw)[0] - 0.1, S(...aw)[1] + 0.6), ROLE.aid, 'primary')] },
    ],
  }
}

// ── 9. Orthogonal / orthonormal basis ────────────────────────────────────────

/** ONB e = (1, 1)/√2, f = (−1, 1)/√2; v = (3, 1) = ⟨v, e⟩ e + ⟨v, f⟩ f with ⟨v, e⟩ = 2√2 and ⟨v, f⟩ = −√2. */
export const ONB = { e: [Math.SQRT1_2, Math.SQRT1_2] as Vec, f: [-Math.SQRT1_2, Math.SQRT1_2] as Vec, v: [3, 1] as Vec, u: 0.9, ox: -0.8, oy: -0.9 } as const

/** KG: a basis of mutually orthogonal unit vectors; the coordinates of v are just the inner products ⟨v, eᵢ⟩. */
export function buildOrthogonalBasisScene(): SceneSpec {
  return framed(raw_buildOrthogonalBasisScene())
}
function raw_buildOrthogonalBasisScene(): SceneSpec {
  const { e, f, v, u, ox, oy } = ONB
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  const ce = dotv(v, e), cf = dotv(v, f)
  const pe = scale(ce, e), pf = scale(cf, f)
  return {
    id: 'math-orthogonal-basis',
    title: 'Orthonormal basis: coordinates are just dot products',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show an orthonormal basis e = (1, 1)/√2, f = (−1, 1)/√2 (unit length, perpendicular): the coordinates of v = (3, 1) are the plain inner products ⟨v, e⟩ = 2.83 and ⟨v, f⟩ = −1.41, and v = 2.83e − 1.41f.',
    ariaLabel:
      'Two unit arrows from the origin at right angles, e pointing up and to the right and f pointing up and to the left. A vector v to 3, 1 has dashed perpendiculars dropped onto the line of e, hitting it 2.83 along, and onto the line of f, hitting it minus 1.41 along, that is 1.41 backwards. Walking 2.83 along e and then 1.41 back along f arrives exactly at v.',
    stage: NO_STAGE,
    steps: [
      { narration: 'An orthonormal basis: e = (1, 1)/√2 and f = (−1, 1)/√2 each have length 1 and meet at a right angle (e·f = 0). They form a rotated copy of the usual axes.', objects: [...mathAxes(S, -2.4, 4.6, -1.6, 3.6), arrow(S(0, 0), S(...e), ROLE.output), arrow(S(0, 0), S(...f), ROLE.input), ...rightAngleMark(S(0, 0)[0], S(0, 0)[1], unitOf(e), unitOf(f), 0.28, ROLE.result), label('e', P(S(...e)[0] + 0.3, S(...e)[1] - 0.2), ROLE.output, 'primary'), label('f', P(S(...f)[0] - 0.3, S(...f)[1] + 0.1), ROLE.input, 'primary')] },
      { narration: 'To find the coordinates of v = (3, 1) in this basis, just take dot products: ⟨v, e⟩ = (3 + 1)/√2 = 2.83 and ⟨v, f⟩ = (−3 + 1)/√2 = −1.41. These are where perpendiculars from v land on the lines of e and f.', objects: [line(S(-1.2, -1.2), S(4, 4), ROLE.aid, 0.025), line(S(1.6, -1.6), S(-1.6, 1.6), ROLE.aid, 0.025), arrow(S(0, 0), S(...v), ROLE.ink), guide(S(...v), S(...pe), ROLE.reference, 0.03), guide(S(...v), S(...pf), ROLE.reference, 0.03), label('v = (3, 1)', P(S(...v)[0] + 0.9, S(...v)[1] + 0.2), ROLE.ink, 'primary'), label(`⟨v, e⟩ = ${f2(ce)}`, P(S(...pe)[0] + 1.1, S(...pe)[1] - 0.5), ROLE.output, 'primary'), label(`⟨v, f⟩ = −${f2(-cf)}`, P(S(...pf)[0] - 0.9, S(...pf)[1] - 0.5), ROLE.input, 'primary')] },
      { narration: 'Walk 2.83 along e, then 1.41 BACK along f: you arrive at (3, 1). So v = ⟨v, e⟩ e + ⟨v, f⟩ f. With an orthonormal basis no equations need solving: the coordinates are read off with dot products.', objects: [line(S(0, 0), S(...pe), ROLE.output, 0.06), line(S(...pe), S(...add(pe, pf)), ROLE.input, 0.06), dot(S(...v), ROLE.result, 0.11)] },
    ],
  }
}

// ── 10. Least squares ────────────────────────────────────────────────────────

/** Points (1, 1), (2, 2), (3, 2) with A = [[1, 1], [1, 2], [1, 3]], b = (1, 2, 2): normal equations AᵀA x̂ = Aᵀb give x̂ = (2/3, 1/2). */
export const LSQ = { xs: [1, 2, 3], ys: [1, 2, 2], u: 0.9, ox: -1.8, oy: -1.4 } as const
export function lsqFit(xs: readonly number[], ys: readonly number[]) {
  const n = xs.length, sx = xs.reduce((s, v) => s + v, 0), sy = ys.reduce((s, v) => s + v, 0), sxx = xs.reduce((s, v) => s + v * v, 0), sxy = xs.reduce((s, v, i) => s + v * ys[i], 0)
  const ata = [[n, sx], [sx, sxx]], atb = [sy, sxy], d = ata[0][0] * ata[1][1] - ata[0][1] * ata[1][0]
  const c = (ata[1][1] * atb[0] - ata[0][1] * atb[1]) / d, m = (ata[0][0] * atb[1] - ata[1][0] * atb[0]) / d
  return { c, m, ata, atb, sse: xs.reduce((s, v, i) => s + (ys[i] - (c + m * v)) ** 2, 0) }
}
export const lsqSse = (c: number, m: number) => LSQ.xs.reduce((s, v, i) => s + (LSQ.ys[i] - (c + m * v)) ** 2, 0)

/** KG: when Ax = b has no solution, x̂ minimises |Ax − b|²; AᵀA x̂ = Aᵀb. */
export function buildLeastSquaresScene(): SceneSpec {
  return framed(raw_buildLeastSquaresScene())
}
function raw_buildLeastSquaresScene(): SceneSpec {
  const { xs, ys, u, ox, oy } = LSQ
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  const fit = lsqFit(xs, ys)
  const through12 = (x: number) => 1 + (x - 1)
  return {
    id: 'math-least-squares',
    title: 'Least squares: the best fit when Ax = b has no solution',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show least squares on the points (1, 1), (2, 2), (3, 2): no line passes through all three (the system Ax = b is inconsistent), so choose the line y = 2/3 + x/2 that minimises the sum of squared vertical errors, SSE = 1/6, found from the normal equations AᵀA x̂ = Aᵀb.',
    ariaLabel:
      'Three points at 1, 1; 2, 2 and 3, 2. The line through the first two points misses the third. The least-squares line, y equals two thirds plus x over 2, passes between the points with small vertical gaps drawn in red, whose squares add to one sixth. Another line has a bigger total.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Fit y = c + mx to the points (1, 1), (2, 2), (3, 2). That asks for c + m = 1, c + 2m = 2, c + 3m = 2: three equations, two unknowns, Ax = b. No line passes through all three points (the line through the first two misses the third), so Ax = b has NO solution.', objects: [...mathAxes(S, -0.6, 4.6, -0.6, 3.6), ...xs.map((x, i) => dot(S(x, ys[i]), ROLE.output, 0.11)), line(S(0.4, through12(0.4)), S(3.6, through12(3.6)), ROLE.reference, 0.03), ring(S(3, 3)[0], S(3, 3)[1], ROLE.input, 0.13), label('no line hits all 3', P(S(3.9, 3.4)[0] - 0.8, S(3.9, 3.4)[1] + 0.2), ROLE.reference, 'primary')] },
      { narration: 'Least squares picks the line making the SUM OF SQUARED vertical errors smallest. The normal equations AᵀA x̂ = Aᵀb, i.e. [[3, 6], [6, 14]] x̂ = (5, 11), give x̂ = (c, m) = (2/3, 1/2): the line y = 0.67 + 0.5x (green).', objects: [line(S(0.4, fit.c + fit.m * 0.4), S(3.6, fit.c + fit.m * 3.6), ROLE.result, 0.05), label('y = 0.67 + 0.5x', P(S(0.7, 2.3)[0] - 0.5, S(0.7, 2.3)[1] + 0.5), ROLE.result, 'primary')] },
      { narration: 'The vertical gaps (red) are the residuals: −1/6, +1/3, −1/6. Their squares add to SSE = 1/36 + 1/9 + 1/36 = 1/6 ≈ 0.17. Any other line, such as the one through the first two points, has a larger sum (1 for that one).', objects: [...xs.map((x, i) => line(S(x, ys[i]), S(x, fit.c + fit.m * x), ROLE.input, 0.04)), label(`SSE = ${f2(fit.sse)}`, P(S(2, 0.3)[0], S(2, 0.3)[1] - 0.4), ROLE.input, 'primary'), label(`line through 2 points: ${f2(lsqSse(0, 1))}`, P(S(2, 0.3)[0], S(2, 0.3)[1] - 1.0), ROLE.reference, 'primary')] },
    ],
  }
}

// ── 11. Singular value decomposition ─────────────────────────────────────────

/** A = [[3, 1], [1, 3]]: singular values 4 and 2 along (1, 1)/√2 and (1, −1)/√2; the unit circle maps to an ellipse with those semi-axes. */
export const SVD = { A: [[3, 1], [1, 3]] as Mat2, cx: [-2.9, 2.0], uL: 1.2, uR: 0.5 } as const
export const applyS = (v: Vec) => applyMat(SVD.A as unknown as readonly [readonly [number, number], readonly [number, number]], v)
/** Singular values of a 2×2 matrix: square roots of the eigenvalues of AᵀA. */
export function singularValues(m: Mat2): [number, number] {
  const [[a, b], [c, d]] = m
  const p = a * a + c * c, q = a * b + c * d, r = b * b + d * d
  const tr = p + r, dt = p * r - q * q, disc = Math.sqrt(Math.max(0, tr * tr / 4 - dt))
  return [Math.sqrt(tr / 2 + disc), Math.sqrt(tr / 2 - disc)]
}

/** KG: A = UΣVᵀ; the singular values are the semi-axes of the ellipse that A makes of the unit circle. */
export function buildSvdScene(): SceneSpec {
  return framed(raw_buildSvdScene())
}
function raw_buildSvdScene(): SceneSpec {
  const { cx, uL, uR } = SVD
  const L = (x: number, y: number): V3 => P(cx[0] + x * uL, y * uL)
  const R = (x: number, y: number): V3 => P(cx[1] + x * uR, y * uR)
  const v1: Vec = [Math.SQRT1_2, Math.SQRT1_2], v2: Vec = [Math.SQRT1_2, -Math.SQRT1_2]
  const [s1, s2] = singularValues(SVD.A)
  return {
    id: 'math-svd',
    title: 'Singular value decomposition: circle to ellipse',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the SVD geometrically: A = [[3, 1], [1, 3]] turns the unit circle into an ellipse whose semi-axes are the singular values σ₁ = 4 and σ₂ = 2, along the directions Av₁ and Av₂ of the right singular vectors v₁ = (1, 1)/√2 and v₂ = (1, −1)/√2: A = UΣVᵀ is rotate, stretch, rotate.',
    ariaLabel:
      'Left: the unit circle with two perpendicular unit arrows v one along the diagonal up and right and v two along the diagonal down and right. Right: the image of the circle under the matrix A, an ellipse. The image of v one is a green arrow of length 4 along the long axis, and the image of v two is a red arrow of length 2 along the short axis. The semi-axes of the ellipse, 4 and 2, are the singular values.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Start with the unit circle (all vectors of length 1) and two perpendicular unit vectors on it, the right singular vectors v₁ = (1, 1)/√2 and v₂ = (1, −1)/√2.', objects: [...mathAxes(L, -1.6, 1.6, -1.6, 1.6), curve(Array.from({ length: 73 }, (_, i) => L(Math.cos((2 * Math.PI * i) / 72), Math.sin((2 * Math.PI * i) / 72))), ROLE.ink), arrow(L(0, 0), L(...v1), ROLE.output), arrow(L(0, 0), L(...v2), ROLE.input), label('v₁', P(L(...v1)[0] + 0.15, L(...v1)[1] + 0.3), ROLE.output, 'primary'), label('v₂', P(L(...v2)[0] + 0.25, L(...v2)[1] - 0.2), ROLE.input, 'primary'), label('unit circle', P(cx[0], -2.2), ROLE.ink, 'primary')] },
      { narration: 'Apply A = [[3, 1], [1, 3]] to every point of the circle: the image is an ELLIPSE (grey). A v₁ = (4, 4)/√2 ≈ (2.83, 2.83) lands on its long axis with length 4, and A v₂ = (2, −2)/√2 ≈ (1.41, −1.41) on its short axis with length 2.', objects: [...mathAxes(R, -4.6, 4.6, -4.6, 4.6), curve(Array.from({ length: 73 }, (_, i) => { const t = (2 * Math.PI * i) / 72, q = applyS([Math.cos(t), Math.sin(t)]); return R(q[0], q[1]) }), ROLE.ink), arrow(R(0, 0), R(...applyS(v1)), ROLE.result), arrow(R(0, 0), R(...applyS(v2)), ROLE.input), label('A v₁: length 4', P(cx[1] + 1.3, 2.6), ROLE.result, 'primary'), label('A v₂: length 2', P(cx[1] + 1.2, -1.4), ROLE.input, 'primary')] },
      { narration: `The semi-axes of the ellipse are the singular values σ₁ = ${f1(s1)} and σ₂ = ${f1(s2)} (square roots of the eigenvalues 16 and 4 of AᵀA). Every matrix does this: A = UΣVᵀ turns the circle by Vᵀ, stretches along the axes by Σ, then rotates by U.`, objects: [label('σ₁ = 4, σ₂ = 2', P(cx[1], -3.2), ROLE.aid, 'primary'), label('A = UΣVᵀ: rotate, stretch, rotate', P(0, 3.5), ROLE.aid, 'primary')] },
    ],
  }
}

// ── 12. Geometric sequence ───────────────────────────────────────────────────

/** a_n = a₁ r^(n−1): ratio 2 (1, 2, 4, 8, 16), ratio ½ (16, 8, 4, 2, 1), ratio −½ (8, −4, 2, −1, 0.5). */
export const GEO = { panels: [{ a1: 1, r: 2 }, { a1: 16, r: 0.5 }, { a1: 8, r: -0.5 }] as ReadonlyArray<{ a1: number; r: number }>, cx: [-3.4, 0, 3.4], dx: 0.5, uy: 0.13, n: 5 } as const
export const geoTerm = (a1: number, r: number, n: number) => a1 * r ** (n - 1)

/** KG: a_n = a₁rⁿ⁻¹; each term is the previous one times the common ratio r. */
export function buildGeometricSequenceScene(): SceneSpec {
  return framed(raw_buildGeometricSequenceScene())
}
function raw_buildGeometricSequenceScene(): SceneSpec {
  const { panels, cx, dx, uy, n } = GEO
  const x0 = (k: number) => cx[k] - ((n - 1) / 2) * dx
  const bars = (k: number, color: string) => Array.from({ length: n }, (_, i) => { const t = geoTerm(panels[k].a1, panels[k].r, i + 1); return line(P(x0(k) + i * dx, 0), P(x0(k) + i * dx, t * uy), color, 0.08) })
  const base = (k: number) => line(P(x0(k) - 0.4, 0), P(x0(k) + (n - 1) * dx + 0.4, 0), ROLE.reference, 0.03)
  const heads = (k: number) => Array.from({ length: n }, (_, i) => { const t = geoTerm(panels[k].a1, panels[k].r, i + 1); const label2 = Number.isInteger(t) ? String(t).replace('-', '−') : String(Math.round(t * 10) / 10).replace('-', '−'); return label(label2, P(x0(k) + i * dx, t * uy + (t >= 0 ? 0.3 : -0.3)), ROLE.ink, 'detail') })
  return {
    id: 'math-geometric-sequence',
    title: 'Geometric sequence: multiply by the same ratio each time',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show geometric sequences a_n = a₁rⁿ⁻¹ as bars: ratio 2 doubles every step (1, 2, 4, 8, 16), ratio ½ halves it (16, 8, 4, 2, 1), and a negative ratio −½ shrinks the size while alternating the sign (8, −4, 2, −1, 0.5).',
    ariaLabel:
      'Three small bar charts of five terms each. Left: 1, 2, 4, 8, 16, each twice the one before, growing faster and faster. Middle: 16, 8, 4, 2, 1, each half the previous, shrinking. Right: 8, minus 4, 2, minus 1, 0.5, each minus one half times the previous, so the bars alternate above and below the axis while getting smaller.',
    stage: NO_STAGE,
    steps: [
      { narration: 'In a geometric sequence each term is the PREVIOUS term times a fixed ratio r. With a₁ = 1 and r = 2: 1, 2, 4, 8, 16 (×2 each step). The general term is aₙ = a₁ · rⁿ⁻¹, so growth gets faster and faster.', objects: [base(0), ...bars(0, ROLE.output), ...heads(0), label('ratio 2: doubles', P(cx[0], -0.7), ROLE.output, 'primary')] },
      { narration: 'With a₁ = 16 and r = ½: 16, 8, 4, 2, 1 (×½ each step). A ratio between 0 and 1 makes the terms shrink toward 0.', objects: [base(1), ...bars(1, ROLE.input), ...heads(1), label('ratio ½: halves', P(cx[1], -0.7), ROLE.input, 'primary')] },
      { narration: 'With a₁ = 8 and r = −½: 8, −4, 2, −1, 0.5. A NEGATIVE ratio flips the sign every step, so the terms alternate above and below zero while shrinking (|r| < 1).', objects: [base(2), ...bars(2, ROLE.result), ...heads(2), label('ratio −½: alternates', P(cx[2], -1.5), ROLE.result, 'primary')] },
    ],
  }
}
