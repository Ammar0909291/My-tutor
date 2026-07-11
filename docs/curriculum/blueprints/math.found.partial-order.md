# Teaching Blueprint: Partial Order
**ID:** math.found.partial-order
**Version:** 1.0.0
**Status:** PACKAGE_READY
**Schema:** Blueprint Specification v1.0

---

## Component 0 — Concept Identity & Authoring Metadata

| Field | Value |
|---|---|
| KG ID | math.found.partial-order |
| Name | Partial Order |
| Aliases | partial ordering, poset, ⊴ |
| Domain | math.found |
| Difficulty | developing (2) |
| Bloom | understand |
| Mastery Threshold | 0.80 |
| Estimated Hours | 5 |
| Requires | math.found.reflexive-relation, math.found.transitive-relation |
| Unlocks | math.found.total-order |
| Cross-links | (none) |
| P76 Independence | YES — cross_links=[], all transfer probes use self-contained real-world contexts |
| Blueprint Version | 1.0.0 |
| Authored | 2026-07-11 |

---

## Component 1 — Learning Objectives

On completion of all Protocol A Teaching Actions, a student will be able to:

1. **Define** antisymmetry and explain how it differs from symmetry and asymmetry.
2. **State** the three properties (reflexive, antisymmetric, transitive) that define a partial order.
3. **Verify** whether a given relation is a partial order by systematically checking all three properties.
4. **Give examples** of standard partial orders (≤ on ℤ, ⊆ on 𝒫(A), divisibility on ℕ) and identify incomparable elements in each.
5. **Distinguish** partial orders from total orders by recognising that comparable pairs are not required for all pairs.
6. **Explain** why the word "partial" captures the essential feature of the structure.

---

## Component 2 — Prerequisite Map

| Prerequisite KG ID | Name | Role |
|---|---|---|
| math.found.reflexive-relation | Reflexive Relation | Reflexivity is one of the three defining properties; must be mastered before this blueprint |
| math.found.transitive-relation | Transitive Relation | Transitivity is one of the three defining properties; must be mastered before this blueprint |

**Assumed entering knowledge:** Student can determine whether a relation on A is reflexive (all diagonal entries = 1) and whether it is transitive (every chain (a,b),(b,c) ∈ R has shortcut (a,c) ∈ R). Student can read a relation matrix. Student understands A×A and subset notation.

**New content introduced here:** Antisymmetry — the third property, not yet seen in prerequisites.

---

## Component 3 — Misconception Registry

### MC-1 (FOUNDATIONAL): Antisymmetric ≠ "Not Symmetric"
**Label:** ANTISYMM-NOT-NONSYMM
**Statement:** Student interprets "antisymmetric" as "the relation has no symmetric pair," meaning for every pair (a,b) with a≠b that is in R, its reverse (b,a) must NOT be in R. This is the definition of *asymmetric*, not *antisymmetric*. Antisymmetry only forbids BOTH (a,b) and (b,a) from being present when a ≠ b — it says nothing about which of the two must be present.
**Trigger:** R = {(1,1),(2,2),(3,3),(1,2),(2,1)} — student correctly identifies antisymmetry is violated, but when asked why, says "because (2,1) is in R and (1,2) is also in R, so it's not antisymmetric — antisymmetric means no pair and its reverse can coexist." That is correct for this example but for wrong reason (this is also asymmetric's criterion). The distinction surfaces when student wrongly concludes R = {(1,1),(2,2),(3,3),(1,2)} is NOT antisymmetric because "(1,2) has no reverse (2,1) in R, so the relation isn't balanced."
**Root cause:** The prefix "anti" is read as "opposite of" (symmetric's opposite = no symmetric pairs) rather than as its correct logical meaning (the conditional: both directions ⟹ equal).
**Repair chain:** B-01 — conditional form drill.

### MC-2: Partial Order Requires All Pairs Comparable
**Label:** TOTAL-ORDER-CONFUSION
**Statement:** Student believes every partial order must have every pair of elements comparable (i.e., for any a,b: a≤b or b≤a). This confuses partial order with *total* order.
**Trigger:** Given (𝒫({a,b}), ⊆), student says "{a} and {b} are incomparable so ⊆ can't be a partial order."
**Root cause:** Students' experience with ≤ on ℝ (a total order) is the dominant template; the word "order" triggers this template.
**Repair chain:** B-02 — incomparable elements drill.

### MC-3: Partial Order Uses Strict Inequality (< not ≤)
**Label:** STRICT-ORDERING
**Statement:** Student believes a partial order must be irreflexive (like <), so the defining relation should NOT include self-pairs. This contradicts reflexivity (one of the three defining properties).
**Trigger:** Given (ℤ, ≤), student says "but ≤ can't be a partial order because a ≤ a is trivial and a partial order should only order distinct elements."
**Root cause:** Confusing "partial order" (reflexive-based, sometimes called a non-strict order) with "strict partial order" (irreflexive+antisymmetric+transitive, based on <). Both are valid but different structures; the default "partial order" is the reflexive version.
**Repair chain:** B-03 — reflexive vs. strict order contrast.

**MAMR Protocol:** MC-1 is FOUNDATIONAL; MC-2 and MC-3 are secondary. If MC-1 is active, clear it completely before addressing MC-2 or MC-3. Secondary MCs cleared FIFO.

---

## Component 4 — Teaching Action Sequence (Protocol A)

**CPA Entry Stage:** C (difficulty=2, domain=math.found)
**Session TA Cap:** 7 (estimated_hours=5 → ≥1h range)
**Protocol A TA Count:** 7

---

### TA-A01: Antisymmetry — The New Property
**Primitives:** P03 ANALOGY BRIDGE → P06 CONTRAST PAIR PROMPT → P04 PATTERN INDUCTION → P49 ADAPTIVE CHECKPOINT

**Delivery:**

**P03 — ANALOGY BRIDGE**

> "Think of a ranking where 'A outranks B' means B cannot simultaneously outrank A — unless they are the same person. Antisymmetry captures this: if both 'a beats b' and 'b beats a' hold simultaneously, then a and b must be the same entity. It's the no-mutual-domination rule, with the escape hatch that an entity can dominate itself."

Formal definition:

> **Antisymmetric Relation:** A relation R on A is *antisymmetric* if for all a, b ∈ A:
>
>   (a, b) ∈ R  AND  (b, a) ∈ R  ⟹  a = b
>
> Contrapositive (often easier to use): a ≠ b ⟹ NOT [(a,b) ∈ R AND (b,a) ∈ R]

**P06 — CONTRAST PAIR PROMPT**

**Antisymmetric vs. "Not symmetric" vs. Asymmetric:**

Three distinct concepts using R on {1,2,3}:

| Property | Formal condition | Example R |
|---|---|---|
| Antisymmetric | (a,b) AND (b,a) ⟹ a=b | {(1,1),(2,2),(3,3),(1,2)} — has (1,2) but not (2,1); for the self-pairs, a=b holds ✓ |
| Not symmetric | ∃ (a,b) ∈ R such that (b,a) ∉ R | {(1,1),(1,2)} — (1,2) is present but (2,1) is not ← asymmetry of ONE pair |
| Asymmetric | (a,b) ∈ R ⟹ (b,a) ∉ R | {(1,2),(2,3)} — no pair and its reverse coexist, no self-pairs |

Key observation: **Antisymmetric ≠ asymmetric.** Antisymmetric ALLOWS self-pairs like (1,1). Asymmetric FORBIDS them. The equality relation = is antisymmetric (and symmetric!) but NOT asymmetric.

**P04 — PATTERN INDUCTION**

Test three relations for antisymmetry:

R₁ = {(1,1),(2,2),(3,3),(1,2),(2,3),(1,3)} on {1,2,3}
- Look for any pair where both (a,b) AND (b,a) appear with a ≠ b.
- (1,2) ∈ R₁ — is (2,1) ∈ R₁? NO.
- (2,3) ∈ R₁ — is (3,2) ∈ R₁? NO.
- (1,3) ∈ R₁ — is (3,1) ∈ R₁? NO.
- No mutual non-self-pairs → **ANTISYMMETRIC** ✓

R₂ = {(1,1),(2,2),(3,3),(1,2),(2,1)} on {1,2,3}
- (1,2) ∈ R₂ AND (2,1) ∈ R₂, but 1 ≠ 2 → **NOT ANTISYMMETRIC** ✗

R₃ = {(1,1),(2,2),(3,3)} on {1,2,3} (identity relation)
- Only self-pairs; no off-diagonal pairs at all → antisymmetry holds vacuously → **ANTISYMMETRIC** ✓

Pattern: "To check antisymmetry, look only at pairs where a ≠ b. If any two distinct elements appear in BOTH directions, antisymmetry fails."

**P49 — ADAPTIVE CHECKPOINT**

> Q: "Is R = {(1,1),(2,2),(3,3),(3,1),(1,3)} on {1,2,3} antisymmetric?"

- **CORRECT (NO)** → "Correct. Both (3,1) and (1,3) are in R, and 3 ≠ 1, so the antisymmetry condition (a,b) ∧ (b,a) ⟹ a=b is violated. Proceed to TA-A02."
- **PARTIAL** → "You noticed the suspicious pairs. Antisymmetry fails if you can find (a,b) and (b,a) with a ≠ b. State which specific pair witnesses the failure."
- **INCORRECT** → "Check for mutual pairs among distinct elements: is (3,1) in R? YES. Is (1,3) in R? YES. Are 3 and 1 the same element? NO. This witnesses a violation of antisymmetry."
- **NO_RESPONSE** → "Look at every off-diagonal pair in R. For each (a,b) with a≠b in R, check if its reverse (b,a) is also in R. If you find one such pair, antisymmetry fails."

---

### TA-A02: Partial Order Definition
**Primitives:** P03 ANALOGY BRIDGE → P11 REPRESENTATION SHIFT → P49 ADAPTIVE CHECKPOINT

**Delivery:**

**P03 — ANALOGY BRIDGE**

> "A partial order is a set equipped with a relation that generalises 'less than or equal to.' It captures the idea of ordering without requiring every pair to be ranked. Like a corporate hierarchy where two employees in different departments may have no clear seniority relationship — they are *incomparable* — yet within each chain of command, the order is clear and consistent."

**Formal definition:**

> **Partial Order (Poset):** A relation R on a set A is a *partial order* if it satisfies all three of:
>
> 1. **Reflexive:** ∀a ∈ A, (a, a) ∈ R
> 2. **Antisymmetric:** ∀a, b ∈ A, (a,b) ∈ R ∧ (b,a) ∈ R ⟹ a = b
> 3. **Transitive:** ∀a, b, c ∈ A, (a,b) ∈ R ∧ (b,c) ∈ R ⟹ (a,c) ∈ R
>
> The pair (A, R) is called a *partially ordered set* or **poset**.
>
> Convention: when R is a partial order on A, the notation a ≤ b means (a,b) ∈ R.

Memory aid: **R-A-T** — Reflexive, Antisymmetric, Transitive. A partial order is a RAT-relation.

**P11 — REPRESENTATION SHIFT**

Represent the same partial order three ways for (A, ≤) where A = {1, 2, 3} and ≤ is the usual "less than or equal to":

*Set listing:* R = {(1,1),(2,2),(3,3),(1,2),(1,3),(2,3)}

*Matrix:*
```
  1 2 3
1[1 1 1]
2[0 1 1]
3[0 0 1]
```
Reflexive: diagonal all 1 ✓. Antisymmetric: upper triangle has entries; lower triangle has zeros → no mutual off-diagonal pairs ✓. Transitive: (1,2) and (2,3) → (1,3) present ✓.

*Hasse-style chain:* 1 ≤ 2 ≤ 3 — every element is below every element to its right.

**P49 — ADAPTIVE CHECKPOINT**

> Q: "Give the three property names that define a partial order and explain what each means in one sentence."

- **CORRECT** → "Excellent. Reflexive (every element related to itself), antisymmetric (mutual pairs imply equality), transitive (chains imply shortcuts). Proceed to TA-A03."
- **PARTIAL** → "You named some. State all three. For any you missed: look at the RAT acronym — Reflexive, Antisymmetric, Transitive — and write one sentence for each."
- **INCORRECT** → "A partial order is defined by exactly three properties. Start with what you know: a relation on a set, and what it must satisfy. Refer to the RAT acronym."
- **NO_RESPONSE** → "Three properties, remembered as RAT. R = reflexive. A = antisymmetric. T = transitive. State each in one sentence."

---

### TA-A03: Verifying Partial Orders — Systematic Three-Property Check
**Primitives:** P27 MISCONCEPTION NAMING (MC-1) → P07 WORKED EXAMPLE PAIR → P49 ADAPTIVE CHECKPOINT

**Delivery:**

**P27 — MISCONCEPTION NAMING**

> "A common mistake called ANTISYMM-NOT-NONSYMM: treating 'antisymmetric' as 'not symmetric,' which would mean no pair and its reverse coexist. The correct reading is a conditional: IF both (a,b) and (b,a) are in R with a ≠ b, THEN antisymmetry fails. Self-pairs (a,a) are allowed and actually required by reflexivity. So a partial order DOES contain symmetric-looking self-pairs."

**P07 — WORKED EXAMPLE PAIR**

**Example A — Verifying a partial order:** R = {(1,1),(2,2),(3,3),(1,2),(1,3),(2,3)} on {1,2,3}.

Step 1 — Reflexive?
- (1,1) ∈ R ✓, (2,2) ∈ R ✓, (3,3) ∈ R ✓ → PASS

Step 2 — Antisymmetric?
- Scan off-diagonal pairs: (1,2) ∈ R; is (2,1) ∈ R? NO ✓
- (1,3) ∈ R; is (3,1) ∈ R? NO ✓
- (2,3) ∈ R; is (3,2) ∈ R? NO ✓ → PASS

Step 3 — Transitive?
- Chain (1,2),(2,3): is (1,3) ∈ R? YES ✓
- No other two-step chains → PASS

Conclusion: R is a partial order on {1,2,3}. This is (ℤ≥1 ∩ {1,2,3}, ≤).

**Example B — Failing partial order:** R = {(1,1),(2,2),(3,3),(1,2),(2,1)} on {1,2,3}.

Step 1 — Reflexive? PASS (all three self-pairs present).

Step 2 — Antisymmetric?
- (1,2) ∈ R AND (2,1) ∈ R, but 1 ≠ 2 → FAIL ✗

Conclusion: R is NOT a partial order. Stop at first failure; no need to check transitivity once antisymmetry fails.

**Systematic procedure:**
```
PARTIAL-ORDER-CHECK(R, A):
  CHECK: Reflexive — ∀a ∈ A: (a,a) ∈ R? If any fails → NOT a partial order.
  CHECK: Antisymmetric — ∀a≠b: if (a,b) ∈ R then (b,a) ∉ R? If any fails → NOT.
  CHECK: Transitive — ∀a,b,c: if (a,b),(b,c) ∈ R then (a,c) ∈ R? If any fails → NOT.
  All three PASS → partial order.
```

**P49 — ADAPTIVE CHECKPOINT**

> Q: "R = {(1,1),(2,2),(3,3),(1,3)} on {1,2,3}. Is R a partial order? Verify all three properties."

- **CORRECT** → "Correct. Reflexive: all self-pairs present ✓. Antisymmetric: only (1,3) off-diagonal; (3,1) ∉ R ✓. Transitive: no two-step chains since (1,3) has no forward extension to a third element ✓. Partial order confirmed. Proceed to TA-A04."
- **PARTIAL** → "You verified some properties. Work through all three: reflexive check, then antisymmetric check, then transitive check. State PASS or FAIL for each."
- **INCORRECT** → "Apply the procedure: (1) Check all self-pairs. (2) For (1,3), is (3,1) in R? (3) Is there any chain (a,b),(b,c) that requires (a,c)? Answer each."
- **NO_RESPONSE** → "Three-property check: start with reflexive. Are (1,1),(2,2),(3,3) all in R?"

---

### TA-A04: Standard Partial Order Examples
**Primitives:** P04 PATTERN INDUCTION → P49 ADAPTIVE CHECKPOINT

**Delivery:**

**P04 — PATTERN INDUCTION**

Three canonical partial orders, each verified:

**Example 1: (ℤ, ≤)**
- Reflexive: n ≤ n for all n ∈ ℤ ✓
- Antisymmetric: n ≤ m and m ≤ n ⟹ n = m (standard integer fact) ✓
- Transitive: n ≤ m and m ≤ k ⟹ n ≤ k ✓
- Poset (ℤ, ≤): every pair is comparable (total order — special case of partial order).

**Example 2: (𝒫(A), ⊆)** where A = {a, b, c}
- Reflexive: X ⊆ X for every set X ✓
- Antisymmetric: X ⊆ Y and Y ⊆ X ⟹ X = Y (set extensionality) ✓
- Transitive: X ⊆ Y and Y ⊆ Z ⟹ X ⊆ Z ✓
- Poset (𝒫({a,b,c}), ⊆): {a} and {b} are **incomparable** (neither {a}⊆{b} nor {b}⊆{a}).

**Example 3: (ℕ \ {0}, |)** where a | b means "a divides b"
- Reflexive: n | n for all n ∈ ℕ ✓
- Antisymmetric: a | b and b | a ⟹ a = b (for positive integers) ✓
- Transitive: a | b and b | c ⟹ a | c ✓
- Poset (ℕ \ {0}, |): 2 and 3 are **incomparable** (2 ∤ 3 and 3 ∤ 2).

**Tabular summary:**

| Poset | Reflexive | Antisymmetric | Transitive | Incomparable pairs? |
|---|---|---|---|---|
| (ℤ, ≤) | YES | YES | YES | NO — every pair comparable |
| (𝒫(A), ⊆) | YES | YES | YES | YES — e.g., {a} and {b} |
| (ℕ\{0}, \|) | YES | YES | YES | YES — e.g., 2 and 3 |

**P49 — ADAPTIVE CHECKPOINT**

> Q: "Is the divisibility relation on {1,2,3,4,6} a partial order? Identify one pair of incomparable elements."

- **CORRECT** → "Yes. Reflexive, antisymmetric, and transitive all hold. Incomparable example: 4 and 6 — 4 ∤ 6 (since 6/4 is not an integer) and 6 ∤ 4 (since 4/6 is not an integer). Proceed to TA-A05."
- **PARTIAL** → "You confirmed one or two properties. Complete all three checks, and for incomparable elements, find two numbers where neither divides the other."
- **INCORRECT** → "Revisit divisibility: 2 | 4 (4=2×2), 2 | 6 (6=2×3), 3 | 6, 1 | everything. Now check: does 4 | 6? Does 6 | 4? If both answers are NO, then 4 and 6 are incomparable."
- **NO_RESPONSE** → "Apply the three-property check to (|) on {1,2,3,4,6}. Then for incomparable elements, try pairs that share no divisibility in either direction."

---

### TA-A05: Comparable vs. Incomparable Elements
**Primitives:** P41 MISCONCEPTION DETECTOR (MC-2) → P06 CONTRAST PAIR PROMPT → P64 CONCEPTUAL SHIFT → P49 ADAPTIVE CHECKPOINT

**Delivery:**

**P41 — MISCONCEPTION DETECTOR (MC-2: All elements must be comparable)**

> "In the poset (𝒫({a,b}), ⊆): are {a} and {b} comparable? That is, does {a} ⊆ {b} or {b} ⊆ {a} hold?"

- If student says YES (MC-2 active): trigger P64 immediately.
- If student says NO correctly: proceed to P06.

**P64 — CONCEPTUAL SHIFT (if MC-2 active)**

> "The word 'partial' in 'partial order' means exactly this: the order is defined for SOME pairs, not necessarily ALL pairs. Elements a and b are comparable if a ≤ b or b ≤ a holds in the poset. If neither holds, they are incomparable. A partial order with EVERY pair comparable is the special case called a *total order*. Partial order is the general case; total order is the restrictive special case."

**P06 — CONTRAST PAIR PROMPT**

**Pair A — Partial order with incomparable elements:** (𝒫({a,b}), ⊆)

Elements: ∅, {a}, {b}, {a,b}

Comparable pairs:
- ∅ ⊆ {a}, ∅ ⊆ {b}, ∅ ⊆ {a,b}
- {a} ⊆ {a,b}, {b} ⊆ {a,b}
- All self-pairs

Incomparable pair: {a} and {b} — neither is a subset of the other.

**Pair B — Total order (no incomparable elements):** (ℝ, ≤)
- For any two real numbers x, y: either x ≤ y or y ≤ x (or both if equal).
- Zero incomparable pairs → total order → a stricter structure than partial order.

Key vocabulary:

> - **Comparable:** a and b are comparable in (A, ≤) if a ≤ b or b ≤ a.
> - **Incomparable:** a and b are incomparable if neither a ≤ b nor b ≤ a holds. Written a ∥ b.
> - **Partial order:** allows incomparable pairs.
> - **Total order:** no incomparable pairs.

**P49 — ADAPTIVE CHECKPOINT**

> Q: "In the divisibility poset on {2,3,4,6,12}: (a) Are 2 and 4 comparable? (b) Are 4 and 6 comparable? (c) Are 3 and 12 comparable?"

- **CORRECT (all three)** → "(a) YES — 2|4. (b) NO — 4 ∤ 6 and 6 ∤ 4. (c) YES — 3|12. Perfect. Proceed to TA-A06."
- **PARTIAL** → "You answered some. For each pair (a,b): check does a | b? Does b | a? If both NO → incomparable."
- **INCORRECT** → "Comparability: a and b are comparable if a divides b OR b divides a. Check 4 and 6 specifically: does 4 divide 6? (6/4 = 1.5, not integer → NO). Does 6 divide 4? (4/6 < 1, not integer → NO). Both fail → incomparable."
- **NO_RESPONSE** → "Try (a): does 2 divide 4? Yes (4 = 2×2). So 2 and 4 are comparable — 2 is 'below' 4 in the poset."

---

### TA-A06: Partial Order vs. Total Order — The "Partial" in Partial Order
**Primitives:** P03 ANALOGY BRIDGE → P06 CONTRAST PAIR PROMPT → P49 ADAPTIVE CHECKPOINT

**Delivery:**

**P03 — ANALOGY BRIDGE**

> "A total order is like a leaderboard — every player has a definite rank relative to every other player. A partial order is like a food web or a dependency graph — some items come before others, but some items are simply incomparable: neither 'comes before' the other. The partial order is the more general, more common structure. Most real-world orderings are partial, not total."

**P06 — CONTRAST PAIR PROMPT**

| Property | Partial Order (poset) | Total Order (chain) |
|---|---|---|
| Reflexive | YES | YES |
| Antisymmetric | YES | YES |
| Transitive | YES | YES |
| Additional axiom | — | Totality: ∀a,b: a≤b OR b≤a |
| Incomparable pairs | Allowed | None |
| Example | (𝒫(A), ⊆), (ℕ, \|) | (ℝ, ≤), (ℤ, ≤) |

Relationship:

> **Total order ⊂ Partial order** — every total order is a partial order, but not every partial order is total.

Note: Relation < (strict less-than) is NOT a partial order under the reflexive definition — it is irreflexive. The strict variant is called a *strict partial order* (irreflexive+asymmetric+transitive). The default "partial order" means the reflexive version.

**P49 — ADAPTIVE CHECKPOINT**

> Q: "The usual ≤ on ℝ — is it a partial order? Is it a total order? What axiom makes it a total order but not merely a partial order?"

- **CORRECT** → "YES to both. The additional axiom is totality (also called connexity): for any x,y ∈ ℝ, either x ≤ y or y ≤ x. This eliminates incomparable elements entirely. Proceed to TA-A07."
- **PARTIAL** → "You identified whether it is a partial order. Now add: is it ALSO a total order? And what property distinguishes total from partial?"
- **INCORRECT** → "≤ on ℝ satisfies all three RAT properties → it is a partial order. Additionally, for ANY two real numbers, you can always compare them → it is also a total order. The extra property is totality."
- **NO_RESPONSE** → "Is ≤ reflexive on ℝ? Antisymmetric? Transitive? If all three hold, it is a partial order. Then ask: are there any incomparable pairs in ℝ under ≤?"

---

### TA-A07: Mastery Gate
**Primitives:** P91 [P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78]
**Gate type:** Terminal (GR-3). Pass → mark concept mastered and exit Protocol A.

**P77 — Multi-Problem Set (Q1–Q6):**

Q1. Is (ℤ, ≤) a partial order? Verify all three properties explicitly.
Q2. Is (ℤ, <) a partial order? Which property fails and why?
Q3. On the power set of {a,b}, with the relation ⊆: (a) is this a partial order? (b) find all incomparable pairs.
Q4. R = {(1,1),(2,2),(3,3),(1,2),(2,3),(1,3)} on {1,2,3}. Is R a partial order? Which standard partial order does it resemble?
Q5. R = {(1,1),(2,2),(3,3),(1,2),(2,1)} on {1,2,3}. Is R a partial order? State which property fails and give the witnessing elements.
Q6. True or False: Every total order is a partial order. Justify.

**P55 — Score (Q1–Q6):** 1 point each = 6 points possible.

Expected answers:
- Q1: YES — reflexive (n≤n ✓), antisymmetric (n≤m and m≤n ⟹ n=m ✓), transitive (n≤m≤k ⟹ n≤k ✓).
- Q2: NO — reflexivity fails: n < n is false for all n ∈ ℤ.
- Q3: (a) YES — all three RAT properties hold for ⊆. (b) {a} and {b} are incomparable; that is the only incomparable pair (the other pairs: ∅ ≤ everything, everything ≤ {a,b}).
- Q4: YES — R is a partial order. It resembles ≤ on {1,2,3} (it is isomorphic to the linear chain 1 ≤ 2 ≤ 3, a total order on 3 elements).
- Q5: NO — antisymmetry fails: (1,2) ∈ R and (2,1) ∈ R but 1 ≠ 2.
- Q6: TRUE — a total order satisfies reflexive + antisymmetric + transitive (all three partial order properties) plus the extra totality axiom. Every total order is a partial order with no incomparable pairs.

**P76 — Transfer Probe (cross_links=[], P76 independence):**

Context: A software project has 6 tasks: A (write tests), B (write code), C (run tests), D (deploy), E (write documentation), F (update changelog). Dependencies: A must complete before C; B must complete before C; C must complete before D; D must complete before F. Tasks A, B, and E have no incoming dependencies.

> "Define the 'must be completed no later than' relation R on the 6 tasks, where (X, Y) ∈ R means task X must be completed no later than task Y. Is R a partial order? Which tasks, if any, are incomparable?"

Expected:
- R is a partial order (reflexive: every task must be done before itself trivially; antisymmetric: if X must be before Y and Y must be before X, then X=Y — no circular deps; transitive: if X before Y and Y before Z then X before Z).
- Incomparable: E is incomparable to A, B, C, D (documentation is independent). A and B are incomparable (neither must precede the other).

**P55 — Score (P76):** 1 point for correctly identifying the relation as a partial order AND naming at least one incomparable pair with correct reasoning.

**P75 — Mastery Assessment:**

| Score | Percentage | Assessment |
|---|---|---|
| 7/7 | 100% | Mastery confirmed at 1.00 |
| 6/7 | 85.7% | Above mastery threshold (0.80) — PASS with one noted gap |
| 5/7 | 71.4% | Below mastery threshold. Identify pattern of failures; targeted Protocol B. |
| ≤4/7 | ≤57.1% | Well below threshold. Full Protocol B remediation required. |

**P55 — Score (overall):** Report __/7.

**P74 — Routing Decision:**
- Score 7/7 or 6/7 → mastery PASS → P78 COMPLETION
- Score 5/7 → identify which items failed; route to Protocol B for dominant MC pattern
- Score ≤4/7 → Protocol B full remediation; restart from B-01

**P55 — Score final:** Record to student memory.

**P78 — Completion:**
> "Partial Order: MASTERED. You can now verify whether a relation is a partial order (RAT check), identify incomparable elements in a poset, work with the three standard partial orders (≤, ⊆, |), and distinguish partial orders from total orders. You understand why 'partial' means not every pair needs to be ranked."
>
> Next concept: math.found.total-order (adds the totality axiom; all elements become comparable).

---

## Component 5 — Repair Protocols

### Protocol B: Misconception Repair Chains

**B-01: ANTISYMM-NOT-NONSYMM Repair (MC-1 — Conditional Form)**
1. P27 MISCONCEPTION NAMING: "Antisymmetric is a conditional: IF both (a,b) and (b,a) are in R with a≠b, THEN the relation is NOT antisymmetric. It does NOT say 'the relation has no (a,b) pair with a missing reverse (b,a).'"
2. Show the equality relation = on {1,2,3}: = is both SYMMETRIC (if a=b then b=a) and ANTISYMMETRIC (if a=b and b=a then a=b — trivially). This is the clearest refutation of "antisymmetric = not symmetric."
3. P06 CONTRAST PAIR: antisymmetric-and-symmetric vs. antisymmetric-and-not-symmetric vs. symmetric-and-not-antisymmetric — three separate relations.
4. Drill: Student reads the conditional form aloud and applies it to 3 example relations.
5. P49 ADAPTIVE CHECKPOINT: three relations; classify each as antisymmetric or not, citing which specific elements witness the violation if applicable.

**B-02: TOTAL-ORDER-CONFUSION Repair (MC-2)**
1. P27 MISCONCEPTION NAMING: "The word 'partial' means the order is defined for SOME pairs, not ALL. You are confusing partial order with total order."
2. Revisit poset (𝒫({a,b}), ⊆): student explicitly lists all element pairs and classifies each as comparable or incomparable.
3. P64 CONCEPTUAL SHIFT: "Partial order = the four-element set with the partial order axioms. Total order = partial order PLUS totality. They are not the same definition."
4. P49 ADAPTIVE CHECKPOINT: two posets; for each, find all incomparable pairs.

**B-03: STRICT-ORDERING Repair (MC-3)**
1. P27 MISCONCEPTION NAMING: "Partial order (reflexive version) includes self-pairs (a,a) — it uses ≤, not <. The version with < (irreflexive) is called a 'strict partial order' — a different structure."
2. P06 CONTRAST PAIR: (ℤ, ≤) as a partial order (reflexive, self-pairs required) vs. (ℤ, <) as a strict partial order (irreflexive, no self-pairs). Verify all properties for each.
3. P49 ADAPTIVE CHECKPOINT: student classifies three given relations as partial order / strict partial order / neither.

---

## Component 6 — Transfer & Cross-Link Inventory

**P76 Independence Note:** cross_links=[] for math.found.partial-order. All transfer probes use self-contained real-world contexts with no reference to other KG nodes.

**Transfer contexts used:**
- TA-A07 P76: Software build system — task dependency relation as a partial order; incomparable tasks run in any order.

**Additional transfer contexts (for repair and enrichment):**
- Academic course prerequisites: "Course A is a prerequisite for Course B" — the prerequisite relation is a partial order; two elective courses with no shared prerequisites are incomparable.
- Biological taxonomy: "organism A is an ancestor of organism B" at the species level is a partial order; two species in different lineages are incomparable.
- Version control tags: "version A was released before version B" in a branching repository is a partial order; tags on different branches are incomparable.

---

## Component 7 — Assessment Item Bank

| # | Type | Item | Answer | Targets |
|---|---|---|---|---|
| 1 | Verify | R = {(1,1),(2,2),(3,3),(1,2),(2,3),(1,3)} on {1,2,3}. Is R a partial order? | YES — reflexive, antisymmetric, transitive (linear chain) | Verification |
| 2 | Verify | R = {(1,1),(2,2),(1,2),(2,1)} on {1,2}. Is R a partial order? | NO — antisymmetry fails: (1,2) and (2,1) with 1≠2 | MC-1 |
| 3 | True/False | (ℤ, <) is a partial order. | FALSE — reflexivity fails (n < n is false) | MC-3 |
| 4 | True/False | (ℤ, =) is a partial order. | TRUE — reflexive (n=n), antisymmetric (n=m and m=n ⟹ n=m), transitive (n=m and m=k ⟹ n=k) | Nonobvious example |
| 5 | Find | In the poset ({1,2,4,8}, \|), find all incomparable pairs. | None — this is actually a total order under divisibility: 1\|2\|4\|8 | MC-2 detection |
| 6 | Find | In the poset ({2,3,5,6,10,15}, \|), find three incomparable pairs. | e.g., (2,3), (2,5), (3,5) — none of these pairs satisfy divisibility in either direction | Poset exploration |
| 7 | Short answer | What axiom distinguishes a total order from a partial order? Give it formally. | Totality (connexity): ∀a,b ∈ A: a≤b OR b≤a | MC-2 |
| 8 | Short answer | Is every total order a partial order? Is every partial order a total order? | Yes; no | Containment |
| 9 | Construct | Construct a partial order on {1,2,3,4} with exactly one pair of incomparable elements. | e.g., R where 1≤2≤4, 1≤3≤4, but 2 and 3 incomparable. R = {self-pairs, (1,2),(1,3),(1,4),(2,4),(3,4)} | Construction |
| 10 | Analysis | R is reflexive and transitive on A. Under what additional condition is R a partial order? | Antisymmetry — add: (a,b) ∈ R and (b,a) ∈ R ⟹ a=b | Structural |
| 11 | True/False | The subset relation ⊆ on any collection of sets is always a partial order. | TRUE — reflexivity, antisymmetry (set extensionality), and transitivity always hold | Application |
| 12 | Analysis | R is a partial order on A. If additionally every pair of elements is comparable, what structure is (A,R)? | A total order (chain) | Synthesis |

---

## Component 8 — Spaced Repetition Schedule

**P89 Spaced Repetition:** Intervals — Day 1, Day 3, Day 7, Day 21, Day 60.

| Day | Probe Focus | Sample Item |
|---|---|---|
| Day 1 | Three-property verification | Verify a given 4-element relation is or is not a partial order (RAT check) |
| Day 3 | Antisymmetry | Classify three relations as antisymmetric or not; cite witnessing elements |
| Day 7 | Comparable/incomparable | In a divisibility poset, list all incomparable pairs |
| Day 21 | Standard examples | Is (ℚ, ≤) a partial order? A total order? How does it differ from (ℚ, <)? |
| Day 60 | Real-world mapping | Describe a real-world partial order from your field; identify the three properties and find incomparable elements |

**Decay protocol:** If student fails a spaced probe → reset to Day 1 + Protocol B (B-01 repair chain for antisymmetry issues; B-02 for incomparable-element issues; B-03 for reflexivity/strict confusion).

---

## Component 9 — Metadata & Validation Checklist

**Authoring metadata:**
- Blueprint ID: math.found.partial-order
- Version: 1.0.0
- Status: PACKAGE_READY
- Authored: 2026-07-11
- KG Source: docs/mathematics/kg/graph.json (v1.0.1, status=frozen)

**Component 10 — Validation Checklist:**

| Check | Criterion | Status |
|---|---|---|
| V-1 | KG ID exists in docs/mathematics/kg/graph.json | PASS — math.found.partial-order confirmed present |
| V-2 | All KG fields accurately transcribed | PASS — difficulty=developing, bloom=understand, threshold=0.80, hours=5, aliases include poset |
| V-3 | Prerequisite map complete | PASS — math.found.reflexive-relation and math.found.transitive-relation both listed |
| V-4 | Learning objectives match bloom level (understand) | PASS — objectives use define/state/verify/give examples/distinguish/explain (comprehension verbs) |
| V-5 | CPA entry stage correct | PASS — C stage (difficulty=2, domain=math.found) |
| V-6 | Session TA cap respected | PASS — 7 TAs = 7-TA cap exactly |
| V-7 | Every non-repair TA opens with B-category primitive (GR-1) | PASS — TA-A01: P03; TA-A02: P03; TA-A03: P27; TA-A04: P04; TA-A05: P41; TA-A06: P03; TA-A07: P91 |
| V-8 | Every TA contains P49 (GR-2) | PASS — TA-A01 through TA-A06 each contain P49; TA-A07 is P91 terminal compound (exempt) |
| V-9 | Mastery gate TAs are terminal (GR-3) | PASS — TA-A07 is the only mastery gate and is marked Terminal |
| V-10 | P41/P64 gates repair chains (GR-4) | PASS — TA-A05 uses P41 to detect MC-2; P64 follows on MC-2 confirmation; B-chains in Component 5 |
| V-11 | P91 terminal in its TA (GR-6) | PASS — TA-A07 is the P91 TA; P91 is the sole content with no primitives after P78 |
| V-12 | P76 present in mastery gate (GR-7) | PASS — TA-A07 contains P76 transfer probe |
| V-13 | Cross-links documented (GR-8) | PASS — cross_links=[] stated in Component 0 and Component 6 |
| V-14 | P76 independence correct when cross_links=[] (GR-9) | PASS — P76 probe uses software task-dependency context (self-contained, no KG cross-link reference) |
| V-15 | MAMR stated and enforced (GR-10) | PASS — MC-1 FOUNDATIONAL; B-01 clears first; MC-2 and MC-3 FIFO after |
| V-16 | Misconception registry has ≥1 FOUNDATIONAL MC | PASS — MC-1 (ANTISYMM-NOT-NONSYMM) is FOUNDATIONAL |
| V-17 | Assessment bank has ≥8 items | PASS — 12 items in Component 7 |
| V-18 | Spaced repetition schedule present (P89) | PASS — 5 intervals with probe focus in Component 8 |
| V-19 | All primitives used are from P01–P95 canonical set | PASS — P03, P04, P06, P07, P11, P27, P41, P49, P55, P64, P74, P75, P76, P77, P78, P89, P91 all canonical |
| V-20 | No duplicate of existing blueprint | PASS — no math.found.partial-order.md existed prior to this authoring |

**AI Removal Test:** Every TA contains concrete mathematical content — full proofs of the three partial order properties for each example, worked verification procedures with step-by-step matrix analysis, contrast tables between antisymmetric/asymmetric/not-symmetric, the RAT acronym and systematic procedure, specific named examples (≤, ⊆, |), and a real-world task-dependency transfer context. An educator with no AI access can deliver this lesson from this document alone. AIR = PASS.

**Status: PACKAGE_READY — all 20 V-checks PASS, AIR PASS.**
