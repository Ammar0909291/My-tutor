<!-- BLUEPRINT: math.trig.trig-graphs -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Graphs of Trigonometric Functions (`math.trig.trig-graphs`)
**Concept ID:** `math.trig.trig-graphs`
**KG Fields:** difficulty=proficient | bloom=apply | estimated_hours=5 | mastery_threshold=0.8

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.trig.trig-graphs |
| name | Graphs of Trigonometric Functions |
| difficulty | proficient |
| bloom | apply |
| estimated_hours | 5 |
| mastery_threshold | 0.8 |
| CPA_entry_stage | P (Pictorial) |
| requires (Tier-1) | math.trig.amplitude-period-phase |
| cross_links | none |
| P76_mode | independence |
| MAMR | 4/5 (⌈0.8 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.trig.amplitude-period-phase**: Amplitude, period, phase shift, and vertical shift of y = A sin(Bx + C) + D; five-key-point sketching algorithm

### Target Knowledge State
Student sketches y = sin x, y = cos x, and y = tan x over one full period, labelling all zeros, maxima, minima, and (for tan) vertical asymptotes. Student applies the five-key-point algorithm from the amplitude-period-phase blueprint to sketch any transformed sinusoidal function and identifies its key features from a given graph. Student explains why cos is a phase-shifted version of sin and why tan has period π.

### Conceptual Obstacles
1. Assigning period 2π to the tangent function instead of π
2. Starting cos x at y = 0 (like sin x) rather than at its maximum y = 1
3. Shifting the graph in the wrong direction when phase shift is applied

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | TANGENT-PERIOD-2PI | Student graphs tan x with one full period spanning [0, 2π] rather than [0, π] | Any tangent graphing problem |
| MC-2 | COS-STARTS-ZERO | Student draws cos x starting at y = 0 (treating it like sin x), missing the initial maximum at (0, 1) | Sketching y = cos x or transformed cosine |
| MC-3 | PHASE-SHIFT-DIRECTION | Student shifts the graph right when the equation indicates a left shift (or vice versa) | y = sin(x + C) problems with C > 0 |

**Foundational Misconception:** MC-1 (TANGENT-PERIOD-2PI) — produces a graph that is the right shape but wrong period, with asymptotes at 2π instead of π. Addressed in A02 and B01.

---

## Component 3 — Scaffolding Protocol

**Entry point:** P (Pictorial) — side-by-side graphs of sin x, cos x, and tan x over [−π, 2π].

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — Display the three reference graphs with key features annotated; state the cos = sin(x + π/2) phase relationship; tan asymptote derivation
2. **A02 P04 PATTERN INDUCTION** — Gallery: identify equations from graphs and sketch graphs from equations; apply five-key-point algorithm for transformed sinusoids; read off asymptote positions for tan(Bx + C)
3. **A03 P06 CONTRAST PAIR** — y = sin x vs y = cos x: identical amplitude and period, but cos starts at max (0, 1) while sin starts at zero — phase relationship verified analytically
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Reference Graphs and Key Features

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Establish the canonical shapes, key points, and asymptotes for sin, cos, and tan; prevent MC-1 and MC-2

---

**[P11 — REPRESENTATION SHIFT]**

**Stage A — y = sin x:**

Key points over [0, 2π]: (0, 0), (π/2, 1), (π, 0), (3π/2, −1), (2π, 0).
- Amplitude 1, period 2π, no asymptotes.
- Starts at zero, rises to maximum at π/2, falls through zero at π, minimum at 3π/2, back to zero at 2π.

**Stage B — y = cos x:**

Key points over [0, 2π]: (0, 1), (π/2, 0), (π, −1), (3π/2, 0), (2π, 1).
- Amplitude 1, period 2π, no asymptotes.
- Starts at maximum (0, 1) — this is the critical distinction from sin.
- Relationship: cos x = sin(x + π/2). Cosine is sin shifted π/2 to the LEFT.

**Stage C — y = tan x:**

Key features over (−π/2, π/2):
- Vertical asymptotes at x = ±π/2 (where cos x = 0, making tan = sin/cos undefined)
- Zero at x = 0; rises from −∞ to +∞ across one period
- Period = **π** (not 2π): two full branches fit within [−π/2, 3π/2]
- Asymptotes: x = π/2 + kπ for all integers k

**Stage D — Summary comparison:**

| Function | Period | Amplitude | Starts at | Asymptotes? |
|----------|--------|-----------|-----------|-------------|
| sin x | 2π | 1 | (0, 0) | No |
| cos x | 2π | 1 | (0, 1) | No |
| tan x | **π** | undefined | (0, 0) | Yes, at π/2 + kπ |

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* At what x-value does y = tan x have its first positive vertical asymptote (x > 0)?

(A) x = π
(B) x = π/2
(C) x = 2π
(D) x = π/4

*Branch CORRECT (B):* tan x = sin x / cos x is undefined when cos x = 0; the first positive zero of cos x is x = π/2. ✓ Proceed to A02.

*Branch INCORRECT (A):* x = π is where sin x = 0, not cos x. tan π = 0 (a zero, not an asymptote). The asymptote is at π/2. Proceed to A02.

*Branch INCORRECT (C):* x = 2π is a zero of both sin and cos — wait, cos(2π) = 1 ≠ 0. The asymptote is at π/2, where cos(π/2) = 0. Proceed to A02.

*Branch NO_RESPONSE:* tan x is undefined where cos x = 0; the first positive zero of cos x is at **π/2**. Proceed to A02.

---

### Teaching Action A02 — Sketching and Identifying Transformed Trig Graphs

**Primitive:** P04 PATTERN INDUCTION
**Purpose:** Apply the amplitude-period-phase algorithm to sketching; read parameters from graphs; handle transformed tangent with asymptotes

---

**[P04 — PATTERN INDUCTION]**

**Five-key-point algorithm (from amplitude-period-phase blueprint, applied here):**
1. Compute amplitude |A|, period T = 2π/|B|, phase shift φ = −C/B, midline D
2. Starting x: φ (zero for sin; maximum for cos)
3. Five x-values: φ, φ + T/4, φ + T/2, φ + 3T/4, φ + T
4. y-values for A sin: D, D + A, D, D − A, D
5. Sketch smooth sinusoidal curve

**Gallery — equation to graph:**

| Equation | Key points (5) |
|----------|----------------|
| y = 2 sin(x − π/4) | (π/4, 0), (3π/4, 2), (5π/4, 0), (7π/4, −2), (9π/4, 0) |
| y = −cos(2x) | (0, −1), (π/4, 0), (π/2, 1), (3π/4, 0), (π, −1) — cos reflected |
| y = 3 sin(πx) + 1 | period 2; key points at x = 0, ½, 1, 3/2, 2 with y = 1, 4, 1, −2, 1 |

**Tangent transformations — asymptote rule:**

For y = A tan(Bx + C), asymptotes occur where Bx + C = π/2 + kπ, i.e., x = (π/2 − C + kπ)/B.

Period of y = A tan(Bx + C): T = π/|B|.

**Gallery — tangent:**

| Equation | Period | Asymptotes |
|----------|--------|------------|
| y = tan(2x) | π/2 | x = π/4 + kπ/2 |
| y = tan(x − π/4) | π | x = 3π/4 + kπ |

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* For y = 3 cos(x + π/3), what is the y-intercept (value at x = 0)?

(A) 3
(B) 3/2
(C) 0
(D) 3√3/2

*Branch CORRECT (B):* y(0) = 3 cos(π/3) = 3 · (1/2) = 3/2. ✓ Proceed to A03.

*Branch INCORRECT (A):* y(0) = 3 cos(0 + π/3) = 3 cos(π/3) = 3 · (1/2) = 3/2, not 3 (which would be the amplitude). Proceed to A03.

*Branch INCORRECT (C):* cos(π/3) = 1/2, not 0. y(0) = 3 · (1/2) = 3/2. Proceed to A03.

*Branch NO_RESPONSE:* y(0) = 3 cos(0 + π/3) = 3 · cos(60°) = 3 · (1/2) = **3/2**. Proceed to A03.

---

### Teaching Action A03 — sin vs cos: Phase Relationship

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Show cos as a horizontal phase shift of sin; resolve MC-2 by anchoring the (0, 1) starting point

---

**[P06 — CONTRAST PAIR]**

**Side-by-side analysis:**

| | y = sin x | y = cos x |
|--|---------- |---------- |
| Value at x = 0 | sin 0 = **0** | cos 0 = **1** |
| First maximum | x = π/2, y = 1 | x = **0**, y = 1 |
| First zero (after max) | x = 0 (start) | x = π/2 |
| First minimum | x = 3π/2, y = −1 | x = π, y = −1 |

**Analytical verification:**

cos x = sin(x + π/2) [shift sin left by π/2]

or equivalently: sin x = cos(x − π/2) [shift cos right by π/2]

**Why cos starts at its maximum:** At x = 0, cos(0) = 1 — this is the full amplitude. The cosine function begins at the top of its range and immediately begins to decrease, crossing zero at π/2. This is the defining feature that distinguishes cos from sin visually.

**Error to avoid:** Drawing cos x as a sine wave that starts at (0, 0) and then rises — this is y = sin x, not y = cos x.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Which statement correctly describes the relationship between y = sin x and y = cos x?

(A) cos x = sin(x − π/2): cos is sin shifted right by π/2
(B) cos x = sin(x + π/2): cos is sin shifted left by π/2
(C) cos x is sin x reflected over the x-axis
(D) cos x = sin(2x): cos has half the period of sin

*Branch CORRECT (B):* cos x = sin(x + π/2) — shifting sin left by π/2 moves the zero at x = 0 to become the maximum at x = 0. ✓ Proceed to A04.

*Branch INCORRECT (A):* sin(x − π/2) = −cos x (reflected), not cos x. The shift that converts sin to cos is to the LEFT (+π/2), not right. Proceed to A04.

*Branch INCORRECT (C):* −sin x reflects sin over the x-axis; it does not produce cos x. Proceed to A04.

*Branch NO_RESPONSE:* cos x = sin(x + π/2): shifting sin **left by π/2** makes the sine zero at x = 0 become the cosine maximum at x = 0. Proceed to A04.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A04 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 4/5
**Status:** Terminal TA

---

**[P77 — MULTI-PROBLEM SET]**

**Problem 1.** Sketch y = 3 cos(x + π/3) for x ∈ [−π/3, 5π/3], labelling all five key points.

**Problem 2.** A graph shows a sinusoid with amplitude 2, period 4π, and first maximum at (π, 2). Write the equation.

**Problem 3.** Sketch y = tan(2x) for x ∈ [−π/4, 3π/4], marking asymptotes and the zero.

**Problem 4.** For y = −sin(x + π), show analytically that this equals y = sin x and describe the graphical transformations that produce this equivalence.

---

**[P55 — SCORE]**

*Answers:*

1. Phase shift = −π/3 (left); amplitude 3; period 2π; key points: (−π/3, 3), (π/6, 0), (2π/3, −3), (7π/6, 0), (5π/3, 3). ✓

2. Amplitude = 2 → A = 2. Period = 4π → B = 2π/(4π) = 1/2. First maximum at x = π → phase shift = π right → −C/B = π → C = −π/2. Equation: y = 2 cos(x/2 − π/4) or y = 2 sin(x/2 − π/4 − π/2) = 2 sin(x/2 − 3π/4). Either form correct. ✓

3. Period = π/2; asymptotes at x = π/4 and x = 3π/4 (and x = −π/4); zero at x = 0 and x = π/2. ✓

4. −sin(x + π) = −[sin x cos π + cos x sin π] = −[−sin x + 0] = sin x. Graphically: phase shift left by π plus reflection over x-axis, with the two transformations cancelling each other. ✓

Score 1 point per problem.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

*Problem:* An EEG signal is modeled by y = 3 sin(16πt + π/3) µV, where t is in seconds.

*(a)* Find the amplitude, frequency (Hz), and phase shift in seconds.

*(b)* At t = 0, is the signal at a zero, maximum, minimum, or intermediate value? Determine the exact value.

*Expected answer:*

*(a)* Amplitude = 3 µV. B = 16π → period = 2π/(16π) = 1/8 s → frequency = 8 Hz. Phase shift = −(π/3)/(16π) = −1/48 s (left shift of 1/48 s).

*(b)* y(0) = 3 sin(π/3) = 3 · (√3/2) = 3√3/2 ≈ 2.598 µV — an intermediate positive value (between 0 and the maximum of 3).

---

**[P55 — SCORE]**

Transfer probe: 1 point (all three sub-parts of (a) correct and (b) correct); 0.5 if frequency and (b) are correct but phase shift computed incorrectly.

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
| 3/5 | → Identify missed item; tangent period error → B01; cos starting value → B02; phase shift direction → B03; targeted repair |
| ≤ 2/5 | → Return to A01; rebuild reference graphs from key point tables; schedule R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.trig.trig-graphs` complete. Threshold 0.8 requires 4/5 correct.

**Unlocks:** Fourier series; signal processing applications; inverse trig functions graphically.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — TANGENT-PERIOD-2PI Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"The period of tan x is π, not 2π. One complete branch of the tangent (from −∞ to +∞) spans exactly π radians. The graph repeats itself every π, not every 2π."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* Mark two consecutive vertical asymptotes of y = tan x on a number line.
*Correct response:* They are at x = −π/2 and x = π/2, exactly π apart.

**[P64 — CONCEPTUAL SHIFT]**
"tan x = sin x / cos x. Cos x equals zero at π/2 + kπ — every π radians, not every 2π. Each zero of cos x creates a new asymptote of tan, so the asymptotes are π apart and the period is π. Compare: sin and cos have zeros 2π apart (well, π for a half-period), but tan has asymptotes every π."

---

### Repair Action B02 — COS-STARTS-ZERO Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"cos(0) = 1, not 0. The cosine function starts at its MAXIMUM value, not at zero. This is the key difference between the sin and cos graphs."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* What is the y-intercept of y = cos x?
*Correct response:* y = cos(0) = 1. The cosine graph starts at the top.

**[P64 — CONCEPTUAL SHIFT]**
"Think of the unit circle at angle θ = 0: the point is (1, 0). Cos θ is the x-coordinate = 1. Sin θ is the y-coordinate = 0. So at θ = 0, cos starts at 1 and sin starts at 0. The cosine graph opens with its maximum, not with a zero."

---

### Repair Action B03 — PHASE-SHIFT-DIRECTION Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"Phase shift = −C/B. A positive C gives a negative phase shift (leftward translation). y = sin(x + π/3) shifts left by π/3, not right."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* y = cos(x + π/2). In which direction does the graph shift, and by how much?
*Correct response:* Left by π/2. Phase shift = −(π/2)/1 = −π/2 (negative = left). This produces y = cos(x + π/2) = −sin x.

**[P64 — CONCEPTUAL SHIFT]**
"Factor out B to read the shift: sin(B(x + C/B)). The shift x + C/B = x − (−C/B) tells you the graph is at x = −C/B when the argument is 0. Positive C/B means the graph's 'zero position' is at a negative x — a left shift."

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | Sketch one period of y = 2 sin(x − π/2) and state all five key points. |
| R2 | 3 days | For y = tan(x/2), state the period and the equations of the first two positive asymptotes. |
| R3 | 7 days | From the graph: amplitude 3, midline y = 1, period π, first minimum at x = π/4. Write the equation. |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | none |
| P76_mode | independence |
| Unlocks | Fourier analysis; signal processing applications |
| Requires (Tier-1) | math.trig.amplitude-period-phase |

**GR-8 compliance:** cross_links = none; no cross-link documentation needed.
**GR-9 compliance:** P76 uses an independent EEG signal problem.

---

## Component 8 — Teaching Notes

- **Tangent graphing is often skipped or rushed:** Students who struggle with tan x often lack fluency in where cos x = 0 (the asymptote generator). A quick warm-up — "list the zeros of cos x in [−2π, 2π]" — before graphing tan x catches this prerequisite gap early.
- **The cos starts at maximum teaching note prevents a week of downstream confusion:** Students who draw cos starting at zero will get wrong key points for every cosine-transformation problem. A01 reinforces this with both the unit circle derivation and the analytic relationship cos x = sin(x + π/2).
- **P77 Problem 4 is the deepest problem:** Showing −sin(x + π) = sin x analytically requires the sum formula or knowledge that sin(x + π) = −sin x. If the student is blocked, ask "what is sin(0 + π)?" to bootstrap the pattern.
- **EEG context in P76:** The frequency 8 Hz corresponds to the alpha-wave band (8–13 Hz). If a student knows neuroscience basics, this connection deepens transfer. If not, the computation stands alone — do not detour into neuroscience.

---

## Component 10 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | All KG fields present in metadata | PASS |
| V-3 | CPA_entry=P; reference graphs annotated in A01 | PASS |
| V-4 | bloom=apply; sketching, identification, and analytical verification | PASS |
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
