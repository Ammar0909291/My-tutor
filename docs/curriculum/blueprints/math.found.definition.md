# Teaching Blueprint: Mathematical Definition (`math.found.definition`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.definition` |
| name | Mathematical Definition |
| domain | Foundations |
| difficulty | foundational |
| bloom | remember |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 2 |
| requires | `math.found.mathematical-language` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | A precise, unambiguous specification of the meaning of a mathematical term, introducing new vocabulary by relating it to previously defined concepts. |
| related | `math.found.axiom`, `math.found.theorem` |

## Component 1 — Learning Objectives

- LO1: State that a mathematical definition is a precise, unambiguous specification of a term's meaning, built from previously defined terms (or primitive/undefined terms at the very base).
- LO2: Apply a given formal definition exactly as stated to determine whether a specific object does or does not satisfy it, even when this conflicts with informal/everyday intuition about the term.
- LO3: Recognize that a definition is neither true nor false — it is a STIPULATION (a choice of meaning), whereas a theorem is a claim that can be true or false.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.mathematical-language` (the general specialized-vocabulary system definitions populate with precise terms).

## Component 3 — Core Explanation

A **mathematical definition** precisely specifies what a term means, by relating it to already-defined (or primitive/undefined, at the base of the whole system) terms. Definitions differ fundamentally from theorems: a definition is a STIPULATED choice — "let 'even' MEAN divisible by 2" — and is neither true nor false, only more or less useful/standard; a theorem is a CLAIM about objects that could, in principle, be true or false, and requires proof.

Definitions must be applied EXACTLY as stated, even when the formal boundary differs from everyday intuition — mathematics resolves such conflicts by trusting the stated definition, not the intuition.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — applying a definition exactly, breaking MC-1)**: Definition: "a number is **prime** if it is a natural number greater than 1 whose only positive divisors are 1 and itself." Applying this exactly: is 1 prime? NO — the definition explicitly requires "greater than 1," excluding 1 by stipulation (this is a deliberate, historically-settled convention, not an oversight, chosen because including 1 would break the uniqueness of prime factorization). Is 2 prime? YES — its only positive divisors are 1 and 2.

**Example 2 (LO3 — definition vs. theorem, breaking MC-2)**: "A **rectangle** is a quadrilateral with four right angles" is a DEFINITION — neither true nor false, simply a stipulated meaning. "Every rectangle's diagonals are equal in length" is a THEOREM — a claim that requires (and has) a proof, and could in principle have been false for some other shape given the same defining property.

**Example 3 (LO2 — a boundary case tested against a stated definition)**: Definition: "a function $f$ is **increasing** on an interval if $x_1<x_2$ implies $f(x_1)<f(x_2)$ for all $x_1,x_2$ in that interval." Given $f(x)=x^3$, test $x_1=-1,x_2=0$: $f(-1)=-1<f(0)=0$ ✓, holding for this and every pair — $f$ is increasing everywhere by this exact definition, even though its graph "flattens" near $x=0$ (a common source of doubt); the definition concerns strict ORDER of outputs, not the steepness of the curve.

## Component 5 — Teaching Actions

### Teaching Action A01 — Apply the Definition Exactly, Not Intuition (Primitive P64: Conceptual Shift)

Work Example 1's "is 1 prime?" case explicitly, narrating: "check the exact stated definition, word by word, against the candidate object — do not substitute a vaguer, everyday sense of the term."

- **MC-1 hook**: ask "is 1 a prime number?" before revealing the formal definition, and observe whether the student answers from vague intuition ("well it only divides by 1 and itself...") rather than checking the exact "greater than 1" clause (revealing MC-1: substituting an incomplete or intuitive version of a definition for its exact stated form).

### Teaching Action A02 — Definitions Are Stipulated; Theorems Are Proved (Primitive P06: Contrast Pair)

Contrast Example 2's rectangle definition (a stipulated choice — could have been phrased differently) against the diagonal-equality theorem (a genuine claim requiring proof, which could have turned out false for some other choice of shape). State the rule: "ask 'could this be true or false?' — if yes, it's a claim needing proof (a theorem); if it's simply naming what a word means, it's a definition, and 'true or false' doesn't apply to it."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Given the definition of "even integer" (divisible by 2, i.e. $n=2k$ for integer $k$), determine whether $0$ is even, applying the definition exactly (yes — $0=2\times0$).
  2. Classify each of three given statements as "definition" or "theorem": (a) "a triangle is **equilateral** if all three sides are equal," (b) "every equilateral triangle is equiangular," (c) "a **square** is a quadrilateral that is both a rectangle and a rhombus."
  3. Given the definition of "increasing function" from Example 3, test whether $f(x)=x^2$ is increasing on the interval $(-2,-1)$, applying the definition exactly (it is DECREASING there — check $f(-2)=4$ vs. $f(-1)=1$).
  4. Explain, in one sentence, why "is this definition true?" is not a meaningful question to ask about a stipulation, contrasting with "is this theorem true?"
- **P76 (Transfer Probe, mode = independence)**: "A new textbook defines a **'balanced number'** as a positive integer whose digit sum equals the number of its digits multiplied by 3. (a) Using this exact definition, determine whether 123 is balanced (digit sum $1+2+3=6$; digits $\times3 = 2\times3=6$ — check whether these match) and whether 99 is balanced. (b) Explain why the question 'is this definition of balanced number correct?' does not make sense the way 'is the claim about balanced numbers' distribution correct?' would — connecting your answer to the definition-vs-theorem distinction from this lesson."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | INFORMAL-INTUITION-SUBSTITUTED-FOR-EXACT-DEFINITION | Applying a vague, remembered, or intuitive version of a term's meaning instead of checking the object against the definition's exact stated words | Foundational |
| MC-2 | DEFINITION-TREATED-AS-A-TRUE-OR-FALSE-CLAIM | Asking whether a definition itself is "true," conflating a stipulated meaning with a provable claim | Moderate |
| MC-3 | DEFINITION-APPLIED-INCONSISTENTLY-ACROSS-CASES | Applying a definition correctly to a typical/prototype example but reverting to intuition for an atypical or boundary case (e.g. Example 1's "1 is prime" doubt, Example 3's "flattening curve" doubt) | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Informal Intuition Substituted for Exact Definition") → P41 (detect: ask "is 1 prime?" before showing the formal definition; check for hedging or informal reasoning) → P64 (conceptual shift: re-check the exact definition clause by clause against the number 1).
- **B02 (targets MC-2)**: P27 ("Definition Treated as True-or-False Claim") → P41 (detect: ask whether the rectangle definition in Example 2 is "true"; check for an attempt to justify or prove it) → P64 (conceptual shift: re-state that a definition is a naming choice, then re-classify the paired theorem as the genuinely provable claim).
- **B03 (targets MC-3)**: P27 ("Definition Applied Inconsistently at Boundary Cases") → P41 (detect: present Example 3's flattening-curve case and check whether the student doubts "increasing" despite satisfying the exact definition) → P64 (re-walk the definition's exact inequality test at the doubted point, confirming it holds regardless of visual appearance).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.mathematical-language`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.found.axiom` (definitions and axioms are both stipulated rather than proved, though axioms are additionally asserted as starting truths about the system, not merely naming choices), `math.found.theorem` (the genuinely provable-claim category this concept is directly contrasted against).

## Component 8 — Teaching Notes

- estimated_hours = 2 and mastery_threshold = 0.90 mirror `math.found.mathematical-symbols`'s allocation — both are high-precision, foundational recognition tasks where errors propagate directly into every later concept that reuses these terms.
- MC-1 and MC-3 are closely related (both involve intuition overriding an exact definition) but are tracked separately because MC-3 specifically targets ATYPICAL/boundary instances, which research on concept image consistently shows are the primary site of definitional slippage, even in students who apply a definition correctly to prototype cases.
- The "is 1 prime?" case was retained as the canonical MC-1 example (rather than inventing a novel term) because it is the single most common definitional dispute students encounter across the entire mathematics curriculum, making the repair immediately transferable to number-theory contexts later in the KG.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.mathematical-language`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.90×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
