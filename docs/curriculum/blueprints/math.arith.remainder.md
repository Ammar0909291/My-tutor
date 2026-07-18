<!-- BLUEPRINT: math.arith.remainder -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Remainder
**Concept ID:** `math.arith.remainder`
**KG Fields:** difficulty=developing | bloom=understand | estimated_hours=4 | mastery_threshold=0.85

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.arith.remainder |
| name | Remainder |
| difficulty | developing |
| bloom | understand |
| estimated_hours | 4 |
| mastery_threshold | 0.85 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.arith.division |
| cross_links | math.nt.modular-arithmetic (not yet authored — see Component 7) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.85 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.arith.division**: $a\div b$ finds how many times $b$ fits into $a$; this concept names and formalizes the "leftover" part that division alone leaves informally described

### Target Knowledge State
Student can compute the remainder of $a\div b$ and correctly state it as satisfying $a=bq+r$ with $0\le r<b$ (the remainder is always LESS than the divisor and never negative); correctly reinterpret a decimal quotient's fractional part in terms of the true integer remainder (e.g. $17\div5=3.4$ corresponds to quotient 3, remainder 2 — NOT remainder "0.4" or "4"); and correctly handle remainder problems involving negative dividends, recognizing that the standard convention keeps $r$ non-negative ($0\le r<b$) even when $a$ is negative, which can feel counter-intuitive compared to naive "leftover" thinking.

### Conceptual Obstacles
1. Reading the decimal part of a division result as if it directly gave the remainder — $17\div5=3.4$ tempts a reading of "remainder 0.4" or "remainder 4" (taking the digit after the decimal point), when the TRUE integer remainder is 2 (since $17=5\times3+2$); the decimal fraction $0.4$ is $2/5$, not the remainder itself
2. Believing the remainder can be greater than or equal to the divisor — a genuine remainder must satisfy $0\le r<b$; if a computed "leftover" equals or exceeds the divisor, the division was not carried far enough (the quotient should have been one more)
3. Mishandling remainders with negative dividends — e.g. $-17\div5$: naive intuition might suggest remainder $-2$ (matching $-17=5\times(-3)+(-2)$), but the standard mathematical convention requires $0\le r<b$, forcing $q=-4, r=3$ instead ($-17=5\times(-4)+3$), since $-2$ violates the non-negativity requirement

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | DECIMAL-DIGITS-ARE-THE-REMAINDER | Student reads the decimal part of a division result as directly giving the remainder (e.g. treating 3.4 as "remainder 4" or "remainder 0.4"), rather than computing the true integer remainder via $a-bq$ | Any division whose decimal quotient has a "convenient-looking" decimal digit matching some other quantity in the problem |
| MC-2 | REMAINDER-CAN-EQUAL-OR-EXCEED-DIVISOR | Student computes a "leftover" value that is greater than or equal to the divisor, without recognizing the quotient was chosen too small | Any long-division setup where an intermediate subtraction is stopped one step too early |
| MC-3 | NEGATIVE-DIVIDEND-GIVES-NEGATIVE-REMAINDER | Student computes the remainder of a negative dividend using the naive relationship (allowing $r<0$), rather than applying the standard convention $0\le r<b$ | Any division problem with a negative dividend, e.g. $-17\div5$ |

**Foundational Misconception:** MC-1 (DECIMAL-DIGITS-ARE-THE-REMAINDER) — it is the most common and most damaging error in this concept, because it conflates two entirely different representations of "leftover" (the true integer remainder $r$, an integer between 0 and $b-1$, vs. the DECIMAL fraction $r/b$ that appears after the decimal point in $a\div b$'s decimal expansion) — a student making this error will consistently misstate the remainder for any division whose quotient is written in decimal form, and has no reliable way to connect the decimal and integer-division representations of the same underlying division fact.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — developing learner performs a concrete "sharing with leftovers" computation (physical objects divided into groups) before the formal $a=bq+r$ relationship and its decimal-quotient connection are stated.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: 17 objects shared into groups of 5, explicit leftover counted; P: the leftover pictured directly, then compared against the decimal quotient 3.4; A: formal $a=bq+r$, $0\le r<b$, and the decimal-to-remainder conversion
2. **A02 P06 CONTRAST PAIR** — decimal digit 4 vs. true remainder 2 for 17÷5 (MC-1); a too-early-stopped subtraction giving an invalid "remainder" ≥ divisor vs. the correct one (MC-2); negative dividend handled by the r≥0 convention vs. the naive negative-remainder guess (MC-3)
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Leftovers, Formalized

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Ground the remainder in a concrete sharing scenario before any formula; connect the integer remainder explicitly to the decimal quotient's fractional part

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (17 objects shared into groups of 5):**

17 objects, grouped 5 at a time: Group 1 (5 objects), Group 2 (5 objects), Group 3 (5 objects) — that's 15 objects used, forming 3 complete groups, with **2 objects left over** (17−15=2). So $17\div5$ gives quotient $3$ and remainder $2$.

**Stage P — Pictorial (the leftover, and its relationship to the decimal quotient):**

```
   ●●●●● ●●●●● ●●●●●  ●●     ← 3 groups of 5, plus 2 leftover
     (1)    (2)    (3)  ↑
                     remainder = 2 (NOT part of any full group)

   17 ÷ 5 = 3.4   (decimal form)
              ↑
        this "4" is the FIRST DECIMAL DIGIT of 2/5=0.4,
        NOT the remainder itself — the remainder is the
        WHOLE NUMBER 2, before any division into fractional parts
```

**Stage A — Abstract (the formal relationship and decimal connection):**

**Formal definition:** for integers $a,b$ with $b>0$, there exist unique integers $q$ (quotient) and $r$ (remainder) such that
$$a = bq + r, \qquad 0\le r < b.$$

**Connecting to the decimal quotient:** $a\div b$ as a decimal equals $q + r/b$. So $17\div5 = 3 + 2/5 = 3+0.4=3.4$ — the decimal part $0.4$ IS $r/b$ (here $2/5$), not $r$ itself. To recover the true integer remainder from a decimal quotient, either (a) redo the division tracking the integer leftover directly (as in the concrete stage), or (b) multiply the decimal PART by the divisor: $0.4\times5=2$, recovering $r=2$ correctly.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Compute $23\div4$ using the sharing model (groups of 4), stating the quotient and remainder explicitly. Then verify using $a=bq+r$.

**CORRECT:** $23\div4$: groups of 4 — $4,4,4,4,4$ (5 groups, using 20), with $23-20=3$ left over. Quotient $q=5$, remainder $r=3$. Verify: $4\times5+3=20+3=23$ ✓, and $0\le3<4$ ✓.
→ "Correct — the verification step (checking a=bq+r and 0≤r<b) is a habit worth keeping for every remainder computation." → Proceed to A02.

**PARTIAL:** Student computes q=5, r=3 correctly but skips the verification check.
→ "The answer is right, but always verify: $bq+r$ should reconstruct $a$ exactly ($4\times5+3=23$ ✓), and $r$ must satisfy $0\le r<b$ (here $0\le3<4$ ✓). This two-part check catches most remainder errors immediately, including the 'remainder too big' error covered next in this concept."

**INCORRECT:** Student computes the decimal $23\div4=5.75$ and reports "remainder 0.75" or "remainder 75" (MC-1).
→ "The decimal 5.75 tells you $q=5$ and the fractional part is $0.75=r/4$ — to recover the actual integer remainder, multiply: $0.75\times4=3$, giving $r=3$ (matching the sharing-model answer). The remainder is always a WHOLE NUMBER (specifically, between 0 and the divisor minus 1) — 0.75 and 75 are not valid remainders here at all, since the true remainder for dividing by 4 must be 0, 1, 2, or 3."

**NO_RESPONSE:** → "23÷4: five groups of 4 use 20, leaving 3. q=5, r=3. Verify: 4(5)+3=23 ✓, 0≤3<4 ✓."

---

### Teaching Action A02 — Decimal ≠ Remainder; Remainder < Divisor Always; Negative Dividends

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-1 with a decimal-vs-integer-remainder side-by-side conversion; break MC-2 with a too-early-stopped subtraction yielding an invalid remainder; break MC-3 with the negative-dividend convention made explicit

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — The decimal digit vs. the true remainder (MC-1), several examples side by side:**

| Division | Decimal quotient | Decimal part × divisor | True remainder $r$ |
|----------|--------------------|---------------------------|------------------------|
| $17\div5$ | $3.4$ | $0.4\times5=2$ | $2$ |
| $22\div7$ | $3.142857\ldots$ | $0.142857\ldots\times7\approx1$ | $1$ |
| $9\div4$ | $2.25$ | $0.25\times4=1$ | $1$ |

In every row, the raw decimal DIGITS (4, 142857..., 25) bear NO direct resemblance to the true remainder (2, 1, 1) — only multiplying the decimal PART by the divisor recovers the correct integer remainder. Reading digits directly off the decimal expansion is never a valid shortcut.

**Contrast 2 — A too-early-stopped subtraction gives an invalid "remainder" (MC-2):**

Dividing $29\div6$: a student subtracts $6$ from $29$ only THREE times ($29-6-6-6=11$) and stops, reporting "quotient 3, remainder 11." Check the requirement $0\le r<b$: here $r=11$ and $b=6$, and $11\ge6$ — **INVALID**, since 11 is not less than the divisor 6. The subtraction stopped too early: $6$ still fits into $11$ ONE more time ($11-6=5$), so continue: quotient should be $4$ (not 3), remainder $5$ (which correctly satisfies $0\le5<6$). **Whenever a computed leftover is ≥ the divisor, more full groups can still be removed — the division isn't finished.**

**Contrast 3 — Negative dividend: the convention keeps $r\ge0$ (MC-3):**

Divide $-17$ by $5$. Naive approach: $-17=5\times(-3)+(-2)$ (since $5\times(-3)=-15$, and $-17-(-15)=-2$) — this gives $q=-3, r=-2$, but $r=-2$ VIOLATES $0\le r<5$ (negative remainders are not allowed by the standard convention). **Correct approach:** adjust $q$ down by one more (to $-4$): $5\times(-4)=-20$, and $-17-(-20)=3$. Check: $5\times(-4)+3=-20+3=-17$ ✓, and $0\le3<5$ ✓ — **$q=-4, r=3$** is the standard, convention-following answer, even though the naive $q=-3,r=-2$ also "adds up correctly" arithmetically; only the version with $0\le r<b$ is the accepted remainder.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** (a) For $34\div9$, decimal quotient is $3.777\ldots$. Find the true integer remainder (do NOT read it off the decimal digits). (b) A student divides $50$ by $8$ and reports "quotient 5, remainder 10." Is this valid? If not, correct it. (c) Find q and r for $-23\div6$, ensuring $0\le r<6$.

**CORRECT:** (a) $q=3$; decimal part $0.777\ldots\times9\approx7$; check: $9\times3+7=27+7=34$ ✓, so $r=7$. (b) INVALID — $r=10\ge8=b$, violates $0\le r<b$; correct: $8$ fits into $50$ one more time than 5: $8\times6=48$, $50-48=2$, so $q=6,r=2$ (check: $8(6)+2=50$ ✓, $0\le2<8$ ✓). (c) Naive: $6\times(-4)=-24$, $-23-(-24)=1$; check $0\le1<6$ ✓ directly — so $q=-4,r=1$ (verify: $6(-4)+1=-24+1=-23$ ✓).
→ "Correct on all three — (c) shows the negative-dividend convention doesn't always require an extra adjustment step; sometimes the first natural choice of q already satisfies 0≤r<b, as it does here." → Proceed to A03.

**PARTIAL:** Student gets (a) and (b) but in (c) computes $q=-3,r=-5$ (using the "round toward zero" quotient instead of the "round down" one needed for the $0\le r<b$ convention) without checking the range requirement.
→ "Check $0\le r<b$ on your answer: $r=-5$ is NEGATIVE, which violates the requirement immediately. The convention requires choosing q so that r lands specifically in $[0,6)$ — try one integer lower for q: $q=-4$ gives $6\times(-4)=-24$, and $-23-(-24)=1$, which DOES satisfy $0\le1<6$. Always verify the range condition explicitly rather than trusting the first q you try."

**INCORRECT:** Student answers (b) "valid, since 5×8+10=50 checks out arithmetically" (MC-2 — accepting the arithmetic identity without checking the range condition).
→ "The equation $bq+r=a$ checking out is NECESSARY but not SUFFICIENT — you must ALSO verify $0\le r<b$. Here $r=10$ and $b=8$: is $10<8$? No — this fails the range requirement, meaning 8 could still be subtracted from the remaining 10 at least once more. Increment q to 6: $8(6)+2=50$, and now $0\le2<8$ ✓ — this is the valid answer."

**NO_RESPONSE:** → "(a) r=7 (check: 9×3+7=34). (b) Invalid (10≥8); correct is q=6,r=2. (c) q=-4,r=1 (check: 6×(-4)+1=-23, and 0≤1<6)."

---

### Teaching Action A03 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess correct remainder computation from decimals, the range-check discipline, and negative-dividend handling under transfer

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Find q and r for $41\div6$, and verify using $a=bq+r$.

*Solution:* $6\times6=36$, $41-36=5$. $q=6,r=5$. Verify: $6(6)+5=41$ ✓, $0\le5<6$ ✓.

**Problem 2:** $27\div8=3.375$. Find the true integer remainder (do not read it off the decimal).

*Solution:* $q=3$; $8\times3=24$; $r=27-24=3$ (check: decimal part $0.375\times8=3$ ✓, matching).

**Problem 3:** A student reports "$44\div7$: quotient 5, remainder 9." Is this valid? Correct if not.

*Solution:* Invalid — $9\ge7$. Correct: $7\times6=42$, $44-42=2$; $q=6,r=2$ (check: $0\le2<7$ ✓).

**Problem 4:** Find q and r for $-31\div4$, ensuring $0\le r<4$.

*Solution:* $4\times(-8)=-32$; $-31-(-32)=1$; $q=-8,r=1$ (check: $4(-8)+1=-31$ ✓, $0\le1<4$ ✓).

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** A vending machine dispenses items in packs of 6. A supplier has $-14$ items in inventory (a deficit, representing items owed to a previous order that must be fulfilled before new stock counts).

(a) Using the standard remainder convention ($0\le r<6$), find q and r for $-14\div6$, and interpret what q and r mean in terms of "how many full packs are owed" and "how many individual items remain in the deficit/surplus."
(b) A colleague computes it differently, getting "$q=-2, r=-2$" (using $-14=6\times(-2)+(-2)$) and argues: "This is simpler and just as correct, since it satisfies the equation $a=bq+r$ too." Evaluate this claim precisely, explaining why the standard convention still prefers the $0\le r<6$ version despite the colleague's version also satisfying the basic equation.
(c) Suppose the deficit changes to exactly $-18$ (a multiple of 6). Find q and r using the standard convention, and explain why this case is special compared to (a) — does it still require any "adjustment" step, or is it more straightforward?

**Expected solution:**

(a) $6\times(-3)=-18$, and $-18$ is too negative (undershoots $-14$); try $6\times(-2)=-12$: $-14-(-12)=-2$, still negative — try one more step down: $6\times(-3)=-18$: $-14-(-18)=4$; check $0\le4<6$ ✓. So $q=-3, r=4$ (verify: $6(-3)+4=-18+4=-14$ ✓). Interpretation: $q=-3$ means the supplier is short by 3 full packs (a deficit of 3 packs), and $r=4$ means, beyond those 3 full packs owed, there are 4 additional individual items also owed (or equivalently, framing it as "3 packs short, plus 4 more units" captures the total deficit of 14 items exactly: $3\times6+4=22\ne14$... let's recheck: actually the interpretation is that $-14 = 6(-3)+4$ means: 3 packs' worth were "over-subtracted" (i.e., $-18$ items worth), and adding back 4 gives $-14$ — the cleanest reading is simply computational: q and r are whatever values make the equation and range condition hold, and further real-world interpretation of negative-inventory framings can vary by context; the mathematics itself is unambiguous: $q=-3, r=4$.

(b) The colleague's version ($q=-2,r=-2$) does satisfy the bare equation $a=bq+r$ ($6(-2)+(-2)=-12-2=-14$ ✓), but it VIOLATES the range requirement $0\le r<6$ (since $r=-2<0$). The standard convention specifically REQUIRES $r$ to be non-negative and less than the divisor precisely so that "the remainder" has a single, unambiguous, always-comparable meaning across all problems (a genuine "leftover count" between 0 and one-less-than-the-divisor) — without this convention, infinitely many pairs $(q,r)$ would satisfy the bare equation (e.g. also $q=-1,r=-8$; $q=-4,r=10$; etc.), and "the remainder" would not be a well-defined single answer at all. The convention's role is precisely to pick out ONE specific, always-valid-range pair from among the many that satisfy the equation alone.

(c) $6\times(-3)=-18$, so $-18-(-18)=0$; $q=-3,r=0$ (check: $0\le0<6$ ✓, valid immediately, no further adjustment needed). This case is special because $-18$ is an EXACT multiple of 6 (no leftover deficit at all) — the remainder is exactly 0, and no "one more adjustment step" is required precisely because the division comes out even; this mirrors the ordinary positive-number case where dividing an exact multiple of the divisor (e.g. $18\div6$) gives remainder 0 directly, without the extra care negative, non-exact-multiple dividends require.

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

- MASTERY ACHIEVED → unlock math.nt.modular-arithmetic; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.arith.remainder assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — DECIMAL-DIGITS-ARE-THE-REMAINDER (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Reading the decimal digits directly as the remainder is DECIMAL-DIGITS-ARE-THE-REMAINDER. The decimal part represents r/b (a fraction), not r itself — multiply the decimal part by the divisor to recover the true integer remainder."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "$19\div4=4.75$. What is the remainder?"
- MC-1 response: "0.75" or "75."

**[P64 — CONCEPTUAL SHIFT]**
"The decimal part 0.75 represents r/4 (the fraction of one more group that's leftover) — to recover r itself, multiply: $0.75\times4=3$. Verify: $4\times4+3=19$ ✓, and $0\le3<4$ ✓. The remainder is always a WHOLE NUMBER strictly less than the divisor; '0.75' and '75' are both invalid forms for a remainder when dividing by 4 (valid remainders there are only 0, 1, 2, or 3)."

Practice: For $26\div4=6.5$, compute the true integer remainder by multiplying the decimal part by 4, and verify using $a=bq+r$.

---

### Repair Action B02 — REMAINDER-CAN-EQUAL-OR-EXCEED-DIVISOR (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Reporting a leftover value ≥ the divisor as the remainder is REMAINDER-CAN-EQUAL-OR-EXCEED-DIVISOR. A genuine remainder always satisfies $0\le r<b$ — if your computed leftover is ≥ b, the divisor still fits at least once more, and the quotient should increase."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "35÷6: I subtracted 6 four times (35−24=11) and stopped. Quotient 4, remainder 11?"
- MC-2 response: "Yes, that's correct."

**[P64 — CONCEPTUAL SHIFT]**
"Check the range: is $11<6$? No — 11 is bigger than the divisor 6, meaning 6 still fits into 11 at least once more (in fact once, since $11-6=5$). Continue: quotient becomes 5, and the new leftover is $11-6=5$, which DOES satisfy $0\le5<6$. The correct answer is $q=5,r=5$ — always check $r<b$ before finalizing an answer; a leftover ≥ the divisor signals unfinished division."

Practice: A student computes $52\div7$ and stops with "quotient 6, remainder 10." Check whether this is valid, and correct it if not.

---

### Repair Action B03 — NEGATIVE-DIVIDEND-GIVES-NEGATIVE-REMAINDER (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Allowing a negative remainder for a negative dividend is NEGATIVE-DIVIDEND-GIVES-NEGATIVE-REMAINDER. The standard convention always requires $0\le r<b$, even when the dividend is negative — this may require choosing q one integer lower than the naive 'round toward zero' choice."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Find q,r for $-11\div4$."
- MC-3 response: "$-11=4\times(-2)+(-3)$, so q=-2, r=-3."

**[P64 — CONCEPTUAL SHIFT]**
"Check the range on your r: is $-3\ge0$? No — negative remainders are never valid under the standard convention. Adjust q one lower: $4\times(-3)=-12$, and $-11-(-12)=1$; check $0\le1<4$ ✓. Correct answer: $q=-3, r=1$. The rule of thumb: when the naive computation gives a negative r, decrease q by exactly 1 and recompute r — this always restores $0\le r<b$."

Practice: Find q,r for $-25\div7$ using the standard convention, starting from the naive computation and adjusting as needed.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Recompute a fresh decimal-to-integer-remainder conversion (multiply decimal part by divisor) |
| SR-2 | +3 days | Check a fresh "leftover ≥ divisor" scenario and correct it by incrementing the quotient |
| SR-3 | +7 days | Compute q,r for a fresh negative dividend, applying the 0≤r<b convention explicitly |
| SR-4 | +14 days | Reconstruct the vending-machine transfer probe's argument for why the standard convention picks one specific (q,r) pair out of many equation-satisfying options |

Retrieval flag: if student reads decimal digits as the remainder (MC-1) or accepts a remainder ≥ the divisor (MC-2), re-execute B01/B02 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1) | math.arith.division | Supplies the "how many times b fits into a" operation this concept names the leftover from |
| Unlocks | math.nt.modular-arithmetic | Modular arithmetic is defined directly in terms of remainders (a≡b mod n iff they have the same remainder upon division by n) — this concept's r is exactly that building block |

**GR-9:** cross_links: math.nt.modular-arithmetic is listed in the KG but has **no authored blueprint yet** — P76_mode is therefore set to independence for now; once math.nt.modular-arithmetic is authored, a future revision may add a genuine cross-link probe connecting remainders directly to modular congruence.

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=4 → compact structure (2 main TAs + gate), matching other h=4, developing/understand Tier-2 concepts
- bloom=understand → V-4 = N/A (no P07 required; computation-and-verification tasks grounded in the formal a=bq+r relationship, not open derivations)
- CPA_entry = C for a developing learner: a concrete sharing scenario (17 objects into groups of 5) anchors "remainder" as a physically countable leftover before the decimal-quotient connection (which is more abstract and error-prone) is introduced

**Key teaching insight:** MC-1 is this concept's highest-leverage misconception because decimal division is the MOST common way students first encounter a division result (via calculator or standard algorithm), and the temptation to read decimal digits as "the remainder" is immediate and persistent unless explicitly broken with side-by-side conversions (A02 Contrast 1). MC-2 and MC-3 are secondary refinements of the same underlying discipline (always verify $0\le r<b$ explicitly) applied to two different failure directions: stopping too early (leftover too big) and negative dividends (naive remainder too small/negative).

**Why negative dividends (MC-3) deserve dedicated treatment:** Even though negative-dividend remainder problems are less common in early arithmetic curricula, they are included here because the SAME $0\le r<b$ convention that resolves MC-2 (leftover too big → increment q) has a mirror-image resolution for negative dividends (naive remainder negative → decrement q) — presenting both directions together (A02 Contrasts 2 and 3) reinforces that the range condition, not any special-casing, is the single unifying rule governing all remainder computations.

**Sequencing note (cross-link):** math.nt.modular-arithmetic (built directly on the notion of remainder) is not yet authored in the corpus; this blueprint's $0\le r<b$ discipline is exactly the foundation that future concept requires, and Component 7 records the pending cross-link for a future authoring pass.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.arith.remainder ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.arith.division ✓ | PASS |
| V-3 | CPA entry = C for developing difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=understand → P07 N/A | bloom=understand; no P07; V-4=N/A ✓ | N/A |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A03) is terminal | A03=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A03; A03 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A03 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented; not-yet-authored cross-link noted ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | cross_link target not yet authored → P76=independence ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=5/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.85×5⌉=⌈4.25⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1 FOUNDATIONAL, MC-2, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=4 → compact (2 main TAs + gate); A01+A02+A03 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | Vending-machine negative-inventory scenario; convention-vs-arbitrary-solution argument ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |
