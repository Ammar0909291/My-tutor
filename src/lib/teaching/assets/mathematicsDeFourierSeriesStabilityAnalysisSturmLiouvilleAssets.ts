/**
 * Batch: fourier-series, stability-analysis, sturm-liouville (math.de).
 *
 * Fresh Phase 0 frontier recompute after the phase-plane/bvp/series-solution
 * batch found 8 ready concepts (fourier-series, frobenius-method, laplace-
 * transform, legendre-equation, pde, stability-analysis, sturm-liouville,
 * systems-matrix-method). Selects fourier-series (opens the heat-equation/
 * wave-equation/fourier-transform chain), stability-analysis (closes phase-
 * plane's declared unlock, opens the nonlinear-ode/bifurcation/chaos chain),
 * and sturm-liouville (closes bvp's declared unlock, opens eigenfunction-
 * expansion) as the three highest-leverage picks. Transcribed from the
 * frozen Educational Brain entries at educational-brain/concepts/
 * mathematics/math.de.{fourier-series,stability-analysis,sturm-liouville}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, continuing math.de's established
 * domain baseline.
 *
 *   FOURIER-SERIES  Symmetry must NEVER be left unchecked before setting up
 *           any coefficient integral — checking even/odd symmetry first can
 *           eliminate half the work instantly; a_0 NEVER automatically
 *           vanishes for an even function the way b_n does — it relates to
 *           the average value and requires genuine computation regardless of
 *           symmetry; and orthogonality is NEVER a coincidence — multiplying
 *           by the matching term and integrating is the entire mechanism
 *           that isolates exactly one coefficient.
 *   STABILITY-ANALYSIS  An equilibrium's type NEVER alone determines its
 *           stability — the same eigenvalues must also be read for the SIGN
 *           of their real part; Lyapunov stability NEVER automatically
 *           implies asymptotic stability — a center stays close forever
 *           without ever converging, a genuinely different guarantee; and a
 *           purely-imaginary-eigenvalue case is NEVER an unresolvable dead
 *           end — a Lyapunov function can directly certify the true
 *           nonlinear system's stability where linearization goes silent.
 *   STURM-LIOUVILLE  Most values of the eigenvalue parameter NEVER give a
 *           genuine nonzero solution — only special discrete eigenvalues
 *           admit a nonzero eigenfunction, while every other value forces
 *           the trivial solution; eigenfunction orthogonality is NEVER
 *           checked via the plain unweighted integral in general — the
 *           weight function from the original equation must be included;
 *           and the eigenfunction-completeness result is NEVER an isolated,
 *           unrelated fact — it is a concrete instance of the general
 *           Spectral Theorem for self-adjoint operators.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const FOURIER_SERIES = 'math.de.fourier-series'
const STABILITY_ANALYSIS = 'math.de.stability-analysis'
const STURM_LIOUVILLE = 'math.de.sturm-liouville'

export const MATHEMATICS_DE_FOURIER_SERIES_STABILITY_ANALYSIS_STURM_LIOUVILLE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FOURIER_SERIES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'CHECK SYMMETRY FIRST — NEVER COMPUTE EVERY COEFFICIENT REGARDLESS: for $(f(x)=x^2)$ on '
      + '$((-\\pi,\\pi))$ (EVEN, since $((-x)^2=x^2)$): $(b_n=0)$ for ALL n IMMEDIATELY, with zero '
      + 'integration needed. A student who instead computes '
      + '$(b_n=\\frac1\\pi\\int_{-\\pi}^\\pi x^2\\sin(nx)\\,dx)$ from scratch (an odd integrand '
      + 'over a symmetric interval, genuinely zero, but requiring real work to discover) has '
      + 'wasted significant effort the symmetry check would have avoided entirely.\n\n'
      + 'A0 NEVER FOLLOWS THE SAME VANISHING RULE AS OTHER EVEN-FUNCTION COEFFICIENTS — IT '
      + 'RELATES TO THE AVERAGE VALUE, REQUIRING GENUINE COMPUTATION: even symmetry kills the '
      + 'SINE coefficients specifically because sine is an ODD function integrating to zero '
      + 'against an even f. But $(a_0)$ (twice the function\'s average value) has NO such '
      + 'automatic reason to vanish for an even (or any) function — for $(f(x)=x^2)$: '
      + '$(a_0=\\frac1\\pi\\int_{-\\pi}^\\pi x^2\\,dx=\\frac{2\\pi^2}{3}\\ne0)$, requiring GENUINE '
      + "computation despite f's evenness.\n\n"
      + 'ORTHOGONALITY IS WHAT MAKES COEFFICIENTS EXTRACTABLE — MULTIPLYING BY THE MATCHING '
      + 'TERM AND INTEGRATING ISOLATES EXACTLY ONE COEFFICIENT: for $(f(x)=x)$ on $((-\\pi,\\pi))$ '
      + '($(L=\\pi)$, ODD, so $(a_n=0)$): $(b_n=\\frac1\\pi\\int_{-\\pi}^\\pi '
      + 'x\\sin(nx)\\,dx=\\frac{2(-1)^{n+1}}{n})$ via integration by parts. Multiplying both '
      + 'sides by $(\\sin(nx))$ and integrating makes EVERY term in the infinite sum vanish '
      + 'except the matching n, because '
      + '$(\\int_{-L}^L\\sin\\frac{m\\pi x}{L}\\sin\\frac{n\\pi x}{L}\\,dx=0)$ for $(m\\ne n)$ — '
      + 'this orthogonality is the entire mechanism, never a coincidence.',
    targetedMisconceptions: [`${FOURIER_SERIES}:MC-1`, `${FOURIER_SERIES}:MC-2`, `${FOURIER_SERIES}:MC-3`],
    source: eb(FOURIER_SERIES, "Core Understanding — checking symmetry first never computing every coefficient regardless, a0 never following the same vanishing rule as other even-function coefficients since it relates to the average value requiring genuine computation, and orthogonality never being a coincidence since it is the entire mechanism isolating exactly one coefficient"),
  },
  {
    conceptId: STABILITY_ANALYSIS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'EQUILIBRIUM TYPE ALONE NEVER DETERMINES STABILITY — THE SAME EIGENVALUES MUST BE READ '
      + "FOR SIGN TOO: for $(x'=x-y,y'=x+y)$ (already classified as a spiral via "
      + '$(\\lambda=1\\pm i)$): the real part is STRICTLY POSITIVE — this spiral is UNSTABLE, '
      + 'trajectories spiraling AWAY, not toward, the origin. Both stable and unstable versions '
      + 'of nodes and spirals exist, distinguished by the SIGN of the eigenvalues\' real part, '
      + 'never by type alone; a saddle is ALWAYS unstable (one eigendirection always repels) '
      + 'regardless of the other direction.\n\n'
      + 'LYAPUNOV STABILITY AND ASYMPTOTIC STABILITY ARE PRECISELY DIFFERENT — THE CENTER CASE '
      + 'PROVES IT: for eigenvalues $(\\lambda=-2,-3)$ (both real, negative): ASYMPTOTICALLY '
      + 'stable — trajectories stay close AND converge. For $(\\lambda=\\pm3i)$ (purely '
      + 'imaginary): Lyapunov STABLE but NOT asymptotically stable — a center\'s orbits stay at '
      + 'a fixed distance FOREVER, never converging. For $(\\lambda=2,-1)$ (opposite signs): '
      + 'UNSTABLE — a saddle. The precise correspondence: BOTH real parts strictly negative '
      + 'gives asymptotic stability; purely imaginary gives Lyapunov stability WITHOUT '
      + 'asymptotic stability; any positive real part (or mixed signs) gives instability.\n\n'
      + 'LYAPUNOV FUNCTIONS RESOLVE EXACTLY THE CASES LINEARIZATION CANNOT — NEVER LEAVING THE '
      + "PURELY-IMAGINARY CASE UNRESOLVABLE: for $(x'=-y-x^3,y'=x-y^3)$: linearizing gives "
      + 'Jacobian $(\\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix})$, eigenvalues $(\\lambda=\\pm i)$ '
      + '— PURELY IMAGINARY, so linearization ALONE cannot tell whether the true nonlinear '
      + 'system is a genuine center or actually spirals. Trying $(V(x,y)=x^2+y^2)$ (positive '
      + 'except zero at origin): '
      + '$(\\dot V=2x(-y-x^3)+2y(x-y^3)=-2x^4-2y^4)$ — STRICTLY NEGATIVE everywhere except the '
      + 'origin — certifying the origin is ACTUALLY ASYMPTOTICALLY STABLE, resolving what '
      + 'linearization alone left ambiguous.',
    targetedMisconceptions: [`${STABILITY_ANALYSIS}:MC-1`, `${STABILITY_ANALYSIS}:MC-2`, `${STABILITY_ANALYSIS}:MC-3`],
    source: eb(STABILITY_ANALYSIS, "Core Understanding — equilibrium type alone never determining stability since the same eigenvalues must be read for sign too, Lyapunov stability and asymptotic stability being precisely different as the center case proves, and Lyapunov functions resolving exactly the cases linearization cannot never leaving the purely-imaginary case unresolvable"),
  },
  {
    conceptId: STURM_LIOUVILLE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'MOST VALUES OF LAMBDA GIVE ONLY THE TRIVIAL SOLUTION — NEVER A GENERIC GUARANTEE OF A '
      + "NONTRIVIAL SOLUTION: for $(y''+\\lambda y=0)$ on $([0,\\pi])$, $(y(0)=y(\\pi)=0)$: with "
      + '$(\\lambda=2)$: general solution $(y=A\\cos(\\sqrt2x)+B\\sin(\\sqrt2x))$; $(y(0)=A=0)$; '
      + '$(y(\\pi)=B\\sin(\\sqrt2\\pi)=0)$ — since $(\\sqrt2\\pi)$ is not an integer multiple of '
      + '$(\\pi)$, $(\\sin(\\sqrt2\\pi)\\ne0)$, forcing $(B=0)$ TOO — ONLY the trivial solution '
      + 'exists. With $(\\lambda=1)$: $(y(\\pi)=B\\sin(\\pi)=0)$ is AUTOMATICALLY satisfied for '
      + 'ANY B (since $(\\sin\\pi=0)$ exactly) — $(\\lambda_1=1)$ IS a genuine eigenvalue with '
      + 'eigenfunction $(\\varphi_1(x)=\\sin(x))$. In general $(\\lambda_n=n^2)$, '
      + '$(\\varphi_n(x)=\\sin(nx))$.\n\n'
      + 'ORTHOGONALITY USES THE WEIGHT W(X) FROM THE ORIGINAL EQUATION — NEVER THE PLAIN '
      + 'UNWEIGHTED INTEGRAL IN GENERAL: for this example ($(w=1)$): '
      + '$(\\langle\\varphi_1,\\varphi_2\\rangle=\\int_0^\\pi\\sin(x)\\sin(2x)\\,dx=0)$. But for '
      + 'a GENERAL Sturm-Liouville problem with $(w(x)\\ne1)$, orthogonality is '
      + '$(\\int_a^b\\varphi_m\\varphi_nw(x)\\,dx=0)$ — the SAME weight from the differential '
      + 'equation MUST be included; the unweighted integral would check the WRONG inner product '
      + 'entirely, a distinction this simplest $(w=1)$ example happens to hide.\n\n'
      + 'THE COMPLETE ORTHOGONAL EIGENFUNCTION SET IS A CONCRETE INSTANCE OF THE GENERAL '
      + "SPECTRAL THEOREM — NEVER AN ISOLATED, UNRELATED FACT: the operator $(L[y]=-y'')$ "
      + '(rewriting $(y\'\'+\\lambda y=0)$ as $(Ly=\\lambda y)$) is self-adjoint with respect to '
      + 'the weighted inner product — matching the general self-adjoint-operator guarantee of '
      + 'REAL eigenvalues (indeed $(\\lambda_n=n^2)$ are real and positive). The eigenfunctions '
      + '$(\\{\\sin(nx)\\})$ forming a complete set in $(L^2([0,\\pi]))$ is EXACTLY the '
      + 'completeness underlying Fourier sine series — Sturm-Liouville theory is the general '
      + 'machinery explaining WHY Fourier series work, generalized to other weights and '
      + 'operators.',
    targetedMisconceptions: [`${STURM_LIOUVILLE}:MC-1`, `${STURM_LIOUVILLE}:MC-2`, `${STURM_LIOUVILLE}:MC-3`],
    source: eb(STURM_LIOUVILLE, 'Core Understanding — most values of lambda giving only the trivial solution never a generic guarantee of a nontrivial solution, orthogonality using the weight w(x) from the original equation never the plain unweighted integral in general, and the complete orthogonal eigenfunction set being a concrete instance of the general Spectral Theorem never an isolated unrelated fact'),
  },
]

export const MATHEMATICS_DE_FOURIER_SERIES_STABILITY_ANALYSIS_STURM_LIOUVILLE_PROBES: SeedProbe[] = [
  {
    conceptId: FOURIER_SERIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Before setting up any coefficient integral, have you checked whether the function is even or odd?',
    choices: [
      { text: "Yes, symmetry must be checked first — for f(x)=x² on (-π,π) (even), b_n=0 for ALL n IMMEDIATELY with zero integration needed, while computing b_n from scratch instead wastes significant effort the symmetry check would have avoided entirely", isCorrect: true },
      { text: 'No, every Fourier coefficient should be computed via the full integral formula regardless of the function\'s symmetry', isCorrect: false, misconceptionId: `${FOURIER_SERIES}:MC-1` },
      { text: 'Symmetry checking is an optional shortcut that saves a little time but the full integral computation is the real, reliable procedure', isCorrect: false, misconceptionId: `${FOURIER_SERIES}:MC-1` },
    ],
    targetedMisconceptions: [`${FOURIER_SERIES}:MC-1`],
    source: eb(FOURIER_SERIES, 'Discovery Question 1 as a detection probe (verbatim) — whether symmetry should be checked before setting up any coefficient integral, an answer of "no" confirming SYMMETRY-SHORTCUT-NOT-CHECKED-FIRST'),
  },
  {
    conceptId: FOURIER_SERIES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does a₀ automatically vanish for an even function, the same way bₙ does?',
    choices: [
      { text: "No — even symmetry kills the sine coefficients specifically because sine is odd, but a₀ (twice the average value) has no such automatic reason to vanish; for f(x)=x², a₀=2π²/3≠0, requiring GENUINE computation despite f's evenness", isCorrect: true },
      { text: 'Yes, a₀ automatically vanishes for an even function the same way the sine coefficients bₙ do', isCorrect: false, misconceptionId: `${FOURIER_SERIES}:MC-2` },
      { text: "Since 'even function kills some coefficients for free' was just learned, a₀ should follow the same automatic vanishing rule as bₙ", isCorrect: false, misconceptionId: `${FOURIER_SERIES}:MC-2` },
    ],
    targetedMisconceptions: [`${FOURIER_SERIES}:MC-2`],
    source: eb(FOURIER_SERIES, 'Discovery Question 2 as a detection probe (verbatim) — whether a0 automatically vanishes for an even function the same way bn does, an answer of "yes" confirming A0-ASSUMED-TO-FOLLOW-SAME-VANISHING-RULE-AS-OTHER-EVEN-FUNCTION-COEFFICIENTS'),
  },
  {
    conceptId: FOURIER_SERIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is a Fourier coefficient extracted by multiplying by the matching sine or cosine term and integrating a coincidence, or is there a specific mechanism behind it?',
    choices: [
      { text: 'There is a specific mechanism — orthogonality: multiplying both sides by sin(nx) and integrating makes EVERY term in the infinite sum vanish except the matching n, because the integral of sin(mπx/L)sin(nπx/L) is 0 for m≠n; this is the entire mechanism, never a coincidence', isCorrect: true },
      { text: "It's essentially a lucky coincidence that multiplying by the matching term and integrating happens to isolate one coefficient", isCorrect: false, misconceptionId: `${FOURIER_SERIES}:MC-3` },
      { text: 'The coefficient-extraction procedure works the same way regardless of the specific function\'s period, without needing to track the half-period L', isCorrect: false, misconceptionId: `${FOURIER_SERIES}:MC-3` },
    ],
    targetedMisconceptions: [`${FOURIER_SERIES}:MC-3`],
    source: eb(FOURIER_SERIES, 'Discovery Question 3 as a detection probe (verbatim) — whether the coefficient formula needs to account for the actual half-period L for a non-standard-period function, an answer omitting this confirming ORTHOGONALITY-INTEGRAL-LIMITS-OR-PERIOD-MISMATCHED'),
  },
  {
    conceptId: STABILITY_ANALYSIS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "Does knowing an equilibrium's type (e.g. 'it's a spiral') automatically tell you whether it's stable or unstable?",
    choices: [
      { text: "No — for x'=x-y,y'=x+y (a spiral via λ=1±i), the real part is strictly POSITIVE, making this spiral UNSTABLE; both stable and unstable nodes and spirals exist, distinguished by the SIGN of the eigenvalues' real part, never by type alone", isCorrect: true },
      { text: "Yes, an equilibrium's type (node, saddle, spiral, center) alone determines its stability without needing to check anything further", isCorrect: false, misconceptionId: `${STABILITY_ANALYSIS}:MC-1` },
      { text: "Since 'spiral' and 'node' already describe the trajectory shape, the stability question is already answered by the classification itself", isCorrect: false, misconceptionId: `${STABILITY_ANALYSIS}:MC-1` },
    ],
    targetedMisconceptions: [`${STABILITY_ANALYSIS}:MC-1`],
    source: eb(STABILITY_ANALYSIS, 'Discovery Question 1 as a detection probe (verbatim) — whether an equilibrium\'s type alone determines stability, an answer of "yes" confirming EQUILIBRIUM-TYPE-ASSUMED-TO-DETERMINE-STABILITY-ALONE'),
  },
  {
    conceptId: STABILITY_ANALYSIS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does Lyapunov stability (staying close) automatically imply asymptotic stability (eventually converging)?',
    choices: [
      { text: "No — for λ=±3i (purely imaginary), the system is Lyapunov STABLE but NOT asymptotically stable; a center's orbits stay at a fixed distance FOREVER, never converging, a genuinely permanent non-converging orbit categorically different from a stable spiral that actually arrives", isCorrect: true },
      { text: 'Yes, Lyapunov stability (staying close) automatically implies asymptotic stability (eventually converging)', isCorrect: false, misconceptionId: `${STABILITY_ANALYSIS}:MC-2` },
      { text: "Since 'stable' colloquially suggests settling down, Lyapunov stability should be treated as equivalent to eventually converging", isCorrect: false, misconceptionId: `${STABILITY_ANALYSIS}:MC-2` },
    ],
    targetedMisconceptions: [`${STABILITY_ANALYSIS}:MC-2`],
    source: eb(STABILITY_ANALYSIS, 'Discovery Question 2 as a detection probe (verbatim) — whether Lyapunov stability automatically implies asymptotic stability, an answer of "yes" confirming LYAPUNOV-STABILITY-ASSUMED-TO-IMPLY-ASYMPTOTIC-STABILITY'),
  },
  {
    conceptId: STABILITY_ANALYSIS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "When linearization gives purely imaginary eigenvalues, is there any further technique to determine the true nonlinear system's stability?",
    choices: [
      { text: "Yes — a Lyapunov function can resolve it: for x'=-y-x³,y'=x-y³ (linearization gives λ=±i), trying V(x,y)=x²+y² gives V̇=-2x⁴-2y⁴, STRICTLY NEGATIVE everywhere except the origin, certifying the origin is ACTUALLY ASYMPTOTICALLY STABLE, resolving what linearization alone left ambiguous", isCorrect: true },
      { text: 'No — when linearization gives purely imaginary eigenvalues, no further technique can resolve the true nonlinear system\'s stability', isCorrect: false, misconceptionId: `${STABILITY_ANALYSIS}:MC-3` },
      { text: 'An inconclusive linear approximation means the stability question for that equilibrium simply cannot be answered by any means', isCorrect: false, misconceptionId: `${STABILITY_ANALYSIS}:MC-3` },
    ],
    targetedMisconceptions: [`${STABILITY_ANALYSIS}:MC-3`],
    source: eb(STABILITY_ANALYSIS, 'Discovery Question 3 as a detection probe (verbatim) — whether a purely-imaginary-eigenvalue case can be resolved by any further technique, an answer of "no" confirming LINEARIZATION-INCONCLUSIVE-CASE-ASSUMED-UNRESOLVABLE'),
  },
  {
    conceptId: STURM_LIOUVILLE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does the Sturm-Liouville BVP have a genuine nonzero solution for every value of λ?',
    choices: [
      { text: "No — for y''+λy=0 on [0,π], y(0)=y(π)=0: with λ=2, only the trivial solution exists since sin(√2π)≠0 forces B=0 too. With λ=1, y(π)=B sin(π)=0 is AUTOMATICALLY satisfied for ANY B — λ=1 IS a genuine eigenvalue with eigenfunction sin(x). Most λ give only the trivial solution", isCorrect: true },
      { text: 'Yes, the Sturm-Liouville BVP has a genuine nonzero solution for every value of the parameter λ', isCorrect: false, misconceptionId: `${STURM_LIOUVILLE}:MC-1` },
      { text: 'A boundary value problem generically has a solution, so any λ chosen should produce a nontrivial eigenfunction', isCorrect: false, misconceptionId: `${STURM_LIOUVILLE}:MC-1` },
    ],
    targetedMisconceptions: [`${STURM_LIOUVILLE}:MC-1`],
    source: eb(STURM_LIOUVILLE, 'Discovery Question 1 as a detection probe (verbatim) — whether the Sturm-Liouville BVP has a genuine nonzero solution for every λ, an answer of "yes" confirming STURM-LIOUVILLE-BVP-ASSUMED-SOLVABLE-FOR-EVERY-LAMBDA'),
  },
  {
    conceptId: STURM_LIOUVILLE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is eigenfunction orthogonality always checked using the plain, unweighted integral?',
    choices: [
      { text: "No — for a GENERAL Sturm-Liouville problem with w(x)≠1, orthogonality is ∫φ_mφ_nw(x)dx=0, the SAME weight from the differential equation MUST be included; the unweighted integral would check the WRONG inner product entirely, a distinction the simplest w=1 example happens to hide", isCorrect: true },
      { text: 'Yes, eigenfunction orthogonality is always checked using the plain, unweighted integral regardless of the original equation', isCorrect: false, misconceptionId: `${STURM_LIOUVILLE}:MC-2` },
      { text: "Since the simplest example uses w=1, the weight function's role can generally be ignored when checking orthogonality", isCorrect: false, misconceptionId: `${STURM_LIOUVILLE}:MC-2` },
    ],
    targetedMisconceptions: [`${STURM_LIOUVILLE}:MC-2`],
    source: eb(STURM_LIOUVILLE, 'Discovery Question 2 as a detection probe (verbatim) — whether eigenfunction orthogonality is always checked using the plain unweighted integral, an answer of "yes" confirming ORTHOGONALITY-ASSUMED-UNWEIGHTED'),
  },
  {
    conceptId: STURM_LIOUVILLE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the Sturm-Liouville eigenfunction-completeness result a special, isolated fact unrelated to general operator theory?',
    choices: [
      { text: "No — the operator L[y]=-y'' is self-adjoint with respect to the weighted inner product, matching the general self-adjoint-operator guarantee of REAL eigenvalues; the eigenfunctions forming a complete set is EXACTLY the completeness underlying Fourier series, a concrete instance of the general Spectral Theorem", isCorrect: true },
      { text: 'Yes, the eigenfunction-completeness result is a special, isolated fact unique to this particular equation, unrelated to general operator theory', isCorrect: false, misconceptionId: `${STURM_LIOUVILLE}:MC-3` },
      { text: 'The concrete, computable nature of this example means it has no meaningful connection to abstract self-adjoint operator theory', isCorrect: false, misconceptionId: `${STURM_LIOUVILLE}:MC-3` },
    ],
    targetedMisconceptions: [`${STURM_LIOUVILLE}:MC-3`],
    source: eb(STURM_LIOUVILLE, 'Discovery Question 3 as a detection probe (verbatim) — whether the eigenfunction-completeness result is isolated from general operator theory, an answer of "yes" confirming STURM-LIOUVILLE-TREATED-AS-ISOLATED-FROM-SPECTRAL-THEORY'),
  },
]
