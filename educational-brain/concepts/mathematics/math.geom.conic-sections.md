## Identity

- **KG ID**: `math.geom.conic-sections`
- **Name**: Conic Sections
- **Domain**: Geometry
- **Difficulty**: proficient
- **Bloom level**: analyze
- **Mastery threshold**: 0.80
- **Estimated hours**: 15
- **Requires**: `math.geom.circle-equation`, `math.alg.quadratic-equation`
- **Unlocks**: `math.calc.parametric-curves`
- **Cross-links**: `math.calc.parametric-curves`

## Learning Objective

Given a second-degree equation in x and y, the student:

(a) classifies it as a circle, ellipse, parabola, or hyperbola by examining the coefficients A and C in Ax² + Cy² + Dx + Ey + F = 0;  
(b) converts any such equation to standard form by completing the square, directly applying the technique from `math.geom.circle-equation`;  
(c) recognizes that completing the square requires no new algebraic technique beyond what circle-equation work already established;  
(d) verifies that a given parametrization satisfies the algebraic equation, confirming algebraic and parametric representations are equivalent.

## Core Understanding

Circles, ellipses, parabolas, and hyperbolas are **not four separate topics** — they are all instances of the general second-degree equation:

> Ax² + Cy² + Dx + Ey + F = 0

The conic type is determined entirely by the coefficient pattern of A and C:
- **A = C ≠ 0**: circle
- **A, C same sign, unequal**: ellipse
- **A, C opposite signs**: hyperbola
- **Exactly one of A, C is zero**: parabola

**Completing the square** generalizes directly from `math.geom.circle-equation`'s technique — the only difference is that leading coefficients A and C need not both be 1, so each group must be divided through after completing the square.

**Geometric origin**: each conic arises from the intersection of a plane with a double cone. The angle of the cutting plane determines which type emerges — a natural unifying picture behind the coefficient-pattern classification.

## Mental Models

- **One equation, four faces**: the general second-degree equation is a single mathematical object that "wears four different faces" depending on how A and C relate. Learning to classify is learning to read the face from the coefficients, not memorizing four separate equation families.
- **Coefficient balance**: think of A and C as weights on a scale. Equal weights → perfect circular symmetry. Same side but unequal → stretched to an ellipse. Opposite sides → the equation "tears apart" into two hyperbolic branches. One weight missing → the symmetry collapses to one dimension, giving a parabola.
- **Circle as the special case**: the circle is not the "simplest" conic — it is the most SYMMETRIC one. The ellipse, hyperbola, and parabola are all more general; the circle is the edge case where the generality is at its minimum.

## Why Students Fail

Students memorize four separate conic section equations rather than recognizing the unifying coefficient-pattern structure. When completing the square for an ellipse or hyperbola, they apply the circle technique but forget to factor out the leading coefficient before completing the square, leading to algebraic errors. Students also confuse which axis corresponds to the larger of a and b in the ellipse's standard form, and which direction a hyperbola opens (left-right vs. up-down) from the equation.

## Misconceptions

### MC-1 — FOUR-SEPARATE-FAMILIES
**Birth type**: Type 5 (instruction-induced — textbooks typically present each conic in its own chapter with its own "type-specific" equation template, obscuring the common structure)
**Mechanism**: Students study circles, then ellipses, then hyperbolas, then parabolas as separate topics with separate formulas. When given a mixed problem set, they cannot classify without trial-and-error substitution into each template, because they never learned the unifying coefficient check.
**Diagnostic probe**: "What type of conic is 9x² − 4y² + 18x + 8y − 31 = 0? How do you know?" — watch for a student who cannot determine the type without algebraically manipulating the equation into a recognized template, rather than immediately identifying opposite signs on x² and y² as the hyperbola signature.
**Characteristic phrases**: "I need to put it in standard form first to know what it is" / "Is this one the ellipse formula or the hyperbola formula?"

### MC-2 — COMPLETING-THE-SQUARE-NEEDS-NEW-TECHNIQUE
**Birth type**: Type 5 (instruction-induced — ellipses and hyperbolas are sometimes taught with their own "special" completing-the-square steps that obscure the identical underlying algebra)
**Mechanism**: Students believe the ellipse/hyperbola case requires a different or more advanced technique than the circle case. In reality, the same steps apply; the only difference is factoring out the leading coefficient A or C from its respective group before completing the square.
**Diagnostic probe**: "Convert 4x² + 9y² − 16x + 18y − 11 = 0 to standard form." — watch for a student who attempts to complete the square on 4x² − 16x without first factoring out the 4, or who declares "I don't know how to do this for ellipses."
**Characteristic phrases**: "But we only learned how to complete the square for circles" / "The ellipse version is different, right?"

### MC-3 — SEMI-AXIS-LABEL-CONFUSION
**Birth type**: Type 4 (notation-induced — a and b in x²/a² + y²/b² = 1 look symmetric; students do not register that the LARGER value is a and its axis is the major one)
**Mechanism**: Students identify a and b from the equation but do not check which is larger and which axis it corresponds to. They place the foci along the wrong axis or draw the major axis in the wrong direction.
**Diagnostic probe**: "For x²/9 + y²/25 = 1, which direction is the major axis, and where are the foci?" — watch for "along the x-axis" rather than the correct "along the y-axis" (since 25 > 9, b > a, and b is under y²).
**Characteristic phrases**: "a = 3, b = 5, and the major axis is along x" / "a is always under x², right?"

## Analogies

- **Family tree**: conics are one family, not four strangers. The circle is a sibling to the ellipse, not a different species. Understanding the family relationship (the coefficient-pattern classification) is more powerful than memorizing four individual profiles.
- **Shadow of a cone**: hold a cone under a light and tilt it relative to a flat surface. The shadow on the surface is a conic section — tilt slightly for an ellipse, tilt more to cut through both sheets for a hyperbola, tilt just right for a parabola. The same cone, the same surface, four possible shadows depending only on orientation.

## Demonstrations

1. **Coefficient-pattern classification drill**: present five equations and classify each by inspection of A and C — 3x² + 3y² = 12 (circle, A = C), 4x² + 9y² = 36 (ellipse, same sign unequal), 9x² − 4y² = 36 (hyperbola, opposite signs), 2y² − 8x = 0 (parabola, A = 0), −x² − y² + 1 = 0 (circle, A = C = −1). No equation manipulation required — the classification is immediate from the coefficient pattern.
2. **Completing the square on an ellipse**: 4x² + 9y² − 16x + 18y − 11 = 0 → (step by step, explicitly matching each step to the circle procedure) → 4(x − 2)² + 9(y + 1)² = 36 → (x − 2)²/9 + (y + 1)²/4 = 1. Beside it, write the circle procedure for comparison — the steps are identical; only the leading coefficients differ.
3. **Parametrization check**: for the circle x² + y² = 9, verify (3 cos θ, 3 sin θ) satisfies it: (3 cos θ)² + (3 sin θ)² = 9(cos²θ + sin²θ) = 9. ✓ Then verify the ellipse (x − 2)²/9 + (y + 1)²/4 = 1 is satisfied by (2 + 3 cos θ, −1 + 2 sin θ). This concretely shows that algebraic and parametric representations describe the same curve.

## Discovery Questions

- "If you cut a cone with a plane parallel to the base, what conic do you get? What if you tilt the plane slightly? More?"
- "Can you find a single equation that looks like a conic but has no real graph (no actual points)? What does the coefficient pattern tell you?"
- "The circle is a special case of the ellipse. Is the ellipse a special case of the hyperbola? Or are they genuinely different families?"

## Teaching Sequence

1. Recall `math.geom.circle-equation`: standard form, completing the square, recognizing degenerate/empty cases.
2. State the general second-degree equation Ax² + Cy² + Dx + Ey + F = 0.
3. Classify the four conics by their A, C coefficient patterns — make the table explicit and drill classification by inspection.
4. Work through completing the square for an ellipse, marking each step as identical to the circle procedure.
5. Repeat for a hyperbola; address the division-by-36 step and the resulting minus sign in the standard form.
6. Address the parabola as the one-coefficient-zero case: only one variable is squared.
7. Introduce the parametric connection (cross-link probe mode — full treatment at `math.calc.parametric-curves`).
8. Assessment gate.

## Tutor Actions

- **Blueprint Teaching Action A01**: one-general-equation framing — present all four conics as instances of Ax² + Cy² + Dx + Ey + F = 0 before teaching any specific type.
- **Blueprint Teaching Action A02**: completing the square for ellipses and hyperbolas, explicitly paralleling the circle procedure.
- **MC-1 intervention**: before any standard-form work, drill coefficient-pattern classification by inspection on 10 equations — this builds the meta-skill that makes the rest of the topic coherent.
- **MC-3 intervention**: draw the ellipse with the major axis explicitly labeled based on WHICH denominator is larger, not which variable. Drill: "find the larger denominator first; that tells you the major axis direction."

## Voice Teaching Notes

- Say "classify by the coefficient pattern first" — make it a mantra before any algebraic manipulation.
- When completing the square for an ellipse or hyperbola, say "this is the same completing-the-square you already know — the only new step is factoring out the leading coefficient first."
- Latency signal: a long pause when asked to identify the conic type before completing the square signals MC-1; prompt with "look at the coefficients on x² and y² — what do you notice about their signs?"

## Assessment Signals

- **Entry check**: complete the square for x² + y² − 4x + 6y − 3 = 0 (confirms `math.geom.circle-equation`); factor 4x² + 16x by factoring out 4 first (confirms algebraic prerequisite).
- **Classification probe**: classify 3x² − 5y² + 12x + 10y − 2 = 0 without computing.
- **Standard-form probe**: convert 9x² + 4y² + 36x − 8y + 4 = 0 to standard form.
- **Semi-axis probe**: for x²/16 + y²/9 = 1, state the semi-axes, identify the major axis direction, and give the distance from center to each focus.
- **Mastery gate**: 4/5 problems including one classification problem and one completing-the-square conversion.

## Tutor Recovery Strategy

- **MC-1 (four families)**: return to the general equation; write it prominently. Show that EVERY example they have ever seen fits this one template. Ask: "what changes? Only A and C." The classification table is derived — never memorized in isolation.
- **MC-2 (completing the square)**: place the ellipse problem and a familiar circle problem side by side. Execute both completing-the-square procedures in parallel columns, one step at a time. At each step, say "same step here — only the number in front is different."
- **MC-3 (semi-axis confusion)**: teach the rule as "find the larger denominator first. Larger denominator → longer axis → that variable's axis is the major axis." Drill: "a is the SEMI-MAJOR axis length — so a is ALWAYS the larger of the two values, regardless of which variable it's under."

## Memory Hooks

- **Coefficient-pattern rule**: "same sign same, same sign unequal → ellipse, opposite signs → hyperbola, one missing → parabola; equal → circle."
- **Completing the square slogan**: "factor first, complete second" — always factor out the leading coefficient before completing the square.
- **Conic family motto**: "one equation, four faces" — the general second-degree equation is the one equation; the four conics are its four faces.

## Transfer Connections

- `math.geom.ellipse`, `math.geom.hyperbola`, `math.geom.parabola`: each is a dedicated concept covering the geometric properties, standard forms, and applications of one of the three non-circular conics. This entry provides the unifying foundation; those entries provide the specific depth.
- `math.calc.parametric-curves`: parametric representations of conics (e.g., (a cos t, b sin t) for an ellipse) are introduced here as a cross-link and developed fully there.

## Cross-Subject Connections

- Physics: conic sections describe orbital shapes in Newtonian gravity — every orbit is a conic (circle, ellipse, parabola, or hyperbola) with the gravitating body at a focus. The coefficient-pattern classification here directly determines whether a trajectory is bound (circle/ellipse) or unbound (parabola/hyperbola).
- Optics: parabolic mirrors focus parallel light to a single point (the focus); elliptical mirrors reflect from one focus to another. The optical properties are direct consequences of the focus-based geometric definitions of these conics.

## Blueprint References

- Blueprint: `docs/curriculum/blueprints/math.geom.conic-sections.md` (PACKAGE_READY)
- This entry cites: Component 0 (metadata), Component 3 (Core Explanation), Component 1 (Learning Objectives LO1-LO3), misconceptions MC-1 (four families), MC-2 (completing the square), MC-3 (semi-axis confusion).
- Worked examples, mastery-probe specifications, and teaching-action sequences live in the Blueprint — not restated here.

## Runtime Asset References

- Explanation assets: `math.geom.conic-sections:EXPLANATION:en` (DRAFT, live-capture)
- Probe assets: `math.geom.conic-sections:PROBE:en` (DRAFT, live-capture; probes should target MC-1 classification, MC-2 completing the square, MC-3 semi-axis)

## Curriculum Feedback

None at this time.

## Version History

- v1.0 — initial entry authored 2026-08-03
