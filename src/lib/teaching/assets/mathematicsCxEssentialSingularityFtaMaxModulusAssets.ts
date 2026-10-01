/**
 * Batch: essential-singularity, fundamental-theorem-algebra, maximum-modulus
 * (math.cx) — 20/31 -> 23/31.
 *
 * Fresh Phase 0 frontier recompute after argument-principle, liouville-theorem,
 * and cauchy-goursat landed: ALL 11 of math.cx's remaining concepts became
 * simultaneously ready, and (verified against the whole 908-concept KG, not
 * just math.cx) none of the 11 unlocks anything else still missing overall —
 * math.nt.riemann-hypothesis, the only concept anywhere in the KG requiring
 * one of these 11 (riemann-zeta), was already authored in an earlier
 * campaign. With no differential unlock priority among the 11, this batch
 * (and the batches after it) simply works through them in a reasonable
 * order. Transcribed from their frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.cx.{essential-singularity,
 * fundamental-theorem-algebra,maximum-modulus}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching this domain's established
 * convention for expert/research-tier content (all 3 are expert or
 * research tier).
 *
 * Cross-links: fundamental-theorem-algebra declares math.alg.fundamental-
 * theorem-algebra (confirmed authored — genuine cross-link, the winding-
 * number proof of the same theorem). maximum-modulus declares
 * math.de.harmonic-functions (confirmed authored — genuine cross-link, the
 * real-harmonic maximum principle this concept transports via log|f|).
 * essential-singularity declares no cross-link.
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

const ESSENTIAL_SINGULARITY = 'math.cx.essential-singularity'
const FTA = 'math.cx.fundamental-theorem-algebra'
const MAXIMUM_MODULUS = 'math.cx.maximum-modulus'

export const MATHEMATICS_CX_ESSENTIAL_SINGULARITY_FTA_MAX_MODULUS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ESSENTIAL_SINGULARITY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'AN ESSENTIAL SINGULARITY HAS NO LIMIT AT ALL — NEVER |f|→∞ LIKE A POLE: for f(z)=sin(z)/z '
      + 'at z=0: Laurent series 1−z²/6+⋯, NO negative terms — removable. For g(z)=1/z³ at z=0: ONE '
      + 'negative term, |g(z)|→∞ — pole of order 3. For h(z)=e^(1/z) at z=0: Laurent series '
      + 'Σ(n=0 to ∞) 1/(n!·zⁿ) has INFINITELY many nonzero negative terms, and h has NO limit as '
      + 'z→0 (along the positive real axis h→∞; along the negative real axis h→0) — essential. '
      + 'Believing a function with an essential singularity can satisfy |f(z)|→∞ as z→z₀ is WRONG '
      + '— that controlled blow-up is a pole\'s signature; an essential singularity has no limit '
      + 'whatsoever, finite or infinite.\n\n'
      + 'CASORATI-WEIERSTRASS GUARANTEES A DENSE IMAGE — NEVER SURJECTIVITY: for h(z)=e^(1/z) near '
      + 'z=0: for w=5, solving e^(1/z)=5 gives z=1/(ln5+2πik), clustering at 0 as k→∞ — confirming '
      + 'density. For w=0: taking z=−δ/2 (small negative real), h(z)=e^(−2/δ)→0 as δ→0 — so 0 is in '
      + 'the CLOSURE of the image, even though e^(1/z) NEVER actually equals 0 for any z. Believing '
      + 'Casorati-Weierstrass says the image of a punctured neighborhood is ALL of ℂ (surjective) is '
      + 'WRONG — it says only DENSE; w=0 is approached arbitrarily closely but never achieved, and '
      + 'surjectivity (minus one exception) is a strictly stronger claim requiring Great Picard.\n\n'
      + 'GREAT PICARD IS DRAMATICALLY STRONGER THAN CASORATI-WEIERSTRASS — NEVER THE SAME RESULT '
      + 'RENAMED: for h(z)=e^(1/z): Great Picard guarantees EVERY w≠0 is achieved INFINITELY OFTEN '
      + 'in every punctured neighborhood of 0 (the sole exception being w=0, since eᵘ=0 has no '
      + 'complex solution). This is far beyond density — not "gets close to every value" but '
      + '"achieves nearly every value infinitely many times," proved via normal families, machinery '
      + 'entirely beyond Casorati-Weierstrass\'s simple contradiction argument. Believing Great '
      + 'Picard and Casorati-Weierstrass are equivalent results with different names is WRONG — '
      + 'Great Picard\'s conclusion (infinite exact preimages for all but one value) is strictly '
      + 'stronger than mere density of the image, and requires significantly harder proof '
      + 'machinery.',
    targetedMisconceptions: [`${ESSENTIAL_SINGULARITY}:MC-1`, `${ESSENTIAL_SINGULARITY}:MC-2`, `${ESSENTIAL_SINGULARITY}:MC-3`],
    source: eb(ESSENTIAL_SINGULARITY, 'Core Understanding — an essential singularity having no limit at all never |f| going to infinity like a pole, Casorati-Weierstrass guaranteeing a dense image never surjectivity, and Great Picard being dramatically stronger than Casorati-Weierstrass never the same result renamed'),
  },
  {
    conceptId: FTA, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'FTA ASSERTS AT LEAST ONE ROOT — NEVER DIRECTLY EXACTLY n ROOTS WITHOUT ITERATION: for '
      + 'p(z)=z⁴−1: FTA directly guarantees only ONE root exists. Getting all four requires '
      + 'ITERATING — factor out that root, p(z)=(z−z₁)q(z) with deg q=3, apply FTA again to q, '
      + 'repeat. The concrete factorization p(z)=(z−1)(z+1)(z−i)(z+i) confirms all four roots '
      + '{1,−1,i,−i} emerge only after repeated application. Believing FTA directly asserts n roots '
      + 'without needing this iteration is WRONG — the theorem itself proves existence of ONE root; '
      + 'the full count of n comes from a separate factor-and-reapply argument, not from the '
      + 'theorem\'s statement alone.\n\n'
      + 'THE LIOUVILLE PROOF NEEDS BOTH THE GROWTH ARGUMENT AND LIOUVILLE — NEVER LIOUVILLE ALONE: '
      + 'for p(z)=z²+1, assuming no root exists: f(z)=1/(z²+1) is entire (denominator never '
      + 'vanishes). The GROWTH argument is essential: for |z|≥√2, |z²+1|≥|z|²/2, so '
      + '|f(z)|≤2/|z|²→0 — giving boundedness OUTSIDE a disk; INSIDE the compact disk |z|≤√2, '
      + 'continuity gives boundedness there too. ONLY with both pieces is f bounded entire, and '
      + 'Liouville then forces f constant — contradicting deg p=2≥1. Believing the Liouville proof '
      + 'works over ℝ to show every real polynomial has a real root is WRONG — sin(x) is a bounded, '
      + 'C^∞, non-constant REAL function, so the "bounded entire ⟹ constant" step, valid only in ℂ, '
      + 'has NO real-variable analog; the proof breaks precisely at the Liouville step.\n\n'
      + 'THE LIOUVILLE PROOF AND THE WINDING-NUMBER PROOF ARE GENUINELY DIFFERENT ROUTES — NEVER '
      + 'THE SAME ARGUMENT RENAMED: the Liouville proof uses ANALYTIC rigidity (bounded entire ⟹ '
      + 'constant); the winding-number proof (math.alg.fundamental-theorem-algebra) uses '
      + 'TOPOLOGICAL degree theory (as z traces a large circle, p(z)/|p(z)| winds around the origin '
      + 'exactly n times, forcing a zero inside). Both reach the SAME conclusion via COMPLETELY '
      + 'independent foundational tools — one from complex analysis, one from algebraic topology. '
      + 'Believing the complex-analysis proof is secretly circular, using the same topological '
      + 'facts under a different name, is WRONG — the Liouville proof depends ONLY on Liouville\'s '
      + 'theorem, whose own proof rests on Cauchy\'s inequality, nothing topological at all.',
    targetedMisconceptions: [`${FTA}:MC-1`, `${FTA}:MC-2`, `${FTA}:MC-3`],
    source: eb(FTA, 'Core Understanding — FTA asserting at least one root never directly exactly n roots without iteration, the Liouville proof needing both the growth argument and Liouville never Liouville alone, and the Liouville proof and the winding-number proof being genuinely different routes never the same argument renamed'),
  },
  {
    conceptId: MAXIMUM_MODULUS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'log|f|\'S HARMONICITY TRANSPORTS THE ALREADY-PROVEN MAXIMUM PRINCIPLE — NEVER AN '
      + 'INDEPENDENT PROOF: for f(z)=z² on D={|z|<1} away from z=0: log|f(z)|=2log|z| satisfies '
      + '∇²u=0 — genuinely HARMONIC, since locally f=eᵍ for holomorphic g and log|f|=Re(g), and the '
      + 'real part of any holomorphic function is automatically harmonic. This makes u=log|f| '
      + 'satisfy EXACTLY math.de.harmonic-functions\'s own maximum principle hypotheses, '
      + 'transporting its boundary-only-maximum conclusion DIRECTLY to log|f| and, since log is '
      + 'increasing, to |f| itself. Believing the Maximum Modulus Principle requires an entirely '
      + 'new, independent proof technique specific to complex analysis is WRONG — it follows '
      + 'directly from already-proven real-harmonic-function theory via the log|f| connection.\n\n'
      + 'BOUNDARY VALUES ALONE BOUND |f| EVERYWHERE — NEVER REQUIRING AN INTERIOR CHECK: for '
      + 'f(z)=z²+1 on D={|z|<1}: rather than scanning interior points, checking ONLY the boundary '
      + '|z|=1 (where z=e^(iθ), f(z)=e^(2iθ)+1) gives |f(z)|≤|e^(2iθ)|+1=2, with equality at z=1 — '
      + 'so max over closure of D of |f|=2, found ENTIRELY from boundary values. Believing finding '
      + '|f|\'s maximum over a closed bounded domain requires checking interior points as well as '
      + 'the boundary is WRONG — the theorem GUARANTEES the maximum lives on the boundary, so a '
      + 'boundary-only check is not an approximation but the complete, exact answer.\n\n'
      + 'ANY INTERIOR MAXIMUM FORCES CONSTANCY — NEVER MERELY PERMITTED FOR A NON-CONSTANT '
      + 'FUNCTION: if f is non-constant holomorphic on D and |f| genuinely attained an interior '
      + 'maximum at some z₀∈D, then log|f|=Re(g) would attain an interior maximum too — and '
      + 'math.de.harmonic-functions\'s maximum principle (via its mean-value-property proof) forces '
      + 'a harmonic function attaining an INTERIOR maximum to be CONSTANT, which forces f constant, '
      + 'contradicting the non-constant hypothesis. For f(z)=5 (genuinely constant): |f|=5 '
      + 'EVERYWHERE, consistent with the theorem\'s exception. Believing a non-constant holomorphic '
      + 'function\'s |f| could attain a non-strict interior maximum (merely tied with the boundary '
      + 'value) is WRONG — ANY interior maximum, strict or not, forces f to be constant; there is '
      + 'no non-constant exception.',
    targetedMisconceptions: [`${MAXIMUM_MODULUS}:MC-1`, `${MAXIMUM_MODULUS}:MC-2`, `${MAXIMUM_MODULUS}:MC-3`],
    source: eb(MAXIMUM_MODULUS, 'Core Understanding — log|f|\'s harmonicity transporting the already-proven maximum principle never an independent proof, boundary values alone bounding |f| everywhere never requiring an interior check, and any interior maximum forcing constancy never merely permitted for a non-constant function'),
  },
]

export const MATHEMATICS_CX_ESSENTIAL_SINGULARITY_FTA_MAX_MODULUS_PROBES: SeedProbe[] = [
  {
    conceptId: ESSENTIAL_SINGULARITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'h(z) = e^(1/z) has, at z = 0, a Laurent series with infinitely many nonzero negative-power terms, and h has no limit at all as z → 0 (it tends to ∞ along the positive real axis but to 0 along the negative real axis). What kind of singularity is this?',
    choices: [
      { text: 'A pole, since |h(z)| grows without bound along part of the approach', isCorrect: false, misconceptionId: `${ESSENTIAL_SINGULARITY}:MC-1` },
      { text: 'An essential singularity — h has no limit whatsoever, finite or infinite, unlike a pole where |f| tends to infinity in a controlled way', isCorrect: true },
      { text: 'A removable singularity, since h is bounded along some directions', isCorrect: false },
      { text: 'Not a singularity at all, since h is defined and finite along the negative real axis', isCorrect: false },
    ],
    targetedMisconceptions: [`${ESSENTIAL_SINGULARITY}:MC-1`],
    source: eb(ESSENTIAL_SINGULARITY, 'Demonstration 1 — the sin(z)/z-versus-1/z³-versus-e^(1/z) three-way classification'),
  },
  {
    conceptId: ESSENTIAL_SINGULARITY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Casorati-Weierstrass guarantees that, for h(z) = e^(1/z) near z = 0, the value w = 0 lies in the closure of the image of every punctured neighborhood of 0 — yet e^(1/z) never actually equals 0 for any z. What does this tell you about what Casorati-Weierstrass actually guarantees?',
    choices: [
      { text: 'It guarantees the image is dense (gets arbitrarily close to every value), never that every value is actually achieved (surjectivity)', isCorrect: true },
      { text: 'It guarantees the image is all of ℂ, so w = 0 actually is achieved somewhere in every punctured neighborhood', isCorrect: false, misconceptionId: `${ESSENTIAL_SINGULARITY}:MC-2` },
      { text: 'It is contradicted by e^(1/z), since 0 should be attained but is not', isCorrect: false },
      { text: 'It only applies to bounded functions, so it says nothing about e^(1/z)', isCorrect: false },
    ],
    targetedMisconceptions: [`${ESSENTIAL_SINGULARITY}:MC-2`],
    source: eb(ESSENTIAL_SINGULARITY, 'Demonstration 2 — the e^(1/z) density-without-achievement computation at w=0'),
  },
  {
    conceptId: ESSENTIAL_SINGULARITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How does the Great Picard theorem\'s conclusion about h(z) = e^(1/z) near z = 0 compare in strength to what Casorati-Weierstrass alone concludes?',
    choices: [
      { text: 'Great Picard is dramatically stronger: every value except w = 0 is achieved infinitely often in every punctured neighborhood, not merely approached (density)', isCorrect: true },
      { text: 'They are the same result under different names, both just saying the image is dense near the singularity', isCorrect: false, misconceptionId: `${ESSENTIAL_SINGULARITY}:MC-3` },
      { text: 'Casorati-Weierstrass is stronger, since it applies to a larger class of functions', isCorrect: false },
      { text: 'Neither says anything about how often a value is achieved, only whether it is achieved at all', isCorrect: false },
    ],
    targetedMisconceptions: [`${ESSENTIAL_SINGULARITY}:MC-3`],
    source: eb(ESSENTIAL_SINGULARITY, 'Demonstration 3 — the Great-Picard-versus-Casorati-Weierstrass strength contrast for e^(1/z)'),
  },
  {
    conceptId: FTA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For p(z) = z⁴ − 1, the Fundamental Theorem of Algebra is applied once. What does it directly guarantee, and how do you get all four roots {1, −1, i, −i}?',
    choices: [
      { text: 'It directly guarantees all four roots at once, since deg p = 4', isCorrect: false, misconceptionId: `${FTA}:MC-1` },
      { text: 'It guarantees only that at least one root exists; getting all four requires factoring out each root found and reapplying FTA to the remaining lower-degree factor', isCorrect: true },
      { text: 'It guarantees no roots exist unless the polynomial is explicitly factored first', isCorrect: false },
      { text: 'It guarantees exactly one root exists in total, contradicting the fact that z⁴ − 1 has four roots', isCorrect: false },
    ],
    targetedMisconceptions: [`${FTA}:MC-1`],
    source: eb(FTA, 'Demonstration 1 — the z⁴-1 factor-and-reapply iteration to all four roots'),
  },
  {
    conceptId: FTA, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'The Liouville-based proof of FTA shows f(z) = 1/(z²+1) is bounded and entire (assuming z² + 1 has no root), then applies Liouville\'s theorem to force f constant, a contradiction. Why does this exact strategy fail to prove every real polynomial has a real root?',
    choices: [
      { text: 'Because the growth argument (boundedness) already fails over ℝ, so f is never bounded in the real case', isCorrect: false },
      { text: 'Because Liouville\'s theorem itself (bounded entire ⟹ constant) has no real-variable analog — sin(x) is a bounded, non-constant, C^∞ real function, so the proof breaks specifically at that step', isCorrect: true },
      { text: 'The strategy does work over ℝ; every real polynomial does have a real root by this same argument', isCorrect: false, misconceptionId: `${FTA}:MC-2` },
      { text: 'Because real polynomials cannot be written in the form 1/(z²+1)', isCorrect: false },
    ],
    targetedMisconceptions: [`${FTA}:MC-2`],
    source: eb(FTA, 'Demonstration 2 — the z²+1 full Liouville proof, and why it fails over the reals'),
  },
  {
    conceptId: FTA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'FTA has two well-known proofs: the Liouville-based complex-analysis proof, and the winding-number proof (math.alg.fundamental-theorem-algebra) using topological degree theory. Are these the same argument in different notation?',
    choices: [
      { text: 'Yes — both ultimately rely on counting how many times a curve winds around the origin', isCorrect: false, misconceptionId: `${FTA}:MC-3` },
      { text: 'No — they are genuinely independent proofs: the Liouville proof rests entirely on analytic rigidity (bounded entire implies constant) via Cauchy\'s inequality, with nothing topological, while the winding-number proof rests on topological degree theory', isCorrect: true },
      { text: 'No, because only one of the two proofs is actually valid', isCorrect: false },
      { text: 'Yes, since both proofs conclude that a degree-n polynomial has a root, so they must share the same underlying mechanism', isCorrect: false },
    ],
    targetedMisconceptions: [`${FTA}:MC-3`],
    source: eb(FTA, 'Demonstration 3 — the analytic-rigidity-versus-winding-number contrast'),
  },
  {
    conceptId: MAXIMUM_MODULUS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For f(z) = z² away from z = 0, log|f(z)| = 2log|z| turns out to be harmonic (satisfies ∇²u = 0). Why does this fact let you apply the Maximum Modulus Principle without a new, independent proof?',
    choices: [
      { text: 'It requires an entirely new proof; harmonicity of log|f| is unrelated to the Maximum Modulus Principle', isCorrect: false, misconceptionId: `${MAXIMUM_MODULUS}:MC-1` },
      { text: 'Because log|f| = Re(g) for a local holomorphic g, and the real part of any holomorphic function is automatically harmonic, so log|f| satisfies exactly the hypotheses of the already-proven real-harmonic maximum principle, which transports directly to |f|', isCorrect: true },
      { text: 'Because log is a bijection, so any property of |f| automatically transfers to log|f| with no further justification needed', isCorrect: false },
      { text: 'Because z² has no singularities, which alone guarantees a maximum modulus principle for any function', isCorrect: false },
    ],
    targetedMisconceptions: [`${MAXIMUM_MODULUS}:MC-1`],
    source: eb(MAXIMUM_MODULUS, 'Demonstration 1 — the z² direct harmonicity verification of log|f|'),
  },
  {
    conceptId: MAXIMUM_MODULUS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'To find the maximum of |f(z)| = |z² + 1| over the closed disk |z| ≤ 1, checking only the boundary |z| = 1 gives a maximum value of 2. Do you also need to check interior points to be sure this is the true overall maximum?',
    choices: [
      { text: 'Yes — interior critical points must always be checked too, just as in ordinary real-valued optimization', isCorrect: false, misconceptionId: `${MAXIMUM_MODULUS}:MC-2` },
      { text: 'No — the Maximum Modulus Principle guarantees the maximum of |f| over a closed bounded domain is attained on the boundary, so the boundary-only check is already the complete, exact answer', isCorrect: true },
      { text: 'No, but only because z² + 1 happens to have no interior critical points for this particular function', isCorrect: false },
      { text: 'Yes, because boundary-only checks only give an upper bound, never the exact maximum', isCorrect: false },
    ],
    targetedMisconceptions: [`${MAXIMUM_MODULUS}:MC-2`],
    source: eb(MAXIMUM_MODULUS, 'Demonstration 2 — the z²+1 boundary-only maximum computation'),
  },
  {
    conceptId: MAXIMUM_MODULUS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Suppose f is holomorphic and non-constant on domain D, and |f| attains a value at an interior point z₀ ∈ D that merely ties the maximum boundary value (not exceeding it). Is this permitted?',
    choices: [
      { text: 'Yes — a non-strict tie at an interior point is a harmless edge case, since |f| never actually exceeds the boundary value', isCorrect: false, misconceptionId: `${MAXIMUM_MODULUS}:MC-3` },
      { text: 'No — any interior maximum of |f|, strict or not, forces f to be constant (via log|f|\'s harmonic maximum principle), contradicting the non-constant hypothesis; only a genuinely constant function like f(z) = 5 is consistent with |f| being constant everywhere', isCorrect: true },
      { text: 'It depends on whether D is bounded or unbounded', isCorrect: false },
      { text: 'Yes, as long as z₀ is not the unique point where the maximum is attained', isCorrect: false },
    ],
    targetedMisconceptions: [`${MAXIMUM_MODULUS}:MC-3`],
    source: eb(MAXIMUM_MODULUS, 'Demonstration 3 — the interior-maximum-forces-constancy argument, contrasted with the genuinely constant f(z)=5 exception'),
  },
]
