/**
 * First math.calc asset batch of the post-math.alg campaign — limit laws,
 * one-sided limits, and continuity.
 *
 * Opens serving-asset coverage for math.calc (4/76 -> 7/76).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.calc.limit-laws.md,
 * math.calc.one-sided-limits.md, and math.calc.continuity.md.
 *
 *   LIMITLAWS    limit-laws — each law (sum, product, power) applies ONLY
 *                once each individual piece's limit is already confirmed
 *                to exist, never assumed; the quotient law's zero-
 *                denominator-limit condition is not optional — when it
 *                fails, the law simply does not apply, it does NOT mean
 *                the overall limit is automatically undefined. Only 2
 *                misconceptions exist in the EB entry; MC-2 is reused
 *                across two probes at different framings per campaign
 *                convention.
 *   ONESIDEDLIM  one-sided-limits — a piecewise one-sided limit is
 *                evaluated using the piece governing the APPROACHING
 *                side, never the piece that merely contains the boundary
 *                point itself; both one-sided limits existing is NOT
 *                sufficient for the two-sided limit to exist — they must
 *                also AGREE; the limit describes where a function is
 *                heading, never where it is separately, actually defined
 *                to sit.
 *   CONTINUITY   continuity — all three conditions (defined, limit
 *                exists, limit equals value) are required SIMULTANEOUSLY,
 *                none optional and none implying another; a smooth-
 *                looking simplified graph can hide a removable
 *                discontinuity invisible to visual inspection alone; a
 *                piecewise formula change at a boundary does NOT by
 *                itself imply discontinuity — only the actual three-
 *                condition check decides.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const LIMITLAWS = 'math.calc.limit-laws'
const ONESIDEDLIM = 'math.calc.one-sided-limits'
const CONTINUITY = 'math.calc.continuity'

export const MATHEMATICS_CALCULUS_LIMIT_LAWS_CONTINUITY_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LIMITLAWS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The limit laws let you compute the limit of a combined expression directly from the limits '
      + 'of its individual pieces, without redoing a full approach analysis every time: the '
      + 'sum/difference law lim(f±g)=lim f±lim g, the product law lim(fg)=(lim f)(lim g), and the '
      + 'power law lim(f^n)=(lim f)^n. EACH LAW APPLIES ONLY WHEN THE INDIVIDUAL PIECE LIMITS ALREADY '
      + 'EXIST — for a compound expression like lim(f·g+h), each of lim f, lim g, and lim h must be '
      + 'confirmed to exist individually BEFORE combining them; skipping this verification usually '
      + 'looks fine when the pieces happen to behave well, but the laws are only valid because that '
      + 'verification actually holds.\n\n'
      + 'THE QUOTIENT LAW\'S CONDITION, lim g≠0, IS NOT OPTIONAL. lim(f/g)=(lim f)/(lim g) requires '
      + 'lim g≠0. When the denominator\'s limit IS zero, this does NOT mean the overall limit is '
      + 'automatically undefined or some symbolic infinity produced by treating the law as still '
      + 'valid — it means this PARTICULAR LAW cannot be used, and a different technique (factoring, '
      + 'rationalizing, or a more advanced method) is required. The true limit could still be a '
      + 'finite value, +∞, −∞, or genuinely not exist — the failed condition tells you only that '
      + 'this tool has failed, never what the answer is.',
    targetedMisconceptions: [`${LIMITLAWS}:MC-1`, `${LIMITLAWS}:MC-2`],
    source: eb(LIMITLAWS, 'Core Understanding — each limit law applies only once its individual pieces\' limits are confirmed to exist, and the quotient law\'s zero-denominator condition failing means the law does not apply, never that the limit is automatically undefined'),
  },
  {
    conceptId: ONESIDEDLIM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A one-sided limit restricts the approach to values strictly on one side of a. '
      + 'lim_{x→a+}f(x)=L means f(x) gets arbitrarily close to L as x approaches a ONLY through '
      + 'values greater than a; lim_{x→a-}f(x) is the mirror notion from below. For a piecewise '
      + 'function, computing a one-sided limit at a boundary point a means using whichever PIECE '
      + 'governs the approaching side — never the piece that happens to literally contain a itself '
      + 'in its domain condition, if that differs from the approaching side.\n\n'
      + 'THE EQUIVALENCE THEOREM: the two-sided limit exists if and only if BOTH one-sided limits '
      + 'exist AND agree. Both existence and agreement are required — neither alone is sufficient. A '
      + 'JUMP DISCONTINUITY is precisely the case where both one-sided limits exist individually but '
      + 'disagree: neither one-sided computation is itself problematic, yet the two-sided limit still '
      + 'fails to exist, because agreement, not mere existence, is the requirement.\n\n'
      + 'Finally, the limit describes where a function is HEADING as x approaches a — completely '
      + 'independent of where the function is separately, actually defined to sit at a itself. A '
      + 'graph can show an open circle (the approach height) at a different height from a filled dot '
      + '(the defined value) at the same x — the limit is the open circle\'s height, never the dot\'s.',
    targetedMisconceptions: [`${ONESIDEDLIM}:MC-1`, `${ONESIDEDLIM}:MC-2`, `${ONESIDEDLIM}:MC-3`],
    source: eb(ONESIDEDLIM, 'Core Understanding — a one-sided limit uses the piece governing the approaching direction, the equivalence theorem requires both existence and agreement, and the limit is the approach height, never the separately-defined value'),
  },
  {
    conceptId: CONTINUITY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A function is continuous at a point exactly when three conditions ALL hold simultaneously, '
      + 'none optional and none implying another: (C1) f(a) is defined; (C2) lim_{x→a}f(x) exists; '
      + '(C3) lim_{x→a}f(x)=f(a). Crucially, C2 holding is necessary but never sufficient on its own '
      + '— C3 is a separate, independently-checkable fact that the limit must specifically MATCH the '
      + 'function\'s actual value.\n\n'
      + 'WHICH CONDITION FAILS DETERMINES THE TYPE OF DISCONTINUITY. A REMOVABLE discontinuity (a '
      + 'hole) occurs when the limit exists (C2 holds) but C1 or C3 fails — the only type fixable by '
      + 'redefining a single point, since the correct value is already known from the limit. A JUMP '
      + 'discontinuity occurs when the one-sided limits exist individually but disagree. An INFINITE '
      + 'discontinuity occurs when a one-sided limit is itself unbounded, producing a vertical '
      + 'asymptote.\n\n'
      + 'A PIECEWISE FORMULA CHANGE AT A BOUNDARY DOES NOT, BY ITSELF, PRODUCE A DISCONTINUITY — the '
      + 'three-condition test must be applied explicitly at every boundary point; many well-behaved '
      + 'functions (like |x|) are perfectly continuous everywhere despite a formula change. And a '
      + 'SIMPLIFIED graph can look perfectly smooth while hiding a removable discontinuity — the '
      + 'algebraic three-condition test catches this precisely because it checks the ORIGINAL '
      + 'function\'s defined status directly, never relying on how the simplified graph happens to '
      + 'look.',
    targetedMisconceptions: [`${CONTINUITY}:MC-1`, `${CONTINUITY}:MC-2`, `${CONTINUITY}:MC-3`],
    source: eb(CONTINUITY, 'Core Understanding — all three continuity conditions are required simultaneously, the failing condition determines the discontinuity type, and neither visual inspection nor a piecewise formula change alone decides the outcome'),
  },
]

export const MATHEMATICS_CALCULUS_LIMIT_LAWS_CONTINUITY_PROBES: SeedProbe[] = [
  // --- math.calc.limit-laws ---------------------------------------------------
  {
    conceptId: LIMITLAWS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Given lim_{x→2}f(x)=6 and lim_{x→2}g(x)=0, find lim_{x→2}[f(x)/g(x)] using the quotient law.',
    choices: [
      { text: 'The quotient law does not apply here (its precondition lim g≠0 fails) — a different technique is needed; the actual limit could be finite, ±∞, or nonexistent depending on the real functions', isCorrect: true },
      { text: '6/0 = undefined, so the limit does not exist — this follows directly from applying the quotient law', isCorrect: false, misconceptionId: `${LIMITLAWS}:MC-1` },
      { text: 'The quotient law still applies and gives a limit of 0, since dividing by an infinitesimally small quantity yields 0', isCorrect: false, misconceptionId: `${LIMITLAWS}:MC-1` },
    ],
    targetedMisconceptions: [`${LIMITLAWS}:MC-1`],
    source: eb(LIMITLAWS, 'Detection probe — the quotient law simply does not apply when the denominator\'s limit is 0, this does not mean the limit doesn\'t exist, only that this particular law can\'t answer the question'),
  },
  {
    conceptId: LIMITLAWS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Given lim_{x→1}f(x)=2 and lim_{x→1}g(x)=3, find lim_{x→1}[f(x)^2·g(x)] using the power and product laws.',
    choices: [
      { text: 'Confirm lim f=2 and lim g=3 both exist first, then apply the power law (2²=4), then the product law (4×3=12)', isCorrect: true },
      { text: 'Combine directly from the final expression without confirming each piece\'s limit exists first, since the answer works out the same either way', isCorrect: false, misconceptionId: `${LIMITLAWS}:MC-2` },
      { text: 'Apply the product law first to f²·g without separately verifying f² has a limit, since squaring never changes whether a limit exists', isCorrect: false, misconceptionId: `${LIMITLAWS}:MC-2` },
    ],
    targetedMisconceptions: [`${LIMITLAWS}:MC-2`],
    source: eb(LIMITLAWS, 'Detection probe — combining several limit laws in sequence requires each piece\'s limit to be verified to exist before combining, never assumed'),
  },
  {
    conceptId: LIMITLAWS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A multi-step limit computation combines the sum, product, and quotient laws in sequence, but one piece is itself a quotient with a zero-denominator limit. Should the sequence proceed by combining all pieces directly?',
    choices: [
      { text: 'No — the quotient piece must first be resolved by a different technique (since its law fails), and only once that piece\'s actual limit is established can it be combined with the others', isCorrect: true },
      { text: 'Yes — since the other pieces\' limits are given as existing, the entire sequence can be combined directly regardless of the quotient piece', isCorrect: false, misconceptionId: `${LIMITLAWS}:MC-2` },
      { text: 'Yes, since verifying existence only matters for the very first piece in a sequence, not intermediate ones', isCorrect: false, misconceptionId: `${LIMITLAWS}:MC-2` },
    ],
    targetedMisconceptions: [`${LIMITLAWS}:MC-2`],
    source: eb(LIMITLAWS, 'Detection probe — a failed law\'s piece is a wrong-tool signal that must be resolved by other means before combining, since a chain of applied laws is only as strong as every individual link independently holding'),
  },

  // --- math.calc.one-sided-limits ----------------------------------------------
  {
    conceptId: ONESIDEDLIM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For f(x) = x+1 when x<2, and x²−1 when x≥2, find lim_{x→2-}f(x).',
    choices: [
      { text: '3 — use the x<2 piece (which governs the left-approaching side), giving 2+1=3', isCorrect: true },
      { text: '3 — use the x≥2 piece (which contains x=2 itself), giving 2²−1=3', isCorrect: false, misconceptionId: `${ONESIDEDLIM}:MC-1` },
      { text: 'Undefined, since x=2 itself belongs to the x≥2 piece, not the x<2 piece being approached', isCorrect: false, misconceptionId: `${ONESIDEDLIM}:MC-1` },
    ],
    targetedMisconceptions: [`${ONESIDEDLIM}:MC-1`],
    source: eb(ONESIDEDLIM, 'Detection probe (Blueprint) — a one-sided limit for a piecewise function is evaluated using the piece governing the approaching direction, never the piece that merely contains the boundary point itself'),
  },
  {
    conceptId: ONESIDEDLIM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For g(x) = 2x when x<1, and x+4 when x≥1, the one-sided limits at x=1 are 2 and 5. Does lim_{x→1}g(x) exist?',
    choices: [
      { text: 'No — both one-sided limits exist individually, but 2≠5, so they disagree and the two-sided limit does not exist, full stop', isCorrect: true },
      { text: 'Yes — since both one-sided limits individually exist, the two-sided limit exists too, perhaps as their average, 3.5', isCorrect: false, misconceptionId: `${ONESIDEDLIM}:MC-2` },
      { text: 'Yes — pick whichever one-sided limit corresponds to the piece containing x=1 itself as the answer', isCorrect: false, misconceptionId: `${ONESIDEDLIM}:MC-2` },
    ],
    targetedMisconceptions: [`${ONESIDEDLIM}:MC-2`],
    source: eb(ONESIDEDLIM, 'Detection probe (Blueprint) — the two-sided limit requires both one-sided limits to exist AND agree; disagreement means the two-sided limit does not exist, a complete and correct conclusion in itself'),
  },
  {
    conceptId: ONESIDEDLIM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A graph shows an open circle at height 5 as x approaches 3 from both sides, and a separately-plotted filled dot at height 7 exactly at x=3. What is lim_{x→3}f(x)?',
    choices: [
      { text: '5 — the limit is the height the curve is heading toward (the open circle), completely independent of where the function is separately defined to sit', isCorrect: true },
      { text: '7 — the limit equals the function\'s actual plotted value at x=3', isCorrect: false, misconceptionId: `${ONESIDEDLIM}:MC-3` },
      { text: 'The limit does not exist, since the approach height and the plotted value disagree', isCorrect: false, misconceptionId: `${ONESIDEDLIM}:MC-3` },
    ],
    targetedMisconceptions: [`${ONESIDEDLIM}:MC-3`],
    source: eb(ONESIDEDLIM, 'Detection probe (Blueprint) — the limit describes where a function is heading, never where it is separately, actually defined to sit; the open circle, not the filled dot, gives the limit'),
  },

  // --- math.calc.continuity -----------------------------------------------------
  {
    conceptId: CONTINUITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'g(x) = (x²−1)/(x−1) simplifies algebraically to x+1 for x≠1, and its simplified graph looks like a perfectly smooth straight line. Is g continuous at x=1?',
    choices: [
      { text: 'No — g(1) is genuinely undefined in the original function (C1 fails), a removable discontinuity invisible in the simplified graph', isCorrect: true },
      { text: 'Yes — the graph looks like a smooth, unbroken line near x=1, so the function must be continuous there', isCorrect: false, misconceptionId: `${CONTINUITY}:MC-1` },
      { text: 'Yes, since the simplified formula x+1 is defined everywhere, including at x=1', isCorrect: false, misconceptionId: `${CONTINUITY}:MC-1` },
    ],
    targetedMisconceptions: [`${CONTINUITY}:MC-1`],
    source: eb(CONTINUITY, 'Detection probe (Blueprint) — visual inspection of a simplified graph can miss a removable discontinuity entirely; the algebraic three-condition test checks the original function\'s defined status directly'),
  },
  {
    conceptId: CONTINUITY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For f(x) = x²+1 when x≠2, and 6 when x=2, the limit as x→2 is 5. Is f continuous at x=2?',
    choices: [
      { text: 'No — C1 holds (f(2)=6, defined) and C2 holds (the limit is 5, exists), but C3 fails since 5≠6; this is a removable discontinuity', isCorrect: true },
      { text: 'Yes — since the limit exists (C2 holds), the function is automatically continuous at that point', isCorrect: false, misconceptionId: `${CONTINUITY}:MC-2` },
      { text: 'Yes, since both f(2) being defined and the limit existing are the only two things that matter for continuity', isCorrect: false, misconceptionId: `${CONTINUITY}:MC-2` },
    ],
    targetedMisconceptions: [`${CONTINUITY}:MC-2`],
    source: eb(CONTINUITY, 'Detection probe (Blueprint) — the limit existing (C2) is necessary but never sufficient for continuity; C3 (the limit must also equal the function\'s value) is a separate, independently-checkable requirement'),
  },
  {
    conceptId: CONTINUITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is f(x) = 2x when x≤1, and x+1 when x>1, continuous at x=1?',
    choices: [
      { text: 'Yes — checking all three conditions: f(1)=2, both one-sided limits equal 2, and the limit equals f(1); the formula changing at x=1 does not by itself imply discontinuity', isCorrect: true },
      { text: 'No — the formula changes at x=1, and any piecewise formula change at a boundary means the function is discontinuous there', isCorrect: false, misconceptionId: `${CONTINUITY}:MC-3` },
      { text: 'No, since piecewise-defined functions can never be continuous at their own boundary points', isCorrect: false, misconceptionId: `${CONTINUITY}:MC-3` },
    ],
    targetedMisconceptions: [`${CONTINUITY}:MC-3`],
    source: eb(CONTINUITY, 'Detection probe (Blueprint) — a piecewise formula change at a boundary does not by itself produce a discontinuity; only the actual three-condition check, applied explicitly, decides the outcome'),
  },
]
