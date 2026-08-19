/**
 * Twenty-fifth batch — the analytic and algebraic tail. NINE concepts,
 * one more than usual, because it CLOSES math.nt.
 *
 * FOUR registers in this batch record the SAME error, which is the
 * reason they are authored together: that the Prime Number Theorem
 * depends on the Riemann Hypothesis. It does not. PNT was proved
 * unconditionally in 1896, and RH has been open since 1859 — a proved
 * theorem cannot be contingent on an open conjecture, and treating it
 * so mis-teaches what "proved" means as much as it mis-teaches the
 * number theory.
 *
 *   ANALYTIC   prime-distribution, prime-number-theorem,
 *              riemann-hypothesis, analytic-number-theory
 *   ALGEBRAIC  algebraic-integers, number-fields,
 *              algebraic-number-theory
 *   TOOLS      continued-fractions, induction-applications
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const PDIST = 'math.nt.prime-distribution'
const PNT = 'math.nt.prime-number-theorem'
const RH = 'math.nt.riemann-hypothesis'
const ANT = 'math.nt.analytic-number-theory'
const AINT = 'math.nt.algebraic-integers'
const NFLD = 'math.nt.number-fields'
const ALGNT = 'math.nt.algebraic-number-theory'
const CFRAC = 'math.nt.continued-fractions'
const INDAP = 'math.nt.induction-applications'

export const MATHEMATICS_ANALYTIC_ALGEBRAIC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PDIST, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Primes thin out as numbers grow. Below 100 there are 25; between 1 000 000 and '
      + '1 000 100 there are typically 6 or 7. The Prime Number Theorem makes this precise: '
      + 'π(x), the count of primes up to x, is asymptotic to x/ln x.\n\n'
      + '"Asymptotic" means the RATIO tends to 1, not that the difference vanishes. π(x) − '
      + 'x/ln x grows without bound; it is π(x) ÷ (x/ln x) that approaches 1. So the theorem '
      + 'is not an exact formula and never was — for x = 10⁶ it gives about 72 382 against '
      + 'the true 78 498, an error of thousands and a ratio already close to 1.\n\n'
      + 'Thinning out is not running out. Primes become sparser forever and there are still '
      + 'infinitely many — Euclid proved that around 300 BC, and no amount of sparsity '
      + 'touches it. Density falling to zero and the count being infinite are perfectly '
      + 'compatible, in the same way that the even numbers have density ½ and the squares '
      + 'have density 0, and both sets are infinite.',
    targetedMisconceptions: [`${PDIST}:MC-1`, `${PDIST}:MC-3`],
    source: eb(PDIST, 'Identity + Misconception register — asymptotic is a ratio; sparse is not finite'),
  },
  {
    conceptId: PNT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The Prime Number Theorem states π(x) ~ x/ln x. It was PROVED in 1896, independently '
      + 'by Hadamard and de la Vallée Poussin, and it is a theorem — not a conjecture, not '
      + 'conditional on anything.\n\n'
      + 'In particular it does NOT depend on the Riemann Hypothesis. This is the single most '
      + 'persistent confusion in this area: RH has been open since 1859, and a proved theorem '
      + 'cannot rest on an unproved conjecture. What the 1896 proofs needed was far weaker — '
      + 'that ζ(s) has no zeros on the line Re(s) = 1. That is a zero-free REGION result, and '
      + 'RH is the vastly stronger claim that every non-trivial zero sits on Re(s) = ½.\n\n'
      + 'RH would sharpen the ERROR TERM, not establish the theorem. PNT with current methods '
      + 'gives an error bound; RH would give the best possible one, roughly √x·ln x. So the '
      + 'relationship is "already true, and RH would tell us how accurately" — not "true only '
      + 'if RH holds". Elementary proofs by Erdős and Selberg in 1949 avoid complex analysis '
      + 'entirely, which makes the independence starker still.',
    targetedMisconceptions: [`${PNT}:MC-1`, `${PNT}:MC-2`],
    source: eb(PNT, 'Identity + Misconception register — proved in 1896, independent of RH'),
  },
  {
    conceptId: RH, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The Riemann Hypothesis conjectures that every non-trivial zero of the zeta function '
      + 'has real part exactly ½. Stated in 1859, unproved, and one of the Millennium Prize '
      + 'problems.\n\n'
      + 'It is far stronger than the zero-free regions that are actually known. We can prove '
      + 'there are no zeros on Re(s) = 1, and somewhat inside it; RH claims every last one '
      + 'sits on Re(s) = ½. Written side by side the gap is plain — one line cleared, versus '
      + 'every zero pinned to a different line — and proving a region contains no zeros is a '
      + 'much weaker achievement than locating them all. The two are routinely conflated.\n\n'
      + 'Over 10¹³ zeros have been computed and every one lies on the critical line. That is '
      + 'evidence and not proof — the same category error as any pattern holding on every '
      + 'case checked, and infinitely many zeros remain. What hangs on it is precision: RH '
      + 'would give the sharpest possible error term in the Prime Number Theorem, and '
      + 'hundreds of published results are stated conditionally on it. But PNT itself was '
      + 'proved in 1896 and does not wait for RH.',
    targetedMisconceptions: [`${RH}:MC-1`, `${RH}:MC-3`],
    source: eb(RH, 'Identity + Misconception register — zero-free region is not RH; evidence is not proof'),
  },
  {
    conceptId: ANT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Analytic number theory attacks questions about integers using the tools of analysis — '
      + 'limits, complex functions, integrals. The surprise is that continuous machinery says '
      + 'anything about the discrete, and the bridge is the Euler product.\n\n'
      + 'That bridge is not a coincidence. ζ(s) = Σ 1/nˢ equals ∏ 1/(1 − p⁻ˢ) over all primes '
      + 'exactly BECAUSE every integer factors uniquely into primes — expand the product and '
      + 'unique factorisation hands you each 1/nˢ once. The Fundamental Theorem of Arithmetic '
      + 'is what turns a statement about primes into a statement about a function, which is '
      + 'why analysis can reach primes at all.\n\n'
      + 'Zeta is one Dirichlet series among many. Dirichlet L-functions, built the same way '
      + 'with characters, are what prove there are infinitely many primes in any arithmetic '
      + 'progression a, a+d, a+2d, … with a and d coprime. The method generalises, and the '
      + 'zeta function is its most famous instance rather than its whole subject.',
    targetedMisconceptions: [`${ANT}:MC-2`, `${ANT}:MC-3`],
    source: eb(ANT, 'Identity + Misconception register — the Euler product is unique factorisation; zeta is one of many'),
  },
  {
    conceptId: AINT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'An algebraic integer is a root of a MONIC polynomial with integer coefficients — '
      + 'leading coefficient exactly 1. √2 qualifies, since x² − 2 is monic; so does i, and '
      + 'so does the golden ratio.\n\n'
      + 'Monic is the entire condition and it is what separates these from algebraic numbers '
      + 'generally. ½ is algebraic — it solves 2x − 1 = 0 — and is NOT an algebraic integer, '
      + 'because no monic integer polynomial has it as a root. Every algebraic integer is an '
      + 'algebraic number and the converse fails constantly.\n\n'
      + 'They are also not integers in the ordinary sense: √2 is an algebraic integer and is '
      + 'irrational. The word "integer" is being extended, and the justification is that they '
      + 'behave like ℤ inside their own field — closed under addition and multiplication, '
      + 'with a norm that plays the role of size. That norm can be negative (in ℤ[√2] the '
      + 'norm of a + b√2 is a² − 2b², which is −1 for 1 + √2), so treating it as an absolute '
      + 'value is a mistake; what matters is that norm ±1 marks the units.',
    targetedMisconceptions: [`${AINT}:MC-1`, `${AINT}:MC-2`],
    source: eb(AINT, 'Identity + Misconception register — monic is the condition; norms can be negative'),
  },
  {
    conceptId: NFLD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A number field is a finite extension of ℚ — ℚ with finitely many algebraic numbers '
      + 'adjoined, such as ℚ(√2) = {a + b√2 : a, b ∈ ℚ}. Not every field is one: ℝ and the '
      + 'finite fields are fields and are not number fields, since the definition demands '
      + 'both that it contain ℚ and that it be finite-dimensional over it.\n\n'
      + 'Inside each sits its ring of integers, the algebraic integers of that field, and the '
      + 'interesting question is what happens to ordinary primes there. They do not all '
      + 'behave alike. In ℤ[i], 5 = (2+i)(2−i) SPLITS, 3 stays prime (is INERT), and 2 = '
      + '−i(1+i)² RAMIFIES. Which primes do which is the central computation, and expecting '
      + 'uniform behaviour hides the whole subject.\n\n'
      + 'The symmetries of a number field form its Galois group, and it need not be cyclic. '
      + 'ℚ(√2, √3) has Galois group the Klein four-group, where every non-identity element '
      + 'has order 2 — no single element generates it. The group\'s structure is what encodes '
      + 'the splitting behaviour, which is why assuming it cyclic loses exactly the '
      + 'information you wanted.',
    targetedMisconceptions: [`${NFLD}:MC-1`, `${NFLD}:MC-2`],
    source: eb(NFLD, 'Identity + Misconception register — not every field is one; primes split, stay inert, or ramify'),
  },
  {
    conceptId: ALGNT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Algebraic number theory studies number fields and their rings of integers, and it '
      + 'begins with a failure: unique factorisation does NOT always hold. In ℤ[√−5], '
      + '6 = 2 × 3 = (1 + √−5)(1 − √−5), and all four factors are irreducible — two genuinely '
      + 'different factorisations of one number.\n\n'
      + 'The repair is to factor IDEALS instead of elements, and there uniqueness returns: '
      + 'every non-zero ideal in a ring of integers factors uniquely into prime ideals. That '
      + 'is Dedekind\'s theorem and it is why ideals were invented — not as abstraction for '
      + 'its own sake but to restore a property that had been lost.\n\n'
      + 'The ideal CLASS GROUP measures how badly it was lost. Its size, the class number, is '
      + '1 exactly when the ring has unique factorisation, and larger numbers mean worse '
      + 'failure — so it counts classes of ideals modulo the principal ones, and does NOT '
      + 'count how many ideals exist (there are infinitely many). ℤ[√−5] has class number 2, '
      + 'which is why the 6 above splits two ways and not more.',
    targetedMisconceptions: [`${ALGNT}:MC-1`, `${ALGNT}:MC-2`],
    source: eb(ALGNT, 'Identity + Misconception register — UFD fails; the class number measures failure, not quantity'),
  },
  {
    conceptId: CFRAC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A continued fraction writes a number as a₀ + 1/(a₁ + 1/(a₂ + …)). Producing one is '
      + 'the Euclidean algorithm in different clothes: take the whole part, invert the '
      + 'remainder, repeat. For 45/16 — 2 remainder 13/16, then 16/13 gives 1 remainder 3/13, '
      + 'and so on — the quotients ARE the Euclidean algorithm\'s quotients.\n\n'
      + 'It terminates exactly when the number is RATIONAL, for the same reason: the '
      + 'Euclidean algorithm on numerator and denominator must reach zero. An irrational '
      + 'never terminates, so terminating is not a matter of patience — it is a test.\n\n'
      + 'Periodicity is narrower still, and it is where the striking theorem lives: a '
      + 'continued fraction is eventually PERIODIC exactly when the number is a quadratic '
      + 'irrational — a root of a quadratic with integer coefficients. √2 = [1; 2, 2, 2, …] '
      + 'repeats forever; e and π do not, since neither is quadratic. This is also what makes '
      + 'continued fractions the systematic method for Pell\'s equation, where the periodic '
      + 'expansion of √D delivers the fundamental solution that inspection cannot reach.',
    targetedMisconceptions: [`${CFRAC}:MC-1`, `${CFRAC}:MC-2`],
    source: eb(CFRAC, 'Identity + Misconception register — it is the Euclidean algorithm; termination tests rationality'),
  },
  {
    conceptId: INDAP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Induction proves number-theoretic statements about all n, and divisibility claims are '
      + 'its most common use. To show 3 | (n³ − n): the base case n = 1 gives 0, which 3 '
      + 'divides.\n\n'
      + 'The inductive step must actually USE the hypothesis, and this is the failure the '
      + 'register rates foundational. Expand (n+1)³ − (n+1) = n³ − n + 3n² + 3n. The first '
      + 'part is divisible by 3 BY THE HYPOTHESIS, and 3n² + 3n obviously is — so the sum is. '
      + 'If your step never invokes the case n, you proved n+1 outright and the induction was '
      + 'doing no work, which usually means the argument is wrong.\n\n'
      + 'Structure the algebra to EXPOSE the divisor. The point of writing the expansion as '
      + '(n³ − n) + 3(n² + n) is that both pieces visibly carry a factor of 3; multiplying '
      + 'everything out into 3n² + 3n + n³ − n hides exactly what you are trying to show. And '
      + 'the base case is not a formality here either — it must be checked at the smallest n '
      + 'the claim covers, not assumed trivial because it looks obvious.',
    targetedMisconceptions: [`${INDAP}:MC-1`, `${INDAP}:MC-3`],
    source: eb(INDAP, 'Identity + Misconception register — the step must use the hypothesis; expose the divisor'),
  },
]

export const MATHEMATICS_ANALYTIC_ALGEBRAIC_PROBES: SeedProbe[] = [
  // --- math.nt.prime-distribution -----------------------------------------------------
  {
    conceptId: PDIST, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does π(x) ~ x/ln x assert?',
    choices: [
      { text: 'That the RATIO π(x) ÷ (x/ln x) tends to 1', isCorrect: true },
      { text: 'That the difference π(x) − x/ln x tends to 0', isCorrect: false, misconceptionId: `${PDIST}:MC-1` },
      { text: 'That π(x) equals x/ln x exactly', isCorrect: false, misconceptionId: `${PDIST}:MC-2` },
    ],
    targetedMisconceptions: [`${PDIST}:MC-1`, `${PDIST}:MC-2`],
    source: eb(PDIST, 'Assessment gate — asymptotic means a ratio'),
  },
  {
    conceptId: PDIST, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'π(10⁶) = 78 498 and x/ln x ≈ 72 382. Does that error refute the theorem?',
    choices: [
      { text: 'No — the ratio is already near 1; the difference is expected to grow without bound', isCorrect: true },
      { text: 'Yes — the formula should be exact', isCorrect: false, misconceptionId: `${PDIST}:MC-2` },
      { text: 'Yes — an error of thousands is too large to be asymptotic', isCorrect: false, misconceptionId: `${PDIST}:MC-1` },
    ],
    targetedMisconceptions: [`${PDIST}:MC-2`],
    source: eb(PDIST, 'Misconception register — PNT is not an exact formula'),
  },
  {
    conceptId: PDIST, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Primes get sparser forever. Do they run out?',
    choices: [
      { text: 'No — Euclid proved there are infinitely many; density falling to zero is compatible with an infinite count', isCorrect: true },
      { text: 'Yes — sparsity eventually reaches zero primes', isCorrect: false, misconceptionId: `${PDIST}:MC-3` },
      { text: 'Unknown — it is an open question', isCorrect: false, misconceptionId: `${PDIST}:MC-3` },
    ],
    targetedMisconceptions: [`${PDIST}:MC-3`],
    source: eb(PDIST, 'Transfer probe — sparse is not finite'),
  },

  // --- math.nt.prime-number-theorem ------------------------------------------------------
  {
    conceptId: PNT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the Prime Number Theorem proved?',
    choices: [
      { text: 'Yes — in 1896, by Hadamard and de la Vallée Poussin independently', isCorrect: true },
      { text: 'No — it depends on the Riemann Hypothesis, which is open', isCorrect: false, misconceptionId: `${PNT}:MC-1` },
      { text: 'Only for x below some computed bound', isCorrect: false },
    ],
    targetedMisconceptions: [`${PNT}:MC-1`],
    source: eb(PNT, 'Assessment gate — PNT is a theorem'),
  },
  {
    conceptId: PNT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What did the 1896 proofs actually need about ζ(s)?',
    choices: [
      { text: 'That it has no zeros on the line Re(s) = 1 — a zero-free REGION, far weaker than RH', isCorrect: true },
      { text: 'That all its non-trivial zeros lie on Re(s) = ½', isCorrect: false, misconceptionId: `${PNT}:MC-1` },
      { text: 'That it has no zeros at all', isCorrect: false, misconceptionId: `${PNT}:MC-2` },
    ],
    targetedMisconceptions: [`${PNT}:MC-1`, `${PNT}:MC-2`],
    source: eb(PNT, 'Misconception register — a zero-free line is not RH'),
  },
  {
    conceptId: PNT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If RH were proved tomorrow, what would change for PNT?',
    choices: [
      { text: 'The ERROR TERM would sharpen to roughly √x·ln x — the theorem is already true', isCorrect: true },
      { text: 'PNT would finally be established', isCorrect: false, misconceptionId: `${PNT}:MC-1` },
      { text: 'Nothing at all; the two are unrelated', isCorrect: false },
    ],
    targetedMisconceptions: [`${PNT}:MC-1`],
    source: eb(PNT, 'Transfer probe — RH sharpens rather than establishes'),
  },

  // --- math.nt.riemann-hypothesis -----------------------------------------------------------
  {
    conceptId: RH, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does the Riemann Hypothesis claim?',
    choices: [
      { text: 'Every non-trivial zero of ζ has real part exactly ½', isCorrect: true },
      { text: 'ζ has no zeros on the line Re(s) = 1', isCorrect: false, misconceptionId: `${RH}:MC-1` },
      { text: 'π(x) is asymptotic to x/ln x', isCorrect: false, misconceptionId: `${RH}:MC-2` },
    ],
    targetedMisconceptions: [`${RH}:MC-1`, `${RH}:MC-2`],
    source: eb(RH, 'Assessment gate — the critical line'),
  },
  {
    conceptId: RH, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Over 10¹³ zeros have been checked and all lie on the critical line. Is RH proved?',
    choices: [
      { text: 'No — infinitely many remain; this is evidence, the same category error as any checked pattern', isCorrect: true },
      { text: 'Yes — that many cases is conclusive', isCorrect: false, misconceptionId: `${RH}:MC-3` },
      { text: 'Yes, for all practical purposes it counts as proved', isCorrect: false, misconceptionId: `${RH}:MC-3` },
    ],
    targetedMisconceptions: [`${RH}:MC-3`],
    source: eb(RH, 'Misconception register — partial evidence is not proof'),
  },
  {
    conceptId: RH, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the Prime Number Theorem contingent on RH?',
    choices: [
      { text: 'No — PNT was proved in 1896 and RH has been open since 1859; a theorem cannot rest on a conjecture', isCorrect: true },
      { text: 'Yes — PNT holds only if RH is true', isCorrect: false, misconceptionId: `${RH}:MC-2` },
      { text: 'Yes, for large x', isCorrect: false, misconceptionId: `${RH}:MC-2` },
    ],
    targetedMisconceptions: [`${RH}:MC-2`],
    source: eb(RH, 'Transfer probe — proved cannot depend on unproved'),
  },

  // --- math.nt.analytic-number-theory --------------------------------------------------------
  {
    conceptId: ANT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does analytic number theory do?',
    choices: [
      { text: 'Attacks questions about integers using the tools of analysis', isCorrect: true },
      { text: 'Studies only the zeta function', isCorrect: false, misconceptionId: `${ANT}:MC-3` },
      { text: 'Proves results that are all conditional on RH', isCorrect: false, misconceptionId: `${ANT}:MC-1` },
    ],
    targetedMisconceptions: [`${ANT}:MC-1`, `${ANT}:MC-3`],
    source: eb(ANT, 'Assessment gate — continuous tools on discrete questions'),
  },
  {
    conceptId: ANT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Why does ζ(s) = Σ1/nˢ equal the product over primes ∏1/(1 − p⁻ˢ)?',
    choices: [
      { text: 'Because every integer factors uniquely into primes — expanding the product gives each 1/nˢ exactly once', isCorrect: true },
      { text: 'It is a numerical coincidence discovered by Euler', isCorrect: false, misconceptionId: `${ANT}:MC-2` },
      { text: 'Because both sides converge to the same limit for unrelated reasons', isCorrect: false, misconceptionId: `${ANT}:MC-2` },
    ],
    targetedMisconceptions: [`${ANT}:MC-2`],
    source: eb(ANT, 'Misconception register — the Euler product IS unique factorisation'),
  },
  {
    conceptId: ANT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What proves there are infinitely many primes in an arithmetic progression?',
    choices: [
      { text: 'Dirichlet L-functions — the same construction as zeta, built with characters', isCorrect: true },
      { text: 'The zeta function alone; it is the only Dirichlet series', isCorrect: false, misconceptionId: `${ANT}:MC-3` },
      { text: 'Nothing — that is still open', isCorrect: false },
    ],
    targetedMisconceptions: [`${ANT}:MC-3`],
    source: eb(ANT, 'Transfer probe — zeta is one Dirichlet series among many'),
  },

  // --- math.nt.algebraic-integers --------------------------------------------------------------
  {
    conceptId: AINT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What makes a number an algebraic INTEGER?',
    choices: [
      { text: 'It is a root of a MONIC polynomial with integer coefficients', isCorrect: true },
      { text: 'It is a root of any polynomial with integer coefficients', isCorrect: false, misconceptionId: `${AINT}:MC-1` },
      { text: 'It is an ordinary integer', isCorrect: false, misconceptionId: `${AINT}:MC-2` },
    ],
    targetedMisconceptions: [`${AINT}:MC-1`, `${AINT}:MC-2`],
    source: eb(AINT, 'Assessment gate — monic is the condition'),
  },
  {
    conceptId: AINT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: '½ solves 2x − 1 = 0. Is it an algebraic integer?',
    choices: [
      { text: 'No — that polynomial is not monic, and no monic integer polynomial has ½ as a root', isCorrect: true },
      { text: 'Yes — it solves a polynomial with integer coefficients', isCorrect: false, misconceptionId: `${AINT}:MC-1` },
      { text: 'Yes — every rational is an algebraic integer', isCorrect: false, misconceptionId: `${AINT}:MC-1` },
    ],
    targetedMisconceptions: [`${AINT}:MC-1`],
    source: eb(AINT, 'Misconception register — algebraic number is not algebraic integer'),
  },
  {
    conceptId: AINT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'In ℤ[√2] the norm of a + b√2 is a² − 2b². What is the norm of 1 + √2?',
    choices: [
      { text: '−1 — norms can be negative, so they are not absolute values', isCorrect: true },
      { text: '1 — a norm is always positive', isCorrect: false, misconceptionId: `${AINT}:MC-3` },
      { text: '3 — add the squares', isCorrect: false, misconceptionId: `${AINT}:MC-3` },
    ],
    targetedMisconceptions: [`${AINT}:MC-3`],
    source: eb(AINT, 'Transfer probe — norms can be negative'),
  },

  // --- math.nt.number-fields ---------------------------------------------------------------------
  {
    conceptId: NFLD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is ℝ a number field?',
    choices: [
      { text: 'No — a number field is a FINITE extension of ℚ, and ℝ is not finite-dimensional over ℚ', isCorrect: true },
      { text: 'Yes — it is a field containing ℚ', isCorrect: false, misconceptionId: `${NFLD}:MC-1` },
      { text: 'Yes — every field of numbers is a number field', isCorrect: false, misconceptionId: `${NFLD}:MC-1` },
    ],
    targetedMisconceptions: [`${NFLD}:MC-1`],
    source: eb(NFLD, 'Assessment gate — finite extension of ℚ'),
  },
  {
    conceptId: NFLD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'In ℤ[i], 5 = (2+i)(2−i) and 3 stays prime. What does that show?',
    choices: [
      { text: 'Primes behave differently — some SPLIT, some stay INERT, some RAMIFY; which is the central question', isCorrect: true },
      { text: 'That 3 was never really prime', isCorrect: false, misconceptionId: `${NFLD}:MC-2` },
      { text: 'That all primes split in a number field', isCorrect: false, misconceptionId: `${NFLD}:MC-2` },
    ],
    targetedMisconceptions: [`${NFLD}:MC-2`],
    source: eb(NFLD, 'Misconception register — primes do not all behave alike'),
  },
  {
    conceptId: NFLD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is a number field\'s Galois group always cyclic?',
    choices: [
      { text: 'No — ℚ(√2, √3) has the Klein four-group, where no single element generates', isCorrect: true },
      { text: 'Yes — Galois groups of number fields are always cyclic', isCorrect: false, misconceptionId: `${NFLD}:MC-3` },
      { text: 'Yes, provided the field is a finite extension', isCorrect: false, misconceptionId: `${NFLD}:MC-3` },
    ],
    targetedMisconceptions: [`${NFLD}:MC-3`],
    source: eb(NFLD, 'Transfer probe — the group structure encodes the splitting'),
  },

  // --- math.nt.algebraic-number-theory --------------------------------------------------------------
  {
    conceptId: ALGNT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In ℤ[√−5], 6 = 2 × 3 = (1+√−5)(1−√−5) with all factors irreducible. What does that mean?',
    choices: [
      { text: 'Unique factorisation FAILS there — rings of integers are not all UFDs', isCorrect: true },
      { text: 'One of the factorisations must be wrong', isCorrect: false, misconceptionId: `${ALGNT}:MC-1` },
      { text: 'That ℤ[√−5] is not a ring', isCorrect: false, misconceptionId: `${ALGNT}:MC-1` },
    ],
    targetedMisconceptions: [`${ALGNT}:MC-1`],
    source: eb(ALGNT, 'Assessment gate — UFD is not automatic'),
  },
  {
    conceptId: ALGNT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What does the ideal class group measure?',
    choices: [
      { text: 'How badly unique factorisation fails — class number 1 means it holds', isCorrect: true },
      { text: 'How many ideals the ring has', isCorrect: false, misconceptionId: `${ALGNT}:MC-2` },
      { text: 'How many prime ideals lie above each rational prime', isCorrect: false, misconceptionId: `${ALGNT}:MC-2` },
    ],
    targetedMisconceptions: [`${ALGNT}:MC-2`],
    source: eb(ALGNT, 'Misconception register — it measures failure, not quantity'),
  },
  {
    conceptId: ALGNT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How is unique factorisation recovered when elements fail it?',
    choices: [
      { text: 'Factor IDEALS instead — every non-zero ideal factors uniquely into prime ideals (Dedekind)', isCorrect: true },
      { text: 'It cannot be recovered; the subject works without it', isCorrect: false, misconceptionId: `${ALGNT}:MC-1` },
      { text: 'By restricting to rings where it already holds', isCorrect: false, misconceptionId: `${ALGNT}:MC-1` },
    ],
    targetedMisconceptions: [`${ALGNT}:MC-1`],
    source: eb(ALGNT, 'Transfer probe — ideals were invented to restore uniqueness'),
  },

  // --- math.nt.continued-fractions -----------------------------------------------------------------------
  {
    conceptId: CFRAC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'How do you produce a continued fraction?',
    choices: [
      { text: 'Take the whole part, invert the remainder, repeat — it IS the Euclidean algorithm', isCorrect: true },
      { text: 'By a separate algorithm unrelated to gcd computation', isCorrect: false, misconceptionId: `${CFRAC}:MC-1` },
      { text: 'By repeatedly squaring the number', isCorrect: false },
    ],
    targetedMisconceptions: [`${CFRAC}:MC-1`],
    source: eb(CFRAC, 'Assessment gate — the Euclidean algorithm in other clothes'),
  },
  {
    conceptId: CFRAC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'When does a continued fraction terminate?',
    choices: [
      { text: 'Exactly when the number is RATIONAL — the Euclidean algorithm must reach zero', isCorrect: true },
      { text: 'When you have computed enough terms', isCorrect: false, misconceptionId: `${CFRAC}:MC-2` },
      { text: 'Whenever the number is not a whole number', isCorrect: false, misconceptionId: `${CFRAC}:MC-2` },
    ],
    targetedMisconceptions: [`${CFRAC}:MC-2`],
    source: eb(CFRAC, 'Misconception register — termination is a rationality test'),
  },
  {
    conceptId: CFRAC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: '√2 = [1; 2, 2, 2, …] repeats. Do all irrationals?',
    choices: [
      { text: 'No — eventual periodicity holds exactly for QUADRATIC irrationals; e and π do not repeat', isCorrect: true },
      { text: 'Yes — every irrational eventually repeats', isCorrect: false, misconceptionId: `${CFRAC}:MC-3` },
      { text: 'Yes, provided the number is algebraic', isCorrect: false, misconceptionId: `${CFRAC}:MC-3` },
    ],
    targetedMisconceptions: [`${CFRAC}:MC-3`],
    source: eb(CFRAC, 'Transfer probe — periodicity characterises quadratic irrationals'),
  },

  // --- math.nt.induction-applications -----------------------------------------------------------------------
  {
    conceptId: INDAP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Proving 3 | (n³ − n) by induction, what is the base case at n = 1?',
    choices: [
      { text: '1 − 1 = 0, and 3 divides 0', isCorrect: true },
      { text: 'It can be skipped as obvious', isCorrect: false, misconceptionId: `${INDAP}:MC-2` },
      { text: '3, which divides itself', isCorrect: false },
    ],
    targetedMisconceptions: [`${INDAP}:MC-2`],
    source: eb(INDAP, 'Assessment gate — the base case is checked, not assumed'),
  },
  {
    conceptId: INDAP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Your inductive step never mentions the case n. What does that tell you?',
    choices: [
      { text: 'You proved n+1 outright and the induction did no work — usually a sign the argument is wrong', isCorrect: true },
      { text: 'Nothing — using the hypothesis is optional', isCorrect: false, misconceptionId: `${INDAP}:MC-1` },
      { text: 'That the proof is unusually elegant', isCorrect: false, misconceptionId: `${INDAP}:MC-1` },
    ],
    targetedMisconceptions: [`${INDAP}:MC-1`],
    source: eb(INDAP, 'Misconception register — the step must use the hypothesis'),
  },
  {
    conceptId: INDAP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Which way of writing (n+1)³ − (n+1) helps the proof?',
    choices: [
      { text: '(n³ − n) + 3(n² + n) — both pieces visibly carry a factor of 3', isCorrect: true },
      { text: 'n³ + 3n² + 2n — fully multiplied out', isCorrect: false, misconceptionId: `${INDAP}:MC-3` },
      { text: 'Either; the algebra makes no difference to the argument', isCorrect: false, misconceptionId: `${INDAP}:MC-3` },
    ],
    targetedMisconceptions: [`${INDAP}:MC-3`],
    source: eb(INDAP, 'Transfer probe — structure the algebra to expose the divisor'),
  },
]
