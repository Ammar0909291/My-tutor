/**
 * Batch: pde, nonlinear-ode, laplace-transform (math.de).
 *
 * Fresh Phase 0 frontier recompute after the fourier-series/stability-
 * analysis/sturm-liouville batch found 10 ready concepts (eigenfunction-
 * expansion, fourier-convergence, fourier-sine-cosine, fourier-transform,
 * frobenius-method, laplace-transform, legendre-equation, nonlinear-ode,
 * pde, systems-matrix-method). Selects pde (opens the separation-of-
 * variables-pde -> heat-equation/wave-equation/laplace-equation ->
 * poisson-equation/harmonic-functions/greens-function chain), nonlinear-ode
 * (closes stability-analysis's declared unlock, opens bifurcation ->
 * chaos), and laplace-transform (opens laplace-properties -> inverse-
 * laplace -> laplace-ode, and convolution-theorem) as the three highest-
 * leverage picks. Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.de.{pde,nonlinear-ode,
 * laplace-transform}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, continuing math.de's established
 * domain baseline.
 *
 *   PDE  A PDE is NEVER confused with a system of several ODEs — it is one
 *           unknown function of multiple variables requiring partial
 *           derivatives, never several functions each of one variable; the
 *           discriminant B^2-4AC classification NEVER follows from an
 *           equation's superficial appearance — A, B, C must be carefully
 *           identified term by term even when the equation isn't in
 *           canonical form; and the elliptic/parabolic/hyperbolic
 *           classification is NEVER a purely formal label — it corresponds
 *           to genuinely different physical behavior (smoothing versus
 *           propagating versus equilibrium).
 *   NONLINEAR-ODE  A nonlinear system's equilibria are NEVER assumed unique
 *           like a linear system's origin — solving f(x*)=0 completely can
 *           reveal zero, one, or infinitely many; a linear center (purely
 *           imaginary eigenvalues) is NEVER treated as reliable for the
 *           nonlinear system the way a hyperbolic equilibrium is — the
 *           nonlinear terms alone determine whether it's a true center or a
 *           stable/unstable spiral; and "nonlinear" NEVER automatically
 *           means unsolvable or no complete analysis possible — many exact
 *           techniques still apply, and phase-portrait analysis gives an
 *           exhaustive qualitative picture even without one.
 *   LAPLACE-TRANSFORM  The Laplace transform is NEVER a new kind of object —
 *           it is a Type I improper integral applied to a specific,
 *           purposeful integrand; the derivative rule's -f(0) term is NEVER
 *           optional — it is exactly the boundary term at t=0 from
 *           integration by parts and the entire reason the transform
 *           converts differentiation into algebraic multiplication; and
 *           convergence is NEVER universal — it depends on the specific
 *           function's growth rate, holding only for s above a function-
 *           specific threshold.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const PDE = 'math.de.pde'
const NONLINEAR_ODE = 'math.de.nonlinear-ode'
const LAPLACE_TRANSFORM = 'math.de.laplace-transform'

export const MATHEMATICS_DE_PDE_NONLINEAR_ODE_LAPLACE_TRANSFORM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PDE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A PDE HAS ONE UNKNOWN FUNCTION OF MULTIPLE VARIABLES — NEVER CONFUSED WITH A SYSTEM OF '
      + 'SEVERAL ODEs: the heat equation $(u_t=u_{xx})$ describes temperature $(u(x,t))$ '
      + 'depending on BOTH position and time — ONE unknown function, TWO independent variables, '
      + 'requiring PARTIAL derivatives (holding the other variable fixed). Contrast a coupled ODE '
      + "system like $(y_1'=y_2,y_2'=-y_1)$: TWO unknown functions, each of ONE variable t, using "
      + 'ORDINARY derivatives — a structurally DIFFERENT object, even though both involve "more '
      + 'than one derivative relationship."\n\n'
      + 'THE DISCRIMINANT B^2-4AC CLASSIFIES A LINEAR SECOND-ORDER PDE — REQUIRING CAREFUL '
      + "IDENTIFICATION OF A, B, C, NEVER ASSUMED FROM THE EQUATION'S SUPERFICIAL APPEARANCE: for "
      + 'Laplace\'s equation $(u_{xx}+u_{yy}=0)$: $(A=1,B=0,C=1)$, discriminant $(=-4<0)$ — '
      + 'ELLIPTIC. For the heat equation $(u_{xx}-u_t=0)$: $(A=1,B=0,C=0)$ (no $(u_{tt})$ term at '
      + 'all), discriminant $(=0)$ — PARABOLIC. For the wave equation $(u_{tt}-u_{xx}=0)$: '
      + '$(A=-1)$ (coefficient of $(u_{xx})$), $(B=0)$, $(C=1)$ (coefficient of $(u_{tt})$), '
      + 'discriminant $(=4>0)$ — HYPERBOLIC. Matching a given equation\'s terms to A, B, C '
      + 'carefully, term by term, is required whenever the equation isn\'t already in the exact '
      + 'canonical $(Au_{xx}+Bu_{xy}+Cu_{yy})$ form.\n\n'
      + 'CLASSIFICATION CORRESPONDS TO GENUINELY DIFFERENT PHYSICAL BEHAVIOR — NEVER A PURELY '
      + 'FORMAL LABEL: the heat equation (parabolic) models a rod with a sharp initial '
      + 'temperature spike SMOOTHING OUT over time into a bell-curve profile with no sharp '
      + "features remaining. The wave equation (hyperbolic) models a plucked guitar string's "
      + 'sharp initial kink PERSISTING and traveling at a fixed speed, rather than smoothing '
      + 'away. Two second-order PDEs, one erasing sharp features and one preserving and '
      + 'propagating them — a direct STRUCTURAL consequence of their classification, never a '
      + 'coincidence of the specific equations chosen. Elliptic equations (Laplace\'s) describe '
      + 'EQUILIBRIUM/steady-state phenomena with no time variable at all.',
    targetedMisconceptions: [`${PDE}:MC-1`, `${PDE}:MC-2`, `${PDE}:MC-3`],
    source: eb(PDE, 'Core Understanding — a PDE having one unknown function of multiple variables never confused with a system of several ODEs, the discriminant classifying a linear second-order PDE requiring careful identification of A B C never assumed from superficial appearance, and classification corresponding to genuinely different physical behavior never a purely formal label'),
  },
  {
    conceptId: NONLINEAR_ODE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "A NONLINEAR SYSTEM CAN HAVE ZERO, ONE, OR MANY EQUILIBRIA — NEVER ASSUME UNIQUENESS LIKE "
      + "A LINEAR SYSTEM'S ORIGIN: for the pendulum $(x'=y,y'=-\\sin x)$: $(f=0)$ requires "
      + '$(y=0)$ AND $(\\sin x=0)$, giving $(x^*=(n\\pi,0))$ for EVERY integer n — infinitely '
      + 'many equilibria. Linear constant-coefficient systems have only the origin; nonlinear '
      + 'systems can have zero, one, or arbitrarily many, DEPENDING entirely on the shape of f — '
      + 'checking only $(x^*=0)$ misses this entirely.\n\n'
      + 'A LINEAR CENTER IS INCONCLUSIVE FOR THE NONLINEAR SYSTEM — NEVER TREATED AS RELIABLE '
      + 'LIKE A NODE OR SADDLE: by Hartman-Grobman, HYPERBOLIC equilibria (no eigenvalue with '
      + "zero real part) are reliably classified by the Jacobian's eigenvalues — nodes, saddles, "
      + 'and spirals genuinely match the linearization. But for PURELY IMAGINARY eigenvalues (a '
      + 'linear center): $(\\dot x=-y+x^3,\\dot y=x+y^3)$ and $(\\dot x=-y-x^3,\\dot y=x-y^3)$ '
      + 'BOTH have the identical Jacobian $(\\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix})$ (a '
      + 'center) — yet the FIRST is an unstable spiral (energy grows as $(r^4)$) and the SECOND '
      + 'is a stable spiral. The nonlinear terms alone determine the true behavior; resolving '
      + 'this needs a conserved quantity or a Lyapunov function, never linearization alone.\n\n'
      + '"NONLINEAR" NEVER MEANS "UNSOLVABLE" OR "NO COMPLETE ANALYSIS POSSIBLE": many nonlinear '
      + 'ODEs (separable, Bernoulli, exact, homogeneous-substitution) have genuine EXACT '
      + 'solutions. Even without an exact formula, the PHASE PORTRAIT (nullclines, equilibrium '
      + 'classification, Poincaré-Bendixson) gives a COMPLETE qualitative picture for 2D systems '
      + '— is a trajectory drawn to an equilibrium, a limit cycle, or escaping to infinity? This '
      + 'is EXHAUSTIVE information for 2D, never merely an approximation.',
    targetedMisconceptions: [`${NONLINEAR_ODE}:MC-1`, `${NONLINEAR_ODE}:MC-2`, `${NONLINEAR_ODE}:MC-3`],
    source: eb(NONLINEAR_ODE, 'Core Understanding — a nonlinear system having zero one or many equilibria never assumed unique like a linear system\'s origin, a linear center being inconclusive for the nonlinear system never treated as reliable like a node or saddle, and "nonlinear" never meaning unsolvable or no complete analysis possible'),
  },
  {
    conceptId: LAPLACE_TRANSFORM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE LAPLACE TRANSFORM IS A TYPE I IMPROPER INTEGRAL — NOTHING NEW ABOUT THE DEFINITION: '
      + 'for $(\\mathcal{L}\\{e^{at}\\}(s)=\\int_0^\\infty e^{-(s-a)t}\\,dt)$: computing the '
      + 'proper integral to a cutoff T then taking $(T\\to\\infty)$ (exactly the Type I '
      + 'procedure): $(\\frac{1}{s-a}(1-e^{-(s-a)T})\\to\\frac{1}{s-a})$ WHEN $(s>a)$ (so '
      + '$(e^{-(s-a)T}\\to0)$). This is the identical machinery already known for improper '
      + 'integrals, applied to a specific, extremely useful integrand.\n\n'
      + 'THE DERIVATIVE RULE IS THE ENTIRE POINT — THE -f(0) TERM IS NEVER OPTIONAL: applying '
      + 'integration by parts with $(u=e^{-st},dv=f\'(t)dt)$: '
      + '$(\\mathcal{L}\\{f\'\\}(s)=[e^{-st}f(t)]_0^\\infty+s\\int_0^\\infty '
      + 'e^{-st}f(t)dt=(0-f(0))+sF(s)=sF(s)-f(0))$ — the boundary term at $(t=0)$ is EXACTLY '
      + 'where $(-f(0))$ comes from. Verified for $(f(t)=e^{at})$: direct computation gives '
      + '$(\\mathcal{L}\\{ae^{at}\\}=a/(s-a))$; the rule gives '
      + '$(s\\cdot\\frac{1}{s-a}-1=\\frac{a}{s-a})$ — matching exactly. This ONE fact — that '
      + 'differentiation becomes multiplication by s — is what converts a differential equation '
      + 'into an algebraic one.\n\n'
      + "CONVERGENCE IS NEVER UNIVERSAL — IT DEPENDS ON THE SPECIFIC FUNCTION'S GROWTH RATE: for "
      + '$(\\mathcal{L}\\{e^{5t}\\}(s)=1/(s-5))$: valid ONLY for $(s>5)$. At $(s\\le5)$: '
      + '$(e^{-(s-5)t})$ does NOT decay (the exponent is $(\\ge0)$), so the integral genuinely '
      + 'DIVERGES — "$(\\mathcal{L}\\{e^{10t}\\}(2))$" is MEANINGLESS, not simply a small or '
      + 'negative number. Different functions require different minimum s (the "abscissa of '
      + 'convergence") — there is no universal s that works for every f.',
    targetedMisconceptions: [`${LAPLACE_TRANSFORM}:MC-1`, `${LAPLACE_TRANSFORM}:MC-2`, `${LAPLACE_TRANSFORM}:MC-3`],
    source: eb(LAPLACE_TRANSFORM, 'Core Understanding — the Laplace transform being a Type I improper integral with nothing new about the definition, the derivative rule\'s -f(0) term never being optional as the entire point of the transform, and convergence never being universal since it depends on the specific function\'s growth rate'),
  },
]

export const MATHEMATICS_DE_PDE_NONLINEAR_ODE_LAPLACE_TRANSFORM_PROBES: SeedProbe[] = [
  {
    conceptId: PDE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "Is the heat equation ut=uxx a single PDE, or a system of several ODEs?",
    choices: [
      { text: 'A single PDE — u(x,t) is ONE unknown function depending on BOTH position and time, requiring PARTIAL derivatives; this is a structurally different object from a coupled ODE system like y1\'=y2,y2\'=-y1, which has TWO unknown functions each of ONE variable using ORDINARY derivatives', isCorrect: true },
      { text: "It is a system of several ODEs, since it involves more than one derivative relationship", isCorrect: false, misconceptionId: `${PDE}:MC-2` },
      { text: "Whether it counts as a PDE or an ODE system depends only on how many derivative terms appear in the equation", isCorrect: false, misconceptionId: `${PDE}:MC-2` },
    ],
    targetedMisconceptions: [`${PDE}:MC-2`],
    source: eb(PDE, 'Discovery Question 2 as a detection probe (verbatim) — whether the heat equation is a single PDE or a system of several ODEs, an answer of "system of ODEs" confirming PDE-CONFUSED-WITH-MULTIVARIABLE-ODE-SYSTEM'),
  },
  {
    conceptId: PDE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For the wave equation utt-uxx=0, what are A, B, and C in the discriminant formula, and are they read directly from the equation\'s superficial appearance?',
    choices: [
      { text: 'They require careful term-by-term matching — A=-1 (coefficient of uxx), B=0, C=1 (coefficient of utt), giving discriminant=4>0, HYPERBOLIC; this matching is required whenever the equation isn\'t already in the exact canonical form', isCorrect: true },
      { text: 'A, B, and C can be assumed directly from the equation\'s superficial appearance without careful term-by-term identification', isCorrect: false, misconceptionId: `${PDE}:MC-3` },
      { text: "Since the wave equation doesn't visually resemble the canonical template, its A, B, C values cannot be determined at all", isCorrect: false, misconceptionId: `${PDE}:MC-3` },
    ],
    targetedMisconceptions: [`${PDE}:MC-3`],
    source: eb(PDE, 'Discovery Question 3 as a detection probe (verbatim) — what A, B, C are in the discriminant formula for the wave equation, an answer assuming them from superficial appearance confirming DISCRIMINANT-COEFFICIENTS-MISIDENTIFIED'),
  },
  {
    conceptId: PDE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the elliptic/parabolic/hyperbolic classification just an algebraic label, or does it connect to how solutions actually behave?',
    choices: [
      { text: 'It connects to real behavior — the heat equation (parabolic) models a sharp temperature spike SMOOTHING OUT over time, while the wave equation (hyperbolic) models a sharp kink PERSISTING and traveling at fixed speed; this is a direct structural consequence of the classification, never a coincidence', isCorrect: true },
      { text: "The elliptic/parabolic/hyperbolic classification is just an algebraic label with no connection to actual solution behavior", isCorrect: false, misconceptionId: `${PDE}:MC-1` },
      { text: "The discriminant test is purely a pattern-matching exercise, disconnected from any physical meaning of the equation", isCorrect: false, misconceptionId: `${PDE}:MC-1` },
    ],
    targetedMisconceptions: [`${PDE}:MC-1`],
    source: eb(PDE, 'Discovery Question 1 as a detection probe (verbatim) — whether the PDE classification is just an algebraic label or connects to solution behavior, an answer of "just a label" confirming PDE-CLASSIFICATION-TREATED-AS-PURELY-FORMAL'),
  },
  {
    conceptId: NONLINEAR_ODE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does a nonlinear system have exactly one equilibrium, like a linear constant-coefficient system\'s origin, or could it have zero, one, or many?',
    choices: [
      { text: "It could have zero, one, or many — for the pendulum x'=y,y'=-sin x: f=0 requires y=0 AND sin x=0, giving x*=(nπ,0) for EVERY integer n, infinitely many equilibria, depending entirely on the shape of f", isCorrect: true },
      { text: 'A nonlinear system always has exactly one equilibrium, the same way a linear constant-coefficient system has only the origin', isCorrect: false, misconceptionId: `${NONLINEAR_ODE}:MC-3` },
      { text: "Checking x*=0 is sufficient to find a nonlinear system's equilibrium, since that's where linear systems' equilibria are located", isCorrect: false, misconceptionId: `${NONLINEAR_ODE}:MC-3` },
    ],
    targetedMisconceptions: [`${NONLINEAR_ODE}:MC-3`],
    source: eb(NONLINEAR_ODE, 'Discovery Question 1 as a detection probe (verbatim) — whether a nonlinear system has exactly one equilibrium or could have zero one or many, an answer of "exactly one" confirming EQUILIBRIUM-AT-ZERO-ONLY'),
  },
  {
    conceptId: NONLINEAR_ODE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "If linearization gives a center (purely imaginary eigenvalues), does that reliably tell you the nonlinear system's true behavior?",
    choices: [
      { text: "No — x'=-y+x³,y'=x+y³ and x'=-y-x³,y'=x-y³ have the IDENTICAL Jacobian (a center), yet the first is an unstable spiral and the second is a stable spiral; the nonlinear terms alone determine the true behavior, requiring a Lyapunov function or conserved quantity to resolve", isCorrect: true },
      { text: 'Yes, a linear center reliably tells you the nonlinear system\'s true behavior, the same way hyperbolic equilibria are reliably classified', isCorrect: false, misconceptionId: `${NONLINEAR_ODE}:MC-1` },
      { text: "Since Hartman-Grobman classifies hyperbolic equilibria reliably, the same reliability should extend to a linear center's classification", isCorrect: false, misconceptionId: `${NONLINEAR_ODE}:MC-1` },
    ],
    targetedMisconceptions: [`${NONLINEAR_ODE}:MC-1`],
    source: eb(NONLINEAR_ODE, 'Discovery Question 2 as a detection probe (verbatim) — whether a linear center reliably tells you the nonlinear system\'s true behavior, an answer of "yes" confirming LINEARISATION-ALWAYS-DETERMINES-NONLINEAR-BEHAVIOUR'),
  },
  {
    conceptId: NONLINEAR_ODE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Does 'nonlinear' automatically mean no exact solution exists and no complete analysis is possible?",
    choices: [
      { text: 'No — many nonlinear ODEs (separable, Bernoulli, exact, homogeneous-substitution) have genuine exact solutions, and even without one, the phase portrait (nullclines, equilibrium classification, Poincaré-Bendixson) gives a COMPLETE qualitative picture for 2D systems, exhaustive information never merely an approximation', isCorrect: true },
      { text: "Yes, 'nonlinear' automatically means no exact solution exists and no complete analysis is possible", isCorrect: false, misconceptionId: `${NONLINEAR_ODE}:MC-2` },
      { text: "Since nonlinear equations are generally hard, phase-portrait analysis is only a rough approximation rather than a complete picture", isCorrect: false, misconceptionId: `${NONLINEAR_ODE}:MC-2` },
    ],
    targetedMisconceptions: [`${NONLINEAR_ODE}:MC-2`],
    source: eb(NONLINEAR_ODE, 'Discovery Question 3 as a detection probe (verbatim) — whether "nonlinear" automatically means no exact solution or complete analysis is possible, an answer of "yes" confirming ALL-NONLINEAR-ODES-CANNOT-BE-SOLVED-EXACTLY'),
  },
  {
    conceptId: LAPLACE_TRANSFORM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Once you\'ve computed L{f}(s) = 1/(s-a) for some function f, is this formula valid for every value of s?',
    choices: [
      { text: "No — for L{e^5t}(s)=1/(s-5), valid ONLY for s>5; at s≤5, e^-(s-5)t does NOT decay, so the integral genuinely DIVERGES; \"L{e^10t}(2)\" is MEANINGLESS, not simply a small or negative number", isCorrect: true },
      { text: 'Yes, once a Laplace transform formula like 1/(s-a) is found, it is valid for every value of s', isCorrect: false, misconceptionId: `${LAPLACE_TRANSFORM}:MC-1` },
      { text: "Transform tables list the formula without a convergence condition because the formula is universally valid once derived", isCorrect: false, misconceptionId: `${LAPLACE_TRANSFORM}:MC-1` },
    ],
    targetedMisconceptions: [`${LAPLACE_TRANSFORM}:MC-1`],
    source: eb(LAPLACE_TRANSFORM, 'Discovery Question 1 as a detection probe (verbatim) — whether a computed transform formula is valid for every value of s, an answer of "yes" confirming LAPLACE-TRANSFORM-ASSUMED-UNIVERSALLY-DEFINED'),
  },
  {
    conceptId: LAPLACE_TRANSFORM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the derivative rule include a -f(0) term, or just sF(s)?',
    choices: [
      { text: "It includes -f(0) — applying integration by parts, the boundary term at t=0 is exactly where -f(0) comes from: L{f'}(s)=sF(s)-f(0); verified for f(t)=e^(at), the direct computation a/(s-a) matches s·1/(s-a)-1 exactly", isCorrect: true },
      { text: 'The derivative rule is just sF(s), without any -f(0) term', isCorrect: false, misconceptionId: `${LAPLACE_TRANSFORM}:MC-2` },
      { text: "The algebraic simplicity of sF(s) means the boundary term at t=0 can generally be dropped without affecting the result", isCorrect: false, misconceptionId: `${LAPLACE_TRANSFORM}:MC-2` },
    ],
    targetedMisconceptions: [`${LAPLACE_TRANSFORM}:MC-2`],
    source: eb(LAPLACE_TRANSFORM, 'Discovery Question 2 as a detection probe (verbatim) — whether the derivative rule includes a -f(0) term or just sF(s), an answer omitting -f(0) confirming DERIVATIVE-RULE-SIGN-OR-INITIAL-CONDITION-TERM-OMITTED'),
  },
  {
    conceptId: LAPLACE_TRANSFORM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'When computing a Laplace transform via integration by parts, does the choice of u and dv matter?',
    choices: [
      { text: 'Yes — a deliberate LIATE-style choice of u,dv (as already established for integration by parts) must be made; an undeliberate choice leads to a more complicated resulting integral, since the transform\'s integrand offers multiple superficially plausible options', isCorrect: true },
      { text: 'No, when computing a Laplace transform via integration by parts, any choice of u and dv works equally well', isCorrect: false, misconceptionId: `${LAPLACE_TRANSFORM}:MC-3` },
      { text: "The Laplace transform's integrand is simple enough that the choice of u and dv never affects how complicated the resulting integral becomes", isCorrect: false, misconceptionId: `${LAPLACE_TRANSFORM}:MC-3` },
    ],
    targetedMisconceptions: [`${LAPLACE_TRANSFORM}:MC-3`],
    source: eb(LAPLACE_TRANSFORM, 'Discovery Question 3 as a detection probe (verbatim) — whether the choice of u and dv matters when computing a Laplace transform via integration by parts, an answer of "no" confirming LAPLACE-TRANSFORM-COMPUTATION-ATTEMPTED-WITHOUT-VERIFYING-INTEGRATION-BY-PARTS-CHOICE'),
  },
]
