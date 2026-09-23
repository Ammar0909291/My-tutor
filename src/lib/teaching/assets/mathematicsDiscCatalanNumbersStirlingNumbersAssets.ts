/**
 * Batch: catalan-numbers, stirling-numbers (math.disc).
 *
 * FINAL BATCH of the math.disc domain campaign: closes math.disc to
 * 32/32 — DOMAIN CERTIFIED, following the graph-representation/boolean-
 * circuits/predicate-logic-disc batch (27/32 -> 30/32). Fresh frontier
 * recompute found these 2 concepts as the domain's only remaining
 * candidates, both requiring math.disc.combinations and math.disc.
 * recurrence-relation (both already authored). Transcribed from the
 * frozen Educational Brain entries at educational-brain/concepts/
 * mathematics/math.disc.{catalan-numbers,stirling-numbers}.md.
 *
 * Grade band: both are EB difficulty "expert," directly requiring
 * math.disc.recurrence-relation, already seeded GradeBand.UNDERGRADUATE
 * this campaign (matching the precedent set for generating-functions,
 * complexity-classes, ogf, and egf) — GradeBand.UNDERGRADUATE adopted for
 * both.
 *
 *   CATALAN-NUMBERS  Cₙ=C(2n,n)/(n+1) — the DIVISION BY (n+1) is the
 *           entire correction from the reflection principle, never
 *           optional decoration to drop; two structures both counted by
 *           Cₙ demand an explicit BIJECTION to prove correspondence,
 *           never accepted as "the same" merely because they share a
 *           number; the SAME "choose a splitting point" recurrence
 *           applies to EVERY Catalan structure (parenthesizations, Dyck
 *           paths, triangulations), never limited to whichever structure
 *           it was first derived for.
 *   STIRLING-NUMBERS  S(n,k) (second kind, unordered partition into k
 *           groups) and s(n,k) (first kind, permutation into k cycles)
 *           are NEVER the same quantity despite a coincidental small-case
 *           agreement — S(4,2)=7 while s(4,2)=11; the two recurrences'
 *           coefficients are NEVER interchangeable — k (one insertion
 *           point per unordered group) for the second kind, (n-1) (one
 *           insertion point per already-placed element) for the first
 *           kind; a second-kind partition's groups have NO internal
 *           order, so relabeling which group is "first" NEVER produces a
 *           genuinely different partition, unlike a first-kind cycle.
 *
 * Seeded as DRAFT. Promotion stays human.
 *
 * **math.disc reaches 32/32 with this batch — DOMAIN CERTIFIED**, re-
 * verify via `npx tsx scripts/assets/contract-audit.ts --subject
 * mathematics` before trusting this claim in a future session.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const CATALAN_NUMBERS = 'math.disc.catalan-numbers'
const STIRLING_NUMBERS = 'math.disc.stirling-numbers'

export const MATHEMATICS_DISC_CATALAN_NUMBERS_STIRLING_NUMBERS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CATALAN_NUMBERS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Cₙ=C(2n,n)/(n+1) — THE DIVISION BY (n+1) IS THE ENTIRE CORRECTION FROM THE REFLECTION '
      + 'PRINCIPLE, NEVER OPTIONAL DECORATION TO DROP: Catalan numbers restrict C(2n,n)\'s '
      + 'monotone lattice paths from (0,0) to (n,n) to only those that never cross above the '
      + 'diagonal y=x. A "bad" path can be bijectively mapped, by reflecting its initial segment '
      + 'up to the first violation, to an unrestricted path from (-1,1) to (n,n), counted by '
      + 'C(2n,n-1). Subtracting bad paths from all paths: '
      + 'Cₙ=C(2n,n)-C(2n,n-1)=C(2n,n)(1-n/(n+1))=C(2n,n)/(n+1). For n=3: C₃=C(6,3)-C(6,2)=20-15=5 '
      + '— NOT the raw C(6,3)=20; the /(n+1) factor is the direct consequence of this reflection '
      + 'argument, never an arbitrary adjustment to skip.\n\n'
      + 'TWO STRUCTURES BOTH COUNTED BY Cₙ DEMAND AN EXPLICIT BIJECTION TO PROVE CORRESPONDENCE, '
      + 'NEVER ACCEPTED AS "THE SAME" MERELY BECAUSE THEY SHARE A NUMBER: knowing that both '
      + 'balanced parenthesizations and Dyck paths are counted by Cₙ is a numerical observation, '
      + 'not yet a proof they correspond. A genuine bijection — encoding each "up" step of a Dyck '
      + 'path as an open parenthesis and each "down" step as a close parenthesis — is required to '
      + 'show WHY the two structures share the same count, and constructing such a correspondence '
      + 'is itself a non-trivial combinatorial skill, never a formality to skip.\n\n'
      + 'THE SAME "CHOOSE A SPLITTING POINT" RECURRENCE Cₙ=Σₖ₌₀ⁿ⁻¹CₖCₙ₋₁₋ₖ APPLIES TO EVERY '
      + 'CATALAN STRUCTURE, NEVER LIMITED TO WHICHEVER STRUCTURE IT WAS FIRST DERIVED FOR: for '
      + 'balanced parenthesizations of n+1 factors, the LAST multiplication splits the factors into '
      + 'a left group of k+1 and right group of n-k, contributing Cₖ·Cₙ₋₁₋ₖ ways. This identical '
      + 'splitting structure recurs for Dyck paths (splitting at the first return to the diagonal), '
      + 'polygon triangulations (splitting at the triangle containing the base edge), and binary '
      + 'trees (splitting at the root\'s left/right subtree sizes) — the SAME recurrence arises '
      + 'because each structure decomposes the same way, never because the structures are secretly '
      + 'identical objects.',
    targetedMisconceptions: [`${CATALAN_NUMBERS}:MC-1`, `${CATALAN_NUMBERS}:MC-2`, `${CATALAN_NUMBERS}:MC-3`],
    source: eb(CATALAN_NUMBERS, 'Core Understanding — Cₙ=C(2n,n)/(n+1) with the division as the entire reflection-principle correction never optional, shared Catalan counts demanding an explicit bijection never accepted as coincidence, and the same splitting recurrence applying to every Catalan structure never limited to one'),
  },
  {
    conceptId: STIRLING_NUMBERS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'S(n,k) (SECOND KIND, UNORDERED PARTITION INTO k GROUPS) AND s(n,k) (FIRST KIND, PERMUTATION '
      + 'INTO k CYCLES) ARE NEVER THE SAME QUANTITY DESPITE A COINCIDENTAL SMALL-CASE AGREEMENT: '
      + 'S(3,2)=s(3,2)=3 might suggest the two notations always agree, but computing both at n=4 '
      + 'reveals S(4,2)=7 while s(4,2)=11 — genuinely different values. S(n,k) counts ways to '
      + 'partition an n-element set into k non-empty UNORDERED, UNLABELED groups (only contents '
      + 'distinguish partitions); s(n,k) counts ways to arrange n distinct elements into k non-empty '
      + 'CYCLES, where (a b c) and (a c b) are DIFFERENT cycles on the same three elements — a '
      + 'structural difference (no internal order versus cyclic internal order) that is the single '
      + 'fact from which every other distinction follows.\n\n'
      + 'THE TWO RECURRENCES\' COEFFICIENTS ARE NEVER INTERCHANGEABLE: S(n,k)=k·S(n-1,k)+S(n-1,k-1) '
      + 'uses coefficient k because the n-th element joining one of the k EXISTING unordered groups '
      + 'has exactly k choices (one per group, since a group has no internal positions to insert '
      + 'into). s(n,k)=(n-1)·s(n-1,k)+s(n-1,k-1) uses coefficient (n-1) because the n-th element '
      + 'joining an existing arrangement of n-1 elements into cycles can be inserted immediately '
      + 'after ANY of the n-1 already-placed elements (since cyclic order matters, there are n-1 '
      + 'distinct insertion points, never k). The two recurrences are visually near-identical, but '
      + 'the coefficients k and (n-1) answer genuinely different questions and are never '
      + 'interchangeable.\n\n'
      + 'A SECOND-KIND PARTITION\'S GROUPS HAVE NO INTERNAL ORDER, SO RELABELING WHICH GROUP IS '
      + '"FIRST" NEVER PRODUCES A GENUINELY DIFFERENT PARTITION, UNLIKE A FIRST-KIND CYCLE: for '
      + '{a,b,c} partitioned into 2 groups, there are exactly 3 genuinely distinct partitions '
      + '({a}{b,c}, {b}{a,c}, {c}{a,b}) — labeling the groups "Group 1"/"Group 2" and treating the '
      + 'two labelings of each partition as distinct would incorrectly double-count to 6. Swapping '
      + 'which physical group is called "group 1" versus "group 2" changes nothing about the '
      + 'partition itself, since S(n,k) counts unordered, unlabeled groupings — importing '
      + '"internal order matters" reasoning (correct for cycles) into this context always '
      + 'overcounts.',
    targetedMisconceptions: [`${STIRLING_NUMBERS}:MC-1`, `${STIRLING_NUMBERS}:MC-2`, `${STIRLING_NUMBERS}:MC-3`],
    source: eb(STIRLING_NUMBERS, 'Core Understanding — S(n,k) and s(n,k) as never the same quantity despite a coincidental small-case agreement, the two recurrences\' coefficients k and (n-1) as never interchangeable, and a second-kind partition\'s lack of internal order meaning relabeling groups never produces a genuinely different partition'),
  },
]

export const MATHEMATICS_DISC_CATALAN_NUMBERS_STIRLING_NUMBERS_PROBES: SeedProbe[] = [
  {
    conceptId: CATALAN_NUMBERS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is C(2n,n) itself the nth Catalan number, or does something further need to happen to it?',
    choices: [
      { text: 'Something further is needed — Cₙ=C(2n,n)/(n+1); for n=3, C(6,3)=20 but C₃=C(6,3)-C(6,2)=20-15=5, since dividing by n+1 is the reflection-principle correction for paths crossing the diagonal', isCorrect: true },
      { text: 'Yes — C(2n,n) directly equals the nth Catalan number', isCorrect: false, misconceptionId: `${CATALAN_NUMBERS}:MC-1` },
      { text: "Yes, since the Catalan number is defined as the binomial coefficient C(2n,n)", isCorrect: false, misconceptionId: `${CATALAN_NUMBERS}:MC-1` },
    ],
    targetedMisconceptions: [`${CATALAN_NUMBERS}:MC-1`],
    source: eb(CATALAN_NUMBERS, 'Misconceptions MC-1 detection probe (Discovery Question 1) — whether C(2n,n) alone is the Catalan number, an answer of "yes" confirming CATALAN-NUMBER-IS-C(2n,n)'),
  },
  {
    conceptId: CATALAN_NUMBERS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If two structures (e.g. balanced parenthesizations and Dyck paths) are both counted by Cₙ, does that alone prove they\'re "the same," or is something more needed?',
    choices: [
      { text: 'Something more is needed — a genuine BIJECTION (an explicit, invertible, one-to-one correspondence) must be constructed to prove the structures actually correspond; sharing a count is only a numerical observation, not yet a proof', isCorrect: true },
      { text: 'Sharing the same count is itself sufficient proof that the two structures are equivalent', isCorrect: false, misconceptionId: `${CATALAN_NUMBERS}:MC-2` },
      { text: "Yes, since two structures counted by the same formula must automatically be the same object in disguise", isCorrect: false, misconceptionId: `${CATALAN_NUMBERS}:MC-2` },
    ],
    targetedMisconceptions: [`${CATALAN_NUMBERS}:MC-2`],
    source: eb(CATALAN_NUMBERS, 'Misconceptions MC-2 detection probe (Discovery Question 2) — whether a shared Catalan count alone proves equivalence, an answer of "yes" confirming ALL-CATALAN-STRUCTURES-ARE-EASILY-VISIBLE'),
  },
  {
    conceptId: CATALAN_NUMBERS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does the Catalan recurrence\'s "split into two smaller problems" idea depend on which specific structure (parenthesizations, Dyck paths, triangulations) you\'re counting?',
    choices: [
      { text: 'No — the identical "choose a splitting point" structure recurs for every Catalan structure (parenthesizations split at the last multiplication, Dyck paths split at the first return to the diagonal, triangulations split at the base-edge triangle), giving the same recurrence Cₙ=ΣCₖCₙ₋₁₋ₖ each time', isCorrect: true },
      { text: 'Yes — the recurrence only genuinely applies to the specific structure (parenthesizations) it was first derived for', isCorrect: false, misconceptionId: `${CATALAN_NUMBERS}:MC-3` },
      { text: "Yes, since each Catalan structure requires deriving its own separate, unrelated recurrence", isCorrect: false, misconceptionId: `${CATALAN_NUMBERS}:MC-3` },
    ],
    targetedMisconceptions: [`${CATALAN_NUMBERS}:MC-3`],
    source: eb(CATALAN_NUMBERS, 'Misconceptions MC-3 detection probe (Discovery Question 3) — whether the splitting recurrence depends on the specific Catalan structure, an answer of "yes" confirming RECURRENCE-ONLY-WORKS-FOR-PARENTHESISATIONS'),
  },
  {
    conceptId: STIRLING_NUMBERS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For S(3,2) and s(3,2), both equal 3. Does that mean the two notations always agree?',
    choices: [
      { text: 'No — this is a coincidence at n=3; checking n=4 shows S(4,2)=7 while s(4,2)=11, genuinely different values, since the two kinds count structurally different things (unordered partitions versus cyclic arrangements)', isCorrect: true },
      { text: 'Yes — S(n,k) and s(n,k) are two notations for the identical quantity', isCorrect: false, misconceptionId: `${STIRLING_NUMBERS}:MC-1` },
      { text: "Yes, since both count ways to group n elements into k groups, so they must always match", isCorrect: false, misconceptionId: `${STIRLING_NUMBERS}:MC-1` },
    ],
    targetedMisconceptions: [`${STIRLING_NUMBERS}:MC-1`],
    source: eb(STIRLING_NUMBERS, 'Misconceptions MC-1 detection probe (Discovery Question 2) — S(3,2)=s(3,2)=3, an answer of "yes" (always agree) confirming FIRST-AND-SECOND-KIND-STIRLING-NUMBERS-CONFLATED'),
  },
  {
    conceptId: STIRLING_NUMBERS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'In the recurrence for S(n,k), the coefficient on "join an existing group" is k. In the recurrence for s(n,k), it\'s (n-1). What is each coefficient actually counting?',
    choices: [
      { text: 'k counts the number of existing UNORDERED groups the new element could join (one per group, since a group has no internal positions); (n-1) counts the distinct insertion points into an existing CYCLIC arrangement (one immediately after each of the n-1 already-placed elements)', isCorrect: true },
      { text: 'Both coefficients count the same thing — the number of groups formed so far — and can be used interchangeably between the two recurrences', isCorrect: false, misconceptionId: `${STIRLING_NUMBERS}:MC-2` },
      { text: "The coefficients are arbitrary constants that don't correspond to anything countable in the structure", isCorrect: false, misconceptionId: `${STIRLING_NUMBERS}:MC-2` },
    ],
    targetedMisconceptions: [`${STIRLING_NUMBERS}:MC-2`],
    source: eb(STIRLING_NUMBERS, 'Misconceptions MC-2 detection probe (Discovery Question 3) — the k versus (n-1) recurrence coefficients, an answer treating them as interchangeable confirming RECURRENCE-COEFFICIENT-CONFUSED-BETWEEN-THE-TWO-KINDS'),
  },
  {
    conceptId: STIRLING_NUMBERS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If you group three friends {a,b,c} into two teams where team membership is all that matters (no team names), how many genuinely different ways are there — and does labeling the teams "Team 1"/"Team 2" change this count?',
    choices: [
      { text: 'S(3,2)=3 genuinely distinct partitions ({a}{b,c}, {b}{a,c}, {c}{a,b}); labeling the teams and treating each labeling as a separate outcome would incorrectly double-count to 6, since swapping which physical group is called "Team 1" changes nothing about the actual partition', isCorrect: true },
      { text: '6 — since each partition can be labeled two ways (Team 1/Team 2 versus Team 2/Team 1), both labelings should be counted as genuinely different outcomes', isCorrect: false, misconceptionId: `${STIRLING_NUMBERS}:MC-3` },
      { text: "6, because grouping people always requires accounting for which specific labeled position each group occupies", isCorrect: false, misconceptionId: `${STIRLING_NUMBERS}:MC-3` },
    ],
    targetedMisconceptions: [`${STIRLING_NUMBERS}:MC-3`],
    source: eb(STIRLING_NUMBERS, 'Misconceptions MC-3 detection probe (Discovery Question 1 / Demonstration 3) — partitioning 3 friends into 2 unlabeled teams, an inflated count of 6 from treating labelings as distinct confirming PARTITION-COUNTED-WITH-INTERNAL-ORDER'),
  },
]
