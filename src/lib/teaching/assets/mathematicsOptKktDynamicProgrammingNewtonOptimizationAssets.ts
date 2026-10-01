/**
 * Batch: kkt, dynamic-programming, newton-optimization (math.opt).
 *
 * Continues math.opt (9/16 -> 12/16). kkt closes the duality/lagrange-
 * multipliers chain (its own EB entry directly extends both). dynamic-
 * programming is finally picked up after being deferred across three prior
 * batches as a disconnected expert-level topic — it remains disconnected
 * (no unlocks) but closing it now removes a standing gap. newton-
 * optimization closes the gradient-methods branch alongside kkt. Fresh
 * frontier recompute also showed integer-programming and quadratic-
 * programming newly ready (via linear-programming) and stochastic-gradient
 * still ready (via gradient-methods) — deferred to a future batch.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.opt.
 * {kkt,dynamic-programming,newton-optimization}.md.
 *
 * Grade band: all three retain GradeBand.UNDERGRADUATE. kkt requires
 * math.opt.duality and math.opt.lagrange-multipliers (both
 * UNDERGRADUATE). dynamic-programming requires math.disc.recurrence-
 * relation, itself UNDERGRADUATE (not HIGH — one of the small number of
 * math.disc concepts whose own prerequisite chain pulled it into
 * undergraduate territory during that domain's campaign). newton-
 * optimization requires math.opt.gradient-methods (UNDERGRADUATE) and
 * math.calc.multivariable-extrema (not yet an EB entry, reused
 * conceptually per its own Blueprint citation, not itself carrying a
 * grade band to check against).
 *
 *   KKT  A point satisfying all four KKT conditions is NEVER automatically
 *           the global minimum — it could be a local minimum, local
 *           MAXIMUM, or SADDLE POINT; KKT is sufficient for global
 *           optimality ONLY under convexity, never universally;
 *           complementary slackness ($\lambda_ig_i(x^*)=0$) carries a
 *           specific CAUSAL DIRECTION, NEVER a symmetric either-or choice
 *           — an inactive constraint FORCES its multiplier to zero, never
 *           the reverse as a free choice; dual feasibility ($\lambda_i\ge0$)
 *           is NEVER an optional add-on to stationarity and primal
 *           feasibility — omitting it produces a geometrically invalid
 *           direction for inequality constraints.
 *   DYNAMIC-PROGRAMMING  DP is NEVER "just recursion" — it is recursion
 *           PLUS CACHING, and a naive recursive solution without
 *           memoization or tabulation is not DP no matter how correct its
 *           answer; a GREEDY heuristic that works for one optimization
 *           problem (fractional knapsack) NEVER automatically transfers
 *           to a superficially similar one (0/1 knapsack) — overlapping
 *           subproblems can defeat an early greedy commitment; a DP
 *           table's fill order is NEVER arbitrary — it must respect the
 *           table's own DEPENDENCY DAG, which varies genuinely by problem
 *           and is never guaranteed by a table's visually uniform grid
 *           shape.
 *   NEWTON-OPTIMIZATION  Newton's method NEVER automatically converges to
 *           the GLOBAL minimum regardless of starting point — it converges
 *           to the NEAREST critical point, which can be a local maximum or
 *           saddle; Hessian inversion's $O(n^3)$ cost is NEVER a reason to
 *           dismiss Newton-style methods outright — quasi-Newton methods
 *           (BFGS, L-BFGS) sidestep it entirely; "quadratic convergence"
 *           NEVER means converging in exactly two steps — it describes a
 *           RATE (correct digits roughly doubling each step), a
 *           fundamentally different claim from a fixed iteration count.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const KKT = 'math.opt.kkt'
const DYNAMIC_PROGRAMMING = 'math.opt.dynamic-programming'
const NEWTON_OPTIMIZATION = 'math.opt.newton-optimization'

export const MATHEMATICS_OPT_KKT_DYNAMIC_PROGRAMMING_NEWTON_OPTIMIZATION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: KKT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A POINT SATISFYING ALL FOUR KKT CONDITIONS IS NEVER AUTOMATICALLY THE GLOBAL MINIMUM — IT '
      + 'IS SUFFICIENT ONLY UNDER CONVEXITY, NEVER UNIVERSALLY: the four conditions — stationarity '
      + '($\\nabla_xL=0$), primal feasibility, dual feasibility ($\\lambda_i\\ge0$), and '
      + 'complementary slackness — are NECESSARY for a local optimum under LICQ, but satisfying all '
      + 'four could still describe a local minimum, a local MAXIMUM, or a SADDLE POINT. For '
      + '$f(x)=x^4-2x^2$ (no constraints), stationarity gives $x\\in\\{0,\\pm1\\}$ — $x=0$ '
      + 'satisfies the KKT condition but is a LOCAL MAXIMUM ($f(0)=0>f(\\pm1)=-1$), never '
      + 'distinguished from the genuine minima by KKT alone. Only when $f$ is convex, every $g_i$ is '
      + 'convex, and every $h_j$ is affine does satisfying KKT certify GLOBAL optimality — without '
      + 'convexity, every KKT point must be enumerated and compared.\n\n'
      + 'COMPLEMENTARY SLACKNESS CARRIES A SPECIFIC CAUSAL DIRECTION, NEVER A SYMMETRIC EITHER-OR '
      + 'CHOICE: $\\lambda_ig_i(x^*)=0$ means that if $g_i(x^*)<0$ (the constraint is INACTIVE), '
      + 'then $\\lambda_i$ MUST equal zero — relaxing an already-slack constraint cannot help. '
      + 'Conversely, if $\\lambda_i>0$, the constraint MUST be active — but the reverse never holds '
      + '(an active constraint\'s multiplier CAN legitimately be zero in degenerate cases). This is '
      + 'never a free choice of which factor equals zero; in a hard-margin SVM, training points with '
      + '$\\alpha_i>0$ sit exactly on the margin and determine the decision boundary, while '
      + '$\\alpha_i=0$ points are strictly inside the margin and removable without changing anything.\n\n'
      + 'DUAL FEASIBILITY ($\\lambda_i\\ge0$) IS NEVER AN OPTIONAL ADD-ON TO STATIONARITY AND '
      + 'PRIMAL FEASIBILITY — OMITTING IT PRODUCES A GEOMETRICALLY INVALID DIRECTION FOR INEQUALITY '
      + 'CONSTRAINTS: the equality-constrained Lagrange multiplier is sign-free (any sign is valid), '
      + 'but that sign-freedom does NOT carry over to inequality constraints, where '
      + '$\\lambda_i\\ge0$ is a genuinely new, required condition — a negative $\\lambda_i$ would '
      + "mean the gradient points INTO infeasibility, never away from it, so \"stationarity plus "
      + 'primal feasibility" alone is never a complete KKT system.',
    targetedMisconceptions: [`${KKT}:MC-1`, `${KKT}:MC-2`, `${KKT}:MC-3`],
    source: eb(KKT, "Core Understanding — a point satisfying all four KKT conditions never automatically the global minimum since KKT is sufficient for global optimality only under convexity never universally, complementary slackness carrying a specific causal direction never a symmetric either-or choice, and dual feasibility never being an optional add-on to stationarity and primal feasibility since omitting it produces a geometrically invalid direction for inequality constraints"),
  },
  {
    conceptId: DYNAMIC_PROGRAMMING, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'DP IS NEVER "JUST RECURSION" — IT IS RECURSION PLUS CACHING, AND A NAIVE RECURSIVE '
      + 'SOLUTION WITHOUT MEMOIZATION OR TABULATION IS NOT DP NO MATTER HOW CORRECT ITS ANSWER: '
      + 'naive recursive Fibonacci $F(5)$ recomputes $F(2)$ 3 times and $F(1)$ 5 times — genuinely '
      + 'exponential recomputation of the SAME subproblems. Adding a cache (memoization, top-down) '
      + 'or filling a table in dependency order (tabulation, bottom-up) computes each distinct '
      + 'subproblem EXACTLY ONCE — the caching step is never optional or cosmetic; it is the '
      + 'defining mechanism that converts an exponential naive recursion into a polynomial-time '
      + 'algorithm.\n\n'
      + 'A GREEDY HEURISTIC THAT WORKS FOR ONE OPTIMIZATION PROBLEM NEVER AUTOMATICALLY TRANSFERS '
      + 'TO A SUPERFICIALLY SIMILAR ONE — OVERLAPPING SUBPROBLEMS CAN DEFEAT AN EARLY GREEDY '
      + 'COMMITMENT: for the 0/1 knapsack instance with capacity $W=5$ and items '
      + '$(w{=}3,v{=}4),(w{=}2,v{=}3),(w{=}2,v{=}3)$, greedy\'s ratio-based choice gives value 6, '
      + 'while DP\'s table-based search finds the genuinely better combination (items 1+3), value '
      + '7 — greedy is strictly worse. Greedy gives the OPTIMAL answer only where a locally-best '
      + "choice can never be improved upon later (fractional knapsack, activity selection); it "
      + "FAILS precisely when an early commitment can foreclose a better later combination, which "
      + 'is never predictable just from a problem "looking similar" to one where greedy succeeded.\n\n'
      + "A DP TABLE'S FILL ORDER IS NEVER ARBITRARY — IT MUST RESPECT THE TABLE'S OWN DEPENDENCY "
      + 'DAG, WHICH VARIES GENUINELY BY PROBLEM: filling the 4×4 Longest Common Subsequence table '
      + 'for "ABCB" vs. "BCAB" column-by-column starting at column 1 fails outright — cell $(1,1)$ '
      + "needs $(0,1)$, not yet available in that order — while row-by-row satisfies every "
      + 'dependency in time. A table\'s visually uniform grid shape NEVER guarantees any particular '
      + 'fill order is safe; Matrix Chain Multiplication genuinely requires filling by increasing '
      + 'CHAIN LENGTH instead of row-by-row, because its dependency structure is different, and the '
      + "correct order must be checked against the ACTUAL dependency DAG every time, never assumed "
      + 'from habit.',
    targetedMisconceptions: [`${DYNAMIC_PROGRAMMING}:MC-1`, `${DYNAMIC_PROGRAMMING}:MC-2`, `${DYNAMIC_PROGRAMMING}:MC-3`],
    source: eb(DYNAMIC_PROGRAMMING, 'Core Understanding — DP never being just recursion since it is recursion plus caching and a naive recursive solution without memoization or tabulation is not DP, a greedy heuristic that works for one optimization problem never automatically transferring to a superficially similar one since overlapping subproblems can defeat an early greedy commitment, and a DP table\'s fill order never being arbitrary since it must respect the table\'s own dependency DAG which varies genuinely by problem'),
  },
  {
    conceptId: NEWTON_OPTIMIZATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "NEWTON'S METHOD NEVER AUTOMATICALLY CONVERGES TO THE GLOBAL MINIMUM REGARDLESS OF STARTING "
      + 'POINT — IT CONVERGES TO THE NEAREST CRITICAL POINT, WHICH CAN BE A LOCAL MAXIMUM OR '
      + 'SADDLE: for $f(\\theta)=\\theta^3-3\\theta$ (critical points at $\\theta=\\pm1$, a local '
      + 'max at $-1$ and local min at $(1)$), starting at $\\theta_0=-0.5$, Newton converges toward '
      + '$\\theta=-1$ — the LOCAL MAXIMUM, never the global minimum. "Newton\'s method converges '
      + 'fast" is never itself a claim about WHERE it converges — speed and destination are '
      + 'genuinely separate questions, and fast convergence near a critical point never implies '
      + 'that critical point is the global answer.\n\n'
      + "HESSIAN INVERSION'S $O(n^3)$ COST IS NEVER A REASON TO DISMISS NEWTON-STYLE METHODS "
      + 'OUTRIGHT — QUASI-NEWTON METHODS SIDESTEP IT ENTIRELY: exact Newton\'s method genuinely '
      + 'requires forming and inverting the full Hessian at $O(n^3)$ cost per step — but QUASI-'
      + 'NEWTON methods (BFGS, L-BFGS) approximate the Hessian\'s inverse using only gradient '
      + 'information, achieving superlinear convergence at $O(n^2)$ or better per-step cost, NEVER '
      + 'requiring the full Hessian at all. Dismissing the entire Newton family as "unusable for '
      + 'large problems" because of the exact method\'s cost ignores this genuinely different '
      + 'tradeoff, never an inferior substitute.\n\n'
      + '"QUADRATIC CONVERGENCE" NEVER MEANS CONVERGING IN EXACTLY TWO STEPS — IT DESCRIBES A '
      + 'RATE, A FUNDAMENTALLY DIFFERENT CLAIM FROM A FIXED ITERATION COUNT: near a non-degenerate '
      + 'local minimum, Newton\'s error shrinks like its own SQUARE each step, '
      + '$e_{k+1}\\le Ce_k^2$ — from error $e_k=0.1$ (1 correct digit), the sequence gives roughly '
      + '2 correct digits, then roughly 4, then roughly 8 — the number of CORRECT DIGITS roughly '
      + 'DOUBLES with every step, never a claim that the process finishes in a specific count of '
      + 'iterations. "Quadratic" here describes the EXPONENT in the error-shrinkage formula, never '
      + 'the everyday association with "degree 2" implying two steps — and this fast doubling '
      + "regime applies only ONCE the iterate is already close to the minimum, never from the very "
      + 'first step.',
    targetedMisconceptions: [`${NEWTON_OPTIMIZATION}:MC-1`, `${NEWTON_OPTIMIZATION}:MC-2`, `${NEWTON_OPTIMIZATION}:MC-3`],
    source: eb(NEWTON_OPTIMIZATION, "Core Understanding — Newton's method never automatically converging to the global minimum regardless of starting point since it converges to the nearest critical point which can be a local maximum or saddle, Hessian inversion's cubic cost never being a reason to dismiss Newton-style methods outright since quasi-Newton methods sidestep it entirely, and quadratic convergence never meaning converging in exactly two steps since it describes a rate rather than a fixed iteration count"),
  },
]

export const MATHEMATICS_OPT_KKT_DYNAMIC_PROGRAMMING_NEWTON_OPTIMIZATION_PROBES: SeedProbe[] = [
  {
    conceptId: KKT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If a point satisfies all four KKT conditions, is it automatically the global minimum?',
    choices: [
      { text: 'No — for $f(x)=x^4-2x^2$ (no constraints), $x=0$ satisfies stationarity but is a local MAXIMUM, not the global minimum; KKT is sufficient for global optimality only when the problem is convex', isCorrect: true },
      { text: 'Yes — satisfying all four KKT conditions is both necessary and sufficient for global optimality on any problem', isCorrect: false, misconceptionId: `${KKT}:MC-1` },
      { text: "Yes, since the four KKT conditions together always certify the global minimum regardless of convexity", isCorrect: false, misconceptionId: `${KKT}:MC-1` },
    ],
    targetedMisconceptions: [`${KKT}:MC-1`],
    source: eb(KKT, 'Discovery Question 1 as a detection probe (verbatim) — whether satisfying all four KKT conditions guarantees the global minimum, an answer of "yes" confirming KKT-SUFFICIENT-ALWAYS'),
  },
  {
    conceptId: KKT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'In $\\lambda_ig_i(x^*)=0$, can either $\\lambda_i$ or $g_i(x^*)$ be zero by free choice, or does one force the other?',
    choices: [
      { text: 'One forces the other — if $g_i(x^*)<0$ (inactive), $\\lambda_i$ MUST equal zero; if $\\lambda_i>0$, the constraint MUST be active; the constraint\'s own status determines the multiplier, never a symmetric free choice', isCorrect: true },
      { text: 'Either factor can be zero by free choice, as with any product equaling zero', isCorrect: false, misconceptionId: `${KKT}:MC-2` },
      { text: "The equation is satisfied however we like, since it's just an algebraic constraint with two independent solutions", isCorrect: false, misconceptionId: `${KKT}:MC-2` },
    ],
    targetedMisconceptions: [`${KKT}:MC-2`],
    source: eb(KKT, 'Discovery Question 2 as a detection probe (verbatim) — whether complementary slackness is a symmetric free choice, an answer treating it as free choice confirming COMPLEMENTARY-SLACKNESS-CONFUSION'),
  },
  {
    conceptId: KKT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the dual feasibility condition $\\lambda_i\\ge0$ optional, or a required part of KKT for every inequality constraint?',
    choices: [
      { text: 'Required — a negative $\\lambda_i$ would mean the gradient points INTO infeasibility rather than away from it; unlike the sign-free equality-constrained multiplier, inequality multipliers genuinely require this non-negativity', isCorrect: true },
      { text: 'Optional — KKT is really just stationarity plus primal feasibility, with dual feasibility as an occasional extra check', isCorrect: false, misconceptionId: `${KKT}:MC-3` },
      { text: "Optional, since Lagrange multipliers are sign-free just like in the equality-constrained case", isCorrect: false, misconceptionId: `${KKT}:MC-3` },
    ],
    targetedMisconceptions: [`${KKT}:MC-3`],
    source: eb(KKT, 'Discovery Question 3 as a detection probe (verbatim) — whether dual feasibility is optional, an answer of "optional" confirming DUAL-FEASIBILITY-OPTIONAL'),
  },
  {
    conceptId: DYNAMIC_PROGRAMMING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is dynamic programming the same thing as recursion, or does it add something recursion alone doesn\'t have?',
    choices: [
      { text: 'It adds caching — naive recursive Fibonacci recomputes F(2) 3 times and F(1) 5 times for F(5), while DP\'s cache (memoization or tabulation) computes each distinct subproblem exactly once', isCorrect: true },
      { text: 'They are the same thing — any correct recursive solution to an optimization problem is dynamic programming', isCorrect: false, misconceptionId: `${DYNAMIC_PROGRAMMING}:MC-1` },
      { text: "DP is just a formal name for recursion, with no additional mechanism required", isCorrect: false, misconceptionId: `${DYNAMIC_PROGRAMMING}:MC-1` },
    ],
    targetedMisconceptions: [`${DYNAMIC_PROGRAMMING}:MC-1`],
    source: eb(DYNAMIC_PROGRAMMING, 'Discovery Question 1 as a detection probe (verbatim) — whether DP is the same as plain recursion, an answer of "yes" confirming DP-IS-JUST-RECURSION'),
  },
  {
    conceptId: DYNAMIC_PROGRAMMING, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If a greedy heuristic works for fractional knapsack, will it also give the correct answer for 0/1 knapsack?',
    choices: [
      { text: 'No — for capacity 5 and items (w=3,v=4),(w=2,v=3),(w=2,v=3), greedy gives value 6 while DP finds the better combination worth 7; 0/1 knapsack\'s discrete choices genuinely break the greedy guarantee that fractional knapsack enjoys', isCorrect: true },
      { text: 'Yes — since greedy is correct for fractional knapsack, it will also be correct for the closely related 0/1 knapsack problem', isCorrect: false, misconceptionId: `${DYNAMIC_PROGRAMMING}:MC-2` },
      { text: "Yes, because both knapsack variants share the same optimal-substructure property that makes greedy work", isCorrect: false, misconceptionId: `${DYNAMIC_PROGRAMMING}:MC-2` },
    ],
    targetedMisconceptions: [`${DYNAMIC_PROGRAMMING}:MC-2`],
    source: eb(DYNAMIC_PROGRAMMING, 'Discovery Question 2 as a detection probe (verbatim) — whether greedy transfers from fractional to 0/1 knapsack, an answer of "yes" confirming GREEDY-ALWAYS-WORKS'),
  },
  {
    conceptId: DYNAMIC_PROGRAMMING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Can a DP table be filled in any order, as long as every cell eventually gets a value?',
    choices: [
      { text: 'No — filling the LCS table for "ABCB" vs "BCAB" column-by-column fails because cell (1,1) needs (0,1) not yet available; the fill order must respect the table\'s own dependency DAG, which varies genuinely by problem (e.g. Matrix Chain Multiplication needs chain-length order, not row-by-row)', isCorrect: true },
      { text: 'Yes — any fill order works as long as every cell in the table is eventually computed', isCorrect: false, misconceptionId: `${DYNAMIC_PROGRAMMING}:MC-3` },
      { text: "Yes, since a table's uniform grid shape guarantees row-by-row or column-by-column filling always works", isCorrect: false, misconceptionId: `${DYNAMIC_PROGRAMMING}:MC-3` },
    ],
    targetedMisconceptions: [`${DYNAMIC_PROGRAMMING}:MC-3`],
    source: eb(DYNAMIC_PROGRAMMING, 'Discovery Question 3 as a detection probe (verbatim) — whether a DP table can be filled in any order, an answer of "yes" confirming SUBPROBLEM-ORDER-ARBITRARY'),
  },
  {
    conceptId: NEWTON_OPTIMIZATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "Does Newton's method always converge to the global minimum, regardless of where it starts?",
    choices: [
      { text: 'No — for $f(\\theta)=\\theta^3-3\\theta$, starting at $\\theta_0=-0.5$, Newton converges toward $\\theta=-1$, the LOCAL MAXIMUM, not the global minimum at $\\theta=1$; it finds the nearest critical point, never automatically the global one', isCorrect: true },
      { text: "Yes — Newton's method's fast convergence guarantees it reaches the global minimum from any starting point", isCorrect: false, misconceptionId: `${NEWTON_OPTIMIZATION}:MC-1` },
      { text: "Yes, since quadratic convergence implies the method always finds the true global answer", isCorrect: false, misconceptionId: `${NEWTON_OPTIMIZATION}:MC-1` },
    ],
    targetedMisconceptions: [`${NEWTON_OPTIMIZATION}:MC-1`],
    source: eb(NEWTON_OPTIMIZATION, 'Discovery Question 1 as a detection probe (verbatim) — whether Newton\'s method always converges to the global minimum, an answer of "yes" confirming NEWTON-ALWAYS-FINDS-GLOBAL-MIN'),
  },
  {
    conceptId: NEWTON_OPTIMIZATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If Hessian inversion costs $O(n^3)$, does that mean Newton-style methods are simply unusable for large problems?',
    choices: [
      { text: 'No — quasi-Newton methods (BFGS, L-BFGS) approximate the Hessian\'s inverse using only gradient information, achieving superlinear convergence at O(n^2) or better per-step cost, never requiring the full Hessian at all', isCorrect: true },
      { text: 'Yes — the cubic cost of Hessian inversion makes the entire Newton family impractical for any large-scale problem', isCorrect: false, misconceptionId: `${NEWTON_OPTIMIZATION}:MC-2` },
      { text: "Yes, since there is no way to get Newton's convergence benefits without forming the full Hessian", isCorrect: false, misconceptionId: `${NEWTON_OPTIMIZATION}:MC-2` },
    ],
    targetedMisconceptions: [`${NEWTON_OPTIMIZATION}:MC-2`],
    source: eb(NEWTON_OPTIMIZATION, 'Discovery Question 2 as a detection probe (verbatim) — whether Hessian inversion cost makes Newton-style methods unusable, an answer of "yes" confirming HESSIAN-INVERSION-IS-EXPENSIVE-SO-SKIP'),
  },
  {
    conceptId: NEWTON_OPTIMIZATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Does 'quadratic convergence' mean the method converges in exactly two steps?",
    choices: [
      { text: 'No — quadratic convergence describes a RATE, $e_{k+1}\\le Ce_k^2$, where correct digits roughly double each step (from 1 to 2 to 4 to 8 digits); it never specifies a fixed number of iterations', isCorrect: true },
      { text: 'Yes — "quadratic" refers to the method reaching the answer in exactly two iterations, matching the degree-2 association of the word', isCorrect: false, misconceptionId: `${NEWTON_OPTIMIZATION}:MC-3` },
      { text: "Yes, since quadratic equations are solved in two steps, and the same applies to quadratic convergence", isCorrect: false, misconceptionId: `${NEWTON_OPTIMIZATION}:MC-3` },
    ],
    targetedMisconceptions: [`${NEWTON_OPTIMIZATION}:MC-3`],
    source: eb(NEWTON_OPTIMIZATION, 'Discovery Question 3 as a detection probe (verbatim) — whether quadratic convergence means exactly two steps, an answer of "yes" confirming QUADRATIC-CONVERGENCE-MEANS-TWO-STEPS'),
  },
]
