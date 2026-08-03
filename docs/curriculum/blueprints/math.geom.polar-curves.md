# Teaching Blueprint: Polar Curves (`math.geom.polar-curves`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.polar-curves` |
| name | Polar Curves |
| domain | Geometry |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.70 → MAMR = ⌈0.70×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.geom.polar-coordinates` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — plot point-by-point before recognizing the curve family |
| description (KG) | Curves expressed in polar form r = f(θ); includes cardioids, roses, lemniscates, and Archimedean spirals.

 |

## Component 1 — Learning Objectives

- LO1: Plot a POLAR CURVE $r=f(\theta)$ by computing $r$ at several values of $\theta$ and marking each resulting $(r,\theta)$ point — recognizing that, unlike Cartesian $y=f(x)$ plotting, a NEGATIVE $r$ value means plotting the point in the OPPOSITE direction from $\theta$ (i.e., at angle $\theta+180°$).
- LO2: Recognize the KEY POLAR CURVE FAMILIES by their characteristic equation FORM — CARDIOID ($r=a(1+\cos\theta)$ or similar, a heart-like single loop), ROSE curves ($r=a\cos(n\theta)$ or $r=a\sin(n\theta)$, producing petal patterns), LEMNISCATE ($r^2=a^2\cos(2\theta)$, a figure-eight), and ARCHIMEDEAN SPIRAL ($r=a\theta$, a spiral expanding steadily outward).
- LO3: For ROSE curves specifically, determine the NUMBER of petals from $n$: if $n$ is ODD, there are EXACTLY $n$ petals; if $n$ is EVEN, there are $2n$ petals — a genuinely non-obvious counting rule that must be applied carefully, not assumed to always equal $n$.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.polar-coordinates` — polar curves are functions expressed directly in this coordinate system.

## Component 3 — Core Explanation

A **polar curve** is defined by an equation $r=f(\theta)$ — for each angle $\theta$, the function gives the corresponding RADIAL distance $r$ from the origin. Plotting requires care with NEGATIVE $r$ values: unlike ordinary Cartesian graphing, a negative $r$ at angle $\theta$ means the point is actually plotted in the OPPOSITE direction, at angle $\theta+180°$ (equivalently $\theta-180°$), at the POSITIVE distance $|r|$ from the origin.

Several classic polar curve FAMILIES recur throughout mathematics: the **cardioid** ($r=a(1+\cos\theta)$ or similar variants, a single heart-shaped loop); **rose curves** ($r=a\cos(n\theta)$ or $r=a\sin(n\theta)$, producing symmetric flower-petal patterns); the **lemniscate** ($r^2=a^2\cos(2\theta)$, a figure-eight shape); and the **Archimedean spiral** ($r=a\theta$, spiraling steadily outward as $\theta$ increases).

For ROSE curves specifically, the PETAL COUNT follows a genuinely non-obvious rule: if $n$ is ODD, the curve has EXACTLY $n$ petals; if $n$ is EVEN, it has $2n$ petals (DOUBLE $n$) — this even/odd distinction must be checked explicitly, not assumed to always simply equal $n$.

## Component 4 — Worked Examples

**Example 1 (LO1 — plotting with negative r, breaking MC-1)**: Plot the point given by $r=-3$ at $\theta=0°$. Since $r$ is NEGATIVE, this point is actually plotted at angle $0°+180°=180°$, at distance $3$ from the origin — i.e., at the same location as $(3,180°)$ would be, NOT simply "3 units in the $\theta=0°$ direction with a negative sign attached." A common error plots a negative $r$ value by simply marking a point "3 units away in the original $\theta$ direction, but on the negative side" (misinterpreting the sign as merely flipping which side of the origin along the SAME ray) — the correct interpretation flips the ANGLE by $180°$, landing the point on the OPPOSITE ray entirely.

**Example 2 (LO2 — identifying curve families)**: Identify the type of curve for $r=2(1+\cos\theta)$, $r=3\cos(4\theta)$, and $r^2=4\cos(2\theta)$. The first is a CARDIOID (matches the $r=a(1+\cos\theta)$ form). The second is a ROSE curve (matches $r=a\cos(n\theta)$, here $n=4$). The third is a LEMNISCATE (matches $r^2=a^2\cos(2\theta)$).

**Example 3 (LO3 — rose curve petal counting, breaking MC-2)**: Determine the number of petals for $r=3\cos(4\theta)$ (n=4, EVEN) and $r=5\sin(3\theta)$ (n=3, ODD). For $n=4$ (even): $2n=8$ petals. For $n=3$ (odd): EXACTLY $n=3$ petals. A common error assumes the petal count always simply EQUALS $n$ (e.g. assuming $r=3\cos(4\theta)$ has 4 petals, when it actually has 8) — the even/odd distinction genuinely changes the counting rule, and must be checked before stating the petal count.

## Component 5 — Teaching Actions

### Teaching Action A01 — Negative r Flips the Angle by 180°, Not Just the Distance's Sign (Primitive P64: Conceptual Shift)

Work Example 1, explicitly re-deriving the correct plotted location for a negative $r$ value.

- **MC-1 hook**: check whether negative $r$ is correctly interpreted as an angle-flip, not a same-direction sign flip.

### Teaching Action A02 — Recognizing Curve Families by Equation Form (reused procedure)

Work Example 2, explicitly matching each equation to its characteristic family form.

### Teaching Action A03 — Rose Petal Count Depends on Even/Odd n (Primitive P06: Contrast Pair)

Work Example 3, explicitly contrasting the odd-$n$ (exactly $n$ petals) and even-$n$ ($2n$ petals) cases side by side.

- **MC-2 hook**: this directly targets MC-2 (assuming the petal count always equals $n$, regardless of parity).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.70×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Plot the point given by $r=-4$ at $\theta=90°$, describing where it actually appears.
  2. Identify the curve family for $r=5\theta$.
  3. Identify the curve family for $r=2\sin(5\theta)$, and find its petal count.
  4. Identify the curve family for $r=3\cos(2\theta)$, and find its petal count.
- **P76 (Transfer Probe, mode = independence)**: "A radar antenna's signal-strength pattern (measuring how strongly it transmits in each direction) is modeled by the polar equation $r=4\cos(2\theta)$ (a rose-curve pattern), and an engineer needs to know how many distinct 'lobes' (directions of strong signal) the antenna produces. (a) Determine the number of petals/lobes this pattern has, being careful about the even/odd rule. (b) Explain what it would mean, physically, if the equation gave a negative $r$ value at some angle $\theta$ — connecting to the angle-flip interpretation from this lesson."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | NEGATIVE-R-PLOTTED-ON-SAME-RAY-INSTEAD-OF-ANGLE-FLIPPED-180-DEGREES | Plotting a negative r value on the same ray at the given angle, rather than correctly flipping the angle by 180° | Foundational |
| MC-2 | ROSE-CURVE-PETAL-COUNT-ASSUMED-TO-ALWAYS-EQUAL-N-REGARDLESS-OF-PARITY | Assuming a rose curve's petal count always equals n, without checking whether n is even (giving 2n petals) or odd (giving n petals) | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Negative R Plotted on Same Ray Instead of Angle-Flipped 180 Degrees") → P41 (detect: present Example 1 and check whether the point is (incorrectly) plotted on the original ray) → P64 (conceptual shift: re-derive the correct plotted location, explicitly flipping the angle by 180° before plotting the positive distance).
- **B02 (targets MC-2)**: P27 ("Rose Curve Petal Count Assumed to Always Equal N Regardless of Parity") → P41 (detect: present Example 3's even-$n$ case and check whether the petal count is (incorrectly) assumed equal to $n$) → P64 (conceptual shift: re-check whether $n$ is even or odd explicitly, applying the correct counting rule for each case).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.polar-coordinates`.
- **Unlocks**: none recorded in the KG.

## Component 8 — Teaching Notes

- estimated_hours = 6 reflects the genuine breadth of learning multiple distinct curve families plus the non-obvious plotting and counting rules.
- Both misconceptions were ranked Foundational because each produces a genuinely wrong graphical or numerical result, not a minor imprecision.
- The radar-antenna transfer probe was deliberately chosen because rose-curve-shaped signal patterns are a genuine real-world application in antenna engineering, giving the petal-counting rule concrete practical significance.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.polar-coordinates`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.70×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: plot point-by-point before recognizing the curve family) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
