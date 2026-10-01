/**
 * Batch: vector-space, row-echelon, lu-factorization (math.linalg).
 *
 * Continuing math.linalg (20/61 -> 23/61). Fresh frontier recompute found
 * 8 ready concepts. Selected vector-space (highest value: opens linear-map,
 * inner-product-space — its sole remaining prerequisite math.abst.field
 * was authored earlier in this campaign) and row-echelon (opens rank,
 * null-space), plus lu-factorization, which together with row-echelon
 * closes out BOTH of row-reduction's unlocks opened in Batch 108.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.linalg.{vector-space,row-echelon,lu-factorization}.md.
 *
 *   VECTOR-SPACE  eight axioms (4 additive making (V,+) an abelian group;
 *           4 scalar governing field-element interaction) define a vector
 *           space over a field — the SAME eight axioms hold identically
 *           for ordinary vectors, polynomials, and matrices, unified by
 *           one abstract structure regardless of appearance; the
 *           three-condition subspace test (zero vector, closed under
 *           addition, closed under scalar multiplication) always requires
 *           CLOSURE explicitly checked, never skipped; scalars must come
 *           from a FIELD, never an arbitrary ring, since the field's own
 *           invertibility is what S3/S4 rely on.
 *   ROW-ECHELON  reduced row echelon form (RREF) extends REF by clearing
 *           zeros ABOVE each pivot too and scaling every pivot to exactly
 *           1 — both steps required, neither alone suffices; RREF is
 *           provably UNIQUE for a given matrix, unlike REF itself, which
 *           can differ depending on the row-operation sequence chosen; a
 *           non-pivot column signals a FREE VARIABLE and infinitely many
 *           solutions, never "no solution" — a completely different
 *           pattern (a row [0···0|c≠0]) signals inconsistency instead.
 *   LU-FACTORIZATION  L's entries are EXACTLY row reduction's own
 *           elimination multipliers, RECORDED rather than discarded — not
 *           separate new arithmetic; the real payoff is reusing the same
 *           L,U across MULTIPLE right-hand sides, turning each new solve
 *           into two cheap triangular substitutions rather than repeating
 *           the expensive elimination; a zero pivot breaks the simple
 *           A=LU story and forces a row swap, requiring PA=LU instead.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const VECTOR_SPACE = 'math.linalg.vector-space'
const ROW_ECHELON = 'math.linalg.row-echelon'
const LU_FACTORIZATION = 'math.linalg.lu-factorization'

export const MATHEMATICS_LINALG_VECTOR_SPACE_ROW_ECHELON_LU_FACTORIZATION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: VECTOR_SPACE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE STRUCTURE IS WHAT MATTERS, NOT THE APPEARANCE: a VECTOR SPACE over a field F (reusing '
      + 'math.abst.field’s own axioms directly as the scalar domain) is a set V equipped with '
      + 'addition and scalar multiplication satisfying eight axioms. The four ADDITIVE axioms — A1 '
      + '(commutativity), A2 (associativity), A3 (a zero vector), A4 (additive inverses) — say '
      + 'precisely that (V,+) is an ABELIAN GROUP, reusing math.abst.group-theory’s own axioms '
      + 'directly. The four SCALAR axioms — S1-S4 — govern how field elements interact with '
      + 'vectors. The genuinely striking fact is PATTERN INDUCTION: the identical eight axioms hold, '
      + 'verified term-by-term, across ℝ² (ordinary vectors), P₂ (polynomials of degree ≤2), and '
      + 'M₂ₓ₂ (2-by-2 matrices) — three superficially unrelated sets, unified by one abstract '
      + 'structure.\n\n'
      + 'CHECK CLOSURE FIRST — IT’S THE STEP EVERYONE SKIPS: a SUBSPACE W⊆V is a subset that is '
      + 'ITSELF a vector space under the same operations; rather than re-verifying all eight axioms, '
      + 'the three-condition SUBSPACE TEST suffices — (1) 0∈W, (2) W closed under addition, (3) W '
      + 'closed under scalar multiplication — because the remaining five axioms are automatically '
      + 'inherited from V itself.\n\n'
      + 'ZERO VECTOR MEANS WHATEVER THIS SPACE’S OWN ADDITIVE IDENTITY IS: the zero vector need not '
      + 'be an all-zero tuple — in P₂ it is the zero polynomial 0x²+0x+0, in M₂ₓ₂ it is the '
      + 'all-zero matrix. SCALARS NEED A FIELD, NEVER AN ARBITRARY RING: scalars must come from the '
      + 'SAME field F throughout — this is a structural requirement, since the field’s own '
      + 'invertibility is exactly what S3/S4 rely on; a ring like ℤ genuinely FAILS to support a '
      + 'vector space, since not every nonzero integer has a multiplicative inverse.',
    targetedMisconceptions: [`${VECTOR_SPACE}:MC-1`, `${VECTOR_SPACE}:MC-2`, `${VECTOR_SPACE}:MC-3`],
    source: eb(VECTOR_SPACE, 'Core Understanding — the eight vector space axioms holding identically across ℝ², P₂, and M₂ₓ₂, the three-condition subspace test requiring closure explicitly checked, and scalars requiring a field rather than an arbitrary ring'),
  },
  {
    conceptId: ROW_ECHELON, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'RREF: ZEROS ABOVE AND BELOW, EVERY PIVOT SCALED TO 1: this concept extends math.linalg.'
      + 'row-reduction’s own REF result (already achieving zeros BELOW each pivot) into REDUCED '
      + 'row echelon form (RREF), which additionally requires zeros ABOVE each pivot too, and each '
      + 'pivot scaled to exactly 1. Starting from REF, achieve this by working from the BOTTOM '
      + 'pivot upward — scale each pivot row so its pivot is 1, then use that row to eliminate all '
      + 'entries above it in that column.\n\n'
      + 'REF CAN DIFFER; RREF NEVER DOES: while REF itself is NOT unique — different valid sequences '
      + 'of row operations can produce differently-appearing REF matrices representing the same '
      + 'system — RREF is provably UNIQUE: no matter which legal sequence of row operations is '
      + 'chosen, the same final RREF matrix always results. This uniqueness is what makes RREF the '
      + 'standard reference form for reading off a system’s solution structure unambiguously.\n\n'
      + 'NO PIVOT IN A COLUMN MEANS FREE VARIABLE, NOT NO SOLUTION: in RREF, PIVOT COLUMNS '
      + 'correspond to BASIC VARIABLES — values uniquely DETERMINED once free variables are '
      + 'assigned. Columns WITHOUT a pivot correspond to FREE VARIABLES, which can take ANY value. '
      + 'When free variables exist, the system has INFINITELY many solutions, written '
      + 'parametrically — a completely different pattern from an inconsistent row [0···0|c≠0], '
      + 'which is what actually signals no solution.',
    targetedMisconceptions: [`${ROW_ECHELON}:MC-1`, `${ROW_ECHELON}:MC-2`, `${ROW_ECHELON}:MC-3`],
    source: eb(ROW_ECHELON, 'Core Understanding — RREF extending REF with zeros above each pivot and pivots scaled to 1, RREF’s guaranteed uniqueness unlike REF, and non-pivot columns signaling free variables rather than no solution'),
  },
  {
    conceptId: LU_FACTORIZATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'L IS THE MULTIPLIERS YOU ALREADY COMPUTED — JUST RECORDED, NOT NEW: LU FACTORIZATION is row '
      + 'reduction’s OWN elimination steps, RECORDED rather than discarded. math.linalg.'
      + 'row-reduction eliminates entries below each pivot using operations "Rowₖ→Rowₖ−m·Rowᵢ" — '
      + 'ordinarily, once elimination is done, the multipliers m are thrown away, leaving only the '
      + 'final echelon form U. LU factorization’s insight is that these multipliers, if RECORDED '
      + 'instead of discarded, assemble into a lower triangular matrix L (1s on the diagonal, each '
      + 'multiplier mₖᵢ at position (k,i)) satisfying exactly A=LU — the SAME elimination arithmetic '
      + 'already performed, packaged into two matrices instead of one.\n\n'
      + 'ONE FACTORIZATION, MANY CHEAP SOLVES — THAT’S THE PAYOFF: once A=LU is known, solving '
      + 'Ax=b becomes LUx=b; setting y=Ux, this splits into Ly=b (FORWARD substitution) followed by '
      + 'Ux=y (BACK substitution). Crucially, if a SECOND right-hand side b’ arises later for the '
      + 'SAME A, the expensive elimination work does NOT need repeating — only two cheap triangular '
      + 'solves are needed. This reuse across multiple right-hand sides, not a single solve, is the '
      + 'real payoff.\n\n'
      + 'ZERO PIVOT? YOU NEED PA=LU, NOT PLAIN A=LU: if a pivot position happens to be zero, '
      + 'elimination cannot proceed as written — rows must be SWAPPED before continuing, tracked '
      + 'via a PERMUTATION MATRIX P, giving the modified factorization PA=LU rather than A=LU '
      + 'directly.',
    targetedMisconceptions: [`${LU_FACTORIZATION}:MC-1`, `${LU_FACTORIZATION}:MC-2`, `${LU_FACTORIZATION}:MC-3`],
    source: eb(LU_FACTORIZATION, 'Core Understanding — L’s entries as row reduction’s own recorded multipliers, the payoff of reusing L,U across multiple right-hand sides via cheap triangular solves, and a zero pivot requiring PA=LU instead of plain A=LU'),
  },
]

export const MATHEMATICS_LINALG_VECTOR_SPACE_ROW_ECHELON_LU_FACTORIZATION_PROBES: SeedProbe[] = [
  {
    conceptId: VECTOR_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'To verify W={(x,y,z)∈ℝ³:x+y+z=0} is a subspace, is it enough to confirm (0,0,0)∈W, or must closure under addition and scalar multiplication also be checked explicitly?',
    choices: [
      { text: 'Closure must also be checked explicitly — the three-condition subspace test requires (1) containing the zero vector, (2) closure under addition, and (3) closure under scalar multiplication; skipping the closure checks leaves the verification incomplete', isCorrect: true },
      { text: 'It is enough to confirm the zero vector is contained in W, since containing the zero vector is the only condition genuinely needed to establish a subset is a subspace', isCorrect: false, misconceptionId: `${VECTOR_SPACE}:MC-1` },
      { text: "Checking the zero vector condition automatically guarantees closure under both addition and scalar multiplication as a consequence", isCorrect: false, misconceptionId: `${VECTOR_SPACE}:MC-1` },
    ],
    targetedMisconceptions: [`${VECTOR_SPACE}:MC-1`],
    source: eb(VECTOR_SPACE, 'Demonstration 3 — contrasting W (passes all three subspace conditions) against W’={(x,y):x≥0} (fails closure under scalar multiplication), isolating exactly the step MC-1 skips, directly breaking CLOSURE-UNSTATED'),
  },
  {
    conceptId: VECTOR_SPACE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For the vector space P₂ (polynomials of degree ≤2), what is "the zero vector" — the number 0, or something else?',
    choices: [
      { text: 'The zero polynomial 0x²+0x+0 — the zero vector means whatever this specific space’s own additive identity is, not always an all-zero numeric tuple; for P₂ that identity is a polynomial, not a bare number', isCorrect: true },
      { text: 'The number 0 — since every vector space’s zero vector is fundamentally the same numeric zero, regardless of what kind of objects the space’s vectors happen to be', isCorrect: false, misconceptionId: `${VECTOR_SPACE}:MC-2` },
      { text: "P₂ has no well-defined zero vector, since polynomials are not the kind of object that can serve as an additive identity", isCorrect: false, misconceptionId: `${VECTOR_SPACE}:MC-2` },
    ],
    targetedMisconceptions: [`${VECTOR_SPACE}:MC-2`],
    source: eb(VECTOR_SPACE, 'Demonstration 2 — identifying P₂’s zero vector as the zero polynomial 0x²+0x+0 and M₂ₓ₂’s as the all-zero matrix, confirming both satisfy v+0=v, directly breaking ZERO-VECTOR-POSITIONAL'),
  },
  {
    conceptId: VECTOR_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Can ℤ² (pairs of integers) form a vector space with scalars drawn from ℤ (the integers)?',
    choices: [
      { text: 'No — scalars must come from a FIELD, never an arbitrary ring; solving 2·w=(1,0) for w∈ℤ² has no integer solution, since ℤ lacks multiplicative inverses, confirming the scalar domain genuinely fails to support the vector space axioms', isCorrect: true },
      { text: "Yes — any set of numbers, including the integers, can serve as a valid scalar domain for a vector space, since the pattern of 'numbers acting as scalars' from informal arithmetic always applies", isCorrect: false, misconceptionId: `${VECTOR_SPACE}:MC-3` },
      { text: "Yes, because ℤ² already satisfies the four additive axioms, and the four scalar axioms are automatically satisfied by any ring of scalars as a consequence", isCorrect: false, misconceptionId: `${VECTOR_SPACE}:MC-3` },
    ],
    targetedMisconceptions: [`${VECTOR_SPACE}:MC-3`],
    source: eb(VECTOR_SPACE, 'Demonstration 4 — attempting ℤ² as a vector space over ℤ and showing 2·w=(1,0) has no integer solution since ℤ lacks multiplicative inverses, directly breaking SCALAR-DOMAIN-ARBITRARY'),
  },
  {
    conceptId: ROW_ECHELON, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'After row-reducing a system, one column has no pivot. Does this mean the system has no solution?',
    choices: [
      { text: 'No — a missing pivot means a FREE variable, signaling infinitely many solutions; a genuinely inconsistent system (no solution) is instead signaled by a completely different pattern, a row like [0 0 0|c] with c≠0', isCorrect: true },
      { text: "Yes — a column without a pivot is an incomplete result, which directly indicates that the system has no valid solution", isCorrect: false, misconceptionId: `${ROW_ECHELON}:MC-1` },
      { text: "Yes, because every column in a properly solved system must contain a pivot, so a missing one signals the elimination process failed to find any solution", isCorrect: false, misconceptionId: `${ROW_ECHELON}:MC-1` },
    ],
    targetedMisconceptions: [`${ROW_ECHELON}:MC-1`],
    source: eb(ROW_ECHELON, 'Demonstration 3 — row-reducing a system with more unknowns than pivots, identifying the non-pivot column as a free variable, and writing the general solution parametrically, directly breaking FREE-VARIABLE-COLUMN-CONFUSED-WITH-NO-SOLUTION'),
  },
  {
    conceptId: ROW_ECHELON, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Two students use different valid row-reduction paths on the same system, reaching different-looking REF matrices. Could their final RREF results also genuinely differ?',
    choices: [
      { text: 'No — RREF is provably UNIQUE for a given matrix, no matter which legal sequence of row operations is chosen; the additional reduction to a fully canonical form is exactly what eliminates REF’s own acknowledged ambiguity', isCorrect: true },
      { text: 'Yes — since REF itself is known to be non-unique, that same non-uniqueness carries over to RREF, meaning two valid paths can genuinely produce different final RREF results', isCorrect: false, misconceptionId: `${ROW_ECHELON}:MC-2` },
      { text: "Yes, because RREF is simply REF taken slightly further, so any variability present in REF necessarily persists all the way through to RREF as well", isCorrect: false, misconceptionId: `${ROW_ECHELON}:MC-2` },
    ],
    targetedMisconceptions: [`${ROW_ECHELON}:MC-2`],
    source: eb(ROW_ECHELON, 'Demonstration 2 — showing a different valid row-reduction path on the same system reaches the identical final RREF despite differing intermediate steps, directly breaking RREF-ASSUMED-NON-UNIQUE-LIKE-REF'),
  },
  {
    conceptId: ROW_ECHELON, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A matrix has zeros both above and below every pivot, but one pivot entry equals 3 instead of 1. Is this matrix in RREF?',
    choices: [
      { text: 'No — RREF requires BOTH zeros above/below every pivot AND every pivot scaled to exactly 1; achieving only the zero-clearing without scaling the pivot to 1 means it is not fully reduced yet', isCorrect: true },
      { text: 'Yes — once zeros above and below every pivot have been achieved, the matrix qualifies as fully reduced regardless of what specific nonzero value each pivot itself equals', isCorrect: false, misconceptionId: `${ROW_ECHELON}:MC-3` },
      { text: "Yes, since the pivot-scaling step is an optional cosmetic adjustment that does not affect whether a matrix has genuinely reached RREF", isCorrect: false, misconceptionId: `${ROW_ECHELON}:MC-3` },
    ],
    targetedMisconceptions: [`${ROW_ECHELON}:MC-3`],
    source: eb(ROW_ECHELON, 'Demonstration 1 — continuing row-reduction’s REF result upward, scaling the bottom pivot to 1 and eliminating above it for each higher pivot to reach genuine RREF, directly breaking PIVOT-SCALING-TO-1-STEP-OMITTED'),
  },
  {
    conceptId: LU_FACTORIZATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'To compute L in an LU factorization, is separate new arithmetic required beyond what row reduction already computes?',
    choices: [
      { text: "No — L's entries are EXACTLY row reduction's own elimination multipliers, RECORDED rather than discarded; the underlying arithmetic is identical to elimination already performed, packaged into a matrix rather than thrown away", isCorrect: true },
      { text: 'Yes — L and U represent a genuinely new factorization procedure that requires computing fresh values distinct from ordinary row-reduction elimination', isCorrect: false, misconceptionId: `${LU_FACTORIZATION}:MC-1` },
      { text: "Yes, because the notation L and U signals a different mathematical operation entirely, unrelated to the multipliers used during row reduction", isCorrect: false, misconceptionId: `${LU_FACTORIZATION}:MC-1` },
    ],
    targetedMisconceptions: [`${LU_FACTORIZATION}:MC-1`],
    source: eb(LU_FACTORIZATION, 'Demonstration 1 — recording each elimination multiplier as it is used during row reduction, assembling L and verifying LU=A by direct multiplication, directly breaking LU-COMPUTATION-ASSUMED-SEPARATE-NEW-ARITHMETIC'),
  },
  {
    conceptId: LU_FACTORIZATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If Ax=b only needs to be solved a single time for a single b, does factoring A=LU provide any real advantage over ordinary elimination?',
    choices: [
      { text: 'Not particularly — the real payoff of LU factorization is reusing the already-computed L,U across MULTIPLE different right-hand sides, turning each additional solve into two cheap triangular substitutions rather than repeating the expensive elimination', isCorrect: true },
      { text: 'Yes — LU factorization is always more efficient than ordinary elimination even when solving for only a single right-hand side b, since factoring is inherently faster', isCorrect: false, misconceptionId: `${LU_FACTORIZATION}:MC-2` },
      { text: "Yes, because computing L and U replaces the need for back-substitution entirely, even for a single solve", isCorrect: false, misconceptionId: `${LU_FACTORIZATION}:MC-2` },
    ],
    targetedMisconceptions: [`${LU_FACTORIZATION}:MC-2`],
    source: eb(LU_FACTORIZATION, 'Demonstration 2 — reusing already-computed L,U to solve for a second right-hand side b’ via forward-then-back substitution with zero re-elimination of A, directly breaking LU-PAYOFF-ASSUMED-SINGLE-USE'),
  },
  {
    conceptId: LU_FACTORIZATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A matrix has a zero (1,1) pivot entry. Can ordinary elimination still proceed to produce a plain A=LU factorization?',
    choices: [
      { text: 'No — a zero pivot forces a row swap before elimination can proceed, requiring the modified factorization PA=LU (tracked via a permutation matrix P) rather than a plain A=LU', isCorrect: true },
      { text: 'Yes — every matrix admits a plain A=LU factorization using ordinary elimination, regardless of whether any pivot position happens to equal zero', isCorrect: false, misconceptionId: `${LU_FACTORIZATION}:MC-3` },
      { text: "Yes, since a zero pivot can simply be treated as a valid multiplier of zero, allowing elimination to continue exactly as written without any row swap", isCorrect: false, misconceptionId: `${LU_FACTORIZATION}:MC-3` },
    ],
    targetedMisconceptions: [`${LU_FACTORIZATION}:MC-3`],
    source: eb(LU_FACTORIZATION, 'Demonstration 3 — for a matrix with a zero (1,1) pivot, showing elimination cannot proceed as written and requires a row swap yielding PA=LU instead of A=LU, directly breaking A-EQUALS-LU-ASSUMED-ALWAYS-VALID'),
  },
]
