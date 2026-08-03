# Teaching Blueprint: Parabola (`math.geom.parabola`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.parabola` |
| name | Parabola |
| domain | Geometry |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.geom.conic-sections`, `math.alg.quadratic-equation` |
| unlocks | (none in KG) |
| cross_links | `math.func.quadratic-function` |
| CPA_entry_stage | P (Pictorial) — focus-directrix construction before the equation |
| description (KG) | A conic section equidistant from a focus and a directrix; graph of a quadratic function; opens up/down (y = ax²+bx+c) or left/right (x = ay²+by+c).

 |

## Component 1 — Learning Objectives

- LO1: Define a parabola as the set of points EQUIDISTANT from a fixed FOCUS point and a fixed DIRECTRIX line — every point on the parabola satisfies distance-to-focus $=$ distance-to-directrix, EXACTLY.
- LO2: Recognize that $y=ax^2+bx+c$ produces a parabola opening UP or DOWN (vertical axis of symmetry), while $x=ay^2+by+c$ produces one opening LEFT or RIGHT (horizontal axis of symmetry) — the roles of $x$ and $y$ SWAP between these two forms, and confusing which variable is squared produces the wrong orientation.
- LO3: Recognize the sign of the leading coefficient $a$ determines the OPENING DIRECTION — for $y=ax^2+\ldots$, $a>0$ opens UP, $a<0$ opens DOWN (analogously LEFT/RIGHT for the $x=ay^2+\ldots$ form).

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.conic-sections` (the general family this belongs to) and `math.alg.quadratic-equation` (the algebraic form $y=ax^2+bx+c$).

## Component 3 — Core Explanation

A **parabola** is the set of ALL points EQUIDISTANT from a fixed point (the **focus**) and a fixed line (the **directrix**) — for every point $P$ on the parabola, distance($P$, focus) $=$ distance($P$, directrix), exactly.

Algebraically, a parabola is the graph of a quadratic relationship. The form $y=ax^2+bx+c$ produces a parabola with a VERTICAL axis of symmetry, opening UP (if $a>0$) or DOWN (if $a<0$). The form $x=ay^2+by+c$ (with $x$ and $y$'s roles SWAPPED) produces a parabola with a HORIZONTAL axis of symmetry, opening RIGHT (if $a>0$) or LEFT (if $a<0$) — these two forms are NOT interchangeable; which VARIABLE is squared determines the axis orientation entirely.

## Component 4 — Worked Examples

**Example 1 (LO1 — the equidistant definition)**: For a parabola with focus $(0,2)$ and directrix $y=-2$, verify that the point $(4,2)$... (actually verify a point ON the parabola, e.g. the vertex $(0,0)$): distance from $(0,0)$ to focus $(0,2)$ is 2; distance from $(0,0)$ to the directrix line $y=-2$ is also 2 — EQUAL, confirming $(0,0)$ lies on this parabola.

**Example 2 (LO2 — distinguishing vertical vs. horizontal opening, breaking MC-1)**: Determine the opening direction for $y=3x^2-2x+1$ versus $x=3y^2-2y+1$. The FIRST ($y=\ldots$, $x$ is squared) opens VERTICALLY (up, since $a=3>0$). The SECOND ($x=\ldots$, $y$ is squared) opens HORIZONTALLY (right, since $a=3>0$) — a DIFFERENT orientation from the first, despite having identical coefficients. A common error treats these two equations as describing the SAME shape just written differently, without recognizing that swapping which variable is squared genuinely changes the parabola's ORIENTATION (vertical-axis vs. horizontal-axis) — the two forms are structurally different, not just alternate notations for the same curve.

**Example 3 (LO3 — sign of a determines direction, breaking MC-2)**: Determine the opening direction for $y=-2x^2+5$. Since $a=-2<0$ (negative), this parabola opens DOWN. A common error assumes the SIGN of $a$ affects only how "steep" or "wide" the parabola is, without recognizing it also determines whether the parabola opens UP or DOWN (for the $y=ax^2+\ldots$ form) — a negative $a$ specifically FLIPS the opening direction, not merely adjusting steepness.

## Component 5 — Teaching Actions

### Teaching Action A01 — Verifying the Equidistant Focus-Directrix Definition (reused procedure)

Work Example 1, explicitly measuring both distances to confirm equality.

### Teaching Action A02 — Which Variable Is Squared Determines Vertical vs. Horizontal Orientation (Primitive P06: Contrast Pair)

Work Example 2, explicitly contrasting the two forms side by side to show the orientation swap.

- **MC-1 hook**: this directly targets MC-1 (treating the two forms as interchangeable rather than recognizing the orientation swap).

### Teaching Action A03 — The Sign of a Determines Opening Direction, Not Just Steepness (Primitive P64: Conceptual Shift)

Work Example 3, explicitly distinguishing the sign's effect on direction from the magnitude's effect on steepness/width.

- **MC-2 hook**: this directly targets MC-2 (assuming the sign of $a$ only affects steepness, missing its role in determining opening direction).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. State the opening direction of $y=5x^2-3x+2$.
  2. State the opening direction of $x=-4y^2+y-1$.
  3. Explain, in one sentence, why $y=ax^2+bx+c$ and $x=ay^2+by+c$ (with the same $a,b,c$) describe parabolas with different orientations.
  4. For $y=-\frac{1}{2}x^2+4$, state the opening direction and explain the role of the negative sign.
- **P76 (Transfer Probe, mode = independence)**: "A satellite dish's cross-sectional shape (in 2D profile) is a parabola, designed so that all incoming parallel radio signals reflect toward a single collection point — the FOCUS. (a) Explain, using the focus-directrix definition, why this reflective property makes physical sense for concentrating signals at one point. (b) If the dish's cross-section is modeled by $x=0.05y^2$ (a horizontal-opening parabola), explain why this form (rather than $y=0.05x^2$) is appropriate for a dish oriented to open sideways rather than upward."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | Y-EQUALS-AND-X-EQUALS-PARABOLA-FORMS-TREATED-AS-INTERCHANGEABLE | Treating y=ax²+bx+c and x=ay²+by+c as interchangeable forms describing the same shape, rather than recognizing the orientation swap | Foundational |
| MC-2 | SIGN-OF-A-ASSUMED-TO-ONLY-AFFECT-STEEPNESS-NOT-OPENING-DIRECTION | Assuming the sign of the leading coefficient a only affects the parabola's steepness/width, missing its role in determining the opening direction | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Y-Equals and X-Equals Parabola Forms Treated as Interchangeable") → P41 (detect: present Example 2 and check whether the two forms are (incorrectly) treated as identical) → P64 (conceptual shift: re-sketch both forms explicitly, confirming the axis of symmetry differs).
- **B02 (targets MC-2)**: P27 ("Sign of A Assumed to Only Affect Steepness Not Opening Direction") → P41 (detect: present Example 3 and check whether the negative sign's direction-flipping role is missed) → P64 (conceptual shift: re-evaluate the function at a few sample points, confirming the parabola genuinely opens downward, not merely "less steep").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.conic-sections`, `math.alg.quadratic-equation`.
- **Unlocks**: none recorded in the KG.
- **Cross-links**: `math.func.quadratic-function` (the functional/algebraic treatment of the same curve).

## Component 8 — Teaching Notes

- estimated_hours = 6 reflects the genuine breadth of connecting the geometric focus-directrix definition to the algebraic quadratic forms and their orientation properties.
- Both misconceptions were ranked Foundational because each produces a genuinely wrong geometric picture of the parabola's shape/orientation.
- The satellite-dish transfer probe was deliberately chosen because the parabola's reflective focusing property is one of its most famous and consequential real-world applications, giving the focus-directrix definition immediate physical significance.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.conic-sections`, `math.alg.quadratic-equation`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (`math.func.quadratic-function`) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: focus-directrix construction before the equation) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
