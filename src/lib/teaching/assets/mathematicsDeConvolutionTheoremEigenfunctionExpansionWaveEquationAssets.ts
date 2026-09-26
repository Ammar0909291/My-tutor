/**
 * Batch: convolution-theorem, eigenfunction-expansion, wave-equation
 * (math.de).
 *
 * Fresh Phase 0 frontier recompute after the bessel-equation/greens-
 * function/harmonic-functions batch found the remaining 10 math.de
 * concepts all simultaneously ready as leaves (convolution-theorem,
 * eigenfunction-expansion, fourier-convergence, fourier-sine-cosine,
 * fourier-transform, heat-equation, legendre-equation, pde-classification,
 * systems-matrix-method, wave-equation). Selects convolution-theorem
 * (closes laplace-transform's related-concept pairing with laplace-
 * properties), eigenfunction-expansion (closes sturm-liouville's declared
 * unlock), and wave-equation (closes separation-of-variables-pde's/
 * fourier-series' canonical hyperbolic-PDE application) for this batch.
 * Transcribed from the frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.de.{convolution-theorem,eigenfunction-
 * expansion,wave-equation}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, continuing math.de's established
 * domain baseline.
 *
 *   CONVOLUTION-THEOREM  The Laplace convolution's [0,t] integration limits
 *           are NEVER a separately-invented convention — they follow
 *           directly from causality collapsing the general convolution
 *           integral; the Convolution Theorem is NEVER an unconfirmed
 *           assumption to cite without checking — it is a verifiable
 *           equality that should be independently confirmed on a concrete
 *           case; and the theorem's primary practical use is NEVER just the
 *           forward direction — its biggest payoff runs backward, recovering
 *           an inverse transform of a product without partial fractions.
 *   EIGENFUNCTION-EXPANSION  The coefficient formula is NEVER an
 *           independently memorized fact — it is a direct consequence of
 *           eigenfunction orthogonality, the same projection idea as
 *           decomposing a vector along orthogonal axes; ordinary Fourier
 *           series is NEVER a separate, unrelated technique — it is the
 *           special case where the Sturm-Liouville problem is the simplest
 *           one; and convergence is NEVER system-specific — it relies on
 *           the same Hilbert-space completeness guarantee regardless of
 *           which specific system (Fourier, Legendre, Bessel) is used.
 *   WAVE-EQUATION  The wave IBVP NEVER needs just one initial condition —
 *           because the equation is second-order in time, it requires BOTH
 *           position and velocity data; the time-oscillation frequency is
 *           NEVER the eigenvalue itself — it is c times the eigenvalue's
 *           square root; and d'Alembert's formula is NEVER applied directly
 *           on a bounded domain — it requires the odd-periodic extension
 *           correction, since it is derived for the unbounded line.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const CONVOLUTION_THEOREM = 'math.de.convolution-theorem'
const EIGENFUNCTION_EXPANSION = 'math.de.eigenfunction-expansion'
const WAVE_EQUATION = 'math.de.wave-equation'

export const MATHEMATICS_DE_CONVOLUTION_THEOREM_EIGENFUNCTION_EXPANSION_WAVE_EQUATION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CONVOLUTION_THEOREM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "LAPLACE CONVOLUTION'S [0,T] LIMITS FOLLOW DIRECTLY FROM CAUSALITY — NEVER A "
      + 'SEPARATELY-INVENTED CONVENTION: for causal $(f(t)=e^t\\cdot\\mathbb{1}_{t\\ge0})$ and '
      + '$(g(t)=e^{2t}\\cdot\\mathbb{1}_{t\\ge0})$: the general convolution integral over ALL '
      + 'real y has integrand zero whenever $(y<0)$ (since $(g(y)=0)$) OR $(y>t)$ (since then '
      + '$(f(t-y)=0)$) — collapsing the integration range to EXACTLY $([0,t])$. This is the SAME '
      + 'general operation restricted by causality, never a new, unrelated formula.\n\n'
      + 'THE CONVOLUTION THEOREM IS A VERIFIABLE EQUALITY — NEVER AN UNCONFIRMED ASSUMPTION TO '
      + 'CITE WITHOUT CHECKING: for $(f(t)=e^t,g(t)=e^{2t})$: computing '
      + '$((f*g)(t)=e^{2t}\\int_0^te^{-\\tau}d\\tau=e^{2t}-e^t)$ directly, then '
      + '$(\\mathcal{L}\\{e^{2t}-e^t\\}(s)=1/(s-2)-1/(s-1)=1/[(s-1)(s-2)])$. Separately: '
      + '$(F(s)G(s)=\\frac1{s-1}\\cdot\\frac1{s-2}=\\frac1{(s-1)(s-2)})$ — MATCHING exactly, '
      + 'verifying the theorem concretely rather than taking it on faith.\n\n'
      + "THE THEOREM'S PRIMARY PRACTICAL USE IS INVERSE — NEVER JUST THE FORWARD DIRECTION: to "
      + 'find $(\\mathcal{L}^{-1}\\{1/[(s-1)(s-2)]\\})$: rather than partial fractions, '
      + 'RECOGNIZE $(F(s)=1/(s-1)=\\mathcal{L}\\{e^t\\})$ and '
      + '$(G(s)=1/(s-2)=\\mathcal{L}\\{e^{2t}\\})$ directly, so '
      + '$(\\mathcal{L}^{-1}\\{F(s)G(s)\\}=(f*g)(t)=e^{2t}-e^t)$ — matching the partial-fraction '
      + 'answer exactly but obtained by RECOGNIZING known transforms and convolving, '
      + 'sidestepping the coefficient-solving algebra entirely.',
    targetedMisconceptions: [`${CONVOLUTION_THEOREM}:MC-1`, `${CONVOLUTION_THEOREM}:MC-2`, `${CONVOLUTION_THEOREM}:MC-3`],
    source: eb(CONVOLUTION_THEOREM, "Core Understanding — Laplace convolution's [0,t] limits following directly from causality never a separately-invented convention, the Convolution Theorem being a verifiable equality never an unconfirmed assumption, and the theorem's primary practical use being inverse never just the forward direction"),
  },
  {
    conceptId: EIGENFUNCTION_EXPANSION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE COEFFICIENT FORMULA IS ORTHOGONAL PROJECTION — NEVER AN INDEPENDENTLY MEMORIZED '
      + 'FORMULA: taking the inner product of $(f=\\sum_mc_m\\varphi_m)$ with $(\\varphi_n)$: '
      + 'by orthogonality, '
      + '$(\\langle f,\\varphi_n\\rangle=\\sum_mc_m\\langle\\varphi_m,\\varphi_n\\rangle='
      + 'c_n\\langle\\varphi_n,\\varphi_n\\rangle)$ (every term but $(m=n)$ vanishes) — '
      + 'directly giving $(c_n=\\langle f,\\varphi_n\\rangle/\\langle\\varphi_n,\\varphi_n\\rangle)$. '
      + 'For $(f(x)=x)$ on $([0,\\pi])$ with $(\\varphi_n=\\sin(nx))$: '
      + '$(\\langle\\varphi_n,\\varphi_n\\rangle=\\pi/2)$, '
      + '$(\\langle f,\\varphi_n\\rangle=(-1)^{n+1}\\pi/n)$, giving '
      + '$(c_n=2(-1)^{n+1}/n)$ — the identical "project, divide by squared length" procedure '
      + 'already used for finite-dimensional vectors.\n\n'
      + 'FOURIER SERIES IS THIS EXPANSION SPECIALIZED TO THE SIMPLEST SYSTEM — NEVER A SEPARATE '
      + "TECHNIQUE: the classical Fourier sine series arises from the simplest Sturm-Liouville "
      + "problem ($(y''+\\lambda y=0,y(0)=y(L)=0)$, $(w=1)$, eigenfunctions "
      + '$(\\sin(n\\pi x/L))$). The result '
      + '$(x=\\sum_{n=1}^\\infty\\frac{2(-1)^{n+1}}{n}\\sin(nx))$ IS the standard Fourier sine '
      + 'series for $(f(x)=x)$ — not a coincidental resemblance; Fourier series IS this general '
      + 'formula, applied to the simplest Sturm-Liouville system.\n\n'
      + 'CONVERGENCE RELIES ON HILBERT-SPACE COMPLETENESS — THE SAME GUARANTEE FOR EVERY '
      + 'SYSTEM, NEVER SYSTEM-SPECIFIC: whether expanding in Fourier sines OR Legendre '
      + 'polynomials, genuine convergence (not merely a formal series) requires '
      + '$(\\{\\varphi_n\\})$ to form a COMPLETE orthogonal set — exactly the Hilbert-space '
      + 'orthonormal-basis property. This is the SAME underlying guarantee regardless of which '
      + 'specific system (Fourier, Legendre, Bessel) is being used, never a coincidence unique '
      + 'to any one system.',
    targetedMisconceptions: [`${EIGENFUNCTION_EXPANSION}:MC-1`, `${EIGENFUNCTION_EXPANSION}:MC-2`, `${EIGENFUNCTION_EXPANSION}:MC-3`],
    source: eb(EIGENFUNCTION_EXPANSION, 'Core Understanding — the coefficient formula being orthogonal projection never an independently memorized formula, Fourier series being this expansion specialized to the simplest system never a separate technique, and convergence relying on Hilbert-space completeness the same guarantee for every system never system-specific'),
  },
  {
    conceptId: WAVE_EQUATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'TWO INITIAL CONDITIONS ARE REQUIRED — NEVER JUST ONE, BECAUSE THE EQUATION IS '
      + 'SECOND-ORDER IN T: $(u_{tt}=c^2u_{xx})$ integrated once in t gives $(u_t)$, integrated '
      + 'again gives u — each integration introduces an arbitrary function of x that must be '
      + 'pinned down. Exactly like a second-order ODE IVP needing BOTH $(y(0))$ AND $(y\'(0))$, '
      + 'the wave IBVP needs BOTH $(u(x,0)=f(x))$ (determining the $(a_n)$ coefficients) AND '
      + '$(u_t(x,0)=g(x))$ (determining the $(b_n)$ coefficients). Carrying over the heat '
      + "equation's single-IC habit (that equation is only FIRST-order in t) leaves the "
      + '$(b_n)$ entirely undetermined — genuinely half the solution missing.\n\n'
      + 'THE TIME-OSCILLATION FREQUENCY IS C TIMES THE SQUARE ROOT OF LAMBDA-N — NEVER '
      + "LAMBDA-N ITSELF: the time ODE $(T''+c^2\\lambda_nT=0)$ is simple harmonic motion with "
      + 'angular frequency $(\\omega_n=c\\sqrt{\\lambda_n})$ — for $(\\lambda_n=(n\\pi/L)^2)$, '
      + 'this gives $(\\omega_n=cn\\pi/L)$ (LINEAR in n, since the SQUARE ROOT of '
      + '$(\\lambda_n)$ undoes its own square). Writing '
      + '$(T_n(t)=A\\sin(\\lambda_nt)+B\\cos(\\lambda_nt))$ (using the eigenvalue directly as '
      + 'the frequency) confuses $(\\lambda_n)$ with its square root — the correct form is '
      + '$(T_n(t)=a_n\\cos(\\omega_nt)+b_n\\sin(\\omega_nt))$ with '
      + '$(\\omega_n=c\\sqrt{\\lambda_n})$.\n\n'
      + "D'ALEMBERT'S FORMULA REQUIRES THE ODD-PERIODIC EXTENSION ON A BOUNDED DOMAIN — NEVER "
      + 'APPLIED DIRECTLY: '
      + '$(u(x,t)=\\frac12[f(x+ct)+f(x-ct)]+\\frac1{2c}\\int_{x-ct}^{x+ct}g(s)\\,ds)$ is '
      + 'derived for the UNBOUNDED line $(-\\infty<x<\\infty)$, where characteristics '
      + '$(x\\pm ct)$ never hit a boundary. On $([0,L])$ with $(u(0,t)=u(L,t)=0)$, applying the '
      + 'formula naively (using f as given, with no extension) produces a function that '
      + 'generally does NOT vanish at $(x=0,L)$ — violating the boundary conditions. The fix: '
      + 'extend f to $(\\mathbb{R})$ as an ODD, $(2L)$-periodic function F (so '
      + '$(F(0)=F(nL)=0)$ automatically), then $(u(x,t)=\\frac12[F(x+ct)+F(x-ct)])$ genuinely '
      + 'satisfies the BCs — this odd-extension correction produces EXACTLY the same answer as '
      + 'the Fourier sine series superposition, just expressed differently.',
    targetedMisconceptions: [`${WAVE_EQUATION}:MC-1`, `${WAVE_EQUATION}:MC-2`, `${WAVE_EQUATION}:MC-3`],
    source: eb(WAVE_EQUATION, "Core Understanding — two initial conditions being required never just one since the equation is second-order in t, the time-oscillation frequency being c times the square root of lambda-n never lambda-n itself, and d'Alembert's formula requiring the odd-periodic extension on a bounded domain never applied directly"),
  },
]

export const MATHEMATICS_DE_CONVOLUTION_THEOREM_EIGENFUNCTION_EXPANSION_WAVE_EQUATION_PROBES: SeedProbe[] = [
  {
    conceptId: CONVOLUTION_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the Laplace convolution\'s [0,t] integration range a special, separately-defined convention, or does it follow from causality?',
    choices: [
      { text: "It follows from causality — for causal f(t)=e^t·1(t≥0) and g(t)=e^2t·1(t≥0), the general convolution integral over ALL real y has integrand zero whenever y<0 or y>t, collapsing the integration range to EXACTLY [0,t]; this is the SAME general operation restricted by causality", isCorrect: true },
      { text: "The Laplace convolution's [0,t] integration limits are a separately-invented convention", isCorrect: false, misconceptionId: `${CONVOLUTION_THEOREM}:MC-1` },
      { text: "The [0,t] limits are a special formula unique to Laplace convolution, unrelated to the general convolution operation", isCorrect: false, misconceptionId: `${CONVOLUTION_THEOREM}:MC-1` },
    ],
    targetedMisconceptions: [`${CONVOLUTION_THEOREM}:MC-1`],
    source: eb(CONVOLUTION_THEOREM, 'Discovery Question 1 as a detection probe (verbatim) — whether the [0,t] limits are a separate convention or follow from causality, an answer of "separately defined" confirming LAPLACE-CONVOLUTION-ASSUMED-SEPARATELY-DEFINED'),
  },
  {
    conceptId: CONVOLUTION_THEOREM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does computing a convolution\'s Laplace transform directly actually give the same answer as multiplying the two individual transforms?',
    choices: [
      { text: "Yes, and it's verifiable — for f(t)=e^t,g(t)=e^2t: (f*g)(t)=e^2t-e^t directly, and L{e^2t-e^t}(s)=1/[(s-1)(s-2)]; separately F(s)G(s)=1/[(s-1)(s-2)] — MATCHING exactly, verifying the theorem concretely rather than taking it on faith", isCorrect: true },
      { text: "The Convolution Theorem's equality is an unconfirmed assumption that should just be cited, not independently verified", isCorrect: false, misconceptionId: `${CONVOLUTION_THEOREM}:MC-2` },
      { text: "A clean theorem statement like this doesn't need to be checked on a concrete case before being applied", isCorrect: false, misconceptionId: `${CONVOLUTION_THEOREM}:MC-2` },
    ],
    targetedMisconceptions: [`${CONVOLUTION_THEOREM}:MC-2`],
    source: eb(CONVOLUTION_THEOREM, 'Discovery Question 2 as a detection probe (verbatim) — whether the Convolution Theorem\'s equality should be verified or just cited, an answer treating it as unconfirmed confirming CONVOLUTION-THEOREM-UNVERIFIED'),
  },
  {
    conceptId: CONVOLUTION_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Is the Convolution Theorem's main practical use computing the forward transform of a convolution, or recovering an inverse transform of a product?",
    choices: [
      { text: "Recovering an inverse transform — to find L⁻¹{1/[(s-1)(s-2)]}, RECOGNIZE F(s)=1/(s-1)=L{e^t} and G(s)=1/(s-2)=L{e^2t} directly, giving (f*g)(t)=e^2t-e^t, sidestepping partial-fraction coefficient-solving algebra entirely", isCorrect: true },
      { text: "The Convolution Theorem's main practical use is computing the forward transform of a known convolution", isCorrect: false, misconceptionId: `${CONVOLUTION_THEOREM}:MC-3` },
      { text: "Since the theorem is stated in the forward direction (L{f*g}=FG), that forward direction is also its most common practical application", isCorrect: false, misconceptionId: `${CONVOLUTION_THEOREM}:MC-3` },
    ],
    targetedMisconceptions: [`${CONVOLUTION_THEOREM}:MC-3`],
    source: eb(CONVOLUTION_THEOREM, 'Discovery Question 3 as a detection probe (verbatim) — whether the theorem\'s main use is forward or inverse, an answer of "forward direction" confirming CONVOLUTION-THEOREM-USE-DIRECTION-REVERSED'),
  },
  {
    conceptId: EIGENFUNCTION_EXPANSION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the coefficient formula cₙ = ⟨f,φₙ⟩/⟨φₙ,φₙ⟩ an independently memorized formula, or does it follow directly from orthogonality?',
    choices: [
      { text: "It follows directly from orthogonality — taking the inner product of f=Σcmφm with φn, orthogonality makes every term but m=n vanish, directly giving cn=⟨f,φn⟩/⟨φn,φn⟩; this is the identical 'project, divide by squared length' procedure used for finite-dimensional vectors", isCorrect: true },
      { text: "The coefficient formula is an independently memorized formula, unrelated to orthogonality", isCorrect: false, misconceptionId: `${EIGENFUNCTION_EXPANSION}:MC-1` },
      { text: "The formula is simply a rule to memorize, presented separately from any derivation", isCorrect: false, misconceptionId: `${EIGENFUNCTION_EXPANSION}:MC-1` },
    ],
    targetedMisconceptions: [`${EIGENFUNCTION_EXPANSION}:MC-1`],
    source: eb(EIGENFUNCTION_EXPANSION, 'Discovery Question 1 as a detection probe (verbatim) — whether the coefficient formula is independently memorized or follows from orthogonality, an answer of "independently memorized" confirming COEFFICIENT-FORMULA-ASSUMED-INDEPENDENT-FACT'),
  },
  {
    conceptId: EIGENFUNCTION_EXPANSION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is ordinary Fourier series an unrelated, separate technique from Sturm-Liouville eigenfunction expansion?',
    choices: [
      { text: "No — the classical Fourier sine series arises from the simplest Sturm-Liouville problem (y''+λy=0, y(0)=y(L)=0, w=1); the result x=Σ 2(-1)^(n+1)/n sin(nx) IS the standard Fourier sine series, not a coincidental resemblance — Fourier series IS this general formula applied to the simplest system", isCorrect: true },
      { text: "Yes, ordinary Fourier series is an unrelated, separate technique from Sturm-Liouville eigenfunction expansion", isCorrect: false, misconceptionId: `${EIGENFUNCTION_EXPANSION}:MC-2` },
      { text: "Since Fourier series is typically learned before general Sturm-Liouville theory, the two must be genuinely separate subjects", isCorrect: false, misconceptionId: `${EIGENFUNCTION_EXPANSION}:MC-2` },
    ],
    targetedMisconceptions: [`${EIGENFUNCTION_EXPANSION}:MC-2`],
    source: eb(EIGENFUNCTION_EXPANSION, 'Discovery Question 2 as a detection probe (verbatim) — whether Fourier series is unrelated to Sturm-Liouville eigenfunction expansion, an answer of "yes, unrelated" confirming FOURIER-SERIES-ASSUMED-SEPARATE-TECHNIQUE'),
  },
  {
    conceptId: EIGENFUNCTION_EXPANSION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does convergence of an eigenfunction expansion depend on properties unique to each specific system, or on one shared guarantee?',
    choices: [
      { text: "One shared guarantee — whether expanding in Fourier sines OR Legendre polynomials, genuine convergence requires {φn} to form a COMPLETE orthogonal set, exactly the Hilbert-space orthonormal-basis property; this is the SAME underlying guarantee regardless of which specific system is used", isCorrect: true },
      { text: "Convergence of an eigenfunction expansion depends on properties unique to each specific Sturm-Liouville system", isCorrect: false, misconceptionId: `${EIGENFUNCTION_EXPANSION}:MC-3` },
      { text: "Since each system's eigenfunctions look different, their convergence must rest on genuinely different underlying guarantees", isCorrect: false, misconceptionId: `${EIGENFUNCTION_EXPANSION}:MC-3` },
    ],
    targetedMisconceptions: [`${EIGENFUNCTION_EXPANSION}:MC-3`],
    source: eb(EIGENFUNCTION_EXPANSION, 'Discovery Question 3 as a detection probe (verbatim) — whether convergence depends on system-specific properties or one shared guarantee, an answer of "system-specific" confirming CONVERGENCE-ASSUMED-SYSTEM-SPECIFIC'),
  },
  {
    conceptId: WAVE_EQUATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the wave equation first-order or second-order in time — and how many initial conditions does that require?',
    choices: [
      { text: "Second-order, requiring TWO initial conditions — exactly like a second-order ODE IVP needing both y(0) and y'(0), the wave IBVP needs both u(x,0)=f(x) (determining an) AND ut(x,0)=g(x) (determining bn); carrying over the heat equation's single-IC habit leaves bn entirely undetermined", isCorrect: true },
      { text: "The wave equation is first-order in time, like the heat equation, requiring only one initial condition u(x,0)=f(x)", isCorrect: false, misconceptionId: `${WAVE_EQUATION}:MC-1` },
      { text: "Since the heat equation only needs one initial condition, the wave equation should follow the same single-IC pattern", isCorrect: false, misconceptionId: `${WAVE_EQUATION}:MC-1` },
    ],
    targetedMisconceptions: [`${WAVE_EQUATION}:MC-1`],
    source: eb(WAVE_EQUATION, 'Discovery Question 1 as a detection probe (verbatim) — whether the wave equation is first- or second-order in time and how many ICs that requires, an answer requiring only one IC confirming ONE-INITIAL-CONDITION-FOR-WAVE'),
  },
  {
    conceptId: WAVE_EQUATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is the time-oscillation frequency equal to the eigenvalue λₙ itself, or to c times its square root?',
    choices: [
      { text: "c times its square root — the time ODE T''+c²λnT=0 is simple harmonic motion with angular frequency ωn=c√λn; for λn=(nπ/L)², this gives ωn=cnπ/L, LINEAR in n since the square root undoes the square; writing Tn using λn directly as the frequency confuses λn with its square root", isCorrect: true },
      { text: "The time-oscillation frequency is equal to the eigenvalue λn itself", isCorrect: false, misconceptionId: `${WAVE_EQUATION}:MC-2` },
      { text: "Since λn already appears in the time ODE T''+c²λnT=0, it can be used directly as the oscillation frequency without taking a square root", isCorrect: false, misconceptionId: `${WAVE_EQUATION}:MC-2` },
    ],
    targetedMisconceptions: [`${WAVE_EQUATION}:MC-2`],
    source: eb(WAVE_EQUATION, 'Discovery Question 2 as a detection probe (verbatim) — whether the time-oscillation frequency equals the eigenvalue itself or c times its square root, an answer of "the eigenvalue itself" confirming TIME-OSCILLATION-FREQUENCY-EQUALS-EIGENVALUE'),
  },
  {
    conceptId: WAVE_EQUATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Can d'Alembert's formula be applied directly to a bounded interval, or does it need a correction first?",
    choices: [
      { text: "It needs a correction — d'Alembert's formula is derived for the UNBOUNDED line; on [0,L] with u(0,t)=u(L,t)=0, applying it naively produces a function that does NOT vanish at the boundaries; the fix is extending f as an ODD, 2L-periodic function F so F(0)=F(nL)=0 automatically", isCorrect: true },
      { text: "D'Alembert's formula can be applied directly to a bounded interval without any correction", isCorrect: false, misconceptionId: `${WAVE_EQUATION}:MC-3` },
      { text: "Since d'Alembert's formula is a general solution to the wave equation, it should work unchanged on any domain, bounded or unbounded", isCorrect: false, misconceptionId: `${WAVE_EQUATION}:MC-3` },
    ],
    targetedMisconceptions: [`${WAVE_EQUATION}:MC-3`],
    source: eb(WAVE_EQUATION, 'Discovery Question 3 as a detection probe (verbatim) — whether d\'Alembert\'s formula can be applied directly to a bounded interval or needs a correction, an answer of "applied directly" confirming DALEMBERT-APPLIES-INSIDE-BOUNDED-DOMAIN'),
  },
]
