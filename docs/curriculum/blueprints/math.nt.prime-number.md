# TEACHING BLUEPRINT — math.nt.prime-number

## Component 0 — Metadata

| Field | Value |
|---|---|
| concept_id | math.nt.prime-number |
| concept_name | Prime Number |
| domain | number_theory |
| difficulty | developing |
| bloom | remember |
| estimated_hours | 5 |
| mastery_threshold | 0.90 |
| CPA_ENTRY | C |
| MAMR | MC-1 FOUNDATIONAL cleared first; secondary MCs FIFO after |
| session_ta_cap | max 7 conditional repair TAs (≥1h session) |

**PASS CRITERION:** ⌈0.90 × 5⌉ = 5/5 (P77 items=4, P76 item=1)

**prerequisites:** [math.nt.divisibility]
**unlocks:** [math.nt.fundamental-theorem-arithmetic, math.nt.prime-factorization]
**cross_links:** [math.nt.fundamental-theorem-arithmetic — NOT Tier 1]

---

## Component 1 — Cognitive Map

**Core concept:** A prime number is a natural number greater than 1 whose only positive divisors are 1 and itself. All other natural numbers greater than 1 are composite (they have at least one divisor other than 1 and themselves). The number 1 is neither prime nor composite by definition. Primes are the multiplicative building blocks of all positive integers.

**Knowledge prerequisites activated:**
- math.nt.divisibility: a|b means ∃k∈ℤ: b=ak; p is prime iff its only divisors in ℕ are 1 and p

**Concept structure:**
1. **Definition**: p is prime ↔ p > 1 and the only positive divisors of p are 1 and p
2. **Exclusion of 1**: 1 is excluded by definition; it is neither prime nor composite
3. **The only even prime**: 2 is prime (divisors: 1 and 2 only); every other even number is composite
4. **Primality test**: to test p, check divisibility by every integer from 2 to √p; if none divide p, it is prime

**Target understanding:** The learner can state the definition of a prime number, correctly classify small numbers as prime or composite, identify 1 as neither, and identify 2 as the only even prime.

---

## Component 2 — Misconception Registry

| ID | Name | Trigger Signature | Error Pattern | Repair TA |
|---|---|---|---|---|
| MC-1 | PRIME-INCLUDES-ONE | Asked whether 1 is prime | Argues 1 is prime because "its only divisors are 1 and itself"; misses the "greater than 1" clause in the definition | B01 |
| MC-2 | ODD-EQUALS-PRIME | Asked about even primes | Claims 2 is not prime because "even numbers are never prime"; or that all odd numbers are prime (missing composites like 9, 15, 21) | B02 |
| MC-3 | LAST-DIGIT-HEURISTIC | Asked to classify numbers like 21, 51, 91 | Incorrectly concludes primality from the last digit alone (e.g., "21 ends in 1 so it's prime") without testing divisors | B03 |

**FOUNDATIONAL MC:** MC-1 (PRIME-INCLUDES-ONE) — the "greater than 1" boundary condition is structural; must be established before odd/even and heuristic errors are addressed.

---

## Component 3 — Scaffolding Protocol

**CPA Entry Stage:** C — Concrete
Tile-grouping model: given p tiles, try to arrange them into rectangular arrays (rows × columns) with more than one row and more than one column. If the only rectangles possible are 1×p or p×1, p is prime.

**Progression Gate (C → P):** Learner can group tiles to identify all factor pairs of a number.
**Progression Gate (P → A):** Learner states the definition from memory and applies the √p test to classify two-digit numbers.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — Indivisible Atoms: The Molecular Analogy (GR-1: P03 | GR-2: P49)

**P03 ANALOGY BRIDGE**

Source domain: Chemistry — atoms are the indivisible building blocks; molecules are atoms combined.
Target domain: Number theory — primes are the indivisible building blocks of multiplication; composite numbers are primes combined.
Mapping: atom ↔ prime; molecule ↔ composite number; "cannot be split further" ↔ "has no divisors between 1 and itself"

"Just as water (H₂O) is made of hydrogen and oxygen atoms, 12 = 2²×3 is made of prime atoms 2 and 3. But 7 cannot be broken into smaller multiplicative pieces — it is a prime atom."

Concrete tile demo:
```
7 tiles: only rectangle possible is 1×7 (or 7×1) → PRIME
12 tiles: rectangles 1×12, 2×6, 3×4, 4×3, 6×2, 12×1 → COMPOSITE (divisors include 2, 3, 4, 6)
1 tile: only 1×1 → NEITHER prime nor composite (excluded by definition)
```

**P49 ADAPTIVE CHECKPOINT**
Q: "Using the tile method, decide whether 11 is prime or composite. What rectangles can you form?"
→ CORRECT [1×11 only → prime]: "Correct — 11 is prime. Only the 1×11 rectangle is possible." → TA-A02
→ PARTIAL [says prime but cannot name the rectangles]: "What is 11÷2? 11÷3? ... 11÷10? None divide evenly → prime." → re-prompt
→ INCORRECT [says composite]: Flag — ask which divisor they found. If they claim 11÷11=1: re-present that divisors between 1 and p must exist; 11 has none. → re-prompt
→ NO_RESPONSE: Replay 7-tile demo; apply same test to 11.

---

### TA-A02 — Positive Divisors, Factor Pairs, Definition (GR-1: P11 | GR-2: P49)

**P11 REPRESENTATION SHIFT**

Three representations of primality for p=13:

| Representation | Form | Evidence |
|---|---|---|
| Concrete | No rectangular array except 1×13 | 13 tiles → only one row or one column |
| Procedural | All divisors listed | Divisors of 13: {1, 13} — exactly two |
| Formal | Definition applied | 13 > 1 and only positive divisors are 1 and 13 ✓ |

Contrast with p=15:

| Representation | Form | Evidence |
|---|---|---|
| Concrete | 3×5 rectangle possible | 15 tiles → 3 rows × 5 columns |
| Procedural | Divisors: {1, 3, 5, 15} | More than two divisors → composite |
| Formal | 15=3×5 | Has a divisor (3) between 1 and 15 → NOT prime |

Special case — the number 1:
- 1's only positive divisor is 1 (itself)
- The definition requires "greater than 1" explicitly
- 1 is neither prime nor composite — it is the multiplicative identity

**P49 ADAPTIVE CHECKPOINT**
Q: "List all positive divisors of 19. Is 19 prime? Apply the formal definition."
→ CORRECT [divisors: {1,19}; 19>1 and only divisors are 1 and 19 → prime]: "Correct." → TA-A03
→ PARTIAL [says prime but lists extra divisors like 19÷7]: "Verify each: 19÷2=9.5, 19÷3=6.3… none are integers." → re-prompt
→ INCORRECT [includes 1 as prime example]: Flag MC-1. Route → B01
→ NO_RESPONSE: Walk through divisor check 2 to √19≈4.4: test 2, 3, 4 — none divide 19.

---

### TA-A03 — Prime vs. Composite vs. 1; The Only Even Prime (GR-1: P06 | GR-2: P49)

**P06 CONTRAST PAIR**

*Case A — Prime (exactly two positive divisors: 1 and itself):*
2 → divisors: {1,2} → prime (the ONLY even prime)
3 → divisors: {1,3} → prime
7 → divisors: {1,7} → prime
13 → divisors: {1,13} → prime

*Case B — Composite (three or more positive divisors):*
4 → divisors: {1,2,4} → composite (2|4)
9 → divisors: {1,3,9} → composite (3|9)
15 → divisors: {1,3,5,15} → composite (3|15 and 5|15)
21 → divisors: {1,3,7,21} → composite (3|21)

*Case C — Neither (exactly one positive divisor):*
1 → divisors: {1} → **neither prime nor composite** (excluded by definition: must be > 1)

Key corrections:
- 2 is prime — it is even but has exactly two divisors; it is the only even prime
- Odd ≠ prime: 9, 15, 21, 25, 27, 35 are all odd and composite
- 1 is not prime — the definition says "greater than 1"

**P49 ADAPTIVE CHECKPOINT**
Q: "Classify each: (a) 2, (b) 9, (c) 1. Give one reason for each classification."
→ CORRECT [(a) prime — only even prime, divisors {1,2}; (b) composite — 3|9; (c) neither — excluded by definition]: "All correct." → TA-A04
→ INCORRECT [(a) 2 not prime or (c) 1 prime]: Flag appropriate MC. Route to B02 if MC-2, B01 if MC-1.
→ NO_RESPONSE: "List divisors of 2: what divides 2 besides 1 and 2 itself?" → scaffold

---

### TA-A04 — Mastery Gate (GR-3: P91 terminal | GR-6: P91 in this TA only | GR-7: P76)

**P91 NAMED COMPOUND: P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78**

---

**P77 MULTI-PROBLEM SET**

1. **Is 17 prime?** List all positive divisors.
   *(Expected: divisors {1,17} only; 17>1; YES — prime)*

2. **Is 21 prime?** Find a divisor other than 1 and 21.
   *(Expected: 21=3×7; divisor 3 (or 7) exists → NO — composite)*

3. **True/False:** 1 is prime because its only divisors are 1 and itself.
   *(Expected: FALSE — the definition requires the number to be greater than 1; 1 is neither prime nor composite)*

4. **Is 2 prime?** Justify your answer.
   *(Expected: YES — divisors of 2 are {1,2} only; 2>1; 2 is prime and is the only even prime)*

**P55 SCORE** (P77): ___/4

---

**P76 TRANSFER PROBE** (GR-9: independence mode — math.nt.fundamental-theorem-arithmetic is NOT Tier 1; novel context used)

*Cryptography context — testing a two-digit number:*

"Cryptography relies on the difficulty of factoring large numbers. Test whether **91** is prime using the √p method (only need to test divisors up to √91 ≈ 9.5):

(a) Test divisibility by 2, 3, 5, 7. For each, state whether it divides 91 and show the check.
(b) Based on your tests, is 91 prime or composite? If composite, express it as a product of two primes."

*(Expected:*
*(a) 2: 91 is odd → 2∤91; 3: 9+1=10, not divisible by 3 → 3∤91; 5: does not end in 0 or 5 → 5∤91; 7: 91÷7=13 exactly → 7|91*
*(b) 91 is composite: 91=7×13, and both 7 and 13 are prime.)*

**P55 SCORE** (P76): ___/1

---

**P75 MASTERY ASSESSMENT**
Total: P77_score + P76_score = ___/5
PASS criterion: **5/5** (threshold 0.90; ⌈0.90×5⌉ = 5)

**P55 SCORE** (total): ___/5

---

**P74 ROUTING DECISION**
→ **PASS** (5/5): → P78
→ **FAIL** (<5/5): → B01 (MAMR: clear MC-1 PRIME-INCLUDES-ONE first; then B02 or B03 as flagged)

**P55 SCORE** (route logged): ___

---

**P78 COMPLETION**
"You can now define a prime number, classify numbers as prime, composite, or neither, correctly exclude 1, identify 2 as the only even prime, and test primality up to √p. Primes are the atoms of multiplication — fundamental theorem of arithmetic and prime factorisation build directly on this foundation."

---

## Component 5 — Protocol B (Misconception Repair)

### TA-B01 — Repair: PRIME-INCLUDES-ONE (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"It seems natural to call 1 prime because its only positive divisor is 1 (itself). But the definition of prime explicitly requires the number to be greater than 1. This exclusion is deliberate: if 1 were prime, the Fundamental Theorem of Arithmetic (unique prime factorisation) would break down — every number would have infinitely many factorisations (e.g., 6=2×3=1×2×3=1×1×2×3…)."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "Is 1 a prime number? Explain your reasoning."
→ Says YES with "divisors are 1 and itself" argument: MC-1 confirmed. Continue B01.
→ Says NO: MC-1 not active. Exit B01 → next flagged MC or TA-A04.

**P64 CONCEPTUAL SHIFT**
"The full definition is: a prime is a natural number **greater than 1** whose only positive divisors are 1 and itself. The 'greater than 1' clause is part of the definition, not a technicality. For 1: divisors = {1} — that is only one divisor, and one divisor means exactly one: itself. The definition requires **two distinct divisors** (1 and p, which must be different), so p > 1 is required structurally.

```
1 → divisors: {1}          — exactly 1 divisor → NEITHER prime nor composite
p → divisors: {1, p}       — exactly 2 divisors → PRIME   (requires 1 ≠ p, i.e., p > 1)
n → divisors: {1,...,n}    — 3+ divisors → COMPOSITE
```"

**P49 ADAPTIVE CHECKPOINT**
Q: "How many distinct positive divisors does 1 have? How many does a prime number have? Why does this exclude 1?"
→ CORRECT [1 has one divisor; primes have exactly two (1 and p); 1≠p requires p>1; 1 excluded]: "Correct." Exit B01 → B02 if flagged, else TA-A04.
→ INCORRECT: Re-present the three-row table; emphasise "two distinct" divisors requirement. → re-prompt.

---

### TA-B02 — Repair: ODD-EQUALS-PRIME (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"Two related errors: (1) thinking 2 is not prime because it is even — but 2 has exactly two divisors {1,2} and satisfies the definition perfectly; (2) thinking all odd numbers are prime — but odd composites like 9, 15, 21 disprove this."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "Is 2 prime? And is 9 prime?"
→ Says 2 is not prime OR says 9 is prime: MC-2 confirmed. Continue B02.
→ Correct on both: MC-2 not active. Exit B02 → B03 if flagged, else TA-A04.

**P64 CONCEPTUAL SHIFT**
"Primality is about the count of divisors, not about odd/even parity.

2: divisors {1,2} — exactly two → PRIME. Even but prime. The only even prime.
9: divisors {1,3,9} — three divisors → COMPOSITE. Odd but composite. 9=3×3.

The confusion arises because most primes above 2 are odd — but not all odd numbers are prime. Check the divisor count, not the parity."

**P49 ADAPTIVE CHECKPOINT**
Q: "Classify 25 (odd) and 2 (even). Justify each using divisor counts."
→ CORRECT [25: divisors {1,5,25} → composite; 2: divisors {1,2} → prime]: "Correct." Exit B02 → B03 if flagged, else TA-A04.
→ INCORRECT: "List every number that divides 25 exactly." → scaffold.

---

### TA-B03 — Repair: LAST-DIGIT-HEURISTIC (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"Some learners use the last digit to guess primality — for example, 'numbers ending in 1, 3, 7, or 9 must be prime.' While all primes greater than 5 end in one of these digits, the converse is false: 21, 51, 91 all end in 1 or 1-family digits but are composite."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "Is 51 prime? How did you decide?"
→ Says YES by last-digit reasoning ("ends in 1"): MC-3 confirmed. Continue B03.
→ Tests by division and finds 3|51: MC-3 not active. Exit B03 → TA-A04.

**P64 CONCEPTUAL SHIFT**
"Last digit tells you about divisibility by 2 and 5 only. It says nothing about divisibility by 3, 7, 11, 13, or other primes.

Counter-examples to last-digit reasoning:
```
21 = 3 × 7   → composite  (ends in 1)
51 = 3 × 17  → composite  (ends in 1)
91 = 7 × 13  → composite  (ends in 1)
```
Test: to classify p, divide by every integer from 2 up to √p. If none divide evenly, p is prime. There is no shortcut based on the last digit alone."

**P49 ADAPTIVE CHECKPOINT**
Q: "Test 57 for primality. Apply divisibility checks from 2 up to √57≈7.5."
→ CORRECT [57÷3=19 exactly → 57=3×19 → composite]: "Correct — 57 is composite." Exit B03 → TA-A04.
→ INCORRECT ["ends in 7, so prime"]: Re-present divisibility check: "57÷3=?" → guided.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Focus | Probe Type |
|---|---|---|
| Day 1 | Definition and exclusion of 1 | "Is 1 prime? Is 23 prime?" |
| Day 3 | Even prime and odd composites | "Classify: 2, 9, 15, 31" |
| Day 7 | √p primality test on two-digit numbers | "Is 49 prime? Test up to 7." (No: 7×7=49) |
| Day 30 | Transfer: finding all primes up to 30 | Sieve of Eratosthenes mini-task |

---

## Component 7 — Cross-Blueprint Dependencies

**Depends on:**
- math.nt.divisibility (required): p is prime iff its only positive divisors are 1 and p; divisibility (a|b) is the foundational relation

**Enables:**
- math.nt.fundamental-theorem-arithmetic: every integer > 1 factors uniquely into primes (prime existence + uniqueness require the prime definition)
- math.nt.prime-factorization: expressing n as a product of prime powers requires identifying primes

**Cross-links (GR-8):**
- math.nt.fundamental-theorem-arithmetic (NOT Tier 1): FTA states every integer > 1 factors uniquely into primes; motivates why 1 must be excluded — P76 independence mode (cryptographic primality transfer probe used instead)

---

## Component 8 — Teaching Notes

1. **Why 1 is excluded — teach the reason:** The exclusion of 1 is not arbitrary convention but a structural necessity for the Fundamental Theorem of Arithmetic. If 1 were prime, factorisation would be non-unique (6=2×3=1×2×3=…). Learners who understand the reason are far less likely to re-make the MC-1 error.

2. **The √p test efficiency:** For primality testing, only check divisors up to √p. If p has a factor larger than √p, the corresponding co-factor is smaller than √p and would have been found first. This bounds the test at approximately √p steps.

3. **bloom=remember scope:** This concept requires recall (state the definition) and recognition (classify a given number), not derivation or proof. The P76 probe at the level of testing 91=7×13 stays within this scope.

4. **Progression to prime factorisation:** The tile model used in A01 directly extends to tree diagrams for prime factorisation. Flag this connection when learners are ready to advance.

5. **The only even prime:** Emphasise 2 in every session. It is the most common source of MC-2, and it appears in nearly every number-theory argument involving parity.

---

## Component 10 — Validation Checklist

| Rule | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG id | PASS |
| V-2 | All prerequisites have existing blueprints | PASS (math.nt.divisibility ✓) |
| V-3 | CPA_ENTRY = C for developing difficulty | PASS |
| V-4 | GR-1: TA-A01 opens with B-category primitive (P03) | PASS |
| V-5 | GR-2: All non-gate TAs (A01, A02, A03) have P49 | PASS |
| V-6 | GR-3: Mastery gate TA-A04 is terminal | PASS |
| V-7 | GR-4: All repair TAs open with P27+P41+P64 | PASS (B01, B02, B03) |
| V-8 | GR-6: P91 compound is terminal within TA-A04 | PASS |
| V-9 | GR-7: P76 present inside mastery gate TA-A04 | PASS |
| V-10 | GR-8: cross_links documented in Component 7 | PASS |
| V-11 | GR-9: math.nt.fundamental-theorem-arithmetic NOT Tier 1 → P76 independence (cryptography probe) | PASS |
| V-12 | GR-10: MAMR stated in Component 0 and P74 routing | PASS |
| V-13 | PASS criterion: ⌈0.90×5⌉ = 5/5 | PASS |
| V-14 | bloom=remember → P07 not required; P11 REPRESENTATION SHIFT used in A02 | PASS |
| V-15 | P91 sequence: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-16 | P77 has 4 items (n−1 = 4) | PASS |
| V-17 | P76 probe is novel independent context (cryptographic primality test) | PASS |
| V-18 | MC-1 PRIME-INCLUDES-ONE designated FOUNDATIONAL | PASS |
| V-19 | Three misconceptions registered (MC-1, MC-2, MC-3) | PASS |
| V-20 | Three repair TAs (B01→MC-1, B02→MC-2, B03→MC-3) | PASS |
| AIR | No AI-generated lesson content embedded; blueprint is schema and structure only | PASS |

**Blueprint Status:** PACKAGE_READY
