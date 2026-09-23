/**
 * Batch: series-rigorous, fixed-point-theorem, baire-category (math.real).
 *
 * Fresh Phase 0 frontier recompute after the completeness-metric/pointwise-
 * convergence/riemann-integrability batch found exactly these 3 ready
 * concepts. series-rigorous closes the convergence-sequences chain's own
 * unlock (and directly unblocks math.real.absolute-convergence, the sole
 * remaining math.real concept, for the next batch); fixed-point-theorem
 * closes the shared lipschitz-continuity/completeness-metric unlock;
 * baire-category closes the completeness-metric chain's own unlock.
 * Transcribed from the frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.real.{series-rigorous,fixed-point-theorem,
 * baire-category}.md.
 *
 * Grade band: all three adopt GradeBand.UNDERGRADUATE, continuing math.real's
 * established domain baseline.
 *
 *   SERIES-RIGOROUS  The Cauchy criterion for series is NEVER a genuinely new
 *           type of convergence — it is ordinary sequence-Cauchy-ness applied
 *           to the one specific sequence of partial sums; a convergent series
 *           is NEVER guaranteed to converge absolutely as well — the
 *           alternating harmonic series is a direct counterexample; and a
 *           convergent series' terms can NEVER always be reordered without
 *           changing the sum like a finite sum — the Riemann Rearrangement
 *           Theorem lets a conditionally convergent series be reordered to
 *           any target.
 *   FIXED-POINT-THEOREM  A Lipschitz mapping is NEVER automatically a
 *           contraction — the strict $k<1$ threshold is a genuinely sharper
 *           requirement; iterating a contraction from different starting
 *           points NEVER converges to genuinely different fixed points — the
 *           theorem guarantees a single unique fixed point regardless of
 *           starting point; and the contraction condition alone, without
 *           completeness, NEVER guarantees a fixed point exists — an
 *           incomplete-space counterexample can genuinely lack one.
 *   BAIRE-CATEGORY  "Nowhere dense" is NEVER just informal smallness or
 *           countability — it specifically means the closure has empty
 *           interior; the Baire Category Theorem NEVER applies to any metric
 *           space regardless of completeness — its conclusion genuinely
 *           fails for incomplete spaces; and the theorem is NEVER purely
 *           abstract with no practical connections — it is the completeness-
 *           dependent engine behind deeper functional-analysis results.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const SERIES_RIGOROUS = 'math.real.series-rigorous'
const FIXED_POINT_THEOREM = 'math.real.fixed-point-theorem'
const BAIRE_CATEGORY = 'math.real.baire-category'

export const MATHEMATICS_REAL_SERIES_RIGOROUS_FIXED_POINT_THEOREM_BAIRE_CATEGORY_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SERIES_RIGOROUS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'SERIES CONVERGENCE IS CAUCHY-SEQUENCE CONVERGENCE OF THE PARTIAL SUMS — NO NEW MACHINERY: '
      + 'for $(\\sum_{n=1}^\\infty1/2^n)$: $(S_n=1-1/2^n)$, and for $m>n$: '
      + '$(|S_m-S_n|<1/2^n)$. Given $\\varepsilon>0$, choosing '
      + '$(N=\\lceil\\log_2(1/\\varepsilon)\\rceil)$ gives $(|S_m-S_n|<\\varepsilon)$ for '
      + '$m>n>N$ — confirming $\\{S_n\\}$ is Cauchy using EXACTLY the same epsilon-N reasoning '
      + 'already mastered for ordinary sequences. The Cauchy criterion for series is a direct '
      + 'application of convergence-sequences\' own Cauchy-if-and-only-if-convergent equivalence '
      + 'to one specific sequence — the partial sums — never a separate theory.\n\n'
      + 'ABSOLUTE CONVERGENCE IMPLIES CONVERGENCE, BUT NEVER THE REVERSE: if $(\\sum|a_n|)$ '
      + 'converges, its partial sums are Cauchy, so via the triangle inequality the ACTUAL partial '
      + 'sums inherit the Cauchy property too, so $(\\sum a_n)$ converges. But the alternating '
      + "harmonic series $(\\sum(-1)^{n+1}/n=1-1/2+1/3-\\cdots)$ CONVERGES (to $\\ln2$), while "
      + '$(\\sum|(-1)^{n+1}/n|=\\sum1/n)$ (the harmonic series) DIVERGES — a convergent series '
      + 'that is NOT absolutely convergent, directly refuting the converse.\n\n'
      + 'REARRANGEMENT IS INVARIANT FOR ABSOLUTE CONVERGENCE, DANGEROUSLY SENSITIVE FOR '
      + 'CONDITIONAL CONVERGENCE: the finite-sum intuition ("reordering never changes a sum") '
      + 'carries over safely to ABSOLUTELY convergent series — $(\\sum1/2^n)$\'s sum stays fixed '
      + 'at 1 under ANY rearrangement. But the alternating harmonic series\'s positive terms '
      + '$((1+1/3+1/5+\\cdots))$ and negative terms $((1/2+1/4+\\cdots))$ EACH diverge to '
      + 'infinity individually — a fact specific to conditional convergence — so by the RIEMANN '
      + 'REARRANGEMENT THEOREM, the series can be reordered to converge to 1 instead of $\\ln2$, '
      + 'to any other target, or to diverge entirely. The finite-sum intuition genuinely FAILS for '
      + 'conditionally convergent series.',
    targetedMisconceptions: [`${SERIES_RIGOROUS}:MC-1`, `${SERIES_RIGOROUS}:MC-2`, `${SERIES_RIGOROUS}:MC-3`],
    source: eb(SERIES_RIGOROUS, 'Core Understanding — series convergence being Cauchy-sequence convergence of the partial sums with no new machinery, absolute convergence implying convergence but never the reverse, and rearrangement being invariant for absolute convergence but dangerously sensitive for conditional convergence'),
  },
  {
    conceptId: FIXED_POINT_THEOREM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A CONTRACTION IS LIPSCHITZ WITH THE STRICT EXTRA CONDITION K LESS THAN 1, NEVER JUST "SOME '
      + 'BOUND": for $(T(x)=x/2+1)$: $(|T(x)-T(y)|=(1/2)|x-y|)$ — Lipschitz constant EXACTLY '
      + '$(1/2<1)$, a genuine contraction. Contrast $(S(x)=2x+1)$: $(|S(x)-S(y)|=2|x-y|)$ — '
      + 'Lipschitz with $L=2$, but since $(2)$ is not less than 1, $S$ is Lipschitz WITHOUT being a '
      + 'contraction. This single strengthening is the ENTIRE mechanism making repeated iteration '
      + 'converge — a Lipschitz mapping with $(L\\ge1)$ gives no such guarantee.\n\n'
      + 'THE ITERATED SEQUENCE IS PROVABLY CAUCHY, AND COMPLETENESS UPGRADES THIS TO GENUINE '
      + 'CONVERGENCE: starting from any $(x_0)$, define $(x_1=T(x_0),x_2=T(x_1),\\ldots)$. The '
      + 'contraction condition gives consecutive distances shrinking GEOMETRICALLY, making '
      + '$((x_n))$ CAUCHY. Completeness is PRECISELY what upgrades this Cauchy property into '
      + 'convergence to a genuine limit WITHIN the space; continuity of $T$ then confirms that '
      + 'limit is a genuine fixed point. Iterating $(T(x)=x/2+1)$ from $(x_0=0)$: '
      + '$(x_1=1,x_2=1.5,x_3=1.75,x_4=1.875,\\ldots)$ — visibly converging to $(x^*=2)$ '
      + '(verified: $(T(2)=2)$), reached from ANY starting point.\n\n'
      + 'COMPLETENESS IS NOT A TECHNICALITY — AN INCOMPLETE SPACE CAN GENUINELY LACK A FIXED '
      + 'POINT: for $(T(x)=x/2+1/(2\\sqrt2))$ on the rationals intersected with $((0,2))$ (an '
      + 'incomplete metric space, missing $\\sqrt2$): $T$ IS a genuine contraction, and the '
      + 'iterated sequence from a rational starting point is CAUCHY (guaranteed identically to '
      + 'before) — but its true limit, solving $(x^*=T(x^*))$, gives $(x^*=\\sqrt2)$, which is '
      + 'IRRATIONAL and NOT a member of this incomplete space. The Cauchy sequence has NO limit '
      + 'point within this incomplete space, so $T$ genuinely has NO fixed point there.',
    targetedMisconceptions: [`${FIXED_POINT_THEOREM}:MC-1`, `${FIXED_POINT_THEOREM}:MC-2`, `${FIXED_POINT_THEOREM}:MC-3`],
    source: eb(FIXED_POINT_THEOREM, 'Core Understanding — a contraction being Lipschitz with the strict extra condition k less than 1, the iterated sequence being provably Cauchy with completeness upgrading this to genuine convergence, and completeness not being a technicality since an incomplete space can genuinely lack a fixed point'),
  },
  {
    conceptId: BAIRE_CATEGORY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'NOWHERE DENSE MEANS THE CLOSURE\'S INTERIOR IS EMPTY — NEVER JUST "SMALL": the rationals '
      + 'are DENSE in the reals (their closure is all of the reals, with nonempty interior) — so '
      + 'the rationals are NOT nowhere dense, despite being countable and feeling "small" in '
      + 'cardinality. Contrast a single point $(\\{0\\})$ in the reals: its closure is $(\\{0\\})$ '
      + 'itself, whose interior is EMPTY — $(\\{0\\})$ IS nowhere dense. "Nowhere dense" is a '
      + 'precise statement about the closure\'s interior, entirely unrelated to cardinality or '
      + 'informal smallness.\n\n'
      + 'THE THEOREM TURNS INTO A COMPLETENESS-DETECTION TOOL: if a space is complete, it cannot '
      + 'be written as a countable union of nowhere-dense sets. Consider the rationals as their '
      + 'own metric space: it is exactly the countable union of its own singleton points, and each '
      + 'singleton IS nowhere dense within this subspace (any interval around a rational contains '
      + 'infinitely many other rationals). If the rationals WERE complete, Baire Category would '
      + 'forbid this decomposition — but the rationals genuinely ARE this union. This '
      + 'contradiction proves the rationals under the absolute-value metric are NOT complete, '
      + 'recovering the already-known fact via an entirely Baire-category-based argument, without '
      + 'directly exhibiting a non-convergent Cauchy sequence.\n\n'
      + 'COMPLETENESS IS THE THEOREM\'S ESSENTIAL HYPOTHESIS, NEVER AUTOMATIC: the theorem\'s '
      + "conclusion genuinely fails for incomplete spaces — the rationals' own decomposition into "
      + 'nowhere-dense singletons is a direct demonstration that the conclusion cannot be trusted '
      + 'without first verifying completeness. A well-known further consequence of the theorem (in '
      + 'a genuinely complete space like the continuous functions on a closed interval) is that '
      + 'continuous-but-nowhere-differentiable functions form a RESIDUAL (generic) set — an '
      + 'existence result for objects that might otherwise seem too pathological to be common, '
      + 'made rigorous entirely through the completeness-dependent Baire machinery.',
    targetedMisconceptions: [`${BAIRE_CATEGORY}:MC-1`, `${BAIRE_CATEGORY}:MC-2`, `${BAIRE_CATEGORY}:MC-3`],
    source: eb(BAIRE_CATEGORY, "Core Understanding — nowhere dense meaning the closure's interior is empty (never just smallness), the theorem turning into a completeness-detection tool via the rationals' own nowhere-dense-singleton decomposition, and completeness being the theorem's essential hypothesis, never automatic"),
  },
]

export const MATHEMATICS_REAL_SERIES_RIGOROUS_FIXED_POINT_THEOREM_BAIRE_CATEGORY_PROBES: SeedProbe[] = [
  {
    conceptId: SERIES_RIGOROUS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the Cauchy criterion for series a genuinely new type of convergence, distinct from ordinary sequence convergence?',
    choices: [
      { text: 'No — verifying it for ∑1/2ⁿ directly uses the same epsilon-N reasoning already mastered for ordinary sequences, applied to the one specific sequence of partial sums; it is never a separate theory', isCorrect: true },
      { text: 'Yes — the Cauchy criterion for series is a genuinely new type of convergence, distinct from ordinary sequence convergence', isCorrect: false, misconceptionId: `${SERIES_RIGOROUS}:MC-1` },
      { text: "Yes, since series involve infinitely many terms being summed, which requires fundamentally different convergence machinery than a single sequence of numbers", isCorrect: false, misconceptionId: `${SERIES_RIGOROUS}:MC-1` },
    ],
    targetedMisconceptions: [`${SERIES_RIGOROUS}:MC-1`],
    source: eb(SERIES_RIGOROUS, 'Discovery Question 1 as a detection probe (verbatim) — whether the Cauchy criterion for series is a genuinely new type of convergence, an answer of "yes" confirming SERIES-CONVERGENCE-AS-NEW-NOTION'),
  },
  {
    conceptId: SERIES_RIGOROUS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does a convergent series always converge absolutely as well?',
    choices: [
      { text: 'No — the alternating harmonic series 1-1/2+1/3-… converges (to ln 2), while its absolute-value series (the harmonic series ∑1/n) diverges; this is a convergent series that is not absolutely convergent, directly refuting the claim', isCorrect: true },
      { text: 'Yes — every convergent series must also converge absolutely', isCorrect: false, misconceptionId: `${SERIES_RIGOROUS}:MC-2` },
      { text: "Yes, since the proof that absolute convergence implies convergence works in both directions, making the two notions equivalent", isCorrect: false, misconceptionId: `${SERIES_RIGOROUS}:MC-2` },
    ],
    targetedMisconceptions: [`${SERIES_RIGOROUS}:MC-2`],
    source: eb(SERIES_RIGOROUS, 'Discovery Question 2 as a detection probe (verbatim) — whether a convergent series always converges absolutely, an answer of "yes" confirming CONVERGENCE-ASSUMED-TO-IMPLY-ABSOLUTE-CONVERGENCE'),
  },
  {
    conceptId: SERIES_RIGOROUS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Can a convergent series' terms always be reordered without changing the sum, just as with a finite sum?",
    choices: [
      { text: 'No — the alternating harmonic series\'s positive and negative terms each diverge to infinity individually, so by the Riemann Rearrangement Theorem the series can be reordered to converge to any target or to diverge entirely; the finite-sum intuition genuinely fails for conditionally convergent series', isCorrect: true },
      { text: "Yes — reordering a convergent series' terms never changes its sum, exactly as with a finite sum", isCorrect: false, misconceptionId: `${SERIES_RIGOROUS}:MC-3` },
      { text: "Yes, since addition is commutative and associative for any collection of real numbers, finite or infinite", isCorrect: false, misconceptionId: `${SERIES_RIGOROUS}:MC-3` },
    ],
    targetedMisconceptions: [`${SERIES_RIGOROUS}:MC-3`],
    source: eb(SERIES_RIGOROUS, 'Discovery Question 3 as a detection probe (verbatim) — whether a convergent series can always be reordered without changing the sum, an answer of "yes" confirming REARRANGEMENT-ASSUMED-UNIVERSALLY-INVARIANT'),
  },
  {
    conceptId: FIXED_POINT_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is every Lipschitz mapping automatically a contraction?',
    choices: [
      { text: 'No — T(x)=x/2+1 has Lipschitz constant 1/2<1 (a contraction), but S(x)=2x+1 has Lipschitz constant L=2, and since 2 is not less than 1, S is Lipschitz without being a contraction; the strict k<1 threshold is a genuinely sharper requirement', isCorrect: true },
      { text: 'Yes — every Lipschitz mapping is automatically a contraction', isCorrect: false, misconceptionId: `${FIXED_POINT_THEOREM}:MC-1` },
      { text: "Yes, since both Lipschitz mappings and contractions are defined by a bounded rate of change, making them the identical condition", isCorrect: false, misconceptionId: `${FIXED_POINT_THEOREM}:MC-1` },
    ],
    targetedMisconceptions: [`${FIXED_POINT_THEOREM}:MC-1`],
    source: eb(FIXED_POINT_THEOREM, 'Discovery Question 1 as a detection probe (verbatim) — whether every Lipschitz mapping is automatically a contraction, an answer of "yes" confirming LIPSCHITZ-ASSUMED-AUTOMATICALLY-CONTRACTION'),
  },
  {
    conceptId: FIXED_POINT_THEOREM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does iterating a contraction mapping from a different starting point converge to a genuinely different fixed point?',
    choices: [
      { text: 'No — iterating T(x)=x/2+1 from x₀=0 converges to x*=2, and iterating from any other starting point converges to the SAME unique fixed point; the theorem guarantees uniqueness regardless of starting point', isCorrect: true },
      { text: 'Yes — iterating a contraction from a different starting point converges to a genuinely different fixed point', isCorrect: false, misconceptionId: `${FIXED_POINT_THEOREM}:MC-2` },
      { text: "Yes, since the iterated sequence's limit necessarily depends on where the iteration begins, just as with most numerical methods", isCorrect: false, misconceptionId: `${FIXED_POINT_THEOREM}:MC-2` },
    ],
    targetedMisconceptions: [`${FIXED_POINT_THEOREM}:MC-2`],
    source: eb(FIXED_POINT_THEOREM, 'Discovery Question 2 as a detection probe (verbatim) — whether iterating from a different starting point converges to a different fixed point, an answer of "yes" confirming FIXED-POINT-ASSUMED-STARTING-POINT-DEPENDENT'),
  },
  {
    conceptId: FIXED_POINT_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does the contraction condition alone, without any completeness hypothesis on the space, guarantee a fixed point exists?',
    choices: [
      { text: 'No — on the rationals intersected with (0,2) (incomplete, missing √2), T(x)=x/2+1/(2√2) is a genuine contraction whose iterated Cauchy sequence has no limit point within this incomplete space, so T genuinely has no fixed point there', isCorrect: true },
      { text: 'Yes — the contraction condition alone guarantees a fixed point exists, regardless of whether the space is complete', isCorrect: false, misconceptionId: `${FIXED_POINT_THEOREM}:MC-3` },
      { text: "Yes, since the iterated sequence is always Cauchy for a contraction, and every Cauchy sequence necessarily converges within its own space", isCorrect: false, misconceptionId: `${FIXED_POINT_THEOREM}:MC-3` },
    ],
    targetedMisconceptions: [`${FIXED_POINT_THEOREM}:MC-3`],
    source: eb(FIXED_POINT_THEOREM, 'Discovery Question 3 as a detection probe (verbatim) — whether the contraction condition alone guarantees a fixed point without completeness, an answer of "yes" confirming COMPLETENESS-ASSUMED-UNNECESSARY-FOR-FIXED-POINT'),
  },
  {
    conceptId: BAIRE_CATEGORY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does "nowhere dense" just mean a set is countable or informally small?',
    choices: [
      { text: 'No — the rationals are dense in the reals (closure has nonempty interior) despite being countable, so they are NOT nowhere dense, while a single point {0} IS nowhere dense (closure has empty interior); nowhere dense is about the closure\'s interior, unrelated to cardinality', isCorrect: true },
      { text: 'Yes — "nowhere dense" just means a set is countable or informally small', isCorrect: false, misconceptionId: `${BAIRE_CATEGORY}:MC-1` },
      { text: "Yes, since any set with fewer elements than the real numbers should intuitively count as nowhere dense", isCorrect: false, misconceptionId: `${BAIRE_CATEGORY}:MC-1` },
    ],
    targetedMisconceptions: [`${BAIRE_CATEGORY}:MC-1`],
    source: eb(BAIRE_CATEGORY, 'Discovery Question 1 as a detection probe (verbatim) — whether nowhere dense just means countable or small, an answer of "yes" confirming NOWHERE-DENSE-CONFLATED-WITH-INFORMAL-SMALLNESS'),
  },
  {
    conceptId: BAIRE_CATEGORY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the Baire Category Theorem apply to any metric space, regardless of whether it is complete?',
    choices: [
      { text: 'No — the rationals decompose into the countable union of their own nowhere-dense singleton points, which Baire Category would forbid if the rationals were complete; this contradiction is exactly how the theorem\'s conclusion genuinely fails for this incomplete space', isCorrect: true },
      { text: 'Yes — the Baire Category Theorem applies to any metric space, regardless of completeness', isCorrect: false, misconceptionId: `${BAIRE_CATEGORY}:MC-2` },
      { text: "Yes, since the theorem's proof only uses countability of the union, never the completeness of the underlying space", isCorrect: false, misconceptionId: `${BAIRE_CATEGORY}:MC-2` },
    ],
    targetedMisconceptions: [`${BAIRE_CATEGORY}:MC-2`],
    source: eb(BAIRE_CATEGORY, 'Discovery Question 2 as a detection probe (verbatim) — whether the theorem applies regardless of completeness, an answer of "yes" confirming BAIRE-CATEGORY-ASSUMED-TO-APPLY-WITHOUT-COMPLETENESS'),
  },
  {
    conceptId: BAIRE_CATEGORY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the Baire Category Theorem a purely abstract result with no genuine practical connections?',
    choices: [
      { text: 'No — in a genuinely complete space like the continuous functions on a closed interval, the theorem rigorously shows continuous-but-nowhere-differentiable functions form a residual (generic) set, a concrete existence result relying entirely on the completeness-dependent Baire machinery', isCorrect: true },
      { text: 'Yes — the Baire Category Theorem is a purely abstract result with no genuine practical connections', isCorrect: false, misconceptionId: `${BAIRE_CATEGORY}:MC-3` },
      { text: "Yes, since results about nowhere-dense sets and countable unions are inherently theoretical and never used to establish existence of concrete mathematical objects", isCorrect: false, misconceptionId: `${BAIRE_CATEGORY}:MC-3` },
    ],
    targetedMisconceptions: [`${BAIRE_CATEGORY}:MC-3`],
    source: eb(BAIRE_CATEGORY, 'Discovery Question 3 as a detection probe (verbatim) — whether the theorem is purely abstract with no practical connections, an answer of "yes" confirming BAIRE-CATEGORY-TREATED-AS-PURELY-ABSTRACT'),
  },
]
