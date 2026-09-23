/**
 * Batch: variation-of-parameters, harmonic-oscillator, separable (math.de).
 *
 * Fresh Phase 0 frontier recompute after math.num closed to 16/16, leaving
 * math.de as the sole open domain. Found 11 ready concepts (separable,
 * exact-ode, slope-field, variation-of-parameters, harmonic-oscillator,
 * higher-order-ode, laplace-transform, systems-ode, series-solution, bvp,
 * pde). Selects variation-of-parameters (closes wronskian and second-order-
 * homogeneous's shared declared unlock), harmonic-oscillator (newly ready
 * via undetermined-coefficients, opens resonance), and separable (closes
 * first-order-ode's own declared separable technique). Transcribed from
 * the frozen Educational Brain entries at educational-brain/concepts/
 * mathematics/math.de.{variation-of-parameters,harmonic-oscillator,
 * separable}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, continuing math.de's established
 * domain baseline.
 *
 *   VARIATION-OF-PARAMETERS  The formula NEVER uses the raw forcing term g
 *           directly when the leading coefficient a is not 1 — it must be
 *           divided by a first to get f=g/a; the Wronskian in the
 *           formula's denominator is NEVER safe to assume nonzero — it
 *           must be verified, since a zero Wronskian means the formula
 *           fails entirely; and variation of parameters is NEVER the
 *           preferred method whenever it applies — undetermined
 *           coefficients, when the forcing term fits its trial-function
 *           table, is a strictly cheaper algebraic shortcut.
 *   HARMONIC-OSCILLATOR  Critical damping is NEVER the maximum possible
 *           damping — it is the boundary between oscillatory and non-
 *           oscillatory behavior, and overdamped systems have MORE damping
 *           and return more slowly; the damped oscillation frequency is
 *           NEVER equal to the natural frequency when damping is present
 *           — it is always smaller, equal only in the undamped case; and
 *           resonance NEVER occurs from just any periodic forcing — it
 *           requires the driving frequency to specifically match the
 *           natural frequency.
 *   SEPARABLE  Integrating both sides of a separated equation NEVER
 *           produces two independent arbitrary constants — the two
 *           integration constants combine into exactly one; equilibrium
 *           solutions from h(y)=0 are NEVER safe to skip checking before
 *           dividing — some are genuinely not captured by the general
 *           formula and must be recorded separately; and a separable ODE's
 *           implicit solution is NEVER guaranteed to simplify to an
 *           explicit y=f(x) — some require a branch choice or stay
 *           implicit as the complete, correct answer.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const VARIATION_OF_PARAMETERS = 'math.de.variation-of-parameters'
const HARMONIC_OSCILLATOR = 'math.de.harmonic-oscillator'
const SEPARABLE = 'math.de.separable'

export const MATHEMATICS_DE_VARIATION_OF_PARAMETERS_HARMONIC_OSCILLATOR_SEPARABLE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: VARIATION_OF_PARAMETERS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE FORMULA USES F=G/A — NEVER THE RAW G WHEN THE LEADING COEFFICIENT A IS NOT 1: the '
      + "derivation requires first dividing the ODE by a to standard form $(y''+Py'+Qy=f)$, "
      + "giving $(u_1'=-y_2f/W,u_2'=y_1f/W)$ with NO leading coefficient in the denominator. "
      + 'Using g directly instead of f=g/a makes the final $(y_p)$ wrong by a factor of a.\n\n'
      + 'W IS NOT ZERO MUST BE VERIFIED — NEVER ASSUMED, SINCE A ZERO WRONSKIAN MEANS THE '
      + 'FORMULA FAILS ENTIRELY: if $(y_1,y_2)$ are linearly DEPENDENT ($(W\\equiv0)$), the '
      + "formula's denominator vanishes and there is no valid fundamental set to build "
      + '$(y_p)$ from. For $(y\'\'+y=\\tan x)$: $(y_1=\\cos x,y_2=\\sin x)$ give '
      + '$(W=\\cos^2x+\\sin^2x=1\\ne0)$ — genuinely independent, confirmed BEFORE proceeding, '
      + 'giving $(u_1\'=-\\sin^2x/\\cos x=\\cos x-\\sec x)$, $(u_2\'=\\sin x)$, and ultimately '
      + '$(y_p=-\\cos x\\ln|\\sec x+\\tan x|)$.\n\n'
      + 'VOP IS ALWAYS VALID BUT SHOULD NOT BE PREFERRED WHEN UNDETERMINED COEFFICIENTS APPLIES '
      + '— NEVER CHOSEN JUST BECAUSE IT\'S "THE GENERAL METHOD": undetermined coefficients, when '
      + 'g is a polynomial/exponential/trig product, produces only ALGEBRAIC equations — no '
      + 'integration needed. VoP, applied to the SAME g, may produce integrals expressible only '
      + 'via special functions or requiring much more work — e.g. an integral like '
      + '$(\\int e^{2x}/x\\,dx)$ is not elementary. The decision rule: use undetermined '
      + 'coefficients FIRST when g fits its trial-function table; use VoP specifically when g '
      + 'does NOT fit (like tan x, sec x, ln x, 1/x).',
    targetedMisconceptions: [`${VARIATION_OF_PARAMETERS}:MC-1`, `${VARIATION_OF_PARAMETERS}:MC-2`, `${VARIATION_OF_PARAMETERS}:MC-3`],
    source: eb(VARIATION_OF_PARAMETERS, "Core Understanding — the formula using f=g/a never the raw g when the leading coefficient isn't 1, W not being zero needing verification never assumption since a zero Wronskian breaks the formula entirely, and VoP being always valid but never preferred over undetermined coefficients when the latter applies"),
  },
  {
    conceptId: HARMONIC_OSCILLATOR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'CRITICAL DAMPING IS THE BOUNDARY, NEVER THE MAXIMUM DAMPING: increasing c past '
      + '$(2\\sqrt{mk})$ moves from underdamped to critically damped to OVERDAMPED — MORE '
      + 'damping, SLOWER return. "Critical" here means the boundary between oscillatory and '
      + 'non-oscillatory behavior, never "extreme" as in everyday usage; overdamped systems have '
      + 'GREATER damping than critical and return MORE slowly, never faster.\n\n'
      + 'THE DAMPED OSCILLATION FREQUENCY IS ALWAYS LESS THAN THE NATURAL FREQUENCY WHEN '
      + 'DAMPING IS PRESENT — NEVER EQUAL: for the underdamped solution '
      + '$(y=e^{-\\gamma t}(C_1\\cos\\omega_dt+C_2\\sin\\omega_dt))$ with '
      + '$(\\omega_d=\\sqrt{\\omega_0^2-\\gamma^2})$: damping SLOWS the oscillation. Only when '
      + 'c=0 (undamped) does $(\\gamma=0)$ and $(\\omega_d=\\omega_0)$. Using $(\\omega_0)$ as '
      + 'the oscillation frequency for a genuinely damped system is always wrong by the amount '
      + '$\\gamma$ subtracts.\n\n'
      + 'RESONANCE REQUIRES THE DRIVING FREQUENCY TO MATCH THE NATURAL FREQUENCY — NEVER JUST '
      + '"PERIODIC FORCING": the steady-state amplitude '
      + '$(F_0/\\sqrt{(k-m\\omega^2)^2+c^2\\omega^2})$ is FINITE for every $\\omega$ when c>0 — '
      + 'a large response near resonance is NOT the same as "resonance" itself; true resonance '
      + 'is the amplitude\'s actual maximum, at $(\\omega_{res}=\\sqrt{\\omega_0^2-2\\gamma^2})$ '
      + '(slightly below $(\\omega_0)$). For the undamped case (c=0) at exactly '
      + '$(\\omega=\\omega_0)$: the denominator vanishes, undetermined coefficients requires the '
      + 'modification rule, and $(y_p=(F_0/2m\\omega_0)t\\sin(\\omega_0t))$ — amplitude growing '
      + 'WITHOUT BOUND, genuine resonance, never occurring at any other frequency.',
    targetedMisconceptions: [`${HARMONIC_OSCILLATOR}:MC-1`, `${HARMONIC_OSCILLATOR}:MC-2`, `${HARMONIC_OSCILLATOR}:MC-3`],
    source: eb(HARMONIC_OSCILLATOR, "Core Understanding — critical damping being the boundary never the maximum damping, the damped oscillation frequency always being less than the natural frequency when damping is present never equal, and resonance requiring the driving frequency to match the natural frequency never just periodic forcing"),
  },
  {
    conceptId: SEPARABLE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'TWO INDEFINITE INTEGRALS PRODUCE ONE ARBITRARY CONSTANT, NEVER TWO: writing '
      + '$(\\int(1/h(y))\\,dy+C_1=\\int g(x)\\,dx+C_2)$ and moving $(C_1)$ across gives '
      + '$(H(y)=G(x)+(C_2-C_1))$ — since $(C_2-C_1)$ is itself arbitrary, it is written as a '
      + 'SINGLE constant C. A first-order ODE\'s general solution has EXACTLY one arbitrary '
      + 'constant; the standard shortcut integrates the left side without a constant and adds '
      + '+C only on the right, giving $(H(y)=G(x)+C)$ directly.\n\n'
      + 'EQUILIBRIUM SOLUTIONS MUST BE CHECKED BEFORE DIVIDING BY H(Y), NEVER SKIPPED: for '
      + '$(dy/dx=y^2)$: dividing by $(h(y)=y^2)$ requires $(y\\ne0)$ first. Separating and '
      + 'integrating gives $(y=-1/(x+C))$ — but $(h(0)=0)$ means $(y=0)$ is ALSO a valid '
      + 'constant solution, genuinely NOT captured by the general formula (as C approaches '
      + 'plus or minus infinity, y approaches 0 but never equals it for finite C) — it must be '
      + 'recorded SEPARATELY. Contrast $(dy/dx=ky)$: here $(y=0)$ (from $(h(0)=0)$) IS '
      + 'captured, since the general solution $(y=Ae^{kx})$ includes $(A=0)$.\n\n'
      + 'A SEPARABLE ODE\'S SOLUTION IS NOT ALWAYS EXPLICITLY SOLVABLE FOR Y: for '
      + '$(dy/dx=-x/y)$: separating and integrating gives $(y^2/2=-x^2/2+C)$, i.e. '
      + '$(x^2+y^2=R^2)$ (circles) — this CANNOT be solved for a single $(y=f(x))$ without a '
      + 'plus-or-minus branch choice: $(y=\\pm\\sqrt{R^2-x^2})$, each sign a separate valid '
      + 'solution branch. The implicit form $(H(y)=G(x)+C)$ is itself a legitimate, complete '
      + 'answer whenever further simplification isn\'t available — "solved" does not always '
      + 'mean "solved explicitly for y."',
    targetedMisconceptions: [`${SEPARABLE}:MC-1`, `${SEPARABLE}:MC-2`, `${SEPARABLE}:MC-3`],
    source: eb(SEPARABLE, "Core Understanding — two indefinite integrals producing one arbitrary constant never two, equilibrium solutions needing to be checked before dividing by h(y) never skipped, and a separable ODE's solution not always being explicitly solvable for y"),
  },
]

export const MATHEMATICS_DE_VARIATION_OF_PARAMETERS_HARMONIC_OSCILLATOR_SEPARABLE_PROBES: SeedProbe[] = [
  {
    conceptId: VARIATION_OF_PARAMETERS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If the ODE is ay″+by′+cy=g(x) with a≠1, do the VoP formulas use g directly, or g/a?',
    choices: [
      { text: "They use g/a — the derivation requires first dividing the ODE by a to standard form y″+Py′+Qy=f, giving u₁′=-y₂f/W,u₂′=y₁f/W with no leading coefficient in the denominator; using g directly makes yₚ wrong by a factor of a", isCorrect: true },
      { text: 'The VoP formulas use g directly, regardless of what the leading coefficient a is', isCorrect: false, misconceptionId: `${VARIATION_OF_PARAMETERS}:MC-1` },
      { text: "The formulas always use g directly since the leading coefficient only matters for the homogeneous solution, not the particular solution", isCorrect: false, misconceptionId: `${VARIATION_OF_PARAMETERS}:MC-1` },
    ],
    targetedMisconceptions: [`${VARIATION_OF_PARAMETERS}:MC-1`],
    source: eb(VARIATION_OF_PARAMETERS, 'Discovery Question 1 as a detection probe (verbatim) — whether the VoP formulas use g directly or g/a when a≠1, an answer of "g directly" confirming FORGETTING-THE-LEADING-COEFFICIENT'),
  },
  {
    conceptId: VARIATION_OF_PARAMETERS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Before applying the VoP formula, have you verified the Wronskian is nonzero?',
    choices: [
      { text: 'That verification is required — for y″+y=tan x, y₁=cos x,y₂=sin x give W=cos²x+sin²x=1≠0, genuinely independent, confirmed BEFORE proceeding; if y₁,y₂ were dependent (W≡0), the formula\'s denominator vanishes and there is no valid fundamental set', isCorrect: true },
      { text: 'That verification is unnecessary — the Wronskian can simply be computed as part of the formula without checking it is nonzero first', isCorrect: false, misconceptionId: `${VARIATION_OF_PARAMETERS}:MC-2` },
      { text: "No check is needed, since any two solutions of a second-order homogeneous linear ODE are automatically linearly independent", isCorrect: false, misconceptionId: `${VARIATION_OF_PARAMETERS}:MC-2` },
    ],
    targetedMisconceptions: [`${VARIATION_OF_PARAMETERS}:MC-2`],
    source: eb(VARIATION_OF_PARAMETERS, 'Discovery Question 2 as a detection probe (verbatim) — whether the Wronskian must be verified nonzero before applying the VoP formula, an answer of "no" confirming WRONSKIAN-IN-DENOMINATOR-CAN-BE-ZERO'),
  },
  {
    conceptId: VARIATION_OF_PARAMETERS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Should you always prefer variation of parameters over undetermined coefficients, or only when undetermined coefficients doesn\'t apply?',
    choices: [
      { text: "Only when undetermined coefficients doesn't apply — when g is a polynomial/exponential/trig product, undetermined coefficients produces only algebraic equations with no integration needed, while VoP applied to the same g may produce non-elementary integrals like ∫e^(2x)/x dx", isCorrect: true },
      { text: 'Variation of parameters should always be preferred since it is the more general method that works for any forcing term', isCorrect: false, misconceptionId: `${VARIATION_OF_PARAMETERS}:MC-3` },
      { text: "VoP is preferred whenever available since being more general automatically makes it a cleaner and easier method to apply", isCorrect: false, misconceptionId: `${VARIATION_OF_PARAMETERS}:MC-3` },
    ],
    targetedMisconceptions: [`${VARIATION_OF_PARAMETERS}:MC-3`],
    source: eb(VARIATION_OF_PARAMETERS, 'Discovery Question 3 as a detection probe (verbatim) — whether VoP should always be preferred over undetermined coefficients, an answer of "always prefer VoP" confirming VARIATION-OF-PARAMETERS-ALWAYS-GIVES-A-CLEANER-ANSWER-THAN-UNDETERMINED-COEFFICIENTS'),
  },
  {
    conceptId: HARMONIC_OSCILLATOR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does critically damped mean the maximum possible damping, or the boundary between oscillatory and non-oscillatory behavior?',
    choices: [
      { text: 'The boundary — increasing c past 2√(mk) moves from underdamped to critically damped to OVERDAMPED, which has MORE damping and returns MORE slowly; "critical" means the boundary between qualitative behaviors, never the extreme end', isCorrect: true },
      { text: 'Critically damped means the maximum possible damping a system can have', isCorrect: false, misconceptionId: `${HARMONIC_OSCILLATOR}:MC-1` },
      { text: "Critical damping represents the point beyond which no further damping is physically possible in the system", isCorrect: false, misconceptionId: `${HARMONIC_OSCILLATOR}:MC-1` },
    ],
    targetedMisconceptions: [`${HARMONIC_OSCILLATOR}:MC-1`],
    source: eb(HARMONIC_OSCILLATOR, 'Discovery Question 1 as a detection probe (verbatim) — whether critically damped means maximum damping or the oscillatory/non-oscillatory boundary, an answer of "maximum damping" confirming CRITICAL-DAMPING-IS-MAXIMUM-DAMPING'),
  },
  {
    conceptId: HARMONIC_OSCILLATOR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is the damped oscillation frequency ω_d the same as the natural frequency ω₀, or always smaller when damping is present?',
    choices: [
      { text: 'Always smaller when damping is present — for the underdamped solution, ω_d=√(ω₀²-γ²), and only when c=0 (undamped) does γ=0 and ω_d=ω₀; using ω₀ as the oscillation frequency for a genuinely damped system is always wrong', isCorrect: true },
      { text: 'ω_d is always the same as ω₀, regardless of whether damping is present in the system', isCorrect: false, misconceptionId: `${HARMONIC_OSCILLATOR}:MC-2` },
      { text: "The damped and natural frequencies are interchangeable labels for the same physical quantity in any oscillator", isCorrect: false, misconceptionId: `${HARMONIC_OSCILLATOR}:MC-2` },
    ],
    targetedMisconceptions: [`${HARMONIC_OSCILLATOR}:MC-2`],
    source: eb(HARMONIC_OSCILLATOR, 'Discovery Question 2 as a detection probe (verbatim) — whether ω_d equals ω₀ or is always smaller when damping is present, an answer of "same" confirming NATURAL-FREQUENCY-EQUALS-DAMPED-FREQUENCY'),
  },
  {
    conceptId: HARMONIC_OSCILLATOR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does any periodic forcing cause resonance, or only forcing at a specific matching frequency?',
    choices: [
      { text: 'Only forcing at a specific matching frequency — the steady-state amplitude is FINITE for every ω when c>0; true resonance is the amplitude\'s actual maximum near ω₀ (or, undamped at exactly ω=ω₀, genuine unbounded growth), never any strong response', isCorrect: true },
      { text: 'Any periodic forcing on an oscillator causes resonance, regardless of the driving frequency', isCorrect: false, misconceptionId: `${HARMONIC_OSCILLATOR}:MC-3` },
      { text: "Resonance occurs whenever the forcing amplitude is large enough, independent of its frequency relative to the natural frequency", isCorrect: false, misconceptionId: `${HARMONIC_OSCILLATOR}:MC-3` },
    ],
    targetedMisconceptions: [`${HARMONIC_OSCILLATOR}:MC-3`],
    source: eb(HARMONIC_OSCILLATOR, 'Discovery Question 3 as a detection probe (verbatim) — whether any periodic forcing causes resonance or only frequency-matched forcing, an answer of "any periodic forcing" confirming FORCING-AT-ANY-FREQUENCY-CAUSES-RESONANCE'),
  },
  {
    conceptId: SEPARABLE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'When you integrate both sides of a separated equation, do you end up with one arbitrary constant or two?',
    choices: [
      { text: 'One — writing ∫(1/h(y))dy+C₁=∫g(x)dx+C₂ and moving C₁ across gives H(y)=G(x)+(C₂-C₁), and since C₂-C₁ is itself arbitrary, it is written as a single constant C; a first-order ODE\'s general solution has exactly one arbitrary constant', isCorrect: true },
      { text: 'Two — integrating both sides of a separated equation produces two independent arbitrary constants that must both be carried through', isCorrect: false, misconceptionId: `${SEPARABLE}:MC-1` },
      { text: "Two separate constants, since each indefinite integral independently requires its own +C term that cannot be combined", isCorrect: false, misconceptionId: `${SEPARABLE}:MC-1` },
    ],
    targetedMisconceptions: [`${SEPARABLE}:MC-1`],
    source: eb(SEPARABLE, 'Discovery Question 1 as a detection probe (verbatim) — whether integrating both sides of a separated equation gives one or two arbitrary constants, an answer of "two" confirming TWO-CONSTANTS-FROM-TWO-INTEGRALS'),
  },
  {
    conceptId: SEPARABLE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Before dividing by h(y), have you checked whether h(y)=0 gives an equilibrium solution that might not appear in the general formula?',
    choices: [
      { text: "That check is required — for dy/dx=y², dividing by h(y)=y² requires y≠0; separating gives y=-1/(x+C), but h(0)=0 means y=0 is ALSO a valid solution, genuinely NOT captured by the general formula for any finite C, and must be recorded separately", isCorrect: true },
      { text: 'That check is unnecessary — dividing by h(y) is a routine algebraic step that never loses any solutions', isCorrect: false, misconceptionId: `${SEPARABLE}:MC-2` },
      { text: "No check is needed, since any equilibrium solution from h(y)=0 is always automatically included in the general formula", isCorrect: false, misconceptionId: `${SEPARABLE}:MC-2` },
    ],
    targetedMisconceptions: [`${SEPARABLE}:MC-2`],
    source: eb(SEPARABLE, 'Discovery Question 2 as a detection probe (verbatim) — whether checking h(y)=0 before dividing is necessary, an answer of "unnecessary" confirming FORGETTING-CONSTANT-SOLUTIONS'),
  },
  {
    conceptId: SEPARABLE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does every separable ODE\'s implicit solution H(y)=G(x)+C simplify to an explicit y=f(x)?',
    choices: [
      { text: 'No — for dy/dx=-x/y, separating and integrating gives y²/2=-x²/2+C, i.e. x²+y²=R² (circles), which cannot be solved for a single y=f(x) without a ± branch choice; the implicit form is itself a legitimate, complete answer', isCorrect: true },
      { text: "Yes — every separable ODE's implicit solution can always be simplified to a single explicit formula y=f(x)", isCorrect: false, misconceptionId: `${SEPARABLE}:MC-3` },
      { text: "Yes, since the implicit form is always just an intermediate step on the way to a genuinely explicit final answer", isCorrect: false, misconceptionId: `${SEPARABLE}:MC-3` },
    ],
    targetedMisconceptions: [`${SEPARABLE}:MC-3`],
    source: eb(SEPARABLE, 'Discovery Question 3 as a detection probe (verbatim) — whether every separable ODE\'s implicit solution simplifies to an explicit y=f(x), an answer of "yes" confirming SEPARABLE-MEANS-ALWAYS-EXPLICITLY-SOLVABLE'),
  },
]
