/**
 * MATHEMATICS — probe DEPTH, batch 10: math.linalg (61 (concept, band) pairs, 122 probes).
 *
 * Why depth, and the identity rule every probe here obeys, are stated once in
 * mathematicsDepthArithAssets.ts (batch 1): five gradeable probes per pair so a
 * learner recovers from one or two mistakes on questions they have not seen;
 * every probe extends the pair's existing ladder slot at an unused difficulty
 * rung, so no seeded probe is re-identified.
 *
 * Every matrix computation was worked by hand, e.g. det [[1,0,2],[0,3,0],[4,0,5]]
 * = 3·(5 − 8) = −9, [[1,2],[3,4]]⁻¹ = [[−2,1],[3/2,−1/2]], the Cholesky
 * factor of [[4,2],[2,5]] is [[2,0],[1,2]], Cramer on 3x + 2y = 7, x + 4y = 9
 * gives y = 20/10, the null space of [[1,2,−1],[0,1,1]] contains (3,−1,1),
 * and R₁₁ of [[3,0],[4,5]] is ‖(3,4)‖ = 5.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const UG = GradeBand.UNDERGRADUATE
const { FOUNDATIONAL: F, DEVELOPING: D, ADVANCED: A } = ProbeDifficulty
type Kind = 'mcq' | 'misconception_probe'

function q(
  conceptId: string, probeKind: Kind, difficulty: ProbeDifficulty,
  stem: string, correct: string, wrong: string[], what: string,
): SeedProbe {
  return {
    conceptId, subjectSlug: S, probeKind, gradeBand: UG, difficulty, stem,
    choices: [{ text: correct, isCorrect: true }, ...wrong.map((text) => ({ text, isCorrect: false }))],
    correctValue: correct,
    targetedMisconceptions: [],
    source: `educational-brain/concepts/mathematics/${conceptId}.md — probe-depth set 2026-10-02: ${what}`,
  }
}

const M = 'mcq' as const
const X = 'misconception_probe' as const

export const MATHEMATICS_DEPTH_LINEAR_ALGEBRA_PROBES: SeedProbe[] = [
  q('math.linalg.angle-vectors', M, D, 'What is the angle between (1, 0) and (1, 1)?', '45°', ['90°', '30°', '60°'], 'cos θ = 1/√2'),
  q('math.linalg.angle-vectors', M, A, 'What is the cosine of the angle between (1, 2, 2) and (2, 2, 1)?', '8/9', ['8', '1', '2/3'], 'dot product 8 over norms 3 · 3'),

  q('math.linalg.augmented-matrix', M, D, 'What is the augmented matrix of x + 2y = 5, 3x − y = 4?', '[[1, 2 | 5], [3, −1 | 4]]', ['[[1, 2 | 5], [3, 1 | 4]]', '[[1, 3 | 5], [2, −1 | 4]]', '[[1, 2], [3, −1]]'], 'one row per equation, constants after the bar'),
  q('math.linalg.augmented-matrix', M, A, 'A row-reduced augmented matrix contains the row [0 0 | 3]. What does that tell you?', 'The system has no solution', ['x = 3', 'There are infinitely many solutions', 'y = 3'], 'the row reads 0 = 3'),

  q('math.linalg.basis', M, D, 'Is {(1, 2), (2, 4)} a basis of ℝ²?', 'No, the two vectors are dependent', ['Yes, it has two vectors', 'Yes, neither vector is zero', 'No, a basis of ℝ² needs three vectors'], '(2, 4) = 2(1, 2)'),
  q('math.linalg.basis', M, A, 'How many vectors are in a basis of the space of 2×2 real matrices?', '4', ['2', '8', '16'], 'one per entry'),

  q('math.linalg.change-of-basis', M, D, 'β = {(1, 1), (1, −1)} and [v]β = (2, 1). What is v in standard coordinates?', '(3, 1)', ['(2, 1)', '(1, 3)', '(3, −1)'], '2(1, 1) + 1(1, −1)'),
  q('math.linalg.change-of-basis', M, A, 'P converts β-coordinates into standard coordinates. Which matrix converts standard coordinates into β-coordinates?', 'P⁻¹', ['P itself', 'Pᵀ', '−P'], 'undo the conversion'),

  q('math.linalg.characteristic-polynomial', M, D, 'What is the characteristic polynomial of [[2, 1], [1, 2]]?', 'λ² − 4λ + 3', ['λ² − 4λ + 5', 'λ² + 4λ + 3', 'λ² − 3'], '(2 − λ)² − 1'),
  q('math.linalg.characteristic-polynomial', M, A, 'A 2×2 matrix has trace 7 and determinant 10. What is its characteristic polynomial?', 'λ² − 7λ + 10', ['λ² + 7λ + 10', 'λ² − 10λ + 7', 'λ² − 7λ − 10'], 'λ² − (trace)λ + det'),

  q('math.linalg.cholesky', M, D, 'What is the Cholesky factor L of [[4, 2], [2, 5]]?', '[[2, 0], [1, 2]]', ['[[2, 0], [2, 5]]', '[[4, 0], [2, 5]]', '[[2, 0], [1, √5]]'], 'LLᵀ = [[4, 2], [2, 1 + 4]]'),
  q('math.linalg.cholesky', M, A, 'Which matrix has a Cholesky factorization?', '[[2, 1], [1, 2]]', ['[[1, 2], [2, 1]]', '[[0, 1], [1, 0]]', '[[1, 2], [0, 1]]'], 'symmetric with eigenvalues 3 and 1, both positive'),

  q('math.linalg.cofactor-expansion', M, D, 'What is det [[1, 0, 2], [0, 3, 0], [4, 0, 5]]?', '−9', ['9', '−3', '15'], 'expand along row 2: 3 · (5 − 8)'),
  q('math.linalg.cofactor-expansion', M, A, 'What is det [[2, 0, 0], [5, 3, 0], [1, 7, 4]]?', '24', ['12', '0', '35'], 'triangular: product of the diagonal'),

  q('math.linalg.column-space', M, D, 'What is the dimension of the column space of [[1, 2, 3], [2, 4, 6]]?', '1', ['2', '3', '0'], 'every column is a multiple of (1, 2)'),
  q('math.linalg.column-space', M, A, 'Is b = (1, 1, 0) in the column space of [[1, 0], [0, 1], [0, 0]]?', 'Yes, b is column 1 plus column 2', ['No, b has three entries but A has two columns', 'No, because its last entry is 0', 'Only if A is square'], 'b is a combination of the columns'),

  q('math.linalg.coordinates', M, D, 'β = {(1, 0), (1, 1)}. What are the β-coordinates of v = (3, 2)?', '(1, 2)', ['(3, 2)', '(2, 1)', '(1, 1)'], 'c₁(1, 0) + c₂(1, 1) = (c₁ + c₂, c₂)'),
  q('math.linalg.coordinates', M, A, 'β = {(2, 0), (0, 4)}. What are the β-coordinates of v = (6, 2)?', '(3, 1/2)', ['(6, 2)', '(12, 8)', '(3, 2)'], '6 = 3 · 2 and 2 = ½ · 4'),

  q('math.linalg.cramer-rule', M, D, 'By Cramer\'s rule, what is x for 2x + y = 5, x − y = 1?', '2', ['1', '−2', '6'], 'det(A) = −3, det(A₁) = −6'),
  q('math.linalg.cramer-rule', M, A, 'By Cramer\'s rule, what is y for 3x + 2y = 7, x + 4y = 9?', '2', ['1', '20', '1/2'], 'det(A) = 10, det(A₂) = 27 − 7 = 20'),

  q('math.linalg.cross-product', M, D, 'What is (1, 0, 0) × (0, 1, 0)?', '(0, 0, 1)', ['(0, 0, −1)', '0', '(1, 1, 0)'], 'i × j = k'),
  q('math.linalg.cross-product', M, A, 'What is the area of the parallelogram spanned by (1, 2, 0) and (3, 1, 0)?', '5', ['−5', '7', '25'], 'the cross product is (0, 0, −5); area is its length'),

  q('math.linalg.det-properties', M, D, 'det(A) = 4 and det(B) = −3. What is det(AB)?', '−12', ['1', '7', '12'], 'det(AB) = det(A)det(B)'),
  q('math.linalg.det-properties', M, A, 'A is 3×3 with det(A) = 2. What is det(3Aᵀ)?', '54', ['6', '18', '8'], 'det(Aᵀ) = det(A), and scaling a 3×3 by 3 gives 3³'),

  q('math.linalg.determinant', M, F, 'What is det [[3, 1], [2, 4]]?', '10', ['14', '12', '5'], '3 · 4 − 1 · 2'),
  q('math.linalg.determinant', M, D, 'What is det [[2, 5], [4, 10]], and what does it tell you?', '0, so the matrix is not invertible', ['40, so the matrix is invertible', '20, so the matrix is invertible', '0, so the matrix is the zero matrix'], 'row 2 is twice row 1'),

  q('math.linalg.diagonalization', M, D, 'A = PDP⁻¹ with D = diag(2, 3). What is A²?', 'P diag(4, 9) P⁻¹', ['P² diag(4, 9) P⁻²', 'P diag(4, 6) P⁻¹', '2PDP⁻¹'], 'P⁻¹P cancels in the middle'),
  q('math.linalg.diagonalization', M, A, 'Which 2×2 matrix is NOT diagonalizable?', '[[1, 1], [0, 1]]', ['[[1, 0], [0, 2]]', '[[2, 1], [1, 2]]', '[[1, 1], [0, 2]]'], 'eigenvalue 1 twice, one eigenvector'),

  q('math.linalg.dimension', M, D, 'What is the dimension of the plane x + y + z = 0 in ℝ³?', '2', ['3', '1', '0'], 'one constraint on three coordinates'),
  q('math.linalg.dimension', M, A, 'What is the dimension of P₃, the polynomials of degree at most 3?', '4', ['3', '∞', '1'], 'basis 1, x, x², x³'),

  q('math.linalg.distance', M, D, 'What is the distance between (2, −1) and (5, 3)?', '5', ['7', '25', '√13'], '√(3² + 4²)'),
  q('math.linalg.distance', M, A, 'What is the distance between (1, 0, 2) and (3, 1, 4)?', '3', ['9', '5', '√5'], '√(4 + 1 + 4)'),

  q('math.linalg.dot-product', M, D, 'What is (1, −2, 3) · (4, 0, −1)?', '1', ['(4, 0, −3)', '7', '−1'], '4 + 0 − 3'),
  q('math.linalg.dot-product', M, A, 'For which k are (k, 2) and (3, −6) orthogonal?', '4', ['−4', '1', '9'], '3k − 12 = 0'),

  q('math.linalg.dual-space', M, D, 'If V has dimension 4, what is the dimension of V*?', '4', ['1', '16', '8'], 'a finite-dimensional dual has the same dimension'),
  q('math.linalg.dual-space', M, A, 'With e₁ = (1, 0) and e₂ = (0, 1), the dual basis functional f¹ sends (x, y) to what?', 'x', ['y', 'x + y', '(x, 0)'], 'f¹(e₁) = 1, f¹(e₂) = 0, and f¹ returns a number'),

  q('math.linalg.eigenspace', M, D, 'For A = [[2, 0], [0, 3]], what is the eigenspace for λ = 3?', 'The span of (0, 1)', ['The span of (1, 0)', 'All of ℝ²', 'Only (0, 0)'], 'A − 3I = [[−1, 0], [0, 0]]'),
  q('math.linalg.eigenspace', M, A, 'For A = [[5, 1, 0], [0, 5, 0], [0, 0, 5]], what is the dimension of the eigenspace for λ = 5?', '2', ['3', '1', '0'], 'A − 5I has rank 1'),

  q('math.linalg.eigenvalues', M, D, 'What are the eigenvalues of [[1, 2], [2, 1]]?', '3 and −1', ['1 and 1', '3 and 1', '2 and −2'], '(1 − λ)² − 4 = 0'),
  q('math.linalg.eigenvalues', M, A, 'A has eigenvalue 3. Which number is an eigenvalue of A² + I?', '10', ['9', '4', '7'], 'Av = 3v gives (A² + I)v = (9 + 1)v'),

  q('math.linalg.gram-schmidt', M, D, 'Gram–Schmidt on v₁ = (1, 1), v₂ = (1, 0). What is u₂?', '(1/2, −1/2)', ['(1, 0)', '(0, 1)', '(1/2, 1/2)'], '(1, 0) − ½(1, 1)'),
  q('math.linalg.gram-schmidt', M, A, 'Gram–Schmidt has u₁ = (1, 0, 0) and u₂ = (0, 1, 0). What is u₃ from v₃ = (2, 3, 5)?', '(0, 0, 5)', ['(2, 3, 5)', '(0, 0, 1)', '(2, 3, 0)'], 'remove the components along u₁ and u₂'),

  q('math.linalg.inner-product-space', M, D, 'Which statement holds in every inner product space?', '‖u + v‖ ≤ ‖u‖ + ‖v‖', ['‖u + v‖ = ‖u‖ + ‖v‖', '‖u + v‖ ≥ ‖u‖ + ‖v‖', '⟨u, v⟩ ≥ 0'], 'the triangle inequality, from Cauchy–Schwarz'),
  q('math.linalg.inner-product-space', M, A, 'With ⟨f, g⟩ = ∫₀¹ f(x)g(x) dx, what is ⟨x, 1⟩?', '1/2', ['1', '0', '2'], '∫₀¹ x dx'),

  q('math.linalg.inner-product', M, D, 'With ⟨u, v⟩ = 2u₁v₁ + 3u₂v₂ on ℝ², what is ⟨(1, 1), (2, 1)⟩?', '7', ['3', '5', '13'], '2 · 2 + 3 · 1'),
  q('math.linalg.inner-product', M, A, 'Which formula is an inner product on ℝ²?', 'u₁v₁ + 4u₂v₂', ['u₁v₁ − u₂v₂', 'u₁v₂', '|u₁v₁|'], 'symmetric, bilinear and positive definite'),

  q('math.linalg.jordan-form', M, D, 'λ = 2 has algebraic multiplicity 2 and geometric multiplicity 2. What is its part of the Jordan form?', 'Two 1×1 blocks, diag(2, 2)', ['One 2×2 block with a 1 above the diagonal', '[[2, 1], [1, 2]]', '[[2, 2], [0, 2]]'], 'two independent eigenvectors, so no 1s'),
  q('math.linalg.jordan-form', M, A, 'An eigenvalue has geometric multiplicity 3. How many Jordan blocks does it have?', '3', ['1', 'As many as its algebraic multiplicity', '9'], 'one block per independent eigenvector'),

  q('math.linalg.kernel-image', M, D, 'What is the kernel of T(x, y) = (x, 0)?', 'All vectors (0, y)', ['Only (0, 0)', 'All vectors (x, 0)', 'All of ℝ²'], 'T(x, y) = 0 exactly when x = 0'),
  q('math.linalg.kernel-image', M, A, 'T: ℝ⁴ → ℝ³ has a 2-dimensional image. What is the dimension of its kernel?', '2', ['1', '3', '0'], 'rank–nullity: 4 − 2'),

  q('math.linalg.least-squares', M, D, 'Which equations give the least-squares solution x̂ of Ax = b?', 'AᵀAx̂ = Aᵀb', ['Ax̂ = b', 'AAᵀx̂ = b', 'Aᵀx̂ = b'], 'the residual is orthogonal to the column space'),
  q('math.linalg.least-squares', M, A, 'What is the least-squares solution of [[1], [1]] x = (1, 3)?', 'x̂ = 2', ['x̂ = 1', 'x̂ = 3', 'x̂ = 4'], 'AᵀA = 2, Aᵀb = 4'),

  q('math.linalg.linear-independence', M, D, 'Are (1, 2) and (3, 6) linearly independent?', 'No, (3, 6) = 3(1, 2)', ['Yes, neither is zero', 'Yes, they point in different directions', 'Yes, they have different entries'], 'one is a multiple of the other'),
  q('math.linalg.linear-independence', M, A, 'For which k are (1, k) and (2, 4) linearly dependent?', 'k = 2', ['k = 4', 'k = 1/2', 'Every k'], '(2, 4) = 2(1, k) needs 2k = 4'),

  q('math.linalg.linear-map', M, D, 'Is T(x, y) = (x², y) linear?', 'No, T(2, 0) = (4, 0) but 2T(1, 0) = (2, 0)', ['Yes, each output is a formula in x and y', 'Yes, T(0, 0) = (0, 0)', 'Yes, it keeps y unchanged'], 'homogeneity fails'),
  q('math.linalg.linear-map', M, A, 'T is linear with T(1, 0) = (2, 1) and T(0, 1) = (0, 3). What is T(2, 1)?', '(4, 5)', ['(2, 4)', '(4, 2)', '(4, 3)'], '2T(1, 0) + T(0, 1)'),

  q('math.linalg.linear-system', M, D, 'How many solutions does x + y = 2, 2x + 2y = 5 have?', 'None', ['Exactly one', 'Infinitely many', 'Two'], 'parallel lines: 2x + 2y would have to be 4'),
  q('math.linalg.linear-system', M, A, 'A consistent system has 5 unknowns and coefficient rank 3. How many free variables does it have?', '2', ['3', '5', '0'], 'unknowns minus pivots'),

  q('math.linalg.lu-factorization', M, D, 'L = [[1, 0], [2, 1]] and U = [[3, 1], [0, 4]]. What is A = LU?', '[[3, 1], [6, 6]]', ['[[3, 1], [6, 4]]', '[[3, 0], [2, 4]]', '[[3, 1], [2, 5]]'], 'row 2 of A is 2 · (3, 1) + (0, 4)'),
  q('math.linalg.lu-factorization', M, A, 'Eliminating below the first pivot of [[2, 1], [6, 5]], what multiplier is stored in L?', '3', ['1/3', '6', '−3'], 'row 2 − 3 · row 1'),

  q('math.linalg.matrix-addition', M, D, 'What is [[1, −2], [0, 3]] + [[4, 2], [−1, 1]]?', '[[5, 0], [−1, 4]]', ['[[5, −4], [1, 4]]', '[[4, −4], [0, 3]]', '[[5, 0], [1, 4]]'], 'add entry by entry'),
  q('math.linalg.matrix-addition', M, A, 'A + B = [[3, 3], [3, 3]] and A = [[1, 2], [3, 0]]. What is B?', '[[2, 1], [0, 3]]', ['[[4, 5], [6, 3]]', '[[2, 1], [3, 3]]', '[[−2, −1], [0, −3]]'], 'B = (A + B) − A'),

  q('math.linalg.matrix-exponential', M, D, 'What is e^A when A is the 2×2 zero matrix?', 'The identity matrix', ['The zero matrix', '[[1, 0], [0, 0]]', 'e times the identity'], 'the series starts with I'),
  q('math.linalg.matrix-exponential', M, A, 'For N = [[0, 1], [0, 0]], what is e^N?', '[[1, 1], [0, 1]]', ['[[1, e], [0, 1]]', '[[e, 1], [0, e]]', '[[1, 0], [0, 1]]'], 'N² = 0, so e^N = I + N'),

  q('math.linalg.matrix-inverse', M, D, 'What is the inverse of [[2, 0], [0, 5]]?', '[[1/2, 0], [0, 1/5]]', ['[[−2, 0], [0, −5]]', '[[5, 0], [0, 2]]', '[[0, 1/2], [1/5, 0]]'], 'invert each diagonal entry'),
  q('math.linalg.matrix-inverse', M, A, 'What is the inverse of [[1, 2], [3, 4]]?', '[[−2, 1], [3/2, −1/2]]', ['[[4, −2], [−3, 1]]', '[[−4, 2], [3, −1]]', '[[1, 1/2], [1/3, 1/4]]'], 'divide the adjugate by det = −2'),

  q('math.linalg.matrix-multiplication', X, F, 'What is [[1, 2], [3, 4]] times [[2, 0], [1, 1]]?', '[[4, 2], [10, 4]]', ['[[2, 0], [3, 4]]', '[[2, 4], [4, 6]]', '[[3, 2], [4, 5]]'], 'row-by-column, not entry-by-entry, and order matters'),
  q('math.linalg.matrix-multiplication', X, D, 'A and B are both 3×2. Which product is defined?', 'AᵀB', ['AB', 'Both AB and BA', 'None of them'], 'the inner sizes must match: 2×3 times 3×2'),

  q('math.linalg.matrix-representation', M, D, 'What is the standard matrix of T(x, y) = (3x − y, x + 2y)?', '[[3, −1], [1, 2]]', ['[[3, 1], [−1, 2]]', '[[−1, 3], [2, 1]]', '[[3, 1], [1, 2]]'], 'columns are T(1, 0) and T(0, 1)'),
  q('math.linalg.matrix-representation', M, A, 'What is the standard matrix of the 90° counterclockwise rotation of ℝ²?', '[[0, −1], [1, 0]]', ['[[0, 1], [−1, 0]]', '[[1, 0], [0, −1]]', '[[−1, 0], [0, −1]]'], '(1, 0) goes to (0, 1) and (0, 1) to (−1, 0)'),

  q('math.linalg.matrix-transpose', M, D, 'What is the transpose of [[1, 2, 3], [4, 5, 6]]?', '[[1, 4], [2, 5], [3, 6]]', ['[[1, 2], [3, 4], [5, 6]]', '[[4, 5, 6], [1, 2, 3]]', '[[6, 5, 4], [3, 2, 1]]'], 'rows become columns'),
  q('math.linalg.matrix-transpose', M, A, 'Which expression equals (ABC)ᵀ?', 'CᵀBᵀAᵀ', ['AᵀBᵀCᵀ', 'CBA', 'BᵀAᵀCᵀ'], 'transpose reverses the order'),

  q('math.linalg.matrix', M, D, 'How many entries does a 4 × 3 matrix have?', '12', ['7', '4', '3'], '4 rows of 3'),
  q('math.linalg.matrix', M, A, 'M = [[5, 7, 1], [2, 8, 6]]. What is M₂₁?', '2', ['7', '8', '5'], 'row 2, column 1'),

  q('math.linalg.norm', M, D, 'What is ‖(1, −2, 2)‖?', '3', ['1', '5', '9'], '√(1 + 4 + 4)'),
  q('math.linalg.norm', M, A, 'What is the 1-norm of (3, −4)?', '7', ['5', '−1', '4'], '|3| + |−4|'),

  q('math.linalg.null-space', M, D, 'What is the null space of the 1×2 matrix [[1, 1]]?', 'All multiples of (1, −1)', ['Only (0, 0)', 'All multiples of (1, 1)', 'All of ℝ²'], 'x + y = 0'),
  q('math.linalg.null-space', M, A, 'Which vector is in the null space of [[1, 2, −1], [0, 1, 1]]?', '(3, −1, 1)', ['(1, 2, −1)', '(0, 0, 1)', '(3, 1, 1)'], 'y = −z and x = −2y + z'),

  q('math.linalg.orthogonal-basis', M, D, '{(1, 1), (1, −1)} is an orthogonal basis. What is the coefficient of (1, 1) when writing v = (3, 1)?', '2', ['4', '1', '3'], 'c = ⟨v, u⟩/⟨u, u⟩ = 4/2'),
  q('math.linalg.orthogonal-basis', M, A, 'Which set is an orthonormal basis of ℝ²?', '{(3/5, 4/5), (−4/5, 3/5)}', ['{(3, 4), (−4, 3)}', '{(1, 0), (1, 1)}', '{(1, 0), (0, −2)}'], 'orthogonal and each of length 1'),

  q('math.linalg.orthogonality', M, D, 'Which vector is orthogonal to (2, −1, 3)?', '(1, 2, 0)', ['(2, −1, 3)', '(1, 1, 1)', '(3, 0, 1)'], '2 − 2 + 0 = 0'),
  q('math.linalg.orthogonality', M, A, 'W is the line spanned by (1, 1) in ℝ². What is W⊥?', 'The line spanned by (1, −1)', ['The line spanned by (1, 1)', 'Only (0, 0)', 'All of ℝ²'], 'vectors with x + y = 0'),

  q('math.linalg.positive-definite', M, D, 'Is [[2, 0], [0, 3]] positive definite?', 'Yes, both eigenvalues are positive', ['No, it has zero entries', 'No, it is diagonal', 'It cannot be decided'], 'xᵀAx = 2x² + 3y² > 0'),
  q('math.linalg.positive-definite', M, A, 'Is [[1, 2], [2, 1]] positive definite?', 'No, its eigenvalues are 3 and −1', ['Yes, all its entries are positive', 'Yes, it is symmetric', 'Yes, its determinant is nonzero'], 'x = (1, −1) gives xᵀAx = −2'),

  q('math.linalg.projection', M, D, 'What is the projection of v = (2, 3) onto u = (1, 0)?', '(2, 0)', ['2', '(0, 3)', '(2, 3)'], 'a projection is a vector along u'),
  q('math.linalg.projection', M, A, 'What is the projection of v = (1, 2) onto u = (3, 4)?', '(33/25, 44/25)', ['(3/5, 4/5)', '11/25', '(33/5, 44/5)'], '(v · u / u · u) u = (11/25)(3, 4)'),

  q('math.linalg.pseudoinverse', M, D, 'What is the pseudoinverse of [[2, 0], [0, 0]]?', '[[1/2, 0], [0, 0]]', ['It does not exist', '[[−2, 0], [0, 0]]', '[[1/2, 0], [0, 1]]'], 'invert the nonzero singular values, keep zeros'),
  q('math.linalg.pseudoinverse', M, A, 'A has full column rank. Which formula gives A⁺?', '(AᵀA)⁻¹Aᵀ', ['A⁻¹', 'Aᵀ(AAᵀ)⁻¹', '(AAᵀ)⁻¹'], 'AᵀA is invertible exactly when the columns are independent'),

  q('math.linalg.qr-factorization', M, D, 'In A = QR from Gram–Schmidt, what kind of matrix is R?', 'Upper triangular', ['Lower triangular', 'Orthogonal', 'Diagonal'], 'each column of A uses only the earlier q\'s'),
  q('math.linalg.qr-factorization', M, A, 'In the QR factorization of [[3, 0], [4, 5]], what is R₁₁?', '5', ['3', '4', '1'], 'R₁₁ is the length of the first column (3, 4)'),

  q('math.linalg.rank-nullity', M, D, 'A is 4×6 with rank 4. What is the nullity of A?', '2', ['0', '4', '6'], '6 columns − 4'),
  q('math.linalg.rank-nullity', M, A, 'T: ℝ⁵ → ℝ⁵ is injective. What is its rank?', '5', ['0', '4', 'It cannot be determined'], 'nullity 0, so rank = 5 − 0'),

  q('math.linalg.rank', M, D, 'What is the rank of [[1, 2], [2, 4], [3, 6]]?', '1', ['3', '2', '0'], 'every row is a multiple of (1, 2)'),
  q('math.linalg.rank', M, A, 'What is the rank of [[1, 0, 2], [0, 1, 3], [1, 1, 5]]?', '2', ['3', '1', '0'], 'row 3 = row 1 + row 2'),

  q('math.linalg.row-echelon', M, D, 'Which matrix is in reduced row echelon form?', '[[1, 0, 2], [0, 1, 3]]', ['[[1, 2, 0], [0, 2, 1]]', '[[0, 1, 0], [1, 0, 0]]', '[[1, 1, 0], [0, 1, 3]]'], 'leading 1s, zeros above and below them, staircase order'),
  q('math.linalg.row-echelon', M, A, 'A 3×4 coefficient matrix has pivots in columns 1, 2 and 4. Which variable is free?', 'x₃', ['x₄', 'x₁', 'None of them'], 'the non-pivot column'),

  q('math.linalg.row-reduction', M, D, 'Which is a legal row operation?', 'Add 3 times row 1 to row 2', ['Multiply a row by 0', 'Add 3 to every entry of a row', 'Swap two columns'], 'row operations must be reversible and keep the solutions'),
  q('math.linalg.row-reduction', M, A, 'Row-reduce [[1, 2 | 3], [2, 5 | 8]]. What is y?', '2', ['8/5', '3', '−1'], 'R₂ − 2R₁ = [0, 1 | 2]'),

  q('math.linalg.scalar-multiplication', M, D, 'What is −3(2, −1, 4)?', '(−6, 3, −12)', ['(−6, −3, −12)', '(−1, −4, 1)', '(6, −3, 12)'], 'multiply every component, sign included'),
  q('math.linalg.scalar-multiplication', M, A, 'If 2v = (6, −4), what is v?', '(3, −2)', ['(12, −8)', '(4, −6)', '(3, −4)'], 'divide every component by 2'),

  q('math.linalg.singular-values', M, D, 'What are the singular values of [[0, 2], [−3, 0]]?', '3 and 2', ['2 and −3', '0 and 0', '9 and 4'], 'AᵀA = diag(9, 4); take square roots'),
  q('math.linalg.singular-values', M, A, 'A has singular values 6, 2 and 0. What is rank(A)?', '2', ['3', '8', '6'], 'count the nonzero singular values'),

  q('math.linalg.span', M, D, 'What is span{(1, 0, 0), (0, 1, 0)} in ℝ³?', 'The xy-plane', ['All of ℝ³', 'Just those two points', 'The x-axis'], 'all combinations (a, b, 0)'),
  q('math.linalg.span', M, A, 'Is (1, 2, 3) in span{(1, 0, 1), (0, 1, 1)}?', 'Yes, it equals (1, 0, 1) + 2(0, 1, 1)', ['No, three entries need three vectors', 'No, it is not a multiple of either vector', 'Yes, every vector of ℝ³ is'], '(a, b, a + b) with a = 1, b = 2'),

  q('math.linalg.spectral-theorem', M, D, 'What does the spectral theorem guarantee for a real symmetric matrix?', 'Real eigenvalues and an orthonormal eigenbasis', ['Only positive eigenvalues', 'All eigenvalues distinct', 'No zero eigenvalue'], 'A = QΛQᵀ'),
  q('math.linalg.spectral-theorem', M, A, 'A symmetric 2×2 matrix has eigenvalues 1 and 4 with unit eigenvectors q₁ and q₂. Which expression equals A?', 'q₁q₁ᵀ + 4q₂q₂ᵀ', ['q₁ + 4q₂', 'q₁ᵀq₁ + 4q₂ᵀq₂', '5I'], 'the spectral decomposition'),

  q('math.linalg.subspace', M, D, 'Is {(x, 2x) : x ∈ ℝ} a subspace of ℝ²?', 'Yes, it is a line through the origin', ['No, it is only a line', 'No, it leaves out most of ℝ²', 'No, it is not closed under addition'], 'contains 0 and is closed under both operations'),
  q('math.linalg.subspace', M, A, 'Which set is a subspace of ℝ³?', '{(x, y, z) : x − 2y + z = 0}', ['{(x, y, z) : x + y + z = 1}', '{(x, y, z) : x ≥ 0}', '{(x, y, z) : xyz = 0}'], 'a homogeneous linear condition'),

  q('math.linalg.svd', M, D, 'In A = UΣVᵀ, what kind of matrices are U and V?', 'Orthogonal', ['Diagonal', 'Triangular', 'Symmetric'], 'their columns are orthonormal'),
  q('math.linalg.svd', M, A, 'A is 5×3. What is the size of Σ in its full SVD?', '5×3', ['3×3', '5×5', '3×5'], 'Σ has the same shape as A'),

  q('math.linalg.symmetric-matrix', M, D, 'Which matrix is symmetric?', '[[1, 4], [4, 2]]', ['[[1, 4], [−4, 2]]', '[[1, 2], [3, 4]]', '[[1, 4, 0], [4, 2, 0]]'], 'A = Aᵀ, which also needs a square matrix'),
  q('math.linalg.symmetric-matrix', M, A, 'For any matrix B, which product is always symmetric?', 'BᵀB', ['B + I', 'B²', 'B − Bᵀ'], '(BᵀB)ᵀ = BᵀB'),

  q('math.linalg.tensor', M, D, 'V has dimension 2 and W has dimension 3. What is the dimension of V ⊗ W?', '6', ['5', '8', '9'], 'dimensions multiply'),
  q('math.linalg.tensor', M, A, 'Written as the matrix uvᵀ, what is (1, 2) ⊗ (3, 4)?', '[[3, 4], [6, 8]]', ['11', '[[3, 6], [4, 8]]', '(3, 8)'], 'entry (i, j) is uᵢvⱼ'),

  q('math.linalg.unit-vector', M, D, 'What is the unit vector in the direction of (0, −7)?', '(0, −1)', ['(0, 7)', '(0, 1)', '(0, −7/49)'], 'divide by the length 7'),
  q('math.linalg.unit-vector', M, A, 'What is the unit vector in the direction of (1, 2, 2)?', '(1/3, 2/3, 2/3)', ['(1/5, 2/5, 2/5)', '(1, 2, 2)', '(1/9, 2/9, 2/9)'], 'the length is 3'),

  q('math.linalg.vector-addition', M, D, 'What is (2, −1, 3) + (−4, 5, 0)?', '(−2, 4, 3)', ['(−2, 4, 0)', '(6, −6, 3)', '(−8, −5, 0)'], 'add matching components'),
  q('math.linalg.vector-addition', M, A, 'u + v = (5, 1) and u = (2, 4). What is v?', '(3, −3)', ['(7, 5)', '(−3, 3)', '(3, 3)'], 'v = (u + v) − u'),

  q('math.linalg.vector-space', M, D, 'Which set is a vector space under the usual addition and scalar multiplication?', 'All polynomials of degree at most 2', ['All polynomials of degree exactly 2', 'The positive real numbers', 'All (x, y) with y = x + 1'], 'contains 0 and closed under both operations'),
  q('math.linalg.vector-space', M, A, 'In any vector space, what is 0·v?', 'The zero vector', ['The number 0', 'v', 'It is undefined'], '0·v = (0 + 0)·v = 0·v + 0·v'),

  q('math.linalg.vector', M, D, 'What vector goes from the point P = (1, 2) to Q = (4, 6)?', '(3, 4)', ['(5, 8)', '(−3, −4)', '(4, 6)'], 'Q − P'),
  q('math.linalg.vector', M, A, 'What is the magnitude of the vector from (1, 1) to (4, 5)?', '5', ['7', '(3, 4)', '25'], 'the vector is (3, 4)'),
]
