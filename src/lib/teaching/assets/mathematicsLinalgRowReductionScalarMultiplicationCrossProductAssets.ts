/**
 * Batch: row-reduction, scalar-multiplication, cross-product (math.linalg).
 *
 * Continuing math.linalg (17/61 -> 20/61). Fresh frontier recompute found
 * 8 ready concepts. Selected row-reduction for its highest downstream
 * unlock value (opens row-echelon, lu-factorization), plus
 * scalar-multiplication (closes the vector-addition pairing opened Batch
 * 107) and cross-product (closes the dot-product companion opened Batch
 * 104) — both terminal leaves with no further unlocks but complete their
 * own concept families.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.linalg.{row-reduction,scalar-multiplication,cross-product}.md.
 *
 *   ROW-REDUCTION  the three already-guaranteed-safe row operations are
 *           applied in a SPECIFIC, DISCIPLINED column-by-column, left-to-
 *           right order — skipping ahead can re-introduce nonzero entries
 *           in already-cleared columns; row echelon form (each pivot
 *           strictly right of the one above, zero rows at the bottom) is
 *           a SIMPLER equivalent system, NOT yet the numeric answer —
 *           back-substitution, working bottom to top, is the required
 *           additional step that actually solves it.
 *   SCALAR-MULTIPLICATION  c(v₁,…,vₙ)=(cv₁,…,cvₙ) multiplies EVERY
 *           component by the same c — never adds c, never applies it to
 *           only one component; the sign of c determines direction
 *           (negative REVERSES it) while |c| determines the scaling
 *           factor, and BOTH apply to every component simultaneously —
 *           the sign is not a decoration on the magnitude but carried
 *           into each entry by the same multiplication.
 *   CROSS-PRODUCT  a×b produces a genuinely NEW VECTOR (unlike the dot
 *           product's scalar), perpendicular to BOTH a and b — verified
 *           by dot-producting the result with both originals, which must
 *           give exactly zero both times, a more reliable check than
 *           magnitude alone; the cross product is ANTI-COMMUTATIVE,
 *           a×b=−(b×a), a genuinely different behavior from the dot
 *           product's commutativity that must be actively held, not
 *           assumed by analogy.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const ROW_REDUCTION = 'math.linalg.row-reduction'
const SCALAR_MULTIPLICATION = 'math.linalg.scalar-multiplication'
const CROSS_PRODUCT = 'math.linalg.cross-product'

export const MATHEMATICS_LINALG_ROW_REDUCTION_SCALAR_MULTIPLICATION_CROSS_PRODUCT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ROW_REDUCTION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'COLUMN BY COLUMN, LEFT TO RIGHT — NEVER SKIP AHEAD: ROW REDUCTION applies the three '
      + 'already-guaranteed-safe row operations (from math.linalg.augmented-matrix) in a SPECIFIC, '
      + 'DISCIPLINED order: working left to right through the columns, use each column’s pivot row '
      + 'to eliminate all entries BELOW it in that column, then move to the next column. This '
      + 'systematic sweep is what distinguishes row reduction from applying row operations in an '
      + 'arbitrary, ad hoc order — skipping ahead to a later column before fully clearing an '
      + 'earlier one can re-introduce nonzero entries in columns already cleared, undoing prior '
      + 'work.\n\n'
      + 'STAIRCASE PATTERN, STRICTLY RIGHTWARD, EVERY ROW: the target shape of this process is ROW '
      + 'ECHELON FORM (REF): each nonzero row’s leading (leftmost nonzero) entry — its PIVOT — sits '
      + 'strictly to the right of the pivot in the row directly above it, and any fully-zero rows '
      + 'are pushed to the bottom. This staircase pattern signals that no further elimination is '
      + 'needed below any pivot.\n\n'
      + 'ECHELON FORM IS SIMPLER, NOT SOLVED — BACK-SUBSTITUTE TO FINISH: row echelon form is NOT '
      + 'yet the numeric answer — it is a SIMPLER, equivalent system (same solution set, by the '
      + 'row-operation guarantee already established), but not yet solved. BACK-SUBSTITUTION '
      + 'extracts the actual values: starting from the BOTTOM row, solve for that variable, then '
      + 'substitute it upward into the row above to solve for the next, working bottom to top. Row '
      + 'reduction transforms the system into a form where this substitution becomes easy — it '
      + 'does not perform the substitution itself.',
    targetedMisconceptions: [`${ROW_REDUCTION}:MC-1`, `${ROW_REDUCTION}:MC-2`, `${ROW_REDUCTION}:MC-3`],
    source: eb(ROW_REDUCTION, 'Core Understanding — the disciplined column-by-column, left-to-right elimination order, row echelon form as the staircase target of that sweep, and back-substitution as the required additional step that actually solves the system'),
  },
  {
    conceptId: SCALAR_MULTIPLICATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'MULTIPLY, EVERY COMPONENT — NEVER ADD: scalar multiplication multiplies EVERY component of '
      + 'a vector by the same real number c: c(v₁,v₂,…,vₙ)=(cv₁,cv₂,…,cvₙ) — reusing '
      + 'math.linalg.vector’s own component structure, applying c uniformly to every entry, never '
      + 'to just one. Geometrically, this scales the displacement arrow: |c| stretches the arrow '
      + '(if |c|>1) or compresses it (if 0<|c|<1), and the SIGN of c determines direction — '
      + 'positive keeps the same direction, negative REVERSES it.\n\n'
      + 'ONE SCALAR, AS MANY MULTIPLICATIONS AS THERE ARE COMPONENTS: three special scalars anchor '
      + 'the operation: 1·v=v (the multiplicative identity, changing nothing), 0·v=0 (the zero '
      + 'scalar annihilates every vector to the zero vector), and (−1)·v=−v (negation — the exact '
      + 'additive inverse math.linalg.vector-addition defines).\n\n'
      + 'THE SIGN FLIPS DIRECTION; THE SIZE SCALES LENGTH — BOTH APPLY EVERYWHERE, EVERY TIME: the '
      + 'negative sign is not a separate case bolted onto the rule; it is carried into EVERY '
      + 'component by the same multiplication, so (−2)(3,4)=(−6,−8), not (6,8) — the sign '
      + 'genuinely flips each component, it does not merely scale a magnitude. Together with '
      + 'vector addition, scalar multiplication is one of the two operations that make ℝⁿ a '
      + 'vector space.',
    targetedMisconceptions: [`${SCALAR_MULTIPLICATION}:MC-1`, `${SCALAR_MULTIPLICATION}:MC-2`, `${SCALAR_MULTIPLICATION}:MC-3`],
    source: eb(SCALAR_MULTIPLICATION, 'Core Understanding — c(v₁,…,vₙ)=(cv₁,…,cvₙ) as multiplication (never addition) applied to every component, the three special scalars 0/1/−1, and the sign carrying into every component exactly as the magnitude does'),
  },
  {
    conceptId: CROSS_PRODUCT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A NEW VECTOR, PERPENDICULAR TO BOTH INPUTS: the CROSS PRODUCT, defined only in ℝ³, is '
      + 'a×b=(a₂b₃−a₃b₂, a₃b₁−a₁b₃, a₁b₂−a₂b₁) — reusing math.linalg.vector’s own component '
      + 'structure directly, but producing a genuinely NEW VECTOR, unlike math.linalg.dot-product’s '
      + 'own scalar output. Computing each of the three components in a consistent cyclic pattern '
      + '(indices (2,3), then (3,1), then (1,2)) reduces index-mixing errors. Geometrically, the '
      + 'result is PERPENDICULAR to BOTH a and b, and its magnitude equals |a||b|sinθ — exactly the '
      + 'AREA of the parallelogram formed by a and b.\n\n'
      + 'VERIFY WITH THE DOT PRODUCT — ZERO BOTH TIMES, OR IT’S WRONG: the most diagnostic '
      + 'verification that a computed cross product is correct is checking PERPENDICULARITY: '
      + 'dot-producting the result with BOTH original vectors must give exactly zero both times, '
      + 'reusing math.linalg.dot-product’s own zero-means-orthogonal test directly. This check is '
      + 'more reliable than confirming the magnitude alone, since a computational slip could still '
      + 'produce a wrong but nonzero-magnitude vector.\n\n'
      + 'REVERSE THE ORDER, REVERSE THE DIRECTION — NEVER THE SAME RESULT: the cross product is '
      + 'ANTI-COMMUTATIVE: a×b=−(b×a) — swapping the order REVERSES the sign (and hence direction) '
      + 'of the result. This is a genuinely different behavior from math.linalg.dot-product’s '
      + 'COMMUTATIVITY (a·b=b·a); the two vector products behave oppositely under operand-order '
      + 'reversal, and this distinction must be actively held, not assumed by analogy.',
    targetedMisconceptions: [`${CROSS_PRODUCT}:MC-1`, `${CROSS_PRODUCT}:MC-2`, `${CROSS_PRODUCT}:MC-3`],
    source: eb(CROSS_PRODUCT, 'Core Understanding — a×b as a new perpendicular vector computed via the cyclic component formula, verified by the dot-product zero test with both originals, and anti-commutative unlike the dot product’s own commutativity'),
  },
]

export const MATHEMATICS_LINALG_ROW_REDUCTION_SCALAR_MULTIPLICATION_CROSS_PRODUCT_PROBES: SeedProbe[] = [
  {
    conceptId: ROW_REDUCTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'While row-reducing a 3-equation system, is it safe to jump ahead and start clearing column 2 before column 1 has been fully cleared below its pivot?',
    choices: [
      { text: 'No — row reduction requires a disciplined column-by-column, left-to-right sweep; jumping ahead to column 2 before fully clearing column 1 can re-introduce nonzero entries in column 1, undoing prior work', isCorrect: true },
      { text: "Yes — since the three row operations are each individually legal in any order, they can be applied to any column in whatever sequence is convenient", isCorrect: false, misconceptionId: `${ROW_REDUCTION}:MC-2` },
      { text: "Yes, because once a column's pivot has been identified, the order in which subsequent columns are cleared has no effect on the final result", isCorrect: false, misconceptionId: `${ROW_REDUCTION}:MC-2` },
    ],
    targetedMisconceptions: [`${ROW_REDUCTION}:MC-2`],
    source: eb(ROW_REDUCTION, 'Demonstration 1 — eliminating a 3-equation system’s column 1 fully before moving to column 2, narrating the strict left-to-right order explicitly, directly breaking ROW-OPERATIONS-APPLIED-OUT-OF-SYSTEMATIC-ORDER'),
  },
  {
    conceptId: ROW_REDUCTION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A matrix has mostly-zero rows and looks like a staircase at a glance, but one row’s pivot sits in the SAME column as the pivot in the row above it. Is this matrix in row echelon form?',
    choices: [
      { text: 'No — echelon form requires each row’s pivot to sit STRICTLY to the right of the pivot in the row above, checked explicitly row by row; a pivot in the same column (not strictly rightward) disqualifies it, however staircase-like the matrix looks overall', isCorrect: true },
      { text: 'Yes — as long as the matrix has mostly-zero rows arranged in a generally descending pattern, it counts as row echelon form regardless of exact pivot positions', isCorrect: false, misconceptionId: `${ROW_REDUCTION}:MC-3` },
      { text: "Yes, since visually resembling a staircase shape is sufficient to classify a matrix as being in row echelon form", isCorrect: false, misconceptionId: `${ROW_REDUCTION}:MC-3` },
    ],
    targetedMisconceptions: [`${ROW_REDUCTION}:MC-3`],
    source: eb(ROW_REDUCTION, 'Demonstration 2 — contrasting a genuine echelon-form matrix (staircase going the right way) against a non-example (staircase backward), showing the fix is a row swap, directly breaking ECHELON-FORM-PIVOT-PATTERN-MISJUDGED'),
  },
  {
    conceptId: ROW_REDUCTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A system has just been row-reduced to row echelon form. Has the system now been solved?',
    choices: [
      { text: 'No — echelon form is a SIMPLER, equivalent system with the same solution set, but the numeric values are not yet found; BACK-SUBSTITUTION, working from the bottom row upward, is the required additional step that actually solves for the unknowns', isCorrect: true },
      { text: 'Yes — reaching row echelon form is the final goal of solving a linear system, and no further computation is needed once that staircase pattern emerges', isCorrect: false, misconceptionId: `${ROW_REDUCTION}:MC-1` },
      { text: "Yes, since the elimination process that produces echelon form already determines every unknown's numeric value along the way", isCorrect: false, misconceptionId: `${ROW_REDUCTION}:MC-1` },
    ],
    targetedMisconceptions: [`${ROW_REDUCTION}:MC-1`],
    source: eb(ROW_REDUCTION, 'Demonstration 3 — translating a completed echelon form back to equations, showing three unknowns remain undetermined numerically, then performing the full bottom-to-top back-substitution, directly breaking ECHELON-FORM-MISTAKEN-FOR-SOLVED-SYSTEM'),
  },
  {
    conceptId: SCALAR_MULTIPLICATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'To compute 3(2,5), should the scalar 3 be added to each component, or multiplied with each component?',
    choices: [
      { text: 'Multiplied — 3(2,5)=(3×2,3×5)=(6,15); the notation c·v specifies multiplication applied to every component, never addition', isCorrect: true },
      { text: 'Added — 3(2,5)=(2+3,5+3)=(5,8), since a number placed next to a vector expression signals adding that number to each entry', isCorrect: false, misconceptionId: `${SCALAR_MULTIPLICATION}:MC-1` },
      { text: 'It does not matter which operation is used, since scalar multiplication and adding a constant to each component produce equivalent results', isCorrect: false, misconceptionId: `${SCALAR_MULTIPLICATION}:MC-1` },
    ],
    targetedMisconceptions: [`${SCALAR_MULTIPLICATION}:MC-1`],
    source: eb(SCALAR_MULTIPLICATION, 'Demonstration 1 — computing 5(1,3) step by step as 5×1 and 5×3, contrasting explicitly against the incorrect 1+5 and 3+5, directly breaking SCALAR-ADDS-TO-COMPONENTS'),
  },
  {
    conceptId: SCALAR_MULTIPLICATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For the 3-component vector (4,2,7), how many separate multiplications does computing 3(4,2,7) require?',
    choices: [
      { text: 'Three — one multiplication per component: 3×4, 3×2, and 3×7, giving (12,6,21); the scalar must be applied to EVERY component, never skipping any', isCorrect: true },
      { text: 'One — the scalar only needs to be applied to the first component, since that establishes the scaling for the whole vector', isCorrect: false, misconceptionId: `${SCALAR_MULTIPLICATION}:MC-2` },
      { text: "It depends on the specific numbers involved, since some components may not require an actual multiplication to be performed", isCorrect: false, misconceptionId: `${SCALAR_MULTIPLICATION}:MC-2` },
    ],
    targetedMisconceptions: [`${SCALAR_MULTIPLICATION}:MC-2`],
    source: eb(SCALAR_MULTIPLICATION, 'Demonstration 2 — computing 3(4,2,7) and counting exactly three multiplications performed, contrasting against a result leaving two of three components unchanged, directly breaking SCALAR-MULTIPLIED-ONCE'),
  },
  {
    conceptId: SCALAR_MULTIPLICATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Computing -2(3,4), does the negative sign only affect the overall size of the result, or does it also reverse the direction?',
    choices: [
      { text: 'It reverses the direction too — -2(3,4)=(-6,-8), not (6,8); the sign is carried into EVERY component by the same multiplication, genuinely flipping each entry, not merely scaling a magnitude', isCorrect: true },
      { text: 'It only affects the size — -2(3,4)=(6,8), since the magnitude 2 determines how much the vector stretches while the negative sign is just a label indicating the scalar was negative', isCorrect: false, misconceptionId: `${SCALAR_MULTIPLICATION}:MC-3` },
      { text: "The negative sign has no effect at all on the resulting vector once the magnitude of the scalar has been applied to each component", isCorrect: false, misconceptionId: `${SCALAR_MULTIPLICATION}:MC-3` },
    ],
    targetedMisconceptions: [`${SCALAR_MULTIPLICATION}:MC-3`],
    source: eb(SCALAR_MULTIPLICATION, 'Demonstration 3 — computing 2(3,4)=(6,8) and -2(3,4)=(-6,-8) side by side, showing the negative sign flips BOTH components, directly breaking NEGATIVE-SCALAR-MAGNIFIES'),
  },
  {
    conceptId: CROSS_PRODUCT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For (1,2,3)×(4,5,6), the second component of the result should use which pair of indices from the cyclic pattern?',
    choices: [
      { text: 'Indices (3,1) — the cyclic pattern for the three components is (2,3), then (3,1), then (1,2); using this pattern consistently for (1,2,3)×(4,5,6) reduces index-mixing errors and gives (-3,6,-3)', isCorrect: true },
      { text: 'Indices (2,3) again — the same pair of indices used for the first component should be reused for every subsequent component of the cross product', isCorrect: false, misconceptionId: `${CROSS_PRODUCT}:MC-3` },
      { text: 'Whichever pair of indices is most convenient to compute, since the cross product formula does not require a fixed order across the three components', isCorrect: false, misconceptionId: `${CROSS_PRODUCT}:MC-3` },
    ],
    targetedMisconceptions: [`${CROSS_PRODUCT}:MC-3`],
    source: eb(CROSS_PRODUCT, 'Demonstration 1 — computing (1,2,3)×(4,5,6) component by component using the cyclic (2,3)→(3,1)→(1,2) pattern, getting (-3,6,-3), directly breaking CROSS-PRODUCT-COMPONENT-FORMULA-INDICES-MIXED-UP'),
  },
  {
    conceptId: CROSS_PRODUCT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'After computing a cross product, its magnitude looks like a plausible number. Does that alone confirm the computation is correct?',
    choices: [
      { text: 'No — the most diagnostic verification is checking PERPENDICULARITY: dot-producting the result with BOTH original vectors must give exactly zero both times; a computational slip could still produce a wrong but nonzero-magnitude vector that looks plausible', isCorrect: true },
      { text: "Yes — if the resulting vector's magnitude falls within a reasonable range given the inputs, that is sufficient confirmation that the cross product was computed correctly", isCorrect: false, misconceptionId: `${CROSS_PRODUCT}:MC-1` },
      { text: 'Yes, since a plausible magnitude is the primary indicator of correctness for a cross-product computation, with no further check needed', isCorrect: false, misconceptionId: `${CROSS_PRODUCT}:MC-1` },
    ],
    targetedMisconceptions: [`${CROSS_PRODUCT}:MC-1`],
    source: eb(CROSS_PRODUCT, 'Demonstration 2 — verifying (-3,6,-3) is perpendicular to both (1,2,3) and (4,5,6) by dot-producting with each, confirming both equal exactly zero, directly breaking CROSS-PRODUCT-PERPENDICULARITY-NOT-VERIFIED'),
  },
  {
    conceptId: CROSS_PRODUCT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Should a×b and b×a give the same result, the same way the dot product a·b equals b·a?',
    choices: [
      { text: 'No — the cross product is ANTI-COMMUTATIVE, a×b=−(b×a); swapping the operand order reverses the sign of every component, a genuinely different behavior from the dot product’s commutativity that must be actively held, not assumed by analogy', isCorrect: true },
      { text: 'Yes — since the dot product is commutative (a·b=b·a), the cross product, being another kind of vector product, should behave the same way under operand-order reversal', isCorrect: false, misconceptionId: `${CROSS_PRODUCT}:MC-2` },
      { text: "Yes, because both the dot product and cross product are defined using the same underlying vector components, so their order-independence properties must match", isCorrect: false, misconceptionId: `${CROSS_PRODUCT}:MC-2` },
    ],
    targetedMisconceptions: [`${CROSS_PRODUCT}:MC-2`],
    source: eb(CROSS_PRODUCT, 'Demonstration 3 — computing (4,5,6)×(1,2,3) (reversed order) getting (3,-6,3), exactly the negation of the original result, confirming anti-commutativity, directly breaking CROSS-PRODUCT-ASSUMED-COMMUTATIVE'),
  },
]
