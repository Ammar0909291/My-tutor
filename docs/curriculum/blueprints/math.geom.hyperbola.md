# Teaching Blueprint: Hyperbola (`math.geom.hyperbola`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.hyperbola` |
| name | Hyperbola |
| domain | Geometry |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.geom.conic-sections` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — two-branch construction before the equation |
| description (KG) | A conic section where the difference of distances from two foci is constant; has two branches and asymptotes y = ±(b/a)x.

 |

## Component 1 — Learning Objectives

- LO1: Define a hyperbola as the set of points where the ABSOLUTE VALUE of the DIFFERENCE of distances to two fixed foci is a CONSTANT — contrasting directly with `math.geom.ellipse`'s SUM-based definition.
- LO2: Recognize a hyperbola has TWO SEPARATE branches (not one connected curve like an ellipse) — the standard equation $\frac{x^2}{a^2}-\frac{y^2}{b^2}=1$ produces a LEFT branch and a RIGHT branch, with NO points existing between them.
- LO3: State and use the ASYMPTOTES $y=\pm\frac{b}{a}x$ that the hyperbola's branches approach but NEVER TOUCH, as $x\to\pm\infty$ — and recognize these asymptotes come from the SAME $a,b$ values in the hyperbola's equation, not separately chosen constants.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.conic-sections` — the hyperbola is one of the four conic section types, contrasted directly with the ellipse.

## Component 3 — Core Explanation

A **hyperbola** is the set of ALL points where the ABSOLUTE VALUE of the DIFFERENCE of distances to two fixed foci is a CONSTANT — for every point $P$, $|$distance($P$, focus$_1$) $-$ distance($P$, focus$_2)|=$ a fixed value. This is a DIFFERENCE-based definition, directly contrasting with the ellipse's SUM-based definition (`math.geom.ellipse`) — the same "two foci" setup, but a fundamentally different constraint.

The standard equation $\frac{x^2}{a^2}-\frac{y^2}{b^2}=1$ (note the MINUS sign, unlike the ellipse's plus) produces a curve with TWO SEPARATE, disconnected BRANCHES (one opening right, one opening left) — there are NO points of the hyperbola between these branches; unlike an ellipse (one connected closed curve), the hyperbola is genuinely two distinct pieces.

The hyperbola's branches approach, but NEVER actually touch, two straight-line **asymptotes**: $y=\pm\frac{b}{a}x$. These asymptotes come DIRECTLY from the same $a,b$ constants appearing in the hyperbola's own equation — they are not independently chosen lines, but a structural consequence of the equation's specific $a,b$ values.

## Component 4 — Worked Examples

**Example 1 (LO1 — the two-foci-difference definition, breaking MC-1)**: For a hyperbola with foci at $(-5,0)$ and $(5,0)$, and constant difference 6, verify the point $(3,0)$ satisfies this. Distance from $(3,0)$ to $(-5,0)$ is 8; distance from $(3,0)$ to $(5,0)$ is 2. $|8-2|=6$ — matches the constant. A common error computes the SUM of the two distances (as if defining an ellipse) instead of the DIFFERENCE — the hyperbola's defining constraint is specifically a DIFFERENCE, the direct opposite of the ellipse's sum-based rule.

**Example 2 (LO2 — two disconnected branches)**: For $\frac{x^2}{4}-\frac{y^2}{9}=1$, verify that no points exist for $-2<x<2$ (between the two branches). Solving for $y^2$: $y^2=9\left(\frac{x^2}{4}-1\right)$ — for $|x|<2$, the term $\left(\frac{x^2}{4}-1\right)$ is NEGATIVE, making $y^2$ negative, which is IMPOSSIBLE for real $y$ — confirming no points exist in this gap region, consistent with the hyperbola's genuinely two-branch structure.

**Example 3 (LO3 — asymptotes from the same a,b, breaking MC-2)**: For $\frac{x^2}{4}-\frac{y^2}{9}=1$ (so $a^2=4,a=2$; $b^2=9,b=3$), find the asymptotes. Asymptotes: $y=\pm\frac{3}{2}x$. A common error treats the asymptotes as INDEPENDENT lines to be separately given or memorized, rather than DERIVING them directly from the SAME $a,b$ values already present in the hyperbola's equation — the asymptote slopes $\pm b/a$ come structurally from the equation itself, not from separate information.

## Component 5 — Teaching Actions

### Teaching Action A01 — Hyperbola Uses a Difference of Distances, Ellipse Uses a Sum (Primitive P06: Contrast Pair)

Work Example 1, explicitly contrasting the hyperbola's difference-based definition against the ellipse's sum-based one.

- **MC-1 hook**: this directly targets MC-1 (using a sum instead of a difference for the hyperbola's defining constraint).

### Teaching Action A02 — Verifying the Two-Branch Gap Algebraically (reused procedure)

Work Example 2, explicitly showing why no real points exist in the gap between branches.

### Teaching Action A03 — Asymptotes Are Derived from the Same a,b as the Equation (Primitive P64: Conceptual Shift)

Work Example 3, explicitly deriving the asymptote slopes directly from the equation's own $a,b$ values.

- **MC-2 hook**: this directly targets MC-2 (treating the asymptotes as independent, separately-given information rather than derived from the equation).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. For a hyperbola with foci at $(-6,0)$ and $(6,0)$ and constant difference 8, verify the point $(4,0)$ lies on it.
  2. Explain, in one sentence, the key difference between how ellipses and hyperbolas are defined in terms of their two foci.
  3. For $\frac{x^2}{16}-\frac{y^2}{25}=1$, find the asymptotes.
  4. Explain why no points of a hyperbola exist between its two branches.
- **P76 (Transfer Probe, mode = independence)**: "A physicist studying the trajectory of a comet that passes by the Sun only ONCE (never to return, unlike an elliptical-orbit comet) models its path as one BRANCH of a hyperbola, with the Sun at one focus. (a) Explain why only ONE branch of the hyperbola is physically relevant for this comet's actual trajectory, even though the full hyperbola equation has two branches. (b) Explain what the asymptotes of this hyperbolic path represent physically, in terms of the comet's direction of travel very far from the Sun."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | HYPERBOLA-DEFINING-CONSTRAINT-COMPUTED-AS-SUM-INSTEAD-OF-DIFFERENCE-OF-DISTANCES | Computing the sum of the two focal distances (as for an ellipse) instead of the difference, when verifying a point lies on a hyperbola | Foundational |
| MC-2 | ASYMPTOTES-TREATED-AS-INDEPENDENT-INFORMATION-RATHER-THAN-DERIVED-FROM-A-AND-B | Treating the hyperbola's asymptotes as separately given/memorized lines, rather than deriving their slopes directly from the same a,b values in the equation | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Hyperbola Defining Constraint Computed as Sum Instead of Difference of Distances") → P41 (detect: present Example 1 and check whether a sum is (incorrectly) computed instead of a difference) → P64 (conceptual shift: re-state the hyperbola's defining constraint explicitly, contrasting it with the ellipse's sum-based rule).
- **B02 (targets MC-2)**: P27 ("Asymptotes Treated as Independent Information Rather Than Derived from A and B") → P41 (detect: present Example 3 and check whether the asymptote slopes are correctly derived from $a,b$) → P64 (conceptual shift: re-derive the asymptotes explicitly from the equation's $a,b$ values, showing the structural connection).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.conic-sections`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.geom.ellipse` (the sum-based counterpart, directly contrasted).

## Component 8 — Teaching Notes

- estimated_hours = 6 reflects the genuine breadth of this concept, requiring careful contrast against the closely related ellipse.
- MC-1 was ranked Foundational because it produces a genuinely wrong verification result (confusing two structurally opposite conic definitions), while MC-2 was ranked Moderate as a missed structural insight that doesn't corrupt correct asymptote computation once the derivation is understood.
- The one-time-comet transfer probe was deliberately chosen because a genuinely non-returning hyperbolic trajectory (as opposed to an elliptical orbit) is a real astronomical phenomenon, giving both the single-relevant-branch and asymptotic-direction concepts concrete physical meaning.

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
| V-15 | CPA_entry_stage justified | PASS (Pictorial: two-branch construction before the equation) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
