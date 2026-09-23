/**
 * Batch: positive-definite, least-squares, qr-factorization (math.linalg).
 *
 * Continuing math.linalg (44/61 -> 47/61). Fresh frontier recompute found
 * 13 ready concepts. Selected positive-definite (unlocks cholesky,
 * directly extending spectral-theorem from Batch 116), plus least-squares
 * (closes the projection family from Batch 115) and qr-factorization
 * (closes the gram-schmidt family from Batch 116) — both terminal leaves
 * with no further unlocks but completing their own concept families.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.linalg.{positive-definite,least-squares,qr-factorization}.md.
 *
 *   POSITIVE-DEFINITE  "positive definite" and "all eigenvalues positive"
 *           are literally the SAME fact — the Spectral Theorem's
 *           factorization IS the proof, never a separately asserted
 *           condition; a zero eigenvalue is the EXACT boundary between
 *           PSD (allows touching zero) and positive definite (never does)
 *           — the two are never interchangeable; the eigenvalue test
 *           requires symmetry (the Spectral Theorem's own precondition)
 *           and EVERY eigenvalue must be checked, never just some.
 *   LEAST-SQUARES  minimizing ‖Ax−b‖² is EXACTLY projection's own
 *           closest-point problem applied to b and W=col(A), never a
 *           genuinely new kind of problem; the normal equations
 *           AᵀAx̂=Aᵀb follow DIRECTLY from projection's own orthogonality
 *           characterization, never an unmotivated formula to memorize;
 *           the best-fit line MINIMIZES total squared deviation while
 *           generally MISSING every point, never assumed to pass through
 *           all points exactly.
 *   QR-FACTORIZATION  R's below-diagonal entries are EXACTLY zero BY
 *           CONSTRUCTION — a direct structural consequence of Gram-
 *           Schmidt's sequential build, never merely small or
 *           approximate; solving Rx=Qᵀb uses BACK-SUBSTITUTION, the
 *           efficient shortcut R's upper-triangular structure directly
 *           enables, never general Gaussian elimination which wastes
 *           that structure.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const POSITIVE_DEFINITE = 'math.linalg.positive-definite'
const LEAST_SQUARES = 'math.linalg.least-squares'
const QR_FACTORIZATION = 'math.linalg.qr-factorization'

export const MATHEMATICS_LINALG_POSITIVE_DEFINITE_LEAST_SQUARES_QR_FACTORIZATION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: POSITIVE_DEFINITE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE EIGENVALUE TEST IS DERIVED FROM THE SPECTRAL THEOREM — NEVER A SEPARATE FACT: '
      + 'substituting A=QΛQᵀ into vᵀAv: with w=Qᵀv (nonzero exactly when v is, since Q⁻¹=Qᵀ): '
      + 'vᵀAv=wᵀΛw=Σλᵢwᵢ² — a sum of squares WEIGHTED by the eigenvalues. This sum is guaranteed '
      + 'positive for EVERY nonzero w if and only if EVERY λᵢ>0: if even one eigenvalue were ≤0, '
      + 'choosing w along that eigenvector’s direction makes the sum ≤0. "Positive definite" and '
      + '"all eigenvalues positive" are literally the SAME fact — the Spectral Theorem’s '
      + 'factorization IS the proof, never a coincidentally-matching separate condition.\n\n'
      + 'A ZERO EIGENVALUE IS THE EXACT BOUNDARY — PSD ALLOWS IT, POSITIVE DEFINITE NEVER DOES: for '
      + 'A=[[1,1],[1,1]]: eigenvalues λ=0,2. Since one eigenvalue is EXACTLY zero, A is NOT positive '
      + 'definite — but IS positive semi-definite (all eigenvalues ≥0). For the zero-eigenvalue '
      + 'eigenvector v=(1,-1): vᵀAv=1-2+1=0 — the quadratic form GENUINELY equals zero for this '
      + 'nonzero v, confirming A fails strict positive definiteness while still qualifying as PSD.\n\n'
      + 'THE EIGENVALUE TEST NEEDS SYMMETRY FIRST, AND EVERY EIGENVALUE MUST BE CHECKED: the entire '
      + 'eigenvalue-equivalence argument used the Spectral Theorem’s A=QΛQᵀ factorization, which '
      + 'requires symmetry — the test cannot be applied to a non-symmetric matrix. And EVERY '
      + 'eigenvalue must be positive — a single negative or zero eigenvalue disqualifies the whole '
      + 'matrix, even if most eigenvalues check out positive.',
    targetedMisconceptions: [`${POSITIVE_DEFINITE}:MC-1`, `${POSITIVE_DEFINITE}:MC-2`, `${POSITIVE_DEFINITE}:MC-3`],
    source: eb(POSITIVE_DEFINITE, 'Core Understanding — positive definiteness as literally the same fact as all-eigenvalues-positive via the Spectral Theorem, a zero eigenvalue as the exact PSD/positive-definite boundary, and the eigenvalue test requiring symmetry with every eigenvalue checked'),
  },
  {
    conceptId: LEAST_SQUARES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'LEAST SQUARES IS PROJECTION’S CLOSEST-POINT PROBLEM — NEVER A SEPARATE NEW QUESTION: for '
      + 'the inconsistent system [[1,0],[0,1],[1,1]]x=(1,1,3) (rows 1-2 force x₁=x₂=1, but row 3 '
      + 'demands x₁+x₂=2≠3): b does NOT lie in W=col(A). The least-squares solution seeks '
      + 'Ax̂=projW(b) — this IS math.linalg.projection’s closest-point-in-W problem, applied here '
      + 'with W=col(A), never an unrelated new technique requiring separate machinery.\n\n'
      + 'THE NORMAL EQUATIONS COME FROM ORTHOGONALITY — NEVER AN UNMOTIVATED RECIPE: since '
      + 'projW(b)’s residual b−projW(b) is orthogonal to ALL of W, and W=col(A) is spanned by A’s '
      + 'columns, orthogonality to W is equivalent to orthogonality to EACH column of A — i.e. '
      + 'aᵢᵀ(b−Ax̂)=0 for every column aᵢ. Stacking these via (AB)ᵀ=BᵀAᵀ: Aᵀ(b−Ax̂)=0, giving '
      + 'AᵀAx̂=Aᵀb — the NORMAL EQUATIONS, derived DIRECTLY from the already-known orthogonality '
      + 'condition.\n\n'
      + 'BEST FIT MINIMIZES SQUARED DEVIATION — IT GENERALLY MISSES EVERY POINT: fitting y=c₀+c₁x '
      + 'to (0,1),(1,2),(2,2) (which do NOT lie on any single exact line): solving the normal '
      + 'equations gives x̂=(2/3,1/2) — the best-fit line y=2/3+x/2 MINIMIZES the total squared '
      + 'vertical deviation, but generally does NOT pass through any of the three points exactly. '
      + 'Least squares never pretends the data lies on a perfect line — it finds the specific line '
      + 'that comes closest, in the precise squared-distance sense.',
    targetedMisconceptions: [`${LEAST_SQUARES}:MC-1`, `${LEAST_SQUARES}:MC-2`, `${LEAST_SQUARES}:MC-3`],
    source: eb(LEAST_SQUARES, 'Core Understanding — least squares as exactly projection’s closest-point problem, the normal equations derived from orthogonality rather than memorized, and the best-fit line minimizing squared deviation while generally missing every point'),
  },
  {
    conceptId: QR_FACTORIZATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'R’S BELOW-DIAGONAL ZEROS ARE GUARANTEED BY CONSTRUCTION — NEVER A COINCIDENCE: for '
      + 'A=[[1,1],[1,0],[0,1]] (columns a₁=(1,1,0), a₂=(1,0,1)): Gram-Schmidt gives '
      + 'q₁=a₁/‖a₁‖, with R₁₁=q₁·a₁, R₁₂=q₁·a₂. The entry R₂₁ (below the diagonal) is EXACTLY 0 — '
      + 'never computed as a genuine projection coefficient — because Gram-Schmidt’s i-th '
      + 'orthonormal vector qᵢ is built ONLY from a₁,…,aᵢ, never depending on later columns. '
      + 'Treating R₂₁ as something needing computation, or as merely "small" rather than exactly '
      + 'zero, misunderstands the structural reason R ends up upper triangular in the first '
      + 'place.\n\n'
      + 'UPPER TRIANGULAR MEANS BACK-SUBSTITUTION — START FROM THE LAST UNKNOWN: for a '
      + 'least-squares problem Ax≈b: substituting A=QR gives Rx≈Qᵀb (multiplying by Qᵀ, using '
      + 'QᵀQ=I). Since R is upper triangular, solving Rx=Qᵀb via BACK-SUBSTITUTION (solve for the '
      + 'LAST unknown first, then substitute upward) is the efficient shortcut R’s structure '
      + 'directly enables. Using GENERAL Gaussian elimination still produces a correct answer, but '
      + 'wastes the triangular structure’s built-in efficiency — an unnecessary detour around the '
      + 'shortcut the factorization was designed to provide.',
    targetedMisconceptions: [`${QR_FACTORIZATION}:MC-1`, `${QR_FACTORIZATION}:MC-2`],
    source: eb(QR_FACTORIZATION, 'Core Understanding — R’s below-diagonal entries being exactly zero by construction from Gram-Schmidt’s sequential build, and back-substitution as the efficient solve for an upper-triangular system rather than general elimination'),
  },
]

export const MATHEMATICS_LINALG_POSITIVE_DEFINITE_LEAST_SQUARES_QR_FACTORIZATION_PROBES: SeedProbe[] = [
  {
    conceptId: POSITIVE_DEFINITE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Are "positive definite" and "positive semi-definite" the same condition for a symmetric matrix?',
    choices: [
      { text: 'No — a zero eigenvalue is the exact boundary between them: PSD allows the quadratic form to touch zero (eigenvalues ≥0), while positive definite requires vᵀAv>0 for EVERY nonzero v (all eigenvalues strictly >0)', isCorrect: true },
      { text: "Yes — 'positive definite' and 'positive semi-definite' are just two names for the exact same condition on a symmetric matrix's eigenvalues", isCorrect: false, misconceptionId: `${POSITIVE_DEFINITE}:MC-1` },
      { text: "Yes, since both terms describe matrices whose quadratic form is never negative, with no meaningful distinction between them", isCorrect: false, misconceptionId: `${POSITIVE_DEFINITE}:MC-1` },
    ],
    targetedMisconceptions: [`${POSITIVE_DEFINITE}:MC-1`],
    source: eb(POSITIVE_DEFINITE, 'Demonstration 3 — the zero-eigenvalue PSD-but-not-positive-definite example for A=[[1,1],[1,1]], with v=(1,-1) giving vᵀAv=0 exactly, directly breaking POSITIVE-DEFINITE-AND-PSD-TREATED-AS-INTERCHANGEABLE'),
  },
  {
    conceptId: POSITIVE_DEFINITE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Can the eigenvalue test for positive definiteness (checking whether every eigenvalue is positive) be applied to a non-symmetric matrix?',
    choices: [
      { text: 'No — the entire eigenvalue-equivalence argument is built on the Spectral Theorem’s A=QΛQᵀ factorization, which requires symmetry; the eigenvalue test does not apply to a non-symmetric matrix', isCorrect: true },
      { text: 'Yes — the eigenvalue test for positive definiteness works identically for any square matrix, symmetric or not, since eigenvalues can always be computed regardless of symmetry', isCorrect: false, misconceptionId: `${POSITIVE_DEFINITE}:MC-2` },
      { text: "Yes, because positive definiteness is fundamentally a property of a matrix's eigenvalues alone, independent of whether the matrix happens to be symmetric", isCorrect: false, misconceptionId: `${POSITIVE_DEFINITE}:MC-2` },
    ],
    targetedMisconceptions: [`${POSITIVE_DEFINITE}:MC-2`],
    source: eb(POSITIVE_DEFINITE, 'Memory Hooks and Tutor Actions — the eigenvalue test needing symmetry first since it is built on the Spectral Theorem, directly breaking POSITIVE-DEFINITENESS-CHECKED-ON-NON-SYMMETRIC-MATRIX'),
  },
  {
    conceptId: POSITIVE_DEFINITE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A symmetric 5×5 matrix has 4 out of 5 eigenvalues positive, with the fifth being negative. Is the matrix positive definite?',
    choices: [
      { text: 'No — EVERY eigenvalue must be strictly positive; a single negative (or zero) eigenvalue disqualifies the whole matrix, regardless of how many other eigenvalues check out positive', isCorrect: true },
      { text: 'Yes — with 4 out of 5 eigenvalues positive, the matrix is "mostly positive definite," which is sufficient to classify it as positive definite overall', isCorrect: false, misconceptionId: `${POSITIVE_DEFINITE}:MC-3` },
      { text: "Yes, because checking a majority of the eigenvalues is sufficient evidence to conclude positive definiteness for a large matrix", isCorrect: false, misconceptionId: `${POSITIVE_DEFINITE}:MC-3` },
    ],
    targetedMisconceptions: [`${POSITIVE_DEFINITE}:MC-3`],
    source: eb(POSITIVE_DEFINITE, 'Discovery Questions and Tutor Actions — requiring every eigenvalue to be checked, never a partial verification, directly breaking ONE-EIGENVALUE-CHECKED-INSTEAD-OF-ALL'),
  },
  {
    conceptId: LEAST_SQUARES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For the inconsistent system [[1,0],[0,1],[1,1]]x=(1,1,3), the least-squares solution seeks Ax̂=projW(b). Is this a genuinely new kind of problem, or something already known?',
    choices: [
      { text: 'Something already known — this IS math.linalg.projection’s closest-point-in-W problem, applied here with W=col(A); least squares is never an unrelated new technique requiring separate machinery', isCorrect: true },
      { text: 'A genuinely new kind of problem — least squares requires its own separate theoretical machinery distinct from anything already studied about projections', isCorrect: false, misconceptionId: `${LEAST_SQUARES}:MC-1` },
      { text: "A new problem, since least squares is fundamentally a statistical technique rather than a geometric one like projection", isCorrect: false, misconceptionId: `${LEAST_SQUARES}:MC-1` },
    ],
    targetedMisconceptions: [`${LEAST_SQUARES}:MC-1`],
    source: eb(LEAST_SQUARES, 'Demonstration 1 — the direct identification of W=col(A) for the inconsistent three-equation, two-unknown system, directly breaking LEAST-SQUARES-ASSUMED-UNRELATED-NEW-PROBLEM'),
  },
  {
    conceptId: LEAST_SQUARES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Are the normal equations AᵀAx̂=Aᵀb an independent formula to memorize, or do they follow from something already known?',
    choices: [
      { text: 'They follow directly from projection’s orthogonality characterization — since the residual b−Ax̂ is orthogonal to every column of A (aᵢᵀ(b−Ax̂)=0), stacking these via (AB)ᵀ=BᵀAᵀ gives Aᵀ(b−Ax̂)=0, i.e. AᵀAx̂=Aᵀb', isCorrect: true },
      { text: 'They are an independent formula that must be memorized separately, with no direct derivation connecting them to projection or orthogonality', isCorrect: false, misconceptionId: `${LEAST_SQUARES}:MC-2` },
      { text: "They are simply a notational convention for writing down a least-squares problem, without any deeper mathematical justification", isCorrect: false, misconceptionId: `${LEAST_SQUARES}:MC-2` },
    ],
    targetedMisconceptions: [`${LEAST_SQUARES}:MC-2`],
    source: eb(LEAST_SQUARES, 'Demonstration 2 — the normal-equations derivation and residual-orthogonality verification, directly breaking NORMAL-EQUATIONS-ASSUMED-UNMOTIVATED-FORMULA'),
  },
  {
    conceptId: LEAST_SQUARES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Fitting a least-squares line to the non-collinear points (0,1), (1,2), (2,2) gives the best-fit line y=2/3+x/2. Does this line pass through all three points exactly?',
    choices: [
      { text: 'No — the best-fit line MINIMIZES total squared deviation, but generally MISSES every point; it never pretends the data lies on a perfect line, finding instead the specific line that comes closest in the squared-distance sense', isCorrect: true },
      { text: 'Yes — a properly computed least-squares best-fit line always passes through every data point used to compute it exactly', isCorrect: false, misconceptionId: `${LEAST_SQUARES}:MC-3` },
      { text: "Yes, because 'best fit' means the line perfectly matches the underlying pattern in the data, hitting every point precisely", isCorrect: false, misconceptionId: `${LEAST_SQUARES}:MC-3` },
    ],
    targetedMisconceptions: [`${LEAST_SQUARES}:MC-3`],
    source: eb(LEAST_SQUARES, 'Demonstration 3 — the best-fit-line data-fitting example, showing the line misses all three non-collinear points while minimizing total squared deviation, directly breaking LEAST-SQUARES-LINE-ASSUMED-TO-PASS-THROUGH-ALL-POINTS'),
  },
  {
    conceptId: QR_FACTORIZATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For A=[[1,1],[1,0],[0,1]] with QR factorization A=QR, is the below-diagonal entry R₂₁ approximately zero due to rounding, or exactly zero?',
    choices: [
      { text: 'Exactly zero, by construction — Gram-Schmidt’s i-th orthonormal vector qᵢ is built ONLY from a₁,…,aᵢ, never depending on later columns, so R₂₁ is never computed as a genuine projection coefficient at all', isCorrect: true },
      { text: 'Approximately zero due to rounding — R₂₁ is a genuine projection coefficient that happens to compute to a very small, near-zero value in this specific example', isCorrect: false, misconceptionId: `${QR_FACTORIZATION}:MC-1` },
      { text: "It depends on the specific numerical precision used in the computation, and could be nonzero for a different choice of A's columns", isCorrect: false, misconceptionId: `${QR_FACTORIZATION}:MC-1` },
    ],
    targetedMisconceptions: [`${QR_FACTORIZATION}:MC-1`],
    source: eb(QR_FACTORIZATION, 'Demonstration 1 — the full Q,R construction for A=[[1,1],[1,0],[0,1]], explicitly connecting each R entry to a Gram-Schmidt step and confirming the below-diagonal zero, directly breaking R-BELOW-DIAGONAL-ENTRIES-NOT-RECOGNIZED-AS-EXACTLY-ZERO-BY-CONSTRUCTION'),
  },
  {
    conceptId: QR_FACTORIZATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Given Rx=Qᵀb with R upper triangular, is general Gaussian elimination the most efficient way to solve for x, or is there a better approach?',
    choices: [
      { text: 'Back-substitution is more efficient — solve for the LAST unknown first, then substitute upward; general Gaussian elimination still produces a correct answer but wastes the triangular structure’s built-in efficiency', isCorrect: true },
      { text: 'General Gaussian elimination is required, since R being upper triangular does not by itself enable any more efficient solving method', isCorrect: false, misconceptionId: `${QR_FACTORIZATION}:MC-2` },
      { text: "Both methods are equally inefficient for an upper-triangular system, so the choice between them makes no practical difference", isCorrect: false, misconceptionId: `${QR_FACTORIZATION}:MC-2` },
    ],
    targetedMisconceptions: [`${QR_FACTORIZATION}:MC-2`],
    source: eb(QR_FACTORIZATION, 'Demonstration 3 — the back-substitution solve of Rx=Qᵀb, contrasted with unnecessary general Gaussian elimination, directly breaking GENERAL-ELIMINATION-USED-INSTEAD-OF-BACK-SUBSTITUTION-FOR-UPPER-TRIANGULAR-R'),
  },
  {
    conceptId: QR_FACTORIZATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'After constructing Q via Gram-Schmidt for a QR factorization, what property should QᵀQ satisfy to confirm Q was built correctly?',
    choices: [
      { text: 'QᵀQ=I — since Q’s columns are the orthonormalized vectors produced by Gram-Schmidt, verifying QᵀQ=I directly confirms the orthonormality of Q’s columns, exactly as required for a genuine QR factorization', isCorrect: true },
      { text: 'QᵀQ should equal R, since both Q and R are produced together by the same Gram-Schmidt process and are expected to coincide', isCorrect: false, misconceptionId: `${QR_FACTORIZATION}:MC-1` },
      { text: 'QᵀQ has no particular required value, since Q’s correctness can only be verified by checking that A=QR holds exactly', isCorrect: false, misconceptionId: `${QR_FACTORIZATION}:MC-1` },
    ],
    targetedMisconceptions: [`${QR_FACTORIZATION}:MC-1`],
    source: eb(QR_FACTORIZATION, 'Demonstration 2 — the direct QᵀQ=I verification for the constructed Q, confirming Gram-Schmidt produced genuinely orthonormal columns'),
  },
]
