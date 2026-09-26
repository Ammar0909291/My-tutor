/**
 * Batch: data-visualization, measures-of-center, measures-of-spread
 * (math.stats) — advances the domain from 4/40 to 7/40.
 *
 * Fresh Phase 0 frontier recompute after last batch's descriptive-
 * statistics: all three concepts require only descriptive-statistics
 * (measures-of-center also requires math.arith.fractions, already
 * authored), and were all simultaneously ready. Transcribed from their
 * frozen Educational Brain entries at educational-brain/concepts/
 * mathematics/math.stats.data-visualization.md,
 * math.stats.measures-of-center.md, and math.stats.measures-of-spread.md.
 *
 * Grade band: GradeBand.HIGH throughout, matching math.stats' established
 * baseline from population-sample/descriptive-statistics/sampling.
 *
 * Note: measures-of-spread's KG cross-link `math.prob.variance` is not yet
 * authored in this Educational Brain corpus (confirmed by its own EB entry's
 * Curriculum Feedback) — its transfer probe uses independence mode per that
 * EB entry, not a cross-link probe.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const DATA_VISUALIZATION = 'math.stats.data-visualization'
const MEASURES_OF_CENTER = 'math.stats.measures-of-center'
const MEASURES_OF_SPREAD = 'math.stats.measures-of-spread'

export const MATHEMATICS_STATS_DATA_VISUALIZATION_MEASURES_CENTER_SPREAD_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DATA_VISUALIZATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'CHART TYPE FOLLOWS DATA TYPE, NEVER VISUAL PREFERENCE: a HISTOGRAM shows the frequency '
      + 'distribution of a single NUMERIC variable, binning its range; a BAR CHART displays '
      + 'CATEGORICAL data, each bar a distinct category with conventional (non-meaningful) gaps and '
      + 'often no inherent order; a SCATTERPLOT shows the relationship between TWO numeric variables '
      + 'as (x,y) points. For exam scores (0-100), a histogram is correct; for votes across five '
      + 'candidates, a bar chart is correct — treating the candidates as if they had a meaningful '
      + 'numeric order and plotting contiguous bars would misrepresent genuinely categorical '
      + 'data.\n\n'
      + 'BOXPLOT OUTLIERS ARE A DELIBERATE FEATURE, NEVER A PLOTTING ERROR: a boxplot displays the '
      + 'five-number summary (min, Q1, median, Q3, max), with whiskers extending to the most '
      + 'extreme NON-outlier values; points plotted BEYOND the whiskers (e.g. a single point at 45 '
      + 'when the upper whisker reaches 30) are flagged OUTLIERS — genuine, deliberately-highlighted '
      + 'values in the actual dataset, never a mistake in the plot or a data-entry error to be '
      + 'dismissed.\n\n'
      + 'HISTOGRAM BARS TOUCH BECAUSE BINS ARE CONTIGUOUS; BAR CHART BARS DON\'T BECAUSE CATEGORIES '
      + 'AREN\'T: age bins (0-10, 10-20, 20-30, ...) are CONTIGUOUS numeric ranges — 20-30 '
      + 'immediately follows 10-20 with no gap in the underlying scale, so histogram bars touch. Ice '
      + 'cream flavors (chocolate, vanilla, strawberry, mint) are DISTINCT, unordered categories '
      + 'with no inherent adjacency — so bar chart gaps signal there\'s no meaningful numeric '
      + 'continuity between them, despite the superficial visual similarity to a histogram.',
    targetedMisconceptions: [`${DATA_VISUALIZATION}:MC-1`, `${DATA_VISUALIZATION}:MC-2`],
    source: eb(DATA_VISUALIZATION, 'Core Understanding — chart type following data type never visual preference, boxplot outliers being a deliberate feature never a plotting error, and histogram bars touching because bins are contiguous while bar chart bars don\'t because categories aren\'t'),
  },
  {
    conceptId: MEASURES_OF_CENTER, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'THE MEAN IS SENSITIVE TO OUTLIERS; THE MEDIAN IS ROBUST BY DESIGN: for {2,3,4,5,100}: the '
      + 'mean is 114/5=22.8 — heavily pulled by the single 100 — while the sorted median is 4, '
      + 'essentially UNCHANGED by the outlier\'s presence, since it depends only on which value '
      + 'occupies the MIDDLE position, never on how extreme the other values happen to be.\n\n'
      + 'THE MEDIAN REQUIRES SORTING FIRST, AND AVERAGING THE TWO MIDDLE VALUES WHEN n IS EVEN: for '
      + '{7,2,9,4}, sort FIRST: {2,4,7,9}; since n=4 is even, the median is the average of the two '
      + 'middle values, (4+7)/2=5.5 — never just picking one of the two middle values, and never '
      + 'computed on the unsorted order.\n\n'
      + 'MODE MAY NOT EXIST, OR MAY HAVE SEVERAL VALUES — UNLIKE MEAN AND MEDIAN: for {3,5,5,7,9}, '
      + 'the mode is 5 (appears twice, more than any other value); for {2,4,6,8}, NO mode exists at '
      + 'all — every value appears exactly once, so no value is "most frequent" in any meaningful '
      + 'sense. Mean and median are always single, well-defined numbers for a numeric dataset; '
      + 'mode\'s existence and uniqueness are never guaranteed the same way.',
    targetedMisconceptions: [`${MEASURES_OF_CENTER}:MC-1`, `${MEASURES_OF_CENTER}:MC-2`],
    source: eb(MEASURES_OF_CENTER, 'Core Understanding — the mean being sensitive to outliers while the median is robust by design, the median requiring sorting first and averaging the two middle values when n is even, and mode possibly not existing or having several values unlike mean and median'),
  },
  {
    conceptId: MEASURES_OF_SPREAD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'RANGE COLLAPSES UNDER A SINGLE OUTLIER; IQR DOES NOT: for {2,3,4,5,6,7,100}, the range '
      + '100-2=98 is DOMINATED by the single outlier. The five-number summary instead gives median '
      + '5, Q1 (median of {2,3,4}) =3, Q3 (median of {6,7,100}) =7, so IQR=7-3=4 — completely '
      + 'UNAFFECTED by the outlier, since Q3=7 is determined by RANK position, not by 100\'s actual '
      + 'magnitude — exactly the same robustness principle already established for the median over '
      + 'the mean.\n\n'
      + 'SAMPLE VARIANCE\'S n-1 DIVISOR CORRECTS A GENUINE ESTIMATION BIAS: for {4,6,8} (sample '
      + 'mean x̄=6): Σ(xi-x̄)²=4+0+4=8. Dividing by n-1=2 gives s²=4 (sample SD s=2); dividing by n=3 '
      + 'INSTEAD would give ≈2.67 — systematically SMALLER, because x̄ is computed FROM the same '
      + 'data (minimizing Σ(xi-c)² over all c), which makes the raw sum systematically smaller than '
      + 'it would be using the true (unknown) population mean μ. Dividing by n-1 (Bessel\'s '
      + 'correction) exactly compensates for this downward bias, making s² an UNBIASED estimator — '
      + 'this is a genuinely different computational role from a theoretical, distribution-exact '
      + 'variance quantity, which needs no such correction since it isn\'t estimating anything from '
      + 'finite data.\n\n'
      + 'CHOOSING THE RIGHT SPREAD MEASURE MIRRORS THE CENTER-MEASURE CHOICE: standard deviation '
      + '(built from squared deviations from the mean) is sensitive to outliers, exactly as the '
      + 'mean is; IQR (built from quartile ranks) is robust, exactly as the median is. For salary '
      + 'data mostly clustered $40k-$60k with one CEO earning $5M: standard deviation would be '
      + 'massively inflated by the CEO\'s salary, making it a poor summary of "typical" spread; IQR, '
      + 'excluding that extreme value via rank position, gives a far more representative picture.',
    targetedMisconceptions: [`${MEASURES_OF_SPREAD}:MC-1`, `${MEASURES_OF_SPREAD}:MC-2`, `${MEASURES_OF_SPREAD}:MC-3`],
    source: eb(MEASURES_OF_SPREAD, 'Core Understanding — range collapsing under a single outlier while IQR does not, sample variance\'s n-1 divisor correcting a genuine estimation bias, and choosing the right spread measure mirroring the center-measure choice'),
  },
]

export const MATHEMATICS_STATS_DATA_VISUALIZATION_MEASURES_CENTER_SPREAD_PROBES: SeedProbe[] = [
  {
    conceptId: DATA_VISUALIZATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the variable you\'re plotting numeric with a natural range, or a set of distinct categories — does that decide the chart type?',
    choices: [
      { text: "Yes — for exam scores (0-100, numeric) a histogram is correct; for votes across five candidates (categorical) a bar chart is correct, since treating candidates as numerically ordered and plotting contiguous bars would misrepresent genuinely categorical data", isCorrect: true },
      { text: "A histogram's contiguous-bin convention works fine for genuinely categorical data too, since both show frequency", isCorrect: false, misconceptionId: `${DATA_VISUALIZATION}:MC-1` },
      { text: "Since both histograms and bar charts show how often values occur, the choice between them is mostly a matter of visual style", isCorrect: false, misconceptionId: `${DATA_VISUALIZATION}:MC-1` },
    ],
    targetedMisconceptions: [`${DATA_VISUALIZATION}:MC-1`],
    source: eb(DATA_VISUALIZATION, 'Discovery Question 1 as a detection probe (verbatim) — whether the variable is numeric or categorical and whether that decides the chart, an answer treating a histogram convention as fine for categorical data confirming HISTOGRAM-CONVENTION-USED-FOR-GENUINELY-CATEGORICAL-DATA'),
  },
  {
    conceptId: DATA_VISUALIZATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If a boxplot shows a point plotted far beyond the whiskers, does that mean something went wrong with the plot?',
    choices: [
      { text: "No — a boxplot's whiskers extend to the most extreme non-outlier values, and a point beyond them (e.g. at 45 when the upper whisker reaches 30) is a genuine, deliberately-highlighted flagged OUTLIER in the actual dataset, never a mistake in the plot or a data-entry error", isCorrect: true },
      { text: "Yes, a point plotted far beyond the whiskers indicates a plotting error or data-entry mistake", isCorrect: false, misconceptionId: `${DATA_VISUALIZATION}:MC-2` },
      { text: "Since that value looks unusual compared to the rest of the data, it should be assumed to be an error unless proven otherwise", isCorrect: false, misconceptionId: `${DATA_VISUALIZATION}:MC-2` },
    ],
    targetedMisconceptions: [`${DATA_VISUALIZATION}:MC-2`],
    source: eb(DATA_VISUALIZATION, 'Discovery Question 2 as a detection probe (verbatim) — whether a point plotted beyond a boxplot\'s whiskers means the plot went wrong, an answer of "yes" confirming BOXPLOT-OUTLIER-POINTS-ASSUMED-TO-BE-DATA-ERRORS-RATHER-THAN-GENUINE-FLAGGED-VALUES'),
  },
  {
    conceptId: DATA_VISUALIZATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why do histogram bars touch each other while bar chart bars conventionally don\'t?',
    choices: [
      { text: "Age bins (0-10, 10-20, 20-30, ...) are CONTIGUOUS numeric ranges with no gap in the underlying scale, so histogram bars touch; ice cream flavors (chocolate, vanilla, strawberry) are DISTINCT, unordered categories with no inherent adjacency, so bar chart gaps signal there's no meaningful numeric continuity between them", isCorrect: true },
      { text: "Histogram bars touch purely as a stylistic convention with no connection to whether the underlying variable is numeric or categorical", isCorrect: false, misconceptionId: `${DATA_VISUALIZATION}:MC-1` },
      { text: "Bar chart bars are given gaps mainly to make the chart easier to read, not because of any property of the categories themselves", isCorrect: false, misconceptionId: `${DATA_VISUALIZATION}:MC-1` },
    ],
    targetedMisconceptions: [`${DATA_VISUALIZATION}:MC-1`],
    source: eb(DATA_VISUALIZATION, 'Discovery Question 3 as a detection probe (verbatim) — why histogram bars touch while bar chart bars conventionally don\'t, an answer treating it as a pure stylistic convention confirming HISTOGRAM-CONVENTION-USED-FOR-GENUINELY-CATEGORICAL-DATA'),
  },
  {
    conceptId: MEASURES_OF_CENTER, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does a single unusually large value in a dataset change the mean the same way it changes the median?',
    choices: [
      { text: "No — for {2,3,4,5,100}, the mean is 114/5=22.8, heavily pulled by the single 100, while the sorted median is 4, essentially unchanged since it depends only on which value occupies the middle position, never on how extreme the other values are", isCorrect: true },
      { text: "Yes, an unusually large value changes the mean and the median by the same amount", isCorrect: false, misconceptionId: `${MEASURES_OF_CENTER}:MC-1` },
      { text: "Since both the mean and median are described as measures of \"center,\" they should respond to extreme values in essentially the same way", isCorrect: false, misconceptionId: `${MEASURES_OF_CENTER}:MC-1` },
    ],
    targetedMisconceptions: [`${MEASURES_OF_CENTER}:MC-1`],
    source: eb(MEASURES_OF_CENTER, 'Discovery Question 1 as a detection probe (verbatim) — whether a single unusually large value changes the mean the same way it changes the median, an answer of "yes" confirming MEAN-USED-UNCRITICALLY-AS-THE-MEASURE-OF-CENTER-DESPITE-OUTLIERS'),
  },
  {
    conceptId: MEASURES_OF_CENTER, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Can you find the median of {7,2,9,4} without sorting it first?',
    choices: [
      { text: "No — you must sort FIRST: {2,4,7,9}; since n=4 is even, the median is the average of the two middle values, (4+7)/2=5.5, never just picking one of the two middle values and never computed on the unsorted order", isCorrect: true },
      { text: "Yes, the median can be found directly from the unsorted list without needing to sort it first", isCorrect: false, misconceptionId: `${MEASURES_OF_CENTER}:MC-2` },
      { text: "Since the median is just \"the middle value,\" picking the value in the middle position of the original list should give the correct answer", isCorrect: false, misconceptionId: `${MEASURES_OF_CENTER}:MC-2` },
    ],
    targetedMisconceptions: [`${MEASURES_OF_CENTER}:MC-2`],
    source: eb(MEASURES_OF_CENTER, 'Discovery Question 2 as a detection probe (verbatim) — whether the median of {7,2,9,4} can be found without sorting first, an answer of "yes" confirming MEDIAN-COMPUTED-WITHOUT-SORTING-OR-WITHOUT-AVERAGING-THE-TWO-MIDDLE-VALUES-FOR-EVEN-N'),
  },
  {
    conceptId: MEASURES_OF_CENTER, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does every dataset have exactly one mode?',
    choices: [
      { text: "No — for {3,5,5,7,9}, the mode is 5 (appears twice); for {2,4,6,8}, NO mode exists at all since every value appears exactly once; mean and median are always single, well-defined numbers, but mode's existence and uniqueness are never guaranteed the same way", isCorrect: true },
      { text: "Yes, every dataset has exactly one well-defined mode, just like mean and median", isCorrect: false, misconceptionId: `${MEASURES_OF_CENTER}:MC-1` },
      { text: "Since mean and median always exist as single values, mode should follow the same guarantee by analogy", isCorrect: false, misconceptionId: `${MEASURES_OF_CENTER}:MC-1` },
    ],
    targetedMisconceptions: [`${MEASURES_OF_CENTER}:MC-1`],
    source: eb(MEASURES_OF_CENTER, 'Discovery Question 3 as a detection probe (verbatim) — whether every dataset has exactly one mode, an answer of "yes" reflecting the same overgeneralization pattern this concept\'s misconceptions target'),
  },
  {
    conceptId: MEASURES_OF_SPREAD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does a single extreme outlier affect IQR the same way it affects range?',
    choices: [
      { text: "No — for {2,3,4,5,6,7,100}, the range 100-2=98 is dominated by the outlier, but IQR=Q3-Q1=7-3=4 is completely unaffected, since Q3=7 is determined by rank position, not by 100's actual magnitude — the same robustness principle already established for the median over the mean", isCorrect: true },
      { text: "Yes, IQR is affected by an extreme outlier in the same way and to the same degree as range", isCorrect: false, misconceptionId: `${MEASURES_OF_SPREAD}:MC-1` },
      { text: "Since both range and IQR are described as measures of spread, they should respond to outliers in essentially the same way", isCorrect: false, misconceptionId: `${MEASURES_OF_SPREAD}:MC-1` },
    ],
    targetedMisconceptions: [`${MEASURES_OF_SPREAD}:MC-1`],
    source: eb(MEASURES_OF_SPREAD, 'Discovery Question 1 as a detection probe (verbatim) — whether a single extreme outlier affects IQR the same way it affects range, an answer of "yes" confirming IQR-ASSUMED-EQUALLY-OUTLIER-SENSITIVE-AS-RANGE'),
  },
  {
    conceptId: MEASURES_OF_SPREAD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Why divide by n-1 instead of n when computing sample variance?',
    choices: [
      { text: "For {4,6,8} (mean 6): Σ(xi-x̄)²=8; dividing by n-1=2 gives s²=4, but dividing by n=3 gives ≈2.67 — systematically smaller, because x̄ is computed FROM the same data, making the raw sum systematically smaller than using the true population mean; n-1 (Bessel's correction) exactly compensates for this downward bias, making s² unbiased", isCorrect: true },
      { text: "Sample variance and theoretical population variance are the same computational object, so either divisor works equally well", isCorrect: false, misconceptionId: `${MEASURES_OF_SPREAD}:MC-2` },
      { text: "The n-1 divisor is simply a traditional convention in statistics with no specific bias it is correcting for", isCorrect: false, misconceptionId: `${MEASURES_OF_SPREAD}:MC-2` },
    ],
    targetedMisconceptions: [`${MEASURES_OF_SPREAD}:MC-2`],
    source: eb(MEASURES_OF_SPREAD, 'Discovery Question 2 as a detection probe (verbatim) — why divide by n-1 instead of n for sample variance, an answer conflating sample and population variance confirming SAMPLE-VARIANCE-CONFLATED-WITH-POPULATION-VARIANCE'),
  },
  {
    conceptId: MEASURES_OF_SPREAD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For a dataset with a genuine extreme outlier, is standard deviation or IQR the more trustworthy spread summary?',
    choices: [
      { text: "IQR — for salary data mostly clustered $40k-$60k with one CEO earning $5M, standard deviation (built from squared deviations from the mean, sensitive to outliers exactly as the mean is) would be massively inflated, while IQR (built from quartile ranks, robust exactly as the median is) stays representative of typical spread", isCorrect: true },
      { text: "Standard deviation is generally the more trustworthy spread measure regardless of outliers", isCorrect: false, misconceptionId: `${MEASURES_OF_SPREAD}:MC-3` },
      { text: "Since standard deviation is the more commonly taught spread measure, it should be the default choice even with extreme outliers present", isCorrect: false, misconceptionId: `${MEASURES_OF_SPREAD}:MC-3` },
    ],
    targetedMisconceptions: [`${MEASURES_OF_SPREAD}:MC-3`],
    source: eb(MEASURES_OF_SPREAD, 'Discovery Question 3 as a detection probe (verbatim) — whether standard deviation or IQR is the more trustworthy spread summary with a genuine extreme outlier present, an answer favoring standard deviation confirming STANDARD-DEVIATION-ASSUMED-ALWAYS-PREFERRED'),
  },
]
