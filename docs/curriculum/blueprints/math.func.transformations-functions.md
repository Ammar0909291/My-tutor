# Blueprint: math.func.transformations-functions

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.func.transformations-functions |
| name | Transformations of Functions |
| Domain | math.func |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 6 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.func.graph-of-function |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
Given a base function f(x) and a transformed form g(x)=af(bx−h)+k, the student identifies each parameter's geometric effect (a: vertical stretch/reflect; b: horizontal stretch/compress; h: horizontal shift; k: vertical shift), applies transformations in the correct order to graph g from the graph of f, writes g(x) given a description of transformations, and inverts the process — reading transformation parameters from a given graph.

## Component 2 — CPA Entry Stage
**C — Concrete** (explicit point tracking: take three key points of f, apply each transformation, plot g; graph pair side-by-side)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | HORIZONTAL-SHIFT-WRONG-DIRECTION | Student reads f(x−h) as a shift LEFT by h (instead of RIGHT); interprets f(x+3) as shifting right by 3 (instead of left) | Type 3 — language contamination ("−h" looks like subtraction = left; but the direction is opposite to the sign inside the argument) |
| MC-2 | HORIZONTAL-AFFECTS-VERTICAL | Student applies h (inside the function) as a vertical translation and k (outside) as a horizontal translation | Type 1 — overgeneralization (students note that something inside the parentheses "changes x" but confuse which direction the effect goes) |
| MC-3 | ORDER-INDEPENDENT | Student applies transformations in any order, assuming the final result is the same; does not see that horizontal stretch and horizontal shift do not commute | Type 1 — overgeneralization (vertical transformations — stretch and shift — commute with each other; students assume all transformations commute) |

## Component 4 — Session TA Cap
**Cap = 8** (hrs = 6 → cap 8)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of transformations:**

| Transformation | Algebraic form | Geometric effect | Key points |
|---|---|---|---|
| Vertical shift up by k | f(x)+k | Graph moves up by k | (x, y) → (x, y+k) |
| Horizontal shift right by h | f(x−h) | Graph moves right by h | (x, y) → (x+h, y) |
| Vertical stretch by |a| | af(x) | Graph stretched/compressed vertically | (x, y) → (x, ay) |
| Horizontal compress by 1/b | f(bx) | Graph compressed horizontally by factor 1/b | (x, y) → (x/b, y) |
| Reflection about x-axis | −f(x) | Graph flipped over x-axis | (x, y) → (x, −y) |
| Reflection about y-axis | f(−x) | Graph flipped over y-axis | (x, y) → (−x, y) |

**The general form:** g(x)=af(b(x−h))+k.

Order to apply (when graphing from f to g):
1. Horizontal shift by h (right if h>0)
2. Horizontal scale by 1/b (compress if b>1)
3. Vertical scale by |a| (stretch if |a|>1)
4. Reflect about x-axis if a<0
5. Vertical shift by k

**Worked example:** g(x)=−2f(3(x−1))+4 from f(x)=x².
- f(x)=x² has vertex (0,0), passes through (1,1),(−1,1),(2,4),(−2,4).
- Shift right 1: key points become (1,0),(2,1),(0,1),(3,4),(−1,4).
- Compress horizontally by 1/3: x-coords ÷3 from the SHIFTED base... [track original through g(x)=−2(3x−3)²+4=−2(9(x−1)²)+4=−18(x−1)²+4. Vertex (1,4), opens downward.]
- Summary: vertex (0,0) → (1,4). Opens down with stretch factor 2×9=18.

**P49 checkpoint:**
- CORRECT → "g(x)=af(b(x−h))+k: h shifts right, k shifts up, |a| stretches vertically, 1/b stretches horizontally, negative a reflects about x-axis. Apply in order: horizontal shift → horizontal scale → vertical scale → reflect → vertical shift." → A02
- PARTIAL (knows vertical shifts and stretches, confuses horizontal shift direction) → "For f(x−3): what x makes the argument zero? That's the new 'centre' of the function. Which direction did it move?" → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "The graph of f(x)=|x| has vertex at (0,0). Where is the vertex of g(x)=|x−2|+3? Start by finding which x makes x−2=0." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Transformation gallery — applying to base functions:**

Base: f(x)=x² (parabola, vertex (0,0), opens up).

| g(x) | Transformation | Vertex | Opens |
|---|---|---|---|
| x²+3 | Shift up 3 | (0,3) | Up |
| (x−2)² | Shift right 2 | (2,0) | Up |
| (x+1)²−4 | Shift left 1, down 4 | (−1,−4) | Up |
| 3x² | Vertical stretch ×3 | (0,0) | Up (narrower) |
| ½x² | Vertical compress ×½ | (0,0) | Up (wider) |
| −x² | Reflect about x-axis | (0,0) | Down |
| (2x)²=4x² | Horizontal compress (narrower) | (0,0) | Up |
| (x/2)²=x²/4 | Horizontal stretch (wider) | (0,0) | Up |

**Pattern for horizontal effects — counter-intuitive direction:**
f(x−2): x−2=0 when x=2. The "zero" of the argument moves right by 2. Shift RIGHT.
f(x+2): x+2=0 when x=−2. Shift LEFT.
f(2x): the "period" (or width) is halved. Compress INWARD.
f(x/2): period doubled. Stretch OUTWARD.

**P49 checkpoint:**
- CORRECT → "Horizontal: argument is (bx−h). Factor to get b(x−h/b). Shift: right by h/b. Compress: factor of b inward. Vertical: a scales, k shifts up." → A03
- PARTIAL (handles single transformations, fails composites) → "For g(x)=f(2x−6): factor as f(2(x−3)). What is the shift? What is the compression?" → TB-R03 → A03
- INCORRECT → TB-R03 → A03
- NO_RESPONSE → "For g(x)=(x−3)²: track the vertex of f(x)=x². Where is (0,0) after the horizontal shift?" → TB-R03 → A03

### A03 — P06 CONTRAST PAIR
**Order matters — non-commutative transformations:**

Consider f(x)=√x with two operations: shift right 1, then compress horizontally by factor 2.

**Order A (shift then compress):**
Step 1: f(x−1)=√(x−1). Vertex moves to x=1.
Step 2: compress by 2: f(2x−1)=√(2x−1). New zero at x=½.

**Order B (compress then shift):**
Step 1: f(2x)=√(2x). Zero at x=0.
Step 2: shift right 1: f(2(x−1))=√(2x−2). Zero at x=1.

Result A: √(2x−1) has zero at x=½. Result B: √(2(x−1)) has zero at x=1. **Different functions.** Order matters for horizontal transformations.

**But vertical transformations DO commute with each other:**
af(x)+k vs. a(f(x)+k)=af(x)+ak. These are DIFFERENT. But: 3f(x)+2 (stretch by 3 then shift up 2) vs. 3(f(x))+2 — same thing. The issue is shift and stretch both act on the y-value additively/multiplicatively in different ways.

**Standard order** for g(x)=af(b(x−h))+k: always factor the argument first to identify h and b separately. The written form f(bx−c) means f(b(x−c/b)), so h=c/b and b is the compression.

**P49 checkpoint:**
- CORRECT → "Order matters for horizontal transformations: always factor the argument to separate shift from compression. g(x)=af(b(x−h))+k is the canonical form: h=shift right, 1/b=horizontal stretch, a=vertical stretch, k=vertical shift." → Gate (P91)
- PARTIAL (knows transformations individually, applies wrong order) → "For g(x)=3√(2x−4): first factor 2x−4=2(x−2). Now identify b=2, h=2. Apply shift right 2 THEN compress by 2." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "Write g(x)=|2x−6| in the form |b(x−h)| by factoring 2 from 2x−6. What shift and compression does this reveal?" → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 HORIZONTAL-SHIFT-WRONG-DIRECTION):**
Step 1 — "For f(x−h): the graph shifts so that the NEW input that produces the SAME output is x=h (because x−h=0 when x=h). The graph moves to the RIGHT by h." Step 2 — Concrete: f(x)=x² has vertex at x=0. g(x)=(x−3)² has vertex at x=3 (because x−3=0 when x=3). Shift RIGHT 3. Similarly, (x+3)² has vertex at x=−3 — shift LEFT 3. Step 3 — "Quick rule: inside the function, the shift is OPPOSITE to the sign: f(x−h) shifts RIGHT by h; f(x+h) shifts LEFT by h. This is opposite to what the sign suggests."

**TB-R02 (MC-2 HORIZONTAL-AFFECTS-VERTICAL):**
Step 1 — "Two kinds of transformation: INSIDE the function (affects horizontal = x-direction), OUTSIDE the function (affects vertical = y-direction). The argument b(x−h) is inside → shifts and stretches x. The constants a and k are outside → stretch and shift y." Step 2 — g(x)=af(x−h)+k. The h inside: x−h shifts x (horizontal). The k outside: adds to y (vertical). The a outside: multiplies y (vertical). The b inside: multiplies x (horizontal). Step 3 — "Inside = horizontal. Outside = vertical. This is the fundamental inside/outside rule for function transformations."

**TB-R03 (MC-3 ORDER-INDEPENDENT):**
Step 1 — "Horizontal shift and horizontal compression do NOT commute. The canonical form g(x)=af(b(x−h))+k was written this way precisely so the h is the shift AFTER the compression is taken out." Step 2 — g(x)=f(2x−4): is this shift-2-right then compress-by-2, or compress-by-2 then shift-2-right? Factor: 2x−4=2(x−2). Canonical form: b=2, h=2. Interpretation: compress by factor 2, then shift right 2. In the OTHER order (shift first, then compress): shift by 2 gives f(x−2), then compress gives f(2x−2) — different. Step 3 — "Always factor the argument first: f(bx−c)=f(b(x−c/b)). The shift is c/b (not c), AFTER the compression factor b is extracted."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Write the equation for each transformation of f(x)=x³: (a) shift left 2, up 5; (b) reflect about x-axis, stretch vertically by 3; (c) compress horizontally by factor 4, shift down 1.
2. For g(x)=−2|3x−6|+1: (a) Write in canonical form. (b) State the vertex (inflection point), vertical stretch, horizontal compression, and shifts. (c) Track the point (1, 0) from f(x)=|x| through each transformation to its new location in g.
3. A sine curve has amplitude 3, period π, shifted right by π/4, and shifted up 1. Write its equation.
4. The graph of g passes through (2,5) and is obtained from f(x)=√x by: shift right 1, vertical stretch by a. Find a.

**P55 — Reflect & Consolidate:** "g(x)=af(b(x−h))+k: inside = horizontal (shift right h, compress by b). Outside = vertical (stretch by a, shift up k). Factor the argument first to extract b and h correctly. Order matters for horizontal transformations."

**P76 — Transfer Probe (Independence mode):**
The function g(x)=A·sin(B(x−C))+D is the most general sinusoidal function. (a) Identify the amplitude (|A|), period (2π/B), phase shift (C), and vertical shift (D). (b) Given that g has amplitude 4, period 6, phase shift π/3 to the right, and midline y=−2, write g(x). (c) Explain why the period is 2π/B, not 2πB. [Connect to horizontal compression.] (d) Sketch one full period.

**P55 — Reflect & Consolidate:** "The sinusoidal form g(x)=A·sin(B(x−C))+D applies the complete transformation vocabulary: B compresses the period (horizontal compression by B = period÷B), C shifts phase, A scales amplitude, D shifts midline. This is the most-used form in physics, engineering, and signal processing."

**P75 — Mastery Assessment:**
"f(x)=1/x. g(x)=(−3)/(2x+4)+1. (a) Rewrite g in canonical form af(b(x−h))+k. (b) Identify all four transformation parameters. (c) State the vertical asymptote and horizontal asymptote of g by tracking where f has its asymptotes. (d) Track the point (1,1) on f to its new location on g."

**P55 — Reflect & Consolidate:** "Asymptotes transform with the function: if f has vertical asymptote at x=0, then af(b(x−h))+k has vertical asymptote at x=h. Horizontal asymptote y=0 shifts to y=k. Transformation vocabulary applies to asymptotes, vertices, and all key features."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.func.transformations-functions complete
- Score 3/5 → REVIEW horizontal shift direction and argument factoring; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.func.graph-of-function; reassign

**P78 — Completion:** Transformations of functions certified. Student applies the canonical form g(x)=af(b(x−h))+k, identifies each parameter's geometric effect, factors the argument to separate shift from compression, and tracks key points through composite transformations.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Sinusoidal function g(x)=A·sin(B(x−C))+D as a complete transformation application; period derivation from horizontal compression
Skill tested: Write a sinusoidal function from amplitude/period/phase/midline description; derive period formula; sketch one cycle

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
