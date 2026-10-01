/**
 * Batch: pmf, pdf, distribution (math.prob).
 *
 * Continuing math.prob (26/49 -> 29/49). Fresh frontier recompute after
 * cdf/discrete-rv/continuous-rv's authoring found 5 ready concepts.
 * Selected pmf (closes discrete-rv's own unlock), pdf (closes
 * continuous-rv's own unlock), and distribution (closes random-variable +
 * cdf's joint unlock) — the three concepts directly closing out the
 * previous batch's declared unlocks; leaving quantile and
 * stationary-distribution for a following batch. Transcribed from the
 * frozen Educational Brain entries at educational-brain/concepts/
 * mathematics/math.prob.{pmf,pdf,distribution}.md.
 *
 *   PMF  both PMF axioms (non-negativity, normalization) must hold
 *           SIMULTANEOUSLY, never independently negotiable; unknown PMF
 *           entries are found by SOLVING the normalization equation, never
 *           by default assumptions like uniformity; event probability
 *           sums ONLY the PMF values actually in the event, never a
 *           running cumulative total by default.
 *   PDF  normalization is an INTEGRAL condition, never a point evaluation;
 *           E[X] is the probability-weighted MEAN, never the mode (peak);
 *           variance requires SQUARING the deviation — E[X-μ] is ALWAYS
 *           zero and measures nothing.
 *   DISTRIBUTION  the CDF, PMF, and PDF are EQUIVALENT full specifications,
 *           never different information; a shared summary statistic NEVER
 *           implies a shared distribution; a named distribution applies
 *           only AFTER its assumptions are verified, never on surface
 *           resemblance.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const PMF = 'math.prob.pmf'
const PDF = 'math.prob.pdf'
const DISTRIBUTION = 'math.prob.distribution'

export const MATHEMATICS_PROB_PMF_PDF_DISTRIBUTION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PMF, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'BOTH AXIOMS MUST HOLD SIMULTANEOUSLY — VIOLATING NON-NEGATIVITY TO FIX NORMALIZATION IS '
      + 'NEVER VALID: for p(1)=0.6,p(2)=0.7 (summing to 1.3), NO value of p(3) can fix this — '
      + 'p(3)=-0.3 would satisfy normalization but violate non-negativity; p(3)=0 satisfies '
      + 'non-negativity but leaves the sum at 1.3. The table is internally INCONSISTENT — no '
      + 'extension makes it valid. Both axioms are hard requirements, never independently '
      + 'negotiable.\n\n'
      + 'UNKNOWN PMF ENTRIES ARE FOUND BY SOLVING THE NORMALIZATION EQUATION FOR THE RESIDUAL, '
      + 'NEVER BY DEFAULT ASSUMPTIONS LIKE UNIFORMITY: for p(1)=0.2,p(2)=0.5,p(3)=k: from '
      + 'Σp(x)=1, k=1-0.2-0.5=0.3 — a DIRECT algebraic consequence, never guessed or assumed equal '
      + 'to the other entries. For a loaded die with p(x)=cx for x=1,…,6: normalization gives '
      + 'c(1+2+⋯+6)=21c=1⇒c=1/21, then P(X≥5)=p(5)+p(6)=5/21+6/21=11/21 — the constant is SOLVED '
      + 'FOR, never assumed to make the distribution uniform.\n\n'
      + 'EVENT PROBABILITY SUMS ONLY THE PMF VALUES ACTUALLY IN THE EVENT, NEVER A RUNNING '
      + 'CUMULATIVE TOTAL BY DEFAULT: for p(1)=0.1,p(2)=0.2,p(3)=0.3,p(4)=0.4: P(X=3)=p(3)=0.3 '
      + 'directly (a single lookup), while P(X≤3)=p(1)+p(2)+p(3)=0.6 (a genuinely different, '
      + 'cumulative sum) — reading "P(X=x)" as requiring summation up to x conflates the point '
      + 'probability with the cumulative one; P(X∈{2,4})=p(2)+p(4)=0.2+0.4=0.6 sums ONLY the '
      + 'listed values, never adjacent or intermediate ones.',
    targetedMisconceptions: [`${PMF}:MC-1`, `${PMF}:MC-2`, `${PMF}:MC-3`],
    source: eb(PMF, 'Core Understanding — both PMF axioms holding simultaneously with neither negotiable, unknown entries found by solving the normalization equation never by default assumptions, and event probability summing only the values in the event never a running cumulative total'),
  },
  {
    conceptId: PDF, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'NORMALIZATION IS AN INTEGRAL CONDITION, NEVER A POINT EVALUATION: for f(x)=k·x on [0,2], '
      + 'setting f(1)=1⇒k=1 gives ∫₀²x dx=2≠1 — INVALID. The correct approach: ∫₀²kx dx=k·2=1⇒'
      + 'k=1/2; checking ∫₀²(1/2)x dx=1 ✓. Normalization means TOTAL PROBABILITY EQUALS 1 — an '
      + 'integral over the whole support, never a single-point constraint.\n\n'
      + 'E[X] IS THE PROBABILITY-WEIGHTED MEAN, NEVER THE MODE (PEAK): for f(x)=3x² on [0,1] '
      + '(which PEAKS at x=1): E[X]=∫₀¹x·3x² dx=∫₀¹3x³ dx=3/4≠1. The mode is a LOCAL property '
      + '(where density is densest per unit length); E[X] is a GLOBAL property, integrating x·f(x) '
      + 'over the ENTIRE support. For a skewed distribution, heavy tails pull E[X] away from the '
      + 'mode — reading off the peak is never a substitute for the integral.\n\n'
      + 'VARIANCE REQUIRES SQUARING THE DEVIATION — E[X-μ] IS ALWAYS ZERO AND MEASURES NOTHING: '
      + 'for ANY distribution, ∫(x-μ)f(x)dx=E[X]-μ=μ-μ=0 — positive and negative deviations ALWAYS '
      + 'cancel, regardless of spread. Variance requires the SQUARED deviation: '
      + 'Var(X)=E[(X-μ)²]=∫(x-μ)²f(x)dx>0 whenever X isn’t concentrated at a single point. The '
      + 'computational SHORTCUT Var(X)=E[X²]-(E[X])² (derived by expanding (X-μ)²=X²-2μX+μ²) is '
      + 'usually faster but computes the IDENTICAL quantity as the definitional squared-deviation '
      + 'formula.',
    targetedMisconceptions: [`${PDF}:MC-1`, `${PDF}:MC-2`, `${PDF}:MC-3`],
    source: eb(PDF, 'Core Understanding — normalization as an integral condition never a point evaluation, E[X] as the probability-weighted mean never the mode, and variance requiring the squared deviation since E[X-μ] is always zero'),
  },
  {
    conceptId: DISTRIBUTION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'CDF, PMF, AND PDF ARE EQUIVALENT FULL SPECIFICATIONS — NEVER DIFFERENT INFORMATION: for a '
      + 'fair die roll X, the PMF table p(k)=1/6 and the CDF step function F(x)=⌊x⌋/6 carry '
      + 'EXACTLY the same information. Computing P(2≤X≤4)=p(2)+p(3)+p(4)=3/6 directly from the '
      + 'PMF, or via F(4)-F(1) from the CDF, gives the SAME answer — neither description adds '
      + 'anything the other lacks; they are interchangeable full specifications, never independent '
      + 'pieces of information.\n\n'
      + 'A SHARED SUMMARY STATISTIC NEVER IMPLIES A SHARED DISTRIBUTION: the die roll X has '
      + 'E[X]=3.5. A two-point variable Y taking 1 or 6 each with probability 1/2 ALSO has '
      + 'E[Y]=3.5 — the SAME mean. Yet P(3≤X≤4)=2/6 while P(3≤Y≤4)=0 (Y never lands there at all) '
      + '— a concrete question the shared mean alone cannot answer. The mean is a single number '
      + 'computed FROM the distribution, necessarily discarding information; two genuinely '
      + 'different distributions can share it.\n\n'
      + 'A NAMED DISTRIBUTION APPLIES ONLY AFTER ITS ASSUMPTIONS ARE VERIFIED, NEVER ON SURFACE '
      + 'RESEMBLANCE: inspecting 10 items independently defective with probability p=0.05 '
      + 'genuinely satisfies Binomial’s defining conditions (fixed n=10, independent trials, '
      + 'constant p) — so E[X]=np=0.5 is immediately available from established theory. If '
      + 'instead finding one defect made further defects more likely (dependence), calling the '
      + 'count "Binomial" anyway would apply the name without verifying its assumptions, '
      + 'invalidating every property borrowed from that theory.',
    targetedMisconceptions: [`${DISTRIBUTION}:MC-1`, `${DISTRIBUTION}:MC-2`, `${DISTRIBUTION}:MC-3`],
    source: eb(DISTRIBUTION, 'Core Understanding — the CDF, PMF, and PDF as equivalent full specifications never different information, a shared summary statistic never implying a shared distribution, and a named distribution applying only after its assumptions are verified'),
  },
]

export const MATHEMATICS_PROB_PMF_PDF_DISTRIBUTION_PROBES: SeedProbe[] = [
  {
    conceptId: PMF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For p(1)=0.6 and p(2)=0.7 (already summing to 1.3), can any value of p(3) — including a negative one — make this a valid PMF?',
    choices: [
      { text: 'No — the table is already internally INCONSISTENT; p(3)=-0.3 would fix the sum to 1 but violate non-negativity, while p(3)=0 satisfies non-negativity but leaves the sum at 1.3; no extension works', isCorrect: true },
      { text: 'Yes — setting p(3)=-0.3 makes the total sum to exactly 1, so this is a valid choice for the third entry', isCorrect: false, misconceptionId: `${PMF}:MC-3` },
      { text: "Yes, since normalization is the only requirement for a PMF, and any value of p(3) that makes the sum equal 1 is acceptable", isCorrect: false, misconceptionId: `${PMF}:MC-3` },
    ],
    targetedMisconceptions: [`${PMF}:MC-3`],
    source: eb(PMF, 'Demonstration 1 — p(1)=0.6,p(2)=0.7 (sum 1.3), no value of p(3), negative or otherwise, repairs this, directly breaking PMF-NEGATIVE-ALLOWED'),
  },
  {
    conceptId: PMF, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For p(1)=0.2, p(2)=0.5, p(3)=k, how should the unknown value k be determined?',
    choices: [
      { text: 'By SOLVING the normalization equation: k=1-0.2-0.5=0.3, a direct algebraic consequence — never guessed or assumed equal to the other entries', isCorrect: true },
      { text: 'By assuming k equals the average of the other two known values, since PMF entries are often similar in size', isCorrect: false, misconceptionId: `${PMF}:MC-1` },
      { text: "By assuming the distribution is uniform, so k should equal 1/3 like a fair three-outcome scenario", isCorrect: false, misconceptionId: `${PMF}:MC-1` },
    ],
    targetedMisconceptions: [`${PMF}:MC-1`],
    source: eb(PMF, 'Demonstration 2 — p(1)=0.2,p(2)=0.5,p(3)=k⇒k=0.3, solved directly from normalization, never assumed, directly breaking PMF-SUM-NOT-ONE'),
  },
  {
    conceptId: PMF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For p(1)=0.1, p(2)=0.2, p(3)=0.3, p(4)=0.4, is P(X=3) the same number as P(X≤3)?',
    choices: [
      { text: 'No — P(X=3)=p(3)=0.3 is a single lookup, while P(X≤3)=p(1)+p(2)+p(3)=0.6 is a genuinely different cumulative sum; reading P(X=x) as requiring summation up to x conflates the point probability with the cumulative one', isCorrect: true },
      { text: 'Yes — P(X=3) and P(X≤3) both refer to the running total of probabilities accumulated up through the value 3', isCorrect: false, misconceptionId: `${PMF}:MC-2` },
      { text: "Yes, since both expressions describe the probability associated with the value 3 in some way", isCorrect: false, misconceptionId: `${PMF}:MC-2` },
    ],
    targetedMisconceptions: [`${PMF}:MC-2`],
    source: eb(PMF, 'Demonstration 3 — P(X=3)=p(3)=0.3 versus P(X≤3)=p(1)+p(2)+p(3)=0.6, different questions from the identical table, directly breaking PMF-IS-CDF'),
  },
  {
    conceptId: PDF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For f(x)=k·x on [0,2], does setting f(1)=1 (which gives k=1) correctly normalize this PDF?',
    choices: [
      { text: 'No — checking ∫₀²x dx=2≠1 shows k=1 fails; normalization requires solving ∫₀²kx dx=k·2=1⇒k=1/2, an INTEGRAL condition over the whole support, never a single-point evaluation', isCorrect: true },
      { text: 'Yes — since the PDF must equal 1 somewhere, setting f(1)=1 correctly determines the constant k', isCorrect: false, misconceptionId: `${PDF}:MC-3` },
      { text: "Yes, because evaluating the function at any convenient point and setting it equal to 1 is a valid way to find the normalization constant", isCorrect: false, misconceptionId: `${PDF}:MC-3` },
    ],
    targetedMisconceptions: [`${PDF}:MC-3`],
    source: eb(PDF, 'Demonstration 1 — f(x)=kx on [0,2]: f(1)=1⇒k=1 fails (∫₀²x dx=2≠1), solving the integral gives k=1/2 correctly, directly breaking NORMALIZATION-BY-EVALUATION'),
  },
  {
    conceptId: PDF, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For f(x)=3x² on [0,1], which peaks at x=1, is E[X] located at x=1 (the mode)?',
    choices: [
      { text: 'No — E[X]=∫₀¹x·3x² dx=∫₀¹3x³ dx=3/4≠1; the mode is a LOCAL property (where density is densest), while E[X] is a GLOBAL property integrating x·f(x) over the entire support', isCorrect: true },
      { text: 'Yes — E[X] is always located at the peak of the density curve, since that is where the random variable is most likely to occur', isCorrect: false, misconceptionId: `${PDF}:MC-1` },
      { text: "Yes, since for any PDF, reading off the x-value where the density is maximized directly gives the expected value", isCorrect: false, misconceptionId: `${PDF}:MC-1` },
    ],
    targetedMisconceptions: [`${PDF}:MC-1`],
    source: eb(PDF, 'Demonstration 2 — f(x)=3x² on [0,1]: mode at x=1, but E[X]=∫₀¹3x³ dx=3/4≠1, directly breaking EXPECTATION-AS-MODE'),
  },
  {
    conceptId: PDF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does ∫(x-μ)f(x)dx correctly measure the variance of a continuous random variable X?',
    choices: [
      { text: 'No — ∫(x-μ)f(x)dx=E[X]-μ=μ-μ=0 for ANY distribution, since positive and negative deviations always cancel; variance requires the SQUARED deviation, Var(X)=E[(X-μ)²]=∫(x-μ)²f(x)dx>0', isCorrect: true },
      { text: 'Yes — ∫(x-μ)f(x)dx directly computes the variance, measuring how spread out the distribution is around its mean', isCorrect: false, misconceptionId: `${PDF}:MC-2` },
      { text: "Yes, since the deviation (x-μ) captures how far values are from the mean, which is exactly what variance measures", isCorrect: false, misconceptionId: `${PDF}:MC-2` },
    ],
    targetedMisconceptions: [`${PDF}:MC-2`],
    source: eb(PDF, 'Demonstration 3 — ∫(x-μ)f(x)dx=0 always, Var(X)=∫(x-μ)²f(x)dx>0 genuinely measures spread, directly breaking VARIANCE-AS-EXPECTED-DEVIATION'),
  },
  {
    conceptId: DISTRIBUTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For a fair die roll X, do the PMF table p(k)=1/6 and the CDF step function F(x)=⌊x⌋/6 carry different information about X?',
    choices: [
      { text: 'No — they are EQUIVALENT full specifications; computing P(2≤X≤4)=p(2)+p(3)+p(4)=3/6 from the PMF or F(4)-F(1) from the CDF gives the SAME answer, since neither description adds anything the other lacks', isCorrect: true },
      { text: 'Yes — the PMF and CDF are separate descriptions that each carry unique information not contained in the other', isCorrect: false, misconceptionId: `${DISTRIBUTION}:MC-3` },
      { text: "Yes, since the PMF describes individual outcomes while the CDF describes something fundamentally different about the random variable", isCorrect: false, misconceptionId: `${DISTRIBUTION}:MC-3` },
    ],
    targetedMisconceptions: [`${DISTRIBUTION}:MC-3`],
    source: eb(DISTRIBUTION, 'Demonstration 1 — the die-roll PMF table and CDF step-graph, both giving P(2≤X≤4)=3/6, directly breaking CDF-PMF-PDF-TREATED-AS-DIFFERENT-INFORMATION'),
  },
  {
    conceptId: DISTRIBUTION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A die roll X has E[X]=3.5. A two-point variable Y (taking 1 or 6, each with probability 1/2) also has E[Y]=3.5. Do X and Y necessarily have the same distribution?',
    choices: [
      { text: 'No — despite sharing the mean, P(3≤X≤4)=2/6 while P(3≤Y≤4)=0 (Y never lands there); a shared summary statistic NEVER implies a shared distribution, since the mean discards information', isCorrect: true },
      { text: 'Yes — since X and Y share the exact same expected value, they must have the identical probability distribution', isCorrect: false, misconceptionId: `${DISTRIBUTION}:MC-1` },
      { text: "Yes, because any two random variables with the same mean will also agree on every interval probability", isCorrect: false, misconceptionId: `${DISTRIBUTION}:MC-1` },
    ],
    targetedMisconceptions: [`${DISTRIBUTION}:MC-1`],
    source: eb(DISTRIBUTION, 'Demonstration 2 — the die roll X and two-point variable Y, sharing E=3.5 but disagreeing on P(3≤·≤4), directly breaking SHARED-SUMMARY-STATISTIC-ASSUMED-TO-IMPLY-SHARED-DISTRIBUTION'),
  },
  {
    conceptId: DISTRIBUTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Inspecting 10 items where finding one defect makes further defects MORE likely (dependence between trials), can this count of defects be called "Binomial" simply because it resembles counting successes?',
    choices: [
      { text: 'No — Binomial requires fixed n, INDEPENDENT trials, and constant p; since dependence violates the independence assumption, calling it Binomial anyway applies the name without verifying its assumptions, invalidating every borrowed property', isCorrect: true },
      { text: 'Yes — any scenario involving counting successes across a fixed number of trials can be modeled as Binomial regardless of independence', isCorrect: false, misconceptionId: `${DISTRIBUTION}:MC-2` },
      { text: "Yes, since the surface structure (counting successes) is what determines whether Binomial applies, not the specific dependence structure between trials", isCorrect: false, misconceptionId: `${DISTRIBUTION}:MC-2` },
    ],
    targetedMisconceptions: [`${DISTRIBUTION}:MC-2`],
    source: eb(DISTRIBUTION, 'Demonstration 3 — the quality-control Binomial verification, contrasted with a dependent-trials scenario where the label would be misapplied, directly breaking NAMED-DISTRIBUTION-APPLIED-WITHOUT-VERIFYING-ASSUMPTIONS'),
  },
]
