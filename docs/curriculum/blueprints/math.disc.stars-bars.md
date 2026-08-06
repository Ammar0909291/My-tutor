# Blueprint: math.disc.stars-bars

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.disc.stars-bars |
| name | Stars and Bars |
| Domain | math.disc |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 3 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.disc.combinations |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student applies the stars-and-bars technique to count the number of ways to distribute n identical objects among k distinct bins: C(n+k−1, k−1) for unrestricted distributions; C(n−k+k−1, k−1) = C(n−1, k−1) when each bin has at least one object; and handles upper-bound restrictions using inclusion-exclusion layered on top; translates word problems (integer solutions to equations, distributing coins, filling orders) into the stars-and-bars framework by identifying the "stars" and "bars."

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw 5 stars and 2 bars arranged in a row: ★★|★|★★ representing 2 objects in bin 1, 1 in bin 2, 2 in bin 3; show all three arrangements for n=3, k=2: ★★★| (3,0), ★★|★ (2,1), ★|★★ (1,2), |★★★ (0,3); annotate: "n stars + (k−1) bars in a row: choose positions for the bars → C(n+k−1, k−1) arrangements")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | STARS-BARS-FOR-DISTINCT-OBJECTS | Student applies C(n+k−1, k−1) when distributing DISTINCT (not identical) objects; forgets that stars-and-bars requires the objects to be INDISTINGUISHABLE (identical); for distinct objects, each distribution is a function from n objects to k bins, giving kⁿ arrangements | Type 5 — instruction-induced (stars-and-bars is taught immediately after permutations/combinations; the "distributing objects" framing sounds similar; students don't register that the formula changes fundamentally based on whether objects are identical or distinct) |
| MC-2 | AT-LEAST-ONE-MEANS-REPLACE-n-BY-n+1 | Student handles the "each bin has ≥1 object" constraint by adding 1 to n instead of subtracting 1 from n; uses C(n+k, k−1) instead of C(n−1, k−1) | Type 4 — notation-induced (the constraint "each bin gets at least 1" is implemented by substituting yᵢ = xᵢ − 1 → Σyᵢ = n − k; students manipulate n − k → C((n−k)+k−1, k−1) = C(n−1, k−1), but routinely make sign errors because the algebra requires careful tracking of the substitution direction) |
| MC-3 | BARS-COUNT-EQUALS-BINS-COUNT | Student uses k bars instead of k−1 bars when setting up the formula; derives C(n+k, k) or C(n+k, n) instead of C(n+k−1, k−1) | Type 4 — notation-induced (for k bins, there are k−1 dividers — one between each adjacent pair of bins; k bins require k−1 dividers, not k; students add bars equal to the bin count rather than the bin-gap count, an off-by-one error that seems counter-intuitive until the one-row arrangement is visualised: [bin1 | bin2 | … | bink] has k−1 bars separating k regions) |

## Component 4 — Session TA Cap
**Cap = 5** (hrs = 3 → cap 5)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Stars-and-bars derivation:**

**Problem:** Count the number of ways to distribute n identical objects into k distinct bins (bins can be empty).

**Encoding:** represent each distribution as a row of n stars ★ and k−1 bars |. The bars create k sections (one per bin); the count of stars in section i is the number of objects in bin i. Example: n=5, k=3: ★★|★|★★ = (2,1,2).

**Total positions:** n stars + (k−1) bars = n+k−1 symbols. Choosing which k−1 positions are bars (the rest are stars):

**C(n+k−1, k−1)** distributions. Equivalently, C(n+k−1, n) (choose star positions).

**Integer solution interpretation:** this also counts the number of non-negative integer solutions to x₁+x₂+⋯+xₖ=n. Setting xᵢ = count in bin i, each solution corresponds to one arrangement.

**Restriction: each bin has at least 1 object.**
Substitute yᵢ = xᵢ − 1 ≥ 0. Then Σyᵢ = n − k. Stars-and-bars on the yᵢ with total n−k:

**C((n−k)+k−1, k−1) = C(n−1, k−1)** solutions (valid only when n ≥ k).

**Worked examples:**
(a) Distribute 7 identical cookies among 4 children (any number per child): C(7+3,3) = C(10,3) = 120.
(b) Same, but each child gets at least 1: C(7−1,3) = C(6,3) = 20.
(c) Integer solutions to x₁+x₂+x₃=10, xᵢ≥0: C(10+2,2) = C(12,2) = 66.

**P49 checkpoint:**
- CORRECT → "C(n+k−1,k−1) for identical objects in k bins (0 or more each). C(n−1,k−1) for at-least-1. Identical objects: stars-and-bars. Distinct objects: kⁿ or k! × …" → A02
- PARTIAL (MC-3: uses k bars) → "For k bins, there are k−1 DIVIDERS — draw a single row with k sections: [bin₁ | bin₂ | bin₃] uses 2 bars for 3 bins. In general, k bins need k−1 bars between adjacent bins. The formula is C(n+k−1, k−1), NOT C(n+k, k). Draw it: for n=3, k=2: total symbols = 3+1=4; arrange 1 bar among 4 positions: C(4,1)=4 ways. Check directly: (0,3),(1,2),(2,1),(3,0) — exactly 4. ✓" → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Count solutions to a+b+c+d=8, a,b,c,d≥0: n=8, k=4 bins. C(8+3,3)=C(11,3)=165. Now with all ≥1: substitute aᵢ=bᵢ+1, Σbᵢ=4, C(4+3,3)=C(7,3)=35." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Upper-bound restrictions and advanced variations:**

**Upper-bound restriction: each bin has at most u objects.**
Use inclusion-exclusion on top of stars-and-bars. Let Aᵢ = set of distributions where bin i has ≥ u+1 objects. Then |A₁∪…∪Aₖ| is subtracted from the unrestricted count.

**Formula via inclusion-exclusion:**
Valid distributions = C(n+k−1,k−1) − C(k,1)·C(n−(u+1)+k−1,k−1) + C(k,2)·C(n−2(u+1)+k−1,k−1) − ⋯
(stopping when n−j(u+1) < 0).

**Example:** Distribute n=10 identical candies among k=3 bins, each bin ≤ 4 candies.
Unrestricted: C(12,2)=66. Each Aᵢ (one bin ≥5): C(7,2)=21. Each Aᵢ∩Aⱼ (two bins ≥5, total ≥10, remaining ≤0): only n−10=0 → C(2,2)=1 each. Pairs: C(3,2)·1=3. Triple intersection: n−15<0 → 0.
Valid = 66 − 3·21 + 3·1 = 66 − 63 + 3 = 6.

**Multiset coefficient notation:** C(n+k−1, n) = ⟨⟨k/n⟩⟩ is sometimes written as the "multiset coefficient" — the number of multisets of size n from a k-element universe (bins = element types, stars = selections).

**P49 checkpoint:**
- CORRECT → "Upper bound: inclusion-exclusion on top. Each Aᵢ (bin≥u+1): substitute yᵢ=xᵢ−(u+1), apply stars-and-bars. Sum alternates signs. Multiset coefficient = C(n+k−1,n)." → Gate (P91)
- PARTIAL (MC-1: stars-bars for distinct objects) → "Stars-and-bars REQUIRES the objects to be IDENTICAL (interchangeable). If the objects are DISTINCT (labelled), each distribution is a FUNCTION from the set of n objects to the set of k bins. Number of such functions = kⁿ. Example: distributing 3 distinct coins into 4 piggy banks: 4³=64 ways. Distributing 3 IDENTICAL coins into 4 banks: C(3+3,3)=C(6,3)=20 ways. The problem statement must specify identical or distinct." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "How many ways to write 10 as an ordered sum of 4 non-negative integers? Same as distributing 10 into 4 bins: C(10+3,3)=C(13,3)=286. With each part at least 2: substitute xᵢ=yᵢ+2, Σyᵢ=2, C(2+3,3)=C(5,3)=10." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-2 + MC-3 combined):**
Step 1 — "Derive the at-least-one formula carefully: start from x₁+⋯+xₖ=n with each xᵢ≥1. Substitute yᵢ=xᵢ−1≥0. Then (y₁+1)+⋯+(yₖ+1)=n → Σyᵢ=n−k. Apply stars-and-bars to Σyᵢ=n−k with k bins: C((n−k)+k−1, k−1)=C(n−1,k−1). Note: subtract k from n, not add."
Step 2 — "Bar count visualisation: write out 3 bins in a line: [★★|★★★|★]. Count the bars: exactly 2. For 4 bins: [|★★|★|★★★] needs exactly 3 bars. In general: k bins → k−1 bars. The formula C(n+k−1, k−1) counts the positions of k−1 bars among n+k−1 total symbols."
Step 3 — "Check small cases: n=2, k=2. Formula: C(2+1,1)=C(3,1)=3. List explicitly: (2,0),(1,1),(0,2) — exactly 3. ✓. n=2, k=3: C(2+2,2)=C(4,2)=6. List: (2,0,0),(0,2,0),(0,0,2),(1,1,0),(1,0,1),(0,1,1) — 6. ✓."

**TB-R02 (MC-1 IDENTICAL VS. DISTINCT):**
Step 1 — "The two counting frameworks: (1) IDENTICAL objects in DISTINCT bins: stars-and-bars → C(n+k−1,k−1). (2) DISTINCT objects in DISTINCT bins: assignment/function → kⁿ. (3) IDENTICAL objects in IDENTICAL bins: integer PARTITION (much harder, no closed form). (4) DISTINCT objects in IDENTICAL bins: Stirling numbers of the second kind S(n,k). Identify which framework matches your problem BEFORE computing."
Step 2 — "The test: 'Would swapping two of the objects change the distribution?' If YES → distinct objects. 'Would swapping two bins change the distribution?' If YES → distinct bins. Stars-and-bars applies when both questions answer NO for objects and YES for bins."
Step 3 — "Practice classification: (a) Distribute $5 (five $1 bills, distinguishable by serial number) among 3 people: distinct objects, distinct bins → 3⁵=243. (b) Distribute $5 (five identical $1 coins) among 3 people: identical objects, distinct bins → C(7,2)=21. (c) Partition 5 into 3 positive parts (order doesn't matter): identical objects, identical bins → partition function, not stars-and-bars."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Count the non-negative integer solutions to x₁+x₂+x₃+x₄=12. Then count the positive integer solutions (each xᵢ≥1).
2. A store has 4 flavours of ice cream. How many ways can a customer order a bowl with exactly 6 scoops? (Scoops of the same flavour are identical.)
3. Count integer solutions to x₁+x₂+x₃=15 where 0≤xᵢ≤7 for each i. Use inclusion-exclusion.
4. How many ways can 8 identical red balls and 6 identical blue balls be distributed into 3 distinct boxes? (Treat each colour independently and multiply.)
5. A vending machine has 5 distinct buttons (beverages). A buyer purchases exactly 3 drinks (identical in price; distinguished only by which button was pressed). How many distinct purchase sequences are there? How many distinct purchase combinations (order doesn't matter)?

**P55 — Reflect & Consolidate:** "Identical objects in k bins: C(n+k−1,k−1). At-least-one: C(n−1,k−1). Identical ≠ distinct: for distinct objects use kⁿ (functions). Upper-bound restriction: inclusion-exclusion on top. Multiset size n from k types: C(n+k−1,n)."

**P76 — Transfer Probe (Independence mode):**
(a) Lattice path counting: the number of lattice paths from (0,0) to (m,n) using unit steps right (R) and up (U) is C(m+n,m). Show that this is the same as distributing m identical R-steps among n+1 "columns" (one per U-step plus start and end), connecting stars-and-bars to path counting. (b) Generating functions for stars-and-bars: the ordinary generating function for the number of ways to distribute any number of identical objects among k bins is 1/(1−x)ᵏ = Σ_{n≥0} C(n+k−1,k−1) xⁿ. Derive this by expanding each 1/(1−x) factor and multiplying. (c) Integer partition asymptotic: the number of integer partitions of n (identical objects in identical bins) satisfies p(n) ∼ (1/4n√3) exp(π√(2n/3)) (Hardy-Ramanujan). Contrast this with stars-and-bars C(n+k−1,k−1) ∼ nᵏ⁻¹/((k−1)!) for fixed k, showing that identical-bin counting grows exponentially faster than identical-object-in-distinct-bins counting.

**P75 — Mastery Assessment:**
"(a) How many ways can 20 identical books be distributed among 5 students if each student must receive at least 2 books and at most 7 books? (b) A bag contains 12 identical red marbles, 8 identical blue marbles, and 5 identical green marbles. Count the number of ways to select a handful of 10 marbles. (c) How many non-negative integer solutions does x+y+z=25 have? How many with x≤10, y≤10, z≤10? (Use inclusion-exclusion for the second part.) (d) Classify each problem as: (i) distinct objects/distinct bins; (ii) identical objects/distinct bins; (iii) identical objects/identical bins; (iv) other. State the correct formula. Problems: arranging 5 books on a shelf; seating 5 people at 5 chairs; choosing 5 coins from a pile of identical pennies for distribution into 4 envelopes; partitioning 7 into 3 positive parts."

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW the identical-vs-distinct distinction and the at-least-one substitution
- Score ≤ 3/5 → PREREQUISITE GAP in math.disc.combinations; reassign

**P78 — Completion:** Stars and Bars certified. Student derives and applies C(n+k−1,k−1) for identical objects in distinct bins; handles at-least-one constraints via substitution; applies inclusion-exclusion for upper-bound restrictions; distinguishes identical from distinct objects; and interprets the formula as counting multisets and lattice paths.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Lattice path bijection; generating function for stars-and-bars; Hardy-Ramanujan partition asymptotics
Skill tested: Connect the combinatorial stars-and-bars formula to generating functions, lattice paths, and the contrast with the much harder identical-bin (partition) counting problem

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
