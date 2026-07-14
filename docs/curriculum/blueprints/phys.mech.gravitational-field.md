# Teaching Blueprint — phys.mech.gravitational-field

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.mech.gravitational-field
name: Gravitational Field and Field Lines
domain: mechanics
difficulty:
  label: proficient
  number: 4
bloom: understand
prerequisites:
  - phys.mech.universal-gravitation
mastery_threshold: 0.80
estimated_hours: 4
cross_links:
  - phys.elec.electric-field
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-FIELD-IS-FORCE
- **Trigger signal:** Student says "the gravitational field at a point is the gravitational force" or writes g = F (without ÷m).
- **Conflict evidence [P28]:** "If the field equals the force, then the field near Earth would be 500 N for a 50 kg person and 1000 N for a 100 kg person — two different fields at the same point. But we measure g = 9.8 m/s² at the surface regardless of mass. The field must be force per unit mass, not force."
- **Bridge text [P30]:** "A field is a property of space at a location, independent of whatever test mass you place there. We define g = F/m precisely to strip out the mass and get a quantity that describes the space, not the probe."
- **Replacement text [P31]:** "Gravitational field strength g at a point = gravitational force per unit kilogram placed at that point: g = F/m (N/kg). It equals GM/r² and is the same value regardless of which mass you put there."
- **Discrimination pairs [P33]:**
  - g = 9.8 m/s² at Earth's surface (field) vs. F = 490 N on a 50 kg mass (force at that field)
  - g = 1.6 m/s² on the Moon (field) vs. F = 80 N on a 50 kg mass on the Moon (force)
- **s6_path:** "No worries — the word 'field' is used loosely in everyday language. In physics it has a precise definition: field = force ÷ mass, so it describes the space, not the object in it."

---

### MC-FIELD-STOPS-AT-SURFACE
- **Trigger signal:** Student draws field lines ending at Earth's surface, or states "g = 9.8 m/s² only at ground level."
- **Conflict evidence [P28]:** "Field lines represent the field in all of space, not just at the surface. At altitude h = 400 km (ISS), r = R_E + 400 km ≈ 6770 km; g = GM/(6770 × 10³)² ≈ 8.67 m/s² — still 88% of surface value. The field extends through all space, diminishing as 1/r²."
- **Bridge text [P30]:** "The inverse-square law g = GM/r² applies for all r > R_Earth. Inside Earth (r < R_Earth) the field also exists but follows a different law (g ∝ r for uniform density). Field lines fill all space; they simply get more spread out (weaker) with distance."
- **Replacement text [P31]:** "g = GM/r² applies from r = R_Earth outward without limit. Field lines extend to infinity, becoming more spread out as r increases — which is why the field weakens as 1/r²."
- **Discrimination pairs [P33]:**
  - Field at surface: g = 9.8 m/s² (r = R_E)
  - Field at 2R_E from centre: g = 9.8/4 = 2.45 m/s²
  - Field at 3R_E from centre: g = 9.8/9 ≈ 1.09 m/s²
- **s6_path:** "A lot of diagrams in textbooks only show field lines near Earth, which makes it look like they stop at the surface. They don't — it's just a drawing limitation."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Universal Gravitation Law**
Prompt: "Write the equation for the gravitational force between two masses m₁ and m₂ separated by distance r. What does each symbol mean?"
- Pass: F = Gm₁m₂/r²; names G, m₁, m₂, r correctly.
- Fail → [P52]: "Before we define the gravitational field, we need the force law. Let's revisit: F = Gm₁m₂/r². Which mass causes the field, and which is the test mass?" → Route to phys.mech.universal-gravitation.

**PD-2 [P41] — Force–Mass Relationship**
Prompt: "If a 10 kg object experiences 98 N of gravitational force and a 20 kg object experiences 196 N of gravitational force at the same location, what is the force per kg? Is this quantity the same for both objects?"
- Pass: 9.8 N/kg for both; recognises the ratio is constant.
- Fail → [P52]: "Dividing force by mass gives us a quantity that doesn't depend on which object we use — that's the key idea behind 'field'."

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — the invisible hand**

> A metal ball hangs from a string. You cut the string. Before it hits the ground, where is the force? Is there anything between Earth and the ball? Can a force act through empty space?

Students initially say "but there's nothing there." The field concept answers this: Earth creates a modification of space at every point — the gravitational field — and any mass placed in that field experiences a force proportional to its own mass. The field is the "invisible hand."

Extend: bring a compass to class. The needle aligns with Earth's magnetic field — another invisible-hand example. Both fields exist independently of whether anything is placed in them.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Defining the Gravitational Field [C]**

The gravitational field **g** at a point is defined as the gravitational force **F** per unit mass experienced by a small test mass m₀ placed at that point:

```
g = F / m₀        (vector equation)
|g| = F / m₀      (scalar magnitude)
Units: N/kg ≡ m/s²
```

Key constraints on the definition:
- m₀ must be small enough not to disturb the source mass (test-mass condition).
- g describes the *space*, not the test mass — removing the test mass does not remove the field.
- g is a vector: it points from the test mass toward the source mass (toward Earth's centre below you).

**TA-2 — Field Strength from Newton's Law [C→P]**

Combining g = F/m₀ with F = GM_source × m₀ / r²:

```
g = GM / r²
```

where M is the mass of the source body and r is the distance from the centre of the source.

Verification table — Earth:

| Location | r (km) | g (m/s²) |
|---|---|---|
| Surface | 6 371 | 9.81 |
| Altitude 400 km (ISS) | 6 771 | 8.67 |
| Altitude 35 786 km (GEO) | 42 157 | 0.224 |
| Moon's orbit (~384 000 km) | 390 371 | 0.0027 |

The Moon's orbit check: g = (6.674 × 10⁻¹¹ × 5.97 × 10²⁴) / (3.84 × 10⁸)² ≈ 0.0027 m/s² — exactly the centripetal acceleration needed to keep the Moon in orbit (Newton's original test of the inverse-square law).

**TA-3 — Field Lines and Their Rules [C→P]**

Field lines are a visualisation tool (not physical objects):

Rules for gravitational field lines:
1. Direction: arrows point toward the source mass (gravity is always attractive).
2. Density: where lines are closer together, the field is stronger.
3. Lines never cross (the field has a unique direction at every point).
4. Lines originate "at infinity" and terminate on the source mass.
5. Outside a spherically symmetric body, field lines are identical to those of a point mass at the centre (Shell Theorem consequence).

Drawing exercise: sketch field lines for (a) an isolated sphere, (b) two equal masses side by side. Note the neutral point between two equal masses where field vectors cancel.

**TA-4 — Superposition of Fields [P]**

Fields from multiple masses add as vectors (superposition principle):

```
g_total = g₁ + g₂ + g₃ + ...   (vector sum)
```

Example — neutral point between Earth (M_E) and Moon (M_M):
At distance d from Earth, distance (D − d) from Moon:

```
GM_E / d² = GM_M / (D − d)²
```

Solving: d = D / (1 + √(M_M / M_E)). With M_E/M_M ≈ 81.3 and D ≈ 3.84 × 10⁸ m:
d ≈ 3.46 × 10⁸ m from Earth (about 90% of the way to the Moon).

**TA-5 — Field Inside vs. Outside a Sphere [P]**

Shell theorem (results, not derivation):
- Outside (r ≥ R): g = GM/r² (same as point mass at centre).
- Inside (r < R, uniform density): g = GM_enclosed / r² = (4/3)πGρr → g ∝ r (field *decreases* linearly to zero at centre).

Graph: g vs. r — rises linearly from 0 at centre to maximum at surface, then falls as 1/r² outside.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — direct application)**

> Calculate the gravitational field strength 600 km above Earth's surface. (M_E = 5.97 × 10²⁴ kg, R_E = 6.37 × 10⁶ m, G = 6.674 × 10⁻¹¹ N·m²/kg²)

Solution:
```
r = R_E + 600 × 10³ = 6.37 × 10⁶ + 0.60 × 10⁶ = 6.97 × 10⁶ m

g = GM_E / r²
  = (6.674 × 10⁻¹¹ × 5.97 × 10²⁴) / (6.97 × 10⁶)²
  = (3.984 × 10¹⁴) / (4.857 × 10¹³)
  = 8.20 m/s²
```

This is 84% of surface g — not dramatically different for LEO satellites.

---

**WE-2 (Misconception-targeted — force vs. field)**

> At a point P, the gravitational field is 3.6 N/kg. (a) What force does a 5 kg mass experience at P? (b) What force does a 12 kg mass experience at P? (c) What is the gravitational field at P after both masses are removed?

Solution:
```
(a) F = mg = 5 × 3.6 = 18 N
(b) F = mg = 12 × 3.6 = 43.2 N
(c) g = 3.6 N/kg (field is a property of space, not of the test mass — unchanged)
```

Key takeaway: the field does not disappear when you remove the test mass.

---

**WE-3 (Multi-body superposition)**

> Earth (M_E = 5.97 × 10²⁴ kg) and a 1000 kg spacecraft are 1.5 × 10⁷ m apart. A 2 kg test mass is placed at the midpoint. Calculate the net gravitational field at the midpoint. (Is it reasonable to treat the spacecraft as a field source? What does this say about the test-mass condition?)

Solution:
```
From Earth (r = 7.5 × 10⁶ m):
g_E = GM_E / r² = (6.674 × 10⁻¹¹ × 5.97 × 10²⁴) / (7.5 × 10⁶)²
    = 3.984 × 10¹⁴ / 5.625 × 10¹³ = 7.08 m/s²  (toward Earth)

From spacecraft (r = 7.5 × 10⁶ m):
g_SC = GM_SC / r² = (6.674 × 10⁻¹¹ × 1000) / (7.5 × 10⁶)²
     = 6.674 × 10⁻⁸ / 5.625 × 10¹³ = 1.19 × 10⁻²¹ m/s²  (toward spacecraft)

g_net ≈ 7.08 m/s² toward Earth (spacecraft contribution negligible — 10⁻²¹ vs 10⁰)
```

Insight: the "test-mass condition" is satisfied when the test mass is so much smaller than the source that its own field is negligible. A 1000 kg spacecraft is NOT a negligible field source near a 2 kg probe (g_SC/m = Gm/r² which itself is minuscule compared to Earth), but relative to Earth's field, the spacecraft is irrelevant.

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Conceptual (field vs. force)**
"A 3 kg mass placed at point X experiences a gravitational force of 24 N. What is the gravitational field at X? If a 6 kg mass were placed at X instead, what force would it experience? What is the field at X now?"

*Target:* g = 8 N/kg; F = 48 N; g still = 8 N/kg.

**MP-2 [P36] — Calculation (altitude)**
"At what altitude above Earth's surface is the gravitational field exactly one-quarter of its surface value? Express your answer as a multiple of R_E."

*Target:* g ∝ 1/r² → quarter value when r = 2R_E → altitude = R_E ≈ 6370 km.

**MP-3 [P36] — Field lines (conceptual)**
"Between two equal point masses separated by 1 m, describe what happens to the gravitational field at the exact midpoint. At a point slightly to one side of the midpoint — is the field zero? Draw the field line pattern."

*Target:* Field = 0 at exact midpoint (symmetric cancellation). Any offset → net field toward nearer mass. Field lines curve; neutral point is unstable equilibrium.

**MP-4 [P36] — Shell theorem application**
"A uniform hollow spherical shell of mass M and radius R. What is the gravitational field at: (a) r = 2R from the centre? (b) r = 0.5R from the centre (inside the shell)?"

*Target:* (a) g = GM/(2R)² = GM/4R² (acts as point mass at centre). (b) g = 0 (Shell Theorem: field inside a uniform shell is zero).

**MP-5 [P36] — Synthesis (field → force → motion)**
"A satellite of mass m orbits Earth at radius r. Express its orbital speed v in terms of g(r) (the field at radius r) and r. You may not use G or M_E explicitly."

*Target:* Centripetal force = gravitational force: mv²/r = mg(r) → v = √(g(r) × r). This shows orbital speed is determined entirely by the field at that radius.

---

## Component 7 — Session Architecture

```
[P01] Session open — "invisible hand" provocation
  ↓
[P41] PD-1 + PD-2 (universal gravitation + force/mass ratio)
  ↓ PASS both
[P06] Anchor: cut string → force in empty space → field concept
  ↓
TA-1: Define g = F/m₀ [C]
  ↓
TA-2: Derive g = GM/r²; verification table [C→P]
  ↓
TA-3: Field line rules + drawing exercise [C→P]
  ↓
[P51] Check-in MP-1 (field vs. force discrimination)
  ↓ monitor
TA-4: Superposition; neutral point calculation [P]
  ↓
TA-5: Shell theorem; inside vs. outside graph [P]
  ↓
WE-1 → WE-2 → WE-3 (escalating complexity)
  ↓
[P36] MP-2 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval schedule seed: "At altitude 3R_E, g = ?"
[P68] Session close
[P85] Regulation tail
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 80% MP-set; re-route if below threshold
```

**Protocol routing:**
- S0 (novice): full CPA path, extend anchor with compass analogy, add second drawing exercise before TA-4.
- S1 (schema without grounding): skip anchor, start TA-1, verify PD-2 rigorously.
- S4 (prereq gap on universal-gravitation): route to phys.mech.universal-gravitation before session.
- S6 (anxiety): [F] protocol — name the concept clearly ("g is just F divided by mass"), reassure with worked table in TA-2.
- S7 (overconfident): open with MP-4 Shell Theorem question — the inside-shell zero-field result surprises most overconfident students.

---

## Component 8 — Adaptive Flags

- **Multi-body superposition** (TA-4, WE-3): scaffold with component decomposition before vector sum; confirm signs (toward vs. away).
- **Shell theorem** (TA-5): result-only delivery at this level; proof via integration is a university topic. State the result clearly, verify with the inside-shell MP-4 probe.
- **Electric field parallel** (cross_link: phys.elec.electric-field): if student has covered electric fields, use E = F/q analogy explicitly. The structural parallel accelerates understanding.
- **Unit equivalence** (N/kg ≡ m/s²): mention explicitly; students who have seen kinematics will recognise m/s² as acceleration units, which reinforces the connection g = a_freefall.
- **WE-3 computational note**: the spacecraft calculation produces g_SC ≈ 10⁻²¹ m/s² — emphasise that this is 21 orders of magnitude smaller than Earth's field, making it physically meaningless. This viscerally demonstrates the test-mass condition.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.mech.gravitational-field |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.mech.universal-gravitation ✓ |
| V-3 | difficulty label matches KG | PASS — proficient (4) |
| V-4 | bloom level matches KG | PASS — understand |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 4h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-FIELD-IS-FORCE, MC-FIELD-STOPS-AT-SURFACE |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (universal-gravitation), PD-2 (F/m concept) |
| V-10 | Concrete anchor present [P06] | PASS — invisible hand / cut string |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with accelerated P (difficulty 4) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — superposition, shell theorem, unit equivalence, electric-field parallel |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
