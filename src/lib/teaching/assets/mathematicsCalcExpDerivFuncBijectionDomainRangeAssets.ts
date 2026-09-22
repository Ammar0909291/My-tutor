/**
 * Batch: derivative of the exponential function (math.calc), bijection and
 * domain/range (math.func).
 *
 * Continues serving-asset coverage for math.calc (61/76 -> 62/76) and
 * math.func (3/29 -> 5/29). math.calc.derivative-exponential became ready
 * the instant math.func.exponential-function (prior batch) was served.
 * math.func.bijection became ready the instant math.func.injectivity and
 * math.func.surjectivity (prior batch) were both served, and itself
 * unlocks math.func.inverse-functions next, the direct path toward
 * unblocking math.calc.derivative-ln and math.calc.derivative-inverse-trig.
 * math.func.domain-range is a foundational math.func concept, immediately
 * ready off math.func.function-concept alone.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.calc.derivative-exponential.md,
 * math.func.bijection.md, and math.func.domain-range.md.
 *
 *   DERIVEXP  derivative-exponential — ONLY e^x is its own derivative;
 *             every other base a needs the extra multiplicative factor
 *             ln(a), never omitted; when the exponent is itself a
 *             function of x, the Chain Rule's inner-derivative factor is
 *             required on top, never dropped. Only 2 misconceptions in
 *             the EB entry: MC-1 (missing ln(a) factor, "Foundational")
 *             gets FOUNDATIONAL and DEVELOPING, MC-2 (missing chain-rule
 *             factor, also "Foundational") gets PROFICIENT.
 *   BIJECTION bijection — bijective requires BOTH injective and
 *             surjective simultaneously, never either alone; the joint
 *             consequence is EXACTLY one preimage (at least one from
 *             surjectivity, at most one from injectivity), never merely
 *             "at least one"; swapping a function's arrows only produces
 *             a genuine inverse FUNCTION when the original was actually
 *             bijective, never automatically.
 *   DOMRANGE  domain-range — domain is found by algebraic restriction,
 *             range by structural reasoning — never the same method for
 *             both; domain and range are independent sets, never assumed
 *             equal by default; a composition's domain requires BOTH the
 *             inner function's own domain AND the inner output landing in
 *             the outer function's domain, never just one check.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const DERIVEXP = 'math.calc.derivative-exponential'
const BIJECTION = 'math.func.bijection'
const DOMRANGE = 'math.func.domain-range'

export const MATHEMATICS_CALC_EXP_DERIV_FUNC_BIJECTION_DOMAIN_RANGE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DERIVEXP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The exponential function e^x has a genuinely unique property among all exponential bases: '
      + 'd/dx[e^x]=e^x — it is its own derivative. For a GENERAL base a>0, the rule is '
      + 'd/dx[a^x]=a^x·ln(a) — an extra multiplicative factor of ln(a) appears, and this extra '
      + 'factor is NOT optional; it is mathematically required for every base other than e. Since '
      + 'ln(e)=1, substituting a=e into the general rule gives e^x·1=e^x, recovering the simpler '
      + 'special case exactly.\n\n'
      + 'When the EXPONENT is itself a function of x (not bare x), the Chain Rule applies on top '
      + 'of this: d/dx[e^(g(x))]=e^(g(x))·g\'(x) — the exponential function\'s value stays '
      + 'structurally the same, multiplied by the derivative of whatever is in the exponent, and '
      + 'this inner-derivative factor g\'(x) is never dropped.',
    targetedMisconceptions: [`${DERIVEXP}:MC-1`, `${DERIVEXP}:MC-2`],
    source: eb(DERIVEXP, 'Core Understanding — only e^x is its own derivative, every other base needs the ln(a) factor, and a function exponent requires the chain-rule factor on top'),
  },
  {
    conceptId: BIJECTION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A function f:A→B is BIJECTIVE exactly when it is BOTH injective AND surjective at once. '
      + 'Verifying bijectivity means running BOTH prerequisites\' own established checks on the '
      + 'SAME function — confirm no two domain elements share an output (injective), and confirm '
      + 'every codomain element is hit (surjective). Neither check substitutes for the other; a '
      + 'function satisfying only one is not bijective, however well it satisfies that one '
      + 'property.\n\n'
      + 'THE JOINT CONSEQUENCE IS EXACTLY ONE PREIMAGE, NOT MERELY "AT LEAST ONE": surjectivity '
      + 'alone guarantees every b∈B has AT LEAST one preimage. Injectivity alone guarantees no '
      + 'output is shared by two different inputs. Combined, they guarantee every b∈B has EXACTLY '
      + 'one preimage.\n\n'
      + 'BIJECTIVITY IS EXACTLY THE CONDITION FOR A GENUINE INVERSE FUNCTION: for the "swap the '
      + 'arrows" candidate f⁻¹(b)=a to be a genuine, well-defined FUNCTION, every b∈B must have '
      + 'SOME a mapping to it (surjectivity, or f⁻¹ is undefined somewhere) AND at most one such a '
      + '(injectivity, or f⁻¹(b) would have to equal two different things at once). Only when BOTH '
      + 'hold does f⁻¹ exist as a well-defined function — the swap never automatically succeeds.',
    targetedMisconceptions: [`${BIJECTION}:MC-1`, `${BIJECTION}:MC-2`, `${BIJECTION}:MC-3`],
    source: eb(BIJECTION, 'Core Understanding — bijective requires both properties simultaneously, the joint consequence is exactly one preimage, and a genuine inverse function exists only when the original was bijective'),
  },
  {
    conceptId: DOMRANGE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'DOMAIN IS FOUND BY ALGEBRAIC RESTRICTION: the domain is the set of all valid inputs, found '
      + 'by identifying what values of x make the function\'s formula well-defined. Three natural '
      + 'restriction types recur: denominators cannot equal zero; even-root radicands must be '
      + 'non-negative; logarithm arguments must be strictly positive. For a composite expression, '
      + 'restrictions are found by working INSIDE-OUT, chaining each operation\'s own '
      + 'requirement.\n\n'
      + 'RANGE IS FOUND BY STRUCTURAL REASONING, NOT SAMPLING: the range is the set of actual '
      + 'outputs — a genuinely different kind of question from domain-finding. Plugging in a '
      + 'handful of x-values only SAMPLES the range; it never proves the full set of achievable '
      + 'outputs (sin(x) has range exactly [-1,1], never wider, no matter which finite sample is '
      + 'checked). The reliable method reasons about the function\'s STRUCTURE: minimum/maximum '
      + 'output, whether every value in between is achieved, and whether boundary values are '
      + 'actually ACHIEVED or only ever approached.\n\n'
      + 'DOMAIN OF A COMPOSITION REQUIRES TWO CONDITIONS, NOT ONE: for (f∘g)(x)=f(g(x)), a value '
      + 'x is in the composition\'s domain if and only if BOTH x is in the domain of g itself, '
      + 'AND g(x) — the inner function\'s OUTPUT — lands in the domain of f. The outer function\'s '
      + 'restriction applies to what it actually receives (g(x)), never to x directly.',
    targetedMisconceptions: [`${DOMRANGE}:MC-1`, `${DOMRANGE}:MC-2`, `${DOMRANGE}:MC-3`],
    source: eb(DOMRANGE, 'Core Understanding — domain uses algebraic restriction, range uses structural reasoning never sampling, and a composition\'s domain requires both the inner domain and the outer domain of the inner output'),
  },
]

export const MATHEMATICS_CALC_EXP_DERIV_FUNC_BIJECTION_DOMAIN_RANGE_PROBES: SeedProbe[] = [
  // --- math.calc.derivative-exponential ------------------------------------------
  {
    conceptId: DERIVEXP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A student computes d/dx[3^x] as simply 3^x, with no extra factor. Is this correct?',
    choices: [
      { text: 'No — the correct derivative is 3^x·ln(3); only e^x is its own derivative with no extra factor, and every other base genuinely requires the ln(a) factor', isCorrect: true },
      { text: 'Yes — every exponential function differentiates to itself, just with different letters for the base', isCorrect: false, misconceptionId: `${DERIVEXP}:MC-1` },
      { text: 'Yes, since the extra ln(a) factor is only needed for bases smaller than e, not larger ones like 3', isCorrect: false, misconceptionId: `${DERIVEXP}:MC-1` },
    ],
    targetedMisconceptions: [`${DERIVEXP}:MC-1`],
    source: eb(DERIVEXP, 'Detection probe (Blueprint B01 P41) — present the 3^x case and check whether ln3 is included'),
  },
  {
    conceptId: DERIVEXP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Why does e^x need no extra factor in its derivative, while 5^x needs an extra ln(5)?',
    choices: [
      { text: 'Because ln(e)=1, so substituting a=e into the general rule a^x·ln(a) gives e^x·1=e^x — the factor becomes 1 and vanishes from view, uniquely among all bases', isCorrect: true },
      { text: 'e^x is simply a special exception with no deeper explanation connecting it to the general rule for other bases', isCorrect: false, misconceptionId: `${DERIVEXP}:MC-1` },
      { text: 'The general rule a^x·ln(a) does not actually apply to e^x at all, since e^x follows a completely separate rule', isCorrect: false, misconceptionId: `${DERIVEXP}:MC-1` },
    ],
    targetedMisconceptions: [`${DERIVEXP}:MC-1`],
    source: eb(DERIVEXP, 'Repair Action B01 — re-derive a^x=e^(x ln a) and apply the Chain Rule directly, showing algebraically where the ln(a) factor originates'),
  },
  {
    conceptId: DERIVEXP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Will differentiating e^(3x²) give just e^(3x²), or does something extra need to be multiplied in?',
    choices: [
      { text: 'Something extra: d/dx[e^(3x²)]=e^(3x²)·6x — the exponent 3x² is a function of x, so the Chain Rule\'s inner-derivative factor (6x) must be multiplied in, never dropped', isCorrect: true },
      { text: 'Just e^(3x²) — the exponential factor alone is the complete derivative regardless of what the exponent contains', isCorrect: false, misconceptionId: `${DERIVEXP}:MC-2` },
      { text: 'Just e^(3x²), since the Chain Rule only applies to composite functions built from non-exponential outer functions', isCorrect: false, misconceptionId: `${DERIVEXP}:MC-2` },
    ],
    targetedMisconceptions: [`${DERIVEXP}:MC-2`],
    source: eb(DERIVEXP, 'Detection probe (Blueprint B02 P41) — present a composite exponential and check whether the inner-derivative factor is included'),
  },

  // --- math.func.bijection ------------------------------------------
  {
    conceptId: BIJECTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is an injective function automatically bijective?',
    choices: [
      { text: 'No — bijective requires BOTH injective and surjective simultaneously; a function like g:{1,2}→{a,b,c} with g(1)=a,g(2)=b is injective but not surjective (c has no preimage), so it is not bijective', isCorrect: true },
      { text: 'Yes — injectivity alone is sufficient for bijectivity', isCorrect: false, misconceptionId: `${BIJECTION}:MC-1` },
      { text: 'Yes, since injectivity automatically implies surjectivity for any function', isCorrect: false, misconceptionId: `${BIJECTION}:MC-1` },
    ],
    targetedMisconceptions: [`${BIJECTION}:MC-1`],
    source: eb(BIJECTION, 'Detection probe — is an injective function automatically bijective'),
  },
  {
    conceptId: BIJECTION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Every codomain element having at least one preimage sounds like a perfect match. Is "at least one" the same guarantee as "exactly one"?',
    choices: [
      { text: 'No — "at least one" comes from surjectivity alone; "exactly one" additionally needs injectivity\'s "at most one" contribution, and only the combination gives the genuine perfect-pairing guarantee', isCorrect: true },
      { text: 'Yes — if every codomain element has at least one preimage, that alone is enough for a perfect one-to-one correspondence', isCorrect: false, misconceptionId: `${BIJECTION}:MC-2` },
      { text: 'Yes, since surjectivity by itself already rules out any codomain element having more than one preimage', isCorrect: false, misconceptionId: `${BIJECTION}:MC-2` },
    ],
    targetedMisconceptions: [`${BIJECTION}:MC-2`],
    source: eb(BIJECTION, 'Discovery Question 2 — every codomain element having at least one preimage sounds like a perfect match; is at least one the same guarantee as exactly one'),
  },
  {
    conceptId: BIJECTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If I try to build an inverse by swapping a function\'s arrows, does that always give me a valid function, regardless of whether the original was bijective?',
    choices: [
      { text: 'No — for h:{1,2,3}→{a,b} with h(1)=a,h(2)=a,h(3)=b (surjective but not injective), "h⁻¹(a)" would have to equal both 1 and 2 at once — not a function at all; the swap only succeeds when the original was genuinely bijective', isCorrect: true },
      { text: 'Yes — swapping a function\'s domain and codomain roles always produces a valid inverse function', isCorrect: false, misconceptionId: `${BIJECTION}:MC-3` },
      { text: 'Yes, since any relation obtained by reversing arrows automatically satisfies the definition of a function', isCorrect: false, misconceptionId: `${BIJECTION}:MC-3` },
    ],
    targetedMisconceptions: [`${BIJECTION}:MC-3`],
    source: eb(BIJECTION, 'Discovery Question 3 — if I try to build an inverse by swapping a function\'s arrows, does that always give me a valid function'),
  },

  // --- math.func.domain-range ------------------------------------------
  {
    conceptId: DOMRANGE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For f(x)=x, domain and range are both all real numbers. Does this mean domain always equals range for every function?',
    choices: [
      { text: 'No — for f(x)=x² domain=ℝ but range=[0,∞), since squaring never produces a negative result; domain-equals-range is a coincidence of specific functions like the identity, not a general law', isCorrect: true },
      { text: 'Yes — domain and range are always the same set for any function', isCorrect: false, misconceptionId: `${DOMRANGE}:MC-1` },
      { text: 'Yes, since every function\'s formula produces the same set of values it accepts as inputs', isCorrect: false, misconceptionId: `${DOMRANGE}:MC-1` },
    ],
    targetedMisconceptions: [`${DOMRANGE}:MC-1`],
    source: eb(DOMRANGE, 'Discovery Question 1 — for f(x)=x, domain and range are both all real numbers; does this mean domain always equals range for every function'),
  },
  {
    conceptId: DOMRANGE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What is the domain of f(x)=ln(√(x-1))?',
    choices: [
      { text: '(1,∞) — working inside-out, √(x-1) requires x≥1, but ln(·) requires its argument STRICTLY positive, so √(x-1)>0 forces x>1; both the radical and logarithm restrictions must be combined, not just a denominator check', isCorrect: true },
      { text: 'All reals, since there is no denominator anywhere in the expression to restrict', isCorrect: false, misconceptionId: `${DOMRANGE}:MC-2` },
      { text: '[1,∞), checking only the radical\'s restriction and overlooking the logarithm\'s own separate requirement', isCorrect: false, misconceptionId: `${DOMRANGE}:MC-2` },
    ],
    targetedMisconceptions: [`${DOMRANGE}:MC-2`],
    source: eb(DOMRANGE, 'Detection probe — what is the domain of f(x)=ln(√(x-1))'),
  },
  {
    conceptId: DOMRANGE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Plugging five different values of x into sin(x) gives five different outputs between -1 and 1. Has this proven the range is exactly [-1,1]?',
    choices: [
      { text: 'No — sampling never proves a range; the range [-1,1] is established by structural reasoning (sin(x) is provably bounded between -1 and 1 for every real input, and every value in that interval is genuinely achieved), never by checking finitely many points', isCorrect: true },
      { text: 'Yes — checking several sample values that all fall within a range is sufficient to prove that range is exactly correct', isCorrect: false, misconceptionId: `${DOMRANGE}:MC-3` },
      { text: 'Yes, since range-finding uses the identical algebraic-restriction method as domain-finding', isCorrect: false, misconceptionId: `${DOMRANGE}:MC-3` },
    ],
    targetedMisconceptions: [`${DOMRANGE}:MC-3`],
    source: eb(DOMRANGE, 'Discovery Question 3 — if you plug in five different values of x into sin(x) and get five different outputs, have you proven the range is exactly [-1,1]'),
  },
]
