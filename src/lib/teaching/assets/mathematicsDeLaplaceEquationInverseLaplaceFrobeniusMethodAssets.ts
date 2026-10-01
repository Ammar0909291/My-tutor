/**
 * Batch: laplace-equation, inverse-laplace, frobenius-method (math.de).
 *
 * Fresh Phase 0 frontier recompute after the separation-of-variables-pde/
 * bifurcation/laplace-properties batch found 14 ready concepts (chaos,
 * convolution-theorem, eigenfunction-expansion, fourier-convergence,
 * fourier-sine-cosine, fourier-transform, frobenius-method, heat-equation,
 * inverse-laplace, laplace-equation, legendre-equation, pde-classification,
 * systems-matrix-method, wave-equation). Selects laplace-equation (opens
 * poisson-equation -> greens-function, and harmonic-functions), inverse-
 * laplace (opens laplace-ode), and frobenius-method (opens bessel-equation)
 * as the three highest-leverage picks. Transcribed from the frozen
 * Educational Brain entries at educational-brain/concepts/mathematics/
 * math.de.{laplace-equation,inverse-laplace,frobenius-method}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, continuing math.de's established
 * domain baseline.
 *
 *   LAPLACE-EQUATION  Laplace's equation NEVER describes an evolving
 *           process — it has no time variable and describes a settled
 *           spatial equilibrium; solving it on a rectangle NEVER produces
 *           the heat equation's decaying exponential — the second separated
 *           equation genuinely gives hyperbolic sine/cosine instead, since
 *           there is no time derivative to produce decay; and a harmonic
 *           function's interior value is NEVER unbounded by its boundary —
 *           the mean value property forbids an interior extreme exceeding
 *           the boundary's range.
 *   INVERSE-LAPLACE  Inverting F(s) is NEVER a new decomposition technique
 *           — it directly reuses partial-fraction decomposition, matching
 *           pieces against known transform pairs; summing individually-
 *           inverted pieces is NEVER in need of extra justification beyond
 *           linearity — linearity directly guarantees the sum recovers the
 *           correct f(t); and a repeated linear factor NEVER inverts to the
 *           same plain exponential pair as a simple factor — it requires
 *           the genuinely different te^(at)-type pair.
 *   FROBENIUS-METHOD  The Frobenius x^r factor is NEVER an unrelated
 *           technique from the ordinary series ansatz — it is a targeted
 *           fix for exactly where that ansatz fails at a singular point;
 *           the indicial equation is NEVER an afterthought derived after
 *           the coefficient recurrence — it must be derived FIRST, before
 *           any recurrence; and whether a logarithmic term is needed is
 *           NEVER determined by the roots' individual size — it is
 *           determined by their DIFFERENCE (integer, non-integer, or zero).
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const LAPLACE_EQUATION = 'math.de.laplace-equation'
const INVERSE_LAPLACE = 'math.de.inverse-laplace'
const FROBENIUS_METHOD = 'math.de.frobenius-method'

export const MATHEMATICS_DE_LAPLACE_EQUATION_INVERSE_LAPLACE_FROBENIUS_METHOD_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LAPLACE_EQUATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "LAPLACE'S EQUATION HAS NO TIME VARIABLE — IT DESCRIBES A SETTLED EQUILIBRIUM, NEVER AN "
      + 'EVOLVING PROCESS: $(u_{xx}+u_{yy}=0)$ describes the FINAL, unchanging steady-state '
      + 'temperature distribution on a plate (once heat has stopped flowing) or an electrostatic '
      + 'potential in a charge-free region — a purely spatial balance with no t anywhere. '
      + 'Contrast the heat equation ($(u_t=ku_{xx})$), which describes the PROCESS of getting '
      + "there; Laplace's Equation describes the destination itself, once reached. A function "
      + 'satisfying $(\\nabla^2u=0)$ is called HARMONIC.\n\n'
      + 'SOLVING ON A RECTANGLE REUSES THE SAME SEPARATION TECHNIQUE — WITH HYPERBOLIC, NOT '
      + 'EXPONENTIAL, SOLUTIONS: for $(u_{xx}+u_{yy}=0)$ on $(0\\le x\\le\\pi)$, '
      + '$(0\\le y\\le1)$ with $(u(0,y)=u(\\pi,y)=0)$, $(u(x,0)=0)$, $(u(x,1)=f(x))$: separating '
      + "$(u=X(x)Y(y))$ gives $(\\frac{X''}{X}=-\\frac{Y''}{Y}=-\\lambda)$. The TWO homogeneous "
      + "BCs apply to X: $(X''+\\lambda X=0)$, $(X(0)=X(\\pi)=0)$ — EXACTLY the same eigenvalue "
      + 'problem as the separation-of-variables technique\'s own worked example, giving '
      + '$(\\lambda_n=n^2)$, $(X_n=\\sin(nx))$. The Y-equation becomes $(Y\'\'-n^2Y=0)$ (note the '
      + 'SIGN — since it\'s $(-\\lambda)$ on that side), giving '
      + '$(Y_n(y)=A_n\\sinh(ny)+B_n\\cosh(ny))$ — HYPERBOLIC sine/cosine, NEVER the heat '
      + "equation's decaying exponential $(e^{-k\\lambda t})$, because there is no first-order "
      + 'time derivative here to produce decay. The full solution '
      + '$(u(x,y)=\\sum c_n\\sin(nx)\\sinh(ny))$ matches f(x) via the same Fourier sine series '
      + 'technique as before.\n\n'
      + 'THE MAXIMUM PRINCIPLE GUARANTEES INTERIOR VALUES ARE BOUNDED BY THE BOUNDARY — NEVER '
      + "UNBOUNDED INSIDE: the MEAN VALUE PROPERTY states a harmonic function's value at any "
      + 'point equals the AVERAGE of its values on any surrounding circle. A direct consequence: '
      + 'a harmonic function on a bounded region CANNOT attain its maximum or minimum at an '
      + 'INTERIOR point — extremes occur ONLY on the BOUNDARY. For a plate with edges at 100° and '
      + '0°: the interior temperature can NEVER exceed 100° nor drop below 0° anywhere inside — '
      + 'an interior "hot spot" exceeding every surrounding value would contradict the mean value '
      + 'property. Also NEVER assume $(\\nabla^2u=0)$ alone determines a unique solution — '
      + 'boundary conditions are still required to pin down ONE specific harmonic function from '
      + 'the whole family, exactly as with the heat and wave equations.',
    targetedMisconceptions: [`${LAPLACE_EQUATION}:MC-1`, `${LAPLACE_EQUATION}:MC-2`, `${LAPLACE_EQUATION}:MC-3`],
    source: eb(LAPLACE_EQUATION, "Core Understanding — Laplace's equation having no time variable never describing an evolving process, solving on a rectangle reusing the same separation technique with hyperbolic never exponential solutions, and the maximum principle guaranteeing interior values are bounded by the boundary never unbounded inside"),
  },
  {
    conceptId: INVERSE_LAPLACE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'INVERTING F(S) USES THE SAME PARTIAL-FRACTION DECOMPOSITION — NEVER A NEW TECHNIQUE: for '
      + '$(F(s)=\\frac{3s+1}{(s-1)(s+2)})$: the EXACT same cover-up method already known gives '
      + '$(A=\\left.\\frac{3s+1}{s+2}\\right|_{s=1}=4/3)$, '
      + '$(B=\\left.\\frac{3s+1}{s-1}\\right|_{s=-2}=5/3)$ — so '
      + '$(F(s)=\\frac{4/3}{s-1}+\\frac{5/3}{s+2})$. The KEY difference from the calculus '
      + 'use-case: each piece is now MATCHED against a transform pair, never integrated.\n\n'
      + 'INVERTING PIECE-BY-PIECE AND SUMMING IS DIRECTLY JUSTIFIED BY LINEARITY — NEVER '
      + 'REQUIRING EXTRA CHECKING: matching each piece against '
      + '$(\\mathcal{L}^{-1}\\{1/(s-a)\\}=e^{at})$: $(\\frac{4/3}{s-1}\\to\\frac43e^t)$, '
      + '$(\\frac{5/3}{s+2}\\to\\frac53e^{-2t})$. Combining via linearity: '
      + '$(f(t)=\\frac43e^t+\\frac53e^{-2t})$ — VERIFIED by forward-transforming back: '
      + '$(\\frac43\\cdot\\frac1{s-1}+\\frac53\\cdot\\frac1{s+2}=\\frac{3s+1}{(s-1)(s+2)}=F(s))$. '
      + 'Linearity DIRECTLY guarantees the summed pieces recover the correct f(t), never needing '
      + 'an unspecified additional check.\n\n'
      + 'A REPEATED LINEAR FACTOR MATCHES A GENUINELY DIFFERENT TE^(AT) PAIR — NEVER THE SAME '
      + 'E^(AT) PAIR: for $(F(s)=2/(s-3)^2)$: this is NOT $(2e^{3t})$ (a naive guess ignoring the '
      + 'squared denominator) — the correct pair is '
      + '$(\\mathcal{L}^{-1}\\{1/(s-a)^2\\}=te^{at})$, giving $(f(t)=2te^{3t})$. Verified: '
      + '$(\\mathcal{L}\\{2te^{3t}\\}(s)=2/(s-3)^2=F(s))$ — the repeated factor genuinely '
      + 'requires the DISTINCT power-of-t pattern, mirroring the $(e^{rx},xe^{rx})$ '
      + 'repeated-root pattern already familiar from characteristic-equation solutions.',
    targetedMisconceptions: [`${INVERSE_LAPLACE}:MC-1`, `${INVERSE_LAPLACE}:MC-2`, `${INVERSE_LAPLACE}:MC-3`],
    source: eb(INVERSE_LAPLACE, "Core Understanding — inverting F(s) using the same partial-fraction decomposition never a new technique, inverting piece-by-piece and summing being directly justified by linearity never requiring extra checking, and a repeated linear factor matching a genuinely different te^(at) pair never the same e^(at) pair"),
  },
  {
    conceptId: FROBENIUS_METHOD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "THE ORDINARY ANSATZ FAILS AT A SINGULAR POINT — FROBENIUS'S X^R FACTOR IS A TARGETED FIX, "
      + "NEVER AN UNRELATED TECHNIQUE: for $(x^2y''+xy'-y=0)$ (regular singular point at "
      + '$(x=0)$): the known solution $(y=x^{-1})$ is NOT representable as an ordinary power '
      + 'series $(\\sum a_nx^n)$ starting at $(a_0\\ne0)$ (it blows up at $(x=0)$) — the '
      + 'ordinary ansatz genuinely CANNOT capture this behavior. The Frobenius modification\'s '
      + 'extra factor $(x^r)$ (with r not necessarily a nonnegative integer) specifically '
      + 'accommodates such non-integer or negative power-law behavior.\n\n'
      + 'THE INDICIAL EQUATION IS DERIVED FIRST — DETERMINING R BEFORE ANY COEFFICIENT '
      + "RECURRENCE, NEVER AN AFTERTHOUGHT: substituting $(y=\\sum a_nx^{n+r})$ into "
      + "$(x^2y''+xy'-y=0)$ gives $(\\sum a_n[(n+r)^2-1]x^{n+r}=0)$. The LOWEST-order term "
      + '($(n=0)$, $(a_0\\ne0)$) forces $(r^2-1=0)$ — the INDICIAL equation, obtained with NO '
      + 'coefficient recurrence needed yet, giving $(r=\\pm1)$ — matching the already-known '
      + 'solutions $(y=x)$ ($(r=1)$) and $(y=x^{-1})$ ($(r=-1)$) exactly. Only AFTER r is '
      + 'determined does the rest of the substitution proceed to find coefficients.\n\n'
      + "THE ROOTS' DIFFERENCE — NEVER THEIR INDIVIDUAL SIZE — DETERMINES WHETHER A LOG TERM IS "
      + 'NEEDED: for $(r_1=1,r_2=-1)$: difference $(r_1-r_2=2)$, an INTEGER — placing this in '
      + 'the case where the second solution CAN require a logarithmic term $(Cy_1\\ln x)$ '
      + '(though in this particular instance it happens not to be needed). Contrast a '
      + 'hypothetical $(r_1=1.5,r_2=0.3)$ (difference $(1.2)$, non-integer): both roots '
      + 'AUTOMATICALLY give independent Frobenius series with NO risk of a log complication — '
      + 'confirming it is the DIFFERENCE (integer, non-integer, or zero) that classifies the '
      + 'case, never how large or small either root is individually.',
    targetedMisconceptions: [`${FROBENIUS_METHOD}:MC-1`, `${FROBENIUS_METHOD}:MC-2`, `${FROBENIUS_METHOD}:MC-3`],
    source: eb(FROBENIUS_METHOD, "Core Understanding — the ordinary ansatz failing at a singular point with Frobenius's x^r factor as a targeted fix never an unrelated technique, the indicial equation being derived first before any coefficient recurrence never an afterthought, and the roots' difference never their individual size determining whether a log term is needed"),
  },
]

export const MATHEMATICS_DE_LAPLACE_EQUATION_INVERSE_LAPLACE_FROBENIUS_METHOD_PROBES: SeedProbe[] = [
  {
    conceptId: LAPLACE_EQUATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "Does Laplace's Equation have a time variable — and what does that tell you about what kind of physical situation it describes?",
    choices: [
      { text: "No time variable — uxx+uyy=0 describes the FINAL, unchanging steady-state temperature distribution on a plate or an electrostatic potential in a charge-free region, a purely spatial balance; the heat equation ut=kuxx describes the PROCESS of getting there, Laplace's equation the destination itself", isCorrect: true },
      { text: "Laplace's Equation describes an evolving process over time, just like the heat equation", isCorrect: false, misconceptionId: `${LAPLACE_EQUATION}:MC-2` },
      { text: "The equation's structure doesn't distinguish between a settled equilibrium and a still-evolving process", isCorrect: false, misconceptionId: `${LAPLACE_EQUATION}:MC-2` },
    ],
    targetedMisconceptions: [`${LAPLACE_EQUATION}:MC-2`],
    source: eb(LAPLACE_EQUATION, 'Discovery Question 1 as a detection probe (verbatim) — whether Laplace\'s Equation has a time variable and what that implies, an answer describing it as an evolving process confirming LAPLACE-SEPARATION-CONFUSED-WITH-HEAT-EQUATION-SEPARATION'),
  },
  {
    conceptId: LAPLACE_EQUATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "When you separate variables for Laplace's Equation, does the second equation give a decaying exponential, like the heat equation, or something different?",
    choices: [
      { text: "Something different — the Y-equation becomes Y''-n²Y=0 (note the sign, since it's -λ on that side), giving Yn(y)=An sinh(ny)+Bn cosh(ny), HYPERBOLIC sine/cosine, never the heat equation's decaying exponential, because there is no first-order time derivative to produce decay", isCorrect: true },
      { text: "The second equation gives the same decaying exponential form as the heat equation's time solution", isCorrect: false, misconceptionId: `${LAPLACE_EQUATION}:MC-2` },
      { text: "Since the separation procedure looks identical at first, the second ODE's solution form should also be identical to the heat equation's", isCorrect: false, misconceptionId: `${LAPLACE_EQUATION}:MC-2` },
    ],
    targetedMisconceptions: [`${LAPLACE_EQUATION}:MC-2`],
    source: eb(LAPLACE_EQUATION, 'Discovery Question 2 as a detection probe (verbatim) — whether the second separated equation gives a decaying exponential like the heat equation or something different, an answer of "the same decaying exponential" confirming LAPLACE-SEPARATION-CONFUSED-WITH-HEAT-EQUATION-SEPARATION'),
  },
  {
    conceptId: LAPLACE_EQUATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Could a harmonic function's interior value exceed every value on its boundary?",
    choices: [
      { text: "No — the mean value property states a harmonic function's value at any point equals the AVERAGE of its surrounding values, so extremes occur ONLY on the boundary; for a plate with edges at 100° and 0°, the interior temperature can NEVER exceed 100° nor drop below 0° anywhere inside", isCorrect: true },
      { text: "Yes, a harmonic function's interior values could exceed the range of its boundary values", isCorrect: false, misconceptionId: `${LAPLACE_EQUATION}:MC-1` },
      { text: "Without the mean value property made explicit, there's no reason interior values couldn't exceed boundary extremes", isCorrect: false, misconceptionId: `${LAPLACE_EQUATION}:MC-1` },
    ],
    targetedMisconceptions: [`${LAPLACE_EQUATION}:MC-1`],
    source: eb(LAPLACE_EQUATION, 'Discovery Question 3 as a detection probe (verbatim) — whether a harmonic function\'s interior value could exceed every boundary value, an answer of "yes" confirming INTERIOR-HARMONIC-VALUE-ASSUMED-UNBOUNDED-BY-BOUNDARY'),
  },
  {
    conceptId: INVERSE_LAPLACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does inverting a Laplace transform require a new decomposition technique, or does it directly reuse partial fractions?',
    choices: [
      { text: "It directly reuses partial fractions — for F(s)=(3s+1)/((s-1)(s+2)), the EXACT same cover-up method gives A=4/3, B=5/3, so F(s)=(4/3)/(s-1)+(5/3)/(s+2); the only difference is each piece is matched against a transform pair, never integrated", isCorrect: true },
      { text: 'Inverting a Laplace transform requires a new decomposition technique specific to Laplace transforms', isCorrect: false, misconceptionId: `${INVERSE_LAPLACE}:MC-1` },
      { text: "The Laplace-transform context is specialized enough that it warrants its own new decomposition machinery", isCorrect: false, misconceptionId: `${INVERSE_LAPLACE}:MC-1` },
    ],
    targetedMisconceptions: [`${INVERSE_LAPLACE}:MC-1`],
    source: eb(INVERSE_LAPLACE, 'Discovery Question 1 as a detection probe (verbatim) — whether inverting a Laplace transform requires a new decomposition technique or directly reuses partial fractions, an answer of "a new technique" confirming INVERSE-LAPLACE-ASSUMED-NEW-DECOMPOSITION-TECHNIQUE'),
  },
  {
    conceptId: INVERSE_LAPLACE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'After inverting each decomposed piece, is it valid to simply sum the results, or does something additional need checking?',
    choices: [
      { text: "It is valid to simply sum — matching each piece against known pairs and combining via linearity directly gives f(t)=4/3 e^t + 5/3 e^-2t, VERIFIED by forward-transforming back to recover F(s) exactly; linearity DIRECTLY guarantees the summed pieces are correct", isCorrect: true },
      { text: 'Summing individually-inverted pieces requires additional checking beyond linearity, or is not generally valid', isCorrect: false, misconceptionId: `${INVERSE_LAPLACE}:MC-2` },
      { text: "Since the pieces were derived separately, combining them into one function needs an extra justification step beyond citing linearity", isCorrect: false, misconceptionId: `${INVERSE_LAPLACE}:MC-2` },
    ],
    targetedMisconceptions: [`${INVERSE_LAPLACE}:MC-2`],
    source: eb(INVERSE_LAPLACE, 'Discovery Question 2 as a detection probe (verbatim) — whether summing individually-inverted pieces is valid or needs additional checking, an answer requiring extra checking confirming PIECE-WISE-INVERSION-SUM-ASSUMED-TO-NEED-EXTRA-JUSTIFICATION'),
  },
  {
    conceptId: INVERSE_LAPLACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does 1/(s−a)² invert to the same e^(at) pair as 1/(s−a), or to a genuinely different function?',
    choices: [
      { text: "A genuinely different function — for F(s)=2/(s-3)², this is NOT 2e^3t (a naive guess ignoring the squared denominator); the correct pair is L⁻¹{1/(s-a)²}=te^(at), giving f(t)=2te^3t, verified by forward-transforming back to F(s)", isCorrect: true },
      { text: '1/(s−a)² inverts to the same e^(at) pair as 1/(s−a), just with a squared denominator', isCorrect: false, misconceptionId: `${INVERSE_LAPLACE}:MC-3` },
      { text: "The squared denominator is a minor variation that doesn't change the fundamental inverted function from the simple exponential pair", isCorrect: false, misconceptionId: `${INVERSE_LAPLACE}:MC-3` },
    ],
    targetedMisconceptions: [`${INVERSE_LAPLACE}:MC-3`],
    source: eb(INVERSE_LAPLACE, 'Discovery Question 3 as a detection probe (verbatim) — whether 1/(s-a)² inverts to the same pair as 1/(s-a) or a genuinely different function, an answer of "the same pair" confirming REPEATED-FACTOR-INVERSE-ASSUMED-SAME-AS-SIMPLE-FACTOR'),
  },
  {
    conceptId: FROBENIUS_METHOD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the Frobenius ansatz an entirely unrelated technique from the ordinary series ansatz, or a targeted modification of it?',
    choices: [
      { text: "A targeted modification — for x²y''+xy'-y=0, the known solution y=x⁻¹ cannot be represented as an ordinary power series (it blows up at x=0); the Frobenius x^r factor specifically accommodates such non-integer or negative power-law behavior, a targeted fix for exactly this failure", isCorrect: true },
      { text: 'The Frobenius ansatz is entirely unrelated to the ordinary series-solution ansatz', isCorrect: false, misconceptionId: `${FROBENIUS_METHOD}:MC-1` },
      { text: "The new x^r factor and indicial equation constitute an entirely separate apparatus from the ordinary method", isCorrect: false, misconceptionId: `${FROBENIUS_METHOD}:MC-1` },
    ],
    targetedMisconceptions: [`${FROBENIUS_METHOD}:MC-1`],
    source: eb(FROBENIUS_METHOD, 'Discovery Question 1 as a detection probe (verbatim) — whether the Frobenius ansatz is entirely unrelated or a targeted modification of the ordinary ansatz, an answer of "entirely unrelated" confirming FROBENIUS-ASSUMED-UNRELATED-TECHNIQUE'),
  },
  {
    conceptId: FROBENIUS_METHOD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the Frobenius method start with the same coefficient-recurrence derivation as the ordinary method, with the indicial equation as an afterthought?',
    choices: [
      { text: "No — the indicial equation is derived FIRST: substituting y=Σanx^(n+r) into x²y''+xy'-y=0, the LOWEST-order term forces r²-1=0 with NO coefficient recurrence needed yet, giving r=±1; only AFTER r is determined does the rest of the substitution find coefficients", isCorrect: true },
      { text: 'The Frobenius method starts with the same coefficient-recurrence derivation as the ordinary method, deriving the indicial equation only afterward', isCorrect: false, misconceptionId: `${FROBENIUS_METHOD}:MC-2` },
      { text: "The recurrence-first order familiar from the ordinary method also applies to the Frobenius method, with the indicial equation coming later", isCorrect: false, misconceptionId: `${FROBENIUS_METHOD}:MC-2` },
    ],
    targetedMisconceptions: [`${FROBENIUS_METHOD}:MC-2`],
    source: eb(FROBENIUS_METHOD, 'Discovery Question 2 as a detection probe (verbatim) — whether the Frobenius method derives the indicial equation first or as an afterthought after the recurrence, an answer treating it as an afterthought confirming INDICIAL-EQUATION-ASSUMED-AFTERTHOUGHT'),
  },
  {
    conceptId: FROBENIUS_METHOD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is whether a logarithmic term is needed determined by how large the roots are, or by their difference?',
    choices: [
      { text: "By their difference — for r1=1,r2=-1, difference r1-r2=2, an INTEGER, placing this in the case where a log term CAN be needed; a hypothetical r1=1.5,r2=0.3 (difference 1.2, non-integer) gives independent series with NO log risk — it's the DIFFERENCE, never either root's individual size", isCorrect: true },
      { text: 'Whether a logarithmic term is needed is determined by how large the roots are individually', isCorrect: false, misconceptionId: `${FROBENIUS_METHOD}:MC-3` },
      { text: "Larger roots are more likely to require a logarithmic term than smaller roots, regardless of their difference", isCorrect: false, misconceptionId: `${FROBENIUS_METHOD}:MC-3` },
    ],
    targetedMisconceptions: [`${FROBENIUS_METHOD}:MC-3`],
    source: eb(FROBENIUS_METHOD, 'Discovery Question 3 as a detection probe (verbatim) — whether a log term\'s need is determined by root size or root difference, an answer of "root size" confirming LOG-TERM-NEED-ASSUMED-DETERMINED-BY-ROOT-SIZE'),
  },
]
