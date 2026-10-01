/**
 * Batch: inner-product-space, null-space, span (math.linalg).
 *
 * Continuing math.linalg (26/61 -> 29/61). Fresh frontier recompute found
 * 13 ready concepts. Selected inner-product-space for its highest unlock
 * value (opens orthogonal-basis, gram-schmidt), plus null-space (a step
 * toward rank-nullity, alongside rank/column-space/dimension) and span
 * (opens basis) — both extending the subspace family opened Batch 110.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.linalg.{inner-product-space,null-space,span}.md.
 *
 *   INNER-PRODUCT-SPACE  every inner product automatically induces a norm
 *           ‖v‖=√⟨v,v⟩, well-defined since ⟨v,v⟩≥0 always; the hierarchy
 *           inner product space ⇒ normed space ⇒ metric space is a
 *           ONE-WAY chain — a valid norm (the sup-norm) can exist that
 *           provably does NOT arise from any inner product; a HILBERT
 *           space requires genuinely ADDITIONAL completeness, never a
 *           synonym for "inner product space"; Cauchy-Schwarz bounds the
 *           inner product ABOVE by the product of lengths, never reversed.
 *   NULL-SPACE  N(A)={x:Ax=0} can genuinely equal {0} alone — a completely
 *           valid, common outcome, never evidence of an error; N(A) is
 *           ALWAYS a subspace, proven via the 3-condition test grounded in
 *           A's own linearity, never merely assumed; the nullity is the
 *           number of free variables counted from genuine PIVOT columns,
 *           not any column merely containing a nonzero entry.
 *   SPAN  span(S) is the set of ALL linear combinations of S — typically
 *           vastly larger than S itself, never merely "the vectors in S";
 *           membership in span(S) is settled by SOLVING the linear system
 *           for the combination coefficients, never by inspection or
 *           guessing; a REDUNDANT vector (already a combination of
 *           existing generators) does not enlarge the span at all,
 *           regardless of how many redundant vectors are added.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const INNER_PRODUCT_SPACE = 'math.linalg.inner-product-space'
const NULL_SPACE = 'math.linalg.null-space'
const SPAN = 'math.linalg.span'

export const MATHEMATICS_LINALG_INNER_PRODUCT_SPACE_NULL_SPACE_SPAN_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: INNER_PRODUCT_SPACE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'EVERY INNER PRODUCT GIVES YOU A NORM FOR FREE: every inner product automatically induces a '
      + 'norm via ‖v‖=√⟨v,v⟩, well-defined since ⟨v,v⟩≥0 always (positive-definiteness). For '
      + 'v=(1,2,2) in ℝ³: ⟨v,v⟩=1+4+4=9, giving ‖v‖=3 — exactly the familiar Euclidean length, '
      + 'confirming the induced norm recovers the already-known notion in the standard case.\n\n'
      + 'INNER PRODUCT SPACE IMPLIES NORMED SPACE — NEVER THE OTHER WAY AROUND: the structure '
      + 'hierarchy inner product space ⇒ normed space ⇒ metric space is a chain of STRICT '
      + 'implications, one-directional. The sup-norm ‖f‖∞=sup|f(x)| on C([a,b]) is a genuine, valid '
      + 'norm (satisfies all norm axioms) — but it provably does NOT arise from ANY inner product '
      + 'on C([a,b]). Being a normed space does NOT automatically make something an inner product '
      + 'space, even though every inner product space IS automatically a normed space.\n\n'
      + 'HILBERT SPACE NEEDS COMPLETENESS TOO — NOT JUST AN INNER PRODUCT: a Hilbert space is '
      + 'specifically an inner product space that is ALSO complete (every Cauchy sequence converges '
      + 'within the space). Completeness is a genuinely SEPARATE, additional property, never '
      + 'automatic just from having an inner product. Finite-dimensional inner product spaces (like '
      + 'ℝⁿ) are always automatically complete, but infinite-dimensional ones may or may not be. '
      + 'THE INNER PRODUCT IS BOUNDED ABOVE BY THE PRODUCT OF LENGTHS — NEVER THE REVERSE: the '
      + 'Cauchy-Schwarz inequality states |⟨u,v⟩|≤‖u‖‖v‖, an echo of |cosθ|≤1, never reversed.',
    targetedMisconceptions: [`${INNER_PRODUCT_SPACE}:MC-1`, `${INNER_PRODUCT_SPACE}:MC-2`, `${INNER_PRODUCT_SPACE}:MC-3`],
    source: eb(INNER_PRODUCT_SPACE, 'Core Understanding — the induced norm ‖v‖=√⟨v,v⟩, the one-directional structure hierarchy with the sup-norm counterexample, Hilbert space requiring genuinely additional completeness, and Cauchy-Schwarz’s correct direction'),
  },
  {
    conceptId: NULL_SPACE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE NULL SPACE CAN BE JUST {0} — AND THAT’S A CORRECT, COMPLETE ANSWER: the null space '
      + 'N(A)={x∈ℝⁿ:Ax=0} — every vector that A sends to the zero vector — is NOT automatically a '
      + 'large or even a nontrivial set: it can be exactly {0} (the zero vector alone), and this '
      + 'trivial case is a completely valid, common outcome, never evidence of an error.\n\n'
      + 'NULL-SPACE MEMBERSHIP IS FOUND BY ROW-REDUCING, NEVER GUESSED: solve Ax=0 by row-reducing A '
      + 'to RREF (reusing math.linalg.row-echelon’s own systematic elimination directly), identify '
      + 'the free variables (the non-pivot columns), and express every basic variable in terms of '
      + 'them; the resulting parameterized solutions form a spanning set for N(A).\n\n'
      + 'PROVE CLOSURE — DON’T JUST ASSUME THE SOLUTION SET IS AUTOMATICALLY A SUBSPACE: N(A) is '
      + 'ALWAYS a genuine subspace, verified by the SAME 3-condition test as any other candidate: it '
      + 'contains 0 (since A·0=0), is closed under addition (if Ax=0 and Ay=0 then '
      + 'A(x+y)=Ax+Ay=0, using A’s own linearity), and closed under scalar multiplication (if Ax=0 '
      + 'then A(cx)=cAx=0) — this is a proof from A’s linearity, not an assumption.\n\n'
      + 'COUNT PIVOT COLUMNS, NOT NONZERO ENTRIES, TO GET THE NULLITY RIGHT: the nullity is the '
      + 'number of free variables, counted carefully from the RREF: nullity = (number of columns) − '
      + '(number of pivot columns) — a miscount that treats a column with a nonzero entry, but not '
      + 'in pivot position, as a pivot column produces a wrong nullity even when the '
      + 'parameterization itself is correct.',
    targetedMisconceptions: [`${NULL_SPACE}:MC-1`, `${NULL_SPACE}:MC-2`, `${NULL_SPACE}:MC-3`],
    source: eb(NULL_SPACE, 'Core Understanding — N(A) as the solution set of the homogeneous system that can genuinely equal {0}, N(A) always being a subspace proven from A’s own linearity, and nullity counted from genuine pivot columns rather than any nonzero entry'),
  },
  {
    conceptId: SPAN, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'SPAN IS EVERYTHING REACHABLE — NOT JUST THE LISTED VECTORS: span(S)={c₁v₁+c₂v₂+⋯+cₖvₖ : '
      + 'c₁,…,cₖ∈ℝ} — the set of every combination reachable using EVERY possible choice of scalars, '
      + 'reusing math.linalg.subspace’s own definition directly: span(S) is the SMALLEST subspace '
      + 'containing S. A generating set S may have just 2 elements, while span(S) is typically '
      + 'VASTLY larger — often infinite (e.g. all of ℝ² from two non-parallel vectors).\n\n'
      + 'SOLVE FOR MEMBERSHIP — NEVER GUESS BY EYE: whether a target vector w lies in span(S) is '
      + 'determined by actually SOLVING the linear system c₁v₁+⋯+cₖvₖ=w for the coefficients cᵢ — a '
      + 'target can look "unrelated" to S’s vectors on casual inspection yet genuinely be in the '
      + 'span (or vice versa), and only an explicit solve-and-verify settles it reliably.\n\n'
      + 'A REDUNDANT VECTOR CHANGES NOTHING; ONLY A GENUINELY NEW DIRECTION GROWS THE SPAN: adding a '
      + 'vector to a spanning set S enlarges span(S) ONLY IF that vector was NOT already reachable '
      + 'from S’s existing vectors — a REDUNDANT addition (already a linear combination of S’s '
      + 'vectors) changes span(S) not at all, regardless of how many vectors are added. Whether a '
      + 'new vector helps depends entirely on whether it introduces a genuinely NEW direction, '
      + 'verified by the same explicit-solve discipline as membership checking.',
    targetedMisconceptions: [`${SPAN}:MC-1`, `${SPAN}:MC-2`, `${SPAN}:MC-3`],
    source: eb(SPAN, 'Core Understanding — span(S) as the set of all linear combinations rather than S itself, membership settled by solving rather than inspection, and a redundant addition leaving the span unchanged'),
  },
]

export const MATHEMATICS_LINALG_INNER_PRODUCT_SPACE_NULL_SPACE_SPAN_PROBES: SeedProbe[] = [
  {
    conceptId: INNER_PRODUCT_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'The sup-norm ‖f‖∞=sup|f(x)| on C([a,b]) is a genuine, valid norm. Does this mean it must arise from some inner product on C([a,b])?',
    choices: [
      { text: 'No — the hierarchy inner product space ⇒ normed space is a ONE-WAY implication; the sup-norm provably does NOT arise from any inner product, even though it is a genuine, valid norm satisfying all norm axioms', isCorrect: true },
      { text: 'Yes — since every inner product space is automatically a normed space, the reverse must also hold: every valid norm must come from some inner product', isCorrect: false, misconceptionId: `${INNER_PRODUCT_SPACE}:MC-1` },
      { text: 'Yes, because any function satisfying the norm axioms can always be reconstructed as the induced norm of some suitably chosen inner product', isCorrect: false, misconceptionId: `${INNER_PRODUCT_SPACE}:MC-1` },
    ],
    targetedMisconceptions: [`${INNER_PRODUCT_SPACE}:MC-1`],
    source: eb(INNER_PRODUCT_SPACE, 'Demonstration 1 — the sup-norm-on-C([a,b]) counterexample, a valid norm provably not arising from any inner product, directly breaking NORMED-SPACE-ASSUMED-TO-IMPLY-INNER-PRODUCT-SPACE'),
  },
  {
    conceptId: INNER_PRODUCT_SPACE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is "inner product space" just another name for "Hilbert space," or does Hilbert space require something additional?',
    choices: [
      { text: 'Hilbert space requires something additional — completeness (every Cauchy sequence converges within the space); this is a genuinely separate, additional property, never automatic just from having an inner product', isCorrect: true },
      { text: '"Inner product space" and "Hilbert space" are synonymous terms referring to exactly the same mathematical structure with no distinction between them', isCorrect: false, misconceptionId: `${INNER_PRODUCT_SPACE}:MC-2` },
      { text: 'Hilbert space is simply a finite-dimensional inner product space, while an ordinary inner product space may have any dimension', isCorrect: false, misconceptionId: `${INNER_PRODUCT_SPACE}:MC-2` },
    ],
    targetedMisconceptions: [`${INNER_PRODUCT_SPACE}:MC-2`],
    source: eb(INNER_PRODUCT_SPACE, 'Demonstration 2 — the precise Hilbert-space definition contrasted against "inner product space" alone, with the finite-vs-infinite-dimensional completeness distinction, directly breaking HILBERT-SPACE-CONFLATED-WITH-INNER-PRODUCT-SPACE'),
  },
  {
    conceptId: INNER_PRODUCT_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does the Cauchy-Schwarz inequality state |⟨u,v⟩|≤‖u‖‖v‖, or ‖u‖‖v‖≤|⟨u,v⟩|?',
    choices: [
      { text: '|⟨u,v⟩|≤‖u‖‖v‖ — the inner product is bounded ABOVE by the product of the vectors’ own lengths, an echo of |cosθ|≤1; the inequality never reverses', isCorrect: true },
      { text: '‖u‖‖v‖≤|⟨u,v⟩| — the product of the lengths is bounded above by the inner product, since the inner product measures the combined magnitude of both vectors together', isCorrect: false, misconceptionId: `${INNER_PRODUCT_SPACE}:MC-3` },
      { text: 'Either direction is equally valid depending on which vector is treated as u and which as v in the specific computation', isCorrect: false, misconceptionId: `${INNER_PRODUCT_SPACE}:MC-3` },
    ],
    targetedMisconceptions: [`${INNER_PRODUCT_SPACE}:MC-3`],
    source: eb(INNER_PRODUCT_SPACE, 'Demonstration 3 — the direct Cauchy-Schwarz verification for u=(1,0,2), v=(2,1,-1) in ℝ³, confirming the correct inequality direction, directly breaking CAUCHY-SCHWARZ-DIRECTION-REVERSED'),
  },
  {
    conceptId: NULL_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Row-reducing A=[[1,0],[0,1]] (the identity matrix) gives an RREF with a pivot in every column, leaving zero free variables. What does this mean for N(A)?',
    choices: [
      { text: 'N(A)={0} — with zero free variables, the only solution to Ax=0 is x=0; this is a complete and correct answer, not a sign that something went wrong', isCorrect: true },
      { text: 'Something must have gone wrong in the computation, since a homogeneous system’s null space should always contain nonzero vectors', isCorrect: false, misconceptionId: `${NULL_SPACE}:MC-1` },
      { text: 'N(A) cannot be determined from this RREF alone, since a full-pivot matrix provides no information about its null space', isCorrect: false, misconceptionId: `${NULL_SPACE}:MC-1` },
    ],
    targetedMisconceptions: [`${NULL_SPACE}:MC-1`],
    source: eb(NULL_SPACE, 'Demonstration 1 — row-reducing the identity matrix to show zero free variables and N(A)={0} as a complete and correct answer, directly breaking HOMOGENEOUS-SYSTEM-ASSUMED-TO-ALWAYS-HAVE-NONTRIVIAL-SOLUTIONS'),
  },
  {
    conceptId: NULL_SPACE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'After computing N(A)={t(-2,1):t∈ℝ} via row reduction and parameterization for a specific matrix A, is it necessary to separately prove this set is closed under addition?',
    choices: [
      { text: 'Yes — N(A) being a subspace must be proven via the explicit 3-condition test grounded in A’s own linearity (if Ax=0 and Ay=0 then A(x+y)=Ax+Ay=0); this is a proof, not an automatic consequence of having parameterized the solutions', isCorrect: true },
      { text: 'No — once the parameterized solutions to Ax=0 have been found via row reduction, the resulting set is automatically known to be a subspace with no further verification needed', isCorrect: false, misconceptionId: `${NULL_SPACE}:MC-2` },
      { text: "No, because any solution set of a linear system is by definition synonymous with being a subspace, regardless of the system's specific structure", isCorrect: false, misconceptionId: `${NULL_SPACE}:MC-2` },
    ],
    targetedMisconceptions: [`${NULL_SPACE}:MC-2`],
    source: eb(NULL_SPACE, 'Demonstration 2 — explicitly verifying closure under addition for N(A)={t(-2,1)} using A’s own linearity rather than assuming it, directly breaking SUBSPACE-VERIFICATION-STEP-SKIPPED-FOR-NULL-SPACE'),
  },
  {
    conceptId: NULL_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For A=[[1,2,0],[0,0,1]] (already in RREF), column 2 contains a nonzero entry (the 2) but is not a pivot column. Should column 2 be counted as a pivot column when computing the nullity?',
    choices: [
      { text: 'No — the nullity counts genuine PIVOT columns (those containing a leading 1), not any column merely containing a nonzero entry; column 2 is the free variable here, giving nullity=1, not nullity=0', isCorrect: true },
      { text: "Yes — any column containing a nonzero entry should be counted as a pivot column when determining the nullity, since a nonzero entry indicates that variable is determined", isCorrect: false, misconceptionId: `${NULL_SPACE}:MC-3` },
      { text: "Yes, because the presence of a 2 in column 2 is sufficient evidence that it functions as a pivot for that row", isCorrect: false, misconceptionId: `${NULL_SPACE}:MC-3` },
    ],
    targetedMisconceptions: [`${NULL_SPACE}:MC-3`],
    source: eb(NULL_SPACE, 'Demonstration 3 — for A=[[1,2,0],[0,0,1]], correctly identifying pivot columns 1 and 3 (not column 2’s nonzero entry) to get nullity=1, directly breaking NULLITY-MISCOUNTED-FROM-RREF'),
  },
  {
    conceptId: SPAN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For S={(1,0),(0,1)} in ℝ², is span(S) just those two listed points, or something much larger?',
    choices: [
      { text: 'Something much larger — span(S) is the set of ALL linear combinations a·(1,0)+b·(0,1)=(a,b) for every choice of scalars a,b; since (a,b) can be any point, span(S) is the ENTIRE plane ℝ², not just the two listed vectors', isCorrect: true },
      { text: 'Just those two points — span(S) refers to the generating set S itself, which contains exactly the vectors (1,0) and (0,1)', isCorrect: false, misconceptionId: `${SPAN}:MC-1` },
      { text: "Span(S) is a finite set containing S plus a small number of additional combinations of those two vectors", isCorrect: false, misconceptionId: `${SPAN}:MC-1` },
    ],
    targetedMisconceptions: [`${SPAN}:MC-1`],
    source: eb(SPAN, 'Demonstration 1 — showing any target point (a,b) is reached exactly by a·v₁+b·v₂, so span({v₁,v₂})=ℝ², the entire plane, directly breaking SPAN-EQUALS-GENERATING-SET'),
  },
  {
    conceptId: SPAN, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is w=(7,5) in span({(1,2),(3,1)})? Can this be determined just by looking at the numbers, or does it require solving something?',
    choices: [
      { text: 'It requires solving the system c₁(1,2)+c₂(3,1)=(7,5); solving gives c₁=8/5, c₂=9/5, verified by direct substitution — an inspection-only guess gives no reliable answer since 7 and 5 don’t obviously relate to the generators', isCorrect: true },
      { text: 'It can be determined just by inspection — if the target vector’s components don’t obviously resemble the generating vectors, it is not in the span', isCorrect: false, misconceptionId: `${SPAN}:MC-2` },
      { text: 'It can be determined by trying a couple of simple sample combinations, and if none of them quickly match, membership can be ruled out', isCorrect: false, misconceptionId: `${SPAN}:MC-2` },
    ],
    targetedMisconceptions: [`${SPAN}:MC-2`],
    source: eb(SPAN, 'Demonstration 2 — solving c₁(1,2)+c₂(3,1)=(7,5) explicitly to find c₁=8/5, c₂=9/5, confirming inspection-only guessing gives no reliable answer, directly breaking SPAN-MEMBERSHIP-BY-INSPECTION'),
  },
  {
    conceptId: SPAN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Starting from S={(1,0),(0,1)} with span(S)=ℝ², adding the vector (2,3)=2(1,0)+3(0,1) to S. Does this enlarge the span?',
    choices: [
      { text: 'No — (2,3) is ALREADY a linear combination of the existing generators (1,0) and (0,1); adding a redundant vector changes span(S) not at all, regardless of how many such vectors are added', isCorrect: true },
      { text: 'Yes — adding any additional vector to a spanning set always produces a strictly larger span, since more generators means more reachable combinations', isCorrect: false, misconceptionId: `${SPAN}:MC-3` },
      { text: "Yes, because a third vector always introduces at least some new combinations that were not previously reachable with only two generators", isCorrect: false, misconceptionId: `${SPAN}:MC-3` },
    ],
    targetedMisconceptions: [`${SPAN}:MC-3`],
    source: eb(SPAN, 'Demonstration 3 — adding (2,3)=2(1,0)+3(0,1), already a combination, and showing the span remains completely unchanged, contrasted against a genuinely new direction that does enlarge it, directly breaking EVERY-NEW-VECTOR-ENLARGES-SPAN'),
  },
]
