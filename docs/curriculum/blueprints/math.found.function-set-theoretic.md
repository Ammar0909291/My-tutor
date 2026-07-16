# Teaching Blueprint: Function (Set-Theoretic)
**ID:** math.found.function-set-theoretic
**Version:** 1.0.0
**Status:** PACKAGE_READY
**Schema:** Blueprint Specification v1.0

---

## Component 0 — Concept Identity & Authoring Metadata

| Field | Value |
|---|---|
| KG ID | math.found.function-set-theoretic |
| Name | Function (Set-Theoretic) |
| Aliases | mapping, map, morphism (informal) |
| Domain | math.found |
| Difficulty | developing (2) |
| Bloom | understand |
| Mastery Threshold | 0.85 |
| Estimated Hours | 4 |
| Requires | math.found.cartesian-product, math.found.relation |
| Unlocks | math.func.function-concept |
| Cross-links | math.func.function-concept |
| P76 Cross-link Transfer | math.func.function-concept — informal/applied function notion as target of P76 probe |
| Blueprint Version | 1.0.0 |
| Authored | 2026-07-11 |

---

## Component 1 — Learning Objectives

On completion of all Protocol A Teaching Actions, a student will be able to:

1. **Define** a function as a relation that is both right-unique and left-total.
2. **Verify** whether a given relation R ⊆ A×B is a function by checking both conditions.
3. **Distinguish** domain, codomain, and image/range of a function.
4. **Represent** a function in three equivalent forms: set of pairs, arrow diagram, formula.
5. **Classify** functions as injective (one-to-one), surjective (onto), or bijective.
6. **Connect** the set-theoretic definition to the informal input-output notion of function.

---

## Component 2 — Prerequisite Map

| Prerequisite KG ID | Name | Role |
|---|---|---|
| math.found.cartesian-product | Cartesian Product | A function f: A→B is a subset of A×B — must know A×B and ordered pairs |
| math.found.relation | Relation | A function is a special kind of relation (right-unique + left-total); must know what a relation is |

**Assumed entering knowledge:** Student can determine whether a pair (a,b) belongs to a relation R ⊆ A×B. Student can list elements of A×B. Student understands "for every" (left-total) and "exactly one" (right-unique) as logical constraints.

**Cross-linked concept:** math.func.function-concept (the informal input-output/graph notion of function, used in the P76 cross-link transfer probe).

---

## Component 3 — Misconception Registry

### MC-1 (FOUNDATIONAL): Left-Totality Forgotten
**Label:** DOMAIN-COVERAGE-OMISSION
**Statement:** Student checks that every domain element with an output has exactly one output (right-uniqueness) but does not check that EVERY domain element has at least one output. The student declares a relation a function when some domain elements are unmatched.
**Trigger:** R = {(1,a),(2,b)} on domain A = {1,2,3} and codomain B = {a,b,c} — student says "every element that appears as a first component maps to exactly one output → function." Missing: 3 ∈ A has no pair in R.
**Root cause:** Students focus on "one output per input" and stop there, not registering that "every input must have an output" is a separate, equally essential condition.
**Repair chain:** B-01 — left-totality drill.

### MC-2: Function Requires a Formula
**Label:** FORMULA-ONLY
**Statement:** Student believes a function must be expressible as a mathematical formula (e.g., f(x) = x² + 1) and rejects functions defined by lookup tables, finite sets of pairs, or recursive definitions.
**Trigger:** Given the function f = {(1,a),(2,b),(3,b)} on {1,2,3} → {a,b,c} — student says "this isn't a function because there's no formula for it."
**Root cause:** School experience with functions (linear, quadratic, trigonometric) is exclusively formula-based; students overgeneralize this as the definition.
**Repair chain:** B-02 — formula-free function examples.

### MC-3: Range Equals Codomain
**Label:** RANGE-CODOMAIN-CONFLATION
**Statement:** Student treats the range/image (the actual set of output values that appear) as identical to the codomain (the declared output set). This leads to errors when deciding whether a function is surjective.
**Trigger:** f: {1,2,3} → {a,b,c,d}, f = {(1,a),(2,b),(3,b)} — student says "the range is {a,b,c,d}" (mistakenly including c and d which are never output).
**Root cause:** In everyday language, "range" and "codomain" are synonymous. In mathematics they are distinct.
**Repair chain:** B-03 — range vs. codomain contrast.

**MAMR Protocol:** MC-1 is FOUNDATIONAL; MC-2 and MC-3 are secondary. MC-1 cleared first; MC-2 and MC-3 FIFO after.

---

## Component 4 — Teaching Action Sequence (Protocol A)

**CPA Entry Stage:** C (difficulty=2, domain=math.found)
**Session TA Cap:** 7 (estimated_hours=4 → ≥1h range)
**Protocol A TA Count:** 7

---

### TA-A01: Function as a Right-Unique, Left-Total Relation
**Primitives:** P03 ANALOGY BRIDGE → P11 REPRESENTATION SHIFT → P49 ADAPTIVE CHECKPOINT

**Delivery:**

**P03 — ANALOGY BRIDGE**

> "A vending machine is a function: every button press (input) produces exactly one item (output), and every button is guaranteed to work (no unresponsive buttons). If a button could give you two different items, or if some buttons gave nothing at all, the machine would be broken — it would fail to be a 'functional' machine in the mathematical sense."

Formal definition:

> **Function (Set-Theoretic):** A function f from A to B is a relation f ⊆ A×B satisfying:
>
> 1. **Left-total (domain coverage):** For every a ∈ A, there exists some b ∈ B with (a,b) ∈ f.
>    Every domain element has at least one output.
>
> 2. **Right-unique (determinism):** For every a ∈ A and every b₁, b₂ ∈ B, if (a,b₁) ∈ f and (a,b₂) ∈ f then b₁ = b₂.
>    Every domain element has at most one output.
>
> Together: every domain element has **exactly one** output.
>
> Notation: f: A → B, where A is the **domain** and B is the **codomain**. Write f(a) = b when (a,b) ∈ f.

Memory aid: **LT-RU** — Left-Total, Right-Unique. A function is an LT-RU relation.

**P11 — REPRESENTATION SHIFT**

The same function f: {1,2,3} → {a,b,c,d} defined by f(1)=a, f(2)=b, f(3)=b in three forms:

*Set of ordered pairs:*
f = {(1,a), (2,b), (3,b)} ⊆ {1,2,3} × {a,b,c,d}

*Arrow diagram:*
```
1 ——→ a
2 ——→ b ←——— 3
      c
      d
```
(c and d have no arrows pointing to them — they are in the codomain but not the range.)

*Tabular form:*

| input (a) | output f(a) |
|---|---|
| 1 | a |
| 2 | b |
| 3 | b |

Note: Two inputs (2 and 3) mapping to the same output (b) is allowed — this does NOT violate right-uniqueness. Right-uniqueness constrains INPUTS (each has at most one output), not outputs (multiple inputs can share an output).

**P49 — ADAPTIVE CHECKPOINT**

> Q: "Is R = {(1,x),(2,y),(2,z)} on A = {1,2} and B = {x,y,z} a function? Check both LT and RU conditions."

- **CORRECT (NO)** → "Correct. LT: 1 maps to x ✓, 2 maps to something ✓ — both covered. RU: 2 maps to BOTH y and z — violated ✗. R is not a function because element 2 has two distinct outputs. Proceed to TA-A02."
- **PARTIAL** → "You identified that something is wrong. State which condition (LT or RU) fails and give the specific element that witnesses the failure."
- **INCORRECT** → "Check RU for element 2: is (2,y) ∈ R? YES. Is (2,z) ∈ R? YES. Are y and z the same? NO. So element 2 has two different outputs → right-uniqueness fails → not a function."
- **NO_RESPONSE** → "Two conditions: (1) Does every element of A appear as a first component? (2) Does any element of A appear twice with different second components? Find where each condition stands."

---

### TA-A02: Three Representations
**Primitives:** P04 PATTERN INDUCTION → P49 ADAPTIVE CHECKPOINT

**Delivery:**

**P04 — PATTERN INDUCTION**

Present the same function three ways and confirm it is a function in each representation.

**Function g: {p,q,r} → ℤ defined by g(p) = 3, g(q) = −1, g(r) = 3:**

*Set of pairs:* g = {(p,3), (q,−1), (r,3)}
- LT: p✓, q✓, r✓ — all three domain elements appear.
- RU: Each first component (p, q, r) appears exactly once — no element has two outputs.
- → FUNCTION ✓

*Arrow diagram:*
```
p ——→  3 ←——— r
q ——→ −1
```
- LT: every element on the left has an arrow. ✓
- RU: each left element has exactly one arrow. ✓

*Tabular form:*

| input | output |
|---|---|
| p | 3 |
| q | −1 |
| r | 3 |

- LT: every input row is filled. ✓
- RU: no input row has two different output values. ✓

**Three failing relation examples (not functions):**

| Relation | Failure | Reason |
|---|---|---|
| {(1,a),(2,b)} on A={1,2,3}, B={a,b,c} | LT fails | 3 ∈ A has no output |
| {(1,a),(1,b),(2,c)} on A={1,2}, B={a,b,c} | RU fails | 1 has two outputs (a and b) |
| ∅ on A={1}, B={a} | LT fails | 1 ∈ A has no output |

**P49 — ADAPTIVE CHECKPOINT**

> Q: "Draw an arrow diagram for h: {x,y} → {1,2,3} where h(x) = 2, h(y) = 2. Is h a function?"

- **CORRECT** → "Arrow diagram: x→2, y→2. LT: both x and y have arrows ✓. RU: x has exactly one arrow, y has exactly one arrow ✓. h IS a function. Note: two inputs pointing to the same output is fine — it's only two outputs from one input that fails RU. Proceed to TA-A03."
- **PARTIAL** → "Your diagram is correct (or close). Now explicitly verify LT and RU and state your conclusion."
- **INCORRECT** → "Draw two nodes on the left (x,y) and three on the right (1,2,3). Draw an arrow from x to 2, and an arrow from y to 2. Does every left node have exactly one arrow? That's LT + RU combined."
- **NO_RESPONSE** → "Arrow diagram: put the domain {x,y} on the left and codomain {1,2,3} on the right. Draw an arrow from each domain element to its assigned output."

---

### TA-A03: Domain, Codomain, and Image
**Primitives:** P27 MISCONCEPTION NAMING (MC-3) → P06 CONTRAST PAIR PROMPT → P49 ADAPTIVE CHECKPOINT

**Delivery:**

**P27 — MISCONCEPTION NAMING**

> "The word 'range' is ambiguous in mathematics: some authors use it to mean codomain, others use it to mean image. To avoid confusion, we'll use 'codomain' for the declared output set (B in f: A→B) and 'image' or 'range' for the set of values that ACTUALLY appear as outputs. These are different."

Formal definitions:

> - **Domain of f:** The set A — all valid inputs.
> - **Codomain of f:** The set B — the declared set of possible outputs.
> - **Image of f** (also called range): im(f) = {f(a) : a ∈ A} = the set of values that f ACTUALLY produces.
>
> Always: im(f) ⊆ codomain, but im(f) may be a proper subset.

**P06 — CONTRAST PAIR PROMPT**

**Example: f = {(1,a),(2,b),(3,b)}, f: {1,2,3} → {a,b,c,d}**

- Domain = {1,2,3}
- Codomain = {a,b,c,d}
- Image = {a,b} (only a and b actually appear as outputs; c and d are in the codomain but never output)
- im(f) = {a,b} ⊊ {a,b,c,d} = codomain ← proper subset

**Contrast: Example where image = codomain:**
g: {1,2,3} → {a,b,c}, g(1)=a, g(2)=b, g(3)=c
- Image = {a,b,c} = codomain ← these happen to be equal (g is surjective, see TA-A05)

Key distinction:
> "Codomain is declared when you write 'f: A → B'. Image is computed by looking at all actual outputs."

**P49 — ADAPTIVE CHECKPOINT**

> Q: "For h: ℕ → ℤ defined by h(n) = n − 5: (a) What is the domain? (b) What is the codomain? (c) What is the image of h?"

- **CORRECT** → "(a) ℕ; (b) ℤ; (c) im(h) = {n−5 : n ∈ ℕ} = {−5,−4,−3,...} = all integers ≥ −5. The image is a proper subset of ℤ (negative integers less than −5 are not in the image). Proceed to TA-A04."
- **PARTIAL** → "You got domain and codomain right. For image: what values can h(n) = n−5 actually produce as n ranges over ℕ? What is the smallest possible output?"
- **INCORRECT** → "Domain = the input set (ℕ). Codomain = the declared output set (ℤ). Image = the set of actual outputs = {h(0), h(1), h(2),...} = {−5,−4,−3,...}."
- **NO_RESPONSE** → "h: ℕ → ℤ tells you: domain = ℕ, codomain = ℤ. For image: compute h(0) = 0−5 = −5; h(1) = −4; h(2) = −3. What pattern do you see?"

---

### TA-A04: When a Relation Is NOT a Function
**Primitives:** P41 MISCONCEPTION DETECTOR (MC-1) → P07 WORKED EXAMPLE PAIR → P49 ADAPTIVE CHECKPOINT

**Delivery:**

**P41 — MISCONCEPTION DETECTOR (MC-1: Left-Totality Forgotten)**

> "Quick check: Is R = {(1,a),(3,b)} on A = {1,2,3}, B = {a,b} a function?"

- If student says YES (MC-1 active): "Element 2 ∈ A has no pair in R — left-totality fails. A function requires EVERY domain element to have an output, not just some of them." Trigger repair flag.
- If student says NO (correct): proceed to P07.

**P07 — WORKED EXAMPLE PAIR**

**Example A — Fails left-totality:**
R = {(a,1),(c,2)} on A = {a,b,c}, B = {1,2,3}.

Step 1 — LT check: Is every element of A covered?
- a: (a,1) ∈ R ✓
- b: No pair (b,?) in R ✗ ← FAILS HERE
- c: (c,2) ∈ R ✓

Conclusion: LT fails at element b. R is NOT a function.

**Example B — Fails right-uniqueness:**
R = {(a,1),(a,2),(b,3)} on A = {a,b}, B = {1,2,3}.

Step 1 — LT check: a ✓ (has output), b ✓ (has output) → LT PASSES.
Step 2 — RU check: a → 1 AND a → 2 (two distinct outputs). 1 ≠ 2 ✗ ← FAILS HERE.

Conclusion: RU fails at element a. R is NOT a function.

**Systematic procedure:**
```
FUNCTION-CHECK(R, A, B):
  FOR EACH a in A:
    outputs := {b ∈ B : (a,b) ∈ R}
    IF |outputs| = 0 → FAIL left-totality (element a is unmapped)
    IF |outputs| > 1 → FAIL right-uniqueness (element a has multiple outputs)
  RETURN "R is a function"
```

**P49 — ADAPTIVE CHECKPOINT**

> Q: "R = {(1,x),(2,x),(3,y),(3,z)} on A = {1,2,3}, B = {x,y,z}. Apply the FUNCTION-CHECK. Is R a function? If not, state which element causes which condition to fail."

- **CORRECT** → "Correct. LT: 1→x ✓, 2→x ✓, 3→{y,z} (at least one output) ✓. RU: 1→one output ✓, 2→one output ✓, 3→two outputs (y and z) ✗. R fails right-uniqueness at element 3. NOT a function. Proceed to TA-A05."
- **PARTIAL** → "You found an error. Complete the full check: apply FUNCTION-CHECK to all three elements, state LT and RU result for each, then conclude."
- **INCORRECT** → "Check element 3: (3,y) ∈ R and (3,z) ∈ R. Are y and z the same element? NO. So 3 has two distinct outputs → right-uniqueness fails."
- **NO_RESPONSE** → "Apply FUNCTION-CHECK: for each element of A, count how many outputs it has. Element 3: what outputs does it have in R?"

---

### TA-A05: Injective, Surjective, Bijective
**Primitives:** P03 ANALOGY BRIDGE → P04 PATTERN INDUCTION → P49 ADAPTIVE CHECKPOINT

**Delivery:**

**P03 — ANALOGY BRIDGE**

> "A function can be fine-tuned in two directions: on the input side (can two different inputs share one output?) and on the output side (does every output get used?). Injective asks: 'are all inputs distinguishable by their outputs?' Surjective asks: 'does every declared output get produced?' Bijective means BOTH — a perfect one-to-one correspondence."

Formal definitions:

> **Injective (one-to-one):** f: A→B is injective if f(a₁) = f(a₂) ⟹ a₁ = a₂.
> Equivalently: distinct inputs always produce distinct outputs.
>
> **Surjective (onto):** f: A→B is surjective if for every b ∈ B, ∃a ∈ A: f(a) = b.
> Equivalently: the image equals the codomain (im(f) = B).
>
> **Bijective:** f is bijective if it is both injective AND surjective.
> A bijection is a one-to-one correspondence between A and B.

**P04 — PATTERN INDUCTION**

f: {1,2,3} → {a,b,c,d}

| Function | Definition | Injective? | Surjective? |
|---|---|---|---|
| f₁ = {(1,a),(2,b),(3,c)} | Each input→distinct output | YES (all distinct) | NO (d unused) |
| f₂ = {(1,a),(2,b),(3,b)} | 2 and 3 share output b | NO (2→b, 3→b) | NO (c,d unused) |
| f₃: {1,2,3,4}→{a,b,c} defined by f₃(1)=a,f₃(2)=b,f₃(3)=c,f₃(4)=a | Two inputs→a | NO (1→a, 4→a) | YES (a,b,c all appear) |
| f₄: {1,2,3}→{a,b,c}, f₄(1)=a,f₄(2)=b,f₄(3)=c | Perfect match | YES | YES (bijection) |

Arrow diagram pattern:
- Injective = no two arrows share a target.
- Surjective = every right node has at least one arrow pointing to it.
- Bijective = every right node has exactly one arrow; every left node has exactly one arrow.

**P49 — ADAPTIVE CHECKPOINT**

> Q: "f: {1,2,3} → {a,b,c} is defined by f(1)=b, f(2)=a, f(3)=c. Is f injective? Surjective? Bijective?"

- **CORRECT** → "Injective: 1→b, 2→a, 3→c — all distinct outputs. YES. Surjective: outputs used are {a,b,c} = codomain. YES. Bijective: both → YES. This is a bijection. Proceed to TA-A06."
- **PARTIAL** → "You got one or two right. For injectivity: check all pairs of inputs — do any two share an output? For surjectivity: what is the image? Does it equal {a,b,c}?"
- **INCORRECT** → "Injectivity: list outputs: f(1)=b, f(2)=a, f(3)=c. Are any two the same? NO → injective. Surjectivity: image = {b,a,c} = {a,b,c} = codomain → surjective."
- **NO_RESPONSE** → "Injectivity check: do any two different inputs have the same output? List f(1), f(2), f(3) and look for duplicates."

---

### TA-A06: Function vs. Relation — The Full Spectrum
**Primitives:** P06 CONTRAST PAIR PROMPT → P49 ADAPTIVE CHECKPOINT

**Delivery:**

**P06 — CONTRAST PAIR PROMPT**

**Spectrum of relations (from most general to most restrictive):**

| Structure | Conditions | Example |
|---|---|---|
| Relation (R ⊆ A×B) | No conditions | {(1,a),(1,b),(2,a)} — neither LT nor RU required |
| Partial function | Right-unique only | {(1,a),(2,b)} on A={1,2,3} — 3 has no output (LT fails) |
| Function (total function) | LT + RU | {(1,a),(2,b),(3,a)} — every input has exactly one output |
| Injective function | LT + RU + distinct outputs | {(1,a),(2,b),(3,c)} — no two inputs share an output |
| Surjective function | LT + RU + im=codomain | {(1,a),(2,b),(1,c)} ← wait, not right-unique. Revise: f:A→B with |A|≥|B| and im=B |
| Bijective function | LT + RU + injective + surjective | {(1,a),(2,b),(3,c)}: {1,2,3}→{a,b,c} |

Correct surjective example: f:{1,2,3,4}→{a,b,c} with f(1)=a, f(2)=b, f(3)=c, f(4)=a — every element of {a,b,c} appears.

Key insight:
> "A function is a relation with two extra constraints: LT and RU. Injective/surjective/bijective are additional refinements on top of the function constraints. Every bijection is a function, but not every function is a bijection."

**P49 — ADAPTIVE CHECKPOINT**

> Q: "Classify R = {(1,a),(2,b)} on A = {1,2}, B = {a,b,c}: is it a relation? A partial function? A function? Injective? Surjective?"

- **CORRECT** → "It is a relation (always). Partial function: YES (right-unique — each element of A that appears has exactly one output; but check LT). LT: both 1 and 2 have outputs ✓ → it IS a total function. Injective: f(1)=a, f(2)=b — distinct outputs → YES. Surjective: image = {a,b} ≠ {a,b,c} — c is unused → NO. Proceed to TA-A07."
- **PARTIAL** → "You classified some correctly. Apply each condition in order: relation? always. LT? RU? If both pass → function. Then check injective and surjective."
- **INCORRECT** → "Start from the top: Is it a relation (subset of A×B)? YES, trivially. Is it LT (every element of A={1,2} has an output)? Check 1 and 2. Is it RU (no element has two outputs)? Check."
- **NO_RESPONSE** → "Step 1: every subset of A×B is a relation. Step 2: left-total = does 1 have an output? Does 2 have an output?"

---

### TA-A07: Mastery Gate
**Primitives:** P91 [P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78]
**Gate type:** Terminal (GR-3). Pass → mark concept mastered and exit Protocol A.

**P77 — Multi-Problem Set (Q1–Q6):**

Q1. Is R = {(a,1),(b,2),(c,1),(d,3)} a function from {a,b,c,d} to {1,2,3}? Verify LT and RU.
Q2. Is R = {(1,x),(2,y)} a function from {1,2,3} to {x,y,z}? Which condition fails?
Q3. f: ℝ → ℝ defined by f(x) = x². Is f injective? (Hint: consider x = 1 and x = −1.)
Q4. f: ℝ → [0,∞) defined by f(x) = x². Now is f surjective? (Hint: what is the image of f?)
Q5. Give an example of a bijection from {1,2,3} to {a,b,c}.
Q6. What is the image of f: {0,1,2,3} → ℤ defined by f(n) = 2n?

**P55 — Score (Q1–Q6):** 1 point each = 6 points possible.

Expected answers:
- Q1: YES. LT: a→1✓, b→2✓, c→1✓, d→3✓. RU: each element appears exactly once as a first component ✓. Function.
- Q2: NO — LT fails. Element 3 ∈ {1,2,3} has no output in R.
- Q3: NO — f is NOT injective. f(1) = 1 and f(−1) = 1, but 1 ≠ −1. Two distinct inputs share one output.
- Q4: YES — f: ℝ → [0,∞) IS surjective. For every y ≥ 0, take x = √y; then f(√y) = y. Every non-negative real is achieved.
- Q5: Any bijection, e.g., f(1) = a, f(2) = b, f(3) = c. (Must be injective and surjective.)
- Q6: im(f) = {0, 2, 4, 6} — the set of even non-negative integers up to 6.

**P76 — Cross-Link Transfer Probe (math.func.function-concept):**

> "The informal notion of a function (from math.func.function-concept) treats a function as an input-output machine or as a graph (curve) in the coordinate plane. For example, f(x) = x² is often pictured as a parabola.
>
> (a) How does the set-theoretic definition — function = LT + RU relation — make the input-output machine idea precise? What does each condition (LT and RU) correspond to in the machine analogy?
>
> (b) The 'graph' of f: ℝ → ℝ in calculus is the set of points {(x, f(x)) : x ∈ ℝ}. What is this set in set-theoretic terms?"

Expected:
- (a) LT = every button works (every input produces at least one output = machine is total/complete). RU = the machine is deterministic (the same input always gives the same output — no randomness). Together: input-output machine is a total deterministic machine = a function.
- (b) The graph {(x, f(x)) : x ∈ ℝ} is exactly the function f as a set of ordered pairs — f ⊆ ℝ×ℝ. The set-theoretic definition says f IS this set of pairs. The graph is not a picture OF the function; it IS the function (in the set-theoretic sense).

**P55 — Score (P76):** 1 point for correctly stating what LT and RU correspond to in the machine analogy AND identifying the calculus graph as the function's set of ordered pairs.

**P75 — Mastery Assessment:**

| Score | Percentage | Assessment |
|---|---|---|
| 7/7 | 100% | Mastery confirmed at 1.00 |
| 6/7 | 85.7% | At mastery threshold (0.85) — PASS |
| 5/7 | 71.4% | Below threshold. Targeted repair for missed items. |
| ≤4/7 | ≤57.1% | Well below threshold. Full Protocol B remediation. |

**P55 — Score (overall):** Report __/7.

**P74 — Routing Decision:**
- Score 7/7 or 6/7 → mastery PASS → P78 COMPLETION
- Score 5/7 → identify missed items; targeted repair (B-01 for LT/RU; B-02 for formula-only; B-03 for range/codomain)
- Score ≤4/7 → Protocol B full remediation starting from B-01

**P55 — Score final:** Record to student memory.

**P78 — Completion:**
> "Function (Set-Theoretic): MASTERED. You can define a function as a left-total right-unique relation, verify both conditions from any representation, distinguish domain/codomain/image, classify functions as injective/surjective/bijective, and connect the set-theoretic definition to the informal input-output and graph notions."
>
> Next concept directly unlocked: math.func.function-concept (the applied/informal function theory used in calculus and analysis).

---

## Component 5 — Repair Protocols

### Protocol B: Misconception Repair Chains

**B-01: DOMAIN-COVERAGE-OMISSION Repair (MC-1 — Left-Totality)**
1. P27 MISCONCEPTION NAMING: "A function needs EVERY domain element to have an output. Checking only elements that appear in R is not enough — you must verify that every element of A is listed as a first component."
2. Roll-call drill: given R and A, student writes all elements of A as a column, then checks off each one that appears as a first component in R. Any unchecked element = LT failure.
3. P07 WORKED EXAMPLE: R = {(1,a),(3,b)} on A = {1,2,3}: student writes "1: ✓ (has (1,a)), 2: ✗ (no pair), 3: ✓ (has (3,b))." Conclude: not a function.
4. P49 ADAPTIVE CHECKPOINT: three examples; student must perform the roll-call check explicitly for each.

**B-02: FORMULA-ONLY Repair (MC-2 — Non-Formula Functions)**
1. P27 MISCONCEPTION NAMING: "A function is defined by the LT+RU property, not by having a formula. Many real-world functions have no closed-form formula."
2. Examples of formula-free functions: phone book (person → phone number), ISBN lookup (book ID → title), DNA codon table (3-nucleotide codon → amino acid).
3. Walk through f = {(cat,4),(dog,4),(fish,0),(spider,8)} on animal names → leg-counts: LT ✓, RU ✓ → it IS a function, despite having no formula.
4. P49 ADAPTIVE CHECKPOINT: student identifies three formula-free functions from everyday life and checks LT+RU.

**B-03: RANGE-CODOMAIN-CONFLATION Repair (MC-3)**
1. P27 MISCONCEPTION NAMING: "Codomain is what you declare (B in f: A→B). Image is what you compute (the actual output values). They can differ."
2. P06 CONTRAST: f: ℕ → ℤ, f(n) = n. Codomain = ℤ. Image = ℕ ⊊ ℤ (non-negative integers only; negative integers are in codomain but never output).
3. Drill: three functions; student explicitly lists codomain AND image for each.
4. P49 ADAPTIVE CHECKPOINT: given function, student states codomain, computes image, and determines whether image = codomain.

---

## Component 6 — Transfer & Cross-Link Inventory

**Cross-link:** math.func.function-concept — the informal/applied notion of function (input-output machine, graph in coordinate plane, continuous functions). Used in TA-A07 P76 transfer probe to bridge set-theoretic definition to applied understanding.

**P76 Cross-link Probe Summary:** Students connect (a) LT+RU to the machine analogy and (b) the function-as-set-of-pairs to the calculus notion of graph. This is the primary cross-link bridge and uses the actual cross_link math.func.function-concept (not a self-contained real-world context, since the cross_links field is non-empty).

**Additional transfer contexts (for repair and enrichment):**
- Database primary keys: the mapping (row_id → row_data) is a function (LT: every ID has a record; RU: each ID has exactly one record). Bijective if no two IDs share a record and every ID is used.
- Programming: a pure deterministic function (no side effects, same input always returns same output) is a mathematical function (RU guaranteed; LT guaranteed if the function is total/terminates on all inputs).

---

## Component 7 — Assessment Item Bank

| # | Type | Item | Answer | Targets |
|---|---|---|---|---|
| 1 | Verify | R = {(1,a),(2,a),(3,a)} on A={1,2,3}, B={a,b}. Is R a function? Injective? Surjective? | Function YES (LT✓, RU✓). Injective NO (1,2,3 all→a). Surjective NO (b unused). | Classification |
| 2 | Verify | R = {(x,1),(x,2),(y,3)} on A={x,y}, B={1,2,3}. Is R a function? | NO — RU fails: x→1 and x→2. | MC-1 |
| 3 | True/False | The empty function f: ∅ → B (domain is the empty set) is a valid function. | TRUE — LT vacuously holds (no elements to check); RU vacuously holds. | Edge case |
| 4 | Short answer | What is the image of f: {1,2,3,4} → ℤ defined by f(n) = (−1)ⁿ? | {−1, 1} (alternating signs) | Image computation |
| 5 | True/False | Every bijection has an inverse function. | TRUE — LT+RU of original gives RU+LT of inverse respectively. | Bijection |
| 6 | Classify | f: ℝ → ℝ, f(x) = 2x + 1. Injective? Surjective? | Both (bijection) — injective: 2x₁+1=2x₂+1 ⟹ x₁=x₂; surjective: image = ℝ. | Real function |
| 7 | Classify | f: ℝ → ℝ, f(x) = sin(x). Injective? Surjective? | Neither — not injective (sin(0)=sin(π)=0); not surjective (image=[-1,1] ⊊ ℝ). | Real function |
| 8 | Construct | Give a function f: {1,2,3,4} → {a,b} that is surjective but not injective. | Any mapping where both a and b appear, e.g., f(1)=a,f(2)=a,f(3)=b,f(4)=b. | Construction |
| 9 | Short answer | If f: A→B is bijective, what can you say about |A| and |B|? | |A| = |B| (bijection establishes that A and B have the same cardinality). | Cardinality |
| 10 | True/False | A function can have more elements in its codomain than in its domain and still be surjective. | FALSE — if |B| > |A|, at least |B|−|A| elements of B go uncovered by a function from A. | Surjectivity |
| 11 | Analysis | R = {(1,a),(2,b),(3,c),(3,d)} on A={1,2,3}, B={a,b,c,d}. Which condition fails? | RU — element 3 maps to both c and d. | RU check |
| 12 | Connect | Explain in one sentence how the set-theoretic definition of function and the informal 'input-output machine' notion are related. | The machine analogy: LT = every button works (total); RU = the machine is deterministic (same input, always same output). | MC-2 / Cross-link |

---

## Component 8 — Spaced Repetition Schedule

**P89 Spaced Repetition:** Intervals — Day 1, Day 3, Day 7, Day 21, Day 60.

| Day | Probe Focus | Sample Item |
|---|---|---|
| Day 1 | LT + RU check | Given a relation table, verify whether it is a function |
| Day 3 | Domain/codomain/image | Compute image of a given function |
| Day 7 | Injective/Surjective/Bijective | Classify three functions from their definitions |
| Day 21 | Non-formula functions | Give a real-world function defined by a table; verify LT+RU |
| Day 60 | Cross-link integration | Describe how a calculus function (with a graph) is a set of ordered pairs; state LT and RU in that context |

**Decay protocol:** If student fails a spaced probe → reset to Day 1 + Protocol B (B-01 for LT issues; B-02 for formula-only; B-03 for range/codomain confusion).

---

## Component 9 — Metadata & Validation Checklist

**Authoring metadata:**
- Blueprint ID: math.found.function-set-theoretic
- Version: 1.0.0
- Status: PACKAGE_READY
- Authored: 2026-07-11
- KG Source: docs/mathematics/kg/graph.json (v1.0.1, status=frozen)

**Component 10 — Validation Checklist:**

| Check | Criterion | Status |
|---|---|---|
| V-1 | KG ID exists in docs/mathematics/kg/graph.json | PASS — math.found.function-set-theoretic confirmed present |
| V-2 | All KG fields accurately transcribed | PASS — difficulty=developing, bloom=understand, threshold=0.85, hours=4, cross_links=[math.func.function-concept] |
| V-3 | Prerequisite map complete | PASS — math.found.cartesian-product and math.found.relation both listed |
| V-4 | Learning objectives match bloom level (understand) | PASS — objectives use define/verify/distinguish/represent/classify/connect (comprehension verbs) |
| V-5 | CPA entry stage correct | PASS — C stage (difficulty=2, domain=math.found) |
| V-6 | Session TA cap respected | PASS — 7 TAs = 7-TA cap exactly |
| V-7 | Every non-repair TA opens with B-category primitive (GR-1) | PASS — TA-A01: P03; TA-A02: P04; TA-A03: P27; TA-A04: P41; TA-A05: P03; TA-A06: P06; TA-A07: P91 |
| V-8 | Every TA contains P49 (GR-2) | PASS — TA-A01 through TA-A06 each contain P49; TA-A07 is P91 terminal (exempt) |
| V-9 | Mastery gate TAs are terminal (GR-3) | PASS — TA-A07 is the only mastery gate and is marked Terminal |
| V-10 | P41/P64 gates repair chains (GR-4) | PASS — TA-A04 uses P41 to detect MC-1 (left-totality); B-01 repair chain in Component 5 |
| V-11 | P91 terminal in its TA (GR-6) | PASS — TA-A07 is the P91 TA; no primitives after P78 |
| V-12 | P76 present in mastery gate (GR-7) | PASS — TA-A07 contains P76 cross-link transfer probe |
| V-13 | Cross-links documented (GR-8) | PASS — cross_links=[math.func.function-concept] stated in Component 0 and Component 6 |
| V-14 | P76 cross-link probe references math.func.function-concept (GR-9 cross-link variant) | PASS — P76 probe explicitly bridges set-theoretic definition to informal input-output and graph notions from math.func.function-concept |
| V-15 | MAMR stated and enforced (GR-10) | PASS — MC-1 FOUNDATIONAL; B-01 clears first; MC-2 and MC-3 FIFO after |
| V-16 | Misconception registry has ≥1 FOUNDATIONAL MC | PASS — MC-1 (DOMAIN-COVERAGE-OMISSION) is FOUNDATIONAL |
| V-17 | Assessment bank has ≥8 items | PASS — 12 items in Component 7 |
| V-18 | Spaced repetition schedule present (P89) | PASS — 5 intervals with probe focus in Component 8 |
| V-19 | All primitives used are from P01–P95 canonical set | PASS — P03, P04, P06, P07, P11, P27, P41, P49, P55, P64, P74, P75, P76, P77, P78, P89, P91 all canonical |
| V-20 | No duplicate of existing blueprint | PASS — no math.found.function-set-theoretic.md existed prior to this authoring |

**AI Removal Test:** Every TA contains concrete mathematical content — formal definitions with examples, complete FUNCTION-CHECK procedure, arrow diagrams in ASCII, worked examples for LT/RU failure, injective/surjective/bijective classification table, and a cross-link probe connecting set theory to calculus function graphs. An educator with no AI access can deliver this lesson from this document alone. AIR = PASS.

**Status: PACKAGE_READY — all 20 V-checks PASS, AIR PASS.**
