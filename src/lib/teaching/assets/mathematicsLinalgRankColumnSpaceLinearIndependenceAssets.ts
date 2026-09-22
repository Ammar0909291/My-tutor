/**
 * Batch: rank, column-space, linear-independence (math.linalg).
 *
 * Continuing math.linalg (29/61 -> 32/61). Fresh frontier recompute found
 * 13 ready concepts. Selected rank and column-space, both progressing
 * toward rank-nullity (which additionally requires null-space, authored
 * Batch 111, and dimension, not yet authored), plus linear-independence,
 * which unlocks basis together with span (authored Batch 111).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.linalg.{rank,column-space,linear-independence}.md.
 *
 *   RANK  the rank is the number of PIVOTS in row echelon form; ROW rank
 *           always EQUALS COLUMN rank, a remarkable, non-obvious universal
 *           fact; solvability of Ax=b requires TWO SEPARATE comparisons —
 *           EXISTENCE via rank(A) vs. rank([A|b]), UNIQUENESS via rank(A)
 *           vs. the number of unknowns — a consistent system is never
 *           automatically uniquely solvable, and rank(A) alone never
 *           settles existence without the augmented-matrix comparison.
 *   COLUMN-SPACE  C(A) is the SPAN of A's columns, but dependent columns
 *           COLLAPSE its true dimension below the raw column count — the
 *           column count is only an upper bound, and dim(C(A))=rank(A),
 *           never the column count by default; Ax=b is consistent exactly
 *           when b∈C(A), which must be verified across ALL components of
 *           the target simultaneously, since a partial match on some
 *           components proves nothing about the rest.
 *   LINEAR-INDEPENDENCE  the trivial solution to c₁v₁+⋯+cₖvₖ=0 ALWAYS
 *           exists for any set — exhibiting it proves nothing; genuine
 *           independence requires confirming it is the ONLY solution;
 *           dependence among 3+ vectors can hide with NO pairwise
 *           relationship visible — checking only pairs misses joint,
 *           multi-vector dependencies entirely; in ℝⁿ, any set of MORE
 *           than n vectors is automatically dependent, a structural
 *           consequence of dimension requiring no case-by-case check.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const RANK = 'math.linalg.rank'
const COLUMN_SPACE = 'math.linalg.column-space'
const LINEAR_INDEPENDENCE = 'math.linalg.linear-independence'

export const MATHEMATICS_LINALG_RANK_COLUMN_SPACE_LINEAR_INDEPENDENCE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RANK, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'RANK = PIVOT COUNT, AND ROW RANK ALWAYS EQUALS COLUMN RANK: the rank of a matrix is the '
      + 'number of PIVOTS in its row echelon form — reusing math.linalg.row-echelon’s own pivot '
      + 'structure directly — equivalently, the dimension of its COLUMN SPACE (the span of its '
      + 'columns) or its ROW SPACE (the span of its rows). A remarkable, non-obvious fact: ROW rank '
      + 'always EQUALS COLUMN rank, for any matrix, despite rows and columns seeming like '
      + 'structurally different objects.\n\n'
      + 'EXISTENCE AND UNIQUENESS ARE TWO QUESTIONS — CHECK BOTH, SEPARATELY: rank determines the '
      + 'SOLVABILITY of Ax=b via TWO SEPARATE comparisons. (1) A solution EXISTS if and only if '
      + 'rank(A)=rank([A|b]) — comparing A against the augmented matrix; if appending b increases '
      + 'the rank, the system is INCONSISTENT. rank(A) alone, without this comparison, never '
      + 'settles existence. (2) If a solution exists, it is UNIQUE if and only if rank(A) equals '
      + 'the number of UNKNOWNS — otherwise, infinitely many solutions exist (free variables '
      + 'remain). A consistent system is NOT automatically uniquely solvable; existence and '
      + 'uniqueness are genuinely DIFFERENT questions, each requiring its own comparison.',
    targetedMisconceptions: [`${RANK}:MC-1`, `${RANK}:MC-2`, `${RANK}:MC-3`],
    source: eb(RANK, 'Core Understanding — rank as the pivot count with row rank always equaling column rank, and solvability requiring two separate rank comparisons for existence and uniqueness'),
  },
  {
    conceptId: COLUMN_SPACE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'COLUMN SPACE DIMENSION IS THE RANK, NEVER JUST THE COLUMN COUNT: C(A)={Ax:x∈ℝⁿ} collects '
      + 'every possible output Ax as x ranges over ℝⁿ — equivalently, every linear combination of '
      + 'A’s columns, directly reusing math.linalg.span’s own spanning machinery. C(A) is a '
      + 'subspace of ℝᵐ. For A=[[1,2],[3,6],[2,4]], the two columns (1,3,2) and (2,6,4) are '
      + 'proportional — genuinely linearly DEPENDENT — so the column space is really the span of '
      + 'just ONE vector (a line), not a 2-dimensional plane, despite A HAVING 2 columns. The '
      + 'column count is only an UPPER BOUND on the column space’s dimension; dependent columns '
      + 'collapse it, and dim(C(A))=rank(A) is what tells the true size, confirmed by row-reduction '
      + '(1 pivot in this example, matching dim(C(A))=1).\n\n'
      + 'EVERY COMPONENT MUST MATCH AT ONCE — A PARTIAL MATCH PROVES NOTHING: Ax=b is CONSISTENT '
      + 'exactly when b∈C(A), verified across ALL components simultaneously. For '
      + 'A=[[1,0],[0,1],[1,1]] and b=(2,3,4), checking b∈C(A) requires c₁=2, c₂=3 AND c₁+c₂=4 '
      + 'simultaneously — but 2+3=5≠4, so b∉C(A) and Ax=b has NO solution. Confirming only the '
      + 'first two components without checking the third would incorrectly suggest consistency.',
    targetedMisconceptions: [`${COLUMN_SPACE}:MC-1`, `${COLUMN_SPACE}:MC-2`],
    source: eb(COLUMN_SPACE, 'Core Understanding — column space dimension as the rank rather than the raw column count when columns are dependent, and consistency requiring every component of b to be matched simultaneously'),
  },
  {
    conceptId: LINEAR_INDEPENDENCE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE TRIVIAL SOLUTION ALWAYS WORKS — ONLY ITS UNIQUENESS PROVES INDEPENDENCE: v₁,…,vₖ are '
      + 'linearly independent iff the ONLY solution to c₁v₁+⋯+cₖvₖ=0 is c₁=⋯=cₖ=0. The trivial '
      + 'solution ALWAYS satisfies this equation, for ANY set, dependent or not — confirming it '
      + 'proves nothing on its own. Genuine independence requires actually solving the full system '
      + 'and confirming NO other solution exists, directly reusing math.linalg.span’s own '
      + 'redundancy notion: dependence is precisely when some vector is already reachable from the '
      + 'others.\n\n'
      + 'THREE OR MORE VECTORS CAN BE DEPENDENT WITH NO PAIR PARALLEL — ALWAYS SOLVE THE FULL '
      + 'SYSTEM: for v₁=(1,0), v₂=(0,1), v₃=(2,3), no two of the three are parallel or identical — '
      + 'yet solving c₁v₁+c₂v₂+c₃v₃=0 gives infinitely many solutions, confirming v₃=2v₁+3v₂, a '
      + 'genuine NONTRIVIAL combination. Checking only pairs misses this multi-vector dependency '
      + 'entirely; only setting up and solving the FULL combination equation reliably detects it.\n\n'
      + 'MORE VECTORS THAN DIMENSIONS MEANS DEPENDENCE, GUARANTEED, NO COMPUTATION NEEDED: in ℝⁿ, '
      + 'any set of MORE than n vectors is automatically linearly dependent — a structural '
      + 'consequence of dimension, not something requiring a case-by-case check. Once a set is '
      + 'already dependent, adding further vectors keeps it dependent.',
    targetedMisconceptions: [`${LINEAR_INDEPENDENCE}:MC-1`, `${LINEAR_INDEPENDENCE}:MC-2`, `${LINEAR_INDEPENDENCE}:MC-3`],
    source: eb(LINEAR_INDEPENDENCE, 'Core Understanding — independence requiring the trivial solution to be the only one, dependence hiding across three or more vectors with no pairwise relationship visible, and the dimension-count rule forcing dependence beyond n vectors'),
  },
]

export const MATHEMATICS_LINALG_RANK_COLUMN_SPACE_LINEAR_INDEPENDENCE_PROBES: SeedProbe[] = [
  {
    conceptId: RANK, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A matrix A has "full rank." Does that alone guarantee that Ax=b has a solution?',
    choices: [
      { text: 'No — existence requires comparing rank(A) to rank([A|b]); if appending b increases the rank beyond rank(A), the system is inconsistent regardless of how "full" A’s own rank looks in isolation', isCorrect: true },
      { text: 'Yes — a matrix with full rank automatically guarantees that Ax=b has a solution for any vector b, since full rank means the matrix has no deficiencies', isCorrect: false, misconceptionId: `${RANK}:MC-1` },
      { text: "Yes, because rank(A) being as large as possible is by itself sufficient to determine that the system is solvable for every choice of b", isCorrect: false, misconceptionId: `${RANK}:MC-1` },
    ],
    targetedMisconceptions: [`${RANK}:MC-1`],
    source: eb(RANK, 'Demonstration 2 — for a system with rank(A)=2 and rank([A|b])=3, showing the mismatch signals inconsistency with no solution, directly breaking EXISTENCE-CHECKED-VIA-RANK-A-ALONE'),
  },
  {
    conceptId: RANK, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A system is confirmed consistent (rank(A)=rank([A|b])=2), but it has 3 unknowns. Does consistency alone guarantee the solution is unique?',
    choices: [
      { text: 'No — uniqueness requires a SEPARATE comparison of rank(A) against the number of unknowns; here rank(A)=2<3 unknowns, leaving 1 free variable and infinitely many solutions despite the system being consistent', isCorrect: true },
      { text: "Yes — once a system is confirmed consistent (has at least one solution), that consistency by itself also guarantees the solution is unique", isCorrect: false, misconceptionId: `${RANK}:MC-2` },
      { text: "Yes, because 'has a solution' and 'has exactly one solution' are the same claim about a linear system", isCorrect: false, misconceptionId: `${RANK}:MC-2` },
    ],
    targetedMisconceptions: [`${RANK}:MC-2`],
    source: eb(RANK, 'Demonstration 3 — for a consistent system with rank(A)=rank([A|b])=2 and 3 unknowns, showing the solution is NOT unique (1 free variable, infinitely many solutions), directly breaking CONSISTENCY-ASSUMED-TO-IMPLY-UNIQUENESS'),
  },
  {
    conceptId: RANK, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'While row-reducing a 3×3 matrix, one row becomes entirely zeros. Should this all-zero row be counted as contributing a pivot to the rank?',
    choices: [
      { text: 'No — a pivot must be a genuinely nonzero leading entry in its row; an all-zero row has no leading nonzero entry at all, so it contributes nothing to the pivot count and hence nothing to the rank', isCorrect: true },
      { text: 'Yes — every row in a row-reduced matrix should be counted toward the rank regardless of whether it contains a leading nonzero entry', isCorrect: false, misconceptionId: `${RANK}:MC-3` },
      { text: "Yes, because a visually 'full-looking' matrix should have a pivot in every one of its rows by default", isCorrect: false, misconceptionId: `${RANK}:MC-3` },
    ],
    targetedMisconceptions: [`${RANK}:MC-3`],
    source: eb(RANK, 'Demonstration 1 — row-reducing a 3×3 matrix and explicitly circling each genuine pivot as identified, connecting the final pivot count to the rank, directly breaking PIVOT-COUNT-MISCOMPUTED-DURING-ROW-REDUCTION'),
  },
  {
    conceptId: COLUMN_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A matrix A has 2 columns, where column 2 is exactly 2× column 1. Does C(A) have dimension 2?',
    choices: [
      { text: 'No — the two columns are linearly dependent, so the column space collapses to the span of just ONE vector (a line), dim(C(A))=1; the column count is only an upper bound, not the actual dimension', isCorrect: true },
      { text: "Yes — since A has 2 columns, dim(C(A)) automatically equals 2, matching the raw column count regardless of any relationship between the columns", isCorrect: false, misconceptionId: `${COLUMN_SPACE}:MC-2` },
      { text: 'Yes, because the column space is defined directly in terms of the columns, so its dimension must always match how many columns the matrix has', isCorrect: false, misconceptionId: `${COLUMN_SPACE}:MC-2` },
    ],
    targetedMisconceptions: [`${COLUMN_SPACE}:MC-2`],
    source: eb(COLUMN_SPACE, 'Demonstration 1 and 3 — showing column 2 is exactly 2× column 1 (genuinely dependent) and row-reducing to confirm rank 1 matches dim(C(A))=1, directly breaking COLUMN-SPACE-DIMENSION-ASSUMED-EQUAL-TO-COLUMN-COUNT'),
  },
  {
    conceptId: COLUMN_SPACE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For A=[[1,0],[0,1],[1,1]] and b=(2,3,4), the first two components are matched by c₁=2, c₂=3. Is that enough to conclude b∈C(A)?',
    choices: [
      { text: 'No — every component of b must match the SAME coefficients simultaneously; the third component requires c₁+c₂=4, but 2+3=5≠4, so the full system fails and b∉C(A) despite the first two components matching', isCorrect: true },
      { text: 'Yes — once the first two components of b are matched by a candidate combination, that confirms b is in the column space regardless of any remaining components', isCorrect: false, misconceptionId: `${COLUMN_SPACE}:MC-1` },
      { text: "Yes, because matching a majority of b's components is sufficient evidence that the full vector lies in C(A)", isCorrect: false, misconceptionId: `${COLUMN_SPACE}:MC-1` },
    ],
    targetedMisconceptions: [`${COLUMN_SPACE}:MC-1`],
    source: eb(COLUMN_SPACE, 'Demonstration 2 — showing c₁=2, c₂=3 matches the first two components but fails the third (2+3=5≠4), so b∉C(A), directly breaking COLUMN-SPACE-MEMBERSHIP-CHECKED-PARTIALLY'),
  },
  {
    conceptId: COLUMN_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A new 3×4 matrix B has 4 columns, but row-reducing B gives only 2 pivots. What is dim(C(B))?',
    choices: [
      { text: 'dim(C(B))=2 — the column space dimension always equals the rank (the pivot count from row reduction), never the raw column count; here 2 of the 4 columns must be linear combinations of the other two', isCorrect: true },
      { text: 'dim(C(B))=4 — since B has 4 columns, its column space dimension must equal 4 regardless of what row reduction reveals about the matrix', isCorrect: false, misconceptionId: `${COLUMN_SPACE}:MC-2` },
      { text: 'dim(C(B)) cannot be determined without checking which specific components of a target vector b are matched, since dimension and consistency are computed the same way', isCorrect: false, misconceptionId: `${COLUMN_SPACE}:MC-2` },
    ],
    targetedMisconceptions: [`${COLUMN_SPACE}:MC-2`],
    source: eb(COLUMN_SPACE, 'Assessment Signals Rung 3 — correctly stating dim(C(A)) for a NEW matrix using its rank even when the column count differs from the rank, directly breaking COLUMN-SPACE-DIMENSION-ASSUMED-EQUAL-TO-COLUMN-COUNT'),
  },
  {
    conceptId: LINEAR_INDEPENDENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For u₁=(1,1,0), u₂=(0,1,1), u₃=(1,2,1), no two of the three vectors are scalar multiples of each other. Does that guarantee the set is linearly independent?',
    choices: [
      { text: 'No — u₁+u₂=u₃, so u₁+u₂−u₃=0 is a genuine nontrivial combination; the set is DEPENDENT despite having zero pairwise-parallel relationships anywhere, since dependence can involve three or more vectors jointly', isCorrect: true },
      { text: 'Yes — if no two vectors in a set are parallel or identical to each other, the entire set must be linearly independent', isCorrect: false, misconceptionId: `${LINEAR_INDEPENDENCE}:MC-1` },
      { text: "Yes, because linear dependence can only ever arise from a pairwise relationship between exactly two vectors in the set", isCorrect: false, misconceptionId: `${LINEAR_INDEPENDENCE}:MC-1` },
    ],
    targetedMisconceptions: [`${LINEAR_INDEPENDENCE}:MC-1`],
    source: eb(LINEAR_INDEPENDENCE, 'Demonstration 1 — u₁=(1,1,0), u₂=(0,1,1), u₃=(1,2,1) with no pair parallel, yet u₁+u₂−u₃=0 a genuine nontrivial combination, directly breaking DEPENDENCE-REQUIRES-PARALLEL-PAIR'),
  },
  {
    conceptId: LINEAR_INDEPENDENCE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For the standard basis w₁=(1,0,0), w₂=(0,1,0), w₃=(0,0,1), someone shows c₁=c₂=c₃=0 satisfies c₁w₁+c₂w₂+c₃w₃=0 and declares the set independent. Is exhibiting this trivial solution sufficient proof?',
    choices: [
      { text: 'No — the trivial solution ALWAYS satisfies the equation for any set, dependent or not, and proves nothing on its own; genuine independence requires confirming no OTHER (nontrivial) solution exists, which for this set is genuinely true but must be shown, not merely exhibited', isCorrect: true },
      { text: 'Yes — showing that c₁=c₂=c₃=0 works is a complete proof that the set is linearly independent, since this satisfies the defining equation', isCorrect: false, misconceptionId: `${LINEAR_INDEPENDENCE}:MC-2` },
      { text: "Yes, because the trivial solution is the only kind of solution that ever needs to be checked when determining independence", isCorrect: false, misconceptionId: `${LINEAR_INDEPENDENCE}:MC-2` },
    ],
    targetedMisconceptions: [`${LINEAR_INDEPENDENCE}:MC-2`],
    source: eb(LINEAR_INDEPENDENCE, 'Demonstration 2 — solving c₁w₁+c₂w₂+c₃w₃=0 for the standard basis and showing it FORCES c₁=c₂=c₃=0 with no other solution algebraically possible, directly breaking TRIVIAL-SOLUTION-PROVES-INDEPENDENCE'),
  },
  {
    conceptId: LINEAR_INDEPENDENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Could a set of 5 vectors in ℝ³ possibly be linearly independent?',
    choices: [
      { text: 'No — in ℝⁿ, any set of MORE than n vectors is automatically linearly dependent; with 5 vectors in ℝ³ (n=3), the set is dependent by this structural, dimension-based fact alone, with no computation needed', isCorrect: true },
      { text: 'Yes — whether a set of 5 vectors in ℝ³ is independent depends entirely on the specific vectors chosen, and could go either way without checking', isCorrect: false, misconceptionId: `${LINEAR_INDEPENDENCE}:MC-3` },
      { text: "Yes, because the number of vectors in a set has no bearing on whether that set can be linearly independent in a given space", isCorrect: false, misconceptionId: `${LINEAR_INDEPENDENCE}:MC-3` },
    ],
    targetedMisconceptions: [`${LINEAR_INDEPENDENCE}:MC-3`],
    source: eb(LINEAR_INDEPENDENCE, 'Demonstration 3 — showing any 4 vectors in ℝ³ (e.g. the standard basis plus (1,1,1)) are automatically dependent with no computation needed in advance, directly breaking ANY-VECTOR-COUNT-CAN-BE-INDEPENDENT'),
  },
]
