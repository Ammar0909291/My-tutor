/**
 * Batch: discrete-distributions, continuous-distributions, martingale
 * (math.prob).
 *
 * Continuing math.prob (38/49 -> 41/49). Fresh frontier recompute after
 * conditional-expectation/correlation/marginal-distribution's authoring
 * found 4 ready concepts. Selected discrete-distributions and continuous-
 * distributions (both required for normal-distribution, the highest-value
 * remaining prerequisite chain toward CLT) plus martingale (closes
 * conditional-expectation's own remaining unlock) — leaving generating-
 * function for a following batch. Transcribed from the frozen Educational
 * Brain entries at educational-brain/concepts/mathematics/math.prob.
 * {discrete-distributions,continuous-distributions,martingale}.md.
 *
 *   DISCRETE-DISTRIBUTIONS  Geometric has TWO genuinely different
 *           conventions (trials-until vs. failures-before), always
 *           identify which before computing; Poisson is a PRIMARY
 *           distribution in its own right, never merely a Binomial-limit
 *           approximation; Hypergeometric's probability genuinely CHANGES
 *           each draw, never stays fixed at K/N like Binomial.
 *   CONTINUOUS-DISTRIBUTIONS  a density value is NEVER a probability —
 *           probability is always density times width; λ is the RATE,
 *           1/λ is the MEAN — reciprocals, never the same number; the
 *           memoryless property is Exponential's defining feature, which
 *           Uniform GENUINELY LACKS.
 *   MARTINGALE  the martingale condition is conditional expectation's OWN
 *           machinery conditioning on the entire past, never a
 *           fundamentally new tool; sub-/supermartingale classification is
 *           PRECISELY determined by the inequality's direction, never a
 *           loose qualitative judgment; the optional stopping theorem
 *           requires genuine, checkable hypotheses, never holding
 *           unconditionally for any stopping strategy.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const DISCRETE_DISTRIBUTIONS = 'math.prob.discrete-distributions'
const CONTINUOUS_DISTRIBUTIONS = 'math.prob.continuous-distributions'
const MARTINGALE = 'math.prob.martingale'

export const MATHEMATICS_PROB_DISCRETE_DISTRIBUTIONS_CONTINUOUS_DISTRIBUTIONS_MARTINGALE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DISCRETE_DISTRIBUTIONS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'GEOMETRIC HAS TWO GENUINELY DIFFERENT CONVENTIONS — ALWAYS IDENTIFY WHICH BEFORE '
      + 'COMPUTING: Version A (trials UNTIL first success, support {1,2,…}): P(X=k)=(1-p)^(k-1)p, '
      + 'E[X]=1/p. Version B (FAILURES before first success, support {0,1,…}): P(X=k)=(1-p)^k p, '
      + 'E[X]=(1-p)/p. They’re related by X_A=X_B+1 — genuinely different means (1/p vs (1-p)/p), '
      + 'never interchangeable without first identifying which question is being asked ("how many '
      + 'flips TO get heads" is trials-based; "how many tails BEFORE heads" is failures-based).\n\n'
      + 'POISSON IS A PRIMARY DISTRIBUTION IN ITS OWN RIGHT, NEVER MERELY A '
      + 'BINOMIAL-LARGE-n-SMALL-p APPROXIMATION: while Poisson(λ) DOES arise as the limit of '
      + 'Binomial(n,p) as n→∞, p→0, np=λ fixed, it also arises DIRECTLY from the Poisson-process '
      + 'axioms (events at constant rate λ, independent, one at a time) — radioactive decay, '
      + 'customer arrivals, mutation rates are Poisson because of these axioms, never because '
      + 'some hidden n is large and p is small. Poisson’s own defining property Var(X)=E[X]=λ '
      + '(equal, not merely related) makes it a genuinely distinct, primary model for count '
      + 'data.\n\n'
      + 'HYPERGEOMETRIC IS "BINOMIAL WITHOUT REPLACEMENT," BUT THE PROBABILITY GENUINELY CHANGES '
      + 'EACH DRAW — NEVER STAYS FIXED AT K/N: sampling without replacement means each draw '
      + 'changes the remaining population’s composition, so the success probability shifts draw '
      + 'to draw — using Binomial’s fixed-p=K/N PMF when n/N isn’t negligible ignores this and '
      + 'gives the WRONG variance. Hypergeometric’s variance nK(N-K)(N-n)/(N²(N-1)) includes the '
      + 'finite-population correction factor (N-n)/(N-1)<1, making it SMALLER than Binomial’s '
      + 'np(1-p) — sampling without replacement genuinely reduces variability, a structural fact '
      + 'Binomial’s fixed-p model cannot capture.',
    targetedMisconceptions: [`${DISCRETE_DISTRIBUTIONS}:MC-1`, `${DISCRETE_DISTRIBUTIONS}:MC-2`, `${DISCRETE_DISTRIBUTIONS}:MC-3`],
    source: eb(DISCRETE_DISTRIBUTIONS, 'Core Understanding — Geometric’s two genuinely different conventions requiring identification before computing, Poisson as a primary distribution never merely a Binomial-limit approximation, and Hypergeometric’s probability genuinely changing each draw never fixed at K/N'),
  },
  {
    conceptId: CONTINUOUS_DISTRIBUTIONS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'UNIFORM’S DENSITY VALUE IS NEVER A PROBABILITY — PROBABILITY IS ALWAYS DENSITY TIMES '
      + 'WIDTH: for X~U(0,4), f(2)=1/4 is NOT P(X=2) (which is 0, as always for continuous RVs) — '
      + 'it’s the density. P(1≤X≤2)=(2-1)×(1/4)=1/4 genuinely uses the interval’s WIDTH. General '
      + 'formula: P(c≤X≤d)=(d-c)/(b-a) for U(a,b) — always multiply density by interval length, '
      + 'never read the density value as a probability directly.\n\n'
      + 'λ IS THE RATE, 1/λ IS THE MEAN — RECIPROCALS, NEVER THE SAME NUMBER: for Exp(λ) with '
      + 'λ=3 (events per minute): E[X]=1/3 minute — NOT 3 minutes. A HIGH rate means a SHORT mean '
      + 'wait; confusing λ with E[X] inverts this relationship entirely. P(X>t)=e^(-λt) (easy '
      + 'exponential-decay form); Var(X)=1/λ².\n\n'
      + 'THE MEMORYLESS PROPERTY IS EXPONENTIAL’S DEFINING FEATURE — UNIFORM GENUINELY LACKS IT: '
      + 'for Exp(λ), P(X>s+t|X>s)=P(X>t) — having already waited s with no event, the REMAINING '
      + 'wait is distributed IDENTICALLY to starting fresh; past elapsed time is irrelevant. For '
      + 'U(0,T): P(X>s+t|X>s)=(T-s-t)/(T-s), which GENUINELY DEPENDS on s — if a friend promised '
      + 'arrival in U(0,30) and hasn’t shown by minute 20, the remaining wait is now U(20,30) '
      + '(truncated), NOT the same as starting fresh. Recomputing this from the full CDF instead '
      + 'of recognizing the memoryless shortcut wastes effort for Exponential, but for Uniform '
      + 'the direct computation is the ONLY correct route — there is no shortcut to skip.',
    targetedMisconceptions: [`${CONTINUOUS_DISTRIBUTIONS}:MC-1`, `${CONTINUOUS_DISTRIBUTIONS}:MC-2`, `${CONTINUOUS_DISTRIBUTIONS}:MC-3`],
    source: eb(CONTINUOUS_DISTRIBUTIONS, 'Core Understanding — Uniform’s density value never a probability with probability always density times width, λ as the rate and 1/λ as the mean as reciprocals never the same number, and the memoryless property as Exponential’s defining feature that Uniform genuinely lacks'),
  },
  {
    conceptId: MARTINGALE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'THE MARTINGALE CONDITION IS CONDITIONAL EXPECTATION’S OWN MACHINERY, CONDITIONING ON THE '
      + 'ENTIRE PAST — NEVER A FUNDAMENTALLY NEW TOOL: for M_n=Σᵢ₌₁ⁿXᵢ with each Xᵢ=±1 equally '
      + 'likely, independent: E[M_{n+1}|M₀,…,Mₙ]=E[Mₙ+X_{n+1}|M₀,…,Mₙ]=Mₙ+E[X_{n+1}|M₀,…,Mₙ]. '
      + 'Since X_{n+1} is INDEPENDENT of the past, E[X_{n+1}|M₀,…,Mₙ]=E[X_{n+1}]='
      + '(1/2)(1)+(1/2)(-1)=0, giving E[M_{n+1}|M₀,…,Mₙ]=Mₙ — confirming the martingale property '
      + 'using ORDINARY conditional-expectation machinery, conditioning on the WHOLE history '
      + 'M₀,…,Mₙ rather than one variable. Believing this verification requires a fundamentally '
      + 'new probabilistic tool is WRONG — it is exactly math.prob.conditional-expectation’s own '
      + 'apparatus, applied to a richer conditioning set.\n\n'
      + 'SUB-/SUPERMARTINGALE CLASSIFICATION IS PRECISELY DETERMINED BY THE INEQUALITY’S '
      + 'DIRECTION — NEVER A LOOSE QUALITATIVE JUDGMENT: for a biased walk with Xᵢ=+1 w.p. 0.6, '
      + '-1 w.p. 0.4: E[X_{n+1}]=0.2>0, so E[M_{n+1}|past]=Mₙ+0.2>Mₙ — a SUBMARTINGALE. Taking '
      + '-Mₙ instead: E[-M_{n+1}|past]=-Mₙ-0.2<-Mₙ — a SUPERMARTINGALE. The SAME underlying '
      + 'random process, viewed with a sign flip, switches classification entirely. Treating '
      + 'sub-/supermartingale as a vague, "somewhat favorable/unfavorable" judgment call is WRONG '
      + '— the classification is a precise, sign-sensitive computation determined exactly by '
      + 'which direction the conditional-expectation inequality points.\n\n'
      + 'THE OPTIONAL STOPPING THEOREM REQUIRES GENUINE, SOMETIMES-FAILING HYPOTHESES — NEVER '
      + 'HOLDS UNCONDITIONALLY FOR ANY STOPPING STRATEGY: for the fair random walk, the strategy '
      + '"stop as soon as Mₙ first reaches +10" defines a random stopping time τ. Naive intuition '
      + 'suggests E[M_τ]=E[M₀]=0 should still hold — but this UNBOUNDED stopping time has '
      + 'E[τ]=∞, FAILING the theorem’s own hypotheses (e.g. bounded stopping time or bounded '
      + 'increments with E[τ]<∞); the conclusion E[M_τ]=E[M₀] does NOT straightforwardly follow '
      + 'here. Believing the optional stopping theorem guarantees E[M_τ]=E[M₀] for ANY stopping '
      + 'strategy with no further conditions is WRONG — "you can’t beat a fair game" is a precise '
      + 'mathematical theorem with real, checkable hypotheses, never a blanket, hypothesis-free '
      + 'maxim.',
    targetedMisconceptions: [`${MARTINGALE}:MC-1`, `${MARTINGALE}:MC-2`, `${MARTINGALE}:MC-3`],
    source: eb(MARTINGALE, 'Core Understanding — the martingale condition as conditional expectation’s own machinery conditioning on the entire past, sub-/supermartingale classification precisely determined by the inequality’s direction, and the optional stopping theorem requiring genuine checkable hypotheses'),
  },
]

export const MATHEMATICS_PROB_DISCRETE_DISTRIBUTIONS_CONTINUOUS_DISTRIBUTIONS_MARTINGALE_PROBES: SeedProbe[] = [
  {
    conceptId: DISCRETE_DISTRIBUTIONS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For a coin with success probability p, is "the number of flips until the first head" (support {1,2,…}) the same Geometric convention as "the number of tails before the first head" (support {0,1,…})?',
    choices: [
      { text: 'No — these are two GENUINELY DIFFERENT conventions related by X_A=X_B+1, with different means (E[X_A]=1/p versus E[X_B]=(1-p)/p); always identify which question is being asked before computing', isCorrect: true },
      { text: 'Yes — both describe "the Geometric distribution" and always give the identical mean and PMF regardless of which is used', isCorrect: false, misconceptionId: `${DISCRETE_DISTRIBUTIONS}:MC-1` },
      { text: "Yes, since counting flips until success and counting failures before success are just two equivalent ways of describing the exact same random variable", isCorrect: false, misconceptionId: `${DISCRETE_DISTRIBUTIONS}:MC-1` },
    ],
    targetedMisconceptions: [`${DISCRETE_DISTRIBUTIONS}:MC-1`],
    source: eb(DISCRETE_DISTRIBUTIONS, 'Demonstration 1 — flipping until first head (Version A, E[X]=1/p) versus counting tails before first head (Version B, E[X]=(1-p)/p), directly breaking GEOMETRIC-COUNTS-FAILURES-OR-TRIALS'),
  },
  {
    conceptId: DISCRETE_DISTRIBUTIONS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A website gets 300 visitors/hour, modeled directly as Poisson to compute P(5 visitors in one minute). Does using Poisson here require first checking that some underlying Binomial has large n and small p?',
    choices: [
      { text: 'No — Poisson arises DIRECTLY from the Poisson-process axioms (constant rate, independent, one at a time), a primary distribution in its own right; Var(X)=E[X]=λ is its own defining property, never requiring a hidden Binomial approximation', isCorrect: true },
      { text: 'Yes — Poisson can only be validly applied when it is justified as an approximation to some underlying Binomial(n,p) with n large and p small', isCorrect: false, misconceptionId: `${DISCRETE_DISTRIBUTIONS}:MC-2` },
      { text: "Yes, since Poisson is fundamentally a computational shortcut for Binomial calculations that would otherwise be too difficult to compute directly", isCorrect: false, misconceptionId: `${DISCRETE_DISTRIBUTIONS}:MC-2` },
    ],
    targetedMisconceptions: [`${DISCRETE_DISTRIBUTIONS}:MC-2`],
    source: eb(DISCRETE_DISTRIBUTIONS, 'Demonstration 2 — a website’s 300 visitors/hour modeled directly as Poisson (rate-based), computing P(X=5 in one minute)≈0.175 with no reference to any underlying Binomial approximation, directly breaking POISSON-REQUIRES-LARGE-N-SMALL-P'),
  },
  {
    conceptId: DISCRETE_DISTRIBUTIONS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Drawing 10 items from a batch of 100 with 5% defective (Hypergeometric), should the variance be computed using Binomial’s fixed p=K/N formula np(1-p)?',
    choices: [
      { text: 'No — sampling without replacement means the success probability genuinely CHANGES each draw; Hypergeometric’s variance includes the finite-population correction factor (N-n)/(N-1)<1, making it SMALLER than Binomial’s np(1-p)', isCorrect: true },
      { text: 'Yes — Hypergeometric is simply Binomial without replacement, so the same fixed-p=K/N variance formula np(1-p) applies directly', isCorrect: false, misconceptionId: `${DISCRETE_DISTRIBUTIONS}:MC-3` },
      { text: "Yes, since the without-replacement sampling only affects the mean, never the variance calculation", isCorrect: false, misconceptionId: `${DISCRETE_DISTRIBUTIONS}:MC-3` },
    ],
    targetedMisconceptions: [`${DISCRETE_DISTRIBUTIONS}:MC-3`],
    source: eb(DISCRETE_DISTRIBUTIONS, 'Demonstration 3 — drawing 10 items from a batch of 100 with 5% defective, Hypergeometric’s variance including the correction factor 90/99<1, genuinely smaller than the naive Binomial variance, directly breaking HYPERGEOMETRIC-IS-BINOMIAL-WITHOUT-REPLACEMENT'),
  },
  {
    conceptId: CONTINUOUS_DISTRIBUTIONS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For X~U(0,4) with density f(x)=1/4, is f(2)=1/4 the same as P(X=2)?',
    choices: [
      { text: 'No — P(X=2)=0 always for a continuous random variable; f(2)=1/4 is the DENSITY, and probability requires multiplying density by an interval’s WIDTH, e.g. P(1≤X≤2)=(2-1)×(1/4)=1/4', isCorrect: true },
      { text: 'Yes — for a Uniform distribution, the constant density value directly equals the probability of landing on that exact point', isCorrect: false, misconceptionId: `${CONTINUOUS_DISTRIBUTIONS}:MC-1` },
      { text: "Yes, since f(x)=1/(b-a) is defined specifically to give the probability of X equaling any particular value in [a,b]", isCorrect: false, misconceptionId: `${CONTINUOUS_DISTRIBUTIONS}:MC-1` },
    ],
    targetedMisconceptions: [`${CONTINUOUS_DISTRIBUTIONS}:MC-1`],
    source: eb(CONTINUOUS_DISTRIBUTIONS, 'Demonstration 1 — X~U(0,4): P(X=2)=0 always; P(1≤X≤2)=(2-1)×(1/4)=1/4 genuinely uses interval width, directly breaking DENSITY-AS-PROBABILITY'),
  },
  {
    conceptId: CONTINUOUS_DISTRIBUTIONS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For X~Exponential(λ) with λ=3 events per minute, is E[X] equal to 3 minutes?',
    choices: [
      { text: 'No — E[X]=1/λ=1/3 minute; λ is the RATE and 1/λ is the MEAN, reciprocals never the same number; a HIGH rate means a SHORT mean wait', isCorrect: true },
      { text: 'Yes — E[X]=λ=3 minutes, since λ directly gives the mean waiting time for an Exponential distribution', isCorrect: false, misconceptionId: `${CONTINUOUS_DISTRIBUTIONS}:MC-2` },
      { text: "Yes, since the rate parameter and the mean are simply two names for the same underlying quantity in the Exponential distribution", isCorrect: false, misconceptionId: `${CONTINUOUS_DISTRIBUTIONS}:MC-2` },
    ],
    targetedMisconceptions: [`${CONTINUOUS_DISTRIBUTIONS}:MC-2`],
    source: eb(CONTINUOUS_DISTRIBUTIONS, 'Demonstration 2 — emails at rate λ=4/hour: mean inter-arrival time E[X]=1/4 hour=15 minutes, not 4 hours, directly breaking LAMBDA-IS-MEAN'),
  },
  {
    conceptId: CONTINUOUS_DISTRIBUTIONS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A friend promises arrival within U(0,30) minutes and hasn’t shown by minute 20. Can the memoryless shortcut P(X>s+t|X>s)=P(X>t) be applied here, the way it would for Exponential?',
    choices: [
      { text: 'No — Uniform genuinely LACKS the memoryless property; P(X>s+t|X>s)=(T-s-t)/(T-s) for U(0,T) GENUINELY DEPENDS on s, so the remaining wait is truncated to U(20,30), not the same as starting fresh', isCorrect: true },
      { text: 'Yes — the memoryless property applies to any continuous waiting-time distribution, including Uniform, not just Exponential', isCorrect: false, misconceptionId: `${CONTINUOUS_DISTRIBUTIONS}:MC-3` },
      { text: "Yes, since once 20 minutes have passed with no arrival, the remaining wait for a Uniform random variable always resets to behave exactly like a fresh U(0,30)", isCorrect: false, misconceptionId: `${CONTINUOUS_DISTRIBUTIONS}:MC-3` },
    ],
    targetedMisconceptions: [`${CONTINUOUS_DISTRIBUTIONS}:MC-3`],
    source: eb(CONTINUOUS_DISTRIBUTIONS, 'Demonstration 3 — Exp(λ=2): P(X>1.5|X>1)=P(X>0.5)=e^(-1) via the memoryless shortcut, contrasted with Uniform’s genuinely s-dependent conditional probability, directly breaking MEMORYLESS-IGNORED'),
  },
  {
    conceptId: MARTINGALE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For M_n=Σᵢ₌₁ⁿXᵢ with each Xᵢ=±1 equally likely and independent, does verifying E[M_{n+1}|M₀,…,Mₙ]=Mₙ require a fundamentally new probabilistic tool beyond conditional expectation?',
    choices: [
      { text: 'No — since X_{n+1} is independent of the past, E[X_{n+1}|M₀,…,Mₙ]=E[X_{n+1}]=0, giving E[M_{n+1}|M₀,…,Mₙ]=Mₙ using ORDINARY conditional-expectation machinery, just conditioning on the whole history rather than one variable', isCorrect: true },
      { text: 'Yes — verifying the martingale condition requires a fundamentally new probabilistic tool distinct from ordinary conditional expectation', isCorrect: false, misconceptionId: `${MARTINGALE}:MC-1` },
      { text: "Yes, since conditioning on multiple past values M₀,…,Mₙ simultaneously is a different kind of operation than conditioning on a single variable Y", isCorrect: false, misconceptionId: `${MARTINGALE}:MC-1` },
    ],
    targetedMisconceptions: [`${MARTINGALE}:MC-1`],
    source: eb(MARTINGALE, 'Demonstration 1 — the symmetric random walk’s independence-based martingale verification, directly breaking MARTINGALE-CONDITION-ASSUMED-NEW-TOOL'),
  },
  {
    conceptId: MARTINGALE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For a biased walk with E[X_{n+1}]=0.2>0 (a submartingale, since E[M_{n+1}|past]=Mₙ+0.2>Mₙ), what happens if you instead classify -Mₙ?',
    choices: [
      { text: 'It becomes a SUPERMARTINGALE — E[-M_{n+1}|past]=-Mₙ-0.2<-Mₙ; the SAME underlying process, viewed with a sign flip, switches classification entirely, since it is a precise, sign-sensitive inequality check', isCorrect: true },
      { text: 'It stays a submartingale, since the underlying random process and its general "favorable" character haven’t changed', isCorrect: false, misconceptionId: `${MARTINGALE}:MC-2` },
      { text: "The classification is a matter of interpretation, since sub-/supermartingale labels are qualitative descriptions rather than a precise computation", isCorrect: false, misconceptionId: `${MARTINGALE}:MC-2` },
    ],
    targetedMisconceptions: [`${MARTINGALE}:MC-2`],
    source: eb(MARTINGALE, 'Demonstration 2 — the biased-walk-versus-its-negation submartingale/supermartingale sign-flip reclassification, directly breaking SUB-SUPERMARTINGALE-ASSUMED-QUALITATIVE-JUDGMENT'),
  },
  {
    conceptId: MARTINGALE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For a fair random walk M_n starting at M₀=0, does the optional stopping theorem guarantee E[M_τ]=0 for the strategy "stop as soon as Mₙ first reaches +10," with no further conditions needed?',
    choices: [
      { text: 'No — this stopping time τ is UNBOUNDED with E[τ]=∞, FAILING the theorem’s own hypotheses (e.g. bounded stopping time or E[τ]<∞); the conclusion E[M_τ]=E[M₀] does NOT straightforwardly follow here', isCorrect: true },
      { text: 'Yes — the optional stopping theorem guarantees E[M_τ]=E[M₀] for any stopping strategy applied to a fair martingale, with no further conditions required', isCorrect: false, misconceptionId: `${MARTINGALE}:MC-3` },
      { text: "Yes, since 'you can't beat a fair game' is a universal principle that applies to every conceivable stopping rule without exception", isCorrect: false, misconceptionId: `${MARTINGALE}:MC-3` },
    ],
    targetedMisconceptions: [`${MARTINGALE}:MC-3`],
    source: eb(MARTINGALE, 'Demonstration 3 — the "stop at +10" unbounded-stopping-time optional-stopping hypothesis failure, directly breaking OPTIONAL-STOPPING-ASSUMED-UNCONDITIONAL'),
  },
]
