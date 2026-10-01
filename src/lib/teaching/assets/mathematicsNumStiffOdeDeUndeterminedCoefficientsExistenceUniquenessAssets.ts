/**
 * Batch: math.num.stiff-ode, math.de.undetermined-coefficients,
 * math.de.existence-uniqueness.
 *
 * Fresh Phase 0 frontier recompute after the prior batch authored
 * math.num.runge-kutta, making math.num.stiff-ode (requires only
 * runge-kutta) newly ready. **Authoring it CLOSES THE math.num DOMAIN
 * ENTIRELY: 16/16** — the second full domain completion this session
 * (after math.real's 30/30). Also authors math.de.undetermined-
 * coefficients (opens the harmonic-oscillator chain via char-equation +
 * second-order-linear) and math.de.existence-uniqueness (closes ivp's
 * declared unlock via the fixed-point-theorem cross-link). Transcribed
 * from the frozen Educational Brain entries at educational-brain/concepts/
 * mathematics/math.num.stiff-ode.md and educational-brain/concepts/
 * mathematics/math.de.{undetermined-coefficients,existence-uniqueness}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE for all three, matching math.num's
 * and math.de's established domain baselines.
 *
 *   MATH.NUM.STIFF-ODE  "Stiff" is NEVER a general synonym for "numerically
 *           difficult" — it means a specific Jacobian eigenvalue-spread
 *           condition, and a stiff ODE's physical solution can be perfectly
 *           smooth; implicit methods are NEVER preferred for stiff problems
 *           because they are more accurate — their advantage is stability,
 *           letting them use a much larger step size, never a claim about
 *           formal accuracy order; and stiffness is NEVER a fixed, global
 *           property of an equation — it is a local property of the
 *           trajectory that evolves as the solution changes.
 *   UNDETERMINED-COEFFICIENTS  A polynomial trial function is NEVER
 *           sufficient with just the lead term — it needs every degree down
 *           to the constant, since differentiation lowers degree and needs
 *           lower-degree terms to cancel; a sine-forcing trial is NEVER
 *           sine alone — cosine must always be paired in, since
 *           differentiating sine produces a cosine term needing its own
 *           coefficient; and an inconsistent coefficient system is NEVER a
 *           dead end signaling "no solution" — it signals the trial
 *           overlaps the homogeneous solution and needs the modification
 *           rule.
 *   EXISTENCE-UNIQUENESS  Picard iteration is NEVER a separate ODE-specific
 *           technique merely inspired by fixed-point ideas — solving the
 *           IVP is literally finding a fixed point of the Picard operator;
 *           the hypothesis on partial f partial y's continuity is NEVER an
 *           unrelated extra technical condition — it directly supplies the
 *           Lipschitz bound the contraction argument needs; and the
 *           theorem's local-existence conclusion is NEVER merely a
 *           limitation of the proof technique — some equations genuinely
 *           blow up in finite time, a real property of the mathematics.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const NUM_STIFF_ODE = 'math.num.stiff-ode'
const UNDETERMINED_COEFFICIENTS = 'math.de.undetermined-coefficients'
const EXISTENCE_UNIQUENESS = 'math.de.existence-uniqueness'

export const MATHEMATICS_NUM_STIFF_ODE_DE_UNDETERMINED_COEFFICIENTS_EXISTENCE_UNIQUENESS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: NUM_STIFF_ODE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'STIFF NEVER MEANS "HARD TO SOLVE" IN GENERAL — IT MEANS A SPECIFIC EIGENVALUE-SPREAD '
      + 'CONDITION: a nonlinear ODE where an explicit solver takes millions of tiny steps is '
      + 'correctly diagnosed as STIFF if the Jacobian has eigenvalues of widely different '
      + 'magnitude with negative real parts. But "hard to solve" is misleading — the PHYSICAL '
      + 'solution may be perfectly smooth (slow dynamics only); what is hard is using an '
      + 'EXPLICIT method, which must track every fast transient even after it has decayed. '
      + 'Treating "stiff" as a synonym for "numerically difficult" or "ill-conditioned" misses '
      + 'the SPECIFIC technical definition — the true difficulty is the INNER LINEAR SOLVE each '
      + "implicit step requires, never the ODE's inherent describability.\n\n"
      + 'IMPLICIT METHODS ARE PREFERRED FOR STABILITY — NEVER BECAUSE THEY ARE MORE ACCURATE: '
      + 'implicit Euler (BDF1) has global error $O(h)$ — the SAME order as explicit Euler; BDF2 '
      + 'has $O(h^2)$ — the same as the trapezoidal rule. For a NON-stiff problem, RK4 '
      + '($O(h^4)$) is MUCH more accurate than BDF2 at the SAME h. Believing implicit methods '
      + '(implicit Euler, BDF) are more accurate than explicit methods (RK4) because they\'re '
      + 'used "for hard problems" is WRONG — their advantage for STIFF problems is that explicit '
      + 'methods are STABILITY-limited (forced to tiny h regardless of accuracy needs), while '
      + 'implicit methods are ACCURACY-limited (can use a much larger h, at the cost of one '
      + 'Jacobian solve per step) — never a claim about formal accuracy order.\n\n'
      + 'STIFFNESS IS A LOCAL PROPERTY THAT EVOLVES ALONG THE TRAJECTORY — NEVER A FIXED GLOBAL '
      + 'LABEL: the Jacobian, evaluated at the CURRENT solution, changes as the solution evolves '
      + 'in a nonlinear system — so the stiffness ratio changes too. In Robertson chemical '
      + 'kinetics, the intermediate species peaks briefly then decays; during the peak, an '
      + 'eigenvalue has a magnitude around $(3\\times10^7)$; AFTER the peak, all eigenvalues are '
      + 'small. Believing stiffness is an intrinsic, FIXED property of the ODE regardless of the '
      + 'time interval misses that a problem can be extremely stiff during an initial transient '
      + 'and NON-stiff once that transient decays — a good adaptive stiff solver detects this '
      + 'and INCREASES h automatically once the fast mode decays.',
    targetedMisconceptions: [`${NUM_STIFF_ODE}:MC-1`, `${NUM_STIFF_ODE}:MC-2`, `${NUM_STIFF_ODE}:MC-3`],
    source: eb(NUM_STIFF_ODE, "Core Understanding — stiff never meaning hard to solve in general since it means a specific eigenvalue-spread condition, implicit methods being preferred for stability never because they are more accurate, and stiffness being a local property that evolves along the trajectory never a fixed global label"),
  },
  {
    conceptId: UNDETERMINED_COEFFICIENTS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "A POLYNOMIAL TRIAL NEEDS EVERY DEGREE DOWN TO THE CONSTANT — NEVER JUST THE LEAD TERM: "
      + "for $(y''-3y'+2y=x^2)$: the correct trial is $(y_p=Ax^2+Bx+C)$ (ALL three terms), never "
      + 'just $(Ax^2)$. Substituting requires matching three equations needing all three unknowns '
      + '— differentiation LOWERS degree, so lower-degree terms are essential to cancel what '
      + 'differentiation of the higher-degree terms produces.\n\n'
      + 'A SINE-FORCING TRIAL ALWAYS INCLUDES COSINE TOO — NEVER SINE ALONE: for '
      + '$(g(x)=\\sin(bx))$: the trial is $(y_p=A\\sin(bx)+B\\cos(bx))$, even though g has ONLY '
      + 'sine. Differentiating $(A\\sin(bx))$ produces $(Ab\\cos(bx))$ — a cosine term that '
      + 'needs its OWN B coefficient to cancel upon substitution. The pair '
      + '$(\\{\\sin(bx),\\cos(bx)\\})$ is closed under differentiation; omitting cosine leaves '
      + 'an uncancellable term.\n\n'
      + 'THE MODIFICATION RULE APPLIES WHENEVER THE TRIAL OVERLAPS THE HOMOGENEOUS SOLUTION — '
      + "NEVER SKIPPED WHEN IT DOES: for $(y''-4y'+4y=e^{2x})$ (repeated root $(r=2)$, so "
      + '$(y_h=(C_1+C_2x)e^{2x})$): the naive trial $(Ae^{2x})$ overlaps $(y_h)$; even '
      + '$(Axe^{2x})$ still overlaps. Multiplying by $x^2$: $(y_p=Ax^2e^{2x})$ resolves this, '
      + 'giving $(A=1/2)$. Substituting an un-modified trial that duplicates $(y_h)$ produces an '
      + 'INCONSISTENT system (e.g., $(0=1)$) — the signal to multiply by x (or $x^2$ if still '
      + 'overlapping), never to conclude "no solution."',
    targetedMisconceptions: [`${UNDETERMINED_COEFFICIENTS}:MC-1`, `${UNDETERMINED_COEFFICIENTS}:MC-2`, `${UNDETERMINED_COEFFICIENTS}:MC-3`],
    source: eb(UNDETERMINED_COEFFICIENTS, 'Core Understanding — a polynomial trial needing every degree down to the constant never just the lead term, a sine-forcing trial always including cosine too never sine alone, and the modification rule applying whenever the trial overlaps the homogeneous solution never skipped when it does'),
  },
  {
    conceptId: EXISTENCE_UNIQUENESS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "SOLVING THE IVP IS LITERALLY FINDING A FIXED POINT OF THE PICARD OPERATOR — NEVER MERELY "
      + "ANALOGOUS: integrating $(y'=f(x,y),y(x_0)=y_0)$ from $(x_0)$ to x gives the EQUIVALENT "
      + 'integral equation $(y(x)=y_0+\\int_{x_0}^xf(t,y(t))\\,dt)$. Defining '
      + '$((T\\phi)(x)=y_0+\\int_{x_0}^xf(t,\\phi(t))\\,dt)$: y solves the IVP EXACTLY when '
      + "$(y=Ty)$. For $(y'=y,y(0)=1)$ (known solution $(y=e^x)$): "
      + '$((Ty)(x)=1+\\int_0^xe^t\\,dt=1+(e^x-1)=e^x=y(x))$ — a DIRECT, verified instance of the '
      + 'fixed-point theorem\'s own machinery, with "points" being entire functions.\n\n'
      + 'PARTIAL F PARTIAL Y\'S CONTINUITY DIRECTLY SUPPLIES THE LIPSCHITZ BOUND, NEVER AN '
      + 'UNRELATED TECHNICAL CONDITION: for $(f(x,y)=x^2+y^2)$ near $((0,0))$ restricted to '
      + '$(|y|\\le1)$: the partial derivative with respect to y is $(2y)$, bounded by $(K=2)$ on '
      + 'this rectangle. The SAME Mean Value Theorem argument already established for Lipschitz '
      + 'continuity gives $(|f(x,y_1)-f(x,y_2)|\\le2|y_1-y_2|)$ — f IS Lipschitz in y with '
      + 'constant $(K=2)$, EXACTLY the ingredient that makes the Picard operator contract on a '
      + 'sufficiently short interval.\n\n'
      + "THE THEOREM'S CONCLUSION IS ONLY LOCAL — A GENUINE PROPERTY OF SOME EQUATIONS, NEVER A "
      + "PROOF-TECHNIQUE LIMITATION: for $(y'=y^2,y(0)=1)$: separating variables gives the "
      + 'explicit solution $(y(x)=1/(1-x))$, verified directly. This is perfectly unique near '
      + '$(x=0)$, but as x approaches 1 from below, $(y(x))$ approaches infinity — a genuine '
      + 'finite-time BLOW-UP. The solution simply does NOT exist for $(x\\ge1)$, no matter how '
      + 'the equation is analyzed — confirming "local" reflects a real property of certain '
      + 'equations, not a limitation a cleverer proof could remove.',
    targetedMisconceptions: [`${EXISTENCE_UNIQUENESS}:MC-1`, `${EXISTENCE_UNIQUENESS}:MC-2`, `${EXISTENCE_UNIQUENESS}:MC-3`],
    source: eb(EXISTENCE_UNIQUENESS, "Core Understanding — solving the IVP being literally finding a fixed point of the Picard operator never merely analogous, partial f partial y's continuity directly supplying the Lipschitz bound never an unrelated technical condition, and the theorem's conclusion being only local as a genuine property of some equations never a proof-technique limitation"),
  },
]

export const MATHEMATICS_NUM_STIFF_ODE_DE_UNDETERMINED_COEFFICIENTS_EXISTENCE_UNIQUENESS_PROBES: SeedProbe[] = [
  {
    conceptId: NUM_STIFF_ODE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does "stiff" mean the ODE is inherently hard to describe, or specifically that its Jacobian has widely spread eigenvalues?',
    choices: [
      { text: 'Specifically the eigenvalue spread — the true difficulty is the inner linear solve each implicit step requires; the PHYSICAL solution can be perfectly smooth even when an explicit solver is forced to take millions of tiny steps to track a decayed transient', isCorrect: true },
      { text: 'Stiff means the ODE is inherently hard to describe or numerically difficult in a general sense', isCorrect: false, misconceptionId: `${NUM_STIFF_ODE}:MC-1` },
      { text: "Stiff means the ODE's solution is complex or ill-behaved, regardless of any specific eigenvalue property", isCorrect: false, misconceptionId: `${NUM_STIFF_ODE}:MC-1` },
    ],
    targetedMisconceptions: [`${NUM_STIFF_ODE}:MC-1`],
    source: eb(NUM_STIFF_ODE, 'Discovery Question 1 as a detection probe (verbatim) — whether stiff means inherently hard to describe or specifically a Jacobian eigenvalue spread, an answer of "inherently hard" confirming STIFF-MEANS-HARD-TO-SOLVE'),
  },
  {
    conceptId: NUM_STIFF_ODE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Are implicit methods used for stiff problems because they are more accurate, or because they are more stable?',
    choices: [
      { text: "Because they are more stable — implicit Euler (BDF1) has global error O(h), the SAME order as explicit Euler; for a NON-stiff problem RK4 is much more accurate than BDF2 at the same h; the advantage for stiff problems is stability, letting a much larger h be used", isCorrect: true },
      { text: 'Implicit methods are used for stiff problems because they are more accurate than explicit methods like RK4', isCorrect: false, misconceptionId: `${NUM_STIFF_ODE}:MC-2` },
      { text: "Implicit methods are chosen because a higher formal accuracy order is required for problems that are hard to solve", isCorrect: false, misconceptionId: `${NUM_STIFF_ODE}:MC-2` },
    ],
    targetedMisconceptions: [`${NUM_STIFF_ODE}:MC-2`],
    source: eb(NUM_STIFF_ODE, 'Discovery Question 2 as a detection probe (verbatim) — whether implicit methods for stiff problems are used for accuracy or stability, an answer of "accuracy" confirming IMPLICIT-METHODS-MORE-ACCURATE'),
  },
  {
    conceptId: NUM_STIFF_ODE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is stiffness a fixed property of an ODE for all time, or can it change as the solution evolves?',
    choices: [
      { text: 'It can change as the solution evolves — in Robertson chemical kinetics, the intermediate species peaks briefly then decays; during the peak an eigenvalue is enormous, but after the peak all eigenvalues are small, so the problem is stiff only during the transient', isCorrect: true },
      { text: 'Stiffness is a fixed, intrinsic property of an ODE that never changes regardless of the time interval considered', isCorrect: false, misconceptionId: `${NUM_STIFF_ODE}:MC-3` },
      { text: "An ODE is permanently labeled stiff or non-stiff once classified, independent of which part of the solution trajectory is examined", isCorrect: false, misconceptionId: `${NUM_STIFF_ODE}:MC-3` },
    ],
    targetedMisconceptions: [`${NUM_STIFF_ODE}:MC-3`],
    source: eb(NUM_STIFF_ODE, 'Discovery Question 3 as a detection probe (verbatim) — whether stiffness is fixed for all time or can change as the solution evolves, an answer of "fixed" confirming STIFFNESS-IS-A-PROPERTY-OF-THE-EQUATION'),
  },
  {
    conceptId: UNDETERMINED_COEFFICIENTS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For g(x) = x², is the trial yₚ = Ax² enough, or does it need lower-degree terms too?',
    choices: [
      { text: "It needs the full polynomial — for y''-3y'+2y=x², the correct trial is yₚ=Ax²+Bx+C (all three terms); differentiation lowers degree, so the lower-degree terms are essential to cancel what differentiating the higher-degree terms produces", isCorrect: true },
      { text: 'yₚ = Ax² alone is enough, since the forcing term x² only has one term to match', isCorrect: false, misconceptionId: `${UNDETERMINED_COEFFICIENTS}:MC-1` },
      { text: "Only the lead term is ever needed in a trial function, regardless of the forcing term's degree", isCorrect: false, misconceptionId: `${UNDETERMINED_COEFFICIENTS}:MC-1` },
    ],
    targetedMisconceptions: [`${UNDETERMINED_COEFFICIENTS}:MC-1`],
    source: eb(UNDETERMINED_COEFFICIENTS, 'Discovery Question 1 as a detection probe (verbatim) — whether yₚ=Ax² alone is enough for g(x)=x², an answer of "yes, enough" confirming ONLY-MATCHING-THE-LEAD-TERM'),
  },
  {
    conceptId: UNDETERMINED_COEFFICIENTS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If substituting your trial gives an inconsistent system (like 0=5), does that mean there\'s no solution, or does it signal something about yₕ?',
    choices: [
      { text: "It signals the trial overlaps yₕ — for y''-4y'+4y=e^(2x) with repeated root r=2 (yₕ=(C₁+C₂x)e^(2x)), the naive trial Ae^(2x) overlaps yₕ; multiplying by x² (yₚ=Ax²e^(2x)) resolves it, giving A=1/2, never 'no solution'", isCorrect: true },
      { text: "An inconsistent system means there is genuinely no particular solution for this forcing term", isCorrect: false, misconceptionId: `${UNDETERMINED_COEFFICIENTS}:MC-2` },
      { text: "An inconsistent system just means an arithmetic error was made somewhere in the substitution, unrelated to yₕ", isCorrect: false, misconceptionId: `${UNDETERMINED_COEFFICIENTS}:MC-2` },
    ],
    targetedMisconceptions: [`${UNDETERMINED_COEFFICIENTS}:MC-2`],
    source: eb(UNDETERMINED_COEFFICIENTS, 'Discovery Question 2 as a detection probe (verbatim) — whether an inconsistent coefficient system means no solution or signals overlap with yₕ, an answer of "no solution" confirming FORGETTING-MODIFICATION-RULE'),
  },
  {
    conceptId: UNDETERMINED_COEFFICIENTS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If g(x) = sin(bx) only, should the trial include cos(bx) too?',
    choices: [
      { text: "Yes — the trial is yₚ=A sin(bx)+B cos(bx), even though g has only sine; differentiating A sin(bx) produces Ab cos(bx), a cosine term that needs its own B coefficient to cancel upon substitution, since {sin(bx),cos(bx)} is closed under differentiation", isCorrect: true },
      { text: 'No — since g(x) has only sine, the trial should include only A sin(bx), omitting the cosine term', isCorrect: false, misconceptionId: `${UNDETERMINED_COEFFICIENTS}:MC-3` },
      { text: "No, since including terms not present in the forcing function g(x) would introduce unnecessary complexity into the trial", isCorrect: false, misconceptionId: `${UNDETERMINED_COEFFICIENTS}:MC-3` },
    ],
    targetedMisconceptions: [`${UNDETERMINED_COEFFICIENTS}:MC-3`],
    source: eb(UNDETERMINED_COEFFICIENTS, 'Discovery Question 3 as a detection probe (verbatim) — whether a sine-only forcing term needs a cosine term in the trial, an answer of "no" confirming SINE-ONLY-TRIAL-FOR-SINE-FORCING'),
  },
  {
    conceptId: EXISTENCE_UNIQUENESS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is Picard iteration a separate technique merely inspired by fixed-point ideas, or is solving the IVP literally equivalent to finding a fixed point of a specific operator?',
    choices: [
      { text: "It is literally equivalent — for y'=y,y(0)=1, defining the Picard operator T and checking (Ty)(x)=1+∫₀ˣeᵗdt=eˣ=y(x) directly verifies y=Ty; solving the IVP and finding the operator's fixed point are the SAME problem, with 'points' being entire functions", isCorrect: true },
      { text: 'Picard iteration is a separate ODE-specific technique that merely resembles fixed-point iteration by analogy', isCorrect: false, misconceptionId: `${EXISTENCE_UNIQUENESS}:MC-1` },
      { text: "Picard iteration and fixed-point iteration are unrelated methods that happen to share superficially similar names", isCorrect: false, misconceptionId: `${EXISTENCE_UNIQUENESS}:MC-1` },
    ],
    targetedMisconceptions: [`${EXISTENCE_UNIQUENESS}:MC-1`],
    source: eb(EXISTENCE_UNIQUENESS, 'Discovery Question 1 as a detection probe (verbatim) — whether Picard iteration is merely inspired by or literally equivalent to fixed-point iteration, an answer of "merely inspired" confirming PICARD-ITERATION-ASSUMED-MERELY-INSPIRED-BY-FIXED-POINTS'),
  },
  {
    conceptId: EXISTENCE_UNIQUENESS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is the hypothesis on ∂f/∂y\'s continuity an unrelated extra technical condition, or does it directly supply the Lipschitz bound needed for the proof?',
    choices: [
      { text: 'It directly supplies the Lipschitz bound — for f(x,y)=x²+y² near (0,0) with |y|≤1, ∂f/∂y=2y is bounded by K=2, and the same Mean Value Theorem argument gives f Lipschitz in y with constant 2, exactly the ingredient making the Picard operator contract', isCorrect: true },
      { text: "The hypothesis on ∂f/∂y's continuity is an unrelated extra technical condition, not connected to the proof's actual mechanism", isCorrect: false, misconceptionId: `${EXISTENCE_UNIQUENESS}:MC-2` },
      { text: "That hypothesis is just a formality required by convention, without playing a specific mathematical role in the contraction argument", isCorrect: false, misconceptionId: `${EXISTENCE_UNIQUENESS}:MC-2` },
    ],
    targetedMisconceptions: [`${EXISTENCE_UNIQUENESS}:MC-2`],
    source: eb(EXISTENCE_UNIQUENESS, 'Discovery Question 2 as a detection probe (verbatim) — whether the ∂f/∂y continuity hypothesis is unrelated or directly supplies the Lipschitz bound, an answer of "unrelated" confirming PARTIAL-DERIVATIVE-HYPOTHESIS-ASSUMED-UNRELATED'),
  },
  {
    conceptId: EXISTENCE_UNIQUENESS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Does the theorem's local-existence conclusion reflect a genuine limitation on how far solutions can extend, or merely a limitation of the Picard-iteration proof technique?",
    choices: [
      { text: "A genuine limitation — for y'=y²,y(0)=1, the explicit solution y(x)=1/(1-x) is perfectly unique near x=0, but as x approaches 1 from below, y(x) approaches infinity, a genuine finite-time blow-up; the solution simply does not exist for x≥1, no matter the analysis", isCorrect: true },
      { text: "It merely reflects a limitation of the Picard-iteration proof technique, not a real property of the equation", isCorrect: false, misconceptionId: `${EXISTENCE_UNIQUENESS}:MC-3` },
      { text: "A cleverer proof method could always extend the theorem's conclusion to guarantee existence for all time", isCorrect: false, misconceptionId: `${EXISTENCE_UNIQUENESS}:MC-3` },
    ],
    targetedMisconceptions: [`${EXISTENCE_UNIQUENESS}:MC-3`],
    source: eb(EXISTENCE_UNIQUENESS, 'Discovery Question 3 as a detection probe (verbatim) — whether the local-existence conclusion is a genuine limitation or merely a proof-technique limitation, an answer of "proof-technique limitation" confirming LOCAL-CONCLUSION-ASSUMED-PROOF-TECHNIQUE-LIMITATION'),
  },
]
