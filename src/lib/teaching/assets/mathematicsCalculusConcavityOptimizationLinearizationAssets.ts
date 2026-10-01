/**
 * Sixth math.calc asset batch — concavity, optimization, and
 * linearization.
 *
 * Continues serving-asset coverage for math.calc (19/76 -> 22/76).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.calc.concavity.md,
 * math.calc.optimization.md, and math.calc.linearization.md.
 *
 *   CONCAVITY    concavity — f''(c)=0 is only a CANDIDATE for an
 *                inflection point, never sufficient by itself; an actual
 *                sign change of f'' on both sides must be verified,
 *                since the identical "f''=0" signal can produce a genuine
 *                inflection point in one function and none at all in
 *                another (x⁴ at 0); concavity and monotonicity are two
 *                INDEPENDENT axes (f' governs direction, f'' governs
 *                curvature) — "concave up" never implies "increasing."
 *   OPTIMIZATION optimization — endpoints are ALWAYS automatic candidates
 *                for a global extremum on a closed interval, never
 *                dropped just because no interior critical points exist;
 *                the Extreme Value Theorem's guarantee requires the
 *                interval to be BOTH closed AND bounded — drop either
 *                condition and global extrema may not exist at all,
 *                however cleanly the derivative-based search runs; a
 *                single local extremum is never automatically the global
 *                one without comparing it against every other candidate.
 *   LINEARIZATION linearization — L(x)=f(a)+f'(a)(x-a) is the ordinary
 *                point-slope line formula reusing an already-computed
 *                derivative, never a new procedure requiring its own
 *                derivation; the approximation's accuracy genuinely
 *                DEGRADES as x moves farther from a, never uniform
 *                regardless of distance; the differential dy=f'(x)dx is
 *                the IDENTICAL linearization arithmetic reframed as
 *                predicting a change, never a separate concept requiring
 *                its own justification.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const CONCAVITY = 'math.calc.concavity'
const OPTIMIZATION = 'math.calc.optimization'
const LINEARIZATION = 'math.calc.linearization'

export const MATHEMATICS_CALCULUS_CONCAVITY_OPTIMIZATION_LINEARIZATION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CONCAVITY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Concavity is what the SECOND derivative\'s sign says about how a curve bends: f\'\'(x)>0 means '
      + 'concave up (a cup, tangent lines lie BELOW the curve); f\'\'(x)<0 means concave down (a cap, '
      + 'tangent lines lie ABOVE it). An inflection point is where concavity genuinely CHANGES, and '
      + 'candidates come from where f\'\'(x)=0 OR f\'\' is undefined — but f\'\'(c)=0 IS NEVER ENOUGH '
      + 'BY ITSELF. f(x)=x⁴ has f\'\'(0)=0, yet f\'\'(x)=12x²≥0 for ALL x — no sign change, hence no '
      + 'inflection point at all, despite the identical "f\'\'=0" signal that DID produce a genuine '
      + 'inflection point for f(x)=x³-3x² at x=1. An actual sign change on both sides must always be '
      + 'verified before confirming an inflection point.\n\n'
      + 'CONCAVITY AND MONOTONICITY ARE TWO INDEPENDENT QUESTIONS. Whether f is increasing or '
      + 'decreasing depends on the sign of f\'; curvature depends on the sign of f\'\' — these are '
      + 'SEPARATE, and all four combinations (increasing/concave-up, increasing/concave-down, '
      + 'decreasing/concave-up, decreasing/concave-down) genuinely occur. "Concave up" never implies '
      + '"increasing," despite the visual temptation of a rising-looking cup shape.',
    targetedMisconceptions: [`${CONCAVITY}:MC-1`, `${CONCAVITY}:MC-2`, `${CONCAVITY}:MC-3`],
    source: eb(CONCAVITY, 'Core Understanding — f\'\'(c)=0 is only a candidate for an inflection point requiring a verified sign change, and concavity is governed independently of monotonicity by a separate derivative'),
  },
  {
    conceptId: OPTIMIZATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Optimization asks which single point, over an entire interval, gives the actual overall '
      + 'maximum or minimum — judged against every other point simultaneously, never just nearby '
      + 'ones. The Closed Interval Method: list every critical point inside (a,b), ADD BOTH '
      + 'ENDPOINTS TO THAT LIST UNCONDITIONALLY, evaluate f at every point on the combined list, and '
      + 'read off the largest and smallest values. ENDPOINTS ARE ALWAYS AUTOMATIC CANDIDATES, never '
      + 'dropped just because no interior critical points exist — f(x)=x² on [1,5] has ZERO interior '
      + 'critical points, yet BOTH global extrema occur at the endpoints (minimum 1 at x=1, maximum '
      + '25 at x=5).\n\n'
      + 'THE EXTREME VALUE THEOREM\'S GUARANTEE REQUIRES THE INTERVAL TO BE BOTH CLOSED AND BOUNDED. '
      + 'Drop either condition — an open interval, a half-line, or all of ℝ — and the guarantee '
      + 'evaporates: a function can have local extrema everywhere and still have NO global maximum or '
      + 'minimum at all, because the domain lets it run off to +∞ or −∞. The procedure\'s mechanics '
      + '(differentiate, set to zero, solve) work identically regardless of domain, so nothing about '
      + 'executing the algorithm itself signals that its underlying guarantee has quietly stopped '
      + 'applying — the closed-and-bounded check must be made explicitly, first.\n\n'
      + 'A SINGLE LOCAL EXTREMUM IS NEVER AUTOMATICALLY THE GLOBAL ONE. The comparison step against '
      + 'every other candidate (other critical points, both endpoints) is a genuinely separate '
      + 'operation from classifying one point as a local max or min.',
    targetedMisconceptions: [`${OPTIMIZATION}:MC-1`, `${OPTIMIZATION}:MC-2`, `${OPTIMIZATION}:MC-3`],
    source: eb(OPTIMIZATION, 'Core Understanding — endpoints are always automatic candidates for a global extremum, the Extreme Value Theorem requires both closed and bounded, and a single local extremum is never automatically global without comparison'),
  },
  {
    conceptId: LINEARIZATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Linearization REUSES the derivative\'s own slope value — it introduces no new computational '
      + 'skill. L(x)=f(a)+f\'(a)(x-a) is exactly the ordinary point-slope line formula y=y₁+m(x-x₁), '
      + 'with the already-computed derivative f\'(a) plugged in as the slope — never a new procedure '
      + 'requiring its own separate derivation.\n\n'
      + 'THE APPROXIMATION\'S ACCURACY GENUINELY DEGRADES AS x MOVES FARTHER FROM a — this is a real, '
      + 'measurable, distance-dependent phenomenon, never a uniform guarantee. L(x) matches f exactly '
      + 'ONLY at a; for x≠a, the error |f(x)-L(x)| genuinely grows as x moves away, since a curved '
      + 'function bends away from its own tangent line. A learner using L(x) far from a should expect '
      + 'markedly worse accuracy than near a, never the same confidence.\n\n'
      + 'THE DIFFERENTIAL dy=f\'(x)dx IS THE IDENTICAL LINEARIZATION ARITHMETIC, reframed as '
      + 'predicting a CHANGE rather than a VALUE — never a separate concept requiring its own '
      + 'justification. Writing Δx=x-a and Δy=f(x)-f(a) (the actual change), dy=f\'(x)dx (with '
      + 'dx=Δx) gives dy≈Δy for small Δx, literally the same number as L(x)-f(a).',
    targetedMisconceptions: [`${LINEARIZATION}:MC-1`, `${LINEARIZATION}:MC-2`, `${LINEARIZATION}:MC-3`],
    source: eb(LINEARIZATION, 'Core Understanding — linearization reuses the point-slope formula with an already-computed slope, its accuracy genuinely degrades with distance, and the differential is the identical arithmetic reframed as an increment'),
  },
]

export const MATHEMATICS_CALCULUS_CONCAVITY_OPTIMIZATION_LINEARIZATION_PROBES: SeedProbe[] = [
  // --- math.calc.concavity ---------------------------------------------------------
  {
    conceptId: CONCAVITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For g(x)=x⁴, g\'\'(0)=0. Is x=0 automatically an inflection point?',
    choices: [
      { text: 'No — g\'\'(x)=12x²≥0 for all x, so there is no actual sign change at x=0; g\'\'(c)=0 alone is never sufficient to confirm an inflection point', isCorrect: true },
      { text: 'Yes — g\'\'(0)=0 is itself the defining condition for an inflection point', isCorrect: false, misconceptionId: `${CONCAVITY}:MC-1` },
      { text: 'Yes, since any point where the second derivative vanishes must be an inflection point by definition', isCorrect: false, misconceptionId: `${CONCAVITY}:MC-1` },
    ],
    targetedMisconceptions: [`${CONCAVITY}:MC-1`],
    source: eb(CONCAVITY, 'Detection probe (Blueprint A02) — f\'\'(c)=0 is only a candidate for an inflection point; an actual sign change of f\'\' on both sides must be verified before confirming one'),
  },
  {
    conceptId: CONCAVITY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For k(x)=x² on x<0, k\'(x)=2x<0 (decreasing) and k\'\'(x)=2>0 (concave up). Does concave up always mean the function is increasing?',
    choices: [
      { text: 'No — k is decreasing yet concave up here, proving direction (governed by f\') and curvature (governed by f\'\') are independent; all four combinations genuinely occur', isCorrect: true },
      { text: 'Yes — a concave-up (cup-shaped) curve is, by definition, always rising', isCorrect: false, misconceptionId: `${CONCAVITY}:MC-2` },
      { text: 'Yes, since concave up and increasing describe the same underlying property from two different angles', isCorrect: false, misconceptionId: `${CONCAVITY}:MC-2` },
    ],
    targetedMisconceptions: [`${CONCAVITY}:MC-2`],
    source: eb(CONCAVITY, 'Detection probe (Blueprint A03) — concavity and monotonicity are two independent axes; "concave up" never implies "increasing," despite the visual temptation of a rising-looking cup shape'),
  },
  {
    conceptId: CONCAVITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For f(x)=x^(1/3), f\'\'(x) is undefined at x=0 (never zero anywhere). Solving "f\'\'(x)=0" finds no solutions. Are there any inflection points?',
    choices: [
      { text: 'Possibly — the undefined-f\'\' point x=0 must also be checked for a sign change; candidates for inflection points come from BOTH f\'\'=0 AND f\'\' undefined, parallel to how critical points are found', isCorrect: true },
      { text: 'No — since f\'\'(x)=0 has no solutions, there are no inflection points anywhere', isCorrect: false, misconceptionId: `${CONCAVITY}:MC-3` },
      { text: 'No, since inflection-point candidates can only come from solving f\'\'(x)=0', isCorrect: false, misconceptionId: `${CONCAVITY}:MC-3` },
    ],
    targetedMisconceptions: [`${CONCAVITY}:MC-3`],
    source: eb(CONCAVITY, 'Detection probe (Blueprint B03) — finding inflection-point candidates requires two separate searches, f\'\'=0 and f\'\' undefined, parallel exactly to how critical points require both f\'=0 and f\' undefined'),
  },

  // --- math.calc.optimization ---------------------------------------------------------
  {
    conceptId: OPTIMIZATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'f(x)=x² on [1,5] has f\'(x)=2x=0 only at x=0, which lies OUTSIDE the interval. Does this mean f has no global extrema on [1,5]?',
    choices: [
      { text: 'No — the endpoints x=1 and x=5 are always automatic candidates; evaluating gives the global minimum 1 at x=1 and global maximum 25 at x=5, with no interior critical points needed at all', isCorrect: true },
      { text: 'Yes — since there are no critical points inside the interval, no global maximum or minimum can exist there', isCorrect: false, misconceptionId: `${OPTIMIZATION}:MC-1` },
      { text: 'Yes, since the entire search for global extrema depends only on where the derivative equals zero', isCorrect: false, misconceptionId: `${OPTIMIZATION}:MC-1` },
    ],
    targetedMisconceptions: [`${OPTIMIZATION}:MC-1`],
    source: eb(OPTIMIZATION, 'Detection probe — endpoints are always automatic candidates for the Closed Interval Method, never dropped just because no interior critical points exist'),
  },
  {
    conceptId: OPTIMIZATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'f(x)=x³-3x has critical points at x=±1. Considered over ALL of ℝ (not a closed interval), does f have a global maximum and minimum?',
    choices: [
      { text: 'No — as x→+∞, f→+∞, and as x→−∞, f→−∞, so no global extrema exist at all; the domain is unbounded, so the Extreme Value Theorem\'s guarantee never applied here', isCorrect: true },
      { text: 'Yes — evaluating f at the critical points x=±1 gives the global maximum and minimum, the same as it would on any interval', isCorrect: false, misconceptionId: `${OPTIMIZATION}:MC-2` },
      { text: 'Yes, since the Closed Interval Method\'s procedure always produces valid global extrema once critical points are found', isCorrect: false, misconceptionId: `${OPTIMIZATION}:MC-2` },
    ],
    targetedMisconceptions: [`${OPTIMIZATION}:MC-2`],
    source: eb(OPTIMIZATION, 'Detection probe — the Extreme Value Theorem\'s guarantee requires the interval to be both closed and bounded; on an unbounded domain, running the same procedure can produce a confident answer to a question with no answer'),
  },
  {
    conceptId: OPTIMIZATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'The First Derivative Test confirms x=1 is a local maximum of f on [-2,3]. Is x=1 automatically the GLOBAL maximum on this interval?',
    choices: [
      { text: 'Not necessarily — it must be compared against every other candidate (other critical points and both endpoints) before being declared the global maximum', isCorrect: true },
      { text: 'Yes — once a point is confirmed as a local maximum, it is automatically the global maximum over the entire interval', isCorrect: false, misconceptionId: `${OPTIMIZATION}:MC-3` },
      { text: 'Yes, since local and global maxima are the same concept once a closed interval is specified', isCorrect: false, misconceptionId: `${OPTIMIZATION}:MC-3` },
    ],
    targetedMisconceptions: [`${OPTIMIZATION}:MC-3`],
    source: eb(OPTIMIZATION, 'Detection probe — a single local extremum is never automatically the global one; comparing it against every other candidate is a genuinely separate operation from local classification'),
  },

  // --- math.calc.linearization ---------------------------------------------------------
  {
    conceptId: LINEARIZATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Having already computed f\'(a), does constructing the linearization L(x)=f(a)+f\'(a)(x-a) require any new derivation beyond what you already know?',
    choices: [
      { text: 'No — L(x) is exactly the ordinary point-slope line formula y=y₁+m(x-x₁), with the already-computed f\'(a) plugged in as the slope', isCorrect: true },
      { text: 'Yes — linearization is a fundamentally new procedure, separate from computing the derivative', isCorrect: false, misconceptionId: `${LINEARIZATION}:MC-1` },
      { text: 'Yes, since building a full function from a single derivative value requires new mathematical machinery', isCorrect: false, misconceptionId: `${LINEARIZATION}:MC-1` },
    ],
    targetedMisconceptions: [`${LINEARIZATION}:MC-1`],
    source: eb(LINEARIZATION, 'Detection probe (Blueprint A01) — linearization reuses the point-slope line formula the learner already knows, with an already-computed derivative as the slope, never requiring separate derivation'),
  },
  {
    conceptId: LINEARIZATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For f(x)=√x at a=4, does the linearization L(x) provide roughly the same quality of approximation to f(x) at x=4.1 as it does at x=9?',
    choices: [
      { text: 'No — the approximation is far more accurate at x=4.1 (close to a) than at x=9 (far from a); the error genuinely grows as x moves away from a', isCorrect: true },
      { text: 'Yes — the linearization provides a consistently reliable approximation regardless of how far x is from a', isCorrect: false, misconceptionId: `${LINEARIZATION}:MC-2` },
      { text: 'Yes, since the tangent line is built from calculus and therefore holds equally well everywhere', isCorrect: false, misconceptionId: `${LINEARIZATION}:MC-2` },
    ],
    targetedMisconceptions: [`${LINEARIZATION}:MC-2`],
    source: eb(LINEARIZATION, 'Detection probe (Blueprint A02) — the linearization\'s accuracy genuinely degrades as x moves farther from a, a real distance-dependent phenomenon, never a uniform guarantee'),
  },
  {
    conceptId: LINEARIZATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the differential dy=f\'(x)dx a genuinely different mathematical idea from the linearization L(x), requiring its own separate justification?',
    choices: [
      { text: 'No — dy and L(x)-f(a) are literally the same arithmetic, just reframed: dy predicts a CHANGE in the function\'s value, while L(x) predicts the VALUE itself', isCorrect: true },
      { text: 'Yes — the differential is a distinct concept from linearization, built on its own separate foundation', isCorrect: false, misconceptionId: `${LINEARIZATION}:MC-3` },
      { text: 'Yes, since dy uses an infinitesimal quantity dx that has no connection to the linearization\'s ordinary algebra', isCorrect: false, misconceptionId: `${LINEARIZATION}:MC-3` },
    ],
    targetedMisconceptions: [`${LINEARIZATION}:MC-3`],
    source: eb(LINEARIZATION, 'Detection probe (Blueprint A03) — the differential is the identical linearization arithmetic reframed as an increment prediction, never a separate concept requiring its own justification'),
  },
]
