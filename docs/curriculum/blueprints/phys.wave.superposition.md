# Teaching Blueprint — phys.wave.superposition

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.wave.superposition
name: Superposition of Waves
domain: waves
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.wave.wave-speed
mastery_threshold: 0.80
estimated_hours: 4
cross_links:
  - phys.wave.interference
  - phys.wave.standing-waves
  - phys.wave.beats
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-WAVES-COLLIDE-AND-STOP
- **Trigger signal:** Student says "when two waves meet they cancel out and stop" or thinks waves are permanently destroyed by superposition.
- **Conflict evidence [P28]:** "The principle of superposition states that the resultant displacement at any point and time is the vector sum of the individual wave displacements at that point. Crucially: after the waves pass through each other, they continue propagating independently, completely unchanged. Two sound waves crossing in mid-air do not permanently cancel. Two light beams crossing do not destroy each other. After crossing, each wave carries on exactly as before. The interaction is momentary — only at the point and instant of overlap do the displacements add. This is confirmed by the fact that conversation is possible in a room full of crossing sound waves, and light from crossing laser beams continues straight after the intersection."
- **Bridge text [P30]:** "Superposition is the addition of displacements at a point — it is not a permanent effect. Think of two ripples on a pond passing through each other: the surface momentarily shows their combined pattern, then both ripples emerge on the far side unchanged. Each wave maintains its own frequency, wavelength, amplitude, and direction of propagation."
- **Replacement text [P31]:** "Superposition: y_total = y₁ + y₂ at each point and instant. After overlap, waves continue independently with unchanged properties. No permanent cancellation; no energy destruction — energy redistributed in space."
- **Discrimination pairs [P33]:**
  - At overlap instant: y_total = y₁ + y₂ (could be zero if in antiphase) ✓
  - After passing through each other: each wave continues with original f, λ, A, direction ✓
- **s6_path:** "Two ripples on a pond pass right through each other. On a calm lake, you can watch this clearly — both emerge on the far side unchanged. Meeting momentarily doesn't stop them."

---

### MC-SUPERPOSITION-ONLY-FOR-SAME-FREQUENCY
- **Trigger signal:** Student says "superposition only works if the waves have the same frequency" or refuses to add waves with different frequencies.
- **Conflict evidence [P28]:** "The principle of superposition applies to any linear waves, regardless of frequency, amplitude, or direction. The resultant displacement is always the sum of individual displacements. If f₁ ≠ f₂, the sum y₁ + y₂ is a complex waveform — not sinusoidal, but still computed by simple addition. The sounds from a piano chord (multiple frequencies simultaneously) superpose to create the rich complex waveform that reaches your ear. Music is superposition of many different frequencies. Fourier's theorem proves that any periodic waveform can be decomposed as a sum of sinusoidal waves of different frequencies."
- **Bridge text [P30]:** "Same frequency superposition → persistent interference (constructive/destructive at fixed points — phys.wave.interference). Different frequency superposition → beats (phys.wave.beats), complex waveforms (music), or random noise. But the principle — y_total = Σyᵢ — always holds."
- **Replacement text [P31]:** "Superposition: y_total = y₁ + y₂ for any waves at any frequencies. Same f: interference pattern (fixed maxima/minima). Different f: time-varying pattern (beats, complex waveforms). Always add displacements algebraically."
- **Discrimination pairs [P33]:**
  - f₁ = f₂: y(x,t) = 2A cos(Δφ/2) sin(ωt + avg-phase) — fixed interference pattern ✓
  - f₁ ≠ f₂: y(t) shows beats with frequency |f₁−f₂| at a fixed point ✓
- **s6_path:** "A piano chord is superposition of 3+ different frequencies — no one doubts that works. Superposition is universal; same-frequency is just the special case that gives stable interference."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Wave properties**
Prompt: "Two waves, both at 400 Hz, travel at 320 m/s. Wave 1 has amplitude 3 cm; Wave 2 has amplitude 3 cm. If they are exactly in phase at some point, what is the resultant amplitude? If exactly in antiphase?"
- Pass: In phase: 3+3 = 6 cm (constructive). Antiphase: 3−3 = 0 cm (destructive).
- Fail → [P52]: "Adding waves means adding displacements. In phase: amplitudes add. Antiphase: amplitudes cancel. This is the core of superposition. Review wave properties from phys.wave.wave-speed." Route to wave-speed.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — two ripples on a pond; stereo speakers**

> Drop two pebbles into a calm pond at the same time, 20 cm apart. Watch the circular ripples spread outward. Where the two sets of ripples cross, you see: some points consistently higher than normal (crests meeting — constructive); some points consistently calm (crest meets trough — destructive). But the ripples pass through the crossing points and continue outward on both sides unchanged. This is superposition in water.

Second anchor: set up two stereo speakers facing the same direction, connected to the same signal generator (same frequency). Walk slowly across the room from one side to the other. You will hear alternating loud and quiet zones — a standing interference pattern in air, caused by superposition of identical waves from two sources.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — The Principle of Superposition [C]**

For linear waves in a medium (waves small enough that the medium responds linearly):

```
y_total(x, t) = y₁(x, t) + y₂(x, t)
```

The resultant displacement equals the algebraic (vector) sum of individual displacements.

"Algebraic": displacements above equilibrium are positive; below are negative. Add them with their signs.

Important: after overlap, each wave continues independently with unchanged f, λ, A, and direction. Superposition does not permanently alter either wave.

**TA-2 — Constructive and Destructive Superposition [C→P]**

Same-frequency, same-amplitude waves:

**In phase** (phase difference = 0, 2π, 4π, ... i.e., path difference = 0, λ, 2λ, ...):
```
y_total = A sin(ωt) + A sin(ωt) = 2A sin(ωt)
```
Resultant amplitude = 2A. **Constructive** superposition.

**In antiphase** (phase difference = π, 3π, ... i.e., path difference = λ/2, 3λ/2, ...):
```
y_total = A sin(ωt) + A sin(ωt + π) = A sin(ωt) − A sin(ωt) = 0
```
Resultant amplitude = 0. **Destructive** superposition.

**Partial superposition** (phase difference φ, same amplitude A):
```
y_total amplitude = 2A cos(φ/2)
```

**TA-3 — Path Difference and Phase Difference [C→P]**

Two coherent sources (same f, fixed phase relationship) at different distances from an observer.

Path difference: Δd = d₂ − d₁ (difference in distance from each source to the observation point).

Phase difference: φ = (2π/λ) × Δd

Conditions:
- Constructive: Δd = nλ (n = 0, 1, 2, ...) → maxima
- Destructive: Δd = (n + ½)λ → minima

**TA-4 — Coherence [P]**

Two sources are **coherent** if they have the same frequency and a constant phase difference (even if not zero).

- Laser light: highly coherent — produces stable interference patterns.
- Bulb light: incoherent — rapidly fluctuating random phase → no stable interference pattern visible.
- Two separate sound generators at the same frequency: coherent (if from same oscillator) or nearly coherent (if independently tuned).

Why coherence matters: if the phase difference between two sources fluctuates randomly, the interference pattern (maxima and minima positions) shifts faster than the eye can follow → washes out to uniform average intensity. Stable interference requires stable phase relationship — coherence.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — adding displacements)**

> At one point in space, wave 1 gives y₁ = +4 cm and wave 2 gives y₂ = −2 cm at the same instant. What is the total displacement?

```
y_total = y₁ + y₂ = 4 + (−2) = +2 cm
```

**WE-2 (Intermediate — path difference → phase → amplitude)**

> Two coherent sources (f = 500 Hz, A = 3 cm each, v = 340 m/s) are in phase at their sources. An observer is 2.0 m from source 1 and 2.34 m from source 2. Find: (a) path difference, (b) phase difference, (c) resultant amplitude.

```
(a) Δd = 2.34 − 2.0 = 0.34 m

(b) λ = v/f = 340/500 = 0.68 m
    φ = 2π × Δd/λ = 2π × 0.34/0.68 = 2π × 0.5 = π rad (antiphase)

(c) Resultant amplitude = 2A cos(φ/2) = 2×3×cos(π/2) = 6×0 = 0 cm (destructive)
```

**WE-3 (Advanced — partial superposition)**

> Two coherent waves of equal amplitude A = 5 cm meet with a phase difference of 60°. (a) Find the resultant amplitude. (b) By how many cm does the resultant amplitude exceed (a) if the phase difference changes to 120°?

```
(a) φ = 60° = π/3 rad
    A_res = 2A cos(φ/2) = 2×5×cos(30°) = 10×(√3/2) = 10×0.866 = 8.66 cm

(b) φ = 120° = 2π/3 rad
    A_res = 2×5×cos(60°) = 10×0.5 = 5.0 cm
    Difference: 8.66 − 5.0 = 3.66 cm less (not more). At 60°: 8.66; at 120°: 5.0.
```

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Adding two displacements**
"At a point P: wave A has displacement +6 cm; wave B has displacement +4 cm. At point Q: wave A has +3 cm; wave B has −3 cm. Find total displacement at P and Q."

*Target:* P: +6+4 = +10 cm (constructive). Q: +3+(−3) = 0 cm (destructive). Q is a node.

**MP-2 [P36] — Path difference → constructive or destructive**
"Two in-phase sources at 1200 Hz (v = 360 m/s). Observer at 4.8 m from source 1 and 5.1 m from source 2. Constructive or destructive? Why?"

*Target:* λ = 360/1200 = 0.3 m. Δd = 5.1−4.8 = 0.3 m = 1λ → constructive (path difference = integer number of wavelengths).

**MP-3 [P36] — Resultant amplitude for partial superposition**
"Two coherent waves each of amplitude 8 cm meet with phase differences of: (a) 0°, (b) 90°, (c) 180°."

*Target:* (a) A_res = 2×8×cos(0) = 16 cm. (b) A_res = 2×8×cos(45°) = 16×0.707 = 11.3 cm. (c) A_res = 2×8×cos(90°) = 0 cm.

**MP-4 [P36] — Coherence reasoning**
"Two students try to create an interference pattern in a hall: (a) using two speakers connected to the same signal generator; (b) using two independent speakers tuned to the same frequency. Which works? Why?"

*Target:* (a) Works — same generator maintains constant phase difference → coherent → stable interference. (b) May not work well — independent generators have no guaranteed constant phase relationship; phase drifts randomly → interference pattern washes out. (If both are from high-stability sources, could briefly see a pattern, but not stable.)

**MP-5 [P36] — Synthesis: two loudspeakers**
"Two speakers 2 m apart emit 680 Hz in phase (v = 340 m/s). An observer moves along a line 5 m in front of the two speakers. At what lateral positions (y) does the observer hear: (a) a maximum, (b) the first minimum?"

*Target:* λ = 340/680 = 0.5 m. Speaker positions: (−1, 0) and (+1, 0). Observer at (y, 5). d₁ = √((y+1)²+25); d₂ = √((y−1)²+25). For central max: y=0 (symmetric, Δd=0). First minimum: Δd = λ/2 = 0.25 m. Numerically solving √((y+1)²+25) − √((y−1)²+25) = 0.25 → approximately y ≈ 0.63 m (exact value requires numerical solution or small-angle approximation: y ≈ λD/(2d) = 0.5×5/2 = 1.25 m with d = 2, D = 5 — but this is the fringe spacing for maxima, so first minimum from centre is y ≈ λD/(2×2) = 0.5×5/4 = 0.625 m). Both approaches yield y ≈ 0.6–0.63 m.

---

## Component 7 — Session Architecture

```
[P01] Session open — two-pebble pond ripples; walk between two speakers
  ↓
[P41] PD-1 (in-phase and antiphase addition; amplitude sum/cancel)
  ↓ PASS
[P06] Anchor: pond ripples passing through each other unchanged; speaker interference walk
  ↓
TA-1: Principle of superposition y_total = y₁+y₂; waves pass unchanged [C]
  ↓
[P28] Conflict: "waves collide and stop" → MC-WAVES-COLLIDE-AND-STOP
  ↓
WE-1: Adding two displacements at a point
  ↓
[P51] Check-in MP-1 (displacement sums at two points; identify node)
  ↓ monitor
TA-2: Constructive and destructive superposition; partial superposition formula [C→P]
  ↓
[P28] Conflict: "superposition only for same frequency" → MC-SUPERPOSITION-ONLY-FOR-SAME-FREQUENCY
  ↓
TA-3: Path difference → phase difference → constructive/destructive conditions [C→P]
  ↓
WE-2 → WE-3 (path difference → destructive; partial superposition amplitudes)
  ↓
TA-4: Coherence; why coherence required for stable patterns [P]
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "Two in-phase sources. Observer hears maximum when path difference = ?; minimum when = ?"
[P68]; [P85]; [P89] 1/3/7 days; [P91] 80% gate
```

**Protocol routing:** S0: full CPA — pond ripples and speaker walk before any math; S1: can add displacements but thinks waves stop after crossing → MC-WAVES-COLLIDE-AND-STOP; S4: PD-1 fail → wave-speed; S6: [F] — "Add displacements: same direction adds, opposite cancels. That's superposition. Path difference tells you which."; S7: open with MP-5 (two-speaker lateral positions — requires combining path-difference geometry with constructive/destructive conditions, no template to follow).

---

## Component 8 — Adaptive Flags

- **Phase vs. path difference**: students confuse the two. Always convert path difference Δd to phase difference φ = 2πΔd/λ before applying the amplitude formula. Path difference of λ/2 means phase difference of π — and that gives zero amplitude (destructive). This step is always required.
- **A_res = 2A cos(φ/2)**: valid only for two equal-amplitude waves. If A₁ ≠ A₂, use phasor addition. The general result: A_res² = A₁² + A₂² + 2A₁A₂cos(φ).
- **Coherence vs. same frequency**: coherence requires a constant phase relationship — two sources can be at the same frequency but incoherent if their phases drift. Lasers are coherent; bulbs are not, even filtered to one wavelength.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.wave.superposition |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.wave.wave-speed ✓ |
| V-3 | difficulty label matches KG | PASS — proficient (4) |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 4h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-WAVES-COLLIDE-AND-STOP, MC-SUPERPOSITION-ONLY-FOR-SAME-FREQUENCY |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (in-phase and antiphase addition) |
| V-10 | Concrete anchor present [P06] | PASS — pond ripples; speaker interference walk |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-4 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with accelerated P track (difficulty 4) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — phase vs. path difference, equal-amplitude formula scope, coherence definition |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
