/**
 * Batch: product-space, quotient-space, separation-axioms, smooth-manifold
 * (math.top) — 19/23 -> 23/23, CLOSING THE ENTIRE math.top DOMAIN.
 *
 * Fresh Phase 0 frontier recompute after cohomology, homotopy-equivalence,
 * and tychonoff were authored: all 4 remaining math.top concepts stayed
 * simultaneously ready. Since this closes the entire domain outright, all
 * 4 are authored together in this single batch (precedent: prior campaigns
 * closing a domain's final handful of concepts in one batch rather than
 * splitting an arbitrary 3+1).
 * Transcribed from their frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.top.{product-space,quotient-space,
 * separation-axioms,smooth-manifold}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching this domain's established
 * baseline.
 *
 * quotient-space's cross-link (math.abst.quotient-group) and
 * smooth-manifold's cross-link (math.geom.differential-geometry-curves)
 * are both authored — genuine transfer targets. product-space and
 * separation-axioms declare none.
 *
 * All 4 EB entries register exactly 3 formal misconceptions each (full
 * contract, no retargeting needed).
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const PRODUCT_SPACE = 'math.top.product-space'
const QUOTIENT_SPACE = 'math.top.quotient-space'
const SEPARATION_AXIOMS = 'math.top.separation-axioms'
const SMOOTH_MANIFOLD = 'math.top.smooth-manifold'

export const MATHEMATICS_TOP_PRODUCT_QUOTIENT_SEPARATION_SMOOTH_MANIFOLD_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PRODUCT_SPACE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A BASIS NEED NOT LOOK RECTANGULAR TO GENERATE THE PRODUCT TOPOLOGY — NEVER A '
      + 'UNIQUELY-SHAPED OBJECT: for X=Y=R, the collection of open rectangles (a,b)×(c,d) is a '
      + 'basis for the product topology — matching the general U×V construction directly. But the '
      + 'collection of open DISCS in R² ALSO generates the IDENTICAL topology (each disc contains '
      + 'a rectangle around any of its points and vice versa) — a completely different-shaped '
      + 'generating collection producing the SAME topology. The topology is the invariant object; '
      + 'the basis\'s specific shape is never unique.\n\n'
      + 'PROJECTION CONTINUITY IS BUILT IN BY CONSTRUCTION — NEVER A COINCIDENTAL PROPERTY: for '
      + 'π₁:R²→R, π₁(x,y)=x: for open U=(2,5), π₁⁻¹(U)=(2,5)×R — an infinite vertical strip that IS '
      + 'a rectangle (with V=R), hence open in the product topology IMMEDIATELY by the basis '
      + 'definition, requiring no separate proof technique. Moreover, the product topology is the '
      + 'SMALLEST (coarsest) topology on X×Y making both projections continuous: any topology '
      + 'doing so must contain every π₁⁻¹(U)=U×Y and π₂⁻¹(V)=X×V, and since topologies are closed '
      + 'under finite intersection, must contain every rectangle U×V=(U×Y)∩(X×V) — meaning it '
      + 'contains AT LEAST the product topology.\n\n'
      + 'THE UNIVERSAL PROPERTY REPLACES A DIRECT BASIS CHECK WITH TWO SIMPLER CHECKS — NEVER '
      + 'REQUIRING PREIMAGE VERIFICATION AGAINST RECTANGLES: for f(t)=(t²,sin t):R→R², rather than '
      + 'directly verifying f⁻¹(U×V) is open for every basic rectangle, the universal property '
      + 'reduces this to checking f₁(t)=t² and f₂(t)=sin t SEPARATELY — both standard, already-known '
      + 'continuous functions — confirming f\'s continuity into R² with ZERO direct basis '
      + 'verification. This works because f⁻¹(U×V)=f₁⁻¹(U)∩f₂⁻¹(V), an intersection of two open '
      + 'sets whenever both components are continuous.',
    targetedMisconceptions: [`${PRODUCT_SPACE}:MC-1`, `${PRODUCT_SPACE}:MC-2`, `${PRODUCT_SPACE}:MC-3`],
    source: eb(PRODUCT_SPACE, 'Core Understanding — a basis needing not look rectangular to generate the product topology never a uniquely-shaped object, projection continuity being built in by construction never a coincidental property, and the universal property replacing a direct basis check with two simpler checks never requiring preimage verification against rectangles'),
  },
  {
    conceptId: QUOTIENT_SPACE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE QUOTIENT TOPOLOGY IS PRECISELY DETERMINED BY PREIMAGES — NEVER FREELY CHOSEN: for '
      + 'f:[0,1]→S¹, t↦(cos2πt,sin2πt) (identifying 0 and 1): a set U⊆S¹ containing the glued '
      + 'point is OPEN in the quotient topology if and only if f⁻¹(U) — which must include a '
      + 'neighborhood of BOTH 0 AND 1 in [0,1] — is open in [0,1]. This forces U to look like a '
      + 'small arc straddling the glued point on BOTH the t-near-0 side and the t-near-1 side. The '
      + 'topology isn\'t a design choice made afterward — it\'s the LARGEST collection of open sets '
      + 'Y can have while still forcing f to be continuous, fully pinned down by f\'s own '
      + 'preimages.\n\n'
      + '"GLUING" IS A FULLY PRECISE EQUIVALENCE-RELATION CONSTRUCTION — NEVER MERELY AN INFORMAL '
      + 'PICTURE: define ~ on [0,1] by x~y iff x=y or {x,y}={0,1} — a genuine equivalence relation '
      + '(reflexive, symmetric, transitive, directly checkable). The quotient set [0,1]/~ has '
      + 'exactly one class [0]=[1] and every other t∈(0,1) its own singleton class. Equipping '
      + '[0,1]/~ with the quotient topology from f(t)=[t] produces EXACTLY S¹ — "gluing the '
      + 'endpoints" is not a vague hand-wave but a fully specified equivalence relation feeding '
      + 'directly into the general quotient-topology machinery.\n\n'
      + 'QUOTIENT SPACES AND QUOTIENT GROUPS SHARE A GENUINE ORGANIZING PATTERN — NEVER A '
      + 'COINCIDENTAL SHARED WORD: for Z/6Z (N=6Z): the natural surjection Z→Z/6Z collapses '
      + 'integers differing by a multiple of 6 into one class — STRUCTURALLY the same pattern as '
      + 'the circle construction collapsing 0 and 1 into one point. Both constructions: (a) start '
      + 'from an equivalence relation, (b) form the quotient by taking equivalence classes as new '
      + 'elements, (c) equip the quotient with the "best" structure (finest topology / '
      + 'well-defined operation) making the natural map behave correctly. The specific mechanisms '
      + 'differ (open sets vs. group operations), but the ORGANIZING PATTERN — collapse via '
      + 'equivalence, characterized by a universal property — is genuinely the same across topology '
      + 'and group theory, never independently invented in each field.',
    targetedMisconceptions: [`${QUOTIENT_SPACE}:MC-1`, `${QUOTIENT_SPACE}:MC-2`, `${QUOTIENT_SPACE}:MC-3`],
    source: eb(QUOTIENT_SPACE, 'Core Understanding — the quotient topology being precisely determined by preimages never freely chosen, gluing being a fully precise equivalence-relation construction never merely an informal picture, and quotient spaces and quotient groups sharing a genuine organizing pattern never a coincidental shared word'),
  },
  {
    conceptId: SEPARATION_AXIOMS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'T₂\'S SEPARATING NEIGHBORHOODS NEVER NEED TO PARTITION X: for R, separating the points 0 '
      + 'and 2: U=(−1,1) and V=(1,3) are open, disjoint, contain 0 and 2 respectively — but U∪V≠R; '
      + 'the point 1 lies in NEITHER neighborhood. T₂ only demands DISJOINT open sets around each '
      + 'point — nothing about covering or partitioning the whole space. Small, non-covering '
      + 'neighborhoods satisfy the axiom perfectly.\n\n'
      + 'T₄ (NORMAL) IS STRICTLY STRONGER THAN T₃ (REGULAR) — NEVER THE REVERSE, DESPITE "REGULAR" '
      + 'SOUNDING MORE RESTRICTIVE: T₃ separates a POINT from a closed set; T₄ separates TWO CLOSED '
      + 'SETS from each other. Since a point is itself a closed set in a T₁ space, separating two '
      + 'closed sets is AT LEAST as demanding as separating a point from a closed set — so T₄⇒T₃, '
      + 'never T₃⇒T₄. The chain runs T₄⇒T₃⇒T₂⇒T₁⇒T₀, each implication STRICT: the Sierpiński space '
      + '{0,1} with τ={∅,{1},X} is T₀ (the open set {1} separates 1 from 0) but NOT T₁ (no open set '
      + 'contains 0 without also being all of X) — proving T₀⇏T₁. The cofinite topology on an '
      + 'infinite set is T₁ but not T₂ (any two nonempty open sets intersect, since their '
      + 'complements are finite).\n\n'
      + 'NORMALITY ALONE NEVER IMPLIES METRIZABILITY — SECOND-COUNTABILITY IS A SEPARATE '
      + 'REQUIREMENT: for a metric space (X,d): T₂ follows from disjoint balls of radius '
      + 'd(x,y)/2 around x and y; T₄ follows from the Urysohn function '
      + 'f(x)=d(x,F₁)/(d(x,F₁)+d(x,F₂)) for disjoint closed F₁,F₂ — so EVERY metric space is T₄. '
      + 'But Urysohn\'s METRIZATION theorem requires T₃ PLUS second-countability to conclude '
      + 'metrizability — normality (T₄) by itself only provides Urysohn functions (continuous '
      + 'separation), never a countable basis. The LONG LINE is a standard T₄, '
      + 'non-second-countable, NON-metrizable space — proving normality alone is never sufficient.',
    targetedMisconceptions: [`${SEPARATION_AXIOMS}:MC-1`, `${SEPARATION_AXIOMS}:MC-2`, `${SEPARATION_AXIOMS}:MC-3`],
    source: eb(SEPARATION_AXIOMS, 'Core Understanding — T2\'s separating neighborhoods never needing to partition X, T4 (normal) being strictly stronger than T3 (regular) never the reverse despite the sounds of the words, and normality alone never implying metrizability since second-countability is a separate requirement'),
  },
  {
    conceptId: SMOOTH_MANIFOLD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A SMOOTH ATLAS REQUIRES SMOOTH TRANSITION MAPS, NEVER SMOOTH CHARTS THEMSELVES: for the '
      + 'two stereographic charts on Sⁿ, the transition map φ_S∘φ_N⁻¹(u)=u/|u|² is a map BETWEEN '
      + 'OPEN SUBSETS OF Rⁿ — and IS C^∞ on Rⁿ\\{0}, confirming Sⁿ admits a smooth atlas. '
      + 'Crucially, "smoothness of the chart φ_α:U_α→Rⁿ itself" is NOT EVEN DEFINED — U_α⊂M is a '
      + 'topological space with no a priori smooth structure, and smoothness is only meaningful '
      + 'for maps between subsets of Rⁿ. What the smooth-atlas condition actually checks is the '
      + 'TRANSITION maps between charts, which ARE genuine Rⁿ→Rⁿ maps.\n\n'
      + 'TANGENT VECTORS ARE INTRINSIC DERIVATIONS — NEVER ARROWS IN SOME AMBIENT SPACE: a tangent '
      + 'vector at p∈M is a DERIVATION v:C^∞(M)→R satisfying the Leibniz rule '
      + 'v(fg)=v(f)g(p)+f(p)v(g) — for M=Rⁿ, p=0: v_i(f)=∂f/∂x^i(0) is such a derivation, and '
      + 'EVERY derivation is v=Σᵢaⁱvᵢ for constants aⁱ (proved via Taylor expansion), giving '
      + 'T₀Rⁿ≅Rⁿ. On an ABSTRACT manifold with no ambient space (e.g. S² defined intrinsically, '
      + 'never as a subset of R³), this SAME derivation definition applies with NO reference to '
      + 'any embedding at all — tangent vectors transform via the chain rule between charts, never '
      + 'requiring an "arrow in Rᴺ" picture.\n\n'
      + 'SMOOTH STRUCTURES ARE NOT ALWAYS UNIQUE — EXOTIC STRUCTURES GENUINELY EXIST: R⁴ admits '
      + 'UNCOUNTABLY MANY pairwise non-diffeomorphic smooth structures (Donaldson 1983, building on '
      + 'Freedman\'s 1982 topological classification) — a striking rigidity failure occurring ONLY '
      + 'in dimension 4 (every Rⁿ for n≠4 has exactly ONE smooth structure up to diffeomorphism). '
      + 'Similarly, S⁷ admits 28 pairwise non-diffeomorphic smooth structures (Milnor\'s exotic '
      + 'spheres, 1956) — homeomorphic to standard S⁷ as topological spaces, but genuinely '
      + 'DIFFERENT as smooth manifolds (with different differentiable calculi). The '
      + 'homeomorphism/diffeomorphism gap is real, never a trivial or automatic identification.',
    targetedMisconceptions: [`${SMOOTH_MANIFOLD}:MC-1`, `${SMOOTH_MANIFOLD}:MC-2`, `${SMOOTH_MANIFOLD}:MC-3`],
    source: eb(SMOOTH_MANIFOLD, 'Core Understanding — a smooth atlas requiring smooth transition maps never smooth charts themselves, tangent vectors being intrinsic derivations never arrows in some ambient space, and smooth structures not always being unique since exotic structures genuinely exist'),
  },
]

export const MATHEMATICS_TOP_PRODUCT_QUOTIENT_SEPARATION_SMOOTH_MANIFOLD_PROBES: SeedProbe[] = [
  // PRODUCT_SPACE
  {
    conceptId: PRODUCT_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Must a basis for the product topology consist specifically of rectangular sets, or could a differently-shaped collection produce the same topology?',
    choices: [
      { text: "A differently-shaped collection can produce the same topology — on R2, open discs generate the identical topology as open rectangles, since each disc contains a rectangle around any of its points and vice versa; the topology is the invariant object, never the basis's specific shape", isCorrect: true },
      { text: "A basis for the product topology must consist specifically of rectangular sets", isCorrect: false, misconceptionId: `${PRODUCT_SPACE}:MC-1` },
      { text: "Since 'open rectangles' is the standard way the product topology is first introduced, a valid basis should be expected to always look rectangular", isCorrect: false, misconceptionId: `${PRODUCT_SPACE}:MC-1` },
    ],
    targetedMisconceptions: [`${PRODUCT_SPACE}:MC-1`],
    source: eb(PRODUCT_SPACE, 'Discovery Question 1 as a detection probe (verbatim) — whether a product-topology basis must be rectangular, an answer of "yes" confirming PRODUCT-TOPOLOGY-BASIS-ASSUMED-UNIQUELY-RECTANGULAR'),
  },
  {
    conceptId: PRODUCT_SPACE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is projection continuity a coincidental property, or is the product topology specifically defined to be the smallest topology guaranteeing it?',
    choices: [
      { text: "The product topology is specifically the smallest topology guaranteeing it — for pi_1((2,5))=(2,5)xR, this is a rectangle by construction, hence open immediately; any topology making both projections continuous must contain every such rectangle, so it contains at least the product topology", isCorrect: true },
      { text: "Projection continuity is a coincidental property the product topology happens to have", isCorrect: false, misconceptionId: `${PRODUCT_SPACE}:MC-2` },
      { text: "Since projection continuity isn't usually proven directly from the basis definition when first introduced, it should be treated as an independent fact unrelated to how the product topology is constructed", isCorrect: false, misconceptionId: `${PRODUCT_SPACE}:MC-2` },
    ],
    targetedMisconceptions: [`${PRODUCT_SPACE}:MC-2`],
    source: eb(PRODUCT_SPACE, 'Discovery Question 2 as a detection probe (verbatim) — whether projection continuity is coincidental or by-construction, an answer treating it as coincidental confirming PROJECTION-CONTINUITY-ASSUMED-COINCIDENTAL'),
  },
  {
    conceptId: PRODUCT_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'To verify continuity into a product space, must you check preimages of basic rectangles directly, or can checking the two components separately suffice?',
    choices: [
      { text: "Checking the two components separately suffices — for f(t)=(t^2, sin t), the universal property reduces continuity to checking f1(t)=t^2 and f2(t)=sin t separately, since f-1(UxV)=f1-1(U) intersect f2-1(V), with zero direct basis verification needed", isCorrect: true },
      { text: "Verifying continuity into a product space generally requires checking preimages of basic rectangles directly", isCorrect: false, misconceptionId: `${PRODUCT_SPACE}:MC-3` },
      { text: "Since the basis definition of the product topology is learned first, checking continuity should always start from a direct rectangle-preimage verification rather than a component-wise shortcut", isCorrect: false, misconceptionId: `${PRODUCT_SPACE}:MC-3` },
    ],
    targetedMisconceptions: [`${PRODUCT_SPACE}:MC-3`],
    source: eb(PRODUCT_SPACE, 'Discovery Question 3 as a detection probe (verbatim) — whether continuity into a product requires a direct basis check, an answer requiring it confirming PRODUCT-CONTINUITY-ASSUMED-TO-REQUIRE-DIRECT-BASIS-CHECK'),
  },
  // QUOTIENT_SPACE
  {
    conceptId: QUOTIENT_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the quotient topology on Y chosen somewhat freely, or is it fully determined by f\'s preimages?',
    choices: [
      { text: "Fully determined by f's preimages — for f:[0,1]->S1 identifying 0 and 1, a set U containing the glued point is open iff f-1(U) is open in [0,1]; the topology is the largest collection of open sets Y can have while still forcing f to be continuous, pinned down entirely by f's preimages", isCorrect: true },
      { text: "The quotient topology on Y is chosen somewhat freely, as long as it forms a valid topology", isCorrect: false, misconceptionId: `${QUOTIENT_SPACE}:MC-1` },
      { text: "Since many different valid topologies can exist on a given set in general, the quotient topology should likewise be treated as one reasonable choice among several", isCorrect: false, misconceptionId: `${QUOTIENT_SPACE}:MC-1` },
    ],
    targetedMisconceptions: [`${QUOTIENT_SPACE}:MC-1`],
    source: eb(QUOTIENT_SPACE, 'Discovery Question 1 as a detection probe (verbatim) — whether the quotient topology is freely chosen or determined by preimages, an answer treating it as freely chosen confirming QUOTIENT-TOPOLOGY-ASSUMED-FREELY-CHOSEN'),
  },
  {
    conceptId: QUOTIENT_SPACE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is "the circle as an interval with endpoints identified" merely an informal picture, or a precise mathematical construction?',
    choices: [
      { text: "A precise mathematical construction — defining x~y iff x=y or {x,y}={0,1} on [0,1] is a genuine, directly checkable equivalence relation (reflexive, symmetric, transitive), and equipping [0,1]/~ with the quotient topology produces exactly S1", isCorrect: true },
      { text: "It is merely an informal picture, not a precise mathematical construction", isCorrect: false, misconceptionId: `${QUOTIENT_SPACE}:MC-2` },
      { text: "Since 'gluing the ends together' is usually described visually, it should be treated as an intuitive picture rather than a fully specified equivalence relation", isCorrect: false, misconceptionId: `${QUOTIENT_SPACE}:MC-2` },
    ],
    targetedMisconceptions: [`${QUOTIENT_SPACE}:MC-2`],
    source: eb(QUOTIENT_SPACE, 'Discovery Question 2 as a detection probe (verbatim) — whether "gluing" descriptions are merely informal, an answer of "yes" confirming GLUING-ASSUMED-MERELY-INFORMAL'),
  },
  {
    conceptId: QUOTIENT_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is "quotient" in quotient space and quotient group a coincidental shared word, or do both constructions share a genuine organizing pattern?',
    choices: [
      { text: "A genuine organizing pattern — Z/6Z's natural surjection collapses integers differing by a multiple of 6, structurally the same pattern as collapsing 0 and 1 into one point on the circle; both start from an equivalence relation, form the quotient by taking classes as new elements, and equip it with the 'best' structure via a universal property", isCorrect: true },
      { text: "A coincidental shared word between unrelated constructions in topology and group theory", isCorrect: false, misconceptionId: `${QUOTIENT_SPACE}:MC-3` },
      { text: "Since the specific mechanisms differ (open sets versus group operations), the shared name 'quotient' should be treated as terminological overlap rather than a genuine structural parallel", isCorrect: false, misconceptionId: `${QUOTIENT_SPACE}:MC-3` },
    ],
    targetedMisconceptions: [`${QUOTIENT_SPACE}:MC-3`],
    source: eb(QUOTIENT_SPACE, 'Discovery Question 3 as a detection probe (verbatim) — whether "quotient" is a coincidental shared word, an answer of "yes" confirming QUOTIENT-TERMINOLOGY-ASSUMED-COINCIDENTAL'),
  },
  // SEPARATION_AXIOMS
  {
    conceptId: SEPARATION_AXIOMS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In a T₂ space, must the separating open sets U,V cover or partition the whole space X?',
    choices: [
      { text: "No — for R separating 0 and 2, U=(-1,1) and V=(1,3) are open, disjoint, and contain 0 and 2 respectively, but U union V does not equal R (the point 1 is in neither); T2 only demands disjoint open sets around each point, nothing about covering or partitioning the whole space", isCorrect: true },
      { text: "Yes, in a T2 space the separating open sets U and V must cover or partition the whole space X", isCorrect: false, misconceptionId: `${SEPARATION_AXIOMS}:MC-1` },
      { text: "Since 'separating' two points suggestively implies dividing the whole space, the neighborhoods should be expected to cover all of X between them", isCorrect: false, misconceptionId: `${SEPARATION_AXIOMS}:MC-1` },
    ],
    targetedMisconceptions: [`${SEPARATION_AXIOMS}:MC-1`],
    source: eb(SEPARATION_AXIOMS, 'Discovery Question 1 as a detection probe (verbatim) — whether T2\'s separating neighborhoods must partition X, an answer of "yes" confirming HAUSDORFF-NEIGHBORHOODS-PARTITION-X'),
  },
  {
    conceptId: SEPARATION_AXIOMS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Which is the stronger axiom, T₃ (regular) or T₄ (normal)?',
    choices: [
      { text: "T4 (normal) is the stronger axiom — T3 separates a point from a closed set, while T4 separates two closed sets from each other; since a point is itself a closed set in a T1 space, separating two closed sets is at least as demanding, so T4 implies T3, never the reverse, despite 'regular' sounding more restrictive", isCorrect: true },
      { text: "T3 (regular) is the stronger axiom, since 'regular' sounds more restrictive than 'normal'", isCorrect: false, misconceptionId: `${SEPARATION_AXIOMS}:MC-2` },
      { text: "Since the everyday English connotation of 'regular' suggests more restriction than 'normal', the mathematical strength ordering should follow that same intuition", isCorrect: false, misconceptionId: `${SEPARATION_AXIOMS}:MC-2` },
    ],
    targetedMisconceptions: [`${SEPARATION_AXIOMS}:MC-2`],
    source: eb(SEPARATION_AXIOMS, 'Discovery Question 2 as a detection probe (verbatim) — which of T3/T4 is stronger, an answer naming T3 confirming NORMAL-DOES-NOT-IMPLY-REGULAR'),
  },
  {
    conceptId: SEPARATION_AXIOMS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does T₄ (normality) alone guarantee a space is metrizable?',
    choices: [
      { text: "No — every metric space is T4, but Urysohn's Metrization Theorem requires T3 PLUS second-countability to conclude metrizability; the long line is a standard T4, non-second-countable, non-metrizable space, proving normality alone is never sufficient", isCorrect: true },
      { text: "Yes, T4 (normality) alone guarantees a space is metrizable", isCorrect: false, misconceptionId: `${SEPARATION_AXIOMS}:MC-3` },
      { text: "Since Urysohn's Lemma provides continuous separating functions from normality, that separation power should be treated as already sufficient for constructing a metric", isCorrect: false, misconceptionId: `${SEPARATION_AXIOMS}:MC-3` },
    ],
    targetedMisconceptions: [`${SEPARATION_AXIOMS}:MC-3`],
    source: eb(SEPARATION_AXIOMS, 'Discovery Question 3 as a detection probe (verbatim) — whether normality alone guarantees metrizability, an answer of "yes" confirming NORMAL-IMPLIES-METRIZABLE'),
  },
  // SMOOTH_MANIFOLD
  {
    conceptId: SMOOTH_MANIFOLD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is a smooth atlas just any collection of charts where each chart maps to Rⁿ smoothly?',
    choices: [
      { text: "No — smoothness of an individual chart phi_alpha:U_alpha to Rn is not even defined, since U_alpha is a subset of M with no a priori smooth structure; what a smooth atlas actually requires is that the TRANSITION maps between charts, which are genuine Rn-to-Rn maps, are C-infinity", isCorrect: true },
      { text: "Yes, a smooth atlas is any collection of charts where each individual chart map is required to be smooth", isCorrect: false, misconceptionId: `${SMOOTH_MANIFOLD}:MC-1` },
      { text: "Since each chart maps into Rn, it seems natural to require that mapping itself to be smooth, the same way any Rn-valued function can be checked for smoothness", isCorrect: false, misconceptionId: `${SMOOTH_MANIFOLD}:MC-1` },
    ],
    targetedMisconceptions: [`${SMOOTH_MANIFOLD}:MC-1`],
    source: eb(SMOOTH_MANIFOLD, 'Discovery Question 1 as a detection probe (verbatim) — whether a smooth atlas requires each chart itself to be smooth, an answer of "yes" confirming SMOOTH-ATLAS-MEANS-SMOOTH-CHARTS'),
  },
  {
    conceptId: SMOOTH_MANIFOLD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is a tangent vector on an abstract manifold an arrow in some Rᴺ?',
    choices: [
      { text: "No — a tangent vector at p is a derivation v:C-infinity(M) to R satisfying the Leibniz rule; this definition applies with no reference to any embedding at all, even on an abstract manifold like S2 defined intrinsically with no ambient space, never requiring an 'arrow in RN' picture", isCorrect: true },
      { text: "Yes, a tangent vector on an abstract manifold is an arrow in some ambient RN", isCorrect: false, misconceptionId: `${SMOOTH_MANIFOLD}:MC-2` },
      { text: "Since tangent vectors on familiar embedded surfaces like the sphere in R3 are pictured as arrows, that same ambient-arrow picture should be expected to work for any abstract manifold", isCorrect: false, misconceptionId: `${SMOOTH_MANIFOLD}:MC-2` },
    ],
    targetedMisconceptions: [`${SMOOTH_MANIFOLD}:MC-2`],
    source: eb(SMOOTH_MANIFOLD, 'Discovery Question 2 as a detection probe (verbatim) — whether a tangent vector on an abstract manifold is an arrow in ambient space, an answer of "yes" confirming TANGENT-VECTOR-IS-AN-ARROW-IN-AMBIENT-SPACE'),
  },
  {
    conceptId: SMOOTH_MANIFOLD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Can the same topological manifold support two non-diffeomorphic smooth structures?',
    choices: [
      { text: "Yes — R4 admits uncountably many pairwise non-diffeomorphic smooth structures (a rigidity failure occurring only in dimension 4), and S7 admits 28 pairwise non-diffeomorphic smooth structures (Milnor's exotic spheres), homeomorphic to the standard sphere but genuinely different as smooth manifolds", isCorrect: true },
      { text: "No, every topological manifold has at most one smooth structure up to diffeomorphism", isCorrect: false, misconceptionId: `${SMOOTH_MANIFOLD}:MC-3` },
      { text: "Since uniqueness of smooth structure holds in the familiar low dimensions like 1, 2, and 3, that same uniqueness should be expected to hold in every dimension", isCorrect: false, misconceptionId: `${SMOOTH_MANIFOLD}:MC-3` },
    ],
    targetedMisconceptions: [`${SMOOTH_MANIFOLD}:MC-3`],
    source: eb(SMOOTH_MANIFOLD, 'Discovery Question 3 as a detection probe (verbatim) — whether the same topological manifold can support two non-diffeomorphic smooth structures, an answer of "no" confirming SMOOTH-STRUCTURE-IS-UNIQUE'),
  },
]
