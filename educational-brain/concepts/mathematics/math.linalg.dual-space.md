# math.linalg.dual-space

## Identity
- **KG id**: `math.linalg.dual-space`
- **Domain**: math.linalg
- **Requires**: `math.linalg.vector-space`, `math.linalg.linear-map`
- **Unlocks**: `math.linalg.tensor`
- **Cross-links**: `math.fnal.dual-space-functional` (Blueprint's own Component 7 claimed
  "authored" — this checked the wrong corpus; the EDUCATIONAL-BRAIN corpus does NOT yet have this
  concept authored — corrected to independence mode, see Curriculum Feedback)
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.75
- **Estimated hours**: 5

## Learning Objective
Define $V^*=\text{Hom}(V,F)$ as itself a vector space, requiring NOTHING beyond the already-known
linearity check (never geometric structure like an inner product or norm); construct the dual
basis $\{f^1,\ldots,f^n\}$ satisfying $f^i(e_j)=\delta_{ij}$ to PROVE $\dim(V^*)=\dim(V)$ by
explicit construction (never assumed); and contrast this algebraic dual (defined for ANY vector
space, no boundedness) against the analytic dual (bounded functionals only), recognizing they
COINCIDE in finite dimensions but genuinely DIVERGE in infinite dimensions.

## Core Understanding
$V^*$ REQUIRES ONLY LINEARITY — NEVER GEOMETRIC STRUCTURE: on $V=\mathbb R^3$: $f(x,y,z)=2x-3y+z$
is verified linear via the SAME additivity and homogeneity checks already used for ordinary linear
maps — NO norm, inner product, or geometric structure of any kind was invoked. A linear functional
is simply a linear map whose codomain happens to be $F$ itself; $V^*=\text{Hom}(V,F)$ is a vector
space under pointwise addition and scalar multiplication of functionals — nothing beyond
`math.linalg.linear-map`'s own linearity check is needed.

THE DUAL BASIS PROVES $\dim(V^*)=\dim(V)$ BY EXPLICIT CONSTRUCTION — NEVER ASSUMED: for
$V=\mathbb R^3$ with standard basis $e_1,e_2,e_3$: the coordinate functionals $f^1(x,y,z)=x$,
$f^2(x,y,z)=y$, $f^3(x,y,z)=z$ satisfy $f^i(e_j)=\delta_{ij}$ exactly. Any functional
$f(x,y,z)=ax+by+cz$ equals $af^1+bf^2+cf^3$ (SPANNING), and evaluating a combination at
$e_1,e_2,e_3$ forces all coefficients to zero when the combination is the zero functional
(INDEPENDENCE). Since $V^*$ has a basis of exactly $n$ elements, $\dim(V^*)=n=\dim(V)$ — a GENUINE,
CONSTRUCTED equality, never merely asserted. Critically, $f^i$ (a FUNCTION living in $V^*$) is NOT
the same object as $e_i$ (a VECTOR living in $V$) — they're related ONLY by the $\delta_{ij}$
pairing condition, never identified with each other.

ALGEBRAIC AND ANALYTIC DUALS COINCIDE IN FINITE DIMENSIONS, DIVERGE IN INFINITE ONES — NEVER
ALWAYS THE SAME: in finite dimensions (e.g. $V=\mathbb R^3$), EVERY linear functional is
automatically bounded/continuous — the algebraic dual $V^*=\text{Hom}(V,F)$ and
`math.fnal.dual-space-functional`'s analytic dual (bounded functionals on a normed space) are
LITERALLY the same space here. But for $V=$ the space of finite-support real sequences: the
algebraic dual $\text{Hom}(V,\mathbb R)$ is DRAMATICALLY LARGER than the span of coordinate
functionals — since every $v\in V$ has finitely many nonzero coordinates, ANY assignment of values
(even wildly unbounded ones) to $f^1(e_1),f^2(e_2),\ldots$ defines a VALID linear functional.
Requiring BOUNDEDNESS (with a chosen norm) excludes most of these — boundedness is a FREE,
automatic condition in finite dimensions but a genuinely RESTRICTIVE extra requirement in infinite
ones.

## Mental Models
- **"A linear functional is just a linear map with the field itself as its target — nothing new
  beyond the linearity check you already know."**
- **"The dual basis lives in a different space entirely — functions in V*, related to the original
  basis vectors only by a pairing condition, never the same objects renamed."**
- **"Boundedness is free in finite dimensions but a real, restrictive extra condition once
  dimension becomes infinite — that's exactly where the algebraic and analytic duals split."**

## Why Students Fail

### MC-1: DUAL-SPACE-REQUIRES-GEOMETRIC-STRUCTURE
- **Surface form**: believes the dual space $V^*$ can only be defined when $V$ has an inner
  product or a norm, rather than recognizing it requires nothing beyond linearity.
- **Birth type**: Foundational severity (Blueprint's own declared severity — dual spaces are often
  first encountered in inner-product-space contexts, obscuring their purely algebraic definition).
- **Repair**: re-walk the linearity-only verification, re-anchoring on "no norm or inner product
  appeared anywhere."

### MC-2: DUAL-BASIS-CONFLATED-WITH-ORIGINAL-BASIS
- **Surface form**: treats dual basis functionals $f^i$ as essentially the same objects as the
  original basis vectors $e_i$, rather than recognizing they live in a genuinely different space.
- **Birth type**: High severity (Blueprint's own declared severity — the matching indices and the
  $\delta_{ij}$ pairing can suggest identity rather than a mere relationship).
- **Repair**: re-walk the function-versus-vector distinction, re-anchoring on "two different
  spaces, related only by the pairing condition."

### MC-3: ALGEBRAIC-AND-ANALYTIC-DUAL-ASSUMED-IDENTICAL
- **Surface form**: believes the algebraic dual $V^*$ and the analytic dual $X^*$ always coincide,
  missing that they genuinely diverge in infinite dimensions.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the finite-dimensional
  case, where they DO coincide, is the more commonly encountered scenario).
- **Repair**: re-walk the finite-support sequence space example, re-anchoring on "boundedness is
  free in finite dimensions but restrictive in infinite ones."

## Misconceptions

### MC-1: DUAL-SPACE-REQUIRES-GEOMETRIC-STRUCTURE
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: DUAL-BASIS-CONFLATED-WITH-ORIGINAL-BASIS
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: ALGEBRAIC-AND-ANALYTIC-DUAL-ASSUMED-IDENTICAL
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A dual basis functional is a measuring instrument tuned to isolate one specific coordinate —
  it's a tool that READS the vector, never the vector itself."**
- **Anti-analogy**: the algebraic and analytic duals are NOT interchangeable names for the same
  thing in general — they only happen to agree in finite dimensions, where boundedness is
  automatic.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the linearity-only verification of $f(x,y,z)=2x-3y+z$ on
  $\mathbb R^3$.
- **Demonstration 2 (targets MC-2)**: the explicit dual basis construction for $\mathbb R^3$,
  verifying spanning and independence.
- **Demonstration 3 (targets MC-3)**: the finite-support sequence space example, showing the
  algebraic dual is dramatically larger than the bounded-functionals-only analytic dual.

## Discovery Questions
1. "Does defining the dual space V* require V to have an inner product or a norm?"
2. "Is the dual basis vector f¹ essentially the same object as the basis vector e₁, just in
   different notation?"
3. "Are the algebraic dual and the analytic dual (bounded functionals only) simply the same
   notion under two different names?"

## Teaching Sequence
1. **Representation shift**: the linearity-only functional definition, working Demonstration 1,
   isolating MC-1.
2. **Conflict evidence**: the dual basis as a genuinely different-space object, working
   Demonstration 2, isolating MC-2.
3. **Contrast pair**: the finite-versus-infinite-dimensional algebraic/analytic dual divergence,
   working Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct linearity verification for a functional, a correct explicit
   dual basis construction proving $\dim(V^*)=\dim(V)$, and a correct explanation of why the
   algebraic and analytic duals coincide in finite dimensions but not infinite ones, at the
   Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept a claim that the dual space requires an inner product or norm to be defined.
- Never accept the dual basis functionals treated as identical to the original basis vectors.
- Never accept a claim that the algebraic and analytic duals always coincide.

## Voice Teaching Notes
- Say "is that just the linearity check, or does it need geometric structure too?" whenever the
  dual space is introduced.
- Ask "is f¹ a vector or a function — which space does it actually live in?" whenever the dual
  basis is discussed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies a functional's linearity via additivity and
  homogeneity alone.
- **Rung 2 (application)**: learner correctly constructs an explicit dual basis and proves
  $\dim(V^*)=\dim(V)$ via spanning and independence.
- **Rung 3 (transfer)**: learner correctly explains when and why the algebraic and analytic duals
  diverge, using a genuinely infinite-dimensional example.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the linearity-only verification.
- If MC-2 recurs, re-walk the function-versus-vector distinction.
- If MC-3 recurs, re-walk the finite-support sequence space example.

## Memory Hooks
- "A functional needs only linearity — never a norm or inner product."
- "The dual basis lives in a different space — related to the original basis only by pairing,
  never identical to it."
- "Boundedness is free in finite dimensions, restrictive in infinite ones — that's where the
  algebraic and analytic duals split."

## Transfer Connections
- `math.linalg.vector-space` (already authored, certified domain): supplies the vector space
  axioms applied here to $F$ itself as a 1-dimensional space.
- `math.linalg.linear-map` (already authored, certified domain): supplies the linearity definition
  this concept's functionals directly reuse, and the "determined by basis action" fact underlying
  the dual basis construction.
- `math.linalg.tensor` (not yet authored, KG's declared unlock): will build tensor products using
  $V$ and $V^*$ together.
- `math.fnal.dual-space-functional` (not yet authored in the EB corpus — see Curriculum Feedback):
  the KG's declared cross-link, the analytic (bounded-functionals) dual this concept's algebraic
  dual is directly contrasted against.

## Cross-Subject Connections
- Differential geometry: dual spaces as 1-forms, the natural pairing between tangent vectors and
  covectors.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.dual-space.md`, reused by reference
  for its linearity-only functional verification, its explicit $\mathbb R^3$ dual basis
  construction, its finite-support sequence space algebraic/analytic divergence example, and its
  three-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own cross-link-probe intent (deferred to independence mode here,
  pending `math.fnal.dual-space-functional`'s EB authoring), constructing a dual basis for
  $\mathbb R^4$ and checking a proposed non-linear functional.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Wrong-corpus cross-link discrepancy found and corrected**: the Blueprint's own Component 7
  claims `math.fnal.dual-space-functional` is "authored" — checked against the BLUEPRINTS
  directory, where its Blueprint DOES exist, not the EDUCATIONAL-BRAIN corpus, where it does NOT
  yet exist — corrected to independence mode here, the eighth such wrong-corpus discrepancy this
  campaign (after Batches 128-129, 157, 160, 161, 162 (two instances), and 168).
- All other fields (requires `math.linalg.vector-space`/`math.linalg.linear-map`, unlocks
  `math.linalg.tensor`, expert/understand, mastery_threshold 0.75, estimated_hours 5) matched the
  live KG exactly.

## Version History
- 2026-09-19 (Batch 179): authored. Second entry this batch. Companion batch concept:
  `math.linalg.least-squares`.
