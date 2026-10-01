/**
 * Batch: fourier-convergence, fourier-transform, legendre-equation
 * (math.de).
 *
 * Fresh Phase 0 frontier recompute after the fourier-sine-cosine/heat-
 * equation/pde-classification batch found the remaining 4 math.de concepts
 * all leaves (fourier-convergence, fourier-transform, legendre-equation,
 * systems-matrix-method). Selects fourier-convergence, fourier-transform,
 * and legendre-equation for this batch, leaving systems-matrix-method as
 * the final concept to close out math.de at 56/56. Transcribed from the
 * frozen Educational Brain entries at educational-brain/concepts/
 * mathematics/math.de.{fourier-convergence,fourier-transform,legendre-
 * equation}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, continuing math.de's established
 * domain baseline.
 *
 *   FOURIER-CONVERGENCE  Fourier series convergence is NEVER a new,
 *           unrelated concept — it is the exact same partial-sum question
 *           already asked for any series, applied to this specific series;
 *           at a jump discontinuity the series NEVER converges to either
 *           one-sided limit alone — it converges to their average; and the
 *           Gibbs overshoot NEVER shrinks in height as more terms are
 *           added — it migrates toward the jump but persists at roughly 9%
 *           indefinitely.
 *   FOURIER-TRANSFORM  The Fourier transform is NEVER an unrelated new
 *           tool — it is the Fourier series' continuous-frequency limit as
 *           the period stretches to infinity; the transform's defining
 *           integral NEVER converges automatically for every function — it
 *           requires genuine decay, exactly like any improper integral;
 *           and the differentiation-becomes-multiplication-by-iω property
 *           is NEVER a mere computational curiosity — it is the entire
 *           reason the transform converts a differential equation into
 *           algebra.
 *   LEGENDRE-EQUATION  x=0 is NEVER a point requiring the Frobenius
 *           modification for Legendre's equation — it is an ordinary
 *           point, unlike Bessel's equation, so the standard series ansatz
 *           applies directly; the series solution does NOT always produce
 *           a polynomial regardless of n — only a non-negative integer n
 *           makes it terminate, any other n gives a genuinely infinite
 *           series; and Legendre's equation is NEVER an arbitrary example
 *           — it arises naturally from spherical symmetry via separation
 *           of variables.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const FOURIER_CONVERGENCE = 'math.de.fourier-convergence'
const FOURIER_TRANSFORM = 'math.de.fourier-transform'
const LEGENDRE_EQUATION = 'math.de.legendre-equation'

export const MATHEMATICS_DE_FOURIER_CONVERGENCE_FOURIER_TRANSFORM_LEGENDRE_EQUATION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FOURIER_CONVERGENCE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'FOURIER CONVERGENCE IS THE SAME PARTIAL-SUM QUESTION ALREADY ASKED FOR ANY SERIES — '
      + 'NEVER A NEW CONCEPT: general series convergence asks whether '
      + '$(S_N=\\sum_{n=1}^Na_n\\to L)$ as $(N\\to\\infty)$. A Fourier series\' partial sum '
      + '$(S_N(x)=\\frac{a_0}{2}+\\sum_{n=1}^N(a_n\\cos\\frac{n\\pi x}{L}+'
      + 'b_n\\sin\\frac{n\\pi x}{L}))$ is EXACTLY this same object, evaluated at a fixed x — '
      + 'asking whether $(S_N(x)\\to f(x))$ is the identical partial-sum convergence question, '
      + 'never a fundamentally different kind of limit requiring new machinery.\n\n'
      + 'AT A JUMP, THE SERIES CONVERGES TO THE AVERAGE OF THE TWO ONE-SIDED LIMITS — NEVER TO '
      + 'EITHER LIMIT ALONE: for the square wave $(f(x)=1)$ on $((0,\\pi))$, $(f(x)=-1)$ on '
      + '$((-\\pi,0))$: at $(x=0)$, $(f(0^+)=1)$ and $(f(0^-)=-1)$. Dirichlet\'s theorem gives '
      + 'convergence to $(\\frac{1+(-1)}{2}=0)$ — NEITHER the value just to the right NOR just '
      + 'to the left, but their average. A student assuming the series converges to '
      + '$(f(0^+)=1)$ (matching "the function value nearby") misses that the series has NO way '
      + 'to distinguish approaching from the right versus the left at the jump itself, and '
      + 'symmetrically averages both.\n\n'
      + 'THE GIBBS OVERSHOOT NEVER SHRINKS IN HEIGHT AS N GROWS — IT MIGRATES TOWARD THE JUMP: '
      + 'for the square wave\'s partial sums near $(x=0^+)$, each $(S_N)$ overshoots the target '
      + 'value of 1 by approximately 9% (peaking near '
      + '$(\\frac{4}{\\pi}\\int_0^\\pi\\text{sinc}(u)\\,du/2\\approx1.179)$, consistently, for '
      + 'EVERY sufficiently large N) — the overshoot\'s LOCATION moves closer to $(x=0)$ as N '
      + 'grows, but its HEIGHT stays near 9% indefinitely. This is not a defect that "more terms '
      + 'fixes" — it is the direct, permanent signature of pointwise (not uniform) convergence '
      + 'at a jump: at each FIXED $(x\\ne0)$, $(S_N(x)\\to f(x))$, but the convergence is not '
      + 'uniform across a neighborhood of the jump, so the overshoot\'s location merely tracks '
      + 'the jump without vanishing.',
    targetedMisconceptions: [`${FOURIER_CONVERGENCE}:MC-1`, `${FOURIER_CONVERGENCE}:MC-2`, `${FOURIER_CONVERGENCE}:MC-3`],
    source: eb(FOURIER_CONVERGENCE, 'Core Understanding — Fourier convergence being the same partial-sum question already asked for any series never a new concept, at a jump the series converging to the average of the two one-sided limits never either limit alone, and the Gibbs overshoot never shrinking in height as N grows since it migrates toward the jump instead'),
  },
  {
    conceptId: FOURIER_TRANSFORM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "THE TRANSFORM IS THE FOURIER SERIES' L-TO-INFINITY LIMIT — NEVER AN UNRELATED NEW TOOL: "
      + 'a Fourier series decomposes a PERIODIC function into DISCRETE frequencies '
      + '$(n\\pi/L)$ for integer n. As $(L\\to\\infty)$ (the function\'s repetition receding to '
      + 'infinity, effectively non-periodic), the spacing $(\\pi/L)$ between adjacent discrete '
      + 'frequencies shrinks toward 0 — the discrete spectrum\'s spikes merge into a CONTINUOUS '
      + 'spectrum. $(\\hat f(\\omega)=\\int_{-\\infty}^\\infty f(t)e^{-i\\omega t}\\,dt)$ is '
      + 'exactly this continuous-frequency machinery, replacing the Fourier series\' discrete '
      + 'sum with an integral over all real $(\\omega)$ — never a coincidental resemblance, but '
      + 'literally the same idea\'s continuous limit.\n\n'
      + 'CONVERGENCE REQUIRES GENUINE DECAY — NEVER AUTOMATIC FOR EVERY FUNCTION: since '
      + '$(|e^{-i\\omega t}|=1)$ for every real $(t,\\omega)$, the defining integral\'s '
      + 'convergence depends ENTIRELY on f itself decaying fast enough. For $(f(t)=e^{-|t|})$: '
      + 'absolutely integrable ($(\\int_{-\\infty}^\\infty|e^{-|t|}|\\,dt=2<\\infty)$), giving '
      + 'the clean closed form $(\\hat f(\\omega)=\\frac{2}{1+\\omega^2})$. Contrast $(f(t)=1)$ '
      + '(the constant function, which does NOT decay at all): '
      + '$(\\int_{-\\infty}^\\infty1\\cdot e^{-i\\omega t}\\,dt)$ does NOT converge as an '
      + 'ordinary improper integral (it oscillates without settling) — a genuine transform for '
      + 'this function requires distributional methods (a Dirac delta), entirely outside this '
      + "concept's ordinary improper-integral scope.\n\n"
      + 'DIFFERENTIATION BECOMES MULTIPLICATION BY IW — THE ENTIRE REASON THE TRANSFORM SOLVES '
      + 'DIFFERENTIAL EQUATIONS, NEVER A MERE COMPUTATIONAL FOOTNOTE: integration by parts on '
      + '$(\\int_{-\\infty}^\\infty f\'(t)e^{-i\\omega t}\\,dt)$, with the boundary term '
      + 'vanishing (since $(f\\to0)$ at $(\\pm\\infty)$, the same decay condition needed for '
      + '$(\\hat f)$ to exist at all), gives $(\\widehat{f\'}(\\omega)=i\\omega\\hat f(\\omega))$. '
      + "Transforming the ODE $(f''(t)-f(t)=g(t))$ term by term gives "
      + '$(-(\\omega^2+1)\\hat f(\\omega)=\\hat g(\\omega))$ — a purely ALGEBRAIC equation for '
      + '$(\\hat f(\\omega))$, solved by algebra rather than calculus. This algebraic '
      + 'simplification is precisely why the transform is a central tool for solving ODEs/PDEs, '
      + 'never a side detail.',
    targetedMisconceptions: [`${FOURIER_TRANSFORM}:MC-1`, `${FOURIER_TRANSFORM}:MC-2`, `${FOURIER_TRANSFORM}:MC-3`],
    source: eb(FOURIER_TRANSFORM, "Core Understanding — the transform being the Fourier series' continuous-frequency limit never an unrelated new tool, convergence requiring genuine decay never automatic for every function, and differentiation becoming multiplication by i-omega never a mere computational footnote"),
  },
  {
    conceptId: LEGENDRE_EQUATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "X=0 IS AN ORDINARY POINT — THE STANDARD ANSATZ APPLIES DIRECTLY, NEVER REQUIRING "
      + "FROBENIUS: for $((1-x^2)y''-2xy'+n(n+1)y=0)$: at $(x=0)$, the leading coefficient "
      + '$((1-x^2)=1\\ne0)$ — an ORDINARY point. The standard ansatz $(y=\\sum a_kx^k)$ (NO '
      + '$(x^r)$ factor) applies directly — UNLIKE Bessel\'s equation, whose $(x=0)$ is a '
      + 'regular SINGULAR point requiring the different Frobenius $(x^r\\sum a_kx^k)$ ansatz.\n\n'
      + 'INTEGER N PRODUCES A GENUINE TERMINATING POLYNOMIAL — OTHER N NEVER TERMINATES: for '
      + '$(n=2)$: the substituted-ansatz recurrence FORCES coefficients to zero beyond a point, '
      + 'giving the genuine degree-2 polynomial $(P_2(x)=\\frac12(3x^2-1))$. For $(n=2.5)$ (the '
      + 'SAME equation, non-integer n): the SAME recurrence procedure NEVER terminates — an '
      + 'infinite series, qualitatively different in KIND from a polynomial, not merely "a '
      + 'longer polynomial." Whether n happens to be a non-negative integer is a qualitative '
      + 'fork, never a minor detail.\n\n'
      + 'LEGENDRE POLYNOMIALS FORM AN ORTHOGONAL BASIS ARISING FROM SPHERICAL SYMMETRY — NEVER '
      + 'AN ARBITRARY EXAMPLE: $(\\int_{-1}^1P_m(x)P_n(x)\\,dx=0)$ for $(m\\ne n)$ — exactly '
      + 'the Sturm-Liouville eigenfunction orthogonality pattern. Separating variables for '
      + "Laplace's equation in SPHERICAL coordinates produces, for the polar-angle part (with "
      + "$(x=\\cos\\theta)$), EXACTLY Legendre's equation — analogous to how Bessel's equation "
      + "arises from the radial part of a CYLINDRICAL separation. Legendre's equation is the "
      + 'natural angular equation for spherically symmetric problems, not a textbook curiosity.',
    targetedMisconceptions: [`${LEGENDRE_EQUATION}:MC-1`, `${LEGENDRE_EQUATION}:MC-2`, `${LEGENDRE_EQUATION}:MC-3`],
    source: eb(LEGENDRE_EQUATION, "Core Understanding — x=0 being an ordinary point where the standard ansatz applies directly never requiring Frobenius, integer n producing a genuine terminating polynomial while other n never terminates, and Legendre polynomials forming an orthogonal basis arising from spherical symmetry never an arbitrary example"),
  },
]

export const MATHEMATICS_DE_FOURIER_CONVERGENCE_FOURIER_TRANSFORM_LEGENDRE_EQUATION_PROBES: SeedProbe[] = [
  {
    conceptId: FOURIER_CONVERGENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is asking whether a Fourier series converges at a point a new kind of question, or the same partial-sum convergence question already asked for any series?',
    choices: [
      { text: "The same partial-sum question — a Fourier series' partial sum SN(x) is EXACTLY the object Σan already asks about, evaluated at a fixed x; asking whether SN(x)→f(x) is the identical partial-sum convergence question, never a fundamentally different kind of limit", isCorrect: true },
      { text: "Fourier series convergence is a fundamentally new topic, disconnected from the general partial-sum convergence already learned for series", isCorrect: false, misconceptionId: `${FOURIER_CONVERGENCE}:MC-1` },
      { text: "The new notation and machinery of Fourier series means its convergence question requires genuinely separate theory from ordinary series convergence", isCorrect: false, misconceptionId: `${FOURIER_CONVERGENCE}:MC-1` },
    ],
    targetedMisconceptions: [`${FOURIER_CONVERGENCE}:MC-1`],
    source: eb(FOURIER_CONVERGENCE, 'Discovery Question 1 as a detection probe (verbatim) — whether Fourier convergence is a new question or the same partial-sum convergence question, an answer of "a new kind of question" confirming FOURIER-CONVERGENCE-ASSUMED-NEW-CONCEPT'),
  },
  {
    conceptId: FOURIER_CONVERGENCE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'At a jump discontinuity, does the Fourier series converge to the value just to the right, just to the left, or their average?',
    choices: [
      { text: "Their average — for the square wave at x=0, f(0+)=1 and f(0-)=-1, Dirichlet's theorem gives convergence to (1+(-1))/2=0, NEITHER the right nor left value alone; the series has no way to distinguish approaching from either side at the jump itself", isCorrect: true },
      { text: "The Fourier series converges at a jump to whichever one-sided limit matches a nearby sampled value", isCorrect: false, misconceptionId: `${FOURIER_CONVERGENCE}:MC-2` },
      { text: "Since 'the series converges to the function' is the default expectation, it should converge to the right-hand limit at a jump", isCorrect: false, misconceptionId: `${FOURIER_CONVERGENCE}:MC-2` },
    ],
    targetedMisconceptions: [`${FOURIER_CONVERGENCE}:MC-2`],
    source: eb(FOURIER_CONVERGENCE, 'Discovery Question 2 as a detection probe (verbatim) — whether the series converges at a jump to one side or their average, an answer choosing one side confirming JUMP-VALUE-ASSUMED-TO-MATCH-ONE-SIDE'),
  },
  {
    conceptId: FOURIER_CONVERGENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does adding more terms to a Fourier partial sum eventually eliminate the overshoot near a jump, or does the overshoot persist?',
    choices: [
      { text: "It persists — each SN overshoots the target value by approximately 9% for EVERY sufficiently large N; the overshoot's LOCATION moves closer to the jump as N grows, but its HEIGHT stays near 9% indefinitely, the permanent signature of pointwise but not uniform convergence", isCorrect: true },
      { text: "Adding more terms to a Fourier partial sum will eventually eliminate the overshoot near a jump", isCorrect: false, misconceptionId: `${FOURIER_CONVERGENCE}:MC-3` },
      { text: "Since more terms always improve the approximation for smooth functions, the same should hold true at a jump discontinuity", isCorrect: false, misconceptionId: `${FOURIER_CONVERGENCE}:MC-3` },
    ],
    targetedMisconceptions: [`${FOURIER_CONVERGENCE}:MC-3`],
    source: eb(FOURIER_CONVERGENCE, 'Discovery Question 3 as a detection probe (verbatim) — whether the Gibbs overshoot eventually vanishes with more terms or persists, an answer of "eventually eliminated" confirming GIBBS-OVERSHOOT-ASSUMED-TO-SHRINK-WITH-MORE-TERMS'),
  },
  {
    conceptId: FOURIER_TRANSFORM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the Fourier transform a completely different tool from the Fourier series, or does it arise as a specific limit of the same machinery?',
    choices: [
      { text: "It arises as a limit — a Fourier series decomposes a periodic function into DISCRETE frequencies nπ/L; as L→∞, the spacing π/L shrinks toward 0 and the discrete spectrum's spikes merge into a CONTINUOUS spectrum, which is exactly what the transform's integral represents", isCorrect: true },
      { text: "The Fourier transform is a completely different, unrelated tool from the Fourier series", isCorrect: false, misconceptionId: `${FOURIER_TRANSFORM}:MC-1` },
      { text: "The transform is introduced as a fresh formula that happens to resemble the series but is not connected to it", isCorrect: false, misconceptionId: `${FOURIER_TRANSFORM}:MC-1` },
    ],
    targetedMisconceptions: [`${FOURIER_TRANSFORM}:MC-1`],
    source: eb(FOURIER_TRANSFORM, 'Discovery Question 1 as a detection probe (verbatim) — whether the Fourier transform is a completely different tool or a limit of the series, an answer of "completely different tool" confirming FOURIER-TRANSFORM-AS-UNRELATED-TOOL'),
  },
  {
    conceptId: FOURIER_TRANSFORM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the Fourier transform\'s defining integral converge for every function, regardless of its behavior at infinity?',
    choices: [
      { text: "No — convergence depends ENTIRELY on f decaying fast enough; for f(t)=e^-|t|, absolutely integrable, giving f̂(ω)=2/(1+ω²); but for the constant function f(t)=1 (no decay), the integral does NOT converge as an ordinary improper integral", isCorrect: true },
      { text: "The Fourier transform's defining integral converges for every function, regardless of decay behavior", isCorrect: false, misconceptionId: `${FOURIER_TRANSFORM}:MC-2` },
      { text: "Since the formula is a standard definition, its convergence should not depend on checking the specific function's behavior", isCorrect: false, misconceptionId: `${FOURIER_TRANSFORM}:MC-2` },
    ],
    targetedMisconceptions: [`${FOURIER_TRANSFORM}:MC-2`],
    source: eb(FOURIER_TRANSFORM, 'Discovery Question 2 as a detection probe (verbatim) — whether the transform\'s integral converges for every function regardless of decay, an answer of "converges for every function" confirming TRANSFORM-CONVERGENCE-ASSUMED-UNIVERSAL'),
  },
  {
    conceptId: FOURIER_TRANSFORM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the fact that differentiation becomes multiplication by iω under the transform just a computational curiosity, or does it have genuine practical significance?',
    choices: [
      { text: "Genuine practical significance — integration by parts gives f̂'(ω)=iωf̂(ω); transforming f''-f=g term by term gives -(ω²+1)f̂(ω)=ĝ(ω), a purely ALGEBRAIC equation, solved by algebra rather than calculus; this is precisely why the transform is a central tool for solving ODEs/PDEs", isCorrect: true },
      { text: "The multiplication-by-iω property is a computational curiosity without genuine practical significance", isCorrect: false, misconceptionId: `${FOURIER_TRANSFORM}:MC-3` },
      { text: "The property is worth stating and verifying, but it doesn't actually explain why the transform is useful for solving equations", isCorrect: false, misconceptionId: `${FOURIER_TRANSFORM}:MC-3` },
    ],
    targetedMisconceptions: [`${FOURIER_TRANSFORM}:MC-3`],
    source: eb(FOURIER_TRANSFORM, 'Discovery Question 3 as a detection probe (verbatim) — whether the differentiation property is a curiosity or has genuine practical significance, an answer of "just a curiosity" confirming DIFFERENTIATION-PROPERTY-TREATED-AS-CURIOSITY'),
  },
  {
    conceptId: LEGENDRE_EQUATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "Does solving Legendre's equation require the Frobenius method's modified ansatz, the same way Bessel's equation does?",
    choices: [
      { text: "No — for (1-x²)y''-2xy'+n(n+1)y=0, at x=0 the leading coefficient (1-x²)=1≠0, an ORDINARY point; the standard ansatz y=Σakxk (no xʳ factor) applies directly, UNLIKE Bessel's equation whose x=0 is a regular singular point requiring the Frobenius ansatz", isCorrect: true },
      { text: "Legendre's equation requires the Frobenius method's modified ansatz, the same way Bessel's equation does", isCorrect: false, misconceptionId: `${LEGENDRE_EQUATION}:MC-1` },
      { text: "Since both equations are learned close together and Bessel's equation needs Frobenius, Legendre's equation should need it too", isCorrect: false, misconceptionId: `${LEGENDRE_EQUATION}:MC-1` },
    ],
    targetedMisconceptions: [`${LEGENDRE_EQUATION}:MC-1`],
    source: eb(LEGENDRE_EQUATION, 'Discovery Question 1 as a detection probe (verbatim) — whether Legendre\'s equation requires the Frobenius method, an answer of "yes" confirming LEGENDRE-ASSUMED-TO-NEED-FROBENIUS'),
  },
  {
    conceptId: LEGENDRE_EQUATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "Does the series-solution procedure applied to Legendre's equation always produce a polynomial solution, regardless of n?",
    choices: [
      { text: "No — for n=2, the recurrence FORCES coefficients to zero beyond a point, giving the genuine polynomial P2(x)=(1/2)(3x²-1); for n=2.5 (same equation, non-integer n), the SAME recurrence NEVER terminates, giving an infinite series, qualitatively different in KIND from a polynomial", isCorrect: true },
      { text: "The series-solution procedure applied to Legendre's equation always produces a polynomial solution, regardless of n", isCorrect: false, misconceptionId: `${LEGENDRE_EQUATION}:MC-2` },
      { text: "Since the resulting functions are called 'Legendre polynomials', a polynomial should be the default, universal outcome for any n", isCorrect: false, misconceptionId: `${LEGENDRE_EQUATION}:MC-2` },
    ],
    targetedMisconceptions: [`${LEGENDRE_EQUATION}:MC-2`],
    source: eb(LEGENDRE_EQUATION, 'Discovery Question 2 as a detection probe (verbatim) — whether the series solution always produces a polynomial regardless of n, an answer of "always a polynomial" confirming LEGENDRE-SERIES-ASSUMED-ALWAYS-POLYNOMIAL'),
  },
  {
    conceptId: LEGENDRE_EQUATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Is Legendre's equation an arbitrary example ODE, or does it arise from a specific physical geometry?",
    choices: [
      { text: "It arises from spherical symmetry — separating variables for Laplace's equation in SPHERICAL coordinates produces, for the polar-angle part (with x=cosθ), EXACTLY Legendre's equation, analogous to how Bessel's equation arises from the radial part of a cylindrical separation", isCorrect: true },
      { text: "Legendre's equation is an arbitrary example ODE unconnected to any physical geometry", isCorrect: false, misconceptionId: `${LEGENDRE_EQUATION}:MC-3` },
      { text: "The equation's abstract algebraic form means it was likely chosen for series-solution practice, without a genuine geometric origin", isCorrect: false, misconceptionId: `${LEGENDRE_EQUATION}:MC-3` },
    ],
    targetedMisconceptions: [`${LEGENDRE_EQUATION}:MC-3`],
    source: eb(LEGENDRE_EQUATION, 'Discovery Question 3 as a detection probe (verbatim) — whether Legendre\'s equation is an arbitrary example or arises from a specific geometry, an answer of "arbitrary example" confirming LEGENDRE-EQUATION-ASSUMED-ARBITRARY-EXAMPLE'),
  },
]
