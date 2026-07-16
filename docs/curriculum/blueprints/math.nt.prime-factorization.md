# Teaching Blueprint — math.nt.prime-factorization

## Component 0 — Metadata
concept_id: math.nt.prime-factorization
concept_name: Prime Factorization
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: developing
bloom: apply
estimated_hours: 6
mastery_threshold: 0.85
CPA_entry_stage: C
requires: [math.nt.prime-number, math.nt.divisibility]
cross_links: []
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** Every composite integer can be written as a product of prime powers, and this factorization is unique up to the order of factors (Fundamental Theorem of Arithmetic). The canonical form is n = p₁^a₁ × p₂^a₂ × … × pₖ^aₖ with primes in ascending order.

**Conceptual progression:**
1. A composite number can always be split further until only primes remain.
2. Factor trees and repeated division are two systematic methods to reach the prime factorization.
3. The factorization is unique — different factor trees for the same number always produce the same set of prime factors with the same exponents.
4. Canonical form: write primes in ascending order with exponents (e.g., 2³ × 3 × 5).

**CPA arc (entry: C):**
- Concrete: factor trees drawn on paper — splitting 48 into 2×24, then 2×12, then 2×6, then 2×3; the "leaves" are all prime
- Pictorial: two different factor trees for the same number converging to the same prime base; systematic division table
- Abstract: canonical form p₁^a₁ × p₂^a₂ × …; prime counting function; applications to GCD/LCM

**Prior knowledge activated:** definition of prime vs. composite numbers; divisibility rules (by 2, 3, 5, 7); basic multiplication and exponent notation

---

## Component 2 — Misconception Registry

### MC-1: STOPS-AT-COMPOSITE-FACTOR [FOUNDATIONAL]
**Description:** Learner halts factorization when reaching a composite factor, leaving the factorization incomplete.
**Surface form:** Writes 72 = 8 × 9 and stops, rather than continuing to 2³ × 3².
**Root cause:** Does not check whether each factor is itself prime before stopping; confuses "factored" with "prime-factored."
**Trigger condition:** Any composite number with composite intermediate factors.
**Repair target:** TA-B01.

### MC-2: ONE-IS-PRIME
**Description:** Learner includes 1 as a prime factor (e.g., writes 12 = 1 × 2² × 3).
**Surface form:** Starts the factor tree with 1 × 12, includes 1 in the prime factorization.
**Root cause:** 1 is divisible only by 1 and itself — learner applies a garbled definition of prime (doesn't recall the "greater than 1" requirement).
**Trigger condition:** Any factorization where the learner might introduce 1.
**Repair target:** TA-B01.

### MC-3: FACTORIZATION-ORDER-MATTERS
**Description:** Learner believes 2 × 3² × 5 and 5 × 3² × 2 are different factorizations.
**Surface form:** After finding two valid factor trees that arrive at primes in different orders, learner reports two different answers.
**Root cause:** Does not recognise commutativity of multiplication at the prime-factorization level; uniqueness theorem not yet internalised.
**Trigger condition:** Any pair of factor trees for the same number that generate primes in a different order.
**Repair target:** TA-B02.

---

## Component 3 — Scaffolding Protocol

**Entry diagnostic:** "Is 6 a prime number or composite? Factor 12 as a product of primes." If correct (12 = 2² × 3) → begin TA-A01. If incorrect → repair prerequisite (math.nt.prime-number).

**Scaffolding ladder:**
1. Factor tree for a small number (12) — verify all leaves are prime
2. Factor tree for a 2-digit number (48) — check each branch for primality
3. Division method for a larger number (360) — divide repeatedly by smallest prime that works
4. Compare two factor trees for the same number — observe same primes emerge

**Pacing gate:** Must score ≥ 5/5 on P91 to earn mastery credit (MAMR = 85%).

---

## Component 4 — Protocol A (Main Instruction Path)

### TA-A01 — Factor Trees and the Primality Stop Rule
**Primitive sequence:** P03 → P49

**P03 — ANALOGY BRIDGE:**
> "Think of prime factorization like peeling an onion. Every layer you peel reveals either another layer (composite — keep peeling) or the core (prime — stop). You keep peeling until every piece you hold is a core (prime). For 48: peel into 2 × 24. The 2 is prime (stop). The 24 is composite — peel into 2 × 12. The 12 is composite — peel into 2 × 6. The 6 is composite — peel into 2 × 3. Both leaves are prime — stop. Collect all cores: 2 × 2 × 2 × 2 × 3 = 2⁴ × 3."

Factor tree for 48:
- 48 → 2 × 24 → 2 × (2 × 12) → 2 × 2 × (2 × 6) → 2 × 2 × 2 × (2 × 3) → leaves: 2, 2, 2, 2, 3
- Canonical form: 2⁴ × 3

Primality stop rule: after every split, ask "is this factor prime?" If yes: mark as leaf (done). If no: split again.

Check: 1 is NOT prime (by definition, primes must be greater than 1). Never include 1 as a leaf.

**P49 — ADAPTIVE CHECKPOINT:**
"Draw a factor tree for 60 and write the canonical prime factorization."

- CORRECT (60 = 2² × 3 × 5): "Correct — 60 = 2²×3×5. Your leaves are all prime." → TA-A02
- PARTIAL (correct primes but not in canonical form, e.g., 3×2²×5): "The primes are right. Canonical form: ascending order with exponents: 2²×3×5." → TA-A02
- INCORRECT (stopped at composite factor, e.g., 60=4×15): "4 and 15 are both composite — you need to factor them too. 4=2², 15=3×5. So 60=2²×3×5." → TA-B01
- NO_RESPONSE: "Start: 60=2×30. 2 is prime ✓. 30=2×15. 2 is prime ✓. 15=3×5. Both prime ✓. Leaves: 2,2,3,5. Canonical: 2²×3×5." → TA-A02

---

### TA-A02 — Division Method and the Uniqueness Principle
**Primitive sequence:** P07 → P49

**P07 — WORKED EXAMPLE PAIR:**

*Worked Example 1: Division method for 84*
Divide 84 by the smallest prime that divides it:
84 ÷ 2 = 42 → 42 ÷ 2 = 21 → 21 ÷ 3 = 7 → 7 is prime.
84 = 2² × 3 × 7.

*Worked Example 2: Alternative factor tree for 84 — same result*
Start differently: 84 = 4 × 21 = (2²) × (3 × 7) = 2² × 3 × 7.
Both paths yield the same canonical form — the Fundamental Theorem of Arithmetic guarantees uniqueness up to order.

**P49 — ADAPTIVE CHECKPOINT:**
"Find the prime factorization of 180 using the division method."

- CORRECT (180 = 2² × 3² × 5): "180 ÷ 2 = 90 ÷ 2 = 45 ÷ 3 = 15 ÷ 3 = 5 (prime). Result: 2²×3²×5." → TA-A03
- PARTIAL (correct factors but exponents missing or wrong, e.g., 2×2×3×3×5 without canonical form): "Correct primes — now consolidate: two 2s → 2², two 3s → 3², one 5 → 5. Canonical: 2²×3²×5." → TA-A03
- INCORRECT (stopped at 180=4×45): "4=2² and 45=3²×5 are still composite. Factor completely: 180=2²×3²×5." → TA-B01
- NO_RESPONSE: "180÷2=90; 90÷2=45; 45÷3=15; 15÷3=5 (prime). Collected: 2,2,3,3,5. Canonical: 2²×3²×5." → TA-A03

---

### TA-A03 — Contrast: Complete vs. Incomplete Factorizations
**Primitive sequence:** P06 → P49

**P06 — CONTRAST PAIR:**

| Feature | Complete (correct) | Incomplete (incorrect) |
|---|---|---|
| Number | 72 | 72 |
| Factorization | 72 = 2³ × 3² | 72 = 8 × 9 |
| All factors prime? | Yes: 2 and 3 are prime | No: 8=2³ and 9=3² are composite |
| Status | Canonical prime factorization | Partial factorization |

Second contrast — uniqueness:
| Path | Factor tree | Result |
|---|---|---|
| Tree 1 for 36 | 36=2×18=2×2×9=2×2×3×3 | 2²×3² |
| Tree 2 for 36 | 36=4×9=(2×2)×(3×3) | 2²×3² |
| Same? | YES — Fundamental Theorem guarantees this | ✓ |

**P49 — ADAPTIVE CHECKPOINT:**
"Is this a complete prime factorization? 120 = 4 × 2 × 3 × 5"

- CORRECT (No — 4=2² is composite; correct answer is 120=2³×3×5): "Right — 4 is composite. Factor 4=2². Complete: 2³×3×5." → TA-A04
- PARTIAL (says no but wrong correction): "4=2². So 120=2²×2×3×5=2³×3×5." → TA-A04
- INCORRECT (says yes): "Check each factor: is 4 prime? No — 4=2². The factorization is incomplete. Rewrite 4 as 2² to get 2³×3×5." → TA-B01
- NO_RESPONSE: "Test each factor: 4 is not prime (4=2²); 2 is prime; 3 is prime; 5 is prime. Replace 4: 120=2²×2×3×5=2³×3×5." → TA-A04

---

### TA-A04 — Mastery Gate (P91)
**Primitive sequence:** P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

MAMR: 85% → PASS requires ⌈0.85 × 5⌉ = 5/5 (4 P77 items + 1 P76 item).

**P77 — MULTI-PROBLEM SET (4 items):**

Item 1: Write the prime factorization of 48. [Answer: 48 = 2⁴ × 3]
Item 2: Write the prime factorization of 45. [Answer: 45 = 3² × 5]
Item 3: True or False — 1 is a prime factor of every integer. [Answer: FALSE — 1 is not prime]
Item 4: Is 72 = 2³ × 9 a complete prime factorization? If not, write the correct form. [Answer: No — 9=3² is composite; correct: 72 = 2³ × 3²]

**P55 — SCORE:** Record items correct out of 4.

**P76 — TRANSFER PROBE (independence mode — cross_links: []):**
(a) Find the prime factorization of 360. [Answer: 360 = 2³ × 3² × 5]
(b) A number n is a perfect square if and only if every prime in its factorization appears to an even exponent. Is 360 a perfect square? [Answer: No — 2 appears to the 3rd power (odd), and 5 appears to the 1st power (odd)]
(c) What is the smallest integer k such that 360k is a perfect square? [Answer: k = 2 × 5 = 10; gives 360×10 = 3600 = 2⁴×3²×5², all even exponents]

**P55 — SCORE:** Record P76 correct (1) or incorrect (0).

**P75 — MASTERY ASSESSMENT:** Total score = P77 score + P76 score (max 5).

**P55 — SCORE:** Final score out of 5.

**P74 — ROUTING DECISION:**
- Score 5/5 → PASS → P78 COMPLETION
- Score < 5/5 → FAIL → Route to TA-B01 (incomplete factorization / 1-is-prime errors) or TA-B02 (order/uniqueness errors)

**P55 — SCORE:** Log routing outcome.

**P78 — COMPLETION:**
> "Prime factorization: mastered. You can decompose any composite integer into its canonical prime power form using factor trees or division, recognize when a factorization is incomplete, and apply the uniqueness property. This is the cornerstone of GCD, LCM, and the Fundamental Theorem of Arithmetic."

---

## Component 5 — Protocol B (Repair Path)

### TA-B01 — Repair: Stops-at-Composite / One-Is-Prime
**Primitive sequence:** P27 → P41 → P64

**P27 — MISCONCEPTION NAMING:**
> "Two errors: STOPS-AT-COMPOSITE-FACTOR (leaving composite factors in the factorization, e.g., 72=8×9 rather than 2³×3²) and ONE-IS-PRIME (including 1 as a prime factor). Both produce an incorrect or incomplete result."

**P41 — MISCONCEPTION DETECTOR:**
> "The primality test: a number is prime if its only divisors are 1 and itself AND it is greater than 1. Test each factor: is 8 prime? 8=2×4 → not prime. Is 9 prime? 9=3×3 → not prime. Is 1 prime? Definition requires greater than 1 → not prime. Every non-prime factor must be split further."

**P64 — CONCEPTUAL SHIFT:**
> "The algorithm has a strict termination condition: a factor tree leaf is only valid when it is a prime number — a number greater than 1 with no divisors other than 1 and itself. Apply this check to every factor before marking it as a leaf. The primality test is the gate, not a suggestion."

→ TA-A02

---

### TA-B02 — Repair: Factorization-Order-Matters
**Primitive sequence:** P27 → P41 → P64

**P27 — MISCONCEPTION NAMING:**
> "The error is FACTORIZATION-ORDER-MATTERS — believing 5×3×2² and 2²×3×5 are different factorizations. The Fundamental Theorem of Arithmetic states that prime factorization is unique UP TO ORDER: any rearrangement of the same primes is the same factorization."

**P41 — MISCONCEPTION DETECTOR:**
> "Compute: 5×3×2²=5×3×4=60. Compute: 2²×3×5=4×3×5=60. Same number, same primes, same exponents — only the order of writing differs. Multiplication is commutative: a×b×c = c×b×a."

**P64 — CONCEPTUAL SHIFT:**
> "Canonical form fixes the presentation to resolve ambiguity: always write primes in ascending order with exponents. 60=2²×3×5, not 5×3×2². This canonical form is unique — there is exactly one way to write it. Different factor trees reach the same canonical form through commutativity."

→ TA-A03

---

## Component 6 — P89 Spaced Repetition Schedule

```
P89:
  concept_id: math.nt.prime-factorization
  MAMR: 0.85
  intervals: [1, 3, 7, 14, 30]
  session_1_probe: "Find the prime factorization of 90."
  session_3_probe: "Is 144 a perfect square? Use prime factorization to justify."
  session_7_probe: "Find the prime factorization of 420."
  session_14_probe: "What is the smallest n such that 2²×3×n is a perfect cube?"
  session_30_probe: "Explain in your own words why every composite number has a unique prime factorization."
```

---

## Component 7 — Cross-Blueprint Dependencies

**Requires (prerequisites with blueprints):**
- math.nt.prime-number — definition of prime; primality testing [BLUEPRINT EXISTS]
- math.nt.divisibility — divisibility rules; factor/multiple relationship [BLUEPRINT EXISTS]

**Unlocks:**
- math.nt.gcd — greatest common divisor (uses shared prime factors)
- math.nt.lcm — least common multiple (uses prime factorizations)
- math.nt.fundamental-theorem-arithmetic — formal statement of uniqueness

**Cross-links:** [] — no Tier 1 cross-links.

**GR-8 satisfied:** all prerequisite and unlock relationships documented.
**GR-9 satisfied:** P76 independence mode applied (cross_links empty).

---

## Component 8 — Teaching Notes

**Pedagogical priority:** The primality-check stop rule (TA-A01, P03) must be explicitly stated before any factor tree work begins. Learners who treat "factored at all" as equivalent to "prime-factored" will consistently produce MC-1 errors.

**Two methods, same result:** Always demonstrate both factor trees and the division method, and then show they give the same canonical form. This concretely establishes the uniqueness property (MC-3 prevention) before it is stated abstractly.

**1 is not prime:** State this explicitly in TA-A01 and repeat in the repair path. The definition "greater than 1" is the critical qualifier.

**V-3 check (CPA_ENTRY=C for developing difficulty):** TA-A01 opens with the onion-peeling analogy and a hand-drawn factor tree (concrete) — V-3 satisfied.

**GR-10 — MAMR enforcement:** MAMR = 85%. A learner who scores 4/5 on the P91 gate does NOT receive mastery credit and routes to repair, then retakes the gate. A score of 5/5 is required.

---

## Component 10 — Validation Checklist

### Grammar Rules
- [x] GR-1: TA-A01 opens with P03 (B-category primitive for developing/apply)
- [x] GR-2: Each non-gate TA (A01, A02, A03) contains P49
- [x] GR-3: TA-A04 is terminal (P91 contains P74 → P78 PASS or repair branch)
- [x] GR-4: Repair TAs B01 and B02 open with P27 + P41 + P64
- [x] GR-6: P91 is terminal within TA-A04; no further TAs follow PASS
- [x] GR-7: P76 present in TA-A04 (mastery gate)
- [x] GR-8: Cross-blueprint dependencies documented in Component 7
- [x] GR-9: cross_links = [] → P76 independence mode applied; probe uses perfect-square analysis
- [x] GR-10: MAMR = 85% stated; PASS threshold = 5/5 enforced in P74 routing

### Structural Validators
- [x] V-1: concept_id matches KG entry (math.nt.prime-factorization)
- [x] V-2: difficulty=developing, bloom=apply, h=6, thresh=0.85 match KG
- [x] V-3: CPA_ENTRY=C (developing → concrete entry); TA-A01 opens with factor tree drawn concretely
- [x] V-4: All 3 MCs have FOUNDATIONAL flag on MC-1 only
- [x] V-5: P03 correctly anchors TA-A01 (onion-peeling analogy for iterative factoring)
- [x] V-6: P07 present in TA-A02 (bloom=apply requires worked example pair)
- [x] V-7: P91 structure complete: P77(4 items)→P55→P76→P55→P75→P55→P74→P55→P78
- [x] V-8: PASS criterion: ⌈0.85 × 5⌉ = 5/5 — 4 P77 items + 1 P76 = n=5
- [x] V-9: P74 routes PASS → P78, FAIL → TA-B01 or TA-B02
- [x] V-10: All repair TAs (B01, B02) terminate by routing back to a main TA
- [x] V-11: P49 has four branches (CORRECT/PARTIAL/INCORRECT/NO_RESPONSE) in each TA
- [x] V-12: P77 items cover factorization, canonical form, 1-is-not-prime, incomplete-detection
- [x] V-13: P76 probe is genuine transfer (perfect square analysis via factorization structure)
- [x] V-14: Spaced repetition schedule (P89) present with 5 intervals
- [x] V-15: Component 7 documents requires, unlocks, cross_links explicitly
- [x] V-16: TA chain matches h=6 scope (3 main TAs + gate — within spec for h≥6)
- [x] V-17: MCs link to repair TAs in Component 2
- [x] V-18: P49 NO_RESPONSE branch gives complete worked demonstration
- [x] V-19: P78 completion statement summarizes what mastery enables
- [x] V-20: Teaching Notes (Component 8) include MAMR restatement and V-3 check note

### AIR Assessment
- Actionable: P49 branches provide specific re-routing and feedback for each response type ✓
- Irreversible: Onion-peeling analogy establishes iterative stopping rule before formal algorithm; uniqueness shown via two converging factor trees ✓
- Robust: 3-TA chain matches h=6 scope; P91 gate enforces 85% threshold ✓

**STATUS: PACKAGE_READY**
