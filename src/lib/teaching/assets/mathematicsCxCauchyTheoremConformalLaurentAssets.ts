/**
 * Batch: cauchy-theorem, conformal-mapping, laurent-series (math.cx) —
 * 8/31 -> 11/31.
 *
 * Fresh Phase 0 frontier recompute after singularities, power-series-cx,
 * and complex-integration were authored: 6 concepts became simultaneously
 * ready. This batch prioritizes cauchy-theorem (unlocks
 * cauchy-integral-formula, cauchy-goursat), conformal-mapping (unlocks
 * riemann-mapping via mobius-transformation's own chain), and
 * laurent-series (unlocks residue-theorem, continuing toward residue
 * calculus) — deferring essential-singularity, identity-theorem, and
 * poles (each unlocking 0-1 further concepts) for subsequent batches.
 * Transcribed from their frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.cx.{cauchy-theorem,conformal-mapping,
 * laurent-series}.md.
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

const CAUCHY_THEOREM = 'math.cx.cauchy-theorem'
const CONFORMAL_MAPPING = 'math.cx.conformal-mapping'
const LAURENT_SERIES = 'math.cx.laurent-series'

export const MATHEMATICS_CX_CAUCHY_THEOREM_CONFORMAL_LAURENT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CAUCHY_THEOREM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'BOTH HYPOTHESES MUST BE VERIFIED TOGETHER — NEVER CHECK ONLY HOLOMORPHY WHILE OVERLOOKING '
      + 'SIMPLE-CONNECTEDNESS: for f(z)=1/z on D=C\\{0} (the punctured plane): f IS holomorphic '
      + 'everywhere D is DEFINED — yet D itself is NOT simply connected (a loop around the '
      + 'puncture cannot shrink to a point without leaving D). Taking C = the unit circle: the '
      + 'contour integral of 1/z equals 2πi≠0 — the theorem\'s conclusion GENUINELY FAILS. '
      + 'Believing that since f is holomorphic everywhere the domain is defined, Cauchy\'s Theorem '
      + 'must apply is WRONG — TWO hypotheses are always checked together: holomorphic throughout '
      + 'D, AND D itself simply connected; neither implies the other.\n\n'
      + 'A SINGULARITY ANYWHERE IN C NEVER DISQUALIFIES A FUNCTION FROM CAUCHY\'S THEOREM ON A '
      + 'SPECIFIC DOMAIN AVOIDING IT: the SAME function f(z)=1/z, restricted to D\'={z:Re(z)>0} '
      + '(the right half-plane, genuinely simply connected, avoiding z=0 entirely): f IS '
      + 'holomorphic throughout D\', and Cauchy\'s Theorem correctly applies — any closed curve '
      + 'entirely within D\' gives a zero integral. Believing a function with ANY singularity '
      + 'anywhere in the complex plane can NEVER satisfy Cauchy\'s Theorem\'s hypotheses is WRONG — '
      + 'check the SPECIFIC domain and curve of interest; a function can be perfectly holomorphic '
      + 'on a smaller domain even with singularities elsewhere, outside that domain.\n\n'
      + 'PATH-INDEPENDENCE NEVER EXTENDS ACROSS A SINGULARITY OR A NON-SIMPLY-CONNECTED DOMAIN: '
      + 'for two curves C₁,C₂ with a singularity of f sitting BETWEEN them: the combined closed '
      + 'curve C₁*(−C₂) ENCIRCLES that singularity, so the domain relevant to that combined curve '
      + 'is NOT simply connected, and Cauchy\'s Theorem\'s hypothesis fails for it. Applying '
      + 'path-independence (assuming the two path integrals are equal) regardless of a singularity '
      + 'lying between the paths is WRONG — the "combined closed curve" argument requires that '
      + 'combined curve to lie ENTIRELY within a genuinely simply connected region; a singularity '
      + 'between the paths breaks this requirement.',
    targetedMisconceptions: [`${CAUCHY_THEOREM}:MC-1`, `${CAUCHY_THEOREM}:MC-2`, `${CAUCHY_THEOREM}:MC-3`],
    source: eb(CAUCHY_THEOREM, 'Core Understanding — both hypotheses needing to be verified together never checking only holomorphy while overlooking simple-connectedness, a singularity anywhere in C never disqualifying a function from Cauchy\'s Theorem on a specific domain avoiding it, and path-independence never extending across a singularity or a non-simply-connected domain'),
  },
  {
    conceptId: CONFORMAL_MAPPING, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'CONFORMALITY FAILS EXACTLY WHERE f\'(z₀)=0 — NEVER GUARANTEED EVERYWHERE ON A HOLOMORPHIC '
      + 'DOMAIN: for f(z)=z², f\'(z)=2z: at z₀=0, f\'(0)=0 — conformality FAILS; two rays at '
      + 'angles θ₁,θ₂ map to rays at 2θ₁,2θ₂, so the angle between them DOUBLES, directly '
      + 'violating angle preservation. At z₀=1, f\'(1)=2≠0 — conformal there, preserving exactly '
      + 'the angle between any two curves crossing at z=1. Believing every holomorphic function is '
      + 'conformal at every point of its domain is WRONG — conformality genuinely fails at '
      + 'critical points where f\'=0.\n\n'
      + 'THE JACOBIAN IS FORCED INTO A ROTATION-DILATION FORM — NEVER AN ARBITRARY 2×2 MATRIX: for '
      + 'f(z)=z²=(x²−y²)+i(2xy) at z₀=x₀+iy₀: the real Jacobian is exactly of the form with rows '
      + '(a,−b) and (b,a) where a=2x₀, b=2y₀ — a direct consequence of the Cauchy-Riemann '
      + 'equations. Its scaling factor √(a²+b²)=2|z₀| matches |f\'(z₀)|=|2z₀| exactly. Believing '
      + 'a conformal map\'s local Jacobian could be any arbitrary real 2×2 matrix, stretching x '
      + 'and y differently, is WRONG — holomorphy forces the Jacobian into this exact '
      + 'rotation-dilation structure; an arbitrary real-differentiable map has no such '
      + 'constraint.\n\n'
      + 'CONFORMAL MAPS PRESERVE ONLY ANGLES — NEVER DISTANCES OR AREAS: at z₀=1 where f(z)=z² is '
      + 'conformal (f\'(1)=2): the ANGLE between any two curves crossing at z=1 is preserved '
      + 'EXACTLY, but LENGTHS near z=1 are stretched by the factor |f\'(1)|=2, and AREAS by '
      + '|f\'(1)|²=4. Believing a conformal map preserves distances or areas in addition to angles '
      + 'is WRONG — it generally distorts both lengths and areas by locally varying scale factors; '
      + 'only angles are preserved.',
    targetedMisconceptions: [`${CONFORMAL_MAPPING}:MC-1`, `${CONFORMAL_MAPPING}:MC-2`, `${CONFORMAL_MAPPING}:MC-3`],
    source: eb(CONFORMAL_MAPPING, 'Core Understanding — conformality failing exactly where f\'(z0)=0 never guaranteed everywhere on a holomorphic domain, the Jacobian being forced into a rotation-dilation form never an arbitrary 2x2 matrix, and conformal maps preserving only angles never distances or areas'),
  },
  {
    conceptId: LAURENT_SERIES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE PRINCIPAL PART IS THE ONLY GENUINELY NEW INGREDIENT — NEVER AN UNRELATED NEW OBJECT: '
      + 'for f(z)=sin(z)/z at z₀=0: substituting sin(z)=z−z³/3!+z⁵/5!−⋯ and dividing by z gives '
      + '1−z²/3!+z⁴/5!−⋯ — a series with NO negative-power terms at all. This IS literally an '
      + 'ordinary power series; the analytic part (n≥0) behaves EXACTLY like one, '
      + 'radius-of-convergence machinery included. Believing a Laurent series requires entirely '
      + 'new manipulation techniques unrelated to ordinary power series is WRONG — only allowing '
      + 'negative powers (the principal part) is new; everything else carries over unchanged.\n\n'
      + 'LAURENT COEFFICIENTS COME FROM ALGEBRAIC SUBSTITUTION — NEVER ALWAYS THE CONTOUR '
      + 'INTEGRAL: for f(z)=e^(1/z) at z₀=0: substituting w=1/z into the KNOWN series '
      + 'e^w=Σwⁿ/n! gives e^(1/z)=1+1/z+1/(2z²)+1/(6z³)+⋯ DIRECTLY — no contour integral was ever '
      + 'evaluated. Believing every Laurent coefficient must be computed by directly evaluating '
      + 'the contour-integral formula is WRONG — that formula is the DEFINITION guaranteeing '
      + 'uniqueness, but algebraic substitution of familiar series (geometric, Taylor) is the '
      + 'standard, far faster practical technique.\n\n'
      + 'A FINITE PRINCIPAL PART OF ANY LENGTH MEANS A POLE — NEVER ESSENTIAL: for f(z)=1/z²: the '
      + 'Laurent series is the single term z⁻² — principal part {z⁻²}, FINITELY many terms (just '
      + 'one), most negative exponent −2, classified as a POLE of order 2. Contrast e^(1/z)\'s '
      + 'principal part {z⁻¹,z⁻²,z⁻³,…} — INFINITELY many nonzero terms, classified essential. '
      + 'Believing a principal part with several nonzero terms (but still finitely many) could '
      + 'indicate an essential singularity is WRONG — ANY finite principal part, regardless of how '
      + 'many terms it has, ALWAYS means a pole; only a genuinely INFINITE principal part means '
      + 'essential.',
    targetedMisconceptions: [`${LAURENT_SERIES}:MC-1`, `${LAURENT_SERIES}:MC-2`, `${LAURENT_SERIES}:MC-3`],
    source: eb(LAURENT_SERIES, 'Core Understanding — the principal part being the only genuinely new ingredient never an unrelated new object, Laurent coefficients coming from algebraic substitution never always the contour integral, and a finite principal part of any length meaning a pole never essential'),
  },
]

export const MATHEMATICS_CX_CAUCHY_THEOREM_CONFORMAL_LAURENT_PROBES: SeedProbe[] = [
  // CAUCHY_THEOREM
  {
    conceptId: CAUCHY_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Since f is holomorphic everywhere on this domain, does Cauchy\'s Theorem guarantee the integral is zero, without checking anything else about the domain?',
    choices: [
      { text: "No — for f(z)=1/z on the punctured plane C minus {0}, f is holomorphic everywhere the domain is defined, but the domain is NOT simply connected, and the contour integral around the unit circle equals 2*pi*i, not zero; TWO hypotheses are always checked together, holomorphic AND simply connected, neither implies the other", isCorrect: true },
      { text: "Yes, holomorphy alone on the stated domain guarantees Cauchy's Theorem applies and the integral is zero", isCorrect: false, misconceptionId: `${CAUCHY_THEOREM}:MC-1` },
      { text: "Since 'holomorphic on D' is the condition most often emphasized, verifying it alone should be treated as sufficient without separately checking whether D is simply connected", isCorrect: false, misconceptionId: `${CAUCHY_THEOREM}:MC-1` },
    ],
    targetedMisconceptions: [`${CAUCHY_THEOREM}:MC-1`],
    source: eb(CAUCHY_THEOREM, 'Discovery Question 1 as a detection probe (verbatim) — whether holomorphy alone guarantees the theorem applies, an answer of "yes" confirming SIMPLY-CONNECTED-HYPOTHESIS-OVERLOOKED'),
  },
  {
    conceptId: CAUCHY_THEOREM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does a function with a singularity somewhere in the complex plane mean Cauchy\'s Theorem can never apply to it, on any domain?',
    choices: [
      { text: "No — the same function f(z)=1/z, restricted to the right half-plane (genuinely simply connected, avoiding z=0 entirely), is holomorphic throughout that domain and Cauchy's Theorem correctly applies there; check the SPECIFIC domain and curve of interest, since singularities elsewhere are irrelevant", isCorrect: true },
      { text: "Yes, a function with any singularity anywhere in the complex plane can never satisfy Cauchy's Theorem's hypotheses on any domain", isCorrect: false, misconceptionId: `${CAUCHY_THEOREM}:MC-2` },
      { text: "Since a function with a singularity somewhere feels generally 'bad-behaved', that should be treated as disqualifying it from ever satisfying Cauchy's Theorem's hypotheses", isCorrect: false, misconceptionId: `${CAUCHY_THEOREM}:MC-2` },
    ],
    targetedMisconceptions: [`${CAUCHY_THEOREM}:MC-2`],
    source: eb(CAUCHY_THEOREM, 'Discovery Question 2 as a detection probe (verbatim) — whether a singularity anywhere disqualifies a function from the theorem on any domain, an answer of "yes" confirming SINGLE-SINGULARITY-ANYWHERE-DISQUALIFIES-ENTIRE-FUNCTION'),
  },
  {
    conceptId: CAUCHY_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If a singularity lies between two paths, do the path integrals still have to agree?',
    choices: [
      { text: "No — the combined closed curve C1*(-C2) encircles that singularity, so the region relevant to the combined curve is not simply connected, and Cauchy's Theorem's hypothesis fails for it; path-independence requires the combined curve to lie entirely within a genuinely simply connected region", isCorrect: true },
      { text: "Yes, path-independence still holds even when a singularity lies between the two paths", isCorrect: false, misconceptionId: `${CAUCHY_THEOREM}:MC-3` },
      { text: "Since path-independence is a convenient shortcut once established, it should be applied reflexively between any two paths without re-checking whether a singularity sits between them", isCorrect: false, misconceptionId: `${CAUCHY_THEOREM}:MC-3` },
    ],
    targetedMisconceptions: [`${CAUCHY_THEOREM}:MC-3`],
    source: eb(CAUCHY_THEOREM, 'Discovery Question 3 as a detection probe (verbatim) — whether path integrals must agree when a singularity lies between the paths, an answer of "yes" confirming PATH-INDEPENDENCE-ASSUMED-FOR-NON-SIMPLY-CONNECTED-DOMAINS'),
  },
  // CONFORMAL_MAPPING
  {
    conceptId: CONFORMAL_MAPPING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is every holomorphic function conformal everywhere on its domain?',
    choices: [
      { text: "No — for f(z)=z^2, f'(z)=2z, at z0=0, f'(0)=0 and conformality fails: two rays at angles theta1, theta2 map to rays at 2*theta1, 2*theta2, doubling the angle between them; at z0=1, f'(1)=2 is not zero, so conformality holds there. Conformality genuinely fails at critical points where f'=0", isCorrect: true },
      { text: "Yes, every holomorphic function is conformal at every point of its domain", isCorrect: false, misconceptionId: `${CONFORMAL_MAPPING}:MC-1` },
      { text: "Since 'holomorphic' and 'conformal' are often used together, they should be treated as effectively synonymous properties of the same domain", isCorrect: false, misconceptionId: `${CONFORMAL_MAPPING}:MC-1` },
    ],
    targetedMisconceptions: [`${CONFORMAL_MAPPING}:MC-1`],
    source: eb(CONFORMAL_MAPPING, 'Discovery Question 1 as a detection probe (verbatim) — whether every holomorphic function is conformal everywhere, an answer of "yes" confirming HOLOMORPHIC-ASSUMED-CONFORMAL-EVERYWHERE'),
  },
  {
    conceptId: CONFORMAL_MAPPING, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Could a conformal map\'s local Jacobian be any arbitrary 2x2 real matrix, stretching x and y differently?',
    choices: [
      { text: "No — for f(z)=z^2 at z0=x0+iy0, the real Jacobian is exactly of the rotation-dilation form (rows (a,-b) and (b,a) with a=2x0, b=2y0), a direct consequence of the Cauchy-Riemann equations, with scaling factor matching |f'(z0)| exactly; holomorphy forces this exact structure, never an arbitrary real matrix", isCorrect: true },
      { text: "Yes, a conformal map's local Jacobian could be any arbitrary real 2x2 matrix, stretching x and y differently", isCorrect: false, misconceptionId: `${CONFORMAL_MAPPING}:MC-2` },
      { text: "Since a general real-analysis background gives no special reason to expect a constrained Jacobian, a conformal map's local Jacobian should be treated as an unconstrained real 2x2 matrix", isCorrect: false, misconceptionId: `${CONFORMAL_MAPPING}:MC-2` },
    ],
    targetedMisconceptions: [`${CONFORMAL_MAPPING}:MC-2`],
    source: eb(CONFORMAL_MAPPING, 'Discovery Question 2 as a detection probe (verbatim) — whether a conformal map\'s Jacobian could be an arbitrary matrix, an answer of "yes" confirming CONFORMAL-JACOBIAN-ASSUMED-ARBITRARY'),
  },
  {
    conceptId: CONFORMAL_MAPPING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does a conformal map preserve lengths and areas, in addition to angles?',
    choices: [
      { text: "No — at z0=1 where f(z)=z^2 is conformal, the angle between any two curves crossing at z=1 is preserved exactly, but lengths near z=1 are stretched by |f'(1)|=2 and areas by |f'(1)|^2=4; a conformal map generally distorts both lengths and areas, preserving only angles", isCorrect: true },
      { text: "Yes, a conformal map preserves distances and areas in addition to angles", isCorrect: false, misconceptionId: `${CONFORMAL_MAPPING}:MC-3` },
      { text: "Since 'preserving' in everyday usage suggests a broad, all-encompassing preservation, a conformal map's angle preservation should be expected to extend to lengths and areas too", isCorrect: false, misconceptionId: `${CONFORMAL_MAPPING}:MC-3` },
    ],
    targetedMisconceptions: [`${CONFORMAL_MAPPING}:MC-3`],
    source: eb(CONFORMAL_MAPPING, 'Discovery Question 3 as a detection probe (verbatim) — whether a conformal map preserves lengths and areas in addition to angles, an answer of "yes" confirming CONFORMAL-ASSUMED-TO-PRESERVE-LENGTHS-AND-AREAS'),
  },
  // LAURENT_SERIES
  {
    conceptId: LAURENT_SERIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is a Laurent series a fundamentally different kind of object from an ordinary power series, or does most of its machinery carry over unchanged?',
    choices: [
      { text: "Most of its machinery carries over unchanged — for f(z)=sin(z)/z at 0, substituting the known sine series and dividing by z gives a series with no negative-power terms at all, literally an ordinary power series; only allowing negative powers (the principal part) is genuinely new", isCorrect: true },
      { text: "A Laurent series requires entirely new manipulation techniques unrelated to ordinary power series", isCorrect: false, misconceptionId: `${LAURENT_SERIES}:MC-1` },
      { text: "Since the double-infinite summation notation for a Laurent series looks unfamiliar, it should be treated as a wholly different mathematical object requiring new techniques", isCorrect: false, misconceptionId: `${LAURENT_SERIES}:MC-1` },
    ],
    targetedMisconceptions: [`${LAURENT_SERIES}:MC-1`],
    source: eb(LAURENT_SERIES, 'Discovery Question 1 as a detection probe (verbatim) — whether a Laurent series is fundamentally different from a power series, an answer treating it as fundamentally different confirming LAURENT-SERIES-AS-UNRELATED-NEW-OBJECT'),
  },
  {
    conceptId: LAURENT_SERIES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Must every Laurent series coefficient be found by directly evaluating the contour integral formula?',
    choices: [
      { text: "No — for f(z)=e^(1/z) at 0, substituting w=1/z into the known exponential series gives the Laurent series directly, with no contour integral ever evaluated; the integral formula is the definition guaranteeing uniqueness, but algebraic substitution of familiar series is the standard, faster practical technique", isCorrect: true },
      { text: "Yes, every Laurent series coefficient must be computed by directly evaluating the contour integral formula", isCorrect: false, misconceptionId: `${LAURENT_SERIES}:MC-3` },
      { text: "Since the coefficient formula is introduced as the definition of a Laurent series, it should be treated as the required computational method every time", isCorrect: false, misconceptionId: `${LAURENT_SERIES}:MC-3` },
    ],
    targetedMisconceptions: [`${LAURENT_SERIES}:MC-3`],
    source: eb(LAURENT_SERIES, 'Discovery Question 2 as a detection probe (verbatim) — whether every Laurent coefficient must come from the contour integral, an answer of "yes" confirming LAURENT-COEFFICIENTS-REQUIRE-CONTOUR-INTEGRATION'),
  },
  {
    conceptId: LAURENT_SERIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If a function\'s Laurent series has nonzero coefficients at z⁻¹ and z⁻³ but nothing more negative, could it still be an essential singularity?',
    choices: [
      { text: "No — for f(z)=1/z^2, the principal part {z^-2} has finitely many terms and is classified as a pole; any FINITE principal part, regardless of how many terms it has, always means a pole, contrasted with e^(1/z)'s infinitely many nonzero terms, which is essential", isCorrect: true },
      { text: "Yes, a principal part with several nonzero terms (but still finitely many) could indicate an essential singularity", isCorrect: false, misconceptionId: `${LAURENT_SERIES}:MC-2` },
      { text: "Since 'several terms' in the principal part feels closer to 'infinitely many' than to a single-term pole, a multi-term but finite principal part should be classified as essential", isCorrect: false, misconceptionId: `${LAURENT_SERIES}:MC-2` },
    ],
    targetedMisconceptions: [`${LAURENT_SERIES}:MC-2`],
    source: eb(LAURENT_SERIES, 'Discovery Question 3 as a detection probe (verbatim) — whether a finite but multi-term principal part could be essential, an answer of "yes" confirming FINITE-PRINCIPAL-PART-MISCLASSIFIED-AS-ESSENTIAL'),
  },
]
