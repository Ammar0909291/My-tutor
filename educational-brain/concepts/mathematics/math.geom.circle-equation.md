# math.geom.circle-equation

## Identity
- **KG ID**: `math.geom.circle-equation`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.circle`, `math.geom.coordinate-plane`
- **Unlocks**: `math.geom.conic-sections`
- **Cross-links**: `math.geom.conic-sections` (not yet authored — no Blueprint on disk; P76_mode = independence per the Blueprint's own verified determination).
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 4
- **Blueprint**: `docs/curriculum/blueprints/math.geom.circle-equation.md` (reused by reference throughout this entry).

## Learning Objective
The student will derive the standard-form circle equation (x−h)²+(y−k)²=r² from the distance formula, correctly squaring the radius; convert an expanded-form equation to standard form by completing the square, correctly recognizing when the result is a genuine circle, a degenerate point, or an empty set; and determine a point's position (inside, on, or outside a circle) by direct comparison, without needing to solve the equation.

## Core Understanding
Per the Blueprint's Component 3: a point (x,y) lies on a circle with center (h,k) and radius r exactly when its distance to the center equals r; squaring both sides of the distance-formula condition √((x−h)²+(y−k)²)=r gives the standard form (x−h)²+(y−k)²=r² — with r² (radius squared), not r itself, on the right. An expanded-form equation x²+y²+Dx+Ey+F=0 can be converted to standard form by completing the square on the x-terms and y-terms separately; the resulting constant on the right is the candidate radius². If that value is positive, the equation genuinely describes a circle; if it is exactly zero, the equation describes a single degenerate point (only the center satisfies it); if it is negative, the equation describes no real points at all (an empty set) — the algebra can produce a formally valid-looking equation that isn't a genuine circle. Checking a point's position relative to a circle requires no equation-solving: compute (x₀−h)²+(y₀−k)² directly and compare to r² — equal means on the circle, less means inside, greater means outside.

## Mental Models
1. **The squared-distance model** (Blueprint A01, P28): the standard form's right-hand side is r², not r, because it comes from squaring both sides of the distance-equals-radius condition — the squaring is never optional.
2. **The three-outcomes-from-completing-the-square model** (Blueprint A02, P06): completing the square on an expanded equation can reveal a genuine circle (positive constant), a degenerate single point (zero), or an empty set (negative) — not every such equation is automatically a real circle.
3. **The direct-comparison model** (Blueprint A03, P11): determining a point's position relative to a circle never requires solving for a variable — just compute (x−h)²+(y−k)² and compare it to r² directly.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is believing the standard-form equation has the radius itself, not the radius squared, on the right-hand side. A second failure is assuming every equation of the form x²+y²+Dx+Ey+F=0 necessarily represents a genuine circle, missing that completing the square can instead reveal a degenerate point or an empty set. A third failure is believing that determining a point's position relative to a circle requires solving the equation for a variable, missing the much simpler direct-comparison method.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — RADIUS-NOT-SQUARED-IN-EQUATION** (Foundational)
  - **Blueprint description**: believing the standard-form circle equation has the radius (not radius squared) on the right-hand side.
  - **Birth type**: Type 4, notation-induced — the symbol r appears prominently in verbal descriptions ("radius r"), and this surface familiarity with the bare symbol r is carried mistakenly into the equation, dropping the squaring step that the distance-formula derivation actually requires.
  - **Repair approach**: Blueprint Repair Action B01 — re-walking the point-on-circle verification, confirming a genuine boundary point satisfies the equation only with r² on the right, not r.

- **MC-2 — EXPANDED-FORM-ASSUMED-ALWAYS-A-GENUINE-CIRCLE** (Foundational)
  - **Blueprint description**: believing every equation of the form x²+y²+Dx+Ey+F=0 represents a genuine circle, missing that completing the square can yield a degenerate point or empty set.
  - **Birth type**: Type 1, overgeneralization — the completing-the-square PROCEDURE always runs successfully and produces SOME constant, and this procedural success is over-generalized into "the result is always a genuine circle," without checking the sign of that resulting constant.
  - **Repair approach**: Blueprint Repair Action B02 — the three-case contrast (positive constant = genuine circle, zero = degenerate point, negative = empty set) built from closely related equations differing only in their final constant term.

- **MC-3 — POSITION-CHECK-ASSUMED-TO-REQUIRE-SOLVING** (Moderate)
  - **Blueprint description**: believing determining a point's position relative to a circle requires solving the equation for a variable, missing the much simpler direct-comparison method.
  - **Birth type**: Type 6, analogy overextension — the general habit of "solve the equation" from earlier algebra work is over-applied here, where a much simpler direct-substitution comparison suffices and no solving step is needed at all.
  - **Repair approach**: Blueprint Repair Action B03 — re-walking the three direct-comparison examples (on, inside, outside), re-anchoring on "just plug in and compare to r², no solving required."

## Analogies
- **The service-radius analogy** (Blueprint Component 5, P76): a delivery service modeling its coverage area as a circle of radius 8km centered at a warehouse directly applies the standard-form equation and the direct-comparison position check to determine whether a customer's coordinates fall within range.

## Demonstrations
- Verifying that point (3,3) satisfies (x−3)²+(y+2)²=25 but would be wrongly rejected under the incorrect =5 form (Blueprint A01, Example 1), targeting MC-1.
- The three-case contrast from completing the square on closely related equations: a genuine circle (radius²=16), an empty set (radius²=−3), and a degenerate point (radius²=0) (Blueprint A02, Example 2), targeting MC-2.
- Determining a point's position (on, inside, outside) for three test points against one fixed circle, by direct arithmetic comparison alone (Blueprint A03, Example 3), targeting MC-3.

## Discovery Questions
1. "Is the right-hand side of the standard-form circle equation the radius, or the radius squared?"
2. "Does every equation that looks like x²+y²+Dx+Ey+F=0 automatically describe a real circle?"
3. "Do you need to solve a circle's equation for y to tell whether a given point is inside, on, or outside it?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: A01 (the right side is radius squared, not radius) → A02 (completing the square can reveal a degenerate or empty case) → A03 (position is determined by direct comparison) → A04 (Mastery Gate, P91).

## Tutor Actions
- **TEST-THINKING: Error Analysis** — verifying (3,3) against the correct versus incorrect right-hand side (Blueprint A01), targeting MC-1.
- **DO: Worked Example** — completing the square across three closely related equations to reveal circle/empty/degenerate outcomes (Blueprint A02), targeting MC-2.
- **SHOW: Demonstration** — the three direct-comparison position checks against one fixed circle (Blueprint A03), targeting MC-3.
- **TELL: Explanation** — the distance-formula derivation of the standard form, emphasizing the squaring step (Blueprint A01).

## Voice Teaching Notes
Before accepting a completed-square result as "a circle," ask "what sign is that constant — positive, zero, or negative?" as a standing check directly targeting MC-2.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 7 — cross_links target `math.geom.conic-sections` unauthored, verified via directory check before authoring)**: reused verbatim from the Blueprint's Component 5 A04 — the GPS delivery-radius scenario applying the standard-form equation, the direct-comparison position check, and the genuine-circle-versus-degenerate/empty verification an engineer should still perform.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set plus P76 (Component 5 A04), MAMR 5/5.

## Tutor Recovery Strategy
If MC-2 persists, require the student to state the sign of the completed-square constant explicitly (positive/zero/negative) before declaring any expanded equation "a circle," re-verifying against all three of the Blueprint's Example 2 cases until the check becomes automatic.

## Memory Hooks
- "The right side is radius SQUARED — squaring the distance formula is never optional."
- "Completing the square can reveal a genuine circle, a single point, or no points at all — check the sign."
- "Checking a point's position never needs solving — just compare (x−h)²+(y−k)² to r² directly."

## Transfer Connections
- `math.geom.conic-sections` (unlocks, cross-link) treats the circle's standard-form equation as the simplest instance of the general conic-section equation family.
- `math.geom.circle` and `math.geom.coordinate-plane` (require) supply the circle/center/radius definition and the distance formula this concept's algebraic derivation directly builds on, without re-teaching either.

## Cross-Subject Connections
- Physics: circular-orbit and field-boundary problems routinely use this standard-form equation and its direct-comparison position check to determine whether a point lies within a circular region.

## Blueprint References
`docs/curriculum/blueprints/math.geom.circle-equation.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (`math.geom.conic-sections` unauthored, independence mode) was independently re-verified at authoring time and remains accurate.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 5.
