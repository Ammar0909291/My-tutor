# Teaching Blueprint: Conic Sections (`math.geom.conic-sections`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.conic-sections` |
| name | Conic Sections |
| domain | Geometry |
| difficulty | proficient |
| bloom | analyze |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 15 |
| requires | `math.geom.circle-equation`, `math.alg.quadratic-equation` |
| unlocks | `math.calc.parametric-curves` |
| cross_links | `math.calc.parametric-curves` |
| CPA_entry_stage | C (Concrete) — begins by classifying four specific equations by coefficient pattern before the general unifying statement |
| description (KG) | Curves formed by the intersection of a double cone and a plane: circles, ellipses, parabolas, and hyperbolas; unified by the general second-degree equation. |

## Component 1 — Learning Objectives

- LO1: Recognize that circles, ellipses, parabolas, and hyperbolas are ALL instances of the **general second-degree equation** $Ax^2+Cy^2+Dx+Ey+F=0$ (axis-aligned case), classified by the coefficient PATTERN of $A,C$: $A=C\ne0$ → circle; $A,C$ same sign but unequal → ellipse; $A,C$ opposite signs → hyperbola; exactly one of $A,C$ zero → parabola — NOT four unrelated equation families to memorize independently.
- LO2: Classify and convert a given second-degree equation to a recognizable standard form by completing the square, directly GENERALIZING `math.geom.circle-equation`'s own completing-the-square technique — the SAME algebraic method, applied with differing leading coefficients $A,C$, requires no new technique for ellipses or hyperbolas.
- LO3: Connect the ALGEBRAIC (equation) representation of a conic to its **parametric** representation (`math.calc.parametric-curves`) — verifying a specific parametrization satisfies the corresponding algebraic equation directly, confirming both views describe the identical curve.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.circle-equation` (standard-form circle equation, completing the square, distinguishing genuine circles from degenerate/empty cases) and `math.alg.quadratic-equation` (quadratic expressions and their algebraic manipulation).

## Component 3 — Core Explanation

**One general equation, four coefficient patterns**: every circle, ellipse, parabola, and hyperbola (in axis-aligned position) is an instance of $Ax^2+Cy^2+Dx+Ey+F=0$. The SPECIFIC conic that results is determined entirely by comparing $A$ and $C$: equal and nonzero gives a circle (`math.geom.circle-equation`'s own case, $A=C=1$ after normalizing); same sign but unequal magnitudes gives an ellipse (stretched unevenly); opposite signs gives a hyperbola (the equation's two "branches" separate along one axis); exactly one of $A,C$ being zero gives a parabola (only one variable appears squared). These are not four separate families — they are one general pattern, differentiated by a simple coefficient check.

**Completing the square generalizes directly, with no new technique**: `math.geom.circle-equation`'s completing-the-square conversion (grouping $x$-terms and $y$-terms, adding the appropriate constants to complete each square) applies UNCHANGED to ellipses and hyperbolas — the only difference is that the leading coefficients $A,C$ need not both equal $1$, so the completed squares must be divided through appropriately to reach a recognizable standard form (e.g., $\frac{(x-h)^2}{a^2}+\frac{(y-k)^2}{b^2}=1$ for an ellipse).

**Algebraic and parametric representations describe the identical curve**: a curve's equation (the algebraic, implicit relationship between $x$ and $y$) and its parametrization (an explicit $x(\theta),y(\theta)$ tracing the curve as $\theta$ varies, from `math.calc.parametric-curves`) are two consistent DESCRIPTIONS of the same set of points — substituting a valid parametrization's $x(\theta),y(\theta)$ into the algebraic equation must produce a true identity for every $\theta$, confirming neither representation is more fundamentally "the" curve than the other.

## Component 4 — Worked Examples

**Example 1 (LO1 — classifying four equations by coefficient pattern, breaking MC-1)**: (a) $x^2+y^2=9$ ($A=C=1$, equal, nonzero) → CIRCLE. (b) $4x^2+9y^2=36$ ($A=4,C=9$, same sign, unequal) → ELLIPSE. (c) $4x^2-9y^2=36$ ($A=4,C=-9$, opposite signs) → HYPERBOLA. (d) $y^2-8x=0$ ($A=0,C=1$ — exactly one is zero) → PARABOLA. All four arise from the IDENTICAL general form $Ax^2+Cy^2+Dx+Ey+F=0$ — differing only in the coefficient pattern of $A,C$, not in four unrelated equation types requiring separate memorization.

**Example 2 (LO2 — completing the square generalizes directly, breaking MC-2)**: For $4x^2+9y^2-16x+18y-11=0$: group and complete the square SEPARATELY on each variable (the identical technique from `math.geom.circle-equation`): $4(x^2-4x)+9(y^2+2y)=11$ $\Rightarrow$ $4(x^2-4x+4)+9(y^2+2y+1)=11+16+9=36$ $\Rightarrow$ $4(x-2)^2+9(y+1)^2=36$. Dividing by $36$: $\dfrac{(x-2)^2}9+\dfrac{(y+1)^2}4=1$ — an ellipse centered at $(2,-1)$ with semi-axes $3$ and $2$. This is the SAME completing-the-square procedure already mastered for circles, applied here with leading coefficients $4$ and $9$ instead of both being $1$ — no new algebraic technique was required.

**Example 3 (LO3 — algebraic and parametric views agree, cross-link probe, breaking MC-3)**: For the circle $x^2+y^2=9$ ($r=3$), the parametrization $x=3\cos\theta,y=3\sin\theta$ (from `math.calc.parametric-curves`) satisfies the algebraic equation directly: $(3\cos\theta)^2+(3\sin\theta)^2=9\cos^2\theta+9\sin^2\theta=9(\cos^2\theta+\sin^2\theta)=9$ ✓. For the ellipse $\dfrac{(x-2)^2}9+\dfrac{(y+1)^2}4=1$ from Example 2, the analogous parametrization $x=2+3\cos\theta,y=-1+2\sin\theta$ likewise satisfies it: $\dfrac{(3\cos\theta)^2}9+\dfrac{(2\sin\theta)^2}4=\cos^2\theta+\sin^2\theta=1$ ✓. Both the algebraic equation and the parametrization describe the identical curve — neither representation is more fundamentally "the" curve than the other.

## Component 5 — Teaching Actions

### Teaching Action A01 — One General Equation, Not Four Unrelated Families (Primitive P06: Contrast Pair)

Contrast Example 1's four equations side by side, all instances of $Ax^2+Cy^2+Dx+Ey+F=0$, differing only in the $A,C$ pattern. State: "circles, ellipses, parabolas, and hyperbolas are not four separate topics — they are one general equation, classified by a simple coefficient check."

- **MC-1 hook**: ask "are circles, ellipses, parabolas, and hyperbolas four completely separate equation types requiring independent memorization?" — a "yes" answer reveals MC-1 (missing that they are unified by one general second-degree equation, distinguished by coefficient pattern).

### Teaching Action A02 — Completing the Square Transfers Directly (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the identical grouping-and-completing procedure from circles converts the ellipse equation to standard form, needing only an extra division step for the unequal leading coefficients. State: "nothing new is required algebraically — the same technique, applied with different coefficients, handles ellipses and hyperbolas too."

- **MC-2 hook**: ask "does converting an ellipse or hyperbola equation to standard form require a fundamentally different algebraic technique from the one already mastered for circles?" — a "yes" answer reveals MC-2 (missing that completing the square generalizes directly).

### Teaching Action A03 — Algebraic and Parametric Views Are Consistent, Not Competing (Primitive P11: Representation Shift)

State: "a conic's equation and its parametrization aren't two different, competing definitions — they're two descriptions of literally the same curve, and a valid parametrization must satisfy the equation identically." Work Example 3's direct substitution-and-verification for both the circle and the ellipse.

- **MC-3 hook**: ask "are the algebraic equation and parametric representation of a conic unrelated, or is only one of them the 'true' definition of the curve?" — a "yes, only one is true" answer reveals MC-3 (missing that both representations describe the identical curve consistently).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Classify $x^2-4y^2=16$ by its coefficient pattern (circle, ellipse, parabola, or hyperbola), and justify.
  2. Complete the square on $x^2+4y^2-6x+16y+9=0$ to identify the conic type, center, and standard-form equation.
  3. Verify that the parametrization $x=4\cos\theta,y=2\sin\theta$ satisfies the ellipse equation $\dfrac{x^2}{16}+\dfrac{y^2}4=1$.
  4. Explain why $Ax^2+Cy^2+Dx+Ey+F=0$ with $A=0$ and $C=0$ simultaneously would not represent any of the four conic types.
- **P76 (Transfer Probe, mode = cross-link probe against `math.calc.parametric-curves`)**: "A robotics engineer programs a robotic arm to trace an elliptical path given by $\dfrac{(x-3)^2}{25}+\dfrac{(y-1)^2}9=1$, but the arm's motion controller only accepts parametric input $x(\theta),y(\theta)$, not implicit equations. (a) Using `math.calc.parametric-curves`'s own parametrization technique, write a parametrization $x(\theta),y(\theta)$ for this ellipse, and verify it satisfies the given algebraic equation directly. (b) A colleague argues 'since the controller uses the parametric form, the original algebraic equation is now irrelevant to the design — only the parametric version genuinely describes the intended path.' Explain, using this lesson's consistency principle, why this argument overstates the distinction between the two representations. (c) The colleague also proposes classifying the conic type directly from the parametric form alone, without reference to the algebraic equation's coefficients. Explain why the algebraic form's $A,C$ coefficient comparison remains the more direct classification tool, even when a parametrization is already available."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CONIC-TYPES-TREATED-AS-UNRELATED-FAMILIES | Believing circles, ellipses, parabolas, and hyperbolas are four separate, unrelated equation types, missing that they are unified by one general second-degree equation | Foundational |
| MC-2 | COMPLETING-SQUARE-ASSUMED-CIRCLE-SPECIFIC | Believing completing the square only works for circles and a fundamentally different technique is needed for ellipses/hyperbolas, missing that the identical procedure generalizes directly | Foundational |
| MC-3 | ALGEBRAIC-AND-PARAMETRIC-VIEWS-TREATED-AS-COMPETING | Believing a conic's algebraic equation and parametric representation are unrelated or that only one is the "true" definition, missing that both consistently describe the identical curve | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Conic Types Treated as Unrelated Families") → P41 (detect: ask a student whether circles/ellipses/parabolas/hyperbolas require four independent sets of equations to memorize, checking for "yes") → P64 (conceptual shift: re-walk Example 1's four-equation classification by coefficient pattern, re-anchoring on "one general equation, classified by comparing A and C").
- **B02 (targets MC-2)**: P27 (name it: "Completing the Square Assumed Circle-Specific") → P41 (detect: ask a student whether converting an ellipse equation to standard form needs a new technique beyond circle-completing-the-square, checking for "yes") → P64 (conceptual shift: re-walk Example 2's direct reuse of the circle technique on the ellipse equation, re-anchoring on "the same procedure, different coefficients").
- **B03 (targets MC-3)**: P27 (name it: "Algebraic and Parametric Views Treated as Competing") → P41 (detect: ask a student whether the algebraic equation or the parametrization is the "real" definition of a conic, checking for a one-sided answer) → P64 (conceptual shift: re-walk Example 3's direct substitution verification for both the circle and ellipse, re-anchoring on "both representations consistently describe the identical curve").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.circle-equation` (the completing-the-square technique this concept generalizes to ellipses and hyperbolas), `math.alg.quadratic-equation` (quadratic algebraic manipulation this concept's general second-degree equation builds on).
- **Unlocks**: `math.calc.parametric-curves` (this concept's KG-listed unlock; the parametric representations LO3 connects to).
- **Cross-link**: KG lists `math.calc.parametric-curves` as a cross-link — **authored** (checked via `ls docs/curriculum/blueprints/` before setting P76_mode). $P76_{mode}=$ **cross-link probe**, engaging directly with that concept's own parametrization technique to verify the algebraic/parametric consistency principle in LO3/Example 3.

## Component 8 — Teaching Notes

- estimated_hours = 15, the LARGEST budget in the corpus to date, reflects the BREADTH of unifying four historically-separate conic families under one general equation — deliberately scoped to the UNIFYING classification/conversion/parametric-consistency content only, explicitly NOT attempting the deep individual theory (foci, directrices, eccentricity, focus-directrix definitions) of each specific conic, which correctly belongs to this concept's own children `math.geom.parabola`, `math.geom.ellipse`, and `math.geom.hyperbola` (none yet authored) — this concept's job is the unifying second-degree-equation framework and its connection to already-mastered techniques, not an exhaustive treatment of each conic's individual deep properties.
- **Division of labor**: `math.geom.circle-equation` owns the circle-specific completing-the-square technique and standard form; `math.alg.quadratic-equation` owns general quadratic algebra. This concept, `math.geom.conic-sections`, deliberately does not re-derive either; it owns the UNIFYING coefficient-pattern classification across all four conic types, the generalization of the completing-the-square technique to non-circle cases, and the algebraic/parametric consistency check — explicitly deferring individual conic-specific deep theory to the not-yet-authored child concepts.
- Examples 2 and 3 deliberately reuse the SAME ellipse (from completing the square in Example 2, then parametrized in Example 3) across two learning objectives, so a learner sees one concrete conic carried through the full classification → standard-form → parametric-verification pipeline, rather than three unrelated examples.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.calc.parametric-curves authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe against math.calc.parametric-curves) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: four specific equations classified before the general unifying statement) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
