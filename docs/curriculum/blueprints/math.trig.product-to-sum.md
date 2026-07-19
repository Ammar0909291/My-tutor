# Teaching Blueprint: Product-to-Sum and Sum-to-Product Formulas (`math.trig.product-to-sum`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.trig.product-to-sum` |
| name | Product-to-Sum and Sum-to-Product Formulas |
| domain | Trigonometry |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.7 → MAMR = ⌈0.7×5⌉ = 4/5 |
| estimated_hours | 3 |
| requires | `math.trig.sum-difference-formulas` |
| unlocks | `math.calc.trig-integrals` |
| cross_links | `math.calc.trig-integrals` |
| CPA_entry_stage | A (Abstract) — advanced learner already fluent in the prerequisite; the remaining product-to-sum formulas are derived directly by combination | 
| description (KG) | sinAcosB = ½[sin(A+B) + sin(A−B)]; enable converting products into sums (useful for integration) and vice versa. |

## Component 1 — Learning Objectives

- LO1: Derive the remaining three product-to-sum formulas — $\cos A\sin B$, $\cos A\cos B$, $\sin A\sin B$ — by adding or subtracting the appropriate pair of sum/difference formulas, completing what `math.trig.sum-difference-formulas`'s own Example 3 already began (that concept derived $\sin A\cos B=\frac12[\sin(A+B)+\sin(A-B)]$ by ADDING the two sine formulas) — correctly matching each product to its specific required combination, never confusing the four.
- LO2: Derive the **sum-to-product** direction (the reverse conversion, e.g. $\sin X+\sin Y=2\sin\left(\frac{X+Y}2\right)\cos\left(\frac{X-Y}2\right)$) via a genuine substitution ($A=\frac{X+Y}2$, $B=\frac{X-Y}2$) — recognizing this requires solving for $A,B$ explicitly, not merely "reading the product-to-sum formula backward" informally.
- LO3: Apply product-to-sum conversion to make an otherwise-difficult integral directly computable — converting a product of trig functions with no simple antiderivative into a sum of simpler terms that integrate immediately, one at a time.

## Component 2 — Prerequisite Check

Assumes mastery of `math.trig.sum-difference-formulas` ($\cos(A\mp B)=\cos A\cos B\pm\sin A\sin B$, $\sin(A\pm B)=\sin A\cos B\pm\cos A\sin B$; the derivation of $\sin A\cos B=\frac12[\sin(A+B)+\sin(A-B)]$ as a direct consequence of these, by adding the two sine formulas).

## Component 3 — Core Explanation

**Completing the four product-to-sum formulas — four genuinely distinct combinations**: `math.trig.sum-difference-formulas`'s own Example 3 already derived $\sin A\cos B=\frac12[\sin(A+B)+\sin(A-B)]$ by ADDING $\sin(A+B)$ and $\sin(A-B)$. The remaining three formulas come from the OTHER combinations: SUBTRACTING the sine formulas gives $\sin(A+B)-\sin(A-B)=2\cos A\sin B$, so $\cos A\sin B=\frac12[\sin(A+B)-\sin(A-B)]$; ADDING the cosine formulas gives $\cos(A+B)+\cos(A-B)=2\cos A\cos B$, so $\cos A\cos B=\frac12[\cos(A+B)+\cos(A-B)]$; SUBTRACTING the cosine formulas (in the order $\cos(A-B)-\cos(A+B)$) gives $2\sin A\sin B$, so $\sin A\sin B=\frac12[\cos(A-B)-\cos(A+B)]$. These are four genuinely DIFFERENT combinations — easy to mix up which pair of formulas to add or subtract for which product.

**Sum-to-product requires a genuine substitution, not just reading backward**: converting a SUM like $\sin X+\sin Y$ into product form requires setting $A+B=X$ and $A-B=Y$, then SOLVING: adding these two equations gives $A=\frac{X+Y}2$; subtracting gives $B=\frac{X-Y}2$. Substituting these specific values of $A,B$ back into the product-to-sum formula (rearranged) gives $\sin X+\sin Y=2\sin\left(\frac{X+Y}2\right)\cos\left(\frac{X-Y}2\right)$ — this is a genuine change of variables, not simply flipping the equation informally without solving for the correct $A,B$.

**Why this matters: making otherwise-difficult integrals routine**: a product of trig functions like $\sin(3x)\cos(x)$ generally has NO simple antiderivative found via a direct substitution on the product itself. Converting it FIRST into a sum of simpler sine/cosine terms (using the product-to-sum formula) makes the resulting integral completely routine — each term integrates directly, one at a time.

## Component 4 — Worked Examples

**Example 1 (LO1 — deriving the remaining three product-to-sum formulas, breaking MC-1)**: From $\cos(A+B)=\cos A\cos B-\sin A\sin B$ and $\cos(A-B)=\cos A\cos B+\sin A\sin B$ (both from `math.trig.sum-difference-formulas`): ADDING gives $\cos(A+B)+\cos(A-B)=2\cos A\cos B$, so $\cos A\cos B=\frac12[\cos(A+B)+\cos(A-B)]$. SUBTRACTING gives $\cos(A-B)-\cos(A+B)=2\sin A\sin B$, so $\sin A\sin B=\frac12[\cos(A-B)-\cos(A+B)]$. From $\sin(A+B)$ and $\sin(A-B)$, SUBTRACTING (rather than adding, as that concept's own Example 3 already did for $\sin A\cos B$) gives $\sin(A+B)-\sin(A-B)=2\cos A\sin B$, so $\cos A\sin B=\frac12[\sin(A+B)-\sin(A-B)]$ — a genuinely different combination (subtraction, not addition) from the already-established $\sin A\cos B$ formula.

**Example 2 (LO2 — sum-to-product needs a genuine substitution, breaking MC-2)**: Convert $\sin(5x)+\sin(3x)$ to product form. Set $A+B=5x$, $A-B=3x$. Solving: adding, $2A=8x\Rightarrow A=4x$; subtracting, $2B=2x\Rightarrow B=x$. So $\sin(5x)+\sin(3x)=2\sin(4x)\cos(x)$. Verify at $x=\pi/2$: LHS $=\sin(5\pi/2)+\sin(3\pi/2)=1+(-1)=0$. RHS $=2\sin(2\pi)\cos(\pi/2)=2(0)(0)=0$ ✓ — matching, confirming the result, obtained only via genuinely SOLVING for $A=4x,B=x$, not by informally "reversing" the formula without this step.

**Example 3 (LO3 — enabling a routine integral, breaking MC-3)**: Compute $\int\sin(3x)\cos(x)\,dx$. No simple substitution works directly on the product $\sin(3x)\cos(x)$. Converting first: $\sin(3x)\cos(x)=\frac12[\sin(3x+x)+\sin(3x-x)]=\frac12[\sin(4x)+\sin(2x)]$. Now integrating term by term: $\int\frac12[\sin(4x)+\sin(2x)]\,dx = \frac12\left[-\frac14\cos(4x)-\frac12\cos(2x)\right]+C = -\frac18\cos(4x)-\frac14\cos(2x)+C$ — a completely routine integration, made possible ONLY by first converting the product into a sum.

## Component 5 — Teaching Actions

### Teaching Action A01 — Four Distinct Combinations, Not One Formula (Primitive P06: Contrast Pair)

Contrast Example 1's three NEW derivations against `math.trig.sum-difference-formulas`'s own already-established $\sin A\cos B$ derivation — four genuinely different addition/subtraction pairings. State: "each of the four products needs its OWN specific combination — adding or subtracting the sine formulas gives two different results, and adding or subtracting the cosine formulas gives two more; don't mix them up."

- **MC-1 hook**: ask "are the four product-to-sum formulas all essentially the same formula, interchangeable with each other?" — a "yes" answer reveals MC-1 (missing that each requires its own specific, distinct combination of sum/difference formulas).

### Teaching Action A02 — Sum-to-Product Needs Solving, Not Just Reversing (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: converting $\sin(5x)+\sin(3x)$ genuinely required solving $A+B=5x$, $A-B=3x$ for $A=4x,B=x$ before the product form could be written down. State: "you can't just 'flip' the product-to-sum formula informally — you have to actually solve for the correct $A$ and $B$ first."

- **MC-2 hook**: ask "to convert a sum back into a product, can I just read the product-to-sum formula backward without solving for A and B explicitly?" — a "yes" answer reveals MC-2 (missing the genuine substitution/solving step sum-to-product conversion requires).

### Teaching Action A03 — Products Without Simple Antiderivatives Become Routine as Sums (Primitive P11: Representation Shift)

State: "$\sin(3x)\cos(x)$ has no direct antiderivative as a product — but convert it to a sum first, and every term integrates immediately." Work Example 3's full conversion and term-by-term integration.

- **MC-3 hook**: ask "are these product-to-sum conversions purely algebraic curiosities with no practical computational use?" — a "yes" answer reveals MC-3 (missing the direct motivation: making otherwise-difficult integrals routine).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Derive $\cos A\cos B$ in terms of a sum, showing which two formulas you add.
  2. Derive $\sin A\sin B$ in terms of a difference, showing which two formulas you subtract and in which order.
  3. Convert $\cos(7x)-\cos(3x)$ into product form, solving explicitly for the correct $A$ and $B$.
  4. Compute $\int\cos(5x)\sin(x)\,dx$ by first converting the product to a sum.
- **P76 (Transfer Probe, mode = independence)**: "An acoustic engineer analyzes a signal that is the SUM of two pure tones, $\sin(440t)+\sin(444t)$ (two very close frequencies, producing an audible 'beating' effect). (a) Convert this sum into product form, and explain what the resulting product's two factors represent physically (one slowly-varying envelope, one fast-oscillating carrier). (b) A colleague, working with a DIFFERENT signal that is a genuine PRODUCT of two tones, $\sin(440t)\cos(4t)$, wants to understand its frequency content by converting it to a sum. Perform this conversion. (c) Explain why the engineer needed genuinely different techniques (sum-to-product for one signal, product-to-sum for the other) rather than treating both conversions as interchangeable."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | PRODUCT-TO-SUM-FORMULAS-CONFLATED | Believing the four product-to-sum formulas are interchangeable or essentially the same, missing that each requires its own specific addition/subtraction combination | Foundational |
| MC-2 | SUM-TO-PRODUCT-TREATED-AS-INFORMAL-REVERSAL | Believing sum-to-product conversion is just reading the product-to-sum formula backward informally, missing the genuine substitution/solving step required | Foundational |
| MC-3 | PRODUCT-TO-SUM-CONVERSIONS-ASSUMED-PURELY-ALGEBRAIC | Believing these conversions are algebraic curiosities with no practical use, missing their role in making otherwise-difficult integrals routine | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Product-to-Sum Formulas Conflated") → P41 (detect: ask a student to derive $\cos A\sin B$ and check whether they confuse it with the already-known $\sin A\cos B$ derivation) → P64 (conceptual shift: re-walk Example 1's explicit contrast of all four combinations, re-anchoring on "each product needs its OWN specific addition or subtraction pairing").
- **B02 (targets MC-2)**: P27 (name it: "Sum-to-Product Treated as Informal Reversal") → P41 (detect: ask a student to convert a sum to product form and check whether they skip solving for $A,B$ explicitly) → P64 (conceptual shift: re-walk Example 2's explicit solving of $A=4x,B=x$, re-anchoring on "you must genuinely solve for $A$ and $B$ — it's a real substitution, not an informal flip").
- **B03 (targets MC-3)**: P27 (name it: "Product-to-Sum Conversions Assumed Purely Algebraic") → P41 (detect: ask a student whether these formulas have any practical computational use, and check for a "no") → P64 (conceptual shift: re-walk Example 3's integral, made routine only after converting the product to a sum, re-anchoring on "this conversion is exactly what makes an otherwise-intractable integral solvable").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.trig.sum-difference-formulas` (the four sum/difference formulas this concept's product-to-sum identities are all built from, and whose own Example 3 already derived one of the four).
- **Unlocks**: `math.calc.trig-integrals` (uses product-to-sum conversion directly to make products of sines/cosines integrable).
- **Cross-link**: KG lists `math.calc.trig-integrals` as a cross-link — **not yet authored** (checked via `ls docs/curriculum/blueprints/` before setting P76_mode). $P76_{mode}=$ **independence**; a future revision may add a genuine cross-link transfer probe into trigonometric integration techniques once that entry exists.

## Component 8 — Teaching Notes

- estimated_hours = 3 with an advanced/apply tag places this at a "3 TAs + gate" tier, appropriately compact given the concept directly extends and completes `math.trig.sum-difference-formulas`'s own already-established derivation pattern rather than introducing new machinery.
- **Division of labor**: `math.trig.sum-difference-formulas` already derived $\sin A\cos B=\frac12[\sin(A+B)+\sin(A-B)]$ as its own LO3, framed as a demonstration that those formulas are a "generative foundation." This concept deliberately does NOT re-derive that specific formula, instead completing the remaining three product-to-sum formulas and adding the genuinely new content that concept did not cover: the reverse (sum-to-product) direction and the integration-motivated application, both of which are the concept's own distinguishing content per the KG's "and vice versa" and unlock-to-integration framing.
- Example 2's sum-to-product conversion was deliberately verified numerically at a specific value ($x=\pi/2$) to give MC-2's "genuine substitution required" point a checkable confirmation, rather than asserting the formula's correctness without verification.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.calc.trig-integrals unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.7×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: advanced learner, remaining formulas derived directly by combination) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
