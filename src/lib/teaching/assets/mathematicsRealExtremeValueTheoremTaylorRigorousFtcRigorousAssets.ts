/**
 * Batch: extreme-value-theorem, taylor-rigorous, ftc-rigorous (math.real).
 *
 * math.num reached 13/16 last batch (only euler-method, runge-kutta,
 * stiff-ode remain, all blocked on the not-yet-opened math.de domain),
 * so this campaign turn switches fully back to math.real. Fresh Phase 0
 * frontier recompute after the ivt/mvt/compactness and root-finding/
 * newtons-method batches found 11 ready concepts; this batch selects
 * extreme-value-theorem (closes compactness's own declared unlock),
 * taylor-rigorous (follows directly from mvt, now authored), and
 * ftc-rigorous (follows from riemann-integral + differentiability-
 * rigorous, both authored). Transcribed from the frozen Educational
 * Brain entries at educational-brain/concepts/mathematics/math.real.
 * {extreme-value-theorem,taylor-rigorous,ftc-rigorous}.md.
 *
 * Grade band: all three adopt GradeBand.UNDERGRADUATE, continuing math.real's
 * established domain baseline.
 *
 *   EXTREME-VALUE-THEOREM  This theorem supplies the EXISTENCE guarantee
 *           the calculus-level critical-points-and-endpoints optimization
 *           method silently presupposes — that method is NEVER
 *           self-guaranteeing on its own; boundedness alone is NEVER
 *           sufficient for attainment — closedness is the extra
 *           ingredient that guarantees a bound is actually reached by
 *           some point; and compactness NEVER subsumes the continuity
 *           requirement — dropping either hypothesis independently
 *           breaks the conclusion.
 *   TAYLOR-RIGOROUS  Taylor's theorem makes the informal "error" an EXACT
 *           quantity, NEVER a vague approximate bound; the Lagrange
 *           remainder is NEVER merely analogous to MVT — it literally
 *           CONTAINS MVT as its n=0 special case, verified by direct
 *           substitution; and the proof reuses Rolle's Theorem repeatedly
 *           at every order, NEVER requiring a fundamentally new technique
 *           per order.
 *   FTC-RIGOROUS  Part 1 genuinely generalizes the calculus-level FTC1 in
 *           two real ways, NEVER a mere restatement — it applies at
 *           individual continuity points amid other discontinuities; the
 *           Lipschitz conclusion uses ONLY boundedness while the
 *           differentiability conclusion needs continuity at the specific
 *           point — NEVER the same hypothesis; and Part 2 runs in the
 *           OPPOSITE logical direction from Part 1 — Part 1 constructs an
 *           antiderivative, Part 2 assumes one already exists, NEVER the
 *           same claim proved twice.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const EXTREME_VALUE_THEOREM = 'math.real.extreme-value-theorem'
const TAYLOR_RIGOROUS = 'math.real.taylor-rigorous'
const FTC_RIGOROUS = 'math.real.ftc-rigorous'

export const MATHEMATICS_REAL_EXTREME_VALUE_THEOREM_TAYLOR_RIGOROUS_FTC_RIGOROUS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: EXTREME_VALUE_THEOREM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "THIS THEOREM SUPPLIES THE EXISTENCE GUARANTEE THE CALCULUS-LEVEL OPTIMIZATION METHOD "
      + 'PRESUPPOSES: the critical-points-and-endpoints method finds global extrema by checking '
      + 'finitely many candidates — an effective procedure that implicitly ASSUMES a global max '
      + 'and min actually exist among those candidates. For $f(x)=x^3-3x$ on $[-2,2]$: critical '
      + 'points at $\\pm1$, evaluated alongside the endpoints $\\pm2$, give a small candidate '
      + "set. This method's RELIABILITY — that the true global extrema are guaranteed to appear "
      + 'among these finitely many candidates — rests entirely on THIS theorem: $f$ continuous '
      + 'and $[-2,2]$ compact guarantees a max and min exist at all.\n\n'
      + 'THE PROOF\'S TWO STEPS: CONTINUOUS IMAGE OF COMPACT IS COMPACT, THEN CLOSED-AND-BOUNDED '
      + 'SECURES ATTAINMENT: for $f(x)=x^2$ on $K=[-1,2]$: the image is $[0,4]$. STEP 1: the '
      + 'image is compact since $K$ is. STEP 2 (Heine-Borel): $[0,4]$ being CLOSED means its '
      + 'supremum (4) and infimum (0) are genuinely CONTAINED in the image, not merely '
      + 'approached — contrast a hypothetical open image, where the same numeric bounds would be '
      + 'approached but never attained. BOUNDEDNESS ALONE only guarantees a supremum/infimum '
      + 'exists as a number; CLOSEDNESS is the extra ingredient guaranteeing that number is '
      + 'actually a member of the image, i.e. some point of $K$ genuinely maps to it.\n\n'
      + 'BOTH HYPOTHESES ARE INDEPENDENTLY NECESSARY — DROPPING EITHER BREAKS THE CONCLUSION: '
      + 'dropping COMPACTNESS: $f(x)=x$ on the non-compact $(0,1)$ is continuous, yet has no '
      + 'maximum (values approach 1 but 1 is not in the domain) and no minimum. Dropping '
      + 'CONTINUITY: a function equal to $x$ on $[0,1)$ but jumping to 0 at $x=1$ (a jump '
      + 'discontinuity) on the COMPACT $[0,1]$: the supremum is 1 (approached as $x$ approaches '
      + '1 from below) but the function value at 1 is 0, not 1 — the supremum is never attained, '
      + 'despite compactness genuinely holding. Each counterexample isolates exactly one '
      + "hypothesis's failure.",
    targetedMisconceptions: [`${EXTREME_VALUE_THEOREM}:MC-1`, `${EXTREME_VALUE_THEOREM}:MC-2`, `${EXTREME_VALUE_THEOREM}:MC-3`],
    source: eb(EXTREME_VALUE_THEOREM, 'Core Understanding — this theorem supplying the existence guarantee the calculus optimization method presupposes, the proof\'s two steps of continuous-image-of-compact-is-compact then closed-and-bounded securing attainment, and both hypotheses being independently necessary since dropping either breaks the conclusion'),
  },
  {
    conceptId: TAYLOR_RIGOROUS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'TAYLOR\'S THEOREM MAKES THE INFORMAL "ERROR" AN EXACT QUANTITY, NEVER A VAGUE ESTIMATE: '
      + 'for $f(x)=e^x$ at $a=0$, truncating at degree 2: $f(x)\\approx1+x+x^2/2$. Taylor\'s '
      + 'theorem makes the ERROR EXACT: the true value equals the truncation plus a remainder '
      + 'term $R_2(x)=\\frac{e^c}{6}x^3$ for SOME $c$ between 0 and $x$. At $x=1$: the true value '
      + 'is about 2.71828, the truncation gives 2.5, and the actual error is about 0.21828 — and '
      + 'the theorem GUARANTEES this exactly equals the remainder formula evaluated at a specific '
      + '(if not independently computable in advance) $c$ around 0.27.\n\n'
      + 'THE LAGRANGE REMAINDER IS MVT\'S OWN CONCLUSION, GENERALIZED — NOT MERELY ANALOGOUS TO '
      + 'IT: setting $n=0$ in Taylor\'s theorem: $f(b)=f(a)+R_0(b)$ where the remainder equals '
      + '$f\'(c)(b-a)$ for some $c$ between $a$ and $b$ — rearranging gives exactly MVT\'s own '
      + 'conclusion. This is verified by DIRECT SUBSTITUTION, not loose resemblance — Taylor\'s '
      + 'theorem literally CONTAINS MVT as its $n=0$ special case.\n\n'
      + "THE PROOF REUSES ROLLE'S THEOREM REPEATEDLY, NOT A NEW TECHNIQUE PER ORDER (ORIENTATION "
      + 'LEVEL): the standard $n=1$ proof constructs an auxiliary function engineered so it '
      + "vanishes at both endpoints, then applies ROLLE'S THEOREM — the SAME theorem underlying "
      + "MVT's own proof — producing an intermediate point that, after algebraic manipulation, "
      + 'gives exactly the $n=1$ Lagrange remainder. The proof genuinely REUSES the '
      + 'existence-of-an-intermediate-point machinery via progressively more elaborate auxiliary '
      + 'functions, rather than requiring an unrelated new technique for each successive order.',
    targetedMisconceptions: [`${TAYLOR_RIGOROUS}:MC-1`, `${TAYLOR_RIGOROUS}:MC-2`, `${TAYLOR_RIGOROUS}:MC-3`],
    source: eb(TAYLOR_RIGOROUS, "Core Understanding — Taylor's theorem making the informal error an exact quantity never a vague estimate, the Lagrange remainder being MVT's own conclusion generalized never merely analogous, and the proof reusing Rolle's Theorem repeatedly never a new technique per order"),
  },
  {
    conceptId: FTC_RIGOROUS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'PART 1 GENERALIZES THE CALCULUS-LEVEL FTC1 IN TWO GENUINE WAYS: for a function equal to '
      + '$t$ everywhere except at $t=0$ where it equals 5 (discontinuous at 0 but bounded, hence '
      + "integrable): the calculus-level version (requiring continuity EVERYWHERE) cannot apply "
      + "directly. But THIS concept's Part 1 applies at any point of continuity, e.g. $x_0=2$: "
      + 'the derivative of the accumulated integral at 2 equals $f(2)=2$, genuinely provable '
      + "despite the discontinuity elsewhere — confirming Part 1's strictly BROADER "
      + 'applicability, not a mere restatement.\n\n'
      + 'THE LIPSCHITZ BOUND USES ONLY BOUNDEDNESS; DIFFERENTIABILITY NEEDS CONTINUITY AT THE '
      + 'POINT — TWO SEPARATE HYPOTHESES: since an integrable function is bounded, additivity of '
      + 'the integral gives a Lipschitz bound on the accumulated integral function — needing '
      + 'ONLY boundedness. For $f(t)=\\sin t$ on $[0,\\pi]$ (bounded by 1): the accumulated '
      + 'integral satisfies the Lipschitz condition with that exact bound, verified with NO '
      + 'continuity argument. Separately, the derivative of the accumulated integral equaling '
      + '$f(x_0)$ at a continuity point $x_0$ uses an epsilon-delta argument: the difference '
      + 'quotient is an average of $f$ over a shrinking interval, forced within epsilon of '
      + '$f(x_0)$ by continuity AT that point specifically.\n\n'
      + "PART 2'S PROOF USES MVT'S TELESCOPING SUM, AND RUNS IN THE OPPOSITE LOGICAL DIRECTION "
      + 'FROM PART 1: given an antiderivative $F$ of $f$ ALREADY ASSUMED to exist (not the '
      + 'Part-1-constructed one), partition the interval and apply MVT on each subinterval: the '
      + 'change in $F$ across each piece equals $f$ at some intermediate point times the piece '
      + 'width. Summing telescopically gives EXACTLY a Riemann sum for $f$, converging to the '
      + 'definite integral as the partition refines. Part 1 CONSTRUCTS $F$ from the integral; '
      + 'Part 2 ASSUMES $F$ exists and evaluates the integral from it — logically opposite '
      + 'directions, never the same claim twice.',
    targetedMisconceptions: [`${FTC_RIGOROUS}:MC-1`, `${FTC_RIGOROUS}:MC-2`, `${FTC_RIGOROUS}:MC-3`],
    source: eb(FTC_RIGOROUS, "Core Understanding — Part 1 genuinely generalizing the calculus-level FTC1 in two ways, the Lipschitz bound needing only boundedness while differentiability needs continuity at the point as two separate hypotheses, and Part 2's proof running in the opposite logical direction from Part 1"),
  },
]

export const MATHEMATICS_REAL_EXTREME_VALUE_THEOREM_TAYLOR_RIGOROUS_FTC_RIGOROUS_PROBES: SeedProbe[] = [
  {
    conceptId: EXTREME_VALUE_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does checking critical points and endpoints automatically guarantee a global maximum exists?',
    choices: [
      { text: 'No — that method\'s reliability (that the true global extrema appear among the finitely many candidates checked) rests entirely on this theorem: continuity plus a compact domain is what guarantees a global max and min exist at all', isCorrect: true },
      { text: 'Yes — the critical-points-and-endpoints method is self-guaranteeing and always finds a genuine global maximum', isCorrect: false, misconceptionId: `${EXTREME_VALUE_THEOREM}:MC-1` },
      { text: "Yes, since checking finitely many candidates mathematically forces one of them to be the true global maximum", isCorrect: false, misconceptionId: `${EXTREME_VALUE_THEOREM}:MC-1` },
    ],
    targetedMisconceptions: [`${EXTREME_VALUE_THEOREM}:MC-1`],
    source: eb(EXTREME_VALUE_THEOREM, 'Discovery Question 1 as a detection probe (verbatim) — whether checking critical points and endpoints automatically guarantees a global maximum, an answer of "yes" confirming OPTIMIZATION-METHOD-ASSUMED-SELF-GUARANTEEING'),
  },
  {
    conceptId: EXTREME_VALUE_THEOREM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is boundedness of f(K) alone sufficient to guarantee f attains a maximum?',
    choices: [
      { text: 'No — boundedness alone only guarantees a supremum exists as a number; closedness is the extra ingredient guaranteeing that number is actually a member of f(K), i.e. some point of K genuinely maps to it', isCorrect: true },
      { text: 'Yes — boundedness of the image alone is sufficient to guarantee that the function attains an actual maximum value', isCorrect: false, misconceptionId: `${EXTREME_VALUE_THEOREM}:MC-2` },
      { text: "Yes, since a bounded set of real numbers always contains its own supremum as a member", isCorrect: false, misconceptionId: `${EXTREME_VALUE_THEOREM}:MC-2` },
    ],
    targetedMisconceptions: [`${EXTREME_VALUE_THEOREM}:MC-2`],
    source: eb(EXTREME_VALUE_THEOREM, 'Discovery Question 2 as a detection probe (verbatim) — whether boundedness alone is sufficient for attainment, an answer of "yes" confirming BOUNDEDNESS-ASSUMED-SUFFICIENT-FOR-ATTAINMENT'),
  },
  {
    conceptId: EXTREME_VALUE_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If a domain is compact but the function is discontinuous, can the extreme value guarantee still fail?',
    choices: [
      { text: 'Yes — a function equal to x on [0,1) but jumping to 0 at x=1, on the compact [0,1], has supremum 1 (approached but never reached) since the function value at 1 is 0; compactness alone never subsumes the independent continuity requirement', isCorrect: true },
      { text: 'No — compactness of the domain alone is always sufficient for the extreme value guarantee, regardless of whether the function is continuous', isCorrect: false, misconceptionId: `${EXTREME_VALUE_THEOREM}:MC-3` },
      { text: "No, since any function defined on a compact domain is automatically continuous there", isCorrect: false, misconceptionId: `${EXTREME_VALUE_THEOREM}:MC-3` },
    ],
    targetedMisconceptions: [`${EXTREME_VALUE_THEOREM}:MC-3`],
    source: eb(EXTREME_VALUE_THEOREM, 'Discovery Question 3 as a detection probe (verbatim) — whether the extreme value guarantee can fail with a compact but discontinuous setup, an answer of "no" confirming COMPACTNESS-ASSUMED-TO-SUBSUME-CONTINUITY-REQUIREMENT'),
  },
  {
    conceptId: TAYLOR_RIGOROUS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does Taylor\'s theorem only give an approximate bound or estimate on the truncation error, rather than an exact equality?',
    choices: [
      { text: 'No — the Lagrange remainder is an EXACT quantity: for e^x truncated at degree 2, the exact error equals e^c/6 for a specific (if not independently computable) c between 0 and x, verified numerically, never merely an approximate bound', isCorrect: true },
      { text: 'Yes — Taylor\'s theorem only provides an approximate estimate of the truncation error, never an exact value', isCorrect: false, misconceptionId: `${TAYLOR_RIGOROUS}:MC-1` },
      { text: "Yes, since the remainder term itself depends on an unknown value c that can never be determined precisely", isCorrect: false, misconceptionId: `${TAYLOR_RIGOROUS}:MC-1` },
    ],
    targetedMisconceptions: [`${TAYLOR_RIGOROUS}:MC-1`],
    source: eb(TAYLOR_RIGOROUS, 'Discovery Question 1 as a detection probe (verbatim) — whether Taylor\'s theorem gives only an approximate bound, an answer of "yes" confirming REMAINDER-ASSUMED-APPROXIMATE-BOUND'),
  },
  {
    conceptId: TAYLOR_RIGOROUS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "Is the Lagrange remainder merely inspired by or analogous to MVT's conclusion, or does it literally contain MVT as a special case?",
    choices: [
      { text: "It literally contains MVT — setting n=0 in Taylor's theorem and rearranging reproduces MVT's exact conclusion via direct algebraic substitution, not loose resemblance", isCorrect: true },
      { text: "It is merely analogous to MVT — the two results share a similar style of argument but are not literally connected", isCorrect: false, misconceptionId: `${TAYLOR_RIGOROUS}:MC-2` },
      { text: "It is a completely independent result that happens to look superficially similar to MVT", isCorrect: false, misconceptionId: `${TAYLOR_RIGOROUS}:MC-2` },
    ],
    targetedMisconceptions: [`${TAYLOR_RIGOROUS}:MC-2`],
    source: eb(TAYLOR_RIGOROUS, 'Discovery Question 2 as a detection probe (verbatim) — whether the Lagrange remainder is merely analogous to MVT or literally contains it, an answer of "merely analogous" confirming LAGRANGE-REMAINDER-ASSUMED-MERELY-ANALOGOUS-TO-MVT'),
  },
  {
    conceptId: TAYLOR_RIGOROUS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does proving Taylor\'s theorem at each successive order n require a genuinely different, unrelated proof technique?',
    choices: [
      { text: "No — the proof reuses Rolle's Theorem repeatedly via progressively more elaborate auxiliary functions at each order, the same intermediate-point-existence machinery throughout, never a fundamentally new technique per order", isCorrect: true },
      { text: "Yes — each order n of Taylor's theorem requires an entirely new and unrelated proof technique from scratch", isCorrect: false, misconceptionId: `${TAYLOR_RIGOROUS}:MC-3` },
      { text: "Yes, since higher-order remainder formulas are structurally unrelated to Rolle's Theorem entirely", isCorrect: false, misconceptionId: `${TAYLOR_RIGOROUS}:MC-3` },
    ],
    targetedMisconceptions: [`${TAYLOR_RIGOROUS}:MC-3`],
    source: eb(TAYLOR_RIGOROUS, 'Discovery Question 3 as a detection probe (verbatim) — whether each order n requires a genuinely new proof technique, an answer of "yes" confirming EACH-ORDER-ASSUMED-TO-NEED-NEW-PROOF-TECHNIQUE'),
  },
  {
    conceptId: FTC_RIGOROUS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "Is this concept's Part 1 just a restatement of the calculus-level FTC1, or does it prove something genuinely more general?",
    choices: [
      { text: 'Something genuinely more general — for a function discontinuous at one point but bounded (hence integrable), the calculus-level version (requiring continuity everywhere) cannot apply, but this Part 1 still applies at any individual point of continuity elsewhere', isCorrect: true },
      { text: "It is just a restatement — this concept's Part 1 proves exactly the same claim as the calculus-level FTC1, with no genuine strengthening", isCorrect: false, misconceptionId: `${FTC_RIGOROUS}:MC-1` },
      { text: "It is a restatement, since both versions require the function to be continuous at every point of the interval", isCorrect: false, misconceptionId: `${FTC_RIGOROUS}:MC-1` },
    ],
    targetedMisconceptions: [`${FTC_RIGOROUS}:MC-1`],
    source: eb(FTC_RIGOROUS, 'Discovery Question 1 as a detection probe (verbatim) — whether this Part 1 is just a restatement of the calculus-level FTC1, an answer of "yes, restatement" confirming RIGOROUS-FTC1-ASSUMED-MERE-RESTATEMENT'),
  },
  {
    conceptId: FTC_RIGOROUS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "Does proving F is Lipschitz require f to be continuous, the same way proving F'(x₀)=f(x₀) does?",
    choices: [
      { text: 'No — the Lipschitz bound follows from boundedness alone (via the integral\'s additivity), verified for sin(t) with no continuity argument at all; differentiability of F at a specific point is the separate conclusion that needs continuity there', isCorrect: true },
      { text: "Yes — proving F is Lipschitz requires the exact same continuity hypothesis as proving F'(x₀)=f(x₀)", isCorrect: false, misconceptionId: `${FTC_RIGOROUS}:MC-2` },
      { text: "Yes, since both conclusions about F ultimately trace back to the same underlying continuity assumption on f", isCorrect: false, misconceptionId: `${FTC_RIGOROUS}:MC-2` },
    ],
    targetedMisconceptions: [`${FTC_RIGOROUS}:MC-2`],
    source: eb(FTC_RIGOROUS, "Discovery Question 2 as a detection probe (verbatim) — whether Lipschitz and differentiability need the same continuity hypothesis, an answer of \"yes\" confirming LIPSCHITZ-CONCLUSION-CONFLATED-WITH-DIFFERENTIABILITY-HYPOTHESIS"),
  },
  {
    conceptId: FTC_RIGOROUS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Do Part 1 and Part 2 prove the same claim in the same logical direction, just phrased differently?',
    choices: [
      { text: 'No — Part 1 CONSTRUCTS an antiderivative from the integral and studies its properties; Part 2 ASSUMES an antiderivative already exists and evaluates the integral from it via MVT\'s telescoping sum — logically opposite directions, never the same claim twice', isCorrect: true },
      { text: 'Yes — Part 1 and Part 2 prove the identical claim, merely using different notation or presentation styles', isCorrect: false, misconceptionId: `${FTC_RIGOROUS}:MC-3` },
      { text: "Yes, since both parts start from the same given antiderivative and derive the same relationship to the integral", isCorrect: false, misconceptionId: `${FTC_RIGOROUS}:MC-3` },
    ],
    targetedMisconceptions: [`${FTC_RIGOROUS}:MC-3`],
    source: eb(FTC_RIGOROUS, 'Discovery Question 3 as a detection probe (verbatim) — whether Part 1 and Part 2 prove the same claim in the same direction, an answer of "yes" confirming PART-1-AND-PART-2-ASSUMED-SAME-DIRECTION'),
  },
]
