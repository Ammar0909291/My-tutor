# math.linalg.tensor

## Identity
- **KG id**: `math.linalg.tensor`
- **Domain**: math.linalg
- **Requires**: `math.linalg.vector-space`, `math.linalg.linear-map`
- **Unlocks**: none
- **Cross-links**: `math.cat.tensor-product`
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.7
- **Estimated hours**: 8

## Learning Objective
Recognize vectors, covectors, and matrices as SPECIAL CASES of one multilinear-map framework of
type $(r,s)$ — NEVER three separate, unrelated kinds of objects; construct the tensor product
$\otimes$ and VERIFY the result is genuinely multilinear — NEVER treat it as merely a symbolic
pairing; and recognize tensors have real physics applications and a vast categorical
generalization — NEVER an obscure, insignificant abstraction.

## Core Understanding
VECTORS, COVECTORS, AND MATRICES ARE SPECIAL CASES OF ONE MULTILINEAR-MAP FRAMEWORK — NEVER THREE
SEPARATE KINDS OF OBJECTS: a vector $v\in V$, viewed as the functional $v(f)=f(v)$ on $V^*$, is
genuinely linear in $f$ — a type $(1,0)$ tensor. A covector $f\in V^*$ is the linear map
$v\mapsto f(v)$ — type $(0,1)$. A matrix $A$ (representing a linear map $V\to V$) is the bilinear
map $A(f,v)=f(Av)$ — linear in $f$ AND $v$ separately — type $(1,1)$. Treating vectors, covectors,
and matrices as three fundamentally different kinds of mathematical objects that merely happen to
share some algebraic similarities is WRONG — they are three SPECIAL CASES of one unifying
multilinear-map framework, distinguished only by their type $(r,s)$.

THE TENSOR PRODUCT MUST BE VERIFIED GENUINELY MULTILINEAR — NEVER TREATED AS MERELY A SYMBOLIC
PAIRING: given vectors $u,v\in V$, $u\otimes v$ is defined by $(u\otimes v)(f,g)=f(u)g(v)$ for
$f,g\in V^*$. Checking linearity in the first slot:
$(u\otimes v)(af_1+bf_2,g)=(af_1+bf_2)(u)\cdot g(v)=a[f_1(u)g(v)]+b[f_2(u)g(v)]
=a(u\otimes v)(f_1,g)+b(u\otimes v)(f_2,g)$ — genuinely linear. Believing $u\otimes v$ is merely a
formal, symbolic pairing of $u$ and $v$ with no independent multilinear-map meaning is WRONG — it
must be, and here IS, directly verified as a genuine type $(2,0)$ tensor via its defining formula,
never merely asserted from notation.

TENSORS HAVE REAL PHYSICS APPLICATIONS AND A VAST CATEGORICAL GENERALIZATION — NEVER AN OBSCURE,
INSIGNIFICANT ABSTRACTION: the metric tensor $g$ in general relativity is a type $(0,2)$ tensor,
giving spacetime's inner-product structure at each point — a genuine, load-bearing application of
this exact multilinear-map framework, never a toy example. Separately, `math.cat.tensor-product`
extends $\otimes$ from vector spaces to entire categories, where it becomes part of the structure
of a "monoidal category." Assuming tensors are an obscure abstraction with no real physical or
further-mathematical significance is WRONG — they are the working language of general relativity
and generalize far beyond vector spaces.

## Mental Models
- **"Vectors, covectors, and matrices aren't three separate theories — they're multilinear maps
  with different numbers of vector and covector arguments, unified under one type (r,s)."**
- **"The tensor product isn't a symbol glued between two vectors — it's a genuine multilinear map
  that must be checked, and can be checked, directly against its defining formula."**
- **"Tensors are the actual language of general relativity's metric, and they generalize into the
  categorical framework of monoidal categories — never an obscure dead end."**

## Why Students Fail

### MC-1: VECTORS-COVECTORS-MATRICES-TREATED-AS-SEPARATE
- **Surface form**: believes vectors, covectors, and matrices are three separate kinds of objects,
  missing that they are special cases of one unifying multilinear-map (tensor) framework.
- **Birth type**: instruction-induced (Blueprint's own declared foundational severity — vectors,
  covectors, and matrices are typically taught as separate topics before any unification).
- **Repair**: re-walk Example 1's unified derivation, re-anchoring on "these are special cases of
  one multilinear-map framework."

### MC-2: TENSOR-PRODUCT-TREATED-AS-MERELY-SYMBOLIC
- **Surface form**: believes the tensor product $u\otimes v$ is a formal symbolic pairing with no
  independent multilinear-map meaning, missing that it must be verified genuinely multilinear.
- **Birth type**: perceptual intuition (Blueprint's own declared high severity — the $\otimes$
  notation looks like a purely formal operation, inviting a symbolic-only reading).
- **Repair**: re-walk Example 2's linearity verification, re-anchoring on "the tensor product must
  be, and is, verified genuinely multilinear."

### MC-3: TENSORS-ASSUMED-INSIGNIFICANT
- **Surface form**: believes tensors are an obscure abstraction with no real physical or
  further-mathematical significance, missing their physics applications and vast categorical
  generalization.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — abstract multilinear
  algebra can seem detached from any concrete use without an explicit application shown).
- **Repair**: re-walk Example 3's physics and categorical previews, re-anchoring on "this is the
  language of general relativity, and it generalizes far beyond vector spaces."

## Misconceptions

### MC-1: VECTORS-COVECTORS-MATRICES-TREATED-AS-SEPARATE
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-2: TENSOR-PRODUCT-TREATED-AS-MERELY-SYMBOLIC
- **Surface form**: as described above.
- **Root cause (perceptual intuition)**: as described above.
- **Repair**: as described above.

### MC-3: TENSORS-ASSUMED-INSIGNIFICANT
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Vectors, covectors, and matrices are like three instruments in one family — different
  numbers of strings (vector/covector slots), but all built from the same multilinear-map
  design."**
- **Anti-analogy**: $u\otimes v$ isn't just two names taped together — it's a fully-formed
  multilinear map with its own verifiable defining formula, exactly as much a genuine tensor as
  $u$ or $v$ themselves.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the vector/covector/matrix three-way unification as tensors
  of types $(1,0)$, $(0,1)$, $(1,1)$.
- **Demonstration 2 (targets MC-2)**: the $u\otimes v$ first-slot linearity verification via its
  defining formula.
- **Demonstration 3 (targets MC-3)**: the metric-tensor physics application paired with the
  categorical-generalization preview.

## Discovery Questions
1. "Are vectors, dual vectors, and matrices three separate kinds of mathematical objects, or
   special cases of one framework?"
2. "Is $u\otimes v$ merely a formal, symbolic pairing, or a genuine multilinear map that can be
   directly verified?"
3. "Are tensors an obscure abstraction, or do they have real physical and further-mathematical
   significance?"

## Teaching Sequence
1. **Representation shift**: work Example 1's unified vector/covector/matrix derivation, isolating
   MC-1.
2. **Conflict evidence**: work Example 2's explicit multilinearity verification of $u\otimes v$,
   isolating MC-2.
3. **Contrast pair**: work Example 3's physics-application-and-categorical-preview contrast against
   "obscure abstraction," isolating MC-3.
4. **Mastery gate**: require a correct explanation of vectors/covectors/matrices as tensor types,
   a correct tensor-product type computation with linearity justification, and a correct
   recognition of a physics application, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept vectors, covectors, and matrices treated as three unrelated kinds of objects.
- Never accept a tensor product presented without its multilinearity being verifiable.
- Never accept tensors dismissed as an insignificant or purely formal abstraction.

## Voice Teaching Notes
- Say "what type (r,s) tensor is this, and which special case does it correspond to?" whenever a
  vector, covector, or matrix is discussed in this context.
- Ask "can you verify that's actually linear in each argument, or are you just trusting the
  notation?" whenever a tensor product is introduced.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies the type $(r,s)$ of a vector, covector,
  or matrix as a tensor.
- **Rung 2 (application)**: learner correctly constructs a tensor product and verifies its
  multilinearity in at least one argument.
- **Rung 3 (transfer)**: learner correctly explains the stress tensor's type and the resulting type
  of a tensor product of two stress states.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the unified vector/covector/matrix derivation.
- If MC-2 recurs, re-walk the explicit linearity verification of the tensor product.
- If MC-3 recurs, re-walk the physics and categorical-generalization previews.

## Memory Hooks
- "Vectors, covectors, matrices — one multilinear-map family, distinguished only by type (r,s)."
- "A tensor product isn't just glued symbols — it's a map you can and must verify is multilinear."
- "Tensors are general relativity's actual language, not a shelf abstraction."

## Transfer Connections
- `math.linalg.vector-space` (prerequisite, already authored): supplies the vector-space
  foundation this concept's multilinear generalization builds on.
- `math.linalg.linear-map` (prerequisite, already authored): supplies the linear-map definition
  this concept generalizes to multilinear maps of arbitrary type $(r,s)$.

## Cross-Subject Connections
- General relativity (physics): the metric tensor is the exact type $(0,2)$ tensor structure
  developed here, giving spacetime its geometric inner-product structure.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.tensor.md`, reused by reference for
  its three worked examples, its vector/covector/matrix unification, and its three-misconception
  registry (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on the stress tensor in continuum
  mechanics, its type $(0,2)$ classification, and the type of a tensor product of two stress
  states.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.linalg.vector-space`/`math.linalg.linear-map`, unlocks none, cross_links
  `math.cat.tensor-product`, expert/understand, mastery_threshold 0.7, estimated_hours 8) was
  directly verified against the live KG and matches exactly. The cross-link target
  `math.cat.tensor-product` is confirmed still unauthored in the live EB corpus directory listing,
  matching the Blueprint's own independence-mode determination.

## Version History
- 2026-09-19 (Batch 224): authored. Second entry this batch. Companion batch concept:
  `math.linalg.matrix-representation`.
