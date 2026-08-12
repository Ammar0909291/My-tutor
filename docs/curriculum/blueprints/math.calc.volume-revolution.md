# Teaching Blueprint: Volumes of Revolution (`math.calc.volume-revolution`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.volume-revolution` |
| name | Volumes of Revolution |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 10 |
| requires | `math.calc.integral-area` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — visualize the solid before choosing a method |
| description (KG) | Volume of solid formed by rotating a region: disk method V = π∫f²dx; washer method V = π∫(f²−g²)dx; shell method V = 2π∫xf(x)dx.

 |

## Component 1 — Learning Objectives

- LO1: Apply the DISK method $V=\pi\int f(x)^2\,dx$ for a solid formed by rotating a region BOUNDED BY the axis of rotation directly (no gap between the region and the axis).
- LO2: Apply the WASHER method $V=\pi\int(f(x)^2-g(x)^2)\,dx$ when the rotated region has a GAP from the axis (an inner boundary $g(x)$ and outer boundary $f(x)$) — recognizing that OMITTING the inner-radius subtraction (using the disk method when a washer is needed) overcounts the volume by including a hollow region that shouldn't be there.
- LO3: Apply the SHELL method $V=2\pi\int xf(x)\,dx$ as an ALTERNATIVE approach (rotating around a vertical axis using horizontal-strip "shells" rather than vertical disks/washers) — and choose between disk/washer and shell methods based on which produces an EASIER integral for the given region and axis.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.integral-area` (definite integrals as area, extended here to volume via cross-sectional slicing).

## Component 3 — Core Explanation

**Volumes of revolution** compute the volume of a solid formed by rotating a 2D region around an axis, using three related methods, each suited to different situations:

The **disk method**, $V=\pi\int_a^bf(x)^2\,dx$, applies when the region touches the axis of rotation directly — each cross-sectional slice is a solid DISK of radius $f(x)$.

The **washer method**, $V=\pi\int_a^b(f(x)^2-g(x)^2)\,dx$, applies when there's a GAP between the region and the axis — each slice is a WASHER (an annulus, a disk with a hole), with OUTER radius $f(x)$ and INNER radius $g(x)$; the inner disk's volume must be SUBTRACTED, since the actual solid is genuinely hollow there.

The **shell method**, $V=2\pi\int_a^bxf(x)\,dx$, offers an ALTERNATIVE strategy: instead of slicing perpendicular to the axis (disks/washers), it uses cylindrical SHELLS parallel to the axis — often more convenient when rotating around a VERTICAL axis using a function naturally expressed as $y=f(x)$ (avoiding the need to solve for $x$ in terms of $y$).

Choosing the right method is a genuine skill: the disk/washer methods slice PERPENDICULAR to the axis of rotation, while the shell method slices PARALLEL to it — picking whichever orientation produces the SIMPLER integral for the specific region and axis.

## Component 4 — Worked Examples

**Example 1 (LO1 — basic disk method)**: Find the volume when the region under $f(x)=\sqrt{x}$ from $x=0$ to $x=4$ is rotated around the $x$-axis. Since the region touches the $x$-axis directly (no gap), use the disk method: $V=\pi\int_0^4(\sqrt{x})^2\,dx=\pi\int_0^4x\,dx=\pi\left[\frac{x^2}{2}\right]_0^4=\pi(8)=8\pi$.

**Example 2 (LO2 — washer method, breaking MC-1)**: Find the volume when the region BETWEEN $f(x)=\sqrt{x}$ and $g(x)=x/2$ (from $x=0$ to $x=4$, where $f(x)\ge g(x)$ on this interval) is rotated around the $x$-axis. Since this region has a GAP from the axis (the inner boundary $g(x)=x/2$ is not zero, except at $x=0$), use the WASHER method: $V=\pi\int_0^4\left[(\sqrt{x})^2-(x/2)^2\right]dx=\pi\int_0^4\left(x-\frac{x^2}{4}\right)dx=\pi\left[\frac{x^2}{2}-\frac{x^3}{12}\right]_0^4=\pi\left(8-\frac{64}{12}\right)=\pi\left(8-\frac{16}{3}\right)=\frac{8\pi}{3}$. A common error uses the DISK method (just $\pi\int f(x)^2\,dx$) here, ignoring the inner boundary $g(x)$ entirely — this OVERCOUNTS the volume by including the region between the axis and $g(x)$, which is NOT actually part of the solid (that inner region is hollow, not solid, since the rotated region itself starts at $g(x)$, not at 0).

**Example 3 (LO3 — choosing between disk/washer and shell, breaking MC-2)**: Find the volume when the region under $f(x)=x^2$ from $x=0$ to $x=2$ is rotated around the $y$-AXIS (a vertical axis). Using the SHELL method (natural here, since $f$ is expressed as $y=x^2$ and the axis is vertical): $V=2\pi\int_0^2x\cdot x^2\,dx=2\pi\int_0^2x^3\,dx=2\pi\left[\frac{x^4}{4}\right]_0^2=2\pi(4)=8\pi$. A common error attempts to force the DISK/WASHER method here by trying to solve for $x$ in terms of $y$ (getting $x=\sqrt{y}$) and re-setting up limits in $y$ — this CAN work but is often needlessly more complicated for THIS specific region/axis combination; recognizing that the shell method directly handles the original $y=f(x)$ form without solving for the inverse function is the more efficient choice here.

## Component 5 — Teaching Actions

### Teaching Action A01 — Disk Method for Regions Touching the Axis (reused procedure)

Work Example 1, explicitly confirming the region touches the axis directly before applying the disk method.

### Teaching Action A02 — Washer Method Subtracts the Inner Radius When There's a Gap (Primitive P06: Contrast Pair)

Work Example 2, explicitly contrasting the correct washer setup (subtracting $g(x)^2$) against the incorrect disk-only approach that overcounts.

- **MC-1 hook**: this directly targets MC-1 (using the disk method when a washer is needed, omitting the inner-radius subtraction).

### Teaching Action A03 — Choosing Shells vs. Disks/Washers Based on the Easier Integral (Primitive P11: Representation Shift)

Work Example 3, explicitly comparing the shell-method setup against the more cumbersome disk/washer-with-inverse-function alternative.

- **MC-2 hook**: this directly targets MC-2 (forcing the disk/washer method when the shell method would be more efficient for a vertical-axis rotation).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Find the volume when the region under $f(x)=x$ from $x=0$ to $x=3$ is rotated around the $x$-axis, using the disk method.
  2. Find the volume when the region between $f(x)=4$ and $g(x)=x^2$ (from $x=-2$ to $x=2$) is rotated around the $x$-axis, using the washer method.
  3. Explain, in one sentence, why the washer method subtracts the inner radius squared, rather than just the inner radius.
  4. Find the volume when the region under $f(x)=x^2$ from $x=0$ to $x=1$ is rotated around the $y$-axis, using the shell method.
- **P76 (Transfer Probe, mode = independence)**: "An engineer is designing a hollow, vase-shaped ceramic vessel by rotating a 2D profile curve (the outer wall shape $f(x)$ and the inner wall shape $g(x)$, both functions of height $x$) around a central vertical axis. (a) Explain why the washer method — NOT the disk method — is the correct approach for computing the amount of ceramic MATERIAL needed (as opposed to the total enclosed volume including the hollow interior). (b) Set up (but do not fully evaluate) the washer-method integral for the ceramic material's volume, given outer radius function $f(x)$ and inner radius function $g(x)$ over height range $[0,h]$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DISK-METHOD-USED-WHEN-A-GAP-FROM-THE-AXIS-REQUIRES-THE-WASHER-METHOD | Applying the disk method (ignoring the inner boundary) when the rotated region has a gap from the axis, overcounting the volume | Foundational |
| MC-2 | SHELL-METHOD-NOT-CONSIDERED-AS-THE-MORE-EFFICIENT-ALTERNATIVE-FOR-VERTICAL-AXIS-ROTATION | Forcing the disk/washer method (requiring solving for the inverse function) for a vertical-axis rotation, rather than recognizing the shell method as the more direct, efficient alternative | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Disk Method Used When a Gap from the Axis Requires the Washer Method") → P41 (detect: present Example 2 and check whether the inner boundary $g(x)$ is (incorrectly) omitted) → P64 (conceptual shift: re-sketch the cross-section as an annulus, explicitly identifying and subtracting the inner disk's contribution).
- **B02 (targets MC-2)**: P27 ("Shell Method Not Considered as the More Efficient Alternative for Vertical-Axis Rotation") → P41 (detect: present Example 3 and check whether the disk/washer method is (unnecessarily) forced via an inverse-function rewrite) → P64 (conceptual shift: re-set up the same problem using the shell method directly on the original $y=f(x)$ form, comparing the effort required).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.integral-area`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.geom.volume` (the geometric concept of volume this technique computes for revolution solids specifically).

## Component 8 — Teaching Notes

- estimated_hours = 10 (the highest in the domain by a wide margin) reflects the genuine breadth of this concept — three related but distinct methods, each requiring correct setup based on the specific geometric situation.
- MC-1 was ranked Foundational because it produces a substantially WRONG volume (an overcount, not a minor error), while MC-2 was ranked Moderate since the forced disk/washer approach, while inefficient, can still produce a correct answer if executed carefully.
- The ceramic-vessel transfer probe was deliberately chosen because computing "material used" (as opposed to total enclosed volume) is a genuinely practical application that makes the washer method's inner-radius subtraction concretely meaningful rather than an abstract formula requirement.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.calc.integral-area`) |
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
| V-15 | CPA_entry_stage justified | PASS (Pictorial: visualize the solid before choosing a method) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
