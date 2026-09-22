/**
 * Batch: spectral-theorem, gram-schmidt, change-of-basis (math.linalg).
 *
 * Continuing math.linalg (41/61 -> 44/61). Fresh frontier recompute found
 * 14 ready concepts. Selected spectral-theorem (unlocks positive-definite,
 * converging symmetric-matrix [Batch 107], eigenvalues [Batch 103], and
 * orthogonal-basis [Batch 115]), gram-schmidt (unlocks qr-factorization,
 * converging orthogonal-basis and projection, both Batch 115), and
 * change-of-basis (closes the coordinates [Batch 114] + matrix-inverse
 * [Batch 103] convergence, terminal but valuable).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.linalg.{spectral-theorem,gram-schmidt,change-of-basis}.md.
 *
 *   SPECTRAL-THEOREM  every real symmetric matrix A=QΛQᵀ with Q ORTHOGONAL
 *           and Λ real diagonal — Q's orthogonality means Q⁻¹=Qᵀ FOR FREE,
 *           the genuinely SPECIAL feature distinguishing this from
 *           ordinary diagonalization A=PDP⁻¹, never conflated with it;
 *           constructing Q requires NORMALIZING eigenvectors, never using
 *           them raw — mutual perpendicularity alone is not orthogonality;
 *           the orthogonality guarantee covers only DIFFERENT eigenvalues
 *           — same-eigenvalue eigenvectors need their own Gram-Schmidt
 *           pass, never assumed automatically orthogonal.
 *   GRAM-SCHMIDT  each new vector must subtract projections onto EVERY
 *           previously constructed vector, never just the immediately
 *           preceding one — this requirement GROWS with vector count;
 *           normalization happens ONLY AFTER all orthogonalization is
 *           complete, never mid-sequence, since later projection formulas
 *           expect the current unnormalized vectors; the constructed
 *           vectors' orthogonality should be VERIFIED directly via
 *           pairwise dot products, never trusted blindly.
 *   CHANGE-OF-BASIS  P's columns come from the SOURCE basis, expressed in
 *           TARGET coordinates, never the reverse — building columns from
 *           the wrong basis reverses which direction the matrix actually
 *           converts; the reverse conversion requires P⁻¹, never
 *           reapplying P itself, since only P⁻¹ genuinely undoes P's
 *           effect; the similarity relation B=P⁻¹AP is not a new isolated
 *           formula but a direct extension of the same coordinate-
 *           conversion machinery.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const SPECTRAL_THEOREM = 'math.linalg.spectral-theorem'
const GRAM_SCHMIDT = 'math.linalg.gram-schmidt'
const CHANGE_OF_BASIS = 'math.linalg.change-of-basis'

export const MATHEMATICS_LINALG_SPECTRAL_THEOREM_GRAM_SCHMIDT_CHANGE_OF_BASIS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SPECTRAL_THEOREM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Q’S ORTHOGONALITY MAKES ITS INVERSE FREE — THAT’S THE WHOLE SPECIAL FEATURE: for '
      + 'A=[[2,1],[1,2]]: eigenvalues λ=1,3 with normalized eigenvectors e₁=(1/√2)(1,-1), '
      + 'e₂=(1/√2)(1,1), giving Q=[[1/√2,1/√2],[-1/√2,1/√2]]. Verify QᵀQ=I directly — CONFIRMED, '
      + 'with NO matrix inversion beyond transposing. Contrast a general non-symmetric '
      + 'diagonalizable B=[[2,1],[0,3]]: its change-of-basis matrix P=[[1,1],[0,1]] satisfies '
      + 'PᵀP=[[1,1],[1,2]]≠I — NOT orthogonal, so P⁻¹ genuinely requires real matrix inversion work '
      + 'the symmetric case never needed. This is the STRUCTURAL reason symmetric matrices receive '
      + 'dedicated theoretical treatment, not just another diagonalization with a fancier name.\n\n'
      + 'ORTHOGONAL MEANS UNIT LENGTH AND PERPENDICULAR — NORMALIZE BEFORE ASSEMBLING Q: assembling '
      + 'Q from UNNORMALIZED eigenvectors (e.g. the raw (1,-1) instead of (1/√2)(1,-1)) produces a '
      + 'matrix that is NOT actually orthogonal (its columns aren’t unit length), even though its '
      + 'columns might be mutually perpendicular. Normalization is a required step, never '
      + 'optional.\n\n'
      + 'THE ORTHOGONALITY GUARANTEE IS FOR DIFFERENT EIGENVALUES ONLY — SAME-EIGENVALUE '
      + 'EIGENVECTORS MAY NEED EXTRA WORK: the symmetric-matrix guarantee specifically covers '
      + 'eigenvectors corresponding to DIFFERENT eigenvalues. For a REPEATED eigenvalue, the '
      + 'multiple eigenvectors within that SAME eigenspace are NOT automatically guaranteed '
      + 'orthogonal to each other by symmetry alone — they may need an EXTRA orthogonalization step '
      + '(e.g. Gram-Schmidt) applied within that eigenspace before assembling Q.',
    targetedMisconceptions: [`${SPECTRAL_THEOREM}:MC-1`, `${SPECTRAL_THEOREM}:MC-2`, `${SPECTRAL_THEOREM}:MC-3`],
    source: eb(SPECTRAL_THEOREM, 'Core Understanding — Q’s orthogonality giving Q⁻¹=Qᵀ for free as the genuinely special feature versus ordinary diagonalization, normalization as a required step in constructing Q, and the orthogonality guarantee covering only different eigenvalues'),
  },
  {
    conceptId: GRAM_SCHMIDT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'SUBTRACT FROM EVERY VECTOR BUILT SO FAR — NOT JUST THE MOST RECENT ONE: for v₁=(1,1,0), '
      + 'v₂=(1,0,1), v₃=(0,1,1): u₁=v₁; u₂=v₂−proju₁(v₂)=(0.5,-0.5,1) — one subtraction so far. For '
      + 'u₃: the CORRECT computation subtracts BOTH proju₁(v₃) AND proju₂(v₃), giving '
      + 'u₃=(-0.667,0.667,0.667). Subtracting only the projection onto u₂ (the immediately '
      + 'preceding vector), forgetting u₁, leaves u₃ still NOT orthogonal to u₁ — only ONE of the '
      + 'two required orthogonality conditions was enforced. This structural requirement GROWS with '
      + 'the vector count: the k-th vector requires k−1 subtractions, never a fixed small '
      + 'number.\n\n'
      + 'ORTHOGONALIZE EVERYTHING FIRST, NORMALIZE LAST — NEVER INTERLEAVE THE TWO: the process has '
      + 'TWO distinct phases: first construct the FULL orthogonal set {u₁,…,uₖ} via iterative '
      + 'projection subtraction, THEN normalize each (ûᵢ=uᵢ/‖uᵢ‖) as a separate final pass. '
      + 'Normalizing prematurely (mid-sequence, before all uᵢ’s are constructed) risks corrupting '
      + 'later projection computations, since subsequent projection formulas expect the CURRENT '
      + '(possibly unnormalized) uᵢ’s in their denominators.\n\n'
      + 'CHECK PAIRWISE DOT PRODUCTS — IT’S A FREE, ALWAYS-AVAILABLE CORRECTNESS CHECK: after '
      + 'constructing u₁,u₂,u₃, checking pairwise dot products (u₁·u₂=0, u₁·u₃=0, u₂·u₃=0) directly '
      + 'confirms correctness or reveals a computational error in the projection-subtraction steps '
      + '— this check is always available and cheap, never something to skip in favor of trusting '
      + 'the formula ran without complaint.',
    targetedMisconceptions: [`${GRAM_SCHMIDT}:MC-1`, `${GRAM_SCHMIDT}:MC-2`, `${GRAM_SCHMIDT}:MC-3`],
    source: eb(GRAM_SCHMIDT, 'Core Understanding — each new vector requiring projection subtraction onto every previously constructed vector, normalization only after orthogonalization is complete, and pairwise dot products as a free correctness check'),
  },
  {
    conceptId: CHANGE_OF_BASIS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'COLUMNS COME FROM THE SOURCE BASIS, WRITTEN IN THE TARGET BASIS’S COORDINATES: for '
      + 'β={(1,1),(1,-1)} and γ = standard basis: Pβ→γ’s columns are β’s vectors IN '
      + 'γ-coordinates — since γ is standard, β’s vectors’ standard coordinates are just '
      + 'themselves: P=[[1,1],[1,-1]]. For [v]β=(3,2): [v]γ=P[v]β=(5,1) — verified: '
      + '3(1,1)+2(1,-1)=(5,1). Building P’s columns from γ’s vectors instead of β’s REVERSES '
      + 'which basis the matrix actually converts FROM, producing a matrix that performs the wrong '
      + 'conversion entirely.\n\n'
      + 'REVERSE CONVERSION NEEDS THE INVERSE MATRIX — REAPPLYING P DOESN’T UNDO ANYTHING: '
      + 'converting v=(5,1) (standard/γ-coordinates) BACK to β-coordinates: compute '
      + 'P⁻¹=[[0.5,0.5],[0.5,-0.5]] (from det(P)=−2), giving [v]β=P⁻¹[v]γ=(3,2) — matching the '
      + 'ORIGINAL β-coordinates exactly. Applying P AGAIN (instead of P⁻¹) for the reverse direction '
      + 'does NOT undo the original conversion — only P⁻¹ genuinely inverts P’s effect, confirmed '
      + 'directly by P⁻¹P=I.\n\n'
      + 'SIMILARITY IS THE SAME COORDINATE-CONVERSION IDEA, WRAPPED AROUND A LINEAR MAP’S ACTION: '
      + 'if A represents T relative to β, and B represents the SAME T relative to γ: B=P⁻¹AP — this '
      + 'similarity relation is not a new isolated formula, but a direct extension of the same '
      + 'coordinate-conversion machinery already built: converting T’s ACTION into a different '
      + 'basis requires converting coordinates IN, applying A in the original basis, then converting '
      + 'coordinates back OUT.',
    targetedMisconceptions: [`${CHANGE_OF_BASIS}:MC-1`, `${CHANGE_OF_BASIS}:MC-2`],
    source: eb(CHANGE_OF_BASIS, 'Core Understanding — P’s columns coming from the source basis expressed in target coordinates, reverse conversion requiring P⁻¹ rather than reapplying P, and the similarity relation as a direct extension of the coordinate-conversion machinery'),
  },
]

export const MATHEMATICS_LINALG_SPECTRAL_THEOREM_GRAM_SCHMIDT_CHANGE_OF_BASIS_PROBES: SeedProbe[] = [
  {
    conceptId: SPECTRAL_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For A=[[2,1],[1,2]], the Spectral Theorem gives A=QΛQᵀ with Q orthogonal. Is computing Q⁻¹ here basically the same amount of work as computing P⁻¹ for an ordinary diagonalization A=PDP⁻¹ of a general matrix?',
    choices: [
      { text: 'No — since Q is orthogonal, Q⁻¹=Qᵀ for FREE (just transpose, verified by QᵀQ=I); a general non-symmetric matrix’s change-of-basis matrix P is not orthogonal, so P⁻¹ genuinely requires real matrix-inversion work', isCorrect: true },
      { text: 'Yes — the Spectral Theorem’s factorization A=QΛQᵀ is basically the same idea as ordinary diagonalization A=PDP⁻¹ for any diagonalizable matrix, with no special computational advantage', isCorrect: false, misconceptionId: `${SPECTRAL_THEOREM}:MC-1` },
      { text: "Yes, since both factorizations require the same general matrix-inversion procedure regardless of whether the matrix involved happens to be symmetric", isCorrect: false, misconceptionId: `${SPECTRAL_THEOREM}:MC-1` },
    ],
    targetedMisconceptions: [`${SPECTRAL_THEOREM}:MC-1`],
    source: eb(SPECTRAL_THEOREM, 'Demonstration 2 — the QᵀQ=I-for-free contrast against the general non-symmetric matrix B’s genuine matrix-inversion requirement, directly breaking SPECTRAL-THEOREM-CONFLATED-WITH-ORDINARY-DIAGONALIZATION'),
  },
  {
    conceptId: SPECTRAL_THEOREM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Two eigenvectors are mutually perpendicular but neither has been normalized to unit length. Does assembling Q directly from these raw eigenvectors give a genuinely orthogonal matrix?',
    choices: [
      { text: 'No — orthogonal specifically means unit-length columns AND mutual perpendicularity together; using unnormalized eigenvectors produces a matrix whose columns aren’t unit length, so it is NOT actually orthogonal despite the perpendicularity', isCorrect: true },
      { text: 'Yes — mutual perpendicularity alone is the complete definition of orthogonality, so normalizing the eigenvectors to unit length is an optional extra step', isCorrect: false, misconceptionId: `${SPECTRAL_THEOREM}:MC-2` },
      { text: "Yes, because eigenvectors from a symmetric matrix are automatically unit length once they are mutually perpendicular", isCorrect: false, misconceptionId: `${SPECTRAL_THEOREM}:MC-2` },
    ],
    targetedMisconceptions: [`${SPECTRAL_THEOREM}:MC-2`],
    source: eb(SPECTRAL_THEOREM, 'Demonstration 3 — the explicit normalization step, re-anchoring that orthogonal means unit-length columns AND mutual perpendicularity, directly breaking EIGENVECTOR-NORMALIZATION-STEP-OMITTED'),
  },
  {
    conceptId: SPECTRAL_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A symmetric matrix has a repeated eigenvalue λ with a 2-dimensional eigenspace. Are the two eigenvectors spanning this eigenspace automatically guaranteed orthogonal to each other?',
    choices: [
      { text: 'No — the symmetric-matrix orthogonality guarantee specifically covers eigenvectors from DIFFERENT eigenvalues; eigenvectors within the SAME (repeated) eigenvalue’s eigenspace may need an EXTRA orthogonalization step (e.g. Gram-Schmidt) before assembling Q', isCorrect: true },
      { text: 'Yes — the Spectral Theorem’s orthogonality guarantee applies to any two eigenvectors of a symmetric matrix, whether they share the same eigenvalue or come from different eigenvalues', isCorrect: false, misconceptionId: `${SPECTRAL_THEOREM}:MC-3` },
      { text: "Yes, because symmetry alone forces every possible choice of eigenvectors within a single eigenspace to already be mutually orthogonal", isCorrect: false, misconceptionId: `${SPECTRAL_THEOREM}:MC-3` },
    ],
    targetedMisconceptions: [`${SPECTRAL_THEOREM}:MC-3`],
    source: eb(SPECTRAL_THEOREM, 'Demonstration 3 — the different-vs-same-eigenvalue orthogonality distinction, directly breaking SAME-EIGENVALUE-EIGENVECTORS-ASSUMED-AUTOMATICALLY-ORTHOGONAL'),
  },
  {
    conceptId: GRAM_SCHMIDT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Constructing u₃ from v₃ in a Gram-Schmidt process with u₁ and u₂ already built, should the projection be subtracted only onto u₂, or onto both u₁ and u₂?',
    choices: [
      { text: 'Onto BOTH u₁ and u₂ — each new vector must subtract projections onto EVERY previously constructed vector, never just the immediately preceding one; subtracting only onto u₂ leaves u₃ still not orthogonal to u₁', isCorrect: true },
      { text: 'Only onto u₂, the immediately preceding vector — since u₃ is being constructed right after u₂, only that most recent vector needs to be accounted for', isCorrect: false, misconceptionId: `${GRAM_SCHMIDT}:MC-1` },
      { text: "It doesn't matter which previous vectors are subtracted, since the Gram-Schmidt process guarantees orthogonality regardless of how many subtractions are performed", isCorrect: false, misconceptionId: `${GRAM_SCHMIDT}:MC-1` },
    ],
    targetedMisconceptions: [`${GRAM_SCHMIDT}:MC-1`],
    source: eb(GRAM_SCHMIDT, 'Demonstration 2 — the full three-vector case, contrasting the correct (subtract onto both u₁,u₂) against the flawed (subtract onto u₂ only) computation, directly breaking GRAM-SCHMIDT-PROJECTION-SUBTRACTED-ONLY-FROM-IMMEDIATE-PREDECESSOR'),
  },
  {
    conceptId: GRAM_SCHMIDT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'While building an orthogonal set u₁, u₂, u₃, should each vector be normalized to unit length as soon as it is constructed, or only after all three are complete?',
    choices: [
      { text: 'Only after all three are complete — the process has two distinct phases: first construct the FULL orthogonal set via iterative projection subtraction, THEN normalize each as a separate final pass; normalizing early risks corrupting later projection computations', isCorrect: true },
      { text: 'Each vector should be normalized immediately after it is constructed, as a natural finishing touch before moving on to the next vector', isCorrect: false, misconceptionId: `${GRAM_SCHMIDT}:MC-2` },
      { text: "It doesn't matter when normalization happens, since normalizing a vector never affects any later projection computation involving it", isCorrect: false, misconceptionId: `${GRAM_SCHMIDT}:MC-2` },
    ],
    targetedMisconceptions: [`${GRAM_SCHMIDT}:MC-2`],
    source: eb(GRAM_SCHMIDT, 'Demonstration 3 — the explicit separation of the orthogonalization phase from the normalization phase, directly breaking ORTHOGONALIZATION-AND-NORMALIZATION-STEPS-CONFLATED'),
  },
  {
    conceptId: GRAM_SCHMIDT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'After completing a Gram-Schmidt process producing u₁, u₂, u₃, is there a way to verify the result is genuinely correct?',
    choices: [
      { text: 'Yes — checking pairwise dot products (u₁·u₂, u₁·u₃, u₂·u₃) directly confirms correctness or reveals a computational error; this check is always available and cheap, never something to skip in favor of trusting the formula ran without complaint', isCorrect: true },
      { text: "No — once the Gram-Schmidt formula has been applied and produces output vectors, there is no further way to confirm the result is actually orthogonal", isCorrect: false, misconceptionId: `${GRAM_SCHMIDT}:MC-3` },
      { text: 'No, because verifying orthogonality would require repeating the entire Gram-Schmidt computation from scratch with no faster alternative', isCorrect: false, misconceptionId: `${GRAM_SCHMIDT}:MC-3` },
    ],
    targetedMisconceptions: [`${GRAM_SCHMIDT}:MC-3`],
    source: eb(GRAM_SCHMIDT, 'Memory Hooks and Tutor Actions — checking pairwise dot products as a free, always-available correctness check, directly breaking ORTHOGONALITY-RESULT-NOT-VERIFIED'),
  },
  {
    conceptId: CHANGE_OF_BASIS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Constructing Pβ→γ for β={(1,1),(1,-1)} and γ = standard basis, should P’s columns be β’s vectors expressed in γ-coordinates, or γ’s vectors expressed in β-coordinates?',
    choices: [
      { text: 'β’s vectors expressed in γ-coordinates — P’s columns come from the SOURCE basis (β), written in the TARGET basis’s (γ) coordinates; building columns from the wrong basis reverses which direction the matrix actually converts', isCorrect: true },
      { text: 'γ’s vectors expressed in β-coordinates — since γ is the target, its vectors should supply the columns of the conversion matrix', isCorrect: false, misconceptionId: `${CHANGE_OF_BASIS}:MC-1` },
      { text: "It doesn't matter which basis supplies the columns, as long as both bases' vectors are represented somewhere in the matrix", isCorrect: false, misconceptionId: `${CHANGE_OF_BASIS}:MC-1` },
    ],
    targetedMisconceptions: [`${CHANGE_OF_BASIS}:MC-1`],
    source: eb(CHANGE_OF_BASIS, 'Demonstration 1 — the explicit Pβ→γ construction for β={(1,1),(1,-1)}, labeling which basis supplies columns and which basis they’re expressed in, directly breaking CHANGE-OF-BASIS-MATRIX-BUILT-FROM-WRONG-BASIS'),
  },
  {
    conceptId: CHANGE_OF_BASIS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Having converted [v]β=(3,2) to [v]γ=(5,1) using P, should applying P again to (5,1) recover the original (3,2)?',
    choices: [
      { text: 'No — reverse conversion requires P⁻¹, never reapplying P itself; only P⁻¹ genuinely undoes P’s effect (confirmed by P⁻¹P=I), while applying P again does not recover the original β-coordinates', isCorrect: true },
      { text: 'Yes — applying the same conversion matrix P a second time reverses the first conversion and recovers the original coordinates', isCorrect: false, misconceptionId: `${CHANGE_OF_BASIS}:MC-2` },
      { text: "Yes, because any linear transformation applied twice in succession returns to the starting point by definition", isCorrect: false, misconceptionId: `${CHANGE_OF_BASIS}:MC-2` },
    ],
    targetedMisconceptions: [`${CHANGE_OF_BASIS}:MC-2`],
    source: eb(CHANGE_OF_BASIS, 'Demonstration 2 — the P⁻¹-based reverse conversion verified against reapplying P (which fails to recover the original coordinates), directly breaking REVERSE-CONVERSION-USES-P-INSTEAD-OF-P-INVERSE'),
  },
  {
    conceptId: CHANGE_OF_BASIS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A robotics system needs to convert coordinates from sensor-space to workspace-space and back. If P converts sensor-space to workspace-space, what converts workspace-space back to sensor-space?',
    choices: [
      { text: 'P⁻¹ — the reverse conversion always requires the inverse matrix, never a second application of the forward conversion matrix P; this bidirectional need is exactly the sensor-to-workspace scenario the concept’s reverse-conversion machinery addresses', isCorrect: true },
      { text: 'P applied a second time — since P performs the sensor-to-workspace conversion, applying it again naturally reverses the process back to sensor-space', isCorrect: false, misconceptionId: `${CHANGE_OF_BASIS}:MC-2` },
      { text: 'The transpose of P, Pᵀ, which always serves as the reverse-direction conversion matrix for any change-of-basis matrix', isCorrect: false, misconceptionId: `${CHANGE_OF_BASIS}:MC-2` },
    ],
    targetedMisconceptions: [`${CHANGE_OF_BASIS}:MC-2`],
    source: eb(CHANGE_OF_BASIS, 'Assessment Signals Rung 3 — correctly identifying which matrix a bidirectional real-world conversion (robotics sensor-to-workspace coordinates) requires, directly breaking REVERSE-CONVERSION-USES-P-INSTEAD-OF-P-INVERSE'),
  },
]
