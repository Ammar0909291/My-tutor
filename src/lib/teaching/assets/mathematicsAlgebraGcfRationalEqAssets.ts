/**
 * Tenth math.alg asset batch — factoring-gcf and rational-equations.
 *
 * Continues serving-asset coverage for math.alg (32/59 -> 34/59).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.alg.factoring-gcf.md
 * and math.alg.rational-equations.md.
 *
 *   GCF          factoring-gcf — the GCF of monomials has TWO
 *                independent parts (numerical AND variable), never the
 *                numerical part alone; the variable part uses the
 *                LOWEST shared power, never the highest (that is the
 *                LCM rule); dividing a monomial requires subtracting
 *                exponents, never carrying the original exponent
 *                unchanged.
 *   RATIONALEQ   rational-equations — every candidate solution must be
 *                checked against the ORIGINAL equation's excluded
 *                values, never accepted straight from the cleared
 *                polynomial equation; clearing denominators means every
 *                term on both sides, never a partial application; a
 *                mix of valid and extraneous candidates are checked
 *                independently, never discarded as a block.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const GCF = 'math.alg.factoring-gcf'
const RATIONALEQ = 'math.alg.rational-equations'

export const MATHEMATICS_ALGEBRA_GCF_RATIONAL_EQ_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: GCF, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Factoring out the GCF is the distributive law run in reverse: given a·b + a·c, recognising '
      + 'the shared factor a and rewriting as a(b+c). For polynomial terms, the GCF is NOT a single '
      + 'number to spot by inspection — it is the product of TWO independently computed pieces: the '
      + 'numerical GCF of the coefficients (found exactly as with plain integers), AND, for each '
      + 'variable appearing in every term, that variable raised to the LOWEST power occurring across '
      + 'all terms. For 6x²+4x, GCF(6,4)=2 is only half the answer — the shared x factor (lowest '
      + 'power: x¹) must ALSO be extracted, giving the full GCF of 2x, never just 2.\n\n'
      + 'The variable part uses the LOWEST shared power, NEVER the highest — that is the opposite '
      + 'rule, used for finding a Least Common Multiple. Only the lowest power is guaranteed to '
      + 'divide every term without leaving a negative exponent: x³ does NOT divide x² evenly '
      + '(x²÷x³=x⁻¹, not a polynomial term), so GCF(x³,x²)=x², the lower power, never x³.\n\n'
      + 'Once the GCF is assembled, each term is divided by it: coefficients divided normally, and '
      + 'exponents SUBTRACTED for the variable part (x^m÷x^k=x^(m−k)) — NEVER carrying the original '
      + 'exponent unchanged (12x³÷4x=3x² is correct; 3x³ is not, since 4x×3x³=12x⁴≠12x³). The '
      + 'extraction is verified, at zero additional cost, by multiplying the GCF back through the '
      + 'residual and confirming the original polynomial is exactly reproduced.',
    targetedMisconceptions: [`${GCF}:MC-1`, `${GCF}:MC-2`, `${GCF}:MC-3`],
    source: eb(GCF, 'Core Understanding — the GCF has a numerical part and a variable part (lowest shared power, never highest), and dividing a monomial requires subtracting exponents, verified by re-expanding'),
  },
  {
    conceptId: RATIONALEQ, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A rational equation is solved in four stages: identify the LCD of ALL denominators present; '
      + 'multiply BOTH sides by that LCD, clearing every denominator into an ordinary polynomial '
      + 'equation; solve that polynomial equation using standard techniques; and — the step with no '
      + 'counterpart in ordinary polynomial-equation solving — check EVERY candidate solution '
      + 'against the ORIGINAL equation\'s excluded values, discarding as EXTRANEOUS any candidate '
      + 'that equals an excluded value.\n\n'
      + 'Extraneous solutions arise for a specific reason: multiplying both sides by the LCD is only '
      + 'a valid, reversible step when the LCD is NONZERO. At exactly the values where the LCD would '
      + 'be zero, this step\'s logic breaks down, and the cleared equation can end up satisfied by a '
      + 'value that never actually worked in the original, uncleared equation. For x/(x−3)=3/(x−3)+2, '
      + 'clearing and solving correctly gives x=3 — but x=3 makes the ORIGINAL denominator zero, so '
      + 'x=3 is EXTRANEOUS and must be discarded; the equation genuinely has no valid solution, even '
      + 'though every algebraic step to reach x=3 was correct.\n\n'
      + 'Clearing denominators means EVERY term on BOTH sides gets multiplied by the LCD, never a '
      + 'partial application. And in a problem with multiple candidates, each is checked '
      + 'INDEPENDENTLY against the original exclusions — one candidate being extraneous never means '
      + 'the others are too; only the genuinely extraneous ones are discarded.',
    targetedMisconceptions: [`${RATIONALEQ}:MC-1`, `${RATIONALEQ}:MC-2`, `${RATIONALEQ}:MC-3`],
    source: eb(RATIONALEQ, 'Core Understanding — every candidate must be checked against the original equation\'s excluded values, the LCD-clearing step must cover every term on both sides, and each candidate is checked independently'),
  },
]

export const MATHEMATICS_ALGEBRA_GCF_RATIONAL_EQ_PROBES: SeedProbe[] = [
  // --- math.alg.factoring-gcf ------------------------------------------
  {
    conceptId: GCF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the GCF of 8x³ and 12x²?',
    choices: [
      { text: '4x² — the numerical GCF (4) AND the common variable factor (x^min(3,2)=x²), both extracted', isCorrect: true },
      { text: '4 — the numerical GCF of the coefficients only', isCorrect: false, misconceptionId: `${GCF}:MC-1` },
      { text: 'GCF(8,12)=4, with no variable factor since the exponents differ', isCorrect: false, misconceptionId: `${GCF}:MC-1` },
    ],
    targetedMisconceptions: [`${GCF}:MC-1`],
    source: eb(GCF, 'Detection probe (Blueprint P41) — the GCF of monomials has a numerical component AND a variable component; both must be extracted'),
  },
  {
    conceptId: GCF, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For the shared variable factor in x³ and x², should you use x³ (the higher power) or x² (the lower power) as part of the GCF?',
    choices: [
      { text: 'x² — the lower power; x³ does not divide x² evenly (x²÷x³=x⁻¹, not a polynomial term), so only the minimum shared power is guaranteed to divide every term', isCorrect: true },
      { text: 'x³ — the higher power, since it is the larger exponent', isCorrect: false, misconceptionId: `${GCF}:MC-2` },
      { text: 'Either works, since both are shared between the two terms', isCorrect: false, misconceptionId: `${GCF}:MC-2` },
    ],
    targetedMisconceptions: [`${GCF}:MC-2`],
    source: eb(GCF, 'Detection probe (Blueprint P41) — GCF uses the lowest shared power (opposite of the LCM rule, which uses the highest); a higher power fails to divide the term with the lower exponent'),
  },
  {
    conceptId: GCF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Compute 12x³ ÷ 4x.',
    choices: [
      { text: '3x² — divide the coefficients (12÷4=3) and subtract exponents for the variable part (x³÷x¹=x²); verify: 4x×3x²=12x³ ✓', isCorrect: true },
      { text: '3x³ — divide the coefficients but carry the original exponent unchanged', isCorrect: false, misconceptionId: `${GCF}:MC-3` },
      { text: '3x⁴ — divide the coefficients and add the exponents', isCorrect: false, misconceptionId: `${GCF}:MC-3` },
    ],
    targetedMisconceptions: [`${GCF}:MC-3`],
    source: eb(GCF, 'Detection probe (Blueprint P41) — dividing a monomial requires subtracting exponents for the variable part, never carrying the original exponent unchanged; verified by multiplying back'),
  },

  // --- math.alg.rational-equations -------------------------------------------
  {
    conceptId: RATIONALEQ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Solving x/(x−3) = 3/(x−3) + 2 by clearing denominators gives x=3. Should this be accepted as the final answer?',
    choices: [
      { text: 'No — check x=3 against the ORIGINAL denominator (x−3): it makes the original equation undefined, so x=3 is extraneous and must be discarded; this equation has no valid solution', isCorrect: true },
      { text: 'Yes — the algebra to reach x=3 was correct, so it is a valid solution', isCorrect: false, misconceptionId: `${RATIONALEQ}:MC-1` },
      { text: 'Yes, since x=3 satisfies the cleared polynomial equation', isCorrect: false, misconceptionId: `${RATIONALEQ}:MC-1` },
    ],
    targetedMisconceptions: [`${RATIONALEQ}:MC-1`],
    source: eb(RATIONALEQ, 'Detection probe (Blueprint) — every candidate solution must be checked against the original equation\'s excluded values before being accepted, since clearing denominators can manufacture extraneous solutions'),
  },
  {
    conceptId: RATIONALEQ, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'When clearing denominators in 2/x + 1/(x+1) = 5/[x(x+1)] by multiplying by the LCD x(x+1), which terms need to be multiplied?',
    choices: [
      { text: 'Every single term on both sides of the equation — all three terms (2/x, 1/(x+1), and 5/[x(x+1)]) get multiplied by the LCD, none skipped', isCorrect: true },
      { text: 'Only the terms on the left side of the equation', isCorrect: false, misconceptionId: `${RATIONALEQ}:MC-2` },
      { text: 'Only the term with the most complex denominator', isCorrect: false, misconceptionId: `${RATIONALEQ}:MC-2` },
    ],
    targetedMisconceptions: [`${RATIONALEQ}:MC-2`],
    source: eb(RATIONALEQ, 'Detection probe — clearing denominators is only valid if applied uniformly: every term, on both sides, must be multiplied by the LCD, with none omitted'),
  },
  {
    conceptId: RATIONALEQ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A rational equation produces two candidate solutions. Checking against the original denominators, one candidate is extraneous. What should happen to the other candidate?',
    choices: [
      { text: 'Check it independently against the original denominators — if it does not make any original denominator zero, it remains a genuinely valid solution regardless of the other candidate\'s status', isCorrect: true },
      { text: 'Discard it too, since one candidate in the problem turned out to be extraneous', isCorrect: false, misconceptionId: `${RATIONALEQ}:MC-3` },
      { text: 'Automatically accept it without checking, since only one candidate per problem is typically extraneous', isCorrect: false, misconceptionId: `${RATIONALEQ}:MC-3` },
    ],
    targetedMisconceptions: [`${RATIONALEQ}:MC-3`],
    source: eb(RATIONALEQ, 'Detection probe — each candidate solution is checked independently against the original equation\'s exclusions; one being extraneous has no bearing on whether another candidate is valid'),
  },
]
