/**
 * Batch: mobius-transformation, morera-theorem, poles (math.cx) — 23/31 ->
 * 26/31.
 *
 * Continuing through math.cx's final 11 concepts, all of which became
 * simultaneously ready in the same frontier recompute that fed the
 * essential-singularity/fundamental-theorem-algebra/maximum-modulus batch,
 * and none of which unlocks anything else still missing anywhere in the
 * 908-concept KG. Note: poles's own KG "unlocks" field names
 * math.cx.residue-theorem, but residue-theorem was already authored earlier
 * this campaign (before poles) — a harmless unlocks-field asymmetry of the
 * same kind already documented for math.top.homeomorphism/manifold; nothing
 * to fix, since asset authoring order is this campaign's own convention, not
 * a runtime constraint the KG enforces. Transcribed from their frozen
 * Educational Brain entries at educational-brain/concepts/mathematics/
 * math.cx.{mobius-transformation,morera-theorem,poles}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching this domain's established
 * convention for expert-tier content (all 3 are expert tier).
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

const MOBIUS_TRANSFORMATION = 'math.cx.mobius-transformation'
const MORERA_THEOREM = 'math.cx.morera-theorem'
const POLES = 'math.cx.poles'

export const MATHEMATICS_CX_MOBIUS_MORERA_POLES_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MOBIUS_TRANSFORMATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'COMPOSITION IS DIRECT MATRIX MULTIPLICATION — NEVER LACKING A SYSTEMATIC FORMULA: for '
      + 'f(z)=(z+1)/(z−1) and g(z)=2z/(z+3): computing (g∘f)(z) algebraically gives (z+1)/(2z−1). '
      + 'The MATRIX product [[2,0],[1,3]]·[[1,1],[1,−1]] = [[2,2],[4,−2]] gives EXACTLY the same '
      + 'transformation (2z+2)/(4z−2)=(z+1)/(2z−1). Believing there is no systematic algebraic '
      + 'formula for composing Möbius transformations is WRONG — the matrix-multiplication '
      + 'correspondence makes composition a direct, mechanical 2×2 matrix product, faster and less '
      + 'error-prone than algebraic substitution.\n\n'
      + 'EXACTLY THREE PRESCRIBED POINTS DETERMINE THE TRANSFORMATION — NEVER TWO OR FOUR: a '
      + 'Möbius transformation (a:b:c:d) modulo scalar has exactly 3 complex degrees of freedom; '
      + 'each point condition f(zᵢ)=wᵢ imposes exactly ONE complex constraint. For f(0)=1, f(1)=0, '
      + 'f(∞)=∞: solving directly gives the UNIQUE transformation f(z)=1−z. Believing a Möbius '
      + 'transformation is determined by two points (underdetermined) or requires four points '
      + '(overdetermined) is WRONG — exactly three free parameters require exactly three prescribed '
      + 'image points to pin down a unique transformation, no more and no less.\n\n'
      + 'CIRCLE-AND-LINE PRESERVATION COVERS BOTH AS GENERALIZED CIRCLES — NEVER CIRCLES ONLY: for '
      + 'f(z)=(z−i)/(z+i) applied to the unit circle |z|=1: three points 1,−1,i map to −i,i,0 — all '
      + 'lying on the IMAGINARY AXIS (a LINE, not a circle). Believing circle-and-line preservation '
      + 'means Möbius transformations always send circles to circles (never lines) is WRONG — on '
      + 'the Riemann sphere, lines ARE "circles through ∞"; the theorem is symmetric between '
      + 'circles and lines, and a circle can genuinely map to a line, as here.',
    targetedMisconceptions: [`${MOBIUS_TRANSFORMATION}:MC-1`, `${MOBIUS_TRANSFORMATION}:MC-2`, `${MOBIUS_TRANSFORMATION}:MC-3`],
    source: eb(MOBIUS_TRANSFORMATION, 'Core Understanding — composition being direct matrix multiplication never lacking a systematic formula, exactly three prescribed points determining the transformation never two or four, and circle-and-line preservation covering both as generalized circles never circles only'),
  },
  {
    conceptId: MORERA_THEOREM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'MORERA\'S THEOREM REQUIRES ONLY EVERY TRIANGLE, NEVER EVERY CLOSED CONTOUR: for f continuous '
      + 'on domain D, the hypothesis is the contour integral of f over T equals 0 for EVERY triangle '
      + 'T⊂D — a dramatically WEAKER requirement than checking every possible closed contour '
      + '(circles, arbitrary polygons, self-intersecting loops). Once holomorphicity is established '
      + 'from the triangle-only hypothesis, Cauchy\'s theorem THEN guarantees vanishing over every '
      + 'closed contour — but that conclusion is NEVER part of Morera\'s own hypothesis. Believing '
      + 'Morera\'s theorem requires checking vanishing integrals over every closed contour to apply '
      + 'is WRONG — checking triangles alone suffices, a dramatically smaller and more tractable '
      + 'family.\n\n'
      + 'UNIFORM LIMITS OF HOLOMORPHIC FUNCTIONS ARE HOLOMORPHIC — NEVER OBVIOUS BY REAL-ANALYSIS '
      + 'ANALOGY: in real analysis, gₙ(x)=|x|^(1+1/n) is differentiable everywhere and converges '
      + 'UNIFORMLY to |x| — which is NOT differentiable at x=0. This REAL counterexample shows '
      + 'uniform limits of differentiable functions need NOT be differentiable. Yet in ℂ, Morera\'s '
      + 'theorem makes the analogous claim TRUE: each gₙ has a vanishing triangle integral (Cauchy\'s '
      + 'theorem, gₙ holomorphic), and uniform convergence lets the limit pass through the integral, '
      + 'giving a vanishing triangle integral for the limit g too — so Morera certifies g=lim gₙ is '
      + 'holomorphic. Believing this complex-analysis closure fact is obvious by analogy with real '
      + 'analysis is WRONG — the real-variable analogue is FALSE, making the complex result a '
      + 'genuine, nontrivial payoff of Morera\'s theorem specifically.\n\n'
      + 'MORERA\'S PROOF MECHANISM IS A PATH-INDEPENDENT ANTIDERIVATIVE, NEVER DIRECT DERIVATIVE '
      + 'COMPUTATION: the triangle-vanishing hypothesis makes F(z)=∫(z₀ to z) f(w)dw well-defined '
      + '(path-independent, since any two paths bound a triangle-decomposable region with vanishing '
      + 'integral), and direct differentiation gives F′=f EVERYWHERE. Since F is holomorphic with '
      + 'F′=f, and holomorphic functions are automatically C^∞ (their derivatives holomorphic too, '
      + 'by the higher-derivatives formula), f=F′ is ITSELF holomorphic — reached WITHOUT ever '
      + 'directly computing or estimating f′ from a difference quotient. Believing Morera\'s '
      + 'theorem\'s proof proceeds via some direct computation of f\'s derivative is WRONG — it '
      + 'constructs an antiderivative F first and inherits f\'s holomorphicity from F\'s automatic '
      + 'infinite differentiability.',
    targetedMisconceptions: [`${MORERA_THEOREM}:MC-1`, `${MORERA_THEOREM}:MC-2`, `${MORERA_THEOREM}:MC-3`],
    source: eb(MORERA_THEOREM, 'Core Understanding — Morera\'s theorem requiring only every triangle never every closed contour, uniform limits of holomorphic functions being holomorphic never obvious by real-analysis analogy, and Morera\'s proof mechanism being a path-independent antiderivative never direct derivative computation'),
  },
  {
    conceptId: POLES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'POLE ORDER IS THE UNIQUE n THREADING BETWEEN TOO-SMALL AND TOO-LARGE — NEVER MULTIPLE VALID '
      + 'n: for f(z)=1/(z−2)³ at z₀=2: testing n=2: (z−2)²f(z)=1/(z−2) — STILL unbounded, too small. '
      + 'Testing n=3: (z−2)³f(z)=1 — holomorphic AND nonzero (=1≠0) — CORRECT. Testing n=4: '
      + '(z−2)⁴f(z)=(z−2) — holomorphic but EQUALS ZERO at z=2 — over-cancels, too large. Believing '
      + 'multiple values of n could equally satisfy the "holomorphic and nonzero" test is WRONG — '
      + 'exactly ONE n threads between the too-small failure (still unbounded) and the too-large '
      + 'failure (holomorphic but zero).\n\n'
      + 'MEROMORPHICITY REQUIRES EXPLICITLY CHECKING EVERY SINGULARITY — NEVER ASSUMED FROM GENERAL '
      + 'GOOD BEHAVIOR: for f(z)=e^z/(z²(z−1)): at z=0, testing z²f(z)=e^z/(z−1) — holomorphic and '
      + 'nonzero at z=0 (=−1≠0) — a pole of order 2. At z=1, testing (z−1)f(z)=e^z/z² — holomorphic '
      + 'and nonzero at z=1 (=e≠0) — a pole of order 1. BOTH singularities are EXPLICITLY confirmed '
      + 'as poles (never essential), qualifying f as meromorphic. Believing confirming '
      + 'meromorphicity does not require explicitly checking every individual singularity against '
      + 'the pole-versus-essential classification is WRONG — meromorphicity is confirmed by '
      + 'checking EVERY singularity, one at a time, never assumed from a vague impression of '
      + 'well-behavedness.\n\n'
      + 'THE RATIONAL-FUNCTION CLASSIFICATION IS A NONTRIVIAL STRUCTURAL THEOREM — NEVER AN OBVIOUS '
      + 'RESTATEMENT: for f(z)=(z²+1)/((z−1)(z+2)²): poles at z=1 (order 1) and z=−2 (order 2), '
      + 'directly readable from the factorization. This CONFIRMS the expected direction (rational '
      + '⟹ meromorphic with matching poles) — but the deeper CONVERSE claim — that ANY function '
      + 'globally meromorphic on ℂ with tame behavior at infinity MUST be rational — is the '
      + 'genuinely powerful content. Believing this classification is a fairly obvious, expected '
      + 'fact rather than a genuinely nontrivial structural theorem is WRONG — an apparently much '
      + 'BROADER analytic class (globally meromorphic with tame infinity behavior) collapses '
      + 'EXACTLY to the purely algebraic class of rational functions, no more and no less.',
    targetedMisconceptions: [`${POLES}:MC-1`, `${POLES}:MC-2`, `${POLES}:MC-3`],
    source: eb(POLES, 'Core Understanding — pole order being the unique n threading between too-small and too-large never multiple valid n, meromorphicity requiring explicitly checking every singularity never assumed from general good behavior, and the rational-function classification being a nontrivial structural theorem never an obvious restatement'),
  },
]

export const MATHEMATICS_CX_MOBIUS_MORERA_POLES_PROBES: SeedProbe[] = [
  {
    conceptId: MOBIUS_TRANSFORMATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'To compose two Möbius transformations f and g, is there a systematic algebraic formula, or must you always substitute f into g by hand and simplify?',
    choices: [
      { text: 'There is no systematic formula; each composition must be worked out by algebraic substitution from scratch', isCorrect: false, misconceptionId: `${MOBIUS_TRANSFORMATION}:MC-1` },
      { text: 'Yes — each Möbius transformation corresponds to a 2×2 matrix, and composing the transformations corresponds exactly to multiplying their matrices', isCorrect: true },
      { text: 'Composition of Möbius transformations is not generally another Möbius transformation', isCorrect: false },
      { text: 'A systematic formula exists only when both transformations have real coefficients', isCorrect: false },
    ],
    targetedMisconceptions: [`${MOBIUS_TRANSFORMATION}:MC-1`],
    source: eb(MOBIUS_TRANSFORMATION, 'Demonstration 1 — the algebraic-versus-matrix-multiplication composition match'),
  },
  {
    conceptId: MOBIUS_TRANSFORMATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You are told f(0) = 1, f(1) = 0, and f(∞) = ∞ for a Möbius transformation f. Is this enough information to determine f uniquely, or do you need a fourth point?',
    choices: [
      { text: 'This is enough — a Möbius transformation has exactly 3 complex degrees of freedom, so exactly 3 point conditions pin it down uniquely (here, f(z) = 1 − z)', isCorrect: true },
      { text: 'A fourth point condition is needed, since 3 points leave the transformation underdetermined', isCorrect: false, misconceptionId: `${MOBIUS_TRANSFORMATION}:MC-2` },
      { text: 'Only 2 of the 3 conditions are actually independent, so this over-determines f and may be inconsistent', isCorrect: false },
      { text: 'Möbius transformations cannot be determined by point conditions at all, only by their coefficients directly', isCorrect: false },
    ],
    targetedMisconceptions: [`${MOBIUS_TRANSFORMATION}:MC-2`],
    source: eb(MOBIUS_TRANSFORMATION, 'Demonstration 2 — the three-point-normalization derivation of f(z)=1-z'),
  },
  {
    conceptId: MOBIUS_TRANSFORMATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Applying f(z) = (z − i)/(z + i) to the unit circle |z| = 1 sends the points 1, −1, i to −i, i, 0 respectively — all lying on the imaginary axis, a line rather than a circle. What does this tell you about the "circle-and-line preservation" property of Möbius transformations?',
    choices: [
      { text: 'This is a counterexample: Möbius transformations do NOT always preserve circles, since a circle mapped to a line here', isCorrect: false },
      { text: 'On the Riemann sphere, lines are "circles through infinity," so the theorem is genuinely symmetric between circles and lines — a circle mapping to a line is expected behavior, not an exception', isCorrect: true },
      { text: 'This shows circle preservation only holds for circles centered at the origin', isCorrect: false, misconceptionId: `${MOBIUS_TRANSFORMATION}:MC-3` },
      { text: 'This shows the transformation f is not actually a valid Möbius transformation', isCorrect: false },
    ],
    targetedMisconceptions: [`${MOBIUS_TRANSFORMATION}:MC-3`],
    source: eb(MOBIUS_TRANSFORMATION, 'Demonstration 3 — the unit-circle-to-imaginary-axis Cayley-map computation'),
  },
  {
    conceptId: MORERA_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'To apply Morera\'s theorem to certify that a continuous function f is holomorphic, what must you check the contour integral of f vanishes over?',
    choices: [
      { text: 'Every possible closed contour in the domain, including circles and arbitrary polygons', isCorrect: false, misconceptionId: `${MORERA_THEOREM}:MC-1` },
      { text: 'Only every triangle in the domain — a much smaller, more tractable family than all closed contours', isCorrect: true },
      { text: 'Only contours that do not enclose any point of the domain', isCorrect: false },
      { text: 'Every straight line segment between two points of the domain', isCorrect: false },
    ],
    targetedMisconceptions: [`${MORERA_THEOREM}:MC-1`],
    source: eb(MORERA_THEOREM, 'Demonstration 1 — the triangle-only hypothesis versus closed-contour-conclusion distinction'),
  },
  {
    conceptId: MORERA_THEOREM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'In real analysis, gₙ(x) = |x|^(1+1/n) is differentiable everywhere and converges uniformly to |x|, which is NOT differentiable at x = 0. Given this real counterexample, is it obvious that a uniform limit of holomorphic complex functions must be holomorphic?',
    choices: [
      { text: 'Yes, it follows by the same reasoning as the real-variable case, just applied to complex functions', isCorrect: false, misconceptionId: `${MORERA_THEOREM}:MC-2` },
      { text: 'No — the real-variable analogue is actually false, so the complex-analysis fact (which IS true, proved via Morera\'s theorem) is a genuine, nontrivial payoff, not an obvious analogy', isCorrect: true },
      { text: 'No, because uniform limits of holomorphic functions are not actually holomorphic in complex analysis either', isCorrect: false },
      { text: 'The two cases are unrelated, so no comparison can be drawn between them at all', isCorrect: false },
    ],
    targetedMisconceptions: [`${MORERA_THEOREM}:MC-2`],
    source: eb(MORERA_THEOREM, 'Demonstration 2 — the |x|^(1+1/n) to |x| real counterexample contrasted with the Morera-certified complex closure fact'),
  },
  {
    conceptId: MORERA_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Morera\'s theorem\'s proof constructs F(z) = ∫ from z₀ to z of f(w)dw and shows F′ = f. How does this establish that f is holomorphic?',
    choices: [
      { text: 'It directly computes f′ from a difference quotient using the antiderivative as an intermediate step', isCorrect: false, misconceptionId: `${MORERA_THEOREM}:MC-3` },
      { text: 'F is holomorphic (built from a well-defined, path-independent integral) and F′ = f, and holomorphic functions are automatically infinitely differentiable, so f = F′ inherits holomorphicity from F — without ever directly computing f′', isCorrect: true },
      { text: 'It assumes f is holomorphic from the start, so the construction of F is not actually needed for the conclusion', isCorrect: false },
      { text: 'It shows F is continuous, which alone is enough to conclude f is holomorphic', isCorrect: false },
    ],
    targetedMisconceptions: [`${MORERA_THEOREM}:MC-3`],
    source: eb(MORERA_THEOREM, 'Demonstration 3 — the antiderivative construction and its F-prime-equals-f derivation'),
  },
  {
    conceptId: POLES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For f(z) = 1/(z − 2)³ at z₀ = 2: testing n = 2 gives (z−2)²f(z) = 1/(z−2), still unbounded. Testing n = 3 gives (z−2)³f(z) = 1, holomorphic and nonzero. Testing n = 4 gives (z−2)⁴f(z) = (z−2), holomorphic but zero at z = 2. Could n = 2 or n = 4 also be considered valid pole orders alongside n = 3?',
    choices: [
      { text: 'Yes, any of the three values could be reported as the pole order depending on preference', isCorrect: false, misconceptionId: `${POLES}:MC-1` },
      { text: 'No — exactly one n (here, n = 3) makes (z−z₀)ⁿf(z) both holomorphic AND nonzero; n = 2 fails by still being unbounded (too small) and n = 4 fails by vanishing (too large)', isCorrect: true },
      { text: 'No, none of the three values are valid since the function must first be checked for holomorphicity away from z = 2', isCorrect: false },
      { text: 'The pole order is undefined unless the function is first written as a Laurent series', isCorrect: false },
    ],
    targetedMisconceptions: [`${POLES}:MC-1`],
    source: eb(POLES, 'Demonstration 1 — the 1/(z-2)^3 three-way bracketing test (n=2,3,4)'),
  },
  {
    conceptId: POLES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'f(z) = e^z/(z²(z−1)) has singularities at z = 0 and z = 1, and both look "generally well-behaved" (no wild oscillation). Is this enough to confirm f is meromorphic, or must each singularity be checked individually?',
    choices: [
      { text: 'General good behavior is enough — meromorphicity does not require checking each singularity individually', isCorrect: false, misconceptionId: `${POLES}:MC-2` },
      { text: 'Each singularity must be explicitly checked: at z = 0, z²f(z) = e^z/(z−1) is holomorphic and nonzero (a pole of order 2); at z = 1, (z−1)f(z) = e^z/z² is holomorphic and nonzero (a pole of order 1) — only this explicit per-point check confirms meromorphicity', isCorrect: true },
      { text: 'f cannot be meromorphic, since it has more than one singularity', isCorrect: false },
      { text: 'Only the singularity closest to the origin needs to be checked; the rest can be assumed to follow the same pattern', isCorrect: false },
    ],
    targetedMisconceptions: [`${POLES}:MC-2`],
    source: eb(POLES, 'Demonstration 2 — the e^z/(z^2(z-1)) per-singularity meromorphicity check'),
  },
  {
    conceptId: POLES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'f(z) = (z²+1)/((z−1)(z+2)²) is rational, and its poles (z = 1 order 1, z = −2 order 2) are directly readable from the factorization. Is the general theorem "globally meromorphic on ℂ with tame behavior at infinity ⟺ rational" a fairly obvious, expected fact given this example?',
    choices: [
      { text: 'Yes — since this rational function is clearly meromorphic with readable poles, the general classification is just an obvious restatement of that same fact', isCorrect: false, misconceptionId: `${POLES}:MC-3` },
      { text: 'No — the easy direction (rational ⟹ meromorphic) is illustrated here, but the genuinely powerful and nontrivial content is the converse: that ANY function globally meromorphic with tame infinity behavior MUST be rational, collapsing an apparently much broader analytic class down to a small algebraic one', isCorrect: true },
      { text: 'No, because this example is not actually meromorphic, only holomorphic', isCorrect: false },
      { text: 'The classification is false in general, since not every meromorphic function on ℂ is rational', isCorrect: false },
    ],
    targetedMisconceptions: [`${POLES}:MC-3`],
    source: eb(POLES, 'Demonstration 3 — the (z^2+1)/((z-1)(z+2)^2) pole-order-from-factorization confirmation'),
  },
]
