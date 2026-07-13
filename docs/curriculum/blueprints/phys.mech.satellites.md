# Teaching Blueprint — phys.mech.satellites

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.mech.satellites
name: Artificial Satellites and Geostationary Orbits
domain: mechanics
difficulty:
  label: advanced
  number: 5
bloom: apply
prerequisites:
  - phys.mech.orbital-mechanics
mastery_threshold: 0.80
estimated_hours: 5
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 5 → C with accelerated P track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-GEO-ANYWHERE
- **Trigger signal:** Student says "a geostationary satellite can be placed at any altitude as long as it moves at the right speed" or draws geostationary orbits at various heights.
- **Conflict evidence [P28]:** "A geostationary orbit has two requirements: (1) T = 24 hours exactly, and (2) the orbit must be above the equator in the equatorial plane. The period condition fixes the radius uniquely — from T² = 4π²r³/(GM_E), with T = 86 400 s, there is exactly one solution: r ≈ 42 157 km from Earth's centre (altitude ≈ 35 786 km). You cannot choose a different altitude and compensate with a different speed — the period is determined by the altitude through orbital mechanics. A satellite at a lower altitude has a shorter period (not 24 h) and a higher altitude has a longer period."
- **Bridge text [P30]:** "The geostationary altitude is not a design choice — it's a physical consequence of T = 24 h combined with T² ∝ r³. There is exactly one radius where the orbital period matches Earth's rotation period. All geostationary satellites share this altitude and must orbit in the equatorial plane."
- **Replacement text [P31]:** "r_GEO = (GM_E T²/4π²)^(1/3) ≈ 42 157 km. There is exactly one geostationary orbit (a specific shell above the equator). Multiple satellites occupy different longitudes along this ring, but all at the same altitude."
- **Discrimination pairs [P33]:**
  - Satellite at r = 42 157 km, equatorial orbit: geostationary ✓ (appears fixed in sky)
  - Satellite at r = 20 000 km (GPS altitude): T ≈ 12 h → moves across sky, not geostationary ✓
- **s6_path:** "The geostationary orbit is often described as 'fixed in the sky' — which makes it sound like you can park anything there. The physics constrains it to one specific altitude, like a lane on a circular track. Everything in that lane goes at the same speed and completes one lap in 24 hours."

---

### MC-WEIGHTLESS-NO-GRAVITY
- **Trigger signal:** Student says "astronauts are weightless because there is no gravity in orbit" or "gravity is zero in space."
- **Conflict evidence [P28]:** "Gravity at the ISS altitude (400 km) is g = GM/r² = GM/(R_E + 400 km)² ≈ 8.67 m/s² — that's 88% of surface gravity. Gravity is very much present. Astronauts feel weightless because the ISS (and everything in it) is in free fall — it accelerates at g downward, so there is no normal force between the astronaut and the floor. The sensation of weight requires a support force; in free fall, no support force exists. This is the same as why you feel briefly weightless at the top of a roller coaster drop."
- **Bridge text [P30]:** "Weightlessness is not 'zero gravity' — it's 'no normal force.' In an orbiting spacecraft, everything falls together at the same rate. Nothing presses against anything else. The gravitational force is still there; it's just providing all the centripetal acceleration with nothing left over to create a contact force."
- **Replacement text [P31]:** "Astronauts in orbit are in continuous free fall. g ≈ 8.67 m/s² at ISS altitude — nearly the same as on the surface. The apparent weightlessness is the absence of a support (normal) force, not the absence of gravity."
- **Discrimination pairs [P33]:**
  - Lift cable snaps (free fall in atmosphere): weightless sensation, gravity = g = 9.8 m/s² ✓
  - ISS orbit: weightless sensation, g ≈ 8.67 m/s², still in free fall ✓
  - Surface of Moon: g = 1.6 m/s², NOT weightless (Moon supports you) ✓
- **s6_path:** "This is one of the most common physics misconceptions — even news reports get it wrong, saying 'zero gravity' in space. Always ask: what is g at that distance? It's almost never zero."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Orbital period formula**
Prompt: "Write the formula for the orbital period T of a satellite at radius r from Earth's centre. What happens to T when r doubles?"
- Pass: T = 2π√(r³/GM_E) = 2πr/v; T increases by factor 2^(3/2) = 2√2 ≈ 2.83.
- Fail → [P52]: "The period formula is the core tool for satellite calculations. Let's confirm T² = 4π²r³/(GM) before proceeding." → Route to phys.mech.orbital-mechanics.

**PD-2 [P41] — Weightlessness concept**
Prompt: "A 70 kg person stands in an elevator that accelerates downward at 9.8 m/s². What is the normal force from the floor? What does the person feel?"
- Pass: N = m(g − a) = 70(9.8 − 9.8) = 0 N; person feels weightless (free fall).
- Fail → [P52]: "Apparent weight = N = m(g − a_downward). In free fall, a = g, so N = 0. This is the mechanism of orbital weightlessness." Brief explanation, then proceed.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — the first satellite**

> On 4 October 1957, Sputnik 1 became the first artificial satellite — a 58 cm metal sphere, 83.6 kg, orbiting at ~900 km altitude. Its radio beep was heard by amateur radio operators worldwide. It completed one orbit every 96 minutes. Ask students: could you calculate where Sputnik would be at any future time just from T = 96 min and the launch time? (Yes — orbital period + Kepler's Third Law = complete prediction.) This was the first demonstration that mathematical orbital mechanics, developed theoretically by Newton, could be applied to engineer a human-made object in space.

The anchor motivates all of this blueprint's content: real satellites, real numbers, real applications — and the same equations from orbital mechanics give exact predictions.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Satellite Orbit Types [C]**

Classification by altitude and use case:

| Orbit Type | Altitude | Period | Key Use |
|---|---|---|---|
| Low Earth Orbit (LEO) | 200–2000 km | 90 min – 2 h | ISS, imaging, reconnaissance |
| Medium Earth Orbit (MEO) | 2000–35 786 km | 2–24 h | GPS (20 200 km, T = 12 h) |
| Geostationary Earth Orbit (GEO) | 35 786 km | 24 h | TV broadcast, weather, comms |
| Graveyard orbit | ~36 000+ km | >24 h | Retired GEO satellites |

Polar orbits (LEO, any inclination = 90°): pass over both poles each orbit; cover entire Earth surface as it rotates beneath them. Used for Earth observation.

Sun-synchronous orbit (SSO): orbit precesses at 0.9856°/day to match Earth's motion around the Sun — the satellite always crosses the equator at the same local solar time. Used for consistent-lighting imagery.

**TA-2 — Geostationary Orbit: Full Derivation and Properties [C→P]**

Conditions for geostationary orbit:
1. T = T_Earth_rotation = 23 h 56 min 4 s ≈ 86 164 s (sidereal day)
2. Orbit must be circular (constant altitude)
3. Orbit must be in equatorial plane (so satellite stays at fixed longitude)

Deriving r_GEO:
```
T² = 4π²r³/(GM_E)

r³ = GM_E T² / (4π²)
   = 3.986 × 10¹⁴ × (86 164)² / (4π²)
   = 3.986 × 10¹⁴ × 7.424 × 10⁹ / 39.48
   = 7.493 × 10²²

r_GEO = (7.493 × 10²²)^(1/3) = 4.216 × 10⁷ m ≈ 42 164 km

Altitude = r_GEO − R_E ≈ 42 164 − 6 371 = 35 793 km ≈ 35 800 km
```

Orbital speed: v_GEO = 2πr/T = 2π × 4.216 × 10⁷ / 86 164 ≈ 3072 m/s ≈ 3.07 km/s.

Coverage: one GEO satellite sees ~42% of Earth's surface. Three GEO satellites spaced 120° apart provide near-global coverage (excluding polar regions above ~75° latitude).

**TA-3 — Orbital Energy and Satellite Lifetime [C→P]**

Total orbital energy:
```
E = −GMm/(2r)
```

Atmospheric drag (in LEO): drag force does negative work → E decreases (becomes more negative) → r decreases → satellite spirals inward. Counter-intuitively, as E becomes more negative, v increases (the satellite speeds up as it spirals down — it's "falling" into a lower orbit). Terminal: re-entry and burn-up.

Satellite lifetime in LEO depends on:
- Initial altitude (higher → thinner atmosphere → less drag → longer lifetime)
- Solar activity (solar maximum expands the thermosphere, increasing density at 300–600 km)
- Cross-sectional area and mass (ballistic coefficient)

GEO satellites don't experience significant drag — their lifetime is limited by fuel for station-keeping (maintaining position against perturbations from the Moon, Sun, and Earth's non-spherical shape). Typical GEO satellite lifetime: 10–15 years.

**TA-4 — Orbital Manoeuvres: Launch and Raising Orbit [P]**

To place a satellite in GEO from a launch site:
1. Launch to LEO parking orbit (v ≈ 7.7 km/s horizontal)
2. Hohmann transfer: burn at LEO periapsis to reach GEO altitude as apogee
3. Second burn at apogee to circularise at GEO (v ≈ 3.07 km/s)
4. Inclination correction: if launch site is not on equator, the orbit needs to be tilted to equatorial (most expensive manoeuvre)

Total Δv budget for GEO from equatorial launch: ~4.2 km/s above LEO insertion.
From a mid-latitude launch site (e.g., 28.5° = Cape Canaveral): ~6 km/s total Δv from Earth surface.

**TA-5 — GPS and Navigation Satellites [P]**

GPS (Global Positioning System) constellation:
- 24+ satellites in MEO at altitude ≈ 20 200 km, T = 12 h
- Orbital planes: 6 planes, 4 satellites per plane, inclined at 55°
- Coverage: at least 4 satellites visible from any point on Earth at any time

Position calculation (trilateration):
- Each satellite broadcasts its position and the current time.
- Receiver measures signal travel time → distance to each satellite (d = c × Δt).
- With 4 satellite distances, receiver solves for (x, y, z, clock error) — 4 unknowns, 4 equations.
- Accuracy: ~3–5 m civilian; <1 m military/differential GPS.

The GPS system is a real-world application of everything in the gravitation cluster: Newton's gravity, orbital mechanics, Kepler's laws, time dilation (general relativity applies at 20 200 km — clocks in orbit run faster by ~45 μs/day; must be corrected or GPS would drift ~10 km/day).

---

## Component 5 — Worked Examples

**WE-1 (Foundational — satellite period)**

> A satellite orbits Earth at altitude 800 km. Find its orbital period. (R_E = 6370 km, GM_E = 3.986 × 10¹⁴ m³/s²)

Solution:
```
r = 6370 + 800 = 7170 km = 7.17 × 10⁶ m

T = 2π√(r³/GM_E)
  = 2π√((7.17 × 10⁶)³ / 3.986 × 10¹⁴)
  = 2π√(3.684 × 10²⁰ / 3.986 × 10¹⁴)
  = 2π√(9.240 × 10⁵)
  = 2π × 961.2
  = 6040 s ≈ 100.7 min
```

---

**WE-2 (Intermediate — weightlessness calculation)**

> An astronaut of mass 70 kg is in the ISS at altitude 400 km. (a) What is the gravitational force on the astronaut? (b) What is their apparent weight (normal force from the floor)? (c) What centripetal acceleration does the ISS need?

Solution:
```
r = 6370 + 400 = 6770 km = 6.77 × 10⁶ m

(a) F_gravity = GMm/r² = 3.986 × 10¹⁴ × 70 / (6.77 × 10⁶)²
             = 2.790 × 10¹⁶ / 4.583 × 10¹³ = 608.7 N

    Alternatively: g at ISS = GM/r² = 3.986 × 10¹⁴ / (6.77 × 10⁶)² = 8.70 m/s²
    F = mg = 70 × 8.70 = 609 N

(b) The ISS is in free fall (orbit = free fall). The floor has zero normal force on astronaut.
    Apparent weight = N = 0 N. (Astronaut is weightless — not because gravity is zero,
    but because they and the ISS fall at the same rate.)

(c) Centripetal acceleration = g at that radius = 8.70 m/s² (all of gravity provides centripetal)
```

---

**WE-3 (Advanced — number of orbits per day and ground track)**

> An Earth observation satellite is in a sun-synchronous orbit at altitude 600 km. Its period is T = 96.7 min. (a) How many orbits does it complete per day? (b) If the orbit is inclined at 97.8°, why does this help image the entire Earth?

Solution:
```
(a) Orbits per day = 24 × 60 / 96.7 = 1440 / 96.7 ≈ 14.9 orbits per day

(b) Inclination 97.8° means the orbit is slightly retrograde (past 90°). This causes the
orbital plane to precess eastward at exactly 360°/year = 0.986°/day, matching Earth's
revolution around the Sun. Result: the satellite always crosses each latitude at the
same local solar time (e.g., always 10:30 AM descending node). This gives consistent
lighting conditions for imagery — shadow patterns don't change across a multi-day
observation campaign. Over one day (14.9 orbits), the ground track shifts westward
by 360°/14.9 ≈ 24.2° per orbit, covering the entire equatorial belt within 3 days.
```

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — GEO altitude uniqueness**
"Why is there only one geostationary orbit radius, not a range of altitudes? A student claims you could achieve geostationary effect at lower altitude by 'moving the satellite faster to slow it down relative to Earth.' Identify the flaw."

*Target:* T² = 4π²r³/GM → one radius for T = 24 h. At lower r, T < 24 h regardless of artificial intervention — you can't change T without changing r. A faster satellite at lower r has shorter T, not 24 h. The claim is physically impossible in circular orbit.

**MP-2 [P36] — Weightlessness analysis**
"A 100 kg astronaut is orbiting at r = 8000 km. Calculate: (a) gravitational field at r, (b) gravitational force on astronaut, (c) apparent weight."

*Target:* g = GM/r² = 3.986×10¹⁴/(8×10⁶)² = 6.23 m/s²; F = 100 × 6.23 = 623 N; apparent weight = 0 N (free fall orbit).

**MP-3 [P36] — LEO drag spiral**
"A satellite in LEO loses energy to atmospheric drag and its orbital radius decreases from r₁ to r₂ < r₁. Does its orbital speed increase or decrease? Does it gain or lose kinetic energy? Explain the apparent paradox."

*Target:* v = √(GM/r); r decreases → v increases. KE = GMm/(2r); r decreases → KE increases. But total energy E = −GMm/(2r) also decreases (becomes more negative). The drag does negative work on total energy; the orbit drops; the satellite speeds up. Energy lost to drag goes into both negative potential energy and KE gain, with PE drop exceeding KE gain.

**MP-4 [P36] — GPS trilateration**
"Briefly explain how a GPS receiver determines its location. Why does it need signals from at least 4 satellites rather than 3?"

*Target:* 3 satellites give 3 distance equations → 3 unknowns (x, y, z) → determined. But the receiver clock has unknown error (offset from GPS time) → 4th unknown → need 4th satellite. 4 equations, 4 unknowns: (x, y, z, clock error).

**MP-5 [P36] — Synthesis: number of GEO slots**
"The geostationary belt is a ring at one fixed altitude. Satellites must be spaced at least 0.1° apart in longitude to avoid radio interference. How many GEO satellite slots exist? What does this imply about orbital resource management?"

*Target:* 360°/0.1° per slot = 3600 slots. The GEO belt is a finite, internationally managed resource — the ITU (International Telecommunication Union) allocates slots. Countries and companies file for slots; developing nations may lose access to desirable orbital positions if not claimed early.

---

## Component 7 — Session Architecture

```
[P01] Session open — Sputnik 1 launch date provocation (1957 → 96-min beep → predict position?)
  ↓
[P41] PD-1 (period formula) + PD-2 (free-fall weightlessness)
  ↓ PASS both
[P06] Anchor: Sputnik → real satellite, real orbit, real equations
  ↓
TA-1: Orbit type taxonomy (LEO/MEO/GEO); period/altitude table [C]
  ↓
TA-2: GEO full derivation; 3-satellite global coverage [C→P]
  ↓
[P28] Conflict: "You can achieve GEO at any altitude" → MC-GEO-ANYWHERE
  ↓
[P51] Check-in MP-1 (GEO uniqueness — conceptual)
  ↓ monitor
WE-1: LEO period calculation
  ↓
TA-3: Orbital energy; drag; lifetime; GEO station-keeping [C→P]
  ↓
WE-2: ISS weightlessness calculation (MC-WEIGHTLESS-NO-GRAVITY head-on)
  ↓
TA-4: Launch sequence and Hohmann to GEO [P]
  ↓
TA-5: GPS — MEO constellation; trilateration; relativistic correction [P]
  ↓
WE-3: Sun-synchronous orbit analysis
  ↓
[P36] MP-2 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval schedule seed: "Why are astronauts weightless in orbit even though g ≈ 8.7 m/s²?"
[P68] Session close
[P85] Regulation tail
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 80% MP-set; re-route if below threshold
```

**Protocol routing:**
- S0 (novice): full CPA path; start with Sputnik story; build the orbit type table concretely before any derivation.
- S1 (schema without grounding): knows "GEO = 35 786 km" but not why; focus on TA-2 derivation and MP-1 uniqueness argument.
- S4 (prereq gap): PD-1 fail → orbital-mechanics.
- S6 (anxiety): [F] protocol — "This blueprint is applied orbital mechanics. We already have all the equations. The new content is what the different orbits are used for."
- S7 (overconfident): open with MP-5 (GEO slot management — almost no student knows the ITU slot system) or MP-3 (drag paradox — satellite speeds up as it loses energy).

---

## Component 8 — Adaptive Flags

- **Sidereal vs. solar day**: GEO T = 23 h 56 min 4 s (sidereal day), not 24 h (solar day). The 3 min 56 s difference matters for precise GEO placement calculations. Acknowledge it; for most exam problems 24 h = 86 400 s is acceptable.
- **Relativity in GPS** (TA-5): mention explicitly as a real-world application of physics beyond mechanics — special relativity (time dilation from velocity, ~7 μs/day slow) and general relativity (gravitational time dilation, ~45 μs/day fast) combine to a net +38 μs/day correction. Without it, GPS would drift ~10 km/day. This is one of the strongest everyday-life demonstrations that relativistic effects are real.
- **LEO drag paradox** (TA-3, MP-3): this is the same "add energy → slow down" orbital paradox from orbital-mechanics, but in reverse — "lose energy → speed up." Both follow from E = −GMm/(2r) and KE = GMm/(2r) = −E. Flag the parallel.
- **Coverage geometry**: one GEO satellite covers ~42% of Earth but cannot cover polar regions above ~75° lat. Russia's MOLNIYA orbit (highly elliptical, 12-h period, high apogee over Russia) is the engineering solution. Mention as an extension point.
- **ITU slot allocation** (MP-5): this is interdisciplinary — physics meets international law and geopolitics. Students find it surprising that orbital slots are internationally governed finite resources.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.mech.satellites |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.mech.orbital-mechanics ✓ |
| V-3 | difficulty label matches KG | PASS — advanced (5) |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 5h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-GEO-ANYWHERE, MC-WEIGHTLESS-NO-GRAVITY |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (orbital-mechanics), PD-2 (free-fall concept) |
| V-10 | Concrete anchor present [P06] | PASS — Sputnik 1 historical anchor |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with accelerated P (difficulty 5) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — sidereal vs solar day, GPS relativity, drag paradox, coverage geometry, ITU slots |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
