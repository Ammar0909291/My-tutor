# Teaching Blueprint — phys.mech.escape-velocity

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.mech.escape-velocity
name: Escape Velocity
domain: mechanics
difficulty:
  label: advanced
  number: 5
bloom: apply
prerequisites:
  - phys.mech.gravitational-potential
  - phys.mech.conservation-of-energy
mastery_threshold: 0.80
estimated_hours: 5
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 5 → C with accelerated P track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-ESCAPE-REQUIRES-THRUST
- **Trigger signal:** Student says "the rocket must keep its engines on to escape Earth" or thinks escape velocity only applies to self-powered vehicles.
- **Conflict evidence [P28]:** "Escape velocity is the minimum speed needed at launch such that no further propulsion is required — the object coasts to infinity on kinetic energy alone. A baseball thrown at 11.2 km/s from Earth's surface would escape Earth's gravity with engines off (ignoring air resistance). The condition is purely energetic: KE at launch ≥ |U at launch|. A rocket that escapes slowly with continuous thrust needs far less initial speed — but escape velocity specifically refers to the unpropelled case."
- **Bridge text [P30]:** "Escape velocity is an energy condition, not a dynamics condition. We ask: 'What launch KE just equals the depth of the gravitational potential well?' If KE ≥ |U|, the total energy E ≥ 0 and the object escapes. No engines required after the initial impulse."
- **Replacement text [P31]:** "Escape velocity v_e = √(2GM/r) is the minimum speed for an unpropelled object to escape to infinity (reach r = ∞ with zero speed left). Below v_e, the object follows a closed (bound) orbit or falls back. Above v_e, it follows a hyperbolic escape trajectory."
- **Discrimination pairs [P33]:**
  - A rocket with continuous thrust can escape at any speed (time-integrated work overcomes gravity).
  - A baseball at exactly v_e escapes with no thrust after launch.
  - A baseball at 0.9 v_e always falls back — no amount of waiting helps; it's energetically trapped.
- **s6_path:** "The word 'escape' makes it sound like something dramatic. It just means: the launch energy is enough that gravity can never pull you back, even with infinite time. Think of it as the energy threshold to leave the gravitational well."

---

### MC-ESCAPE-DEPENDS-ON-MASS
- **Trigger signal:** Student says "heavier objects need more speed to escape" or tries to include m in the v_e formula.
- **Conflict evidence [P28]:** "From energy conservation: ½mv_e² = GMm/r. The mass m cancels from both sides: v_e² = 2GM/r — mass of the escaping object does not appear. A 1 kg ball and a 1000 kg rocket launched from the same point in the same gravitational field have the same escape velocity. (The rocket needs much more energy overall — 1000× more — but the same speed.)"
- **Bridge text [P30]:** "This is exactly like free-fall: all objects fall at the same acceleration g regardless of mass (Galileo's result). Escape velocity is the reverse of free-fall from infinity — and mass cancels there too, for the same reason."
- **Replacement text [P31]:** "v_e = √(2GM/r) depends only on the source mass M and the launch radius r. The escaping object's mass determines the energy needed (E = ½mv_e²) but not the speed."
- **Discrimination pairs [P33]:**
  - v_e from Earth's surface ≈ 11.2 km/s for a 1 kg probe ✓
  - v_e from Earth's surface ≈ 11.2 km/s for a 10 000 kg spacecraft ✓ (same speed; 10 000× more energy)
- **s6_path:** "The mass cancellation surprises almost everyone. Write out the energy equation and watch m cancel — that's the proof."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Gravitational potential energy (exact formula)**
Prompt: "Write the gravitational PE of a mass m at distance r from planet mass M. What is U at r = ∞?"
- Pass: U = −GMm/r; U(∞) = 0.
- Fail → [P52]: "Escape velocity derives directly from U = −GMm/r with the reference at infinity. Let's review that before proceeding." → Route to phys.mech.gravitational-potential.

**PD-2 [P41] — Energy conservation condition**
Prompt: "A ball is thrown upward on Earth. If the ball just barely reaches the top of a hill and stops, what is its total mechanical energy at the top?"
- Pass: E_total = KE + PE = 0 + mgh_top; and at launch KE = E_total − 0 (same total E by conservation).
- Fail → [P52]: "Conservation of energy tells us total E = KE + U is constant when no friction acts. We'll use this to find the minimum launch speed. Let's review the energy conservation framework first." → Route to phys.mech.conservation-of-energy.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — the gravitational well and the marble**

> Return to the rubber-sheet potential well (from phys.mech.gravitational-potential). Place a marble at the bottom. Roll it gently — it rolls back. Roll it harder — it climbs higher, but still rolls back. What is the minimum speed to roll it over the edge and off the sheet entirely?

The "edge" of the well at infinity is U = 0. The marble (mass m) at radius r has PE = −GMm/r. To just reach the edge with zero speed left:

```
KE_launch + U_launch = 0 + 0
½mv_e² − GMm/r = 0
v_e = √(2GM/r)
```

The analogy makes the derivation feel inevitable: escape velocity is the speed needed to roll the marble to the rim of the well with nothing left over.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Derivation from Energy Conservation [C]**

Starting condition: object at radius r with speed v_e, zero further propulsion.
Final condition: object at r = ∞ with v = 0 (minimum escape — just barely makes it).

Energy conservation:
```
½mv_e² + (−GMm/r) = 0 + 0

½mv_e² = GMm/r

v_e² = 2GM/r

v_e = √(2GM/r)
```

Note: m cancels → escape velocity is independent of the object's mass.

For a launch from the surface (r = R_planet):
```
v_e = √(2GM/R)
```

Using g = GM/R² (surface gravitational field):
```
v_e = √(2gR)
```

**TA-2 — Escape Velocity Values and Comparisons [C→P]**

| Body | M (kg) | R (km) | v_e (km/s) |
|---|---|---|---|
| Earth | 5.97 × 10²⁴ | 6 371 | 11.2 |
| Moon | 7.34 × 10²² | 1 737 | 2.38 |
| Mars | 6.39 × 10²³ | 3 390 | 5.03 |
| Sun | 1.99 × 10³⁰ | 696 000 | 617.5 |
| Neutron star | ~2 × 10³⁰ | ~10 | ~2 × 10⁵ |
| Black hole | ≥ M_sun | ≤ R_s (= 2GM/c²) | ≥ c |

Key insight — what determines v_e:
- More massive → higher v_e (larger M in numerator)
- Smaller radius → higher v_e (smaller R in denominator)
- A neutron star: Sun's mass compressed to 10 km radius → v_e ≈ 2/3 c

**TA-3 — Three Energy Regimes [C→P]**

For an object launched from r = R with speed v:

```
E = ½mv² − GMm/R
```

| E | Trajectory | Description |
|---|---|---|
| E < 0 | Ellipse (bound) | Object returns; orbit is closed |
| E = 0 | Parabola | Object just escapes (v = v_e) |
| E > 0 | Hyperbola | Object escapes with excess speed |

At infinity (r → ∞): v_∞ = √(v² − v_e²) (excess speed at infinity for E > 0).

**TA-4 — Escape from Non-Surface Locations [P]**

Escape velocity depends on r, not just the planet's surface. From any orbital radius r:

```
v_e(r) = √(2GM/r)
```

Relationship to orbital speed:
```
v_orbital(r) = √(GM/r)   (circular orbit)
v_e(r) = √2 × v_orbital(r)   ≈ 1.414 × v_orbital
```

This means a satellite in circular orbit needs to increase its speed by a factor of √2 to escape from that orbit. From LEO (r ≈ 6770 km):
```
v_orbital ≈ 7670 m/s
v_e ≈ 10 840 m/s
Δv needed ≈ 3170 m/s   (Δv to escape from LEO)
```

**TA-5 — Black Holes: Schwarzschild Radius [P]**

If v_e = c (speed of light), Newtonian formula gives the Schwarzschild radius:

```
c = √(2GM/R_s)  →  R_s = 2GM/c²
```

For the Sun: R_s = 2 × 6.674 × 10⁻¹¹ × 1.99 × 10³⁰ / (3 × 10⁸)² ≈ 2950 m ≈ 3 km.

**Note**: this is a Newtonian calculation that gives the correct answer for the wrong reason (general relativity is needed for full treatment). Present as a conceptual bridge, not a rigorous derivation.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — escape velocity calculation)**

> Calculate the escape velocity from the Moon's surface. (M_Moon = 7.34 × 10²² kg, R_Moon = 1.74 × 10⁶ m)

Solution:
```
v_e = √(2GM/R)
    = √(2 × 6.674 × 10⁻¹¹ × 7.34 × 10²² / 1.74 × 10⁶)
    = √(9.793 × 10¹² / 1.74 × 10⁶)
    = √(5.628 × 10⁶)
    = 2374 m/s ≈ 2.38 km/s
```

Comparison: Earth's 11.2 km/s — this is why Apollo missions could launch off the Moon with small engines.

---

**WE-2 (Intermediate — speed at infinity)**

> A 500 kg probe is launched from Earth's surface at v = 15 km/s. What is its speed when it has moved infinitely far from Earth? (v_e from Earth = 11.2 km/s)

Solution:
```
Energy conservation: E = ½mv² − GMm/R = constant
At launch: ½m(15 000)² − GMm/R_E
At r = ∞: ½mv_∞²

½mv_∞² = ½mv² − GMm/R
v_∞² = v² − v_e² = (15 000)² − (11 200)² = 2.25 × 10⁸ − 1.254 × 10⁸ = 9.96 × 10⁷
v_∞ = 9980 m/s ≈ 10.0 km/s
```

---

**WE-3 (Misconception-targeted — mass independence)**

> Rocket A has mass 1000 kg; Rocket B has mass 5000 kg. Both are launched from Earth's surface. (a) What escape velocity does each need? (b) How much kinetic energy does each need at launch? (c) What does this tell you about the role of mass?

Solution:
```
(a) Both need v_e = √(2GM_E/R_E) = 11 200 m/s — mass does not appear in v_e.

(b) KE_A = ½ × 1000 × (11 200)² = 6.27 × 10¹⁰ J (≈ 62.7 GJ)
    KE_B = ½ × 5000 × (11 200)² = 3.14 × 10¹¹ J (≈ 314 GJ)

(c) Both need the same speed; B needs 5× more energy because E ∝ m. Speed is mass-independent; energy is not.
```

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Derivation check**
"Derive v_e from energy conservation. Start with: KE_launch + U_launch = KE_final + U_final, and state the conditions at launch and at infinity. Show that mass cancels."

*Target:* Full derivation: ½mv² − GMm/r = 0 + 0 → v_e = √(2GM/r). Explicit mass cancellation shown.

**MP-2 [P36] — Formula comparison**
"Write v_e in terms of surface gravity g and planet radius R (do not use M or G)."

*Target:* g = GM/R² → GM = gR² → v_e = √(2gR). On Earth: v_e = √(2 × 9.8 × 6.37 × 10⁶) = √(1.25 × 10⁸) ≈ 11 180 m/s ✓.

**MP-3 [P36] — Regime identification**
"A probe is launched at 8 km/s from Earth's surface. Is it bound or unbound? What trajectory does it follow? (v_e = 11.2 km/s)"

*Target:* 8 < 11.2 km/s → E < 0 → bound → elliptical orbit (or suborbital if direction is wrong, but energetically bound).

**MP-4 [P36] — Escape from orbit**
"A satellite is in circular orbit at r = 2R_E from Earth's centre. What is its orbital speed? What speed would it need to escape from this orbit? By what factor must it increase speed?"

*Target:* v_orb = √(GM_E/(2R_E)) = √(3.13 × 10⁷) ≈ 5600 m/s; v_e = √(2GM_E/(2R_E)) = √2 × v_orb ≈ 7920 m/s; factor = √2 ≈ 1.414.

**MP-5 [P36] — Synthesis: hypothetical planet**
"A planet has mass M = 2M_Earth and radius R = 0.5R_Earth. Calculate v_e relative to Earth's v_e. A human can run at 10 m/s — can they jump-escape this planet? (v_e_Earth = 11 200 m/s)"

*Target:* v_e ∝ √(M/R) → v_e_planet/v_e_Earth = √(2M_E / 0.5R_E) / √(M_E/R_E) = √(2/0.5) = √4 = 2 → v_e_planet = 22 400 m/s. Running at 10 m/s: hopelessly bound. Even at 22 km/s, no — but a fun scale comparison.

---

## Component 7 — Session Architecture

```
[P01] Session open — rubber-sheet well provocation (marble escape speed)
  ↓
[P41] PD-1 (exact gravitational PE) + PD-2 (energy conservation)
  ↓ PASS both
[P06] Anchor: marble rolling out of well → v_e = √(2GM/r)
  ↓
TA-1: Full energy derivation; mass cancels [C]
  ↓
TA-2: Comparative v_e table; what determines escape speed [C→P]
  ↓
[P14] Predict: "A satellite in LEO needs Δv to escape. Is it more or less than v_e from the surface?"
  ↓
TA-3: Three energy regimes (E < 0, E = 0, E > 0) [C→P]
  ↓
WE-1 → WE-2 → WE-3 (escalating; WE-3 targets MC-ESCAPE-DEPENDS-ON-MASS)
  ↓
TA-4: Escape from orbit; v_e = √2 × v_orbital [P]
  ↓
TA-5: Black holes — Schwarzschild radius (conceptual bridge) [P]
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval schedule seed: "What is v_e from a planet of mass M and radius R?"
[P68] Session close
[P85] Regulation tail
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 80% MP-set; re-route if below threshold
```

**Protocol routing:**
- S0 (novice): full CPA path; use concrete rubber-sheet anchor extensively; walk through mass-cancellation algebra step by step.
- S1 (schema without grounding): knows v_e = 11.2 km/s for Earth but not where it comes from; focus on TA-1 derivation before values.
- S4 (prereq gap): PD-1 fail → gravitational-potential; PD-2 fail → conservation-of-energy.
- S6 (anxiety): [F] protocol — "One equation, one derivation: ½mv² = GMm/r → v = √(2GM/r). Everything else is applying this."
- S7 (overconfident): open with MP-5 (hypothetical planet with v_e factor calculation) — the √(M/R) ratio surprises students who confuse linear scaling.

---

## Component 8 — Adaptive Flags

- **Mass cancellation must be shown explicitly**: never skip the step where m cancels. Students who see it written out once believe it; students told it verbally often doubt it.
- **v_e is unpropelled by definition**: if a problem involves a rocket with continuous thrust, note that v_e doesn't apply directly — the problem becomes a continuous work/energy integration, not a single launch condition.
- **Black hole TA-5 caveat**: emphasise this is Newtonian analogy only. The correct black hole physics requires general relativity. The Schwarzschild radius formula is numerically correct but derives from a different physical mechanism (spacetime curvature).
- **Connection to orbital mechanics**: v_e = √2 × v_orbital (TA-4) is one of the most important ratios in spaceflight. Reinforce it with the LEO example — students heading to phys.mech.orbital-mechanics will use this ratio repeatedly.
- **Air resistance**: all derivations assume vacuum. Earth's atmospheric drag means actual launch vehicles burn far more fuel than the energy calculation suggests. Note this explicitly to avoid naive application of v_e to real rockets.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.mech.escape-velocity |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.mech.gravitational-potential ✓, phys.mech.conservation-of-energy ✓ |
| V-3 | difficulty label matches KG | PASS — advanced (5) |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 5h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-ESCAPE-REQUIRES-THRUST, MC-ESCAPE-DEPENDS-ON-MASS |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (gravitational-potential), PD-2 (conservation-of-energy) |
| V-10 | Concrete anchor present [P06] | PASS — rubber-sheet well / marble escape analogy |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P14, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with accelerated P (difficulty 5) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — mass cancellation, unpropelled definition, black hole caveat, v_e/v_orb ratio, air resistance |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
