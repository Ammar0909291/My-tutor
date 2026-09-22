/**
 * Eleventh math.alg asset batch — logarithm-properties and exponential-equations.
 *
 * Continues serving-asset coverage for math.alg (34/59 -> 36/59).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.alg.logarithm-properties.md
 * and math.alg.exponential-equations.md.
 *
 *   LOGPROPS     logarithm-properties — the product/quotient/power rules
 *                are exponent laws TRANSLATED, never independent facts
 *                to memorise; all three follow ONE translation
 *                principle, never three unrelated techniques; a SUM
 *                inside a logarithm never splits the way a product does
 *                — no such rule exists.
 *   EXPEQ        exponential-equations — the same-base method only
 *                applies when a genuine common base exists, never
 *                forced onto a case where none exists; the logarithm
 *                power rule brings the exponent down as a multiplier on
 *                the side it actually belongs to, never distributed to
 *                the other side; a solution must be verified against
 *                the ORIGINAL equation, never trusted from the algebra
 *                alone.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const LOGPROPS = 'math.alg.logarithm-properties'
const EXPEQ = 'math.alg.exponential-equations'

export const MATHEMATICS_ALGEBRA_LOG_PROPS_EXP_EQ_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LOGPROPS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Every logarithm rule is an EXPONENT LAW, TRANSLATED — this is the single organizing idea '
      + 'behind all three rules. Since log_a(x) is DEFINED as the exponent e such that a^e=x, any '
      + 'true statement about exponents translates directly into a true statement about logarithms. '
      + 'The exponent law a^(m+n)=a^m·a^n translates into the PRODUCT RULE log_a(xy)=log_a(x)+'
      + 'log_a(y) — NOT a new fact requiring separate memorization, but the SAME exponent law viewed '
      + 'through the logarithm\'s defining inverse relationship.\n\n'
      + 'The quotient and power rules follow the IDENTICAL pattern: a^(m−n)=a^m/a^n translates into '
      + 'log_a(x/y)=log_a(x)−log_a(y), and a^(rm)=(a^m)^r translates into log_a(x^r)=r·log_a(x) — by '
      + 'the exact same substitution logic. All three rules are ONE single translation principle, '
      + 'applied to three basic exponent laws, NEVER three unrelated facts to be separately learned.\n\n'
      + 'A critical boundary, easy to overstep: these rules apply ONLY when the logarithm\'s argument '
      + 'is itself a product, quotient, or power. A SUM inside the logarithm has NO corresponding '
      + 'simplification rule at all — log_a(x+y) is never equal to log_a(x)+log_a(y); checking '
      + 'numerically, log_2(4+4)=log_2(8)=3, while log_2(4)+log_2(4)=2+2=4≠3, a genuine mismatch.',
    targetedMisconceptions: [`${LOGPROPS}:MC-1`, `${LOGPROPS}:MC-2`, `${LOGPROPS}:MC-3`],
    source: eb(LOGPROPS, 'Core Understanding — every log rule is an exponent law translated through one shared principle, and this never extends to a sum inside the logarithm'),
  },
  {
    conceptId: EXPEQ, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'An exponential equation has the unknown in an EXPONENT, and two solution strategies apply. '
      + 'The SAME-BASE method: if both sides can be rewritten as powers of the SAME base, '
      + 'a^f(x)=a^g(x), then since a^x is one-to-one, the EXPONENTS themselves must be equal: '
      + 'f(x)=g(x). This method only works when a genuine common base can be found — it can NEVER be '
      + 'forced onto a case where no such rewriting exists (20 is not a clean power of 3, so '
      + '3^x=20 has no common-base rewrite).\n\n'
      + 'The LOGARITHM method: when no convenient common base exists, take the logarithm of both '
      + 'sides and apply the power rule log(a^x)=x·log(a) to bring the exponent DOWN as a '
      + 'multiplicative factor on the side it actually belongs to — for 3^x=20, this gives '
      + 'x·log(3)=log(20), NEVER x·log(3)=x·log(20) (the exponent is never distributed to the other '
      + 'side) and NEVER log(3^x) computed as 3·log(x) (the exponent multiplies the log of ITS OWN '
      + 'base, never swapped).\n\n'
      + 'The deciding judgment is whether the two sides genuinely share a common base — check FIRST, '
      + 'before committing to a method. And once a candidate solution is found, it must be verified '
      + 'by substituting back into the ORIGINAL equation — the multi-step solving process is '
      + 'error-prone enough that trusting the algebra alone, without checking, is never sufficient.',
    targetedMisconceptions: [`${EXPEQ}:MC-1`, `${EXPEQ}:MC-2`, `${EXPEQ}:MC-3`],
    source: eb(EXPEQ, 'Core Understanding — the same-base method requires a genuine common base, the logarithm power rule brings the exponent down on its own side only, and every solution needs verification against the original equation'),
  },
]

export const MATHEMATICS_ALGEBRA_LOG_PROPS_EXP_EQ_PROBES: SeedProbe[] = [
  // --- math.alg.logarithm-properties ------------------------------------------
  {
    conceptId: LOGPROPS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Where does the product rule log_a(xy) = log_a(x) + log_a(y) actually come from?',
    choices: [
      { text: 'The exponent law a^m·a^n=a^(m+n), translated: setting x=a^m and y=a^n, so m=log_a(x) and n=log_a(y), directly gives the product rule', isCorrect: true },
      { text: 'It is an independent fact about logarithms, unrelated to any exponent law, that must be separately memorized', isCorrect: false, misconceptionId: `${LOGPROPS}:MC-1` },
      { text: 'It was discovered empirically by testing many logarithm values', isCorrect: false, misconceptionId: `${LOGPROPS}:MC-1` },
    ],
    targetedMisconceptions: [`${LOGPROPS}:MC-1`],
    source: eb(LOGPROPS, 'Detection probe (Blueprint) — the product rule is the exponent law a^m·a^n=a^(m+n), translated through the logarithm\'s inverse definition, not an independently memorized fact'),
  },
  {
    conceptId: LOGPROPS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Are the product, quotient, and power rules three genuinely different techniques, each needing its own separate derivation method?',
    choices: [
      { text: 'No — all three follow the SAME translation principle (exponent law → logarithm rule), just applied to three different exponent laws (sum, difference, scalar multiple)', isCorrect: true },
      { text: 'Yes — each rule requires its own independent derivation approach unrelated to the others', isCorrect: false, misconceptionId: `${LOGPROPS}:MC-2` },
      { text: 'Yes, since they apply to different operations (multiplication, division, exponentiation)', isCorrect: false, misconceptionId: `${LOGPROPS}:MC-2` },
    ],
    targetedMisconceptions: [`${LOGPROPS}:MC-2`],
    source: eb(LOGPROPS, 'Detection probe (Blueprint) — the product, quotient, and power rules are one translation principle applied three times, not three unrelated techniques'),
  },
  {
    conceptId: LOGPROPS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does log_a(x+y) = log_a(x) + log_a(y), the same way log_a(xy) splits?',
    choices: [
      { text: 'No — checking numerically, log_2(4+4)=log_2(8)=3, while log_2(4)+log_2(4)=2+2=4≠3; no simplification rule exists for a sum inside a logarithm', isCorrect: true },
      { text: 'Yes — any combination of two quantities inside a logarithm splits into a sum of two logarithms', isCorrect: false, misconceptionId: `${LOGPROPS}:MC-3` },
      { text: 'Yes, since addition and multiplication are both ways of combining quantities', isCorrect: false, misconceptionId: `${LOGPROPS}:MC-3` },
    ],
    targetedMisconceptions: [`${LOGPROPS}:MC-3`],
    source: eb(LOGPROPS, 'Detection probe (Blueprint) — the product/quotient/power rules apply only to products/quotients/powers inside the log, never to sums, confirmed by direct numeric counterexample'),
  },

  // --- math.alg.exponential-equations -------------------------------------------
  {
    conceptId: EXPEQ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'To solve 3^x=20, should you try to force both sides into the same base?',
    choices: [
      { text: 'No — 20 is not a clean power of 3 (no integer or simple fraction k gives 3^k=20), so the same-base method does not apply; use logarithms instead', isCorrect: true },
      { text: 'Yes — the same-base method always works for any exponential equation if you try hard enough', isCorrect: false, misconceptionId: `${EXPEQ}:MC-1` },
      { text: 'Yes, by approximating 20 as a power of 3 close enough for practical purposes', isCorrect: false, misconceptionId: `${EXPEQ}:MC-1` },
    ],
    targetedMisconceptions: [`${EXPEQ}:MC-1`],
    source: eb(EXPEQ, 'Detection probe (Blueprint) — the same-base method only applies when a genuine common base exists; forcing it when none exists produces an invalid rewrite or premature abandonment'),
  },
  {
    conceptId: EXPEQ, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Taking log of both sides of 3^x=20 gives log(3^x)=log(20). Applying the power rule, what is the correct next line?',
    choices: [
      { text: 'x·log(3) = log(20) — the exponent x multiplies the log of ITS OWN base (3), never the other side\'s value', isCorrect: true },
      { text: 'x·log(3) = x·log(20) — the exponent distributes to both sides', isCorrect: false, misconceptionId: `${EXPEQ}:MC-2` },
      { text: '3·log(x) = log(20) — swapping which quantity the exponent multiplies', isCorrect: false, misconceptionId: `${EXPEQ}:MC-2` },
    ],
    targetedMisconceptions: [`${EXPEQ}:MC-2`],
    source: eb(EXPEQ, 'Detection probe (Blueprint) — the power rule brings the exponent down as a multiplier on the log of its own base only, never distributed to the other side or swapped'),
  },
  {
    conceptId: EXPEQ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'After solving 3^x=20 to get x=log(20)/log(3)≈2.727, is the algebra alone sufficient to trust this answer?',
    choices: [
      { text: 'No — substitute x≈2.727 back into the ORIGINAL equation 3^x=20 to confirm both sides approximately match, since the multi-step process (logarithms, power rule) is error-prone', isCorrect: true },
      { text: 'Yes — once the algebra is complete, no further check is needed', isCorrect: false, misconceptionId: `${EXPEQ}:MC-3` },
      { text: 'Yes, since logarithm calculations are always exact and error-free', isCorrect: false, misconceptionId: `${EXPEQ}:MC-3` },
    ],
    targetedMisconceptions: [`${EXPEQ}:MC-3`],
    source: eb(EXPEQ, 'Detection probe (Blueprint) — a solution to an exponential equation must be verified by substitution into the original equation, never trusted from the algebra alone'),
  },
]
