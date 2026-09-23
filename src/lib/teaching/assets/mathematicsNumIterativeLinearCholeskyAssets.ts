/**
 * Batch: iterative-linear, cholesky (math.num).
 *
 * Fresh Phase 0 frontier recompute after the svd/lu-factorization/
 * numerical-differentiation batch found exactly 2 ready concepts
 * (iterative-linear, cholesky) — both selected, keeping this batch at 2
 * concepts since no larger ready set exists yet. iterative-linear requires
 * math.linalg.linear-system (already certified) and math.num.error-analysis
 * (now authored); cholesky requires math.linalg.cholesky (already
 * certified) and math.num.lu-factorization (now authored). Transcribed
 * from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.num.{iterative-linear,
 * cholesky}.md.
 *
 * Grade band: both adopt GradeBand.UNDERGRADUATE, continuing math.num's
 * established domain baseline.
 *
 *   ITERATIVE-LINEAR  Iterative methods are NEVER categorically slower
 *           than direct LU — fill-in makes direct methods impractical for
 *           large sparse systems, where iterative methods are often the
 *           ONLY feasible option; Jacobi and Gauss-Seidel do NOT always
 *           converge — convergence requires the spectral radius of the
 *           iteration matrix to be below 1, NEVER guaranteed automatically
 *           just because the matrix is invertible; and Conjugate Gradient
 *           requires $A$ symmetric positive definite — NEVER applied
 *           indiscriminately to any linear system.
 *   CHOLESKY  SPD is NECESSARY for Cholesky to succeed — NEVER just
 *           symmetry alone, since a symmetric-but-indefinite matrix
 *           produces a negative value under a square root partway through;
 *           Cholesky costs HALF of LU's flop count — NEVER the same cost,
 *           since only one triangular factor needs computing; and positive
 *           definiteness is about the QUADRATIC FORM being positive for
 *           every nonzero vector, NEVER about individual matrix entries
 *           being positive.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const ITERATIVE_LINEAR = 'math.num.iterative-linear'
const CHOLESKY = 'math.num.cholesky'

export const MATHEMATICS_NUM_ITERATIVE_LINEAR_CHOLESKY_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ITERATIVE_LINEAR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'ITERATIVE METHODS ARE NEVER CATEGORICALLY SLOWER THAN DIRECT METHODS — FILL-IN MAKES '
      + 'DIRECT METHODS IMPRACTICAL FOR LARGE SPARSE SYSTEMS: for a 3D PDE discretized on an '
      + 'n-by-n-by-n grid (N=n^3 unknowns), sparse LU produces fill-in yielding nearly dense '
      + 'factors, costing quadratic memory and cubic flops in N — for N around a million, that '
      + 'is infeasible. Iterative methods need only memory and per-iteration cost linear in N, '
      + 'with a number of iterations that scales far more gently, giving a total cost that '
      + 'remains feasible even for N around a billion. Assuming iterative methods are inferior '
      + 'to direct LU because they converge gradually rather than solving exactly, without '
      + "accounting for fill-in's cost explosion on sparse matrices, is never correct — for large "
      + 'sparse systems, iterative methods are often the ONLY feasible option.\n\n'
      + 'JACOBI AND GAUSS-SEIDEL DO NOT ALWAYS CONVERGE — CONVERGENCE REQUIRES THE SPECTRAL '
      + 'RADIUS OF THE ITERATION MATRIX TO BE BELOW 1: for $A=[[1,2],[2,1]]$, the Jacobi '
      + 'iteration matrix has eigenvalues $\\pm2$, so its spectral radius is 2, greater than 1 — '
      + 'Jacobi DIVERGES on this matrix, despite $A$ being perfectly invertible with a unique '
      + 'solution. Believing Jacobi or Gauss-Seidel always converges to the solution, without '
      + 'checking the spectral radius, is never valid — diagonal dominance is only a SUFFICIENT '
      + 'condition guaranteeing convergence, never a necessary one, and the spectral radius '
      + 'condition must always be checked directly, never assumed from the matrix simply being '
      + 'invertible.\n\n'
      + 'CONJUGATE GRADIENT REQUIRES A SYMMETRIC POSITIVE DEFINITE — NEVER APPLIED '
      + 'INDISCRIMINATELY: CG is derived from minimizing a quadratic form that has a unique '
      + 'minimum at the solution exactly when $A$ is SPD. Applying CG to a non-symmetric matrix '
      + 'arising from a convection-diffusion discretization: after many iterations, the residual '
      + 'does not decrease, because the quantity CG minimizes is not even well-defined for a '
      + 'non-symmetric matrix, and the iterates may stagnate or diverge. Applying CG to ANY '
      + 'linear system without recognizing it requires $A$ SPD is never correct — for '
      + 'non-symmetric systems, GMRES or BiCGSTAB are the correct alternatives, never CG.',
    targetedMisconceptions: [`${ITERATIVE_LINEAR}:MC-1`, `${ITERATIVE_LINEAR}:MC-2`, `${ITERATIVE_LINEAR}:MC-3`],
    source: eb(ITERATIVE_LINEAR, 'Core Understanding — iterative methods never being categorically slower than direct methods since fill-in makes direct methods impractical for large sparse systems, Jacobi and Gauss-Seidel not always converging since convergence requires the spectral radius below 1, and Conjugate Gradient requiring A symmetric positive definite never applied indiscriminately'),
  },
  {
    conceptId: CHOLESKY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'SPD IS NECESSARY FOR CHOLESKY TO SUCCEED — NEVER JUST SYMMETRY ALONE: $A=[[1,2],[2,1]]$ '
      + 'is symmetric but has eigenvalues 3 and -1, so it is NOT SPD. Attempting Cholesky on it, '
      + 'the diagonal entry computation at the second step requires taking the square root of a '
      + 'negative number — it FAILS. Each diagonal entry of the Cholesky factor requires a '
      + 'nonnegative argument under the square root; if $A$ has a negative eigenvalue, at some '
      + 'step this expression becomes negative and no real square root exists. Applying Cholesky '
      + 'to a symmetric-but-indefinite matrix and expecting success is never correct — symmetry '
      + 'ALONE is never sufficient; positive definiteness is an independent, equally necessary '
      + 'condition.\n\n'
      + 'CHOLESKY COSTS HALF OF LU — NEVER THE SAME COST AS LU APPLIED TO A SYMMETRIC MATRIX: LU '
      + 'computes both $L$ and $U$ separately. Cholesky exploits $A=LL^T$: since $U=L^T$ is '
      + 'exactly the transpose of $L$, only $L$ needs computing — half the entries, giving '
      + 'roughly half the flop count of LU (and half the memory as well). Believing Cholesky is '
      + '"just LU applied to a symmetric matrix" with the SAME cost misses that Cholesky is a '
      + 'fundamentally different algorithm computing only ONE factor and deriving the other for '
      + 'free — the cost saving is real and substantial, never negligible.\n\n'
      + 'POSITIVE DEFINITE MEANS THE QUADRATIC FORM IS POSITIVE FOR EVERY NONZERO VECTOR — NEVER '
      + 'THAT ALL ENTRIES ARE POSITIVE: for $A=[[2,-3],[-3,5]]$, containing a NEGATIVE '
      + 'off-diagonal entry, attempting Cholesky succeeds at every step — confirming $A$ IS '
      + 'positive definite (verified independently: both eigenvalues are positive). Believing a '
      + 'matrix is SPD only if ALL its entries are positive confuses positive ENTRIES with '
      + 'positive EIGENVALUES — a negative off-diagonal entry does NOT prevent positive '
      + 'definiteness when the overall quadratic form stays positive; the actual definition is '
      + 'about the quadratic form, never about the sign of individual entries.',
    targetedMisconceptions: [`${CHOLESKY}:MC-1`, `${CHOLESKY}:MC-2`, `${CHOLESKY}:MC-3`],
    source: eb(CHOLESKY, 'Core Understanding — SPD being necessary for Cholesky to succeed never just symmetry alone, Cholesky costing half of LU never the same cost, and positive definite meaning the quadratic form is positive for every nonzero vector never that all entries are positive'),
  },
]

export const MATHEMATICS_NUM_ITERATIVE_LINEAR_CHOLESKY_PROBES: SeedProbe[] = [
  {
    conceptId: ITERATIVE_LINEAR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is a direct method like LU always cheaper than an iterative method, regardless of sparsity?',
    choices: [
      { text: 'No — for a large sparse 3D PDE system, direct LU suffers fill-in that turns sparse factors nearly dense, exploding memory and flop costs, while iterative methods keep cost linear per iteration and remain feasible even for huge systems', isCorrect: true },
      { text: 'Yes — a direct method like LU is always at least as cheap as an iterative method, since it solves the system exactly rather than approximately', isCorrect: false, misconceptionId: `${ITERATIVE_LINEAR}:MC-1` },
      { text: "Yes, since sparsity never affects the cost of direct factorization methods like LU", isCorrect: false, misconceptionId: `${ITERATIVE_LINEAR}:MC-1` },
    ],
    targetedMisconceptions: [`${ITERATIVE_LINEAR}:MC-1`],
    source: eb(ITERATIVE_LINEAR, 'Discovery Question 1 as a detection probe (verbatim) — whether direct LU is always cheaper regardless of sparsity, an answer of "yes" confirming ITERATIVE-ALWAYS-SLOWER'),
  },
  {
    conceptId: ITERATIVE_LINEAR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does Jacobi iteration always converge for an invertible matrix?',
    choices: [
      { text: 'No — for A=[[1,2],[2,1]], which is invertible with a unique solution, the Jacobi iteration matrix has spectral radius 2, greater than 1, so Jacobi diverges; convergence always requires checking the spectral radius directly, never assumed from invertibility alone', isCorrect: true },
      { text: 'Yes — Jacobi iteration always converges to the solution as long as the coefficient matrix is invertible', isCorrect: false, misconceptionId: `${ITERATIVE_LINEAR}:MC-2` },
      { text: "Yes, since diagonal dominance is automatically satisfied by every invertible matrix", isCorrect: false, misconceptionId: `${ITERATIVE_LINEAR}:MC-2` },
    ],
    targetedMisconceptions: [`${ITERATIVE_LINEAR}:MC-2`],
    source: eb(ITERATIVE_LINEAR, 'Discovery Question 2 as a detection probe (verbatim) — whether Jacobi always converges for an invertible matrix, an answer of "yes" confirming JACOBI-AND-GS-ALWAYS-CONVERGE'),
  },
  {
    conceptId: ITERATIVE_LINEAR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Can Conjugate Gradient be applied to any linear system, or does it require a specific property of A?',
    choices: [
      { text: 'It requires A to be symmetric positive definite — CG minimizes a quadratic form that is only well-defined for SPD matrices; applied to a non-symmetric convection-diffusion matrix, the residual fails to decrease and the method can stagnate or diverge', isCorrect: true },
      { text: 'CG can be applied to any linear system, symmetric or not, with the same guaranteed convergence behavior', isCorrect: false, misconceptionId: `${ITERATIVE_LINEAR}:MC-3` },
      { text: "CG works on any invertible matrix, since the quadratic form it minimizes is always well-defined regardless of symmetry", isCorrect: false, misconceptionId: `${ITERATIVE_LINEAR}:MC-3` },
    ],
    targetedMisconceptions: [`${ITERATIVE_LINEAR}:MC-3`],
    source: eb(ITERATIVE_LINEAR, 'Discovery Question 3 as a detection probe (verbatim) — whether CG can be applied to any linear system, an answer of "yes, any system" confirming CG-FOR-ANY-SYSTEM'),
  },
  {
    conceptId: CHOLESKY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does Cholesky succeed for every symmetric matrix, or only for symmetric positive definite ones?',
    choices: [
      { text: 'Only for symmetric positive definite ones — A=[[1,2],[2,1]] is symmetric but has a negative eigenvalue, so attempting Cholesky requires taking the square root of a negative number partway through and fails', isCorrect: true },
      { text: 'Cholesky succeeds for any symmetric matrix, regardless of whether it is positive definite', isCorrect: false, misconceptionId: `${CHOLESKY}:MC-1` },
      { text: "Symmetry alone is always sufficient to guarantee that Cholesky factorization will succeed", isCorrect: false, misconceptionId: `${CHOLESKY}:MC-1` },
    ],
    targetedMisconceptions: [`${CHOLESKY}:MC-1`],
    source: eb(CHOLESKY, 'Discovery Question 1 as a detection probe (verbatim) — whether Cholesky succeeds for every symmetric matrix, an answer of "any symmetric matrix" confirming CHOLESKY-WORKS-FOR-ANY-SYMMETRIC'),
  },
  {
    conceptId: CHOLESKY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does Cholesky cost the same as LU, or does exploiting symmetry save real work?',
    choices: [
      { text: 'Exploiting symmetry saves real work — Cholesky computes only one triangular factor L (since U equals L transpose for free), giving roughly half the flop count and half the memory of full LU factorization', isCorrect: true },
      { text: 'Cholesky costs exactly the same as LU, since it is just LU factorization applied to a symmetric matrix', isCorrect: false, misconceptionId: `${CHOLESKY}:MC-2` },
      { text: "Cholesky is always more expensive than LU because it must additionally verify positive definiteness at every step", isCorrect: false, misconceptionId: `${CHOLESKY}:MC-2` },
    ],
    targetedMisconceptions: [`${CHOLESKY}:MC-2`],
    source: eb(CHOLESKY, 'Discovery Question 2 as a detection probe (verbatim) — whether Cholesky costs the same as LU, an answer of "same cost" confirming CHOLESKY-IS-LU-WITH-SYMMETRY'),
  },
  {
    conceptId: CHOLESKY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does a negative entry in a matrix rule out positive definiteness?',
    choices: [
      { text: 'No — A=[[2,-3],[-3,5]] has a negative off-diagonal entry, yet Cholesky succeeds at every step and both eigenvalues are positive, confirming A is SPD; positive definiteness is about the quadratic form, never about individual entries\' signs', isCorrect: true },
      { text: 'Yes — any matrix containing a negative entry can never be positive definite, regardless of its overall quadratic form', isCorrect: false, misconceptionId: `${CHOLESKY}:MC-3` },
      { text: "Yes, since positive definiteness requires every single matrix entry to be a positive number", isCorrect: false, misconceptionId: `${CHOLESKY}:MC-3` },
    ],
    targetedMisconceptions: [`${CHOLESKY}:MC-3`],
    source: eb(CHOLESKY, 'Discovery Question 3 as a detection probe (verbatim) — whether a negative entry rules out positive definiteness, an answer of "yes" confirming POSITIVE-DEFINITE-MEANS-ALL-POSITIVE-ENTRIES'),
  },
]
