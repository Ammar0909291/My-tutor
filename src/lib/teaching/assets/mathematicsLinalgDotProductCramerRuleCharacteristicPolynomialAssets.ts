/**
 * Batch: dot-product, cramer-rule, characteristic-polynomial (math.linalg).
 *
 * Continuing math.linalg (5/61 -> 8/61). Fresh frontier recompute found 8
 * ready concepts. Selected dot-product for its highest downstream unlock
 * value (opens norm, angle-vectors, orthogonality — 3 further concepts),
 * plus cramer-rule and characteristic-polynomial, which close out the
 * matrix-inverse and eigenvalues chains opened in Batch 103 (both are
 * terminal leaves with no further unlocks, but complete their own
 * concept families).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.linalg.{dot-product,cramer-rule,characteristic-polynomial}.md.
 *
 *   DOT-PRODUCT  a·b=Σaᵢbᵢ PAIRS ACROSS vectors by shared position, multiplies
 *           each pair, then SUMS everything into a single SCALAR — never a
 *           vector; the element-wise (Hadamard) product a⊙b stops after
 *           multiplying and is a genuinely different, vector-valued
 *           operation; a·b=0 iff the vectors are perpendicular (orthogonal);
 *           the component formula Σaᵢbᵢ applies directly whenever components
 *           are given — no magnitude or angle computation is ever required.
 *   CRAMER-RULE  xᵢ=det(Aᵢ)/det(A), where Aᵢ replaces COLUMN i of A with b —
 *           the column replaced must match the variable's own subscript
 *           exactly; det(A)=0 means the FORMULA is inapplicable (undefined
 *           ratio), never that the system definitively has no solution —
 *           determining no-solution vs. infinite-solutions needs a separate
 *           rank comparison; the rule is elegant but PRACTICALLY INEFFICIENT
 *           for large systems (n+1 determinants vs. row reduction's single
 *           O(n^3) pass).
 *   CHARACTERISTIC-POLYNOMIAL  p(λ)=det(A−λI) subtracts λ ONLY from the
 *           diagonal entries of A, never the off-diagonal ones; its roots
 *           are exactly A's eigenvalues; the Cayley-Hamilton theorem states
 *           A satisfies its OWN characteristic polynomial, p(A)=0 — but
 *           substituting the matrix A for λ requires converting EVERY
 *           constant term into that constant TIMES the identity matrix I,
 *           since a bare scalar cannot be added directly to a matrix.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const DOT_PRODUCT = 'math.linalg.dot-product'
const CRAMER_RULE = 'math.linalg.cramer-rule'
const CHARACTERISTIC_POLYNOMIAL = 'math.linalg.characteristic-polynomial'

export const MATHEMATICS_LINALG_DOT_PRODUCT_CRAMER_RULE_CHARACTERISTIC_POLYNOMIAL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DOT_PRODUCT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'PAIR, MULTIPLY, SUM — THE ANSWER IS ALWAYS ONE SINGLE NUMBER: for vectors a=(a₁,…,aₙ) and '
      + 'b=(b₁,…,bₙ), the dot product a·b=Σᵢaᵢbᵢ pairs each component by its SHARED POSITION '
      + '(reusing math.linalg.vector’s own indexed structure), multiplies each pair (reusing '
      + 'math.arith.multiplication’s signed products), then SUMS all the products into a single '
      + 'SCALAR. This is a genuinely different output type from vector addition or scalar '
      + 'multiplication — those return vectors; the dot product always collapses to one number.\n\n'
      + 'NOT THE ELEMENT-WISE (HADAMARD) PRODUCT: a⊙b=(a₁b₁,…,aₙbₙ) STOPS after multiplying and '
      + 'produces a vector — a genuinely different operation. The dot symbol always means: multiply '
      + 'pairs, THEN sum everything into one number. Stopping at the element-wise product without '
      + 'performing the final summation leaves an answer that is still a vector, not a dot product.\n\n'
      + 'SAME OPERATION, TWO FORMULAS: geometrically, a·b=|a||b|cosθ, where θ is the angle between '
      + 'the two vectors. The component formula (Σaᵢbᵢ) is used directly when components are given; '
      + 'the geometric formula is used when angle and magnitude are known instead — reaching for '
      + 'magnitude and angle when components are already given is an unnecessary detour. A direct '
      + 'corollary of the geometric formula gives the ORTHOGONALITY criterion: a·b=0 if and only if '
      + 'cosθ=0, i.e. θ=90° — the vectors are perpendicular, a scalar zero reporting a geometric '
      + 'fact about direction, never a zero vector.',
    targetedMisconceptions: [`${DOT_PRODUCT}:MC-1`, `${DOT_PRODUCT}:MC-2`, `${DOT_PRODUCT}:MC-3`],
    source: eb(DOT_PRODUCT, 'Core Understanding — the dot product as pair-multiply-sum collapsing to a scalar, its distinction from the vector-valued Hadamard product, and the component formula vs. geometric formula with the orthogonality corollary'),
  },
  {
    conceptId: CRAMER_RULE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'REPLACE COLUMN i WITH b — MATCH THE SUBSCRIPT EXACTLY: Cramer’s Rule gives a direct '
      + 'FORMULA for each solution component of Ax=b when det(A)≠0 (reusing '
      + 'math.linalg.matrix-inverse’s own invertibility criterion directly). Define Aᵢ as A with '
      + 'COLUMN i replaced by the vector b, every other column left unchanged. Then '
      + 'xᵢ=det(Aᵢ)/det(A) for each i. The column replaced must match EXACTLY the variable being '
      + 'solved for: to find x₁, replace column 1; to find x₂, replace column 2 — never any other '
      + 'column.\n\n'
      + 'det(A)=0 MEANS THE FORMULA IS INAPPLICABLE, NOT "NO SOLUTION": if det(A)=0, Cramer’s '
      + 'Rule cannot be applied at all — this is the same invertibility failure '
      + 'math.linalg.matrix-inverse already establishes. The system could have either no solution '
      + 'or infinitely many; the ratio det(Aᵢ)/det(A) is UNDEFINED (division by zero), not a '
      + 'legitimate answer of zero or any other value. Determining which case actually holds '
      + 'requires a separate rank comparison via math.linalg.linear-system, not a conclusion drawn '
      + 'directly from the zero determinant.\n\n'
      + 'ELEGANT BUT PRACTICALLY INEFFICIENT FOR LARGE SYSTEMS: solving an n×n system requires '
      + 'computing n+1 separate determinants (det(A) plus det(A₁),…,det(Aₙ)), each expensive for '
      + 'large n. Row reduction solves the ENTIRE system in a single O(n³) pass, making it the '
      + 'practical method of choice once n grows beyond a small handful of equations — Cramer’s '
      + 'Rule is reserved for small systems or when a single specific unknown is needed.',
    targetedMisconceptions: [`${CRAMER_RULE}:MC-1`, `${CRAMER_RULE}:MC-2`, `${CRAMER_RULE}:MC-3`],
    source: eb(CRAMER_RULE, 'Core Understanding — xᵢ=det(Aᵢ)/det(A) with the column-to-subscript matching requirement, det(A)=0 as rule-inapplicable rather than no-solution, and the efficiency comparison against row reduction for large systems'),
  },
  {
    conceptId: CHARACTERISTIC_POLYNOMIAL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'p(λ)=det(A−λI) — SUBTRACT λ ONLY ON THE DIAGONAL: the characteristic polynomial of an n×n '
      + 'matrix A is p(λ)=det(A−λI), reusing math.linalg.determinant’s own computation directly, '
      + 'applied to A−λI. The matrix λI contributes −λ to EVERY diagonal position and ZERO to every '
      + 'off-diagonal position — forming λI explicitly as a full matrix first, then subtracting it '
      + 'entry by entry, prevents misplacing where the subtraction applies. This is a degree-n '
      + 'polynomial whose ROOTS are exactly the EIGENVALUES of A, reusing math.linalg.eigenvalues’ '
      + 'own defining equation directly, since λ is an eigenvalue precisely when A−λI is singular.\n\n'
      + 'CAYLEY-HAMILTON: EVERY CONSTANT TERM BECOMES THAT CONSTANT TIMES I: the Cayley-Hamilton '
      + 'theorem states A satisfies its OWN characteristic polynomial — substituting the MATRIX A '
      + 'itself in place of λ gives p(A)=0 (the zero matrix). Ordinary polynomial substitution '
      + '(substituting a number for λ) leaves the constant term as a bare number, but when the '
      + 'substituted value is a MATRIX, a bare scalar cannot be added directly to it — EVERY term, '
      + 'including the constant, must become a matrix, with the constant term specifically becoming '
      + 'that number times the identity matrix I.\n\n'
      + 'This is a remarkable, non-obvious structural fact, useful for computing matrix powers '
      + 'efficiently: once A² is expressed in terms of A and I via Cayley-Hamilton, higher powers '
      + 'follow without repeated direct multiplication.',
    targetedMisconceptions: [`${CHARACTERISTIC_POLYNOMIAL}:MC-1`, `${CHARACTERISTIC_POLYNOMIAL}:MC-2`, `${CHARACTERISTIC_POLYNOMIAL}:MC-3`],
    source: eb(CHARACTERISTIC_POLYNOMIAL, 'Core Understanding — p(λ)=det(A−λI) with λ confined to the diagonal, its roots as A’s eigenvalues, and the Cayley-Hamilton theorem requiring every constant term to become that constant times I'),
  },
]

export const MATHEMATICS_LINALG_DOT_PRODUCT_CRAMER_RULE_CHARACTERISTIC_POLYNOMIAL_PROBES: SeedProbe[] = [
  {
    conceptId: DOT_PRODUCT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'To compute the dot product (1,2)·(3,4), what should the very first arithmetic step be?',
    choices: [
      { text: 'Multiply across the two vectors by position: 1×3 and 2×4 — pairing each vector’s first entries together and each vector’s second entries together, before summing the two products', isCorrect: true },
      { text: 'Add the components within each vector first (1+2=3 and 3+4=7), then multiply those two sums together (3×7=21)', isCorrect: false, misconceptionId: `${DOT_PRODUCT}:MC-1` },
      { text: "It doesn't matter which step comes first, since addition and multiplication can be applied to the four numbers in any order and still produce the dot product", isCorrect: false, misconceptionId: `${DOT_PRODUCT}:MC-1` },
    ],
    targetedMisconceptions: [`${DOT_PRODUCT}:MC-1`],
    source: eb(DOT_PRODUCT, 'Demonstration 1 — computing (1,2)·(3,4) by pairing across vectors first, contrasted explicitly against the incorrect add-within-vectors-first result, directly breaking ADD-THEN-MULTIPLY'),
  },
  {
    conceptId: DOT_PRODUCT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Multiplying (2,3) and (4,5) component-wise gives (8,15). Is (8,15) the dot product (2,3)·(4,5)?',
    choices: [
      { text: 'No — (8,15) is the element-wise (Hadamard) product, a different, vector-valued operation; the dot product requires one more step, summing those products into the single scalar 8+15=23', isCorrect: true },
      { text: "Yes — since vector addition and scalar multiplication both return vectors, the dot product of two vectors should also return a vector, and (8,15) is that vector", isCorrect: false, misconceptionId: `${DOT_PRODUCT}:MC-2` },
      { text: 'Yes, because multiplying the corresponding components together is the complete definition of the dot product, with no further step required', isCorrect: false, misconceptionId: `${DOT_PRODUCT}:MC-2` },
    ],
    targetedMisconceptions: [`${DOT_PRODUCT}:MC-2`],
    source: eb(DOT_PRODUCT, 'Demonstration 2 — computing (2,3)·(4,5) by stopping at the element-wise product (8,15) then performing the final sum to 23, naming the Hadamard product explicitly, directly breaking DOT-PRODUCT-IS-VECTOR'),
  },
  {
    conceptId: DOT_PRODUCT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Given the components of (2,3) and (4,5) directly, do you need to first find their magnitudes and the angle between them to compute the dot product?',
    choices: [
      { text: "No — with components already given, the component formula Σaᵢbᵢ=2(4)+3(5)=23 applies directly; computing magnitude and angle first is an unnecessary detour reserved for when only those quantities are known", isCorrect: true },
      { text: 'Yes — the dot product is fundamentally defined via |a||b|cosθ, so magnitude and angle must always be computed first regardless of what information is given', isCorrect: false, misconceptionId: `${DOT_PRODUCT}:MC-3` },
      { text: "Yes, because the component formula only works as an approximation and the geometric formula is required to get the exact, correct value", isCorrect: false, misconceptionId: `${DOT_PRODUCT}:MC-3` },
    ],
    targetedMisconceptions: [`${DOT_PRODUCT}:MC-3`],
    source: eb(DOT_PRODUCT, 'Demonstration 3 — computing (2,3)·(4,5)=23 using only the component formula with no magnitude or angle computed anywhere, directly breaking COSINE-FORMULA-ONLY'),
  },
  {
    conceptId: CRAMER_RULE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Using Cramer’s Rule to solve for x₂ in a 2×2 system Ax=b, which column of A should be replaced with b to form A₂?',
    choices: [
      { text: 'Column 2 — the column replaced must match exactly the subscript of the variable being solved for; solving for x₂ means replacing column 2, leaving column 1 unchanged', isCorrect: true },
      { text: 'Column 1 — since Cramer’s Rule always starts by replacing the first column, regardless of which variable is being solved for', isCorrect: false, misconceptionId: `${CRAMER_RULE}:MC-1` },
      { text: 'It does not matter which column is replaced, as long as one column of A is swapped for b before computing the determinant ratio', isCorrect: false, misconceptionId: `${CRAMER_RULE}:MC-1` },
    ],
    targetedMisconceptions: [`${CRAMER_RULE}:MC-1`],
    source: eb(CRAMER_RULE, 'Demonstration 1 — constructing A₁ and A₂ side by side for a 2×2 system, explicitly matching each to its corresponding variable, directly breaking CRAMERS-RULE-WRONG-COLUMN-REPLACED'),
  },
  {
    conceptId: CRAMER_RULE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For a system Ax=b with det(A)=0, does Cramer’s Rule tell you the system definitely has no solution?',
    choices: [
      { text: 'No — det(A)=0 means the FORMULA itself is inapplicable (the ratio det(Aᵢ)/det(A) is undefined); the system could have either no solution or infinitely many, which requires a separate rank comparison to determine', isCorrect: true },
      { text: 'Yes — a zero determinant is a direct signal that the system Ax=b has no solution whatsoever, with no further investigation needed', isCorrect: false, misconceptionId: `${CRAMER_RULE}:MC-2` },
      { text: 'Yes, because det(A)=0 makes every ratio det(Aᵢ)/det(A) equal to zero, meaning every variable would have to equal zero, which is impossible', isCorrect: false, misconceptionId: `${CRAMER_RULE}:MC-2` },
    ],
    targetedMisconceptions: [`${CRAMER_RULE}:MC-2`],
    source: eb(CRAMER_RULE, 'Demonstration 2 — showing Cramer’s Rule gives an undefined ratio for a det(A)=0 system, then using rank comparison to determine no-solution vs. infinitely many, directly breaking ZERO-DETERMINANT-MISINTERPRETED-AS-NO-SOLUTION'),
  },
  {
    conceptId: CRAMER_RULE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For a system of 10 equations, is Cramer’s Rule or row reduction the more practical method?',
    choices: [
      { text: 'Row reduction — solving an n×n system via Cramer’s Rule requires computing n+1 separate determinants, each itself expensive for large n, while row reduction solves the entire system in a single O(n³) pass', isCorrect: true },
      { text: "Cramer's Rule — since it provides a direct formula for each variable rather than an iterative procedure, it remains the more efficient choice regardless of how many equations are involved", isCorrect: false, misconceptionId: `${CRAMER_RULE}:MC-3` },
      { text: 'Both methods require exactly the same amount of computation for any system size, so the choice between them is purely a matter of preference', isCorrect: false, misconceptionId: `${CRAMER_RULE}:MC-3` },
    ],
    targetedMisconceptions: [`${CRAMER_RULE}:MC-3`],
    source: eb(CRAMER_RULE, 'Demonstration 3 — comparing the number of determinants required for a 2×2 system (3 total) versus a 6×6 system (7 total), contrasting against row reduction’s single pass, directly breaking CRAMERS-RULE-USED-FOR-LARGE-SYSTEMS-WITHOUT-EFFICIENCY-AWARENESS'),
  },
  {
    conceptId: CHARACTERISTIC_POLYNOMIAL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'When forming A−λI for A=[[3,1],[0,2]], does λ get subtracted from every entry of A, or only some of them?',
    choices: [
      { text: 'Only the diagonal entries — λI contributes −λ to every diagonal position and zero to every off-diagonal position, giving A−λI=[[3−λ,1],[0,2−λ]], with λ appearing only on the diagonal', isCorrect: true },
      { text: 'Every entry of A, including the off-diagonal 1 and 0, since λI is subtracted from the whole matrix uniformly', isCorrect: false, misconceptionId: `${CHARACTERISTIC_POLYNOMIAL}:MC-1` },
      { text: 'Only the off-diagonal entries, since the diagonal entries are left untouched by the subtraction of λI', isCorrect: false, misconceptionId: `${CHARACTERISTIC_POLYNOMIAL}:MC-1` },
    ],
    targetedMisconceptions: [`${CHARACTERISTIC_POLYNOMIAL}:MC-1`],
    source: eb(CHARACTERISTIC_POLYNOMIAL, 'Demonstration 1 — forming A−λI=[[3−λ,1],[0,2−λ]] for A=[[3,1],[0,2]], explicitly showing λ appears only on the diagonal, directly breaking LAMBDA-SUBTRACTED-FROM-WRONG-ENTRIES'),
  },
  {
    conceptId: CHARACTERISTIC_POLYNOMIAL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For p(λ)=λ²−5λ+6, substituting the matrix A in place of λ per Cayley-Hamilton gives A²−5A+6. Is this a valid matrix equation as written?',
    choices: [
      { text: 'No — a bare scalar 6 cannot be added directly to a matrix; the constant term must be converted to that constant times the identity matrix, giving the valid equation A²−5A+6I=0', isCorrect: true },
      { text: 'Yes — substituting A for λ works exactly like substituting a number, so the constant term stays as the plain number 6 in the resulting matrix equation', isCorrect: false, misconceptionId: `${CHARACTERISTIC_POLYNOMIAL}:MC-2` },
      { text: "Yes, because Cayley-Hamilton only requires converting the λ² and λ terms to matrix powers, while the constant term is exempt from any such conversion", isCorrect: false, misconceptionId: `${CHARACTERISTIC_POLYNOMIAL}:MC-2` },
    ],
    targetedMisconceptions: [`${CHARACTERISTIC_POLYNOMIAL}:MC-2`],
    source: eb(CHARACTERISTIC_POLYNOMIAL, 'Demonstration 3 — verifying Cayley-Hamilton as A²−5A+6I=0 for A=[[3,1],[0,2]], contrasted against the invalid attempt to add "+6" as a bare scalar, directly breaking CAYLEY-HAMILTON-CONSTANT-TERM-NOT-CONVERTED-TO-IDENTITY-MULTIPLE'),
  },
  {
    conceptId: CHARACTERISTIC_POLYNOMIAL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'After computing det(A−λI) for a 2×2 matrix A, the resulting polynomial in λ turns out to have degree 3. Should this be accepted as correct?',
    choices: [
      { text: 'No — the characteristic polynomial’s degree must always match the matrix size n; a degree-3 result for a 2×2 matrix signals a determinant computation error that must be re-derived', isCorrect: true },
      { text: "Yes — the degree of the characteristic polynomial can vary independently of the matrix's size, so a degree-3 result is a perfectly valid outcome for a 2×2 matrix", isCorrect: false, misconceptionId: `${CHARACTERISTIC_POLYNOMIAL}:MC-3` },
      { text: 'Yes, since higher-degree characteristic polynomials simply indicate a matrix with more eigenvalues than its dimensions would suggest', isCorrect: false, misconceptionId: `${CHARACTERISTIC_POLYNOMIAL}:MC-3` },
    ],
    targetedMisconceptions: [`${CHARACTERISTIC_POLYNOMIAL}:MC-3`],
    source: eb(CHARACTERISTIC_POLYNOMIAL, 'Teaching Sequence mastery gate — requiring a correctly-formed characteristic polynomial with degree verified against matrix size n, directly breaking CHARACTERISTIC-POLYNOMIAL-DEGREE-MISMATCHED-TO-MATRIX-SIZE'),
  },
]
