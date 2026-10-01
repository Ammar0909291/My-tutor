/**
 * Batch: l2-space, radon-nikodym (math.meas) — 11/13 -> 13/13, COMPLETING the domain.
 *
 * Fresh Phase 0 frontier recompute after convergence-theorems, lp-space,
 * and product-measure were authored: both remaining math.meas concepts
 * became ready simultaneously (l2-space off lp-space; radon-nikodym off
 * lebesgue-integral), so this batch closes the ENTIRE 13-concept
 * math.meas domain.
 * Transcribed from their frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.meas.l2-space.md and
 * math.meas.radon-nikodym.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching this domain's established
 * baseline throughout.
 *
 * l2-space's two KG cross-links (math.fnal.hilbert-space,
 * math.de.fourier-transform) are NOT authored — its own EB entry uses
 * independence mode, so its probes stay self-contained. radon-nikodym's
 * KG cross-link (math.prob.conditional-probability) IS authored — a
 * genuine transfer target.
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

const L2_SPACE = 'math.meas.l2-space'
const RADON_NIKODYM = 'math.meas.radon-nikodym'

export const MATHEMATICS_MEAS_L2_SPACE_RADON_NIKODYM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: L2_SPACE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'ONLY p=2 ADMITS A GENUINE INNER PRODUCT — THE PARALLELOGRAM LAW IS THE TEST: for f=1, g=x '
      + 'on [0,1]: the squared L² norm of f is 1, of g is 1/3, of f+g is 7/3, of f−g is 1/3. '
      + 'Checking the parallelogram law: (squared norm of f+g) plus (squared norm of f−g) equals '
      + '7/3+1/3=8/3, and 2 times the squared norm of f plus 2 times the squared norm of g equals '
      + '2(1)+2(1/3)=8/3 — MATCHES exactly, confirming L²\'s genuine inner-product structure. The '
      + 'analogous computation for L¹ or L^∞ norms does NOT satisfy this identity — confirming only '
      + 'p=2 admits a compatible inner product, never every Lᵖ.\n\n'
      + 'FOURIER SERIES ARE ORTHOGONAL PROJECTION IN A HILBERT SPACE, NEVER A SEPARATE TECHNIQUE: '
      + 'the functions eₙ(x)=e^(inx)/√(2π) on [0,2π] satisfy an orthonormality relation — the inner '
      + 'product of eₙ and eₘ equals 1 when n=m and 0 otherwise, a direct orthonormality '
      + 'verification. Representing f in L²([0,2π]) as the sum over n of the inner product of f and '
      + 'eₙ times eₙ is the IDENTICAL classical Fourier decomposition, now understood as genuine '
      + 'orthogonal projection onto basis vectors, never a separate formal technique invented '
      + 'independently for Fourier analysis.\n\n'
      + "PARSEVAL'S THEOREM IS THE PYTHAGOREAN THEOREM, GENERALIZED TO INFINITE DIMENSIONS, NEVER "
      + 'AN INDEPENDENT FACT ABOUT FOURIER COEFFICIENTS SPECIFICALLY: for f(x)=x on [0,2π]: the sum '
      + 'of the squared magnitudes of the Fourier coefficients equals the squared L² norm of f — '
      + 'exactly the Pythagorean theorem\'s statement (sum of squared coordinate components equals '
      + 'squared length), now holding in an infinite-dimensional Hilbert space, a DIRECT consequence '
      + 'of orthonormality and completeness, never a fact requiring separate justification.',
    targetedMisconceptions: [`${L2_SPACE}:MC-1`, `${L2_SPACE}:MC-2`, `${L2_SPACE}:MC-3`],
    source: eb(L2_SPACE, 'Core Understanding — only p=2 admitting a genuine inner product with the parallelogram law as the test, Fourier series being orthogonal projection in a Hilbert space never a separate technique, and Parseval\'s theorem being the Pythagorean theorem generalized to infinite dimensions'),
  },
  {
    conceptId: RADON_NIKODYM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A DENSITY FUNCTION IS LITERALLY A RADON-NIKODYM DERIVATIVE, NEVER A SEPARATE IDEA: for μ = '
      + 'Lebesgue measure and ν(E) defined as the integral over E of the standard normal density '
      + 'function (the standard normal probability measure): ν is absolutely continuous with '
      + 'respect to μ trivially (integrating over a Lebesgue-null set always gives 0), and the '
      + 'Radon-Nikodym derivative dν/dμ is EXACTLY the familiar normal density function. The '
      + "theorem's real content is the CONVERSE: whenever absolute continuity holds for ANY two "
      + 'measures, a density-like function is GUARANTEED to exist, even before an explicit formula '
      + 'is found.\n\n'
      + 'ABSOLUTE CONTINUITY IS AN ESSENTIAL HYPOTHESIS — ITS FAILURE GENUINELY BLOCKS EXISTENCE: '
      + 'for μ = Lebesgue measure and ν = the point mass at 0: checking E={0}: μ({0})=0 but '
      + 'ν({0})=1≠0 — absolute continuity FAILS. Consistent with this, NO Radon-Nikodym derivative '
      + 'can exist: for ANY candidate density f, the integral of f over {0} with respect to Lebesgue '
      + 'measure is always 0 (integrating over a Lebesgue-null set always gives 0), so no f could '
      + 'ever reproduce ν({0})=1. The hypothesis does genuine, unavoidable work, never a mere '
      + 'convenient simplification.\n\n'
      + 'CONDITIONAL EXPECTATION IS BUILT DIRECTLY ON THIS THEOREM, NEVER A SEPARATE TOPIC: the '
      + 'elementary conditional-probability formula (probability of A given B equals the probability '
      + 'of A and B divided by the probability of B) breaks down when conditioning on richer '
      + 'information (e.g. a continuous random variable Y, where the probability of any single exact '
      + 'value of Y is 0). Defining ν(E) as the probability of A and E, and μ(E) as the probability '
      + 'of E, over the conditioning information, with absolute continuity guaranteed by '
      + 'construction, the Radon-Nikodym derivative dν/dμ IS the general conditional expectation — '
      + 'with the elementary formula recovered exactly as the special case where B is a single '
      + 'positive-probability event.',
    targetedMisconceptions: [`${RADON_NIKODYM}:MC-1`, `${RADON_NIKODYM}:MC-2`, `${RADON_NIKODYM}:MC-3`],
    source: eb(RADON_NIKODYM, 'Core Understanding — a density function being literally a Radon-Nikodym derivative never a separate idea, absolute continuity being an essential hypothesis whose failure genuinely blocks existence, and conditional expectation being built directly on this theorem never a separate topic'),
  },
]

export const MATHEMATICS_MEAS_L2_SPACE_RADON_NIKODYM_PROBES: SeedProbe[] = [
  {
    conceptId: L2_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does every Lᵖ space admit a natural inner product, making it a Hilbert space?',
    choices: [
      { text: "No — only L² admits a genuine inner product; for f=1, g=x on [0,1], the parallelogram law holds exactly in L² (both sides equal 8/3), but the analogous computation fails for L¹ or L^∞ norms, confirming only p=2 has this special structure", isCorrect: true },
      { text: "Yes, every Lᵖ space admits a natural inner product, making it a Hilbert space for any value of p", isCorrect: false, misconceptionId: `${L2_SPACE}:MC-1` },
      { text: "Since the norm notation looks structurally similar across all values of p, the same inner-product geometric structure should carry over to every Lᵖ space", isCorrect: false, misconceptionId: `${L2_SPACE}:MC-1` },
    ],
    targetedMisconceptions: [`${L2_SPACE}:MC-1`],
    source: eb(L2_SPACE, 'Discovery Question 1 as a detection probe (verbatim) — whether every Lp space admits a natural inner product, an answer of "yes" confirming ALL-LP-SPACES-ASSUMED-TO-HAVE-INNER-PRODUCTS'),
  },
  {
    conceptId: L2_SPACE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Are Fourier series in L² merely a formal analogy to calculus-level Fourier series, or a genuine instance of Hilbert-space orthogonal projection?',
    choices: [
      { text: "They are a genuine instance, never merely an analogy — the functions eₙ(x)=e^(inx)/√(2π) form a verified orthonormal basis, and representing f as the sum of its projections onto each eₙ IS the identical classical Fourier decomposition, understood as genuine orthogonal projection", isCorrect: true },
      { text: "Fourier series in L² are merely a formal analogy to calculus-level Fourier series, resembling but not actually being Hilbert-space orthogonal projection", isCorrect: false, misconceptionId: `${L2_SPACE}:MC-2` },
      { text: "Since Fourier series are typically first learned as a standalone calculus technique, they should be treated as a separate method that merely resembles Hilbert-space projection", isCorrect: false, misconceptionId: `${L2_SPACE}:MC-2` },
    ],
    targetedMisconceptions: [`${L2_SPACE}:MC-2`],
    source: eb(L2_SPACE, 'Discovery Question 2 as a detection probe (verbatim) — whether Fourier series in L2 are a formal analogy or genuine Hilbert-space projection, an answer treating it as mere analogy confirming L2-FOURIER-SERIES-TREATED-AS-FORMAL-ANALOGY'),
  },
  {
    conceptId: L2_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Is Parseval's theorem an independent, unrelated fact about Fourier coefficients?",
    choices: [
      { text: "No — Parseval's theorem is the Pythagorean theorem generalized to infinite dimensions: the sum of squared Fourier-coefficient magnitudes equals the squared L² norm of f, a DIRECT consequence of orthonormality and completeness, never a fact requiring separate justification", isCorrect: true },
      { text: "Yes, Parseval's theorem is an independent, unrelated fact specifically about Fourier coefficients, with no connection to more basic geometric facts", isCorrect: false, misconceptionId: `${L2_SPACE}:MC-3` },
      { text: "Since Parseval's theorem is typically stated by name as its own standalone result, it should be treated as unconnected to any more basic geometric theorem", isCorrect: false, misconceptionId: `${L2_SPACE}:MC-3` },
    ],
    targetedMisconceptions: [`${L2_SPACE}:MC-3`],
    source: eb(L2_SPACE, 'Discovery Question 3 as a detection probe (verbatim) — whether Parseval\'s theorem is an independent unrelated fact, an answer of "yes" confirming PARSEVAL-TREATED-AS-INDEPENDENT-FACT'),
  },
  {
    conceptId: RADON_NIKODYM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "Are \"probability density function\" and \"Radon-Nikodym derivative\" two separate concepts that happen to look similar?",
    choices: [
      { text: "No — a density function IS LITERALLY a Radon-Nikodym derivative; for the standard normal probability measure ν with respect to Lebesgue measure μ, dν/dμ is EXACTLY the familiar normal density function, never a separate idea", isCorrect: true },
      { text: "Yes, probability density function and Radon-Nikodym derivative are two separate concepts that merely happen to look similar", isCorrect: false, misconceptionId: `${RADON_NIKODYM}:MC-1` },
      { text: "Since density functions are typically introduced using elementary calculus vocabulary, they should be treated as a distinct concept from the more abstract Radon-Nikodym derivative", isCorrect: false, misconceptionId: `${RADON_NIKODYM}:MC-1` },
    ],
    targetedMisconceptions: [`${RADON_NIKODYM}:MC-1`],
    source: eb(RADON_NIKODYM, 'Discovery Question 1 as a detection probe (verbatim) — whether density function and Radon-Nikodym derivative are separate concepts, an answer of "yes" confirming DENSITY-FUNCTION-ASSUMED-UNRELATED-TO-RN-DERIVATIVE'),
  },
  {
    conceptId: RADON_NIKODYM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does a Radon-Nikodym derivative exist for ANY two measures, regardless of whether absolute continuity holds?',
    choices: [
      { text: "No — absolute continuity is an ESSENTIAL hypothesis whose failure genuinely blocks existence; for μ=Lebesgue measure and ν=the point mass at 0, μ({0})=0 but ν({0})=1, so absolute continuity fails, and NO function can integrate to 0 over {0} under μ yet reproduce ν({0})=1", isCorrect: true },
      { text: "Yes, a Radon-Nikodym derivative exists for any two measures, regardless of whether absolute continuity holds", isCorrect: false, misconceptionId: `${RADON_NIKODYM}:MC-2` },
      { text: "Since the theorem provides an existence guarantee, that guarantee should be expected to hold universally without needing to check any particular hypothesis first", isCorrect: false, misconceptionId: `${RADON_NIKODYM}:MC-2` },
    ],
    targetedMisconceptions: [`${RADON_NIKODYM}:MC-2`],
    source: eb(RADON_NIKODYM, 'Discovery Question 2 as a detection probe (verbatim) — whether a Radon-Nikodym derivative exists for any two measures regardless of absolute continuity, an answer of "yes" confirming RN-DERIVATIVE-ASSUMED-TO-ALWAYS-EXIST'),
  },
  {
    conceptId: RADON_NIKODYM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is general conditional expectation a completely separate topic from the Radon-Nikodym theorem?',
    choices: [
      { text: "No — general conditional expectation is BUILT DIRECTLY on this theorem; defining ν(E)=P(A∩E) and μ(E)=P(E) over the conditioning information (with absolute continuity guaranteed by construction), the Radon-Nikodym derivative dν/dμ IS the general conditional expectation, with the elementary formula as its special case", isCorrect: true },
      { text: "Yes, general conditional expectation is a completely separate topic from the Radon-Nikodym theorem, with no underlying connection", isCorrect: false, misconceptionId: `${RADON_NIKODYM}:MC-3` },
      { text: "Since elementary conditional probability is typically taught with no reference to measure theory, it should be treated as an unrelated topic from this theorem", isCorrect: false, misconceptionId: `${RADON_NIKODYM}:MC-3` },
    ],
    targetedMisconceptions: [`${RADON_NIKODYM}:MC-3`],
    source: eb(RADON_NIKODYM, 'Discovery Question 3 as a detection probe (verbatim) — whether general conditional expectation is a separate topic from the Radon-Nikodym theorem, an answer of "yes" confirming CONDITIONAL-EXPECTATION-ASSUMED-UNRELATED-TO-RN-THEOREM'),
  },
]
