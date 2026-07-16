# Teaching Blueprint: Integers

## Component 0 — Metadata Header

| Field | Value |
|---|---|
| BLUEPRINT_ID | math.found.integers |
| KG_ID | math.found.integers |
| KG_VERSION | v1.0.1 |
| STATUS | PACKAGE_READY |
| DOMAIN | Foundations |
| NAME | Integers |
| ALIASES | ℤ, whole numbers (informal), signed integers |
| DIFFICULTY | foundational |
| BLOOM | understand |
| MASTERY_THRESHOLD | 0.90 |
| ESTIMATED_HOURS | 3 |
| REQUIRES | math.found.natural-numbers |
| UNLOCKS | math.arith.negative-numbers, math.nt.divisibility |
| CROSS_LINKS | math.arith.negative-numbers |
| CPA_ENTRY | C (Concrete) |
| SESSION_TA_CAP | 7 (hours ≥ 1h) |
| PROTOCOL_A_TA_COUNT | 6 (TA-A01 through TA-A06) |
| MASTERY_GATE_TA | TA-A06 (P91, terminal) |
| PASS_CRITERION | 6/6 (⌈0.90 × 6⌉ = 6; threshold = 0.90) |
| MAMR | MC-1 NEGATIVE-AS-SUBTRACTION is FOUNDATIONAL; cleared before MC-2 or MC-3 in all repair routing |
| P76_MODE | Cross-link (cross_links ≠ []; references math.arith.negative-numbers) |

---

## Component 1 — Cognitive Map

### Prerequisites Activated
- **math.found.natural-numbers**: ℕ = {0, 1, 2, …} with Peano axioms, well-ordering, successor, recursive arithmetic. ℤ extends ℕ.

### Target Understanding
1. ℤ = {…, −2, −1, 0, 1, 2, …} formed by extending ℕ with additive inverses.
2. For every n ∈ ℕ, there is a unique −n ∈ ℤ such that n + (−n) = 0. Together with 0 and positive integers, this gives all of ℤ.
3. Ring structure: ℤ is closed under + and ×; + is commutative, associative; additive identity 0; additive inverses exist; × distributes over +. Division is NOT always possible in ℤ.
4. ℤ is NOT well-ordered: the subset {…, −3, −2, −1} ⊂ ℤ has no least element. This is the key structural difference from ℕ.
5. Absolute value |n| and sign: sgn(n) = +1 if n > 0, 0 if n = 0, −1 if n < 0.

### Cross-Link Activation
- **math.arith.negative-numbers**: Negative integers are the practical realization of additive inverses — temperatures below zero, debt, coordinate positions. The formal structure (additive inverse in ℤ) supplies the rigorous foundation.

---

## Component 2 — Misconception Registry

### MC-1 [FOUNDATIONAL] — NEGATIVE-AS-SUBTRACTION
- **Trigger**: "−3 means 'take away 3'" or "negative numbers are just subtraction results"
- **Root cause**: Learner encounters negative numbers only as the result of subtracting a larger from a smaller (3 − 7 = −4), not as elements of ℤ with their own identity.
- **Error pattern**: Not accepting −3 as a standalone element of ℤ; treating −n as an operation rather than an element; difficulty with (−n) + n = 0 as a defining property.
- **Repair**: TA-B01.
- **MAMR**: FOUNDATIONAL — addressed in TA-A01 via P27; if triggered later, route to TA-B01 before returning.

### MC-2 — RING-CONFUSION
- **Trigger**: "ℤ is closed under division" OR "ℤ has the same properties as ℕ just with negatives added"
- **Root cause**: Learner over-generalizes from ℕ's closure properties; does not notice that division can leave ℤ (e.g., 1 ÷ 3 ∉ ℤ).
- **Error pattern**: Claiming ℤ is closed under ÷; forgetting ℤ is NOT well-ordered (unlike ℕ).
- **Repair**: TA-B02.
- **MAMR**: After MC-1 cleared. FIFO with MC-3.

### MC-3 — ZERO-ASYMMETRY
- **Trigger**: "0 is not really in ℤ because it's not positive or negative" or "0 is its own separate category"
- **Root cause**: Learner thinks of ℤ as {positive integers} ∪ {negative integers}, missing 0 as the additive identity.
- **Error pattern**: Excluding 0 from counts or arguments over ℤ; saying things like "every integer is either positive or negative."
- **Repair**: TA-B03.
- **MAMR**: After MC-1 cleared. FIFO with MC-2.

---

## Component 3 — Scaffolding Protocol

### CPA Entry: Concrete
Open with a number line (visual/concrete) — extends the ℕ number line leftward past 0. Use temperatures, elevation, and debt as concrete motivators before formal ring structure.

### MAMR Enforcement
MC-1 addressed in TA-A01 (P27). If triggered later, route → TA-B01 → return. MC-2 and MC-3 FIFO after MC-1 cleared.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — Extending ℕ with Additive Inverses
**Primitives**: P27 → P03 → P49

**P27 (MISCONCEPTION NAMING):** Name MC-1 NEGATIVE-AS-SUBTRACTION: "A common confusion: thinking −3 means 'subtract 3.' In fact, −3 is an ELEMENT of ℤ — a number that exists in its own right. It is the additive inverse of 3: the unique number such that 3 + (−3) = 0. This is not a subtraction operation; it is an element with a defining property."

**P03 (ANALOGY BRIDGE):** "ℕ is a one-armed balance — you can add weight to the right side (positive) but you can't add weight to the left. ℤ is a two-armed balance: you can add weight on either side, and the left-side weight of n is exactly −n, which perfectly cancels n on the right."

Construction: ℤ is the smallest set containing ℕ and closed under additive inverses. Formally: ℤ = ℕ ∪ {−n : n ∈ ℕ, n ≠ 0}.

**P49:** Prompt: "What is the additive inverse of 7? Verify it satisfies the defining property. Is −0 different from 0?"
- **CORRECT**: Additive inverse of 7 is −7; 7 + (−7) = 0 ✓. −0 = 0 (unique additive inverse of 0 is 0 itself) → TA-A02.
- **PARTIAL**: Confirm 7+(−7)=0; note −0=0 because 0+0=0 → TA-A02.
- **INCORRECT**: → TA-B01.
- **NO_RESPONSE**: → TA-B01.

---

### TA-A02 — ℤ as a Set and Ring Structure
**Primitives**: P04 → P11 → P49

**P04 (PATTERN INDUCTION):** Systematic view of ℤ:
- Roster: ℤ = {…, −3, −2, −1, 0, 1, 2, 3, …}
- Set-builder: ℤ = {n − m : n, m ∈ ℕ} (all differences of natural numbers)
- Partition into three parts: ℤ⁻ = {−1, −2, −3, …}, {0}, ℤ⁺ = {1, 2, 3, …}

Ring properties of ⟨ℤ, +, ×⟩:
| Property | Holds in ℕ? | Holds in ℤ? |
|---|---|---|
| Closed under + | ✓ | ✓ |
| Closed under × | ✓ | ✓ |
| Additive identity (0) | ✓ | ✓ |
| Additive inverses | ✗ (no −n in ℕ) | ✓ |
| Closed under ÷ | ✗ | ✗ (1÷3 ∉ ℤ) |
| Well-ordered | ✓ | ✗ |

**P11 (REPRESENTATION SHIFT):** Three representations: roster → set-builder → ring-axiom specification.

**P49:** Prompt: "True or False: (a) ℤ is closed under multiplication. (b) ℤ is closed under division. (c) Every element of ℤ has an additive inverse in ℤ."
- **CORRECT**: (a) TRUE; (b) FALSE (e.g., 5÷2=2.5 ∉ ℤ); (c) TRUE (that's the defining property) → TA-A03.
- **PARTIAL**: Address any wrong; emphasize ÷ is NOT closed → TA-A03.
- **INCORRECT**: → TA-B02.
- **NO_RESPONSE**: → TA-B02.

---

### TA-A03 — ℤ Is Not Well-Ordered: Contrast with ℕ
**Primitives**: P06 → P49

**P06 (CONTRAST PAIR PROMPT):**

| Property | ℕ = {0,1,2,…} | ℤ = {…,−1,0,1,…} |
|---|---|---|
| Well-ordered | ✓ YES — every non-empty S ⊆ ℕ has a minimum | ✗ NO — {…,−3,−2,−1} has no minimum |
| Has a minimum element | ✓ YES — min(ℕ) = 0 | ✗ NO — ℤ has no smallest element |
| Has additive inverses | ✗ NO — no −n in ℕ | ✓ YES — −n ∈ ℤ for all n |
| Closed under + | ✓ YES | ✓ YES |
| Total order | ✓ YES | ✓ YES |

Key insight: adding additive inverses (the extension ℕ → ℤ) DESTROYS well-ordering. ℤ is totally ordered but NOT well-ordered.

**P49:** Prompt: "Is the set S = {n ∈ ℤ : n < 5} well-ordered? Find its minimum element if it exists."
- **CORRECT**: NO — S = {…, −3, −2, −1, 0, 1, 2, 3, 4} ⊂ ℤ; it has no minimum (extends leftward infinitely) → TA-A04.
- **PARTIAL**: Confirm no minimum; contrast with S ∩ ℕ = {0,1,2,3,4} which IS well-ordered → TA-A04.
- **INCORRECT**: → TA-B02.
- **NO_RESPONSE**: → TA-B02.

---

### TA-A04 — Absolute Value and Order on ℤ
**Primitives**: P04 → P07 → P49

**P04 (PATTERN INDUCTION):**
- **Absolute value**: |n| = n if n ≥ 0; |n| = −n if n < 0. |n| is the distance from 0 on the number line.
- **Sign function**: sgn(n) = +1 if n > 0; sgn(0) = 0; sgn(n) = −1 if n < 0.
- **Order**: m < n in ℤ iff n − m ∈ ℤ⁺. Total order on ℤ extends the order on ℕ.
- **Pattern**: |−7| = 7; |3| = 3; |0| = 0. sgn(−5) = −1; sgn(4) = +1.

**P07 (WORKED EXAMPLE PAIR):**
- **Example 1**: Compute |−4| + |3| − |−2| = 4 + 3 − 2 = 5. Note: |a − b| = distance between a and b on number line.
- **Example 2**: Order: is −8 < −3? Yes, because −3 − (−8) = 5 ∈ ℤ⁺. The more negative, the smaller.

**P49:** Prompt: "Order these from least to greatest: −4, 7, 0, −10, 3. Then compute |−4 − 7|."
- **CORRECT**: −10 < −4 < 0 < 3 < 7; |−4−7| = |−11| = 11 → TA-A05.
- **PARTIAL**: Confirm ordering; clarify |−11| = 11 → TA-A05.
- **INCORRECT**: → TA-B03.
- **NO_RESPONSE**: → TA-B03.

---

### TA-A05 — Cross-Link Bridge: Negative Numbers in Context
**Primitives**: P41 → P64 → P49

**P41 (MISCONCEPTION DETECTOR):** "Negative numbers appear in everyday life. Give three real-world examples of negative integers. Do these examples suggest negative numbers are 'results of subtraction' or 'elements of ℤ in their own right'?"
Expected: learner may still think of negatives as subtraction results.

**P64 (CONCEPTUAL SHIFT):**
Cross-link → **math.arith.negative-numbers**: "Temperatures below zero (−15°C), bank account overdrafts (−$200), elevation below sea level (−300m) — these are all instances of negative integers as ELEMENTS of ℤ, not subtraction operations. The formal structure: each is an additive inverse of a positive integer. −15°C + 15°C = 0°C (reference point). The formal ℤ structure supplies the rigorous foundation for all these applications."

**P49:** Prompt: "An elevator starts at floor 3 and descends 7 floors. Express the final floor as an integer in ℤ. Is this −4 a subtraction result or an element of ℤ? How do you know?"
- **CORRECT**: Floor 3 + (−7) = −4. −4 is an element of ℤ (the additive inverse of 4) — the subtraction 3−7 is a PROCEDURE that produces the ELEMENT −4 → TA-A06.
- **PARTIAL**: Confirm −4 ∈ ℤ; distinguish the operation from the element → TA-A06.
- **INCORRECT/NO_RESPONSE**: → TA-B01, then return.

---

### TA-A06 — P91 Mastery Gate (Terminal)
**Primitive**: P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**[GR-3: Terminal TA]** **[GR-6: P91 terminal in this TA]** **[GR-7: P76 present]**

**P77 (MULTI-PROBLEM SET):**
Q1: "What is the additive inverse of −5? Verify it satisfies the defining property."
Q2: "True or False: ℤ is closed under division. Give a counterexample if false."
Q3: "Is the set A = {n ∈ ℤ : n ≤ 0} well-ordered? Explain."
Q4: "Compute: |−8| − |3| + |−1|. Then order −8, 3, −1 from least to greatest."
Q5: "Write ℤ in set-builder notation using ℕ as the base set."

**P55 (SCORE):** Q1: −(−5)=5; 5+(−5)=0 ✓. Q2: FALSE; e.g., 3÷2=1.5∉ℤ. Q3: NOT well-ordered; extends to −∞, no minimum. Q4: 8−3+1=6; order: −8<−1<3. Q5: ℤ={n−m:n,m∈ℕ} or ℤ=ℕ∪{−n:n∈ℕ,n≠0}.

**P76 (TRANSFER PROBE — Cross-link: math.arith.negative-numbers):**
"A bank account has balance $200. After three withdrawals of $80 each, what is the balance? Express each step as an integer in ℤ: starting balance, after each withdrawal. Which property of ℤ guarantees you can represent $−40 (an overdraft)?"
Expected: $200 → $120 → $40 → −$40. ℤ includes additive inverses, so −40 ∈ ℤ. ℕ could not represent this overdraft (40 has no additive inverse in ℕ). Cross-link: math.arith.negative-numbers (debt = negative balance = additive inverse application).

**P55 (SCORE):** Correct arithmetic; −40 identified as element of ℤ; additive inverse cited.

**P75 (MASTERY ASSESSMENT):** Items: Q1, Q2, Q3, Q4, Q5, P76 = **6 items**.
Pass criterion: **6/6** (⌈0.90 × 6⌉ = 6; threshold = 0.90).
- **PASS** → P78.
- **FAIL** → P74 repair routing.

**P74 (ROUTING DECISION):**
- PASS → P78.
- Q1 wrong or Q5 wrong → TA-B01 (NEGATIVE-AS-SUBTRACTION).
- Q2 wrong or Q3 wrong → TA-B02 (RING-CONFUSION).
- Q4 wrong or P76 wrong → TA-B03 (ZERO-ASYMMETRY) or TA-B01; apply MAMR.
- Multiple wrongs → MAMR: TA-B01 first; then FIFO TA-B02, TA-B03; re-gate.

**P78 (COMPLETION):** Mastery confirmed. Schedule P89. Activate: math.arith.negative-numbers, math.nt.divisibility.

---

## Component 5 — Protocol B (Repair Chains)

### TA-B01 — Repair MC-1 NEGATIVE-AS-SUBTRACTION
**Primitives**: P41 → P06 → P64 → P49

**P41**: "When you write −5, are you performing a subtraction, or naming an element of ℤ?"

**P06 (CONTRAST PAIR PROMPT):**
| Interpretation | What it means | Correct? |
|---|---|---|
| −5 = "subtract 5" | An operation (subtract) applied to something | ✗ Incomplete — subtract FROM what? |
| −5 ∈ ℤ | An element of ℤ (the additive inverse of 5) | ✓ Correct |
| −5 satisfies 5 + (−5) = 0 | Defining property of additive inverse | ✓ Formal definition |

**P64**: "−5 is a NUMBER — a specific point on the number line, a specific element of ℤ. The fact that 10 − 15 = −5 means the subtraction OPERATION produces the ELEMENT −5. The element exists independently of the operation that generated it."

**P49**: "Is −5 the result of subtracting 5, or is it an element of ℤ that appears as the result of certain subtractions?"
- **CORRECT**: It is an element of ℤ; subtraction is one way to arrive at it → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: Reinforce: −5 ∈ ℤ; it satisfies 5+(−5)=0 → return.

### TA-B02 — Repair MC-2 RING-CONFUSION
**Primitives**: P06 → P27 → P49

**P27**: "MC-2 RING-CONFUSION: ℤ and ℕ share closure under + and ×, but ℤ loses well-ordering (in exchange for gaining additive inverses) and still lacks closure under ÷."

**P06 (CONTRAST):**
| Closure property | ℕ | ℤ |
|---|---|---|
| Under + | ✓ | ✓ |
| Under × | ✓ | ✓ |
| Under − | ✗ (3−7 ∉ ℕ) | ✓ |
| Under ÷ | ✗ | ✗ (3÷2 ∉ ℤ) |
| Well-ordered | ✓ | ✗ |

**P49**: "Is 7 ÷ 3 ∈ ℤ? What about (−6) ÷ 2?"
- **CORRECT**: 7÷3 = 7/3 ∉ ℤ. (−6)÷2 = −3 ∈ ℤ. Division is SOMETIMES (not always) closed in ℤ → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: Emphasize division requires divisibility — not always closed in ℤ → return.

### TA-B03 — Repair MC-3 ZERO-ASYMMETRY
**Primitives**: P27 → P06 → P49

**P27**: "MC-3 ZERO-ASYMMETRY: '0 is neither positive nor negative, so it's separate from ℤ.' Wrong. 0 IS in ℤ — it is the ADDITIVE IDENTITY, the element that satisfies n + 0 = n for all n ∈ ℤ. The partition is: ℤ = ℤ⁻ ∪ {0} ∪ ℤ⁺, with 0 explicitly included."

**P06 (CONTRAST):** Every integer is exactly one of: positive (∈ ℤ⁺), zero, or negative (∈ ℤ⁻). These three categories are exhaustive and mutually exclusive.

**P49**: "How many integers satisfy |n| < 2?"
- **CORRECT**: {−1, 0, 1} — three integers; 0 is included → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: Enumerate: −1<2 ✓, 0<2 ✓, 1<2 ✓; 0 is in ℤ → return.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Content | Pass Criterion |
|---|---|---|
| Day 1 | Q1 (additive inverse) + Q3 (well-ordering) | 2/2 |
| Day 3 | Q2 (closure under ÷) + P76 (bank account) | 2/2 |
| Day 7 | Mixed 3-item: ring property, absolute value, well-ordering | 2/3 |
| Day 21 | Q1, Q2, Q3, Q4 (4 items) | 4/4 |
| Day 60 | Full 6-item mastery gate | 6/6 |

**Decay**: Failure → reset to Day 1 + TA-B routing by error type.

---

## Component 7 — Cross-Blueprint Dependencies

### Input Dependencies
| Blueprint | KG ID | What it supplies |
|---|---|---|
| Natural Numbers | math.found.natural-numbers | ℕ as base; Peano axioms; well-ordering; arithmetic |

### Output Unlocks
| Blueprint | KG ID | What this blueprint enables |
|---|---|---|
| Negative Numbers | math.arith.negative-numbers | Practical applications of additive inverses |
| Divisibility | math.nt.divisibility | Divisibility extended to ℤ (including sign) |

### Cross-Links
- **math.arith.negative-numbers**: ℤ provides formal structure; negative-numbers provides concrete contexts (debt, temperature, elevation).

---

## Component 8 — Teaching Notes

1. **Extension metaphor**: ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ is the standard chain. Mention this chain; position ℤ as the first extension.
2. **Division gap**: ℤ not closed under ÷ is the motivation for ℚ (rational numbers). Don't teach ℚ here — just flag the gap.
3. **Well-ordering loss**: The loss of well-ordering when extending ℕ → ℤ is critical. Proof-by-induction applies to ℕ (and ℤ≥k by shift) but not to all of ℤ. Note this without pre-teaching it.
4. **Concrete anchoring**: Temperatures, elevations, and debt are the canonical concrete models. Use at least one in each TA where natural.

---

## Component 10 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | Blueprint ID matches KG node ID | ✓ math.found.integers |
| V-2 | KG node ID exists in graph.json v1.0.1 | ✓ Verified |
| V-3 | All Component 0 fields populated | ✓ |
| V-4 | DIFFICULTY matches KG (foundational) | ✓ |
| V-5 | BLOOM matches KG (understand) | ✓ |
| V-6 | MASTERY_THRESHOLD matches KG (0.90) | ✓ |
| V-7 | ESTIMATED_HOURS matches KG (3) | ✓ |
| V-8 | REQUIRES listed; blueprint exists | ✓ math.found.natural-numbers ✓ |
| V-9 | CPA_ENTRY correct (foundational → C) | ✓ C |
| V-10 | SESSION_TA_CAP correct (hours=3 ≥ 1h → max 7; used 6) | ✓ 6 ≤ 7 |
| V-11 | GR-1: non-repair TAs open with B-category primitive | ✓ A01:P27, A02:P04, A03:P06, A04:P04, A05:P41 |
| V-12 | GR-2: every non-gate TA has P49 | ✓ TA-A01 through TA-A05 |
| V-13 | GR-3: mastery gate TA is terminal | ✓ TA-A06 uses P91 |
| V-14 | GR-4: P41/P64 gates repair chain in TA-A05 | ✓ P41 detects MC-1; P64 bridges to cross-link |
| V-15 | GR-6: P91 terminal in TA-A06 | ✓ |
| V-16 | GR-7: P76 in mastery gate | ✓ P76 cross-link to math.arith.negative-numbers |
| V-17 | GR-8: cross_links documented | ✓ math.arith.negative-numbers |
| V-18 | GR-9: P76 mode correct (cross_links≠[] → cross-link probe) | ✓ P76 references math.arith.negative-numbers |
| V-19 | GR-10: MAMR stated and enforced | ✓ MC-1 FOUNDATIONAL; Component 0 and 3; P74 routing |
| V-20 | Protocol B TAs open with B-category primitive | ✓ B01:P41, B02:P06, B03:P27 |
| AIR | All content fully specified; human tutor can execute | ✓ |

**V-11 NOTE for TA-A02**: TA-A02 opens with P04 (PATTERN INDUCTION) which IS a B-category primitive ✓.

**PACKAGE_READY**: V-1 through V-20 PASS. AIR PASS.
