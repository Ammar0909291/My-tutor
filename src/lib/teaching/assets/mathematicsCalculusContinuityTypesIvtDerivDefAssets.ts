/**
 * Second math.calc asset batch — discontinuity classification, the
 * Intermediate Value Theorem, and the formal derivative definition.
 *
 * Continues serving-asset coverage for math.calc (7/76 -> 10/76).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.calc.continuity-types.md,
 * math.calc.ivt.md, and math.calc.derivative-definition.md.
 *
 *   CONTTYPES    continuity-types — a zero denominator in the original
 *                expression never by itself determines the discontinuity
 *                type; it requires factoring to check whether the
 *                numerator cancels (removable) or not (infinite); f(a)
 *                being defined never by itself settles "removable" —
 *                what decides removable-versus-jump is whether the two
 *                one-sided limits actually agree.
 *   IVT          ivt — continuity is the essential hypothesis making the
 *                Intermediate Value Theorem's guarantee true, never a
 *                minor technical footnote; a sign-change-plus-continuity
 *                check is the COMPLETE proof of root existence, nothing
 *                further (no solving, no estimating) is needed; IVT
 *                proves existence, never location — a genuinely separate
 *                iterative technique (bisection) is needed to find the
 *                root.
 *   DERIVDEF     derivative-definition — the h→0 LIMIT is what makes the
 *                formal definition a derivative, never any single fixed
 *                value of h (or the pre-limit simplified expression
 *                itself); continuity never implies differentiability —
 *                |x| at 0 is the standing counterexample to that false
 *                converse; hitting 0/0 under direct substitution is a
 *                SIGNAL that more algebra (combining fractions, factoring)
 *                is needed first, never a final answer or a "does not
 *                exist" conclusion.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const CONTTYPES = 'math.calc.continuity-types'
const IVT = 'math.calc.ivt'
const DERIVDEF = 'math.calc.derivative-definition'

export const MATHEMATICS_CALCULUS_CONTINUITY_TYPES_IVT_DERIV_DEF_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CONTTYPES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Exactly three discontinuity types exist, each distinguished by systematically examining the '
      + 'one-sided limits. A REMOVABLE discontinuity occurs when the two-sided limit EXISTS (both '
      + 'one-sided limits agree on a common finite value L) but f(a) fails to match it — either '
      + 'undefined or disagreeing. This is called "removable" because redefining f(a)=L would fix it '
      + 'entirely, since the correct value is already known from the limit. A JUMP discontinuity '
      + 'occurs when both one-sided limits are finite but DISAGREE — neither side itself is '
      + 'problematic, but no single-point redefinition can fix this, since no one value could match '
      + 'both disagreeing sides. An INFINITE discontinuity occurs when at least one one-sided limit '
      + 'is itself unbounded, producing a vertical asymptote.\n\n'
      + 'A ZERO DENOMINATOR IN THE ORIGINAL EXPRESSION NEVER, BY ITSELF, DETERMINES THE TYPE. Whether '
      + 'a denominator-zero point is removable or infinite depends entirely on whether the '
      + 'corresponding numerator factor CANCELS (removable, the limit exists finitely after '
      + 'cancellation) or does not (infinite, the function genuinely blows up) — this requires the '
      + 'full factor-and-classify procedure, never a surface read of "there\'s a zero in the '
      + 'denominator." Likewise, f(a) being DEFINED never by itself means "removable" — the actual '
      + 'test is whether the two one-sided limits agree with each other, a genuinely separate, more '
      + 'precise condition.',
    targetedMisconceptions: [`${CONTTYPES}:MC-1`, `${CONTTYPES}:MC-2`],
    source: eb(CONTTYPES, 'Core Understanding — a zero denominator never by itself determines removable versus infinite, and f(a) being defined never by itself determines removable versus jump; both require the actual one-sided-limit and factoring checks'),
  },
  {
    conceptId: IVT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The Intermediate Value Theorem (IVT) states: if f is continuous on [a,b] and N is between '
      + 'f(a) and f(b), then some c in (a,b) satisfies f(c)=N. CONTINUITY IS THE ESSENTIAL '
      + 'HYPOTHESIS, never a minor technical footnote — it is precisely what rules out a function '
      + '"skipping over" a value without ever hitting it. A discontinuous function CAN jump straight '
      + 'past a value N, going from below it to above it without ever equalling it; continuity rules '
      + 'this failure mode out entirely.\n\n'
      + 'PROVING EXISTENCE VIA A SIGN CHANGE REQUIRES NO SOLVING WHATSOEVER. To show f(c)=0 for some '
      + 'c, IVT requires only two checks: f continuous on [a,b], and f(a)/f(b) having OPPOSITE signs. '
      + 'The theorem then GUARANTEES some c exists — without ever solving for c\'s value, estimating '
      + 'where it might be, or doing anything beyond confirming it lies in (a,b). This '
      + 'sign-change-plus-continuity check IS the complete, rigorous proof; nothing further is '
      + 'needed.\n\n'
      + 'IVT PROVES EXISTENCE, NOT LOCATION. Its conclusion is purely existential — "some c exists" '
      + '— providing no formula or procedure for actually finding c\'s numeric value. Locating the '
      + 'root requires a genuinely separate, iterative technique (such as bisection, repeatedly '
      + 'halving the interval and checking which half retains the sign change).',
    targetedMisconceptions: [`${IVT}:MC-1`, `${IVT}:MC-2`, `${IVT}:MC-3`],
    source: eb(IVT, 'Core Understanding — continuity is the essential hypothesis that makes IVT true, a sign-change-plus-continuity check is the complete existence proof, and IVT proves existence only, never the root\'s location'),
  },
  {
    conceptId: DERIVDEF, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The formal derivative definition f\'(x) = lim_{h→0} [f(x+h)-f(x)]/h makes the secant-to-tangent '
      + 'picture computable: [f(x+h)-f(x)]/h is the rise-over-run secant slope between x and x+h, '
      + 'with "sliding toward" made precise as a limit. Setting h=0 directly gives [f(x)-f(x)]/0 = '
      + '0/0, an indeterminate form carrying no information — THE h→0 LIMIT ITSELF IS WHAT MAKES IT A '
      + 'DERIVATIVE, never any single fixed value of h, however small, and never the pre-limit '
      + 'simplified expression that still contains h. The entire computational skill is algebraic '
      + 'manipulation (expand, simplify, factor) that cancels the h in the denominator BEFORE taking '
      + 'the limit — at which point substituting h=0 becomes legitimate.\n\n'
      + 'DIFFERENTIABLE IMPLIES CONTINUOUS, BUT THE CONVERSE IS FALSE. If a function has a '
      + 'well-defined tangent slope at a point, it cannot have a jump or hole there, so '
      + 'differentiable implies continuous. But a function CAN be perfectly continuous while still '
      + 'having no well-defined tangent slope — because the secant slopes from the left and right '
      + 'disagree (a corner), grow unboundedly (a vertical tangent), or oscillate without settling (a '
      + 'cusp). |x| at x=0 is the standing counterexample: continuous everywhere, yet its left-hand '
      + 'and right-hand difference-quotient limits are −1 and +1 — they disagree, so no derivative '
      + 'exists there.\n\n'
      + 'HITTING 0/0 UNDER DIRECT SUBSTITUTION IS A SIGNAL, NEVER A FINAL ANSWER. Substituting h=0 '
      + 'directly into an unsimplified difference quotient produces 0/0 — this means more algebra '
      + '(combining fractions, factoring) is needed FIRST, before the limit can be legitimately '
      + 'taken, never a stopping point or a conclusion that the derivative does not exist.',
    targetedMisconceptions: [`${DERIVDEF}:MC-1`, `${DERIVDEF}:MC-2`, `${DERIVDEF}:MC-3`],
    source: eb(DERIVDEF, 'Core Understanding — the h→0 limit itself is what makes the definition a derivative, differentiability is strictly stronger than continuity with |x| as the standing counterexample to the converse, and 0/0 under direct substitution is a signal for more algebra, never a final answer'),
  },
]

export const MATHEMATICS_CALCULUS_CONTINUITY_TYPES_IVT_DERIV_DEF_PROBES: SeedProbe[] = [
  // --- math.calc.continuity-types ----------------------------------------------
  {
    conceptId: CONTTYPES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Classify the discontinuity of f(x) = (x²−4)/(x−2) at x=2.',
    choices: [
      { text: 'Removable — factoring gives (x−2)(x+2)/(x−2)=x+2 for x≠2, so lim_{x→2}f(x)=4 exists finitely while f(2) is undefined in the original', isCorrect: true },
      { text: 'Infinite — the denominator equals zero at x=2, so the discontinuity must be infinite', isCorrect: false, misconceptionId: `${CONTTYPES}:MC-1` },
      { text: 'Jump — a zero denominator always produces either an infinite or a jump discontinuity, never removable', isCorrect: false, misconceptionId: `${CONTTYPES}:MC-1` },
    ],
    targetedMisconceptions: [`${CONTTYPES}:MC-1`],
    source: eb(CONTTYPES, 'Detection probe (Blueprint) — a zero denominator alone never determines infinite versus removable; factoring to check whether the numerator cancels is required first'),
  },
  {
    conceptId: CONTTYPES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'f(x)=x for x<1, f(x)=x+2 for x≥1. f(1)=3 is defined. Is the discontinuity at x=1 removable?',
    choices: [
      { text: 'No — computing both one-sided limits gives 1 and 3, which disagree, so this is a JUMP discontinuity regardless of f(1) being defined', isCorrect: true },
      { text: 'Yes — f(1)=3 is defined, and a defined function value at the point means the discontinuity is removable', isCorrect: false, misconceptionId: `${CONTTYPES}:MC-2` },
      { text: 'Yes, since removability only requires that the function have SOME actual value at the point in question', isCorrect: false, misconceptionId: `${CONTTYPES}:MC-2` },
    ],
    targetedMisconceptions: [`${CONTTYPES}:MC-2`],
    source: eb(CONTTYPES, 'Detection probe (Blueprint) — removability is decided by whether the one-sided limits agree with each other, never by whether f(a) merely happens to be defined'),
  },
  {
    conceptId: CONTTYPES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A discontinuity has both one-sided limits finite but unequal. Is this a jump or an infinite discontinuity?',
    choices: [
      { text: 'Jump — both sides are finite (merely disagreeing); an infinite discontinuity requires at least one side to be itself unbounded, which is a genuinely different situation', isCorrect: true },
      { text: 'Infinite, since any disagreement between the one-sided limits qualifies as an infinite discontinuity', isCorrect: false, misconceptionId: `${CONTTYPES}:MC-1` },
      { text: 'It cannot be determined without knowing whether the original expression had a zero denominator', isCorrect: false, misconceptionId: `${CONTTYPES}:MC-1` },
    ],
    targetedMisconceptions: [`${CONTTYPES}:MC-1`],
    source: eb(CONTTYPES, 'Detection probe (Blueprint) — jump means both one-sided limits are finite but unequal; infinite means at least one side is itself unbounded, a distinct and separately-checkable condition'),
  },

  // --- math.calc.ivt -------------------------------------------------------------
  {
    conceptId: IVT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'g(x)=1/(x−2.5) on [2,3] has g(2)=−2 and g(3)=2 (opposite signs), but g is discontinuous at x=2.5. Does IVT guarantee a root exists in (2,3)?',
    choices: [
      { text: 'No — IVT\'s guarantee requires continuity on the whole interval; since g is discontinuous inside [2,3], the theorem does not apply, and in fact g never equals 0 anywhere', isCorrect: true },
      { text: 'Yes — the endpoints have opposite signs, which is sufficient for IVT to guarantee a root regardless of continuity', isCorrect: false, misconceptionId: `${IVT}:MC-1` },
      { text: 'Yes, since a single interior discontinuity is too minor a violation to actually block IVT\'s conclusion', isCorrect: false, misconceptionId: `${IVT}:MC-1` },
    ],
    targetedMisconceptions: [`${IVT}:MC-1`],
    source: eb(IVT, 'Detection probe (Blueprint) — continuity is the essential hypothesis making IVT valid; without it, a function can genuinely skip past a target value, and the theorem\'s conclusion can fail outright'),
  },
  {
    conceptId: IVT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For f(x)=x³−2x−5 (continuous everywhere), f(2)=−1<0 and f(3)=16>0. Have you now completely proven a root exists in (2,3)?',
    choices: [
      { text: 'Yes — continuity plus the opposite-sign endpoints is the complete IVT proof; nothing further (no solving or estimating the root\'s value) is needed', isCorrect: true },
      { text: 'No — the proof also requires narrowing down or estimating where the root actually lies before existence is established', isCorrect: false, misconceptionId: `${IVT}:MC-2` },
      { text: 'No, since IVT only becomes a complete proof once the root\'s approximate numeric value has been computed', isCorrect: false, misconceptionId: `${IVT}:MC-2` },
    ],
    targetedMisconceptions: [`${IVT}:MC-2`],
    source: eb(IVT, 'Detection probe (Blueprint) — a sign-change-plus-continuity check IS the complete, rigorous existence proof; no further computation, estimation, or narrowing is needed'),
  },
  {
    conceptId: IVT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'IVT has just established that a root of f exists somewhere in (2,3). Does IVT itself tell you the root\'s approximate numeric location?',
    choices: [
      { text: 'No — IVT is a purely existential theorem; finding the root\'s actual location requires a genuinely separate, iterative technique such as bisection', isCorrect: true },
      { text: 'Yes — IVT\'s proof process itself narrows down the root\'s location as a byproduct of checking the sign change', isCorrect: false, misconceptionId: `${IVT}:MC-3` },
      { text: 'Yes, since any theorem that proves something exists must also indicate roughly where it is', isCorrect: false, misconceptionId: `${IVT}:MC-3` },
    ],
    targetedMisconceptions: [`${IVT}:MC-3`],
    source: eb(IVT, 'Detection probe (Blueprint) — IVT guarantees existence only; it provides no formula or procedure for actually locating the root, which requires a separate iterative method like bisection'),
  },

  // --- math.calc.derivative-definition -------------------------------------------
  {
    conceptId: DERIVDEF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Finding f\'(2) for f(x)=x² using the definition, you simplify the difference quotient to 4+h. Is f\'(2)=4+h the final answer?',
    choices: [
      { text: 'No — you must still take the limit as h→0; only after that step does f\'(2)=4, since the derivative is the limit, not any expression still containing h', isCorrect: true },
      { text: 'Yes — 4+h is the simplified difference quotient, and simplification is the final step of the derivative definition', isCorrect: false, misconceptionId: `${DERIVDEF}:MC-1` },
      { text: 'Yes, since substituting any specific small value of h into 4+h gives a valid derivative value', isCorrect: false, misconceptionId: `${DERIVDEF}:MC-1` },
    ],
    targetedMisconceptions: [`${DERIVDEF}:MC-1`],
    source: eb(DERIVDEF, 'Detection probe (Blueprint A01) — the h→0 limit itself is what makes the definition a derivative; a pre-limit expression still containing h, or its value at one fixed h, is never the derivative itself'),
  },
  {
    conceptId: DERIVDEF, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'f(x)=|x| is continuous at x=0 (no gaps or breaks). Does that mean f is also differentiable at x=0?',
    choices: [
      { text: 'No — the left-hand and right-hand difference-quotient limits at x=0 are −1 and +1, which disagree, so f\'(0) does not exist; continuity never implies differentiability', isCorrect: true },
      { text: 'Yes — since the graph has no gaps or breaks there, it must also have a well-defined tangent slope', isCorrect: false, misconceptionId: `${DERIVDEF}:MC-2` },
      { text: 'Yes, since differentiability is just a slightly stronger way of saying "continuous," so one always follows from the other', isCorrect: false, misconceptionId: `${DERIVDEF}:MC-2` },
    ],
    targetedMisconceptions: [`${DERIVDEF}:MC-2`],
    source: eb(DERIVDEF, 'Detection probe (Blueprint A03) — differentiable implies continuous, but the converse is false; |x| at x=0 is the standing counterexample, continuous yet not differentiable'),
  },
  {
    conceptId: DERIVDEF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Finding f\'(x) for f(x)=1/x, substituting h=0 directly into [1/(x+h)−1/x]/h gives 0/0. What should you do?',
    choices: [
      { text: 'Combine the fractions in the numerator first (getting −h/(x(x+h))), which cancels the h in the denominator, THEN take the limit as h→0', isCorrect: true },
      { text: 'Report 0/0 as the final derivative, since that is what direct substitution produces', isCorrect: false, misconceptionId: `${DERIVDEF}:MC-3` },
      { text: 'Conclude that f is not differentiable at this x, since the difference quotient produces an indeterminate form', isCorrect: false, misconceptionId: `${DERIVDEF}:MC-3` },
    ],
    targetedMisconceptions: [`${DERIVDEF}:MC-3`],
    source: eb(DERIVDEF, 'Detection probe (Blueprint A01) — hitting 0/0 under direct substitution is a signal that more algebra (combining fractions, factoring) is needed before the limit can legitimately be taken, never a final answer'),
  },
]
