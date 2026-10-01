/**
 * Ninth math.abst asset batch — prime-ideal and euclidean-domain.
 *
 * Continues serving-asset coverage for math.abst (16/36 -> 18/36).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.abst.prime-ideal.md and
 * math.abst.euclidean-domain.md.
 *
 *   PRIMEIDEAL   prime-ideal — the quotient-ring criterion (integral
 *                domain / field) replaces intractable element-by-element
 *                checking; maximal always implies prime, never the
 *                converse; the generating element's own primeness is not
 *                the criterion.
 *   EUCLIDDOMAIN euclidean-domain — one abstract framework unifies Z and
 *                F[x]; the norm is domain-specific, never a universal
 *                formula; the Euclidean Algorithm generalizes to any ED.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const PRIMEIDEAL = 'math.abst.prime-ideal'
const EUCLIDDOMAIN = 'math.abst.euclidean-domain'

export const MATHEMATICS_ABSTRACT_ALGEBRA_PRIME_EUCLID_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PRIMEIDEAL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Checking primeness or maximality element-by-element is generally intractable. The '
      + 'QUOTIENT-RING CRITERION gives a practical shortcut: P is prime IFF R/P is an INTEGRAL '
      + 'DOMAIN (no zero divisors); M is maximal IFF R/M is a FIELD. Since every field is '
      + 'automatically an integral domain, every MAXIMAL ideal is PRIME — but the CONVERSE IS '
      + 'FALSE.\n\n'
      + 'In Z, ⟨4⟩ is NOT prime (Z/⟨4⟩≅Z_4 has 2·2=0 with 2≠0, a zero divisor); ⟨5⟩ IS prime and '
      + 'maximal. For nonzero ideals in Z, prime and maximal coincide — but this is a special '
      + 'property of Z, NOT the general rule. In Z[x], ⟨x⟩ is prime (Z[x]/⟨x⟩≅Z, an integral '
      + 'domain) but NOT maximal (Z is not a field) — the canonical example where they split '
      + 'apart. Deciding whether ⟨p⟩ is prime by checking if the generator p "looks prime" is not '
      + 'the criterion; the quotient ring must actually be computed.',
    targetedMisconceptions: [`${PRIMEIDEAL}:MC-1`, `${PRIMEIDEAL}:MC-2`, `${PRIMEIDEAL}:MC-3`],
    source: eb(PRIMEIDEAL, 'Core Understanding — the quotient-ring criterion replaces element-wise checking, maximal implies prime but not conversely'),
  },
  {
    conceptId: EUCLIDDOMAIN, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A EUCLIDEAN DOMAIN is an integral domain R with a norm N:R\\{0}→N_0 guaranteeing division '
      + 'with remainder: a=bq+r with r=0 or N(r)<N(b). This is EXACTLY F[x]\'s own division '
      + 'algorithm, generalized abstractly — Z (with N=|·|) fits the SAME framework using '
      + 'ordinary integer division.\n\n'
      + 'The NORM IS DOMAIN-SPECIFIC, NEVER a universal formula: for Z, N(a)=|a|; for F[x], '
      + 'N(p)=deg(p) — genuinely different formulas. "Degree" has no meaning for an integer, and '
      + '"absolute value" has no meaning for a polynomial; the norm can never be blindly '
      + 'transplanted from one domain to another.\n\n'
      + 'The EUCLIDEAN ALGORITHM generalizes directly, using whichever domain\'s own division: '
      + 'the identical replacement procedure (a,b)→(b,a mod b) works in ANY Euclidean domain — '
      + 'computing gcd(x³-1,x²-1) in R[x] uses the SAME algorithm as integers, just substituting '
      + 'polynomial division for integer division.',
    targetedMisconceptions: [`${EUCLIDDOMAIN}:MC-1`, `${EUCLIDDOMAIN}:MC-2`, `${EUCLIDDOMAIN}:MC-3`],
    source: eb(EUCLIDDOMAIN, 'Core Understanding — one abstract framework unifies Z and F[x], the norm is domain-specific, the Euclidean Algorithm generalizes'),
  },
]

export const MATHEMATICS_ABSTRACT_ALGEBRA_PRIME_EUCLID_PROBES: SeedProbe[] = [
  // --- math.abst.prime-ideal -----------------------------------------------------
  {
    conceptId: PRIMEIDEAL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If p is a prime number, is ⟨p⟩ automatically a prime ideal, and does that same reasoning work in Z[x]?',
    choices: [
      { text: 'In Z it happens to coincide, but the general criterion is the quotient ring test (R/P an integral domain), not the generator\'s own primeness — element-primeness and ideal-primeness genuinely diverge in rings like Z[x]', isCorrect: true },
      { text: 'Yes — a prime generating element always and everywhere makes the ideal prime', isCorrect: false, misconceptionId: `${PRIMEIDEAL}:MC-1` },
      { text: 'Yes, since prime elements and prime ideals are simply two names for the same property in every ring', isCorrect: false, misconceptionId: `${PRIMEIDEAL}:MC-1` },
    ],
    targetedMisconceptions: [`${PRIMEIDEAL}:MC-1`],
    source: eb(PRIMEIDEAL, 'Assessment gate — ideal primeness is decided by the quotient-ring criterion, never the generating element\'s own primeness'),
  },
  {
    conceptId: PRIMEIDEAL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does every prime ideal have to be maximal?',
    choices: [
      { text: 'No — ⟨x⟩ in Z[x] is prime (Z[x]/⟨x⟩≅Z, an integral domain) but NOT maximal (Z is not a field); maximal implies prime, never the reverse', isCorrect: true },
      { text: 'Yes — prime and maximal are equivalent properties for any ideal in any ring', isCorrect: false, misconceptionId: `${PRIMEIDEAL}:MC-2` },
      { text: 'Yes, since being prime already forces the quotient to be a field', isCorrect: false, misconceptionId: `${PRIMEIDEAL}:MC-2` },
    ],
    targetedMisconceptions: [`${PRIMEIDEAL}:MC-2`],
    source: eb(PRIMEIDEAL, 'Misconception register — prime does not imply maximal, only maximal implies prime'),
  },
  {
    conceptId: PRIMEIDEAL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is there a faster way to classify an ideal as prime or maximal than checking every possible pair of elements?',
    choices: [
      { text: 'Yes — compute the quotient ring R/I once and check whether it is an integral domain (prime) or a field (maximal), replacing an intractable element-by-element search', isCorrect: true },
      { text: 'No — direct element-wise checking of all pairs a,b with ab∈P is the only valid method', isCorrect: false, misconceptionId: `${PRIMEIDEAL}:MC-3` },
      { text: 'No, since the quotient ring construction cannot be used to determine primeness or maximality', isCorrect: false, misconceptionId: `${PRIMEIDEAL}:MC-3` },
    ],
    targetedMisconceptions: [`${PRIMEIDEAL}:MC-3`],
    source: eb(PRIMEIDEAL, 'Transfer probe — the quotient-ring criterion is the practical shortcut, replacing intractable element-wise checking'),
  },

  // --- math.abst.euclidean-domain -----------------------------------------------
  {
    conceptId: EUCLIDDOMAIN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does "Euclidean domain" specifically mean the integers, or a computation using literal numerical remainders?',
    choices: [
      { text: 'No — it is a general abstract framework; F[x] with N(p)=deg(p) is also a genuine Euclidean domain, an entirely different norm satisfying the identical abstract property', isCorrect: true },
      { text: 'Yes — "Euclidean domain" refers specifically and exclusively to the integers', isCorrect: false, misconceptionId: `${EUCLIDDOMAIN}:MC-1` },
      { text: 'Yes, since only numerical remainders can satisfy the Euclidean-domain property', isCorrect: false, misconceptionId: `${EUCLIDDOMAIN}:MC-1` },
    ],
    targetedMisconceptions: [`${EUCLIDDOMAIN}:MC-1`],
    source: eb(EUCLIDDOMAIN, 'Assessment gate — a Euclidean domain is a general abstract framework, not specific to integers'),
  },
  {
    conceptId: EUCLIDDOMAIN, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the same norm formula (like absolute value, or degree) work for verifying the Euclidean-domain property in any ring?',
    choices: [
      { text: 'No — the norm is domain-specific: "degree" is meaningless for an integer, and "absolute value" is meaningless for a polynomial; each domain needs its own tailored norm', isCorrect: true },
      { text: 'Yes — one universal norm formula applies across every Euclidean domain', isCorrect: false, misconceptionId: `${EUCLIDDOMAIN}:MC-2` },
      { text: 'Yes, since absolute value can always be applied literally to any ring element', isCorrect: false, misconceptionId: `${EUCLIDDOMAIN}:MC-2` },
    ],
    targetedMisconceptions: [`${EUCLIDDOMAIN}:MC-2`],
    source: eb(EUCLIDDOMAIN, 'Misconception register — the norm is domain-specific, never a universal formula transplanted between domains'),
  },
  {
    conceptId: EUCLIDDOMAIN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the Euclidean Algorithm a technique specific to integers, unable to generalize to other domains like polynomials?',
    choices: [
      { text: 'No — the identical replacement procedure works in ANY Euclidean domain, using that domain\'s own division-with-remainder; gcd(x³-1,x²-1) in R[x] is computed the same way, using polynomial division', isCorrect: true },
      { text: 'Yes — the Euclidean Algorithm only works for integers and cannot be applied to polynomial rings', isCorrect: false, misconceptionId: `${EUCLIDDOMAIN}:MC-3` },
      { text: 'Yes, since polynomial GCDs require an entirely different, unrelated algorithm', isCorrect: false, misconceptionId: `${EUCLIDDOMAIN}:MC-3` },
    ],
    targetedMisconceptions: [`${EUCLIDDOMAIN}:MC-3`],
    source: eb(EUCLIDDOMAIN, 'Transfer probe — the Euclidean Algorithm generalizes to any Euclidean domain, not just integers'),
  },
]
