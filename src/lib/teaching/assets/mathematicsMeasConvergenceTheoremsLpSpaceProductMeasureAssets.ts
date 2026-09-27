/**
 * Batch: convergence-theorems, lp-space, product-measure (math.meas) — 8/13 -> 11/13.
 *
 * Fresh Phase 0 frontier recompute after lebesgue-integral was authored:
 * FOUR direct dependents became ready simultaneously (convergence-
 * theorems, lp-space, product-measure, radon-nikodym). Following the
 * established up-to-3-per-batch convention, this batch closes 3 of the 4
 * (convergence-theorems, lp-space, product-measure), leaving radon-
 * nikodym for the next batch alongside l2-space (which lp-space's own
 * authoring here newly unlocks).
 * Transcribed from their frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.meas.convergence-theorems.md,
 * math.meas.lp-space.md, and math.meas.product-measure.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching this domain's established
 * baseline.
 *
 * convergence-theorems' KG cross-link (math.real.uniform-convergence) and
 * lp-space's two KG cross-links (math.fnal.hilbert-space,
 * math.fnal.normed-space) are NOT authored — both EB entries use
 * independence mode, so their probes stay self-contained. product-
 * measure's KG cross-link (math.calc.double-integrals) IS authored — a
 * genuine transfer target, though not itself referenced by these
 * detection probes (which stay concept-internal per the established
 * probe-authoring convention of targeting the EB's own Discovery
 * Questions).
 *
 * All 3 EB entries register exactly 3 formal misconceptions each (full
 * contract, no retargeting needed).
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const CONVERGENCE_THEOREMS = 'math.meas.convergence-theorems'
const LP_SPACE = 'math.meas.lp-space'
const PRODUCT_MEASURE = 'math.meas.product-measure'

export const MATHEMATICS_MEAS_CONVERGENCE_THEOREMS_LP_SPACE_PRODUCT_MEASURE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CONVERGENCE_THEOREMS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'INTERCHANGING lim AND ∫ IS NEVER AUTOMATIC — MCT SUPPLIES A SPECIFIC SUFFICIENT CONDITION: '
      + 'in general the limit of the integrals need not equal the integral of the limit. For '
      + 'fₙ(x)=min(x,n) on [0,∞): 0≤fₙ increases up to f(x)=x (non-negative, monotone increasing). '
      + 'The MONOTONE CONVERGENCE THEOREM (MCT) GUARANTEES the integral of fₙ converges to the '
      + 'integral of f — here both sides are +∞, consistently — precisely BECAUSE the '
      + 'monotone-increase hypothesis holds, regardless of whether the convergence happens to be '
      + 'uniform.\n\n'
      + "FATOU'S LEMMA GIVES ONLY AN INEQUALITY, WHICH CAN BE GENUINELY STRICT: for fₙ(x)=n on the "
      + 'interval (0,1/n) and 0 elsewhere on [0,1] (a spike of height n, width 1/n, so its integral '
      + 'equals n·(1/n)=1 for every n): pointwise, fₙ(x)→0 for every FIXED x (eventually outside the '
      + 'shrinking spike), so the integral of the pointwise limit is 0. But the limit inferior of '
      + 'the integrals is 1. Fatou\'s inequality 0≤1 HOLDS but is STRICT — mass genuinely escapes to '
      + 'a vanishing set. This sequence FAILS the Dominated Convergence Theorem\'s (DCT) domination '
      + 'hypothesis (no single integrable g bounds every fₙ, since the peak height n→∞) — confirming '
      + 'domination is exactly the extra condition needed to upgrade Fatou\'s inequality to full '
      + 'equality.\n\n'
      + 'MCT, FATOU, AND DCT FORM ONE LOGICAL CHAIN, NEVER THREE INDEPENDENT FACTS: Fatou\'s Lemma '
      + 'is typically PROVED FROM MCT (defining an increasing sequence of infima converging to the '
      + 'liminf, then applying MCT directly to it); DCT is then PROVED FROM Fatou (applying it to '
      + 'both g+fₙ≥0 and g−fₙ≥0, using domination to ensure non-negativity). MCT is the genuine '
      + 'foundation; Fatou and DCT are its logical consequences under progressively different '
      + 'hypotheses.',
    targetedMisconceptions: [`${CONVERGENCE_THEOREMS}:MC-1`, `${CONVERGENCE_THEOREMS}:MC-2`, `${CONVERGENCE_THEOREMS}:MC-3`],
    source: eb(CONVERGENCE_THEOREMS, 'Core Understanding — interchanging limit and integral never being automatic with MCT supplying a specific sufficient condition, Fatou\'s Lemma giving only an inequality which can be genuinely strict, and MCT/Fatou/DCT forming one logical chain never three independent facts'),
  },
  {
    conceptId: LP_SPACE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Lᵖ MEMBERSHIP IS A SPECIFIC FINITE-INTEGRAL CONDITION, NEVER MERE BOUNDEDNESS: on [1,∞), '
      + 'f(x)=1/x: the integral of 1/x from 1 to ∞ DIVERGES (equals ln(x) evaluated to infinity) — '
      + 'so f is NOT in L¹, despite being bounded and decaying to 0. But the integral of 1/x² from 1 '
      + 'to ∞ equals 1, finite — so f IS in L². The SAME function\'s membership genuinely differs '
      + 'between p=1 and p=2, confirming Lᵖ membership is a specific integral condition, never a '
      + 'general "well-behavedness" property.\n\n'
      + 'THE CONJUGATE EXPONENT q IS DETERMINED BY p VIA 1/p+1/q=1, NEVER A FREE CHOICE OR '
      + 'AUTOMATICALLY EQUAL TO p: for p=3: 1/3+1/q=1 gives 1/q=2/3, so q=3/2 — the UNIQUE conjugate '
      + 'exponent. Checking p=q=3 would require 1/3+1/3=2/3≠1 — fails the relationship entirely, '
      + 'confirming q is genuinely determined, never an arbitrary independent parameter.\n\n'
      + 'EVERY Lᵖ IS COMPLETE, BUT ONLY p=2 CARRIES INNER-PRODUCT (HILBERT) STRUCTURE: the '
      + 'Riesz-Fischer theorem guarantees Lᵖ is a genuine Banach space for EVERY 1≤p≤∞ — that part '
      + 'never depends on p. But L²([0,1]) with the inner product of f and g being the integral of '
      + 'their product induces the L² norm exactly — a genuine Hilbert space. For L¹([0,1]): it IS '
      + 'complete (Banach), but NO inner product induces the L¹ norm — a genuine, provable '
      + 'structural difference. Completeness is universal across p; the inner-product bonus is '
      + 'exclusive to p=2.',
    targetedMisconceptions: [`${LP_SPACE}:MC-1`, `${LP_SPACE}:MC-2`, `${LP_SPACE}:MC-3`],
    source: eb(LP_SPACE, 'Core Understanding — Lp membership being a specific finite-integral condition never mere boundedness, the conjugate exponent q being determined by p via 1/p+1/q=1 never a free choice, and every Lp being complete but only p=2 carrying inner-product Hilbert structure'),
  },
  {
    conceptId: PRODUCT_MEASURE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE PRODUCT MEASURE IS THE SAME "MULTIPLY THE PIECES" IDEA ALREADY USED FOR AREA, '
      + 'GENERALIZED TO ANY TWO MEASURE SPACES: for A=[0,2], B=[0,3] with ordinary 1-dimensional '
      + 'Lebesgue measure, the product measure of A×B equals μ₁(A)·μ₂(B)=2×3=6 — EXACTLY the '
      + 'rectangle\'s area, matching the familiar dA=dx·dy computation that double integrals rely on '
      + 'directly. The abstract product-measure construction, applied to ordinary length on each '
      + 'factor, reproduces exactly this familiar area result — never an unrelated new idea.\n\n'
      + "FUBINI'S ABSOLUTE-INTEGRABILITY HYPOTHESIS IS ESSENTIAL WORK, NEVER A FORMALITY TO SKIP: "
      + 'for f(x,y)=xy·e^(−(x²+y²)) on [0,∞)²: verifying the double integral of |f| equals the '
      + 'product of two separate one-dimensional integrals, each equal to 1/2, giving 1/4 — finite — '
      + 'is a NECESSARY prior step BEFORE concluding the iterated integrals agree (both orders give '
      + '1/4). Checking absolute integrability isn\'t a box ticked mechanically — it\'s the specific '
      + 'hypothesis GUARANTEEING switching order is safe.\n\n'
      + 'WITHOUT ABSOLUTE INTEGRABILITY, INTEGRATION ORDER CAN GENUINELY CHANGE THE ANSWER — NEVER '
      + 'MERELY A THEORETICAL WARNING: the classic function (x²−y²)/(x²+y²)² on [0,1]² has one '
      + 'iterated integral equal to π/4 but the other equal to −π/4 — GENUINELY DIFFERENT, because '
      + 'the double integral of |f| diverges to infinity (absolute integrability FAILS). Skipping '
      + 'the absolute-integrability check here produces a demonstrably WRONG, order-dependent '
      + 'answer. Tonelli relaxes this ONLY for non-negative f: both orders always agree (possibly '
      + 'both +∞), no finiteness check needed, since there are no sign issues to create '
      + 'disagreement.',
    targetedMisconceptions: [`${PRODUCT_MEASURE}:MC-1`, `${PRODUCT_MEASURE}:MC-2`, `${PRODUCT_MEASURE}:MC-3`],
    source: eb(PRODUCT_MEASURE, 'Core Understanding — the product measure being the same multiply-the-pieces idea already used for area generalized to any two measure spaces, Fubini\'s absolute-integrability hypothesis being essential work never a formality to skip, and integration order genuinely changing the answer without absolute integrability'),
  },
]

export const MATHEMATICS_MEAS_CONVERGENCE_THEOREMS_LP_SPACE_PRODUCT_MEASURE_PROBES: SeedProbe[] = [
  {
    conceptId: CONVERGENCE_THEOREMS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does swapping lim and ∫ always work automatically for the Lebesgue integral, without any special hypothesis?',
    choices: [
      { text: "No — the interchange is never automatic; the Monotone Convergence Theorem supplies a specific sufficient condition (0≤fₙ increasing to f), as shown by fₙ(x)=min(x,n) on [0,∞) where the limit of the integrals correctly matches the integral of the limit precisely because that monotone-increase hypothesis holds", isCorrect: true },
      { text: "Yes, swapping lim and integral always works automatically for the Lebesgue integral, without needing any special hypothesis", isCorrect: false, misconceptionId: `${CONVERGENCE_THEOREMS}:MC-1` },
      { text: "Since the Lebesgue integral is generally well-behaved, limits should be expected to pass through it without any additional condition being checked", isCorrect: false, misconceptionId: `${CONVERGENCE_THEOREMS}:MC-1` },
    ],
    targetedMisconceptions: [`${CONVERGENCE_THEOREMS}:MC-1`],
    source: eb(CONVERGENCE_THEOREMS, 'Discovery Question 1 as a detection probe (verbatim) — whether swapping limit and integral always works automatically, an answer of "yes" confirming LIM-INT-INTERCHANGE-ASSUMED-AUTOMATIC'),
  },
  {
    conceptId: CONVERGENCE_THEOREMS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "Does Fatou's Lemma guarantee equality, the same way MCT does?",
    choices: [
      { text: "No — Fatou's Lemma gives only an INEQUALITY that can be genuinely STRICT; for the spike sequence fₙ=n on (0,1/n) and 0 elsewhere, the integral of the pointwise limit is 0 but the limit inferior of the integrals is 1, showing real mass can escape in the limit", isCorrect: true },
      { text: "Yes, Fatou's Lemma guarantees full equality between the integral of the liminf and the liminf of the integrals, exactly as MCT does", isCorrect: false, misconceptionId: `${CONVERGENCE_THEOREMS}:MC-2` },
      { text: "Since MCT gives equality under its own hypotheses, Fatou's Lemma should be expected to give the same kind of equality guarantee", isCorrect: false, misconceptionId: `${CONVERGENCE_THEOREMS}:MC-2` },
    ],
    targetedMisconceptions: [`${CONVERGENCE_THEOREMS}:MC-2`],
    source: eb(CONVERGENCE_THEOREMS, 'Discovery Question 2 as a detection probe (verbatim) — whether Fatou\'s Lemma guarantees equality like MCT, an answer of "yes" confirming FATOU-ASSUMED-EQUALITY'),
  },
  {
    conceptId: CONVERGENCE_THEOREMS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Are MCT, Fatou\'s Lemma, and DCT three independent results, each requiring its own separate, unrelated proof?',
    choices: [
      { text: "No — they form ONE logical chain: Fatou's Lemma is typically proved FROM MCT (via an increasing sequence of infima converging to the liminf), and DCT is then proved FROM Fatou (applying it to g+fₙ and g−fₙ, using domination for non-negativity); MCT is the genuine foundation", isCorrect: true },
      { text: "Yes, MCT, Fatou's Lemma, and DCT are three completely independent results, each needing its own separate, unrelated proof", isCorrect: false, misconceptionId: `${CONVERGENCE_THEOREMS}:MC-3` },
      { text: "Since each theorem is typically presented with its own named statement, they should be treated as three independent facts with no derivation relationship between them", isCorrect: false, misconceptionId: `${CONVERGENCE_THEOREMS}:MC-3` },
    ],
    targetedMisconceptions: [`${CONVERGENCE_THEOREMS}:MC-3`],
    source: eb(CONVERGENCE_THEOREMS, 'Discovery Question 3 as a detection probe (verbatim) — whether MCT, Fatou, and DCT are three independent results, an answer of "yes" confirming THREE-THEOREMS-ASSUMED-INDEPENDENT'),
  },
  {
    conceptId: LP_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If a function is bounded and decays to 0, is it automatically in every Lᵖ space?',
    choices: [
      { text: "No — Lᵖ membership requires the specific integral of |f|ᵖ to be finite; f(x)=1/x on [1,∞) is bounded and decays to 0, yet its integral diverges (so f is NOT in L¹) while the integral of 1/x² converges to 1 (so f IS in L²) — the same function's membership genuinely differs by p", isCorrect: true },
      { text: "Yes, if a function is bounded and decays to 0, it is automatically in every Lᵖ space for any p", isCorrect: false, misconceptionId: `${LP_SPACE}:MC-1` },
      { text: "Since bounded, decaying functions feel intuitively well-behaved, that should be sufficient to guarantee membership in every Lᵖ space without checking the specific power", isCorrect: false, misconceptionId: `${LP_SPACE}:MC-1` },
    ],
    targetedMisconceptions: [`${LP_SPACE}:MC-1`],
    source: eb(LP_SPACE, 'Discovery Question 1 as a detection probe (verbatim) — whether a bounded decaying function is automatically in every Lp space, an answer of "yes" confirming LP-MEMBERSHIP-CONFLATED-WITH-BOUNDEDNESS'),
  },
  {
    conceptId: LP_SPACE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is every Lᵖ space, for any p, automatically a Hilbert space with its own inner product?',
    choices: [
      { text: "No — every Lᵖ is complete (Banach, by Riesz-Fischer) for every p, but ONLY p=2 additionally carries inner-product structure; L²([0,1]) has an inner product inducing its norm exactly, while L¹([0,1]) is Banach but NO inner product induces its norm", isCorrect: true },
      { text: "Yes, every Lᵖ space is automatically a Hilbert space with its own inner product, for any value of p", isCorrect: false, misconceptionId: `${LP_SPACE}:MC-2` },
      { text: "Since L² is the most commonly encountered example of an Lᵖ space with an inner product, that inner-product structure should generalize to every other p as well", isCorrect: false, misconceptionId: `${LP_SPACE}:MC-2` },
    ],
    targetedMisconceptions: [`${LP_SPACE}:MC-2`],
    source: eb(LP_SPACE, 'Discovery Question 2 as a detection probe (verbatim) — whether every Lp space is automatically a Hilbert space, an answer of "yes" confirming EVERY-LP-ASSUMED-HILBERT'),
  },
  {
    conceptId: LP_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "For Hölder's inequality, can q be any exponent chosen freely, or must it equal p?",
    choices: [
      { text: "Neither — q is UNIQUELY DETERMINED by p via 1/p+1/q=1; for p=3, solving gives q=3/2 exactly; checking p=q=3 would require 1/3+1/3=2/3≠1, which fails the relationship entirely, so q is neither a free choice nor automatically equal to p", isCorrect: true },
      { text: "The conjugate exponent q can be chosen freely, or alternatively it is automatically equal to p, in Hölder's inequality", isCorrect: false, misconceptionId: `${LP_SPACE}:MC-3` },
      { text: "Since p and q appear together as a pair in the inequality, that pairing suggests they should be equal or interchangeable", isCorrect: false, misconceptionId: `${LP_SPACE}:MC-3` },
    ],
    targetedMisconceptions: [`${LP_SPACE}:MC-3`],
    source: eb(LP_SPACE, 'Discovery Question 3 as a detection probe (verbatim) — whether the conjugate exponent q is free or equal to p, an answer treating it as free or equal confirming CONJUGATE-EXPONENT-Q-ASSUMED-FREE-OR-EQUAL-TO-P'),
  },
  {
    conceptId: PRODUCT_MEASURE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the product measure construction an unrelated new idea, or does it match the familiar width-times-height area computation?',
    choices: [
      { text: "It matches the familiar computation exactly — for A=[0,2], B=[0,3] with ordinary length, the product measure of A×B equals μ₁(A)·μ₂(B)=2×3=6, EXACTLY the rectangle's area, generalizing the same 'multiply the pieces' idea to any two measure spaces", isCorrect: true },
      { text: "The product measure construction is an unrelated new idea, disconnected from the familiar width-times-height area computation", isCorrect: false, misconceptionId: `${PRODUCT_MEASURE}:MC-1` },
      { text: "Since the sigma-algebra and measure notation used in the construction looks abstract, it should be treated as a genuinely different concept from ordinary area", isCorrect: false, misconceptionId: `${PRODUCT_MEASURE}:MC-1` },
    ],
    targetedMisconceptions: [`${PRODUCT_MEASURE}:MC-1`],
    source: eb(PRODUCT_MEASURE, 'Discovery Question 1 as a detection probe (verbatim) — whether the product measure matches the familiar area computation, an answer treating it as unrelated confirming PRODUCT-MEASURE-ASSUMED-UNRELATED-TO-AREA'),
  },
  {
    conceptId: PRODUCT_MEASURE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Can you always switch the order of integration, as long as both iterated integrals happen to be individually computable?',
    choices: [
      { text: "No — Fubini's absolute-integrability check (verifying the double integral of |f| is finite) must be verified FIRST, before concluding the two orders agree; both being individually computable is not sufficient on its own to guarantee they AGREE", isCorrect: true },
      { text: "Yes, integration order can always be switched as long as both iterated integrals are individually computable, with no further check needed", isCorrect: false, misconceptionId: `${PRODUCT_MEASURE}:MC-2` },
      { text: "Since both orders being individually well-defined already means each one produces a valid number, that should be sufficient to guarantee they agree", isCorrect: false, misconceptionId: `${PRODUCT_MEASURE}:MC-2` },
    ],
    targetedMisconceptions: [`${PRODUCT_MEASURE}:MC-2`],
    source: eb(PRODUCT_MEASURE, 'Discovery Question 2 as a detection probe (verbatim) — whether integration order can always be switched when both orders are individually computable, an answer of "yes" confirming ORDER-SWITCHING-ASSUMED-ALWAYS-SAFE'),
  },
  {
    conceptId: PRODUCT_MEASURE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If a function fails the absolute-integrability check, does switching order still typically give the same answer anyway?',
    choices: [
      { text: "No — the classic function (x²−y²)/(x²+y²)² on [0,1]² gives +π/4 in one integration order and −π/4 in the other, GENUINELY DIFFERENT, because its absolute integral diverges to infinity; skipping the check can flip the answer's sign entirely, never harmlessly", isCorrect: true },
      { text: "Yes, switching order still typically gives the same answer even when the absolute-integrability check fails", isCorrect: false, misconceptionId: `${PRODUCT_MEASURE}:MC-3` },
      { text: "Since the function in question looks smooth, it should be safe to reorder the integration regardless of whether the formal absolute-integrability check passes", isCorrect: false, misconceptionId: `${PRODUCT_MEASURE}:MC-3` },
    ],
    targetedMisconceptions: [`${PRODUCT_MEASURE}:MC-3`],
    source: eb(PRODUCT_MEASURE, 'Discovery Question 3 as a detection probe (verbatim) — whether switching order still gives the same answer when absolute integrability fails, an answer of "yes" confirming FAILED-ABSOLUTE-INTEGRABILITY-ASSUMED-HARMLESS'),
  },
]
