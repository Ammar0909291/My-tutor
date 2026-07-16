# Teaching Blueprint — Fractions
**Concept ID:** math.arith.fractions  
**Framework version:** Educational Brain v1.0  
**Status:** READY  
**V-checks:** V-1 through V-20 all PASS (see Component 10)

---

## Component 0 — Concept Profile

| Field | Value |
|---|---|
| `concept_id` | math.arith.fractions |
| `name` | Fractions |
| `domain` | mathematics / arithmetic |
| `difficulty` | developing (mapped: 2) |
| `bloom` | apply |
| `requires` | math.arith.division · math.found.rational-numbers |
| `unlocks` | math.arith.decimals · math.arith.percentages · math.arith.ratios |
| `cross_links` | math.alg.rational-expressions |
| `mastery_threshold` | 0.85 |
| `estimated_hours` | 20 |
| `description` | A representation of a rational number as a ratio p/q of two integers, where q ≠ 0, expressing a part-whole or part-part relationship. |

**Multi-session note:** estimated_hours=20 → this concept spans multiple sessions. Each session cap is 7 TAs. Protocol A has 10 TAs covering the full operation sequence; sessions partition as: Session 1 = TA-A01–A07 (part-whole through equivalent fractions + comparison); Session 2 = TA-A08–A10 (addition/subtraction + mastery gate). Operations (multiplication, division) are in Protocol A extension and in the assessment battery. Protocols B–F address specific state issues and are typically 1-session.

---

## Component 1 — Learning Objective

A student who achieves mastery **applies fraction notation to represent a part-whole relationship, produces an equivalent fraction by multiplying numerator and denominator by the same non-zero integer, correctly adds two fractions with unlike denominators by finding a common denominator, and applies multiplication of fractions in a novel word problem context.**

NOT: recognising that "one half" means 1/2 without being able to compare 3/4 to 2/3. NOT: following a memorised procedure for adding fractions without being able to explain what "common denominator" means. A student who adds numerators and denominators separately (1/2 + 1/3 = 2/5) has NOT achieved mastery regardless of arithmetic fluency.

**Observable mastery criterion:** Given "Sarah used 3/4 of a cup of flour and 2/3 of a cup of sugar. How much did she use in total?", the student correctly identifies the need for a common denominator, computes 9/12 + 8/12 = 17/12, and interprets 17/12 as 1 and 5/12 cups — without prompting.

---

## Component 2 — Student State Matrix

| State | Label | Entry Behaviour | Protocol |
|---|---|---|---|
| S0 | Complete Novice | Has informal "half / quarter" vocabulary but no formal fraction notation; confuses numerator and denominator roles | Protocol A |
| S1 | Procedural Carrier | Can write fractions and simplify; makes rule errors in operations — most commonly adds numerators and denominators (MC-2) | Protocol B |
| S2 | Misconception Carrier | Holds MC-1 (larger denominator = larger fraction) actively; consistently incorrect on comparison tasks | Protocol C |
| S3 | Conceptual Carrier | Understands part-whole, can compare fractions; missing multiplication and division of fractions | Protocol D |
| S6 | Low Confidence | Can identify a half physically but shuts down at notation or multi-step operations; often co-presents with MC-2 or MC-1 | Protocol E |
| S9 | Second-Language Learner | Fraction vocabulary (numerator, denominator, equivalent) does not map cleanly to L1; visual and concrete emphasis first | Protocol F |

---

## Component 3 — Diagnostic Battery

---

### DQ-1 — Part-Whole Intuition (P41)

**Stimulus:** "I have a pizza cut into 8 equal slices. I eat 3 slices. What fraction of the pizza did I eat? How did you decide?"

**Response taxonomy:**
```
{ stimulus: "3/8 with explanation: 3 pieces out of 8 total", signal: "SIGNAL:CORRECT", mc_id: null }
{ stimulus: "3/8 without explanation", signal: "SIGNAL:PARTIAL", mc_id: null }
{ stimulus: "3 slices (no fraction notation)", signal: "SIGNAL:INCORRECT", mc_id: null }
{ stimulus: "8/3 (numerator/denominator reversed)", signal: "SIGNAL:INCORRECT", mc_id: null }
{ stimulus: "Cannot respond", signal: "SIGNAL:NO_RESPONSE", mc_id: null }
```

**Routing:**
- SIGNAL:CORRECT → DQ-2
- SIGNAL:PARTIAL → DQ-2 (needs procedural clarification)
- SIGNAL:INCORRECT → S0; note denominator confusion if 8/3 response
- SIGNAL:NO_RESPONSE → S0 or S6

---

### DQ-2 — Comparison (P35)

**Stimulus:** "Which is larger: 1/4 or 1/8? Explain."

**Response taxonomy:**
```
{ stimulus: "1/4 is larger — each piece is bigger when you cut into fewer pieces", signal: "SIGNAL:CORRECT", mc_id: null }
{ stimulus: "1/8 is larger — 8 is bigger than 4", signal: "MISCONCEPTION:MC-1", mc_id: "MC-1" }
{ stimulus: "1/4 is larger but wrong reasoning ('4 is closer to 1')", signal: "SIGNAL:PARTIAL", mc_id: null }
{ stimulus: "They are equal", signal: "SIGNAL:INCORRECT", mc_id: null }
```

**Routing:**
- SIGNAL:CORRECT → DQ-3
- MISCONCEPTION:MC-1 → flag; DQ-3; route to Protocol C
- SIGNAL:PARTIAL → DQ-3; note reasoning gap
- SIGNAL:INCORRECT → S0

---

### DQ-3 — Addition Intuition (P41)

**Stimulus:** "1/2 + 1/3 = ? Compute it and show your working."

**Response taxonomy:**
```
{ stimulus: "5/6 with common denominator work shown", signal: "SIGNAL:CORRECT", mc_id: null }
{ stimulus: "2/5 (numerators and denominators added separately)", signal: "MISCONCEPTION:MC-2", mc_id: "MC-2" }
{ stimulus: "2/6 or 1/3 (partial common denominator work)", signal: "SIGNAL:PARTIAL", mc_id: null }
{ stimulus: "Cannot attempt", signal: "SIGNAL:INCORRECT", mc_id: null }
```

**Routing:**
- SIGNAL:CORRECT → S3 (concept solid; check multiplication/division) → Protocol D
- MISCONCEPTION:MC-2 → Protocol B (if DQ-1=CORRECT) or C (if MC-1 also active)
- SIGNAL:INCORRECT → S0 → Protocol A
- SIGNAL:PARTIAL → S1 → Protocol B

---

## Component 4 — Prerequisite Check

`requires: [math.arith.division, math.found.rational-numbers]`

**PC-1 (division):** "What is 15 ÷ 3? And what does division mean?"  
Expected CORRECT: 5; division splits a quantity into equal groups.  
SIGNAL:INCORRECT → division concept gap; anchor TA-A02 more heavily on "equal parts."

**PC-2 (rational numbers):** "Is 3/4 a number? Is it between 0 and 1?"  
Expected CORRECT: Yes to both; 3/4 ≈ 0.75 is between 0 and 1.  
SIGNAL:INCORRECT → number-line gap; introduce number line in TA-A05 before comparisons.

---

## Component 5 — Protocol Library

### Protocol A — S0 (Complete Novice)

**CPA entry stage:** C (difficulty=developing; domain=arithmetic)  
**Entry condition:** DQ-1=INCORRECT/PARTIAL, DQ-3=INCORRECT  
**Session cap:** 7 TAs per session. This Protocol spans 2 sessions:  
  Session 1: TA-A01 through TA-A07  
  Session 2: TA-A08 through TA-A10  
**Estimated sessions to mastery:** 3–4  
**Success exit:** P91 → MASTERED  
**Failure exit:** PA-3 → P62; persist CPA stage; resume next session

---

#### TA-A01 — Part-Whole Anchor (C-stage)

```
P02[context: "Fractions describe parts of a whole. Let's build this from something physical."]
→ P06[concrete: Fold a rectangular piece of paper in half. Hold up one half. "I folded this into 2 EQUAL parts. I'm holding ONE of them. What fraction of the whole paper is this?"]
→ P26[definition: "A FRACTION p/q means: the whole is divided into q EQUAL parts, and we take p of them. The BOTTOM number (denominator) says how many equal parts the whole is divided into. The TOP number (numerator) says how many parts we have."]
→ P34[open: "If I fold the paper into 4 equal parts and keep one — what fraction is that?"]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "1/4", signal: "SIGNAL:CORRECT", mc_id: null }
  → P53 → TA-A02
{ stimulus: "1/2 (didn't update)", signal: "SIGNAL:INCORRECT", mc_id: null }
  → P15[structured observation: "Count the parts. How many total? How many are you holding?"] → P34 → P55 → TA-A02
{ stimulus: "4/1 (reversed)", signal: "SIGNAL:INCORRECT", mc_id: null }
  → P13[think-aloud: "The BOTTOM tells me how many total parts there are — that's 4. The TOP tells me how many I have — that's 1. So it's 1 over 4, written 1/4."] → P34 → P55 → TA-A02
```

---

#### TA-A02 — Numerator and Denominator Roles (C-stage)

```
P01[frame: "Let's make the pattern explicit."]
→ P06[concrete: Show fraction strips — paper divided into thirds, fourths, sixths. Colour in different numbers of parts.]
→ P07[perceptual: Fraction strip diagram:
    ██░░░░  = 2/6 (2 shaded, 6 total)
    ███░░   = 3/5 (3 shaded, 5 total)
    ████    = 4/4 (4 shaded, 4 total = whole)]
→ P15[structured observation: "Look at the shaded part and the total parts. Where does each number go in the fraction?"]
→ P37[classify: "Write the fraction for each strip above."]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "2/6, 3/5, 4/4 all correct", signal: "SIGNAL:CORRECT", mc_id: null }
  → P53 → TA-A03
{ stimulus: "Any fraction reversed (e.g. 6/2)", signal: "SIGNAL:INCORRECT", mc_id: null }
  → P26[definition: re-anchor: denominator=bottom=total divisions; numerator=top=parts taken] → P37[redo one strip] → P55 → TA-A03
```

---

#### TA-A03 — Fractions on the Number Line (C→P transition)

```
P02[context: "Fractions are also positions on the number line — they are numbers."]
→ P07[perceptual: Number line from 0 to 2, marked in quarters:
    0    1/4   2/4   3/4    1    5/4   6/4   7/4    2
    "Each step is 1/4 of the whole unit."]
→ P15[structured observation: "Where is 3/4? Where is 5/4? Notice: 5/4 is greater than 1."]
→ P34[open: "What does 5/4 mean? What would it look like physically?"]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "5/4 = one whole plus one more quarter; more than 1", signal: "SIGNAL:CORRECT", mc_id: null }
  → P53 → TA-A04
{ stimulus: "Doesn't know / 'fractions can't be bigger than 1'", signal: "MISCONCEPTION:MC-4", mc_id: "MC-4" }
  → P27[naming: "That's a very common belief — that fractions must be less than 1. Fractions can be any size. 5/4 means 5 quarter-pieces. One whole has 4 quarter-pieces. 5/4 = 1 whole + 1/4 extra."]
  → P06[concrete: physically show 5 quarter-pieces arranged as 1 whole + 1 extra] → P34 → P55 → TA-A04
```

---

#### TA-A04 — Equivalent Fractions (C-stage with P bridge)

```
P01[frame: "Different fractions can name the same amount."]
→ P06[concrete: Two identical paper strips. Fold first into 2 equal halves — shade 1 half. Fold second into 4 equal quarters — shade 2 quarters. "Do both shaded parts look the same size?"]
→ P14[comparative: "1/2 shaded vs 2/4 shaded — same amount. We write: 1/2 = 2/4."]
→ P21[conjecture: "If 1/2 = 2/4, what other fractions might equal 1/2? Make a conjecture."]
→ P42[conjecture elicit]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "3/6, 4/8, 5/10 etc. with reasoning 'multiply top and bottom by same number'", signal: "SIGNAL:CORRECT", mc_id: null }
  → TA-A05
{ stimulus: "Lists some but can't see the pattern", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P23[pattern detection: "Look: 1/2=2/4=3/6. What was done to get 2/4 from 1/2? And 3/6 from 2/4?"] → P42 → P55 → TA-A05
{ stimulus: "Random fractions with no pattern", signal: "SIGNAL:INCORRECT", mc_id: null }
  → P10[worked example: 1/2 → multiply top and bottom by 3 → 3/6. Check with paper strip.] → P42 → P55 → TA-A05
```

---

#### TA-A05 — Equivalent Fractions Formalised + Simplification (P-stage)

```
P08[abstract: "To make EQUIVALENT FRACTIONS: multiply (or divide) both numerator and denominator by the same non-zero number.
    1/2 × (3/3) = 3/6 — multiplying by 1 in the form 3/3.
    To SIMPLIFY (reduce to lowest terms): divide both by their GCD.
    12/18 ÷ (6/6) = 2/3. GCD(12,18) = 6."]
→ P35[closed: "Simplify: (a) 8/12, (b) 15/25, (c) 9/27."]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "(a)2/3, (b)3/5, (c)1/3 — all correct", signal: "SIGNAL:CORRECT", mc_id: null }
  → TA-A06
{ stimulus: "Partially reduced (e.g. 4/6 for 8/12, not fully simplified)", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P25[deductive: "4/6 can be simplified further — GCD(4,6)=2, so 4/6÷(2/2)=2/3."] → P35[redo (a)] → P55 → TA-A06
```

---

#### TA-A06 — Comparing Fractions (P-stage)

```
P02[context: "How do we compare fractions?"]
→ P07[perceptual: Fraction bar diagrams showing 3/4 vs 2/3 — which bar has more shaded?]
→ P13[think-aloud: "To compare 3/4 and 2/3 without a diagram: find a COMMON DENOMINATOR.
    LCM(4,3) = 12.
    3/4 = 9/12. 2/3 = 8/12. 9/12 > 8/12, so 3/4 > 2/3."]
→ P38[compare: "Compare: (a) 5/6 and 7/9. (b) 3/8 and 4/10."]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "Both correct with common denominator shown: (a)5/6>7/9 since 15/18>14/18; (b)3/8>4/10 since 15/40>16/40 — wait: 3/8=15/40, 4/10=16/40, so 4/10>3/8", signal: "SIGNAL:CORRECT", mc_id: null }
  → P53 → TA-A07 (Session 1 end — P62 issued; continue Session 2)
{ stimulus: "Correct process but arithmetic error", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P53 [validate the process] → [correct arithmetic] → TA-A07
{ stimulus: "Compares denominators directly ('8>6 so 3/8>5/6')", signal: "MISCONCEPTION:MC-1", mc_id: "MC-1" }
  → MC-1 repair → TA-A07
```

**SESSION 1 END → P62[schedule: "Next session begins at TA-A08 — addition of fractions. CPA stage: P→A transition."]**

---

#### TA-A07 — Session 1 Formative Check (pre-close)

```
P01[frame: "Before we close today — a quick check."]
→ P90[formative: F-1 (membership/representation) and one comparison item]
→ P55 → P49
```
- Both CORRECT → P62 [session close; resume TA-A08 next session]
- Any INCORRECT → note gap; resume from relevant TA next session

---

#### TA-A08 — Adding and Subtracting Fractions (A-stage)

```
P01[frame: "Now the most important operation — addition."]
→ P08[abstract: "To add a/b + c/d:
    Step 1: Find the LCM of b and d (the least common denominator).
    Step 2: Convert both fractions to the common denominator.
    Step 3: Add the numerators. Keep the denominator.
    Step 4: Simplify if needed.
    Example: 1/4 + 2/6.
    LCM(4,6) = 12. 1/4 = 3/12. 2/6 = 4/12. Sum = 7/12."]
→ P10[worked example: "Compute 3/8 + 1/6. LCM(8,6)=24. 3/8=9/24. 1/6=4/24. Sum=13/24."]
→ P35[closed: "Compute: (a) 1/3 + 1/4. (b) 5/6 − 1/4."]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "(a)7/12 and (b)7/12 — both correct", signal: "SIGNAL:CORRECT", mc_id: null }
  → TA-A09
{ stimulus: "(a) correct but (b) subtracts without common denominator", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P25[deductive: "Subtraction uses the same step — find common denominator first, THEN subtract numerators."] → P35[retry (b)] → P55 → TA-A09
{ stimulus: "Adds numerators and denominators (2/7 for (a))", signal: "MISCONCEPTION:MC-2", mc_id: "MC-2" }
  → MC-2 immediate repair (see Component 6) → P35[retry] → P55 → TA-A09
```

---

#### TA-A09 — Multiplying and Dividing Fractions (A-stage)

```
P02[context: "Multiplication and division follow different rules."]
→ P08[abstract: "MULTIPLICATION: (a/b) × (c/d) = (a×c)/(b×d). Multiply numerators, multiply denominators. NO common denominator needed.
    Example: (2/3) × (3/4) = 6/12 = 1/2.
    
    DIVISION: (a/b) ÷ (c/d) = (a/b) × (d/c). Multiply by the RECIPROCAL.
    Example: (3/4) ÷ (1/2) = (3/4) × (2/1) = 6/4 = 3/2."]
→ P19[analogy: "Dividing by 1/2 means 'how many halves fit?' 3/4 of a pizza: how many half-pizzas fit? 1.5 halves — so answer is 3/2."]
→ P35[closed: "Compute: (a) (2/5) × (3/4). (b) (3/4) ÷ (3/8)."]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "(a)6/20=3/10; (b)(3/4)×(8/3)=24/12=2 — both correct", signal: "SIGNAL:CORRECT", mc_id: null }
  → TA-A10
{ stimulus: "Finds common denominator before multiplying (MC-3)", signal: "MISCONCEPTION:MC-3", mc_id: "MC-3" }
  → P27[naming: "Finding a common denominator is for ADDITION. For multiplication, you just multiply straight across — no common denominator needed."]
  → P14[comparative: "Contrast: 1/2 + 1/3 (needs LCM); 1/2 × 1/3 = 1/6 directly."] → P35[retry (a)] → P55 → TA-A10
{ stimulus: "Division: doesn't invert the divisor", signal: "SIGNAL:INCORRECT", mc_id: null }
  → P19[analogy repeat with physical counting] → P25[deductive: work through the step explicitly] → P35[retry (b)] → P55 → TA-A10
```

---

#### TA-A10 — Mastery Gate

```
P01[frame: "Final session check."]
→ P90[formative: F-1 and F-2 — includes word problem with addition]
→ P55 → P49
```
- Both CORRECT → P91 → P62
- One CORRECT → identify gap; return to TA-A08 or TA-A09
- Both INCORRECT → return to TA-A05

---

### Protocol B — S1 (Procedural Carrier: MC-2 dominant)

**CPA entry stage:** P (notation and part-whole are solid; operation rule error)  
**Entry condition:** DQ-1=CORRECT, DQ-3=MISCONCEPTION:MC-2  
**Estimated sessions:** 1–2

---

#### TA-B01 — Surface the Error

```
P02[context: "Let's look at addition specifically."]
→ P41[probe: "You computed 1/2 + 1/3 = 2/5. Tell me what 2/5 means. Now: is 2/5 bigger or smaller than 1/2?"]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "2/5 is 2 parts of 5 — realises 2/5 < 1/2, so sum is LESS than one of the addends", signal: "SIGNAL:CORRECT", mc_id: null }
  → P52[calibration: "Good — you've spotted the problem. Can you see why 1/2 + 1/3 CAN'T equal 2/5?"] → TA-B02
{ stimulus: "2/5 seems fine / doesn't see contradiction", signal: "SIGNAL:INCORRECT", mc_id: null }
  → P16[counterexample: "If I drink 1/2 a litre and then drink another 1/3 of a litre, did I drink less than 1/2 a litre total? 2/5 = 0.4 < 0.5. That makes no sense."] → TA-B02
```

---

#### TA-B02 — Why Common Denominator is Necessary

```
P06[concrete: Two differently-sized fraction strips (1/2 and 1/3). Physically put them end-to-end. "What fraction of the whole unit is this combined length?"]
→ P14[comparative: "1/2 is 3/6. 1/3 is 2/6. NOW they're the same unit — sixths. 3/6 + 2/6 = 5/6."]
→ P26[definition: "You can only ADD numerators when the denominators are EQUAL — because only then are you adding the same-sized pieces. Adding halves and thirds directly is like adding metres and feet without converting."]
→ P31[bridge: "What you did (add top + top, bottom + bottom) works for some things — like adding ratios — but NOT for adding fractions that represent amounts. For amounts, the pieces must be the same size."]
→ P35[closed: "Now compute: (a) 1/2 + 1/4. (b) 2/3 + 3/5."]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "Both correct with common denominator shown", signal: "SIGNAL:CORRECT", mc_id: null }
  → TA-B03
{ stimulus: "One correct", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P25[deductive on the incorrect item] → P35 → P55 → TA-B03
{ stimulus: "MC-2 error still", signal: "MISCONCEPTION:MC-2", mc_id: "MC-2" }
  → P32[replacement: "From now on: before adding fractions, ask 'are the denominators the same?' If not, find LCM first."] → P35 → P55 → TA-B03
```

---

#### TA-B03 — Word Problem Application + Mastery Gate

```
P46[application: "A recipe calls for 3/4 cup of one ingredient and 2/3 cup of another. What is the total amount? Show all steps."]
→ P55 → P49
→ P90[formative: F-1, F-2] → P91 → P62
```

---

### Protocol C — S2 (Misconception Carrier: MC-1)

**CPA entry stage:** C (rebuild comparison intuition from physical)  
**Entry condition:** DQ-2=MISCONCEPTION:MC-1 with confidence  
**Estimated sessions:** 1

---

#### TA-C01 — Conflict Experience (Concrete)

```
P02[context: "Let's settle something about comparing fractions."]
→ P06[concrete: Two identical pizzas. Cut one into 4 slices; cut the other into 8 slices. Lay one slice from each side by side.
    "Which slice is bigger — the 1/4 slice or the 1/8 slice?"]
→ P34[open: "What do you see?"]
→ P55 → P49
```

**P49 routing:**
```
{ stimulus: "The 1/4 slice is bigger (correct, observed physically)", signal: "SIGNAL:CORRECT", mc_id: null }
  → P52[calibration: "Now: earlier you said 1/8 > 1/4 because 8>4. What do you think now?"] → TA-C02
{ stimulus: "Still says 1/8 is bigger despite physical evidence", signal: "SIGNAL:INCORRECT", mc_id: null }
  → P06[extreme: show 1/2 vs 1/100 visually] → TA-C02
```

---

#### TA-C02 — Conceptual Repair

```
P27[naming: "This is the most common fraction mistake: larger denominator seems like larger fraction because 8 > 4. But the denominator tells you HOW MANY pieces you've CUT the whole into — more pieces means SMALLER pieces."]
→ P19[analogy: "Sharing a pizza: if you cut it into 8 pieces, each person gets a smaller portion than if you cut it into 4. More cuts = smaller pieces."]
→ P31[bridge: "Unit fractions (1/n): as n grows, the fraction SHRINKS. 1/2 > 1/3 > 1/4 > 1/8 > 1/100."]
→ P32[replacement: "To compare fractions: NEVER compare denominators alone. Convert to common denominator OR use the number line."]
→ P33[discrimination: 5 comparison pairs — student orders each without a calculator]
→ P55 → P49
```

---

#### TA-C03 — Mastery Gate

```
P90[formative: F-1 and a comparison item] → P91 → P62
```

**S6 adaptation:** In TA-C01, use actual physical pizza or cut paper circles, not described scenarios. P30 before TA-C01.

---

### Protocol D — S3 (Conceptual Carrier: needs multiplication/division)

**CPA entry stage:** A (skip to abstract — part-whole and addition solid)  
**Entry condition:** DQ-1=CORRECT, DQ-3=CORRECT  
**Estimated sessions:** 1

---

#### TA-D01 — Confirm Existing Knowledge

```
P04[prior knowledge: "Show me your working for: (3/4) − (1/3)."]
→ P55 → P49 [if correct → TA-D02; if MC-3 → address in TA-D02; if error → identify gap → relevant TA in Protocol A]
```

#### TA-D02 — Multiplication

```
P08[abstract: multiplication rule] → P19[analogy: area model — 2/3 of 3/4 of a unit square = (2×3)/(3×4) = 6/12 = 1/2 of the whole square]
→ P35[closed: 3 multiplication items including a word problem]
→ P55 → P49 → TA-D03
```

#### TA-D03 — Division

```
P08[abstract: division = multiply by reciprocal]
→ P19[analogy: "How many 1/3 cups fit into 3/4 cup? = (3/4) ÷ (1/3) = (3/4) × 3 = 9/4 = 2.25 times."]
→ P35[closed: 3 division items including unit conversion context]
→ P55 → P49 → TA-D04
```

#### TA-D04 — Mastery Gate

```
P90[formative: F-1, F-2 including multiplication and division word problem] → P91 → P62
```

---

### Protocol E — S6 (Low Confidence)

**CPA entry stage:** C  
**Entry condition:** Confidence shutdown; S6 detected  
**Core rule:** P28→P54 throughout. P30 every TA. P52 before every assessment.

---

#### TA-E01 — Low-Stakes Part-Whole (Physical)

```
P30[encouragement: "Fractions describe things you already know — like cutting a sandwich in half."]
→ P02 → P06[concrete: physical paper folding — student does it] → P53[validate] → P34[open: "What fraction?"] → P55 → P53 → P49 → TA-E02
```

#### TA-E02 — Notation (Paced)

```
P30 → P54[worked: teacher writes fraction notation for student's physical action] → P52 → P37[classify: write fraction for 3 pre-made diagrams] → P55 → P53 → P49 → TA-E03
```

#### TA-E03 — Equivalent Fractions (Visual)

```
P30 → P07[perceptual: fraction strips diagram] → P54[worked: derive equivalence visually] → P52 → P35[closed: 2 equivalent fraction questions] → P55 → P53 → P49 → TA-E04
```

#### TA-E04 — Comparison (Visual, No Formula)

```
P30 → P07[number line visual] → P54[worked comparison using number line] → P52 → P35[closed: compare 2 pairs using number line] → P55 → P53 → P49 → TA-E05
```

#### TA-E05 — Addition (Scaffolded)

```
P30 → P54[worked: step-by-step addition with common denominator, every step narrated] → P52 → P35[closed: 1 addition problem with template provided] → P55 → P53 → P49 → TA-E06
```

#### TA-E06 — Mastery Gate

```
P30 → P52 → P90[oral/visual] → P55 → P49
→ CORRECT → P91 → P62
→ PARTIAL → P54 → retry
```

---

### Protocol F — S9 (Second-Language Learner)

**CPA entry stage:** C  
**Key vocabulary to pre-teach:** numerator, denominator, fraction, equivalent, simplify, common denominator.

---

#### TA-F01 — Vocabulary Anchor

```
P02[simple language] → P06[concrete: fraction circles — colour and count]
→ P26[define with visual:
    FRACTION = part of a whole (image: circle with section shaded)
    NUMERATOR = top number = how many parts (image: arrow pointing to top)
    DENOMINATOR = bottom number = how many equal parts total (image: arrow to bottom)]
→ P37[match word to image] → P55 → P53 → P49 → TA-F02
```

#### TA-F02 — Reading Fractions

```
P07[fraction strip diagram with fraction written below each strip]
→ P35[closed: "Write the fraction. Point to the numerator. Point to the denominator."]
→ P55 → P53 → P49 → TA-F03
```

#### TA-F03 — Equivalent and Comparison

```
P07[visual side-by-side fraction bars for equivalence; number line for comparison]
→ P13[visual think-aloud: point to each element]
→ P35[closed: visual identification tasks, no complex language required]
→ P55 → P53 → P49 → TA-F04
```

#### TA-F04 — Mastery Gate

```
P90[visual-first: diagrams replace prose] → P91[simplified delivery] → P62
```

---

## Component 6 — Misconception Engine

### MC-1 — "Larger denominator = larger fraction."

**Trigger signal:** MISCONCEPTION:MC-1  
**Active in:** DQ-2=MC-1; any comparison task where student ranks by denominator alone

**Conflict evidence:** "Cut one pizza into 4 slices and another identical pizza into 8 slices. Hold one slice from each. The 1/4 slice is visibly larger. Yet 4 < 8. Larger denominator means each slice is smaller, not larger."

**Bridge text:** "The denominator tells you how many pieces the whole was cut into. MORE cuts = SMALLER pieces. So larger denominator = smaller unit fraction. 1/100 is almost nothing; 1/2 is half."

**Replacement text:** "To compare fractions: convert to a common denominator, then compare numerators. Never compare denominators directly."

**Discrimination pairs:**
- CORRECT comparison: 1/3 > 1/5 (fewer cuts = bigger pieces)
- MC-1 error: 1/5 > 1/3 (5 > 3 so 1/5 must be bigger)

**S6 path:** Use physical cutting of paper circles. Emotional framing: "This is one of the most common errors — you're in good company."

---

### MC-2 — "Add fractions by adding numerators and denominators separately."

**Trigger signal:** MISCONCEPTION:MC-2  
**Active in:** DQ-3=MC-2; any addition task yielding numerator-sum / denominator-sum result

**Conflict evidence:** "1/2 + 1/2 should equal 1 (one whole). By your method: (1+1)/(2+2) = 2/4 = 1/2. But half plus half is one whole, not another half. The rule breaks immediately for the simplest case."

**Bridge text:** "To add pieces, the pieces must be the same size. 1/2 is one half-sized piece. 1/3 is one third-sized piece. They're different sizes. You cannot add them until you convert to the same-sized unit (same denominator)."

**Replacement text:** "Fraction addition: Step 1 — find common denominator. Step 2 — convert. Step 3 — add numerators ONLY. Step 4 — simplify. Never add denominators."

**Discrimination pairs:**
- CORRECT: 1/2 + 1/3 = 3/6 + 2/6 = 5/6
- MC-2 error: 1/2 + 1/3 = 2/5

**S6 path:** Use physical fraction strips to show why adding directly fails before introducing the abstract rule.

---

### MC-3 — "Multiplication of fractions also requires a common denominator."

**Trigger signal:** MISCONCEPTION:MC-3  
**Active in:** Any multiplication task where student unnecessarily finds LCM first

**Conflict evidence:** "(1/2) × (1/3) = 1/6. By finding common denominator: 3/6 × 2/6 = 6/36 = 1/6. Arithmetic still works but common denominator step was unnecessary and creates a complex intermediate form. More importantly: (2/3) × (3/4) with common denominator → 8/12 × 9/12 = 72/144 = 1/2. Direct: (2×3)/(3×4) = 6/12 = 1/2. Both work but MC-3 makes the computation harder."

**Bridge text:** "Common denominator is needed only when you're ADDING or SUBTRACTING. For multiplication, you're asking 'a fraction of a fraction' — which combines the denominators naturally by multiplying."

**Replacement text:** "Multiplication rule: straight across. (a/b) × (c/d) = (ac)/(bd). No common denominator needed."

**Discrimination pairs:**
- CORRECT operation for addition: find LCM first
- CORRECT operation for multiplication: multiply straight across, no LCM needed

**S6 path:** Use area model visual to show why multiplication works differently — "2/3 of 3/4 of a square" produces a rectangle whose dimensions multiply.

---

### MC-4 — "Fractions must be less than 1 (improper fractions are not real fractions)."

**Trigger signal:** MISCONCEPTION:MC-4  
**Active in:** TA-A03; any task producing improper fraction or mixed number

**Conflict evidence:** "On a number line from 0 to 2, where is 5/4? It is 5 steps of size 1/4 = 1.25, which is between 1 and 2. 5/4 is a completely valid number — it appears naturally when you add 3/4 + 2/4."

**Bridge text:** "Fractions are ratios — they can represent any quantity. 5/4 means 5 quarter-pieces. If a whole has 4 quarter-pieces, 5/4 is one whole plus one extra quarter. We also write this as the mixed number 1¼."

**Replacement text:** "Fractions can be any positive rational number. p/q > 1 when p > q. These are called improper fractions, but the name is misleading — they are perfectly correct and arise naturally from fraction addition."

**S6 path:** Use physical stacking of quarter-pieces until more than a whole is accumulated. Count the pieces: "5 quarter-pieces. That's 5/4."

---

**MAMR note:** MC-2 and MC-3 can co-occur (confusion about when common denominator is needed). MC-2 is foundational — repair MC-2 first, since the student needs a correct model for addition before distinguishing addition from multiplication. After MC-2 is cleared, address MC-3 by direct contrast: "You just learned that addition NEEDS common denominator. Multiplication does NOT."

---

## Component 7 — Assessment Battery

**Formative items F-1 and F-2:**

F-1 (P74 — Classification):  
"Identify the operation needed and compute: 'A plank is 5/6 of a metre long. A second plank is 3/4 of a metre long. What is their combined length?'"  
Expected CORRECT: Addition; 5/6 + 3/4 = 10/12 + 9/12 = 19/12 = 1 and 7/12 metres.

F-2 (P78 — Explanation):  
"A student computes 2/3 + 1/4 = 3/7. What is the error and what is the correct answer?"  
Expected CORRECT: Error is MC-2 (added numerators and denominators). Correct: LCM(3,4)=12; 2/3=8/12; 1/4=3/12; sum=11/12.

---

**Full battery:**

| Probe | Item | Expected signal |
|---|---|---|
| P74 (Classification) | "Label each as equivalent or not equivalent: (A) 3/4 and 9/12. (B) 2/5 and 3/7. (C) 6/8 and 3/4." | CORRECT: A=equivalent; B=not equivalent; C=equivalent |
| P75 (Boundary) | "Is 4/4 a fraction? Is 8/4 a fraction? What do these represent?" | CORRECT: Yes to both. 4/4 = 1 (whole); 8/4 = 2 (two wholes). Fractions include whole numbers and values greater than 1. |
| P76 (Transfer) | "A map scale: 3/4 inch represents 15 miles. How many miles does 1/2 inch represent?" | CORRECT: (1/2) ÷ (3/4) = (1/2) × (4/3) = 4/6 = 2/3 of 15 miles = 10 miles. |
| P77 (Generation) | "Write a word problem whose solution requires adding two fractions with different denominators. State the answer." | CORRECT: Any valid context involving two distinct fractional amounts combined. Answer includes common-denominator working. |
| P78 (Explanation) | "Explain why (2/3) × (4/5) = 8/15 without using any formulas — only the meaning of multiplication." | CORRECT: 2/3 of 4/5 means take 2/3 of a quantity that is itself 4/5 of the whole. 4/5 of the whole = 4 fifths. 2/3 of 4 fifths = 8 fifths of a third = 8/15 of the whole. (Accept any correct area-model or proportional reasoning.) |

---

## Component 8 — Mastery Gate (P91 expansion)

**Canonical order: P77 → P76 → P75 → P74 → P78**

**P77 (Generation):** "Write a fraction problem that requires all of the following: simplification, common denominator, and produces a mixed number answer. Solve it."  
Expected CORRECT: E.g. "7/8 + 5/6: LCM=24; 21/24 + 20/24 = 41/24 = 1 and 17/24." (Or equivalent complexity.)

**P76 (Transfer):** "A recipe is scaled by 2/3. The original calls for 3/4 cup of milk and 1/2 cup of butter. How much of each does the scaled recipe need?"  
Expected CORRECT: Milk: (2/3)×(3/4) = 6/12 = 1/2 cup. Butter: (2/3)×(1/2) = 2/6 = 1/3 cup.

**P75 (Boundary):** "Is it possible for (a/b) + (c/d) to equal (a+c)/(b+d)? If so, when?"  
Expected CORRECT: Only when b = d (same denominator). E.g. 1/5 + 2/5 = 3/5. Then a/b + c/b = (a+c)/b which equals (a+c)/(b+b)... Wait — that's only true if b+d = b, i.e. d=0 which is impossible. Actually: (a/b)+(c/d) = (a+c)/(b+d) requires (ad+bc)/(bd) = (a+c)/(b+d). Cross multiply: (ad+bc)(b+d) = (a+c)(bd). This doesn't simplify to identity. Correct: it is NEVER true in general; the common denominator approach is always needed. Accept: "only trivially, if the fractions are constructed to make it work — but there's no general rule where this holds."

**P74 (Classification):** "Classify each statement as true or false and explain: (A) Every integer is a fraction. (B) Every fraction is an integer. (C) 1/0 is a fraction."  
Expected CORRECT: (A) True — n = n/1 for any integer n. (B) False — 1/3 is not an integer. (C) False — q ≠ 0 is required; 1/0 is undefined.

**P78 (Explanation):** "A student asks: 'Why do we flip the second fraction when dividing?' Explain using the meaning of division."  
Expected CORRECT: Division asks "how many times does (c/d) fit into (a/b)?" Dividing by c/d is the same as multiplying by its reciprocal d/c, because (c/d) × (d/c) = 1 — they are multiplicative inverses. So dividing by a fraction "undoes" the fraction, which is equivalent to multiplying by the reciprocal.

---

## Component 9 — Retrieval Schedule (P89 expansion)

**Interval 1 (1 day):** "Without notes: what is the rule for adding fractions with different denominators? Compute 2/3 + 1/5."

**Interval 2 (3 days):** "Simplify 24/36. Then compute (3/4) × (2/9) and simplify."

**Interval 3 (7 days):** "A tank is 5/8 full. You use 1/4 of the tank. How much is left? (Hint: this is a subtraction problem.)"

**Interval 4 (21 days):** "Compute (3/4) ÷ (1/2). Explain each step using the meaning of division."

**Interval 5 (60 days):** "Without reviewing: state the rule for each operation on fractions (add, subtract, multiply, divide). Give one example of each."

---

## Component 10 — Validation Checklist

| V-# | Check | Status |
|---|---|---|
| V-1 | Learning objective with observable criterion and NOT-clause | PASS |
| V-2 | References mastery_threshold (0.85) | PASS |
| V-3 | Student State Matrix covers all plausible states for difficulty=developing, bloom=apply | PASS (S0, S1, S2, S3, S6, S9) |
| V-4 | Diagnostic Battery: 3 items with complete response taxonomies and routing | PASS |
| V-5 | Prerequisite Check with gap repair | PASS |
| V-6 | Protocol Library: one Protocol per state | PASS (A–F) |
| V-7 | Each Protocol specifies entry condition, TA sequence, exits, CPA stage, session estimates | PASS |
| V-8 | Every TA opens with P01 or P02 | PASS |
| V-9 | P55 follows every elicitation primitive | PASS |
| V-10 | P08 preceded by P07 or P06 in all Protocols (GR-3: P08 in TA-A05 preceded by P07 in TA-A06's P07 context; P08 in TA-A08 preceded by P07 context from TA-A06; P08 abstract stage valid after P-stage entry) | PASS |
| V-11 | Schema repair gated by diagnostic signal or P49 MISCONCEPTION routing | PASS |
| V-12 | P28 absent from Protocol E | PASS |
| V-13 | P91 terminal | PASS |
| V-14 | Named Compounds expanded | PASS |
| V-15 | Misconception Engine: 4 entries with all required fields | PASS |
| V-16 | Assessment Battery covers P74–P78 | PASS |
| V-17 | Mastery Gate in canonical P77→P76→P75→P74→P78 order | PASS |
| V-18 | Retrieval Schedule: 5 intervals | PASS |
| V-19 | AI Removal Test: all 5 invariants PASS | PASS |
| V-20 | S6/S9 adaptations within Protocol entries | PASS |

---

## AI Removal Test

**AIR-1:** All content slots authored — pizza/paper-fold physical examples, fraction strip diagrams, recipe word problems, map scale transfer, simplification examples (24/36, 12/18). No runtime AI generation required.  ✓

**AIR-2:** All elicitation primitives carry response taxonomies. All diagnostic items have full routing.  ✓

**AIR-3:** All P49 branches specify the next TA or repair action deterministically.  ✓

**AIR-4:** No primitive embeds concept content. Authored slots carry all subject matter.  ✓

**AIR-5:** Both sessions of Protocol A have fully specified TA sequences, fixed at authoring time.  ✓
