# Teaching Blueprint: Rotation (`math.geom.rotation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.rotation` |
| name | Rotation |
| domain | Geometry |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.geom.transformations`, `math.trig.trig-functions` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — turn a shape about a pivot before the matrix |
| description (KG) | A transformation that turns every point by angle θ about a fixed center; expressed by a 2×2 rotation matrix.

 |

## Component 1 — Learning Objectives

- LO1: Apply a rotation by angle $\theta$ about a FIXED CENTER — turning every point of the figure by the SAME angle $\theta$ (in the SAME direction, conventionally COUNTERCLOCKWISE for positive $\theta$), preserving each point's distance FROM the center.
- LO2: Apply the 2×2 rotation matrix $\begin{pmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{pmatrix}$ to rotate a point $(x,y)$ about the ORIGIN, connecting to `math.trig.trig-functions`.
- LO3: Recognize that rotation about a NON-ORIGIN center requires a THREE-STEP process — TRANSLATE the center to the origin, ROTATE using the standard matrix, then TRANSLATE BACK — a common shortcut error applies the origin-centered matrix directly to a point when rotating about a different center.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.transformations` (the general concept) and `math.trig.trig-functions` (needed for the rotation matrix's $\cos\theta$/$\sin\theta$ entries).

## Component 3 — Core Explanation

A **rotation** turns every point of a figure by the SAME angle $\theta$ about a FIXED center point, in a CONSISTENT direction (conventionally COUNTERCLOCKWISE for positive $\theta$) — every point's DISTANCE from the center stays exactly the same; only its angular position around the center changes.

For rotation about the ORIGIN specifically, a point $(x,y)$ maps to a new point given by the **rotation matrix**: $\begin{pmatrix}x'\\y'\end{pmatrix}=\begin{pmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{pmatrix}\begin{pmatrix}x\\y\end{pmatrix}$ — this matrix formula is derived directly from trigonometric relationships (`math.trig.trig-functions`) describing how a point's coordinates change as its angular position rotates.

Rotating about a center OTHER than the origin requires a THREE-STEP process: (1) TRANSLATE the entire figure so the desired center moves to the origin; (2) apply the standard rotation MATRIX (which only works correctly centered at the origin); (3) TRANSLATE BACK by reversing step 1's shift. Applying the origin-centered matrix DIRECTLY to a point when the true center of rotation is elsewhere produces an INCORRECT result.

## Component 4 — Worked Examples

**Example 1 (LO2 — rotation about the origin, breaking MC-1)**: Rotate the point $(3,0)$ by $90°$ about the origin. Using the matrix with $\theta=90°$ ($\cos90°=0$, $\sin90°=1$): $\begin{pmatrix}0&-1\\1&0\end{pmatrix}\begin{pmatrix}3\\0\end{pmatrix}=\begin{pmatrix}0\\3\end{pmatrix}$ — the point moves to $(0,3)$. A common error uses the WRONG sign convention in the matrix (swapping the $-\sin\theta$ and $\sin\theta$ positions, effectively rotating CLOCKWISE instead of counterclockwise for a positive $\theta$) — the standard matrix's specific arrangement (negative sine in the TOP-right position) corresponds to the standard COUNTERCLOCKWISE convention for positive angles.

**Example 2 (LO1 — preserving distance from center)**: For the rotation in Example 1, verify the point's distance from the origin is unchanged. Original point $(3,0)$: distance from origin $=3$. New point $(0,3)$: distance from origin $=\sqrt{0^2+3^2}=3$ — UNCHANGED, confirming rotation preserves distance from the center.

**Example 3 (LO3 — rotating about a non-origin center, breaking MC-2)**: Rotate the point $(5,4)$ by $90°$ about the center $(2,4)$ (NOT the origin). Step 1: translate so $(2,4)\to(0,0)$, meaning $(5,4)\to(5-2,4-4)=(3,0)$ (relative to the new temporary origin). Step 2: apply the rotation matrix to $(3,0)$ (as in Example 1): $\to(0,3)$. Step 3: translate back by adding $(2,4)$: $(0+2,3+4)=(2,7)$ — the final rotated point. A common error applies the rotation matrix DIRECTLY to the ORIGINAL point $(5,4)$ (skipping the translate-to-origin step), producing an entirely different, incorrect result — the matrix formula is valid ONLY for rotations centered at the origin; a non-origin center requires the full translate-rotate-translate-back sequence.

## Component 5 — Teaching Actions

### Teaching Action A01 — Applying the Rotation Matrix with the Correct Sign Convention (Primitive P64: Conceptual Shift)

Work Example 1, explicitly verifying the matrix's sign arrangement produces the correct counterclockwise direction.

- **MC-1 hook**: check whether the matrix's sign convention (negative sine in the top-right entry) is applied correctly.

### Teaching Action A02 — Distance from the Center Is Preserved (reused procedure)

Present Example 2, explicitly verifying the distance-preservation property.

### Teaching Action A03 — Rotating About a Non-Origin Center Requires Translate-Rotate-Translate-Back (Primitive P06: Contrast Pair)

Work Example 3, contrasting the correct three-step process against the incorrect direct-matrix-application shortcut.

- **MC-2 hook**: this directly targets MC-2 (applying the origin-centered matrix directly when rotating about a different center).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Rotate the point $(0,4)$ by $90°$ about the origin using the rotation matrix.
  2. Verify that the point's distance from the origin is preserved after the rotation in problem 1.
  3. Rotate the point $(6,3)$ by $90°$ about the center $(3,3)$, using the full three-step process.
  4. Explain, in one sentence, why the rotation matrix cannot be applied directly to a point when rotating about a non-origin center.
- **P76 (Transfer Probe, mode = independence)**: "A robotic arm's gripper needs to rotate a held object by $180°$ around a specific pivot point on the workbench (not the robot's own coordinate origin), located at $(10,5)$ in the workspace's coordinate system. (a) Describe the three-step process the control software must use to correctly compute the object's new position after this rotation. (b) Explain what would go wrong if the software's programmer mistakenly applied the standard rotation matrix directly to the object's coordinates, without first accounting for the pivot point's location."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ROTATION-MATRIX-SIGN-CONVENTION-REVERSED-PRODUCING-WRONG-DIRECTION | Reversing the rotation matrix's sign convention, producing a clockwise rotation instead of the standard counterclockwise direction for a positive angle | Foundational |
| MC-2 | ROTATION-MATRIX-APPLIED-DIRECTLY-TO-A-NON-ORIGIN-CENTERED-ROTATION | Applying the standard origin-centered rotation matrix directly to a point when the true center of rotation is elsewhere, skipping the required translate-rotate-translate-back process | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Rotation Matrix Sign Convention Reversed Producing Wrong Direction") → P41 (detect: present Example 1 and check whether the resulting direction is counterclockwise as expected) → P64 (conceptual shift: re-verify the matrix's sign arrangement explicitly against the standard counterclockwise convention).
- **B02 (targets MC-2)**: P27 ("Rotation Matrix Applied Directly to a Non-Origin-Centered Rotation") → P41 (detect: present Example 3 and check whether the translate-rotate-translate-back sequence is skipped) → P64 (conceptual shift: re-work the problem following all three steps explicitly).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.transformations`, `math.trig.trig-functions`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.linalg.rotation-matrix` (the general linear-algebra treatment of this matrix).
- **Parent**: `math.geom.transformations`.

## Component 8 — Teaching Notes

- estimated_hours = 4 reflects the genuine complexity of combining trigonometry, matrix application, and the translate-rotate-translate-back procedure for general centers.
- Both misconceptions were ranked Foundational because each produces a numerically and geometrically wrong result, not a minor imprecision.
- The robotic-arm transfer probe was deliberately chosen because rotating about an arbitrary pivot point (not the coordinate origin) is a genuinely common robotics/CAD software challenge, making the three-step procedure's necessity concretely motivated.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.transformations`, `math.trig.trig-functions`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: turn a shape about a pivot before the matrix) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO2, Ex2→LO1, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
