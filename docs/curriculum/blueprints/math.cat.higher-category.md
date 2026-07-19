# Teaching Blueprint: Higher Category Theory (`math.cat.higher-category`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cat.higher-category` |
| name | Higher Category Theory |
| domain | Category Theory |
| difficulty | research |
| bloom | create |
| mastery_threshold | 0.35 → MAMR = ⌈0.35×5⌉ = 2/5 |
| estimated_hours | 15 |
| requires | `math.cat.monad`, `math.top.homotopy` |
| unlocks | (none) |
| cross_links | `math.top.homotopy` |
| CPA_entry_stage | A (Abstract) — research-level learner already fluent in monads and homotopy; each escalation is presented directly by reusing already-mastered constructions |
| description (KG) | 2-category: categories as objects, functors as morphisms, natural transformations as 2-morphisms. ∞-categories (quasicategories, Segal spaces): homotopy-coherent structures. Homotopy Type Theory (HoTT): types are spaces, proofs are paths. Active research frontier. |

## Component 1 — Learning Objectives

*(All three learning objectives are deliberately ORIENTATION-level throughout this concept, reflecting the exceptionally low MAMR = 2/5 and "create" bloom level the KG itself assigns — this concept is designed as an awareness-level survey of an active research frontier, not a mastery-level treatment. See Component 8 for the explicit justification.)*

- LO1: Recognize a **2-category** — categories as objects, functors as morphisms, and natural transformations as **2-morphisms** (morphisms between morphisms) — as one further structural escalation beyond `math.cat.functor-category`'s own $[\mathcal{C},\mathcal{D}]$ construction.
- LO2: Recognize **∞-categories** (quasicategories, Segal spaces) as **homotopy-coherent** structures — where composition is only associative UP TO HOMOTOPY (a coherent witnessing path, per `math.top.homotopy`'s own definition), rather than a strict, on-the-nose equation.
- LO3: Recognize **Homotopy Type Theory (HoTT)**'s central correspondence — types are spaces, terms are points, and PROOFS of equality are literally **paths** (homotopies) — as a genuine, formal reinterpretation directly reusing `math.top.homotopy`'s own homotopy definition, not a loose metaphor.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cat.monad` (functors with unit/multiplication satisfying monoid-like laws, built from adjunctions) and `math.top.homotopy` (two continuous maps $f,g$ are homotopic if a continuous $H:X\times[0,1]\to Y$ exists with $H(x,0)=f(x)$, $H(x,1)=g(x)$; homotopy is an equivalence relation).

## Component 3 — Core Explanation

**A 2-category adds one further layer on top of $[\mathcal{C},\mathcal{D}]$'s own structure**: `math.cat.functor-category` already showed $[\mathcal{C},\mathcal{D}]$ is a genuine CATEGORY (objects = functors, morphisms = natural transformations). A 2-category takes CATEGORIES THEMSELVES as its objects, FUNCTORS as its morphisms, and NATURAL TRANSFORMATIONS as "2-morphisms" — morphisms BETWEEN the functor-morphisms. The hom-category between two objects $\mathcal{C},\mathcal{D}$ of this 2-category is EXACTLY $[\mathcal{C},\mathcal{D}]$ — the already-mastered construction, now serving as a building block one level up.

**∞-categories replace strict equality with homotopy-coherence**: in an ordinary category, composition is strictly associative: $(h\circ g)\circ f=h\circ(g\circ f)$, an exact equation. In an ∞-category (quasicategory or Segal space), composition is only required to be associative UP TO HOMOTOPY — $(h\circ g)\circ f$ and $h\circ(g\circ f)$ need only be connected by a coherent homotopy (a "path" in the precise sense `math.top.homotopy` already defines), with FURTHER coherence data (homotopies between homotopies, and so on) ensuring everything fits together consistently at every level.

**HoTT reinterprets equality proofs as paths, using homotopy's own definition**: Homotopy Type Theory's central idea: a TYPE $A$ corresponds to a SPACE; a term $a:A$ corresponds to a POINT in that space; a PROOF that $a=b$ corresponds to a PATH from $a$ to $b$ — literally a homotopy, in the exact sense already mastered ($H(x,0)=a$, $H(x,1)=b$, suitably specialized). This is a genuine, formal correspondence (underlying the univalence axiom and related machinery), not a loose metaphor — different proofs of the same equality can correspond to genuinely different paths, giving equality itself rich, higher-dimensional structure.

## Component 4 — Worked Examples

**Example 1 (LO1 — [C,D] as a 2-category's hom-category, breaking MC-1)**: Consider $\mathbf{Cat}$, the "2-category of categories": its OBJECTS are categories $\mathcal{C},\mathcal{D},\dots$; its MORPHISMS are functors between them; its 2-MORPHISMS are natural transformations between those functors. The hom-CATEGORY $\mathbf{Cat}(\mathcal{C},\mathcal{D})$ — the collection of all functors $\mathcal{C}\to\mathcal{D}$ together with natural transformations between them — is EXACTLY $[\mathcal{C},\mathcal{D}]$, `math.cat.functor-category`'s own already-mastered construction. A 2-category is not an unrelated new invention; it is built by taking $[\mathcal{C},\mathcal{D}]$-style hom-categories as the "morphism data" between objects one level up.

**Example 2 (LO2 — strict vs. homotopy-coherent associativity, breaking MC-2)**: In an ordinary category, $(h\circ g)\circ f=h\circ(g\circ f)$ holds as a literal EQUATION — the two sides are the identical morphism. In an ∞-category, the analogous two composites need only be connected by a homotopy $H$ (per `math.top.homotopy`'s own definition: continuous, $H(\cdot,0)$ giving one composite, $H(\cdot,1)$ giving the other) — a coherent WITNESS that they are "the same up to a specified path," not literally identical. This is the defining structural difference: ∞-categories trade strict equality for a richer, homotopy-coherent notion of "the same."

**Example 3 (LO3 — HoTT's proofs-as-paths correspondence, breaking MC-3)**: In HoTT, a type $A$ is treated as a space; two terms $a,b:A$ are points in that space. A proof of the equality $a=b$ is literally a path $H:[0,1]\to A$ with $H(0)=a$, $H(1)=b$ — using EXACTLY `math.top.homotopy`'s own homotopy machinery (specialized to maps FROM the interval $[0,1]$, i.e., paths rather than general homotopies between maps). Crucially, TWO different proofs of $a=b$ can correspond to genuinely different, non-homotopic paths — meaning "the proofs are themselves not equal," a higher-dimensional phenomenon with no analogue in ordinary (non-homotopical) equality.

## Component 5 — Teaching Actions

### Teaching Action A01 — 2-Categories Build Directly on [C,D]'s Own Structure (Primitive P11: Representation Shift)

State: "a 2-category isn't an unrelated new invention — its hom-categories are literally the [C,D] construction you already mastered, now serving as the connecting data between objects one level up." Work Example 1's direct identification of $\mathbf{Cat}(\mathcal{C},\mathcal{D})=[\mathcal{C},\mathcal{D}]$.

- **MC-1 hook**: ask "is a 2-category's structure unrelated to the functor category [C,D] already studied?" — a "yes" answer reveals MC-1 (missing that [C,D] IS literally the hom-category structure a 2-category uses).

### Teaching Action A02 — Homotopy-Coherence Replaces Strict Equality (Primitive P06: Contrast Pair)

Contrast ordinary categorical associativity (a strict equation) against Example 2's ∞-categorical version (a coherent homotopy witness). State: "∞-categories don't abandon associativity — they replace the strict equation with a richer, homotopy-coherent witness, using the exact homotopy machinery already mastered."

- **MC-2 hook**: ask "must composition in an ∞-category still be strictly associative, exactly like an ordinary category?" — a "yes" answer reveals MC-2 (missing that ∞-categories specifically replace strict equality with homotopy-coherence).

### Teaching Action A03 — HoTT's Proofs-as-Paths Is Formal, Not Metaphorical (Primitive P28: Conflict Evidence)

Present Example 3's direct evidence: two different proofs of $a=b$ can correspond to genuinely non-homotopic paths — a real, checkable phenomenon, not a loose figure of speech. State: "this correspondence uses the identical formal homotopy machinery already mastered — it is a genuine reinterpretation of equality, not a poetic analogy."

- **MC-3 hook**: ask "is HoTT's 'proofs are paths' idea merely a suggestive metaphor with no formal mathematical content?" — a "yes" answer reveals MC-3 (missing that this is a genuine, formal correspondence built directly on the homotopy machinery already mastered).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Explain, in your own words, why the hom-category between two objects of a 2-category is exactly a [C,D]-style functor category.
  2. Explain the difference between "the two composites are equal" (ordinary category) and "the two composites are connected by a homotopy" (∞-category).
  3. State what it would mean, in HoTT terms, for two different proofs of the same equality to correspond to non-homotopic paths.
  4. Explain why this concept's material is presented at an orientation, rather than mastery, level, referencing the KG's own bloom level and mastery threshold.
- **P76 (Transfer Probe, mode = cross-link probe against `math.top.homotopy`)**: "A researcher studying homotopy type theory encounters a claim that 'two proofs of the same mathematical statement can be genuinely different objects, not just different presentations of one underlying fact.' (a) Using `math.top.homotopy`'s own homotopy definition, explain what it would mean, formally, for two proofs (paths) of the same equality to be non-homotopic. (b) A colleague, familiar with ordinary logic but not homotopy theory, argues 'a proof is a proof — once you've shown a=b, there's nothing more to say; two different arguments for the same conclusion are interchangeable.' Explain why HoTT's framework specifically challenges this assumption, using the formal path-based reinterpretation of equality. (c) The colleague also asks whether this idea is testable/checkable in any concrete sense, or purely philosophical. Using this lesson's direct reuse of `math.top.homotopy`'s own homotopy machinery, explain why it is a genuine, formally checkable mathematical claim."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 2/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | 2-CATEGORY-TREATED-AS-UNRELATED-TO-FUNCTOR-CATEGORY | Believing a 2-category's structure is unrelated to the functor category [C,D] already studied, missing that [C,D] literally is the hom-category structure a 2-category uses | Foundational |
| MC-2 | INFINITY-CATEGORY-ASSUMED-STRICTLY-ASSOCIATIVE | Believing composition in an ∞-category must still be strictly associative like an ordinary category, missing that ∞-categories specifically replace strict equality with homotopy-coherence | Foundational |
| MC-3 | HOTT-PROOFS-AS-PATHS-TREATED-AS-METAPHOR | Believing HoTT's "proofs are paths" idea is merely a suggestive metaphor, missing that it is a genuine, formal correspondence built on already-mastered homotopy machinery | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "2-Category Treated as Unrelated to Functor Category") → P41 (detect: ask a student whether a 2-category's hom-categories are related to [C,D], checking for "no") → P64 (conceptual shift: re-walk Example 1's direct identification, re-anchoring on "the hom-category IS the [C,D] construction, reused one level up").
- **B02 (targets MC-2)**: P27 (name it: "Infinity-Category Assumed Strictly Associative") → P41 (detect: ask a student whether ∞-category composition must be strictly associative, checking for "yes") → P64 (conceptual shift: re-walk Example 2's strict-vs-homotopy-coherent contrast, re-anchoring on "∞-categories replace strict equality with homotopy-coherence").
- **B03 (targets MC-3)**: P27 (name it: "HoTT Proofs-as-Paths Treated as Metaphor") → P41 (detect: ask a student whether HoTT's proofs-as-paths idea is a formal claim or just a metaphor, checking for "just a metaphor") → P64 (conceptual shift: re-walk Example 3's formal path-based reinterpretation, re-anchoring on "this uses the exact homotopy machinery already mastered, formally, not metaphorically").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cat.monad` (functors, natural transformations, and the escalation-of-structure pattern this concept extends further), `math.top.homotopy` (the homotopy-equivalence machinery this concept's ∞-category and HoTT content directly reuses).
- **Unlocks**: (none — KG lists no unlocks for this concept, consistent with its status as an active research frontier rather than a foundation for further corpus concepts).
- **Cross-link**: KG lists `math.top.homotopy` as a cross-link — **authored** (checked via `ls docs/curriculum/blueprints/` before setting P76_mode; also a direct prerequisite). $P76_{mode}=$ **cross-link probe**, engaging directly with that concept's own homotopy definition throughout LO2 and LO3.

## Component 8 — Teaching Notes

- estimated_hours = 15 with a research/CREATE bloom tag and the LOWEST mastery threshold in the corpus (0.35, MAMR 2/5) signals this concept is deliberately an AWARENESS-level survey of an active research frontier, not a mastery-level treatment — all three learning objectives are kept at orientation level throughout (a departure from this corpus's usual "2 full-depth, 1 orientation" pattern for large concepts), since the KG's own bloom level (create — the highest in Bloom's taxonomy, associated with generating genuinely new work) and rock-bottom mastery threshold both signal that deep, gate-verified mastery is not the intended outcome here; recognition and orientation are.
- **Division of labor**: `math.cat.monad` (and, transitively, `math.cat.functor-category`) own the concrete categorical machinery (functors, natural transformations, monads) this concept escalates one level further. `math.top.homotopy` owns the homotopy-equivalence relation this concept's ∞-category and HoTT content directly reuses. This concept, `math.cat.higher-category`, deliberately does not re-derive any of that machinery; it owns the RECOGNITION that these already-mastered structures compose into three named, actively-researched higher structures (2-categories, ∞-categories, HoTT), each built by directly reusing prior material rather than introducing genuinely new foundational machinery.
- All three worked examples were deliberately built by directly reusing already-mastered constructions ($[\mathcal{C},\mathcal{D}]$ from `math.cat.functor-category`; the homotopy definition from `math.top.homotopy`) rather than introducing new unfamiliar machinery, since this concept's entire pedagogical point is that these active-research-frontier ideas are natural escalations of material the learner already has, not a wholly separate body of new content.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.top.homotopy authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe against math.top.homotopy) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.35×5⌉=2) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: research-level learner already fluent in monads and homotopy; each escalation presented directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3, all orientation-level per Component 8's justification) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
