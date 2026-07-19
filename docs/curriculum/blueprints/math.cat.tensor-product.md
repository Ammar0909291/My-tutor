# Teaching Blueprint: Tensor Product (Categorical) (`math.cat.tensor-product`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cat.tensor-product` |
| name | Tensor Product (Categorical) |
| domain | Category Theory |
| difficulty | research |
| bloom | analyze |
| mastery_threshold | 0.5 → MAMR = ⌈0.5×5⌉ = 3/5 |
| estimated_hours | 7 |
| requires | `math.cat.limits` |
| unlocks | none |
| cross_links | `math.linalg.tensor` (authored earlier in this same batch — see Component 7) |
| CPA_entry_stage | A (Abstract) — research-level learner already fluent in limits/universal properties; the monoidal-category axioms are introduced directly |
| description (KG) | A monoidal category $(C,\otimes,I)$ has a tensor product $\otimes:C\times C\to C$ and unit $I$ satisfying associativity and unit laws up to natural isomorphism. Examples: $(\mathrm{Set},\times,\{*\})$, $(\mathrm{Ab},\otimes_\mathbb{Z},\mathbb{Z})$, $(\mathrm{Vect},\otimes,k)$. Symmetric monoidal: $A\otimes B\cong B\otimes A$. |

## Component 1 — Learning Objectives

- LO1: Define a **monoidal category** $(C,\otimes,I)$ — a bifunctor $\otimes:C\times C\to C$ together with a unit object $I$, satisfying associativity and unit laws — and recognize $(\mathrm{Vect},\otimes,k)$, with $\otimes$ the ordinary vector-space tensor product from `math.linalg.tensor`, as the CONCRETE instance this abstract structure generalizes.
- LO2: Verify that $(\mathrm{Set},\times,\{*\})$ satisfies the monoidal laws only **up to natural isomorphism**, not literal equality — i.e. $A\times(B\times C)\ne(A\times B)\times C$ as literal sets, but there is a canonical, coherent isomorphism between them.
- LO3 (orientation level — full coherence theory deferred): recognize, without full derivation, that **symmetric** monoidal structure ($A\otimes B\cong B\otimes A$) is EXTRA data, not automatic, previewing $(\mathrm{Ab},\otimes_\mathbb{Z},\mathbb{Z})$ as a further concrete instance.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cat.limits` (universal properties and natural isomorphism, the exact tool needed to state the monoidal laws correctly as "up to iso" rather than "on the nose").

## Component 3 — Core Explanation

**Why $\otimes$ needs to be a bifunctor, not just an operation on objects**: a monoidal category $(C,\otimes,I)$ requires $\otimes:C\times C\to C$ to act on BOTH objects and morphisms functorially — given $f:A\to A'$ and $g:B\to B'$, there must be a well-defined $f\otimes g:A\otimes B\to A'\otimes B'$. This is exactly what `math.linalg.tensor`'s own linearity verification of $u\otimes v$ already demonstrated concretely in $\mathrm{Vect}$: the tensor product respects linear structure in each slot, which is precisely the functoriality this categorical definition abstracts.

**Associativity and unit laws hold up to natural isomorphism, not equality**: the defining laws are $(A\otimes B)\otimes C\cong A\otimes(B\otimes C)$ (the associator $\alpha$) and $I\otimes A\cong A\cong A\otimes I$ (the unitors $\lambda,\rho$) — natural isomorphisms, not literal equalities. This distinction matters because in a category like $\mathrm{Set}$, $(A\times B)\times C$ and $A\times(B\times C)$ are literally different sets (nested pairs vs. flat pairs), yet the canonical re-bracketing map between them is a coherent isomorphism satisfying Mac Lane's pentagon condition — treating this as "morally equal" rather than demanding literal equality is the entire point of the categorical abstraction.

**Symmetric monoidal structure is additional, not automatic (orientation level)**: a monoidal category need not have $A\otimes B\cong B\otimes A$ at all; when it does, via a natural isomorphism satisfying its own coherence (hexagon) condition, the category is called SYMMETRIC monoidal. $(\mathrm{Vect},\otimes,k)$ and $(\mathrm{Ab},\otimes_\mathbb{Z},\mathbb{Z})$ are both symmetric monoidal, but this is an extra property to verify, not a free consequence of being monoidal.

## Component 4 — Worked Examples

**Example 1 (LO1 — $(\mathrm{Vect},\otimes,k)$ as the concrete instance, breaking MC-1, cross-link probe engaging `math.linalg.tensor`)**: `math.linalg.tensor` constructed $u\otimes v$ for vectors $u,v\in V$ and VERIFIED it is multilinear — i.e., that $\otimes$ respects the linear-map structure in each argument. This is exactly the bifunctoriality $\otimes:\mathrm{Vect}\times\mathrm{Vect}\to\mathrm{Vect}$ demands categorically: objects (vector spaces) map to objects ($V\otimes W$), and linear maps $f:V\to V'$, $g:W\to W'$ combine to a linear map $f\otimes g:V\otimes W\to V'\otimes W'$. The field $k$ itself (as a 1-dimensional vector space) serves as the unit object $I$, since $k\otimes V\cong V$ — matching `math.linalg.tensor`'s own type-$(0,0)$ scalars as the "trivial" tensor case. This concrete, already-verified instance is what the abstract axioms below are generalizing.

**Example 2 (LO2 — $(\mathrm{Set},\times,\{*\})$ up to natural isomorphism, breaking MC-2)**: take $A=\{1,2\}$, $B=\{a\}$, $C=\{x,y\}$. Literally, $(A\times B)\times C$ has elements like $((1,a),x)$, while $A\times(B\times C)$ has elements like $(1,(a,x))$ — DIFFERENT sets as raw data (nested pairs disagree in shape), so $(A\times B)\times C\ne A\times(B\times C)$ on the nose. However, the map $((1,a),x)\mapsto(1,(a,x))$ is a canonical bijection — natural in $A,B,C$ — giving a genuine isomorphism $(A\times B)\times C\cong A\times(B\times C)$. The unit law: $\{*\}\times A=\{(*,1),(*,2)\}$ is not literally $A=\{1,2\}$, but the canonical projection $(*,a)\mapsto a$ is a natural isomorphism $\{*\}\times A\cong A$. This confirms the monoidal laws are genuinely about coherent isomorphism, not literal set equality.

**Example 3 (LO3, orientation level — symmetric monoidal structure as extra data, breaking MC-3)**: in $\mathrm{Set}$, the swap map $A\times B\to B\times A$, $(a,b)\mapsto(b,a)$, is a natural isomorphism, so $(\mathrm{Set},\times,\{*\})$ IS symmetric monoidal. In $(\mathrm{Ab},\otimes_\mathbb{Z},\mathbb{Z})$, the analogous swap $a\otimes b\mapsto b\otimes a$ is likewise a natural isomorphism — again symmetric. Both cases required verifying an EXTRA map with its own coherence condition (the hexagon axiom), not merely observing that a monoidal structure automatically commutes — a genuinely non-symmetric monoidal category is possible in principle (braided categories relax the hexagon further), which is why this property must be checked, not assumed.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Abstract Axioms Are Read Off an Already-Verified Concrete Case (Primitive P11: Representation Shift)

State: "you already verified, in `math.linalg.tensor`, that $\otimes$ on vector spaces respects linear maps in each slot — that's precisely the bifunctoriality this categorical definition is naming abstractly." Walk Example 1's identification of $(\mathrm{Vect},\otimes,k)$ against the axioms.

- **MC-1 hook**: ask "is the categorical monoidal-category definition an unrelated new structure, disconnected from the vector-space tensor product you already built?" — a "yes" answer reveals MC-1 (missing that $(\mathrm{Vect},\otimes,k)$ is the concrete instance the abstract axioms directly generalize).

### Teaching Action A02 — "Up To Isomorphism" Is Not "Equal" (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $(A\times B)\times C$ and $A\times(B\times C)$ are literally different sets, yet the monoidal law holds. State: "the associativity law never claims these are the SAME set — it claims a specific, coherent, natural isomorphism connects them, and that distinction is the entire content of the axiom."

- **MC-2 hook**: ask "does the associativity law $(A\otimes B)\otimes C\cong A\otimes(B\otimes C)$ mean these are literally the same object?" — a "yes" answer reveals MC-2 (missing that monoidal laws hold up to coherent natural isomorphism, not literal equality).

### Teaching Action A03 — Symmetric Structure Must Be Verified, Not Assumed (Primitive P06: Contrast Pair)

Contrast a generic monoidal category (associativity/unit laws only, Example 2) against Example 3's ADDITIONAL verification of the swap map's naturality and coherence for symmetric monoidal structure. State: "being monoidal never automatically hands you $A\otimes B\cong B\otimes A$ — that's an extra structure, symmetric monoidal categories carry it, but the definition of monoidal alone does not guarantee it."

- **MC-3 hook**: ask "does every monoidal category automatically satisfy $A\otimes B\cong B\otimes A$?" — a "yes" answer reveals MC-3 (missing that symmetric monoidal structure is additional data with its own coherence condition, not a free consequence of the monoidal axioms).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State the three data $(C,\otimes,I)$ a monoidal category requires, and the two law-types (associativity, unit) they must satisfy.
  2. Explain why $(\mathrm{Vect},\otimes,k)$, using `math.linalg.tensor`'s own tensor product, satisfies bifunctoriality.
  3. For $A=\{1\},B=\{2,3\}$, write out $(\{*\}\times A)$ and $A$ explicitly, and state the natural isomorphism between them (the unit law).
  4. Explain, without full proof, why symmetric monoidal structure is an ADDITIONAL property rather than automatic for any monoidal category.
- **P76 (Transfer Probe, mode = cross-link probe engaging `math.linalg.tensor`)**: "Consider $(\mathrm{Ab},\otimes_\mathbb{Z},\mathbb{Z})$, the tensor product of abelian groups over $\mathbb{Z}$. (a) Identify the unit object and explain, by analogy with `math.linalg.tensor`'s field-as-scalars case, why $\mathbb{Z}\otimes_\mathbb{Z}A\cong A$. (b) State whether $(\mathrm{Ab},\otimes_\mathbb{Z},\mathbb{Z})$ is symmetric monoidal, and what would need verifying to confirm it. (c) Contrast this categorical tensor product with `math.linalg.tensor`'s own vector-space tensor product: what is preserved in the generalization from $\mathrm{Vect}$ to $\mathrm{Ab}$, and what is abstracted away?"
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 3/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CATEGORICAL-TENSOR-ASSUMED-UNRELATED-TO-VECT | Believing the categorical monoidal-category definition is an unrelated abstract structure, missing that $(\mathrm{Vect},\otimes,k)$ — using `math.linalg.tensor`'s own construction — is the concrete instance it directly generalizes | Foundational |
| MC-2 | MONOIDAL-LAWS-ASSUMED-LITERAL-EQUALITY | Believing associativity/unit laws mean literal equality of objects, missing that they hold up to coherent natural isomorphism | High |
| MC-3 | SYMMETRY-ASSUMED-AUTOMATIC | Believing every monoidal category automatically satisfies $A\otimes B\cong B\otimes A$, missing that symmetric monoidal structure is additional, separately verified data | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Categorical Tensor Assumed Unrelated to Vect") → P41 (detect: ask whether the abstract monoidal-category definition is disconnected from the vector-space tensor product) → P64 (conceptual shift: re-walk Example 1's identification of $(\mathrm{Vect},\otimes,k)$ against the axioms, re-anchoring on "the abstract definition is read directly off the concrete case you already verified").
- **B02 (targets MC-2)**: P27 (name it: "Monoidal Laws Assumed Literal Equality") → P41 (detect: ask whether $(A\otimes B)\otimes C\cong A\otimes(B\otimes C)$ means literal equality) → P64 (conceptual shift: re-walk Example 2's explicit nested-pair mismatch and canonical isomorphism, re-anchoring on "coherent natural isomorphism, not literal equality, is the content of the law").
- **B03 (targets MC-3)**: P27 (name it: "Symmetry Assumed Automatic") → P41 (detect: ask whether every monoidal category automatically has $A\otimes B\cong B\otimes A$) → P64 (conceptual shift: re-walk Example 3's separate verification of the swap map and its coherence condition, re-anchoring on "symmetric monoidal is extra structure, not a free consequence").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cat.limits` (universal properties and natural isomorphism, the exact machinery needed to state the monoidal laws correctly as "up to iso").
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.linalg.tensor`, checked via `ls docs/curriculum/blueprints/` and confirmed ALREADY authored (earlier in this same batch). $P76_{mode}=$ **cross-link probe**, engaging `math.linalg.tensor`'s own field-as-unit-object construction directly in Example 1 and the P76 transfer probe.

## Component 8 — Teaching Notes

- estimated_hours = 7 with a research/analyze tag supports the "3 TAs + gate" tier at full abstraction depth, with LO1 and LO2 given complete concrete verification (the $\mathrm{Vect}$ instance and the $\mathrm{Set}$ associator) and LO3 kept orientation-level, appropriately surveying symmetric monoidal structure without proving the hexagon coherence condition in full.
- **Division of labor**: `math.linalg.tensor` owns the CONCRETE construction and multilinearity-verification of $\otimes$ on vector spaces; this concept owns the ABSTRACT categorical generalization — the bifunctor/associator/unitor axioms — deliberately reusing `math.linalg.tensor`'s own already-verified $u\otimes v$ construction as Example 1's worked instance rather than re-deriving tensor multilinearity from scratch.
- Example 2's deliberate choice of small, explicit finite sets ($A=\{1,2\}$, $B=\{a\}$, $C=\{x,y\}$) was chosen so the nested-pair mismatch between $(A\times B)\times C$ and $A\times(B\times C)$ can be written out literally, element by element, rather than argued only abstractly.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.linalg.tensor` confirmed authored earlier this batch → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.5×5⌉=3) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: research-level learner already fluent in limits/universal properties; axioms introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
