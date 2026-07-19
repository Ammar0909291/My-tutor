# Teaching Blueprint: Equation of a Circle (`math.geom.circle-equation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.circle-equation` |
| name | Equation of a Circle |
| domain | Geometry |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.geom.circle`, `math.geom.coordinate-plane` |
| unlocks | `math.geom.conic-sections` |
| cross_links | `math.geom.conic-sections` |
| CPA_entry_stage | C (Concrete) — begins with the distance-formula derivation before the general standard-form pattern |
| description (KG) | The equation of a circle with center (h, k) and radius r is (x−h)² + (y−k)² = r²; derivable from the distance formula. |

## Component 1 — Learning Objectives

- LO1: Derive the standard-form circle equation $(x-h)^2+(y-k)^2=r^2$ directly from the distance formula — a circle is the set of points at distance EXACTLY $r$ from center $(h,k)$ — correctly squaring both sides (not leaving the radius unsquared).
- LO2: Convert a circle's equation from EXPANDED form ($x^2+y^2+Dx+Ey+F=0$) to standard form via completing the square, correctly identifying the center and radius — and recognize that NOT every such expanded equation represents a genuine circle: the resulting "radius²" can be zero (a single degenerate point) or negative (no real solutions at all).
- LO3: Apply the standard-form equation to determine whether a given point lies INSIDE, ON, or OUTSIDE a circle, by directly comparing $(x-h)^2+(y-k)^2$ to $r^2$ — without needing to solve the equation for either variable.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.circle` (circle definition, radius, center) and `math.geom.coordinate-plane` (Cartesian coordinates, the distance formula).

## Component 3 — Core Explanation

**The standard-form equation comes directly from the distance formula, squared correctly**: a point $(x,y)$ lies on a circle with center $(h,k)$ and radius $r$ exactly when its distance to the center equals $r$: $\sqrt{(x-h)^2+(y-k)^2}=r$. Squaring BOTH sides (removing the square root, since both sides are non-negative) gives $(x-h)^2+(y-k)^2=r^2$ — the RADIUS SQUARED appears on the right, not the radius itself.

**Expanded form must be converted via completing the square, and not every result is a genuine circle**: an equation like $x^2+y^2+Dx+Ey+F=0$ can be rewritten in standard form by completing the square on the $x$-terms and $y$-terms separately. The resulting constant on the right side is the candidate "radius²." If this value is POSITIVE, the equation genuinely describes a circle with that radius. If it is exactly ZERO, the equation describes a single DEGENERATE point (the only solution is the center itself — a "circle" with zero extent). If it is NEGATIVE, the equation describes NO real points at all (an empty set) — the algebra produces a formally valid-looking equation, but not a genuine circle.

**Checking a point's position uses direct comparison, no equation-solving needed**: for a point $(x_0,y_0)$ and circle $(x-h)^2+(y-k)^2=r^2$, compute $(x_0-h)^2+(y_0-k)^2$ directly and compare to $r^2$: if EQUAL, the point is ON the circle; if LESS, INSIDE; if GREATER, OUTSIDE. This direct comparison requires no algebraic manipulation of the circle's equation itself.

## Component 4 — Worked Examples

**Example 1 (LO1 — squaring the radius correctly, breaking MC-1)**: For center $(3,-2)$, radius $5$: the distance condition $\sqrt{(x-3)^2+(y+2)^2}=5$ squares to $(x-3)^2+(y+2)^2=25$ (NOT $=5$). Verify point $(3,3)$: $(3-3)^2+(3+2)^2=0+25=25=5^2$ ✓ — correctly confirmed on the circle. Using the WRONG equation $(x-3)^2+(y+2)^2=5$ instead would incorrectly reject this valid point, since $25\ne5$ — confirming the right side must be the radius SQUARED, not the radius itself.

**Example 2 (LO2 — completing the square, and recognizing degenerate/empty cases, breaking MC-2)**: For $x^2+y^2-4x+6y-3=0$: complete the square: $(x^2-4x+4)+(y^2+6y+9)=3+4+9=16$, giving $(x-2)^2+(y+3)^2=16=4^2$ — a genuine circle, center $(2,-3)$, radius $4$. Contrast: $x^2+y^2-4x+6y+16=0$: completing the square gives $(x-2)^2+(y+3)^2=-16+4+9=-3$ — a NEGATIVE "radius²," meaning NO real point satisfies this equation at all (not a circle, an empty set). Further contrast: $x^2+y^2-4x+6y+13=0$: completing the square gives $(x-2)^2+(y+3)^2=-13+4+9=0$ — exactly zero, meaning the ONLY solution is the single point $(2,-3)$ itself — a degenerate "circle" with no actual extent, not a genuine circle with positive radius.

**Example 3 (LO3 — direct comparison determines position, no solving needed, breaking MC-3)**: For the circle $(x-1)^2+(y-2)^2=25$ (center $(1,2)$, radius $5$): check $(4,6)$: $(4-1)^2+(6-2)^2=9+16=25=r^2$ — ON the circle. Check $(1,2)$ (the center): $(1-1)^2+(2-2)^2=0<25$ — INSIDE. Check $(10,10)$: $(10-1)^2+(10-2)^2=81+64=145>25$ — OUTSIDE. All three determined by direct arithmetic comparison of $(x-h)^2+(y-k)^2$ against $r^2$ — no need to solve the circle's equation for $y$ or otherwise manipulate it.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Right Side Is Radius Squared, Not Radius (Primitive P28: Conflict Evidence)

Present Example 1's direct evidence: the point $(3,3)$ satisfies $(x-3)^2+(y+2)^2=25$ but would be wrongly rejected under $=5$. State: "squaring the distance equation puts $r^2$ on the right — not $r$ — and this is not optional."

- **MC-1 hook**: ask "is the standard-form circle equation $(x-h)^2+(y-k)^2=r$, with just the radius (not squared) on the right?" — a "yes" answer reveals MC-1 (omitting the squaring of the radius).

### Teaching Action A02 — Completing the Square Can Reveal a Degenerate or Empty Case (Primitive P06: Contrast Pair)

Contrast Example 2's three cases: genuine circle (radius² $=16$), empty set (radius² $=-3$), and degenerate point (radius² $=0$). State: "not every expanded quadratic of this form describes an actual circle — completing the square can reveal it's a single point or has no real solutions at all."

- **MC-2 hook**: ask "does every equation of the form $x^2+y^2+Dx+Ey+F=0$ necessarily represent some genuine circle?" — a "yes" answer reveals MC-2 (missing that completing the square can yield a zero or negative "radius²," meaning a degenerate point or an empty set).

### Teaching Action A03 — Position Is Determined by Direct Comparison (Primitive P11: Representation Shift)

State: "checking whether a point is inside, on, or outside a circle never requires solving the equation — just plug in and compare $(x-h)^2+(y-k)^2$ to $r^2$ directly." Work Example 3's three direct comparisons.

- **MC-3 hook**: ask "does determining whether a point lies inside, on, or outside a circle require solving the circle's equation for one of the variables?" — a "yes" answer reveals MC-3 (missing the much simpler direct-comparison approach).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Write the standard-form equation for a circle with center $(-2,5)$ and radius $3$, and verify the point $(-2,8)$ lies on it.
  2. Convert $x^2+y^2+6x-2y+6=0$ to standard form, identifying the center and radius.
  3. Determine whether $x^2+y^2+2x+2y+3=0$ represents a genuine circle, a degenerate point, or an empty set.
  4. Without solving the equation, determine whether $(5,5)$ is inside, on, or outside the circle $(x-2)^2+(y-1)^2=20$.
- **P76 (Transfer Probe, mode = independence)**: "A GPS-based delivery system models a driver's service radius as a circle of radius $8$ km centered at a warehouse at coordinates $(0,0)$. (a) Write the standard-form equation for this service-area circle. (b) A customer at coordinates $(6,7)$ wants to know if they're within the service area, without the system needing to solve the circle's equation. Using this lesson's direct-comparison method, determine whether the customer is inside, on, or outside the service circle. (c) A software engineer, refactoring the system, proposes representing the service area using the expanded-form equation $x^2+y^2-64=0$ instead, arguing 'it's mathematically equivalent and simpler to store.' Using this lesson's degenerate/empty-case reasoning, explain what check the engineer should still perform before trusting that ANY expanded-form equation used elsewhere in the system genuinely represents a circle with positive radius, rather than a degenerate point or empty set."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | RADIUS-NOT-SQUARED-IN-EQUATION | Believing the standard-form circle equation has the radius (not radius squared) on the right-hand side | Foundational |
| MC-2 | EXPANDED-FORM-ASSUMED-ALWAYS-A-GENUINE-CIRCLE | Believing every equation of the form x²+y²+Dx+Ey+F=0 represents a genuine circle, missing that completing the square can yield a degenerate point or empty set | Foundational |
| MC-3 | POSITION-CHECK-ASSUMED-TO-REQUIRE-SOLVING | Believing determining a point's position relative to a circle requires solving the equation for a variable, missing the much simpler direct-comparison method | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Radius Not Squared in Equation") → P41 (detect: ask a student to write the standard-form equation for a given center/radius and check whether they omit the square on r) → P64 (conceptual shift: re-walk Example 1's point-on-circle verification, re-anchoring on "the right side is radius squared, from squaring the distance formula").
- **B02 (targets MC-2)**: P27 (name it: "Expanded Form Assumed Always a Genuine Circle") → P41 (detect: present an expanded equation yielding a negative "radius²" after completing the square and ask whether it's a circle, checking for "yes") → P64 (conceptual shift: re-walk Example 2's three-case contrast (genuine circle, empty set, degenerate point), re-anchoring on "completing the square can reveal the equation isn't a genuine circle at all").
- **B03 (targets MC-3)**: P27 (name it: "Position Check Assumed to Require Solving") → P41 (detect: ask a student to determine a point's position relative to a circle and check whether they attempt to solve the equation first) → P64 (conceptual shift: re-walk Example 3's three direct comparisons, re-anchoring on "just plug in and compare to r², no solving required").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.circle` (the circle/center/radius definition this concept's equation formalizes), `math.geom.coordinate-plane` (Cartesian coordinates and the distance formula this concept's derivation directly uses).
- **Unlocks**: `math.geom.conic-sections` (the circle equation is the simplest instance of the general conic-section equation family this concept sets up).
- **Cross-link**: KG lists `math.geom.conic-sections` as a cross-link — **not yet authored** (checked via `ls docs/curriculum/blueprints/` before setting P76_mode). $P76_{mode}=$ **independence**; a future revision may add a genuine cross-link transfer probe once that entry exists, connecting the circle's standard-form equation to the broader conic-section family (ellipses, parabolas, hyperbolas) as variations on the same completing-the-square technique.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a proficient/apply tag places this at a "3 TAs + gate" tier, appropriately compact given the concept directly reuses the already-mastered distance formula, focusing on the derivation, the completing-the-square conversion, and the direct-comparison position check as its three genuinely distinct skills.
- **Division of labor**: `math.geom.circle` owns the basic circle/center/radius definition; `math.geom.coordinate-plane` owns the distance formula. This concept, `math.geom.circle-equation`, deliberately does not re-teach either; it owns the ALGEBRAIC formalization of the circle as an equation, the completing-the-square conversion technique (including its degenerate/empty edge cases), and the direct-comparison position test.
- Example 2's three-way contrast (genuine circle, empty set, degenerate point) was deliberately built from three closely related constant terms ($-3$, $+16$, $+13$ in the original equations) differing only in the final constant, specifically to isolate how sensitively the completed-square result depends on that constant, rather than presenting three unrelated equations.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.geom.conic-sections unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: distance-formula derivation before the general standard-form pattern) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
