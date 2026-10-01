/**
 * Batch: floating-point, interpolation, qr-algorithm (math.num) — OPENS
 * THE DOMAIN.
 *
 * Opens math.num (0/16 -> 3/16), the next domain per Phase 0's fresh
 * frontier computation after math.opt's completion (math.prob's remaining
 * 2 concepts confirmed genuinely blocked; math.num had the most immediate
 * readiness among clean-0 domains, 3/3 ready concepts). Fresh frontier
 * recompute found exactly these 3 concepts ready; all 3 selected since
 * none are deferred candidates and floating-point/interpolation each
 * unlock a further concept (error-analysis, splines respectively).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.num.
 * {floating-point,interpolation,qr-algorithm}.md.
 *
 * Grade band: all three adopt GradeBand.UNDERGRADUATE, establishing
 * math.num's domain baseline. floating-point's direct prerequisites
 * (math.arith.scientific-notation, math.arith.significant-figures) are
 * both GradeBand.MIDDLE — but the concept's own content (IEEE 754
 * bit-level structure, machine epsilon, catastrophic cancellation
 * analysis) is genuinely undergraduate numerical-analysis material; a
 * prerequisite being an early-introduced arithmetic-literacy skill never
 * means the concept REUSING it stays at that same grade level. qr-
 * algorithm requires math.linalg.qr-factorization and math.linalg.
 * eigenvalues, both UNDERGRADUATE. interpolation requires math.alg.
 * polynomial (HIGH) and math.linalg.linear-system (UNDERGRADUATE) — the
 * Vandermonde-system machinery from linear-system is central to
 * interpolation's own uniqueness argument, so UNDERGRADUATE is adopted
 * per the established convention (grade band follows the prerequisite
 * chain's actual content dependency, never a difficulty label or a
 * superficial prerequisite's own grade level alone). math.num (numerical
 * methods) is inherently undergraduate-level as a subject, so
 * UNDERGRADUATE is adopted as the whole domain's baseline from its very
 * first concepts, matching math.opt's own precedent.
 *
 *   FLOATING-POINT  Floating-point arithmetic is NEVER exact — every
 *           operation introduces rounding, and integer arithmetic's
 *           exactness never extends to it; adding a small number to a
 *           much larger one is NEVER safe by default — it can be
 *           completely absorbed below the precision threshold,
 *           contributing nothing to the result; subtracting two nearly
 *           equal, individually accurate values is NEVER automatically
 *           accurate — catastrophic cancellation can destroy most of the
 *           relative accuracy even when both operands were correct.
 *   INTERPOLATION  Each Lagrange basis term is NEVER an arbitrary-looking
 *           formula — it is a deliberately engineered indicator, exactly
 *           1 at its own node and 0 at every other; polynomial
 *           interpolation is NEVER a separate, unrelated technique from
 *           solving linear systems — it IS solving an
 *           $(n+1)\times(n+1)$ Vandermonde system in disguise; adding
 *           more equally-spaced interpolation points is NEVER guaranteed
 *           to improve the fit — Runge's phenomenon shows it can make
 *           the fit BETWEEN points strictly worse even while matching
 *           every sample point exactly.
 *   QR-ALGORITHM  The QR algorithm is NEVER the same thing as QR
 *           factorization — factorization is a one-shot decomposition,
 *           while the algorithm iterates it repeatedly, reversing the
 *           factors each time; individual $Q_k$ matrices from a single
 *           iteration step are NEVER the eigenvectors directly — only
 *           the FULLY accumulated product, after complete convergence,
 *           approximates the eigenvector (or Schur vector) basis; a
 *           shift $\sigma$ NEVER permanently changes the eigenvalues of
 *           the original matrix — it is subtracted purely to accelerate
 *           convergence, then added back exactly.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const FLOATING_POINT = 'math.num.floating-point'
const INTERPOLATION = 'math.num.interpolation'
const QR_ALGORITHM = 'math.num.qr-algorithm'

export const MATHEMATICS_NUM_FLOATING_POINT_INTERPOLATION_QR_ALGORITHM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FLOATING_POINT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'FLOATING-POINT ARITHMETIC IS NEVER EXACT — EVERY OPERATION INTRODUCES ROUNDING, AND '
      + "INTEGER ARITHMETIC'S EXACTNESS NEVER EXTENDS TO IT: computing 0.1 + 0.2 returns "
      + '0.30000000000000004, never exactly 0.3 — because 0.1 in binary repeats forever '
      + '(0.000110011001100...), so the STORED value is only the nearest representable double, '
      + 'never the exact decimal. Every floating-point operation introduces a relative error '
      + 'bounded by machine epsilon (roughly $2.2\\times10^{-16}$ for doubles) — usually tiny, but '
      + 'genuinely accumulating across many operations. Integer arithmetic being exact within '
      + 'range is never a property that carries over once the representation itself changes to '
      + 'floating-point.\n\n'
      + 'ADDING A SMALL NUMBER TO A MUCH LARGER ONE IS NEVER SAFE BY DEFAULT — IT CAN BE '
      + 'COMPLETELY ABSORBED BELOW THE PRECISION THRESHOLD, CONTRIBUTING NOTHING TO THE RESULT: '
      + 'for $x=10^{16}$, computing $x+1.0$ returns exactly $x$ in double precision, because 1.0 '
      + 'is far BELOW the precision threshold $u\\cdot x$ at that magnitude — the addend is '
      + 'completely absorbed, never registering in the stored result at all. Trusting that adding '
      + 'a small number to a large accumulator always shows up is never safe; compensated '
      + "summation (Kahan's algorithm) exists specifically to counter this absorption when summing "
      + 'many small values into a large running total.\n\n'
      + 'SUBTRACTING TWO NEARLY EQUAL, INDIVIDUALLY ACCURATE VALUES IS NEVER AUTOMATICALLY '
      + 'ACCURATE — CATASTROPHIC CANCELLATION CAN DESTROY MOST OF THE RELATIVE ACCURACY EVEN WHEN '
      + 'BOTH OPERANDS WERE CORRECT: for $f(x)=\\sqrt{x+1}-\\sqrt{x}$ at $x=10^{12}$, both square '
      + 'roots are computed to roughly 16 significant digits — but their DIFFERENCE retains only '
      + 'about 4 correct digits, losing roughly 12 digits of relative accuracy purely from the '
      + 'subtraction itself. The mathematically equivalent, numerically STABLE rewrite '
      + '$1/(\\sqrt{x+1}+\\sqrt{x})$ (via rationalizing the numerator) adds two large positive '
      + 'quantities instead — no cancellation at all, recovering 15+ correct digits. Two operands '
      + 'each being individually accurate is never a guarantee their difference is too.',
    targetedMisconceptions: [`${FLOATING_POINT}:MC-1`, `${FLOATING_POINT}:MC-2`, `${FLOATING_POINT}:MC-3`],
    source: eb(FLOATING_POINT, "Core Understanding — floating-point arithmetic never being exact since every operation introduces rounding and integer arithmetic's exactness never extends to it, adding a small number to a much larger one never being safe by default since it can be completely absorbed below the precision threshold, and subtracting two nearly equal individually accurate values never being automatically accurate since catastrophic cancellation can destroy most of the relative accuracy"),
  },
  {
    conceptId: INTERPOLATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'EACH LAGRANGE BASIS TERM IS NEVER AN ARBITRARY-LOOKING FORMULA — IT IS A DELIBERATELY '
      + 'ENGINEERED INDICATOR, EXACTLY 1 AT ITS OWN NODE AND 0 AT EVERY OTHER: for nodes '
      + '$x_0,\\ldots,x_n$, the basis term $\\ell_i(x)=\\prod_{j\\ne i}\\frac{x-x_j}{x_i-x_j}$ is '
      + 'built so that $\\ell_i(x_i)=1$ and $\\ell_i(x_k)=0$ for every $k\\ne i$, since the '
      + 'numerator contains the factor $(x-x_k)$, which vanishes exactly at $x_k$. Checking the '
      + 'interpolant at any one node confirms that ONLY that node\'s own basis term survives — the '
      + 'others contribute exactly zero, never a coincidence but a direct consequence of the '
      + 'construction.\n\n'
      + 'POLYNOMIAL INTERPOLATION IS NEVER A SEPARATE, UNRELATED TECHNIQUE FROM SOLVING LINEAR '
      + 'SYSTEMS — IT IS SOLVING AN $(n+1)\\times(n+1)$ VANDERMONDE SYSTEM IN DISGUISE: writing '
      + 'the interpolant in standard-form coefficients and demanding it pass through every data '
      + 'point produces exactly the Vandermonde linear system; solving it yields the IDENTICAL '
      + 'polynomial the Lagrange form finds directly, just expressed differently. Because the '
      + 'node $x$-values are distinct, this system\'s matrix is genuinely invertible, which is '
      + 'exactly why the interpolating polynomial of degree $\\le n$ is UNIQUE — never merely "a" '
      + 'solution among several, and never a fact independent of the underlying linear system\'s '
      + 'own invertibility.\n\n'
      + 'ADDING MORE EQUALLY-SPACED INTERPOLATION POINTS IS NEVER GUARANTEED TO IMPROVE THE FIT '
      + '— RUNGE\'S PHENOMENON SHOWS IT CAN MAKE THE FIT BETWEEN POINTS STRICTLY WORSE EVEN WHILE '
      + 'MATCHING EVERY SAMPLE POINT EXACTLY: interpolating a smooth function at 5 equally-spaced '
      + 'points gives a reasonable fit, but interpolating the SAME function at 15 equally-spaced '
      + 'points produces WILD oscillations near the interval\'s edges — overshooting far beyond '
      + "the true function's range — even though the higher-degree polynomial passes through all "
      + '15 points EXACTLY. Matching every sample point exactly is never the same claim as '
      + 'tracking the true function well BETWEEN the points; more matched data can genuinely make '
      + 'the gap between points worse, never automatically better.',
    targetedMisconceptions: [`${INTERPOLATION}:MC-1`, `${INTERPOLATION}:MC-2`, `${INTERPOLATION}:MC-3`],
    source: eb(INTERPOLATION, "Core Understanding — each Lagrange basis term never being an arbitrary-looking formula since it is a deliberately engineered indicator exactly 1 at its own node and 0 at every other, polynomial interpolation never being a separate unrelated technique from solving linear systems since it is solving a Vandermonde system in disguise, and adding more equally-spaced interpolation points never being guaranteed to improve the fit since Runge's phenomenon shows it can make the fit between points strictly worse"),
  },
  {
    conceptId: QR_ALGORITHM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE QR ALGORITHM IS NEVER THE SAME THING AS QR FACTORIZATION — FACTORIZATION IS A '
      + 'ONE-SHOT DECOMPOSITION, WHILE THE ALGORITHM ITERATES IT REPEATEDLY, REVERSING THE '
      + "FACTORS EACH TIME: QR factorization finds Q and R such that A=QR ONCE. The QR ALGORITHM "
      + 'instead factors $A_{k-1}=Q_kR_k$, then REVERSES the factors to form $A_k=R_kQ_k$, '
      + 'repeated many times. The diagonal of $R$ from a single one-shot factorization is NEVER '
      + 'the eigenvalues (it depends on the specific Gram-Schmidt normalization used) — only after '
      + 'the QR ALGORITHM fully converges does the diagonal of the reassembled matrix $A_k$ '
      + "contain the eigenvalues. Confusing the factorization's own one-time output with the "
      + "algorithm's converged result is never valid — they answer genuinely different questions.\n\n"
      + 'INDIVIDUAL $Q_k$ MATRICES FROM A SINGLE ITERATION STEP ARE NEVER THE EIGENVECTORS '
      + 'DIRECTLY — ONLY THE FULLY ACCUMULATED PRODUCT, AFTER COMPLETE CONVERGENCE, APPROXIMATES '
      + 'THE EIGENVECTOR (OR SCHUR VECTOR) BASIS: each step $A_k=Q_k^TA_{k-1}Q_k$ is an orthogonal '
      + 'SIMILARITY transformation, so every $A_k$ shares the SAME eigenvalues as the original '
      + 'matrix — but each individual $Q_k$ depends only on the current, partially-converged '
      + 'iterate, never on the original matrix directly. Only the ACCUMULATED product '
      + '$Z_k=Q_1Q_2\\cdots Q_k$, after full convergence, converges to the Schur vectors — equal '
      + 'to the eigenvectors for a symmetric matrix, but merely a triangularizing basis (never the '
      + 'eigenvectors themselves without further work) for a non-symmetric one.\n\n'
      + 'A SHIFT $\\sigma$ NEVER PERMANENTLY CHANGES THE EIGENVALUES OF THE ORIGINAL MATRIX — IT '
      + 'IS SUBTRACTED PURELY TO ACCELERATE CONVERGENCE, THEN ADDED BACK EXACTLY: shifted QR '
      + 'replaces the matrix with $A-\\sigma I$ at each step, iterates, then adds $\\sigma I$ back '
      + 'at the end. The eigenvalues of $A-\\sigma I$ are each shifted by $-\\sigma$; adding '
      + '$\\sigma I$ back restores them to their ORIGINAL values exactly. Believing the shift '
      + 'permanently alters the eigenvalues of the original problem is never correct — the shift '
      + 'exists purely to accelerate convergence toward the eigenvalue nearest $\\sigma$, never to '
      + 'relocate the eigenvalues themselves.',
    targetedMisconceptions: [`${QR_ALGORITHM}:MC-1`, `${QR_ALGORITHM}:MC-2`, `${QR_ALGORITHM}:MC-3`],
    source: eb(QR_ALGORITHM, 'Core Understanding — the QR algorithm never being the same thing as QR factorization since factorization is a one-shot decomposition while the algorithm iterates it repeatedly, individual Q_k matrices from a single step never being the eigenvectors directly since only the fully accumulated product after complete convergence approximates the eigenvector basis, and a shift never permanently changing the eigenvalues of the original matrix since it is subtracted purely to accelerate convergence then added back exactly'),
  },
]

export const MATHEMATICS_NUM_FLOATING_POINT_INTERPOLATION_QR_ALGORITHM_PROBES: SeedProbe[] = [
  {
    conceptId: FLOATING_POINT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is a floating-point computation ever exact, the way integer arithmetic is?',
    choices: [
      { text: 'No — computing 0.1 + 0.2 returns 0.30000000000000004, never exactly 0.3, because 0.1 is a repeating binary fraction and only the nearest representable double is ever stored', isCorrect: true },
      { text: 'Yes — floating-point arithmetic is just as exact as integer arithmetic for any value that fits within range', isCorrect: false, misconceptionId: `${FLOATING_POINT}:MC-1` },
      { text: "Yes, since computers represent all numbers with the same underlying exactness regardless of type", isCorrect: false, misconceptionId: `${FLOATING_POINT}:MC-1` },
    ],
    targetedMisconceptions: [`${FLOATING_POINT}:MC-1`],
    source: eb(FLOATING_POINT, 'Discovery Question 1 as a detection probe (verbatim) — whether floating-point computation is ever exact like integer arithmetic, an answer of "yes" confirming FLOATING-POINT-IS-EXACT'),
  },
  {
    conceptId: FLOATING_POINT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is it always safe to add a very small number to a very large one?',
    choices: [
      { text: 'No — for x=10^16, computing x+1.0 returns exactly x in double precision, since 1.0 falls below the precision threshold at that magnitude and is completely absorbed, contributing nothing to the stored result', isCorrect: true },
      { text: 'Yes — adding any small number to a large one always registers correctly in the final floating-point result', isCorrect: false, misconceptionId: `${FLOATING_POINT}:MC-2` },
      { text: "Yes, since the error bound on any single operation is always negligibly small", isCorrect: false, misconceptionId: `${FLOATING_POINT}:MC-2` },
    ],
    targetedMisconceptions: [`${FLOATING_POINT}:MC-2`],
    source: eb(FLOATING_POINT, 'Discovery Question 2 as a detection probe (verbatim) — whether it is always safe to add a small number to a large one, an answer of "yes" confirming ADDING-SMALL-TO-LARGE-IS-SAFE'),
  },
  {
    conceptId: FLOATING_POINT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If both operands of a subtraction are individually accurate, is the difference automatically accurate too?',
    choices: [
      { text: 'No — for f(x)=√(x+1)-√x at x=10^12, both square roots are individually accurate to ~16 digits, but their difference retains only ~4 correct digits; catastrophic cancellation can destroy most of the relative accuracy', isCorrect: true },
      { text: 'Yes — if both numbers being subtracted are individually accurate, their difference must also be accurate', isCorrect: false, misconceptionId: `${FLOATING_POINT}:MC-3` },
      { text: "Yes, since accuracy is preserved under subtraction the same way it is under addition", isCorrect: false, misconceptionId: `${FLOATING_POINT}:MC-3` },
    ],
    targetedMisconceptions: [`${FLOATING_POINT}:MC-3`],
    source: eb(FLOATING_POINT, 'Discovery Question 3 as a detection probe (verbatim) — whether accurate operands guarantee an accurate difference, an answer of "yes" confirming CANCELLATION-IS-ACCURATE'),
  },
  {
    conceptId: INTERPOLATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the Lagrange formula an arbitrary-looking expression, or is there a clear reason it passes through every data point?',
    choices: [
      { text: 'There is a clear reason — each basis term is engineered so it equals 1 at its own node and 0 at every other node, so evaluating the interpolant at any node leaves only that node\'s own term contributing', isCorrect: true },
      { text: 'It is an arbitrary-looking expression with no clear structural reason it passes through the data points', isCorrect: false, misconceptionId: `${INTERPOLATION}:MC-1` },
      { text: "The formula passes through the points by coincidence, without any deliberate engineering behind its structure", isCorrect: false, misconceptionId: `${INTERPOLATION}:MC-1` },
    ],
    targetedMisconceptions: [`${INTERPOLATION}:MC-1`],
    source: eb(INTERPOLATION, 'Discovery Question 1 as a detection probe (verbatim) — whether the Lagrange formula is arbitrary, an answer treating it as arbitrary confirming LAGRANGE-FORM-ASSUMED-ARBITRARY'),
  },
  {
    conceptId: INTERPOLATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is polynomial interpolation a completely separate technique from solving linear systems?',
    choices: [
      { text: 'No — writing the interpolant in standard-form coefficients and demanding it pass through every data point produces exactly the Vandermonde linear system; solving it gives the identical polynomial the Lagrange form finds directly', isCorrect: true },
      { text: 'Yes — polynomial interpolation and solving linear systems are entirely separate, unrelated mathematical techniques', isCorrect: false, misconceptionId: `${INTERPOLATION}:MC-2` },
      { text: "Yes, since the Lagrange form avoids linear systems entirely by construction", isCorrect: false, misconceptionId: `${INTERPOLATION}:MC-2` },
    ],
    targetedMisconceptions: [`${INTERPOLATION}:MC-2`],
    source: eb(INTERPOLATION, 'Discovery Question 2 as a detection probe (verbatim) — whether interpolation is unrelated to linear systems, an answer of "yes" confirming INTERPOLATION-ASSUMED-UNRELATED-TO-LINEAR-SYSTEMS'),
  },
  {
    conceptId: INTERPOLATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does adding more equally-spaced interpolation points always produce a more accurate fit to the underlying function?',
    choices: [
      { text: 'No — Runge\'s phenomenon shows that interpolating at more equally-spaced points can produce wild oscillations near the edges, overshooting far beyond the true function\'s range, even though the polynomial passes through every sample point exactly', isCorrect: true },
      { text: 'Yes — adding more equally-spaced interpolation points always improves the accuracy of the fit everywhere', isCorrect: false, misconceptionId: `${INTERPOLATION}:MC-3` },
      { text: "Yes, since matching more data points exactly guarantees the fit between points also improves", isCorrect: false, misconceptionId: `${INTERPOLATION}:MC-3` },
    ],
    targetedMisconceptions: [`${INTERPOLATION}:MC-3`],
    source: eb(INTERPOLATION, 'Discovery Question 3 as a detection probe (verbatim) — whether more equally-spaced points always improve the fit, an answer of "yes" confirming MORE-POINTS-ASSUMED-TO-ALWAYS-IMPROVE-FIT'),
  },
  {
    conceptId: QR_ALGORITHM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the QR algorithm the same thing as computing A=QR once, or does it repeat that factorization many times?',
    choices: [
      { text: 'It repeats the factorization many times — QR factorization solves A=QR once, while the QR algorithm factors, reverses the factors to form a new matrix, and repeats this dozens of times to converge toward the eigenvalues', isCorrect: true },
      { text: 'They are the same thing — the QR algorithm is just another name for computing the one-shot QR factorization', isCorrect: false, misconceptionId: `${QR_ALGORITHM}:MC-1` },
      { text: "The QR algorithm and QR factorization are interchangeable terms for the identical single-step procedure", isCorrect: false, misconceptionId: `${QR_ALGORITHM}:MC-1` },
    ],
    targetedMisconceptions: [`${QR_ALGORITHM}:MC-1`],
    source: eb(QR_ALGORITHM, 'Discovery Question 1 as a detection probe (verbatim) — whether the QR algorithm is the same as one-shot QR factorization, an answer of "same" confirming QR-ALGORITHM-IS-QR-FACTORIZATION'),
  },
  {
    conceptId: QR_ALGORITHM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Are the individual Q_k matrices from each QR step the eigenvectors of A?',
    choices: [
      { text: 'No — each individual Q_k depends only on the current, partially-converged iterate, never the original matrix directly; only the fully accumulated product of every Q_k, after complete convergence, approximates the eigenvector (or Schur vector) basis', isCorrect: true },
      { text: 'Yes — each Q_k produced at every step of the QR algorithm directly gives the eigenvector matrix of A', isCorrect: false, misconceptionId: `${QR_ALGORITHM}:MC-2` },
      { text: "Yes, since Q always represents the eigenvector matrix whenever it appears in any QR-related computation", isCorrect: false, misconceptionId: `${QR_ALGORITHM}:MC-2` },
    ],
    targetedMisconceptions: [`${QR_ALGORITHM}:MC-2`],
    source: eb(QR_ALGORITHM, 'Discovery Question 2 as a detection probe (verbatim) — whether individual Q_k matrices are the eigenvectors, an answer of "yes" confirming QR-GIVES-EIGENVECTORS-DIRECTLY'),
  },
  {
    conceptId: QR_ALGORITHM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Does subtracting σI before iterating permanently change A's eigenvalues?",
    choices: [
      { text: 'No — the shift is subtracted purely to accelerate convergence toward the eigenvalue nearest σ, then added back exactly at the end, restoring the original eigenvalues precisely', isCorrect: true },
      { text: 'Yes — subtracting a shift σI before iterating permanently relocates the eigenvalues of the original matrix', isCorrect: false, misconceptionId: `${QR_ALGORITHM}:MC-3` },
      { text: "Yes, since any modification to the matrix necessarily changes its eigenvalues permanently", isCorrect: false, misconceptionId: `${QR_ALGORITHM}:MC-3` },
    ],
    targetedMisconceptions: [`${QR_ALGORITHM}:MC-3`],
    source: eb(QR_ALGORITHM, 'Discovery Question 3 as a detection probe (verbatim) — whether a shift permanently changes the eigenvalues, an answer of "yes" confirming SHIFTS-CHANGE-THE-EIGENVALUES'),
  },
]
