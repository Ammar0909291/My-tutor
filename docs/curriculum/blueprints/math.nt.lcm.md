# Blueprint: math.nt.lcm

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.nt.lcm |
| name | Least Common Multiple (LCM) |
| Domain | math.nt |
| Difficulty | developing |
| Bloom level | apply |
| Estimated hours | 4 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.nt.prime-factorization, math.nt.gcd |
| Cross-links | — |
| Unlocks | math.arith.fraction-addition |

## Component 1 — Learning Objective
The student computes the LCM of two or more positive integers using the prime-factorisation method (take the highest power of each prime that appears); applies the relationship lcm(a,b)×gcd(a,b)=a×b to compute LCM from a known GCD; verifies LCM as the smallest positive integer divisible by every given number; and uses LCM to find a common denominator when adding fractions with unlike denominators.

## Component 2 — CPA Entry Stage
**C — Concrete** (list multiples of 4 and 6 on two colour-coded strips until the first shared position — that position is the LCM = 12; compare with naively multiplying 4×6=24 to see why LCM ≤ product)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | LCM-IS-ALWAYS-THE-PRODUCT | Student computes lcm(a,b)=a×b universally, never applying the GCD relationship; writes lcm(6,4)=24 instead of 12 | Type 1 — overgeneralization (the product formula is correct for coprime pairs; the student extends it to all pairs without checking) |
| MC-2 | TAKE-MIN-EXPONENTS-FOR-LCM | Student applies the GCD rule (minimum exponent per prime) to LCM as well — "I take the smallest power of each prime for both operations" | Type 1 — overgeneralization (the min-for-GCD rule is recent learning; student symmetrises it without checking which operation needs min vs max) |
| MC-3 | LCM-CAN-BE-LESS-THAN-EITHER-INPUT | Student believes LCM might be smaller than both a and b in some cases because "least" signals a small value | Type 3 — language contamination ("least" in LCM means smallest among all common multiples, not necessarily small in absolute terms; LCM ≥ max(a,b) always) |

## Component 4 — Session TA Cap
**Cap = 6** (hrs = 4 → cap 6)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of LCM:**

| Representation | Content |
|---|---|
| Common-multiple lists | Multiples of 4: 4,8,12,16,20,24,… ; multiples of 6: 6,12,18,24,… ; first shared value = LCM = 12 |
| Venn diagram of prime factors | 4=2²; 6=2×3; left circle {2²}, overlap {2}, right circle {3}; LCM = product of ALL circles = 2²×3=12; GCD = product of overlap only = 2 |
| Prime-factorisation table | Write each prime that appears; take max exponent; multiply: lcm(12,18)=2²×3²=36 |
| Formula link to GCD | lcm(a,b)=ab/gcd(a,b); since gcd(4,6)=2, lcm=24/2=12 |

**GCD vs LCM exponent rule:**
| Operation | Exponent rule | Reason |
|---|---|---|
| GCD | min(a_p, b_p) for each prime p | GCD must divide both — take common part |
| LCM | max(a_p, b_p) for each prime p | LCM must be divisible by both — include all parts |

Example: lcm(2³×3, 2×3²×5) = 2³×3²×5 = 360; gcd = 2×3 = 6; check: 360×6 = 2160 = (24)(90) ✓

**P49 checkpoint:**
- CORRECT → "LCM = product of each prime to its MAXIMUM power across all inputs. lcm(a,b)×gcd(a,b)=a×b. LCM ≥ max(a,b); equal iff one divides the other." → A02
- PARTIAL (uses product formula for all pairs) → "lcm(6,4)=6×4=24 would be correct only if gcd(6,4)=1. Since gcd(6,4)=2, lcm=24/2=12. List the multiples: 6,12,… and 4,8,12,… — 12 appears first, confirming LCM=12, not 24." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "List the first five multiples of 6 and the first five multiples of 8. Which is the first number that appears in both lists?" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**When is lcm(a,b) = a×b?**

**Pattern:** lcm(a,b)=a×b if and only if gcd(a,b)=1 (a and b are coprime). Any shared prime factor reduces the LCM below the product.

| Pair | gcd | lcm | lcm = product? |
|---|---|---|---|
| (4,9) | 1 | 36 | Yes (4×9=36) |
| (6,10) | 2 | 30 | No (6×10=60, LCM=30=60/2) |
| (12,18) | 6 | 36 | No (12×18=216, LCM=36=216/6) |
| (7,11) | 1 | 77 | Yes |

**LCM of three or more numbers:** compute pairwise — lcm(a,b,c)=lcm(lcm(a,b),c). Example: lcm(4,6,10)=lcm(12,10)=60.

**Application to fractions:** to add 1/4+1/6, find lcm(4,6)=12; rewrite 3/12+2/12=5/12. Choosing the LCM as the common denominator gives the simplest form directly.

**Divisibility tower:** LCM is the least upper bound in the divisibility partial order; GCD is the greatest lower bound. For any c divisible by both a and b, lcm(a,b)|c.

**P49 checkpoint:**
- CORRECT → "lcm=product only when gcd=1. Otherwise lcm(a,b)=ab/gcd(a,b). LCM for three inputs: iterate pairwise. LCM = smallest denominator for fraction addition." → A03
- PARTIAL (correct method but cannot apply to fractions) → "To add 1/4+1/6: the common denominator must be divisible by 4 AND by 6 — that means it must be a common multiple of 4 and 6. The LEAST common multiple is the SMALLEST valid denominator, keeping numbers compact. lcm(4,6)=12, so 1/4=3/12 and 1/6=2/12, giving sum 5/12." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "Is lcm(4,9) equal to 4×9? What about lcm(4,6)? Why the difference?" → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-2 gate
**Max-vs-min gate:**

**Gate question (MC-2):** "A student computes gcd by taking the minimum exponent for each prime, then uses the same rule for LCM. What is wrong?"

LCM requires the MAXIMUM exponent, not minimum. Taking 12=2²×3 and 18=2×3²: the student would compute 2^min(2,1)×3^min(1,2)=2×3=6 — which is the GCD, not the LCM. The LCM is 2^max(2,1)×3^max(1,2)=4×9=36. The two operations are complements: GCD takes the overlap (min), LCM takes the union (max).

**P49 checkpoint:**
- CORRECT → "GCD = minimum exponent (overlap). LCM = maximum exponent (union). They're complementary: gcd×lcm=product." → Gate (P91)
- PARTIAL (knows the rule but confuses direction) → "Make a table: prime 2 appears with exponent 2 in 12 and exponent 1 in 18. For GCD take min(2,1)=1 → factor of 2¹. For LCM take max(2,1)=2 → factor of 2². Opposite operations, opposite results." → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "Compute gcd(12,18) using the exponent method. Now compute lcm(12,18). Which exponent operation did you use each time?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 LCM-IS-ALWAYS-THE-PRODUCT):**
Step 1 — "lcm(a,b)=a×b is only valid when gcd(a,b)=1. For lcm(6,4): gcd(6,4)=2 because 2 divides both. That shared factor of 2 means we don't need to include it twice in the LCM. lcm(6,4)=6×4/gcd(6,4)=24/2=12." Step 2 — Verify by listing: multiples of 6 = {6,12,18,…}, multiples of 4 = {4,8,12,…}. First shared value = 12, not 24. Step 3 — "24 IS a common multiple of 6 and 4, but it's not the LEAST. LCM always means the smallest positive common multiple, and shared prime factors reduce it below the product."

**TB-R02 (MC-3 LCM-CAN-BE-LESS-THAN-EITHER-INPUT):**
Step 1 — "A multiple of n is always ≥ n (for positive n). So ANY common multiple of a and b is at least as large as max(a,b). Since LCM is itself a multiple of both a and b, LCM ≥ max(a,b) always." Step 2 — Special case: if a|b, then lcm(a,b)=b. This is the SMALLEST possible LCM (when one divides the other), and it equals the larger input. Step 3 — "'Least' in LCM means least among all common multiples — it's the bottom of an infinite ascending list {lcm, 2·lcm, 3·lcm,…}. Least does not mean small."

**TB-R03 (MC-2 TAKE-MIN-EXPONENTS-FOR-LCM):**
Step 1 — "GCD is the GREATEST number dividing both — it needs every prime that's common to both, but only up to the lesser power (min). LCM is the LEAST number both divide INTO — it needs every prime appearing in either, up to the greater power (max), so nothing is left out." Step 2 — Venn analogy: GCD = intersection (overlap only); LCM = union (everything from both sides). Step 3 — Verify: gcd(12,18)=2¹×3¹=6; lcm(12,18)=2²×3²=36; check: 6×36=216=12×18 ✓

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Compute lcm(24,36), lcm(7,11), lcm(8,12,18) using the prime-factorisation method. For each, verify lcm×gcd = product (for the two-number cases).
2. A traffic light cycles every 40 seconds; a second light cycles every 60 seconds. They are both green at time 0. After how many seconds will both be green simultaneously again? (What mathematical concept gives the answer?)
3. Simplify the sum 5/12 + 7/18 by finding the LCM of the denominators. Show all steps. Why does using the LCM give a simpler result than using any other common denominator?
4. Prove that for any positive integers a and b, lcm(a,b)=a×b if and only if gcd(a,b)=1.

**P55 — Reflect & Consolidate:** "LCM = product of each prime to its MAX power across inputs. lcm(a,b)×gcd(a,b)=a×b for all positive integers. LCM ≥ max(a,b); equals one input iff that input divides the other. LCM is the smallest valid common denominator for fraction addition."

**P76 — Transfer Probe (Independence mode):**
Three friends exercise together on day 1. Alice exercises every 3 days, Bob every 4 days, Charlie every 6 days. (a) How many days until all three exercise together again? (b) In 360 days, how many times do all three exercise together (including day 1)? (c) Two positive integers have GCD=6 and LCM=60. List all possible pairs (a,b) with a≤b. (d) Is it possible for two numbers to have GCD=6 and LCM=50? Explain why or why not.

**P55 — Reflect & Consolidate:** "lcm(a,b,c)=lcm(lcm(a,b),c). The pair-with-given-GCD-and-LCM problem is constrained by gcd×lcm=a×b — any pair (a,b) satisfying this can be found by factoring lcm/gcd and distributing prime powers. GCD|LCM is a necessary condition; GCD∤LCM means no such pair exists (as in the GCD=6, LCM=50 case, since 6∤50)."

**P75 — Mastery Assessment:**
"A choir has sections of 24, 36, and 48 singers. The director wants to split the whole choir into equal groups, each group containing the same number from each section. (a) What is the largest group size possible? (b) The director also wants to arrange all singers from all three sections into rows of equal size (combining sections). What is the smallest number of rows possible if each singer must stand in a row with others of their section? (c) Two bells ring at intervals of 15 and 21 minutes. If they ring together at noon, when do they next ring together? At how many times between noon and midnight do they ring together?"

**P55 — Reflect & Consolidate:** "GCD solves 'split into equal groups' (part a: gcd(24,36,48)=12). LCM solves 'when do periodic events coincide' (bells: lcm(15,21)=105 minutes). The row problem requires more careful analysis: keeping sections separate with equal-size rows requires the row size to divide each section — so it's the GCD of the section sizes."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.nt.lcm complete
- Score 3/5 → REVIEW the lcm×gcd=product relationship; replay A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.nt.gcd or math.nt.prime-factorization; reassign

**P78 — Completion:** LCM certified. Student computes LCM using prime factorisation (max exponents), the GCD formula, and common-multiple enumeration; applies LCM to fraction addition and periodic-coincidence problems; explains why LCM = product only for coprime inputs.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Scheduling coincidences; pair-with-given-GCD-and-LCM; necessary conditions on GCD|LCM
Skill tested: Multi-number LCM; reverse problem (find pair from GCD and LCM); existence check via divisibility

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
