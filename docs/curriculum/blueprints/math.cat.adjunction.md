# Teaching Blueprint: Adjunction (`math.cat.adjunction`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cat.adjunction` |
| name | Adjunction |
| domain | Category Theory |
| difficulty | research |
| bloom | analyze |
| mastery_threshold | 0.6 → MAMR = ⌈0.6×5⌉ = 3/5 |
| estimated_hours | 8 |
| requires | `math.cat.functor`, `math.cat.natural-transformation` |
| unlocks | `math.cat.monad` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — direct definition building on the already-mastered free/forgetful functor pair |
| description (KG) | F⊣G (F left adjoint to G) iff Hom_D(FA,B)≅Hom_C(A,GB) naturally. Unit η:1_C⟹GF, counit ε:FG⟹1_D. Adjoints are ubiquitous: free/forgetful, product/exponential, direct/inverse image, colimit/constant. 'Adjoint functors arise everywhere' (Mac Lane). |

## Component 1 — Learning Objectives

- LO1: State the defining condition of an **adjunction**, $F\dashv G$ ("$F$ is left adjoint to $G$"): a natural BIJECTION $\text{Hom}_\mathcal{D}(FA,B) \cong \text{Hom}_\mathcal{C}(A,GB)$ for functors $F:\mathcal{C}\to\mathcal{D}$, $G:\mathcal{D}\to\mathcal{C}$ — at an orientation level (per this corpus's established precedent for large-scope research-tier concepts), correctly stating the condition and identifying which functor is "left" versus "right," without deriving the full theory of adjoint functors.
- LO2: Recognize the **free/forgetful pair** ($F=$ free functor, $G=$ forgetful functor, already introduced in `math.cat.functor`) as the CANONICAL example of an adjunction, directly resolving that concept's own observed puzzle — that $F(U(G))$ is generally NOT isomorphic to the original object $G$ — by explaining how the adjunction's hom-set bijection is the PRECISE, correct relationship between $F$ and $G$, replacing the naive (and false) expectation that they should simply "undo" each other.
- LO3: State, at orientation level, the roles of the **unit** $\eta:1_\mathcal{C}\Rightarrow GF$ and **counit** $\varepsilon:FG\Rightarrow1_\mathcal{D}$ (both natural transformations, per `math.cat.natural-transformation`) as the concrete maps witnessing the adjunction, and recognize (via Mac Lane's own framing, "adjoint functors arise everywhere") that adjunctions are a pervasive organizing pattern across mathematics, not an isolated exotic construction.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cat.functor` (structure-preserving maps between categories, and specifically the forgetful functor $U:\mathbf{Grp}\to\mathbf{Set}$ and free functor $F:\mathbf{Set}\to\mathbf{Grp}$ examples, including the observation that $F(U(G))$ is generally not isomorphic to $G$) and `math.cat.natural-transformation` ($\eta:F\Rightarrow G$ between functors, and the naturality-square condition).

## Component 3 — Core Explanation

**The defining hom-set bijection (orientation level)**: $F$ is **left adjoint** to $G$ (written $F\dashv G$) if there is a bijection $\text{Hom}_\mathcal{D}(FA,B) \cong \text{Hom}_\mathcal{C}(A,GB)$ for every object $A\in\mathcal{C}$ and $B\in\mathcal{D}$, and this bijection is NATURAL (varies coherently with $A$ and $B$, in the precise sense `math.cat.natural-transformation` already formalized). Informally: a morphism $FA\to B$ in $\mathcal{D}$ and a morphism $A\to GB$ in $\mathcal{C}$ carry EXACTLY the same information, just packaged on opposite sides of the two functors. *(Per this corpus's established precedent for research-tier concepts with large scope — see `math.cat.limits`, `math.nt.analytic-number-theory` — this blueprint states the defining condition and works its canonical example precisely, without developing the full general theory of adjoint functors, uniqueness of adjoints, or the adjoint functor theorem.)*

**The free/forgetful pair, resolving the earlier puzzle**: `math.cat.functor`'s own Contrast 2 observed that $F(U(G))$ (apply forgetful then free) is generally a MUCH BIGGER, freer group than the original $G$ — NOT a way of "undoing" $U$. The adjunction $F\dashv U$ (free functor left adjoint to forgetful functor) explains PRECISELY what relationship DOES hold instead: $\text{Hom}_{\mathbf{Grp}}(FA,B) \cong \text{Hom}_{\mathbf{Set}}(A,UB)$ — a group homomorphism OUT of the free group on a set $A$ into any group $B$ corresponds EXACTLY to an ordinary FUNCTION from the set $A$ into $B$'s underlying set. This is the genuinely correct, useful relationship between "free" and "forgetful" — not that they cancel each other out, but that maps out of a free object correspond exactly to maps of the underlying data.

**Unit, counit, and ubiquity (orientation level)**: the adjunction comes packaged with two natural transformations: the **unit** $\eta:1_\mathcal{C}\Rightarrow GF$ (for the free/forgetful case, $\eta_A:A\to U(FA)$ — the "insertion of generators" map, sending each element of the original set into the free group it generates) and the **counit** $\varepsilon:FG\Rightarrow1_\mathcal{D}$ (for a group $B$, $\varepsilon_B:F(UB)\to B$ — the map from the free group on $B$'s underlying set back down onto $B$ itself, collapsing the free relations to match $B$'s actual structure). Mac Lane's remark, "adjoint functors arise everywhere," reflects that this exact free$\dashv$forgetful PATTERN recurs across mathematics — product/exponential, direct image/inverse image, colimit/constant functor — each instance a genuinely different mathematical situation exhibiting the identical abstract structure.

## Component 4 — Worked Examples

**Example 1 (LO1 — the hom-set bijection, stated for the free/forgetful case)**: For $F:\mathbf{Set}\to\mathbf{Grp}$ (free) and $U:\mathbf{Grp}\to\mathbf{Set}$ (forgetful), the adjunction states $\text{Hom}_{\mathbf{Grp}}(F(A),B) \cong \text{Hom}_{\mathbf{Set}}(A,U(B))$ for any set $A$ and group $B$. Concretely: for $A=\{x\}$ (a single-element set), $F(A)$ is the free group on one generator (isomorphic to $\mathbb{Z}$), and a group homomorphism $F(A)\to B$ is determined ENTIRELY by where the single generator $x$ goes — which is exactly the same data as an ordinary function $A\to U(B)$ (choosing one element of $B$'s underlying set for $x$ to map to). The bijection here is essentially "a homomorphism out of a free group is exactly a choice of where the generators go" — the defining freedom of the free group.

**Example 2 (LO2 — resolving math.cat.functor's puzzle)**: `math.cat.functor`'s own Contrast 2 asked "does applying forgetful then free get you back where you started?" and answered no — $F(U(G))$ is much bigger and freer than $G$. The adjunction explains why this is the WRONG question to ask: the correct relationship isn't that $F$ and $U$ invert each other, but that $\text{Hom}(F(UG),B)\cong\text{Hom}(UG,U(B))$ for any group $B$ — maps OUT of the free group on $G$'s underlying set correspond to ordinary functions from $G$'s underlying set. The counit $\varepsilon_G:F(UG)\to G$ (mapping the "too-free" group down onto $G$ itself) is the genuinely correct map connecting them — not an isomorphism, but a canonical, always-present morphism capturing exactly how much freedom was added and then partially "used up" reconstructing $G$'s actual relations.

**Example 3 (LO3 — the unit map, concretely)**: For $A=\{a,b\}$ (a two-element set) and the free group $F(A)$ on generators $a,b$ (all words in $a,b,a^{-1},b^{-1}$ with no relations beyond group axioms), the unit $\eta_A:A\to U(F(A))$ sends each element of $A$ to the corresponding length-1 generator inside the free group's underlying set — e.g. $\eta_A(a)=a\in F(A)$ (viewed as a bare set element). This map is NOT surjective (the free group's underlying set is vastly larger, containing every possible word) — it simply "inserts" the original generating set into the much larger free structure it generates, exactly the concrete instance of the general unit map $\eta:1_\mathcal{C}\Rightarrow GF$.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Hom-Set Bijection, at Orientation Level (Primitive P11: Representation Shift)

State: "a map OUT of a free object corresponds exactly to a map of the raw underlying data going IN — that's the entire content of the adjunction, packaged as a bijection between two hom-sets." Work Example 1's concrete single-generator case.

### Teaching Action A02 — Resolving the Earlier Puzzle: F and U Don't Invert, They Adjoin (Primitive P28: Conflict Evidence)

Explicitly recall `math.cat.functor`'s own unanswered puzzle (does forgetful-then-free get you back to the start? No.). Present Example 2's resolution: the adjunction's hom-set correspondence, and the counit $\varepsilon_G:F(UG)\to G$, are the CORRECT relationship replacing the naive "they should cancel out" expectation. State: "the adjunction is precisely the structure that tells you what relationship DOES hold, once you accept that $F$ and $U$ don't simply invert each other."

### Teaching Action A03 — Unit, Counit, and Ubiquity (Primitive P11: Representation Shift)

Work Example 3's concrete unit map, then state Mac Lane's remark directly: "this exact free-forgetful pattern — a natural bijection between maps out of a freely-generated structure and maps of the raw data — recurs constantly across completely different areas of mathematics (products and exponentials, direct and inverse images, colimits and constant functors). Recognizing the PATTERN, even without re-deriving each instance from scratch, is the payoff of this concept."

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State the adjunction condition $F\dashv G$ in your own words, identifying which functor is "left" and which is "right" for the free/forgetful pair.
  2. For $A=\{x,y,z\}$ (a three-element set), describe (without full computation) what a group homomorphism $F(A)\to B$ corresponds to, per the adjunction's hom-set bijection.
  3. Explain, referencing `math.cat.functor`'s own observation, why the adjunction is a better way to relate $F$ and $U$ than expecting them to be inverse to each other.
  4. Describe, in general terms, what the unit map $\eta_A:A\to U(F(A))$ does, using the two-generator example from Example 3 as your reference.
- **P76 (Transfer Probe, mode = independence)**: "A computer science student encounters an adjunction between the 'discrete category' functor $D:\mathbf{Set}\to\mathbf{Cat}$ (sending a set to the category with that set as objects and only identity morphisms) and the 'objects' forgetful functor $\text{Ob}:\mathbf{Cat}\to\mathbf{Set}$ (sending a category to its underlying set of objects). (a) Using the pattern established for free/forgetful, state what hom-set bijection you would EXPECT this adjunction to satisfy (you do not need to verify it rigorously). (b) Explain, in general terms, what the unit map for this adjunction should intuitively do, by analogy with Example 3's free-group unit map. (c) Explain why recognizing this as 'yet another instance of the same adjunction pattern,' rather than an entirely new concept to learn from scratch, is exactly the payoff Mac Lane's 'adjoint functors arise everywhere' remark is pointing at."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 3/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ADJOINT-FUNCTORS-ASSUMED-TO-BE-INVERSES | Believing left and right adjoint functors should "undo" each other like inverse functions, rather than recognizing the adjunction's hom-set bijection as the genuinely correct (weaker, but still precise) relationship | Foundational |
| MC-2 | LEFT-RIGHT-ADJOINT-DIRECTION-CONFUSED | Confusing which functor is the left adjoint and which is the right adjoint in a given adjunction (e.g. reversing free and forgetful) | Foundational |
| MC-3 | ADJUNCTION-TREATED-AS-AN-ISOLATED-EXOTIC-CONSTRUCTION | Viewing the free/forgetful adjunction as a one-off curiosity specific to groups, rather than recognizing it as one instance of a pervasive cross-mathematics pattern | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Adjoint-Functors-as-Inverses Assumption") → P41 (detect: ask whether $F(U(G))$ should equal $G$ for the free/forgetful adjunction) → P64 (conceptual shift: re-walk Example 2's direct resolution — the adjunction's hom-set bijection, not an inverse relationship, is the correct structure — re-anchoring on the counit $\varepsilon_G:F(UG)\to G$ as the genuine (non-isomorphism) connecting map).
- **B02 (targets MC-2)**: P27 (name it: "Left-Right Adjoint Direction Confusion") → P41 (detect: ask a student which functor, free or forgetful, is the left adjoint in $F\dashv G$) → P64 (conceptual shift: re-anchor on "the LEFT adjoint is the one whose maps OUT correspond to simpler maps of the underlying data — that's the free functor $F$, matching the $F\dashv G$ notation directly").
- **B03 (targets MC-3)**: P27 (name it: "Adjunction as Isolated Construction") → P41 (detect: ask whether the free/forgetful adjunction pattern has any relevance beyond groups and sets) → P64 (conceptual shift: re-walk the transfer probe's discrete-category/objects-functor example, re-anchoring on Mac Lane's "adjoint functors arise everywhere" framing as a genuinely pervasive organizing principle, not a one-off curiosity).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cat.functor` (the free and forgetful functors this concept's canonical example directly reuses, including that concept's own unresolved observation about $F(U(G))$), `math.cat.natural-transformation` (the naturality condition the adjunction's hom-set bijection must satisfy, and the unit/counit as specific natural transformations).
- **Unlocks**: `math.cat.monad` (a monad is built directly from an adjunction, via $GF$ together with the unit and a multiplication derived from the counit).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 8 with a research/analyze tag and the corpus's lowest-yet mastery_threshold (0.6, MAMR 3/5) places this at a "3 TAs + gate" tier treated explicitly at **orientation level**, following this corpus's established precedent for large-scope research-tier concepts (`math.cat.limits`, `math.nt.analytic-number-theory`, `math.fnal.banach-space`) — this blueprint states the defining condition and works the canonical free/forgetful example precisely, without developing the general theory of adjoint functors (uniqueness up to isomorphism, the adjoint functor theorem, or a systematic account of every named example family).
- This blueprint deliberately opens by directly resolving `math.cat.functor`'s own unanswered Contrast 2 puzzle (does $F(U(G))$ recover $G$? — answered "generally no" there, with no further explanation offered) — this is the strongest possible motivation for adjunction, since the student already has a concrete, memorable question the concept directly answers, rather than adjunction being introduced as an abstract definition in a vacuum.
- The lower mastery_threshold (0.6, MAMR 3/5) compared to most other concepts in the corpus (typically 0.8-0.95) reflects the KG's own judgment that, at this research tier, correctly stating the defining pattern and resolving the canonical motivating example constitutes adequate mastery — full technical fluency with adjoint functor theory is appropriately deferred to specialized further study.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.6×5⌉=3) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: direct definition building on the already-mastered free/forgetful pair) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
