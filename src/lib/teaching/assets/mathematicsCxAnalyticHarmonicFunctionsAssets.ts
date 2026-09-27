/**
 * Batch: analytic-functions, harmonic-functions (math.cx) — 3/31 -> 5/31.
 *
 * Fresh Phase 0 frontier recompute after cauchy-riemann was authored: 2
 * concepts became simultaneously ready. Both are authored in this batch
 * since only 2 are ready — analytic-functions (unlocks cauchy-theorem,
 * power-series-cx, and by the KG's requires-graph also opens
 * complex-integration, singularities, maximum-modulus, and
 * conformal-mapping) and harmonic-functions (unlocks none further within
 * math.cx).
 * Transcribed from their frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.cx.{analytic-functions,
 * harmonic-functions}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching this domain's established
 * convention for expert/research-tier content (both are "expert" tier).
 *
 * harmonic-functions' cross-link (math.de.harmonic-functions) is
 * authored — a genuine transfer target. analytic-functions declares
 * none.
 *
 * Both EB entries register exactly 3 formal misconceptions each (full
 * contract, no retargeting needed).
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const ANALYTIC_FUNCTIONS = 'math.cx.analytic-functions'
const HARMONIC_FUNCTIONS = 'math.cx.harmonic-functions'

export const MATHEMATICS_CX_ANALYTIC_HARMONIC_FUNCTIONS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ANALYTIC_FUNCTIONS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      '"HOLOMORPHIC" IS AN OPEN-SET PROPERTY — NEVER SATISFIED BY DIFFERENTIABILITY AT A SINGLE '
      + 'POINT: for f(z)=|z|²=x²+y²: u=x²+y², v=0; CR requires 2x=0 and 2y=0, BOTH true only at '
      + '(0,0). f IS complex-differentiable at z=0 — but checking ANY nearby point (e.g. z=0.01) '
      + 'shows CR fails there too, so NO open disk around 0, however small, consists entirely of '
      + 'differentiable points. Believing complex differentiability at a single point is '
      + 'sufficient for "holomorphic" is WRONG — holomorphic is DEFINED as a property of an open '
      + 'set (f\' exists at EVERY point of some open U); a single isolated point is never an open '
      + 'set, so pointwise differentiability never by itself establishes holomorphy.\n\n'
      + 'HOLOMORPHIC ⟺ ANALYTIC IS AN EXACT EQUIVALENCE IN C — NEVER THE SAME GAP AS R: in real '
      + 'analysis, g(x)=e^(−1/x²) (with g(0)=0) is C^∞ yet its Taylor series at 0 is identically '
      + 'zero, NOT matching g(x) for x≠0 — a genuine smooth-but-not-real-analytic gap. NO such gap '
      + 'exists in C: if a complex function is differentiable ONCE on an open set, it is '
      + 'AUTOMATICALLY infinitely complex-differentiable AND equals its own convergent power '
      + 'series there. Believing a complex function could be "infinitely complex-differentiable" '
      + 'on an open set without a convergent power series representation, by analogy with the real '
      + 'case, is WRONG — complex differentiability, requiring the SAME limit from EVERY direction '
      + 'in the plane, is a far more restrictive condition than real differentiability, restrictive '
      + 'enough to force the full power-series conclusion for free.\n\n'
      + '"ENTIRE" MEANS HOLOMORPHIC ON ALL OF C — NEVER THE SAME AS "ANALYTIC" IN GENERAL: '
      + 'f(z)=z², e^z, and all polynomials are ENTIRE (holomorphic on the WHOLE of C). By contrast, '
      + 'f(z)=1/z is ANALYTIC at every point of C\\{0} but UNDEFINED at z=0 — holomorphic on the '
      + 'open set C\\{0}, NOT entire, because "entire" specifically requires the domain to BE all '
      + 'of C. Conflating "entire" with "analytic in general" is WRONG — "analytic" is always '
      + 'relative to a stated domain (possibly a proper subset of C), while "entire" specifically '
      + 'asserts that domain is the ENTIRE complex plane.',
    targetedMisconceptions: [`${ANALYTIC_FUNCTIONS}:MC-1`, `${ANALYTIC_FUNCTIONS}:MC-2`, `${ANALYTIC_FUNCTIONS}:MC-3`],
    source: eb(ANALYTIC_FUNCTIONS, '"holomorphic" being an open-set property never satisfied by differentiability at a single point, holomorphic equals analytic being an exact equivalence in C never the same gap as R, and "entire" meaning holomorphic on all of C never the same as "analytic" in general'),
  },
  {
    conceptId: HARMONIC_FUNCTIONS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE FORWARD DIRECTION IS ALREADY PROVEN — NEVER RE-DERIVE IT HERE: it is already '
      + 'established, via CR plus equality of mixed partials, that if f=u+iv is holomorphic, BOTH '
      + 'u and v are harmonic. For f(z)=e^z=e^x·cos(y)+i·e^x·sin(y): this ALREADY-established '
      + 'result guarantees u=e^x·cos(y) and v=e^x·sin(y) are both harmonic, with NO new '
      + 'verification needed. Believing this concept must re-derive that holomorphic functions '
      + 'have harmonic components is WRONG — that direction is fully established elsewhere and '
      + 'should be directly REUSED; this concept\'s genuinely new content is the CONVERSE: given '
      + 'only a harmonic u, does a matching holomorphic f always exist?\n\n'
      + 'THE CR-INTEGRATION RECIPE\'S SUCCESS IS GUARANTEED BY u\'S HARMONICITY — NEVER '
      + 'COINCIDENTAL: for a general harmonic u: Step 1 integrates v_y=u_x partially in y, giving '
      + 'v=∫u_x dy+h(x). Step 2 requires v_x=−u_y, giving h\'(x)=−u_y−∫u_xx dy — and for h(x) to '
      + 'EXIST, the right side must depend only on x, which (differentiating with respect to y and '
      + 'requiring it to vanish) reduces EXACTLY to u_xx+u_yy=0 — u\'s own harmonicity. Believing '
      + 'the recipe happens to work for particular examples by luck, rather than being GUARANTEED '
      + 'by harmonicity, is WRONG — the recipe\'s internal consistency requirement IS u\'s '
      + 'harmonicity, precisely, not an incidental fact that merely correlates with success.\n\n'
      + 'THE "LOCALLY" QUALIFIER REFLECTS A GENUINE OBSTRUCTION — NEVER ROUTINE MATHEMATICAL '
      + 'CAUTION: for u=log√(x²+y²) on the annulus {1<√(x²+y²)<2}: u IS harmonic (u_xx+u_yy=0), '
      + 'and the recipe LOCALLY produces v=θ=arg(z) — but tracking v continuously around a FULL '
      + 'loop encircling the origin shows v INCREASES by 2π upon return, so NO single-valued '
      + 'continuous v exists on the WHOLE annulus. On a small disc entirely within the annulus '
      + '(avoiding a full loop), the SAME local recipe DOES produce a genuine single-valued '
      + 'conjugate. Believing "locally" is routine mathematical fine print is WRONG — a GLOBAL '
      + 'harmonic conjugate can genuinely fail to exist on a domain with a hole; only on a domain '
      + 'WITHOUT holes (simply connected, like a disc) is a global conjugate guaranteed.',
    targetedMisconceptions: [`${HARMONIC_FUNCTIONS}:MC-1`, `${HARMONIC_FUNCTIONS}:MC-2`, `${HARMONIC_FUNCTIONS}:MC-3`],
    source: eb(HARMONIC_FUNCTIONS, 'the forward direction already being proven never re-derived here, the CR-integration recipe\'s success being guaranteed by u\'s harmonicity never coincidental, and the "locally" qualifier reflecting a genuine obstruction never routine mathematical caution'),
  },
]

export const MATHEMATICS_CX_ANALYTIC_HARMONIC_FUNCTIONS_PROBES: SeedProbe[] = [
  // ANALYTIC_FUNCTIONS
  {
    conceptId: ANALYTIC_FUNCTIONS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is a function differentiable at exactly one point automatically holomorphic at that point?',
    choices: [
      { text: "No — for f(z)=|z|^2, CR holds only at z=0; checking any nearby point (e.g. z=0.01) shows CR fails there too, so no open disk around 0 consists entirely of differentiable points; holomorphic is defined as a property of an open set, never satisfied by a single isolated point", isCorrect: true },
      { text: "Yes, a function differentiable at exactly one point is automatically holomorphic at that point", isCorrect: false, misconceptionId: `${ANALYTIC_FUNCTIONS}:MC-1` },
      { text: "Since passing the complex-differentiability check at a point already feels like a strong positive result, it should be treated as sufficient for the stronger claim of holomorphy there", isCorrect: false, misconceptionId: `${ANALYTIC_FUNCTIONS}:MC-1` },
    ],
    targetedMisconceptions: [`${ANALYTIC_FUNCTIONS}:MC-1`],
    source: eb(ANALYTIC_FUNCTIONS, 'Discovery Question 1 as a detection probe (verbatim) — whether differentiability at one point is automatically holomorphic there, an answer of "yes" confirming POINTWISE-DIFFERENTIABLE-IS-HOLOMORPHIC'),
  },
  {
    conceptId: ANALYTIC_FUNCTIONS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Could a complex function be infinitely complex-differentiable on an open set without equaling its own power series there?',
    choices: [
      { text: "No — unlike real analysis, where g(x)=e^(-1/x^2) is C-infinity yet its Taylor series at 0 is identically zero, no such gap exists in C: if a complex function is differentiable once on an open set, it is automatically infinitely complex-differentiable AND equals its own convergent power series there", isCorrect: true },
      { text: "Yes, a complex function could be infinitely complex-differentiable on an open set without having a convergent power series representation, by analogy with the real case", isCorrect: false, misconceptionId: `${ANALYTIC_FUNCTIONS}:MC-2` },
      { text: "Since the real-analysis smooth-but-not-analytic gap is a well-established fact, that same gap should be expected to transfer directly to the complex setting", isCorrect: false, misconceptionId: `${ANALYTIC_FUNCTIONS}:MC-2` },
    ],
    targetedMisconceptions: [`${ANALYTIC_FUNCTIONS}:MC-2`],
    source: eb(ANALYTIC_FUNCTIONS, 'Discovery Question 2 as a detection probe (verbatim) — whether a complex function could be infinitely differentiable without a power series, an answer of "yes" confirming REAL-SMOOTH-GAP-TRANSFERS-TO-COMPLEX'),
  },
  {
    conceptId: ANALYTIC_FUNCTIONS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is 1/z entire?',
    choices: [
      { text: "No — 1/z is analytic at every point of C minus {0} but undefined at z=0, holomorphic on the open set C minus {0}, not entire, because 'entire' specifically requires the domain to be ALL of C; 'analytic' is always relative to a stated domain, while 'entire' asserts that domain is the entire complex plane", isCorrect: true },
      { text: "Yes, 1/z is entire since it is analytic everywhere it is defined", isCorrect: false, misconceptionId: `${ANALYTIC_FUNCTIONS}:MC-3` },
      { text: "Since 1/z is analytic at every point where it's defined, 'analytic everywhere it's defined' should be treated as equivalent to 'entire'", isCorrect: false, misconceptionId: `${ANALYTIC_FUNCTIONS}:MC-3` },
    ],
    targetedMisconceptions: [`${ANALYTIC_FUNCTIONS}:MC-3`],
    source: eb(ANALYTIC_FUNCTIONS, 'Discovery Question 3 as a detection probe (verbatim) — whether 1/z is entire, an answer of "yes" confirming ENTIRE-MEANS-ANALYTIC-SAME-DOMAIN'),
  },
  // HARMONIC_FUNCTIONS
  {
    conceptId: HARMONIC_FUNCTIONS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does this concept need to re-derive that holomorphic functions have harmonic components, or can that be directly reused?',
    choices: [
      { text: "It can be directly reused — that holomorphic implies harmonic components is already established via CR plus equality of mixed partials; for f(z)=e^z, this already-established result guarantees u and v are both harmonic with no new verification needed, since this concept's genuinely new content is the converse direction", isCorrect: true },
      { text: "This concept must re-derive from scratch that holomorphic functions have harmonic components", isCorrect: false, misconceptionId: `${HARMONIC_FUNCTIONS}:MC-1` },
      { text: "Since new concepts are typically expected to establish their own results independently, the holomorphic-implies-harmonic direction should be re-proven here rather than cited", isCorrect: false, misconceptionId: `${HARMONIC_FUNCTIONS}:MC-1` },
    ],
    targetedMisconceptions: [`${HARMONIC_FUNCTIONS}:MC-1`],
    source: eb(HARMONIC_FUNCTIONS, 'Discovery Question 1 as a detection probe (verbatim) — whether the forward direction needs re-derivation, an answer requiring re-derivation confirming FORWARD-DIRECTION-ASSUMED-TO-NEED-RE-DERIVATION'),
  },
  {
    conceptId: HARMONIC_FUNCTIONS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the CR-integration recipe happen to work for some harmonic functions and fail for others, or is its success guaranteed by harmonicity itself?',
    choices: [
      { text: "Guaranteed by harmonicity itself — the recipe's Step 2 consistency requirement, worked out algebraically, reduces exactly to u_xx+u_yy=0, which is precisely u's own harmonicity; the recipe's success is not an incidental correlation but the exact condition harmonicity provides", isCorrect: true },
      { text: "The recipe happens to succeed for some harmonic functions by luck and could fail for others", isCorrect: false, misconceptionId: `${HARMONIC_FUNCTIONS}:MC-2` },
      { text: "Since the cauchy-riemann concept's own example only applied the recipe once without proving general success, its success on other examples should be treated as unverified or coincidental", isCorrect: false, misconceptionId: `${HARMONIC_FUNCTIONS}:MC-2` },
    ],
    targetedMisconceptions: [`${HARMONIC_FUNCTIONS}:MC-2`],
    source: eb(HARMONIC_FUNCTIONS, 'Discovery Question 2 as a detection probe (verbatim) — whether the CR-recipe\'s success is coincidental or guaranteed, an answer treating it as coincidental confirming CR-RECIPE-SUCCESS-ASSUMED-COINCIDENTAL'),
  },
  {
    conceptId: HARMONIC_FUNCTIONS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the theorem\'s "locally" qualifier just routine mathematical caution, or does it reflect a genuine failure that can occur on domains with holes?',
    choices: [
      { text: "A genuine failure — for u=log of the modulus on an annulus, u is harmonic and the recipe locally produces v=arg(z), but tracking v around a full loop encircling the origin shows v increases by 2 pi upon return, so no single-valued continuous v exists on the whole annulus; only a simply connected domain guarantees a global conjugate", isCorrect: true },
      { text: "The 'locally' qualifier is just routine mathematical caution with no concrete failure behind it", isCorrect: false, misconceptionId: `${HARMONIC_FUNCTIONS}:MC-3` },
      { text: "Since qualifiers like 'locally' in theorem statements are often boilerplate hedging, this one should be treated the same way without checking for an actual counterexample", isCorrect: false, misconceptionId: `${HARMONIC_FUNCTIONS}:MC-3` },
    ],
    targetedMisconceptions: [`${HARMONIC_FUNCTIONS}:MC-3`],
    source: eb(HARMONIC_FUNCTIONS, 'Discovery Question 3 as a detection probe (verbatim) — whether "locally" is routine caution or a genuine obstruction, an answer treating it as routine confirming LOCALLY-QUALIFIER-ASSUMED-ROUTINE'),
  },
]
