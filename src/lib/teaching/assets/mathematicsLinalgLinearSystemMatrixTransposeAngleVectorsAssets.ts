/**
 * Batch: linear-system, matrix-transpose, angle-vectors (math.linalg).
 *
 * Continuing math.linalg (11/61 -> 14/61). Fresh frontier recompute found
 * 11 ready concepts. Selected linear-system (highest unlock value: opens
 * row-echelon; matrix-inverse already authored) and matrix-transpose
 * (opens symmetric-matrix), plus angle-vectors, which closes out the
 * dot-product+norm concept family opened in Batches 104-105 (a terminal
 * leaf with no further unlocks).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.linalg.{linear-system,matrix-transpose,angle-vectors}.md.
 *
 *   LINEAR-SYSTEM  Ax=b restates elimination-based systems in matrix form;
 *           comparing rank(A) to rank([A|b]) and to n classifies the
 *           outcome completely — RANK, never raw equation count, decides
 *           it, since redundant or contradictory equations change rank
 *           without changing how many were written down; a terminal row
 *           [0···0|c] means a free variable if c=0 but a fatal
 *           contradiction if c≠0 — the two look nearly identical but mean
 *           opposite things.
 *   MATRIX-TRANSPOSE  (Aᵀ)ᵢⱼ=Aⱼᵢ — the two subscripts genuinely SWAP;
 *           (AB)ᵀ=BᵀAᵀ REVERSES order, forced by dimension-matching alone,
 *           never an arbitrary convention; symmetry (A=Aᵀ) requires the
 *           matrix to be SQUARE as a precondition — asking whether a
 *           non-square matrix is symmetric is not merely false, it is not
 *           a meaningful question at all.
 *   ANGLE-VECTORS  cosθ=(a·b)/(|a||b|) combines the dot product and norm
 *           directly; checking perpendicularity needs ONLY a·b=0 — no
 *           norms or arccosine required, a genuine efficiency shortcut
 *           for that specific question only; Cauchy-Schwarz guarantees
 *           the ratio always lies in [-1,1], so a computed value outside
 *           that range can never genuinely happen and always signals an
 *           upstream computational error.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const LINEAR_SYSTEM = 'math.linalg.linear-system'
const MATRIX_TRANSPOSE = 'math.linalg.matrix-transpose'
const ANGLE_VECTORS = 'math.linalg.angle-vectors'

export const MATHEMATICS_LINALG_LINEAR_SYSTEM_MATRIX_TRANSPOSE_ANGLE_VECTORS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LINEAR_SYSTEM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'RANK DECIDES IT, NOT EQUATION COUNT: a system of m linear equations in n unknowns can be '
      + 'written Ax=b, reusing math.linalg.matrix’s own grid structure directly — restating '
      + 'math.alg.system-linear-equations’ elimination-based content in matrix form. Let '
      + 'r=rank(A) and r’=rank([A|b]) (the augmented matrix); always r≤r’. Three cases classify '
      + 'the outcome completely: r<r’ means NO SOLUTION (inconsistent); r=r’=n means UNIQUE '
      + 'SOLUTION (as many independent constraints as unknowns); r=r’<n means INFINITELY MANY '
      + 'SOLUTIONS (n−r free variables). Equation count m never appears directly — only the RANKS '
      + 'do, which measure genuinely INDEPENDENT constraints regardless of how many equations were '
      + 'originally written down. A system can have as many equations as unknowns and STILL fail to '
      + 'have a unique solution if some equations are redundant or contradictory.\n\n'
      + '[0···0|0] IS FREE; [0···0|c≠0] IS FATAL: reading a terminal row-reduced row [0 0 ··· 0|c] '
      + 'is the single most diagnostic step. If c=0, the row reads "0=0" — always true, '
      + 'contributing no new constraint, toward a FREE variable and infinitely many solutions '
      + '(provided nothing else contradicts). If c≠0, the row reads "0=c" — always FALSE, a '
      + 'CONTRADICTION that makes the ENTIRE system unsolvable, overriding every other equation '
      + 'regardless of how consistent they otherwise are. The two rows look almost identical but '
      + 'mean opposite things — the augmented entry must always be checked explicitly.',
    targetedMisconceptions: [`${LINEAR_SYSTEM}:MC-1`, `${LINEAR_SYSTEM}:MC-2`, `${LINEAR_SYSTEM}:MC-3`],
    source: eb(LINEAR_SYSTEM, 'Core Understanding — Ax=b classified completely by comparing rank(A), rank([A|b]), and n, with rank rather than equation count deciding the outcome, and the terminal row [0···0|c] distinguishing a free variable (c=0) from a contradiction (c≠0)'),
  },
  {
    conceptId: MATRIX_TRANSPOSE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      '(Aᵀ)ᵢⱼ=Aⱼᵢ — THE SUBSCRIPTS GENUINELY SWAP: for an m×n matrix A, the transpose Aᵀ is the '
      + 'n×m matrix defined by (Aᵀ)ᵢⱼ=Aⱼᵢ — reusing math.linalg.matrix’s own (i,j)-indexed grid, '
      + 'the entry in row j, column i of A moves to row i, column j of Aᵀ. Equivalently: row i of '
      + 'Aᵀ IS column i of A — rows and columns swap roles entirely, so a matrix that started m×n '
      + 'becomes n×m.\n\n'
      + '(AB)ᵀ=BᵀAᵀ — REVERSED ORDER, FORCED BY DIMENSIONS, NOT ARBITRARY: (Aᵀ)ᵀ=A (transposing '
      + 'twice restores the original), and (AB)ᵀ=BᵀAᵀ, where the ORDER REVERSES. This reversal is '
      + 'forced by dimension matching alone: if A is m×n and B is n×p, then AB is m×p, so (AB)ᵀ '
      + 'must be p×m. But Bᵀ is p×n and Aᵀ is n×m, so only BᵀAᵀ — in that specific order — produces '
      + 'a p×m result; AᵀBᵀ often cannot even be computed, since its inner dimensions (m and n) '
      + 'need not match at all.\n\n'
      + 'SQUARE FIRST, SYMMETRIC SECOND: a matrix A is SYMMETRIC if A=Aᵀ. This forces A to be '
      + 'SQUARE (m=n), since A and Aᵀ must share the same dimensions for the equality to even be a '
      + 'well-formed question — a non-square matrix’s transpose has genuinely different '
      + 'dimensions from the original, so asking "is it symmetric?" is not merely false, it is not '
      + 'a meaningful question at all. For a square matrix, symmetry additionally requires Aᵢⱼ=Aⱼᵢ '
      + 'for every entry — the matrix mirrors itself across its main diagonal.',
    targetedMisconceptions: [`${MATRIX_TRANSPOSE}:MC-1`, `${MATRIX_TRANSPOSE}:MC-2`, `${MATRIX_TRANSPOSE}:MC-3`],
    source: eb(MATRIX_TRANSPOSE, 'Core Understanding — (Aᵀ)ᵢⱼ=Aⱼᵢ as a genuine index swap, the order-reversing identity (AB)ᵀ=BᵀAᵀ forced by dimension matching, and symmetry’s square-shape precondition before any entrywise comparison'),
  },
  {
    conceptId: ANGLE_VECTORS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'cosθ=(a·b)/(|a||b|) — THE DOT PRODUCT, NORMALIZED: the angle θ between two nonzero vectors '
      + 'a,b satisfies cosθ=(a·b)/(|a||b|) — the dot product (math.linalg.dot-product), normalized '
      + 'by both vectors’ lengths (math.linalg.norm). Solving for θ: θ=cos⁻¹((a·b)/(|a||b|)).\n\n'
      + 'PERPENDICULAR? DOT PRODUCT ALONE, NO NORMS NEEDED: a key special case is θ=π/2 '
      + '(perpendicular) IF AND ONLY IF a·b=0 — since cos(π/2)=0, checking perpendicularity is as '
      + 'simple as computing the dot product ALONE, without needing the norms or the full angle '
      + 'formula at all. This is a genuine EFFICIENCY shortcut for the specific perpendicularity '
      + 'question only — finding the actual numeric angle for a non-perpendicular pair still '
      + 'requires norms and arccosine.\n\n'
      + 'OUTSIDE [-1,1] IS IMPOSSIBLE — ALWAYS AN UPSTREAM ERROR: the CAUCHY-SCHWARZ INEQUALITY '
      + 'guarantees |(a·b)/(|a||b|)|≤1 ALWAYS — this ratio always lies in [-1,1], exactly the '
      + 'domain of cos⁻¹, ensuring the angle formula is always mathematically well-defined. A '
      + 'computed ratio falling OUTSIDE [-1,1] can never genuinely happen for real vectors — such a '
      + 'result signals a computational ERROR somewhere upstream (in the dot product or norm '
      + 'calculation), not a legitimate but unusual outcome.',
    targetedMisconceptions: [`${ANGLE_VECTORS}:MC-1`, `${ANGLE_VECTORS}:MC-2`],
    source: eb(ANGLE_VECTORS, 'Core Understanding — cosθ=(a·b)/(|a||b|) combining the dot product and norm, the dot-product-alone perpendicularity shortcut, and the Cauchy-Schwarz guarantee that an out-of-range ratio always signals an upstream error'),
  },
]

export const MATHEMATICS_LINALG_LINEAR_SYSTEM_MATRIX_TRANSPOSE_ANGLE_VECTORS_PROBES: SeedProbe[] = [
  {
    conceptId: LINEAR_SYSTEM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A system has 3 equations and 3 unknowns, but row reduction reveals rank(A)=2 because one equation is a scalar multiple of another. Does this system have a unique solution?',
    choices: [
      { text: 'No — rank, not equation count, decides the outcome; with rank(A)=2<n=3, the matching equation-and-unknown count does not guarantee uniqueness since one equation is redundant', isCorrect: true },
      { text: 'Yes — since the system has exactly as many equations as unknowns (3 and 3), it must have a unique solution regardless of any relationships between the individual equations', isCorrect: false, misconceptionId: `${LINEAR_SYSTEM}:MC-1` },
      { text: 'Yes, because equation count alone always determines the number of solutions a system has, independent of what row reduction reveals', isCorrect: false, misconceptionId: `${LINEAR_SYSTEM}:MC-1` },
    ],
    targetedMisconceptions: [`${LINEAR_SYSTEM}:MC-1`],
    source: eb(LINEAR_SYSTEM, 'Demonstration 1 — row-reducing a 3-equation, 3-unknown system where one equation is a scalar multiple of another, showing rank 2<n=3 despite the matching count, directly breaking EQUATION-COUNT-DETERMINES-OUTCOME'),
  },
  {
    conceptId: LINEAR_SYSTEM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Row reduction produces the terminal row [0 0 0|0] for one system and [0 0 0|5] for an otherwise-identical system. Do these two rows mean the same thing?',
    choices: [
      { text: 'No — [0 0 0|0] reads "0=0," always true, contributing a free variable toward infinitely many solutions; [0 0 0|5] reads "0=5," always false, a contradiction that makes the entire system unsolvable', isCorrect: true },
      { text: "Yes — any all-coefficient-zero row signals infinitely many solutions, regardless of what value appears in the augmented column position", isCorrect: false, misconceptionId: `${LINEAR_SYSTEM}:MC-2` },
      { text: "Yes, because a row with all-zero coefficients on the left side always represents a redundant equation that can be safely ignored, whatever the right-hand value is", isCorrect: false, misconceptionId: `${LINEAR_SYSTEM}:MC-2` },
    ],
    targetedMisconceptions: [`${LINEAR_SYSTEM}:MC-2`],
    source: eb(LINEAR_SYSTEM, 'Demonstration 2 — contrasting [0 0 0|0] (a genuinely redundant equation) against [0 0 0|5] (a genuine contradiction) for two otherwise-identical systems, directly breaking ZERO-ROW-ALWAYS-MEANS-INFINITE-SOLUTIONS'),
  },
  {
    conceptId: LINEAR_SYSTEM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A consistent system has 2 equations in 3 unknowns, so rank(A)<n. Does this necessarily mean the system has no solution?',
    choices: [
      { text: 'No — rank(A)<n with a consistent system means infinitely many solutions (via free variables), never automatically "no solution"; having fewer independent equations than unknowns signals underdetermination, not inconsistency', isCorrect: true },
      { text: 'Yes — whenever there are fewer independent equations than unknowns, the system is automatically inconsistent and has no solution', isCorrect: false, misconceptionId: `${LINEAR_SYSTEM}:MC-3` },
      { text: "Yes, because a system needs at least as many equations as unknowns for any solution to exist at all", isCorrect: false, misconceptionId: `${LINEAR_SYSTEM}:MC-3` },
    ],
    targetedMisconceptions: [`${LINEAR_SYSTEM}:MC-3`],
    source: eb(LINEAR_SYSTEM, 'Demonstration 3 — row-reducing a consistent 2-equation, 3-unknown system to show infinitely many solutions (2 free variables), never "no solution" merely from having fewer equations, directly breaking RANK-LESS-THAN-N-MEANS-NO-SOLUTION'),
  },
  {
    conceptId: MATRIX_TRANSPOSE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For matrices A and B where AB is defined, does (AB)ᵀ equal AᵀBᵀ (same order) or BᵀAᵀ (reversed order)?',
    choices: [
      { text: 'BᵀAᵀ — the order reverses, and this is forced by dimension matching alone: if A is m×n and B is n×p, only BᵀAᵀ produces the required p×m result, while AᵀBᵀ often cannot even be computed', isCorrect: true },
      { text: 'AᵀBᵀ — the transpose distributes over a product in the same order the factors were originally multiplied, just as scalar multiplication distributes without reordering', isCorrect: false, misconceptionId: `${MATRIX_TRANSPOSE}:MC-1` },
      { text: 'Either AᵀBᵀ or BᵀAᵀ gives the correct result, since matrix transposition is not sensitive to the order factors are written in', isCorrect: false, misconceptionId: `${MATRIX_TRANSPOSE}:MC-1` },
    ],
    targetedMisconceptions: [`${MATRIX_TRANSPOSE}:MC-1`],
    source: eb(MATRIX_TRANSPOSE, 'Demonstration 1 — computing (AB)ᵀ, BᵀAᵀ (matches), and AᵀBᵀ (does not match) explicitly for concrete matrices, directly breaking TRANSPOSE-PRODUCT-ORDER-NOT-REVERSED'),
  },
  {
    conceptId: MATRIX_TRANSPOSE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Can a 2×3 matrix A ever be symmetric (satisfy A=Aᵀ)?',
    choices: [
      { text: 'No — symmetry requires the matrix to be SQUARE as a precondition; a 2×3 matrix’s transpose is 3×2, a genuinely different shape, so asking whether A=Aᵀ is not even a meaningful question for this matrix, let alone a false one', isCorrect: true },
      { text: 'Yes, as long as the entries happen to satisfy Aᵢⱼ=Aⱼᵢ for every valid pair of indices, regardless of whether the matrix is square', isCorrect: false, misconceptionId: `${MATRIX_TRANSPOSE}:MC-2` },
      { text: "Yes — any two matrices can in principle be compared for equality, so a non-square matrix could still turn out to equal its own transpose", isCorrect: false, misconceptionId: `${MATRIX_TRANSPOSE}:MC-2` },
    ],
    targetedMisconceptions: [`${MATRIX_TRANSPOSE}:MC-2`],
    source: eb(MATRIX_TRANSPOSE, 'Demonstration 2 — contrasting a genuinely symmetric square matrix against a non-square matrix, showing A=Aᵀ is not even a well-formed question for the latter, directly breaking SYMMETRY-CHECKED-ON-NON-SQUARE-MATRIX'),
  },
  {
    conceptId: MATRIX_TRANSPOSE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For A=[[1,2,3],[4,5,6]], what is (Aᵀ)₃₁, and does it equal A₃₁ or A₁₃?',
    choices: [
      { text: '(Aᵀ)₃₁=A₁₃=3 — the index swap (Aᵀ)ᵢⱼ=Aⱼᵢ means row 3, column 1 of Aᵀ holds whatever value was at row 1, column 3 of A, not the same-position entry A₃₁ (which does not even exist for this 2×3 matrix)', isCorrect: true },
      { text: '(Aᵀ)₃₁=A₃₁ — the transpose keeps each entry at the same subscript position, since transposing does not actually change which value sits at a given index pair', isCorrect: false, misconceptionId: `${MATRIX_TRANSPOSE}:MC-3` },
      { text: 'The value cannot be determined without also swapping the order of A itself first, before the transpose can be meaningfully applied', isCorrect: false, misconceptionId: `${MATRIX_TRANSPOSE}:MC-3` },
    ],
    targetedMisconceptions: [`${MATRIX_TRANSPOSE}:MC-3`],
    source: eb(MATRIX_TRANSPOSE, 'Demonstration 3 — verifying (Aᵀ)₃₁=A₁₃ explicitly for A=[[1,2,3],[4,5,6]], physically locating both cells to confirm the index swap, directly breaking TRANSPOSE-INDEX-RULE-APPLIED-BACKWARD'),
  },
  {
    conceptId: ANGLE_VECTORS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'To check whether (2,3) and (3,-2) are perpendicular, is it necessary to compute both vectors’ norms and then take an arccosine?',
    choices: [
      { text: 'No — a·b=0 is both necessary AND sufficient for perpendicularity; computing a·b=2(3)+3(-2)=0 alone confirms the vectors are perpendicular, with no norms or arccosine needed', isCorrect: true },
      { text: 'Yes — determining any angle between two vectors, including checking for perpendicularity specifically, always requires the full formula with both norms and the arccosine step', isCorrect: false, misconceptionId: `${ANGLE_VECTORS}:MC-1` },
      { text: 'Yes, because the dot product alone can never reliably indicate perpendicularity without also confirming the vectors’ relative lengths', isCorrect: false, misconceptionId: `${ANGLE_VECTORS}:MC-1` },
    ],
    targetedMisconceptions: [`${ANGLE_VECTORS}:MC-1`],
    source: eb(ANGLE_VECTORS, 'Demonstration 2 — determining (2,3) and (3,-2) are perpendicular by computing a·b=6-6=0 alone, without computing norms or the arccosine, directly breaking FULL-ANGLE-FORMULA-USED-UNNECESSARILY-FOR-PERPENDICULARITY-CHECK'),
  },
  {
    conceptId: ANGLE_VECTORS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For a genuinely parallel, same-direction pair of vectors, the ratio (a·b)/(|a||b|) comes out to exactly 1 — the upper extreme Cauchy-Schwarz allows. Would computing a ratio of exactly 1 for such a pair ever be unexpected?',
    choices: [
      { text: 'No — Cauchy-Schwarz guarantees the ratio always lies in [-1,1], and cosθ=1 (θ=0) is exactly the extreme case for two vectors pointing in the same direction; this is a genuine, expected bound, not an error', isCorrect: true },
      { text: "Yes — a ratio of exactly 1 should always be treated as suspicious, since real vector computations essentially never reach the exact boundary values of an inequality", isCorrect: false, misconceptionId: `${ANGLE_VECTORS}:MC-2` },
      { text: "Yes, because any ratio outside the open interval (-1,1), including exactly 1, indicates that the dot product or norm was computed incorrectly somewhere upstream", isCorrect: false, misconceptionId: `${ANGLE_VECTORS}:MC-2` },
    ],
    targetedMisconceptions: [`${ANGLE_VECTORS}:MC-2`],
    source: eb(ANGLE_VECTORS, 'Demonstration 3 — verifying the extreme cases cosθ=±1 for parallel (same-direction and opposite-direction) vector pairs as the genuine bounds Cauchy-Schwarz guarantees, directly breaking OUT-OF-RANGE-RATIO-NOT-RECOGNIZED-AS-ERROR-SIGNAL'),
  },
  {
    conceptId: ANGLE_VECTORS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'After computing the dot product and norms for two vectors, the ratio (a·b)/(|a||b|) comes out to 1.2. What does this indicate?',
    choices: [
      { text: 'An upstream computational error — Cauchy-Schwarz guarantees this ratio always lies in [-1,1] for real vectors, so a value of 1.2 can never genuinely happen and signals a mistake in the dot product or norm calculation that must be re-checked', isCorrect: true },
      { text: "A valid but unusual angle where cos⁻¹(1.2) should simply be computed and reported as the answer, since some vector pairs can legitimately produce ratios slightly above 1", isCorrect: false, misconceptionId: `${ANGLE_VECTORS}:MC-2` },
      { text: 'A sign that the two vectors are more than perpendicular to each other, indicating an angle greater than 90 degrees but less than 180', isCorrect: false, misconceptionId: `${ANGLE_VECTORS}:MC-2` },
    ],
    targetedMisconceptions: [`${ANGLE_VECTORS}:MC-2`],
    source: eb(ANGLE_VECTORS, 'Teaching Sequence mastery gate — requiring an error-diagnosis judgment for an out-of-range ratio under transfer, re-stating the Cauchy-Schwarz guarantee and re-checking the dot product and norm computations, directly breaking OUT-OF-RANGE-RATIO-NOT-RECOGNIZED-AS-ERROR-SIGNAL'),
  },
]
