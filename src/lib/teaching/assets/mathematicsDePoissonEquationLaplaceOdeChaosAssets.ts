/**
 * Batch: poisson-equation, laplace-ode, chaos (math.de).
 *
 * Fresh Phase 0 frontier recompute after the laplace-equation/inverse-
 * laplace/frobenius-method batch found 15 ready concepts (bessel-equation,
 * chaos, convolution-theorem, eigenfunction-expansion, fourier-convergence,
 * fourier-sine-cosine, fourier-transform, harmonic-functions, heat-
 * equation, laplace-ode, legendre-equation, pde-classification, poisson-
 * equation, systems-matrix-method, wave-equation) with only greens-
 * function still blocked (needs poisson-equation). Selects poisson-
 * equation (opens the last blocked concept, greens-function), laplace-ode
 * (closes inverse-laplace's declared unlock), and chaos (closes the
 * nonlinear-ode/bifurcation chain) as the three highest-leverage picks.
 * Transcribed from the frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.de.{poisson-equation,laplace-ode,
 * chaos}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, continuing math.de's established
 * domain baseline.
 *
 *   POISSON-EQUATION  Laplace's special properties (mean value property,
 *           maximum principle) NEVER automatically extend to Poisson's
 *           Equation — they are special consequences of the homogeneous
 *           case that genuinely fail once a source term is present;
 *           Poisson's Equation and Laplace's Equation are NEVER unrelated
 *           theories — Laplace's Equation IS Poisson's Equation with its
 *           source term set to zero; and Green's functions are NEVER a
 *           mere notational convenience — they represent a genuine point-
 *           source-then-superpose solution strategy.
 *   LAPLACE-ODE  Initial conditions are NEVER applied as free constants at
 *           the end of the Laplace-transform pipeline — they are baked in
 *           algebraically at the transform step itself; a partial-fraction
 *           decomposition of the transformed equation is NEVER applied
 *           naively — proper-fraction status and root type must be checked
 *           first; and the inverse Laplace transform of a product of
 *           transforms is NEVER the pointwise product — it is the
 *           convolution, a genuinely different operation.
 *   CHAOS  Chaos is NEVER random — it is deterministic sensitive dependence
 *           on initial conditions, where the same initial condition always
 *           produces the identical trajectory; the Lyapunov exponent is
 *           NEVER an instantaneous constant divergence rate — it is a
 *           time-averaged asymptotic quantity over infinite time; and
 *           chaos NEVER requires a large or high-dimensional system —
 *           minimal 3-variable or even 1-variable systems already exhibit
 *           genuine chaos given sufficient nonlinearity and dimension.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const POISSON_EQUATION = 'math.de.poisson-equation'
const LAPLACE_ODE = 'math.de.laplace-ode'
const CHAOS = 'math.de.chaos'

export const MATHEMATICS_DE_POISSON_EQUATION_LAPLACE_ODE_CHAOS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: POISSON_EQUATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "LAPLACE'S SPECIAL PROPERTIES DO NOT AUTOMATICALLY EXTEND TO POISSON'S EQUATION — NEVER "
      + 'ASSUMED TO CARRY OVER UNCHANGED: for $(u=x^2)$: $(\\nabla^2u=u_{xx}+u_{yy}=2+0=2)$ — a '
      + 'Poisson solution with source $(f=2)$. Checking the mean value property at the origin: '
      + '$(u(r\\cos\\theta,r\\sin\\theta)=r^2\\cos^2\\theta)$, averaging to $(\\frac{r^2}2)$ over '
      + '$(\\theta\\in[0,2\\pi])$ — but $(u(0,0)=0)$. Since $(\\frac{r^2}2\\ne0)$ for $(r>0)$, '
      + 'the mean value property GENUINELY FAILS for this Poisson solution — directly '
      + 'demonstrating that the mean value property and maximum principle are SPECIAL '
      + 'consequences of the homogeneous $(f\\equiv0)$ case, never automatically inherited '
      + 'whenever $(\\nabla^2u)$ merely gets computed for some function.\n\n'
      + "POISSON'S EQUATION CONTAINS LAPLACE'S EQUATION AS ITS SPECIAL CASE F=0 — NEVER A "
      + 'SEPARATE, UNRELATED THEORY: the electrostatic potential satisfies '
      + '$(\\nabla^2V=-\\rho/\\varepsilon_0)$. In a charge-FREE region ($(\\rho=0)$), this '
      + "reduces EXACTLY to Laplace's Equation $(\\nabla^2V=0)$ — meaning Laplace's Equation's "
      + 'ENTIRE machinery (separation of variables, mean value property, maximum principle) '
      + 'applies validly there. But wherever charge genuinely exists ($(\\rho\\ne0)$), the FULL '
      + 'nonhomogeneous equation must be solved, and NONE of Laplace\'s special properties can '
      + "be assumed to hold at those points without separate justification — Laplace's Equation "
      + "is not a different topic, it's Poisson's Equation with its source term set to zero.\n\n"
      + "GREEN'S FUNCTIONS REPRESENT A GENUINE POINT-SOURCE-THEN-SUPERPOSE STRATEGY — NEVER MERE "
      + 'NOTATION: solving $(\\nabla^2u=f)$ for an ARBITRARY source distribution proceeds by '
      + 'first solving the SIMPLER problem $(\\nabla^2G=\\delta)$ (the response to a single '
      + 'idealized point source), then building the full solution by SUPERPOSING (integrating) '
      + 'copies of G, each shifted to a different point and weighted by f\'s actual value there. '
      + "This is a genuinely distinct SOLUTION STRATEGY — contrast Laplace's Equation's "
      + 'separation-of-variables approach, which directly solves the full boundary-value problem '
      + 'at once, rather than building it up from point-source responses.',
    targetedMisconceptions: [`${POISSON_EQUATION}:MC-1`, `${POISSON_EQUATION}:MC-2`, `${POISSON_EQUATION}:MC-3`],
    source: eb(POISSON_EQUATION, "Core Understanding — Laplace's special properties never automatically extending to Poisson's Equation, Poisson's Equation containing Laplace's Equation as its special case f=0 never a separate unrelated theory, and Green's functions representing a genuine point-source-then-superpose strategy never mere notation"),
  },
  {
    conceptId: LAPLACE_ODE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'INITIAL CONDITIONS ARE ENCODED AT THE TRANSFORM STEP — NEVER APPLIED AS FREE CONSTANTS '
      + "AT THE END: for $(y''+4y=0,y(0)=2,y'(0)=0)$: transforming gives "
      + '$(s^2Y-2s+4Y=0\\Rightarrow(s^2+4)Y=2s\\Rightarrow Y=2s/(s^2+4))$, inverting to '
      + "$(y=2\\cos(2t))$ — verified directly ($(y''+4y=0)$, $(y(0)=2)$, $(y'(0)=0)$ all check "
      + 'out). There are NO free constants $(C_1,C_2)$ in this method — the initial conditions '
      + 'are ALREADY baked into $(Y(s))$ algebraically, the moment the derivatives are '
      + 'transformed.\n\n'
      + 'PARTIAL FRACTIONS MUST BE CHECKED FOR PROPER DEGREE AND CORRECT ROOT-TYPE FORM — NEVER '
      + 'APPLIED NAIVELY: for $(Y(s)=1/[(s+1)^2(s+2)]+1/[(s+1)(s+2)])$: decomposing '
      + '$(1/[(s+1)^2(s+2)]=A/(s+1)+B/(s+1)^2+C/(s+2))$ requires the REPEATED-root form '
      + '(multiple terms per power), giving $(C=1,B=1,A=-1)$; combined with '
      + '$(1/[(s+1)(s+2)]=-1/(s+1)+1/(s+2))$, the sum is $(Y=-2/(s+1)+1/(s+1)^2+2/(s+2))$, '
      + 'inverting to $(y(t)=-2e^{-t}+te^{-t}+2e^{-2t})$. If the numerator degree is $(\\ge)$ '
      + 'denominator degree, polynomial long division must happen FIRST — never assumed away.\n\n'
      + 'CONVOLUTION IS NEVER THE SAME AS THE POINTWISE PRODUCT: '
      + '$(\\mathcal{L}^{-1}\\{F(s)G(s)\\}\\ne f(t)g(t))$ — the correct inverse is the '
      + 'CONVOLUTION $((f*g)(t)=\\int_0^tf(\\tau)g(t-\\tau)d\\tau)$. For '
      + '$(\\mathcal{L}^{-1}\\{1/[s(s+1)]\\})$: the convolution gives '
      + '$(\\int_0^t1\\cdot e^{-(t-\\tau)}d\\tau=1-e^{-t})$ — checking the pointwise product '
      + 'instead ($(1\\cdot e^{-t}=e^{-t})$) gives a genuinely WRONG answer. Because '
      + '$(\\mathcal{L})$ is LINEAR ($(\\mathcal{L}\\{f+g\\}=F+G)$) but NEVER multiplicative '
      + '($(\\mathcal{L}\\{fg\\}\\ne FG)$ in general), the multiplication-in-s rule specifically '
      + 'corresponds to convolution in t, never a pointwise product.',
    targetedMisconceptions: [`${LAPLACE_ODE}:MC-1`, `${LAPLACE_ODE}:MC-2`, `${LAPLACE_ODE}:MC-3`],
    source: eb(LAPLACE_ODE, 'Core Understanding — initial conditions being encoded at the transform step never applied as free constants at the end, partial fractions needing to be checked for proper degree and correct root-type form never applied naively, and convolution never being the same as the pointwise product'),
  },
  {
    conceptId: CHAOS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'CHAOS IS DETERMINISTIC — NEVER RANDOM: the SAME initial condition ALWAYS produces the '
      + 'IDENTICAL trajectory in a chaotic system. Integrating the Lorenz system from '
      + '$(x_0=(1,1,1))$ gives a specific, REPRODUCIBLE trajectory every time. The apparent '
      + '"unpredictability" comes from EXPONENTIAL SENSITIVITY to initial conditions: a '
      + 'measurement error $(\\epsilon_0)$ grows as $(\\epsilon_0e^{\\lambda_1t})$, eventually '
      + 'exceeding the attractor\'s scale L at '
      + '$(t_{predict}\\approx\\frac1{\\lambda_1}\\ln(L/\\epsilon_0))$ — at that point '
      + 'prediction becomes useless, but the underlying trajectory remains completely '
      + 'deterministic, never stochastic.\n\n'
      + 'THE LYAPUNOV EXPONENT IS A TIME-AVERAGED ASYMPTOTIC RATE — NEVER AN INSTANTANEOUS '
      + 'CONSTANT: '
      + '$(\\lambda_1=\\lim_{t\\to\\infty}\\frac1t\\ln(|\\delta x(t)|/|\\delta x(0)|))$ involves '
      + 'a LIMIT over INFINITE time. Along a strange attractor, the LOCAL expansion rate '
      + 'fluctuates enormously — trajectories alternate between locally CONTRACTING (spiraling '
      + 'inward) and locally EXPANDING (shooting outward) directions. Only the infinite-time '
      + 'AVERAGE gives $(\\lambda_1)$; the formula '
      + '$(|\\delta x(t)|\\approx|\\delta x(0)|e^{\\lambda_1t})$ is valid only ON AVERAGE over '
      + 'long times, never at each individual moment.\n\n'
      + 'CHAOS REQUIRES NEITHER LARGE NOR COMPLEX SYSTEMS — MINIMAL SYSTEMS SUFFICE: the Lorenz '
      + 'system has ONLY 3 variables and 3 parameters; the logistic map has ONLY 1 variable and '
      + '1 parameter — among the simplest dynamical systems in existence, yet both exhibit '
      + 'genuine chaos. Chaos requires: (1) NONLINEARITY (no chaos in linear systems, regardless '
      + 'of size), and (2) sufficient dimension ($(\\ge3)$ for a continuous-time autonomous ODE, '
      + "by Poincaré-Bendixson — a 2D autonomous ODE's bounded trajectories can only settle into "
      + 'limit cycles or equilibria, never chaos). A 10-billion-variable LINEAR system has no '
      + 'chaos; a 3-variable system with one quadratic term genuinely can.',
    targetedMisconceptions: [`${CHAOS}:MC-1`, `${CHAOS}:MC-2`, `${CHAOS}:MC-3`],
    source: eb(CHAOS, 'Core Understanding — chaos being deterministic never random, the Lyapunov exponent being a time-averaged asymptotic rate never an instantaneous constant, and chaos requiring neither large nor complex systems since minimal systems suffice'),
  },
]

export const MATHEMATICS_DE_POISSON_EQUATION_LAPLACE_ODE_CHAOS_PROBES: SeedProbe[] = [
  {
    conceptId: POISSON_EQUATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does the mean value property (or the maximum principle) automatically hold for any function satisfying Poisson\'s Equation, the same way it holds for harmonic functions?',
    choices: [
      { text: "No — for u=x², ∇²u=2 (a Poisson solution with source f=2); the mean value property gives r²/2 at radius r but u(0,0)=0, so it GENUINELY FAILS; these special properties are special consequences of the homogeneous f≡0 case, never automatically inherited whenever ∇²u is merely computed", isCorrect: true },
      { text: "Yes, Laplace's special properties (mean value property, maximum principle) automatically extend unchanged to Poisson's Equation", isCorrect: false, misconceptionId: `${POISSON_EQUATION}:MC-1` },
      { text: "Since Poisson's Equation and Laplace's Equation look almost identical, their special structural properties should transfer too", isCorrect: false, misconceptionId: `${POISSON_EQUATION}:MC-1` },
    ],
    targetedMisconceptions: [`${POISSON_EQUATION}:MC-1`],
    source: eb(POISSON_EQUATION, 'Discovery Question 1 as a detection probe (verbatim) — whether the mean value property automatically holds for a Poisson-equation solution, an answer of "yes" confirming LAPLACE-PROPERTIES-ASSUMED-TO-EXTEND'),
  },
  {
    conceptId: POISSON_EQUATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "Are Poisson's Equation and Laplace's Equation essentially unrelated equations requiring completely separate theory?",
    choices: [
      { text: "No — the electrostatic potential satisfies ∇²V=-ρ/ε₀; in a charge-free region (ρ=0), this reduces EXACTLY to Laplace's Equation ∇²V=0; Laplace's Equation is not a different topic, it's Poisson's Equation with its source term set to zero", isCorrect: true },
      { text: "Yes, Poisson's Equation and Laplace's Equation require entirely separate, unrelated theory", isCorrect: false, misconceptionId: `${POISSON_EQUATION}:MC-2` },
      { text: "Since the two equations are often taught as distinct named equations, they must represent genuinely independent theories", isCorrect: false, misconceptionId: `${POISSON_EQUATION}:MC-2` },
    ],
    targetedMisconceptions: [`${POISSON_EQUATION}:MC-2`],
    source: eb(POISSON_EQUATION, 'Discovery Question 2 as a detection probe (verbatim) — whether Poisson\'s and Laplace\'s Equations are essentially unrelated, an answer of "yes, unrelated" confirming POISSON-AND-LAPLACE-ASSUMED-UNRELATED'),
  },
  {
    conceptId: POISSON_EQUATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Are Green's functions just a convenient way to write down the answer to Poisson's Equation, rather than representing a distinct solution strategy?",
    choices: [
      { text: "They represent a distinct strategy — solving ∇²u=f proceeds by first solving the SIMPLER problem ∇²G=δ (a single point source), then building the full solution by SUPERPOSING shifted, weighted copies of G — a genuinely different construction than direct separation of variables", isCorrect: true },
      { text: "Green's functions are just a convenient notation for writing the answer, without representing any specific solution strategy", isCorrect: false, misconceptionId: `${POISSON_EQUATION}:MC-3` },
      { text: "The formal integral notation of a Green's function is simply a shorthand for an answer obtainable some other way", isCorrect: false, misconceptionId: `${POISSON_EQUATION}:MC-3` },
    ],
    targetedMisconceptions: [`${POISSON_EQUATION}:MC-3`],
    source: eb(POISSON_EQUATION, 'Discovery Question 3 as a detection probe (verbatim) — whether Green\'s functions are merely notational or represent a distinct solution strategy, an answer of "just notation" confirming GREENS-FUNCTIONS-ASSUMED-MERELY-NOTATIONAL'),
  },
  {
    conceptId: LAPLACE_ODE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "When you transform y'', do the initial conditions appear immediately, or do you apply them later like free constants?",
    choices: [
      { text: "They appear immediately — for y''+4y=0,y(0)=2,y'(0)=0, transforming gives s²Y-2s+4Y=0, so Y=2s/(s²+4); there are NO free constants C1,C2 in this method, since the ICs are ALREADY baked into Y(s) algebraically the moment the derivatives are transformed", isCorrect: true },
      { text: "The initial conditions are applied later, like free constants, at the end of the Laplace method", isCorrect: false, misconceptionId: `${LAPLACE_ODE}:MC-1` },
      { text: "The general-solution-plus-ICs-at-the-end pattern from ordinary ODE solving applies the same way to the Laplace transform method", isCorrect: false, misconceptionId: `${LAPLACE_ODE}:MC-1` },
    ],
    targetedMisconceptions: [`${LAPLACE_ODE}:MC-1`],
    source: eb(LAPLACE_ODE, 'Discovery Question 1 as a detection probe (verbatim) — whether initial conditions appear immediately or are applied later like free constants, an answer of "applied later" confirming INITIAL-CONDITIONS-IGNORED-UNTIL-END'),
  },
  {
    conceptId: LAPLACE_ODE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Before decomposing Y(s) by partial fractions, have you checked whether it\'s a proper fraction and identified any repeated or complex roots?',
    choices: [
      { text: "Yes, this must be checked — for Y(s)=1/[(s+1)²(s+2)]+1/[(s+1)(s+2)], the repeated root at s=-1 requires the form A/(s+1)+B/(s+1)²+C/(s+2), not the simple-root form; if numerator degree ≥ denominator degree, polynomial long division must happen FIRST", isCorrect: true },
      { text: "Partial-fraction decomposition can be written directly without checking proper-fraction status or root type", isCorrect: false, misconceptionId: `${LAPLACE_ODE}:MC-2` },
      { text: "Calculus-style partial fractions always apply the same simple-root form regardless of repeated or complex roots", isCorrect: false, misconceptionId: `${LAPLACE_ODE}:MC-2` },
    ],
    targetedMisconceptions: [`${LAPLACE_ODE}:MC-2`],
    source: eb(LAPLACE_ODE, 'Discovery Question 2 as a detection probe (verbatim) — whether Y(s) must be checked for proper-fraction status and root type before decomposing, an answer skipping this confirming PARTIAL-FRACTIONS-DEGREE-ERROR'),
  },
  {
    conceptId: LAPLACE_ODE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the inverse Laplace transform of F(s)G(s) the pointwise product f(t)g(t), or the convolution (f*g)(t)?',
    choices: [
      { text: "The convolution — for L⁻¹{1/[s(s+1)]}, the convolution gives ∫₀ᵗ 1·e^-(t-τ)dτ = 1-e^-t, while checking the pointwise product instead (1·e^-t = e^-t) gives a genuinely WRONG answer; L is linear but never multiplicative", isCorrect: true },
      { text: 'The inverse Laplace transform of F(s)G(s) is the pointwise product f(t)g(t)', isCorrect: false, misconceptionId: `${LAPLACE_ODE}:MC-3` },
      { text: "Since Laplace transforms are linear, multiplying two transforms should correspond symmetrically to multiplying the original functions pointwise", isCorrect: false, misconceptionId: `${LAPLACE_ODE}:MC-3` },
    ],
    targetedMisconceptions: [`${LAPLACE_ODE}:MC-3`],
    source: eb(LAPLACE_ODE, 'Discovery Question 3 as a detection probe (verbatim) — whether the inverse of F(s)G(s) is the pointwise product or the convolution, an answer of "pointwise product" confirming CONVOLUTION-CONFUSED-WITH-PRODUCT'),
  },
  {
    conceptId: CHAOS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If a chaotic system is deterministic, why does it seem unpredictable?',
    choices: [
      { text: "Because of exponential sensitivity to initial conditions — the SAME initial condition ALWAYS produces the IDENTICAL trajectory (fully reproducible), but a tiny measurement error ε₀ grows as ε₀e^(λ1t), eventually exceeding the attractor's scale and making prediction useless, though the trajectory itself remains completely deterministic", isCorrect: true },
      { text: "A chaotic system seems unpredictable because it is actually random, not truly deterministic", isCorrect: false, misconceptionId: `${CHAOS}:MC-1` },
      { text: "Chaotic systems are unpredictable in the same sense that a fair coin flip is unpredictable, since both involve genuine randomness", isCorrect: false, misconceptionId: `${CHAOS}:MC-1` },
    ],
    targetedMisconceptions: [`${CHAOS}:MC-1`],
    source: eb(CHAOS, 'Discovery Question 1 as a detection probe (verbatim) — why a deterministic chaotic system seems unpredictable, an answer conflating chaos with randomness confirming CHAOS-MEANS-RANDOM'),
  },
  {
    conceptId: CHAOS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the Lyapunov exponent describe a constant, instantaneous rate of divergence, or a time-averaged asymptotic rate?',
    choices: [
      { text: "A time-averaged asymptotic rate — λ1 = lim(t→∞) (1/t)ln(|δx(t)|/|δx(0)|) involves a LIMIT over INFINITE time; the LOCAL expansion rate fluctuates enormously along a strange attractor, and only the infinite-time AVERAGE gives λ1", isCorrect: true },
      { text: "The Lyapunov exponent describes a constant, instantaneous rate of divergence at every moment", isCorrect: false, misconceptionId: `${CHAOS}:MC-2` },
      { text: "Since the formula |δx(t)|≈|δx(0)|e^(λ1t) is often quoted as 'diverges exponentially', λ1 must represent a fixed constant rate throughout", isCorrect: false, misconceptionId: `${CHAOS}:MC-2` },
    ],
    targetedMisconceptions: [`${CHAOS}:MC-2`],
    source: eb(CHAOS, 'Discovery Question 2 as a detection probe (verbatim) — whether the Lyapunov exponent is a constant instantaneous rate or a time-averaged asymptotic rate, an answer of "constant instantaneous rate" confirming LYAPUNOV-EXPONENT-MEASURES-DIVERGENCE-SPEED'),
  },
  {
    conceptId: CHAOS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does chaos require a large, complex system with many variables, or can a simple 3-variable system exhibit it?',
    choices: [
      { text: "A simple system can exhibit it — the Lorenz system has ONLY 3 variables and the logistic map ONLY 1 variable, yet both exhibit genuine chaos; chaos requires nonlinearity and sufficient dimension (≥3 for a continuous-time autonomous ODE), never size or complexity", isCorrect: true },
      { text: "Chaos requires a large, complex system with many degrees of freedom, not a simple 3-variable or discrete-map system", isCorrect: false, misconceptionId: `${CHAOS}:MC-3` },
      { text: "Since chaos is popularly associated with weather and turbulence's many degrees of freedom, only large systems can genuinely be chaotic", isCorrect: false, misconceptionId: `${CHAOS}:MC-3` },
    ],
    targetedMisconceptions: [`${CHAOS}:MC-3`],
    source: eb(CHAOS, 'Discovery Question 3 as a detection probe (verbatim) — whether chaos requires a large complex system or a simple 3-variable system can exhibit it, an answer requiring a large system confirming CHAOS-REQUIRES-LARGE-SYSTEMS'),
  },
]
