/**
 * Thirteenth math.alg asset batch — polynomial-inequality and simplifying-radicals.
 *
 * Continues serving-asset coverage for math.alg (38/59 -> 40/59).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.alg.polynomial-inequality.md
 * and math.alg.simplifying-radicals.md.
 *
 *   POLYINEQ     polynomial-inequality — endpoint inclusion must match
 *                the inequality's actual strictness, never copied from
 *                a recently-solved problem; the sign never automatically
 *                flips at EVERY root — an even-multiplicity root must
 *                be TESTED, never assumed; a test point must be
 *                genuinely interior to an interval, never chosen on a
 *                root itself.
 *   SIMPLIFYRAD  simplifying-radicals — a radical is not fully
 *                simplified after one correct extraction; the remaining
 *                radicand must be re-checked for a further extractable
 *                factor, never accepted as final on the first pass; an
 *                extracted factor must genuinely be a perfect power
 *                matching the root's index, never merely a divisor of
 *                the radicand. Only 2 misconceptions exist in the EB
 *                entry; MC-1 (premature stopping) is reused across two
 *                probes at different framings per campaign convention.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const POLYINEQ = 'math.alg.polynomial-inequality'
const SIMPLIFYRAD = 'math.alg.simplifying-radicals'

export const MATHEMATICS_ALGEBRA_POLY_INEQ_SIMPLIFY_RADICALS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: POLYINEQ, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A polynomial inequality p(x)>0 (or <, ≥, ≤) is solved in four steps: find all ROOTS of p(x); '
      + 'these roots divide the number line into INTERVALS; construct a SIGN CHART by testing one '
      + 'representative point from EACH interval; identify which intervals satisfy the required '
      + 'sign. Two subtleties determine the final answer\'s exact form.\n\n'
      + 'First, endpoint inclusion: for STRICT inequalities (<, >), the roots are EXCLUDED (open '
      + 'endpoints); for NON-STRICT inequalities (≤, ≥), the roots ARE included (closed endpoints) '
      + '— since p(x)=0 does satisfy p(x)≥0 or p(x)≤0. The sign chart is IDENTICAL for the strict '
      + 'and non-strict versions of the same inequality; only the endpoint notation differs, and it '
      + 'must match the ACTUAL strictness given, never copied from habit.\n\n'
      + 'Second, multiplicity matters at every root: at a root of ODD multiplicity, the polynomial\'s '
      + 'sign genuinely FLIPS; at a root of EVEN multiplicity, the polynomial touches zero but does '
      + 'NOT change sign — it stays the same sign on both sides. The sign chart can never be built by '
      + 'assuming every root causes a flip; each interval must genuinely be TESTED. And a test point '
      + 'must be genuinely interior to its interval, never chosen exactly on a root (which gives an '
      + 'uninformative zero).',
    targetedMisconceptions: [`${POLYINEQ}:MC-1`, `${POLYINEQ}:MC-2`, `${POLYINEQ}:MC-3`],
    source: eb(POLYINEQ, 'Core Understanding — endpoint inclusion must match the inequality\'s actual strictness, sign changes must be tested rather than assumed at every root, and test points must be genuinely interior'),
  },
  {
    conceptId: SIMPLIFYRAD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Simplifying a radical means rewriting it so nothing extractable remains hidden inside — the '
      + 'radicand must contain no factor that is itself a perfect power matching the root\'s index. '
      + 'The mechanism is the product rule already established for radicals: factor the radicand to '
      + 'isolate its LARGEST perfect n-th-power piece and pull that piece\'s root out in front. The '
      + 'key discipline is LARGEST, not merely A: extracting SOME perfect-square factor and stopping '
      + '— √72=√(4×18)=2√18 — is a genuinely correct intermediate step, but NOT the finished answer, '
      + 'because 18 itself still hides a further perfect-square factor (9); only continuing until '
      + 'nothing extractable remains (2√18=2×3√2=6√2) counts as fully simplified.\n\n'
      + 'A second, separate discipline: only a factor that is GENUINELY a perfect power matching the '
      + 'root\'s index may be extracted — never merely any divisor of the radicand. Pulling a factor '
      + 'of 3 out of √12 because 3 divides 12 is invalid, since 3 is not itself a perfect square.\n\n'
      + 'The same "largest factor, verify it\'s a genuine perfect power, then re-check what remains" '
      + 'discipline extends unchanged to higher-index roots — a cube root is simplified by extracting '
      + 'perfect cubes rather than perfect squares, but the underlying question is identical '
      + 'regardless of index.',
    targetedMisconceptions: [`${SIMPLIFYRAD}:MC-1`, `${SIMPLIFYRAD}:MC-2`],
    source: eb(SIMPLIFYRAD, 'Core Understanding — a radical is fully simplified only when the remaining radicand has no further perfect-power factor, and only genuine perfect powers may be extracted, never any divisor'),
  },
]

export const MATHEMATICS_ALGEBRA_POLY_INEQ_SIMPLIFY_RADICALS_PROBES: SeedProbe[] = [
  // --- math.alg.polynomial-inequality ------------------------------------------
  {
    conceptId: POLYINEQ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: '(x−2)(x+1)>0 and (x−2)(x+1)≥0 share the identical sign chart, with solution intervals (−∞,−1) and (2,∞) for the strict version. Should the endpoints x=−1 and x=2 be included in the ≥0 version\'s answer?',
    choices: [
      { text: 'Yes — for the non-strict inequality ≥0, the roots satisfy the inequality exactly (equal to zero), so they must be included: (−∞,−1]∪[2,∞)', isCorrect: true },
      { text: 'No — use the same open-interval notation as the strict version, since the sign chart is identical', isCorrect: false, misconceptionId: `${POLYINEQ}:MC-1` },
      { text: 'It does not matter, since ≥ and > produce the same final answer either way', isCorrect: false, misconceptionId: `${POLYINEQ}:MC-1` },
    ],
    targetedMisconceptions: [`${POLYINEQ}:MC-1`],
    source: eb(POLYINEQ, 'Detection probe (Blueprint) — endpoint inclusion must match the inequality\'s actual strictness, never copied by habit from a recently-solved problem with an identical sign chart'),
  },
  {
    conceptId: POLYINEQ, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Solving (x−3)²(x+2)>0, does the sign flip at x=3 (multiplicity 2)?',
    choices: [
      { text: 'No — testing x=0 gives (9)(2)=18>0 and testing x=4 gives (1)(6)=6>0; the sign stays positive on both sides, since x=3 has EVEN multiplicity and only touches zero without flipping', isCorrect: true },
      { text: 'Yes — the sign always flips at every root, since roots divide the number line into alternating-sign intervals', isCorrect: false, misconceptionId: `${POLYINEQ}:MC-2` },
      { text: 'Yes, since x=3 is a root and all roots are sign-change points by definition', isCorrect: false, misconceptionId: `${POLYINEQ}:MC-2` },
    ],
    targetedMisconceptions: [`${POLYINEQ}:MC-2`],
    source: eb(POLYINEQ, 'Detection probe (Blueprint) — the sign does not automatically flip at every root; an even-multiplicity root must be tested explicitly, never assumed to alternate'),
  },
  {
    conceptId: POLYINEQ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Building a sign chart for roots at x=2 and x=−1, you pick x=2 as your test point for one interval. Is this a valid choice?',
    choices: [
      { text: 'No — x=2 is itself one of the roots, giving p(2)=0, which is neither positive nor negative and tells you nothing about the surrounding interval\'s sign; a genuinely interior point must be chosen instead', isCorrect: true },
      { text: 'Yes — any point at or near the interval\'s boundary works equally well as a test point', isCorrect: false, misconceptionId: `${POLYINEQ}:MC-3` },
      { text: 'Yes, since testing exactly on a root gives the most precise information about that interval', isCorrect: false, misconceptionId: `${POLYINEQ}:MC-3` },
    ],
    targetedMisconceptions: [`${POLYINEQ}:MC-3`],
    source: eb(POLYINEQ, 'Detection probe — a sign-chart test point must be genuinely interior to its interval, never chosen exactly on a root, which gives an uninformative zero result'),
  },

  // --- math.alg.simplifying-radicals -------------------------------------------
  {
    conceptId: SIMPLIFYRAD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Simplifying √72, you extract a factor of 4 to get 2√18. Is this the fully simplified answer?',
    choices: [
      { text: 'No — check 18 for a further perfect-square factor: 18=9×2, so 2√18=2×3√2=6√2 is the fully simplified form', isCorrect: true },
      { text: 'Yes — once a perfect-square factor has been correctly extracted, the simplification is complete', isCorrect: false, misconceptionId: `${SIMPLIFYRAD}:MC-1` },
      { text: 'Yes, since 18 is smaller than 72 and the radical looks simpler now', isCorrect: false, misconceptionId: `${SIMPLIFYRAD}:MC-1` },
    ],
    targetedMisconceptions: [`${SIMPLIFYRAD}:MC-1`],
    source: eb(SIMPLIFYRAD, 'Detection probe (Blueprint P41) — a correct partial extraction is not automatically the complete simplification; the remaining radicand must be re-checked for a further perfect-power factor'),
  },
  {
    conceptId: SIMPLIFYRAD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Simplifying √200, is 2√50 or 5√8 the final simplified answer?',
    choices: [
      { text: 'Neither — both still hide a further perfect-square factor (50=25×2, 8=4×2); the fully simplified answer is 10√2, reached by continuing extraction until nothing remains', isCorrect: true },
      { text: '2√50 — since 4 was successfully extracted from 200, the simplification is done', isCorrect: false, misconceptionId: `${SIMPLIFYRAD}:MC-1` },
      { text: '5√8 — since 25 was successfully extracted from 200, the simplification is done', isCorrect: false, misconceptionId: `${SIMPLIFYRAD}:MC-1` },
    ],
    targetedMisconceptions: [`${SIMPLIFYRAD}:MC-1`],
    source: eb(SIMPLIFYRAD, 'Verification of death — given √200, the learner reaches 10√2 directly or via genuine iterative checking, confirming unprompted that 2 has no further perfect-square factor'),
  },
  {
    conceptId: SIMPLIFYRAD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'To simplify √12, can you extract a factor of 3, since 3 divides 12 evenly?',
    choices: [
      { text: 'No — 3 is not itself a perfect square (no integer squared gives 3); only 4 (a genuine perfect square, 2²) can be extracted from 12, giving √12=√(4×3)=2√3', isCorrect: true },
      { text: 'Yes — any factor that evenly divides the radicand can be pulled out from under the radical', isCorrect: false, misconceptionId: `${SIMPLIFYRAD}:MC-2` },
      { text: 'Yes, since 3 is a factor of 12 and factors can always be extracted', isCorrect: false, misconceptionId: `${SIMPLIFYRAD}:MC-2` },
    ],
    targetedMisconceptions: [`${SIMPLIFYRAD}:MC-2`],
    source: eb(SIMPLIFYRAD, 'Detection probe (Blueprint P41) — only a factor that is genuinely a perfect power matching the root\'s index may be extracted, never merely any divisor of the radicand'),
  },
]
