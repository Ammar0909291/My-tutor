# Teaching Blueprint: Operations on Functions (`math.func.function-operations`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.func.function-operations` |
| name | Operations on Functions |
| domain | Functions |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 3 |
| requires | `math.func.function-concept` |
| unlocks | `math.func.composition` |
| cross_links | (none) |
| CPA_entry_stage | C (Concrete) — begins with a direct domain-intersection example before the general rules |
| description (KG) | Functions can be added, subtracted, multiplied, and divided pointwise; the algebra of functions including composition as a non-commutative product. |

## Component 1 — Learning Objectives

- LO1: Define the four pointwise operations — $(f+g)(x)=f(x)+g(x)$, $(f-g)(x)=f(x)-g(x)$, $(fg)(x)=f(x)g(x)$, $(f/g)(x)=f(x)/g(x)$ — and determine the resulting DOMAIN as the INTERSECTION of the original domains (further restricted, for division, wherever $g(x)=0$).
- LO2: Compute these pointwise operations concretely on specific functions, correctly identifying the combined domain.
- LO3: Distinguish the pointwise PRODUCT $(fg)(x)$ from COMPOSITION $(f\circ g)(x)=f(g(x))$ — a genuinely different operation — and recognize composition is NOT commutative ($f\circ g\ne g\circ f$ in general), unlike pointwise addition and multiplication, which ARE commutative.

## Component 2 — Prerequisite Check

Assumes mastery of `math.func.function-concept` (function definition, domain, evaluation).

## Component 3 — Core Explanation

**Pointwise operations combine OUTPUT values; the domain is the intersection, with an extra restriction for division**: $(f+g)(x)$, $(f-g)(x)$, and $(fg)(x)$ each combine $f(x)$ and $g(x)$ directly at each input $x$ — but this combination only makes sense where BOTH $f(x)$ and $g(x)$ are defined, so the combined function's domain is the INTERSECTION of $f$'s domain and $g$'s domain. For $(f/g)(x)=f(x)/g(x)$, there is an ADDITIONAL restriction: any $x$ where $g(x)=0$ must also be excluded, since division by zero is undefined there.

**Computing these operations requires tracking the domain alongside the formula**: simply combining the ALGEBRAIC FORMULAS of $f$ and $g$ is not the whole task — the resulting combined function's domain must be determined separately, by intersecting the original domains (and excluding zeros of $g$ for division), since a point excluded from either original function cannot appear in the combination.

**$(fg)(x)$ is the pointwise PRODUCT, genuinely different from composition $(f\circ g)(x)$; and composition is not commutative**: $(fg)(x)=f(x)\cdot g(x)$ multiplies the two OUTPUT values together at the same input. Composition $(f\circ g)(x)=f(g(x))$ instead FEEDS $g$'s output into $f$ as its NEW input — an entirely different operation, producing a different expression in general. Furthermore, while pointwise addition and multiplication are commutative ($f+g=g+f$, $fg=gf$, by ordinary arithmetic), composition is NOT: $f\circ g$ and $g\circ f$ are generally different functions.

## Component 4 — Worked Examples

**Example 1 (LO1 — domain as intersection, with an exclusion the individual functions wouldn't have, breaking MC-1)**: $f(x)=\sqrt x$ (domain $x\ge0$), $g(x)=\dfrac1{x-3}$ (domain $x\ne3$). $(f+g)(x)=\sqrt x+\dfrac1{x-3}$: the combined domain is $x\ge0$ AND $x\ne3$ — i.e., $[0,3)\cup(3,\infty)$ — genuinely EXCLUDING $x=3$, a point $f$ alone would have allowed ($f(3)=\sqrt3$ is perfectly defined), but which must be excluded from $f+g$ because $g$ is undefined there.

**Example 2 (LO2 — computing (fg)(x) as the product, distinguishing it from composition, breaking MC-2)**: $f(x)=x+1$, $g(x)=x^2$. Compute $(fg)(x)=f(x)\cdot g(x)=(x+1)(x^2)=x^3+x^2$ — the POINTWISE PRODUCT. Contrast with $(f\circ g)(x)=f(g(x))=f(x^2)=x^2+1$ — a COMPLETELY different expression, obtained by feeding $g(x)=x^2$ into $f$ as its input, not by multiplying $f(x)$ and $g(x)$ together. The notations $(fg)(x)$ and $(f\circ g)(x)$ must not be confused — they describe genuinely different operations with different results.

**Example 3 (LO3 — composition is not commutative, unlike pointwise operations, breaking MC-3)**: Using the same $f(x)=x+1$, $g(x)=x^2$: $(f\circ g)(x)=f(g(x))=x^2+1$ (Example 2). Now compute $(g\circ f)(x)=g(f(x))=g(x+1)=(x+1)^2=x^2+2x+1$. These are DIFFERENT: $x^2+1\ne x^2+2x+1$ (they differ by the $2x+1$ term) — confirming composition is NOT commutative. Contrast with $(f+g)(x)=x+1+x^2$ and $(g+f)(x)=x^2+x+1$ — IDENTICAL expressions (ordinary addition is commutative) — and similarly $(fg)(x)=(gf)(x)$ always, by ordinary multiplication's commutativity. Composition genuinely behaves differently from pointwise addition/multiplication.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Combined Domain Can Exclude Points Either Function Alone Would Allow (Primitive P28: Conflict Evidence)

Present Example 1's direct evidence: $(f+g)$'s domain excludes $x=3$, even though $f(3)$ alone is perfectly defined — the exclusion comes from $g$. State: "the combined domain is the intersection of both original domains — a point excluded by EITHER function is excluded from the combination."

- **MC-1 hook**: ask "is the domain of a combined function like $(f+g)(x)$ automatically the same as one of the individual functions' domains, without checking the other?" — a "yes" answer reveals MC-1 (missing that the combined domain is the intersection, potentially excluding points either function alone would allow).

### Teaching Action A02 — (fg)(x) Is the Product, Not Composition (Primitive P06: Contrast Pair)

Contrast Example 2's two results directly: $(fg)(x)=x^3+x^2$ (the product) against $(f\circ g)(x)=x^2+1$ (composition) — genuinely different expressions from the same $f,g$. State: "$(fg)(x)$ multiplies the two OUTPUT values together; $(f\circ g)(x)$ feeds one function's output into the other as a NEW input — these are different operations with different notations."

- **MC-2 hook**: ask "does $(fg)(x)$ mean the same thing as $f(g(x))$?" — a "yes" answer reveals MC-2 (confusing the pointwise product notation with composition notation).

### Teaching Action A03 — Composition Is Not Commutative, Unlike Pointwise Operations (Primitive P11: Representation Shift)

State: "addition and multiplication of functions are commutative, just like ordinary number arithmetic — but composition genuinely is NOT: feeding g into f is a different process from feeding f into g." Work Example 3's direct computation showing $f\circ g\ne g\circ f$ alongside the commutative $(f+g)=(g+f)$ contrast.

- **MC-3 hook**: ask "is function composition commutative, the same way addition and multiplication of functions are?" — a "yes" answer reveals MC-3 (assuming composition behaves like the commutative pointwise operations).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $f(x)=\sqrt{x-2}$ and $g(x)=\dfrac1x$, determine the domain of $(f+g)(x)$.
  2. For $f(x)=2x$ and $g(x)=x+3$, compute both $(fg)(x)$ and $(f\circ g)(x)$, and explain why they differ.
  3. Determine the domain of $(f/g)(x)$ for $f(x)=x$ and $g(x)=x-5$, including any additional restriction from division.
  4. Verify directly that $(f\circ g)(x)\ne(g\circ f)(x)$ for $f(x)=3x$ and $g(x)=x+2$.
- **P76 (Transfer Probe, mode = independence)**: "A data-processing pipeline applies two transformation functions, $f$ and $g$, to incoming data, and an engineer needs to combine them. (a) If the pipeline computes $(f+g)(x)$, explain what domain restriction must be checked before applying this combined function to any given input, referencing both $f$ and $g$'s individual domains. (b) The engineer originally intended to apply $g$ first and then feed its result into $f$, but accidentally implemented $(fg)(x)$ (the pointwise product) instead. Explain what specifically went wrong, and what the engineer should have implemented instead. (c) After fixing this, a colleague suggests that swapping the transformation order (applying $f$ first, then $g$) should produce the identical final result, 'since order shouldn't matter for combining two functions.' Explain specifically why this assumption is incorrect for the composition the engineer actually needs."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | COMBINED-DOMAIN-ASSUMED-FROM-ONE-FUNCTION-ONLY | Believing the domain of a combined function is automatically one of the original functions' domains, missing that it is the intersection of both | Foundational |
| MC-2 | POINTWISE-PRODUCT-CONFLATED-WITH-COMPOSITION | Believing (fg)(x) means f(g(x)), missing that it means the pointwise product f(x)·g(x), a genuinely different operation | Foundational |
| MC-3 | COMPOSITION-ASSUMED-COMMUTATIVE | Believing function composition is commutative like pointwise addition and multiplication, missing that f∘g and g∘f are generally different functions | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Combined Domain Assumed From One Function Only") → P41 (detect: ask a student for the domain of (f+g)(x) and check whether they state only one original function's domain) → P64 (conceptual shift: re-walk Example 1's intersection computation, re-anchoring on "the combined domain excludes points either function alone would exclude").
- **B02 (targets MC-2)**: P27 (name it: "Pointwise Product Conflated with Composition") → P41 (detect: ask a student to compute (fg)(x) and check whether they compute f(g(x)) instead) → P64 (conceptual shift: re-walk Example 2's side-by-side product-vs-composition contrast, re-anchoring on "(fg)(x) multiplies outputs; f∘g feeds one output into the other as input").
- **B03 (targets MC-3)**: P27 (name it: "Composition Assumed Commutative") → P41 (detect: ask a student whether f∘g equals g∘f in general, checking for "yes") → P64 (conceptual shift: re-walk Example 3's explicit non-equal computation, re-anchoring on "composition genuinely depends on order, unlike pointwise addition/multiplication").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.func.function-concept` (function definition, domain, and evaluation this concept's pointwise operations directly build on).
- **Unlocks**: `math.func.composition` (deepens the composition operation this concept introduces and contrasts against the pointwise product).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 3 with a proficient/apply tag places this at a compact "3 TAs + gate" tier, appropriately terse given the concept directly reuses `math.func.function-concept`'s already-mastered domain/evaluation framework, adding only the pointwise-operation rules and the product-vs-composition distinction.
- **Division of labor**: `math.func.function-concept` owns basic function definition, domain, and evaluation. This concept, `math.func.function-operations`, deliberately does not re-teach that; it owns the four pointwise operations, their combined-domain rule, and the explicit distinction between the pointwise product and composition (deferring composition's own full theory to `math.func.composition`, the unlocks target).
- Example 2 and Example 3 deliberately reuse the SAME $f(x)=x+1$, $g(x)=x^2$ pair across two learning objectives — first to distinguish the product from composition, then to show composition's non-commutativity — letting one concrete pair of functions carry both distinguishing points rather than introducing new functions for each.

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
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: direct domain-intersection example before the general rules) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
