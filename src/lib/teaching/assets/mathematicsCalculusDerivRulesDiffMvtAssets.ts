/**
 * Third math.calc asset batch — derivative rules, differentiability, and
 * the Mean Value Theorem.
 *
 * Continues serving-asset coverage for math.calc (10/76 -> 13/76).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.calc.derivative-rules.md,
 * math.calc.differentiability.md, and math.calc.mean-value-theorem.md.
 *
 *   DERIVRULES   derivative-rules — the power rule requires the BASE to
 *                be the variable and the EXPONENT a constant, never the
 *                reverse (e^x, 2^x do not qualify); a coefficient
 *                multiplying a variable expression survives, multiplying
 *                the derivative, never vanishing like a bare constant
 *                does; the sum rule's term-by-term behavior never extends
 *                to products — simplify a product of power functions into
 *                a single power FIRST, never differentiate the factors
 *                separately and multiply.
 *   DIFFTY       differentiability — visual smoothness never settles
 *                differentiability; the one-sided derivatives must
 *                actually be computed and compared; continuity never
 *                implies differentiability — |x| at 0 is the standing
 *                counterexample, continuous yet with disagreeing
 *                one-sided derivatives (a corner).
 *   MVT          mean-value-theorem — the theorem's hypotheses
 *                (continuity on the closed interval, differentiability on
 *                the open interval) must be checked BEFORE solving for c,
 *                never assumed; the theorem guarantees AT LEAST ONE c,
 *                never exactly one — multiple valid solutions are not an
 *                error; differentiability is required only on the OPEN
 *                interval, never extended to the endpoints themselves.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const DERIVRULES = 'math.calc.derivative-rules'
const DIFFTY = 'math.calc.differentiability'
const MVT = 'math.calc.mean-value-theorem'

export const MATHEMATICS_CALCULUS_DERIV_RULES_DIFF_MVT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DERIVRULES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The power rule d/dx(x^n)=nx^(n-1) applies for any constant n, alongside the constant multiple '
      + 'rule d/dx(cf)=c·f\' and the sum/difference rule d/dx(f±g)=f\'±g\'. THE POWER RULE REQUIRES '
      + 'THE BASE TO BE THE VARIABLE AND THE EXPONENT TO BE A CONSTANT — x^3 qualifies, but e^x and '
      + '2^x do NOT, since there the roles are reversed (constant base, variable exponent); applying '
      + 'nx^(n-1)-style reasoning to them produces a formula that is simply wrong.\n\n'
      + 'THE CONSTANT MULTIPLE RULE\'S COEFFICIENT SURVIVES, IT NEVER VANISHES. d/dx(cf)=c·f\' means '
      + 'the coefficient multiplies the result — d/dx(3x²)=3·(2x)=6x, never 2x. This is a genuinely '
      + 'different rule from d/dx(c)=0 (a bare constant vanishing); a coefficient multiplying a '
      + 'variable expression is not the same thing as a standalone constant.\n\n'
      + 'THE SUM RULE\'S TERM-BY-TERM BEHAVIOR NEVER EXTENDS TO PRODUCTS. d/dx(f·g)≠f\'·g\' — this is '
      + 'simply false. When two power functions multiply, the correct move is to SIMPLIFY the '
      + 'product into a single power FIRST (x²·x³=x⁵, then differentiate to get 5x⁴), never to '
      + 'differentiate each factor separately and multiply the results.',
    targetedMisconceptions: [`${DERIVRULES}:MC-1`, `${DERIVRULES}:MC-2`, `${DERIVRULES}:MC-3`],
    source: eb(DERIVRULES, 'Core Understanding — the power rule requires a variable base and constant exponent, a coefficient survives as a multiplier rather than vanishing, and the sum rule\'s term-by-term behavior never extends to products'),
  },
  {
    conceptId: DIFFTY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'f is differentiable at a exactly when f\'(a)=lim_{h→0}[f(a+h)-f(a)]/h EXISTS as a finite '
      + 'number. VISUAL SMOOTHNESS NEVER SETTLES THIS QUESTION — the one-sided derivatives must '
      + 'actually be computed and compared, never assumed from how the graph looks. Three '
      + 'geometrically distinct failure modes exist: a CORNER (left-hand and right-hand derivatives '
      + 'both finite but genuinely different, like |x| at 0 where they are −1 and +1), a CUSP '
      + '(the derivative diverges to ±∞ from both sides with OPPOSITE signs), and a VERTICAL TANGENT '
      + '(diverges to ±∞ from both sides with the SAME sign).\n\n'
      + 'THE RELATIONSHIP TO CONTINUITY IS STRICTLY ONE-DIRECTIONAL: differentiability implies '
      + 'continuity (if the tangent slope exists, the graph cannot jump or have a hole there), but '
      + 'the CONVERSE IS FALSE. |x| at 0 is perfectly continuous — no jump — yet NOT differentiable, '
      + 'a corner where the one-sided derivatives disagree. This makes checking differentiability at '
      + 'a piecewise boundary a TWO-PART TEST: continuity alone certifies nothing about the tangent '
      + 'slope\'s existence — the one-sided DERIVATIVES must also independently agree.',
    targetedMisconceptions: [`${DIFFTY}:MC-1`, `${DIFFTY}:MC-2`],
    source: eb(DIFFTY, 'Core Understanding — differentiability requires actually computing the one-sided derivatives rather than judging by appearance, and continuity never implies differentiability, with |x| at 0 as the standing counterexample'),
  },
  {
    conceptId: MVT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The Mean Value Theorem states: if f is continuous on the closed interval [a,b] AND '
      + 'differentiable on the open interval (a,b), then some c in (a,b) satisfies '
      + 'f\'(c)=[f(b)-f(a)]/(b-a) — the instantaneous rate at c matches the interval\'s average rate. '
      + 'BOTH HYPOTHESES MUST BE CHECKED BEFORE SOLVING FOR c, never assumed: if either hypothesis '
      + 'fails anywhere in the interval, the theorem\'s guarantee simply does not apply — there might '
      + 'still happen to be a qualifying c, or there might not; the theorem gives no information '
      + 'either way in that case.\n\n'
      + 'THE THEOREM GUARANTEES AT LEAST ONE c, NEVER EXACTLY ONE. It is a pure existence claim: '
      + '"there exists c" is silent on count. Finding TWO OR MORE valid solutions to the conclusion '
      + 'equation is never an error to be second-guessed — it is simply more than the theorem\'s '
      + 'stated minimum.\n\n'
      + 'THE TWO HYPOTHESES HAVE DELIBERATELY DIFFERENT DOMAINS. Continuity is required on the CLOSED '
      + 'interval (including both endpoints), while differentiability is required only on the OPEN '
      + 'interval (endpoints excluded). A function that is differentiable everywhere on (a,b) but '
      + 'only one-sided-differentiable exactly at an endpoint still satisfies the theorem\'s '
      + 'hypotheses in full — the differentiability requirement is never extended to the endpoints '
      + 'themselves.',
    targetedMisconceptions: [`${MVT}:MC-1`, `${MVT}:MC-2`, `${MVT}:MC-3`],
    source: eb(MVT, 'Core Understanding — both hypotheses must be verified before solving for c, the theorem guarantees at least one c rather than exactly one, and differentiability is required only on the open interval, never at the endpoints'),
  },
]

export const MATHEMATICS_CALCULUS_DERIV_RULES_DIFF_MVT_PROBES: SeedProbe[] = [
  // --- math.calc.derivative-rules ------------------------------------------------
  {
    conceptId: DERIVRULES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does the power rule d/dx(x^n)=nx^(n-1) apply directly to differentiate e^x?',
    choices: [
      { text: 'No — in e^x the variable is the EXPONENT and the base is fixed (the roles are reversed from x^n), so the power rule\'s scope condition fails and a different rule is needed', isCorrect: true },
      { text: 'Yes — e^x has an exponent, so d/dx(e^x)=x·e^(x-1) by the same power-rule pattern', isCorrect: false, misconceptionId: `${DERIVRULES}:MC-1` },
      { text: 'Yes, since any expression with an exponent can be differentiated by bringing the exponent down and reducing it by one', isCorrect: false, misconceptionId: `${DERIVRULES}:MC-1` },
    ],
    targetedMisconceptions: [`${DERIVRULES}:MC-1`],
    source: eb(DERIVRULES, 'Detection probe (Blueprint A03/B-MC1) — the power rule requires the base to be the variable and the exponent to be constant; e^x reverses these roles, so the rule does not apply'),
  },
  {
    conceptId: DERIVRULES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Find d/dx(3x²).',
    choices: [
      { text: '6x — the coefficient 3 survives, multiplying the power rule\'s result 2x', isCorrect: true },
      { text: '2x — the coefficient 3 vanishes under differentiation, the same way a bare constant does', isCorrect: false, misconceptionId: `${DERIVRULES}:MC-2` },
      { text: '3 — only the coefficient survives, since differentiating a squared term reduces it to a constant', isCorrect: false, misconceptionId: `${DERIVRULES}:MC-2` },
    ],
    targetedMisconceptions: [`${DERIVRULES}:MC-2`],
    source: eb(DERIVRULES, 'Detection probe (Blueprint B-MC2) — a coefficient multiplying a variable expression survives into the derivative as a multiplier, never vanishing the way a standalone constant does'),
  },
  {
    conceptId: DERIVRULES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Find d/dx(x²·x³).',
    choices: [
      { text: 'Simplify first: x²·x³=x⁵, so d/dx(x⁵)=5x⁴', isCorrect: true },
      { text: 'Differentiate each factor separately and multiply: (2x)(3x²)=6x³', isCorrect: false, misconceptionId: `${DERIVRULES}:MC-3` },
      { text: 'Apply the sum rule to the product the same way it applies to a sum, giving 2x+3x²', isCorrect: false, misconceptionId: `${DERIVRULES}:MC-3` },
    ],
    targetedMisconceptions: [`${DERIVRULES}:MC-3`],
    source: eb(DERIVRULES, 'Detection probe (Blueprint B-MC3) — the sum rule\'s term-by-term behavior never extends to products; a product of power functions must be simplified into a single power before differentiating'),
  },

  // --- math.calc.differentiability ------------------------------------------------
  {
    conceptId: DIFFTY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'f(x)=|x-3| is defined everywhere and its graph looks fairly smooth on a coarse sketch near x=3. Is f differentiable at x=3?',
    choices: [
      { text: 'Not necessarily — the one-sided derivatives must actually be computed; here they disagree (a corner at x=3), so f is NOT differentiable there despite the coarse-sketch appearance', isCorrect: true },
      { text: 'Yes — the function is defined everywhere and looks continuous enough on the graph, so it must be differentiable', isCorrect: false, misconceptionId: `${DIFFTY}:MC-1` },
      { text: 'Yes, since a function with no visible break in a rough sketch is always differentiable at every point', isCorrect: false, misconceptionId: `${DIFFTY}:MC-1` },
    ],
    targetedMisconceptions: [`${DIFFTY}:MC-1`],
    source: eb(DIFFTY, 'Detection probe (Blueprint B01) — differentiability is never settled by visual appearance; the one-sided derivatives must actually be computed and compared'),
  },
  {
    conceptId: DIFFTY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: '|x| is continuous at x=0 (no jump or gap). Does that mean |x| is also differentiable at x=0?',
    choices: [
      { text: 'No — the one-sided derivatives at 0 are −1 and +1, which disagree (a corner); continuity is necessary but never sufficient for differentiability', isCorrect: true },
      { text: 'Yes — since it is continuous there, with no gaps, it must also be differentiable', isCorrect: false, misconceptionId: `${DIFFTY}:MC-2` },
      { text: 'Yes, since continuity and differentiability are essentially the same requirement stated two different ways', isCorrect: false, misconceptionId: `${DIFFTY}:MC-2` },
    ],
    targetedMisconceptions: [`${DIFFTY}:MC-2`],
    source: eb(DIFFTY, 'Detection probe (Blueprint B02) — continuity never implies differentiability; |x| at 0 is the standing counterexample, continuous yet with disagreeing one-sided derivatives'),
  },
  {
    conceptId: DIFFTY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A function\'s derivative diverges to +∞ approaching a point from the left and to −∞ approaching from the right. Is this a corner, a cusp, or a vertical tangent?',
    choices: [
      { text: 'A cusp — both sides diverge to ±∞ but with OPPOSITE signs, distinct from a vertical tangent (same sign) or a corner (both finite but different)', isCorrect: true },
      { text: 'A corner, since the two sides clearly disagree with each other', isCorrect: false, misconceptionId: `${DIFFTY}:MC-1` },
      { text: 'A vertical tangent, since both sides are unbounded', isCorrect: false, misconceptionId: `${DIFFTY}:MC-1` },
    ],
    targetedMisconceptions: [`${DIFFTY}:MC-1`],
    source: eb(DIFFTY, 'Detection probe (Blueprint) — a cusp is specifically both sides diverging to ±∞ with opposite signs, distinguished by this precise signature from a corner (both finite) or a vertical tangent (same-sign divergence)'),
  },

  // --- math.calc.mean-value-theorem -----------------------------------------------
  {
    conceptId: MVT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Applying the MVT to f(x)=|x| on [−1,1], should you proceed directly to solve f\'(c)=[f(1)-f(-1)]/(1-(-1)) for c?',
    choices: [
      { text: 'No — first check the hypotheses; f is not differentiable at x=0, which lies in the open interval (−1,1), so the MVT\'s guarantee does not apply here', isCorrect: true },
      { text: 'Yes — the conclusion formula can always be solved directly for any function without first checking anything', isCorrect: false, misconceptionId: `${MVT}:MC-1` },
      { text: 'Yes, since checking continuity and differentiability is only necessary when the function looks visibly unusual', isCorrect: false, misconceptionId: `${MVT}:MC-1` },
    ],
    targetedMisconceptions: [`${MVT}:MC-1`],
    source: eb(MVT, 'Detection probe (Blueprint A01/B01) — the MVT\'s hypotheses (continuity on the closed interval, differentiability on the open interval) must be checked before solving for c, never assumed'),
  },
  {
    conceptId: MVT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Solving the MVT\'s conclusion equation for f(x)=x³−3x on [−2,2], you find TWO valid values of c in the open interval. Did you make an error?',
    choices: [
      { text: 'No — the theorem guarantees "at least one" c, never "exactly one"; finding two valid solutions is simply more than the theorem\'s stated minimum, not an error', isCorrect: true },
      { text: 'Yes — the theorem promises exactly one value of c, so finding two indicates a computational mistake', isCorrect: false, misconceptionId: `${MVT}:MC-2` },
      { text: 'Yes, since only the smaller (or larger) of the two solutions can be the theorem\'s "correct" answer', isCorrect: false, misconceptionId: `${MVT}:MC-2` },
    ],
    targetedMisconceptions: [`${MVT}:MC-2`],
    source: eb(MVT, 'Detection probe (Blueprint A02/B02) — the MVT is a pure existence claim guaranteeing at least one c, silent on count; multiple valid solutions are never an error'),
  },
  {
    conceptId: MVT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A function is differentiable everywhere on the open interval (a,b) but only one-sided-differentiable exactly at endpoint b. Does the MVT still apply?',
    choices: [
      { text: 'Yes — differentiability is only required on the OPEN interval (a,b), which excludes the endpoints; an irregularity exactly at b does not violate the theorem\'s hypotheses', isCorrect: true },
      { text: 'No — the function must be differentiable everywhere on the closed interval [a,b], including both endpoints, for the theorem to apply', isCorrect: false, misconceptionId: `${MVT}:MC-3` },
      { text: 'No, since any irregularity anywhere in the interval, including at an endpoint, disqualifies the theorem entirely', isCorrect: false, misconceptionId: `${MVT}:MC-3` },
    ],
    targetedMisconceptions: [`${MVT}:MC-3`],
    source: eb(MVT, 'Detection probe (Blueprint A03/B03) — differentiability is required only on the open interval, deliberately excluding the endpoints; an endpoint irregularity does not block the theorem\'s application'),
  },
]
