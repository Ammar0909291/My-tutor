# Teaching Blueprint: Distance Formula (`math.geom.distance-formula`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.distance-formula` |
| name | Distance Formula |
| domain | Geometry |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.geom.pythagorean-theorem`, `math.geom.coordinate-plane` |
| unlocks | `math.geom.circle-equation`, `math.geom.midpoint-formula` |
| cross_links | `math.linalg.norm` |
| CPA_entry_stage | C (Concrete) — constructing the right triangle between two specific points before the general formula is stated abstractly |
| description (KG) | The distance between (x₁, y₁) and (x₂, y₂) is √((x₂−x₁)² + (y₂−y₁)²); a direct application of the Pythagorean theorem in coordinates. |

## Component 1 — Learning Objectives

- LO1: Derive the distance formula $d=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$ by constructing a right triangle between two points — the horizontal leg has length $|x_2-x_1|$, the vertical leg has length $|y_2-y_1|$ (using `math.geom.coordinate-plane`'s own signed-coordinate differences), and the direct distance is the hypotenuse, found via `math.geom.pythagorean-theorem`'s own $c=\sqrt{a^2+b^2}$.
- LO2: Recognize that swapping which point is called $(x_1,y_1)$ versus $(x_2,y_2)$ never changes the computed distance — since $(x_2-x_1)^2=(x_1-x_2)^2$ (squaring eliminates the sign) — even though `math.geom.coordinate-plane` emphasized that ORDER matters for identifying which point is which, it does not matter for computing the distance BETWEEN them.
- LO3: Apply the distance formula correctly even when the two points share the same $x$-coordinate or the same $y$-coordinate (a purely vertical or horizontal segment), recognizing the SAME formula handles these cases automatically — one squared term simply becomes zero — with no special-casing needed.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.pythagorean-theorem` ($a^2+b^2=c^2$ for a right triangle's legs $a,b$ and hypotenuse $c$; solving for the hypotenuse via $c=\sqrt{a^2+b^2}$) and `math.geom.coordinate-plane` (points as ordered pairs $(x,y)$; signed horizontal and vertical distances from the origin; order and sign both matter for identifying a point).

## Component 3 — Core Explanation

**A right triangle between any two points**: given two points $(x_1,y_1)$ and $(x_2,y_2)$, draw the horizontal segment of length $|x_2-x_1|$ and the vertical segment of length $|y_2-y_1|$ connecting them via a right-angle corner — these two segments are the LEGS of a right triangle, and the direct (diagonal) distance between the two original points is exactly this triangle's HYPOTENUSE. Applying `math.geom.pythagorean-theorem`'s formula $c=\sqrt{a^2+b^2}$ directly gives $d=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$ — the distance formula is nothing more than the Pythagorean theorem, applied to legs built from coordinate differences.

**Order doesn't matter for distance, even though it matters for identifying points**: `math.geom.coordinate-plane` emphasized that $(3,-2)$ and $(-2,3)$ are different points — order matters there. But for the DISTANCE formula, swapping which point is labeled $(x_1,y_1)$ versus $(x_2,y_2)$ changes $(x_2-x_1)$ to its negative, $(x_1-x_2)$ — but since both are SQUARED, $(x_2-x_1)^2=(x_1-x_2)^2$ always, and the computed distance is identical either way.

**The formula handles horizontal and vertical segments automatically**: when the two points share the same $x$-coordinate (a vertical segment), the term $(x_2-x_1)^2$ is simply $0$, and the formula reduces directly to $|y_2-y_1|$ — the ordinary vertical distance. Similarly for a shared $y$-coordinate. No separate formula or special case is needed; the general distance formula already produces the correct simplified answer on its own.

## Component 4 — Worked Examples

**Example 1 (LO1 — deriving distance via the right triangle, breaking MC-1)**: For $(1,2)$ and $(4,6)$: horizontal leg $=4-1=3$; vertical leg $=6-2=4$. These form a right triangle with hypotenuse (the direct distance) $d=\sqrt{3^2+4^2}=\sqrt{9+16}=\sqrt{25}=5$. (A student who forgot to square the legs and instead simply added them, $3+4=7$, would get a genuinely wrong answer — the Pythagorean relationship specifically requires squaring, then adding, then taking the square root.)

**Example 2 (LO2 — swapping point order gives the same distance, breaking MC-2)**: Recomputing the SAME distance with the points swapped — $(4,6)$ as "$(x_1,y_1)$" and $(1,2)$ as "$(x_2,y_2)$": horizontal leg $=1-4=-3$, squared $=9$ (identical to before); vertical leg $=2-6=-4$, squared $=16$ (identical to before). $d=\sqrt{9+16}=\sqrt{25}=5$ — EXACTLY the same answer as Example 1, confirming the order of the two points never affects the computed distance.

**Example 3 (LO3 — the formula handles vertical and horizontal segments automatically, breaking MC-3)**: For $(2,5)$ and $(2,9)$ (same $x$-coordinate, a vertical segment): $d=\sqrt{(2-2)^2+(9-5)^2}=\sqrt{0+16}=\sqrt{16}=4$ — matching the obvious vertical distance directly, with the horizontal term automatically vanishing. For $(3,7)$ and $(8,7)$ (same $y$-coordinate, a horizontal segment): $d=\sqrt{(8-3)^2+(7-7)^2}=\sqrt{25+0}=5$ — matching directly as well, again with no special formula needed.

## Component 5 — Teaching Actions

### Teaching Action A01 — Building the Right Triangle From Coordinate Differences (Primitive P11: Representation Shift)

State: "the distance formula IS the Pythagorean theorem — the two legs are just the horizontal and vertical coordinate differences between the points." Work Example 1's full derivation, explicitly labeling the legs and hypotenuse.

- **MC-1 hook**: ask "to find the distance between two points, do I add the horizontal and vertical differences directly, or is something else needed?" — an "add them directly" answer reveals MC-1 (skipping the squaring-and-square-rooting the Pythagorean relationship genuinely requires).

### Teaching Action A02 — Point Order Doesn't Affect Distance (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: swapping which point is called $(x_1,y_1)$ gives $-3$ and $-4$ for the legs instead of $3$ and $4$, but squaring makes both give IDENTICAL results, $9$ and $16$. State: "distance is symmetric — it doesn't matter which point you start from, because squaring erases the sign difference entirely."

- **MC-2 hook**: ask "if I swap which point is (x₁,y₁) and which is (x₂,y₂), does the computed distance change?" — a "yes" answer reveals MC-2 (missing that squaring makes the order irrelevant for distance, even though order matters for identifying the points themselves).

### Teaching Action A03 — No Special Case Needed for Vertical or Horizontal Segments (Primitive P06: Contrast Pair)

Contrast Example 3's two cases — a vertical segment (horizontal term vanishes) and a horizontal segment (vertical term vanishes) — both handled by the SAME general formula with no modification. State: "you never need a separate formula for a purely vertical or horizontal segment — the general distance formula already simplifies correctly on its own."

- **MC-3 hook**: ask "does the distance formula need to be modified or replaced by a different formula when the two points are directly above/below or left/right of each other?" — a "yes" answer reveals MC-3 (missing that the general formula already reduces correctly in these cases, without any special-casing).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute the distance between $(0,0)$ and $(6,8)$.
  2. Compute the distance between $(2,3)$ and $(-1,7)$, then recompute with the points swapped, confirming the answer is identical.
  3. Compute the distance between $(-4,5)$ and $(-4,-3)$ (a vertical segment), and confirm it matches the ordinary vertical distance.
  4. Explain why a student who adds the horizontal and vertical coordinate differences directly (without squaring) instead of using the full formula gets an incorrect distance in general.
- **P76 (Transfer Probe, mode = cross-link probe against `math.linalg.norm`)**: "Recall from `math.linalg.norm` that the norm $\|v\|$ of a vector $v=(v_1,v_2)$ is $\sqrt{v_1^2+v_2^2}$, computed via the Pythagorean theorem in exactly the same way. (a) Explain precisely how this lesson's distance formula between two points $(x_1,y_1)$ and $(x_2,y_2)$ is exactly the norm of the DIFFERENCE vector $(x_2-x_1, y_2-y_1)$. (b) That lesson also discussed the sup-norm and other $p$-norms, giving genuinely different numeric answers for the same vector. Explain why the ordinary (Euclidean) distance formula in this lesson corresponds specifically to the $p=2$ norm, not any other choice of $p$. (c) Explain why the same symmetry property from LO2 (swapping point order doesn't change distance) directly follows from the norm's own homogeneity property, $\|\alpha v\|=|\alpha|\|v\|$, applied with $\alpha=-1$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | COORDINATE-DIFFERENCES-ADDED-WITHOUT-SQUARING | Adding the horizontal and vertical coordinate differences directly, rather than squaring, summing, and taking the square root per the Pythagorean relationship | Foundational |
| MC-2 | POINT-ORDER-ASSUMED-TO-AFFECT-DISTANCE | Believing swapping which point is called (x₁,y₁) versus (x₂,y₂) changes the computed distance, missing that squaring eliminates the sign difference | Foundational |
| MC-3 | VERTICAL-OR-HORIZONTAL-SEGMENTS-ASSUMED-TO-NEED-A-SEPARATE-FORMULA | Believing the general distance formula must be modified or replaced for purely vertical or horizontal segments, missing that it already simplifies correctly on its own | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Coordinate Differences Added Without Squaring") → P41 (detect: ask a student to compute a distance and check whether they add the raw coordinate differences directly) → P64 (conceptual shift: re-walk Example 1's full derivation, re-anchoring on "the legs must be squared, summed, and square-rooted — exactly the Pythagorean theorem, never simple addition").
- **B02 (targets MC-2)**: P27 (name it: "Point Order Assumed to Affect Distance") → P41 (detect: ask a student whether swapping the two points changes the computed distance, and check for a "yes") → P64 (conceptual shift: re-walk Example 2's matching computation with points swapped, re-anchoring on "squaring removes the sign — the legs' squared values are identical either way").
- **B03 (targets MC-3)**: P27 (name it: "Vertical or Horizontal Segments Assumed to Need a Separate Formula") → P41 (detect: ask a student whether a different formula is needed for a vertical or horizontal segment, and check for a "yes") → P64 (conceptual shift: re-walk Example 3's two cases, showing the general formula automatically reduces correctly, re-anchoring on "one term simply becomes zero — no new formula required").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.pythagorean-theorem` (the $c=\sqrt{a^2+b^2}$ formula this concept applies directly to coordinate-difference legs), `math.geom.coordinate-plane` (the signed coordinate differences this concept's legs are built from).
- **Unlocks**: `math.geom.circle-equation` (a circle is the set of points at a fixed distance from a center — directly using this concept's formula), `math.geom.midpoint-formula` (a related coordinate-geometry construction between two points).
- **Cross-link (P76_mode = cross-link probe against `math.linalg.norm`, already authored)**: the transfer probe explicitly connects this concept's concrete two-point distance formula to that concept's abstract vector-norm framework, framing the distance formula as the norm of the difference vector, specifically the $p=2$ case.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a proficient/apply tag places this at a "3 TAs + gate" tier — A01 (deriving the formula via the right triangle), A02 (order-independence), and A03 (automatic handling of vertical/horizontal segments) each target a distinct LO, appropriate for a concept that is fundamentally one direct application of an already-mastered theorem to coordinate geometry.
- Examples 1 and 2 deliberately reuse the SAME two points ($(1,2)$ and $(4,6)$, just relabeled) to make MC-2's order-independence point as stark as possible with minimal extra computation, matching this corpus's established near-identical-pair technique.
- This concept's cross-link to `math.linalg.norm` (already authored) directly reuses that concept's own $p$-norm framework, framing the familiar coordinate distance formula as a specific, concrete instance ($p=2$) of a more general idea, rather than an unrelated new formula.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.linalg.norm authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe against math.linalg.norm) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: specific right triangle constructed before the general formula) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
