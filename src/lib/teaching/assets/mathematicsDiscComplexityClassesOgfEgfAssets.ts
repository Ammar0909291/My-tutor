/**
 * Batch: complexity-classes, ogf, egf (math.disc).
 *
 * Continues math.disc (21/32 -> 24/32) after the algorithm-complexity/
 * spanning-tree/euler-hamiltonian batch. Fresh frontier recompute found 11
 * ready concepts, all now leaf concepts with 0 further KG unlocks. Selected
 * complexity-classes (closes the algorithm-complexity chain) and ogf/egf
 * (close out generating-functions' two remaining children). Transcribed
 * from the frozen Educational Brain entries at educational-brain/concepts/
 * mathematics/math.disc.{complexity-classes,ogf,egf}.md.
 *
 * Grade band: all three are EB difficulty "expert," directly requiring
 * math.disc.algorithm-complexity or math.disc.generating-functions, both
 * already seeded GradeBand.UNDERGRADUATE this campaign — GradeBand.
 * UNDERGRADUATE adopted for all three.
 *
 *   COMPLEXITY-CLASSES  NP is defined by the EASE OF VERIFYING a proposed
 *           answer, never by inherent difficulty of finding one — a
 *           problem can be in NP and still be believed extremely hard to
 *           solve; P≠NP is WIDELY BELIEVED BUT UNPROVEN, never a
 *           established theorem; NP-complete requires BOTH being in NP
 *           AND every NP problem reducing to it — neither half alone is
 *           sufficient, and NP-complete never means merely "any hard
 *           problem in NP."
 *   OGF  Multiplying two OGFs CONVOLVES the sequences (cₙ=Σaₖbₙ₋ₖ), never
 *           term-by-term multiplication; partial-fraction decomposition
 *           of a rational OGF needs a SEPARATE substitution per constant,
 *           never one shared step; a scaled/shifted exponent like x⁵ in
 *           1/(1-x⁵) means most powers of x carry a ZERO coefficient,
 *           never that every exponent is present.
 *   EGF  An EGF product requires a BINOMIAL-WEIGHTED convolution
 *           (bₙ=ΣC(n,k)b⁽¹⁾ₖb⁽²⁾ₙ₋ₖ), never a plain OGF-style convolution
 *           — the weight accounts for how labels distribute between the
 *           two structures; recovering bₙ from an EGF requires
 *           MULTIPLYING the xⁿ coefficient by n!, never reading it off
 *           directly as one would for an OGF; EGFs suit LABELED
 *           structures and OGFs suit UNLABELED ones — the choice is never
 *           interchangeable or decided by which was practiced most
 *           recently.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const COMPLEXITY_CLASSES = 'math.disc.complexity-classes'
const OGF = 'math.disc.ogf'
const EGF = 'math.disc.egf'

export const MATHEMATICS_DISC_COMPLEXITY_CLASSES_OGF_EGF_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COMPLEXITY_CLASSES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'NP IS DEFINED BY THE EASE OF VERIFYING A PROPOSED ANSWER, NEVER BY INHERENT DIFFICULTY OF '
      + 'FINDING ONE: for Boolean satisfiability (SAT), finding a satisfying assignment from '
      + 'scratch is believed to require exponential time in the worst case — but CHECKING a given '
      + 'proposed assignment is fast, just substitute the values and evaluate. NP-membership rests '
      + 'entirely on the CHECKING side; a problem can be in NP and still be believed extremely hard '
      + 'to solve. P is the class of problems SOLVABLE in polynomial time; every problem in P is '
      + 'also in NP (if you can solve it quickly, you can verify a proposed solution quickly too, '
      + 'by re-solving it) — but whether the reverse holds (P=NP) is the single most famous open '
      + 'problem in computer science.\n\n'
      + 'P≠NP IS WIDELY BELIEVED BUT UNPROVEN, NEVER AN ESTABLISHED THEOREM: despite decades of '
      + 'research and no polynomial-time algorithm ever found for any NP-complete problem, this '
      + 'strong evidence is not the same as a PROOF. The correct, precise statement is that P vs. '
      + 'NP remains a genuinely OPEN mathematical question — overwhelming expert consensus is '
      + 'never the same as a formal proof, the identical theorem-vs-conjecture distinction that '
      + 'applies throughout mathematics.\n\n'
      + 'NP-COMPLETE REQUIRES BOTH BEING IN NP AND EVERY NP PROBLEM REDUCING TO IT — NEITHER HALF '
      + 'ALONE IS SUFFICIENT: a problem is NP-complete if it is in NP AND every other problem in NP '
      + 'can be reduced to it in polynomial time. This second condition makes NP-complete problems '
      + 'universal hubs: an efficient algorithm for SAT (or graph 3-coloring, or the travelling '
      + 'salesman decision problem — all classic NP-complete examples) would immediately give an '
      + 'efficient algorithm for EVERY problem in NP, proving P=NP. "NP-complete" never means '
      + 'merely "any hard problem in NP" — both halves of the definition must hold.',
    targetedMisconceptions: [`${COMPLEXITY_CLASSES}:MC-1`, `${COMPLEXITY_CLASSES}:MC-2`, `${COMPLEXITY_CLASSES}:MC-3`],
    source: eb(COMPLEXITY_CLASSES, 'Core Understanding — NP defined by verification ease never inherent solving difficulty, P≠NP as widely believed but genuinely unproven never an established theorem, and NP-complete requiring both NP-membership and universal polynomial-time reducibility never either half alone'),
  },
  {
    conceptId: OGF, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'MULTIPLYING TWO OGFs CONVOLVES THE SEQUENCES, NEVER TERM-BY-TERM MULTIPLICATION: if '
      + 'A(x)=Σaₙxⁿ and B(x)=Σbₙxⁿ, their product A(x)B(x)=Σcₙxⁿ has coefficients '
      + 'cₙ=Σₖ₌₀ⁿaₖbₙ₋ₖ — summing over every way to split the index n between the two factors. '
      + 'Multiplying A(x)=1/(1-x) by itself gives 1/(1-x)²=Σ(n+1)xⁿ, the sequence 1,2,3,4,... — '
      + 'genuinely DIFFERENT from the naive pointwise guess 1,1,1,... Combinatorially, this '
      + 'corresponds to combining a structure counted by A with an independent structure counted '
      + 'by B.\n\n'
      + 'PARTIAL-FRACTION DECOMPOSITION OF A RATIONAL OGF NEEDS A SEPARATE SUBSTITUTION PER '
      + 'CONSTANT, NEVER ONE SHARED STEP: decomposing 1/((1-2x)(1-3x)) into -2/(1-2x)+3/(1-3x), '
      + 'each term expands as a geometric series (1/(1-rx)=Σrⁿxⁿ), giving the closed form '
      + 'aₙ=-2ⁿ⁺¹+3ⁿ⁺¹ — matching exactly the closed form the characteristic-root method would '
      + 'produce for aₙ=5aₙ₋₁-6aₙ₋₂ (roots 2 and 3), reached via a completely different algebraic '
      + 'route. Each of the two distinct linear factors demands its OWN substitution value to '
      + 'isolate its constant — never a single one-step process shared between them.\n\n'
      + 'A SCALED/SHIFTED EXPONENT LIKE x⁵ IN 1/(1-x⁵) MEANS MOST POWERS OF x CARRY A ZERO '
      + 'COEFFICIENT, NEVER THAT EVERY EXPONENT IS PRESENT: expanding 1/(1-x⁵) term by term gives '
      + 'coefficient 1 at x⁰, x⁵, x¹⁰, ... and 0 everywhere else — "the coefficient of x⁷" is '
      + 'correctly read as 0, never confused with a 7th sequence term. The plain case A(x)=Σaₙxⁿ '
      + 'trains the reflex "the exponent IS the index," but that reflex fails the moment the series '
      + 'has a scaled or shifted exponent.',
    targetedMisconceptions: [`${OGF}:MC-1`, `${OGF}:MC-2`, `${OGF}:MC-3`],
    source: eb(OGF, 'Core Understanding — multiplying OGFs as convolution never term-by-term multiplication, partial-fraction decomposition needing a separate substitution per constant never one shared step, and scaled/shifted exponents meaning most coefficients are zero never that every exponent is present'),
  },
  {
    conceptId: EGF, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'AN EGF PRODUCT REQUIRES A BINOMIAL-WEIGHTED CONVOLUTION, NEVER A PLAIN OGF-STYLE '
      + 'CONVOLUTION: if B₁(x)=Σb⁽¹⁾ₖxᵏ/k! and B₂(x)=Σb⁽²⁾ₖxᵏ/k!, their product\'s coefficient is '
      + 'bₙ=Σₖ₌₀ⁿC(n,k)b⁽¹⁾ₖb⁽²⁾ₙ₋ₖ — an EGF-convolution with BINOMIAL WEIGHTS, genuinely distinct '
      + "from an OGF's plain convolution. Combining a labeled structure on a size-k subset with an "
      + 'independent labeled structure on the remaining n-k labels requires choosing WHICH labels '
      + 'go where — there are C(n,k) ways — and a plain, unweighted convolution would UNDERCOUNT by '
      + 'failing to account for this label-distribution choice.\n\n'
      + 'RECOVERING bₙ FROM AN EGF REQUIRES MULTIPLYING THE xⁿ COEFFICIENT BY n!, NEVER READING IT '
      + 'OFF DIRECTLY AS ONE WOULD FOR AN OGF: for B(x)=e^(2x)=Σ2ⁿxⁿ/n!, the coefficient of xⁿ '
      + "alone is 2ⁿ/n! — recovering bₙ=2ⁿ requires multiplying that coefficient by n!, since the "
      + "EGF's defining formula divides by n! in the first place. Directly reading 2ⁿ/n! as bₙ (the "
      + "OGF-style rule) is incorrect here.\n\n"
      + 'EGFs SUIT LABELED STRUCTURES AND OGFs SUIT UNLABELED ONES — THE CHOICE IS NEVER '
      + 'INTERCHANGEABLE OR DECIDED BY WHICH WAS PRACTICED MOST RECENTLY: the sequence bₙ=1 for '
      + 'every n (one way to arrange n labeled items into a single block) has EGF '
      + 'B(x)=Σxⁿ/n!=eˣ, making eˣ a fundamental building block throughout labeled combinatorics '
      + '(e^(e^x-1), the Bell-number EGF for set partitions, composes it with itself). Partitioning '
      + 'n NAMED students into groups is naturally an EGF problem (individually distinguishable '
      + 'elements); partitioning n IDENTICAL tokens into groups is naturally an OGF problem — the '
      + 'deciding question is always "are the n elements distinguishable from each other?", never a '
      + 'default to whichever technique was most recently used.',
    targetedMisconceptions: [`${EGF}:MC-1`, `${EGF}:MC-2`, `${EGF}:MC-3`],
    source: eb(EGF, 'Core Understanding — EGF products requiring a binomial-weighted convolution never a plain OGF-style convolution, recovering bₙ requiring multiplication by n! never a direct coefficient read, and EGFs suiting labeled structures versus OGFs suiting unlabeled ones as a genuine structural distinction never an interchangeable or arbitrary choice'),
  },
]

export const MATHEMATICS_DISC_COMPLEXITY_CLASSES_OGF_EGF_PROBES: SeedProbe[] = [
  {
    conceptId: COMPLEXITY_CLASSES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does "a problem is in NP" mean the problem is necessarily hard to solve?',
    choices: [
      { text: 'No — NP is defined by the ease of VERIFYING a proposed answer, not the ease of finding one from scratch; a problem can be in NP and still be believed extremely hard to solve', isCorrect: true },
      { text: 'Yes — being in NP means a problem is inherently computationally difficult or intractable', isCorrect: false, misconceptionId: `${COMPLEXITY_CLASSES}:MC-1` },
      { text: "Yes, since NP is essentially a technical synonym for 'hard problem'", isCorrect: false, misconceptionId: `${COMPLEXITY_CLASSES}:MC-1` },
    ],
    targetedMisconceptions: [`${COMPLEXITY_CLASSES}:MC-1`],
    source: eb(COMPLEXITY_CLASSES, 'Misconceptions MC-1 detection probe — whether NP-membership implies inherent difficulty, an answer of "yes" confirming NP-MEMBERSHIP-CONFLATED-WITH-INHERENT-DIFFICULTY'),
  },
  {
    conceptId: COMPLEXITY_CLASSES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Has P≠NP been proven?',
    choices: [
      { text: 'No — P≠NP is widely believed by experts based on decades of failed searches for a counterexample, but it has neither been proven nor disproven; P vs. NP remains a genuinely open mathematical question', isCorrect: true },
      { text: 'Yes — P≠NP has been mathematically proven and is an established theorem', isCorrect: false, misconceptionId: `${COMPLEXITY_CLASSES}:MC-2` },
      { text: "Yes, since overwhelming expert consensus is effectively the same as a formal proof", isCorrect: false, misconceptionId: `${COMPLEXITY_CLASSES}:MC-2` },
    ],
    targetedMisconceptions: [`${COMPLEXITY_CLASSES}:MC-2`],
    source: eb(COMPLEXITY_CLASSES, 'Misconceptions MC-2 detection probe — whether P≠NP has been proven, an answer of "yes" confirming P-NOT-EQUAL-NP-TREATED-AS-PROVEN-FACT'),
  },
  {
    conceptId: COMPLEXITY_CLASSES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does "NP-complete" just mean "a hard problem in NP"?',
    choices: [
      { text: 'No — NP-complete requires TWO conditions together: the problem must be in NP, AND every other problem in NP must be reducible to it in polynomial time; a problem can be believed hard without satisfying the universal-reducibility condition', isCorrect: true },
      { text: 'Yes — any sufficiently difficult problem in NP is considered NP-complete', isCorrect: false, misconceptionId: `${COMPLEXITY_CLASSES}:MC-3` },
      { text: "Yes, since NP-complete and NP-hard are interchangeable labels for problems that are simply hard", isCorrect: false, misconceptionId: `${COMPLEXITY_CLASSES}:MC-3` },
    ],
    targetedMisconceptions: [`${COMPLEXITY_CLASSES}:MC-3`],
    source: eb(COMPLEXITY_CLASSES, 'Misconceptions MC-3 detection probe — whether NP-complete just means "hard problem in NP," an answer of "yes" confirming NP-COMPLETE-CONFUSED-WITH-NP-HARD-OR-WITH-ALL-OF-NP'),
  },
  {
    conceptId: OGF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If you multiply the OGF for the sequence 1,1,1,... by itself, is every coefficient of the product still 1?',
    choices: [
      { text: 'No — the product 1/(1-x)²=Σ(n+1)xⁿ has coefficients 1,2,3,4,..., computed via the convolution cₙ=Σₖ₌₀ⁿaₖbₙ₋ₖ; multiplying two OGFs convolves the sequences, never multiplies them term-by-term', isCorrect: true },
      { text: 'Yes — multiplying two OGFs multiplies their sequences term by term, so every coefficient stays 1', isCorrect: false, misconceptionId: `${OGF}:MC-1` },
      { text: "Yes, since generating function multiplication corresponds to pointwise multiplication of the underlying sequences", isCorrect: false, misconceptionId: `${OGF}:MC-1` },
    ],
    targetedMisconceptions: [`${OGF}:MC-1`],
    source: eb(OGF, 'Misconceptions MC-1 detection probe (Discovery Question 1) — squaring the OGF for 1,1,1,..., an assumption of pointwise multiplication confirming OGF-PRODUCT-TREATED-AS-POINTWISE-MULTIPLICATION'),
  },
  {
    conceptId: OGF, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'When decomposing 1/((1-2x)(1-3x)) into two simpler fractions, are the two constants found the same way, in one shared step?',
    choices: [
      { text: 'No — each of the two distinct linear factors needs its own substitution value to isolate its own constant; the decomposition -2/(1-2x)+3/(1-3x) requires two separate substitutions, never one combined step', isCorrect: true },
      { text: 'Yes — both constants can be found using a single shared substitution step', isCorrect: false, misconceptionId: `${OGF}:MC-2` },
      { text: "Yes, since clearing denominators is always a one-step process regardless of how many factors are involved", isCorrect: false, misconceptionId: `${OGF}:MC-2` },
    ],
    targetedMisconceptions: [`${OGF}:MC-2`],
    source: eb(OGF, 'Misconceptions MC-2 detection probe (Discovery Question 2) — the two-constant partial-fraction decomposition, an assumption of one shared step confirming PARTIAL-FRACTION-CONSTANTS-MISCOMPUTED'),
  },
  {
    conceptId: OGF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'In the series 1/(1-x⁵)=Σx⁵ⁿ, does EVERY power of x have a nonzero coefficient?',
    choices: [
      { text: 'No — only x⁰, x⁵, x¹⁰, ... have coefficient 1; every other power of x (such as x⁷) has coefficient 0, since the series only produces terms at multiples of 5', isCorrect: true },
      { text: 'Yes — every power of x from x⁰ upward has a nonzero coefficient in this series', isCorrect: false, misconceptionId: `${OGF}:MC-3` },
      { text: "Yes, since the coefficient of xⁿ is always nonzero as long as n is a valid exponent", isCorrect: false, misconceptionId: `${OGF}:MC-3` },
    ],
    targetedMisconceptions: [`${OGF}:MC-3`],
    source: eb(OGF, 'Misconceptions MC-3 detection probe (Discovery Question 3) — the series 1/(1-x⁵), an assumption every power of x is present confirming OGF-COEFFICIENT-EXTRACTION-INDEX-CONFUSED'),
  },
  {
    conceptId: EGF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'When combining two labeled structures on a total of n labels, does it matter WHICH specific labels end up in each piece, or only how many go to each?',
    choices: [
      { text: 'It matters which specific labels go where — there are C(n,k) ways to distribute k of the n labels to one piece, and the EGF product must weight by this binomial coefficient, never just a plain unweighted convolution', isCorrect: true },
      { text: 'Only the count matters, not which specific labels — so an EGF product can be computed as a plain convolution just like an OGF', isCorrect: false, misconceptionId: `${EGF}:MC-1` },
      { text: "It doesn't matter at all, since EGF products work identically to OGF products", isCorrect: false, misconceptionId: `${EGF}:MC-1` },
    ],
    targetedMisconceptions: [`${EGF}:MC-1`],
    source: eb(EGF, 'Misconceptions MC-1 detection probe (Discovery Question 1) — combining labeled structures on n labels, an assumption plain convolution suffices confirming EGF-PRODUCT-COMPUTED-AS-PLAIN-CONVOLUTION'),
  },
  {
    conceptId: EGF, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'In an EGF B(x)=Σbₙxⁿ/n!, is the coefficient of xⁿ itself equal to bₙ?',
    choices: [
      { text: 'No — the coefficient of xⁿ is bₙ/n!; recovering bₙ requires multiplying that coefficient by n!, since the EGF\'s defining formula already divides by n!', isCorrect: true },
      { text: 'Yes — just like an OGF, the coefficient of xⁿ in an EGF directly equals bₙ', isCorrect: false, misconceptionId: `${EGF}:MC-2` },
      { text: "Yes, since coefficient extraction works the same way for both OGFs and EGFs", isCorrect: false, misconceptionId: `${EGF}:MC-2` },
    ],
    targetedMisconceptions: [`${EGF}:MC-2`],
    source: eb(EGF, 'Misconceptions MC-2 detection probe (Discovery Question 2) — whether the xⁿ coefficient of an EGF equals bₙ directly, an answer of "yes" confirming EGF-COEFFICIENT-EXTRACTION-CONFUSED-WITH-OGF'),
  },
  {
    conceptId: EGF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Between partitioning n NAMED students into groups and partitioning n IDENTICAL tokens into groups, which naturally calls for an EGF?',
    choices: [
      { text: 'Partitioning the n NAMED students — since the elements are individually distinguishable (labeled), this is naturally an EGF problem (via e^(e^x-1), the Bell-number EGF); the identical tokens are naturally an OGF problem instead', isCorrect: true },
      { text: 'Both problems are equally suited to either an OGF or an EGF, since the two techniques are interchangeable', isCorrect: false, misconceptionId: `${EGF}:MC-3` },
      { text: "The identical tokens problem, since EGFs are used whenever exact counts (not just labels) matter", isCorrect: false, misconceptionId: `${EGF}:MC-3` },
    ],
    targetedMisconceptions: [`${EGF}:MC-3`],
    source: eb(EGF, 'Misconceptions MC-3 detection probe (Discovery Question 3) — named students versus identical tokens, a misjudgment of which needs an EGF confirming LABELED-VS-UNLABELED-STRUCTURE-TYPE-MISJUDGED'),
  },
]
