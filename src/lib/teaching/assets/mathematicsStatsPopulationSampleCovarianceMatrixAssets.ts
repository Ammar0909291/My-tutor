/**
 * Batch: population-sample, covariance-matrix (math.stats) — OPENS the
 * math.stats domain (0/40 -> 2/40).
 *
 * Fresh Phase 0 frontier recompute after math.prob and math.de reached
 * completion this campaign: math.stats was the largest remaining clean-0
 * domain (40 concepts), with population-sample (needs only
 * math.arith.fractions, already authored) and covariance-matrix (needs
 * math.prob.covariance + math.linalg.matrix, both already authored) ready
 * immediately. Authoring covariance-matrix also unblocks math.opt's last
 * remaining concept (`pca`), one domain away from certification.
 * Transcribed from their frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.stats.population-sample.md
 * and math.stats.covariance-matrix.md.
 *
 * Grade band: population-sample uses GradeBand.HIGH (genuinely high-school-
 * level statistics content — the historical Literary Digest/Gallup case
 * study and sample-vs-population inference are not elementary-level despite
 * its sole prerequisite, math.arith.fractions, being ELEMENTARY; this
 * concept does not inherit technical complexity from that prerequisite the
 * way an expert-tier concept inherits from an undergraduate one).
 * covariance-matrix uses GradeBand.UNDERGRADUATE, matching its
 * math.linalg.matrix prerequisite's own baseline (matrix construction and
 * quadratic forms are inseparable from undergraduate linear algebra).
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const POPULATION_SAMPLE = 'math.stats.population-sample'
const COVARIANCE_MATRIX = 'math.stats.covariance-matrix'

export const MATHEMATICS_STATS_POPULATION_SAMPLE_COVARIANCE_MATRIX_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: POPULATION_SAMPLE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A SAMPLE STATISTIC ESTIMATES A POPULATION PARAMETER — THE TWO ARE NEVER THE SAME NUMBER: '
      + 'the population is the complete group under study (N units); the sample is the subset '
      + 'actually examined (n units), with sampling fraction n/N. A student surveying 25 classmates '
      + 'and finding 80% own a smartphone has measured a SAMPLE result; concluding "80% of all '
      + 'teenagers own a smartphone" conflates that sample statistic with the (unknown) population '
      + 'parameter — the correct statement is that the sample result ESTIMATES, never establishes, '
      + 'the population value.\n\n'
      + 'REPRESENTATIVENESS COMES FROM SAMPLING METHOD, NEVER FROM SIZE ALONE: a larger sample '
      + 'amplifies a biased method rather than fixing it. The 1936 Literary Digest poll surveyed 2.4 '
      + 'MILLION Americans via telephone directories and car registrations (systematically excluding '
      + 'poorer voters) and predicted the wrong president; a Gallup poll of just 50,000 RANDOMLY '
      + 'selected voters called the election correctly — method beat size by a ratio of 48 to 1. A '
      + 'voluntary online poll of 5,000 respondents over-represents people with strong opinions '
      + '(self-selection); a random phone-dialed sample of 500 avoids that bias despite being ten '
      + 'times smaller.\n\n'
      + 'A POPULATION IS ANY WELL-DEFINED COLLECTION, NEVER RESTRICTED TO PEOPLE: a factory\'s daily '
      + 'output of 50,000 bolts, a lake\'s fish, a colony of 3,000 lab mice, or even a conceptually '
      + 'infinite set of future coin flips are all genuine statistical populations — the everyday '
      + 'sense of "population" (human residents) is only one special case of the general statistical '
      + 'meaning.',
    targetedMisconceptions: [`${POPULATION_SAMPLE}:MC-1`, `${POPULATION_SAMPLE}:MC-2`, `${POPULATION_SAMPLE}:MC-3`],
    source: eb(POPULATION_SAMPLE, 'Core Understanding — a sample statistic estimating a population parameter never being the same number, representativeness coming from sampling method never from size alone, and a population being any well-defined collection never restricted to people'),
  },
  {
    conceptId: COVARIANCE_MATRIX, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE DIAGONAL IS THE SAME COVARIANCE FORMULA — NEVER A SEPARATE VARIANCE RULE: for (X,Y) with '
      + '$(\\text{Var}(X)=4)$, $(\\text{Var}(Y)=9)$, $(\\text{Cov}(X,Y)=2)$: '
      + '$(\\Sigma=\\begin{pmatrix}4&2\\\\2&9\\end{pmatrix})$. The diagonal entries 4 and 9 are '
      + '$(\\Sigma_{11}=\\text{Cov}(X,X)=\\text{Var}(X))$ and '
      + '$(\\Sigma_{22}=\\text{Cov}(Y,Y)=\\text{Var}(Y))$ — directly the SAME covariance formula, '
      + 'with both arguments equal to the same variable. Believing the diagonal requires its own '
      + 'separate, disconnected variance formula misses that $(\\text{Var}(X_i)=\\text{Cov}(X_i,X_i))$ '
      + 'is literally the same formula, never a distinct rule.\n\n'
      + 'SYMMETRY IS FORCED BY COVARIANCE\'S OWN DEFINITION — NEVER AN EXTRA ASSUMPTION IMPOSED ON '
      + 'THE MATRIX: for the same Σ: $(\\Sigma_{12}=\\text{Cov}(X,Y)=2)$ and '
      + '$(\\Sigma_{21}=\\text{Cov}(Y,X)=2)$ — genuinely equal, because '
      + '$(\\text{Cov}(X,Y)=E[(X-\\mu_X)(Y-\\mu_Y)]=E[(Y-\\mu_Y)(X-\\mu_X)]=\\text{Cov}(Y,X))$ '
      + '(ordinary multiplication COMMUTES). Σ\'s symmetry is therefore an automatic consequence of '
      + 'covariance\'s own commutative definition — never a convention someone imposed separately on '
      + 'top.\n\n'
      + 'POSITIVE SEMIDEFINITENESS IS DERIVED FROM VARIANCE\'S OWN NONNEGATIVITY — NEVER A SEPARATE '
      + 'PROPERTY TO CHECK: for the same Σ and any $(v=(v_1,v_2))$: '
      + '$(v^T\\Sigma v=4v_1^2+4v_1v_2+9v_2^2=\\text{Var}(v_1X+v_2Y))$ — a direct algebraic identity '
      + 'linking the quadratic form to the variance of a LINEAR COMBINATION. Since variance is never '
      + 'negative for any random variable, $(v^T\\Sigma v\\ge0)$ for every vector v — confirming Σ is '
      + 'positive semidefinite. This holds for EVERY genuine covariance matrix automatically — never '
      + 'a special extra property some covariance matrices might lack.',
    targetedMisconceptions: [`${COVARIANCE_MATRIX}:MC-1`, `${COVARIANCE_MATRIX}:MC-2`, `${COVARIANCE_MATRIX}:MC-3`],
    source: eb(COVARIANCE_MATRIX, 'Core Understanding — the diagonal being the same covariance formula never a separate variance rule, symmetry being forced by covariance\'s own definition never an extra assumption, and positive semidefiniteness being derived from variance\'s own nonnegativity never a separate property to check'),
  },
]

export const MATHEMATICS_STATS_POPULATION_SAMPLE_COVARIANCE_MATRIX_PROBES: SeedProbe[] = [
  {
    conceptId: POPULATION_SAMPLE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If 60% of your sample prefers X, does that mean exactly 60% of the whole population prefers X?',
    choices: [
      { text: "No — a sample result estimates the population parameter but is never guaranteed to equal it exactly; a student surveying 25 classmates and finding 80% own a smartphone has measured a SAMPLE result, and concluding \"80% of all teenagers\" conflates that estimate with the unknown population value", isCorrect: true },
      { text: "Yes, a sample percentage is exactly the same as the population percentage", isCorrect: false, misconceptionId: `${POPULATION_SAMPLE}:MC-1` },
      { text: "Since the sample was measured directly and accurately, its result should be reported as the definitive population fact", isCorrect: false, misconceptionId: `${POPULATION_SAMPLE}:MC-1` },
    ],
    targetedMisconceptions: [`${POPULATION_SAMPLE}:MC-1`],
    source: eb(POPULATION_SAMPLE, 'Discovery Question 1 as a detection probe (verbatim) — whether a sample percentage means the population has exactly that percentage, an answer of "yes" confirming SAMPLE-IS-POPULATION'),
  },
  {
    conceptId: POPULATION_SAMPLE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is a survey of 10,000 volunteers automatically more reliable than a random survey of 500?',
    choices: [
      { text: "No — the 1936 Literary Digest poll surveyed 2.4 MILLION Americans via biased telephone/car-registration lists and predicted the wrong president, while Gallup's random sample of just 50,000 called it correctly; a larger sample amplifies a biased method rather than fixing it, so method beats size", isCorrect: true },
      { text: "Yes, a much larger sample is always more accurate regardless of how it was selected", isCorrect: false, misconceptionId: `${POPULATION_SAMPLE}:MC-2` },
      { text: "Since more data points generally reduce random noise, a bigger volunteer sample should outperform a smaller random one", isCorrect: false, misconceptionId: `${POPULATION_SAMPLE}:MC-2` },
    ],
    targetedMisconceptions: [`${POPULATION_SAMPLE}:MC-2`],
    source: eb(POPULATION_SAMPLE, 'Discovery Question 2 as a detection probe (verbatim) — whether a much larger volunteer survey is automatically more reliable than a smaller random one, an answer of "yes" confirming LARGER-IS-ALWAYS-BETTER'),
  },
  {
    conceptId: POPULATION_SAMPLE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Can a population in statistics be something other than a group of people?',
    choices: [
      { text: "Yes — a factory's daily output of 50,000 bolts, a lake's fish, or a colony of 3,000 lab mice are all genuine statistical populations; the everyday sense of \"population\" as human residents is only one special case of the general statistical meaning: any well-defined collection of units", isCorrect: true },
      { text: "No, a statistical population must always refer to a group of people", isCorrect: false, misconceptionId: `${POPULATION_SAMPLE}:MC-3` },
      { text: "Since the word \"population\" is normally used for human residents, applying it to bolts or mice would be a misuse of the statistical term", isCorrect: false, misconceptionId: `${POPULATION_SAMPLE}:MC-3` },
    ],
    targetedMisconceptions: [`${POPULATION_SAMPLE}:MC-3`],
    source: eb(POPULATION_SAMPLE, 'Discovery Question 3 as a detection probe (verbatim) — whether a statistical population can be something other than people, an answer of "no" confirming POPULATION-IS-PEOPLE'),
  },
  {
    conceptId: COVARIANCE_MATRIX, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does the diagonal of a covariance matrix need its own separate variance formula, or is it the same covariance formula?',
    choices: [
      { text: "It's the same covariance formula — for Var(X)=4, Var(Y)=9, Cov(X,Y)=2: Σ=[[4,2],[2,9]], and the diagonal entries Σ₁₁=Cov(X,X)=Var(X) and Σ₂₂=Cov(Y,Y)=Var(Y) are directly the same covariance formula applied with both arguments equal to the same variable", isCorrect: true },
      { text: "Yes, the diagonal entries of a covariance matrix require their own separate, disconnected variance formula", isCorrect: false, misconceptionId: `${COVARIANCE_MATRIX}:MC-1` },
      { text: "Since variance and covariance are conceptually different measures, the diagonal must use variance's own independently defined formula", isCorrect: false, misconceptionId: `${COVARIANCE_MATRIX}:MC-1` },
    ],
    targetedMisconceptions: [`${COVARIANCE_MATRIX}:MC-1`],
    source: eb(COVARIANCE_MATRIX, 'Discovery Question 1 as a detection probe (verbatim) — whether the diagonal needs its own separate variance formula or is the same covariance formula, an answer of "yes" confirming DIAGONAL-TREATED-AS-SEPARATE-FORMULA'),
  },
  {
    conceptId: COVARIANCE_MATRIX, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "Is Σ's symmetry an extra assumption, or does it follow automatically from covariance's definition?",
    choices: [
      { text: "It follows automatically — Σ₁₂=Cov(X,Y)=2 and Σ₂₁=Cov(Y,X)=2 are genuinely equal because Cov(X,Y)=E[(X-μX)(Y-μY)]=E[(Y-μY)(X-μX)]=Cov(Y,X) since ordinary multiplication commutes; symmetry is an automatic consequence, never a convention imposed separately", isCorrect: true },
      { text: "Σ's symmetry is an extra assumption imposed on the matrix rather than a derived consequence", isCorrect: false, misconceptionId: `${COVARIANCE_MATRIX}:MC-2` },
      { text: "Since covariance matrices are conventionally defined as symmetric, that symmetry is a rule chosen by definition rather than something that follows from the covariance formula itself", isCorrect: false, misconceptionId: `${COVARIANCE_MATRIX}:MC-2` },
    ],
    targetedMisconceptions: [`${COVARIANCE_MATRIX}:MC-2`],
    source: eb(COVARIANCE_MATRIX, 'Discovery Question 2 as a detection probe (verbatim) — whether Σ\'s symmetry is an extra assumption or follows automatically from covariance\'s definition, an answer treating it as an assumption confirming SYMMETRY-TREATED-AS-EXTRA-ASSUMPTION'),
  },
  {
    conceptId: COVARIANCE_MATRIX, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is positive semidefiniteness a special property some covariance matrices might lack, or is it guaranteed for every one?',
    choices: [
      { text: "It's guaranteed for every one — v^TΣv=4v₁²+4v₁v₂+9v₂²=Var(v₁X+v₂Y) is a direct algebraic identity linking the quadratic form to a variance, and since variance is never negative, v^TΣv≥0 for every vector v and every genuine covariance matrix automatically", isCorrect: true },
      { text: "Positive semidefiniteness is a special extra property that some covariance matrices might lack and must be checked separately", isCorrect: false, misconceptionId: `${COVARIANCE_MATRIX}:MC-3` },
      { text: "Since positive semidefiniteness is an advanced linear-algebra property, it would need independent verification for each specific covariance matrix encountered", isCorrect: false, misconceptionId: `${COVARIANCE_MATRIX}:MC-3` },
    ],
    targetedMisconceptions: [`${COVARIANCE_MATRIX}:MC-3`],
    source: eb(COVARIANCE_MATRIX, 'Discovery Question 3 as a detection probe (verbatim) — whether positive semidefiniteness is a special property some covariance matrices might lack or is guaranteed for every one, an answer treating it as special confirming PSD-TREATED-AS-SEPARATE-PROPERTY-TO-CHECK'),
  },
]
