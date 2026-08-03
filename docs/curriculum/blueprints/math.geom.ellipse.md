# Teaching Blueprint: Ellipse (`math.geom.ellipse`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.ellipse` |
| name | Ellipse |
| domain | Geometry |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.geom.conic-sections` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — two-pin-and-string construction before the equation |
| description (KG) | A conic section where the sum of distances from two foci is constant; equation x²/a² + y²/b² = 1; a circle is a special case with equal foci.

 |

## Component 1 — Learning Objectives

- LO1: Define an ellipse as the set of points where the SUM of distances to two fixed FOCI is a CONSTANT — for every point $P$ on the ellipse, distance($P$, focus 1) $+$ distance($P$, focus 2) $=$ a fixed total.
- LO2: Apply the standard equation $\frac{x^2}{a^2}+\frac{y^2}{b^2}=1$, correctly identifying which of $a,b$ is LARGER — the LARGER value corresponds to the SEMI-MAJOR axis (the longer direction), and its associated variable's axis is where the foci lie.
- LO3: Recognize a CIRCLE as the SPECIAL CASE of an ellipse where $a=b$ (equivalently, where the two foci COINCIDE at a single center point) — a circle is not a fundamentally different shape from an ellipse, but its most symmetric special case.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.conic-sections` — the ellipse is one of the four conic section types.

## Component 3 — Core Explanation

An **ellipse** is the set of ALL points where the SUM of distances to two fixed points (the **foci**) is a CONSTANT — for every point $P$ on the ellipse, distance($P$, focus$_1$) $+$ distance($P$, focus$_2$) $=$ a fixed value (this constant sum equals $2a$, twice the semi-major axis length).

The standard equation is $\frac{x^2}{a^2}+\frac{y^2}{b^2}=1$. Whichever of $a$ or $b$ is LARGER determines the SEMI-MAJOR axis (the longer "radius" direction) — and the FOCI lie along THAT longer axis (e.g. if $a>b$, the foci lie on the $x$-axis; if $b>a$, they lie on the $y$-axis). Simply memorizing "$a$ goes with $x$" without checking which is larger leads to placing the foci on the wrong axis.

A **circle** is the SPECIAL CASE of an ellipse where $a=b$ — the two foci COINCIDE at a single point (the circle's center), and the "sum of distances to two foci" constraint collapses to the ordinary circle definition (constant distance from ONE center point). A circle isn't a fundamentally different shape from an ellipse; it's the ellipse's most symmetric special case.

## Component 4 — Worked Examples

**Example 1 (LO1 — the two-foci-sum definition)**: For an ellipse with foci at $(-3,0)$ and $(3,0)$, and a constant sum of distances equal to 10, verify that the point $(5,0)$ satisfies this. Distance from $(5,0)$ to $(-3,0)$ is 8; distance from $(5,0)$ to $(3,0)$ is 2. Sum $=8+2=10$ — matches the constant, confirming $(5,0)$ lies on this ellipse.

**Example 2 (LO2 — identifying the major axis, breaking MC-1)**: For $\frac{x^2}{9}+\frac{y^2}{25}=1$, determine which axis is the major axis. Here $a^2=9$ ($a=3$) and $b^2=25$ ($b=5$) — since $25>9$, the LARGER value is associated with $y^2$, meaning the MAJOR axis is VERTICAL (along the $y$-axis), and the foci lie on the $y$-axis, NOT the $x$-axis. A common error assumes the variable UNDER $a^2$ (conventionally written first, associated with $x$) is always the major axis, without actually COMPARING the two denominators — the major axis is determined by which denominator is LARGER, regardless of which variable it's attached to or which term is written first in the equation.

**Example 3 (LO3 — circle as ellipse special case, breaking MC-2)**: For $\frac{x^2}{16}+\frac{y^2}{16}=1$ (where $a^2=b^2=16$), identify the shape. Since $a=b$, this is a CIRCLE of radius 4 — the "two foci" have collapsed to a single point (the origin), and the ellipse equation reduces to the familiar circle equation $x^2+y^2=16$. A common error treats circles and ellipses as entirely SEPARATE, unrelated shape categories (e.g. assuming a circle can never be described by the "ellipse" equation form) — a circle is genuinely a special (degenerate, in the two-foci sense) case of an ellipse, not a different category altogether.

## Component 5 — Teaching Actions

### Teaching Action A01 — Verifying the Constant-Sum-of-Distances Definition (reused procedure)

Work Example 1, explicitly measuring both focal distances and summing to confirm the constant.

### Teaching Action A02 — The Larger Denominator Determines the Major Axis, Not Position in the Equation (Primitive P64: Conceptual Shift)

Work Example 2, explicitly comparing the two denominators to correctly identify the major axis.

- **MC-1 hook**: this directly targets MC-1 (assuming the $x$-associated term is always the major axis without comparing denominators).

### Teaching Action A03 — Circles Are the a=b Special Case of Ellipses (Primitive P11: Representation Shift)

Work Example 3, explicitly showing the ellipse equation collapsing to the circle equation when $a=b$.

- **MC-2 hook**: this directly targets MC-2 (treating circles and ellipses as unrelated shape categories).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. For an ellipse with foci at $(-4,0)$ and $(4,0)$ and constant sum 12, verify the point $(6,0)$ lies on this ellipse.
  2. Determine the major axis direction for $\frac{x^2}{49}+\frac{y^2}{4}=1$.
  3. Determine the major axis direction for $\frac{x^2}{4}+\frac{y^2}{100}=1$.
  4. Explain, in one sentence, why a circle is considered a special case of an ellipse rather than a completely different shape.
- **P76 (Transfer Probe, mode = independence)**: "An astronomer models a planet's orbit around the Sun as an ellipse, with the Sun located at ONE of the two foci (not the center), per Kepler's first law of planetary motion. (a) Explain, using the ellipse's constant-sum-of-distances definition, why the planet's distance from the Sun genuinely VARIES throughout its orbit (rather than staying constant, as it would if the orbit were a circle centered on the Sun). (b) Explain under what special condition (relating $a$ and $b$) the orbit would become a perfect circle, and what would happen to the second focus in that case."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | MAJOR-AXIS-ASSUMED-FROM-VARIABLE-POSITION-RATHER-THAN-COMPARING-DENOMINATORS | Assuming the major axis is always associated with whichever variable is written first (conventionally x), without comparing the actual denominator values | Foundational |
| MC-2 | CIRCLE-AND-ELLIPSE-TREATED-AS-COMPLETELY-SEPARATE-UNRELATED-SHAPE-CATEGORIES | Treating circles and ellipses as entirely separate shape categories, rather than recognizing a circle as the special a=b case of an ellipse | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Major Axis Assumed from Variable Position Rather Than Comparing Denominators") → P41 (detect: present Example 2 and check whether the major axis is (incorrectly) assumed from variable position alone) → P64 (conceptual shift: re-compare the two denominators explicitly, identifying the larger one).
- **B02 (targets MC-2)**: P27 ("Circle and Ellipse Treated as Completely Separate Unrelated Shape Categories") → P41 (detect: present Example 3 and check whether the circle-as-special-case connection is missed) → P64 (conceptual shift: re-derive the circle equation directly from the ellipse equation by setting $a=b$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.conic-sections`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.geom.circle` (the special case), `math.geom.hyperbola` (the other two-foci conic, using difference instead of sum).

## Component 8 — Teaching Notes

- estimated_hours = 6 reflects the genuine breadth of connecting the geometric foci definition to the algebraic equation and its special circle case.
- MC-1 was ranked Foundational because it produces a genuinely wrong geometric picture of the ellipse's orientation, while MC-2 was ranked Moderate as primarily a conceptual-categorization issue that doesn't corrupt any specific correct computation once the circle case is properly understood.
- The planetary-orbit transfer probe was deliberately chosen because Kepler's first law is one of the most famous and consequential real-world applications of the ellipse's off-center-focus property, distinguishing it memorably from a circular orbit.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.conic-sections`) |
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
| V-15 | CPA_entry_stage justified | PASS (Pictorial: two-pin-and-string construction before the equation) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
