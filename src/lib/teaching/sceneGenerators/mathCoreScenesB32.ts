/**
 * Core mathematics figures — batch 32 of the mathematics visual campaign (2026-10-12): the rest of the linear-algebra
 * helpers (augmented matrix, rank, inverse, vector space, dimension, matrix of a linear map, diagonalization, the spectral
 * theorem, inner product, inner-product space, QR factorization, singular values, tensor).
 *
 * Same rules as batches 1-31: one visual language from visualDesign.ts, labels are names not sentences (marks of 1-2
 * characters are free), steps are cumulative, coordinates stay inside +-5, at most 50 objects per step, nothing the figure
 * audit rejects (SM-01 evaluates the arithmetic in a label left to right: never write "1 × 5 + 2 × 7 = 19" as one label),
 * and every matrix, product, vector and length a figure states is re-derived by the test file from the DRAWN numerals,
 * arrows and curves. Dense tables keep >= 0.75 x 0.65 world units per cell and no line or dot within ~0.35 of an entry
 * (see scripts/math/label-displacement.ts).
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, arcPts, rightAngleMark } from './mathSceneKit'

export type Pt = readonly [number, number]
const pp = (p: Pt) => P(p[0], p[1])
const ln = (a: Pt, b: Pt, color: string = ROLE.reference, t = 0.04): SceneObject => line(pp(a), pp(b), color, t)
const dt = (p: Pt, color: string = ROLE.ink, r = 0.16): SceneObject => dot(pp(p), color, r)
const lb = (text: string, p: Pt, color: string = ROLE.ink): SceneObject => label(text, pp(p), color, 'primary')
const ar = (a: Pt, b: Pt, color: string = ROLE.reference): SceneObject => arrow(pp(a), pp(b), color)
const vec = (o: Pt, s: number, v: readonly [number, number]): Pt => [o[0] + s * v[0], o[1] + s * v[1]]
const num = (v: number) => (v < 0 ? '−' + String(-v) : String(v))

/** A matrix drawn as numerals between square brackets: entry (i, j) sits at mAt(spec, i, j). */
export type MSpec = { cx: number; cy: number; dx: number; dy: number; rows: number; cols: number }
export const mAt = (m: MSpec, i: number, j: number): Pt => [m.cx + (j - (m.cols - 1) / 2) * m.dx, m.cy + ((m.rows - 1) / 2 - i) * m.dy]
export function brackets(m: MSpec, padX = 0.5, padY = 0.42, tip = 0.2): SceneObject[] {
  const x0 = mAt(m, 0, 0)[0] - padX, x1 = mAt(m, 0, m.cols - 1)[0] + padX, y0 = mAt(m, 0, 0)[1] + padY, y1 = mAt(m, m.rows - 1, 0)[1] - padY
  return [ln([x0, y0], [x0, y1], ROLE.reference, 0.05), ln([x0, y0], [x0 + tip, y0], ROLE.reference, 0.05), ln([x0, y1], [x0 + tip, y1], ROLE.reference, 0.05), ln([x1, y0], [x1, y1], ROLE.reference, 0.05), ln([x1, y0], [x1 - tip, y0], ROLE.reference, 0.05), ln([x1, y1], [x1 - tip, y1], ROLE.reference, 0.05)]
}
export function matrix(m: MSpec, vals: ReadonlyArray<readonly number[]>, colorOf: (i: number, j: number, v: number) => string = () => ROLE.ink, padX = 0.5): SceneObject[] {
  return [...brackets(m, padX), ...vals.flatMap((row, i) => row.map((v, j) => lb(num(v), mAt(m, i, j), colorOf(i, j, v))))]
}

// ── 1. Augmented matrix ──────────────────────────────────────────────────────

/** x + y = 3 and x − y = 1 as [A | b] = [[1, 1 | 3], [1, −1 | 1]]; the row operation R₂ − R₁ gives [[1, 1 | 3], [0, −2 | −2]], the same solution (x, y) = (2, 1). */
export const AUG = {
  m1: { cx: 1.5, cy: 1.5, dx: 0.95, dy: 0.8, rows: 2, cols: 3 } as MSpec,
  m2: { cx: 1.5, cy: -1.4, dx: 0.95, dy: 0.8, rows: 2, cols: 3 } as MSpec,
  M1: [[1, 1, 3], [1, -1, 1]] as ReadonlyArray<readonly number[]>,
  M2: [[1, 1, 3], [0, -2, -2]] as ReadonlyArray<readonly number[]>,
  eqX: -3.3,
}
/** Where the vertical bar of [A | b] runs: between column 2 and column 3. */
export const augBar = (m: MSpec): readonly [Pt, Pt] => { const x = mAt(m, 0, 1)[0] + m.dx / 2; return [[x, mAt(m, 0, 0)[1] + 0.42], [x, mAt(m, m.rows - 1, 0)[1] - 0.42]] }

/** KG: the matrix [A|b] formed by appending the right-hand side b to the coefficient matrix A; row operations preserve the solution set. */
export function buildAugmentedMatrixScene(): SceneSpec {
  return framed(raw_buildAugmentedMatrixScene())
}
function raw_buildAugmentedMatrixScene(): SceneSpec {
  const aug = (m: MSpec, vals: ReadonlyArray<readonly number[]>): SceneObject[] => [...matrix(m, vals, (_i, j) => (j === 2 ? ROLE.result : ROLE.ink)), ln(augBar(m)[0], augBar(m)[1], ROLE.aid, 0.04)]
  return {
    id: 'math-augmented-matrix',
    title: 'The augmented matrix [A | b]',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the augmented matrix of a linear system. The system x + y = 3, x − y = 1 has coefficient matrix A = [[1, 1], [1, −1]] and right-hand side b = (3, 1); writing b as an extra column after a vertical bar gives [A | b] = [[1, 1 | 3], [1, −1 | 1]] (the b column is green), one row per equation. Row operations on [A | b] do not change the solution set: subtracting row 1 from row 2 (R₂ − R₁) gives [[1, 1 | 3], [0, −2 | −2]], whose second row says −2y = −2, so y = 1, and then x + 1 = 3 gives x = 2: the solution (x, y) = (2, 1) satisfies both original equations (2 + 1 = 3 and 2 − 1 = 1).',
    ariaLabel:
      'In the first step the two equations x plus y equals 3 and x minus y equals 1 are written one above the other. In the second step the matrix 1 1 bar 3 over 1 minus 1 bar 1 appears beside them, with a violet vertical bar before the green right-hand side column. In the third step an arrow labelled R2 minus R1 leads to a second matrix 1 1 bar 3 over 0 minus 2 bar minus 2, and the caption (x, y) equals (2, 1) appears.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A linear system: x + y = 3 and x − y = 1 — one equation per row.', objects: [lb('system', [AUG.eqX, 2.7], ROLE.ink), lb('x + y = 3', [AUG.eqX, mAt(AUG.m1, 0, 0)[1]]), lb('x − y = 1', [AUG.eqX, mAt(AUG.m1, 1, 0)[1]])] },
      { narration: 'Write the coefficients as a matrix and the right-hand sides b as one extra column after a bar: the augmented matrix [A | b]. Row 1 is x + y = 3, row 2 is x − y = 1.', objects: [...aug(AUG.m1, AUG.M1), lb('[A | b]', [AUG.m1.cx, 2.7], ROLE.aid)] },
      { narration: 'Row operations keep the solution set. R₂ − R₁ turns the second row into 0, −2 | −2, i.e. −2y = −2, so y = 1, and then x = 3 − 1 = 2: the solution is (x, y) = (2, 1).', objects: [ar([AUG.m1.cx, 0.5], [AUG.m1.cx, -0.4], ROLE.aid), lb('R₂ − R₁', [3.9, 0.05], ROLE.aid), ...aug(AUG.m2, AUG.M2), lb('(x, y) = (2, 1)', [AUG.eqX, mAt(AUG.m2, 0, 0)[1] - 0.4], ROLE.result)] },
    ],
  }
}

// ── 2. Rank ──────────────────────────────────────────────────────────────────

/** [[1, 2, 3], [2, 4, 6], [1, 0, 1]]: row 2 = 2 × row 1, so row reduction leaves two pivots (1 and −2) and a zero row: rank 2. */
export const RNK = {
  mA: { cx: -3.1, cy: 0.5, dx: 0.95, dy: 0.8, rows: 3, cols: 3 } as MSpec,
  mR: { cx: 2.7, cy: 0.5, dx: 0.95, dy: 0.8, rows: 3, cols: 3 } as MSpec,
  A: [[1, 2, 3], [2, 4, 6], [1, 0, 1]] as ReadonlyArray<readonly number[]>,
  REF: [[1, 2, 3], [0, -2, -2], [0, 0, 0]] as ReadonlyArray<readonly number[]>,
  pivots: [[0, 0], [1, 1]] as ReadonlyArray<readonly [number, number]>,
}

/** KG: the rank is the number of pivots in the row echelon form; it equals the dimension of the column space and of the row space. */
export function buildRankScene(): SceneSpec {
  return framed(raw_buildRankScene())
}
function raw_buildRankScene(): SceneSpec {
  const isPivot = (i: number, j: number) => RNK.pivots.some(([a, b]) => a === i && b === j)
  return {
    id: 'math-rank',
    title: 'Rank: the number of pivots',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show rank as the number of pivots after row reduction. The matrix [[1, 2, 3], [2, 4, 6], [1, 0, 1]] has row 2 = 2 × row 1 (the two red rows are multiples of each other, so row 2 adds nothing new). Row reduction (R₂ − 2R₁ gives 0 0 0, R₃ − R₁ gives 0 −2 −2, then swap) reaches the echelon form [[1, 2, 3], [0, −2, −2], [0, 0, 0]]: the pivots are the 1 in row 1 and the −2 in row 2 (green), the last row is all zeros. Two pivots mean rank = 2: only two of the three rows (and of the three columns) are independent, so the rank is less than 3.',
    ariaLabel:
      'A 3 by 3 matrix with rows 1 2 3, 2 4 6 and 1 0 1; the first two rows are red and the caption row 2 equals 2 times row 1. In the second step an arrow labelled row reduce leads to the echelon matrix 1 2 3, 0 minus 2 minus 2, 0 0 0 with the pivots 1 and minus 2 in green and the zero row in grey. In the third step the captions 2 pivots and rank equals 2 appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A 3 × 3 matrix. Notice row 2 = 2 × row 1 (the two red rows): row 2 brings no new information.', objects: [...matrix(RNK.mA, RNK.A, (i) => (i < 2 ? ROLE.input : ROLE.ink)), lb('row 2 = 2 × row 1', [RNK.mA.cx, -1.4], ROLE.input)] },
      { narration: 'Row reduce to echelon form: row 2 becomes 0 0 0 (R₂ − 2R₁), row 3 becomes 0 −2 −2 (R₃ − R₁), then swap them. The pivots are 1 and −2 (green); the last row is all zeros.', objects: [ar([-1.3, 0.5], [0.7, 0.5], ROLE.aid), lb('row reduce', [-0.3, 1.1], ROLE.aid), ...matrix(RNK.mR, RNK.REF, (i, j) => (isPivot(i, j) ? ROLE.result : i === 2 ? ROLE.reference : ROLE.ink))] },
      { narration: 'Count the pivots: 2. So rank = 2 — less than the 3 rows, because one row was a multiple of another.', objects: [lb('2 pivots', [RNK.mR.cx, -1.4], ROLE.result), lb('rank = 2', [RNK.mR.cx, -2.2], ROLE.result)] },
    ],
  }
}

// ── 3. Matrix inverse ────────────────────────────────────────────────────────

/** A = [[2, 1], [1, 1]] has det A = 2 × 1 − 1 × 1 = 1 ≠ 0, so A⁻¹ = [[1, −1], [−1, 2]] exists and A A⁻¹ = I. */
export const INV = {
  cx: [-3.1, -0.3, 2.5] as readonly number[], cy: 0.3, dx: 0.8, dy: 0.8,
  A: [[2, 1], [1, 1]] as ReadonlyArray<readonly number[]>,
  Ainv: [[1, -1], [-1, 2]] as ReadonlyArray<readonly number[]>,
  I: [[1, 0], [0, 1]] as ReadonlyArray<readonly number[]>,
}
export const invSpec = (k: number): MSpec => ({ cx: INV.cx[k], cy: INV.cy, dx: INV.dx, dy: INV.dy, rows: 2, cols: 2 })

/** KG: A is invertible iff det(A) ≠ 0; the inverse satisfies A A⁻¹ = A⁻¹ A = I. */
export function buildMatrixInverseScene(): SceneSpec {
  return framed(raw_buildMatrixInverseScene())
}
function raw_buildMatrixInverseScene(): SceneSpec {
  return {
    id: 'math-matrix-inverse',
    title: 'The inverse matrix: A A⁻¹ = I',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the matrix inverse. A = [[2, 1], [1, 1]] has determinant det A = 2 × 1 − 1 × 1 = 1, which is not 0, so A is invertible. Its inverse is A⁻¹ = [[1, −1], [−1, 2]] (blue), and multiplying them gives the identity matrix: A A⁻¹ = [[2·1 + 1·(−1), 2·(−1) + 1·2], [1·1 + 1·(−1), 1·(−1) + 1·2]] = [[1, 0], [0, 1]] = I (green ones on the diagonal). The inverse undoes A, and a square matrix with det A = 0 has no inverse.',
    ariaLabel:
      'In the first step the matrix 2 1 over 1 1 labelled A, with the captions det A equals 1 and invertible. In the second step a times sign and the blue matrix 1 minus 1 over minus 1 2 labelled A inverse. In the third step an equals sign and the identity matrix 1 0 over 0 1 labelled I, with the caption A A inverse equals I.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A = [[2, 1], [1, 1]]. Its determinant is 2 × 1 − 1 × 1 = 1, not 0, so A is invertible.', objects: [...matrix(invSpec(0), INV.A), lb('A', [INV.cx[0], -1.1], ROLE.ink), lb('det A = 1', [INV.cx[0], 2.0], ROLE.result), lb('invertible', [INV.cx[0], 2.8], ROLE.result)] },
      { narration: 'Its inverse A⁻¹ = [[1, −1], [−1, 2]] (blue).', objects: [lb('×', [(INV.cx[0] + INV.cx[1]) / 2, INV.cy]), ...matrix(invSpec(1), INV.Ainv, () => ROLE.output), lb('A⁻¹', [INV.cx[1], -1.1], ROLE.output)] },
      { narration: 'Multiply them: the product is the identity matrix I — ones on the diagonal, zeros elsewhere. A⁻¹ undoes A.', objects: [lb('=', [(INV.cx[1] + INV.cx[2]) / 2, INV.cy]), ...matrix(invSpec(2), INV.I, (i, j) => (i === j ? ROLE.result : ROLE.reference)), lb('I', [INV.cx[2], -1.1], ROLE.result), lb('A A⁻¹ = I', [INV.cx[1], -2.2], ROLE.result)] },
    ],
  }
}

// ── 4. Vector space ──────────────────────────────────────────────────────────

/** ℝ²: u = (1, 2) and v = (2, 1) add to u + v = (3, 3), scale to 2u = (2, 4) and −u = (−1, −2); every result is again a vector of the plane. */
export const VSP = { o: [-0.5, -0.6] as Pt, s: 0.8, u: [1, 2] as readonly [number, number], v: [2, 1] as readonly [number, number] }
export const vspTip = (w: readonly [number, number]): Pt => vec(VSP.o, VSP.s, w)

/** KG: a vector space is closed under vector addition and scalar multiplication (and has 0 and additive inverses). */
export function buildVectorSpaceScene(): SceneSpec {
  return framed(raw_buildVectorSpaceScene())
}
function raw_buildVectorSpaceScene(): SceneSpec {
  const o = VSP.o
  const u = VSP.u, v = VSP.v, sum: readonly [number, number] = [u[0] + v[0], u[1] + v[1]]
  return {
    id: 'math-vector-space',
    title: 'A vector space is closed under + and scalars',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the idea of a vector space with the plane ℝ². It contains the zero vector 0 (the origin), and from any vectors in it we can only produce more vectors in it. Take u = (1, 2) and v = (2, 1): the sum u + v = (3, 3) is the diagonal of the parallelogram built on u and v, again in the plane (closure under addition). Scaling stays inside too: 2u = (2, 4) is u doubled and −u = (−1, −2) is u reversed, with u + (−u) = 0 (violet). A vector space is any set where addition and scalar multiplication behave like this and obey the eight axioms; ℝⁿ, polynomials and functions are all examples.',
    ariaLabel:
      'A plane with two grey axes meeting at the zero vector. In the first step a red arrow u and a blue arrow v start at the origin. In the second step dashed violet sides complete a parallelogram and a green arrow u plus v runs to its far corner with the caption closed under addition. In the third step a violet arrow 2u twice as long as u, and a violet arrow minus u pointing the opposite way, with the caption closed under scalars.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The plane ℝ² with its zero vector 0 at the origin, and two vectors u = (1, 2) (red) and v = (2, 1) (blue).', objects: [ar([o[0] - 3.9, o[1]], [o[0] + 4.0, o[1]]), ar([o[0], o[1] - 2.3], [o[0], o[1] + 3.6]), lb('V = ℝ²', [3.3, 2.7], ROLE.ink), lb('0', [o[0] - 0.3, o[1] - 0.3]), ar(o, vspTip(u), ROLE.input), lb('u', [vspTip(u)[0] - 0.3, vspTip(u)[1] + 0.2], ROLE.input), ar(o, vspTip(v), ROLE.output), lb('v', [vspTip(v)[0] + 0.3, vspTip(v)[1] + 0.2], ROLE.output)] },
      { narration: 'Add them: u + v = (3, 3) is the far corner of the parallelogram on u and v (green) — the sum of two vectors of V is again in V.', objects: [ln(vspTip(u), vspTip(sum), ROLE.aid, 0.03), ln(vspTip(v), vspTip(sum), ROLE.aid, 0.03), ar(o, vspTip(sum), ROLE.result), lb('u + v', [vspTip(sum)[0] + 0.6, vspTip(sum)[1] + 0.1], ROLE.result), lb('closed under addition', [2.6, -1.7], ROLE.result)] },
      { narration: 'Scale u: 2u = (2, 4) is twice as long and −u = (−1, −2) points the opposite way (violet). Scalar multiples stay in V, and u + (−u) = 0.', objects: [ar(o, vspTip([2 * u[0], 2 * u[1]]), ROLE.aid), lb('2u', [vspTip([2 * u[0], 2 * u[1]])[0] - 0.4, vspTip([2 * u[0], 2 * u[1]])[1] + 0.1], ROLE.aid), ar(o, vspTip([-u[0], -u[1]]), ROLE.aid), lb('−u', [vspTip([-u[0], -u[1]])[0] - 0.4, vspTip([-u[0], -u[1]])[1] - 0.1], ROLE.aid), lb('closed under scalars', [2.6, -2.5], ROLE.aid)] },
    ],
  }
}

// ── 5. Dimension ─────────────────────────────────────────────────────────────

/** ℝ² has the basis e₁, e₂ (2 vectors: dim 2); the line U = span{(2, 1)} has a 1-vector basis (dim 1); U⊥ = span{(−1, 2)} has dim 1; 1 + 1 = 2. */
export const DIM = { o: [-1.3, -0.3] as Pt, s: 1.2, u: [2, 1] as readonly [number, number], w: [-1, 2] as readonly [number, number] }
export const dimTip = (v: readonly [number, number]): Pt => vec(DIM.o, DIM.s, v)

/** KG: the dimension is the number of vectors in any basis; dim(ℝⁿ) = n; dim U + dim U⊥ = dim V. */
export function buildDimensionScene(): SceneSpec {
  return framed(raw_buildDimensionScene())
}
function raw_buildDimensionScene(): SceneSpec {
  const o = DIM.o
  return {
    id: 'math-dimension',
    title: 'Dimension counts the vectors in a basis',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that dimension is the number of vectors in a basis. The plane ℝ² has the basis e₁ = (1, 0), e₂ = (0, 1): 2 vectors, so dim ℝ² = 2. The line U through the origin in the direction u = (2, 1) is spanned by the single vector u: a basis with 1 vector, so dim U = 1. The line U⊥ perpendicular to it (direction w = (−1, 2), since 2 × (−1) + 1 × 2 = 0) is also spanned by one vector, dim U⊥ = 1, and the two dimensions add up to the dimension of the whole plane: dim U + dim U⊥ = 1 + 1 = 2 = dim ℝ².',
    ariaLabel:
      'In the first step a plane with two grey axes and two red unit arrows e1 and e2 along them, with the caption dim R2 equals 2. In the second step a blue line through the origin with one blue arrow u along it and the caption dim U equals 1. In the third step a green line perpendicular to it with one green arrow w, a right-angle mark at the origin, and the captions dim U perp equals 1 and 1 plus 1 equals 2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The plane ℝ² is spanned by the 2 basis vectors e₁ and e₂ (red), so dim ℝ² = 2.', objects: [ar([o[0] - 3.4, o[1]], [o[0] + 4.3, o[1]]), ar([o[0], o[1] - 2.6], [o[0], o[1] + 3.3]), ar(o, dimTip([1, 0]), ROLE.input), lb('e₁', [dimTip([1, 0])[0] + 0.1, o[1] - 0.5], ROLE.input), ar(o, dimTip([0, 1]), ROLE.input), lb('e₂', [o[0] + 0.5, dimTip([0, 1])[1] + 0.1], ROLE.input), lb('dim ℝ² = 2', [3.3, 1.6], ROLE.input)] },
      { narration: 'A line U through the origin is spanned by ONE vector u = (2, 1) (blue): a basis with 1 vector, so dim U = 1.', objects: [ln(dimTip([-2.8, -1.4]), dimTip([2.4, 1.2]), ROLE.output, 0.04), ar(o, dimTip(DIM.u), ROLE.output), lb('u', [dimTip(DIM.u)[0] + 0.3, dimTip(DIM.u)[1] - 0.3], ROLE.output), lb('dim U = 1', [3.3, 0.6], ROLE.output)] },
      { narration: 'The perpendicular line U⊥ is spanned by one vector w = (−1, 2) (green): dim U⊥ = 1. Together 1 + 1 = 2 = dim ℝ².', objects: [ln(dimTip([-1, 2]), dimTip([1, -2]), ROLE.result, 0.04), ar(o, dimTip(DIM.w), ROLE.result), lb('w', [dimTip(DIM.w)[0] - 0.4, dimTip(DIM.w)[1] + 0.1], ROLE.result), ...rightAngleMark(o[0], o[1], [2 / Math.sqrt(5), 1 / Math.sqrt(5)], [-1 / Math.sqrt(5), 2 / Math.sqrt(5)], 0.35, ROLE.aid), lb('dim U⊥ = 1', [3.3, -0.4], ROLE.result), lb('1 + 1 = 2', [3.3, -1.4], ROLE.ink)] },
    ],
  }
}

// ── 6. Matrix representation of a linear map ─────────────────────────────────

/** T(e₁) = (1, 1), T(e₂) = (−1, 1): the columns of A = [[1, −1], [1, 1]]. For v = (2, 1): T(v) = 2 T(e₁) + 1 T(e₂) = (1, 3) = A v. */
export const REP = { o: [-1.9, -0.5] as Pt, s: 0.8, A: [[1, -1], [1, 1]] as ReadonlyArray<readonly number[]>, v: [2, 1] as readonly [number, number], m: { cx: 3.1, cy: 0.8, dx: 1.0, dy: 0.8, rows: 2, cols: 2 } as MSpec }
export const repTip = (w: readonly [number, number]): Pt => vec(REP.o, REP.s, w)

/** KG: the columns of the matrix of T are the images T(bⱼ) of the basis vectors, so Av = T(v). */
export function buildMatrixRepresentationScene(): SceneSpec {
  return framed(raw_buildMatrixRepresentationScene())
}
function raw_buildMatrixRepresentationScene(): SceneSpec {
  const o = REP.o
  const col = (j: number) => (j === 0 ? ROLE.input : ROLE.output)
  const tv: readonly [number, number] = [REP.v[0] * REP.A[0][0] + REP.v[1] * REP.A[0][1], REP.v[0] * REP.A[1][0] + REP.v[1] * REP.A[1][1]]
  return {
    id: 'math-matrix-representation',
    title: 'The columns of the matrix are the images of the basis',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how a linear map T of the plane is written as a matrix. T sends the basis vector e₁ = (1, 0) to T(e₁) = (1, 1) (red) and e₂ = (0, 1) to T(e₂) = (−1, 1) (blue); the matrix A = [[1, −1], [1, 1]] simply stores these two images as its columns. Because T is linear, everything else follows: for v = (2, 1) = 2e₁ + 1e₂ we get T(v) = 2 T(e₁) + 1 T(e₂) = 2 (1, 1) + (−1, 1) = (1, 3), which is exactly the matrix times the vector, A v = (1, 3) (green).',
    ariaLabel:
      'A plane with two grey unit arrows e1 and e2, and the matrix 1 minus 1 over 1 1 at the right. In the second step a red arrow T of e1 to (1, 1) and a blue arrow T of e2 to (minus 1, 1) are drawn, and the first column of the matrix turns red and the second blue. In the third step a grey arrow v to (2, 1) and a green arrow T of v to (1, 3) appear with the captions v equals (2, 1) and T of v equals (1, 3).',
    stage: NO_STAGE,
    steps: [
      { narration: 'The plane with the basis e₁ = (1, 0) and e₂ = (0, 1) (grey), and a 2 × 2 matrix A at the right whose columns (red, blue) will turn out to be the images of e₁ and e₂.', objects: [ar(o, repTip([1, 0]), ROLE.reference), lb('e₁', [repTip([1, 0])[0] + 0.1, o[1] - 0.4]), ar(o, repTip([0, 1]), ROLE.reference), lb('e₂', [o[0] - 0.4, repTip([0, 1])[1] + 0.1]), ...matrix(REP.m, REP.A, (_i, j) => col(j)), lb('A', [REP.m.cx, 2.0])] },
      { narration: 'T sends e₁ to (1, 1) (red) and e₂ to (−1, 1) (blue). Those two images are the columns of A.', objects: [ar(o, repTip([1, 1]), ROLE.input), lb('T(e₁)', [repTip([1, 1])[0] + 0.7, repTip([1, 1])[1] + 0.1], ROLE.input), ar(o, repTip([-1, 1]), ROLE.output), lb('T(e₂)', [repTip([-1, 1])[0] - 0.7, repTip([-1, 1])[1] + 0.1], ROLE.output), lb('columns of A', [REP.m.cx, -0.4], ROLE.ink)] },
      { narration: 'Take v = (2, 1) = 2e₁ + 1e₂ (grey). Linearity gives T(v) = 2 T(e₁) + 1 T(e₂) = (1, 3) (green) — the same as A v.', objects: [ar(o, repTip(REP.v), ROLE.reference), lb('v', [repTip(REP.v)[0] + 0.4, repTip(REP.v)[1] - 0.2]), ar(o, repTip(tv), ROLE.result), lb('T(v)', [repTip(tv)[0] + 0.7, repTip(tv)[1]], ROLE.result), lb('v = (2, 1)', [REP.m.cx, -1.2], ROLE.ink), lb('T(v) = (1, 3)', [REP.m.cx, -2.0], ROLE.result)] },
    ],
  }
}

// ── 7. Diagonalization ───────────────────────────────────────────────────────

/** A = [[3, 1], [0, 2]]: A (1, 0) = 3 (1, 0) and A (1, −1) = 2 (1, −1); P = [[1, 1], [0, −1]], D = diag(3, 2) and A = P D P⁻¹. */
export const DGN = {
  o: [-2.6, 0.5] as Pt, s: 0.9,
  A: [[3, 1], [0, 2]] as ReadonlyArray<readonly number[]>,
  D: [[3, 0], [0, 2]] as ReadonlyArray<readonly number[]>,
  v1: [1, 0] as readonly [number, number], v2: [1, -1] as readonly [number, number],
  mA: { cx: 3.2, cy: 1.6, dx: 0.9, dy: 0.8, rows: 2, cols: 2 } as MSpec,
  mD: { cx: 3.2, cy: -1.7, dx: 0.9, dy: 0.8, rows: 2, cols: 2 } as MSpec,
}
export const dgnTip = (w: readonly [number, number]): Pt => vec(DGN.o, DGN.s, w)

/** KG: A is diagonalizable when it has n independent eigenvectors; then A = P D P⁻¹ with D = diag(λ₁, …, λₙ). */
export function buildDiagonalizationScene(): SceneSpec {
  return framed(raw_buildDiagonalizationScene())
}
function raw_buildDiagonalizationScene(): SceneSpec {
  const o = DGN.o
  const img1: readonly [number, number] = [3 * DGN.v1[0], 3 * DGN.v1[1]], img2: readonly [number, number] = [2 * DGN.v2[0], 2 * DGN.v2[1]]
  return {
    id: 'math-diagonalization',
    title: 'Diagonalization: stretch along the eigenvectors',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show diagonalization for A = [[3, 1], [0, 2]]. It has two independent eigenvector directions: v₁ = (1, 0) and v₂ = (1, −1) (red). A only stretches them: A v₁ = (3, 0) = 3 v₁ (blue, three times as long) and A v₂ = (2, −2) = 2 v₂ (blue, twice as long), so the eigenvalues are 3 and 2. Using the eigenvectors as the columns of P = [[1, 1], [0, −1]], the matrix becomes diagonal in that basis: D = diag(3, 2) = [[3, 0], [0, 2]] and A = P D P⁻¹, which also gives powers easily: Aᵏ = P Dᵏ P⁻¹.',
    ariaLabel:
      'In the first step two red arrows v1 along the horizontal and v2 pointing down and to the right, and the matrix 3 1 over 0 2 labelled A. In the second step two longer blue arrows along the same directions: A v1 three times as long as v1 and A v2 twice as long as v2, labelled times 3 and times 2. In the third step the diagonal matrix 3 0 over 0 2 labelled D and the caption A equals P D P inverse.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A = [[3, 1], [0, 2]] and two special directions, the eigenvectors v₁ = (1, 0) and v₂ = (1, −1) (red).', objects: [dt(o, ROLE.ink, 0.1), ar(o, dgnTip(DGN.v1), ROLE.input), lb('v₁', [dgnTip(DGN.v1)[0] - 0.1, o[1] + 0.5], ROLE.input), ar(o, dgnTip(DGN.v2), ROLE.input), lb('v₂', [dgnTip(DGN.v2)[0] - 0.55, dgnTip(DGN.v2)[1] - 0.2], ROLE.input), ...matrix(DGN.mA, DGN.A), lb('A', [DGN.mA.cx, 2.7])] },
      { narration: 'A does not turn them, it only stretches: A v₁ = (3, 0) is 3 times v₁ and A v₂ = (2, −2) is 2 times v₂ (blue). The stretch factors 3 and 2 are the eigenvalues.', objects: [ar(dgnTip(DGN.v1), dgnTip(img1), ROLE.output), lb('×3', [dgnTip(img1)[0], o[1] + 0.5], ROLE.output), ar(dgnTip(DGN.v2), dgnTip(img2), ROLE.output), lb('×2', [dgnTip(img2)[0] + 0.5, dgnTip(img2)[1] - 0.2], ROLE.output)] },
      { narration: 'In the basis of eigenvectors A is just the diagonal matrix D = diag(3, 2): A = P D P⁻¹, where the columns of P are v₁ and v₂.', objects: [...matrix(DGN.mD, DGN.D, (i, j) => (i === j ? ROLE.result : ROLE.reference)), lb('D', [DGN.mD.cx, -0.5], ROLE.result), lb('A = P D P⁻¹', [DGN.mD.cx, -2.9], ROLE.result)] },
    ],
  }
}

// ── 8. Spectral theorem ──────────────────────────────────────────────────────

/** The symmetric A = [[2, 1], [1, 2]] has the orthogonal eigenvectors (1, 1)/√2 (λ = 3) and (1, −1)/√2 (λ = 1); it maps the unit circle to an ellipse with semi-axes 3 and 1 along them. */
export const SPT = { c: [-1.5, 0.1] as Pt, s: 0.85, A: [[2, 1], [1, 2]] as ReadonlyArray<readonly number[]>, m: { cx: 3.5, cy: 0.9, dx: 0.8, dy: 0.8, rows: 2, cols: 2 } as MSpec }
export const sptDir1: [number, number] = [Math.SQRT1_2, Math.SQRT1_2]
export const sptDir2: [number, number] = [Math.SQRT1_2, -Math.SQRT1_2]
export const sptCircle = (t: number): Pt => [SPT.c[0] + SPT.s * Math.cos(t), SPT.c[1] + SPT.s * Math.sin(t)]
export const sptEllipse = (t: number): Pt => [SPT.c[0] + SPT.s * (SPT.A[0][0] * Math.cos(t) + SPT.A[0][1] * Math.sin(t)), SPT.c[1] + SPT.s * (SPT.A[1][0] * Math.cos(t) + SPT.A[1][1] * Math.sin(t))]
const sptCurve = (f: (t: number) => Pt, color: string): SceneObject => curve(Array.from({ length: 73 }, (_, k) => pp(f((2 * Math.PI * k) / 72))), color)

/** KG: a real symmetric matrix is orthogonally diagonalizable, A = QΛQᵀ, with real eigenvalues and orthogonal eigenvectors. */
export function buildSpectralTheoremScene(): SceneSpec {
  return framed(raw_buildSpectralTheoremScene())
}
function raw_buildSpectralTheoremScene(): SceneSpec {
  const c = SPT.c
  const e1 = vec(c, SPT.s, sptDir1), e2 = vec(c, SPT.s, sptDir2)
  return {
    id: 'math-spectral-theorem',
    title: 'Spectral theorem: orthogonal eigen-directions',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the spectral theorem for the symmetric matrix A = [[2, 1], [1, 2]] (the entry in row 1, column 2 equals the entry in row 2, column 1). Its eigenvectors v₁ = (1, 1)/√2 (red, eigenvalue 3) and v₂ = (1, −1)/√2 (blue, eigenvalue 1) are perpendicular (right-angle mark): v₁ · v₂ = (1 × 1 + 1 × (−1))/2 = 0. A applied to the unit circle (grey) gives an ellipse (green) whose axes lie exactly along these two orthogonal directions: it is stretched 3 times along v₁ and 1 time (unchanged) along v₂. This is A = Q Λ Qᵀ, with Q the orthogonal matrix of the eigenvectors and Λ = diag(3, 1).',
    ariaLabel:
      'In the first step a grey unit circle with two perpendicular arrows from its centre, a red one pointing up and to the right and a blue one pointing down and to the right, with a right-angle mark, and the symmetric matrix 2 1 over 1 2 at the right. In the second step a green ellipse, long along the red arrow and as narrow as the circle along the blue arrow. In the third step the captions times 3 along the red direction, times 1 along the blue direction and A equals Q lambda Q transpose appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The symmetric matrix A = [[2, 1], [1, 2]] and its two eigen-directions v₁ = (1, 1)/√2 (red) and v₂ = (1, −1)/√2 (blue) on the unit circle — they are perpendicular.', objects: [sptCurve(sptCircle, ROLE.reference), ar(c, e1, ROLE.input), lb('v₁', [e1[0] + 0.15, e1[1] + 0.35], ROLE.input), ar(c, e2, ROLE.output), lb('v₂', [e2[0] + 0.3, e2[1] - 0.3], ROLE.output), ...rightAngleMark(c[0], c[1], sptDir1, sptDir2, 0.3, ROLE.aid), ...matrix(SPT.m, SPT.A), lb('A', [SPT.m.cx, 2.0]), lb('symmetric', [SPT.m.cx, -0.5], ROLE.aid)] },
      { narration: 'A maps the circle to an ellipse (green). Its long and short axes lie exactly along v₁ and v₂.', objects: [sptCurve(sptEllipse, ROLE.result)] },
      { narration: 'A stretches by 3 along v₁ and by 1 (not at all) along v₂: eigenvalues 3 and 1, real, with orthogonal eigenvectors. In matrix form A = Q Λ Qᵀ.', objects: [lb('×3', [c[0] + 2.3, c[1] + 2.25], ROLE.input), lb('×1', [c[0] - 0.95, c[1] + 0.95], ROLE.output), lb('A = Q Λ Qᵀ', [SPT.m.cx, -1.4], ROLE.result)] },
    ],
  }
}

// ── 9. Inner product ─────────────────────────────────────────────────────────

/** u = (3, 1), v = (1, 2): u · v = 3 × 1 + 1 × 2 = 5 = |u||v| cos θ with θ = 45°; the projection of v on u is (u · v / u · u) u = 0.5 u = (1.5, 0.5). */
export const INP = { o: [-3.2, -1.4] as Pt, s: 1.0, u: [3, 1] as readonly [number, number], v: [1, 2] as readonly [number, number], arcR: 1.1 }
export const inpTip = (w: readonly [number, number]): Pt => vec(INP.o, INP.s, w)

/** KG: the inner product generalizes the dot product; it measures length and angle: u · v = |u||v| cos θ. */
export function buildInnerProductScene(): SceneSpec {
  return framed(raw_buildInnerProductScene())
}
function raw_buildInnerProductScene(): SceneSpec {
  const o = INP.o, u = INP.u, v = INP.v
  const foot = inpTip([1.5, 0.5])
  const a0 = (Math.atan2(u[1], u[0]) * 180) / Math.PI, a1 = (Math.atan2(v[1], v[0]) * 180) / Math.PI
  const dU: [number, number] = [-u[0] / Math.hypot(u[0], u[1]), -u[1] / Math.hypot(u[0], u[1])]
  const dV: [number, number] = [(inpTip(v)[0] - foot[0]) / Math.hypot(inpTip(v)[0] - foot[0], inpTip(v)[1] - foot[1]), (inpTip(v)[1] - foot[1]) / Math.hypot(inpTip(v)[0] - foot[0], inpTip(v)[1] - foot[1])]
  return {
    id: 'math-inner-product',
    title: 'The inner product measures length and angle',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the inner product u · v = 5 for u = (3, 1) and v = (1, 2), computed from the components: 3 × 1 = 3, 1 × 2 = 2, and 3 + 2 = 5. It also equals |u||v| cos θ: |u| = √10 and |v| = √5, and the angle θ between the arrows is 45° (u points 18.4° above the horizontal and v 63.4°), so √10 × √5 × cos 45° = 5 as well. Geometrically, dropping a perpendicular from the tip of v onto the line of u (violet, right-angle mark) lands at (1.5, 0.5) = 0.5 u: the inner product is the length of u times the length of that shadow, and the same formula, with a general inner product, defines length |v| = √⟨v, v⟩ and angle in any vector space.',
    ariaLabel:
      'Two arrows from the same point: a red arrow u to (3, 1) and a blue arrow v to (1, 2), with the captions u equals (3, 1) and v equals (1, 2). In the second step a green arc marks the angle theta equals 45 degrees between them, and the captions 3 times 1 equals 3, 1 times 2 equals 2, 3 plus 2 equals 5 and u dot v equals 5. In the third step a violet perpendicular from the tip of v to the line of u with a right-angle mark and a green dot where it lands, labelled projection of v on u.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Two vectors from the same point: u = (3, 1) (red) and v = (1, 2) (blue).', objects: [ar(o, inpTip(u), ROLE.input), lb('u', [inpTip(u)[0] + 0.3, inpTip(u)[1] - 0.25], ROLE.input), ar(o, inpTip(v), ROLE.output), lb('v', [inpTip(v)[0] - 0.1, inpTip(v)[1] + 0.35], ROLE.output), lb('u = (3, 1)', [2.4, 1.9], ROLE.input), lb('v = (1, 2)', [2.4, 1.2], ROLE.output)] },
      { narration: 'The angle between them is 45° (green arc). Multiply matching components and add: 3 × 1 = 3, 1 × 2 = 2, and 3 + 2 = 5, so u · v = 5 = |u||v| cos θ.', objects: [curve(arcPts(o[0], o[1], INP.arcR, a0, a1, 12), ROLE.result), lb('θ = 45°', [o[0] + 2.4 * Math.cos(((a0 + a1) / 2 * Math.PI) / 180), o[1] + 2.4 * Math.sin(((a0 + a1) / 2 * Math.PI) / 180)], ROLE.result), lb('3 × 1 = 3', [2.4, 0.4]), lb('1 × 2 = 2', [2.4, -0.3]), lb('3 + 2 = 5', [2.4, -1.0], ROLE.result), lb('u · v = 5', [2.4, -1.8], ROLE.result)] },
      { narration: 'Drop a perpendicular from the tip of v onto the line of u (violet): it lands at 0.5 u = (1.5, 0.5). The inner product is |u| times the length of this shadow of v.', objects: [ln(inpTip(v), foot, ROLE.aid, 0.04), dt(foot, ROLE.result, 0.14), ...rightAngleMark(foot[0], foot[1], dU, dV, 0.3, ROLE.aid), lb('projection of v on u', [2.0, -2.6], ROLE.aid)] },
    ],
  }
}

// ── 10. Inner-product space (Cauchy–Schwarz) ─────────────────────────────────

/** u = (3, 4), v = (4, 3): ⟨u, v⟩ = 24 and |u||v| = 5 × 5 = 25, so |⟨u, v⟩| ≤ |u||v|; for v = 2u = (6, 8) the two sides are equal (50 = 50). */
export const IPS = {
  o: [-3.4, -1.2] as Pt, s: 0.45, u: [3, 4] as readonly [number, number], v: [4, 3] as readonly [number, number], v2: [6, 8] as readonly [number, number],
  barX: 0.9, barMax: 3.5,
  rows: { A: [1.5, 0.8], B: [-0.8, -1.5] } as Record<'A' | 'B', readonly [number, number]>,
}
export const ipsTip = (w: readonly [number, number]): Pt => vec(IPS.o, IPS.s, w)
export const ipsBarLen = (value: number, max: number) => (value / max) * IPS.barMax

/** KG: in an inner product space the Cauchy–Schwarz inequality |⟨u, v⟩| ≤ |u||v| holds, with equality exactly when u and v are parallel. */
export function buildInnerProductSpaceScene(): SceneSpec {
  return framed(raw_buildInnerProductSpaceScene())
}
function raw_buildInnerProductSpaceScene(): SceneSpec {
  const o = IPS.o
  const bar = (row: readonly [number, number], lenTop: number, lenBottom: number): SceneObject[] => [ln([IPS.barX, row[0]], [IPS.barX + lenTop, row[0]], ROLE.output, 0.16), ln([IPS.barX, row[1]], [IPS.barX + lenBottom, row[1]], ROLE.result, 0.16)]
  return {
    id: 'math-inner-product-space',
    title: 'Cauchy–Schwarz: |⟨u, v⟩| ≤ |u||v|',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the Cauchy–Schwarz inequality in an inner product space. For u = (3, 4) and v = (4, 3) both vectors have norm |u| = |v| = √25 = 5, so |u||v| = 25, while the inner product is ⟨u, v⟩ = 3 × 4 + 4 × 3 = 24: the green bar |⟨u, v⟩| = 24 is never longer than the blue bar |u||v| = 25 (here only slightly shorter, because the vectors are almost parallel). Replace v by the parallel vector 2u = (6, 8): then ⟨u, 2u⟩ = 3 × 6 + 4 × 8 = 50 and |u||2u| = 5 × 10 = 50, and the bars are exactly equal: equality holds exactly when the vectors are parallel.',
    ariaLabel:
      'In the first step a red arrow u to (3, 4) and a blue arrow v to (4, 3) with the captions norm of u equals 5, norm of v equals 5 and inner product of u and v equals 24. In the second step two horizontal bars to the right: a long blue bar labelled 25 for the product of the norms and a green bar labelled 24 just slightly shorter, with the caption 24 is at most 25. In the third step a violet arrow 2u along u and a second pair of bars of exactly equal length, both labelled 50, with the caption equal when parallel.',
    stage: NO_STAGE,
    steps: [
      { narration: 'u = (3, 4) (red) and v = (4, 3) (blue): both have length 5, and ⟨u, v⟩ = 3 × 4 + 4 × 3 = 24.', objects: [ar(o, ipsTip(IPS.u), ROLE.input), lb('u', [ipsTip(IPS.u)[0] - 0.15, ipsTip(IPS.u)[1] + 0.3], ROLE.input), ar(o, ipsTip(IPS.v), ROLE.output), lb('v', [ipsTip(IPS.v)[0] + 0.3, ipsTip(IPS.v)[1] - 0.2], ROLE.output), lb('|u| = 5', [-3.0, -2.1], ROLE.input), lb('|v| = 5', [-1.3, -2.1], ROLE.output), lb('⟨u, v⟩ = 24', [-2.1, -2.8], ROLE.result)] },
      { narration: 'Compare |u||v| = 25 (blue bar) with |⟨u, v⟩| = 24 (green bar): the inner product is no longer than the product of the norms.', objects: [...bar(IPS.rows.A, ipsBarLen(25, 25), ipsBarLen(24, 25)), lb('|u||v|', [0.0, IPS.rows.A[0]], ROLE.output), lb('|⟨u, v⟩|', [-0.1, IPS.rows.A[1]], ROLE.result), lb('25', [IPS.barX + ipsBarLen(25, 25) + 0.55, IPS.rows.A[0]], ROLE.output), lb('24', [IPS.barX + ipsBarLen(24, 25) + 0.55, IPS.rows.A[1]], ROLE.result), lb('24 ≤ 25', [2.6, 0.1], ROLE.ink)] },
      { narration: 'Now take the parallel vector 2u = (6, 8) (violet): ⟨u, 2u⟩ = 50 and |u||2u| = 5 × 10 = 50. The two bars are exactly equal — equality holds exactly when the vectors are parallel.', objects: [ar(o, ipsTip(IPS.v2), ROLE.aid), lb('2u', [ipsTip(IPS.v2)[0] - 0.4, ipsTip(IPS.v2)[1] + 0.1], ROLE.aid), ...bar(IPS.rows.B, ipsBarLen(50, 50), ipsBarLen(50, 50)), lb('v = 2u', [0.0, (IPS.rows.B[0] + IPS.rows.B[1]) / 2], ROLE.aid), lb('50', [IPS.barX + ipsBarLen(50, 50) + 0.55, IPS.rows.B[0]], ROLE.output), lb('50', [IPS.barX + ipsBarLen(50, 50) + 0.55, IPS.rows.B[1]], ROLE.result), lb('equal when parallel', [2.6, -2.4], ROLE.aid)] },
    ],
  }
}

// ── 11. QR factorization ─────────────────────────────────────────────────────

/** A = [a₁ a₂] with a₁ = (4, 3), a₂ = (1, 2). Gram–Schmidt: q₁ = a₁/5 = (0.8, 0.6); a₂ = 2 q₁ + (−0.6, 0.8), so q₂ = (−0.6, 0.8); R = [[5, 2], [0, 1]] and A = Q R. */
export const QRF = {
  o: [-3.6, -1.7] as Pt, s: 0.9,
  a1: [4, 3] as readonly [number, number], a2: [1, 2] as readonly [number, number],
  q1: [0.8, 0.6] as readonly [number, number], q2: [-0.6, 0.8] as readonly [number, number],
  R: [[5, 2], [0, 1]] as ReadonlyArray<readonly number[]>,
  mA: { cx: -2.9, cy: 2.0, dx: 0.9, dy: 0.8, rows: 2, cols: 2 } as MSpec,
  mR: { cx: 3.1, cy: 1.5, dx: 0.9, dy: 0.8, rows: 2, cols: 2 } as MSpec,
}
export const qrfTip = (w: readonly [number, number]): Pt => vec(QRF.o, QRF.s, w)

/** KG: A = QR with Q orthogonal and R upper triangular, computed by Gram–Schmidt on the columns of A. */
export function buildQrFactorizationScene(): SceneSpec {
  return framed(raw_buildQrFactorizationScene())
}
function raw_buildQrFactorizationScene(): SceneSpec {
  const o = QRF.o
  const foot = qrfTip([2 * QRF.q1[0], 2 * QRF.q1[1]])
  return {
    id: 'math-qr-factorization',
    title: 'QR factorization by Gram–Schmidt',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show A = QR for the matrix with columns a₁ = (4, 3) (red) and a₂ = (1, 2) (blue). Gram–Schmidt turns them into perpendicular unit vectors: q₁ is a₁ scaled to length 1, q₁ = a₁ / 5 = (0.8, 0.6) (green). The part of a₂ along q₁ is (a₂ · q₁) q₁ = 2 q₁ (the violet drop ends at 2 q₁ = (1.6, 1.2)); what is left over, a₂ − 2 q₁ = (−0.6, 0.8), already has length 1, so q₂ = (−0.6, 0.8) (green), perpendicular to q₁. The numbers found along the way are the entries of the upper-triangular R = [[5, 2], [0, 1]]: r₁₁ = |a₁| = 5, r₁₂ = a₂ · q₁ = 2, r₂₂ = the length of the leftover = 1. Then a₁ = 5 q₁ and a₂ = 2 q₁ + 1 q₂, i.e. A = QR with Q = [q₁ q₂] orthogonal.',
    ariaLabel:
      'In the first step a red arrow a1 to (4, 3) and a blue arrow a2 to (1, 2) from the same point, and the matrix 4 1 over 3 2 labelled A at the right with its first column red and its second column blue. In the second step a short green arrow q1 along a1 and a short green arrow q2 perpendicular to it, a violet segment from the tip of a2 to the point 2 q1 on a1, and a right-angle mark. In the third step the upper-triangular matrix 5 2 over 0 1 labelled R, and the captions A equals QR, 5 equals the length of a1, 2 equals a2 along q1 and 1 equals the rest of a2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The columns of A: a₁ = (4, 3) (red) and a₂ = (1, 2) (blue). They are not perpendicular and not unit length.', objects: [ar(o, qrfTip(QRF.a1), ROLE.input), lb('a₁', [qrfTip(QRF.a1)[0] + 0.45, qrfTip(QRF.a1)[1] - 0.1], ROLE.input), ar(o, qrfTip(QRF.a2), ROLE.output), lb('a₂', [qrfTip(QRF.a2)[0] - 0.2, qrfTip(QRF.a2)[1] + 0.4], ROLE.output), ...matrix(QRF.mA, [[4, 1], [3, 2]], (_i, j) => (j === 0 ? ROLE.input : ROLE.output)), lb('A', [QRF.mA.cx, 3.1])] },
      { narration: 'Gram–Schmidt: q₁ = a₁ / 5 = (0.8, 0.6), a unit vector along a₁. Take away the part of a₂ along q₁ (violet, ends at 2 q₁): the rest, (−0.6, 0.8), has length 1, so q₂ = (−0.6, 0.8), perpendicular to q₁.', objects: [ar(o, qrfTip(QRF.q1), ROLE.result), lb('q₁', [qrfTip(QRF.q1)[0] + 0.15, qrfTip(QRF.q1)[1] - 0.45], ROLE.result), ar(o, qrfTip(QRF.q2), ROLE.result), lb('q₂', [qrfTip(QRF.q2)[0] - 0.4, qrfTip(QRF.q2)[1] + 0.1], ROLE.result), ln(qrfTip(QRF.a2), foot, ROLE.aid, 0.04), ...rightAngleMark(o[0], o[1], [0.8, 0.6], [-0.6, 0.8], 0.3, ROLE.aid), lb('Gram–Schmidt', [-1.2, -2.3], ROLE.aid)] },
      { narration: 'The numbers collected along the way form R = [[5, 2], [0, 1]]: 5 = length of a₁, 2 = a₂ along q₁, 1 = the rest of a₂. So a₁ = 5 q₁ and a₂ = 2 q₁ + 1 q₂, i.e. A = QR.', objects: [...matrix(QRF.mR, QRF.R, (i, j) => (i <= j ? ROLE.result : ROLE.reference)), lb('R', [QRF.mR.cx, 2.7], ROLE.result), lb('A = QR', [QRF.mR.cx, 0.1], ROLE.result), lb('5 = |a₁|', [QRF.mR.cx, -0.55]), lb('2 = a₂ along q₁', [QRF.mR.cx, -1.2]), lb('1 = rest of a₂', [QRF.mR.cx, -1.85])] },
    ],
  }
}

// ── 12. Singular values ──────────────────────────────────────────────────────

/** A = [[1.8, −0.8], [2.4, 0.6]]: A e₁ = (1.8, 2.4) has length 3 and A e₂ = (−0.8, 0.6) has length 1 and they are perpendicular, so AᵀA = diag(9, 1) and the singular values are σ₁ = 3, σ₂ = 1. */
export const SGV = { c: [-1.6, 0.2] as Pt, s: 0.85, A: [[1.8, -0.8], [2.4, 0.6]] as ReadonlyArray<readonly number[]>, m: { cx: 3.4, cy: 0.9, dx: 1.2, dy: 0.8, rows: 2, cols: 2 } as MSpec }
export const sgvCircle = (t: number): Pt => [SGV.c[0] + SGV.s * Math.cos(t), SGV.c[1] + SGV.s * Math.sin(t)]
export const sgvEllipse = (t: number): Pt => [SGV.c[0] + SGV.s * (SGV.A[0][0] * Math.cos(t) + SGV.A[0][1] * Math.sin(t)), SGV.c[1] + SGV.s * (SGV.A[1][0] * Math.cos(t) + SGV.A[1][1] * Math.sin(t))]
export const sgvImage = (k: number): Pt => [SGV.c[0] + SGV.s * SGV.A[0][k], SGV.c[1] + SGV.s * SGV.A[1][k]]
const sgvCurve = (f: (t: number) => Pt, color: string): SceneObject => curve(Array.from({ length: 73 }, (_, k) => pp(f((2 * Math.PI * k) / 72))), color)

/** KG: the singular values σᵢ = √(eigenvalues of AᵀA) are the lengths of the semi-axes of the ellipse that A makes of the unit circle. */
export function buildSingularValuesScene(): SceneSpec {
  return framed(raw_buildSingularValuesScene())
}
function raw_buildSingularValuesScene(): SceneSpec {
  const c = SGV.c
  const e1 = vec(c, SGV.s, [1, 0]), e2 = vec(c, SGV.s, [0, 1])
  return {
    id: 'math-singular-values',
    title: 'Singular values: the semi-axes of the ellipse',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show singular values geometrically. The matrix A = [[1.8, −0.8], [2.4, 0.6]] maps the unit circle (grey) to an ellipse (green). The unit vector e₁ = (1, 0) goes to A e₁ = (1.8, 2.4), of length √(1.8² + 2.4²) = 3 (red), and e₂ = (0, 1) goes to A e₂ = (−0.8, 0.6), of length 1 (blue); these two images are perpendicular (1.8 × (−0.8) + 2.4 × 0.6 = 0), so they are the ellipse\'s axes. The semi-axis lengths are the singular values σ₁ = 3 and σ₂ = 1; equivalently AᵀA = diag(9, 1), whose eigenvalues 9 and 1 have square roots 3 and 1. The largest, σ₁ = 3, is the biggest stretch A can produce (the operator 2-norm).',
    ariaLabel:
      'In the first step a grey unit circle with a red arrow e1 along the horizontal and a blue arrow e2 pointing up, and the matrix 1.8 minus 0.8 over 2.4 0.6 at the right. In the second step a green ellipse tilted up to the right, with a long red arrow A e1 to its far tip and a short blue arrow A e2, perpendicular to it, along its narrow side. In the third step the captions sigma 1 equals 3 at the long axis and sigma 2 equals 1 at the short axis, and A transpose A equals diag of 9 and 1.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The unit circle (grey) with e₁ = (1, 0) (red) and e₂ = (0, 1) (blue), and the matrix A = [[1.8, −0.8], [2.4, 0.6]].', objects: [sgvCurve(sgvCircle, ROLE.reference), ar(c, e1, ROLE.input), lb('e₁', [e1[0] + 0.3, e1[1] - 0.3], ROLE.input), ar(c, e2, ROLE.output), lb('e₂', [e2[0] + 0.3, e2[1] + 0.1], ROLE.output), ...matrix(SGV.m, SGV.A, () => ROLE.ink, 0.75), lb('A', [SGV.m.cx, 2.0])] },
      { narration: 'A turns the circle into an ellipse (green). e₁ goes to A e₁ = (1.8, 2.4) (length 3, red) and e₂ to A e₂ = (−0.8, 0.6) (length 1, blue) — perpendicular, along the ellipse\'s axes.', objects: [sgvCurve(sgvEllipse, ROLE.result), ar(c, sgvImage(0), ROLE.input), ar(c, sgvImage(1), ROLE.output)] },
      { narration: 'The semi-axis lengths are the singular values: σ₁ = 3 (long axis) and σ₂ = 1 (short axis). They are the square roots of the eigenvalues 9 and 1 of AᵀA = diag(9, 1).', objects: [lb('σ₁ = 3', [sgvImage(0)[0] + 1.0, sgvImage(0)[1] + 0.1], ROLE.input), lb('σ₂ = 1', [sgvImage(1)[0] - 0.9, sgvImage(1)[1] + 0.55], ROLE.output), lb('AᵀA = diag(9, 1)', [SGV.m.cx, -0.7], ROLE.result)] },
    ],
  }
}

// ── 13. Tensor (the outer product u ⊗ v) ─────────────────────────────────────

/** u = (1, 2) and v = (3, 4): u ⊗ v is the 2-index array T with T_ij = u_i v_j = [[3, 4], [6, 8]]; its second row is 2 × the first, so it has rank 1. */
export const TEN = {
  u: [1, 2] as readonly number[], v: [3, 4] as readonly number[],
  prod: { cx: 0.9, cy: -0.2, dx: 1.1, dy: 0.9, rows: 2, cols: 2 } as MSpec,
  uCol: { cx: -2.0, cy: -0.2, dx: 1, dy: 0.9, rows: 2, cols: 1 } as MSpec,
  vRow: { cx: 0.9, cy: 1.6, dx: 1.1, dy: 0.9, rows: 1, cols: 2 } as MSpec,
}

/** KG: the tensor product ⊗ builds higher-rank tensors from vectors; u ⊗ v has components uᵢvⱼ. */
export function buildTensorScene(): SceneSpec {
  return framed(raw_buildTensorScene())
}
function raw_buildTensorScene(): SceneSpec {
  const prod = TEN.u.map((a) => TEN.v.map((b) => a * b))
  return {
    id: 'math-tensor',
    title: 'The tensor product u ⊗ v',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how the tensor product builds a two-index tensor from two vectors. Put u = (1, 2) down the left (red) and v = (3, 4) across the top (blue); the tensor u ⊗ v has one component for every pair of indices, T_ij = u_i × v_j: top row 1 × 3 = 3 and 1 × 4 = 4, bottom row 2 × 3 = 6 and 2 × 4 = 8, giving the 2 × 2 array [[3, 4], [6, 8]] (green) — a tensor with two indices i and j, a matrix. Because it comes from just two vectors, its bottom row is 2 × the top row (6 = 2 × 3 and 8 = 2 × 4): it has rank 1, the simplest kind of tensor.',
    ariaLabel:
      'A red column vector 1 over 2 at the left and a blue row vector 3 4 above and to the right, like the headings of a multiplication table. In the second step the 2 by 2 array 3 4 over 6 8 appears between brackets in green, aligned with them, with the caption u tensor v. In the third step the captions T i j equals u i v j, rank 1 and row 2 equals 2 times row 1.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Two vectors: u = (1, 2) as a column (red) and v = (3, 4) as a row (blue), set out like the headings of a multiplication table.', objects: [...matrix(TEN.uCol, TEN.u.map((a) => [a]), () => ROLE.input), ...matrix(TEN.vRow, [TEN.v], () => ROLE.output), lb('u', [TEN.uCol.cx, 1.3], ROLE.input), lb('v', [3.0, TEN.vRow.cy], ROLE.output)] },
      { narration: 'u ⊗ v has an entry for each pair (i, j): T_ij = u_i × v_j. Top row 1 × 3 = 3, 1 × 4 = 4; bottom row 2 × 3 = 6, 2 × 4 = 8.', objects: [...matrix(TEN.prod, prod, () => ROLE.result), lb('u ⊗ v', [TEN.prod.cx, -1.8], ROLE.result)] },
      { narration: 'T_ij = u_i v_j is a tensor with two indices. Its bottom row is 2 × the top row (6 = 2 × 3, 8 = 2 × 4), so it has rank 1.', objects: [lb('Tᵢⱼ = uᵢ vⱼ', [3.4, 0.3], ROLE.aid), lb('rank 1', [TEN.prod.cx, -2.4], ROLE.aid), lb('row 2 = 2 × row 1', [TEN.prod.cx, -3.0], ROLE.aid)] },
    ],
  }
}
