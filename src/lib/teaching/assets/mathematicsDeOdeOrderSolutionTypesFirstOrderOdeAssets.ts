/**
 * Batch: ode-order, solution-types, first-order-ode (math.de).
 *
 * Fresh Phase 0 frontier recompute after opening math.de with math.de.ode
 * found 5 ready concepts (ode-order, ode-linearity, solution-types,
 * first-order-ode, pde). This batch selects ode-order, solution-types, and
 * first-order-ode — prioritizing the critical path toward math.de.ivp
 * (requires ode + solution-types) and eventually math.de.euler-method
 * (requires first-order-ode + ivp), the concept that directly unblocks
 * math.num.euler-method. Transcribed from the frozen Educational Brain
 * entries at educational-brain/concepts/mathematics/math.de.{ode-order,
 * solution-types,first-order-ode}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching math.de's established
 * advanced-difficulty domain baseline (set by the opening math.de.ode
 * batch).
 *
 *   ODE-ORDER  The order of an ODE is NEVER determined by an exponent on a
 *           derivative — it is determined by WHICH derivative is highest;
 *           degree does NOT always exist — it is undefined whenever the
 *           highest derivative appears inside a non-polynomial function
 *           like sin or a root; and the number of arbitrary constants in a
 *           general solution is NEVER governed by the degree — it is
 *           governed by the order alone.
 *   SOLUTION-TYPES  Every solution to an ODE is NEVER guaranteed obtainable
 *           from the general solution formula for some choice of constant —
 *           singular solutions are structurally excluded from the entire
 *           family; a claimed singular solution is NEVER valid without
 *           direct substitution into the ORIGINAL equation to confirm it;
 *           and a singular solution's exclusion NEVER arises from nowhere —
 *           it traces back to a specific division-by-a-possibly-zero-
 *           quantity step in the derivation.
 *   FIRST-ORDER-ODE  An ODE can NEVER be separated by pattern-matching alone
 *           — separability requires the right-hand side to genuinely factor
 *           as a product of an x-function and a y-function, never a sum;
 *           after exponentiating ln|y|=f(x)+C, the constant is NEVER simply
 *           dropped — it becomes a multiplicative constant A=e^C that must
 *           be retained; and integrating both sides of a separated equation
 *           NEVER produces just one side's worth of constant — both sides
 *           gain a constant, combined by convention into one.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const ODE_ORDER = 'math.de.ode-order'
const SOLUTION_TYPES = 'math.de.solution-types'
const FIRST_ORDER_ODE = 'math.de.first-order-ode'

export const MATHEMATICS_DE_ODE_ORDER_SOLUTION_TYPES_FIRST_ORDER_ODE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ODE_ORDER, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "ORDER IS DETERMINED BY WHICH DERIVATIVE IS HIGHEST, NEVER BY AN EXPONENT: for $((y')^3=x)$, "
      + "the highest derivative present is $(y')$ itself (the FIRST derivative) — so the order is "
      + '1, regardless of the cube. The "3" is the DEGREE (the power $y\'$ is raised to), never '
      + 'mistaken for the order — order counts WHICH derivative appears (first, second, third, '
      + '...), a completely separate question from what power it\'s raised to.\n\n'
      + 'DEGREE IS ONLY DEFINED WHEN THE ODE IS POLYNOMIAL IN ITS DERIVATIVES: for '
      + "$(y''+\\sin(y')=0)$, the highest derivative $(y')$ appears inside $\\sin(\\cdot)$ — NOT "
      + "as an algebraic power — so the degree is UNDEFINED, even though the order (2, from $y''$) "
      + 'is perfectly well-defined. Similarly $(\\sqrt{y\'\'}+y=0)$ has $y\'\'$ appearing as '
      + '$((y\'\')^{1/2})$, a non-integer power, so its degree is also undefined. Degree only '
      + 'applies once the ODE is confirmed polynomial (integer powers only, no functions like sin, '
      + 'exp, or roots applied to the derivatives).\n\n'
      + 'THE ORDER — NEVER THE DEGREE — DETERMINES THE NUMBER OF ARBITRARY CONSTANTS: an n-th '
      + 'order ODE has a general solution with exactly n arbitrary constants (for linear ODEs, '
      + "from n independent solutions), directly reusing the ODE concept's own general-solution "
      + 'machinery. A second-order ODE needs $(C_1)$ AND $(C_2)$ — two initial conditions (e.g. '
      + "$(y(0)=a,y'(0)=b)$) — regardless of what degree the equation happens to have.",
    targetedMisconceptions: [`${ODE_ORDER}:MC-1`, `${ODE_ORDER}:MC-2`, `${ODE_ORDER}:MC-3`],
    source: eb(ODE_ORDER, 'Core Understanding — order being determined by which derivative is highest never an exponent, degree only being defined when the ODE is polynomial in its derivatives, and the order never the degree determining the number of arbitrary constants'),
  },
  {
    conceptId: SOLUTION_TYPES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'SINGULAR SOLUTIONS ARE STRUCTURALLY EXCLUDED FROM THE GENERAL FAMILY, NEVER MERELY HARD TO '
      + "FIND: the ODE concept's own general/particular distinction is fully recalled, not "
      + 're-derived — an n-th order ODE\'s general solution has exactly n constants, fixed by n '
      + 'conditions. A SINGULAR solution is a genuinely different third category: a function '
      + "satisfying the ODE that NO choice of the general formula's constant(s) can produce. "
      + "Solving $(y'=3y^{2/3})$ by separation of variables gives the general solution "
      + '$(y=(x+C)^3)$; checking $(y\\equiv0)$ directly in the ORIGINAL equation: $(y\'=0)$ and '
      + '$(3y^{2/3}=3(0)^{2/3}=0)$ — both sides match, so $(y\\equiv0)$ genuinely satisfies the '
      + 'ODE. But $((x+C)^3=0)$ only at the single point $(x=-C)$ for any $C$ — NEVER identically '
      + 'zero for all $x$ — so $(y\\equiv0)$ is structurally excluded from the family, a true '
      + "singular solution, not merely a particular solution that's hard to locate.\n\n"
      + 'SINGULAR SOLUTIONS TRACE BACK TO A SPECIFIC DIVISION STEP, NEVER A RANDOM PHENOMENON: the '
      + "separation step $(y^{-2/3}dy=3\\,dx)$ REQUIRES dividing $(dy/dx=3y^{2/3})$ by $(y^{2/3})$ "
      + '— valid only when $(y\\ne0)$. This is EXACTLY where $(y\\equiv0)$ was silently excluded: '
      + 'the division implicitly assumed $(y\\ne0)$, so any solution with $(y\\equiv0)$ can never '
      + 'appear in the resulting family, even though it satisfies the ORIGINAL, undivided equation '
      + 'perfectly. Checking for singular solutions means examining precisely the steps where such '
      + 'a nonzero assumption was made, then testing whether the "forbidden" case yields a genuine '
      + 'solution.\n\n'
      + 'VERIFICATION IS ALWAYS BY DIRECT SUBSTITUTION INTO THE ORIGINAL EQUATION: a candidate '
      + 'singular solution must be confirmed by plugging it into the ORIGINAL (undivided) ODE '
      + 'directly — never merely asserted as "the case that got excluded." '
      + '$(y\\equiv0)$\'s validity as a solution to $(y\'=3y^{2/3})$ rests entirely on the direct '
      + 'check $(0=3(0)^{2/3}=0)$, not on the fact that it was excluded from the family.',
    targetedMisconceptions: [`${SOLUTION_TYPES}:MC-1`, `${SOLUTION_TYPES}:MC-2`, `${SOLUTION_TYPES}:MC-3`],
    source: eb(SOLUTION_TYPES, 'Core Understanding — singular solutions being structurally excluded from the general family never merely hard to find, singular solutions tracing back to a specific division step never a random phenomenon, and verification always being by direct substitution into the original equation'),
  },
  {
    conceptId: FIRST_ORDER_ODE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "SEPARABILITY REQUIRES THE RHS TO FACTOR AS A PRODUCT, NEVER A SUM: reusing antiderivatives' "
      + "own integration machinery directly, a first-order ODE $(y'=f(x,y))$ is separable iff "
      + "$(f(x,y)=h(x)\\cdot g(y))$ — a genuine product. $(y'=xy)$ is separable "
      + '$((h(x)=x,g(y)=y))$; $(y\'=x+y)$ is NEVER separable, since no product of a pure-x '
      + "function and a pure-y function equals a sum. Attempting to force separation on a sum "
      + 'wastes work and produces incorrect results — the standard form $(y\'+P(x)y=Q(x))$ and '
      + 'the integrating factor $(\\mu=e^{\\int P(x)dx})$ are the correct tool for such '
      + 'linear-but-non-separable cases.\n\n'
      + 'THE ARBITRARY CONSTANT MUST SURVIVE EXPONENTIATION, NEVER DROPPED: solving $(y\'=y)$ via '
      + "$(dy/y=dx\\Rightarrow\\ln|y|=x+C)$, exponentiating gives $(|y|=e^{x+C}=e^C\\cdot e^x)$ — "
      + 'since $(e^C>0)$ is itself an arbitrary positive constant (and $y$ can be positive or '
      + 'negative), write $(A=\\pm e^C)$ (a nonzero constant): $(y=Ae^x)$. Writing $(y=e^x)$ '
      + '(dropping $C$ entirely) destroys the general solution family and makes satisfying any '
      + 'initial condition other than $(y(0)=1)$ impossible — $A$, not $C$, is what an initial '
      + 'condition like $(y(0)=3)$ actually determines ($(A=3)$, giving $(y=3e^x)$).\n\n'
      + 'BOTH SIDES OF A SEPARATED EQUATION GAIN A CONSTANT, COMBINED INTO ONE BY CONVENTION: '
      + 'integrating $(y\\,dy=x\\,dx)$ gives $(y^2/2+C_1=x^2/2+C_2)$; since $(C_2-C_1)$ is itself '
      + 'arbitrary, it is written as a single constant $C$ on one side: $(y^2/2=x^2/2+C)$. '
      + 'Omitting $C$ entirely yields only ONE specific curve ($(C=0)$), not the general solution '
      + 'family — $C$ must always be carried through and only resolved by an initial condition.',
    targetedMisconceptions: [`${FIRST_ORDER_ODE}:MC-1`, `${FIRST_ORDER_ODE}:MC-2`, `${FIRST_ORDER_ODE}:MC-3`],
    source: eb(FIRST_ORDER_ODE, 'Core Understanding — separability requiring the RHS to factor as a product never a sum, the arbitrary constant needing to survive exponentiation never dropped, and both sides of a separated equation gaining a constant combined into one by convention'),
  },
]

export const MATHEMATICS_DE_ODE_ORDER_SOLUTION_TYPES_FIRST_ORDER_ODE_PROBES: SeedProbe[] = [
  {
    conceptId: ODE_ORDER, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "In (y')³=x, is the order 3, or is that number something else?",
    choices: [
      { text: "That number (3) is the degree, not the order — the highest derivative present is y' itself (the first derivative), so the order is 1 regardless of the cube; order counts which derivative appears, never the power it's raised to", isCorrect: true },
      { text: "Yes — the order of (y')³=x is 3, since that is the exponent shown in the equation", isCorrect: false, misconceptionId: `${ODE_ORDER}:MC-1` },
      { text: "Yes, since the order of an ODE is always read directly from the largest exponent appearing anywhere in the equation", isCorrect: false, misconceptionId: `${ODE_ORDER}:MC-1` },
    ],
    targetedMisconceptions: [`${ODE_ORDER}:MC-1`],
    source: eb(ODE_ORDER, 'Discovery Question 1 as a detection probe (verbatim) — whether the order in (y\')³=x is 3, an answer of "yes" confirming ORDER-IS-THE-POWER-OF-THE-DERIVATIVE'),
  },
  {
    conceptId: ODE_ORDER, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does every ODE have a well-defined degree, or can some ODEs lack one?',
    choices: [
      { text: "Some ODEs lack a degree — y''+sin(y')=0 has order 2 (y'' is highest) but degree UNDEFINED, since y' appears inside sin(·) rather than as a plain algebraic power; degree only applies once the ODE is confirmed polynomial in its derivatives", isCorrect: true },
      { text: 'Every ODE has a well-defined degree, no matter how the highest derivative appears in the equation', isCorrect: false, misconceptionId: `${ODE_ORDER}:MC-2` },
      { text: "Yes, every ODE has a degree, since degree can always be assigned as the order of the equation when no explicit power is visible", isCorrect: false, misconceptionId: `${ODE_ORDER}:MC-2` },
    ],
    targetedMisconceptions: [`${ODE_ORDER}:MC-2`],
    source: eb(ODE_ORDER, 'Discovery Question 2 as a detection probe (verbatim) — whether every ODE has a well-defined degree, an answer of "yes" confirming DEGREE-ALWAYS-EXISTS'),
  },
  {
    conceptId: ODE_ORDER, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does the number of arbitrary constants in a general solution match the order or the degree?',
    choices: [
      { text: "The order — the general solution y=C₁e^(2x)+C₂e^(-x)+3x has exactly 2 arbitrary constants, confirming the ODE is second-order, regardless of what degree the original equation had; the degree has no role in the constant count", isCorrect: true },
      { text: 'The degree — the number of arbitrary constants in a general solution always matches the degree of the ODE, not its order', isCorrect: false, misconceptionId: `${ODE_ORDER}:MC-3` },
      { text: "The degree, since higher powers on the highest derivative naturally require more constants to fully describe the solution", isCorrect: false, misconceptionId: `${ODE_ORDER}:MC-3` },
    ],
    targetedMisconceptions: [`${ODE_ORDER}:MC-3`],
    source: eb(ODE_ORDER, 'Discovery Question 3 as a detection probe (verbatim) — whether the number of arbitrary constants matches order or degree, an answer of "degree" confirming NUMBER-OF-CONSTANTS-EQUALS-DEGREE'),
  },
  {
    conceptId: SOLUTION_TYPES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Must every solution to an ODE be obtainable from the general solution formula for some choice of the constant?',
    choices: [
      { text: 'No — solving y\'=3y^(2/3) gives the general solution y=(x+C)³, but y≡0 satisfies the original equation directly (0=3·0=0) while no value of C makes (x+C)³ identically zero; y≡0 is a genuine singular solution, structurally excluded from the family', isCorrect: true },
      { text: 'Yes — every solution to an ODE must be obtainable from the general solution formula for some choice of the constant', isCorrect: false, misconceptionId: `${SOLUTION_TYPES}:MC-1` },
      { text: "Yes, since the general solution formula is derived to capture every function that satisfies the differential equation", isCorrect: false, misconceptionId: `${SOLUTION_TYPES}:MC-1` },
    ],
    targetedMisconceptions: [`${SOLUTION_TYPES}:MC-1`],
    source: eb(SOLUTION_TYPES, 'Discovery Question 1 as a detection probe (verbatim) — whether every solution must be obtainable from the general solution formula, an answer of "yes" confirming GENERAL-SOLUTION-ASSUMED-EXHAUSTIVE'),
  },
  {
    conceptId: SOLUTION_TYPES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If you claim a function is a singular solution, have you actually substituted it into the original equation to confirm it works?',
    choices: [
      { text: "That verification is required — a candidate singular solution must be confirmed by plugging it into the ORIGINAL, undivided ODE directly; y≡0's validity for y'=3y^(2/3) rests entirely on the direct check 0=3(0)^(2/3)=0, never merely asserted from being excluded", isCorrect: true },
      { text: 'That verification is unnecessary — a candidate singular solution can be asserted as valid simply from being excluded from the general family', isCorrect: false, misconceptionId: `${SOLUTION_TYPES}:MC-2` },
      { text: "No substitution is needed, since a function excluded from the general solution formula must automatically satisfy the original differential equation", isCorrect: false, misconceptionId: `${SOLUTION_TYPES}:MC-2` },
    ],
    targetedMisconceptions: [`${SOLUTION_TYPES}:MC-2`],
    source: eb(SOLUTION_TYPES, 'Discovery Question 2 as a detection probe (verbatim) — whether a singular-solution claim requires direct substitution to confirm, an answer skipping verification confirming SINGULAR-SOLUTION-VERIFICATION-SKIPPED'),
  },
  {
    conceptId: SOLUTION_TYPES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Can you point to the specific step in a separation-of-variables solution where a possibly-zero quantity was divided out?',
    choices: [
      { text: "Yes — the separation step y^(-2/3)dy=3dx requires dividing dy/dx=3y^(2/3) by y^(2/3), valid only when y≠0; this is exactly where y≡0 was silently excluded, even though it satisfies the original, undivided equation perfectly", isCorrect: true },
      { text: "No — singular solutions arise randomly and cannot be traced back to any specific step in the derivation", isCorrect: false, misconceptionId: `${SOLUTION_TYPES}:MC-3` },
      { text: "No, since a singular solution's exclusion is simply an inherent property of the general solution formula, unconnected to any particular derivation step", isCorrect: false, misconceptionId: `${SOLUTION_TYPES}:MC-3` },
    ],
    targetedMisconceptions: [`${SOLUTION_TYPES}:MC-3`],
    source: eb(SOLUTION_TYPES, 'Discovery Question 3 as a detection probe (verbatim) — whether a singular solution can be traced to a specific division step, an answer of "no" confirming DIVISION-STEP-CAUSING-SINGULAR-SOLUTION-NOT-IDENTIFIED'),
  },
  {
    conceptId: FIRST_ORDER_ODE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "Can y'=x+y² be separated, or does its structure rule that out?",
    choices: [
      { text: "Its structure rules that out — separability requires the right side to factor as h(x)·g(y), a genuine product, but x+y² is a sum; no product of a pure-x function and a pure-y function equals a sum, so this equation is never separable", isCorrect: true },
      { text: "Yes — y'=x+y² can be separated by moving the x-terms and y-terms to opposite sides of the equation", isCorrect: false, misconceptionId: `${FIRST_ORDER_ODE}:MC-1` },
      { text: "Yes, since any first-order ODE can be separated as long as you rearrange the terms correctly", isCorrect: false, misconceptionId: `${FIRST_ORDER_ODE}:MC-1` },
    ],
    targetedMisconceptions: [`${FIRST_ORDER_ODE}:MC-1`],
    source: eb(FIRST_ORDER_ODE, 'Discovery Question 1 as a detection probe (verbatim) — whether y\'=x+y² can be separated, an answer of "yes" confirming SEPARATION-ON-NON-SEPARABLE'),
  },
  {
    conceptId: FIRST_ORDER_ODE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'After ln|y|=3x+C, is y=e^(3x) the full general solution, or is something missing?',
    choices: [
      { text: "Something is missing — exponentiating gives |y|=e^(3x+C)=e^C·e^(3x), and since e^C is itself an arbitrary constant, it must be retained as a multiplicative constant A (writing y=Ae^(3x)); dropping it to y=e^(3x) destroys the general solution family", isCorrect: true },
      { text: 'y=e^(3x) is the full general solution — after exponentiating, the constant C simply disappears from the equation', isCorrect: false, misconceptionId: `${FIRST_ORDER_ODE}:MC-2` },
      { text: "Yes, it is complete, since exponentiating an additive constant always eliminates it entirely from the resulting expression", isCorrect: false, misconceptionId: `${FIRST_ORDER_ODE}:MC-2` },
    ],
    targetedMisconceptions: [`${FIRST_ORDER_ODE}:MC-2`],
    source: eb(FIRST_ORDER_ODE, 'Discovery Question 2 as a detection probe (verbatim) — whether y=e^(3x) is the full general solution after exponentiating ln|y|=3x+C, an answer of "yes, complete" confirming CONSTANT-ABSORBED-PREMATURELY'),
  },
  {
    conceptId: FIRST_ORDER_ODE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If you integrate both sides of a separated equation, does only one side gain a constant?',
    choices: [
      { text: 'No — integrating y dy=x dx gives y²/2+C₁=x²/2+C₂; since C₂-C₁ is itself arbitrary, it is written as a single constant C on one side (y²/2=x²/2+C), but both sides genuinely gained a constant during integration', isCorrect: true },
      { text: 'Yes — only one side of a separated equation gains a constant when both sides are integrated', isCorrect: false, misconceptionId: `${FIRST_ORDER_ODE}:MC-3` },
      { text: "Yes, since integration only introduces a constant on whichever side contains the variable being solved for", isCorrect: false, misconceptionId: `${FIRST_ORDER_ODE}:MC-3` },
    ],
    targetedMisconceptions: [`${FIRST_ORDER_ODE}:MC-3`],
    source: eb(FIRST_ORDER_ODE, 'Discovery Question 3 as a detection probe (verbatim) — whether only one side of a separated equation gains a constant, an answer of "yes" confirming SINGLE-SIDE-CONSTANT'),
  },
]
