/**
 * Batch: vector, matrix-inverse, eigenvalues (math.linalg) — domain pivot.
 *
 * math.prob's own frontier narrowed to a single ready concept
 * (random-variable) this pass. A broader cross-domain scan found
 * math.linalg with the most ready concepts (5) of any domain and already
 * partially open (2/61 authored from an older, separate "blueprint-
 * grounded authored batch" program) — the same "most ready + already
 * partially open" reasoning that originally opened math.prob in this
 * campaign. Selected the three ready concepts with the highest downstream
 * unlock value: vector (unlocks vector-space, dot-product), matrix-inverse
 * (unlocks cramer-rule), eigenvalues (unlocks diagonalization,
 * spectral-theorem) — together opening 5 further concepts.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.linalg.{vector,matrix-inverse,eigenvalues}.md.
 *
 *   VECTOR  a vector is an ORDERED n-tuple, coexisting geometric
 *           (displacement, no fixed anchor) and algebraic (component list)
 *           readings unified by that definition; a POINT names a fixed
 *           LOCATION while a VECTOR names a DISPLACEMENT that can start
 *           anywhere — identical notation, fundamentally different objects;
 *           order is part of the definition, so (3,4)≠(4,3); MAGNITUDE is a
 *           number derived FROM a vector, discarding direction — many
 *           distinct vectors share one magnitude.
 *   MATRIX-INVERSE  A is invertible iff det(A)≠0 — check this FIRST, always,
 *           before attempting the 2×2 formula or row reduction on [A|I]; a
 *           zero row appearing during that row reduction is DIAGNOSTIC
 *           confirmation of singularity, never a mistake to fix; the 2×2
 *           formula has three steps — swap, negate, AND divide by det(A) —
 *           omitting the division leaves an undivided candidate that does
 *           not actually satisfy AA⁻¹=I.
 *   EIGENVALUES  Av=λv defines an eigenvector/eigenvalue pair with v
 *           explicitly required nonzero — the zero vector trivially
 *           satisfies the equation for every A and λ but carries no
 *           directional information; eigenvalues solve
 *           det(A−λI)=0, the characteristic equation, NOT simply the
 *           diagonal entries (only true for triangular matrices); the
 *           eigenspace is a genuine SUBSPACE — any nonzero scalar multiple
 *           of an eigenvector is also an eigenvector for the same
 *           eigenvalue, never a single unique vector.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const VECTOR = 'math.linalg.vector'
const MATRIX_INVERSE = 'math.linalg.matrix-inverse'
const EIGENVALUES = 'math.linalg.eigenvalues'

export const MATHEMATICS_LINALG_VECTOR_MATRIX_INVERSE_EIGENVALUES_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: VECTOR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'SAME NOTATION, DIFFERENT OBJECTS: a vector in ℝⁿ is an ORDERED n-tuple of real numbers '
      + '(v₁,v₂,…,vₙ), each component drawn from math.found.real-numbers’ field. Two readings '
      + 'coexist without conflict: GEOMETRICALLY, a vector is an arrow with magnitude and '
      + 'direction, anchored to no fixed point — the displacement (3,4) starting at (0,0) ends at '
      + '(3,4), but starting at (1,2) ends at (4,6); ALGEBRAICALLY, it is simply an element of ℝⁿ, a '
      + 'list of components. A geometric POINT (3,4) names a unique, fixed LOCATION — reusing '
      + 'math.geom.x-y-coordinates’ ordered-pair notation. A vector (3,4) names a DISPLACEMENT '
      + 'that carries no fixed home and can be applied starting from anywhere. The notation is '
      + 'IDENTICAL; the objects are fundamentally different.\n\n'
      + 'ORDER IS PART OF THE DEFINITION: two vectors are equal iff all corresponding components '
      + 'are equal, u=v iff uᵢ=vᵢ for every index i. (3,4) and (4,3) are different vectors, pointing '
      + 'in genuinely different directions, because the FIRST component always measures one axis '
      + 'and the SECOND always measures another — this is not a set, where {3,4}={4,3} holds. The '
      + 'zero vector 0=(0,0,…,0) is the unique vector with every component zero.\n\n'
      + 'MAGNITUDE IS A NUMBER PULLED OUT OF A VECTOR: ‖v‖=√(v₁²+v₂²+⋯+vₙ²) is derived FROM a '
      + 'vector, not the vector itself — many distinct vectors, pointing every which way, can share '
      + 'the identical magnitude. Reporting only the magnitude discards exactly half of what a '
      + 'vector carries: its direction.',
    targetedMisconceptions: [`${VECTOR}:MC-1`, `${VECTOR}:MC-2`, `${VECTOR}:MC-3`],
    source: eb(VECTOR, 'Core Understanding — a vector as an ordered n-tuple with coexisting geometric/algebraic readings, a fixed point vs. a displacement sharing identical notation, order as part of the definition, and magnitude as a derived number that discards direction'),
  },
  {
    conceptId: MATRIX_INVERSE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'CHECK det(A)≠0 FIRST, ALWAYS: for a square matrix A, the inverse A⁻¹ (if it exists) is the '
      + 'unique matrix satisfying AA⁻¹=A⁻¹A=I. A is invertible exactly when det(A)≠0 — reusing '
      + 'math.linalg.determinant’s own criterion directly, equivalently when rank(A)=n or its '
      + 'columns are linearly independent. A matrix failing this is SINGULAR and has NO inverse — a '
      + 'one-line determinant check settles this before committing to any further computation.\n\n'
      + 'FOR A 2×2 MATRIX A=[[a,b],[c,d]], the inverse has a direct formula: '
      + 'A⁻¹=(1/det(A))·[[d,−b],[−c,a]] — swap the diagonal entries, negate the off-diagonal '
      + 'entries, AND DIVIDE by the determinant; the swap-and-negate step is visually salient, but '
      + 'omitting the final division leaves a candidate matrix that does NOT actually satisfy '
      + 'AA⁻¹=I. For larger matrices, row-reduce the augmented matrix [A|I] until the left side '
      + 'becomes I: [A|I]→[I|A⁻¹].\n\n'
      + 'A ZERO ROW IS THE ANSWER, NOT A MISTAKE: if A is singular (det(A)=0), a row on the left '
      + 'side of [A|I] will become entirely zeros partway through row reduction, meaning I can '
      + 'never be reached. This is row reduction itself CONFIRMING A has no inverse, exactly '
      + 'matching the det(A)=0 diagnosis — the two methods are consistent, never contradictory, and '
      + 'the determinant check should always come first since it settles invertibility in one line.',
    targetedMisconceptions: [`${MATRIX_INVERSE}:MC-1`, `${MATRIX_INVERSE}:MC-2`, `${MATRIX_INVERSE}:MC-3`],
    source: eb(MATRIX_INVERSE, 'Core Understanding — invertibility via det(A)≠0 checked first, the 2×2 formula’s three steps (swap, negate, divide), and a zero row during [A|I] row reduction as diagnostic confirmation of singularity rather than an error'),
  },
  {
    conceptId: EIGENVALUES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Av=λv, v≠0 — THE ZERO VECTOR IS ALWAYS EXCLUDED: a nonzero vector v is an EIGENVECTOR of a '
      + 'square matrix A with EIGENVALUE λ if Av=λv — the matrix maps v to a scalar multiple of '
      + 'itself, a FIXED DIRECTION that is only scaled, never rotated. The zero vector trivially '
      + 'satisfies A·0=λ·0 for every A and every λ, but carries no directional information about '
      + 'A’s fixed directions, so it is excluded by construction — a meaningful exclusion, not '
      + 'arbitrary formalism.\n\n'
      + 'det(A−λI)=0 — THE CHARACTERISTIC EQUATION, MANDATORY EXCEPT FOR TRIANGULAR MATRICES: '
      + 'Av=λv ⟺ (A−λI)v=0 has a nonzero solution ⟺ det(A−λI)=0, reusing math.linalg.determinant’s '
      + 'own computation directly, now applied to A−λI with a symbolic parameter λ. This degree-n '
      + 'polynomial’s roots are exactly A’s eigenvalues. For diagonal and triangular matrices, '
      + 'the diagonal entries genuinely ARE the eigenvalues — but this correct special case does '
      + 'NOT generalize to matrices where it fails; the characteristic equation is mandatory for a '
      + 'general matrix.\n\n'
      + 'AN EIGENVECTOR, NOT THE EIGENVECTOR: for each eigenvalue λ, the eigenspace '
      + 'Eλ=ker(A−λI) is a genuine SUBSPACE, not a single vector — if Av=λv and c≠0, then '
      + 'A(cv)=c·Av=cλv=λ(cv), so cv is ALSO an eigenvector with the same eigenvalue. "The '
      + 'eigenvector for λ" conventionally means a chosen representative of the eigenspace, never a '
      + 'unique object. Eigenvalues need not be real: a rotation matrix has no real eigenvectors, '
      + 'since no real direction survives a pure rotation unchanged.',
    targetedMisconceptions: [`${EIGENVALUES}:MC-1`, `${EIGENVALUES}:MC-2`, `${EIGENVALUES}:MC-3`],
    source: eb(EIGENVALUES, 'Core Understanding — Av=λv with the nonzero exclusion, the characteristic equation det(A−λI)=0 as mandatory except for triangular matrices, and the eigenspace as a genuine subspace rather than a unique vector'),
  },
]

export const MATHEMATICS_LINALG_VECTOR_MATRIX_INVERSE_EIGENVALUES_PROBES: SeedProbe[] = [
  {
    conceptId: VECTOR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Someone says vector (2,-1) and the geometric point (2,-1) are the same thing, since they use identical notation. Are they?',
    choices: [
      { text: 'No — a point names one fixed location, while a vector names a displacement that can be applied starting from any location; the identical displacement (2,-1) from (5,3) ends at (7,2), but from (-1,7) it ends at (1,6)', isCorrect: true },
      { text: 'Yes — since both are written as an ordered pair of numbers, they refer to the exact same mathematical object with no meaningful distinction', isCorrect: false, misconceptionId: `${VECTOR}:MC-1` },
      { text: 'Yes, because a vector always describes the unique location it points to on the coordinate plane, just like a point does', isCorrect: false, misconceptionId: `${VECTOR}:MC-1` },
    ],
    targetedMisconceptions: [`${VECTOR}:MC-1`],
    source: eb(VECTOR, 'Demonstration 1 — applying the identical displacement (2,-1) from two different starting points to two genuinely different endpoints, directly breaking VECTOR-IS-POINT'),
  },
  {
    conceptId: VECTOR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Are the vectors (3,4) and (4,3) the same vector, since they contain the same two numbers?',
    choices: [
      { text: 'No — order is part of the definition; the first component always measures one axis and the second always measures another, so (3,4) and (4,3) point in genuinely different directions, unlike a set where {3,4}={4,3}', isCorrect: true },
      { text: 'Yes — since a vector is just a listing of its components, reordering those components produces the same vector, the same way reordering set elements changes nothing', isCorrect: false, misconceptionId: `${VECTOR}:MC-2` },
      { text: 'Yes, because vector notation is fundamentally interchangeable with set notation, and both are order-independent collections of numbers', isCorrect: false, misconceptionId: `${VECTOR}:MC-2` },
    ],
    targetedMisconceptions: [`${VECTOR}:MC-2`],
    source: eb(VECTOR, 'Demonstration 2 — plotting (3,4) and (4,3) from the origin to two different destinations, directly breaking VECTOR-ORDER-FREE'),
  },
  {
    conceptId: VECTOR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Asked "what is the vector (1,2)?", someone answers "√5". Is reporting only the magnitude a complete description of the vector?',
    choices: [
      { text: 'No — magnitude is a number PULLED OUT of a vector, discarding direction; many distinct vectors share the same magnitude √5, such as (1,2) and (2,1), or (1,2) and (-1,-2), so magnitude alone cannot recover which vector was intended', isCorrect: true },
      { text: 'Yes — since magnitude is the single most important property of a vector, reporting it fully captures everything the vector represents', isCorrect: false, misconceptionId: `${VECTOR}:MC-3` },
      { text: "Yes, because a vector's direction is a secondary detail that can always be recovered once its magnitude is known", isCorrect: false, misconceptionId: `${VECTOR}:MC-3` },
    ],
    targetedMisconceptions: [`${VECTOR}:MC-3`],
    source: eb(VECTOR, 'Demonstration 3 — producing two distinct vectors sharing the identical magnitude √5, directly breaking VECTOR-IS-MAGNITUDE'),
  },
  {
    conceptId: MATRIX_INVERSE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Before computing the inverse of a matrix B via the 2×2 formula or row reduction, is there a quick check that should always come first?',
    choices: [
      { text: "Yes — check det(B)≠0 first; a one-line computation that settles whether B is invertible at all before committing effort to the full inverse-computation procedure", isCorrect: true },
      { text: "No — the 2×2 formula or row reduction can always be attempted directly, and any issue with invertibility will only become apparent by working through the full computation", isCorrect: false, misconceptionId: `${MATRIX_INVERSE}:MC-1` },
      { text: "No — every square matrix has an inverse, so no preliminary check is ever necessary before computing it", isCorrect: false, misconceptionId: `${MATRIX_INVERSE}:MC-1` },
    ],
    targetedMisconceptions: [`${MATRIX_INVERSE}:MC-1`],
    source: eb(MATRIX_INVERSE, 'Demonstration 2 — checking det(B)=0 first for a singular matrix B, concluding immediately before attempting row reduction, directly breaking INVERTIBILITY-NOT-CHECKED-FIRST'),
  },
  {
    conceptId: MATRIX_INVERSE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'While row-reducing [B|I] for a singular matrix B, an entire row on the left side becomes zero. Is this a computational mistake that should be corrected, or the answer?',
    choices: [
      { text: 'It is the answer — a zero row appearing during row reduction on [A|I] is DIAGNOSTIC confirmation that A is singular, exactly matching what det(A)=0 already established; the two methods are consistent, never contradictory', isCorrect: true },
      { text: 'It is a computational mistake — a correct row-reduction process should never produce an all-zero row, so the arithmetic should be redone from the start until the zero row disappears', isCorrect: false, misconceptionId: `${MATRIX_INVERSE}:MC-2` },
      { text: 'It could be either a mistake or a valid outcome, and there is no way to tell which without first checking the determinant separately after the fact', isCorrect: false, misconceptionId: `${MATRIX_INVERSE}:MC-2` },
    ],
    targetedMisconceptions: [`${MATRIX_INVERSE}:MC-2`],
    source: eb(MATRIX_INVERSE, 'Demonstration 3 — attempting [B|I] for a singular B and producing a zero row before reaching I, confirming rather than contradicting the determinant diagnosis, directly breaking SINGULAR-ROW-REDUCTION-TREATED-AS-ERROR'),
  },
  {
    conceptId: MATRIX_INVERSE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For A=[[3,2],[1,4]], det(A)=10. Someone swaps the diagonal entries and negates the off-diagonal entries, giving [[4,-2],[-1,3]], and calls this A⁻¹. Is that correct?',
    choices: [
      { text: 'No — the formula has three steps, not two: swap, negate, AND divide by det(A); the correct inverse is (1/10)·[[4,-2],[-1,3]], and multiplying A by the undivided [[4,-2],[-1,3]] does not actually produce the identity matrix', isCorrect: true },
      { text: 'Yes — swapping the diagonal and negating the off-diagonal entries is the complete formula for a 2×2 inverse, with no further step required', isCorrect: false, misconceptionId: `${MATRIX_INVERSE}:MC-3` },
      { text: "Yes, since the determinant only matters for checking whether an inverse exists, not for computing the inverse's actual entries once invertibility is confirmed", isCorrect: false, misconceptionId: `${MATRIX_INVERSE}:MC-3` },
    ],
    targetedMisconceptions: [`${MATRIX_INVERSE}:MC-3`],
    source: eb(MATRIX_INVERSE, 'Demonstration 1 — computing det(A)=10 and A⁻¹=(1/10)[[4,-2],[-1,3]] for A=[[3,2],[1,4]] with direct AA⁻¹=I verification, directly breaking INVERSE-FORMULA-APPLIED-WITHOUT-DIVIDING-BY-DETERMINANT'),
  },
  {
    conceptId: EIGENVALUES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'The zero vector satisfies A·0=λ·0 for every matrix A and every λ. Does that make the zero vector a valid eigenvector?',
    choices: [
      { text: 'No — despite trivially satisfying the equation, the zero vector carries no directional information about A’s fixed directions, so it is explicitly excluded by definition; an eigenvector must be nonzero', isCorrect: true },
      { text: "Yes — since it algebraically satisfies Av=λv for every A and λ, the zero vector qualifies as a valid, if unremarkable, eigenvector for any eigenvalue", isCorrect: false, misconceptionId: `${EIGENVALUES}:MC-1` },
      { text: "Yes, because the definition of an eigenvector places no restriction at all on which vectors may serve as valid solutions to the equation", isCorrect: false, misconceptionId: `${EIGENVALUES}:MC-1` },
    ],
    targetedMisconceptions: [`${EIGENVALUES}:MC-1`],
    source: eb(EIGENVALUES, 'Demonstration 1 — checking whether the zero vector is an eigenvector of a diagonal matrix, algebraically true but excluded by definition since it carries no directional information, directly breaking EIGENVECTOR-CAN-BE-ZERO'),
  },
  {
    conceptId: EIGENVALUES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For A=[[1,3],[2,4]] (a non-triangular matrix), can the eigenvalues be read directly off the diagonal entries 1 and 4?',
    choices: [
      { text: "No — reading eigenvalues off the diagonal only works for triangular or diagonal matrices; for this general matrix, solving the characteristic equation det(A−λI)=0 gives λ=(5±√33)/2, which matches neither diagonal entry", isCorrect: true },
      { text: "Yes — the diagonal entries of any square matrix are always exactly its eigenvalues, regardless of what the off-diagonal entries contain", isCorrect: false, misconceptionId: `${EIGENVALUES}:MC-2` },
      { text: 'Yes, since the characteristic equation det(A−λI)=0 is only a formality that always confirms the diagonal entries are the eigenvalues', isCorrect: false, misconceptionId: `${EIGENVALUES}:MC-2` },
    ],
    targetedMisconceptions: [`${EIGENVALUES}:MC-2`],
    source: eb(EIGENVALUES, 'Demonstration 2 — computing the actual characteristic equation and roots (5±√33)/2 for a non-triangular matrix, showing neither matches the diagonal entries 1 and 4, directly breaking EIGENVALUES-ARE-DIAGONAL-ENTRIES'),
  },
  {
    conceptId: EIGENVALUES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If v=(-1,1) is an eigenvector of A with eigenvalue λ=2, is 3v=(-3,3) also an eigenvector of A with the same eigenvalue, or does it need to be found separately?',
    choices: [
      { text: 'Yes, automatically — if Av=λv and c≠0, then A(cv)=c·Av=cλv=λ(cv), so any nonzero scalar multiple of v is also an eigenvector with the same eigenvalue; the eigenspace is a genuine subspace, not a single unique vector', isCorrect: true },
      { text: 'No — each eigenvalue corresponds to exactly one eigenvector, so 3v would need to be independently verified as a separate, unrelated eigenvector before it could be accepted', isCorrect: false, misconceptionId: `${EIGENVALUES}:MC-3` },
      { text: "No, because scalar multiples of an eigenvector generally correspond to a different eigenvalue than the original vector did", isCorrect: false, misconceptionId: `${EIGENVALUES}:MC-3` },
    ],
    targetedMisconceptions: [`${EIGENVALUES}:MC-3`],
    source: eb(EIGENVALUES, 'Demonstration 3 — verifying a scalar multiple of a computed eigenvector satisfies the same eigenvalue equation, establishing the eigenspace as a subspace rather than a single point, directly breaking EIGENVECTORS-ARE-UNIQUE'),
  },
]
