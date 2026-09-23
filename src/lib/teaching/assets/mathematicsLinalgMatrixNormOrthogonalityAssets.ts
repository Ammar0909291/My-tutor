/**
 * Batch: matrix, norm, orthogonality (math.linalg).
 *
 * Continuing math.linalg (8/61 -> 11/61). Fresh frontier recompute found 8
 * ready concepts. Selected the three with the highest downstream unlock
 * value: matrix (unlocks determinant [already authored elsewhere],
 * linear-system, linear-map), norm (unlocks unit-vector, distance),
 * orthogonality (unlocks orthogonal-basis, gram-schmidt).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.linalg.{matrix,norm,orthogonality}.md.
 *
 *   MATRIX  an m×n matrix is the TWO-dimensional generalization of a vector's
 *           ordered-tuple structure — m ROWS first, n COLUMNS second, "RC" —
 *           and entry aᵢⱼ reads row i first, column j second, never the
 *           reverse; POSITION carries genuine structural meaning, so
 *           swapping two entries produces a genuinely different matrix, not
 *           a rearrangement of "the same information."
 *   NORM  ‖v‖=√(v·v)=√(Σvᵢ²) reuses the dot product's own v·v computation —
 *           the Pythagorean theorem generalized past two legs; because every
 *           term is SQUARED first, the norm is ALWAYS non-negative regardless
 *           of the vector's own signs; "the norm" (Euclidean, p=2) is only
 *           one member of a p-norm family — the 1-norm and ∞-norm generally
 *           give GENUINELY DIFFERENT numeric values for the same vector.
 *   ORTHOGONALITY  u⊥v iff u·v=0 — an ALGEBRAIC test valid in ANY dimension
 *           or abstract space, never merely a visual "looks perpendicular"
 *           judgment past 3D; orthogonality says NOTHING about vector
 *           length — two wildly different-length vectors can be perfectly
 *           orthogonal; ORTHONORMALITY is the strictly stronger condition of
 *           orthogonal AND each normalized to unit length; the test is
 *           EXACT — a dot product of 0.001 is definitively NOT orthogonal,
 *           with no "close enough" category.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const MATRIX = 'math.linalg.matrix'
const NORM = 'math.linalg.norm'
const ORTHOGONALITY = 'math.linalg.orthogonality'

export const MATHEMATICS_LINALG_MATRIX_NORM_ORTHOGONALITY_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MATRIX, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'RC — ROW COUNT, THEN COLUMN COUNT, EVERYWHERE: a matrix is a rectangular array of numbers '
      + 'arranged in m rows and n columns, written as an m×n matrix, with the entry in row i and '
      + 'column j denoted aᵢⱼ. This directly extends math.linalg.vector’s own ordered-tuple '
      + 'structure — a vector is a ONE-dimensional ordered list, while a matrix is its '
      + 'TWO-dimensional generalization; a column vector is simply an m×1 matrix, a row vector a '
      + '1×n matrix. The dimension notation is strict: m×n means m ROWS first, n COLUMNS second — '
      + '"m by n." The entry notation mirrors this exactly: aᵢⱼ reads row index i first, column '
      + 'index j second — a 2×3 matrix genuinely has 2 rows and 3 columns, and a₂₃ genuinely means '
      + '"row 2, column 3," never the reverse.\n\n'
      + 'POSITION IS THE MEANING: exactly the way a vector’s component order does, position within '
      + 'the matrix carries GENUINE mathematical meaning — swapping entries a₁₂ and a₂₁ produces a '
      + 'DIFFERENT matrix, not a rearrangement of "the same information." A matrix is not an '
      + 'unordered bag of numbers — each entry occupies a permanent (i,j) address, and the numbers '
      + 'stored at different addresses generally describe genuinely different facts, exactly as in '
      + 'a data table where row and column jointly determine what a single entry means.',
    targetedMisconceptions: [`${MATRIX}:MC-1`, `${MATRIX}:MC-2`, `${MATRIX}:MC-3`],
    source: eb(MATRIX, 'Core Understanding — the m×n rows-first dimension convention and the row-then-column aᵢⱼ entry convention, both extending the vector’s ordered-tuple structure, and position as structurally meaningful rather than an unordered collection'),
  },
  {
    conceptId: NORM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      '‖v‖=√(v·v) — THE NORM IS A DOT PRODUCT WEARING A SQUARE ROOT: the Euclidean norm of a '
      + 'vector v is ‖v‖=√(v·v)=√(Σvᵢ²), directly reusing math.linalg.dot-product’s own v·v '
      + 'computation — exactly the sum of squared components already computed in a different '
      + 'context. This is the Pythagorean theorem generalized past two legs: for v=(3,4), '
      + '‖v‖=√(3²+4²)=√25=5, the familiar hypotenuse of a 3-4-5 right triangle, extending the '
      + 'identical square-then-sum-then-root pattern to any number of components.\n\n'
      + 'SQUARE FIRST — SIGN DISAPPEARS BEFORE THE SUM EVER FORMS: because every term is SQUARED '
      + 'before anything else happens, the norm is ALWAYS non-negative — squaring a negative '
      + 'component produces a positive result exactly as squaring its positive counterpart would, '
      + 'so no individual component’s sign survives into the final answer. A vector with every '
      + 'component negative has exactly the same norm as its all-positive mirror image.\n\n'
      + 'THREE DIFFERENT QUESTIONS, THREE DIFFERENT ANSWERS: the Euclidean norm (p=2) is one member '
      + 'of a p-norm family, ‖v‖ₚ=(Σ|vᵢ|ᵖ)^(1/p). The 1-norm ‖v‖₁=Σ|vᵢ| (sum of absolute values, no '
      + 'squaring at all) and the ∞-norm ‖v‖∞=max|vᵢ| (the single largest absolute component) '
      + 'generally give GENUINELY DIFFERENT numeric values for the same vector — "the norm," '
      + 'without qualification, conventionally means the Euclidean case, but it is not the only '
      + 'valid notion of a vector’s "size."',
    targetedMisconceptions: [`${NORM}:MC-1`, `${NORM}:MC-2`, `${NORM}:MC-3`],
    source: eb(NORM, 'Core Understanding — ‖v‖=√(v·v) as the Pythagorean theorem generalized, the non-negativity that squaring forces regardless of sign, and the p-norm family where the 1-norm, 2-norm, and ∞-norm generally give different values'),
  },
  {
    conceptId: ORTHOGONALITY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'u·v=0 — THE WHOLE TEST, IN EVERY DIMENSION: two vectors u,v are ORTHOGONAL if and only if '
      + 'u·v=0, reusing math.linalg.dot-product’s own computation directly — this single algebraic '
      + 'condition IS the entire definition. For a familiar 2D pair like u=(1,0), v=(0,1), the '
      + 'algebraic test matches visual intuition — but the SAME test applies identically and with '
      + 'equal certainty in ℝ⁴, ℝⁿ for any n, or in abstract inner product spaces (polynomials, '
      + 'functions) where "perpendicular" has no direct visual meaning at all. The dot-product test '
      + 'is not a shortcut for confirming what a picture would show — it is the actual, and in '
      + 'general the ONLY, method by which orthogonality is ever determined, even where a picture '
      + 'happens to be possible.\n\n'
      + 'ORTHOGONAL SAYS NOTHING ABOUT LENGTH; ORTHONORMAL ADDS LENGTH EXACTLY 1: two vectors of '
      + 'wildly different, non-unit lengths can be perfectly orthogonal — u=(10,0) and v=(0,-3) '
      + 'give u·v=0 despite neither having length 1. ORTHONORMALITY is the strictly stronger '
      + 'condition of being orthogonal AND each individually normalized to length exactly 1 (via '
      + 'math.linalg.norm); orthogonality by itself makes no length requirement whatsoever.\n\n'
      + 'ZERO MEANS ZERO — 0.001 IS NOT ZERO, HOWEVER SMALL IT LOOKS: orthogonality is an EXACT '
      + 'condition, admitting no partial credit — a dot product of 0.001 means the vectors are '
      + 'definitively NOT orthogonal, exactly as decisively as a dot product of 500 would. "Very '
      + 'small" and "exactly zero" are entirely different claims; only the exact computation, '
      + 'never an eyeballed estimate, settles the question.',
    targetedMisconceptions: [`${ORTHOGONALITY}:MC-1`, `${ORTHOGONALITY}:MC-2`, `${ORTHOGONALITY}:MC-3`],
    source: eb(ORTHOGONALITY, 'Core Understanding — u·v=0 as an algebraic test valid in any dimension, orthogonality’s independence from vector length versus the stronger orthonormality condition, and the exact zero requirement admitting no near-misses'),
  },
]

export const MATHEMATICS_LINALG_MATRIX_NORM_ORTHOGONALITY_PROBES: SeedProbe[] = [
  {
    conceptId: MATRIX, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A matrix has 2 rows and 3 columns. Using the standard convention, what are its dimensions?',
    choices: [
      { text: '2×3 — the dimension notation m×n always counts ROWS first, then COLUMNS second, so a matrix with 2 rows and 3 columns is written 2×3, never the reverse', isCorrect: true },
      { text: '3×2 — since the number of columns is typically listed before the number of rows in standard matrix notation', isCorrect: false, misconceptionId: `${MATRIX}:MC-1` },
      { text: 'Either 2×3 or 3×2 is acceptable, since the order the two counts are listed in does not carry any fixed meaning', isCorrect: false, misconceptionId: `${MATRIX}:MC-1` },
    ],
    targetedMisconceptions: [`${MATRIX}:MC-1`],
    source: eb(MATRIX, 'Demonstration 1 — stating the dimensions of a 2-row, 3-column matrix as 2×3, explicitly contrasting against the incorrect "3×2," directly breaking MATRIX-DIMENSION-REVERSED'),
  },
  {
    conceptId: MATRIX, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For a matrix M, you are asked to locate entry M₂₃. Should you go to row 2 then column 3, or row 3 then column 2?',
    choices: [
      { text: 'Row 2, then column 3 — the subscript notation aᵢⱼ always reads the row index i first and the column index j second, so M₂₃ means row 2, column 3', isCorrect: true },
      { text: 'Row 3, then column 2 — since the second number in the subscript should be located first, matching how coordinate pairs like (x,y) are typically read', isCorrect: false, misconceptionId: `${MATRIX}:MC-2` },
      { text: 'Either interpretation locates the same entry, since the two subscript numbers can be applied to rows and columns in any consistent order', isCorrect: false, misconceptionId: `${MATRIX}:MC-2` },
    ],
    targetedMisconceptions: [`${MATRIX}:MC-2`],
    source: eb(MATRIX, 'Demonstration 2 — locating a₂₃ in a 3×3 matrix by going to row 2 first then column 3, contrasting against the incorrect a₃₂, directly breaking MATRIX-ENTRY-INDEXED-WRONG'),
  },
  {
    conceptId: MATRIX, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If two entries in a matrix are swapped with each other, is the resulting matrix the same as the original, or a genuinely different matrix?',
    choices: [
      { text: "A genuinely different matrix — each entry occupies a permanent (i,j) address, and swapping two entries changes what number sits at each specific address, exactly the way reordering a vector's components changes the vector", isCorrect: true },
      { text: 'The same matrix — since a matrix is just a collection of numbers, and rearranging which specific positions those numbers occupy does not change the underlying collection', isCorrect: false, misconceptionId: `${MATRIX}:MC-3` },
      { text: 'The same matrix, as long as the total sum of all the entries remains unchanged after the swap', isCorrect: false, misconceptionId: `${MATRIX}:MC-3` },
    ],
    targetedMisconceptions: [`${MATRIX}:MC-3`],
    source: eb(MATRIX, 'Demonstration 3 — swapping a₁₂ and a₂₁ in a small matrix and a weather-data matrix to show the swap produces a genuinely different matrix and misattributes a real recorded value, directly breaking MATRIX-IS-JUST-NUMBERS'),
  },
  {
    conceptId: NORM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'To find the norm of v=(6,8), should you compute 6+8, or √(6²+8²)?',
    choices: [
      { text: '√(6²+8²)=√100=10 — the norm requires squaring each component, summing, then taking the square root; this matches the familiar 6-8-10 right triangle from the Pythagorean theorem', isCorrect: true },
      { text: '6+8=14 — since the norm is simply the sum of the vector’s raw components, with no squaring or square root required', isCorrect: false, misconceptionId: `${NORM}:MC-1` },
      { text: 'Either 6+8 or √(6²+8²) gives a valid norm, since both are reasonable ways to combine the two components into a single number', isCorrect: false, misconceptionId: `${NORM}:MC-1` },
    ],
    targetedMisconceptions: [`${NORM}:MC-1`],
    source: eb(NORM, 'Demonstration 1 — computing ‖(6,8)‖ both the wrong way (6+8=14) and the correct way (√(36+64)=10), confirming the correct answer matches the 6-8-10 right triangle, directly breaking NORM-IS-SUM-OF-COMPONENTS'),
  },
  {
    conceptId: NORM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For v=(-6,-8), with every component negative, must the norm ‖v‖ also be negative?',
    choices: [
      { text: 'No — ‖v‖=√((-6)²+(-8)²)=√(36+64)=10, a positive result; squaring erases sign before the sum is ever formed, so a component’s original sign never survives into the final norm', isCorrect: true },
      { text: 'Yes — since both components of v are negative, the resulting norm must inherit that negative sign and come out to a negative value', isCorrect: false, misconceptionId: `${NORM}:MC-2` },
      { text: "Yes, because summing two negative squared quantities always produces a negative result under the square root", isCorrect: false, misconceptionId: `${NORM}:MC-2` },
    ],
    targetedMisconceptions: [`${NORM}:MC-2`],
    source: eb(NORM, 'Demonstration 2 — computing ‖(-6,-8)‖=√(36+64)=10, a positive result despite both components being negative, directly breaking NEGATIVE-COMPONENTS-GIVE-NEGATIVE-NORM'),
  },
  {
    conceptId: NORM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For v=(3,-4), must the 1-norm, 2-norm, and ∞-norm all give the same numeric value?',
    choices: [
      { text: 'No — the 1-norm is |3|+|-4|=7, the 2-norm (Euclidean) is √(9+16)=5, and the ∞-norm is max(|3|,|-4|)=4; these are three genuinely different valid notions of the vector’s "size," not one fixed operation', isCorrect: true },
      { text: 'Yes — "norm" refers to one single fixed computation, so the 1-norm, 2-norm, and ∞-norm of the same vector must always agree numerically', isCorrect: false, misconceptionId: `${NORM}:MC-3` },
      { text: "Yes, since the term 'norm' without further qualification only ever refers to the Euclidean case, and no other valid norms exist for a given vector", isCorrect: false, misconceptionId: `${NORM}:MC-3` },
    ],
    targetedMisconceptions: [`${NORM}:MC-3`],
    source: eb(NORM, 'Demonstration 3 — computing the 1-norm (7), 2-norm (5), and ∞-norm (4) of v=(3,-4) side by side, confirming three genuinely different values, directly breaking ALL-NORMS-ARE-THE-SAME-VALUE'),
  },
  {
    conceptId: ORTHOGONALITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Can two vectors in a 4-dimensional space, which cannot be drawn or pictured, still be determined to be orthogonal?',
    choices: [
      { text: 'Yes — orthogonality is an algebraic test, u·v=0, that applies identically and with equal certainty in any dimension or abstract space; a picture is never required to determine it, even in dimensions where one is possible', isCorrect: true },
      { text: 'No — orthogonality can only be meaningfully determined by visually inspecting whether two vectors look perpendicular, which is impossible once a space cannot be drawn', isCorrect: false, misconceptionId: `${ORTHOGONALITY}:MC-1` },
      { text: 'No, because the concept of "perpendicular" simply does not exist in dimensions higher than 3', isCorrect: false, misconceptionId: `${ORTHOGONALITY}:MC-1` },
    ],
    targetedMisconceptions: [`${ORTHOGONALITY}:MC-1`],
    source: eb(ORTHOGONALITY, 'Demonstration 1 — checking orthogonality via the dot product for a picturable 2D pair and an unpicturable 4D pair using the identical formula both times, directly breaking ORTHOGONALITY-REQUIRES-VISUALIZATION'),
  },
  {
    conceptId: ORTHOGONALITY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'u=(10,0) and v=(0,-3) satisfy u·v=0, but neither vector has length 1. Are u and v orthogonal?',
    choices: [
      { text: 'Yes — orthogonality requires only u·v=0 and makes no length requirement whatsoever; orthoNORMALITY is the separate, stronger condition that additionally requires each vector to have length exactly 1', isCorrect: true },
      { text: 'No — orthogonal vectors must each have length exactly 1, so since neither u nor v is a unit vector, they cannot be considered orthogonal', isCorrect: false, misconceptionId: `${ORTHOGONALITY}:MC-2` },
      { text: 'No, because orthogonality is only defined for vectors that have already been normalized to unit length beforehand', isCorrect: false, misconceptionId: `${ORTHOGONALITY}:MC-2` },
    ],
    targetedMisconceptions: [`${ORTHOGONALITY}:MC-2`],
    source: eb(ORTHOGONALITY, 'Demonstration 2 — confirming u=(10,0) and v=(0,-3) are orthogonal despite neither being a unit vector, directly breaking ORTHOGONAL-REQUIRES-UNIT-LENGTH'),
  },
  {
    conceptId: ORTHOGONALITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Computing a·b for a=(1,0.001) and b=(0.001,1) gives exactly 0.002. Are a and b orthogonal?',
    choices: [
      { text: 'No — orthogonality is an exact condition; a dot product of 0.002 means the vectors are definitively NOT orthogonal, exactly as decisively as a dot product of 500 would be, with no "close enough" category', isCorrect: true },
      { text: 'Yes — 0.002 is so close to zero that the vectors should be treated as approximately orthogonal for practical purposes', isCorrect: false, misconceptionId: `${ORTHOGONALITY}:MC-3` },
      { text: "Yes, since any dot product small enough to round to zero at a reasonable level of precision counts as satisfying the orthogonality condition", isCorrect: false, misconceptionId: `${ORTHOGONALITY}:MC-3` },
    ],
    targetedMisconceptions: [`${ORTHOGONALITY}:MC-3`],
    source: eb(ORTHOGONALITY, 'Demonstration 3 — computing the exact dot product of a=(1,0.001) and b=(0.001,1) as 0.002 (not zero), contrasted with a genuinely orthogonal pair, directly breaking SMALL-DOT-PRODUCT-MEANS-APPROXIMATELY-ORTHOGONAL'),
  },
]
