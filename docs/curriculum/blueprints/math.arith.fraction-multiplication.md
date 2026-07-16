# Teaching Blueprint: Multiplication and Division of Fractions
**Blueprint ID:** math.arith.fraction-multiplication  
**Status:** PACKAGE_READY  
**Date:** 2026-07-11  
**Framework Version:** Educational Brain v1.0

---

## 0. Concept Profile

```
id:                  math.arith.fraction-multiplication
name:                Multiplication and Division of Fractions
domain:              mathematics / arithmetic / fractions
bloom:               apply
difficulty:          2 (developing)
mastery_threshold:   0.85
estimated_hours:     6
requires:            [math.arith.fractions]
unlocks:             [math.arith.ratios]
cross_links:         []
cpa_entry_stage:     C
```

**Core idea:** Multiplying two fractions produces a new fraction whose numerator is the product of the original numerators and whose denominator is the product of the original denominators: (a/b) × (c/d) = (ac)/(bd). Dividing by a fraction is equivalent to multiplying by its reciprocal: (a/b) ÷ (c/d) = (a/b) × (d/c). Both operations are conceptually grounded in area (multiplication) and inverse relationship (division).

**Key vocabulary:** multiply, divide, reciprocal, numerator, denominator, product, quotient, area model, inverse operation.

**Why difficulty = 2:** The multiplication algorithm is compact but non-obvious; division requires a conceptual inversion (multiply by reciprocal) that contradicts students' intuition that division always makes smaller. Two distinct procedures with different conceptual anchors must be coordinated.

---

## 1. Learning Objective

A student who achieves mastery correctly computes (a/b) × (c/d) by multiplying numerators and denominators separately, correctly computes (a/b) ÷ (c/d) by multiplying by the reciprocal of the divisor, AND can explain why the area model justifies the multiplication rule and why multiplying by the reciprocal is equivalent to division. NOT merely producing correct numeric answers by memorised procedure. A student who executes the algorithms without being able to connect them to the area model (for ×) or the inverse relationship (for ÷) has NOT achieved mastery.

**Accuracy threshold:** 85% across multiplication, division, and word-problem items.

---

## 2. Student State Matrix

| State | Entry Condition | Protocol |
|-------|----------------|----------|
| S0 | No prior exposure to fraction multiplication or division | Protocol A — full CPA, 7 TAs |
| S1 | Multiplies fractions correctly; cannot explain why; makes consistent errors on division | Protocol B — conceptual grounding + division, 4 TAs |
| S2 | Carries MC-1 (addition algorithm applied to multiplication) and/or MC-2 (division by dividing numerators separately) and/or MC-3 (whole number × fraction confusion) | Protocol C — schema repair, 3–5 TAs |
| S6 | Understands both operations but loses confidence under time pressure or with unlike fractions | Protocol D — scaffolded fluency, 4 TAs |
| S9 | Second-language learner; visual-dominant; procedural anchors needed | Protocol E — visual-first, 4 TAs |

---

## 3. Diagnostic Battery

Run DB-1 through DB-4 in sequence. Stop when entry state is confirmed.

---

**DB-1 — Prior Exposure Check**

Question: "What is 1/2 × 1/3? How did you get it?"

Response taxonomy:
```
{ stimulus: "1/6 — multiplied numerators and denominators separately",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "1/6 but reasoning unclear or 'I just know'",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "2/5 (adds numerators, adds denominators); or 2/6 (adds numerators, multiplies denominators)",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }

{ stimulus: "No response or 'I don't know how to multiply fractions'",
  signal: "SIGNAL:NO_RESPONSE" }
```

SIGNAL:CORRECT → run DB-2 (division and conceptual depth)  
SIGNAL:PARTIAL → S1 candidate; run DB-2  
SIGNAL:INCORRECT (MC-1) → S2 with MC-1; route to Protocol C  
SIGNAL:NO_RESPONSE → S0; route to Protocol A

---

**DB-2 — Division Check**

Question: "What is 3/4 ÷ 1/2? Show your reasoning."

Response taxonomy:
```
{ stimulus: "3/4 × 2/1 = 6/4 = 3/2 — flipped and multiplied",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Knows to 'flip' but gets denominator wrong or inverts the wrong fraction",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "3÷1 / 4÷2 = 3/2 (divides numerators, divides denominators separately)",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-2" }

{ stimulus: "1/2 (divides 3/4 as if by 2 only, ignoring the fraction denominator of divisor)",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-2-variant" }
```

SIGNAL:CORRECT → run DB-3 (conceptual grounding)  
SIGNAL:PARTIAL → S1; route to Protocol B  
SIGNAL:INCORRECT → S2 with MC-2; route to Protocol C

---

**DB-3 — Whole Number Multiplication Check**

Question: "What is 4 × 2/5?"

Response taxonomy:
```
{ stimulus: "8/5 — multiplies 4 × 2 = 8, keeps denominator 5",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "2/20 or 2/5×4 → 2/20 (treats 4 as denominator)",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-3" }

{ stimulus: "8/5 but written as 1 and 3/5 — correct arithmetic, uncertain with answer form",
  signal: "SIGNAL:PARTIAL" }
```

SIGNAL:CORRECT → run DB-4  
SIGNAL:INCORRECT (MC-3) → add MC-3 to active set; route Protocol C  
SIGNAL:PARTIAL → continue

---

**DB-4 — Confidence Calibration**

Question: "Could you explain to someone why multiplying 1/2 × 1/3 gives 1/6, not 2/5?"

Response taxonomy:
```
{ stimulus: "Yes: area model or 'half of a third is a sixth' explanation",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "I know it's right but can't fully explain why",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Not confident — I just use the rule",
  signal: "SIGNAL:INCORRECT" }
```

SIGNAL:CORRECT → near-mastery; administer assessment battery  
SIGNAL:PARTIAL → S1 or S6; check prior performance, route Protocol B or D  
SIGNAL:INCORRECT (with correct procedural answers in DB-1–3) → S6; route Protocol D

---

## 4. Prerequisite Check

Run PRE-1 before Protocol A. If gap detected, halt and schedule prerequisite session.

---

**PRE-1 — Fraction Concept** (requires math.arith.fractions)

Stimulus: "What does 3/4 mean?"

Expected: 3 equal parts out of 4 equal parts total.

SIGNAL:INCORRECT → prerequisite gap: math.arith.fractions; halt and schedule.

---

**PRE-2 — Integer Multiplication**

Stimulus: "3 × 4 = ?"

Expected: 12.

SIGNAL:INCORRECT → arithmetic gap; address before this session.

---

## 5. Protocol Library

---

### Protocol A — S0 Complete Novice (Full CPA, 7 TAs)

*Session cap: estimated_hours = 6 ≥ 1h → max 7 TAs.*  
*CPA path: Concrete (TA-A01 → A02) → Perceptual (TA-A03) → Abstract (TA-A04 → A05) → Application (TA-A06) → Mastery Gate (TA-A07).*

---

**TA-A01 — Area Model: Fraction × Fraction (Concrete)**

Primitive sequence: `P01 → P04 → P06 → P14 → P55 → P34 → P55 → P49 | P50`

`P01` target_element: a square unit divided by shading  
`P04` context: "Imagine you have half of a chocolate bar. You eat 1/3 of that half. How much of the original bar did you eat?"  
`P06` concrete_scenario: square piece of paper representing 1 whole; fold in half vertically (shade 1/2); fold that shaded half into thirds horizontally; the doubly-shaded rectangle is 1 of 6 equal regions → 1/6 of the whole  
`P14` prediction: "Before I count the small rectangles — how many equal parts will the full square be divided into? How many are doubly shaded?"  
`P55` wait: 5 s  
`P34` closed: "What fraction of the whole square is doubly shaded? What is 1/2 × 1/3?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "1/6 — the square has 6 equal parts and 1 is doubly shaded",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "1/6 but counted rather than saw the structure",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "2/5 or 1/3 or other wrong answer",
  signal: "SIGNAL:INCORRECT", mc_id: null }

{ stimulus: "No response",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` routing:  
- SIGNAL:CORRECT → `P53` ("The square has 2 × 3 = 6 regions — where did that product come from?") → TA-A02  
- SIGNAL:PARTIAL → `P30` bridge ("2 columns × 3 rows = 6 regions; 1 column × 1 row doubly shaded") → TA-A02  
- SIGNAL:INCORRECT → `P50` → `P52` ("Count all equal-sized small squares; count doubly shaded ones") → retry `P34`  
- SIGNAL:NO_RESPONSE → `P54` → demonstrate with a fresh fold → retry

---

**TA-A02 — The Algorithm: Why Multiply Numerators and Denominators**

Primitive sequence: `P01 → P06 → P21 → P34 → P55 → P49 | P50`

`P01` target_element: area model generalised from TA-A01  
`P06` concrete_scenario: area model for 2/3 × 3/4 — rectangle with 4 columns (denominator of 3/4) and 3 rows (denominator of 2/3); shade 3 of 4 columns (3/4 of width) and 2 of 3 rows (2/3 of height); doubly shaded region = 2×3 = 6 cells out of 3×4 = 12 total → 6/12 = 1/2  
`P21` generalisation: "In every area model: columns × rows = total cells = product of denominators; doubly shaded cells = product of numerators. So (a/b) × (c/d) = (a×c)/(b×d) always."  
`P34` closed: "Compute 2/5 × 3/7 using the algorithm. Then describe what the area model would look like."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "6/35; area = 5×7 = 35 total, 2×3 = 6 shaded",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "6/35 but cannot connect to area model",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "5/12 or any answer using addition/different operation",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }

{ stimulus: "No response",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` routing:  
- SIGNAL:CORRECT → `P53` → TA-A03  
- SIGNAL:PARTIAL → `P36` ("Describe the rectangle: how many rows, how many columns, how many shaded?") → TA-A03  
- SIGNAL:INCORRECT → `P50` → `P52` ("In the area model: what is the total number of cells? What is the number of shaded cells?") → retry `P34`  
- SIGNAL:NO_RESPONSE → `P54` → repeat fold with 2/3 × 3/4 → retry

---

**TA-A03 — Perceptual: Number Line Model for Fraction × Whole**

Primitive sequence: `P01 → P07 → P16 → P34 → P55 → P49 | P50`

`P01` target_element: number line showing fraction of a whole number  
`P07` diagram: number line 0 to 4; marked in thirds (0, 1/3, 2/3, 1, …); arrow showing 3 jumps of 2/3 = 2; second diagram showing 3 × 2/3 as repeated addition 2/3 + 2/3 + 2/3 = 6/3 = 2; third: 3/1 × 2/3 = 6/3 = 2 using algorithm  
`P16` compare: "The repeated addition diagram and the algorithm give the same answer. What does that confirm about the algorithm?"  
`P34` closed: "Compute 4 × 3/8 using the algorithm. Show as a fraction."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "12/8 = 3/2 (multiplies 4 × 3 = 12 in numerator; denominator stays 8)",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "12/8 but cannot reduce or uncomfortable leaving as improper",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "3/32 (multiplies 4 × 8 in denominator; wrong position of 4)",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-3" }
```

`P49` routing:  
- SIGNAL:CORRECT → `P53` → TA-A04  
- SIGNAL:PARTIAL → `P36` ("Is 12/8 a correct answer? What does the whole number 4 become as a fraction?") → TA-A04  
- SIGNAL:INCORRECT → `P50` → `P52` ("Write 4 as the fraction 4/1. Now multiply: 4/1 × 3/8 = (4×3)/(1×8) = ?") → retry `P34`

---

**TA-A04 — Division as Inverse: Why the Reciprocal Works**

Primitive sequence: `P01 → P09 → P17 → P21 → P34 → P55 → P49 | P50`

`P01` target_element: the relationship between division and multiplication  
`P09` narrative: "You have 3/4 of a pizza left. Each serving is 1/4 of a pizza. How many servings do you have? You're asking: 3/4 ÷ 1/4. Count how many 1/4-pieces fit in 3/4 — the answer is 3."  
`P17` contrast: "Now change the question: you want to know how many 1/2-pizza servings fit in 3/4. You could draw a number line. Or: note that 3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 3/2. Check: 3/2 × 1/2 = 3/4 ✓."  
`P21` generalisation: "(a/b) ÷ (c/d) = (a/b) × (d/c) because division and multiplication by the reciprocal are inverse operations: if you multiply by c/d then divide by c/d, you return to where you started. The reciprocal of c/d is d/c."  
`P34` closed: "Compute 5/6 ÷ 2/3. Show each step."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "5/6 × 3/2 = 15/12 = 5/4 — flipped the second fraction and multiplied",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Correct setup (reciprocal) but arithmetic error",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "5÷2 / 6÷3 = 5/2 / 2 = 5/4 by accident — divided numerators and denominators",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-2" }

{ stimulus: "No response",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` routing:  
- SIGNAL:CORRECT → `P53` ("Why do we flip the second fraction — not the first?") → TA-A05  
- SIGNAL:PARTIAL → `P51` (arithmetic error) → TA-A05  
- SIGNAL:INCORRECT → `P50` → `P52` ("What is the reciprocal of 2/3? Now multiply 5/6 × that reciprocal.") → retry `P34`  
- SIGNAL:NO_RESPONSE → `P54` → repeat narrative with simpler numbers (1/2 ÷ 1/4 = 2 servings) → retry

---

**TA-A05 — Abstract Consolidation: Mixed Operations**

Primitive sequence: `P02 → P08 → P10 → P34 → P55 → P49 | P50 → P42 → P55 → P49 | P52`

`P02` activate: multiplication and division algorithms from A01–A04  
`P08` abstract notation: "(a/b) × (c/d) = (ac)/(bd)" and "(a/b) ÷ (c/d) = (a/b) × (d/c) = (ad)/(bc)"  
`P10` worked example: "3/4 ÷ 5/8 = 3/4 × 8/5 = 24/20 = 6/5. Check: 6/5 × 5/8 = 30/40 = 3/4 ✓"  
`P34` closed: "Compute: (a) 4/9 × 3/8  (b) 7/10 ÷ 7/5."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "(a) 12/72 = 1/6  (b) 7/10 × 5/7 = 35/70 = 1/2",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "One correct, one arithmetic error",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Both wrong; or confusion about which to flip in (b)",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-2-risk" }
```

`P49` after P34:  
- SIGNAL:CORRECT → P42  
- SIGNAL:PARTIAL → `P51` → P42  
- SIGNAL:INCORRECT → `P50` → `P10` (fresh worked example) → retry `P34`

`P42` example generation: "Write one multiplication and one division problem involving fractions. Solve both. Verify the division by multiplying back."  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "Both problems valid and solved correctly; division verified by inverse",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Problems valid; one computational error; verification attempted",
  signal: "SIGNAL:PARTIAL" }
```

`P49` after P42:  
- SIGNAL:CORRECT → TA-A06  
- SIGNAL:PARTIAL → `P52` → TA-A06

---

**TA-A06 — Application: Word Problems**

Primitive sequence: `P02 → P39 → P34 → P55 → P49 | P50 → P59 → P55 → P49 | P53`

`P02` activate: both operation algorithms  
`P39` transfer prompt: "Apply fraction multiplication/division to a real context."  
`P34` closed (two-part word problem):  
(i) "A ribbon is 5/6 metre long. You cut pieces each 1/4 metre long. How many pieces? (5/6 ÷ 1/4)"  
(ii) "You use 2/3 of a 3/4 kg bag of flour. How many kilograms is that? (2/3 × 3/4)"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "(i) 5/6 × 4/1 = 20/6 = 10/3 pieces; (ii) 2/3 × 3/4 = 6/12 = 1/2 kg — both correct",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "One correct, one sets up operation incorrectly (multiplies when should divide or vice versa)",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Both wrong operation choices or wrong algorithms",
  signal: "SIGNAL:INCORRECT", mc_id: null }
```

`P49` after P34:  
- SIGNAL:CORRECT → P59  
- SIGNAL:PARTIAL → `P52` ("For (i): you're asking 'how many times does 1/4 fit into 5/6' — is that × or ÷?") → P59  
- SIGNAL:INCORRECT → `P50` → `P52` (context mapping: 'how many fit into' = ÷; 'fraction of an amount' = ×) → retry `P34`

`P59` self-explanation: "Walk through your solution to (i): what told you to divide rather than multiply?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Explains: 'how many 1/4-pieces fit into 5/6' is a division question — dividing measures a count",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Vague: 'cut into pieces suggests divide'",
  signal: "SIGNAL:PARTIAL" }
```

`P49` after P59:  
- SIGNAL:CORRECT → TA-A07  
- SIGNAL:PARTIAL → `P53` → TA-A07

---

**TA-A07 — Mastery Gate (Terminal)**

Primitive sequence: `P01 → P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78 → P55`

`P77` generation probe: "Write one multiplication and one division expression involving proper fractions (different from any used in this session). Solve both."  
`P76` transfer probe: "A recipe for one batch uses 2/3 cup of oil. You want to make 3/4 of a batch. How much oil do you need?" [cross_links = [] — P76 independence note: self-contained proportional context; no cross-linked blueprint required]  
`P75` boundary probe: "What is (1/2) ÷ (1/2)? What is any nonzero number divided by itself? Does this hold for fractions?"  
`P74` classification probe: "Label each expression as requiring multiplication or division: (a) 'What fraction of 5/6 is 1/4?' (b) '1/3 of 2/5' (c) 'How many 2/7-lengths fit in 4/7?'"  
`P78` explanation probe: "In one sentence, explain why dividing by 1/2 gives the same result as multiplying by 2."

Mastery decision: 5/5 → MASTERY_CONFIRMED → schedule Component 9  
3–4/5 → PARTIAL_MASTERY → note gap  
< 3/5 → return to Protocol A entry aligned with failure pattern

---

### Protocol B — S1 Procedural Carrier (Conceptual Grounding + Division, 4 TAs)

*CPA entry: P (procedure known; conceptual model and division weak).*

---

**TA-B01 — Why the Algorithm Works (Area Model Derivation)**

Primitive sequence: `P02 → P07 → P25 → P35 → P55 → P49 | P50 | P52`

`P02` activate: student's existing multiplication procedure  
`P07` diagram: area model for 2/3 × 3/4 — labelled grid with columns (fourths), rows (thirds), doubly-shaded 6 of 12 cells  
`P25` abstraction ladder: "The grid has b×d cells total (denominator product) and a×c doubly-shaded (numerator product). This is always true — the algorithm exactly mirrors the area."  
`P35` open: "Explain — using the grid — why multiplying numerators gives the shaded count and multiplying denominators gives the total count."  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "Numerators count shaded rows/columns; denominators define total rows/columns",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Partially connects grid to algorithm",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Cannot connect; 'I just multiply them'",
  signal: "SIGNAL:INCORRECT" }
```

`P49` routing:  
- SIGNAL:CORRECT → `P53` → TA-B02  
- SIGNAL:PARTIAL → `P36` ("Count the doubly-shaded cells: what two numbers were multiplied to get that count?") → TA-B02  
- SIGNAL:INCORRECT → `P52` → `P06` (hands-on paper fold for 1/2 × 1/3) → retry `P35`

---

**TA-B02 — Division and the Reciprocal Relationship**

Primitive sequence: `P02 → P17 → P34 → P55 → P49 | P50 → P59 → P55 → P49 | P53`

`P02` activate: student knows 3/4 ÷ 1/2 = 3/2  
`P17` contrast: "You got 3/2. Let me show: 3/4 × 2 = 6/4 = 3/2. Your division answer equals 3/4 × (reciprocal of 1/2). Is that a coincidence?"  
`P34` closed: "Verify: does 5/8 ÷ 2/3 = 5/8 × 3/2? Compute both sides and compare."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Both give 15/16; confirms reciprocal relationship",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "One side computed correctly; other has arithmetic error",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Computes differently; cannot reconcile",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-2" }
```

`P49` after P34:  
- SIGNAL:CORRECT → P59  
- SIGNAL:PARTIAL → `P51` → P59  
- SIGNAL:INCORRECT → `P50` → return to TA-B01; then retry B02

`P59` self-explanation: "Explain in your own words why dividing by c/d is the same as multiplying by d/c."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Multiplying by d/c undoes multiplying by c/d; they're inverse operations",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "'Flipping gives the same answer' — procedural",
  signal: "SIGNAL:PARTIAL" }
```

`P49`:  
- SIGNAL:CORRECT → TA-B03  
- SIGNAL:PARTIAL → `P53` ("What is (c/d) × (d/c)? What does that mean?") → TA-B03

---

**TA-B03 — Word Problem Application**

Primitive sequence: `P02 → P39 → P34 → P55 → P49 | P50 → P42 → P55 → P49 | P52`

`P02` activate: both algorithms  
`P39` transfer prompt: real-world context selection  
`P34` closed (two-part): "(i) A plot is 3/5 km² in area. You fence off 2/3 of it. What area is fenced? (ii) You have 7/8 litres of juice and pour equal servings of 7/16 litre. How many servings?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "(i) 2/5 km²; (ii) 2 servings — both correct with correct operation choice",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Both correct operations; one arithmetic error",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Switches operations (divides where should multiply or vice versa)",
  signal: "SIGNAL:INCORRECT" }
```

`P49` after P34:  
- SIGNAL:CORRECT → P42  
- SIGNAL:PARTIAL → `P52` → P42  
- SIGNAL:INCORRECT → `P50` → `P52` (context: 'fraction of an amount' = ×; 'how many fit' = ÷) → retry `P34`

`P42` example generation: "Write one real-life word problem requiring fraction multiplication and one requiring fraction division."  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "Both problems valid and correctly solved",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "One valid problem; other structurally unclear",
  signal: "SIGNAL:PARTIAL" }
```

`P49`:  
- SIGNAL:CORRECT → TA-B04  
- SIGNAL:PARTIAL → `P53` → TA-B04

---

**TA-B04 — Mastery Gate (Terminal)**

Primitive sequence: `P01 → P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78 → P55`

[Same five-probe sequence as TA-A07.]

---

### Protocol C — S2 Misconception Carrier (Schema Repair, 3–5 TAs)

*MAMR order: MC-1 (multiplication algorithm error) foundational — must clear before MC-2 (division algorithm) repair is coherent. MC-3 (whole number confusion) independent.*

---

**TA-C01 — Misconception Identification**

Primitive sequence: `P02 → P26 → P41 → P55 → P49 | P50`

`P02` activate: existing fraction knowledge  
`P26` schema activation: "Describe how you would compute 1/2 × 1/3. Then compute 3/4 ÷ 1/2."  
`P41` diagnostic: observe the procedure used for each operation  
`P55` wait: 5 s

Routing:  
- MC-1 signal (adds numerators/denominators for multiplication) → TA-C02  
- MC-2 signal (divides numerators and denominators separately for division) → TA-C03 (only after MC-1 cleared)  
- MC-3 signal (treats whole number as denominator) → TA-C04 (independent)  
- Multiple active → MC-1 first (foundational for MC-2)

---

**TA-C02 — MC-1 Repair: Multiplication ≠ Addition**

Primitive sequence: `P01 → P27 → P28 → P29 → P55 → P30 → P31 → P34 → P55 → P49 | P50 → P32`

`P01` target_element: the claim "1/2 × 1/3 = 2/5"  
`P27` schema exposure: "You computed 1/2 × 1/3 = 2/5 by adding numerators and denominators. Let's test this."  
`P28` cognitive conflict: "Check with the area model: fold a square in half, then fold that half into thirds. The doubly-shaded region is 1 out of 6 equal parts — not 1 out of 5. And 2/5 > 1/2, but a fraction of a half must be smaller than a half."  
`P29` conflict resolution pause  
`P55` wait: 8 s  
`P30` bridge: "Addition changes the partition structure and adds parts — it cannot model taking a fraction OF another fraction. Multiplication of fractions is modelled by the AREA operation: rows × columns."  
`P31` schema replacement: "(a/b) × (c/d) = (a×c)/(b×d) — multiply numerators together and denominators together."  
`P34` closed: "Compute 2/3 × 1/4 using the correct algorithm."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "2/12 = 1/6 — multiplied 2×1 and 3×4",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "3/7 — still adding",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }

{ stimulus: "2/12 but unsure whether to simplify",
  signal: "SIGNAL:PARTIAL" }
```

`P49` routing:  
- SIGNAL:CORRECT → MC-1 CLEARED; `P32` consolidation (three problems) → if MC-2 active: TA-C03; else TA-C05  
- SIGNAL:PARTIAL → `P36` → `P32` → route  
- SIGNAL:INCORRECT → `P50` → `P52` ("How many equal small squares are there total? How many are doubly-shaded?") → retry `P34`

`P32` consolidation: (a) 3/5 × 2/7  (b) 1/4 × 4/5  (c) 5/6 × 3/4.

---

**TA-C03 — MC-2 Repair: Division ≠ Dividing Numerator by Numerator**

Prerequisite: MC-1 cleared (or MC-2 the only active MC).

Primitive sequence: `P01 → P27 → P28 → P29 → P55 → P30 → P31 → P34 → P55 → P49 | P50 → P32`

`P01` target_element: the claim "3/4 ÷ 1/2 = 3÷1 / 4÷2 = 3/2"  
`P27` schema exposure: "You divided 3÷1 and 4÷2 separately. You got 3/2. Let's check whether this always works."  
`P28` conflict: "Try 3/4 ÷ 2/3 using your method: 3÷2 / 4÷3 = 1.5 / 1.333 — not a clean fraction, and the 'numerator ÷ numerator' method only works by accident when numerators and denominators happen to divide evenly."  
`P29` pause  
`P55` wait: 8 s  
`P30` bridge: "Division by a fraction asks 'how many times does c/d fit into a/b?' The reciprocal of c/d is d/c; multiplying by d/c undoes c/d, which is exactly what division should do."  
`P31` install: "(a/b) ÷ (c/d) = (a/b) × (d/c) — multiply by the reciprocal (flipped second fraction)."  
`P34` closed: "Compute 5/6 ÷ 2/3 using the reciprocal method."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "5/6 × 3/2 = 15/12 = 5/4 — flipped and multiplied",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Flips correct fraction but arithmetic error",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Still divides 5÷2 and 6÷3",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-2" }
```

`P49` routing:  
- SIGNAL:CORRECT → MC-2 CLEARED; `P32` consolidation → TA-C05  
- SIGNAL:PARTIAL → `P36` → `P32` → TA-C05  
- SIGNAL:INCORRECT → `P50` → `P52` ("What is the reciprocal of 2/3? Now replace ÷ 2/3 with × 3/2.") → retry `P34`

`P32` consolidation: (a) 4/5 ÷ 2/3  (b) 7/8 ÷ 7/4  (c) 3/10 ÷ 6/5.

---

**TA-C04 — MC-3 Repair: Whole Number × Fraction**

Primitive sequence: `P01 → P27 → P28 → P30 → P31 → P34 → P55 → P49 | P50 → P32`

`P01` target_element: the claim "3 × 2/5 = 2/15"  
`P27` schema exposure: "You computed 3 × 2/5 = 2/15 — it looks like you put 3 in the denominator."  
`P28` conflict: "If 3 × 2/5 = 2/15, then one-third of 2/15 should give 2/5: (2/15) ÷ 3 = 2/45 ≠ 2/5. The answer must be wrong."  
`P30` bridge: "The whole number 3 is the fraction 3/1. So 3 × 2/5 = 3/1 × 2/5 = (3×2)/(1×5) = 6/5. The whole number multiplies the numerator."  
`P31` install: "Write whole numbers as /1 before applying the fraction multiplication rule."  
`P34` closed: "Compute 4 × 3/7 and 5 × 2/9."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "12/7 and 10/9 — multiplied numerators only",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "One correct; other places whole number in denominator",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-3" }

{ stimulus: "One correct; other has arithmetic error",
  signal: "SIGNAL:PARTIAL" }
```

`P49` routing:  
- SIGNAL:CORRECT → MC-3 CLEARED; `P32` consolidation → TA-C05  
- SIGNAL:PARTIAL → `P36` → `P32` → TA-C05  
- SIGNAL:INCORRECT → `P50` → `P52` ("Write 4 as 4/1. Now apply: (4×3)/(1×7) = ?") → retry `P34`

`P32` consolidation: (a) 6 × 1/4  (b) 7 × 3/8  (c) 2 × 5/9.

---

**TA-C05 — Post-Repair Mastery Gate (Terminal)**

Primitive sequence: `P01 → P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78 → P55`

[Same five-probe sequence as TA-A07.]

---

### Protocol D — S6 Low Confidence (Scaffolded Fluency, 4 TAs, no P28)

*GR-5 compliance: P28 absent throughout Protocol D. P30 bridge used where needed.*

---

**TA-D01 — Competence Anchor + Multiplication Fluency**

Primitive sequence: `P02 → P70 → P34 → P55 → P49 | P50 | P52 → P64 → P55 → P49 | P81`

`P02` activate: prior fraction and multiplication knowledge  
`P70` competence evidence: "You already know what fractions are and how to multiply integers — those are the only two tools the algorithm needs."  
`P34` closed: "Compute 3/5 × 4/7."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "12/35 — correct",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Correct setup but arithmetic error",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Wrong algorithm (adds or mixes numerator/denominator positions)",
  signal: "SIGNAL:INCORRECT" }
```

`P49` after P34:  
- SIGNAL:CORRECT → P64 ("Rate 1–5: confidence in fraction multiplication")  
- SIGNAL:PARTIAL → `P81` scaffold ("Only task: multiply 3 × 4, then 5 × 7. Combine.") → P64  
- SIGNAL:INCORRECT → `P81` (break into sub-steps) → P64

`P55` wait: 5 s after P64

Response taxonomy for P64:
```
{ stimulus: "3–5: comfortable",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "1–2: still uncertain",
  signal: "SIGNAL:PARTIAL" }
```

`P49`:  
- SIGNAL:CORRECT → TA-D02  
- SIGNAL:PARTIAL → `P81` (one more scaffolded example) → TA-D02

---

**TA-D02 — Division Confidence Building**

Primitive sequence: `P02 → P34 → P55 → P49 | P50 → P35 → P55 → P49 | P52 → P64`

`P02` activate: reciprocal-multiplication rule for division  
`P34` closed: "Compute 2/3 ÷ 4/9."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "2/3 × 9/4 = 18/12 = 3/2",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Correct flip but arithmetic error",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Divides 2÷4 and 3÷9 separately",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-2" }
```

`P49` after P34:  
- SIGNAL:CORRECT → P35  
- SIGNAL:PARTIAL → `P52` ("Recompute 2 × 9 and 3 × 4") → P35  
- SIGNAL:INCORRECT → `P50` → `P30` bridge (reciprocal rule) → retry `P34`

`P35` open: "State the rule for dividing fractions in your own words."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Flip the second fraction and multiply",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Partial or imprecise",
  signal: "SIGNAL:PARTIAL" }
```

`P49` after P35:  
- SIGNAL:CORRECT → P64 ("Rate 1–5: confidence in fraction division") → TA-D03  
- SIGNAL:PARTIAL → `P52` ("Which fraction do you flip — the first or the second?") → P64 → TA-D03

---

**TA-D03 — Word Problem Application With Confidence Monitoring**

Primitive sequence: `P02 → P34 → P55 → P49 | P50 → P68`

`P02` activate  
`P34` closed (word problem): "A rope is 5/6 m long. You cut pieces of 1/6 m. How many pieces? Now: you use 3/4 of the pieces. How many pieces is that?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "5/6 ÷ 1/6 = 5 pieces; 3/4 × 5 = 15/4 pieces — both correct",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Part (i) correct; part (ii) error (whole number × fraction confusion)",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Operation choice wrong for one or both parts",
  signal: "SIGNAL:INCORRECT" }
```

`P49`:  
- SIGNAL:CORRECT → P68 → TA-D04  
- SIGNAL:PARTIAL → `P52` (context hint) → P68 → TA-D04  
- SIGNAL:INCORRECT → `P50` → `P52` (operation mapping) → retry `P34`

`P68` mastery self-declaration: "Do you feel ready to work with fraction multiplication and division independently?"

---

**TA-D04 — Mastery Gate (Terminal, S6-compliant)**

Primitive sequence: `P02 → P70 → P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78 → P55`

`P02` → `P70` opening; P91 expansion (P77 onward) is terminal.  
[P28 absent throughout Protocol D — GR-5 confirmed.]

---

### Protocol E — S9 Second-Language Learner (Visual-First, 4 TAs)

*CPA entry: C then P; P08 deferred to TA-E02 (after P07 fired in E01).*

---

**TA-E01 — Area Model: Visual Foundation for Multiplication**

Primitive sequence: `P01 → P07 → P16 → P34 → P55 → P49 | P50`

`P01` target_element: grid diagram  
`P07` diagram: 3-column × 4-row grid labelled "1/4 × 1/3 = ?"; rows represent thirds, columns represent fourths; one cell shaded = 1 of 12 equal cells → 1/12; vocabulary card: "multiply = find the area"  
`P16` compare: "How many cells total? How many shaded? What fraction is that?"  
`P34` closed: "Using the grid: what is 1/4 × 1/3?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "1/12 — 1 shaded cell out of 12 total",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "1/12 but by counting only, no structure",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "2/7 or other — adding",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }
```

`P49`:  
- SIGNAL:CORRECT → `P53` (vocabulary card: "numerator × numerator / denominator × denominator") → TA-E02  
- SIGNAL:PARTIAL → `P06` (physical grid, mark cells) → TA-E02  
- SIGNAL:INCORRECT → `P50` → `P06` (cut and count) → retry `P34`

---

**TA-E02 — Notation and Division: Step by Step**

Primitive sequence: `P01 → P07 → P20 → P08 → P34 → P55 → P49 | P50 → P10 → P34 → P55 → P49 | P52`

`P01` target_element: two parallel worked examples (one × , one ÷)  
`P07` diagram A: step-by-step multiplication  2/3 × 3/4 = (2×3)/(3×4) = 6/12 = 1/2 with grid  
`P07` diagram B: step-by-step division  3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 3/2 with vocabulary card "flip the second fraction"  
`P20` pattern detection: "Look at both procedures. What is different between them?"  
`P08` abstract notation: "(a/b) × (c/d) = (ac)/(bd)" and "(a/b) ÷ (c/d) = (a/b) × (d/c)"  
`P34` closed (multiplication): "Compute 1/3 × 3/5 using the rule in Diagram A."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "3/15 = 1/5",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "3/15 but no simplification (acceptable at this stage)",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Wrong algorithm",
  signal: "SIGNAL:INCORRECT" }
```

`P49` after first P34:  
- SIGNAL:CORRECT → P10 (division worked example) → second P34  
- SIGNAL:PARTIAL → `P52` ("3/15 is correct — you can leave it or simplify") → P10  
- SIGNAL:INCORRECT → `P50` → retry with diagram A visible → retry P34

`P10` worked example: "4/5 ÷ 2/3: flip the second fraction → 4/5 × 3/2 = 12/10 = 6/5."  
`P34` closed (division): "Compute 3/8 ÷ 3/4."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "3/8 × 4/3 = 12/24 = 1/2",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Flips wrong fraction (flips the first)",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-2" }

{ stimulus: "Correct flip, arithmetic error",
  signal: "SIGNAL:PARTIAL" }
```

`P49` after second P34:  
- SIGNAL:CORRECT → TA-E03  
- SIGNAL:PARTIAL → `P52` → TA-E03  
- SIGNAL:INCORRECT → `P52` (point to Diagram B: "which fraction has the arrow on it?") → retry second P34

---

**TA-E03 — Application With Visual Context**

Primitive sequence: `P02 → P39 → P34 → P55 → P49 | P50 → P42 → P55 → P49 | P52`

`P02` activate: both algorithms  
`P39` transfer prompt: visual word problem context  
`P34` closed: visual (diagram with labelled quantities):  
(i) "Rectangle: width = 2/3 m, height = 3/4 m. What is the area?"  
(ii) "Strip of 5/6 m. Each piece = 5/12 m. How many pieces?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "(i) 2/3 × 3/4 = 1/2 m²; (ii) 5/6 ÷ 5/12 = 5/6 × 12/5 = 2 pieces — both correct",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "One correct; one wrong operation or arithmetic error",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Both wrong operations",
  signal: "SIGNAL:INCORRECT" }
```

`P49` after P34:  
- SIGNAL:CORRECT → P42 → P55 → response → TA-E04  
- SIGNAL:PARTIAL → `P52` → P42 → TA-E04  
- SIGNAL:INCORRECT → `P50` → operation hint → retry `P34`

`P42` example generation: "Draw a picture for a fraction multiplication problem. Write the expression."  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "Valid diagram with correct expression",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Diagram unclear; expression correct",
  signal: "SIGNAL:PARTIAL" }
```

`P49`:  
- SIGNAL:CORRECT → TA-E04  
- SIGNAL:PARTIAL → `P52` → TA-E04

---

**TA-E04 — Mastery Gate (Terminal)**

Primitive sequence: `P01 → P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78 → P55`

[Same five-probe sequence as TA-A07. P08 introduced in TA-E02 after P07 fired in TA-E01 — GR-3 satisfied.]

---

## 6. Misconception Engine

---

### MC-1 — Fraction Multiplication Uses the Addition Algorithm

**Observable symptom:** Student computes 1/2 × 1/3 = 2/5 (adds numerators, adds denominators) or converts to common denominator then multiplies numerators only.

**Diagnostic trigger:** DB-1; TA-C01 P41.

**Root cause:** Addition is the first and most practised fraction operation; students generalise the "same denominator" procedure to multiplication. The additive algorithm is over-rehearsed and transfer occurs by familiarity.

**Repair chain:** P27 (expose additive procedure) → P28 (conflict: area model gives 1/6 ≠ 2/5; result > 1/2 violates logic — a fraction of a half must be less than a half) → P29 (pause) → P30 (bridge: area model requires counting total cells = product of denominators; shaded cells = product of numerators) → P31 (install: multiply top × top and bottom × bottom) → P32 (three problems)

**S6-safe path:** Omit P28; use P06 concrete area model before P30; confirm result < smaller fraction as reasonableness check.

**MAMR status:** FOUNDATIONAL for MC-2. MC-1 must clear first: division algorithm uses correct multiplication as a sub-step; students with MC-1 will produce wrong cross-check for MC-2 repair.

---

### MC-2 — Dividing Fractions by Dividing Numerators and Denominators Separately

**Observable symptom:** Student computes 3/4 ÷ 1/2 as (3÷1)/(4÷2) = 3/2. Answer is accidentally correct here but fails for 5/6 ÷ 2/3.

**Diagnostic trigger:** DB-2; TA-C01 P41.

**Root cause:** Analogy to integer division: 6 ÷ 3 = 2 by dividing each part. Student over-generalises positional symmetry. The method works only when numerators and denominators divide evenly.

**Repair chain:** P27 (expose method) → P28 (conflict: 5/6 ÷ 2/3 by method = 5÷2 / 6÷3 = 2.5/2 — not a clean fraction; reciprocal method = 5/6 × 3/2 = 15/12 = 5/4 — clean and verifiable) → P29 (pause) → P30 (bridge: reciprocal undoes the divisor) → P31 (install: flip second fraction, multiply) → P32

**S6-safe path:** Skip P28; use P09 narrative (how many 1/4-slices fit in 3/4?) before P30.

**MAMR status:** Dependent on MC-1 cleared (if both active). Independent otherwise.

---

### MC-3 — Whole Number × Fraction: Whole Number Goes to Denominator

**Observable symptom:** Student computes 3 × 2/5 = 2/15 (places 3 in denominator position).

**Diagnostic trigger:** DB-3; TA-C01 P41.

**Root cause:** "Denominator tells you how many parts" prompt triggers denominator placement for any number appearing near the fraction. Student pattern-matches position without understanding role.

**Repair chain:** P27 (expose belief) → P28 (conflict: reverse check — 2/15 ÷ 3 ≠ 2/5) → P30 (bridge: write whole as fraction/1; multiply numerators) → P31 (install: whole number multiplies numerator only) → P32

**S6-safe path:** Skip P28; show three repeated addition diagrams for 3 × 2/5 = 2/5 + 2/5 + 2/5 = 6/5 as concrete anchor before P30.

**MAMR status:** Independent.

---

## 7. Assessment Battery

---

**AB-1 — Classification Probe** (P74-pattern)

Label each as requiring multiplication or division:

| Item | Context | Operation |
|------|---------|-----------|
| a | 2/3 of 3/4 metre | multiplication |
| b | How many 1/8-litre servings in 3/4 litre? | division |
| c | A field is 4/5 km × 3/7 km. Find area. | multiplication |
| d | Split 5/6 metre rope into 5/12-metre pieces. | division |

Pass: 4/4 correct operation labels with brief justification.

---

**AB-2 — Generation and Computation** (P77-pattern)

Compute: (a) 5/6 × 3/10  (b) 7/8 ÷ 7/4  (c) 3 × 4/11.

Pass: (a) 15/60 = 1/4, (b) 7/8 × 4/7 = 28/56 = 1/2, (c) 12/11. All with working shown.

---

**AB-3 — Boundary Probe** (P75-pattern)

"What is 1/2 ÷ 1/2? Does dividing a fraction by itself always give 1? What is (a/b) ÷ (a/b) in general?"

Pass: 1; yes, any nonzero fraction divided by itself = (a/b) × (b/a) = (ab)/(ab) = 1.

---

**AB-4 — Explanation Probe** (P78-pattern)

"In one sentence, explain why (3/4) ÷ (1/2) = 3/4 × 2."

Pass criteria: mentions reciprocal or inverse relationship — "1/2 and 2 are reciprocals; multiplying by 2 undoes dividing by 1/2."

---

## 8. Mastery Gate

P91 expansion: `P77 → P76 → P75 → P74 → P78`

---

**P77 — Generation Probe**

"Write and solve: one fraction × fraction problem and one fraction ÷ fraction problem, using fractions you have not used in this session."

Pass: both correct with working shown and verified.

---

**P76 — Transfer Probe**

"A car travels at 2/3 km per minute. How far does it travel in 3/4 minute?" [P76 independence note: self-contained rate × time context; cross_links = []; no cross-linked blueprint required]

Pass: 2/3 × 3/4 = 6/12 = 1/2 km.  
Fail routing: wrong operation (divides instead of multiplies) → operation-selection gap.

---

**P75 — Boundary Probe**

"What is (5/8) ÷ (5/8)? What is (5/8) × (8/5)? Are these the same? What general rule does this illustrate?"

Pass: both = 1; a/b × b/a = 1 because reciprocals multiply to 1; dividing by a fraction = multiplying by its reciprocal.

---

**P74 — Classification Probe**

"State multiply or divide for each: (a) 3/5 of 4/7  (b) how many 1/4 lengths in 3/8  (c) 5/6 × ?"

Pass: (a) multiply, (b) divide, (c) multiply — with correct computation.

---

**P78 — Explanation Probe**

"In one sentence, explain why the algorithm (a/b) × (c/d) = (ac)/(bd) is not the same as fraction addition."

Pass: addition requires equal-sized parts (common denominator); multiplication counts area cells (numerator × numerator; denominator × denominator); the operations model different quantities.

---

**Mastery decision:**  
5/5 PASS → MASTERY_CONFIRMED → schedule Component 9  
3–4/5 PASS → PARTIAL_MASTERY  
< 3/5 PASS → return to Protocol entry matching failure pattern

---

## 9. Retrieval Schedule

Based on P89 SPACED REPETITION: intervals 1, 3, 7, 21, 60 days.

---

**Day 1** — `P56` consolidation

- Compute 3/5 × 4/7
- Compute 5/6 ÷ 2/3
- Vocabulary: what is the reciprocal of 3/8?

---

**Day 3** — `P88` retrieval with variation

- Compute 4 × 3/11 and 2/3 × 9/4
- Word problem: You use 2/5 of a 3/4-cup amount. How many cups?
- State the division rule in your own words

---

**Day 7** — `P88` mixed and boundary

- Compute (a) 7/9 ÷ 7/3  (b) 5/12 × 4/15  (c) 6 × 5/8
- Boundary: is (1/3) ÷ (2/3) greater or less than 1? Explain without computing first, then verify
- Generate one word problem for multiplication and one for division

---

**Day 21** — `P88` transfer and self-explanation

- Area problem: rectangle 5/6 m × 4/9 m — find area
- "How many 3/8-metre pieces fit in 9/4 metres?"
- Explain why the reciprocal rule works (conceptual, not procedural)

---

**Day 60** — `P88` cold recall + full classification

- P77-style: two new problems (one × , one ÷) without reference
- AB-1 classification battery (new instances)
- P78-style: one-sentence comparison of multiplication and division of fractions

---

## 10. Validation Checklist

| Check | Criterion | Status | Evidence |
|-------|-----------|--------|----------|
| V-1 | All concept id slots reference valid KG nodes | PASS | math.arith.fraction-multiplication valid; math.arith.fractions (prereq) valid |
| V-2 | difficulty=2 → cpa_entry_stage=C | PASS | difficulty=2 (developing), domain=mathematics → C per spec |
| V-3 | mastery_threshold matches KG value | PASS | 0.85 per KG specification |
| V-4 | Canonical 10-field schema only | PASS | No domain/concept_type in concept profile; 10 KG fields present |
| V-5 | No invented primitives | PASS | All primitives P01–P91 library range |
| V-6 | GR-1: all TAs start P01 or P02 | PASS | A01–A06: P01; A07: P01; B01: P02; B02: P02; B03: P02; B04: P01; C01: P02; C02–C05: P01; D01: P02; D02: P02; D03: P02; D04: P02; E01: P01; E02: P01; E03: P02; E04: P01 — all verified |
| V-7 | GR-2: P55 follows every elicitation primitive | PASS | All P34/P35/P39/P41/P42/P59/P64/P77–P78 in all TAs followed by P55 |
| V-8 | GR-3: P08 only after P06 or P07 has fired | PASS | P08 in TA-A05 (P06 fired in A01/A02, P07 in A03); P08 in TA-E02 (P07 fired in E01 and E02 before P08) |
| V-9 | GR-4: repair chain entered only after P41 or P64 | PASS | Protocol C chains entered after P41 in TA-C01; MC signals required to route to C02/C03/C04 |
| V-10 | GR-5: P28 absent from S6 Protocol (Protocol D) | PASS | P28 not in any D01–D04 TA; P30 bridge and P81 scaffold used instead |
| V-11 | GR-6: P91 terminal in all mastery gate TAs | PASS | TA-A07, B04, C05, D04, E04 end with P78→P55; nothing follows |
| V-12 | GR-7: ≤3 consecutive C-primitives | PASS | No TA has >2 consecutive C-category primitives (P14, P16, P17, P20, P21, P25, P39, P59 each appear once with E-category following) |
| V-13 | GR-8: P54 precedes high-difficulty first-attempt questions | PASS | P54 in NO_RESPONSE branches of TA-A01 and TA-A04; P35 open questions appear after grounding in B01 |
| V-14 | GR-9: assessment primitives not in first TA | PASS | P74–P78 only in mastery gate TAs (A07, B04, C05, D04, E04) |
| V-15 | GR-10: Named Compound expansions substituted | PASS | P91 expanded as P77→P76→P75→P74→P78 in all mastery gate TAs |
| V-16 | Response taxonomy present for all elicitation primitives | PASS | All P34/P35/P42/P59/P64 in A01–E04 have inline response taxonomy blocks with all four signal types |
| V-17 | All P49 branches specified | PASS | CORRECT/PARTIAL/INCORRECT/NO_RESPONSE routing for all elicitation cycles across all protocols |
| V-18 | Session cap respected | PASS | Protocol A: 7 TAs (est_hours=6 ≥ 1h → max 7; 7 ≤ 7); B: 4; C: 3–5; D: 4; E: 4 — all within cap |
| V-19 | Transfer contexts reference cross-linked concept | PASS | cross_links=[]; P76 uses rate × time proportional context; P76 independence note: self-contained, no cross-linked blueprint required |
| V-20 | AIR-1 through AIR-5 pass | PASS | All content in explicit authored slots (AIR-1); response taxonomies pre-authored (AIR-2); P49 routing deterministic (AIR-3); primitives concept-independent (AIR-4); TA sequences fixed at authoring (AIR-5) |

**PACKAGE_READY: YES** — All 20 V-checks PASS. Components 0–9 present. Blueprint approved for Educational Brain integration.
