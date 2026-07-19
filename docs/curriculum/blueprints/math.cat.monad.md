# Teaching Blueprint: Monad (`math.cat.monad`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cat.monad` |
| name | Monad |
| domain | Category Theory |
| difficulty | research |
| bloom | analyze |
| mastery_threshold | 0.55 → MAMR = ⌈0.55×5⌉ = 3/5 |
| estimated_hours | 8 |
| requires | `math.cat.adjunction` |
| unlocks | (none) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) — research-level learner already fluent in adjunctions; the monad is constructed directly from the already-mastered free/forgetful example |
| description (KG) | A monad on C: a functor T:C→C with unit η:1⟹T and multiplication μ:T²⟹T satisfying associativity and unit laws. Every adjunction F⊣G determines a monad GF. Algebras over a monad generalize many algebraic structures. Monads appear in functional programming (Haskell Maybe, IO, List). |

## Component 1 — Learning Objectives

- LO1 *(orientation-level, given the research-level scope of this concept)*: State the monad axioms precisely — a functor $T:\mathcal{C}\to\mathcal{C}$ with unit $\eta:1_\mathcal{C}\Rightarrow T$ and multiplication $\mu:T^2\Rightarrow T$, satisfying associativity ($\mu\circ T\mu=\mu\circ\mu T$) and unit laws ($\mu\circ T\eta=\mu\circ\eta T=\text{id}$) — recognizing these mirror ordinary monoid/ring multiplication axioms, now at the level of functors and natural transformations.
- LO2: Construct the monad $T=GF$ determined by ANY adjunction $F\dashv G$ — directly reusing `math.cat.adjunction`'s own free$\dashv$forgetful example (free groups) to build a CONCRETE monad, recognizing this is not an arbitrary imposed structure but a DIRECT consequence of the adjunction.
- LO3: Recognize monads appear concretely in functional programming (Haskell's `Maybe`, `List`, `IO`) as genuine INSTANCES of the identical abstract structure — not a coincidental reuse of the name, but the same functor+unit+multiplication pattern satisfying the identical laws.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cat.adjunction` ($F\dashv G$ via the natural hom-set bijection $\text{Hom}_\mathcal{D}(FA,B)\cong\text{Hom}_\mathcal{C}(A,GB)$; the unit $\eta:1_\mathcal{C}\Rightarrow GF$ and counit $\varepsilon:FG\Rightarrow1_\mathcal{D}$; the concrete free$\dashv$forgetful example on groups).

## Component 3 — Core Explanation

**A monad's axioms mirror monoid multiplication, now at the functor level (orientation level)**: a monad on $\mathcal{C}$ consists of a functor $T:\mathcal{C}\to\mathcal{C}$ together with two natural transformations — the unit $\eta:1_\mathcal{C}\Rightarrow T$ and the multiplication $\mu:T^2\Rightarrow T$ (where $T^2$ means $T$ composed with itself) — satisfying associativity ($\mu\circ T\mu=\mu\circ\mu T$: multiplying three "layers" of $T$ together gives the same result regardless of grouping) and unit laws ($\mu\circ T\eta=\mu\circ\eta T=\text{id}$: multiplying by the unit, on either side, does nothing). These are genuinely the SAME axioms governing ordinary monoid or ring multiplication, transplanted to the level of functors and natural transformations.

**Every adjunction directly produces a monad — not an independently-imposed structure**: given ANY adjunction $F\dashv G$, the composite $T=GF:\mathcal{C}\to\mathcal{C}$ automatically becomes a monad: its unit is EXACTLY the adjunction's own unit $\eta$, and its multiplication $\mu=G(\varepsilon_F)$ is built directly from the adjunction's counit $\varepsilon$. A monad arising this way is not a separate structure someone chose to impose on top of an adjunction — it is a direct, automatic consequence of the adjunction already existing.

**Monads in functional programming are genuine instances, not a coincidental name-sharing**: Haskell's `Maybe`, `List`, and `IO` types are each a functor $T$ equipped with a unit (wrapping a bare value) and a multiplication (flattening a "doubled" structure, like a list of lists, into a single layer) — satisfying the SAME associativity and unit laws stated abstractly above. These are concrete, checkable instances of the identical categorical structure, not merely borrowing terminology.

## Component 4 — Worked Examples

**Example 1 (orientation-level — the monad axioms stated precisely, breaking MC-1)**: For a monad $(T,\eta,\mu)$: associativity requires $\mu_A\circ T(\mu_A)=\mu_A\circ\mu_{TA}$ (both sides are maps $T^3A\to TA$) — multiplying the innermost two "layers" first, or the outermost two first, must give the identical result. The unit laws require $\mu_A\circ T(\eta_A)=\text{id}_{TA}$ and $\mu_A\circ\eta_{TA}=\text{id}_{TA}$ — inserting the unit into either side of a multiplication does nothing. These axioms are STRUCTURALLY identical to ordinary monoid axioms (associativity of multiplication; identity element on either side does nothing) — now expressed via natural transformations between functors, rather than elements of a set.

**Example 2 (LO2 — constructing the free-group monad directly from the adjunction, breaking MC-1/MC-2)**: Using `math.cat.adjunction`'s own free$\dashv$forgetful adjunction $F\dashv U$ (free group functor, forgetful functor): $T=UF:\mathbf{Set}\to\mathbf{Set}$ sends a set $A$ to $U(F(A))$ — the UNDERLYING SET of the free group on $A$ (all reduced words in $A$'s elements and their inverses). The unit $\eta_A:A\to T(A)$ is EXACTLY the adjunction's own unit — inserting each element of $A$ as a length-1 word, directly reused, not a new construction. The multiplication $\mu_A:T^2(A)\to T(A)$, i.e. $U(F(U(F(A))))\to U(F(A))$, "FLATTENS" a free group built on top of ANOTHER free group's underlying set — a "word of words" — into a single free group's word, by concatenating and reducing the nested word structure — directly analogous to flattening a list of lists into one list.

**Example 3 (LO3 — Haskell's Maybe as a genuine instance, breaking MC-3)**: Haskell's `Maybe` type: $T(A)=\text{Maybe }A=\text{Just}(a)$ or $\text{Nothing}$ — a genuine functor. Unit $\eta_A(a)=\text{Just}(a)$ (wrapping a bare value). Multiplication $\mu$ flattens $\text{Maybe}(\text{Maybe }A)$ into $\text{Maybe }A$: $\text{Just}(\text{Just}(a))\mapsto\text{Just}(a)$; $\text{Just}(\text{Nothing})\mapsto\text{Nothing}$; $\text{Nothing}\mapsto\text{Nothing}$. Checking the unit law: $\mu(\eta(\text{Just}(a)))=\mu(\text{Just}(\text{Just}(a)))=\text{Just}(a)$ — the identity, as required. `Maybe` satisfies the SAME abstract laws as Example 1's general definition and Example 2's free-group monad — a genuine instance of the identical structure, not a coincidental reuse of terminology.

## Component 5 — Teaching Actions

### Teaching Action A01 — Monad Axioms Mirror Monoid Multiplication (Primitive P11: Representation Shift)

State: "these axioms aren't a novel invention specific to category theory — they're the SAME associativity and identity laws already familiar from monoids and rings, just expressed via functors and natural transformations instead of set elements." Work Example 1's precise axiom statement, drawing the direct parallel.

- **MC-1 hook**: ask "is a monad's structure (functor + unit + multiplication) an arbitrary imposed structure with no deeper origin, rather than a specific consequence of something already studied?" — a "yes" answer reveals MC-1 (missing that monads arise directly from adjunctions, per LO2, rather than being independently imposed).

### Teaching Action A02 — The Monad Is Built Directly From the Adjunction, Reusing Its Own Unit and Counit (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the free-group monad's unit IS the adjunction's own unit, unchanged; its multiplication is built directly from the adjunction's counit via a concrete "flattening" operation. State: "nothing new was invented here — the monad is assembled entirely from pieces the adjunction already supplied."

- **MC-2 hook**: ask "is the monad's multiplication μ an unrelated new construction, or is it directly built from the adjunction's own counit?" — a "no, unrelated" answer reveals MC-2 (missing that μ is directly constructed from the adjunction's counit, and that it concretely performs a 'flattening' operation).

### Teaching Action A03 — Functional Programming Monads Are Genuine Instances, Not Coincidental Naming (Primitive P06: Contrast Pair)

Contrast the abstract axioms (Example 1) and the free-group monad (Example 2) against Haskell's `Maybe` (Example 3), verifying the SAME unit law holds in all three. State: "Maybe isn't 'named after' the mathematical monad by coincidence — it genuinely satisfies the identical structural laws."

- **MC-3 hook**: ask "are functional-programming monads (like Haskell's Maybe) a completely different, unrelated concept from the mathematical monad, sharing only the name?" — a "yes" answer reveals MC-3 (missing that they are genuine concrete instances of the identical abstract structure).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State the monad unit law in your own words, explaining what "inserting the unit does nothing" means concretely.
  2. Explain, using the free-group monad, why the unit η_A is not surjective onto T(A)=U(F(A)).
  3. Verify the unit law $\mu(\eta(\text{Just}(a)))=\text{Just}(a)$ for Haskell's Maybe monad directly.
  4. Explain why "flattening a list of lists into one list" is a good informal description of what a monad's multiplication μ generally does.
- **P76 (Transfer Probe, mode = independence)**: "A functional-programming instructor introduces the List monad to students, showing that combining nested lists (a list of lists) via 'flatten' behaves like the mathematical multiplication μ. (a) Using this lesson's free-group monad example, explain the structural parallel between 'flattening a free group of free groups' and 'flattening a list of lists.' (b) A student argues 'since the List monad comes from programming and the free-group monad comes from abstract algebra, they must be governed by fundamentally different rules, even if both are called monads.' Explain specifically why this argument is incorrect. (c) The instructor also mentions that every monad arises from at least one adjunction. A student asks whether this means every monad must literally BE an adjunction. Explain why a monad and the adjunction that produces it are related but not identical constructions."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 3/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | MONAD-STRUCTURE-ASSUMED-ARBITRARY | Believing a monad's functor+unit+multiplication structure is an arbitrary imposed structure, missing that it arises directly and automatically from any adjunction | Foundational |
| MC-2 | MONAD-MULTIPLICATION-TREATED-AS-UNRELATED-NEW-CONSTRUCTION | Believing the monad's multiplication μ is an unrelated new construction, missing that it is built directly from the adjunction's counit and concretely performs a flattening operation | Foundational |
| MC-3 | FUNCTIONAL-PROGRAMMING-MONADS-TREATED-AS-UNRELATED | Believing functional-programming monads share only a name with the mathematical monad, missing that they are genuine concrete instances of the identical abstract structure | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Monad Structure Assumed Arbitrary") → P41 (detect: ask a student whether a monad's structure is independently imposed rather than derived, checking for "yes") → P64 (conceptual shift: re-walk Example 2's direct construction from the adjunction, re-anchoring on "the monad is a direct, automatic consequence of the adjunction").
- **B02 (targets MC-2)**: P27 (name it: "Monad Multiplication Treated as Unrelated New Construction") → P41 (detect: ask a student whether μ is built from the adjunction's counit, checking for "no") → P64 (conceptual shift: re-walk Example 2's flattening construction, re-anchoring on "μ is built directly from the counit, performing a concrete flattening operation").
- **B03 (targets MC-3)**: P27 (name it: "Functional Programming Monads Treated as Unrelated") → P41 (detect: ask a student whether Haskell's Maybe genuinely satisfies the same monad laws as the mathematical structure, checking for "no") → P64 (conceptual shift: re-walk Example 3's direct verification of the unit law for Maybe, re-anchoring on "these are genuine instances of the identical structure").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cat.adjunction` (the unit, counit, and concrete free/forgetful example this concept's monad construction directly reuses).
- **Unlocks**: (none — KG lists no unlocks for this concept).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 8 with a research/analyze tag places this at a "3 TAs + gate" tier; per established precedent for research-tier concepts with large scope, LO1 (the general monad axioms) is deliberately kept at ORIENTATION level, stating the definition precisely without deriving the full generality of monad theory (algebras over a monad, monadicity theorems) — LO2 and LO3 receive full concrete worked-example depth instead.
- **Division of labor**: `math.cat.adjunction` owns the adjunction definition, its unit/counit, and the concrete free/forgetful example. This concept, `math.cat.monad`, deliberately does not re-derive any of that; it owns the monad axioms themselves, the direct construction of a monad from any adjunction (reusing that concept's own unit/counit rather than introducing new machinery), and the connection to functional-programming instances.
- Example 2 deliberately reuses `math.cat.adjunction`'s own free$\dashv$forgetful example (rather than a new adjunction) specifically so the monad construction could be built entirely from already-familiar pieces, keeping the abstraction load focused on the genuinely new content (the monad structure itself) rather than re-introducing unfamiliar category-theoretic machinery.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (no cross_links listed → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.55×5⌉=3) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: research-level learner already fluent in adjunctions; monad constructed directly from the already-mastered free/forgetful example) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1 orientation-level, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
