# Teaching Blueprint: Implicit Differentiation (`math.calc.implicit-differentiation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.implicit-differentiation` |
| name | Implicit Differentiation |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.calc.chain-rule` |
| unlocks | `math.calc.related-rates`, `math.calc.derivative-inverse-trig` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — differentiating a specific implicit equation (a circle) before the general "treat y as a function of x" procedure is stated abstractly |
| description (KG) | Differentiating both sides of an equation in x and y with respect to x, treating y as a function of x via the chain rule; gives dy/dx without solving for y. |

## Component 1 — Learning Objectives

- LO1: Differentiate both sides of an implicit equation in $x$ and $y$ with respect to $x$, treating $y$ as an (unspecified) function of $x$ — applying `math.calc.chain-rule` to EVERY $y$-term, since $d/dx[y^n] = n y^{n-1}\cdot(dy/dx)$ by the chain rule with $y(x)$ as the inner function — and solve algebraically for $dy/dx$.
- LO2: Recognize why implicit differentiation is genuinely necessary for equations that cannot be solved explicitly for $y$ as a function of $x$ in closed form (e.g. $x^3+y^3=6xy$), and successfully find $dy/dx$ directly, without ever solving for $y$ itself.
- LO3: Correctly distinguish differentiating an $x$-term (ordinary power rule, no extra factor) from a $y$-term (chain-rule factor $dy/dx$ REQUIRED every time), and recognize that implicit differentiation remains the PREFERRED method even for equations that COULD be solved explicitly — since it avoids handling multiple branches (e.g. $\pm$ cases) separately.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.chain-rule` ($(f\circ g)'(x)=f'(g(x))\cdot g'(x)$; the outer derivative must be evaluated AT the inner function, not at $x$; the inner-derivative factor must never be omitted).

## Component 3 — Core Explanation

**Every y-term needs the chain-rule factor $dy/dx$**: when an equation mixes $x$ and $y$ and $y$ is understood to be some function of $x$ (even without an explicit formula for it), differentiating a term like $y^n$ with respect to $x$ means applying the chain rule with $y(x)$ as the INNER function: $\dfrac{d}{dx}[y^n] = ny^{n-1}\cdot\dfrac{dy}{dx}$ — the factor $dy/dx$ is not optional decoration; it is exactly `math.calc.chain-rule`'s own inner-derivative factor, required every single time a $y$-term is differentiated, in stark contrast to an $x$-term like $x^n$, which needs no such extra factor ($d/dx[x^n]=nx^{n-1}$ alone, since $x$ is literally the variable being differentiated with respect to).

**Why implicit differentiation is genuinely necessary, not just a shortcut**: some equations relating $x$ and $y$ (like $x^3+y^3=6xy$, the classic "folium of Descartes") cannot be algebraically rearranged into an explicit formula $y=f(x)$ at all, using elementary functions. Implicit differentiation sidesteps this entirely: differentiate BOTH sides of the equation with respect to $x$ (applying the chain rule to every $y$-term, and the product rule wherever $x$ and $y$ are multiplied together), then solve the resulting equation algebraically for $dy/dx$ — obtaining the derivative WITHOUT ever needing an explicit formula for $y$ itself.

**Implicit differentiation is preferred even when explicit solving IS possible**: for an equation like $x^2+y^2=25$ (a circle), solving explicitly gives TWO branches, $y=\sqrt{25-x^2}$ and $y=-\sqrt{25-x^2}$, each requiring its own separate chain-rule differentiation. Implicit differentiation handles BOTH branches simultaneously, in one pass, producing a single formula for $dy/dx$ (in terms of both $x$ and $y$) that applies to whichever branch the point $(x,y)$ actually lies on — avoiding the extra bookkeeping of tracking $\pm$ cases separately, even though explicit solving was technically available here.

## Component 4 — Worked Examples

**Example 1 (LO1 — basic implicit differentiation, breaking MC-1)**: For $x^2+y^2=25$, differentiate both sides with respect to $x$: $\dfrac{d}{dx}[x^2]+\dfrac{d}{dx}[y^2] = \dfrac{d}{dx}[25]$. Left side: $2x + 2y\cdot\dfrac{dy}{dx}$ (chain-rule factor REQUIRED on the $y^2$ term). Right side: $0$ (derivative of a constant). So $2x+2y\dfrac{dy}{dx}=0 \Rightarrow 2y\dfrac{dy}{dx}=-2x \Rightarrow \dfrac{dy}{dx}=-\dfrac{x}{y}$.

**Example 2 (LO2 — an equation that can't be solved explicitly, breaking MC-2)**: For $x^3+y^3=6xy$ (no elementary closed-form solution for $y$ in terms of $x$), differentiate both sides: $3x^2+3y^2\dfrac{dy}{dx} = 6\left(x\dfrac{dy}{dx}+y\cdot1\right)$ (the right side needs the PRODUCT rule on $6xy$, since both $x$ and $y(x)$ are functions of $x$ being multiplied together: $\dfrac{d}{dx}[6xy] = 6\left[\dfrac{dx}{dx}\cdot y+x\cdot\dfrac{dy}{dx}\right]=6\left[y+x\dfrac{dy}{dx}\right]$). Expanding: $3x^2+3y^2\dfrac{dy}{dx} = 6y+6x\dfrac{dy}{dx}$. COLLECTING every $dy/dx$ term on one side: $3y^2\dfrac{dy}{dx}-6x\dfrac{dy}{dx} = 6y-3x^2 \Rightarrow \dfrac{dy}{dx}(3y^2-6x)=6y-3x^2 \Rightarrow \dfrac{dy}{dx} = \dfrac{2y-x^2}{y^2-2x}$ (dividing through by $3$) — found directly, with $y$ NEVER isolated as an explicit function of $x$ anywhere in the process.

**Example 3 (LO3 — implicit differentiation avoids branch-by-branch work, breaking MC-3)**: Revisit $x^2+y^2=25$ from Example 1. Explicitly: $y=\sqrt{25-x^2}$ gives $\dfrac{dy}{dx}=\dfrac{-x}{\sqrt{25-x^2}}=\dfrac{-x}{y}$; separately, $y=-\sqrt{25-x^2}$ gives $\dfrac{dy}{dx}=\dfrac{x}{\sqrt{25-x^2}}=\dfrac{-x}{y}$ too (since $y=-\sqrt{25-x^2}$ here, $-x/y = -x/(-\sqrt{25-x^2})=x/\sqrt{25-x^2}$, matching) — TWO separate chain-rule computations, one per branch, both converging on the SAME formula $dy/dx=-x/y$ Example 1 found in ONE implicit-differentiation pass. Implicit differentiation was not merely usable here — it was strictly less work, handling both branches at once without any $\pm$ case-splitting at all.

## Component 5 — Teaching Actions

### Teaching Action A01 — Every y-Term Needs the Chain-Rule Factor (Primitive P11: Representation Shift)

State: "$y$ is a function of $x$ here, even without a formula for it — so every $y$-term gets the SAME chain-rule treatment as any other composite function: differentiate the outer power, then multiply by the inner derivative, $dy/dx$." Work Example 1's full computation, explicitly contrasting the $x^2$ term (no extra factor) with the $y^2$ term (factor $dy/dx$ required).

- **MC-1 hook**: ask "when I differentiate $y^2$ with respect to $x$, do I just get $2y$, the same way $x^2$ gives $2x$?" — a "yes" answer reveals MC-1 (omitting the required chain-rule factor $dy/dx$ on $y$-terms — the direct transplant of `math.calc.chain-rule`'s own inner-derivative-missing misconception into this context).

### Teaching Action A02 — Collecting and Solving for dy/dx (Primitive P11: Representation Shift)

State: "after differentiating both sides, gather every $dy/dx$ term onto one side of the equation, factor it out, and divide — exactly like solving any equation for an unknown, here the unknown happens to be $dy/dx$ itself." Work Example 2's full computation, including its product-rule step and the explicit term-collection stage.

- **MC-2 hook**: ask "after differentiating both sides, is it fine to leave $dy/dx$ terms scattered on both sides of the equation, as long as each individual derivative was computed correctly?" — a "yes" answer reveals MC-2 (forgetting the essential algebraic step of collecting and isolating $dy/dx$, treating differentiation alone as the complete task).

### Teaching Action A03 — Implicit Differentiation Beats Branch-by-Branch Work Even When Both Are Possible (Primitive P06: Contrast Pair)

Contrast Example 3's two separate explicit branch-by-branch computations against Example 1's single implicit pass, both arriving at the identical formula $dy/dx=-x/y$. State: "implicit differentiation isn't a fallback used only when you're stuck — even here, where solving for $y$ explicitly was possible, it took two separate cases to match what implicit differentiation got in one step."

- **MC-3 hook**: ask "should I only use implicit differentiation when an equation genuinely can't be solved explicitly for y?" — a "yes" answer reveals MC-3 (treating implicit differentiation as a last resort rather than recognizing it as often the more efficient method outright).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Find $dy/dx$ for $x^2+y^2=100$ using implicit differentiation.
  2. Find $dy/dx$ for $x^3+y^3=9$, explicitly showing the chain-rule factor on the $y^3$ term.
  3. Find $dy/dx$ for $xy+y^2=10$, showing the product-rule step on the $xy$ term and the full term-collection process.
  4. Explain why implicit differentiation is used even for $x^2+y^2=100$ (problem 1), which could technically be solved explicitly for $y$ as two separate branches.
- **P76 (Transfer Probe, mode = independence)**: "An economist models a firm's production relationship between labor input $L$ and capital input $K$ using the implicit equation $L^{2}K + K^{2}L = 500$ (an equation that cannot be easily solved explicitly for $K$ as a function of $L$). (a) Use implicit differentiation to find $dK/dL$ directly from this equation, treating $K$ as a function of $L$. (b) Explain, in economic terms, what $dK/dL$ represents at a specific point on this relationship (how capital would need to change per unit change in labor to maintain the same production level). (c) A colleague suggests first trying to solve the equation explicitly for $K$ before differentiating, arguing this would be 'more rigorous.' Using this lesson's reasoning, explain why this suggestion is both harder (or impossible in closed form) and unnecessary."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CHAIN-RULE-FACTOR-OMITTED-ON-Y-TERMS | Differentiating a y-term like y^2 as if it were an x-term, omitting the required chain-rule factor dy/dx | Foundational |
| MC-2 | DY-DX-TERMS-NOT-COLLECTED-AND-ISOLATED | Leaving dy/dx terms scattered on both sides of the differentiated equation without collecting and algebraically isolating them, treating differentiation alone as the complete task | Foundational |
| MC-3 | IMPLICIT-DIFFERENTIATION-TREATED-AS-LAST-RESORT-ONLY | Believing implicit differentiation should only be used when an equation genuinely cannot be solved explicitly for y, missing that it is often the more efficient method even when explicit solving is possible | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Chain-Rule Factor Omitted on Y-Terms") → P41 (detect: ask a student to differentiate a y-term and check whether they omit the dy/dx factor) → P64 (conceptual shift: re-walk Example 1's explicit contrast between the $x^2$ term (no extra factor) and the $y^2$ term (factor required), re-anchoring on "y is a function of x here — every y-term is a composite function needing the chain rule, exactly like any other composition").
- **B02 (targets MC-2)**: P27 (name it: "dy/dx Terms Not Collected and Isolated") → P41 (detect: ask a student to finish solving for dy/dx after differentiating both sides, and check whether they stop before collecting scattered dy/dx terms) → P64 (conceptual shift: re-walk Example 2's explicit term-collection and factoring stage, re-anchoring on "differentiating both sides is only half the task — you still have to solve the resulting equation for dy/dx, just like solving for any unknown").
- **B03 (targets MC-3)**: P27 (name it: "Implicit Differentiation Treated as Last Resort Only") → P41 (detect: ask a student whether implicit differentiation should only be used when explicit solving is impossible, and check for a "yes") → P64 (conceptual shift: re-walk Example 3's side-by-side comparison — one implicit pass vs. two separate explicit-branch computations reaching the identical answer — re-anchoring on "implicit differentiation is often simply the more efficient choice, not merely a fallback").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.chain-rule` (the outer-derivative/inner-derivative structure this concept applies to every y-term, and whose own inner-derivative-missing misconception directly transplants into this context as MC-1).
- **Unlocks**: `math.calc.related-rates` (uses implicit differentiation with respect to time to relate multiple changing quantities), `math.calc.derivative-inverse-trig` (derives inverse trigonometric function derivatives via implicit differentiation of the original trig equation).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 6 with an advanced/apply tag places this at a "3 TAs + gate" tier — A01 (the chain-rule factor on y-terms), A02 (collecting and solving for dy/dx, including a product-rule case), and A03 (implicit differentiation's efficiency even when explicit solving is possible) each target a distinct LO, appropriate for a concept that is fundamentally a direct, disciplined application of the already-mastered chain rule to a new bookkeeping situation.
- Examples 1 and 3 deliberately reuse the SAME equation ($x^2+y^2=25$) — first to introduce the basic implicit-differentiation procedure cleanly (Example 1), then later to demonstrate its efficiency advantage over explicit branch-by-branch differentiation (Example 3) — letting the SAME concrete case carry two different pedagogical points, consistent with this corpus's established near-identical-pair/reused-example technique.
- Example 2's folium-of-Descartes equation ($x^3+y^3=6xy$) was deliberately chosen as the standard textbook illustration of "genuinely cannot be solved explicitly" (it has no elementary closed-form solution for $y$), while also requiring a product-rule step distinct from Example 1's pure-power-rule case — giving LO2's necessity claim real teeth rather than an assertion.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: specific circle equation before the general procedure) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
