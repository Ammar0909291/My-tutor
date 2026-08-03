# Teaching Blueprint: Two-Variable Inequalities (`math.alg.inequality-2var`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.inequality-2var` |
| name | Two-Variable Inequalities |
| domain | Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.alg.inequality-1var`, `math.alg.linear-equation-2var` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — shaded half-plane graphs before symbolic feasible-region work |
| description (KG) | An inequality ax + by < c (or ≤, >, ≥) whose solution is a half-plane; used in linear programming to define feasible regions.

 |

## Component 1 — Learning Objectives

- LO1: Graph a two-variable linear inequality $ax+by<c$ (or $\le,>,\ge$) by graphing the BOUNDARY LINE $ax+by=c$ and shading the correct half-plane.
- LO2: Correctly determine whether the boundary line is SOLID (included, for $\le$ or $\ge$) or DASHED (excluded, for $<$ or $>$).
- LO3: Determine which half-plane to shade by testing a specific POINT (typically the origin, when not on the boundary line) against the inequality.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.inequality-1var` (the general inequality relations $<,\le,>,\ge$) and `math.alg.linear-equation-2var` (graphing the boundary line itself).

## Component 3 — Core Explanation

A **two-variable linear inequality** $ax+by<c$ (or $\le,>,\ge$) has a solution set consisting of an entire HALF-PLANE — all points on one side of the boundary line $ax+by=c$. To graph it: (1) graph the boundary line; (2) make it SOLID if the inequality includes equality ($\le$ or $\ge$, meaning points ON the line are included) or DASHED if strict ($<$ or $>$, meaning points on the line are EXCLUDED); (3) TEST a point not on the line (the origin $(0,0)$ is usually convenient) — if it satisfies the inequality, shade the half-plane containing it; if not, shade the OTHER half-plane.

These inequalities are the building blocks of LINEAR PROGRAMMING, where multiple inequalities together define a FEASIBLE REGION (the intersection of all the half-planes).

## Component 4 — Worked Examples

**Example 1 (LO1, LO2, LO3 — full graphing process)**: Graph $2x+y<6$. Boundary line: $2x+y=6$ (a line through $(0,6)$ and $(3,0)$), drawn DASHED since the inequality is strict ($<$). Test the origin: $2(0)+0=0<6$ ✓ true, so shade the half-plane CONTAINING the origin.

**Example 2 (LO2 — solid vs. dashed boundary, breaking MC-1)**: Graph $x-y\ge2$. Boundary line: $x-y=2$, drawn SOLID since the inequality includes equality ($\ge$) — points exactly ON the line (like $(2,0)$) genuinely satisfy $x-y\ge2$ (since $2-0=2\ge2$ is true), so they must be INCLUDED in the solution set, requiring a solid line. A common error draws a dashed line regardless of the inequality symbol, treating boundary-line style as a fixed convention rather than something determined by whether equality is permitted.

**Example 3 (LO3 — testing a point when the origin is ON the boundary, breaking MC-2)**: Graph $y>2x$. The boundary line $y=2x$ passes THROUGH the origin $(0,0)$, so the origin CANNOT be used as a test point (it's on the line, giving no information about which side to shade). Instead, test a DIFFERENT point not on the line, e.g. $(1,0)$: is $0>2(1)=2$? NO, false — so shade the half-plane NOT containing $(1,0)$ (i.e., the side containing points like $(0,1)$, where $1>2(0)=0$ is true). A common error defaults to always testing the origin without first checking whether it actually lies on the boundary line.

## Component 5 — Teaching Actions

### Teaching Action A01 — Boundary Line, Then Test a Point (Primitive P64: Conceptual Shift)

Work Example 1 in full, drawing the boundary line, applying the dashed convention for the strict inequality, then testing the origin and shading accordingly — establishing the complete three-step process.

### Teaching Action A02 — Solid vs. Dashed Depends on Whether Equality Is Allowed (Primitive P06: Contrast Pair)

Work Example 2, explicitly checking whether a point ON the boundary line satisfies the inequality (it does, for $\ge$), directly justifying the solid-line convention rather than presenting it as an arbitrary rule. State the rule: "solid means the boundary itself is part of the answer ($\le$ or $\ge$); dashed means it's excluded ($<$ or $>$) — check the actual inequality symbol every time, don't assume."

- **MC-1 hook**: this directly targets MC-1 (using a fixed dashed/solid convention regardless of the actual inequality symbol).

### Teaching Action A03 — Choose a Test Point NOT on the Boundary Line (Primitive P06: Contrast Pair, second pairing)

Work Example 3, showing why the origin fails as a test point here (it's ON the line) and demonstrating the correct alternative-point selection process. State the rule: "before testing the origin by habit, check whether it actually lies on the boundary line — if it does, pick any other convenient point instead."

- **MC-2 hook**: this directly targets MC-2 (defaulting to the origin as a test point without checking it isn't on the boundary).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Graph $3x-2y\le12$, determining the boundary line style and correctly shaded region.
  2. Graph $y<-x+4$, using the origin as a test point.
  3. Graph $y\ge3x$, correctly identifying that the origin lies on the boundary and selecting an alternative test point.
  4. Explain, in one sentence, why a solid boundary line is used for $\ge$ but a dashed one for $>$.
- **P76 (Transfer Probe, mode = independence)**: "A factory's production constraint requires that the number of chairs $c$ and tables $t$ produced satisfy $3c+5t\le120$ (a labor-hour budget), with both $c\ge0$ and $t\ge0$ (can't produce negative amounts). (a) Graph the feasible region defined by all three inequalities together (the intersection of their half-planes). (b) A manager wants to know if producing 30 chairs and 10 tables is within the labor budget — determine this by testing the specific point $(30,10)$ against the inequality $3c+5t\le120$, without needing to fully re-draw the graph, and explain what a 'yes' or 'no' answer would mean for the factory's plan."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | BOUNDARY-LINE-STYLE-NOT-MATCHED-TO-INEQUALITY-SYMBOL | Using a fixed solid or dashed boundary line regardless of whether the actual inequality symbol includes equality | Foundational |
| MC-2 | ORIGIN-USED-AS-TEST-POINT-WITHOUT-CHECKING-IT-IS-OFF-THE-LINE | Defaulting to testing the origin without first verifying it doesn't lie on the boundary line, where it would give no useful information | Foundational |
| MC-3 | SHADED-HALF-PLANE-REVERSED | Shading the half-plane NOT containing the test point that satisfied the inequality (or vice versa), inverting the solution region | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Boundary Line Style Not Matched to Inequality Symbol") → P41 (detect: present Example 2 and check whether a dashed line is used despite the $\ge$ symbol) → P64 (conceptual shift: re-check whether a point on the line satisfies the inequality, directly justifying solid vs. dashed from that test).
- **B02 (targets MC-2)**: P27 ("Origin Used Without Checking It Is Off the Line") → P41 (detect: present Example 3 and check whether the origin is used as a test point despite lying on the boundary) → P64 (conceptual shift: re-verify whether $(0,0)$ satisfies the boundary EQUATION first, before attempting to use it as a test point).
- **B03 (targets MC-3)**: P27 ("Shaded Half-Plane Reversed") → P41 (detect: review a submitted graph for shading on the wrong side relative to the test point's result) → P64 (conceptual shift: re-verify the test point's TRUE/FALSE result against the inequality, then re-confirm the shaded region actually contains that point when the result was true).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.inequality-1var`, `math.alg.linear-equation-2var`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared; feeds forward into linear programming feasible-region work per the KG description, not separately authored in this batch.

## Component 8 — Teaching Notes

- estimated_hours = 5 reflects that this concept combines three genuinely separate sub-skills (line-drawing, solid/dashed determination, half-plane testing) into one multi-step graphing procedure.
- MC-1 and MC-2 are both ranked foundational because each corrupts the ENTIRE graph's correctness — a wrong line style misrepresents the boundary's inclusion, and testing a point on the line gives no shading information at all, potentially leading to an arbitrary (and possibly wrong) shading choice.
- The factory transfer probe was deliberately designed with a genuine linear-programming-style scenario (multiple simultaneous constraints) to preview this concept's stated forward application, while part (b)'s specific point-test task reinforces the test-point technique in a practical decision-making context.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.alg.inequality-1var`, `math.alg.linear-equation-2var`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: shaded half-planes before symbolic work) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2/LO3, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
