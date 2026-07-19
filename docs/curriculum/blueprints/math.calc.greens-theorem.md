# Teaching Blueprint: Green's Theorem (`math.calc.greens-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.greens-theorem` |
| name | Green's Theorem |
| domain | Calculus |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.65 → MAMR = ⌈0.65×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.calc.line-integrals`, `math.calc.double-integrals` |
| unlocks | `math.calc.stokes-theorem` |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) — expert learner already fluent in both line and double integrals; the theorem unifies both directly |
| description (KG) | Relates a line integral around a simple closed curve C to a double integral over the region D it encloses; a special case of Stokes' theorem in 2D. |

## Component 1 — Learning Objectives

- LO1: State **Green's Theorem** precisely: $\oint_CP\,dx+Q\,dy=\iint_D\left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)dA$, where $C$ is a **simple closed curve, traversed counterclockwise** (positive orientation), enclosing region $D$, and $P,Q$ are continuously differentiable **throughout all of $D$** — correctly verifying ALL of these hypotheses before applying the conclusion.
- LO2: Apply Green's Theorem to convert a direct line-integral computation into an equivalent double-integral computation, verifying BOTH approaches give the identical answer on one worked example — directly reusing `math.calc.line-integrals`' parametrization technique and `math.calc.double-integrals`' iterated-integral technique.
- LO3: Recognize that **reversing the curve's orientation** (clockwise instead of counterclockwise) **negates** the line integral's value — Green's Theorem's stated formula assumes counterclockwise orientation specifically, and applying it to a clockwise-traversed curve without accounting for the sign flip gives the wrong (negated) answer.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.line-integrals` (parametrizing a curve and computing $\int_CP\,dx+Q\,dy$ directly) and `math.calc.double-integrals` (evaluating $\iint_Df(x,y)\,dA$ via iterated integration, Fubini's theorem).

## Component 3 — Core Explanation

**Green's Theorem trades a boundary computation for an interior one — under specific hypotheses**: the theorem converts a line integral around a closed curve $C$ into a double integral over the enclosed region $D$. This requires: (1) $C$ is SIMPLE (doesn't cross itself) and CLOSED; (2) $C$ is traversed COUNTERCLOCKWISE (the region $D$ stays on the LEFT as you walk along $C$) — this is the theorem's assumed POSITIVE orientation; (3) $P$ and $Q$ (and their relevant partial derivatives $\partial Q/\partial x$, $\partial P/\partial y$) are continuous throughout the ENTIRE region $D$, not merely along the boundary curve $C$ itself — a singularity anywhere INSIDE $D$ invalidates the theorem's hypothesis, exactly as an enclosed singularity invalidates Cauchy's Theorem in complex analysis.

**Two equivalent computation paths, both directly reusing already-mastered techniques**: given a specific $P,Q,C,D$ satisfying the hypotheses, the LEFT side ($\oint_CP\,dx+Q\,dy$) can be computed directly via `math.calc.line-integrals`' parametrization technique, while the RIGHT side ($\iint_D(\partial Q/\partial x-\partial P/\partial y)\,dA$) can be computed via `math.calc.double-integrals`' iterated-integral technique — Green's Theorem guarantees these two, otherwise-independent computations, always agree.

**Orientation is not a free choice — reversing it negates the result**: the theorem's formula, as stated, specifically assumes $C$ is traversed counterclockwise. Traversing the SAME curve clockwise instead reverses the sign of the line integral (walking the identical geometric path in the opposite direction negates the accumulated integral) — applying the theorem's formula unchanged to a clockwise curve, without accounting for this sign flip, produces the wrong (negated) answer.

## Component 4 — Worked Examples

**Example 1 (LO1 — checking both hypotheses, including continuity throughout D, breaking MC-3)**: For $P=-y$, $Q=x$ over the unit disk $D=\{x^2+y^2\le1\}$: both $P,Q$ are polynomials, continuously differentiable EVERYWHERE, including throughout all of $D$ — Green's Theorem's hypotheses are cleanly satisfied. Contrast: $P=\dfrac{-y}{x^2+y^2}$, $Q=\dfrac x{x^2+y^2}$ (structurally analogous to the classic $1/z$ singularity from complex analysis) has a singularity at the origin $(0,0)$ — if $D$ includes the origin, the continuity-throughout-$D$ hypothesis FAILS, and Green's Theorem cannot be naively applied without first excluding the singular point (e.g., via a small excluded disk around the origin, analogous to how Cauchy's Theorem fails when a singularity is enclosed).

**Example 2 (LO2 — both computation paths agree, and the partial-derivative terms are not interchangeable, breaking MC-2)**: For $P=-y$, $Q=x$, $C$ = the unit circle (counterclockwise), $D$ = the unit disk. DIRECT line integral: parametrize $x=\cos\theta,y=\sin\theta$, $0\le\theta\le2\pi$: $\oint_C(-y\,dx+x\,dy)=\int_0^{2\pi}\left[-\sin\theta(-\sin\theta\,d\theta)+\cos\theta(\cos\theta\,d\theta)\right]=\int_0^{2\pi}(\sin^2\theta+\cos^2\theta)\,d\theta=\int_0^{2\pi}1\,d\theta=2\pi$. DOUBLE integral side, computed with the CORRECT term order: $\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}=1-(-1)=2$, so $\iint_D2\,dA=2\cdot\text{Area}(D)=2\cdot\pi(1)^2=2\pi$. Both paths give $2\pi=2\pi$ ✓. Contrast with the SWAPPED (incorrect) order, $\frac{\partial P}{\partial x}-\frac{\partial Q}{\partial y}=0-0=0$ (using $\partial P/\partial x=\partial(-y)/\partial x=0$ and $\partial Q/\partial y=\partial x/\partial y=0$) — a completely different, WRONG value of $0$, confirming the two partial-derivative terms are not interchangeable and must be taken in the theorem's specific order, $\partial Q/\partial x$ minus $\partial P/\partial y$.

**Example 3 (LO3 — reversing orientation negates the result, breaking MC-1)**: Using the SAME $P=-y,Q=x$ setup from Example 2, but now traversing the unit circle CLOCKWISE instead: reversing the direction of traversal reverses the sign of the parametrized line integral, giving $-2\pi$ instead of $+2\pi$ — genuinely different from Example 2's answer, despite the identical curve and identical $P,Q$. Applying Green's Theorem's formula (which assumes counterclockwise) naively and unchanged to this clockwise curve would incorrectly predict $+2\pi$ still — the sign flip must be accounted for explicitly whenever the curve's actual orientation is clockwise.

## Component 5 — Teaching Actions

### Teaching Action A01 — Continuity Must Hold Throughout D, Not Just Along C (Primitive P28: Conflict Evidence)

Present Example 1's direct evidence: the polynomial $P=-y,Q=x$ satisfies the hypotheses cleanly, while the singular $P,Q$ (analogous to $1/z$) fails the moment $D$ encloses the origin. State: "Green's Theorem's continuity hypothesis is about the ENTIRE enclosed region $D$, not merely the boundary curve $C$ itself — a single interior singularity invalidates it, just as in Cauchy's Theorem."

- **MC-3 hook**: ask "does Green's Theorem's hypothesis only require $P,Q$ to be well-behaved along the boundary curve $C$ itself?" — a "yes" answer reveals MC-3 (missing that continuity must hold throughout the entire enclosed region $D$, not just on $C$).

### Teaching Action A02 — The Partial-Derivative Terms Are Not Interchangeable (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the correct order $\partial Q/\partial x-\partial P/\partial y=2$ gives the matching answer $2\pi$, while the swapped order $\partial P/\partial x-\partial Q/\partial y=0$ gives a completely different, wrong value. State: "Green's Theorem doesn't just assert an abstract equality — it guarantees that a direct line-integral computation and a CORRECTLY-ORDERED double-integral computation will always agree; swapping which partial derivative comes first breaks that agreement entirely."

- **MC-2 hook**: ask "does it matter which order the two partial derivative terms are subtracted in Green's Theorem's double integral (∂Q/∂x − ∂P/∂y vs. ∂P/∂x − ∂Q/∂y)?" — a "no, either order works" answer reveals MC-2 (swapping the partial-derivative terms, missing that the theorem's specific order is not interchangeable).

### Teaching Action A03 — Reversing Orientation Reverses the Sign (Primitive P06: Contrast Pair)

Contrast Example 3's clockwise result ($-2\pi$) against Example 2's counterclockwise result ($+2\pi$) for the identical curve and identical $P,Q$. State: "Green's Theorem's formula assumes counterclockwise orientation specifically — traversing the same curve the other way flips the sign, and the formula must be applied with that in mind."

- **MC-1 hook**: ask "does the direction a closed curve is traversed (clockwise vs. counterclockwise) matter for the value of the line integral in Green's Theorem?" — a "no" answer reveals MC-1 (missing that reversing orientation negates the result).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State Green's Theorem's three hypotheses precisely (curve type/orientation; continuity domain) before applying it to any specific example.
  2. Compute $\oint_CxY\,dx+x^2\,dy$ (using $Q=x^2,P=xy$) over the boundary of the unit square via the double-integral side.
  3. A curve is traversed clockwise instead of the theorem's assumed counterclockwise. State what adjustment must be made to apply the theorem's formula correctly.
  4. Explain why $P=\dfrac{-y}{x^2+y^2},Q=\dfrac{x}{x^2+y^2}$ requires special care if $D$ includes the origin, referencing the theorem's continuity hypothesis.
- **P76 (Transfer Probe, mode = independence)**: "A fluid dynamics engineer computes the circulation of a 2D flow field around a closed curve using a direct line-integral parametrization, and separately (as a check) computes the double integral of the field's 'curl' term over the enclosed region. (a) Explain, using Green's Theorem, why both computations should agree, assuming the field is well-behaved everywhere inside the region. (b) The engineer discovers the flow field has a singularity (e.g., from a point vortex) exactly at the center of the enclosed region. Using this lesson's continuity-hypothesis reasoning, explain why the two computations might now disagree, or why Green's Theorem cannot be directly applied as stated. (c) A colleague, noticing the curve was actually traversed clockwise in the original setup (not counterclockwise), argues 'this shouldn't matter, since the theorem is about a fixed geometric curve, not really about direction.' Explain specifically why the colleague is incorrect."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ORIENTATION-ASSUMED-IRRELEVANT | Believing the direction a closed curve is traversed doesn't affect Green's Theorem's result, missing that reversing orientation negates the line integral | Foundational |
| MC-2 | PARTIAL-DERIVATIVE-TERMS-SWAPPED | Believing the double integral's two partial-derivative terms (∂Q/∂x and ∂P/∂y) can be subtracted in either order, missing that the theorem's specific order is not interchangeable | Foundational |
| MC-3 | CONTINUITY-HYPOTHESIS-LIMITED-TO-BOUNDARY | Believing Green's Theorem's continuity requirement applies only along the boundary curve C, missing that it must hold throughout the entire enclosed region D | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Orientation Assumed Irrelevant") → P41 (detect: ask a student whether reversing a curve's traversal direction changes Green's Theorem's computed value, checking for "no") → P64 (conceptual shift: re-walk Example 3's clockwise $-2\pi$ against Example 2's counterclockwise $+2\pi$ for the identical curve, re-anchoring on "the formula assumes counterclockwise; reversing it negates the result").
- **B02 (targets MC-2)**: P27 (name it: "Partial-Derivative Terms Swapped") → P41 (detect: ask a student to state Green's Theorem's double-integral integrand and check whether they write $\partial P/\partial x-\partial Q/\partial y$ instead of $\partial Q/\partial x-\partial P/\partial y$) → P64 (conceptual shift: re-walk Example 2's side-by-side correct-vs-swapped computation ($2$ vs. $0$), re-anchoring on "the order is fixed by the theorem's statement, not a free choice").
- **B03 (targets MC-3)**: P27 (name it: "Continuity Hypothesis Limited to Boundary") → P41 (detect: present the singular $P,Q$ example with $D$ enclosing the origin and ask whether Green's Theorem still applies directly, checking for "yes") → P64 (conceptual shift: re-walk Example 1's polynomial-vs-singular contrast, re-anchoring on "continuity must hold throughout the entire region D, not just along C").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.line-integrals` (the direct parametrization computation Example 2's left side reuses), `math.calc.double-integrals` (the iterated-integral computation Example 2's right side reuses).
- **Unlocks**: `math.calc.stokes-theorem` (Green's Theorem's own KG description names it "a special case of Stokes' theorem in 2D" — the 3D generalization this concept sets up directly).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 8 with an expert/analyze tag places this at a "3 TAs + gate" tier; the concept directly reuses both prerequisites' own computational techniques (rather than introducing new machinery), keeping the budget focused on hypothesis-verification, term-order discipline, and orientation discipline.
- Treating Green's Theorem as an entirely unrelated tool from Stokes' Theorem (rather than recognizing it as Stokes' Theorem's 2D special case, per the KG's own description) is a natural further contrast, deliberately left for `math.calc.stokes-theorem` (the unlocks target) to address directly once both theorems are actually available to compare side by side, rather than anticipated here in isolation.
- **Division of labor**: `math.calc.line-integrals` owns direct line-integral parametrization; `math.calc.double-integrals` owns iterated double-integral evaluation. This concept, `math.calc.greens-theorem`, deliberately does not re-teach either computation technique; it owns the EQUIVALENCE between them (under the stated hypotheses) and the three genuinely new disciplines this equivalence requires: respecting the theorem's fixed partial-derivative term order, verifying continuity throughout the full region (not just the boundary), and respecting the theorem's assumed counterclockwise orientation.
- Examples 2 and 3 deliberately reuse the SAME $P=-y,Q=x$ setup across two learning objectives — first to demonstrate the theorem's equivalence directly (both paths giving $2\pi$), then to isolate exactly what changes when orientation reverses (the identical setup, only the traversal direction changed, giving $-2\pi$) — maximizing the contrast's clarity.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (no cross_links listed → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.65×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already fluent in both prerequisites, unified directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
