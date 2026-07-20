# Teaching Blueprint: Quadrilateral (`math.geom.quadrilateral`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.quadrilateral` |
| name | Quadrilateral |
| domain | Geometry |
| difficulty | developing |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.geom.polygon`, `math.geom.parallel-lines` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — classifying one specific 4-sided figure by its side/angle properties before naming the general hierarchy |
| description (KG) | A polygon with four sides; includes parallelograms, rectangles, rhombuses, squares, trapezoids, and kites, classified by side and angle properties. |

## Component 1 — Learning Objectives

- LO1: Define a quadrilateral as a `math.geom.polygon` with EXACTLY four sides, and recognize the NAMED sub-types (parallelogram, rectangle, rhombus, square, trapezoid, kite) as distinguished by SPECIFIC additional constraints on sides/angles — most involving `math.geom.parallel-lines`'s own parallel-side condition — layered on top of the general polygon definition.
- LO2: Correctly place a given quadrilateral within the CONTAINMENT HIERARCHY of these sub-types (e.g. every square is a rectangle, every rectangle is a parallelogram, but NOT every parallelogram is a rectangle) by checking which specific side/angle conditions it satisfies — recognizing that these categories NEST, they are not mutually exclusive labels.
- LO3 (orientation level — full proof-based classification deferred): recognize, without full derivation, that the hierarchy's containments (square $\subset$ rectangle $\subset$ parallelogram, etc.) are PROVABLE consequences of the defining conditions, not arbitrary naming conventions — e.g. a square's equal-sides-AND-right-angles properties genuinely IMPLY it satisfies a rectangle's weaker right-angles-only condition, previewing `math.geom.geometric-proof`'s own machinery for formally establishing such implications.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.polygon` (a closed plane figure bounded by straight segments, classified by side count) and `math.geom.parallel-lines` (lines that never meet, and the angle relationships they produce with a transversal).

## Component 3 — Core Explanation

**Quadrilateral sub-types are the polygon definition plus specific additional constraints**: `math.geom.polygon` already defines a general closed figure with straight sides; a QUADRILATERAL is simply the 4-sided case. Each NAMED sub-type adds SPECIFIC further constraints: a PARALLELOGRAM requires BOTH pairs of opposite sides parallel (using `math.geom.parallel-lines`'s own parallel condition, applied to two side-pairs); a TRAPEZOID requires only ONE pair of opposite sides parallel; a RECTANGLE requires all four angles to be right angles; a RHOMBUS requires all four sides equal in length; a SQUARE requires BOTH the rectangle condition (right angles) AND the rhombus condition (equal sides); a KITE requires two DISTINCT pairs of ADJACENT (not opposite) sides equal.

**The sub-types form a genuine containment hierarchy, not mutually exclusive labels**: because a SQUARE satisfies both "all angles right" (the rectangle condition) AND "all sides equal" (the rhombus condition), a square IS BOTH a rectangle AND a rhombus — these categories NEST rather than partition the quadrilaterals into disjoint bins. Every square is a rectangle (satisfying the WEAKER right-angle-only condition automatically, since it satisfies the STRONGER right-angle-AND-equal-sides condition), but NOT every rectangle is a square (a rectangle need not have equal sides) — the hierarchy is a genuine one-directional containment, not a reversible equivalence.

**The hierarchy's containments are provable logical consequences, not arbitrary conventions (orientation level)**: the claim "every square is a rectangle" is not merely a naming convention chosen for convenience — it is a genuinely PROVABLE fact: since a square is DEFINED to have all four angles equal to $90°$ (among its other properties), it automatically satisfies a rectangle's DEFINING condition (all four angles $90°$), regardless of what OTHER properties (equal sides) it happens to have beyond that. This kind of "stronger condition implies weaker condition" reasoning is exactly the logical structure `math.geom.geometric-proof` formalizes, previewed here informally. Full formal proof techniques are deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — classifying by checking specific side/angle constraints, breaking MC-1)**: for a quadrilateral $ABCD$ with $AB\parallel CD$ (one pair of opposite sides parallel, via `math.geom.parallel-lines`'s own criterion) but $BC\not\parallel AD$ (the other pair NOT parallel), and no additional equal-side or equal-angle constraints given: this quadrilateral satisfies EXACTLY the trapezoid condition (one pair of parallel sides) — it is a TRAPEZOID, but NOT a parallelogram (which would require BOTH pairs parallel), confirming the classification depends on checking the SPECIFIC constraint each name requires, not a vague overall "looks somewhat regular" impression.

**Example 2 (LO2 — placing a square correctly within the containment hierarchy, breaking MC-2)**: for a square $PQRS$ (all four sides equal, all four angles $90°$): checking each sub-type's condition — parallelogram (both side-pairs parallel)? YES, since equal-angle right angles force opposite sides parallel. Rectangle (all angles $90°$)? YES, directly by the square's own definition. Rhombus (all sides equal)? YES, directly by the square's own definition. So $PQRS$ is SIMULTANEOUSLY a parallelogram, a rectangle, AND a rhombus, in ADDITION to being a square — these are NOT four separate, competing classifications, but four NESTED categories the square satisfies all at once, precisely because square's defining conditions are STRICTLY STRONGER than each of theirs.

**Example 3 (LO3, orientation level — the hierarchy as provable implication, not arbitrary convention, breaking MC-3)**: proving "every rhombus with a right angle is a square": a rhombus, BY DEFINITION, has all four sides equal. If ADDITIONALLY one angle is $90°$, then (using `math.geom.parallel-lines`'s angle relationships on the rhombus's parallel sides — opposite angles in a parallelogram are equal, and consecutive angles are supplementary) EVERY angle must be $90°$: the angle opposite the given right angle is EQUAL to it (hence also $90°$), and each ADJACENT angle is supplementary to $90°$ (hence also $90°$). So this rhombus satisfies BOTH "all sides equal" (already given) AND "all angles $90°$" (just derived) — EXACTLY the square's defining conditions. This is a genuine logical DERIVATION, not an assumed convention — the containment "a rhombus with a right angle is necessarily a square" follows STEP BY STEP from the definitions and `math.geom.parallel-lines`'s own angle facts.

## Component 5 — Teaching Actions

### Teaching Action A01 — Each Named Sub-Type Adds a Specific Additional Constraint (Primitive P11: Representation Shift)

State: "each quadrilateral name isn't a vague visual impression — it's the polygon definition plus a PRECISE additional condition on sides or angles, and classifying a shape means checking exactly which conditions it satisfies." Walk Example 1's precise trapezoid-versus-parallelogram distinction based on checking ONE pair versus BOTH pairs of parallel sides.

- **MC-1 hook**: ask "is classifying a quadrilateral as a 'trapezoid' versus a 'parallelogram' based on a rough visual impression of how regular the shape looks, rather than checking a precise condition?" — a "yes" answer reveals MC-1 (missing that each name corresponds to a precise, checkable side/angle condition).

### Teaching Action A02 — A Single Shape Can Genuinely Satisfy Multiple Nested Categories At Once (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the SAME square genuinely satisfies the parallelogram, rectangle, AND rhombus conditions simultaneously, not as competing alternatives. State: "these categories aren't mutually exclusive boxes where a shape belongs to exactly one — a single shape can genuinely, verifiably satisfy several nested conditions at the same time."

- **MC-2 hook**: ask "must a quadrilateral be classified as EXACTLY ONE of parallelogram, rectangle, rhombus, or square, as if these were mutually exclusive categories?" — a "yes" answer reveals MC-2 (missing that these categories genuinely nest — a square is simultaneously a parallelogram, rectangle, and rhombus).

### Teaching Action A03 — Containments Are Proven, Not Assumed By Convention (Primitive P06: Contrast Pair)

Contrast a hypothetical "square is called a rectangle just by convention/naming tradition" view against Example 3's step-by-step DERIVATION that a right-angled rhombus's OTHER three angles are forced to be $90°$ too, using `math.geom.parallel-lines`'s own angle facts. State: "the containment 'square implies rectangle' isn't a naming convention someone decided on — it's a logical consequence you can actually derive, step by step, from the definitions themselves."

- **MC-3 hook**: ask "is the fact that 'every square is a rectangle' simply an arbitrary naming convention, rather than a logically provable consequence of their definitions?" — a "yes" answer reveals MC-3 (missing that this containment is a genuine, derivable logical consequence).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For a quadrilateral with all four sides equal but no right angles given, classify it precisely (rhombus, square, or something else), justifying your answer.
  2. Explain why every rectangle is automatically a parallelogram, citing the specific conditions involved.
  3. Determine whether a kite can also be a parallelogram, by comparing their defining conditions (adjacent-side-pairs equal vs. opposite-sides-parallel).
  4. Explain, in one or two sentences, why the containment "square implies rhombus" is a provable fact rather than an arbitrary naming choice.
- **P76 (Transfer Probe, mode = independence)**: "An architect is designing a window frame and specifies it must have all four sides of equal length, and wants to know what additional property would be needed to guarantee the frame's corners are all perfect right angles (making it also suitable for a specific glass-cutting template designed for rectangles). (a) Identify what shape category the equal-sides-only condition places the frame in. (b) Using the derivation style from Example 3, explain what SINGLE additional condition (and why) would upgrade this shape to also satisfy the rectangle condition, making it a square. (c) Explain why simply asserting 'a rhombus with nice proportions is basically a square' would NOT be mathematically rigorous, and what precise condition the architect should actually specify instead."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | QUADRILATERAL-CLASSIFICATION-ASSUMED-VISUAL-IMPRESSION | Believing quadrilateral classification is based on a rough visual impression, missing that each name corresponds to a precise, checkable side/angle condition | Foundational |
| MC-2 | CATEGORIES-ASSUMED-MUTUALLY-EXCLUSIVE | Believing a quadrilateral must be classified as exactly one category, missing that categories genuinely nest — a shape can satisfy several simultaneously | High |
| MC-3 | CONTAINMENT-ASSUMED-ARBITRARY-CONVENTION | Believing hierarchy containments (like "square implies rectangle") are arbitrary naming conventions, missing that they are provable logical consequences | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Quadrilateral Classification Assumed Visual Impression") → P41 (detect: ask whether classification is based on a rough visual impression) → P64 (conceptual shift: re-walk Example 1's precise trapezoid-versus-parallelogram distinction, re-anchoring on "each name corresponds to a precise, checkable condition").
- **B02 (targets MC-2)**: P27 (name it: "Categories Assumed Mutually Exclusive") → P41 (detect: ask whether a quadrilateral must be classified as exactly one category) → P64 (conceptual shift: re-walk Example 2's simultaneous parallelogram/rectangle/rhombus verification for a square, re-anchoring on "categories genuinely nest, a shape can satisfy several at once").
- **B03 (targets MC-3)**: P27 (name it: "Containment Assumed Arbitrary Convention") → P41 (detect: ask whether hierarchy containments are arbitrary naming conventions) → P64 (conceptual shift: re-walk Example 3's step-by-step angle derivation, re-anchoring on "a genuine, derivable logical consequence").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.polygon` (the general closed-figure definition this concept specializes to four sides) and `math.geom.parallel-lines` (the parallel-side condition underlying most sub-type definitions, and the angle relationships used in the hierarchy derivations).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: none listed in the KG for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 5 with a developing/understand tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (the precise trapezoid/parallelogram distinction and the multi-category verification for a square) and LO3 kept orientation-level, appropriately previewing the provable nature of the hierarchy via one concrete derivation without developing full formal proof techniques.
- **Division of labor**: `math.geom.polygon` owns the general closed-figure definition; `math.geom.parallel-lines` owns the parallel-side and angle-relationship machinery. This concept owns the SPECIFIC quadrilateral sub-type definitions and their containment hierarchy — deliberately using the square as the central example across Examples 2–3 (first verifying its multi-category membership, then deriving a related containment) so the "multiple simultaneous categories" and "provable containment" points connect to one continuously developed running case.
- Example 3's deliberate choice to derive "rhombus + one right angle $\Rightarrow$ square" (rather than the more commonly stated "square $\Rightarrow$ rectangle," which is nearly definitional) was chosen because it requires a genuine multi-step derivation using `math.geom.parallel-lines`'s own angle facts, making the "provable, not arbitrary" point substantively demonstrated rather than trivially true by definition alone.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: classifying one specific figure by its properties precedes the general hierarchy) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
