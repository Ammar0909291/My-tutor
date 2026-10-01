/**
 * Batch: math.num.euler-method, math.de.second-order-homogeneous,
 * math.de.bernoulli.
 *
 * Fresh Phase 0 frontier recompute after the prior batch authored
 * math.de.euler-method, whose cross_link target math.num.euler-method
 * (requires math.de.euler-method + math.num.error-analysis, both now
 * authored) became newly ready. Prioritizes math.num.euler-method
 * specifically since it is the direct next step in closing math.num
 * entirely (it unlocks math.num.runge-kutta, which unlocks
 * math.num.stiff-ode). Also authors math.de.second-order-homogeneous
 * (closes second-order-linear's declared unlock, opens char-equation and
 * wronskian) and math.de.bernoulli (closes linear-first-order's declared
 * unlock). Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.num.euler-method.md and
 * educational-brain/concepts/mathematics/math.de.{second-order-
 * homogeneous,bernoulli}.md — note math.num.euler-method.md is a
 * DIFFERENT file from the already-authored math.de.euler-method.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE for all three, matching math.num's
 * and math.de's established domain baselines.
 *
 *   MATH.NUM.EULER-METHOD  Global error is NEVER the same order as local
 *           truncation error — LTE is O(h^2) but global error is one order
 *           lower, O(h), because accumulating over N=(b-a)/h steps loses
 *           one power of h; shrinking the step size h is NEVER always
 *           better — roundoff error grows as h shrinks, so there is an
 *           optimal h below which total error gets WORSE; and wild
 *           oscillations in Euler's method are NEVER proof the method
 *           itself is wrong — they signal h*lambda falling outside the
 *           stability region, fixed by reducing h or switching methods.
 *   SECOND-ORDER-HOMOGENEOUS  Any two valid solutions of a homogeneous
 *           linear ODE do NOT automatically form a fundamental set — linear
 *           independence is a genuine additional requirement, without which
 *           the "general solution" collapses to a one-parameter family;
 *           checking the Wronskian at a single point is NEVER merely a
 *           spot-check that might miss dependence elsewhere — for solutions
 *           of the same homogeneous linear ODE, one nonzero point proves
 *           independence everywhere; and the Wronskian's term order is
 *           NEVER interchangeable — it is exactly y1*y2'-y1'*y2, and
 *           swapping the terms negates the value.
 *   BERNOULLI  The Bernoulli substitution is NEVER v=y^n — it is always
 *           v=y^(1-n), and using the wrong exponent produces an incorrect
 *           equation; differentiating v=y^(1-n) NEVER omits the (1-n)
 *           coefficient — the chain rule requires it explicitly; and the
 *           Bernoulli substitution is NEVER needed for n=0 or n=1 — those
 *           cases are already linear or separable respectively, and forcing
 *           the substitution there is unnecessary or breaks down entirely.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const NUM_EULER_METHOD = 'math.num.euler-method'
const SECOND_ORDER_HOMOGENEOUS = 'math.de.second-order-homogeneous'
const BERNOULLI = 'math.de.bernoulli'

export const MATHEMATICS_NUM_EULER_METHOD_DE_SECOND_ORDER_HOMOGENEOUS_BERNOULLI_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: NUM_EULER_METHOD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "LOCAL TRUNCATION ERROR AND GLOBAL ERROR ARE GENUINELY DIFFERENT ORDERS — NEVER THE SAME: "
      + "from Taylor expansion, $(y(t_n+h)=y(t_n)+hy'(t_n)+(1/2)h^2y''(\\xi))$, so the local "
      + 'truncation error (one step) is $((1/2)h^2y\'\'(\\xi)=O(h^2))$. But accumulating this '
      + 'over $(N=(b-a)/h)$ STEPS gives global error $(\\approx N\\times\\text{LTE}=((b-a)/h)'
      + '\\times Ch^2=C(b-a)h=O(h))$ — ONE order lower than the LTE. Believing Euler\'s GLOBAL '
      + 'error is $O(h^2)$ because the LOCAL truncation error is $O(h^2)$ confuses per-step error '
      + 'with total accumulated error — halving h HALVES the global error, never quarters it.\n\n'
      + 'SMALLER H IS NEVER ALWAYS BETTER — ROUNDOFF GROWS AS H APPROACHES ZERO: total error has '
      + 'two components: truncation error (decreases as $h^p$) and roundoff error (accumulates '
      + 'over $N=T/h$ steps as $Tu/h$, which GROWS as h approaches zero). Total error '
      + '$(\\approx Ch^p+Tu/h)$, minimized at some optimal '
      + '$(h_{\\text{opt}}\\approx(Tu/C)^{1/(p+1)})$ — for Euler ($p=1$), roughly $(10^{-8})$ '
      + 'for typical problems. Reducing h below this makes the accumulated roundoff WORSE, never '
      + 'better — driving h toward machine epsilon is WRONG.\n\n'
      + 'WILD OSCILLATIONS SIGNAL A STABILITY-REGION VIOLATION — NEVER PROOF THE METHOD ITSELF '
      + "IS WRONG: applying explicit Euler to $(y'=-100y)$, $(y(0)=1)$ with $(h=0.1)$: "
      + '$(h\\lambda=0.1\\times(-100)=-10)$, $(|1+h\\lambda|=|1-10|=9>1)$ — UNSTABLE, producing '
      + 'wild oscillations. The problem is $h=0.1$ is TOO LARGE for this stiff ODE (required: '
      + '$(h<2/100=0.02)$); with $(h=0.01)$: $(h\\lambda=-1)$, $(|1-1|=0)$ — stable and accurate. '
      + 'Dismissing Euler\'s method entirely because of oscillations or blow-up ("Euler\'s method '
      + 'is wrong") is WRONG — the instability is caused by $h\\lambda$ falling OUTSIDE the '
      + 'method\'s stability region, fixed by REDUCING h below $(2/|\\lambda|)$ or switching to '
      + 'an implicit (A-stable) method — never evidence the underlying formula is flawed.',
    targetedMisconceptions: [`${NUM_EULER_METHOD}:MC-1`, `${NUM_EULER_METHOD}:MC-2`, `${NUM_EULER_METHOD}:MC-3`],
    source: eb(NUM_EULER_METHOD, "Core Understanding — local truncation error and global error being genuinely different orders never the same, smaller h never always being better since roundoff grows as h approaches zero, and wild oscillations signaling a stability-region violation never proof the method itself is wrong"),
  },
  {
    conceptId: SECOND_ORDER_HOMOGENEOUS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "NOT ANY TWO VALID SOLUTIONS FORM A FUNDAMENTAL SET — LINEAR INDEPENDENCE IS A GENUINE "
      + "ADDITIONAL REQUIREMENT: for $(y''-y=0)$: $(y_1=e^x,\\tilde y_2=3e^x)$ are BOTH valid "
      + 'solutions, but $(c_1y_1+c_2\\tilde y_2=(c_1+3c_2)e^x)$ collapses to a SINGLE-parameter '
      + 'family — NOT the genuine two-dimensional solution space a second-order equation has. '
      + 'Only $(y_1=e^x,y_2=e^{-x})$ (linearly INDEPENDENT) gives $(c_1e^x+c_2e^{-x})$ that '
      + 'genuinely spans EVERY solution.\n\n'
      + 'THE WRONSKIAN NONZERO AT A SINGLE POINT CONFIRMS INDEPENDENCE EVERYWHERE — NEVER '
      + 'REQUIRING A POINT-BY-POINT CHECK: for $(y_1=e^x,y_2=e^{-x})$: '
      + '$(W=e^x(-e^{-x})-e^x(e^{-x})=-1-1=-2\\ne0)$ at every point — genuine fundamental set. '
      + 'For $(y_1=e^x,\\tilde y_2=3e^x)$: $(W=e^x(3e^x)-e^x(3e^x)=0)$ identically — correctly '
      + 'signaling dependence. The theorem (valid specifically because both solve the SAME '
      + 'homogeneous linear ODE) means checking W at ONE point (e.g. $(W(0)=1\\ne0)$ for '
      + '$(\\cos x,\\sin x)$ solving $(y\'\'+y=0)$) suffices to confirm independence EVERYWHERE '
      + '— no need to separately verify at every other point.\n\n'
      + "THE WRONSKIAN'S EXACT TERM ORDER IS Y1*Y2' MINUS Y1'*Y2 — NEVER THE REVERSE: for "
      + '$(y_1=\\cos x,y_2=\\sin x)$: $(W(0)=\\cos(0)\\cos(0)-(-\\sin(0))\\sin(0)=1(1)-0(0)=1)$ '
      + '— the correct order matters for the sign, and swapping terms produces the negated (and '
      + 'for some purposes, misleading) value.',
    targetedMisconceptions: [`${SECOND_ORDER_HOMOGENEOUS}:MC-1`, `${SECOND_ORDER_HOMOGENEOUS}:MC-2`, `${SECOND_ORDER_HOMOGENEOUS}:MC-3`],
    source: eb(SECOND_ORDER_HOMOGENEOUS, "Core Understanding — not any two valid solutions forming a fundamental set since linear independence is a genuine additional requirement, the Wronskian nonzero at a single point confirming independence everywhere never requiring a point-by-point check, and the Wronskian's exact term order never being interchangeable"),
  },
  {
    conceptId: BERNOULLI, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "THE SUBSTITUTION IS V=Y^(1-N) — NEVER V=Y^N: for $(dy/dx-y=-y^2)$ ($n=2$): the "
      + 'substitution is $(v=y^{1-2}=y^{-1})$, NOT $(v=y^2)$. Dividing the ODE by $y^2$ gives '
      + "$(y^{-2}dy/dx-y^{-1}=-1)$; substituting $(v=y^{-1})$ (so $(dv/dx=-y^{-2}dy/dx)$) gives "
      + '$(-dv/dx-v=-1\\Rightarrow dv/dx+v=1)$ — a genuinely LINEAR equation in v, solved via '
      + 'the integrating factor $e^x$ to give $(v=1+Ce^{-x})$, converting back to '
      + '$(y=1/(1+Ce^{-x}))$ (the logistic curve).\n\n'
      + 'DIFFERENTIATING V=Y^(1-N) REQUIRES THE (1-N) FACTOR — NEVER JUST '
      + '$(y^{-n}dy/dx)$: by the chain rule, '
      + '$(dv/dx=(1-n)y^{(1-n)-1}\\,dy/dx=(1-n)y^{-n}\\,dy/dx)$ — the coefficient $(1-n)$ is '
      + 'ESSENTIAL, never dropped. After dividing the original ODE by $y^n$: '
      + '$(y^{-n}dy/dx=(1/(1-n))dv/dx)$, substituting gives $((1/(1-n))dv/dx+Pv=Q)$, then '
      + 'multiplying by $(1-n)$ clears to the standard linear form $(dv/dx+(1-n)Pv=(1-n)Q)$.\n\n'
      + 'N=0 AND N=1 ARE EXCLUDED — THE BERNOULLI SUBSTITUTION IS NEVER NEEDED THERE: for '
      + '$(n=0)$: $(dy/dx+Py=Q\\cdot y^0=Q)$ — this is ALREADY the standard linear form, '
      + 'solvable directly by integrating factor with no substitution. For $(n=1)$: '
      + '$(dy/dx+Py=Qy\\Rightarrow dy/dx=(Q-P)y)$ — genuinely SEPARABLE, solvable directly. '
      + 'Applying the $(v=y^{1-n})$ substitution to either case is unnecessary (and for $n=1$, '
      + '$(v=y^0=1)$ is a nonsensical constant substitution) — checking $(n\\ne0,1)$ is a '
      + 'required first step, never skipped.',
    targetedMisconceptions: [`${BERNOULLI}:MC-1`, `${BERNOULLI}:MC-2`, `${BERNOULLI}:MC-3`],
    source: eb(BERNOULLI, 'Core Understanding — the substitution being v=y^(1-n) never v=y^n, differentiating v=y^(1-n) requiring the (1-n) factor never just y^(-n) dy/dx, and n=0/n=1 being excluded since the Bernoulli substitution is never needed there'),
  },
]

export const MATHEMATICS_NUM_EULER_METHOD_DE_SECOND_ORDER_HOMOGENEOUS_BERNOULLI_PROBES: SeedProbe[] = [
  {
    conceptId: NUM_EULER_METHOD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If the local truncation error is O(h²), is the global error also O(h²), or one order lower?',
    choices: [
      { text: "One order lower, O(h) — accumulating N=(b-a)/h steps of O(h²) local truncation error gives global error ≈N×LTE=((b-a)/h)×Ch²=C(b-a)h=O(h); halving h halves the global error, never quarters it", isCorrect: true },
      { text: "The global error is also O(h²), the same order as the local truncation error", isCorrect: false, misconceptionId: `${NUM_EULER_METHOD}:MC-1` },
      { text: "The global error is always identical to the local truncation error, since global error is just the local error repeated at each step", isCorrect: false, misconceptionId: `${NUM_EULER_METHOD}:MC-1` },
    ],
    targetedMisconceptions: [`${NUM_EULER_METHOD}:MC-1`],
    source: eb(NUM_EULER_METHOD, 'Discovery Question 1 as a detection probe (verbatim) — whether global error is O(h²) like local truncation error or one order lower, an answer of "same order" confirming GLOBAL-ERROR-IS-O(h²)'),
  },
  {
    conceptId: NUM_EULER_METHOD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "Does shrinking the step size indefinitely keep improving Euler's accuracy?",
    choices: [
      { text: "No — total error ≈Ch^p+Tu/h has two components, and roundoff (Tu/h) GROWS as h shrinks; there is an optimal h_opt≈(Tu/C)^(1/(p+1)) below which reducing h further makes accumulated roundoff WORSE, not better", isCorrect: true },
      { text: "Yes — shrinking the step size indefinitely always keeps improving Euler's method accuracy", isCorrect: false, misconceptionId: `${NUM_EULER_METHOD}:MC-2` },
      { text: "Yes, since smaller steps always more closely approximate the true continuous solution with no downside", isCorrect: false, misconceptionId: `${NUM_EULER_METHOD}:MC-2` },
    ],
    targetedMisconceptions: [`${NUM_EULER_METHOD}:MC-2`],
    source: eb(NUM_EULER_METHOD, 'Discovery Question 2 as a detection probe (verbatim) — whether shrinking h indefinitely keeps improving accuracy, an answer of "yes" confirming SMALLER-STEP-ALWAYS-BETTER'),
  },
  {
    conceptId: NUM_EULER_METHOD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "If Euler's method oscillates wildly, does that mean the method is fundamentally wrong?",
    choices: [
      { text: "No — for y'=-100y with h=0.1, hλ=-10 and |1+hλ|=9>1 is UNSTABLE (h too large); with h=0.01, hλ=-1 and |1-1|=0 is stable; oscillation signals hλ fell outside the stability region, fixed by reducing h below 2/|λ|, never proof the method is broken", isCorrect: true },
      { text: 'Yes — wild oscillations in an Euler approximation mean the method itself is fundamentally flawed', isCorrect: false, misconceptionId: `${NUM_EULER_METHOD}:MC-3` },
      { text: "Yes, since a numerically stable method should never produce oscillating or diverging output under any circumstances", isCorrect: false, misconceptionId: `${NUM_EULER_METHOD}:MC-3` },
    ],
    targetedMisconceptions: [`${NUM_EULER_METHOD}:MC-3`],
    source: eb(NUM_EULER_METHOD, 'Discovery Question 3 as a detection probe (verbatim) — whether wild oscillations mean the method is fundamentally wrong, an answer of "yes" confirming EULER-UNSTABLE-MEANS-WRONG'),
  },
  {
    conceptId: SECOND_ORDER_HOMOGENEOUS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If two functions both solve the same homogeneous ODE, does any linear combination of them automatically give the general solution?',
    choices: [
      { text: "No — for y''-y=0, y₁=eˣ and 3eˣ are both valid solutions, but c₁y₁+c₂(3eˣ)=(c₁+3c₂)eˣ collapses to a single-parameter family; only a linearly INDEPENDENT pair like eˣ,e⁻ˣ genuinely spans every solution", isCorrect: true },
      { text: 'Yes — any two valid solutions of the same homogeneous ODE automatically combine to give the general solution', isCorrect: false, misconceptionId: `${SECOND_ORDER_HOMOGENEOUS}:MC-1` },
      { text: "Yes, since superposition guarantees that any linear combination of solutions to a homogeneous equation is itself a solution spanning the full solution space", isCorrect: false, misconceptionId: `${SECOND_ORDER_HOMOGENEOUS}:MC-1` },
    ],
    targetedMisconceptions: [`${SECOND_ORDER_HOMOGENEOUS}:MC-1`],
    source: eb(SECOND_ORDER_HOMOGENEOUS, 'Discovery Question 1 as a detection probe (verbatim) — whether any linear combination of two solutions automatically gives the general solution, an answer of "yes" confirming ANY-TWO-SOLUTIONS-ASSUMED-TO-FORM-FUNDAMENTAL-SET'),
  },
  {
    conceptId: SECOND_ORDER_HOMOGENEOUS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does checking the Wronskian at just one point tell you about independence everywhere, or only at that point?',
    choices: [
      { text: "Everywhere — for solutions of the SAME homogeneous linear ODE, the theorem guarantees checking W at one point (e.g. W(0)=1 for cos x,sin x solving y''+y=0) suffices to confirm independence everywhere; no separate check at every other point is needed", isCorrect: true },
      { text: 'Only at that point — checking the Wronskian at one point tells you nothing about independence at other points', isCorrect: false, misconceptionId: `${SECOND_ORDER_HOMOGENEOUS}:MC-2` },
      { text: "Only at that point, since the Wronskian's value can vary independently at each x without any guarantee connecting different points", isCorrect: false, misconceptionId: `${SECOND_ORDER_HOMOGENEOUS}:MC-2` },
    ],
    targetedMisconceptions: [`${SECOND_ORDER_HOMOGENEOUS}:MC-2`],
    source: eb(SECOND_ORDER_HOMOGENEOUS, 'Discovery Question 2 as a detection probe (verbatim) — whether a one-point Wronskian check tells you about independence everywhere or only at that point, an answer of "only at that point" confirming WRONSKIAN-CHECKED-AT-ONLY-ONE-ARBITRARY-POINT-WITHOUT-JUSTIFICATION'),
  },
  {
    conceptId: SECOND_ORDER_HOMOGENEOUS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the Wronskian y₁y₂′−y₁′y₂, or y₁′y₂−y₁y₂′?',
    choices: [
      { text: "It is y₁y₂′−y₁′y₂ — for y₁=cos x,y₂=sin x: W(0)=cos(0)cos(0)−(−sin(0))sin(0)=1(1)−0(0)=1; the term order matters for the sign, and swapping the terms produces the negated value", isCorrect: true },
      { text: 'The Wronskian is y₁′y₂−y₁y₂′, with the derivative terms coming first', isCorrect: false, misconceptionId: `${SECOND_ORDER_HOMOGENEOUS}:MC-3` },
      { text: "Either order gives the same result, since the two terms are symmetric in the formula", isCorrect: false, misconceptionId: `${SECOND_ORDER_HOMOGENEOUS}:MC-3` },
    ],
    targetedMisconceptions: [`${SECOND_ORDER_HOMOGENEOUS}:MC-3`],
    source: eb(SECOND_ORDER_HOMOGENEOUS, 'Discovery Question 3 as a detection probe (verbatim) — whether the Wronskian is y₁y₂′−y₁′y₂ or the reverse order, a swapped-order answer confirming WRONSKIAN-COMPUTED-WITH-SIGN-OR-TERM-ORDER-ERROR'),
  },
  {
    conceptId: BERNOULLI, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For a Bernoulli ODE with exponent n, is the substitution v = yⁿ or v = y^(1-n)?',
    choices: [
      { text: "v = y^(1-n) — for dy/dx-y=-y² (n=2), the substitution is v=y^(1-2)=y⁻¹, NOT v=y²; dividing by y², substituting, and simplifying gives the genuinely linear equation dv/dx+v=1", isCorrect: true },
      { text: 'The substitution is v = yⁿ, using the exponent n directly from the Bernoulli equation', isCorrect: false, misconceptionId: `${BERNOULLI}:MC-1` },
      { text: "v = yⁿ, since dividing the equation by yⁿ naturally suggests substituting the same power n", isCorrect: false, misconceptionId: `${BERNOULLI}:MC-1` },
    ],
    targetedMisconceptions: [`${BERNOULLI}:MC-1`],
    source: eb(BERNOULLI, 'Discovery Question 1 as a detection probe (verbatim) — whether the Bernoulli substitution is v=yⁿ or v=y^(1-n), an answer of "v=yⁿ" confirming WRONG-EXPONENT-IN-SUBSTITUTION'),
  },
  {
    conceptId: BERNOULLI, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'When differentiating v = y^(1-n), does the derivative include a (1-n) coefficient, or is it just y^(-n) dy/dx?',
    choices: [
      { text: "It includes the (1-n) coefficient — by the chain rule, dv/dx=(1-n)y^((1-n)-1) dy/dx=(1-n)y^(-n) dy/dx; the coefficient (1-n) is essential and must never be dropped", isCorrect: true },
      { text: 'It is just y^(-n) dy/dx, with no (1-n) coefficient needed', isCorrect: false, misconceptionId: `${BERNOULLI}:MC-2` },
      { text: "It is just y^(-n) dy/dx, since the power rule for differentiation only produces the reduced exponent, not an extra coefficient", isCorrect: false, misconceptionId: `${BERNOULLI}:MC-2` },
    ],
    targetedMisconceptions: [`${BERNOULLI}:MC-2`],
    source: eb(BERNOULLI, 'Discovery Question 2 as a detection probe (verbatim) — whether differentiating v=y^(1-n) includes the (1-n) coefficient, an answer omitting it confirming FORGETTING-THE-1-MINUS-N-FACTOR-IN-DV-DX'),
  },
  {
    conceptId: BERNOULLI, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does the Bernoulli substitution apply when n=0 or n=1, or are those cases already solvable by simpler methods?',
    choices: [
      { text: "Those cases are already simpler — for n=0, dy/dx+Py=Q is already standard linear form; for n=1, dy/dx=(Q-P)y is genuinely separable; applying v=y^(1-n) to either is unnecessary (and for n=1, v=y⁰=1 is a nonsensical constant)", isCorrect: true },
      { text: 'The Bernoulli substitution applies equally well for n=0 and n=1 as it does for any other value of n', isCorrect: false, misconceptionId: `${BERNOULLI}:MC-3` },
      { text: "Yes, since the Bernoulli method is a universal technique that works identically regardless of the specific value of n", isCorrect: false, misconceptionId: `${BERNOULLI}:MC-3` },
    ],
    targetedMisconceptions: [`${BERNOULLI}:MC-3`],
    source: eb(BERNOULLI, 'Discovery Question 3 as a detection probe (verbatim) — whether the Bernoulli substitution applies for n=0 or n=1, an answer of "yes, applies" confirming BERNOULLI-APPLIES-FOR-ALL-N'),
  },
]
