/**
 * Fourth math.calc asset batch — the product rule, critical points, and
 * the increasing/decreasing test.
 *
 * Continues serving-asset coverage for math.calc (13/76 -> 16/76).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.calc.product-rule.md,
 * math.calc.critical-points.md, and math.calc.increasing-decreasing.md.
 *
 *   PRODRULE     product-rule — (fg)'=f'g+fg' is TWO terms, never
 *                f'g' (the sum rule's clean distributivity never extends
 *                to products); the rule is not restricted to exactly two
 *                named factors — extra factors are handled by grouping
 *                into a single "chunk" and re-applying; the rule is a
 *                tool for products that CANNOT be simplified into one
 *                term first, never a mandatory first step over direct
 *                simplification.
 *   CRITPTS      critical-points — a critical point requires TWO separate
 *                searches (f'(c)=0 OR f'(c) undefined), never just one;
 *                a critical point is only a CANDIDATE for a local extremum
 *                (Fermat's theorem runs one direction only) — x³ at x=0
 *                is the standing counterexample; a point must already be
 *                IN THE DOMAIN of f before it can be a critical point,
 *                never a point where f itself is undefined.
 *   INCDEC       increasing-decreasing — the test is DERIVED from the MVT,
 *                never an independent fact to memorize; a critical point
 *                does NOT automatically interrupt monotonicity — check
 *                whether the sign of f' actually changes on both sides,
 *                since some critical points (like x³ at 0) leave
 *                monotonicity unbroken; testing one sample point per
 *                critical-point-bounded interval is a genuine logical
 *                guarantee (via the IVT), never a shortcut requiring
 *                exhaustive re-testing.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const PRODRULE = 'math.calc.product-rule'
const CRITPTS = 'math.calc.critical-points'
const INCDEC = 'math.calc.increasing-decreasing'

export const MATHEMATICS_CALCULUS_PRODUCT_RULE_CRITICAL_POINTS_INC_DEC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PRODRULE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The Product Rule states (fg)\'(x)=f\'(x)g(x)+f(x)g\'(x) — TWO TERMS, each pairing one '
      + 'function\'s DERIVATIVE with the OTHER function\'s ORIGINAL (undifferentiated) value, added '
      + 'together. This is NEVER f\'g\' — the sum rule\'s clean term-by-term distributivity does not '
      + 'extend to products; sums and products behave differently under differentiation.\n\n'
      + 'NOT EVERY PRODUCT-SHAPED EXPRESSION NEEDS THIS RULE. Many products SIMPLIFY into a single '
      + 'term before differentiating is even necessary — x²·x³=x⁵ needs only the power rule. The '
      + 'Product Rule becomes genuinely NECESSARY when the two factors cannot be algebraically '
      + 'combined into one simpler expression — it is a tool of last resort for products, never a '
      + 'mandatory first step over checking whether direct simplification suffices.\n\n'
      + 'THE RULE EXTENDS BEYOND EXACTLY TWO NAMED FACTORS. For three factors fgh, GROUP the last two '
      + 'together as a single "chunk" G=gh, apply the two-factor rule once to f·G, then apply the '
      + 'SAME rule again inside G itself — the rule never actually needs more than two pieces at a '
      + 'time, however many factors are genuinely present.',
    targetedMisconceptions: [`${PRODRULE}:MC-1`, `${PRODRULE}:MC-2`, `${PRODRULE}:MC-3`],
    source: eb(PRODRULE, 'Core Understanding — the Product Rule is two terms never f\'g\', extends to any number of factors via grouping, and is necessary only when direct simplification is unavailable'),
  },
  {
    conceptId: CRITPTS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A critical point of f is a value c, IN THE DOMAIN of f, where EITHER the tangent is horizontal '
      + '(f\'(c)=0) OR no well-defined tangent exists (f\'(c) is undefined). FINDING ALL CRITICAL '
      + 'POINTS GENUINELY REQUIRES TWO SEPARATE SEARCHES, not one: solving f\'(x)=0 finds the "smooth '
      + 'flat" ones, and SEPARATELY checking where f\'(x) fails to exist finds the "non-smooth" ones '
      + '(corners, cusps, vertical tangents) — a function like f(x)=|x-2|+1, whose derivative is '
      + 'never literally zero anywhere it exists, still has a critical point at x=2, found only by '
      + 'the second search.\n\n'
      + 'A CRITICAL POINT IS ONLY A CANDIDATE FOR A LOCAL EXTREMUM, NEVER A GUARANTEE. Fermat\'s '
      + 'theorem runs in one direction only: every local extremum is a critical point, but NOT every '
      + 'critical point is a local extremum. f(x)=x³ at x=0 is the standing counterexample: '
      + 'f\'(x)=3x²=0 there, yet f is increasing on both sides — neither a max nor a min, an '
      + 'inflection point with a flat tangent.\n\n'
      + 'A CRITICAL POINT MUST ALREADY BE IN THE DOMAIN OF f. A value where f isn\'t even defined '
      + '(like x=0 for f(x)=1/x) is never a critical point, no matter how badly a derivative-like '
      + 'expression misbehaves there — the derivative-undefined condition never gets a chance to '
      + 'apply at a point outside f\'s own domain.',
    targetedMisconceptions: [`${CRITPTS}:MC-1`, `${CRITPTS}:MC-2`, `${CRITPTS}:MC-3`],
    source: eb(CRITPTS, 'Core Understanding — finding all critical points requires two separate searches, a critical point is only a candidate for an extremum never a guarantee, and a point must be in f\'s own domain to qualify'),
  },
  {
    conceptId: INCDEC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The increasing/decreasing test (f\'(x)>0 throughout an interval implies f is increasing there; '
      + 'f\'(x)<0 implies decreasing) is NOT a standalone fact — it is DERIVED DIRECTLY FROM THE MEAN '
      + 'VALUE THEOREM. For any x₁<x₂ in an interval where f\' is positive throughout, the MVT '
      + 'guarantees some c between them with f\'(c)=[f(x₂)-f(x₁)]/(x₂-x₁); since f\'(c) is positive '
      + 'and x₂-x₁>0, this forces f(x₂)-f(x₁)>0 — exactly the definition of increasing.\n\n'
      + 'A CRITICAL POINT DOES NOT AUTOMATICALLY INTERRUPT MONOTONICITY. Whether it does depends on '
      + 'whether the SIGN of f\' actually changes on both sides — never merely whether a critical '
      + 'point is present. f(x)=x³ at x=0 is the standing counterexample: f\'(x)=3x²≥0 everywhere, '
      + 'touching zero only at x=0 without ever going negative, so the function\'s increasing behavior '
      + 'on all of ℝ is genuinely unbroken across that critical point.\n\n'
      + 'TESTING ONE SAMPLE POINT PER CRITICAL-POINT-BOUNDED INTERVAL IS A GENUINE LOGICAL GUARANTEE, '
      + 'never a shortcut taken on faith. Since f\' is continuous between consecutive critical points, '
      + 'a sign change strictly between two of them would, by the Intermediate Value Theorem, force '
      + 'f\' through zero somewhere in between — which would itself BE another critical point, '
      + 'contradicting that the two chosen were consecutive. So the sign of f\' is guaranteed constant '
      + 'on each sub-interval, and exhaustive re-testing within a single sub-interval is never needed.',
    targetedMisconceptions: [`${INCDEC}:MC-1`, `${INCDEC}:MC-2`, `${INCDEC}:MC-3`],
    source: eb(INCDEC, 'Core Understanding — the increasing/decreasing test is derived from the MVT, a critical point interrupts monotonicity only if the sign of f\' actually changes, and one sample point per interval is a genuine IVT-backed guarantee'),
  },
]

export const MATHEMATICS_CALCULUS_PRODUCT_RULE_CRITICAL_POINTS_INC_DEC_PROBES: SeedProbe[] = [
  // --- math.calc.product-rule -----------------------------------------------------
  {
    conceptId: PRODRULE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For y=x²sin(x), is d/dx[x²sin(x)] equal to (2x)(cos x), obtained by multiplying the two individual derivatives?',
    choices: [
      { text: 'No — the Product Rule gives TWO terms: 2x·sin(x)+x²·cos(x), never the single product of the two individual derivatives', isCorrect: true },
      { text: 'Yes — (fg)\'=f\'g\' is the correct rule for differentiating a product', isCorrect: false, misconceptionId: `${PRODRULE}:MC-1` },
      { text: 'Yes, since the Product Rule mirrors the sum rule\'s clean term-by-term behavior', isCorrect: false, misconceptionId: `${PRODRULE}:MC-1` },
    ],
    targetedMisconceptions: [`${PRODRULE}:MC-1`],
    source: eb(PRODRULE, 'Detection probe (Blueprint A01) — the Product Rule is two terms, one derivative times the other function\'s original value each way, added; never the single product f\'g\''),
  },
  {
    conceptId: PRODRULE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Can the Product Rule be applied to a product of THREE factors, y=x·eˣ·sin(x)?',
    choices: [
      { text: 'Yes — group the last two factors together as a single chunk G=eˣ·sin(x), apply the two-factor rule to x·G, then apply the rule again inside G', isCorrect: true },
      { text: 'No — the Product Rule only works for exactly two named factors, matching its textbook formula', isCorrect: false, misconceptionId: `${PRODRULE}:MC-2` },
      { text: 'No, since a genuinely different rule is needed once more than two factors are multiplied together', isCorrect: false, misconceptionId: `${PRODRULE}:MC-2` },
    ],
    targetedMisconceptions: [`${PRODRULE}:MC-2`],
    source: eb(PRODRULE, 'Detection probe (Blueprint A03) — the Product Rule is never restricted to exactly two named factors; grouping extra factors into a chunk extends it to any number of factors'),
  },
  {
    conceptId: PRODRULE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'To differentiate (3x²)(4x⁵), should you apply the full Product Rule as the first step?',
    choices: [
      { text: 'Not necessarily — the product simplifies directly to 12x⁷ first, so the power rule alone suffices; the Product Rule would give the same answer but with unnecessary extra work', isCorrect: true },
      { text: 'Yes — any product-shaped expression must always be differentiated using the Product Rule as a mandatory first step', isCorrect: false, misconceptionId: `${PRODRULE}:MC-3` },
      { text: 'Yes, since simplifying before differentiating is never a valid shortcut for products', isCorrect: false, misconceptionId: `${PRODRULE}:MC-3` },
    ],
    targetedMisconceptions: [`${PRODRULE}:MC-3`],
    source: eb(PRODRULE, 'Detection probe (Blueprint B03) — the Product Rule is a tool for products that cannot be simplified first, never a mandatory first step over checking for direct simplification'),
  },

  // --- math.calc.critical-points ----------------------------------------------------
  {
    conceptId: CRITPTS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Find all critical points of f(x)=|x-2|+1 by solving only f\'(x)=0.',
    choices: [
      { text: 'This search alone misses x=2, a genuine critical point where f\'(x) is undefined (a corner) — a second, separate search for where the derivative fails to exist is also required', isCorrect: true },
      { text: 'There are no critical points, since f\'(x)=0 has no solutions for this function', isCorrect: false, misconceptionId: `${CRITPTS}:MC-2` },
      { text: 'The search is complete once f\'(x)=0 has been checked; critical points can only come from that one equation', isCorrect: false, misconceptionId: `${CRITPTS}:MC-2` },
    ],
    targetedMisconceptions: [`${CRITPTS}:MC-2`],
    source: eb(CRITPTS, 'Detection probe (Blueprint A02) — finding all critical points always requires two separate searches: where f\'(x)=0 AND where f\'(x) is undefined, never just the first alone'),
  },
  {
    conceptId: CRITPTS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For f(x)=x³, f\'(0)=0, so x=0 is a critical point. Is x=0 necessarily a local max or min?',
    choices: [
      { text: 'No — f is increasing on both sides of x=0, so this critical point is neither a max nor a min; critical points are only candidates, never a guarantee of an extremum', isCorrect: true },
      { text: 'Yes — since f\'(0)=0, x=0 must be a local maximum or minimum by definition', isCorrect: false, misconceptionId: `${CRITPTS}:MC-1` },
      { text: 'Yes, since every point where the derivative equals zero is automatically a local extremum', isCorrect: false, misconceptionId: `${CRITPTS}:MC-1` },
    ],
    targetedMisconceptions: [`${CRITPTS}:MC-1`],
    source: eb(CRITPTS, 'Detection probe (Blueprint A01) — a critical point is only a candidate for a local extremum, never a guarantee; x³ at 0 is the standing counterexample where the critical point is neither a max nor a min'),
  },
  {
    conceptId: CRITPTS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is x=0 a critical point of f(x)=1/x, since the derivative "blows up" there?',
    choices: [
      { text: 'No — f itself is not even defined at x=0, so x=0 is not in the domain of f and cannot be a critical point regardless of how the derivative behaves there', isCorrect: true },
      { text: 'Yes — any point where the derivative becomes unbounded or undefined automatically qualifies as a critical point', isCorrect: false, misconceptionId: `${CRITPTS}:MC-3` },
      { text: 'Yes, since the derivative-undefined category of critical points applies specifically to points like this one', isCorrect: false, misconceptionId: `${CRITPTS}:MC-3` },
    ],
    targetedMisconceptions: [`${CRITPTS}:MC-3`],
    source: eb(CRITPTS, 'Detection probe (Blueprint B03) — a critical point must first be in the domain of f itself; a point where f is not even defined can never be a critical point, no matter how the derivative-like expression behaves'),
  },

  // --- math.calc.increasing-decreasing ------------------------------------------------
  {
    conceptId: INCDEC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'f(x)=x³ has a critical point at x=0. Does this critical point interrupt the function\'s increasing behavior on ℝ?',
    choices: [
      { text: 'No — f\'(x)=3x²≥0 everywhere, never going negative on either side of 0, so the sign of f\' does not actually change there and monotonicity remains unbroken', isCorrect: true },
      { text: 'Yes — since there is a critical point at x=0, the function\'s monotonicity must switch there', isCorrect: false, misconceptionId: `${INCDEC}:MC-1` },
      { text: 'Yes, since any critical point necessarily marks a transition between increasing and decreasing behavior', isCorrect: false, misconceptionId: `${INCDEC}:MC-1` },
    ],
    targetedMisconceptions: [`${INCDEC}:MC-1`],
    source: eb(INCDEC, 'Detection probe (Blueprint A01) — a critical point interrupts monotonicity only if the sign of f\' actually changes on both sides, never merely because a critical point is present'),
  },
  {
    conceptId: INCDEC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Performing sign analysis on f(x)=x³-3x, you\'ve tested one sample point in a critical-point-bounded interval and found f\'>0 there. Do you need to test additional points within that SAME interval to be sure?',
    choices: [
      { text: 'No — since f\' is continuous and consecutive critical points bound the interval, a sign change strictly inside would itself create another critical point, contradicting consecutiveness; one point is genuinely sufficient', isCorrect: true },
      { text: 'Yes — testing multiple points within the same interval is necessary to confirm the sign is truly constant throughout', isCorrect: false, misconceptionId: `${INCDEC}:MC-2` },
      { text: 'Yes, since the one-point shortcut is only a rough approximation, not a guaranteed result', isCorrect: false, misconceptionId: `${INCDEC}:MC-2` },
    ],
    targetedMisconceptions: [`${INCDEC}:MC-2`],
    source: eb(INCDEC, 'Detection probe (Blueprint A02) — testing one sample point per critical-point-bounded interval is a genuine IVT-backed logical guarantee, never a shortcut requiring exhaustive re-testing'),
  },
  {
    conceptId: INCDEC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Asked to justify WHY "f\'(x)>0 throughout an interval implies f is increasing there," is it sufficient to simply restate the rule itself?',
    choices: [
      { text: 'No — the test is a direct consequence of the Mean Value Theorem: for any x₁<x₂, the MVT guarantees some c with f\'(c)=[f(x₂)-f(x₁)]/(x₂-x₁), and f\'(c)>0 forces f(x₂)>f(x₁)', isCorrect: true },
      { text: 'Yes — restating "if f\' is positive, f is increasing" is itself a complete justification for why the test holds', isCorrect: false, misconceptionId: `${INCDEC}:MC-3` },
      { text: 'Yes, since the test is an independent, standalone fact that does not derive from any other theorem', isCorrect: false, misconceptionId: `${INCDEC}:MC-3` },
    ],
    targetedMisconceptions: [`${INCDEC}:MC-3`],
    source: eb(INCDEC, 'Detection probe — the increasing/decreasing test is not a standalone fact but a proven consequence of the Mean Value Theorem, and justifying it requires reproducing that MVT-based argument, never merely restating the rule'),
  },
]
