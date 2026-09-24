/**
 * Batch: phase-plane, bvp, series-solution (math.de).
 *
 * Fresh Phase 0 frontier recompute after the slope-field/higher-order-ode/
 * systems-ode batch found 6 ready concepts (bvp, laplace-transform, pde,
 * phase-plane, series-solution, systems-matrix-method). Selects phase-plane
 * (closes slope-field's declared unlock target via systems-ode, opens the
 * stability-analysis/nonlinear-ode/bifurcation/chaos chain), bvp (opens the
 * sturm-liouville/fourier-series chain), and series-solution (opens the
 * frobenius-method/bessel-equation/legendre-equation chain) as the three
 * highest-leverage picks — each opens a genuinely new downstream sub-chain.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.de.{phase-plane,bvp,series-
 * solution}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, continuing math.de's established
 * domain baseline.
 *
 *   PHASE-PLANE  Constructing a phase portrait is NEVER a genuinely new
 *           procedure — it directly generalizes the slope-field construction
 *           to a vector-valued quantity; an equilibrium's type is NEVER
 *           determined by extensive direct plotting — it is read directly
 *           from the linearization's Jacobian eigenvalues; and examining
 *           each equation's own slope field separately NEVER reveals the
 *           same global structure as the full phase portrait — the coupling
 *           between variables is discarded by either frozen-variable view.
 *   BVP  A boundary value problem is NEVER guaranteed a unique solution the
 *           way an IVP is — the identical ODE can have no solution, a unique
 *           solution, or infinitely many depending purely on the boundary
 *           conditions; both boundary conditions must NEVER be applied
 *           sequentially — they must be set up and solved as a genuine
 *           simultaneous system; and an automatically-satisfied boundary
 *           condition is NEVER a sign of a computational error — it is the
 *           correct signature of the infinitely-many-solutions case.
 *   SERIES-SOLUTION  Coefficients in a power-series solution are NEVER
 *           guessed individually — they are derived via a systematic
 *           recurrence relation; sums must NEVER be coefficient-matched
 *           before re-indexing to a common power of x — matching before
 *           re-indexing produces an incorrect recurrence; and the method is
 *           NEVER applicable unchecked to any ODE — it requires the
 *           expansion point to be an ordinary point where P and Q are
 *           analytic, failing at a singular point.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const PHASE_PLANE = 'math.de.phase-plane'
const BVP = 'math.de.bvp'
const SERIES_SOLUTION = 'math.de.series-solution'

export const MATHEMATICS_DE_PHASE_PLANE_BVP_SERIES_SOLUTION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PHASE_PLANE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "THE PHASE PORTRAIT DIRECTLY GENERALIZES SLOPE-FIELD CONSTRUCTION — NEVER A GENUINELY NEW "
      + "PROCEDURE: for $(x'=y,y'=-x)$: evaluating the velocity vector $((f,g)=(y,-x))$ at "
      + '$((1,0))$: $((0,-1))$ (down); at $((0,1))$: $((1,0))$ (right); at $((-1,0))$: $((0,1))$ '
      + '(up); at $((0,-1))$: $((-1,0))$ (left) — revealing a CLOCKWISE rotation, via the SAME '
      + "grid-evaluation procedure slope-field construction established, now applied to a vector "
      + 'rather than a scalar.\n\n'
      + "EQUILIBRIUM TYPE IS READ DIRECTLY FROM THE LINEARIZATION'S EIGENVALUES — NEVER REQUIRING "
      + "EXTENSIVE PLOTTING: for $(x'=x-y,y'=x+y)$: the only equilibrium is $((0,0))$. Since the "
      + 'system is already linear, $(J=\\begin{pmatrix}1&-1\\\\1&1\\end{pmatrix})$ everywhere; '
      + 'solving $(\\det(J-\\lambda I)=(1-\\lambda)^2+1=0)$ gives $(\\lambda=1\\pm i)$ — COMPLEX '
      + 'with POSITIVE real part — IMMEDIATELY classifying the origin as an outward SPIRAL, with '
      + 'zero need to solve the system explicitly or plot extensive trajectories.\n\n'
      + 'PHASE-PLANE ANALYSIS REVEALS GLOBAL BEHAVIOR NEITHER SLOPE FIELD ALONE COULD SHOW — '
      + 'NEVER EQUIVALENT TO EXAMINING EACH EQUATION SEPARATELY: for a predator-prey-style system '
      + 'with a saddle at $((0,0))$ (extinction unstable) and a center or spiral at a positive '
      + '$((x^*,y^*))$: the FULL phase portrait reveals trajectories near $((0,0))$ repelled away '
      + 'while others ORBIT around $((x^*,y^*))$ — genuinely global structure invisible to either '
      + "the x-equation's slope field (with y frozen) or the y-equation's alone, since each "
      + "discards the OTHER variable's simultaneous evolution.",
    targetedMisconceptions: [`${PHASE_PLANE}:MC-1`, `${PHASE_PLANE}:MC-2`, `${PHASE_PLANE}:MC-3`],
    source: eb(PHASE_PLANE, "Core Understanding — the phase portrait directly generalizing slope-field construction never a genuinely new procedure, equilibrium type read directly from the linearization's eigenvalues never requiring extensive plotting, and phase-plane analysis revealing global behavior neither slope field alone could show"),
  },
  {
    conceptId: BVP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE SAME ODE CAN LAND IN ANY OF THREE OUTCOMES — NEVER GUARANTEED A UNIQUE SOLUTION LIKE '
      + "AN IVP: for $(y''+y=0)$ (general solution $(y=c_1\\cos x+c_2\\sin x)$) with THREE "
      + 'different boundary-condition pairs: $(y(0)=0,y(\\pi/2)=1)$ gives $(c_1=0,c_2=1)$ — a '
      + 'UNIQUE solution $(y=\\sin x)$. Changing only the second condition to $(y(\\pi)=1)$: '
      + '$(c_1=0)$ forces $(-c_1=1\\Rightarrow0=1)$ — a CONTRADICTION, NO solution exists. '
      + 'Changing it instead to $(y(\\pi)=0)$: $(-c_1=0)$ is automatically satisfied (since '
      + '$(c_1=0)$ already), leaving $(c_2)$ COMPLETELY FREE — INFINITELY MANY solutions '
      + '$(y=c_2\\sin x)$. The IDENTICAL ODE produces all three outcomes depending purely on '
      + 'where and what the boundary values are.\n\n'
      + 'BOTH BOUNDARY CONDITIONS MUST BE APPLIED AS A GENUINE SIMULTANEOUS SYSTEM — NEVER '
      + 'SEQUENTIALLY: substituting both conditions into the general solution produces a 2x2 '
      + 'linear system in $(c_1,c_2)$ — solving for one constant using only the first condition, '
      + 'then treating the second as an afterthought, risks missing either a genuine '
      + 'inconsistency (the contradiction case above) or a free parameter (the unconstrained '
      + '$(c_2)$ case above). The system must be set up and analyzed as a WHOLE.\n\n'
      + 'AN AUTOMATICALLY-SATISFIED CONDITION SIGNALS INFINITELY MANY SOLUTIONS — NEVER A '
      + 'COMPUTATIONAL ERROR: when substituting the second boundary condition produces an '
      + 'identity ($(0=0)$) rather than a genuine constraint on the remaining constant, this is '
      + 'the CORRECT signature of the infinitely-many-solutions case, not a sign that something '
      + 'went wrong in the algebra.',
    targetedMisconceptions: [`${BVP}:MC-1`, `${BVP}:MC-2`, `${BVP}:MC-3`],
    source: eb(BVP, 'Core Understanding — the same ODE landing in any of three outcomes never guaranteed a unique solution like an IVP, both boundary conditions needing to be applied as a genuine simultaneous system never sequentially, and an automatically-satisfied condition signaling infinitely many solutions never a computational error'),
  },
  {
    conceptId: SERIES_SOLUTION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "COEFFICIENTS MUST BE DERIVED VIA A SYSTEMATIC RECURRENCE — NEVER GUESSED INDIVIDUALLY: "
      + "for $(y''-y=0)$: substituting $(y=\\sum a_nx^n)$ and re-indexing the $(y'')$ sum via "
      + '$(m=n-2)$ gives BOTH sums over the SAME power $(x^m)$: '
      + '$(\\sum_m[(m+2)(m+1)a_{m+2}-a_m]x^m=0)$. Since this holds for EVERY m, the coefficient '
      + 'of each $(x^m)$ must vanish: $((m+2)(m+1)a_{m+2}=a_m)$ — the recurrence '
      + '$(a_{m+2}=a_m/[(m+2)(m+1)])$. Starting from FREE $(a_0,a_1)$: '
      + '$(a_2=a_0/2,a_3=a_1/6,a_4=a_0/24,\\ldots)$ — generating $(\\cosh x)$ and $(\\sinh x)$ '
      + 'exactly, matching the known $(C_1e^x+C_2e^{-x})$. No individual coefficient beyond '
      + '$(a_0,a_1)$ is ever guessed; each follows mechanically from the recurrence.\n\n'
      + 'RE-INDEXING TO A COMMON POWER OF X MUST HAPPEN BEFORE COEFFICIENTS CAN BE MATCHED — '
      + "NEVER SKIPPED: after substitution, $(y'')$'s sum and $(y)$'s sum have DIFFERENT index "
      + 'offsets. Attempting to match coefficients while the sums still run over different powers '
      + 'produces an incorrect recurrence. Only after shifting $(m=n-2)$ so both sums are '
      + 'expressed as series in $(x^m)$ can the "coefficient of $(x^m)$ must vanish" argument '
      + 'validly apply.\n\n'
      + 'THE METHOD REQUIRES X=0 TO BE AN ORDINARY POINT — NEVER APPLICABLE UNCHECKED TO ANY '
      + "ODE: for $(y''-y=0)$: $(P(x)=0,Q(x)=-1)$, both trivially analytic — an ordinary point, "
      + "method applies cleanly. Contrast $(x^2y''+xy'-y=0)$ (standard form "
      + "$(y''+\\frac1xy'-\\frac1{x^2}y=0)$): $(P(x)=1/x,Q(x)=-1/x^2)$ have a GENUINE "
      + 'singularity at $(x=0)$ — a SINGULAR point, where this direct method does NOT correctly '
      + 'capture the full solution space; the Frobenius method (beyond this scope) would be '
      + 'required instead.',
    targetedMisconceptions: [`${SERIES_SOLUTION}:MC-1`, `${SERIES_SOLUTION}:MC-2`, `${SERIES_SOLUTION}:MC-3`],
    source: eb(SERIES_SOLUTION, 'Core Understanding — coefficients derived via a systematic recurrence never guessed individually, re-indexing to a common power of x needing to happen before coefficients can be matched never skipped, and the method requiring an ordinary point never applicable unchecked to any ODE'),
  },
]

export const MATHEMATICS_DE_PHASE_PLANE_BVP_SERIES_SOLUTION_PROBES: SeedProbe[] = [
  {
    conceptId: PHASE_PLANE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is constructing a phase portrait a genuinely new procedure, or does it generalize slope-field construction to a vector-valued quantity?',
    choices: [
      { text: "It generalizes slope-field construction — for x'=y,y'=-x, evaluating the velocity vector (f,g)=(y,-x) at (1,0),(0,1),(-1,0),(0,-1) reveals a clockwise rotation via the SAME grid-evaluation procedure slope-field construction established, now applied to a vector rather than a scalar", isCorrect: true },
      { text: 'Constructing a phase portrait is a genuinely new procedure, unrelated to slope-field construction for single equations', isCorrect: false, misconceptionId: `${PHASE_PLANE}:MC-1` },
      { text: 'Moving from a single equation to a system of two requires an entirely different, categorically distinct method from slope fields', isCorrect: false, misconceptionId: `${PHASE_PLANE}:MC-1` },
    ],
    targetedMisconceptions: [`${PHASE_PLANE}:MC-1`],
    source: eb(PHASE_PLANE, 'Discovery Question 1 as a detection probe (verbatim) — whether constructing a phase portrait is a genuinely new procedure or generalizes slope-field construction, an answer of "genuinely new" confirming PHASE-PORTRAIT-ASSUMED-GENUINELY-NEW-PROCEDURE'),
  },
  {
    conceptId: PHASE_PLANE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "To classify an equilibrium's type, is extensive plotting of nearby trajectories necessary, or can the linearization's eigenvalues determine this directly?",
    choices: [
      { text: "The eigenvalues determine it directly — for x'=x-y,y'=x+y, the only equilibrium (0,0) has J=[[1,-1],[1,1]] everywhere, and solving det(J-λI)=(1-λ)²+1=0 gives λ=1±i, complex with positive real part, IMMEDIATELY classifying it as an outward spiral with zero plotting", isCorrect: true },
      { text: "Classifying an equilibrium's type requires extensive direct plotting of nearby trajectories", isCorrect: false, misconceptionId: `${PHASE_PLANE}:MC-2` },
      { text: "The visual, plotted nature of a phase portrait means plotting is the only reliable way to determine an equilibrium's behavior", isCorrect: false, misconceptionId: `${PHASE_PLANE}:MC-2` },
    ],
    targetedMisconceptions: [`${PHASE_PLANE}:MC-2`],
    source: eb(PHASE_PLANE, 'Discovery Question 2 as a detection probe (verbatim) — whether equilibrium classification requires extensive plotting or the eigenvalues determine it directly, an answer of "requires extensive plotting" confirming EQUILIBRIUM-CLASSIFICATION-ASSUMED-TO-REQUIRE-EXTENSIVE-PLOTTING'),
  },
  {
    conceptId: PHASE_PLANE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Would examining each equation's own slope field separately reveal the same global structure as the full phase portrait?",
    choices: [
      { text: "No — for a predator-prey-style system with a saddle at (0,0) and a center or spiral at (x*,y*), the FULL phase portrait reveals trajectories near (0,0) repelled away while others orbit (x*,y*), a global structure invisible to either frozen-variable slope field, since each discards the other variable's simultaneous evolution", isCorrect: true },
      { text: "Yes — examining each equation's own slope field separately reveals the same global qualitative structure as the full phase portrait", isCorrect: false, misconceptionId: `${PHASE_PLANE}:MC-3` },
      { text: "Each individual equation's slope field already carries its own complete picture of the coupled system's behavior", isCorrect: false, misconceptionId: `${PHASE_PLANE}:MC-3` },
    ],
    targetedMisconceptions: [`${PHASE_PLANE}:MC-3`],
    source: eb(PHASE_PLANE, 'Discovery Question 3 as a detection probe (verbatim) — whether separate slope fields reveal the same global structure as the full phase portrait, an answer of "yes" confirming SEPARATE-SLOPE-FIELDS-ASSUMED-EQUIVALENT-TO-PHASE-PORTRAIT'),
  },
  {
    conceptId: BVP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does a BVP for a nice second-order linear ODE always have a solution once you correctly solve for the constants?',
    choices: [
      { text: "No — for y''+y=0 with y(0)=0,y(π/2)=1: unique solution y=sin x. Changing only the second condition to y(π)=1: forces 0=1, a contradiction, NO solution. Changing it to y(π)=0: automatically satisfied, leaving c₂ free, INFINITELY MANY solutions. The identical ODE produces all three outcomes", isCorrect: true },
      { text: 'Yes, a BVP for a well-behaved second-order linear ODE always has a unique solution once correctly set up and solved, just like an IVP', isCorrect: false, misconceptionId: `${BVP}:MC-1` },
      { text: 'A BVP always behaves like an IVP with guaranteed uniqueness, since the underlying ODE and solving procedure are the same', isCorrect: false, misconceptionId: `${BVP}:MC-1` },
    ],
    targetedMisconceptions: [`${BVP}:MC-1`],
    source: eb(BVP, 'Discovery Question 1 as a detection probe (verbatim) — whether a BVP always has a unique solution once correctly solved, an answer of "yes, always unique" confirming BVP-ASSUMED-TO-ALWAYS-HAVE-UNIQUE-SOLUTION'),
  },
  {
    conceptId: BVP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'When solving a BVP, should you solve for one constant using the first condition alone, or set up both conditions as a system first?',
    choices: [
      { text: 'Set up both as a system first — substituting both conditions into the general solution produces a 2x2 linear system in c₁,c₂ that must be analyzed as a WHOLE, since solving sequentially risks missing either a genuine contradiction or a free parameter', isCorrect: true },
      { text: "It's fine to solve for one constant using the first boundary condition alone, then handle the second condition afterward", isCorrect: false, misconceptionId: `${BVP}:MC-2` },
      { text: 'Boundary conditions can always be applied one at a time in sequence, the same way initial conditions are applied to an IVP', isCorrect: false, misconceptionId: `${BVP}:MC-2` },
    ],
    targetedMisconceptions: [`${BVP}:MC-2`],
    source: eb(BVP, 'Discovery Question 2 as a detection probe (verbatim) — whether boundary conditions should be solved sequentially or as a simultaneous system, an answer of "sequentially" confirming BOTH-BOUNDARY-CONDITIONS-NOT-APPLIED-SIMULTANEOUSLY'),
  },
  {
    conceptId: BVP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If substituting a boundary condition gives an automatically-true equation like 0=0, does that mean an error occurred, or something else?',
    choices: [
      { text: 'Something else — an automatically-satisfied condition is the CORRECT signature of the infinitely-many-solutions case, leaving the remaining constant completely free, not a sign that an algebra error occurred', isCorrect: true },
      { text: 'An automatically-true equation like 0=0 signals a computational mistake, most likely a dropped term somewhere in the algebra', isCorrect: false, misconceptionId: `${BVP}:MC-3` },
      { text: 'Getting 0=0 always means the boundary condition was substituted incorrectly and the work should be redone from scratch', isCorrect: false, misconceptionId: `${BVP}:MC-3` },
    ],
    targetedMisconceptions: [`${BVP}:MC-3`],
    source: eb(BVP, 'Discovery Question 3 as a detection probe (verbatim) — whether an automatically-true boundary condition equation signals an error or something else, an answer of "an error" confirming INFINITELY-MANY-SOLUTIONS-CASE-MISTAKEN-FOR-AN-ERROR'),
  },
  {
    conceptId: SERIES_SOLUTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Can the series-substitution method be applied to any second-order linear ODE, regardless of its coefficients?',
    choices: [
      { text: "No — the expansion point must first be checked as an ordinary point (P,Q analytic there). For y''-y=0, P=0,Q=-1 are analytic, method applies cleanly. But for x²y''+xy'-y=0, P=1/x,Q=-1/x² have a genuine singularity at x=0, disqualifying the direct method there", isCorrect: true },
      { text: 'Yes, the series-substitution method is a universal mechanical procedure applicable to any second-order linear ODE at any point', isCorrect: false, misconceptionId: `${SERIES_SOLUTION}:MC-1` },
      { text: 'The method always works once the series ansatz and its derivatives are correctly substituted, regardless of the coefficients P and Q', isCorrect: false, misconceptionId: `${SERIES_SOLUTION}:MC-1` },
    ],
    targetedMisconceptions: [`${SERIES_SOLUTION}:MC-1`],
    source: eb(SERIES_SOLUTION, 'Discovery Question 1 as a detection probe (verbatim) — whether the series method applies to any ODE unconditionally, an answer of "yes" confirming ORDINARY-POINT-CONDITION-NOT-CHECKED'),
  },
  {
    conceptId: SERIES_SOLUTION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Before matching coefficients across two sums with different starting indices, what step must happen first?',
    choices: [
      { text: "Re-indexing to a common power of x must happen first — for y''-y=0, re-indexing the y'' sum via m=n-2 puts BOTH sums over the SAME power x^m, and only then can the 'coefficient of x^m must vanish' argument validly apply", isCorrect: true },
      { text: "Coefficients can be matched directly across sums with different index offsets, without any re-indexing step needed first", isCorrect: false, misconceptionId: `${SERIES_SOLUTION}:MC-2` },
      { text: "The differing index offsets between y'' and y's sums don't affect coefficient matching, since the powers of x align automatically", isCorrect: false, misconceptionId: `${SERIES_SOLUTION}:MC-2` },
    ],
    targetedMisconceptions: [`${SERIES_SOLUTION}:MC-2`],
    source: eb(SERIES_SOLUTION, 'Discovery Question 2 as a detection probe (verbatim) — what step must happen before matching coefficients across differently-indexed sums, an answer omitting re-indexing confirming RE-INDEXING-STEP-SKIPPED-OR-MISALIGNED'),
  },
  {
    conceptId: SERIES_SOLUTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Should individual coefficients aₙ in a series solution be guessed from a pattern, or systematically derived?',
    choices: [
      { text: 'Systematically derived from the recurrence — for y\'\'-y=0, the recurrence a_{m+2}=a_m/[(m+2)(m+1)] generates a₂=a₀/2,a₃=a₁/6,a₄=a₀/24,... mechanically from free a₀,a₁, exactly reproducing cosh x and sinh x, with no coefficient beyond a₀,a₁ ever guessed', isCorrect: true },
      { text: 'Once a pattern appears in the first few coefficients, later ones can be guessed directly from that pattern rather than derived', isCorrect: false, misconceptionId: `${SERIES_SOLUTION}:MC-3` },
      { text: "Guessing coefficients from an early pattern is an acceptable shortcut that produces the same result as deriving the recurrence", isCorrect: false, misconceptionId: `${SERIES_SOLUTION}:MC-3` },
    ],
    targetedMisconceptions: [`${SERIES_SOLUTION}:MC-3`],
    source: eb(SERIES_SOLUTION, 'Discovery Question 3 as a detection probe (verbatim) — whether coefficients should be guessed or systematically derived, an answer of "guessed from a pattern" confirming SERIES-SOLUTION-COEFFICIENTS-GUESSED-RATHER-THAN-DERIVED'),
  },
]
