# Teaching Blueprint: Midpoint Formula (`math.geom.midpoint-formula`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.midpoint-formula` |
| name | Midpoint Formula |
| domain | Geometry |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 2 |
| requires | `math.geom.coordinate-plane` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | The midpoint of a segment from (x₁, y₁) to (x₂, y₂) is ((x₁+x₂)/2, (y₁+y₂)/2).

 |

## Component 1 — Learning Objectives

- LO1: Apply the midpoint formula $\left(\frac{x_1+x_2}{2},\frac{y_1+y_2}{2}\right)$ for the segment from $(x_1,y_1)$ to $(x_2,y_2)$ — AVERAGING the $x$-coordinates and, SEPARATELY, averaging the $y$-coordinates.
- LO2: Recognize the formula is ORDER-INDEPENDENT — swapping which point is labeled $(x_1,y_1)$ versus $(x_2,y_2)$ gives the SAME midpoint, since addition (used in both averages) doesn't care about order.
- LO3: Use the midpoint formula IN REVERSE — given one endpoint and the midpoint, find the OTHER endpoint (by solving the averaging equation for the unknown coordinate).

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.coordinate-plane` — the midpoint formula operates on coordinate pairs.

## Component 3 — Core Explanation

The **midpoint** of a segment from $(x_1,y_1)$ to $(x_2,y_2)$ is $\left(\frac{x_1+x_2}{2},\frac{y_1+y_2}{2}\right)$ — the AVERAGE of the two $x$-coordinates, and SEPARATELY the average of the two $y$-coordinates, combined into a new coordinate pair.

This formula is ORDER-INDEPENDENT: since addition is commutative ($x_1+x_2=x_2+x_1$), it doesn't matter which point is called "the first" and which "the second" — swapping the labels gives the exact same midpoint.

The formula can also be used IN REVERSE: given ONE endpoint and the MIDPOINT, the OTHER endpoint can be found by solving the averaging equation — if $M=\left(\frac{x_1+x_2}{2},\frac{y_1+y_2}{2}\right)$ and $M,(x_1,y_1)$ are known, then $x_2=2M_x-x_1$ (and similarly for $y_2$).

## Component 4 — Worked Examples

**Example 1 (LO1 — basic application, breaking MC-1)**: Find the midpoint of the segment from $(2,8)$ to $(6,2)$. Midpoint $=\left(\frac{2+6}{2},\frac{8+2}{2}\right)=\left(\frac{8}{2},\frac{10}{2}\right)=(4,5)$. A common error mixes up which coordinates to pair (e.g. incorrectly averaging $x_1$ with $y_2$ instead of $x_1$ with $x_2$) — the formula requires averaging $x$-coordinates TOGETHER and $y$-coordinates TOGETHER, never cross-pairing an $x$ with a $y$.

**Example 2 (LO2 — order independence)**: Verify that finding the midpoint of the segment from $(6,2)$ to $(2,8)$ (the SAME two points, swapped order) gives the same result as Example 1. Midpoint $=\left(\frac{6+2}{2},\frac{2+8}{2}\right)=(4,5)$ — matching Example 1 exactly, confirming order doesn't matter.

**Example 3 (LO3 — finding the other endpoint, breaking MC-2)**: A segment has midpoint $(5,3)$ and one endpoint $(1,7)$. Find the other endpoint. Using $x_2=2M_x-x_1=2(5)-1=9$ and $y_2=2M_y-y_1=2(3)-7=-1$: the other endpoint is $(9,-1)$. A common error attempts to find the other endpoint by simply SUBTRACTING the known endpoint from the midpoint (computing $(5-1,3-7)=(4,-4)$) rather than correctly using the DOUBLING relationship $x_2=2M_x-x_1$ — the midpoint is the AVERAGE, so recovering the missing endpoint requires reversing the averaging (doubling the midpoint, then subtracting the known endpoint), not a simple direct subtraction.

## Component 5 — Teaching Actions

### Teaching Action A01 — Average x's Together and y's Together, Never Cross-Pairing (Primitive P64: Conceptual Shift)

Work Example 1, explicitly pairing $x_1$ with $x_2$ and $y_1$ with $y_2$ separately.

- **MC-1 hook**: check whether coordinates are correctly paired (x with x, y with y) before averaging.

### Teaching Action A02 — Verifying Order Independence (reused procedure)

Work Example 2, explicitly re-computing with swapped labels to confirm the same result.

### Teaching Action A03 — Reversing the Formula to Find a Missing Endpoint (Primitive P11: Representation Shift)

Work Example 3, explicitly deriving and applying the doubling-and-subtracting reversal.

- **MC-2 hook**: this directly targets MC-2 (using simple subtraction instead of the correct doubling-and-subtracting reversal).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Find the midpoint of the segment from $(3,9)$ to $(7,1)$.
  2. Find the midpoint of the segment from $(-4,5)$ to $(2,-3)$.
  3. A segment has midpoint $(6,2)$ and one endpoint $(10,4)$. Find the other endpoint.
  4. Explain, in one sentence, why swapping the labels of the two endpoints doesn't change the computed midpoint.
- **P76 (Transfer Probe, mode = independence)**: "A delivery company wants to place a new distribution warehouse exactly halfway between two existing warehouses located at map coordinates $(2,10)$ and $(14,2)$ (in km, on a local grid). (a) Use the midpoint formula to find the ideal location for the new warehouse. (b) Suppose the company later discovers that one of the original warehouses (at $(2,10)$) needs to be relocated, but wants to keep the SAME midpoint location found in part (a) with a different second warehouse. If the new second warehouse must be at $(20,-2)$, verify whether the original midpoint location still works, or find the correct new midpoint."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | X-AND-Y-COORDINATES-CROSS-PAIRED-INSTEAD-OF-AVERAGED-SEPARATELY | Incorrectly cross-pairing an x-coordinate with a y-coordinate when applying the midpoint formula, instead of averaging x's together and y's together | Foundational |
| MC-2 | MISSING-ENDPOINT-FOUND-VIA-SIMPLE-SUBTRACTION-INSTEAD-OF-DOUBLING-AND-SUBTRACTING | Finding a missing endpoint by directly subtracting the known endpoint from the midpoint, rather than correctly doubling the midpoint first | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("X and Y Coordinates Cross-Paired Instead of Averaged Separately") → P41 (detect: present Example 1 and check whether coordinates are correctly paired before averaging) → P64 (conceptual shift: re-write the formula explicitly, labeling which coordinates pair together).
- **B02 (targets MC-2)**: P27 ("Missing Endpoint Found via Simple Subtraction Instead of Doubling and Subtracting") → P41 (detect: present Example 3 and check whether simple subtraction is (incorrectly) used) → P64 (conceptual shift: re-derive the reversal formula explicitly from the original averaging equation, solving for the unknown coordinate).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.coordinate-plane`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.geom.distance-formula`.

## Component 8 — Teaching Notes

- mastery_threshold = 0.90 reflects that this is a straightforward, formula-based application once the concept is understood.
- Both misconceptions were ranked Foundational because each produces a numerically wrong coordinate pair, not a minor imprecision.
- The warehouse-placement transfer probe was deliberately chosen because it gives the midpoint formula genuine logistics-planning relevance, and its second part exercises the reverse-application skill in a realistic scenario.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.coordinate-plane`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.90×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
