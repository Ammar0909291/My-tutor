/**
 * MATHEMATICS — probe DEPTH, batch 2: math.nt (36 (concept, band) pairs, 72 probes).
 *
 * Why depth, and the identity rule every probe here obeys, are stated once in
 * mathematicsDepthArithAssets.ts (batch 1). In short: five gradeable probes per
 * pair so a learner recovers from one or two mistakes on questions they have
 * not seen; every probe extends the pair's existing ladder slot at an unused
 * difficulty rung, so no seeded probe is re-identified.
 *
 * Every number below was checked by hand: the CRT residue (31 mod 35), the
 * Euclidean traces (gcd(252, 105) = gcd(1071, 462) = 21), the Euler and Fermat
 * reductions (3²⁰²⁶ ≡ 9 mod 10, 5¹⁰³ ≡ 5 mod 7, with 3 as the reduce-mod-p
 * distractor), the totients (φ(12) = 4, φ(15) = 8), the RSA exponent
 * (3 × 27 = 81 ≡ 1 mod 40) and the Pell step ((3 + 2√2)² = 17 + 12√2).
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const { MIDDLE, HIGH, UNDERGRADUATE: UG } = GradeBand
const { FOUNDATIONAL: F, DEVELOPING: D, PROFICIENT: P, ADVANCED: A } = ProbeDifficulty
type Kind = 'mcq' | 'misconception_probe'

function q(
  conceptId: string, gradeBand: GradeBand, probeKind: Kind, difficulty: ProbeDifficulty,
  stem: string, correct: string, wrong: string[], what: string,
): SeedProbe {
  return {
    conceptId, subjectSlug: S, probeKind, gradeBand, difficulty, stem,
    choices: [{ text: correct, isCorrect: true }, ...wrong.map((text) => ({ text, isCorrect: false }))],
    correctValue: correct,
    targetedMisconceptions: [],
    source: `educational-brain/concepts/mathematics/${conceptId}.md — probe-depth set 2026-10-02: ${what}`,
  }
}

export const MATHEMATICS_DEPTH_NUMBER_THEORY_PROBES: SeedProbe[] = [
  q('math.nt.algebraic-integers', UG, 'mcq', D, 'Which of these is an algebraic integer?', '√2', ['1/2', '√2/3', '3/4'], 'root of the monic x² − 2; √2/3 needs 9x² − 2, which is not monic'),
  q('math.nt.algebraic-integers', UG, 'mcq', A, 'Is (1 + √5)/2 an algebraic integer?', 'Yes, it is a root of x² − x − 1', ['No, it has a denominator', 'No, because it is irrational', 'Only if √5 is an integer'], 'a visible denominator does not decide it; the minimal polynomial does'),

  q('math.nt.algebraic-number-theory', UG, 'mcq', D, 'What is the ring of integers of ℚ(√5)?', 'ℤ[(1 + √5)/2]', ['ℤ[√5]', 'ℚ[√5]', 'ℤ'], '5 ≡ 1 (mod 4), so the ring is larger than ℤ[√5]'),
  q('math.nt.algebraic-number-theory', UG, 'mcq', A, 'The class number of ℚ(√−5) is 2. What does that tell you?', 'Unique factorisation of elements fails, and the square of every ideal is principal', ['There are exactly two ideals', 'Every element has exactly two factorisations', 'Unique factorisation of elements holds'], 'the class group measures the failure of factorisation, not the number of ideals'),

  q('math.nt.analytic-number-theory', UG, 'mcq', D, 'Why does ζ(s) → ∞ as s → 1⁺ show that there are infinitely many primes?', 'With finitely many primes the Euler product would be a finite product and stay bounded', ['Because ζ(1) = 0', 'Because every term 1/n is a prime', 'Because the Riemann Hypothesis says so'], 'the Euler product links the pole at s = 1 to the primes'),
  q('math.nt.analytic-number-theory', UG, 'mcq', A, 'Which statement about the Prime Number Theorem and the Riemann Hypothesis is correct?', 'PNT is proved without RH; RH would sharpen its error term', ['PNT is proved only by assuming RH', 'RH is proved, so PNT follows', 'They are the same statement'], 'PNT needs only no zeros on Re(s) = 1'),

  q('math.nt.bezout-identity', HIGH, 'mcq', D, 'gcd(14, 10) = 2. Which line is a Bézout identity for 14 and 10?', '14 × (−2) + 10 × 3 = 2', ['14 × 1 + 10 × (−1) = 4', '14 × 1 + 10 × 1 = 24', '14 × 5 + 10 × (−7) = 0'], 'the combination must equal the gcd'),
  q('math.nt.bezout-identity', HIGH, 'mcq', A, 'Can 15x + 25y = 7 be solved in whole numbers?', 'No, 7 is not a multiple of gcd(15, 25) = 5', ['Yes, Bézout guarantees every integer', 'Yes, because 15 and 25 are positive', 'Only if x and y may be negative'], 'integer combinations of 15 and 25 are exactly the multiples of 5'),

  q('math.nt.chinese-remainder-theorem', UG, 'mcq', D, 'Find x mod 35 with x ≡ 1 (mod 5) and x ≡ 3 (mod 7).', '31', ['16', '8', '3'], '31 = 6 × 5 + 1 = 4 × 7 + 3'),
  q('math.nt.chinese-remainder-theorem', UG, 'mcq', A, 'How many solutions mod 30 does the system x ≡ 1 (mod 2), x ≡ 2 (mod 3), x ≡ 3 (mod 5) have?', 'Exactly one', ['None', 'Three', 'Thirty'], 'pairwise coprime moduli give a unique residue mod their product'),

  q('math.nt.composite-number', MIDDLE, 'mcq', D, 'Which of these numbers is composite?', '91', ['89', '97', '1'], '91 = 7 × 13; 1 is neither prime nor composite'),
  q('math.nt.composite-number', MIDDLE, 'mcq', A, 'How many composite numbers lie strictly between 20 and 30?', '7', ['5', '9', '8'], '21, 22, 24, 25, 26, 27, 28 — 23 and 29 are prime'),

  q('math.nt.congruence', HIGH, 'mcq', D, 'Which number is congruent to 3 modulo 8?', '27', ['24', '38', '30'], '27 = 3 × 8 + 3'),
  q('math.nt.congruence', HIGH, 'mcq', A, 'If a ≡ 4 (mod 9) and b ≡ 7 (mod 9), what is a × b mod 9?', '1', ['28', '11', '2'], 'congruences multiply: 28 ≡ 1'),

  q('math.nt.continued-fractions', HIGH, 'mcq', D, 'What is the continued fraction of 43/19?', '[2; 3, 1, 4]', ['[2; 4, 3, 1]', '[2; 3, 4]', '[43; 19]'], 'the Euclidean algorithm on 43 and 19 gives quotients 2, 3, 1, 4'),
  q('math.nt.continued-fractions', HIGH, 'mcq', A, 'Which numbers have a continued fraction that eventually repeats?', 'Quadratic irrationals such as √3', ['Every irrational number', 'Only rational numbers', 'Only π and e'], "Lagrange's theorem; rationals terminate instead"),

  q('math.nt.divisibility-rules', MIDDLE, 'mcq', D, 'Is 5316 divisible by 4?', 'Yes', ['No, because the last digit 6 is not a multiple of 4', 'Only if the digit sum is a multiple of 4', 'No, because 5316 is not a multiple of 8'], 'the rule for 4 uses the last two digits: 16'),
  q('math.nt.divisibility-rules', MIDDLE, 'mcq', A, 'Is 7425 divisible by 9?', 'Yes', ['No, because it is odd', 'No, because it does not end in 9', 'Only by 3, not by 9'], 'digit sum 18 is a multiple of 9'),

  q('math.nt.divisibility', MIDDLE, 'mcq', D, 'Which of these statements is true?', '7 | 63', ['63 | 7', '7 | 60', '0 | 7'], 'a | b means b is a multiple of a'),
  q('math.nt.divisibility', MIDDLE, 'mcq', A, 'If 4 | a and 4 | b, which of these must also be true?', '4 | (a + b)', ['4 | (a + 1)', 'a | b', '8 | (a + b)'], 'a common divisor divides any sum'),

  q('math.nt.division-algorithm', HIGH, 'mcq', D, 'Apply the division algorithm to a = 47 and b = 6. What are q and r?', 'q = 7, r = 5', ['q = 8, r = −1', 'q = 7.83, r = 0', 'q = 6, r = 11'], '47 = 6 × 7 + 5 with 0 ≤ r < 6'),
  q('math.nt.division-algorithm', HIGH, 'mcq', A, 'For a = −23 and b = 4, what are q and r with 0 ≤ r < 4?', 'q = −6, r = 1', ['q = −5, r = −3', 'q = −6, r = −1', 'q = 5, r = 3'], 'the remainder must not be negative'),

  q('math.nt.euclidean-algorithm', HIGH, 'mcq', D, 'Use the Euclidean algorithm to find gcd(252, 105).', '21', ['42', '7', '3'], '252 = 2 × 105 + 42, 105 = 2 × 42 + 21, 42 = 2 × 21'),
  q('math.nt.euclidean-algorithm', HIGH, 'mcq', A, 'Use the Euclidean algorithm to find gcd(1071, 462).', '21', ['147', '7', '42'], '1071 = 2 × 462 + 147, 462 = 3 × 147 + 21, 147 = 7 × 21'),

  q('math.nt.eulers-theorem', UG, 'mcq', D, 'φ(25) = 20 and gcd(7, 25) = 1. What is 7²⁰ mod 25?', '1', ['0', '7', '24'], "Euler's theorem directly"),
  q('math.nt.eulers-theorem', UG, 'mcq', A, 'What is 3²⁰²⁶ mod 10?', '9', ['1', '3', '7'], 'φ(10) = 4 and 2026 ≡ 2 (mod 4), so 3² = 9'),

  q('math.nt.eulers-totient', UG, 'mcq', D, 'What is φ(12)?', '4', ['6', '11', '2'], 'only distinct primes 2 and 3: 12 × ½ × ⅔; 2 counts the 2 twice'),
  q('math.nt.eulers-totient', UG, 'mcq', A, 'What is φ(15)?', '8', ['14', '7', '6'], 'φ(3) × φ(5) = 2 × 4'),

  q('math.nt.extended-euclidean-algorithm', HIGH, 'mcq', D, 'gcd(17, 5) = 1. Which pair satisfies 17x + 5y = 1?', 'x = −2, y = 7', ['x = 2, y = −7', 'x = 1, y = −3', 'x = 1, y = −4'], '−34 + 35 = 1; the sign-flipped pair gives −1'),
  q('math.nt.extended-euclidean-algorithm', HIGH, 'mcq', A, 'From 17 × (−2) + 5 × 7 = 1, what is the inverse of 5 modulo 17?', '7', ['−2', '15', '12'], '5 × 7 = 35 ≡ 1 (mod 17); the coefficient of 5 is the inverse'),

  q('math.nt.fermats-little-theorem', HIGH, 'mcq', D, 'What is 2¹⁰ mod 11?', '1', ['2', '10', '0'], 'Fermat with p = 11'),
  q('math.nt.fermats-little-theorem', HIGH, 'mcq', A, 'What is 5¹⁰³ mod 7?', '5', ['1', '6', '3'], 'reduce the exponent mod 6: 103 ≡ 1; reducing mod 7 instead gives 3'),

  q('math.nt.fundamental-theorem-arithmetic', HIGH, 'mcq', D, 'What is the prime factorisation of 360?', '2³ × 3² × 5', ['2³ × 45', '6² × 10', '2² × 3² × 10'], 'every factor must be prime'),
  q('math.nt.fundamental-theorem-arithmetic', HIGH, 'mcq', A, 'Why can 2ᵃ × 3ᵇ never equal 5ᶜ for positive whole numbers a, b and c?', 'Prime factorisation is unique, and 5 does not appear on the left', ['Because 5 is odd', 'Because 2 + 3 = 5', 'It can, for the right exponents'], 'uniqueness forbids two different prime factorisations of one number'),

  q('math.nt.gcd', MIDDLE, 'mcq', D, 'What is gcd(36, 60)?', '12', ['6', '180', '4'], 'common primes at their lower powers: 2² × 3'),
  q('math.nt.gcd', MIDDLE, 'mcq', A, 'Ribbons of 48 cm and 72 cm are cut into equal pieces, as long as possible, with nothing left over. How long is each piece?', '24 cm', ['12 cm', '144 cm', '6 cm'], 'the longest common length is the gcd'),

  q('math.nt.general-diophantine', UG, 'mcq', D, 'Does x² − y² = 2 have a solution in integers?', 'No', ['Yes, x = 2 and y = 1', 'Yes, infinitely many', 'Only if x and y are negative'], 'x² − y² is never 2 mod 4'),
  q('math.nt.general-diophantine', UG, 'mcq', A, 'Which is the fastest way to show x² + y² = 3 has no integer solutions?', 'Work modulo 4', ['Try every x and y up to 1000', 'Run the Euclidean algorithm', "Use Bézout's identity"], 'a sum of two squares is 0, 1 or 2 mod 4'),

  q('math.nt.induction-applications', HIGH, 'mcq', D, 'Proving 6 | (n³ − n) by induction, which fact completes the inductive step?', '(n+1)³ − (n+1) = (n³ − n) + 3n(n + 1), and n(n + 1) is even', ['n³ − n is always odd', '(n+1)³ = n³ + 1', '6 divides every whole number n'], 'the hypothesis covers n³ − n; 3n(n + 1) is a multiple of 6'),
  q('math.nt.induction-applications', HIGH, 'mcq', A, 'Proving 3 | (4ⁿ − 1) by induction, which rewriting of 4ⁿ⁺¹ − 1 uses the hypothesis?', '4(4ⁿ − 1) + 3', ['4ⁿ⁺¹ − 4', '(4 − 1)ⁿ⁺¹', '4ⁿ + 3'], 'expose the inductive case inside the next one'),

  q('math.nt.lcm', MIDDLE, 'mcq', D, 'What is lcm(8, 12)?', '24', ['96', '4', '48'], 'common multiple, not the product and not the gcd'),
  q('math.nt.lcm', MIDDLE, 'mcq', A, 'One bus leaves every 15 minutes and another every 20 minutes. Both leave at 9:00. When do they next leave together?', '10:00', ['9:35', '12:00', '9:05'], 'lcm(15, 20) = 60 minutes'),

  q('math.nt.linear-diophantine', HIGH, 'mcq', D, 'Is 4x + 6y = 9 solvable in integers?', 'No', ['Yes, x = 0 and y = 1.5', 'Yes, every linear equation has integer solutions', 'Yes, x = 3 and y = −1/2'], 'gcd(4, 6) = 2 does not divide 9'),
  q('math.nt.linear-diophantine', HIGH, 'mcq', A, 'One solution of 3x + 5y = 1 is x = 2, y = −1. Which is another?', 'x = 7, y = −4', ['x = 3, y = −2', 'x = 5, y = −3', 'x = 2, y = 1'], 'general solution x = 2 + 5t, y = −1 − 3t'),

  q('math.nt.modular-arithmetic', HIGH, 'mcq', D, 'What is 7 × 8 mod 10?', '6', ['56', '5', '15'], '56 leaves remainder 6'),
  q('math.nt.modular-arithmetic', HIGH, 'mcq', A, 'Write −17 mod 5 as a residue from 0 to 4.', '3', ['−2', '2', '17'], '−17 = −4 × 5 + 3'),

  q('math.nt.modular-inverse', HIGH, 'mcq', D, 'What is the inverse of 4 modulo 9?', '7', ['5', '2', '4 has no inverse mod 9'], '4 × 7 = 28 ≡ 1 (mod 9)'),
  q('math.nt.modular-inverse', HIGH, 'mcq', A, 'Solve 3x ≡ 5 (mod 7).', 'x ≡ 4', ['x ≡ 5/3', 'x ≡ 2', 'There is no solution'], 'multiply by the inverse 5: x ≡ 25 ≡ 4'),

  q('math.nt.number-fields', UG, 'mcq', D, 'What is the degree of ℚ(√2, √3) over ℚ?', '4', ['2', '6', '3'], 'two independent quadratic extensions'),
  q('math.nt.number-fields', UG, 'mcq', A, 'In ℤ[i], how does the prime 13 behave?', 'It splits: 13 = (3 + 2i)(3 − 2i)', ['It stays prime', 'It ramifies, like 2', 'It becomes a unit'], '13 ≡ 1 (mod 4) is a sum of two squares'),

  q('math.nt.pells-equation', UG, 'mcq', D, 'Which is the fundamental solution of x² − 3y² = 1?', 'x = 2, y = 1', ['x = 7, y = 4', 'x = 1, y = 0', 'x = 4, y = 2'], 'the smallest non-trivial solution; (7, 4) is its square'),
  q('math.nt.pells-equation', UG, 'mcq', A, 'Squaring 3 + 2√2 gives the next solution of x² − 2y² = 1. What is it?', 'x = 17, y = 12', ['x = 9, y = 4', 'x = 6, y = 4', 'x = 13, y = 12'], '(3 + 2√2)² = 17 + 12√2, and 289 − 288 = 1'),

  q('math.nt.primality-testing', UG, 'mcq', D, '561 passes the Fermat test for every base coprime to it. Is 561 prime?', 'No, 561 = 3 × 11 × 17', ['Yes', 'Yes, because every coprime base passes', 'It cannot be decided'], 'a Carmichael number'),
  q('math.nt.primality-testing', UG, 'mcq', A, 'Miller–Rabin with k independent random bases reports "probably prime". What bounds the chance that a composite fooled it?', 'At most 4⁻ᵏ', ['Exactly zero', 'At most 1/2', 'At most 1/k'], 'each base catches a composite with probability at least 3/4'),

  q('math.nt.prime-distribution', UG, 'mcq', D, 'By the density 1/ln x, roughly what fraction of numbers near 10¹⁰⁰ are prime?', 'About 1 in 230', ['About 1 in 100', 'About half', 'None of them'], 'ln(10¹⁰⁰) = 100 ln 10 ≈ 230'),
  q('math.nt.prime-distribution', UG, 'mcq', A, 'Is there a gap between consecutive primes longer than 1 000 000?', 'Yes: n! + 2, n! + 3, …, n! + n are all composite', ['No, primes never get that far apart', 'Only if the Riemann Hypothesis fails', 'Nobody knows'], 'arbitrarily long runs of composites exist, yet primes never run out'),

  q('math.nt.prime-factorization', MIDDLE, 'mcq', D, 'What is the prime factorisation of 84?', '2² × 3 × 7', ['4 × 21', '2 × 42', '2 × 3 × 14'], 'keep splitting until every factor is prime'),
  q('math.nt.prime-factorization', MIDDLE, 'mcq', A, "A number's prime factorisation is 2³ × 5. Which number is it?", '40', ['30', '13', '16'], '8 × 5'),

  q('math.nt.prime-number-theorem', UG, 'mcq', D, 'Who proved the Prime Number Theorem, and when?', 'Hadamard and de la Vallée Poussin, independently, in 1896', ['Riemann, in 1859', 'Gauss, in 1792', 'Euler, in 1737'], 'Gauss conjectured it; Riemann supplied the method'),
  q('math.nt.prime-number-theorem', UG, 'mcq', A, 'Which of these follows from the Prime Number Theorem?', 'The nth prime is roughly n ln n', ['Primes eventually stop', 'Every even number above 2 is a sum of two primes', 'There is a prime between n² and (n + 1)²'], 'the other two are open conjectures'),

  q('math.nt.prime-number', MIDDLE, 'misconception_probe', F, 'Which of these numbers is prime?', '13', ['15', '21', '27'], 'odd does not mean prime'),
  q('math.nt.prime-number', MIDDLE, 'misconception_probe', P, 'A number ends in 7. Must it be prime?', 'No, 27 is not prime', ['Yes, numbers ending in 7 are prime', 'Yes, because 7 is prime', 'Only if it is odd'], 'the last digit alone cannot decide primality'),

  q('math.nt.pythagorean-triples', MIDDLE, 'mcq', D, 'Which of these is a Pythagorean triple?', '8, 15, 17', ['5, 12, 14', '7, 24, 26', '9, 12, 14'], '64 + 225 = 289 = 17²'),
  q('math.nt.pythagorean-triples', MIDDLE, 'mcq', A, 'Using m = 3 and n = 2 in a = m² − n², b = 2mn, c = m² + n², which triple do you get?', '5, 12, 13', ['1, 6, 13', '5, 6, 13', '9, 12, 15'], "Euclid's formula"),

  q('math.nt.residue-classes', HIGH, 'mcq', D, 'Modulo 6, what is [4] × [5]?', '[2]', ['[20]', '[9]', '[3]'], '20 ≡ 2 (mod 6); a class is named by its smallest representative'),
  q('math.nt.residue-classes', HIGH, 'mcq', A, 'In ℤ/7ℤ, which element has no multiplicative inverse?', '[0]', ['[3]', '[6]', '[1]'], '7 is prime, so every non-zero class is invertible'),

  q('math.nt.riemann-hypothesis', UG, 'mcq', D, 'Where are the "trivial" zeros of ζ(s)?', 'At the negative even integers −2, −4, −6, …', ['On the line Re(s) = 1/2', 'At the positive integers', 'At s = 1'], 'RH concerns only the non-trivial zeros'),
  q('math.nt.riemann-hypothesis', UG, 'mcq', A, 'If the Riemann Hypothesis is true, what improves?', 'The error term in counting primes, to about √x log x', ['The Prime Number Theorem becomes true for the first time', 'Primes become evenly spaced', 'There turn out to be finitely many primes'], 'PNT already holds; RH controls its error'),

  q('math.nt.rsa-basics', UG, 'mcq', D, 'With p = 5 and q = 11, what is φ(n) for n = 55?', '40', ['54', '55', '16'], '(p − 1)(q − 1)'),
  q('math.nt.rsa-basics', UG, 'mcq', A, 'With n = 55, φ(n) = 40 and e = 3, what is the decryption exponent d?', '27', ['13', '37', '3'], '3 × 27 = 81 ≡ 1 (mod 40)'),

  q('math.nt.sieve-of-eratosthenes', MIDDLE, 'mcq', D, 'Sieving up to 30, after crossing out the multiples of 2 and 3, which number is still left but is not prime?', '25', ['23', '29', '27'], '25 falls only when you sieve by 5'),
  q('math.nt.sieve-of-eratosthenes', MIDDLE, 'mcq', A, 'Sieving for all primes up to 200, what is the largest prime whose multiples you must cross out?', '13', ['17', '199', '100'], '√200 ≈ 14.1'),
]
