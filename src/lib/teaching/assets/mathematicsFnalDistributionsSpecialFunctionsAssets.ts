/**
 * Batch: distributions, special-functions (math.fnal) — 16/18 -> 18/18,
 * COMPLETING the domain.
 *
 * Fresh Phase 0 frontier recompute after riesz-representation, compact-
 * operator-spectrum, and fourier-transform were authored: both remaining
 * math.fnal concepts became ready simultaneously (distributions off
 * dual-space-functional; special-functions off hilbert-space), so this
 * batch closes the ENTIRE 18-concept math.fnal domain.
 * Transcribed from their frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.fnal.distributions.md and
 * math.fnal.special-functions.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching this domain's established
 * baseline throughout.
 *
 * distributions' cross-link (math.de.greens-function) is authored.
 * special-functions' two cross-links (math.de.bessel-equation,
 * math.de.legendre-equation) are both authored — genuine transfer
 * targets.
 *
 * Both EB entries register exactly 3 formal misconceptions each (full
 * contract, no retargeting needed).
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const DISTRIBUTIONS = 'math.fnal.distributions'
const SPECIAL_FUNCTIONS = 'math.fnal.special-functions'

export const MATHEMATICS_FNAL_DISTRIBUTIONS_SPECIAL_FUNCTIONS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DISTRIBUTIONS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE DIRAC DELTA IS A RIGOROUS LINEAR FUNCTIONAL — NEVER AN ORDINARY FUNCTION, JUST HARD TO '
      + 'DESCRIBE: δ(φ)=φ(0) satisfies δ(aφ+bψ)=(aφ+bψ)(0)=aφ(0)+bφ(0)=aδ(φ)+bδ(ψ) — perfectly '
      + 'linear, exactly the condition established for functionals generally. No ordinary function '
      + 'is zero everywhere except one point yet integrates to 1 there — δ was never trying and '
      + 'failing to be such a function. Believing the Dirac delta is an ordinary function that '
      + 'happens to be hard to describe is WRONG — it is a genuinely DIFFERENT kind of rigorous '
      + 'object: a linear functional on test functions.\n\n'
      + 'EVERY LOCALLY INTEGRABLE FUNCTION EMBEDS AS A DISTRIBUTION — NEVER A DISCONNECTED '
      + 'FRAMEWORK: for f(x)=x², the functional that integrates x² times φ(x) is linear in φ by '
      + 'linearity of integration, built DIRECTLY from the ordinary function f, with NO information '
      + 'lost (different f\'s give different such functionals). Believing distribution theory is a '
      + 'wholly separate, disconnected framework from ordinary functions is WRONG — every ordinary '
      + 'locally integrable function embeds directly as a distribution; distribution theory '
      + 'properly CONTAINS ordinary function theory as a special case, never replaces or ignores '
      + 'it.\n\n'
      + 'THE WEAK DERIVATIVE MAKES DIFFERENTIATION ALWAYS POSSIBLE — NEVER ASSUME A JUMP HAS NO '
      + 'DERIVATIVE AT ALL: the Heaviside step function H(x) has NO ordinary derivative at x=0. Its '
      + 'weak derivative, computed by integration by parts (shifting the derivative onto the test '
      + 'function), works out to exactly δ — so H\'=δ DISTRIBUTIONALLY. Ordinary calculus has '
      + 'NOTHING to say at x=0, but the weak derivative — shifting the derivative onto the always-'
      + 'smooth test function via integration by parts — handles the jump cleanly. Believing a '
      + 'function with a jump discontinuity simply has no derivative in any sense is WRONG — the '
      + 'weak derivative is ALWAYS well-defined for distributions, with no exceptions.',
    targetedMisconceptions: [`${DISTRIBUTIONS}:MC-1`, `${DISTRIBUTIONS}:MC-2`, `${DISTRIBUTIONS}:MC-3`],
    source: eb(DISTRIBUTIONS, 'Core Understanding — the Dirac delta being a rigorous linear functional never an ordinary function, every locally integrable function embedding as a distribution never a disconnected framework, and the weak derivative making differentiation always possible never assuming a jump has no derivative at all'),
  },
  {
    conceptId: SPECIAL_FUNCTIONS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Γ(n+1)=n! HOLDS VIA THE SAME RECURSIVE RELATION — NEVER A COINCIDENTAL NUMERIC MATCH: '
      + 'Γ(1) (the integral of e^(−t) from 0 to ∞) equals 1=0!. Integration by parts on Γ(2) (the '
      + 'integral of t·e^(−t)) gives Γ(2)=1=1!. By the SAME pattern, Γ(n+1)=n·Γ(n) — EXACTLY the '
      + 'recursive relation defining factorial itself (n!=n·(n−1)!) — so Γ(n+1)=n! for every non-'
      + 'negative integer n, by induction, not coincidence. Believing Γ(n+1)=n! is a coincidental '
      + 'numeric match, with Γ\'s integral definition being fundamentally unrelated to how factorial '
      + 'is actually defined, is WRONG — the SAME recursive relation underlies both, forcing the '
      + 'agreement step by step; the integral definition also extends naturally to non-integer '
      + 'arguments, unlike factorial itself.\n\n'
      + 'BESSEL FUNCTIONS AND ORTHOGONAL POLYNOMIALS ARE ONE UNIFIED CLASS — NEVER FUNDAMENTALLY '
      + 'DIFFERENT KINDS OF SPECIAL FUNCTIONS: Bessel functions arise from a Sturm-Liouville-type '
      + 'equation and form an orthonormal basis in a weighted L² space. Legendre polynomials arise '
      + 'from a DIFFERENT equation on [−1,1] (weight 1), and ALSO form an orthonormal basis in their '
      + 'own weighted L² space. Despite looking superficially unrelated (a Bessel function and a '
      + 'polynomial), BOTH are Sturm-Liouville eigenfunctions, both used identically via the SAME '
      + 'coefficient-expansion formula. Believing Bessel functions and the orthogonal-polynomial '
      + 'families are fundamentally different, unrelated kinds of special functions is WRONG — both '
      + 'arise as eigenfunctions of Sturm-Liouville problems, one unified class, structurally the '
      + 'same kind of object despite superficial dissimilarity.\n\n'
      + 'DIFFERENT DOMAINS AND WEIGHTS PRODUCE DIFFERENT NAMED FAMILIES — NEVER INDEPENDENTLY '
      + 'INVENTED CONSTRUCTIONS: Hermite polynomials arise on the whole real line with weight '
      + 'e^(−x²); Laguerre on [0,∞) with weight e^(−x); Legendre on [−1,1] with weight 1. THREE '
      + 'different domains, THREE different weights, THREE different named families — each an '
      + 'instance of the SAME Sturm-Liouville-eigenfunction-orthonormal-basis construction, varied '
      + 'only by domain and weight choice. Believing the named polynomial families were each '
      + 'independently invented, using fundamentally different mathematical constructions, is WRONG '
      + '— all arise from the SAME construction pattern, instantiated with different domain/weight '
      + 'choices; the entire catalogue is one recipe, run many times.',
    targetedMisconceptions: [`${SPECIAL_FUNCTIONS}:MC-1`, `${SPECIAL_FUNCTIONS}:MC-2`, `${SPECIAL_FUNCTIONS}:MC-3`],
    source: eb(SPECIAL_FUNCTIONS, 'Core Understanding — Gamma(n+1)=n! holding via the same recursive relation never a coincidental numeric match, Bessel functions and orthogonal polynomials being one unified class of Sturm-Liouville eigenfunctions, and different domains and weights producing different named families never independently invented constructions'),
  },
]

export const MATHEMATICS_FNAL_DISTRIBUTIONS_SPECIAL_FUNCTIONS_PROBES: SeedProbe[] = [
  {
    conceptId: DISTRIBUTIONS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the Dirac delta an ordinary function that happens to be hard to describe, or a fundamentally different kind of mathematical object?',
    choices: [
      { text: "A fundamentally different kind of object — δ(φ)=φ(0) is a genuinely rigorous LINEAR FUNCTIONAL on test functions, verified by direct linearity (δ(aφ+bψ)=aδ(φ)+bδ(ψ)); no ordinary function is zero everywhere except one point yet integrates to 1 there, so δ was never trying and failing to be such a function", isCorrect: true },
      { text: "The Dirac delta is an ordinary function, just one that happens to be difficult to describe using standard formulas", isCorrect: false, misconceptionId: `${DISTRIBUTIONS}:MC-1` },
      { text: "Since δ is often first introduced informally as \"a function that's infinite at 0 and zero elsewhere,\" that pointwise-function reading should be treated as accurate", isCorrect: false, misconceptionId: `${DISTRIBUTIONS}:MC-1` },
    ],
    targetedMisconceptions: [`${DISTRIBUTIONS}:MC-1`],
    source: eb(DISTRIBUTIONS, 'Discovery Question 1 as a detection probe (verbatim) — whether the Dirac delta is an ordinary function or a fundamentally different object, an answer treating it as an ordinary function confirming DELTA-ASSUMED-ORDINARY-FUNCTION'),
  },
  {
    conceptId: DISTRIBUTIONS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is distribution theory a completely separate, disconnected framework from ordinary function theory?',
    choices: [
      { text: "No — every ordinary locally integrable function embeds directly as a distribution; for f(x)=x², the functional integrating x² against a test function is linear and built directly from f with NO information lost, so distribution theory properly CONTAINS ordinary function theory as a special case", isCorrect: true },
      { text: "Yes, distribution theory is a wholly separate, disconnected framework with no direct connection to ordinary functions", isCorrect: false, misconceptionId: `${DISTRIBUTIONS}:MC-2` },
      { text: "Since distributions are often introduced as a wholly new abstract apparatus, they should be treated as unrelated to ordinary function theory", isCorrect: false, misconceptionId: `${DISTRIBUTIONS}:MC-2` },
    ],
    targetedMisconceptions: [`${DISTRIBUTIONS}:MC-2`],
    source: eb(DISTRIBUTIONS, 'Discovery Question 2 as a detection probe (verbatim) — whether distribution theory is disconnected from ordinary function theory, an answer of "yes" confirming DISTRIBUTIONS-ASSUMED-DISCONNECTED-FROM-FUNCTIONS'),
  },
  {
    conceptId: DISTRIBUTIONS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does a function with a jump discontinuity, like the Heaviside function, simply have no derivative at all, full stop?',
    choices: [
      { text: "No — the weak derivative is ALWAYS well-defined for distributions; the Heaviside function H(x) has no ordinary derivative at x=0, but its weak derivative (computed via integration by parts, shifting the derivative onto the smooth test function) works out to exactly the Dirac delta, so H'=δ rigorously", isCorrect: true },
      { text: "Yes, a function with a jump discontinuity simply has no derivative at all, in any rigorous sense", isCorrect: false, misconceptionId: `${DISTRIBUTIONS}:MC-3` },
      { text: "Since the ordinary derivative fails at a jump, that should mean no notion of derivative can possibly succeed there", isCorrect: false, misconceptionId: `${DISTRIBUTIONS}:MC-3` },
    ],
    targetedMisconceptions: [`${DISTRIBUTIONS}:MC-3`],
    source: eb(DISTRIBUTIONS, 'Discovery Question 3 as a detection probe (verbatim) — whether a jump discontinuity has no derivative at all, an answer of "yes" confirming JUMP-ASSUMED-TO-HAVE-NO-DERIVATIVE-AT-ALL'),
  },
  {
    conceptId: SPECIAL_FUNCTIONS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "Is Γ(n+1)=n! a coincidental numeric match, with Γ's integral definition being fundamentally unrelated to how factorial is actually defined?",
    choices: [
      { text: "No — the SAME recursive relation underlies both: Γ(n+1)=n·Γ(n) is EXACTLY factorial's own recursive definition n!=n·(n−1)!; verified step by step from Γ(1)=1=0! and Γ(2)=1=1!, the agreement is forced by induction, never a coincidence", isCorrect: true },
      { text: "Yes, Γ(n+1)=n! is a coincidental numeric match, since Γ's integral definition is fundamentally unrelated to how factorial is actually defined", isCorrect: false, misconceptionId: `${SPECIAL_FUNCTIONS}:MC-1` },
      { text: "Since the integral formula for Γ looks unrelated to factorial's recursive definition on the surface, the numeric agreement at integers should be treated as coincidental", isCorrect: false, misconceptionId: `${SPECIAL_FUNCTIONS}:MC-1` },
    ],
    targetedMisconceptions: [`${SPECIAL_FUNCTIONS}:MC-1`],
    source: eb(SPECIAL_FUNCTIONS, 'Discovery Question 1 as a detection probe (verbatim) — whether Gamma(n+1)=n! is a coincidental match, an answer of "yes, coincidental" confirming GAMMA-ASSUMED-COINCIDENTAL-MATCH'),
  },
  {
    conceptId: SPECIAL_FUNCTIONS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Are Bessel functions and the orthogonal-polynomial families fundamentally different, unrelated kinds of special functions?',
    choices: [
      { text: "No — both arise as eigenfunctions of Sturm-Liouville problems, one unified class; Bessel functions and Legendre polynomials look superficially unrelated but are structurally the SAME kind of object, both used via the identical coefficient-expansion formula", isCorrect: true },
      { text: "Yes, Bessel functions and orthogonal polynomials are fundamentally different, unrelated kinds of special functions", isCorrect: false, misconceptionId: `${SPECIAL_FUNCTIONS}:MC-2` },
      { text: "Since a Bessel function and a polynomial look completely different on the surface, they should be treated as genuinely different kinds of mathematical objects", isCorrect: false, misconceptionId: `${SPECIAL_FUNCTIONS}:MC-2` },
    ],
    targetedMisconceptions: [`${SPECIAL_FUNCTIONS}:MC-2`],
    source: eb(SPECIAL_FUNCTIONS, 'Discovery Question 2 as a detection probe (verbatim) — whether Bessel functions and orthogonal polynomials are unrelated kinds of special functions, an answer of "yes" confirming BESSEL-AND-POLYNOMIALS-ASSUMED-UNRELATED'),
  },
  {
    conceptId: SPECIAL_FUNCTIONS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Were the Hermite, Laguerre, Legendre, and Chebyshev polynomial families each independently invented, using fundamentally different mathematical constructions?',
    choices: [
      { text: "No — all arise from the SAME Sturm-Liouville-eigenfunction construction, varied only by domain and weight: Hermite on the whole real line with weight e^(−x²), Laguerre on [0,∞) with weight e^(−x), Legendre on [−1,1] with weight 1 — one recipe, run many times", isCorrect: true },
      { text: "Yes, the named polynomial families were each independently invented, using fundamentally different mathematical constructions", isCorrect: false, misconceptionId: `${SPECIAL_FUNCTIONS}:MC-3` },
      { text: "Since each polynomial family is typically taught in its own separate unit, that should indicate each one arose from a genuinely distinct mathematical construction", isCorrect: false, misconceptionId: `${SPECIAL_FUNCTIONS}:MC-3` },
    ],
    targetedMisconceptions: [`${SPECIAL_FUNCTIONS}:MC-3`],
    source: eb(SPECIAL_FUNCTIONS, 'Discovery Question 3 as a detection probe (verbatim) — whether the named polynomial families were independently invented, an answer of "yes" confirming POLYNOMIAL-FAMILIES-ASSUMED-INDEPENDENTLY-INVENTED'),
  },
]
