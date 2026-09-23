/**
 * Batch: combinatorics, inclusion-exclusion, binomial-theorem (math.disc).
 *
 * Continues math.disc (9/32 -> 12/32) after the combinations/graph-trees/
 * asymptotic-notation batch. Fresh frontier recompute found 17 ready
 * concepts; these 3 selected for their downstream value: combinatorics
 * unlocks generating-functions, inclusion-exclusion unlocks derangements,
 * and binomial-theorem (though it has no further KG unlock) is the
 * concept this program's math.disc excursion was originally opened to
 * reach, now itself ready and cross-linking directly to the
 * already-authored math.alg.binomial-theorem. Transcribed from the frozen
 * Educational Brain entries at educational-brain/concepts/mathematics/
 * math.disc.{combinatorics,inclusion-exclusion,binomial-theorem}.md.
 *
 * Grade band: all three are EB difficulty "proficient" (inclusion-exclusion,
 * combinatorics) or "developing" (binomial-theorem), and all require (or
 * primarily build on) math.disc.combinations, itself seeded GradeBand.HIGH.
 * Unlike recurrence-relation/asymptotic-notation (whose prerequisite chains
 * specifically pulled in undergraduate-level math.seq/math.calc content),
 * none of these three has an undergraduate-tagged prerequisite —
 * GradeBand.HIGH retained for all three, consistent with the domain's
 * established baseline.
 *
 *   COMBINATORICS  A bijection to an easy-to-count set is a genuinely
 *           independent counting technique, never limited to matching a
 *           memorized formula or brute-force enumeration; a correctly
 *           derived recurrence IS a complete answer, never merely a
 *           placeholder awaiting a closed form; "combinatorics" is the
 *           whole field of counting techniques, never a synonym for
 *           the permutations/combinations formulas alone.
 *   INCLUSION-EXCLUSION  For 3+ sets the sign pattern ALWAYS continues past
 *           pairwise subtraction to ADD BACK triple intersections, never
 *           stopping at "total minus pairwise overlaps"; "none of the
 *           properties" requires taking the COMPLEMENT of the union after
 *           computing it, never reporting the union itself; surjection
 *           counting requires the full systematic alternating-sum formula,
 *           never an ad hoc single-subtraction shortcut that only works by
 *           coincidence for small k.
 *   BINOMIAL-THEOREM  Each binomial coefficient in (x+y)ⁿ=ΣC(n,k)xᵏyⁿ⁻ᵏ
 *           arises from a genuinely COMBINATORIAL counting argument (which
 *           k of n factors contribute an x), never an algebraic pattern to
 *           memorize; Pascal's identity has a direct combinatorial
 *           in-or-out proof, never requiring factorial algebra; a specific
 *           term's coefficient is found directly via the general-term
 *           formula, never by expanding the full polynomial.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const COMBINATORICS = 'math.disc.combinatorics'
const INCLUSION_EXCLUSION = 'math.disc.inclusion-exclusion'
const BINOMIAL_THEOREM = 'math.disc.binomial-theorem'

export const MATHEMATICS_DISC_COMBINATORICS_INCLUSION_EXCLUSION_BINOMIAL_THEOREM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COMBINATORICS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A BIJECTION TO AN EASY-TO-COUNT SET IS A GENUINELY INDEPENDENT COUNTING TECHNIQUE, NEVER '
      + 'LIMITED TO MATCHING A MEMORIZED FORMULA OR ENUMERATION: how many subsets does a 5-element '
      + 'set have? Biject each subset onto a length-5 binary string (bit i=1 if element i is '
      + 'included). There are 2⁵=32 such strings, so there are 32 subsets — determined by exhibiting '
      + 'a one-to-one correspondence to an already-countable set, without directly enumerating '
      + 'subsets or matching a C(n,r)/P(n,r) formula at all.\n\n'
      + 'A CORRECTLY DERIVED RECURRENCE IS A COMPLETE ANSWER, NEVER MERELY A PLACEHOLDER AWAITING A '
      + 'CLOSED FORM: let aₙ count length-n binary strings with no two consecutive 1s. A valid '
      + 'string starting with 0 leaves aₙ₋₁ ways for the rest; starting with 1 forces the next digit '
      + 'to 0, leaving aₙ₋₂ ways for the remainder — so aₙ=aₙ₋₁+aₙ₋₂, with a₁=2, a₂=3. Computing '
      + 'a₃=a₂+a₁=5 is verified by direct listing (000,001,010,100,101) — exactly 5. This recurrence '
      + 'is itself the complete, valid answer to "how many"; it never needs conversion to a closed '
      + 'form to count as solved.\n\n'
      + '"COMBINATORICS" IS THE WHOLE FIELD OF COUNTING TECHNIQUES, NEVER A SYNONYM FOR THE '
      + 'PERMUTATIONS/COMBINATIONS FORMULAS ALONE: C(n,r) and P(n,r) are two specific tools within a '
      + 'much broader toolbox that also includes bijection, recursion, and generating functions '
      + '(which encode an entire counting sequence a₀,a₁,a₂,... as the coefficients of one power '
      + 'series A(x)=Σaₙxⁿ, enabling algebraic extraction of closed forms). Three further named '
      + 'techniques — stars-and-bars (distributing identical items into distinct bins), the '
      + 'pigeonhole principle (guaranteeing a collision when items outnumber categories), and '
      + 'inclusion-exclusion (correcting for overcounting in a union of overlapping sets) — each '
      + 'target distinct counting-problem shapes, developed in their own dedicated concepts.',
    targetedMisconceptions: [`${COMBINATORICS}:MC-1`, `${COMBINATORICS}:MC-2`, `${COMBINATORICS}:MC-3`],
    source: eb(COMBINATORICS, 'Core Understanding — bijective counting as a genuinely independent technique never limited to formula-matching or enumeration, a correctly derived recurrence as a complete answer never a placeholder, and combinatorics as the whole field of counting techniques never a synonym for its two best-known formulas'),
  },
  {
    conceptId: INCLUSION_EXCLUSION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'FOR 3+ SETS THE SIGN PATTERN ALWAYS CONTINUES TO ADD BACK TRIPLE INTERSECTIONS, NEVER '
      + 'STOPPING AT PAIRWISE SUBTRACTION: for |A|=40, |B|=35, |C|=30, pairwise intersections 15, '
      + '10, 12, and triple intersection 5: |A∪B∪C|=40+35+30-15-10-12+5=73. Omitting the +5 triple '
      + 'correction gives the WRONG answer 68 — each element in all 3 sets was added 3 times at the '
      + 'individual level, then subtracted 3 times at the pairwise level (net zero so far), so the '
      + '+5 restores its true single count. Individuals add, pairs subtract, triples add back, and '
      + 'so on, alternating — never stopping after the first subtraction for 3+ sets.\n\n'
      + '"NONE OF THE PROPERTIES" REQUIRES TAKING THE COMPLEMENT OF THE UNION, NEVER REPORTING THE '
      + 'UNION ITSELF: with 60 students total, 30 liking Math, 25 liking English, 10 liking both, '
      + 'the union |M∪E|=30+25-10=45 counts those liking AT LEAST ONE. But "how many like NEITHER" '
      + 'requires ONE MORE step: 60-45=15. Computing the union correctly and stopping there answers '
      + 'a genuinely different question than the one asked.\n\n'
      + 'SURJECTION COUNTING REQUIRES THE FULL SYSTEMATIC ALTERNATING-SUM FORMULA, NEVER AN AD HOC '
      + 'SINGLE-SUBTRACTION SHORTCUT: counting surjections from a 4-element set to a 3-element set '
      + 'via Σⱼ(-1)ʲC(3,j)(3-j)⁴=3⁴-C(3,1)2⁴+C(3,2)1⁴-C(3,3)0⁴=81-48+3-0=36 — derived systematically '
      + 'as inclusion-exclusion on the sets "functions missing element j." An ad hoc single '
      + 'subtraction like 3⁴-3·2⁴=81-48=33 happens to look plausible but is WRONG, since it omits '
      + 'the triple-correction term that becomes genuinely necessary once k≥3, unlike the k=2 case '
      + 'where a single subtraction coincidentally suffices.',
    targetedMisconceptions: [`${INCLUSION_EXCLUSION}:MC-1`, `${INCLUSION_EXCLUSION}:MC-2`, `${INCLUSION_EXCLUSION}:MC-3`],
    source: eb(INCLUSION_EXCLUSION, 'Core Understanding — the alternating sign pattern that always adds back triple (and higher) intersections for 3+ sets, "none of the properties" requiring the complement of the union rather than the union itself, and surjection counting requiring the full systematic alternating-sum formula rather than an ad hoc shortcut'),
  },
  {
    conceptId: BINOMIAL_THEOREM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'EACH BINOMIAL COEFFICIENT ARISES FROM A GENUINELY COMBINATORIAL COUNTING ARGUMENT, NEVER AN '
      + 'ALGEBRAIC PATTERN TO MEMORIZE: expanding (x+y)ⁿ=(x+y)(x+y)⋯(x+y) (n factors), each term is '
      + 'formed by choosing ONE letter (x or y) from EACH factor. The term xᵏyⁿ⁻ᵏ arises precisely '
      + 'when x is chosen from exactly k of the n factors — and the number of ways to make that '
      + 'choice is exactly C(n,k), the number of ways to select WHICH k factors contribute an x. '
      + 'This combinatorial derivation is WHY (x+y)ⁿ=ΣₖC(n,k)xᵏyⁿ⁻ᵏ, never a coincidental pattern.\n\n'
      + "PASCAL'S IDENTITY HAS A DIRECT COMBINATORIAL IN-OR-OUT PROOF, NEVER REQUIRING FACTORIAL "
      + 'ALGEBRA: C(n,k)=C(n-1,k-1)+C(n-1,k) because choosing k objects from n either INCLUDES one '
      + 'specific fixed object (leaving C(n-1,k-1) ways to choose the remaining k-1 from the other '
      + 'n-1) or EXCLUDES it (leaving C(n-1,k) ways to choose all k from the remaining n-1) — these '
      + 'cases are disjoint and exhaustive, so their counts sum. This structural argument explains '
      + 'WHY the identity holds and lets a learner reconstruct a full row of Pascal\'s triangle from '
      + 'the reasoning alone, never merely reciting a verified formula.\n\n'
      + 'A SPECIFIC TERM\'S COEFFICIENT IS FOUND DIRECTLY VIA THE GENERAL-TERM FORMULA, NEVER BY '
      + 'EXPANDING THE FULL POLYNOMIAL: the coefficient of x³y⁵ in (x+y)⁸ is C(8,5)=56, found in one '
      + 'step via Tₖ₊₁=C(n,k)xⁿ⁻ᵏyᵏ — with k=5 giving C(8,5)x³y⁵=56x³y⁵ — without writing out all 9 '
      + 'terms of the full expansion. Substituting specific values into the theorem also derives '
      + 'further identities without separate re-derivation: x=y=1 gives ΣₖC(n,k)=2ⁿ (the total '
      + 'number of subsets of an n-element set); x=1,y=-1 gives Σₖ(-1)ᵏC(n,k)=0 for n≥1.',
    targetedMisconceptions: [`${BINOMIAL_THEOREM}:MC-1`, `${BINOMIAL_THEOREM}:MC-2`, `${BINOMIAL_THEOREM}:MC-3`],
    source: eb(BINOMIAL_THEOREM, "Core Understanding — binomial coefficients arising from a genuinely combinatorial counting argument never an algebraic pattern, Pascal's identity proven via a direct combinatorial in-or-out argument never factorial algebra, and a specific term's coefficient found via the general-term formula never full expansion"),
  },
]

export const MATHEMATICS_DISC_COMBINATORICS_INCLUSION_EXCLUSION_BINOMIAL_THEOREM_PROBES: SeedProbe[] = [
  {
    conceptId: COMBINATORICS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Can every counting problem be solved by directly enumerating or by matching a memorized permutations/combinations formula?',
    choices: [
      { text: 'No — bijection is a genuinely independent technique: mapping a hard-to-count set onto an easy-to-count set (e.g. subsets of a 5-element set onto length-5 binary strings, giving 2⁵=32) proves a count without matching C(n,r), P(n,r), or brute-force listing', isCorrect: true },
      { text: 'Yes — every counting problem can eventually be solved by either listing all outcomes or matching one of the known permutations/combinations formulas', isCorrect: false, misconceptionId: `${COMBINATORICS}:MC-1` },
      { text: "Yes, since combinatorics is fundamentally just enumeration plus the two formulas for permutations and combinations", isCorrect: false, misconceptionId: `${COMBINATORICS}:MC-1` },
    ],
    targetedMisconceptions: [`${COMBINATORICS}:MC-1`],
    source: eb(COMBINATORICS, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — whether every counting problem reduces to enumeration or a memorized formula, an answer of "yes" confirming COUNTING-LIMITED-TO-FORMULAS-OR-ENUMERATION'),
  },
  {
    conceptId: COMBINATORICS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You\'ve derived a valid recurrence relation aₙ=aₙ₋₁+aₙ₋₂ for a counting problem but haven\'t found a closed-form formula. Have you actually solved the problem?',
    choices: [
      { text: 'Yes — a correctly-derived, verified recurrence IS a complete answer to "how many"; it lets you compute any specific term directly, and a closed form is a separate, optional further achievement', isCorrect: true },
      { text: 'No — the problem is only truly solved once the recurrence is converted into a closed-form formula', isCorrect: false, misconceptionId: `${COMBINATORICS}:MC-2` },
      { text: "No, since a recurrence relation is just a partial, unfinished step toward the real answer", isCorrect: false, misconceptionId: `${COMBINATORICS}:MC-2` },
    ],
    targetedMisconceptions: [`${COMBINATORICS}:MC-2`],
    source: eb(COMBINATORICS, 'Misconceptions MC-2 detection probe (verbatim, Blueprint) — a valid recurrence without a closed form, an answer of "no" (not yet solved) confirming RECURRENCE-TREATED-AS-INCOMPLETE'),
  },
  {
    conceptId: COMBINATORICS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is "combinatorics" just another name for the permutations and combinations formulas you already know?',
    choices: [
      { text: 'No — combinatorics is the broad field of counting techniques, which also includes bijection, recursion, generating functions, and further named techniques like stars-and-bars, pigeonhole, and inclusion-exclusion; C(n,r) and P(n,r) are just two tools within it', isCorrect: true },
      { text: 'Yes — combinatorics specifically refers to the permutations and combinations formulas', isCorrect: false, misconceptionId: `${COMBINATORICS}:MC-3` },
      { text: "Yes, since those two formulas are the core content that the word 'combinatorics' describes", isCorrect: false, misconceptionId: `${COMBINATORICS}:MC-3` },
    ],
    targetedMisconceptions: [`${COMBINATORICS}:MC-3`],
    source: eb(COMBINATORICS, 'Misconceptions MC-3 detection probe (verbatim, Blueprint) — whether combinatorics is just another name for permutations/combinations, an answer of "yes" confirming COMBINATORICS-CONFLATED-WITH-ITS-TWO-FORMULAS'),
  },
  {
    conceptId: INCLUSION_EXCLUSION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Given |A|=40, |B|=35, |C|=30, |A∩B|=15, |A∩C|=10, |B∩C|=12, |A∩B∩C|=5, compute |A∪B∪C|.',
    choices: [
      { text: '73 — computed as 40+35+30-15-10-12+5, adding back the triple intersection after the pairwise subtraction', isCorrect: true },
      { text: '68 — computed as 40+35+30-15-10-12, omitting the +5 triple-intersection correction', isCorrect: false, misconceptionId: `${INCLUSION_EXCLUSION}:MC-1` },
      { text: "68, since for a union of sets you always just add the individual sizes and subtract every overlap", isCorrect: false, misconceptionId: `${INCLUSION_EXCLUSION}:MC-1` },
    ],
    targetedMisconceptions: [`${INCLUSION_EXCLUSION}:MC-1`],
    source: eb(INCLUSION_EXCLUSION, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — a 3-set union computation, an answer of 68 (omitting the triple-intersection term) confirming INCLUSION-EXCLUSION-ALWAYS-SUBTRACTS'),
  },
  {
    conceptId: INCLUSION_EXCLUSION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: '60 students total; 30 like Math, 25 like English, 10 like both. How many like NEITHER?',
    choices: [
      { text: '15 — first compute the union |M∪E|=30+25-10=45 (at least one), then take the complement 60-45=15 (neither)', isCorrect: true },
      { text: '45 — computed as |M∪E|=30+25-10=45', isCorrect: false, misconceptionId: `${INCLUSION_EXCLUSION}:MC-2` },
      { text: "45, since the union formula already accounts for everyone who has at least one of the properties", isCorrect: false, misconceptionId: `${INCLUSION_EXCLUSION}:MC-2` },
    ],
    targetedMisconceptions: [`${INCLUSION_EXCLUSION}:MC-2`],
    source: eb(INCLUSION_EXCLUSION, 'Misconceptions MC-2 detection probe (verbatim, Blueprint) — "how many like neither," an answer of 45 (the union, not its complement) confirming IE-COUNTS-ELEMENTS-IN-ANY-SET'),
  },
  {
    conceptId: INCLUSION_EXCLUSION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Count surjections from a 4-element set to a 3-element set.',
    choices: [
      { text: '36 — computed via the full alternating sum Σⱼ(-1)ʲC(3,j)(3-j)⁴=3⁴-C(3,1)2⁴+C(3,2)1⁴-C(3,3)0⁴=81-48+3-0=36', isCorrect: true },
      { text: '33 — computed as 3⁴-3·2⁴=81-48=33, a single subtraction of the "missing one element" cases', isCorrect: false, misconceptionId: `${INCLUSION_EXCLUSION}:MC-3` },
      { text: "33, since counting surjections is just the total functions minus the non-surjective ones in one subtraction step", isCorrect: false, misconceptionId: `${INCLUSION_EXCLUSION}:MC-3` },
    ],
    targetedMisconceptions: [`${INCLUSION_EXCLUSION}:MC-3`],
    source: eb(INCLUSION_EXCLUSION, 'Misconceptions MC-3 detection probe (verbatim, Blueprint) — surjections from a 4-set to a 3-set, an answer of 33 (ad hoc single subtraction) confirming SURJECTION-FORMULA-IS-kⁿ'),
  },
  {
    conceptId: BINOMIAL_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does (1+x)^(1/2) have a binomial-theorem-style expansion, even though the exponent is not a positive integer?',
    choices: [
      { text: 'Yes — the generalized binomial theorem extends to any real exponent α, with C(α,k)=α(α-1)⋯(α-k+1)/k!; when α is a non-negative integer n, one factor becomes zero once k>n, making the otherwise-infinite series terminate into exactly the familiar finite theorem', isCorrect: true },
      { text: 'No — the binomial theorem only applies when the exponent is a positive integer', isCorrect: false, misconceptionId: `${BINOMIAL_THEOREM}:MC-1` },
      { text: "No, since expansions like (x+y)^n only make sense for whole-number values of n", isCorrect: false, misconceptionId: `${BINOMIAL_THEOREM}:MC-1` },
    ],
    targetedMisconceptions: [`${BINOMIAL_THEOREM}:MC-1`],
    source: eb(BINOMIAL_THEOREM, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — whether (1+x)^(1/2) has a binomial expansion, an answer of "no" confirming BINOMIAL-THEOREM-ONLY-FOR-INTEGERS'),
  },
  {
    conceptId: BINOMIAL_THEOREM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "Without computing any factorials, explain why C(n,k)=C(n-1,k-1)+C(n-1,k) is true.",
    choices: [
      { text: 'Choosing k objects from n either INCLUDES one specific fixed object (leaving C(n-1,k-1) ways to choose the rest) or EXCLUDES it (leaving C(n-1,k) ways to choose all k from the remaining n-1) — these disjoint, exhaustive cases sum to the total', isCorrect: true },
      { text: 'It can only be verified by expanding the factorial formulas for each binomial coefficient and simplifying algebraically', isCorrect: false, misconceptionId: `${BINOMIAL_THEOREM}:MC-2` },
      { text: "It's simply a memorized pattern from Pascal's triangle with no further justification available", isCorrect: false, misconceptionId: `${BINOMIAL_THEOREM}:MC-2` },
    ],
    targetedMisconceptions: [`${BINOMIAL_THEOREM}:MC-2`],
    source: eb(BINOMIAL_THEOREM, "Misconceptions MC-2 detection probe (verbatim, Blueprint) — explaining Pascal's identity without factorials, an inability to give the combinatorial argument confirming PASCAL-IDENTITY-BY-MEMORISATION"),
  },
  {
    conceptId: BINOMIAL_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Find the coefficient of x⁴y⁶ in (x+y)^10.',
    choices: [
      { text: 'C(10,6)=210 — found directly via the general-term formula, with no need to write out any of the other 10 terms of the expansion', isCorrect: true },
      { text: 'You would need to expand all 11 terms of (x+y)^10 to find this specific coefficient', isCorrect: false, misconceptionId: `${BINOMIAL_THEOREM}:MC-3` },
      { text: "The full binomial expansion must be written out first before any individual term's coefficient can be determined", isCorrect: false, misconceptionId: `${BINOMIAL_THEOREM}:MC-3` },
    ],
    targetedMisconceptions: [`${BINOMIAL_THEOREM}:MC-3`],
    source: eb(BINOMIAL_THEOREM, 'Misconceptions MC-3 detection probe (verbatim, Blueprint) — finding the coefficient of x⁴y⁶ in (x+y)^10, defaulting to full expansion confirming SPECIFIC-TERM-REQUIRES-FULL-EXPANSION'),
  },
]
