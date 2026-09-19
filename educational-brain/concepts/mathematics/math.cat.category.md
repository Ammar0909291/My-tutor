# math.cat.category

## Identity
- **KG id**: `math.cat.category`
- **Domain**: math.cat
- **Requires**: `math.found.function-set-theoretic`, `math.abst.algebraic-structure`
- **Unlocks**: `math.cat.functor`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.8
- **Estimated hours**: 5

## Learning Objective
State a category's four ingredients — objects, morphisms $\text{Hom}(A,B)$, composition,
identity morphisms — and verify the two axioms (associativity, identity law) for a concrete
category; recognize $\mathbf{Set}$, $\mathbf{Grp}$, $\mathbf{Top}$, $\mathbf{Vect}_k$ as instances
of ONE abstract pattern, correctly identifying each category's SPECIFIC structure-preservation
requirement on morphisms (never assuming $\mathbf{Set}$'s "any function counts" rule carries over
universally).

## Core Understanding
EACH CATEGORY HAS ITS OWN STRUCTURE-PRESERVATION REQUIREMENT — NEVER "ANY FUNCTION COUNTS"
UNIVERSALLY: in $\mathbf{Set}$, ANY function between object-sets is a valid morphism — no extra
requirement. But in $\mathbf{Grp}$: a morphism $\phi:\mathbb Z\to\mathbb Z/6\mathbb Z$ must be a
GROUP HOMOMORPHISM, respecting $\phi(a+b)=\phi(a)+\phi(b)$. The reduction map $\phi(n)=n\bmod6$
qualifies. But $\psi(n)=n^2\bmod6$ — a perfectly good FUNCTION $\mathbb Z\to\mathbb Z/6\mathbb Z$
— is NOT a valid $\mathbf{Grp}$ morphism: $\psi(1+1)=\psi(2)=4$ but $\psi(1)+\psi(1)=2\ne4$,
failing to preserve the group operation. Being a category doesn't specify what the structure-
preservation requirement IS — each named category ($\mathbf{Grp}$: homomorphism, $\mathbf{Top}$:
continuity, $\mathbf{Vect}_k$: linearity) makes its own choice, and it must be checked directly,
never assumed to inherit $\mathbf{Set}$'s permissive rule.

ASSOCIATIVITY IS ABOUT GROUPING OF THE SAME ORDER — NEVER COMMUTATIVITY (REORDERING): for
$f:A\to B$, $g:B\to C$, $h:C\to D$: associativity states $h\circ(g\circ f)=(h\circ g)\circ f$ —
the SAME left-to-right sequence $f$ then $g$ then $h$, just grouped differently. This is NEVER
about whether $g\circ f=f\circ g$ (a completely different, unrelated question about reordering
WHICH morphism comes first) — the category axioms say NOTHING about commutativity, and
composition generally cannot be reordered at all (the domains/codomains typically don't even
match in the reversed order).

EACH OBJECT HAS ITS OWN DISTINCT IDENTITY MORPHISM — NEVER A SINGLE UNIVERSAL "DO NOTHING" ARROW:
for objects $A$ and $B$: $1_A:A\to A$ and $1_B:B\to B$ are GENERALLY DIFFERENT morphisms (they
have different domains and codomains entirely), even though they play analogous roles (composing
with either does nothing: $1_B\circ f=f=f\circ1_A$ for $f:A\to B$). Believing a single identity
morphism serves ALL objects misses that identity is a per-object, not a universal, structure.

## Mental Models
- **"Being a category doesn't specify what morphisms must preserve — each named category makes
  its own choice, and you check that specific choice, never assume Set's anything-goes rule."**
- **"Associativity is about grouping the SAME sequence, never about reordering — h∘(g∘f) and
  (h∘g)∘f both go f, then g, then h."**
- **"Every object gets its own identity morphism — never one universal arrow shared by all."**

## Why Students Fail

### MC-1: ANY-FUNCTION-ASSUMED-VALID-MORPHISM
- **Surface form**: assumes any function between the underlying sets of two objects automatically
  qualifies as a morphism in every category, ignoring category-specific structure-preservation
  requirements.
- **Birth type**: Foundational severity (Blueprint's own declared severity and most-taught
  misconception — the single most common conceptual error when learners meet multiple example
  categories for the first time, over-generalizing $\mathbf{Set}$'s permissive rule).
- **Repair**: re-derive by directly checking the homomorphism property $\phi(a+b)\stackrel?=
  \phi(a)+\phi(b)$, showing the specific failure for $\psi(n)=n^2\bmod6$.

### MC-2: COMPOSITION-ASSUMED-COMMUTATIVE
- **Surface form**: confuses associativity (which grouping order gives the same result) with
  commutativity (whether $f\circ g=g\circ f$), incorrectly assuming morphism composition can
  generally be reordered.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the terms "associative"
  and general algebraic flexibility can blur together without careful distinction).
- **Repair**: re-anchor on the precise axiom wording — grouping of the SAME order, never
  reordering.

### MC-3: IDENTITY-MORPHISM-ASSUMED-UNIQUE-ACROSS-OBJECTS
- **Surface form**: believes a single identity morphism serves all objects in a category, rather
  than each object having its OWN distinct identity morphism.
- **Birth type**: Moderate severity (Blueprint's own declared severity — "identity" suggests a
  single universal concept rather than a per-object structure).
- **Repair**: re-anchor on the definition — each object $A$ has its own $1_A:A\to A$, generally
  distinct from $1_B:B\to B$.

## Misconceptions

### MC-1: ANY-FUNCTION-ASSUMED-VALID-MORPHISM
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: COMPOSITION-ASSUMED-COMMUTATIVE
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

### MC-3: IDENTITY-MORPHISM-ASSUMED-UNIQUE-ACROSS-OBJECTS
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A category's morphisms are like a club's membership rule — Set's club lets anyone in
  (any function), but Grp's club has a specific entry requirement (preserve the group operation)
  that must actually be checked, never assumed to match Set's open-door policy."**
- **Anti-analogy**: associativity is not a license to reorder morphisms — it only says the same
  left-to-right sequence gives the same result regardless of how the parentheses are placed.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $\phi(n)=n\bmod6$-versus-$\psi(n)=n^2\bmod6$ contrast in
  $\mathbf{Grp}$, showing one preserves the group operation and the other fails.
- **Demonstration 2 (positive case)**: the explicit triple-composition associativity verification
  in $\mathbf{Set}$, both groupings computed side by side.
- **Demonstration 3 (targets MC-3)**: the distinct identity morphisms $1_A$ and $1_B$ for
  different objects, both satisfying the identity law without being the same morphism.

## Discovery Questions
1. "Does any function between two objects' underlying sets automatically count as a morphism in
   every category, or does it depend on the specific category?"
2. "Does associativity mean you can reorder which morphism comes first, or does it mean something
   else about grouping?"
3. "Is there one universal identity morphism for the whole category, or does each object have its
   own?"

## Teaching Sequence
1. **Representation shift**: the four ingredients grounded directly in $\mathbf{Set}$, working
   Demonstration 2 for the associativity check.
2. **Contrast pair**: the structure-preservation requirement varying across categories, working
   Demonstration 1, isolating MC-1; the associativity-versus-commutativity distinction, isolating
   MC-2; the per-object identity morphism, working Demonstration 3, isolating MC-3.
3. **Mastery gate**: require a correct identification of objects/morphisms/composition/identity
   in a named category, a correct associativity verification, and a correct determination of
   whether a specific function qualifies as a morphism in a structure-preserving category, at the
   Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept a function assumed to be a valid morphism in a structure-preserving category
  (Grp, Top, Vect) without checking the specific preservation requirement.
- Never accept associativity confused with commutativity.
- Never accept a single identity morphism assumed to serve every object in a category.

## Voice Teaching Notes
- Say "does this category require morphisms to preserve something specific, or does any function
  count?" whenever a morphism is proposed in a new category.
- Ask "is that reordering, or just regrouping the same sequence?" whenever associativity is
  discussed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies the four ingredients of a category in a
  concrete example.
- **Rung 2 (application)**: learner correctly verifies associativity and the identity law for
  specific morphisms, and correctly determines whether a given function qualifies as a valid
  morphism in a structure-preserving category.
- **Rung 3 (transfer)**: learner correctly models a novel scenario (e.g. UI navigation
  transitions) as a category, identifying objects, morphisms, and the appropriate structure-
  preservation requirement.

## Tutor Recovery Strategy
- If MC-1 recurs, re-check the specific structure-preservation property directly.
- If MC-2 recurs, re-anchor on the precise associativity axiom wording.
- If MC-3 recurs, re-anchor on each object's own distinct identity morphism.

## Memory Hooks
- "Set's anything-goes rule doesn't carry over — each category has its own morphism requirement,
  check it directly."
- "Associativity regroups the same sequence — it never reorders which morphism comes first."
- "Every object has its own identity morphism — never one shared across the whole category."

## Transfer Connections
- `math.found.function-set-theoretic` (already authored, certified domain): supplies the
  functions-as-relations model this concept's $\mathbf{Set}$ morphisms directly instantiate.
- `math.abst.algebraic-structure` (already authored, certified domain): supplies the sets-with-
  operations model this concept's $\mathbf{Grp}$ (and related) categories directly build on.
- `math.cat.functor` (not yet authored, KG's declared unlock): a structure-preserving map BETWEEN
  categories, directly requiring this concept's category definition as its essential prerequisite
  object.

## Cross-Subject Connections
- Software engineering: modeling systems (e.g. UI screens and valid navigation transitions) as
  categories, with structure-preservation requirements analogous to homomorphisms.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cat.category.md`, reused by reference for
  its four-ingredients-grounded-in-Set worked example, its explicit associativity verification,
  its $\phi$-versus-$\psi$ $\mathbf{Grp}$-morphism contrast, and its three-misconception registry
  (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, modeling a UI-navigation system as
  a category and applying the structure-preservation and associativity concepts to it.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.found.function-set-theoretic`/`math.abst.algebraic-structure`, unlocks
  `math.cat.functor`, cross_links none, expert/understand, mastery_threshold 0.8,
  estimated_hours 5) was directly verified against the live KG and matches exactly. Both
  prerequisites independently re-confirmed authored — this is the campaign's first `math.cat`
  concept.

## Version History
- 2026-09-19 (Batch 180): authored. Second entry this batch. Companion batch concept:
  `math.top.topological-space`.
