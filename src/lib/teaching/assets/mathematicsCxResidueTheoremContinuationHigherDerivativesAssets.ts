/**
 * Batch: residue-theorem, analytic-continuation, higher-derivatives
 * (math.cx) — 14/31 -> 17/31.
 *
 * Fresh Phase 0 frontier recompute after cauchy-integral-formula,
 * residue, and identity-theorem were authored: 10 concepts became
 * simultaneously ready. This batch prioritizes residue-theorem (unlocks
 * real-integral-residues, argument-principle — the culmination of
 * residue calculus), analytic-continuation (unlocks riemann-surface,
 * riemann-zeta), and higher-derivatives (unlocks liouville-theorem) —
 * deferring cauchy-goursat, essential-singularity, maximum-modulus,
 * mobius-transformation, morera-theorem, poles, and riemann-mapping
 * (each unlocking 0 further concepts) for subsequent batches.
 * Transcribed from their frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.cx.{residue-theorem,
 * analytic-continuation,higher-derivatives}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching this domain's established
 * convention for expert/research-tier content (residue-theorem and
 * higher-derivatives are "expert" tier; analytic-continuation is
 * "research" tier, consistent with the same UNDERGRADUATE baseline used
 * throughout this domain for research-tier concepts, e.g. cohomology,
 * covering-space, van-kampen in math.top).
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

const RESIDUE_THEOREM = 'math.cx.residue-theorem'
const ANALYTIC_CONTINUATION = 'math.cx.analytic-continuation'
const HIGHER_DERIVATIVES = 'math.cx.higher-derivatives'

export const MATHEMATICS_CX_RESIDUE_THEOREM_CONTINUATION_HIGHER_DERIVATIVES_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RESIDUE_THEOREM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE RESIDUE THEOREM COLLAPSES TO CAUCHY\'S THEOREM AT ZERO ENCLOSED POLES — NEVER AN '
      + 'UNRELATED TOOL: for f(z)=1/z, C:|z|=1 (Cauchy\'s theorem\'s own counterexample): the '
      + 'Residue Theorem gives the contour integral equal to 2πi·Res(f,0)=2πi·1=2πi — EXACTLY '
      + 'matching that concept\'s own result. For any curve NOT enclosing z=0: zero enclosed poles '
      + 'gives an EMPTY sum, so the integral is 2πi·0=0 — matching Cauchy\'s theorem\'s ordinary '
      + 'conclusion precisely, since f is holomorphic throughout that curve\'s interior. Believing '
      + 'the Residue Theorem is an entirely new, unrelated tool from Cauchy\'s theorem is WRONG — '
      + 'it strictly generalizes Cauchy\'s theorem, collapsing to it exactly when no poles are '
      + 'enclosed.\n\n'
      + 'MULTIPLE ENCLOSED POLES REQUIRE SUMMING EACH RESIDUE INDIVIDUALLY — NEVER ONE COMBINED '
      + 'COMPUTATION: for f(z)=1/(z(z−2)), C:|z|=3 (enclosing BOTH z=0 and z=2): computed '
      + 'SEPARATELY, Res(f,0)=−1/2 and Res(f,2)=1/2. Summing: −1/2+1/2=0, so the integral is 0. '
      + 'Believing multiple enclosed poles can be handled with a single combined computation '
      + 'rather than finding and summing each pole\'s own residue individually is WRONG — each '
      + 'enclosed pole contributes its OWN residue, individually found, to the sum; there is no '
      + 'shortcut that skips this.\n\n'
      + 'ONLY ENCLOSED POLES COUNT — NEVER EVERY POLE OF THE FUNCTION REGARDLESS OF THE CONTOUR: '
      + 'using the SAME f(z)=1/(z(z−2)) but now C\':|z|=1 (enclosing ONLY z=0, since z=2 has '
      + 'modulus 2>1): the integral equals 2πi·(−1/2)=−πi — a genuinely DIFFERENT answer from the '
      + '|z|=3 case\'s 0, even though f never changed. Believing every pole of a function must be '
      + 'included in the residue sum regardless of whether the specific contour actually encloses '
      + 'it is WRONG — a pole lying outside the chosen contour contributes NOTHING to that '
      + 'integral; the same function integrated over different contours can give genuinely '
      + 'different answers.',
    targetedMisconceptions: [`${RESIDUE_THEOREM}:MC-1`, `${RESIDUE_THEOREM}:MC-2`, `${RESIDUE_THEOREM}:MC-3`],
    source: eb(RESIDUE_THEOREM, 'Core Understanding — the Residue Theorem collapsing to Cauchy\'s Theorem at zero enclosed poles never an unrelated tool, multiple enclosed poles requiring summing each residue individually never one combined computation, and only enclosed poles counting never every pole of the function regardless of the contour'),
  },
  {
    conceptId: ANALYTIC_CONTINUATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'CONTINUATION IS RE-CENTERING, NEVER GUARANTEED TO REACH ALL OF C: for f(z)=Σzⁿ=1/(1−z) '
      + '(originally |z|<1), re-expanding around z₀=−1/2: 1/(1−z)=Σ(z−z₀)ⁿ/(1−z₀)ⁿ⁺¹, valid for '
      + '|z−z₀|<3/2 — reaching z=−1.9, OUTSIDE the original disk. The new disk\'s radius is still '
      + 'FINITE, determined by distance to the nearest singularity (z=1). Believing a holomorphic '
      + 'function can always be continued to cover all of C, no matter what, is WRONG — genuine '
      + 'obstructions (singularities, natural boundaries) can block continuation entirely in '
      + 'certain directions.\n\n'
      + 'UNIQUENESS GUARANTEES THE RESULT — NEVER THE CONSTRUCTION: for two independently-claimed '
      + 'continuations of f(z)=1/(1−z) to C\\{1}, both agreeing with f on the original disk: by the '
      + 'identity theorem, they MUST be identical everywhere on C\\{1} — there is no room for two '
      + 'genuinely different valid answers. But this guarantee does NOT do the re-centering '
      + 'arithmetic; the computation (finding the new Taylor coefficients) is still genuine, '
      + 'required work. Believing that since the identity theorem guarantees the continuation is '
      + 'unique, finding it requires no real computation is WRONG — uniqueness certifies the '
      + 'answer once found; it does not compute it for you.\n\n'
      + 'MONODROMY IS A GENUINE SUBTLETY — NEVER "SAME POINT MEANS SAME VALUE": continuing log(z) '
      + 'starting at z=1 (log(1)=0) counterclockwise around the unit circle back to z=1: tracking '
      + 'log(z)=ln|z|+i·arg(z) with arg(z) increasing continuously from 0 to 2π, the continued '
      + 'value at the end is 2πi — NOT the starting value 0, even though the path returned to the '
      + 'SAME point. Believing continuation along a closed loop back to a starting point must '
      + 'return the original value is WRONG — encircling a singularity (like log(z)\'s branch '
      + 'point at 0) genuinely changes the continued value; this is monodromy, distinct from (and '
      + 'not a violation of) the identity theorem\'s uniqueness guarantee, which applies only '
      + 'within a domain not requiring encirclement.',
    targetedMisconceptions: [`${ANALYTIC_CONTINUATION}:MC-1`, `${ANALYTIC_CONTINUATION}:MC-2`, `${ANALYTIC_CONTINUATION}:MC-3`],
    source: eb(ANALYTIC_CONTINUATION, 'Core Understanding — continuation being re-centering never guaranteed to reach all of C, uniqueness guaranteeing the result never the construction, and monodromy being a genuine subtlety never "same point means same value"'),
  },
  {
    conceptId: HIGHER_DERIVATIVES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'f⁽ⁿ⁾(z₀)\'S FORMULA IS A DIRECT GENERALIZATION OF THE n=0 CASE — NEVER INDEPENDENT: for '
      + 'f(z)=e^z, C the unit circle around z₀=0: the Cauchy Integral Formula gives f(0)=1 via '
      + 'the standard contour integral. This concept\'s formula at n=0 gives EXACTLY the same '
      + 'expression, reducing to that same integral and giving f⁽⁰⁾(0)=1 — MATCHING numerically, '
      + 'not just symbolically. Believing the formula for f⁽ⁿ⁾(z₀) is an independent new result '
      + 'unrelated to the Cauchy Integral Formula is WRONG — it comes from differentiating that '
      + 'formula\'s own expression n times, and the n=0 case reduces EXACTLY to the already-known '
      + 'formula.\n\n'
      + 'HOLOMORPHIC ONCE MEANS C^∞ FOREVER — NEVER A GAP LIKE R\'S DERIVATIVE FAILURES: f(z)=1/z '
      + 'is holomorphic wherever z≠0, so derivatives of EVERY order exist there, and indeed '
      + 'f⁽ⁿ⁾(z)=(−1)ⁿn!/z^(n+1) is directly computable for every n. Contrast: the REAL function '
      + 'g(x)=x^(5/3) is differentiable ONCE at x=0 (g\'(0)=0), but g\'\'(x)=(10/9)x^(−1/3) is '
      + 'UNDEFINED at x=0 — a genuine gap. Believing a holomorphic function could be '
      + 'complex-differentiable at a point without its higher derivatives necessarily existing '
      + '(analogous to real-variable derivative gaps) is WRONG — holomorphicity FORCES automatic '
      + 'infinite differentiability, with NO possible complex-analysis analogue to the '
      + 'real-variable gap.\n\n'
      + 'CAUCHY\'S INEQUALITY BOUNDS |f⁽ⁿ⁾(z₀)| FROM A BOUND ON f ALONE — NEVER REQUIRING THE '
      + 'EXPLICIT FORMULA: for f holomorphic with |f(z)|≤10 on |z|=2 (M=10,R=2): Cauchy\'s '
      + 'inequality gives |f⁽³⁾(0)|≤(3!×10)/2³=7.5 — a genuine upper bound obtained ENTIRELY from '
      + 'M=10, with NO need to know f\'s explicit formula or compute f⁽³⁾ directly at all. '
      + 'Believing bounding |f⁽ⁿ⁾(z₀)| via Cauchy\'s inequality requires knowing f\'s explicit '
      + 'formula and computing the derivative directly is WRONG — a bound on |f| ALONE suffices, '
      + 'obtained directly by estimating the integral formula.',
    targetedMisconceptions: [`${HIGHER_DERIVATIVES}:MC-1`, `${HIGHER_DERIVATIVES}:MC-2`, `${HIGHER_DERIVATIVES}:MC-3`],
    source: eb(HIGHER_DERIVATIVES, 'Core Understanding — f-n\'s formula being a direct generalization of the n=0 case never independent, holomorphic once meaning C-infinity forever never a gap like R\'s derivative failures, and Cauchy\'s inequality bounding |f-n| from a bound on f alone never requiring the explicit formula'),
  },
]

export const MATHEMATICS_CX_RESIDUE_THEOREM_CONTINUATION_HIGHER_DERIVATIVES_PROBES: SeedProbe[] = [
  // RESIDUE_THEOREM
  {
    conceptId: RESIDUE_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the Residue Theorem an entirely separate tool from Cauchy\'s Theorem, requiring unrelated reasoning?',
    choices: [
      { text: "No — for f(z)=1/z on |z|=1, the Residue Theorem gives 2*pi*i*Res(f,0)=2*pi*i, exactly matching Cauchy's theorem's own counterexample result; for any curve not enclosing z=0, zero enclosed poles gives an empty sum, matching Cauchy's theorem's zero conclusion. The Residue Theorem strictly generalizes Cauchy's theorem, collapsing to it exactly at zero enclosed poles", isCorrect: true },
      { text: "Yes, the Residue Theorem is an entirely separate tool from Cauchy's Theorem, requiring unrelated reasoning", isCorrect: false, misconceptionId: `${RESIDUE_THEOREM}:MC-1` },
      { text: "Since the Residue Theorem introduces new vocabulary (residues) not present in Cauchy's Theorem, it should be treated as an independent result rather than a generalization", isCorrect: false, misconceptionId: `${RESIDUE_THEOREM}:MC-1` },
    ],
    targetedMisconceptions: [`${RESIDUE_THEOREM}:MC-1`],
    source: eb(RESIDUE_THEOREM, 'Discovery Question 1 as a detection probe (verbatim) — whether the Residue Theorem is entirely separate from Cauchy\'s Theorem, an answer of "yes" confirming RESIDUE-THEOREM-AS-UNRELATED-TOOL'),
  },
  {
    conceptId: RESIDUE_THEOREM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'When a contour encloses two poles, can the residue theorem be applied using just one combined computation for both poles at once?',
    choices: [
      { text: "No — for f(z)=1/(z(z-2)) on |z|=3 (enclosing both z=0 and z=2), Res(f,0)=-1/2 and Res(f,2)=1/2 are computed SEPARATELY, then summed to get 0; each enclosed pole contributes its own individually-found residue to the sum, with no shortcut that combines two poles into one computation", isCorrect: true },
      { text: "Yes, multiple enclosed poles can be handled with a single combined computation rather than finding and summing each pole's own residue individually", isCorrect: false, misconceptionId: `${RESIDUE_THEOREM}:MC-3` },
      { text: "Since the summation formula uses compact sigma notation, that notation should be read as hiding a single combined shortcut computation rather than an explicit per-pole sum", isCorrect: false, misconceptionId: `${RESIDUE_THEOREM}:MC-3` },
    ],
    targetedMisconceptions: [`${RESIDUE_THEOREM}:MC-3`],
    source: eb(RESIDUE_THEOREM, 'Discovery Question 2 as a detection probe (verbatim) — whether multiple enclosed poles can use one combined computation, an answer of "yes" confirming MULTIPLE-POLES-TREATED-AS-ONE-COMBINED-COMPUTATION'),
  },
  {
    conceptId: RESIDUE_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Should every pole of a function be included in the residue sum, regardless of whether the specific contour actually encloses it?',
    choices: [
      { text: "No — using f(z)=1/(z(z-2)) with C':|z|=1 (enclosing ONLY z=0, since z=2 has modulus 2>1), the integral equals 2*pi*i*(-1/2)=-pi*i, genuinely different from the |z|=3 case's 0, even though f never changed; a pole outside the chosen contour contributes NOTHING to that integral", isCorrect: true },
      { text: "Yes, every pole of a function should be included in the residue sum regardless of whether the specific contour actually encloses it", isCorrect: false, misconceptionId: `${RESIDUE_THEOREM}:MC-2` },
      { text: "Since 'the function's poles' feels like a fixed property of the function itself, all of them should be summed regardless of which specific contour is being used", isCorrect: false, misconceptionId: `${RESIDUE_THEOREM}:MC-2` },
    ],
    targetedMisconceptions: [`${RESIDUE_THEOREM}:MC-2`],
    source: eb(RESIDUE_THEOREM, 'Discovery Question 3 as a detection probe (verbatim) — whether every pole should be included regardless of enclosure, an answer of "yes" confirming ALL-POLES-INCLUDED-REGARDLESS-OF-ENCLOSURE'),
  },
  // ANALYTIC_CONTINUATION
  {
    conceptId: ANALYTIC_CONTINUATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Can a holomorphic function always be continued to cover all of ℂ, no matter what?',
    choices: [
      { text: "No — for f(z)=1/(1-z) (originally |z|<1), re-expanding around z0=-1/2 reaches outside the original disk but the new disk's radius is still finite, determined by distance to the nearest singularity at z=1; genuine obstructions like singularities can block continuation entirely in certain directions", isCorrect: true },
      { text: "Yes, a holomorphic function can always be continued to cover all of C, no matter what", isCorrect: false, misconceptionId: `${ANALYTIC_CONTINUATION}:MC-1` },
      { text: "Since 'extending the domain' sounds like an unbounded process, continuation should be expected to eventually reach all of C given enough re-centering steps", isCorrect: false, misconceptionId: `${ANALYTIC_CONTINUATION}:MC-1` },
    ],
    targetedMisconceptions: [`${ANALYTIC_CONTINUATION}:MC-1`],
    source: eb(ANALYTIC_CONTINUATION, 'Discovery Question 1 as a detection probe (verbatim) — whether a holomorphic function can always be continued to all of C, an answer of "yes" confirming CONTINUATION-ALWAYS-POSSIBLE-EVERYWHERE'),
  },
  {
    conceptId: ANALYTIC_CONTINUATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Since the identity theorem guarantees the continuation is unique, does that mean finding it requires no real computation?',
    choices: [
      { text: "No — the identity theorem guarantees that two independently-claimed continuations of f(z)=1/(1-z) to C minus {1} must be identical, but this guarantee does not do the re-centering arithmetic; finding the new Taylor coefficients is still genuine, required work. Uniqueness certifies the answer once found, it does not compute it", isCorrect: true },
      { text: "Yes, since the identity theorem guarantees the continuation is unique, finding it requires no real computation", isCorrect: false, misconceptionId: `${ANALYTIC_CONTINUATION}:MC-2` },
      { text: "Since 'unique' and 'automatic' feel closely related, a guaranteed-unique continuation should be expected to require no further arithmetic to actually find", isCorrect: false, misconceptionId: `${ANALYTIC_CONTINUATION}:MC-2` },
    ],
    targetedMisconceptions: [`${ANALYTIC_CONTINUATION}:MC-2`],
    source: eb(ANALYTIC_CONTINUATION, 'Discovery Question 2 as a detection probe (verbatim) — whether uniqueness means no computation is needed, an answer of "yes" confirming UNIQUENESS-IMPLIES-AUTOMATIC-CONSTRUCTION'),
  },
  {
    conceptId: ANALYTIC_CONTINUATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If you continue a function along a closed loop back to its starting point, must you get back the original value?',
    choices: [
      { text: "No — continuing log(z) starting at z=1 (log(1)=0) counterclockwise around the unit circle back to z=1 gives a continued value of 2*pi*i, not the starting value 0, even though the path returned to the same point; encircling a singularity like log(z)'s branch point at 0 genuinely changes the continued value, which is monodromy", isCorrect: true },
      { text: "Yes, continuation along a closed loop back to a starting point must return the original value", isCorrect: false, misconceptionId: `${ANALYTIC_CONTINUATION}:MC-3` },
      { text: "Since the identity theorem's uniqueness guarantee was just learned, that same guarantee should be expected to extend to loop-based continuation back to a starting point", isCorrect: false, misconceptionId: `${ANALYTIC_CONTINUATION}:MC-3` },
    ],
    targetedMisconceptions: [`${ANALYTIC_CONTINUATION}:MC-3`],
    source: eb(ANALYTIC_CONTINUATION, 'Discovery Question 3 as a detection probe (verbatim) — whether a closed loop back to the starting point must return the original value, an answer of "yes" confirming RETURN-TO-SAME-POINT-IMPLIES-SAME-VALUE'),
  },
  // HIGHER_DERIVATIVES
  {
    conceptId: HIGHER_DERIVATIVES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the formula for f⁽ⁿ⁾(z₀) an independent new result unrelated to the Cauchy Integral Formula, or does it reduce directly to that formula when n=0?',
    choices: [
      { text: "It reduces directly to that formula when n=0 — for f(z)=e^z with the unit circle around z0=0, the Cauchy Integral Formula gives f(0)=1, and this concept's formula at n=0 gives exactly the same expression, matching numerically; the formula comes from differentiating the Cauchy Integral Formula n times", isCorrect: true },
      { text: "It is an independent new result unrelated to the Cauchy Integral Formula", isCorrect: false, misconceptionId: `${HIGHER_DERIVATIVES}:MC-1` },
      { text: "Since the formula introduces a new symbol n for the derivative order, it should be treated as an unrelated new rule rather than a generalization of an already-known formula", isCorrect: false, misconceptionId: `${HIGHER_DERIVATIVES}:MC-1` },
    ],
    targetedMisconceptions: [`${HIGHER_DERIVATIVES}:MC-1`],
    source: eb(HIGHER_DERIVATIVES, 'Discovery Question 1 as a detection probe (verbatim) — whether the higher-derivative formula is independent or reduces to the Cauchy Integral Formula at n=0, an answer treating it as independent confirming HIGHER-DERIVATIVE-FORMULA-ASSUMED-INDEPENDENT'),
  },
  {
    conceptId: HIGHER_DERIVATIVES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Can a holomorphic function be complex-differentiable exactly once at a point, without its second derivative necessarily existing there?',
    choices: [
      { text: "No — f(z)=1/z is holomorphic wherever z is not 0, so derivatives of EVERY order exist there and are directly computable; contrast the real function g(x)=x^(5/3), differentiable once at x=0 but with g'' undefined there, a genuine real-variable gap. Holomorphicity forces automatic infinite differentiability with no such gap possible", isCorrect: true },
      { text: "Yes, a holomorphic function could be complex-differentiable at a point without its higher derivatives necessarily existing", isCorrect: false, misconceptionId: `${HIGHER_DERIVATIVES}:MC-2` },
      { text: "Since real-variable functions can be differentiable once without being twice differentiable, that same gap should be expected to occur for holomorphic complex functions too", isCorrect: false, misconceptionId: `${HIGHER_DERIVATIVES}:MC-2` },
    ],
    targetedMisconceptions: [`${HIGHER_DERIVATIVES}:MC-2`],
    source: eb(HIGHER_DERIVATIVES, 'Discovery Question 2 as a detection probe (verbatim) — whether a holomorphic function could be differentiable once without higher derivatives existing, an answer of "yes" confirming COMPLEX-DIFFERENTIABILITY-ASSUMED-TO-HAVE-REAL-VARIABLE-GAPS'),
  },
  {
    conceptId: HIGHER_DERIVATIVES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'To bound |f⁽ⁿ⁾(z₀)| using Cauchy\'s inequality, is it necessary to know f\'s explicit formula?',
    choices: [
      { text: "No — for f holomorphic with |f(z)| less than or equal to 10 on |z|=2 (M=10, R=2), Cauchy's inequality gives |f'''(0)| less than or equal to (3! times 10)/(2^3)=7.5, a genuine bound obtained entirely from M=10, with no need to know f's explicit formula or compute the derivative directly", isCorrect: true },
      { text: "Yes, bounding |f-n(z0)| via Cauchy's inequality requires knowing f's explicit formula and computing the derivative directly", isCorrect: false, misconceptionId: `${HIGHER_DERIVATIVES}:MC-3` },
      { text: "Since 'bounding a derivative' intuitively suggests needing to compute that derivative first, Cauchy's inequality should be expected to require the explicit formula for f", isCorrect: false, misconceptionId: `${HIGHER_DERIVATIVES}:MC-3` },
    ],
    targetedMisconceptions: [`${HIGHER_DERIVATIVES}:MC-3`],
    source: eb(HIGHER_DERIVATIVES, 'Discovery Question 3 as a detection probe (verbatim) — whether Cauchy\'s inequality requires f\'s explicit formula, an answer of "yes" confirming CAUCHYS-INEQUALITY-ASSUMED-TO-REQUIRE-EXPLICIT-FORMULA'),
  },
]
