# math.cat.functor

## Identity
- **KG id**: `math.cat.functor`
- **Domain**: math.cat
- **Requires**: `math.cat.category`
- **Unlocks**: `math.cat.natural-transformation`, `math.cat.adjunction`
- **Cross-links**: `math.abst.group-homomorphism` (Blueprint's own Component 7 checked at
  BLUEPRINT-write-time and correctly found unauthored then — the EDUCATIONAL-BRAIN corpus HAS
  since authored this concept — upgraded to a genuine cross-link probe here, see Curriculum
  Feedback), `math.linalg.linear-map` (authored — genuine cross-link probe, as the Blueprint's
  own P76 already engages)
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 5

## Learning Objective
Define a functor $F:\mathcal C\to\mathcal D$ via coordinated object and morphism maps satisfying
$F(g\circ f)=F(g)\circ F(f)$ and $F(1_A)=1_{F(A)}$; distinguish COVARIANT (preserves arrow
direction and composition order) from CONTRAVARIANT (reverses BOTH arrow direction AND
composition order TOGETHER — never one without the other); and verify the forgetful/free functor
pair does NOT recover the original object when composed (never assumed to be an inverse round
trip).

## Core Understanding
CONTRAVARIANT FUNCTORS REVERSE BOTH ARROW DIRECTION AND COMPOSITION ORDER TOGETHER — NEVER ONE
WITHOUT THE OTHER: the dual space functor sends $T:V\to W$ to $T^*:W^*\to V^*$ (arrow direction
reversed) defined by $T^*(\phi)=\phi\circ T$. For $S:U\to V$, $T:V\to W$:
$(T\circ S)^*=S^*\circ T^*$ — the composite's dual reverses the ORDER, exactly the contravariant
composition law, NEVER $T^*\circ S^*$ as a naive covariant guess would suggest. Contrast the
covariant forgetful functor's composition law (order PRESERVED: $U(g\circ f)=U(g)\circ U(f)$)
directly against this: the two reversals (arrow direction AND composition order) ALWAYS come
together, never one without the other.

FORGETFUL-THEN-FREE DOES NOT RECOVER THE ORIGINAL — NEVER ASSUMED TO BE AN INVERSE ROUND TRIP:
the forgetful functor $U:\mathbf{Grp}\to\mathbf{Set}$ discards a group's structure (keeping only
the underlying set); the free functor $F:\mathbf{Set}\to\mathbf{Grp}$ builds the "most general
possible" group generated freely by a set's elements, with NO relations beyond the group axioms
themselves. $F(U(G))$ is generally NOT isomorphic to the original $G$ — $U$ discarded $G$'s
specific relations (e.g. $\mathbb Z/6\mathbb Z$'s "add to zero mod 6" structure), and $F$ has NO
way to know those relations were ever there, only reconstructing the freest possible structure on
the bare set. Applying a structure-forgetting functor then a structure-adding one is NEVER
guaranteed to undo itself.

FUNCTORS ARE ONLY GUARANTEED TO PRESERVE COMPOSITION AND IDENTITY — NEVER EVERY PROPERTY
AUTOMATICALLY: the functor definition guarantees exactly two things: $F(g\circ f)=F(g)\circ F(f)$
and $F(1_A)=1_{F(A)}$. Whether a functor also preserves OTHER properties (e.g. sending an
injective morphism to an injective morphism) is NOT automatic from the definition alone — it may
or may not hold, and requires SEPARATE proof if claimed, never assumed as a free consequence of
being a functor.

## Mental Models
- **"Covariant keeps the order; contravariant swaps BOTH the arrow direction and the composition
  order — always together, never one alone."**
- **"Forgetting structure then rebuilding freely doesn't get you back where you started — the free
  functor can't know what was thrown away."**
- **"A functor is only guaranteed to respect composition and identity — anything else about a
  morphism's properties needs its own separate proof."**

## Why Students Fail

### MC-1: CONTRAVARIANT-COMPOSITION-ORDER-NOT-REVERSED
- **Surface form**: assumes all functors preserve composition order like covariant functors, not
  recognizing contravariant functors reverse both arrow direction and composition order together.
- **Birth type**: Foundational severity (Blueprint's own declared severity — covariant functors
  are usually encountered first, establishing an order-preserving default that's easy to
  over-generalize).
- **Repair**: re-derive directly from the dual map's defining formula, $T^*(\phi)=\phi\circ T$,
  tracing through a specific composite explicitly.

### MC-2: FORGETFUL-THEN-FREE-ASSUMED-IDENTITY
- **Surface form**: believes applying a forgetful functor followed by a free functor (or vice
  versa) recovers the original object, rather than recognizing genuine information loss/addition
  occurs.
- **Birth type**: Moderate severity (Blueprint's own declared severity — "forgetful" and "free"
  sound like opposite, inverse operations, inviting the round-trip assumption).
- **Repair**: re-anchor on "the free functor only knows the SET it's given — it has no way to know
  the original relations were ever there."

### MC-3: FUNCTOR-ASSUMED-TO-PRESERVE-ALL-PROPERTIES
- **Surface form**: believes a functor automatically preserves every property of objects/morphisms
  (e.g. injectivity, surjectivity) rather than only composition and identity specifically.
- **Birth type**: Moderate severity (Blueprint's own declared severity — "structure-preserving"
  sounds like it should cover everything, not just the two specific laws).
- **Repair**: re-anchor on the precise definition — only composition and identity are guaranteed;
  other properties require separate proof.

## Misconceptions

### MC-1: CONTRAVARIANT-COMPOSITION-ORDER-NOT-REVERSED
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: FORGETFUL-THEN-FREE-ASSUMED-IDENTITY
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

### MC-3: FUNCTOR-ASSUMED-TO-PRESERVE-ALL-PROPERTIES
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A contravariant functor is like a mirror reflection of composition — it doesn't just reverse
  which way the arrows point, it reverses the reading order too, and always both at once."**
- **Anti-analogy**: forgetting a group's structure and then freely rebuilding one is not like
  taking something apart and putting it back together — the free construction has genuinely lost
  access to the original blueprint.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the dual-space contravariant functor's
  $(T\circ S)^*=S^*\circ T^*$ derivation, contrasted with the covariant forgetful functor's
  order-preserving law.
- **Demonstration 2 (targets MC-2)**: the forgetful-then-free round-trip failure for
  $\mathbb Z/6\mathbb Z$, showing $F(U(G))\ne G$ in general.
- **Demonstration 3 (targets MC-3)**: the precise scope of the functor laws (composition and
  identity only), contrasted with an unproven claim about injectivity preservation.

## Discovery Questions
1. "For a contravariant functor, does (T∘S)* equal S*∘T* or T*∘S*?"
2. "Does applying a forgetful functor and then a free functor get you back to the original
   object?"
3. "Does a functor automatically preserve every property of morphisms, like injectivity, or only
   specific things?"

## Teaching Sequence
1. **Representation shift**: the two-piece functor definition grounded in the forgetful functor,
   verifying both preservation laws.
2. **Contrast pair**: covariant-versus-contravariant composition order, working Demonstration 1,
   isolating MC-1; forgetful-versus-free as opposite, non-inverse directions, working
   Demonstration 2, isolating MC-2.
3. **Mastery gate**: require a correct verification of both functor laws for a named example, a
   correct contravariant composition-order derivation, and a correct explanation of why forgetful-
   then-free doesn't recover the original object, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept a contravariant functor's composite computed with the order unreversed.
- Never accept a claim that forgetful-then-free (or free-then-forgetful) recovers the original
  object.
- Never accept a functor assumed to automatically preserve a property beyond composition and
  identity without separate justification.

## Voice Teaching Notes
- Say "is this functor covariant or contravariant — does the order need to reverse?" whenever a
  composite is computed through a functor.
- Ask "does the free functor actually know what relations were discarded?" whenever a forgetful-
  then-free round trip is proposed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies both functor preservation laws for a named
  example (e.g. the forgetful functor).
- **Rung 2 (application)**: learner correctly computes a contravariant functor's action on a
  composite morphism, reversing the order.
- **Rung 3 (transfer)**: learner correctly explains why a forgetful-then-free round trip loses
  information, and connects the functor framework to the already-known linear-map morphism type
  in $\mathbf{Vect}_k$.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the contravariant composition law from the dual map's defining
  formula.
- If MC-2 recurs, re-anchor on the free functor's ignorance of discarded relations.
- If MC-3 recurs, re-anchor on the precise two-law functor definition.

## Memory Hooks
- "Contravariant reverses arrow direction AND composition order — always together."
- "Forgetful then free doesn't undo itself — the free functor can't know what was lost."
- "A functor only guarantees composition and identity — nothing else is automatic."

## Transfer Connections
- `math.cat.category` (already authored, this campaign, Batch 180): supplies the source and
  target categories, and their composition/identity structure, that a functor must respect.
- `math.cat.natural-transformation`, `math.cat.adjunction` (not yet authored, KG's declared
  unlocks): a morphism BETWEEN functors, and the generalized forgetful/free relationship,
  respectively — both directly building on this concept.
- `math.linalg.linear-map` (already authored, certified domain, genuine cross-link): supplies the
  linearity definition and non-example ($\psi(x)=x^2$) this concept's forgetful-functor
  application to $\mathbf{Vect}_k$ directly reuses.
- `math.abst.group-homomorphism` (already authored — genuine cross-link, corrected from the
  Blueprint's original independence-mode-for-this-target deferral, see Curriculum Feedback):
  supplies the group-homomorphism structure this concept's forgetful/free functor pair
  ($\mathbf{Grp}\leftrightarrow\mathbf{Set}$) directly builds on in its own worked examples.

## Cross-Subject Connections
- Algebraic topology: homology functors and the fundamental group $\pi_1$ as structure-preserving
  maps from topological spaces to algebraic categories, named examples in the KG description.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cat.functor.md`, reused by reference for its
  forgetful-functor preservation-law verification, its dual-space contravariant functor example,
  its forgetful/free round-trip contrast, and its three-misconception registry (severity levels
  adopted directly as declared).
- Transfer probe: the Blueprint's own cross-link probe against `math.linalg.linear-map`, verifying
  the identity functor on $\mathbf{Vect}_k$ and applying the forgetful functor to a non-linear
  function example; supplemented by the genuine cross-link to `math.abst.group-homomorphism`
  established here, connecting the forgetful/free functor pair to its own group-homomorphism
  worked examples.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Reverse-direction cross-link discrepancy found and corrected**: the Blueprint's own Component 7
  checked `math.abst.group-homomorphism`'s authorship status AT THE BLUEPRINT'S OWN WRITE-TIME and
  correctly found it unauthored then, setting independence mode for that specific target (while
  correctly using cross-link-probe mode for the already-authored `math.linalg.linear-map`) — but
  the EDUCATIONAL-BRAIN corpus has SINCE authored `math.abst.group-homomorphism` — upgraded here to
  a genuine cross-link probe as well, the fifth such reverse-direction discrepancy this campaign
  (after the pre-segment Batch 131, Batch 152, Batch 156, Batch 165, and Batch 176).
- All other fields (requires, unlocks, difficulty, bloom, mastery_threshold, estimated_hours)
  matched the live KG exactly. `math.linalg.linear-map` independently re-confirmed authored.

## Version History
- 2026-09-19 (Batch 181): authored. Second entry this batch. Companion batch concept:
  `math.top.open-sets`.
