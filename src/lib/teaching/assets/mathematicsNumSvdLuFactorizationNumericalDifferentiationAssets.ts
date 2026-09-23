/**
 * Batch: svd, lu-factorization, numerical-differentiation (math.num).
 *
 * Fresh Phase 0 frontier recompute after the error-analysis/numerical-
 * integration/splines batch found 4 concepts ready (iterative-linear,
 * lu-factorization, numerical-differentiation, svd); this batch selects
 * svd (which unlocks nothing further but was the oldest-ready concept,
 * carried over from the domain-opening batch), lu-factorization, and
 * numerical-differentiation, leaving iterative-linear for the next batch.
 * lu-factorization and numerical-differentiation both require
 * math.num.error-analysis (now authored); svd requires math.linalg.svd
 * (already certified) and math.num.qr-algorithm (now authored).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.num.
 * {svd,lu-factorization,numerical-differentiation}.md.
 *
 * Grade band: all three adopt GradeBand.UNDERGRADUATE, continuing math.num's
 * established domain baseline.
 *
 *   SVD  SVD is NEVER the same as eigendecomposition except for symmetric
 *           PSD matrices — singular values are always non-negative while
 *           eigenvalues can be negative or complex; truncated SVD is the
 *           PROVABLY OPTIMAL rank-k approximation (Eckart-Young), NEVER a
 *           heuristic loss of "random" information; and numerical rank
 *           NEVER counts exactly-zero singular values in floating-point —
 *           it always requires a threshold, since roundoff never produces
 *           an exact zero for a genuinely rank-deficient matrix.
 *   LU-FACTORIZATION  Forward substitution NEVER comes after back
 *           substitution — the triangular structure forces solving $Ly=b$
 *           top-down first, since $Ux=y$ needs $y$ already known; pivoting
 *           is NEVER optional — a near-zero pivot causes a catastrophic,
 *           error-amplifying multiplier even when the matrix is perfectly
 *           invertible; and solving via LU is NEVER equivalent in cost or
 *           stability to explicitly computing $A^{-1}$ — LU plus
 *           substitution is both faster and more numerically stable.
 *   NUMERICAL-DIFFERENTIATION  Smaller step size $h$ is NEVER always
 *           better — truncation error shrinks as $h\to0$ but roundoff
 *           error grows, producing a genuine U-shaped total-error curve
 *           with an optimal $h^*$; forward and central difference NEVER
 *           share the same accuracy order — central difference is a
 *           genuinely higher $O(h^2)$ order, never merely "the other
 *           formula"; and Richardson extrapolation eliminates the leading
 *           error term algebraically, NEVER requiring a fundamentally new
 *           derivation.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const SVD = 'math.num.svd'
const LU_FACTORIZATION = 'math.num.lu-factorization'
const NUMERICAL_DIFFERENTIATION = 'math.num.numerical-differentiation'

export const MATHEMATICS_NUM_SVD_LU_FACTORIZATION_NUMERICAL_DIFFERENTIATION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SVD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'SVD IS NEVER THE SAME AS EIGENDECOMPOSITION — EXCEPT FOR SYMMETRIC PSD MATRICES: for '
      + 'A=[[1,2],[3,4]], the eigenvalues are approximately 5.37 and -0.37, but the singular '
      + 'values are $\\sigma_1\\approx5.46$ and $\\sigma_2\\approx0.37$ — genuinely different '
      + 'numbers. Eigenvalues can be negative or complex; singular values are always '
      + 'non-negative. For a non-symmetric matrix, SVD\'s $U$ and $V$ are two DIFFERENT '
      + 'orthogonal matrices, while eigendecomposition\'s $P$ is generally not even orthogonal. '
      + 'Believing singular values equal eigenvalues and $U,V$ are eigenvector matrices is never '
      + 'correct — only for symmetric positive semidefinite matrices does eigendecomposition '
      + 'coincide with SVD, and that is a special case, never the general rule.\n\n'
      + 'TRUNCATED SVD IS THE PROVABLY OPTIMAL RANK-K APPROXIMATION — NEVER A HEURISTIC LOSS: the '
      + 'Eckart-Young theorem states that among ALL rank-$k$ matrices $C$, the truncated SVD '
      + '$A_k=U_k\\Sigma_kV_k^T$ minimizes $\\|A-C\\|_2$, with $\\|A-A_k\\|_2=\\sigma_{k+1}$ — a '
      + 'mathematical optimality guarantee, never a coincidental approximation. Believing $A_k$ '
      + 'loses "random" information misses that it discards exactly the LEAST important rank-1 '
      + 'components (those with the smallest singular values); no other rank-$k$ matrix can be '
      + 'closer to $A$.\n\n'
      + 'NUMERICAL RANK REQUIRES A THRESHOLD — NEVER COUNTING EXACTLY-ZERO SINGULAR VALUES: for '
      + 'the exact-rank-1 matrix $[[1,2,3],[2,4,6],[3,6,9]]$, a floating-point SVD gives '
      + '$\\sigma_1\\approx12.85$ but $\\sigma_2,\\sigma_3$ only around $(10^{-16})$ — not exactly '
      + 'zero, but tiny (roundoff-sized). Using a count of exactly-zero values to determine rank '
      + 'in floating-point code is never correct — every computed singular value carries roundoff '
      + 'of magnitude roughly $u\\|A\\|_2$; the numerical rank is the count of '
      + '$\\sigma_i>\\varepsilon\\cdot\\|A\\|_2$ for a chosen tolerance, never a bare check for '
      + 'positivity, which always returns the full dimension in floating point.',
    targetedMisconceptions: [`${SVD}:MC-1`, `${SVD}:MC-2`, `${SVD}:MC-3`],
    source: eb(SVD, 'Core Understanding — SVD never being the same as eigendecomposition except for symmetric PSD matrices, truncated SVD being the provably optimal rank-k approximation via Eckart-Young never a heuristic loss, and numerical rank requiring a threshold never counting exactly-zero singular values in floating-point'),
  },
  {
    conceptId: LU_FACTORIZATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'FORWARD SUBSTITUTION MUST COME BEFORE BACK SUBSTITUTION — NEVER THE REVERSE: since $L$ is '
      + 'lower triangular, its first row has only one unknown, enabling solving top-down — '
      + 'forward substitution, solving $Ly=b$. Since $U$ is upper triangular, its last row has '
      + 'only one unknown, enabling solving bottom-up — back substitution, solving $Ux=y$. '
      + 'Attempting to solve $Ux=y$ before $Ly=b$ is never valid — $y$ is not yet known, and '
      + '$Ly=b$ must be solved first since it is what defines $y$; the order is mathematically '
      + 'forced by the structure, never arbitrary.\n\n'
      + 'PIVOTING IS NEVER OPTIONAL — A NEAR-ZERO PIVOT CAUSES CATASTROPHIC CANCELLATION: for '
      + '$A=[[10^{-8},1],[1,1]]$ without pivoting, the multiplier $m_{21}=1/10^{-8}=10^8$ is '
      + 'enormous, and the resulting $U_{22}$ is corrupted by that huge multiplier amplifying any '
      + 'rounding error in row 1, leaving the computed solution with only about 8 correct digits '
      + 'instead of 15. With partial pivoting (swapping rows so the largest entry becomes the '
      + 'pivot), the multiplier shrinks to $(10^{-8})$ and full 15-digit accuracy is recovered. '
      + 'Believing Gaussian elimination without pivoting is always correct as long as the matrix '
      + 'is invertible misses that a near-zero pivot does not make the matrix singular — it just '
      + 'causes a large multiplier that amplifies rounding error catastrophically.\n\n'
      + 'SOLVING VIA LU IS NEVER EQUIVALENT IN COST OR STABILITY TO COMPUTING THE INVERSE '
      + 'EXPLICITLY: computing $A^{-1}$ explicitly costs roughly three times as many floating-'
      + 'point operations as LU factorization plus one forward/back substitution — for $n=1000$, '
      + 'direct solving is roughly 3x faster. The inverse\'s own computation errors also get '
      + 'magnified during the subsequent matrix-vector multiply, while direct solving has better '
      + 'backward-error guarantees. Solving $Ax=b$ by first computing $A^{-1}$ and then '
      + 'multiplying is never necessary and never as numerically stable as using LU directly.',
    targetedMisconceptions: [`${LU_FACTORIZATION}:MC-1`, `${LU_FACTORIZATION}:MC-2`, `${LU_FACTORIZATION}:MC-3`],
    source: eb(LU_FACTORIZATION, 'Core Understanding — forward substitution never coming after back substitution since the triangular structure forces the order, pivoting never being optional since a near-zero pivot causes catastrophic cancellation, and solving via LU never being equivalent in cost or stability to computing the inverse explicitly'),
  },
  {
    conceptId: NUMERICAL_DIFFERENTIATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'SMALLER STEP SIZE H IS NEVER ALWAYS BETTER — ROUNDOFF ERROR GROWS AS H SHRINKS: computing '
      + 'the forward-difference quotient for sin at $h=10^{-8}$ gives error around $(10^{-8})$ '
      + '(near optimal), but at $h=10^{-15}$, $f(1+h)$ and $f(1)$ become indistinguishable in '
      + 'double precision — the difference quotient degrades toward 0, not the true derivative. '
      + 'Believing smaller $h$ always reduces error, without realizing roundoff eventually '
      + 'dominates, misses the finite-precision floor the calculus limit definition never '
      + 'mentions — the total error curve is U-shaped: decreasing while truncation dominates, '
      + 'then increasing once roundoff dominates, as $h\\to0$.\n\n'
      + 'FORWARD AND CENTRAL DIFFERENCE HAVE GENUINELY DIFFERENT ACCURACY ORDERS — NEVER THE '
      + 'SAME: from Taylor expansion, forward difference has truncation error $O(h)$ — doubling '
      + '$h$ doubles the error. Central difference (subtracting the Taylor expansions of '
      + '$f(x+h)$ and $f(x-h)$) has truncation error $O(h^2)$ — halving $h$ quarters the error. '
      + 'At $h=0.01$ for sin at $x=1$: the central difference is roughly 750x more accurate than '
      + 'forward difference at the SAME step size, at the cost of one extra function evaluation. '
      + 'Assuming both formulas share the same accuracy since both approximate the same '
      + 'derivative misses this genuine order-of-accuracy distinction, visible only from the '
      + 'Taylor expansion.\n\n'
      + 'RICHARDSON EXTRAPOLATION ELIMINATES THE LEADING ERROR TERM — GAINING TWO ORDERS FOR '
      + 'FREE: if the central-difference approximation $D(h)$ equals the true derivative plus a '
      + 'leading $ch^2$ error term plus higher-order terms, then combining $D(h)$ and $D(h/2)$ '
      + 'algebraically to eliminate that $ch^2$ term produces a 4th-order-accurate formula, at '
      + 'the cost of two extra function evaluations, never requiring a fundamentally new method '
      + 'or a from-scratch derivation.',
    targetedMisconceptions: [`${NUMERICAL_DIFFERENTIATION}:MC-1`, `${NUMERICAL_DIFFERENTIATION}:MC-2`, `${NUMERICAL_DIFFERENTIATION}:MC-3`],
    source: eb(NUMERICAL_DIFFERENTIATION, 'Core Understanding — smaller step size h never being always better since roundoff error grows as h shrinks producing a U-shaped total-error curve, forward and central difference never sharing the same accuracy order, and Richardson extrapolation eliminating the leading error term never requiring a fundamentally new method'),
  },
]

export const MATHEMATICS_NUM_SVD_LU_FACTORIZATION_NUMERICAL_DIFFERENTIATION_PROBES: SeedProbe[] = [
  {
    conceptId: SVD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Are the singular values of a matrix the same as its eigenvalues?',
    choices: [
      { text: 'No, in general — for A=[[1,2],[3,4]], the eigenvalues (~5.37, -0.37) genuinely differ from the singular values (~5.46, 0.37); singular values are always non-negative while eigenvalues can be negative or complex. They coincide only for symmetric positive semidefinite matrices', isCorrect: true },
      { text: 'Yes — the singular values of any matrix are always equal to its eigenvalues, and U, V are always the eigenvector matrices', isCorrect: false, misconceptionId: `${SVD}:MC-1` },
      { text: "Yes, since both SVD and eigendecomposition produce a diagonal matrix of special values from the same matrix", isCorrect: false, misconceptionId: `${SVD}:MC-1` },
    ],
    targetedMisconceptions: [`${SVD}:MC-1`],
    source: eb(SVD, 'Discovery Question 1 as a detection probe (verbatim) — whether singular values equal eigenvalues, an answer of "yes" confirming SVD-AND-EIGENDECOMPOSITION-ARE-THE-SAME'),
  },
  {
    conceptId: SVD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does truncating the SVD to rank k lose random information, or does it provably discard the least important part?',
    choices: [
      { text: 'It provably discards the least important part — the Eckart-Young theorem proves the truncated SVD Ak minimizes the approximation error among ALL rank-k matrices, so no other rank-k matrix can be closer to A', isCorrect: true },
      { text: 'It loses random, unpredictable information — truncating the SVD to a lower rank is essentially a heuristic guess about what to discard', isCorrect: false, misconceptionId: `${SVD}:MC-2` },
      { text: "It discards information arbitrarily, with no mathematical guarantee about which components matter most", isCorrect: false, misconceptionId: `${SVD}:MC-2` },
    ],
    targetedMisconceptions: [`${SVD}:MC-2`],
    source: eb(SVD, 'Discovery Question 2 as a detection probe (verbatim) — whether truncated SVD loses random information, an answer of "random loss" confirming TRUNCATED-SVD-DISCARDS-INFORMATION'),
  },
  {
    conceptId: SVD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'In floating-point, does a rank-deficient matrix give exactly-zero singular values?',
    choices: [
      { text: 'No — for the exact-rank-1 matrix [[1,2,3],[2,4,6],[3,6,9]], floating-point SVD gives σ2 and σ3 around 10^-16, tiny but not exactly zero; numerical rank requires counting values above a chosen threshold, never a bare check for exact zero', isCorrect: true },
      { text: 'Yes — a genuinely rank-deficient matrix always produces exactly-zero singular values in floating-point computation', isCorrect: false, misconceptionId: `${SVD}:MC-3` },
      { text: "Yes, since floating-point arithmetic represents zero exactly whenever the true mathematical value is zero", isCorrect: false, misconceptionId: `${SVD}:MC-3` },
    ],
    targetedMisconceptions: [`${SVD}:MC-3`],
    source: eb(SVD, 'Discovery Question 3 as a detection probe (verbatim) — whether floating-point gives exactly-zero singular values for a rank-deficient matrix, an answer of "yes" confirming NUMERICAL-RANK-IS-EXACT-RANK'),
  },
  {
    conceptId: LU_FACTORIZATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Do you solve Ly=b first, or Ux=y first — and why does the order matter?',
    choices: [
      { text: 'Ly=b first — L is lower triangular so forward substitution solves it top-down; Ux=y needs y, which is only defined once Ly=b is solved, so the triangular structure mathematically forces this order', isCorrect: true },
      { text: 'Ux=y first — the order of solving the two triangular systems does not matter as long as both equations are eventually satisfied', isCorrect: false, misconceptionId: `${LU_FACTORIZATION}:MC-3` },
      { text: "Either order works equally well, since forward and backward substitution are just two names for the same operation", isCorrect: false, misconceptionId: `${LU_FACTORIZATION}:MC-3` },
    ],
    targetedMisconceptions: [`${LU_FACTORIZATION}:MC-3`],
    source: eb(LU_FACTORIZATION, 'Discovery Question 1 as a detection probe (verbatim) — whether Ly=b or Ux=y is solved first, an answer treating the order as unimportant confirming FORWARD-BACK-ORDER-DOESNT-MATTER'),
  },
  {
    conceptId: LU_FACTORIZATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does a near-zero pivot make the matrix singular, or just numerically dangerous to divide by?',
    choices: [
      { text: 'Just numerically dangerous — for A=[[10^-8,1],[1,1]], the matrix is perfectly invertible, but without pivoting the multiplier 1/10^-8 amplifies rounding error catastrophically; partial pivoting fixes this without changing the underlying solution', isCorrect: true },
      { text: 'It makes the matrix singular — a near-zero pivot means the matrix cannot actually be inverted, regardless of pivoting', isCorrect: false, misconceptionId: `${LU_FACTORIZATION}:MC-2` },
      { text: "Neither — a near-zero pivot has no effect on the accuracy or validity of Gaussian elimination", isCorrect: false, misconceptionId: `${LU_FACTORIZATION}:MC-2` },
    ],
    targetedMisconceptions: [`${LU_FACTORIZATION}:MC-2`],
    source: eb(LU_FACTORIZATION, 'Discovery Question 2 as a detection probe (verbatim) — whether a near-zero pivot makes the matrix singular or just numerically dangerous, an answer of "singular" confirming PIVOTING-IS-OPTIONAL'),
  },
  {
    conceptId: LU_FACTORIZATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is computing A⁻¹ explicitly ever cheaper or more stable than solving Ax=b directly via LU?',
    choices: [
      { text: 'No — explicitly forming A⁻¹ costs roughly three times as many operations as LU plus substitution, and the inverse\'s own errors get magnified during the subsequent multiply, while direct LU solving has better backward-error guarantees', isCorrect: true },
      { text: 'Yes — computing the inverse explicitly and then multiplying by b is always at least as fast and as numerically stable as using LU factorization directly', isCorrect: false, misconceptionId: `${LU_FACTORIZATION}:MC-1` },
      { text: "Yes, since forming A⁻¹ once allows solving for any b with no additional numerical cost or risk", isCorrect: false, misconceptionId: `${LU_FACTORIZATION}:MC-1` },
    ],
    targetedMisconceptions: [`${LU_FACTORIZATION}:MC-1`],
    source: eb(LU_FACTORIZATION, 'Discovery Question 3 as a detection probe (verbatim) — whether computing the inverse explicitly is ever cheaper or more stable than LU, an answer of "yes" confirming LU-SAME-AS-INVERSE'),
  },
  {
    conceptId: NUMERICAL_DIFFERENTIATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If you keep shrinking h toward machine epsilon, does the error in a numerical derivative keep shrinking too?',
    choices: [
      { text: 'No — truncation error shrinks as h decreases, but roundoff error grows since f(x+h) and f(x) become indistinguishable in floating-point; the total error curve is U-shaped, with an optimal h* rather than ever-decreasing error', isCorrect: true },
      { text: 'Yes — decreasing h always continues to reduce the total error in a numerical derivative, without limit', isCorrect: false, misconceptionId: `${NUMERICAL_DIFFERENTIATION}:MC-1` },
      { text: "Yes, since the calculus limit definition guarantees convergence to the exact derivative as h approaches zero, even in floating-point", isCorrect: false, misconceptionId: `${NUMERICAL_DIFFERENTIATION}:MC-1` },
    ],
    targetedMisconceptions: [`${NUMERICAL_DIFFERENTIATION}:MC-1`],
    source: eb(NUMERICAL_DIFFERENTIATION, 'Discovery Question 1 as a detection probe (verbatim) — whether the error keeps shrinking as h approaches machine epsilon, an answer of "yes" confirming SMALLER-H-ALWAYS-BETTER'),
  },
  {
    conceptId: NUMERICAL_DIFFERENTIATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Do forward and central difference formulas have the same order of accuracy?',
    choices: [
      { text: 'No — forward difference has truncation error O(h), while central difference has O(h²); at h=0.01 for sin at x=1, central difference is roughly 750x more accurate at the same step size, at the cost of one extra evaluation', isCorrect: true },
      { text: 'Yes — forward and central difference share exactly the same order of accuracy since both approximate the same derivative from function values', isCorrect: false, misconceptionId: `${NUMERICAL_DIFFERENTIATION}:MC-2` },
      { text: "Yes, since both are called finite-difference approximations and use the same step size h", isCorrect: false, misconceptionId: `${NUMERICAL_DIFFERENTIATION}:MC-2` },
    ],
    targetedMisconceptions: [`${NUMERICAL_DIFFERENTIATION}:MC-2`],
    source: eb(NUMERICAL_DIFFERENTIATION, 'Discovery Question 2 as a detection probe (verbatim) — whether forward and central difference share the same accuracy order, an answer of "yes" confirming FORWARD-AND-CENTRAL-DIFFERENCE-SAME-ACCURACY'),
  },
  {
    conceptId: NUMERICAL_DIFFERENTIATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Can you combine two central-difference approximations at different step sizes to get a higher-order result without deriving a new formula from scratch?',
    choices: [
      { text: 'Yes — Richardson extrapolation algebraically combines D(h) and D(h/2) to cancel the leading O(h²) error term, producing an O(h⁴) formula at the cost of two extra evaluations, never requiring a new derivation', isCorrect: true },
      { text: 'No — achieving a higher order of accuracy always requires deriving a completely new finite-difference formula from a fresh Taylor expansion', isCorrect: false, misconceptionId: `${NUMERICAL_DIFFERENTIATION}:MC-3` },
      { text: "No, since combining two approximations at different step sizes can only average their errors, never cancel the leading term", isCorrect: false, misconceptionId: `${NUMERICAL_DIFFERENTIATION}:MC-3` },
    ],
    targetedMisconceptions: [`${NUMERICAL_DIFFERENTIATION}:MC-3`],
    source: eb(NUMERICAL_DIFFERENTIATION, 'Discovery Question 3 as a detection probe (verbatim) — whether Richardson extrapolation can boost accuracy without a new derivation, an answer of "no" confirming NUMERICAL-DERIVATIVE-CONVERGES-TO-EXACT-style resistance to the free-upgrade insight'),
  },
]
