/**
 * Batch: homotopy, homology, homeomorphism (math.top) — 4/23 -> 7/23.
 *
 * Fresh Phase 0 frontier recompute after open-sets, continuity-top, and
 * simplicial-complex were authored: 10 concepts became simultaneously
 * ready. This batch prioritizes the 3 highest-value concepts by how many
 * further math.top concepts they themselves unlock via the KG's `requires`
 * graph — homotopy (unlocks fundamental-group, homotopy-equivalence),
 * homology (unlocks euler-characteristic), and homeomorphism (unlocks
 * manifold, per manifold's own `requires` field, though the KG's redundant
 * `unlocks` field on homeomorphism itself is empty — a known harmless
 * KG-field asymmetry, not a discrepancy in either entry's own stated
 * metadata) — leaving the 7 domain-leaf-for-now concepts (basis,
 * compactness, connectedness, separation-axioms, quotient-space,
 * product-space, interior-closure) for subsequent batches.
 * Transcribed from their frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.top.{homotopy,homology,homeomorphism}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching this domain's established
 * baseline (the schema has no GRADUATE tier above UNDERGRADUATE, so this
 * remains the correct choice even for homology's "research" difficulty
 * tier, consistent with math.cat/math.abst/math.meas/math.fnal precedent).
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

const HOMOTOPY = 'math.top.homotopy'
const HOMOLOGY = 'math.top.homology'
const HOMEOMORPHISM = 'math.top.homeomorphism'

export const MATHEMATICS_TOP_HOMOTOPY_HOMOLOGY_HOMEOMORPHISM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: HOMOTOPY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'ENDPOINT MATCHING IS NECESSARY BUT NEVER SUFFICIENT — JOINT CONTINUITY MUST BE CHECKED '
      + 'SEPARATELY: for X=[0,1], Y=R, f(x)=0, g(x)=1: the candidate H(x,t)=0 for t<1/2, H(x,t)=1 '
      + 'for t≥1/2 satisfies BOTH endpoints exactly (H(x,0)=0=f(x), H(x,1)=1=g(x)) — yet FAILS to '
      + 'be a valid homotopy, because H JUMPS discontinuously at t=1/2. Matching f and g at the two '
      + 'endpoints is a necessary condition, never a sufficient one — the WHOLE map H(x,t), as a '
      + 'joint function of both variables, must itself be checked for continuity exactly as any '
      + 'other continuity claim (via preimages of open sets). A genuinely continuous alternative, '
      + 'H(x,t)=t, works instead.\n\n'
      + 'HOMOTOPY IS A GENUINE EQUIVALENCE RELATION, EACH PROPERTY BACKED BY AN EXPLICIT '
      + 'CONSTRUCTION — NEVER ASSERTED WITHOUT ONE: REFLEXIVE via H(x,t)=f(x) (constant in t, '
      + 'trivially continuous); SYMMETRIC via H\'(x,t)=H(x,1−t) (running the deformation backward — '
      + 'continuous since t↦1−t is continuous); TRANSITIVE via concatenating H₁ (rescaled onto '
      + '[0,1/2]) then H₂ (rescaled onto [1/2,1]). Each property corresponds to an ACTUAL homotopy '
      + 'you can write down — never just an abstract label asserted without construction.\n\n'
      + 'WHETHER TWO MAPS ARE HOMOTOPIC DEPENDS ON THE SPACE — NEVER ASSUMED AUTOMATIC BETWEEN ANY '
      + 'TWO CONTINUOUS MAPS: on X=Y=R², the identity f(x)=x and the constant g(x)=0 ARE homotopic '
      + 'via the straight-line homotopy H(x,t)=(1−t)x (continuous, both endpoints check out). But '
      + 'on X=Y=S¹, the identity f(z)=z and the constant g(z)=1 are FAMOUSLY NOT homotopic — no '
      + 'continuous deformation can "unwrap" the circle\'s full loop down to a point while staying '
      + 'on the circle. Whether a homotopy exists is a genuine, provable topological OBSTRUCTION '
      + 'depending on the SPACE (a disk-like space like R² allows contraction; a loop-like space '
      + 'like S¹ provably does not) — never a foregone conclusion just because both maps are '
      + 'continuous on the same pair of spaces.',
    targetedMisconceptions: [`${HOMOTOPY}:MC-1`, `${HOMOTOPY}:MC-2`, `${HOMOTOPY}:MC-3`],
    source: eb(HOMOTOPY, 'Core Understanding — endpoint matching being necessary but never sufficient with joint continuity checked separately, homotopy being a genuine equivalence relation with each property backed by an explicit construction, and whether two maps are homotopic depending on the space never assumed automatic'),
  },
  {
    conceptId: HOMOLOGY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'H₀\'S RANK IS THE COMPONENT COUNT — NEVER ANY OTHER SIMPLEX TALLY: for two disjoint filled '
      + 'triangles (6 vertices, 6 edges, 2 two-simplices, no shared vertices): H₀(X)≅Z², rank '
      + 'EXACTLY 2 — matching the 2 connected components, NEVER the vertex count (6) or edge count '
      + '(6). H₀ answers exactly one question: how many separate pieces does the space fall into — '
      + 'nothing about raw simplex tallies enters its rank.\n\n'
      + 'A LOOP\'S H₁ CLASS DEPENDS ON WHETHER IT BOUNDS A 2-SIMPLEX — NEVER AUTOMATIC: for the SAME '
      + 'vertices A,B,C and edges {A,B},{B,C},{C,A}: the FILLED triangle (2-simplex {A,B,C} '
      + 'present) has the loop A→B→C→A bound the filled-in 2-simplex, representing the ZERO class '
      + '— H₁=0. The HOLLOW triangle (identical vertices/edges, 2-simplex REMOVED) has the SAME '
      + 'loop bound NOTHING present in the complex, representing a genuinely NONTRIVIAL class — '
      + 'H₁≅Z. The identical loop of edges is trivial or nontrivial DEPENDING ENTIRELY on whether a '
      + '2-simplex is present to fill it — never determined by the loop alone.\n\n'
      + 'HOMOLOGY IS A ONE-DIRECTIONAL DISTINGUISHING TOOL — NEVER A COMPLETE INVARIANT: a filled '
      + '2-simplex (disc) and a single point have IDENTICAL homology (H₀≅Z, Hₙ=0 for n≥1, both '
      + 'homotopy equivalent to a point) — yet they are NOT homeomorphic (different dimensions, '
      + 'cardinalities). Identical homology proves NOTHING about sameness. Contrast the filled '
      + 'triangle (H₁=0) versus the hollow triangle (H₁≅Z): their DIFFERING H₁ correctly CERTIFIES '
      + 'they cannot be homotopy equivalent. Different homology proves difference, reliably; '
      + 'identical homology proves nothing at all about sameness.',
    targetedMisconceptions: [`${HOMOLOGY}:MC-1`, `${HOMOLOGY}:MC-2`, `${HOMOLOGY}:MC-3`],
    source: eb(HOMOLOGY, 'Core Understanding — H0\'s rank being the component count never any other simplex tally, a loop\'s H1 class depending on whether it bounds a 2-simplex never automatic, and homology being a one-directional distinguishing tool never a complete invariant'),
  },
  {
    conceptId: HOMEOMORPHISM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'BIJECTIVE + CONTINUOUS DOES NOT AUTOMATICALLY GIVE A HOMEOMORPHISM — f⁻¹\'S CONTINUITY IS A '
      + 'SEPARATE, NON-FREE CONDITION: f:[0,1)→S¹, f(t)=e^(2πit) is bijective AND continuous — but '
      + 'f⁻¹ FAILS continuity at f(0)=1: a small arc near 1∈S¹ that wraps around pulls back to '
      + '[0,ε)∪(1−ε,1), a set with a GAP at 0, which is NOT open in [0,1). This is the canonical '
      + 'counterexample proving a homeomorphism genuinely needs THREE conditions, never just two — '
      + 'bijective continuity alone can fail to be "reversible" in the topological sense.\n\n'
      + 'TOPOLOGICAL INVARIANTS PROVE NON-HOMEOMORPHISM — NEVER CARDINALITY OR VISUAL SIMILARITY: R '
      + 'and [0,1] have the SAME cardinality (𝔠) — yet are NOT homeomorphic: [0,1] is compact, R is '
      + 'not, and compactness is a topological invariant (a continuous image of a compact space is '
      + 'compact), so any homeomorphism would force R to be compact — contradiction. Similarly, '
      + 'S¹≇R: removing any point p∈S¹ leaves a CONNECTED space (homeomorphic to (0,1)), but '
      + 'removing any point from R leaves a DISCONNECTED space (two rays) — connectedness is an '
      + 'invariant, so this asymmetry proves non-homeomorphism. Cardinality is a purely '
      + 'SET-THEORETIC fact, never a topological one; "looking similar" is not a proof technique at '
      + 'all.\n\n'
      + 'EXPLICIT HOMEOMORPHISMS ARE CONSTRUCTED BY VERIFYING ALL THREE CONDITIONS DIRECTLY: for '
      + 'f:(0,1)→R, f(t)=tan(π(t−½)): (i) bijective — tan maps (−π/2,π/2) bijectively to R, and the '
      + 'linear shift sends (0,1) bijectively to (−π/2,π/2); (ii) continuous — a composition of '
      + 'continuous functions; (iii) f⁻¹(x)=½+(1/π)arctan(x) IS continuous on R. All three '
      + 'conditions verified directly confirms (0,1)≅R — a BOUNDED open interval and the ENTIRE '
      + 'real line are topologically INDISTINGUISHABLE, proving boundedness is NOT itself a '
      + 'topological invariant.',
    targetedMisconceptions: [`${HOMEOMORPHISM}:MC-1`, `${HOMEOMORPHISM}:MC-2`, `${HOMEOMORPHISM}:MC-3`],
    source: eb(HOMEOMORPHISM, 'Core Understanding — bijective plus continuous never automatically giving a homeomorphism since the inverse\'s continuity is a separate non-free condition, topological invariants proving non-homeomorphism never cardinality or visual similarity, and explicit homeomorphisms being constructed by verifying all three conditions directly'),
  },
]

export const MATHEMATICS_TOP_HOMOTOPY_HOMOLOGY_HOMEOMORPHISM_PROBES: SeedProbe[] = [
  // HOMOTOPY
  {
    conceptId: HOMOTOPY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If a function H correctly satisfies H(x,0)=f(x) and H(x,1)=g(x), is it automatically a valid homotopy?',
    choices: [
      { text: "No — matching the endpoints is necessary but never sufficient; for X=[0,1], Y=R, f(x)=0, g(x)=1, the candidate H(x,t)=0 for t<1/2, H(x,t)=1 for t≥1/2 matches both endpoints exactly but JUMPS discontinuously at t=1/2, so it fails to be a homotopy — joint continuity of H as a function of (x,t) must be checked separately", isCorrect: true },
      { text: "Yes, any function satisfying the two endpoint conditions automatically qualifies as a valid homotopy", isCorrect: false, misconceptionId: `${HOMOTOPY}:MC-1` },
      { text: "Since the endpoint conditions are the most visually salient part of the definition, checking them should be sufficient without separately verifying joint continuity", isCorrect: false, misconceptionId: `${HOMOTOPY}:MC-1` },
    ],
    targetedMisconceptions: [`${HOMOTOPY}:MC-1`],
    source: eb(HOMOTOPY, 'Discovery Question 1 as a detection probe (verbatim) — whether a function satisfying the endpoint conditions is automatically a valid homotopy, an answer of "yes" confirming HOMOTOPY-ENDPOINTS-CHECKED-WITHOUT-VERIFYING-JOINT-CONTINUITY'),
  },
  {
    conceptId: HOMOTOPY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Must any two continuous maps between the same pair of spaces be homotopic to each other?',
    choices: [
      { text: "No — whether a homotopy exists depends on the space: on R², the identity and the constant map ARE homotopic via the straight-line homotopy, but on S¹, the identity and the constant map are famously NOT homotopic, since no continuous deformation can unwrap the circle's loop to a point while staying on the circle", isCorrect: true },
      { text: "Yes, any two continuous maps between the same pair of spaces must be homotopic to each other", isCorrect: false, misconceptionId: `${HOMOTOPY}:MC-2` },
      { text: "Since a continuous deformation should always be achievable between continuous maps on the same spaces, homotopy should hold automatically without needing a specific construction", isCorrect: false, misconceptionId: `${HOMOTOPY}:MC-2` },
    ],
    targetedMisconceptions: [`${HOMOTOPY}:MC-2`],
    source: eb(HOMOTOPY, 'Discovery Question 2 as a detection probe (verbatim) — whether any two continuous maps between the same spaces must be homotopic, an answer of "yes" confirming ALL-CONTINUOUS-MAPS-BETWEEN-SAME-SPACES-ASSUMED-HOMOTOPIC'),
  },
  {
    conceptId: HOMOTOPY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Can you exhibit the actual homotopies proving homotopy is reflexive, symmetric, and transitive, rather than just asserting these properties?',
    choices: [
      { text: "Yes — reflexive via H(x,t)=f(x) (constant in t); symmetric via H'(x,t)=H(x,1−t) (running the deformation backward); transitive via concatenating H1 (rescaled onto [0,1/2]) then H2 (rescaled onto [1/2,1]) — each property corresponds to an actual constructible homotopy", isCorrect: true },
      { text: "These equivalence-relation properties can simply be asserted as holding by definition, without needing to exhibit an explicit homotopy for each one", isCorrect: false, misconceptionId: `${HOMOTOPY}:MC-3` },
      { text: "Since homotopy is described as an equivalence relation, its reflexive, symmetric, and transitive properties should be accepted as abstract labels rather than requiring concrete constructions", isCorrect: false, misconceptionId: `${HOMOTOPY}:MC-3` },
    ],
    targetedMisconceptions: [`${HOMOTOPY}:MC-3`],
    source: eb(HOMOTOPY, 'Discovery Question 3 as a detection probe (verbatim) — whether the actual homotopies proving reflexive/symmetric/transitive can be exhibited, an inability or refusal to construct them confirming HOMOTOPY-EQUIVALENCE-RELATION-PROPERTIES-ASSUMED-WITHOUT-CONSTRUCTION'),
  },
  // HOMOLOGY
  {
    conceptId: HOMOLOGY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does H₀(X)\'s rank correspond to the number of vertices (or edges) in the simplicial complex?',
    choices: [
      { text: "No — H0's rank is exactly the number of connected components; for two disjoint filled triangles (6 vertices, 6 edges, 2 two-simplices, no shared vertices), H0(X)≅Z², rank exactly 2, matching the 2 components — NOT the vertex count (6) or edge count (6)", isCorrect: true },
      { text: "Yes, H0(X)'s rank corresponds to the number of vertices or edges in the simplicial complex", isCorrect: false, misconceptionId: `${HOMOLOGY}:MC-1` },
      { text: "Since a simplicial complex is defined by its list of simplices, H0's rank should be computed by tallying those simplices directly", isCorrect: false, misconceptionId: `${HOMOLOGY}:MC-1` },
    ],
    targetedMisconceptions: [`${HOMOLOGY}:MC-1`],
    source: eb(HOMOLOGY, 'Discovery Question 1 as a detection probe (verbatim) — whether H0\'s rank corresponds to a vertex or edge count, an answer of "yes" confirming H0-RANK-CONFUSED-WITH-SIMPLEX-COUNT'),
  },
  {
    conceptId: HOMOLOGY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does every closed loop of edges in a simplicial complex automatically represent a nontrivial class in H₁?',
    choices: [
      { text: "No — for the same vertices A,B,C and edges {A,B},{B,C},{C,A}: the FILLED triangle (2-simplex present) has the loop bound the filled-in simplex, representing the ZERO class (H1=0), while the HOLLOW triangle (2-simplex removed) has the same loop bound nothing, representing a nontrivial class (H1≅Z) — the class depends entirely on whether a 2-simplex fills it", isCorrect: true },
      { text: "Yes, every closed loop of edges in a simplicial complex automatically represents a nontrivial class in H1", isCorrect: false, misconceptionId: `${HOMOLOGY}:MC-2` },
      { text: "Since a loop visually suggests a hole, any closed loop of edges should be treated as a genuine nontrivial cycle in H1 regardless of what fills it", isCorrect: false, misconceptionId: `${HOMOLOGY}:MC-2` },
    ],
    targetedMisconceptions: [`${HOMOLOGY}:MC-2`],
    source: eb(HOMOLOGY, 'Discovery Question 2 as a detection probe (verbatim) — whether every closed loop automatically represents a nontrivial H1 class, an answer of "yes" confirming EVERY-LOOP-ASSUMED-NONTRIVIAL-IN-H1'),
  },
  {
    conceptId: HOMOLOGY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If two spaces have identical homology groups at every dimension, does that guarantee they are homeomorphic?',
    choices: [
      { text: "No — a filled 2-simplex (disc) and a single point have IDENTICAL homology (H0≅Z, Hn=0 for n≥1) yet are NOT homeomorphic (different dimensions, cardinalities); homology is a one-directional distinguishing tool — different homology proves difference, but identical homology proves nothing about sameness", isCorrect: true },
      { text: "Yes, identical homology groups at every dimension guarantee that two spaces are homeomorphic", isCorrect: false, misconceptionId: `${HOMOLOGY}:MC-3` },
      { text: "Since homology reliably proves that spaces with differing homology cannot be homeomorphic, the converse should also hold: identical homology should certify homeomorphism", isCorrect: false, misconceptionId: `${HOMOLOGY}:MC-3` },
    ],
    targetedMisconceptions: [`${HOMOLOGY}:MC-3`],
    source: eb(HOMOLOGY, 'Discovery Question 3 as a detection probe (verbatim) — whether identical homology at every dimension guarantees homeomorphism, an answer of "yes" confirming IDENTICAL-HOMOLOGY-ASSUMED-TO-IMPLY-HOMEOMORPHIC'),
  },
  // HOMEOMORPHISM
  {
    conceptId: HOMEOMORPHISM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is every bijective continuous map automatically a homeomorphism?',
    choices: [
      { text: "No — f:[0,1)→S¹, f(t)=e^(2πit) is bijective and continuous, but f⁻¹ fails continuity at f(0)=1: a small arc near 1 wraps around and pulls back to a set with a gap at 0, which is not open in [0,1); a homeomorphism genuinely needs f⁻¹'s continuity as a separate, non-free third condition", isCorrect: true },
      { text: "Yes, every bijective continuous map is automatically a homeomorphism", isCorrect: false, misconceptionId: `${HOMEOMORPHISM}:MC-1` },
      { text: "Since a bijective continuous map already pairs up every point between the two spaces, its inverse should automatically inherit continuity as well", isCorrect: false, misconceptionId: `${HOMEOMORPHISM}:MC-1` },
    ],
    targetedMisconceptions: [`${HOMEOMORPHISM}:MC-1`],
    source: eb(HOMEOMORPHISM, 'Discovery Question 1 as a detection probe (verbatim) — whether every bijective continuous map is automatically a homeomorphism, an answer of "yes" confirming HOMEOMORPHISM-MEANS-BIJECTIVE-CONTINUOUS'),
  },
  {
    conceptId: HOMEOMORPHISM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If two spaces have the same cardinality, must they be homeomorphic?',
    choices: [
      { text: "No — R and [0,1] have the same cardinality (𝔠) but are not homeomorphic: [0,1] is compact, R is not, and compactness is a topological invariant, so any homeomorphism would force R to be compact, a contradiction; cardinality is a purely set-theoretic fact, never a topological one", isCorrect: true },
      { text: "Yes, if two spaces have the same cardinality, they must be homeomorphic", isCorrect: false, misconceptionId: `${HOMEOMORPHISM}:MC-2` },
      { text: "Since cardinality measures how many points a space has, matching cardinalities should be sufficient evidence that the spaces share the same topological structure", isCorrect: false, misconceptionId: `${HOMEOMORPHISM}:MC-2` },
    ],
    targetedMisconceptions: [`${HOMEOMORPHISM}:MC-2`],
    source: eb(HOMEOMORPHISM, 'Discovery Question 2 as a detection probe (verbatim) — whether same cardinality implies homeomorphic, an answer of "yes" confirming SAME-CARDINALITY-IMPLIES-HOMEOMORPHIC'),
  },
  {
    conceptId: HOMEOMORPHISM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If two spaces look geometrically similar, must they be homeomorphic?',
    choices: [
      { text: "No — visual similarity is never a proof technique; proving non-homeomorphism requires exhibiting an actual topological invariant (like compactness or connectedness) that one space has and the other lacks, such as removing a point from S¹ leaving a connected space versus removing a point from R leaving a disconnected space", isCorrect: true },
      { text: "Yes, spaces that look geometrically similar must be homeomorphic", isCorrect: false, misconceptionId: `${HOMEOMORPHISM}:MC-3` },
      { text: "Since visual/geometric intuition usually tracks topological structure closely, two spaces that look alike should be treated as homeomorphic without needing an invariant argument", isCorrect: false, misconceptionId: `${HOMEOMORPHISM}:MC-3` },
    ],
    targetedMisconceptions: [`${HOMEOMORPHISM}:MC-3`],
    source: eb(HOMEOMORPHISM, 'Discovery Question 3 as a detection probe (verbatim) — whether visually similar spaces must be homeomorphic, an answer of "yes" confirming VISUALLY-SIMILAR-MEANS-HOMEOMORPHIC'),
  },
]
