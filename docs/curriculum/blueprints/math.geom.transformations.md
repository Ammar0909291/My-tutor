# Teaching Blueprint: Geometric Transformations (`math.geom.transformations`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.transformations` |
| name | Geometric Transformations |
| domain | Geometry |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 12 |
| requires | `math.geom.coordinate-plane` |
| unlocks | `math.linalg.linear-map` |
| cross_links | `math.linalg.linear-map`, `math.abst.group-action` (**both not yet authored** — verified via `ls`; P76_mode = independence, see Component 7) |
| CPA_entry_stage | C (Concrete) — physically moving a traced shape before coordinate formulas |
| description (KG) | Functions mapping the plane to itself that preserve shape properties; isometries (translations, rotations, reflections) preserve distance; dilations scale by a factor. |

## Component 1 — Learning Objectives

- LO1: Define a **geometric transformation** as a function mapping the plane to itself, and identify the four basic types — **translation** (slide), **rotation** (turn about a point), **reflection** (flip across a line), and **dilation** (scale from a center point) — applying each via coordinate rules to a given point or shape.
- LO2: Classify translations, rotations, and reflections as **isometries** (distance-preserving transformations — the image is congruent to the original) and distinguish these from dilations (which preserve *shape* but not distance/size unless the scale factor is exactly 1 or −1), correctly predicting which properties survive each transformation type.
- LO3: Apply a **composition** of two or more transformations in the specified order, and recognize that transformation composition is generally **not commutative** — performing the same two transformations in reversed order can produce a different final image.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.coordinate-plane` (points as ordered pairs $(x,y)$, the two perpendicular axes) — this concept's coordinate rules for each transformation type are built directly on that representation.

## Component 3 — Core Explanation

A **geometric transformation** is a function that maps every point of the plane to some (possibly different) point of the plane. Four basic types:

- **Translation** by $(a,b)$: $(x,y)\mapsto (x+a,y+b)$ — every point slides by the same fixed amount.
- **Rotation** by angle $\theta$ about the origin: $(x,y)\mapsto(x\cos\theta - y\sin\theta,\ x\sin\theta+y\cos\theta)$ — every point turns by the same angle around a fixed center.
- **Reflection** across the $x$-axis: $(x,y)\mapsto(x,-y)$; across the $y$-axis: $(x,y)\mapsto(-x,y)$ — every point flips to its mirror image across the given line.
- **Dilation** by scale factor $k$ centered at the origin: $(x,y)\mapsto(kx,ky)$ — every point moves radially, scaled by $k$ from the center.

**Isometries preserve distance**: translations, rotations, and reflections are called **isometries** — for any two points $P,Q$, the distance between their images equals the distance between $P$ and $Q$. This means the transformed shape is always **congruent** to the original (same size and shape, possibly repositioned/flipped).

**Dilations do not preserve distance** (unless $|k|=1$): a dilation by factor $k\neq\pm1$ scales every distance by $|k|$ — the image is **similar** to the original (same shape, proportionally scaled), but generally not congruent. Angles, however, are preserved by all four transformation types.

**Composition order matters**: applying transformation $T_1$ then $T_2$ (written $T_2\circ T_1$, meaning "do $T_1$ first, then $T_2$") is generally **different** from applying $T_2$ then $T_1$. This failure of commutativity is a structural fact about transformations, not a computational accident — reflections and rotations especially tend not to commute with each other or with translations centered elsewhere.

## Component 4 — Worked Examples

**Example 1 (LO1 — applying each transformation)**: Point $P=(3,2)$. Translate by $(1,-4)$: $(4,-2)$. Reflect across the $x$-axis: $(3,-2)$. Dilate by factor 2 (centered at origin): $(6,4)$. Rotate $90°$ counterclockwise about the origin ($\cos90°=0,\sin90°=1$): $(3\cdot0-2\cdot1,\ 3\cdot1+2\cdot0)=(-2,3)$.

**Example 2 (LO2 — isometry vs. dilation, distance check)**: Points $A=(0,0)$, $B=(3,4)$, distance $|AB|=5$. Reflect both across the $x$-axis: $A'=(0,0)$, $B'=(3,-4)$, $|A'B'|=\sqrt{9+16}=5$ — **preserved**, confirming reflection is an isometry. Now dilate both by factor 2: $A''=(0,0)$, $B''=(6,8)$, $|A''B''|=\sqrt{36+64}=10=2\times5$ — **not preserved** (doubled, not equal), confirming dilation is not an isometry (unless $k=\pm1$).

**Example 3 (LO3 — composition order matters, breaking MC-3)**: Point $P=(1,0)$. **Order A**: reflect across the $x$-axis first ($(1,0)\to(1,0)$, unchanged since $y=0$ already) — hmm, pick a clearer point: use $P=(1,1)$. Reflect across the $x$-axis: $(1,-1)$. Then rotate $90°$ CCW about origin: $(1\cdot0-(-1)\cdot1,\ 1\cdot1+(-1)\cdot0) = (1,1)$. **Order B (reversed)**: rotate $P=(1,1)$ first by $90°$ CCW: $(1\cdot0-1\cdot1,\ 1\cdot1+1\cdot0)=(-1,1)$. Then reflect across the $x$-axis: $(-1,-1)$. Final results differ: **Order A gives $(1,1)$, Order B gives $(-1,-1)$** — confirming reflection-then-rotation and rotation-then-reflection are genuinely different transformations.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Four Transformation Types via Physical Motion (Primitive P11: Representation Shift)

Start concrete: trace a triangle on tracing paper. **Slide** it across the table without turning ("translation"). **Spin** it around a fixed pin ("rotation"). **Flip** it over like a pancake ("reflection" — note the shape's orientation reverses, like a mirror image). **Photocopy at a different zoom percentage** ("dilation" — same shape, different size). Have students physically perform each on the traced triangle.

Shift representation to coordinates: work Example 1's four transformations on a single point, connecting each physical motion to its coordinate rule. Emphasize the rotation formula's trigonometric structure explicitly as "how much of the original x and y mix together, based on the turn angle" — this is often the most symbolically unfamiliar of the four.

- **MC-1 hook**: after teaching all four types, describe a dilation with factor $k=2$ and ask "is the image congruent to the original?" — an answer of "yes" reveals MC-1 (believing all geometric transformations preserve congruence, not distinguishing isometries from scaling transformations).

### Teaching Action A02 — Isometries vs. Dilations, and Composition Order (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Work Example 2 side by side — reflection preserves the distance $|AB|=5$ exactly; dilation by factor 2 doubles it to 10. State the rule: "translations, rotations, reflections — the three isometries — always preserve distance exactly, hence congruence. Dilation (except at $k=\pm1$) does not — it preserves *shape* (similarity, angles) but scales *size*."

**Contrast 2 (targets MC-2, composition order)**: Work Example 3's two orders (reflect-then-rotate vs. rotate-then-reflect) on the same starting point, landing on genuinely different final images ($(1,1)$ vs. $(-1,-1)$). State explicitly: "unlike ordinary number addition, where order never matters, composing two geometric transformations generally does NOT commute — always perform them in the stated order, and never assume swapping the order gives the same result without checking."

### Teaching Action A03 — Composite Multi-Transformation Problem (Primitive P28: Conflict Evidence)

Present: "Triangle $T$ has vertices $(0,0), (2,0), (0,3)$. Apply, IN ORDER: (1) reflect across the $y$-axis, (2) translate by $(4,1)$, (3) dilate by factor $\frac12$ centered at the origin. Find the final vertex coordinates, and state whether the final triangle is congruent to, similar-but-not-congruent to, or has no guaranteed relationship to the original." Walk through: reflect each vertex across $y$-axis: $(0,0),(-2,0),(0,3)$. Translate by $(4,1)$: $(4,1),(2,1),(4,4)$. Dilate by $\frac12$ from origin: $(2,0.5),(1,0.5),(2,2)$. Since the sequence includes a non-unit-factor dilation, the final triangle is **similar but not congruent** to the original (the two isometries preserved size through steps 1-2, but step 3 scaled it down by half). This forces sequential correct tracking of both coordinates and cumulative congruence-vs-similarity status across three chained transformations.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Point $Q=(-2,5)$. Find its image under: (a) translation by $(3,-1)$, (b) reflection across the $y$-axis, (c) dilation by factor 3 centered at the origin.
  2. Given $A=(1,1)$, $B=(4,5)$ (distance 5), find the images of both under a $180°$ rotation about the origin, and verify the distance is preserved.
  3. Apply reflection across the $x$-axis, THEN a $90°$ CCW rotation, to point $(2,3)$. Then, separately, apply the $90°$ CCW rotation FIRST, then the reflection, to the same starting point. Show the two final results differ.
  4. A shape is dilated by factor $-1$ (a negative scale factor, centered at the origin). Explain, using the definition, why this specific dilation IS actually an isometry (hint: compute the distance-preservation check directly), despite dilations in general not being isometries.
- **P76 (Transfer Probe, mode = independence)**: "A video game's sprite-rendering engine applies transformations to a character sprite in this exact order every frame: first a reflection (to flip the character when it turns around), then a rotation (to tilt it on slopes), then a translation (to move it across the screen). A game-engine bug accidentally swaps the ORDER to translation-then-rotation-then-reflection. Using a specific example point on the sprite (e.g. its 'nose' at local coordinates $(1,0)$ relative to the character's pivot), demonstrate concretely that the buggy order produces a different final screen position than the intended order — connecting this directly to the non-commutativity of transformation composition from this lesson." *Component 7 note: this scenario was chosen independently rather than cross-linking to `math.linalg.linear-map` or `math.abst.group-action`, since neither blueprint yet exists.*
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ALL-TRANSFORMATIONS-PRESERVE-CONGRUENCE | Believing every geometric transformation (including dilation) preserves congruence/distance, not distinguishing isometries from scaling transformations | Foundational |
| MC-2 | COMPOSITION-ASSUMED-COMMUTATIVE | Assuming that applying two transformations in either order produces the same final result | Foundational |
| MC-3 | ROTATION-CENTER-ASSUMED-ORIGIN | Applying the standard rotation-about-the-origin formula to a rotation centered at some other, non-origin point without adjusting for the different center | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Congruence-Preservation Overgeneralization") → P41 (detect: ask whether a dilation by factor 3 preserves distances) → P64 (conceptual shift: re-derive by direct distance computation, as in A02 Contrast 1 — scaling changes distances by exactly the scale factor, which is not 1 in general).
- **B02 (targets MC-2)**: P27 (name it: "Composition Commutativity Assumption") → P41 (detect: ask a student to predict, without computing, whether reflect-then-rotate gives the same result as rotate-then-reflect on the same point) → P64 (conceptual shift: work through Example 3's explicit counterexample, showing the two orders genuinely diverge).
- **B03 (targets MC-3)**: P27 (name it: "Origin-Centered Formula Misapplied") → P41 (detect: give a rotation problem centered at a point other than the origin, e.g. $(2,3)$, and check whether the student applies the origin-based formula directly without translating first) → P64 (conceptual shift: re-anchor on the correct procedure — translate the center to the origin, rotate, then translate back — since the standard formula assumes rotation about $(0,0)$ specifically).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.coordinate-plane` (points as ordered pairs — the representation every transformation rule here is built on).
- **Unlocks**: `math.linalg.linear-map` (rotations, reflections, and dilations centered at the origin are exactly the linear maps of the plane — this concept's coordinate rules are the concrete precursor to that concept's abstract linear-map framework).
- **Cross-link**: KG lists `math.linalg.linear-map` and `math.abst.group-action` as cross-links. Verified via directory listing that neither blueprint yet exists. Per the established P76_mode rule, this blueprint uses **independence** mode. A future revision, once either target is authored, may add a genuine cross-link probe — e.g. connecting this concept's rotation/reflection/dilation coordinate rules directly to `math.linalg.linear-map`'s matrix representations (each of the four transformation types corresponds to a specific $2\times2$ matrix), or to `math.abst.group-action`'s framing of the isometries as forming a group acting on the plane.

## Component 8 — Teaching Notes

- estimated_hours = 12 with a proficient/apply tag places this among the corpus's densest concepts — A01 (four transformation types via physical motion), A02 (isometry/dilation contrast plus composition-order contrast), and A03 (a genuinely composite three-transformation chained problem) reflect the concept's substantial breadth: four distinct transformation types, each with its own coordinate rule, plus the cross-cutting congruence-vs-similarity and commutativity issues that only emerge once multiple transformations are combined.
- The rotation formula was deliberately introduced via direct trigonometric computation (Example 1) rather than derived from first principles, since a full derivation belongs to trigonometry/linear-algebra content this concept's prerequisite (`math.geom.coordinate-plane` only) does not yet support — the formula is presented and used correctly, with its underlying linear-algebra justification explicitly deferred to `math.linalg.linear-map`.
- MC-3 (rotation-center-assumed-origin) was included even though every worked example and most gate problems use origin-centered rotations, specifically because gate problem 4 and the general "watch for this" framing prepares learners for the far more common real-world case (rotating about an arbitrary pivot, as in the video-game transfer probe's mention of tilting on slopes) without requiring a fully separate teaching action for it at this proficient/apply level.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.coordinate-plane`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (both confirmed absent → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: physical tracing-paper motion) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
