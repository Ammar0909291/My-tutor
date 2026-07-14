# Teaching Blueprint — phys.mech.angular-kinematics

## Component 0 — Concept Metadata

```
concept_id:         phys.mech.angular-kinematics
name:               Angular Kinematics
domain:             Classical Mechanics (Physics)
difficulty:         proficient (4)
bloom:              apply
mastery_threshold:  0.80
estimated_hours:    4
prerequisites:      [phys.mech.kinematics-1d]
cross_links:        [phys.mech.torque, phys.mech.circular-motion,
                     phys.mech.angular-momentum]
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (a spinning wheel — a mark on the rim travels further than
                       a mark near the centre in the same time, but both rotate by
                       the same angle; before ω, α, θ; difficulty 4 → C with
                       accelerated P track)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** Rotational motion has angular analogs of every linear kinematic quantity.
Angle (θ) replaces displacement, angular velocity (ω) replaces velocity, angular acceleration (α)
replaces acceleration. The equations are structurally identical — once the analogy is clear,
the student already knows rotational kinematics.

**Quantities and analogies:**

| Linear | Angular | Unit |
|--------|---------|------|
| Displacement s (m) | Angle θ (rad) | radian |
| Velocity v (m/s) | Angular velocity ω (rad/s) | rad/s |
| Acceleration a (m/s²) | Angular acceleration α (rad/s²) | rad/s² |
| F = ma | τ = Iα | (later) |

**Radian measure:**
θ (rad) = arc length / radius = s/r.
Full circle: θ = 2π rad = 360°. One revolution = 2π rad.
Convert: θ(rad) = θ(°) × π/180.

**Angular kinematic equations (uniform α, analogous to SUVAT):**
ω_f = ω_i + αt
θ = ω_i t + ½αt²
ω_f² = ω_i² + 2αθ
θ = (ω_i + ω_f)/2 × t

**Tangential-angular link:**
v = rω (tangential speed at radius r)
a_t = rα (tangential acceleration at radius r)
a_c = v²/r = rω² (centripetal acceleration at radius r)

**Worked Example 1 (Basic):**
A wheel starts from rest and reaches 6 rad/s in 3 s with uniform α.
α = Δω/Δt = 6/3 = 2 rad/s².
θ = ½αt² = ½×2×9 = 9 rad.

**Worked Example 2 (Tangential speed):**
Same wheel (ω = 6 rad/s), radius 0.4 m.
v = rω = 0.4 × 6 = 2.4 m/s.

**Worked Example 3 (Angular SUVAT):**
A fan blade (ω_i = 10 rad/s) decelerates at α = −2 rad/s². How many revolutions before stopping?
ω_f = 0: 0 = 100 + 2×(−2)×θ → θ = 25 rad = 25/(2π) ≈ 3.98 revolutions.

---

## Component 2 — Prerequisite Dependency Map

```
phys.mech.kinematics-1d  ──────────────►  phys.mech.angular-kinematics
   (SUVAT equations and their logic)
   REQUIRED: student can apply v = u + at and s = ut + ½at²
```

**PD-1 (Linear kinematics prerequisite):**
"An object at rest accelerates at 3 m/s² for 4 s. Find final velocity and displacement."
Expected: v = 12 m/s; s = ½×3×16 = 24 m.

If student cannot apply SUVAT → prerequisite repair before TA-3.

---

## Component 3 — Misconception Engine

### MC-SAME-TANGENTIAL (Priority 1)
**Label:** "All points on a rotating body have the same speed (or tangential velocity)"

**Trigger signals:**
- Says all points on a wheel have the same speed
- Computes v = rω for the centre (r = 0) and claims it's the same as the rim
- Confused why the edge of a record wears faster than the centre

**Conflict evidence [P28]:**
"A disc of radius 0.5 m rotates at ω = 4 rad/s. Speed at the rim: v = 0.5×4 = 2 m/s.
Speed at r = 0.2 m: v = 0.2×4 = 0.8 m/s. Speed at the centre (r = 0): v = 0 m/s.
If all points had the same speed, which formula would you use? Is 2 = 0.8 = 0 consistent?"

**Bridge [P30]:**
"All points share the same ω — they rotate through the same angle in the same time.
But tangential speed v = rω — larger r means faster tangential speed. The outer edge of a
record player travels a much greater distance in one revolution than a point near the centre."

**Replacement [P31]:**
"ω is the same for all points on a rigid rotating body.
v = rω — tangential speed varies with distance from the axis.
At the axis (r = 0): v = 0 (the centre doesn't translate).
At maximum r (rim): v is maximum."

**Discrimination pairs [P33]:**
- Point A (r = 0.3) vs Point B (r = 0.6) on same disc: same ω, v_B = 2× v_A ✓
- Records worn more at edge: higher v → more friction at larger r ✓

**s6_path:** Use a single spoke of a bicycle wheel: "the tip moves much faster than the hub — can you see why?"
Build v = rω from the concrete before formalising.

---

### MC-DEGREES-NOT-RADIANS (Priority 2)
**Label:** "Angles should be in degrees — radians are just a confusing conversion"

**Trigger signals:**
- Substitutes θ in degrees into ω = θ/t or v = rω
- Converts angle to degrees mid-calculation then fails to convert back
- Says "2π rad = 360° so I'll just use 360 in the formula"

**Conflict evidence [P28]:**
"A point at r = 0.5 m on a disc rotates 90°. What is the arc length?
Using degrees: s = r × θ = 0.5 × 90 = 45 m — this is longer than the disc's entire circumference (2π×0.5 ≈ 3.14 m). Something is wrong.
Using radians: 90° = π/2 rad. s = 0.5 × π/2 = 0.785 m. This is ¼ of the circumference. ✓"

**Bridge [P30]:**
"Radians are the natural unit: the definition θ = s/r only works in radians (dimensionless ratio).
When you use degrees in formulas like v = rω or s = rθ, the numbers are off by a factor of π/180.
Radians aren't optional — they're baked into the formula's derivation."

**Replacement [P31]:**
"Always convert degrees to radians before substituting into any angular formula.
θ(rad) = θ(°) × π/180. Once you're in radians, v = rω, s = rθ, and all SUVAT analogs work directly."

**Discrimination pairs [P33]:**
- 180° = π rad: arc at r = 1 m is π m (half circumference) ✓
- 360° = 2π rad: full circumference = 2πr ✓ (not 360r) ✓

**s6_path:** Use the mnemonic "radian = ratio" — θ = s/r, so θ is dimensionless, and radians
are just the unit name for that dimensionless ratio. Avoid the word "conversion."

---

## Component 4 — Teaching Action Sequence

### TA-1 — Concrete Experience [Protocol A, S0/S1]
**Primitives:** P01, P04, P06

P01: Open session; orient to rotation as a new dimension of motion.
P04: "A spinning wheel — a mark on the rim vs a mark near the hub. In 1 second:
which mark travels further? Which rotates through more degrees?"
P06 (hands-on anchor): "Both marks rotate through the same angle (same ω) — but the rim mark
travels a longer arc. This is the heart of angular kinematics: ω is shared; v = rω is not."

---

### TA-2 — Modality / Formula Introduction [Protocol A, S0/S1]
**Primitives:** P07, P08, P05

P07 (visual): Side-by-side table of linear vs angular analogs (from Component 1).
Also: diagram of a rotating disc with points at r₁ and r₂ labeled with ω (same) and v₁, v₂ (different).

P08 (notation): Introduce θ (rad), ω (rad/s), α (rad/s²). Present all 4 angular SUVAT equations.
Emphasise they are identical in structure to linear SUVAT — just replace s→θ, v→ω, a→α.
Walk through Worked Examples 1 and 2.

P05: "Learning angular kinematics is free — you already know linear kinematics. Just rename
the variables and you have all the tools."

---

### TA-3 — Prerequisite Check + Guided Practice [Protocol C]
**Primitives:** P41, P34, P10, P13

P41 (diagnostic): Present PD-1 (linear SUVAT).
P34: "At rest, a = 3 m/s², t = 4 s: final v and s?" If gap → repair linear SUVAT first.

P10: "A motor starts at ω = 0 and reaches ω = 8 rad/s with α = 4 rad/s². Find t and θ."
P13: "t = Δω/α = 8/4 = 2 s. θ = ½αt² = ½×4×4 = 8 rad = 8/(2π) ≈ 1.27 rev."

Radians conversion check: "8 rad × (180/π) = 458° ≈ 1.27 full rotations. Consistent? Yes."

---

### TA-4 — MC-SAME-TANGENTIAL Diagnostic Probe [Protocol B]
**Primitives:** P14, P28, P30, P31, P33, P36

P14 (predict): "A disc (ω = 5 rad/s, radius 0.6 m) has point A at r = 0.2 m and point B at the rim.
Before computing: does A have the same tangential speed as B?"

Listen: if student says "yes — same ω, same speed" → MC-SAME-TANGENTIAL confirmed.

P28 → P30 → P31 (full Misconception Engine MC-SAME-TANGENTIAL sequence).

P33: v_A = 0.2×5 = 1 m/s; v_B = 0.6×5 = 3 m/s. B moves 3× faster despite same ω.

P36: "Why does the outer track of a CD wear faster than the inner track even though the disc
spins at the same ω throughout?" [Expected: v = rω; outer r → higher v → more abrasion.]

---

### TA-5 — MC-DEGREES-NOT-RADIANS Probe + Arc Length Practice [Protocol B + C]
**Primitives:** P14, P28, P30, P31, P33, P10

P14: "A point at r = 2 m rotates through 90°. What is the arc length?"

Listen: if student writes s = 2 × 90 = 180 m → MC-DEGREES-NOT-RADIANS confirmed.

P28 → P30 → P31 (full Misconception Engine MC-DEGREES-NOT-RADIANS sequence).

P10: "A wheel of radius 0.3 m makes 5 complete revolutions. Find (a) θ in radians,
(b) arc length traveled by a rim point, (c) ω if it takes 4 s."
P13: "(a) θ = 5×2π = 10π ≈ 31.4 rad. (b) s = rθ = 0.3×31.4 = 9.42 m. (c) ω = θ/t = 31.4/4 = 7.85 rad/s."

---

### TA-6 — Independent Problem Set [Protocol A → C]
**Primitives:** P10, P51, P52, P55, P54

Problem set:

1. **Basic α:** A wheel goes from ω = 2 rad/s to ω = 10 rad/s in 4 s. Find α and θ.
   [Answer: α = 2 rad/s²; θ = (2+10)/2 × 4 = 24 rad]
2. **Tangential speed:** Disc ω = 6 rad/s, radius 0.5 m. Speed at rim? At r = 0.2 m?
   [Answer: 3 m/s; 1.2 m/s]
3. **SUVAT:** ω_i = 15 rad/s, α = −3 rad/s². When does it stop? θ before stopping?
   [Answer: t = 5 s; θ = ω²/(2×3) = 37.5 rad (or θ = 15×5 − ½×3×25 = 37.5 rad)]
4. **Revolutions to radians:** A turbine makes 300 rpm. Convert to rad/s.
   [Answer: 300×2π/60 = 10π ≈ 31.4 rad/s]
5. **Centripetal:** Disc ω = 4 rad/s, r = 0.3 m. Find centripetal acceleration at the rim.
   [Answer: a_c = rω² = 0.3×16 = 4.8 m/s²]

P51, P52, P55, P54 (standard protocol).

---

### TA-7 — Closure + Retrieval Schedule [Protocol A]
**Primitives:** P68, P62, P85, P89

P68: "Today: angular SUVAT — θ, ω, α mirror s, v, a. ω is the same for all points on a rigid
body; v = rω depends on r. Always use radians in angular formulas."

P62: "Next session: 'A wheel (ω_i = 20 rad/s) decelerates at 4 rad/s². How many revolutions
before it halves its speed? What is the tangential speed at r = 0.5 m at that moment?'"

P85: "You correctly applied the angular-linear analogy — that recognition will make torque and
angular momentum feel familiar when we get to them."

P89: Log MC flags; record problem accuracy; note radian-conversion proficiency.

---

## Component 5 — Mastery Probe Bank

### P91 Mastery Probes (5 required; 4/5 correct = PASS at threshold 0.80)

**MP-1 (Apply — basic α and θ):**
"A flywheel starts at rest and reaches ω = 12 rad/s with α = 3 rad/s². Find t and θ."
Expected: t = 4 s; θ = ½×3×16 = 24 rad.
_Discriminates: angular SUVAT from rest._

**MP-2 (Apply — tangential speed):**
"A disc rotates at ω = 8 rad/s. Point A is at r = 0.25 m; Point B is at r = 0.5 m.
Find the tangential speed of each."
Expected: v_A = 2 m/s; v_B = 4 m/s.
_Discriminates: MC-SAME-TANGENTIAL resolution; v = rω._

**MP-3 (Apply — radian conversion + arc length):**
"A wheel of radius 0.4 m rotates 270°. Find θ in radians and the arc length at the rim."
Expected: θ = 270×π/180 = 3π/2 ≈ 4.71 rad; s = 0.4×4.71 = 1.885 m.
_Discriminates: MC-DEGREES-NOT-RADIANS resolution._

**MP-4 (Apply — SUVAT stopping):**
"A motor at ω = 24 rad/s decelerates at α = 6 rad/s². How long before it stops? θ covered?"
Expected: t = 4 s; θ = 24×4 − ½×6×16 = 96−48 = 48 rad.
_Discriminates: angular SUVAT with deceleration._

**MP-5 (Apply — centripetal):**
"A point at r = 0.5 m on a disc rotating at ω = 10 rad/s. Find: (a) tangential speed,
(b) centripetal acceleration."
Expected: v = 5 m/s; a_c = rω² = 0.5×100 = 50 m/s².
_Discriminates: v = rω and a_c = rω² distinction._

---

## Component 6 — Formative Assessment Strategy

**FA-1 (TA-2 exit):** "Write the four angular SUVAT equations. What unit must angles be in?"
Threshold: All 4 equations correct; unit = radians.

**FA-2 (TA-4 exit):** "Disc ω = 3 rad/s. Point A at r = 0.1, Point B at r = 0.4. Both v?"
Expected: 0.3 m/s vs 1.2 m/s. If student says equal → MC-SAME-TANGENTIAL not resolved.

**FA-3 (TA-5 exit):** "θ = 180°. Convert to radians. Arc length at r = 0.5 m?"
Expected: θ = π rad; s = 0.5π ≈ 1.57 m. If student writes s = 90 → MC-DEGREES-NOT-RADIANS not resolved.

**FA-4 (Session exit):** Administer MP-1, MP-2, MP-3. 3/3 correct → advance to TA-7.

---

## Component 7 — Anxiety & Confidence Protocols

**S6 (Anxiety) path:**
- Lead with the analogy table heavily: "θ is just s with a new name."
- Use ω = θ/t before introducing SUVAT equations — establish ω conceptually first.
- Skip centripetal acceleration (MP-5) in first session if anxiety remains; it's secondary.
- Reassure: "You already know 4 equations — these are the same 4, just with Greek letters."

**S7 (Overconfident) path [Protocol G]:**
- Lead with MP-5 (centripetal requires chaining v = rω and a_c = v²/r) at TA-3.
- Challenge: "A point on a disc has a_t = rα = 0.6 m/s² and a_c = 3 m/s². Find the total
  acceleration magnitude." (Pythagoras: a = √(0.36+9) ≈ 3.06 m/s².)
- Spend TA-6 on rpm conversions and the centripetal acceleration problem.

**S4 (Prereq gap — Linear kinematics):**
- Detect via PD-1 failure at TA-3.
- Repair: mini-session on v = u + at, s = ut + ½at², v² = u² + 2as before returning.

---

## Component 8 — Spaced Retrieval & Interleaving Plan

**Session 1:** TA-1 through TA-4 (Concrete → angular SUVAT → MC-SAME-TANGENTIAL repair).
**Session 2 (≥24 h later):** Retrieval: "ω vs v: which is shared? How does v vary across the disc?"
  → TA-5 (MC-DEGREES-NOT-RADIANS, arc length) → TA-6 (Problem set).
**Session 3 (≥72 h later):** Interleaved probe combining linear and angular:
  "A wheel of radius 0.3 m starts from rest. α = 5 rad/s². After 4 s:
  (a) ω, (b) θ, (c) tangential speed at rim, (d) centripetal acceleration at rim."
  (Chains all angular kinematics results.)
**Pre-torque session:** All 5 P91 probes cold; require 4/5 before advancing.

**Interleaving partners:** phys.mech.kinematics-1d (structural analogy),
phys.mech.circular-motion (centripetal acceleration link).

---

## Component 9 — V-Check Trace

```
V-1   concept_id present and matches KG: phys.mech.angular-kinematics ✓
V-2   prerequisites listed and exist in KG: phys.mech.kinematics-1d ✓
V-3   bloom level consistent with difficulty 4/proficient: apply ✓
V-4   mastery_threshold in range [0.70, 0.95]: 0.80 ✓
V-5   estimated_hours reasonable for difficulty: 4h for proficient ✓
V-6   session_cap derivation correct: ≥1h → 7 TAs ✓
V-7   cpa_entry_stage rationale present: spinning-wheel marks anchor ✓
V-8   ≥2 misconceptions engineered: MC-SAME-TANGENTIAL, MC-DEGREES-NOT-RADIANS ✓
V-9   each MC has trigger/conflict/bridge/replacement/pairs/s6_path ✓
V-10  TA count = session_cap (7 TAs): TA-1…TA-7 ✓
V-11  TA-1 is Concrete [P06]: spinning-wheel rim-vs-hub scene ✓
V-12  TA-4 is MC diagnostic probe [P14, P28, P30, P31, P33, P36]: MC-SAME-TANGENTIAL ✓
V-13  TA-7 is closure [P68, P62, P85, P89] ✓
V-14  ≥5 P91 mastery probes with expected answers: MP-1…MP-5 ✓
V-15  4 formative assessments with thresholds: FA-1…FA-4 ✓
V-16  S6/S7/S4 protocols specified in Component 7 ✓
V-17  3-session spaced retrieval plan present: Component 8 ✓
V-18  interleaving partners named: kinematics-1d, circular-motion ✓
V-19  cross_links match KG edges: torque, circular-motion, angular-momentum ✓
V-20  status = READY, all V-checks passed ✓
```

**Status: READY / PACKAGE_READY — V-1 through V-20 PASS**
