# Teaching Blueprint — phys.wave.forced-oscillations

## Component 0 — Concept Identity

```yaml
concept_id: phys.wave.forced-oscillations
name: Forced Oscillations and Resonance
domain: waves
difficulty:
  label: advanced
  number: 5
bloom: apply
prerequisites:
  - phys.wave.damped-oscillations
mastery_threshold: 0.80
estimated_hours: 5
cross_links:
  - phys.wave.standing-waves
  - phys.em.lc-circuit
  - phys.mech.friction
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 5 → C with accelerated P track)
status: READY
```

---

## Component 1 — Narrative Spine

**Hook (S0 novice):** On November 7, 1940, the Tacoma Narrows Bridge collapsed — not because the wind was too strong, but because wind vortices matched the bridge's natural frequency. Soldiers break step when crossing bridges for the same reason. A singer can shatter a crystal glass by holding the right note. These are resonance: the dramatic amplitude amplification that occurs when a driving frequency matches a system's natural frequency.

**Conceptual arc:**
1. Forced oscillator: an external periodic driving force F_drive = F₀ cos(ω_d t) applied to a damped oscillator.
2. Equation of motion: mẍ + bẋ + kx = F₀ cos(ω_d t). Two timescales: transient (decays as e^(−γt)) + steady-state.
3. Steady-state amplitude: A(ω_d) = (F₀/m) / √[(ω₀² − ω_d²)² + (2γω_d)²].
4. Resonance: A maximises near ω_d = ω₀ (exactly at ω_res = √(ω₀² − 2γ²) for underdamped systems — slightly below ω₀).
5. Resonance amplitude: A_res = F₀/(2mγω_d) ≈ F₀/(2mγω₀) = QF₀/(mω₀²) = QA_static. Q amplifies the static displacement by factor Q.
6. Phase response: below resonance → x in phase with force (φ = 0); at resonance → x lags force by 90° (φ = π/2); above resonance → x anti-phase (φ = π).
7. Bandwidth: half-power bandwidth Δω = 2γ = ω₀/Q. High-Q → narrow resonance peak (sharp tuning); low-Q → broad peak (robust but less selective).
8. Sharpness and Q: Q = ω₀/Δω = resonant frequency / bandwidth. The same Q as defined for damped oscillators.
9. Engineering applications: radio tuning (high Q for selectivity), bridge/building design (avoid resonance), MRI (proton Larmor resonance), musical instruments (body resonance amplifies string vibration).

**Closing synthesis:** Forced oscillations reveal a new dimension of resonance physics: the system's response depends not only on frequency matching but on damping (Q). A world-class teaching principle: high Q means high sensitivity AND high fragility — the same property that makes an MRI scanner sensitive makes a bridge vulnerable. Understanding Q gives you the design lever for both cases.

---

## Component 2 — Worked Examples

### WE-1 (Concrete — resonance amplitude)

**Scenario:** A spring-mass oscillator has m = 0.5 kg, k = 200 N/m, and b = 2 kg/s. A driving force F₀ = 5 N oscillates at the natural frequency ω₀. Find the steady-state amplitude at resonance.

**Step 1 — Natural frequency.**
ω₀ = √(k/m) = √(200/0.5) = √400 = 20 rad/s.

**Step 2 — Damping rate and Q.**
γ = b/(2m) = 2/(2 × 0.5) = 2 s⁻¹.
Q = ω₀/(2γ) = 20/4 = 5.

**Step 3 — Static amplitude (if force were static).**
A_static = F₀/k = 5/200 = 0.025 m = 2.5 cm.

**Step 4 — Resonance amplitude.**
A_res = Q × A_static = 5 × 0.025 = 0.125 m = 12.5 cm.

**Interpretation:** At resonance, the amplitude is 5× the static displacement — a 5× amplification due to resonance. For Q = 100 (a high-Q system), the same driving force would give 100× amplification.

**Answer:** A_res = 12.5 cm.

---

### WE-2 (Bridging — frequency response curve)

**Scenario:** For the same oscillator (ω₀ = 20 rad/s, γ = 2 s⁻¹), compute the steady-state amplitude A(ω_d) at three driving frequencies: ω_d = 10, 20, 30 rad/s. F₀/m = 10 m/s².

**Formula:** A(ω_d) = (F₀/m) / √[(ω₀² − ω_d²)² + (2γω_d)²].

**At ω_d = 10 rad/s (below resonance):**
Numerator: 10.
Denominator: √[(400 − 100)² + (2×2×10)²] = √[(300)² + (40)²] = √[90000 + 1600] = √91600 ≈ 302.7.
A = 10/302.7 ≈ 0.033 m = 3.3 cm.

**At ω_d = 20 rad/s (at resonance):**
Denominator: √[(400 − 400)² + (2×2×20)²] = √[0 + (80)²] = 80.
A = 10/80 = 0.125 m = 12.5 cm. ✓ (matches WE-1)

**At ω_d = 30 rad/s (above resonance):**
Denominator: √[(400 − 900)² + (2×2×30)²] = √[(−500)² + (120)²] = √[250000 + 14400] = √264400 ≈ 514.
A = 10/514 ≈ 0.019 m = 1.9 cm.

**Answer:** Below resonance: 3.3 cm; at resonance: 12.5 cm; above resonance: 1.9 cm. The resonance peak is sharp — amplitude at ω₀ is ~4× the off-resonance values.

---

### WE-3 (Abstract — bandwidth and Q)

**Application:** A radio receiver must separately tune stations at 90.0 MHz and 90.5 MHz (0.5 MHz apart). What minimum Q is required so that the half-power bandwidth Δf < 0.5 MHz?

**Half-power bandwidth:** Δf = f₀/Q (in frequency units; the same relation as Δω = ω₀/Q).

**Requirement:** Δf < 0.5 MHz.
Q > f₀/Δf = 90.0 MHz / 0.5 MHz = 180.

**Answer:** Q > 180. The LC tuning circuit in the radio must have Q > 180 to resolve adjacent stations 0.5 MHz apart at 90 MHz.

**Extension — Tacoma Narrows:** The bridge had a low Q (broad resonance) but the vortex shedding frequency happened to land near the natural frequency. Had engineers added damping (larger γ → larger Δω → lower Q → flatter peak → lower resonance amplitude), the disaster would have been avoided. Modern bridge design engineers damping into the structure deliberately.

---

## Component 3 — Misconception Engine

### MC-RESONANCE-ONLY-AT-EXACT-NATURAL-FREQUENCY

**Trigger signal:** Student says "resonance only happens when the driving frequency exactly equals ω₀ — any slight mismatch and there's no resonance."

**Conflict evidence [P28]:** "Look at the amplitude formula A(ω_d). At ω_d = ω₀ + Δω (slightly off), is A exactly zero? Compute A for ω₀ = 20, ω_d = 21, γ = 2 — is the amplitude much smaller than at resonance?"

*A(21): √[(400−441)² + (84)²] = √[(41)² + (84)²] = √[1681 + 7056] = √8737 ≈ 93.5. A = 10/93.5 ≈ 0.107 m — still 85% of resonance amplitude! Not zero.*

**Bridge text [P30]:** "Resonance is a peak, not a spike. Near the resonance frequency, amplitude is large; exactly at resonance, it's maximum. The width of that peak is the bandwidth Δω = 2γ. For low-Q systems (large γ), the peak is broad — the system responds strongly to a wide range of frequencies near ω₀."

**Replacement text [P31]:** "Resonance is a region, not a point. The half-power bandwidth Δω = ω₀/Q tells you how wide. For Q = 5, Δω = 4 rad/s — the amplitude is at least 70% of maximum for any ω_d within ±2 rad/s of ω₀. Only very high-Q systems (Q >> 1) have sharp, point-like resonance."

**Discrimination pairs [P33]:**
- "Q = 1000 oscillator driven at ω₀ + 0.1ω₀: is amplitude near maximum?" → Half-power bandwidth = ω₀/1000 — driving at ω₀ + 0.1ω₀ is 100 bandwidths off. Amplitude is tiny.
- "Q = 2 oscillator driven 10% off ω₀: significant amplitude?" → Yes — bandwidth = ω₀/2, so 10% off is well inside the peak.

**s6_path:** "Think of Q as the 'sharpness knob.' Low Q = broad response that tolerates imprecise driving. High Q = sharp response that requires precise tuning."

---

### MC-MORE-DAMPING-ALWAYS-SMALLER-AMPLITUDE

**Trigger signal:** Student says "if you add damping to a forced oscillator, the amplitude always decreases."

**Conflict evidence [P28]:** "Consider a forced oscillator driven far below resonance (ω_d ≪ ω₀). The steady-state amplitude is approximately A ≈ F₀/k — independent of damping. Adding damping changes the resonance peak but barely affects the low-frequency response. Is amplitude always reduced by damping?"

**Bridge text [P30]:** "Damping's effect on forced oscillation depends on where you are relative to resonance:
- At resonance: A_res = QF₀/(mω₀²) — higher damping (lower Q) REDUCES peak amplitude.
- Far below resonance: A ≈ F₀/k — damping irrelevant, controlled by stiffness.
- Far above resonance: A ≈ F₀/(mω_d²) — damping irrelevant, controlled by inertia.
Damping matters most near resonance."

**Replacement text [P31]:** "Damping reshapes the resonance peak: it lowers and broadens it. Below and above resonance (off-peak regions), amplitude is barely affected by changing damping. The statement 'more damping → smaller amplitude' is only reliably true AT resonance, not everywhere."

**Discrimination pairs [P33]:**
- "Driving at ω_d = 0.1 ω₀ (quasi-static): double the damping coefficient b. By what factor does amplitude change?" → Amplitude ≈ F₀/k — unchanged (stiffness-controlled region).
- "Driving at resonance: double b (γ → 2γ, Q → Q/2). New amplitude?" → A_res = QF₀/(mω₀²) → halved.

**s6_path:** "Damping is the resonance-controller, not a universal amplitude-reducer. Its influence peaks at ω_d = ω₀ and fades away from resonance."

---

## Component 4 — Diagnostic Probe Set

**P4-a (prereq: damped oscillator):** What is the Q factor for an oscillator with ω₀ = 10 rad/s and γ = 0.5 s⁻¹?
*Q = ω₀/(2γ) = 10/1 = 10.*

**P4-b (resonance amplitude):** A driven oscillator has A_static = F₀/k = 2 cm and Q = 20. What is the resonance amplitude?
*A_res = Q × A_static = 20 × 2 = 40 cm.*

**P4-c (bandwidth):** A resonator with f₀ = 1000 Hz and Q = 50: find the half-power bandwidth Δf.
*Δf = f₀/Q = 1000/50 = 20 Hz.*

**P4-d (phase):** A driving frequency is much higher than the natural frequency. What is the phase relationship between force and displacement?
*Anti-phase (φ = π) — displacement opposes the driving force.*

**P4-e (design):** A building has natural frequency 2 Hz and must withstand earthquakes with frequency 0.5 to 3 Hz. Should the engineer increase or decrease structural damping? Why?
*Increase damping — lowers Q, broadens resonance peak but reduces maximum resonance amplitude. The earthquake frequency range overlaps the building's natural frequency; high Q would allow catastrophic amplitude buildup. Low Q (high damping) limits peak amplitude at the cost of some damping losses.*

---

## Component 5 — Socratic Thread

**Turn 1 [P41 diagnostic]:** "What happened at the Tacoma Narrows Bridge? Why would wind cause a bridge to oscillate with increasing amplitude?"

*Expected: wind matched a natural frequency. If blank, describe the collapse without explaining it — let student reason.*

**Turn 2 [P06 concrete anchor]:** "Push a child on a swing. If you push at random moments, what happens? If you push every time they reach the highest point (at the natural period), what happens?"

*Random → small, chaotic motion. At natural period → amplitude grows. Energy adds constructively.*

**Turn 3 [P30 bridge]:** "Generalise: a periodic force F₀cos(ω_d t) applied to a damped oscillator. When does amplitude build up versus stay small?"

*When ω_d ≈ ω₀ → energy input matches energy lost to damping → large steady-state amplitude.*

**Turn 4 [P28 conflict — MC-RESONANCE-ONLY-AT-EXACT-NATURAL-FREQUENCY]:** "If resonance only happens at the exact frequency, how does a radio tuner manage to receive a broadcast signal — the station isn't a perfect sinusoid at exactly one frequency?"

*Stations have a bandwidth; the tuner responds to a range of frequencies around resonance. The Q determines selectivity.*

**Turn 5 [P51 check-in]:** "So resonance is a peak with width, not a spike at a point. What determines the width of the peak?"

*Damping: Δω = 2γ = ω₀/Q.*

**Turn 6 [P52 narrow]:** "Three driving frequency regimes: far below ω₀, at ω₀, far above ω₀. What controls the amplitude in each regime?"

*Below: stiffness (A ≈ F₀/k). At resonance: damping (A ≈ F₀/(2mγω₀)). Above: mass (A ≈ F₀/(mω_d²)).*

**Turn 7 [P28 conflict — MC-MORE-DAMPING-ALWAYS-SMALLER-AMPLITUDE]:** "An engineer adds damping to a building. Does this always make the building safer in an earthquake? What if the earthquake frequency is far from the building's natural frequency?"

*Far from resonance: damping has little effect on amplitude (stiffness or mass control). At resonance: damping reduces peak dramatically. Overall: more damping is usually safer near resonance; irrelevant off-resonance.*

**Turn 8 [P62 retrieval seed]:** "Derive A_res = QA_static. Start from the resonance condition ω_d = ω₀ and the full amplitude formula."

*A_res = (F₀/m) / √[0 + (2γω₀)²] = F₀/(2mγω₀) = (F₀/k) × (k/m)/(2γω₀) = A_static × ω₀²/(2γω₀) = A_static × (ω₀/2γ) = Q × A_static.*

**Turn 9 [P36 mastery probe]:** "A mechanical system with m = 1 kg, k = 100 N/m, b = 1 kg/s is driven by F = 10cos(ω₀t). Find: ω₀, γ, Q, A_static, A_res, and half-power bandwidth."

*ω₀ = 10 rad/s; γ = 0.5 s⁻¹; Q = 10; A_static = F₀/k = 0.1 m; A_res = 10 × 0.1 = 1 m; Δω = 2γ = 1 rad/s.*

---

## Component 6 — Session Flow

```
[P01 open] → [P41 diagnostic: Tacoma Narrows] → [P06 anchor: pushing swing at natural period]
→ [P30 bridge: ω_d ≈ ω₀ → amplitude builds]
→ [MC-RESONANCE-ONLY-AT-EXACT-NATURAL-FREQUENCY: P28 conflict → P31 replacement → P33 pairs]
→ [WE-1: resonance amplitude calculation]
→ [P51 check-in]
→ [P52 narrow: three regimes (stiffness / damping / inertia controlled)]
→ [MC-MORE-DAMPING-ALWAYS-SMALLER-AMPLITUDE: P28 → P30 → P31 → P33]
→ [WE-2: frequency response curve (three frequencies)]
→ [P62 retrieval seed: A_res = Q × A_static derivation]
→ [WE-3: radio Q requirement]
→ [P36 mastery probe: full parameter set for new system]
→ [P89 retrieval schedule: Day 1, Day 4, Day 14]
→ [P91 mastery gate: 80% on P4-a through P4-e]
→ [P85 regulation tail]
→ [P68 close]
```

---

## Component 7 — Differentiation Variants

**S0 (novice):** Start with the swing analogy and the Tacoma bridge video. Establish resonance as "amplitude keeps growing when you push at the right frequency." Introduce only WE-1 (numerical) and skip WE-3 (radio Q). Emphasise Q as a scale from "sloppy" to "sharply tuned."

**S1 (knows formula, no physical intuition):** Ask them to sketch A vs. ω_d before computing. What shape do they predict? Where is the peak? After sketch, compute WE-2 and overlay. The mismatch between prediction and reality drives learning.

**S4 (prereq gap — damped oscillations weak):** Return to phys.wave.damped-oscillations. The Q factor concept is central here; if γ = b/(2m) and Q = ω₀/(2γ) are not secure, WE-1 and WE-3 are inaccessible. Secure P4-a before advancing.

**S6 (math anxiety):** Provide the amplitude formula as a given tool. Focus on WE-1 (plug-and-check) and the three-regime mnemonic: below-stiffness, at-damping, above-inertia. Calculator throughout. Skip WE-3.

**S7 (overconfident):** Lead with P4-e (earthquake design). Forces integration of all concepts plus engineering judgement (safety implications of Q choice). Then assign WE-3 (radio Q derivation) with no formula given — must derive from bandwidth definition.

---

## Component 8 — Retrieval Schedule

```yaml
retrieval_events:
  - offset_days: 1
    format: P4-a (Q factor) + P4-b (resonance amplitude = Q × static)
  - offset_days: 4
    format: P4-c (bandwidth) + P4-d (phase above resonance)
  - offset_days: 14
    format: P4-e (earthquake engineering design) + "sketch A(ω_d) for Q=2 and Q=10 on the same axes — what differs?"
```

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly: phys.wave.forced-oscillations ✓
V-2  prerequisites listed in KG: phys.wave.damped-oscillations ✓
V-3  bloom verb matches level (apply): "find … apply … design" ✓
V-4  mastery_threshold = 0.80 ✓
V-5  session_cap present: 7 TAs ✓
V-6  cpa_entry_stage correct for difficulty 5: "C (anchor; difficulty 5 → C with accelerated P track)" ✓
V-7  Narrative Spine covers hook → arc → synthesis ✓
V-8  3 worked examples (Concrete / Bridging / Abstract) ✓
V-9  Misconception Engine: 2 MCs, each with all 6 fields ✓
V-10 Diagnostic Probe Set: 5 probes (P4-a to P4-e) ✓
V-11 Socratic Thread: 9 turns, correct Primitive codes ✓
V-12 Session Flow: linear sequence with all required Primitives ✓
V-13 Differentiation Variants: S0/S1/S4/S6/S7 covered ✓
V-14 Retrieval Schedule: 3 events at Day 1/4/14 ✓
V-15 All Primitive codes valid (P01 P06 P28 P30 P31 P33 P36 P41 P51 P52 P62 P68 P85 P89 P91) ✓
V-16 cross_links pedagogically justified: standing-waves, LC circuit, friction ✓
V-17 difficulty number 5 consistent with bloom=apply and estimated_hours=5 ✓
V-18 domain "waves" matches concept_id prefix phys.wave ✓
V-19 No framework/runtime/route/schema modifications ✓
V-20 Status READY ✓
```
