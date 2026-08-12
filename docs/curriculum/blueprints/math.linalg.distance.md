# Teaching Blueprint: Distance Between Vectors (`math.linalg.distance`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.distance` |
| name | Distance Between Vectors |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 1 |
| requires | `math.linalg.norm` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — arrow-difference diagrams before symbolic formula |
| description (KG) | d(u,v) = \|u−v\|. Euclidean distance in ℝⁿ. The norm induces a metric satisfying non-negativity, symmetry, and triangle inequality.

 |

## Component 1 — Learning Objectives

- LO1: Compute the distance between two vectors $u,v$ as $d(u,v)=|u-v|$ (the norm of their difference).
- LO2: Verify the distance function satisfies the metric axioms: NON-NEGATIVITY ($d(u,v)\ge0$, with equality only when $u=v$), SYMMETRY ($d(u,v)=d(v,u)$), and the TRIANGLE INEQUALITY ($d(u,w)\le d(u,v)+d(v,w)$).
- LO3: Correctly compute $u-v$ (component-wise subtraction) BEFORE taking the norm — a common setup error is confusing this with other vector operations.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.norm` (vector length) — distance is defined directly in terms of the norm of a difference vector.

## Component 3 — Core Explanation

The **distance** between two vectors $u,v$ in $\mathbb{R}^n$ is $d(u,v)=|u-v|$ — the NORM (length) of their DIFFERENCE vector. This generalizes ordinary Euclidean distance (the straight-line distance between two points) to any dimension.

This distance function is a genuine METRIC, satisfying: **non-negativity** ($d(u,v)\ge0$ always, with $d(u,v)=0$ if and only if $u=v$); **symmetry** ($d(u,v)=d(v,u)$ — distance doesn't depend on which point is "first"); and the **triangle inequality** ($d(u,w)\le d(u,v)+d(v,w)$ — going directly from $u$ to $w$ is never longer than detouring through any intermediate point $v$).

## Component 4 — Worked Examples

**Example 1 (LO1, LO3 — basic computation, breaking MC-1)**: Find $d((1,2),(4,6))$. Compute $u-v=(1,2)-(4,6)=(-3,-4)$. Norm: $|(-3,-4)|=\sqrt{(-3)^2+(-4)^2}=\sqrt{9+16}=\sqrt{25}=5$. So $d(u,v)=5$. A common error computes $v-u$ INSTEAD of $u-v$ initially — though this happens to give the same FINAL distance (since $|{-x}|=|x|$ for the norm), the intermediate difference vector's sign matters for OTHER purposes, so consistently tracking which vector is subtracted from which is good practice, and truly swapping which is treated as "current position" vs. "target" matters conceptually even when the final magnitude coincides.

**Example 2 (LO2 — symmetry verification)**: Verify $d((1,2),(4,6))=d((4,6),(1,2))$: computing the reverse, $v-u=(4,6)-(1,2)=(3,4)$, norm $=\sqrt{9+16}=5$ — MATCHES the forward computation exactly, confirming symmetry directly (since $|-x|=|x|$ for any vector $x$).

**Example 3 (LO2 — triangle inequality, breaking MC-2)**: For $u=(0,0)$, $v=(3,0)$, $w=(3,4)$: $d(u,w)=|(0,0)-(3,4)|=\sqrt{9+16}=5$. $d(u,v)+d(v,w)=|(0,0)-(3,0)|+|(3,0)-(3,4)|=3+4=7$. Check: $5\le7$ ✓, confirming the triangle inequality (going directly is shorter than or equal to detouring). A common error assumes the triangle inequality means $d(u,w)$ must EQUAL $d(u,v)+d(v,w)$ always, rather than recognizing it as an INEQUALITY that can be strict (as here) or, in the special case where $u,v,w$ are COLLINEAR with $v$ between $u$ and $w$, an equality.

## Component 5 — Teaching Actions

### Teaching Action A01 — Subtract, Then Take the Norm (Primitive P64: Conceptual Shift)

Work Example 1, explicitly performing the subtraction step FIRST, then applying the norm formula, using an arrow diagram to show the difference vector connecting the two points.

- **MC-1 hook**: check whether $u-v$ (consistently ordered) is used, understanding that while the final magnitude is order-independent, careful consistent tracking remains good practice.

### Teaching Action A02 — Triangle Inequality Is an Inequality, Not Always Equality (Primitive P06: Contrast Pair)

Work Example 3's strict-inequality case against a (verbally described) collinear case where equality WOULD hold, showing the inequality can be strict or tight depending on the geometric configuration. State the rule: "the triangle inequality says the direct path is NEVER LONGER than a detour — it can be shorter (strict inequality, the usual case) or exactly equal (only when the points are collinear in the right order)."

- **MC-2 hook**: this directly targets MC-2 (assuming the triangle inequality is always a strict equality).

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Find $d((2,3),(5,7))$.
  2. Find $d((1,1,1),(4,5,1))$ in $\mathbb{R}^3$.
  3. Verify symmetry: compute $d(u,v)$ and $d(v,u)$ for $u=(2,-1)$, $v=(0,3)$, confirming they match.
  4. For $u=(0,0)$, $v=(1,0)$, $w=(2,0)$ (all on a line), verify the triangle inequality holds with EQUALITY, and explain why this collinear case is special.
- **P76 (Transfer Probe, mode = independence)**: "A delivery drone needs to fly directly from a warehouse at $(0,0)$ to a customer at $(30,40)$ (in km), but company policy also allows a scenic route via a charging station at $(30,0)$. (a) Compute the DIRECT distance from warehouse to customer, and the TOTAL distance via the charging-station detour. (b) Verify the triangle inequality holds for this scenario, and explain, using this lesson's discussion, why the direct route is guaranteed to never be LONGER than any detour route, regardless of where the intermediate stop is located."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DISTANCE-SUBTRACTION-ORDER-NOT-TRACKED-CONSISTENTLY | Not consistently tracking which vector is subtracted from which, even though the final distance magnitude happens to be unaffected | Minor |
| MC-2 | TRIANGLE-INEQUALITY-ASSUMED-ALWAYS-STRICT-EQUALITY | Believing $d(u,w)=d(u,v)+d(v,w)$ must always hold exactly, rather than recognizing it as an inequality (equality only in the special collinear case) | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Distance Subtraction Order Not Tracked Consistently") → P41 (detect: review a submitted computation for inconsistent subtraction order across problems) → P64 (conceptual shift: re-derive using a consistent convention — always "target minus current" or vice versa — while confirming the final magnitude is unaffected either way).
- **B02 (targets MC-2)**: P27 ("Triangle Inequality Assumed Always Strict Equality") → P41 (detect: present Example 3's non-collinear case and check whether equality is (incorrectly) expected) → P64 (conceptual shift: re-compute both sides explicitly, showing the strict inequality $5<7$, then contrast with a genuinely collinear example where equality holds).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.norm`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.linalg.angle-vectors` (another norm-based geometric quantity, computed similarly).

## Component 8 — Teaching Notes

- estimated_hours = 1 reflects that this is a direct, single-formula application once the norm is already mastered.
- MC-2 was ranked more significant than MC-1 because it represents a genuine misunderstanding of what "inequality" means in this metric-axiom context, while MC-1 is a minor procedural habit that doesn't actually corrupt the final answer.
- The drone-delivery transfer probe was deliberately chosen to give the triangle inequality concrete, intuitive meaning (a direct flight path is never longer than a detour), reinforcing the metric axiom's real-world obviousness once translated out of pure notation.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.linalg.norm`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.90×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: arrow-difference diagrams before symbols) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO3, Ex2→LO2, Ex3→LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
