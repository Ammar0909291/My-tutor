/**
 * Batch: absolute-convergence (math.real).
 *
 * Fresh Phase 0 frontier recompute after the series-rigorous/fixed-point-
 * theorem/baire-category batch found this as the sole remaining math.real
 * concept, unblocked directly by series-rigorous. Authoring this concept
 * closes math.real entirely: 30/30. Transcribed from the frozen Educational
 * Brain entry at educational-brain/concepts/mathematics/
 * math.real.absolute-convergence.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, continuing math.real's established
 * domain baseline.
 *
 *   ABSOLUTE-CONVERGENCE  A convergent series is NEVER automatically
 *           absolutely convergent — the alternating harmonic series
 *           converges while its absolute-value series (the harmonic series)
 *           diverges; a series' sum is NEVER always independent of term
 *           order — the Riemann Rearrangement Theorem lets a conditionally
 *           convergent series be reordered to sum to any value, while only
 *           absolutely convergent series are truly rearrangement-invariant;
 *           and once a series is known to converge, it is NEVER safe to skip
 *           separately testing its absolute-value series — absolute
 *           convergence is DEFINED via that separate series and must be
 *           tested directly.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const ABSOLUTE_CONVERGENCE = 'math.real.absolute-convergence'

export const MATHEMATICS_REAL_ABSOLUTE_CONVERGENCE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ABSOLUTE_CONVERGENCE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'ABSOLUTE CONVERGENCE IS A SEPARATELY-TESTED PROPERTY, DEFINED VIA THE ABSOLUTE-VALUE '
      + 'SERIES: for $(\\sum(-1)^n/n^2)$: testing $(\\sum|(-1)^n/n^2|=\\sum1/n^2)$ — a p-series '
      + 'with $(p=2>1)$ — CONVERGES, so the original series is absolutely convergent, confirmed '
      + 'by testing the absolute-value series directly, never merely inferred from the original '
      + 'series converging.\n\n'
      + 'ABSOLUTE CONVERGENCE IMPLIES CONVERGENCE, BUT THE CONVERSE IS FALSE — CONDITIONALLY '
      + "CONVERGENT SERIES EXIST: the alternating harmonic series $(\\sum(-1)^{n+1}/n)$ converges "
      + '(to $\\ln2$, via the alternating series test), but $(\\sum|(-1)^{n+1}/n|=\\sum1/n)$ (the '
      + 'harmonic series) DIVERGES — the series converges WITHOUT converging absolutely, exactly '
      + 'a conditionally convergent series. "The series converges" alone NEVER implies "the series '
      + 'converges absolutely" — these are genuinely different, separately-verified properties.\n\n'
      + 'REARRANGEMENT IS SAFE FOR ABSOLUTE CONVERGENCE, DANGEROUSLY UNSAFE FOR CONDITIONAL '
      + 'CONVERGENCE: for $(\\sum1/n^2)$ (absolutely convergent), ANY reordering — summing '
      + 'even-indexed terms first, then odd, or any other order — gives the SAME sum '
      + '$(\\pi^2/6)$. For the conditionally convergent $(\\sum(-1)^{n+1}/n)$, the RIEMANN '
      + 'REARRANGEMENT THEOREM guarantees SOME reordering sums to $(100)$ instead of '
      + '$(\\ln2\\approx0.693)$, another reordering to a different value entirely, another '
      + 'diverges — a dramatically different, genuinely order-dependent behavior achieved purely '
      + 'by reordering the SAME set of terms.',
    targetedMisconceptions: [`${ABSOLUTE_CONVERGENCE}:MC-1`, `${ABSOLUTE_CONVERGENCE}:MC-2`, `${ABSOLUTE_CONVERGENCE}:MC-3`],
    source: eb(ABSOLUTE_CONVERGENCE, 'Core Understanding — absolute convergence being a separately-tested property defined via the absolute-value series, absolute convergence implying convergence but the converse being false since conditionally convergent series exist, and rearrangement being safe for absolute convergence but dangerously unsafe for conditional convergence'),
  },
]

export const MATHEMATICS_REAL_ABSOLUTE_CONVERGENCE_PROBES: SeedProbe[] = [
  {
    conceptId: ABSOLUTE_CONVERGENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If a series converges, does that automatically mean it converges absolutely too?',
    choices: [
      { text: 'No — the alternating harmonic series ∑(-1)ⁿ⁺¹/n converges (to ln 2), but its absolute-value series (the harmonic series ∑1/n) diverges; the series converges without converging absolutely, a genuinely different, separately-verified property', isCorrect: true },
      { text: 'Yes — a convergent series automatically converges absolutely as well', isCorrect: false, misconceptionId: `${ABSOLUTE_CONVERGENCE}:MC-1` },
      { text: "Yes, since a series converging means its terms shrink to zero, which is also sufficient for the absolute-value series to converge", isCorrect: false, misconceptionId: `${ABSOLUTE_CONVERGENCE}:MC-1` },
    ],
    targetedMisconceptions: [`${ABSOLUTE_CONVERGENCE}:MC-1`],
    source: eb(ABSOLUTE_CONVERGENCE, 'Discovery Question 1 as a detection probe (verbatim) — whether a convergent series automatically converges absolutely, an answer of "yes" confirming CONVERGENCE-CONFLATED-WITH-ABSOLUTE-CONVERGENCE'),
  },
  {
    conceptId: ABSOLUTE_CONVERGENCE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is the sum of a series always independent of the order you add its terms?',
    choices: [
      { text: 'No — ∑1/n² (absolutely convergent) keeps its sum π²/6 under any reordering, but the conditionally convergent ∑(-1)ⁿ⁺¹/n can be rearranged via the Riemann Rearrangement Theorem to sum to 100 instead of ln 2, or to diverge; rearrangement is safe only for absolute convergence', isCorrect: true },
      { text: "Yes — a series' sum is always independent of the order its terms are added, regardless of the type of convergence", isCorrect: false, misconceptionId: `${ABSOLUTE_CONVERGENCE}:MC-2` },
      { text: "Yes, since addition is commutative and associative, so any infinite sum must equal the same value no matter how its terms are ordered", isCorrect: false, misconceptionId: `${ABSOLUTE_CONVERGENCE}:MC-2` },
    ],
    targetedMisconceptions: [`${ABSOLUTE_CONVERGENCE}:MC-2`],
    source: eb(ABSOLUTE_CONVERGENCE, 'Discovery Question 2 as a detection probe (verbatim) — whether a series\' sum is always independent of term order, an answer of "yes" confirming REARRANGEMENT-ASSUMED-ALWAYS-SAFE'),
  },
  {
    conceptId: ABSOLUTE_CONVERGENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Once you know a series converges, is it still necessary to separately test its absolute-value series to determine absolute convergence?',
    choices: [
      { text: 'Yes — absolute convergence is DEFINED via the separate absolute-value series (as with ∑(-1)ⁿ/n², where ∑1/n² is tested directly as a p-series), and must be tested directly rather than inferred from the original series converging', isCorrect: true },
      { text: 'No — once a series is known to converge, testing its absolute-value series separately is unnecessary and redundant', isCorrect: false, misconceptionId: `${ABSOLUTE_CONVERGENCE}:MC-3` },
      { text: "No, since any series that converges must automatically have a convergent absolute-value series by definition", isCorrect: false, misconceptionId: `${ABSOLUTE_CONVERGENCE}:MC-3` },
    ],
    targetedMisconceptions: [`${ABSOLUTE_CONVERGENCE}:MC-3`],
    source: eb(ABSOLUTE_CONVERGENCE, 'Discovery Question 3 as a detection probe (verbatim) — whether it is still necessary to separately test the absolute-value series, an answer of "no" confirming ABSOLUTE-VALUE-SERIES-TEST-SKIPPED-AS-REDUNDANT'),
  },
]
