/**
 * Batch: math.num.runge-kutta, math.de.char-equation, math.de.wronskian.
 *
 * Fresh Phase 0 frontier recompute after the prior batch authored
 * math.num.euler-method, making math.num.runge-kutta (requires only
 * math.num.euler-method) newly ready. Authoring it makes math.num.stiff-ode
 * (requires only runge-kutta) ready immediately — the final math.num
 * concept, potentially closing the domain to 16/16 next batch. Also
 * authors math.de.char-equation and math.de.wronskian, both newly ready via
 * the prior batch's second-order-homogeneous. Transcribed from the frozen
 * Educational Brain entries at educational-brain/concepts/mathematics/
 * math.num.runge-kutta.md and educational-brain/concepts/mathematics/
 * math.de.{char-equation,wronskian}.md — note math.num.runge-kutta.md is a
 * separate file in the math.num domain, distinct from the math.de entries.
 *
 * Grade band: GradeBand.UNDERGRADUATE for all three, matching math.num's
 * and math.de's established domain baselines.
 *
 *   MATH.NUM.RUNGE-KUTTA  RK4's error is NEVER zero for any nonzero step
 *           size — it is small but genuinely nonzero (a real O(h^5) local
 *           truncation error giving O(h^4) global error) and still
 *           accumulates; adding more stages does NOT always increase the
 *           accuracy order proportionally — beyond 4 stages, a 5-stage
 *           method still achieves only order 4 (the Butcher barrier), with
 *           order 5 first requiring 6 stages; and adaptive step-size
 *           control NEVER switches to a different, lower-order method when
 *           it shrinks h — the same RK formula applies throughout, only h
 *           changes.
 *   CHAR-EQUATION  Substituting y=e^(rx) is NEVER an arbitrary, unmotivated
 *           trick — it works specifically because the exponential's
 *           self-proportional derivative lets it factor out completely,
 *           converting the differential equation into a purely algebraic
 *           one; two distinct characteristic roots do NOT automatically
 *           guarantee the resulting exponentials form a genuine fundamental
 *           set — the Wronskian must still verify independence; and a
 *           repeated root does NOT yield two independent solutions via
 *           e^(rx) used twice — that collapses to one dimension, requiring
 *           the extra x factor to restore it.
 *   WRONSKIAN  The Wronskian formula is NEVER independent of the general
 *           determinant computation — it is exactly a 2x2 determinant
 *           applied to a matrix of two functions and their derivatives; the
 *           Wronskian's role as an independence test is NEVER a separate,
 *           ad hoc fact specific to differential equations — it directly IS
 *           the linear-independence condition, made computable via the
 *           determinant's invertibility criterion; and computing the
 *           Wronskian's functional form does NOT always require first
 *           solving the ODE explicitly — Abel's theorem predicts its entire
 *           behavior from P(x) alone.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const NUM_RUNGE_KUTTA = 'math.num.runge-kutta'
const CHAR_EQUATION = 'math.de.char-equation'
const WRONSKIAN = 'math.de.wronskian'

export const MATHEMATICS_NUM_RUNGE_KUTTA_DE_CHAR_EQUATION_WRONSKIAN_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: NUM_RUNGE_KUTTA, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "RK4 IS NEVER EXACT — ITS SMALL BUT NONZERO ERROR STILL ACCUMULATES: a student using RK4 "
      + 'with $(h=0.01)$ finds error $(3\\times10^{-10})$ at $t=1$ and claims "RK4 is essentially '
      + 'exact for h this small." This is MISLEADING — the error is small but genuinely NONZERO '
      + '(a real $O(h^5)$ local truncation error, giving $O(h^4)$ global error, that accumulates '
      + 'over $(N=T/h)$ steps); halving h to $(0.005)$ would reduce it by $(2^4=16)$ (to '
      + '$(\\approx2\\times10^{-11})$), but below some $(h_{\\text{opt}})$, ROUNDOFF error '
      + '(growing as $Tu/h$ as h approaches zero) starts DOMINATING. Believing RK4 gives the '
      + 'EXACT solution because it matches the Taylor series to order 4 confuses "matches up to '
      + 'order 4" with "no error at all beyond order 4" — the total error is $(Ch^4+Tu/h)$, '
      + 'minimized at a FINITE $(h_{\\text{opt}})$, never at $h=0$.\n\n'
      + 'MORE STAGES IS NEVER ALWAYS BETTER — THE BUTCHER BARRIER LIMITS ORDER GAINS: RK4 (4 '
      + 'stages) achieves order 4. But a 5-STAGE method achieves ONLY order 4 as well (NOT order '
      + '5) — beyond 4 stages, the number of order-matching conditions grows FASTER than the free '
      + 'parameters available, so extra stages do not automatically buy the next order; ORDER 5 '
      + 'first requires 6 stages. Assuming increasing the number of stages ALWAYS improves '
      + 'accuracy proportionally, without recognizing the Butcher barrier at 5 stages, is WRONG '
      + '— each stage costs an extra function evaluation, and beyond 4 stages that cost does NOT '
      + 'translate into a corresponding order gain until a threshold (6 stages for order 5) is '
      + 'reached.\n\n'
      + 'ADAPTIVE STEP-SIZE CONTROL NEVER CHANGES THE UNDERLYING METHOD — ONLY H CHANGES: an '
      + 'adaptive RK45 solver reports varying step sizes ($(h=0.3,0.28,0.31,0.05,0.04,0.06)$) '
      + 'across an interval — this is NOT a switch to a different, lower-order method. The SAME '
      + 'RK formula $(y_{n+1}=y_n+(k_1+2k_2+2k_3+k_4)/6)$ applies whether $(h=0.3)$ or '
      + '$(h=0.003)$; ONLY the input h changes, chosen by monitoring a local error estimate (from '
      + 'an embedded lower/higher-order pair) to keep the local error below a tolerance '
      + '$\\epsilon$. Thinking that when an adaptive solver REDUCES h it is switching to a '
      + 'different, lower-order method is WRONG — the "engine" (the RK formula) never changes; '
      + 'only the "throttle" (h) is adjusted, larger where the solution is smooth, smaller where '
      + 'it changes rapidly.',
    targetedMisconceptions: [`${NUM_RUNGE_KUTTA}:MC-1`, `${NUM_RUNGE_KUTTA}:MC-2`, `${NUM_RUNGE_KUTTA}:MC-3`],
    source: eb(NUM_RUNGE_KUTTA, 'Core Understanding — RK4 never being exact since its small but nonzero error still accumulates, more stages never always being better due to the Butcher barrier limiting order gains, and adaptive step-size control never changing the underlying method since only h changes'),
  },
  {
    conceptId: CHAR_EQUATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "Y=E^(RX) CONVERTS A DIFFERENTIAL EQUATION INTO A PURELY ALGEBRAIC ONE — BECAUSE ITS "
      + "DERIVATIVES ARE SELF-PROPORTIONAL: for $(y''-5y'+6y=0)$: substituting "
      + "$(y=e^{rx},y'=re^{rx},y''=r^2e^{rx})$ gives $(r^2e^{rx}-5re^{rx}+6e^{rx}=0)$; since "
      + '$(e^{rx})$ is NEVER zero, it factors out completely, leaving $(r^2-5r+6=0)$ — the '
      + 'exponential has vanished entirely from the equation to solve, exactly because its '
      + 'self-proportional derivative is what makes the factoring work.\n\n'
      + 'DISTINCT ROOTS DO NOT AUTOMATICALLY GUARANTEE A FUNDAMENTAL SET — THE WRONSKIAN STILL '
      + 'MUST VERIFY IT: continuing $(r^2-5r+6=0=(r-2)(r-3))$: roots $(r_1=2,r_2=3)$ give '
      + 'candidates $(y_1=e^{2x},y_2=e^{3x})$. The Wronskian STILL must confirm independence: '
      + '$(W=e^{2x}(3e^{3x})-e^{3x}(2e^{2x})=3e^{5x}-2e^{5x}=e^{5x}\\ne0)$ — confirmed. Finding '
      + 'two distinct roots is not automatically the same as having verified a fundamental set; '
      + "the Wronskian test from the second-order-homogeneous concept is still the concept doing "
      + 'the actual verification work.\n\n'
      + 'A REPEATED ROOT REQUIRES A GENUINELY DIFFERENT SOLUTION FORM — E^(RX) USED TWICE '
      + 'COLLAPSES THE SOLUTION SPACE: for $(r^2-4r+4=0)$: discriminant $=0$, repeated root '
      + '$(r=2)$. The naive $(y=c_1e^{2x}+c_2e^{2x})$ collapses to the single-term '
      + '$((c_1+c_2)e^{2x})$ — NOT a genuine two-dimensional general solution. The correct form '
      + 'is $(y=(c_1+c_2x)e^{2x})$, the extra factor of x specifically restoring the missing '
      + 'dimension. Contrast $(r^2+4r+13=0)$: discriminant $(=-36<0)$, COMPLEX roots '
      + '$(r=-2\\pm3i)$, requiring the real-valued oscillatory form '
      + '$(y=e^{-2x}(c_1\\cos3x+c_2\\sin3x))$ — all three cases governed by the SAME '
      + 'discriminant sign already familiar from the quadratic formula.',
    targetedMisconceptions: [`${CHAR_EQUATION}:MC-1`, `${CHAR_EQUATION}:MC-2`, `${CHAR_EQUATION}:MC-3`],
    source: eb(CHAR_EQUATION, "Core Understanding — y=e^(rx) converting a differential equation into a purely algebraic one because its derivatives are self-proportional, distinct roots not automatically guaranteeing a fundamental set since the Wronskian still must verify it, and a repeated root requiring a genuinely different solution form since e^(rx) used twice collapses the solution space"),
  },
  {
    conceptId: WRONSKIAN, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "THE WRONSKIAN IS A DETERMINANT — NEVER A SEPARATE, INDEPENDENT FORMULA: for "
      + '$(y_1=e^{2x},y_2=e^{-2x})$: forming the matrix with rows $((e^{2x},e^{-2x}))$ and '
      + '$((2e^{2x},-2e^{-2x}))$ and computing its determinant via the SAME ad-bc formula '
      + 'already known: $(e^{2x}(-2e^{-2x})-e^{-2x}(2e^{2x})=-2-2=-4)$ — EXACTLY the Wronskian. '
      + 'This is the identical determinant computation applied to a matrix of functions and their '
      + 'derivatives, not a new independent tool.\n\n'
      + 'WRONSKIAN NONVANISHING IS LITERALLY THE LINEAR-INDEPENDENCE CONDITION, MADE COMPUTABLE '
      + '— NEVER AN AD HOC ODE-SPECIFIC FACT: checking $(c_1e^{2x}+c_2e^{-2x}=0)$ for all x, '
      + 'differentiating gives $(2c_1e^{2x}-2c_2e^{-2x}=0)$ too — a 2x2 linear system in '
      + '$(c_1,c_2)$ whose coefficient matrix is EXACTLY the Wronskian matrix. By the '
      + 'determinant\'s own invertibility criterion, this system has ONLY the trivial solution '
      + '$(c_1=c_2=0)$ precisely when the Wronskian is nonzero — so the Wronskian test DIRECTLY '
      + 'IS the linear-independence definition, not a separate tool that happens to work.\n\n'
      + "ABEL'S THEOREM COMPUTES THE WRONSKIAN'S ENTIRE BEHAVIOR FROM P(X) ALONE — NEVER "
      + "REQUIRING SOLVING THE ODE FIRST: for $(y''+3y'+2y=0)$ ($(P(x)=3)$): Abel's theorem "
      + 'predicts $(W(x)=W(0)e^{-3x})$, DETERMINED ENTIRELY BY $(P(x)=3)$, without knowing '
      + '$(y_1,y_2)$ in advance. Checking directly against the actual solutions '
      + '$(y_1=e^{-x},y_2=e^{-2x})$: $(W=e^{-x}(-2e^{-2x})-(-e^{-x})(e^{-2x})=-e^{-3x})$ — '
      + 'matching the PREDICTED form $(W(0)e^{-3x}=(-1)e^{-3x})$ exactly. Since the exponential '
      + 'function is NEVER zero, this immediately explains why one-point checking suffices: W is '
      + 'either never zero or identically zero, with nothing in between.',
    targetedMisconceptions: [`${WRONSKIAN}:MC-1`, `${WRONSKIAN}:MC-2`, `${WRONSKIAN}:MC-3`],
    source: eb(WRONSKIAN, "Core Understanding — the Wronskian being a determinant never a separate independent formula, Wronskian nonvanishing being literally the linear-independence condition made computable never an ad hoc fact, and Abel's theorem computing the Wronskian's entire behavior from P(x) alone never requiring solving the ODE first"),
  },
]

export const MATHEMATICS_NUM_RUNGE_KUTTA_DE_CHAR_EQUATION_WRONSKIAN_PROBES: SeedProbe[] = [
  {
    conceptId: NUM_RUNGE_KUTTA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is RK4\'s small error at a given h actually zero, or just small and still accumulating?',
    choices: [
      { text: "Small and still accumulating — RK4 with h=0.01 gives error 3×10⁻¹⁰ at t=1, but this is genuinely NONZERO (a real O(h⁵) local truncation error giving O(h⁴) global error); the total error Ch⁴+Tu/h is minimized at a finite h_opt, never zero", isCorrect: true },
      { text: 'RK4\'s error at a given h is actually zero, since it matches the Taylor series exactly to order 4', isCorrect: false, misconceptionId: `${NUM_RUNGE_KUTTA}:MC-1` },
      { text: "The error is zero for any h small enough, since fourth-order accuracy means the method becomes exact below some threshold step size", isCorrect: false, misconceptionId: `${NUM_RUNGE_KUTTA}:MC-1` },
    ],
    targetedMisconceptions: [`${NUM_RUNGE_KUTTA}:MC-1`],
    source: eb(NUM_RUNGE_KUTTA, 'Discovery Question 1 as a detection probe (verbatim) — whether RK4\'s small error is actually zero or just small and accumulating, an answer of "zero" confirming RK4-IS-EXACT'),
  },
  {
    conceptId: NUM_RUNGE_KUTTA, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does adding a 5th stage to a 4-stage RK method always increase the accuracy order?',
    choices: [
      { text: 'No — RK4 (4 stages) achieves order 4, but a 5-stage method achieves ONLY order 4 as well, not order 5; beyond 4 stages, order-matching conditions grow faster than free parameters, so order 5 first requires 6 stages (the Butcher barrier)', isCorrect: true },
      { text: 'Yes — adding a 5th stage to a 4-stage RK method always increases the accuracy order by one', isCorrect: false, misconceptionId: `${NUM_RUNGE_KUTTA}:MC-2` },
      { text: "Yes, since each additional stage in a Runge-Kutta method directly corresponds to one additional order of accuracy", isCorrect: false, misconceptionId: `${NUM_RUNGE_KUTTA}:MC-2` },
    ],
    targetedMisconceptions: [`${NUM_RUNGE_KUTTA}:MC-2`],
    source: eb(NUM_RUNGE_KUTTA, 'Discovery Question 2 as a detection probe (verbatim) — whether adding a 5th stage always increases the accuracy order, an answer of "yes" confirming MORE-STAGES-ALWAYS-BETTER'),
  },
  {
    conceptId: NUM_RUNGE_KUTTA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'When an adaptive solver shrinks its step size, is it switching to a different method?',
    choices: [
      { text: "No — the SAME RK formula y_(n+1)=y_n+(k₁+2k₂+2k₃+k₄)/6 applies whether h=0.3 or h=0.003; only the input h changes, chosen by monitoring a local error estimate to keep it below a tolerance; the formula itself never changes", isCorrect: true },
      { text: 'Yes — when an adaptive solver shrinks its step size, it is switching to a different, lower-order method', isCorrect: false, misconceptionId: `${NUM_RUNGE_KUTTA}:MC-3` },
      { text: "Yes, since a smaller step size implies the solver has detected instability and fallen back to a simpler, more robust algorithm", isCorrect: false, misconceptionId: `${NUM_RUNGE_KUTTA}:MC-3` },
    ],
    targetedMisconceptions: [`${NUM_RUNGE_KUTTA}:MC-3`],
    source: eb(NUM_RUNGE_KUTTA, 'Discovery Question 3 as a detection probe (verbatim) — whether an adaptive solver shrinking h is switching to a different method, an answer of "yes" confirming ADAPTIVE-STEP-CHANGES-METHOD'),
  },
  {
    conceptId: CHAR_EQUATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is substituting y=e^(rx) an arbitrary trick, or is there a specific property of exponentials that makes it work?',
    choices: [
      { text: "There is a specific property — for y''-5y'+6y=0, substituting y=e^(rx) gives r²e^(rx)-5re^(rx)+6e^(rx)=0, and since e^(rx) is never zero it factors out completely, leaving r²-5r+6=0; this works because the exponential's derivative is self-proportional", isCorrect: true },
      { text: 'It is an arbitrary trick with no clear mathematical motivation behind why it happens to work', isCorrect: false, misconceptionId: `${CHAR_EQUATION}:MC-1` },
      { text: "It is arbitrary — any function could equally well be substituted to convert the differential equation into an algebraic one", isCorrect: false, misconceptionId: `${CHAR_EQUATION}:MC-1` },
    ],
    targetedMisconceptions: [`${CHAR_EQUATION}:MC-1`],
    source: eb(CHAR_EQUATION, 'Discovery Question 1 as a detection probe (verbatim) — whether the exponential ansatz is arbitrary or motivated by a specific property, an answer of "arbitrary" confirming EXPONENTIAL-ANSATZ-ASSUMED-ARBITRARY'),
  },
  {
    conceptId: CHAR_EQUATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If the characteristic equation has two distinct roots, does that automatically guarantee the resulting exponentials form a genuine fundamental set?',
    choices: [
      { text: "No — for r²-5r+6=0=(r-2)(r-3), roots r=2,3 give candidates e^(2x),e^(3x), but the Wronskian STILL must confirm independence: W=e^(2x)(3e^(3x))-e^(3x)(2e^(2x))=e^(5x)≠0; finding distinct roots isn't automatically the same as a verified fundamental set", isCorrect: true },
      { text: 'Yes — two distinct roots of the characteristic equation automatically guarantee the resulting exponentials form a fundamental set', isCorrect: false, misconceptionId: `${CHAR_EQUATION}:MC-2` },
      { text: "Yes, since distinct roots always produce genuinely different exponential functions, which are automatically linearly independent", isCorrect: false, misconceptionId: `${CHAR_EQUATION}:MC-2` },
    ],
    targetedMisconceptions: [`${CHAR_EQUATION}:MC-2`],
    source: eb(CHAR_EQUATION, 'Discovery Question 2 as a detection probe (verbatim) — whether two distinct roots automatically guarantee a fundamental set, an answer of "yes" confirming DISTINCT-ROOTS-ASSUMED-TO-AUTOMATICALLY-GIVE-FUNDAMENTAL-SET'),
  },
  {
    conceptId: CHAR_EQUATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For a repeated root, do y₁=e^(rx) and y₂=e^(rx) (or any constant multiple) form a genuine fundamental set?',
    choices: [
      { text: "No — for r²-4r+4=0 (repeated root r=2), the naive y=c₁e^(2x)+c₂e^(2x) collapses to (c₁+c₂)e^(2x), not a genuine two-dimensional general solution; the correct form is y=(c₁+c₂x)e^(2x), the extra x factor restoring the missing dimension", isCorrect: true },
      { text: 'Yes — a repeated root still yields two genuinely independent solutions via e^(rx) used twice or scaled by different constants', isCorrect: false, misconceptionId: `${CHAR_EQUATION}:MC-3` },
      { text: "Yes, since any two distinct constant multiples of the same exponential function are automatically linearly independent", isCorrect: false, misconceptionId: `${CHAR_EQUATION}:MC-3` },
    ],
    targetedMisconceptions: [`${CHAR_EQUATION}:MC-3`],
    source: eb(CHAR_EQUATION, 'Discovery Question 3 as a detection probe (verbatim) — whether a repeated root gives two independent solutions via e^(rx) used twice, an answer of "yes" confirming REPEATED-ROOT-ASSUMED-TO-GIVE-TWO-INDEPENDENT-SOLUTIONS'),
  },
  {
    conceptId: WRONSKIAN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the Wronskian formula independent of the determinant computation, or is it exactly a 2×2 determinant?',
    choices: [
      { text: "It is exactly a 2×2 determinant — for y₁=e^(2x),y₂=e^(-2x), forming the matrix of the functions and their derivatives and computing its determinant via the same ad-bc formula gives e^(2x)(-2e^(-2x))-e^(-2x)(2e^(2x))=-4, exactly the Wronskian", isCorrect: true },
      { text: 'The Wronskian formula is a separate, independent formula unrelated to the general determinant computation', isCorrect: false, misconceptionId: `${WRONSKIAN}:MC-1` },
      { text: "It is independent, since the Wronskian involves derivatives of functions, which is a fundamentally different operation from computing a determinant of numbers", isCorrect: false, misconceptionId: `${WRONSKIAN}:MC-1` },
    ],
    targetedMisconceptions: [`${WRONSKIAN}:MC-1`],
    source: eb(WRONSKIAN, 'Discovery Question 1 as a detection probe (verbatim) — whether the Wronskian formula is independent of the determinant computation, an answer of "independent" confirming WRONSKIAN-ASSUMED-INDEPENDENT-FORMULA'),
  },
  {
    conceptId: WRONSKIAN, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is the Wronskian\'s role as an independence test a separate, ad hoc fact, or is it directly the linear-independence condition made computable?',
    choices: [
      { text: 'It is directly the linear-independence condition — checking c₁e^(2x)+c₂e^(-2x)=0 and its derivative gives a 2×2 linear system whose coefficient matrix IS the Wronskian matrix; nonvanishing forces only the trivial solution, by the determinant\'s own invertibility criterion', isCorrect: true },
      { text: 'It is a separate, ad hoc fact specific to differential equations, unrelated to general linear-independence theory', isCorrect: false, misconceptionId: `${WRONSKIAN}:MC-2` },
      { text: "It is ad hoc, since the Wronskian was historically developed specifically for differential equations before linear-independence theory existed", isCorrect: false, misconceptionId: `${WRONSKIAN}:MC-2` },
    ],
    targetedMisconceptions: [`${WRONSKIAN}:MC-2`],
    source: eb(WRONSKIAN, 'Discovery Question 2 as a detection probe (verbatim) — whether the Wronskian test is ad hoc or directly the linear-independence condition, an answer of "ad hoc" confirming WRONSKIAN-TEST-ASSUMED-AD-HOC'),
  },
  {
    conceptId: WRONSKIAN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does computing the Wronskian\'s functional form always require first solving the ODE explicitly?',
    choices: [
      { text: "No — for y''+3y'+2y=0 (P(x)=3), Abel's theorem predicts W(x)=W(0)e^(-3x) determined entirely by P(x)=3, without knowing y₁,y₂ in advance; this matches the direct computation from the actual solutions exactly", isCorrect: true },
      { text: "Yes — computing the Wronskian's functional form always requires first solving the ODE explicitly to obtain y₁ and y₂", isCorrect: false, misconceptionId: `${WRONSKIAN}:MC-3` },
      { text: "Yes, since without the explicit solutions there is no way to form the matrix whose determinant gives the Wronskian", isCorrect: false, misconceptionId: `${WRONSKIAN}:MC-3` },
    ],
    targetedMisconceptions: [`${WRONSKIAN}:MC-3`],
    source: eb(WRONSKIAN, 'Discovery Question 3 as a detection probe (verbatim) — whether computing the Wronskian\'s functional form always requires solving the ODE first, an answer of "yes" confirming WRONSKIAN-FORM-ASSUMED-TO-REQUIRE-SOLVING-FIRST'),
  },
]
