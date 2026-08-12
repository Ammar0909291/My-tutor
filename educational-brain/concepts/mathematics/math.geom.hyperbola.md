## Identity

- **KG ID**: `math.geom.hyperbola`
- **Name**: Hyperbola
- **Domain**: Geometry
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 6
- **Requires**: `math.geom.conic-sections`
- **Unlocks**: (none in current KG)
- **Cross-links**: (none in KG)

## Learning Objective

Given a hyperbola equation in standard or general form, the student:

(a) defines it as the locus of points where the absolute difference of distances to two foci equals a constant (2a);  
(b) distinguishes the standard forms x²/a² − y²/b² = 1 (horizontal, opening left-right) and y²/a² − x²/b² = 1 (vertical, opening up-down);  
(c) states the asymptotes y = ±(b/a)x for the horizontal form and y = ±(a/b)x for the vertical form;  
(d) computes the focal distance c from c² = a² + b²;  
(e) contrasts the hyperbola with the ellipse: difference vs. sum of focal distances, two branches vs. one closed curve, c² = a² + b² vs. c² = a² − b².

## Core Understanding

A **hyperbola** is the set of all points P where the **absolute difference** of distances to two fixed foci F₁ and F₂ is constant:

> |distance(P, F₁) − distance(P, F₂)| = 2a

This produces **two separate branches** — unlike the ellipse's single closed curve.

**Standard forms**:
- Horizontal (opening left-right): x²/a² − y²/b² = 1
- Vertical (opening up-down): y²/a² − x²/b² = 1

The term that is **positive** tells you which axis the branches open along.

**Asymptotes**: the branches approach but never reach the lines y = ±(b/a)x (horizontal form). As |x| → ∞, the hyperbola approaches the asymptotes but never crosses them.

**Focal distance**: c² = **a² + b²** (note: ADDITION, not subtraction — the key contrast with the ellipse's c² = a² − b²).

## Mental Models

- **Sonic boom**: an aircraft breaking the sound barrier creates a conical shockwave. The intersection of that cone with the ground is a hyperbola. The two branches represent where the boom arrives simultaneously from two different positions of the aircraft — the DIFFERENCE of distances to those two positions is constant.
- **Two open arms**: the hyperbola has two branches that "reach away" in opposite directions — unlike the ellipse, which curves back toward itself. The branches approach their asymptotes but never reach them, like two arms extending toward but never touching two diagonal lines.
- **Difference vs. sum**: the ellipse "adds up" (sum of distances = constant); the hyperbola "subtracts" (difference of distances = constant). Same two foci, completely different constraint — one produces a closed curve, the other produces two open branches.

## Why Students Fail

Students confuse the horizontal vs. vertical orientation — they look at the equation and assume the positive term's variable tells them where the foci are, without checking which standard form they are in. Students apply the ellipse's focal formula c² = a² − b² to the hyperbola (subtraction instead of addition), getting an imaginary c. Students also forget that the asymptotes are not a part of the hyperbola — they are guide lines that the curve approaches but never intersects.

## Misconceptions

### MC-1 — HYPERBOLA-OPENS-TOWARD-THE-POSITIVE-TERM
**Birth type**: Type 5 (instruction-induced — students learn the rule "the sign tells you the orientation" but state it imprecisely; the rule is correctly "the positive term's variable is the one the branches open along" but students apply it ambiguously)
**Mechanism**: For y²/9 − x²/4 = 1, students see the y² term is positive and correctly conclude the branches open along the y-axis (up-down). But for the equation x²/4 − y²/9 = 1, students say "positive x-term, so it opens in x-direction, toward the positive x-axis only" — confusing opening "along the x-axis" (both left AND right) with opening "toward the positive x side only."
**Diagnostic probe**: "Sketch the hyperbola x²/4 − y²/9 = 1. How many branches are there, and where do they open?" — watch for sketching only one branch (toward positive x) rather than two branches (both left and right).
**Characteristic phrases**: "The positive term goes right, so it opens right" / "There's only one branch — toward the positive side."

### MC-2 — FOCAL-FORMULA-SAME-AS-ELLIPSE
**Birth type**: Type 3 (language contamination — both ellipses and hyperbolas use a, b, c with similar names; the focal formula looks similar; students default to the ellipse formula they practiced more)
**Mechanism**: Students compute c² = a² − b² for the hyperbola, getting a negative number and an imaginary c — or not noticing the error and taking the wrong root. The correct formula for the hyperbola is c² = a² + b² (addition, not subtraction), because c > a always for a hyperbola (the foci are outside the vertices).
**Diagnostic probe**: "For x²/9 − y²/16 = 1, find c." — watch for c = √(9 − 16) (complex number, or "error") rather than correct c = √(9 + 16) = 5.
**Characteristic phrases**: "I get c = √(negative)" / "c² = a² − b², so c = √(9 − 16)."

### MC-3 — ASYMPTOTES-ARE-PART-OF-THE-HYPERBOLA
**Birth type**: Type 2 (perceptual intuition — on a graph, the hyperbola arms appear to merge with the asymptotes as x → ±∞; students sometimes shade the asymptotic region as if it belongs to the curve)
**Mechanism**: The hyperbola "approaches" the asymptotes so closely at large distances that students treat the asymptotes as part of the graph — connecting the branch to the asymptote, or shading the interior region. No point on the hyperbola lies on the asymptote (substitute y = (b/a)x into x²/a² − y²/b² = 1 → 0 = 1, a contradiction).
**Diagnostic probe**: "Does the point (100a, 100b) lie on the hyperbola x²/a² − y²/b² = 1?" — watch for "yes, it's on the asymptote so it's on the hyperbola."
**Characteristic phrases**: "The hyperbola goes along the asymptote" / "At infinity they meet."

## Analogies

- **Rail lines**: two railway lines extending to infinity, one northeast and one southeast from a central station, are like the asymptotes. The hyperbola's branches run alongside these lines, getting arbitrarily close but always keeping some separation — like two trains that run parallel to but never on those rails.
- **Cooling tower**: the silhouette of a nuclear cooling tower is a hyperbola rotated around its axis of symmetry (a "hyperboloid of revolution"). The narrowing waist and flaring top and bottom mirror the hyperbola's two-branch shape.

## Demonstrations

1. **Two-focus subtraction**: mark two foci 10 units apart. For any point P, compute |PF₁ − PF₂|. Show that for specific choices of P on the hyperbola with 2a = 6, this difference is always 6. Contrast with an ellipse on the same foci: for an ellipse with 2a = 14, the SUM PF₁ + PF₂ = 14 for every point.
2. **Asymptote verification**: substitute y = (b/a)x into x²/a² − y²/b² = 1 → x²/a² − x²/a² = 1 → 0 = 1. Contradiction. The asymptote is NOT part of the hyperbola. Then choose a large point on the asymptote and measure the distance to the nearest hyperbola branch — it is small but nonzero.
3. **Standard form identification**: present x²/4 − y²/9 = 1 (horizontal, branches left-right, asymptotes y = ±3x/2) side by side with y²/4 − x²/9 = 1 (vertical, branches up-down, asymptotes y = ±2x/3). Show how swapping which term is positive flips the orientation and the asymptote slopes.

## Discovery Questions

- "Can both foci of a hyperbola lie inside the hyperbola? Or are the foci always outside the curve?"
- "What happens to a hyperbola's shape as a → 0 (keeping the focal distance c fixed)? What does it approach?"
- "The asymptotes of x²/a² − y²/b² = 1 are y = ±(b/a)x. How do you write the equation of these two asymptotes as a single equation? (Hint: what does (y − (b/a)x)(y + (b/a)x) = 0 expand to?)"

## Teaching Sequence

1. Recall the conic classification from `math.geom.conic-sections`: hyperbola = opposite-sign coefficients.
2. State the definition: absolute difference of distances to two foci = 2a.
3. Introduce the two standard forms; emphasize the positive term reveals the opening direction.
4. Derive the asymptotes; verify they are not part of the hyperbola.
5. Derive c² = a² + b²; explicitly contrast with the ellipse's c² = a² − b².
6. Drill classification: horizontal vs. vertical, and locating foci and asymptotes.
7. Assessment gate.

## Tutor Actions

- **Blueprint Teaching Action A01**: definition and two-branch geometry — start with the subtraction constraint before any equation.
- **Blueprint Teaching Action A02**: standard form — both horizontal and vertical — with asymptote identification.
- **MC-2 intervention**: explicitly write the two focal formulas side by side — ELLIPSE: c² = a² − b²; HYPERBOLA: c² = a² + b². Point out the foci are OUTSIDE the vertices of a hyperbola (c > a), so the formula must produce c > a, which requires addition.
- **MC-3 intervention**: show algebraically that substituting the asymptote line into the hyperbola equation gives 0 = 1 (a contradiction) — no point on the asymptote is on the hyperbola.

## Voice Teaching Notes

- Say "DIFFERENCE of distances" for hyperbola every time — stress the DIFFERENCE word to distinguish from the ellipse's SUM.
- When stating the standard forms: "the positive term tells you which way the branches open."
- Latency signal: a student who computes c² = a² − b² for a hyperbola and gets a negative number but doesn't notice (rather than catching the sign error) is showing MC-2; prompt with "for a hyperbola, are the foci inside or outside the curve?"

## Assessment Signals

- **Entry check**: classify 4x² − 9y² = 36 as a conic type without rewriting (confirms `math.geom.conic-sections`); identify which variable is squared with the positive coefficient.
- **Standard-form probe**: convert 9x² − 4y² − 36x − 8y + 68 = 0 to standard form.
- **Asymptote probe**: for x²/4 − y²/9 = 1, state the equations of the asymptotes.
- **Focal probe**: for x²/9 − y²/16 = 1, find c.
- **Mastery gate**: 4/5 problems including one vertical hyperbola and one asymptote or focal problem.

## Tutor Recovery Strategy

- **MC-1 (orientation confusion)**: state the rule clearly: "there are always TWO branches, one on each side. The positive term's variable tells you which PAIR of sides — left-right or up-down." Draw both branches explicitly.
- **MC-2 (focal formula)**: state the geometric reason: for a hyperbola, the foci are OUTSIDE the curve — further from the center than the vertices, so c > a always. For c > a, the formula must be c² = a² + b² (addition makes c larger than a). For the ellipse, foci are INSIDE — c < a — so c² = a² − b² (subtraction makes c smaller than a).
- **MC-3 (asymptotes as part of curve)**: algebraic proof is decisive: substitute y = (b/a)x into the equation and get 0 = 1. "The asymptote is a LINE the hyperbola approaches but can never reach — they are different mathematical objects."

## Memory Hooks

- **Hyperbola = DIFFERENCE**: "hyper-bola HYPERs away (two branches going in opposite directions) — it uses the DIFFERENCE of distances."
- **c² formula for hyperbola**: "for hyperbola, c² ADDS — the foci are outside, so c is bigger than a, so you ADD."
- **Asymptotes**: "asymptote = almost touching, never touching."

## Transfer Connections

- `math.geom.ellipse`: the direct comparison — SUM (ellipse) vs. DIFFERENCE (hyperbola); c² = a² − b² (ellipse) vs. c² = a² + b² (hyperbola); one closed curve vs. two open branches. These two concepts are best understood together, not in isolation.
- `math.geom.conic-sections`: the hyperbola is classified by opposite-sign coefficients in the general second-degree equation — revisit this parent concept for the full family picture.

## Cross-Subject Connections

- Physics: a charged particle shot past another charged particle of the same sign follows a hyperbolic path — Rutherford scattering. The bombarding particle deflects along a hyperbolic trajectory with the target nucleus at one focus.
- Navigation: LORAN (Long Range Navigation) locates ships by measuring the DIFFERENCE in arrival times of signals from two land-based stations — equal difference contours are hyperbolas. The ship lies at the intersection of two such hyperbolas.

## Blueprint References

- Blueprint: `docs/curriculum/blueprints/math.geom.hyperbola.md` (PACKAGE_READY)
- This entry cites: Component 0 (metadata), Component 3 (Core Explanation), Component 1 (Learning Objectives LO1-LO3), misconceptions MC-1 (orientation), MC-2 (focal formula), MC-3 (asymptotes).
- Worked examples, mastery-probe specifications, and teaching-action sequences live in the Blueprint — not restated here.

## Runtime Asset References

- Explanation assets: `math.geom.hyperbola:EXPLANATION:en` (DRAFT, live-capture)
- Probe assets: `math.geom.hyperbola:PROBE:en` (DRAFT, live-capture; probes should target MC-1 branch orientation, MC-2 focal formula, MC-3 asymptote status)

## Curriculum Feedback

None at this time.

## Version History

- v1.0 — initial entry authored 2026-08-03
