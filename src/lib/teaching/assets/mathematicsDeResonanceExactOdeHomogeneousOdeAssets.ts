/**
 * Batch: resonance, exact-ode, homogeneous-ode (math.de).
 *
 * Fresh Phase 0 frontier recompute after the prior batch authored
 * harmonic-oscillator, making resonance newly ready. Found 10 ready
 * concepts total (exact-ode, homogeneous-ode, slope-field, resonance,
 * higher-order-ode, laplace-transform, systems-ode, series-solution, bvp,
 * pde). Selects resonance (closes harmonic-oscillator's own declared
 * unlock), exact-ode, and homogeneous-ode (both close first-order-ode's
 * remaining declared first-order techniques). Transcribed from the frozen
 * Educational Brain entries at educational-brain/concepts/mathematics/
 * math.de.{resonance,exact-ode,homogeneous-ode}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, continuing math.de's established
 * domain baseline.
 *
 *   RESONANCE  Resonance NEVER always produces infinite amplitude — pure
 *           resonance (undamped) genuinely grows without bound, but
 *           practical resonance (damped, c>0) keeps the steady-state
 *           amplitude finite, however large; the resonant frequency is
 *           NEVER exactly the natural frequency for a damped oscillator —
 *           it is always strictly smaller, shifting further as damping
 *           increases; and beating is NEVER a form of resonance — its
 *           envelope amplitude is fixed and bounded, a genuinely different
 *           phenomenon from resonance's unbounded secular growth.
 *   EXACT-ODE  Exactness NEVER means both partial derivatives equal zero
 *           — it means the two mixed partials equal EACH OTHER, which can
 *           both be nonzero; the "constant" left after integrating M with
 *           respect to x is NEVER a true constant — it is an unknown
 *           function of y that must be determined from the other equation,
 *           never assumed to vanish; and a simple integrating factor of
 *           the form mu(x) or mu(y) is NEVER guaranteed to exist for every
 *           non-exact ODE — both tests can fail simultaneously.
 *   HOMOGENEOUS-ODE  "Homogeneous first-order ODE" and "homogeneous linear
 *           ODE" are NEVER the same technique despite sharing one word —
 *           they are genuinely different structures requiring different
 *           methods; substituting y=vx is NEVER just dy/dx=dv/dx — the
 *           product rule always adds the extra v term, since y is a
 *           product of two functions of x; and the homogeneity test NEVER
 *           requires M and N to each have degree zero — it requires them
 *           to share the SAME degree, which can be any integer.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const RESONANCE = 'math.de.resonance'
const EXACT_ODE = 'math.de.exact-ode'
const HOMOGENEOUS_ODE = 'math.de.homogeneous-ode'

export const MATHEMATICS_DE_RESONANCE_EXACT_ODE_HOMOGENEOUS_ODE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RESONANCE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'PURE RESONANCE MEANS UNBOUNDED SECULAR GROWTH — NEVER MERELY "A LARGE RESPONSE": for '
      + '$(y\'\'+\\omega_0^2y=F_0\\cos(\\omega t))$ off-resonance ($(\\omega\\ne\\omega_0)$): '
      + '$(y_p=[F_0/(\\omega_0^2-\\omega^2)]\\cos(\\omega t))$, a BOUNDED amplitude. AT '
      + 'resonance ($(\\omega=\\omega_0)$): the modification rule gives '
      + '$(y_p=(F_0/2\\omega_0)t\\sin(\\omega_0t))$ — amplitude growing LINEARLY WITHOUT BOUND '
      + 'as t approaches infinity. This unbounded growth, never a finite (however large) steady '
      + 'value, is what "pure resonance" specifically means.\n\n'
      + 'DAMPED RESONANCE PEAKS STRICTLY BELOW THE NATURAL FREQUENCY FOR ANY POSITIVE DAMPING, '
      + 'NEVER EQUAL: setting the derivative of the amplitude response to zero gives '
      + '$(\\omega_{res}=\\sqrt{\\omega_0^2-2\\gamma^2})$ — genuinely LESS than $(\\omega_0)$, '
      + "never equal, for any positive damping. For $(y''+0.4y'+4y=2\\cos\\omega t)$ "
      + '($(\\omega_0=2,\\gamma=0.2)$): $(\\omega_{res}=\\sqrt{4-0.08}\\approx1.98)$, distinctly '
      + 'below $(\\omega_0=2)$; the practical approximation $(\\omega_{res}\\approx\\omega_0)$ '
      + 'holds only for lightly damped systems, never exactly.\n\n'
      + 'BEATING IS A BOUNDED INTERFERENCE PATTERN — NEVER A FORM OF RESONANCE: for '
      + '$\\omega$ close to but NOT equal to $(\\omega_0)$ (undamped): the solution is a "slow '
      + 'envelope" times a "fast carrier," with the envelope\'s maximum amplitude FIXED at '
      + '$(2F_0/|\\omega_0^2-\\omega^2|)$, never growing beyond it. This is a genuinely '
      + 'different phenomenon (BOUNDED interference) from pure resonance\'s UNBOUNDED secular '
      + 'growth, though both involve frequencies being close.',
    targetedMisconceptions: [`${RESONANCE}:MC-1`, `${RESONANCE}:MC-2`, `${RESONANCE}:MC-3`],
    source: eb(RESONANCE, 'Core Understanding — pure resonance meaning unbounded secular growth never merely a large response, damped resonance peaking strictly below the natural frequency for any positive damping never equal, and beating being a bounded interference pattern never a form of resonance'),
  },
  {
    conceptId: EXACT_ODE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'EXACTNESS MEANS THE TWO MIXED PARTIALS EQUAL EACH OTHER — NEVER THAT EACH EQUALS ZERO: '
      + 'for $((2xy+y^2)dx+(x^2+2xy)dy=0)$: the partial of M with respect to y is $(2x+2y)$ and '
      + 'the partial of N with respect to x is $(2x+2y)$ — EQUAL to each other (neither is '
      + 'zero) — confirming exactness. "Exact" in everyday language suggests precision or '
      + 'zero-error, but the mathematical test is an EQUALITY between the two partials, not a '
      + 'requirement that either vanish.\n\n'
      + 'THE "CONSTANT" FROM PARTIAL INTEGRATION IS ACTUALLY A FUNCTION OF THE OTHER VARIABLE, '
      + 'NEVER A TRUE NUMBER: integrating $(M=2xy+y^2)$ with respect to x (treating y as fixed) '
      + 'gives $(F=x^2y+xy^2+g(y))$ — where $g(y)$ is an UNKNOWN FUNCTION of y, not simply '
      + '"+C". Differentiating $(\\partial F/\\partial y=x^2+2xy+g\'(y))$ and setting it equal '
      + "to $(N=x^2+2xy)$ gives $(g'(y)=0)$, so g happens to be a true constant HERE — but this "
      + "must be VERIFIED each time by differentiating and solving for $(g'(y))$, never "
      + 'assumed.\n\n'
      + 'A SIMPLE MU(X)-OR-MU(Y) INTEGRATING FACTOR DOES NOT ALWAYS EXIST FOR A NON-EXACT ODE: '
      + 'for $(ydx-xdy=0)$: the partial of M with respect to y is 1, the partial of N with '
      + 'respect to x is -1 — not exact. Testing $\\mu(x)$: the ratio comes out to a function '
      + 'of x ALONE — so $(\\mu=1/x^2)$ works here. But this test can FAIL for both $\\mu(x)$ '
      + 'and $\\mu(y)$ simultaneously — in that case an integrating factor may depend on BOTH x '
      + 'and y, requiring a PDE to find (harder than the original ODE) — textbook problems are '
      + 'specifically chosen so a simple $\\mu(x)$ or $\\mu(y)$ works, never guaranteed in '
      + 'general.',
    targetedMisconceptions: [`${EXACT_ODE}:MC-1`, `${EXACT_ODE}:MC-2`, `${EXACT_ODE}:MC-3`],
    source: eb(EXACT_ODE, 'Core Understanding — exactness meaning the two mixed partials equal each other never that each equals zero, the "constant" from partial integration actually being a function of the other variable never a true number, and a simple integrating factor never always existing for a non-exact ODE'),
  },
  {
    conceptId: HOMOGENEOUS_ODE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      '"HOMOGENEOUS FIRST-ORDER ODE" AND "HOMOGENEOUS LINEAR ODE" ARE GENUINELY DIFFERENT '
      + 'CONCEPTS, NEVER THE SAME TECHNIQUE: $(dy/dx=y/x)$ is BOTH a homogeneous first-order '
      + 'ODE and a linear ODE with zero right side — solvable by either method here. But '
      + '$(dy/dx=(x+y)/x=1+y/x)$ is ONLY homogeneous first-order, NOT a zero-right-side linear '
      + "equation — applying the wrong technique would fail. The word \"homogeneous\" genuinely "
      + 'means different things in each context — always check which structure is actually '
      + 'present.\n\n'
      + 'THE SUBSTITUTION Y=VX REQUIRES THE PRODUCT RULE — NEVER JUST DV/DX: differentiating '
      + '$(y=v(x)\\cdot x)$ gives $(dy/dx=v\\cdot1+x\\cdot dv/dx=v+x\\,dv/dx)$ — the v term is '
      + 'ESSENTIAL, arising because y is a PRODUCT of two functions of x (v and x itself), not '
      + 'from a simple chain-rule substitution. Substituting this into $(dy/dx=f(v))$ gives '
      + '$(v+x\\,dv/dx=f(v))$, which rearranges to a genuinely SEPARABLE equation in v and '
      + 'x.\n\n'
      + 'THE HOMOGENEITY TEST REQUIRES M AND N TO SHARE THE SAME DEGREE — NEVER BOTH DEGREE '
      + 'ZERO: with the SAME degree n (any integer, commonly 1 or 2, never required to be 0): '
      + 'for $(dy/dx=(x^2+y^2)/(2xy))$: $(M=-(x^2+y^2))$, $(N=2xy)$, BOTH degree 2 — '
      + 'homogeneous. Substituting $(v=y/x)$: the equation separates and, integrating and '
      + 'back-substituting, gives $(x^2-y^2=Kx)$.',
    targetedMisconceptions: [`${HOMOGENEOUS_ODE}:MC-1`, `${HOMOGENEOUS_ODE}:MC-2`, `${HOMOGENEOUS_ODE}:MC-3`],
    source: eb(HOMOGENEOUS_ODE, '"Homogeneous first-order ODE" and "homogeneous linear ODE" being genuinely different concepts never the same technique, the substitution y=vx requiring the product rule never just dv/dx, and the homogeneity test requiring M and N to share the same degree never both degree zero'),
  },
]

export const MATHEMATICS_DE_RESONANCE_EXACT_ODE_HOMOGENEOUS_ODE_PROBES: SeedProbe[] = [
  {
    conceptId: RESONANCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does resonance always produce infinite amplitude, or does damping keep the amplitude finite (though possibly large)?',
    choices: [
      { text: 'Damping keeps it finite for practical resonance — H(ω_res)=1/(2γ√(ω₀²-γ²)) is a FINITE (though potentially large) number for γ>0; only pure resonance (undamped, c=0, ω=ω₀) genuinely produces unbounded growth via a term like t·sin(ω₀t)', isCorrect: true },
      { text: 'Resonance always produces infinite amplitude, regardless of whether the system has any damping', isCorrect: false, misconceptionId: `${RESONANCE}:MC-1` },
      { text: "Any system driven at its natural frequency will experience infinite amplitude buildup no matter how much friction or resistance is present", isCorrect: false, misconceptionId: `${RESONANCE}:MC-1` },
    ],
    targetedMisconceptions: [`${RESONANCE}:MC-1`],
    source: eb(RESONANCE, 'Discovery Question 1 as a detection probe (verbatim) — whether resonance always produces infinite amplitude or damping keeps it finite, an answer of "always infinite" confirming RESONANCE-MEANS-INFINITE-AMPLITUDE'),
  },
  {
    conceptId: RESONANCE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is the resonant frequency always exactly ω₀, or does it shift with damping?',
    choices: [
      { text: "It shifts with damping — ω_res=√(ω₀²-2γ²) is genuinely LESS than ω₀ for any positive damping, never equal; for ω₀=2,γ=0.2, ω_res≈1.98, distinctly below ω₀=2, and the approximation ω_res≈ω₀ holds only for lightly damped systems", isCorrect: true },
      { text: 'The resonant frequency is always exactly ω₀, regardless of the amount of damping present in the system', isCorrect: false, misconceptionId: `${RESONANCE}:MC-2` },
      { text: "ω_res equals ω₀ in every case since resonance is fundamentally a property of the natural frequency alone, independent of damping", isCorrect: false, misconceptionId: `${RESONANCE}:MC-2` },
    ],
    targetedMisconceptions: [`${RESONANCE}:MC-2`],
    source: eb(RESONANCE, 'Discovery Question 2 as a detection probe (verbatim) — whether the resonant frequency is always exactly ω₀ or shifts with damping, an answer of "always ω₀" confirming RESONANT-FREQUENCY-EQUALS-NATURAL-FREQUENCY'),
  },
  {
    conceptId: RESONANCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is beating a form of resonance, or a genuinely different, bounded phenomenon?',
    choices: [
      { text: 'A genuinely different, bounded phenomenon — for ω close to but not equal to ω₀ (undamped), the envelope\'s maximum amplitude is FIXED at 2F₀/|ω₀²-ω²|, never growing beyond it, contrasted with pure resonance\'s genuinely unbounded secular growth', isCorrect: true },
      { text: 'Beating is a form of resonance, since both involve oscillations that appear to grow over time', isCorrect: false, misconceptionId: `${RESONANCE}:MC-3` },
      { text: "Beating and resonance are the same phenomenon described with different terminology depending on the textbook", isCorrect: false, misconceptionId: `${RESONANCE}:MC-3` },
    ],
    targetedMisconceptions: [`${RESONANCE}:MC-3`],
    source: eb(RESONANCE, 'Discovery Question 3 as a detection probe (verbatim) — whether beating is a form of resonance or a genuinely different bounded phenomenon, an answer of "form of resonance" confirming BEATING-IS-THE-SAME-AS-RESONANCE'),
  },
  {
    conceptId: EXACT_ODE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does exactness mean ∂M/∂y and ∂N/∂x are both zero, or that they equal each other?',
    choices: [
      { text: "That they equal each other — for (2xy+y²)dx+(x²+2xy)dy=0, both ∂M/∂y and ∂N/∂x equal 2x+2y, genuinely nonzero yet equal, confirming exactness; the mathematical test is an equality, never a zero requirement on either partial", isCorrect: true },
      { text: 'Exactness means both ∂M/∂y and ∂N/∂x must individually equal zero', isCorrect: false, misconceptionId: `${EXACT_ODE}:MC-1` },
      { text: "An ODE is exact only when neither partial derivative appears in the equation at all, meaning no y or x dependence exists", isCorrect: false, misconceptionId: `${EXACT_ODE}:MC-1` },
    ],
    targetedMisconceptions: [`${EXACT_ODE}:MC-1`],
    source: eb(EXACT_ODE, 'Discovery Question 1 as a detection probe (verbatim) — whether exactness means both partials are zero or that they equal each other, an answer of "both zero" confirming EXACT-MEANS-BOTH-PARTIALS-EQUAL-ZERO'),
  },
  {
    conceptId: EXACT_ODE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "After integrating M with respect to x, is the 'g(y)' term a true constant, or a function that still needs to be determined?",
    choices: [
      { text: "It is a function that still needs to be determined — integrating M=2xy+y² with respect to x gives F=x²y+xy²+g(y), where g(y) is an UNKNOWN function of y, and it must be found by differentiating and setting ∂F/∂y equal to N, never simply assumed to be zero", isCorrect: true },
      { text: "The 'g(y)' term is a true numerical constant, just like the +C in ordinary single-variable integration", isCorrect: false, misconceptionId: `${EXACT_ODE}:MC-2` },
      { text: "It can always be set to zero without checking, since partial integration in x naturally produces no leftover terms in y", isCorrect: false, misconceptionId: `${EXACT_ODE}:MC-2` },
    ],
    targetedMisconceptions: [`${EXACT_ODE}:MC-2`],
    source: eb(EXACT_ODE, 'Discovery Question 2 as a detection probe (verbatim) — whether the g(y) term after partial integration is a true constant or a function to be determined, an answer of "true constant" confirming FORGETTING-THE-FUNCTION-OF-Y-IN-INTEGRATION'),
  },
  {
    conceptId: EXACT_ODE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does an integrating factor of the simple form μ(x) or μ(y) always exist for a non-exact ODE?',
    choices: [
      { text: "No — for y dx - x dy=0, the μ(x) test happens to work, giving μ=1/x², but this test can FAIL for both μ(x) and μ(y) simultaneously in general, requiring an integrating factor depending on both x and y (via a harder PDE); textbook problems are specifically chosen so a simple form works", isCorrect: true },
      { text: 'Yes — a simple μ(x) or μ(y) integrating factor always exists for any non-exact ODE', isCorrect: false, misconceptionId: `${EXACT_ODE}:MC-3` },
      { text: "Yes, since every first-order ODE can always be made exact by some simple function of a single variable", isCorrect: false, misconceptionId: `${EXACT_ODE}:MC-3` },
    ],
    targetedMisconceptions: [`${EXACT_ODE}:MC-3`],
    source: eb(EXACT_ODE, 'Discovery Question 3 as a detection probe (verbatim) — whether a simple μ(x) or μ(y) integrating factor always exists for a non-exact ODE, an answer of "yes" confirming INTEGRATING-FACTOR-ALWAYS-EXISTS-EASILY'),
  },
  {
    conceptId: HOMOGENEOUS_ODE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is "homogeneous first-order ODE" the same idea as "homogeneous linear ODE" with zero right side, or are they genuinely different structures?',
    choices: [
      { text: "They are genuinely different structures — dy/dx=(x+y)/x=1+y/x is homogeneous first-order (f(v)=1+v) but is NOT a zero-right-side linear equation; applying the wrong technique would fail, even though both structures share the word 'homogeneous'", isCorrect: true },
      { text: '"Homogeneous first-order ODE" and "homogeneous linear ODE" describe the exact same mathematical structure and solving technique', isCorrect: false, misconceptionId: `${HOMOGENEOUS_ODE}:MC-1` },
      { text: "Any equation with 'homogeneous' in its name can be solved with either the linear-ODE method or the y/x substitution method interchangeably", isCorrect: false, misconceptionId: `${HOMOGENEOUS_ODE}:MC-1` },
    ],
    targetedMisconceptions: [`${HOMOGENEOUS_ODE}:MC-1`],
    source: eb(HOMOGENEOUS_ODE, 'Discovery Question 1 as a detection probe (verbatim) — whether homogeneous first-order ODE is the same as homogeneous linear ODE, an answer of "same idea" confirming HOMOGENEOUS-MEANS-ZERO-RIGHT-SIDE'),
  },
  {
    conceptId: HOMOGENEOUS_ODE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'When you substitute y=vx, is dy/dx just dv/dx, or does the product rule add an extra term?',
    choices: [
      { text: 'The product rule adds an extra term — differentiating y=v(x)·x gives dy/dx=v+x dv/dx; the v term is essential, arising because y is a PRODUCT of two functions of x, never from a simple chain-rule substitution', isCorrect: true },
      { text: 'dy/dx is just dv/dx when substituting y=vx, with no additional term needed', isCorrect: false, misconceptionId: `${HOMOGENEOUS_ODE}:MC-2` },
      { text: "Since v is treated as the new variable, differentiating y=vx follows the same single-variable rule as any u-substitution in integration", isCorrect: false, misconceptionId: `${HOMOGENEOUS_ODE}:MC-2` },
    ],
    targetedMisconceptions: [`${HOMOGENEOUS_ODE}:MC-2`],
    source: eb(HOMOGENEOUS_ODE, 'Discovery Question 2 as a detection probe (verbatim) — whether dy/dx is just dv/dx or the product rule adds an extra term for y=vx, an answer of "just dv/dx" confirming FORGETTING-PRODUCT-RULE-IN-DY-DX'),
  },
  {
    conceptId: HOMOGENEOUS_ODE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does the homogeneity test require M and N to each have degree zero, or just the same degree as each other?',
    choices: [
      { text: "Just the same degree as each other — for dy/dx=(x²+y²)/(2xy), M=-(x²+y²) and N=2xy are BOTH degree 2 (not degree 0), yet the equation is genuinely homogeneous; any shared degree n qualifies, not specifically zero", isCorrect: true },
      { text: 'The homogeneity test requires M and N to each individually have degree zero', isCorrect: false, misconceptionId: `${HOMOGENEOUS_ODE}:MC-3` },
      { text: "Only equations where M and N have no x or y dependence at all (degree zero) can ever qualify as homogeneous first-order ODEs", isCorrect: false, misconceptionId: `${HOMOGENEOUS_ODE}:MC-3` },
    ],
    targetedMisconceptions: [`${HOMOGENEOUS_ODE}:MC-3`],
    source: eb(HOMOGENEOUS_ODE, 'Discovery Question 3 as a detection probe (verbatim) — whether the homogeneity test requires degree zero or just matching degree, an answer of "degree zero" confirming M-AND-N-MUST-HAVE-DEGREE-ZERO'),
  },
]
