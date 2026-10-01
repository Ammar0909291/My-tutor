/**
 * Batch: characteristic-function, convergence-types (math.prob) — the FINAL
 * 2 concepts in math.prob, closing it to 49/49.
 *
 * Fresh Phase 0 frontier recompute after math.de and math.real both reached
 * completion this campaign: both remaining math.prob concepts were blocked
 * on those two domains (characteristic-function on math.de.fourier-transform,
 * convergence-types on math.real.convergence-sequences) and are now READY.
 * Transcribed from their frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.prob.characteristic-function.md
 * and math.prob.convergence-types.md.
 *
 * Grade band: GradeBand.HIGH, matching every other math.prob asset file
 * (domain baseline held regardless of "expert" EB difficulty labels
 * throughout this domain's prior batches).
 *
 * With these 2 concepts, math.prob reaches 49/49 — DOMAIN COMPLETE.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const CHARACTERISTIC_FUNCTION = 'math.prob.characteristic-function'
const CONVERGENCE_TYPES = 'math.prob.convergence-types'

export const MATHEMATICS_PROB_CHARACTERISTIC_FUNCTION_CONVERGENCE_TYPES_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CHARACTERISTIC_FUNCTION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      't TO it IS THE SINGLE CHANGE GUARANTEEING THE CHARACTERISTIC FUNCTION ALWAYS EXISTS: for '
      + 'the standard Cauchy distribution (density $(f(x)=\\frac1{\\pi(1+x^2)})$, even its mean '
      + 'fails to exist): the MGF $(M_X(t)=E[e^{tX}])$ DIVERGES to infinity for EVERY $(t\\ne0)$ — '
      + 'the heavy tail dominates exponential growth, making the MGF\'s entire toolkit unavailable '
      + 'here. But the characteristic function $(\\varphi_X(t)=e^{-|t|})$ is perfectly well-defined '
      + 'and finite for EVERY real $(t)$ — because by Euler\'s formula '
      + '$(e^{itX}=\\cos(tX)+i\\sin(tX))$, and $(|\\cos(tX)+i\\sin(tX)|=1)$ ALWAYS (a point on the '
      + 'unit circle, regardless of how large X is), so $(|e^{itX}|\\le1)$ for EVERY value of X and '
      + 't — no exceptions, ever.\n\n'
      + 'THE CHARACTERISTIC FUNCTION IS LITERALLY THE FOURIER TRANSFORM APPLIED TO A DENSITY — '
      + 'NEVER A SEPARATE INVERSION THEORY: for $(X\\sim\\text{Uniform}(0,1))$: '
      + '$(\\varphi_X(t)=\\int_0^1e^{itx}\\,dx=\\frac{e^{it}-1}{it})$ — computed via exactly the '
      + 'Fourier transform\'s own integral machinery, applied to the uniform density instead of a '
      + 'general signal. The inversion formula $(f(x)=\\frac1{2\\pi}\\int\\varphi_X(t)e^{-itx}\\,dt)$ '
      + 'is exactly that same concept\'s own already-established inverse-transform formula, applied '
      + 'without modification — no new inversion theory is needed.\n\n'
      + 'THE ALWAYS-EXISTS GUARANTEE MAKES UNIQUENESS UNIVERSALLY USABLE — NEVER JUST A '
      + 'THEORETICAL NICETY: an analyst comparing two independently-derived Cauchy-like models '
      + '(both with nonexistent MGFs) cannot use the MGF\'s uniqueness tool at all — there\'s '
      + 'nothing to compare. But computing and comparing their characteristic functions (both '
      + 'perfectly well-defined) and confirming $(\\varphi_{X_1}(t)=\\varphi_{X_2}(t))$ for all t '
      + 'lets the analyst conclude, via uniqueness, that $(X_1)$ and $(X_2)$ genuinely share the '
      + 'same distribution — a conclusion the MGF approach could never reach for this pair.',
    targetedMisconceptions: [`${CHARACTERISTIC_FUNCTION}:MC-1`, `${CHARACTERISTIC_FUNCTION}:MC-2`, `${CHARACTERISTIC_FUNCTION}:MC-3`],
    source: eb(CHARACTERISTIC_FUNCTION, 'Core Understanding — t to it as the single change guaranteeing the characteristic function always exists, the characteristic function being literally the Fourier transform applied to a density never a separate inversion theory, and the always-exists guarantee making uniqueness universally usable never just a theoretical nicety'),
  },
  {
    conceptId: CONVERGENCE_TYPES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'CONVERGENCE IN PROBABILITY NEVER REQUIRES ANY SINGLE OUTCOME\'S SEQUENCE TO CONVERGE: the '
      + 'moving-spike sequence on [0,1] — $(X_{m,k}=\\mathbb{1}_{[k/2^m,(k+1)/2^m]})$, swept across '
      + 'all k at each level m — has $(P(X_n=1)=1/2^m\\to0)$, so $(X_n\\xrightarrow{P}0)$. Yet for '
      + 'ANY fixed $(\\omega\\in[0,1])$: at every level m, $(\\omega)$ falls inside exactly one '
      + 'subinterval, so $(X_n(\\omega)=1)$ infinitely often, never settling down — $(X_n(\\omega))$ '
      + 'converges for ZERO outcomes. Convergence in probability promises only that the chance of a '
      + 'large gap shrinks, never that any particular realization\'s values actually get close; '
      + 'almost sure convergence — $(P(\\lim_nX_n=X)=1)$ — is the STRICTLY STRONGER requirement that '
      + 'demands genuine pointwise $(\\varepsilon)$-N convergence for almost every outcome.\n\n'
      + 'CONVERGENCE IN DISTRIBUTION SAYS NOTHING WHATSOEVER ABOUT ACTUAL VALUE-CLOSENESS: for '
      + '$(X\\sim N(0,1))$ and $(X_n=-X)$ for every n: since $(-X\\sim N(0,1))$ too (normal '
      + 'symmetry), $(F_n=F)$ for all n — $(X_n\\to X)$ in distribution trivially. Yet '
      + '$(|X_n-X|=2|X|)$, a gap that NEVER shrinks (e.g. $(X=1.5)$ gives gap 3, forever). '
      + 'Distributional convergence is purely about CDFs matching in the limit — it implies '
      + 'NOTHING about $(X_n)$ and X even being close, let alone defined on the same probability '
      + 'space.\n\n'
      + 'CONVERGENCE IN PROBABILITY IS A LIMIT STATEMENT — THE PROBABILITY NEVER NEEDS TO REACH '
      + 'EXACTLY ZERO: for $(Z\\sim N(0,1))$ and $(X_n=Z/n\\to0)$: '
      + '$(P(|X_n|>\\varepsilon)=P(|Z|>n\\varepsilon)\\to0)$ as $(n\\to\\infty)$, confirming '
      + '$(X_n\\xrightarrow{P}0)$. But for EVERY finite n, $(P(|Z|>n\\varepsilon))$ is STRICTLY '
      + 'POSITIVE (a standard normal has positive density everywhere) — the probability shrinks '
      + 'toward 0 without ever actually equaling 0 at any finite stage. The full hierarchy — '
      + 'a.s. implies in-probability implies in-distribution — is ONE-DIRECTIONAL, each reverse '
      + 'implication refuted by these exact counterexamples.',
    targetedMisconceptions: [`${CONVERGENCE_TYPES}:MC-1`, `${CONVERGENCE_TYPES}:MC-2`, `${CONVERGENCE_TYPES}:MC-3`],
    source: eb(CONVERGENCE_TYPES, 'Core Understanding — convergence in probability never requiring any single outcome\'s sequence to converge, convergence in distribution saying nothing about actual value-closeness, and convergence in probability being a limit statement that never needs to reach exactly zero'),
  },
]

export const MATHEMATICS_PROB_CHARACTERISTIC_FUNCTION_CONVERGENCE_TYPES_PROBES: SeedProbe[] = [
  {
    conceptId: CHARACTERISTIC_FUNCTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Can the characteristic function fail to exist for some random variables, the same way the MGF can?',
    choices: [
      { text: "No — for the Cauchy distribution the MGF diverges for every t≠0, but φ_X(t)=e^-|t| is finite for every real t, because Euler's formula gives |e^itX|=|cos(tX)+i·sin(tX)|=1 always (a point on the unit circle), so |e^itX|≤1 for every X and t with no exceptions", isCorrect: true },
      { text: "Yes, the characteristic function can fail to exist for some random variables just like the MGF can", isCorrect: false, misconceptionId: `${CHARACTERISTIC_FUNCTION}:MC-1` },
      { text: "Since the MGF's existence failures are well documented, its close relative the characteristic function should share the same weakness", isCorrect: false, misconceptionId: `${CHARACTERISTIC_FUNCTION}:MC-1` },
    ],
    targetedMisconceptions: [`${CHARACTERISTIC_FUNCTION}:MC-1`],
    source: eb(CHARACTERISTIC_FUNCTION, 'Discovery Question 1 as a detection probe (verbatim) — whether the characteristic function can fail to exist the same way the MGF can, an answer of "yes" confirming CHARACTERISTIC-FUNCTION-ASSUMED-CAN-FAIL-TO-EXIST'),
  },
  {
    conceptId: CHARACTERISTIC_FUNCTION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "Is the characteristic function's inversion formula a separate, probability-specific result, or literally the Fourier transform's own inverse-transform formula applied to a density?",
    choices: [
      { text: "It's literally the Fourier transform's own formula — for X~Uniform(0,1), φ_X(t)=∫₀¹e^itx dx=(e^it-1)/(it) is computed via exactly the Fourier transform's integral machinery, and the inversion formula f(x)=(1/2π)∫φ_X(t)e^-itx dt is that same concept's own inverse-transform formula, unmodified", isCorrect: true },
      { text: "It is a separate, probability-specific inversion result, distinct from the Fourier transform's own inverse-transform formula", isCorrect: false, misconceptionId: `${CHARACTERISTIC_FUNCTION}:MC-2` },
      { text: "Since probability theory has its own notation and context, the inversion formula it uses must be an independently derived result rather than a reused one", isCorrect: false, misconceptionId: `${CHARACTERISTIC_FUNCTION}:MC-2` },
    ],
    targetedMisconceptions: [`${CHARACTERISTIC_FUNCTION}:MC-2`],
    source: eb(CHARACTERISTIC_FUNCTION, 'Discovery Question 2 as a detection probe (verbatim) — whether the inversion formula is a separate result or literally the Fourier transform\'s own formula, an answer treating it as separate confirming INVERSION-FORMULA-ASSUMED-SEPARATE-RESULT'),
  },
  {
    conceptId: CHARACTERISTIC_FUNCTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "For two heavy-tailed distributions whose MGFs don't exist, is there still a way to rigorously confirm they're the same distribution?",
    choices: [
      { text: "Yes — compute and compare their characteristic functions instead, which are always well-defined; if φ_X1(t)=φ_X2(t) for all t, uniqueness guarantees X1 and X2 share the same distribution, a conclusion the MGF approach could never reach since it has nothing to compare when both MGFs diverge", isCorrect: true },
      { text: "No, there is no rigorous way to confirm two heavy-tailed distributions with nonexistent MGFs are the same distribution", isCorrect: false, misconceptionId: `${CHARACTERISTIC_FUNCTION}:MC-3` },
      { text: "Since the MGF comparison tool is unavailable here, any comparison of these two distributions would necessarily be informal rather than rigorous", isCorrect: false, misconceptionId: `${CHARACTERISTIC_FUNCTION}:MC-3` },
    ],
    targetedMisconceptions: [`${CHARACTERISTIC_FUNCTION}:MC-3`],
    source: eb(CHARACTERISTIC_FUNCTION, 'Discovery Question 3 as a detection probe (verbatim) — whether heavy-tailed distributions with nonexistent MGFs can still be rigorously compared, an answer of "no" confirming UNIQUENESS-ASSUMED-UNAVAILABLE-FOR-HEAVY-TAILED-DISTRIBUTIONS'),
  },
  {
    conceptId: CONVERGENCE_TYPES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If Xₙ converges to X in probability, does that mean Xₙ(ω) converges to X(ω) for almost every outcome ω?',
    choices: [
      { text: "No — the moving-spike sequence on [0,1] has P(Xₙ=1)=1/2^m→0 so Xₙ→0 in probability, yet for ANY fixed ω, Xₙ(ω)=1 infinitely often at every level, so Xₙ(ω) converges for ZERO outcomes; convergence in probability only shrinks the chance of a large gap, while almost sure convergence is the strictly stronger pointwise requirement", isCorrect: true },
      { text: "Yes, convergence in probability automatically implies almost sure convergence for almost every outcome", isCorrect: false, misconceptionId: `${CONVERGENCE_TYPES}:MC-1` },
      { text: "Since both definitions use epsilon-based language, they must be describing the same underlying convergence guarantee", isCorrect: false, misconceptionId: `${CONVERGENCE_TYPES}:MC-1` },
    ],
    targetedMisconceptions: [`${CONVERGENCE_TYPES}:MC-1`],
    source: eb(CONVERGENCE_TYPES, 'Discovery Question 1 as a detection probe (verbatim) — whether convergence in probability implies almost-sure convergence for almost every outcome, an answer of "yes" confirming CONVERGENCE-IN-PROBABILITY-ASSUMED-EQUIVALENT-TO-ALMOST-SURE'),
  },
  {
    conceptId: CONVERGENCE_TYPES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "If Xₙ converges to X in distribution, does that mean their actual values are getting close?",
    choices: [
      { text: "No — for X~N(0,1) and Xₙ=-X for every n, -X~N(0,1) too by symmetry so Fₙ=F for all n (perfect distributional convergence), yet |Xₙ-X|=2|X| never shrinks; distributional convergence is purely about CDFs matching, implying nothing about actual value-closeness", isCorrect: true },
      { text: "Yes, convergence in distribution means Xₙ and X's actual values are getting close to each other", isCorrect: false, misconceptionId: `${CONVERGENCE_TYPES}:MC-2` },
      { text: "Since the word 'convergence' is used, the values themselves must be approaching one another in this mode too", isCorrect: false, misconceptionId: `${CONVERGENCE_TYPES}:MC-2` },
    ],
    targetedMisconceptions: [`${CONVERGENCE_TYPES}:MC-2`],
    source: eb(CONVERGENCE_TYPES, 'Discovery Question 2 as a detection probe (verbatim) — whether convergence in distribution implies the actual values are getting close, an answer of "yes" confirming CONVERGENCE-IN-DISTRIBUTION-ASSUMED-TO-IMPLY-VALUE-CLOSENESS'),
  },
  {
    conceptId: CONVERGENCE_TYPES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "For Xₙ to converge to X in probability, does P(|Xₙ−X|>ε) eventually need to become EXACTLY zero?",
    choices: [
      { text: "No — for Z~N(0,1) and Xₙ=Z/n→0, P(|Xₙ|>ε)=P(|Z|>nε)→0 as n→∞ confirming convergence in probability, but for every finite n this probability is STRICTLY POSITIVE (a standard normal has positive density everywhere) — it only needs to approach zero in the limit, never actually hit it", isCorrect: true },
      { text: "Yes, P(|Xₙ−X|>ε) must become exactly zero for large n for convergence in probability to hold", isCorrect: false, misconceptionId: `${CONVERGENCE_TYPES}:MC-3` },
      { text: "Since the sequence is said to converge, the defining probability must eventually reach its limiting value of zero exactly at some finite stage", isCorrect: false, misconceptionId: `${CONVERGENCE_TYPES}:MC-3` },
    ],
    targetedMisconceptions: [`${CONVERGENCE_TYPES}:MC-3`],
    source: eb(CONVERGENCE_TYPES, 'Discovery Question 3 as a detection probe (verbatim) — whether the gap probability must become exactly zero rather than merely approach zero, an answer of "yes" confirming CONVERGENCE-IN-PROBABILITY-REQUIRES-EXACT-ZERO'),
  },
]
