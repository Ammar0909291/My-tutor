/**
 * Batch: connectedness, differentiability-rigorous, riemann-integral
 * (math.real).
 *
 * Fresh Phase 0 frontier recompute after the open-sets/uniform-continuity/
 * convergence-sequences batch found 9 ready concepts (cauchy-sequence,
 * compactness, connectedness, differentiability-rigorous,
 * lipschitz-continuity, pointwise-convergence, riemann-integral,
 * series-rigorous, uniform-convergence); this batch prioritizes
 * connectedness since it is the LAST prerequisite math.real.ivt needs
 * (ivt requires connectedness + continuity-rigorous, and continuity-
 * rigorous is already authored) — authoring connectedness makes ivt
 * itself ready next batch, which unblocks math.num's remaining concepts
 * that transitively depend on it. differentiability-rigorous and
 * riemann-integral are added since both require only already-authored
 * prerequisites (continuity-rigorous plus already-certified math.calc.*
 * concepts). Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.real.
 * {connectedness,differentiability-rigorous,riemann-integral}.md.
 *
 * Grade band: all three adopt GradeBand.UNDERGRADUATE, continuing math.real's
 * established domain baseline.
 *
 *   CONNECTEDNESS  Separation is a PRECISE closure-based condition, NEVER
 *           just "looks split" by visual inspection; a set can fail to be
 *           an interval — hence fail to be connected — WITHOUT an
 *           obviously "missing" member point, as the rationals split at
 *           an irrational demonstrate; and the Intermediate Value Theorem
 *           falls out DIRECTLY from connectedness-preservation under
 *           continuous maps, NEVER requiring its own independent proof
 *           technique.
 *   DIFFERENTIABILITY-RIGOROUS  Non-differentiability at a point is NEVER
 *           the same claim as discontinuity there — $|x|$ at 0 is
 *           perfectly continuous yet rigorously non-differentiable;
 *           differentiability implies continuity is a genuine THEOREM
 *           proven from limit laws, NEVER folklore to be cited without
 *           proof, and its converse genuinely fails; and all partial
 *           derivatives existing at a point is NECESSARY BUT NEVER
 *           SUFFICIENT for total differentiability — partials only probe
 *           behavior along the coordinate axes.
 *   RIEMANN-INTEGRAL  Riemann integrability requires the BEST possible
 *           upper and lower bounds to coincide EXACTLY over ALL
 *           partitions, NEVER merely "look close" for one partition;
 *           boundedness is NECESSARY BUT NEVER SUFFICIENT for
 *           integrability — the Dirichlet function is perfectly bounded
 *           yet fails to be Riemann integrable; and refining a partition
 *           does NOT always eventually close the upper-lower gap for
 *           every function — the Dirichlet function's gap persists at
 *           every level of refinement.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const CONNECTEDNESS = 'math.real.connectedness'
const DIFFERENTIABILITY_RIGOROUS = 'math.real.differentiability-rigorous'
const RIEMANN_INTEGRAL = 'math.real.riemann-integral'

export const MATHEMATICS_REAL_CONNECTEDNESS_DIFFERENTIABILITY_RIGOROUS_RIEMANN_INTEGRAL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CONNECTEDNESS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'SEPARATION IS A PRECISE CLOSURE-BASED CONDITION, NEVER JUST "LOOKS SPLIT": for the set '
      + '[0,1] union [2,3], setting $A=[0,1]$, $B=[2,3]$: the closure of $A$ is $[0,1]$, the '
      + 'closure of $B$ is $[2,3]$. Both cross-intersections (A with the closure of B, and the '
      + 'closure of A with B) are genuinely empty, so $A$ and $B$ are SEPARATED and the union is '
      + 'NOT connected, confirmed via the formal closure check (not merely the visual gap between '
      + '1 and 2, though that intuition happens to align here).\n\n'
      + 'A SET CAN FAIL TO BE AN INTERVAL WITHOUT AN OBVIOUSLY MISSING MEMBER: for the rationals '
      + 'inside the reals, let $A$ be the rationals less than $\\sqrt2$ and $B$ be the rationals '
      + 'greater than $\\sqrt2$. Since $\\sqrt2$ is irrational, every rational lies in exactly '
      + 'one set, so $A$ union $B$ equals all the rationals. Checking separation: both '
      + 'cross-intersections come out empty — separated, so the rationals are NOT connected, '
      + 'split at $\\sqrt2$ even though $\\sqrt2$ is not a rational itself. A genuine interval '
      + 'like [0,1] resists every such splitting attempt at any point.\n\n'
      + 'THE INTERMEDIATE VALUE THEOREM FALLS OUT DIRECTLY, WITH NO SEPARATE PROOF TECHNIQUE: for '
      + 'a continuous function on $[a,b]$ with $f(a)<0<f(b)$: $[a,b]$ is connected (a genuine '
      + 'interval). Continuous maps preserve connectedness, so the image of $[a,b]$ under $f$ is '
      + 'connected — and since intervals are the ONLY connected subsets of R, that image must '
      + 'itself be an interval, hence contains every value between $f(a)$ and $f(b)$, including '
      + '0. So some point in $[a,b]$ maps to 0 — derived entirely from connectedness-preservation '
      + 'plus the intervals-only theorem, no IVT-specific argument needed.',
    targetedMisconceptions: [`${CONNECTEDNESS}:MC-1`, `${CONNECTEDNESS}:MC-2`, `${CONNECTEDNESS}:MC-3`],
    source: eb(CONNECTEDNESS, 'Core Understanding — separation being a precise closure-based condition never just looks split, a set failing to be an interval without an obviously missing member since the rationals split at an irrational, and the Intermediate Value Theorem falling out directly from connectedness-preservation never requiring its own independent proof technique'),
  },
  {
    conceptId: DIFFERENTIABILITY_RIGOROUS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'NON-DIFFERENTIABILITY IS RIGOROUSLY PROVEN VIA DISAGREEING ONE-SIDED DIFFERENCE '
      + 'QUOTIENTS, NEVER JUST "THE GRAPH HAS A CORNER": for $f(x)=|x|$ at 0: the right-hand '
      + 'difference quotient equals 1 for positive $h$; the left-hand difference quotient equals '
      + '-1 for negative $h$. Since these disagree, the two-sided limit defining the derivative '
      + 'at 0 does not exist — rigorously confirmed by one-sided-limit disagreement, the SAME '
      + 'machinery already used for continuity, applied here to the difference-quotient function '
      + 'of $h$.\n\n'
      + 'DIFFERENTIABILITY IMPLIES CONTINUITY — A GENUINE PROOF FROM LIMIT LAWS, NEVER A FACT TO '
      + 'MERELY CITE: suppose the derivative at $a$ exists. Then $f(a+h)-f(a)$ equals the '
      + 'difference quotient times $h$, which tends to the derivative times 0, i.e. 0, as $h$ '
      + 'tends to 0 — so $f(a+h)$ tends to $f(a)$, exactly continuity at $a$. THE CONVERSE '
      + 'GENUINELY FAILS: $f(x)=|x|$ is continuous everywhere (including at 0) but NOT '
      + 'differentiable at 0 — differentiability is a strictly STRONGER condition than '
      + 'continuity, never equivalent to it.\n\n'
      + 'IN MULTIPLE VARIABLES: ALL PARTIALS EXISTING IS NECESSARY BUT NOT SUFFICIENT FOR TOTAL '
      + 'DIFFERENTIABILITY: for $f(x,y)=xy/(x^2+y^2)$ (with $f(0,0)=0$): along the x-axis, $f$ is '
      + 'identically 0, so the partial derivative in $x$ at the origin is 0; similarly for $y$ — '
      + 'BOTH partials exist. But along the line $y=x$: $f(x,x)$ equals one-half for every '
      + 'nonzero $x$ — $f$ does not even APPROACH $f(0,0)=0$ along this direction, so $f$ is not '
      + 'even continuous at the origin, let alone totally differentiable, DESPITE both partials '
      + 'existing there. Partials only probe behavior along the coordinate axes; total '
      + 'differentiability requires one linear approximation valid in EVERY direction '
      + 'simultaneously.',
    targetedMisconceptions: [`${DIFFERENTIABILITY_RIGOROUS}:MC-1`, `${DIFFERENTIABILITY_RIGOROUS}:MC-2`, `${DIFFERENTIABILITY_RIGOROUS}:MC-3`],
    source: eb(DIFFERENTIABILITY_RIGOROUS, 'Core Understanding — non-differentiability being rigorously proven via disagreeing one-sided difference quotients never just a graph corner, differentiability implying continuity being a genuine proof from limit laws whose converse genuinely fails, and all partials existing being necessary but never sufficient for total differentiability'),
  },
  {
    conceptId: RIEMANN_INTEGRAL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'DARBOUX SUMS SQUEEZE THE TRUE AREA FROM ABOVE AND BELOW: for $f(x)=x^2$ on [0,2], with the '
      + 'partition {0,1,2}: on [0,1], the supremum is 1 and infimum is 0; on [1,2], the supremum '
      + 'is 4 and infimum is 1. The upper sum is 5, the lower sum is 1. Refining the partition '
      + 'brings both bounds CLOSER to the true value (roughly 2.67).\n\n'
      + 'RIEMANN INTEGRABILITY REQUIRES THE BEST POSSIBLE BOUNDS TO COINCIDE EXACTLY, OVER ALL '
      + 'PARTITIONS: a function is Riemann integrable exactly when the infimum of the upper sums '
      + 'equals the supremum of the lower sums — the smallest possible upper estimate and the '
      + 'largest possible lower estimate, taken over EVERY partition, must match exactly. This '
      + 'common value IS the definite integral, making the informal "limit of Riemann sums" '
      + 'fully rigorous: the bounds must genuinely converge to the SAME number, never merely '
      + '"look close."\n\n'
      + 'BOUNDEDNESS IS NECESSARY BUT NOT SUFFICIENT — THE DIRICHLET FUNCTION PROVES IT: for the '
      + 'function equal to 1 at every rational and 0 at every irrational, on [0,1]: every '
      + 'subinterval, however small, contains BOTH rationals and irrationals (density), so EVERY '
      + 'partition gives an upper sum of 1 and a lower sum of 0. Thus the infimum of upper sums '
      + 'is 1, never equal to the supremum of lower sums, which is 0 — NOT Riemann integrable, '
      + 'despite being perfectly bounded (values only 0 or 1). Boundedness rules out one failure '
      + 'mode (unbounded functions definitely fail) but never guarantees success on its own.',
    targetedMisconceptions: [`${RIEMANN_INTEGRAL}:MC-1`, `${RIEMANN_INTEGRAL}:MC-2`, `${RIEMANN_INTEGRAL}:MC-3`],
    source: eb(RIEMANN_INTEGRAL, 'Core Understanding — Darboux sums squeezing the true area from above and below, Riemann integrability requiring the best possible bounds to coincide exactly over all partitions, and boundedness being necessary but not sufficient since the Dirichlet function is bounded yet not integrable'),
  },
]

export const MATHEMATICS_REAL_CONNECTEDNESS_DIFFERENTIABILITY_RIGOROUS_RIEMANN_INTEGRAL_PROBES: SeedProbe[] = [
  {
    conceptId: CONNECTEDNESS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is a set disconnected simply whenever you can visually identify a "gap" in it?',
    choices: [
      { text: 'No — connectedness is decided by a precise closure-based separation check (whether two nonempty sets\' closures avoid touching each other), not by eyeballing a visual gap, though the two happen to agree for simple examples like [0,1] union [2,3]', isCorrect: true },
      { text: 'Yes — a set is disconnected exactly whenever you can visually spot a gap in it', isCorrect: false, misconceptionId: `${CONNECTEDNESS}:MC-1` },
      { text: "Yes, since connectedness is fundamentally a visual, informal property with no precise mathematical test", isCorrect: false, misconceptionId: `${CONNECTEDNESS}:MC-1` },
    ],
    targetedMisconceptions: [`${CONNECTEDNESS}:MC-1`],
    source: eb(CONNECTEDNESS, 'Discovery Question 1 as a detection probe (verbatim) — whether disconnection is simply a visual gap, an answer of "yes" confirming CONNECTEDNESS-AS-INFORMAL-VISUAL-NOTION'),
  },
  {
    conceptId: CONNECTEDNESS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "Must a subset of R that fails to be connected always have an obviously 'missing' point that is itself a member of that space?",
    choices: [
      { text: 'No — the rationals split cleanly at the irrational √2, which is not even a member of the rationals; a splitting point never needs to belong to the set itself for the set to be disconnected', isCorrect: true },
      { text: 'Yes — every disconnected subset of R must have an obviously missing point that is itself part of the ambient space', isCorrect: false, misconceptionId: `${CONNECTEDNESS}:MC-2` },
      { text: "Yes, since disconnection can only occur at a specific removed point that belongs to the space in question", isCorrect: false, misconceptionId: `${CONNECTEDNESS}:MC-2` },
    ],
    targetedMisconceptions: [`${CONNECTEDNESS}:MC-2`],
    source: eb(CONNECTEDNESS, 'Discovery Question 2 as a detection probe (verbatim) — whether disconnection requires an obviously missing member point, an answer of "yes" confirming DISCONNECTION-ASSUMED-TO-REQUIRE-A-MEMBER-GAP'),
  },
  {
    conceptId: CONNECTEDNESS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does the Intermediate Value Theorem require its own independent proof technique, separate from connectedness?',
    choices: [
      { text: 'No — IVT follows directly in two steps: continuous maps preserve connectedness, and intervals are the only connected subsets of R; combining these forces the image of a connected interval to contain every value between its endpoints, with no separate IVT-specific argument needed', isCorrect: true },
      { text: 'Yes — the Intermediate Value Theorem requires its own dedicated proof technique, entirely unrelated to connectedness', isCorrect: false, misconceptionId: `${CONNECTEDNESS}:MC-3` },
      { text: "Yes, since IVT is a standalone axiom of real analysis that cannot be derived from any other property", isCorrect: false, misconceptionId: `${CONNECTEDNESS}:MC-3` },
    ],
    targetedMisconceptions: [`${CONNECTEDNESS}:MC-3`],
    source: eb(CONNECTEDNESS, 'Discovery Question 3 as a detection probe (verbatim) — whether IVT requires its own independent proof technique, an answer of "yes" confirming IVT-ASSUMED-TO-NEED-INDEPENDENT-PROOF'),
  },
  {
    conceptId: DIFFERENTIABILITY_RIGOROUS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is f(x)=|x| continuous at 0? (asked right after establishing it is non-differentiable there)',
    choices: [
      { text: 'Yes, it is continuous at 0 — non-differentiability and discontinuity are genuinely separate claims; |x| is the standing counterexample proving "not differentiable" never implies "not continuous"', isCorrect: true },
      { text: 'No — since |x| is not differentiable at 0, it cannot be continuous there either', isCorrect: false, misconceptionId: `${DIFFERENTIABILITY_RIGOROUS}:MC-1` },
      { text: "No, since failing differentiability at a point always forces discontinuity at that same point", isCorrect: false, misconceptionId: `${DIFFERENTIABILITY_RIGOROUS}:MC-1` },
    ],
    targetedMisconceptions: [`${DIFFERENTIABILITY_RIGOROUS}:MC-1`],
    source: eb(DIFFERENTIABILITY_RIGOROUS, 'Discovery Question 1 as a detection probe (verbatim) — whether |x| is continuous at 0 despite being non-differentiable there, an answer of "no" confirming NON-DIFFERENTIABILITY-IMPLIES-DISCONTINUITY'),
  },
  {
    conceptId: DIFFERENTIABILITY_RIGOROUS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If all partial derivatives of a multivariable function exist at a point, must the function be (totally) differentiable there?',
    choices: [
      { text: 'No — f(x,y)=xy/(x²+y²) has both partial derivatives equal to 0 at the origin, yet along the line y=x the function equals 1/2 everywhere except the origin, so it is not even continuous there, let alone totally differentiable', isCorrect: true },
      { text: 'Yes — all partial derivatives existing at a point is always sufficient to guarantee total differentiability there', isCorrect: false, misconceptionId: `${DIFFERENTIABILITY_RIGOROUS}:MC-2` },
      { text: "Yes, since partial derivatives along the coordinate axes fully capture a function's behavior in every direction", isCorrect: false, misconceptionId: `${DIFFERENTIABILITY_RIGOROUS}:MC-2` },
    ],
    targetedMisconceptions: [`${DIFFERENTIABILITY_RIGOROUS}:MC-2`],
    source: eb(DIFFERENTIABILITY_RIGOROUS, 'Discovery Question 2 as a detection probe (verbatim) — whether all partials existing guarantees total differentiability, an answer of "yes" confirming PARTIALS-EXIST-IMPLIES-TOTAL-DIFFERENTIABILITY'),
  },
  {
    conceptId: DIFFERENTIABILITY_RIGOROUS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Can you justify "differentiable implies continuous" by citing the algebraic identity, or only by restating the conclusion?',
    choices: [
      { text: 'By the algebraic identity — writing f(a+h)-f(a) as the difference quotient times h shows it tends to the derivative times 0, i.e. 0, as h tends to 0, proving continuity directly from limit laws rather than merely citing the fact', isCorrect: true },
      { text: 'The implication can only be restated as a known fact — it has no underlying algebraic proof that can be walked through', isCorrect: false, misconceptionId: `${DIFFERENTIABILITY_RIGOROUS}:MC-3` },
      { text: "The implication is simply an axiom of real analysis with no derivation from limit laws", isCorrect: false, misconceptionId: `${DIFFERENTIABILITY_RIGOROUS}:MC-3` },
    ],
    targetedMisconceptions: [`${DIFFERENTIABILITY_RIGOROUS}:MC-3`],
    source: eb(DIFFERENTIABILITY_RIGOROUS, 'Discovery Question 3 as a detection probe (verbatim) — whether differentiable-implies-continuous can be justified via the algebraic identity or only cited, an answer treating it as only restatable confirming IMPLICATION-CITED-WITHOUT-PROOF'),
  },
  {
    conceptId: RIEMANN_INTEGRAL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Since the Dirichlet function is bounded (only takes values 0 and 1), must it be Riemann integrable?',
    choices: [
      { text: 'No — every subinterval, however small, contains both rationals and irrationals, so every partition gives an upper sum of 1 and lower sum of 0; the infimum of upper sums (1) never equals the supremum of lower sums (0), so it is NOT integrable despite being bounded', isCorrect: true },
      { text: 'Yes — a bounded function must automatically be Riemann integrable, since boundedness is the key requirement', isCorrect: false, misconceptionId: `${RIEMANN_INTEGRAL}:MC-1` },
      { text: "Yes, since taking only finitely many values (like 0 and 1) always guarantees Riemann integrability", isCorrect: false, misconceptionId: `${RIEMANN_INTEGRAL}:MC-1` },
    ],
    targetedMisconceptions: [`${RIEMANN_INTEGRAL}:MC-1`],
    source: eb(RIEMANN_INTEGRAL, 'Discovery Question 1 as a detection probe (verbatim) — whether the bounded Dirichlet function must be Riemann integrable, an answer of "yes" confirming BOUNDEDNESS-ASSUMED-SUFFICIENT-FOR-INTEGRABILITY'),
  },
  {
    conceptId: RIEMANN_INTEGRAL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is computing U(f,P) for one specific partition enough to determine Riemann integrability?',
    choices: [
      { text: 'No — Riemann integrability is defined via the infimum of U(f,P) and supremum of L(f,P) taken over EVERY possible partition, not the value from any single partition; one partition\'s sums only give a data point, never the definitive answer', isCorrect: true },
      { text: 'Yes — computing the upper and lower sums for one partition is sufficient to determine whether a function is Riemann integrable', isCorrect: false, misconceptionId: `${RIEMANN_INTEGRAL}:MC-2` },
      { text: "Yes, since all partitions of the same interval always produce identical upper and lower sums for a given function", isCorrect: false, misconceptionId: `${RIEMANN_INTEGRAL}:MC-2` },
    ],
    targetedMisconceptions: [`${RIEMANN_INTEGRAL}:MC-2`],
    source: eb(RIEMANN_INTEGRAL, 'Discovery Question 2 as a detection probe (verbatim) — whether one partition\'s sums determine integrability, an answer of "yes" confirming UPPER-LOWER-SUMS-CONFUSED-WITH-SUP-INF-OVER-ALL-PARTITIONS'),
  },
  {
    conceptId: RIEMANN_INTEGRAL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does refining a partition always eventually close the U−L gap, for any function?',
    choices: [
      { text: 'No — for the Dirichlet function, every subinterval, no matter how small, still contains both rationals and irrationals, so U(f,P)=1 and L(f,P)=0 at EVERY level of refinement; the gap never closes, unlike for continuous functions such as x²', isCorrect: true },
      { text: 'Yes — refining a partition finely enough always eventually closes the upper-lower gap, for any bounded function whatsoever', isCorrect: false, misconceptionId: `${RIEMANN_INTEGRAL}:MC-3` },
      { text: "Yes, since making subintervals arbitrarily small always forces the supremum and infimum on each piece to converge", isCorrect: false, misconceptionId: `${RIEMANN_INTEGRAL}:MC-3` },
    ],
    targetedMisconceptions: [`${RIEMANN_INTEGRAL}:MC-3`],
    source: eb(RIEMANN_INTEGRAL, 'Discovery Question 3 as a detection probe (verbatim) — whether refining a partition always closes the gap for any function, an answer of "yes" confirming FINER-PARTITION-ASSUMED-TO-ALWAYS-CLOSE-THE-GAP'),
  },
]
