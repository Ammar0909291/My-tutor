# Teaching Blueprint — phys.em.ac-basics

## Component 0 — Concept Identity

```yaml
concept_id: phys.em.ac-basics
name: AC Circuit Basics
domain: electromagnetism
difficulty:
  label: advanced
  number: 5
bloom: apply
prerequisites:
  - phys.em.ohms-law
  - phys.em.faradays-law
mastery_threshold: 0.80
estimated_hours: 6
cross_links:
  - phys.em.lc-circuits
  - phys.em.self-inductance
  - phys.em.capacitance
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 5 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation Blocks

### Block 1-A — AC Waveform and Key Parameters
An AC source produces a sinusoidally varying voltage:

> **v(t) = V_m sin(ωt + φ)** or V_m cos(ωt)

Parameters:
- V_m (or V_p): peak voltage (amplitude)
- ω = 2πf: angular frequency (rad/s)
- f: frequency (Hz); T = 1/f: period (s)
- φ: phase angle (rad)

**RMS values** (root mean square) — what appears on meters and power ratings:
> **V_rms = V_m/√2 ≈ 0.707 V_m**
> **I_rms = I_m/√2 ≈ 0.707 I_m**

RMS voltage produces the same average power in a resistor as an equal DC voltage. Household supply: 230 V_rms (UK/EU), 120 V_rms (US); peak = 325 V or 170 V respectively.

Average power: **P_avg = V_rms I_rms cos φ** (where φ is the phase difference between V and I)

### Block 1-B — Resistor, Capacitor, Inductor in AC

**Resistor** (R):
- V and I are **in phase** (φ = 0)
- V_R = IR (Ohm's law holds instantaneously)
- Opposition: R (unchanged with frequency)

**Capacitor** (C):
- Current **leads** voltage by 90° (φ = −90°): I = C dV/dt; when V = V_m sinωt, I = CV_mω cosωt
- Opposition: **capacitive reactance X_C = 1/(ωC)** — decreases with frequency
- At high f: X_C → 0 (C acts as short circuit); at f=0 (DC): X_C → ∞ (open circuit)

**Inductor** (L):
- Voltage **leads** current by 90° (φ = +90°): V = L dI/dt; if I = I_m sinωt, V = LI_mω cosωt
- Opposition: **inductive reactance X_L = ωL** — increases with frequency
- At high f: X_L → ∞ (blocks AC); at f=0 (DC): X_L = 0 (short circuit)

Mnemonic: **CIVIL** — In a Capacitor I leads V; In a coil (L), V leads I.

### Block 1-C — Series RLC Circuit and Impedance
Total opposition to AC current: **impedance Z**

For series RLC:
> **Z = √(R² + (X_L − X_C)²)**

Phase angle: **tan φ = (X_L − X_C)/R**

Current amplitude: **I_m = V_m/Z**

At **resonance**: X_L = X_C → X_L − X_C = 0 → Z = R (minimum) → I_m maximum
> **ω₀ = 1/√(LC)** (resonant angular frequency)

Quality factor: **Q = ω₀L/R = 1/(ω₀CR)** (sharpness of resonance)

### Block 1-D — Average Power in AC Circuits
Only the resistive component dissipates power:

> **P = I²_rms R = V²_rms/Z² × R = V_rms I_rms cos φ**

**Power factor** cos φ: ratio of real power to apparent power.
- Pure R: cos φ = 1 (all power dissipated)
- Pure L or C: cos φ = 0 (no power dissipated — reactive elements)
- Series RLC: 0 ≤ cos φ ≤ 1

At resonance: φ = 0 → cos φ = 1 → power factor = 1 → maximum power transfer to R.

---

## Component 2 — Worked Examples

### WE-1 — RMS and Peak Values
**Problem:** UK household supply: V_rms = 230 V, f = 50 Hz. Find: (a) V_m, (b) ω, (c) T, (d) instantaneous voltage at t = 3.0 ms.

**Solution:**
(a) V_m = V_rms × √2 = 230 × 1.414 = **325 V**

(b) ω = 2πf = 2π × 50 = **314 rad/s**

(c) T = 1/f = 1/50 = **20 ms**

(d) v(t) = 325 sin(314 × 3.0×10⁻³) = 325 sin(0.942) = 325 × 0.809 = **263 V**

---

### WE-2 — Series RLC at Off-Resonance
**Problem:** Series RLC circuit: R = 30 Ω, L = 100 mH, C = 50 μF, V_rms = 120 V, f = 60 Hz. Find: (a) X_L, X_C, (b) Z, (c) I_rms, (d) phase angle φ, (e) average power.

**Solution:**
(a) X_L = ωL = 2π×60×0.10 = **37.7 Ω**  
    X_C = 1/(ωC) = 1/(2π×60×50×10⁻⁶) = **53.1 Ω**

(b) Z = √(R² + (X_L−X_C)²) = √(900 + (37.7−53.1)²) = √(900 + 237) = √1137 = **33.7 Ω**

(c) I_rms = V_rms/Z = 120/33.7 = **3.56 A**

(d) tan φ = (X_L−X_C)/R = (37.7−53.1)/30 = −15.4/30 = −0.513 → φ = **−27.2°** (capacitive, I leads V)

(e) P = I²_rms × R = (3.56)² × 30 = 12.67 × 30 = **380 W**  
    Or: P = V_rms × I_rms × cos φ = 120 × 3.56 × cos(27.2°) = 427 × 0.890 = 380 W ✓

---

### WE-3 — Resonance
**Problem:** Series RLC: L = 200 mH, C = 5.0 μF, R = 10 Ω, V_rms = 50 V. Find: (a) resonant frequency, (b) I_rms at resonance, (c) V_L and V_C at resonance, (d) Q factor.

**Solution:**
(a) ω₀ = 1/√(LC) = 1/√(0.20 × 5×10⁻⁶) = 1/√(10⁻⁶) = **1000 rad/s** → f₀ = 1000/(2π) = **159 Hz**

(b) At resonance: Z = R = 10 Ω → I_rms = 50/10 = **5.0 A**

(c) X_L = X_C = ω₀L = 1000 × 0.20 = 200 Ω  
    V_L = I_rms × X_L = 5.0 × 200 = **1000 V** (much larger than supply!)  
    V_C = I_rms × X_C = 5.0 × 200 = **1000 V** (equal, opposing V_L — they cancel in series)

(d) Q = ω₀L/R = 1000 × 0.20/10 = **20**  
    Interpretation: voltage across L or C is Q = 20 times the supply voltage — voltage magnification at resonance.

---

## Component 3 — Misconception Engine

### MC-RMS-IS-THE-AVERAGE-OF-THE-WAVEFORM
- **trigger_signal:** Student says "RMS voltage is just the average of the AC wave, so for a sine wave it's V_m/2."
- **conflict_evidence [P28]:** "The average of a full-cycle sine wave is zero — positive and negative half-cycles cancel exactly. The simple average of a 325 V peak waveform is 0 V, which would imply a light bulb sees no voltage at all — clearly wrong. RMS stands for Root Mean Square: square the wave (making all values positive), take the mean, then take the square root. For a sine: √(V_m²/2) = V_m/√2 ≈ 0.707V_m. This is NOT the same as the average of |v| = 2V_m/π ≈ 0.637V_m (average rectified) or V_m/2 (average of peak)."
- **bridge_text [P30]:** "The RMS formula is designed to give the DC equivalent for power: P = V²/R. For AC, P_avg = (V_m²/2)/R = V_rms²/R where V_rms = V_m/√2. This makes V_rms the voltage that would produce the same average power in a resistor as the same DC voltage — a physically meaningful and practically useful definition."
- **replacement_text [P31]:** "V_rms = V_m/√2 ≈ 0.707V_m (for sine waves). This is NOT the average (which is zero for a full cycle), NOT V_m/2, NOT V_m/π. It is the square root of the time-averaged square: √<v²> = √(V_m²/2)."
- **discrimination_pairs [P33]:**
  - Average of full sine wave: 0 (positive and negative halves cancel)
  - Average of |sin| (full-wave rectified): 2V_m/π ≈ 0.637V_m
  - RMS: V_m/√2 ≈ 0.707V_m (correct for power calculations)
  - Peak: V_m (instantaneous maximum)
- **s6_path:** Compute ∫₀ᵀ sin²(ωt) dt / T = ½ algebraically; take square root to get 1/√2.

---

### MC-VOLTAGE-ACROSS-COMPONENTS-ADDS-ARITHMETICALLY-IN-AC
- **trigger_signal:** Student writes V_R + V_L + V_C = V_total (arithmetic sum) or is puzzled when component voltages exceed supply voltage.
- **conflict_evidence [P28]:** "WE-3: V_L = V_C = 1000 V in a circuit supplied by only 50 V. If voltages added arithmetically: 1000 + 1000 + I×R = 2010 V ≠ 50 V. The resolution: V_L and V_C are 180° out of phase (they cancel in series). Voltages in AC circuits must be added as phasors (vectors): √(V_R² + (V_L−V_C)²) = V_total. Instantaneous voltages do add arithmetically — but peak values and RMS values add as phasors."
- **bridge_text [P30]:** "In DC circuits, V = V_R + V_C + V_L by KVL — and this is always true instantaneously. The subtlety: when voltages are oscillating at 90° relative phase, their peaks don't occur at the same time. Adding peaks (RMS values) requires phasors, like adding forces at right angles: F_net = √(F_x² + F_y²), not F_x + F_y."
- **replacement_text [P31]:** "Instantaneous KVL: v(t) = v_R(t) + v_L(t) + v_C(t) — always exact. RMS voltage magnitudes: V_total = √(V_R² + (V_L − V_C)²) — phasor addition. Individual component voltages can exceed total supply voltage (resonance: V_L = V_C = QV_total >> V_total)."
- **discrimination_pairs [P33]:**
  - DC: V = V_R + V_L + V_C (arithmetic; all in phase)
  - AC off-resonance: |V_total| = √(V_R² + (V_L−V_C)²) (phasor sum)
  - AC at resonance: V_L = V_C, they cancel; V_total = V_R only (even though V_L, V_C >> V_R)
- **s6_path:** Draw phasor diagram for WE-2: V_R along x-axis, V_L upward, V_C downward; resultant = diagonal; show magnitude = Z × I = V_total.

---

## Component 4 — Assessment Probes

### Probe Set A — Factual Recall
**A1 (MCQ):** In a pure capacitor connected to AC, the current:
**(a) Leads voltage by 90°** (b) Lags voltage by 90° (c) Is in phase with voltage (d) Leads voltage by 45°

**A2 (Short answer):** Define impedance Z of a series RLC circuit and write the formula for resonant frequency ω₀.
[Z = √(R² + (X_L−X_C)²); ω₀ = 1/√(LC)]

**A3 (Fill-in):** V_rms = ______ × V_m for a sinusoidal AC waveform.
[1/√2 ≈ 0.707]

---

### Probe Set B — Conceptual Transfer
**B1:** A series RLC circuit at resonance has V_rms = 10 V, R = 5 Ω, Q = 50. Find I_rms at resonance and V_L at resonance.
[I_rms = V_rms/R = 2.0 A (Z=R at resonance); V_L = Q×V_rms = 50×10 = 500 V]

**B2:** At what frequency does a 100 μF capacitor have the same reactance as a 100 mH inductor? What is that reactance?
[X_C = X_L → 1/(ωC) = ωL → ω = 1/√(LC) = 1/√(0.1×10⁻⁴) = 1/√(10⁻⁵) = 316 rad/s → f = 50.3 Hz; X = ωL = 316×0.1 = 31.6 Ω]

**B3:** A motor has power factor 0.75 and draws 10 A_rms from 240 V_rms supply. Find: (a) real power consumed, (b) apparent power, (c) reactive power.
[(a) P = V_rms × I_rms × cosφ = 240×10×0.75 = 1800 W. (b) S = V_rms × I_rms = 240×10 = 2400 VA (apparent). (c) Q = √(S²−P²) = √(2400²−1800²) = √(2160000) = 1470 VAR (reactive).]

---

### Probe Set C — Mastery Gate [P91]
**C1 (Multi-step):** Series RLC: R=50Ω, L=0.30H, C=12μF, V_m=200V. (a) Find ω₀. (b) At ω = 200 rad/s: find X_L, X_C, Z, I_m, φ, and P_avg. (c) At resonance: find I_m, V_L,m, V_C,m, and Q.
[(a) ω₀ = 1/√(0.3×12×10⁻⁶) = 1/√(3.6×10⁻⁶) = 527 rad/s. (b) X_L=200×0.3=60Ω; X_C=1/(200×12×10⁻⁶)=417Ω; Z=√(2500+(60−417)²)=√(2500+127449)=√129949=360Ω; I_m=200/360=0.556A; tanφ=(60−417)/50=−7.14→φ=−82°(strongly capacitive); P=½I_m²R=½×0.309×50=7.73W. (c) At ω₀=527: Z=R=50Ω; I_m=200/50=4.0A; X_L=X_C=527×0.3=158Ω; V_L,m=I_m×X_L=4.0×158=632V; V_C,m=632V; Q=ω₀L/R=527×0.3/50=3.16.]

**C2 (Synthesis):** A power utility delivers P = 1.0 MW at V_rms = 11 kV with power factor 0.60. (a) Find I_rms. (b) Find heat loss if transmission line resistance R_line = 0.50 Ω. (c) Find new I_rms if power factor is improved to 0.95 by adding capacitors. (d) Find new heat loss and percentage saving.
[(a) I = P/(V×cosφ) = 10⁶/(11000×0.60) = 151.5 A. (b) P_loss = I²R = 151.5²×0.5 = 11,476 W ≈ 11.5 kW. (c) I_new = 10⁶/(11000×0.95) = 95.7 A. (d) P_loss_new = 95.7²×0.5 = 4,579 W ≈ 4.6 kW; saving = (11476−4579)/11476 = 60% reduction in transmission losses.]

---

## Component 5 — Retrieval & Spacing Schedule

```yaml
retrieval_events:
  - offset: "+10 min"
    type: free_recall [P62]
    prompt: "Without notes: write V_rms formula, X_C and X_L formulas, impedance Z for series RLC, resonant frequency ω₀, and CIVIL mnemonic."
  - offset: "+1 day"
    type: retrieval_quiz [P36]
    prompt: "Series: R=100Ω, L=50mH, C=20μF, V_rms=100V, f=200Hz. Find X_L, X_C, Z, I_rms, φ, P_avg, and power factor."
  - offset: "+4 days"
    type: interleaved [P33]
    prompt: "Compare R, L, C in AC circuits: fill table — phase relationship (V leads I or I leads V), reactance formula, frequency dependence, power dissipated."
  - offset: "+10 days"
    type: application [P91]
    prompt: "Design an RLC bandpass filter with resonant frequency f₀=10kHz and Q=20. Choose L and C (given R=100Ω). Find bandwidth (Δf = f₀/Q). Find V_L at resonance for V_in=1V."
```

---

## Component 6 — Session Flow Script

```
[P01 — Session open]
"AC circuits power the world — every motor, transformer, and power grid runs on alternating current. Today we'll understand why, and how the phase relationships between voltage and current determine efficiency."

[P41 — Diagnostic]
"Household power is 230 V. Is this the peak or RMS voltage? What is the other one?"
→ Correct (230V is RMS; peak ≈ 325V): "Exactly — let's see why RMS is the useful quantity."
→ Incorrect: "Great question — the answer reveals something subtle about AC averages."

[P06 — Concrete anchor]
"A sine wave averages to zero — useless for measuring power. The trick: square it first (all positive), average, then square root again. That's V_rms = V_m/√2. A 230 V_rms supply produces the same average heating in a resistor as 230 V DC."

[TA-1 — AC waveform and RMS: Block 1-A]
"v(t) = V_m sinωt; V_rms = V_m/√2. UK: 230V rms → 325V peak."

[P28 — Conflict evidence for MC-RMS-IS-THE-AVERAGE-OF-THE-WAVEFORM]
"Average of a full sine wave = 0. But V_rms = V_m/√2 = 0.707V_m ≠ 0. Square first (makes all positive) → average → root. That's why the math works."

[P51 — Check-in]
"A 120 V_rms supply has a peak of _____ V. A 200 V peak AC has V_rms = _____ V."
[170V; 141V]

[TA-2 — R, L, C individually in AC: Block 1-B]
"CIVIL: Capacitor I leads V; coIL V leads I. Reactances X_C = 1/ωC, X_L = ωL."

[TA-3 — WE-1 and WE-2: series RLC, impedance, power]

[P28 — Conflict evidence for MC-VOLTAGE-ACROSS-COMPONENTS-ADDS-ARITHMETICALLY]
"WE-3: V_L = V_C = 1000V in a 50V circuit. Arithmetic sum = 2010V ≠ 50V. Phasor sum: V_L and V_C cancel (180° apart) → only V_R = 50V survives. Always add AC voltages as phasors."

[TA-4 — WE-3: resonance and Q factor]

[P52 — Narrow]
"Three key formulas: Z = √(R²+(X_L−X_C)²); ω₀ = 1/√(LC); V_rms = V_m/√2. CIVIL for phase."

[P62 — Retrieval seed]
"Write from memory: V_rms formula, CIVIL rule, impedance Z, resonant frequency, power formula, Q definition."

[P36 — Mastery probe — Probe C1]

[P68 — Close]
"AC fundamentals: V_rms = V_m/√2 (power equivalent). R: in phase. L: V leads I (X_L=ωL). C: I leads V (X_C=1/ωC). Series RLC: Z = √(R²+(X_L−X_C)²); resonance at ω₀=1/√(LC), Z minimum, I maximum, Q = voltage magnification."

[P85 — Regulation tail]
"Shakiest: the CIVIL rule, the phasor addition, or resonance and Q?"

[P89 — Retrieval schedule]
"Return tomorrow for the series RLC retrieval problem."
```

---

## Component 7 — Adaptive Branching

| Signal | Branch |
|--------|--------|
| Probe A1 wrong (picks lag) | Deploy CIVIL mnemonic; show I=CdV/dt mathematically: if V=sinωt, I=Cωcosωt=cos leads sin by 90° |
| Probe A3 wrong (says 0.5) | Deploy MC-RMS-IS-THE-AVERAGE; derive √<sin²> = 1/√2 step by step |
| Probe B3 wrong (reactive power) | Define: S=apparent (VA), P=real (W), Q_reactive=reactive (VAR); S²=P²+Q² |
| Probe C1(c) wrong (V_L at resonance) | V_L = I_m × X_L = I_m × ω₀L; at resonance I_m=V_m/R; so V_L = V_m × ω₀L/R = Q×V_m |
| Student asks about complex impedance | Preview: Z = R + j(X_L−X_C); |Z| = √(R²+(X_L−X_C)²); φ = arctan((X_L−X_C)/R); same result, more general framework |

---

## Component 8 — Visualisation Specification

**Primary visual:** Phasor diagram for series RLC — x-axis: V_R (in phase with I); y-axis up: V_L (leads I by 90°); y-axis down: V_C (lags I by 90°). Resultant V_total = V_R + (V_L − V_C) shown as diagonal; angle φ labelled; all magnitudes: V_R = IR, V_L = IX_L, V_C = IX_C. Three cases shown: X_L > X_C (inductive, V leads I), X_L = X_C (resonance, in phase), X_L < X_C (capacitive, I leads V).

**Secondary visual:** Frequency response curves — on same f-axis: X_L = ωL (increasing), X_C = 1/(ωC) (decreasing); their intersection = ω₀; Z(ω) curve showing minimum at ω₀; I_rms(ω) curve showing maximum (resonance peak). Q factor illustrated as width of resonance peak: Δω = ω₀/Q.

**Tertiary visual:** AC component phase summary — three side-by-side plots of v(t) and i(t) for: (i) R: same phase; (ii) L: v leads i by 90°; (iii) C: i leads v by 90°. CIVIL mnemonic annotated below.

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly (phys.em.ac-basics)                    PASS
V-2  domain derived correctly (phys.em → electromagnetism)                 PASS
V-3  difficulty number matches label (advanced → 5)                        PASS
V-4  bloom verb matches level (apply → calculate/design)                   PASS
V-5  prerequisites listed in KG (phys.em.ohms-law, phys.em.faradays-law)  PASS
V-6  mastery_threshold = 0.80                                              PASS
V-7  session_cap rule applied (≥1h → PA-3)                                PASS
V-8  cpa_entry_stage matches difficulty 5 formula                          PASS
V-9  status = READY                                                        PASS
V-10 ≥2 misconceptions with all 6 MC fields                               PASS
V-11 ≥3 worked examples with full solution                                 PASS
V-12 Probe sets A (recall), B (transfer), C (mastery gate) present        PASS
V-13 Retrieval schedule has ≥4 events with offsets                        PASS
V-14 Session flow uses P-codes from Primitive Library                      PASS
V-15 Adaptive branching table present                                      PASS
V-16 Visualisation spec present with ≥2 visuals                           PASS
V-17 No framework/runtime/route modifications                              PASS
V-18 No mathematics content authored                                       PASS
V-19 All formulas dimensionally consistent                                 PASS
V-20 Cross-links reference valid KG concept IDs                            PASS
```

**Overall status: READY**
