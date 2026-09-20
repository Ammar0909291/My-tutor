# math.cat.adjunction

## Identity
- **KG id**: `math.cat.adjunction`
- **Domain**: math.cat
- **Requires**: `math.cat.functor`, `math.cat.natural-transformation`
- **Unlocks**: `math.cat.monad`
- **Cross-links**: none
- **Difficulty**: research
- **Bloom level**: analyze
- **Mastery threshold**: 0.6
- **Estimated hours**: 8

## Learning Objective
Recognize the adjunction's hom-set bijection as the CORRECT relationship between $F$ and $G$ —
NEVER expecting them to invert each other like ordinary inverse functions; correctly identify
which functor is LEFT versus RIGHT adjoint — NEVER reversing free and forgetful; and recognize
adjunctions as a PERVASIVE cross-mathematics pattern — NEVER an isolated exotic construction
specific to groups.

## Core Understanding
THE HOM-SET BIJECTION IS THE CORRECT RELATIONSHIP — NEVER AN INVERSE EXPECTATION: `math.cat.functor`
observed $F(U(G))$ (forgetful then free) is MUCH BIGGER and freer than $G$ — NOT a way of
"undoing" $U$. The adjunction $F\dashv U$ explains what relationship DOES hold instead:
$\text{Hom}_{\mathbf{Grp}}(FA,B)\cong\text{Hom}_{\mathbf{Set}}(A,UB)$ — maps OUT of the free group
correspond EXACTLY to ordinary functions of the underlying data. Believing left and right adjoint
functors should "undo" each other like inverse functions, rather than recognizing the
adjunction's hom-set bijection as the genuinely correct relationship, is WRONG — the counit
$\varepsilon_G:F(UG)\to G$ is a canonical, ALWAYS-PRESENT morphism, not an isomorphism, capturing
exactly how much freedom was added.

LEFT AND RIGHT ADJOINT DIRECTIONS ARE SPECIFIC — NEVER INTERCHANGEABLE: for $F:\mathbf{Set}\to
\mathbf{Grp}$ (free) and $U:\mathbf{Grp}\to\mathbf{Set}$ (forgetful): $F\dashv U$ means $F$ is
LEFT adjoint — maps OUT of the free object $F(A)$ correspond to simpler maps of the underlying
data $A$. Believing which functor is left versus right adjoint can be reversed (e.g. confusing
free and forgetful) is WRONG — the LEFT adjoint is specifically the one whose maps OUT correspond
to simpler maps of the underlying data; that is the free functor $F$, matching the $F\dashv G$
notation directly.

ADJUNCTIONS ARE A PERVASIVE CROSS-MATHEMATICS PATTERN — NEVER AN ISOLATED CONSTRUCTION: the exact
free$\dashv$forgetful pattern recurs across mathematics — product/exponential, direct
image/inverse image, colimit/constant functor — each a genuinely DIFFERENT mathematical situation
exhibiting the IDENTICAL abstract structure (Mac Lane: "adjoint functors arise everywhere").
Believing the free/forgetful adjunction is a one-off curiosity specific to groups, rather than
recognizing it as one instance of a pervasive cross-mathematics pattern, is WRONG — the same
hom-set-bijection structure organizes constructions across completely unrelated areas of
mathematics.

## Mental Models
- **"F and U don't cancel each other out — the adjunction tells you exactly what relationship
  DOES hold: maps out of the free object correspond to maps of the raw data."**
- **"Left adjoint: maps OUT correspond to simpler data. That's the free functor, matching F⊣G
  directly — never confused with the forgetful functor."**
- **"This exact pattern — free/forgetful, product/exponential, colimit/constant — recurs
  everywhere; recognizing the pattern is the real payoff, not re-deriving each instance."**

## Why Students Fail

### MC-1: ADJOINT-FUNCTORS-ASSUMED-TO-BE-INVERSES
- **Surface form**: believes left and right adjoint functors should "undo" each other like
  inverse functions, rather than recognizing the hom-set bijection as the correct relationship.
- **Birth type**: foundational (Blueprint's own declared severity — "free" and "forgetful" sound
  like they should cancel, especially after other inverse-pair patterns learned elsewhere).
- **Repair**: re-walk the counit's role as a non-isomorphism canonical map resolving the earlier
  puzzle.

### MC-2: LEFT-RIGHT-ADJOINT-DIRECTION-CONFUSED
- **Surface form**: confuses which functor is the left adjoint and which is the right adjoint in a
  given adjunction.
- **Birth type**: foundational (Blueprint's own declared severity — without an anchor, "left" and
  "right" in $F\dashv G$ are arbitrary-feeling labels).
- **Repair**: re-anchor on "maps OUT of the left adjoint's output correspond to simpler data."

### MC-3: ADJUNCTION-TREATED-AS-AN-ISOLATED-EXOTIC-CONSTRUCTION
- **Surface form**: views the free/forgetful adjunction as a one-off curiosity specific to groups.
- **Birth type**: moderate severity (Blueprint's own declared severity — the concrete example is
  group-specific, obscuring the general pattern it instantiates).
- **Repair**: re-walk the discrete-category/objects-functor transfer example.

## Misconceptions

### MC-1: ADJOINT-FUNCTORS-ASSUMED-TO-BE-INVERSES
- **Surface form**: as described above.
- **Root cause (foundational)**: as described above.
- **Repair**: as described above.

### MC-2: LEFT-RIGHT-ADJOINT-DIRECTION-CONFUSED
- **Surface form**: as described above.
- **Root cause (foundational)**: as described above.
- **Repair**: as described above.

### MC-3: ADJUNCTION-TREATED-AS-AN-ISOLATED-EXOTIC-CONSTRUCTION
- **Surface form**: as described above.
- **Root cause (moderate severity)**: as described above.
- **Repair**: as described above.

## Analogies
- **"An adjunction is like a currency exchange rate, not a mirror — a morphism out of FA and a
  morphism into GB carry the SAME information, exchanged at a fixed rate, never literally the
  same object."**
- **Anti-analogy**: the free/forgetful pair isn't a special algebra trick — it's one appearance of
  a structural pattern that shows up under completely different names across mathematics.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the counit's role resolving the $F(UG)\neq G$ puzzle.
- **Demonstration 2 (targets MC-2)**: the single-generator hom-set-bijection identification of
  which functor is left adjoint.
- **Demonstration 3 (targets MC-3)**: the unit map's concrete two-generator construction and the
  discrete-category transfer pattern.

## Discovery Questions
1. "Should F and U 'undo' each other, the way inverse functions do?"
2. "Which functor is the left adjoint in F⊣G for the free/forgetful pair, and how do you know?"
3. "Is the free/forgetful adjunction a one-off curiosity specific to groups, or an instance of a
   broader pattern?"

## Teaching Sequence
1. **Representation shift**: work the single-generator hom-set bijection, isolating MC-2.
2. **Conflict evidence**: work the counit's resolution of the earlier $F(UG)\neq G$ puzzle,
   isolating MC-1.
3. **Representation shift (ubiquity)**: work the unit map's construction and the cross-mathematics
   pattern, isolating MC-3.
4. **Mastery gate**: require a correct statement of the adjunction condition identifying left
   versus right, a correct description of what a homomorphism out of a free object corresponds to,
   a correct explanation of why the adjunction beats an inverse expectation, and a correct
   description of the unit map's role, at the Blueprint's own stated MAMR of 3/5.

## Tutor Actions
- Never accept $F$ and $U$ described as inverting each other.
- Never accept the left and right adjoint roles assigned without anchoring on which side's maps
  correspond to simpler data.
- Never accept the free/forgetful adjunction treated as an isolated curiosity unrelated to other
  mathematical constructions.

## Voice Teaching Notes
- Say "does F(U(G)) actually equal G, or is something else going on?" whenever an adjunction's
  relationship is being discussed.
- Ask "which side's maps correspond to simpler data — that's your left adjoint" whenever left/right
  adjoint direction is uncertain.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies which functor is the left adjoint in the
  free/forgetful pair.
- **Rung 2 (application)**: learner correctly describes what a homomorphism out of a free object
  on a given set corresponds to.
- **Rung 3 (transfer)**: learner correctly predicts the hom-set bijection and unit map's role for
  the discrete-category/objects-functor adjunction, recognizing it as an instance of the same
  pattern.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the counit's role resolving the earlier puzzle.
- If MC-2 recurs, re-anchor on which side's maps correspond to simpler data.
- If MC-3 recurs, re-walk the cross-mathematics transfer pattern.

## Memory Hooks
- "F and U don't invert — the hom-set bijection is the correct relationship."
- "Left adjoint: maps out correspond to simpler data — never confused with the other side."
- "Adjoint functors arise everywhere — never an isolated curiosity."

## Transfer Connections
- `math.cat.functor` (prerequisite, already authored): supplies the free and forgetful functors
  this concept's canonical example directly reuses, including that concept's own unresolved
  $F(U(G))$ observation this concept resolves.
- `math.cat.natural-transformation` (prerequisite, already authored): supplies the naturality
  condition the adjunction's hom-set bijection must satisfy, and the unit/counit as specific
  natural transformations.

## Cross-Subject Connections
- Computer science: the discrete-category functor and objects-functor adjunction directly applies
  this concept's hom-set-bijection pattern to a completely different mathematical setting.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cat.adjunction.md`, reused by reference for
  its three worked examples and its three-misconception registry (birth types adopted directly as
  declared).
- Transfer probe: the Blueprint's own independence-mode probe on the discrete-category/objects-
  functor adjunction in computer science.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.cat.functor`,
  `math.cat.natural-transformation`, unlocks `math.cat.monad`, cross_links none,
  research/analyze, mastery_threshold 0.6, estimated_hours 8) was directly verified against the
  live KG and matches exactly.

## Version History
- 2026-09-20 (Batch 255): authored. First entry this batch. Companion batch concept:
  `math.cat.representable-functor`.
