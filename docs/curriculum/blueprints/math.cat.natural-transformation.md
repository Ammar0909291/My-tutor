# Teaching Blueprint: Natural Transformation (`math.cat.natural-transformation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cat.natural-transformation` |
| name | Natural Transformation |
| domain | Category Theory |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.cat.functor` |
| unlocks | `math.cat.adjunction`, `math.cat.limits` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — direct definition, grounded immediately in a concrete pair of functors already available (identity vs. double-dual, or forgetful-related) |
| description (KG) | A natural transformation η:F⟹G between functors F,G:C→D assigns to each object X a morphism η_X:F(X)→G(X) such that for all f:X→Y, η_Y∘F(f)=G(f)∘η_X (naturality). The 'right notion of morphism' between functors. |

## Component 1 — Learning Objectives

- LO1: Define a **natural transformation** $\eta: F\Rightarrow G$ between two functors $F,G:\mathcal{C}\to\mathcal{D}$ as an assignment, to each object $X\in\mathcal{C}$, of a morphism $\eta_X: F(X)\to G(X)$ in $\mathcal{D}$ (called the **component** at $X$).
- LO2: State and verify the **naturality condition** — for every morphism $f:X\to Y$ in $\mathcal{C}$, the "naturality square" commutes: $\eta_Y\circ F(f) = G(f)\circ\eta_X$ — by checking both paths around the square agree for a specific example.
- LO3: Explain why natural transformations are called the **"right notion of morphism" between functors** — an arbitrary family of component morphisms $\eta_X$ (one per object, with no further constraint) is NOT automatically a natural transformation; only families satisfying the naturality condition for EVERY morphism $f$ qualify.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cat.functor` (functors as structure-preserving maps between categories, preserving composition and identity).

## Component 3 — Core Explanation

Given two functors $F,G:\mathcal{C}\to\mathcal{D}$ (same source and target categories), a **natural transformation** $\eta:F\Rightarrow G$ assigns to each object $X\in\mathcal{C}$ a morphism $\eta_X:F(X)\to G(X)$ in $\mathcal{D}$ — called the **component of $\eta$ at $X$**.

**The naturality condition**: this family of components $\{\eta_X\}$ must satisfy, for **every** morphism $f:X\to Y$ in $\mathcal{C}$:
$$\eta_Y\circ F(f) = G(f)\circ \eta_X$$
Pictured as a square with $F(X)\to F(Y)$ on top (via $F(f)$), $G(X)\to G(Y)$ on the bottom (via $G(f)$), and $\eta_X, \eta_Y$ as the two vertical sides — this square must **commute**: both paths from $F(X)$ to $G(Y)$ (go right-then-down, or down-then-right) must give the same composite morphism.

**Why this is the "right" notion of morphism between functors**: it is tempting to think "any collection of morphisms $\eta_X:F(X)\to G(X)$, one for each object, is already a reasonable way to compare $F$ and $G$." But without the naturality condition, such an arbitrary family completely ignores how $F$ and $G$ act on morphisms — it could behave wildly differently at different objects with no coherent relationship. The naturality condition is precisely what forces the components to "cohere" with the functors' morphism-actions, making $\eta$ genuinely compare $F$ and $G$ as *whole structures*, not just as isolated per-object data.

## Component 4 — Worked Examples

**Example 1 (LO1/LO2 — verifying naturality concretely)**: Let $\mathcal{C}=\mathcal{D}=\mathbf{Vect}_k$ (finite-dimensional), $F=\mathrm{id}$ (the identity functor), $G = (-)^{**}$ (the double-dual functor, sending $V\mapsto V^{**}$). The natural transformation $\eta:\mathrm{id}\Rightarrow(-)^{**}$ has components $\eta_V:V\to V^{**}$ defined by $\eta_V(v)(\phi) = \phi(v)$ for $v\in V,\phi\in V^*$ (evaluate a functional at $v$). Check naturality for a linear map $f:V\to W$: the condition requires $\eta_W\circ F(f) = G(f)\circ\eta_V$, i.e. $\eta_W\circ f = f^{**}\circ\eta_V$ (using $F(f)=f$ since $F$ is the identity functor, and $G(f)=f^{**}$, the double-dual of $f$). Tracing an element $v\in V$ through both paths and confirming they agree (a standard linear-algebra verification) is exactly what establishes $\eta$ as a genuine natural transformation, not merely a collection of individually-defined maps.

**Example 2 (LO3 — a non-natural family, breaking MC-1)**: Suppose someone defines, for each finite-dimensional vector space $V$, an isomorphism $\theta_V:V\to V^*$ by picking an arbitrary basis of $V$ and matching basis vectors to dual basis vectors. This gives a perfectly well-defined family $\{\theta_V\}$, one isomorphism per object. But this family is **not natural**: it depends on an arbitrary CHOICE of basis for each $V$ separately, with no consistent rule relating the choices across different spaces — checking the naturality square for a specific linear map $f:V\to W$ (with $\theta_W\circ f$ compared to $f^*{}^{-1}\circ\theta_V$, roughly) generally **fails** to commute, because nothing forces the basis choices to be compatible with $f$'s action. This demonstrates concretely that an arbitrary family of per-object isomorphisms is not automatically a natural transformation.

**Example 3 (LO2 — the naturality square as a concrete diagram check)**: For the natural transformation from Example 1 restricted to a specific map $f:\mathbb{R}^2\to\mathbb{R}^2$ (say, a specific linear map given by a matrix), explicitly compute both $\eta_{\mathbb{R}^2}\circ f$ (apply $f$ first, then evaluate) and $f^{**}\circ\eta_{\mathbb{R}^2}$ (evaluate first, then apply the double-dual map) on a sample vector, confirming they produce identical results — a concrete numerical instance of the abstract naturality-square commutativity.

## Component 5 — Teaching Actions

### Teaching Action A01 — Components and the Naturality Square (Primitive P11: Representation Shift)

Recall functors from `math.cat.functor`. State: "if you have two different functors $F,G$ going between the same two categories, how do you compare them AS FUNCTORS, not just object by object?" Introduce the component maps $\eta_X:F(X)\to G(X)$ — "one comparison morphism per object." Shift representation to the naturality-square PICTURE: draw the square with $F(X),F(Y)$ on top, $G(X),G(Y)$ on bottom, $F(f)$ and $G(f)$ as the horizontal arrows, $\eta_X,\eta_Y$ as the vertical arrows. State: "naturality means this square commutes — going across-then-down equals going down-then-across, for EVERY morphism $f$ in the source category, not just some."

Work Example 3's explicit numerical verification, tracing both paths concretely on a specific vector.

- **MC-1 hook**: present Example 2's basis-dependent family $\{\theta_V\}$ and ask "is this a natural transformation?" — an answer of "yes, since it's a valid isomorphism at every object" reveals MC-1 (believing any per-object family of morphisms automatically qualifies as a natural transformation, without checking the naturality square).

### Teaching Action A02 — Natural vs. Non-Natural Families (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Place Example 1's genuinely natural $\eta:\mathrm{id}\Rightarrow(-)^{**}$ (whose components are defined by a UNIFORM formula, $\eta_V(v)(\phi)=\phi(v)$, requiring no arbitrary choice) directly beside Example 2's basis-dependent $\{\theta_V\}$ (which requires an arbitrary, uncoordinated choice at each object). State the diagnostic rule: "if defining your per-object morphism requires making an arbitrary choice (like picking a basis) that isn't itself forced by some functorial structure, be suspicious — genuine natural transformations typically arise from a UNIFORM formula or construction that doesn't need such choices."

**Contrast 2**: Revisit the naturality-square check explicitly for BOTH examples — show $\eta$'s square commutes (Example 1/3) while $\theta$'s square generically fails to commute (Example 2) when checked against a specific non-trivial linear map. This grounds the abstract "not natural" claim in an actual failed computation, not just an appeal to "arbitrary choice sounds suspicious."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State the naturality condition precisely for a transformation $\eta:F\Rightarrow G$ between functors $F,G:\mathcal{C}\to\mathcal{D}$, for a morphism $f:X\to Y$ in $\mathcal{C}$.
  2. For the identity-to-double-dual natural transformation (Example 1), explain in your own words why the formula $\eta_V(v)(\phi)=\phi(v)$ requires no arbitrary choice, unlike Example 2's basis-dependent family.
  3. Draw (describe in words) the naturality square for a transformation $\eta:F\Rightarrow G$ and a morphism $f:X\to Y$, labeling all four objects/morphisms involved.
  4. Given a family of component morphisms that you're told satisfies naturality for SOME specific morphisms but you haven't checked all of them, explain why you cannot yet conclude it's a genuine natural transformation.
- **P76 (Transfer Probe, mode = independence)**: "A data-processing pipeline has two functors $F,G:\mathbf{Set}\to\mathbf{Set}$: $F$ sends each set $X$ to $X\times X$ (all ordered pairs), and $G$ sends each set $X$ to the set of unordered pairs (2-element subsets) of $X$, roughly $\{X, \text{choose 2}\}$. Define a candidate transformation $\eta_X: X\times X \to G(X)$ by $\eta_X(a,b) = \{a,b\}$ (forgetting order) whenever $a\neq b$, with some convention for $a=b$. (a) Explain what the naturality condition would require of this family for a function $f:X\to Y$ between sets. (b) Argue informally why this particular $\eta$ — defined by a single uniform rule with no arbitrary per-set choices — is a strong CANDIDATE to actually be natural, contrasting it with this lesson's basis-dependent non-example."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ANY-COMPONENT-FAMILY-ASSUMED-NATURAL | Believing any family of per-object morphisms $\eta_X:F(X)\to G(X)$ automatically qualifies as a natural transformation, without checking the naturality square | Foundational |
| MC-2 | NATURALITY-CHECKED-FOR-SOME-MORPHISMS-ONLY | Believing verifying the naturality square for a few sample morphisms is sufficient to conclude the whole family is natural, rather than requiring it to hold for EVERY morphism in the source category | Moderate |
| MC-3 | NATURALITY-SQUARE-DIRECTION-CONFUSED | Confusing the two paths around the naturality square (e.g. writing $F(f)\circ\eta_Y$ instead of $\eta_Y\circ F(f)$, mismatching which functor's morphism-image composes with which component) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Any-Family-Natural Assumption") → P41 (detect: present the basis-dependent family from Example 2 and ask if it's natural) → P64 (conceptual shift: work through the naturality-square check explicitly for a specific morphism, showing the square fails to commute).
- **B02 (targets MC-2)**: P27 (name it: "Partial Naturality Verification") → P41 (detect: ask whether checking naturality for one or two sample morphisms is enough to conclude a transformation is natural) → P64 (conceptual shift: re-anchor on the universal quantifier in the definition — "for ALL $f$," not "for some $f$" — a family could satisfy the square for special morphisms while failing for others).
- **B03 (targets MC-3)**: P27 (name it: "Naturality Square Direction Confusion") → P41 (detect: ask a student to write the naturality equation and check whether $\eta_Y\circ F(f)$ vs. $G(f)\circ\eta_X$ are correctly matched, not swapped) → P64 (conceptual shift: re-derive by carefully tracing the picture — start at $F(X)$, go right to $F(Y)$ then down to $G(Y)$ [that's $\eta_Y\circ F(f)$], versus down to $G(X)$ then right to $G(Y)$ [that's $G(f)\circ\eta_X$] — both must land at $G(Y)$ and agree).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cat.functor` (the two functors $F,G$ this concept's transformation relates, and their morphism-preservation structure that the naturality condition must cohere with).
- **Unlocks**: `math.cat.adjunction` (adjunctions are defined via natural transformations, specifically the unit and counit), `math.cat.limits` (limits are defined via universal cones, themselves formalized using natural transformations between diagram-indexing functors).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/apply tag places this at the "2 main TAs + gate" tier — A01 (components and the naturality square) and A02 (natural vs. non-natural families contrast) jointly cover all three LOs, consistent with this domain's established sizing.
- The identity-to-double-dual natural transformation (Example 1) was deliberately chosen as this concept's primary example over a simpler but less illustrative option, specifically because it is one of the most commonly cited "canonical" natural transformations in category theory pedagogy and directly reuses `math.linalg.linear-map`'s vector-space vocabulary already established in this authoring pass, while the basis-dependent double-dual ISOMORPHISM (not the map $\eta$ itself, but an alternative comparison one might construct) is the single most standard counterexample used to teach exactly the "arbitrary choice breaks naturality" lesson this blueprint targets.
- MC-1 (any-component-family-assumed-natural) is this concept's single most important misconception, mirroring the general pattern (also seen in `math.cat.category`'s own MC-1) where a category-theoretic concept's defining CONSTRAINT is exactly what students are most likely to skip when a "looks right" family of maps is presented.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.cat.functor`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract, grounded directly in the double-dual example) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
