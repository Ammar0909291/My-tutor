/**
 * Batch: convex-optimization, gradient-methods, lagrange-multipliers
 * (math.opt).
 *
 * Continues math.opt (3/16 -> 6/16). Fresh frontier recompute found 4
 * ready concepts (`convex-optimization`, `dynamic-programming`,
 * `gradient-methods`, `lagrange-multipliers`); these 3 selected since each
 * unlocks further concepts (convex-optimization -> duality, gradient-
 * methods -> stochastic-gradient + newton-optimization, lagrange-
 * multipliers -> kkt) — `dynamic-programming` again deferred, since it
 * unlocks nothing and remains a distinct expert-level topic disconnected
 * from this convex-optimization chain. Transcribed from the frozen
 * Educational Brain entries at educational-brain/concepts/mathematics/
 * math.opt.{convex-optimization,gradient-methods,lagrange-multipliers}.md.
 *
 * Grade band: all three retain GradeBand.UNDERGRADUATE, matching math.opt's
 * established domain baseline. convex-optimization requires math.opt.
 * convex-function and math.opt.convex-set (both UNDERGRADUATE, authored
 * this campaign's opening math.opt batch). gradient-methods requires
 * math.opt.unconstrained-optimization (UNDERGRADUATE) and math.calc.
 * gradient (not yet an EB entry, reused conceptually per its own Blueprint
 * citation — does not affect grade band, which follows only authored
 * prerequisites already carrying a grade band). lagrange-multipliers
 * requires math.calc.partial-derivatives (not yet an EB entry, same
 * handling) and math.opt.unconstrained-optimization (UNDERGRADUATE).
 *
 *   CONVEX-OPTIMIZATION  For a convex objective over a convex feasible
 *           set, a LOCAL minimum is ALWAYS the GLOBAL minimum — never
 *           merely a candidate requiring further search, extending
 *           convex-function's own theorem via the feasible set's own
 *           convexity; at a CONSTRAINED optimum, the gradient does NOT
 *           need to vanish — it only needs to satisfy the variational
 *           inequality (point in no feasible-improving direction), never
 *           the unconstrained $\nabla f=0$ condition alone; a problem is
 *           convex ONLY when BOTH the objective AND the feasible set are
 *           convex — convexity of the feasible set ALONE is never
 *           sufficient.
 *   GRADIENT-METHODS  Gradient descent moves in the NEGATIVE gradient
 *           direction, never the gradient's own direction — subtracting,
 *           never adding; ANY positive step size is NEVER automatically
 *           sufficient for convergence — too large a step size can cause
 *           genuine DIVERGENCE even on a simple convex quadratic;
 *           convergence rate is NEVER uniform across all convex functions
 *           — merely convex functions get only sublinear $O(1/k)$
 *           convergence, while STRONGLY convex functions earn a
 *           genuinely faster linear (geometric) guarantee.
 *   LAGRANGE-MULTIPLIERS  The constrained condition $\nabla
 *           f=\lambda\nabla g$ is NEVER unrelated to the unconstrained
 *           $\nabla f=0$ condition — it is a direct generalization that
 *           collapses exactly to $\nabla f=0$ when the constraint gradient
 *           vanishes; the parallel-gradient condition is NEVER an
 *           arbitrary algebraic recipe — it has a direct GEOMETRIC tangency
 *           meaning (the objective's level curve is tangent to the
 *           constraint curve at the optimum); the solved value of
 *           $\lambda$ is NEVER a disposable intermediate quantity — it
 *           carries a genuine SHADOW-PRICE interpretation, the rate of
 *           change of the optimal objective value under a small constraint
 *           relaxation.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const CONVEX_OPTIMIZATION = 'math.opt.convex-optimization'
const GRADIENT_METHODS = 'math.opt.gradient-methods'
const LAGRANGE_MULTIPLIERS = 'math.opt.lagrange-multipliers'

export const MATHEMATICS_OPT_CONVEX_OPTIMIZATION_GRADIENT_METHODS_LAGRANGE_MULTIPLIERS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CONVEX_OPTIMIZATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'FOR A CONVEX OBJECTIVE OVER A CONVEX FEASIBLE SET, A LOCAL MINIMUM IS ALWAYS THE GLOBAL '
      + 'MINIMUM — NEVER MERELY A CANDIDATE REQUIRING FURTHER SEARCH: this is convex-function\'s own '
      + 'every-local-min-is-global theorem, extended directly to a constrained feasible set $C$ — the '
      + 'identical proof-by-contradiction structure applies, now using $C$\'s own convexity to '
      + 'guarantee the segment toward any hypothetically better point stays feasible throughout. '
      + "Applying random restarts or simulated annealing to escape a supposed \"local trap\" is never "
      + 'necessary for a genuinely convex problem — finding ANY local minimum suffices to find THE '
      + 'minimum.\n\n'
      + 'AT A CONSTRAINED OPTIMUM, THE GRADIENT DOES NOT NEED TO VANISH — IT ONLY NEEDS TO SATISFY '
      + "THE VARIATIONAL INEQUALITY, NEVER THE UNCONSTRAINED $\\nabla f=0$ CONDITION ALONE: for "
      + '$\\min x^2+y^2$ subject to $x+y\\ge1$, the unconstrained minimum $(0,0)$ is infeasible; the '
      + 'genuine constrained optimum is $(1/2,1/2)$ where $\\nabla f=(1,1)\\neq0$ — yet the '
      + 'variational inequality $\\langle\\nabla f(x^*),y-x^*\\rangle\\ge0$ holds for EVERY feasible '
      + '$y$. On the boundary of a feasible set, the gradient need only point in a direction from '
      + 'which every FEASIBLE direction is non-improving, never literally zero.\n\n'
      + 'A PROBLEM IS CONVEX ONLY WHEN BOTH THE OBJECTIVE AND THE FEASIBLE SET ARE CONVEX — '
      + 'CONVEXITY OF THE FEASIBLE SET ALONE IS NEVER SUFFICIENT: for $\\min\\sin x$ subject to '
      + '$x\\in[0,4\\pi]$ — a genuinely convex feasible interval — the non-convex objective $\\sin x$ '
      + 'still produces MULTIPLE genuinely distinct local minima across that interval, despite the '
      + "feasible set's own convexity. Verifying only the feasible set's convexity and stopping there "
      + 'is never enough to guarantee tractability; the objective\'s own convexity is a SEPARATE, '
      + 'equally necessary requirement.',
    targetedMisconceptions: [`${CONVEX_OPTIMIZATION}:MC-1`, `${CONVEX_OPTIMIZATION}:MC-2`, `${CONVEX_OPTIMIZATION}:MC-3`],
    source: eb(CONVEX_OPTIMIZATION, "Core Understanding — a local minimum of a convex objective over a convex feasible set always being the global minimum never merely a candidate requiring further search, a constrained optimum's gradient never needing to vanish but only needing to satisfy the variational inequality never the unconstrained condition alone, and a problem being convex only when both the objective and feasible set are convex since convexity of the feasible set alone is never sufficient"),
  },
  {
    conceptId: GRADIENT_METHODS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'GRADIENT DESCENT MOVES IN THE NEGATIVE GRADIENT DIRECTION, NEVER THE GRADIENT\'S OWN '
      + 'DIRECTION — SUBTRACTING, NEVER ADDING: since $\\nabla f$ points toward steepest ASCENT, '
      + 'seeking a minimum requires moving in the OPPOSITE direction, $-\\nabla f(x_k)$, giving the '
      + 'update $x_{k+1}=x_k-\\alpha_k\\nabla f(x_k)$. For $f(x)=x^2$ starting at $x_0=4$ with '
      + '$\\alpha=0.1$: the correct iteration gives $x_1=3.2,x_2=2.56,\\ldots$, moving steadily '
      + 'toward the minimum at $x=0$; the wrong-sign alternative (adding instead of subtracting) '
      + 'gives $x_1=4.8$, moving AWAY from the minimum instead.\n\n'
      + 'ANY POSITIVE STEP SIZE IS NEVER AUTOMATICALLY SUFFICIENT FOR CONVERGENCE — TOO LARGE A '
      + 'STEP SIZE CAN CAUSE GENUINE DIVERGENCE, EVEN ON A SIMPLE CONVEX QUADRATIC: for the same '
      + '$f(x)=x^2$, $x_0=4$, but with $\\alpha=1.5$: the iteration gives $x_1=-8,x_2=16,x_3=-32,'
      + '\\ldots$ — growing in magnitude with every step, genuinely diverging despite moving in the '
      + 'correct descent direction throughout. Moving the right WAY is never sufficient on its own; '
      + 'the step SIZE must also be small enough to avoid overshooting past the minimum.\n\n'
      + 'CONVERGENCE RATE IS NEVER UNIFORM ACROSS ALL CONVEX FUNCTIONS — MERELY CONVEX FUNCTIONS '
      + 'GET ONLY SUBLINEAR $O(1/k)$ CONVERGENCE, WHILE STRONGLY CONVEX FUNCTIONS EARN A GENUINELY '
      + 'FASTER LINEAR (GEOMETRIC) GUARANTEE: for $f(x)=x^2$ with $\\alpha=0.1$, the error ratio '
      + '$e_{k+1}=0.8e_k$ exactly — a clean geometric convergence, since $f$ is strongly convex. '
      + 'Contrast $f(x)=x^4$ near its flat minimum, where the strong-convexity condition genuinely '
      + 'fails and only the weaker $O(1/k)$ sublinear guarantee applies. "Convex" is never one '
      + 'uniform category with one uniform convergence behavior — the function\'s OWN structure, not '
      + 'gradient descent itself, determines which guarantee holds.',
    targetedMisconceptions: [`${GRADIENT_METHODS}:MC-1`, `${GRADIENT_METHODS}:MC-2`, `${GRADIENT_METHODS}:MC-3`],
    source: eb(GRADIENT_METHODS, 'Core Understanding — gradient descent moving in the negative gradient direction never the gradient\'s own direction, any positive step size never being automatically sufficient for convergence since too large a step size can cause genuine divergence even on a simple convex quadratic, and convergence rate never being uniform across all convex functions since merely convex functions get only sublinear convergence while strongly convex functions earn a faster linear guarantee'),
  },
  {
    conceptId: LAGRANGE_MULTIPLIERS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE CONSTRAINED CONDITION $\\nabla f=\\lambda\\nabla g$ IS NEVER UNRELATED TO THE '
      + 'UNCONSTRAINED $\\nabla f=0$ CONDITION — IT IS A DIRECT GENERALIZATION THAT COLLAPSES '
      + 'EXACTLY TO $\\nabla f=0$ WHEN THE CONSTRAINT GRADIENT VANISHES: minimizing $f(x,y)=x^2+y^2$ '
      + 'with the trivial constraint $g(x,y)=0\\cdot x+0\\cdot y=0$ (satisfied everywhere, so '
      + '$\\nabla g=(0,0)$) forces $\\nabla f=\\lambda(0,0)=(0,0)$ for ANY $\\lambda$ — recovering '
      + "the unconstrained condition exactly. A new symbol and a visibly different equation are never "
      + 'evidence of an entirely separate idea; the reduction to $\\nabla f=0$ happens automatically '
      + 'the moment the constraint stops genuinely restricting movement.\n\n'
      + 'THE PARALLEL-GRADIENT CONDITION IS NEVER AN ARBITRARY ALGEBRAIC RECIPE — IT HAS A DIRECT '
      + 'GEOMETRIC TANGENCY MEANING: for ANY tangent direction $\\mathbf{t}$ along the constraint, '
      + 'if $\\nabla f\\cdot\\mathbf{t}\\neq0$, moving along (or against) $\\mathbf{t}$ would strictly '
      + 'IMPROVE $f$ while staying feasible — contradicting optimality. So $\\nabla f$ must have NO '
      + 'tangential component, meaning it points purely along the constraint\'s NORMAL direction — '
      + 'exactly $\\lambda\\nabla g$. Minimizing $f(x,y)=x^2+y^2$ subject to $x+y-4=0$ solves to '
      + '$(2,2)$, $\\lambda=4$, and the circle $x^2+y^2=8$ is genuinely, visibly TANGENT to the line '
      + '$x+y=4$ at that exact point — never merely a memorized algebraic step.\n\n'
      + 'THE SOLVED VALUE OF $\\lambda$ IS NEVER A DISPOSABLE INTERMEDIATE QUANTITY — IT CARRIES A '
      + 'GENUINE SHADOW-PRICE INTERPRETATION: $\\lambda$ measures the RATE OF CHANGE of the optimal '
      + 'objective value under a small RELAXATION of the constraint. Minimizing cost '
      + '$f(x,y)=2x^2+3y^2$ subject to $x+y-10=0$ solves to $\\lambda=24$, minimum cost $120$ — and '
      + 'relaxing the constraint to $10.1$ predicts a cost INCREASE of approximately '
      + '$\\lambda\\times0.1=2.4$, WITHOUT re-solving the entire problem from scratch. Discarding '
      + '$\\lambda$ once $(x,y)$ is found throws away this genuinely useful economic/physical '
      + 'information.',
    targetedMisconceptions: [`${LAGRANGE_MULTIPLIERS}:MC-1`, `${LAGRANGE_MULTIPLIERS}:MC-2`, `${LAGRANGE_MULTIPLIERS}:MC-3`],
    source: eb(LAGRANGE_MULTIPLIERS, 'Core Understanding — the constrained condition never being unrelated to the unconstrained condition since it is a direct generalization collapsing exactly to gradient-zero when the constraint gradient vanishes, the parallel-gradient condition never being an arbitrary algebraic recipe since it has a direct geometric tangency meaning, and the solved value of lambda never being a disposable intermediate quantity since it carries a genuine shadow-price interpretation'),
  },
]

export const MATHEMATICS_OPT_CONVEX_OPTIMIZATION_GRADIENT_METHODS_LAGRANGE_MULTIPLIERS_PROBES: SeedProbe[] = [
  {
    conceptId: CONVEX_OPTIMIZATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For a convex function over a convex feasible set, can a local minimum fail to be the global minimum?',
    choices: [
      { text: 'No — the fundamental theorem of convex optimization extends convex-function\'s every-local-min-is-global theorem directly, using the feasible set\'s own convexity to keep the proof-by-contradiction segment feasible', isCorrect: true },
      { text: 'Yes — like non-convex problems, a convex problem over a convex feasible set can still have local minima that are not global', isCorrect: false, misconceptionId: `${CONVEX_OPTIMIZATION}:MC-1` },
      { text: "Yes, since the convexity guarantee only applies to unconstrained problems, never constrained ones", isCorrect: false, misconceptionId: `${CONVEX_OPTIMIZATION}:MC-1` },
    ],
    targetedMisconceptions: [`${CONVEX_OPTIMIZATION}:MC-1`],
    source: eb(CONVEX_OPTIMIZATION, 'Discovery Question 1 as a detection probe (verbatim) — whether a local minimum can fail to be global for a convex problem over a convex feasible set, an answer of "yes" confirming LOCAL-IS-NOT-GLOBAL-FOR-CONVEX'),
  },
  {
    conceptId: CONVEX_OPTIMIZATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'At a constrained optimum, does the gradient $\\nabla f(x^*)$ have to equal zero, the way it does in the unconstrained case?',
    choices: [
      { text: 'No — for $\\min x^2+y^2$ s.t. $x+y\\ge1$, the constrained optimum $(1/2,1/2)$ has $\\nabla f=(1,1)\\neq0$, yet the variational inequality holds for every feasible point, confirming optimality without a vanishing gradient', isCorrect: true },
      { text: 'Yes — the constrained optimality condition is identical to the unconstrained one: the gradient must vanish entirely at the optimum', isCorrect: false, misconceptionId: `${CONVEX_OPTIMIZATION}:MC-2` },
      { text: "Yes, since the same $\\nabla f=0$ test that works unconstrained also fully determines constrained optimality", isCorrect: false, misconceptionId: `${CONVEX_OPTIMIZATION}:MC-2` },
    ],
    targetedMisconceptions: [`${CONVEX_OPTIMIZATION}:MC-2`],
    source: eb(CONVEX_OPTIMIZATION, 'Discovery Question 2 as a detection probe (verbatim) — whether the gradient must vanish at a constrained optimum, an answer of "yes" confirming GRADIENT-ZERO-SUFFICIENT-CONSTRAINED'),
  },
  {
    conceptId: CONVEX_OPTIMIZATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If the feasible set $C$ is convex, is that alone enough to guarantee the optimization problem is convex?',
    choices: [
      { text: 'No — for $\\min\\sin x$ s.t. $x\\in[0,4\\pi]$ (a convex feasible interval), the non-convex objective still produces multiple genuinely distinct local minima; the objective must ALSO be convex, independently of the feasible set', isCorrect: true },
      { text: 'Yes — as long as the feasible set is convex, the whole optimization problem is guaranteed convex regardless of the objective', isCorrect: false, misconceptionId: `${CONVEX_OPTIMIZATION}:MC-3` },
      { text: "Yes, since a convex feasible set is the only requirement for tractable optimization", isCorrect: false, misconceptionId: `${CONVEX_OPTIMIZATION}:MC-3` },
    ],
    targetedMisconceptions: [`${CONVEX_OPTIMIZATION}:MC-3`],
    source: eb(CONVEX_OPTIMIZATION, 'Discovery Question 3 as a detection probe (verbatim) — whether a convex feasible set alone guarantees a convex problem, an answer of "yes" confirming CONVEXITY-OF-FEASIBLE-SET-ENOUGH'),
  },
  {
    conceptId: GRADIENT_METHODS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does gradient descent move in the direction of the gradient, $\\nabla f(x_k)$, or the opposite direction?',
    choices: [
      { text: 'The opposite direction — since $\\nabla f$ points toward steepest ascent, minimizing $f$ requires moving along $-\\nabla f(x_k)$, the direction of steepest descent; the update subtracts the gradient, never adds it', isCorrect: true },
      { text: 'The direction of the gradient itself — moving toward $\\nabla f(x_k)$ leads to the minimum', isCorrect: false, misconceptionId: `${GRADIENT_METHODS}:MC-1` },
      { text: "Either direction works equally well, since the gradient just indicates a rate of change", isCorrect: false, misconceptionId: `${GRADIENT_METHODS}:MC-1` },
    ],
    targetedMisconceptions: [`${GRADIENT_METHODS}:MC-1`],
    source: eb(GRADIENT_METHODS, 'Discovery Question 1 as a detection probe (verbatim) — whether gradient descent moves toward the gradient or its opposite, an answer favoring the gradient\'s own direction confirming GRADIENT-DESCENT-DIRECTION-SIGN-ERROR'),
  },
  {
    conceptId: GRADIENT_METHODS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'As long as the step size is positive, is gradient descent guaranteed to converge to the minimum?',
    choices: [
      { text: 'No — for $f(x)=x^2$, $x_0=4$, $\\alpha=1.5$, the iterates $x_1=-8,x_2=16,x_3=-32,\\ldots$ grow in magnitude and diverge, despite moving in the correct direction with a positive step size throughout', isCorrect: true },
      { text: 'Yes — any positive step size, combined with the correct descent direction, is sufficient to guarantee convergence', isCorrect: false, misconceptionId: `${GRADIENT_METHODS}:MC-2` },
      { text: "Yes, since moving the right way at all necessarily makes progress toward the minimum", isCorrect: false, misconceptionId: `${GRADIENT_METHODS}:MC-2` },
    ],
    targetedMisconceptions: [`${GRADIENT_METHODS}:MC-2`],
    source: eb(GRADIENT_METHODS, 'Discovery Question 2 as a detection probe (verbatim) — whether any positive step size guarantees convergence, an answer of "yes" confirming ANY-POSITIVE-STEP-SIZE-ASSUMED-SUFFICIENT'),
  },
  {
    conceptId: GRADIENT_METHODS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does gradient descent converge at the same rate for every convex function, strongly convex or not?',
    choices: [
      { text: 'No — for $f(x)=x^2$ (strongly convex), the error shrinks geometrically ($e_{k+1}=0.8e_k$); for $f(x)=x^4$ near its flat minimum (merely convex), only the weaker $O(1/k)$ sublinear guarantee applies', isCorrect: true },
      { text: 'Yes — all convex functions, regardless of whether they are strongly convex, share the identical convergence rate under gradient descent', isCorrect: false, misconceptionId: `${GRADIENT_METHODS}:MC-3` },
      { text: "Yes, since convexity alone fully determines the convergence rate without any further distinction", isCorrect: false, misconceptionId: `${GRADIENT_METHODS}:MC-3` },
    ],
    targetedMisconceptions: [`${GRADIENT_METHODS}:MC-3`],
    source: eb(GRADIENT_METHODS, 'Discovery Question 3 as a detection probe (verbatim) — whether convergence rate is uniform across all convex functions, an answer of "yes" confirming CONVERGENCE-RATE-ASSUMED-UNIFORM-ACROSS-ALL-CONVEX-FUNCTIONS'),
  },
  {
    conceptId: LAGRANGE_MULTIPLIERS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the constrained optimality condition $\\nabla f=\\lambda\\nabla g$ a completely separate, unrelated idea from the unconstrained $\\nabla f=0$ condition, or a direct generalization of it?',
    choices: [
      { text: 'A direct generalization — when the constraint gradient $\\nabla g$ vanishes (a trivial or degenerate constraint), $\\nabla f=\\lambda\\nabla g$ collapses exactly to $\\nabla f=0$ for any $\\lambda$, recovering the unconstrained condition precisely', isCorrect: true },
      { text: 'A completely separate, unrelated idea with no connection to the unconstrained condition', isCorrect: false, misconceptionId: `${LAGRANGE_MULTIPLIERS}:MC-1` },
      { text: "An entirely different method that happens to coincidentally resemble the unconstrained one", isCorrect: false, misconceptionId: `${LAGRANGE_MULTIPLIERS}:MC-1` },
    ],
    targetedMisconceptions: [`${LAGRANGE_MULTIPLIERS}:MC-1`],
    source: eb(LAGRANGE_MULTIPLIERS, 'Discovery Question 1 as a detection probe (verbatim) — whether the Lagrange condition is unrelated to the unconstrained condition, an answer of "unrelated" confirming LAGRANGE-CONDITION-ASSUMED-UNRELATED-TO-UNCONSTRAINED'),
  },
  {
    conceptId: LAGRANGE_MULTIPLIERS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the parallel-gradient condition have a genuine geometric meaning, or is it simply an algebraic recipe with no deeper interpretation?',
    choices: [
      { text: 'A genuine geometric meaning — at the optimum, the objective\'s level curve is tangent to the constraint curve; for minimizing $x^2+y^2$ subject to $x+y=4$, the circle $x^2+y^2=8$ is visibly tangent to the line at the solved point $(2,2)$', isCorrect: true },
      { text: 'Simply an algebraic recipe with no deeper geometric interpretation — just set the gradients proportional and solve', isCorrect: false, misconceptionId: `${LAGRANGE_MULTIPLIERS}:MC-2` },
      { text: "An arbitrary convention with no connection to the geometry of the constraint curve", isCorrect: false, misconceptionId: `${LAGRANGE_MULTIPLIERS}:MC-2` },
    ],
    targetedMisconceptions: [`${LAGRANGE_MULTIPLIERS}:MC-2`],
    source: eb(LAGRANGE_MULTIPLIERS, 'Discovery Question 2 as a detection probe (verbatim) — whether the parallel-gradient condition has geometric meaning, an answer treating it as a mere algebraic recipe confirming PARALLEL-GRADIENT-CONDITION-ASSUMED-ARBITRARY'),
  },
  {
    conceptId: LAGRANGE_MULTIPLIERS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Once you\'ve solved for the optimal $(x,y)$, does the specific numerical value of $\\lambda$ carry any further useful meaning, or can it be discarded?',
    choices: [
      { text: 'It carries genuine further meaning — $\\lambda$ is the constraint\'s shadow price, predicting the rate of change of the optimal objective under a small constraint relaxation, without needing to re-solve the problem', isCorrect: true },
      { text: 'It can be discarded — $\\lambda$ is only a disposable intermediate quantity used to solve for $(x,y)$', isCorrect: false, misconceptionId: `${LAGRANGE_MULTIPLIERS}:MC-3` },
      { text: "It has no interpretation beyond being a formal algebraic variable introduced to balance the equations", isCorrect: false, misconceptionId: `${LAGRANGE_MULTIPLIERS}:MC-3` },
    ],
    targetedMisconceptions: [`${LAGRANGE_MULTIPLIERS}:MC-3`],
    source: eb(LAGRANGE_MULTIPLIERS, 'Discovery Question 3 as a detection probe (verbatim) — whether the solved lambda carries further meaning or can be discarded, an answer treating it as disposable confirming LAMBDA-ASSUMED-DISPOSABLE'),
  },
]
