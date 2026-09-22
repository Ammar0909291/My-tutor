/**
 * Batch: vertical asymptotes, horizontal/oblique asymptotes, and the
 * Rational Root Theorem — all math.func.
 *
 * math.func.vertical-asymptote and math.func.horizontal-asymptote both
 * become ready off already-authored math.func.rational-function (prior
 * batch). math.func.rational-root becomes ready off already-authored
 * math.func.polynomial-function and math.alg.polynomial-roots. Neither
 * unblocks a further concept per the live KG. Authoring all three
 * concepts this batch — the entire remaining math.func frontier — brings
 * math.func to 29/29 in this campaign's own asset-contract layer, the
 * fourth mathematics domain this campaign has taken to 100% (after
 * math.cat 15/15, math.abst 37/37, math.trig 25/25).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.func.vertical-asymptote.md,
 * math.func.horizontal-asymptote.md, and math.func.rational-root.md.
 *
 *   VERTASYM  vertical-asymptote — a numerator zero (denominator nonzero)
 *             is a well-defined output of exactly ZERO, never an
 *             asymptote; a genuine vertical asymptote is NEVER crossed —
 *             the function is undefined there, a hard structural fact,
 *             never a wall the graph is free to pass through; a shared
 *             zero of numerator and denominator must be checked for
 *             cancellation FIRST — a cancelling zero is a hole with a
 *             finite limit, never automatically an asymptote.
 *   HORIZASYM horizontal-asymptote — a horizontal asymptote is a limit
 *             statement about the TAILS only, and the graph CAN cross it
 *             at finite x, never forbidden the way a vertical asymptote
 *             is; a large-x numerical evaluation only APPROXIMATES the
 *             asymptote, never proves the exact value — only the
 *             algebraic degree-comparison rule gives the exact number;
 *             when deg(P)=deg(Q)+1, there is an OBLIQUE (slanted)
 *             asymptote found by long division, never simply "no
 *             asymptote."
 *   RATROOT   rational-root — the Rational Root Theorem is a FILTER
 *             narrowing candidates, never a guarantee that any candidate
 *             is an actual root — every candidate must be TESTED;
 *             exhausting every rational candidate without success means
 *             NO RATIONAL roots, never "no roots at all" — irrational or
 *             complex roots may still exist; the candidate list requires
 *             BOTH the constant term's factors (numerator) AND the
 *             leading coefficient's factors (denominator), never just
 *             the constant term alone once the leading coefficient isn't 1.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const VERTASYM = 'math.func.vertical-asymptote'
const HORIZASYM = 'math.func.horizontal-asymptote'
const RATROOT = 'math.func.rational-root'

export const MATHEMATICS_FUNCTIONS_VERTICAL_HORIZONTAL_ASYMPTOTE_RATIONAL_ROOT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: VERTASYM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A vertical asymptote occurs exactly where Q(x)=0 AFTER cancellation, with P(x)≠0 there. Zeros of '
      + 'the numerator and denominator play OPPOSITE roles, not similar ones: a numerator zero (with '
      + 'denominator nonzero) is a well-defined output of exactly ZERO — an x-intercept, never an '
      + 'asymptote. For f(x)=(x-3)/(x-1), f(3)=0/2=0 exactly, while f near x=1 explodes: f(1.01)≈-199 — '
      + 'genuinely opposite behaviors, both starting from "a factor equals zero," but a well-defined '
      + 'zero-output and an undefined blow-up are never the same feature.\n\n'
      + 'A genuine vertical asymptote is NEVER crossed, because the function is genuinely undefined '
      + 'there — a hard, structural fact, never a wall the graph is free to pass through. There is no '
      + 'point directly above or below x=a when x=a is a genuine vertical asymptote; the graph consists '
      + 'of two separate branches that approach the line but structurally cannot touch it.\n\n'
      + 'A shared zero of numerator and denominator must be checked for CANCELLATION first, before '
      + 'classifying it: for f(x)=(x²-4)/(x-2)=(x-2)(x+2)/(x-2)=x+2 for x≠2, the shared factor cancels, '
      + 'and as x→2 this approaches the FINITE value 4 — a hole, never automatically an asymptote just '
      + 'because both the numerator and denominator vanish there.',
    targetedMisconceptions: [`${VERTASYM}:MC-1`, `${VERTASYM}:MC-2`, `${VERTASYM}:MC-3`],
    source: eb(VERTASYM, 'Core Understanding — a numerator zero and a denominator zero play opposite roles, a genuine vertical asymptote is never crossed since the function is structurally undefined there, and a shared zero must be checked for cancellation before being classified as an asymptote'),
  },
  {
    conceptId: HORIZASYM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A horizontal asymptote is a limit statement about the TAILS only, never a hard boundary the '
      + 'graph cannot touch — this is the single most important distinction, and exactly where a '
      + 'vertical asymptote\'s "never crossed" rule gets wrongly transferred. For f(x)=(x²-1)/(x²+1), the '
      + 'horizontal asymptote is y=1 (ratio of leading coefficients), yet f genuinely crosses y=0 at '
      + 'x=±1 — finding a crossing point is simply solving f(x)=L directly, never assumed impossible by '
      + 'default.\n\n'
      + 'A large-x numerical evaluation only APPROXIMATES the asymptote, never proves the exact value: '
      + 'evaluating f(1000)≈2.007 is genuine evidence the asymptote is NEAR 2, but the exact value comes '
      + 'only from the algebraic degree-comparison rule (dividing by the highest power) — numerical '
      + 'evaluation is a check afterward, never a substitute for derivation.\n\n'
      + 'When deg(P)=deg(Q)+1, there is an OBLIQUE (slanted) asymptote found by polynomial long '
      + 'division, never simply "no asymptote": for f(x)=(x²+2x-1)/(x+1)=(x+1)+(-2)/(x+1), as x→±∞ the '
      + 'remainder vanishes, so f(x)≈x+1 — a slanted line, a genuinely different phenomenon from a '
      + 'horizontal asymptote, requiring long division rather than the three-case degree rule.',
    targetedMisconceptions: [`${HORIZASYM}:MC-1`, `${HORIZASYM}:MC-2`, `${HORIZASYM}:MC-3`],
    source: eb(HORIZASYM, 'Core Understanding — a horizontal asymptote is a tail-only limit statement that the graph can cross at finite x, a large-x evaluation only approximates the exact algebraic value, and a degree difference of exactly one produces an oblique asymptote via long division'),
  },
  {
    conceptId: RATROOT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The Rational Root Theorem is a FILTER, never a finder: for integer-coefficient f(x)=aₙxⁿ+...+a₀, '
      + 'any rational root p/q in lowest terms satisfies p|a₀ and q|aₙ. This narrows the search from '
      + '"infinitely many rational numbers" to a short finite list — but it NEVER guarantees any '
      + 'candidate on that list is actually a root, and every candidate must be TESTED. For '
      + 'f(x)=x²-5x+6, the 8 candidates ±1,±2,±3,±6 include only 2 genuine roots (2 and 3); the other 6 '
      + 'all fail, since a degree-2 polynomial has at most 2 roots.\n\n'
      + 'Exhausting every rational candidate without success means NO RATIONAL roots, never "no roots '
      + 'at all": for f(x)=x²-2, all RRT candidates ±1,±2 fail, but x=±√2 ARE genuine real roots — '
      + 'simply irrational, so they were never on the candidate list in the first place, since √2 '
      + 'cannot be written as a ratio of integers. RRT structurally cannot detect irrational or complex '
      + 'roots, because those numbers never appear on the candidate list.\n\n'
      + 'The candidate list requires BOTH the constant term\'s factors (numerator) AND the leading '
      + 'coefficient\'s factors (denominator), never just the constant term alone once the leading '
      + 'coefficient isn\'t 1: for f(x)=2x²-5x+2, the complete list is ±1,±2,±1/2, and omitting the '
      + 'denominator step from aₙ=2\'s factors would silently drop the genuine root x=1/2.',
    targetedMisconceptions: [`${RATROOT}:MC-1`, `${RATROOT}:MC-2`, `${RATROOT}:MC-3`],
    source: eb(RATROOT, 'Core Understanding — the Rational Root Theorem is a filter that narrows candidates but never guarantees any are roots, exhausting rational candidates means no rational roots rather than no roots at all, and the candidate list requires factors of both the constant term and the leading coefficient'),
  },
]

export const MATHEMATICS_FUNCTIONS_VERTICAL_HORIZONTAL_ASYMPTOTE_RATIONAL_ROOT_PROBES: SeedProbe[] = [
  // --- math.func.vertical-asymptote ------------------------------------------
  {
    conceptId: VERTASYM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'f(x)=(x-3)/(x-1). Where is the vertical asymptote?',
    choices: [
      { text: 'x=1 — the actual denominator zero, where f near x=1 genuinely explodes (f(1.01)≈-199); x=3 is a NUMERATOR zero instead, giving the well-defined output f(3)=0, an x-intercept, never an asymptote', isCorrect: true },
      { text: 'x=3 — since that is the value where the numerator equals zero', isCorrect: false, misconceptionId: `${VERTASYM}:MC-1` },
      { text: 'Both x=1 and x=3 are vertical asymptotes, since both make one of the factors equal zero', isCorrect: false, misconceptionId: `${VERTASYM}:MC-1` },
    ],
    targetedMisconceptions: [`${VERTASYM}:MC-1`],
    source: eb(VERTASYM, 'Detection probe for MC-1 — f(x)=(x-3)/(x-1), where is the vertical asymptote'),
  },
  {
    conceptId: VERTASYM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You\'ve learned a horizontal asymptote can sometimes be crossed. Does that mean a vertical asymptote can be crossed too?',
    choices: [
      { text: 'No — a vertical asymptote means f is genuinely UNDEFINED at that x-value, so there is literally no y-value to plot there; the graph consists of two separate branches that never touch across the dashed vertical line, a structurally different statement from a horizontal asymptote', isCorrect: true },
      { text: 'Yes — since horizontal asymptotes can be crossed, the same freedom applies to vertical asymptotes by the same logic', isCorrect: false, misconceptionId: `${VERTASYM}:MC-2` },
      { text: 'Yes, and specifically the graph passes directly through the vertical asymptote line as a single continuous curve', isCorrect: false, misconceptionId: `${VERTASYM}:MC-2` },
    ],
    targetedMisconceptions: [`${VERTASYM}:MC-2`],
    source: eb(VERTASYM, 'Discovery Question 2 — you\'ve learned a horizontal asymptote can sometimes be crossed; does that mean a vertical asymptote can be crossed too; what\'s different about what each one describes'),
  },
  {
    conceptId: VERTASYM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'f(x)=(x²-4)/(x-2). Is x=2 a vertical asymptote?',
    choices: [
      { text: 'No — factoring and cancelling gives (x-2)(x+2)/(x-2)=x+2 for x≠2, and as x→2 this simplified form approaches the FINITE value 4; this is a HOLE, since the shared factor cancels, never an asymptote just because both numerator and denominator vanish there', isCorrect: true },
      { text: 'Yes — since both the numerator and denominator equal zero at x=2, this is automatically a vertical asymptote regardless of any cancellation', isCorrect: false, misconceptionId: `${VERTASYM}:MC-3` },
      { text: 'Yes, and the function approaches infinity as x approaches 2 from both sides', isCorrect: false, misconceptionId: `${VERTASYM}:MC-3` },
    ],
    targetedMisconceptions: [`${VERTASYM}:MC-3`],
    source: eb(VERTASYM, 'Detection probe for MC-3 — f(x)=(x^2-4)/(x-2), is x=2 a vertical asymptote'),
  },

  // --- math.func.horizontal-asymptote ------------------------------------------
  {
    conceptId: HORIZASYM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'f(x)=(x²-1)/(x²+1). Can f ever equal 0?',
    choices: [
      { text: 'Yes — solving x²-1=0 gives x=±1, and indeed f(1)=f(-1)=0, genuine crossing points at finite x; the horizontal asymptote here is actually y=1, a separate fact, and a horizontal asymptote never forbids the graph from crossing elsewhere', isCorrect: true },
      { text: 'No — since a horizontal asymptote can never be crossed, the graph cannot reach 0 at any finite x', isCorrect: false, misconceptionId: `${HORIZASYM}:MC-1` },
      { text: 'No, because 0 lies exactly on the horizontal asymptote, which the function structurally cannot reach', isCorrect: false, misconceptionId: `${HORIZASYM}:MC-1` },
    ],
    targetedMisconceptions: [`${HORIZASYM}:MC-1`],
    source: eb(HORIZASYM, 'Detection probe for MC-1 — f(x)=(x^2-1)/(x^2+1), can f ever equal 0'),
  },
  {
    conceptId: HORIZASYM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For f(x)=(2x+1)/(x-3), you compute f(1000)≈2.007. What is the exact horizontal asymptote?',
    choices: [
      { text: 'y=2 exactly — dividing by x gives (2+1/x)/(1-3/x)→2/1=2 as x→∞; the numerical value 2.007 is a genuine approximation at x=1000, but only algebra gives the EXACT value, never the approximation itself', isCorrect: true },
      { text: 'y=2.007, matching the computed value at x=1000 exactly', isCorrect: false, misconceptionId: `${HORIZASYM}:MC-2` },
      { text: 'The exact asymptote cannot be determined without evaluating at even larger values of x, like x=10⁶ or higher', isCorrect: false, misconceptionId: `${HORIZASYM}:MC-2` },
    ],
    targetedMisconceptions: [`${HORIZASYM}:MC-2`],
    source: eb(HORIZASYM, 'Detection probe for MC-2 — for f(x)=(2x+1)/(x-3), you compute f(1000) approximately 2.007, what is the exact horizontal asymptote'),
  },
  {
    conceptId: HORIZASYM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'f(x)=(x²+2x-1)/(x+1). Does f have a horizontal asymptote?',
    choices: [
      { text: 'No horizontal asymptote (since deg(P)>deg(Q)), but there IS an oblique one: long division gives f(x)=(x+1)+(-2)/(x+1), and as x→±∞ the remainder vanishes, so f(x)≈x+1 — a SLANTED line, found by long division, never simply "no asymptote"', isCorrect: true },
      { text: 'No — since the numerator\'s degree exceeds the denominator\'s degree, there is no asymptote of any kind for this function', isCorrect: false, misconceptionId: `${HORIZASYM}:MC-3` },
      { text: 'Yes — the horizontal asymptote is y=1, matching the y-intercept of the simplified quotient x+1', isCorrect: false, misconceptionId: `${HORIZASYM}:MC-3` },
    ],
    targetedMisconceptions: [`${HORIZASYM}:MC-3`],
    source: eb(HORIZASYM, 'Detection probe for MC-3 — f(x)=(x^2+2x-1)/(x+1), does f have a horizontal asymptote'),
  },

  // --- math.func.rational-root ------------------------------------------
  {
    conceptId: RATROOT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'f(x)=x²-5x+6. List the RRT candidates and state the roots.',
    choices: [
      { text: 'Candidates are ±1,±2,±3,±6 (8 total), but testing each shows only x=2 and x=3 give f=0; a degree-2 polynomial has at most 2 roots, so the candidate list was never a claim that all 8 are roots, only that any rational root MUST be among them', isCorrect: true },
      { text: 'All 8 candidates (±1,±2,±3,±6) are roots of the polynomial, since they all appear on the RRT candidate list', isCorrect: false, misconceptionId: `${RATROOT}:MC-1` },
      { text: 'The candidate list alone determines the roots without any need for testing, since RRT guarantees every candidate satisfies the equation', isCorrect: false, misconceptionId: `${RATROOT}:MC-1` },
    ],
    targetedMisconceptions: [`${RATROOT}:MC-1`],
    source: eb(RATROOT, 'Detection probe for MC-1 — f(x)=x^2-5x+6, list the RRT candidates and state the roots'),
  },
  {
    conceptId: RATROOT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'f(x)=x²-2. All RRT candidates (±1,±2) fail. Does f have any roots?',
    choices: [
      { text: 'Yes — solving x²-2=0 directly gives x=±√2, genuine real roots; they were never on the RRT candidate list because they are IRRATIONAL, so RRT\'s failure here correctly reflects "no RATIONAL roots," never "no roots at all"', isCorrect: true },
      { text: 'No — since every RRT candidate failed, the polynomial genuinely has no roots of any kind', isCorrect: false, misconceptionId: `${RATROOT}:MC-2` },
      { text: 'No, since RRT is designed to find every possible root a polynomial could have, rational or otherwise', isCorrect: false, misconceptionId: `${RATROOT}:MC-2` },
    ],
    targetedMisconceptions: [`${RATROOT}:MC-2`],
    source: eb(RATROOT, 'Detection probe for MC-2 — f(x)=x^2-2, all RRT candidates fail, does f have any roots'),
  },
  {
    conceptId: RATROOT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'f(x)=2x²-5x+2. List all RRT candidates.',
    choices: [
      { text: '±1,±2,±1/2 — the complete list requires factors of BOTH the constant term 2 (±1,±2, the numerators) AND the leading coefficient 2 (±1,±2, the denominators), forming all fractions; omitting the leading-coefficient step would silently miss the genuine root x=1/2', isCorrect: true },
      { text: '±1,±2 only — the factors of the constant term 2 are the complete candidate list regardless of the leading coefficient', isCorrect: false, misconceptionId: `${RATROOT}:MC-3` },
      { text: 'Every integer from -2 to 2, since RRT candidates are always a contiguous range determined by the constant term alone', isCorrect: false, misconceptionId: `${RATROOT}:MC-3` },
    ],
    targetedMisconceptions: [`${RATROOT}:MC-3`],
    source: eb(RATROOT, 'Detection probe for MC-3 — f(x)=2x^2-5x+2, list all RRT candidates'),
  },
]
