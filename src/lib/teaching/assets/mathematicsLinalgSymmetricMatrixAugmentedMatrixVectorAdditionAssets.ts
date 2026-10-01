/**
 * Batch: symmetric-matrix, augmented-matrix, vector-addition (math.linalg).
 *
 * Continuing math.linalg (14/61 -> 17/61). Fresh frontier recompute found
 * 10 ready concepts. Selected symmetric-matrix (unlocks spectral-theorem)
 * and augmented-matrix (unlocks row-reduction) for their downstream value,
 * plus vector-addition — foundational, natural continuation from `vector`
 * (authored Batch 103) that had remained unauthored while the campaign
 * pursued higher-unlock-value concepts.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.linalg.{symmetric-matrix,augmented-matrix,vector-addition}.md.
 *
 *   SYMMETRIC-MATRIX  A=Aᵀ requires checking Aᵢⱼ=Aⱼᵢ for EVERY pair, not a
 *           spot-check — one mismatched pair disqualifies the whole matrix;
 *           REAL eigenvalues and ORTHOGONAL eigenvectors (for different
 *           eigenvalues) are guarantees SPECIFIC to symmetric matrices,
 *           never a universal property of square matrices in general;
 *           covariance and Hessian matrices are symmetric by GUARANTEED
 *           construction from their own definitions, never coincidence.
 *   AUGMENTED-MATRIX  [A|b] is a compact BOOKKEEPING device for Ax=b, not a
 *           new mathematical object — each row IS an equation with variable
 *           names and "=" stripped, since their positions are implied by
 *           the columns; a missing variable must be zero-filled, never
 *           skipped; the three legal row operations are GUARANTEED to
 *           preserve the underlying system's solution set, exactly as the
 *           equivalent equation-level algebra already guarantees.
 *   VECTOR-ADDITION  (a₁,…,aₙ)+(b₁,…,bₙ)=(a₁+b₁,…,aₙ+bₙ) pairs components by
 *           SHARED INDEX POSITION, never across positions; both vectors
 *           must share the SAME dimension — a genuine TYPE requirement,
 *           mismatched dimensions are UNDEFINED, not an error to work
 *           around; the result is always a vector of the SAME dimension as
 *           the inputs, never collapsed to a scalar or concatenated into a
 *           longer list.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const SYMMETRIC_MATRIX = 'math.linalg.symmetric-matrix'
const AUGMENTED_MATRIX = 'math.linalg.augmented-matrix'
const VECTOR_ADDITION = 'math.linalg.vector-addition'

export const MATHEMATICS_LINALG_SYMMETRIC_MATRIX_AUGMENTED_MATRIX_VECTOR_ADDITION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SYMMETRIC_MATRIX, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'EVERY PAIR MATCHES, NOT JUST THE ONES YOU CHECKED: a square matrix A is SYMMETRIC if A=Aᵀ '
      + '— directly reusing math.linalg.matrix-transpose’s own definition, this is equivalent to '
      + 'the entry-wise condition Aᵢⱼ=Aⱼᵢ holding for EVERY pair of indices i,j, meaning the matrix '
      + 'is a mirror image of itself across its main diagonal. Verifying symmetry requires checking '
      + 'every off-diagonal pair — a single mismatched pair is enough to disqualify the whole '
      + 'matrix, no matter how many other pairs match.\n\n'
      + 'REAL EIGENVALUES, ORTHOGONAL EIGENVECTORS — A SYMMETRIC-MATRIX GUARANTEE, NOT A UNIVERSAL '
      + 'ONE: symmetric matrices carry two strong structural guarantees (their full statement and '
      + 'proof belong to math.linalg.spectral-theorem): their eigenvalues are ALWAYS real — never '
      + 'complex, unlike a general matrix, whose eigenvalues genuinely can be complex — and '
      + 'eigenvectors corresponding to DIFFERENT eigenvalues are automatically orthogonal to each '
      + 'other. Neither guarantee holds for matrices in general: a non-symmetric matrix can have '
      + 'complex eigenvalues, and its eigenvectors need not line up orthogonally at all — the '
      + 'guarantees are SPECIFIC to symmetry.\n\n'
      + 'SOME MATRICES ARE SYMMETRIC BY DEFINITION, NOT BY LUCK: symmetric matrices arise constantly '
      + 'in practice, and NOT by coincidence. A COVARIANCE matrix Σ has entries Σᵢⱼ=Cov(Xᵢ,Xⱼ); '
      + 'since Cov(Xᵢ,Xⱼ)=Cov(Xⱼ,Xᵢ) is true by the very definition of covariance, Σ is symmetric '
      + 'BY CONSTRUCTION, guaranteed for any data whatsoever. A HESSIAN matrix H is likewise '
      + 'symmetric by construction — by Clairaut’s/Schwarz’s theorem, mixed partial derivatives '
      + 'are equal for sufficiently smooth functions, so Hᵢⱼ=Hⱼᵢ is guaranteed, not coincidental.',
    targetedMisconceptions: [`${SYMMETRIC_MATRIX}:MC-1`, `${SYMMETRIC_MATRIX}:MC-2`, `${SYMMETRIC_MATRIX}:MC-3`],
    source: eb(SYMMETRIC_MATRIX, 'Core Understanding — A=Aᵀ requiring every entry-wise pair to match, the real-eigenvalue/orthogonal-eigenvector guarantee specific to symmetric matrices, and covariance/Hessian matrices as symmetric by guaranteed construction'),
  },
  {
    conceptId: AUGMENTED_MATRIX, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'EACH ROW IS AN EQUATION WITH THE LABELS STRIPPED: given the linear system Ax=b, the '
      + 'AUGMENTED MATRIX [A|b] is formed by literally appending b as an extra column to the right '
      + 'of A — reusing math.linalg.linear-system’s own Ax=b structure directly, with the vertical '
      + 'bar serving only as a visual separator, never a mathematical operation. Each ROW of [A|b] '
      + 'corresponds to exactly one equation of the original system: the row’s entries in the '
      + 'A-part are that equation’s coefficients, and the row’s entry in the b-part is that '
      + 'equation’s constant term. MISSING VARIABLE? WRITE ZERO, NEVER SKIP THE COLUMN — every row '
      + 'must have exactly one entry per column, in the same variable order across every row.\n\n'
      + 'ROW OPERATIONS ARE ALGEBRA IN DISGUISE — NOTHING NEW, JUST RE-NOTATED: the augmented matrix '
      + 'is a BOOKKEEPING DEVICE, not new mathematics — it is simply a compact way of writing down '
      + 'the exact same system of equations, dropping the variable names and "=" signs since their '
      + 'positions are now implied by the matrix’s structure. Every operation performed on the '
      + 'augmented matrix is really an operation on the underlying equations.\n\n'
      + 'ROW OPERATIONS ARE GUARANTEED TO PRESERVE THE SOLUTION SET: the three legal row operations '
      + '— swapping two rows, multiplying a row by a nonzero constant, adding a multiple of one row '
      + 'to another — each correspond to a manipulation of the underlying EQUATIONS that is well '
      + 'known from ordinary algebra not to change which values satisfy the system. Because [A|b]’s '
      + 'rows directly correspond to these equations, the same three guarantees apply directly to '
      + 'row operations on the matrix.',
    targetedMisconceptions: [`${AUGMENTED_MATRIX}:MC-1`, `${AUGMENTED_MATRIX}:MC-2`, `${AUGMENTED_MATRIX}:MC-3`],
    source: eb(AUGMENTED_MATRIX, 'Core Understanding — [A|b] as a compact bookkeeping device with each row corresponding to an equation and missing variables zero-filled, and legal row operations guaranteed to preserve the underlying system’s solution set'),
  },
  {
    conceptId: VECTOR_ADDITION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'PAIR BY POSITION, NEVER BY PROXIMITY: vector addition is defined component-wise, '
      + '(a₁,…,aₙ)+(b₁,…,bₙ)=(a₁+b₁,…,aₙ+bₙ) — reusing math.linalg.vector’s own ordered-tuple '
      + 'definition, addition simply adds each POSITION’s real-number entries independently. '
      + 'Geometrically, this is the TIP-TO-TAIL rule: placing the tail of v at the tip of u, the sum '
      + 'u+v runs from u’s tail to v’s tip.\n\n'
      + 'DIFFERENT DIMENSIONS, NO ADDITION — NOT INCOMPLETE, UNDEFINED: both vectors must have the '
      + 'SAME dimension for addition to be defined — this is not a technicality to be patched '
      + 'around but a genuine TYPE requirement: a 2D vector tracks two independent quantities, a 3D '
      + 'vector tracks three, and there is simply nothing in a 2D vector to pair with a 3D vector’s '
      + 'third component. Addition of mismatched dimensions is UNDEFINED, not merely incomplete or '
      + 'an error state to recover from.\n\n'
      + 'TWO VECTORS IN, ONE VECTOR OF THE SAME SIZE OUT: because each component is added using '
      + 'ordinary real-number addition, vector addition inherits commutativity (u+v=v+u) and '
      + 'associativity directly, component by component. The zero vector 0 acts as the additive '
      + 'IDENTITY (v+0=v), and every vector v has an additive INVERSE −v=(−v₁,…,−vₙ), with '
      + 'subtraction defined as a−b=a+(−b). These properties — closure, associativity, identity, '
      + 'inverse, plus commutativity — make (ℝⁿ,+) an ABELIAN GROUP, previewing the structure '
      + 'math.abst.group-operation studies in full generality.',
    targetedMisconceptions: [`${VECTOR_ADDITION}:MC-1`, `${VECTOR_ADDITION}:MC-2`, `${VECTOR_ADDITION}:MC-3`],
    source: eb(VECTOR_ADDITION, 'Core Understanding — component-wise addition pairing by shared index position, the same-dimension requirement making mismatched addition undefined rather than incomplete, and the resulting abelian-group structure with the output always matching the input dimension'),
  },
]

export const MATHEMATICS_LINALG_SYMMETRIC_MATRIX_AUGMENTED_MATRIX_VECTOR_ADDITION_PROBES: SeedProbe[] = [
  {
    conceptId: SYMMETRIC_MATRIX, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For a general (not necessarily symmetric) square matrix, are the eigenvalues guaranteed to be real and the eigenvectors guaranteed to be orthogonal?',
    choices: [
      { text: 'No — real eigenvalues and orthogonal eigenvectors (for different eigenvalues) are guarantees SPECIFIC to symmetric matrices; a general non-symmetric matrix can have complex eigenvalues and eigenvectors that do not line up orthogonally at all', isCorrect: true },
      { text: 'Yes — once the Spectral Theorem guarantee is established for symmetric matrices, the same real-eigenvalue and orthogonal-eigenvector properties automatically extend to every square matrix', isCorrect: false, misconceptionId: `${SYMMETRIC_MATRIX}:MC-1` },
      { text: "Yes, since real eigenvalues and orthogonal eigenvectors are a universal property that any square matrix, symmetric or not, must satisfy", isCorrect: false, misconceptionId: `${SYMMETRIC_MATRIX}:MC-1` },
    ],
    targetedMisconceptions: [`${SYMMETRIC_MATRIX}:MC-1`],
    source: eb(SYMMETRIC_MATRIX, 'Demonstration 2 — computing real eigenvalues and orthogonal eigenvectors for a symmetric matrix, then contrasting with a non-symmetric matrix known to have complex eigenvalues, directly breaking REAL-EIGENVALUES-ORTHOGONAL-EIGENVECTORS-OVERGENERALIZED'),
  },
  {
    conceptId: SYMMETRIC_MATRIX, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A 3×3 matrix B matches A₁₂=A₂₁ and A₁₃=A₃₁, but B₂₃=4 while B₃₂=7. Is B symmetric?',
    choices: [
      { text: 'No — symmetry requires checking EVERY off-diagonal pair; a single mismatched pair (B₂₃≠B₃₂) is enough to disqualify the entire matrix, regardless of how many other pairs match', isCorrect: true },
      { text: 'Yes — since two of the three off-diagonal pairs already match, the matrix is close enough to symmetric to be classified as such', isCorrect: false, misconceptionId: `${SYMMETRIC_MATRIX}:MC-2` },
      { text: "Yes, because checking a majority of the off-diagonal pairs is sufficient to confirm symmetry for practical purposes", isCorrect: false, misconceptionId: `${SYMMETRIC_MATRIX}:MC-2` },
    ],
    targetedMisconceptions: [`${SYMMETRIC_MATRIX}:MC-2`],
    source: eb(SYMMETRIC_MATRIX, 'Demonstration 1 — checking a matrix entry-wise against a near-symmetric non-example with one mismatched pair, showing the single mismatch disqualifies the whole matrix, directly breaking SYMMETRY-VERIFIED-BY-SPOT-CHECKING-ONE-PAIR'),
  },
  {
    conceptId: SYMMETRIC_MATRIX, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Before computing a single numeric entry, can you already know that a covariance matrix Σ will be symmetric?',
    choices: [
      { text: 'Yes — Cov(Xᵢ,Xⱼ)=Cov(Xⱼ,Xᵢ) is true by the very definition of covariance as an expected product, so Σ is symmetric BY CONSTRUCTION for any data whatsoever, never as a coincidence of specific numbers', isCorrect: true },
      { text: 'No — whether a covariance matrix turns out symmetric depends entirely on the specific numeric values of the data, and must be verified entry by entry after the fact each time', isCorrect: false, misconceptionId: `${SYMMETRIC_MATRIX}:MC-3` },
      { text: "No, because covariance matrices are symmetric only in special cases, such as when the underlying variables happen to be uncorrelated", isCorrect: false, misconceptionId: `${SYMMETRIC_MATRIX}:MC-3` },
    ],
    targetedMisconceptions: [`${SYMMETRIC_MATRIX}:MC-3`],
    source: eb(SYMMETRIC_MATRIX, 'Demonstration 3 — deriving Cov(Xᵢ,Xⱼ)=Cov(Xⱼ,Xᵢ) directly from the definition of covariance, establishing any covariance matrix is symmetric by construction before computing a single entry, directly breaking SYMMETRIC-MATRICES-IN-PRACTICE-ASSUMED-COINCIDENTAL'),
  },
  {
    conceptId: AUGMENTED_MATRIX, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For the system 2x+3y=7, x−y=1, what does the augmented matrix [A|b] represent — a new mathematical object, or the same system re-notated?',
    choices: [
      { text: 'The same system re-notated — [A|b] is a bookkeeping device that drops the variable names and "=" signs since their positions are implied by the columns; nothing new is computed, only re-notated', isCorrect: true },
      { text: "A genuinely new mathematical object that introduces content beyond what the original two equations expressed on their own", isCorrect: false, misconceptionId: `${AUGMENTED_MATRIX}:MC-3` },
      { text: 'A calculation tool that could introduce its own rounding or logical errors distinct from the original equations', isCorrect: false, misconceptionId: `${AUGMENTED_MATRIX}:MC-3` },
    ],
    targetedMisconceptions: [`${AUGMENTED_MATRIX}:MC-3`],
    source: eb(AUGMENTED_MATRIX, 'Demonstration 2 — performing a row operation on [A|b] and showing it produces the identical resulting equation as the equivalent equation-level elimination step, directly breaking AUGMENTED-MATRIX-TREATED-AS-A-DIFFERENT-MATHEMATICAL-OBJECT'),
  },
  {
    conceptId: AUGMENTED_MATRIX, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A system has the equation 3x+5=z (with y absent). When building that row of the augmented matrix, should the y-column be skipped, or filled with 0?',
    choices: [
      { text: 'Filled with 0 — every row must have exactly one entry per column in the same variable order across every row; a missing variable means writing 0, never skipping the column', isCorrect: true },
      { text: 'Skipped — since y does not appear in this equation at all, there is nothing to record for it in this particular row of the matrix', isCorrect: false, misconceptionId: `${AUGMENTED_MATRIX}:MC-2` },
      { text: "It doesn't matter, since the row's remaining coefficients will still line up correctly with the other rows regardless of whether the y-column is included", isCorrect: false, misconceptionId: `${AUGMENTED_MATRIX}:MC-2` },
    ],
    targetedMisconceptions: [`${AUGMENTED_MATRIX}:MC-2`],
    source: eb(AUGMENTED_MATRIX, 'Demonstration 1 — constructing [A|b] for a system, explicitly connecting each equation’s coefficients to its matching matrix row including zero-filling, directly breaking AUGMENTED-MATRIX-COLUMN-ORDER-MISALIGNED'),
  },
  {
    conceptId: AUGMENTED_MATRIX, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'After performing a legal row operation (adding a multiple of one row to another) on an augmented matrix, could the resulting system have a different solution set than the original?',
    choices: [
      { text: 'No — the three legal row operations each correspond to a manipulation of the underlying equations already known from ordinary algebra to preserve the solution set; solving both the original and row-operated systems directly confirms they share the exact same solution', isCorrect: true },
      { text: 'Yes — row operations are mechanical matrix manipulations that could accidentally introduce a different solution set than the equations originally had', isCorrect: false, misconceptionId: `${AUGMENTED_MATRIX}:MC-1` },
      { text: "Yes, because performing operations directly on a matrix carries a different risk of altering the solution set than performing the equivalent operations on the original equations", isCorrect: false, misconceptionId: `${AUGMENTED_MATRIX}:MC-1` },
    ],
    targetedMisconceptions: [`${AUGMENTED_MATRIX}:MC-1`],
    source: eb(AUGMENTED_MATRIX, 'Demonstration 3 — solving both the original system and its row-operated version directly, confirming both give the exact same solution, directly breaking ROW-OPERATIONS-FEARED-TO-ALTER-SOLUTION-SET'),
  },
  {
    conceptId: VECTOR_ADDITION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'To compute (1,2)+(3,4), should the first entry of each vector be paired together, or should entries be combined in whatever order is convenient?',
    choices: [
      { text: 'The first entries pair together, and the second entries pair together — (1,2)+(3,4)=(1+3,2+4)=(4,6); vector addition pairs components by their SHARED index position, never mixing positions across the two vectors', isCorrect: true },
      { text: 'Entries can be combined in any convenient order, such as pairing the first entry of one vector with the second entry of the other, e.g. (1+4,2+3)=(5,5)', isCorrect: false, misconceptionId: `${VECTOR_ADDITION}:MC-1` },
      { text: 'It does not matter which entries are paired together, since vector addition always produces the same total regardless of how the four numbers are grouped', isCorrect: false, misconceptionId: `${VECTOR_ADDITION}:MC-1` },
    ],
    targetedMisconceptions: [`${VECTOR_ADDITION}:MC-1`],
    source: eb(VECTOR_ADDITION, 'Demonstration 1 — computing (5,-3)+(-2,7)=(3,4) by explicitly labeling each position’s sum, directly breaking CROSS-COMPONENT-MIXING'),
  },
  {
    conceptId: VECTOR_ADDITION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Can (4,-1,2) (a 3D vector) and (5,3) (a 2D vector) be added together?',
    choices: [
      { text: "No — both vectors must have the SAME dimension for addition to be defined; the third component of (4,-1,2) has no partner in the 2D vector, making the sum UNDEFINED, not an error to be patched around", isCorrect: true },
      { text: 'Yes — the extra third component can simply be added to zero or carried over unchanged into the result, producing a valid 3D sum', isCorrect: false, misconceptionId: `${VECTOR_ADDITION}:MC-2` },
      { text: "Yes, as long as the smaller vector's components are matched to the larger vector's first two components, with the extra component simply appended to the result", isCorrect: false, misconceptionId: `${VECTOR_ADDITION}:MC-2` },
    ],
    targetedMisconceptions: [`${VECTOR_ADDITION}:MC-2`],
    source: eb(VECTOR_ADDITION, 'Demonstration 2 — attempting (4,-1,2)+(5,3) and identifying that the third component has no partner, making the sum undefined, directly breaking DIMENSION-MISMATCH-IGNORED'),
  },
  {
    conceptId: VECTOR_ADDITION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Computing (1,2)+(3,4), should the result be the scalar 10, the 4-entry list (1,2,3,4), or a single 2D vector?',
    choices: [
      { text: 'A single 2D vector, (4,6) — two component additions for two 2D vectors produce exactly two results; the output always has the SAME dimension as the inputs, never collapsed to a scalar or concatenated into a longer list', isCorrect: true },
      { text: 'The scalar 10 — since vector addition, like ordinary numeric addition, ultimately collapses all the input values down to a single combined total', isCorrect: false, misconceptionId: `${VECTOR_ADDITION}:MC-3` },
      { text: 'The 4-entry list (1,2,3,4) — since adding two vectors together should combine all of their entries into one longer list', isCorrect: false, misconceptionId: `${VECTOR_ADDITION}:MC-3` },
    ],
    targetedMisconceptions: [`${VECTOR_ADDITION}:MC-3`],
    source: eb(VECTOR_ADDITION, 'Demonstration 3 — computing (1,2)+(3,4) and confirming the result is a single 2D vector (4,6), neither the scalar 10 nor the 4-entry list, directly breaking ADDITION-COLLAPSES-DIMENSION'),
  },
]
