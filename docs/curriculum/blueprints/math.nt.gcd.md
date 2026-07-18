<!-- BLUEPRINT: math.nt.gcd -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Greatest Common Divisor
**Concept ID:** `math.nt.gcd`
**KG Fields:** difficulty=developing | bloom=apply | estimated_hours=5 | mastery_threshold=0.85

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.nt.gcd |
| name | Greatest Common Divisor |
| difficulty | developing |
| bloom | apply |
| estimated_hours | 5 |
| mastery_threshold | 0.85 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.nt.divisibility, math.nt.prime-factorization |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.85 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.nt.divisibility**: $a\mid b$ iff $b=ak$ for some integer $k$ — the relation whose common instances (shared divisors) this concept seeks the LARGEST of
- **math.nt.prime-factorization**: every integer >1 has a unique prime factorization — the tool behind the prime-factorization method for GCD (take the MINIMUM shared exponent of each common prime)

### Target Knowledge State
Student can compute GCD(a,b) via prime factorization (taking the MINIMUM exponent of each prime appearing in BOTH factorizations) and via the Euclidean algorithm (repeated division-with-remainder until the remainder is 0); correctly distinguish coprime (GCD=1) from "at least one number is prime," recognizing two COMPOSITE numbers can still be coprime (share no common prime factors at all); and correctly apply the Euclidean algorithm step by step, continuing until a remainder of EXACTLY ZERO is reached (the GCD is the last NONZERO remainder, not the first small remainder encountered).

### Conceptual Obstacles
1. Confusing the GCD rule (minimum shared exponent) with the LCM rule (maximum shared exponent) when using prime factorization — a genuinely common mix-up, since both procedures compare the same two factorizations and differ only in which extreme (min vs. max) is taken
2. Believing coprimality (GCD=1) requires at least one of the two numbers to be PRIME — missing that two COMPOSITE numbers (e.g. 8 and 9, or 14 and 15) can be coprime, sharing no common prime factor at all, despite neither being prime itself
3. Misapplying the Euclidean algorithm — stopping at the first small or "nice-looking" remainder rather than continuing until the remainder reaches EXACTLY ZERO, and then reporting the WRONG number as the GCD (the correct GCD is the last NONZERO remainder, i.e. the divisor in the final step where the remainder becomes 0)

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | GCD-LCM-EXPONENT-CONFUSION | Student takes the MAXIMUM shared prime exponent when computing GCD (the rule that actually belongs to LCM), or vice versa | Any prime-factorization-based GCD computation where the two numbers' shared primes have different exponents |
| MC-2 | COPRIME-REQUIRES-A-PRIME-NUMBER | Student believes GCD(a,b)=1 (coprime) requires at least one of a,b to be prime, rejecting or doubting coprimality between two composite numbers | Any coprime pair where BOTH numbers are composite, e.g. 8 and 9 |
| MC-3 | EUCLIDEAN-ALGORITHM-WRONG-STOPPING-POINT | Student stops the Euclidean algorithm at the first small remainder encountered, or reports the WRONG value as the GCD, rather than continuing until the remainder is exactly 0 and taking the last nonzero remainder | Any Euclidean algorithm computation requiring more than 2 steps |

**Foundational Misconception:** MC-1 (GCD-LCM-EXPONENT-CONFUSION) — it is the single most common procedural error in this concept precisely because GCD and LCM are computed from the SAME two factorizations via nearly mirror-image rules (minimum vs. maximum exponent), and a student who swaps them will produce a numerically plausible-looking but entirely wrong answer for every multi-prime example, with no built-in signal (like an obviously wrong sign or magnitude) to catch the error without independently re-deriving which rule belongs to which concept.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — developing learner computes GCD via listing all divisors of two small numbers directly, before the prime-factorization and Euclidean-algorithm shortcuts are introduced.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: GCD by exhaustive divisor listing for two small numbers; P: a Venn-diagram-style picture of shared prime factors; A: the formal prime-factorization (minimum exponent) method and the Euclidean algorithm procedure
2. **A02 P06 CONTRAST PAIR** — GCD's minimum-exponent rule vs. LCM's maximum-exponent rule, computed side by side on the same pair (MC-1); a coprime composite-composite pair vs. a non-coprime pair (MC-2); a correctly-completed Euclidean algorithm vs. one stopped too early (MC-3)
3. **A03 P28 CONFLICT EVIDENCE** — a composite problem requiring all three methods (listing check, prime factorization, Euclidean algorithm) to agree
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Three Methods, One Answer

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Ground GCD in exhaustive divisor listing before shortcuts; state the prime-factorization and Euclidean-algorithm methods formally

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (GCD(24,36) by listing all divisors):**

Divisors of 24: 1,2,3,4,6,8,12,24. Divisors of 36: 1,2,3,4,6,9,12,18,36. **Common divisors:** 1,2,3,4,6,12. **Greatest:** 12. So GCD(24,36)=12.

**Stage P — Pictorial (shared prime factors, Venn-diagram style):**

$24=2^3\times3^1$; $36=2^2\times3^2$.

```
   24 = 2×2×2×3         36 = 2×2×3×3
        │ │ │ │              │ │ │ │
        └─┴─┴─┴──── shared: 2,2,3 (minimum count each prime appears in BOTH)
                     GCD = 2×2×3 = 12  ✓ matches the listing method
```

**Stage A — Abstract (formal methods):**

**Prime-factorization method:** write both numbers' prime factorizations; for EACH prime appearing in both, take the MINIMUM of the two exponents; multiply these together. $24=2^3\cdot3^1$, $36=2^2\cdot3^2$: shared primes 2 (min(3,2)=2) and 3 (min(1,2)=1); GCD$=2^2\cdot3^1=4\times3=12$.

**Euclidean algorithm:** repeatedly replace $(a,b)$ with $(b, a\bmod b)$ until the remainder is 0; the GCD is the last NONZERO value. For (36,24): $36=1\times24+12$ → $(24,12)$; $24=2\times12+0$ → remainder 0, **GCD = 12** (the last nonzero remainder, i.e. the divisor 12 in the final step).

All three methods agree: GCD(24,36)=12.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Compute GCD(18,30) by listing all divisors of each number and finding the greatest common one.

**CORRECT:** Divisors of 18: 1,2,3,6,9,18. Divisors of 30: 1,2,3,5,6,10,15,30. Common: 1,2,3,6. Greatest: 6. **GCD(18,30)=6.**
→ "Correct — this listing method is reliable but slow; A01's other two methods (prime factorization, Euclidean algorithm) give the same answer faster for larger numbers." → Proceed to A02.

**PARTIAL:** Student lists divisors correctly but misses one common divisor (e.g. overlooks 6), reporting GCD=3.
→ "Double-check the full divisor lists: 18's divisors are 1,2,3,6,9,18; 30's are 1,2,3,5,6,10,15,30. Both lists include 6 — did you check every divisor of 18 against the full list of 30's divisors? A systematic cross-check (going through each divisor of the smaller number in order) catches misses like this."

**INCORRECT:** Student reports GCD=90 (confusing GCD with LCM, or simply multiplying the numbers) (MC-1-adjacent, though at the listing stage rather than the factorization stage).
→ "GCD must be a divisor of BOTH original numbers — check: does 90 divide 18? No (18<90, impossible for 90 to divide the smaller number 18 evenly unless 18 is 0). The GCD is always ≤ the SMALLER of the two numbers; 90 is far too large to be any common divisor here. Re-list the actual divisors of 18 and 30 and find their overlap."

**NO_RESPONSE:** → "18's divisors: 1,2,3,6,9,18. 30's divisors: 1,2,3,5,6,10,15,30. Common divisors: 1,2,3,6. Greatest: 6. GCD(18,30)=6."

---

### Teaching Action A02 — Min ≠ Max; Coprime Composites; Finish the Algorithm

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-1 with GCD's min-exponent rule vs. LCM's max-exponent rule on the same pair; break MC-2 with a coprime composite-composite example; break MC-3 with a Euclidean algorithm carried to completion vs. stopped early

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Minimum exponent (GCD) vs. maximum exponent (LCM), same pair (MC-1):**

$40=2^3\times5^1$, $60=2^2\times3^1\times5^1$.

| Prime | Exponent in 40 | Exponent in 60 | MIN (→ GCD) | MAX (→ LCM) |
|-------|------------------|-------------------|--------------|--------------|
| 2 | 3 | 2 | **2** | 3 |
| 3 | 0 | 1 | **0** (absent from GCD) | 1 |
| 5 | 1 | 1 | **1** | 1 |

**GCD = $2^2\times5^1=4\times5=20$** (using the MINIMUM of each shared exponent, and excluding any prime — like 3 — not common to BOTH numbers, since its minimum exponent, 0, contributes nothing). **LCM = $2^3\times3^1\times5^1=8\times3\times5=120$** (using the MAXIMUM of each exponent, INCLUDING primes appearing in only one number, since the maximum there is still that number's own exponent). These are genuinely different rules producing genuinely different answers (20 vs. 120) from the identical two factorizations — mixing them up produces a wrong answer that looks equally plausible.

**Contrast 2 — Two composite numbers, still coprime (MC-2):**

$8=2^3$ and $9=3^2$: both are COMPOSITE (neither is prime), yet they share NO common prime factor at all (2 vs. 3, entirely different primes). GCD(8,9): minimum shared exponent — there are no shared primes, so **GCD=1** — 8 and 9 are coprime, despite both being composite. Coprimality is about whether the numbers share ANY prime factor, not about whether either number happens to be prime itself; two "highly composite" numbers built from entirely different prime "ingredients" are automatically coprime.

**Contrast 3 — Finishing the Euclidean algorithm vs. stopping early (MC-3):**

Compute GCD(252, 105) via the Euclidean algorithm, tracking every step:

$252 = 2\times105 + 42$ → $(105,42)$
$105 = 2\times42 + 21$ → $(42,21)$
$42 = 2\times21 + 0$ → remainder 0, **STOP. GCD = 21** (the last nonzero remainder — here, the divisor 21 in the step that produced remainder 0).

A student stopping too early — say, after the FIRST step — might report "GCD=42" (the remainder from step 1) without recognizing the algorithm isn't finished (42 is not yet the terminal nonzero value; the process must continue until a remainder of exactly 0 appears). **The GCD is whichever value plays the role of "divisor" in the step where the remainder finally becomes 0** — here, 21, not 42 or 105.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** (a) Using prime factorization ($40=2^3\cdot5$, $56=2^3\cdot7$), compute GCD(40,56). (b) Are 25 and 49 coprime? Justify using their prime factorizations, noting both are composite. (c) Complete the Euclidean algorithm for GCD(99,45), showing every step and identifying the correct GCD.

**CORRECT:** (a) Shared prime: 2, with exponents 3 and 3 — minimum is 3. 7 and 5 are not shared (each has minimum exponent 0 in the other). GCD $=2^3=8$. (b) $25=5^2$, $49=7^2$ — both composite, but they share NO common prime (5 vs. 7) — **coprime, GCD=1**, despite neither being prime. (c) $99=2\times45+9$ → (45,9); $45=5\times9+0$ → remainder 0, **GCD=9**.
→ "Correct throughout — (b) is a direct application of Contrast 2's lesson to a fresh pair, and (c) confirms the stopping-at-zero discipline." → Proceed to A03.

**PARTIAL:** Student gets (a) and (c) but in (b) hesitates, unsure whether "coprime" can apply since neither 25 nor 49 is prime.
→ "Coprimality never requires either number to be prime — it only requires ZERO shared prime factors. Check: 25's only prime factor is 5; 49's only prime factor is 7. These are different primes, so nothing is shared, and GCD(25,49)=1 — coprime, confirmed directly from the factorizations, regardless of the fact that 25 and 49 are themselves composite."

**INCORRECT:** Student answers (a) using the MAXIMUM exponent instead of minimum, getting GCD=2³×5×7=280 (MC-1).
→ "Check which rule applies to GCD: the MINIMUM shared exponent, not the maximum (maximum belongs to LCM). Here, 5 appears in 40 but not 56 (min exponent = 0, since 56 has zero factors of 5) — it contributes NOTHING to the GCD. Only prime 2, with min(3,3)=3, is shared: GCD=2³=8. Using the maximum (and including non-shared primes) computes the LCM (280), not the GCD."

**NO_RESPONSE:** → "(a) GCD(40,56)=2³=8 (only prime 2 shared, min exponent 3). (b) Coprime — 25=5², 49=7², no shared prime, GCD=1, despite both being composite. (c) 99=2(45)+9; 45=5(9)+0; GCD=9."

---

### Teaching Action A03 — Composite: All Three Methods Must Agree

**Primitive:** P28 CONFLICT EVIDENCE
**Purpose:** Force cross-verification across listing, prime factorization, and the Euclidean algorithm on one problem, surfacing any residual method-specific errors

---

**[P28 — CONFLICT EVIDENCE]**

Compute GCD(84, 126) using all three methods and confirm they agree.

**Listing method:** Divisors of 84: 1,2,3,4,6,7,12,14,21,28,42,84. Divisors of 126: 1,2,3,6,7,9,14,18,21,42,63,126. Common: 1,2,3,6,7,14,21,42. Greatest: **42**.

**Prime factorization method:** $84=2^2\times3\times7$; $126=2\times3^2\times7$. Shared primes: 2 (min(2,1)=1), 3 (min(1,2)=1), 7 (min(1,1)=1). GCD$=2^1\times3^1\times7^1=42$. ✓ Matches.

**Euclidean algorithm:** $126=1\times84+42$ → (84,42); $84=2\times42+0$ → remainder 0, **GCD=42**. ✓ Matches.

**All three methods agree: GCD(84,126)=42.** A student who gets a DIFFERENT answer from one method has made a method-specific error: a listing omission (missing a common divisor), an exponent-confusion error (using max instead of min in the factorization method), or a premature-stopping error (in the Euclidean algorithm) — cross-checking against a second method is a reliable way to catch any single method's mistake.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Compute GCD(60,72) using BOTH the prime-factorization method and the Euclidean algorithm, and confirm they give the same answer.

**CORRECT:** Prime factorization: $60=2^2\times3\times5$, $72=2^3\times3^2$. Shared: 2 (min(2,3)=2), 3 (min(1,2)=1). GCD$=2^2\times3=12$. Euclidean: $72=1\times60+12$ → (60,12); $60=5\times12+0$ → remainder 0, GCD=12. **Both methods agree: GCD(60,72)=12.**
→ "Correct — using two independent methods and confirming agreement is exactly the discipline that catches errors before they reach a final answer." → Proceed to A04.

**PARTIAL:** Student gets the Euclidean algorithm right (12) but the factorization method wrong (e.g. includes 5, which only appears in 60, getting GCD=60) — noticing the mismatch but unsure which is correct.
→ "When two methods disagree, trust neither blindly — recheck the SPECIFIC step that could be wrong. In the factorization method: does 72 have any factor of 5? $72=2^3\times3^2$ — no factor of 5 at all (min exponent with 60's factor of 5 is 0), so 5 contributes NOTHING to the GCD. Only 2 and 3 are shared. Recomputing: GCD$=2^2\times3=12$ — now matching the Euclidean algorithm's answer, confirming 12 is correct and the factorization method's error (including a non-shared prime) is now fixed."

**INCORRECT:** Student stops the Euclidean algorithm after the first step, reporting GCD=12... wait, actually check: reports "GCD=60" from confusing which number is the 'answer' at each step (MC-3).
→ "Track the algorithm's actual outputs at each step: $(72,60)\to(60,12)$ [remainder from 72÷60] $\to$ then $60\div12$: $60=5\times12+0$, remainder 0 — STOP here. The GCD is 12 (the divisor in the step that produced remainder 0), not 60 (which was just an intermediate value from an earlier step, before the algorithm finished)."

**NO_RESPONSE:** → "Factorization: 60=2²×3×5, 72=2³×3²; shared min: 2²×3=12. Euclidean: 72=1(60)+12; 60=5(12)+0; GCD=12. Both agree: 12."

---

### Teaching Action A04 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess correct method selection and execution, coprime recognition, and Euclidean-algorithm completion discipline under transfer

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Compute GCD(16, 24) via prime factorization.

*Solution:* $16=2^4$, $24=2^3\times3$. Shared: 2, min(4,3)=3. GCD$=2^3=8$.

**Problem 2:** Are 21 and 22 coprime? Justify.

*Solution:* $21=3\times7$, $22=2\times11$ — no shared prime factors. Coprime, GCD=1 (note: consecutive integers are always coprime, a useful general fact, though not required to answer this specific question).

**Problem 3:** Complete the Euclidean algorithm for GCD(150, 40), showing every step.

*Solution:* $150=3\times40+30$ → (40,30); $40=1\times30+10$ → (30,10); $30=3\times10+0$ → GCD=10.

**Problem 4:** A student computes GCD(2^3·3^2·5, 2^2·3^3·7) by taking the maximum exponent of each shared prime. What error is this, and what is the CORRECT GCD?

*Solution:* This is the GCD-LCM-EXPONENT-CONFUSION error — GCD requires the MINIMUM shared exponent, not the maximum. Shared primes: 2 (min(3,2)=2), 3 (min(2,3)=2); 5 and 7 are not shared. Correct GCD$=2^2\times3^2=4\times9=36$.

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** A baker has 180 chocolate chip cookies and 252 oatmeal cookies, and wants to package them into identical gift boxes, each box containing the SAME number of chocolate chip cookies and the SAME number of oatmeal cookies, using the LARGEST possible box size (i.e. as few boxes as possible) with no cookies left over.

(a) Explain, in one sentence, why this problem is asking for GCD(180,252), not LCM(180,252).
(b) Compute GCD(180,252) using the Euclidean algorithm, showing every step.
(c) A colleague argues: "Since 180 and 252 are both even and both divisible by common factors, and neither is prime, this situation is actually impossible to solve cleanly — you'd need them to be coprime or one of them prime for a clean box size to exist." Evaluate this claim using your answer to (b), and explain what it gets wrong about the relationship between GCD and primality/coprimality.

**Expected solution:**

(a) The LARGEST possible box size using ALL cookies with none left over corresponds to the LARGEST number that divides BOTH 180 and 252 evenly — exactly the definition of GCD (not LCM, which would instead answer "what is the smallest number of cookies that both counts divide into," a different, unrelated question here).

(b) $252=1\times180+72$ → (180,72); $180=2\times72+36$ → (72,36); $72=2\times36+0$ → **GCD=36**.

(c) The colleague's claim is **incorrect** — GCD(180,252)=36 exists perfectly well and gives a clean answer (36 boxes... more precisely, $180/36=5$ chocolate chip cookies and $252/36=7$ oatmeal cookies per box, with 36 total boxes), despite neither 180 nor 252 being prime, and despite them NOT being coprime (36≠1). The colleague has the relationship backwards: a LARGE GCD (like 36 here) means the numbers share SUBSTANTIAL common structure and CAN be divided cleanly into few, large boxes; primality of the original numbers is irrelevant to whether a GCD exists or is useful — every pair of positive integers has a well-defined GCD (computable via the Euclidean algorithm, as shown in (b)), regardless of whether either number is prime or whether the pair happens to be coprime. In fact, the LARGER the GCD, the MORE cleanly the packaging problem resolves (bigger, fewer boxes) — the opposite of the colleague's implied worry.

---

**[P55 — SCORE]**
Record transfer score S₂ (0 or 1) after P76.

Total score S = S₁ + S₂ (max 5).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR: 5/5 (⌈0.85 × 5⌉ = ⌈4.25⌉ = 5)

- S ≥ 5: MASTERY ACHIEVED → proceed to P74
- S = 4: NEAR MASTERY → attempt repair on missed items; re-gate at next session
- S ≤ 3: MASTERY NOT ACHIEVED → execute Protocol B

---

**[P55 — SCORE]**
Record mastery determination (ACHIEVED / NEAR / NOT ACHIEVED).

---

**[P74 — ROUTING DECISION]**

- MASTERY ACHIEVED → unlock math.arith.fraction-simplification and math.nt.bezout-identity; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.nt.gcd assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — GCD-LCM-EXPONENT-CONFUSION (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Taking the maximum shared exponent for GCD (or minimum for LCM) is GCD-LCM-EXPONENT-CONFUSION. GCD uses the MINIMUM shared exponent (the largest factor common to BOTH); LCM uses the MAXIMUM (the smallest multiple of BOTH)."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "For 2³×3 and 2²×3², compute GCD using the exponents you'd naturally combine."
- MC-1 response: takes max(3,2)=3 for prime 2 and max(1,2)=2 for prime 3, giving 2³×3²=72 (this is actually the LCM).

**[P64 — CONCEPTUAL SHIFT]**
"Ask which is SMALLER, hence common to both: for a number to divide BOTH originals, it can use AT MOST the SMALLER count of each prime available in either one — that's the MINIMUM, not maximum. Here: min(3,2)=2 for prime 2, min(1,2)=1 for prime 3, giving GCD$=2^2\times3=12$. The maximum-exponent version (72) is actually the correct LCM computation — a real, useful number, just not the one asked for here."

Practice: For $2^4\times5$ and $2^2\times5^3$, compute both GCD (min exponents) and LCM (max exponents), keeping the two answers clearly labeled and distinct.

---

### Repair Action B02 — COPRIME-REQUIRES-A-PRIME-NUMBER (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Believing coprimality requires one number to be prime is COPRIME-REQUIRES-A-PRIME-NUMBER. Coprimality only requires ZERO shared prime factors — two composite numbers built from entirely different primes are automatically coprime."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Are 14 and 15 coprime? Neither is prime."
- MC-2 response: "No, coprime numbers need at least one to be prime."

**[P64 — CONCEPTUAL SHIFT]**
"Factorize both: $14=2\times7$, $15=3\times5$ — completely different primes, no overlap at all. GCD(14,15)=1 — coprime, confirmed directly, with neither number being prime. The test for coprimality is entirely about SHARED prime factors (zero of them), never about whether either number is itself prime — two 'complicated' composite numbers can still have nothing in common, prime-factor-wise."

Practice: Determine whether 33 and 35 are coprime by factoring each (33=3×11, 35=5×7) and checking for shared primes.

---

### Repair Action B03 — EUCLIDEAN-ALGORITHM-WRONG-STOPPING-POINT (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Stopping the Euclidean algorithm before the remainder reaches exactly 0 is EUCLIDEAN-ALGORITHM-WRONG-STOPPING-POINT. The correct GCD is the LAST NONZERO remainder — the divisor in the specific step where the remainder finally becomes 0, not any earlier intermediate value."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "GCD(90,36): 90=2×36+18. What's the GCD?"
- MC-3 response: "18" (stopping after one step, without continuing).

**[P64 — CONCEPTUAL SHIFT]**
"One step isn't necessarily enough — continue: is 18 the FINAL nonzero remainder, or does the algorithm keep going? Next step: $36=2\times18+0$ — remainder IS 0 here, so the algorithm correctly terminates, and 18 (the divisor in THIS final step) is indeed the GCD. In this particular case the first guess happened to be right, but only because the SECOND step's remainder was exactly 0 — always verify by taking one more step and checking for a zero remainder before finalizing; had the second step produced a NONZERO remainder, the algorithm would need to continue further, and 18 would NOT have been the final answer."

Practice: Compute GCD(112, 42) via the Euclidean algorithm, explicitly stating which step produces the first zero remainder and confirming the GCD is read from THAT step, not an earlier one.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Recompute a fresh GCD via prime factorization, explicitly stating "minimum exponent" before computing |
| SR-2 | +3 days | Determine coprimality for a fresh pair of composite numbers by factoring and checking for shared primes |
| SR-3 | +7 days | Complete a fresh Euclidean algorithm computation, explicitly identifying the step that produces remainder 0 |
| SR-4 | +14 days | Reconstruct the cookie-packaging transfer probe's argument for why a large GCD signals MORE cleanly-resolvable packaging, not less |

Retrieval flag: if student confuses GCD's min-exponent rule with LCM's max-exponent rule (MC-1) or stops the Euclidean algorithm before reaching a zero remainder (MC-3), re-execute B01/B03 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1) | math.nt.divisibility | Supplies the "a divides b" relation this concept seeks the largest COMMON instance of |
| Requires (Tier-1, this session) | math.nt.prime-factorization | Supplies the unique factorization that the prime-factorization method for GCD directly operates on |
| Unlocks | math.arith.fraction-simplification | Simplifying a fraction to lowest terms is exactly dividing numerator and denominator by their GCD |
| Unlocks | math.nt.bezout-identity | Bézout's identity (GCD as an integer linear combination) is proved constructively using the Euclidean algorithm's steps, developed in this blueprint |

**GR-9:** cross_links: none in the KG for this concept; P76_mode = independence (the transfer probe applies GCD to a cookie-packaging scenario, a genuinely new applied context rather than a named cross-linked concept).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=5 → standard structure (3 main TAs + gate), reflecting the concept's three genuinely separate computational methods (listing, prime factorization, Euclidean algorithm) each warranting dedicated treatment
- bloom=apply → every checkpoint and the gate require executing a computational procedure, not merely stating a definition
- CPA_entry = C for a developing learner: exhaustive divisor listing (A01) grounds "GCD" in a directly verifiable, brute-force procedure before either faster method (which both require trusting an unfamiliar rule) is introduced

**Key teaching insight:** MC-1 (GCD/LCM exponent confusion) is this concept's highest-leverage misconception because the two rules are MIRROR IMAGES of each other applied to the identical input (the same two factorizations) — no external signal (like a wildly implausible magnitude) reliably catches the swap, unlike some other arithmetic errors. A02's Contrast 1 is deliberately built as a SINGLE example computing both GCD and LCM side by side specifically so the mirror-image structure itself becomes the memory aid ("smaller for GCD, bigger for LCM"), rather than presenting the two rules in separate, disconnected lessons.

**MC-3's completion discipline as a transferable habit:** The Euclidean algorithm's "stop only at remainder 0" rule is emphasized not just for this concept but as a template for iterative algorithms generally (a pattern recurring in later concepts like the extended Euclidean algorithm for Bézout's identity) — B03's repair deliberately frames the check as "take one more step and verify" rather than "memorize how many steps this specific problem needs," building a habit that generalizes to problems of any length.

**Sequencing note:** No cross-link concept exists yet for math.nt.gcd; the P76 transfer probe instead uses a cookie-packaging scenario specifically because "neither number is prime, and they're not coprime" is exactly the surface feature a residual MC-2/GCD-conflation might flag as suspicious — the probe's part (c) directly confronts and corrects this by showing a large, useful GCD emerging from two ordinary composite numbers.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.nt.gcd ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.nt.divisibility ✓, math.nt.prime-factorization ✓ | PASS |
| V-3 | CPA entry = C for developing difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=apply → P07 recommended | Computational method-execution tasks throughout A01-A04 ✓ | PASS |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02, A03 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A04) is terminal | A04=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A04; A04 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A04 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | no cross_links → P76=independence ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=5/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.85×5⌉=⌈4.25⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1 FOUNDATIONAL, MC-2, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=5, three methods → standard (3 main TAs + gate); A01+A02+A03+A04 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | Cookie-packaging scenario; large-GCD-means-cleaner-not-messier argument ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |
