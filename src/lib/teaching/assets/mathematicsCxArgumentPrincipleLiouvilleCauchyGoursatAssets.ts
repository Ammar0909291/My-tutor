/**
 * Batch: argument-principle, liouville-theorem, cauchy-goursat (math.cx) —
 * 17/31 -> 20/31.
 *
 * Fresh Phase 0 frontier recompute after residue-theorem,
 * analytic-continuation, and higher-derivatives were authored: 12
 * concepts became simultaneously ready — every one of math.cx's
 * remaining 14 concepts, since these 14 are also exactly Mathematics'
 * remaining 14 concepts overall. This batch prioritizes
 * argument-principle (unlocks rouche-theorem) and liouville-theorem
 * (unlocks fundamental-theorem-algebra), the domain's only two remaining
 * concepts that unlock further concepts, plus cauchy-goursat (a leaf) —
 * deferring essential-singularity, maximum-modulus, mobius-transformation,
 * morera-theorem, poles, real-integral-residues, riemann-mapping,
 * riemann-surface, and riemann-zeta for subsequent batches.
 * Transcribed from their frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.cx.{argument-principle,
 * liouville-theorem,cauchy-goursat}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching this domain's established
 * convention for expert-tier content (all 3 are "expert" tier).
 *
 * None of the 3 declare a KG cross-link.
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

const ARGUMENT_PRINCIPLE = 'math.cx.argument-principle'
const LIOUVILLE_THEOREM = 'math.cx.liouville-theorem'
const CAUCHY_GOURSAT = 'math.cx.cauchy-goursat'

export const MATHEMATICS_CX_ARGUMENT_PRINCIPLE_LIOUVILLE_CAUCHY_GOURSAT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ARGUMENT_PRINCIPLE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE ARGUMENT PRINCIPLE IS DIRECTLY DERIVED FROM THE RESIDUE THEOREM — NEVER AN '
      + 'INDEPENDENT PROOF: for a zero of order m at z₀ (f(z)=(z−z₀)^m·g(z), g(z₀)≠0): '
      + 'f\'(z)/f(z)=m/(z−z₀)+g\'(z)/g(z) — a SIMPLE POLE at z₀ with residue EXACTLY m (the second '
      + 'term is holomorphic there, contributing nothing). Applying the already-mastered Residue '
      + 'Theorem to f\'/f over C sums these residues DIRECTLY, giving Z−P. Believing the Argument '
      + 'Principle is proven by an argument independent of the Residue Theorem is WRONG — it is '
      + 'derived by applying that theorem to the specific function f\'/f, nothing more.\n\n'
      + 'Z AND P COUNT WITH MULTIPLICITY — NEVER BY DISTINCT LOCATION: for f(z)=z³(z−2)² (no '
      + 'poles), C:|z|=3 (enclosing z=0, a zero of order 3, and z=2, a zero of order 2): Z=3+2=5 — '
      + 'NOT 2 (the count of distinct zero locations). The formula correctly gives Z−P=5−0=5. '
      + 'Believing Z counts the number of distinct zero locations rather than summing '
      + 'multiplicities is WRONG — a triple zero contributes 3, not 1; multiplicities must be '
      + 'summed, never merely tallied by location.\n\n'
      + 'Z−P IS THE GEOMETRIC WINDING NUMBER — NEVER A PURELY ABSTRACT ALGEBRAIC COUNT: for '
      + 'f(z)=z on C:|z|=1: f(z)=e^(iθ) traces the unit circle around the origin EXACTLY ONCE — '
      + 'winding number 1, matching Z−P=1−0=1 (one simple zero, no poles). For f(z)=z²: f(z)=e^(2iθ) '
      + 'winds TWICE — winding number 2, matching Z−P=2−0=2 (one zero of order 2). Believing Z−P '
      + 'is a purely abstract algebraic count with no geometric meaning is WRONG — it IS the '
      + 'number of times f(z) winds around the origin as z traverses C, a genuinely visualizable '
      + 'geometric quantity, confirmed exactly in both cases.',
    targetedMisconceptions: [`${ARGUMENT_PRINCIPLE}:MC-1`, `${ARGUMENT_PRINCIPLE}:MC-2`, `${ARGUMENT_PRINCIPLE}:MC-3`],
    source: eb(ARGUMENT_PRINCIPLE, 'Core Understanding — the Argument Principle being directly derived from the Residue Theorem never an independent proof, Z and P counting with multiplicity never by distinct location, and Z-P being the geometric winding number never a purely abstract algebraic count'),
  },
  {
    conceptId: LIOUVILLE_THEOREM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE PROOF IS A SINGLE DECISIVE APPLICATION OF CAUCHY\'S INEQUALITY, LETTING R→∞ — NEVER A '
      + 'NEW TECHNIQUE: for f entire with |f(z)|≤7 everywhere: Cauchy\'s inequality at n=1 gives '
      + '|f\'(z₀)|≤7/R for ANY radius R. At R=100: ≤0.07; at R=10⁹: ≤7×10⁻⁹ — shrinking WITHOUT '
      + 'LIMIT as R grows, and since f is ENTIRE (no singularity anywhere restricts how large R can '
      + 'be), |f\'(z₀)| must be smaller than EVERY positive number, forcing f\'(z₀)=0 EXACTLY. '
      + 'Believing Liouville\'s theorem requires an entirely new, independent proof technique is '
      + 'WRONG — it follows DIRECTLY from Cauchy\'s inequality applied at n=1 with R→∞, nothing '
      + 'more.\n\n'
      + 'THE CONTRAPOSITIVE CERTIFIES UNBOUNDEDNESS IMMEDIATELY — NEVER REQUIRING DIRECT GROWTH '
      + 'ANALYSIS: f(z)=z²+1 is a polynomial (entire) and non-constant (f(0)=1≠5=f(2)). By the '
      + 'CONTRAPOSITIVE (entire + non-constant ⟹ NOT bounded), f must be UNBOUNDED — reached '
      + 'WITHOUT directly analyzing f\'s growth rate (though directly verifiable here too). '
      + 'Believing certifying an entire, non-constant function\'s unboundedness always requires '
      + 'direct growth analysis is WRONG — the theorem\'s contrapositive certifies this '
      + 'IMMEDIATELY, a genuinely useful shortcut even for functions whose growth might be harder '
      + 'to verify directly.\n\n'
      + 'sin(z),cos(z) ARE GENUINELY UNBOUNDED ON C — NEVER A CONTRADICTION TO THE THEOREM: '
      + 'sin(x),cos(x) are bounded on R alone, but as genuine COMPLEX entire functions, '
      + 'sin(iy)=i·sinh(y): at y=10, |sin(10i)|≈11013; at y=20, |sin(20i)|≈2.4×10⁸ — growing '
      + 'EXPONENTIALLY without bound along the imaginary axis. Believing sin(z),cos(z) genuinely '
      + 'contradict Liouville\'s theorem (bounded, non-constant, entire simultaneously) is WRONG — '
      + 'extended to all of C, they are provably UNBOUNDED; the theorem never claimed anything '
      + 'about functions restricted to R alone.',
    targetedMisconceptions: [`${LIOUVILLE_THEOREM}:MC-1`, `${LIOUVILLE_THEOREM}:MC-2`, `${LIOUVILLE_THEOREM}:MC-3`],
    source: eb(LIOUVILLE_THEOREM, 'Core Understanding — the proof being a single decisive application of Cauchy\'s inequality letting R go to infinity never a new technique, the contrapositive certifying unboundedness immediately never requiring direct growth analysis, and sin(z)/cos(z) being genuinely unbounded on C never a contradiction to the theorem'),
  },
  {
    conceptId: CAUCHY_GOURSAT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'CAUCHY-GOURSAT GENUINELY WEAKENS THE CLASSICAL HYPOTHESIS — NEVER ALREADY COVERED: for '
      + 'f(z)=z̄: the Cauchy-Riemann equations FAIL (∂u/∂x=1≠−1=∂v/∂y), so f is NOT holomorphic, '
      + 'and indeed the contour integral of z̄ around the unit circle equals 2πi≠0. Contrast '
      + 'f(z)=z² (holomorphic, complex derivative exists everywhere, with NO continuity assumption '
      + 'on f\' needed): the contour integral of z² equals 0 by Cauchy-Goursat. Believing the '
      + 'classical Cauchy theorem already applies to all holomorphic functions without an extra '
      + 'continuity-of-f\' hypothesis is WRONG — the classical proof (via Green\'s theorem) '
      + 'genuinely REQUIRED f\' continuous; Goursat\'s theorem is a nontrivial strengthening that '
      + 'removes this requirement entirely.\n\n'
      + 'GOURSAT\'S PROOF IS A NESTED-TRIANGLE COMPACTNESS ARGUMENT — NEVER AN ALGEBRAIC '
      + 'CALCULATION: supposing the integral of f over triangle T equals I≠0: subdividing into '
      + 'four subtriangles, one subtriangle T₁ satisfies |integral over T₁|≥|I|/4; iterating gives '
      + 'nested T₁⊃T₂⊃⋯ with |integral over Tₙ|≥|I|/4ⁿ, converging (by COMPACTNESS) to a point z₀. '
      + 'At z₀, ONLY the existence of f\'(z₀) (not its continuity) gives a local linear '
      + 'approximation whose integral error shrinks FASTER than |I|/4ⁿ — a genuine contradiction. '
      + 'Believing Goursat\'s proof is an algebraic manipulation like the classical Green\'s-theorem '
      + 'proof is WRONG — it is a compactness and estimation argument built entirely from nested '
      + 'triangles and a single pointwise derivative.\n\n'
      + 'HOLOMORPHIC AND ANALYTIC GENUINELY COLLAPSE INTO ONE PROPERTY — NEVER SEPARATE '
      + 'REQUIREMENTS: for f(z)=e^z: it is holomorphic (f\'(z)=e^z exists everywhere), analytic '
      + '(its Taylor series Σzⁿ/n! converges to it everywhere), and satisfies a zero contour '
      + 'integral for every closed curve. These are not three separately-verified facts happening '
      + 'to coincide for e^z — Cauchy-Goursat closes the chain (holomorphic ⟹ Cauchy integral '
      + 'formula ⟹ Taylor series) making them EQUIVALENT for EVERY function on a simply connected '
      + 'domain. Believing holomorphic and analytic are different classes of complex functions '
      + 'requiring separate assumptions is WRONG — in C they are provably the SAME property, a '
      + 'collapse with NO real-analysis analog (differentiable does not imply C^∞ in R).',
    targetedMisconceptions: [`${CAUCHY_GOURSAT}:MC-1`, `${CAUCHY_GOURSAT}:MC-2`, `${CAUCHY_GOURSAT}:MC-3`],
    source: eb(CAUCHY_GOURSAT, 'Core Understanding — Cauchy-Goursat genuinely weakening the classical hypothesis never already covered, Goursat\'s proof being a nested-triangle compactness argument never an algebraic calculation, and holomorphic and analytic genuinely collapsing into one property never separate requirements'),
  },
]

export const MATHEMATICS_CX_ARGUMENT_PRINCIPLE_LIOUVILLE_CAUCHY_GOURSAT_PROBES: SeedProbe[] = [
  // ARGUMENT_PRINCIPLE
  {
    conceptId: ARGUMENT_PRINCIPLE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the Argument Principle an independent theorem, proven by an argument separate from the Residue Theorem?',
    choices: [
      { text: "No — for a zero of order m at z0, f'(z)/f(z) has a simple pole at z0 with residue exactly m; applying the already-mastered Residue Theorem to f'/f over C sums these residues directly to give Z-P, so the Argument Principle is derived by applying the Residue Theorem to f'/f, nothing more", isCorrect: true },
      { text: "Yes, the Argument Principle is proven by an argument independent of the Residue Theorem", isCorrect: false, misconceptionId: `${ARGUMENT_PRINCIPLE}:MC-1` },
      { text: "Since the Argument Principle is a named principle with its own formula, it should be treated as a self-contained new theorem rather than a specific application of an already-known theorem", isCorrect: false, misconceptionId: `${ARGUMENT_PRINCIPLE}:MC-1` },
    ],
    targetedMisconceptions: [`${ARGUMENT_PRINCIPLE}:MC-1`],
    source: eb(ARGUMENT_PRINCIPLE, 'Discovery Question 1 as a detection probe (verbatim) — whether the Argument Principle is proven independently of the Residue Theorem, an answer of "yes" confirming ARGUMENT-PRINCIPLE-AS-INDEPENDENT-THEOREM'),
  },
  {
    conceptId: ARGUMENT_PRINCIPLE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does Z in the Argument Principle count the number of distinct zero locations, or does it sum multiplicities?',
    choices: [
      { text: "It sums multiplicities — for f(z)=z^3(z-2)^2 with C:|z|=3 (enclosing z=0, a zero of order 3, and z=2, a zero of order 2), Z=3+2=5, NOT 2 (the count of distinct zero locations); a triple zero contributes 3, not 1", isCorrect: true },
      { text: "Z counts the number of distinct zero locations rather than summing multiplicities", isCorrect: false, misconceptionId: `${ARGUMENT_PRINCIPLE}:MC-2` },
      { text: "Since 'counting zeros' intuitively suggests counting distinct points, Z should be computed by tallying how many different locations have a zero, not by summing their orders", isCorrect: false, misconceptionId: `${ARGUMENT_PRINCIPLE}:MC-2` },
    ],
    targetedMisconceptions: [`${ARGUMENT_PRINCIPLE}:MC-2`],
    source: eb(ARGUMENT_PRINCIPLE, 'Discovery Question 2 as a detection probe (verbatim) — whether Z counts distinct locations or sums multiplicities, an answer counting distinct locations confirming ZEROS-POLES-COUNTED-BY-LOCATION-NOT-MULTIPLICITY'),
  },
  {
    conceptId: ARGUMENT_PRINCIPLE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is Z−P a purely abstract algebraic count with no geometric meaning, or does it have a visualizable interpretation?',
    choices: [
      { text: "It has a visualizable interpretation — for f(z)=z on C:|z|=1, f traces the unit circle exactly once (winding number 1, matching Z-P=1); for f(z)=z^2, f winds twice (winding number 2, matching Z-P=2). Z-P IS the number of times f(z) winds around the origin as z traverses C", isCorrect: true },
      { text: "Z-P is a purely abstract algebraic count with no geometric meaning", isCorrect: false, misconceptionId: `${ARGUMENT_PRINCIPLE}:MC-3` },
      { text: "Since the formula for Z-P is derived algebraically from residues, it should be treated as a pure bookkeeping quantity with no independently verifiable geometric picture", isCorrect: false, misconceptionId: `${ARGUMENT_PRINCIPLE}:MC-3` },
    ],
    targetedMisconceptions: [`${ARGUMENT_PRINCIPLE}:MC-3`],
    source: eb(ARGUMENT_PRINCIPLE, 'Discovery Question 3 as a detection probe (verbatim) — whether Z-P is purely abstract or has geometric meaning, an answer treating it as purely abstract confirming Z-MINUS-P-TREATED-AS-PURELY-ABSTRACT'),
  },
  // LIOUVILLE_THEOREM
  {
    conceptId: LIOUVILLE_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does Liouville\'s theorem require an entirely new, independent proof technique, or does it follow directly from Cauchy\'s inequality?',
    choices: [
      { text: "It follows directly from Cauchy's inequality — for f entire with |f(z)| less than or equal to 7 everywhere, Cauchy's inequality at n=1 gives |f'(z0)| less than or equal to 7/R for any radius R; since f is entire, R can grow without limit, forcing |f'(z0)| below every positive number, so f'(z0)=0 exactly", isCorrect: true },
      { text: "Liouville's theorem requires an entirely new, independent proof technique", isCorrect: false, misconceptionId: `${LIOUVILLE_THEOREM}:MC-1` },
      { text: "Since Liouville's theorem is a famous named result, it should be expected to need its own dedicated proof machinery rather than following from an already-established inequality", isCorrect: false, misconceptionId: `${LIOUVILLE_THEOREM}:MC-1` },
    ],
    targetedMisconceptions: [`${LIOUVILLE_THEOREM}:MC-1`],
    source: eb(LIOUVILLE_THEOREM, 'Discovery Question 1 as a detection probe (verbatim) — whether Liouville\'s theorem needs a new proof technique or follows from Cauchy\'s inequality, an answer requiring a new technique confirming LIOUVILLE-PROOF-ASSUMED-ENTIRELY-NEW-TECHNIQUE'),
  },
  {
    conceptId: LIOUVILLE_THEOREM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'To conclude a specific entire, non-constant function is unbounded, is direct growth analysis always necessary?',
    choices: [
      { text: "No — f(z)=z^2+1 is a polynomial (entire) and non-constant; by the contrapositive of Liouville's theorem (entire plus non-constant implies not bounded), f must be unbounded, reached without directly analyzing f's growth rate, a genuinely useful shortcut", isCorrect: true },
      { text: "Yes, certifying an entire, non-constant function's unboundedness always requires direct growth analysis", isCorrect: false, misconceptionId: `${LIOUVILLE_THEOREM}:MC-2` },
      { text: "Since the theorem is usually taught in its forward direction (bounded and entire implies constant), unboundedness of a specific function should be expected to require its own separate growth analysis", isCorrect: false, misconceptionId: `${LIOUVILLE_THEOREM}:MC-2` },
    ],
    targetedMisconceptions: [`${LIOUVILLE_THEOREM}:MC-2`],
    source: eb(LIOUVILLE_THEOREM, 'Discovery Question 2 as a detection probe (verbatim) — whether unboundedness always needs direct growth analysis, an answer of "yes" confirming UNBOUNDEDNESS-ASSUMED-TO-NEED-DIRECT-GROWTH-ANALYSIS'),
  },
  {
    conceptId: LIOUVILLE_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Do sin(z) and cos(z), properly understood on the whole complex plane, genuinely contradict Liouville\'s theorem?',
    choices: [
      { text: "No — sin(x), cos(x) are bounded on R alone, but as genuine complex entire functions, sin(iy)=i*sinh(y) grows exponentially without bound along the imaginary axis (for example |sin(20i)| is roughly 2.4x10^8); extended to all of C, sin and cos are provably unbounded, consistent with the theorem", isCorrect: true },
      { text: "Yes, sin(z) and cos(z) genuinely contradict Liouville's theorem since they are bounded, non-constant, and entire simultaneously", isCorrect: false, misconceptionId: `${LIOUVILLE_THEOREM}:MC-3` },
      { text: "Since sin(x) and cos(x) are familiar as bounded real trigonometric functions, that boundedness should be expected to carry over unchanged once the functions are extended to the complex plane", isCorrect: false, misconceptionId: `${LIOUVILLE_THEOREM}:MC-3` },
    ],
    targetedMisconceptions: [`${LIOUVILLE_THEOREM}:MC-3`],
    source: eb(LIOUVILLE_THEOREM, 'Discovery Question 3 as a detection probe (verbatim) — whether sin(z)/cos(z) genuinely contradict Liouville\'s theorem, an answer of "yes" confirming SIN-COS-ASSUMED-TO-GENUINELY-CONTRADICT-THEOREM'),
  },
  // CAUCHY_GOURSAT
  {
    conceptId: CAUCHY_GOURSAT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does the classical Cauchy theorem already apply to all holomorphic functions, or does it require the extra assumption that f′ is continuous?',
    choices: [
      { text: "The classical theorem requires the extra assumption that f' is continuous — its proof (via Green's theorem) genuinely relies on that continuity; Goursat's theorem is a nontrivial strengthening that removes this requirement entirely, needing only the existence of f' everywhere", isCorrect: true },
      { text: "The classical Cauchy theorem already applies to all holomorphic functions without needing an extra continuity-of-f' assumption", isCorrect: false, misconceptionId: `${CAUCHY_GOURSAT}:MC-1` },
      { text: "Since Goursat's stronger result is now known, it's reasonable to assume the classical theorem's extra continuity hypothesis was never actually necessary in the first place", isCorrect: false, misconceptionId: `${CAUCHY_GOURSAT}:MC-1` },
    ],
    targetedMisconceptions: [`${CAUCHY_GOURSAT}:MC-1`],
    source: eb(CAUCHY_GOURSAT, 'Discovery Question 1 as a detection probe (verbatim) — whether the classical Cauchy theorem already requires no continuity of f\', an answer of "yes" confirming CLASSICAL-CAUCHY-ALREADY-REQUIRES-NO-CONTINUITY'),
  },
  {
    conceptId: CAUCHY_GOURSAT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is Goursat\'s proof an algebraic calculation, or does it rely on a compactness argument using nested triangles?',
    choices: [
      { text: "It relies on a compactness argument using nested triangles — subdividing a triangle repeatedly gives nested subtriangles converging by compactness to a single point z0, where only the existence of f'(z0) gives a local approximation whose error shrinks faster than the lower bound, a genuine contradiction", isCorrect: true },
      { text: "Goursat's proof is an algebraic manipulation like the classical Green's-theorem proof", isCorrect: false, misconceptionId: `${CAUCHY_GOURSAT}:MC-3` },
      { text: "Since the classical Cauchy theorem's own proof is algebraic and Green's-theorem-based, Goursat's proof of a related but stronger result should be assumed to follow a similar algebraic approach", isCorrect: false, misconceptionId: `${CAUCHY_GOURSAT}:MC-3` },
    ],
    targetedMisconceptions: [`${CAUCHY_GOURSAT}:MC-3`],
    source: eb(CAUCHY_GOURSAT, 'Discovery Question 2 as a detection probe (verbatim) — whether Goursat\'s proof is algebraic or a compactness argument, an answer treating it as algebraic confirming GOURSAT-PROOF-IS-ALGEBRAIC'),
  },
  {
    conceptId: CAUCHY_GOURSAT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'In complex analysis, does holomorphic automatically imply analytic, or is analyticity a separate, stronger property?',
    choices: [
      { text: "Holomorphic automatically implies analytic — for f(z)=e^z, being holomorphic, having a convergent Taylor series everywhere, and integrating to zero on every closed curve are not three separately-verified facts; Cauchy-Goursat closes the chain making these EQUIVALENT for every function on a simply connected domain", isCorrect: true },
      { text: "Holomorphic and analytic are different classes of complex functions requiring separate assumptions", isCorrect: false, misconceptionId: `${CAUCHY_GOURSAT}:MC-2` },
      { text: "Since in real analysis differentiable does not imply C-infinity, that same gap should be expected to hold between holomorphic and analytic in complex analysis", isCorrect: false, misconceptionId: `${CAUCHY_GOURSAT}:MC-2` },
    ],
    targetedMisconceptions: [`${CAUCHY_GOURSAT}:MC-2`],
    source: eb(CAUCHY_GOURSAT, 'Discovery Question 3 as a detection probe (verbatim) — whether holomorphic automatically implies analytic, an answer treating them as separate confirming HOLOMORPHIC-AND-ANALYTIC-ARE-DIFFERENT-CLASSES'),
  },
]
