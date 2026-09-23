/**
 * Batch: cauchy-sequence, lipschitz-continuity, uniform-convergence
 * (math.real).
 *
 * Fresh Phase 0 frontier recompute after the extreme-value-theorem/
 * taylor-rigorous/ftc-rigorous batch found 8 ready concepts; this batch
 * selects cauchy-sequence (requires convergence-sequences, already
 * authored), lipschitz-continuity (closes uniform-continuity's own
 * declared unlock), and uniform-convergence (unlocks math.real.
 * weierstrass-approximation, the next concept in that chain).
 * implicit-function-theorem, inverse-function-theorem, pointwise-
 * convergence, riemann-integrability, and series-rigorous remain ready
 * and are deferred to the next batch. Transcribed from the frozen
 * Educational Brain entries at educational-brain/concepts/mathematics/
 * math.real.{cauchy-sequence,lipschitz-continuity,uniform-convergence}.md.
 *
 * Grade band: all three adopt GradeBand.UNDERGRADUATE, continuing math.real's
 * established domain baseline.
 *
 *   CAUCHY-SEQUENCE  The Cauchy criterion is defined purely from the
 *           sequence's own terms — it NEVER requires a known limit first,
 *           which is exactly what makes it practically checkable for
 *           certifying convergence before a limit is identified in closed
 *           form; Cauchy-implies-convergent is a SPECIAL fact about
 *           complete spaces, NEVER a universal property — it genuinely
 *           fails within the rationals; and Cauchy is NEVER the same as
 *           merely consecutive terms shrinking — ALL sufficiently late
 *           pairs must be close, not just neighboring ones.
 *   LIPSCHITZ-CONTINUITY  A Lipschitz constant is directly computable from
 *           a derivative bound via the Mean Value Theorem, NEVER merely an
 *           abstract existence claim; Lipschitz implies uniform continuity
 *           via an EXPLICIT formula for delta, NEVER a non-constructive
 *           existence argument; and Lipschitz continuity is STRICTLY
 *           STRONGER than uniform continuity — the square-root function on
 *           $[0,1]$ is uniformly continuous yet NEVER Lipschitz there.
 *   UNIFORM-CONVERGENCE  Uniform convergence demands ONE N working for
 *           every point at once, NEVER a fresh N per point the way
 *           pointwise convergence allows; uniform convergence is what
 *           actually PRESERVES continuity — a pointwise limit of
 *           continuous functions can genuinely be discontinuous; and
 *           termwise integration needs only the functions to converge
 *           uniformly, while termwise differentiation needs the
 *           DERIVATIVES to converge uniformly — a separate, NEVER
 *           automatic, stronger requirement.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const CAUCHY_SEQUENCE = 'math.real.cauchy-sequence'
const LIPSCHITZ_CONTINUITY = 'math.real.lipschitz-continuity'
const UNIFORM_CONVERGENCE = 'math.real.uniform-convergence'

export const MATHEMATICS_REAL_CAUCHY_SEQUENCE_LIPSCHITZ_CONTINUITY_UNIFORM_CONVERGENCE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CAUCHY_SEQUENCE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "CAUCHY IS DEFINED PURELY FROM THE SEQUENCE'S OWN TERMS, NEVER REQUIRING A KNOWN LIMIT "
      + 'FIRST: for $a_n=1/n$, given $\\varepsilon>0$, choosing a large enough $N$ gives, for '
      + 'both indices past $N$: the terms\' distance is less than $\\varepsilon$ — verified using '
      + 'ONLY the terms\' relationship to each other, with NO mention of the limit 0 anywhere in '
      + 'the argument. This directly reuses the epsilon-N template from ordinary convergence, '
      + 'substituting "terms close to each other" for "terms close to L."\n\n'
      + 'CAUCHY CERTIFIES CONVERGENCE WITHOUT EVER NAMING THE LIMIT — THE ENTIRE PRACTICAL POINT '
      + 'OF THE DEFINITION: for the Newton\'s-method recursion approximating $\\sqrt2$, showing '
      + 'directly from the recursion that consecutive terms shrink geometrically establishes the '
      + 'Cauchy condition — and hence, by the Cauchy Criterion, CONVERGENCE — before ever '
      + 'identifying the limit in closed form. Many real problems (recursive sequences, '
      + 'iterative numerical methods) make this the ONLY practical route to certifying '
      + 'convergence.\n\n'
      + 'CAUCHY IMPLIES CONVERGENT IS A SPECIAL FACT ABOUT COMPLETE SPACES, NEVER A UNIVERSAL '
      + 'PROPERTY: in R, Cauchy implies convergent, by completeness. But the decimal truncations '
      + '1.4, 1.41, 1.414, ... (successive approximations to $\\sqrt2$) form a Cauchy sequence OF '
      + 'RATIONAL NUMBERS (consecutive terms differ by at most a shrinking power of 10), yet its '
      + 'limit $\\sqrt2$ is irrational — the sequence does NOT converge WITHIN the rationals, '
      + 'even though it is Cauchy there. This proves the equivalence genuinely depends on '
      + 'completeness: true in R precisely because R has no "holes," false in the rationals, '
      + 'which have a hole exactly where $\\sqrt2$ should be.',
    targetedMisconceptions: [`${CAUCHY_SEQUENCE}:MC-1`, `${CAUCHY_SEQUENCE}:MC-2`, `${CAUCHY_SEQUENCE}:MC-3`],
    source: eb(CAUCHY_SEQUENCE, "Core Understanding — Cauchy being defined purely from the sequence's own terms never requiring a known limit first, Cauchy certifying convergence without ever naming the limit, and Cauchy implies convergent being a special fact about complete spaces never a universal property"),
  },
  {
    conceptId: LIPSCHITZ_CONTINUITY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE LIPSCHITZ CONSTANT IS DIRECTLY COMPUTABLE FROM A DERIVATIVE BOUND, NEVER JUST AN '
      + 'ABSTRACT EXISTENCE CLAIM: for $f(x)=\\sin x$: the derivative is $\\cos x$, bounded by 1 '
      + 'for ALL $x$ — by the Mean Value Theorem, the difference in sine values equals the '
      + 'cosine at some intermediate point times the difference in inputs, so a Lipschitz '
      + 'constant of 1 is valid, DIRECTLY handed by the derivative bound, never an existence '
      + 'claim to be argued abstractly.\n\n'
      + 'LIPSCHITZ IMPLIES UNIFORMLY CONTINUOUS, PROVEN CONSTRUCTIVELY WITH AN EXPLICIT DELTA: '
      + 'given the Lipschitz bound with constant $L$, choosing $\\delta=\\varepsilon/L$ gives: '
      + 'whenever the inputs are within $\\delta$, the outputs are within $L\\cdot\\delta$, which '
      + 'equals exactly $\\varepsilon$ — exactly the uniform-continuity requirement, satisfied '
      + 'with an EXPLICIT formula for delta, never merely an abstract "some delta exists" '
      + 'argument. For sin with $L=1$ and $\\varepsilon=0.01$: $\\delta=0.01$ exactly, verified '
      + 'directly.\n\n'
      + 'LIPSCHITZ IS STRICTLY STRONGER THAN UNIFORM CONTINUITY — THE SQUARE ROOT FUNCTION ON '
      + '[0,1] SEPARATES THE TWO: Heine-Cantor already guarantees $\\sqrt x$ is uniformly '
      + 'continuous on the compact [0,1]. But $\\sqrt x$ is NOT Lipschitz there: testing points '
      + 'approaching 0, the ratio of output-change to input-change GROWS WITHOUT BOUND, so no '
      + 'finite Lipschitz constant can work, even though the function remains perfectly '
      + 'uniformly continuous. The implication chain runs in only ONE direction: Lipschitz '
      + 'implies uniformly continuous implies continuous, each arrow strict.',
    targetedMisconceptions: [`${LIPSCHITZ_CONTINUITY}:MC-1`, `${LIPSCHITZ_CONTINUITY}:MC-2`, `${LIPSCHITZ_CONTINUITY}:MC-3`],
    source: eb(LIPSCHITZ_CONTINUITY, 'Core Understanding — the Lipschitz constant being directly computable from a derivative bound never just an abstract existence claim, Lipschitz implying uniformly continuous proven constructively with an explicit delta, and Lipschitz being strictly stronger than uniform continuity since the square root function separates the two'),
  },
  {
    conceptId: UNIFORM_CONVERGENCE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'UNIFORM CONVERGENCE DEMANDS ONE N FOR EVERY POINT AT ONCE: for $f_n(x)=x^n$ on [0,1): at '
      + 'x=0.5, a moderate N suffices; at x=0.9, the SAME accuracy needs a much larger N; as x '
      + 'approaches 1 from below, the needed N grows without bound. Indeed the supremum distance '
      + 'between $f_n$ and 0 stays exactly 1 for EVERY n — the supremum distance NEVER shrinks '
      + 'below 1. So $f_n$ converges to 0 POINTWISE (each individual x converges) but NOT '
      + 'uniformly (no single N controls every point at once).\n\n'
      + 'UNIFORM CONVERGENCE IS WHAT ACTUALLY PRESERVES CONTINUITY — POINTWISE IS NOT ENOUGH: '
      + 'extending $f_n(x)=x^n$ to [0,1]: each $f_n$ is continuous, but the pointwise limit is 0 '
      + 'for x in [0,1) and 1 at x=1 — DISCONTINUOUS at x=1, despite every term being '
      + 'continuous. This is possible precisely because the convergence is only pointwise: the '
      + 'continuity-preservation theorem\'s hypothesis (uniform convergence) genuinely fails '
      + 'here, so its conclusion correctly fails too.\n\n'
      + 'TERMWISE INTEGRATION NEEDS UNIFORM CONVERGENCE OF THE FUNCTIONS; TERMWISE '
      + 'DIFFERENTIATION NEEDS UNIFORM CONVERGENCE OF THE DERIVATIVES — A SEPARATE, STRONGER '
      + 'CONDITION: for $g_n(x)=\\sin(nx)/\\sqrt n$: the supremum of $|g_n(x)|$ is '
      + '$(1/\\sqrt n)$, which tends to 0, so $g_n$ converges to 0 UNIFORMLY — termwise '
      + 'integration is valid. But the derivative $g_n\'(x)=\\sqrt n\\cos(nx)$ has supremum '
      + '$\\sqrt n$, which tends to infinity — the DERIVATIVES do NOT converge uniformly (they '
      + 'do not converge at all). So even though $g_n$ converges to 0 uniformly, one CANNOT '
      + 'conclude the derivatives converge to 0 — termwise differentiation\'s separate, stronger '
      + 'hypothesis genuinely fails, correctly blocking a false conclusion.',
    targetedMisconceptions: [`${UNIFORM_CONVERGENCE}:MC-1`, `${UNIFORM_CONVERGENCE}:MC-2`, `${UNIFORM_CONVERGENCE}:MC-3`],
    source: eb(UNIFORM_CONVERGENCE, 'Core Understanding — uniform convergence demanding one N for every point at once never a fresh N per point, uniform convergence being what actually preserves continuity while pointwise is not enough, and termwise integration needing uniform convergence of the functions while termwise differentiation needs uniform convergence of the derivatives as a separate stronger condition'),
  },
]

export const MATHEMATICS_REAL_CAUCHY_SEQUENCE_LIPSCHITZ_CONTINUITY_UNIFORM_CONVERGENCE_PROBES: SeedProbe[] = [
  {
    conceptId: CAUCHY_SEQUENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'To prove a sequence is Cauchy, do you first need to know what it converges to?',
    choices: [
      { text: 'No — proving a_n=1/n is Cauchy uses only the relationship between terms a_m and a_n, with no mention of the limit 0 anywhere; this is exactly what makes Cauchy practically checkable before a limit is even known', isCorrect: true },
      { text: 'Yes — you must first identify or know the limit before you can check whether a sequence is Cauchy', isCorrect: false, misconceptionId: `${CAUCHY_SEQUENCE}:MC-1` },
      { text: "Yes, since the Cauchy definition explicitly references the sequence's limit value", isCorrect: false, misconceptionId: `${CAUCHY_SEQUENCE}:MC-1` },
    ],
    targetedMisconceptions: [`${CAUCHY_SEQUENCE}:MC-1`],
    source: eb(CAUCHY_SEQUENCE, 'Discovery Question 1 as a detection probe (verbatim) — whether the limit must be known before checking Cauchy, an answer of "yes" confirming LIMIT-REQUIRED-BEFORE-CAUCHY-CHECK'),
  },
  {
    conceptId: CAUCHY_SEQUENCE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is every Cauchy sequence convergent, in any set of numbers you pick it from?',
    choices: [
      { text: 'No — the decimal truncations toward √2 form a Cauchy sequence of rational numbers, yet √2 is irrational, so the sequence does not converge within Q; Cauchy-implies-convergent is a special consequence of completeness, true in R but false in Q', isCorrect: true },
      { text: 'Yes — every Cauchy sequence converges within whatever set of numbers it is drawn from', isCorrect: false, misconceptionId: `${CAUCHY_SEQUENCE}:MC-2` },
      { text: "Yes, since being Cauchy is mathematically equivalent to convergence in any ordered field", isCorrect: false, misconceptionId: `${CAUCHY_SEQUENCE}:MC-2` },
    ],
    targetedMisconceptions: [`${CAUCHY_SEQUENCE}:MC-2`],
    source: eb(CAUCHY_SEQUENCE, 'Discovery Question 2 as a detection probe (verbatim) — whether every Cauchy sequence is convergent in any set of numbers, an answer of "yes" confirming CAUCHY-CONVERGENT-EQUIVALENCE-TREATED-AS-UNIVERSAL'),
  },
  {
    conceptId: CAUCHY_SEQUENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does it suffice to check that consecutive terms get close together, or must ALL sufficiently late pairs be close?',
    choices: [
      { text: 'ALL sufficiently late pairs must be close — the harmonic sum has consecutive gaps shrinking to 0, yet the sum from n to 2n stays at least 1/2 forever, so it is NOT Cauchy despite shrinking consecutive gaps', isCorrect: true },
      { text: 'Consecutive terms getting close is sufficient — that alone establishes the Cauchy condition', isCorrect: false, misconceptionId: `${CAUCHY_SEQUENCE}:MC-3` },
      { text: "Consecutive closeness is sufficient, since any sequence with shrinking neighbor gaps must eventually have all pairs close too", isCorrect: false, misconceptionId: `${CAUCHY_SEQUENCE}:MC-3` },
    ],
    targetedMisconceptions: [`${CAUCHY_SEQUENCE}:MC-3`],
    source: eb(CAUCHY_SEQUENCE, 'Discovery Question 3 as a detection probe (verbatim) — whether consecutive-term closeness suffices for Cauchy, an answer of "yes, sufficient" confirming CAUCHY-CONFUSED-WITH-CONSECUTIVE-TERMS-SHRINKING'),
  },
  {
    conceptId: LIPSCHITZ_CONTINUITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is finding a Lipschitz constant typically an abstract existence argument, or can it usually be computed directly from a derivative bound?',
    choices: [
      { text: 'It can usually be computed directly — for sin x, the derivative cos x is bounded by 1 everywhere, so by the Mean Value Theorem, L=1 is a valid Lipschitz constant, handed directly by the derivative bound', isCorrect: true },
      { text: 'It is typically an abstract existence argument, requiring proving a constant exists without computing it directly', isCorrect: false, misconceptionId: `${LIPSCHITZ_CONTINUITY}:MC-1` },
      { text: "It is always abstract, since Lipschitz constants cannot be derived from derivative bounds", isCorrect: false, misconceptionId: `${LIPSCHITZ_CONTINUITY}:MC-1` },
    ],
    targetedMisconceptions: [`${LIPSCHITZ_CONTINUITY}:MC-1`],
    source: eb(LIPSCHITZ_CONTINUITY, 'Discovery Question 1 as a detection probe (verbatim) — whether finding a Lipschitz constant is abstract or computable from a derivative bound, an answer of "abstract" confirming LIPSCHITZ-CONSTANT-ASSUMED-ABSTRACT'),
  },
  {
    conceptId: LIPSCHITZ_CONTINUITY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does proving Lipschitz implies uniform continuity require a non-constructive argument, or can an explicit δ be given directly?',
    choices: [
      { text: 'An explicit δ can be given directly — choosing δ=ε/L satisfies the uniform continuity condition exactly, verified numerically for sin x with L=1 and ε=0.01 giving δ=0.01, never merely an abstract existence claim', isCorrect: true },
      { text: 'It requires a non-constructive argument — no explicit formula for δ can be given in terms of ε and L', isCorrect: false, misconceptionId: `${LIPSCHITZ_CONTINUITY}:MC-2` },
      { text: "It requires a non-constructive argument, since Lipschitz continuity itself is only an abstract existence statement", isCorrect: false, misconceptionId: `${LIPSCHITZ_CONTINUITY}:MC-2` },
    ],
    targetedMisconceptions: [`${LIPSCHITZ_CONTINUITY}:MC-2`],
    source: eb(LIPSCHITZ_CONTINUITY, 'Discovery Question 2 as a detection probe (verbatim) — whether Lipschitz-to-uniform-continuity requires a non-constructive argument, an answer of "yes" confirming LIPSCHITZ-TO-UNIFORM-CONTINUITY-ASSUMED-NON-CONSTRUCTIVE'),
  },
  {
    conceptId: LIPSCHITZ_CONTINUITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does every uniformly continuous function on a compact domain automatically satisfy a Lipschitz condition?',
    choices: [
      { text: 'No — √x on [0,1] is uniformly continuous by Heine-Cantor, but testing points approaching 0 shows the difference-quotient ratio grows without bound, so no finite Lipschitz constant works; Lipschitz is strictly stronger', isCorrect: true },
      { text: 'Yes — uniform continuity on a compact domain always guarantees a Lipschitz condition holds', isCorrect: false, misconceptionId: `${LIPSCHITZ_CONTINUITY}:MC-3` },
      { text: "Yes, since compactness and uniform continuity together are equivalent to the Lipschitz property", isCorrect: false, misconceptionId: `${LIPSCHITZ_CONTINUITY}:MC-3` },
    ],
    targetedMisconceptions: [`${LIPSCHITZ_CONTINUITY}:MC-3`],
    source: eb(LIPSCHITZ_CONTINUITY, 'Discovery Question 3 as a detection probe (verbatim) — whether uniform continuity on a compact domain implies Lipschitz, an answer of "yes" confirming UNIFORM-CONTINUITY-ASSUMED-EQUIVALENT-TO-LIPSCHITZ'),
  },
  {
    conceptId: UNIFORM_CONVERGENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If fₙ(x)→f(x) for every individual x in E, does that automatically mean fₙ→f uniformly on E?',
    choices: [
      { text: 'No — for fₙ(x)=xⁿ on [0,1), the supremum distance from 0 stays exactly 1 for every n, even though each individual point converges; the required N grows without bound as x approaches 1, so convergence is pointwise but not uniform', isCorrect: true },
      { text: 'Yes — pointwise convergence at every point automatically implies uniform convergence on the whole set', isCorrect: false, misconceptionId: `${UNIFORM_CONVERGENCE}:MC-1` },
      { text: "Yes, since convergence being true at every individual point composes into a single uniform guarantee", isCorrect: false, misconceptionId: `${UNIFORM_CONVERGENCE}:MC-1` },
    ],
    targetedMisconceptions: [`${UNIFORM_CONVERGENCE}:MC-1`],
    source: eb(UNIFORM_CONVERGENCE, 'Discovery Question 1 as a detection probe (verbatim) — whether pointwise convergence at every point implies uniform convergence, an answer of "yes" confirming POINTWISE-CONVERGENCE-CONFLATED-WITH-UNIFORM'),
  },
  {
    conceptId: UNIFORM_CONVERGENCE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If every function in a sequence is continuous, must its pointwise limit also be continuous?',
    choices: [
      { text: 'No — fₙ(x)=xⁿ on [0,1] has every term continuous, but the pointwise limit is 0 on [0,1) and 1 at x=1, which is discontinuous at x=1; the continuity-preservation theorem needs UNIFORM convergence, which genuinely fails here', isCorrect: true },
      { text: 'Yes — the pointwise limit of a sequence of continuous functions must always itself be continuous', isCorrect: false, misconceptionId: `${UNIFORM_CONVERGENCE}:MC-2` },
      { text: "Yes, since continuity always passes through any limiting process applied to a sequence of functions", isCorrect: false, misconceptionId: `${UNIFORM_CONVERGENCE}:MC-2` },
    ],
    targetedMisconceptions: [`${UNIFORM_CONVERGENCE}:MC-2`],
    source: eb(UNIFORM_CONVERGENCE, 'Discovery Question 2 as a detection probe (verbatim) — whether the pointwise limit of continuous functions must be continuous, an answer of "yes" confirming POINTWISE-LIMIT-OF-CONTINUOUS-ASSUMED-CONTINUOUS'),
  },
  {
    conceptId: UNIFORM_CONVERGENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "If fₙ→f uniformly, is it automatically valid to conclude fₙ'→f' as well?",
    choices: [
      { text: 'No — gₙ(x)=sin(nx)/√n converges to 0 uniformly (supremum 1/√n→0), but its derivative √n·cos(nx) has supremum √n→∞, never converging; termwise differentiation needs the DERIVATIVES to converge uniformly, a separate condition that can fail', isCorrect: true },
      { text: "Yes — uniform convergence of a function sequence automatically guarantees its derivatives converge to the limit's derivative", isCorrect: false, misconceptionId: `${UNIFORM_CONVERGENCE}:MC-3` },
      { text: "Yes, since differentiation and the limit operation always commute whenever the functions converge uniformly", isCorrect: false, misconceptionId: `${UNIFORM_CONVERGENCE}:MC-3` },
    ],
    targetedMisconceptions: [`${UNIFORM_CONVERGENCE}:MC-3`],
    source: eb(UNIFORM_CONVERGENCE, "Discovery Question 3 as a detection probe (verbatim) — whether uniform convergence of functions is automatically sufficient for termwise differentiation, an answer of \"yes\" confirming UNIFORM-CONVERGENCE-OF-FUNCTIONS-ASSUMED-SUFFICIENT-FOR-TERMWISE-DIFFERENTIATION"),
  },
]
