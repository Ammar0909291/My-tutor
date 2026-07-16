# Teaching Blueprint — math.geom.slope

## Component 0 — Metadata
concept_id: math.geom.slope
concept_name: Slope of a Line
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: proficient
bloom: apply
estimated_hours: 5
mastery_threshold: 0.90
CPA_entry_stage: P
requires: [math.geom.coordinate-plane]
cross_links: [math.calc.derivative-intro]
P76_mode: cross-link (math.calc.derivative-intro is Tier 1)

---

## Component 1 — Cognitive Map

**Core concept:** The slope m of a line through points (x₁,y₁) and (x₂,y₂) is m = (y₂−y₁)/(x₂−x₁) = Δy/Δx. Slope is constant for all point pairs on the same line. Parallel lines have equal slopes; perpendicular lines have slopes that are negative reciprocals (m₁ × m₂ = −1). The slope formula is the discrete precursor to the derivative.

**Conceptual progression:**
1. Slope as ratio of vertical change (rise) to horizontal change (run): m = Δy/Δx.
2. Any two points on the same line produce the same slope — slope is a property of the line, not the points chosen.
3. Parallel lines: same slope, different intercepts.
4. Perpendicular lines: slopes are negative reciprocals (m₂ = −1/m₁).
5. Special cases: horizontal line (Δy=0, m=0); vertical line (Δx=0, m undefined).
6. Limiting connection: slope of secant → slope of tangent (derivative) as the two points approach each other.

**CPA arc (entry: P):**
- Pictorial: coordinate grid with slope triangles showing rise and run; parallel and perpendicular line pairs plotted; colour-coded Δy and Δx
- Abstract: symbolic formula m = (y₂−y₁)/(x₂−x₁); parallel condition m₁=m₂; perpendicular condition m₁m₂=−1; limiting secant argument

**Prior knowledge activated:** coordinate plane; plotting points (x,y); concept of "steepness" informally; fractions as ratios

---

## Component 2 — Misconception Registry

### MC-1: DELTA-Y-OVER-DELTA-X-REVERSED [FOUNDATIONAL]
**Description:** Learner computes Δx/Δy instead of Δy/Δx.
**Surface form:** For (2,3) and (5,9), computes (5−2)/(9−3) = 3/6 = 1/2 instead of (9−3)/(5−2) = 6/3 = 2.
**Root cause:** Memorises "difference over difference" without anchoring which change goes on top; may confuse x-direction with "up" direction.
**Trigger condition:** Any slope computation from two points.
**Repair target:** TA-B01.

### MC-2: SLOPE-DEPENDS-ON-POINT-CHOICE
**Description:** Learner believes different pairs of points on the same line give different slopes.
**Surface form:** After computing slope using (0,1) and (2,5) as 2, doubts that using (1,3) and (4,9) gives the same slope.
**Root cause:** Does not understand that slope is a property of the entire line, not of the specific interval chosen; treats slope like a local measurement.
**Trigger condition:** Any problem asking the learner to verify slope invariance or use non-given points.
**Repair target:** TA-B01.

### MC-3: PERPENDICULAR-SLOPES-EQUAL
**Description:** Learner confuses the parallel condition (equal slopes) with the perpendicular condition, claiming perpendicular lines also have equal slopes.
**Surface form:** Asked for the slope perpendicular to m=3, answers 3 instead of −1/3.
**Root cause:** Conflates "related to" with "equal to"; may misremember the rule as "same slope = perpendicular" from a garbled version of the parallel rule.
**Trigger condition:** Any problem involving perpendicular lines.
**Repair target:** TA-B02.

---

## Component 3 — Scaffolding Protocol

**Entry diagnostic:** Plot (0,0) and (3,6). Ask for slope. If correct (m=2) → begin TA-A01. If incorrect → repair prerequisite (math.geom.coordinate-plane).

**Scaffolding ladder:**
1. Rise and run from a slope triangle drawn on a grid (pictorial)
2. Slope formula from two given points — first with easy integers
3. Parallel lines: verify equal slopes; explain why they never meet
4. Perpendicular lines: compute slope, then negative reciprocal

**Pacing gate:** Must score ≥ 5/5 on P91 to earn mastery credit (MAMR = 90%).

---

## Component 4 — Protocol A (Main Instruction Path)

### TA-A01 — Slope Formula and Invariance
**Primitive sequence:** P03 → P49

**P03 — ANALOGY BRIDGE:**
> "Think of a staircase. A steep staircase has tall steps and short run — a large ratio of height to depth. A gentle ramp has tiny height and long run — a small ratio. Slope measures exactly this: how much you rise for every unit you run horizontally. m = rise/run = Δy/Δx. A horizontal surface has m = 0 (no rise at all). A vertical wall has m undefined (no run, so you'd divide by zero)."

Formal mapping: given any two points (x₁,y₁) and (x₂,y₂) on a line:
m = (y₂ − y₁) / (x₂ − x₁) = Δy / Δx

Example: Find slope through (2, 3) and (5, 9).
m = (9−3)/(5−2) = 6/3 = 2.

Slope invariance: try a different pair on the same line y = 2x−1: use (0,−1) and (4,7).
m = (7−(−1))/(4−0) = 8/4 = 2. Same slope — slope is a property of the line, not the pair of points.

Special cases:
- Horizontal line through (1,4) and (6,4): m = (4−4)/(6−1) = 0/5 = 0.
- Vertical line through (3,2) and (3,7): m = (7−2)/(3−3) = 5/0 = undefined.

**P49 — ADAPTIVE CHECKPOINT:**
"Find the slope of the line through (−1, 4) and (3, 12)."

- CORRECT (m=2): "Perfect — you computed Δy=8 and Δx=4, giving m=2." → TA-A02
- PARTIAL (correct process, sign or arithmetic error): "Check Δy: 12−4=8. Check Δx: 3−(−1)=4. So m=8/4=2." → TA-A02
- INCORRECT (reversed: m=1/2): "You have Δx/Δy — flip the fraction. Slope is rise OVER run: Δy on top, Δx on bottom. Δy=12−4=8, Δx=3−(−1)=4, so m=8/4=2." → TA-B01
- NO_RESPONSE: "Label the points: (x₁,y₁)=(−1,4), (x₂,y₂)=(3,12). Δy=12−4=8. Δx=3−(−1)=3+1=4. m=8/4=2. Now try: slope through (0,1) and (4,9)." → TA-A02

---

### TA-A02 — Parallel and Perpendicular Slopes
**Primitive sequence:** P07 → P49

**P07 — WORKED EXAMPLE PAIR:**

*Worked Example 1: Parallel lines*
Line ℓ₁ passes through (0,2) and (3,8): m₁=(8−2)/(3−0)=6/3=2.
A line ℓ₂ parallel to ℓ₁ passes through (1,5). What is its slope? m₂ = m₁ = 2.
Verify: ℓ₂: y−5=2(x−1) → y=2x+3. Check (0,3) and (2,7): m=(7−3)/(2−0)=4/2=2 ✓.

*Worked Example 2: Perpendicular lines*
Line ℓ₁ has slope m₁ = 3. Line ℓ₂ is perpendicular to ℓ₁.
Perpendicular condition: m₁ × m₂ = −1 → 3 × m₂ = −1 → m₂ = −1/3.
Check: 3 × (−1/3) = −1 ✓.
Memory aid: flip the fraction and change the sign. m₁=3/1 → flip to 1/3 → negate to −1/3.

**P49 — ADAPTIVE CHECKPOINT:**
"Line A has slope 4. (a) What is the slope of a line parallel to A? (b) What is the slope of a line perpendicular to A?"

- CORRECT (a=4, b=−1/4): "Parallel: equal slope. Perpendicular: negative reciprocal. Both correct." → TA-A03
- PARTIAL (a=4 correct, b=−4 or 1/4): "Perpendicular slope: flip AND negate. Slope 4 = 4/1. Flip: 1/4. Negate: −1/4." → TA-A03
- INCORRECT (a=−1/4, b=4 — swapped): "Parallel lines have the SAME slope. Perpendicular lines have the NEGATIVE RECIPROCAL. Parallel to slope 4 → still slope 4. Perpendicular → −1/4." → TA-B02
- NO_RESPONSE: "Parallel means same steepness → same slope: 4. Perpendicular: m₁×m₂=−1 → 4×m₂=−1 → m₂=−1/4." → TA-A03

---

### TA-A03 — Contrast: Parallel vs. Perpendicular Identification
**Primitive sequence:** P06 → P49

**P06 — CONTRAST PAIR:**

| Feature | Parallel | Perpendicular |
|---|---|---|
| Slope relationship | m₁ = m₂ | m₁ × m₂ = −1 |
| Algebraic rule | Same value | Negative reciprocal |
| Example | m₁=2, m₂=2 | m₁=2, m₂=−1/2 |
| Lines on a grid | Never intersect | Meet at 90° angle |
| Sign of slopes | Same sign | Opposite signs (if m₁>0, m₂<0) |

Special case check: If m₁ = 0 (horizontal), the perpendicular is a vertical line (m undefined). If m₁ is undefined (vertical), the perpendicular is horizontal (m=0).

**P49 — ADAPTIVE CHECKPOINT:**
"Determine whether the lines through (0,1),(3,7) and through (1,4),(3,5) are parallel, perpendicular, or neither."

- CORRECT (m₁=2, m₂=1/2; product=1≠−1, not equal → neither): "Correctly computed both slopes. Neither equal (not parallel) nor negative reciprocals (not perpendicular) — neither relationship holds." → TA-A04
- PARTIAL (slopes correct but misclassified — called perpendicular): "Check: m₁×m₂=2×(1/2)=1. For perpendicular, we need −1. Since 1≠−1, these are NOT perpendicular." → TA-A04
- INCORRECT (computed either slope wrong): Walk through Δy/Δx for each line pair: m₁=(7−1)/(3−0)=2; m₂=(5−4)/(3−1)=1/2. → TA-B01
- NO_RESPONSE: "m₁=(7−1)/(3−0)=6/3=2; m₂=(5−4)/(3−1)=1/2. Not equal → not parallel. Product: 2×(1/2)=1≠−1 → not perpendicular. Answer: neither." → TA-A04

---

### TA-A04 — Mastery Gate (P91)
**Primitive sequence:** P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

MAMR: 90% → PASS requires ⌈0.90 × 5⌉ = 5/5 (4 P77 items + 1 P76 item).

**P77 — MULTI-PROBLEM SET (4 items):**

Item 1: Find the slope of the line through (2, 3) and (5, 9). [Answer: m = (9−3)/(5−2) = 6/3 = 2]
Item 2: A line has slope 3. What is the slope of a line perpendicular to it? [Answer: −1/3]
Item 3: True or False — the slope of a line is the same no matter which two points on the line you choose. [Answer: TRUE]
Item 4: State the slope of the vertical line x=5 and the horizontal line y=7. [Answer: vertical: undefined; horizontal: m=0]

**P55 — SCORE:** Record items correct out of 4.

**P76 — TRANSFER PROBE (cross-link to math.calc.derivative-intro):**
Let f(x) = x². Consider the secant line through (1, f(1)) = (1, 1) and (1+h, f(1+h)) = (1+h, (1+h)²).

(a) Write an expression for the slope of the secant line in terms of h.
[Answer: m_sec = ((1+h)²−1)/h = (1+2h+h²−1)/h = (2h+h²)/h = 2+h]

(b) Compute m_sec for h=1, h=0.1, h=0.01.
[Answers: h=1 → 3; h=0.1 → 2.1; h=0.01 → 2.01]

(c) What value does m_sec approach as h→0?
[Answer: 2 — this is the slope of the tangent line at x=1, which equals f'(1) = 2x|_{x=1} = 2]

(d) How does this connect slope to the derivative?
[The derivative f'(1) is the limit of secant slopes as h→0 — slope is the discrete precursor to the derivative.]

**P55 — SCORE:** Record P76 correct (1) or incorrect (0).

**P75 — MASTERY ASSESSMENT:** Total score = P77 score + P76 score (max 5).

**P55 — SCORE:** Final score out of 5.

**P74 — ROUTING DECISION:**
- Score 5/5 → PASS → P78 COMPLETION
- Score < 5/5 → FAIL → Route to TA-B01 (slope computation / invariance errors) or TA-B02 (parallel/perpendicular errors)

**P55 — SCORE:** Log routing outcome.

**P78 — COMPLETION:**
> "Slope of a line: mastered. You can compute slope from any two points, apply the parallel and perpendicular slope conditions, handle horizontal and vertical special cases, and see how slope extends to the derivative concept. This directly enables linear equations, rates of change, and introductory calculus."

---

## Component 5 — Protocol B (Repair Path)

### TA-B01 — Repair: Delta-Y/Delta-X Reversed or Slope Invariance Confusion
**Primitive sequence:** P27 → P41 → P64

**P27 — MISCONCEPTION NAMING:**
> "Two connected errors appear here: DELTA-Y-OVER-DELTA-X-REVERSED (computing Δx/Δy instead of Δy/Δx) and SLOPE-DEPENDS-ON-POINT-CHOICE (believing the slope changes if you pick different points on the same line). Both stem from not anchoring the formula: slope = rise ÷ run = vertical change ÷ horizontal change."

**P41 — MISCONCEPTION DETECTOR:**
> "For points (2,3) and (5,9): Δy=9−3=6 (vertical, goes on TOP). Δx=5−2=3 (horizontal, goes on BOTTOM). Slope = 6/3 = 2. If you got 1/2, you placed Δx on top — that's the reciprocal. Now try a different pair on the same line y=2x−1: (0,−1) and (4,7). Δy=8, Δx=4, m=2. Same answer — slope is a property of the line, not of the point pair."

**P64 — CONCEPTUAL SHIFT:**
> "Mnemonic: y is vertical (up-down), x is horizontal (left-right). Slope is vertical ÷ horizontal. Say it: 'y over x, rise over run.' Anchor the formula with the staircase image: the stair height (Δy) sits above the stair depth (Δx)."

→ TA-A01

---

### TA-B02 — Repair: Perpendicular-Slopes-Equal
**Primitive sequence:** P27 → P41 → P64

**P27 — MISCONCEPTION NAMING:**
> "The error here is PERPENDICULAR-SLOPES-EQUAL — claiming that perpendicular lines have the same slope. This conflates two completely different geometric relationships: parallel (same direction) and perpendicular (right-angle, opposing tilt)."

**P41 — MISCONCEPTION DETECTOR:**
> "If two perpendicular lines both had slope 3, they'd tilt in exactly the same direction — they'd be parallel, not perpendicular. A line with slope 3 rises 3 units per unit right. Its perpendicular must fall 1/3 unit per unit right: slope = −1/3. Check: 3 × (−1/3) = −1. That product of −1 is the perpendicular test."

**P64 — CONCEPTUAL SHIFT:**
> "Two separate rules, two separate geometric relationships. Parallel: same slope (same direction). Perpendicular: negative reciprocal (opposite tilt, product = −1). Apply the flip-and-negate procedure: given m, write it as a fraction, flip numerator and denominator, then negate. Example: m=2/3 → flip to 3/2 → negate to −3/2."

→ TA-A02

---

## Component 6 — P89 Spaced Repetition Schedule

```
P89:
  concept_id: math.geom.slope
  MAMR: 0.90
  intervals: [1, 3, 7, 14, 30]
  session_1_probe: "Slope of the line through (−2, 5) and (4, 11)?"
  session_3_probe: "A line has slope −2/3. What is the slope of a perpendicular line?"
  session_7_probe: "Show that (0,1),(2,5),(5,11) are collinear using slope."
  session_14_probe: "A line through (1,2) is perpendicular to y=4x+1. Write its equation."
  session_30_probe: "Explain why slope is called a 'rate of change' and connect it to average velocity."
```

---

## Component 7 — Cross-Blueprint Dependencies

**Requires (prerequisites with blueprints):**
- math.geom.coordinate-plane — plotting points (x,y); Cartesian system [BLUEPRINT EXISTS]

**Unlocks:**
- math.geom.line-equation — y=mx+b form uses slope directly

**Cross-links:** [math.calc.derivative-intro] — Tier 1 concept; P76 cross-link probe used.

**GR-8 satisfied:** all prerequisite and unlock relationships documented.
**GR-9 satisfied:** math.calc.derivative-intro is Tier 1 → P76 cross-link probe applied in TA-A04.

---

## Component 8 — Teaching Notes

**Pedagogical priority:** The staircase analogy (P03) must establish the rise-over-run intuition pictorially before the formula is introduced. Learners who only see the formula without the spatial intuition almost universally develop MC-1 (DELTA-Y-OVER-DELTA-X-REVERSED).

**Invariance is the hard idea:** MC-2 (SLOPE-DEPENDS-ON-POINT-CHOICE) is surprisingly persistent. Reinforce invariance explicitly by demonstrating the same slope from two different point pairs on the same line during TA-A01. If the checkpoint reveals this misconception, route to TA-B01.

**Perpendicular rule precision:** Always state the full rule as m₁ × m₂ = −1, not just "flip and negate" (which learners may misapply to m=0 or m undefined). The product = −1 is the definitive verification.

**Special cases must be explicit:** m=0 for horizontal and m=undefined for vertical are both tested in the mastery gate. Establish them during TA-A01 so they are not surprises at the gate.

**V-3 check:** N/A — difficulty is proficient; CPA_ENTRY=P (not C, so V-3 concrete-anchor check does not apply).

**GR-10 — MAMR enforcement:** MAMR = 90%. A learner who scores 4/5 on the P91 gate does NOT receive mastery credit. Routes to TA-B01 (slope computation / invariance errors) or TA-B02 (parallel/perpendicular errors), then retakes the gate. A score of 5/5 is required.

---

## Component 10 — Validation Checklist

### Grammar Rules
- [x] GR-1: TA-A01 opens with P03 (B-category primitive for proficient/apply)
- [x] GR-2: Each non-gate TA (A01, A02, A03) contains P49
- [x] GR-3: TA-A04 is terminal (P91 contains P74 → P78 PASS or repair branch)
- [x] GR-4: Repair TAs B01 and B02 open with P27 + P41 + P64
- [x] GR-6: P91 is terminal within TA-A04; no further TAs follow PASS
- [x] GR-7: P76 present in TA-A04 (mastery gate)
- [x] GR-8: Cross-blueprint dependencies documented in Component 7
- [x] GR-9: math.calc.derivative-intro is Tier 1 → P76 cross-link probe applied
- [x] GR-10: MAMR = 90% stated; PASS threshold = 5/5 enforced in P74 routing

### Structural Validators
- [x] V-1: concept_id matches KG entry (math.geom.slope)
- [x] V-2: difficulty=proficient, bloom=apply, h=5, thresh=0.90 match KG
- [x] V-3: N/A — difficulty is proficient; CPA_ENTRY=P
- [x] V-4: All 3 MCs have FOUNDATIONAL flag on MC-1 only
- [x] V-5: P03 correctly anchors TA-A01 (analogy bridge for staircase/rise-over-run)
- [x] V-6: P07 present in TA-A02 (bloom=apply requires worked example pair)
- [x] V-7: P91 structure complete: P77(4 items)→P55→P76→P55→P75→P55→P74→P55→P78
- [x] V-8: PASS criterion: ⌈0.90 × 5⌉ = 5/5 — 4 P77 items + 1 P76 = n=5
- [x] V-9: P74 routes PASS → P78, FAIL → TA-B01 or TA-B02
- [x] V-10: All repair TAs (B01, B02) terminate by routing back to a main TA
- [x] V-11: P49 has four branches (CORRECT/PARTIAL/INCORRECT/NO_RESPONSE) in each TA
- [x] V-12: P77 items are distinct, non-repetitive, cover key skill facets
- [x] V-13: P76 probe is genuine transfer (secant slope → derivative limit, not symbolic repetition)
- [x] V-14: Spaced repetition schedule (P89) present with 5 intervals
- [x] V-15: Component 7 documents requires, unlocks, cross_links explicitly
- [x] V-16: TA chain is lean for h=5 (3 main TAs + gate — within spec)
- [x] V-17: MCs link to repair TAs in Component 2
- [x] V-18: P49 NO_RESPONSE branch gives complete worked demonstration
- [x] V-19: P78 completion statement summarizes what mastery enables
- [x] V-20: Teaching Notes (Component 8) include MAMR restatement and V-3 N/A note

### AIR Assessment
- Actionable: P49 branches provide specific re-routing and feedback for each response type ✓
- Irreversible: Slope formula grounded in staircase analogy before abstraction; invariance demonstrated with multiple point pairs ✓
- Robust: Lean TA chain matches h=5 scope; P91 gate enforces 90% threshold ✓

**STATUS: PACKAGE_READY**
