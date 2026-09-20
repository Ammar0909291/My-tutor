# math.cat.functor-category

## Identity
- **KG id**: `math.cat.functor-category`
- **Domain**: math.cat
- **Requires**: `math.cat.natural-transformation`
- **Unlocks**: `math.cat.yoneda-lemma`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.75
- **Estimated hours**: 4

## Learning Objective
Recognize FUNCTORS as objects and NATURAL TRANSFORMATIONS as morphisms — NEVER the reverse;
recognize composition as built POINTWISE, one component at a time — NEVER a single opaque
operation on whole transformations; and recognize the category axioms as INHERITED pointwise from
$\mathcal{D}$'s own axioms — NEVER automatic just because objects and morphisms have been named.

## Core Understanding
FUNCTORS ARE OBJECTS, NATURAL TRANSFORMATIONS ARE MORPHISMS — NEVER THE REVERSE: for functors
$F,G:\mathcal{C}\to\mathcal{D}$ and $\eta:F\Rightarrow G$: in $[\mathcal{C},\mathcal{D}]$, $F$ and
$G$ are each OBJECTS, on EQUAL footing; $\eta$ (the whole family of components) is the SINGLE
MORPHISM connecting object $F$ to object $G$. Is $G$ itself a "morphism" from $F$ to $G$? NO — $G$
is an OBJECT, exactly like $F$. Believing functors are the morphisms and natural transformations
are the objects in a functor category is WRONG — it reverses which already-mastered piece plays
which role; functors are objects, natural transformations are morphisms.

COMPOSITION IS BUILT POINTWISE — NEVER A SINGLE OPAQUE OPERATION: for $\mathcal{C}=\{X,Y\}$ with
$\theta:F\Rightarrow G$, $\eta:G\Rightarrow H$: the composite $\eta\circ\theta:F\Rightarrow H$ has
TWO components, each built INDIVIDUALLY: $(\eta\circ\theta)_X=\eta_X\circ\theta_X$ and, SEPARATELY,
$(\eta\circ\theta)_Y=\eta_Y\circ\theta_Y$ — ordinary compositions of morphisms IN $\mathcal{D}$.
Believing composition of natural transformations in a functor category is a single operation on
whole transformations, rather than built pointwise from $\mathcal{D}$'s own composition at each
object, is WRONG — the composite is constructed component-by-component; there is no whole-
transformation shortcut.

THE CATEGORY AXIOMS ARE INHERITED POINTWISE — NEVER AUTOMATIC: checking $\theta\circ\text{id}_F=
\theta$ reduces, at EACH component $X$, to $\theta_X\circ\text{id}_{F(X)}=\theta_X$ IN
$\mathcal{D}$ — simply $\mathcal{D}$'s OWN identity law, applied pointwise, never a new fact
requiring separate proof. Associativity holds the same way, both sides reducing to
$\eta_X\circ\theta_X\circ\psi_X$ at each component. Believing naming functors as objects and
natural transformations as morphisms automatically makes $[\mathcal{C},\mathcal{D}]$ a genuine
category, without further verification, is WRONG — the axioms are VERIFIED, pointwise, as a
direct consequence of $\mathcal{D}$ already being a category, never assumed just from the naming.

## Mental Models
- **"In the functor category, functors sit at the 'point' level as objects — natural
  transformations are what connects them, playing the morphism role."**
- **"Composing natural transformations isn't one operation on two whole things — it's built
  object-by-object, each component composed individually in D."**
- **"[C,D] being a genuine category isn't automatic from naming its pieces — it's a direct,
  checkable consequence of D itself being a category, verified pointwise."**

## Why Students Fail

### MC-1: FUNCTOR-MORPHISM-ROLES-REVERSED
- **Surface form**: believes functors are the morphisms and natural transformations are the
  objects in a functor category, reversing which already-mastered piece plays which role.
- **Birth type**: foundational (Blueprint's own declared severity — both functors and natural
  transformations are already-unfamiliar higher-order objects, making role confusion easy).
- **Repair**: re-walk the explicit $F,G$-as-objects-versus-$\eta$-as-morphism role assignment.

### MC-2: COMPOSITION-TREATED-AS-WHOLE-TRANSFORMATION-OPERATION
- **Surface form**: believes composition of natural transformations in a functor category is a
  single operation on whole transformations, missing that it is built pointwise.
- **Birth type**: foundational (Blueprint's own declared severity — writing $\eta\circ\theta$
  looks like ordinary function composition, obscuring the underlying per-object construction).
- **Repair**: re-walk the explicit two-component composition on the 2-object category.

### MC-3: CATEGORY-AXIOMS-ASSUMED-AUTOMATIC
- **Surface form**: believes naming functors as objects and natural transformations as morphisms
  automatically makes the result a genuine category, missing that the axioms must be verified.
- **Birth type**: moderate severity (Blueprint's own declared severity — once objects/morphisms are
  named, the "category" label feels earned by naming alone).
- **Repair**: re-walk the pointwise reduction of identity and associativity to $\mathcal{D}$'s own
  axioms.

## Misconceptions

### MC-1: FUNCTOR-MORPHISM-ROLES-REVERSED
- **Surface form**: as described above.
- **Root cause (foundational)**: as described above.
- **Repair**: as described above.

### MC-2: COMPOSITION-TREATED-AS-WHOLE-TRANSFORMATION-OPERATION
- **Surface form**: as described above.
- **Root cause (foundational)**: as described above.
- **Repair**: as described above.

### MC-3: CATEGORY-AXIOMS-ASSUMED-AUTOMATIC
- **Surface form**: as described above.
- **Root cause (moderate severity)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The functor category is like a city map turned into a single dot on a larger map of cities —
  each whole functor (a full structure-preserving map) becomes just one point, and natural
  transformations become the roads between those points."**
- **Anti-analogy**: verifying [C,D]'s axioms isn't a leap of faith once the objects and morphisms
  are named — it's a checkable, component-by-component reduction to facts D already has.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the explicit $F,G$-objects-versus-$\eta$-morphism role
  assignment.
- **Demonstration 2 (targets MC-2)**: the two-component composition on a 2-object category.
- **Demonstration 3 (targets MC-3)**: the pointwise reduction of identity/associativity to
  $\mathcal{D}$'s own axioms.

## Discovery Questions
1. "In the functor category [C,D], are the functors themselves the morphisms, with natural
   transformations serving as the objects?"
2. "Is composition of natural transformations in [C,D] performed as a single operation on the
   whole transformations, rather than component-by-component?"
3. "Does naming functors as objects and natural transformations as morphisms automatically make
   [C,D] a genuine category, without further verification?"

## Teaching Sequence
1. **Contrast pair**: work the objects-versus-morphism role assignment, isolating MC-1.
2. **Representation shift**: work the two-component composition, isolating MC-2.
3. **Conflict evidence**: work the pointwise axiom-inheritance verification, isolating MC-3.
4. **Mastery gate**: require correct identification of objects versus the morphism in a given
   setup, a correct three-component composition write-out, a correct explanation of why an
   identity law reduces to a known fact about $\mathcal{D}$, and a correct explanation of the
   higher-category-theory framing, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept functors described as morphisms and natural transformations as objects.
- Never accept a composition of natural transformations computed without an explicit
  component-by-component construction.
- Never accept the category axioms assumed to hold automatically without pointwise verification.

## Voice Teaching Notes
- Say "which of these are the objects, and which is the morphism?" whenever a functor category is
  introduced.
- Ask "have you built that composite one component at a time?" whenever a composition in a
  functor category is computed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies functors as objects and a natural
  transformation as the morphism in a given setup.
- **Rung 2 (application)**: learner correctly writes out all components of a composite natural
  transformation.
- **Rung 3 (transfer)**: learner correctly maps a data-processing pipeline's stages and
  conversions onto a functor category's objects and morphisms, and identifies what a colleague's
  "automatically forms a category" claim skips.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the objects-versus-morphism role assignment.
- If MC-2 recurs, re-walk the two-component composition.
- If MC-3 recurs, re-walk the pointwise axiom-inheritance verification.

## Memory Hooks
- "Functors are objects, natural transformations are morphisms — never reversed."
- "Composition is built one component at a time — never a single whole-transformation operation."
- "The axioms are verified pointwise from D's own — never assumed automatic."

## Transfer Connections
- `math.cat.natural-transformation` (prerequisite, already authored): supplies the component
  morphisms and naturality condition this concept's morphisms directly are.

## Cross-Subject Connections
- Higher category theory: the "categories built from functors and natural transformations"
  level-shift constructed here is the foundational move enabling 2-categories and beyond.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cat.functor-category.md`, reused by
  reference for its three worked examples and its three-misconception registry (birth types
  adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a data-processing pipeline's
  stages/conversions mapped onto a functor category, and refuting an "automatic category" claim.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.cat.natural-transformation`, unlocks `math.cat.yoneda-lemma`, cross_links none,
  expert/understand, mastery_threshold 0.75, estimated_hours 4) was directly verified against the
  live KG and matches exactly.

## Version History
- 2026-09-20 (Batch 252): authored. First entry this batch. Companion batch concept:
  `math.cat.limits`.
