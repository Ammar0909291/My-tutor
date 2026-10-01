# math.cat.tensor-product

## Identity
- **KG id**: `math.cat.tensor-product`
- **Domain**: math.cat
- **Requires**: `math.cat.limits`
- **Unlocks**: none
- **Cross-links**: `math.linalg.tensor`
- **Difficulty**: research
- **Bloom level**: analyze
- **Mastery threshold**: 0.5
- **Estimated hours**: 7

## Learning Objective
Recognize $(\mathrm{Vect},\otimes,k)$ as the CONCRETE instance the abstract categorical
definition generalizes — NEVER an unrelated new structure; recognize the monoidal laws as holding
UP TO COHERENT NATURAL ISOMORPHISM — NEVER literal equality; and recognize SYMMETRIC monoidal
structure as ADDITIONAL, separately-verified data — NEVER an automatic consequence of being
monoidal.

## Core Understanding
$(\mathrm{Vect},\otimes,k)$ IS THE CONCRETE INSTANCE THE ABSTRACT DEFINITION GENERALIZES — NEVER
UNRELATED: `math.linalg.tensor` already VERIFIED $u\otimes v$ is multilinear — respecting linear
maps in each slot. This IS exactly the bifunctoriality $\otimes:\mathrm{Vect}\times\mathrm{Vect}
\to\mathrm{Vect}$ demands: linear maps $f:V\to V'$, $g:W\to W'$ combine to
$f\otimes g:V\otimes W\to V'\otimes W'$. The field $k$ serves as the unit object $I$, since
$k\otimes V\cong V$. Believing the categorical monoidal-category definition is an unrelated new
structure, disconnected from the vector-space tensor product already built, is WRONG —
$(\mathrm{Vect},\otimes,k)$ is precisely the concrete instance the abstract axioms are naming.

THE MONOIDAL LAWS HOLD UP TO COHERENT NATURAL ISOMORPHISM — NEVER LITERAL EQUALITY: for
$A=\{1,2\}$, $B=\{a\}$, $C=\{x,y\}$: $(A\times B)\times C$ has elements like $((1,a),x)$, while
$A\times(B\times C)$ has elements like $(1,(a,x))$ — GENUINELY DIFFERENT sets as raw data. Yet the
map $((1,a),x)\mapsto(1,(a,x))$ is a canonical, NATURAL bijection — a genuine isomorphism, not a
claim of literal equality. Believing associativity/unit laws mean literal equality of objects is
WRONG — they hold up to coherent natural isomorphism; $(A\times B)\times C\neq A\times(B\times C)$
on the nose, yet the monoidal law still holds via the canonical isomorphism between them.

SYMMETRIC MONOIDAL STRUCTURE IS ADDITIONAL, SEPARATELY-VERIFIED DATA — NEVER AUTOMATIC: in
$\mathrm{Set}$, the swap map $(a,b)\mapsto(b,a)$ is a natural isomorphism, confirming
$(\mathrm{Set},\times,\{*\})$ IS symmetric monoidal — but this required VERIFYING an EXTRA map
with its own coherence (hexagon) condition, never merely observing that a monoidal structure
automatically commutes. Believing every monoidal category automatically satisfies
$A\otimes B\cong B\otimes A$ is WRONG — symmetric monoidal structure is EXTRA data requiring its
own verification; a genuinely non-symmetric monoidal category is possible in principle (braided
categories relax the hexagon further).

## Mental Models
- **"The abstract monoidal-category axioms are just naming, in general terms, exactly what you
  already verified concretely for vector-space tensor products."**
- **"'Up to natural isomorphism' is the entire content of the associativity law — never a
  roundabout way of saying 'literally equal'."**
- **"Symmetric monoidal is an extra badge a category can earn, with its own coherence condition —
  never a free consequence of being monoidal at all."**

## Why Students Fail

### MC-1: CATEGORICAL-TENSOR-ASSUMED-UNRELATED-TO-VECT
- **Surface form**: believes the categorical monoidal-category definition is an unrelated
  abstract structure, missing that $(\mathrm{Vect},\otimes,k)$ is the concrete instance it
  directly generalizes.
- **Birth type**: foundational (Blueprint's own declared severity — the abstract $(C,\otimes,I)$
  notation looks unrelated to the concrete vector-space $\otimes$ already learned).
- **Repair**: re-walk the $(\mathrm{Vect},\otimes,k)$ identification against the axioms.

### MC-2: MONOIDAL-LAWS-ASSUMED-LITERAL-EQUALITY
- **Surface form**: believes associativity/unit laws mean literal equality of objects, missing
  that they hold up to coherent natural isomorphism.
- **Birth type**: high severity (Blueprint's own declared severity — the "$\cong$" symbol in the
  law's statement is easy to misread as "$=$" without an explicit counterexample).
- **Repair**: re-walk the explicit nested-pair mismatch and canonical isomorphism computation.

### MC-3: SYMMETRY-ASSUMED-AUTOMATIC
- **Surface form**: believes every monoidal category automatically satisfies
  $A\otimes B\cong B\otimes A$.
- **Birth type**: moderate severity (Blueprint's own declared severity — the familiar examples
  $\mathrm{Set}$, $\mathrm{Vect}$, $\mathrm{Ab}$ are ALL symmetric, obscuring that this is a
  genuine extra property).
- **Repair**: re-walk the swap map's separate verification and coherence condition.

## Misconceptions

### MC-1: CATEGORICAL-TENSOR-ASSUMED-UNRELATED-TO-VECT
- **Surface form**: as described above.
- **Root cause (foundational)**: as described above.
- **Repair**: as described above.

### MC-2: MONOIDAL-LAWS-ASSUMED-LITERAL-EQUALITY
- **Surface form**: as described above.
- **Root cause (high severity)**: as described above.
- **Repair**: as described above.

### MC-3: SYMMETRY-ASSUMED-AUTOMATIC
- **Surface form**: as described above.
- **Root cause (moderate severity)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The categorical tensor-product axioms are like reading the assembly instructions after
  you've already built the furniture — the vector-space case is the concrete build; the axioms
  just name the general pattern."**
- **Anti-analogy**: "up to natural isomorphism" isn't a polite way of glossing over genuine
  differences — the sets really are different; the isomorphism is the substantive, checkable
  content of the law.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $(\mathrm{Vect},\otimes,k)$-against-the-axioms
  identification.
- **Demonstration 2 (targets MC-2)**: the explicit nested-pair mismatch and canonical isomorphism
  for finite sets.
- **Demonstration 3 (targets MC-3)**: the swap map's separate verification in $\mathrm{Set}$ and
  $\mathrm{Ab}$.

## Discovery Questions
1. "Is the categorical monoidal-category definition an unrelated new structure, disconnected from
   the vector-space tensor product you already built?"
2. "Does the associativity law (A⊗B)⊗C ≅ A⊗(B⊗C) mean these are literally the same object?"
3. "Does every monoidal category automatically satisfy A⊗B ≅ B⊗A?"

## Teaching Sequence
1. **Representation shift**: work the $(\mathrm{Vect},\otimes,k)$ identification, isolating MC-1.
2. **Conflict evidence**: work the finite-set nested-pair mismatch, isolating MC-2.
3. **Contrast pair**: work the swap map's separate verification, isolating MC-3.
4. **Mastery gate**: require a correct statement of the monoidal-category data and laws, a correct
   explanation of $(\mathrm{Vect},\otimes,k)$'s bifunctoriality, a correct explicit unit-law
   computation for finite sets, and a correct explanation of why symmetric structure is additional,
   at the Blueprint's own stated MAMR of 3/5.

## Tutor Actions
- Never accept the categorical monoidal-category definition presented as unrelated to the
  vector-space tensor product.
- Never accept the associativity or unit law interpreted as literal equality.
- Never accept symmetric monoidal structure assumed automatic for any monoidal category.

## Voice Teaching Notes
- Say "is that literally the same set, or a canonical isomorphism between different sets?"
  whenever a monoidal law is being checked.
- Ask "has the swap map's naturality and coherence actually been verified?" whenever symmetric
  monoidal structure is claimed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies $(\mathrm{Vect},\otimes,k)$'s data
  against the monoidal-category axioms.
- **Rung 2 (application)**: learner correctly writes out the nested-pair mismatch and the
  canonical isomorphism for specific finite sets.
- **Rung 3 (transfer)**: learner correctly identifies the unit object and symmetric structure of
  $(\mathrm{Ab},\otimes_\mathbb{Z},\mathbb{Z})$, and contrasts it with the $\mathrm{Vect}$ case.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the $(\mathrm{Vect},\otimes,k)$ identification.
- If MC-2 recurs, re-walk the finite-set nested-pair mismatch.
- If MC-3 recurs, re-walk the swap map's separate verification.

## Memory Hooks
- "(Vect,⊗,k) is the concrete case the axioms generalize — never unrelated."
- "Monoidal laws hold up to natural isomorphism — never literal equality."
- "Symmetric monoidal is extra, separately verified data — never automatic."

## Transfer Connections
- `math.cat.limits` (prerequisite, already authored, this campaign): supplies the universal
  properties and natural isomorphism machinery needed to state the monoidal laws correctly as "up
  to iso" rather than "on the nose."

## Cross-Subject Connections
- `math.linalg.tensor` (cross-link, already authored): supplies the concrete vector-space tensor
  product and its multilinearity verification, the exact instance this concept's abstract
  bifunctor axioms directly generalize.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cat.tensor-product.md`, reused by reference
  for its three worked examples and its three-misconception registry (birth types adopted directly
  as declared).
- Transfer probe: the Blueprint's own cross-link probe engaging `math.linalg.tensor`'s
  field-as-unit-object construction for $(\mathrm{Ab},\otimes_\mathbb{Z},\mathbb{Z})$.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.cat.limits`,
  unlocks none, cross_links `math.linalg.tensor` [confirmed authored on disk], research/analyze,
  mastery_threshold 0.5, estimated_hours 7) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-20 (Batch 254): authored. Second entry this batch. Companion batch concept:
  `math.cat.yoneda-lemma`.
