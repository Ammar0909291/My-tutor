# Teaching Blueprint — phys.mech.moment-of-inertia

## Component 0 — Concept Metadata

```
concept_id:         phys.mech.moment-of-inertia
name:               Moment of Inertia
domain:             Classical Mechanics (Physics)
difficulty:         advanced (5)
bloom:              apply
mastery_threshold:  0.80
estimated_hours:    4
prerequisites:      [phys.mech.torque]
cross_links:        [phys.mech.rotational-dynamics, phys.mech.angular-momentum,
                     phys.mech.rolling-motion]
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (spinning a dumbell: weights far from centre vs close —
                       which is harder to start spinning? before I = Σmr²;
                       difficulty 5 → C with accelerated P track)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** Moment of inertia (I) is the rotational analog of mass — it measures an
object's resistance to angular acceleration. Crucially, I depends not only on the total mass
but also on HOW that mass is distributed relative to the rotation axis: mass far from the axis
contributes more (via r²). Two objects of equal mass can have very different I.

**Point mass definition:**
I = mr²    (one particle at distance r from axis)

**Extended body:**
I = Σ mᵢrᵢ²    (sum over all particles)
or I = ∫ r² dm    (continuous distribution)

**Common results (memorise or derive):**

| Shape | Axis | I |
|-------|------|---|
| Solid cylinder/disc | Central axis | ½MR² |
| Hollow cylinder | Central axis | MR² |
| Solid sphere | Through centre | ²/₅ MR² |
| Hollow sphere | Through centre | ²/₃ MR² |
| Thin rod | Through centre | ¹/₁₂ ML² |
| Thin rod | Through end | ¹/₃ ML² |

**Parallel Axis Theorem:**
I = I_cm + Md²

where I_cm is the moment about the centre of mass, M is total mass, and d is the distance
between the new axis and the CM axis.

**Key properties:**
- I is a scalar (in 1D rotation problems).
- I depends on the axis chosen — always specify which axis.
- Greater I → same torque → smaller α (harder to spin up or slow down).
- The r² factor means mass at the rim dominates.

**Worked Example 1 (Point masses):**
Two 2 kg masses at r = 0.5 m from an axis (dumbbell).
I = 2×2×0.5² = 2×2×0.25 = 1 kg·m².

**Worked Example 2 (Solid disc):**
A solid disc of mass 5 kg, radius 0.4 m.
I = ½ × 5 × 0.4² = ½ × 5 × 0.16 = 0.4 kg·m².

**Worked Example 3 (Parallel Axis Theorem):**
A thin rod (M = 3 kg, L = 0.6 m): I_cm = ¹/₁₂ × 3 × 0.36 = 0.09 kg·m².
I about one end = I_cm + Md² = 0.09 + 3×(0.3)² = 0.09 + 0.27 = 0.36 kg·m².
Check: ¹/₃ ML² = ¹/₃ × 3 × 0.36 = 0.36 kg·m². ✓

---

## Component 2 — Prerequisite Dependency Map

```
phys.mech.torque  ──────────────────────►  phys.mech.moment-of-inertia
   (τ = rF sinθ; understanding of r as distance from axis)
   REQUIRED: student can compute torque and understands the role of r
```

**PD-1 (Torque prerequisite):**
"A 30 N force acts perpendicularly at r = 0.4 m from a pivot. τ?"
Expected: τ = 12 N·m.

If student cannot compute torque → prerequisite repair before TA-3.

---

## Component 3 — Misconception Engine

### MC-I-IS-MASS (Priority 1)
**Label:** "Moment of inertia depends only on total mass — two objects with the same mass have the same I"

**Trigger signals:**
- Says "heavier object always has larger I"
- Computes I = M without the r² factor
- Claims a hollow cylinder and solid cylinder of equal mass/radius have the same I

**Conflict evidence [P28]:**
"A solid cylinder (M = 4 kg, R = 0.3 m): I = ½×4×0.09 = 0.18 kg·m².
A hollow cylinder (same M = 4 kg, same R = 0.3 m): I = 4×0.09 = 0.36 kg·m².
Same mass, same radius, same axis — yet I is twice as large for the hollow one. Why?"

**Bridge [P30]:**
"I = Σmr². Each bit of mass is weighted by its distance squared from the axis.
In a hollow cylinder, ALL the mass sits at R — maximum r². In a solid disc, mass is spread
from 0 to R — the inner mass (small r) contributes little. So the hollow cylinder has a
much larger I despite equal total mass."

**Replacement [P31]:**
"I is NOT mass. I = Σmr². Two objects with equal mass but different distributions have
different I. To compare, you must know both mass AND how it's spread relative to the axis."

**Discrimination pairs [P33]:**
- Solid vs hollow cylinder, equal M and R: I_hollow = 2× I_solid ✓
- Dumbbell (weights far) vs same mass concentrated at centre: far dumbbell has much larger I ✓

**s6_path:** Use the dumbbell analogy: "move the weights inward — harder to spin or easier?"
Build the intuition that r² matters before presenting the formula.

---

### MC-I-INDEPENDENT-OF-AXIS (Priority 2)
**Label:** "Moment of inertia is a fixed property of the object — it doesn't change with axis choice"

**Trigger signals:**
- Uses I_cm formula for an off-centre axis without adding Md²
- Says "the rod has I = ¹/₁₂ ML² no matter where the pivot is"
- Confused why a bat is easier to swing from the handle end vs the middle

**Conflict evidence [P28]:**
"A 3 kg rod, L = 0.6 m. I through centre: ¹/₁₂ × 3 × 0.36 = 0.09 kg·m².
I through one end: ¹/₃ × 3 × 0.36 = 0.36 kg·m² — 4 times larger.
Same rod, different pivot. If I were fixed, both would equal the same number. Why don't they?"

**Bridge [P30]:**
"I depends on which axis you choose. Shifting the axis moves mass farther from the new axis
(on average), increasing I. The parallel axis theorem gives the exact adjustment: I = I_cm + Md²."

**Replacement [P31]:**
"I is specific to a given axis. Always state: 'I about axis X.' When you shift the axis from
the CM to a parallel axis at distance d: I_new = I_cm + Md². The rod's I is 4× larger about
its end than its centre because d = L/2."

**Discrimination pairs [P33]:**
- Rod about centre (¹/₁₂ ML²) vs end (¹/₃ ML²): factor of 4 difference ✓
- Parallel Axis Theorem verification: I_end = I_cm + M(L/2)² = ¹/₁₂ML² + ¹/₄ML² = ¹/₃ML² ✓

**s6_path:** Skip the formula derivation; use only the concrete: "it's harder to swing a bat
from the end vs the middle — the bat's mass is effectively farther away."

---

## Component 4 — Teaching Action Sequence

### TA-1 — Concrete Experience [Protocol A, S0/S1]
**Primitives:** P01, P04, P06

P01: Open session; orient to rotational inertia.
P04: "You have a barbell with weights right at the middle vs weights pushed all the way to the ends.
Both have the same total mass. Which is harder to start spinning (rotating)? Why?"
P06 (hands-on anchor): "The one with weights at the ends is much harder. The distance of the mass
from the axis — not just the total mass — is what resists angular acceleration. We call this
Moment of Inertia."

---

### TA-2 — Modality / Formula Introduction [Protocol A, S0/S1]
**Primitives:** P07, P08, P05

P07 (visual): Two diagrams side by side:
- Dumbbell: 2 masses at r = 0.5 m. I = 2×m×0.25.
- Same mass concentrated at centre: I ≈ 0.

Then: table of standard shapes with I formulas.

P08 (notation): I = Σmᵢrᵢ². The r² is crucial — doubling r quadruples contribution to I.
Standard shapes: solid disc ½MR², hollow cylinder MR², solid sphere ²/₅MR².
Parallel Axis Theorem: I = I_cm + Md².
Walk through Worked Examples 1, 2, and 3.

P05: "Figure skaters pull their arms in to spin faster — they reduce r, reduce I, and for the
same angular momentum, ω increases (conservation of angular momentum — coming up)."

---

### TA-3 — Prerequisite Check + Guided Practice [Protocol C]
**Primitives:** P41, P34, P10, P13

P41 (diagnostic): Present PD-1 (torque check).
P34: "30 N perpendicularly at r = 0.4 m → τ?" If gap → repair torque first.

P10: "A dumbbell: two 3 kg masses at r = 0.6 m. Find I."
P13: "I = 2 × m × r² = 2 × 3 × 0.36 = 2.16 kg·m²."

Then: "A solid cylinder M = 6 kg, R = 0.5 m. I?"
"I = ½ × 6 × 0.25 = 0.75 kg·m²."

---

### TA-4 — MC-I-IS-MASS Diagnostic Probe [Protocol B]
**Primitives:** P14, P28, P30, P31, P33, P36

P14 (predict): "A solid cylinder and a hollow cylinder: each has M = 5 kg, R = 0.3 m.
Before computing: same mass, same radius — same I?"

Listen: if student says "yes" → MC-I-IS-MASS confirmed.

P28 → P30 → P31 (full Misconception Engine MC-I-IS-MASS sequence).

P33: I_solid = ½×5×0.09 = 0.225; I_hollow = 5×0.09 = 0.45. Hollow = 2× solid.

P36: "If you roll a solid cylinder and a hollow cylinder of equal mass down a ramp together,
which reaches the bottom first? (Hint: they have different I.)"
[Expected: solid cylinder wins — less I, less rotational inertia to overcome.]

---

### TA-5 — MC-I-INDEPENDENT-OF-AXIS Probe + Parallel Axis Theorem [Protocol B + C]
**Primitives:** P14, P28, P30, P31, P33, P13

P14: "A thin rod (M = 2 kg, L = 0.8 m). I through centre = ¹/₁₂ × 2 × 0.64 = 0.107 kg·m².
Now the pivot moves to one end. Same I?"

Listen: if student says "yes — same rod, same I" → MC-I-INDEPENDENT-OF-AXIS confirmed.

P28 → P30 → P31 (full Misconception Engine MC-I-INDEPENDENT-OF-AXIS sequence).

P13 (walk through parallel axis theorem):
"I_end = I_cm + Md² = 0.107 + 2×(0.4)² = 0.107 + 0.32 = 0.427 kg·m².
Check: ¹/₃ ML² = ¹/₃ × 2 × 0.64 = 0.427 kg·m². ✓"

---

### TA-6 — Independent Problem Set [Protocol A → C]
**Primitives:** P10, P51, P52, P55, P54

Problem set:

1. **Point masses:** Three 1 kg masses at r = 0.2, 0.4, 0.6 m from axis. I?
   [Answer: 1×0.04 + 1×0.16 + 1×0.36 = 0.56 kg·m²]
2. **Solid disc:** M = 8 kg, R = 0.5 m. I? [Answer: ½×8×0.25 = 1 kg·m²]
3. **Hollow vs solid:** Both 4 kg, R = 0.4 m. Which has larger I? By how much?
   [Answer: hollow I = 4×0.16 = 0.64; solid I = ½×0.64 = 0.32; hollow is 2×]
4. **Parallel Axis Theorem:** Solid disc M = 3 kg, R = 0.3 m. I about a parallel axis
   tangent to the rim (d = R = 0.3 m)?
   [Answer: I_cm = ½×3×0.09 = 0.135; I = 0.135 + 3×0.09 = 0.135+0.27 = 0.405 kg·m²]
5. **Conceptual:** A figure skater with arms extended has I = 4 kg·m². She pulls her arms in
   to I = 1 kg·m². If angular momentum is conserved, what happens to ω?
   [Answer: L = Iω = constant; ω doubles then quadruples: ω_f = 4×ω_i]

P51, P52, P55, P54 (standard protocol).

---

### TA-7 — Closure + Retrieval Schedule [Protocol A]
**Primitives:** P68, P62, P85, P89

P68: "Today: I = Σmr². I depends on mass distribution, not just total mass. Same object,
different axis → different I. Parallel Axis Theorem: I = I_cm + Md²."

P62: "Next session: 'A solid sphere (M = 2 kg, R = 0.5 m) and a hollow sphere of equal
mass and radius. I for each? Which is harder to spin?'"

P85: "You understood that r² makes far-away mass dominate — that insight drives everything
from flywheel design to figure skating to rolling motion."

P89: Log MC flags; record accuracy; note standard-shape formula fluency.

---

## Component 5 — Mastery Probe Bank

### P91 Mastery Probes (5 required; 4/5 correct = PASS at threshold 0.80)

**MP-1 (Apply — point masses):**
"Two 4 kg masses are at r = 0.5 m from a rotation axis. Find I."
Expected: I = 2 × 4 × 0.25 = 2 kg·m².
_Discriminates: I = Σmr² for point masses._

**MP-2 (Apply — standard shape):**
"A solid cylinder (M = 10 kg, R = 0.6 m). Find I about its central axis."
Expected: I = ½ × 10 × 0.36 = 1.8 kg·m².
_Discriminates: ½MR² formula; MC-I-IS-MASS resolution._

**MP-3 (Apply — hollow vs solid comparison):**
"A hollow cylinder (M = 6 kg, R = 0.4 m) vs a solid cylinder (same M, R).
Find I for each. Which has greater rotational inertia?"
Expected: I_hollow = 6×0.16 = 0.96; I_solid = 0.48. Hollow has 2× greater I.
_Discriminates: MC-I-IS-MASS; hollow vs solid conceptual distinction._

**MP-4 (Apply — Parallel Axis Theorem):**
"A thin rod (M = 4 kg, L = 1.0 m). I through centre? I through one end?"
Expected: I_cm = ¹/₁₂×4×1 = 1/3 kg·m²; I_end = ¹/₃×4×1 = 4/3 kg·m².
_Discriminates: MC-I-INDEPENDENT-OF-AXIS resolution; axis change._

**MP-5 (Analyze — axis dependence reasoning):**
"A flywheel designer wants maximum I for a given mass M and radius R.
Should the mass be concentrated at the rim or spread uniformly? Explain with I formulas."
Expected: Rim (hollow cylinder) gives I = MR² > ½MR² (solid disc). Rim maximises I
because all mass is at maximum r.
_Discriminates: conceptual design reasoning from I = Σmr²._

---

## Component 6 — Formative Assessment Strategy

**FA-1 (TA-2 exit):** "I = ? What does r represent? Why does r² matter?"
Threshold: I = Σmr²; r = distance from rotation axis; r² means far mass contributes much more.

**FA-2 (TA-4 exit):** "Solid disc I = ½MR². Hollow cylinder I = MR². Same M, R — which is larger?"
Expected: Hollow cylinder — I is 2× solid. If student says equal → MC-I-IS-MASS not resolved.

**FA-3 (TA-5 exit):** "Rod I about centre vs I about end — which is larger? By what factor?"
Expected: End is larger; factor of 4 (¹/₃ ML² vs ¹/₁₂ ML²). If student says equal → MC-I-INDEPENDENT-OF-AXIS not resolved.

**FA-4 (Session exit):** Administer MP-1, MP-2, MP-4. 3/3 correct → advance to TA-7.

---

## Component 7 — Anxiety & Confidence Protocols

**S6 (Anxiety) path:**
- Use only point-mass problems in TA-3 and TA-4 (I = Σmr² with 2 masses).
- Introduce standard shapes (solid disc, cylinder) in TA-5 only.
- Defer Parallel Axis Theorem to a separate mini-session if anxiety remains.
- Reassure: "I = mr². Two numbers multiplied and added. Start simple."

**S7 (Overconfident) path [Protocol G]:**
- Lead with MP-5 (flywheel design reasoning) at TA-3.
- Challenge: "A compound object: a solid disc (M_d, R) with a point mass (m) at the rim.
  Find total I about the central axis." (I = ½M_d R² + mR².)
- Spend TA-6 on Problems 4 and 5 and compound object calculation.

**S4 (Prereq gap — Torque):**
- Detect via PD-1 failure at TA-3.
- Repair: mini-session on τ = rF sinθ before returning.

---

## Component 8 — Spaced Retrieval & Interleaving Plan

**Session 1:** TA-1 through TA-4 (Concrete → I = Σmr² → MC-I-IS-MASS repair).
**Session 2 (≥24 h later):** Retrieval: "I formula? What's different about hollow vs solid?"
  → TA-5 (MC-I-INDEPENDENT-OF-AXIS, Parallel Axis Theorem) → TA-6 (Problem set).
**Session 3 (≥72 h later):** Interleaved probe combining I and τ = Iα:
  "A solid disc (M = 4 kg, R = 0.5 m) has I = 0.5 kg·m². Torque = 3 N·m. Find α."
  (α = τ/I = 6 rad/s² — previews rotational dynamics.)
**Pre-rotational-dynamics session:** All 5 P91 probes cold; require 4/5 before advancing.

**Interleaving partners:** phys.mech.torque (τ = Iα link), phys.mech.angular-momentum (L = Iω link).

---

## Component 9 — V-Check Trace

```
V-1   concept_id present and matches KG: phys.mech.moment-of-inertia ✓
V-2   prerequisites listed and exist in KG: phys.mech.torque ✓
V-3   bloom level consistent with difficulty 5/advanced: apply ✓
V-4   mastery_threshold in range [0.70, 0.95]: 0.80 ✓
V-5   estimated_hours reasonable for difficulty: 4h for advanced ✓
V-6   session_cap derivation correct: ≥1h → 7 TAs ✓
V-7   cpa_entry_stage rationale present: dumbbell-weights-position anchor ✓
V-8   ≥2 misconceptions engineered: MC-I-IS-MASS, MC-I-INDEPENDENT-OF-AXIS ✓
V-9   each MC has trigger/conflict/bridge/replacement/pairs/s6_path ✓
V-10  TA count = session_cap (7 TAs): TA-1…TA-7 ✓
V-11  TA-1 is Concrete [P06]: dumbbell-weights-far-vs-close scene ✓
V-12  TA-4 is MC diagnostic probe [P14, P28, P30, P31, P33, P36]: MC-I-IS-MASS ✓
V-13  TA-7 is closure [P68, P62, P85, P89] ✓
V-14  ≥5 P91 mastery probes with expected answers: MP-1…MP-5 ✓
V-15  4 formative assessments with thresholds: FA-1…FA-4 ✓
V-16  S6/S7/S4 protocols specified in Component 7 ✓
V-17  3-session spaced retrieval plan present: Component 8 ✓
V-18  interleaving partners named: torque, angular-momentum ✓
V-19  cross_links match KG edges: rotational-dynamics, angular-momentum,
      rolling-motion ✓
V-20  status = READY, all V-checks passed ✓
```

**Status: READY / PACKAGE_READY — V-1 through V-20 PASS**
