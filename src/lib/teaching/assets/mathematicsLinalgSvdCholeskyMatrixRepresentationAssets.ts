/**
 * Batch: svd, cholesky, matrix-representation (math.linalg).
 *
 * Continuing math.linalg (47/61 -> 50/61). Fresh frontier recompute found
 * 12 ready concepts. Selected svd (the highest-value pick: an expert-level
 * concept converging spectral-theorem and qr-factorization, both closed in
 * Batch 116/117, and the gateway to the not-yet-ready singular-values and
 * pseudoinverse children), cholesky (closes the positive-definite +
 * lu-factorization convergence), and matrix-representation (closes the
 * linear-map + basis convergence; its unlock, change-of-basis, was already
 * independently authored in Batch 116, so this closes the family rather
 * than opening new frontier). Transcribed from the frozen Educational Brain
 * entries at educational-brain/concepts/mathematics/math.linalg.{svd,
 * cholesky,matrix-representation}.md.
 *
 *   SVD  U (m×m) and V (n×n) are sized SEPARATELY to A's rows and columns —
 *           never forced to the same size like diagonalization's single P;
 *           singular values are the SQUARE ROOTS of AᵀA's eigenvalues
 *           sorted DESCENDING, never the raw eigenvalues themselves; SVD
 *           exists for EVERY matrix of every shape, never limited by
 *           diagonalization's square-matrix requirement. svd.md lists only
 *           2 misconceptions (MC-1, MC-2) — a 3rd PROFICIENT probe below
 *           re-targets MC-2 with a fresh worked example (a different 3×2
 *           matrix whose AᵀA eigenvalues arrive UNSORTED), following this
 *           campaign's established 2-misconception fallback.
 *   CHOLESKY  for symmetric positive definite A, general LU A=LU
 *           SPECIALIZES to A=LLᵀ — never a separate technique; L is
 *           computed DIRECTLY via recursive column formulas, never by
 *           running general LU first and symmetrizing; Cholesky costs
 *           roughly HALF general LU's work, never the same.
 *   MATRIX-REPRESENTATION  the matrix is built column-by-column from T
 *           applied to EACH basis vector of β IN ORDER, never arbitrary
 *           vectors; the matrix-vector product uses v's coordinates
 *           relative to β, never raw standard components when β is
 *           non-standard; composition matches multiplication order
 *           exactly, [T∘S]=[T][S] with T on the left, never reversed.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const SVD = 'math.linalg.svd'
const CHOLESKY = 'math.linalg.cholesky'
const MATRIX_REPRESENTATION = 'math.linalg.matrix-representation'

export const MATHEMATICS_LINALG_SVD_CHOLESKY_MATRIX_REPRESENTATION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SVD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'U AND V ARE SEPARATELY SIZED TO A’S ROWS AND COLUMNS — NEVER THE SAME SIZE: for a 3×2 '
      + 'matrix A: U is 3×3 (matching A’s ROW count), Σ is 3×2 (matching A’s FULL shape), V is 2×2 '
      + '(matching A’s COLUMN count). Unlike diagonalization’s SINGLE square matrix P, SVD '
      + 'genuinely uses TWO DIFFERENT orthogonal matrices, sized independently — this is EXACTLY '
      + 'what allows SVD to handle non-square matrices, which diagonalization cannot even '
      + 'attempt.\n\n'
      + 'SINGULAR VALUES ARE THE SQUARE ROOTS OF AᵀA’S EIGENVALUES, SORTED DESCENDING — NEVER THE '
      + 'RAW EIGENVALUES THEMSELVES: for A=[[1,0],[0,2],[0,0]]: AᵀA=[[1,0],[0,4]] (symmetric, so '
      + 'the Spectral Theorem applies), with eigenvalues 1,4 and eigenvectors (1,0),(0,1) forming '
      + 'V’s columns. The SINGULAR VALUES are √1=1 and √4=2 — the SQUARE ROOTS, giving '
      + 'Σ=diag(2,1) sorted LARGEST first (NEVER diag(1,4), the raw eigenvalues used directly and '
      + 'in the wrong order).\n\n'
      + 'SVD APPLIES UNIVERSALLY — DIAGONALIZATION DOES NOT: AᵀA is ALWAYS symmetric for ANY '
      + 'matrix A (even non-square), so the Spectral Theorem’s guarantee of orthogonal '
      + 'eigenvectors and real non-negative eigenvalues ALWAYS applies. This makes SVD strictly '
      + 'more general than diagonalization: diagonalization requires a SQUARE matrix with n '
      + 'independent eigenvectors (many matrices fail this entirely), while SVD exists for EVERY '
      + 'matrix, of EVERY shape, ALWAYS — exactly why SVD, not diagonalization, underlies '
      + 'data-science applications on genuinely rectangular data matrices.',
    targetedMisconceptions: [`${SVD}:MC-1`, `${SVD}:MC-2`],
    source: eb(SVD, 'Core Understanding — U and V separately sized to A’s rows and columns rather than forced equal like diagonalization’s single P, singular values as the square roots of AᵀA’s eigenvalues sorted descending, and SVD’s universal applicability versus diagonalization’s square-matrix requirement'),
  },
  {
    conceptId: CHOLESKY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'CHOLESKY IS LU SPECIALIZED BY SYMMETRY — NEVER A SEPARATE FACTORIZATION METHOD: for '
      + 'symmetric positive definite A=[[4,2],[2,5]]: ordinary LU gives L₀=[[1,0],[0.5,1]], '
      + 'U=[[4,2],[0,4]]. Observing U=DL₀ᵀ with D=[[4,0],[0,4]] (a direct consequence of A=Aᵀ '
      + 'applied to A=LDLᵀ): absorbing √D into L₀ gives the Cholesky factor L=[[2,0],[1,2]] — this '
      + 'IS the symmetrized specialization of the ALREADY-COMPUTED general LU factorization, never '
      + 'an independent alternative technique.\n\n'
      + 'L CAN BE COMPUTED DIRECTLY VIA RECURSIVE FORMULAS — NEVER REQUIRING GENERAL LU FIRST: for '
      + 'the SAME A: L₁₁=√A₁₁=2; L₂₁=A₂₁/L₁₁=1; L₂₂=√(A₂₂−L₂₁²)=√(5−1)=2 — giving L=[[2,0],[1,2]], '
      + 'MATCHING the symmetrization route exactly, but obtained DIRECTLY without ever running '
      + 'general elimination first. In practice, this is exactly how Cholesky is computed — one '
      + 'pass of recursive column formulas, never LU-then-symmetrize.\n\n'
      + 'CHOLESKY IS ROUGHLY HALF THE WORK OF GENERAL LU — NEVER THE SAME COST: for a 3×3 '
      + 'symmetric positive definite matrix: general LU computes and stores BOTH a full L (3 '
      + 'nontrivial entries) AND a full U (6 entries) — 9 stored numbers. Cholesky computes and '
      + 'stores ONLY L (6 entries, including its own diagonal) — roughly HALF as many numbers, '
      + 'because Lᵀ is never separately computed; it’s simply L’s transpose, free of additional '
      + 'work. This "half the storage, half the arithmetic" pattern is exactly why Cholesky is '
      + 'preferred whenever A is known to be symmetric positive definite.',
    targetedMisconceptions: [`${CHOLESKY}:MC-1`, `${CHOLESKY}:MC-2`, `${CHOLESKY}:MC-3`],
    source: eb(CHOLESKY, 'Core Understanding — Cholesky as LU specialized by symmetry into A=LLᵀ, L computed directly via recursive column formulas rather than LU-then-symmetrize, and Cholesky costing roughly half general LU’s storage and arithmetic'),
  },
  {
    conceptId: MATRIX_REPRESENTATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE MATRIX IS BUILT COLUMN-BY-COLUMN FROM T APPLIED TO EACH BASIS VECTOR OF β, IN ORDER — '
      + 'NEVER FROM ARBITRARY VECTORS: for T(x,y)=(2x+y,x−y) relative to the standard basis '
      + 'β={(1,0),(0,1)}: T(1,0)=(2,1) is column 1, T(0,1)=(1,−1) is column 2, giving '
      + '[T]=[[2,1],[1,−1]]. Applying T to some OTHER pair of vectors (not specifically β’s own '
      + 'basis vectors, in β’s own order) produces a matrix that does NOT correctly represent T '
      + 'relative to β — the columns must be T(b₁),T(b₂),… EXACTLY, never a substitute pair.\n\n'
      + 'THE MATRIX-VECTOR PRODUCT USES v’S COORDINATES RELATIVE TO β — NEVER ITS RAW STANDARD '
      + 'COMPONENTS WHEN β IS NON-STANDARD: with [T]=[[2,1],[1,−1]] (standard β), computing T(3,4) '
      + 'uses [v]_β=(3,4) directly (since β IS standard here): [T][v]_β=(2(3)+1(4),1(3)−1(4))='
      + '(10,−1), matching T(3,4)=(2(3)+4,3−4)=(10,−1) directly. If β were instead some '
      + 'NON-standard basis, using v’s raw standard components in place of its actual '
      + 'β-coordinates would be WRONG — the matrix-vector product is only valid against '
      + 'coordinates relative to the SAME basis β the matrix was built from.\n\n'
      + 'COMPOSITION CORRESPONDS TO MATRIX MULTIPLICATION IN THE EXACT SAME ORDER — NEVER '
      + 'REVERSED: for T(x,y)=(x+y,x−y) and S(x,y)=(2x,3y): [T]=[[1,1],[1,−1]], [S]=[[2,0],[0,3]]. '
      + '[T∘S]=[T][S]=[[2,3],[2,−3]], matching (T∘S)(x,y)=T(2x,3y)=(2x+3y,2x−3y) directly. '
      + 'Computing [S][T] instead — the REVERSED order — gives [[2,2],[3,−3]], a DIFFERENT '
      + 'matrix, since matrix multiplication is generally non-commutative; this reversed product '
      + 'actually represents S∘T, never T∘S. Reversing the multiplication order is WRONG — the '
      + 'matrix product order must match the composition order exactly, [T∘S]=[T][S], with [T] on '
      + 'the left.',
    targetedMisconceptions: [`${MATRIX_REPRESENTATION}:MC-1`, `${MATRIX_REPRESENTATION}:MC-2`, `${MATRIX_REPRESENTATION}:MC-3`],
    source: eb(MATRIX_REPRESENTATION, 'Core Understanding — the matrix built column-by-column from T applied to β’s own basis vectors in order, the matrix-vector product requiring coordinates relative to β rather than raw standard components, and composition matching multiplication order exactly with T on the left'),
  },
]

export const MATHEMATICS_LINALG_SVD_CHOLESKY_MATRIX_REPRESENTATION_PROBES: SeedProbe[] = [
  {
    conceptId: SVD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For a 3×2 matrix A with SVD A=UΣVᵀ, must U and V be the same size, like diagonalization’s single change-of-basis matrix P?',
    choices: [
      { text: 'No — U is 3×3 (matching A’s ROW count) and V is 2×2 (matching A’s COLUMN count), sized SEPARATELY; SVD genuinely uses two different orthogonal matrices, unlike diagonalization’s single square P', isCorrect: true },
      { text: 'Yes — U and V in an SVD must always be the same size, just like diagonalization’s single change-of-basis matrix P', isCorrect: false, misconceptionId: `${SVD}:MC-1` },
      { text: "Yes, since both U and V are orthogonal matrices, they must share the same dimensions regardless of A's shape", isCorrect: false, misconceptionId: `${SVD}:MC-1` },
    ],
    targetedMisconceptions: [`${SVD}:MC-1`],
    source: eb(SVD, 'Demonstration 1 — the explicit size derivation for U,Σ,V from a 3×2 matrix A’s row and column counts, directly breaking U-AND-V-ASSUMED-SAME-SIZE-LIKE-DIAGONALIZATIONS-SINGLE-P'),
  },
  {
    conceptId: SVD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For A=[[1,0],[0,2],[0,0]], AᵀA=[[1,0],[0,4]] has eigenvalues 1 and 4. What are the singular values of A?',
    choices: [
      { text: 'σ=2,1 — the SQUARE ROOTS of AᵀA’s eigenvalues (√4=2, √1=1), sorted LARGEST first, never the raw eigenvalues themselves', isCorrect: true },
      { text: 'σ=1,4 — the singular values are simply AᵀA’s eigenvalues used directly, in the order they were found', isCorrect: false, misconceptionId: `${SVD}:MC-2` },
      { text: "σ=4,1 — the singular values are AᵀA's eigenvalues themselves, just sorted from largest to smallest", isCorrect: false, misconceptionId: `${SVD}:MC-2` },
    ],
    targetedMisconceptions: [`${SVD}:MC-2`],
    source: eb(SVD, 'Demonstration 2 — the full AᵀA-to-eigenvalues-to-square-roots-to-sorted-singular-values derivation for A=[[1,0],[0,2],[0,0]], directly breaking SINGULAR-VALUES-CONFUSED-WITH-A-TRANSPOSE-A-EIGENVALUES-DIRECTLY'),
  },
  {
    conceptId: SVD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For a different 3×2 matrix B, BᵀB=[[9,0],[0,16]] has eigenvalues 9 and 16. What is Σ, the diagonal matrix of singular values for B (top-left to bottom-right)?',
    choices: [
      { text: 'Σ=diag(4,3) — the square roots √16=4 and √9=3, sorted with the LARGER singular value first, never the raw eigenvalues and never left unsorted', isCorrect: true },
      { text: 'Σ=diag(9,16) — since the eigenvalues were listed in that order, the singular values simply carry that same order over directly', isCorrect: false, misconceptionId: `${SVD}:MC-2` },
      { text: "Σ=diag(16,9) — using the eigenvalues directly and sorting them from largest to smallest is sufficient, without taking any square root", isCorrect: false, misconceptionId: `${SVD}:MC-2` },
    ],
    targetedMisconceptions: [`${SVD}:MC-2`],
    source: eb(SVD, 'Memory Hooks and Assessment Signals Rung 2 — a fresh worked example (BᵀB=diag(9,16)) requiring both the square-root step and the descending sort, directly breaking SINGULAR-VALUES-CONFUSED-WITH-A-TRANSPOSE-A-EIGENVALUES-DIRECTLY a second, independent way since svd.md registers only two misconceptions'),
  },
  {
    conceptId: CHOLESKY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For symmetric positive definite A=[[4,2],[2,5]], is the Cholesky factorization A=LLᵀ an entirely separate technique from LU factorization, or a specialization of it?',
    choices: [
      { text: 'A specialization — ordinary LU gives L₀,U with U=DL₀ᵀ (a direct consequence of A=Aᵀ), and absorbing √D into L₀ gives exactly the Cholesky factor L; Cholesky is never an independent alternative method', isCorrect: true },
      { text: 'An entirely separate factorization technique, with no direct mathematical connection to general LU factorization', isCorrect: false, misconceptionId: `${CHOLESKY}:MC-1` },
      { text: "A separate method that happens to coincidentally produce a similar-looking triangular result to LU factorization", isCorrect: false, misconceptionId: `${CHOLESKY}:MC-1` },
    ],
    targetedMisconceptions: [`${CHOLESKY}:MC-1`],
    source: eb(CHOLESKY, 'Demonstration 1 — the symmetrization derivation U=DL₀ᵀ from ordinary LU output for A=[[4,2],[2,5]], directly breaking CHOLESKY-ASSUMED-SEPARATE-METHOD'),
  },
  {
    conceptId: CHOLESKY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'To find the Cholesky factor L for A=[[4,2],[2,5]], must general LU factorization be run first and then symmetrized, or can L be computed directly?',
    choices: [
      { text: 'Directly — the recursive formulas L₁₁=√A₁₁=2, L₂₁=A₂₁/L₁₁=1, L₂₂=√(A₂₂−L₂₁²)=2 give L=[[2,0],[1,2]] in one pass, matching the symmetrization result without ever running general elimination', isCorrect: true },
      { text: 'Yes — general LU factorization must always be run first, and then the result is symmetrized to obtain the Cholesky factor L', isCorrect: false, misconceptionId: `${CHOLESKY}:MC-2` },
      { text: "Yes, since the recursive column formulas are only a theoretical shortcut and general LU must actually be computed underneath in practice", isCorrect: false, misconceptionId: `${CHOLESKY}:MC-2` },
    ],
    targetedMisconceptions: [`${CHOLESKY}:MC-2`],
    source: eb(CHOLESKY, 'Demonstration 2 — the direct recursive computation of L for A=[[4,2],[2,5]], matching Example 1’s symmetrization result without running LU first, directly breaking CHOLESKY-ASSUMED-TO-REQUIRE-LU-FIRST'),
  },
  {
    conceptId: CHOLESKY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For a 3×3 symmetric positive definite matrix, general LU stores a full L (3 nontrivial entries) and a full U (6 entries) — 9 numbers total. How many numbers does Cholesky need to store?',
    choices: [
      { text: '6 — Cholesky stores ONLY L (6 entries, including its own diagonal); Lᵀ is never separately computed, it’s simply L’s transpose, free of additional work, roughly HALF the storage of general LU', isCorrect: true },
      { text: '9 — Cholesky must store both L and its transpose Lᵀ separately, requiring the same total number of stored entries as general LU', isCorrect: false, misconceptionId: `${CHOLESKY}:MC-3` },
      { text: "9, because computing Lᵀ from L still requires an equivalent amount of additional storage and arithmetic work", isCorrect: false, misconceptionId: `${CHOLESKY}:MC-3` },
    ],
    targetedMisconceptions: [`${CHOLESKY}:MC-3`],
    source: eb(CHOLESKY, 'Demonstration 3 — the storage-count contrast (9 vs. 6 numbers) for a 3×3 symmetric positive definite matrix, directly breaking CHOLESKY-ASSUMED-SAME-COST-AS-LU'),
  },
  {
    conceptId: MATRIX_REPRESENTATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For T(x,y)=(2x+y,x−y) relative to the standard basis β={(1,0),(0,1)}, how should the matrix [T] be constructed?',
    choices: [
      { text: 'Column-by-column from T applied to EACH basis vector of β, in order: T(1,0)=(2,1) is column 1, T(0,1)=(1,−1) is column 2, giving [T]=[[2,1],[1,−1]]', isCorrect: true },
      { text: 'By applying T to any two convenient vectors, not necessarily β’s own basis vectors, and using the results as the matrix columns', isCorrect: false, misconceptionId: `${MATRIX_REPRESENTATION}:MC-1` },
      { text: "By applying T to β's basis vectors in any convenient order, since the specific column order doesn't affect what the matrix represents", isCorrect: false, misconceptionId: `${MATRIX_REPRESENTATION}:MC-1` },
    ],
    targetedMisconceptions: [`${MATRIX_REPRESENTATION}:MC-1`],
    source: eb(MATRIX_REPRESENTATION, 'Demonstration 1 — the T(x,y)=(2x+y,x−y) column-by-column construction relative to the standard basis β, directly breaking MATRIX-REPRESENTATION-BUILT-FROM-WRONG-VECTORS'),
  },
  {
    conceptId: MATRIX_REPRESENTATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If β were a NON-standard basis instead of the standard one, could the matrix-vector product [T][v] be computed using v’s raw standard components?',
    choices: [
      { text: 'No — the matrix-vector product is only valid against coordinates relative to the SAME basis β the matrix was built from; for a non-standard β, v’s actual β-coordinates [v]_β must be used, never its raw standard components', isCorrect: true },
      { text: 'Yes — the matrix-vector product always works correctly using v’s raw standard components, regardless of which basis β the matrix was built from', isCorrect: false, misconceptionId: `${MATRIX_REPRESENTATION}:MC-3` },
      { text: "Yes, since a vector's standard components and its coordinates relative to any basis are always numerically identical", isCorrect: false, misconceptionId: `${MATRIX_REPRESENTATION}:MC-3` },
    ],
    targetedMisconceptions: [`${MATRIX_REPRESENTATION}:MC-3`],
    source: eb(MATRIX_REPRESENTATION, 'Demonstration 2 — the T(3,4) matrix-vector-product verification against the direct function definition, establishing that the product must use coordinates relative to β, directly breaking COORDINATE-VECTOR-NOT-USED-FOR-NON-STANDARD-BASIS'),
  },
  {
    conceptId: MATRIX_REPRESENTATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For T(x,y)=(x+y,x−y) and S(x,y)=(2x,3y), with [T]=[[1,1],[1,−1]] and [S]=[[2,0],[0,3]], which matrix product correctly represents the composition T∘S?',
    choices: [
      { text: '[T][S]=[[2,3],[2,−3]] — matching (T∘S)(x,y)=T(2x,3y)=(2x+3y,2x−3y) directly; the matrix product order must match the composition order exactly, with [T] on the left', isCorrect: true },
      { text: '[S][T]=[[2,2],[3,−3]] — since composition is applied right-to-left, the matrix product should be written with [S] on the left to match that reading order', isCorrect: false, misconceptionId: `${MATRIX_REPRESENTATION}:MC-2` },
      { text: "Either [T][S] or [S][T] correctly represents T∘S, since matrix multiplication is commutative for square matrices of the same size", isCorrect: false, misconceptionId: `${MATRIX_REPRESENTATION}:MC-2` },
    ],
    targetedMisconceptions: [`${MATRIX_REPRESENTATION}:MC-2`],
    source: eb(MATRIX_REPRESENTATION, 'Demonstration 3 — the [T][S]-versus-[S][T] composition-order contrast for T(x,y)=(x+y,x−y), S(x,y)=(2x,3y), confirming [S][T] actually represents S∘T, directly breaking COMPOSITION-MATRIX-MULTIPLICATION-ORDER-REVERSED'),
  },
]
