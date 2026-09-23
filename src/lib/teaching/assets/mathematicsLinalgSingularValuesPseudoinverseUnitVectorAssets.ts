/**
 * Batch: singular-values, pseudoinverse, unit-vector (math.linalg).
 *
 * Continuing math.linalg (50/61 -> 53/61). Fresh frontier recompute found
 * all 11 remaining concepts simultaneously ready (svd's authoring in Batch
 * 118 unblocked everything downstream at once). Selected singular-values
 * and pseudoinverse (both svd's direct children, closing that convergence
 * outright) plus unit-vector (opens the norm family, alongside distance).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.linalg.{singular-values,
 * pseudoinverse,unit-vector}.md.
 *
 *   SINGULAR-VALUES  σᵢ are the SQUARE ROOTS of AᵀA's eigenvalues, never
 *           the eigenvalues themselves; singular values GENERALIZE
 *           eigenvalues to non-square matrices, never limited to square
 *           ones; σ₁ IS the operator 2-norm — the single LARGEST singular
 *           value alone, never an average or sum.
 *   PSEUDOINVERSE  Σ⁺ inverts each NONZERO singular value and leaves ZERO
 *           ones as ZERO, never attempting to invert zero; Â=A⁺b gives the
 *           MINIMUM-NORM least-squares solution for ANY matrix, never
 *           limited to square invertible ones; A⁺=A⁻¹ EXACTLY when A is
 *           square and invertible, never assumed to always differ.
 *   UNIT-VECTOR  a unit vector has norm EXACTLY 1, checked by direct
 *           computation, never assumed; normalizing divides EVERY
 *           component by the SAME norm value, never just part of the
 *           vector; standard basis vectors need the nonzero entry to be
 *           EXACTLY 1, never just a matching zero pattern.
 *
 * All three EB entries list only 2 misconceptions each — a 3rd PROFICIENT
 * probe below re-targets one of them per concept with a fresh worked
 * example, following this campaign's established 2-misconception fallback.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const SINGULAR_VALUES = 'math.linalg.singular-values'
const PSEUDOINVERSE = 'math.linalg.pseudoinverse'
const UNIT_VECTOR = 'math.linalg.unit-vector'

export const MATHEMATICS_LINALG_SINGULAR_VALUES_PSEUDOINVERSE_UNIT_VECTOR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SINGULAR_VALUES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'SINGULAR VALUES ARE THE SQUARE ROOTS OF AᵀA’S EIGENVALUES — NEVER THE EIGENVALUES '
      + 'THEMSELVES: for A=[[3,0],[0,4]]: AᵀA=[[9,0],[0,16]] (eigenvalues 9, 16), giving singular '
      + 'values σ₁=√16=4, σ₂=√9=3 (sorted DECREASING). Reporting 9 and 16 directly as the singular '
      + 'values (forgetting the square root) is wrong — the singular values are specifically the '
      + 'SQUARE ROOTS of AᵀA’s eigenvalues, a genuinely different set of numbers.\n\n'
      + 'SINGULAR VALUES EXIST FOR EVERY MATRIX — GENERALIZING EIGENVALUES BEYOND SQUARE MATRICES: '
      + 'for a 3×2 matrix A (non-square, so EIGENVALUES aren’t even DEFINED for A itself): AᵀA is a '
      + '2×2 SYMMETRIC matrix with well-defined eigenvalues, giving 2 singular values. Singular '
      + 'values exist for this rectangular matrix PRECISELY BECAUSE they come from the '
      + 'always-square, always-symmetric AᵀA, never from A directly — making them the more '
      + 'universal "strength" measure, applicable where eigenvalues simply don’t apply.\n\n'
      + 'σ₁ IS THE OPERATOR 2-NORM — THE LARGEST SINGULAR VALUE ALONE, NEVER AN AVERAGE OR SUM: for '
      + 'A=[[3,0],[0,4]]: the operator 2-norm ‖A‖=σ₁=4 — the MAXIMUM stretching factor over ALL '
      + 'unit vectors, achieved along the direction where A’s effect is strongest (here, 4>3). '
      + 'Assuming the operator norm is some AVERAGE (3.5) or SUM (7) of the singular values '
      + 'misunderstands the question being asked: the operator norm asks "what is the MAXIMUM '
      + 'possible stretching," never a blended or total measure across all directions.',
    targetedMisconceptions: [`${SINGULAR_VALUES}:MC-1`, `${SINGULAR_VALUES}:MC-2`],
    source: eb(SINGULAR_VALUES, 'Core Understanding — singular values as the square roots of AᵀA’s eigenvalues, their existence for every matrix generalizing eigenvalues beyond square matrices, and the operator 2-norm as the single largest singular value rather than an average or sum'),
  },
  {
    conceptId: PSEUDOINVERSE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Σ⁺ INVERTS NONZERO SINGULAR VALUES AND LEAVES ZERO ONES AS ZERO — NEVER ATTEMPTING TO '
      + 'INVERT ZERO: for Σ=diag(2,5,0): construct Σ⁺ by inverting the NONZERO entries (1/2, 1/5) '
      + 'and leaving the ZERO entry as EXACTLY 0: Σ⁺=diag(1/2,1/5,0). Attempting to invert EVERY '
      + 'entry INCLUDING the zero (producing an undefined 1/0, or some placeholder like "∞") is '
      + 'wrong — the zero-singular-value case is meant to stay EXACTLY 0, by definition, precisely '
      + 'because that transformation mode has no strength at all to invert.\n\n'
      + 'x̂=A⁺b GIVES THE MINIMUM-NORM SOLUTION AMONG ALL VALID SOLUTIONS — NEVER JUST "A" '
      + 'SOLUTION: for an UNDERDETERMINED system Ax=b (more unknowns than equations, infinitely '
      + 'many exact solutions): x̂=A⁺b specifically picks out the solution with the SMALLEST norm '
      + 'among ALL the infinitely many valid solutions — not merely one of them arbitrarily, but '
      + 'the uniquely shortest one. This works for ANY matrix A — overdetermined, underdetermined, '
      + 'or exactly determined — unlike the ordinary inverse, which requires a square, invertible '
      + 'matrix and simply doesn’t apply otherwise.\n\n'
      + 'A⁺=A⁻¹ EXACTLY WHEN A IS INVERTIBLE — THE PSEUDOINVERSE GENERALIZES, NEVER REPLACES, THE '
      + 'ORDINARY INVERSE: for an invertible 2×2 matrix A with all singular values nonzero: '
      + 'A⁺=VΣ⁻¹Uᵀ, and verifying A⁺A=I directly confirms A⁺=A⁻¹ EXACTLY. Assuming the pseudoinverse '
      + 'must ALWAYS differ from the ordinary inverse (treating them as fundamentally separate '
      + 'objects even for square invertible matrices) is wrong — they COINCIDE exactly whenever '
      + 'A⁻¹ exists; the pseudoinverse only introduces genuinely NEW behavior when the ordinary '
      + 'inverse does NOT exist.',
    targetedMisconceptions: [`${PSEUDOINVERSE}:MC-1`, `${PSEUDOINVERSE}:MC-2`],
    source: eb(PSEUDOINVERSE, 'Core Understanding — Σ⁺ inverting nonzero singular values while leaving zero ones exactly zero, x̂=A⁺b as the minimum-norm solution among infinitely many for any matrix, and A⁺=A⁻¹ exactly when A is invertible as a generalization rather than a replacement'),
  },
  {
    conceptId: UNIT_VECTOR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A UNIT VECTOR HAS NORM EXACTLY 1 — CHECKED BY DIRECT COMPUTATION, NEVER ASSUMED: reusing '
      + 'math.linalg.norm’s own computation directly, a vector qualifies only if ‖v‖=1, checked by '
      + 'direct computation. Any nonzero vector v can be converted into a unit vector pointing in '
      + 'the SAME direction by NORMALIZING: v̂=v/‖v‖ — dividing EVERY component of v by its own '
      + 'norm ‖v‖, applied uniformly across the whole vector. This rescales length to exactly 1 '
      + 'while preserving direction entirely.\n\n'
      + 'NORMALIZING DIVIDES EVERY COMPONENT BY THE SAME NORM — NEVER JUST PART OF THE VECTOR: for '
      + 'v=(3,4): ‖v‖=√(9+16)=5, so v̂=(3/5,4/5)=(0.6,0.8) — BOTH components divided by the SAME '
      + 'value 5, verified to have norm √(0.36+0.64)=1 exactly. Dividing only one component, or '
      + 'applying some other operation like subtracting the norm, corrupts the direction rather '
      + 'than preserving it.\n\n'
      + 'THE STANDARD BASIS VECTORS e₁=(1,0,…,0), e₂=(0,1,0,…,0), ETC., ARE THE CANONICAL UNIT '
      + 'VECTORS IN ℝⁿ: each has a single component equal to exactly 1 (in a different position) '
      + 'and all others 0, and each has norm exactly 1 by direct computation (√(1²+0²+⋯)=1). A '
      + 'vector with a single nonzero entry that is NOT exactly 1 (e.g. (5,0,0)) is not a standard '
      + 'basis vector — it is not even a unit vector at all, since its norm is 5, not 1.',
    targetedMisconceptions: [`${UNIT_VECTOR}:MC-1`, `${UNIT_VECTOR}:MC-2`],
    source: eb(UNIT_VECTOR, 'Core Understanding — a unit vector requiring norm exactly 1 checked by direct computation, normalization dividing every component by the same norm value, and the standard basis vectors requiring the nonzero entry to be exactly 1 rather than merely a matching zero pattern'),
  },
]

export const MATHEMATICS_LINALG_SINGULAR_VALUES_PSEUDOINVERSE_UNIT_VECTOR_PROBES: SeedProbe[] = [
  {
    conceptId: SINGULAR_VALUES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For A=[[3,0],[0,4]], AᵀA=[[9,0],[0,16]] has eigenvalues 9 and 16. What are A’s singular values (largest first)?',
    choices: [
      { text: 'σ₁=4, σ₂=3 — the SQUARE ROOTS of AᵀA’s eigenvalues (√16=4, √9=3), sorted decreasing, never the raw eigenvalues themselves', isCorrect: true },
      { text: 'σ₁=16, σ₂=9 — the singular values are simply AᵀA’s eigenvalues used directly, sorted from largest to smallest', isCorrect: false, misconceptionId: `${SINGULAR_VALUES}:MC-1` },
      { text: "σ₁=9, σ₂=16 — the eigenvalues themselves, listed in the order they were computed", isCorrect: false, misconceptionId: `${SINGULAR_VALUES}:MC-1` },
    ],
    targetedMisconceptions: [`${SINGULAR_VALUES}:MC-1`],
    source: eb(SINGULAR_VALUES, 'Demonstration 1 — the direct square-root derivation for A=[[3,0],[0,4]]’s singular values, directly breaking SINGULAR-VALUES-REPORTED-AS-A-TRANSPOSE-A-EIGENVALUES-WITHOUT-SQUARE-ROOT'),
  },
  {
    conceptId: SINGULAR_VALUES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For A=[[3,0],[0,4]] with singular values 4 and 3, is the operator 2-norm ‖A‖ the average of the singular values, or something else?',
    choices: [
      { text: 'Something else — the operator 2-norm is the single LARGEST singular value alone (σ₁=4), the MAXIMUM stretching factor over all unit vectors, never an average or sum across all directions', isCorrect: true },
      { text: 'The average — ‖A‖ equals (4+3)/2=3.5, the mean of all the singular values', isCorrect: false, misconceptionId: `${SINGULAR_VALUES}:MC-2` },
      { text: "The sum — ‖A‖ equals 4+3=7, the total of all the singular values combined", isCorrect: false, misconceptionId: `${SINGULAR_VALUES}:MC-2` },
    ],
    targetedMisconceptions: [`${SINGULAR_VALUES}:MC-2`],
    source: eb(SINGULAR_VALUES, 'Demonstration 3 — the operator-norm-as-largest-singular-value contrast against incorrect averaging/summing alternatives for A=[[3,0],[0,4]], directly breaking OPERATOR-NORM-COMPUTED-AS-AVERAGE-OR-SUM-OF-SINGULAR-VALUES-RATHER-THAN-THE-LARGEST'),
  },
  {
    conceptId: SINGULAR_VALUES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For the 3×2 matrix B=[[6,0],[0,8],[0,0]] (non-square, so B has no eigenvalues of its own), BᵀB=[[36,0],[0,64]] has eigenvalues 36 and 64. What are B’s singular values?',
    choices: [
      { text: 'σ₁=8, σ₂=6 — the square roots √64=8 and √36=6, sorted largest first; singular values exist here PRECISELY because they come from the always-square, always-symmetric BᵀB, never from B directly', isCorrect: true },
      { text: 'σ₁=64, σ₂=36 — since B has no eigenvalues of its own, BᵀB’s eigenvalues are used directly as the singular values without any further step', isCorrect: false, misconceptionId: `${SINGULAR_VALUES}:MC-1` },
      { text: "The singular values are undefined, since a non-square matrix cannot have singular values any more than it can have eigenvalues", isCorrect: false, misconceptionId: `${SINGULAR_VALUES}:MC-1` },
    ],
    targetedMisconceptions: [`${SINGULAR_VALUES}:MC-1`],
    source: eb(SINGULAR_VALUES, 'Demonstration 2 and Assessment Signals Rung 2 — a fresh non-square worked example (BᵀB=diag(36,64)) combining the square-root requirement with singular values existing where eigenvalues don’t, directly breaking SINGULAR-VALUES-REPORTED-AS-A-TRANSPOSE-A-EIGENVALUES-WITHOUT-SQUARE-ROOT a second, independent way since singular-values.md registers only two misconceptions'),
  },
  {
    conceptId: PSEUDOINVERSE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For Σ=diag(2,5,0), what is Σ⁺?',
    choices: [
      { text: 'Σ⁺=diag(1/2,1/5,0) — inverting the NONZERO entries (1/2, 1/5) and leaving the ZERO entry as EXACTLY 0, since that transformation mode has no strength at all to invert', isCorrect: true },
      { text: 'Σ⁺=diag(1/2,1/5,∞) — inverting every entry, including the zero, which produces an infinite placeholder for that position', isCorrect: false, misconceptionId: `${PSEUDOINVERSE}:MC-1` },
      { text: "Σ⁺ is undefined, since a diagonal matrix containing a zero entry cannot be inverted at all, even partially", isCorrect: false, misconceptionId: `${PSEUDOINVERSE}:MC-1` },
    ],
    targetedMisconceptions: [`${PSEUDOINVERSE}:MC-1`],
    source: eb(PSEUDOINVERSE, 'Demonstration 1 — the direct Σ⁺ construction for Σ=diag(2,5,0), correctly leaving the zero entry unchanged, directly breaking ZERO-SINGULAR-VALUES-INCORRECTLY-INVERTED-OR-TREATED-AS-UNDEFINED-IN-SIGMA-PLUS'),
  },
  {
    conceptId: PSEUDOINVERSE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For an invertible 2×2 matrix A with all singular values nonzero, does the pseudoinverse A⁺ always differ from the ordinary inverse A⁻¹?',
    choices: [
      { text: 'No — verifying A⁺A=I directly confirms A⁺=A⁻¹ EXACTLY whenever A is square and invertible; the pseudoinverse generalizes, never replaces, the ordinary inverse', isCorrect: true },
      { text: 'Yes — the pseudoinverse is a fundamentally different object from the ordinary inverse, even for a square invertible matrix', isCorrect: false, misconceptionId: `${PSEUDOINVERSE}:MC-2` },
      { text: "Yes, since A⁺ is defined via the SVD while A⁻¹ is defined via elimination, so the two constructions can never produce the same result", isCorrect: false, misconceptionId: `${PSEUDOINVERSE}:MC-2` },
    ],
    targetedMisconceptions: [`${PSEUDOINVERSE}:MC-2`],
    source: eb(PSEUDOINVERSE, 'Demonstration 3 — the direct A⁺A=I verification for an invertible matrix, confirming A⁺=A⁻¹, directly breaking PSEUDOINVERSE-ASSUMED-ALWAYS-DIFFERENT-FROM-ORDINARY-INVERSE'),
  },
  {
    conceptId: PSEUDOINVERSE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For a different diagonal matrix Σ=diag(4,0,10), what is Σ⁺?',
    choices: [
      { text: 'Σ⁺=diag(1/4,0,1/10) — inverting the NONZERO entries (1/4, 1/10) and leaving the ZERO entry at position 2 as EXACTLY 0, never attempting to invert it', isCorrect: true },
      { text: 'Σ⁺=diag(1/4,1,1/10) — since the zero entry cannot be inverted, it is replaced with 1 as a neutral placeholder instead', isCorrect: false, misconceptionId: `${PSEUDOINVERSE}:MC-1` },
      { text: "Σ⁺ cannot be computed for this matrix, since one of its diagonal entries is exactly zero", isCorrect: false, misconceptionId: `${PSEUDOINVERSE}:MC-1` },
    ],
    targetedMisconceptions: [`${PSEUDOINVERSE}:MC-1`],
    source: eb(PSEUDOINVERSE, 'Tutor Actions and Memory Hooks — a fresh Σ construction (diag(4,0,10)) with the zero entry in a different position than Demonstration 1, directly breaking ZERO-SINGULAR-VALUES-INCORRECTLY-INVERTED-OR-TREATED-AS-UNDEFINED-IN-SIGMA-PLUS a second, independent way since pseudoinverse.md registers only two misconceptions'),
  },
  {
    conceptId: UNIT_VECTOR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'To normalize v=(3,4) into a unit vector, ‖v‖=5. What is v̂?',
    choices: [
      { text: 'v̂=(0.6,0.8) — dividing EVERY component of v by the SAME norm value 5, giving (3/5,4/5), verified to have norm exactly 1', isCorrect: true },
      { text: 'v̂=(0.6,4) — dividing only the first component by 5 and leaving the second component unchanged', isCorrect: false, misconceptionId: `${UNIT_VECTOR}:MC-1` },
      { text: "v̂=(-2,-1) — subtracting the norm 5 from each component of v", isCorrect: false, misconceptionId: `${UNIT_VECTOR}:MC-1` },
    ],
    targetedMisconceptions: [`${UNIT_VECTOR}:MC-1`],
    source: eb(UNIT_VECTOR, 'Demonstration 2 — normalizing (3,4) by dividing both components by the norm 5, verified to have norm exactly 1, directly breaking NORMALIZATION-APPLIED-TO-ONLY-PART-OF-THE-VECTOR'),
  },
  {
    conceptId: UNIT_VECTOR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is (5,0,0) a standard basis vector, since it has the same single-nonzero-entry zero pattern as e₁=(1,0,0)?',
    choices: [
      { text: 'No — a standard basis vector needs its nonzero entry to be exactly 1; (5,0,0) has norm 5, not 1, so it is not even a unit vector at all, despite matching e₁’s zero pattern', isCorrect: true },
      { text: 'Yes — any vector with a single nonzero entry and the rest zero qualifies as a standard basis vector, regardless of the nonzero entry’s specific value', isCorrect: false, misconceptionId: `${UNIT_VECTOR}:MC-2` },
      { text: "Yes, since the zero pattern alone (one nonzero position, rest zero) is what defines a standard basis vector", isCorrect: false, misconceptionId: `${UNIT_VECTOR}:MC-2` },
    ],
    targetedMisconceptions: [`${UNIT_VECTOR}:MC-2`],
    source: eb(UNIT_VECTOR, 'Demonstration 3 — comparing e₁=(1,0,0) (norm 1, genuine standard basis vector) against (5,0,0) (norm 5, not a unit vector at all despite the identical zero pattern), directly breaking STANDARD-BASIS-VECTOR-IDENTIFIED-BY-ZERO-PATTERN-ALONE'),
  },
  {
    conceptId: UNIT_VECTOR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'To normalize a different vector w=(5,12), ‖w‖=13. What is ŵ?',
    choices: [
      { text: 'ŵ=(5/13,12/13) — dividing EVERY component of w by the SAME norm value 13, verified to have norm √((5/13)²+(12/13)²)=1 exactly', isCorrect: true },
      { text: 'ŵ=(5/13,12) — dividing only the first component by 13 and leaving the second component unchanged', isCorrect: false, misconceptionId: `${UNIT_VECTOR}:MC-1` },
      { text: "ŵ=(1,1) — since normalizing simply means rounding each nonzero component to 1", isCorrect: false, misconceptionId: `${UNIT_VECTOR}:MC-1` },
    ],
    targetedMisconceptions: [`${UNIT_VECTOR}:MC-1`],
    source: eb(UNIT_VECTOR, 'Assessment Signals Rung 2/3 — a fresh normalization example (w=(5,12), ‖w‖=13) distinct from Demonstration 2’s (3,4) case, directly breaking NORMALIZATION-APPLIED-TO-ONLY-PART-OF-THE-VECTOR a second, independent way since unit-vector.md registers only two misconceptions'),
  },
]
