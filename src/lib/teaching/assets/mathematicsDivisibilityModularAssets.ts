/**
 * Twenty-third batch — the divisibility spine and the arithmetic of
 * remainders.
 *
 * Another chain the registers show being learnt as scattered facts:
 *
 *   divisibility -> division algorithm -> Euclidean algorithm -> gcd/lcm
 *   division algorithm -> congruence -> modular arithmetic
 *
 * The division algorithm sits at the fork. Its uniqueness of remainder
 * is what makes the Euclidean algorithm terminate, AND what makes
 * "a mod n" a well-defined single value rather than a choice. Two of
 * these registers record the algorithm being treated as a restatement
 * of division, which is exactly the reading that hides both.
 *
 *   DIVIDES    divisibility, division-algorithm, prime-factorization
 *   COMMON     euclidean-algorithm, gcd, lcm
 *   REMAINDER  congruence, modular-arithmetic
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const DIV = 'math.nt.divisibility'
const DALG = 'math.nt.division-algorithm'
const PFAC = 'math.nt.prime-factorization'
const EUC = 'math.nt.euclidean-algorithm'
const GCD = 'math.nt.gcd'
const LCM = 'math.nt.lcm'
const CONG = 'math.nt.congruence'
const MODA = 'math.nt.modular-arithmetic'

export const MATHEMATICS_DIVISIBILITY_MODULAR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DIV, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'a | b means "a divides b" — there is an integer k with b = ak. It is a yes-or-no '
      + 'CLAIM, not an instruction to divide: 3 | 12 is a true statement, and it is not '
      + 'another way of writing 12 ÷ 3 = 4.\n\n'
      + 'The direction matters and the notation misleads. 3 | 12 is true and 12 | 3 is false, '
      + 'even though the fraction bar in 3/12 suggests the opposite reading — the small number '
      + 'goes first, and the bar means "divides", not "divided by". Divisibility is not '
      + 'symmetric, and a | b together with b | a forces a = ±b.\n\n'
      + 'Negatives and zero are included. −3 | 12 is true, since 12 = (−3)(−4), and every '
      + 'integer divides 0 because 0 = a × 0 — while 0 divides nothing but itself. Restricting '
      + 'attention to positives is a habit from arithmetic and it quietly breaks statements '
      + 'that are meant to hold over all of ℤ.',
    targetedMisconceptions: [`${DIV}:MC-1`, `${DIV}:MC-2`],
    source: eb(DIV, 'Identity + Misconception register — a claim not an operation; not symmetric'),
  },
  {
    conceptId: DALG, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'For integers a and b > 0, there are UNIQUE integers q and r with a = bq + r and '
      + '0 ≤ r < b. Dividing 17 by 5 gives q = 3, r = 2, and no other pair satisfies both '
      + 'conditions.\n\n'
      + 'Uniqueness is the whole content, and it is what the name hides — this is not a '
      + 'restatement of division but a guarantee that the remainder is a single well-defined '
      + 'value. Everything downstream leans on it: the Euclidean algorithm terminates because '
      + 'r strictly shrinks, and "a mod n" names one number rather than offering a choice.\n\n'
      + 'The remainder must be NON-NEGATIVE, which is where calculators and languages differ '
      + 'from the theorem. For a = −17 and b = 5, truncating gives q = −3, r = −2 — and −2 is '
      + 'outside 0 ≤ r < 5, so it is not the division-algorithm answer. The correct pair is '
      + 'q = −4, r = 3, since −17 = 5(−4) + 3. Checking only r < b and forgetting r ≥ 0 is '
      + 'what lets the wrong pair through.',
    targetedMisconceptions: [`${DALG}:MC-1`, `${DALG}:MC-3`],
    source: eb(DALG, 'Identity + Misconception register — uniqueness is the content; the remainder is non-negative'),
  },
  {
    conceptId: PFAC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Prime factorisation breaks a number into primes multiplied together: 60 = 2² × 3 × 5. '
      + 'A factor tree does it — split off any factor pair and keep splitting until every '
      + 'leaf is prime.\n\n'
      + 'Every leaf. Stopping at 60 = 4 × 15 leaves two composites and is not a prime '
      + 'factorisation; 4 becomes 2 × 2 and 15 becomes 3 × 5. The test is not whether the '
      + 'product is right but whether anything left can still be split, and that is the step '
      + 'most often abandoned early.\n\n'
      + 'The answer does not depend on how you started. Beginning 60 = 6 × 10 or 60 = 4 × 15 '
      + 'or 60 = 2 × 30 all end at 2² × 3 × 5 — the routes differ and the destination does '
      + 'not, which is the Fundamental Theorem of Arithmetic doing its work. Order is not '
      + 'part of the answer either, and 1 is never a factor in it: including 1 would let you '
      + 'write infinitely many versions of the same factorisation.',
    targetedMisconceptions: [`${PFAC}:MC-1`, `${PFAC}:MC-3`],
    source: eb(PFAC, 'Identity + Misconception register — split until every leaf is prime; the route does not matter'),
  },
  {
    conceptId: EUC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The Euclidean algorithm finds gcd(a, b) by replacing (a, b) with (b, a mod b) and '
      + 'repeating. For 48 and 18: 48 mod 18 = 12, then 18 mod 12 = 6, then 12 mod 6 = 0. The '
      + 'gcd is 6.\n\n'
      + 'You stop when the remainder is exactly ZERO, and the answer is the LAST NON-ZERO '
      + 'remainder — not the zero, and not whichever remainder looked small enough. Stopping '
      + 'at 6 because it seemed final is right by luck here; stopping at 12 because it was '
      + '"getting small" would give the wrong answer, and there is no size threshold '
      + 'anywhere in the method.\n\n'
      + 'It works because gcd(a, b) = gcd(b, a mod b) — anything dividing both a and b also '
      + 'divides a − bq, so the pair changes while the set of common divisors does not. That '
      + 'is not an unexplained rule but the reason the algorithm is CORRECT, and the division '
      + 'algorithm is why it TERMINATES: each remainder is strictly smaller than the last and '
      + 'non-negative, so the sequence must reach 0.',
    targetedMisconceptions: [`${EUC}:MC-1`, `${EUC}:MC-3`],
    source: eb(EUC, 'Identity + Misconception register — stop at zero, take the last non-zero; why it is correct'),
  },
  {
    conceptId: GCD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'gcd(a, b) is the largest integer dividing both. From prime factorisations, take each '
      + 'shared prime to the LOWER exponent: 12 = 2²×3 and 18 = 2×3², so the gcd is 2¹×3¹ = '
      + '6 — the most you can take of each prime without exceeding either number.\n\n'
      + 'Lower for gcd, higher for lcm, and the pair is worth learning together because they '
      + 'are constantly swapped. The sanity check is size: a gcd can never exceed the smaller '
      + 'input, so an answer bigger than either number is wrong before you check anything '
      + 'else.\n\n'
      + 'When gcd(a, b) = 1 the numbers are COPRIME, and neither needs to be prime for that. '
      + '8 and 9 are coprime and both are composite — coprimality is a relation between two '
      + 'numbers about sharing nothing, not a claim that either is prime. For large numbers '
      + 'the Euclidean algorithm beats factorising, since it never needs the factorisations '
      + 'at all.',
    targetedMisconceptions: [`${GCD}:MC-1`, `${GCD}:MC-2`],
    source: eb(GCD, 'Identity + Misconception register — lower exponents; coprime needs no prime'),
  },
  {
    conceptId: LCM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'lcm(a, b) is the smallest positive integer both divide. From prime factorisations take '
      + 'each prime to the HIGHER exponent: 12 = 2²×3 and 18 = 2×3² give 2²×3² = 36 — enough '
      + 'of each prime to cover both, and no more.\n\n'
      + 'It is not the product. 12 × 18 = 216, which is a common multiple and six times too '
      + 'big; the product only equals the lcm when the numbers are coprime. The general '
      + 'relation is lcm(a,b) = ab / gcd(a,b), and here 216/6 = 36 — the gcd is exactly the '
      + 'over-counting you have to divide out.\n\n'
      + 'The size check runs the opposite way from the gcd\'s, which is a useful pairing. A '
      + 'gcd never exceeds the smaller input; an lcm is never SMALLER than the larger one, '
      + 'since it must be a multiple of both. An answer below the larger number is wrong '
      + 'immediately.',
    targetedMisconceptions: [`${LCM}:MC-1`, `${LCM}:MC-3`],
    source: eb(LCM, 'Identity + Misconception register — higher exponents; not the product'),
  },
  {
    conceptId: CONG, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'a ≡ b (mod n) means n divides a − b — the two leave the same remainder on division by '
      + 'n. 17 ≡ 2 (mod 5) because 15 is a multiple of 5.\n\n'
      + 'Congruent is not equal, and the ≡ symbol is deliberately not =. 17 and 2 are '
      + 'different numbers that agree in one respect, exactly as a clock treats 15:00 and '
      + '3:00 as the same time without the numbers being the same. Congruence is always '
      + 'RELATIVE to a modulus, so dropping "(mod n)" leaves a statement that means nothing.\n\n'
      + 'It is an equivalence relation, and the proof needs no new machinery: reflexive '
      + 'because n | 0; symmetric because n | (a−b) gives n | (b−a); transitive because the '
      + 'two differences add. So it partitions ℤ into exactly n residue classes for modulus '
      + 'n — always n, never more or fewer, one for each possible remainder 0 through n−1.',
    targetedMisconceptions: [`${CONG}:MC-1`, `${CONG}:MC-3`],
    source: eb(CONG, 'Identity + Misconception register — congruent is not equal; exactly n classes'),
  },
  {
    conceptId: MODA, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Modular arithmetic works inside {0, 1, …, n−1}, reducing every result back into that '
      + 'range. Mod 12 it is clock arithmetic: 9 + 5 = 14, which reduces to 2. Addition, '
      + 'subtraction and multiplication all behave — you may reduce at any point, which is '
      + 'what keeps huge computations small.\n\n'
      + 'Reduce negatives back INTO the range. Mod 7, 3 − 5 = −2, and −2 is not an answer '
      + 'here; add 7 to get 5. Leaving a negative intermediate unreduced is the commonest '
      + 'slip, and it survives because the arithmetic before it was right.\n\n'
      + 'Division is the operation that does NOT simply carry over. a/b means multiplying by '
      + 'b\'s inverse, and that inverse exists only when gcd(b, n) = 1 — so mod 12, 5 has an '
      + 'inverse and 6 has none, however non-zero 6 looks. Every non-zero residue is '
      + 'invertible only when n is PRIME, which is exactly why prime moduli matter so much in '
      + 'cryptography. Note also that mod n has n residues, 0 through n−1, so mod 12 the set '
      + 'ends at 11.',
    targetedMisconceptions: [`${MODA}:MC-1`, `${MODA}:MC-2`],
    source: eb(MODA, 'Identity + Misconception register — reduce negatives; inverses need coprimality'),
  },
]

export const MATHEMATICS_DIVISIBILITY_MODULAR_PROBES: SeedProbe[] = [
  // --- math.nt.divisibility -------------------------------------------------------
  {
    conceptId: DIV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does 3 | 12 assert?',
    choices: [
      { text: 'That 3 divides 12 — a true statement, not an instruction to divide', isCorrect: true },
      { text: 'That 12 divided by 3 equals 4', isCorrect: false, misconceptionId: `${DIV}:MC-1` },
      { text: 'The fraction three twelfths', isCorrect: false, misconceptionId: `${DIV}:MC-1` },
    ],
    targetedMisconceptions: [`${DIV}:MC-1`],
    source: eb(DIV, 'Assessment gate — divisibility is a claim'),
  },
  {
    conceptId: DIV, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: '3 | 12 is true. Is 12 | 3?',
    choices: [
      { text: 'No — divisibility is not symmetric; the smaller number goes first', isCorrect: true },
      { text: 'Yes — the relation works both ways', isCorrect: false, misconceptionId: `${DIV}:MC-2` },
      { text: 'Yes, since 12/3 is a whole number', isCorrect: false, misconceptionId: `${DIV}:MC-2` },
    ],
    targetedMisconceptions: [`${DIV}:MC-2`],
    source: eb(DIV, 'Misconception register — the direction matters'),
  },
  {
    conceptId: DIV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is −3 | 12 true?',
    choices: [
      { text: 'Yes — 12 = (−3)(−4), and divisibility is defined over all integers', isCorrect: true },
      { text: 'No — divisibility applies only to positive integers', isCorrect: false, misconceptionId: `${DIV}:MC-3` },
      { text: 'No — a negative cannot divide a positive', isCorrect: false, misconceptionId: `${DIV}:MC-3` },
    ],
    targetedMisconceptions: [`${DIV}:MC-3`],
    source: eb(DIV, 'Transfer probe — negatives are included'),
  },

  // --- math.nt.division-algorithm ----------------------------------------------------
  {
    conceptId: DALG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Apply the division algorithm to a = 17, b = 5.',
    choices: [
      { text: 'q = 3, r = 2 — since 17 = 5×3 + 2 and 0 ≤ 2 < 5', isCorrect: true },
      { text: 'q = 4, r = −3', isCorrect: false, misconceptionId: `${DALG}:MC-3` },
      { text: 'q = 3.4, r = 0', isCorrect: false },
    ],
    targetedMisconceptions: [`${DALG}:MC-3`],
    source: eb(DALG, 'Assessment gate — the standard case'),
  },
  {
    conceptId: DALG, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For a = −17, b = 5, a calculator gives q = −3, r = −2. Is that the division-algorithm answer?',
    choices: [
      { text: 'No — r must satisfy 0 ≤ r < 5, so the answer is q = −4, r = 3', isCorrect: true },
      { text: 'Yes — truncating toward zero is correct', isCorrect: false, misconceptionId: `${DALG}:MC-1` },
      { text: 'Yes — r = −2 is below 5, which is the only condition', isCorrect: false, misconceptionId: `${DALG}:MC-3` },
    ],
    targetedMisconceptions: [`${DALG}:MC-1`, `${DALG}:MC-3`],
    source: eb(DALG, 'Misconception register — the remainder must be non-negative'),
  },
  {
    conceptId: DALG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What does the UNIQUENESS in the division algorithm buy you?',
    choices: [
      { text: '"a mod n" names one number, and the Euclidean algorithm is guaranteed to terminate', isCorrect: true },
      { text: 'Nothing extra — it restates ordinary division', isCorrect: false, misconceptionId: `${DALG}:MC-2` },
      { text: 'That a and b have no common factors', isCorrect: false, misconceptionId: `${DALG}:MC-2` },
    ],
    targetedMisconceptions: [`${DALG}:MC-2`],
    source: eb(DALG, 'Transfer probe — uniqueness is what everything downstream needs'),
  },

  // --- math.nt.prime-factorization -----------------------------------------------------
  {
    conceptId: PFAC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the prime factorisation of 60?',
    choices: [
      { text: '2² × 3 × 5', isCorrect: true },
      { text: '4 × 15', isCorrect: false, misconceptionId: `${PFAC}:MC-1` },
      { text: '1 × 2² × 3 × 5', isCorrect: false, misconceptionId: `${PFAC}:MC-2` },
    ],
    targetedMisconceptions: [`${PFAC}:MC-1`, `${PFAC}:MC-2`],
    source: eb(PFAC, 'Assessment gate — every leaf prime, and no 1'),
  },
  {
    conceptId: PFAC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You began 60 = 6 × 10; a classmate began 60 = 4 × 15. Will you disagree?',
    choices: [
      { text: 'No — the routes differ and both end at 2² × 3 × 5', isCorrect: true },
      { text: 'Yes — different starting splits give different factorisations', isCorrect: false, misconceptionId: `${PFAC}:MC-3` },
      { text: 'Yes — only the smallest-prime-first route is correct', isCorrect: false, misconceptionId: `${PFAC}:MC-3` },
    ],
    targetedMisconceptions: [`${PFAC}:MC-3`],
    source: eb(PFAC, 'Misconception register — the destination does not depend on the route'),
  },
  {
    conceptId: PFAC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'When is a factor tree finished?',
    choices: [
      { text: 'When every leaf is prime — nothing left can be split', isCorrect: true },
      { text: 'When the product of the leaves is right', isCorrect: false, misconceptionId: `${PFAC}:MC-1` },
      { text: 'After two levels of splitting', isCorrect: false, misconceptionId: `${PFAC}:MC-1` },
    ],
    targetedMisconceptions: [`${PFAC}:MC-1`],
    source: eb(PFAC, 'Transfer probe — the stopping test'),
  },

  // --- math.nt.euclidean-algorithm -------------------------------------------------------
  {
    conceptId: EUC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Running the Euclidean algorithm on 48 and 18 gives remainders 12, 6, 0. What is the gcd?',
    choices: [
      { text: '6 — the last NON-ZERO remainder', isCorrect: true },
      { text: '0 — the final remainder', isCorrect: false, misconceptionId: `${EUC}:MC-1` },
      { text: '12 — the first remainder', isCorrect: false, misconceptionId: `${EUC}:MC-1` },
    ],
    targetedMisconceptions: [`${EUC}:MC-1`],
    source: eb(EUC, 'Assessment gate — the last non-zero remainder'),
  },
  {
    conceptId: EUC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'When do you stop the Euclidean algorithm?',
    choices: [
      { text: 'When the remainder is exactly ZERO — there is no size threshold anywhere in the method', isCorrect: true },
      { text: 'When the remainder gets small enough to recognise', isCorrect: false, misconceptionId: `${EUC}:MC-1` },
      { text: 'After a fixed number of steps', isCorrect: false, misconceptionId: `${EUC}:MC-1` },
    ],
    targetedMisconceptions: [`${EUC}:MC-1`],
    source: eb(EUC, 'Misconception register — zero, not "small enough"'),
  },
  {
    conceptId: EUC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why does replacing (a, b) with (b, a mod b) preserve the gcd?',
    choices: [
      { text: 'Anything dividing a and b also divides a − bq, so the pair changes but the common divisors do not', isCorrect: true },
      { text: 'It does not — the algorithm approximates the gcd', isCorrect: false, misconceptionId: `${EUC}:MC-3` },
      { text: 'It is an unexplained rule that happens to work', isCorrect: false, misconceptionId: `${EUC}:MC-3` },
    ],
    targetedMisconceptions: [`${EUC}:MC-3`],
    source: eb(EUC, 'Transfer probe — why the algorithm is correct'),
  },

  // --- math.nt.gcd ---------------------------------------------------------------------------
  {
    conceptId: GCD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: '12 = 2²×3 and 18 = 2×3². What is gcd(12, 18)?',
    choices: [
      { text: '6 — take each shared prime to the LOWER exponent', isCorrect: true },
      { text: '36 — take the higher exponent of each', isCorrect: false, misconceptionId: `${GCD}:MC-1` },
      { text: '216 — the product', isCorrect: false, misconceptionId: `${GCD}:MC-1` },
    ],
    targetedMisconceptions: [`${GCD}:MC-1`],
    source: eb(GCD, 'Assessment gate — lower exponents for the gcd'),
  },
  {
    conceptId: GCD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Are 8 and 9 coprime, given neither is prime?',
    choices: [
      { text: 'Yes — coprime means gcd 1; neither number needs to be prime', isCorrect: true },
      { text: 'No — at least one must be prime', isCorrect: false, misconceptionId: `${GCD}:MC-2` },
      { text: 'No — both are composite, so they share factors', isCorrect: false, misconceptionId: `${GCD}:MC-2` },
    ],
    targetedMisconceptions: [`${GCD}:MC-2`],
    source: eb(GCD, 'Misconception register — coprime requires no prime'),
  },
  {
    conceptId: GCD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Someone reports gcd(12, 18) = 24. What is wrong before you check the working?',
    choices: [
      { text: 'A gcd can never exceed the smaller input, so 24 is impossible', isCorrect: true },
      { text: 'Nothing obvious; you must redo the calculation', isCorrect: false, misconceptionId: `${GCD}:MC-1` },
      { text: '24 is not a multiple of 18', isCorrect: false },
    ],
    targetedMisconceptions: [`${GCD}:MC-1`],
    source: eb(GCD, 'Transfer probe — the size check'),
  },

  // --- math.nt.lcm ---------------------------------------------------------------------------------
  {
    conceptId: LCM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is lcm(12, 18)?',
    choices: [
      { text: '36 — take each prime to the HIGHER exponent', isCorrect: true },
      { text: '216 — the product 12 × 18', isCorrect: false, misconceptionId: `${LCM}:MC-1` },
      { text: '6 — the lower exponents', isCorrect: false, misconceptionId: `${LCM}:MC-2` },
    ],
    targetedMisconceptions: [`${LCM}:MC-1`, `${LCM}:MC-2`],
    source: eb(LCM, 'Assessment gate — higher exponents for the lcm'),
  },
  {
    conceptId: LCM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'When does lcm(a, b) equal the product ab?',
    choices: [
      { text: 'Only when a and b are coprime — otherwise ab/gcd(a,b), since the gcd is the over-counting', isCorrect: true },
      { text: 'Always — the lcm is the product by definition', isCorrect: false, misconceptionId: `${LCM}:MC-1` },
      { text: 'Only when both are prime', isCorrect: false, misconceptionId: `${LCM}:MC-1` },
    ],
    targetedMisconceptions: [`${LCM}:MC-1`],
    source: eb(LCM, 'Misconception register — the product over-counts by the gcd'),
  },
  {
    conceptId: LCM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Someone reports lcm(12, 18) = 6. What is wrong immediately?',
    choices: [
      { text: 'An lcm is never SMALLER than the larger input, since it must be a multiple of both', isCorrect: true },
      { text: 'Nothing — 6 divides both', isCorrect: false, misconceptionId: `${LCM}:MC-3` },
      { text: 'It should be bounded by the smaller input, like a gcd', isCorrect: false, misconceptionId: `${LCM}:MC-3` },
    ],
    targetedMisconceptions: [`${LCM}:MC-3`],
    source: eb(LCM, 'Transfer probe — the lcm bound runs the other way'),
  },

  // --- math.nt.congruence -----------------------------------------------------------------------------
  {
    conceptId: CONG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Why is 17 ≡ 2 (mod 5)?',
    choices: [
      { text: 'Because 5 divides 17 − 2 = 15 — they leave the same remainder', isCorrect: true },
      { text: 'Because 17 and 2 are equal', isCorrect: false, misconceptionId: `${CONG}:MC-1` },
      { text: 'Because 17 is prime', isCorrect: false },
    ],
    targetedMisconceptions: [`${CONG}:MC-1`],
    source: eb(CONG, 'Assessment gate — n divides the difference'),
  },
  {
    conceptId: CONG, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does 17 ≡ 2 (mod 5) mean 17 and 2 are the same number?',
    choices: [
      { text: 'No — they agree in ONE respect, like a clock treating 15:00 and 3:00 as the same time', isCorrect: true },
      { text: 'Yes — that is what the ≡ means', isCorrect: false, misconceptionId: `${CONG}:MC-1` },
      { text: 'Yes, within modular arithmetic they are literally equal', isCorrect: false, misconceptionId: `${CONG}:MC-1` },
    ],
    targetedMisconceptions: [`${CONG}:MC-1`],
    source: eb(CONG, 'Misconception register — congruent is not equal'),
  },
  {
    conceptId: CONG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How many residue classes does congruence mod 7 partition ℤ into?',
    choices: [
      { text: 'Exactly 7 — one for each remainder 0 through 6, always', isCorrect: true },
      { text: 'It varies with which integers you consider', isCorrect: false, misconceptionId: `${CONG}:MC-3` },
      { text: 'Infinitely many, since ℤ is infinite', isCorrect: false, misconceptionId: `${CONG}:MC-3` },
    ],
    targetedMisconceptions: [`${CONG}:MC-3`],
    source: eb(CONG, 'Transfer probe — exactly n classes'),
  },

  // --- math.nt.modular-arithmetic -----------------------------------------------------------------------
  {
    conceptId: MODA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is 9 + 5 mod 12?',
    choices: [
      { text: '2 — clock arithmetic; 14 reduces into {0,…,11}', isCorrect: true },
      { text: '14', isCorrect: false, misconceptionId: `${MODA}:MC-2` },
      { text: '12', isCorrect: false, misconceptionId: `${MODA}:MC-3` },
    ],
    targetedMisconceptions: [`${MODA}:MC-2`],
    source: eb(MODA, 'Assessment gate — reduce into the range'),
  },
  {
    conceptId: MODA, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What is 3 − 5 mod 7?',
    choices: [
      { text: '5 — add 7 to bring −2 back into the range', isCorrect: true },
      { text: '−2 — leave it as it comes out', isCorrect: false, misconceptionId: `${MODA}:MC-2` },
      { text: '2 — drop the sign', isCorrect: false, misconceptionId: `${MODA}:MC-2` },
    ],
    targetedMisconceptions: [`${MODA}:MC-2`],
    source: eb(MODA, 'Misconception register — negatives must be reduced in'),
  },
  {
    conceptId: MODA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Mod 12, does 6 have a multiplicative inverse?',
    choices: [
      { text: 'No — an inverse needs gcd(b, 12) = 1, and gcd(6, 12) = 6, however non-zero 6 looks', isCorrect: true },
      { text: 'Yes — every non-zero residue has one', isCorrect: false, misconceptionId: `${MODA}:MC-1` },
      { text: 'Yes — its inverse is 2, since 6 × 2 = 12', isCorrect: false, misconceptionId: `${MODA}:MC-1` },
    ],
    targetedMisconceptions: [`${MODA}:MC-1`],
    source: eb(MODA, 'Transfer probe — inverses need coprimality with the modulus'),
  },
]
