/**
 * Batch: ivp, ode-linearity, second-order-ode (math.de).
 *
 * Fresh Phase 0 frontier recompute after the ode-order/solution-types/
 * first-order-ode batch found 7 ready concepts (ode-linearity, ivp,
 * separable, exact-ode, slope-field, second-order-ode, pde). This batch
 * prioritizes math.de.ivp specifically since it directly advances toward
 * math.de.euler-method (requires first-order-ode + ivp, both authored or
 * being authored this batch/prior batch), the concept that directly
 * unblocks math.num.euler-method. Also authors ode-linearity (opens
 * linear-first-order and second-order-linear) and second-order-ode (opens
 * the entire second-order chain: higher-order-ode, systems-ode).
 * Transcribed from the frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.de.{ivp,ode-linearity,second-order-ode}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, continuing math.de's established
 * domain baseline.
 *
 *   IVP  The same ODE with the same number of conditions is NEVER guaranteed
 *           the same solvability outcome regardless of placement — moving
 *           conditions from one point (IVP, uniqueness guaranteed) to
 *           several points (BVP) can turn a guaranteed-unique problem into
 *           one with no solution at all; an IVP's arbitrary constants are
 *           NEVER solved for one condition at a time in isolation — all
 *           conditions must be solved as a simultaneous system together; and
 *           a higher-order IVP is NEVER fully specified by the function
 *           value alone — an order-n ODE needs n conditions, including
 *           derivatives at the initial point.
 *   ODE-LINEARITY  Linearity is NEVER judged by an ODE's overall visual
 *           complexity — complicated x-only coefficients never disqualify
 *           linearity, and a simple-looking equation is never automatically
 *           linear; a product term like yy' is NEVER safe to overlook just
 *           because it isn't the first term encountered — one such term
 *           anywhere disqualifies the whole equation; and y appearing inside
 *           a nonlinear function like sin(y) is NEVER a lesser disqualifier
 *           than a product term — both criteria independently disqualify
 *           linearity.
 *   SECOND-ORDER-ODE  A second-order ODE's general solution is NEVER
 *           correctly written with only one arbitrary constant — order 2
 *           always means two constants and two conditions; a repeated
 *           root's naive sum C1e^(rx)+C2e^(rx) is NEVER a genuine two-
 *           constant family — it secretly collapses to one, requiring the
 *           x-factor fix xe^(rx) for the genuine second solution; and the
 *           real and imaginary parts extracted from complex roots are NEVER
 *           interchangeable — the real part is always the exponential
 *           envelope and the imaginary part is always the oscillation
 *           frequency.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const IVP = 'math.de.ivp'
const ODE_LINEARITY = 'math.de.ode-linearity'
const SECOND_ORDER_ODE = 'math.de.second-order-ode'

export const MATHEMATICS_DE_IVP_ODE_LINEARITY_SECOND_ORDER_ODE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: IVP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "ALL CONDITIONS OF AN IVP ARE ANCHORED AT ONE POINT, NEVER SPREAD ACROSS SEVERAL: for "
      + "$(y''-5y'+6y=0)$ (general solution $(y=C_1e^{2x}+C_2e^{3x})$) with $(y(0)=1)$, "
      + '$(y\'(0)=0)$ — BOTH conditions at $(x_0=0)$. This extends the general/particular-'
      + 'solution framework directly: the initial conditions are simply the specific values used '
      + 'to solve for the arbitrary constants.\n\n'
      + 'THE N CONDITIONS MUST BE SOLVED SIMULTANEOUSLY, NEVER SEQUENTIALLY ONE AT A TIME: '
      + 'substituting $(y(0)=C_1+C_2=1)$ and (from $(y\'=2C_1e^{2x}+3C_2e^{3x})$) '
      + '$(y\'(0)=2C_1+3C_2=0)$ gives a SYSTEM of two equations in two unknowns. Solving '
      + 'together: $(C_1=1-C_2)$, then $(2(1-C_2)+3C_2=0\\Rightarrow C_2=-2)$, $(C_1=3)$ — '
      + 'giving $(y=3e^{2x}-2e^{3x})$, verified directly: $(y(0)=3-2=1)$ and '
      + '$(y\'(0)=6-6=0)$. Treating each condition as pinning down one constant in isolation, '
      + 'without using both equations together, is not the correct method.\n\n'
      + 'CONDITION PLACEMENT — NOT JUST CONDITION COUNT — DETERMINES THE SOLVABILITY GUARANTEE: '
      + "for the SAME ODE $(y''+y=0)$ (general solution $(y=C_1\\cos x+C_2\\sin x)$): as an IVP "
      + 'with $(y(0)=0,y\'(0)=1)$ (both at $x=0$), substitution gives $(C_1=0,C_2=1)$ — the '
      + 'UNIQUE solution $(y=\\sin x)$, guaranteed. As a BVP instead with $(y(0)=0,y(\\pi)=1)$ '
      + '(split across two points): $(C_1=0)$ from the first, then '
      + '$(y(\\pi)=C_1\\cos\\pi+C_2\\sin\\pi=0)$ — but the condition demands 1, a CONTRADICTION '
      + '— NO solution exists at all. Same ODE, same NUMBER (2) of conditions — the only '
      + 'difference is WHERE they\'re placed, and that alone changes the guarantee from "always '
      + 'unique" to "possibly none."',
    targetedMisconceptions: [`${IVP}:MC-1`, `${IVP}:MC-2`, `${IVP}:MC-3`],
    source: eb(IVP, 'Core Understanding — all conditions of an IVP being anchored at one point never spread across several, the n conditions needing to be solved simultaneously never sequentially, and condition placement (not just count) determining the solvability guarantee'),
  },
  {
    conceptId: ODE_LINEARITY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "LINEARITY IS A PRECISE STRUCTURAL TEST, NOT A JUDGMENT OF VISUAL COMPLEXITY: reusing the "
      + 'ODE concept\'s own order vocabulary directly, an ODE is linear iff it is a linear '
      + 'combination $(a_n(x)y^{(n)}+\\cdots+a_0(x)y=f(x))$ where each $(a_i(x))$ depends ONLY '
      + 'on $x$, and $(y,y\',\\dots,y^{(n)})$ each appear to the FIRST power, unmultiplied by '
      + 'each other. For $(x^3y\'\'-2xy\'+\\sqrt{x}\\,y=e^x)$: every coefficient '
      + '($(x^3,-2x,\\sqrt x)$) depends only on $x$, and $(y,y\',y\'\')$ each appear alone to '
      + 'the first power — LINEAR, despite the coefficients looking complicated.\n\n'
      + 'TWO DISTINCT STRUCTURAL FAILURES DISQUALIFY LINEARITY: (1) a PRODUCT of y-terms — e.g. '
      + '$(y\'\'+yy\'-3y=0)$ fails purely because of the single $(yy\')$ term, however simple '
      + "the rest of the equation looks; (2) y (or a derivative) appearing inside a NONLINEAR "
      + 'FUNCTION — e.g. $(y\'+\\sin(y)=x)$ fails because $(\\sin(y))$ cannot be written as '
      + '(function of x alone) times y, even with no product of y-terms present anywhere.\n\n'
      + "LINEARITY NEVER TRACKS THE COEFFICIENTS' OWN COMPLEXITY: the simple-looking "
      + '$(y\'+y^2=0)$ is NONLINEAR purely due to the single $y^2$ term, while the visually '
      + 'complicated $(x^2\\sin(x)y\'\'+e^xy\'-\\frac1xy=\\cos x)$ is genuinely LINEAR — every '
      + 'coefficient depends only on $x$ and every y-term appears alone to the first power. '
      + '"Looks simple" and "looks complicated" are never valid tests; only the precise '
      + 'structural criterion is.',
    targetedMisconceptions: [`${ODE_LINEARITY}:MC-1`, `${ODE_LINEARITY}:MC-2`, `${ODE_LINEARITY}:MC-3`],
    source: eb(ODE_LINEARITY, "Core Understanding — linearity being a precise structural test never a judgment of visual complexity, two distinct structural failures disqualifying linearity (a product of y-terms, or y inside a nonlinear function), and linearity never tracking the coefficients' own complexity"),
  },
  {
    conceptId: SECOND_ORDER_ODE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "ORDER 2 MEANS TWO CONSTANTS AND TWO CONDITIONS, ALWAYS: reusing the first-order ODE "
      + "concept's own exponential-trial technique directly, guessing $(y=e^{rx})$ in "
      + "$(y''-5y'+6y=0)$ gives $((r^2-5r+6)e^{rx}=0\\Rightarrow r^2-5r+6=0\\Rightarrow "
      + 'r=2,3)$. By superposition, $(y=C_1e^{2x}+C_2e^{3x})$ is the general solution — TWO '
      + 'independent exponentials, TWO constants. A second-order equation prescribes '
      + 'acceleration; pinning one trajectory requires BOTH a starting position $(y(x_0))$ AND '
      + "a starting velocity $(y'(x_0))$ — two independent choices demand two dials, never "
      + 'one.\n\n'
      + 'THE THREE ROOT CASES ARE DECIDED BY THE DISCRIMINANT, BUT ALL GIVE EXACTLY TWO '
      + 'CONSTANTS: $(\\Delta=b^2-4ac>0)$ gives distinct real roots, '
      + '$(y=C_1e^{r_1x}+C_2e^{r_2x})$; $(\\Delta=0)$ gives a repeated root $r$, '
      + '$(y=(C_1+C_2x)e^{rx})$; $(\\Delta<0)$ gives complex roots $(\\alpha\\pm\\beta i)$, '
      + '$(y=e^{\\alpha x}(C_1\\cos\\beta x+C_2\\sin\\beta x))$ (via Euler\'s formula, '
      + 'extracting the real and imaginary parts of $(e^{(\\alpha+\\beta i)x})$ as two '
      + 'independent real solutions). Only the BUILDING BLOCKS change across cases — the count '
      + 'of constants never does.\n\n'
      + "A REPEATED ROOT'S NAIVE SUM COLLAPSES TO ONE CONSTANT, REQUIRING THE X-FACTOR FIX: for "
      + "$(y''-4y'+4y=0)$, $((r-2)^2=0)$ gives a double root $(r=2)$. Writing "
      + '$(y=C_1e^{2x}+C_2e^{2x}=(C_1+C_2)e^{2x})$ MERGES the two constants into one — a '
      + 'disguised one-parameter family that cannot meet two initial conditions. The genuine '
      + 'second, independent solution is $(xe^{2x})$ (verified directly by substitution), '
      + 'giving the correct $(y=(C_1+C_2x)e^{2x})$.',
    targetedMisconceptions: [`${SECOND_ORDER_ODE}:MC-1`, `${SECOND_ORDER_ODE}:MC-2`, `${SECOND_ORDER_ODE}:MC-3`],
    source: eb(SECOND_ORDER_ODE, "Core Understanding — order 2 always meaning two constants and two conditions, the three root cases being decided by the discriminant but all giving exactly two constants, and a repeated root's naive sum collapsing to one constant requiring the x-factor fix"),
  },
]

export const MATHEMATICS_DE_IVP_ODE_LINEARITY_SECOND_ORDER_ODE_PROBES: SeedProbe[] = [
  {
    conceptId: IVP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If two problems share the same ODE and the same number of conditions, are they guaranteed the same kind of solvability outcome?',
    choices: [
      { text: "No — for y''+y=0, the IVP y(0)=0,y'(0)=1 (both at x=0) gives the unique solution y=sin x, but the BVP y(0)=0,y(π)=1 (split across two points) leads to a contradiction with NO solution; same ODE, same count of conditions, but placement changes the guarantee entirely", isCorrect: true },
      { text: 'Yes — the same ODE with the same number of conditions always guarantees the same kind of solvability outcome, regardless of where those conditions are placed', isCorrect: false, misconceptionId: `${IVP}:MC-1` },
      { text: "Yes, since the total number of conditions is what determines whether a unique solution exists, not where those conditions happen to be evaluated", isCorrect: false, misconceptionId: `${IVP}:MC-1` },
    ],
    targetedMisconceptions: [`${IVP}:MC-1`],
    source: eb(IVP, 'Discovery Question 1 as a detection probe (verbatim) — whether the same ODE and condition count guarantees the same solvability outcome, an answer of "yes" confirming CONDITION-COUNT-ASSUMED-TO-DETERMINE-OUTCOME-REGARDLESS-OF-PLACEMENT'),
  },
  {
    conceptId: IVP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Should you solve for each arbitrary constant using one condition at a time, or set up and solve the full system from all conditions together?',
    choices: [
      { text: "The full system together — for y''-5y'+6y=0 with y(0)=1,y'(0)=0, substituting both conditions gives a system C₁+C₂=1 and 2C₁+3C₂=0, solved together to get C₁=3,C₂=-2; using one condition at a time discards the coupling between constants", isCorrect: true },
      { text: 'One condition at a time — each arbitrary constant should be solved using only one condition in isolation', isCorrect: false, misconceptionId: `${IVP}:MC-2` },
      { text: "One at a time, since each initial condition is designed to pin down exactly one specific constant independently of the others", isCorrect: false, misconceptionId: `${IVP}:MC-2` },
    ],
    targetedMisconceptions: [`${IVP}:MC-2`],
    source: eb(IVP, 'Discovery Question 2 as a detection probe (verbatim) — whether constants should be solved one condition at a time or as a full simultaneous system, an answer favoring one-at-a-time confirming INITIAL-CONDITIONS-SOLVED-SEQUENTIALLY-INSTEAD-OF-SIMULTANEOUSLY'),
  },
  {
    conceptId: IVP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "For a second-order ODE's initial value problem, is giving only y(x₀) enough to fully specify the IVP?",
    choices: [
      { text: "No — an order-n ODE needs exactly n conditions at the initial point, so a second-order IVP needs BOTH y(x₀) AND y'(x₀); giving only the function value omits the required derivative condition", isCorrect: true },
      { text: "Yes — giving only y(x₀) is sufficient to fully specify a second-order ODE's initial value problem", isCorrect: false, misconceptionId: `${IVP}:MC-3` },
      { text: "Yes, since the function value at the initial point already encodes all the information needed to determine a unique solution for any order ODE", isCorrect: false, misconceptionId: `${IVP}:MC-3` },
    ],
    targetedMisconceptions: [`${IVP}:MC-3`],
    source: eb(IVP, 'Discovery Question 3 as a detection probe (verbatim) — whether y(x₀) alone fully specifies a second-order IVP, an answer of "yes" confirming DERIVATIVE-CONDITIONS-OMITTED-FOR-HIGHER-ORDER-IVPS'),
  },
  {
    conceptId: ODE_LINEARITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Between a linear ODE with complicated-looking x-coefficients and a simple-looking nonlinear one, which is actually linear?',
    choices: [
      { text: "The complicated one — x³y''-2xy'+√x·y=eˣ is genuinely LINEAR (every coefficient depends only on x, y-terms appear alone to the first power), while the simple-looking y'+y²=0 is NONLINEAR purely from the single y² term; visual complexity predicts nothing about linearity", isCorrect: true },
      { text: 'The simple-looking one is always linear, and the complicated-looking one with messy coefficients is always nonlinear', isCorrect: false, misconceptionId: `${ODE_LINEARITY}:MC-1` },
      { text: "Whichever equation looks more complicated overall is the nonlinear one, since complexity in an equation generally signals nonlinear behavior", isCorrect: false, misconceptionId: `${ODE_LINEARITY}:MC-1` },
    ],
    targetedMisconceptions: [`${ODE_LINEARITY}:MC-1`],
    source: eb(ODE_LINEARITY, 'Discovery Question 1 as a detection probe (verbatim) — which of a complicated-coefficient linear ODE versus a simple-looking nonlinear one is actually linear, judging by visual complexity confirming LINEARITY-JUDGED-BY-VISUAL-COMPLEXITY'),
  },
  {
    conceptId: ODE_LINEARITY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does scanning only the first term of an equation reliably catch every product term that could disqualify linearity?',
    choices: [
      { text: "No — y''+yy'-3y=0 fails linearity specifically because of the yy' product term buried in the middle, while every other term is unambiguously linear; every term must be scanned systematically, not just the first one", isCorrect: true },
      { text: 'Yes — scanning only the first term of an equation is sufficient to catch every disqualifying product term', isCorrect: false, misconceptionId: `${ODE_LINEARITY}:MC-2` },
      { text: "Yes, since any product term that disqualifies linearity will always appear as the very first term in a properly written equation", isCorrect: false, misconceptionId: `${ODE_LINEARITY}:MC-2` },
    ],
    targetedMisconceptions: [`${ODE_LINEARITY}:MC-2`],
    source: eb(ODE_LINEARITY, 'Discovery Question 2 as a detection probe (verbatim) — whether scanning only the first term reliably catches every disqualifying product term, an answer of "yes" confirming PRODUCT-OF-Y-AND-DERIVATIVE-OVERLOOKED'),
  },
  {
    conceptId: ODE_LINEARITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Does y appearing inside sin(y) disqualify linearity even if there's no product of y-terms anywhere else?",
    choices: [
      { text: "Yes — y'+sin(y)=x fails linearity because sin(y) cannot be written as (function of x alone) times y, even with no product of y-terms present anywhere; y or a derivative inside any nonlinear function is independently disqualifying", isCorrect: true },
      { text: "No — y appearing inside sin(y) does not disqualify linearity unless there is also a product of y-terms present elsewhere in the equation", isCorrect: false, misconceptionId: `${ODE_LINEARITY}:MC-3` },
      { text: "No, since the only structural feature that can disqualify linearity is a product term like yy', never a nonlinear function wrapping y", isCorrect: false, misconceptionId: `${ODE_LINEARITY}:MC-3` },
    ],
    targetedMisconceptions: [`${ODE_LINEARITY}:MC-3`],
    source: eb(ODE_LINEARITY, 'Discovery Question 3 as a detection probe (verbatim) — whether y inside sin(y) disqualifies linearity without a product term present, an answer of "no" confirming Y-INSIDE-NONLINEAR-FUNCTION-NOT-RECOGNIZED-AS-DISQUALIFYING'),
  },
  {
    conceptId: SECOND_ORDER_ODE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "If you're only given one initial condition for a second-order ODE, can you find a unique solution?",
    choices: [
      { text: "No — for y''-9y=0 (r=±3), the one-constant answer y=Ce^(3x) fails y(0)=0,y'(0)=1 (forces C=0, then y'(0)=0≠1); only the two-constant y=C₁e^(3x)+C₂e^(-3x) can satisfy both conditions", isCorrect: true },
      { text: 'Yes — a second-order ODE can be uniquely solved with just one initial condition', isCorrect: false, misconceptionId: `${SECOND_ORDER_ODE}:MC-1` },
      { text: "Yes, since a second-order ODE's general solution only requires a single arbitrary constant to be fully determined", isCorrect: false, misconceptionId: `${SECOND_ORDER_ODE}:MC-1` },
    ],
    targetedMisconceptions: [`${SECOND_ORDER_ODE}:MC-1`],
    source: eb(SECOND_ORDER_ODE, 'Discovery Question 1 as a detection probe (verbatim) — whether a second-order ODE can be uniquely solved with only one initial condition, an answer of "yes" confirming SINGLE-CONSTANT-SOLUTION'),
  },
  {
    conceptId: SECOND_ORDER_ODE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For a double root r, is C₁e^(rx)+C₂e^(rx) really a two-constant family, or does it secretly collapse?',
    choices: [
      { text: "It secretly collapses — C₁e^(rx)+C₂e^(rx)=(C₁+C₂)e^(rx) merges into one effective constant; the genuine second, independent solution is xe^(rx) (verified by direct substitution), giving the correct y=(C₁+C₂x)e^(rx)", isCorrect: true },
      { text: 'It is a genuine two-constant family — C₁e^(rx)+C₂e^(rx) has two independent constants just like the distinct-root case', isCorrect: false, misconceptionId: `${SECOND_ORDER_ODE}:MC-2` },
      { text: "It remains two independent constants, since C₁ and C₂ are written as separate symbols regardless of what they multiply", isCorrect: false, misconceptionId: `${SECOND_ORDER_ODE}:MC-2` },
    ],
    targetedMisconceptions: [`${SECOND_ORDER_ODE}:MC-2`],
    source: eb(SECOND_ORDER_ODE, 'Discovery Question 2 as a detection probe (verbatim) — whether C₁e^(rx)+C₂e^(rx) for a double root is a genuine two-constant family, an answer of "yes, genuine" confirming REPEATED-ROOT-COLLAPSE'),
  },
  {
    conceptId: SECOND_ORDER_ODE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For roots α±βi, which one becomes the exponential envelope, and which becomes the oscillation frequency?',
    choices: [
      { text: "α (the real part) becomes the exponential envelope e^(αx), and β (the imaginary coefficient) becomes the oscillation frequency in cos(βx)/sin(βx); for roots -1±2i, α=-1 gives decay envelope e^(-x) and β=2 gives oscillation cos(2x),sin(2x)", isCorrect: true },
      { text: 'β (the imaginary coefficient) becomes the exponential envelope, and α (the real part) becomes the oscillation frequency', isCorrect: false, misconceptionId: `${SECOND_ORDER_ODE}:MC-3` },
      { text: "Either α or β can be treated as the envelope or the frequency interchangeably, since both come from the same quadratic-formula computation", isCorrect: false, misconceptionId: `${SECOND_ORDER_ODE}:MC-3` },
    ],
    targetedMisconceptions: [`${SECOND_ORDER_ODE}:MC-3`],
    source: eb(SECOND_ORDER_ODE, 'Discovery Question 3 as a detection probe (verbatim) — which of α or β becomes the envelope versus the frequency for complex roots, a swapped answer confirming COMPLEX-ROOTS-MISREAD'),
  },
]
