/**
 * Batch: convex-function, convex-set, unconstrained-optimization
 * (math.opt) — OPENS THE DOMAIN.
 *
 * Opens math.opt (0/16 -> 3/16), the next domain per the campaign handover
 * doc's recommendation after math.graph's completion and math.prob's
 * remaining 2 concepts confirmed genuinely blocked. Fresh frontier
 * recompute found 4 ready concepts (`convex-function`, `convex-set`,
 * `dynamic-programming`, `unconstrained-optimization`); these 3 selected
 * since all directly feed `math.opt.convex-optimization` (convex-function
 * and convex-set as direct prerequisites, unconstrained-optimization also
 * unlocking `math.opt.gradient-methods`) — `dynamic-programming` is a
 * distinct expert-level topic not connected to this convex-optimization
 * chain, deferred to a future batch. Transcribed from the frozen
 * Educational Brain entries at educational-brain/concepts/mathematics/
 * math.opt.{convex-function,convex-set,unconstrained-optimization}.md.
 *
 * Grade band: all three adopt GradeBand.UNDERGRADUATE, establishing
 * math.opt's domain baseline. convex-function requires math.calc.concavity
 * (UNDERGRADUATE); convex-set requires math.linalg.vector
 * (UNDERGRADUATE); unconstrained-optimization requires math.calc.critical-
 * points and math.calc.concavity (both UNDERGRADUATE). Unlike math.disc/
 * math.graph/math.prob (all HIGH-baseline domains whose content stays
 * within high-school-adjacent discrete math), math.opt's core machinery
 * (chord inequalities, Hessians, gradient vectors) is inseparable from
 * undergraduate calculus/linear-algebra prerequisites from its very first
 * concepts, so UNDERGRADUATE is the correct baseline for the whole domain,
 * not merely an override for select concepts.
 *
 *   CONVEX-FUNCTION  The chord inequality is NON-STRICT ($\le$), so linear
 *           functions ARE convex (equality throughout) — convexity never
 *           requires visible curvature; every LOCAL minimum of a convex
 *           function is automatically GLOBAL (proof by contradiction via
 *           the chord inequality itself), never merely "usually" global;
 *           the chord-inequality definition and the Hessian positive-
 *           semidefinite criterion are two ROUTES to the IDENTICAL
 *           conclusion, never two independently-checked, potentially-
 *           disagreeing properties.
 *   CONVEX-SET  A set with sharp corners (a square) can be JUST AS CONVEX
 *           as a smooth disk — convexity is about interior CONTENT, never
 *           boundary smoothness; INTERSECTION of convex sets is ALWAYS
 *           convex, but UNION is NOT, in general — the two operations
 *           behave oppositely, never symmetrically; the line-segment test
 *           must hold for EVERY $t\in[0,1]$, never just the midpoint
 *           $t=1/2$ — a star-shaped set can pass every midpoint check
 *           while failing at some other $t$.
 *   UNCONSTRAINED-OPTIMIZATION  A stationary point ($\nabla f(x^*)=0$) is
 *           NEVER automatically an extremum — the Hessian test still must
 *           be applied, exactly as a 1D critical point is never
 *           automatically an extremum; a point is stationary only when
 *           ALL partial derivatives vanish SIMULTANEOUSLY, never when just
 *           one partial happens to vanish; the discriminant
 *           $D=f_{xx}f_{yy}-f_{xy}^2$ is NEVER reducible to checking
 *           $f_{xx}$ and $f_{yy}$'s individual signs alone — a positive
 *           $f_{xx}$ can coexist with $D<0$ (a saddle point).
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const CONVEX_FUNCTION = 'math.opt.convex-function'
const CONVEX_SET = 'math.opt.convex-set'
const UNCONSTRAINED_OPTIMIZATION = 'math.opt.unconstrained-optimization'

export const MATHEMATICS_OPT_CONVEX_FUNCTION_CONVEX_SET_UNCONSTRAINED_OPTIMIZATION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CONVEX_FUNCTION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE CHORD INEQUALITY IS NON-STRICT ($\\le$), SO LINEAR FUNCTIONS ARE CONVEX — CONVEXITY '
      + 'NEVER REQUIRES VISIBLE CURVATURE: a function $f$ is convex when '
      + '$f(\\lambda x+(1-\\lambda)y)\\le\\lambda f(x)+(1-\\lambda)f(y)$ for every '
      + '$\\lambda\\in[0,1]$ — geometrically, the chord lies ON OR ABOVE the graph. For a linear '
      + 'function $f(x)=x$, the chord COINCIDES EXACTLY with the graph — equality holds throughout, '
      + 'satisfying the $\\le$ condition — so linear functions ARE convex despite never "curving '
      + 'upward" at all. A visibly curving graph is not what the definition actually demands.\n\n'
      + 'EVERY LOCAL MINIMUM OF A CONVEX FUNCTION IS AUTOMATICALLY GLOBAL, NEVER MERELY '
      + '"USUALLY" GLOBAL: the proof is by contradiction — if a local minimum $x^*$ were NOT global, '
      + 'some $y$ would have $f(y)<f(x^*)$, and points on the segment toward $y$, arbitrarily close '
      + 'to $x^*$, would then have $f$-values strictly less than $f(x^*)$ by the chord inequality '
      + 'itself — directly contradicting $x^*$ being a local minimum. No such $y$ can exist, so '
      + '$x^*$ must already be global. This is exactly what makes convex optimization tractable: '
      + 'finding ANY local minimum suffices to find THE minimum, never merely a candidate that must '
      + 'be checked against other local minima.\n\n'
      + 'THE CHORD-INEQUALITY DEFINITION AND THE HESSIAN POSITIVE-SEMIDEFINITE CRITERION ARE TWO '
      + 'ROUTES TO THE IDENTICAL CONCLUSION, NEVER TWO INDEPENDENTLY-CHECKED, POTENTIALLY-'
      + 'DISAGREEING PROPERTIES: for twice-differentiable $f$, convexity via the chord inequality is '
      + 'EQUIVALENT to the Hessian $\\nabla^2f$ being positive semidefinite everywhere. These look '
      + 'structurally unrelated on the page — one an inequality over pairs of points, the other an '
      + 'eigenvalue condition on a matrix — but they answer the EXACT SAME question about the '
      + 'identical function; verifying one and then separately "double-checking" the other as if it '
      + 'might disagree is never a meaningful additional test.',
    targetedMisconceptions: [`${CONVEX_FUNCTION}:MC-1`, `${CONVEX_FUNCTION}:MC-2`, `${CONVEX_FUNCTION}:MC-3`],
    source: eb(CONVEX_FUNCTION, 'Core Understanding — the chord inequality being non-strict so linear functions are convex never requiring visible curvature, every local minimum of a convex function being automatically global never merely usually global via the proof by contradiction, and the chord-inequality definition and Hessian positive-semidefinite criterion being two routes to the identical conclusion never two independently-checked potentially-disagreeing properties'),
  },
  {
    conceptId: CONVEX_SET, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A SET WITH SHARP CORNERS CAN BE JUST AS CONVEX AS A SMOOTH DISK — CONVEXITY IS ABOUT '
      + 'INTERIOR CONTENT, NEVER BOUNDARY SMOOTHNESS: a set $S$ is convex when, for ANY two points '
      + '$x,y\\in S$ and EVERY $t\\in[0,1]$, the point $tx+(1-t)y$ lies entirely within $S$. Applying '
      + 'this directly to a square $[0,1]^2$ using its corners $(0,0)$ and $(1,1)$: the segment '
      + '$t(0,0)+(1-t)(1,1)$ stays inside $[0,1]^2$ for every $t\\in[0,1]$ — the square passes the '
      + 'line-segment test cleanly, since the test never examines boundary curvature at all. Sharp '
      + 'corners never disqualify a set from being convex.\n\n'
      + 'INTERSECTION OF CONVEX SETS IS ALWAYS CONVEX, BUT UNION IS NOT, IN GENERAL — THE TWO '
      + 'OPERATIONS BEHAVE OPPOSITELY, NEVER SYMMETRICALLY: if $x,y$ both lie in every set of an '
      + 'intersection, the segment between them stays in every set, hence in the intersection — '
      + 'intersection is genuinely closed under convexity. But two disjoint convex disks joined '
      + 'together as a UNION generally have a gap between them: taking one point from each disk, '
      + 'their connecting segment exits both disks entirely through that gap — the union is NOT '
      + 'convex, even though each disk individually is. Assuming union inherits the same closure '
      + 'property that intersection does is never valid.\n\n'
      + 'THE LINE-SEGMENT TEST MUST HOLD FOR EVERY $t\\in[0,1]$, NEVER JUST THE MIDPOINT $t=1/2$ — '
      + 'A STAR-SHAPED SET CAN PASS EVERY MIDPOINT CHECK WHILE FAILING AT SOME OTHER $t$: for a '
      + 'star polygon, two tips can have a MIDPOINT that lands inside the shape, even though the '
      + 'segment between them exits through a concave notch at some OTHER value of $t$. Checking '
      + 'only $t=1/2$ can therefore give a false-positive convexity verdict; the full condition '
      + 'genuinely requires checking the ENTIRE range $t\\in[0,1]$, never a single representative '
      + 'point.',
    targetedMisconceptions: [`${CONVEX_SET}:MC-1`, `${CONVEX_SET}:MC-2`, `${CONVEX_SET}:MC-3`],
    source: eb(CONVEX_SET, 'Core Understanding — a set with sharp corners being just as convex as a smooth disk since convexity is about interior content never boundary smoothness, intersection of convex sets always being convex while union is not in general since the two operations behave oppositely never symmetrically, and the line-segment test needing to hold for every t never just the midpoint since a star-shaped set can pass every midpoint check while failing at some other t'),
  },
  {
    conceptId: UNCONSTRAINED_OPTIMIZATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A STATIONARY POINT ($\\nabla f(x^*)=0$) IS NEVER AUTOMATICALLY AN EXTREMUM — THE HESSIAN '
      + 'TEST STILL MUST BE APPLIED, EXACTLY AS A 1D CRITICAL POINT IS NEVER AUTOMATICALLY AN '
      + 'EXTREMUM: for $g(x,y)=x^2-y^2$, the stationary point $(0,0)$ has $\\nabla g(0,0)=0$ — '
      + 'STRUCTURALLY IDENTICAL to a genuine local minimum\'s stationary condition — yet computing '
      + 'the discriminant $D=(2)(-2)-0^2=-4<0$ reveals $(0,0)$ is actually a SADDLE POINT, neither a '
      + 'min nor a max. Finding $\\nabla f(x^*)=0$ only identifies a CANDIDATE; it is never itself a '
      + 'guarantee of what kind of point $x^*$ actually is.\n\n'
      + 'A POINT IS STATIONARY ONLY WHEN ALL PARTIAL DERIVATIVES VANISH SIMULTANEOUSLY, NEVER '
      + 'WHEN JUST ONE PARTIAL HAPPENS TO VANISH: for $f(x,y)=x^2+y^2-4x-6y+13$, checking the '
      + 'candidate $(2,0)$ shows $\\partial f/\\partial x=0$ there — but $\\partial f/\\partial '
      + 'y=-6\\neq0$ at the SAME point, so $(2,0)$ is NOT stationary despite one partial vanishing. '
      + 'Stationarity is a JOINT condition on the ENTIRE gradient vector, requiring EVERY partial '
      + 'derivative to vanish AT THE SAME POINT — checking just one partial and stopping is never '
      + 'sufficient.\n\n'
      + 'THE DISCRIMINANT $D=f_{xx}f_{yy}-f_{xy}^2$ IS NEVER REDUCIBLE TO CHECKING $f_{xx}$ AND '
      + '$f_{yy}$\'S INDIVIDUAL SIGNS ALONE — A POSITIVE $f_{xx}$ CAN COEXIST WITH $D<0$ (A SADDLE '
      + 'POINT): the cross-partial term $f_{xy}$ carries genuine information that the individual '
      + 'second partials alone cannot supply. Treating the two-variable Hessian test as merely two '
      + 'separate one-variable concavity checks (just look at $f_{xx}$ and $f_{yy}$\'s signs '
      + 'independently) is an invalid overgeneralization from the 1D case — only the FULL '
      + 'discriminant, incorporating $f_{xy}$, correctly distinguishes a genuine local minimum from '
      + 'a saddle point.',
    targetedMisconceptions: [`${UNCONSTRAINED_OPTIMIZATION}:MC-1`, `${UNCONSTRAINED_OPTIMIZATION}:MC-2`, `${UNCONSTRAINED_OPTIMIZATION}:MC-3`],
    source: eb(UNCONSTRAINED_OPTIMIZATION, 'Core Understanding — a stationary point never automatically an extremum with the Hessian test still needing to be applied exactly as a 1D critical point is never automatically an extremum, a point being stationary only when all partial derivatives vanish simultaneously never when just one happens to vanish, and the discriminant never being reducible to checking individual second-partial signs alone since a positive f_xx can coexist with a negative discriminant at a saddle point'),
  },
]

export const MATHEMATICS_OPT_CONVEX_FUNCTION_CONVEX_SET_UNCONSTRAINED_OPTIMIZATION_PROBES: SeedProbe[] = [
  {
    conceptId: CONVEX_FUNCTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Must a convex function visibly "curve upward" everywhere, ruling out linear functions?',
    choices: [
      { text: 'No — the chord inequality is non-strict ($\\le$); a linear function\'s chord coincides exactly with its graph, satisfying the inequality with equality throughout, so linear functions are convex despite never curving', isCorrect: true },
      { text: 'Yes — a convex function must show visible upward curvature at every point, which rules out linear functions', isCorrect: false, misconceptionId: `${CONVEX_FUNCTION}:MC-1` },
      { text: "Yes, since the chord inequality is a strict inequality that linear functions cannot satisfy", isCorrect: false, misconceptionId: `${CONVEX_FUNCTION}:MC-1` },
    ],
    targetedMisconceptions: [`${CONVEX_FUNCTION}:MC-1`],
    source: eb(CONVEX_FUNCTION, 'Discovery Question 1 as a detection probe (verbatim) — whether convexity requires visible curvature ruling out linear functions, an answer of "yes" confirming CONVEXITY-REQUIRES-VISIBLE-CURVATURE'),
  },
  {
    conceptId: CONVEX_FUNCTION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Can a convex function have a local minimum that is not the global minimum?',
    choices: [
      { text: 'No — if a local minimum $x^*$ were not global, some point $y$ with $f(y)<f(x^*)$ would force, via the chord inequality, points arbitrarily close to $x^*$ to have strictly smaller values, contradicting $x^*$ being a local minimum at all', isCorrect: true },
      { text: 'Yes — like general functions, a convex function can have multiple local minima that are not the global minimum', isCorrect: false, misconceptionId: `${CONVEX_FUNCTION}:MC-2` },
      { text: "Yes, since convexity says nothing special about the relationship between local and global minima", isCorrect: false, misconceptionId: `${CONVEX_FUNCTION}:MC-2` },
    ],
    targetedMisconceptions: [`${CONVEX_FUNCTION}:MC-2`],
    source: eb(CONVEX_FUNCTION, 'Discovery Question 2 as a detection probe (verbatim) — whether a convex function can have a non-global local minimum, an answer of "yes" confirming CONVEX-LOCAL-MIN-ASSUMED-NOT-NECESSARILY-GLOBAL'),
  },
  {
    conceptId: CONVEX_FUNCTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Are the chord-inequality definition and the Hessian positive-semidefinite criterion two separate, independently-checked properties of a function?',
    choices: [
      { text: 'No — for twice-differentiable functions, the two are EQUIVALENT characterizations of the identical convexity property, two routes to the same conclusion, never independently-checked facts that could disagree', isCorrect: true },
      { text: 'Yes — the chord inequality and the Hessian test are unrelated properties that must each be verified separately', isCorrect: false, misconceptionId: `${CONVEX_FUNCTION}:MC-3` },
      { text: "Yes, since one is a geometric condition and the other is an algebraic eigenvalue test, they answer different questions", isCorrect: false, misconceptionId: `${CONVEX_FUNCTION}:MC-3` },
    ],
    targetedMisconceptions: [`${CONVEX_FUNCTION}:MC-3`],
    source: eb(CONVEX_FUNCTION, 'Discovery Question 3 as a detection probe (verbatim) — whether the chord inequality and Hessian test are separate properties, an answer of "yes" confirming CHORD-INEQUALITY-AND-HESSIAN-TEST-TREATED-AS-SEPARATE'),
  },
  {
    conceptId: CONVEX_SET, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does a shape with sharp corners, like a square, disqualify it from being convex?',
    choices: [
      { text: 'No — applying the line-segment test directly to the square\'s corners confirms every segment stays inside $[0,1]^2$ for every $t$; convexity is about interior content, never boundary smoothness', isCorrect: true },
      { text: 'Yes — a shape must have a smooth, curved boundary to be considered convex, ruling out shapes with corners', isCorrect: false, misconceptionId: `${CONVEX_SET}:MC-1` },
      { text: "Yes, since only rounded shapes like disks can satisfy the line-segment test", isCorrect: false, misconceptionId: `${CONVEX_SET}:MC-1` },
    ],
    targetedMisconceptions: [`${CONVEX_SET}:MC-1`],
    source: eb(CONVEX_SET, 'Discovery Question 1 as a detection probe (verbatim) — whether a square\'s corners disqualify it from being convex, an answer of "yes" confirming CONVEX-MEANS-SMOOTH'),
  },
  {
    conceptId: CONVEX_SET, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If two sets are each convex, is their union automatically convex too?',
    choices: [
      { text: 'No — two disjoint convex disks joined as a union generally have a gap between them; taking one point from each disk, their connecting segment exits the union entirely, so the union is not convex even though each disk individually is', isCorrect: true },
      { text: 'Yes — since intersection of convex sets is always convex, union must share that same closure property', isCorrect: false, misconceptionId: `${CONVEX_SET}:MC-2` },
      { text: "Yes, because combining any two convex shapes together always preserves convexity", isCorrect: false, misconceptionId: `${CONVEX_SET}:MC-2` },
    ],
    targetedMisconceptions: [`${CONVEX_SET}:MC-2`],
    source: eb(CONVEX_SET, 'Discovery Question 2 as a detection probe (verbatim) — whether the union of two convex sets is automatically convex, an answer of "yes" confirming CONVEX-UNION-CLOSED'),
  },
  {
    conceptId: CONVEX_SET, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is it enough to check just the midpoint between two points to confirm a set is convex?',
    choices: [
      { text: 'No — a star-shaped set can have every midpoint between nearby tips landing inside it, while the segment at some OTHER value of t exits through a concave notch; the full condition requires checking every t in [0,1]', isCorrect: true },
      { text: 'Yes — checking that the midpoint of any two points lies in the set is sufficient to confirm convexity', isCorrect: false, misconceptionId: `${CONVEX_SET}:MC-3` },
      { text: "Yes, since if the middle of the segment stays inside, the rest of the segment must too", isCorrect: false, misconceptionId: `${CONVEX_SET}:MC-3` },
    ],
    targetedMisconceptions: [`${CONVEX_SET}:MC-3`],
    source: eb(CONVEX_SET, 'Discovery Question 3 as a detection probe (verbatim) — whether checking only the midpoint suffices to confirm convexity, an answer of "yes" confirming MIDPOINT-SUFFICIENT'),
  },
  {
    conceptId: UNCONSTRAINED_OPTIMIZATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If $\\nabla f(x^*)=0$, is $x^*$ automatically a local minimum?',
    choices: [
      { text: 'No — a stationary point could be a local min, a local max, or a saddle point; for $g(x,y)=x^2-y^2$, the stationary point (0,0) has $\\nabla g(0,0)=0$ but the discriminant $D=-4<0$ reveals it is a saddle point', isCorrect: true },
      { text: 'Yes — a vanishing gradient at $x^*$ is itself sufficient to guarantee a local minimum there', isCorrect: false, misconceptionId: `${UNCONSTRAINED_OPTIMIZATION}:MC-1` },
      { text: "Yes, since the stationary-point condition alone always determines the type of extremum without needing the Hessian", isCorrect: false, misconceptionId: `${UNCONSTRAINED_OPTIMIZATION}:MC-1` },
    ],
    targetedMisconceptions: [`${UNCONSTRAINED_OPTIMIZATION}:MC-1`],
    source: eb(UNCONSTRAINED_OPTIMIZATION, 'Discovery Question 2 as a detection probe (verbatim) — whether a vanishing gradient guarantees a local minimum, an answer of "yes" confirming STATIONARY-POINT-ASSUMED-TO-BE-EXTREMUM'),
  },
  {
    conceptId: UNCONSTRAINED_OPTIMIZATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If $\\partial f/\\partial x=0$ at some point, is that point automatically a stationary point?',
    choices: [
      { text: 'No — for $f(x,y)=x^2+y^2-4x-6y+13$, the point (2,0) has $\\partial f/\\partial x=0$ but $\\partial f/\\partial y=-6\\neq0$ at that same point, so (2,0) is NOT stationary; stationarity requires EVERY partial derivative to vanish simultaneously', isCorrect: true },
      { text: 'Yes — if one partial derivative vanishes at a point, that point is stationary regardless of the other partial derivatives', isCorrect: false, misconceptionId: `${UNCONSTRAINED_OPTIMIZATION}:MC-2` },
      { text: "Yes, since checking a single partial derivative is sufficient to establish stationarity in the multivariable case", isCorrect: false, misconceptionId: `${UNCONSTRAINED_OPTIMIZATION}:MC-2` },
    ],
    targetedMisconceptions: [`${UNCONSTRAINED_OPTIMIZATION}:MC-2`],
    source: eb(UNCONSTRAINED_OPTIMIZATION, 'Discovery Question 1 as a detection probe (verbatim) — whether one vanishing partial derivative makes a point stationary, an answer of "yes" confirming SINGLE-PARTIAL-DERIVATIVE-CHECKED-ALONE'),
  },
  {
    conceptId: UNCONSTRAINED_OPTIMIZATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If $f_{xx}>0$ and $f_{yy}>0$ at a stationary point, is that point automatically a local minimum?',
    choices: [
      { text: 'No — the full discriminant $D=f_{xx}f_{yy}-f_{xy}^2$ must be computed; a positive $f_{xx}$ and $f_{yy}$ can still coexist with a negative discriminant (if $f_{xy}$ is large enough), yielding a saddle point rather than a local minimum', isCorrect: true },
      { text: 'Yes — positive $f_{xx}$ and $f_{yy}$ individually are sufficient to confirm a local minimum without needing the discriminant', isCorrect: false, misconceptionId: `${UNCONSTRAINED_OPTIMIZATION}:MC-3` },
      { text: "Yes, since checking each second partial's sign separately is equivalent to the two-variable concavity test", isCorrect: false, misconceptionId: `${UNCONSTRAINED_OPTIMIZATION}:MC-3` },
    ],
    targetedMisconceptions: [`${UNCONSTRAINED_OPTIMIZATION}:MC-3`],
    source: eb(UNCONSTRAINED_OPTIMIZATION, 'Discovery Question 3 as a detection probe (verbatim) — whether positive individual second partials guarantee a local minimum, an answer of "yes" confirming HESSIAN-TEST-REDUCED-TO-INDIVIDUAL-SECOND-PARTIALS'),
  },
]
