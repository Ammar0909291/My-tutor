/**
 * Batch: euler-method, linear-first-order, second-order-linear (math.de).
 *
 * Fresh Phase 0 frontier recompute after the ivp/ode-linearity/second-
 * order-ode batch found math.de.euler-method NEWLY READY (requires
 * first-order-ode + ivp, both now authored). Authoring math.de.euler-method
 * this batch directly unblocks math.num.euler-method (its cross_link
 * target; requires math.de.euler-method + math.num.error-analysis, the
 * latter already authored this campaign), which in turn unblocks
 * math.num.runge-kutta then math.num.stiff-ode — closing math.num entirely
 * once those two follow. Also authors linear-first-order (the integrating-
 * factor method, opens bernoulli) and second-order-linear (opens
 * second-order-homogeneous). Transcribed from the frozen Educational Brain
 * entries at educational-brain/concepts/mathematics/math.de.{euler-method,
 * linear-first-order,second-order-linear}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, continuing math.de's established
 * domain baseline.
 *
 *   EULER-METHOD  The slope in Euler's method is NEVER frozen at the
 *           initial value — it must be re-evaluated at every new point
 *           before each step; halving the step size h NEVER quarters the
 *           total (global) error just because per-step (local) error is
 *           O(h^2) — the doubled step count reduces this to global O(h), so
 *           halving h roughly halves total error; and an Euler
 *           approximation's output is NEVER the solution's exact value —
 *           it is an approximation carrying a systematic, directed error.
 *   LINEAR-FIRST-ORDER  The integrating factor mu=e^(integral P dx) NEVER
 *           needs its own arbitrary constant — any antiderivative of P
 *           works, since a constant inside mu's exponent cancels out; after
 *           integrating to get mu*y, that quantity is NEVER already y — the
 *           final division by mu is a required, easily-forgotten step; and
 *           the integrating factor method NEVER applies to an equation
 *           merely resembling the standard form — a Bernoulli equation
 *           needs a substitution to first convert it to genuine linear form.
 *   SECOND-ORDER-LINEAR  Whether a second-order linear ODE is homogeneous or
 *           nonhomogeneous is NEVER determined by how complicated P(x) or
 *           Q(x) look — it depends entirely on whether G(x)=0; if y1 solves
 *           a nonhomogeneous equation, 2y1 is NEVER also guaranteed to
 *           solve it — superposition is strictly a homogeneous-case
 *           privilege; and the solution set of a nonhomogeneous linear ODE
 *           is NEVER a vector space — the zero function itself fails to
 *           solve it when G is nonzero, breaking closure immediately.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const EULER_METHOD = 'math.de.euler-method'
const LINEAR_FIRST_ORDER = 'math.de.linear-first-order'
const SECOND_ORDER_LINEAR = 'math.de.second-order-linear'

export const MATHEMATICS_DE_EULER_METHOD_LINEAR_FIRST_ORDER_SECOND_ORDER_LINEAR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: EULER_METHOD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "THE SLOPE MUST BE RE-EVALUATED AT EVERY NEW POINT — NEVER FROZEN AT THE INITIAL VALUE: for "
      + "$(y'=x+y,y(0)=1,h=0.1)$: step 0 uses $(f(0,1)=1)$, giving $(y_1=1.1)$; step 1 uses the "
      + 'NEW slope $(f(0.1,1.1)=1.2)$, giving $(y_2=1.22)$; step 2 uses $(f(0.2,1.22)=1.42)$, '
      + 'giving $(y_3=1.362)$. Freezing the slope at the initial $(f(0,1)=1)$ throughout would '
      + 'instead give the plainly different, much worse $(1+3(0.1)(1)=1.3)$ — the method\'s '
      + 'entire intelligence lives in this per-row re-evaluation.\n\n'
      + 'PER-STEP ERROR IS O(h^2) BUT GLOBAL ERROR IS ONLY O(h) — HALVING h HALVES, NEVER '
      + 'QUARTERS, THE TOTAL ERROR: within one step, the tangent line matches the true '
      + 'solution\'s value and slope at $(x_n)$, so the disagreement is the curvature term '
      + '$((h^2/2)y\'\'(\\xi))$ — local error $O(h^2)$. Reaching $x=b$ from $(x_0=a)$ takes '
      + '$(N=(b-a)/h)$ steps; compounding N errors of size $O(h^2)$ gives total $(O(N\\cdot '
      + 'h^2)=O(h))$ — ONE power of h is lost exactly because the step COUNT grows as h shrinks. '
      + "For $(y'=y,y(0)=1)$ approximating $(e\\approx2.71828)$: with $(h=0.5)$, error is "
      + '$(0.46828)$; with $(h=0.25)$, error is $(0.27687)$ — ratio $\\approx0.59$, roughly '
      + 'HALVED, emphatically NOT quartered.\n\n'
      + "EULER'S OUTPUT IS AN APPROXIMATION WITH A SYSTEMATIC ERROR DIRECTION — NEVER THE EXACT "
      + 'VALUE: both $(h=0.5)$\'s $(2.25)$ and $(h=0.25)$\'s $(2.44141)$ are BELOW the true '
      + '$(e\\approx2.71828)$ — a genuine UNDERSHOOT, because $e^x$ is convex (slope increasing '
      + 'across every step), so the frozen left-endpoint slope is always too small for the whole '
      + 'step. Different h values give different numbers, and NEITHER is "the answer" — both '
      + 'carry visible, measurable, systematically-directed error.',
    targetedMisconceptions: [`${EULER_METHOD}:MC-1`, `${EULER_METHOD}:MC-2`, `${EULER_METHOD}:MC-3`],
    source: eb(EULER_METHOD, "Core Understanding — the slope needing re-evaluation at every new point never frozen at the initial value, per-step error being O(h^2) but global error only O(h) so halving h roughly halves total error, and Euler's output being an approximation with a systematic error direction never the exact value"),
  },
  {
    conceptId: LINEAR_FIRST_ORDER, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE INTEGRATING FACTOR NEEDS NO ARBITRARY CONSTANT IN ITS OWN EXPONENT: '
      + '$(\\mu(x)=e^{\\int P(x)dx})$ uses ANY antiderivative of P; writing '
      + '$(\\mu=Ce^{\\int Pdx})$ instead just rescales $\\mu$ by a constant factor that CANCELS '
      + 'when the equation is later divided through — the single true arbitrary constant comes '
      + 'from integrating $(\\mu Q)$ afterward, never from $\\mu$ itself. The convention: set the '
      + 'constant inside $\\mu$\'s exponent to zero, giving the simplest $(\\mu=e^{\\int '
      + 'Pdx})$.\n\n'
      + 'AFTER INTEGRATING, Y MUST BE ISOLATED BY DIVIDING BY MU — NEVER LEFT AS MU*Y: for '
      + "$(dy/dx+y/x=x,\\ y(1)=2)$: $(P=1/x,\\mu=x)$. Multiplying gives $((xy)'=x^2)$, "
      + 'integrating gives $(xy=x^3/3+C)$ — this is $\\mu y$, NOT y. Dividing by $(\\mu=x)$: '
      + '$(y=x^2/3+C/x)$. Applying $(y(1)=2)$: $(2=1/3+C\\Rightarrow C=5/3)$, giving '
      + '$(y=x^2/3+5/(3x))$. Stopping at $(xy=x^3/3+C)$ without the final division leaves the '
      + 'wrong quantity isolated.\n\n'
      + 'THE METHOD APPLIES ONLY TO THE EXACT STANDARD FORM WITH P,Q FUNCTIONS OF X ONLY — NEVER '
      + 'TO A DIFFERENT SIGN CONVENTION OR A NONLINEAR EQUATION: for a Bernoulli equation '
      + '$(dy/dx+P(x)y=Q(x)y^n)$ ($n\\ne0,1$): the right side depends on y itself, so the '
      + 'integrating factor method does NOT apply directly — the substitution $(v=y^{1-n})$ must '
      + 'FIRST convert it to genuine linear form before $\\mu$ can be computed. Checking the '
      + 'equation is genuinely in standard form — never guessing based on surface resemblance — '
      + 'is a required first step.',
    targetedMisconceptions: [`${LINEAR_FIRST_ORDER}:MC-1`, `${LINEAR_FIRST_ORDER}:MC-2`, `${LINEAR_FIRST_ORDER}:MC-3`],
    source: eb(LINEAR_FIRST_ORDER, "Core Understanding — the integrating factor needing no arbitrary constant in its own exponent, y needing to be isolated by dividing by mu after integrating never left as mu*y, and the method applying only to the exact standard form never a different sign convention or nonlinear equation"),
  },
  {
    conceptId: SECOND_ORDER_LINEAR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "HOMOGENEOUS-VERSUS-NONHOMOGENEOUS DEPENDS ENTIRELY ON WHETHER G(X)=0 — NEVER ON HOW "
      + "COMPLEX P(X) OR Q(X) LOOK: for $(y''+3xy'-e^xy=\\sin x)$: despite the complicated-"
      + 'looking $(P(x)=3x)$ and $(Q(x)=-e^x)$, classification depends SOLELY on '
      + '$(G(x)=\\sin x\\ne0)$ — NONHOMOGENEOUS. An equation with simple P,Q but nonzero G is '
      + 'still nonhomogeneous; only checking $(G(x)=0)$ determines the case, regardless of '
      + 'coefficient complexity.\n\n'
      + "SUPERPOSITION HOLDS FOR THE HOMOGENEOUS CASE — A DIRECT CONSEQUENCE OF LINEARITY: for "
      + "$(y''-y=0)$: both $(y_1=e^x)$ and $(y_2=e^{-x})$ satisfy the equation. The specific "
      + 'combination $(y=3e^x-2e^{-x})$ ALSO satisfies it: $(y\'\'=3e^x-2e^{-x}=y)$, so '
      + "$(y''-y=0)$ holds. This follows because "
      + '$(L[c_1y_1+c_2y_2]=c_1L[y_1]+c_2L[y_2]=c_1(0)+c_2(0)=0)$ for ANY constants '
      + '$(c_1,c_2)$ — the homogeneous solution set is closed under addition and scalar '
      + 'multiplication, and contains the zero function, exactly the closure properties of a '
      + 'VECTOR SPACE.\n\n'
      + "SUPERPOSITION FAILS FOR THE NONHOMOGENEOUS CASE — NEVER ASSUME IT CARRIES OVER: for "
      + "$(y''-y=2)$: $(y_1=-2)$ is a particular solution ($(y_1''-y_1=0-(-2)=2)$). But "
      + "$(2y_1=-4)$: is NOT a solution — $((2y_1)''-2y_1=0-(-4)=4\\ne2)$. Because "
      + '$(L[c_1y_1+c_2y_2]=(c_1+c_2)G(x))$, this equals $G(x)$ again ONLY when '
      + '$(c_1+c_2=1)$, never for arbitrary constants — superposition, in its simple form, is '
      + 'strictly a homogeneous-case privilege. Additionally, the zero function itself fails to '
      + 'solve a nonhomogeneous equation ($(L[0]=0\\ne G(x))$ when $(G\\ne0)$), immediately '
      + 'disqualifying vector-space status.',
    targetedMisconceptions: [`${SECOND_ORDER_LINEAR}:MC-1`, `${SECOND_ORDER_LINEAR}:MC-2`, `${SECOND_ORDER_LINEAR}:MC-3`],
    source: eb(SECOND_ORDER_LINEAR, 'Core Understanding — homogeneous-versus-nonhomogeneous depending entirely on whether G(x)=0 never on P(x) or Q(x)\'s complexity, superposition holding for the homogeneous case as a direct consequence of linearity, and superposition failing for the nonhomogeneous case never carrying over'),
  },
]

export const MATHEMATICS_DE_EULER_METHOD_LINEAR_FIRST_ORDER_SECOND_ORDER_LINEAR_PROBES: SeedProbe[] = [
  {
    conceptId: EULER_METHOD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'At step 3 of an Euler table, which point\'s slope goes into the update — the initial slope, or the slope at where we are now?',
    choices: [
      { text: "The slope at where we are now — for y'=x+y,y(0)=1,h=0.1, step 1 uses the NEW slope f(0.1,1.1)=1.2, not the initial f(0,1)=1; re-evaluating the slope at each new point is the method's entire intelligence", isCorrect: true },
      { text: 'The initial slope — the same slope computed at the starting point is reused for every subsequent step', isCorrect: false, misconceptionId: `${EULER_METHOD}:MC-2` },
      { text: "The initial slope, since recomputing it at every step would be redundant once the function's behavior near the start is known", isCorrect: false, misconceptionId: `${EULER_METHOD}:MC-2` },
    ],
    targetedMisconceptions: [`${EULER_METHOD}:MC-2`],
    source: eb(EULER_METHOD, 'Discovery Question 1 as a detection probe (verbatim) — whether the update uses the initial slope or the current slope, an answer of "initial slope" confirming SLOPE-ASSUMED-FROZEN-FROM-INITIAL-POINT'),
  },
  {
    conceptId: EULER_METHOD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If halving the step size makes each individual step four times more accurate, why isn\'t the final answer four times more accurate?',
    choices: [
      { text: "Because halving h doubles the number of compounding steps needed to reach the endpoint; compounding N=O(1/h) errors of size O(h²) each gives total O(h), so one power of h is lost — for y'=y, halving h from 0.5 to 0.25 gave error ratio ≈0.59, roughly halved not quartered", isCorrect: true },
      { text: 'The final answer actually IS four times more accurate, since the per-step improvement directly transfers to the overall result', isCorrect: false, misconceptionId: `${EULER_METHOD}:MC-3` },
      { text: "It should be four times more accurate, and any deviation from that ratio in practice indicates a computational error", isCorrect: false, misconceptionId: `${EULER_METHOD}:MC-3` },
    ],
    targetedMisconceptions: [`${EULER_METHOD}:MC-3`],
    source: eb(EULER_METHOD, 'Discovery Question 2 as a detection probe (verbatim) — why the final answer isn\'t four times more accurate despite each step being so, an answer assuming it should be confirming LOCAL-ERROR-ORDER-ASSUMED-GLOBAL'),
  },
  {
    conceptId: EULER_METHOD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Is the value in the final row of an Euler table the solution's actual value at that point?",
    choices: [
      { text: "No — both h=0.5's approximation 2.25 and h=0.25's approximation 2.44141 are BELOW the true e≈2.71828, a genuine undershoot from the convex e^x; different h values give different numbers, and neither is 'the answer' — both carry measurable, directed error", isCorrect: true },
      { text: "Yes — the final row of an Euler table gives the solution's exact value at that point", isCorrect: false, misconceptionId: `${EULER_METHOD}:MC-1` },
      { text: "Yes, since Euler's method is derived directly from the differential equation and therefore produces exact values at each computed point", isCorrect: false, misconceptionId: `${EULER_METHOD}:MC-1` },
    ],
    targetedMisconceptions: [`${EULER_METHOD}:MC-1`],
    source: eb(EULER_METHOD, 'Discovery Question 3 as a detection probe (verbatim) — whether the final row of an Euler table is the exact value, an answer of "yes" confirming EULER-OUTPUT-ASSUMED-EXACT'),
  },
  {
    conceptId: LINEAR_FIRST_ORDER, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does the integrating factor μ=e^(∫P dx) need its own arbitrary constant, or does any antiderivative work?',
    choices: [
      { text: 'Any antiderivative works — writing μ=Ce^(∫P dx) instead just rescales μ by a constant that CANCELS when the equation is later divided through; the single true arbitrary constant comes from integrating μQ afterward, never from μ itself', isCorrect: true },
      { text: 'The integrating factor needs its own arbitrary constant C, which must be carried through the rest of the solution alongside the constant from integration', isCorrect: false, misconceptionId: `${LINEAR_FIRST_ORDER}:MC-1` },
      { text: "Yes, since every antiderivative computation in calculus requires a +C term to represent the full family of antiderivatives", isCorrect: false, misconceptionId: `${LINEAR_FIRST_ORDER}:MC-1` },
    ],
    targetedMisconceptions: [`${LINEAR_FIRST_ORDER}:MC-1`],
    source: eb(LINEAR_FIRST_ORDER, 'Discovery Question 1 as a detection probe (verbatim) — whether the integrating factor needs its own arbitrary constant, an answer of "yes" confirming INTEGRATING-FACTOR-MUST-INCLUDE-CONSTANT'),
  },
  {
    conceptId: LINEAR_FIRST_ORDER, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'After integrating to get μy = ∫μQ dx + C, have you divided by μ to isolate y?',
    choices: [
      { text: "That division is required — for dy/dx+y/x=x, integrating gives xy=x³/3+C, which is μy, NOT y; dividing by μ=x gives the correct y=x²/3+C/x, and stopping before that division leaves the wrong quantity isolated", isCorrect: true },
      { text: 'That division is unnecessary — once μy = ∫μQ dx + C is obtained, y has already been fully solved for', isCorrect: false, misconceptionId: `${LINEAR_FIRST_ORDER}:MC-2` },
      { text: "No division is needed, since μy and y represent the same solved quantity once the integration step is complete", isCorrect: false, misconceptionId: `${LINEAR_FIRST_ORDER}:MC-2` },
    ],
    targetedMisconceptions: [`${LINEAR_FIRST_ORDER}:MC-2`],
    source: eb(LINEAR_FIRST_ORDER, 'Discovery Question 2 as a detection probe (verbatim) — whether dividing by μ is still needed after integrating to μy=∫μQ dx+C, an answer of "no" confirming FORGETTING-TO-DIVIDE-BY-MU-AT-THE-END'),
  },
  {
    conceptId: LINEAR_FIRST_ORDER, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is dy/dx + P(x)y = Q(x)yⁿ already in the linear standard form, or does it need converting first?',
    choices: [
      { text: "It needs converting first — this is a Bernoulli equation, and since the right side depends on y itself, the integrating factor method does NOT apply directly; the substitution v=y^(1-n) must first convert it to genuine linear form", isCorrect: true },
      { text: 'It is already in the linear standard form dy/dx+P(x)y=Q(x), and the integrating factor method can be applied directly without any conversion', isCorrect: false, misconceptionId: `${LINEAR_FIRST_ORDER}:MC-3` },
      { text: "Yes, since any equation with a single y-term and its derivative on the left side automatically qualifies as linear standard form", isCorrect: false, misconceptionId: `${LINEAR_FIRST_ORDER}:MC-3` },
    ],
    targetedMisconceptions: [`${LINEAR_FIRST_ORDER}:MC-3`],
    source: eb(LINEAR_FIRST_ORDER, 'Discovery Question 3 as a detection probe (verbatim) — whether dy/dx+P(x)y=Q(x)yⁿ is already in linear standard form, an answer of "yes" confirming MISIDENTIFYING-THE-STANDARD-FORM'),
  },
  {
    conceptId: SECOND_ORDER_LINEAR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "Does an equation's homogeneous/nonhomogeneous status depend on how complicated P(x) or Q(x) look, or only on whether G(x)=0?",
    choices: [
      { text: "Only on whether G(x)=0 — y''+3xy'-e^xy=sin x is NONHOMOGENEOUS purely because G(x)=sin x≠0, despite the complicated-looking P(x)=3x and Q(x)=-eˣ; coefficient complexity never determines the classification", isCorrect: true },
      { text: "It depends on the complexity of P(x) or Q(x) — more complicated coefficients tend to indicate a nonhomogeneous equation", isCorrect: false, misconceptionId: `${SECOND_ORDER_LINEAR}:MC-2` },
      { text: "It depends on both G(x) and the coefficients together, since a fully correct classification must account for every term's structure", isCorrect: false, misconceptionId: `${SECOND_ORDER_LINEAR}:MC-2` },
    ],
    targetedMisconceptions: [`${SECOND_ORDER_LINEAR}:MC-2`],
    source: eb(SECOND_ORDER_LINEAR, 'Discovery Question 1 as a detection probe (verbatim) — whether homogeneous/nonhomogeneous status depends on P/Q complexity or only G(x), an answer citing coefficient complexity confirming HOMOGENEOUS-NONHOMOGENEOUS-DETERMINED-BY-COEFFICIENT-STRUCTURE'),
  },
  {
    conceptId: SECOND_ORDER_LINEAR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If y₁ solves a nonhomogeneous equation L[y]=G(x), does 2y₁ also solve it?',
    choices: [
      { text: "No — for y''-y=2, y₁=-2 is a particular solution, but 2y₁=-4 is NOT: (2y₁)''-2y₁=0-(-4)=4≠2; L[c₁y₁+c₂y₂]=(c₁+c₂)G(x) equals G(x) again only when c₁+c₂=1, never for arbitrary constants", isCorrect: true },
      { text: 'Yes — if y₁ solves a nonhomogeneous linear equation, any constant multiple like 2y₁ also solves it', isCorrect: false, misconceptionId: `${SECOND_ORDER_LINEAR}:MC-1` },
      { text: "Yes, since superposition is a general property of all linear differential equations regardless of whether the right-hand side is zero", isCorrect: false, misconceptionId: `${SECOND_ORDER_LINEAR}:MC-1` },
    ],
    targetedMisconceptions: [`${SECOND_ORDER_LINEAR}:MC-1`],
    source: eb(SECOND_ORDER_LINEAR, 'Discovery Question 2 as a detection probe (verbatim) — whether 2y₁ also solves a nonhomogeneous equation if y₁ does, an answer of "yes" confirming SUPERPOSITION-APPLIED-TO-NONHOMOGENEOUS-CASE'),
  },
  {
    conceptId: SECOND_ORDER_LINEAR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does the solution set of a nonhomogeneous linear ODE form a vector space, the same as the homogeneous case?',
    choices: [
      { text: "No — the zero function itself fails to solve a nonhomogeneous equation (L[0]=0≠G(x) when G≠0), immediately disqualifying vector-space status by breaking the very first closure requirement", isCorrect: true },
      { text: "Yes — a nonhomogeneous linear ODE's solution set forms a vector space, just as the homogeneous case does", isCorrect: false, misconceptionId: `${SECOND_ORDER_LINEAR}:MC-3` },
      { text: "Yes, since vector-space status is a general property of any equation described as 'linear', regardless of whether it is homogeneous", isCorrect: false, misconceptionId: `${SECOND_ORDER_LINEAR}:MC-3` },
    ],
    targetedMisconceptions: [`${SECOND_ORDER_LINEAR}:MC-3`],
    source: eb(SECOND_ORDER_LINEAR, 'Discovery Question 3 as a detection probe (verbatim) — whether a nonhomogeneous linear ODE\'s solution set forms a vector space, an answer of "yes" confirming SOLUTION-SET-VECTOR-SPACE-STATUS-ASSUMED-FOR-NONHOMOGENEOUS'),
  },
]
