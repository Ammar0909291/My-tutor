/**
 * Batch: integer-programming, quadratic-programming, stochastic-gradient
 * (math.opt) — DOMAIN COMPLETE.
 *
 * Closes math.opt out at 16/16 (DOMAIN CERTIFIED, the 12th mathematics
 * domain). Fresh frontier recompute found exactly these 3 concepts ready,
 * the domain's last three remaining. integer-programming and quadratic-
 * programming both require math.opt.linear-programming (already
 * authored); stochastic-gradient requires math.opt.gradient-methods
 * (already authored) and math.prob.expected-value (already authored,
 * math.prob campaign). Transcribed from the frozen Educational Brain
 * entries at educational-brain/concepts/mathematics/math.opt.
 * {integer-programming,quadratic-programming,stochastic-gradient}.md.
 *
 * Grade band: all three retain GradeBand.UNDERGRADUATE, matching math.opt's
 * established domain baseline throughout. integer-programming and
 * quadratic-programming share math.opt.linear-programming (UNDERGRADUATE)
 * as a prerequisite; stochastic-gradient's math.opt.gradient-methods
 * prerequisite is likewise UNDERGRADUATE. math.linalg.positive-definite
 * and math.prob.expected-value are not yet EB-authored entries within
 * this campaign's own asset corpus and do not themselves carry a grade
 * band to check against.
 *
 *   INTEGER-PROGRAMMING  Rounding an LP relaxation's solution is NEVER a
 *           valid substitute for exact integer optimization — it can
 *           violate constraints entirely or land arbitrarily far from the
 *           true optimum; branch-and-bound is NEVER brute-force
 *           enumeration of every integer point — the LP bound at each node
 *           PRUNES entire subtrees before they are ever fully explored; a
 *           zero integrality gap is NEVER the default expectation — it
 *           requires the specific structural property of total
 *           unimodularity, and general integer programs carry no such
 *           guarantee.
 *   QUADRATIC-PROGRAMMING  A quadratic program is NEVER assumed convex by
 *           default — convexity requires checking that the matrix defining
 *           the objective is positive semidefinite, and an indefinite
 *           matrix makes the problem a genuine saddle, never a bowl; a
 *           point satisfying the KKT conditions is NEVER automatically the
 *           global minimum for a non-convex QP — KKT is globally
 *           sufficient only under convexity; unconstrained least squares
 *           is NEVER the same problem as the general constrained QP — it
 *           is a special case with a closed-form solution that disappears
 *           entirely once constraints are added back.
 *   STOCHASTIC-GRADIENT  A single stochastic gradient step is NEVER
 *           systematically wrong (biased) just because it differs from the
 *           true gradient — it is an UNBIASED estimate with high variance,
 *           and bias and variance are genuinely different properties; a
 *           CONSTANT learning rate NEVER achieves exact convergence for
 *           SGD — it leaves a permanent noise floor that only a DECAYING
 *           rate can shrink to zero; mini-batch size is NEVER scaled down
 *           as the dataset grows — it is a fixed hyperparameter whose
 *           variance depends only on the batch size itself, never on the
 *           total dataset size.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const INTEGER_PROGRAMMING = 'math.opt.integer-programming'
const QUADRATIC_PROGRAMMING = 'math.opt.quadratic-programming'
const STOCHASTIC_GRADIENT = 'math.opt.stochastic-gradient'

export const MATHEMATICS_OPT_INTEGER_PROGRAMMING_QUADRATIC_PROGRAMMING_STOCHASTIC_GRADIENT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: INTEGER_PROGRAMMING, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "ROUNDING AN LP RELAXATION'S SOLUTION IS NEVER A VALID SUBSTITUTE FOR EXACT INTEGER "
      + 'OPTIMIZATION — IT CAN VIOLATE CONSTRAINTS ENTIRELY OR LAND ARBITRARILY FAR FROM THE TRUE '
      + 'OPTIMUM: for maximizing $x_1+x_2$ subject to $(2x_1+2x_2\\le3)$ with integer $x_1,x_2\\ge0$, '
      + 'the LP relaxation gives $x_1=x_2=(3/4)$; rounding UP to $(1,1)$ is INFEASIBLE '
      + '($(2+2=4>3)$), while rounding DOWN to $(0,0)$ gives objective value 0, when the true integer '
      + 'optimum is actually 1 at $(1,0)$ or $(0,1)$. Adding the integrality requirement $x\\in '
      + '\\mathbb{Z}^n$ genuinely DESTROYS CONVEXITY — the feasible set becomes a discrete lattice '
      + "rather than a continuous polytope — so the extreme-point theorem's own vertex-optimum "
      + 'guarantee no longer directly applies, and rounding a continuous optimum is never a '
      + 'reliable proxy.\n\n'
      + 'BRANCH-AND-BOUND IS NEVER BRUTE-FORCE ENUMERATION OF EVERY INTEGER POINT — THE LP BOUND '
      + 'AT EACH NODE PRUNES ENTIRE SUBTREES BEFORE THEY ARE EVER FULLY EXPLORED: at each node, '
      + 'solving the LP relaxation gives a BOUND; whenever that bound cannot beat the current best '
      + 'integer solution (the incumbent), the ENTIRE subtree rooted there is discarded WITHOUT '
      + 'being fully solved. For maximizing $x_1+x_2$ subject to $x_1+x_2\\le(3.7)$, $x_1\\le(2.5)$, '
      + '$x_2\\le(2.5)$, the branch-and-bound tree explores exactly 5 nodes to reach the optimum '
      + '3, with one branch pruned immediately as infeasible without ever solving a fresh LP for '
      + 'it — a dramatically smaller search than checking every one of $(2^n)$ possible integer '
      + 'combinations.\n\n'
      + 'A ZERO INTEGRALITY GAP IS NEVER THE DEFAULT EXPECTATION — IT REQUIRES THE SPECIFIC '
      + 'STRUCTURAL PROPERTY OF TOTAL UNIMODULARITY, AND GENERAL INTEGER PROGRAMS CARRY NO SUCH '
      + 'GUARANTEE: network-flow and bipartite-matching problems have a totally unimodular '
      + 'constraint matrix (every square submatrix has determinant in $\\{-1,0,1\\}$) structurally, '
      + 'so their LP relaxation always already gives the integer answer — but for maximizing '
      + '$x_1+x_2$ subject to $x_1+x_2\\le(1.5)$, $x_1\\le1$, $x_2\\le1$ with integer $x_1,x_2$, the '
      + 'LP optimum is $(1.5)$ while the true integer optimum is 1 — an integrality gap of $(0.5)$, '
      + 'since this constraint matrix is NOT totally unimodular. General ILPs (knapsack, TSP, 0/1 '
      + "programs) have NO such structural shortcut, and their gap can be arbitrarily large — "
      + 'assuming a zero gap without checking total unimodularity is never valid.',
    targetedMisconceptions: [`${INTEGER_PROGRAMMING}:MC-1`, `${INTEGER_PROGRAMMING}:MC-2`, `${INTEGER_PROGRAMMING}:MC-3`],
    source: eb(INTEGER_PROGRAMMING, 'Core Understanding — rounding an LP relaxation\'s solution never being a valid substitute for exact integer optimization since it can violate constraints entirely or land arbitrarily far from the true optimum, branch-and-bound never being brute-force enumeration since the LP bound at each node prunes entire subtrees before they are fully explored, and a zero integrality gap never being the default expectation since it requires the specific structural property of total unimodularity'),
  },
  {
    conceptId: QUADRATIC_PROGRAMMING, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A QUADRATIC PROGRAM IS NEVER ASSUMED CONVEX BY DEFAULT — CONVEXITY REQUIRES CHECKING THAT '
      + 'THE OBJECTIVE MATRIX IS POSITIVE SEMIDEFINITE, AND AN INDEFINITE MATRIX MAKES THE PROBLEM '
      + 'A GENUINE SADDLE, NEVER A BOWL: for $Q=\\begin{pmatrix}1&3\\\\3&1\\end{pmatrix}$, '
      + '$\\det(Q)=1-9=-8<0$ — $Q$ is INDEFINITE (eigenvalues $(4)$ and $(-2)$, one positive one '
      + 'negative), so $\\min\\frac12x^TQx$ is NOT convex, a genuine saddle surface. For '
      + '$Q=\\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}$, eigenvalues $(3)$ and $(1)$ are BOTH '
      + 'positive — $Q$ is positive definite, and the problem IS strictly convex. $Q$ must ALWAYS '
      + "be checked before trusting any convexity property or applying a convex solver — never "
      + 'assumed by default just because a problem "looks quadratic."\n\n'
      + 'A POINT SATISFYING THE KKT CONDITIONS IS NEVER AUTOMATICALLY THE GLOBAL MINIMUM FOR A '
      + 'NON-CONVEX QP — KKT IS GLOBALLY SUFFICIENT ONLY UNDER CONVEXITY: for the indefinite '
      + '$Q=\\begin{pmatrix}1&3\\\\3&1\\end{pmatrix}$, the stationary point $x^*=0$ satisfies KKT '
      + '($\\nabla f=Qx=0$) — but $f(1,-1)=\\frac12(1-3-3+1)=(-2)<f(0)=0$, so $x^*=0$ is NOT a '
      + 'minimum despite satisfying every KKT condition. KKT conditions are ALWAYS necessary at '
      + 'any optimum, but a KKT point of a non-convex QP can genuinely be a saddle point, never '
      + 'automatically trusted as globally optimal without checking convexity first.\n\n'
      + 'UNCONSTRAINED LEAST SQUARES IS NEVER THE SAME PROBLEM AS THE GENERAL CONSTRAINED QP — IT '
      + 'IS A SPECIAL CASE WITH A CLOSED-FORM SOLUTION THAT DISAPPEARS ENTIRELY ONCE CONSTRAINTS '
      + 'ARE ADDED BACK: $\\min\\frac12\\|Ax-b\\|^2$ expands to $\\frac12x^TA^TAx-(A^Tb)^Tx+'
      + '\\frac12\\|b\\|^2$, a QP with $Q=A^TA\\succeq0$ that is UNCONSTRAINED and has a genuine '
      + 'CLOSED-FORM solution $x^*=(A^TA)^{-1}A^Tb$. Adding constraints $Ax\\le b$ to the general '
      + 'QP fundamentally changes the problem — NO closed form exists anymore, and active-set or '
      + 'interior-point methods become genuinely required. Both having "a quadratic objective" '
      + 'never makes the unconstrained special case and the harder constrained general problem '
      + 'interchangeable.',
    targetedMisconceptions: [`${QUADRATIC_PROGRAMMING}:MC-1`, `${QUADRATIC_PROGRAMMING}:MC-2`, `${QUADRATIC_PROGRAMMING}:MC-3`],
    source: eb(QUADRATIC_PROGRAMMING, "Core Understanding — a quadratic program never being assumed convex by default since convexity requires checking that the objective matrix is positive semidefinite, a point satisfying the KKT conditions never being automatically the global minimum for a non-convex QP since KKT is globally sufficient only under convexity, and unconstrained least squares never being the same problem as the general constrained QP since it is a special case whose closed form disappears once constraints are added back"),
  },
  {
    conceptId: STOCHASTIC_GRADIENT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A SINGLE STOCHASTIC GRADIENT STEP IS NEVER SYSTEMATICALLY WRONG JUST BECAUSE IT DIFFERS '
      + 'FROM THE TRUE GRADIENT — IT IS AN UNBIASED ESTIMATE WITH HIGH VARIANCE, AND BIAS AND '
      + 'VARIANCE ARE GENUINELY DIFFERENT PROPERTIES: for $f(\\theta)=\\frac13(f_1+f_2+f_3)'
      + '(\\theta)=2\\theta^2$, the true gradient at $\\theta=1$ is $\\nabla f(1)=(4)$. The '
      + 'individual stochastic gradients are $\\nabla f_1(1)=(2)$, $\\nabla f_2(1)=(4)$, '
      + '$\\nabla f_3(1)=(6)$ — their average is exactly $(2+4+6)/3=4=\\nabla f(1)$, EXACTLY '
      + 'matching the true gradient. If the term is chosen UNIFORMLY at random, '
      + '$\\mathbb{E}[\\nabla f_i(\\theta)]=\\nabla f(\\theta)$ ALWAYS — each individual step is '
      + 'off, but in RANDOM directions that average out correctly. Bias means the AVERAGE is '
      + 'wrong; variance means individual estimates SCATTER — SGD has HIGH variance but ZERO '
      + 'bias, never the reverse.\n\n'
      + 'A CONSTANT LEARNING RATE NEVER ACHIEVES EXACT CONVERGENCE FOR SGD — IT LEAVES A '
      + 'PERMANENT NOISE FLOOR THAT ONLY A DECAYING RATE CAN SHRINK TO ZERO: training with a '
      + 'constant learning rate for many steps produces loss OSCILLATING within a fixed band, '
      + 'never settling — because every stochastic gradient step adds noise that never vanishes '
      + 'near the minimum, so the iterates bounce in a permanent noise ball FOREVER. Only a '
      + "DECAYING learning rate satisfying the Robbins-Monro conditions allows that noise ball to "
      + 'SHRINK TO ZERO — a constant rate, however small, NEVER achieves exact convergence for '
      + 'SGD, unlike deterministic full-gradient descent on a strongly convex function.\n\n'
      + 'MINI-BATCH SIZE IS NEVER SCALED DOWN AS THE DATASET GROWS — IT IS A FIXED HYPERPARAMETER '
      + 'WHOSE VARIANCE DEPENDS ONLY ON THE BATCH SIZE ITSELF, NEVER ON THE TOTAL DATASET SIZE: '
      + 'with a million samples, the SAME-sized mini-batch (say 32 or 256) remains a noisy but '
      + 'UNBIASED estimate of the gradient regardless of how large the dataset is. What SCALES '
      + 'with dataset size is the NUMBER OF STEPS PER EPOCH, never the batch size itself — the '
      + 'variance of a mini-batch gradient depends only on the batch size, completely independent '
      + 'of dataset size. Believing "mini-batch" should shrink as the dataset grows confuses batch '
      + 'size with step count, which is a genuinely different quantity.',
    targetedMisconceptions: [`${STOCHASTIC_GRADIENT}:MC-1`, `${STOCHASTIC_GRADIENT}:MC-2`, `${STOCHASTIC_GRADIENT}:MC-3`],
    source: eb(STOCHASTIC_GRADIENT, 'Core Understanding — a single stochastic gradient step never being systematically wrong just because it differs from the true gradient since it is an unbiased estimate with high variance, a constant learning rate never achieving exact convergence for SGD since it leaves a permanent noise floor that only a decaying rate can shrink to zero, and mini-batch size never being scaled down as the dataset grows since it is a fixed hyperparameter whose variance depends only on the batch size itself'),
  },
]

export const MATHEMATICS_OPT_INTEGER_PROGRAMMING_QUADRATIC_PROGRAMMING_STOCHASTIC_GRADIENT_PROBES: SeedProbe[] = [
  {
    conceptId: INTEGER_PROGRAMMING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If you solve the LP relaxation and round the answer to the nearest integer, is that guaranteed to give the optimal (or even a feasible) integer solution?',
    choices: [
      { text: 'No — for maximizing $x_1+x_2$ s.t. $(2x_1+2x_2\\le3)$, the LP relaxation gives $(3/4,3/4)$; rounding up to $(1,1)$ is infeasible, while rounding down to $(0,0)$ misses the true optimum of 1', isCorrect: true },
      { text: 'Yes — rounding the LP relaxation solution to the nearest integer always gives the optimal integer solution', isCorrect: false, misconceptionId: `${INTEGER_PROGRAMMING}:MC-1` },
      { text: "Yes, since integer programs are just linear programs with rounding applied at the end", isCorrect: false, misconceptionId: `${INTEGER_PROGRAMMING}:MC-1` },
    ],
    targetedMisconceptions: [`${INTEGER_PROGRAMMING}:MC-1`],
    source: eb(INTEGER_PROGRAMMING, 'Discovery Question 1 as a detection probe (verbatim) — whether rounding the LP relaxation gives the optimal integer solution, an answer of "yes" confirming IP-IS-JUST-LP-WITH-ROUNDING'),
  },
  {
    conceptId: INTEGER_PROGRAMMING, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does branch-and-bound examine every one of the $(2^n)$ possible integer combinations?',
    choices: [
      { text: 'No — the LP bound computed at each node can prune an entire unexplored subtree in one step, without ever fully solving it; a small example explores just 5 nodes to reach the optimum, with one branch pruned immediately', isCorrect: true },
      { text: 'Yes — branch-and-bound is equivalent to exhaustively enumerating every integer point in the feasible region', isCorrect: false, misconceptionId: `${INTEGER_PROGRAMMING}:MC-2` },
      { text: "Yes, since the 'branch' step always explores every possible combination before any bound is applied", isCorrect: false, misconceptionId: `${INTEGER_PROGRAMMING}:MC-2` },
    ],
    targetedMisconceptions: [`${INTEGER_PROGRAMMING}:MC-2`],
    source: eb(INTEGER_PROGRAMMING, 'Discovery Question 2 as a detection probe (verbatim) — whether branch-and-bound examines every combination, an answer of "yes" confirming BRANCH-AND-BOUND-IS-BRUTE-FORCE'),
  },
  {
    conceptId: INTEGER_PROGRAMMING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the LP relaxation\'s optimal value always equal to — or very close to — the true integer program\'s optimal value?',
    choices: [
      { text: 'No — a zero integrality gap requires the constraint matrix to be totally unimodular; for a general problem without that structural property, the LP optimum can exceed the true integer optimum by a genuine gap', isCorrect: true },
      { text: 'Yes — the LP relaxation always gives the same or a very close value to the true integer program optimum', isCorrect: false, misconceptionId: `${INTEGER_PROGRAMMING}:MC-3` },
      { text: "Yes, since dropping the integrality constraint never meaningfully changes the optimal value", isCorrect: false, misconceptionId: `${INTEGER_PROGRAMMING}:MC-3` },
    ],
    targetedMisconceptions: [`${INTEGER_PROGRAMMING}:MC-3`],
    source: eb(INTEGER_PROGRAMMING, 'Discovery Question 3 as a detection probe (verbatim) — whether the LP relaxation is always tight against the true IP optimum, an answer of "yes" confirming LP-RELAXATION-ALWAYS-TIGHT'),
  },
  {
    conceptId: QUADRATIC_PROGRAMMING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is every quadratic program automatically convex?',
    choices: [
      { text: 'No — for $Q=\\begin{pmatrix}1&3\\\\3&1\\end{pmatrix}$, $\\det(Q)<0$, so $Q$ is indefinite (one positive, one negative eigenvalue) and the problem is a genuine saddle, not convex; convexity must always be checked via Q\'s eigenvalues', isCorrect: true },
      { text: 'Yes — any optimization problem with a quadratic objective is automatically convex', isCorrect: false, misconceptionId: `${QUADRATIC_PROGRAMMING}:MC-1` },
      { text: "Yes, since quadratic programs are a well-behaved special case that never needs a convexity check", isCorrect: false, misconceptionId: `${QUADRATIC_PROGRAMMING}:MC-1` },
    ],
    targetedMisconceptions: [`${QUADRATIC_PROGRAMMING}:MC-1`],
    source: eb(QUADRATIC_PROGRAMMING, 'Discovery Question 1 as a detection probe (verbatim) — whether every QP is automatically convex, an answer of "yes" confirming QP-ALWAYS-CONVEX'),
  },
  {
    conceptId: QUADRATIC_PROGRAMMING, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If a point satisfies the KKT conditions, is it automatically a global minimum?',
    choices: [
      { text: 'No — for indefinite $Q=\\begin{pmatrix}1&3\\\\3&1\\end{pmatrix}$, the stationary point x*=0 satisfies KKT, yet f(1,-1) is strictly less than f(0), so x*=0 is not a minimum; KKT is globally sufficient only when Q is positive semidefinite', isCorrect: true },
      { text: 'Yes — satisfying the KKT conditions is always sufficient to guarantee a global minimum for a quadratic program', isCorrect: false, misconceptionId: `${QUADRATIC_PROGRAMMING}:MC-2` },
      { text: "Yes, since KKT conditions certify global optimality regardless of the objective matrix's structure", isCorrect: false, misconceptionId: `${QUADRATIC_PROGRAMMING}:MC-2` },
    ],
    targetedMisconceptions: [`${QUADRATIC_PROGRAMMING}:MC-2`],
    source: eb(QUADRATIC_PROGRAMMING, 'Discovery Question 2 as a detection probe (verbatim) — whether a KKT point is automatically a global minimum, an answer of "yes" confirming KKT-SUFFICIENT-WITHOUT-CONVEXITY'),
  },
  {
    conceptId: QUADRATIC_PROGRAMMING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is unconstrained least squares the same problem as a general constrained QP?',
    choices: [
      { text: 'No — unconstrained least squares is a special case of QP with a genuine closed-form solution; adding constraints back to the general QP fundamentally changes the problem, and no closed form exists anymore', isCorrect: true },
      { text: 'Yes — since both have a quadratic objective, unconstrained least squares and the general constrained QP are the same problem', isCorrect: false, misconceptionId: `${QUADRATIC_PROGRAMMING}:MC-3` },
      { text: "Yes, since a closed-form solution exists for any quadratic program regardless of constraints", isCorrect: false, misconceptionId: `${QUADRATIC_PROGRAMMING}:MC-3` },
    ],
    targetedMisconceptions: [`${QUADRATIC_PROGRAMMING}:MC-3`],
    source: eb(QUADRATIC_PROGRAMMING, 'Discovery Question 3 as a detection probe (verbatim) — whether unconstrained least squares is the same as a general constrained QP, an answer of "yes" confirming QP-SAME-AS-LS'),
  },
  {
    conceptId: STOCHASTIC_GRADIENT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does using a single randomly selected gradient instead of the true gradient introduce a systematic bias?',
    choices: [
      { text: 'No — the expected value of a uniformly-chosen stochastic gradient exactly equals the true gradient; each individual step is off, but in random directions that average out correctly, giving high variance with zero bias', isCorrect: true },
      { text: 'Yes — using a single randomly selected gradient term systematically introduces a bias away from the true gradient direction', isCorrect: false, misconceptionId: `${STOCHASTIC_GRADIENT}:MC-1` },
      { text: "Yes, since any deviation from the exact true gradient counts as a bias error by definition", isCorrect: false, misconceptionId: `${STOCHASTIC_GRADIENT}:MC-1` },
    ],
    targetedMisconceptions: [`${STOCHASTIC_GRADIENT}:MC-1`],
    source: eb(STOCHASTIC_GRADIENT, 'Discovery Question 1 as a detection probe (verbatim) — whether a stochastic gradient introduces systematic bias, an answer of "yes" confirming SGD-UPDATE-IS-WRONG-GRADIENT'),
  },
  {
    conceptId: STOCHASTIC_GRADIENT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does a constant learning rate guarantee SGD converges to the exact minimum?',
    choices: [
      { text: 'No — a constant learning rate leaves a permanent noise floor since every stochastic step adds noise that never vanishes near the minimum; only a decaying learning rate lets that noise ball shrink to zero', isCorrect: true },
      { text: 'Yes — a constant, sufficiently small learning rate guarantees SGD converges exactly to the minimum, just as it does for deterministic gradient descent', isCorrect: false, misconceptionId: `${STOCHASTIC_GRADIENT}:MC-2` },
      { text: "Yes, since any positive learning rate eventually drives SGD's iterates to the exact minimum", isCorrect: false, misconceptionId: `${STOCHASTIC_GRADIENT}:MC-2` },
    ],
    targetedMisconceptions: [`${STOCHASTIC_GRADIENT}:MC-2`],
    source: eb(STOCHASTIC_GRADIENT, 'Discovery Question 2 as a detection probe (verbatim) — whether a constant learning rate guarantees exact SGD convergence, an answer of "yes" confirming CONSTANT-LR-ALWAYS-CONVERGES'),
  },
  {
    conceptId: STOCHASTIC_GRADIENT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Should mini-batch size decrease as the dataset size grows?',
    choices: [
      { text: 'No — mini-batch size is a fixed hyperparameter whose gradient variance depends only on the batch size itself, never on dataset size; what scales with dataset size is the number of steps per epoch, not the batch size', isCorrect: true },
      { text: 'Yes — as the dataset grows larger, the mini-batch size should shrink proportionally to keep training efficient', isCorrect: false, misconceptionId: `${STOCHASTIC_GRADIENT}:MC-3` },
      { text: "Yes, since a larger dataset means each mini-batch should represent a smaller fraction of the whole", isCorrect: false, misconceptionId: `${STOCHASTIC_GRADIENT}:MC-3` },
    ],
    targetedMisconceptions: [`${STOCHASTIC_GRADIENT}:MC-3`],
    source: eb(STOCHASTIC_GRADIENT, 'Discovery Question 3 as a detection probe (verbatim) — whether mini-batch size should decrease as dataset size grows, an answer of "yes" confirming MORE-DATA-MEANS-SMALLER-BATCH'),
  },
]
