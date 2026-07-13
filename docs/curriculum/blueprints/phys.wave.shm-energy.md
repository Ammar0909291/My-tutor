# Teaching Blueprint — phys.wave.shm-energy

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.wave.shm-energy
name: Energy in Simple Harmonic Motion
domain: waves
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.wave.shm
mastery_threshold: 0.80
estimated_hours: 4
cross_links:
  - phys.mech.conservation-of-energy
  - phys.wave.damped-oscillations
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-SHM-ENERGY-CONSTANT-KE
- **Trigger signal:** Student thinks the kinetic energy of a SHM particle is constant, or says "the particle moves at constant speed so KE doesn't change."
- **Conflict evidence [P28]:** "Kinetic energy in SHM is NOT constant. KE = ½mv² = ½m(ω√(A²−x²))² = ½mω²(A²−x²). At x=0: KE = ½mω²A² (maximum). At x=±A: KE = 0 (particle momentarily at rest). The particle moves fastest through the centre and is stationary at the extremes — we established this in phys.wave.shm. Since KE = ½mv² and v varies, KE must vary. In a full oscillation, KE varies sinusoidally between 0 and ½mω²A²."
- **Bridge text [P30]:** "Total energy E = KE + PE = ½mω²A² (constant). As KE decreases (particle slowing near amplitude), PE increases (spring stores energy). As KE increases (particle speeding toward equilibrium), PE decreases. The total is always ½mω²A². Energy oscillates between kinetic and potential forms."
- **Replacement text [P31]:** "KE = ½mω²(A²−x²): zero at x=±A, maximum at x=0. PE = ½mω²x²: maximum at x=±A, zero at x=0. Total E = ½mω²A² = constant (conserved in ideal SHM — no damping)."
- **Discrimination pairs [P33]:**
  - At x = 0: KE = ½mω²A², PE = 0, E = ½mω²A² ✓
  - At x = A: KE = 0, PE = ½mω²A², E = ½mω²A² ✓
- **s6_path:** "Swing on a pendulum: fastest at the bottom (pure KE), stationary at the top (pure PE). Energy swaps back and forth. This is SHM energy exchange."

---

### MC-SHM-TOTAL-ENERGY-DEPENDS-ON-POSITION
- **Trigger signal:** Student calculates different total energies at different positions in a SHM cycle.
- **Conflict evidence [P28]:** "Total mechanical energy in ideal (undamped) SHM is conserved: E_total = KE + PE = ½mω²A² at every position. The positions where students find different totals are calculation errors — usually forgetting to evaluate PE at non-equilibrium positions. At x = 3 cm in a spring-mass with A = 5 cm: KE = ½mω²(25−9) cm² = ½mω²×16 cm²; PE = ½mω²×9 cm²; sum = ½mω²×25 cm² = ½mω²A². It always works out to the same total."
- **Bridge text [P30]:** "At any position x: KE + PE = ½mω²(A²−x²) + ½mω²x² = ½mω²A². The x² terms cancel. Total energy = ½mω²A² always — independent of position."
- **Replacement text [P31]:** "E_total = ½mω²A² = ½kA². This is constant throughout the motion (ideal SHM). If you compute KE+PE at any x and get a different answer, recheck your PE calculation."
- **Discrimination pairs [P33]:**
  - x = 0: E = 0 + ½kA² = ½kA² ✓ (wait — at x=0, PE = ½k×0 = 0; KE = ½kA²) ✓
  - x = A/2: KE = ½k(A²−A²/4) = ½k×¾A² = ¾(½kA²); PE = ½k(A/2)² = ¼(½kA²×2) = ½kA²/4 = ¼E; sum = ¾E+¼E = E ✓
- **s6_path:** "If your total energy changes between positions, your PE formula is wrong. The total is always ½kA²."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — SHM velocity**
Prompt: "Spring-mass: m = 0.2 kg, k = 80 N/m, A = 10 cm. Find: (a) ω; (b) max velocity; (c) velocity at x = 6 cm."
- Pass: ω = √(80/0.2) = 20 rad/s; v_max = Aω = 0.1×20 = 2 m/s; v(6cm) = 20√(0.01−0.0036) = 20×0.08 = 1.6 m/s.
- Fail → [P52]: "These are the SHM velocity formulas from phys.wave.shm. Review the displacement and velocity equations for SHM." Route to shm.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — the swinging pendulum energy exchange**

> Hold a heavy pendulum bob (or a ball on a string) at maximum angle and release. At the bottom: the bob swings fastest. At the top (other side): momentarily at rest. Then back. At the top: all energy is PE (gravitational). At the bottom: all energy is KE. No energy is lost (ideal case) — it continuously converts back and forth. Press your hand lightly on the bob at the bottom to absorb a little energy each swing — the pendulum gradually comes to rest (damped SHM). This shows that ideal SHM has constant total energy; real SHM loses energy slowly to friction.

Second anchor: E ∝ A² — double the amplitude, quadruple the energy. This means a spring stretched 2 cm stores 4× as much energy as one stretched 1 cm. Useful check: if the amplitude doubles, the total energy should quadruple.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — PE and KE in SHM [C]**

For a spring-mass system (spring constant k, mass m, angular frequency ω = √(k/m)):

Elastic potential energy at displacement x:
```
PE = ½kx² = ½mω²x²
```

Kinetic energy at displacement x (from v = ω√(A²−x²)):
```
KE = ½mv² = ½mω²(A²−x²)
```

Total mechanical energy:
```
E = KE + PE = ½mω²(A²−x²) + ½mω²x² = ½mω²A² = ½kA²
```

**E = ½kA²: total energy depends only on k and A. It is conserved in ideal SHM.**

**TA-2 — Energy–Position and Energy–Time Graphs [C→P]**

Energy–position graph (x from −A to +A):
- KE = ½mω²(A²−x²): parabola opening downward, maximum at x=0, zero at x=±A
- PE = ½mω²x²: upward parabola, zero at x=0, maximum at x=±A
- E_total: horizontal line at height ½mω²A² (constant)

Energy–time graph:
- KE(t) = ½mω²A² cos²(ωt): varies between 0 and E
- PE(t) = ½mω²A² sin²(ωt): varies between 0 and E
- Both oscillate at frequency 2f (twice the SHM frequency): at t = 0 (x = maximum), KE = 0, PE = E; at t = T/4 (x = 0), KE = E, PE = 0.

**TA-3 — Deriving Velocity from Energy Conservation [C→P]**

E = KE + PE:
```
½kA² = ½mv² + ½kx²
½mv² = ½k(A²−x²)
v² = (k/m)(A²−x²) = ω²(A²−x²)
v = ω√(A²−x²)
```

This derivation is the energy route to the SHM velocity formula — an alternative to calculus. Energy conservation provides the bridge between position and velocity without requiring differentiation.

**TA-4 — Effect of Amplitude on Energy [P]**

Since E = ½kA²:
- Doubling A → E quadruples (E ∝ A²)
- Halving A → E decreases to ¼

This has practical implications:
- Damped oscillator (phys.wave.damped-oscillations): if energy is lost to friction at each cycle, amplitude decreases. Rate of energy loss determines how quickly amplitude drops.
- Initial conditions set A → set E. Starting from x = A₀ at rest: all energy = ½kA₀². Starting from x = 0 with speed v₀: all energy = ½mv₀², giving effective A = v₀/ω.

Resonance preview: when an external oscillating force matches ω (natural frequency), energy is continuously added → A grows → energy grows as A². This is why resonance can be destructive.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — energy from amplitude)**

> A spring-mass system: k = 400 N/m, m = 0.25 kg, A = 8 cm. Find: (a) total energy, (b) max speed.

```
(a) E = ½kA² = ½×400×(0.08)² = 200×0.0064 = 1.28 J

(b) v_max = Aω = A√(k/m) = 0.08×√(400/0.25) = 0.08×√1600 = 0.08×40 = 3.2 m/s
    Check: ½mv_max² = ½×0.25×(3.2)² = 0.125×10.24 = 1.28 J ✓
```

**WE-2 (Intermediate — velocity at a position)**

> Same system (k=400, m=0.25, A=8 cm). At x = 5 cm: find KE, PE, and velocity.

```
PE = ½kx² = ½×400×(0.05)² = 200×0.0025 = 0.5 J

KE = E − PE = 1.28 − 0.5 = 0.78 J

v = √(2KE/m) = √(2×0.78/0.25) = √6.24 = 2.498 m/s ≈ 2.50 m/s

Check: v = ω√(A²−x²) = 40×√(0.0064−0.0025) = 40×√0.0039 = 40×0.0624 = 2.50 m/s ✓
```

**WE-3 (Advanced — initial velocity → amplitude)**

> A 0.5 kg mass on a spring (k = 200 N/m) is at x = 3 cm moving at 4 m/s. Find: (a) total energy, (b) amplitude, (c) max speed.

```
(a) E = KE + PE = ½mv² + ½kx² = ½×0.5×16 + ½×200×(0.03)²
       = 4 + 0.09 = 4.09 J

(b) ½kA² = 4.09 → A² = 2×4.09/200 = 0.0409 → A = 0.202 m = 20.2 cm

(c) v_max = A√(k/m) = 0.202×√(200/0.5) = 0.202×20 = 4.04 m/s
```

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Energy at different positions**
"Spring-mass: k=500 N/m, A=6 cm. Find E_total and KE, PE at x=0, 3 cm, 6 cm. Confirm E_total is constant."

*Target:* E_total = ½×500×(0.06)² = 0.9 J. At x=0: KE=0.9 J, PE=0. At x=3cm: PE=½×500×(0.03)²=0.225 J, KE=0.675 J; sum=0.9 J ✓. At x=6cm: PE=0.9 J, KE=0; sum=0.9 J ✓.

**MP-2 [P36] — Amplitude effect**
"A SHM system has E=0.4 J at amplitude A. What is the energy if: (a) A doubles; (b) A is halved; (c) k doubles at the same A?"

*Target:* (a) A×2: E×4 = 1.6 J. (b) A÷2: E÷4 = 0.1 J. (c) k×2 at same A: E = ½(2k)A² = 2×0.4 = 0.8 J (energy doubles).

**MP-3 [P36] — Fraction of energy as KE**
"At what displacement x is the KE equal to twice the PE in a SHM system with amplitude A?"

*Target:* KE = 2PE → E−PE = 2PE → E = 3PE → ½kA² = 3×½kx² → A² = 3x² → x = A/√3 = A√3/3 ≈ 0.577A.

**MP-4 [P36] — Energy-time graph**
"Sketch KE(t) and PE(t) for one full period of SHM starting from x = A at t = 0. What is the period of the energy oscillations?"

*Target:* KE(t) = ½mω²A²cos²(ωt): starts at zero, rises to maximum at t=T/4 (x=0), back to zero at T/2, etc. PE(t) = ½mω²A²sin²(ωt): starts at E_total, falls to zero at T/4, back to E_total at T/2. Both oscillate with period T/2 (twice the SHM frequency 2f). Neither is ever negative.

**MP-5 [P36] — Synthesis: find all parameters from energy and position**
"A spring-mass oscillator: at x = 4 cm the speed is 1.5 m/s; at x = 8 cm the speed is 0. Find: (a) amplitude; (b) spring constant if m = 0.3 kg; (c) total energy; (d) maximum speed."

*Target:* (a) Speed = 0 at x = 8 cm → A = 8 cm = 0.08 m. (b) ω² = (v at 4 cm)² / (A²−(4cm)²) = (1.5)²/(0.0064−0.0016) = 2.25/0.0048 = 468.75 rad²/s². k = mω² = 0.3×468.75 = 140.6 N/m. (c) E = ½kA² = ½×140.6×0.0064 = 0.45 J. (d) v_max = Aω = 0.08×√468.75 = 0.08×21.65 = 1.732 m/s.

---

## Component 7 — Session Architecture

```
[P01] Session open — pendulum energy exchange demo; pendulum stopped by hand → restart smaller
  ↓
[P41] PD-1 (SHM velocity formula; v=ω√(A²−x²))
  ↓ PASS
[P06] Anchor: pendulum: all PE at top, all KE at bottom; damped reduction by touch
  ↓
TA-1: PE=½kx²; KE=½mω²(A²−x²); E_total=½kA² [C]
  ↓
[P28] Conflict: "KE is constant in SHM" → MC-SHM-ENERGY-CONSTANT-KE
  ↓
WE-1: Total energy and max speed from k and A
  ↓
[P51] Check-in MP-1 (KE and PE at three positions; confirm constant total)
  ↓ monitor
TA-2: Energy–position and energy–time graphs; both oscillate at 2f [C→P]
  ↓
[P28] Conflict: "total energy changes with position" → MC-SHM-TOTAL-ENERGY-DEPENDS-ON-POSITION
  ↓
TA-3: Derive v from energy conservation (alternative to calculus) [C→P]
  ↓
WE-2 → WE-3 (KE, PE at a position; find amplitude from mid-cycle conditions)
  ↓
TA-4: E ∝ A²; resonance energy growth preview [P]
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "SHM: k=300 N/m, A=5 cm. Total energy? KE at x=3 cm?"
[P68]; [P85]; [P89] 1/3/7 days; [P91] 80% gate
```

**Protocol routing:** S0: full CPA — pendulum energy exchange before any formula; S1: can compute KE at one point but says total changes → MC-SHM-TOTAL-ENERGY-DEPENDS-ON-POSITION; S4: PD-1 fail → phys.wave.shm; S6: [F] — "E = ½kA². This is the one number that defines the whole oscillation. Split it between KE and PE at any position using ½kx² for PE."; S7: open with MP-5 (find all parameters from two velocity-position measurements — reverse engineering requires setting up simultaneous equations).

---

## Component 8 — Adaptive Flags

- **Consistent units**: A and x must be in metres when using k in N/m. Students often work in cm throughout and get incorrect energies. Enforce metre conversion at the start of every example.
- **PE formula**: PE = ½kx² = ½mω²x². Both forms are equivalent (since k = mω²). The ½kx² form is usually simpler when k is given; the ½mω²x² form when ω is given.
- **E_total = ½kA² check**: after every energy calculation, verify KE + PE = ½kA². If it doesn't check out, the error is almost always in the PE evaluation (forgot the ½, used diameter instead of radius, or mixed units).
- **Energy oscillates at 2ω**: KE and PE each oscillate with angular frequency 2ω (time period T/2, twice the SHM frequency). This is because sin²(ωt) and cos²(ωt) have period π/ω = T/2. This surprises students who expect energy to oscillate at the same frequency as displacement.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.wave.shm-energy |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.wave.shm ✓ |
| V-3 | difficulty label matches KG | PASS — proficient (4) |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 4h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-SHM-ENERGY-CONSTANT-KE, MC-SHM-TOTAL-ENERGY-DEPENDS-ON-POSITION |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (SHM velocity formula) |
| V-10 | Concrete anchor present [P06] | PASS — pendulum energy exchange; damped reduction by touch |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-4 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with accelerated P track (difficulty 4) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — unit conversion, PE formula forms, KE+PE check, energy oscillation at 2ω |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
