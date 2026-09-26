/**
 * Batch: bessel-equation, greens-function, harmonic-functions (math.de).
 *
 * Fresh Phase 0 frontier recompute after the poisson-equation/laplace-ode/
 * chaos batch found ALL 13 remaining math.de concepts simultaneously ready
 * (bessel-equation, convolution-theorem, eigenfunction-expansion, fourier-
 * convergence, fourier-sine-cosine, fourier-transform, greens-function,
 * harmonic-functions, heat-equation, legendre-equation, pde-classification,
 * systems-matrix-method, wave-equation) — the domain's dependency graph has
 * fully opened. Selects bessel-equation, greens-function (closing the last
 * previously-blocked concept, now that poisson-equation is authored), and
 * harmonic-functions as this batch. Transcribed from the frozen Educational
 * Brain entries at educational-brain/concepts/mathematics/math.de.{bessel-
 * equation,greens-function,harmonic-functions}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, continuing math.de's established
 * domain baseline.
 *
 *   BESSEL-EQUATION  Solving Bessel's equation is NEVER a new technique
 *           beyond Frobenius — it is the identical Frobenius procedure
 *           applied concretely; the general solution's second independent
 *           piece is NEVER kept unconditionally — whether it survives
 *           depends entirely on whether the physical domain includes the
 *           origin; and Bessel's equation is NEVER an arbitrary example —
 *           it arises inevitably from cylindrical/circular symmetry via
 *           separation of variables.
 *   GREENS-FUNCTION  The Green's function is NEVER a single smooth formula
 *           across the whole interval — it requires a genuine piecewise
 *           construction with a derivative jump at the source point;
 *           finding the Green's function is NEVER already sufficient to
 *           solve the general nonhomogeneous equation — the superposition
 *           integral against the actual source is the essential remaining
 *           step; and the Green's function is NEVER a property of the
 *           operator alone — it also encodes the specific boundary
 *           conditions, changing genuinely if they change.
 *   HARMONIC-FUNCTIONS  The mean value property is NEVER an approximation
 *           — it is an exact identity holding for every harmonic function
 *           and every valid circle; confirming two harmonic functions match
 *           throughout a region NEVER requires checking interior points —
 *           boundary agreement alone, via the maximum principle applied to
 *           their difference, is already sufficient; and harmonic and
 *           holomorphic functions are NEVER unrelated topics — any
 *           holomorphic function's real and imaginary parts are
 *           automatically harmonic via the Cauchy-Riemann equations.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const BESSEL_EQUATION = 'math.de.bessel-equation'
const GREENS_FUNCTION = 'math.de.greens-function'
const HARMONIC_FUNCTIONS = 'math.de.harmonic-functions'

export const MATHEMATICS_DE_BESSEL_EQUATION_GREENS_FUNCTION_HARMONIC_FUNCTIONS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BESSEL_EQUATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "BESSEL'S EQUATION IS SOLVED BY THE SAME FROBENIUS PROCEDURE — NEVER A NEW TECHNIQUE: for "
      + '$(\\nu=0)$: $(x^2y\'\'+xy\'+x^2y=0)$. Substituting $(y=\\sum a_nx^{n+r})$: the '
      + 'LOWEST-order term ($(n=0)$) gives $(a_0r^2x^r=0\\Rightarrow r^2=0)$ — a REPEATED root '
      + '$(r=0)$, matching the Frobenius equal-roots case exactly. This is the identical '
      + 'Frobenius setup already learned, applied concretely — no new solving machinery is '
      + 'introduced.\n\n'
      + "Y-NU'S SINGULARITY AT THE ORIGIN FORCES ITS EXCLUSION WHENEVER THE PHYSICAL DOMAIN "
      + 'INCLUDES X=0 — NEVER KEPT UNCONDITIONALLY: for a SOLID circular drumhead (domain '
      + 'includes the center): the general solution $(y=c_1J_\\nu(x)+c_2Y_\\nu(x))$ must have '
      + '$(c_2=0)$, since $(Y_\\nu(x)\\to-\\infty)$ as $(x\\to0)$ but the drumhead\'s '
      + 'displacement must remain FINITE at the center — leaving only $(y=c_1J_\\nu(x))$. '
      + 'Contrast an ANNULAR (ring-shaped) drumhead excluding the origin: BOTH $(J_\\nu)$ and '
      + '$(Y_\\nu)$ remain admissible, since neither singularity falls inside the physical '
      + 'domain. Which solution survives depends ENTIRELY on the domain, never a fixed universal '
      + 'rule.\n\n'
      + 'BESSEL\'S EQUATION ARISES INEVITABLY FROM CYLINDRICAL/CIRCULAR SYMMETRY — NEVER AN '
      + 'ARBITRARY EXAMPLE: separating variables in the 2D wave equation on a circular drumhead '
      + '$(u(r,\\theta,t)=R(r)\\Theta(\\theta)T(t))$: the ANGULAR separation forces '
      + '$(\\Theta(\\theta)=\\cos(n\\theta))$ or $(\\sin(n\\theta))$ for integer n; substituting '
      + 'back, the RADIAL function $(R(r))$ satisfies EXACTLY Bessel\'s equation with '
      + '$(\\nu=n)$. The circular geometry DIRECTLY produces Bessel\'s equation as the natural '
      + 'radial building block — this is why Bessel functions appear pervasively in physics, '
      + 'not an isolated curiosity chosen for practice.',
    targetedMisconceptions: [`${BESSEL_EQUATION}:MC-1`, `${BESSEL_EQUATION}:MC-2`, `${BESSEL_EQUATION}:MC-3`],
    source: eb(BESSEL_EQUATION, "Core Understanding — Bessel's equation being solved by the same Frobenius procedure never a new technique, Y-nu's singularity at the origin forcing its exclusion whenever the physical domain includes x=0 never kept unconditionally, and Bessel's equation arising inevitably from cylindrical/circular symmetry never an arbitrary example"),
  },
  {
    conceptId: GREENS_FUNCTION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "G REQUIRES A PIECEWISE CONSTRUCTION WITH A DERIVATIVE JUMP — NEVER A SINGLE SMOOTH "
      + "FORMULA: for $(-u''=f(x))$ on $([0,1])$ with $(u(0)=u(1)=0)$: G satisfies "
      + '$(-G\'\'=\\delta(x-\\xi))$ with the SAME boundary conditions. For $(x<\\xi)$: $(G=Ax)$ '
      + '(satisfying $(G(0)=0)$). For $(x>\\xi)$: $(G=B(1-x))$ (satisfying $(G(1)=0)$). '
      + 'CONTINUITY at $(x=\\xi)$ gives $(A\\xi=B(1-\\xi))$; integrating across the point source '
      + 'forces a JUMP $(G\'(\\xi^-)-G\'(\\xi^+)=1)$. Solving: $(A=1-\\xi)$, $(B=\\xi)$, giving '
      + '$(G(x,\\xi)=x(1-\\xi))$ for $(x\\le\\xi)$, $(\\xi(1-x))$ for $(x\\ge\\xi)$ — a genuine '
      + 'KINK at $(x=\\xi)$, NEVER a smooth function there, exactly the mathematical signature '
      + 'of responding to a concentrated point source.\n\n'
      + 'G ALONE NEVER SOLVES THE GENERAL PROBLEM — THE SUPERPOSITION INTEGRAL IS THE ESSENTIAL '
      + "STEP: using the SAME G above to solve $(-u''=1)$ on $([0,1])$, $(u(0)=u(1)=0)$: "
      + '$(u(x)=\\int_0^1G(x,\\xi)\\cdot1\\,d\\xi=\\int_0^x\\xi(1-x)\\,d\\xi+'
      + '\\int_x^1x(1-\\xi)\\,d\\xi=\\frac{x(1-x)}2)$ — EXACTLY matching the known closed-form '
      + "solution ($(u''=-1)$ confirms $(-u''=1)$; $(u(0)=u(1)=0)$ confirms the BCs). G by "
      + 'itself only answers the single point-source question (f concentrated at one $(\\xi)$) — '
      + 'the INTEGRAL against the actual, distributed source $(f(\\xi))$ is what builds the '
      + 'genuine general solution, never something G provides on its own.\n\n'
      + 'G ENCODES THE BOUNDARY CONDITIONS TOO — NEVER THE OPERATOR ALONE: if the boundary '
      + 'conditions were instead $(u(0)=0)$, $(u\'(1)=0)$ (mixed) rather than $(u(0)=u(1)=0)$, '
      + 'the SAME operator $(-d^2/dx^2)$ would require a genuinely DIFFERENT G — the '
      + 'right-hand piece would need to satisfy $(u\'(1)=0)$ instead of $(u(1)=0)$. Changing '
      + 'the boundary conditions while keeping L fixed produces a genuinely different Green\'s '
      + 'function; G is a property of the WHOLE boundary-value problem, operator plus boundary '
      + 'conditions together, never L alone.',
    targetedMisconceptions: [`${GREENS_FUNCTION}:MC-1`, `${GREENS_FUNCTION}:MC-2`, `${GREENS_FUNCTION}:MC-3`],
    source: eb(GREENS_FUNCTION, "Core Understanding — G requiring a piecewise construction with a derivative jump never a single smooth formula, G alone never solving the general problem since the superposition integral is the essential step, and G encoding the boundary conditions too never the operator alone"),
  },
  {
    conceptId: HARMONIC_FUNCTIONS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE MEAN VALUE PROPERTY IS AN EXACT IDENTITY — NEVER AN APPROXIMATION: for u harmonic on '
      + 'a domain containing the closed disk of radius r around $(z_0)$: '
      + '$(u(z_0)=\\frac1{2\\pi}\\int_0^{2\\pi}u(z_0+re^{i\\theta})\\,d\\theta)$ — exact for '
      + 'EVERY harmonic function and EVERY valid circle, never merely asymptotic or '
      + 'special-case. For $(u(x,y)=x^2-y^2)$ (harmonic: $(u_{xx}+u_{yy}=2-2=0)$): around the '
      + 'origin, $(u(r\\cos\\theta,r\\sin\\theta)=r^2\\cos2\\theta)$, whose average over a full '
      + 'period is EXACTLY 0 — matching $(u(0,0)=0)$ precisely, not approximately.\n\n'
      + 'BOUNDARY AGREEMENT ALONE FORCES INTERIOR AGREEMENT — NEVER REQUIRING SEPARATE '
      + 'INTERIOR CHECKS: if $(u_1,u_2)$ are both harmonic on a bounded region and agree on the '
      + 'ENTIRE boundary, let $(w=u_1-u_2)$ — harmonic (linearity of $(\\nabla^2)$) and '
      + 'identically zero on the boundary. By the maximum/minimum principle, w\'s extremes '
      + 'occur ONLY on the boundary, where $(w\\equiv0)$ — forcing $(\\max w=\\min w=0)$ '
      + 'throughout, hence $(w\\equiv0)$ everywhere and $(u_1\\equiv u_2)$. This is the '
      + 'UNIQUENESS of the Dirichlet problem: a solution, if one exists, is the ONLY one with '
      + 'that boundary data — no interior information was ever supplied or needed.\n\n'
      + 'HOLOMORPHIC FUNCTIONS ARE A FREE SOURCE OF HARMONIC FUNCTIONS — NEVER AN UNRELATED '
      + 'TOPIC: if $(f=u+iv)$ is holomorphic, the Cauchy-Riemann equations give '
      + '$(u_x=v_y)$, $(u_y=-v_x)$. Differentiating the first in x: $(u_{xx}=v_{yx})$. '
      + 'Differentiating the second in y: $(u_{yy}=-v_{xy})$. Since a holomorphic function\'s '
      + 'components have continuous mixed partials, $(v_{yx}=v_{xy})$, giving '
      + '$(u_{xx}+u_{yy}=v_{yx}-v_{xy}=0)$ — u is harmonic (and, by the identical argument the '
      + 'other way, so is v). For $(f(z)=z^2)$: $(u=x^2-y^2)$, $(v=2xy)$ — BOTH automatically '
      + 'harmonic once $(z^2)$\'s holomorphicity is confirmed via Cauchy-Riemann, with ZERO '
      + 'separate Laplacian verification needed.',
    targetedMisconceptions: [`${HARMONIC_FUNCTIONS}:MC-1`, `${HARMONIC_FUNCTIONS}:MC-2`, `${HARMONIC_FUNCTIONS}:MC-3`],
    source: eb(HARMONIC_FUNCTIONS, 'Core Understanding — the mean value property being an exact identity never an approximation, boundary agreement alone forcing interior agreement never requiring separate interior checks, and holomorphic functions being a free source of harmonic functions never an unrelated topic'),
  },
]

export const MATHEMATICS_DE_BESSEL_EQUATION_GREENS_FUNCTION_HARMONIC_FUNCTIONS_PROBES: SeedProbe[] = [
  {
    conceptId: BESSEL_EQUATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "Does solving Bessel's equation require a genuinely new solution technique, or exactly the Frobenius method?",
    choices: [
      { text: "Exactly the Frobenius method — for ν=0, x²y''+xy'+x²y=0, substituting y=Σanx^(n+r) gives the lowest-order term a0r²x^r=0 ⟹ r²=0, a REPEATED root matching the Frobenius equal-roots case exactly; no new solving machinery is introduced", isCorrect: true },
      { text: "Solving Bessel's equation requires a genuinely new technique beyond the Frobenius method", isCorrect: false, misconceptionId: `${BESSEL_EQUATION}:MC-1` },
      { text: "The special-function names Jν and Yν indicate a distinct new solving apparatus separate from Frobenius", isCorrect: false, misconceptionId: `${BESSEL_EQUATION}:MC-1` },
    ],
    targetedMisconceptions: [`${BESSEL_EQUATION}:MC-1`],
    source: eb(BESSEL_EQUATION, 'Discovery Question 1 as a detection probe (verbatim) — whether solving Bessel\'s equation requires a genuinely new technique or exactly the Frobenius method, an answer of "a new technique" confirming BESSEL-ASSUMED-NEW-TECHNIQUE'),
  },
  {
    conceptId: BESSEL_EQUATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Should the general solution c₁Jν+c₂Yν always be kept in full, regardless of the physical domain?',
    choices: [
      { text: "No — for a SOLID circular drumhead (domain includes the center), c2 must be 0 since Yν(x)→-∞ as x→0 but displacement must stay FINITE; for an ANNULAR drumhead excluding the origin, BOTH Jν and Yν remain admissible; which solution survives depends ENTIRELY on the domain", isCorrect: true },
      { text: "Yes, the general solution c1Jν+c2Yν should always be kept in full regardless of the physical domain", isCorrect: false, misconceptionId: `${BESSEL_EQUATION}:MC-2` },
      { text: "Since 'the general solution' is meant to be the complete final answer, both terms should always remain regardless of domain considerations", isCorrect: false, misconceptionId: `${BESSEL_EQUATION}:MC-2` },
    ],
    targetedMisconceptions: [`${BESSEL_EQUATION}:MC-2`],
    source: eb(BESSEL_EQUATION, 'Discovery Question 2 as a detection probe (verbatim) — whether the general solution should always be kept in full regardless of domain, an answer of "yes, always" confirming GENERAL-SOLUTION-ASSUMED-ALWAYS-KEPT-IN-FULL'),
  },
  {
    conceptId: BESSEL_EQUATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Is Bessel's equation an arbitrary example ODE, or does it arise from a specific geometry?",
    choices: [
      { text: "It arises from a specific geometry — separating variables in the 2D wave equation on a circular drumhead u(r,θ,t)=R(r)Θ(θ)T(t), the radial function R(r) satisfies EXACTLY Bessel's equation with ν=n; circular geometry directly produces Bessel's equation as the natural radial building block", isCorrect: true },
      { text: "Bessel's equation is an arbitrary example ODE unconnected to any specific geometry", isCorrect: false, misconceptionId: `${BESSEL_EQUATION}:MC-3` },
      { text: "The equation's abstract algebraic form means it was likely chosen at random for Frobenius practice, without any geometric origin", isCorrect: false, misconceptionId: `${BESSEL_EQUATION}:MC-3` },
    ],
    targetedMisconceptions: [`${BESSEL_EQUATION}:MC-3`],
    source: eb(BESSEL_EQUATION, 'Discovery Question 3 as a detection probe (verbatim) — whether Bessel\'s equation is an arbitrary example or arises from a specific geometry, an answer of "arbitrary example" confirming BESSEL-EQUATION-ASSUMED-ARBITRARY-EXAMPLE'),
  },
  {
    conceptId: GREENS_FUNCTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Can the Green\'s function for -u\'\'=δ(x-ξ) be found as a single smooth formula across the whole interval, or does it need separate pieces?',
    choices: [
      { text: "It needs separate pieces — for -u''=δ(x-ξ) on [0,1] with u(0)=u(1)=0: G=Ax for x<ξ, G=B(1-x) for x>ξ; continuity plus the jump condition G'(ξ⁻)-G'(ξ⁺)=1 give G(x,ξ)=x(1-ξ) for x≤ξ, ξ(1-x) for x≥ξ — a genuine KINK, never smooth throughout", isCorrect: true },
      { text: "The Green's function for -u''=δ(x-ξ) can be found as a single smooth formula across the whole interval", isCorrect: false, misconceptionId: `${GREENS_FUNCTION}:MC-1` },
      { text: "Since a Green's function represents a 'solution', it should naturally be a single continuous, smooth formula everywhere", isCorrect: false, misconceptionId: `${GREENS_FUNCTION}:MC-1` },
    ],
    targetedMisconceptions: [`${GREENS_FUNCTION}:MC-1`],
    source: eb(GREENS_FUNCTION, 'Discovery Question 1 as a detection probe (verbatim) — whether the Green\'s function needs a piecewise construction or is a single smooth formula, an answer of "single smooth formula" confirming GREENS-FUNCTION-ASSUMED-SMOOTH-THROUGHOUT'),
  },
  {
    conceptId: GREENS_FUNCTION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "Once you've found the Green's function for an operator, have you already solved the general nonhomogeneous equation for any source f?",
    choices: [
      { text: "Not yet — using the SAME G to solve -u''=1 on [0,1], u(0)=u(1)=0 requires u(x)=∫G(x,ξ)·1 dξ = x(1-x)/2, matching the known closed-form solution; G by itself only answers the single point-source question, the INTEGRAL against the actual source is what builds the general solution", isCorrect: true },
      { text: "Yes, finding G already solves the general nonhomogeneous equation Lu=f for any source f", isCorrect: false, misconceptionId: `${GREENS_FUNCTION}:MC-2` },
      { text: "Since finding G is the hard part of the process, the superposition integral against f is just a formality that adds nothing new", isCorrect: false, misconceptionId: `${GREENS_FUNCTION}:MC-2` },
    ],
    targetedMisconceptions: [`${GREENS_FUNCTION}:MC-2`],
    source: eb(GREENS_FUNCTION, 'Discovery Question 2 as a detection probe (verbatim) — whether finding G alone already solves the general nonhomogeneous equation, an answer of "yes" confirming GREENS-FUNCTION-ALONE-ASSUMED-SUFFICIENT'),
  },
  {
    conceptId: GREENS_FUNCTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If the differential operator stays the same, must the Green\'s function also stay the same regardless of the boundary conditions?',
    choices: [
      { text: "No — if the boundary conditions changed to u(0)=0, u'(1)=0 (mixed) instead of u(0)=u(1)=0, the SAME operator -d²/dx² would require a genuinely DIFFERENT G; G is a property of the WHOLE boundary-value problem, operator plus boundary conditions together, never the operator alone", isCorrect: true },
      { text: "Yes, the Green's function depends only on the differential operator L, regardless of the boundary conditions", isCorrect: false, misconceptionId: `${GREENS_FUNCTION}:MC-3` },
      { text: "The notation G(x,ξ) for a fixed operator confirms that G is purely a property of the operator itself", isCorrect: false, misconceptionId: `${GREENS_FUNCTION}:MC-3` },
    ],
    targetedMisconceptions: [`${GREENS_FUNCTION}:MC-3`],
    source: eb(GREENS_FUNCTION, 'Discovery Question 3 as a detection probe (verbatim) — whether the Green\'s function must stay the same if the operator stays the same regardless of boundary conditions, an answer of "yes" confirming GREENS-FUNCTION-ASSUMED-OPERATOR-ONLY'),
  },
  {
    conceptId: HARMONIC_FUNCTIONS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does the mean value property hold exactly for every harmonic function and every circle, or is it only an approximation that improves for small circles?',
    choices: [
      { text: "It holds exactly — for u(x,y)=x²-y² (harmonic since uxx+uyy=2-2=0), around the origin u(r cosθ,r sinθ)=r²cos2θ, whose average over a full period is EXACTLY 0, matching u(0,0)=0 precisely, never merely asymptotic or approximate", isCorrect: true },
      { text: "The mean value property only holds approximately, improving for smaller circles", isCorrect: false, misconceptionId: `${HARMONIC_FUNCTIONS}:MC-1` },
      { text: "The mean value property only holds for 'nice' or special harmonic functions, not every harmonic function and circle", isCorrect: false, misconceptionId: `${HARMONIC_FUNCTIONS}:MC-1` },
    ],
    targetedMisconceptions: [`${HARMONIC_FUNCTIONS}:MC-1`],
    source: eb(HARMONIC_FUNCTIONS, 'Discovery Question 1 as a detection probe (verbatim) — whether the mean value property holds exactly or is only an approximation, an answer of "only an approximation" confirming MEAN-VALUE-PROPERTY-AS-APPROXIMATION'),
  },
  {
    conceptId: HARMONIC_FUNCTIONS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'To confirm two harmonic functions are identical throughout a region, do you need to check interior points too, or is boundary agreement alone sufficient?',
    choices: [
      { text: "Boundary agreement alone is sufficient — letting w=u1-u2 (harmonic, zero on the boundary), the maximum/minimum principle forces w's extremes to occur ONLY on the boundary where w≡0, hence max w=min w=0 throughout, so w≡0 everywhere and u1≡u2, with no interior information ever needed", isCorrect: true },
      { text: "Confirming two harmonic functions are identical requires checking interior points too, not just the boundary", isCorrect: false, misconceptionId: `${HARMONIC_FUNCTIONS}:MC-2` },
      { text: "More checking is always safer, so interior points must be verified even after boundary agreement is established", isCorrect: false, misconceptionId: `${HARMONIC_FUNCTIONS}:MC-2` },
    ],
    targetedMisconceptions: [`${HARMONIC_FUNCTIONS}:MC-2`],
    source: eb(HARMONIC_FUNCTIONS, 'Discovery Question 2 as a detection probe (verbatim) — whether confirming two harmonic functions match requires checking interior points or boundary agreement alone suffices, an answer requiring interior checks confirming INTERIOR-CHECK-ASSUMED-NECESSARY'),
  },
  {
    conceptId: HARMONIC_FUNCTIONS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Are harmonic functions and holomorphic functions two separate, unrelated topics, or is there a direct structural connection between them?',
    choices: [
      { text: "There is a direct connection — if f=u+iv is holomorphic, the Cauchy-Riemann equations give ux=vy, uy=-vx; differentiating and using continuous mixed partials gives uxx+uyy=vyx-vxy=0, so u is harmonic (and so is v); for f(z)=z², both u=x²-y² and v=2xy are automatically harmonic", isCorrect: true },
      { text: "Harmonic functions and holomorphic functions are two separate, unrelated topics", isCorrect: false, misconceptionId: `${HARMONIC_FUNCTIONS}:MC-3` },
      { text: "Since real PDE theory and complex analysis are taught in different courses, harmonic and holomorphic functions must be structurally independent", isCorrect: false, misconceptionId: `${HARMONIC_FUNCTIONS}:MC-3` },
    ],
    targetedMisconceptions: [`${HARMONIC_FUNCTIONS}:MC-3`],
    source: eb(HARMONIC_FUNCTIONS, 'Discovery Question 3 as a detection probe (verbatim) — whether harmonic and holomorphic functions are unrelated or directly connected, an answer of "unrelated" confirming HARMONIC-AND-HOLOMORPHIC-UNRELATED'),
  },
]
