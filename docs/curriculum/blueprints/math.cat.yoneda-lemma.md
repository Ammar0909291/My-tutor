# Teaching Blueprint: Yoneda Lemma (`math.cat.yoneda-lemma`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cat.yoneda-lemma` |
| name | Yoneda Lemma |
| domain | Category Theory |
| difficulty | research |
| bloom | analyze |
| mastery_threshold | 0.65 → MAMR = ⌈0.65×5⌉ = 4/5 |
| estimated_hours | 7 |
| requires | `math.cat.functor-category` |
| unlocks | `math.cat.representable-functor` |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) — research-level learner already fluent in functor categories; the lemma is verified directly on one small concrete category |
| description (KG) | Nat(Hom(A,−), F) ≅ F(A) naturally in A and F. An object A is completely determined by the functor Hom(A,−) it represents. The Yoneda embedding C→[Cᵒᵖ,Set] is fully faithful — the deepest elementary result of category theory. |

## Component 1 — Learning Objectives

- LO1: State the Yoneda Lemma precisely — $\text{Nat}(\text{Hom}(A,-),F)\cong F(A)$, naturally in $A$ and $F$ — as a genuine, CONSTRUCTIVE bijection (every natural transformation from the representable functor $\text{Hom}(A,-)$ to $F$ corresponds to exactly one element of $F(A)$), not merely a formal or cardinality coincidence.
- LO2: Apply the bijection's concrete recipe — given $\eta:\text{Hom}(A,-)\Rightarrow F$, the corresponding element of $F(A)$ is obtained by evaluating $\eta_A$ at the IDENTITY morphism $\text{id}_A\in\text{Hom}(A,A)$, i.e. $\eta_A(\text{id}_A)\in F(A)$ — correctly identifying that the extraction must happen at object $A$ using $\text{id}_A$ specifically, not at an arbitrary object or morphism.
- LO3 *(orientation-level, given the research-level scope of this concept)*: Recognize the **Yoneda embedding** consequence — an object $A$ is determined, UP TO ISOMORPHISM, by the functor $\text{Hom}(A,-)$ it represents (via $\text{Nat}(\text{Hom}(A,-),\text{Hom}(B,-))\cong\text{Hom}(B,A)$) — correctly distinguishing "determined up to isomorphism by" from "literally equal to."

## Component 2 — Prerequisite Check

Assumes mastery of `math.cat.functor-category` (functors as objects, natural transformations as morphisms, pointwise composition and axiom verification).

## Component 3 — Core Explanation

**The bijection is a genuine, constructive correspondence, not a formal coincidence**: for a locally small category $\mathcal{C}$, object $A$, and functor $F:\mathcal{C}\to\mathbf{Set}$, the Yoneda Lemma asserts $\text{Nat}(\text{Hom}(A,-),F)\cong F(A)$ — every natural transformation $\eta:\text{Hom}(A,-)\Rightarrow F$ genuinely CORRESPONDS to exactly one element of $F(A)$, and conversely every element of $F(A)$ genuinely produces exactly one such natural transformation. This is an actual, checkable, two-way construction, not a mere existence statement about matching set sizes.

**The recipe: evaluate at $A$, using the identity**: given $\eta:\text{Hom}(A,-)\Rightarrow F$, the corresponding element of $F(A)$ is obtained SPECIFICALLY as $\eta_A(\text{id}_A)$ — evaluating the component of $\eta$ AT the object $A$ itself, applied to the IDENTITY morphism $\text{id}_A\in\text{Hom}(A,A)$. This specific choice (object $A$, morphism $\text{id}_A$) is what makes the recipe work; evaluating at a different object or a different morphism gives a DIFFERENT (though still meaningful) element, not the one the bijection describes.

**Objects are determined up to isomorphism by their representable functor, not literally identical to it**: setting $F=\text{Hom}(B,-)$ in the lemma gives $\text{Nat}(\text{Hom}(A,-),\text{Hom}(B,-))\cong\text{Hom}(B,A)$ — meaning a natural isomorphism $\text{Hom}(A,-)\cong\text{Hom}(B,-)$ forces $A\cong B$ as OBJECTS of $\mathcal{C}$. This is the Yoneda embedding's landmark consequence: $A$ is fully determined, UP TO ISOMORPHISM, by the functor it represents. But $A$ (an object of $\mathcal{C}$) and $\text{Hom}(A,-)$ (a functor from $\mathcal{C}$ to $\mathbf{Set}$) remain genuinely different KINDS of mathematical objects — the determination is mediated by an isomorphism, not a literal equality.

## Component 4 — Worked Examples

**Example 1 (LO1 — a genuine bijection verified concretely, breaking MC-1)**: Let $\mathcal{C}=\{X,Y\}$ with one non-identity arrow $f:X\to Y$ (the SAME small category used in `math.cat.functor-category`'s own Example 2). Let $A=X$, so $\text{Hom}(X,-)$ sends $X\mapsto\{\text{id}_X\}$, $Y\mapsto\{f\}$ (one element each). Let $F$ be any functor with $F(X)=S$, $F(Y)=T$, $F(f):S\to T$. For EVERY choice of $s\in S=F(X)$, define $\eta^{(s)}$ by $\eta^{(s)}_X(\text{id}_X)=s$ and $\eta^{(s)}_Y(f)=F(f)(s)$ — this genuinely satisfies naturality for $f$ (the naturality square commutes by construction), so $\eta^{(s)}$ is a bona fide natural transformation. Conversely, ANY natural transformation $\eta:\text{Hom}(X,-)\Rightarrow F$ must have $\eta_Y(f)=F(f)(\eta_X(\text{id}_X))$ (forced by naturality), so $\eta$ is entirely determined by the single value $\eta_X(\text{id}_X)\in S$. This is a genuine two-way correspondence between elements of $S=F(X)$ and natural transformations — not a coincidental matching of set sizes.

**Example 2 (LO2 — evaluate at A using the identity, not elsewhere, breaking MC-2)**: Using Example 1's setup, the CORRECT extraction of the element of $F(A)=F(X)=S$ corresponding to a given $\eta$ is $\eta_X(\text{id}_X)$. Contrast with the INCORRECT attempt of evaluating $\eta_Y(f)$ instead: this gives $F(f)(\eta_X(\text{id}_X))\in T=F(Y)$ — a perfectly valid element of $F(Y)$, but NOT the element of $F(A)=F(X)$ the Yoneda bijection actually describes; it is the wrong object ($Y$ instead of $A=X$) and (incidentally) also the wrong resulting set ($F(Y)$ instead of $F(A)$). Only evaluating specifically at $A$, using $\text{id}_A$, produces the bijection's intended correspondence.

**Example 3 (orientation-level — determined up to isomorphism, not literal identity, breaking MC-3)**: If $\text{Hom}(A,-)\cong\text{Hom}(B,-)$ (a natural isomorphism of functors), the Yoneda Lemma's embedding consequence forces $A\cong B$ — an isomorphism between the OBJECTS $A$ and $B$ in $\mathcal{C}$. This does NOT mean $A$ literally equals the functor $\text{Hom}(A,-)$ — $A$ is an object of $\mathcal{C}$, while $\text{Hom}(A,-)$ is an entirely different kind of entity, a FUNCTOR from $\mathcal{C}$ to $\mathbf{Set}$. The lemma shows $A$'s isomorphism class is fully DETERMINED by (recoverable from) which functor it represents — a determination mediated by isomorphism, never a claim that $A$ and $\text{Hom}(A,-)$ are the same object.

## Component 5 — Teaching Actions

### Teaching Action A01 — A Genuine Two-Way Construction, Not a Cardinality Coincidence (Primitive P28: Conflict Evidence)

Present Example 1's direct evidence: every $s\in F(X)$ genuinely produces a valid natural transformation $\eta^{(s)}$, and every natural transformation is genuinely forced (by naturality) to arise this way from exactly one $s$. State: "this correspondence is built explicitly in both directions — it isn't merely observed that two sets happen to have matching sizes."

- **MC-1 hook**: ask "is the Yoneda bijection $\text{Nat}(\text{Hom}(A,-),F)\cong F(A)$ simply an observation that both sides happen to have the same cardinality, without an actual explicit correspondence?" — a "yes" answer reveals MC-1 (missing the constructive, two-way nature of the correspondence).

### Teaching Action A02 — Evaluate at A, at the Identity — Not Elsewhere (Primitive P06: Contrast Pair)

Contrast Example 2's correct extraction ($\eta_X(\text{id}_X)$) against the incorrect attempt ($\eta_Y(f)$, landing in the wrong set entirely). State: "the recipe is specific: evaluate the component AT $A$, applied to $\text{id}_A$ — evaluating at a different object or morphism gives a different (and not the intended) result."

- **MC-2 hook**: ask "can the element of $F(A)$ corresponding to a natural transformation $\eta$ be extracted by evaluating any component at any morphism, not specifically at $A$ using $\text{id}_A$?" — a "yes" answer reveals MC-2 (missing the precise object/morphism the recipe requires).

### Teaching Action A03 — Determined Up to Isomorphism, Never Literally Identical (Primitive P11: Representation Shift)

State: "the Yoneda embedding says an object is fully RECOVERABLE from the functor it represents — but the object itself and that functor remain two genuinely different kinds of mathematical things, connected by an isomorphism, not an equation." Work Example 3's careful distinction.

- **MC-3 hook**: ask "does the Yoneda embedding's result mean an object A is literally the same thing as the functor Hom(A,-) it represents?" — a "yes" answer reveals MC-3 (conflating "determined up to isomorphism by" with "identical to").

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Using the 2-object category $\{X,Y\}$ with $f:X\to Y$ and a specific $F$ with $F(X)=\{1,2\}$, $F(Y)=\{a,b,c\}$, list the natural transformations $\text{Hom}(X,-)\Rightarrow F$ that correspond to each element of $F(X)$.
  2. Explain, in your own words, why evaluating $\eta_Y(f)$ instead of $\eta_X(\text{id}_X)$ gives an element of the wrong set.
  3. If $\text{Hom}(A,-)\cong\text{Hom}(B,-)$, state what this implies about $A$ and $B$, and explain why it is not a claim of literal identity.
  4. Explain why the specific choice of evaluating at the IDENTITY morphism (rather than some other endomorphism, if one existed) is essential to the recipe.
- **P76 (Transfer Probe, mode = independence)**: "A researcher studying a new category discovers two objects $P$ and $Q$ with $\text{Hom}(P,-)\cong\text{Hom}(Q,-)$ (naturally isomorphic representable functors). (a) Using the Yoneda embedding's consequence, state what this implies about the relationship between $P$ and $Q$ as objects of the category. (b) A colleague, given a specific natural transformation $\eta:\text{Hom}(P,-)\Rightarrow F$ for some functor $F$, wants to extract the corresponding element of $F(P)$, and proposes evaluating $\eta$ at whichever object makes the computation most convenient. Using this lesson's precise recipe, explain why this proposal is not generally valid. (c) The colleague also claims 'since $P$ is completely determined by $\text{Hom}(P,-)$, we can simply treat $P$ and $\text{Hom}(P,-)$ as the same object going forward, to simplify notation.' Explain specifically why this claim overstates what the Yoneda Lemma actually establishes."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | YONEDA-BIJECTION-AS-CARDINALITY-COINCIDENCE | Believing the Yoneda bijection is merely an observation of matching set sizes, missing its genuine, explicit, two-way constructive correspondence | Foundational |
| MC-2 | EXTRACTION-RECIPE-EVALUATED-AT-WRONG-OBJECT | Believing the element of F(A) corresponding to a natural transformation can be extracted by evaluating any component at any morphism, missing the precise requirement to evaluate at A using the identity | Foundational |
| MC-3 | DETERMINATION-CONFLATED-WITH-LITERAL-IDENTITY | Believing the Yoneda embedding's "A is determined by Hom(A,-)" means A is literally the same object as the functor Hom(A,-), missing that the determination is up to isomorphism, mediated by a correspondence between different kinds of objects | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Yoneda Bijection as Cardinality Coincidence") → P41 (detect: ask a student whether the bijection is just an observed matching of sizes, checking for "yes") → P64 (conceptual shift: re-walk Example 1's explicit two-way construction, re-anchoring on "every element genuinely produces a transformation, and every transformation is genuinely forced back to one element").
- **B02 (targets MC-2)**: P27 (name it: "Extraction Recipe Evaluated at Wrong Object") → P41 (detect: ask a student to extract the corresponding element of $F(A)$ from $\eta$, checking whether they evaluate at an object other than $A$) → P64 (conceptual shift: re-walk Example 2's contrast between the correct $\eta_X(\text{id}_X)$ and the incorrect $\eta_Y(f)$, re-anchoring on "evaluate specifically at $A$, using $\text{id}_A$").
- **B03 (targets MC-3)**: P27 (name it: "Determination Conflated with Literal Identity") → P41 (detect: ask a student whether $A$ and $\text{Hom}(A,-)$ are literally the same object, checking for "yes") → P64 (conceptual shift: re-walk Example 3's isomorphism-vs-identity distinction, re-anchoring on "determined up to isomorphism, never literally identical").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cat.functor-category` (functors as objects, natural transformations as morphisms — the exact structures the lemma's $\text{Nat}(-,-)$ and $F(A)$ operate on).
- **Unlocks**: `math.cat.representable-functor` (deepens the study of representable functors $\text{Hom}(A,-)$ this lemma directly characterizes).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 7 with a research/analyze tag places this among the corpus's largest concepts; per established precedent for capstone-scale concepts, LO1 and LO2 receive full concrete worked-example depth while LO3 (the Yoneda embedding/full-faithfulness consequence) is deliberately kept at ORIENTATION level — stating the determination-up-to-isomorphism landmark result without deriving full faithfulness of the embedding in exhaustive generality.
- **Division of labor**: `math.cat.functor-category` owns functors-as-objects, natural-transformations-as-morphisms, and pointwise composition/axiom verification. This concept, `math.cat.yoneda-lemma`, deliberately does not re-teach any of that; it owns the SPECIFIC bijection between natural transformations out of a representable functor and elements of the target functor's value, plus the embedding consequence this bijection implies.
- Example 1 deliberately reuses `math.cat.functor-category`'s own small 2-object category (rather than a new one) specifically so the Yoneda bijection could be verified on an already-familiar, fully concrete instance, keeping the abstraction load focused on the lemma's genuinely new content rather than re-introducing unfamiliar category machinery.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (no cross_links listed → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.65×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: research-level learner already fluent in functor categories; verified directly on one concrete category) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3 orientation-level) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
