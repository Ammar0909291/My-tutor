# Teaching Blueprint: Natural Numbers

## Component 0 — Metadata Header

| Field | Value |
|---|---|
| BLUEPRINT_ID | math.found.natural-numbers |
| KG_ID | math.found.natural-numbers |
| KG_VERSION | v1.0.1 |
| STATUS | PACKAGE_READY |
| DOMAIN | Foundations |
| NAME | Natural Numbers |
| ALIASES | ℕ, counting numbers, positive integers |
| DIFFICULTY | foundational |
| BLOOM | understand |
| MASTERY_THRESHOLD | 0.90 |
| ESTIMATED_HOURS | 4 |
| REQUIRES | math.found.set-theory, math.found.total-order |
| UNLOCKS | math.arith.counting, math.found.proof-by-induction, math.nt.divisibility |
| CROSS_LINKS | math.arith.counting, math.nt.divisibility |
| CPA_ENTRY | C (Concrete) |
| SESSION_TA_CAP | 7 (hours ≥ 1h) |
| PROTOCOL_A_TA_COUNT | 7 (TA-A01 through TA-A07) |
| MASTERY_GATE_TA | TA-A07 (P91, terminal) |
| PASS_CRITERION | 7/7 (⌈0.90 × 7⌉ = 7; threshold = 0.90) |
| MAMR | MC-1 ZERO-MEMBERSHIP is FOUNDATIONAL; must be cleared before MC-2 or MC-3 in all repair routing |
| P76_MODE | Cross-link (cross_links ≠ []; references math.arith.counting) |

---

## Component 1 — Cognitive Map

### Prerequisites Activated
- **math.found.set-theory**: ℕ is a set; learner uses set notation {…}, membership (∈), set-builder {n ∈ ℤ : n ≥ 0}, and cardinality.
- **math.found.total-order**: Canonical order on ℕ is a total order (RATT). Learner understands "least element," comparability of all pairs, and ⟨S, <⟩ notation.

### Target Understanding
1. ℕ as a formally defined set with two standard conventions (0-inclusive ISO vs. 1-inclusive NCERT).
2. Peano axioms: base element, successor S, uniqueness axiom, injectivity, induction principle.
3. Canonical total order on ℕ: m < n iff n = S^k(m) for some k ≥ 1.
4. Well-ordering principle: every non-empty S ⊆ ℕ has a least element (distinguishes ℕ from ℤ and ℚ).
5. Arithmetic as recursive derivation from succession: addition and multiplication from Peano.

### Cross-Link Activation
- **math.arith.counting**: Each "next" in counting is S applied once. Peano formalizes what counting assumes.
- **math.nt.divisibility**: d | n defined as ∃k ∈ ℕ, n = k × d — quantifies over ℕ; well-ordering underpins prime factorization.

---

## Component 2 — Misconception Registry

### MC-1 [FOUNDATIONAL] — ZERO-MEMBERSHIP
- **Trigger**: "Zero is not a natural number" OR "ℕ has only one definition"
- **Root cause**: School curricula (NCERT: ℕ = {1,2,3,…}) conflict with ISO 80000-2 (ℕ = {0,1,2,…}). Learner treats one as universal truth.
- **Error pattern**: Asserting one convention is the only valid definition; confusing ℕ with ℕ⁺; deriving proof errors from wrong assumption.
- **Repair**: TA-B01.
- **MAMR**: FOUNDATIONAL — cleared in TA-A01; if triggered later, route to TA-B01 before returning.

### MC-2 — PEANO-INFORMAL
- **Trigger**: "Natural numbers are just what you count — Peano axioms add nothing"
- **Root cause**: Rich informal experience with counting makes axioms feel redundant; learner unaware that P5 (induction) validates proof-by-induction.
- **Error pattern**: Dismissing axioms; not seeing what informal counting leaves unspecified (allows cycles, prevents no inductive proofs).
- **Repair**: TA-B02.
- **MAMR**: Address after MC-1 cleared. FIFO with MC-3.

### MC-3 — WELL-ORDER-FINITE
- **Trigger**: "Well-ordered means finite" OR "ℕ must end somewhere because it has a minimum"
- **Root cause**: Conflating "every subset has a minimum" with "the set has both a minimum and maximum."
- **Error pattern**: Asserting ℕ is finite; claiming ℤ is also well-ordered.
- **Repair**: TA-B03.
- **MAMR**: Address after MC-1 cleared. FIFO with MC-2.

---

## Component 3 — Scaffolding Protocol

### CPA Entry: Concrete
Open with a concrete physical analogy (counting stones, staircase steps) before introducing formal set notation. Use the number line as the pictorial bridge before symbolic successor notation.

### MAMR Enforcement
MC-1 ZERO-MEMBERSHIP addressed in TA-A01 (first TA). If MC-1 triggers at any subsequent TA or at the mastery gate, route → TA-B01 → return to point of interruption. MC-2 and MC-3 are FIFO after MC-1 is cleared: if both are active, address TA-B02 before TA-B03.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — Set Definition and Zero-Membership Convention
**Primitives**: P27 → P11 → P49

**P27 (MISCONCEPTION NAMING):**
Name MC-1 ZERO-MEMBERSHIP immediately: "There are two standard conventions for ℕ that disagree about zero. NCERT (Indian school curriculum) defines ℕ = {1, 2, 3, …}, excluding zero. ISO 80000-2 (international standard used in most university mathematics) defines ℕ = {0, 1, 2, 3, …}, including zero. Neither is wrong — but you must declare which convention you are using. In this course, we adopt ISO: 0 ∈ ℕ."

**P11 (REPRESENTATION SHIFT):**
Three representations of ℕ (ISO convention):

| Representation | Form |
|---|---|
| Roster | ℕ = {0, 1, 2, 3, 4, …} |
| Set-builder | ℕ = {n ∈ ℤ : n ≥ 0} |
| Axiomatic | Generated from base element 0 by successor function S; ℕ is the smallest such set |

Shift: concrete list → abstract set-builder → axiomatically generated structure.

**P49 (ADAPTIVE CHECKPOINT):**
Prompt: "Using ISO 80000-2, list the first four elements of ℕ. Then write ℕ in set-builder notation using ℤ as the ambient set."
- **CORRECT**: {0, 1, 2, 3}; ℕ = {n ∈ ℤ : n ≥ 0} → TA-A02.
- **PARTIAL**: Confirm correct elements; clarify ISO includes 0 as minimum → TA-A02.
- **INCORRECT**: → Protocol B, TA-B01.
- **NO_RESPONSE**: → Protocol B, TA-B01.

---

### TA-A02 — Peano Axioms and Successor Function
**Primitives**: P03 → P07 → P49

**P03 (ANALOGY BRIDGE):**
"The Peano axioms define ℕ like an infinite staircase: there is a first step (0), from every step there is exactly one next step — its successor S(n) — no two steps share the same next step, and the staircase is the smallest set with all these properties (you can reach every step from the first by climbing)."

Formal Peano axioms (simplified):
- **P1 (Base)**: 0 ∈ ℕ
- **P2 (Successor closure)**: ∀n ∈ ℕ, S(n) ∈ ℕ
- **P3 (0 is not a successor)**: ∀n ∈ ℕ, S(n) ≠ 0
- **P4 (Injectivity)**: ∀m,n ∈ ℕ, S(m) = S(n) ⟹ m = n
- **P5 (Induction)**: If P(0) holds, and P(n) ⟹ P(S(n)) for all n ∈ ℕ, then P(n) holds for all n ∈ ℕ.

**P07 (WORKED EXAMPLE PAIR):**
- **Example 1 — Defining numbers via S**: 1 := S(0); 2 := S(1) = S(S(0)); 3 := S(2) = S(S(S(0))). Each natural number is a definite number of applications of S to 0.
- **Example 2 — Injectivity rules out cycles**: Without P4, a "number system" {a, b, c} with S(a)=b, S(b)=c, S(c)=a would satisfy P1–P3. P4 rules out such cycles because if S(m) = S(n), then m = n — no two elements can have the same successor.

**P49 (ADAPTIVE CHECKPOINT):**
Prompt: "Express the number 4 using nested successor notation. What does Peano's injectivity axiom (P4) rule out?"
- **CORRECT**: 4 = S(S(S(S(0)))); P4 rules out cycles or branching — two different numbers cannot have the same successor → TA-A03.
- **PARTIAL**: Confirm nested form; explain P4 prevents "collisions" → TA-A03.
- **INCORRECT**: → Protocol B, TA-B02.
- **NO_RESPONSE**: → Protocol B, TA-B02.

---

### TA-A03 — Canonical Total Order on ℕ
**Primitives**: P04 → P49

**P04 (PATTERN INDUCTION):**
The total order on ℕ is derived from the successor:
- **Definition**: m < n iff n = S^k(m) for some k ≥ 1 (n is reachable from m by applying S at least once).
- **Pattern**:
  - 0 < 1 because 1 = S(0) = S¹(0) ✓
  - 2 < 5 because 5 = S³(2) ✓
  - 7 < 12 because 12 = S⁵(7) ✓
- **Derived ≤**: m ≤ n iff n = S^k(m) for k ≥ 0 (k=0 gives m = n).
- This order is total (for any m, n ∈ ℕ: exactly one of m < n, m = n, n < m holds — totality from the RATT framework).

**P49 (ADAPTIVE CHECKPOINT):**
Prompt: "Is 4 < 9? Express using successor: how many applications of S from 4 reach 9? Name one pair (a, b) from ℕ and verify they are comparable under <."
- **CORRECT**: 9 = S⁵(4) → 4 < 9; e.g., 3 and 7: 7 = S⁴(3) → 3 < 7 ✓ → TA-A04.
- **PARTIAL**: Confirm successor count; note total order means ALL pairs are comparable → TA-A04.
- **INCORRECT**: → Protocol B, TA-B03.
- **NO_RESPONSE**: → Protocol B, TA-B02.

---

### TA-A04 — Well-Ordering Principle
**Primitives**: P03 → P06 → P49

**P03 (ANALOGY BRIDGE):**
"Well-ordering guarantees: in any non-empty collection of natural numbers, there is always a smallest one. Imagine dropping any number of stones labelled with natural numbers into a pile; you can always pick out the stone with the smallest label — no matter how large or infinite the pile."

Formal: ⟨ℕ, <⟩ is **well-ordered**: every non-empty S ⊆ ℕ has a least element min(S) ∈ S such that min(S) ≤ x for all x ∈ S.

**P06 (CONTRAST PAIR PROMPT):**

| Set | Well-ordered? | Reason |
|---|---|---|
| ℕ = {0, 1, 2, …} | ✓ YES | Every non-empty S ⊆ ℕ has a minimum |
| ℤ = {…, −2, −1, 0, 1, …} | ✗ NO | {n ∈ ℤ : n < 0} = {…,−3,−2,−1} has no minimum |
| (0, 1) ∩ ℚ | ✗ NO | Between 0 and any positive rational, there is a smaller rational |
| {1, 2, …, 100} (finite) | ✓ YES | All finite totally ordered sets are well-ordered |

Key: well-ordering requires a MINIMUM in every non-empty subset. It says nothing about a maximum. ℕ is infinite AND well-ordered — refuting MC-3 directly.

**P49 (ADAPTIVE CHECKPOINT):**
Prompt: "Is S = {n ∈ ℕ : n > 50} well-ordered? What is min(S)? Is ℤ well-ordered? Give a counterexample subset."
- **CORRECT**: S ⊆ ℕ → well-ordered; min(S) = 51. ℤ: not well-ordered; counterexample {n ∈ ℤ : n < 0} has no minimum → TA-A05.
- **PARTIAL**: Confirm S min=51; supply counterexample for ℤ → TA-A05.
- **INCORRECT**: → Protocol B, TA-B03.
- **NO_RESPONSE**: → Protocol B, TA-B03.

---

### TA-A05 — Arithmetic from Peano Recursion
**Primitives**: P04 → P07 → P49

**P04 (PATTERN INDUCTION):**
Addition defined recursively:
- **Base**: a + 0 = a
- **Step**: a + S(b) = S(a + b)
- **Pattern**: a + n = S^n(a) — adding n means applying S exactly n times to a.

Multiplication from addition:
- **Base**: a × 0 = 0
- **Step**: a × S(b) = (a × b) + a

**P07 (WORKED EXAMPLE PAIR):**
- **Example 1 — 3 + 2**: 3+2 = 3+S(1) = S(3+1) = S(3+S(0)) = S(S(3+0)) = S(S(3)) = S(4) = 5 ✓
- **Example 2 — 1 + 1 = 2**: 1+1 = 1+S(0) = S(1+0) = S(1) = 2 ✓ (First-principles proof that 1+1=2.)

**P49 (ADAPTIVE CHECKPOINT):**
Prompt: "Using the Peano recursive definition, compute 2 + 3 step-by-step, applying the step rule each time until the base case."
- **CORRECT**: 2+3=2+S(2)=S(2+2)=S(2+S(1))=S(S(2+1))=S(S(2+S(0)))=S(S(S(2+0)))=S(S(S(2)))=S(S(3))=S(4)=5 ✓ → TA-A06.
- **PARTIAL**: Confirm each step rule application; show base case 2+0=2 terminates recursion → TA-A06.
- **INCORRECT**: → Protocol B, TA-B02.
- **NO_RESPONSE**: → Protocol B, TA-B02.

---

### TA-A06 — Cross-Link Bridge: Counting and Divisibility
**Primitives**: P41 → P64 → P49

**P41 (MISCONCEPTION DETECTOR):**
Probe: "Does everyday counting (1, 2, 3, …) capture everything we need about ℕ? What does the Peano axiom system add that informal counting doesn't provide?"
Expected detection: MC-2 PEANO-INFORMAL — learner may respond "counting is sufficient."

**P64 (CONCEPTUAL SHIFT):**
Bridge 1 — Counting ↔ Peano Successor:
"Counting IS the Peano successor in action: saying '1, 2, 3' is performing S(0), S(S(0)), S(S(S(0))). What Peano adds: (1) The induction axiom P5 — the formal reason proof-by-induction is valid. Without P5, you can count forever but cannot prove claims about ALL natural numbers. (2) The rules P3 and P4 that rule out cycles and branching, which informal counting assumes away without stating."

Cross-link → **math.arith.counting**: "Counting n objects is a bijection between the objects and {1, 2, …, n} ⊂ ℕ. Each count '1, 2, …, n' corresponds to applying S exactly n times from 0 (or 1). Peano supplies the formal foundation for this bijection to be well-defined."

Cross-link → **math.nt.divisibility**: "Divisibility: d | n iff ∃k ∈ ℕ, n = k×d. This existential quantifier ranges over ℕ. Well-ordering of ℕ underpins the fundamental theorem of arithmetic (every integer > 1 factors uniquely into primes) — the proof uses WOP on the set of counterexamples."

**P49 (ADAPTIVE CHECKPOINT):**
Prompt: "Why is P5 (the induction axiom) necessary for mathematical proof? Give an example of a claim about ℕ that you can verify for the first million cases but cannot PROVE without induction."
- **CORRECT**: e.g., "The sum of the first n natural numbers equals n(n+1)/2." Verified for 1, 2, …, 1,000,000 by computation — but proof for ALL n requires induction. P5 validates the inductive step → TA-A07.
- **PARTIAL**: Confirm that finite verification ≠ universal proof; sketch the induction structure → TA-A07.
- **INCORRECT/NO_RESPONSE**: Reteach TA-A02 core (P5 specifically) → return to TA-A06 → TA-A07.

---

### TA-A07 — P91 Mastery Gate (Terminal)
**Primitive**: P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**[GR-3: Terminal TA — routing via P75/P74 only]**
**[GR-6: P91 is the terminal compound in this TA]**
**[GR-7: P76 present in this mastery gate]**

**P77 (MULTI-PROBLEM SET):**

Q1: "Under ISO 80000-2, is 0 ∈ ℕ? List the three smallest elements of ℕ."

Q2: "Write the number 3 as a nested application of the Peano successor S, starting from 0."

Q3: "Is ⟨ℕ, <⟩ well-ordered? Is ⟨ℤ, <⟩ well-ordered? Give a one-sentence justification for each answer."

Q4: "Find min(A) where A = {n ∈ ℕ : n² > 20}."

Q5: "Using the Peano recursive definition (a+0=a; a+S(b)=S(a+b)), verify step-by-step that 2 + 2 = 4."

Q6: "State one mathematical consequence of well-ordering that holds for ℕ but FAILS for ℤ."

**P55 (SCORE):** Evaluate Q1–Q6:
- Q1: 0 ∈ ℕ (YES); {0, 1, 2}
- Q2: S(S(S(0)))
- Q3: ℕ: YES (every non-empty subset has a minimum); ℤ: NO (e.g., {n ∈ ℤ : n < 0} has no minimum)
- Q4: min(A) = 5 (4²=16 < 20 < 25=5²)
- Q5: 2+2=2+S(1)=S(2+1)=S(2+S(0))=S(S(2+0))=S(S(2))=S(3)=4 ✓
- Q6: e.g., proof by strong induction works over ℕ but not over ℤ; or every non-empty subset of ℕ has a smallest element but {n ∈ ℤ : n < 0} does not

**P76 (TRANSFER PROBE — Cross-link: math.arith.counting):**
"A software loop processes an array of n items. The loop variable i starts at 0 and is incremented each iteration (i ← S(i) in Peano notation). List the values i takes as a subset of ℕ. How many values are visited? Which property of ℕ guarantees the loop terminates in finite steps?"

Expected: i ∈ {0, 1, 2, …, n−1} — n distinct values. Terminates because ℕ is well-ordered: the "remaining iterations" count {n−1−i, n−2−i, …, 0} is a non-empty subset of ℕ that decreases each step and must reach its minimum (0). This is the cross-link to math.arith.counting (counting n objects = iterating i from 0 to n−1).

**P55 (SCORE):** Evaluate P76: (1) correct element set {0,…,n−1}; (2) count n; (3) well-ordering cited as termination guarantee.

**P75 (MASTERY ASSESSMENT):**
Items: Q1, Q2, Q3, Q4, Q5, Q6, P76 = **7 items**.
Pass criterion: **7/7** (⌈0.90 × 7⌉ = 7; threshold = 0.90).
- **PASS** → P74: route to P78.
- **FAIL** → P74: identify miss pattern → repair routing.

**P74 (ROUTING DECISION):**
- PASS → P78.
- Q1 wrong → TA-B01 (ZERO-MEMBERSHIP).
- Q2 wrong or Q5 wrong → TA-B02 (PEANO-INFORMAL).
- Q3 wrong or Q4 wrong or Q6 wrong or P76 wrong → TA-B03 (WELL-ORDER-FINITE).
- Multiple wrongs → MAMR: TA-B01 first if Q1 wrong, then FIFO: TA-B02 before TA-B03; re-gate after all active MCs cleared.

**P78 (COMPLETION):**
Mastery of math.found.natural-numbers confirmed. Record mastery event. Schedule P89. Activate unlocks: math.arith.counting, math.found.proof-by-induction, math.nt.divisibility.

---

## Component 5 — Protocol B (Repair Chains)

### TA-B01 — Repair MC-1 ZERO-MEMBERSHIP
**Primitives**: P41 → P06 → P64 → P49

**P41**: "What definition of ℕ did your school textbook give? Did it include 0 or exclude it?"

**P06 (CONTRAST PAIR PROMPT):**
| Symbol | Definition | Authority |
|---|---|---|
| ℕ (NCERT) | {1, 2, 3, …} | Indian school curriculum |
| ℕ (ISO 80000-2) | {0, 1, 2, …} | International standard, most university texts |
| ℕ⁺ or ℤ⁺ | {1, 2, 3, …} | Explicit symbol always excluding 0 |
| ℕ₀ | {0, 1, 2, …} | Explicit symbol always including 0 |

**P64**: "The key rule: 0's membership in ℕ is a CONVENTION CHOICE, not a mathematical truth. Both definitions are internally consistent. In formal settings, always declare: 'Let ℕ = {0, 1, 2, …}' or 'Let ℕ = {1, 2, 3, …}' at the outset. This course uses ISO: 0 ∈ ℕ."

**P49**: Prompt: "Under ISO 80000-2, what is the predecessor of 1 in ℕ? Under NCERT, does 1 have a predecessor in ℕ?"
- **CORRECT**: ISO: predecessor of 1 is 0 (S(0)=1); NCERT: 1 has no predecessor — it is the minimum → return to calling TA.
- **PARTIAL/INCORRECT/NO_RESPONSE**: Repeat contrast table; confirm 0 ∈ ℕ under ISO → return to calling TA.

---

### TA-B02 — Repair MC-2 PEANO-INFORMAL
**Primitives**: P03 → P07 → P49

**P03**: "Informal counting gives you the sequence 1, 2, 3, … but doesn't tell you WHY induction is valid, what prevents cycles, or how to prove claims about EVERY natural number. The Peano axioms are the formal rules of the game — counting is just playing it."

**P07 (WORKED EXAMPLE PAIR):**
- **Example 1 — What counting misses**: Without P3 and P4, the set {a, b, c} with S(a)=b, S(b)=c, S(c)=a satisfies successor-closure. Counting never rules this out. P3 (0 is not a successor) and P4 (S is injective) do.
- **Example 2 — Why P5 is needed**: "0 + n = n for all n ∈ ℕ." Verified for n=0,1,2,…,1000 by computation. Cannot conclude for ALL n without P5: base 0+0=0 ✓; step if 0+n=n then 0+S(n)=S(0+n)=S(n) ✓; by P5, holds for all ℕ.

**P49**: Prompt: "Why can't we define ℕ simply as 'the list 0, 1, 2, 3, …' without stating Peano axioms?"
- **CORRECT**: The list doesn't specify what makes ℕ unique among infinite sets, doesn't rule out cycles, and gives no basis for inductive proofs → return to calling TA.
- **PARTIAL/INCORRECT/NO_RESPONSE**: Emphasize formal definitions must rule out all alternatives and enable proofs → return to calling TA.

---

### TA-B03 — Repair MC-3 WELL-ORDER-FINITE
**Primitives**: P27 → P06 → P49

**P27 (MISCONCEPTION NAMING)**: "MC-3 WELL-ORDER-FINITE: 'If a set is well-ordered, it must be finite.' This is wrong. Well-ordering means every non-empty subset has a LEAST element. It says nothing about a greatest element or about the set being finite."

**P06 (CONTRAST PAIR PROMPT):**
| Set | Infinite? | Well-ordered? | Key fact |
|---|---|---|---|
| ℕ = {0, 1, 2, …} | YES (infinite) | ✓ YES | Every S ⊆ ℕ, S ≠ ∅, has a min |
| ℤ = {…,−1, 0, 1,…} | YES (infinite) | ✗ NO | {n ∈ ℤ : n < 0} has no minimum |
| {1, …, 1000} | NO (finite) | ✓ YES | Finite → trivially well-ordered |
| ℚ⁺ = {q ∈ ℚ : q > 0} | YES (infinite) | ✗ NO | No smallest positive rational |

ℕ is simultaneously infinite AND well-ordered. A minimum is not a maximum.

**P49**: Prompt: "True or False: 'An infinite set cannot be well-ordered.' Justify with a counterexample."
- **CORRECT**: FALSE — ℕ is infinite and well-ordered → return to calling TA.
- **PARTIAL/INCORRECT/NO_RESPONSE**: Review contrast table; ℕ as canonical counterexample → return to calling TA.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Content | Pass Criterion |
|---|---|---|
| Day 1 | Q1 (zero-membership) + Q3 (well-ordering ℕ vs ℤ) + P76 (loop iteration) | 3/3 |
| Day 3 | Q2 (Peano successor notation) + Q5 (Peano arithmetic) | 2/2 |
| Day 7 | Mixed 3-item mini-set: one from each MC area | 3/3 |
| Day 21 | Q1, Q3, Q4, Q6 (4 items) | 4/4 |
| Day 60 | Full 7-item mastery gate | 7/7 |

**Decay rule**: Failure at any interval → reset to Day 1 + Protocol B routing:
- Q1/Q6-type failure → TA-B01; Q2/Q5-type → TA-B02; Q3/Q4/P76-type → TA-B03.

---

## Component 7 — Cross-Blueprint Dependencies

### Input Dependencies
| Blueprint | KG ID | What it supplies |
|---|---|---|
| Set Theory | math.found.set-theory | Set membership, set-builder notation, cardinality |
| Total Order | math.found.total-order | RATT axioms; "least element"; ⟨S, <⟩ notation |

### Output Unlocks
| Blueprint | KG ID | What this blueprint enables |
|---|---|---|
| Counting | math.arith.counting | Peano successor formalizes "next" in counting |
| Proof by Induction | math.found.proof-by-induction | P5 induction axiom is the direct prerequisite |
| Divisibility | math.nt.divisibility | Divisibility quantifies over ℕ |

### Cross-Links
- **math.arith.counting**: Bidirectional — ℕ supplies formal foundation; counting supplies concrete model. Bridged in TA-A06 and P76.
- **math.nt.divisibility**: Well-ordering of ℕ underpins prime factorization uniqueness.

---

## Component 8 — Teaching Notes

1. **Zero convention battle**: Address in TA-A01 before any other content. The NCERT/ISO conflict is real and causes errors in formal proofs if left unresolved.
2. **Peano recursion depth**: Keep TA-A05 at conceptual level — learner verifies 1+1=2 and 2+2=4, but full derivation of arithmetic laws belongs to a formal number theory course.
3. **WOP as a proof tool**: WOP is equivalent to the induction axiom. Do NOT introduce WOP-based proofs here — that belongs to math.found.proof-by-induction. Teach WOP as a structural property only.
4. **Concrete entry**: If learner has no prior set-theory context, open TA-A01 with a number line before set-builder notation.

---

## Component 10 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | Blueprint ID matches KG node ID exactly | ✓ math.found.natural-numbers |
| V-2 | KG node ID exists in docs/mathematics/kg/graph.json v1.0.1 | ✓ Verified |
| V-3 | All Component 0 fields populated | ✓ |
| V-4 | DIFFICULTY matches KG (foundational) | ✓ |
| V-5 | BLOOM matches KG (understand) | ✓ |
| V-6 | MASTERY_THRESHOLD matches KG (0.90) | ✓ |
| V-7 | ESTIMATED_HOURS matches KG (4) | ✓ |
| V-8 | All REQUIRES listed; prerequisite blueprints exist | ✓ math.found.set-theory ✓, math.found.total-order ✓ |
| V-9 | CPA_ENTRY correct (foundational → C) | ✓ C |
| V-10 | SESSION_TA_CAP correct (hours=4 ≥ 1h → max 7; used 7) | ✓ |
| V-11 | GR-1: non-repair Protocol A TAs open with B-category primitive | ✓ A01:P27, A02:P03, A03:P04, A04:P03, A05:P04, A06:P41 |
| V-12 | GR-2: every non-gate TA has exactly one P49 | ✓ TA-A01 through TA-A06 each have P49; TA-A07 uses P91 |
| V-13 | GR-3: mastery gate TA is terminal | ✓ TA-A07 uses P91; P75/P74 govern routing |
| V-14 | GR-4: P41/P64 gates repair chain | ✓ TA-A06 P41 detects MC-2; P64 shifts concept; P49 routes to repair |
| V-15 | GR-6: P91 compound is terminal in TA-A07 | ✓ P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78 |
| V-16 | GR-7: P76 present in mastery gate | ✓ P76 cross-link to math.arith.counting in TA-A07 |
| V-17 | GR-8: all cross_links documented in Component 7 | ✓ math.arith.counting, math.nt.divisibility |
| V-18 | GR-9: P76 mode correct (cross_links≠[] → cross-link probe) | ✓ P76 references math.arith.counting directly |
| V-19 | GR-10: MAMR stated and enforced | ✓ MC-1 FOUNDATIONAL; stated Component 0 and Component 3; TA-A07 P74 routing |
| V-20 | Protocol B TAs open with B-category primitive | ✓ B01:P41, B02:P03, B03:P27 |
| AIR | AI Removal Test: executes with human tutor; all content fully specified | ✓ All examples, prompts, and responses are explicit |

**PACKAGE_READY**: V-1 through V-20 PASS. AIR PASS.
