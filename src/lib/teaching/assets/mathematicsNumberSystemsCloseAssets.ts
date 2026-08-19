/**
 * Sixteenth batch — extending the number line, and the two directions
 * mathematics reaches.
 *
 * This batch CLOSES two domains: math.found and math.alg both reach full
 * coverage, every authored Educational Brain entry with serving assets
 * behind it.
 *
 *   EXTEND     negative-numbers, absolute-value, real-numbers,
 *              complex-numbers. Each step adds numbers to solve equations
 *              the previous set could not, and each is met with the same
 *              objection — that the new numbers are not really numbers.
 *   REACH      generalization, mathematical-modeling. Inward, to the
 *              structure many cases share; outward, to a situation that
 *              was never mathematical to begin with.
 *   ALGEBRA    polynomial, exponent-rules (algebraic). The last two.
 *
 * NOTE on math.alg.exponent-rules: this is NOT a duplicate of
 * math.arith.exponent-rules (served in the algebra-vocabulary batch).
 * The arithmetic node owns the integer laws and why they hold by
 * counting; this node owns the EXTENSION to zero, negative and rational
 * exponents, where counting stops working and the laws are preserved by
 * choice. The two entries are written to that split and cross-reference
 * rather than restate.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const NEG = 'math.arith.negative-numbers'
const ABSV = 'math.arith.absolute-value'
const REAL = 'math.found.real-numbers'
const CPLX = 'math.found.complex-numbers'
const GEN = 'math.found.generalization'
const MODEL = 'math.found.mathematical-modeling'
const POLY = 'math.alg.polynomial'
const AEXP = 'math.alg.exponent-rules'

export const MATHEMATICS_NUMBER_SYSTEMS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: NEG, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Negative numbers extend the line to the left of zero, and they exist because '
      + 'subtraction needed to always work: 3 − 5 has no answer among the counting numbers, '
      + 'and −2 is that answer. Temperature, debt and height below sea level are all places '
      + 'the line genuinely continues.\n\n'
      + 'Subtracting a negative ADDS. 5 − (−3) = 8, because subtracting means removing and '
      + 'removing a debt of 3 leaves you 3 better off. On the line, subtracting moves left '
      + 'and the minus sign on the 3 reverses that, so you move right instead — two '
      + 'reversals, forward again.\n\n'
      + 'Multiplying two negatives is positive for the same structural reason, and the '
      + 'pattern shows it: 3 × (−2) = −6, 2 × (−2) = −4, 1 × (−2) = −2, 0 × (−2) = 0. Each '
      + 'step up is +2, so the next is (−1) × (−2) = +2. And −x is not automatically '
      + 'negative: it means "the opposite of x", so if x is −7 then −x is +7. The minus sign '
      + 'is an instruction to flip, not a label saying "below zero".',
    targetedMisconceptions: [`${NEG}:MC-1`, `${NEG}:MC-3`],
    source: eb(NEG, 'Identity + Misconception register — subtracting a negative adds; −x is not always negative'),
  },
  {
    conceptId: ABSV, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      '|x| is the DISTANCE from x to zero on the number line. |7| = 7 and |−7| = 7, because '
      + 'both sit seven steps from the origin — direction is what the bars discard, and '
      + 'distance is what they keep.\n\n'
      + 'Reading it as "delete the minus sign" works on plain numbers and breaks the moment a '
      + 'variable appears. |x − 3| is not "x − 3 with the sign removed"; it is the distance '
      + 'between x and 3, which is 4 when x is 7 and also 4 when x is −1. That reading is '
      + 'why |x| = 5 has TWO solutions: two points sit five from zero.\n\n'
      + 'An absolute value is never negative, since a distance never is — so |x| = −2 has no '
      + 'solution at all, and noticing that instantly can save a page of algebra. The '
      + 'definition |x| = x when x ≥ 0 and −x when x < 0 says exactly this: in the second '
      + 'case x is already negative, so −x is positive. The same minus sign that looks like '
      + 'it produces a negative answer is what guarantees a positive one.',
    targetedMisconceptions: [`${ABSV}:MC-1`, `${ABSV}:MC-2`],
    source: eb(ABSV, 'Identity + Misconception register — distance, not sign removal; never negative'),
  },
  {
    conceptId: REAL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The real numbers are every point on the number line — rationals and irrationals '
      + 'together, with no gaps anywhere. What singles ℝ out is COMPLETENESS: any set of '
      + 'reals with an upper bound has a LEAST upper bound, which is a precise way of saying '
      + 'the line has no holes in it.\n\n'
      + 'The rationals fail that test, and the failure is easy to see. Take every rational '
      + 'whose square is below 2. The set is bounded above, and its least upper bound would '
      + 'have to be √2 — which is not rational. So ℚ has a gap exactly where √2 should be, '
      + 'and filling all such gaps is what ℝ is FOR. "Complete" here means no missing points, '
      + 'not "finished" or "comprehensive".\n\n'
      + 'A real number is also not the same thing as its decimal expansion. The decimal is a '
      + 'way of NAMING the point, and an imperfect one: 0.999… and 1 are two names for one '
      + 'real number, not two numbers that happen to be close. And the irrationals are not a '
      + 'thin scattering of exotic cases among the rationals — there are uncountably many of '
      + 'them and only countably many rationals, so almost every real is irrational.',
    targetedMisconceptions: [`${REAL}:MC-1`, `${REAL}:MC-2`],
    source: eb(REAL, 'Identity + Misconception register — completeness, and a real is not its decimal'),
  },
  {
    conceptId: CPLX, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Complex numbers have the form a + bi where i² = −1. They exist for the same reason '
      + 'negatives do: an equation had no solution, so the number system was extended until '
      + 'it did. x² = −1 has no real answer, and i is defined to be one.\n\n'
      + '"√ of a negative is undefined" is true only over the reals, and that qualifier is '
      + 'usually dropped when the rule is first taught. Over ℂ it is perfectly defined — '
      + '√(−9) = 3i — so the earlier statement was never a fact about arithmetic, only about '
      + 'which numbers were available at the time.\n\n'
      + 'And i is not a placeholder or a bookkeeping trick. Multiplying by i rotates a point '
      + '90° in the plane, which is why multiplying twice — by i² — turns you around to face '
      + 'backwards, i.e. gives −1. Complex numbers are the natural language for anything that '
      + 'rotates or oscillates, which is why electrical engineering and quantum mechanics use '
      + 'them constantly. "Imaginary" is a historical insult that stuck; these numbers are '
      + 'exactly as real as the negatives, which were once called absurd for the same reason.',
    targetedMisconceptions: [`${CPLX}:MC-1`, `${CPLX}:MC-2`],
    source: eb(CPLX, 'Identity + Misconception register — undefined only over ℝ; i is a rotation'),
  },
  {
    conceptId: GEN, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Generalization is stating a claim that covers a whole class of cases, usually found by '
      + 'looking at particular ones and asking what stays the same. Noticing 1+3 = 4, 1+3+5 = '
      + '9 and 1+3+5+7 = 16 leads to "the first n odd numbers sum to n²" — one sentence '
      + 'replacing infinitely many.\n\n'
      + 'Confirming cases are where a generalization COMES FROM and never what establishes '
      + 'it. Until the invariant structure is proved, you have a conjecture, however many '
      + 'cases agree — the sum above is proved by seeing that odd numbers build successive '
      + 'square shells, not by adding up more of them.\n\n'
      + 'Two things go wrong in practice. Cases too similar to each other: testing a claim '
      + 'about integers on 2, 4, 6 and 8 tells you nothing about odd, negative or zero, so '
      + 'variation matters more than volume. And surface similarity mistaken for shared '
      + 'structure: two problems that look alike may generalize differently, while two that '
      + 'look nothing alike may be the same problem underneath — which is exactly why the '
      + 'invariant has to be identified rather than assumed from appearance.',
    targetedMisconceptions: [`${GEN}:MC-1`, `${GEN}:MC-2`],
    source: eb(GEN, 'Identity + Misconception register — cases suggest, proof establishes; vary the cases'),
  },
  {
    conceptId: MODEL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Modeling is a round trip: translate a real situation into mathematics, solve the '
      + 'mathematics, then translate the answer back and ask whether it makes sense. All '
      + 'three legs are the work, and the third is the one most often skipped.\n\n'
      + 'The mathematical answer is not the final answer. "You need 2.3 buses" is a correct '
      + 'solution and a useless one — you need 3, because buses do not come in tenths. A '
      + 'negative time, a probability above 1, or a length longer than the object are all '
      + 'signals that the model, not the arithmetic, needs revisiting; without the '
      + 'interpretation step nothing catches them.\n\n'
      + 'There is also no single correct model. A projectile modelled without air resistance '
      + 'is simple and good enough for a thrown ball; with it, it is harder and better for a '
      + 'parachute. That is a CHOICE about which details matter, and more detail is not '
      + 'automatically better — a model that needs data you cannot measure, or takes a week '
      + 'to run for a decision due tomorrow, is worse in the only sense that counts. Fit the '
      + 'model to the question being asked.',
    targetedMisconceptions: [`${MODEL}:MC-1`, `${MODEL}:MC-2`],
    source: eb(MODEL, 'Identity + Misconception register — the round trip; no single correct model'),
  },
  {
    conceptId: POLY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A polynomial is a sum of terms of the form (number) × (variable raised to a '
      + 'whole-number power): 4x³ − 2x + 7. The exponents are what qualify it — they must be '
      + 'non-negative integers, so 3/x is not a polynomial (that is x⁻¹) and neither is √x '
      + '(that is x^½).\n\n'
      + 'Its degree is the highest power present, so 4x³ − 2x + 7 has degree 3. Not the '
      + 'largest coefficient — the 7 and the 4 are irrelevant to it — and this matters beyond '
      + 'vocabulary, because degree determines the maximum number of roots and the shape of '
      + 'the graph far from the origin. Getting it from the wrong number sends everything '
      + 'downstream wrong.\n\n'
      + 'A single term is still a polynomial. 5x² is one, and so is the constant 7, which has '
      + 'degree 0 — "polynomial" describes the FORM, not a minimum number of terms, and the '
      + 'many-terms reading comes from the "poly" in the name rather than from the '
      + 'definition. That inclusiveness is what lets polynomials be added and multiplied '
      + 'freely and always give polynomials back.',
    targetedMisconceptions: [`${POLY}:MC-1`, `${POLY}:MC-2`],
    source: eb(POLY, 'Identity + Misconception register — degree is the highest power; a monomial qualifies'),
  },
  {
    conceptId: AEXP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The integer exponent laws are counts — a³ · a² is five a\'s. Extending them to zero, '
      + 'negative and fractional exponents is a different move, because you cannot write down '
      + 'half an a. The extension is made by DEMANDING the laws keep working, and then seeing '
      + 'what the new values are forced to be.\n\n'
      + 'a^½ is the clearest case. If the power rule is to survive, (a^½)² must be a^1 = a — '
      + 'so a^½ is the thing that squares to a, which is √a. Nothing was defined by '
      + 'preference; the requirement that (aᵐ)ⁿ = aᵐⁿ leaves no other option, and the same '
      + 'demand forces a⁰ = 1 and a⁻ⁿ = 1/aⁿ. Fractional exponents are therefore roots, not '
      + 'division: a^(1/2) is √a and not a ÷ 2.\n\n'
      + 'One thing no law licenses, and it is the costliest error in algebra: exponents do '
      + 'not distribute over addition. (a + b)² is NOT a² + b² — it is a² + 2ab + b², and the '
      + 'missing 2ab is a real quantity you can see. With a = 3 and b = 4, (a+b)² = 49 while '
      + 'a² + b² = 25. The rules cover products and quotients and powers of powers; addition '
      + 'inside a bracket is not one of them.',
    targetedMisconceptions: [`${AEXP}:MC-1`, `${AEXP}:MC-3`],
    source: eb(AEXP, 'Identity + Misconception register — the extension is forced; exponents do not distribute over addition'),
  },
]

export const MATHEMATICS_NUMBER_SYSTEMS_PROBES: SeedProbe[] = [
  // --- math.arith.negative-numbers -------------------------------------------------
  {
    conceptId: NEG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is 5 − (−3)?',
    choices: [
      { text: '8 — removing a debt of 3 leaves you 3 better off', isCorrect: true },
      { text: '2 — two minus signs make it more negative', isCorrect: false, misconceptionId: `${NEG}:MC-1` },
      { text: '−8', isCorrect: false, misconceptionId: `${NEG}:MC-1` },
    ],
    targetedMisconceptions: [`${NEG}:MC-1`],
    source: eb(NEG, 'Assessment gate — subtracting a negative adds'),
  },
  {
    conceptId: NEG, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Following 3×(−2) = −6, 2×(−2) = −4, 1×(−2) = −2, 0×(−2) = 0, what is (−1)×(−2)?',
    choices: [
      { text: '+2 — each step up adds 2, so the pattern continues past zero', isCorrect: true },
      { text: '−2 — a negative times a negative stays negative', isCorrect: false, misconceptionId: `${NEG}:MC-2` },
      { text: '0 — the pattern stops at zero', isCorrect: false, misconceptionId: `${NEG}:MC-2` },
    ],
    targetedMisconceptions: [`${NEG}:MC-2`],
    source: eb(NEG, 'Misconception register — the pattern forces the sign rule'),
  },
  {
    conceptId: NEG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If x = −7, what is −x?',
    choices: [
      { text: '+7 — −x means "the opposite of x", not "a negative number"', isCorrect: true },
      { text: '−7 — the minus sign makes it negative', isCorrect: false, misconceptionId: `${NEG}:MC-3` },
      { text: '−14', isCorrect: false },
    ],
    targetedMisconceptions: [`${NEG}:MC-3`],
    source: eb(NEG, 'Transfer probe — the minus is an instruction to flip'),
  },

  // --- math.arith.absolute-value ------------------------------------------------------
  {
    conceptId: ABSV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is |−7|?',
    choices: [
      { text: '7 — it is seven steps from zero', isCorrect: true },
      { text: '−7', isCorrect: false, misconceptionId: `${ABSV}:MC-2` },
      { text: '0', isCorrect: false },
    ],
    targetedMisconceptions: [`${ABSV}:MC-2`],
    source: eb(ABSV, 'Assessment gate — distance from zero'),
  },
  {
    conceptId: ABSV, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'How many solutions does |x| = 5 have?',
    choices: [
      { text: 'Two — both 5 and −5 sit five steps from zero', isCorrect: true },
      { text: 'One — remove the bars and read off 5', isCorrect: false, misconceptionId: `${ABSV}:MC-1` },
      { text: 'None — absolute values cannot be set equal to a number', isCorrect: false },
    ],
    targetedMisconceptions: [`${ABSV}:MC-1`],
    source: eb(ABSV, 'Misconception register — distance, not sign removal'),
  },
  {
    conceptId: ABSV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How many solutions does |x| = −2 have?',
    choices: [
      { text: 'None — a distance is never negative, which you can see before doing any algebra', isCorrect: true },
      { text: 'Two, at 2 and −2', isCorrect: false, misconceptionId: `${ABSV}:MC-2` },
      { text: 'One, at −2', isCorrect: false, misconceptionId: `${ABSV}:MC-2` },
    ],
    targetedMisconceptions: [`${ABSV}:MC-2`],
    source: eb(ABSV, 'Transfer probe — an absolute value is never negative'),
  },

  // --- math.found.real-numbers ----------------------------------------------------------
  {
    conceptId: REAL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What distinguishes ℝ from ℚ?',
    choices: [
      { text: 'Completeness — every bounded set of reals has a least upper bound, so the line has no holes', isCorrect: true },
      { text: 'ℝ allows decimals and ℚ does not', isCorrect: false, misconceptionId: `${REAL}:MC-1` },
      { text: 'ℝ is infinite and ℚ is finite', isCorrect: false },
    ],
    targetedMisconceptions: [`${REAL}:MC-1`],
    source: eb(REAL, 'Assessment gate — completeness is the distinguishing property'),
  },
  {
    conceptId: REAL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Take every rational whose square is below 2. It is bounded above. Where is its least upper bound?',
    choices: [
      { text: 'At √2 — which is not rational, so ℚ has a gap exactly there', isCorrect: true },
      { text: 'At 1.41 — the largest rational in the set', isCorrect: false, misconceptionId: `${REAL}:MC-2` },
      { text: 'There is none; the set is unbounded', isCorrect: false, misconceptionId: `${REAL}:MC-2` },
    ],
    targetedMisconceptions: [`${REAL}:MC-2`],
    source: eb(REAL, 'Misconception register — the rationals are not complete'),
  },
  {
    conceptId: REAL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Are 0.999… and 1 two different real numbers?',
    choices: [
      { text: 'No — a decimal NAMES a point, and these are two names for one number', isCorrect: true },
      { text: 'Yes — they differ by an infinitely small amount', isCorrect: false, misconceptionId: `${REAL}:MC-1` },
      { text: 'Yes — a real number is its decimal expansion, and these expansions differ', isCorrect: false, misconceptionId: `${REAL}:MC-1` },
    ],
    targetedMisconceptions: [`${REAL}:MC-1`],
    source: eb(REAL, 'Transfer probe — a real is not its decimal expansion'),
  },

  // --- math.found.complex-numbers ----------------------------------------------------------
  {
    conceptId: CPLX, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is i defined to be?',
    choices: [
      { text: 'A number with i² = −1', isCorrect: true },
      { text: 'A symbol used to mark impossible answers', isCorrect: false, misconceptionId: `${CPLX}:MC-2` },
      { text: 'The square root of every negative number at once', isCorrect: false },
    ],
    targetedMisconceptions: [`${CPLX}:MC-2`],
    source: eb(CPLX, 'Assessment gate — i is defined by its square'),
  },
  {
    conceptId: CPLX, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You were taught √(−9) is undefined. Is that wrong?',
    choices: [
      { text: 'It was true over the REALS only — over ℂ it is 3i, and the qualifier was dropped when you first met the rule', isCorrect: true },
      { text: 'No — it is undefined everywhere; complex numbers are a separate notation', isCorrect: false, misconceptionId: `${CPLX}:MC-1` },
      { text: 'No — 3i is only an approximation to something undefined', isCorrect: false, misconceptionId: `${CPLX}:MC-1` },
    ],
    targetedMisconceptions: [`${CPLX}:MC-1`],
    source: eb(CPLX, 'Misconception register — undefined only over ℝ'),
  },
  {
    conceptId: CPLX, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What does multiplying a point by i do geometrically?',
    choices: [
      { text: 'Rotates it 90° — which is why doing it twice gives −1, a half turn', isCorrect: true },
      { text: 'Nothing geometric; i is only a bookkeeping device', isCorrect: false, misconceptionId: `${CPLX}:MC-2` },
      { text: 'Reflects it in the real axis', isCorrect: false, misconceptionId: `${CPLX}:MC-3` },
    ],
    targetedMisconceptions: [`${CPLX}:MC-2`, `${CPLX}:MC-3`],
    source: eb(CPLX, 'Transfer probe — i is a rotation, not a placeholder'),
  },

  // --- math.found.generalization -------------------------------------------------------------
  {
    conceptId: GEN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: '1+3 = 4, 1+3+5 = 9, 1+3+5+7 = 16. What generalization do these suggest?',
    choices: [
      { text: 'The first n odd numbers sum to n²', isCorrect: true },
      { text: 'Every sum of odd numbers is even', isCorrect: false },
      { text: 'Nothing — three cases suggest nothing at all', isCorrect: false },
    ],
    targetedMisconceptions: [`${GEN}:MC-1`],
    source: eb(GEN, 'Assessment gate — spotting the invariant'),
  },
  {
    conceptId: GEN, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You test a claim about integers on 2, 4, 6 and 8, and it holds. How much is established?',
    choices: [
      { text: 'Very little — the cases are too similar; nothing was learnt about odd, negative or zero', isCorrect: true },
      { text: 'A great deal — four confirming cases is substantial evidence', isCorrect: false, misconceptionId: `${GEN}:MC-2` },
      { text: 'Everything — the claim is proved for integers', isCorrect: false, misconceptionId: `${GEN}:MC-1` },
    ],
    targetedMisconceptions: [`${GEN}:MC-2`],
    source: eb(GEN, 'Misconception register — variation matters more than volume'),
  },
  {
    conceptId: GEN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Two problems look very similar on the page. Do they generalize the same way?',
    choices: [
      { text: 'Not necessarily — the invariant structure has to be identified, and problems that look nothing alike can be the same underneath', isCorrect: true },
      { text: 'Yes — similar appearance means similar structure', isCorrect: false, misconceptionId: `${GEN}:MC-3` },
      { text: 'Yes, provided they use the same operations', isCorrect: false, misconceptionId: `${GEN}:MC-3` },
    ],
    targetedMisconceptions: [`${GEN}:MC-3`],
    source: eb(GEN, 'Transfer probe — surface similarity is not shared structure'),
  },

  // --- math.found.mathematical-modeling --------------------------------------------------------
  {
    conceptId: MODEL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What are the three legs of a modelling round trip?',
    choices: [
      { text: 'Translate into mathematics, solve, translate back and check it makes sense', isCorrect: true },
      { text: 'Translate into mathematics and solve', isCorrect: false, misconceptionId: `${MODEL}:MC-1` },
      { text: 'Collect data, fit a curve, publish', isCorrect: false },
    ],
    targetedMisconceptions: [`${MODEL}:MC-1`],
    source: eb(MODEL, 'Assessment gate — interpretation is part of the work'),
  },
  {
    conceptId: MODEL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Your model says you need 2.3 buses. What is the answer?',
    choices: [
      { text: '3 — the mathematics is right and buses do not come in tenths, which is what interpretation catches', isCorrect: true },
      { text: '2.3 — that is what the mathematics gives', isCorrect: false, misconceptionId: `${MODEL}:MC-1` },
      { text: '2 — round to the nearest whole number', isCorrect: false, misconceptionId: `${MODEL}:MC-1` },
    ],
    targetedMisconceptions: [`${MODEL}:MC-1`],
    source: eb(MODEL, 'Misconception register — the mathematical solution is not the final answer'),
  },
  {
    conceptId: MODEL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is a projectile model that includes air resistance better than one that ignores it?',
    choices: [
      { text: 'It depends on the question — better for a parachute, needless complication for a thrown ball', isCorrect: true },
      { text: 'Yes — a more detailed model is always better', isCorrect: false, misconceptionId: `${MODEL}:MC-3` },
      { text: 'Yes — there is one correct model of any real situation', isCorrect: false, misconceptionId: `${MODEL}:MC-2` },
    ],
    targetedMisconceptions: [`${MODEL}:MC-2`, `${MODEL}:MC-3`],
    source: eb(MODEL, 'Transfer probe — fit the model to the question'),
  },

  // --- math.alg.polynomial --------------------------------------------------------------------
  {
    conceptId: POLY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the degree of 4x³ − 2x + 7?',
    choices: [
      { text: '3 — the highest power present', isCorrect: true },
      { text: '7 — the largest number in it', isCorrect: false, misconceptionId: `${POLY}:MC-1` },
      { text: '4 — the leading coefficient', isCorrect: false, misconceptionId: `${POLY}:MC-1` },
    ],
    targetedMisconceptions: [`${POLY}:MC-1`],
    source: eb(POLY, 'Assessment gate — degree is the highest power, not the largest coefficient'),
  },
  {
    conceptId: POLY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is 5x² a polynomial, given it has only one term?',
    choices: [
      { text: 'Yes — "polynomial" describes the form, not a minimum number of terms; even the constant 7 qualifies', isCorrect: true },
      { text: 'No — "poly" means many, so it needs several terms', isCorrect: false, misconceptionId: `${POLY}:MC-2` },
      { text: 'No — it is a monomial, which is a different kind of object', isCorrect: false, misconceptionId: `${POLY}:MC-2` },
    ],
    targetedMisconceptions: [`${POLY}:MC-2`],
    source: eb(POLY, 'Misconception register — a monomial is a polynomial'),
  },
  {
    conceptId: POLY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is 3/x a polynomial?',
    choices: [
      { text: 'No — it is 3x⁻¹, and exponents must be non-negative integers', isCorrect: true },
      { text: 'Yes — it is a number divided by a variable, which is a valid term', isCorrect: false, misconceptionId: `${POLY}:MC-3` },
      { text: 'Yes — of degree −1', isCorrect: false, misconceptionId: `${POLY}:MC-3` },
    ],
    targetedMisconceptions: [`${POLY}:MC-3`],
    source: eb(POLY, 'Transfer probe — negative exponents disqualify'),
  },

  // --- math.alg.exponent-rules -------------------------------------------------------------------
  {
    conceptId: AEXP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is (a + b)²?',
    choices: [
      { text: 'a² + 2ab + b² — the 2ab is a real quantity, not a technicality', isCorrect: true },
      { text: 'a² + b² — the exponent distributes over the addition', isCorrect: false, misconceptionId: `${AEXP}:MC-1` },
      { text: 'a² × b²', isCorrect: false, misconceptionId: `${AEXP}:MC-1` },
    ],
    targetedMisconceptions: [`${AEXP}:MC-1`],
    source: eb(AEXP, 'Assessment gate — exponents do not distribute over addition'),
  },
  {
    conceptId: AEXP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What is a^½, and why?',
    choices: [
      { text: '√a — because (a^½)² must equal a^1 for the power rule to survive, which leaves no other option', isCorrect: true },
      { text: 'a ÷ 2 — a fractional exponent means division', isCorrect: false, misconceptionId: `${AEXP}:MC-3` },
      { text: 'Half of a', isCorrect: false, misconceptionId: `${AEXP}:MC-3` },
    ],
    targetedMisconceptions: [`${AEXP}:MC-3`],
    source: eb(AEXP, 'Misconception register — fractional exponents are roots, not division'),
  },
  {
    conceptId: AEXP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Were a⁰ = 1 and a⁻ⁿ = 1/aⁿ chosen by convention?',
    choices: [
      { text: 'No — they are forced: any other value would break the exponent laws everywhere else they are used', isCorrect: true },
      { text: 'Yes — they are arbitrary definitions adopted for tidiness', isCorrect: false, misconceptionId: `${AEXP}:MC-2` },
      { text: 'Yes — they only apply where the laws are being used deliberately', isCorrect: false, misconceptionId: `${AEXP}:MC-2` },
    ],
    targetedMisconceptions: [`${AEXP}:MC-2`],
    source: eb(AEXP, 'Transfer probe — the extension is forced, not chosen'),
  },
]
