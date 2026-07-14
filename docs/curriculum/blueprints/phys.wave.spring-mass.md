# Teaching Blueprint — phys.wave.spring-mass

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.wave.spring-mass
name: Spring-Mass Oscillator
domain: waves
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.wave.shm
mastery_threshold: 0.80
estimated_hours: 3
cross_links:
  - phys.mech.hookes-law
  - phys.wave.shm-energy
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-VERTICAL-SPRING-DIFFERENT-PERIOD
- **Trigger signal:** Student says "a vertical spring-mass oscillates differently from a horizontal one because gravity changes the equilibrium" or includes g in the period formula.
- **Conflict evidence [P28]:** "The period of a vertical spring-mass is identical to a horizontal one: T = 2π√(m/k). Here's why: when a mass m hangs vertically on a spring, the equilibrium position is displaced by x_eq = mg/k below the natural length (where spring force balances weight). If we measure displacement from this new equilibrium point (call it y = x − x_eq), Newton's 2nd law gives: ma = −mg + k(x_eq + y) − mg... wait, re-derive carefully: F_net = −k(x_eq+y) + mg = −kx_eq − ky + mg. Since kx_eq = mg: F_net = −ky. So a = −(k/m)y — pure SHM about the new equilibrium with ω = √(k/m). Gravity shifts the equilibrium but does not change ω or T. The period is exactly the same."
- **Bridge text [P30]:** "Gravity shifts the equilibrium position downward by δ = mg/k, but oscillations about that equilibrium follow the same equation a = −(k/m)y. This is because mg and kδ exactly cancel at equilibrium — the only remaining force is the spring's restoring force −ky about the new equilibrium."
- **Replacement text [P31]:** "T = 2π√(m/k) for both horizontal and vertical spring-mass systems. Gravity shifts the equilibrium but does not enter the period formula. Always measure displacement from the equilibrium position."
- **Discrimination pairs [P33]:**
  - Horizontal spring (k=50, m=0.2): T = 2π√(0.2/50) = 0.397 s ✓
  - Same spring, vertical: T = 2π√(0.2/50) = 0.397 s (identical) ✓
- **s6_path:** "If gravity changed the period, a pendulum clock would need recalibration when you move it from the equator to a high altitude — but spring-mass clocks wouldn't. That's actually used in precision timekeeping."

---

### MC-STRETCHING-SPRING-ADDS-KE
- **Trigger signal:** Student says "the spring gives the mass extra kinetic energy because it's stretched further than the equilibrium" — confusing static stretch with dynamic energy.
- **Conflict evidence [P28]:** "In a vertical spring-mass, the spring's stretch at equilibrium (δ = mg/k) represents stored PE = ½kδ². But this PE was invested when you attached the mass — it equals the gravitational PE lost as the mass descended by δ from its natural length position. The total energy of the oscillation comes only from the amplitude of displacement from equilibrium, not from the static stretch. If you displace the mass further by A from equilibrium and release, the oscillation energy is ½kA². The static stretch energy is separate — it's 'already in the system' from setting it up."
- **Bridge text [P30]:** "Two reference points: (1) spring natural length position — everything is offset by δ = mg/k; (2) equilibrium position (spring stretched by δ) — oscillation energy is ½kA². For calculating T and oscillation energy, always use the equilibrium as reference. The static stretch and oscillation amplitude are independent."
- **Replacement text [P31]:** "Oscillation energy = ½kA² (A measured from equilibrium, NOT from natural length). Static equilibrium stretch δ = mg/k represents a separate energy already in the system. They don't add for oscillation purposes."
- **Discrimination pairs [P33]:**
  - Static: mass hangs at equilibrium, stretched δ = mg/k from natural length; PE_spring = ½kδ² = ½(mg)²/k ✓
  - Dynamic: pulled to A below equilibrium, released; oscillation E = ½kA²; E does not include the static PE ✓
- **s6_path:** "The static stretch is like the 'zeroed out' state of the system. Oscillation energy counts only from that zero — how far you pulled it from the resting hang position."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — SHM equations**
Prompt: "A spring-mass (m = 0.5 kg, k = 200 N/m) oscillates with A = 4 cm. Find T, ω, v_max, and a_max."
- Pass: ω = √(200/0.5) = 20 rad/s; T = 2π/20 = 0.314 s; v_max = 0.04×20 = 0.8 m/s; a_max = 0.04×400 = 16 m/s².
- Fail → [P52]: "T = 2π√(m/k), v_max = Aω, a_max = Aω². Review phys.wave.shm for these fundamentals." Route to shm.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — hanging and horizontal spring-mass, side by side**

> Set up two identical spring-mass systems: one horizontal on a frictionless table, one hanging vertically. Give both the same amplitude (same distance displaced from their respective equilibria) and release simultaneously. Watch: they oscillate in perfect synchrony — same period, same frequency. The vertical one's resting position is lower (gravity stretched it by mg/k), but the oscillation rate is identical. Timing confirms T = 2π√(m/k) for both.

Second anchor: use the spring-mass as a measurement device. Hang an unknown mass m. Measure the static extension δ → m = kδ/g. Then set it oscillating, measure T → m = kT²/(4π²). Both methods give the same mass — confirming the consistency of the SHM model.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Vertical Spring-Mass: Equilibrium Analysis [C]**

Mass m on spring k. At equilibrium (mass at rest, natural state + extension):
```
Spring force up = Weight down
kδ = mg   →   δ = mg/k
```

Displacement y measured from equilibrium (positive downward):
```
Net force = −ky   (gravity and static spring force cancel)
a = −(k/m)y      → SHM with ω = √(k/m)
T = 2π√(m/k)     (same as horizontal)
```

**TA-2 — Finding k from Static Extension [C→P]**

Static method for measuring k: hang mass m, measure equilibrium extension δ.
```
k = mg/δ
```

Applications: measuring spring constant of bungee cords; calibrating spring scales; checking consistency with dynamic measurement.

Dynamic method for measuring k: time N oscillations, find T = (total time)/N.
```
k = 4π²m/T²
```

Both methods give the same k — mutual consistency check.

**TA-3 — Two Springs: Series and Parallel (Vertical) [C→P]**

Series (one on top of other, same mass at bottom):
```
1/k_eff = 1/k₁ + 1/k₂     (same force through each; total extension adds)
T = 2π√(m/k_eff)   (larger T than either alone)
```

Parallel (both connected between ceiling and mass):
```
k_eff = k₁ + k₂     (both stretch same amount; forces add)
T = 2π√(m/k_eff)   (shorter T than either alone)
```

**TA-4 — Applications and Real Spring-Mass Systems [P]**

**Vehicle suspension**: car body (mass m) on springs (effective k). T = 2π√(m/k) gives the ride frequency. Too soft (small k): car body bounces slowly — nauseating. Too stiff (large k): every bump felt immediately. Engineers choose k to give T ≈ 1–1.5 s (0.7–1 Hz) for comfortable rides. Shock absorbers add damping to prevent sustained oscillation.

**Seismograph**: suspended mass on spring. When ground moves, mass (due to inertia) temporarily stays still while the frame moves. The relative displacement records the ground motion. T of the mass-spring determines which earthquake frequencies are detected.

**Atomic force microscopy (AFM)**: a tiny cantilever (spring k ≈ 1 N/m) with a sharp tip. Tip-sample interaction forces change the effective k slightly → frequency shift of the cantilever oscillation. Measuring frequency maps atomic-scale force variations.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — vertical spring: static and dynamic)**

> A spring hangs from the ceiling. A 300 g mass is attached; the spring extends 4.9 cm to the new equilibrium. (a) Find k. (b) The mass is pulled 3 cm below equilibrium and released. Find T, f, v_max.

```
(a) k = mg/δ = 0.3×9.8/0.049 = 2.94/0.049 = 60 N/m

(b) T = 2π√(m/k) = 2π√(0.3/60) = 2π×0.0707 = 0.444 s
    f = 1/T = 2.25 Hz
    v_max = Aω = 0.03×(2π/0.444) = 0.03×14.14 = 0.424 m/s
```

**WE-2 (Intermediate — springs in series and parallel)**

> Two springs: k₁ = 40 N/m, k₂ = 60 N/m. A 0.5 kg mass is attached. Find T when the springs are connected: (a) in series, (b) in parallel.

```
(a) Series: 1/k_eff = 1/40 + 1/60 = 3/120 + 2/120 = 5/120; k_eff = 24 N/m
    T = 2π√(0.5/24) = 2π×0.1443 = 0.907 s

(b) Parallel: k_eff = 40 + 60 = 100 N/m
    T = 2π√(0.5/100) = 2π×0.0707 = 0.444 s
```

**WE-3 (Advanced — finding mass from oscillation)**

> A spring (k = 150 N/m) attached to an unknown mass oscillates with period T = 0.4 s. (a) Find the mass. (b) If the mass is doubled, what is the new period? (c) Find the static extension of the spring with the original mass.

```
(a) T = 2π√(m/k) → T² = 4π²m/k → m = kT²/(4π²) = 150×0.16/(4π²) = 24/39.48 = 0.608 kg

(b) Doubled mass: T_new = T×√2 = 0.4×1.414 = 0.566 s

(c) δ = mg/k = 0.608×9.8/150 = 5.95/150 = 0.0397 m ≈ 4.0 cm
```

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Static and dynamic consistency**
"A spring-mass (k = 80 N/m) in the vertical orientation has a static extension of 3.68 cm. (a) Find the mass. (b) Find T. (c) If the mass is pulled 5 cm below equilibrium, find v_max."

*Target:* (a) m = kδ/g = 80×0.0368/9.8 = 2.944/9.8 = 0.3 kg. (b) T = 2π√(0.3/80) = 2π×0.0612 = 0.385 s. (c) v_max = Aω = 0.05×√(80/0.3) = 0.05×√266.7 = 0.05×16.33 = 0.816 m/s.

**MP-2 [P36] — Vertical vs. horizontal comparison**
"Two identical spring-mass systems (k = 120 N/m, m = 0.3 kg): one horizontal, one vertical. Both are displaced 5 cm from equilibrium. (a) Are their periods the same? (b) Are their maximum speeds the same? (c) Are their maximum displacements from the spring's natural length the same?"

*Target:* (a) Yes — T = 2π√(m/k) is the same for both. (b) Yes — v_max = Aω, both have A=5 cm and same ω. (c) No — the horizontal one: max displacement from natural length = A. The vertical one: at maximum downward displacement, spring is stretched by δ+A = mg/k+A; at maximum upward position, spring is stretched by δ−A.

**MP-3 [P36] — Series springs**
"Three identical springs (k = 60 N/m each) are connected in series to a 0.4 kg mass. Find: (a) k_eff, (b) T, (c) static extension of the series combination."

*Target:* (a) 1/k_eff = 3×(1/60) = 1/20 → k_eff = 20 N/m. (b) T = 2π√(0.4/20) = 2π√0.02 = 2π×0.1414 = 0.889 s. (c) δ = mg/k_eff = 0.4×9.8/20 = 0.196 m = 19.6 cm.

**MP-4 [P36] — Spring as weighing scale**
"A market vendor uses a spring scale (k = 500 N/m). A fish makes the scale oscillate with T = 0.2 s. Find the mass of the fish."

*Target:* m = kT²/(4π²) = 500×0.04/(4π²) = 20/39.48 = 0.507 kg ≈ 0.51 kg. (This is how a spring scale works even without timing — at equilibrium δ = mg/k → m = kδ/g. The timing method gives the same result.)

**MP-5 [P36] — Synthesis: car suspension**
"A car body of mass 1200 kg rests on four identical springs (one at each wheel). (a) If the natural frequency of the suspension is 1.0 Hz, find the spring constant of each spring. (b) If the car hits a speed bump and oscillates with A = 3 cm, what is the maximum acceleration of the car body?"

*Target:* (a) Total mass supported by 4 springs in parallel: k_total = m(2πf)² = 1200×(2π)² = 1200×39.48 = 47 375 N/m. Each spring: k = 47 375/4 = 11 844 N/m ≈ 12 kN/m. (b) a_max = Aω² = 0.03×(2π)² = 0.03×39.48 = 1.18 m/s² ≈ 0.12g. (Comfortable: below 0.2g is generally tolerable for road vehicles.)

---

## Component 7 — Session Architecture

```
[P01] Session open — side-by-side horizontal/vertical spring-mass demo
  ↓
[P41] PD-1 (SHM: ω, T, v_max, a_max for given m, k, A)
  ↓ PASS
[P06] Anchor: both systems oscillate in sync; spring as weighing device
  ↓
TA-1: Vertical equilibrium; kδ=mg; oscillation about equilibrium — same ω [C]
  ↓
[P28] Conflict: "vertical period is different" → MC-VERTICAL-SPRING-DIFFERENT-PERIOD
  ↓
WE-1: Vertical spring — find k from static extension; then T and v_max
  ↓
[P51] Check-in MP-1 (static+dynamic consistency check)
  ↓ monitor
TA-2: Measuring k — static method k=mg/δ; dynamic method k=4π²m/T² [C→P]
  ↓
[P28] Conflict: "static stretch adds oscillation energy" → MC-STRETCHING-SPRING-ADDS-KE
  ↓
TA-3: Springs in series and parallel (vertical); k_eff; T comparison [C→P]
  ↓
WE-2 → WE-3 (series/parallel T; finding mass from T)
  ↓
TA-4: Vehicle suspension; seismograph; AFM [P]
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "A 200 g mass on spring (k=80 N/m). Static extension? Period?"
[P68]; [P85]; [P89] 1/3/7 days; [P91] 80% gate
```

**Protocol routing:** S0: full CPA — side-by-side demo before derivation; S1: knows T=2π√(m/k) but inserts g for vertical case → MC-VERTICAL-SPRING-DIFFERENT-PERIOD; S4: PD-1 fail → phys.wave.shm; S6: [F] — "Two steps: (1) find equilibrium with kδ=mg; (2) oscillate about that equilibrium with T=2π√(m/k). Gravity cancels out of step 2."; S7: open with MP-5 (car suspension synthesis — requires working backwards from frequency specification to spring constant per wheel).

---

## Component 8 — Adaptive Flags

- **Equilibrium as reference**: always clearly label which position is "x = 0" (equilibrium) vs. the spring's natural length. The SHM equations reference the equilibrium; the static extension formula references the natural length. Mixing them causes errors in WE-3 and MP-2c.
- **Four-spring vehicle**: most suspension analysis problems use parallel springs (all four support the same mass), giving k_effective = 4k_per_spring. Students often forget the parallel combination.
- **Static method pitfall**: k = mg/δ requires knowing g precisely. At high precision, g varies by 0.5% from equator to pole. Dynamic method (k = 4π²m/T²) avoids using g entirely — used in precision experiments.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.wave.spring-mass |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.wave.shm ✓ |
| V-3 | difficulty label matches KG | PASS — proficient (4) |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 3h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-VERTICAL-SPRING-DIFFERENT-PERIOD, MC-STRETCHING-SPRING-ADDS-KE |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (SHM equations) |
| V-10 | Concrete anchor present [P06] | PASS — side-by-side horizontal/vertical demo; spring weighing device |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-4 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with accelerated P track (difficulty 4) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — equilibrium as reference, four-spring parallel, static method g dependence |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
