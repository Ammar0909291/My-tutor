/**
 * Twenty-first batch — number theory: finding primes, proving primes,
 * counting coprimes, and the equations that resist all of it.
 *
 *   PRIMES     sieve-of-eratosthenes, fundamental-theorem-arithmetic,
 *              primality-testing. Finding them, what they guarantee, and
 *              the gap between "probably prime" and "prime" — which the
 *              register flags as the most damaging error in the group,
 *              because a Fermat test passing proves nothing.
 *   COUNTING   eulers-totient, eulers-theorem. φ(n) and the theorem that
 *              needs it. Fermat's Little Theorem is the special case,
 *              and treating them as unrelated is the recorded error.
 *   SOLVING    extended-euclidean-algorithm. Where gcd stops being an
 *              answer and becomes a certificate: ax + by = gcd(a,b).
 *   RESISTING  general-diophantine, pells-equation. The two entries
 *              whose honest content is that no general method exists —
 *              Hilbert's tenth problem is a proof that none can.
 *
 * NOTE on misconception ids: general-diophantine and pells-equation list
 * their register entries WITHOUT MC-n numbers (as perimeter and length
 * did in batch 19). The :MC-n ids here refer to register ORDER, matching
 * the convention the rest of this corpus uses.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const SIEVE = 'math.nt.sieve-of-eratosthenes'
const FTA = 'math.nt.fundamental-theorem-arithmetic'
const PRIMT = 'math.nt.primality-testing'
const TOT = 'math.nt.eulers-totient'
const ETHM = 'math.nt.eulers-theorem'
const EEA = 'math.nt.extended-euclidean-algorithm'
const GDIO = 'math.nt.general-diophantine'
const PELL = 'math.nt.pells-equation'

export const MATHEMATICS_NUMBER_THEORY_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SIEVE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'The sieve finds every prime up to a limit by elimination rather than by testing. '
      + 'Write 2 to 100, keep 2, and cross out every LATER multiple of it — 4, 6, 8 and so '
      + 'on. The next uncrossed number is 3, which must be prime because nothing below it '
      + 'divided it. Repeat.\n\n'
      + 'The number you are working from is never crossed out. 2 is a multiple of 2, but it '
      + 'is the prime doing the crossing; the marks start at its square, since 4, 6 and 8 '
      + 'were reached from smaller primes already. Crossing out the prime itself empties the '
      + 'list of exactly what you were looking for.\n\n'
      + 'You may stop once the working prime exceeds √limit. Any composite up to 100 has a '
      + 'factor at or below 10, so after sieving by 2, 3, 5 and 7 everything still standing '
      + 'is prime — no further passes can remove anything. But surviving ONE pass is not '
      + 'enough: 9 survives the twos and falls to the threes, and only surviving every pass '
      + 'up to √limit certifies a number.',
    targetedMisconceptions: [`${SIEVE}:MC-1`, `${SIEVE}:MC-3`],
    source: eb(SIEVE, 'Identity + Misconception register — the prime is not crossed out; one pass is not enough'),
  },
  {
    conceptId: FTA, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Every integer above 1 factors into primes, and in exactly one way. 60 = 2² × 3 × 5, '
      + 'and no other multiset of primes multiplies to 60 however you go looking.\n\n'
      + 'That is TWO claims, and they are proved separately. Existence says a factorisation '
      + 'is always there — obvious once you keep splitting composite factors until none are '
      + 'left. Uniqueness says there is only one, and it is the harder half and the one that '
      + 'does the work: it is why gcd, lcm and modular arithmetic all behave, and it fails in '
      + 'other number systems, so it is not a triviality.\n\n'
      + '"Up to order" is the only freedom. 2 × 3 × 5 and 5 × 3 × 2 are the same '
      + 'factorisation written differently, not two answers. And the factors must all be '
      + 'PRIME: 60 = 4 × 15 and 60 = 6 × 10 are valid arithmetic and are not prime '
      + 'factorisations, because 4, 15, 6 and 10 all split further. This is also exactly why '
      + '1 is excluded from the primes — admitting it would allow 2 × 3 × 5 and 1 × 2 × 3 × 5 '
      + 'and destroy the uniqueness the theorem is named for.',
    targetedMisconceptions: [`${FTA}:MC-1`, `${FTA}:MC-2`],
    source: eb(FTA, 'Identity + Misconception register — two claims; "up to order" is the only freedom'),
  },
  {
    conceptId: PRIMT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Trial division settles primality outright — check every factor up to √n — and is '
      + 'hopeless for the hundreds-of-digits numbers cryptography uses. Everything else in '
      + 'this area is a trade between certainty and speed.\n\n'
      + 'A Fermat test checks whether a^(n−1) ≡ 1 (mod n), which every prime satisfies. '
      + 'PASSING PROVES NOTHING: composites can pass too, and the Carmichael numbers — 561 is '
      + 'the smallest — pass for EVERY base coprime to them. So no amount of base-testing '
      + 'closes the gap; the failure is structural rather than a matter of not having tried '
      + 'enough. Failing a test, by contrast, is conclusive: it proves compositeness outright '
      + 'without exhibiting a single factor.\n\n'
      + 'Miller-Rabin is the practical answer, and it is honest about what it gives. Each '
      + 'round leaves at most a 1/4 chance of a composite slipping through, so forty rounds '
      + 'make the error smaller than a hardware fault — overwhelming evidence, and still not '
      + 'a proof. AKS is deterministic and polynomial-time and settles the question '
      + 'absolutely, and is slower in practice, which is why "probably prime" is what '
      + 'production systems actually run on.',
    targetedMisconceptions: [`${PRIMT}:MC-1`, `${PRIMT}:MC-3`],
    source: eb(PRIMT, 'Identity + Misconception register — passing proves nothing; Carmichael numbers close the loophole'),
  },
  {
    conceptId: TOT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'φ(n) counts how many of 1 … n share no factor with n. φ(10) = 4, because 1, 3, 7 and '
      + '9 are coprime to 10 and the rest are not.\n\n'
      + 'Coprime is not the same as prime. 9 is composite and is coprime to 10, because '
      + '"coprime" is a relation between two numbers — they have no common factor — and not a '
      + 'property of one. Counting only the primes below n gives a different and wrong '
      + 'answer.\n\n'
      + 'For a prime p, φ(p) = p − 1: everything below p is coprime to it, and only p itself '
      + 'is excluded — so φ(7) = 6, not 7 and not 5. The general formula n∏(1 − 1/p) runs '
      + 'over the DISTINCT primes dividing n, each used once regardless of multiplicity: '
      + 'φ(12) with 12 = 2² × 3 is 12 × ½ × ⅔ = 4, using the 2 once. Repeating a factor for '
      + 'its exponent is the recorded error and halves the answer again for no reason.',
    targetedMisconceptions: [`${TOT}:MC-1`, `${TOT}:MC-2`],
    source: eb(TOT, 'Identity + Misconception register — coprime is a relation; distinct primes only'),
  },
  {
    conceptId: ETHM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Euler\'s theorem says that when a and n share no factor, a^φ(n) ≡ 1 (mod n). It is '
      + 'what makes huge exponents tractable: to find 7^1000 mod 12, note φ(12) = 4, so '
      + '7^4 ≡ 1 and 1000 is a multiple of 4, giving 1 immediately.\n\n'
      + 'Fermat\'s Little Theorem is the special case where n is PRIME. Then φ(p) = p − 1 and '
      + 'the statement becomes a^(p−1) ≡ 1 (mod p) — the same theorem with φ evaluated. '
      + 'Learning them as two unrelated results is the recorded error, and it means carrying '
      + 'two facts where one and a substitution would do.\n\n'
      + 'So Euler\'s version works for COMPOSITE moduli too, which is the whole reason it '
      + 'exists — and it is why RSA can work modulo a product of two primes. The coprimality '
      + 'condition is not decoration: with a and n sharing a factor the conclusion simply '
      + 'fails. The practical catch is that computing φ(n) needs n\'s factorisation, which for '
      + 'a large n is exactly the hard problem RSA\'s security rests on.',
    targetedMisconceptions: [`${ETHM}:MC-1`, `${ETHM}:MC-2`],
    source: eb(ETHM, 'Identity + Misconception register — Fermat is the prime case; φ(n) needs the factorisation'),
  },
  {
    conceptId: EEA, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The Euclidean algorithm finds gcd(a, b) by repeated remainders. The EXTENDED version '
      + 'keeps the working and reads it backwards to produce integers x and y with '
      + 'ax + by = gcd(a, b) — so it returns not just the gcd but a certificate of it.\n\n'
      + 'That is the point, and it is the difference the register records: running the '
      + 'algorithm and stopping at the gcd throws away exactly what was extra. For 30 and 18: '
      + '30 = 1×18 + 12, 18 = 1×12 + 6, 12 = 2×6 + 0, so gcd = 6 — and substituting back, '
      + '6 = 18 − 12 = 18 − (30 − 18) = 2×18 − 30, giving x = −1 and y = 2.\n\n'
      + 'The direction matters: you go FORWARD to get remainders and BACKWARD to build the '
      + 'combination, expressing each remainder in terms of the pair above it. The output is '
      + 'not unique — (x + b/g, y − a/g) works just as well, and infinitely many pairs '
      + 'satisfy the equation — so a different-looking answer is not automatically wrong; '
      + 'substitute and check. Its main use is modular inverses: ax ≡ 1 (mod n) is solvable '
      + 'exactly when gcd(a, n) = 1, and this algorithm produces the x.',
    targetedMisconceptions: [`${EEA}:MC-1`, `${EEA}:MC-3`],
    source: eb(EEA, 'Identity + Misconception register — a certificate, not just a gcd; the output is not unique'),
  },
  {
    conceptId: GDIO, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A Diophantine equation asks for INTEGER solutions. That restriction changes everything: '
      + 'x² + y² = z² has infinitely many integer solutions and x³ + y³ = z³ has none in '
      + 'positive integers, and nothing about their appearance predicts which.\n\n'
      + 'The linear case is completely solved — ax + by = c has integer solutions exactly '
      + 'when gcd(a, b) divides c, and the extended Euclidean algorithm finds them. None of '
      + 'that machinery survives past degree one. Raising the degree does not make the problem '
      + 'harder in the way a bigger arithmetic problem is harder; it changes the kind of '
      + 'question being asked.\n\n'
      + 'There is no general method, and this is a theorem rather than an admission. '
      + 'Hilbert\'s tenth problem asked for an algorithm deciding whether any given '
      + 'Diophantine equation has a solution, and Matiyasevich proved in 1970 that none can '
      + 'exist. So each family needs its own technique, and "no solutions found" is not the '
      + 'same claim as "proved to have none" — Fermat\'s Last Theorem sat in the first state '
      + 'for 358 years before Wiles moved it to the second.',
    targetedMisconceptions: [`${GDIO}:MC-1`, `${GDIO}:MC-3`],
    source: eb(GDIO, 'Identity + Misconception register — linear methods do not extend; Hilbert 10 proves no general method'),
  },
  {
    conceptId: PELL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Pell\'s equation is x² − Dy² = 1 in integers. For D = 2 the smallest non-trivial '
      + 'solution is x = 3, y = 2, since 9 − 8 = 1.\n\n'
      + 'It has infinitely many solutions whenever D is a positive non-square — and none '
      + 'beyond the trivial (±1, 0) when D IS a perfect square, because x² − k²y² factors as '
      + '(x − ky)(x + ky) and two integers multiplying to 1 leaves almost nothing. So the '
      + 'condition on D is not a technical footnote; it decides whether the equation has '
      + 'anything to say.\n\n'
      + 'The fundamental solution is the smallest, and it generates ALL the others: from '
      + '(x₁, y₁), the next comes from (x₁ + y₁√D)² and so on forever. Treating the first '
      + 'solution as the only one misses an infinite family. And inspection is not a method — '
      + 'for D = 61 the fundamental solution has x = 1 766 319 049, which no amount of trying '
      + 'small numbers will reach. Continued fractions produce it systematically, which is '
      + 'what makes this a solved problem rather than a lucky one.',
    targetedMisconceptions: [`${PELL}:MC-1`, `${PELL}:MC-2`],
    source: eb(PELL, 'Identity + Misconception register — D must be a non-square; the fundamental solution generates all'),
  },
]

export const MATHEMATICS_NUMBER_THEORY_PROBES: SeedProbe[] = [
  // --- math.nt.sieve-of-eratosthenes ---------------------------------------------------
  {
    conceptId: SIEVE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Sieving by 2, do you cross out 2 itself?',
    choices: [
      { text: 'No — 2 is the prime doing the crossing; the marks start at its square', isCorrect: true },
      { text: 'Yes — 2 is a multiple of 2', isCorrect: false, misconceptionId: `${SIEVE}:MC-1` },
      { text: 'Yes, then write it back in at the end', isCorrect: false, misconceptionId: `${SIEVE}:MC-1` },
    ],
    targetedMisconceptions: [`${SIEVE}:MC-1`],
    source: eb(SIEVE, 'Assessment gate — the working prime survives'),
  },
  {
    conceptId: SIEVE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: '9 survives the crossing-out of multiples of 2. Is it prime?',
    choices: [
      { text: 'No — surviving one pass proves nothing; 9 falls to the threes', isCorrect: true },
      { text: 'Yes — it was not crossed out', isCorrect: false, misconceptionId: `${SIEVE}:MC-3` },
      { text: 'Yes, since it is odd', isCorrect: false, misconceptionId: `${SIEVE}:MC-3` },
    ],
    targetedMisconceptions: [`${SIEVE}:MC-3`],
    source: eb(SIEVE, 'Misconception register — one round is not certification'),
  },
  {
    conceptId: SIEVE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Sieving up to 100, when can you stop?',
    choices: [
      { text: 'After 7 — every composite under 100 has a factor at or below 10, so nothing later can remove anything', isCorrect: true },
      { text: 'Only after sieving by every prime under 100', isCorrect: false, misconceptionId: `${SIEVE}:MC-2` },
      { text: 'After 50, half the limit', isCorrect: false, misconceptionId: `${SIEVE}:MC-2` },
    ],
    targetedMisconceptions: [`${SIEVE}:MC-2`],
    source: eb(SIEVE, 'Transfer probe — √limit is the stopping point'),
  },

  // --- math.nt.fundamental-theorem-arithmetic ---------------------------------------------
  {
    conceptId: FTA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Are 2 × 3 × 5 and 5 × 3 × 2 two different factorisations of 30?',
    choices: [
      { text: 'No — the same factorisation written differently; uniqueness is "up to order"', isCorrect: true },
      { text: 'Yes — the order makes them different', isCorrect: false, misconceptionId: `${FTA}:MC-1` },
      { text: 'Yes, which is why uniqueness fails', isCorrect: false, misconceptionId: `${FTA}:MC-1` },
    ],
    targetedMisconceptions: [`${FTA}:MC-1`],
    source: eb(FTA, 'Assessment gate — order is the only freedom'),
  },
  {
    conceptId: FTA, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is 60 = 4 × 15 a prime factorisation?',
    choices: [
      { text: 'No — 4 and 15 are not prime; the prime factorisation is 2² × 3 × 5', isCorrect: true },
      { text: 'Yes — it is a valid product giving 60', isCorrect: false, misconceptionId: `${FTA}:MC-3` },
      { text: 'Yes, and it shows the factorisation is not unique', isCorrect: false, misconceptionId: `${FTA}:MC-3` },
    ],
    targetedMisconceptions: [`${FTA}:MC-3`],
    source: eb(FTA, 'Misconception register — the factors must all be prime'),
  },
  {
    conceptId: FTA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How many claims does the Fundamental Theorem of Arithmetic make?',
    choices: [
      { text: 'Two — existence and uniqueness, proved separately, with uniqueness the harder half', isCorrect: true },
      { text: 'One — that every number factors into primes', isCorrect: false, misconceptionId: `${FTA}:MC-2` },
      { text: 'One — that the factorisation is unique', isCorrect: false, misconceptionId: `${FTA}:MC-2` },
    ],
    targetedMisconceptions: [`${FTA}:MC-2`],
    source: eb(FTA, 'Transfer probe — existence and uniqueness are separate'),
  },

  // --- math.nt.primality-testing -------------------------------------------------------------
  {
    conceptId: PRIMT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'n passes a Fermat test. What has been established?',
    choices: [
      { text: 'Nothing conclusive — composites pass too; only FAILING is decisive', isCorrect: true },
      { text: 'That n is prime', isCorrect: false, misconceptionId: `${PRIMT}:MC-1` },
      { text: 'That n is prime, provided the base was chosen at random', isCorrect: false, misconceptionId: `${PRIMT}:MC-1` },
    ],
    targetedMisconceptions: [`${PRIMT}:MC-1`],
    source: eb(PRIMT, 'Assessment gate — passing proves nothing'),
  },
  {
    conceptId: PRIMT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Could testing enough bases catch every composite?',
    choices: [
      { text: 'No — Carmichael numbers such as 561 pass for EVERY coprime base; the failure is structural', isCorrect: true },
      { text: 'Yes — with enough bases the loophole closes', isCorrect: false, misconceptionId: `${PRIMT}:MC-2` },
      { text: 'Yes, provided you test all bases below √n', isCorrect: false, misconceptionId: `${PRIMT}:MC-2` },
    ],
    targetedMisconceptions: [`${PRIMT}:MC-2`],
    source: eb(PRIMT, 'Misconception register — Carmichael numbers defeat exhaustive base testing'),
  },
  {
    conceptId: PRIMT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How do Miller-Rabin and AKS differ in what they deliver?',
    choices: [
      { text: 'Miller-Rabin gives overwhelming evidence and not proof; AKS is deterministic and settles it absolutely', isCorrect: true },
      { text: 'They are equivalent — both prove primality', isCorrect: false, misconceptionId: `${PRIMT}:MC-3` },
      { text: 'Miller-Rabin proves it and AKS only estimates', isCorrect: false, misconceptionId: `${PRIMT}:MC-3` },
    ],
    targetedMisconceptions: [`${PRIMT}:MC-3`],
    source: eb(PRIMT, 'Transfer probe — probabilistic is not deterministic'),
  },

  // --- math.nt.eulers-totient ------------------------------------------------------------------
  {
    conceptId: TOT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is φ(10)?',
    choices: [
      { text: '4 — the coprimes are 1, 3, 7, 9', isCorrect: true },
      { text: '2 — only the primes 3 and 7 count', isCorrect: false, misconceptionId: `${TOT}:MC-2` },
      { text: '10', isCorrect: false },
    ],
    targetedMisconceptions: [`${TOT}:MC-2`],
    source: eb(TOT, 'Assessment gate — count coprimes, not primes'),
  },
  {
    conceptId: TOT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: '12 = 2² × 3. Which primes go into the totient formula, and how many times?',
    choices: [
      { text: 'The DISTINCT primes 2 and 3, once each — 12 × ½ × ⅔ = 4', isCorrect: true },
      { text: '2 twice and 3 once, matching the multiplicity', isCorrect: false, misconceptionId: `${TOT}:MC-1` },
      { text: 'Only 3, since 2 is repeated', isCorrect: false, misconceptionId: `${TOT}:MC-1` },
    ],
    targetedMisconceptions: [`${TOT}:MC-1`],
    source: eb(TOT, 'Misconception register — distinct primes, regardless of multiplicity'),
  },
  {
    conceptId: TOT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What is φ(7)?',
    choices: [
      { text: '6 — for a prime p, everything below p is coprime to it', isCorrect: true },
      { text: '7 — a prime is coprime to everything', isCorrect: false, misconceptionId: `${TOT}:MC-3` },
      { text: '5 — exclude both 1 and 7', isCorrect: false, misconceptionId: `${TOT}:MC-3` },
    ],
    targetedMisconceptions: [`${TOT}:MC-3`],
    source: eb(TOT, 'Transfer probe — φ(p) = p − 1'),
  },

  // --- math.nt.eulers-theorem --------------------------------------------------------------------
  {
    conceptId: ETHM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does Euler\'s theorem require of a and n?',
    choices: [
      { text: 'That they are coprime — then a^φ(n) ≡ 1 (mod n)', isCorrect: true },
      { text: 'That n is prime', isCorrect: false, misconceptionId: `${ETHM}:MC-2` },
      { text: 'That a is prime', isCorrect: false, misconceptionId: `${ETHM}:MC-2` },
    ],
    targetedMisconceptions: [`${ETHM}:MC-2`],
    source: eb(ETHM, 'Assessment gate — coprimality, not primality'),
  },
  {
    conceptId: ETHM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'How does Fermat\'s Little Theorem relate to Euler\'s?',
    choices: [
      { text: 'It is the special case where n is prime — then φ(p) = p − 1 and you get a^(p−1) ≡ 1', isCorrect: true },
      { text: 'They are unrelated results that happen to look similar', isCorrect: false, misconceptionId: `${ETHM}:MC-1` },
      { text: 'Euler\'s is the special case of Fermat\'s', isCorrect: false, misconceptionId: `${ETHM}:MC-1` },
    ],
    targetedMisconceptions: [`${ETHM}:MC-1`],
    source: eb(ETHM, 'Misconception register — Fermat is Euler with φ evaluated'),
  },
  {
    conceptId: ETHM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why is φ(n) hard to use for a large RSA modulus?',
    choices: [
      { text: 'Computing it needs n\'s factorisation — which is exactly the problem RSA\'s security rests on', isCorrect: true },
      { text: 'φ is always easy; the difficulty is elsewhere', isCorrect: false, misconceptionId: `${ETHM}:MC-3` },
      { text: 'φ is undefined for products of two primes', isCorrect: false, misconceptionId: `${ETHM}:MC-3` },
    ],
    targetedMisconceptions: [`${ETHM}:MC-3`],
    source: eb(ETHM, 'Transfer probe — φ(n) is not always cheap'),
  },

  // --- math.nt.extended-euclidean-algorithm ---------------------------------------------------------
  {
    conceptId: EEA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does the EXTENDED Euclidean algorithm give beyond the gcd?',
    choices: [
      { text: 'Integers x and y with ax + by = gcd(a, b) — a certificate of the gcd', isCorrect: true },
      { text: 'Nothing extra; it is a faster route to the same gcd', isCorrect: false, misconceptionId: `${EEA}:MC-3` },
      { text: 'The prime factorisations of a and b', isCorrect: false, misconceptionId: `${EEA}:MC-3` },
    ],
    targetedMisconceptions: [`${EEA}:MC-3`],
    source: eb(EEA, 'Assessment gate — the certificate is the point'),
  },
  {
    conceptId: EEA, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Your x and y differ from the textbook\'s. Is one of you wrong?',
    choices: [
      { text: 'Not necessarily — infinitely many pairs satisfy it; substitute and check', isCorrect: true },
      { text: 'Yes — the output is unique, so one is an error', isCorrect: false, misconceptionId: `${EEA}:MC-1` },
      { text: 'Yes — only the smallest pair counts', isCorrect: false, misconceptionId: `${EEA}:MC-1` },
    ],
    targetedMisconceptions: [`${EEA}:MC-1`],
    source: eb(EEA, 'Misconception register — the output is not unique'),
  },
  {
    conceptId: EEA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For a = 30 and b = 18, gcd is 6. Which pair works in 30x + 18y = 6?',
    choices: [
      { text: 'x = −1, y = 2 — since 2×18 − 30 = 6', isCorrect: true },
      { text: 'x = 1, y = −2', isCorrect: false, misconceptionId: `${EEA}:MC-2` },
      { text: 'x = 2, y = −1', isCorrect: false, misconceptionId: `${EEA}:MC-2` },
    ],
    targetedMisconceptions: [`${EEA}:MC-2`],
    source: eb(EEA, 'Transfer probe — back-substitution produces the pair'),
  },

  // --- math.nt.general-diophantine -------------------------------------------------------------------
  {
    conceptId: GDIO, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What makes an equation Diophantine?',
    choices: [
      { text: 'Only INTEGER solutions are sought', isCorrect: true },
      { text: 'It has more than one unknown', isCorrect: false },
      { text: 'It has degree greater than one', isCorrect: false },
    ],
    targetedMisconceptions: [`${GDIO}:MC-1`],
    source: eb(GDIO, 'Assessment gate — the integer restriction is the definition'),
  },
  {
    conceptId: GDIO, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'x² + y² = z² has infinitely many integer solutions. What about x³ + y³ = z³?',
    choices: [
      { text: 'None in positive integers — similar-looking equations can behave completely differently', isCorrect: true },
      { text: 'Also infinitely many, by the same method', isCorrect: false, misconceptionId: `${GDIO}:MC-2` },
      { text: 'The same number, since the equations have the same form', isCorrect: false, misconceptionId: `${GDIO}:MC-2` },
    ],
    targetedMisconceptions: [`${GDIO}:MC-2`],
    source: eb(GDIO, 'Misconception register — solvability is not uniform across similar equations'),
  },
  {
    conceptId: GDIO, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is there a general algorithm deciding whether any Diophantine equation has a solution?',
    choices: [
      { text: 'No — Matiyasevich proved in 1970 that none can exist (Hilbert\'s tenth problem)', isCorrect: true },
      { text: 'Yes — the extended Euclidean algorithm generalises to any degree', isCorrect: false, misconceptionId: `${GDIO}:MC-1` },
      { text: 'Not yet, but one is expected', isCorrect: false, misconceptionId: `${GDIO}:MC-3` },
    ],
    targetedMisconceptions: [`${GDIO}:MC-1`, `${GDIO}:MC-3`],
    source: eb(GDIO, 'Transfer probe — no general method, and that is a theorem'),
  },

  // --- math.nt.pells-equation -----------------------------------------------------------------------------
  {
    conceptId: PELL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For x² − 2y² = 1, check x = 3, y = 2.',
    choices: [
      { text: 'It works — 9 − 8 = 1', isCorrect: true },
      { text: 'It fails — 9 − 8 = 0', isCorrect: false },
      { text: 'It works, and it is the only solution', isCorrect: false, misconceptionId: `${PELL}:MC-2` },
    ],
    targetedMisconceptions: [`${PELL}:MC-2`],
    source: eb(PELL, 'Assessment gate — verifying a Pell solution'),
  },
  {
    conceptId: PELL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does x² − Dy² = 1 have infinitely many solutions for every positive D?',
    choices: [
      { text: 'No — D must be a NON-SQUARE; if D = k² the left side factors and almost nothing survives', isCorrect: true },
      { text: 'Yes, for every positive integer D', isCorrect: false, misconceptionId: `${PELL}:MC-1` },
      { text: 'Yes, provided D is prime', isCorrect: false, misconceptionId: `${PELL}:MC-1` },
    ],
    targetedMisconceptions: [`${PELL}:MC-1`],
    source: eb(PELL, 'Misconception register — a square D kills the equation'),
  },
  {
    conceptId: PELL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For D = 61 the fundamental solution has x = 1 766 319 049. What does that show?',
    choices: [
      { text: 'Inspection is not a method — continued fractions produce it systematically', isCorrect: true },
      { text: 'That D = 61 is exceptional and usually inspection works', isCorrect: false, misconceptionId: `${PELL}:MC-3` },
      { text: 'That the equation has no small solutions and therefore none at all', isCorrect: false, misconceptionId: `${PELL}:MC-3` },
    ],
    targetedMisconceptions: [`${PELL}:MC-3`],
    source: eb(PELL, 'Transfer probe — why a systematic method is needed'),
  },
]
