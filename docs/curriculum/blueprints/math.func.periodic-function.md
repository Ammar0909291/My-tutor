# Blueprint: math.func.periodic-function

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.func.periodic-function |
| name | Periodic Functions |
| Domain | math.func |
| Difficulty | proficient |
| Bloom level | understand |
| Estimated hours | 3 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.func.function-concept |
| Cross-links | math.trig.trig-functions |
| Unlocks | — |

## Component 1 — Learning Objective
Given a function f, the student identifies it as periodic by verifying f(x+T)=f(x) for all x in the domain (where T>0 is the period), finds the fundamental period as the smallest such positive T, reads period from a graph, distinguishes period from frequency (f=1/T), applies the concept to sinusoidal functions, and connects to math.trig.trig-functions as the canonical family of periodic functions.

## Component 2 — CPA Entry Stage
**C — Concrete** (physical pendulum cycles, clock hands, seasonal temperature graphs; explicit identification of one complete cycle before abstraction)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | PERIOD-VS-FREQUENCY | Student conflates period T and frequency f=1/T; says "the period is 2 Hz" or "the frequency is 3 seconds" — mixing units and meaning | Type 3 — language contamination ("frequency" in everyday English means "how often" = many times per unit time, but mathematically this is 1/T, not T; students swap the two) |
| MC-2 | PERIOD-IS-THE-PEAK | Student identifies the period as the x-coordinate of the first maximum rather than the horizontal distance to the next identical phase point | Type 5 — instruction-induced (graphs shown with maximum at a "nice" x-value; students anchor on that visible landmark rather than measuring the cycle length) |
| MC-3 | ALMOST-PERIODIC-IS-PERIODIC | Student accepts "nearly repeating" functions (e.g. a damped sinusoid) as periodic because the shape "looks the same"; does not check the exact equality f(x+T)=f(x) for all x | Type 1 — overgeneralization (visual similarity is compelling; students don't verify the algebraic condition, especially where amplitude decays) |

## Component 4 — Session TA Cap
**Cap = 5** (hrs = 3 → cap 5)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of periodicity:**

| Representation | Description | Example: f(x)=sin(x) |
|---|---|---|
| Algebraic | f(x+T)=f(x) for all x in domain, T the fundamental period | sin(x+2π)=sin(x); smallest such T is 2π |
| Graphical | Waveform repeats every T units horizontally; identical shape tile-by-tile | Sine wave repeats every 2π ≈ 6.28 units |
| Physical/contextual | One complete cycle (pendulum swing, wheel rotation, tidal rise-fall) | One full oscillation of a pendulum |
| Period vs. frequency | T = period (seconds per cycle); f = 1/T (cycles per second, Hz) | sin(x): T=2π; "frequency" = 1/(2π) cycles per radian |

**Canonical examples:**

| Function | Fundamental period | Why |
|---|---|---|
| sin(x), cos(x) | 2π | One full unit-circle revolution |
| tan(x) | π | tan(x+π)=tan(x); half-revolution restores tangent |
| sin(2x) | π | Faster oscillation: T=2π/b where b=2 |
| sin(πx) | 2 | b=π gives T=2π/π=2 |
| f(x)=constant | Any T>0 (not defined as fundamental) | Every T works; no smallest positive T |
| f(x)=x | Not periodic | f(x+T)=x+T≠x for T≠0 |

**Fundamental period rule:** if f(x+T)=f(x) for all x and T is the SMALLEST positive value with this property, T is the fundamental period. Proof that smaller periods divide larger ones: if f has periods T₁ and T₂, any linear combination nT₁+mT₂ is also a period.

**P49 checkpoint:**
- CORRECT → "f is periodic with period T iff f(x+T)=f(x) for all x in its domain; T must be the smallest such positive value. Frequency = 1/T." → A02
- PARTIAL (identifies the period but calls it frequency) → "Period T is measured in units of x (e.g. seconds); frequency = 1/T is measured in cycles per second (Hz). Which one equals 'how long one cycle takes'?" → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Look at the graph of sin(x). Where does the pattern first repeat exactly? Measure the horizontal distance from one peak to the next peak." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Transformations and the period — pattern gallery:**

General sinusoidal form: f(x)=A sin(Bx−C)+D or A cos(Bx−C)+D.
Period = 2π/|B|. Amplitude = |A|. Phase shift = C/B (horizontal). Vertical shift = D.

| Function | |B| | Period = 2π/|B| | Amplitude |
|---|---|---|---|
| sin(x) | 1 | 2π ≈ 6.28 | 1 |
| sin(2x) | 2 | π ≈ 3.14 | 1 |
| sin(x/3) | 1/3 | 6π ≈ 18.85 | 1 |
| 3 sin(4x) | 4 | π/2 ≈ 1.57 | 3 |
| cos(πx) | π | 2 | 1 |

**Pattern:** Period = 2π/|B|. Larger |B| → shorter period (faster oscillation). Amplitude |A| has NO effect on period.

**Non-sinusoidal periodic functions:** square wave (period = interval of one on-off cycle), sawtooth wave (period = ramp length), triangle wave. All satisfy f(x+T)=f(x) but are not smooth.

**Checking with the definition:** f(x)=sin(2x). f(x+π)=sin(2(x+π))=sin(2x+2π)=sin(2x)=f(x). ✓ Is π the smallest such T? sin(2x) has period π (verified). sin(2·0)=0, sin(2·π/2)=sin(π)=0, sin(2·π/4)=sin(π/2)=1≠sin(2·0)=0, so T=π/2 fails. Fundamental period = π.

**P49 checkpoint:**
- CORRECT → "Period of A sin(Bx−C)+D is 2π/|B|. The |A|, C, D parameters don't change the period. Check by verifying f(x+T)=f(x) algebraically." → A03
- PARTIAL (applies 2π/B but uses B including its sign, getting a negative period) → "Period is always positive: use |B|, the absolute value of the coefficient of x." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "For f(x)=cos(3x), what value of T makes cos(3(x+T))=cos(3x)? The cosine repeats every 2π, so 3T=2π, giving T=2π/3." → TB-R02 → A03

### A03 — P06 CONTRAST PAIR
**Periodic vs. non-periodic; period vs. frequency:**

**Contrast 1 — Exact repetition required:**

| Function | Periodic? | Why |
|---|---|---|
| f(x)=sin(x) | Yes, T=2π | Exact: sin(x+2π)=sin(x) for all x |
| f(x)=e⁻ˣsin(x) | No | Amplitude decays; f(x+2π)=e⁻(x+2π)sin(x)≠f(x) |
| f(x)=sin(x)+sin(√2·x) | No (irrational ratio) | Ratio of periods 2π/2π√2=1/√2 is irrational; sum never exactly repeats |
| f(x)=sin(x)+sin(2x) | Yes, T=2π | Ratio of periods 2π/π=2 is rational; LCM gives T=2π |

**Contrast 2 — Period of composite functions:**
If f has period T₁ and g has period T₂, then f+g is periodic iff T₁/T₂ is rational, with period = LCM(T₁, T₂).

Example: sin(x) (period 2π) + sin(2x) (period π). LCM(2π, π)=2π. Check: at x+2π, both return to start. Fundamental period = 2π (not π, because sin(x) doesn't have period π).

**Period vs. frequency in context:** A musical note at 440 Hz has period T = 1/440 ≈ 0.00227 seconds. "440 Hz" = 440 cycles per second = the frequency. Confusing period and frequency gives an answer 1/440² off.

**P49 checkpoint:**
- CORRECT → "Periodic requires EXACT algebraic equality f(x+T)=f(x) for all x — visual similarity is insufficient. Period T = 1/frequency. Sum of periodic functions is periodic iff period ratio is rational." → Gate (P91)
- PARTIAL (correct algebraic check, confuses period and frequency) → "If T=0.01 seconds per cycle, how many cycles per second is that? That's the frequency. Period and frequency are reciprocals." → TB-R01 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "Is f(x)=e⁻ˣ·sin(x) periodic? Compute f(0) and f(2π). Are they equal?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 PERIOD-VS-FREQUENCY):**
Step 1 — "Period T: the time (or x-distance) for ONE complete cycle. Units: seconds, radians, meters — always 'per cycle.' Frequency: how many complete cycles occur in one unit of x. Units: cycles per second (Hz), or 1/radian. They are reciprocals: f = 1/T, T = 1/f." Step 2 — Pendulum with T=2 seconds per swing: 0.5 swings per second. Pendulum with T=0.5 seconds: 2 swings per second = 2 Hz. Longer period → lower frequency. Step 3 — "Always check units. If you get '2 Hz' for a period, ask: does Hz mean cycles/second? Then it's a frequency, not a period."

**TB-R02 (MC-2 PERIOD-IS-THE-PEAK):**
Step 1 — "A period is a DISTANCE — measured from any point on the graph to the next point with the same height AND same slope (same phase). Peak-to-peak is a common way to measure it, but only because two consecutive peaks are exactly one cycle apart. The peak's x-coordinate is NOT the period." Step 2 — On sin(x): the first peak is at x=π/2. The second peak is at x=5π/2. Distance = 5π/2−π/2=2π. That distance IS the period. The coordinate π/2 is NOT. Step 3 — "Always measure the HORIZONTAL DISTANCE between two identical-phase points: two peaks, two troughs, two zero-crossings with the same direction. That distance is T."

**TB-R03 (MC-3 ALMOST-PERIODIC-IS-PERIODIC):**
Step 1 — "Periodicity is an EXACT algebraic condition: f(x+T)=f(x) must hold for EVERY x in the domain, not just 'most' x or 'visually similar' x." Step 2 — f(x)=e⁻ˣsin(x). At x=0: f(0)=0. At x=2π: f(2π)=e⁻²π·sin(2π)=0. Looks the same? But at x=1: f(1)=e⁻¹sin(1)≈0.309. At x=1+2π: f(1+2π)=e⁻⁽¹⁺²π⁾sin(1)≈e⁻⁷·⁲⁸·0.841≈0.00061. Not equal. NOT periodic. Step 3 — "Damping (multiplying by e⁻ˣ, or any decaying envelope) always destroys periodicity. Check algebraically by substituting x+T and simplifying."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. For each function, state whether it is periodic and if so find the fundamental period: (a) f(x)=cos(5x); (b) g(x)=tan(x/2); (c) h(x)=|sin(x)|; (d) k(x)=sin(x)·cos(x).
2. A periodic function f has f(3)=7 and period T=4. Find: (a) f(7); (b) f(−1); (c) f(23).
3. Determine whether f(x)=sin(x)+sin(√3 x) is periodic. Justify algebraically.
4. A signal has frequency 60 Hz. (a) Find its period. (b) Write a formula A sin(Bx) with this period (x in seconds). (c) How many complete cycles occur in 0.1 seconds?

**P55 — Reflect & Consolidate:** "Periodic: f(x+T)=f(x) for all x, T = smallest positive such value. Period of A sin(Bx+C)+D is 2π/|B|. Period ≠ peak location. Exact repetition required — damping destroys periodicity. Period × frequency = 1."

**P76 — Transfer Probe (Cross-link mode: math.trig.trig-functions):**
The fundamental period of sin(x) is 2π. (a) Prove that tan(x) has period π, not 2π: show tan(x+π)=tan(x) and that no smaller positive T works. (b) Show that sin(x) does NOT have period π: find a specific x where sin(x+π)≠sin(x). (c) Express sin(x) in terms of cos(x): sin(x)=cos(x−π/2). What does this say about their periods and phase relationship? (d) The function f(x)=sin(nx)+cos(mx) has what period when n and m are positive integers? [Apply the LCM rule.]

**P55 — Reflect & Consolidate:** "Different trig functions have different fundamental periods: sin/cos=2π, tan/cot=π, |sin|/|cos|=π. Taking absolute value halves the period. LCM of periods gives the period of a sum — only when ratios are rational."

**P75 — Mastery Assessment:**
"f(x)=2sin(3x−π)+1. (a) What is the amplitude? (b) What is the fundamental period? (c) What is the phase shift (horizontal displacement from sin(3x))? (d) What is the vertical shift? (e) Verify that f(x+2π/3)=f(x) for all x. (f) Show that f does NOT satisfy f(x+π/3)=f(x) by finding a counterexample."

**P55 — Reflect & Consolidate:** "The full parameter set of A sin(B(x−C))+D: amplitude |A|, period 2π/|B|, phase shift C (right), vertical shift D. Only |B| determines the period. All other parameters change amplitude, position, or level — not the cycle length."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.func.periodic-function complete
- Score 3/5 → REVIEW period vs. frequency and exact-periodicity condition; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.func.function-concept; reassign

**P78 — Completion:** Periodic functions certified. Student identifies periodic functions algebraically and graphically, finds the fundamental period, applies the 2π/|B| rule for sinusoidal functions, distinguishes period from frequency, and uses the rational-ratio criterion for sums of periodic functions.

## Component 8 — P76 Transfer Probe Detail
**Mode: Cross-link** (cross_links = ['math.trig.trig-functions'])
Target: Fundamental periods of all six trig functions; proof that period of tan is π not 2π; LCM rule for period of sums; phase relationship between sin and cos
Skill tested: Prove minimum period via contradiction; apply LCM to identify compound period; connect phase shift notation to co-function identity

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
