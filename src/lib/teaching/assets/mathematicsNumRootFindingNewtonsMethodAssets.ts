/**
 * Batch: root-finding, newtons-method (math.num) — UNBLOCKS THE DOMAIN.
 *
 * math.num was blocked at 11/16 since the domain-opening batch: its 5
 * remaining concepts all transitively required math.real.ivt or
 * math.de.euler-method, neither reachable at the time. The math.real
 * campaign has since progressed specifically toward math.real.ivt
 * (authored this session), which is now authored — making
 * math.num.root-finding ready (requires math.calc.continuity, already
 * certified, plus math.real.ivt, now authored). Authoring root-finding in
 * turn makes math.num.newtons-method ready (requires root-finding plus
 * math.calc.derivative-definition, already certified), so both are
 * closed in this single batch. math.num.euler-method still separately
 * requires math.de.euler-method (a domain not yet opened); math.num.
 * runge-kutta and math.num.stiff-ode remain blocked behind euler-method.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.num.
 * {root-finding,newtons-method}.md.
 *
 * Grade band: both adopt GradeBand.UNDERGRADUATE, continuing math.num's
 * established domain baseline.
 *
 *   ROOT-FINDING  Bisection is NEVER an unrelated algorithm — it is IVT's
 *           own existence guarantee, made algorithmic by applying it
 *           repeatedly to shrinking sub-intervals; Newton's method's speed
 *           comes with GENUINE, non-theoretical failure modes — a bad
 *           starting point or a vanishing derivative causes real failure,
 *           NEVER just "converges more slowly"; and the secant method
 *           achieves SUPERLINEAR convergence without needing the
 *           derivative, but NEVER matches Newton's exact quadratic rate —
 *           the derivative-free approximation genuinely costs speed.
 *   NEWTONS-METHOD  Newton's iteration is the tangent line's x-intercept —
 *           NEVER an arbitrary numerical formula; Newton's method NEVER
 *           converges unconditionally — a zero derivative, a bad starting
 *           point, or a multiple root can each break convergence
 *           outright, never merely slow it down; and linear convergence
 *           at a multiple root is slower, NEVER useless — it still
 *           reaches full precision, just in more steps, with the actual
 *           rate mattering more than the "linear" versus "quadratic"
 *           label.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const ROOT_FINDING = 'math.num.root-finding'
const NEWTONS_METHOD = 'math.num.newtons-method'

export const MATHEMATICS_NUM_ROOT_FINDING_NEWTONS_METHOD_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ROOT_FINDING, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'BISECTION IS IVT\'S EXISTENCE GUARANTEE, MADE ALGORITHMIC — NEVER AN UNRELATED PROCEDURE: '
      + 'for $f(x)=x^2-2$ on $[1,2]$: $f(1)$ is negative, $f(2)$ is positive — IVT guarantees a '
      + 'root in $(1,2)$. BISECT: at the midpoint 1.5, $f(1.5)$ is positive — since $f(1)$ is '
      + 'negative and $f(1.5)$ is positive, the root is in $(1,1.5)$. Continuing this HALVES the '
      + 'interval each step, converging to $\\sqrt2$. This is EXACTLY IVT\'s existence guarantee, '
      + 'APPLIED REPEATEDLY to shrinking sub-intervals — never a separate, unrelated '
      + 'algorithm.\n\n'
      + "NEWTON'S METHOD'S SPEED COMES WITH GENUINE, NON-THEORETICAL FAILURE MODES: for the SAME "
      + 'f(x)=x²-2, starting at 1.5: the next iterate is already accurate to about 3 digits, and '
      + 'the one after that is essentially exact — roughly DOUBLING correct digits each step '
      + '(quadratic convergence). But starting where the derivative is zero causes DIVISION BY '
      + "ZERO — a genuine FAILURE, never merely a theoretical edge case. Newton's dramatic speed "
      + 'advantage over bisection is real, but so is its real vulnerability: a bad starting point '
      + 'or a vanishing derivative is a concrete way the method can fail outright, never just '
      + '"converge more slowly."\n\n'
      + 'SECANT ACHIEVES SUPERLINEAR CONVERGENCE WITHOUT THE DERIVATIVE — NEVER MATCHING '
      + "NEWTON'S EXACT QUADRATIC RATE: for the SAME function, starting with two nearby points: "
      + 'the secant method approximates the derivative via the SLOPE between the two most recent '
      + 'points. Continuing (using only function VALUES, no explicit derivative formula ever) '
      + 'converges FASTER than bisection but SLOWER than Newton on the identical function — '
      + "secant's derivative-free approximation genuinely COSTS some convergence speed "
      + '(superlinear, never quadratic), never a "free lunch" replacement for Newton.',
    targetedMisconceptions: [`${ROOT_FINDING}:MC-1`, `${ROOT_FINDING}:MC-2`, `${ROOT_FINDING}:MC-3`],
    source: eb(ROOT_FINDING, "Core Understanding — bisection being IVT's existence guarantee made algorithmic never an unrelated procedure, Newton's method's speed coming with genuine non-theoretical failure modes, and secant achieving superlinear convergence without the derivative never matching Newton's exact quadratic rate"),
  },
  {
    conceptId: NEWTONS_METHOD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "NEWTON'S ITERATION IS THE TANGENT LINE'S X-INTERCEPT — NEVER AN ARBITRARY FORMULA: the "
      + 'tangent line to $y=f(x)$ at the current point is $y-f(x_n)=f\'(x_n)(x-x_n)$; setting '
      + '$y=0$ and solving gives the Newton update $x_{n+1}=x_n-f(x_n)/f\'(x_n)$ — geometrically, '
      + 'each iterate is exactly where the CURRENT tangent line crosses the x-axis. For '
      + 'f(x)=x²-2 starting at 2: the error roughly squares each step, so the number of correct '
      + 'digits roughly DOUBLES each step — this is QUADRATIC convergence, valid for a SIMPLE '
      + "root (where the derivative is nonzero) with a sufficiently close starting point.\n\n"
      + "NEWTON'S METHOD NEVER CONVERGES UNCONDITIONALLY — NEVER ASSUME ANY STARTING POINT WORKS: "
      + 'for $f(x)=x^{1/3}$, the iteration becomes $x_{n+1}=-2x_n$ — the iterate DOUBLES in '
      + 'magnitude and flips sign every step, DIVERGING from any nonzero start, because the '
      + 'derivative is zero at the very root being sought. For $f(x)=x^3-x$ (roots at 0 and '
      + '±1), a certain starting point produces a 2-CYCLE — the iteration oscillates between two '
      + 'points FOREVER, never converging. Convergence REQUIRES $f$ twice differentiable, a '
      + 'nonzero derivative at the root, and a starting point within the root\'s "basin of '
      + 'attraction" — NEVER guaranteed for an arbitrary starting point.\n\n'
      + 'LINEAR CONVERGENCE AT A MULTIPLE ROOT IS SLOWER, NOT USELESS — NEVER DISMISSED AS "TOO '
      + 'SLOW": for $f(x)=(x-1)^2$ (a DOUBLE root at 1), Newton\'s iteration reduces to a '
      + 'fixed-point iteration with ratio one-half, gaining roughly 0.3 correct digits per '
      + 'iteration (LINEAR convergence) rather than doubling digits each step (quadratic). This '
      + 'is SLOWER than quadratic, but still reaches 15 digits of accuracy in about 50 '
      + 'iterations — genuinely USABLE, never "too slow to be useful." A MODIFIED iteration that '
      + "accounts for the root's multiplicity RESTORES quadratic convergence, at the cost of "
      + 'needing to know that multiplicity.',
    targetedMisconceptions: [`${NEWTONS_METHOD}:MC-1`, `${NEWTONS_METHOD}:MC-2`, `${NEWTONS_METHOD}:MC-3`],
    source: eb(NEWTONS_METHOD, "Core Understanding — Newton's iteration being the tangent line's x-intercept never an arbitrary formula, Newton's method never converging unconditionally, and linear convergence at a multiple root being slower not useless"),
  },
]

export const MATHEMATICS_NUM_ROOT_FINDING_NEWTONS_METHOD_PROBES: SeedProbe[] = [
  {
    conceptId: ROOT_FINDING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "Is bisection an unrelated new algorithm, disconnected from the Intermediate Value Theorem's own existence guarantee?",
    choices: [
      { text: 'No — bisection is exactly IVT\'s existence guarantee applied repeatedly to shrinking sub-intervals: each midpoint check uses the sign-change condition IVT itself relies on, halving the interval toward the guaranteed root', isCorrect: true },
      { text: 'Yes — bisection is a standalone numerical recipe with no direct theoretical connection to IVT', isCorrect: false, misconceptionId: `${ROOT_FINDING}:MC-1` },
      { text: "Yes, since bisection only uses arithmetic operations and IVT is a purely theoretical existence statement", isCorrect: false, misconceptionId: `${ROOT_FINDING}:MC-1` },
    ],
    targetedMisconceptions: [`${ROOT_FINDING}:MC-1`],
    source: eb(ROOT_FINDING, 'Discovery Question 1 as a detection probe (verbatim) — whether bisection is unrelated to IVT, an answer of "yes, unrelated" confirming BISECTION-ASSUMED-UNRELATED-TO-IVT'),
  },
  {
    conceptId: ROOT_FINDING, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "Does Newton's method's much faster convergence rate mean it will always succeed, given any reasonable starting guess?",
    choices: [
      { text: 'No — for f(x)=x^(1/3), Newton\'s iteration diverges from any nonzero start because the derivative vanishes at the root itself, causing division by zero; a bad starting point or vanishing derivative is a genuine failure, never just slower convergence', isCorrect: true },
      { text: "Yes — Newton's method's speed guarantees it will always succeed as long as the starting guess seems reasonable", isCorrect: false, misconceptionId: `${ROOT_FINDING}:MC-2` },
      { text: "Yes, since quadratic convergence mathematically rules out any possibility of divergence or failure", isCorrect: false, misconceptionId: `${ROOT_FINDING}:MC-2` },
    ],
    targetedMisconceptions: [`${ROOT_FINDING}:MC-2`],
    source: eb(ROOT_FINDING, "Discovery Question 2 as a detection probe (verbatim) — whether Newton's fast convergence means it always succeeds, an answer of \"yes\" confirming NEWTONS-METHOD-ASSUMED-ALWAYS-SUCCEEDS"),
  },
  {
    conceptId: ROOT_FINDING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Does the secant method achieve the exact same quadratic convergence rate as Newton's method, just without needing an explicit formula for f'?",
    choices: [
      { text: "No — secant approximates the derivative via a slope between recent points, achieving only SUPERLINEAR convergence; on the same function it converges faster than bisection but genuinely slower than Newton, never matching Newton's exact quadratic rate", isCorrect: true },
      { text: "Yes — the secant method matches Newton's exact quadratic convergence rate while only requiring function values, not derivatives", isCorrect: false, misconceptionId: `${ROOT_FINDING}:MC-3` },
      { text: "Yes, since approximating the derivative from two points is mathematically equivalent to computing it exactly", isCorrect: false, misconceptionId: `${ROOT_FINDING}:MC-3` },
    ],
    targetedMisconceptions: [`${ROOT_FINDING}:MC-3`],
    source: eb(ROOT_FINDING, "Discovery Question 3 as a detection probe (verbatim) — whether secant matches Newton's exact quadratic rate, an answer of \"yes\" confirming SECANT-ASSUMED-SAME-RATE-AS-NEWTON"),
  },
  {
    conceptId: NEWTONS_METHOD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does Newton\'s method converge for any continuous function starting from any point?',
    choices: [
      { text: "No — for f(x)=x^(1/3), the iteration doubles in magnitude and flips sign every step, diverging from any nonzero start because the derivative is zero at the root; convergence requires specific conditions like a nonzero derivative and a starting point in the root's basin of attraction", isCorrect: true },
      { text: "Yes — Newton's method converges for any continuous function regardless of the starting point chosen", isCorrect: false, misconceptionId: `${NEWTONS_METHOD}:MC-1` },
      { text: "Yes, since the tangent-line construction guarantees convergence as long as the function is differentiable somewhere", isCorrect: false, misconceptionId: `${NEWTONS_METHOD}:MC-1` },
    ],
    targetedMisconceptions: [`${NEWTONS_METHOD}:MC-1`],
    source: eb(NEWTONS_METHOD, "Discovery Question 1 as a detection probe (verbatim) — whether Newton's method converges for any continuous function from any point, an answer of \"yes\" confirming NEWTON-ALWAYS-CONVERGES"),
  },
  {
    conceptId: NEWTONS_METHOD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If a reasonable-looking starting point works for one function, will it always work regardless of which function or root you\'re targeting?',
    choices: [
      { text: "No — for f(x)=x³-x, a certain starting point produces a 2-cycle that oscillates forever without converging; a starting point's success depends on the specific function's basin of attraction, which can be small or irregularly shaped", isCorrect: true },
      { text: "Yes — a starting point that works well for one function will always work equally well for any other function or root", isCorrect: false, misconceptionId: `${NEWTONS_METHOD}:MC-2` },
      { text: "Yes, since Newton's method's basin of attraction is always the entire real line for any differentiable function", isCorrect: false, misconceptionId: `${NEWTONS_METHOD}:MC-2` },
    ],
    targetedMisconceptions: [`${NEWTONS_METHOD}:MC-2`],
    source: eb(NEWTONS_METHOD, 'Discovery Question 2 as a detection probe (verbatim) — whether a good starting point generalizes across functions, an answer of "yes" confirming INITIAL-GUESS-IRRELEVANT'),
  },
  {
    conceptId: NEWTONS_METHOD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "If a method converges linearly rather than quadratically, does that mean it's too slow to be practically useful?",
    choices: [
      { text: 'No — for f(x)=(x-1)² (a double root), Newton\'s iteration converges linearly at rate one-half, gaining about 0.3 digits per iteration; this still reaches 15 digits of accuracy in about 50 iterations, genuinely usable, never "too slow to matter"', isCorrect: true },
      { text: 'Yes — a method that converges only linearly, rather than quadratically, is too slow to ever be practically useful', isCorrect: false, misconceptionId: `${NEWTONS_METHOD}:MC-3` },
      { text: "Yes, since linear convergence means the error never actually shrinks below a fixed positive amount", isCorrect: false, misconceptionId: `${NEWTONS_METHOD}:MC-3` },
    ],
    targetedMisconceptions: [`${NEWTONS_METHOD}:MC-3`],
    source: eb(NEWTONS_METHOD, 'Discovery Question 3 as a detection probe (verbatim) — whether linear convergence means a method is too slow to be useful, an answer of "yes" confirming LINEAR-CONVERGENCE-MEANS-SLOW'),
  },
]
