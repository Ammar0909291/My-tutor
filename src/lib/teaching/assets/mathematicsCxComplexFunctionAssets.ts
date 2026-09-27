/**
 * Batch: complex-function (math.cx) — 1/31 -> 2/31.
 *
 * Fresh Phase 0 frontier recompute after complex-numbers-analysis was
 * authored: exactly 1 concept became ready — complex-function (requires
 * complex-numbers-analysis and math.func.function-concept, both already
 * authored). It unlocks cauchy-riemann and analytic-functions, so only
 * this one concept is ready until it's authored.
 * Transcribed from its frozen Educational Brain entry at educational-
 * brain/concepts/mathematics/math.cx.complex-function.md.
 *
 * Grade band: GradeBand.HIGH, matching this concept's "advanced"
 * difficulty tier, consistent with complex-numbers-analysis (this
 * domain's other advanced-tier concept, authored this campaign) and the
 * established precedent from DeMoivre's theorem / Euler's formula.
 *
 * This concept declares no KG cross-link.
 *
 * This EB entry registers exactly 3 formal misconceptions (full
 * contract, no retargeting needed).
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const COMPLEX_FUNCTION = 'math.cx.complex-function'

export const MATHEMATICS_CX_COMPLEX_FUNCTION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COMPLEX_FUNCTION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'BOTH u AND v DEPEND ON BOTH x AND y — NEVER u(x)+iv(y) AS SEPARATE SINGLE-VARIABLE TRACKS: '
      + 'for f(z)=z²: f(1+i)=(1+i)²=2i, so u(1,1)=0, v(1,1)=2; but u(x,y)=x²−y² and v(x,y)=2xy — '
      + 'checking u(2,2)=0 versus u(2,1)=3 (same x=2, different y) shows u genuinely depends on y '
      + 'too. Writing f(x+iy)=u(x)+iv(y), treating the components as functions of one variable '
      + 'each, is WRONG — z=x+iy specifies a 2D point (x,y), and f maps it to another 2D point '
      + '(u,v); both are height functions over the ENTIRE 2D input plane, generally depending on '
      + 'both coordinates jointly.\n\n'
      + 'A COMPLEX LIMIT REQUIRES AGREEMENT ALONG EVERY PATH — NEVER JUST TWO AXES: for '
      + 'g(z)=x²/(x²+y²) approaching z₀=0: along y=0, g=x²/x²=1; along x=0, g=0/y²=0 — two paths '
      + 'give DIFFERENT values, so the limit as z→0 of g(z) does NOT exist. Checking only the real '
      + 'and imaginary axes and concluding a complex limit exists is WRONG — in C≅R² there are '
      + 'INFINITELY many approach paths (straight lines at every angle, parabolas, spirals); a '
      + 'single pair of disagreeing paths is enough to prove non-existence, but agreement on a few '
      + 'paths never proves existence — some untried path might disagree.\n\n'
      + 'CONTINUITY REQUIRES JOINT CONTINUITY OF u,v IN (x,y) — NEVER SEPARATE CONTINUITY IN x AND '
      + 'y ALONE: for u(x,y)=xy/(x²+y²) (with u(0,0)=0): fixing y=0, u(x,0)=0 for all x — '
      + 'continuous in x; fixing x=0, u(0,y)=0 for all y — continuous in y. But along y=x, '
      + 'u(x,x)=x²/(2x²)=1/2≠u(0,0)=0 — separate continuity holds, yet u is NOT jointly continuous '
      + 'at (0,0). Believing f is continuous at z₀ if u is continuous in x (with y fixed) and v is '
      + 'continuous in y (with x fixed) SEPARATELY is WRONG — complex continuity requires the '
      + 'limit of f(z) as z→z₀ to equal f(z₀) along EVERY 2D path, which is a strictly stronger, '
      + 'JOINT condition.',
    targetedMisconceptions: [`${COMPLEX_FUNCTION}:MC-1`, `${COMPLEX_FUNCTION}:MC-2`, `${COMPLEX_FUNCTION}:MC-3`],
    source: eb(COMPLEX_FUNCTION, 'Core Understanding — both u and v depending on both x and y never as separate single-variable tracks, a complex limit requiring agreement along every path never just two axes, and continuity requiring joint continuity of u,v in (x,y) never separate continuity alone'),
  },
]

export const MATHEMATICS_CX_COMPLEX_FUNCTION_PROBES: SeedProbe[] = [
  {
    conceptId: COMPLEX_FUNCTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For f(z)=z², does the real part u depend only on x, or on both x and y?',
    choices: [
      { text: "Both x and y — u(x,y)=x^2-y^2, so checking u(2,2)=0 versus u(2,1)=3 (same x=2, different y) shows u genuinely depends on y too; u and v are height functions over the entire 2D plane, never separate single-variable tracks", isCorrect: true },
      { text: "The real part u depends only on x", isCorrect: false, misconceptionId: `${COMPLEX_FUNCTION}:MC-1` },
      { text: "Since z=x+iy visually separates x and y into distinct terms, it's natural to expect u to track only x and v to track only y", isCorrect: false, misconceptionId: `${COMPLEX_FUNCTION}:MC-1` },
    ],
    targetedMisconceptions: [`${COMPLEX_FUNCTION}:MC-1`],
    source: eb(COMPLEX_FUNCTION, 'Discovery Question 1 as a detection probe (verbatim) — whether u for f(z)=z^2 depends only on x, an answer of "only x" confirming COMPONENT-INDEXED-WRONG'),
  },
  {
    conceptId: COMPLEX_FUNCTION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If a limit agrees along the real axis and the imaginary axis, does the complex limit exist?',
    choices: [
      { text: "Not necessarily — for g(z)=x^2/(x^2+y^2) approaching 0, along y=0 g=1, along x=0 g=0, so those two paths already disagree; even when the two axes DO agree, infinitely many other paths (diagonals, parabolas, spirals) remain untried, so axis agreement never proves existence", isCorrect: true },
      { text: "Yes, if the limit agrees along the real axis and the imaginary axis, the complex limit exists", isCorrect: false, misconceptionId: `${COMPLEX_FUNCTION}:MC-2` },
      { text: "Since a 1D real limit only needs the left and right sides to agree, checking the two perpendicular axes should be treated as the 2D equivalent and sufficient for a complex limit", isCorrect: false, misconceptionId: `${COMPLEX_FUNCTION}:MC-2` },
    ],
    targetedMisconceptions: [`${COMPLEX_FUNCTION}:MC-2`],
    source: eb(COMPLEX_FUNCTION, 'Discovery Question 2 as a detection probe (verbatim) — whether agreement along the two axes establishes a complex limit, an answer of "yes" confirming REAL-AXIS-SUFFICES-FOR-LIMIT'),
  },
  {
    conceptId: COMPLEX_FUNCTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If u is continuous in x with y fixed, and continuous in y with x fixed, is f jointly continuous?',
    choices: [
      { text: "Not necessarily — for u(x,y)=xy/(x^2+y^2) with u(0,0)=0: fixing y=0 gives u(x,0)=0 for all x (continuous in x), fixing x=0 gives u(0,y)=0 for all y (continuous in y), but along y=x, u(x,x)=1/2 does not equal u(0,0)=0, so u is not jointly continuous at the origin despite separate axis continuity", isCorrect: true },
      { text: "Yes, if u is continuous in x with y fixed and continuous in y with x fixed, f is jointly continuous", isCorrect: false, misconceptionId: `${COMPLEX_FUNCTION}:MC-3` },
      { text: "Since checking continuity one variable at a time with the other fixed is the standard first step, that separate check should be treated as sufficient to establish joint continuity", isCorrect: false, misconceptionId: `${COMPLEX_FUNCTION}:MC-3` },
    ],
    targetedMisconceptions: [`${COMPLEX_FUNCTION}:MC-3`],
    source: eb(COMPLEX_FUNCTION, 'Discovery Question 3 as a detection probe (verbatim) — whether separate axis-continuity implies joint continuity, an answer of "yes" confirming CONTINUITY-SEPARATED'),
  },
]
