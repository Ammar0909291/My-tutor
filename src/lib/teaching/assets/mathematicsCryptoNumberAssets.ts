/**
 * Twenty-fourth batch — from Bézout to RSA, the chain number theory was
 * built for.
 *
 *   Bézout -> modular inverse -> CRT -> RSA
 *
 * Every link is an EXISTENCE statement first and a computation second,
 * and four registers here record the same inversion: the algorithm gets
 * learnt and the guarantee it rests on does not. Bézout says a solution
 * EXISTS (the extended Euclidean algorithm merely finds it); the inverse
 * criterion is Bézout restated; CRT says a unique solution exists before
 * anyone constructs it; RSA works because d exists and is unreachable.
 *
 *   STRUCTURE  residue-classes, bezout-identity
 *   INVERT     modular-inverse, fermats-little-theorem
 *   COMBINE    chinese-remainder-theorem, linear-diophantine
 *   APPLY      rsa-basics, pythagorean-triples
 *
 * NOTE on misconception ids: residue-classes, bezout-identity,
 * linear-diophantine, rsa-basics and pythagorean-triples list their
 * register entries WITHOUT MC-n numbers. The :MC-n ids used here refer
 * to register ORDER, as in batches 19 and 21.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const RESC = 'math.nt.residue-classes'
const BEZ = 'math.nt.bezout-identity'
const MINV = 'math.nt.modular-inverse'
const FLT = 'math.nt.fermats-little-theorem'
const CRT = 'math.nt.chinese-remainder-theorem'
const LDIO = 'math.nt.linear-diophantine'
const RSA = 'math.nt.rsa-basics'
const PTRIP = 'math.nt.pythagorean-triples'

export const MATHEMATICS_CRYPTO_NUMBER_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RESC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A residue class mod n is a whole SET of integers, not one number. Mod 5, the class [2] '
      + 'is {…, −8, −3, 2, 7, 12, …} — every integer leaving remainder 2. Writing 2 is naming '
      + 'the class by one of its members, exactly as [7] names the same class.\n\n'
      + 'Arithmetic on classes is well-defined, which is the fact that makes them useful. '
      + '[2] + [4] = [6] = [1] mod 5, and you get the same answer starting from 7 and 9 '
      + 'instead: 7 + 9 = 16, which is [1]. The representative you pick never changes the '
      + 'result, and that is a theorem rather than a convenience.\n\n'
      + 'ℤ/nℤ, the set of all n classes, is a ring for every n — but a FIELD only when n is '
      + 'prime. Mod 6, [2] × [3] = [0] with neither factor zero, so some non-zero elements '
      + 'have no inverse and division breaks. Mod 5 every non-zero class inverts. That single '
      + 'difference is why prime moduli appear everywhere the algebra has to behave.',
    targetedMisconceptions: [`${RESC}:MC-1`, `${RESC}:MC-2`],
    source: eb(RESC, 'Identity + Misconception register — a class is a set; ℤ/nℤ is a field only for prime n'),
  },
  {
    conceptId: BEZ, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Bézout\'s identity says that for any integers a and b there EXIST integers x and y '
      + 'with ax + by = gcd(a, b). It is an existence statement — the extended Euclidean '
      + 'algorithm is how you find such a pair, and is not the theorem itself.\n\n'
      + 'It holds for every pair, not only coprime ones. For 12 and 18, gcd is 6 and '
      + '12(−1) + 18(1) = 6. The coprime case gcd = 1 is the one used most, because '
      + 'ax + by = 1 is what produces modular inverses, but the identity was never restricted '
      + 'to it.\n\n'
      + 'The coefficients are usually NOT both positive, and often cannot be. If a and b are '
      + 'positive and the gcd is smaller than both, at least one of x and y must be negative '
      + 'to bring the combination down — so a negative coefficient is the expected shape of '
      + 'the answer rather than a sign of error. They are also not unique: adding b/g to x '
      + 'while subtracting a/g from y gives another valid pair, and infinitely many exist.',
    targetedMisconceptions: [`${BEZ}:MC-1`, `${BEZ}:MC-2`],
    source: eb(BEZ, 'Identity + Misconception register — existence not method; no coprimality needed'),
  },
  {
    conceptId: MINV, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The inverse of a mod n is the b with ab ≡ 1 (mod n). Mod 7, 3\'s inverse is 5, since '
      + '15 ≡ 1. It is what stands in for division, because dividing by a means multiplying '
      + 'by a⁻¹ — there is no separate division operation in modular arithmetic.\n\n'
      + 'It exists exactly when gcd(a, n) = 1, and that criterion is Bézout, not a new fact: '
      + 'ax + ny = 1 has a solution precisely when the gcd is 1, and reading that equation '
      + 'mod n leaves ax ≡ 1. So the x Bézout hands you IS the inverse — no further '
      + 'processing, just reduce it into 0 … n−1 if it came out negative.\n\n'
      + 'That is also why the extended Euclidean algorithm is the standard method: it '
      + 'produces x directly, in time proportional to the number of digits, where searching '
      + 'every candidate is hopeless for a modulus of any size. And when gcd(a, n) ≠ 1 there '
      + 'is no inverse at all — the equation has no solution, so the question has an answer '
      + 'and the answer is "none".',
    targetedMisconceptions: [`${MINV}:MC-1`, `${MINV}:MC-2`],
    source: eb(MINV, 'Identity + Misconception register — the criterion IS Bézout; x is the inverse already'),
  },
  {
    conceptId: FLT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Fermat\'s Little Theorem: if p is prime and p does not divide a, then a^(p−1) ≡ 1 '
      + '(mod p). With p = 7 and a = 3, 3⁶ = 729 = 104×7 + 1.\n\n'
      + 'The hypothesis is not decoration. If p DOES divide a the conclusion fails outright — '
      + 'take a = 7, p = 7: 7⁶ ≡ 0, not 1. Checking that p ∤ a costs nothing and is the step '
      + 'most often skipped.\n\n'
      + 'Its use is collapsing huge exponents, and the exponent is reduced mod p−1, NOT mod '
      + 'p. To find 3¹⁰⁰ mod 7: 100 = 16×6 + 4, so 3¹⁰⁰ ≡ 3⁴ = 81 ≡ 4 (mod 7). Reducing 100 '
      + 'mod 7 instead gives 2 and the wrong answer, and the two moduli living in one '
      + 'calculation is exactly why they get swapped. The exponent lives in the world of '
      + 'p−1 because that is the size of the cycle.',
    targetedMisconceptions: [`${FLT}:MC-1`, `${FLT}:MC-3`],
    source: eb(FLT, 'Identity + Misconception register — check p ∤ a; reduce the exponent mod p−1'),
  },
  {
    conceptId: CRT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The Chinese Remainder Theorem: given congruences with PAIRWISE COPRIME moduli, there '
      + 'is exactly one solution modulo their product. x ≡ 2 (mod 3) and x ≡ 3 (mod 5) give '
      + 'x ≡ 8 (mod 15), and 8 is the only answer below 15.\n\n'
      + 'Pairwise coprime is a hypothesis to CHECK, not a formality. With moduli 4 and 6, '
      + 'which share a factor, x ≡ 1 (mod 4) and x ≡ 2 (mod 6) has no solution at all — the '
      + 'theorem does not apply and the system can be inconsistent.\n\n'
      + 'It is a structural fact rather than a numerical coincidence: it says the map sending '
      + 'x to its pair of remainders is a bijection between ℤ/15ℤ and ℤ/3ℤ × ℤ/5ℤ. Knowing a '
      + 'unique answer EXISTS before constructing it is what licenses the constructive '
      + 'method, and it is why searching 0, 1, 2, … until something fits is the wrong '
      + 'approach — that works for 15 and not for moduli with twenty digits, where the '
      + 'construction still finishes instantly.',
    targetedMisconceptions: [`${CRT}:MC-1`, `${CRT}:MC-3`],
    source: eb(CRT, 'Identity + Misconception register — pairwise coprime must be checked; it is structural'),
  },
  {
    conceptId: LDIO, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'ax + by = c has integer solutions exactly when gcd(a, b) DIVIDES c. Not when c equals '
      + 'the gcd — divisibility is the criterion, and reading it as equality rejects most '
      + 'solvable equations. 6x + 9y = 21 is solvable because 3 | 21, even though 21 ≠ 3.\n\n'
      + 'Bézout gives you the gcd case, and the rest is scaling. 6(−1) + 9(1) = 3, so '
      + 'multiplying through by 21/3 = 7 gives 6(−7) + 9(7) = 21. Applying Bézout\'s '
      + 'coefficients directly without that scaling solves the wrong equation.\n\n'
      + 'One solution implies infinitely many, and the step size is where care is needed. '
      + 'From (x₀, y₀) the family is x = x₀ + t·(b/g) and y = y₀ − t·(a/g) — divided by the '
      + 'gcd, not the raw a and b. Here b/g = 3 and a/g = 2, so the solutions run '
      + '(−7 + 3t, 7 − 2t). Using 9 and 6 instead still satisfies the equation but skips two '
      + 'solutions out of every three.',
    targetedMisconceptions: [`${LDIO}:MC-1`, `${LDIO}:MC-2`],
    source: eb(LDIO, 'Identity + Misconception register — gcd DIVIDES c; step size is b/g and a/g'),
  },
  {
    conceptId: RSA, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'RSA picks two large primes p and q, publishes n = pq and an exponent e, and keeps d '
      + 'with ed ≡ 1 (mod φ(n)). Encryption is c = mᵉ mod n; decryption is m = c^d mod n, and '
      + 'it works by Euler\'s theorem.\n\n'
      + 'The security is not a secret algorithm. RSA is published in full detail, and n and e '
      + 'are public on purpose — Kerckhoffs\'s principle is that a system must stay secure '
      + 'with everything known except the key. What is hidden is d, and only d.\n\n'
      + 'And d is not computable from the public key by any known method, which is the whole '
      + 'construction. Getting d needs φ(n) = (p−1)(q−1), which needs p and q — so recovering '
      + 'the private key means FACTORING n, and no efficient factoring algorithm is known for '
      + 'a 2048-bit product. Note the asymmetry: multiplying p and q is instant, and undoing '
      + 'it is not. e is also not arbitrary — it must be coprime to φ(n), or no d exists at '
      + 'all, by the modular-inverse criterion.',
    targetedMisconceptions: [`${RSA}:MC-1`, `${RSA}:MC-3`],
    source: eb(RSA, 'Identity + Misconception register — the algorithm is public; d requires factoring n'),
  },
  {
    conceptId: PTRIP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'A Pythagorean triple is three POSITIVE INTEGERS with a² + b² = c². 3-4-5 and 5-12-13 '
      + 'are the familiar ones, and the integer requirement is the whole point — 1, 1, √2 is '
      + 'a right triangle and is not a triple.\n\n'
      + 'Near-misses do not count. 20-21-29 is a genuine triple (400 + 441 = 841); 6-7-9 is '
      + 'not, since 36 + 49 = 85 and 81 ≠ 85, and "close enough" has no meaning here. The '
      + 'test is exact arithmetic, not a drawing that looks right.\n\n'
      + 'Scaling a triple gives another: 6-8-10 and 9-12-15 are 3-4-5 doubled and tripled, '
      + 'and they are the same underlying triangle at different sizes rather than independent '
      + 'discoveries. A triple with no common factor is PRIMITIVE, and every triple is a '
      + 'multiple of exactly one primitive. Euclid\'s formula generates them all — '
      + 'a = m² − n², b = 2mn, c = m² + n² — but only produces primitives when m > n, m and n '
      + 'are coprime and one of them is even; drop those conditions and you get valid triples '
      + 'that are not primitive, or repeats.',
    targetedMisconceptions: [`${PTRIP}:MC-1`, `${PTRIP}:MC-2`],
    source: eb(PTRIP, 'Identity + Misconception register — exact integers only; scaled triples are not new'),
  },
]

export const MATHEMATICS_CRYPTO_NUMBER_PROBES: SeedProbe[] = [
  // --- math.nt.residue-classes ------------------------------------------------------
  {
    conceptId: RESC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Mod 5, what is [2]?',
    choices: [
      { text: 'The whole set {…, −3, 2, 7, 12, …} — every integer leaving remainder 2', isCorrect: true },
      { text: 'The single number 2', isCorrect: false, misconceptionId: `${RESC}:MC-1` },
      { text: 'The numbers 0, 1 and 2', isCorrect: false, misconceptionId: `${RESC}:MC-1` },
    ],
    targetedMisconceptions: [`${RESC}:MC-1`],
    source: eb(RESC, 'Assessment gate — a class is a set'),
  },
  {
    conceptId: RESC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Mod 5, does [2] + [4] depend on whether you use 2 and 4 or 7 and 9?',
    choices: [
      { text: 'No — 2+4 = 6 and 7+9 = 16 both land in [1]; the representative never matters', isCorrect: true },
      { text: 'Yes — larger representatives give a different class', isCorrect: false, misconceptionId: `${RESC}:MC-2` },
      { text: 'Yes — you must always use the smallest representative', isCorrect: false, misconceptionId: `${RESC}:MC-2` },
    ],
    targetedMisconceptions: [`${RESC}:MC-2`],
    source: eb(RESC, 'Misconception register — class arithmetic is well-defined'),
  },
  {
    conceptId: RESC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is ℤ/6ℤ a field?',
    choices: [
      { text: 'No — [2]×[3] = [0] with neither factor zero, so some non-zero elements have no inverse', isCorrect: true },
      { text: 'Yes — ℤ/nℤ is a field for every n', isCorrect: false, misconceptionId: `${RESC}:MC-3` },
      { text: 'Yes — 6 is even, and even moduli always give fields', isCorrect: false, misconceptionId: `${RESC}:MC-3` },
    ],
    targetedMisconceptions: [`${RESC}:MC-3`],
    source: eb(RESC, 'Transfer probe — field only for prime n'),
  },

  // --- math.nt.bezout-identity --------------------------------------------------------
  {
    conceptId: BEZ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does Bézout\'s identity assert?',
    choices: [
      { text: 'That integers x, y EXIST with ax + by = gcd(a, b)', isCorrect: true },
      { text: 'A procedure for computing the gcd', isCorrect: false, misconceptionId: `${BEZ}:MC-3` },
      { text: 'That a and b must be coprime', isCorrect: false, misconceptionId: `${BEZ}:MC-1` },
    ],
    targetedMisconceptions: [`${BEZ}:MC-1`, `${BEZ}:MC-3`],
    source: eb(BEZ, 'Assessment gate — an existence statement'),
  },
  {
    conceptId: BEZ, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does Bézout apply to 12 and 18, which are not coprime?',
    choices: [
      { text: 'Yes — 12(−1) + 18(1) = 6 = gcd(12, 18); it holds for every pair', isCorrect: true },
      { text: 'No — the identity requires coprime integers', isCorrect: false, misconceptionId: `${BEZ}:MC-1` },
      { text: 'No — only when the gcd is 1 is there a solution', isCorrect: false, misconceptionId: `${BEZ}:MC-1` },
    ],
    targetedMisconceptions: [`${BEZ}:MC-1`],
    source: eb(BEZ, 'Misconception register — coprimality is not required'),
  },
  {
    conceptId: BEZ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Your Bézout coefficients came out as x = −1, y = 1. Is a negative a problem?',
    choices: [
      { text: 'No — with a, b positive and the gcd smaller than both, at least one must be negative', isCorrect: true },
      { text: 'Yes — the coefficients must both be positive', isCorrect: false, misconceptionId: `${BEZ}:MC-2` },
      { text: 'Yes — negate both to fix it', isCorrect: false, misconceptionId: `${BEZ}:MC-2` },
    ],
    targetedMisconceptions: [`${BEZ}:MC-2`],
    source: eb(BEZ, 'Transfer probe — a negative coefficient is the expected shape'),
  },

  // --- math.nt.modular-inverse ---------------------------------------------------------
  {
    conceptId: MINV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the inverse of 3 mod 7?',
    choices: [
      { text: '5 — because 15 ≡ 1 (mod 7)', isCorrect: true },
      { text: '1/3', isCorrect: false, misconceptionId: `${MINV}:MC-3` },
      { text: '4 — because 3 + 4 = 7', isCorrect: false },
    ],
    targetedMisconceptions: [`${MINV}:MC-3`],
    source: eb(MINV, 'Assessment gate — an inverse multiplies to 1'),
  },
  {
    conceptId: MINV, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Where does the criterion gcd(a, n) = 1 come from?',
    choices: [
      { text: 'It IS Bézout — ax + ny = 1 is solvable exactly when the gcd is 1, and reading it mod n gives ax ≡ 1', isCorrect: true },
      { text: 'It is a separate fact about inverses, proved independently', isCorrect: false, misconceptionId: `${MINV}:MC-1` },
      { text: 'It follows from Fermat\'s Little Theorem', isCorrect: false, misconceptionId: `${MINV}:MC-1` },
    ],
    targetedMisconceptions: [`${MINV}:MC-1`],
    source: eb(MINV, 'Misconception register — the criterion is Bézout restated'),
  },
  {
    conceptId: MINV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'The extended Euclidean algorithm gives you x in ax + ny = 1. What now?',
    choices: [
      { text: 'That x IS the inverse — just reduce it into 0…n−1 if it came out negative', isCorrect: true },
      { text: 'Further processing is needed to turn x into an inverse', isCorrect: false, misconceptionId: `${MINV}:MC-2` },
      { text: 'Invert x to get the answer', isCorrect: false, misconceptionId: `${MINV}:MC-2` },
    ],
    targetedMisconceptions: [`${MINV}:MC-2`],
    source: eb(MINV, 'Transfer probe — x is already the inverse'),
  },

  // --- math.nt.fermats-little-theorem ------------------------------------------------------
  {
    conceptId: FLT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is 3⁶ mod 7?',
    choices: [
      { text: '1 — Fermat, with p = 7 and p ∤ 3', isCorrect: true },
      { text: '0', isCorrect: false },
      { text: '3', isCorrect: false },
    ],
    targetedMisconceptions: [`${FLT}:MC-1`],
    source: eb(FLT, 'Assessment gate — the basic statement'),
  },
  {
    conceptId: FLT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does 7⁶ ≡ 1 (mod 7)?',
    choices: [
      { text: 'No — 7 divides 7, so the hypothesis fails and 7⁶ ≡ 0', isCorrect: true },
      { text: 'Yes — p is prime, which is the only condition', isCorrect: false, misconceptionId: `${FLT}:MC-1` },
      { text: 'Yes — every a satisfies the theorem', isCorrect: false, misconceptionId: `${FLT}:MC-1` },
    ],
    targetedMisconceptions: [`${FLT}:MC-1`],
    source: eb(FLT, 'Misconception register — p must not divide a'),
  },
  {
    conceptId: FLT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'To find 3¹⁰⁰ mod 7, what do you reduce the exponent by?',
    choices: [
      { text: 'p − 1 = 6 — 100 = 16×6 + 4, so 3¹⁰⁰ ≡ 3⁴ ≡ 4', isCorrect: true },
      { text: 'p = 7 — 100 mod 7 = 2, so 3¹⁰⁰ ≡ 3²', isCorrect: false, misconceptionId: `${FLT}:MC-3` },
      { text: 'Nothing — compute 3¹⁰⁰ directly', isCorrect: false, misconceptionId: `${FLT}:MC-2` },
    ],
    targetedMisconceptions: [`${FLT}:MC-2`, `${FLT}:MC-3`],
    source: eb(FLT, 'Transfer probe — the exponent lives mod p−1'),
  },

  // --- math.nt.chinese-remainder-theorem ------------------------------------------------------
  {
    conceptId: CRT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'x ≡ 2 (mod 3) and x ≡ 3 (mod 5). What is x mod 15?',
    choices: [
      { text: '8 — and it is the only solution below 15', isCorrect: true },
      { text: '5', isCorrect: false },
      { text: 'There are several solutions below 15', isCorrect: false, misconceptionId: `${CRT}:MC-3` },
    ],
    targetedMisconceptions: [`${CRT}:MC-3`],
    source: eb(CRT, 'Assessment gate — a unique solution mod the product'),
  },
  {
    conceptId: CRT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Can you apply CRT to moduli 4 and 6?',
    choices: [
      { text: 'No — they share a factor, so the pairwise-coprime hypothesis fails and the system may be inconsistent', isCorrect: true },
      { text: 'Yes — CRT applies to any moduli', isCorrect: false, misconceptionId: `${CRT}:MC-1` },
      { text: 'Yes, provided both are even', isCorrect: false, misconceptionId: `${CRT}:MC-1` },
    ],
    targetedMisconceptions: [`${CRT}:MC-1`],
    source: eb(CRT, 'Misconception register — pairwise coprime must be checked'),
  },
  {
    conceptId: CRT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why not just search 0, 1, 2, … until a value fits both congruences?',
    choices: [
      { text: 'It works for 15 and not for twenty-digit moduli, where the construction still finishes instantly', isCorrect: true },
      { text: 'Searching is the standard method', isCorrect: false, misconceptionId: `${CRT}:MC-2` },
      { text: 'Because a solution might not exist even when the moduli are coprime', isCorrect: false, misconceptionId: `${CRT}:MC-2` },
    ],
    targetedMisconceptions: [`${CRT}:MC-2`],
    source: eb(CRT, 'Transfer probe — construction beats trial search'),
  },

  // --- math.nt.linear-diophantine --------------------------------------------------------------
  {
    conceptId: LDIO, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is 6x + 9y = 21 solvable in integers?',
    choices: [
      { text: 'Yes — gcd(6,9) = 3 and 3 DIVIDES 21', isCorrect: true },
      { text: 'No — 21 is not equal to the gcd', isCorrect: false, misconceptionId: `${LDIO}:MC-1` },
      { text: 'No — 6 and 9 are not coprime', isCorrect: false, misconceptionId: `${LDIO}:MC-1` },
    ],
    targetedMisconceptions: [`${LDIO}:MC-1`],
    source: eb(LDIO, 'Assessment gate — the gcd must DIVIDE c'),
  },
  {
    conceptId: LDIO, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Bézout gives 6(−1) + 9(1) = 3. How do you reach 21?',
    choices: [
      { text: 'Scale by 21/3 = 7, giving 6(−7) + 9(7) = 21', isCorrect: true },
      { text: 'Use (−1, 1) directly — it already solves the equation', isCorrect: false, misconceptionId: `${LDIO}:MC-3` },
      { text: 'Add 18 to the left-hand side', isCorrect: false, misconceptionId: `${LDIO}:MC-3` },
    ],
    targetedMisconceptions: [`${LDIO}:MC-3`],
    source: eb(LDIO, 'Misconception register — scale the Bézout pair by c/g'),
  },
  {
    conceptId: LDIO, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For 6x + 9y = 21, what is the step size in the general solution?',
    choices: [
      { text: 'x moves by b/g = 3 and y by a/g = 2 — divided by the gcd', isCorrect: true },
      { text: 'x moves by 9 and y by 6 — the raw coefficients', isCorrect: false, misconceptionId: `${LDIO}:MC-2` },
      { text: 'Both move by 1', isCorrect: false, misconceptionId: `${LDIO}:MC-2` },
    ],
    targetedMisconceptions: [`${LDIO}:MC-2`],
    source: eb(LDIO, 'Transfer probe — the step size divides by the gcd'),
  },

  // --- math.nt.rsa-basics -----------------------------------------------------------------------
  {
    conceptId: RSA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Where does RSA\'s security come from?',
    choices: [
      { text: 'The difficulty of factoring n — the algorithm itself is fully published', isCorrect: true },
      { text: 'Keeping the algorithm secret', isCorrect: false, misconceptionId: `${RSA}:MC-1` },
      { text: 'Keeping n secret', isCorrect: false, misconceptionId: `${RSA}:MC-1` },
    ],
    targetedMisconceptions: [`${RSA}:MC-1`],
    source: eb(RSA, 'Assessment gate — Kerckhoffs\'s principle'),
  },
  {
    conceptId: RSA, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You know n and e. Can you compute d?',
    choices: [
      { text: 'Not by any known method — d needs φ(n) = (p−1)(q−1), which needs FACTORING n', isCorrect: true },
      { text: 'Yes — d is the modular inverse of e mod n', isCorrect: false, misconceptionId: `${RSA}:MC-3` },
      { text: 'Yes — d is determined by e alone', isCorrect: false, misconceptionId: `${RSA}:MC-3` },
    ],
    targetedMisconceptions: [`${RSA}:MC-3`],
    source: eb(RSA, 'Misconception register — recovering d means factoring n'),
  },
  {
    conceptId: RSA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Can e be any number you like?',
    choices: [
      { text: 'No — it must be coprime to φ(n), or no d exists at all by the inverse criterion', isCorrect: true },
      { text: 'Yes — any exponent works', isCorrect: false, misconceptionId: `${RSA}:MC-2` },
      { text: 'Yes, provided it is prime', isCorrect: false, misconceptionId: `${RSA}:MC-2` },
    ],
    targetedMisconceptions: [`${RSA}:MC-2`],
    source: eb(RSA, 'Transfer probe — e is constrained by the inverse criterion'),
  },

  // --- math.nt.pythagorean-triples ------------------------------------------------------------------
  {
    conceptId: PTRIP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is 20-21-29 a Pythagorean triple?',
    choices: [
      { text: 'Yes — 400 + 441 = 841 = 29²', isCorrect: true },
      { text: 'No — the numbers are too close together', isCorrect: false },
      { text: 'Only approximately', isCorrect: false, misconceptionId: `${PTRIP}:MC-1` },
    ],
    targetedMisconceptions: [`${PTRIP}:MC-1`],
    source: eb(PTRIP, 'Assessment gate — exact arithmetic decides'),
  },
  {
    conceptId: PTRIP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is 6-7-9 a triple? 36 + 49 = 85 and 9² = 81.',
    choices: [
      { text: 'No — 85 ≠ 81, and "close enough" has no meaning here', isCorrect: true },
      { text: 'Yes — the difference is only 4', isCorrect: false, misconceptionId: `${PTRIP}:MC-1` },
      { text: 'Yes — it draws as a right triangle', isCorrect: false, misconceptionId: `${PTRIP}:MC-1` },
    ],
    targetedMisconceptions: [`${PTRIP}:MC-1`],
    source: eb(PTRIP, 'Misconception register — a near-miss is not a triple'),
  },
  {
    conceptId: PTRIP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is 6-8-10 a new triple, given 3-4-5?',
    choices: [
      { text: 'No — it is 3-4-5 doubled; every triple is a multiple of exactly one PRIMITIVE', isCorrect: true },
      { text: 'Yes — different numbers make a different triple', isCorrect: false, misconceptionId: `${PTRIP}:MC-2` },
      { text: 'Yes — it is primitive because 6, 8 and 10 are distinct', isCorrect: false, misconceptionId: `${PTRIP}:MC-2` },
    ],
    targetedMisconceptions: [`${PTRIP}:MC-2`],
    source: eb(PTRIP, 'Transfer probe — scaled triples are the same triangle'),
  },
]
