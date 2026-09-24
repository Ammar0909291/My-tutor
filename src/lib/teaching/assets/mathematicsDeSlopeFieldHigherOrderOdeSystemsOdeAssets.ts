/**
 * Batch: slope-field, higher-order-ode, systems-ode (math.de).
 *
 * Fresh Phase 0 frontier recompute after the resonance/exact-ode/
 * homogeneous-ode batch found 7 ready concepts (slope-field, higher-order-
 * ode, laplace-transform, systems-ode, series-solution, bvp, pde). Selects
 * slope-field (closes first-order-ode's own declared unlock, opens phase-
 * plane), higher-order-ode (generalizes the characteristic-equation method
 * to degree n), and systems-ode (opens the phase-plane/stability-analysis
 * chain). Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.de.{slope-field,higher-
 * order-ode,systems-ode}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, continuing math.de's established
 * domain baseline.
 *
 *   SLOPE-FIELD  Constructing a slope field NEVER requires first solving
 *           the ODE — the slopes are computed directly by plugging into the
 *           ODE's own right-hand side; a sketched solution curve NEVER only
 *           needs to match the field's direction at its starting point — it
 *           must stay tangent to the field continuously along its entire
 *           path; and qualitative long-run behavior is NEVER unreadable
 *           without explicit solving — it can be read directly from the
 *           slope field's picture.
 *   HIGHER-ORDER-ODE  A degree-n characteristic polynomial is NEVER at risk
 *           of supplying too few roots — the Fundamental Theorem of Algebra
 *           guarantees exactly n roots counting multiplicity, for any order
 *           n; a root of multiplicity k NEVER contributes k literal copies
 *           of the same exponential — it contributes k genuinely
 *           independent solutions using increasing powers of x; and "the
 *           solutions form an n-dimensional vector space" is NEVER just
 *           descriptive language taken on faith — it is a checkable claim
 *           verified via closure.
 *   SYSTEMS-ODE  The eigenvalue-eigenvector method is NEVER automatically
 *           sufficient to produce a complete general solution — a repeated
 *           eigenvalue can supply too few independent eigenvectors,
 *           requiring additional technique; state-vector reduction's new
 *           variable derivatives are NEVER guessed — each follows either
 *           directly from its own definition or from substituting into the
 *           original equation; and the system's matrix characteristic
 *           equation is NEVER merely similar to the original scalar ODE's
 *           characteristic equation — they are the identical polynomial.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const SLOPE_FIELD = 'math.de.slope-field'
const HIGHER_ORDER_ODE = 'math.de.higher-order-ode'
const SYSTEMS_ODE = 'math.de.systems-ode'

export const MATHEMATICS_DE_SLOPE_FIELD_HIGHER_ORDER_ODE_SYSTEMS_ODE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SLOPE_FIELD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "THE ODE'S OWN RIGHT-HAND SIDE f(X,Y) ALREADY IS THE SLOPE FORMULA — CONSTRUCTION NEEDS NO "
      + "SOLVING: for $(y'=x-y)$: computing the slope directly at $((0,0))$: $(0-0=0)$ "
      + '(horizontal); at $((1,0))$: $(1-0=1)$; at $((0,1))$: $(0-1=-1)$; at $((2,2))$: '
      + '$(2-2=0)$ (horizontal again) — each value obtained by PLUGGING INTO the ODE\'s own '
      + 'right-hand side, with zero algebraic solving performed. Slope-field construction is a '
      + 'purely computational procedure.\n\n'
      + 'A SKETCHED SOLUTION MUST STAY TANGENT TO THE FIELD AT EVERY POINT — NEVER JUST AT THE '
      + 'START: sketching through $((0,2))$ for $(y\'=x-y)$: the initial slope is '
      + '$(f(0,2)=0-2=-2)$ (steeply decreasing) — but the curve must CONTINUOUSLY re-check and '
      + "follow the UPDATED local slope at every new position along its path, exactly matching "
      + "the definition of a solution ($(y'(x)=f(x,y(x)))$ at EVERY point it passes through), "
      + 'not merely start in the right direction and wander freely afterward.\n\n'
      + 'QUALITATIVE LONG-RUN BEHAVIOR IS READABLE DIRECTLY FROM THE PICTURE — NEVER REQUIRING '
      + "EXPLICIT SOLVING FIRST: examining the SAME slope field for $(y'=x-y)$ near the line "
      + '$(y=x)$ (where $(f=0)$, giving horizontal segments): solutions starting ABOVE this line '
      + '($(f<0)$, segments point downward) get pulled DOWN toward it; solutions starting BELOW '
      + 'it ($(f>0)$, segments point upward) get pulled UP toward it — revealing directly from '
      + 'the PICTURE, with zero algebra, that ALL solutions qualitatively approach $(y=x)$ as x '
      + 'grows. This is genuinely valuable precisely when an equation resists the standard '
      + 'solving techniques (separable, integrating factor, exact, Bernoulli).',
    targetedMisconceptions: [`${SLOPE_FIELD}:MC-1`, `${SLOPE_FIELD}:MC-2`, `${SLOPE_FIELD}:MC-3`],
    source: eb(SLOPE_FIELD, "Core Understanding — the ODE's own right-hand side already being the slope formula so construction needs no solving, a sketched solution needing to stay tangent to the field at every point never just at the start, and qualitative long-run behavior being readable directly from the picture never requiring explicit solving first"),
  },
  {
    conceptId: HIGHER_ORDER_ODE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "THE CHARACTERISTIC POLYNOMIAL ALWAYS SUPPLIES EXACTLY N ROOTS FOR AN NTH-ORDER ODE — "
      + "NEVER POTENTIALLY TOO FEW: for $(y'''-6y''+11y'-6y=0)$: substituting $(y=e^{rx})$ "
      + 'gives $(r^3-6r^2+11r-6=0=(r-1)(r-2)(r-3))$, giving THREE distinct roots $(r=1,2,3)$ — '
      + 'matching the Fundamental Theorem of Algebra\'s guarantee of exactly 3 roots (counting '
      + 'multiplicity) for this degree-3 polynomial. The general solution '
      + '$(y=c_1e^x+c_2e^{2x}+c_3e^{3x})$ uses exactly the roots supplied — this guarantee '
      + 'holds for ANY order n, never just degree 2.\n\n'
      + "MULTIPLICITY K MEANS K GENUINELY INDEPENDENT SOLUTIONS, NEVER K LITERAL COPIES OF THE "
      + "SAME EXPONENTIAL: for $(y'''-3y''+3y'-y=0)$, characteristic polynomial "
      + '$((r-1)^3=0)$: a SINGLE root $(r=1)$ of multiplicity 3. The correct solutions are '
      + '$(e^x,xe^x,x^2e^x)$ — verified directly by substitution, confirming $(xe^x)$ is a '
      + 'GENUINELY NEW, independent solution, never a redundant repeat of $(e^x)$.\n\n'
      + '"N-DIMENSIONAL SOLUTION SPACE" IS A VERIFIED STRUCTURAL CLAIM — NEVER JUST DESCRIPTIVE '
      + "LANGUAGE: for $(L[y]=y'''-6y''+11y'-6y)$ and solutions $(y_1=e^x,y_2=e^{2x})$: forming "
      + '$(y=3y_1-2y_2=3e^x-2e^{2x})$ and substituting directly into $(L[y])$ gives 0 — '
      + "CONCRETELY verifying closure under linear combination, exactly matching the vector "
      + 'space concept\'s own closure axioms. This is a CHECKABLE fact, established the same way '
      + 'any candidate vector space\'s closure is verified, never an unverified label borrowed '
      + 'from linear algebra.',
    targetedMisconceptions: [`${HIGHER_ORDER_ODE}:MC-1`, `${HIGHER_ORDER_ODE}:MC-2`, `${HIGHER_ORDER_ODE}:MC-3`],
    source: eb(HIGHER_ORDER_ODE, 'Core Understanding — the characteristic polynomial always supplying exactly n roots for an nth-order ODE never potentially too few, multiplicity k meaning k genuinely independent solutions never k literal copies of the same exponential, and "n-dimensional solution space" being a verified structural claim never just descriptive language'),
  },
  {
    conceptId: SYSTEMS_ODE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "STATE-VECTOR REDUCTION TURNS A HIGHER-ORDER SCALAR ODE INTO A FIRST-ORDER SYSTEM: for "
      + "$(y''=f(y',y,t))$, let $(x_1=y,x_2=y')$. Then $(x_1'=y'=x_2)$ BY DEFINITION, and "
      + '$(x_2\'=y\'\'=f(x_2,x_1,t))$ by substituting the original equation — TWO first-order '
      + "equations, exactly equivalent to the original second-order one. For "
      + "$(y''-5y'+6y=0)$: $(x_1'=x_2)$, $(x_2'=5x_2-6x_1)$, giving matrix form "
      + '$(\\vec x\'=A\\vec x)$ — directly extending the matrix concept\'s own notation to a '
      + 'differential setting.\n\n'
      + 'THE EIGENVALUE EQUATION SOLVES THE SYSTEM DIRECTLY — THE SAME UNDERLYING IDEA AS THE '
      + 'SCALAR CHARACTERISTIC EQUATION: seeking $(\\vec x(t)=\\vec ve^{\\lambda t})$ in '
      + '$(\\vec x\'=A\\vec x)$, substitution gives $(\\lambda\\vec v=A\\vec v)$ — EXACTLY the '
      + 'eigenvalue equation. For $(A)$ built from the reduction above: '
      + '$(\\det(A-\\lambda I)=\\lambda^2-5\\lambda+6=0)$ — the IDENTICAL polynomial as the '
      + 'original ODE\'s characteristic equation, giving $(\\lambda=2,3)$ matching '
      + '$(r_1=2,r_2=3)$ exactly; the eigenvalue method and the characteristic-equation method '
      + 'are the SAME underlying idea in two formalisms, never two independent facts.\n\n'
      + 'A REPEATED EIGENVALUE CAN SUPPLY TOO FEW INDEPENDENT EIGENVECTORS, REQUIRING '
      + 'ADDITIONAL TECHNIQUE: for a matrix with repeated $(\\lambda=2)$: solving '
      + '$((A-2I)\\vec v=0)$ can give only ONE independent direction — insufficient for a '
      + 'genuine two-parameter general solution via "one term per eigenvalue." This parallels '
      + 'the second-order-ODE repeated-root case — the naive method requires a genuine, '
      + 'checkable condition (enough independent eigenvectors) that is never automatic for '
      + 'every matrix.',
    targetedMisconceptions: [`${SYSTEMS_ODE}:MC-1`, `${SYSTEMS_ODE}:MC-2`, `${SYSTEMS_ODE}:MC-3`],
    source: eb(SYSTEMS_ODE, 'Core Understanding — state-vector reduction turning a higher-order scalar ODE into a first-order system, the eigenvalue equation solving the system directly as the same underlying idea as the scalar characteristic equation, and a repeated eigenvalue potentially supplying too few independent eigenvectors requiring additional technique'),
  },
]

export const MATHEMATICS_DE_SLOPE_FIELD_HIGHER_ORDER_ODE_SYSTEMS_ODE_PROBES: SeedProbe[] = [
  {
    conceptId: SLOPE_FIELD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does constructing a slope field require first solving the ODE, or can the slopes be computed directly from f(x,y)?',
    choices: [
      { text: "Directly from f(x,y) — for y'=x-y, the slope at (0,0) is 0-0=0, at (1,0) is 1-0=1, at (0,1) is 0-1=-1, each obtained by plugging directly into the ODE's own right-hand side with zero algebraic solving performed", isCorrect: true },
      { text: 'A slope field requires first solving the ODE to get an explicit formula for y before the slopes can be computed', isCorrect: false, misconceptionId: `${SLOPE_FIELD}:MC-1` },
      { text: "Solving the ODE is a necessary first step since the slope at each point depends on knowing the solution's exact value there", isCorrect: false, misconceptionId: `${SLOPE_FIELD}:MC-1` },
    ],
    targetedMisconceptions: [`${SLOPE_FIELD}:MC-1`],
    source: eb(SLOPE_FIELD, 'Discovery Question 1 as a detection probe (verbatim) — whether constructing a slope field requires solving the ODE first, an answer of "yes, requires solving" confirming SLOPE-FIELD-ASSUMED-TO-REQUIRE-SOLVING-FIRST'),
  },
  {
    conceptId: SLOPE_FIELD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does sketching an approximate solution only require matching the slope-field direction at the starting point, or must it stay tangent continuously along the entire path?',
    choices: [
      { text: "It must stay tangent continuously — sketching through (0,2) for y'=x-y starts with slope f(0,2)=-2, but the curve must continuously re-check and follow the UPDATED local slope at every new position, exactly matching the definition y'(x)=f(x,y(x)) at every point", isCorrect: true },
      { text: 'Only the starting point matters — once the initial direction is matched, the sketch can proceed freely afterward', isCorrect: false, misconceptionId: `${SLOPE_FIELD}:MC-2` },
      { text: "Matching the initial slope alone is sufficient since a solution's overall shape is determined entirely by where it begins", isCorrect: false, misconceptionId: `${SLOPE_FIELD}:MC-2` },
    ],
    targetedMisconceptions: [`${SLOPE_FIELD}:MC-2`],
    source: eb(SLOPE_FIELD, 'Discovery Question 2 as a detection probe (verbatim) — whether a sketched solution only needs initial tangency or must stay tangent continuously, an answer of "only initial tangency" confirming SOLUTION-SKETCH-ASSUMED-ONLY-NEEDS-INITIAL-TANGENCY'),
  },
  {
    conceptId: SLOPE_FIELD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Can qualitative long-run behavior be read directly from a slope field\'s picture, or does it require solving the ODE explicitly first?',
    choices: [
      { text: "It can be read directly — for y'=x-y, near y=x (where f=0) segments are horizontal; solutions above get pulled down, solutions below get pulled up, revealing directly from the picture that ALL solutions approach y=x, with zero algebra needed", isCorrect: true },
      { text: 'Qualitative long-run behavior requires solving the ODE explicitly first before any prediction can be made', isCorrect: false, misconceptionId: `${SLOPE_FIELD}:MC-3` },
      { text: "Predicting behavior always needs an explicit formula since a picture alone cannot capture what happens as x grows without bound", isCorrect: false, misconceptionId: `${SLOPE_FIELD}:MC-3` },
    ],
    targetedMisconceptions: [`${SLOPE_FIELD}:MC-3`],
    source: eb(SLOPE_FIELD, 'Discovery Question 3 as a detection probe (verbatim) — whether qualitative behavior can be read from the picture or requires explicit solving, an answer of "requires explicit solving" confirming QUALITATIVE-BEHAVIOR-ASSUMED-TO-REQUIRE-EXPLICIT-SOLVING'),
  },
  {
    conceptId: HIGHER_ORDER_ODE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does an nth-order linear ODE\'s characteristic polynomial always supply enough roots for all n needed solutions?',
    choices: [
      { text: "Yes, always exactly n — for y'''-6y''+11y'-6y=0, factoring gives THREE distinct roots r=1,2,3, matching the Fundamental Theorem of Algebra's guarantee of exactly n roots (counting multiplicity) for a degree-n polynomial, for ANY order n", isCorrect: true },
      { text: "It's not guaranteed — a degree-n characteristic polynomial might supply fewer than n roots for some equations", isCorrect: false, misconceptionId: `${HIGHER_ORDER_ODE}:MC-1` },
      { text: "The root count depends on the specific coefficients and can fall short of n for higher-order equations", isCorrect: false, misconceptionId: `${HIGHER_ORDER_ODE}:MC-1` },
    ],
    targetedMisconceptions: [`${HIGHER_ORDER_ODE}:MC-1`],
    source: eb(HIGHER_ORDER_ODE, 'Discovery Question 1 as a detection probe (verbatim) — whether an nth-order characteristic polynomial always supplies enough roots, an answer of "not guaranteed" confirming CHARACTERISTIC-POLYNOMIAL-ROOT-COUNT-DOUBTED'),
  },
  {
    conceptId: HIGHER_ORDER_ODE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For a root of multiplicity 3, are the 3 solutions three literal copies of e^(rx)?',
    choices: [
      { text: "No — for (r-1)³=0 (root r=1, multiplicity 3), the correct solutions are eˣ,xeˣ,x²eˣ; substitution verifies xeˣ genuinely satisfies the ODE independently of eˣ — three GENUINELY NEW, independent solutions, never three copies of the same function", isCorrect: true },
      { text: 'Yes — a root of multiplicity 3 contributes three literal copies of the same e^(rx) function', isCorrect: false, misconceptionId: `${HIGHER_ORDER_ODE}:MC-2` },
      { text: "Yes, since multiplicity simply means the same solution is counted multiple times toward the total of n solutions", isCorrect: false, misconceptionId: `${HIGHER_ORDER_ODE}:MC-2` },
    ],
    targetedMisconceptions: [`${HIGHER_ORDER_ODE}:MC-2`],
    source: eb(HIGHER_ORDER_ODE, 'Discovery Question 2 as a detection probe (verbatim) — whether a multiplicity-3 root gives three literal copies of e^(rx), an answer of "yes" confirming MULTIPLICITY-TREATED-AS-LITERAL-REPETITION'),
  },
  {
    conceptId: HIGHER_ORDER_ODE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Is 'the ODE's solutions form an n-dimensional vector space' something you take on faith, or something checkable?",
    choices: [
      { text: "It is checkable — for L[y]=y'''-6y''+11y'-6y and solutions y₁=eˣ,y₂=e²ˣ, forming y=3y₁-2y₂ and substituting into L[y] gives exactly 0, CONCRETELY verifying closure under linear combination, the same way any candidate vector space's closure is verified", isCorrect: true },
      { text: "'N-dimensional solution space' is descriptive terminology borrowed from linear algebra, taken on faith without direct verification", isCorrect: false, misconceptionId: `${HIGHER_ORDER_ODE}:MC-3` },
      { text: "The vector-space label is simply assumed to apply to any set of solutions of a linear ODE, without needing to check anything", isCorrect: false, misconceptionId: `${HIGHER_ORDER_ODE}:MC-3` },
    ],
    targetedMisconceptions: [`${HIGHER_ORDER_ODE}:MC-3`],
    source: eb(HIGHER_ORDER_ODE, 'Discovery Question 3 as a detection probe (verbatim) — whether the n-dimensional solution space claim is taken on faith or checkable, an answer of "taken on faith" confirming SOLUTION-SPACE-DIMENSIONALITY-UNVERIFIED'),
  },
  {
    conceptId: SYSTEMS_ODE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "When you convert y''=f(y',y,t) using x₁=y,x₂=y', is x₁' something new to derive, or does it follow immediately from the definitions?",
    choices: [
      { text: "It follows immediately from the definitions — x₁'=y'=x₂ by definition (since x₁=y and x₂=y'), while x₂'=y'' is derived by substituting the original equation; the reduction is fully derived, never guessed", isCorrect: true },
      { text: "x₁' must be independently derived or guessed, since the state-variable reduction doesn't automatically determine it", isCorrect: false, misconceptionId: `${SYSTEMS_ODE}:MC-2` },
      { text: "Both x₁' and x₂' require solving a separate equation to determine, unrelated to how x₁ and x₂ were originally defined", isCorrect: false, misconceptionId: `${SYSTEMS_ODE}:MC-2` },
    ],
    targetedMisconceptions: [`${SYSTEMS_ODE}:MC-2`],
    source: eb(SYSTEMS_ODE, 'Discovery Question 1 as a detection probe (verbatim) — whether x₁\' follows immediately from the definitions or is something new to derive, an answer of "new to derive/guessed" confirming STATE-VECTOR-REDUCTION-VARIABLES-MISASSIGNED'),
  },
  {
    conceptId: SYSTEMS_ODE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "Is the matrix's characteristic equation a coincidentally similar polynomial to the original ODE's, or are they the exact same equation?",
    choices: [
      { text: "They are the exact same equation — for the matrix built from y''-5y'+6y=0's reduction, det(A-λI)=λ²-5λ+6=0 is the IDENTICAL polynomial as the scalar ODE's characteristic equation r²-5r+6=0, giving matching roots; the eigenvalue and characteristic-equation methods are the same idea in two formalisms", isCorrect: true },
      { text: "The matrix's characteristic equation is a coincidentally similar but genuinely different polynomial from the original scalar ODE's", isCorrect: false, misconceptionId: `${SYSTEMS_ODE}:MC-3` },
      { text: "The two characteristic equations happen to share the same roots by coincidence, but are computed through unrelated procedures", isCorrect: false, misconceptionId: `${SYSTEMS_ODE}:MC-3` },
    ],
    targetedMisconceptions: [`${SYSTEMS_ODE}:MC-3`],
    source: eb(SYSTEMS_ODE, 'Discovery Question 2 as a detection probe (verbatim) — whether the matrix and scalar characteristic equations are coincidentally similar or the exact same equation, an answer of "coincidentally similar" confirming SYSTEM-AND-SCALAR-CHARACTERISTIC-EQUATIONS-TREATED-AS-UNRELATED'),
  },
  {
    conceptId: SYSTEMS_ODE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If a matrix has a repeated eigenvalue, does the eigenvector method automatically supply a complete general solution?',
    choices: [
      { text: "No — for a matrix with repeated λ=2, solving (A-2I)v=0 can give only ONE independent direction, insufficient for a genuine two-parameter general solution via 'one term per eigenvalue'; this parallels the scalar repeated-root case and requires additional technique", isCorrect: true },
      { text: "Yes — the eigenvalue-eigenvector method always automatically produces a complete general solution with one term per eigenvalue", isCorrect: false, misconceptionId: `${SYSTEMS_ODE}:MC-1` },
      { text: "Yes, since every eigenvalue, repeated or not, is guaranteed to have a matching independent eigenvector by definition", isCorrect: false, misconceptionId: `${SYSTEMS_ODE}:MC-1` },
    ],
    targetedMisconceptions: [`${SYSTEMS_ODE}:MC-1`],
    source: eb(SYSTEMS_ODE, 'Discovery Question 3 as a detection probe (verbatim) — whether the eigenvector method always automatically supplies a complete solution for repeated eigenvalues, an answer of "yes" confirming EIGENVALUE-METHOD-ASSUMED-ALWAYS-SUFFICIENT'),
  },
]
