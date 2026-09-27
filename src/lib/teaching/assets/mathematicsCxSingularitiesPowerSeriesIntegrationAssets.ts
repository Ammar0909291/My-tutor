/**
 * Batch: singularities, power-series-cx, complex-integration (math.cx) —
 * 5/31 -> 8/31.
 *
 * Fresh Phase 0 frontier recompute after analytic-functions and
 * harmonic-functions were authored: 4 concepts became simultaneously
 * ready. This batch prioritizes singularities (unlocks laurent-series,
 * residue-theorem), power-series-cx (unlocks identity-theorem, and
 * shares laurent-series with singularities), and complex-integration
 * (unlocks cauchy-theorem) — deferring conformal-mapping (unlocks
 * mobius-transformation, riemann-mapping) for a subsequent batch.
 * Transcribed from their frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.cx.{singularities,power-series-cx,
 * complex-integration}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching this domain's established
 * convention for expert-tier content (all 3 are "expert" tier).
 *
 * power-series-cx's cross-link (math.calc.power-series) and
 * complex-integration's cross-link (math.calc.line-integrals) are both
 * authored — genuine transfer targets. singularities declares none.
 *
 * All 3 EB entries register exactly 3 formal misconceptions each (full
 * contract, no retargeting needed).
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const SINGULARITIES = 'math.cx.singularities'
const POWER_SERIES_CX = 'math.cx.power-series-cx'
const COMPLEX_INTEGRATION = 'math.cx.complex-integration'

export const MATHEMATICS_CX_SINGULARITIES_POWER_SERIES_INTEGRATION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SINGULARITIES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'SINGULARITY TYPE IS DETERMINED BY ACTUAL LIMITING BEHAVIOR — NEVER BY SUPERFICIAL '
      + 'ALGEBRAIC FORM: f(z)=sin(z)/z and g(z)=1/z² are BOTH "undefined at z=0" in the same '
      + 'superficial way (division by zero). But sin(z)/z→1 as z→0 — BOUNDED, a REMOVABLE '
      + 'singularity; while |1/z²|→∞ as z→0 — genuinely unbounded, a POLE. Believing functions '
      + 'with a similarly-looking "undefined at a point" algebraic form must share the same '
      + 'singularity type, without checking actual limiting behavior, is WRONG — the SAME '
      + 'superficial situation can hide two completely different singularity types, '
      + 'distinguishable only by actually tracing the limit.\n\n'
      + 'A POLE REQUIRES |f|→∞ UNIFORMLY — NEVER CONFLATE ANY "BLOWS UP" BEHAVIOR WITH A POLE: for '
      + 'f(z)=e^(1/z) at z₀=0: along the positive real axis, e^(1/z)→∞ (blows up); along the '
      + 'negative real axis, e^(1/z)→0 (vanishes); along the imaginary axis, e^(1/z) OSCILLATES '
      + 'on the unit circle, never settling. Since f is NEITHER bounded NOR uniformly tending to '
      + '∞, this is an ESSENTIAL singularity — NOT a pole. Believing any singularity where f "blows '
      + 'up" or behaves badly must be a pole is WRONG — a genuine pole requires |f|→∞ ALONG EVERY '
      + 'approach path, never just some; wildly path-dependent behavior (different limits, or no '
      + 'limit at all, along different paths) signals an ESSENTIAL singularity instead.\n\n'
      + 'RIEMANN\'S THEOREM CERTIFIES REMOVABILITY VIA BOUNDEDNESS ALONE — NEVER REQUIRING THE '
      + 'EXPLICIT PATCH VALUE FIRST: Riemann\'s Removable Singularity Theorem states an isolated '
      + 'singularity is removable IF AND ONLY IF f is bounded near z₀ — this is a COMPLETE test '
      + 'requiring no construction of the actual patch. Believing a singularity cannot be '
      + 'certified as removable until the specific patching value is explicitly computed is WRONG '
      + '— Riemann\'s theorem\'s own content IS that boundedness ALONE suffices; the theorem '
      + 'certifies removability without needing to construct or even know the patch value in '
      + 'advance.',
    targetedMisconceptions: [`${SINGULARITIES}:MC-1`, `${SINGULARITIES}:MC-2`, `${SINGULARITIES}:MC-3`],
    source: eb(SINGULARITIES, 'Core Understanding — singularity type being determined by actual limiting behavior never superficial algebraic form, a pole requiring |f| to infinity uniformly never conflating any blows-up behavior with a pole, and Riemann\'s theorem certifying removability via boundedness alone never requiring an explicit patch value first'),
  },
  {
    conceptId: POWER_SERIES_CX, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE RATIO TEST TRANSFERS IDENTICALLY — NEVER A NEW TECHNIQUE FOR C: for Σzⁿ/n!: the limit '
      + 'of |aₙ/aₙ₊₁| as n→∞ equals the limit of (n+1) as n→∞, which is ∞, so R=∞ — converges for '
      + 'EVERY z∈C, EXACTLY the same computation as the real exponential series with x replaced by '
      + 'z. Believing the ratio/root test procedure must be adapted when moving from real to '
      + 'complex power series is WRONG — it transfers COMPLETELY UNCHANGED; nothing about finding '
      + 'R changes, only the geometric meaning of the resulting inequality.\n\n'
      + '|z−z₀|<R IS A DISK WITH A CIRCULAR BOUNDARY — NEVER UNIFORM BEHAVIOR ACROSS THAT '
      + 'BOUNDARY: for Σzⁿ/n: R=1. On the boundary |z|=1: at z=1, the series becomes Σ1/n — '
      + 'DIVERGES (harmonic series); at z=−1, it becomes Σ(−1)ⁿ/n — CONVERGES (alternating series '
      + 'test). Two DIFFERENT points on the SAME boundary circle, one divergent, one convergent. '
      + 'Believing that if a complex power series converges (or diverges) at ONE point on its '
      + 'boundary circle, it must behave the SAME WAY at every point on that circle is WRONG — the '
      + 'boundary is an entire circle with infinitely many points, each requiring its OWN '
      + 'independent check, exactly as R\'s two endpoints sometimes disagreed with each other.\n\n'
      + 'HOLOMORPHIC ⟹ EQUALS ITS TAYLOR SERIES IS AN AUTOMATIC GUARANTEE — NEVER PARALLELS R\'S '
      + 'GAP: f(z)=e^z is entire, so it EQUALS its Taylor series Σzⁿ/n! everywhere. Contrast '
      + 'g(x)=e^(−1/x²) (real, C^∞, but Taylor series at 0 identically zero, matching g only at '
      + 'x=0). Assuming that because some real C^∞ functions (like sin(x)) equal their Taylor '
      + 'series, this is the GENERAL rule, missing that in R it is NOT guaranteed, is WRONG — in '
      + 'C, holomorphic functions are AUTOMATICALLY, PROVABLY equal to their Taylor series on a '
      + 'disk, an equivalence with NO real-analysis counterpart.',
    targetedMisconceptions: [`${POWER_SERIES_CX}:MC-1`, `${POWER_SERIES_CX}:MC-2`, `${POWER_SERIES_CX}:MC-3`],
    source: eb(POWER_SERIES_CX, 'Core Understanding — the ratio test transferring identically never a new technique for C, |z-z0|<R being a disk with a circular boundary never uniform behavior across that boundary, and holomorphic implying equals its Taylor series as an automatic guarantee never paralleling R\'s gap'),
  },
  {
    conceptId: COMPLEX_INTEGRATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE COMPLEX LINE INTEGRAL IS COMPUTED BY DIRECT PARAMETRIZATION, IDENTICAL IN FORM TO THE '
      + 'REAL VECTOR LINE INTEGRAL: for the integral of z² over C, the segment from 0 to 1+i: '
      + 'parametrize γ(t)=t(1+i), γ\'(t)=1+i, giving the integral from 0 to 1 of [t(1+i)]²(1+i)dt '
      + '=(1+i)³·(1/3)=(−2+2i)/3. The recipe — parametrize, substitute dz=γ\'(t)dt, reduce to an '
      + 'ordinary integral over t — is the IDENTICAL recipe already mastered for the real vector '
      + 'line integral, just with complex-valued functions and γ\'(t) in place of r\'(t).\n\n'
      + 'THE REVERSAL-OF-PATH PROPERTY IS A PROVEN, RELIABLE SHORTCUT — NEVER NEEDING INDEPENDENT '
      + 'RE-VERIFICATION EACH TIME: given the integral of z over a specific segment C equals i: by '
      + 'the reversal property, the integral over −C equals −i IMMEDIATELY, with no recomputation '
      + 'needed. Recomputing from scratch by re-parametrizing the reversed curve and evaluating '
      + 'directly CONFIRMS the same answer −i — the shortcut is not a risky guess but a genuinely '
      + 'PROVEN fact, mirroring the real VECTOR line integral\'s own sign-flip behavior under '
      + 'reversal (since dz=γ\'(t)dt, like dr, retains directional information, unlike the scalar '
      + 'arc-length element ds).\n\n'
      + 'THE ESTIMATION LEMMA GIVES ONLY AN UPPER BOUND — NEVER THE INTEGRAL\'S ACTUAL VALUE: for '
      + 'the integral of 1/z over C, the upper unit semicircle from 1 to −1 (length π): on C, '
      + '|1/z|=1, so the Estimation Lemma gives the integral\'s magnitude ≤1·π=π. The ACTUAL value '
      + 'has magnitude EXACTLY π here (a coincidental tightness for this particular example) — but '
      + 'believing the Estimation Lemma\'s computed bound IS the integral\'s actual value is WRONG '
      + '— the lemma promises only an UPPER LIMIT; a DIFFERENT integrand could have an actual '
      + 'magnitude far BELOW its own Estimation Lemma bound, and the lemma is precisely useful for '
      + 'proving an integral is small (or vanishes in a limit) WITHOUT needing to compute it '
      + 'exactly.',
    targetedMisconceptions: [`${COMPLEX_INTEGRATION}:MC-1`, `${COMPLEX_INTEGRATION}:MC-2`, `${COMPLEX_INTEGRATION}:MC-3`],
    source: eb(COMPLEX_INTEGRATION, 'Core Understanding — the complex line integral being computed by direct parametrization identical in form to the real vector line integral, the reversal-of-path property being a proven reliable shortcut never needing independent re-verification, and the Estimation Lemma giving only an upper bound never the integral\'s actual value'),
  },
]

export const MATHEMATICS_CX_SINGULARITIES_POWER_SERIES_INTEGRATION_PROBES: SeedProbe[] = [
  // SINGULARITIES
  {
    conceptId: SINGULARITIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Since both sin(z)/z and 1/z² are undefined at z=0 in the same superficial way, must they have the same type of singularity?',
    choices: [
      { text: "No — sin(z)/z approaches 1 as z approaches 0 (bounded, a removable singularity), while |1/z^2| approaches infinity as z approaches 0 (a pole); the same superficial 'division by zero' form can hide two completely different singularity types, distinguishable only by tracing the actual limit", isCorrect: true },
      { text: "Yes, since both are undefined at z=0 in the same algebraic way, they must have the same type of singularity", isCorrect: false, misconceptionId: `${SINGULARITIES}:MC-1` },
      { text: "Since both functions look like a division by zero at the same point, that surface-level algebraic similarity should be treated as sufficient to classify them the same way", isCorrect: false, misconceptionId: `${SINGULARITIES}:MC-1` },
    ],
    targetedMisconceptions: [`${SINGULARITIES}:MC-1`],
    source: eb(SINGULARITIES, 'Discovery Question 1 as a detection probe (verbatim) — whether superficially similar undefined forms share the same singularity type, an answer of "yes" confirming SINGULARITY-TYPE-ASSUMED-FROM-SUPERFICIAL-FORM'),
  },
  {
    conceptId: SINGULARITIES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does any singularity where f "blows up" have to be a pole?',
    choices: [
      { text: "No — for f(z)=e^(1/z) at 0, along the positive real axis it blows up, along the negative real axis it vanishes, and along the imaginary axis it oscillates without settling; since it is neither bounded nor uniformly tending to infinity, this is an essential singularity, not a pole, since a genuine pole requires |f| to infinity along EVERY approach path", isCorrect: true },
      { text: "Yes, any singularity where f blows up or behaves badly must be a pole", isCorrect: false, misconceptionId: `${SINGULARITIES}:MC-2` },
      { text: "Since 'badly behaved near a point' is a natural way to describe both poles and other bad behavior, any blow-up should be classified as a pole without checking multiple approach paths", isCorrect: false, misconceptionId: `${SINGULARITIES}:MC-2` },
    ],
    targetedMisconceptions: [`${SINGULARITIES}:MC-2`],
    source: eb(SINGULARITIES, 'Discovery Question 2 as a detection probe (verbatim) — whether any blowing-up singularity must be a pole, an answer of "yes" confirming POLE-AND-ESSENTIAL-SINGULARITY-CONFLATED'),
  },
  {
    conceptId: SINGULARITIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Can you certify a singularity as removable without computing the specific patching value?',
    choices: [
      { text: "Yes — Riemann's Removable Singularity Theorem states an isolated singularity is removable if and only if f is bounded near z0; this boundedness test is complete on its own and certifies removability without needing to construct or know the patch value in advance", isCorrect: true },
      { text: "No, a singularity cannot be certified as removable until the specific patching value is explicitly computed", isCorrect: false, misconceptionId: `${SINGULARITIES}:MC-3` },
      { text: "Since 'removable' sounds like it should require actually performing the removal, certification should wait until the specific patch value has been computed", isCorrect: false, misconceptionId: `${SINGULARITIES}:MC-3` },
    ],
    targetedMisconceptions: [`${SINGULARITIES}:MC-3`],
    source: eb(SINGULARITIES, 'Discovery Question 3 as a detection probe (verbatim) — whether removability can be certified without the explicit patch value, an answer of "no" confirming REMOVABLE-SINGULARITY-REQUIRES-EXPLICIT-PATCH-VALUE'),
  },
  // POWER_SERIES_CX
  {
    conceptId: POWER_SERIES_CX, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does the ratio/root test procedure need to be adapted when moving from real to complex power series?',
    choices: [
      { text: "No — for the sum of z^n/n!, the ratio test computation gives R=infinity, converging for every z in C, exactly the same computation as the real exponential series with x replaced by z; the procedure transfers completely unchanged, only the geometric meaning of the resulting inequality changes", isCorrect: true },
      { text: "Yes, the ratio/root test procedure must be adapted or changed when moving from real to complex power series", isCorrect: false, misconceptionId: `${POWER_SERIES_CX}:MC-2` },
      { text: "Since moving to a new number system like the complex numbers feels like it should require new mathematical techniques, the ratio test should be expected to need modification", isCorrect: false, misconceptionId: `${POWER_SERIES_CX}:MC-2` },
    ],
    targetedMisconceptions: [`${POWER_SERIES_CX}:MC-2`],
    source: eb(POWER_SERIES_CX, 'Discovery Question 1 as a detection probe (verbatim) — whether the ratio test needs adaptation for complex series, an answer of "yes" confirming RATIO-TEST-ASSUMED-TO-NEED-MODIFICATION-IN-C'),
  },
  {
    conceptId: POWER_SERIES_CX, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If a complex power series converges at one point on its boundary circle, does it converge at every point on that circle?',
    choices: [
      { text: "No — for the sum of z^n/n, R=1; at z=1 the series becomes the harmonic series and diverges, while at z=-1 it becomes an alternating series and converges; two different points on the same boundary circle behave differently, so each boundary point requires its own independent check", isCorrect: true },
      { text: "Yes, if a complex power series converges at one point on its boundary circle, it must converge at every point on that circle", isCorrect: false, misconceptionId: `${POWER_SERIES_CX}:MC-1` },
      { text: "Since a single boundary check often feels representative by symmetry, that one point's behavior should be expected to generalize to the entire boundary circle", isCorrect: false, misconceptionId: `${POWER_SERIES_CX}:MC-1` },
    ],
    targetedMisconceptions: [`${POWER_SERIES_CX}:MC-1`],
    source: eb(POWER_SERIES_CX, 'Discovery Question 2 as a detection probe (verbatim) — whether convergence at one boundary point implies convergence at every boundary point, an answer of "yes" confirming BOUNDARY-CIRCLE-ASSUMED-UNIFORM-BEHAVIOR'),
  },
  {
    conceptId: POWER_SERIES_CX, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If a real function is infinitely differentiable everywhere, must it equal its Taylor series near every point, the same way a holomorphic complex function does?',
    choices: [
      { text: "No — g(x)=e^(-1/x^2) is real, C-infinity, but its Taylor series at 0 is identically zero, matching g only at x=0; in C, by contrast, holomorphic functions are automatically, provably equal to their Taylor series on a disk, an equivalence with no real-analysis counterpart", isCorrect: true },
      { text: "Yes, a real infinitely differentiable function must equal its Taylor series near every point, just like a holomorphic complex function", isCorrect: false, misconceptionId: `${POWER_SERIES_CX}:MC-3` },
      { text: "Since familiar smooth functions like sin(x) do equal their Taylor series, that pattern should be treated as the general rule for all infinitely differentiable real functions", isCorrect: false, misconceptionId: `${POWER_SERIES_CX}:MC-3` },
    ],
    targetedMisconceptions: [`${POWER_SERIES_CX}:MC-3`],
    source: eb(POWER_SERIES_CX, 'Discovery Question 3 as a detection probe (verbatim) — whether real smoothness implies equaling the Taylor series near every point, an answer of "yes" confirming REAL-SMOOTH-EQUALS-TAYLOR-SERIES-ASSUMED-GENERAL'),
  },
  // COMPLEX_INTEGRATION
  {
    conceptId: COMPLEX_INTEGRATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Would it be safer to always recompute a reversed-path integral from scratch, rather than trust the reversal shortcut?',
    choices: [
      { text: "No — the reversal-of-path property is a proven, reliable fact; given the integral over C equals i, the integral over -C equals -i immediately, and recomputing from scratch by re-parametrizing confirms the same answer every time — it mirrors the real vector line integral's own sign-flip behavior under reversal", isCorrect: true },
      { text: "Yes, it would be safer to always independently re-verify a reversed-path integral rather than trust the reversal shortcut", isCorrect: false, misconceptionId: `${COMPLEX_INTEGRATION}:MC-1` },
      { text: "Since the reversal-of-path shortcut is a relatively new technique when first introduced, it should be treated as needing independent double-checking each time it's applied", isCorrect: false, misconceptionId: `${COMPLEX_INTEGRATION}:MC-1` },
    ],
    targetedMisconceptions: [`${COMPLEX_INTEGRATION}:MC-1`],
    source: eb(COMPLEX_INTEGRATION, 'Discovery Question 1 as a detection probe (verbatim) — whether the reversal shortcut needs independent re-verification each time, an answer requiring recomputation confirming REVERSAL-PROPERTY-NOT-TRUSTED-AS-RELIABLE-SHORTCUT'),
  },
  {
    conceptId: COMPLEX_INTEGRATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the Estimation Lemma\'s bound equal the integral\'s actual value?',
    choices: [
      { text: "Not necessarily — for the integral of 1/z over the upper unit semicircle, the Estimation Lemma gives a bound of pi, and here the actual value happens to have magnitude exactly pi, but that tightness is coincidental for this example; the lemma promises only an upper limit, and a different integrand could have an actual magnitude far below its own bound", isCorrect: true },
      { text: "Yes, the Estimation Lemma's bound always equals the integral's actual value", isCorrect: false, misconceptionId: `${COMPLEX_INTEGRATION}:MC-2` },
      { text: "Since the standard textbook example happens to have a tight Estimation Lemma bound, the bound should generally be treated as equal to the integral's actual value", isCorrect: false, misconceptionId: `${COMPLEX_INTEGRATION}:MC-2` },
    ],
    targetedMisconceptions: [`${COMPLEX_INTEGRATION}:MC-2`],
    source: eb(COMPLEX_INTEGRATION, 'Discovery Question 2 as a detection probe (verbatim) — whether the Estimation Lemma\'s bound equals the actual value, an answer of "yes" confirming ESTIMATION-LEMMA-BOUND-MISTAKEN-FOR-EXACT-VALUE'),
  },
  {
    conceptId: COMPLEX_INTEGRATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'When applying the Estimation Lemma, should you check |f(z)| only at the curve\'s endpoints?',
    choices: [
      { text: "No — the maximum of |f(z)| on C must be checked across the ENTIRE curve, not just at its endpoints, since |f(z)| could reach its largest value at an interior point of the curve; checking only endpoints risks computing an incorrect, too-small maximum for the bound", isCorrect: true },
      { text: "Yes, when applying the Estimation Lemma you should check |f(z)| only at the curve's endpoints", isCorrect: false, misconceptionId: `${COMPLEX_INTEGRATION}:MC-3` },
      { text: "Since endpoint-checking is a habit that works in other contexts, it should be applied here too when finding the maximum of |f(z)| on C", isCorrect: false, misconceptionId: `${COMPLEX_INTEGRATION}:MC-3` },
    ],
    targetedMisconceptions: [`${COMPLEX_INTEGRATION}:MC-3`],
    source: eb(COMPLEX_INTEGRATION, 'Discovery Question 3 as a detection probe (verbatim) — whether the Estimation Lemma\'s max should be checked only at endpoints, an answer of "yes" confirming MAX-OF-F-ON-C-COMPUTED-INCORRECTLY'),
  },
]
