# Teaching Blueprint: Tensor (`math.linalg.tensor`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.tensor` |
| name | Tensor |
| domain | Linear Algebra |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.7 → MAMR = ⌈0.7×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.linalg.vector-space`, `math.linalg.linear-map` |
| unlocks | none |
| cross_links | `math.cat.tensor-product` (not yet authored at time of writing — see Component 7) |
| CPA_entry_stage | A (Abstract) — expert learner already fluent in vector spaces, dual spaces, and linear maps; the multilinear-map unification is introduced directly |
| description (KG) | A multilinear map T: V×⋯×V×V*×⋯×V*→F of type (r,s), where r contravariant and s covariant indices. Includes scalars (0,0), vectors (1,0), dual vectors (0,1), and matrices (1,1). Tensor product ⊗ constructs higher-rank tensors. |

## Component 1 — Learning Objectives

- LO1: Define a tensor of type $(r,s)$ as a MULTILINEAR map $T:V\times\cdots\times V\times V^*\times\cdots\times V^*\to F$ ($r$ copies of $V$, $s$ copies of $V^*$) — linear in EACH argument separately — and recognize vectors (type $(1,0)$), dual vectors (type $(0,1)$), and matrices (type $(1,1)$) as SPECIAL CASES of this one unifying framework, not as separate, unrelated objects.
- LO2: Construct the **tensor product** $\otimes$ of two tensors (e.g. two vectors) to build a higher-rank tensor, and VERIFY the result is itself genuinely multilinear.
- LO3 (orientation level — full generalization deferred to the cross-linked child): recognize, without full derivation, that tensors provide the natural language for physics (e.g. the metric tensor), and recognize that $\otimes$ generalizes vastly beyond vector spaces to entire categories, deferred to `math.cat.tensor-product`.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.vector-space` (vector spaces and their axioms) and `math.linalg.linear-map` (linear maps and their defining conditions).

## Component 3 — Core Explanation

**Vectors, covectors, and matrices are special cases of one framework**: a type $(r,s)$ tensor is a MULTILINEAR map taking $r$ vector arguments and $s$ covector (dual vector) arguments to a scalar. A vector $v\in V$ is a type $(1,0)$ tensor: viewed as the map $f\mapsto f(v)$ on $V^*$, genuinely linear in $f$. A covector $f\in V^*$ is a type $(0,1)$ tensor: the map $v\mapsto f(v)$, linear in $v$. A matrix (representing a linear map $V\to V$) is a type $(1,1)$ tensor: the bilinear map $(f,v)\mapsto f(Av)$, linear in EACH argument separately. Vectors, covectors, and matrices are therefore not three separate kinds of objects — they are three SPECIAL CASES of one unifying multilinear-map framework, distinguished only by their type $(r,s)$.

**Constructing higher-rank tensors via $\otimes$**: given tensors of types $(r_1,s_1)$ and $(r_2,s_2)$, their tensor product has type $(r_1+r_2,s_1+s_2)$ — the tensor product COMBINES two tensors into a genuinely higher-rank multilinear object, and this combined object must itself be verified to be multilinear (not merely asserted).

**Tensors in physics, and the categorical generalization (orientation level)**: the metric tensor in general relativity is a type $(0,2)$ tensor, giving the geometric "inner product" structure of spacetime at each point — a genuine application of this exact multilinear-map framework. Separately, `math.cat.tensor-product` develops a vast generalization of the $\otimes$ operation constructed here, extending it from vector spaces to entire categories, where it becomes part of the structure of a "monoidal category" — deferred there for full development.

## Component 4 — Worked Examples

**Example 1 (LO1 — vectors, covectors, and matrices unified, breaking MC-1)**: a vector $v\in V$, viewed as the functional $v(f)=f(v)$ on $V^*$, is genuinely linear in $f$ (since $f$ itself is linear, and this is just evaluation) — a type $(1,0)$ tensor. A covector $f\in V^*$ is the linear map $v\mapsto f(v)$ — type $(0,1)$. A matrix $A$ (representing a linear map $V\to V$) is the bilinear map $A(f,v)=f(Av)$ — linear in $f$ AND in $v$ separately — type $(1,1)$. Vectors, covectors, and matrices are therefore three SPECIAL CASES of one unifying multilinear-map framework, distinguished only by type $(r,s)$.

**Example 2 (LO2 — constructing and verifying the tensor product, breaking MC-2)**: given vectors $u,v\in V$ (type $(1,0)$ each), their tensor product $u\otimes v$ is a type $(2,0)$ tensor, defined by $(u\otimes v)(f,g)=f(u)g(v)$ for $f,g\in V^*$. Verifying linearity in the first slot: $(u\otimes v)(af_1+bf_2,g)=(af_1+bf_2)(u)\cdot g(v)=[af_1(u)+bf_2(u)]g(v)=a[f_1(u)g(v)]+b[f_2(u)g(v)]=a(u\otimes v)(f_1,g)+b(u\otimes v)(f_2,g)$ — genuinely linear in the first argument, confirming $u\otimes v$ really is a valid $(2,0)$ tensor, not merely a symbolic pairing.

**Example 3 (LO3, orientation level — physics application and categorical preview)**: the metric tensor $g$ in general relativity is a type $(0,2)$ tensor (a bilinear map on $V\times V$), giving spacetime's inner-product structure at each point — a genuine application of the exact multilinear-map framework developed here. Separately, `math.cat.tensor-product` extends the $\otimes$ operation constructed in Example 2 from vector spaces to entire categories, where it becomes part of the structure of a "monoidal category" — deferred there for full development.

## Component 5 — Teaching Actions

### Teaching Action A01 — Vectors, Covectors, and Matrices Are One Framework, Not Three (Primitive P11: Representation Shift)

State: "you don't need three separate theories for vectors, covectors, and matrices — they're all multilinear maps, just with different numbers of vector and covector arguments." Work Example 1's unified derivation of all three as tensors of different types.

- **MC-1 hook**: ask "are vectors, dual vectors, and matrices three separate kinds of mathematical objects that happen to share some algebraic similarities?" — a "yes" answer reveals MC-1 (missing that they are special cases of one unifying multilinear-map framework).

### Teaching Action A02 — The Tensor Product Must Be Verified Multilinear, Not Assumed (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $u\otimes v$'s linearity in its first argument is explicitly checked via the defining formula, not merely asserted from the notation. State: "$u\otimes v$ isn't just a symbol pairing two vectors — it's a genuine multilinear map, and that has to be verified directly, exactly as for any other tensor."

- **MC-2 hook**: ask "is $u\otimes v$ merely a formal, symbolic pairing of $u$ and $v$ with no independent multilinear-map meaning?" — a "yes" answer reveals MC-2 (missing that it must be, and can be, directly verified as genuinely multilinear).

### Teaching Action A03 — Tensors Have Real Applications and a Vast Generalization (Primitive P06: Contrast Pair)

Contrast treating tensors as an obscure, self-contained abstraction against Example 3's dual preview: a genuine physics application (the metric tensor) and a vast categorical generalization (`math.cat.tensor-product`). State: "this isn't an abstraction for its own sake — it's the language of general relativity, and it generalizes far beyond vector spaces."

- **MC-3 hook**: ask "are tensors an obscure abstraction with no real physical or further-mathematical significance?" — a "yes" answer reveals MC-3 (missing their genuine physics role and their vast categorical generalization).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Explain why a vector $v\in V$, viewed as a functional on $V^*$ via $v(f)=f(v)$, is genuinely linear in $f$.
  2. For covectors $f,g\in V^*$ (type $(0,1)$ tensors), describe what type of tensor $f\otimes g$ would be, and state the general rule (in terms of $r,s$) for the type of a tensor product of a type $(r_1,s_1)$ tensor and a type $(r_2,s_2)$ tensor.
  3. Verify that the matrix-as-tensor construction $A(f,v)=f(Av)$ is linear in $v$ (holding $f$ fixed), completing the bilinearity check begun in Component 3.
  4. Explain, in your own words, why a matrix representing a linear map can be understood as a type $(1,1)$ tensor, rather than a fundamentally different kind of object from vectors and covectors.
- **P76 (Transfer Probe, mode = independence)**: "In continuum mechanics, the STRESS TENSOR $\sigma$ at a point in a material is a type $(0,2)$ tensor, describing how forces act across surfaces of different orientations. (a) Using this lesson's multilinear-map framework, explain what it means for $\sigma$ to be 'linear in each argument separately,' in terms of the physical inputs it takes. (b) Explain why representing the stress tensor as a matrix is not a coincidence but a direct consequence of it being a $(1,1)$-or-$(0,2)$-type tensor, connecting to this lesson's unification of matrices within the tensor framework. (c) If two stress states $\sigma_1$ and $\sigma_2$ (each type $(0,2)$) needed to be combined into a single higher-rank object via $\sigma_1\otimes\sigma_2$, explain what TYPE the resulting tensor would be, using the general tensor-product type rule from this lesson."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | VECTORS-COVECTORS-MATRICES-TREATED-AS-SEPARATE | Believing vectors, covectors, and matrices are three separate kinds of objects, missing that they are special cases of one unifying multilinear-map (tensor) framework | Foundational |
| MC-2 | TENSOR-PRODUCT-TREATED-AS-MERELY-SYMBOLIC | Believing the tensor product $u\otimes v$ is a formal symbolic pairing with no independent multilinear-map meaning, missing that it must be verified genuinely multilinear | High |
| MC-3 | TENSORS-ASSUMED-INSIGNIFICANT | Believing tensors are an obscure abstraction with no real physical or further-mathematical significance, missing their physics applications and vast categorical generalization | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Vectors, Covectors, Matrices Treated as Separate") → P41 (detect: ask whether vectors, covectors, and matrices are three separate kinds of objects) → P64 (conceptual shift: re-walk Example 1's unified derivation, re-anchoring on "these are special cases of one multilinear-map framework").
- **B02 (targets MC-2)**: P27 (name it: "Tensor Product Treated as Merely Symbolic") → P41 (detect: ask whether $u\otimes v$ is just a symbolic pairing) → P64 (conceptual shift: re-walk Example 2's linearity verification, re-anchoring on "the tensor product must be, and is, verified genuinely multilinear").
- **B03 (targets MC-3)**: P27 (name it: "Tensors Assumed Insignificant") → P41 (detect: ask whether tensors have real physical or further-mathematical significance) → P64 (conceptual shift: re-walk Example 3's physics and categorical previews, re-anchoring on "this is the language of general relativity, and it generalizes far beyond vector spaces").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.vector-space` (vector spaces generally) and `math.linalg.linear-map` (linear maps, the building block of the multilinear generalization this concept develops).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.cat.tensor-product`, checked via `ls docs/curriculum/blueprints/` at the time of authoring THIS blueprint and confirmed not yet authored. $P76_{mode}=$ **independence**. (Note: `math.cat.tensor-product` is authored later in this same batch, and its own blueprint engages this concept as a genuine cross-link probe, showing $(\mathrm{Vect},\otimes,k)$ as one concrete instance of the general categorical framework.)

## Component 8 — Teaching Notes

- estimated_hours = 8 with an expert/understand tag supports the full "3 TAs + gate" tier, with LO1 and LO2 at full conceptual/computational depth (the vector/covector/matrix unification and a genuine tensor-product linearity verification) and LO3 kept orientation-level, appropriately previewing physics applications and the categorical generalization without developing either.
- **Division of labor**: `math.linalg.vector-space` and `math.linalg.linear-map` own vector spaces and linear maps generally; this concept owns the MULTILINEAR generalization unifying vectors, covectors, and matrices as special cases, and the tensor product construction — deliberately building the tensor-product example (Example 2) that the batch's own `math.cat.tensor-product` blueprint later cites as its concrete Vect instance.
- Example 1's three-way unification (vector, covector, matrix, each shown as a tensor of a specific type) was deliberately structured as one continuous argument rather than three separate facts, since the corpus's target misconception (MC-1) is precisely the failure to see these as one framework.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.cat.tensor-product` unauthored at time of writing → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.7×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already fluent in vector spaces/linear maps; unification introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
