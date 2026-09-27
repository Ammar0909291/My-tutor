/**
 * Batch: fundamental-group, compactness, manifold (math.top) — 7/23 -> 10/23.
 *
 * Fresh Phase 0 frontier recompute after homotopy, homology, and
 * homeomorphism were authored: 12 concepts became simultaneously ready.
 * This batch prioritizes the 3 highest-value concepts by how many further
 * math.top concepts they themselves unlock via the KG's `requires` graph
 * — fundamental-group (unlocks covering-space, van-kampen), compactness
 * (unlocks tychonoff), and manifold (unlocks smooth-manifold) — leaving
 * the 9 domain-leaf-for-now concepts (basis, cohomology,
 * euler-characteristic, homotopy-equivalence, interior-closure,
 * product-space, quotient-space, separation-axioms, connectedness) for
 * subsequent batches.
 * Transcribed from their frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.top.{fundamental-group,compactness,
 * manifold}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching this domain's established
 * baseline.
 *
 * compactness' cross-link (math.real.compactness) is authored — a genuine
 * transfer target. fundamental-group and manifold declare no KG
 * cross-link.
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

const FUNDAMENTAL_GROUP = 'math.top.fundamental-group'
const COMPACTNESS = 'math.top.compactness'
const MANIFOLD = 'math.top.manifold'

export const MATHEMATICS_TOP_FUNDAMENTAL_GROUP_COMPACTNESS_MANIFOLD_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FUNDAMENTAL_GROUP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'LOOP HOMOTOPY REQUIRES THE BASEPOINT TO STAY FIXED THROUGHOUT — NEVER JUST AT THE TWO '
      + 'ENDPOINTS: on S¹ with x₀=(1,0), γ(s)=(cos2πs,sin2πs): the "rotate the whole loop" '
      + 'candidate H(s,t)=(cos2π(s+t),sin2π(s+t)) satisfies the PLAIN endpoint conditions '
      + 'H(s,0)=γ(s), H(s,1)=γ(s) perfectly. But checking H(0,t)=(cos2πt,sin2πt): at t=1/2, '
      + 'H(0,1/2)=(−1,0)≠x₀ — the basepoint SWEEPS all the way around the circle. Despite '
      + 'satisfying the plain homotopy conditions, this H is NOT a valid BASED homotopy — the '
      + 'stricter requirement H(0,t)=H(1,t)=x₀ for EVERY t fails.\n\n'
      + 'CONCATENATION IS ASSOCIATIVE ONLY UP TO BASED HOMOTOPY — NEVER AS LITERAL FUNCTION '
      + 'EQUALITY: for three loops γ₁,γ₂,γ₃: (γ₁∗γ₂)∗γ₃ traverses them on [0,¼],[¼,½],[½,1], while '
      + 'γ₁∗(γ₂∗γ₃) traverses them on [0,½],[½,¾],[¾,1] — DIFFERENT breakpoint schedules, DIFFERENT '
      + 'functions of s (they disagree at, e.g., s=0.3). They ARE based-homotopic (a '
      + 'reparametrization homotopy slides the breakpoints continuously, every intermediate stage '
      + 'still a valid loop based at x₀) — but NEVER literally equal as functions. This is EXACTLY '
      + 'why the group associativity axiom is verified for homotopy CLASSES [γ], never for '
      + 'individual loops.\n\n'
      + 'SIMPLY CONNECTED RULES OUT ONLY LOOP-DETECTABLE 1D HOLES — NEVER ALL INTERESTING '
      + 'TOPOLOGY: π₁(S²)=0 (simply connected — every loop on the sphere can be shrunk to a point, '
      + 'since there\'s enough "room" to slide any loop to one side). But S² is NOT devoid of '
      + 'interesting topological structure — π₁ specifically detects only the kind of "hole" a '
      + '1-dimensional loop can wrap around and get stuck on; a simply connected space can carry '
      + 'OTHER, higher-dimensional topological features entirely invisible to π₁ alone (e.g. S²\'s '
      + 'nontrivial second homotopy group π₂(S²)≠0).',
    targetedMisconceptions: [`${FUNDAMENTAL_GROUP}:MC-1`, `${FUNDAMENTAL_GROUP}:MC-2`, `${FUNDAMENTAL_GROUP}:MC-3`],
    source: eb(FUNDAMENTAL_GROUP, 'Core Understanding — loop homotopy requiring the basepoint to stay fixed throughout never just at the two endpoints, concatenation being associative only up to based homotopy never as literal function equality, and simply connected ruling out only loop-detectable 1D holes never all interesting topology'),
  },
  {
    conceptId: COMPACTNESS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE GENERAL DEFINITION IS IDENTICAL — NEVER REQUIRING NEW MACHINERY: verifying (0,1)⊂R is '
      + 'not compact in the GENERAL topological sense uses the EXACT SAME cover '
      + 'U={(1/n,1):n=2,3,4,…} already familiar from metric-space compactness — no finite '
      + 'subcollection covers (0,1), since any finite subcollection\'s union is (1/N,1) for the '
      + 'largest N used, missing points like 1/(N+1). Moving from the metric-specific instance to '
      + 'the general topological-space definition requires NOTHING beyond this identical open-cover '
      + 'argument — the generalization is a change of SETTING, never a change of TECHNIQUE.\n\n'
      + 'HEINE-BOREL\'S SHORTCUT DOES NOT TRANSFER — NEVER A UNIVERSAL SUBSTITUTE: let X={a,b,c} '
      + 'with the DISCRETE topology — there is NO metric on X, hence "bounded" is not even a '
      + 'meaningful question. Yet compactness is perfectly well-defined and directly checkable: ANY '
      + 'open cover of a FINITE set trivially has a finite subcover (at most one set per point, and '
      + 'there are only 3 points) — X IS compact, confirmed with zero reference to boundedness. '
      + 'Heine-Borel\'s "closed and bounded" is a convenience SPECIFIC to metric structure, never a '
      + 'general topological fact available everywhere — outside a metric setting, compactness must '
      + 'be verified directly via the cover definition.\n\n'
      + 'ONLY CLOSED SUBSETS ARE GUARANTEED TO INHERIT COMPACTNESS — NEVER EVERY SUBSET: [0,1] is '
      + 'compact (Heine-Borel). Its subset (0,1) is NOT closed in R (missing limit points 0,1) and '
      + 'indeed is NOT compact (confirmed via the same cover argument). Contrast [0,1/2]⊂[0,1]: '
      + 'this subset IS closed and IS compact (Heine-Borel applied directly to [0,1/2] itself). '
      + 'Being a subset of a compact space guarantees NOTHING on its own — only CLOSED subsets are '
      + 'guaranteed to inherit compactness. Separately, for f(x)=x² on [0,1]: the continuous image '
      + 'f([0,1])=[0,1] is compact, confirming the continuous-image-of-compact theorem.',
    targetedMisconceptions: [`${COMPACTNESS}:MC-1`, `${COMPACTNESS}:MC-2`, `${COMPACTNESS}:MC-3`],
    source: eb(COMPACTNESS, 'Core Understanding — the general definition being identical never requiring new machinery, Heine-Borel\'s shortcut never transferring as a universal substitute, and only closed subsets being guaranteed to inherit compactness never every subset'),
  },
  {
    conceptId: MANIFOLD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A MANIFOLD IS DEFINED INTRINSICALLY — NEVER AS A SUBSET OF SOME Rᴺ: the definition '
      + '(Hausdorff + second-countable + every point has a neighborhood homeomorphic to Rⁿ) refers '
      + 'ONLY to the topology of M itself — there is no ambient space anywhere in it. Whitney\'s '
      + 'Embedding Theorem GUARANTEES a smooth manifold can be embedded in some R^(2n) — but this '
      + 'is a THEOREM proved LATER, never part of the definition itself. Abstract manifolds (like '
      + 'abstract projective spaces, or spacetime models in general relativity) genuinely have no '
      + 'natural ambient Euclidean space.\n\n'
      + 'LOCAL HOMEOMORPHISM TO Rⁿ ALONE NEVER SUFFICES — HAUSDORFF AND SECOND-COUNTABILITY ARE '
      + 'SEPARATE, NECESSARY CONDITIONS: the "line with two origins" (two copies of R, identified '
      + 'everywhere except at the two origins) has EVERY point locally homeomorphic to R '
      + '(satisfying the local condition perfectly) — but the two origins CANNOT be separated by '
      + 'disjoint open sets, FAILING Hausdorff. Without Hausdorff, this pathological space is '
      + 'EXCLUDED by definition — such spaces admit no partitions of unity and no well-defined '
      + 'integration. The long line similarly fails second-countability despite being locally R.\n\n'
      + 'MANIFOLD BOUNDARY AND TOPOLOGICAL BOUNDARY ARE DIFFERENT CONCEPTS — NEVER ASSUMED TO '
      + 'ALWAYS AGREE: for S¹⊂R²: the MANIFOLD boundary ∂S¹=∅ (S¹ is a 1-manifold WITHOUT boundary '
      + '— every point has a neighborhood homeomorphic to R, never to a half-line). But the '
      + 'TOPOLOGICAL boundary of S¹ AS A SUBSPACE of R² is S¹ ITSELF (it has empty interior in R², '
      + 'so every neighborhood of every point meets both S¹ and its complement). These structurally '
      + 'DIFFERENT notions happen to AGREE for cases like the closed disk D² (manifold boundary = '
      + 'topological boundary = S¹) but genuinely DIVERGE for S¹ itself — the symbol ∂ is '
      + 'overloaded between two different meanings, never interchangeable by default.',
    targetedMisconceptions: [`${MANIFOLD}:MC-1`, `${MANIFOLD}:MC-2`, `${MANIFOLD}:MC-3`],
    source: eb(MANIFOLD, 'Core Understanding — a manifold being defined intrinsically never as a subset of some Euclidean space, local homeomorphism to Rn alone never sufficing since Hausdorff and second-countability are separate necessary conditions, and manifold boundary and topological boundary being different concepts never assumed to always agree'),
  },
]

export const MATHEMATICS_TOP_FUNDAMENTAL_GROUP_COMPACTNESS_MANIFOLD_PROBES: SeedProbe[] = [
  // FUNDAMENTAL_GROUP
  {
    conceptId: FUNDAMENTAL_GROUP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If H(s,0)=γ1(s) and H(s,1)=γ2(s) both check out, is H automatically a valid based homotopy for computing π₁?',
    choices: [
      { text: "No — on S¹ with basepoint x0=(1,0), the rotating candidate H(s,t)=(cos2π(s+t),sin2π(s+t)) satisfies both plain endpoint conditions, but H(0,t) sweeps the basepoint all the way around the circle (H(0,1/2)=(−1,0)≠x0), violating the stricter requirement that H(0,t)=H(1,t)=x0 for EVERY t", isCorrect: true },
      { text: "Yes, any homotopy H satisfying the plain endpoint conditions is automatically a valid based homotopy for computing π1", isCorrect: false, misconceptionId: `${FUNDAMENTAL_GROUP}:MC-1` },
      { text: "Since the plain homotopy endpoint check was already learned as sufficient, that same check should carry over directly to loop homotopies used for π1", isCorrect: false, misconceptionId: `${FUNDAMENTAL_GROUP}:MC-1` },
    ],
    targetedMisconceptions: [`${FUNDAMENTAL_GROUP}:MC-1`],
    source: eb(FUNDAMENTAL_GROUP, 'Discovery Question 1 as a detection probe (verbatim) — whether a homotopy satisfying plain endpoint conditions is automatically a valid based homotopy, an answer of "yes" confirming BASEPOINT-DRIFT-IN-LOOP-HOMOTOPY-OVERLOOKED'),
  },
  {
    conceptId: FUNDAMENTAL_GROUP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Are (γ1∗γ2)∗γ3 and γ1∗(γ2∗γ3) the exact same function of s?',
    choices: [
      { text: "No — they use different breakpoint schedules ([0,1/4],[1/4,1/2],[1/2,1] versus [0,1/2],[1/2,3/4],[3/4,1]) and disagree as functions at points like s=0.3, but they ARE based-homotopic via a reparametrization homotopy sliding the breakpoints continuously, which is exactly why associativity holds only at the level of homotopy classes", isCorrect: true },
      { text: "Yes, (γ1∗γ2)∗γ3 and γ1∗(γ2∗γ3) must be the exact same function of s", isCorrect: false, misconceptionId: `${FUNDAMENTAL_GROUP}:MC-2` },
      { text: "Since group axioms typically hold for the elements themselves, associativity of loop concatenation should hold as literal function equality rather than only up to homotopy", isCorrect: false, misconceptionId: `${FUNDAMENTAL_GROUP}:MC-2` },
    ],
    targetedMisconceptions: [`${FUNDAMENTAL_GROUP}:MC-2`],
    source: eb(FUNDAMENTAL_GROUP, 'Discovery Question 2 as a detection probe (verbatim) — whether differently-scheduled concatenations are the exact same function, an answer of "yes" confirming CONCATENATION-ASSOCIATIVITY-TREATED-AS-LITERAL-EQUALITY'),
  },
  {
    conceptId: FUNDAMENTAL_GROUP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If a space is simply connected, does that mean it has no interesting topological features of any kind?',
    choices: [
      { text: "No — π1(S²)=0 (simply connected, every loop can be shrunk to a point), but S² is not devoid of interesting topology: π1 detects only loop-detectable 1-dimensional holes, and S² carries other higher-dimensional features entirely invisible to π1, such as its nontrivial second homotopy group π2(S²)≠0", isCorrect: true },
      { text: "Yes, a simply connected space has no interesting topological structure of any kind", isCorrect: false, misconceptionId: `${FUNDAMENTAL_GROUP}:MC-3` },
      { text: "Since 'simply connected' sounds like a blanket statement about a space's topology, a trivial π1 should be read as ruling out all topological structure, not just loop-detectable holes", isCorrect: false, misconceptionId: `${FUNDAMENTAL_GROUP}:MC-3` },
    ],
    targetedMisconceptions: [`${FUNDAMENTAL_GROUP}:MC-3`],
    source: eb(FUNDAMENTAL_GROUP, 'Discovery Question 3 as a detection probe (verbatim) — whether simple connectivity means no interesting topological features at all, an answer of "yes" confirming SIMPLY-CONNECTED-OVERGENERALIZED-TO-NO-TOPOLOGY-AT-ALL'),
  },
  // COMPACTNESS
  {
    conceptId: COMPACTNESS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Can compactness be checked via "closed and bounded" in any topological space, not just in Rⁿ?',
    choices: [
      { text: "No — let X={a,b,c} with the discrete topology: there is no metric on X, so 'bounded' is not even a meaningful question, yet X is compact (any open cover of a finite set trivially has a finite subcover) — Heine-Borel's 'closed and bounded' is a convenience specific to Rn's metric structure, never a general topological fact", isCorrect: true },
      { text: "Yes, 'closed and bounded' characterizes compactness in any topological space, not just in Rn", isCorrect: false, misconceptionId: `${COMPACTNESS}:MC-1` },
      { text: "Since Heine-Borel is learned as the standard way to check compactness, it should generalize as a valid test in any topological space encountered later", isCorrect: false, misconceptionId: `${COMPACTNESS}:MC-1` },
    ],
    targetedMisconceptions: [`${COMPACTNESS}:MC-1`],
    source: eb(COMPACTNESS, 'Discovery Question 1 as a detection probe (verbatim) — whether "closed and bounded" characterizes compactness in any topological space, an answer of "yes" confirming HEINE-BOREL-ASSUMED-TO-EXTEND-GENERALLY'),
  },
  {
    conceptId: COMPACTNESS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does moving from the Rⁿ-specific compactness definition to the general topological definition require fundamentally new verification techniques?',
    choices: [
      { text: "No — verifying (0,1)⊂R is not compact in the general topological sense uses the exact same cover U={(1/n,1):n=2,3,4,...} as before; moving to the general definition requires nothing beyond this identical open-cover argument, a change of setting never a change of technique", isCorrect: true },
      { text: "Yes, moving to the general topological-space compactness definition requires fundamentally new verification techniques beyond the open-cover argument", isCorrect: false, misconceptionId: `${COMPACTNESS}:MC-2` },
      { text: "Since abstraction to a general space typically demands new mathematical tools, compactness verification should need genuinely new machinery once metrics are no longer available", isCorrect: false, misconceptionId: `${COMPACTNESS}:MC-2` },
    ],
    targetedMisconceptions: [`${COMPACTNESS}:MC-2`],
    source: eb(COMPACTNESS, 'Discovery Question 2 as a detection probe (verbatim) — whether the general definition requires fundamentally new verification techniques, an answer of "yes" confirming GENERAL-DEFINITION-ASSUMED-TO-NEED-NEW-MACHINERY'),
  },
  {
    conceptId: COMPACTNESS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is every subset of a compact space automatically compact?',
    choices: [
      { text: "No — [0,1] is compact, but its subset (0,1) is not closed in R and is not compact; contrast [0,1/2]⊂[0,1], which IS closed and IS compact — only CLOSED subsets of a compact space are guaranteed to inherit compactness, never every subset", isCorrect: true },
      { text: "Yes, every subset of a compact space is automatically compact", isCorrect: false, misconceptionId: `${COMPACTNESS}:MC-3` },
      { text: "Since being 'part of' a compact space feels like it should inherit the same property, any subset of a compact space should be treated as compact as well", isCorrect: false, misconceptionId: `${COMPACTNESS}:MC-3` },
    ],
    targetedMisconceptions: [`${COMPACTNESS}:MC-3`],
    source: eb(COMPACTNESS, 'Discovery Question 3 as a detection probe (verbatim) — whether every subset of a compact space is automatically compact, an answer of "yes" confirming EVERY-SUBSET-OF-COMPACT-ASSUMED-COMPACT'),
  },
  // MANIFOLD
  {
    conceptId: MANIFOLD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is a manifold, by definition, always a subset of some Rᴺ?',
    choices: [
      { text: "No — the definition (Hausdorff + second-countable + locally homeomorphic to Rn at every point) refers only to the topology of M itself, with no ambient space anywhere in it; Whitney's Embedding Theorem guarantees an embedding exists for smooth manifolds, but that is a theorem proved later, never part of the definition", isCorrect: true },
      { text: "Yes, a manifold is by definition always a subset of some Rn", isCorrect: false, misconceptionId: `${MANIFOLD}:MC-1` },
      { text: "Since nearly every first-encountered manifold example, like the sphere, is presented sitting inside Rn, that ambient embedding should be treated as part of the manifold's actual definition", isCorrect: false, misconceptionId: `${MANIFOLD}:MC-1` },
    ],
    targetedMisconceptions: [`${MANIFOLD}:MC-1`],
    source: eb(MANIFOLD, 'Discovery Question 1 as a detection probe (verbatim) — whether a manifold is by definition always a subset of some Euclidean space, an answer of "yes" confirming MANIFOLD-MUST-BE-EMBEDDED-IN-EUCLIDEAN-SPACE'),
  },
  {
    conceptId: MANIFOLD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does looking locally like Rⁿ at every point, by itself, guarantee a space is a manifold?',
    choices: [
      { text: "No — the 'line with two origins' (two copies of R, identified everywhere except at the two origins) has every point locally homeomorphic to R, but the two origins cannot be separated by disjoint open sets, failing Hausdorff; Hausdorff and second-countability are separate, necessary conditions", isCorrect: true },
      { text: "Yes, being locally homeomorphic to Rn at every point by itself guarantees a space is a manifold", isCorrect: false, misconceptionId: `${MANIFOLD}:MC-2` },
      { text: "Since the locally-Euclidean condition is the most visual and memorable part of the manifold definition, it should be treated as sufficient on its own without separately checking Hausdorff and second-countability", isCorrect: false, misconceptionId: `${MANIFOLD}:MC-2` },
    ],
    targetedMisconceptions: [`${MANIFOLD}:MC-2`],
    source: eb(MANIFOLD, 'Discovery Question 2 as a detection probe (verbatim) — whether being locally Euclidean alone guarantees a manifold, an answer of "yes" confirming LOCALLY-EUCLIDEAN-IS-SUFFICIENT-FOR-MANIFOLD'),
  },
  {
    conceptId: MANIFOLD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does the manifold boundary of an embedded space always equal its topological boundary as a subspace?',
    choices: [
      { text: "No — for S1⊂R2, the manifold boundary ∂S1=∅ (every point has a neighborhood homeomorphic to R, not a half-line), but the topological boundary of S1 as a subspace of R2 is S1 itself; these notions agree for cases like the closed disk D2 but genuinely diverge for S1 — the symbol ∂ is overloaded between two different meanings", isCorrect: true },
      { text: "Yes, the manifold boundary of an embedded space always equals its topological boundary as a subspace", isCorrect: false, misconceptionId: `${MANIFOLD}:MC-3` },
      { text: "Since first examples like the closed disk have the manifold boundary and topological boundary coincide, that agreement should be assumed to hold generally for any embedded space", isCorrect: false, misconceptionId: `${MANIFOLD}:MC-3` },
    ],
    targetedMisconceptions: [`${MANIFOLD}:MC-3`],
    source: eb(MANIFOLD, 'Discovery Question 3 as a detection probe (verbatim) — whether manifold boundary always equals topological boundary, an answer of "yes" confirming MANIFOLD-BOUNDARY-EQUALS-TOPOLOGICAL-BOUNDARY'),
  },
]
