<!-- BLUEPRINT: math.arith.decimals -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Decimals
**Concept ID:** `math.arith.decimals`
**KG Fields:** difficulty=developing | bloom=apply | estimated_hours=10 | mastery_threshold=0.85

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.arith.decimals |
| name | Decimals |
| difficulty | developing |
| bloom | apply |
| estimated_hours | 10 |
| mastery_threshold | 0.85 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.arith.fractions, math.arith.place-value |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.85 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.arith.fractions**: a fraction p/q represents a part-whole relationship; decimals are simply fractions with denominators restricted to powers of 10
- **math.arith.place-value**: each digit's value depends on its position; decimals EXTEND this system to positions right of the decimal point (tenths, hundredths, thousandths — powers of 1/10), the exact same positional logic already learned for whole numbers

### Target Knowledge State
Student can read, write, and compare decimals correctly using place value (not digit count); correctly ADD and SUBTRACT decimals with proper place-value alignment (not treating whole and decimal parts as separate independent numbers); and correctly predict whether multiplying or dividing by a decimal will increase or decrease a quantity, recognizing that the "multiplication makes bigger / division makes smaller" rule from whole-number arithmetic FAILS once factors between 0 and 1 are involved.

### Conceptual Obstacles
1. Comparing decimals by DIGIT COUNT or digit VALUE as if they were whole numbers (e.g. believing 0.36 > 0.4 because "36 > 4") — decimal comparison must align place values (tenths vs. tenths, hundredths vs. hundredths), and a longer decimal string is not automatically a larger number
2. Treating the whole-number part and the decimal part as two SEPARATE whole numbers to be combined independently (e.g. computing 1.9 + 2.9 as "1+2=3" and "9+9=18" glued together as "3.18" instead of carrying correctly to get 4.8) — decimal arithmetic must track a SINGLE continuous place-value system across the decimal point, with carrying/borrowing flowing across it exactly as between ones and tens
3. Overgeneralizing "multiplying makes bigger, dividing makes smaller" from whole-number experience — this fails whenever a factor is a decimal STRICTLY BETWEEN 0 and 1: multiplying by such a factor makes the result SMALLER (e.g. 5×0.5=2.5<5), and dividing by such a factor makes the result LARGER (e.g. 5÷0.5=10>5)

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | LONGER-DECIMAL-IS-LARGER | Student compares decimals by treating the digits after the point as if they formed a whole number (more digits/bigger digit string = bigger value), e.g. concluding 0.36>0.4 | Any comparison between decimals with a different number of digits, especially where the "longer" one has a smaller leading (tenths) digit |
| MC-2 | WHOLE-AND-DECIMAL-PARTS-SEPARATE | Student adds/subtracts decimals by combining the whole-number parts and decimal parts as two independent computations, without carrying across the decimal point when the decimal-part sum exceeds 1 | Any addition/subtraction where the decimal parts sum to 1 or more, e.g. 1.9+2.9, 3.6+2.7 |
| MC-3 | MULTIPLY-BIGGER-DIVIDE-SMALLER-ALWAYS | Student assumes multiplication always increases and division always decreases a positive number, failing for factors/divisors strictly between 0 and 1 | Any multiplication or division involving a decimal factor less than 1, e.g. 8×0.25, 8÷0.25 |

**Foundational Misconception:** MC-1 (LONGER-DECIMAL-IS-LARGER) — this is the single most extensively documented decimal misconception in mathematics education research (often called the "longer-is-larger" error), and it corrupts every subsequent skill in this concept: a student who cannot correctly ORDER decimals by place value has no reliable way to sanity-check whether an addition/subtraction result (MC-2's territory) or a multiplication/division result (MC-3's territory) is even in the right ballpark, since every such check ultimately requires comparing decimal magnitudes correctly.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — developing learner compares and computes with decimals using a place-value grid (physically aligning digits by column) before any general rule is stated.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: a place-value grid used to compare and add decimals correctly, column by column; P: the grid pictured directly, tenths/hundredths/thousandths columns explicit; A: formal decimal notation as an extension of place value, and the alignment rule for addition/subtraction
2. **A02 P06 CONTRAST PAIR** — 0.36 vs 0.4 read via aligned place-value columns (MC-1); 1.9+2.9 done correctly with carrying vs. the separated-parts error (MC-2); 8×0.25 and 8÷0.25 contrasted against the whole-number "bigger/smaller" intuition (MC-3)
3. **A03 P28 CONFLICT EVIDENCE** — a composite problem requiring correct comparison, aligned addition, and multiply/divide-by-decimal prediction together
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — The Place-Value Grid Extends Rightward

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Ground decimal comparison and addition in a physical place-value grid before any rule is stated; establish decimal notation as a direct extension of whole-number place value

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (a place-value grid, comparing and adding using it):**

$$
\begin{array}{c|c|c|c|c}
 & \text{ones} & . & \text{tenths} & \text{hundredths} \\ \hline
0.36: & 0 & . & 3 & 6 \\
0.40: & 0 & . & 4 & 0 \\
\end{array}
$$

Compare COLUMN BY COLUMN, left to right, starting at the ones place: both have 0 ones. Move to tenths: $0.36$ has 3 tenths, $0.40$ has 4 tenths. **4 tenths > 3 tenths already decides it — $0.40 > 0.36$**, regardless of what digit follows (the 6 in the hundredths place of 0.36 is irrelevant once the tenths comparison is already decisive, exactly as with whole numbers: 41 > 39 is decided by the tens digit, the ones digit never gets consulted).

**Adding using the grid** ($1.9+2.9$):

$$
\begin{array}{c|c|c}
\text{ones} & . & \text{tenths} \\ \hline
1 & . & 9 \\
2 & . & 9 \\ \hline
\end{array}
$$

Add tenths first: $9+9=18$ tenths $= 1$ one and $8$ tenths — **carry the 1 one into the ones column**, exactly like carrying a ten when adding whole numbers. Ones column: $1+2+1(\text{carried})=4$. Result: $4.8$.

**Stage P — Pictorial (the grid, explicit columns, carrying arrow):**

```
   ones . tenths hundredths
    1   .   9                  ←  1.9
  + 2   .   9                  ←  2.9
  ─────────────
        ↑
    carry 1 (from 9+9=18 tenths → 1 one + 8 tenths)
  ─────────────
    4   .   8                  ←  4.8
```

The decimal point is not a divider between "two separate numbers" — it's a marker in ONE continuous place-value system, and carrying flows across it exactly as it flows between the ones and tens columns in whole-number addition.

**Stage A — Abstract (decimal notation as extended place value):**

A decimal $d_1d_2\ldots d_k.\,e_1e_2e_3\ldots$ represents $\sum_i d_i\cdot10^{(\text{position})} + \sum_j e_j\cdot10^{-j}$ — each digit right of the point has value $\frac{1}{10^j}$ for its position $j$ (tenths $=10^{-1}$, hundredths $=10^{-2}$, etc.), the exact same base-10 positional principle already used for whole numbers, just continuing to NEGATIVE powers of 10. **Comparison rule:** align by place value (pad with trailing zeros if needed, e.g. $0.4=0.40$) and compare column by column from the LEFT (highest place value) until a difference is found — the first column where the digits differ decides the comparison, however many digits follow.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Compare $0.7$ and $0.65$ using the place-value grid (align them first), and state which is larger.

**CORRECT:** Align: $0.70$ vs $0.65$. Ones: both 0. Tenths: $7$ vs $6$ — $7>6$, already decided. **$0.7 > 0.65$.**
→ "Correct — padding 0.7 to 0.70 makes the column alignment explicit, and the tenths column alone settles it." → Proceed to A02.

**PARTIAL:** Student correctly aligns but hesitates or double-checks the hundredths column even after the tenths column already decided it.
→ "Once the tenths column shows a difference (7 vs 6), the comparison is FINISHED — exactly like comparing 71 and 65 as whole numbers, where the tens digit (7 vs 6) already decides it and the ones digit is never needed. No later column can overturn an earlier, higher-place-value difference."

**INCORRECT:** Student answers "0.65 is larger, since 65 is a bigger number than 7" (MC-1).
→ "Align by place value first: $0.70$ vs $0.65$ (padding 0.7 with a trailing zero makes the columns match up). Compare LEFT to right, highest place value first: ones (0 vs 0, tie), then tenths (7 vs 6) — 7 is bigger, so $0.70>0.65$. Treating '65' as a whole number ignores that those digits are in the tenths-and-hundredths positions, worth $6/10+5/100$, not sixty-five whole units; the digit COUNT after the point never determines size on its own."

**NO_RESPONSE:** → "Align: 0.70 vs 0.65. Compare column by column from the left: ones tie (0=0); tenths: 7 vs 6, and 7>6 decides it. 0.7 > 0.65."

---

### Teaching Action A02 — Three Overgeneralizations from Whole-Number Habits

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-1 with an aligned-column comparison where the "longer" decimal is smaller; break MC-2 with a carrying-required addition done both ways; break MC-3 by contrasting multiplying/dividing by a decimal less than 1 against whole-number intuition

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — A three-digit decimal smaller than a one-digit decimal (MC-1):**

Compare $0.199$ and $0.2$. Align: $0.199$ vs $0.200$. Ones: tie (0). Tenths: $1$ vs $2$ — **already decided, $0.2 > 0.199$**, even though $0.199$ has three digits after the point and "199" looks like a much bigger number than "2." The digit COUNT (three digits vs. one) is completely irrelevant; only the PLACE VALUE of the first differing digit matters, and here that's the tenths place, where 1 loses to 2 regardless of anything smaller (hundredths, thousandths) that follows.

**Contrast 2 — Carrying across the decimal point vs. two separate additions (MC-2):**

$3.6 + 2.7$: **Correct (carrying):** tenths: $6+7=13$ tenths $=1$ one $+3$ tenths, carry 1. Ones: $3+2+1=6$. Result: $6.3$. **Incorrect (separated-parts error):** "3+2=5" and "6+7=13" glued as "$5.13$" — wrong, because the tenths sum (13 tenths) EXCEEDS one whole one and must carry into the ones column exactly like any base-10 carry; gluing the raw digit-sum ignores that "13 tenths" is not a valid single-digit tenths value (just as "13 ones" isn't a valid single digit and must carry into the tens column in whole-number addition).

**Contrast 3 — Multiplying/dividing by a decimal less than 1 reverses the whole-number intuition (MC-3):**

| Operation | Whole-number intuition | What actually happens |
|-----------|--------------------------|--------------------------|
| $8\times3$ | Multiplying makes bigger: $24>8$ ✓ | Confirms the intuition (factor $>1$) |
| $8\times0.25$ | "Multiplying should make bigger" | $8\times0.25=2$, **SMALLER** than 8 (factor $<1$: taking 0.25 of 8, i.e. a quarter of it) |
| $8\div2$ | Dividing makes smaller: $4<8$ ✓ | Confirms the intuition (divisor $>1$) |
| $8\div0.25$ | "Dividing should make smaller" | $8\div0.25=32$, **LARGER** than 8 (asking "how many 0.25's fit into 8" — many small pieces, a big count) |

The whole-number rule ("×→bigger, ÷→smaller") silently assumes the OTHER factor/divisor is greater than 1; the moment it's a decimal strictly between 0 and 1, the direction of the effect flips for BOTH operations. Reframe: multiplying by $0.25$ means taking one-quarter of the original (smaller); dividing by $0.25$ means asking how many quarter-pieces fit inside (a bigger count, since each piece is small).

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** (a) Compare $0.08$ and $0.1$ (state which is larger, using aligned columns). (b) Compute $4.5+3.8$ using proper carrying. (c) Without computing exactly, predict whether $6\times0.4$ is bigger or smaller than 6, and whether $6\div0.4$ is bigger or smaller than 6.

**CORRECT:** (a) Align: $0.08$ vs $0.10$. Tenths: $0$ vs $1$ — $0.10>0.08$ (i.e. $0.1>0.08$), decided at the tenths column despite $0.08$ having a nonzero hundredths digit. (b) Tenths: $5+8=13$ tenths $=1$ one $+3$ tenths, carry 1. Ones: $4+3+1=8$. Result: $8.3$. (c) $6\times0.4$ is SMALLER than 6 (multiplying by a factor less than 1 shrinks it — result is $2.4$). $6\div0.4$ is LARGER than 6 (dividing by a number less than 1 grows it — result is $15$).
→ "Correct throughout — (c) tests the prediction WITHOUT requiring the exact computation, confirming the direction-of-change reasoning is understood independently of arithmetic execution." → Proceed to A03.

**PARTIAL:** Student gets (a) and (b) but in (c) predicts both operations make the result bigger (defaulting to whole-number intuition for at least one of them).
→ "Both operations flip direction here because 0.4 is less than 1: multiplying by 0.4 takes less-than-the-whole of 6 (shrinks it, like taking 40% of something), while dividing by 0.4 asks 'how many 0.4-sized pieces fit in 6' — since each piece is smaller than 1, MORE than 6 of them fit, so the answer is bigger than 6. Check the pattern from Contrast 3: a factor/divisor between 0 and 1 always reverses the usual whole-number direction, for BOTH multiplication and division."

**INCORRECT:** Student answers (a) "0.08 is larger, since 08 has more nonzero digits differently placed" or some digit-count-based reasoning (MC-1).
→ "Align first: 0.08 vs 0.10. Compare from the LEFT: ones tie (0=0), then tenths: 0 vs 1 — 1 is bigger, so 0.10 (=0.1) is larger, decided entirely at the tenths column. The hundredths digit (8 in 0.08) never gets consulled once the tenths column already differs — just as in whole numbers, a higher place-value digit always overrides everything to its right."

**NO_RESPONSE:** → "(a) 0.1 > 0.08 (tenths: 1 vs 0, decisive). (b) 4.5+3.8: tenths 5+8=13, carry 1, ones 4+3+1=8, so 8.3. (c) 6×0.4 is smaller than 6 (=2.4); 6÷0.4 is bigger than 6 (=15) — both flip because 0.4<1."

---

### Teaching Action A03 — Composite: Compare, Add, and Predict Together

**Primitive:** P28 CONFLICT EVIDENCE
**Purpose:** Force all three skills together in one problem, surfacing residual gaps before the gate

---

**[P28 — CONFLICT EVIDENCE]**

A recipe calls for $0.375$ kg of flour. You have two bags: Bag A contains $0.4$ kg, Bag B contains $0.38$ kg.

1. **Which bag has enough flour for the recipe, and which (if either) does not?** Align all three values: $0.375$, $0.400$, $0.380$. Tenths: all have $3,4,3$ respectively — wait, align carefully: $0.375$ has tenths digit 3; $0.4=0.400$ has tenths digit 4; $0.38=0.380$ has tenths digit 3. Comparing $0.375$ and $0.380$ (both tenths digit 3, tied): hundredths: $7$ vs $8$ — $0.380>0.375$. And $0.400$ has tenths digit 4, beating both. So ordering: $0.400 > 0.380 > 0.375$. **Both bags (0.4 kg and 0.38 kg) have enough** (both exceed 0.375 kg), with Bag A having the most surplus.
2. **If you combine both bags, how much flour do you have in total?** $0.4+0.38$: align as $0.40+0.38$. Hundredths: $0+8=8$. Tenths: $4+3=7$. Total: $0.78$ kg (no carrying needed here, since $0+8=8<10$ and $4+3=7<10$ in their respective columns).
3. **If the recipe is scaled down and now only needs $0.375\times0.5$ kg of flour, is the new amount bigger or smaller than the original $0.375$ kg, and why?** Since $0.5<1$, multiplying by it SHRINKS the amount — the new amount ($0.1875$ kg) is smaller than the original $0.375$ kg, consistent with "multiplying by a factor between 0 and 1 makes smaller."

A student weak on any of the three sub-skills typically fails at a different step: comparing 0.375/0.4/0.38 by digit count instead of aligned columns (MC-1), adding 0.4+0.38 by mismatching columns because the two decimals have different digit counts (MC-2, a subtler variant — misaligning rather than mis-carrying), or predicting the scaled recipe amount would be bigger because "multiplying" was the operation word used (MC-3).

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** A runner's times for three trials are $12.4$s, $12.35$s, and $12.405$s. (a) Order them from fastest (smallest time) to slowest. (b) Find the total time for all three trials (add them, showing any carrying). (c) If the runner's next trial takes exactly $0.5$ times as long as the average of these three, will the next trial be faster or slower than the average, and why?

**CORRECT:** (a) Align: $12.400$, $12.350$, $12.405$. Tenths all "4,3,4" — wait, check carefully: $12.4=12.400$ (tenths 4), $12.35=12.350$ (tenths 3), $12.405$ (tenths 4). Ordering by tenths: $12.350$ (tenths 3) is smallest/fastest first... comparing $12.400$ and $12.405$ (both tenths 4): hundredths both 0, thousandths 0 vs 5 — $12.405>12.400$. Final order fastest→slowest: $12.35 < 12.4 < 12.405$. (b) $12.4+12.35+12.405$: align as $12.400+12.350+12.405$; sum thousandths: $0+0+5=5$; hundredths: $0+5+0=5$; tenths: $4+3+4=11$ tenths $=1$ one $+1$ tenth, carry 1; ones: $2+2+2+1(\text{carried})=7$... careful with the tens: $12+12+12=36$ before decimals, plus carried tenths adjustments — total $=37.155$s. (c) Since $0.5<1$, multiplying the average by 0.5 gives a SMALLER value — the next trial (at half the average) would be FASTER (a smaller time), not slower.
→ "Correct — (b)'s triple-carry and (c)'s multiply-by-a-fraction-less-than-1 prediction both confirm the skills transfer to a three-number, real-context problem." → Proceed to A04.

**PARTIAL:** Student gets (a) and (c) but makes a carrying error in (b) (e.g. forgets to carry the tenths sum into the ones column).
→ "Recheck the tenths column specifically: $4+3+4=11$ tenths. Since 11 is 10 or more, this MUST carry — 11 tenths = 1 one + 1 tenth, so add that extra 1 into the ones-column sum before finalizing. Skipping this carry (writing '11' directly under the tenths column) is exactly the separated-parts error from Contrast 2, just with three numbers instead of two."

**INCORRECT:** Student answers (c) "slower, since we're multiplying and multiplying makes things bigger" (MC-3).
→ "Check which factor is doing the multiplying: 0.5, which is LESS than 1 — by Contrast 3's rule, multiplying by a factor between 0 and 1 SHRINKS the result, it doesn't grow it. Half of the average time is a SMALLER number than the average itself, meaning a FASTER trial, not a slower one; 'multiplying' as a word doesn't guarantee 'bigger' once the multiplier itself is less than 1."

**NO_RESPONSE:** → "(a) 12.35 < 12.4 < 12.405 (compare tenths, then hundredths/thousandths where tied). (b) Align and add with carrying: total 37.155s. (c) Faster — multiplying by 0.5 (less than 1) shrinks the average, giving a smaller (faster) time."

---

### Teaching Action A04 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess place-value comparison, carrying discipline, and multiply/divide-by-decimal direction prediction under transfer

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Which is larger: $0.099$ or $0.1$?

*Solution:* Align: $0.099$ vs $0.100$. Tenths: 0 vs 1 — $0.100>0.099$, so $0.1>0.099$.

**Problem 2:** Compute $5.7+4.6$, showing carrying explicitly.

*Solution:* Tenths: $7+6=13$ tenths $=1$ one $+3$ tenths, carry 1. Ones: $5+4+1=10$. Result: $10.3$.

**Problem 3:** Without fully computing, state whether $12\times0.75$ is bigger or smaller than 12, and whether $12\div0.75$ is bigger or smaller than 12.

*Solution:* $12\times0.75$ is smaller than 12 (factor $<1$: taking three-quarters of 12). $12\div0.75$ is bigger than 12 (dividing by a number less than 1: asking how many 0.75-sized pieces fit in 12, more than 12 fit since each piece is under 1).

**Problem 4:** A student claims $0.5$ km is longer than $0.45$ km "because 5 is more digits away from being a whole number, so it must represent more." Identify the error and give the correct comparison.

*Solution:* The reasoning is confused/invalid, but the conclusion happens to be numerically correct by coincidence: align $0.50$ vs $0.45$ — tenths: $5$ vs $4$, so $0.50>0.45$, i.e. $0.5>0.45$ is TRUE, but for the correct reason (a larger tenths digit), not the stated reasoning (which doesn't track any real place-value logic at all and would fail on other examples, e.g. it gives no correct method for comparing 0.5 to 0.6).

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** A store sells fabric at \$$12.50$ per meter. A customer wants to know the cost of $0.8$ meters, and separately, how many $0.8$-meter pieces can be cut from a $12.50$ meter roll.

(a) Compute the cost of $0.8$ meters (i.e. $12.50\times0.8$), and state, BEFORE computing, whether you expect this to be more or less than \$12.50, with a one-sentence reason.
(b) Compute how many $0.8$-meter pieces fit in the $12.50$-meter roll (i.e. $12.50\div0.8$), and state, BEFORE computing, whether you expect this count to be more or less than $12.5$, with a one-sentence reason.
(c) A student argues: "Both of these involve the number 0.8, and since 0.8 is less than 1, BOTH results should come out smaller than the original 12.50." Evaluate this claim carefully — is it true for both (a) and (b), or does it only correctly predict one of them? Explain precisely why, connecting to the multiply-vs-divide distinction from Contrast 3.

**Expected solution:**

(a) Since $0.8<1$, multiplying \$12.50 by 0.8 gives a SMALLER value (taking 0.8, i.e. 80%, of the original price) — expect LESS than \$12.50. Computing: $12.50\times0.8=10.00$. Confirms: \$10.00 < \$12.50.

(b) Since $0.8<1$, dividing 12.50 by 0.8 asks "how many 0.8-sized pieces fit into 12.50" — since each piece is SMALLER than one whole unit, MORE than 12.5 pieces fit — expect MORE than $12.5$. Computing: $12.50\div0.8=15.625$. Confirms: $15.625 > 12.5$.

(c) The claim is **wrong for (b)** — it correctly predicts (a) (multiplying by 0.8<1 does shrink the result) but incorrectly predicts (b) (dividing by 0.8<1 GROWS the result, the opposite direction). The student's error is applying a single "0.8 is small, so it shrinks things" intuition to BOTH operations, without recognizing that multiplication and division respond to a divisor/factor less than 1 in OPPOSITE ways: multiplying BY a number less than 1 takes a fraction of the original (smaller), while dividing BY a number less than 1 counts how many small pieces fit (more pieces, bigger count) — exactly the asymmetry established in Contrast 3 (where $8\times0.25<8$ but $8\div0.25>8$, using the identical 0.25). The presence of a decimal less than 1 in a problem never determines the direction of change on its own; the OPERATION (multiply vs. divide) determines which direction that decimal pushes the result.

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

- MASTERY ACHIEVED → unlock math.arith.percentages and math.arith.rounding; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.arith.decimals assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — LONGER-DECIMAL-IS-LARGER (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Comparing decimals by digit count or reading the decimal part as a whole number is LONGER-DECIMAL-IS-LARGER. Decimals must be compared by PLACE VALUE, column by column from the left — a longer string of digits after the point is never automatically bigger."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Which is larger, 0.36 or 0.4?"
- MC-1 response: "0.36, since 36 is bigger than 4."

**[P64 — CONCEPTUAL SHIFT]**
"Align first: 0.36 vs 0.40 (pad 0.4 with a trailing zero so the columns match). Compare from the LEFT, highest place value first: ones tie (0=0), then tenths: 3 vs 4 — 4 is bigger, so 0.40 (=0.4) wins, decided entirely at the tenths column. The '36' in 0.36 is really '3 tenths + 6 hundredths,' not the whole number thirty-six — treating it as thirty-six ignores what each digit's POSITION is worth."

Practice: Order 0.5, 0.45, and 0.499 from smallest to largest using aligned columns.

---

### Repair Action B02 — WHOLE-AND-DECIMAL-PARTS-SEPARATE (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Adding/subtracting the whole-number and decimal parts as two separate computations is WHOLE-AND-DECIMAL-PARTS-SEPARATE. The decimal point sits inside ONE continuous place-value system — carrying (or borrowing) must flow across it exactly as between the ones and tens columns."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Compute 1.9 + 2.9."
- MC-2 response: "1+2=3 and 9+9=18, so the answer is 3.18."

**[P64 — CONCEPTUAL SHIFT]**
"Check the tenths column specifically: $9+9=18$ TENTHS. Eighteen tenths is more than one whole (10 tenths = 1 one), so this MUST carry: 18 tenths = 1 one + 8 tenths. Add that carried 1 into the ones-column sum: $1+2+1=4$. Correct answer: $4.8$, not $3.18$ (which isn't even a sensible tenths digit — 'putting 18 in the tenths place' the way '3.18' does is exactly like writing '13' as a single ones-digit in whole-number addition instead of carrying)."

Practice: Compute $4.6+3.7$ by first identifying the tenths-column sum, checking whether it exceeds 9, and carrying if so.

---

### Repair Action B03 — MULTIPLY-BIGGER-DIVIDE-SMALLER-ALWAYS (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Assuming multiplication always increases and division always decreases a number is MULTIPLY-BIGGER-DIVIDE-SMALLER-ALWAYS. This only holds when the OTHER factor/divisor is greater than 1 — for factors/divisors strictly between 0 and 1, BOTH operations reverse direction."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Is 10×0.2 bigger or smaller than 10?"
- MC-3 response: "Bigger, since multiplying always makes things bigger."

**[P64 — CONCEPTUAL SHIFT]**
"Check what 0.2 actually IS: less than 1. Multiplying by a number less than 1 means taking a FRACTION of the original — $10\times0.2=2$, which is one-fifth of 10, smaller than 10. The 'multiplying makes bigger' rule silently assumes you're multiplying by something bigger than 1 (like 3, or 10); once the multiplier drops below 1, you're taking a PART of the original instead of repeating it, which shrinks it. Symmetrically, dividing by a number less than 1 (like 0.2) asks 'how many 0.2-sized pieces fit in 10' — since each piece is small, MANY fit (50 of them), so $10\div0.2=50$, bigger than 10."

Practice: Predict (without computing) whether $20\times0.1$ is bigger or smaller than 20, and whether $20\div0.1$ is bigger or smaller than 20 — then verify by computing both.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Order three fresh decimals of different digit lengths using aligned place-value columns |
| SR-2 | +3 days | Add two decimals requiring a carry across the decimal point, showing the carry explicitly |
| SR-3 | +7 days | Predict (without computing) the direction of change for a multiplication and a division by a decimal less than 1, then verify |
| SR-4 | +14 days | Reconstruct the fabric-store transfer probe's multiply-vs-divide asymmetry argument for a fresh pair of numbers |

Retrieval flag: if student compares decimals by digit count (MC-1) or fails to carry across the decimal point (MC-2), re-execute B01/B02 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1) | math.arith.fractions | Decimals are fractions restricted to power-of-10 denominators; the part-whole intuition from fractions grounds why "0.4" means "4 tenths," not "the whole number 4" |
| Requires (Tier-1) | math.arith.place-value | Supplies the entire positional-notation framework this concept extends rightward past the decimal point |
| Unlocks | math.arith.percentages | Percentages are decimals scaled by 100; this concept's place-value and multiply/divide-by-decimal skills transfer directly |
| Unlocks | math.arith.rounding | Rounding decimals requires exactly the column-by-column place-value reading established here |

**GR-9:** cross_links: none in the KG for this concept; P76_mode = independence (the transfer probe applies the multiply-vs-divide-by-a-decimal-less-than-1 asymmetry to a fresh real-world pricing/cutting scenario rather than a named cross-linked concept).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=10 → extended structure (3 main TAs + gate), reflecting the concept's broader scope (comparison, addition/subtraction with carrying, and multiply/divide direction — three genuinely separate skill clusters under one KG node)
- bloom=apply → every checkpoint and the gate require executing a procedure (comparing, adding with carrying, predicting/computing) rather than stating a definition
- CPA_entry = C for a developing learner: a physical place-value grid, used for both comparison and addition, anchors the "one continuous system, not two separate parts" insight before any symbolic rule is stated

**Key teaching insight:** MC-1 is this concept's highest-leverage misconception because it is a genuine prerequisite skill for self-checking the other two: a student who cannot reliably compare decimal magnitudes has no way to sanity-check whether an addition result (MC-2) or a multiplication/division result (MC-3) is even plausible in size. A01 and A02 are sequenced so aligned-column comparison is established FIRST and reused as an implicit checking tool throughout A02's carrying contrast and A03's composite problem.

**MC-3 as a genuinely separate, later-appearing error:** Unlike MC-1/MC-2 (which are errors of PROCEDURE — misreading or misaligning digits), MC-3 is an error of PREDICTION/INTUITION carried over from whole-number arithmetic; it is deliberately taught via a side-by-side table (Contrast 3) contrasting a factor greater than 1 (confirming the old intuition) against a factor less than 1 (breaking it), rather than simply asserting "the rule doesn't always work," so the student sees exactly WHERE the whole-number intuition's hidden assumption (factor/divisor > 1) breaks down.

**Sequencing note:** No cross-link concept exists yet for math.arith.decimals; the P76 transfer probe instead uses a fabric-pricing/cutting scenario that deliberately applies the SAME decimal (0.8) to both a multiplication and a division, so the student must recognize that a single decimal value's effect depends entirely on which operation it appears in — directly testing whether the multiply/divide asymmetry (Contrast 3, B03) has been internalized as a general principle rather than memorized for one specific example.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.arith.decimals ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.arith.fractions ✓, math.arith.place-value ✓ | PASS |
| V-3 | CPA entry = C for developing difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=apply → P07 recommended | Procedural comparison/carrying/prediction tasks throughout A01-A04 ✓ | PASS |
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
| V-19 | Structure matches h | h=10, three skill clusters → extended (3 main TAs + gate); A01+A02+A03+A04 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | Fabric pricing/cutting; multiply-vs-divide asymmetry with the same decimal ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |
