# Teaching Blueprint: Product Rule (`math.calc.product-rule`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.product-rule` |
| name | Product Rule |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.calc.derivative-rules` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — a rectangle with both changing side lengths, before the symbolic formula |
| description (KG) | (fg)' = f'g + fg'; enables differentiation of products of functions. |

## Component 1 — Learning Objectives

- LO1: State and apply the **Product Rule**, $(fg)'=f'g+fg'$ — the derivative of a product is the derivative of the first times the second, PLUS the first times the derivative of the second — directly resolving `math.calc.derivative-rules`'s own flagged open misconception (that derivatives distribute over products as $f'g'$).
- LO2: Correctly identify WHEN the Product Rule is genuinely necessary (a product of two functions that cannot be easily simplified into a single term first) versus when direct simplification (expanding or combining exponents) is simpler — recognizing the Product Rule as a tool of last resort for products, not a mandatory first step for every product-shaped expression.
- LO3: Apply the Product Rule correctly to products involving MORE than two factors, or as an intermediate step in a larger expression, by treating one factor as "the rest of the product" grouped together — directly refuting the misconception that the Product Rule only applies to a product of exactly two named functions written in the exact textbook form.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.derivative-rules` (the power rule, constant multiple rule, sum/difference rule — and that concept's own explicit flag that $\frac{d}{dx}[f(x)g(x)]\ne f'(x)g'(x)$, deferring the correct rule to this concept).

## Component 3 — Core Explanation

**The Product Rule, resolving the deferred question**: for two differentiable functions $f,g$, $(fg)'(x) = f'(x)g(x) + f(x)g'(x)$ — NOT $f'(x)g'(x)$, which `math.calc.derivative-rules` already flagged as incorrect without yet supplying the correct alternative. The correct rule has TWO terms, each pairing one function's derivative with the OTHER function's original (undifferentiated) value, added together.

**When the Product Rule is actually necessary**: many product-shaped expressions can be simplified BEFORE differentiating — e.g. $x^2\cdot x^3 = x^5$ can be differentiated directly via the power rule, with no need for the Product Rule at all. The Product Rule becomes genuinely necessary when the two factors CANNOT be combined into a single simpler expression first — e.g. a polynomial times a trigonometric function, or two different transcendental functions multiplied together, where no algebraic simplification collapses the product into one term.

**Extending to more than two factors, or as a sub-step**: the Product Rule as stated applies to exactly two factors, but it extends directly: for THREE factors $fgh$, treat it as $f\cdot(gh)$ (grouping the last two together as a single "second function"), apply the two-factor rule once to get $f'(gh)+f(gh)'$, then apply the Product Rule AGAIN to expand $(gh)'=g'h+gh'$ inside that result. The rule is not restricted to expressions matching an exact two-named-function template — any product, however many factors, or however it's embedded inside a larger expression, can be handled by correctly identifying "this piece" and "everything else" as the two factors to apply the rule to.

## Component 4 — Worked Examples

**Example 1 (LO1 — the correct rule, contrasted with the flagged wrong guess)**: Differentiate $y=x^2\sin x$ (a genuine product that can't be simplified into a single power term). Let $f=x^2$ ($f'=2x$), $g=\sin x$ ($g'=\cos x$). Product Rule: $y' = f'g+fg' = 2x\sin x + x^2\cos x$. Contrast directly with the WRONG guess $f'g' = 2x\cos x$ — a completely different (and incorrect) expression, missing an entire term.

**Example 2 (LO2 — recognizing when simplification beats the Product Rule)**: Differentiate $y=(3x^2)(4x^5)$. This COULD be done via the Product Rule ($f=3x^2,g=4x^5$: $f'g+fg' = 6x(4x^5)+3x^2(20x^4) = 24x^6+60x^6=84x^6$), but it's far simpler to first multiply the factors together: $(3x^2)(4x^5)=12x^7$, then apply the power rule directly: $y'=84x^6$ — the SAME answer, reached with far less work, because this particular "product" was really just a single power function in disguise.

**Example 3 (LO3 — three factors, applying the rule twice, breaking MC-1)**: Differentiate $y=x\cdot e^x\cdot\sin x$ (three genuinely un-combinable factors). Group as $f=x$, and treat $(e^x\sin x)$ as the "second function" $G$: $y'=f'G+fG'$ where $G=e^x\sin x$. First find $G'$ using the Product Rule AGAIN (on $e^x$ and $\sin x$): $G'=e^x\sin x+e^x\cos x$. Now assemble: $y' = 1\cdot(e^x\sin x) + x\cdot(e^x\sin x+e^x\cos x) = e^x\sin x + xe^x\sin x + xe^x\cos x$. This required applying the SAME two-factor rule twice, treating a product of two factors as itself one "factor" the second time — proving the rule isn't limited to a rigid two-named-function template.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Correct Rule, Directly Resolving the Deferred Question (Primitive P28: Conflict Evidence)

Recall explicitly: "back in derivative rules, we flagged that $(fg)'\ne f'g'$ but didn't yet say what it actually equals — here's the answer." Present Example 1's direct side-by-side: the correct two-term answer $2x\sin x+x^2\cos x$ versus the flagged-wrong single-term guess $2x\cos x$. State: "TWO terms, each pairing one function's derivative with the OTHER's original value — never just multiply the two derivatives together."

- **MC-1 hook**: ask "is $(fg)'$ the same as $f'g'$?" (revisiting the exact question `math.calc.derivative-rules` left open) — a "yes" answer reveals MC-1 (the same distributing-derivative-over-products error already flagged as a known risk, now directly tested with the correct rule available).

### Teaching Action A02 — Simplify First When Possible (Primitive P06: Contrast Pair)

Work Example 2 both ways — full Product Rule computation versus direct simplify-then-power-rule — showing they agree, but the second is far less work. State: "the Product Rule is correct here too, but if your 'product' can be combined into one simpler term first, do that instead — save the Product Rule for products that genuinely can't be collapsed."

### Teaching Action A03 — Extending to Three or More Factors (Primitive P11: Representation Shift)

State: "if you have three factors multiplied together, group two of them as a single 'chunk,' apply the two-factor rule to (first factor) times (the chunk), then apply the rule AGAIN inside the chunk when you need its derivative." Work Example 3's full two-application derivation.

- **MC-2 hook**: ask "does the Product Rule only work when you have EXACTLY two functions, written exactly like the textbook formula?" — a "yes" answer reveals MC-2 (believing the rule is restricted to a rigid two-factor template, missing that grouping factors together lets it extend to any number of factors).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Differentiate $y=x^3\cos x$ using the Product Rule, showing $f,g,f',g'$ explicitly before assembling the final answer.
  2. Differentiate $y=(2x^3)(5x^4)$ BOTH by direct simplification first and by the full Product Rule, and confirm both methods give the same answer.
  3. Differentiate $y=x^2e^x\ln x$ (three factors), by grouping two factors together and applying the Product Rule twice.
  4. A student computes $\frac{d}{dx}[x^4\sin x]$ as $4x^3\cos x$ (multiplying the two individual derivatives). Explain what's wrong with this reasoning and provide the correct derivative.
- **P76 (Transfer Probe, mode = independence)**: "A physicist models the kinetic energy of a system with time-varying mass as $E(t) = \frac{1}{2}m(t)v(t)^2$, where both the mass $m(t)$ and velocity $v(t)$ change over time (e.g. a rocket burning fuel while accelerating). (a) Treating $v(t)^2$ as a single 'chunk,' set up the Product Rule to differentiate $E(t)$ with respect to time, identifying which piece is $f$ and which is the chunk $g$. (b) Explain why simply computing $m'(t)\cdot(v(t)^2)'$ (multiplying the two individual derivatives) would give a physically meaningless and mathematically incorrect result here, referencing the correct Product Rule structure. (c) If the physicist ALSO needed to account for a third time-varying quantity (e.g. a drag coefficient), explain how you would extend your Product Rule setup from part (a) to handle three time-varying factors."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DERIVATIVE-DISTRIBUTED-OVER-PRODUCT | Computing $(fg)'$ as $f'g'$ (multiplying the two individual derivatives) instead of the correct $f'g+fg'$ | Foundational |
| MC-2 | PRODUCT-RULE-RESTRICTED-TO-EXACTLY-TWO-NAMED-FACTORS | Believing the Product Rule only applies to a product of exactly two explicitly named functions in the textbook template, missing that grouping factors extends it to any number of factors | Foundational |
| MC-3 | PRODUCT-RULE-APPLIED-WHERE-SIMPLIFICATION-IS-SIMPLER | Reflexively applying the full Product Rule to every product-shaped expression, even when direct algebraic simplification (combining like powers) would be far simpler | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Derivative-Distributed-Over-Product Error") → P41 (detect: ask a student to differentiate $x^2\sin x$ and check whether they compute $2x\cos x$, the flagged-wrong single-term answer) → P64 (conceptual shift: re-walk Example 1's direct side-by-side contrast, re-anchoring on "TWO terms, always — one function's derivative times the other's original value, for BOTH orderings, added together").
- **B02 (targets MC-2)**: P27 (name it: "Two-Factor-Only Restriction Assumption") → P41 (detect: give a three-factor product and ask whether the Product Rule can even be applied) → P64 (conceptual shift: re-walk Example 3's grouping strategy, re-anchoring on "group extra factors into one 'chunk' — the rule only ever needs TWO pieces at a time, however many factors you actually have").
- **B03 (targets MC-3)**: P27 (name it: "Product-Rule-Over-Simplification Reflex") → P41 (detect: give $(2x^3)(5x^4)$ and check whether the student immediately reaches for the full Product Rule rather than simplifying first) → P64 (conceptual shift: re-walk Example 2's both-methods comparison, re-anchoring on "check whether the product collapses into a single term first — it's not wrong to use the Product Rule here, but it is more work than necessary").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.derivative-rules` (the power/constant-multiple/sum-difference rules, and that concept's own explicitly deferred question — what IS $(fg)'$, if not $f'g'$ — resolved here).
- **Unlocks**: none listed in the KG.
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an advanced/apply tag places this at a "3 TAs + gate" tier — A01 (the correct rule, directly resolving the deferred question), A02 (simplify-first judgment), and A03 (extending to more factors) each target a distinct LO, appropriate for a concept whose primary job is closing a specific, already-flagged gap from its prerequisite.
- This blueprint deliberately opens by explicitly referencing `math.calc.derivative-rules`'s own MC-3 ("distributing derivatives over products") as the exact misconception this concept resolves — Teaching Notes flag this direct continuity so the corpus's cross-concept misconception tracking reads as one coherent arc (flagged there, resolved here) rather than two independent, coincidentally similar errors.
- Example 2 (simplify-first) was deliberately included as its own Teaching Action, even though it's not one of the three headline LOs' primary focus, because reflexive over-application of a newly learned rule (MC-3) is an extremely common pattern immediately after any new technique is introduced — addressing it early prevents it from calcifying into a habit.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: a rectangle with changing side lengths before the symbolic formula) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
