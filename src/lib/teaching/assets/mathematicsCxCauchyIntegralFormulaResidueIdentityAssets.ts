/**
 * Batch: cauchy-integral-formula, residue, identity-theorem (math.cx) —
 * 11/31 -> 14/31.
 *
 * Fresh Phase 0 frontier recompute after cauchy-theorem, conformal-mapping,
 * and laurent-series were authored: 8 concepts became simultaneously
 * ready. This batch prioritizes cauchy-integral-formula (unlocks
 * higher-derivatives, morera-theorem, maximum-modulus), residue (unlocks
 * residue-theorem, continuing toward residue calculus), and
 * identity-theorem (unlocks analytic-continuation) — deferring
 * cauchy-goursat, essential-singularity, mobius-transformation, poles,
 * and riemann-mapping for subsequent batches.
 * Transcribed from their frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.cx.{cauchy-integral-formula,residue,
 * identity-theorem}.md.
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

const CAUCHY_INTEGRAL_FORMULA = 'math.cx.cauchy-integral-formula'
const RESIDUE = 'math.cx.residue'
const IDENTITY_THEOREM = 'math.cx.identity-theorem'

export const MATHEMATICS_CX_CAUCHY_INTEGRAL_FORMULA_RESIDUE_IDENTITY_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CAUCHY_INTEGRAL_FORMULA, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'z₀ MUST BE VERIFIED STRICTLY INSIDE C — NEVER APPLY THE FORMULA REGARDLESS OF POSITION: '
      + 'for f≡1, C the unit circle: with z₀=0 (inside, |0|=0<1), the formula gives the contour '
      + 'integral of 1/z equal to 2πi·1=2πi, matching the already-known fact. But with z₀=2 '
      + '(OUTSIDE, |2|=2>1): the formula\'s hypothesis FAILS — since 1/(z−2) IS holomorphic '
      + 'everywhere ON AND INSIDE the unit circle (its only singularity, z=2, lies OUTSIDE), '
      + 'CAUCHY\'S THEOREM (not the Integral Formula) applies instead, giving a zero integral — a '
      + 'COMPLETELY different answer, purely because z₀ moved from inside to outside. Believing '
      + 'the Cauchy Integral Formula gives the same kind of answer regardless of whether z₀ is '
      + 'inside or outside C is WRONG — ALWAYS check interior versus exterior FIRST; they are '
      + 'governed by entirely different rules.\n\n'
      + 'THE FORMULA REVEALS PROFOUND RIGIDITY — NEVER MERELY A COMPUTATIONAL SHORTCUT: the '
      + 'formula says a holomorphic function\'s value at ONE interior point, f(z₀), can be '
      + 'recovered ENTIRELY from an integral involving only the function\'s values ON the boundary '
      + 'curve — nothing like this holds for general real-valued functions. Viewing the formula '
      + 'only as "a way to compute integrals fast," without recognizing its deeper structural '
      + 'meaning, is WRONG — it says a holomorphic function\'s values EVERYWHERE INSIDE a curve '
      + 'are COMPLETELY DETERMINED by its values ON the boundary alone, a "boundary determines '
      + 'interior" rigidity property unique to holomorphic functions, and the foundation for '
      + 'essentially all deeper results in complex analysis.\n\n'
      + 'THE INTEGRAND f(z)/(z−z₀) GENUINELY HAS A SINGULARITY AT z₀ — NEVER ASSUME CAUCHY\'S '
      + 'THEOREM ALONE APPLIES DIRECTLY: when z₀ is inside C, f(z)/(z−z₀) is NOT holomorphic at z₀ '
      + '(division by zero there) — so Cauchy\'s Theorem\'s hypothesis (holomorphic throughout the '
      + 'interior) genuinely FAILS, which is EXACTLY why the separate Cauchy Integral Formula '
      + 'machinery is needed rather than simply concluding the integral is zero via Cauchy\'s '
      + 'Theorem. Failing to recognize why f(z)/(z−z₀) is not itself holomorphic at z₀ is WRONG — '
      + 'this singularity is precisely the reason a dedicated formula (rather than Cauchy\'s '
      + 'Theorem\'s zero conclusion) is required.',
    targetedMisconceptions: [`${CAUCHY_INTEGRAL_FORMULA}:MC-1`, `${CAUCHY_INTEGRAL_FORMULA}:MC-2`, `${CAUCHY_INTEGRAL_FORMULA}:MC-3`],
    source: eb(CAUCHY_INTEGRAL_FORMULA, 'Core Understanding — z0 needing to be verified strictly inside C never applying the formula regardless of position, the formula revealing profound rigidity never merely a computational shortcut, and the integrand f(z)/(z-z0) genuinely having a singularity at z0 never assuming Cauchy\'s Theorem alone applies directly'),
  },
  {
    conceptId: RESIDUE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE RESIDUE IS EXACTLY a₋₁ — NEVER THE WHOLE PRINCIPAL PART: for f(z)=1/z²: the Laurent '
      + 'series is the single term z⁻², so a₋₂=1 but a₋₁=0 — giving Res(f,0)=0 EVEN THOUGH f has a '
      + 'genuine, nontrivial pole (a nonzero principal part). Believing "the residue" refers to '
      + 'the whole principal part or to any nonzero negative-power coefficient generally is WRONG '
      + '— it is the ONE specific coefficient a₋₁, which here happens to vanish despite the pole '
      + 'being real and nontrivial.\n\n'
      + 'A SIMPLE POLE\'S RESIDUE COMES FROM A LIMIT SHORTCUT — NEVER REQUIRING FULL EXPANSION: for '
      + 'f(z)=e^z/(z−2) at the simple pole z₀=2: Res(f,2) equals the limit as z→2 of '
      + '(z−2)·e^z/(z−2), which equals the limit of e^z, which is e² — computed DIRECTLY from the '
      + 'limit, with NO Laurent series ever written out. Believing the residue can only be found '
      + 'by expanding the entire Laurent series is WRONG — for a simple pole, the shortcut '
      + 'extracts a₋₁ instantly, bypassing full expansion entirely.\n\n'
      + 'A HIGHER-ORDER POLE NEEDS FULL-FACTOR REMOVAL THEN DIFFERENTIATION — NEVER THE '
      + 'SIMPLE-POLE SHORTCUT DIRECTLY: for f(z)=e^z/z³ at the order-3 pole z₀=0: the WRONG '
      + 'simple-pole shortcut, the limit of z·e^z/z³, equals the limit of e^z/z², which DIVERGES. '
      + 'The CORRECT order-3 formula removes ALL three factors first, then differentiates twice: '
      + 'Res(f,0) = (1/2!)·the limit as z→0 of the second derivative of z³·e^z/z³, which equals '
      + '(1/2)·the limit of e^z, which is 1/2. Believing the simple-pole shortcut (multiply by '
      + '(z−z₀) and take the limit) can be applied directly to a pole of order greater than 1 is '
      + 'WRONG — it removes only ONE factor, leaving a still-singular expression; the full formula '
      + 'removes ALL n factors before differentiating n−1 times, correcting for the factorials '
      + 'that differentiation introduces.',
    targetedMisconceptions: [`${RESIDUE}:MC-1`, `${RESIDUE}:MC-2`, `${RESIDUE}:MC-3`],
    source: eb(RESIDUE, 'Core Understanding — the residue being exactly a-1 never the whole principal part, a simple pole\'s residue coming from a limit shortcut never requiring full expansion, and a higher-order pole needing full-factor removal then differentiation never the simple-pole shortcut directly'),
  },
  {
    conceptId: IDENTITY_THEOREM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE THEOREM REQUIRES A LIMIT POINT — NEVER MERELY INFINITELY MANY AGREEMENT POINTS: '
      + 'sin(πz) vanishes at every integer — INFINITELY many zeros — yet the integers have NO '
      + 'limit point in C (they escape to infinity; every finite disk contains only finitely '
      + 'many). The identity theorem does NOT force sin(πz)≡0, and indeed it isn\'t (sin(π/2)=1≠0). '
      + 'Contrast: f(z)=sin(2z) and g(z)=2sin(z)cos(z) agree at EVERY real z — and EVERY real '
      + 'number IS a limit point of R within C — so the theorem DOES force f≡g on all of C. '
      + 'Believing infinitely many agreement points is AUTOMATICALLY sufficient is WRONG — the '
      + 'points must have a LIMIT POINT INSIDE the domain, not merely be infinite in count.\n\n'
      + 'CONNECTEDNESS OF THE DOMAIN IS ESSENTIAL — NEVER ASSUME THE CONCLUSION HOLDS ON A '
      + 'DISCONNECTED DOMAIN: let D be two disjoint disks, one at 0 and one at 10. Define f≡0 on '
      + 'the first disk, f≡1 on the second (holomorphic on each component separately); let g≡0 '
      + 'throughout D. Then f=g on the ENTIRE first disk (abundant limit points) yet f≠g on the '
      + 'second disk. This does NOT violate the theorem — D is NOT connected, so there is no '
      + 'unbroken path of overlapping disks for the agreement to "spread" along. Believing the '
      + 'identity theorem\'s conclusion holds even when D is disconnected is WRONG — agreement on '
      + 'one connected component has no path to reach a different component.\n\n'
      + 'TWO VALID ANALYTIC CONTINUATIONS TO A CONNECTED DOMAIN MUST COINCIDE — NEVER ASSUME THEY '
      + 'COULD GENUINELY DIFFER: if two mathematicians each extend f(z)=1/(1−z) (from the unit '
      + 'disk) to the larger CONNECTED domain C\\{1}, both extensions AGREE with f on the unit '
      + 'disk — a set with abundant limit points, sitting inside the larger connected domain. The '
      + 'identity theorem FORCES the two extensions to be IDENTICAL everywhere on C\\{1}. Believing '
      + 'a holomorphic function might have multiple genuinely different valid analytic '
      + 'continuations to a larger connected domain is WRONG — any two such continuations '
      + 'agreeing on the original limit-point-rich domain are forced by the identity theorem to '
      + 'coincide everywhere.',
    targetedMisconceptions: [`${IDENTITY_THEOREM}:MC-1`, `${IDENTITY_THEOREM}:MC-2`, `${IDENTITY_THEOREM}:MC-3`],
    source: eb(IDENTITY_THEOREM, 'Core Understanding — the theorem requiring a limit point never merely infinitely many agreement points, connectedness of the domain being essential never assumed to hold on a disconnected domain, and two valid analytic continuations to a connected domain being forced to coincide never assumed to genuinely differ'),
  },
]

export const MATHEMATICS_CX_CAUCHY_INTEGRAL_FORMULA_RESIDUE_IDENTITY_PROBES: SeedProbe[] = [
  // CAUCHY_INTEGRAL_FORMULA
  {
    conceptId: CAUCHY_INTEGRAL_FORMULA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does the Cauchy Integral Formula give the same kind of answer regardless of whether z₀ is inside or outside the curve C?',
    choices: [
      { text: "No — for f≡1 on the unit circle, z0=0 (inside) gives 2*pi*i via the Integral Formula, but z0=2 (outside) means 1/(z-2) is holomorphic throughout the interior, so Cauchy's Theorem applies instead, giving 0; interior and exterior are governed by entirely different rules, never interchangeable", isCorrect: true },
      { text: "Yes, the Cauchy Integral Formula gives the same kind of answer whether z0 is inside or outside C", isCorrect: false, misconceptionId: `${CAUCHY_INTEGRAL_FORMULA}:MC-1` },
      { text: "Since the formula's expression f(z)/(z-z0) looks like a universal rule for this shape of integral, it should apply the same way regardless of where z0 sits relative to C", isCorrect: false, misconceptionId: `${CAUCHY_INTEGRAL_FORMULA}:MC-1` },
    ],
    targetedMisconceptions: [`${CAUCHY_INTEGRAL_FORMULA}:MC-1`],
    source: eb(CAUCHY_INTEGRAL_FORMULA, 'Discovery Question 1 as a detection probe (verbatim) — whether the formula gives the same answer regardless of z0\'s position, an answer of "yes" confirming INTERIOR-EXTERIOR-DISTINCTION-FOR-Z0-IGNORED'),
  },
  {
    conceptId: CAUCHY_INTEGRAL_FORMULA, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is the Cauchy Integral Formula just a computational shortcut, or does it mean something deeper?',
    choices: [
      { text: "Something deeper — the formula says a holomorphic function's value at one interior point is recovered entirely from its values on the boundary curve alone; this 'boundary determines interior' rigidity is unique to holomorphic functions and underlies essentially all deeper complex-analysis results, not merely a fast computation trick", isCorrect: true },
      { text: "It is just a computational shortcut for evaluating integrals, with no deeper meaning", isCorrect: false, misconceptionId: `${CAUCHY_INTEGRAL_FORMULA}:MC-2` },
      { text: "Since the formula is often introduced primarily to speed up integral evaluation, its practical computational use should be treated as its main significance", isCorrect: false, misconceptionId: `${CAUCHY_INTEGRAL_FORMULA}:MC-2` },
    ],
    targetedMisconceptions: [`${CAUCHY_INTEGRAL_FORMULA}:MC-2`],
    source: eb(CAUCHY_INTEGRAL_FORMULA, 'Discovery Question 2 as a detection probe (verbatim) — whether the formula is just a shortcut or means something deeper, an answer treating it as just a shortcut confirming CAUCHY-INTEGRAL-FORMULA-TREATED-AS-MERE-COMPUTATIONAL-TRICK'),
  },
  {
    conceptId: CAUCHY_INTEGRAL_FORMULA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why doesn\'t Cauchy\'s Theorem alone (giving zero) apply directly to the contour integral of f(z)/(z-z0) when z0 is inside C?',
    choices: [
      { text: "Because f(z)/(z-z0) is NOT holomorphic at z0 (division by zero there), so Cauchy's Theorem's hypothesis of holomorphic throughout the interior genuinely fails; this integrand singularity is exactly why the separate Cauchy Integral Formula machinery is needed instead of concluding the integral is zero", isCorrect: true },
      { text: "Cauchy's Theorem does apply directly and gives zero, since the integrand still looks holomorphic overall", isCorrect: false, misconceptionId: `${CAUCHY_INTEGRAL_FORMULA}:MC-3` },
      { text: "Since the focus when applying the formula is usually on evaluating its right-hand side, the integrand's own singularity at z0 can reasonably be overlooked as a minor technicality", isCorrect: false, misconceptionId: `${CAUCHY_INTEGRAL_FORMULA}:MC-3` },
    ],
    targetedMisconceptions: [`${CAUCHY_INTEGRAL_FORMULA}:MC-3`],
    source: eb(CAUCHY_INTEGRAL_FORMULA, 'Discovery Question 3 as a detection probe (verbatim) — why Cauchy\'s Theorem alone doesn\'t apply to f(z)/(z-z0), an answer overlooking the integrand\'s singularity confirming INTEGRAND-SINGULARITY-AT-Z0-OVERLOOKED-AS-A-PROBLEM'),
  },
  // RESIDUE
  {
    conceptId: RESIDUE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If a function has a large, multi-term principal part, does "the residue" refer to that whole principal part, or to one specific coefficient?',
    choices: [
      { text: "One specific coefficient — for f(z)=1/z^2, the Laurent series is the single term z^-2, so a-2=1 but a-1=0, giving Res(f,0)=0 even though f has a genuine, nontrivial pole; the residue is exactly a-1, never the whole principal part or any other coefficient", isCorrect: true },
      { text: "The residue refers to the whole principal part, or to any nonzero negative-power coefficient generally", isCorrect: false, misconceptionId: `${RESIDUE}:MC-3` },
      { text: "Since 'the singular part' is often used loosely to describe a function's bad behavior near a pole, 'the residue' should be understood the same broad way, covering the whole principal part", isCorrect: false, misconceptionId: `${RESIDUE}:MC-3` },
    ],
    targetedMisconceptions: [`${RESIDUE}:MC-3`],
    source: eb(RESIDUE, 'Discovery Question 1 as a detection probe (verbatim) — whether "the residue" refers to the whole principal part or one coefficient, an answer naming the whole principal part confirming RESIDUE-CONFUSED-WITH-PRINCIPAL-PART'),
  },
  {
    conceptId: RESIDUE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Must you always expand a function\'s full Laurent series to find its residue?',
    choices: [
      { text: "No — for f(z)=e^z/(z-2) at the simple pole z0=2, Res(f,2) is computed directly as the limit of (z-2)*e^z/(z-2), which equals e^2, with no Laurent series ever written out; for a simple pole, the limit shortcut extracts a-1 instantly, bypassing full expansion entirely", isCorrect: true },
      { text: "Yes, the residue can only be found by expanding the entire Laurent series", isCorrect: false, misconceptionId: `${RESIDUE}:MC-1` },
      { text: "Since the residue is defined as a Laurent coefficient, finding it should be expected to require expanding the full Laurent series every time", isCorrect: false, misconceptionId: `${RESIDUE}:MC-1` },
    ],
    targetedMisconceptions: [`${RESIDUE}:MC-1`],
    source: eb(RESIDUE, 'Discovery Question 2 as a detection probe (verbatim) — whether the full Laurent series must always be expanded to find the residue, an answer of "yes" confirming RESIDUE-REQUIRES-FULL-LAURENT-EXPANSION'),
  },
  {
    conceptId: RESIDUE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Can the simple-pole shortcut be applied directly to a pole of order 3, the same way it\'s applied to a simple pole?',
    choices: [
      { text: "No — for f(z)=e^z/z^3 at the order-3 pole z0=0, the simple-pole shortcut (multiply by z, take the limit) diverges; the correct formula removes ALL three factors first, then differentiates twice and divides by 2!, giving 1/2 — removing only one factor leaves a still-singular expression", isCorrect: true },
      { text: "Yes, the simple-pole shortcut can be applied directly to a pole of order 3 the same way it's applied to a simple pole", isCorrect: false, misconceptionId: `${RESIDUE}:MC-2` },
      { text: "Since the simple-pole formula is so straightforward, it should be expected to generalize unchanged to poles of any order without modification", isCorrect: false, misconceptionId: `${RESIDUE}:MC-2` },
    ],
    targetedMisconceptions: [`${RESIDUE}:MC-2`],
    source: eb(RESIDUE, 'Discovery Question 3 as a detection probe (verbatim) — whether the simple-pole shortcut applies directly to an order-3 pole, an answer of "yes" confirming SIMPLE-POLE-FORMULA-MISAPPLIED-TO-HIGHER-ORDER-POLE'),
  },
  // IDENTITY_THEOREM
  {
    conceptId: IDENTITY_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If two entire functions agree at infinitely many points, must they be identical everywhere?',
    choices: [
      { text: "Not necessarily — sin(pi*z) vanishes at every integer, infinitely many zeros, yet the integers have no limit point in C (they escape to infinity); the identity theorem does not force sin(pi*z) to be identically zero, since agreement must occur on a set WITH a limit point inside the domain, not merely be infinite in count", isCorrect: true },
      { text: "Yes, if two entire functions agree at infinitely many points, they must be identical everywhere", isCorrect: false, misconceptionId: `${IDENTITY_THEOREM}:MC-1` },
      { text: "Since 'infinitely many' sounds like an overwhelming amount of agreement, it should be treated as automatically sufficient to force the functions to be identical", isCorrect: false, misconceptionId: `${IDENTITY_THEOREM}:MC-1` },
    ],
    targetedMisconceptions: [`${IDENTITY_THEOREM}:MC-1`],
    source: eb(IDENTITY_THEOREM, 'Discovery Question 1 as a detection probe (verbatim) — whether infinitely many agreement points forces identical functions, an answer of "yes" confirming INFINITE-AGREEMENT-SUFFICIENT'),
  },
  {
    conceptId: IDENTITY_THEOREM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the identity theorem\'s conclusion still hold if the domain D is a union of two separate, disjoint disks?',
    choices: [
      { text: "No — with D as two disjoint disks, f≡0 on the first and f≡1 on the second (both holomorphic on their own component), and g≡0 throughout D: f=g on the entire first disk yet f does not equal g on the second; this doesn't violate the theorem because D is not connected, so agreement has no path to spread to the other component", isCorrect: true },
      { text: "Yes, the identity theorem's conclusion holds even when the domain D is disconnected", isCorrect: false, misconceptionId: `${IDENTITY_THEOREM}:MC-2` },
      { text: "Since connectedness is a background technical condition, it should be treated as not load-bearing, so the theorem's conclusion should still apply even to a disconnected domain", isCorrect: false, misconceptionId: `${IDENTITY_THEOREM}:MC-2` },
    ],
    targetedMisconceptions: [`${IDENTITY_THEOREM}:MC-2`],
    source: eb(IDENTITY_THEOREM, 'Discovery Question 2 as a detection probe (verbatim) — whether the theorem\'s conclusion holds on a disconnected domain, an answer of "yes" confirming CONNECTEDNESS-NOT-REQUIRED'),
  },
  {
    conceptId: IDENTITY_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Could two mathematicians validly find two different correct analytic continuations of the same function to the same larger connected domain?',
    choices: [
      { text: "No — if two mathematicians each extend f(z)=1/(1-z) from the unit disk to the connected domain C minus {1}, both extensions agree with f on the unit disk (a limit-point-rich set), so the identity theorem forces the two extensions to be identical everywhere on that connected domain", isCorrect: true },
      { text: "Yes, two mathematicians could validly find two genuinely different correct analytic continuations to the same larger connected domain", isCorrect: false, misconceptionId: `${IDENTITY_THEOREM}:MC-3` },
      { text: "Since 'continuation' suggests a creative extension process, it seems plausible that two independently constructed continuations to the same connected domain could genuinely differ", isCorrect: false, misconceptionId: `${IDENTITY_THEOREM}:MC-3` },
    ],
    targetedMisconceptions: [`${IDENTITY_THEOREM}:MC-3`],
    source: eb(IDENTITY_THEOREM, 'Discovery Question 3 as a detection probe (verbatim) — whether two different valid analytic continuations to the same connected domain could exist, an answer of "yes" confirming CONTINUATION-NOT-UNIQUE'),
  },
]
