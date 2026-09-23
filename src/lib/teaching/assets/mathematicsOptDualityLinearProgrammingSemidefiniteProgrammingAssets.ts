/**
 * Batch: duality, linear-programming, semidefinite-programming (math.opt).
 *
 * Continues math.opt (6/16 -> 9/16). Fresh frontier recompute found 6
 * ready concepts (`duality`, `dynamic-programming`, `linear-programming`,
 * `newton-optimization`, `semidefinite-programming`, `stochastic-
 * gradient`); these 3 selected as they together complete the "problem
 * classes" narrative introduced in convex-optimization's own EB entry
 * (LP, general duality, SDP) — `dynamic-programming` again deferred as a
 * disconnected expert-level topic; `newton-optimization`/`stochastic-
 * gradient` deferred to a future gradient-methods-focused batch.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.opt.
 * {duality,linear-programming,semidefinite-programming}.md.
 *
 * Grade band: all three retain GradeBand.UNDERGRADUATE via their shared
 * math.opt.convex-optimization prerequisite (UNDERGRADUATE, authored this
 * campaign). linear-programming's second prerequisite (math.linalg.
 * linear-system) and semidefinite-programming's second prerequisite
 * (math.linalg.positive-definite) are not yet EB-authored entries — per
 * standing practice, an unauthored prerequisite is reused conceptually
 * (per its own Blueprint citation) and does not itself carry a grade band
 * to check against; the concept's grade band follows its authored
 * prerequisites only.
 *
 *   DUALITY  Strong duality is NEVER universal — it requires the primal
 *           problem to be CONVEX plus SLATER'S CONDITION, and applying it
 *           to a non-convex problem can produce a genuine nonzero duality
 *           gap; the dual variables $\lambda_i^*$ are NEVER merely
 *           solving-technique scratch work — they carry a genuine SHADOW-
 *           PRICE interpretation, the rate of optimal-value change per
 *           unit constraint relaxation; Slater's condition concerns ONLY
 *           the inequality constraints, NEVER a broader claim about an
 *           "interior" of the entire feasible set — it can hold even when
 *           equality constraints pin the feasible set to a single point.
 *   LINEAR-PROGRAMMING  An LP's optimum NEVER occurs in the interior of
 *           the feasible polytope — a linear objective has no curvature,
 *           so the extreme-point theorem forces at least one optimum to a
 *           VERTEX; LP strong duality is NEVER unconditional — it requires
 *           BOTH the primal and dual to have a finite optimum, failing
 *           when either side is infeasible or unbounded; simplex's
 *           exponential WORST-CASE complexity is NEVER typical of its
 *           actual practical performance — it empirically runs in roughly
 *           $O(m)$ to $O(2m)$ pivots, the Klee-Minty construction being a
 *           genuine pathological exception, never the norm.
 *   SEMIDEFINITE-PROGRAMMING  SDP's matrix variable $X\succeq0$ is NEVER
 *           "just a QP with a symmetric matrix" — SDP genuinely drops the
 *           rank-1 constraint that QP implicitly carries, allowing any
 *           rank from 1 to $n$; the PSD cone $\{X:X\succeq0\}$ IS convex
 *           despite its eigenvalue-based definition LOOKING nonlinear — a
 *           nonlinear-looking condition never implies a non-convex set,
 *           as the direct convex-combination proof confirms; an SDP
 *           relaxation's optimal solution can have ANY RANK, NEVER
 *           assumed rank-1 — rounding procedures like Goemans-Williamson
 *           exist precisely because the optimal $X^*$ is generally NOT
 *           rank-1.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const DUALITY = 'math.opt.duality'
const LINEAR_PROGRAMMING = 'math.opt.linear-programming'
const SEMIDEFINITE_PROGRAMMING = 'math.opt.semidefinite-programming'

export const MATHEMATICS_OPT_DUALITY_LINEAR_PROGRAMMING_SEMIDEFINITE_PROGRAMMING_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DUALITY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'STRONG DUALITY IS NEVER UNIVERSAL — IT REQUIRES THE PRIMAL PROBLEM TO BE CONVEX PLUS '
      + "SLATER'S CONDITION, AND A NON-CONVEX PROBLEM CAN PRODUCE A GENUINE NONZERO DUALITY GAP: WEAK "
      + 'duality, $g(\\lambda,\\nu)\\le p^*$, holds UNIVERSALLY for any problem — but STRONG duality '
      + '($p^*=d^*$) is a much stronger claim, requiring the primal to be convex AND Slater\'s '
      + 'condition (a strictly feasible point where every inequality holds strictly). For a genuinely '
      + 'non-convex problem, a dual lower bound of 3 against a true primal optimum of 5 gives a real '
      + 'duality gap of 2 — strong duality is emphasized heavily for LPs (where it always holds), but '
      + "that emphasis is never license to assume it holds universally.\n\n"
      + "THE DUAL VARIABLES $\\lambda_i^*$ ARE NEVER MERELY SOLVING-TECHNIQUE SCRATCH WORK — THEY "
      + 'CARRY A GENUINE SHADOW-PRICE INTERPRETATION: at strong duality, '
      + '$\\partial p^*/\\partial b_i=-\\lambda_i^*$. For $\\min x_1+2x_2$ s.t. $x_1+x_2\\ge3$, the '
      + 'primal optimum $(3,0)$ has $\\lambda_1^*=1$; relaxing to $x_1+x_2\\ge2$ moves the optimum to '
      + '$(2,0)$ — a decrease of EXACTLY $\\lambda_1^*=1$. Treating $\\lambda_i^*$ as disposable once '
      + '$x$ is found discards this genuinely useful sensitivity information; complementary slackness '
      + '($\\lambda_i^*g_i(x^*)=0$) further ties this to constraint activity — an inactive constraint '
      + 'forces $\\lambda_i^*=0$, while an active one can carry a genuinely positive shadow price.\n\n'
      + "SLATER'S CONDITION CONCERNS ONLY THE INEQUALITY CONSTRAINTS, NEVER A BROADER CLAIM ABOUT AN "
      + '"INTERIOR" OF THE ENTIRE FEASIBLE SET: for $\\min f(x)$ s.t. $x\\le1,x=-1$, Slater\'s '
      + 'condition needs only a point $\\tilde x<1$ — and $\\tilde x=-1$ satisfies this EXACTLY, even '
      + 'though $x=-1$ is the ONLY feasible point overall, forced entirely by the equality constraint. '
      + '"Interior point" sounds like a broad geometric claim about the whole feasible region, but '
      + "Slater's condition genuinely concerns only the inequality constraints, and can hold even when "
      + 'equality constraints pin the feasible set down to a single point.',
    targetedMisconceptions: [`${DUALITY}:MC-1`, `${DUALITY}:MC-2`, `${DUALITY}:MC-3`],
    source: eb(DUALITY, "Core Understanding — strong duality never being universal since it requires the primal to be convex plus Slater's condition with a non-convex problem able to produce a genuine nonzero duality gap, dual variables never being merely solving-technique scratch work since they carry a genuine shadow-price interpretation, and Slater's condition concerning only the inequality constraints never a broader claim about an interior of the entire feasible set"),
  },
  {
    conceptId: LINEAR_PROGRAMMING, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "AN LP'S OPTIMUM NEVER OCCURS IN THE INTERIOR OF THE FEASIBLE POLYTOPE — A LINEAR OBJECTIVE "
      + 'HAS NO CURVATURE, SO THE EXTREME-POINT THEOREM FORCES AT LEAST ONE OPTIMUM TO A VERTEX: '
      + 'from any interior point of the feasible polytope, moving in direction $-c$ always decreases '
      + 'the objective while staying feasible for a small enough step — so the interior can NEVER be '
      + 'optimal. For the 2D polytope with vertices $(0,0),(3,0),(3,1),(1,3),(0,3)$ and objective '
      + '$-x_1-2x_2$, evaluating all 5 vertices finds the optimum $(1,3)$, value $-7$ — occurring at '
      + 'a VERTEX, never at any interior point. Smooth, curved optimization problems genuinely can '
      + 'have interior optima, but a linear objective\'s complete lack of curvature rules this out '
      + 'entirely.\n\n'
      + 'LP STRONG DUALITY IS NEVER UNCONDITIONAL — IT REQUIRES BOTH THE PRIMAL AND DUAL TO HAVE A '
      + 'FINITE OPTIMUM, FAILING WHEN EITHER SIDE IS INFEASIBLE OR UNBOUNDED: weak duality '
      + '($c^Tx\\ge b^Ty$ for any feasible pair) always holds, and strong duality for LPs needs no '
      + "additional Slater-type condition BEYOND both sides having a finite optimum — but this is "
      + 'still a genuine requirement, never automatic. "LP duality" taught as simply "strong duality '
      + 'holds" without this feasibility caveat is incomplete: an unbounded or infeasible primal '
      + 'breaks the equal-optimal-values guarantee entirely.\n\n'
      + "SIMPLEX'S EXPONENTIAL WORST-CASE COMPLEXITY IS NEVER TYPICAL OF ITS ACTUAL PRACTICAL "
      + 'PERFORMANCE — IT EMPIRICALLY RUNS IN ROUGHLY $O(m)$ TO $O(2m)$ PIVOTS: the Klee-Minty '
      + 'construction proves simplex CAN take exponentially many pivots in the worst case, but this is '
      + 'a genuine pathological exception, never the norm — for $m$ constraints, simplex empirically '
      + 'runs in roughly $O(m)$ to $O(2m)$ pivots on typical problems. "Worst-case exponential" and '
      + '"typical exponential" are genuinely different claims; interior-point methods offer polynomial '
      + 'WORST-CASE complexity but cannot warm-start the way simplex can, so the choice between the two '
      + 'depends on problem structure, never a blanket "simplex is impractical" verdict.',
    targetedMisconceptions: [`${LINEAR_PROGRAMMING}:MC-1`, `${LINEAR_PROGRAMMING}:MC-2`, `${LINEAR_PROGRAMMING}:MC-3`],
    source: eb(LINEAR_PROGRAMMING, "Core Understanding — an LP's optimum never occurring in the interior of the feasible polytope since a linear objective's lack of curvature forces the extreme-point theorem to a vertex, LP strong duality never being unconditional since it requires both the primal and dual to have a finite optimum, and simplex's exponential worst-case complexity never being typical of its actual practical performance which empirically runs in roughly O(m) to O(2m) pivots"),
  },
  {
    conceptId: SEMIDEFINITE_PROGRAMMING, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'SDP\'S MATRIX VARIABLE $X\\succeq0$ IS NEVER "JUST A QP WITH A SYMMETRIC MATRIX" — SDP '
      + 'GENUINELY DROPS THE RANK-1 CONSTRAINT THAT QP IMPLICITLY CARRIES, ALLOWING ANY RANK FROM 1 '
      + 'TO $n$: QP minimizes $\\frac12x^TQx+c^Tx$ with $Q$ FIXED in the objective and $x$ the '
      + 'variable; SDP minimizes $\\mathrm{tr}(CX)$ with $C$ fixed and $X\\in\\mathbb{S}^n$ (an '
      + 'ENTIRE symmetric matrix) as the variable, subject to $X\\succeq0$. If $X=xx^T$ (a RANK-1, '
      + 'non-convex constraint), $\\mathrm{tr}(CX)=x^TCx$ recovers QP exactly — but SDP DROPS the '
      + 'rank-1 restriction entirely, allowing any $X\\succeq0$. This is precisely why SDP is '
      + 'polynomial-time solvable while the exact rank-1 problem is NP-hard in general — noticing '
      + 'that $\\mathrm{tr}(CX)=x^TCx$ for one particular $X$ is never evidence the two problems are '
      + 'the same.\n\n'
      + 'THE PSD CONE $\\{X:X\\succeq0\\}$ IS CONVEX DESPITE ITS EIGENVALUE-BASED DEFINITION '
      + 'LOOKING NONLINEAR — A NONLINEAR-LOOKING CONDITION NEVER IMPLIES A NON-CONVEX SET: for '
      + '$X,Y\\succeq0$ and $t\\in[0,1]$, and ANY vector $z$: $z^T(tX+(1-t)Y)z=t\\cdot z^TXz+(1-t)'
      + '\\cdot z^TYz\\ge0$, since both $z^TXz\\ge0$ and $z^TYz\\ge0$ — so $tX+(1-t)Y\\succeq0$, '
      + "proving the PSD cone IS convex. The eigenvalue condition \"looks\" nonlinear on the page, but "
      + "checking the actual convex-combination definition directly — not judging convexity by "
      + 'appearance — confirms the set it defines is genuinely closed under convex combinations.\n\n'
      + 'AN SDP RELAXATION\'S OPTIMAL SOLUTION CAN HAVE ANY RANK, NEVER ASSUMED RANK-1 — ROUNDING '
      + 'PROCEDURES LIKE GOEMANS-WILLIAMSON EXIST PRECISELY BECAUSE THE OPTIMAL $X^*$ IS GENERALLY '
      + 'NOT RANK-1: for the MAX-CUT SDP relaxation, the optimal $X^*$ factors as $X^*=V^TV$ with '
      + 'columns being genuine unit vectors in $\\mathbb{R}^n$ for ANY $n$, not necessarily $n=1$. '
      + 'Goemans-Williamson ROUNDING (a random hyperplane cut) is needed EXACTLY because $X^*$ is '
      + 'generally high-rank, not rank-1 — confusing the SDP relaxation\'s (possibly high-rank) '
      + "optimum with the original combinatorial problem's exact (rank-1) optimal solution is wrong; "
      + 'the rounding step exists specifically to recover a rank-1 answer from a genuinely higher-rank '
      + 'relaxation.',
    targetedMisconceptions: [`${SEMIDEFINITE_PROGRAMMING}:MC-1`, `${SEMIDEFINITE_PROGRAMMING}:MC-2`, `${SEMIDEFINITE_PROGRAMMING}:MC-3`],
    source: eb(SEMIDEFINITE_PROGRAMMING, 'Core Understanding — SDP\'s matrix variable never being just a QP with a symmetric matrix since SDP genuinely drops the rank-1 constraint that QP implicitly carries, the PSD cone being convex despite its eigenvalue-based definition looking nonlinear since a nonlinear-looking condition never implies a non-convex set, and an SDP relaxation\'s optimal solution being able to have any rank never assumed rank-1 since rounding procedures exist precisely because the optimum is generally not rank-1'),
  },
]

export const MATHEMATICS_OPT_DUALITY_LINEAR_PROGRAMMING_SEMIDEFINITE_PROGRAMMING_PROBES: SeedProbe[] = [
  {
    conceptId: DUALITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does strong duality hold for any optimization problem, or only under specific conditions?',
    choices: [
      { text: 'Only under specific conditions — the primal problem must be convex AND satisfy Slater\'s condition; a non-convex problem can have a genuine nonzero duality gap between its dual lower bound and its true primal optimum', isCorrect: true },
      { text: 'Strong duality holds universally for any optimization problem, convex or not', isCorrect: false, misconceptionId: `${DUALITY}:MC-1` },
      { text: "Strong duality is guaranteed as long as weak duality holds, which is always the case", isCorrect: false, misconceptionId: `${DUALITY}:MC-1` },
    ],
    targetedMisconceptions: [`${DUALITY}:MC-1`],
    source: eb(DUALITY, 'Discovery Question 1 as a detection probe (verbatim) — whether strong duality holds for any problem, an answer of "universal" confirming DUAL-ALWAYS-EQUALS-PRIMAL-NONCONVEX'),
  },
  {
    conceptId: DUALITY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Once you\'ve solved for the dual variable $\\lambda_i^*$, does its numerical value carry any further meaning about the original problem?',
    choices: [
      { text: 'Yes — $\\lambda_i^*$ is the constraint\'s shadow price; for $\\min x_1+2x_2$ s.t. $x_1+x_2\\ge3$, relaxing to $x_1+x_2\\ge2$ decreases the optimum by exactly $\\lambda_1^*=1$, matching the predicted sensitivity', isCorrect: true },
      { text: 'No — $\\lambda_i^*$ is purely a computational device used to solve for the primal variables, with no further meaning once $x$ is found', isCorrect: false, misconceptionId: `${DUALITY}:MC-2` },
      { text: "No, since Lagrange multipliers are only useful during the solving process itself", isCorrect: false, misconceptionId: `${DUALITY}:MC-2` },
    ],
    targetedMisconceptions: [`${DUALITY}:MC-2`],
    source: eb(DUALITY, 'Discovery Question 2 as a detection probe (verbatim) — whether the solved dual variable carries further meaning, an answer treating it as disposable confirming DUAL-VARIABLES-ARE-JUST-MULTIPLIERS'),
  },
  {
    conceptId: DUALITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does Slater\'s condition require a strictly interior point of the entire feasible set?',
    choices: [
      { text: 'No — Slater\'s condition concerns only the inequality constraints; for $\\min f(x)$ s.t. $x\\le1,x=-1$, the point $\\tilde x=-1$ satisfies Slater\'s condition even though it is the ONLY feasible point, forced entirely by the equality constraint', isCorrect: true },
      { text: 'Yes — Slater\'s condition requires a point strictly inside the entire feasible region, accounting for all constraints including equalities', isCorrect: false, misconceptionId: `${DUALITY}:MC-3` },
      { text: "Yes, since an interior point of the whole feasible set is necessary for strong duality to ever hold", isCorrect: false, misconceptionId: `${DUALITY}:MC-3` },
    ],
    targetedMisconceptions: [`${DUALITY}:MC-3`],
    source: eb(DUALITY, 'Discovery Question 3 as a detection probe (verbatim) — whether Slater\'s condition requires a strictly interior point of the entire feasible set, an answer of "yes" confirming SLATER-MEANS-INTERIOR-POINT-EXISTS'),
  },
  {
    conceptId: LINEAR_PROGRAMMING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Can the optimal solution of an LP occur strictly inside the feasible polytope, not on its boundary?',
    choices: [
      { text: 'No — a linear objective has no curvature, so moving in direction $-c$ from any interior point always decreases the objective while staying feasible; the extreme-point theorem guarantees the optimum occurs at a vertex', isCorrect: true },
      { text: 'Yes — like smooth, curved optimization problems, an LP can have its optimum strictly inside the feasible polytope', isCorrect: false, misconceptionId: `${LINEAR_PROGRAMMING}:MC-1` },
      { text: "Yes, since a large enough feasible polytope always contains an interior optimum somewhere", isCorrect: false, misconceptionId: `${LINEAR_PROGRAMMING}:MC-1` },
    ],
    targetedMisconceptions: [`${LINEAR_PROGRAMMING}:MC-1`],
    source: eb(LINEAR_PROGRAMMING, 'Discovery Question 1 as a detection probe (verbatim) — whether an LP\'s optimum can occur in the interior, an answer of "yes" confirming OPTIMAL-INTERIOR-LP'),
  },
  {
    conceptId: LINEAR_PROGRAMMING, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If a primal LP is unbounded below, does its dual automatically have an equal, finite optimal value?',
    choices: [
      { text: 'No — LP strong duality requires BOTH the primal and dual to have a finite optimum; an unbounded primal breaks the equal-optimal-values guarantee entirely, since there is no finite primal value for the dual to match', isCorrect: true },
      { text: 'Yes — strong duality for LPs holds unconditionally, regardless of whether the primal is bounded', isCorrect: false, misconceptionId: `${LINEAR_PROGRAMMING}:MC-2` },
      { text: "Yes, since weak duality already guarantees the dual and primal values must coincide", isCorrect: false, misconceptionId: `${LINEAR_PROGRAMMING}:MC-2` },
    ],
    targetedMisconceptions: [`${LINEAR_PROGRAMMING}:MC-2`],
    source: eb(LINEAR_PROGRAMMING, 'Discovery Question 2 as a detection probe (verbatim) — whether an unbounded primal\'s dual automatically has an equal finite optimum, an answer of "yes" confirming DUAL-ALWAYS-EQUALS-PRIMAL'),
  },
  {
    conceptId: LINEAR_PROGRAMMING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is simplex\'s exponential worst-case complexity typical of its actual performance in practice?',
    choices: [
      { text: 'No — the Klee-Minty construction proves an exponential worst case is possible, but this is a pathological exception; simplex empirically runs in roughly $O(m)$ to $O(2m)$ pivots for $m$ constraints on typical problems', isCorrect: true },
      { text: 'Yes — since simplex has exponential worst-case complexity, it is generally impractical compared to interior-point methods', isCorrect: false, misconceptionId: `${LINEAR_PROGRAMMING}:MC-3` },
      { text: "Yes, since the Klee-Minty construction represents the typical pivot count for real-world LPs", isCorrect: false, misconceptionId: `${LINEAR_PROGRAMMING}:MC-3` },
    ],
    targetedMisconceptions: [`${LINEAR_PROGRAMMING}:MC-3`],
    source: eb(LINEAR_PROGRAMMING, 'Discovery Question 3 as a detection probe (verbatim) — whether simplex\'s exponential worst case is typical, an answer of "yes" confirming SIMPLEX-EXPONENTIAL-IN-PRACTICE'),
  },
  {
    conceptId: SEMIDEFINITE_PROGRAMMING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is SDP with $X=xx^T$ the same as a QP because $\\mathrm{tr}(CX)=x^TCx$?',
    choices: [
      { text: 'No — SDP genuinely drops the rank-1 constraint entirely, allowing any $X\\succeq0$ (rank 1 to n), not just rank-1 $X=xx^T$; this is precisely why SDP is polynomial-time solvable while the exact rank-1 problem is NP-hard', isCorrect: true },
      { text: 'Yes — since one specific choice of X recovers the QP objective exactly, SDP is fundamentally the same problem as QP', isCorrect: false, misconceptionId: `${SEMIDEFINITE_PROGRAMMING}:MC-1` },
      { text: "Yes, because SDP is simply QP written with a symmetric matrix instead of a vector", isCorrect: false, misconceptionId: `${SEMIDEFINITE_PROGRAMMING}:MC-1` },
    ],
    targetedMisconceptions: [`${SEMIDEFINITE_PROGRAMMING}:MC-1`],
    source: eb(SEMIDEFINITE_PROGRAMMING, 'Discovery Question 1 as a detection probe (verbatim) — whether SDP with X=xxᵀ is the same as QP, an answer of "yes" confirming SDP-IS-JUST-QP'),
  },
  {
    conceptId: SEMIDEFINITE_PROGRAMMING, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is the set of PSD matrices $\\{X:X\\succeq0\\}$ convex, despite the eigenvalue condition looking nonlinear?',
    choices: [
      { text: 'Yes — for any $X,Y\\succeq0$ and $t\\in[0,1]$, $z^T(tX+(1-t)Y)z=t\\cdot z^TXz+(1-t)\\cdot z^TYz\\ge0$ for every z, directly proving $tX+(1-t)Y\\succeq0$; a nonlinear-looking condition never implies a non-convex set', isCorrect: true },
      { text: 'No — since the eigenvalue-based condition X⪰0 involves a nonlinear-looking constraint, the set it defines cannot be convex', isCorrect: false, misconceptionId: `${SEMIDEFINITE_PROGRAMMING}:MC-2` },
      { text: "No, because sets defined by eigenvalue conditions are generally non-convex by nature", isCorrect: false, misconceptionId: `${SEMIDEFINITE_PROGRAMMING}:MC-2` },
    ],
    targetedMisconceptions: [`${SEMIDEFINITE_PROGRAMMING}:MC-2`],
    source: eb(SEMIDEFINITE_PROGRAMMING, 'Discovery Question 2 as a detection probe (verbatim) — whether the PSD cone is convex despite looking nonlinear, an answer of "no" confirming PSD-CONE-IS-NOT-CONVEX'),
  },
  {
    conceptId: SEMIDEFINITE_PROGRAMMING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does an SDP relaxation\'s optimal solution always have rank 1?',
    choices: [
      { text: 'No — for the MAX-CUT SDP relaxation, the optimal $X^*$ can factor as $X^*=V^TV$ with columns being genuine unit vectors for any dimension, not necessarily rank 1; Goemans-Williamson rounding exists precisely because $X^*$ is generally NOT rank-1', isCorrect: true },
      { text: 'Yes — an SDP relaxation\'s optimal solution is always expected to be a rank-1 matrix, an outer product of a single vector', isCorrect: false, misconceptionId: `${SEMIDEFINITE_PROGRAMMING}:MC-3` },
      { text: "Yes, since the SDP relaxation is designed to always recover the original problem's rank-1 optimal solution directly", isCorrect: false, misconceptionId: `${SEMIDEFINITE_PROGRAMMING}:MC-3` },
    ],
    targetedMisconceptions: [`${SEMIDEFINITE_PROGRAMMING}:MC-3`],
    source: eb(SEMIDEFINITE_PROGRAMMING, 'Discovery Question 3 as a detection probe (verbatim) — whether an SDP relaxation\'s optimum always has rank 1, an answer of "yes" confirming SDP-ALWAYS-HAS-RANK-1-SOLUTION'),
  },
]
