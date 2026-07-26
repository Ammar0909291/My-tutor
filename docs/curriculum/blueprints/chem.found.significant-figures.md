# Teaching Blueprint: Significant Figures and Error Analysis

## 0. Concept Metadata
| Field | Value |
|---|---|
| **Concept ID** | chem.found.significant-figures |
| **Name** | Significant Figures and Error Analysis |
| **Domain** | Chemistry Foundations |
| **Difficulty** | Foundational |
| **Bloom Level** | Apply |
| **Estimated Hours** | 2 |
| **Mastery Threshold** | 0.75 |
| **Prerequisites** | chem.found.measurement |
| **Unlocks** | (none — terminal in this wave) |

---

## 1. Concept Spine

**One-sentence definition:** Significant figures in a CALCULATION follow two different rules depending on the operation — addition/subtraction is limited by decimal PLACES, multiplication/division is limited by sig fig COUNT — and exact (counted, not measured) numbers are excluded from significant-figure limits entirely.

**The core insight:** chem.found.measurement introduced how to COUNT significant figures in a single reported number; this concept addresses the separate, commonly-confused question of how significant figures PROPAGATE through a calculation involving multiple measured numbers. The critical, most commonly missed distinction: addition and subtraction are governed by DECIMAL PLACES (not sig fig count), while multiplication and division are governed by SIG FIG COUNT (not decimal places) — applying the wrong rule to the wrong operation is the single most common error in this topic, and exact counted numbers (never measured, therefore infinitely precise) are exempt from both rules entirely.

**Conceptual chain:**
1. For addition/subtraction, the answer is limited by the LEAST number of decimal places among the numbers being combined — because you cannot claim more decimal-place precision in a sum than your least-precise addend actually supports.
2. For multiplication/division, the answer is limited by the LEAST number of significant figures among the numbers being combined — a completely different rule from addition/subtraction, based on relative precision rather than absolute decimal position.
3. Exact numbers (counted objects, or defined conversion constants like 12 inches per foot) have effectively INFINITE significant figures and never limit a calculation's precision.
4. Ambiguous zero cases (trailing zeros with no decimal point shown, e.g. "1200") remain genuinely ambiguous unless resolved via scientific notation — this concept extends chem.found.measurement's zero-counting rules into calculation contexts.

**Central relations:**
- Addition/subtraction -> limited by fewest DECIMAL PLACES among the addends.
- Multiplication/division -> limited by fewest SIGNIFICANT FIGURES among the factors.
- Exact (counted) numbers -> excluded from sig-fig limiting entirely (infinite precision assumed).

---

## 2. Four-Stage CPA+ Mental Model

### Concrete (Enactive)
- A column-addition worked example: 15.3 + 1.46 + 2.1, with each number's decimal-place reliability visually marked, showing the sum's precision is limited by 2.1's single decimal place.
- A counting-vs-measuring contrast: counting exactly 12 apples (exact, infinite sig figs) vs. weighing those apples on a balance reading 1.5 kg (measured, limited to 2 sig figs).

### Representational (Iconic)
- A two-rule comparison table: operation type (add/subtract vs. multiply/divide), limiting factor (decimal places vs. sig fig count), with a worked example for each row.
- A propagation diagram showing a multi-step calculation (e.g. a stoichiometry-style calculation) with the correct rounding rule applied at each individual step, not just at the final answer.

### Abstract (Symbolic)
- Addition/subtraction rule: answer's decimal places = MIN(decimal places of all addends).
- Multiplication/division rule: answer's sig figs = MIN(sig figs of all factors).
- Exact number rule: exact numbers contribute no limit to either rule.

### Transfer (+)
- Every laboratory calculation for the rest of the course (concentration, stoichiometric yield, gas-law calculations) requires correctly propagating significant figures through multi-step arithmetic.
- Engineering and manufacturing tolerance specifications depend on the identical precision-propagation logic.
- Scientific reporting standards across all quantitative fields require honest significant-figure propagation as a matter of professional integrity.

---

## 3. Why Beginners Fail

**Mode 1 — Applying the multiplication sig-fig-count rule to addition/subtraction:** Correct: addition and subtraction are governed by decimal places, not sig fig count — a completely different limiting criterion that must be checked separately for each operation type.

**Mode 2 — Treating all trailing zeros as insignificant regardless of decimal point presence:** Correct: trailing zeros before an explicit decimal point are ambiguous (not definitively insignificant); scientific notation resolves the ambiguity that ordinary notation cannot.

**Mode 3 — Applying sig-fig limits to exact (counted) numbers:** Correct: numbers obtained by counting discrete objects (or defined conversion constants) are exact and carry effectively infinite significant figures — they never limit a calculation's precision, unlike measured quantities.

---

## 4. Misconception Library

### MC-1: "Multiplication sig fig rule applies to addition"
- **Probe:** "Calculate 15.3 + 1.46 + 2.1. How many decimal places should the answer have? (NOT: how many sig figs?)"
- **Characteristic phrase:** "The answer has 2 sig figs because 2.1 has 2 sig figs."
- **Trigger:** Instruction-induced — students learn the multiplication rule (limited by sig fig count) first or most memorably, and over-apply it to addition, which follows a genuinely different rule.
- **Conflict evidence [P28]:** Column addition of 15.3 + 1.46 + 2.1 = 18.86 (raw sum) — but 2.1 is only reliable to the first decimal place (its second decimal digit is unknown), so the sum cannot honestly claim reliability beyond the first decimal place either. The correctly-rounded answer is 18.9 (one decimal place) — which happens to have 3 sig figs, NOT the 2 sig figs a (wrongly-applied) multiplication rule would suggest.
- **Bridge [P30]:** "Addition and subtraction ask a different question than multiplication and division: not 'how many total digits are trustworthy' but 'how far past the decimal point can I trust ANY of my numbers.' Write the column addition out and see that 2.1 has nothing reliable beyond its first decimal digit — so the sum can't either, regardless of how many total sig figs any individual number has."
- **Replacement [P31]:** Addition/subtraction answers are limited by the FEWEST decimal places among the addends, a rule entirely independent of total sig fig count.
- **Discrimination pairs [P33]:** 15.3 + 1.46 + 2.1 = 18.9 (correct, limited by 2.1's one decimal place) vs. a wrongly-applied "2 sig figs" answer of 19 (incorrectly reasoning from 2.1's total sig fig count instead of its decimal places).
- **S6 repair path:** Run the explicit column-addition demonstration (Section 2), marking each number's last reliable decimal digit, before returning to the probe.

### MC-2: "Trailing zeros before a decimal are significant"
- **Probe:** "How many significant figures does the number 1200 have? What if it were written as 1200.? What about 1.200 × 10³?"
- **Trigger:** Notation-induced — students either over-apply "all zeros count" or under-apply "no trailing zeros count," missing that this SPECIFIC case (trailing zeros, no decimal shown) is genuinely ambiguous.
- **Conflict evidence [P28]:** 1200 (no decimal point shown) could represent 2, 3, or 4 sig figs depending on unstated measurement context — genuinely ambiguous as written. 1200. (explicit decimal point) unambiguously has 4 sig figs, since the decimal point signals that all the zeros were deliberately measured, not merely placeholders. 1.200×10³ also unambiguously has 4 sig figs — scientific notation makes every written digit's significance explicit by construction.
- **Bridge [P30]:** "1200 without a decimal point is genuinely ambiguous — that's not a failure of the rules, it's exactly why scientific notation exists. Writing 1200. (with an explicit decimal point) or 1.200×10³ removes all ambiguity, making every digit's significance unambiguous. When you see bare '1200' with no decimal point, treat it as ambiguous unless the problem states otherwise."
- **Replacement [P31]:** Trailing zeros before an unstated decimal point are ambiguous, not automatically significant or insignificant; scientific notation resolves the ambiguity that ordinary notation cannot.
- **Discrimination pairs [P33]:** "1200" (ambiguous — 2, 3, or 4 sig figs depending on context) vs. "1.200×10³" (unambiguous — exactly 4 sig figs).
- **S6 repair path:** Re-write the ambiguous number in scientific notation with the intended precision made explicit, then re-apply the rule.

### MC-3: "Applying sig fig rules to exact numbers"
- **Probe:** "If you count 12 apples on a scale that reads 1.5 kg, what is the mass per apple to the correct sig figs?"
- **Trigger:** Instruction-induced — students apply sig-fig limiting rules uniformly to every number in a calculation, without checking whether a given number is a measured quantity (subject to sig fig limits) or an exact count (not subject to any limit).
- **Conflict evidence [P28]:** "12" here is a COUNT of discrete apples — an exact number with effectively infinite significant figures, since counting discrete objects has no inherent measurement uncertainty. Only the 1.5 kg balance reading (a genuine measurement, 2 sig figs) limits the final answer's precision.
- **Bridge [P30]:** "Before applying any sig-fig rule, ask: was this number MEASURED (with inherent uncertainty, subject to sig fig limits) or COUNTED/DEFINED (exact, infinite sig figs, never limits the calculation)? Here, 12 apples is an exact count; 1.5 kg is the only measured quantity, so it alone determines the final answer's precision: 1.5 kg ÷ 12 = 0.13 kg per apple, limited to 2 sig figs by the balance reading."
- **Replacement [P31]:** Exact (counted or defined) numbers carry no significant-figure limit and never constrain a calculation's precision; only measured quantities do.
- **Discrimination pairs [P33]:** "12 apples" (an exact count, infinite sig figs, never limits precision) vs. "1.5 kg" (a measured quantity, 2 sig figs, DOES limit the final answer).
- **S6 repair path:** Explicitly classify each number in the calculation as "measured" or "exact" before applying any sig-fig rule.

---

## 5. Explanation Library

**Explanation A — Two different rules for two different operations (procedural):**
"Addition and subtraction ask: how far past the decimal point can I trust ANY of my numbers? The answer is limited to the fewest decimal places among the addends. Multiplication and division ask a different question: how many total digits of relative precision do I actually have? The answer is limited to the fewest sig figs among the factors. These are genuinely different questions with genuinely different answers — always identify the operation type first, before applying either rule."

**Explanation B — Measured vs. exact numbers (conceptual):**
"Before applying any significant-figures rule, classify every number in your calculation: was it MEASURED with an instrument (which always has some inherent uncertainty, limited to a specific number of sig figs), or was it COUNTED/DEFINED (an exact value with no uncertainty at all, effectively infinite sig figs)? Only measured numbers ever limit a calculation's final precision."

---

## 6. Analogy Library

**Primary analogy — A team's weakest link:**
In addition/subtraction, the answer is only as precise (in decimal places) as your LEAST decimal-precise addend — exactly like a relay race where the team's total time is limited by its slowest runner's leg, not by the fastest. In multiplication/division, the same "weakest link" idea applies but measured in TOTAL sig fig count instead of decimal places — a genuinely different measure of "weakest."

**Breaking point:** A relay race's total time is a simple SUM of leg times; sig-fig propagation through multi-step calculations (combining both addition and multiplication in one problem) requires re-checking the weakest-link rule freshly at EACH individual step, not just once at the end — the analogy illustrates the "limited by the weakest" principle but not the step-by-step re-application requirement.

**Anti-analogy:** Do NOT describe "more digits in the calculator display" as "more precision achieved" — this reinforces the common downstream error of reporting a calculator's full raw output digit string without applying either propagation rule.

---

## 7. Demonstration Library

**Demo 1 — Column addition with decimal-place tracking:**
Walk through 15.3 + 1.46 + 2.1 explicitly, marking each number's last reliable decimal digit, arriving at the correctly-rounded 18.9, directly targeting MC-1.

**Demo 2 — Ambiguous zero resolution via scientific notation:**
Present 1200, 1200., and 1.200×10³ side by side with sig fig counts for each, directly targeting MC-2.

**Demo 3 — Measured vs. exact number classification:**
Present 3-4 mixed calculations (some involving counted objects, some involving only measured quantities) and have students classify each number before computing, directly targeting MC-3.

---

## 8. Discovery Lesson

**Opening (5 min):** "You've learned how to count sig figs in a single number. But what happens when you ADD three measured numbers together — does the same counting rule apply to the sum?"

**Exploration (15 min):**
- Run Demo 1 (column addition with decimal tracking), directly targeting MC-1.
- Build Explanation A (two different rules) step by step, contrasting addition against multiplication explicitly.

**Synthesis (10 min):**
- Run Demo 2 (ambiguous zero resolution), directly targeting MC-2.
- Run Demo 3 (measured vs. exact classification), directly targeting MC-3, then build Explanation B.

**Closure:** "Two rules, and one exemption: decimal places for addition/subtraction, sig fig count for multiplication/division, and exact numbers are exempt from both. Get the operation type and number type right first, and the rounding becomes mechanical."

---

## 9. Teaching Actions

*(session_cap = 4 actions)*

**TA-1 [DEMONSTRATE + EXPLAIN]:** Demo 1 (column addition) alongside Explanation A, directly probing MC-1.

**TA-2 [DEMONSTRATE]:** Demo 2 (ambiguous zero resolution), directly probing MC-2.

**TA-3 [DEMONSTRATE + EXPLAIN]:** Demo 3 (measured vs. exact classification) alongside Explanation B, directly probing MC-3.

**TA-4 [PRACTICE]:** Multi-step mixed-operation practice problems requiring both rules applied correctly in sequence.

---

## 10. Voice Teaching

**Opening:**
"You already know how to count sig figs in one number. But what happens when you add three different measured numbers together? Does the same rule apply to the total?"

**At the addition-vs-multiplication clarification:**
"Here's the split that trips almost everyone up at first: addition and subtraction care about decimal PLACES — how far past the decimal point can you actually trust any of your numbers. Multiplication and division care about total sig fig COUNT instead — a completely different question. Always ask which operation you're doing before you decide which rule applies."

**At the exact-number clarification:**
"Before you round anything, ask: was this number measured, or was it counted? Twelve apples sitting on a scale — that twelve is an exact count, no uncertainty at all, infinite sig figs. The scale reading is the only thing that actually limits your answer's precision."

---

## 11. Assessment

**Mastery gate:** Student correctly applies the decimal-places rule for addition/subtraction, correctly applies the sig-fig-count rule for multiplication/division, and correctly excludes exact numbers from both rules. Score ≥ 75%.

**FA-1 — Addition rule:**
*Q: Calculate 24.6 + 0.372 + 3.11 to the correct number of decimal places.*
Expected: Raw sum 28.082, rounded to 28.1 (one decimal place, limited by 24.6's single decimal place).
Threshold: Must correctly identify the limiting decimal-place count and round accordingly, not apply a sig-fig-count rule instead.

**FA-2 — Multiplication rule:**
*Q: Calculate 4.52 × 3.1 to the correct number of significant figures.*
Expected: Raw product 14.012, rounded to 14 (2 sig figs, limited by 3.1's 2 sig figs).
Threshold: Must correctly identify the limiting sig-fig count (not decimal places) and round accordingly.

**FA-3 — Exact number exemption:**
*Q: A sample contains exactly 25 identical tablets with a total measured mass of 12.4 g. What is the mass per tablet, to the correct sig figs?*
Expected: 12.4 g ÷ 25 = 0.496 g per tablet, limited to 3 sig figs by the 12.4 g measurement alone (25 is an exact count, not limiting).
Threshold: Must correctly exclude the exact count from limiting the answer's precision.

**Confidence calibration:** After FA-1, students rate confidence before revealing the answer; students confident but wrong are walked through Demo 1's column-addition tracking again before re-attempting a parallel item.

**Delayed retrieval (session + 3):** "Explain, using a specific example, why addition and multiplication use different significant-figure rules." Expected: addition/subtraction limited by decimal places; multiplication/division limited by sig fig count — genuinely different criteria.

---

## 12. Recovery Notes

**S3:** Student can state both rules but cannot identify which applies to a given calculation. Re-run Demo 1 vs. a parallel multiplication example side by side, explicitly naming the operation type first each time.

**S4:** Student applies sig-fig-count rule to an addition problem (MC-1). Re-run the column-addition decimal-tracking demonstration with the specific numbers causing difficulty.

**S6:** Student is anxious about "too many rules to keep straight." Anchor entirely in the single organizing question — "what operation am I doing, and is each number measured or exact?" — before applying either specific rule.

**S9:** Extend into multi-step calculations combining both addition and multiplication (requiring rule-switching mid-calculation) as enrichment, previewing stoichiometry's multi-step arithmetic demands.

---

## 13. Memory & Review

**Memory type:** Procedural (two distinct rounding rules, exact-number exemption) — retrieval practice should emphasize correctly identifying which rule applies to a novel calculation, not just reciting both rules abstractly.

**Spaced retrieval schedule:**
- Session + 1: "Apply the correct sig-fig rule to a given addition and a given multiplication problem."
- Session + 3: "Classify given numbers in a calculation as measured or exact."
- Session + 7: "Perform a multi-step calculation requiring both rules applied in sequence."

**Interleaving partners:** chem.found.measurement (prerequisite — single-number sig-fig counting, unit conversion), chem.found.mole-concept (sibling — mole calculations require correct sig-fig propagation), chem.found.stoichiometry (future — multi-step calculations depend on this fluency).

---

## 14. Transfer Map

**Near transfer:** Mole concept and stoichiometry calculations (both already in this curriculum wave or immediately following) require fluent sig-fig propagation through multi-step mass/mole/particle conversions.

**Far transfer:** Every quantitative laboratory report across all of science and engineering requires honest significant-figure propagation as a matter of professional integrity; manufacturing tolerance specifications depend on the identical precision-propagation logic.

**Structural abstraction:** "The precision of a calculated result can never honestly exceed the precision of its least-precise INPUT — and different arithmetic operations propagate that limit through different specific mechanisms (decimal places vs. relative precision)." This "output cannot exceed input precision" principle recurs throughout quantitative science as a form of intellectual honesty about uncertainty.

---

## 15. Curriculum Feedback

- **Prerequisite adequacy:** chem.found.measurement (single-number sig-fig counting) is necessary and sufficient — this concept directly extends that single-number skill into calculation-propagation contexts.
- **Unlock readiness:** No direct unlocks listed in the KG for this concept, though it is a load-bearing prerequisite skill for chem.found.mole-concept and chem.found.stoichiometry's calculations (not formally KG-linked, a minor curriculum-feedback note).
- **Difficulty calibration:** Foundational/Apply at 0.75 mastery threshold is appropriate — correctly identifying and applying the right rule to a novel calculation requires genuine procedural application, matching the Apply Bloom level and the higher-than-typical mastery bar.
- **No open issues:** description and prerequisites are internally consistent with the Chemistry KG's Foundations domain; the absence of listed KG unlocks despite this concept's clear downstream relevance to mole/stoichiometry calculations is noted as a possible KG cross-link gap, not fixed here (no KG file modified).

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
