# Blueprint: math.nt.divisibility-rules

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.nt.divisibility-rules |
| name | Divisibility Rules |
| Domain | math.nt |
| Difficulty | developing |
| Bloom level | apply |
| Estimated hours | 4 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.nt.divisibility |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student applies divisibility rules for 2, 3, 4, 5, 6, 8, 9, 10, and 11 to determine whether a number is divisible by each without performing the division; derives the rule for 3 (and 9) from the fact that 10≡1 (mod 3) (and mod 9), showing that the digit sum has the same remainder as the original number; applies multiple rules in combination to factor numbers and identify composite numbers quickly; and states when a rule works for a product (e.g., divisible by 6 iff divisible by both 2 and 3).

## Component 2 — CPA Entry Stage
**C — Concrete** (add the digits of 123: 1+2+3=6; 6 is divisible by 3, so 123 is divisible by 3; verify: 123÷3=41 — before any place-value explanation)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | DIGIT-SUM-TESTS-DIVISIBILITY-BY-7 | Student extends the digit sum rule to 7 (and 11), believing that if the digit sum is divisible by 7 the number is divisible by 7 — does not recognise that 10≢1 (mod 7) so the digit sum rule breaks | Type 1 — overgeneralization (the digit sum rule works beautifully for 3 and 9; students apply it to every divisor without checking the required congruence condition 10≡1 mod d) |
| MC-2 | DIVISIBLE-BY-6-IFF-DIVISIBLE-BY-2-AND-3 | Student applies the combination rule (div by 6 iff by 2 and 3) to coprime factors but then extends it incorrectly to non-coprime pairs (e.g., thinks div by 4 iff div by 2 and 2 — i.e., just div by 2) | Type 5 — instruction-induced (the rule "div by ab iff div by a and b" is stated without the coprimality condition gcd(a,b)=1; students try to apply it for a=b=2 to get div by 4) |
| MC-3 | LAST-DIGIT-RULE-WORKS-FOR-ALL-ODD-DIVISORS | Student checks only the last digit for divisibility by 5 and generalises: "only the last digit matters for all divisors" — not recognising that this works for 2, 4, 5, 8 (powers of 2 or 5, which divide 10^k), but not for 3, 7, 9, 11 | Type 1 — overgeneralization (the last-digit rule for 2 and 5 is taught first and is very intuitive; the extension to other divisors fails because 10≢0 mod 3 or mod 7) |

## Component 4 — Session TA Cap
**Cap = 6** (hrs = 4 → cap 6)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of divisibility rules:**

| Representation | Content |
|---|---|
| Modular arithmetic derivation | 10≡1 (mod 3) and (mod 9), so 10^k≡1^k=1, thus n=Σdᵢ·10^i ≡ Σdᵢ (mod 3) — digit sum has same residue |
| Rule table | 2: last digit even; 3: digit sum div by 3; 4: last 2 digits div by 4; 5: last digit 0 or 5; 6: by 2 and 3; 8: last 3 digits div by 8; 9: digit sum div by 9; 10: last digit 0; 11: alternating digit sum div by 11 |
| Why last digits for powers of 2 and 5 | 4=2² divides 100=10²; so n mod 4 depends only on last 2 digits. 8=2³ divides 1000=10³; so n mod 8 from last 3 digits |
| Combination rule | Divisible by ab where gcd(a,b)=1 iff divisible by both a and b. Works: 6=2×3, 15=3×5, 10=2×5. Fails: not for 4 (since 4=2×2, gcd=2≠1) |

**Derivation of the rule for 3:**
10 = 9+1 ≡ 1 (mod 3)
100 = 99+1 ≡ 1 (mod 3)
10^k ≡ 1 (mod 3) for all k≥0
n = d₀ + 10d₁ + 100d₂ + … ≡ d₀ + d₁ + d₂ + … (mod 3)

So n is divisible by 3 iff its digit sum is divisible by 3. Same argument with mod 9 (since 10≡1 mod 9) gives the rule for 9.

**Derivation of the rule for 11:**
10 ≡ −1 (mod 11)
100 ≡ 1 (mod 11)
10^k ≡ (−1)^k (mod 11)
n = d₀ + 10d₁ + 100d₂ + … ≡ d₀ − d₁ + d₂ − … (mod 11)

Alternating digit sum (from the right): n divisible by 11 iff d₀−d₁+d₂−… ≡ 0 (mod 11).
Example: 253: 3−5+2=0. 253÷11=23. ✓

**P49 checkpoint:**
- CORRECT → "Rules derived from 10^k mod d. Digit sum for 3,9 (since 10≡1). Alternating sum for 11 (since 10≡−1). Last digits for 2,4,5,8 (powers divide 10^k). Combination rule only for coprime factors." → A02
- PARTIAL (knows the rules but not the derivation) → "For the rule of 3: n=d₀+10d₁+100d₂+…. Now 10=9+1≡1 (mod 3), and 100=99+1≡1 (mod 3). Every power of 10 is ≡1 (mod 3). So n≡d₀×1+d₁×1+d₂×1+…=digit sum (mod 3). The digit sum has exactly the same remainder when divided by 3 as n itself." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Is 5,472 divisible by 3? By 4? By 6? By 8? Show your work using divisibility rules, not long division." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Application gallery:**

**Quick factoring via rules:**
n=7,560: Div by 2 (last digit 0). Div by 3 (digit sum 7+5+6+0=18, div by 3). Div by 4 (last 2 digits 60÷4=15). Div by 5 (last digit 0). Div by 6 (div by 2 and 3). Div by 7? 7560÷7=1080 ✓. Div by 8 (last 3 digits 560÷8=70). Div by 9 (digit sum 18÷9=2). Div by 10 (last digit 0). So 7560=2³×3³×5×7.

**Rule for 7 (no simple version):**
10≡3 (mod 7), 100≡2 (mod 7), 1000≡6 (mod 7), 10000≡4 (mod 7), 100000≡5 (mod 7), 1000000≡1 (mod 7). The pattern repeats with period 6 — no simple digit sum or last-digit rule exists.

**Large number test example:** Is 3,456,789 divisible by 11?
Alternating sum (right to left): 9−8+7−6+5−4+3 = 6. 6 is not divisible by 11. → NO.

Is 3,456,798 divisible by 11? Alternating sum: 8−9+7−6+5−4+3 = 4. → NO.
Is 3,456,897 divisible by 11? Alternating sum: 7−9+8−6+5−4+3 = 4. → NO.
Try 2,376: 6−7+3−2=0. 2376÷11=216. ✓

**Combination rule (coprime factors only):**
- Div by 6 iff by 2 and 3: ✓ (gcd(2,3)=1)
- Div by 4 iff by 2: ✗ (4=2², gcd(2,2)=2≠1; 6 is div by 2 but not by 4)
- Div by 12 iff by 3 and 4: ✓ (gcd(3,4)=1; more useful than 3 and 2 since it captures div by 4)

**Pattern:** Divisibility rules are shortcuts encoding modular arithmetic. The key congruence is 10^k mod d — when this is constant (1 for d=3,9 or −1 for d=11), simple digit operations work. When it cycles with period >1 (for d=7) or equals 0 (for d=2,5), other rules apply.

**P49 checkpoint:**
- CORRECT → "Digit sum for 3,9 (10≡1 mod 3,9). Alternating sum for 11 (10≡−1 mod 11). Last k digits for 2^k and 5 (10^k divisible by 2^k and 5^k). No simple rule for 7. Combination: gcd(a,b)=1 required." → A03
- PARTIAL (knows rules but misapplies combination rule) → "The combination rule divisible by a AND b implies divisible by ab works ONLY when gcd(a,b)=1. Proof: if a|n and b|n and gcd(a,b)=1, then ab|n (by Bézout/CRT). If gcd(a,b)>1, the rule fails: 4|12 and 6|12 but 24∤12. Useful combinations: 6 (2×3), 10 (2×5), 12 (3×4), 15 (3×5), 35 (5×7)." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "Without performing division, determine all single-digit divisors of 1,980. Show your work using divisibility rules." → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-1 gate
**Digit-sum-for-7 gate:**

**Gate question (MC-1):** "A student checks whether 7 divides 847 by computing the digit sum 8+4+7=19, and 19 is not divisible by 7, so they conclude 847 is not divisible by 7. Are they right?"

The conclusion happens to be correct (847=7×121, wait — let me verify: 7×121=847. Yes it IS divisible by 7!) but for the wrong reason. The digit sum 8+4+7=19 is not divisible by 7 (19÷7≈2.71), yet 847÷7=121, so 847 IS divisible by 7. The digit sum rule does NOT apply to 7. The correct way to check: 847÷7=121. Or use the rule: 847 → 84−2×7 = 84−14 = 70, which is divisible by 7 ✓ (there is a more complex doubling rule for 7, but it's not the digit sum).

**P49 checkpoint:**
- CORRECT → "Digit sum rule only works when 10≡1 (mod d), i.e., for d=3 and d=9. For d=7: 10≡3 (mod 7), not 1 — so digit sums have wrong weights. Must use division or specialised tests for 7." → Gate (P91)
- PARTIAL (knows the rule fails for 7 but not why) → "The digit sum rule is based on the fact that every power of 10 has the same remainder (mod d). For d=3: 10≡1, so 10^k≡1 for all k — hence digit sum works. For d=7: 10≡3, 100≡2, 1000≡6, 10000≡4, 10⁵≡5, 10⁶≡1 (period 6). The remainders are 3,2,6,4,5,1,3,2,6,… — not constant. No single digit-sum rule captures all these varying weights." → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "Compute 10 mod 7, 100 mod 7, 1000 mod 7. Are they all equal? What does this tell you about whether a digit sum rule can work for divisibility by 7?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-3 LAST-DIGIT-RULE-WORKS-FOR-ALL-ODD-DIVISORS):**
Step 1 — "The last digit of n equals n mod 10. Knowing n mod 10 helps with divisibility by d only if d divides 10. Since 10=2×5, the last digit determines divisibility by 2 and 5. For 4: we need n mod 4. Since 10²=100=25×4, the last two digits determine n mod 4. In general, for any d that divides a power of 10, the last k digits (where 10^k is divisible by d) give the answer." Step 2 — Why last digits fail for 3: n=34 and n=37 have different last digits (4 and 7) but the same remainder mod 3 (1 and 1). Conversely, 33 and 36 have different last digits (3 and 6) but both are divisible by 3. The last digit carries no information about mod 3. Step 3 — "The pattern: divisibility rules based on last digits work when d has only 2 and 5 as prime factors (i.e., d divides 10^k for some k). Divisibility rules based on digit sums work when 10≡1 (mod d). Alternating sums work when 10≡−1 (mod d). Other divisors (7, 13, 17, …) require more complex rules or direct division."

**TB-R02 (MC-2 DIVISIBLE-BY-6-IFF-DIVISIBLE-BY-2-AND-3):**
Step 1 — "The rule 'divisible by ab iff by a and b' requires gcd(a,b)=1 (a and b coprime). Proof of the valid direction: if d|n and e|n, and gcd(d,e)=1, then d×e|n. This uses Bézout's identity: 1=sd+te, so n=n×1=n×sd+n×te; since d|n, d|(n×te); since e|n, e|(n×sd); combining gives de|n." Step 2 — Why gcd(a,b)=1 is needed: try a=b=2. Then ab=4. Being divisible by 2 AND 2 just means divisible by 2 — it does NOT guarantee divisibility by 4. Example: 6 is divisible by 2 (twice) but 6÷4=1.5 — not an integer. Step 3 — "Useful coprime pairs for combination: (2,3)→6; (2,5)→10; (3,4)→12 (since gcd(3,4)=1); (3,5)→15; (4,5)→20; (4,9)→36; (5,9)→45. Dangerous pairs (gcd>1): (2,4)→8? NO — need to check last 3 digits for 8 independently."

**TB-R03 (MC-1 DIGIT-SUM-TESTS-DIVISIBILITY-BY-7):**
Step 1 — "The derivation of the digit sum rule for 3: since 10≡1 (mod 3), each digit dᵢ contributes dᵢ×10^i ≡ dᵢ×1=dᵢ (mod 3). For this to give a 'digit sum' rule, ALL powers of 10 must be ≡1 (mod d). For d=7: 10^1≡3, 10^2≡2, 10^3≡6 (mod 7) — the digits have different weights (3,2,6,4,5,1,...). A 'weighted digit sum' rule for 7 exists but uses these six different weights." Step 2 — The 'remove and double' rule for 7: take the last digit, double it, subtract from the remaining number. Repeat. If the result is divisible by 7, so is the original. Example: 847 → 84−2×7=70 → 7−2×0=7 → 7÷7=1. ✓. Step 3 — "Memorise which divisors have simple rules: 2,3,4,5,6,8,9,10,11,12. For 7: no short rule worth memorising — just divide, or use the doubling trick. For 13,17,19: similarly complex. This is because 7,13,17,19 have order >2 as units mod 10, preventing simple digit patterns."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Without performing division, determine which of the following numbers are divisible by each of 2,3,4,5,6,8,9,10,11: (a) 7,920; (b) 5,148; (c) 3,003; (d) 14,400.
2. Derive the divisibility rule for 4 using the fact that 100≡0 (mod 4). Show why only the last two digits matter. Verify using 5,312 and 5,313.
3. A number n=abc (a three-digit number in base 10) is divisible by both 3 and 4. Write down all conditions on a,b,c. How many three-digit numbers are divisible by 12? (Use divisibility by 3 and 4, with gcd(3,4)=1.)
4. Derive the divisibility rule for 11 from the congruence 10≡−1 (mod 11). Apply it to check whether 8,953,428 is divisible by 11. Verify your answer by dividing.

**P55 — Reflect & Consolidate:** "Divisibility rules encode modular arithmetic. Digit sum: works when 10≡1 (mod d) → rules for 3 and 9. Alternating sum: 10≡−1 (mod 11) → rule for 11. Last k digits: works when d|10^k → rules for 2,4,5,8,10. Combination: coprime factors only."

**P76 — Transfer Probe (Independence mode):**
Divisibility rules extend to bases other than 10. (a) In base 8 (octal), what is the analog of the digit-sum rule for 3? (Hint: 8≡−1 (mod 3).) (b) In base 16 (hexadecimal), derive the rule for divisibility by 15 and by 5. (Hint: 16≡1 (mod 5).) (c) A computer represents integers in base 2. Derive divisibility rules for 3 and 7 in binary. (Hint: 2≡−1 (mod 3), 2³=8≡1 (mod 7).) (d) A programmer wants to quickly check if a 32-bit integer n is divisible by 5 without division (CPU division is slow). Using the base-2 rule from (c), outline an algorithm using only bitwise operations and addition.

**P55 — Reflect & Consolidate:** "Divisibility rules are base-dependent. In base b: digit sum works when b≡1 (mod d); alternating sum when b≡−1 (mod d); last-k-digit rules when d|b^k. In binary: alternating sum for 3 (since 2≡−1 mod 3), 3-bit sum for 7 (since 2³=8≡1 mod 7). These translate to efficient bitwise algorithms — important in embedded systems and hardware design."

**P75 — Mastery Assessment:**
"A customs form asks for a 13-digit ISBN barcode number to be self-checking: the weighted sum d₁×1+d₂×3+d₃×1+…+d₁₃×1 must be divisible by 10 (alternating weights 1 and 3). (a) Is this rule a divisibility rule for 10? Explain. (b) Given digits d₁…d₁₂=9780306406157 (dropping last digit), compute d₁₃ such that the check sum is divisible by 10. (c) If one digit is changed by ±1, does the check always detect the error? Prove it. (d) If two adjacent digits are transposed, does the check always detect the error? Compare with a simple digit-sum check for ISBN."

**P55 — Reflect & Consolidate:** "Check-digit schemes (ISBN, credit cards, UPC) are divisibility rules in disguise — a weighted digit sum modulo a small number. The choice of weights and modulus determines which errors are detectable. The ISBN-13 alternating 1/3 weight scheme over mod 10 detects all single-digit errors (since neither weight is 0 mod 10) but misses some transpositions (unlike ISBN-10's weights 1,2,…,10)."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.nt.divisibility-rules complete
- Score 3/5 → REVIEW derivation from 10^k mod d and the combination rule; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.nt.divisibility; reassign

**P78 — Completion:** Divisibility rules certified. Student applies rules for 2,3,4,5,6,8,9,10,11; derives each rule from the relevant congruence of powers of 10; uses the combination rule correctly for coprime factors; and explains why no simple digit rule exists for 7.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Divisibility rules in other bases (binary, hex, octal); check-digit schemes
Skill tested: Derive base-dependent rules; generalise to non-decimal bases; connect to error-detection codes

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
