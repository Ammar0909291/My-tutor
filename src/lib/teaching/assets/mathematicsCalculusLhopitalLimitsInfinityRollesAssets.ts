/**
 * Seventh math.calc asset batch — L'Hôpital's rule, limits at infinity,
 * and Rolle's Theorem.
 *
 * Continues serving-asset coverage for math.calc (22/76 -> 25/76).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.calc.lhopitals-rule.md,
 * math.calc.limits-at-infinity.md, and math.calc.rolles-theorem.md.
 *
 *   LHOPITAL     lhopitals-rule — the rule applies ONLY after verifying,
 *                by direct substitution, that the original limit is
 *                genuinely indeterminate (0/0 or ∞/∞) — a determinate
 *                form like 5/0 is never eligible, and differentiating top
 *                and bottom there produces a wrong answer; other
 *                indeterminate forms (0·∞, ∞−∞, exponential forms) must
 *                be algebraically REWRITTEN into a genuine quotient
 *                first, never differentiated directly as a product or
 *                difference.
 *   LIMINF       limits-at-infinity — infinity is NOT a number to
 *                substitute; the correct technique is dividing by the
 *                DENOMINATOR's highest power, never the numerator's; a
 *                limit at infinity (input growing without bound,
 *                typically a finite answer) and an infinite limit (output
 *                growing without bound at a finite point) are
 *                structurally OPPOSITE phenomena that merely share the
 *                symbol ∞, never interchangeable.
 *   ROLLES       rolles-theorem — the equal-endpoints hypothesis f(a)=f(b)
 *                must be explicitly VERIFIED, never assumed as a given
 *                before solving f'(c)=0; all THREE hypotheses
 *                (continuity, differentiability, equal endpoints) form an
 *                all-or-nothing gate — a single failure fully VOIDS the
 *                guarantee, never merely weakens it, however many of the
 *                other conditions hold.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const LHOPITAL = 'math.calc.lhopitals-rule'
const LIMINF = 'math.calc.limits-at-infinity'
const ROLLES = 'math.calc.rolles-theorem'

export const MATHEMATICS_CALCULUS_LHOPITAL_LIMITS_INFINITY_ROLLES_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LHOPITAL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'L\'Hôpital\'s rule applies to a limit lim[f(x)/g(x)] that direct substitution turns into an '
      + 'INDETERMINATE form — 0/0 or ∞/∞ — where the original expression carries no usable '
      + 'information. ONLY IN THAT CASE, lim[f/g]=lim[f\'/g\']: differentiate the numerator and '
      + 'denominator SEPARATELY (never the quotient rule) and re-evaluate. THE GATEKEEPING CHECK IS '
      + 'NOT OPTIONAL — a limit like 5/0 is already DETERMINATE (it evaluates to ±∞, a vertical '
      + 'asymptote), and differentiating top and bottom there produces a mathematically unrelated, '
      + 'generally wrong number.\n\n'
      + 'INDETERMINATE FORMS THAT ARE NOT ALREADY A QUOTIENT — 0·∞, ∞−∞, 1^∞, 0^0, ∞^0 — must FIRST '
      + 'be algebraically REWRITTEN into a genuine 0/0 or ∞/∞ quotient (via reciprocals, common '
      + 'denominators, or logarithms) before the rule can be invoked at all. The rule\'s hypothesis is '
      + 'stated specifically for a quotient — a product or a difference simply does not satisfy it, no '
      + 'matter how "indeterminate" it is colloquially called.\n\n'
      + 'One application can leave a limit STILL indeterminate, in which case the rule is applied '
      + 'again to the new quotient f\'/g\', and again as needed, until a determinate value emerges.',
    targetedMisconceptions: [`${LHOPITAL}:MC-1`, `${LHOPITAL}:MC-2`],
    source: eb(LHOPITAL, 'Core Understanding — the rule applies only after verifying the original limit is genuinely indeterminate, and non-quotient indeterminate forms must be rewritten into a quotient first'),
  },
  {
    conceptId: LIMINF, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A limit at infinity extends the "approach" idea to unbounded growth rather than a specific '
      + 'finite point: lim_{x→∞}f(x)=L means f(x) gets and stays arbitrarily close to L as x grows '
      + 'without bound. INFINITY IS NOT A NUMBER TO SUBSTITUTE — naively "plugging in" ∞ is not a '
      + 'valid arithmetic operation and typically produces the meaningless form ∞/∞. The correct '
      + 'technique for a rational function p(x)/q(x): divide BOTH numerator and denominator by the '
      + 'highest power of x in the DENOMINATOR specifically — never the numerator\'s highest power — '
      + 'so every term becomes a constant or a term of the form c/x^n, and 1/x^n→0 as x→∞ lets each '
      + 'such term vanish cleanly, producing an EXACT computed limit.\n\n'
      + 'A LIMIT AT INFINITY AND AN INFINITE LIMIT ARE STRUCTURALLY OPPOSITE PHENOMENA that merely '
      + 'share the symbol ∞. A limit at infinity (x→∞) describes the function\'s behavior as the '
      + 'INPUT grows without bound, typically yielding a finite answer L (a horizontal asymptote). An '
      + 'infinite limit (f(x)→∞ as x→a) describes the OUTPUT growing without bound as the input '
      + 'approaches a specific FINITE point a (a vertical asymptote). g(x)=1/(x-2) has '
      + 'lim_{x→∞}g(x)=0 (a horizontal asymptote at y=0) while ALSO blowing up as x→2 (a vertical '
      + 'asymptote at x=2) — two entirely separate questions about two entirely different parts of the '
      + 'same graph, never interchangeable.',
    targetedMisconceptions: [`${LIMINF}:MC-1`, `${LIMINF}:MC-2`, `${LIMINF}:MC-3`],
    source: eb(LIMINF, 'Core Understanding — infinity is never substituted as a number, the correct technique divides by the denominator\'s highest power specifically, and a limit at infinity is structurally opposite to an infinite limit despite sharing a symbol'),
  },
  {
    conceptId: ROLLES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Rolle\'s Theorem states: if f is continuous on [a,b], differentiable on (a,b), AND f(a)=f(b), '
      + 'then some c in (a,b) satisfies f\'(c)=0 — it is EXACTLY the special case of the Mean Value '
      + 'Theorem where the endpoint values are equal, collapsing the MVT\'s general conclusion '
      + 'f\'(c)=[f(b)-f(a)]/(b-a) specifically to f\'(c)=0.\n\n'
      + 'THE EQUAL-ENDPOINTS HYPOTHESIS MUST BE EXPLICITLY VERIFIED, never assumed as a given before '
      + 'proceeding directly to solving f\'(c)=0. Computing and comparing f(a) and f(b) is a required '
      + 'first step, not an automatic feature of every problem.\n\n'
      + 'ALL THREE HYPOTHESES FORM AN ALL-OR-NOTHING GATE — this is never a matter of degree. If even '
      + 'ONE hypothesis fails — differentiability breaks somewhere in the interval, or the endpoint '
      + 'values genuinely differ — the theorem\'s CONCLUSION is no longer guaranteed. The conclusion '
      + 'might still happen to hold by coincidence in a particular example, but satisfying two of '
      + 'three conditions provides no partial guarantee whatsoever; a single failure fully voids the '
      + 'promise, regardless of how many other conditions hold.',
    targetedMisconceptions: [`${ROLLES}:MC-1`, `${ROLLES}:MC-2`],
    source: eb(ROLLES, 'Core Understanding — the equal-endpoints hypothesis must be explicitly verified, never assumed, and all three hypotheses form an all-or-nothing gate where a single failure fully voids the guarantee'),
  },
]

export const MATHEMATICS_CALCULUS_LHOPITAL_LIMITS_INFINITY_ROLLES_PROBES: SeedProbe[] = [
  // --- math.calc.lhopitals-rule ------------------------------------------------------
  {
    conceptId: LHOPITAL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Evaluating lim_{x→0}(x+5)/x, direct substitution gives 5/0. Should you apply L\'Hôpital\'s rule by differentiating top and bottom?',
    choices: [
      { text: 'No — 5/0 is already a determinate infinite limit (a vertical asymptote), never an indeterminate form; differentiating top and bottom here would produce an unrelated, wrong answer', isCorrect: true },
      { text: 'Yes — any limit with a zero in the denominator is eligible for L\'Hôpital\'s rule', isCorrect: false, misconceptionId: `${LHOPITAL}:MC-1` },
      { text: 'Yes, since the rule applies whenever the denominator approaches zero, regardless of what the numerator does', isCorrect: false, misconceptionId: `${LHOPITAL}:MC-1` },
    ],
    targetedMisconceptions: [`${LHOPITAL}:MC-1`],
    source: eb(LHOPITAL, 'Detection probe (Blueprint A01) — the rule applies only after verifying the original limit is genuinely indeterminate (0/0 or ∞/∞); a determinate form like 5/0 is never eligible'),
  },
  {
    conceptId: LHOPITAL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Evaluating lim_{x→0+}x·ln(x), a 0·(−∞) product form, can L\'Hôpital\'s rule be applied directly to this product?',
    choices: [
      { text: 'No — the rule\'s hypothesis is stated for a quotient; the product must first be rewritten as ln(x)/(1/x), a genuine −∞/∞ quotient, before the rule can be applied', isCorrect: true },
      { text: 'Yes — since 0·(−∞) is called an indeterminate form, the same differentiate-top-and-bottom procedure applies directly to the product', isCorrect: false, misconceptionId: `${LHOPITAL}:MC-2` },
      { text: 'Yes, since L\'Hôpital\'s rule can differentiate any indeterminate expression regardless of its algebraic structure', isCorrect: false, misconceptionId: `${LHOPITAL}:MC-2` },
    ],
    targetedMisconceptions: [`${LHOPITAL}:MC-2`],
    source: eb(LHOPITAL, 'Detection probe (Blueprint A02) — indeterminate forms that are not already a quotient must be algebraically rewritten into a genuine 0/0 or ∞/∞ quotient before the rule can be invoked at all'),
  },
  {
    conceptId: LHOPITAL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'After one application of L\'Hôpital\'s rule to lim_{x→0}(x-sin x)/x³, the resulting limit is still 0/0. What should you do?',
    choices: [
      { text: 'Apply the rule again to the new quotient, and continue re-checking the form after each application until a determinate value emerges', isCorrect: true },
      { text: 'Stop and report the current expression as the final answer, since one application of the rule is always sufficient', isCorrect: false, misconceptionId: `${LHOPITAL}:MC-1` },
      { text: 'Conclude the limit does not exist, since a still-indeterminate result after applying the rule means the technique has failed', isCorrect: false, misconceptionId: `${LHOPITAL}:MC-1` },
    ],
    targetedMisconceptions: [`${LHOPITAL}:MC-1`],
    source: eb(LHOPITAL, 'Detection probe — L\'Hôpital\'s rule may need to be applied multiple times in succession when, after one application, the resulting limit is still indeterminate'),
  },

  // --- math.calc.limits-at-infinity ---------------------------------------------------
  {
    conceptId: LIMINF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Can lim_{x→∞}(3x²+5x-1)/(2x²-x+4) be found by substituting "infinity" directly into the formula?',
    choices: [
      { text: 'No — infinity is not a number to substitute; the correct technique divides both numerator and denominator by the highest power of x in the denominator (here x²), letting each 1/x^n term vanish', isCorrect: true },
      { text: 'Yes — plugging in a very large number, or infinity itself, into the formula gives the exact answer directly', isCorrect: false, misconceptionId: `${LIMINF}:MC-1` },
      { text: 'Yes, since infinity can be treated as an ordinary number for the purposes of direct substitution', isCorrect: false, misconceptionId: `${LIMINF}:MC-1` },
    ],
    targetedMisconceptions: [`${LIMINF}:MC-1`],
    source: eb(LIMINF, 'Detection probe — infinity is not a number to substitute; the correct technique is dividing by the highest power of x in the denominator, never plugging infinity directly into the formula'),
  },
  {
    conceptId: LIMINF, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'g(x)=1/(x-2) has lim_{x→∞}g(x)=0 (a limit at infinity) and also blows up as x→2 (an infinite limit). Are these describing the same kind of phenomenon?',
    choices: [
      { text: 'No — one describes the INPUT growing without bound (typically a finite answer, a horizontal asymptote), the other describes the OUTPUT growing without bound at a finite input (a vertical asymptote); they are structurally opposite despite sharing the symbol ∞', isCorrect: true },
      { text: 'Yes — both are called "infinite" behavior, so they describe the same underlying mathematical phenomenon', isCorrect: false, misconceptionId: `${LIMINF}:MC-2` },
      { text: 'Yes, since any limit notation containing the symbol ∞ describes an equivalent kind of unbounded behavior', isCorrect: false, misconceptionId: `${LIMINF}:MC-2` },
    ],
    targetedMisconceptions: [`${LIMINF}:MC-2`],
    source: eb(LIMINF, 'Detection probe — a limit at infinity and an infinite limit are structurally opposite phenomena that happen to share the symbol ∞, never interchangeable'),
  },
  {
    conceptId: LIMINF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For lim_{x→∞}(x³+2)/(5x²-1), the numerator\'s highest power is x³ and the denominator\'s is x². Which power should you divide by?',
    choices: [
      { text: 'x² — always divide by the DENOMINATOR\'s highest power, applied consistently to both numerator and denominator', isCorrect: true },
      { text: 'x³ — always divide by whichever polynomial has the higher-degree term, regardless of whether it\'s the numerator or denominator', isCorrect: false, misconceptionId: `${LIMINF}:MC-3` },
      { text: 'It doesn\'t matter which power you choose, since the technique gives the same final answer either way', isCorrect: false, misconceptionId: `${LIMINF}:MC-3` },
    ],
    targetedMisconceptions: [`${LIMINF}:MC-3`],
    source: eb(LIMINF, 'Detection probe — the divide-by-highest-power technique always uses the DENOMINATOR\'s highest power specifically, applied consistently to both numerator and denominator, never the numerator\'s'),
  },

  // --- math.calc.rolles-theorem ---------------------------------------------------------
  {
    conceptId: ROLLES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Applying Rolle\'s Theorem to f(x)=x²-4x+3 on [1,3], should you proceed directly to solving f\'(c)=0 without first checking anything?',
    choices: [
      { text: 'No — first explicitly compute and compare f(1) and f(3) to verify the equal-endpoints hypothesis holds, before attempting to solve for c', isCorrect: true },
      { text: 'Yes — the equal-endpoints condition can be assumed to hold automatically whenever Rolle\'s Theorem is being applied', isCorrect: false, misconceptionId: `${ROLLES}:MC-1` },
      { text: 'Yes, since solving f\'(c)=0 directly is sufficient regardless of whether the endpoint values happen to match', isCorrect: false, misconceptionId: `${ROLLES}:MC-1` },
    ],
    targetedMisconceptions: [`${ROLLES}:MC-1`],
    source: eb(ROLLES, 'Detection probe (Blueprint A01) — the equal-endpoints hypothesis f(a)=f(b) must be explicitly verified by computing and comparing f(a) and f(b), never assumed as a given before solving'),
  },
  {
    conceptId: ROLLES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For f(x)=|x| on [-1,1]: f is continuous, and f(-1)=f(1)=1 (equal endpoints), but f is NOT differentiable at x=0. Does Rolle\'s Theorem still guarantee some c with f\'(c)=0?',
    choices: [
      { text: 'No — differentiability fails at x=0, and even though the other two hypotheses hold, all three are required; the guarantee is fully void, and indeed f\'(x)=±1 never equals 0 anywhere in the interval', isCorrect: true },
      { text: 'Yes — since two of the three hypotheses (continuity and equal endpoints) are satisfied, the conclusion should still roughly hold', isCorrect: false, misconceptionId: `${ROLLES}:MC-2` },
      { text: 'Yes, since satisfying most of the theorem\'s conditions is generally enough to guarantee the conclusion approximately', isCorrect: false, misconceptionId: `${ROLLES}:MC-2` },
    ],
    targetedMisconceptions: [`${ROLLES}:MC-2`],
    source: eb(ROLLES, 'Detection probe (Blueprint A02) — the three hypotheses form an all-or-nothing gate; a single failure (here, differentiability) fully voids the guarantee, regardless of how many other conditions hold'),
  },
  {
    conceptId: ROLLES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How does Rolle\'s Theorem relate to the more general Mean Value Theorem?',
    choices: [
      { text: 'Rolle\'s Theorem is exactly the special case of the MVT where f(a)=f(b); the MVT\'s general conclusion f\'(c)=[f(b)-f(a)]/(b-a) collapses to f\'(c)=0 precisely because the numerator becomes zero', isCorrect: true },
      { text: 'Rolle\'s Theorem is an entirely independent result requiring its own separate proof, unrelated to the Mean Value Theorem', isCorrect: false, misconceptionId: `${ROLLES}:MC-2` },
      { text: 'Rolle\'s Theorem is a more general result than the MVT, with the MVT being derived as its special case instead', isCorrect: false, misconceptionId: `${ROLLES}:MC-2` },
    ],
    targetedMisconceptions: [`${ROLLES}:MC-2`],
    source: eb(ROLLES, 'Detection probe (Blueprint A03) — Rolle\'s Theorem is exactly the special case of the Mean Value Theorem where the endpoint values are equal, collapsing the MVT\'s conclusion to f\'(c)=0'),
  },
]
