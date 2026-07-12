# Teaching Blueprint — phys.mech.orbital-mechanics

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.mech.orbital-mechanics
name: Circular Orbital Mechanics
domain: mechanics
difficulty:
  label: advanced
  number: 5
bloom: apply
prerequisites:
  - phys.mech.gravitational-potential
  - phys.mech.circular-motion
mastery_threshold: 0.80
estimated_hours: 6
cross_links:
  - phys.mech.keplers-laws
  - phys.mech.satellites
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 5 → C with accelerated P track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-HIGHER-ORBIT-FASTER
- **Trigger signal:** Student says "a satellite in a higher orbit moves faster because it has more energy" or confuses total energy with speed.
- **Conflict evidence [P28]:** "Let's compare two satellites: A at r = R_E (low orbit) and B at r = 4R_E. Orbital speed: v = √(GM/r). For A: v_A = √(GM/R_E). For B: v_B = √(GM/4R_E) = ½v_A. Satellite B is in a higher orbit AND moves at half the speed. It has more total energy (less negative), but that doesn't mean faster — kinetic energy KE = GMm/(2r) actually decreases with altitude."
- **Bridge text [P30]:** "Energy and speed are different quantities. A higher orbit has more total mechanical energy (less negative) but also more PE and less KE. The net effect is that orbital speed decreases with altitude — v ∝ 1/√r."
- **Replacement text [P31]:** "Orbital speed v = √(GM/r) — as r increases, v decreases. Higher orbit → slower satellite. Total energy E = −GMm/(2r) → as r increases, E increases (becomes less negative). These are consistent: climbing the gravity well costs energy but reduces the speed needed to maintain a circular orbit."
- **Discrimination pairs [P33]:**
  - ISS at ~400 km altitude: v ≈ 7670 m/s, T ≈ 92 min
  - GEO at 35 786 km altitude: v ≈ 3070 m/s, T = 24 h (much slower!)
- **s6_path:** "This is counter-intuitive — and every student trips on it. The key: orbital speed is set by gravity at that radius, not by the satellite's total energy. Gravity is weaker higher up, so less centripetal force is needed, so less speed is needed."

---

### MC-ORBITAL-SPEED-DEPENDS-ON-MASS
- **Trigger signal:** Student includes the satellite mass m in the orbital speed formula or claims a heavier satellite needs more speed to stay in orbit.
- **Conflict evidence [P28]:** "From the orbital condition: GMm/r² = mv²/r. The satellite mass m appears on both sides and cancels: v² = GM/r. This is exactly analogous to free-fall acceleration (g = GM/r², mass independent) — orbital speed is the gravitational free-fall speed for a circular trajectory. A 1 kg probe and a 10 000 kg space station orbit at the same speed at the same radius."
- **Bridge text [P30]:** "In free-fall, all objects fall at the same rate regardless of mass (Galileo). Circular orbit is simply continuous free-fall — the object falls toward Earth but keeps missing because of its horizontal speed. So naturally, mass doesn't matter for orbital speed either."
- **Replacement text [P31]:** "v = √(GM_planet/r) — only the planet's mass M and the orbital radius r determine orbital speed. The satellite's mass m determines the orbital energy (E = −GMm/2r) but not the speed."
- **Discrimination pairs [P33]:**
  - 10 kg CubeSat at r = 7000 km: v = √(GM_E/7 × 10⁶) ≈ 7540 m/s
  - 420 000 kg ISS at r = 7000 km: v ≈ 7540 m/s (same!)
- **s6_path:** "Mass cancelling in orbital mechanics is one of those beautiful physics results. Write the balance equation and watch m disappear — it's the same trick as in free-fall and escape velocity."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Centripetal force balance**
Prompt: "A satellite moves in a circle at speed v at radius r. What is the centripetal force required? Which real force provides it?"
- Pass: F_c = mv²/r; gravity provides it (F_g = GMm/r²).
- Fail → [P52]: "Orbital mechanics rests on equating gravity to the centripetal requirement. Let's review circular motion first: F_net inward = mv²/r." → Route to phys.mech.circular-motion.

**PD-2 [P41] — Orbital total energy**
Prompt: "Write the total mechanical energy of a satellite of mass m at radius r. Is it positive or negative for a bound orbit?"
- Pass: E = ½mv² + U = KE − GMm/r; E < 0 for bound orbit.
- Fail → [P52]: "Total energy = KE + PE with PE = −GMm/r. Let's confirm this is clear before combining it with the orbital condition." → Route to phys.mech.gravitational-potential.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — Newton's cannonball**

> Isaac Newton imagined firing a cannonball horizontally from a very tall mountain. Fire it slowly — it lands nearby. Fire it faster — it lands further. Fire it at exactly the right speed — it falls but the Earth's surface curves away at the same rate, so the cannonball never lands. It's in orbit.

Key insight: an orbit is continuous free-fall in which the object keeps missing the Earth because of its horizontal speed. The "right speed" is orbital velocity — determined entirely by balancing the gravitational pull with the centripetal requirement.

Extend: the ISS is falling at 8.7 m every second. But in that same second, Earth's surface curves away by 8.7 m. So it stays at constant altitude. This is what it means to orbit.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Deriving Orbital Speed and Period [C]**

Force balance for circular orbit (inward = centripetal):
```
GMm/r² = mv²/r

v² = GM/r

v = √(GM/r)       (orbital speed — mass of satellite cancels)
```

Period T = circumference / speed:
```
T = 2πr/v = 2πr/√(GM/r) = 2π√(r³/GM)

T² = (4π²/GM) × r³     (Kepler's Third Law for circular orbits!)
```

Key numerical values for Earth (GM_E = 3.986 × 10¹⁴ m³/s²):

| Orbit | r (km) | v (m/s) | T |
|---|---|---|---|
| LEO (~400 km) | 6 771 | 7 672 | 92 min |
| GEO | 42 157 | 3 070 | 24 h |
| Moon | 384 000 | 1 022 | 27.3 days |

**TA-2 — Total Orbital Energy and the Virial Theorem [C→P]**

From v² = GM/r, substitute into KE:
```
KE = ½mv² = GMm/(2r)
U = −GMm/r
E = KE + U = GMm/(2r) − GMm/r = −GMm/(2r)
```

Virial theorem relationships:
```
KE = −½U = GMm/(2r)      (KE is positive, half the magnitude of U)
E = −KE = ½U              (total energy is negative)
|E| = ½ |U|
```

Consequence: boosting to a higher orbit increases r → decreases KE (satellite slows down) → but E increases (becomes less negative). **Paradox**: adding energy causes the satellite to slow down. This is the key counter-intuitive result of orbital mechanics.

**TA-3 — Orbital Manoeuvres: Hohmann Transfer [C→P]**

To move from circular orbit r₁ to circular orbit r₂ > r₁ efficiently (minimum Δv):

1. **Burn 1** at r₁: increase speed to enter elliptical transfer orbit. Periapsis at r₁, apoapsis at r₂.
2. Coast along the ellipse.
3. **Burn 2** at r₂: increase speed again to circularise at r₂.

Transfer orbit semi-major axis: a = (r₁ + r₂)/2

Transfer speeds (using vis-viva equation v² = GM(2/r − 1/a)):
```
v_transfer at r₁ = √(GM × (2/r₁ − 2/(r₁+r₂)))
v_transfer at r₂ = √(GM × (2/r₂ − 2/(r₁+r₂)))
```

Qualitative result: both burns accelerate the satellite. After the second burn, the satellite is at r₂ but moving slower than it was at r₁. This is the essence of the orbital paradox: adding energy reduces speed.

**TA-4 — Geostationary Orbit Derivation [P]**

A geostationary satellite has T = 24 hours = 86 400 s and must orbit above the equator. Find r:

```
T² = 4π²r³/(GM_E)

r³ = GM_E T² / (4π²)
   = 3.986 × 10¹⁴ × (86 400)² / (4π²)
   = 3.986 × 10¹⁴ × 7.465 × 10⁹ / 39.48
   = 7.534 × 10²²

r = (7.534 × 10²²)^(1/3) = 4.216 × 10⁷ m ≈ 42 157 km from Earth's centre

Altitude above surface = 42 157 − 6 371 = 35 786 km ≈ 35 800 km
```

Orbital speed: v = √(GM/r) = √(3.986 × 10¹⁴ / 4.216 × 10⁷) ≈ 3070 m/s ≈ 3.1 km/s.

**TA-5 — Binary Star Systems and Reduced Mass [P]**

When two masses m₁ and m₂ orbit their common centre of mass (neither is fixed):

Both orbit with the same angular velocity ω and period T. The orbital radii satisfy:
```
m₁r₁ = m₂r₂   (centre of mass condition)
r₁ + r₂ = d   (total separation)
```

Period formula (using reduced mass):
```
T² = 4π²d³ / (G(m₁ + m₂))
```

This is the generalised form of Kepler's Third Law — the sum of masses replaces M.

Application: if two stars of equal mass orbit each other at separation d = 2 AU, T = √(d³/(m₁+m₂)) in appropriate units. Measuring T and d observationally gives the total mass.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — orbital speed and period)**

> A satellite orbits Earth at altitude 500 km. Find: (a) orbital speed, (b) orbital period. (R_E = 6.37 × 10⁶ m, GM_E = 3.986 × 10¹⁴ m³/s²)

Solution:
```
r = 6.37 × 10⁶ + 500 × 10³ = 6.87 × 10⁶ m

(a) v = √(GM/r) = √(3.986 × 10¹⁴ / 6.87 × 10⁶)
       = √(5.802 × 10⁷) = 7617 m/s ≈ 7.62 km/s

(b) T = 2πr/v = 2π × 6.87 × 10⁶ / 7617
       = 5672 s ≈ 94.5 min
```

---

**WE-2 (Intermediate — total energy and virial theorem)**

> Calculate the total mechanical energy of a 1000 kg satellite in a 500 km orbit. How much energy must be added to move it to a 1000 km orbit?

Solution:
```
r₁ = 6.87 × 10⁶ m; r₂ = 6.37 × 10⁶ + 10⁶ = 7.37 × 10⁶ m

E₁ = −GMm/(2r₁) = −3.986 × 10¹⁴ × 1000 / (2 × 6.87 × 10⁶)
   = −3.986 × 10¹⁷ / 1.374 × 10⁷ = −2.901 × 10¹⁰ J

E₂ = −GMm/(2r₂) = −3.986 × 10¹⁴ × 1000 / (2 × 7.37 × 10⁶)
   = −3.986 × 10¹⁷ / 1.474 × 10⁷ = −2.704 × 10¹⁰ J

ΔE = E₂ − E₁ = (−2.704 + 2.901) × 10¹⁰ = +1.97 × 10⁹ J ≈ 2.0 GJ
```

Note: the satellite slows from 7617 m/s to v₂ = √(GM/r₂) ≈ 7349 m/s after the boost — it added energy but slowed down.

---

**WE-3 (Advanced — GEO verification + period ratio)**

> Verify that a geostationary satellite at r = 42 157 km has a period of exactly 24 hours. Then use the T²∝r³ relationship to find the orbital period at r = 2 × 42 157 km.

Solution:
```
T = 2π√(r³/GM) = 2π√((4.2157 × 10⁷)³ / 3.986 × 10¹⁴)
  = 2π√(7.497 × 10²² / 3.986 × 10¹⁴)
  = 2π√(1.880 × 10⁸)
  = 2π × 13711 = 86 160 s ≈ 23.93 h ✓ (≈ 24 h)

For r₂ = 2r_GEO:
T₂/T₁ = (r₂/r₁)^(3/2) = 2^(3/2) = 2√2 ≈ 2.828
T₂ = 24 × 2.828 ≈ 67.9 h ≈ 2.83 days
```

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Orbital speed comparison**
"Satellite A orbits at r = R_E, satellite B at r = 4R_E. What is the ratio v_A / v_B? What is the ratio T_A / T_B?"

*Target:* v ∝ 1/√r → v_A/v_B = √(4R_E/R_E) = 2. T ∝ r^(3/2) → T_A/T_B = (R_E/4R_E)^(3/2) = (1/4)^(3/2) = 1/8. So B's period is 8× longer.

**MP-2 [P36] — Total energy**
"A 500 kg satellite orbits at r = 8 × 10⁶ m. Find its (a) KE, (b) PE, (c) total energy. Verify E = ½U."

*Target:* KE = GMm/(2r) = 3.986×10¹⁴×500/(2×8×10⁶) = 1.244×10¹⁰ J; U = −GMm/r = −2.488×10¹⁰ J; E = KE + U = −1.244×10¹⁰ J. Verify: E = ½U = ½(−2.488×10¹⁰) = −1.244×10¹⁰ J ✓.

**MP-3 [P36] — Period from T²∝r³**
"Mars's moon Phobos orbits at r = 9376 km with T = 7.65 h. Use T²∝r³ to find the orbital radius of Deimos given T_Deimos = 30.3 h."

*Target:* r_D³/r_P³ = T_D²/T_P² = (30.3/7.65)² = 15.65; r_D = 9376 × (15.65)^(1/3) = 9376 × 2.50 ≈ 23 440 km.

**MP-4 [P36] — Paradox question**
"A satellite fires a rocket booster in the direction of motion, increasing its speed by 200 m/s. After several orbits, is the satellite faster or slower than before the burn? Explain."

*Target:* The burn raises the orbit (more PE, higher r). The satellite settles into a new circular orbit at higher r where v = √(GM/r) is slower. Final speed < initial speed — counterintuitive but correct. Energy was added; speed decreased.

**MP-5 [P36] — Synthesis: mass of Earth from Moon's orbit**
"The Moon orbits Earth at r = 3.84 × 10⁸ m with period T = 27.3 days. Calculate the mass of Earth."

*Target:* T² = 4π²r³/(GM_E) → M_E = 4π²r³/(GT²) = 4π² × (3.84×10⁸)³ / (6.674×10⁻¹¹ × (27.3×86400)²) = 4π² × 5.664×10²⁵ / (6.674×10⁻¹¹ × 5.568×10¹²) = 2.235×10²⁷ / 3.715×10² ≈ 6.02×10²⁴ kg ✓.

---

## Component 7 — Session Architecture

```
[P01] Session open — Newton's cannonball provocation
  ↓
[P41] PD-1 (centripetal force) + PD-2 (orbital total energy)
  ↓ PASS both
[P06] Anchor: cannonball → continuous free-fall → ISS falls 8.7 m/s
  ↓
TA-1: Derive v = √(GM/r) and T² ∝ r³ [C]
  ↓
TA-2: Virial theorem; KE, U, E relationships; orbital paradox [C→P]
  ↓
[P28] Conflict: "A higher orbit has more energy — so it must move faster?" → MC-HIGHER-ORBIT-FASTER
  ↓
WE-1: Orbital speed and period (500 km orbit)
  ↓
[P51] Check-in MP-1 (speed ratio and period ratio — ratio method)
  ↓ monitor
TA-3: Hohmann transfer — qualitative two-burn logic [C→P]
  ↓
TA-4: GEO derivation — full numerical calculation [P]
  ↓
WE-2 → WE-3 (total energy; GEO period verification)
  ↓
TA-5: Binary stars; generalised Kepler III [P]
  ↓
[P36] MP-2 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval schedule seed: "How does orbital speed change as altitude increases?"
[P68] Session close
[P85] Regulation tail
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 80% MP-set; re-route if below threshold
```

**Protocol routing:**
- S0 (novice): full CPA path; dwell on Newton's cannonball anchor; draw the v vs. r and T vs. r curves explicitly before algebra.
- S1 (schema without grounding): knows T² ∝ r³ as a formula but not where it comes from; go deep on TA-1 derivation from first principles before any numerical work.
- S4 (prereq gap): PD-1 fail → circular-motion; PD-2 fail → gravitational-potential.
- S6 (anxiety): [F] protocol — "Orbital mechanics is just two equations: v = √(GM/r) and T = 2πr/v. Everything else is algebra from these two."
- S7 (overconfident): open with MP-4 (the orbital paradox — burn forward → slow down) — almost all overconfident students get this wrong on first attempt.

---

## Component 8 — Adaptive Flags

- **The orbital paradox** (TA-2, MP-4): this is the hardest conceptual result in circular orbital mechanics. Spend explicit time on it — draw the E = KE + U bar diagram before and after the burn. The result (add energy → slow down) is pedagogically important for space mission design intuition.
- **Hohmann transfer** (TA-3): keep at qualitative level here. Detailed Δv calculations using the vis-viva equation belong in an advanced extension. The key pedagogical payoff is that both burns are prograde (forward) — students initially expect one prograde and one retrograde.
- **T² ∝ r³ as Kepler's Third Law**: make this connection explicit — TA-1's derivation is the proof of Kepler's Third Law (for circular orbits). The full elliptical proof is covered in phys.mech.keplers-laws.
- **Binary stars** (TA-5): this is the only topic in this blueprint not about Earth satellites. Alert students to the context switch: M in T² = 4π²r³/GM becomes (m₁ + m₂), not just the planet mass.
- **GM_E product**: always give students GM_E = 3.986 × 10¹⁴ m³/s² as a single constant rather than G × M_E separately — it avoids 10⁻¹¹ × 10²⁴ rounding errors that dominate student calculation mistakes.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.mech.orbital-mechanics |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.mech.gravitational-potential ✓, phys.mech.circular-motion ✓ |
| V-3 | difficulty label matches KG | PASS — advanced (5) |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 6h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-HIGHER-ORBIT-FASTER, MC-ORBITAL-SPEED-DEPENDS-ON-MASS |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (circular-motion), PD-2 (gravitational-potential) |
| V-10 | Concrete anchor present [P06] | PASS — Newton's cannonball / ISS free-fall |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with accelerated P (difficulty 5) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — orbital paradox, Hohmann qualitative, Kepler III connection, binary star context, GM_E product |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
