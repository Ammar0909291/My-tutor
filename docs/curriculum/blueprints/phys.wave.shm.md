# Teaching Blueprint — phys.wave.shm

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.wave.shm
name: Simple Harmonic Motion
domain: waves
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.mech.hookes-law
  - phys.mech.newtons-second-law
mastery_threshold: 0.80
estimated_hours: 5
cross_links:
  - phys.wave.shm-energy
  - phys.wave.pendulum
  - phys.wave.spring-mass
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-SHM-CONSTANT-VELOCITY
- **Trigger signal:** Student draws a constant velocity for the SHM particle or says "it moves back and forth at the same speed."
- **Conflict evidence [P28]:** "In SHM, velocity is zero at maximum displacement (the amplitude points) and maximum at the equilibrium position. The particle is momentarily at rest at each extreme, then accelerates back toward the centre, reaching maximum speed at the centre, then decelerates again toward the other extreme. v = Aω cos(ωt): it is sinusoidal — not constant. Watch a pendulum: it swings slowly near the extremes and swiftly past the centre. A spring-mass system: pause at maximum compression/extension, fastest at natural length. This is directly visible and easily confirmed."
- **Bridge text [P30]:** "v(t) = Aω cos(ωt) and a(t) = −Aω² sin(ωt). Speed is maximum at x = 0; zero at x = ±A. The restoring force F = −kx is zero at x = 0 (no acceleration) and maximum at x = ±A (maximum deceleration/acceleration). Constant force → constant acceleration → definitely not constant velocity."
- **Replacement text [P31]:** "SHM velocity: v = ω√(A² − x²). At x = 0: v = Aω (maximum). At x = ±A: v = 0 (momentarily at rest). Not constant — sinusoidal variation."
- **Discrimination pairs [P33]:**
  - At x = 0 (equilibrium): v = Aω (maximum), a = 0 ✓
  - At x = ±A (amplitude): v = 0, a = ω²A (maximum, directed toward equilibrium) ✓
- **s6_path:** "Watch a swinging pendulum — it clearly moves faster through the bottom than at the top. That's SHM speed variation right in front of you."

---

### MC-PERIOD-DEPENDS-ON-AMPLITUDE
- **Trigger signal:** Student says "a bigger swing takes longer to return" or tries to include A in the period formula.
- **Conflict evidence [P28]:** "For true SHM, the period is independent of amplitude — this is the isochronous property and is what made pendulum clocks work. Galileo reportedly observed a swinging chandelier and timed it against his pulse — large swings and small swings had the same period. For a spring-mass system: T = 2π√(m/k). Neither m nor k changes with amplitude, so T is fixed regardless of how far the spring is stretched (within the elastic limit). This was the great discovery — SHM has a constant period, unlike most oscillations."
- **Bridge text [P30]:** "T = 2π√(m/k): no A in the formula. The restoring force F = −kx is proportional to x — larger displacement means larger restoring force, which means faster return. These two effects exactly cancel, keeping the period constant. The 'harder pull' for a larger swing exactly compensates the 'longer distance' to cover."
- **Replacement text [P31]:** "Period of SHM is independent of amplitude (isochronous property): T = 2π√(m/k) for spring-mass; T = 2π√(L/g) for simple pendulum. Amplitude only appears in displacement, velocity, and acceleration expressions."
- **Discrimination pairs [P33]:**
  - Spring-mass with A = 2 cm vs. A = 8 cm: same T = 2π√(m/k) ✓
  - Same spring, doubled mass: T increases by √2 ✓ (mass appears; amplitude does not)
- **s6_path:** "This is why pendulum clocks work — as the spring unwinds and the swing amplitude slowly decreases, the clock keeps perfect time. Period independent of amplitude is a beautiful and useful law."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Hooke's Law**
Prompt: "A spring with k = 200 N/m is stretched 5 cm. What is the restoring force? In which direction does it act?"
- Pass: F = kx = 200 × 0.05 = 10 N, directed toward the natural length (opposing displacement).
- Fail → [P52]: "F = kx gives the spring force; it always acts toward natural length. This is the restoring force that drives SHM. Review phys.mech.hookes-law." Route to hookes-law.

**PD-2 [P41] — Newton's Second Law**
Prompt: "A 0.5 kg mass has a net force of 10 N acting on it. What is its acceleration? If the force is proportional to displacement (F = −kx), what type of motion results?"
- Pass: a = F/m = 10/0.5 = 20 m/s²; F ∝ x with F toward equilibrium → SHM (or at least oscillatory motion).
- Fail → [P52]: "a = F/m. If restoring force F = −kx, then a = −(k/m)x — this is the mathematical definition of SHM. Review Newton's 2nd law." Route to newtons-second-law.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — the mass-spring system**

> Hang a mass on a spring from a stand. Pull the mass down a small distance and release. Watch: it oscillates up and down repeatedly, returning to nearly the same extreme positions each time. Time 10 complete oscillations and divide by 10 to find the period T. Now double the mass — T increases. Use a stiffer spring — T decreases. Change the amplitude (pull twice as far) — T stays the same. These experiments reveal T = 2π√(m/k) directly, with no amplitude dependence.

Second anchor — the displacement graph: attach a pen to the oscillating mass and let it draw on a strip of paper being pulled horizontally at constant speed. The trace is a perfect sine wave — sinusoidal motion in time.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Definition and Equation of Motion [C]**

Simple Harmonic Motion (SHM): motion in which the acceleration is proportional to displacement from equilibrium and directed toward equilibrium.

```
a = −ω²x      (defining equation of SHM)
```

Equivalently (Newton's 2nd law for spring-mass):
```
ma = −kx  →  a = −(k/m)x  →  ω² = k/m  →  ω = √(k/m)
```

Where ω = angular frequency (rad/s).

The solution to a = −ω²x:
```
x(t) = A sin(ωt + φ)    or    x(t) = A cos(ωt + φ)
```
Where A = amplitude, φ = phase constant (set by initial conditions).

**TA-2 — Period, Frequency, Angular Frequency [C→P]**

```
ω = 2πf = 2π/T

T = 2π/ω = 2π√(m/k)     (spring-mass)
f = ω/(2π) = (1/2π)√(k/m)
```

Key: T increases with mass (heavier → slower), decreases with stiffness (stiffer → faster), independent of amplitude.

**TA-3 — Velocity and Acceleration in SHM [C→P]**

Starting from x = A sin(ωt):

```
v = dx/dt = Aω cos(ωt)

a = dv/dt = −Aω² sin(ωt) = −ω²x
```

From energy conservation: v = ω√(A² − x²)

This gives velocity as a function of position:
- At x = 0: v = Aω (maximum)
- At x = ±A: v = 0
- At x: v = ω√(A² − x²)

Acceleration:
- At x = 0: a = 0 (equilibrium: no restoring force)
- At x = ±A: a = ∓ω²A (maximum magnitude, directed toward equilibrium)

**TA-4 — Phase Relationships and Phasor Picture [P]**

Phase difference between x, v, and a:
- x = A sin(ωt): displacement
- v = Aω cos(ωt) = Aω sin(ωt + π/2): leads x by 90°
- a = −Aω² sin(ωt) = Aω² sin(ωt + π): leads x by 180° (always opposite to x)

Phasor: a vector of length A rotating at angular speed ω. Its projection onto the vertical axis gives x(t) = A sin(ωt). The velocity phasor leads by 90°; the acceleration phasor leads by 180°.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — period and frequency)**

> A 0.4 kg mass is attached to a spring with k = 100 N/m. Find: (a) angular frequency, (b) period, (c) frequency.

```
(a) ω = √(k/m) = √(100/0.4) = √250 = 15.81 rad/s

(b) T = 2π/ω = 2π/15.81 = 0.397 s ≈ 0.40 s

(c) f = 1/T = 1/0.397 = 2.52 Hz
```

**WE-2 (Intermediate — position, velocity, acceleration)**

> A SHM system has A = 6 cm and ω = 4 rad/s. (a) Find the maximum velocity and maximum acceleration. (b) Find velocity at x = 4 cm. (c) Find acceleration at x = −3 cm.

```
(a) v_max = Aω = 0.06 × 4 = 0.24 m/s
    a_max = Aω² = 0.06 × 16 = 0.96 m/s²

(b) v = ω√(A² − x²) = 4√(0.0036 − 0.0016) = 4√0.002 = 4 × 0.04472 = 0.179 m/s

(c) a = −ω²x = −16 × (−0.03) = +0.48 m/s² (directed toward equilibrium, i.e., positive x direction)
```

**WE-3 (Advanced — SHM from Newton's Law)**

> A particle of mass 0.25 kg experiences a restoring force F = −50x (N) where x is in metres. (a) Confirm this is SHM. (b) Find ω, T, f. (c) If released from rest at x = 0.1 m, write x(t). (d) Find v at x = 0.06 m.

```
(a) F = −50x → a = F/m = −50x/0.25 = −200x → a = −ω²x with ω² = 200 ✓ (SHM)

(b) ω = √200 = 14.14 rad/s; T = 2π/14.14 = 0.444 s; f = 2.25 Hz

(c) Released from rest at x = A = 0.1 m: x(t) = 0.1 cos(14.14 t) metres
    (cosine: starts at maximum displacement, v=0 at t=0)

(d) v = ω√(A² − x²) = 14.14√(0.01 − 0.0036) = 14.14√0.0064 = 14.14 × 0.08 = 1.13 m/s
```

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Period calculation**
"Find the period of SHM for: (a) m = 0.5 kg, k = 200 N/m; (b) m = 2 kg, k = 200 N/m (mass quadrupled); (c) m = 0.5 kg, k = 800 N/m (k quadrupled)."

*Target:* (a) T = 2π√(0.5/200) = 2π×0.05 = 0.314 s. (b) m×4 → T×2 = 0.628 s. (c) k×4 → T÷2 = 0.157 s. Mass under root → √4 = 2; stiffness under root → √4 = 2 in denominator.

**MP-2 [P36] — Amplitude independence**
"A spring-mass system (m = 0.3 kg, k = 120 N/m) is set oscillating with A = 5 cm, then with A = 15 cm. (a) Calculate T for each case. (b) Calculate v_max for each case."

*Target:* (a) T = 2π√(0.3/120) = 2π×0.05 = 0.314 s — same for both amplitudes (isochronous). (b) v_max = Aω = A×√(k/m) = A×20: for A=0.05: v_max=1.0 m/s; for A=0.15: v_max=3.0 m/s. Period same; v_max scales with A.

**MP-3 [P36] — Velocity and acceleration at a point**
"SHM: A = 8 cm, f = 3 Hz. Find: (a) ω; (b) v at x = 5 cm; (c) a at x = −6 cm; (d) the displacement when v = ½v_max."

*Target:* (a) ω = 2π×3 = 18.85 rad/s. (b) v = 18.85√(0.0064−0.0025) = 18.85√0.0039 = 18.85×0.0624 = 1.18 m/s. (c) a = −ω²x = −(18.85)²×(−0.06) = 355.3×0.06 = 21.3 m/s² (toward equilibrium, +x direction). (d) v = ½Aω → ω√(A²−x²) = ½Aω → A²−x² = A²/4 → x² = 3A²/4 → x = A√3/2 ≈ 6.93 cm.

**MP-4 [P36] — Phase reasoning**
"A SHM particle starts (t=0) at x=0 moving in the +x direction. Write x(t) and v(t). What is the displacement when the acceleration is +½ of its maximum magnitude?"

*Target:* Starts at x=0, v>0: x(t) = A sin(ωt); v(t) = Aω cos(ωt). |a|_max = Aω². a = −ω²x; so +½ a_max means a = +½Aω² → −ω²x = +½Aω² → x = −A/2 (displacement is negative — particle is on the negative side, being pulled back toward positive equilibrium). So x = −A/2.

**MP-5 [P36] — Synthesis: designing an oscillator**
"Design a spring-mass system to oscillate at exactly 1 Hz. (a) If m = 0.5 kg, what must k be? (b) What is the maximum displacement if v_max = 0.3 m/s? (c) What is the maximum acceleration?"

*Target:* (a) T = 1 s → 1 = 2π√(0.5/k) → √(0.5/k) = 1/(2π) → k = 0.5×(2π)² = 19.74 N/m ≈ 20 N/m. (b) v_max = Aω = A×2π×1 → A = 0.3/(2π) = 0.0477 m ≈ 4.8 cm. (c) a_max = Aω² = 0.0477×(2π)² = 0.0477×39.48 = 1.88 m/s².

---

## Component 7 — Session Architecture

```
[P01] Session open — hanging mass-spring, set oscillating; time 10 oscillations
  ↓
[P41] PD-1 (Hooke's Law; restoring force direction)
  ↓ PASS
[P41] PD-2 (Newton's 2nd; F=ma; F proportional to x → a proportional to x)
  ↓ PASS
[P06] Anchor: mass-spring timing experiment; doubling mass → T×√2; stiffer spring → shorter T; amplitude unchanged → T same
  ↓
TA-1: Definition a=−ω²x; derivation from F=−kx and Newton's 2nd; x(t)=A sin(ωt) [C]
  ↓
[P28] Conflict: "period depends on amplitude" → MC-PERIOD-DEPENDS-ON-AMPLITUDE
  ↓
WE-1: Period, frequency, ω for given m, k
  ↓
[P51] Check-in MP-1 (period with quadrupled mass and quadrupled k)
  ↓ monitor
TA-2: T = 2π√(m/k); ω, f, T relationships [C→P]
  ↓
[P28] Conflict: "velocity is constant" → MC-SHM-CONSTANT-VELOCITY
  ↓
TA-3: v and a as functions of x and t; v_max at x=0; a_max at x=±A [C→P]
  ↓
WE-2 → WE-3 (velocity/acceleration at a position; SHM from Newton's law)
  ↓
TA-4: Phase relationships; phasor diagram [P]
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "SHM: m=0.5 kg, k=50 N/m, A=4 cm. Find T, v_max, a_max."
[P68]; [P85]; [P89] 1/3/7 days; [P91] 80% gate
```

**Protocol routing:** S0: full CPA — hands-on mass-spring timing before any formula; S1: knows T=2π√(m/k) but thinks amplitude affects period → MC-PERIOD-DEPENDS-ON-AMPLITUDE; S4: PD-1 or PD-2 fail → hookes-law or newtons-second-law; S6: [F] — "One equation: a=−ω²x. Everything else (T, v, a) follows. The key signature of SHM: acceleration points toward equilibrium, proportional to how far you are from it"; S7: open with MP-4 (phase reasoning — requires thinking about which phase of the cycle gives a specified partial acceleration, not just formula recall).

---

## Component 8 — Adaptive Flags

- **Sign convention**: a = −ω²x means acceleration is always opposite to displacement. The minus sign is essential. Students drop it, writing a = +ω²x — which is unstable (runaway) motion, not oscillation. Always check: "if x is positive (right of equilibrium), a must be negative (toward equilibrium, i.e., left)."
- **x(t) = A sin vs. A cos**: the choice depends on initial conditions. Released from x = 0 with maximum velocity → x = A sin(ωt). Released from x = A at rest → x = A cos(ωt). The form doesn't matter for T, v_max, a_max — only for the phase of motion at a specific time.
- **SHM is an idealisation**: real oscillators are damped (phys.wave.damped-oscillations). Hooke's Law has an elastic limit. SHM is exact only within these limits. This is why the blueprint for phys.mech.hookes-law warns about the elastic limit.
- **Energy in SHM**: fully treated in phys.wave.shm-energy. Here: mention that KE is maximum at x=0 and zero at x=±A; PE is the reverse — this motivates the energy blueprint.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.wave.shm |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.mech.hookes-law ✓, phys.mech.newtons-second-law ✓ |
| V-3 | difficulty label matches KG | PASS — proficient (4) |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 5h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-SHM-CONSTANT-VELOCITY, MC-PERIOD-DEPENDS-ON-AMPLITUDE |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (Hooke's Law), PD-2 (Newton's 2nd) |
| V-10 | Concrete anchor present [P06] | PASS — hands-on mass-spring timing; pen trace = sine wave |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-4 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with accelerated P track (difficulty 4) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — sign convention, cos vs. sin choice, SHM as idealisation, energy deferred |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
