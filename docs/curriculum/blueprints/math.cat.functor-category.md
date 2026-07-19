# Teaching Blueprint: Functor Category (`math.cat.functor-category`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cat.functor-category` |
| name | Functor Category |
| domain | Category Theory |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.cat.natural-transformation` |
| unlocks | `math.cat.yoneda-lemma` |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) — expert learner already fluent in natural transformations; the functor category is introduced directly by naming the already-mastered pieces as objects/morphisms |
| description (KG) | The functor category [C,D] (also written D^C) has functors F:C→D as objects and natural transformations as morphisms. Composition is pointwise. Allows treating functors as objects in a category — foundation of higher category theory. |

## Component 1 — Learning Objectives

- LO1: Define the **functor category** $[\mathcal{C},\mathcal{D}]$ (also $\mathcal{D}^{\mathcal{C}}$) — OBJECTS are functors $F:\mathcal{C}\to\mathcal{D}$, MORPHISMS are natural transformations $\eta:F\Rightarrow G$ — correctly distinguishing which already-mastered pieces play which role, since both are unfamiliar higher-order objects easily confused.
- LO2: Verify that composition in $[\mathcal{C},\mathcal{D}]$ is **pointwise**: for $\theta:F\Rightarrow G$ and $\eta:G\Rightarrow H$, the composite $\eta\circ\theta:F\Rightarrow H$ has components $(\eta\circ\theta)_X=\eta_X\circ\theta_X$ at each object $X$ — computed one component at a time, never as a single opaque operation on the whole transformation.
- LO3 *(orientation-level, given the foundational scope of this concept)*: Recognize that $[\mathcal{C},\mathcal{D}]$ genuinely satisfies the category axioms (identity via $\text{id}_F$, associativity), each inherited POINTWISE from $\mathcal{D}$'s own axioms rather than requiring a new proof — and that this "categories as objects" move is the foundation enabling higher category theory.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cat.natural-transformation` ($\eta:F\Rightarrow G$ assigns to each object $X$ a component morphism $\eta_X:F(X)\to G(X)$ satisfying naturality; not every family of component morphisms qualifies).

## Component 3 — Core Explanation

**Functors become objects; natural transformations become morphisms**: $[\mathcal{C},\mathcal{D}]$ treats each functor $F:\mathcal{C}\to\mathcal{D}$ as a single OBJECT of a new category, and each natural transformation $\eta:F\Rightarrow G$ (between two such functors) as a single MORPHISM from object $F$ to object $G$ in that new category. This is a genuine level-shift: entities that were themselves structure-preserving MAPS (functors) between categories now become the POINTS (objects) of yet another category, with the already-mastered natural transformations serving as the arrows connecting them.

**Composition is pointwise, built from $\mathcal{D}$'s own composition, one component at a time**: given $\theta:F\Rightarrow G$ and $\eta:G\Rightarrow H$ in $[\mathcal{C},\mathcal{D}]$, their composite $\eta\circ\theta:F\Rightarrow H$ is defined by specifying its component at EACH object $X\in\mathcal{C}$ individually: $(\eta\circ\theta)_X=\eta_X\circ\theta_X$ — an ordinary composition of two morphisms in $\mathcal{D}$ ($\theta_X:F(X)\to G(X)$ followed by $\eta_X:G(X)\to H(X)$). The composite transformation is built up object-by-object; there is no single, whole-transformation operation that bypasses this component-wise construction.

**The category axioms are inherited pointwise, not proven anew**: $[\mathcal{C},\mathcal{D}]$'s identity morphism at $F$ is $\text{id}_F$, whose components are all identity morphisms $\text{id}_{F(X)}$ in $\mathcal{D}$; associativity of composition in $[\mathcal{C},\mathcal{D}]$ follows directly, component-by-component, from associativity of composition already holding IN $\mathcal{D}$ — no new proof technique is required, only the observation that checking an equation of natural transformations reduces to checking it at every component, where it is simply $\mathcal{D}$'s own associativity. This "categories built from functors and natural transformations" construction is exactly what makes HIGHER category theory possible: treating one level's morphisms as the next level's objects.

## Component 4 — Worked Examples

**Example 1 (LO1 — functors are objects, natural transformations are morphisms, not the reverse, breaking MC-1)**: For functors $F,G:\mathcal{C}\to\mathcal{D}$ and a natural transformation $\eta:F\Rightarrow G$ between them: in $[\mathcal{C},\mathcal{D}]$, $F$ and $G$ are each OBJECTS (on equal footing, both "points" of the new category), and $\eta$ (the whole family of components $\eta_X$, one per object of $\mathcal{C}$) is the single MORPHISM connecting object $F$ to object $G$. Is $G$ itself a "morphism" from $F$ to $G$ in $[\mathcal{C},\mathcal{D}]$? NO — $G$ is an OBJECT, exactly like $F$; only $\eta$ (the natural transformation) plays the role of a morphism here.

**Example 2 (LO2 — pointwise composition, verified on a 2-object category, breaking MC-2)**: Let $\mathcal{C}=\{X,Y\}$ with one non-identity arrow $f:X\to Y$, and functors $F,G,H:\mathcal{C}\to\mathcal{D}$ with natural transformations $\theta:F\Rightarrow G$, $\eta:G\Rightarrow H$. The composite $\eta\circ\theta:F\Rightarrow H$ has TWO components, each built individually: $(\eta\circ\theta)_X=\eta_X\circ\theta_X$ (composing morphisms $F(X)\to G(X)\to H(X)$ in $\mathcal{D}$) and, separately, $(\eta\circ\theta)_Y=\eta_Y\circ\theta_Y$ (composing $F(Y)\to G(Y)\to H(Y)$). Checking naturality for $f:X\to Y$ on the composite requires both components together: $(\eta\circ\theta)_Y\circ F(f)=H(f)\circ(\eta\circ\theta)_X$ — which holds precisely because $\theta$ and $\eta$'s OWN naturality squares compose correctly, confirming the composite is built genuinely component-by-component, not as one indivisible operation on $\theta$ and $\eta$ as wholes.

**Example 3 (orientation-level — the category axioms inherited pointwise, breaking MC-3)**: For the identity natural transformation $\text{id}_F:F\Rightarrow F$ (components $\text{id}_{F(X)}$ at every $X$): checking $\theta\circ\text{id}_F=\theta$ reduces, at each component $X$, to $\theta_X\circ\text{id}_{F(X)}=\theta_X$ in $\mathcal{D}$ — simply $\mathcal{D}$'s OWN identity law, applied component-wise, not a new fact about $[\mathcal{C},\mathcal{D}]$ requiring separate proof. Likewise, associativity $(\eta\circ\theta)\circ\psi=\eta\circ(\theta\circ\psi)$ holds because, at each component $X$, both sides reduce to $\eta_X\circ\theta_X\circ\psi_X$ — associativity already guaranteed by $\mathcal{D}$'s own category axiom. $[\mathcal{C},\mathcal{D}]$'s status as a genuine category is not assumed just because its objects and morphisms have been named; it is verified, component-by-component, as a direct consequence of $\mathcal{D}$ already being a category.

## Component 5 — Teaching Actions

### Teaching Action A01 — Objects Are Functors, Morphisms Are Natural Transformations, Never the Reverse (Primitive P06: Contrast Pair)

Contrast Example 1's roles directly: $F$ and $G$ (both objects) against $\eta$ (the morphism connecting them). State: "in $[\mathcal{C},\mathcal{D}]$, the FUNCTORS themselves sit at the 'point' level as objects — the natural transformations are what connects them, playing the morphism role."

- **MC-1 hook**: ask "in the functor category $[\mathcal{C},\mathcal{D}]$, are the functors themselves the morphisms, with natural transformations serving as the objects?" — a "yes" answer reveals MC-1 (reversing which already-mastered piece plays which role).

### Teaching Action A02 — Composition Is Built One Component at a Time (Primitive P11: Representation Shift)

State: "composing two natural transformations in $[\mathcal{C},\mathcal{D}]$ isn't one operation on two whole transformations — it's built up object-by-object, each component composed individually in $\mathcal{D}$." Work Example 2's explicit two-component construction for the 2-object category $\mathcal{C}$.

- **MC-2 hook**: ask "is composition of natural transformations in $[\mathcal{C},\mathcal{D}]$ performed as a single operation on the whole transformations, rather than component-by-component?" — a "yes" answer reveals MC-2 (missing that composition is pointwise, built from $\mathcal{D}$'s own composition at each object).

### Teaching Action A03 — The Category Axioms Are Inherited, Not Assumed (Primitive P28: Conflict Evidence)

Present Example 3's direct evidence: identity and associativity for $[\mathcal{C},\mathcal{D}]$ both reduce, component-by-component, to $\mathcal{D}$'s own already-established axioms. State: "$[\mathcal{C},\mathcal{D}]$ being a genuine category isn't automatic just because we've named its objects and morphisms — it's a direct, checkable consequence of $\mathcal{D}$ itself being a category, verified pointwise."

- **MC-3 hook**: ask "does naming functors as objects and natural transformations as morphisms automatically make $[\mathcal{C},\mathcal{D}]$ a genuine category, without further verification?" — a "yes" answer reveals MC-3 (assuming the category axioms hold automatically rather than verifying them, pointwise, from $\mathcal{D}$'s own axioms).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For functors $F,G:\mathcal{C}\to\mathcal{D}$ and a natural transformation $\eta:F\Rightarrow G$, state which of $F$, $G$, $\eta$ are objects of $[\mathcal{C},\mathcal{D}]$ and which is the morphism.
  2. Given $\theta:F\Rightarrow G$ and $\eta:G\Rightarrow H$ with components at objects $X,Y,Z$ of $\mathcal{C}$, write out all three components of $\eta\circ\theta$.
  3. Explain why verifying $\text{id}_F\circ\eta=\eta$ in $[\mathcal{C},\mathcal{D}]$ reduces to a fact already known about $\mathcal{D}$, rather than requiring a new proof.
  4. Explain, in your own words, why calling $[\mathcal{C},\mathcal{D}]$ "the foundation of higher category theory" makes sense, given that its objects are themselves structure-preserving maps (functors).
- **P76 (Transfer Probe, mode = independence)**: "A researcher studies diagrams of functors and natural transformations arising in a data-processing pipeline, where each functor represents one processing stage and natural transformations represent compatible ways of converting between stages. (a) Using this lesson's object/morphism assignment, explain how to correctly view this pipeline's stages and conversions as objects and morphisms of a functor category. (b) The researcher composes two conversions (natural transformations) end to end and wants to verify the result is itself a valid conversion. Using this lesson's pointwise composition principle, explain what must be checked, and at what level of granularity (whole transformations, or individual components). (c) A colleague argues 'since we've already confirmed each individual stage-conversion is a valid natural transformation, the composite pipeline as a whole must automatically form a valid category without further checking.' Explain specifically what this colleague is skipping, referencing this lesson's pointwise-inheritance-of-axioms reasoning."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | FUNCTOR-MORPHISM-ROLES-REVERSED | Believing functors are the morphisms and natural transformations are the objects in a functor category, reversing which already-mastered piece plays which role | Foundational |
| MC-2 | COMPOSITION-TREATED-AS-WHOLE-TRANSFORMATION-OPERATION | Believing composition of natural transformations in a functor category is a single operation on whole transformations, missing that it is built pointwise from D's own composition at each object | Foundational |
| MC-3 | CATEGORY-AXIOMS-ASSUMED-AUTOMATIC | Believing naming functors as objects and natural transformations as morphisms automatically makes the result a genuine category, missing that the axioms must be verified, pointwise, from D's own axioms | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Functor/Morphism Roles Reversed") → P41 (detect: ask a student which of $F,G,\eta$ are objects of $[\mathcal{C},\mathcal{D}]$, checking whether they name the functors as morphisms) → P64 (conceptual shift: re-walk Example 1's explicit role assignment, re-anchoring on "functors are objects; natural transformations are morphisms").
- **B02 (targets MC-2)**: P27 (name it: "Composition Treated as Whole-Transformation Operation") → P41 (detect: ask a student how $\eta\circ\theta$ is computed, checking whether they skip the component-by-component construction) → P64 (conceptual shift: re-walk Example 2's explicit two-component composition, re-anchoring on "composition is built one component at a time, using D's own composition").
- **B03 (targets MC-3)**: P27 (name it: "Category Axioms Assumed Automatic") → P41 (detect: ask a student whether $[\mathcal{C},\mathcal{D}]$ automatically satisfies the category axioms once objects/morphisms are named, checking for "yes") → P64 (conceptual shift: re-walk Example 3's component-wise reduction of identity and associativity to D's own axioms, re-anchoring on "the axioms are verified, pointwise, not assumed").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cat.natural-transformation` (the component morphisms and naturality condition this concept's morphisms directly are).
- **Unlocks**: `math.cat.yoneda-lemma` (studies functors into $[\mathcal{C}^{op},\mathbf{Set}]$-style functor categories directly, building on this concept's object/morphism structure).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an expert/understand tag places this at a compact "3 TAs + gate" tier; LO3 (category-axiom verification and the higher-category-theory framing) is deliberately kept at ORIENTATION level, demonstrating the pointwise-inheritance principle concretely without deriving the full 2-category structure this concept foreshadows.
- **Division of labor**: `math.cat.natural-transformation` owns the definition of a single natural transformation and its naturality condition. This concept, `math.cat.functor-category`, deliberately does not re-teach that definition; it owns the LEVEL-SHIFT of treating functors as objects and natural transformations as morphisms of a new category, plus the pointwise composition and axiom-inheritance this level-shift requires.
- Example 2's deliberately small 2-object category $\mathcal{C}=\{X,Y\}$ (rather than a more complex one) was chosen specifically so the pointwise composition could be verified with a concretely finite, fully written-out component list, rather than left as an abstract "for all objects" claim without a checkable instance.

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
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already fluent in natural transformations; functor category introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3 orientation-level) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
