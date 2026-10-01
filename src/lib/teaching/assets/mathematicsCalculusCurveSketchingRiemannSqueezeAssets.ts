/**
 * Eighth math.calc asset batch — curve sketching, Riemann sums, and the
 * Squeeze Theorem.
 *
 * Continues serving-asset coverage for math.calc (25/76 -> 28/76).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.calc.curve-sketching.md,
 * math.calc.riemann-sums.md, and math.calc.squeeze-theorem.md.
 *
 *   CURVESKETCH  curve-sketching — domain, intercepts, symmetry, and
 *                asymptotes come FIRST, before any derivative is
 *                computed, never treated as optional once derivative
 *                analysis is available; a domain gap or vertical
 *                asymptote is a WALL, never a bridge — the graph must be
 *                drawn as genuinely disconnected pieces, never one
 *                continuous curve through an excluded point.
 *   RIEMANN      riemann-sums — a rectangle's height comes from the
 *                CHOSEN sample point (left, right, or midpoint) alone,
 *                never from requiring the rectangle to visually "fit"
 *                the curve; the exact area is a FIXED quantity that
 *                never changes as n increases — only the accuracy of the
 *                approximating measurement improves; a Riemann sum at any
 *                finite n is NEVER equal to the definite integral, which
 *                is defined specifically as the LIMIT as n→∞.
 *   SQUEEZE      squeeze-theorem — BOTH bounding inequalities are
 *                required; a single one-sided bound proves nothing about
 *                the sandwiched function's limit; when a piece's own
 *                limit genuinely does NOT exist (an oscillation that
 *                never settles), ordinary limit laws cannot be applied
 *                at all, and the squeeze theorem's bounding approach is
 *                the necessary alternative, never a mechanical
 *                application of the familiar quotient/product laws.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const CURVESKETCH = 'math.calc.curve-sketching'
const RIEMANN = 'math.calc.riemann-sums'
const SQUEEZE = 'math.calc.squeeze-theorem'

export const MATHEMATICS_CALCULUS_CURVE_SKETCHING_RIEMANN_SQUEEZE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CURVESKETCH, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Curve sketching synthesizes every prior tool into a fixed seven-step procedure: domain, '
      + 'intercepts, symmetry, asymptotes, monotonicity (sign of f\'), local extrema, and '
      + 'concavity/inflection (sign of f\'\'). THE ORDER MATTERS AS MUCH AS THE STEPS THEMSELVES — '
      + 'domain, intercepts, symmetry, and asymptotic behavior come FIRST, before any derivative is '
      + 'computed. Jumping straight to "find f\' and f\'\'" risks a graph that is LOCALLY correct at '
      + 'every point checked yet GLOBALLY wrong, because domain gaps and asymptotes change the '
      + 'overall SHAPE (how many separate pieces the graph has, where it runs off to infinity) in '
      + 'ways no amount of derivative information alone can reveal.\n\n'
      + 'A DOMAIN GAP OR VERTICAL ASYMPTOTE IS A WALL, NEVER A BRIDGE. Even after correctly '
      + 'identifying a vertical asymptote or excluded point, the graph must never be drawn as one '
      + 'continuous, unbroken curve across the gap. For f(x)=1/x, the true graph has TWO entirely '
      + 'disconnected branches, one in each half-plane, that never touch or cross the vertical '
      + 'asymptote at x=0 — connecting the two sides as if the function passed smoothly through the '
      + 'excluded point is never correct, however visually tempting "connect the dots" makes it.',
    targetedMisconceptions: [`${CURVESKETCH}:MC-1`, `${CURVESKETCH}:MC-2`],
    source: eb(CURVESKETCH, 'Core Understanding — domain and asymptote steps come before any derivative analysis, and a domain gap or vertical asymptote must be drawn as genuinely disconnected pieces, never a single continuous curve'),
  },
  {
    conceptId: RIEMANN, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A Riemann sum approximates the area under y=f(x) on [a,b] with n rectangles: divide into n '
      + 'equal subintervals of width Δx=(b-a)/n, pick ONE sample point in each (left endpoint, right '
      + 'endpoint, or midpoint), and sum the rectangle areas Σf(x_i*)Δx. A RECTANGLE\'S HEIGHT COMES '
      + 'ENTIRELY FROM THE CHOSEN SAMPLE POINT — nothing requires the rectangle to visually "fit" the '
      + 'curve or touch it at a particular edge; it may overshoot or undershoot everywhere else in its '
      + 'subinterval, and that is expected, never a flaw.\n\n'
      + 'THE EXACT AREA IS A FIXED QUANTITY THAT NEVER CHANGES AS n INCREASES — only the accuracy of '
      + 'the approximating MEASUREMENT improves. Watching a computed Riemann sum change from n=4 to '
      + 'n=1000 never means the area itself is changing; the area was always the single fixed number '
      + 'the sequence of estimates is converging toward.\n\n'
      + 'A RIEMANN SUM AT ANY FINITE n IS NEVER EQUAL TO THE DEFINITE INTEGRAL. The definite integral '
      + 'is defined specifically as the LIMIT of Riemann sums as n→∞: ∫f(x)dx=lim_{n→∞}Σf(x_i*)Δx. '
      + 'Writing down a Riemann sum at some large but finite n and calling it "the integral" skips the '
      + 'n→∞ step that is the entire content of the definition.',
    targetedMisconceptions: [`${RIEMANN}:MC-1`, `${RIEMANN}:MC-2`, `${RIEMANN}:MC-3`],
    source: eb(RIEMANN, 'Core Understanding — a rectangle\'s height comes from the chosen sample point alone, the exact area never changes as n increases, and a finite Riemann sum is never equal to the definite integral itself'),
  },
  {
    conceptId: SQUEEZE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The Squeeze Theorem: if g(x)≤f(x)≤h(x) near a (not necessarily at a itself), and '
      + 'lim_{x→a}g(x)=lim_{x→a}h(x)=L, then lim_{x→a}f(x)=L — the sandwiched function is FORCED to '
      + 'match the bounding functions\' common limit, without ever evaluating f directly.\n\n'
      + 'BOTH INEQUALITIES ARE REQUIRED — A SINGLE ONE-SIDED BOUND PROVES NOTHING. g(x)≤f(x) alone '
      + 'only says f is at least as large as something converging to L — it says nothing about f not '
      + 'being much LARGER elsewhere. Only having BOTH inequalities, with BOTH bounding functions '
      + 'converging to the identical value, pins f\'s own limit down completely.\n\n'
      + 'WHEN A PIECE\'S OWN LIMIT GENUINELY DOES NOT EXIST, ORDINARY LIMIT LAWS CANNOT BE APPLIED AT '
      + 'ALL. lim_{x→∞}cos(x)/x cannot use the ordinary quotient limit law, because lim_{x→∞}cos(x) '
      + 'does not exist (it oscillates forever, never settling) — the quotient law\'s precondition '
      + '(both individual limits existing) fails outright. Recognizing this failure is precisely what '
      + 'signals the squeeze theorem is the necessary alternative: since -1≤cos(x)≤1, dividing by x>0 '
      + 'gives -1/x≤cos(x)/x≤1/x, and both bounds →0 as x→∞.',
    targetedMisconceptions: [`${SQUEEZE}:MC-1`, `${SQUEEZE}:MC-2`],
    source: eb(SQUEEZE, 'Core Understanding — both bounding inequalities are required for the squeeze argument to hold, and when a piece\'s limit genuinely does not exist, the ordinary limit laws fail and the squeeze theorem is the necessary alternative'),
  },
]

export const MATHEMATICS_CALCULUS_CURVE_SKETCHING_RIEMANN_SQUEEZE_PROBES: SeedProbe[] = [
  // --- math.calc.curve-sketching -----------------------------------------------------
  {
    conceptId: CURVESKETCH, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Beginning to sketch f(x)=x²/(x²-1), should you start by computing f\'(x) and f\'\'(x) immediately?',
    choices: [
      { text: 'No — first determine the domain (excluding x=±1, where the denominator is zero) and check for asymptotic behavior; skipping these steps produces derivative work that is locally correct but globally misses the vertical asymptotes and overall shape', isCorrect: true },
      { text: 'Yes — computing the derivatives first is always the correct starting point for any curve-sketching task', isCorrect: false, misconceptionId: `${CURVESKETCH}:MC-1` },
      { text: 'Yes, since domain and asymptote information can always be filled in afterward without affecting the sketch\'s accuracy', isCorrect: false, misconceptionId: `${CURVESKETCH}:MC-1` },
    ],
    targetedMisconceptions: [`${CURVESKETCH}:MC-1`],
    source: eb(CURVESKETCH, 'Detection probe — domain, intercepts, symmetry, and asymptotes come first in curve sketching, before any derivative is computed, never treated as optional or filled in afterward'),
  },
  {
    conceptId: CURVESKETCH, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For f(x)=1/x, having identified the vertical asymptote at x=0, should the graph be drawn as one continuous curve passing through that region?',
    choices: [
      { text: 'No — the graph has TWO entirely disconnected branches, one in each half-plane, that never touch or cross the vertical asymptote at x=0', isCorrect: true },
      { text: 'Yes — as long as the derivative-based shape is correct on each side, connecting the two sides into one smooth curve is an acceptable simplification', isCorrect: false, misconceptionId: `${CURVESKETCH}:MC-2` },
      { text: 'Yes, since every function\'s graph is fundamentally one single continuous piece regardless of any asymptotes present', isCorrect: false, misconceptionId: `${CURVESKETCH}:MC-2` },
    ],
    targetedMisconceptions: [`${CURVESKETCH}:MC-2`],
    source: eb(CURVESKETCH, 'Detection probe — a vertical asymptote or domain gap is a wall, never a bridge; the graph must be drawn as genuinely disconnected pieces, never one continuous curve through the excluded point'),
  },
  {
    conceptId: CURVESKETCH, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For f(x)=x²/(x²-1), the domain excludes x=±1, cutting the number line into three intervals. Should increasing/decreasing analysis be performed once globally, or separately on each piece?',
    choices: [
      { text: 'Separately on each of the three disconnected pieces — since the vertical asymptotes at x=±1 disconnect the domain, monotonicity established on one piece says nothing about another piece', isCorrect: true },
      { text: 'Once globally across the entire domain, since the sign of f\' is what ultimately determines increasing/decreasing behavior regardless of any domain gaps', isCorrect: false, misconceptionId: `${CURVESKETCH}:MC-1` },
      { text: 'It does not matter, since the vertical asymptotes have no effect on how monotonicity analysis should be organized', isCorrect: false, misconceptionId: `${CURVESKETCH}:MC-1` },
    ],
    targetedMisconceptions: [`${CURVESKETCH}:MC-1`],
    source: eb(CURVESKETCH, 'Detection probe — derivative-based analysis is applied separately on each disconnected piece the domain and asymptote steps have already carved the graph into, never globally across a domain with genuine gaps'),
  },

  // --- math.calc.riemann-sums -----------------------------------------------------------
  {
    conceptId: RIEMANN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For f(x)=x² on [0,1] with n=2, the left-sum rectangle in the first subinterval has height f(0)=0, visibly not touching the curve except at one point. Is this a valid Riemann sum rectangle?',
    choices: [
      { text: 'Yes — the rectangle\'s height comes entirely from the chosen sample point (here, the left endpoint); nothing requires it to visually fit the curve elsewhere in its subinterval', isCorrect: true },
      { text: 'No — a valid rectangle must visually fit the curve, touching it along its top edge rather than only at one designated point', isCorrect: false, misconceptionId: `${RIEMANN}:MC-1` },
      { text: 'No, since a rectangle that undershoots the curve everywhere else in its subinterval cannot be part of a legitimate approximation', isCorrect: false, misconceptionId: `${RIEMANN}:MC-1` },
    ],
    targetedMisconceptions: [`${RIEMANN}:MC-1`],
    source: eb(RIEMANN, 'Detection probe (Blueprint B01) — a rectangle\'s height is determined by the chosen sample point, not by requiring the rectangle to visually fit the curve everywhere else'),
  },
  {
    conceptId: RIEMANN, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'As n increases from 4 to 1000 for a Riemann sum of f(x)=x² on [0,1], the computed sum changes from 0.46875 to 0.3338. Does the actual area under the curve change as n increases?',
    choices: [
      { text: 'No — the exact area is a fixed quantity that never changes; only the accuracy of the approximating measurement improves as n increases', isCorrect: true },
      { text: 'Yes — since the computed sum keeps changing as n increases, the area itself must be getting smaller', isCorrect: false, misconceptionId: `${RIEMANN}:MC-2` },
      { text: 'Yes, since a more precise measurement necessarily corresponds to a change in the quantity being measured', isCorrect: false, misconceptionId: `${RIEMANN}:MC-2` },
    ],
    targetedMisconceptions: [`${RIEMANN}:MC-2`],
    source: eb(RIEMANN, 'Detection probe (Blueprint B02) — the exact area is a fixed quantity that never changes as n increases; only the accuracy of the Riemann sum measurement improves'),
  },
  {
    conceptId: RIEMANN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'The right Riemann sum for f(x)=x² on [0,1] at n=100 is R₁₀₀≈0.3384. Is this the exact value of ∫₀¹x²dx?',
    choices: [
      { text: 'No — a Riemann sum at any finite n is never equal to the definite integral, which is defined specifically as the limit as n→∞; R₁₀₀ is only an approximation', isCorrect: true },
      { text: 'Yes — a Riemann sum computed at a sufficiently large n like 100 is itself the definite integral', isCorrect: false, misconceptionId: `${RIEMANN}:MC-3` },
      { text: 'Yes, since the integral symbol and a Riemann sum are simply two different notations for identical quantities at any n', isCorrect: false, misconceptionId: `${RIEMANN}:MC-3` },
    ],
    targetedMisconceptions: [`${RIEMANN}:MC-3`],
    source: eb(RIEMANN, 'Detection probe (Blueprint B02) — a finite Riemann sum is never equal to the definite integral, which is defined as the limit of Riemann sums as n→∞, never any one sum along the way'),
  },

  // --- math.calc.squeeze-theorem -----------------------------------------------------------
  {
    conceptId: SQUEEZE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For f(x)=x²sin(1/x) near x=0, you\'ve shown f(x)≤x². Can you conclude lim_{x→0}f(x)=0 from this alone?',
    choices: [
      { text: 'No — a single one-sided bound proves nothing; you also need the matching lower bound −x²≤f(x), both converging to 0, to complete the sandwich', isCorrect: true },
      { text: 'Yes — establishing that f(x) is bounded above by something converging to 0 is sufficient to conclude f\'s own limit is 0', isCorrect: false, misconceptionId: `${SQUEEZE}:MC-1` },
      { text: 'Yes, since an upper bound converging to a value is all the Squeeze Theorem requires to reach its conclusion', isCorrect: false, misconceptionId: `${SQUEEZE}:MC-1` },
    ],
    targetedMisconceptions: [`${SQUEEZE}:MC-1`],
    source: eb(SQUEEZE, 'Detection probe — both bounding inequalities are required for the Squeeze Theorem; a single one-sided bound leaves the function free to be anything larger (or smaller) and proves nothing'),
  },
  {
    conceptId: SQUEEZE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Evaluating lim_{x→∞}cos(x)/x, can the ordinary quotient limit law (dividing the two individual limits) be applied directly?',
    choices: [
      { text: 'No — lim_{x→∞}cos(x) does not exist at all (it oscillates forever), so the quotient law\'s precondition fails outright; the Squeeze Theorem (bounding cos(x) between −1 and 1) is the necessary alternative', isCorrect: true },
      { text: 'Yes — the quotient limit law can be applied directly to any ratio of two expressions regardless of whether their individual limits exist', isCorrect: false, misconceptionId: `${SQUEEZE}:MC-2` },
      { text: 'Yes, since cos(x) can be treated as approaching an average value for the purposes of the quotient law', isCorrect: false, misconceptionId: `${SQUEEZE}:MC-2` },
    ],
    targetedMisconceptions: [`${SQUEEZE}:MC-2`],
    source: eb(SQUEEZE, 'Detection probe — when a piece\'s own limit genuinely does not exist, ordinary limit laws cannot be applied at all, and the Squeeze Theorem\'s bounding approach is the necessary alternative'),
  },
  {
    conceptId: SQUEEZE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why can\'t lim_{x→0}(sin x)/x be evaluated by direct substitution or ordinary algebraic simplification?',
    choices: [
      { text: 'Direct substitution gives the indeterminate 0/0, and there is no common factor to cancel algebraically — the Squeeze Theorem\'s geometric bounding argument is the essential, and only available, technique here', isCorrect: true },
      { text: 'The limit simply does not exist, so no evaluation technique of any kind can be applied to it', isCorrect: false, misconceptionId: `${SQUEEZE}:MC-2` },
      { text: 'It can actually be evaluated directly by substitution once sin(x) is replaced with its decimal approximation near 0', isCorrect: false, misconceptionId: `${SQUEEZE}:MC-2` },
    ],
    targetedMisconceptions: [`${SQUEEZE}:MC-2`],
    source: eb(SQUEEZE, 'Detection probe — the Squeeze Theorem is essential precisely when direct evaluation and ordinary limit laws both fail, as with the foundational lim(sin x)/x=1 result'),
  },
]
