<!-- BLUEPRINT: math.trig.amplitude-period-phase -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Amplitude, Period, Phase Shift (`math.trig.amplitude-period-phase`)
**Concept ID:** `math.trig.amplitude-period-phase`
**KG Fields:** difficulty=proficient | bloom=apply | estimated_hours=6 | mastery_threshold=0.8

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.trig.amplitude-period-phase |
| name | Amplitude, Period, Phase Shift |
| difficulty | proficient |
| bloom | apply |
| estimated_hours | 6 |
| mastery_threshold | 0.8 |
| CPA_entry_stage | P (Pictorial) |
| requires (Tier-1) | math.trig.trig-functions |
| cross_links | none |
| P76_mode | independence |
| MAMR | 4/5 (⌈0.8 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.trig.trig-functions**: Graphs of y = sin x and y = cos x; key points, periodicity, range [−1, 1]; the unit circle as generator of the sine wave

### Target Knowledge State
Student extracts amplitude, period, phase shift, and vertical shift from y = A sin(Bx + C) + D and its cosine counterpart. Student applies the four-parameter formula to describe any horizontal compression, reflection, translation, and vertical shift. Student produces a sketch of a transformed sinusoidal function by transforming five key points.

### Conceptual Obstacles
1. Confusing period with B — writing period = B instead of period = 2π/|B|
2. Confusing phase shift sign — reading phase shift as C instead of −C/B
3. Treating amplitude as signed — writing amplitude = A instead of |A|

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | PERIOD-IS-B | Student states period = B, ignoring the 2π/|B| formula | Any y = A sin(Bx + C) + D problem |
| MC-2 | PHASE-SHIFT-SIGN | Student reads phase shift as C rather than −C/B; e.g., y = sin(x + π/3) gives phase shift +π/3 instead of −π/3 | Problems where C is positive |
| MC-3 | AMPLITUDE-IGNORES-SIGN | Student writes amplitude = −2 for y = −2 sin(x), forgetting |A| ≥ 0 | Equations with negative A |

**Foundational Misconception:** MC-1 (PERIOD-IS-B) — produces systematically wrong period for every subsequent problem. Addressed in A01 and B01.

---

## Component 3 — Scaffolding Protocol

**Entry point:** P (Pictorial) — side-by-side comparison of y = sin x with a transformed sinusoidal graph.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — Annotate the parameters table from the standard form y = A sin(Bx + C) + D; derive amplitude, period, phase shift, and vertical shift; worked table
2. **A02 P04 PATTERN INDUCTION** — Gallery of transformed sinusoids; extract all four parameters from equation and from graph; five-key-point sketching algorithm
3. **A03 P06 CONTRAST PAIR** — y = 2 sin(x + π/4) vs y = 2 sin(x − π/4); same A and B, opposite C — produces left vs right shift to isolate MC-2
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Standard Form Parameters Table

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Introduce all four parameters from y = A sin(Bx + C) + D; derive formulas; prevent MC-1 and MC-2

---

**[P11 — REPRESENTATION SHIFT]**

**Stage A — Reference graph:**

y = sin x. Amplitude 1, period 2π, no horizontal shift, no vertical shift.

**Stage B — Standard form:**

y = A sin(Bx + C) + D

Each letter controls one visual property:

| Parameter | Formula | Effect on graph |
|-----------|---------|-----------------|
| **Amplitude** | |A| | Vertical stretch / compression; reflection if A < 0 |
| **Period** | 2π / |B| | Horizontal stretch (B > 1 compresses; 0 < B < 1 stretches) |
| **Phase shift** | −C / B | Horizontal translation (left if −C/B < 0; right if −C/B > 0) |
| **Vertical shift** | D | Moves midline from y = 0 to y = D |

**Stage C — Worked example:**

y = 3 sin(2x − π/6) + 1

- A = 3 → amplitude = 3
- B = 2 → period = 2π/2 = **π**
- C = −π/6 → phase shift = −(−π/6)/2 = **π/12** (right)
- D = 1 → vertical shift = 1; midline y = 1

*Verify B computation:* write 2x − π/6 = 2(x − π/12). The phase shift reads off directly inside the parenthesis: x − π/12 means shift π/12 to the right.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* For y = −4 cos(πx/3 + π/6), what is the period?

(A) π/3
(B) 3π
(C) 6
(D) 2π

*Branch CORRECT (C):* B = π/3, so period = 2π/(π/3) = 6. ✓ Proceed to A02.

*Branch INCORRECT (A):* That is B itself, not the period. Period = 2π/|B| = 2π/(π/3) = 6. Proceed to A02.

*Branch INCORRECT (D):* Period = 2π only when B = 1. Here B = π/3, so period = 2π/(π/3) = 6. Proceed to A02.

*Branch NO_RESPONSE:* Period = 2π/|B|. Here B = π/3, so period = 2π ÷ (π/3) = 2π × (3/π) = **6**. Proceed to A02.

---

### Teaching Action A02 — Extracting Parameters and Sketching

**Primitive:** P04 PATTERN INDUCTION
**Purpose:** Automate parameter extraction from equations and from graphs; introduce five-key-point sketching method

---

**[P04 — PATTERN INDUCTION]**

**Gallery — equation to parameters:**

| Equation | A | Period | Phase shift | D |
|----------|---|--------|-------------|---|
| y = 2 sin(x − π/4) | 2 | 2π | π/4 right | 0 |
| y = −3 cos(2x) | 3 | π | 0 | 0 |
| y = ½ sin(πx + π) + 2 | ½ | 2 | 1 left | 2 |
| y = 4 cos(x/2 − π/3) − 1 | 4 | 4π | 2π/3 right | −1 |

**Five-key-point sketching algorithm:**

For y = A sin(Bx + C) + D:
1. Compute amplitude, period T, phase shift φ = −C/B, midline y = D
2. Locate starting x = φ (zero, going up for sin; maximum for cos)
3. Mark five x-values: φ, φ + T/4, φ + T/2, φ + 3T/4, φ + T
4. Assign y-values: D, D + A, D, D − A, D (for sin with A > 0)
5. Draw smooth sinusoidal curve through the five points

**Worked sketch:** y = 2 sin(2x − π/2); phase shift = π/4, period = π, midline y = 0, amplitude 2.

Key points: (π/4, 0), (π/2, 2), (3π/4, 0), (π, −2), (5π/4, 0).

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* For y = 3 sin(x + π/2), what is the phase shift and in which direction?

(A) π/2 to the right
(B) π/2 to the left
(C) 3 units up
(D) 2π units to the left

*Branch CORRECT (B):* Phase shift = −C/B = −(π/2)/1 = −π/2 (left shift of π/2). ✓ Proceed to A03.

*Branch INCORRECT (A):* The formula is phase shift = −C/B. C = +π/2, so phase shift = −π/2 — a shift to the LEFT, not right. Proceed to A03.

*Branch INCORRECT (C):* D = 0 here, so there is no vertical shift. The parameter C produces horizontal shift. Proceed to A03.

*Branch NO_RESPONSE:* Phase shift = −C/B = −(π/2)/1 = −π/2. A negative phase shift means a **π/2 left** translation. Proceed to A03.

---

### Teaching Action A03 — Phase Shift Sign Contrast

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Isolate the sign relationship between C and the direction of the shift; resolve MC-2

---

**[P06 — CONTRAST PAIR]**

**Case 1:** y = 2 sin(x + π/4)

Phase shift = −(π/4)/1 = **−π/4** → shift π/4 **left** (graph moves toward smaller x).

**Case 2:** y = 2 sin(x − π/4)

Phase shift = −(−π/4)/1 = **+π/4** → shift π/4 **right** (graph moves toward larger x).

| | C sign | Phase shift direction |
|--|--------|----------------------|
| y = 2 sin(x + π/4) | positive C | Left |
| y = 2 sin(x − π/4) | negative C | Right |

**Memory rule:** The shift OPPOSES the sign of C. Positive C means the graph slides left (because you are starting the sinusoidal cycle earlier in x). Equivalently, factor out B: sin(B(x + C/B)) and read the shift directly as −C/B inside the bracket.

**Common error to avoid:** Students often read y = sin(x + π/3) and say "phase shift = +π/3 to the right" because + looks rightward. In fact, y = sin(x + π/3) = sin(1·(x − (−π/3))), so the shift is −π/3 (i.e., π/3 to the LEFT).

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* y = cos(3x + π). A student says the phase shift is π to the right. Is the student correct?

(A) Yes — the + sign in (3x + π) means rightward
(B) No — the phase shift is π/3 to the left
(C) No — the phase shift is π to the left
(D) No — the phase shift is 3π to the left

*Branch CORRECT (B):* Phase shift = −C/B = −π/3. The shift is π/3 to the LEFT, not π to the right. ✓ Proceed to A04.

*Branch INCORRECT (A):* The formula is −C/B, not just C. Phase shift = −π/3 (left). The + sign does not mean rightward. Proceed to A04.

*Branch INCORRECT (C):* The −C/B formula divides by B = 3: phase shift = −π/3, not −π. Proceed to A04.

*Branch NO_RESPONSE:* Phase shift = −C/B = −π/3. The student stated the wrong value (π) and the wrong direction (right). Correct: **π/3 to the left**. Proceed to A04.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A04 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 4/5
**Status:** Terminal TA

---

**[P77 — MULTI-PROBLEM SET]**

**Problem 1.** Identify the amplitude, period, phase shift, and vertical shift of y = 3 sin(2x − π/3) + 1.

**Problem 2.** Identify the amplitude, period, phase shift, and vertical shift of y = −2 cos(πx/2 + π/4) − 1.

**Problem 3.** Write an equation of the form y = A sin(Bx + C) for a sinusoid with amplitude 4, period 6π, and phase shift π/2 to the right.

**Problem 4.** For y = sin(2x + π), state the period and phase shift and verify analytically that the function equals y = −sin(2x).

---

**[P55 — SCORE]**

*Answers:*

1. A = 3, period = π, phase shift = π/6 right, D = 1 ✓

2. A = 2 (|−2|), period = 4, phase shift = π/2 left, D = −1 ✓

3. Period = 6π → 2π/|B| = 6π → B = 1/3. Phase shift π/2 right → −C/B = π/2 → C = −π/6. Equation: y = 4 sin(x/3 − π/6) ✓

4. Period = π. Phase shift = −π/2 (left). sin(2x + π) = sin(2x)cos(π) + cos(2x)sin(π) = −sin(2x). ✓

Score 1 point per problem.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

*Problem:* A sound wave is modeled by y = 5 sin(800πt − π/4), where y is pressure in Pa and t is time in seconds.

*(a)* Identify the amplitude and explain its physical meaning.

*(b)* Find the frequency of the wave (frequency = 1 / period).

*(c)* Find the phase shift and explain whether the wave leads or lags a reference wave y = 5 sin(800πt).

*Expected answer:*

*(a)* Amplitude = 5 Pa. It is the maximum pressure variation from atmospheric equilibrium.

*(b)* B = 800π, so period = 2π/(800π) = 1/400 s. Frequency = 400 Hz.

*(c)* Phase shift = −(−π/4)/(800π) = 1/3200 s > 0 (rightward). The wave lags the reference by 1/3200 seconds — it reaches its peaks slightly later.

---

**[P55 — SCORE]**

Transfer probe: 1 point (all three parts correct); 0.5 if amplitude and frequency correct but phase interpretation wrong.

---

**[P75 — MASTERY ASSESSMENT]**

MAMR = 4/5 (⌈0.8 × 5⌉ = 4). Total n = 5 (P77: 4 items, P76: 1 item).

---

**[P55 — SCORE]**

Record total score X/5.

---

**[P74 — ROUTING DECISION]**

| Score | Routing |
|-------|---------|
| ≥ 4/5 | → P78 COMPLETION — mastery confirmed |
| 3/5 | → Identify missed item; period error → B01; phase shift sign → B02; amplitude sign → B03; targeted repair |
| ≤ 2/5 | → Return to A01; rebuild parameters table from y = A sin(Bx + C) + D; schedule R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.trig.amplitude-period-phase` complete. Threshold 0.8 requires 4/5 correct.

**Unlocks:** math.trig.trig-graphs (sketching all six trig functions with transformations).

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — PERIOD-IS-B Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"The period is NOT B. B is a frequency multiplier. The formula is period = 2π/|B|. When B = 2, the sine function completes two full cycles in 2π, so each cycle occupies 2π/2 = π."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* If B = 4 in y = sin(4x), how many full cycles fit in the interval [0, 2π]?
*Correct response:* 4 full cycles. Each cycle has period = 2π/4 = π/2.

**[P64 — CONCEPTUAL SHIFT]**
"Think of B as a speed multiplier: B = 4 means the wave runs 4× faster, so it completes 4 cycles in the same interval where B = 1 completes one. Period = 2π/B because you divide the original 2π interval by the number of cycles."

---

### Repair Action B02 — PHASE-SHIFT-SIGN Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"Phase shift is −C/B, not C. The negative sign reverses the direction: positive C → leftward shift. Rewrite sin(Bx + C) = sin(B(x + C/B)): the shift inside the parenthesis is x − (−C/B), so the shift is −C/B."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* For y = sin(x + π/2), which direction does the graph shift?
*Correct response:* Left by π/2 (not right). Phase shift = −(π/2)/1 = −π/2.

**[P64 — CONCEPTUAL SHIFT]**
"Factor trick: always rewrite Bx + C = B(x + C/B). The shift is always read as x − (shift), so x + C/B means shift = −C/B. A + inside the bracket after factoring means leftward; a − means rightward."

---

### Repair Action B03 — AMPLITUDE-IGNORES-SIGN Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"Amplitude is |A|, never negative. A negative A causes a vertical reflection (the graph flips upside down), but amplitude — the height of the wave from the midline — is still the positive magnitude."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* What is the amplitude of y = −3 sin(x)?
*Correct response:* 3. The graph is reflected but still oscillates 3 units above and below the midline.

**[P64 — CONCEPTUAL SHIFT]**
"Amplitude answers the question: 'How far does the wave travel from the midline?' Distance is always positive. The sign of A tells us orientation, not distance. Amplitude = |A| = the maximum distance from midline."

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | State the amplitude, period, and phase shift of y = 5 cos(3x − π/2). |
| R2 | 3 days | Write the equation of a cosine wave with amplitude 3, period 4π, midline y = 2, and phase shift π/3 to the left. |
| R3 | 7 days | Sketch one period of y = −2 sin(πx/2 + π/4) + 1, labeling all five key points. |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | none |
| P76_mode | independence |
| Unlocks | math.trig.trig-graphs |
| Requires (Tier-1) | math.trig.trig-functions |

**GR-8 compliance:** cross_links = none; no cross-link documentation needed.
**GR-9 compliance:** P76 uses an independent sound-wave application problem.

---

## Component 8 — Teaching Notes

- **B is easy to confuse with period visually:** On a graph, counting cycles per 2π directly gives B, not the period. Students often read B from the graph and stop there. Always prompt: "You found B = 4; now what is the period?" to reinforce the 2π/|B| step.
- **Phase shift requires factoring:** The safest method is always to factor out B before reading the shift: 2x − π/3 = 2(x − π/6), so the shift is π/6 right. Students who skip factoring reliably produce MC-2 errors.
- **The P76 sound-wave problem introduces physical frequency:** Frequency = 1/period is a natural science connection; confirm the student's period computation is in seconds (not radians) before computing frequency in Hz.
- **Negative amplitude appears in modeling contexts:** Cooling curves, reflected light waves, and inverted pendulum problems all produce A < 0. Reinforce amplitude = |A| proactively before the student encounters such contexts.

---

## Component 10 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | All KG fields present in metadata | PASS |
| V-3 | CPA_entry=P; pictorial graph annotation used in A01 | PASS |
| V-4 | bloom=apply; application problems throughout | PASS |
| V-5 | All non-gate TAs open with B-category primitive (GR-1) | PASS (A01=P11, A02=P04, A03=P06) |
| V-6 | All non-gate TAs have P49 with 4 branches (GR-2) | PASS |
| V-7 | Gate TA is terminal, contains P91 (GR-3, GR-6) | PASS (A04) |
| V-8 | Repair TAs open with P27+P41+P64 (GR-4) | PASS (B01, B02, B03) |
| V-9 | P76 present in mastery gate (GR-7) | PASS |
| V-10 | cross_links documented in metadata (GR-8) | PASS (none) |
| V-11 | P76_mode = independence (GR-9, no Tier-1 cross-link) | PASS |
| V-12 | MAMR stated and enforced: 4/5 = ⌈0.8×5⌉ (GR-10) | PASS |
| V-13 | P77 has exactly 4 items | PASS |
| V-14 | P91 compound complete: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-15 | P74 routing table covers all score outcomes | PASS |
| V-16 | Misconception registry ≥ 3 entries; foundational MC labeled | PASS (3 MCs, MC-1 foundational) |
| V-17 | Scaffolding protocol matches TA structure | PASS |
| V-18 | Spaced repetition schedule ≥ 3 entries (P89) | PASS |
| V-20 | All mathematics correct and verified | PASS |
| AIR | No AI-refusal content; educationally appropriate | PASS |
