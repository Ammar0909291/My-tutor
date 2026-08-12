# Teaching Blueprint: Directional Derivative (`math.calc.directional-derivative`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.directional-derivative` |
| name | Directional Derivative |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.calc.gradient` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | The rate of change of f at a point in the direction of unit vector u: Dᵤf = ∇f · u; maximized when u is parallel to ∇f.

 |

## Component 1 — Learning Objectives

- LO1: Compute the directional derivative $D_uf=\nabla f\cdot u$, requiring $u$ to be a UNIT vector — if given a non-unit direction vector, it must be NORMALIZED first, or the formula gives an incorrect (scaled) result.
- LO2: State that the directional derivative is MAXIMIZED when $u$ points in the SAME direction as $\nabla f$ (giving the maximum rate of increase, equal to $|\nabla f|$), and MINIMIZED (most negative) when $u$ points OPPOSITE to $\nabla f$.
- LO3: Recognize the standard partial derivatives $f_x$ and $f_y$ as the SPECIAL CASES of the directional derivative in the directions $u=(1,0)$ and $u=(0,1)$ respectively.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.gradient` — the directional derivative is computed directly as the gradient dotted with a direction.

## Component 3 — Core Explanation

The **directional derivative** of $f$ at a point, in the direction of a UNIT vector $u$, is $D_uf=\nabla f\cdot u$ — the rate of change of $f$ as you move in that specific direction. Requiring $u$ to be a UNIT vector is essential: the formula measures rate of change PER UNIT DISTANCE traveled in direction $u$; using a non-unit vector would scale the result by that vector's length, giving a physically meaningless answer unless normalized first.

The directional derivative's value depends on the CHOICE of direction $u$, and is MAXIMIZED when $u$ points in the SAME direction as $\nabla f$ — at that specific direction, $D_uf=|\nabla f|$ (the gradient's magnitude), the steepest possible rate of INCREASE. Conversely, pointing $u$ OPPOSITE to $\nabla f$ gives the most NEGATIVE value, $-|\nabla f|$, the steepest decrease.

The ordinary partial derivatives are exactly the SPECIAL CASE directional derivatives along the coordinate axes: $f_x=D_{(1,0)}f$ and $f_y=D_{(0,1)}f$ — the directional derivative is the genuine GENERALIZATION, allowing rate of change to be measured in ANY direction, not just along the axes.

## Component 4 — Worked Examples

**Example 1 (LO1 — normalizing the direction vector, breaking MC-1)**: Find the directional derivative of $f(x,y)=x^2y$ at $(1,2)$ in the direction of $v=(3,4)$. First, $\nabla f=(2xy,x^2)$, so $\nabla f(1,2)=(4,1)$. The vector $v=(3,4)$ is NOT a unit vector ($|v|=5$) — normalize first: $u=\left(\frac{3}{5},\frac{4}{5}\right)$. $D_uf=(4,1)\cdot\left(\frac{3}{5},\frac{4}{5}\right)=\frac{12}{5}+\frac{4}{5}=\frac{16}{5}$. A common error computes $\nabla f\cdot v$ DIRECTLY using the non-normalized $v=(3,4)$ (giving $4(3)+1(4)=16$, a value 5 times too large) — forgetting the essential normalization step, since the directional derivative formula is specifically defined for UNIT vectors.

**Example 2 (LO2 — maximizing the directional derivative, breaking MC-2)**: For the same $f(x,y)=x^2y$ at $(1,2)$ with $\nabla f(1,2)=(4,1)$, find the direction of MAXIMUM increase and the maximum rate. The direction is $u=\frac{\nabla f}{|\nabla f|}=\frac{(4,1)}{\sqrt{17}}$, and the maximum rate is $|\nabla f|=\sqrt{17}$. A common error assumes the maximum directional derivative occurs in some "intuitive" direction like along an axis, or simply reports $\nabla f$'s components directly as "the maximum rate" without taking the magnitude — the maximum rate is specifically $|\nabla f|$ (a single number, the gradient's LENGTH), achieved ONLY when $u$ is the gradient's own normalized direction.

**Example 3 (LO3 — partial derivatives as special-case directional derivatives)**: Confirm that $D_{(1,0)}f=f_x$ for $f(x,y)=x^2y$ at $(1,2)$. $D_{(1,0)}f=\nabla f\cdot(1,0)=(4,1)\cdot(1,0)=4$, matching $f_x=2xy=2(1)(2)=4$ exactly — confirming the ordinary partial derivative IS the directional derivative along the $x$-axis direction.

## Component 5 — Teaching Actions

### Teaching Action A01 — Normalize the Direction Vector Before Applying the Formula (Primitive P64: Conceptual Shift)

Work Example 1, explicitly checking whether the given vector is a unit vector, and normalizing if not, before computing the dot product.

- **MC-1 hook**: check whether normalization is performed for a non-unit direction vector.

### Teaching Action A02 — Maximum Rate Is the Gradient's Magnitude, in the Gradient's Own Direction (Primitive P11: Representation Shift)

Work Example 2, explicitly distinguishing the maximizing DIRECTION (normalized gradient) from the maximum VALUE (gradient's magnitude).

- **MC-2 hook**: this directly targets MC-2 (reporting the gradient's components directly as the maximum rate, rather than its magnitude).

### Teaching Action A03 — Partial Derivatives Are Directional Derivatives Along the Axes (reused procedure)

Work Example 3, explicitly verifying the special-case connection.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Find the directional derivative of $f(x,y)=xy^2$ at $(2,1)$ in the direction of $v=(1,1)$ (normalizing first).
  2. Find the direction and magnitude of the maximum rate of increase of $f(x,y)=x^2+y^2$ at $(1,3)$.
  3. Confirm that $D_{(0,1)}f=f_y$ for $f(x,y)=x^3y$ at $(1,2)$.
  4. Explain, in one sentence, why the direction vector in the directional derivative formula must be a unit vector.
- **P76 (Transfer Probe, mode = independence)**: "A hiker standing at a specific point on a mountainside (modeled by an elevation function $f(x,y)$) wants to know how steeply the trail rises if they walk in a specific compass direction (NOT necessarily straight uphill). (a) Explain how the directional derivative formula answers this question, and why the direction vector representing their walking direction must first be converted to a unit vector. (b) Explain what direction the hiker should walk to gain elevation as fast as possible, and how steep that climb would be, in terms of the gradient at their current position."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DIRECTION-VECTOR-NOT-NORMALIZED-BEFORE-APPLYING-THE-FORMULA | Computing the directional derivative using a non-unit direction vector directly, without normalizing it first | Foundational |
| MC-2 | MAXIMUM-RATE-REPORTED-AS-GRADIENT-COMPONENTS-RATHER-THAN-ITS-MAGNITUDE | Reporting the gradient's components directly as the maximum directional derivative value, rather than correctly using the gradient's magnitude | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Direction Vector Not Normalized Before Applying the Formula") → P41 (detect: present Example 1 and check whether the vector is normalized before the dot product) → P64 (conceptual shift: re-compute the vector's magnitude explicitly and divide each component by it before applying the formula).
- **B02 (targets MC-2)**: P27 ("Maximum Rate Reported as Gradient Components Rather Than Its Magnitude") → P41 (detect: present Example 2 and check whether the gradient vector itself, rather than its magnitude, is reported as the maximum rate) → P64 (conceptual shift: re-derive the maximum rate explicitly as $|\nabla f|$, distinguishing it from the maximizing DIRECTION).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.gradient`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.calc.gradient` (the directional derivative is computed directly from it).

## Component 8 — Teaching Notes

- estimated_hours = 4 reflects that this concept is a fairly direct application of the gradient, once that prerequisite is solid, with the normalization requirement being the main added subtlety.
- Both misconceptions were ranked Foundational because each produces a numerically wrong answer (an incorrectly scaled directional derivative, or a wrong "maximum rate" value) rather than a mere imprecision.
- The hiker-on-a-mountainside transfer probe was deliberately chosen because it gives concrete physical meaning to both the general directional-derivative formula and the special maximum-increase case, distinguishing "steepness in a chosen direction" from "steepest possible climb."

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.calc.gradient`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
