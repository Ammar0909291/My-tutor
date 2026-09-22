/**
 * Batch: dimension, coordinates, diagonalization (math.linalg).
 *
 * Continuing math.linalg (35/61 -> 38/61). Fresh frontier recompute found
 * 13 ready concepts. Selected dimension — its authoring completes the
 * final remaining prerequisite of rank-nullity (rank, null-space, and
 * column-space were already authored in Batches 111-112) — plus
 * coordinates (unlocks change-of-basis, extending the basis family from
 * Batch 113) and diagonalization (unlocks matrix-exponential, converging
 * eigenvalues [Batch 103], eigenspace [Batch 113], and matrix-inverse
 * [Batch 103]).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.linalg.{dimension,coordinates,diagonalization}.md.
 *
 *   DIMENSION  every basis of the same space has the IDENTICAL size —
 *           dimension is a well-defined property of the SPACE itself,
 *           never dependent on which particular basis is examined; a
 *           subspace and its orthogonal complement's dimensions SUM to
 *           the ambient dimension, never required to be EQUAL to each
 *           other.
 *   COORDINATES  coordinates genuinely DEPEND on the chosen basis — the
 *           SAME vector has DIFFERENT coordinate vectors in different
 *           bases, with the standard basis just one convenient choice
 *           among many, never the only "true" representation; recovering
 *           v from [v]β requires substituting into v=c₁b₁+⋯+cₙbₙ using
 *           the ACTUAL basis vectors, never reading the coordinate
 *           numbers directly as standard components.
 *   DIAGONALIZATION  P's columns and D's diagonal entries must be in
 *           MATCHING eigenvector-eigenvalue order — mismatching produces
 *           a factorization that provably does NOT reconstruct A;
 *           diagonal powers are computed ENTRYWISE (Aᵏ=PDᵏP⁻¹), the
 *           central practical payoff of diagonalizing; a repeated
 *           eigenvalue is a FLAG TO CHECK, never an automatic verdict —
 *           diagonalizability requires comparing algebraic against
 *           geometric multiplicity directly, in either direction.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const DIMENSION = 'math.linalg.dimension'
const COORDINATES = 'math.linalg.coordinates'
const DIAGONALIZATION = 'math.linalg.diagonalization'

export const MATHEMATICS_LINALG_DIMENSION_COORDINATES_DIAGONALIZATION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DIMENSION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'DIMENSION BELONGS TO THE SPACE, NEVER TO ANY PARTICULAR BASIS: for ℝ²: the standard basis '
      + '{(1,0),(0,1)} has 2 vectors. The structurally DIFFERENT basis {(1,1),(1,-1)} (verified '
      + 'independent and spanning) ALSO has exactly 2 vectors — never more or fewer. This is a '
      + 'NON-OBVIOUS but foundational theorem: different-looking bases could, in principle, have '
      + 'different sizes, EXCEPT that they provably never do — dimension is a well-defined property '
      + 'of the SPACE ITSELF, never dependent on which particular basis happens to be examined.\n\n'
      + 'COMPLEMENT DIMENSIONS SUM TO THE TOTAL — THEY DON’T HAVE TO MATCH EACH OTHER: in ℝ³ '
      + '(dim=3): a 2-dimensional plane U through the origin has orthogonal complement U⊥ (a line '
      + 'perpendicular to it, dimension 1). Check: dim(U)+dim(U⊥)=2+1=3=dim(ℝ³) — the dimensions '
      + 'SUM to the ambient dimension. Assuming U and U⊥ must be EQUAL (e.g. expecting both to be '
      + '"half" the ambient dimension) is wrong: a 2D plane’s complement in 3D space is a 1D line, '
      + 'genuinely UNEQUAL to U’s own dimension, yet the two still sum correctly to 3.',
    targetedMisconceptions: [`${DIMENSION}:MC-1`, `${DIMENSION}:MC-2`],
    source: eb(DIMENSION, 'Core Understanding — every basis of the same space having the identical size regardless of which basis is chosen, and orthogonal-complement dimensions summing to the ambient dimension rather than being required equal'),
  },
  {
    conceptId: COORDINATES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'COORDINATES ARE RELATIVE TO A SPECIFIC BASIS — THE STANDARD BASIS IS JUST ONE CONVENIENT '
      + 'CHOICE, NEVER THE ONLY TRUE ONE: for v=(5,3): relative to β={(1,1),(1,-1)}: solving '
      + '5=c₁+c₂, 3=c₁-c₂ gives c₁=4, c₂=1, so [v]β=(4,1) (verify: 4(1,1)+1(1,-1)=(5,3)). Relative '
      + 'to the STANDARD basis {(1,0),(0,1)}: coordinates are simply (5,3). The SAME underlying '
      + 'vector has coordinate vectors (4,1) and (5,3) — genuinely DIFFERENT numerical '
      + 'representations, with NEITHER more "legitimate" than the other; the familiar "standard '
      + 'components" are just coordinates relative to ONE particular (conventional) basis choice '
      + 'among many.\n\n'
      + 'TO RECOVER THE VECTOR, PLUG COORDINATES INTO THE ACTUAL BASIS VECTORS — NEVER READ THEM AS '
      + 'STANDARD COMPONENTS DIRECTLY: given [v]β=(2,3) relative to β={(2,0),(0,3)} (a non-standard '
      + 'basis): v=2(2,0)+3(0,3)=(4,0)+(0,9)=(4,9) — NOT (2,3). Misreading the coordinate vector’s '
      + 'numbers as if they WERE the vector’s standard components directly skips the essential '
      + 'step of substituting into v=c₁b₁+c₂b₂ using the SPECIFIC basis vectors — the coordinate '
      + 'vector’s meaning is ENTIRELY tied to which basis produced it.',
    targetedMisconceptions: [`${COORDINATES}:MC-1`, `${COORDINATES}:MC-2`],
    source: eb(COORDINATES, 'Core Understanding — coordinates genuinely depending on the chosen basis with the standard basis being just one choice among many, and recovering v from [v]β requiring substitution into the actual basis vectors rather than reading coordinates as standard components'),
  },
  {
    conceptId: DIAGONALIZATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'P’S COLUMNS AND D’S DIAGONAL MUST BE MATCHED PAIRS — NEVER MIXED UP: for A=[[4,1],[2,3]] '
      + 'with λ₁=5 (eigenvector (1,1)) and λ₂=2 (eigenvector (1,-2)): P=[[1,1],[1,-2]], '
      + 'D=diag(5,2) — column 1 of P (the λ₁=5 eigenvector) MUST pair with D’s first diagonal '
      + 'entry. Mismatching the order (e.g. keeping P’s columns as-is but writing D=diag(2,5)) '
      + 'produces a factorization that provably does NOT reconstruct A when multiplied out — the '
      + 'pairing is not optional bookkeeping, it’s essential to the factorization’s correctness.\n\n'
      + 'DIAGONAL POWERS ARE ENTRYWISE — THAT’S THE WHOLE POINT OF DIAGONALIZING: Aᵏ=(PDP⁻¹)ᵏ=PDᵏP⁻¹ '
      + '(the P⁻¹P pairs cancel in between). Computing A¹⁰ for the above: D¹⁰=diag(5¹⁰,2¹⁰)= '
      + 'diag(9765625,1024) — computed by raising each diagonal entry independently, avoiding 10 '
      + 'successive 2×2 matrix multiplications entirely. This dramatic efficiency gain is '
      + 'diagonalization’s central practical reason for existing.\n\n'
      + 'A REPEATED EIGENVALUE IS A FLAG TO CHECK MULTIPLICITIES, NEVER A VERDICT BY ITSELF: for '
      + 'A=[[2,1],[0,2]]: λ=2 has ALGEBRAIC multiplicity 2, but solving (A−2I)v=0 gives only a '
      + 'ONE-dimensional eigenspace (GEOMETRIC multiplicity 1). Since geometric (1) < algebraic (2), '
      + 'A is NOT diagonalizable. But contrast A=2I: ALSO a repeated eigenvalue, yet ALREADY '
      + 'diagonal with geometric multiplicity 2 — trivially diagonalizable. Assuming ANY repeated '
      + 'eigenvalue automatically means non-diagonalizable (or automatically means diagonalizable) '
      + 'is wrong either way — the actual comparison must always be checked directly.',
    targetedMisconceptions: [`${DIAGONALIZATION}:MC-1`, `${DIAGONALIZATION}:MC-2`],
    source: eb(DIAGONALIZATION, 'Core Understanding — P and D requiring matched eigenvector-eigenvalue column order, diagonal powers computed entrywise as the central practical payoff, and a repeated eigenvalue requiring an explicit algebraic-vs-geometric multiplicity comparison rather than an automatic verdict'),
  },
]

export const MATHEMATICS_LINALG_DIMENSION_COORDINATES_DIAGONALIZATION_PROBES: SeedProbe[] = [
  {
    conceptId: DIMENSION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'The standard basis {(1,0),(0,1)} for ℝ² has 2 vectors. Could a structurally different, equally valid basis for ℝ², like {(1,1),(1,-1)}, have a different number of vectors?',
    choices: [
      { text: 'No — every basis of the same space has the IDENTICAL size, a non-obvious but foundational theorem; {(1,1),(1,-1)} also has exactly 2 vectors, since dimension is a property of the space itself, never of which basis happens to be chosen', isCorrect: true },
      { text: 'Yes — different valid bases of the same vector space could have different numbers of vectors, depending on how the basis vectors happen to be arranged', isCorrect: false, misconceptionId: `${DIMENSION}:MC-1` },
      { text: "Yes, since the size of a basis reflects properties specific to that particular set of vectors rather than any property of the space itself", isCorrect: false, misconceptionId: `${DIMENSION}:MC-1` },
    ],
    targetedMisconceptions: [`${DIMENSION}:MC-1`],
    source: eb(DIMENSION, 'Demonstration 1 — the direct vector-count verification for two structurally different bases of ℝ², both confirmed to have exactly 2 vectors, directly breaking DIFFERENT-BASES-ASSUMED-TO-HAVE-DIFFERENT-SIZES'),
  },
  {
    conceptId: DIMENSION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'In ℝ³ (dim=3), a 2-dimensional plane U through the origin has orthogonal complement U⊥. Must dim(U) equal dim(U⊥)?',
    choices: [
      { text: 'No — dim(U)+dim(U⊥)=dim(ℝ³)=3; here U⊥ is a 1-dimensional line, so 2+1=3, and the two dimensions SUM to the ambient dimension rather than being required equal to each other', isCorrect: true },
      { text: 'Yes — a subspace and its orthogonal complement must always have equal dimensions, since "complement" implies an equal, symmetric split of the ambient space', isCorrect: false, misconceptionId: `${DIMENSION}:MC-2` },
      { text: "Yes, because the orthogonal complement is defined specifically to match the dimension of the original subspace in every case", isCorrect: false, misconceptionId: `${DIMENSION}:MC-2` },
    ],
    targetedMisconceptions: [`${DIMENSION}:MC-2`],
    source: eb(DIMENSION, 'Demonstration 2 — the plane/line orthogonal-complement dimension check in ℝ³, confirming 2+1=3 rather than an equal split, directly breaking ORTHOGONAL-COMPLEMENT-DIMENSIONS-ASSUMED-EQUAL'),
  },
  {
    conceptId: DIMENSION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A 3-dimensional subspace W of ℝ⁵ has orthogonal complement W⊥. What is dim(W⊥)?',
    choices: [
      { text: 'dim(W⊥)=2 — since dim(W)+dim(W⊥) must sum to dim(ℝ⁵)=5, and dim(W)=3, the complement’s dimension is 5−3=2, not required to equal dim(W) itself', isCorrect: true },
      { text: 'dim(W⊥)=3 — the orthogonal complement of any subspace always has the same dimension as the subspace itself', isCorrect: false, misconceptionId: `${DIMENSION}:MC-2` },
      { text: 'dim(W⊥) cannot be determined without knowing the specific vectors that span W, since dimension is not solely determined by dim(W) and the ambient dimension', isCorrect: false, misconceptionId: `${DIMENSION}:MC-2` },
    ],
    targetedMisconceptions: [`${DIMENSION}:MC-2`],
    source: eb(DIMENSION, 'Assessment Signals Rung 3 — correctly applying the orthogonal-complement dimension formula in a new setting, directly breaking ORTHOGONAL-COMPLEMENT-DIMENSIONS-ASSUMED-EQUAL'),
  },
  {
    conceptId: COORDINATES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'The vector v=(5,3) has standard-basis coordinates (5,3) and coordinates (4,1) relative to β={(1,1),(1,-1)}. Is the standard-basis representation (5,3) more "true" or "legitimate" than (4,1)?',
    choices: [
      { text: 'No — both coordinate vectors reconstruct the exact same v (4(1,1)+1(1,-1)=(5,3)); the standard basis is just one conventional choice among infinitely many equally valid bases, never the only "true" representation', isCorrect: true },
      { text: 'Yes — a vector’s standard-basis coordinates are its only legitimate representation, and coordinates relative to any other basis are less valid', isCorrect: false, misconceptionId: `${COORDINATES}:MC-1` },
      { text: "Yes, because the standard basis is the mathematically correct default, while other bases produce merely approximate or secondary representations", isCorrect: false, misconceptionId: `${COORDINATES}:MC-1` },
    ],
    targetedMisconceptions: [`${COORDINATES}:MC-1`],
    source: eb(COORDINATES, 'Demonstration 1 — the direct side-by-side computation of v=(5,3)’s coordinates in the standard basis versus {(1,1),(1,-1)}, both verified to reconstruct v correctly, directly breaking STANDARD-COORDINATES-TREATED-AS-THE-ONLY-TRUE-REPRESENTATION'),
  },
  {
    conceptId: COORDINATES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Given [v]β=(2,3) relative to the non-standard basis β={(2,0),(0,3)}, is v itself equal to (2,3)?',
    choices: [
      { text: 'No — v=2(2,0)+3(0,3)=(4,0)+(0,9)=(4,9), NOT (2,3); recovering v requires substituting the coordinate numbers into the ACTUAL basis vectors, never reading them directly as standard components', isCorrect: true },
      { text: 'Yes — the coordinate vector (2,3) directly gives v’s standard components, since coordinate numbers and standard components always coincide', isCorrect: false, misconceptionId: `${COORDINATES}:MC-2` },
      { text: "Yes, because a coordinate vector relative to any basis always equals the vector's own standard-basis representation", isCorrect: false, misconceptionId: `${COORDINATES}:MC-2` },
    ],
    targetedMisconceptions: [`${COORDINATES}:MC-2`],
    source: eb(COORDINATES, 'Demonstration 2 — the [v]β=(2,3) reconstruction for β={(2,0),(0,3)}, showing the actual vector is (4,9) not (2,3), directly breaking NON-STANDARD-COORDINATE-VECTOR-MISREAD-AS-STANDARD-COMPONENTS'),
  },
  {
    conceptId: COORDINATES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Given [w]γ=(1,2) relative to γ={(3,0),(0,-1)}, what is the actual vector w?',
    choices: [
      { text: 'w=1(3,0)+2(0,-1)=(3,0)+(0,-2)=(3,-2) — computed by substituting the coordinate numbers into the actual basis vectors of γ, not by reading (1,2) as w’s standard components', isCorrect: true },
      { text: 'w=(1,2) — the coordinate vector’s numbers directly give w’s standard components regardless of which basis γ is used', isCorrect: false, misconceptionId: `${COORDINATES}:MC-2` },
      { text: 'w cannot be determined without additional information beyond the coordinate vector and the basis vectors themselves', isCorrect: false, misconceptionId: `${COORDINATES}:MC-2` },
    ],
    targetedMisconceptions: [`${COORDINATES}:MC-2`],
    source: eb(COORDINATES, 'Assessment Signals Rung 3 — correctly reconstructing a vector from its coordinates relative to a new non-standard basis, directly breaking NON-STANDARD-COORDINATE-VECTOR-MISREAD-AS-STANDARD-COMPONENTS'),
  },
  {
    conceptId: DIAGONALIZATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For A=[[4,1],[2,3]] with λ₁=5 (eigenvector (1,1)) and λ₂=2 (eigenvector (1,-2)), P has (1,1) as its first column and (1,-2) as its second. Should D be diag(5,2) or diag(2,5)?',
    choices: [
      { text: 'diag(5,2) — column 1 of P (the λ₁=5 eigenvector) must pair with D’s first diagonal entry; the eigenvector-eigenvalue order must match between P’s columns and D’s diagonal, or the factorization does not reconstruct A', isCorrect: true },
      { text: 'diag(2,5) — since P and D are built and can be ordered independently, either diagonal ordering produces an equally valid factorization of A', isCorrect: false, misconceptionId: `${DIAGONALIZATION}:MC-1` },
      { text: 'Either ordering works equally well, since P and D only need to individually contain the correct eigenvectors and eigenvalues, with no required correspondence between them', isCorrect: false, misconceptionId: `${DIAGONALIZATION}:MC-1` },
    ],
    targetedMisconceptions: [`${DIAGONALIZATION}:MC-1`],
    source: eb(DIAGONALIZATION, 'Demonstration 1 — the direct P/D construction and reconstruction check for A=[[4,1],[2,3]], directly breaking EIGENVECTOR-EIGENVALUE-ORDER-MISMATCHED-BETWEEN-P-AND-D'),
  },
  {
    conceptId: DIAGONALIZATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A=[[2,1],[0,2]] has a repeated eigenvalue λ=2 with algebraic multiplicity 2. Does this alone tell you whether A is diagonalizable?',
    choices: [
      { text: 'No — a repeated eigenvalue is a FLAG to check multiplicities, never an automatic verdict; here (A−2I)v=0 gives only a 1-dimensional eigenspace (geometric multiplicity 1 < algebraic multiplicity 2), so A is NOT diagonalizable, but A=2I would ALSO have a repeated eigenvalue yet be trivially diagonalizable', isCorrect: true },
      { text: 'Yes — any repeated eigenvalue automatically means the matrix is NOT diagonalizable, since a repeated root always signals insufficient independent eigenvectors', isCorrect: false, misconceptionId: `${DIAGONALIZATION}:MC-2` },
      { text: 'Yes, because a repeated eigenvalue always guarantees the matrix IS diagonalizable, since the eigenvalue simply appears with higher weight in the diagonal', isCorrect: false, misconceptionId: `${DIAGONALIZATION}:MC-2` },
    ],
    targetedMisconceptions: [`${DIAGONALIZATION}:MC-2`],
    source: eb(DIAGONALIZATION, 'Demonstration 3 — the non-diagonalizable [[2,1],[0,2]] case contrasted directly with the trivially-diagonalizable A=2I, directly breaking REPEATED-EIGENVALUE-DIAGONALIZABILITY-ASSUMED-WITHOUT-CHECKING-MULTIPLICITIES'),
  },
  {
    conceptId: DIAGONALIZATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For A=PDP⁻¹ with D=diag(5,2), computing A¹⁰ requires knowing D¹⁰. Is D¹⁰ computed by raising each diagonal entry separately, or by full matrix multiplication of D by itself 10 times?',
    choices: [
      { text: 'By raising each diagonal entry separately — D¹⁰=diag(5¹⁰,2¹⁰)=diag(9765625,1024), computed entrywise; this entrywise shortcut, avoiding 10 successive matrix multiplications, is diagonalization’s central practical payoff', isCorrect: true },
      { text: 'By full matrix multiplication — D must be multiplied by itself 10 times just like any general matrix, since diagonal matrices offer no computational shortcut for powers', isCorrect: false, misconceptionId: `${DIAGONALIZATION}:MC-1` },
      { text: "D¹⁰ cannot be computed without first converting back to A and computing A¹⁰ directly through repeated full matrix multiplication", isCorrect: false, misconceptionId: `${DIAGONALIZATION}:MC-1` },
    ],
    targetedMisconceptions: [`${DIAGONALIZATION}:MC-1`],
    source: eb(DIAGONALIZATION, 'Demonstration 2 — the A¹⁰ entrywise power computation via D¹⁰=diag(9765625,1024), avoiding successive matrix multiplications, illustrating the central practical payoff of diagonal powers being entrywise'),
  },
]
