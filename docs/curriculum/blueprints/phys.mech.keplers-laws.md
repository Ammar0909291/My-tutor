# Teaching Blueprint — phys.mech.keplers-laws

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.mech.keplers-laws
name: Kepler's Laws of Planetary Motion
domain: mechanics
difficulty:
  label: advanced
  number: 5
bloom: analyze
prerequisites:
  - phys.mech.orbital-mechanics
mastery_threshold: 0.80
estimated_hours: 6
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 5 → C with accelerated P track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-KEPLER-CIRCULAR
- **Trigger signal:** Student says "planets move in circular orbits" or draws a planet on a perfect circle, or treats the Sun as being at the centre of the orbit.
- **Conflict evidence [P28]:** "Kepler's First Law states that orbits are ellipses with the Sun at one *focus* — not the centre. Earth's orbit has eccentricity e ≈ 0.017 (nearly circular, but not exactly). Mars has e ≈ 0.093, making its ellipse noticeably elongated. Pluto: e ≈ 0.248 — a strongly elliptical orbit. The Sun is at one focus; the other focus is empty. For a circle, both foci coincide at the centre — but most orbits are measurably elliptical."
- **Bridge text [P30]:** "The circular orbit studied in phys.mech.orbital-mechanics is the special case of an ellipse with eccentricity e = 0. Kepler's First Law generalises this to e ranging from 0 (circle) to approaching 1 (highly elongated ellipse). The Sun is always at one focus, never the centre."
- **Replacement text [P31]:** "All planetary orbits are ellipses with the Sun at one focus (Kepler's 1st Law). A circle is a special ellipse (e = 0). Most planetary orbits have small e but are measurably non-circular; comet orbits can have e approaching 1."
- **Discrimination pairs [P33]:**
  - Circular orbit: Sun at centre, constant r, constant speed ✓ (valid as approximation for most planets)
  - Elliptical orbit: Sun at one focus, r varies between perihelion r_min and aphelion r_max, speed varies ✓ (physically correct)
- **s6_path:** "Textbook diagrams often draw orbits as visually circular — it saves space and is a good approximation for most planets. But physically, all orbits are ellipses. Kepler proved this from Tycho Brahe's data before Newton even wrote F = GMm/r²."

---

### MC-SPEED-CONSTANT-ELLIPSE
- **Trigger signal:** Student assumes constant orbital speed throughout an elliptical orbit, or confuses Kepler's Second Law with constant speed.
- **Conflict evidence [P28]:** "Kepler's Second Law says a planet sweeps equal areas in equal times — not equal distances in equal times. Near perihelion (closest to Sun), the planet is moving fast and sweeps a wide, short sector. Near aphelion (farthest from Sun), it moves slowly and sweeps a narrow, long sector. Both sectors have equal area — which means the speed near perihelion is greater than the speed near aphelion. For Earth: v_perihelion ≈ 30.3 km/s; v_aphelion ≈ 29.3 km/s. Small difference, but measurable."
- **Bridge text [P30]:** "Kepler's Second Law is a consequence of conservation of angular momentum. With no tangential torque from a central force, L = mrv_⊥ = constant. When r decreases (near Sun), v must increase to keep L constant. Equal areas = constant L."
- **Replacement text [P31]:** "Speed in an elliptical orbit varies: fastest at perihelion (r_min, v_max), slowest at aphelion (r_max, v_min). The rule is: r × v_⊥ = constant (angular momentum conservation), not constant speed. Kepler's 2nd Law — equal areas in equal times — is the geometric expression of this."
- **Discrimination pairs [P33]:**
  - Circular orbit: r = const → v = const ✓ (special case)
  - Elliptical orbit: r varies → v varies (faster near perihelion, slower near aphelion) ✓
- **s6_path:** "This is a subtle one. 'Equal areas' sounds like it should mean equal distances, but it doesn't. Draw two orbital sectors of equal time near perihelion and near aphelion and shade them — the areas are equal, not the arc lengths."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — T²∝r³ from orbital mechanics**
Prompt: "State Kepler's Third Law as you know it from circular orbital mechanics. What is the proportionality constant for orbits around the Sun?"
- Pass: T² = (4π²/GM_sun) × r³; proportionality constant = 4π²/(GM_sun).
- Fail → [P52]: "We derived T² ∝ r³ from circular orbit mechanics. Kepler's Third Law extends this to elliptical orbits with r replaced by semi-major axis a. Let's confirm the circular-orbit derivation is solid first." → Route to phys.mech.orbital-mechanics.

**PD-2 [P41] — Angular momentum conservation**
Prompt: "A planet moves in an orbit. The gravitational force always points toward the Sun (a central force). Does it exert a torque about the Sun? What does this mean for angular momentum?"
- Pass: Torque = r × F, but F is parallel to r → cross product = 0 → zero torque → L = constant.
- Fail → [P52]: "Conservation of angular momentum (L = constant when τ_ext = 0) is the physical reason behind Kepler's Second Law. Let's confirm the angular momentum concept before we use it." → Review from phys.mech.angular-momentum / phys.mech.conservation-of-angular-momentum.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — Tycho, Kepler, and the 20-year calculation**

> Tycho Brahe spent 20 years making the most precise naked-eye astronomical observations in history. After Tycho died, his assistant Johannes Kepler inherited the data. Kepler spent another 20 years fitting mathematical curves to the data. He tried circles, ovals, and finally ellipses — and discovered that ellipses fit perfectly. This was purely empirical (data-first): no theory, no physics, just noticing that ellipses worked. Fifty years later, Newton proved WHY they work: the inverse-square gravity law F ∝ 1/r² produces elliptical orbits mathematically. Kepler's laws are the observational foundation; Newton's gravity is the theoretical explanation.

This historical anchor establishes:
- The laws are empirical observations, not assumptions.
- They can be derived from Newton's gravity.
- The two laws lived independently for 50 years before being unified.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — The Three Laws: Statement and Geometry [C]**

**Kepler's First Law (K1):** Every planet orbits the Sun in an ellipse with the Sun at one focus.

Ellipse geometry:
```
Semi-major axis: a   (half the longest diameter)
Semi-minor axis: b   (half the shortest diameter)
Eccentricity:    e = c/a, where c = √(a² − b²)
Perihelion:      r_min = a(1 − e)   (closest to Sun)
Aphelion:        r_max = a(1 + e)   (farthest from Sun)
Sum:             r_min + r_max = 2a
```

**Kepler's Second Law (K2):** The line from the Sun to the planet sweeps equal areas in equal time intervals.

Consequence: the planet moves fastest at perihelion, slowest at aphelion.

Angular momentum form:
```
L = m × r × v_⊥ = constant
```
where v_⊥ is the component of velocity perpendicular to the radius vector.

**Kepler's Third Law (K3):** The square of the orbital period is proportional to the cube of the semi-major axis.

```
T² = (4π²/GM_sun) × a³
T² ∝ a³
```

For two bodies orbiting the same star: T₁²/T₂² = a₁³/a₂³.

**TA-2 — Kepler's Third Law: Derivation and Application [C→P]**

For circular orbits (derived in orbital-mechanics): a = r, so:
```
T² = 4π²r³/(GM)
```

For elliptical orbits (Newton proved): replace r with semi-major axis a:
```
T² = 4π²a³/(GM)
```

Earth as calibration (a = 1 AU, T = 1 year):
```
T²/a³ = 4π²/(GM_sun) = 1 (yr²/AU³)
```

So for any solar system body: T(yr)² = a(AU)³.

| Planet | a (AU) | T predicted (yr) | T actual (yr) |
|---|---|---|---|
| Mercury | 0.387 | 0.387^1.5 = 0.241 | 0.241 ✓ |
| Venus | 0.723 | 0.723^1.5 = 0.615 | 0.615 ✓ |
| Mars | 1.524 | 1.524^1.5 = 1.881 | 1.881 ✓ |
| Jupiter | 5.203 | 5.203^1.5 = 11.87 | 11.86 ✓ |

**TA-3 — Kepler's Second Law and Speed at Perihelion/Aphelion [C→P]**

At perihelion and aphelion, v is purely perpendicular to r (v_⊥ = v):

```
L = m r_min v_max = m r_max v_min = constant

v_max/v_min = r_max/r_min = (1 + e)/(1 − e)
```

Energy conservation between perihelion and aphelion:
```
½mv_max² − GMm/r_min = ½mv_min² − GMm/r_max
```

Both constraints together determine v_max and v_min given a and e.

Example — Earth (e = 0.017, a = 1.496 × 10¹¹ m):
```
r_min = a(1 − 0.017) = 1.471 × 10¹¹ m (perihelion, January)
r_max = a(1 + 0.017) = 1.521 × 10¹¹ m (aphelion, July)

v_max/v_min = 1.521/1.471 = 1.034   (3.4% faster at perihelion)
Average orbital speed ≈ 29.8 km/s → v_max ≈ 30.3 km/s, v_min ≈ 29.3 km/s
```

**TA-4 — Vis-Viva Equation [P]**

Energy conservation for an elliptical orbit (total energy = −GMm/(2a)):

```
½mv² − GMm/r = −GMm/(2a)

v² = GM(2/r − 1/a)       (vis-viva equation)
```

This gives the orbital speed at any point r along the orbit, given semi-major axis a.

Special cases:
- Circular (r = a): v² = GM/r ✓ (matches circular orbit formula)
- Perihelion (r = r_min): v = v_max
- Aphelion (r = r_max): v = v_min

**TA-5 — Kepler's Laws and Newton: Unification [P]**

Newton proved that an inverse-square central force F ∝ 1/r² produces exactly Keplerian orbits:
- F = −GMm/r² → elliptical orbits (K1)
- Central force → zero torque → constant L (K2)
- Virial theorem for ellipses → T² ∝ a³ (K3)

Conversely, K3 (T² ∝ r³ for circular orbits) implies F ∝ 1/r²:
```
T = 2πr/v, v² = Fr/m  →  T² = 4π²r²/v² = 4π²m r/F
If T² ∝ r³ then F ∝ r/r³ = 1/r²
```

This was one of Newton's routes to the inverse-square law — observational data to force law.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — T²∝a³ in AU/yr)**

> An asteroid has a semi-major axis of 2.5 AU. What is its orbital period?

Solution:
```
T² = a³   (in AU/yr units)
T² = 2.5³ = 15.625
T = √15.625 = 3.95 years
```

---

**WE-2 (Intermediate — eccentricity and perihelion/aphelion speed ratio)**

> A comet orbits the Sun with a = 5 AU and e = 0.8. Find: (a) perihelion and aphelion distances, (b) ratio of perihelion to aphelion speed.

Solution:
```
(a) r_min = a(1 − e) = 5(1 − 0.8) = 1 AU
    r_max = a(1 + e) = 5(1 + 0.8) = 9 AU

(b) v_max/v_min = r_max/r_min = 9/1 = 9

The comet moves 9× faster at perihelion than at aphelion — dramatic variation from high eccentricity.
```

---

**WE-3 (Advanced — vis-viva at an arbitrary point)**

> An asteroid is at r = 3 AU from the Sun and has orbital speed v = 20 km/s. Find its semi-major axis a. (GM_sun = 1.327 × 10²⁰ m³/s²; 1 AU = 1.496 × 10¹¹ m)

Solution:
```
vis-viva: v² = GM(2/r − 1/a)

v² = (20 000)² = 4 × 10⁸ m²/s²
r = 3 × 1.496 × 10¹¹ = 4.488 × 10¹¹ m
GM = 1.327 × 10²⁰

4 × 10⁸ = 1.327 × 10²⁰ × (2/(4.488 × 10¹¹) − 1/a)

4 × 10⁸ / 1.327 × 10²⁰ = (2/4.488 × 10¹¹) − 1/a

3.015 × 10⁻¹² = 4.456 × 10⁻¹² − 1/a

1/a = 4.456 × 10⁻¹² − 3.015 × 10⁻¹² = 1.441 × 10⁻¹²

a = 6.94 × 10¹¹ m ≈ 4.64 AU
```

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — K1 geometry**
"A planet has perihelion r_min = 0.8 AU and aphelion r_max = 1.6 AU. Find: (a) semi-major axis, (b) eccentricity, (c) where is the Sun — at the centre or at one focus?"

*Target:* a = (0.8 + 1.6)/2 = 1.2 AU; c = a − r_min = 0.4 AU; e = c/a = 0.333. Sun at one focus, not the centre.

**MP-2 [P36] — K2 angular momentum**
"At perihelion, a planet moves at 35 km/s at r = 0.8 AU from the Sun. What is its speed at aphelion (r = 1.6 AU)?"

*Target:* L = m r v (perpendicular) = constant → v_aph = v_per × r_per/r_aph = 35 × 0.8/1.6 = 17.5 km/s.

**MP-3 [P36] — K3 period**
"Planet X has a period of 8 years. What is its semi-major axis in AU?"

*Target:* T² = a³ → a³ = 64 → a = 4 AU.

**MP-4 [P36] — Vis-viva**
"A satellite is in an elliptical orbit around Earth with a = 10 000 km. What is its speed when r = 8000 km? (GM_E = 3.986 × 10¹⁴)"

*Target:* v² = GM(2/r − 1/a) = 3.986×10¹⁴ × (2/8×10⁶ − 1/10⁷) = 3.986×10¹⁴ × (2.5×10⁻⁷ − 10⁻⁷) = 3.986×10¹⁴ × 1.5×10⁻⁷ = 5.979×10⁷; v ≈ 7732 m/s.

**MP-5 [P36] — Analysis: mass from binary orbit**
"Two stars orbit their common centre of mass at total separation 4 AU with period 2 years. What is the total mass of the two-star system in units of the Sun's mass?"

*Target:* T² = 4π²a³/(G(m₁+m₂)). In AU/yr units: T² = a³/(M_total in solar masses) → M_total = a³/T² = 64/4 = 16 M_sun.

---

## Component 7 — Session Architecture

```
[P01] Session open — Tycho/Kepler/Newton historical anchor
  ↓
[P41] PD-1 (T²∝r³ from circular orbits) + PD-2 (angular momentum conservation)
  ↓ PASS both
[P06] Anchor: 40 years of data → ellipses fit exactly → why?
  ↓
TA-1: Three laws — statement, geometry, angular momentum form [C]
  ↓
[P28] Conflict: "Planets move in circular orbits" → MC-KEPLER-CIRCULAR [P28]
  ↓
TA-2: K3 derivation; AU/yr calibration; solar system table [C→P]
  ↓
[P51] Check-in MP-1 (ellipse geometry — K1)
  ↓ monitor
TA-3: K2 and speed variation; perihelion/aphelion speed ratio [C→P]
  ↓
WE-1 → WE-2 → WE-3 (escalating; WE-3 = vis-viva reverse problem)
  ↓
TA-4: Vis-viva equation; special-case recovery [P]
  ↓
TA-5: Newton's unification — K laws from inverse-square force [P]
  ↓
[P36] MP-2 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval schedule seed: "Planet at 4 AU — what is its period?"
[P68] Session close
[P85] Regulation tail
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 80% MP-set; re-route if below threshold
```

**Protocol routing:**
- S0 (novice): full CPA path; dwell on ellipse geometry with ruler-and-pins physical demo (two pins, string, draw ellipse); label all ellipse parameters before any algebra.
- S1 (schema without grounding): has memorised "T² = a³" but doesn't connect it to Newton; focus on TA-5 unification and MP-5 binary mass calculation.
- S4 (prereq gap): PD-1 fail → orbital-mechanics; PD-2 fail → review angular momentum conservation.
- S6 (anxiety): [F] protocol — "Three laws, three equations: ellipse, area, T²=a³. We take them one at a time."
- S7 (overconfident): open with WE-3 (reverse vis-viva — find a from r and v); students who only know the forward direction struggle with algebraic inversion.

---

## Component 8 — Adaptive Flags

- **Ellipse geometry before K1**: students who have never seen ellipse terminology (focus, semi-major axis, eccentricity) need a brief geometry primer before K1 makes sense. The ruler-and-pins demo is concrete and takes 5 minutes.
- **AU/yr calibration**: the T² = a³ shorthand (in AU/yr) is powerful but hide the GM_sun factor. Always write the full T² = 4π²a³/(GM) first, then substitute Earth's calibration to get the shorthand. Otherwise students misapply to non-solar orbits.
- **Vis-viva vs. separate KE/PE**: the vis-viva equation is derived from energy conservation. Make this derivation explicit (TA-4) so students see it as a consequence, not a new formula to memorise.
- **K2 at non-perihelion/aphelion points**: the speed ratio formula v_max/v_min = r_max/r_min applies only at perihelion and aphelion (where v ⊥ r). At arbitrary points, use L = mrv_⊥ or vis-viva with energy conservation. Flag this explicitly.
- **Bloom level — analyze**: this blueprint operates at the analyze level (bloom 5). The mastery probes (especially MP-5 binary mass) require students to decompose multi-law problems and identify which law applies where — not just substitute into formulas.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.mech.keplers-laws |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.mech.orbital-mechanics ✓ |
| V-3 | difficulty label matches KG | PASS — advanced (5) |
| V-4 | bloom level matches KG | PASS — analyze |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 6h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-KEPLER-CIRCULAR, MC-SPEED-CONSTANT-ELLIPSE |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (orbital-mechanics), PD-2 (angular momentum) |
| V-10 | Concrete anchor present [P06] | PASS — Tycho/Kepler/Newton historical narrative |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with accelerated P (difficulty 5) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — ellipse geometry primer, AU/yr caveat, vis-viva derivation, K2 at non-extreme points, bloom-analyze |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
