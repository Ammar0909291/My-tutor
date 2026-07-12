# Teaching Blueprint — phys.mech.gravitational-potential

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.mech.gravitational-potential
name: Gravitational Potential Energy
domain: mechanics
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.mech.gravitational-field
  - phys.mech.potential-energy
mastery_threshold: 0.80
estimated_hours: 4
cross_links:
  - phys.mech.escape-velocity
  - phys.mech.orbital-mechanics
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-MGHZERO
- **Trigger signal:** Student applies U = mgh at large distances from Earth's surface, uses h measured from the ground, or confuses the two gravitational PE formulas.
- **Conflict evidence [P28]:** "U = mgh assumes the gravitational field g is constant — this is only valid near Earth's surface (h ≪ R_E ≈ 6370 km). At r = 2R_E from Earth's centre, g is already one-quarter of its surface value. Using U = mgh at r = 3R_E would give U = m × 9.8 × 2 × 6.37 × 10⁶ ≈ 1.25 × 10⁸ m joules, while the correct formula U = −GMm/r gives approximately −3.1 × 10⁷ m joules — not even close in sign. The two formulas are fundamentally different."
- **Bridge text [P30]:** "U = mgh is a local approximation valid when h ≪ R_E. It uses a flat-Earth assumption and a constant g. The exact formula U = −GMm/r is the universal one, valid everywhere, with zero reference at infinity. Near Earth's surface, U = −GMm/r + const simplifies to U ≈ mgh + const — the two are compatible but the reference level differs."
- **Replacement text [P31]:** "Use U = mgh only for problems explicitly near Earth's surface (h < few km). For any problem involving orbits, satellites, escape, or distances of hundreds of kilometres or more, use U = −GMm/r, where r is measured from Earth's centre."
- **Discrimination pairs [P33]:**
  - Lifting a 2 kg book 1.5 m: ΔU = mgh = 2 × 9.8 × 1.5 = 29.4 J ✓ (h ≪ R_E)
  - Satellite at r = 2R_E: U = −GMm/(2R_E) (use exact formula; h ≫ local scale) ✓
- **s6_path:** "Two PE formulas for gravity feels confusing. Here's the rule: if the problem mentions altitude in metres or kilometres with no orbital context, use mgh. If it mentions orbits, satellites, escape — use −GMm/r. You'll never need both in the same problem."

---

### MC-POSITIVE-POTENTIAL
- **Trigger signal:** Student expects gravitational PE to be positive and gets confused by the negative sign in U = −GMm/r.
- **Conflict evidence [P28]:** "The reference for U = −GMm/r is at r = ∞, where U = 0. As a mass falls toward Earth (r decreases), gravity does positive work, so the system must lose potential energy — it must decrease from 0, going negative. At Earth's surface, U ≈ −62.5 MJ per kilogram — deeply negative. The sign is not arbitrary: it tells us the gravitational bound state requires energy input to escape to U = 0 at infinity."
- **Bridge text [P30]:** "Think of it like a hole: Earth's gravity digs a potential well below zero. Objects in orbit sit partway up the well (U negative, but less negative than at the surface). An object with total energy E < 0 is trapped in the well; one with E ≥ 0 can escape to infinity."
- **Replacement text [P31]:** "U = −GMm/r is always negative (for positive masses). It equals zero only at r = ∞. A less negative U means more energy — the object has 'climbed' the potential well. A more negative U means the object is deeper in the well."
- **Discrimination pairs [P33]:**
  - r = R_E: U = −GMm/R_E (most negative in our context → deepest in well)
  - r = 2R_E: U = −GMm/(2R_E) (half as negative → higher in the well)
  - r = ∞: U = 0 (reference level — the object has escaped)
- **s6_path:** "Negative PE in gravity is one of those things that feels wrong at first. Remind yourself: the reference is at infinity, not the ground. The deeper you are in Earth's gravity, the more negative your PE."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Gravitational field formula**
Prompt: "Write the expression for gravitational field strength g at distance r from a planet of mass M. What happens to g when r doubles?"
- Pass: g = GM/r²; g reduces to ¼ of its value.
- Fail → [P52]: "We need the field formula before we can define potential energy. g = GM/r²; let's confirm that before proceeding." → Route to phys.mech.gravitational-field.

**PD-2 [P41] — Potential energy concept**
Prompt: "A 5 kg object is raised 10 m on Earth. How much work does gravity do? What is the change in gravitational PE?"
- Pass: W_gravity = −mgh = −490 J; ΔU = +490 J (PE increases as object moves against gravity).
- Fail → [P52]: "Potential energy is the energy stored against a force. When you lift an object, gravity does negative work and PE increases by the same magnitude." → Route to phys.mech.potential-energy.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — the gravitational well visualisation**

> Imagine a large rubber sheet stretched horizontally, representing flat empty space. Now place a heavy ball (Earth) in the centre — it sinks the sheet into a curved funnel. A small marble (satellite) placed on the sheet rolls toward the funnel. The depth of the funnel at any point is the magnitude of the gravitational PE at that location.

Key observations:
- The sheet is flattest (PE ≈ 0) far from the centre (r → ∞).
- The deeper in the funnel, the more negative the PE — the harder to climb out.
- To escape (reach the flat edge), the marble needs enough kinetic energy to "climb" out of the well from wherever it starts.

This concrete image of the "gravitational potential well" supports:
- Why U is negative (below the zero reference at infinity)
- Why more energy is needed for deeper orbits to escape
- Why satellites in lower orbits move faster (deeper in the well → more KE needed)

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Derivation of U = −GMm/r [C]**

Gravitational PE is defined as the work done by an external agent to bring mass m from infinity to distance r from mass M, with zero kinetic energy change:

```
W_ext = −W_gravity = −∫[∞→r] F · dr
```

Since F_gravity = −GMm/r² (toward M, along −r̂), and we integrate against gravity:

```
U(r) = −W_gravity = −GMm/r
```

Properties:
- U(∞) = 0 (reference level: infinity)
- U(r) < 0 for all finite r (always negative)
- U increases (becomes less negative) as r increases
- ΔU = U(r₂) − U(r₁) = GMm(1/r₁ − 1/r₂)

**TA-2 — Connection to Local Formula U = mgh [C→P]**

Near Earth's surface (r ≈ R_E, h = r − R_E ≪ R_E):

```
ΔU = U(R_E + h) − U(R_E)
   = −GMm/(R_E + h) − (−GMm/R_E)
   = GMm/R_E × (1 − R_E/(R_E + h))
   = GMm/R_E × (h/(R_E + h))
   ≈ GMm × h / R_E²          (since h ≪ R_E)
   = (GM/R_E²) × mh
   = g × mh = mgh
```

This shows U = mgh is the first-order approximation to U = −GMm/r near the surface. The two are consistent; they differ only in reference level (U = mgh takes the surface as U = 0, while U = −GMm/r takes infinity as U = 0).

**TA-3 — Gravitational Potential (per unit mass) [C→P]**

The gravitational potential V (not the same as PE) is PE per unit mass:

```
V = U/m = −GM/r       (units: J/kg)
```

V is a field quantity — it depends only on position and the source mass M, not on the test mass m. The gravitational field and potential are related:

```
g = −dV/dr     (field is the negative gradient of potential)
```

This mirrors the relationship g = F/m (field = force per unit mass).

Equipotential surfaces: surfaces of constant V are concentric spheres around a point mass. Moving along an equipotential surface requires no work against gravity.

**TA-4 — Energy Conservation with the Exact Formula [P]**

For problems with large displacements (orbits, escape), use energy conservation with U = −GMm/r:

```
E_total = KE + U = ½mv² − GMm/r = constant
```

Three energy regimes:
- E < 0: bound orbit (object cannot escape)
- E = 0: parabolic escape trajectory (minimum escape condition)
- E > 0: hyperbolic trajectory (excess speed beyond escape)

Example: a rocket launched from Earth's surface at speed v. At height r = 2R_E from centre:

```
½mv₀² − GMm/R_E = ½mv² − GMm/(2R_E)
```

Solve for v (the speed at 2R_E given launch speed v₀).

**TA-5 — Gravitational Potential Energy Change in Orbits [P]**

For a satellite moving from orbit r₁ to orbit r₂ > r₁:

```
ΔU = GMm(1/r₁ − 1/r₂) > 0   (PE increases — less negative)
ΔKE = ?
```

Using the virial theorem for circular orbits (KE = −½U):

```
KE = −½ × (−GMm/r) = GMm/(2r)
Total energy E = KE + U = GMm/(2r) − GMm/r = −GMm/(2r)
```

Counter-intuitive result: a satellite in a higher orbit has less kinetic energy (moves slower) but more total mechanical energy (less negative). Boosting to a higher orbit requires energy input.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — PE at a given height)**

> Calculate the gravitational PE of a 500 kg satellite at an orbital radius of 7000 km from Earth's centre. (G = 6.674 × 10⁻¹¹, M_E = 5.97 × 10²⁴ kg)

Solution:
```
U = −GMm/r
  = −(6.674 × 10⁻¹¹ × 5.97 × 10²⁴ × 500) / (7.0 × 10⁶)
  = −(1.991 × 10¹⁷) / (7.0 × 10⁶)
  = −2.84 × 10¹⁰ J  (−28.4 GJ)
```

The negative value confirms the satellite is gravitationally bound to Earth.

---

**WE-2 (Intermediate — energy conservation, large displacement)**

> A 200 kg probe is at rest at Earth's surface. It is given enough energy to reach 3R_E from Earth's centre. Find the minimum launch speed. (R_E = 6.37 × 10⁶ m)

Solution:
```
Energy conservation: ½mv₀² + U_i = 0 + U_f (v_f = 0 at 3R_E — just reaches)

½mv₀² − GMm/R_E = 0 − GMm/(3R_E)

½mv₀² = GMm/R_E − GMm/(3R_E) = GMm/R_E × (1 − 1/3) = (2/3)(GMm/R_E)

v₀² = (4/3)(GM/R_E)
    = (4/3) × (6.674 × 10⁻¹¹ × 5.97 × 10²⁴) / (6.37 × 10⁶)
    = (4/3) × 6.26 × 10⁷
    = 8.35 × 10⁷

v₀ = 9140 m/s  ≈ 9.1 km/s
```

---

**WE-3 (Misconception-targeted — mgh vs. exact formula comparison)**

> A 1000 kg rocket is at altitude h = 200 km. Calculate ΔU from the surface using: (a) U = mgh, (b) U = −GMm/r. Compare and explain any discrepancy.

Solution:
```
(a) ΔU = mgh = 1000 × 9.8 × 200 × 10³ = 1.96 × 10⁹ J

(b) r_surface = 6.37 × 10⁶ m; r_200km = 6.57 × 10⁶ m
ΔU = GMm(1/r_i − 1/r_f)
   = 6.674 × 10⁻¹¹ × 5.97 × 10²⁴ × 1000 × (1/6.37 × 10⁶ − 1/6.57 × 10⁶)
   = 3.984 × 10¹⁷ × (1.570 × 10⁻⁷ − 1.522 × 10⁻⁷)
   = 3.984 × 10¹⁷ × 4.8 × 10⁻⁹
   = 1.91 × 10⁹ J

Discrepancy: ~2.5% (exact formula gives slightly less — g decreases with altitude)
At 200 km, g ≈ 9.2 m/s² vs. surface 9.8 m/s². Using mgh overestimates because it assumes constant g = 9.8 m/s². For LEO (200–400 km), error ~2–4% — often acceptable. For 1000 km+, the error grows substantially.
```

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Sign and reference**
"Two satellites, A at r = R_E and B at r = 3R_E. Which has more gravitational PE? Which has more kinetic energy? Which has more total energy?"

*Target:* PE: B > A (B is less negative); KE: A > B (closer orbit → faster); Total E: B > A (B's total E is less negative, i.e., 'higher').

**MP-2 [P36] — Formula selection**
"A 2 kg ball is raised 3 m off the floor in a room. Calculate ΔU using (a) U = mgh, (b) U = −GMm/r. Which is more appropriate? Why?"

*Target:* (a) ΔU = 2 × 9.8 × 3 = 58.8 J; (b) gives essentially the same answer (h ≪ R_E). mgh is appropriate — the exact formula agrees but is unnecessarily complex for this scale.

**MP-3 [P36] — Energy conservation (orbital)**
"A satellite is in a circular orbit at radius r = R_E + 500 km ≈ 6870 km. Using E = −GMm/(2r), find its total energy per kg. How does this compare to the PE per kg?"

*Target:* E/m = −GM/(2r) = −(6.674 × 10⁻¹¹ × 5.97 × 10²⁴)/(2 × 6.87 × 10⁶) ≈ −29.0 MJ/kg; U/m = −GM/r ≈ −58.0 MJ/kg; E = U/2 confirms virial theorem.

**MP-4 [P36] — Bound vs. unbound**
"A spacecraft at r = 2R_E from Earth's centre has speed v = 6000 m/s. Is it bound to Earth? (Escape speed from 2R_E = √(GM/R_E) ≈ √(6.26 × 10⁷) ≈ 7910 m/s)"

*Target:* v = 6000 < 7910 m/s → E_total = ½mv² − GMm/(2R_E) < 0 → bound. The spacecraft cannot escape; it will follow a closed (elliptical) orbit.

**MP-5 [P36] — Synthesis: required launch speed**
"What minimum speed must a probe be given at Earth's surface to reach altitude h = R_E (i.e., r_final = 2R_E)?"

*Target:* ½mv₀² − GMm/R_E = 0 − GMm/(2R_E) → v₀ = √(GM/R_E) = √(6.26 × 10⁷) ≈ 7910 m/s (this is also escape speed from 2R_E — the probe just barely reaches 2R_E with v = 0).

---

## Component 7 — Session Architecture

```
[P01] Session open — gravitational well rubber-sheet provocation
  ↓
[P41] PD-1 (gravitational field formula) + PD-2 (PE concept)
  ↓ PASS both
[P06] Anchor: rubber-sheet well visualisation → U is negative, zero at ∞
  ↓
TA-1: Derive U = −GMm/r; properties table [C]
  ↓
TA-2: Recover U = mgh from exact formula [C→P]
  ↓
[P51] Check-in: "At r = 3R_E, which formula do you use?" (formula selection)
  ↓ monitor
TA-3: Gravitational potential V = U/m; equipotentials [C→P]
  ↓
WE-1 → WE-2 → WE-3 (escalating; WE-3 is the MC-MGHZERO head-on)
  ↓
TA-4: Energy conservation; E < 0 vs. E ≥ 0 regimes [P]
  ↓
TA-5: Orbital PE + virial theorem (E = U/2) [P]
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval schedule seed: "Does a higher orbit have more or less total energy?"
[P68] Session close
[P85] Regulation tail
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 80% MP-set; re-route if below threshold
```

**Protocol routing:**
- S0 (novice): full CPA path; extend rubber-sheet anchor with a simulated energy diagram (drawing the potential well curve) before TA-1.
- S1 (schema without grounding): knows U = mgh but not U = −GMm/r; begin with WE-3 (comparison problem) to create explicit conflict.
- S4 (prereq gap): PD-1 fail → gravitational-field; PD-2 fail → potential-energy.
- S6 (anxiety): [F] protocol — "Gravitational PE is just a tool for tracking energy. The formula looks scarier than mgh but it's the same idea — energy stored against gravity."
- S7 (overconfident): open with MP-1 (compare E/KE/PE across two orbits) — the counter-intuitive result that higher orbits have less KE but more total E catches overconfident students.

---

## Component 8 — Adaptive Flags

- **Negative sign discipline**: the most common error is dropping the negative sign from U = −GMm/r. Insist students write the minus sign explicitly at every step and check: "Is the PE negative? It must be."
- **Virial theorem** (TA-5): present as a result (E = U/2, KE = −U/2 for circular orbits) rather than derived. The derivation requires circular orbit force balance and is covered in phys.mech.orbital-mechanics. At this stage, the result is sufficient.
- **ΔU formula**: for energy-conservation problems, the cleanest form is ΔU = GMm(1/r₁ − 1/r₂). Write it this way to avoid double-minus sign errors.
- **Rubber-sheet analogy limitation**: the rubber-sheet model is spatial (a 2D surface), which means it cannot directly represent the radial 1/r dependence — the well shape in the model is not exactly a 1/r² funnel. Use it for qualitative intuition only; don't over-extend the analogy.
- **Escape velocity connection** (MP-4, MP-5): these probes foreshadow phys.mech.escape-velocity. Do not derive escape velocity formula here; just use the E = 0 condition conceptually.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.mech.gravitational-potential |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.mech.gravitational-field ✓, phys.mech.potential-energy ✓ |
| V-3 | difficulty label matches KG | PASS — proficient (4) |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 4h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-MGHZERO, MC-POSITIVE-POTENTIAL |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (gravitational-field), PD-2 (potential-energy) |
| V-10 | Concrete anchor present [P06] | PASS — gravitational well / rubber-sheet analogy |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with accelerated P (difficulty 4) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — negative sign, virial theorem, ΔU form, rubber-sheet limits, escape preview |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
