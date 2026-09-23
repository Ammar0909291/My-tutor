/**
 * Batch: continuity-rigorous, sup-inf, archimedean (math.real).
 *
 * Fresh Phase 0 frontier recompute after the completeness/metric-space
 * domain-opening batch found 5 ready concepts (archimedean, continuity-
 * rigorous, convergence-sequences, open-sets, sup-inf); this batch selects
 * continuity-rigorous (which unlocks math.real.ivt directly — the concept
 * math.num's 5 blocked concepts transitively need), plus sup-inf and
 * archimedean (both requiring only completeness, now authored). open-sets
 * and convergence-sequences remain ready and are deferred to the next
 * batch. Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.real.
 * {continuity-rigorous,sup-inf,archimedean}.md.
 *
 * Grade band: all three adopt GradeBand.UNDERGRADUATE, continuing math.real's
 * established domain baseline.
 *
 *   CONTINUITY-RIGOROUS  Delta is NEVER chosen before epsilon in an
 *           epsilon-delta proof — delta must be produced as a formula IN
 *           RESPONSE TO an arbitrary given epsilon, never picked first and
 *           then tested against whatever epsilon it happens to satisfy;
 *           the sequential criterion requires EVERY sequence converging to
 *           the point, NEVER just one convenient sequence — a single
 *           failing sequence proves discontinuity, but one succeeding
 *           sequence proves nothing; and a function being defined at every
 *           nearby point is NEVER the same as being continuous there —
 *           the one-sided limits can still disagree despite full
 *           definedness.
 *   SUP-INF  The supremum test has TWO independent parts, and BOTH are
 *           required — being an upper bound is only half; being the LEAST
 *           upper bound is the other, equally necessary half; completeness's
 *           guarantee of existence is a genuine property of the reals that
 *           NEVER extends to the rationals — a bounded-above rational set
 *           can lack a rational supremum entirely; and attained-versus-
 *           unattained is a question NEVER conflated with existence — a
 *           supremum always exists for a bounded-above set in R, whether
 *           or not any element of the set actually reaches it.
 *   ARCHIMEDEAN  The Archimedean property is a PROVEN THEOREM derived from
 *           completeness via contradiction, NEVER an independent axiom;
 *           the fact that 1/n can be forced below any positive tolerance
 *           is a JUSTIFIED consequence of the Archimedean property, NEVER
 *           self-evident without proof; and density of the rationals in
 *           the reals relies specifically on the Archimedean property's
 *           fine-spacing guarantee, NEVER merely on the rationals "having
 *           infinitely many elements."
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const CONTINUITY_RIGOROUS = 'math.real.continuity-rigorous'
const SUP_INF = 'math.real.sup-inf'
const ARCHIMEDEAN = 'math.real.archimedean'

export const MATHEMATICS_REAL_CONTINUITY_RIGOROUS_SUP_INF_ARCHIMEDEAN_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CONTINUITY_RIGOROUS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'DELTA IS PRODUCED AFTER EPSILON IS GIVEN, NEVER CHOSEN FIRST: proving $f(x)=2x+1$ '
      + 'continuous at $a=3$ (where $f(3)=7$): given an ARBITRARY $\\varepsilon>0$, compute '
      + '$|f(x)-7|=|2x-6|=2|x-3|$. This needs $(2|x-3|<\\varepsilon)$, i.e. '
      + '$|x-3|<\\varepsilon/2$ — so choose $\\delta=\\varepsilon/2$, a FORMULA depending on '
      + '$\\varepsilon$, discovered by solving the inequality backward. This works for every '
      + '$\\varepsilon>0$ by that formula. Picking $\\delta$ FIRST (say $\\delta=0.01$) and then '
      + 'checking which $\\varepsilon$ it happens to satisfy is NOT a proof — it only handles '
      + 'those specific $\\varepsilon$ values, never an arbitrary one, missing arbitrarily small '
      + '$\\varepsilon$ entirely.\n\n'
      + 'THE SEQUENTIAL CRITERION REQUIRES EVERY SEQUENCE, NEVER JUST ONE: for the function equal '
      + 'to $x$ everywhere except $f(0)=1$, at $a=0$: the sequence $x_n=1/n\\to0$ gives '
      + '$f(x_n)=1/n\\to0\\ne1=f(0)$ — already revealing discontinuity. A single FAILING sequence '
      + 'is fully sufficient to prove discontinuity, but a single SUCCEEDING sequence proves '
      + 'nothing — continuity requires the implication to hold for EVERY sequence converging to '
      + '$a$, and checking only one convenient sequence can wrongly suggest continuity that a '
      + 'different sequence would immediately disprove.\n\n'
      + '"DEFINED NEARBY" IS NOT "CONTINUOUS" — THE LIMIT MUST ALSO MATCH THE ACTUAL VALUE: for '
      + 'a piecewise function equal to $x^2$ when $x<2$ and $x+5$ when $x\\ge2$, at $a=2$: the '
      + 'function is defined at EVERY real number, no domain gaps anywhere. But as $x$ approaches '
      + '2 from below, the function approaches 4; from above, it approaches 7 — these ONE-SIDED '
      + 'LIMITS DISAGREE, so the limit at 2 does not exist, and the function is discontinuous at '
      + '2 DESPITE being fully defined everywhere nearby. "Fully defined nearby" and "continuous" '
      + 'are entirely different claims.',
    targetedMisconceptions: [`${CONTINUITY_RIGOROUS}:MC-1`, `${CONTINUITY_RIGOROUS}:MC-2`, `${CONTINUITY_RIGOROUS}:MC-3`],
    source: eb(CONTINUITY_RIGOROUS, 'Core Understanding — delta never being chosen before epsilon since it must be produced as a formula in response to an arbitrary given epsilon, the sequential criterion requiring every sequence never just one, and defined nearby never being the same as continuous since one-sided limits can still disagree despite full definedness'),
  },
  {
    conceptId: SUP_INF, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE SUPREMUM TEST HAS TWO INDEPENDENT PARTS, AND BOTH ARE REQUIRED: $u=\\sup(S)$ requires '
      + '(i) $u$ is an upper bound, AND (ii) no smaller number is also an upper bound. For '
      + 'S=(0,3): part (i) holds for $u=3$ since every element of $S$ is less than 3; part (ii) '
      + 'holds since for any $\\varepsilon>0$, some element of $S$ exceeds $(3-\\varepsilon)$. BOTH '
      + 'parts are needed — part (i) alone only establishes SOME upper bound (10 is also an '
      + 'upper bound of (0,3), but fails part (ii) since 9 is still an upper bound); part (ii) is '
      + 'what makes $u$ specifically the LEAST one.\n\n'
      + "COMPLETENESS'S GUARANTEE OF EXISTENCE IS SPECIFICALLY AN R-PROPERTY, GENUINELY FAILING "
      + 'IN THE RATIONALS: reusing the canonical example, the set of positive rationals whose '
      + 'square is less than 2 is bounded above in the rationals (for example by 2), but has NO '
      + 'least upper bound within the rationals — any rational upper bound can always be '
      + 'improved by a strictly smaller rational upper bound, since the "gap" being approached, '
      + '$\\sqrt2$, is irrational. In the reals, completeness guarantees the supremum genuinely '
      + 'exists as a real number — this existence guarantee is exactly completeness\'s real '
      + 'content, not automatic for any ordered field.\n\n'
      + 'ATTAINED VERSUS UNATTAINED IS A SEPARATE QUESTION FROM EXISTENCE: the supremum always '
      + 'EXISTS for a non-empty bounded-above subset of R (by completeness), but whether it '
      + 'belongs to the set itself is independent. For $S_1=[0,3]$: the supremum 3 belongs to '
      + '$S_1$, so 3 is both the supremum AND the maximum. For $S_2=(0,3)$: the supremum 3 is '
      + 'not in $S_2$, so $S_2$ has NO maximum at all — its elements get arbitrarily close to 3 '
      + 'without ever reaching it, yet the supremum 3 is still a perfectly well-defined real '
      + 'number.',
    targetedMisconceptions: [`${SUP_INF}:MC-1`, `${SUP_INF}:MC-2`, `${SUP_INF}:MC-3`],
    source: eb(SUP_INF, 'Core Understanding — the supremum test having two independent parts both required, completeness\'s guarantee of existence being specifically an R-property genuinely failing in the rationals, and attained-versus-unattained being a separate question from existence'),
  },
  {
    conceptId: ARCHIMEDEAN, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE ARCHIMEDEAN PROPERTY IS A PROVEN THEOREM, NEVER AN INDEPENDENT AXIOM: suppose the '
      + 'natural numbers WERE bounded above in R. By completeness, they would have a supremum '
      + '$u$. Since $u$ is the LEAST upper bound, $u-1$ is NOT an upper bound, so some natural '
      + 'number $n$ satisfies $n>u-1$, i.e. $n+1>u$. But $n+1$ is also a natural number, and '
      + '$n+1>u$ CONTRADICTS $u$ being an upper bound of the naturals in the first place. This '
      + 'contradiction proves the naturals cannot be bounded above — the Archimedean property is '
      + 'a genuine CONSEQUENCE of completeness, reusing completeness\'s own supremum machinery '
      + 'directly, never a separately assumed fact.\n\n'
      + 'ARBITRARILY SMALL 1/N IS A DIRECT, JUSTIFIED CONSEQUENCE, NEVER SELF-EVIDENT WITHOUT '
      + 'PROOF: given any $\\varepsilon>0$, applying the Archimedean property to '
      + '$x=1/\\varepsilon$ gives some natural number $n$ with $n>1/\\varepsilon$, hence '
      + '$(1/n<\\varepsilon)$. For $\\varepsilon=0.0001$: taking $n$ greater than 10,000 (say '
      + '$n=10{,}001$) gives $(1/n)$ approximately 0.0001, genuinely below $\\varepsilon$. This '
      + 'single fact — that $(1/n)$ can be forced below ANY prescribed positive tolerance — is the '
      + 'exact machinery underlying every epsilon-N limit argument; it is a JUSTIFIED consequence '
      + 'of the Archimedean property, not an assumption that needs no proof.\n\n'
      + 'DENSITY OF THE RATIONALS IN THE REALS RELIES SPECIFICALLY ON THE ARCHIMEDEAN PROPERTY, '
      + 'NEVER MERELY ON THE RATIONALS "HAVING INFINITELY MANY ELEMENTS": for any $a<b$ in R, '
      + 'choose $n$ with $(1/n<b-a)$ (possible by the corollary above); then some multiple of '
      + '$(1/n)$ lands strictly in the interval $(a,b)$, since consecutive multiples of $(1/n)$ are '
      + 'spaced closer together than the gap $b-a$. Having "infinitely many" rationals alone '
      + 'never guarantees this fine spacing — it is specifically the Archimedean property\'s '
      + 'arbitrarily-small-$(1/n)$ guarantee that makes the density argument go through.',
    targetedMisconceptions: [`${ARCHIMEDEAN}:MC-1`, `${ARCHIMEDEAN}:MC-2`, `${ARCHIMEDEAN}:MC-3`],
    source: eb(ARCHIMEDEAN, 'Core Understanding — the Archimedean property being a proven theorem never an independent axiom, arbitrarily small 1/n being a direct justified consequence never self-evident without proof, and density of the rationals relying specifically on the Archimedean property never merely on infinitude'),
  },
]

export const MATHEMATICS_REAL_CONTINUITY_RIGOROUS_SUP_INF_ARCHIMEDEAN_PROBES: SeedProbe[] = [
  {
    conceptId: CONTINUITY_RIGOROUS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If a δ-value is found that makes the tolerance condition true for one specific ε, is the function proven continuous?',
    choices: [
      { text: 'No — a valid continuity proof must produce δ as a formula depending on an ARBITRARY given ε, discovered by solving the inequality backward; picking δ first and checking which ε it satisfies only handles specific values, never an arbitrary one', isCorrect: true },
      { text: 'Yes — finding any δ that satisfies the condition for one particular ε is sufficient to prove continuity', isCorrect: false, misconceptionId: `${CONTINUITY_RIGOROUS}:MC-1` },
      { text: "Yes, since continuity only requires the condition to hold for at least one epsilon-delta pair", isCorrect: false, misconceptionId: `${CONTINUITY_RIGOROUS}:MC-1` },
    ],
    targetedMisconceptions: [`${CONTINUITY_RIGOROUS}:MC-1`],
    source: eb(CONTINUITY_RIGOROUS, 'Discovery Question 1 as a detection probe (verbatim) — whether a delta found for one epsilon proves continuity, an answer of "yes" confirming DELTA-CHOSEN-BEFORE-EPSILON'),
  },
  {
    conceptId: CONTINUITY_RIGOROUS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If one sequence converging to a point gives the expected limit, is that enough to confirm continuity there?',
    choices: [
      { text: 'No — the sequential criterion requires EVERY sequence converging to the point to satisfy the limit condition; checking only one convenient sequence can wrongly suggest continuity that a different sequence would immediately disprove', isCorrect: true },
      { text: 'Yes — finding one sequence that converges correctly is sufficient to confirm continuity at that point', isCorrect: false, misconceptionId: `${CONTINUITY_RIGOROUS}:MC-2` },
      { text: "Yes, since all sequences converging to the same point must behave identically under any function", isCorrect: false, misconceptionId: `${CONTINUITY_RIGOROUS}:MC-2` },
    ],
    targetedMisconceptions: [`${CONTINUITY_RIGOROUS}:MC-2`],
    source: eb(CONTINUITY_RIGOROUS, 'Discovery Question 2 as a detection probe (verbatim) — whether one succeeding sequence confirms continuity, an answer of "yes" confirming ONE-SEQUENCE-CONFIRMS-SEQUENTIAL-CONTINUITY'),
  },
  {
    conceptId: CONTINUITY_RIGOROUS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If a function is defined at every point near a, with no domain gaps, must it be continuous there?',
    choices: [
      { text: 'No — a piecewise function can be defined at every real number yet have disagreeing one-sided limits at a seam point, making it discontinuous there despite full definedness; "defined nearby" and "continuous" are entirely different claims', isCorrect: true },
      { text: 'Yes — a function with no gaps in its domain near a point must automatically be continuous at that point', isCorrect: false, misconceptionId: `${CONTINUITY_RIGOROUS}:MC-3` },
      { text: "Yes, since continuity is guaranteed as long as the function has a defined value at every nearby real number", isCorrect: false, misconceptionId: `${CONTINUITY_RIGOROUS}:MC-3` },
    ],
    targetedMisconceptions: [`${CONTINUITY_RIGOROUS}:MC-3`],
    source: eb(CONTINUITY_RIGOROUS, 'Discovery Question 3 as a detection probe (verbatim) — whether a gap-free domain guarantees continuity, an answer of "yes" confirming DEFINED-NEARBY-MEANS-CONTINUOUS'),
  },
  {
    conceptId: SUP_INF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does 10 qualify as "the supremum" of (0,3), since it is an upper bound?',
    choices: [
      { text: 'No — 10 is AN upper bound (part (i) holds) but 9 is also an upper bound smaller than 10, so part (ii) fails; the supremum must be specifically the LEAST upper bound, which is 3', isCorrect: true },
      { text: 'Yes — since 10 is greater than every element of (0,3), it qualifies as the supremum of the set', isCorrect: false, misconceptionId: `${SUP_INF}:MC-3` },
      { text: "Yes, since any valid upper bound of a set automatically counts as its supremum", isCorrect: false, misconceptionId: `${SUP_INF}:MC-3` },
    ],
    targetedMisconceptions: [`${SUP_INF}:MC-3`],
    source: eb(SUP_INF, 'Discovery Question 3 as a detection probe (verbatim) — whether any upper bound qualifies as the supremum, an answer of "yes" confirming UPPER-BOUND-ALONE-MISTAKEN-FOR-SUPREMUM'),
  },
  {
    conceptId: SUP_INF, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does every bounded-above set of rational numbers have a supremum that is itself rational?',
    choices: [
      { text: 'No — the set of positive rationals whose square is less than 2 is bounded above in Q but has no rational least upper bound, since every rational bound can be improved; this existence guarantee genuinely fails in Q and only holds in R', isCorrect: true },
      { text: 'Yes — every bounded-above subset of the rational numbers has a supremum that is itself rational', isCorrect: false, misconceptionId: `${SUP_INF}:MC-1` },
      { text: "Yes, since the rational numbers form a complete ordered field just like the reals", isCorrect: false, misconceptionId: `${SUP_INF}:MC-1` },
    ],
    targetedMisconceptions: [`${SUP_INF}:MC-1`],
    source: eb(SUP_INF, 'Discovery Question 1 as a detection probe (verbatim) — whether every bounded-above rational set has a rational supremum, an answer of "yes" confirming SUPREMUM-EXISTENCE-ASSUMED-IN-RATIONALS'),
  },
  {
    conceptId: SUP_INF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does sup((0,3))=3 mean that 3 is an element of (0,3)?',
    choices: [
      { text: 'No — [0,3] has supremum 3 which IS in the set (attained, also the maximum), while (0,3) has the same supremum 3 which is NOT in the set (unattained, no maximum exists); existence and attainment are separate questions', isCorrect: true },
      { text: 'Yes — if a set has a supremum, that supremum value must always belong to the set itself', isCorrect: false, misconceptionId: `${SUP_INF}:MC-2` },
      { text: "Yes, since the supremum is defined as the greatest element actually contained in the set", isCorrect: false, misconceptionId: `${SUP_INF}:MC-2` },
    ],
    targetedMisconceptions: [`${SUP_INF}:MC-2`],
    source: eb(SUP_INF, 'Discovery Question 2 as a detection probe (verbatim) — whether the supremum of (0,3) must belong to (0,3), an answer of "yes" confirming SUPREMUM-ASSUMED-ALWAYS-ATTAINED'),
  },
  {
    conceptId: ARCHIMEDEAN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the Archimedean property an independent axiom of R, separate from completeness, or can it be derived FROM completeness?',
    choices: [
      { text: 'It can be derived from completeness — assuming the naturals were bounded above yields a supremum u; then u-1 is not an upper bound, giving some n with n+1>u, which contradicts u being an upper bound. This proves it as a theorem, never an independent axiom', isCorrect: true },
      { text: 'It is an independent axiom of R, assumed separately alongside completeness rather than proven from it', isCorrect: false, misconceptionId: `${ARCHIMEDEAN}:MC-1` },
      { text: "It is a definition rather than either an axiom or a derivable theorem", isCorrect: false, misconceptionId: `${ARCHIMEDEAN}:MC-1` },
    ],
    targetedMisconceptions: [`${ARCHIMEDEAN}:MC-1`],
    source: eb(ARCHIMEDEAN, 'Discovery Question 1 as a detection probe (verbatim) — whether the Archimedean property is an independent axiom or derivable from completeness, an answer of "independent axiom" confirming ARCHIMEDEAN-PROPERTY-TREATED-AS-INDEPENDENT-AXIOM'),
  },
  {
    conceptId: ARCHIMEDEAN, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the density of Q in R hold for a completely unrelated reason, or does it rely specifically on the Archimedean property?',
    choices: [
      { text: 'It relies specifically on the Archimedean property — choosing n with 1/n smaller than the interval\'s width guarantees a rational multiple of 1/n lands strictly inside; merely having infinitely many rationals never guarantees this fine spacing', isCorrect: true },
      { text: 'It holds for a completely unrelated reason — Q\'s density in R follows simply from Q having infinitely many elements', isCorrect: false, misconceptionId: `${ARCHIMEDEAN}:MC-2` },
      { text: "It holds because R and Q have the same cardinality, which alone guarantees density", isCorrect: false, misconceptionId: `${ARCHIMEDEAN}:MC-2` },
    ],
    targetedMisconceptions: [`${ARCHIMEDEAN}:MC-2`],
    source: eb(ARCHIMEDEAN, 'Discovery Question 2 as a detection probe (verbatim) — whether density of Q relies on the Archimedean property or mere infinitude, an answer citing infinitude alone confirming DENSITY-OF-RATIONALS-TREATED-AS-UNRELATED-FACT'),
  },
  {
    conceptId: ARCHIMEDEAN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is "1/n can be made smaller than any ε" simply obvious, or does it require justification?',
    choices: [
      { text: 'It requires justification — it is a direct consequence of applying the Archimedean property to x=1/ε, giving some n with n>1/ε and hence 1/n<ε; it is a proven fact underlying every epsilon-N limit argument, not a free intuition', isCorrect: true },
      { text: 'It is simply obvious and needs no justification — of course 1/n gets arbitrarily small as n grows', isCorrect: false, misconceptionId: `${ARCHIMEDEAN}:MC-3` },
      { text: "It is a basic property of division that requires no connection to any deeper axiom of the real numbers", isCorrect: false, misconceptionId: `${ARCHIMEDEAN}:MC-3` },
    ],
    targetedMisconceptions: [`${ARCHIMEDEAN}:MC-3`],
    source: eb(ARCHIMEDEAN, 'Discovery Question 3 as a detection probe (verbatim) — whether 1/n being arbitrarily small requires justification, an answer treating it as simply obvious confirming ARBITRARILY-SMALL-1/N-ASSUMED-OBVIOUS-WITHOUT-JUSTIFICATION'),
  },
]
