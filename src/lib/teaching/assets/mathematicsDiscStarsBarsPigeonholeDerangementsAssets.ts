/**
 * Batch: stars-bars, pigeonhole, derangements (math.disc).
 *
 * Continues math.disc (12/32 -> 15/32) after the combinatorics/inclusion-
 * exclusion/binomial-theorem batch. Fresh frontier recompute found 16
 * ready concepts, all now with 0 further KG unlocks — the remaining
 * domain is mostly leaf concepts. Selected stars-bars, pigeonhole, and
 * derangements to close out the immediate children of combinations
 * (stars-bars), counting-principles (pigeonhole), and inclusion-exclusion
 * (derangements) opened by earlier batches. Transcribed from the frozen
 * Educational Brain entries at educational-brain/concepts/mathematics/
 * math.disc.{stars-bars,pigeonhole,derangements}.md.
 *
 * Grade band: all three are EB difficulty "proficient" with prerequisites
 * (combinations, counting-principles, inclusion-exclusion) already seeded
 * GradeBand.HIGH and no undergraduate-tagged prerequisite pulling any of
 * them up — GradeBand.HIGH retained, consistent with the domain's
 * established baseline.
 *
 *   STARS-BARS  Applies ONLY to INDISTINGUISHABLE objects — distinct
 *           objects use kⁿ (functions), never C(n+k-1,k-1); k bins need
 *           exactly k-1 bars (one per GAP), never k bars; the at-least-one
 *           constraint substitutes yᵢ=xᵢ-1, giving n-k, never n+k.
 *   PIGEONHOLE  The genuine skill is CONSTRUCTING non-obvious holes, never
 *           mechanically matching "n+1 into n"; ⌈m/n⌉ is a guaranteed
 *           LOWER BOUND on the fullest hole, never an exact value; the
 *           principle is NON-CONSTRUCTIVE — it proves a collision exists
 *           but never identifies which one.
 *   DERANGEMENTS  D(n) is derived by applying inclusion-exclusion to "no
 *           position is fixed," with EXACTLY C(n,k) terms at each
 *           intersection level, never a miscounted term count; D(n)/n!→1/e
 *           converges RAPIDLY (already accurate by n≈10), never requiring
 *           enormous n; "no fixed point" means EVERY position, never just
 *           one checked position.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const STARS_BARS = 'math.disc.stars-bars'
const PIGEONHOLE = 'math.disc.pigeonhole'
const DERANGEMENTS = 'math.disc.derangements'

export const MATHEMATICS_DISC_STARS_BARS_PIGEONHOLE_DERANGEMENTS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: STARS_BARS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'STARS-AND-BARS APPLIES ONLY TO INDISTINGUISHABLE OBJECTS — DISTINCT OBJECTS USE kⁿ, NEVER '
      + 'C(n+k-1,k-1): distributing 3 IDENTICAL coins into 4 banks gives C(3+3,3)=C(6,3)=20 ways '
      + '(a row of 3 stars and 3 bars, choosing bar positions). But distributing 3 DISTINCT coins '
      + '(each with a different serial number) into 4 banks is a genuinely different problem: each '
      + 'coin independently chooses one of 4 banks, giving 4³=64 ways — a function from the 3 '
      + 'distinct objects to the 4 bins, never the stars-and-bars formula. The deciding test is '
      + '"would swapping two objects change the distribution?" — if yes, use kⁿ; if no (identical), '
      + 'use stars-and-bars.\n\n'
      + 'k BINS NEED EXACTLY k-1 BARS — ONE PER GAP, NEVER k BARS: for k bins arranged in a row, '
      + 'there is one divider BETWEEN each adjacent pair, so k bins require exactly k-1 dividers '
      + '(e.g. 3 bins in a row, [bin₁|bin₂|bin₃], uses exactly 2 bars, never 3). Choosing which k-1 '
      + 'of the n+k-1 total symbol positions are bars determines the entire distribution.\n\n'
      + 'THE AT-LEAST-ONE CONSTRAINT SUBSTITUTES yᵢ=xᵢ-1, GIVING n-k, NEVER n+k: for the '
      + 'restriction that each of k bins receives at least 1 object, substituting yᵢ=xᵢ-1≥0 gives '
      + 'Σyᵢ=n-k (each bin\'s mandatory unit is pre-allocated and REMOVED from the total before '
      + 'redistributing the remainder). Applying stars-and-bars to the yᵢ gives '
      + 'C((n-k)+k-1,k-1)=C(n-1,k-1) — for example, distributing 7 identical cookies among 4 '
      + 'children with each getting at least 1: C(7-1,3)=C(6,3)=20, computed from n-k=3, never '
      + 'from an inflated n+k=11.',
    targetedMisconceptions: [`${STARS_BARS}:MC-1`, `${STARS_BARS}:MC-2`, `${STARS_BARS}:MC-3`],
    source: eb(STARS_BARS, 'Core Understanding — stars-and-bars applying only to indistinguishable objects never distinct ones, k bins requiring exactly k-1 bars never k bars, and the at-least-one substitution correctly subtracting k from n never adding it'),
  },
  {
    conceptId: PIGEONHOLE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'THE GENUINE SKILL IS CONSTRUCTING NON-OBVIOUS HOLES, NEVER MECHANICALLY MATCHING "n+1 INTO '
      + 'n": among any 5 lattice points in the plane, two have a midpoint with integer coordinates. '
      + 'The pigeons are the 5 points, but the holes are NOT given directly by the problem — they '
      + 'must be actively constructed: each point\'s parity class (x mod 2, y mod 2) gives exactly 4 '
      + 'possible classes. With 5 points and 4 classes, two points share a class, so their '
      + 'coordinate sum is even in both components, giving an integer-coordinate midpoint. The '
      + 'counting step, once pigeons and holes are identified, is mechanical; the mathematical work '
      + 'is DESIGNING the categorization.\n\n'
      + '⌈m/n⌉ IS A GUARANTEED LOWER BOUND ON THE FULLEST HOLE, NEVER AN EXACT VALUE: for 13 people '
      + 'in 4 cities, ⌈13/4⌉=4 is the GUARANTEED MINIMUM for the fullest city — but the actual '
      + 'maximum could be much larger (up to 10). For 7 objects in 3 holes, ⌈7/3⌉=3: the '
      + 'distribution [5,1,1] satisfies the principle (max=5≥3) and so does [3,2,2] (max=3=3) — '
      + 'both are valid, and only when m is a multiple of n does the uniform distribution force the '
      + 'bound to be exact.\n\n'
      + 'THE PRINCIPLE IS NON-CONSTRUCTIVE — IT PROVES A COLLISION EXISTS BUT NEVER IDENTIFIES '
      + 'WHICH ONE: among any 366 people, two share a birthday — but the argument does not, and '
      + 'structurally cannot, determine WHICH two people share it. Once the argument concludes '
      + '"some hole has ≥2 pigeons," the proof is complete; asking "which hole, which objects?" is '
      + 'asking a question the principle by itself cannot answer.',
    targetedMisconceptions: [`${PIGEONHOLE}:MC-1`, `${PIGEONHOLE}:MC-2`, `${PIGEONHOLE}:MC-3`],
    source: eb(PIGEONHOLE, 'Core Understanding — the creative construction of non-obvious holes as the genuine skill never mechanical formula-matching, ⌈m/n⌉ as a guaranteed lower bound never an exact value, and the principle as non-constructive proof of existence never identification of the specific collision'),
  },
  {
    conceptId: DERANGEMENTS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'D(n) IS DERIVED BY APPLYING INCLUSION-EXCLUSION TO "NO POSITION IS FIXED," WITH EXACTLY '
      + 'C(n,k) TERMS AT EACH INTERSECTION LEVEL, NEVER A MISCOUNTED TERM COUNT: let Aᵢ be the set '
      + 'of permutations where element i IS fixed. For n=3: |Aᵢ|=2!=2 for each of C(3,1)=3 single '
      + 'choices; |Aᵢ∩Aⱼ|=1!=1 for each of C(3,2)=3 pairs; |A₁∩A₂∩A₃|=0!=1 for the single C(3,3)=1 '
      + 'triple. So |A₁∪A₂∪A₃|=3(2)-3(1)+1(1)=4, giving D(3)=3!-4=2. The individual intersection '
      + 'VALUES ((n-k)!) are straightforward, but the term COUNT at each level (C(n,k)) must be '
      + 'tracked separately and just as carefully — this bookkeeping is where errors hide even when '
      + 'the arithmetic is correct. The general closed form is D(n)=n!Σₖ(-1)ᵏ/k!.\n\n'
      + 'D(n)/n!→1/e CONVERGES RAPIDLY (ALREADY ACCURATE BY n≈10), NEVER REQUIRING ENORMOUS n: as '
      + 'n→∞, D(n)/n!→Σ(-1)ᵏ/k!=e⁻¹=1/e≈0.368. Because each successive term (-1)ᵏ/k! shrinks '
      + 'factorially fast, D(10)/10! already matches 1/e to within 0.001% — this alternating series '
      + 'converges far faster than many other approximations a learner may have previously '
      + 'encountered, so trusting it only for "very large n" is unwarranted here.\n\n'
      + '"NO FIXED POINT" MEANS EVERY POSITION, NEVER JUST ONE CHECKED POSITION: for the '
      + 'permutation (2,1,3,4) — meaning 1→2, 2→1, 3→3, 4→4 — position 1 is NOT fixed (element 1 '
      + 'maps to position 2), but positions 3 and 4 ARE fixed. This permutation is NOT a '
      + 'derangement, despite avoiding a fixed point at position 1, because "no fixed point" is a '
      + 'universally-quantified condition over ALL n positions simultaneously, never satisfied by '
      + 'checking only one.',
    targetedMisconceptions: [`${DERANGEMENTS}:MC-1`, `${DERANGEMENTS}:MC-2`, `${DERANGEMENTS}:MC-3`],
    source: eb(DERANGEMENTS, 'Core Understanding — D(n) derived via inclusion-exclusion with exactly C(n,k) terms per level never a miscounted term count, the D(n)/n! to 1/e convergence being rapid never requiring huge n, and "no fixed point" requiring every position never just one checked position'),
  },
]

export const MATHEMATICS_DISC_STARS_BARS_PIGEONHOLE_DERANGEMENTS_PROBES: SeedProbe[] = [
  {
    conceptId: STARS_BARS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'How many ways can 3 distinct coins (each with a different serial number) be distributed among 4 piggy banks?',
    choices: [
      { text: '4³=64 — each of the 3 distinct coins independently chooses one of 4 banks, a function count, since swapping two coins genuinely changes which bank holds which coin', isCorrect: true },
      { text: 'C(3+3,3)=C(6,3)=20 — applying the stars-and-bars formula directly', isCorrect: false, misconceptionId: `${STARS_BARS}:MC-1` },
      { text: "20, since distributing objects into bins always uses the stars-and-bars formula regardless of whether the objects are identical or distinct", isCorrect: false, misconceptionId: `${STARS_BARS}:MC-1` },
    ],
    targetedMisconceptions: [`${STARS_BARS}:MC-1`],
    source: eb(STARS_BARS, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — 3 distinct coins into 4 piggy banks, an answer of C(6,3)=20 confirming STARS-BARS-FOR-DISTINCT-OBJECTS'),
  },
  {
    conceptId: STARS_BARS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Distribute 7 identical cookies among 4 children, each getting at least 1.',
    choices: [
      { text: 'C(6,3)=20 — substituting yᵢ=xᵢ-1 gives Σyᵢ=7-4=3, then applying stars-and-bars to the remainder: C(3+3,3)=C(6,3)=20', isCorrect: true },
      { text: 'C(10,3)=120 — computed using n+k=11 instead of n-k=3', isCorrect: false, misconceptionId: `${STARS_BARS}:MC-2` },
      { text: "120, since the at-least-one constraint means adding k to n before applying the formula", isCorrect: false, misconceptionId: `${STARS_BARS}:MC-2` },
    ],
    targetedMisconceptions: [`${STARS_BARS}:MC-2`],
    source: eb(STARS_BARS, 'Misconceptions MC-2 detection probe (verbatim, Blueprint) — 7 cookies among 4 children each getting at least 1, an inflated answer from n+k confirming AT-LEAST-ONE-MEANS-REPLACE-n-BY-n+1'),
  },
  {
    conceptId: STARS_BARS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How many bars are needed to separate 4 distinct bins in a single row?',
    choices: [
      { text: '3 — one bar per GAP between adjacent bins; 4 bins have exactly 3 gaps between them', isCorrect: true },
      { text: '4 — one bar per bin', isCorrect: false, misconceptionId: `${STARS_BARS}:MC-3` },
      { text: "4, since each bin needs its own bar to be properly separated from the others", isCorrect: false, misconceptionId: `${STARS_BARS}:MC-3` },
    ],
    targetedMisconceptions: [`${STARS_BARS}:MC-3`],
    source: eb(STARS_BARS, 'Misconceptions MC-3 detection probe (verbatim, Blueprint) — bars needed to separate 4 bins, an answer of 4 confirming BARS-COUNT-EQUALS-BINS-COUNT'),
  },
  {
    conceptId: PIGEONHOLE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Among any 5 lattice points in the plane, prove two have a midpoint with integer coordinates. The problem gives no obvious categories — what should you do?',
    choices: [
      { text: 'Actively construct the holes: use each point\'s parity class (x mod 2, y mod 2) — exactly 4 possible classes — so with 5 points and 4 classes, two points must share a class, giving an integer-coordinate midpoint', isCorrect: true },
      { text: 'Since no categories are stated, the pigeonhole principle cannot be applied to this problem', isCorrect: false, misconceptionId: `${PIGEONHOLE}:MC-1` },
      { text: "Treat the 5 points themselves as both the pigeons and the holes, since that's all the problem provides", isCorrect: false, misconceptionId: `${PIGEONHOLE}:MC-1` },
    ],
    targetedMisconceptions: [`${PIGEONHOLE}:MC-1`],
    source: eb(PIGEONHOLE, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — the lattice-point problem with no stated categories, an inability to construct non-obvious holes confirming PIGEONHOLE-IS-A-FORMULA-NOT-AN-ARGUMENT'),
  },
  {
    conceptId: PIGEONHOLE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: '13 people live in 4 cities. What is the maximum number of people in any one city?',
    choices: [
      { text: 'At least ⌈13/4⌉=4 is guaranteed, but the true maximum could be much higher (up to 10) — the principle gives a lower bound, never an exact value', isCorrect: true },
      { text: 'Exactly ⌈13/4⌉=4', isCorrect: false, misconceptionId: `${PIGEONHOLE}:MC-2` },
      { text: "Exactly 4, since the pigeonhole principle computes the precise maximum for any distribution", isCorrect: false, misconceptionId: `${PIGEONHOLE}:MC-2` },
    ],
    targetedMisconceptions: [`${PIGEONHOLE}:MC-2`],
    source: eb(PIGEONHOLE, 'Misconceptions MC-2 detection probe (verbatim, Blueprint) — 13 people in 4 cities, an answer of "exactly 4" confirming PIGEONHOLE-GUARANTEES-THE-MAXIMUM'),
  },
  {
    conceptId: PIGEONHOLE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'By pigeonhole, among any 366 people, two share a birthday. Which two people share it?',
    choices: [
      { text: 'The argument cannot determine this — pigeonhole is non-constructive: it proves a collision exists but gives no method for locating the specific pair', isCorrect: true },
      { text: 'The two people whose birthdays were listed first and second in the argument\'s construction', isCorrect: false, misconceptionId: `${PIGEONHOLE}:MC-3` },
      { text: "The pigeonhole argument itself identifies exactly which two people share the birthday, once carried out fully", isCorrect: false, misconceptionId: `${PIGEONHOLE}:MC-3` },
    ],
    targetedMisconceptions: [`${PIGEONHOLE}:MC-3`],
    source: eb(PIGEONHOLE, 'Misconceptions MC-3 detection probe (verbatim, Blueprint) — "which two people share the birthday," an attempt to locate the collision from the argument itself confirming THE-PRINCIPLE-FINDS-THE-COLLISION'),
  },
  {
    conceptId: DERANGEMENTS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For n=3, compute D(3) via inclusion-exclusion, showing each level\'s term count explicitly.',
    choices: [
      { text: 'D(3)=2 — with C(3,1)=3 single terms (each 2!=2), C(3,2)=3 pair terms (each 1!=1), and C(3,3)=1 triple term (0!=1): |A₁∪A₂∪A₃|=3(2)-3(1)+1(1)=4, so D(3)=3!-4=2', isCorrect: true },
      { text: 'D(3) computed using only 2 single-fixed-point terms instead of the correct 3', isCorrect: false, misconceptionId: `${DERANGEMENTS}:MC-1` },
      { text: "D(3) computed by summing the individual |Aᵢ| values without separately tracking how many such terms exist at each level", isCorrect: false, misconceptionId: `${DERANGEMENTS}:MC-1` },
    ],
    targetedMisconceptions: [`${DERANGEMENTS}:MC-1`],
    source: eb(DERANGEMENTS, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — computing D(3) via inclusion-exclusion, a miscounted number of terms at a level confirming INCLUSION-EXCLUSION-TERM-COUNT-MISCOMPUTED-FOR-DERANGEMENTS'),
  },
  {
    conceptId: DERANGEMENTS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is D(10)/10! a trustworthy estimate of 1/e, or would you need n in the thousands to trust it?',
    choices: [
      { text: 'D(10)/10! is already trustworthy — it matches 1/e≈0.3679 to within 0.001% at n=10, since the alternating series\' factorially-shrinking terms converge unusually fast', isCorrect: true },
      { text: 'The approximation is unreliable at n=10; you would need n in the thousands to trust it', isCorrect: false, misconceptionId: `${DERANGEMENTS}:MC-2` },
      { text: "Like most limiting approximations in mathematics, this one requires very large n before it becomes accurate", isCorrect: false, misconceptionId: `${DERANGEMENTS}:MC-2` },
    ],
    targetedMisconceptions: [`${DERANGEMENTS}:MC-2`],
    source: eb(DERANGEMENTS, 'Misconceptions MC-2 detection probe (verbatim, Blueprint) — whether D(10)/10! is trustworthy, a claim that huge n is needed confirming ONE-OVER-E-APPROXIMATION-ASSUMED-TO-NEED-HUGE-N'),
  },
  {
    conceptId: DERANGEMENTS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the permutation (2,1,3,4) — meaning 1→2, 2→1, 3→3, 4→4 — a derangement, given that position 1 is not fixed?',
    choices: [
      { text: 'No — although position 1 is not fixed, positions 3 and 4 ARE fixed (3→3, 4→4); a derangement requires EVERY position to avoid being fixed, not just one', isCorrect: true },
      { text: 'Yes — since position 1 is not fixed, the permutation qualifies as a derangement', isCorrect: false, misconceptionId: `${DERANGEMENTS}:MC-3` },
      { text: "Yes, because checking that the first position avoids its original spot is sufficient to confirm a derangement", isCorrect: false, misconceptionId: `${DERANGEMENTS}:MC-3` },
    ],
    targetedMisconceptions: [`${DERANGEMENTS}:MC-3`],
    source: eb(DERANGEMENTS, 'Misconceptions MC-3 detection probe (verbatim, Blueprint) — the permutation (2,1,3,4) with position 1 unfixed but positions 3,4 fixed, an answer of "yes" confirming DERANGEMENT-CONFUSED-WITH-ANY-PERMUTATION-WITHOUT-A-SPECIFIC-FIXED-POINT'),
  },
]
