# Teaching Blueprint — phys.mech.universal-gravitation

## Component 0 — Concept Metadata

```
concept_id:         phys.mech.universal-gravitation
name:               Universal Gravitation
domain:             Classical Mechanics (Physics)
difficulty:         proficient (4)
bloom:              understand
mastery_threshold:  0.80
estimated_hours:    3
prerequisites:      [phys.mech.newtons-second-law]
cross_links:        [phys.mech.gravitational-field, phys.mech.orbital-mechanics,
                     phys.mech.circular-motion]
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (the Moon falls toward Earth like an apple but never hits —
                       why? before F = Gm₁m₂/r²; difficulty 4 → C with
                       accelerated P track)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** Every pair of masses in the universe attracts every other pair with a force
proportional to the product of their masses and inversely proportional to the square of their
separation. This one law explains the apple falling, the Moon orbiting, and tidal forces.

**Newton's Law of Universal Gravitation:**
F = Gm₁m₂ / r²

where G = 6.674 × 10⁻¹¹ N·m²/kg² (gravitational constant), m₁ and m₂ are the two masses (kg),
and r is the centre-to-centre distance between them (m). F is in newtons.

**Key properties:**
- F is always attractive — gravity never repels.
- F acts along the line joining the two centres (Newton's 3rd: equal magnitudes, opposite directions).
- F ∝ 1/r²: inverse-square law — doubling r reduces F by a factor of 4.
- Near Earth's surface: F = mg where g = GM_E/R_E² ≈ 9.8 m/s².
- The apple pulls the Earth upward with the same force (but Earth barely moves — huge M).

**Worked Example 1 (Basic):**
Two 5 kg masses, 0.4 m apart.
F = 6.674×10⁻¹¹ × 5 × 5 / 0.16 = 6.674×10⁻¹¹ × 156.25 = 1.04×10⁻⁸ N. Very small!

**Worked Example 2 (Double distance):**
Same masses, distance doubles to 0.8 m.
F = 6.674×10⁻¹¹ × 25 / 0.64 = 2.6×10⁻⁹ N. One quarter of the original. ✓ Inverse square.

**Worked Example 3 (Deriving g at Earth's surface):**
M_E = 5.97×10²⁴ kg; R_E = 6.37×10⁶ m.
g = GM_E/R_E² = 6.674×10⁻¹¹ × 5.97×10²⁴ / (6.37×10⁶)² = 9.78 ≈ 9.8 m/s². ✓

---

## Component 2 — Prerequisite Dependency Map

```
phys.mech.newtons-second-law  ──────────────►  phys.mech.universal-gravitation
   (F = ma; understanding that gravity is a force causing acceleration)
   REQUIRED: student knows that weight W = mg is a gravitational force
```

**PD-1 (Newton's 2nd Law):**
"A 4 kg object has weight 39.2 N. What is g here? What formula are you using?"
Expected: g = W/m = 9.8 m/s²; F = mg.

If student cannot identify gravity as F = mg → prerequisite repair before TA-3.

---

## Component 3 — Misconception Engine

### MC-GRAVITY-STOPS (Priority 1)
**Label:** "Gravity disappears or becomes zero at some altitude — it only works on the ground"

**Trigger signals:**
- Says "astronauts are weightless because there's no gravity in space"
- Claims gravity stops at the atmosphere's edge
- Cannot explain why the Moon stays in orbit (thinks it's a different force)

**Conflict evidence [P28]:**
"The ISS orbits at ~400 km altitude. If gravity were zero there:
g_ISS = GM_E/(R_E + h)² = 9.8 × (6370/(6370+400))² = 9.8 × (6370/6770)² ≈ 8.67 m/s².
Gravity there is 88% of surface gravity — very much present!
Astronauts feel weightless because they (and the ISS) are in continuous free fall, not because gravity is absent."

**Bridge [P30]:**
"F = Gm₁m₂/r² never reaches zero — it just keeps getting smaller with distance.
At 400 km altitude, g ≈ 8.7 m/s². At the Moon's distance (384 000 km), g ≈ 0.0027 m/s².
Tiny — but it's what keeps the Moon in orbit. Gravity extends infinitely; it never switches off."

**Replacement [P31]:**
"Gravity extends to infinite range; F = Gm₁m₂/r² → 0 only as r → ∞.
Weightlessness in orbit is free-fall (everything accelerates at the same rate), not zero gravity.
The same law explains the apple, the Moon, and distant galaxies."

**Discrimination pairs [P33]:**
- g at ISS (400 km): 8.67 m/s² (not zero) ✓
- g at Moon's surface vs Earth's: different because M_moon and R_moon differ ✓

**s6_path:** Use the apple-and-Moon story: "Newton realised the same force pulling the apple down
also holds the Moon in its orbit. Gravity doesn't stop at the sky — it just weakens."

---

### MC-INVERSE-LINEAR (Priority 2)
**Label:** "Doubling the distance halves the gravitational force (inverse-linear, not inverse-square)"

**Trigger signals:**
- Says "if r doubles, F halves" (wrong: F quarters)
- Uses F ∝ 1/r instead of 1/r²
- Confused by the r² denominator

**Conflict evidence [P28]:**
"Two masses, r = 1 m: F = GM₁M₂/1 = F₀.
r = 2 m: F = GM₁M₂/4 = F₀/4 (one quarter, not one half).
r = 3 m: F = GM₁M₂/9 = F₀/9 (one ninth).
If it were inverse-linear, r = 2 → F₀/2, r = 3 → F₀/3. The numbers don't match. Why r²?"

**Bridge [P30]:**
"Gravity spreads over the surface of a sphere. The surface area of a sphere is 4πr².
As r doubles, the surface area quadruples — so the same 'amount of gravity' is spread
over 4× the area. That's why F ∝ 1/r² (the inverse-square law)."

**Replacement [P31]:**
"F = Gm₁m₂/r². The r² in the denominator gives the inverse-square law.
If r multiplies by k: F divides by k². Double r → F/4. Triple r → F/9. Half r → 4F."

**Discrimination pairs [P33]:**
- r × 2: F ÷ 4 (not ÷ 2) ✓
- r × 3: F ÷ 9 (not ÷ 3) ✓
- r × ½: F × 4 (not × 2) ✓

**s6_path:** Use only the doubling case: "r doubles → r² quadruples → F quarters." Then verify with numbers.

---

## Component 4 — Teaching Action Sequence

### TA-1 — Concrete Experience [Protocol A, S0/S1]
**Primitives:** P01, P04, P06

P01: Open session; orient to universal gravity.
P04: "Newton watched an apple fall. He asked: could the same force that pulls the apple also pull
the Moon? The Moon is much farther away — but what if gravity just got weaker with distance? How
would you test this idea?"
P06: "If we can use the same law — F = Gm₁m₂/r² — to predict both the apple's acceleration AND
the Moon's orbital speed, then gravity truly IS universal. Newton did exactly this calculation."

---

### TA-2 — Modality / Formula Introduction [Protocol A, S0/S1]
**Primitives:** P07, P08, P05

P07 (visual): Graph of F vs r — a steep 1/r² curve. Mark r = 1R_E (surface), 2R_E (quadrant drop),
∞ (approaches zero but never reaches it). Annotate: "gravity extends to infinity."

P08 (notation): F = Gm₁m₂/r². G = 6.674×10⁻¹¹ N·m²/kg². Centre-to-centre distance.
Walk through Worked Examples 1, 2, 3. Emphasise the r² relationship.

P05: "One formula unifies all of gravity: the falling apple, planetary orbits, tidal forces,
black holes. Newton's achievement was realising it's all the SAME force."

---

### TA-3 — Prerequisite Check + Guided Practice [Protocol C]
**Primitives:** P41, P34, P10, P13

P41 (diagnostic): Present PD-1 (Newton's 2nd / weight).
P34: "4 kg, weight = 39.2 N → g?" If gap → repair F = mg before continuing.

P10: "Find the gravitational force between Earth (M_E = 5.97×10²⁴ kg) and a 70 kg person
standing on the surface (R_E = 6.37×10⁶ m)."
P13: "F = 6.674×10⁻¹¹ × 5.97×10²⁴ × 70 / (6.37×10⁶)² = 686 N ≈ mg (g ≈ 9.8). ✓"

---

### TA-4 — MC-GRAVITY-STOPS Diagnostic Probe [Protocol B]
**Primitives:** P14, P28, P30, P31, P33, P36

P14 (predict): "Astronauts on the ISS orbit at 400 km altitude. They appear weightless.
Is gravity zero at that altitude? What is g there?"

Listen: if student says "gravity is zero in space" → MC-GRAVITY-STOPS confirmed.

P28 → P30 → P31 (full Misconception Engine MC-GRAVITY-STOPS sequence).

P33: g_ISS ≈ 8.67 m/s²; g_moon_surface ≈ 1.62 m/s²; g at infinity = 0.
"Gravity decreases with altitude, never vanishes at a finite distance."

P36: "If gravity disappeared at the atmosphere's edge, what would happen to the Moon?"
[Expected: Moon would fly off in a straight line — it stays because gravity acts at 384 000 km.]

---

### TA-5 — MC-INVERSE-LINEAR Probe + Ratio Problems [Protocol B + C]
**Primitives:** P14, P28, P30, P31, P33, P10

P14: "Two masses at r = 2 m: F = F₀. Distance triples to r = 6 m.
Before computing: what is the new F in terms of F₀?"

Listen: if student says "F₀/3" → MC-INVERSE-LINEAR confirmed.

P28 → P30 → P31 (full Misconception Engine MC-INVERSE-LINEAR sequence).
Expected: r×3 → r²×9 → F = F₀/9 (not F₀/3).

P10 (ratio problems): "Earth's gravitational force on the Moon = 2×10²⁰ N at 384 000 km.
If the Moon were moved to 768 000 km (doubled), what would the new force be?"
P13: "r doubles → F = 2×10²⁰/4 = 5×10¹⁹ N."

---

### TA-6 — Independent Problem Set [Protocol A → C]
**Primitives:** P10, P51, P52, P55, P54

Problem set:

1. **Basic:** m₁ = 4 kg, m₂ = 8 kg, r = 0.5 m. F?
   [Answer: F = 6.674×10⁻¹¹ × 32 / 0.25 = 8.54×10⁻⁹ N]
2. **Ratio:** Force at r = r₀ is F₀. Force at r = 4r₀?
   [Answer: F₀/16]
3. **g on Mars:** M_Mars = 6.39×10²³ kg, R_Mars = 3.39×10⁶ m. g_Mars?
   [Answer: g = 6.674×10⁻¹¹ × 6.39×10²³ / (3.39×10⁶)² ≈ 3.71 m/s²]
4. **Find r from F:** Two 1000 kg masses attract with F = 10⁻³ N. Find r.
   [Answer: r = √(Gm₁m₂/F) = √(6.674×10⁻¹¹ × 10⁶ / 10⁻³) = √(66.74) ≈ 8.17 m]
5. **Newton's insight:** The Moon is 60 R_E from Earth's centre. Compare g at the Moon's
   distance to g at Earth's surface. [Answer: g_Moon = g_surface/60² = 9.8/3600 ≈ 0.00272 m/s²]

P51, P52, P55, P54 (standard protocol).

---

### TA-7 — Closure + Retrieval Schedule [Protocol A]
**Primitives:** P68, P62, P85, P89

P68: "Today: F = Gm₁m₂/r². G = 6.674×10⁻¹¹ N·m²/kg². Inverse-square: double r → F/4.
Gravity extends to infinity; never zero at finite r. g = GM/R² links universal law to surface gravity."

P62: "Next session: 'Two 5 kg balls, 0.3 m apart. F? Now 0.6 m apart. New F?'"

P85: "You derived that g ≈ 9.8 m/s² from first principles — Newton's greatest conceptual leap
in one calculation. That connection between F = mg and F = Gm₁m₂/r² is the foundation of everything."

P89: Log MC flags; record problem accuracy; note r² relationship fluency.

---

## Component 5 — Mastery Probe Bank

### P91 Mastery Probes (5 required; 4/5 correct = PASS at threshold 0.80)

**MP-1 (Apply — basic computation):**
"Two 10 kg masses are 0.2 m apart. Find F."
Expected: F = 6.674×10⁻¹¹ × 100 / 0.04 = 1.67×10⁻⁷ N.
_Discriminates: correct substitution into F = Gm₁m₂/r²._

**MP-2 (Apply — inverse-square ratio):**
"Force between two masses at distance r is 8×10⁻⁸ N. Distance quadruples. New F?"
Expected: F = 8×10⁻⁸/16 = 5×10⁻⁹ N.
_Discriminates: MC-INVERSE-LINEAR resolution; r×4 → F÷16._

**MP-3 (Apply — g on another body):**
"Moon: M = 7.35×10²² kg, R = 1.74×10⁶ m. Compute g on Moon's surface."
Expected: g = 6.674×10⁻¹¹ × 7.35×10²² / (1.74×10⁶)² ≈ 1.62 m/s².
_Discriminates: g = GM/R² derivation._

**MP-4 (Understand — gravity in orbit):**
"An astronaut at the ISS (400 km altitude) feels weightless. Is gravity zero there? Explain."
Expected: No. g_ISS = GM_E/(R_E+h)² ≈ 8.7 m/s². Weightless = free fall, not zero gravity.
_Discriminates: MC-GRAVITY-STOPS resolution._

**MP-5 (Apply — find mass from g):**
"A planet has g = 12 m/s² at its surface (R = 5×10⁶ m). Find its mass."
Expected: M = gR²/G = 12×25×10¹²/6.674×10⁻¹¹ ≈ 4.49×10²⁴ kg.
_Discriminates: algebraic rearrangement of g = GM/R²._

---

## Component 6 — Formative Assessment Strategy

**FA-1 (TA-2 exit):** "F = ? (formula). What is G? Units of G?"
Threshold: F = Gm₁m₂/r²; G = 6.674×10⁻¹¹; units N·m²/kg².

**FA-2 (TA-4 exit):** "At 400 km altitude, is gravity zero? Compute g there vs surface."
Expected: Not zero; g_ISS ≈ 8.7 m/s²; surface 9.8 m/s².
If student says zero → MC-GRAVITY-STOPS not resolved → loop back to P31.

**FA-3 (TA-5 exit):** "Distance triples. F changes by factor of ?"
Expected: F÷9. If student says F÷3 → MC-INVERSE-LINEAR not resolved.

**FA-4 (Session exit):** Administer MP-1, MP-2, MP-3. 3/3 correct → advance to TA-7.

---

## Component 7 — Anxiety & Confidence Protocols

**S6 (Anxiety) path:**
- Use only qualitative ratio reasoning in TA-3 (r doubles → F quarters) before numbers.
- Defer G-value substitution to TA-5 if the scientific notation causes anxiety.
- Reassure: "The formula has two parts: Gm₁m₂ on top, r² on the bottom."
- Use g = GM/R² for Earth (familiar g = 9.8) before introducing large G numbers.

**S7 (Overconfident) path [Protocol G]:**
- Lead with MP-5 (find planet mass from g) at TA-3.
- Challenge: "At what altitude above Earth's surface does g = 4.9 m/s² (half of surface g)?
  (r = R_E√2 → h = R_E(√2−1) ≈ 2637 km)"
- Spend TA-6 on Problems 4 and 5.

**S4 (Prereq gap — Newton's 2nd Law):**
- Detect via PD-1 failure at TA-3.
- Repair: F = mg, weight as gravitational force, then introduce universal law as the full version.

---

## Component 8 — Spaced Retrieval & Interleaving Plan

**Session 1:** TA-1 through TA-4 (Concrete → F = Gm₁m₂/r² → MC-GRAVITY-STOPS repair).
**Session 2 (≥24 h later):** Retrieval: "Formula? If r triples, what happens to F?"
  → TA-5 (MC-INVERSE-LINEAR, ratio problems) → TA-6 (Problem set).
**Session 3 (≥72 h later):** Interleaved probe combining universal gravitation and Newton's 2nd:
  "A 70 kg astronaut orbits at R = 7000 km from Earth's centre. What is the gravitational force
  on her? What acceleration does this give her?"
  (F = GMm/r² ≈ 604 N; a = F/m ≈ 8.6 m/s² — previews orbital mechanics.)
**Pre-gravitational-field session:** All 5 P91 probes cold; require 4/5 before advancing.

**Interleaving partners:** phys.mech.newtons-second-law (F = ma; gravity as a force),
phys.mech.gravitational-field (g as a field quantity).

---

## Component 9 — V-Check Trace

```
V-1   concept_id present and matches KG: phys.mech.universal-gravitation ✓
V-2   prerequisites listed and exist in KG: phys.mech.newtons-second-law ✓
V-3   bloom level consistent with difficulty 4/proficient: understand ✓
V-4   mastery_threshold in range [0.70, 0.95]: 0.80 ✓
V-5   estimated_hours reasonable for difficulty: 3h for proficient ✓
V-6   session_cap derivation correct: ≥1h → 7 TAs ✓
V-7   cpa_entry_stage rationale present: Moon-falls-like-apple anchor ✓
V-8   ≥2 misconceptions engineered: MC-GRAVITY-STOPS, MC-INVERSE-LINEAR ✓
V-9   each MC has trigger/conflict/bridge/replacement/pairs/s6_path ✓
V-10  TA count = session_cap (7 TAs): TA-1…TA-7 ✓
V-11  TA-1 is Concrete [P06]: apple-and-Moon Newton story ✓
V-12  TA-4 is MC diagnostic probe [P14, P28, P30, P31, P33, P36]: MC-GRAVITY-STOPS ✓
V-13  TA-7 is closure [P68, P62, P85, P89] ✓
V-14  ≥5 P91 mastery probes with expected answers: MP-1…MP-5 ✓
V-15  4 formative assessments with thresholds: FA-1…FA-4 ✓
V-16  S6/S7/S4 protocols specified in Component 7 ✓
V-17  3-session spaced retrieval plan present: Component 8 ✓
V-18  interleaving partners named: newtons-second-law, gravitational-field ✓
V-19  cross_links match KG edges: gravitational-field, orbital-mechanics,
      circular-motion ✓
V-20  status = READY, all V-checks passed ✓
```

**Status: READY / PACKAGE_READY — V-1 through V-20 PASS**
