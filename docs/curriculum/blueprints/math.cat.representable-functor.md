# Teaching Blueprint: Representable Functor (`math.cat.representable-functor`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cat.representable-functor` |
| name | Representable Functor |
| domain | Category Theory |
| difficulty | research |
| bloom | analyze |
| mastery_threshold | 0.6 → MAMR = ⌈0.6×5⌉ = 3/5 |
| estimated_hours | 5 |
| requires | `math.cat.yoneda-lemma` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — direct definition, grounded immediately in the already-taught Yoneda embedding and the Hom-functor |
| description (KG) | F:C→Set is representable iff F≅Hom(A,−) for some object A (the representing object). The universal element is the element u∈F(A) corresponding to id_A. Representability captures universal properties. |

## Component 1 — Learning Objectives

- LO1: Define a functor $F:\mathcal{C}\to\mathbf{Set}$ as **representable** if there exists an object $A\in\mathcal{C}$ (the **representing object**) and a natural isomorphism $F\cong\mathrm{Hom}(A,-)$, and correctly distinguish "representable" (isomorphic to SOME Hom-functor) from merely "related to a Hom-functor" or "computable."
- LO2: Given a representable functor $F\cong\mathrm{Hom}(A,-)$ with the isomorphism $\eta$, identify the **universal element** $u\in F(A)$ as $\eta_A(\mathrm{id}_A)$ (the element corresponding to the identity morphism under the isomorphism at component $A$), and correctly compute $u$ for a specific representable functor.
- LO3: Explain why representability **captures universal properties** — recognizing that a universal-property-defined construction (e.g. a product, a free object) corresponds exactly to a representable functor, with the universal element being precisely the abstract "universal instance" the construction's defining property refers to.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cat.yoneda-lemma` (the Yoneda lemma itself: natural transformations $\mathrm{Hom}(A,-)\Rightarrow F$ correspond bijectively to elements of $F(A)$, via $\eta\mapsto\eta_A(\mathrm{id}_A)$) — representability is precisely the special case where this correspondence is not just a bijection of Hom-sets but a genuine natural ISOMORPHISM of functors.

## Component 3 — Core Explanation

A functor $F:\mathcal{C}\to\mathbf{Set}$ is **representable** if there is some object $A\in\mathcal{C}$ and a **natural isomorphism** $\eta:\mathrm{Hom}(A,-)\xRightarrow{\sim}F$ — i.e., $F$ is (up to natural isomorphism) literally the Hom-functor out of $A$. $A$ is called the **representing object**.

**Connecting to Yoneda**: the Yoneda lemma (already established) says natural transformations $\mathrm{Hom}(A,-)\Rightarrow F$ correspond bijectively to elements of $F(A)$. Representability asks for MORE: not just some natural transformation, but a natural ISOMORPHISM — the strongest possible instance of the Yoneda correspondence, where the corresponding element of $F(A)$ generates a bijection $\mathrm{Hom}(A,X)\cong F(X)$ at EVERY object $X$, naturally in $X$.

**The universal element**: given the natural isomorphism $\eta:\mathrm{Hom}(A,-)\xRightarrow{\sim}F$, the **universal element** is $u=\eta_A(\mathrm{id}_A)\in F(A)$ — applying the Yoneda correspondence to the identity morphism specifically. This single element $u$ carries all the information of the isomorphism: for any $X$ and any $x\in F(X)$, the (unique, by the isomorphism) morphism $f:A\to X$ with $F(f)(u)=x$ recovers exactly the correspondence $\eta_X^{-1}(x)=f$.

**Representability captures universal properties**: a "universal property" definition — e.g. "$A\times B$ is the object such that maps INTO it from any $C$ correspond to PAIRS of maps into $A$ and $B$" — is precisely the statement that the functor $X\mapsto\mathrm{Hom}(X,A)\times\mathrm{Hom}(X,B)$ is representable, represented by $A\times B$ itself, with universal element the pair of projections $(\pi_A,\pi_B)$. Every "the object satisfying universal property P" construction in category theory (products, limits generally, free objects, etc.) is, when it exists, exactly a representable functor together with its universal element — representability is the single unifying formal notion underlying the informal phrase "universal property."

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying representability directly, breaking MC-1)**: In $\mathbf{Grp}$ (groups), consider the forgetful functor $U:\mathbf{Grp}\to\mathbf{Set}$ (sending a group to its underlying set). Claim: $U$ is represented by $\mathbb{Z}$ (the free group on one generator, viewed as an ordinary group), i.e. $U\cong\mathrm{Hom}_{\mathbf{Grp}}(\mathbb{Z},-)$. Verify at one object: for a group $G$, a group homomorphism $\mathbb{Z}\to G$ is completely determined by where it sends the generator $1\in\mathbb{Z}$ — and this can be ANY element of $G$ (since $\mathbb{Z}$ is free), giving a genuine bijection $\mathrm{Hom}_{\mathbf{Grp}}(\mathbb{Z},G)\cong G=U(G)$, naturally in $G$ (composing with a group homomorphism $G\to H$ on either side corresponds correctly). This is representability actually verified via a bijection at each object plus naturality — NOT merely "the functor takes values that remind us of $G$'s elements."

**Example 2 (LO2 — identifying the universal element)**: Continuing Example 1: the universal element is $u=\eta_{\mathbb{Z}}(\mathrm{id}_{\mathbb{Z}})\in U(\mathbb{Z})=\mathbb{Z}$ — applying the correspondence to $\mathrm{id}_{\mathbb{Z}}:\mathbb{Z}\to\mathbb{Z}$ gives the underlying element $1\in\mathbb{Z}$ (the generator itself). This single element, $1$, is genuinely universal: for ANY group $G$ and any element $g\in G$, there is a UNIQUE homomorphism $\mathbb{Z}\to G$ sending $1\mapsto g$ — recovering the whole natural isomorphism from this one universal element, exactly as the general theory predicts.

**Example 3 (LO3 — a universal-property construction recognized as representability, in $\mathbf{Set}$)**: The product $A\times B$ in $\mathbf{Set}$ satisfies: $\mathrm{Hom}(X,A\times B)\cong\mathrm{Hom}(X,A)\times\mathrm{Hom}(X,B)$, naturally in $X$ (a map into the product IS a pair of maps into each factor — the product's defining universal property). This says exactly: the functor $F(X)=\mathrm{Hom}(X,A)\times\mathrm{Hom}(X,B)$ is representable, represented by $A\times B$. The universal element is $u=(\pi_A,\pi_B)\in F(A\times B)$ — the pair of projection maps — matching the informal statement "the product comes with two canonical projections" with the formal universal element of a representable functor.

## Component 5 — Teaching Actions

### Teaching Action A01 — Representability as Yoneda's Strongest Case (Primitive P11: Representation Shift)

State: "you already know Yoneda gives a bijection between natural transformations $\mathrm{Hom}(A,-)\Rightarrow F$ and elements of $F(A)$ — representability is what happens when one specific such transformation is a full natural ISOMORPHISM, not merely a transformation." Work Example 1's direct bijection verification at one object, emphasizing that naturality (not just a single bijection) is required.

- **MC-1 hook**: ask "does 'the values of $F$ look like they could come from Hom-sets' count as representability?" — an answer of "yes, close enough" reveals MC-1 (treating representability as a loose resemblance rather than a genuine natural isomorphism requiring verification at every object and naturally).

### Teaching Action A02 — The Universal Element, and Universal Properties as Representability (Primitive P37: Classify)

Work Example 2's extraction of the universal element $u=1\in\mathbb{Z}$ directly from the identity morphism, then work Example 3's product-as-representable-functor identification, connecting the informal "universal property" language every student already knows (from products, free objects, etc.) to the formal representability framework.

- **MC-2 hook**: ask "is the universal element JUST any convenient element of $F(A)$, or does it play a special formal role?" — an answer of "any convenient element" reveals MC-2 (missing that $u=\eta_A(\mathrm{id}_A)$ is a SPECIFIC, uniquely-determined element that fully reconstructs the entire natural isomorphism).

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify that the forgetful functor $U:\mathbf{Mon}\to\mathbf{Set}$ (monoids to sets) is represented by the free monoid on one generator $(\mathbb{N},+)$, by describing the correspondence $\mathrm{Hom}_{\mathbf{Mon}}(\mathbb{N},M)\cong M$.
  2. Identify the universal element for the representable functor in problem 1.
  3. Explain, using Example 3's argument, why a coproduct $A\sqcup B$'s universal property corresponds to the representability of the functor $X\mapsto\mathrm{Hom}(A,X)\times\mathrm{Hom}(B,X)$ (note: contravariant direction — maps OUT of $A,B$ INTO $X$).
  4. Explain why "a functor's values look set-like" is not sufficient to establish representability, using this lesson's naturality requirement.
- **P76 (Transfer Probe, mode = independence)**: "In linear algebra, the dual space functor $V\mapsto V^*=\mathrm{Hom}(V,\mathbb{F})$ (for a fixed field $\mathbb{F}$, viewed as vectors spaces over $\mathbb{F}$, contravariant in $V$) is itself already literally a Hom-functor by construction. (a) Using this lesson's definition, explain why the (contravariant) functor $V\mapsto V^*$ is trivially representable — represented by $\mathbb{F}$ itself, viewed as a one-dimensional vector space. (b) Identify what the universal element would be for this representable functor, using this lesson's $u=\eta_A(\mathrm{id}_A)$ formula, applied at $A=\mathbb{F}$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 3/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | REPRESENTABILITY-TREATED-AS-LOOSE-RESEMBLANCE | Believing a functor is representable if its values merely "resemble" or "relate to" Hom-sets, rather than requiring a genuine natural isomorphism verified at every object | Foundational |
| MC-2 | UNIVERSAL-ELEMENT-TREATED-AS-ARBITRARY | Believing the universal element is any convenient element of $F(A)$, rather than the SPECIFIC element $\eta_A(\mathrm{id}_A)$ that alone reconstructs the entire natural isomorphism | Foundational |
| MC-3 | REPRESENTING-OBJECT-ASSUMED-UNIQUE-WITHOUT-QUALIFICATION | Believing the representing object $A$ is the unique object with this property in an absolute sense, without the standard qualification "unique up to isomorphism" | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Representability Treated as Loose Resemblance") → P41 (detect: ask whether "the functor's outputs are always sets that look similar in size to some Hom-set" is enough to claim representability) → P64 (conceptual shift: re-walk Example 1's genuine bijection-plus-naturality verification).
- **B02 (targets MC-2)**: P27 (name it: "Universal Element Treated as Arbitrary") → P41 (detect: ask a student to pick "any element" of $U(\mathbb{Z})=\mathbb{Z}$ as the universal element, rather than specifically $1$) → P64 (conceptual shift: re-derive $u=\eta_{\mathbb{Z}}(\mathrm{id}_{\mathbb{Z}})$ from Example 2, showing why only this specific element reconstructs the correspondence).
- **B03 (targets MC-3)**: P27 (name it: "Representing Object Assumed Unique Without Qualification") → P41 (detect: ask whether a group isomorphic to but not literally equal to $\mathbb{Z}$ could also represent $U:\mathbf{Grp}\to\mathbf{Set}$) → P64 (conceptual shift: state explicitly that representing objects are unique up to a UNIQUE isomorphism, a standard categorical uniqueness caveat already familiar from `math.cat.limits`'s own universal-cone uniqueness).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cat.yoneda-lemma` (the general correspondence between natural transformations $\mathrm{Hom}(A,-)\Rightarrow F$ and elements of $F(A)$ — representability is the special case where this correspondence is a full isomorphism).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists no cross-links for this concept. (KG `related` field lists `math.cat.adjunction`, confirmed authored via `ls`, but `related` is not a `cross_links` entry and per this corpus's convention only `cross_links` entries require the P76_mode disk-check protocol — noted here for completeness, not treated as a formal cross-link.)

## Component 8 — Teaching Notes

- estimated_hours = 5 with a research/analyze tag and mastery_threshold = 0.6 (MAMR 3/5) places this at the "2 main TAs + gate" tier — A01 (representability as Yoneda's strongest case) and A02 (universal element extraction, plus universal-property-as-representability) jointly cover all three LOs, deliberately building directly on top of `math.cat.yoneda-lemma`'s already-established correspondence rather than re-deriving it.
- The forgetful-functor-represented-by-$\mathbb{Z}$ example (Examples 1-2) was chosen specifically because it is the single cleanest, most concrete instance of a genuinely useful representability fact in ordinary algebra (free objects always represent forgetful functors) — giving abstract research-tier content an immediately checkable, non-exotic anchor.
- The dual-space transfer probe was chosen because $V\mapsto V^*$ being "trivially" representable (it is LITERALLY defined as a Hom-functor) gives students a clarifying edge case: representability sometimes requires real verification work (Examples 1-3), and sometimes holds by the very way a functor was defined in the first place — both are legitimate instances of the same formal concept.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.cat.yoneda-lemma`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.6×5⌉=3) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract, grounded directly in the Yoneda correspondence) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
