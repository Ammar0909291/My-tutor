# Teaching Blueprint: Mathematical Notation
**ID:** math.found.mathematical-notation
**Version:** 1.0.0
**Status:** PACKAGE_READY
**Schema:** Blueprint Specification v1.0

---

## Component 0 — Concept Identity & Authoring Metadata

| Field | Value |
|---|---|
| KG ID | math.found.mathematical-notation |
| Name | Mathematical Notation |
| Aliases | mathematical symbols, symbolic notation |
| Domain | math.found |
| Difficulty | foundational (1) |
| Bloom | remember |
| Mastery Threshold | 0.85 |
| Estimated Hours | 3 |
| Requires | math.found.mathematical-language |
| Unlocks | math.found.variable |
| Cross-links | (none) |
| P76 Independence | YES — cross_links=[], all transfer probes use self-contained real-world contexts |
| Blueprint Version | 1.0.0 |
| Authored | 2026-07-11 |

---

## Component 1 — Learning Objectives

On completion of all Protocol A Teaching Actions, a student will be able to:

1. **Recall** and correctly write the standard symbols for arithmetic operations and comparisons.
2. **Read** set-theoretic notation (∈, ∉, ⊆, ⊂, ∪, ∩, ∅, 𝒫(A), A×B) and state what each means.
3. **Interpret** quantifier symbols (∀, ∃) and logical connectives (¬, ∧, ∨, ⟹, ⟺).
4. **Decode** basic function notation (f: A→B, f(x)) and summation notation (∑).
5. **Distinguish** symbols that are commonly confused: ⊆ vs. ⊂, ∈ vs. ⊆, ⟹ vs. ⟺.

---

## Component 2 — Prerequisite Map

| Prerequisite KG ID | Name | Role |
|---|---|---|
| math.found.mathematical-language | Mathematical Language | Notation is the symbolic extension of mathematical language — student must already understand what precise mathematical statements mean before learning the symbols that encode them |

**Assumed entering knowledge:** Student understands what it means to make a precise mathematical claim in words. Student knows set, element, function, and relation at a definitional level.

---

## Component 3 — Misconception Registry

### MC-1 (FOUNDATIONAL): ⊆ and ∈ Are Interchangeable
**Label:** MEMBERSHIP-SUBSET-CONFUSION
**Statement:** Student uses ∈ (membership) and ⊆ (subset) interchangeably — writing "2 ⊆ ℕ" or "{2} ∈ ℕ" instead of correctly pairing element with ∈ and subset with ⊆.
**Trigger:** Asked to express "2 is an element of ℕ" → writes "2 ⊆ ℕ". Or "the even numbers are a subset of ℕ" → writes "evens ∈ ℕ."
**Root cause:** Both symbols relate a "smaller thing" to a "larger thing" — students don't register that ∈ is about a single object and ⊆ is about a collection.
**Repair chain:** B-01 — element vs. set contrast.

### MC-2: ⊆ and ⊂ Are the Same Symbol
**Label:** SUBSET-PROPER-CONFUSION
**Statement:** Student treats ⊆ (subset or equal) and ⊂ (proper subset — some texts use this; other texts use ⊂ for the same as ⊆) as identical, not registering the potential strict/non-strict distinction.
**Trigger:** Asked whether {1,2} ⊂ {1,2} → says YES without noting the convention ambiguity, or conversely says NO thinking ⊂ always means proper subset.
**Root cause:** Different textbooks use ⊂ differently (some mean proper subset, others mean subset-or-equal). Students haven't been told to check their source's convention.
**Repair chain:** B-02 — convention awareness drill.

### MC-3: ⟹ and ⟺ Are the Same Arrow
**Label:** IMPLIES-IFF-CONFUSION
**Statement:** Student uses ⟹ (implies, one-way) and ⟺ (if and only if, two-way) interchangeably.
**Trigger:** Writes "n is even ⟺ n² is even" when they mean "n is even ⟹ n² is even" (the converse requires separate proof).
**Root cause:** Both symbols are "arrows" connecting propositions; students see them as stylistic variants.
**Repair chain:** B-03 — one-way vs. two-way arrow drill.

**MAMR Protocol:** MC-1 is FOUNDATIONAL; MC-2 and MC-3 are secondary. MC-1 cleared first; MC-2 and MC-3 FIFO after.

---

## Component 4 — Teaching Action Sequence (Protocol A)

**CPA Entry Stage:** C (difficulty=1, domain=math.found)
**Session TA Cap:** 7 (estimated_hours=3 → ≥1h range)
**Protocol A TA Count:** 5

---

### TA-A01: Arithmetic and Comparison Symbols
**Primitives:** P03 ANALOGY BRIDGE → P04 PATTERN INDUCTION → P49 ADAPTIVE CHECKPOINT

**Delivery:**

**P03 — ANALOGY BRIDGE**

> "Mathematical notation is to mathematics what musical notation is to music — a compact, unambiguous code that lets practitioners communicate complex ideas instantly across languages and time. Once you know the symbols, you can read mathematics written in any human language."

**P04 — PATTERN INDUCTION**

**Arithmetic and comparison symbol table:**

| Symbol | Name | Meaning | Example |
|---|---|---|---|
| + | Plus | Addition | 3 + 4 = 7 |
| − | Minus | Subtraction | 9 − 5 = 4 |
| × or · | Times | Multiplication | 3 × 4 = 12 |
| ÷ or / | Divided by | Division | 12 ÷ 4 = 3 |
| = | Equals | Both sides identical | 2 + 3 = 5 |
| ≠ | Not equal | Not the same | 2 ≠ 3 |
| < | Less than | Strict inequality | 2 < 5 |
| > | Greater than | Strict inequality | 5 > 2 |
| ≤ | Less than or equal | Non-strict inequality | 3 ≤ 3 and 2 ≤ 3 |
| ≥ | Greater than or equal | Non-strict inequality | 3 ≥ 3 and 5 ≥ 3 |
| := | Defined as | Definition assignment | n := 2k |
| ≈ | Approximately equal | Numerical approximation | π ≈ 3.14159 |

Reading convention: "a < b" is read "a is less than b." "a ≤ b" is read "a is less than or equal to b."

**P49 — ADAPTIVE CHECKPOINT**

> Q: "Translate the following into symbols: (a) 'x is not equal to 5'; (b) 'the quantity a is at most b'; (c) 'y is strictly greater than 0'."

- **CORRECT** → "(a) x ≠ 5; (b) a ≤ b; (c) y > 0. All correct. Proceed to TA-A02."
- **PARTIAL** → "You got some right. Review: 'at most b' means b is an upper limit including equality — use ≤. 'Strictly greater than' means > not ≥."
- **INCORRECT** → "Review the table: ≠ means 'not equal'; ≤ means 'less than or equal to' (i.e., at most); > means 'greater than' (strict, not including equal)."
- **NO_RESPONSE** → "Start with (a): which symbol means 'not equal to'? It is a crossed-out equals sign."

---

### TA-A02: Set-Theoretic Notation
**Primitives:** P27 MISCONCEPTION NAMING (MC-1) → P04 PATTERN INDUCTION → P06 CONTRAST PAIR PROMPT → P49 ADAPTIVE CHECKPOINT

**Delivery:**

**P27 — MISCONCEPTION NAMING**

> "One of the most common notation errors is mixing up ∈ (membership, for a single element) and ⊆ (subset, for a collection). Rule: ∈ goes between an OBJECT and a SET. ⊆ goes between two SETS."

**P04 — PATTERN INDUCTION**

**Set-theoretic symbol table:**

| Symbol | Name | Meaning | Correct usage | Wrong usage |
|---|---|---|---|---|
| ∈ | Element of | a is a member of A | 2 ∈ ℤ | {2} ∈ ℤ (should be ⊆) |
| ∉ | Not element of | a is not in A | 0.5 ∉ ℤ | — |
| ⊆ | Subset or equal | Every member of A is in B | {2,4} ⊆ ℤ | 2 ⊆ ℤ (should be ∈) |
| ⊂ | Proper subset | A ⊆ B and A ≠ B (convention-dependent) | {2,4} ⊂ ℕ | varies by source |
| ⊇ | Superset | B contains all of A | ℤ ⊇ ℕ | — |
| ∪ | Union | Elements in A or B (or both) | {1,2} ∪ {2,3} = {1,2,3} | — |
| ∩ | Intersection | Elements in both A and B | {1,2} ∩ {2,3} = {2} | — |
| ∅ or {} | Empty set | The set with no elements | ∅ ∩ {1} = ∅ | — |
| 𝒫(A) | Power set | All subsets of A | 𝒫({a,b}) = {∅,{a},{b},{a,b}} | — |
| A × B | Cartesian product | All ordered pairs (a,b), a∈A, b∈B | {1,2}×{a,b} = {(1,a),(1,b),(2,a),(2,b)} | — |
| \|A\| or #A | Cardinality | Number of elements in A | \|{1,2,3}\| = 3 | — |

**P06 — CONTRAST PAIR PROMPT**

∈ vs. ⊆:
- "2 ∈ ℤ" ← CORRECT (2 is a single number, ℤ is a set)
- "2 ⊆ ℤ" ← WRONG (2 is not a set of numbers)
- "{2,4} ⊆ ℤ" ← CORRECT ({2,4} is a set, ℤ is a set)
- "{2,4} ∈ ℤ" ← WRONG ({2,4} is not an individual integer)

⊆ vs. ⊂:
- Convention A (many analysis/algebra texts): ⊂ means proper subset (A ⊆ B and A ≠ B).
- Convention B (some texts): ⊂ means the same as ⊆.
- Safe rule: **always use ⊆ for "subset or equal"; use ⊊ (with underline struck) for "proper subset"** to avoid ambiguity.

**P49 — ADAPTIVE CHECKPOINT**

> Q: "Are the following correct? Fix if not: (a) 3 ⊆ ℕ; (b) {3} ∈ ℕ; (c) ∅ ⊆ {1,2,3}; (d) {1,2} ∪ {2,3} = {2}."

- **CORRECT** → "(a) Wrong — 3 ∈ ℕ. (b) Wrong — {3} ⊆ ℕ. (c) Correct — empty set is a subset of every set. (d) Wrong — should be ∩ not ∪; {1,2} ∪ {2,3} = {1,2,3} and {1,2} ∩ {2,3} = {2}. All four identified. Proceed to TA-A03."
- **PARTIAL** → "You caught some errors. For (a) and (b): which symbol goes between an object and a set? Which between two sets? For (d): review ∪ (union = everything in either) vs. ∩ (intersection = only what's in both)."
- **INCORRECT** → "Rule: ∈ = element in a set; ⊆ = one set inside another. For (a): 3 is a number, not a set — use ∈. For (d): union includes all elements from both sets, not just shared ones."
- **NO_RESPONSE** → "For (a): 3 is a single integer, ℕ is a set of integers. Which symbol connects an element to the set it belongs to?"

---

### TA-A03: Logic and Quantifier Notation
**Primitives:** P27 MISCONCEPTION NAMING (MC-3) → P04 PATTERN INDUCTION → P06 CONTRAST PAIR PROMPT → P49 ADAPTIVE CHECKPOINT

**Delivery:**

**P27 — MISCONCEPTION NAMING**

> "A subtle but important distinction: ⟹ (implies, one-directional) is NOT the same as ⟺ (if and only if, both directions). Writing ⟺ when you mean ⟹ claims you have proved something in BOTH directions — the forward AND backward directions. That is a much stronger statement. Always check: have I proved both directions before using ⟺?"

**P04 — PATTERN INDUCTION**

**Logic and quantifier symbol table:**

| Symbol | Name | Meaning | Example |
|---|---|---|---|
| ¬ | Negation | "not" | ¬(n > 0) means n ≤ 0 |
| ∧ | Conjunction | "and" | n > 0 ∧ n < 10 (n in (0,10)) |
| ∨ | Disjunction | "or" (inclusive) | n = 0 ∨ n = 1 |
| ⟹ | Implies | "if…then" (one-way) | n even ⟹ n² even |
| ⟺ | If and only if (iff) | Both directions | n even ⟺ n+1 odd |
| ∀ | For all | Universal quantifier | ∀n ∈ ℕ: n + 0 = n |
| ∃ | There exists | Existential quantifier | ∃n ∈ ℤ: n < 0 |
| ∃! | There exists unique | Exactly one | ∃! n ∈ ℤ: n + 5 = 7 |
| ∴ | Therefore | Conclusion follows | n=2 and n=2k ∴ k=1 |
| ∵ | Because | Justification | n+1 is odd ∵ n is even |
| □ or QED | End of proof | Quod Erat Demonstrandum | □ |

Reading guide:
- "∀x ∈ A: P(x)" reads "for all x in A, P(x) holds."
- "∃x ∈ A: P(x)" reads "there exists an x in A such that P(x) holds."

**P06 — CONTRAST PAIR PROMPT**

⟹ vs. ⟺:

**Pair A — one-way only:** "n is divisible by 4 ⟹ n is divisible by 2." (TRUE. But "n divisible by 2 ⟹ n divisible by 4" is FALSE: 6 is divisible by 2 but not 4. Use ⟹ not ⟺.)

**Pair B — both ways:** "n is even ⟺ n + 1 is odd." (TRUE in both directions: n even → n+1 odd; n+1 odd → n even. Use ⟺.)

∀ vs. ∃:
- "∀n ∈ ℤ: n² ≥ 0" — TRUE. Every integer squared is non-negative.
- "∃n ∈ ℤ: n² = 0" — TRUE. n = 0 is a witness.
- "∀n ∈ ℤ: n² = 0" — FALSE. n = 1 gives 1 ≠ 0. (Note: ∀ requires ALL elements to satisfy the property.)
- "∃n ∈ ℤ: n < −100" — TRUE. n = −101 is a witness.

**P49 — ADAPTIVE CHECKPOINT**

> Q: "Translate into symbols: (a) 'For every real number x, x² is non-negative'; (b) 'There exists an integer n such that n² = 2'; (c) 'If x > 0 then |x| = x'."

- **CORRECT** → "(a) ∀x ∈ ℝ: x² ≥ 0; (b) ∃n ∈ ℤ: n² = 2 (actually false, but the translation is correct); (c) x > 0 ⟹ |x| = x. All correct. Proceed to TA-A04."
- **PARTIAL** → "You got the structure right for some. For (b): 'there exists' uses ∃. For (c): 'if...then' uses ⟹ (one-way implication)."
- **INCORRECT** → "∀ = for all (every element); ∃ = there exists (at least one); ⟹ = if then (one direction). Apply each: (a) uses ∀; (b) uses ∃; (c) uses ⟹."
- **NO_RESPONSE** → "Start with (a): 'for every real number' tells you which quantifier to use — ∀ or ∃?"

---

### TA-A04: Function and Advanced Notation
**Primitives:** P04 PATTERN INDUCTION → P49 ADAPTIVE CHECKPOINT

**Delivery:**

**P04 — PATTERN INDUCTION**

**Function notation:**

| Symbol | Meaning | Example |
|---|---|---|
| f: A → B | f is a function from domain A to codomain B | f: ℝ → ℝ |
| f(x) | The image of x under f | f(x) = x² |
| f ∘ g | Composition: (f∘g)(x) = f(g(x)) | f∘g where f(x)=x², g(x)=x+1 |
| f⁻¹ | Inverse function (if it exists) | f⁻¹(y) = √y for f(x)=x², x≥0 |
| im(f) or f(A) | Image of A under f | im(f) = {y : ∃x, f(x)=y} |

**Summation and product notation:**

| Symbol | Meaning | Example |
|---|---|---|
| ∑ᵢ₌₁ⁿ aᵢ | Sum a₁ + a₂ + … + aₙ | ∑ᵢ₌₁³ i = 1 + 2 + 3 = 6 |
| ∏ᵢ₌₁ⁿ aᵢ | Product a₁ × a₂ × … × aₙ | ∏ᵢ₌₁³ i = 1 × 2 × 3 = 6 |
| n! | n factorial: 1×2×…×n | 4! = 24 |

**Miscellaneous advanced notation:**

| Symbol | Meaning | Example |
|---|---|---|
| ℕ, ℤ, ℚ, ℝ, ℂ | Standard number sets | 2 ∈ ℕ, −1 ∈ ℤ, ½ ∈ ℚ, π ∈ ℝ, i ∈ ℂ |
| [a,b] | Closed interval | [0,1] = {x ∈ ℝ : 0 ≤ x ≤ 1} |
| (a,b) | Open interval | (0,1) = {x ∈ ℝ : 0 < x < 1} |
| ⌊x⌋ | Floor (round down) | ⌊3.7⌋ = 3 |
| ⌈x⌉ | Ceiling (round up) | ⌈3.2⌉ = 4 |
| |x| | Absolute value | |−3| = 3 |
| \|A\| | Cardinality of set A | \|{1,2,3}\| = 3 |

Reading note: Context resolves ambiguity — |…| means absolute value when applied to a number and cardinality when applied to a set.

**P49 — ADAPTIVE CHECKPOINT**

> Q: "(a) What does 'f: ℤ → ℕ' mean? (b) Evaluate ∑ᵢ₌₁⁴ (2i − 1). (c) What is ⌊π⌋?"

- **CORRECT** → "(a) f is a function from the integers to the natural numbers — integers are inputs, natural numbers are outputs; (b) 1+3+5+7=16; (c) ⌊π⌋=⌊3.14...⌋=3. All correct. Proceed to TA-A05."
- **PARTIAL** → "You answered some. For (b): substitute i=1,2,3,4 into (2i−1): get 1,3,5,7; sum them. For (c): floor rounds DOWN to the nearest integer."
- **INCORRECT** → "f: ℤ → ℕ means ℤ is the domain (inputs) and ℕ is the codomain (outputs). For (b): ∑ means 'add up'; substitute i from 1 to 4."
- **NO_RESPONSE** → "For (a): the arrow → in function notation separates domain from codomain. Which is f's domain?"

---

### TA-A05: Mastery Gate
**Primitives:** P91 [P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78]
**Gate type:** Terminal (GR-3). Pass → mark concept mastered and exit Protocol A.

**P77 — Multi-Problem Set (Q1–Q7):**

Q1. Correct or incorrect: "5 ⊆ ℤ"? If incorrect, fix it.
Q2. Correct or incorrect: "{5} ∈ ℕ"? If incorrect, fix it.
Q3. What is ∅ ∪ {1,2,3}?
Q4. Translate to symbols: "There exists a prime number p such that p is even."
Q5. Translate to symbols: "For all real x, if x > 1 then x² > x."
Q6. True or False: The statement "n² even ⟹ n even" uses ⟹ correctly (the converse may or may not hold separately).
Q7. Evaluate: ∑ᵢ₌₁⁵ i.

**P55 — Score (Q1–Q7):** 1 point each = 7 points possible.

Expected answers:
- Q1: INCORRECT — 5 is a number, not a set; fix: 5 ∈ ℤ.
- Q2: INCORRECT — {5} is a set (with one element), not an individual natural number; fix: {5} ⊆ ℕ.
- Q3: {1,2,3} — union with the empty set returns the other set unchanged.
- Q4: ∃p ∈ ℕ: (p is prime) ∧ (p is even). Equivalently: ∃p: prime(p) ∧ p = 2.
- Q5: ∀x ∈ ℝ: x > 1 ⟹ x² > x.
- Q6: TRUE — ⟹ is correct for a one-way implication. The converse "n even ⟹ n² even" is a separate claim.
- Q7: 1 + 2 + 3 + 4 + 5 = 15.

**P76 — Transfer Probe (cross_links=[], P76 independence):**

Context: A software API documentation system uses the following notation: `f: String → Int` means the function f takes a String and returns an Int. The condition `∀s ∈ Strings: f(s) ≥ 0` is written in a specification.

> "Translate this specification condition into plain English: '∀s ∈ Strings: f(s) ≥ 0'. Then write a condition meaning: 'There exists at least one String s₀ such that f(s₀) = 0'."

Expected:
- "For every string s, f(s) is non-negative (greater than or equal to zero)."
- ∃s₀ ∈ Strings: f(s₀) = 0.

**P55 — Score (P76):** 1 point for correct English translation of the ∀ condition AND correct symbolic expression of the ∃ condition.

**P75 — Mastery Assessment:**

| Score | Percentage | Assessment |
|---|---|---|
| 8/8 | 100% | Mastery confirmed at 1.00 |
| 7/8 | 87.5% | Above mastery threshold (0.85) — PASS |
| 6/8 | 75.0% | Below mastery threshold. Targeted repair for missed items. |
| ≤5/8 | ≤62.5% | Well below threshold. Full Protocol B remediation. |

**P55 — Score (overall):** Report __/8.

**P74 — Routing Decision:**
- Score 8/8 or 7/8 → mastery PASS → P78 COMPLETION
- Score 6/8 → identify which items missed; targeted B-01/B-02/B-03 repair based on error pattern
- Score ≤5/8 → Protocol B full remediation starting from B-01

**P55 — Score final:** Record to student memory.

**P78 — Completion:**
> "Mathematical Notation: MASTERED. You can now read and write standard mathematical symbols — arithmetic, set-theoretic, logical, and functional — and distinguish commonly confused pairs (∈ vs. ⊆; ⟹ vs. ⟺; ∀ vs. ∃). This symbolic vocabulary is the shared language of all mathematics."
>
> Next concept unlocked: math.found.variable (requires abstraction ✓ + mathematical-notation ✓).

---

## Component 5 — Repair Protocols

### Protocol B: Misconception Repair Chains

**B-01: MEMBERSHIP-SUBSET-CONFUSION Repair (MC-1 — ∈ vs. ⊆)**
1. P27 MISCONCEPTION NAMING: "∈ connects one OBJECT to the SET it belongs to. ⊆ connects two SETS when one is contained in the other. The left-hand side of ∈ is always a single element; the left-hand side of ⊆ is always a set."
2. Drill: Give 10 sentences. Student must choose ∈ or ⊆ for each. Examples: "3 ___ ℕ"; "{3,5} ___ ℕ"; "dog ___ {cat, dog, fish}"; "{cat,dog} ___ {cat, dog, fish}."
3. P06 CONTRAST PAIR: "3 ∈ ℕ" (3 is an element) vs. "{3} ⊆ ℕ" ({3} is a set). Note: {3} is a set with one member; 3 is the member itself.
4. P49 ADAPTIVE CHECKPOINT: Five sentences; student writes correct symbol for each.

**B-02: SUBSET-PROPER-CONFUSION Repair (MC-2 — ⊆ vs. ⊂)**
1. P27 MISCONCEPTION NAMING: "Different texts use ⊂ differently. Some mean 'proper subset' (A ⊆ B and A ≠ B); others use ⊂ as a synonym for ⊆. Always check your textbook's convention."
2. Safe practice: Use ⊆ for 'subset or equal' and ⊊ for 'proper subset' — this is unambiguous in all conventions.
3. Show: {1,2} ⊆ {1,2} (TRUE regardless of convention) vs. {1,2} ⊂ {1,2} (TRUE in some conventions, FALSE in others).
4. P49 ADAPTIVE CHECKPOINT: Three examples; student states which symbol is safe and unambiguous.

**B-03: IMPLIES-IFF-CONFUSION Repair (MC-3 — ⟹ vs. ⟺)**
1. P27 MISCONCEPTION NAMING: "⟹ is one arrow: only forward. ⟺ is a double arrow: both forward AND backward. If you use ⟺, you're claiming you proved BOTH directions."
2. Drill: Give 5 implications. Student must determine: is this true in both directions (⟺) or only one direction (⟹)?
   - "n divisible by 6 ___ n divisible by 2" (⟹ only, not ⟺)
   - "n + 1 is even ___ n is odd" (⟺)
   - "n > 100 ___ n > 50" (⟹ only)
3. P49 ADAPTIVE CHECKPOINT: Three more examples; student writes ⟹ or ⟺ and justifies.

---

## Component 6 — Transfer & Cross-Link Inventory

**P76 Independence Note:** cross_links=[] for math.found.mathematical-notation. All transfer probes use self-contained real-world contexts with no reference to other KG nodes.

**Transfer contexts used:**
- TA-A05 P76: Software API specification using ∀ and ∃ in formal contracts.

**Additional transfer contexts (for repair and enrichment):**
- Type theory: programming language types use notation similar to function types (String → Int mirrors f: A → B).
- Database queries: SQL's "EXISTS" and "FOR ALL" queries mirror ∃ and ∀.
- Scientific notation: standard measurements use ≤, ≥, ≈ in every scientific paper.

---

## Component 7 — Assessment Item Bank

| # | Type | Item | Answer | Targets |
|---|---|---|---|---|
| 1 | Correct/Fix | "π ⊆ ℝ" — correct? | NO — π is a number, not a set: π ∈ ℝ | MC-1 |
| 2 | Correct/Fix | "{π} ∈ ℝ" — correct? | NO — {π} is a set: {π} ⊆ ℝ | MC-1 |
| 3 | Translate | "∀x ∈ ℝ: x² ≥ 0" in words | For all real x, x squared is non-negative | ∀ |
| 4 | Translate | "There is no largest prime" into symbols | ∀n ∈ ℕ: (n is prime) ⟹ (∃p ∈ ℕ: p is prime ∧ p > n) | ∀∃ combination |
| 5 | True/False | ∅ ⊆ A for every set A. | TRUE | Empty set |
| 6 | Evaluate | ∑ᵢ₌₀³ i² | 0+1+4+9 = 14 | Summation |
| 7 | Choose | "n > 5 ___ n > 3": fill ⟹ or ⟺ | ⟹ only (n > 5 → n > 3; but n = 4 > 3 and 4 ≱ 5) | MC-3 |
| 8 | Choose | "n is odd ___ 2n+1 is odd": fill ⟹ or ⟺ | ⟺ (both directions hold) | MC-3 |
| 9 | Write | Express "f maps ℕ to ℤ" in notation | f: ℕ → ℤ | Function notation |
| 10 | Compute | ⌊−2.3⌋ | −3 (floor rounds toward −∞) | Floor |
| 11 | Identify | \|{a, b, c}\| — what does \|·\| mean here? | Cardinality = 3 (count of elements) | Context disambiguation |
| 12 | Translate | "∃!x ∈ ℝ: x² = 0" in words | There is exactly one real number whose square is zero | ∃! |

---

## Component 8 — Spaced Repetition Schedule

**P89 Spaced Repetition:** Intervals — Day 1, Day 3, Day 7, Day 21, Day 60.

| Day | Probe Focus | Sample Item |
|---|---|---|
| Day 1 | ∈ vs. ⊆ | Five sentences — choose ∈ or ⊆ |
| Day 3 | ∀ and ∃ | Translate three quantified statements to symbols |
| Day 7 | ⟹ vs. ⟺ | Three implications — one-way or both-ways? |
| Day 21 | Summation | Evaluate ∑ᵢ₌₁⁶ (3i−2) |
| Day 60 | Full table recall | Given a page of mathematics, identify every symbol used and state its meaning |

**Decay protocol:** If student fails a spaced probe → reset to Day 1 + Protocol B (B-01 for ∈/⊆; B-02 for ⊆/⊂; B-03 for ⟹/⟺).

---

## Component 9 — Metadata & Validation Checklist

**Authoring metadata:**
- Blueprint ID: math.found.mathematical-notation
- Version: 1.0.0
- Status: PACKAGE_READY
- Authored: 2026-07-11
- KG Source: docs/mathematics/kg/graph.json (v1.0.1, status=frozen)

**Component 10 — Validation Checklist:**

| Check | Criterion | Status |
|---|---|---|
| V-1 | KG ID exists in docs/mathematics/kg/graph.json | PASS — math.found.mathematical-notation confirmed present |
| V-2 | All KG fields accurately transcribed | PASS — difficulty=foundational, bloom=remember, threshold=0.85, hours=3 |
| V-3 | Prerequisite map complete | PASS — math.found.mathematical-language listed |
| V-4 | Learning objectives match bloom level (remember) | PASS — objectives use recall/read/interpret/decode/distinguish (memory-level verbs) |
| V-5 | CPA entry stage correct | PASS — C stage (difficulty=1, domain=math.found) |
| V-6 | Session TA cap respected | PASS — 5 TAs ≤ 7-TA cap |
| V-7 | Every non-repair TA opens with B-category primitive (GR-1) | PASS — TA-A01: P03; TA-A02: P27; TA-A03: P27; TA-A04: P04; TA-A05: P91 |
| V-8 | Every TA contains P49 (GR-2) | PASS — TA-A01 through TA-A04 each contain P49; TA-A05 is P91 terminal (exempt) |
| V-9 | Mastery gate TAs are terminal (GR-3) | PASS — TA-A05 is the only mastery gate and is marked Terminal |
| V-10 | P41/P64 gates repair chains (GR-4) | PASS — TA-A02 uses P27 for MC-1 naming (repair chains in Component 5); TA-A03 uses P27 for MC-3 |
| V-11 | P91 terminal in its TA (GR-6) | PASS — TA-A05 is the P91 TA; no primitives after P78 |
| V-12 | P76 present in mastery gate (GR-7) | PASS — TA-A05 contains P76 transfer probe |
| V-13 | Cross-links documented (GR-8) | PASS — cross_links=[] stated in Component 0 and Component 6 |
| V-14 | P76 independence correct when cross_links=[] (GR-9) | PASS — P76 probe uses software API specification context (self-contained) |
| V-15 | MAMR stated and enforced (GR-10) | PASS — MC-1 FOUNDATIONAL; B-01 clears first; MC-2 and MC-3 FIFO after |
| V-16 | Misconception registry has ≥1 FOUNDATIONAL MC | PASS — MC-1 (MEMBERSHIP-SUBSET-CONFUSION) is FOUNDATIONAL |
| V-17 | Assessment bank has ≥8 items | PASS — 12 items in Component 7 |
| V-18 | Spaced repetition schedule present (P89) | PASS — 5 intervals with probe focus in Component 8 |
| V-19 | All primitives used are from P01–P95 canonical set | PASS — P03, P04, P06, P27, P49, P55, P74, P75, P76, P77, P78, P89, P91 all canonical |
| V-20 | No duplicate of existing blueprint | PASS — no math.found.mathematical-notation.md existed prior to this authoring |

**AI Removal Test:** Every TA contains complete symbol tables with examples, contrast pairs for confused symbols, concrete translation exercises with worked answers, and a real-world software-specification transfer probe. An educator with no AI access can deliver this lesson from this document alone. AIR = PASS.

**Status: PACKAGE_READY — all 20 V-checks PASS, AIR PASS.**
