/**
 * Batch: ode (math.de).
 *
 * OPENS a fresh domain: math.real is now complete (30/30), and math.num's
 * final 3 concepts (euler-method, runge-kutta, stiff-ode) are all
 * transitively blocked on math.de.euler-method, a concept in a domain not
 * yet opened this campaign. This is the deliberate next-move decision noted
 * per the standing campaign instruction: opening math.de is the right next
 * step, both to continue the broader campaign (56 concepts, all with
 * completed EB entries) and to eventually fully unblock math.num. This
 * batch authors math.de's sole root concept, math.de.ode — its 3
 * prerequisites (math.calc.derivative-intro, math.calc.antiderivatives,
 * math.func.function-concept) are already authored — which unlocks
 * math.de.first-order-ode and math.de.second-order-ode for the next batch.
 * Transcribed from the frozen Educational Brain entry at educational-
 * brain/concepts/mathematics/math.de.ode.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching the ODE domain's advanced
 * difficulty level and its direct extension of already-undergraduate
 * math.calc/math.real machinery.
 *
 *   ODE  An ODE's solution is NEVER a number — it is a function, directly
 *           extending the antiderivative's own F'=f => F(x)+C machinery;
 *           order and degree are NEVER the same reading of a symbol — order
 *           is the highest derivative's index while degree is that
 *           derivative's own power, and the two vary independently; and the
 *           general solution's arbitrary-constant count is NEVER arbitrary
 *           itself — it always equals exactly n for an n-th order ODE, one
 *           constant per integration performed.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const ODE = 'math.de.ode'

export const MATHEMATICS_DE_ODE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ODE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "AN ODE'S SOLUTION IS A FUNCTION, NEVER A NUMBER: reusing antiderivatives' own already-"
      + 'familiar machinery directly, $(s\'(t)=2t)$ integrates to the GENERAL solution '
      + '$(s(t)=t^2+C)$ — a function of $t$ with one free constant, never a single value. An '
      + 'algebraic equation like $(x^2-4=0)$ has finitely many NUMBER solutions ($(x=\\pm2)$); an '
      + "ODE like $(y'-2y=0)$ has infinitely many FUNCTION solutions "
      + '$((y=Ce^{2x}))$, one per value of $C$ — an initial condition like $(s(0)=3)$ pins down '
      + '$C$ uniquely (here $(C=3)$), giving the PARTICULAR solution $(s(t)=t^2+3)$.\n\n'
      + 'ORDER IS THE HIGHEST DERIVATIVE\'S INDEX; DEGREE IS ITS POWER — THE TWO ARE INDEPENDENT: '
      + "for a general ODE, the ORDER is the index of the highest-order derivative present (count "
      + "the prime marks); the DEGREE is the POWER to which that specific highest-order derivative "
      + "is raised, after clearing fractions/radicals. For $((y'')^3+y'=0)$: the highest "
      + "derivative is $(y'')$ (order 2), raised to the power 3 (degree 3) — the exponent 3 "
      + 'belongs to $(y\'\')$ specifically, never mistaken for the order itself. Order and degree '
      + 'vary independently: high order can pair with low degree, and vice versa.\n\n'
      + 'THE GENERAL SOLUTION HAS EXACTLY N ARBITRARY CONSTANTS FOR AN N-TH ORDER ODE: each '
      + "integration needed to solve an n-th order ODE introduces one constant, so the general "
      + "solution contains exactly n free constants — one initial/boundary condition is needed "
      + "per constant to reach a unique particular solution. Verification always proceeds the "
      + "same way regardless of solving technique: differentiate the proposed y=f(x) the required "
      + "number of times, substitute into the ODE, and confirm the result holds identically for "
      + 'all $x$ — e.g. $(y=3e^{-2x})$ satisfies $(y\'+2y=0)$ since $(y\'=-6e^{-2x})$ and '
      + "$(y'+2y=-6e^{-2x}+6e^{-2x}=0)$.",
    targetedMisconceptions: [`${ODE}:MC-1`, `${ODE}:MC-2`, `${ODE}:MC-3`],
    source: eb(ODE, "Core Understanding — an ODE's solution being a function never a number, order being the highest derivative's index while degree is its power with the two varying independently, and the general solution having exactly n arbitrary constants for an n-th order ODE"),
  },
]

export const MATHEMATICS_DE_ODE_PROBES: SeedProbe[] = [
  {
    conceptId: ODE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "Is y=5 a valid candidate solution for y'=2x?",
    choices: [
      { text: "No — differentiating y=5 gives y'=0, which does not equal 2x except at x=0; checking y=x² instead gives y'=2x=2x, holding identically for all x, confirming a function (never a single number) is the genuine solution", isCorrect: true },
      { text: "Yes — y=5 is a valid candidate solution for y'=2x, since it is a simple constant that could represent the solution", isCorrect: false, misconceptionId: `${ODE}:MC-1` },
      { text: "Yes, since solving an equation for y should always produce a specific numerical value, just as with algebraic equations", isCorrect: false, misconceptionId: `${ODE}:MC-1` },
    ],
    targetedMisconceptions: [`${ODE}:MC-1`],
    source: eb(ODE, 'Discovery Question 1 as a detection probe (verbatim) — whether y=5 is a valid candidate solution for y\'=2x, an answer of "yes" confirming SOLUTION-IS-A-NUMBER'),
  },
  {
    conceptId: ODE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "In (y'')³+y'=0, is the '3' the order or the degree?",
    choices: [
      { text: "The degree — the highest-order derivative present is y'' (order 2, counted by its prime marks), and the exponent 3 is the power that derivative is raised to (its degree); order and degree are read off the same symbol but answer different questions", isCorrect: true },
      { text: "The order — the '3' in (y'')³ directly gives the order of the differential equation", isCorrect: false, misconceptionId: `${ODE}:MC-2` },
      { text: "The order, since the highest exponent appearing anywhere in the equation always determines how many times the equation must be differentiated", isCorrect: false, misconceptionId: `${ODE}:MC-2` },
    ],
    targetedMisconceptions: [`${ODE}:MC-2`],
    source: eb(ODE, 'Discovery Question 2 as a detection probe (verbatim) — whether the \'3\' in (y\'\')³+y\'=0 is the order or the degree, an answer of "order" confirming ORDER-VERSUS-DEGREE'),
  },
  {
    conceptId: ODE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How many arbitrary constants should the general solution of a third-order ODE contain?',
    choices: [
      { text: 'Exactly 3 — each integration needed to solve an n-th order ODE introduces one constant, so a third-order ODE requires exactly 3 integrations and therefore exactly 3 free constants, one initial/boundary condition needed per constant', isCorrect: true },
      { text: 'The number of constants varies unpredictably and cannot be determined just from knowing the order', isCorrect: false, misconceptionId: `${ODE}:MC-3` },
      { text: "Exactly 1, since a general solution only ever needs a single arbitrary constant regardless of the equation's order", isCorrect: false, misconceptionId: `${ODE}:MC-3` },
    ],
    targetedMisconceptions: [`${ODE}:MC-3`],
    source: eb(ODE, 'Discovery Question 3 as a detection probe (verbatim) — how many arbitrary constants a third-order ODE\'s general solution should contain, an incorrect count confirming GENERAL-PARTICULAR-CONFLATED'),
  },
]
